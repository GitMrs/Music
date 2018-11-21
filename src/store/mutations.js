import * as types from './mutation-type';
const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {
        state.playList = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state, currentIndex) {
        state.currentIndex = currentIndex
    },
    [types.SET_RANK](state,rank){
        state.rank = rank
    },
    [types.SET_PATH_NAME](state,pathName){
        state.pathName = pathName
    },
    [types.SET_DISC](state,disc){
        state.disc = disc
    },
    [types.SET_HISTORY_LIST](state,historyList){
        state.historyList = historyList
    }
}
export default mutations