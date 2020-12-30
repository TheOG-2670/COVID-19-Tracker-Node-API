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
                    })
                    fs.writeFileSync(path.join(__dirname + '/data/country-store.json'), JSON.stringify(countries, null, 2), (error) => {
                        if (error)
                            console.log(error)
                    })
                }
            })
        }

        //.splice to replace data in array -> parameters: index, number of elements, object
        //.find to find and return object/element in array -> parameters: lambda condition
        //.indexOf to find index of specific object/element in array -> parameters: element/object
module.exports.updateCovidData = function (countries) {

        countries.forEach(country=>{
            fetch('https://covid19.mathdro.id/api/countries/' + country.name)
            .then(response=>{
                return response.json()
            })
            if(!data.error)
            {
                
                var countryData = {};
                countryData.name = country.name
                countryData.confirmed = data.confirmed.value
                countryData.deaths = data.deaths.value
                countryData.recovered = data.recovered.value
                        
                countries.splice(i, 1, countryData)
                fs.writeFileSync(path.join(__dirname + '/data/country-store.json'), JSON.stringify(countries, null, 2), (error) => {
                    if (error)
                        console.log(error)
                })
            }
        })
}

module.exports.getCovidData = function () {

    //TESTING CODE
    var countries=JSON.parse(fs.readFileSync(path.join(__dirname + "/data/country-store.json")))
    var a = countries.find(c=>c.name==="Afghanistan")
    var b = countries.find(c=>c.name==="Albania")
    
    a.confirmed+=1
    b.confirmed+=1
    countries.splice(countries.indexOf(a), 1, a)
    countries.splice(countries.indexOf(b), 1, b)
    fs.writeFileSync(path.join(__dirname + '/data/country-store.json'), JSON.stringify(countries, null, 2), (error) => {
        if (error)
            console.log(error)
    })
    //
    
    return JSON.parse(fs.readFileSync(path.join(__dirname + "/data/country-store.json")))
}