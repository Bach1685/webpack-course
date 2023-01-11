async function start() {
    return await Promise.resolve('asinc is working')
}

start().then(res => console.log(res))