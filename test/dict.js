const Realm = require('realm');
const fs = require('fs')
const { spawn } = require('child_process')

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
    name: 'Dictionary',
    properties: {
        name: '{}',
    }
}

let realm = undefined

describe('Testing Dictionary', () => {
    before(async ()=>{
        remove_db_files()
        realm = await Realm.open({schema: [SingleSchema]})
    })

    it('Dict instanciation', () => {
        realm.write(()=> realm.create(SingleSchema.name, { name: { ooo: 'xxx' } }  ))
    })

    after(()=>remove_db_files())
})
