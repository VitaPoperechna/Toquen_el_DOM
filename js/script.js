import { WHITE_KEYS } from './piano.js'
import { BLACK_KEYS } from './piano.js'

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

function pressTheKeys(){
    keys.forEach(key => {
        key.addEventListener('click', () => playNote(key))
    })
}
function pressTheKeysKeybord(){
    document.addEventListener('keydown', e => {
        if (e.repeat) return
        const key = e.key
        const whiteKeyIndex = WHITE_KEYS.indexOf(key)
        const blackKeyIndex = BLACK_KEYS.indexOf(key)
    
        if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
        if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
    
    })
}
function playNote(key){
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currenTime = 0
    noteAudio.play()
    key.classList.add('active')
    
    noteAudio.addEventListener('ended', () => {
        key.classList.remove('active')
    })
}
pressTheKeys();
pressTheKeysKeybord();
console.log(keys);