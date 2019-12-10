const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather.',
        name:'Awatef'
    })

})
app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Awatef'
    })
})
app.get('/help',(req,res)=> {
    res.render('help', {
        title: 'Help',
        name: 'awatef',
        message:'here any help message'
    })

})
 

 app.get('/weather',(req, res) =>{
     if(!req.query.address) {
         return res.send({
            error: 'You must provide a address tream'
         })
     }
     geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
         if(error) {
             return res.send({error})
         }
         forecast(latitude, longitude,(error, forecastData) => {
             if (error) {
                 return res.send({ error})
             }
             res.send({
                 forecast: forecastData,
                 location,
                 address: req.query.address
             })
         })
     })
  
 })
 app.get('/products', (req, res) => {
     if(!req.query.search) {
         return res.send ({
             error: 'You must provide a search tream'
         })
     }
     console.log(req.query.search)
     res.send({
        products: []
     })

 })
 app.get('/help/*',(req, res)=> {
    res.render('404', {
        title:'404',
        name: 'awatef m',
        errorMessage:'help article not found'})
})


app.get('*',(req, res)=> {
    res.render('404', {
        title:'404',
        name: 'awatef m',
        errorMessage:'404 not found'})
})

app.listen(3000, ()=> {
    console.log('Server is up on 30000')
})