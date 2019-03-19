const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
//if PORT not exists then default is 3000 (to run locally)


const app =express();
//tell your partials directory
hbs.registerPartials(__dirname+'/views/partials');

//middlewares 
 //logger middleware
app.use((req,res,next)=>{
   var now = new Date().toString();
   var log = `${now},${req.method}, ${req.url}`;
   fs.appendFile('server.log',log+`\n`, (err)=>{
      if(err){
         console.log('unable to append to file');
      }
   });
   next();
});

//maintenence middleware
// app.use( (req,res,next) => {
//    res.render('maintenence.hbs');
   
// } );

app.use(express.static(__dirname +'/public'));

//req request coming in  res: the response you send 
app.get('/about', (req, res) => {
   res.render('about.hbs',{
      title:'About'
   });
});

hbs.registerHelper('getCurrentYear', ()=>{
   return new Date().getFullYear();
});
hbs.registerHelper('upperCase', (text)=>{
 return text.toUpperCase();
});

//tell express which template engine to use,
// app.set let us set various express configuration
app.set('view engine', 'hbs');

// request handlers , get request handler 'get(route, handler)'
app.get('/', (req, res) =>{
   res.render('home.hbs', {
      title: 'Home',
      pageTitle: 'Home Page',
      message: 'Welcome to my website',
      port:port
   })

});



app.get('/bad', (req, res) => {
   res.send({
      errorMsg:'an error occured',
   });
});
//for heroku port will be set by heroku through environment variable
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
}); // bind ouno