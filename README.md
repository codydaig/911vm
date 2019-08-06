# 911 Volunteer Management (911vm)

Some pieces of note for getting started with development
* The index.js file is the starting point for the express server. 
* The server config lives in config/config.js
* All the routes for the project go inside server/routes.js
* Controllers are ultimately batched into endpoints/categories in their own file in the server/controllers directory.
* All controllers are imported into the server/controllers.js file for easy access within routes.js
* The server/controllers.js file will be automated so manual imports will not be necessary
* The /public folder is accessible by the web server
* The client/index.jsx is the starting point for webpack
* `npm run build` starts the webpack build which also generates the index.html file

## Setup backend
[link](/docs/server.md)