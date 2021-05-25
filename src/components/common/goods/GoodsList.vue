<template>
    <div id="goods-list">
      <!-- 使用GoodsListItem组件展示props里的goods数据，goods-list-item为goodslist的子组件 -->
      <!-- :goods-item="item"将props数据goods里的item动态绑定即传递给子组件的props里的goods-item -->
        <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
    </div>
</template>

<script>
// 导入GoodsListItem子组件
    import GoodsListItem from "./GoodsListItem";

    export default {
        name: "GoodsList",
        components: {
          // 注册组件
            GoodsListItem
        },
        // props用于接收父组件里传过来的数据
        props: {
            goods: {
              // type为定义数据的类型
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    #goods-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        background-color: white;

        padding: 2px;
    }
</style>
