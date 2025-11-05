/* import express and ejs packages */
var express = require ('express')
var ejs = require('ejs')
const path = require('path')

/* create the express app */
const app = express()
const port = 8000  /* running on port 8000 */

/* set ejs as templating engine */
app.set('view engine', 'ejs');

/* this line makes the public folder accessible for css and stuff */
app.use(express.static(path.join(__dirname, 'public')));

/* body parser to read form data */
app.use(express.urlencoded({ extended: true })); 

/* import routes from main.js */
const mainRoutes = require("./routes/main");  
app.use('/', mainRoutes);



/* start server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

