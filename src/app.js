const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()

//define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directiory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather app',
        name: 'Noam Jehoshua'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'My about page',
        name: 'Noam Jehoshua'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        webName: 'WeatherWebsite',
        title: 'Help',
        name: 'Noam Jehoshua'
    })
})

app.get('/products',(req,res)=>{

    if (!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather',(req,res) =>{

    if(!req.query.search){ // no location was provided in the query
        return res.send({
            error: 'No address was provided, please try again.'
        })
    }
    geocode(req.query.search, (error,{latitude,longitude,location}={})=>{
        if (error){
          return res.send({error})
        } 
        forecast(latitude, longitude, (foreerror, foredata) => {
          if (foreerror){
            return res.send({
                error: foreerror 
            })
          }
          res.send([{ // if everything works well...
            location,
            forecast: foredata,
            address: req.query.search,
            }])
        })
           
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 for help page',
        name: 'Noam Jehoshua',
        errorMessage: 'Help article was not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 Page',
        name: 'Noam Jehoshua',
        errorMessage: 'Page was not found'
    })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000') //massage for the server opener
})
