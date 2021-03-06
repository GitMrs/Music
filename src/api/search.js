import jsonp from '../common/js/jsonp';
import axios from 'axios';
import {commonParms,options} from './config';

export function getHotKey(){
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
    const data = Object.assign({},commonParms,{
        playfrom:"h5",
        needNewCode:1
    })
    return jsonp(url,data,options)
} 
export function searchKey(query,page,zhida){
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
    const data = Object.assign({},commonParms,{
        w: query,
        p: page,
        catZhida: zhida ? 1 : 0,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        prepage:20,
        n:20,
        remoteplace: 'txt.mqq.all',
        uin: 0,
        needNewCode: 1,
        platform: 'h5',
    })
    return jsonp(url,data,options)
}