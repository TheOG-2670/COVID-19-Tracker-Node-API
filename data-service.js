const fs = require('fs')
const path = require('path')

module.exports.createCountryData = function (data) {
    fs.writeFileSync(path.join(__dirname + '/data/country-store.json'), JSON.stringify(data), (error) => {
        if (error)
            console.log(error)
    })

}

module.exports.returnCountryData = function () {
    return JSON.parse(fs.readFileSync(path.join(__dirname + "/data/country-store.json")))
}