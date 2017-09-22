#!/usr/bin/env node

// Dependencies
let axios = require('axios')
let args = require('yargs-parser')(process.argv.slice(2))

// print help
let printHelp = () => {
  console.log(`
    Howie Hackery:
    --on          switch light on
    --off         switch light off
    --color=COLOR switch light to {COLOR}
    --help        print help
  `);
}

// API and bearer token
const TOKEN = process.env.LIFX_API_KEY
let url = "https://api.lifx.com/v1/lights/all/state"
let config = {
  headers: { 'Authorization': `Bearer ${TOKEN}` }
};

let switchOn = () => {
  let payload = { power: "on"}

  axios.put(url, payload, config).then(results => {
    console.log(results.data)
    return results.data
  })
}

let switchOff = () => {
  let payload = { power: "off"}

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


let valid = args.on || args.off || args.help || args.color

if (args.help || !valid) {
  printHelp()
  process.exit(1)
} else if (args.on) {
  switchOn()
} else if (args.off) {
  switchOff()
} else if (args.color) {
  switchColor(args.color)
}
