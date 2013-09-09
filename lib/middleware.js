var logging = require('./logging');

// Legacy aliases - don't use these:
var auth = require('./auth')

exports = {
  require_auth: auth.requireUserOr401,
  require_auth_browser: auth.requireUser,
  require_admin: auth.requireAdminOr401,
  require_resource_admin: auth.requireRepoAdmin,
  require_resource_read: auth.requireReadAccess,
  require_param: require_param,
  custom404: custom404,
  projectPlugin: projectPlugin,
  project: project
}

// Custom middleware to save unparsed request body to req.content
exports.bodySetter = function bodySetter(req, res, next) {
  if (req._post_body) return next();
  req.post_body = req.post_body || "";

  if ('POST' != req.method) return next();

  req._post_body = true;

  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    req.post_body += chunk;
  });

    next();
};

// Require the specified parameters, or else return a 400 with a descriptive JSON body
function require_params(params_list) {
  return function(req, res, next) {
    var errors = [];
    var status = "ok";
    var i;
    for (i = 0; i < params_list.length; i++) {
      var val = req.param(params_list[i]);
      if (!val) {
        errors.push("required parameter `"+params_list[i]+"` not found.");
        status = "error";
      }
    }
    if (errors.length === 0) {
      next();
    } else {
      var r = {
        errors: errors,
        status: status
      };
      res.statusCode = 400;

      return res.end(JSON.stringify(r, null, '\t'));
    }
  };
};

function custom404(req, res, next) {
  if ('GET' != req.method) return next();
  res.statusCode = 404;
  res.render('doesnotexist.html', 404);
};

// Get plugin config. Extpects req.project
// Sets `req.pluginConfig` function
//
// pluginConfig() -> return the config
// pluginConfig(config, next(err)). save the config
function projectPlugin(pluginid, req, res, next) {
  var project = req.project
    , plugin = null
  for (var i=0; i<project.plugins.length; i++) {
    if (project.plugins[i].id === pluginid) {
      plugin = project.plugins[i]
      break
    }
  }
  if (plugin === null) {
    res.status(404)
    return res.send('Plugin not enabled for the specified project')
  }
  req.pluginConfig = function (config, next) {
    if (arguments.length === 0) {
      return plugin.config
    }
    plugin.config = config
    project.markModified('plugins')
    project.save(next)
  }
  next()
}

// getProject Middleware
// assumes two url parameters, :org and :repo, and req.user
// checks user access level, and sets the following properties on the
// request object.
//
// req.project = the project
// req.accessLevel = 0 for public, 1 for normal, 2 for admin
//
// Errors:
//   404: not found
//   401: not public and you don't have access
//   500: something strange happened w/ the DB lookup
function project(req, res, next) {
  var name = req.param.org + '/' + req.param.repo
  models.Project.findOne({name: name}, function (err, project) {
    if (err) {
      res.status(500)
      return res.send({error: 'Failed to find project', info: err})
    }
    if (!project) {
      res.status(404)
      return res.send('Project not found')
    }
    req.project = project
    if (project.public) {
      req.accessLevel = 0
      return next()
    }
    if (req.user && req.user.projects[name] > 0) {
      req.accessLevel = req.user.project[name]
      return next()
    }
    res.status(401)
    res.send('Not authorized')
  })
}
