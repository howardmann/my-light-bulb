#!/usr/bin/env node

// Dependencies
let args = require('yargs-parser')(process.argv.slice(2))
let {
  switchOn,
  switchOff,
  switchColor,
  switchBrightness
} = require('../utils/switches.js')

// print help
let printHelp = () => {
  console.log(`
    Howie Hackery:
    --on            switch light on
    --off           switch light off
    --color=COLOR   switch light to {COLOR}
    --bright=NUM    switch brightness percentage {FLOAT}
    --help          print help
  `);
}

let valid = args.on || args.off || args.help || args.color || args.bright

if (args.help || !valid) {
  printHelp()
  process.exit(1)
} else if (args.on) {
  switchOn()
} else if (args.off) {
  switchOff()
} else if (args.color) {
  switchColor(args.color)
} else if (args.bright) {
  switchBrightness(args.bright)
}
