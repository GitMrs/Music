import Vue from 'vue';
import Router from 'vue-router';
import Rank from '../components/rank';
import Recommend from '../components/recommend';
import Search from '../components/search';
import Singer from '../components/singer';
import SingerDetail from '../components/singer-detail';

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
            component: Recommend
        },
        {
            path: '/rank',
            name: 'Rank',
            component: Rank
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
        }
    ]
})
