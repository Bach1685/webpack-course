function createAnalitics(){
    let counter = 0
    let destroyed = false
    const listener = () => {
        counter++
        console.log(12)
    }
    document.addEventListener('click', listener)

    return{
        destroy(){
            document.removeEventListener('click', listener)
            destroyed = true
        },

        getClicks(){
            if(destroyed){
                return `analytics is destroed. total clicks = ${counter}`
            }
            return counter
        }
    }
}

window.analitics = createAnalitics() 