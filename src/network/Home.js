// 封装所有首页数据请求（一个函数就是一个首页数据请求），
// 对首页所有url进行管理
import {request, requestNPS} from "./request";

// 获取首页的多个数据
export function getHomeMutidata() {
  // 返回的是调用自request.js的request函数，而request返回的又是promise，所有这里返回的就是promise
  // home.vue导入了 getHomeMutidata，并且在create里调用了 getHomeMutidata（），
  // 则可以通过 getHomeMutidata（）.then获取结果res， getHomeMutidata（）.then（res=>{console.log(res)}）
    return request({
        url: "/home/multidata"
    })
}

// 获取流行精选商品数据
export function getNpsData(type, page) {
    return requestNPS({
        url: 'home/data',
        // params加到url？后面
        params: {
            type,
            page
        }
    })
}
