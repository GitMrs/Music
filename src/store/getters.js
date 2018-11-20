export const singer = state => state.singer
export const rank = state => state.rank
export const pathName = state => state.pathName
export const playing = state => state.playing
export const fullScreen = state=> state.fullScreen
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const playMode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = state => {
    // console.log(state.playList[state.currentIndex])
    return state.playList[state.currentIndex] || {}
}
export const disc = state => state.disc
