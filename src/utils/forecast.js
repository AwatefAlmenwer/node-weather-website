const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/07aa4c4e5169879144bf2d237c8ef544/' + latitude + ','+ longitude

    request ({url, json:true},(error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)

        } else if(body.error) {
            ccallback('Unable to find location', undefined)

        } else { 
    
        callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. Threre is a ${body.currently.precipProbability} % chance of rain` )

        }
    })
}
module.exports = forecast