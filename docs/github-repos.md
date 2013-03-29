
<a name="gettingstarted" />
Getting Started With Strider
============================

Getting a project up and running on Strider is very easy. After you create your account, follow the prompts to link your Github account using OAuth2. Strider will then fetch the list of Github repositories for which you have admin rights. Select the initial Github repository that you would like to test (and optionally deploy) with Strider. On the next screen you can add any additional members of the team to the project.

If you would like Strider to deploy to Heroku automatically when tests pass (AKA deploy-on-green), click 'continue to deployment configuration'. You will then need to enter your Heroku API key. You can find your API key about halfway down the '[My Account](https://api.heroku.com/account)' page on Heroku. Then select from an existing Heroku app or enter the name for a new app. 

The final step is to modify your project so that it will work properly with Strider. This won't take long but is specific to your language and framework, so please click on the appropriate link below.

### I would like to configure my project for...

- [Node.js: Continuous Integration](#getting-started-continuous-integration-for-nodejs)

- [Node.js: Continuous Deployment to Heroku (+ MongoLab/MongoDB)](#getting-started-continuous-deployment-for-nodejs)

<h2 id="ci_nodejs" class="docs-section">Getting Started: Continuous Integration for node.js</h2>

### npm install

Strider will run ['npm install'](http://npmjs.org/doc/install.html) to install all of your packages as specified in [package.json](http://npmjs.org/doc/json.html) and [npm-shrinkwrap.json](http://npmjs.org/doc/shrinkwrap.html) (if present).

### npm test / package.json

Once all of the modules are installed, Strider will run the command ['npm test'](http://npmjs.org/doc/test.html) to execute your node.js automated tests. npm will look for a [scripts key](http://npmjs.org/doc/scripts.html) in packages.json that should look something like this:

<pre class="prettyprint">
"scripts": {
  "test": "node_modules/mocha/bin/mocha -R tap"
} 
</pre>

We are using [Mocha](http://visionmedia.github.com/mocha/) in this example but any test framework will work as long as it can be called from the command line.

