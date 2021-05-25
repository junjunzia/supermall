//  真正面向axios的封装，但是我们还要自己封装Home.js,Detail.js防止axios
//  有一天不再维护了
import axios from "axios";

export function request(config) {
  // 创建axios实例
    const instance = axios.create({
        baseURL: "http://123.207.32.32:8000",
        timeout: 5000
    })
// 发送真正的网络请求，返回的是一个promise
    return instance(config)
}

export function requestNPS(config) {
    const instance = axios.create({
        baseURL: "http://152.136.185.210:7878/api/m5/",
        timeout: 5000
    })
// 发送真正的网络请求，返回的是一个promise
    return instance(config)
}
