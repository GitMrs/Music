import jsonp from '../common/js/jsonp';
import {commonParms,options} from './config';
export function getRankData(){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    const data = Object.assign({},commonParms,{
        playfrom:'h5',
        needNewCode:0
    })
    return jsonp(url,data,options)
}
export function getRankListData(id){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
    const data = Object.assign({},commonParms,{
        playfrom:"h5",
        topid:id,
        type:'top',
        needNewCode:1,
        tpl:3
    })
    return jsonp(url,data,options)
}