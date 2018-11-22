import {playMode} from '../common/js/config';
import {loadSearch,loadPlay,loadFavorite} from '../common/js/cache';
const states = {
    //路由
    pathName:'',
    // 歌手
    singer:{},
    //榜单
    rank:{},
    //播放器
    playing:false,
    fullScreen:false,
    playList:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:-1,
    // 搜索数据
    disc:{},
    // 搜索历史
    historyList:loadSearch(),
    //播放历史
    playHistory:loadPlay(),
    favoriteList:loadFavorite()
}
export default states