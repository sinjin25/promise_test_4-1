require('colors')
function willResolve() {
    return Promise.resolve()
    .then(() => {
        return 'Resolved!!!'.green
    })
}

function willAlsoResolve() {
    return Promise.reject()
    .then(() => {
        return 'It rejected, so it will go to the nearest catch instead'.green // this will not return
    })
    .catch(() => {
        return 'The catch didnt throw, so this is a resolve!!!'.green
    })
}

function willReject() {
    return Promise.reject()
    .then(() => {
        return 'It rejected, so it will go to the nearest catch'.green // this will not return
    })
    .catch(() => {
        return Promise.reject('The catch explicitly rejected, so its still a rejection!!!'.red)
        // alternatively, this rejects in a similar manner
        throw Error('The catch didnt throw, so this is a resolve!!!'.red)
    })
}

willResolve()
.then(result => {
    console.log('willResolve resolved: '.blue, result)
})

willAlsoResolve()
.catch(err => {
    console.log('willAlsoResolve rejected'.blue, err) // this will not run, because willAlsoResolve returned in the catch
})
.then(result => {
    console.log('willAlsoResolve resolved: '.blue, result)
})

willReject()
.then(result => {
    console.log('This will not run because the promise rejected, meaning it goes to the nearest catch'.blue, result)
})
.catch((err) => {
    console.log('willReject rejected'.blue, err)
})

// willResolve ends up follow the .then because it resolves
// willAlsoResolve ends up following with the then because the catch does a standard return, which means we caught an error then resolved appropriately
// willReject rejects, then the catch also rejects. None of the catches do a return (aka resolve) so it ends in a rejection overall.