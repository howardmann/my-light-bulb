// Dependecies
let $ = require('jquery')
let {
  switchOn,
  switchOff,
  switchColor,
  switchBrightness
} = require('../utils/switches.js')

var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

$(document).ready(function () {
  console.log('DOM loaded');
  // Cache DOM
  let $main = $('#main')

  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.continuous = true;
  recognition.start();
  console.log('start');

  recognition.onresult = function (event) {
    let index = event.resultIndex
    let transcript = event.results[index][0].transcript
    console.log('You said: ', transcript);
    $main.html(transcript)
    if (/open/gi.exec(transcript)) {
      console.log('open');
      switchOn()
    } else if (/close/gi.exec(transcript)) {
      console.log('close');
      switchOff()
    } else if (/magic/gi.exec(transcript)) {
      console.log('magic');
      switchColor('random')
    } else if (/white/gi.exec(transcript)){
      switchColor('white')
    } else if (/strong/gi.exec(transcript)) {
      console.log('strong');
      switchBrightness(1)
    } else if (/medium/gi.exec(transcript)){
      console.log('medium');
      switchBrightness(0.6)
    } else if (/weak/gi.exec(transcript)){
      console.log('weak');
      switchBrightness(0.2)
    }
  };

  recognition.onend = function () {
    console.log('restart');
    recognition.start()
  }
})
