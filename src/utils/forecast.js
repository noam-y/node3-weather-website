const request = require('request')

const forecast= (latitude, longitude, callback) =>{
    url = 'https://api.darksky.net/forecast/931b149619b55bfb1a2be827c5d52c7d/'+ encodeURIComponent(latitude)+ ',' +encodeURIComponent(longitude)
    request ({url, json:true},(error,{body})=>{
        
        if (error){
            callback('Unable to connect to forecast service!', undefined)
        }
        else if (body.error){
            callback('Unable to find location for forecast- try again!', undefined)
        }else{
            data={
                weather: body.currently.summary ,
                temperature: body.currently.temperature,
                rainchance: body.currently.precipProbability *100
            }

            const {weather, rainchance: rainPercent , temperature} = data
            callback(undefined, weather+ ' it is currently '+ temperature +' degrees out. there is a '+  rainPercent + '% chance of rain.')
        }    
    })
}



module.exports = forecast