<template>
<!-- home.vue里的子组件
这个组件是轮播图，recommend-item就是轮播图里的一张张图片 -->
    <div id="home-recommend">
        <div class="recommend">
            <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
              <!-- 动态绑定item的链接，数据链接地址在vue可视化组件的Home里你呢个看到，每个item都有一个link
              ，数据来自Home.vue的data里的 banner里，在本文件的props里，可以在vue可视化组件的Home里的banner里查看到 -->
                <!-- (2)5.使用数据 -->
                <a :href="item.link">
                    <img v-lazy="item.image">
                </a>
                <div>{{item.title}}</div>
            </div>
        </div>
        <a href="https://act.mogujie.com/zzlx67">
            <img class="reimg" src="../../../assets/img/home/recommend_bg.jpg">
        </a>
    </div>
</template>

<script>
    export default {
        name: "HomeRecommend",
        //(2)4. 接收父组件的results.recommends数据
        props: {
            recommends: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .recommend {
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 16px;
        padding: 10px 0 20px;
        border-bottom: 8px solid #eee;
        background-color: white;
    }

    .recommend-item {
        flex: 1;
    }

    .reimg {
        width: 100%;
    }

    .recommend-item img {
        width: 80px;
        height: 80px;
        margin-top: 10px;
    }
</style>
