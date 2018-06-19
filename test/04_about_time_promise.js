const {Observable, Scheduler, Subject} = require('rxjs/Rx')
const {assert, expect} = require('chai')
const {interval} = require('rxjs/observable/interval')

//emit value in sequence every 1 second
const __ = 'Fill in the blank'

function toPromise(source) {
    return Promise.resolve('toto')
}

describe('Time', () => {

    it('asserting with subscription', (done) => {
        let received = null
        const time = 50
        const people = new Subject().delay(time)

        people.asObservable().subscribe(
            e => {
                // collect events
            },
            () => { // what to put as error function so that the test fails?
                },
            () => {
                done()
                // done(new Error('make some assertion on complete'))
            },
        )

        people.next('Godot')
        people.complete() // make sure the assertion is launched
    })

    it('can be tested with a promise', () => {

        const source = interval(10).take(10);

        return new Promise((resolve, reject) => {
            let events = []
            source.subscribe(
                e => {
                    events.push(e)
                },
                reject,
                c => {
                    // expect(events).eql([])
                    resolve()
                }
            )
        })


    });


    it('can be converted to a promise of array', () => {

        const source = interval(10).take(10);

        return toPromise(source).then(allValues => {
            expect(allValues).eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        })
    });



});
