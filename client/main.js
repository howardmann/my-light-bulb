let makeSpeech = require('./speech')
let services = {
  $: require('jquery'),
  window: window
}

// Using dependency injection
let speech = new makeSpeech(services)
speech.init()
