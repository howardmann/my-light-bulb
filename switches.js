let axios = require('axios')

// API and bearer token
const TOKEN = process.env.LIFX_API_KEY
let url = "https://api.lifx.com/v1/lights/all/state"
let config = {
  headers: { 'Authorization': `Bearer ${TOKEN}` }
};

let switchOn = () => {
  let payload = { power: "on" }

  axios.put(url, payload, config).then(results => {
    console.log(results.data)
    return results.data
  })
}

let switchOff = () => {
  let payload = { power: "off" }

  axios.put(url, payload, config).then(results => {
    console.log(results.data)
    return results.data
  })
}

let switchColor = (color) => {
  let payload = {
    power: "on",
    color: color
  }
  axios.put(url, payload, config).then(results => {
    console.log(results.data)
    return results.data
  })
}

module.exports = {
  switchOn,
  switchOff,
  switchColor
}