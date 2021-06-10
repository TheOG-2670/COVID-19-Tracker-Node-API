const fs=require('fs')
const path=require('path')
const fetch=require('node-fetch')

function writeToCache(country)
{
    fs.writeFileSync(path.join(__dirname + '/data/'+(country.name==='Global'?'Global':country.name)+'.json'), JSON.stringify(country, null, 2), (error) => {
        if (error)
            console.log(error)
    })
}

module.exports.initData = function()
{
    fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => {
            return response.json()
        })
        .then(data => {
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
                writeToCache(countryData)
            })
        })
}

exports.updateGlobalData = async function()
{
    var globalData = await fetch('https://disease.sh/v3/covid-19/all')
    var globalResponse = await globalData.json();

    var world={
        name:'Global',
        confirmed:globalResponse.cases,
        deaths:globalResponse.deaths,
        recovered:globalResponse.recovered
    }
    writeToCache(world)
}


exports.updateCountryData = async function(country)
{
    var diacritics='[çôé]'
    if(!country.name.match(diacritics))
    {
            var countryData = await fetch('https://disease.sh/v3/covid-19/countries/' + country.name + '?strict=true')
            var countryResponse = await countryData.json();
            
            country.id=country.id
            country.confirmed = countryResponse.cases
            country.deaths = countryResponse.deaths
            country.recovered = countryResponse.recovered
    }
    console.log(country)
    writeToCache(country)
}


module.exports.getGlobalCovidData = function () {
    var cache = JSON.parse(fs.readFileSync(path.join(__dirname + "/data/Global.json")))
    return cache
}

//read from cache
module.exports.getCountryData = function(name, callback) {
    try{
        var data=JSON.parse(fs.readFileSync(path.join(__dirname + "/data/"+name+".json")))
        callback(data)
    } catch(error){
        callback(data, error)
    }
    
}