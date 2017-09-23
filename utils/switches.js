let axios = require('axios')

// API and bearer token
const TOKEN = process.env.LIFX_API_KEY || 'cb42f657974bd22e97f0f155b56375fe7c99a86589739280bb877ff433fa6397'
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

let switchBrightness = (percentage) => {
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

module.exports = {
  switchOn,
  switchOff,
  switchColor,
  switchBrightness
}