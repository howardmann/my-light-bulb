let expect = require('chai').expect
let sinon = require('sinon')
let makeSpeech = require('../../client/speech.js')

let stubServices = {
  $: sinon.stub().withArgs('#main').returns(sinon.stub({
    html: function () { }
  })),
  window: {
    SpeechRecognition: sinon.stub().returns(sinon.stub({
     start: function(){},
     onresult: function(){},
     onend: function(){}  
    }))
  }
}

let speech = new makeSpeech(stubServices)

describe('#speech', () => {
  it('should exist', () => expect(speech).to.not.be.undefined)
  describe('.init', () => {
    it('should call cacheDOM, setup, bindEvents and render', () => {
      // Stub
      let cacheDOMStub = sinon.stub(speech, 'cacheDOM')
      let setupStub = sinon.stub(speech, 'setup')
      let bindEventsStub = sinon.stub(speech, 'bindEvents')
      let renderStub = sinon.stub(speech, 'render')
      let stubsArr = [cacheDOMStub, setupStub, bindEventsStub, renderStub]
      
      // Execute, test and restore
      speech.init()
      stubsArr.forEach(stub => {
        expect(stub.called).to.be.true
        stub.restore()
      })
    })
  })
  describe('.cacheDOM', () => {
    it('should cache #main div into this.$main property', () => {
      speech.cacheDOM()
      expect(stubServices.$.calledWith('#main')).to.be.true
      expect(speech.$main).to.not.be.undefined
    })    
  })
  describe('.setup', () => {
    it('should setup recognition API and set relevant properties', () => {
      speech.setup()
      expect(speech.recognition).to.not.be.undefined
      expect(stubServices.window.SpeechRecognition.called).to.be.true
      expect(speech.recognition.lang).to.equal('en-US')
      expect(speech.recognition.interimResults).to.equal(true)
      expect(speech.recognition.continuous).to.equal(true)
      expect(speech.recognition.start.called).to.be.true
    })    
  })
  describe('.callSwitch', () => {
    it('should update this.transcript and call this.render and this.regexSwitch', () => {
      // Mock event and spies
      let text = 'hello world'
      let renderSpy = sinon.spy(speech, 'render')
      let regexSwitchSpy = sinon.spy(speech, 'regexSwitch')
      
      // Call function
      speech.setup()
      speech.callSwitch(text)

      // Assertions
      expect(speech.transcript).to.equal(text)
      expect(renderSpy.calledWith(text)).to.be.true
      expect(regexSwitchSpy.calledWith(text)).to.be.true
    })
  })
  describe('.restart', () => {
    it('should call recognition.start', () => {
      speech.setup()
      speech.restart()
      // We call speech.setup 3 times above and restart once here. recognition.start is based on the global window object hence this is correct
      expect(speech.recognition.start.callCount).to.be.equal(4)
    })
  })
  describe('.render', () => {
    it('should call call $main.html(transcript)', () => {
      speech.cacheDOM()
      speech.setup()
      // Override transcript for testing purposes
      speech.transcript = 'banana'
      speech.render()
      expect(speech.$main.html.secondCall.args[0]).to.be.eql('banana')
    })
  })
  describe('.regexSwitch', () => {
    // Import dependencies to be stubbed
    let switches = require('../../utils/switches.js')    

    it('should call switchOn if text includes open', () => {
      let stub = sinon.stub(switches, 'switchOn')
      let transcript = 'OPEN'
      speech.regexSwitch(transcript)
      expect(stub.called).to.be.true
      stub.restore()
    })
    it('should call switchOff if text includes close', () => {
      let stub = sinon.stub(switches, 'switchOff')
      let transcript = 'CLOSE'
      speech.regexSwitch(transcript)
      expect(stub.called).to.be.true
      stub.restore()
    })
    it('should call switchColor with random if text includes magic', () => {
      let stub = sinon.stub(switches, 'switchColor')
      let transcript = 'magic mike'
      speech.regexSwitch(transcript)
      expect(stub.calledWith('random')).to.be.true
      stub.restore()
    })
    it('should call switchBrightness with 1 if text includes strong', () => {
      let stub = sinon.stub(switches, 'switchBrightness')
      let transcript = 'strong latte'
      speech.regexSwitch(transcript)
      expect(stub.calledWith(1)).to.be.true
      stub.restore()
    })
    it('should call switchBrightness with 0.6 if text includes medium', () => {
      let stub = sinon.stub(switches, 'switchBrightness')
      let transcript = 'medium body'
      speech.regexSwitch(transcript)
      expect(stub.calledWith(0.6)).to.be.true
      stub.restore()
    })
    it('should call switchBrightness with 0.2 if text includes weak', () => {
      let stub = sinon.stub(switches, 'switchBrightness')
      let transcript = 'weak latte'
      speech.regexSwitch(transcript)
      expect(stub.calledWith(0.2)).to.be.true
      stub.restore()
    })

  })
  describe('.bindEvents', () => {
    describe('for recognition.onresult', () => {
      let stubCallSwitch;
      beforeEach('setup stubs and bindEvents', () => {
        speech.setup()
        // Stub out callSwitch
        stubCallSwitch = sinon.stub(speech, 'callSwitch')
      })
      afterEach('restore stubs', () => {
        stubCallSwitch.restore()
      })
      it('should trigger callSwitch if recognition.onresult is called', () => {
        let mockEvent = {
          resultIndex: 0,
          results: {
            0: {
              0: {
                transcript: 'gday'
              }
            }
          }
        }
        speech.bindEvents()
        speech.recognition.onresult(mockEvent)
        expect(stubCallSwitch.called).to.be.true
        expect(stubCallSwitch.calledWith('gday')).to.be.true
      })
    })
    describe('for recognition.onend', () => {
      let stubRestart;
      let stubBind;
      beforeEach('setup stubs and bindEvents', () => {
        speech.setup()

        // Stub out restart and it's bind method and return the stubbed version of itself
        stubRestart = sinon.stub(speech, 'restart')
        stubBind = sinon.stub(speech.restart, 'bind').returns(speech.restart)
      })
      afterEach('restore stubs', () => {
        stubRestart.restore()
        stubBind.restore()
      })
      it('should bind the restart method to recognition.onend', () => {
        speech.bindEvents()
        expect(stubBind.called).to.be.true
        expect(speech.recognition.onend).to.be.eql(stubRestart)
      })
      it('should trigger restart if recognition.onend is called', () => {
        speech.bindEvents()
        speech.recognition.onend()
        expect(stubRestart.called).to.be.true
        expect(stubRestart.called).to.be.true
      })
    })
  })
})
