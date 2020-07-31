import axios from "axios";
// 路径配置
import qs from 'query-string'


// 转化参数
const paramTransfer = function (params) {
  if (typeof params !== 'object') {
    return params
  }
  const data = {}
  const propertyOptions = {
    enumerable: false, //枚举
    configurable: false, //配置
    writable: false //可写的
  }
  for (const prop in params) {
    if (params.hasOwnProperty(prop)) {
      const children = params[prop]
      if (Array.isArray(children)) {
        // 如果是数组，循环数组
        children.forEach((child, index) => {
          for (const ch in child) {
            const key = prop + '[' + index + '].' + ch
            propertyOptions.value = child[ch]
            Object.defineProperty(data, key, {
              get: function () {
                return child[ch]
              },
              enumerable: true,
              configurable: true
            })
          }
        })
      } else {
        propertyOptions.value = children
        Object.defineProperty(data, prop, {
          get: function () {
            return children
          },
          enumerable: true,
          configurable: true
        })
      }
    }
  }
  return qs.stringify(data, {
    arrayFormat: 'index'
  })
}
// 创建axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 10000, // 请求超时时间
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // 本项目使用application/x-www-form-urlencoded格式
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  paramsSerializer: paramTransfer
});

// request 拦截器
service.interceptors.request.use(
  (config) => {
    // 这里可以自定义一些config 配置
    try {
      const data = config.data
      if (data) {
        config.data = paramTransfer(config.data)
      }
    } catch (e) {
      return config
    }
    return config;
  },
  (error) => {
    //  这里处理一些请求出错的情况

    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 这里处理一些response 正常放回时的逻辑

    return res;
  },
  (error) => {
    // 这里处理一些response 出错时的逻辑

    return Promise.reject(error);
  }
);

export default service;