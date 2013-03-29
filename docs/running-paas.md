# Running Strider on a PAAS


## Heroku

### Procfile

Heroku requires that you have a [Procfile](https://devcenter.heroku.com/articles/procfile) with the command to start your web app. It should look like this:

<pre class="prettyprint">
web: node app.js
</pre>
    
### MongoLab Addon (MongoDB in Heroku)

If you would like to use the (free) [MongoLab addon](https://addons.heroku.com/mongolab) with your app, you will need to use the [Heroku Toolbelt](https://toolbelt.heroku.com/) from your command line to add it to your project. After the Heroku app has been created (either by Strider or via the command line), run the following command:

<pre class="prettyprint">
heroku addons:add mongolab:starter --app [your_app_name]
</pre>
    
### Deploy on Green

Once you have added a Procfile and confirmed that you are using the Heroku environment variables, your app should be ready to go for continuous deployment to Heroku. By default, Strider will deploy to Heroku on green, ie if all of the tests pass.

If you would prefer to only deploy to Heroku on demand, you can turn off 'deploy on green' in the project configuration settings.

Once you turn off 'deploy on green', Strider will deploy the project to Heroku ONLY when you manually trigger a 'test and deploy' job from the Strider interface.




## More Information

For more information on how to configure a node.js app to work 
on Heroku, see [Getting Started with Node.js on Heroku/Cedar](https://devcenter.heroku.com/articles/nodejs).
