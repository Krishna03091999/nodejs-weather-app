const request = require('request')

const forecast = (latitude,longitude,callback)=>{
        const url = "http://api.weatherstack.com/current?access_key=35f61e864b1a197f030cf44ba321080e&query=" +latitude+ "," +longitude;
    
       request({url, json:true},(error,{body})=>{
           if(error){
               callback('Unable to connect to the weather service!',undefined)
           }
           else if(body.error){
               callback('Unable to find the location',undefined)
           }
           else{
               callback(undefined, +body.current.weather_descriptions[0] +',it is currently ' + body.current.temperature +' °C and there is a '+body.current.precip +' % chance of rain')
           }
    
       })
    }

    module.exports=forecast