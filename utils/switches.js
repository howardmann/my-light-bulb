require('dotenv').config({ path: __dirname + '/../.env' });

let switches = module.exports = {}

// Dependencies
let axios = require('axios')

// API and bearer token
const TOKEN = process.env.LIFX_API_KEY
let url = "https://api.lifx.com/v1/lights/all/state"
let config = {
  headers: { 'Authorization': `Bearer ${TOKEN}` }
};

switches.switchOn = () => {
  let payload = { power: "on" }

  axios.put(url, payload, config).then(results => {
    console.log(results.data)
    return results.data
  })
}

switches.switchOff = () => {
  let payload = { power: "off" }
  axios.put(url, payload, config).then(results => {
    console.log(results.data)
    return results.data
  })
  .catch(err => {
    console.log(err);
  })
}

switches.switchColor = (color) => {
  let payload = {
    power: "on",
    color: color
  }
  axios.put(url, payload, config).then(results => {
    console.log(results.data)
    return results.data
  })
}

switches.switchBrightness = (percentage) => {
  let level = Number(percentage)
  console.log(level);
  let payload = {
    power: "on",
    brightness: level
  }
  axios.put(url, payload, config).then(results => {
    console.log(results.data)
    return results.data
  })  
}
