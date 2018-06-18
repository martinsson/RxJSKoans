const { Observable, Subject }  = require('rxjs/Rx')
const Range = require('../util/range')
const { EventEmitter } = require('events')

QUnit.module('Events')

const __ = 'Fill in the blank'

test('the main event', () => {
  const received = []
  const e = new EventEmitter()
  const subscription = Observable.fromEvent(e, 'change')
    .subscribe(received.push.bind(received))

  e.emit('change', 'R')
  e.emit('change', 'x')
  e.emit('change', 'J')
  e.emit('change', 'S')

  subscription.unsubscribe()

  e.emit('change', '!')

  equal(__, received.join(''))
})
