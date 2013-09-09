
var models = require('./models')

module.exports = ensureUpgraded

function githubProvider(project) {
  return {
    id: 'github',
    url: project.url,
    display_url: project.display_url,
    auth: project.privkey ? 'ssh' : 'https'
  }
}

function gitProvider(project) {
  return {
    id: 'git',
    url: project.url,
    auth: 'ssh'
  }
}
/* Job new
  type: { type: String },
  user_id: { type: Schema.ObjectId, ref: 'user' },
  project: String,
  ref: {
    // not every job is on a branch, and want arbitrary stuff here.
    // so we can't specify branch, but we still want an index on it
    // branch: { type: String, index: true, sparse: true }
  },
  trigger: {
    type: { type: String },
    author: {
      id: { type: Schema.ObjectId, ref: 'user' },
      url: String,
      name: String,
      email: String,
      image: String,
      username: String
    },
    message: String,
    timestamp: Date,
    url: String,
    source: {}
  },
  phases: {},
  created: Date,
  queued: Date,
  started: Date,
  finished: { type: Date, index: true, sparse: true },
  test_status: Number,
  deploy_status: Number
})
*/

/*
Prev Schema:
  , url: {type: String, sparse: true}
  , display_url: String
  , pseudo_terminal: {type: Boolean, default: true}
  // Provider e.g. heroku, dotcloud
  , prod_deploy_target: {
        provider: String
      , account_id: String
      // Automatically deploy to this provider if the tests pass and this is a TEST_AND_DEPLOY job
      , deploy_on_green: { type: Boolean, default: true }
    }
  // E.g. language Python, framework Pyramid
  , project_type: {
        language: String
      , framework: String
    }

var ProjectConfig = new Schema({
    name: String // this is new too
  , pubkey: {type: String }
  , privkey: {type: String }
  , secret: {type: String }
  , active: { type: Boolean, default: true }
  , collaborators:[CollaboratorConfig]
  , webhooks: [WebhookConfig]
  // default visibility to private for now. we may revisit this later.
  // public projects grant read-only access to anonymous users.
  // anonymous users cannot trigger jobs, view or change config.
  // TODO: do anonymous users get socket.io messages for public projects? probably should.
  , public: { type: Boolean, default: false}
  // each provider gets to decide what it wants to store.

  // ** new stuff **
  , provider: {}
  , plugins : [PluginConfig]
});
*/


// done(err, project)
function upgradeProject(user, project) {
  project.name = project.display_url.split('.com/')[1]
  if (project.url.indexOf('github.com') !== -1) {
    project.provider = githubProvider(project)
  } else {
    project.provider = gitProvider(project)
  }
  if (project.prod_deploy_target && project.prod_deploy_target.provider) {
    project.plugins.push(herokuPlugin(user, project))
  }

  /*
  user.save(function (err, user) {
    if (err) return done(err)
    done(null, project)
  })
  */
}

// add providers.github if there is a github account connected.
// move heroku stuff to the respective projects
function upgradeUser(user, done) {
}

