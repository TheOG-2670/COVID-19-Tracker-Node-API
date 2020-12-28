const fs=require('fs')
const path=require('path')
const fetch=require('node-fetch')

module.exports.initCountries = function()
{
    var countries = []
    fetch('https://covid19.mathdro.id/api/countries')
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (!data.error) {
                    data.countries.map(country => {
                        var countryData = {}
                        countryData.name = country.name
                        countries.push(countryData)
                        fs.writeFileSync(path.join(__dirname + '/data/country-store.json'), JSON.stringify(countries), (error) => {
                            if (error)
                                console.log(error)
                        })
                    })
                }
            })
        }

module.exports.setCovidData = function (countries) {

    var countryArray=[]
    countries.map(country => {
        fetch('https://covid19.mathdro.id/api/countries/' + country.name)
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    var countryData = {};
                    countryData.name = country.name
                    countryData.confirmed = data.confirmed.value
                    countryData.deaths = data.deaths.value
                    countryData.recovered = data.recovered.value
                    
                    countryArray.push(countryData)
                    countryArray.sort((country1, country2)=>(country1.name>country2.name)-(country1.name<country2.name))
                    
                    fs.writeFileSync(path.join(__dirname + '/data/country-store.json'), JSON.stringify(countryArray), (error) => {
                        if (error)
                            console.log(error)
                    })
                }
            })
    })

}

module.exports.getCovidData = function () {
    return JSON.parse(fs.readFileSync(path.join(__dirname + "/data/country-store.json")))
}