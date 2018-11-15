import {playMode} from '../common/js/config';
const states = {
    singer:{},
    playing:false,
    fullScreen:false,
    playList:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:-1
}
export default states