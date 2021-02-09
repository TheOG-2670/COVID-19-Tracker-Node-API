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
                    
                    countries.push({
                        name:"Global"
                    })
                    data.countries.forEach(country => {
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
module.exports.updateCovidData = async function (countries) {

    var globalData = await fetch('https://covid19.mathdro.id/api')
    var globalResponse = await globalData.json();

        var selectedCountry = countries.find(c=>c.name==="Global")
        selectedCountry.confirmed=globalResponse.confirmed.value
        selectedCountry.deaths=globalResponse.deaths.value
        selectedCountry.recovered=globalResponse.recovered.value
        countries.splice(countries.indexOf(selectedCountry), 1, selectedCountry)


        for(var i=0; i < countries.length; i++)
        {
                var countryData = await fetch('https://covid19.mathdro.id/api/countries/' + countries[i].name)
                var countryResponse = await countryData.json();
                if(!countryResponse.error)
                {
                            
                    countries[i].confirmed=countryResponse.confirmed.value
                    countries[i].deaths=countryResponse.deaths.value
                    countries[i].recovered=countryResponse.recovered.value
                    countries.splice(i, 1, countries[i])
                    
                }
        }

        fs.writeFileSync(path.join(__dirname + '/data/country-store.json'), JSON.stringify(countries, null, 2), (error) => {
            if (error)
                console.log(error)
        })
}

module.exports.getCovidData = function () {
    return JSON.parse(fs.readFileSync(path.join(__dirname + "/data/country-store.json")))
}