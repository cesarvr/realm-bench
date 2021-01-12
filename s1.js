const SIZE = 2000000

const Realm = require('realm');
const {Decimal128, ObjectId} = require('bson')
let rnd = (n) => Math.floor(Math.random() * n) + 1

const Schema = {
    name: 'Test',
    properties: {
        doors: 'mixed',
        name: 'mixed',
        orientation: 'mixed',
        boolean: 'mixed',
        nullable: 'mixed',
        faiil: 'mixed',
        decimal_128: 'mixed',
        my_id: 'mixed'
    }
}

let running_test =
    async function() {

    console.log(`Using dynamic types <mixed> schema creating: ${SIZE}`)

    let realm = await Realm.open({schema: [Schema]})
    realm.write(() => {
        for (let i = 0; i < SIZE; i++) {
            realm.create(Schema.name, {
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

    let h = realm.objects(Schema.name)
    console.log('h.isEmpty ->', h.length)
    process.exit(0)
}

module.exports = running_test()
