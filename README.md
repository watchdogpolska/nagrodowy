# Deployment

*** 

## Database

*We are going to use mysql/mariadb.*

Create sql database and user which has full access to this database.
Update database details `database name`, `db username` and `db password` accordingly in the following files:

* `backend/functions`
* `backend/nagrodowy/settings.py`

Add to your sql server configuration included in:

* `etc/mariadb/my.cnf`

Restart mysql/mariadb server

Execute :

```
#!bash

cd backend
./setupdb
```

*** 

## Frontend (angular setup)

Execute :

```
#!bash

cd frontend
npm install

```

Updated `url_XXXX` directives in the file: 

`* frontend/app/config.js`

according to your settings. This file is really self descriptive (if you encounter problems, please do get back to [me][author-mail]).

Updated `url_XXXX` directives in the file: 

`* frontend/app/config.js`

***

## Backend / Django

Update `MEDIA_ROOT` and `MEDIA_URL` in the file :

`* backend/nagrodowy/settings.py`

Make sure `MEDIA_ROOT` is writable by httpd process user (usual username is : `apache` or `httpd`)

***

## Http server

You need to configure your httpd server.
If you are using Apache, example configuration file is included in repo under: 

* `etc/apache/nagrodowy.conf` 

Update it accordingly to your setup and copy the file into `/etc/httpd/conf.d/` 

*Location might be different depeding on your linux distribution.*

Restart http server.

***

## Obtain your Google map api

This step should be performed once everything is proven to be working after finishing with preceding steps.
 
Setup your [Google map api key][google-map-api].

Update Google map api key in file :

`* frontend/app/app.js`

***

**Once everything is up and running I strongly recommend to create branch something like rel_0.1 and commit changes needed for deployment.
**

****

# Further development

# To do's


Contact with [author][author-mail]

[author-mail]: mailto:purbanski@interia.pl
[google-map-api]: https://developers.google.com/maps/documentation/javascript/get-api-key