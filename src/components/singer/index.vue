<template>
  <div class="singer">
    <ListView :data='singerData' />
  </div>
</template>
<script>
import { getSingerList } from "../../api/singer";
import ListView from '../../base/listView'
import Singer from "../../common/js/singer";
const HOT_NAME = "热门歌手";
const HOT_NUM = "10";
export default {
  name: "singer",
  data() {
    return {
      singerData: []
    };
  },
  created() {
    this._initData();
  },
  methods: {
    _initData() {
      getSingerList().then(res => {
        if (res.code == 0) {
          this.singerData = this._normalizSingerList(res.data.list)
        }
      });
    },
    _normalizSingerList(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_NUM) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });
      let hot =  [];
      let ret = [];
      for(let key in map){
        let val = map[key]
        if(val.title.match(/[a-zA-Z]/)){
          ret.push(val)
        }else if(val.title === HOT_NAME){
          hot.push(val)
        }
      }
      ret.sort((a,b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  },
  components:{
    ListView
  }
};
</script>
<style lang="stylus" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>