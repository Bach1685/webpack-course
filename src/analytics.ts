import * as $ from 'jquery'

function createAnalitics(): object {
    let counter = 0
    let destroyed: boolean = false
    const listener = (): number => {
        counter++
        console.log('click!')
        return counter
    }
    $(document).on('click', listener)

    return {
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

window['analitics'] = createAnalitics() 