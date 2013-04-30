var async = require('async')
  , fs = require('fs')

exports.getRepo = function(req){
  return function(){
    var url = req.repo_url
    return req.user.get_repo_config(url, this);
  }
}

exports.error = function(ctx, msg, res){
  console.error(ctx, msg);
  res.statusCode = 400;
  return res.end("Bad Request");
}


// TODO Move somewhere better

var loadPluginPanel = function(p, cb){
  var after = function(err, res){
    p.contents = res;
    cb(err, p);
  }
  // Panel sources can be a string which assumed to be a filesystem path
  // or a function which is assumed to take a callback argument.
  if (typeof(p.src) === 'string') {
    fs.readFile(p.src, 'utf8', after);
  } else if (typeof(p.src) === 'function') {
    p.src(after);
  }
}

exports.loadPluginPanels = function(plugins, cb){
  if (!plugins)
    return cb(null, []);
  async.map(plugins, loadPluginPanel, cb)
}
