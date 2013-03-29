
### Database Connectivity

When your tests run, Strider exports a number of UNIX environment variables which you can use to connect to the test database. Strider supports setting environment variables per-project. Simply browse to the "Environment" tab on the project config page to set these:

![Strider Environment Config Screenshot](http://unworkable.org/~niallo/strider4.png)


#### Sample MongoDB Apps
If you aren't sure how to create a database connection from a database URI, have a look at one of our sample apps:

- [BeyondFog/strider-nodejs-mongodb-test](https://github.com/BeyondFog/strider-nodejs-mongodb-test/blob/master/test/test_mongodb.js) - very simple app that connects to MongoDB in the test script 
- [BeyondFog/Poang](https://github.com/BeyondFog/Poang) - sample node.js app built with MongoDB using Express web framework, Mongoose ODM and Everyauth authentication/account plugin.


#### Sample PostgreSQL App

If you aren't sure how to create a database connection from a database URI, have a look at the sample app:

- [BeyondFog/strider-nodejs-postgresql-test](https://github.com/BeyondFog/strider-nodejs-mongodb-test/blob/master/test/test_postgresql.js) - very simple app that connects to PostgreSQL in the test script

#### Sample Redis App
If you aren't sure how to create a database connection from a database URI, have a look at this sample app:

- [BeyondFog/strider-nodejs-redis-test](https://github.com/BeyondFog/strider-nodejs-mongodb-test/blob/master/test/test_redis.js) - very simple app that connects to Redis in the test script

<h2 id="cd_nodejs" class="docs-section">Getting Started: Continuous Deployment for node.js</h2>

Once you have finished setting up your node.js app for continuous integration with Strider, you are only a few steps away from continuous deployment to [Heroku](http://heroku.com).

