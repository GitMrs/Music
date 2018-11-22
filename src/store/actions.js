import * as types from './mutation-type';
import {playMode} from '../common/js/config';
import { shuffle } from '../common/js/util';
import {saveSearch,deleteSearch,clearSearch,savePlay,saveFavorite,deleteFavorite} from '../common/js/cache';
//查找下标
function findIndex(list,song){
    return list.findIndex( (item) => {
        return item.id === song.id
    })
}
//选择歌曲
export const selectPlay = function({commit,state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST,list)
    if(state.mode === playMode.random){
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST,randomList)
        index = findIndex(randomList,list[index])
    }else{
        commit(types.SET_PLAYLIST,list)
    }
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}
//随机播放
export const randomPlay = function({commit},{list}){
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST,randomList)
    commit(types.SET_CURRENT_INDEX,0)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}
//插入歌曲
export const insertSong = function({commit, state}, song){
    let playlist = state.playList.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    // 当前歌曲
    let currentSong = playlist[currentIndex];
    //查找当前歌曲是否在歌曲列表中
    let fpIndex = findIndex(playlist, song);
    //插入当前歌曲前面
    currentIndex++
    //插入
    playlist.splice(currentIndex, 0, song) 
    //已经包含
    if(fpIndex > -1){
        if(currentIndex > fpIndex){
            playlist.splice(fpIndex, 1)
            currentIndex--
        }else{
            playlist.splice(fpIndex + 1, 1)
        }
    }
    let currentSIndex = findIndex(sequenceList,currentSong) + 1;
    let fsIndex = findIndex(sequenceList, song)
    sequenceList.splice(currentSIndex, 0, song)
    if(fsIndex > -1){
        if(currentSIndex > fsIndex){
            sequenceList.splice(fsIndex,1)
            currentSIndex--
        }else{
            sequenceList.splice(fsIndex + 1, 1)
        }
    }
    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_CURRENT_INDEX,currentIndex)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}
//设置
export const setSearchHistory = function({commit},query){
    commit(types.SET_HISTORY_LIST,saveSearch(query))
}
//删除
export const deleteHistory = function({commit},query){
    commit(types.SET_HISTORY_LIST,deleteSearch(query))
}
//全部删除
export const clearHistory = function({commit}){
    commit(types.SET_HISTORY_LIST,clearSearch())
}
//删除歌曲
export const deleteSong = function({commit,state},song){
    let playlist = state.playList.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    let pIndex = findIndex(playlist,song)
    playlist.splice(pIndex,1)
    let sIndex = findIndex(sequenceList,song)
    sequenceList.splice(sIndex,1)
    if(currentIndex > pIndex || currentIndex === playlist.length ){
        currentIndex--
    }
    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_CURRENT_INDEX,currentIndex)
    if(!playlist.length){
        commit(types.SET_PLAYING_STATE,false)
    }else{
        commit(types.SET_PLAYING_STATE,true)
    }
}
//清空歌曲
export const clearSong = function({commit}){
    commit(types.SET_PLAYLIST,[])
    commit(types.SET_SEQUENCE_LIST,[])
    commit(types.SET_CURRENT_INDEX,-1)
    commit(types.SET_PLAYING_STATE,false)
}
//添加播放历史
export const savePlayHistory = function({commit},song){
    commit(types.SET_PLAY_HISTORY,savePlay(song))
}
//保存收藏
export const saveFavoriteList = function({commit},song){
    commit(types.SET_FAVORITE_LIST,saveFavorite(song))
}
//取消收藏
export const deleteFavoriteList = function({commit},song){
    commit(types.SET_FAVORITE_LIST,deleteFavorite(song))
}