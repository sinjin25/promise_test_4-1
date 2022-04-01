// more realistic test
// will attempt to grab a config file named config.example.json
// if it doesnt exist, it will try creating it then try to load it again

require('colors')
const fse = require('fs-extra')
const path = require('path')
const util = require('util')

const readFilePromise = util.promisify(fse.readFile)
const copyFilePromise = util.promisify(fse.copyFile)
const removePromise = util.promisify(fse.remove)

function getConfig(pathTo) {
    const successHandler = (data) => data
    const recoveryAttempt = () => {
        /* return Promise.reject('force abort') */ // uncomment for example of unrecoverable attempt (to see how main controls)
        return copyFilePromise(path.join('03', 'config.example.json'), pathTo)
        .then(() => readFilePromise(pathTo, 'utf8'))
        .then(successHandler)
        .catch((err) => {
            return Promise.reject('Could not handle the error for'.red, pathTo)
        })
    }

    return readFilePromise(pathTo, 'utf8')
    .then(successHandler)
    .catch((err) => {
        console.log(pathTo, 'handling error'.red, err)
        return recoveryAttempt()
    })
}

function cleanup(pathTo) {
    return removePromise(pathTo)
}

console.log('Starting test\n\n\n'.blue)
getConfig(path.join('03','config.example.json'))
.then((result) => {
    console.log('PASS:'.green, result)
})
.catch((result) => {
    console.log('Was unable to load config file. Aborting'.red)
    process.exit(0)
})

getConfig(path.join('03','config.json')) // should get an error ENOENT
.then((result) => {
    console.log('FAILED BUT RECOVERED'.red, result)
})
.then(() => {
    return cleanup(path.join('03','config.json'))
})
.catch((result) => {
    console.log('Was unable to load config file. Aborting'.red)
    process.exit(0)
})