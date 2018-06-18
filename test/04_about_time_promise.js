const {Observable, Scheduler, Subject} = require('rxjs/Rx')
const { assert, expect } = require('chai')

const __ = 'Fill in the blank'

describe('Time', () => {
    it('launching an event via a scheduler', (done) => {
        let received = ''
        const delay = 200 // Fix this value
        Scheduler.async.schedule(() => { received = 'Finished' }, delay)

        setTimeout(() => {
            assert.equal('Finished', received)
            done()
        }, 100)
    })

    it('launching an event in the future', (done) => {
        let received = null
        const time = __
        const people = new Subject()

        people.delay(time).subscribe(x => {
            received = x
        })
        people.next('Godot')
            people.complete()

        setTimeout(() => {
            assert.equal('Godot', received)
            done()
        }, 100)
    })

    it('a watched pot', (done) => {
        let received = ''
        const delay = 200
        const timeout = __
        const timeoutEvent = Observable.of('Tepid')

        Observable
            .of('Boiling')
            .delay(delay)
            .timeoutWith(timeout, timeoutEvent)
            .subscribe(x => {
                received = x
            })

        setTimeout(() => {
            assert.equal(received, 'Boiling')
            done()
        }, 200)
    })

    it('you can place a time limit on how long an event should take', (done) => {
        const received = []
        const timeout = 200
        const timeoutEvent = Observable.of('Tepid')
        const temperatures = new Subject()

        temperatures
            .timeoutWith(timeout, timeoutEvent)
            .subscribe(received.push.bind(received))

        temperatures.next('Started')

        setTimeout(() => {
            temperatures.next('Boiling')
        }, 300)

        setTimeout(() => {
            assert.equal(__, received.join(', '))
            done()
        }, 400)
    })

    it('debouncing', (done) => {
        expect(1)

        const received = []
        const events = new Subject()
        events
            .debounceTime(100)
            .subscribe(received.push.bind(received))

        events.next('f')
        events.next('fr')
        events.next('fro')
        events.next('from')

        setTimeout(() => {
            events.next('r')
            events.next('rx')
            events.next('rxj')
            events.next('rxjs')

            setTimeout(() => {
                assert.equal(__, received.join(' '))
                done()
            }, 200)
        }, 200)
    })

    it('buffering', (done) => {
        const received = []
        const events = new Subject()
        events
            .bufferTime(100)
            .map(c => c.join(''))
            .subscribe(received.push.bind(received))

        events.next('R')
        events.next('x')
        events.next('J')
        events.next('S')

        setTimeout(() => {
            events.next('R')
            events.next('o')
            events.next('c')
            events.next('k')
            events.next('s')

            setTimeout(() => {
                assert.equal(__, received.join(' '))
                done()
            }, 200)
        }, 200)
    })

    it('time between calls', (done) => {
        const received = []
        const events = new Subject()

        events
            .timeInterval()
            .filter(t => t.interval > 100)
            .subscribe(t => {
                received.push(t.value)
            })

        events.next('too')
        events.next('fast')

        setTimeout(() => {
            events.next('slow')

            setTimeout(() => {
                events.next('down')

                assert.equal(__, received.join(' '))
                done()
            }, 120)
        }, 120)
    })

    it('results can be ambiguous timing', (done) => {
        let results = 0
        const first = Observable.timer(10).mapTo(-1)
        const secnd = Observable.timer(20).mapTo(1)

        first.race(secnd).subscribe(x => {
            results = x
        })

        setTimeout(() => {
            assert.equal(results, __)
            done()
        }, 300)
    })

});
