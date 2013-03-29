# Configuring Strider and Adding a first User

<a name="configuring" />
Configuring
===========

`Strider` configuration comes from environment variables. Most of the default
values should work fine for running on localhost, however for an
Internet-accessible deployment the following variables will need to be exported:

  - `DB_URI` : MongoDB DB URI if not localhost (you can safely use MongoLab free plan - works great)
  - `SERVER_NAME` : Address at which server will be accessible on the Internet. E.g. https://strider.example.com/
  - `GITHUB_APP_ID`, `GITHUB_APP_SECRET`: Github app ID & secret (assuming not running on localhost:3000) - you can register a new one 
  at https://github.com/settings/applications/new - the Main URL should be the same as server name above,
  and the callback URL should be server name with the path /auth/github/callback.
  E.g. https://strider.example.com/auth/github/callback
  
  - If you want email notifications, configure an SMTP server (we recommend Mailgun for SMTP if you need a server - free account gives 200 emails / day):
    - `SMTP_HOST`: SMTP server hostname e.g. smtp.example.com
    - `SMTP_PORT`: SMTP server port e.g. 587 (default)
    - `SMTP_USER`: SMTP auth username e.g. "myuser"
    - `SMTP_PASS`: SMTP auth password e.g. "supersecret"


<a name="adduser" />
Adding Initial Admin User
=========================

`Strider` isn't much use without an account to login with. Once you create an administrative user, you can invite as many
other people as you like to your instance. There is a simple CLI subcommand to help you create the initial user:

    node bin/strider adduser

Example run:

```bash
$ node bin/strider adduser
Enter email []: strider@example.com
Is admin? (y/n) [n]: y
Enter password []: *******

Email:		strider@example.com
Password:	****
isAdmin:	true
OK? (y/n) [y]:
22 Oct 21:21:01 - info: Connecting to MongoDB URL: mongodb://localhost/strider-foss
22 Oct 21:21:01 - info: User added successfully! Enjoy.
```


