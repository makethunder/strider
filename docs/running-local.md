# Running Strider on your own Server


## Basic Installation
[Coming soon - simply require('strider')]


### Database
Strider uses MongoDB - you either need to run this locally(recommended), or specify the url to a remote database. IE:

Locally:
- [install mongodb](http://www.mongodb.org/downloads)

Remote:
- `export DB_URI=mongodb://user:pwd@your/mongo/database


Next you will need Node.JS. You can get binary packages for most platforms at
http://nodejs.org

At the moment, the best way to install strider is to clone this repo.

Once you have Node.JS on your system, you can fetch & install all the dependencies for your Strider clone by executing the following command in the root directory of your clone:

```shell
 npm install
```


## Starting Strider

Once `Strider` has been installed and configured, it can be started with:

    node bin/strider



Require()'ing Strider [WIP]
=====================

Strider can be `require()`-ed like any other NPM module. This is particularly useful when you want to

- Make Strider a dependency at a specific version
- Choose exactly which plugins to install
- Customize configuration
- Do other crazy stuff

For example, you could have a project with its own `package.json` that depends
on `strider` at a specific version, along with any other extensions you choose
loaded from a particular filesystem location. Then you could write a simple
initialization shim like the following:

```JavaScript

var strider = require('strider')

var instance = strider("/path/to/extensions/dir", config, function(err, initialized, appInstance) {
    console.log("Strider is now running")
})

```
