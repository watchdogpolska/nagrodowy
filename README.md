# Deployment

1. Database

*We are going to use mysql/mariadb*

Create sql database and user which has full access to this database.
Update database details (database name, username and password) accordingly in the following files:

* backend/functions
* backend/nagrodowy/settings.py

Add to your sql server config configuration included in:
* etc/mariadb/my.cnf 

Restart mysql/mariadb server.

Execute :
`cd backend`
`./setupdb`

2. Http server

You need to configure your httpd server.
If you are using Apache, example configuration file is included in repo under: 
* etc/apache/nagrodowy.conf 

Update it accordingly to your setup and copy the file into `/etc/httpd/conf.d/` location might be different depeding on your linux distribution.
Restart http server.

3. Frontend (angular setup)

Execute :
`cd frontend
npm install`

Updated `url_XXXX` directives in the file: 
* frontend/app/config.js

according to your settings. This is really self descriptive (if you encouter problems, please do get back to me).

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

4. Backend / Django

Update `MEDIA_ROOT` and `MEDIA_URL` in the file :
* backend/nagrodowy/settings.py

Make sure MEDIA_ROOT is writable by httpd process user (usual username is : apache or httpd)

6. Google map api

# Further development



Contact with author: purbanski@interia.pl