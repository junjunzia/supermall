<template>
<!-- 使用展示props里 goodsItem数据 -->
    <div class="goods-item">
      <!-- :src="showImg"动态绑定图片地址 ，图片地址来自goodsitem里，可以在可视化vue的home里看到图片地址叫showImg-->
        <!-- @load="imgLoad"img加载完执行imgLoad，@click="goToDetail"监听到点击img则执行 goToDetail-->
        <img :src="showImg" alt="" @load="imgLoad" @click="goToDetail">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">￥{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        // 接收父组件goodslist传递过来的数据item， goodsItem里保存的为item数据
        props: {
            goodsItem: {
              // item，即goodsItem类型为对象
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            showImg() {
                return this.goodsItem.image || this.goodsItem.showLarge.img
            },
            getIID() {
                return this.goodsItem.item_id || this.goodsItem.iid
            }
        },
        methods: {
            imgLoad() {
                // 当详情页加载图片时，首页不需要调用加载方法
                // 方式一：
                // if(this.$route.path.indexOf("/home")){
                //     this.$bus.$emit("homeImgItemLoad")
                // } else if(this.$route.path.indexOf("/detail")){
                //     this.$bus.$emit("detailImgItemLoad")
                // }
                this.$bus.$emit("imgItemLoad")
            },
            goToDetail() {
                this.$router.push("/detail/" + this.getIID)
            }
        }
    }
</script>

<style scoped>
    .goods-item {
        padding-bottom: 40px;
        position: relative;

        width: 48%;
    }

    .goods-item img {
        width: 100%;
        border-radius: 5px;
        /*border:3px solid hotpink;*/
    }

    .goods-info {
        font-size: 15px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }

    .goods-info .price {
        color: hotpink;
        margin-right: 20px;
    }

    .goods-info .collect {
        position: relative;
    }

    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>
