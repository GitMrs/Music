export const singer = state => state.singer
export const rank = state => state.rank
export const pathName = state => state.pathName
export const playing = state => state.playing
export const fullScreen = state=> state.fullScreen
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const playMode = state => state.playMode
export const currentIndex = state => state.currentIndex
export const currentSong = state => {
    return state.playlist[state.currentIndex] || {}
}
