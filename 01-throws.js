require('colors')

function myTest(id) {
    return Promise.resolve(id)
}

async function main() {
    // then followed by catch
    // mytest resolved 15
    // then it threw Error: An error
    await myTest(15)
    .then((result) => {
        console.log('mytest resolved'.green, result)
        throw Error('some random error')
    })
    .catch((err) => {
        console.log('Then it threw'.red, err)
    })

    // then+catch
    // mytest resolved 15
    // 'Then the throw got handled in the next catch' An error
    await myTest(11)
    .then((result) => {
        console.log('mytest resolved'.green, result)
        throw Error('some random error')
    }, (err) => {
        console.log('Will the throw be handled here?'.blue, err) // this would only handle if the previous .then made an error
    })
    .catch((err) => {
        console.log('Then the throw got handled in the next catch'.red, err)
    })

    await myTest('This will crash the program')
    .then((result) => {
        try {
            console.log('mytest resolved'.green, result)
            throw Error('some random error')
        } catch(e) {
            return Promise.reject(e.red)
        }
    }, (err) => {
        console.log('Will the throw be handled here?'.blue, err) // this would only handle if the previous .then made an error
    })

    console.log('this line will not run because the above test crashed the program'.blue)
}

main()