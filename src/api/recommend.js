import jsonp from '../common/js/jsonp';
import axios from 'axios';
import {commonParms, options} from './config';
export function getRecomment(){
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({},commonParms,{
        platform:'h5',
        uin:0,
        needNewCode:1
    })
    return jsonp(url,data,options)
}
export function getDiscList() {
    
    const url = 'https://api.bzqll.com/music/tencent/hotSongList';
    const data = {
        key:579621905,
        categoryId:10000000,
        sortId:3,
        limit:60
    }
    return axios.get(url,{
        params:data
    })
}