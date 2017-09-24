// Util dependencies
let {
  switchOn,
  switchOff,
  switchColor,
  switchBrightness
} = require('../utils/switches.js')

// We cannot use arrow functions for constructor functions
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
    this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)()
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true;
    this.recognition.continuous = true;
    this.recognition.start();
  }
  this.bindEvents = () => {
    this.recognition.onresult = this.callSwitch.bind(this)
    this.recognition.onend = this.restart.bind(this)
  }
  this.callSwitch = (event) => {
    let index = event.resultIndex
    this.transcript = event.results[index][0].transcript
    console.log('You said: ', this.transcript)
    this.render(this.transcript)
    this.regexSwitch(this.transcript)
  }
  this.regexSwitch = (transcript) => {
    if (/open/gi.exec(transcript)) {
      console.log('open');
      switchOn()
    } else if (/close/gi.exec(transcript)) {
      console.log('close');
      switchOff()
    } else if (/magic/gi.exec(transcript)) {
      console.log('magic');
      switchColor('random')
    } else if (/white/gi.exec(transcript)) {
      switchColor('white')
    } else if (/strong/gi.exec(transcript)) {
      console.log('strong');
      switchBrightness(1)
    } else if (/medium/gi.exec(transcript)) {
      console.log('medium');
      switchBrightness(0.6)
    } else if (/weak/gi.exec(transcript)) {
      console.log('weak');
      switchBrightness(0.2)
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