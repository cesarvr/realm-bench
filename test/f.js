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
        toto: 'data',
    }
}

let test_dict = (realm) => {
    SingleSchema.properties.name = '{}'
    realm.write(()=> realm.create(SingleSchema.name, { name: { ooo: 'xxx' } }  ))
}

let test_mixed = async (provider) => {
    SingleSchema.properties.name = 'mixed'
    let realm = await provider(SingleSchema)
    let buff = new ArrayBuffer(5)

    buff[0] = 0
    buff[1] = 1
    buff[2] = 2
    buff[3] = 3
    buff[4] = 4

    realm.write(()=> realm.create(SingleSchema.name, { name: buff, toto:buff } ))
    let data = realm.objects(SingleSchema.name)[0]

    console.log( 'data --> ' , data.name, ' typeof: ', typeof data.name)
    console.log( 'buff --> ' , buff, ' typeof: ', typeof buff)
    for(let i=0; i<buff.byteLength; i++ ){
        let p2 = data.name[i]
        let p3 = data.toto[i]
        console.log(buff[i], ' --> ' , p2, p3)
    }
}

async function f() {
    try{
    test_mixed(async (schema) =>  await Realm.open({schema: [schema]}))
    }catch(e){
        console.log('Error: ', e)
        remove_db_files()
        process.exit(0)
    }
}
f()
