var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

$(document).ready(function(){
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
  };

  recognition.onend = function(){
    console.log('does ths end');
  }
})
