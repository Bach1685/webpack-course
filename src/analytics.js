import * as $ from 'jquery'

function createAnalitics(){
    let counter = 0
    let destroyed = false
    const listener = () => {
        counter++
        console.log('click!')
    }
    $(document).on('click', listener)

    return{
        destroy(){
            $(document).off('click', listener)
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