async function start() {
    return await Promise.resolve('asinc is working')
}

start().then(res => console.log(res))

class Util {
    static id = Date.now()
}

console.log('Util Id:', Util.id)