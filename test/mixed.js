const Realm = require('realm');
const assert = require('chai').assert
const fs = require('fs')
const { spawn } = require('child_process')
let {Decimal128, ObjectId} = require('bson')

function remove_db_files() {
    fs.readdir('./', (err, files) => {
      files.forEach(file => {
          if(file.includes('realm')){ 
              //console.log(`${file} -> delete`)
              const ls = spawn('rm', ['-rf', `./${file}`]);
          }
      })
    })
}

const SingleSchema = {
    name: 'Mixed',
    properties: {
        a: 'mixed',
        b: 'mixed',
        c: 'mixed'
    }
}

let realm = undefined

describe('Testing Dictionary', () => {
    before(async ()=>{
        remove_db_files()
        realm = await Realm.open({schema: [SingleSchema]})
    })

    it('create [string, integer, boolean]', () => {
        realm.write(()=> realm.create(SingleSchema.name, { a:'xxxxxx', b:555, c: true }  ))

        let data = realm.objects(SingleSchema.name)[0]
        assert.equal(data.a, 'xxxxxx', 'should store xxxxxx');
        assert.equal(data.b, 555, 'should store 555');
        assert.equal(data.c, true, 'should store boolean (true)');
    })

    it('create [data, date, decimal128]', () => {
        let d128 = Decimal128.fromString('6.022e23')
        let buff = new ArrayBuffer(5)

        buff[0] = 0
        buff[1] = 1
        buff[2] = 2
        buff[3] = 3
        buff[4] = 4

        let date = new Date()

        realm.write(()=> realm.create(SingleSchema.name, { a: date, b: buff, c: d128 }  ))

        let data = realm.objects(SingleSchema.name)[1]
        assert.strictEqual(data.a.toString(), date.toString(),'should store a date');
        assert.deepEqual(data.c, d128, 'should store a BSON Decimal128');
        assert.equal(data.b.byteLength, buff.byteLength, 'buffer size should be equals');

        console.log('data.b-> ', data.b, typeof data.b)
        console.log('data buff -> ', buff, typeof buff)
        for(let i=0; i<buff.byteLength; i++ ){
            let p2 = data.b[i]
            console.log( '--> ' , p2)
        }

        for(let i=0; i<buff.byteLength; i++ ){
            let p1 = buff[i]
            let p2 = data.b[i]

            console.log( p1, '--> ' , p2)
            assert.equal(p1, p2, 'should store a buffer');
        }

    })

    after(()=>remove_db_files())
})
