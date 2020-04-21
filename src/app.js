
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

// set up handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
// set up for static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Krishna Upadhyay'
    })
})
 

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Krishna upadhyay'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'To get help please refer to me',
        title:'Help',
        name:'Krishna Upadhyay'
    })
})
app.get('/weather',(req, res)=>{
   if(!req.query.address){
       return res.send({
           error:'must provide an address'
       })
   }
   geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
       if(error){
           return res.send({error})
       }
       forecast(latitude,longitude,(error,forecastData)=>{
       if(error){
           return res.send({error})
       }
       res.send({
           forecast:forecastData,
           location,
           address:req.query.address
       })
    })

   })
    // res.send({
    //     forecast:'Currently, it is clear',
    //     location:'Indore',
    //     address:req.query.address
    // })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search item'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})


app.get('/help/*',(req,res)=>{
  res.render('404',{
      title:'404',
      name:'Krishna Upadhyay',
      errorMessage:'Help Article not found'
  })
})

app.get('*',(req,res)=>{
   res.render('404',{
       title:'404',
       name:'Krishna upadhyay',
       errorMessage:'Page Not Found'
   })
})

app.listen(3000,()=>{
    console.log('Server is up!')
})