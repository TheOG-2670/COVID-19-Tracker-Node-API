const fs=require('fs')
const path=require('path')
const fetch=require('node-fetch')

function writeToCache(countries)
{
    fs.writeFileSync(path.join(__dirname + '/data/country-store.json'), JSON.stringify(countries, null, 2), (error) => {
        if (error)
            console.log(error)
    })
}

module.exports.initData = function()
{
    var countries = []
    fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => {
            return response.json()
        })
        .then(data => {
            countries.push({
                name: "Global"
            })
            data.forEach((country, i) => {
                var countryData = {
                    id: i,
                    name: country.country,
                    iso_symbol: country.countryInfo.iso2,
                    flag: country.countryInfo.flag,
                    confirmed: country.cases,
                    deaths: country.deaths,
                    recovered: country.recovered
                }
                countries.push(countryData)
            })
            writeToCache(countries)
        })
}

//.splice to replace data in array -> parameters: index, number of elements, object
//.find to find and return object/element in array -> parameters: lambda condition
//.indexOf to find index of specific object/element in array -> parameters: element/object
async function updateGlobalData(countries)
{
    var globalData = await fetch('https://disease.sh/v3/covid-19/all')
    var globalResponse = await globalData.json();

    var world = countries.find(c=>c.name==="Global")
    world.confirmed=globalResponse.cases
    world.deaths=globalResponse.deaths
    world.recovered=globalResponse.recovered
    countries.splice(countries.indexOf(world), 1, world)

    writeToCache(countries)
}

async function updateCountryData(countries)
{
    var diacritics='[çôé]'
    for (var i = 0; i < countries.length; i++) 
    {
        if(!countries[i].name.match(diacritics))
        {
            var countryData = await fetch('https://disease.sh/v3/covid-19/countries/' + countries[i].name + '?strict=true')
            var countryResponse = await countryData.json();
            // console.log(countryResponse)
            
            countries[i].confirmed = countryResponse.cases
            countries[i].deaths = countryResponse.deaths
            countries[i].recovered = countryResponse.recovered
            countries.splice(i, 1, countries[i])
        }
    }

    writeToCache(countries)
}
    
module.exports.updateCovidData = function (countries) {
    setTimeout(()=>{
        updateGlobalData(countries)
    },1000)
    updateCountryData(countries)
}

module.exports.getCovidData = function () {
    var cache = JSON.parse(fs.readFileSync(path.join(__dirname + "/data/country-store.json")))
    // console.log(cache)
    this.updateCovidData(cache)
    return cache
}