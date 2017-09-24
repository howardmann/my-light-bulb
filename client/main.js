let makeSpeech = require('./speech')
let services = {
  $: require('jquery')
}

// Using dependency injection
let speech = new makeSpeech(services)
speech.init()
