const SIZE = 2000000

const Realm = require('realm');
const {Decimal128, ObjectId} = require('bson')
let rnd = (n) => Math.floor(Math.random() * n) + 1

const Schema = {
    name: 'Test',
    properties: {
        doors: 'int',
        name: 'string',
        orientation: 'string',
        boolean: 'bool'
    }
}

let running_test =
    async function() {

    console.log(`Using static types schema creating: ${SIZE}`)

    let realm = await Realm.open({schema: [Schema]})
    realm.write(() => {
        for (let i = 0; i < SIZE; i++) {
            realm.create(Schema.name, {
                doors: 4,
                name: `cesarvld-${rnd(1000)}`,
                orientation: `south-${rnd(1000)}`,
                boolean: true
            })
        }
    })

    let h = realm.objects(Schema.name)
    console.log('h.isEmpty ->', h.length)
    process.exit(0)
}

module.exports = running_test()
