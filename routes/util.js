var async = require('async')
  , fs = require('fs')
  , common = require('../lib/common')
  , _ = require('underscore')

exports.getRepo = function(req){
  return function(){
    var url = req.repo_url || req.param("repo") || req.param("url");
    return req.user.get_repo_config(url, this);
  }
}

exports.error = function(ctx, msg, res){
  console.error(ctx, msg);
  res.statusCode = 400;
  var r = {
    errors: [msg],
    status: "error"
  };
  return res.end(JSON.stringify(r, null, '\t'));
}

exports.ok = function(results, res){
  var r = {
    errors: [],
    status: "ok",
    results: results
  }
  res.statusCode = 200;
  return res.end(JSON.stringify(r, null, '\t'));
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
  } else {
    console.log("Error with plugin? ", p)
    after(null, p);
  }
}

exports.loadPluginPanels = function(plugins, cb){
  if (!plugins)
    return cb(null, []);
  async.map(plugins, loadPluginPanel, cb)
}


exports.getPanelsForRepo = function(repo){
  var panels = common.panels['project_config']
    , out = []
  
  repo.plugins.forEach(function(id){
    for (var i = 0; i<panels.length; i++){
      if (panels[i].id == id){
        panels[i].enabled = true; //TODO
        out.push(panels.splice(i, 1))
        return; 
      }
    }
    throw "Plugin not found:" + id
  })

  out = out.concat(panels);
  return out

}

exports.availablePlugins = function(){
  return _.pluck(common.panels['project_config'], 'id');
}
