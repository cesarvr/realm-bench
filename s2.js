const SIZE = 2000000

const Realm = require('realm');
const {Decimal128, ObjectId} = require('bson')
let rnd = (n) => Math.floor(Math.random() * n) + 1

const HouseSchema = {
    name: 'House2',
    // properties: {
    //     doors: 'int',
    //     name: 'string',
    //     orientation: 'string',
    //     boolean: 'bool',
    //     faiil: 'mixed'
    // },

    properties: {
        doors: 'int',
        name: 'string',
        orientation: 'string',
        boolean: 'mixed',
        nullable: 'string?',
        faiil: 'string',
        decimal_128: 'decimal128',
        my_id: 'objectId'
    }
}

const SingleSchema = {
    name: 'Single',
    properties: {
        name: 'mixed',
    }
}

let running_test_2 =
    async function() {

    console.log(`Using static types schema creating: ${SIZE}`)

    let realm = await Realm.open({schema: [HouseSchema]})
    realm.write(() => {
        for (let i = 0; i < SIZE; i++) {
            realm.create('House2', {
                doors: 4,
                name: `cesarvld-${rnd(1000)}`,
                orientation: `south-${rnd(1000)}`,
                boolean: true,
                nullable: null,
                /* faiil: new Date() */
                faiil: `${rnd(1000)}-fail?`,
                decimal_128: Decimal128.fromString('6.022e23'),
                my_id: new ObjectId()
            })
        }
    })

    let h = realm.objects('House2')
    console.log('h.isEmpty ->', h.length)
    console.log('h[0].name ->', h[0].name)
    process.exit(0)
    return h
}


let running_test_1 =
    async function() {
    let realm = await Realm.open({schema: [SingleSchema]})

    realm.write(() => realm.create('Single', {name: 'cesarvld'}))

    let h = realm.objects('Single')
    console.log('realm.objects ->', realm.objects)

    console.log('h ->', h)
    console.log('h.description ->', h.description())
    console.log('h.isEmpty ->', h.isEmpty())

    console.log('h[0].name ->', h[0].name)
    return h
}


    module.exports = running_test_2()
