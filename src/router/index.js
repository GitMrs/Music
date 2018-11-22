import Vue from 'vue';
import Router from 'vue-router';
import Rank from '../components/rank';
import Recommend from '../components/recommend';
import Search from '../components/search';
import Singer from '../components/singer';
import SingerDetail from '../components/singer-detail';
import RankDetail from '../components/rank-detail';
import DistDetail from '../components/disc-deatil';
import User from '../components/user';
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            name: 'Recomment',
            component: Recommend,
            children:[
                {
                    path:":id",
                    component:DistDetail
                }
            ]
        },
        {
            path: '/rank',
            name: 'Rank',
            component: Rank,
            children:[
                {
                    path:':id',
                    component:RankDetail
                }
            ]
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },
        {
            path: '/singer',
            name: 'Singer',
            component: Singer,
            children:[
                {
                    path:':id',
                    component:SingerDetail
                }
            ]
        },
        {
            path: '/user',
            name:'User',
            component:User
        }
    ]
})
