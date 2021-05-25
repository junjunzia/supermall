<template>
    <div id="tab-control">
      <!--   1.@click="changeItem(index)"监听点击，将点击的index传递给changeItem函数执行  -->
        <div v-for="(item ,index) in titles" :key="index"
             class="tab-control-item"
             :class="{active:index === currentIndex}"
             @click="changeItem(index)">
            <span class="stitle">{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        data() {
            return {
                currentIndex: 0
            }
        },
        props: {
            titles: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            changeItem(index) {
                this.currentIndex = index
                // 2.将收到的index传递出去给tabControlClick接收，$emit传递出去的事件名字叫tabControlClick
                // 父组件也通过tabControlClick这个名字接收，父组件中@tabControlClick="tabCClick"
                this.$emit("tabControlClick", index)
            }
        }
    }
</script>

<style scoped>
    #tab-control {
        display: flex;
        background-color: white;
    }

    .tab-control-item {
        flex: 1;

        text-align: center;
        font-size: 16px;
    }

    .active {
        color: hotpink;
    }

    .active span {
        padding: 5px;
        border-bottom: 3px solid hotpink;
    }
</style>
