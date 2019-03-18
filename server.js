const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


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
      message: 'Welcome to my website'
   })

});



app.get('/bad', (req, res) => {
   res.send({
      errorMsg:'an error occured',
   });
});

app.listen(3000, () => {
console.log('Server is running....');
}); // bind ouno