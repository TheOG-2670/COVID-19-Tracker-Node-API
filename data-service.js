const fs=require('fs')
const path=require('path')
const fetch=require('node-fetch')

module.exports.initData = function()
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