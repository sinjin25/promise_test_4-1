function myTest() {
    return Promise.resolve(15)
}

// then followed by catch
// mytest resolved 15
// then it threw Error: An error
myTest()
.then((result) => {
    console.log('mytest resolved', result)
    throw Error('An error')
})
.catch((err) => {
    console.log('Then it threw', err)
})

// then+catch
// mytest resolved 15
// 'Then the throw got handled in the next catch' An error
myTest()
.then((result) => {
    console.log('mytest resolved', result)
    throw Error('An error')
}, (err) => {
    console.log('Will the throw be handled here?', err) // this would only handle if the previous then made an error
})
.catch((err) => {
    console.log('Then the throw got handled in the next catch', err)
})

// running these two tests together will result in resolve runnign together, then error runnign together
// this is because the shit is throw in the event loop (queue); it is not synchronous, even if it resolves instantly