import {playMode} from '../common/js/config';
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
    disc:{}
}
export default states