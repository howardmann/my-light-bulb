// Util dependencies 
// NOTE: we have to wrap it in the switches object to be able to use sinon stub; This is annoying but it allows us to write unit tests
let switches = require('../utils/switches.js')

// Constuctor function
// NOTE: We cannot use arrow functions for constructor functions
let makeSpeech = function(services){
  this.init = () => {
    this.cacheDOM()
    this.setup()
    this.bindEvents()
    this.render()
  }
  this.cacheDOM = () => {
    this.$main = services.$('#main')
  }
  this.setup = () => {
    this.transcript = 'Text renders here'        
    this.recognition = new (services.window.SpeechRecognition || services.window.webkitSpeechRecognition || services.window.mozSpeechRecognition || services.window.msSpeechRecognition)()
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true;
    this.recognition.continuous = true;
    this.recognition.start();
  }
  this.bindEvents = () => {
    this.recognition.onresult = (event) => {
      let index = event.resultIndex
      let text = event.results[index][0].transcript
      this.callSwitch(text)
    }
    this.recognition.onend = this.restart.bind(this)
  }
  this.callSwitch = (text) => {
    this.transcript = text
    console.log('You said: ', this.transcript)
    this.render(this.transcript)
    this.regexSwitch(this.transcript)
  }
  this.regexSwitch = (transcript) => {
    if (/open/gi.exec(transcript)) {
      console.log('open');
      switches.switchOn()
    } else if (/close/gi.exec(transcript)) {
      console.log('close');
      switches.switchOff()
    } else if (/magic/gi.exec(transcript)) {
      console.log('magic');
      switches.switchColor('random')
    } else if (/white/gi.exec(transcript)) {
      switches.switchColor('white')
    } else if (/strong/gi.exec(transcript)) {
      console.log('strong');
      switches.switchBrightness(1)
    } else if (/medium/gi.exec(transcript)) {
      console.log('medium');
      switches.switchBrightness(0.6)
    } else if (/weak/gi.exec(transcript)) {
      console.log('weak');
      switches.switchBrightness(0.2)
    }
  }
  this.restart = () => {
    console.log('restart');
    this.recognition.start()
  },
  this.render = () => {
    this.$main.html(this.transcript)
  }
}

module.exports = makeSpeech