let expect = require('chai').expect
let sinon = require('sinon')
let axios = require('axios')
let {
  switchOn,
  switchOff,
  switchColor
} = require('../switches.js')

describe('#lifx', () => {
  describe('.switchOn', () => {
    it('should exist', () => expect(switchOn).to.not.be.undefined)
    it('should turn the light on', () => {
      let stub = sinon.stub(axios, 'put').returns(Promise.resolve({data: 'ok'}))
      switchOn()
      expect(stub.called).to.be.true
      expect(stub.calledWith('https://api.lifx.com/v1/lights/all/state', {power: "on"})).to.be.true
      stub.restore()
    })
  })
  describe('.switchOff', () => {
    it('should exist', () => expect(switchOff).to.not.be.undefined)
    it('should turn the light off', () => {
      let stub = sinon.stub(axios, 'put').returns(Promise.resolve({data: 'ok'}))
      switchOff()
      expect(stub.called).to.be.true
      expect(stub.calledWith('https://api.lifx.com/v1/lights/all/state', {power: "off"})).to.be.true
      stub.restore()
    })
  })
  describe('.switchColor', () => {
    it('should exist', () => expect(switchColor).to.not.be.undefined)
    it('should turn the light color based on param', () => {
      let stub = sinon.stub(axios, 'put').returns(Promise.resolve({data: 'ok'}))
      switchColor('blue')
      expect(stub.called).to.be.true
      expect(stub.calledWith('https://api.lifx.com/v1/lights/all/state', {power: "on", color: "blue"})).to.be.true
      stub.restore()
    })
  })
})