<template>
    <div id="home">
        <nav-bar class="home-nav">
            <template v-slot:center>首页</template>
        </nav-bar>
        <!-- (5)4.:pull-up-load="true"修改scroll组件里pullUpLoad的默认值(5)1，改为了true，触发了scroll组件里(5)3 -->
        <!--(5)4. @pullingUp="loadMore"监听scroll里的pullingUp函数(5)3，传递给本文件的loadMore函数 -->
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="controlScroll"
                @pullingUp="loadMore"
                :pull-up-load="true">
            <slider :autoplay="3000" :banners="results.banners"/>
            <!-- (2)3.使用轮播图组件，将data里的数据results.recommends传递给子组件的recomends ，步骤4在轮播图组件中-->
            <home-recommend :recommends="results.recommends"/>
            <!--  @tabControlClick="tabCClick" 监听TabControl中的tabControlClick，可获取TabControl中$emit过来的数据
            将获取的index给tabCClick（index）执行-->
            <TabControl class="tab-control"
                        :titles="titles"
                        @tabControlClick="tabCClick"
                        ref="tabControl"/>
            <!-- (4)3.使用goodslist组件，将goods的数据做了些处理变为showGoods传递给子组件（goodslist），去子组件进行具体数据展示-->
            <goods-list :goods="showGoods"/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>

    import NavBar from "../../components/common/navbar/NavBar";
    // 使用goods数据相关用(4)
    // (4)1.导入goodlist组件
    import GoodsList from "../../components/common/goods/GoodsList"
    // (5)上拉加载更多相关，在scroll.vue里
    import Scroll from "../../components/common/scroll/Scroll";
    import BackTop from "../../components/common/backtop/BackTop";

    import TabControl from "../../components/content/tabcontrol/TabControl";
    import Slider from "../../components/common/slider/Slider";
    // (导入组件，使用请求的数据相关用(2)))
    //(2)1.导入轮播图，轮播图被放在了views/home/homechildren里，这里放着home.vue所需的子组件
    import HomeRecommend from "./homechildren/HomeRecommend";
   
    import {mixinImgItemLoad} from "../../common/mixin";
  //  （请求轮播图数据相关）用(1)开头，（请求流行精选商品等数据相关）用(3)开头，
 //(1)1.接收default导出的才能不要大括号，这里home.js文件里getHomeMutidata是用export导出的，所以这里导入要加{}
 //(3)1.导入getNpsData的流行精选商品等数据
    import {
        getHomeMutidata,
        getNpsData
    } from "../../network/Home";

    export default {
        name: "Home",
        data() {
            return {
                results: {
                    banners: [],
                  // (1)4.接收保存来自Home.js中的getHomeMutidata()中的res数据
                    recommends: [],
                    dKeyWords: [],
                    keywords: [],
                    // 关于list：流行精选商品的数据，用户点击流行则显示60条流行的数据，即list里显示60条数据
                    // 用户看完60条商品后点击上拉加载更多，上拉一次多加载30条，则list里的60变为90条
                    // 关于page，用户刚点到流行，此时page为1，一页若显示30条数据，用户往下滑，到page2，则显示到第60条数据了
                    // 此时2页显示完了60条，用户可以上拉加载请求一次数据，此时显示到第90条数据，page+1，变为第3页
                    // 综上：page显示加载到第几页了，list显示加载到第几条数据了，此处默认为0和空数组
                  // (4)4.接收保存来自Home.js中的getNPSData()中的res数据
                    goods: {
                        pop: {page: 0, list: []},
                        sell: {page: 0, list: []},
                        new: {page: 0, list: []}
                    }
                },
                images: [
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg',
                ],
                currentType: 'pop',
                isShowBackTop: false,
                tabOffSetTop: 0,
                saveY: 0,
                titles: ['流行', '热销', '新款'],
                imgItemLoad: null
            }
        },
        computed: {
            showGoods() {
              // 当用户点击的是pop则是this.results.goods['pop'].list,即将pop的list传给goodslist子组件
                return this.results.goods[this.currentType].list
            }
        },
        created() {
          //(1)2.请求数据，getHomeMutidata导入子Home.js,.then这种方法可以写在methods中
            this.getHomeMutidata()
          //(3)2.请求数据，获取来自home.js中getNPSData的流行精选等数据
            this.getNPSData('pop')
            this.getNPSData('new')
            this.getNPSData('sell')
        },
        mixins: [mixinImgItemLoad],
        mounted() {
        }, 
        methods: {
        // 以下为事件监听相关的methods
            tabCClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = "pop"
                        break
                    case 1:
                        this.currentType = "new"
                        break
                    case 2:
                        this.currentType = "sell"
                        break
                }
            },
            controlScroll(position) {
                this.isShowBackTop = position.y < -1000
            },
            // (5)5.将currentType也就是当前用户是处于流行还是精选，传参给getNPSData执行函数，该函数用于获取数据
            loadMore() {
                this.getNPSData(this.currentType)

            },

          // 以下为网络数据请求相关的methods
            // (1)3.将create中获取到的getHomeMutidata()中的res数据保存到data.results中
            getHomeMutidata() {
                getHomeMutidata().then(res => {
                    this.results.banners = res.data.data.banner.list
                    this.results.recommends = res.data.data.recommend.list
                })
            },
            // (3)3.将create中获取到的getNPSData()中的res数据保存到data.results中
            getNPSData(type) {
                const page = this.results.goods[type].page + 1
                getNpsData(type, page).then(res => {
                    this.results.goods[type].list.push(...res.data.data.list)
                    this.results.goods[type].page += 1
                    this.$refs.scroll.scroll.finishPullUp()
                })
            },
            backClick() {
                this.$refs.scroll.scroll.scrollTo(0, 0, 500)
            }
        },
        components: {
            NavBar,
            TabControl,
            // (4)2.注册组件
            GoodsList,
            Scroll,
            BackTop,
            Slider,
            // (2)2.注册组件
            HomeRecommend
        },
        activated() {
            this.$refs.scroll.refresh()
            this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0)

        },
        deactivated() {
            this.saveY = this.$refs.scroll.getY()

            this.$bus.$off('imgItemLoad', this.imgItemLoad)
        }

    }
</script>

<style scoped>
    #home {
        position: relative;
        /*padding-top: 44px;*/
        height: 100vh;
    }

    /*
        吸顶
    */
    /*.tab-control{*/
    /*    position: sticky;*/
    /*    top: 44px;*/
    /*    z-index: 9;*/
    /*}*/
    .tab-control {
        height: 40px;
        line-height: 40px;
    }

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    /*.content {*/
    /*    height: calc(100% - 93px);*/
    /*    overflow: hidden;*/
    /*    margin-top: 44px;*/

    /*}*/

</style>
