import store from "@/store"

export default {
    //成功提示
    success(data) {
        store.commit("message/message", {
            type: "success", //message类型
            message: data.message ? data.message : data, //message内容
            time: data.time ? data.time : 3000, //message时长，无设置则默认3s
            light: data.light ? data.light : false //message主题，无设置则默认dark
        })
    },

    //错误提示
    error(data) {
        store.commit("message/message", {
            type: "error",
            message: data.message ? data.message : data,
            time: data.time ? data.time : 3000,
            light: data.light ? data.light : false
        })
    },

    //消息提示
    info(data) {
        store.commit("message/message", {
            type: "info",
            message: data.message ? data.message : data,
            time: data.time ? data.time : 3000,
            light: data.light ? data.light : false
        })
    },

    //警告提示
    warning(data) {
        store.commit("message/message", {
            type: "warning",
            message: data.message ? data.message : data,
            time: data.time ? data.time : 3000,
            light: data.light ? data.light : false
        })
    },
}