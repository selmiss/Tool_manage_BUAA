const notification = {
    namespaced: true,
    state: {
        msgPool: [],
    },
    // 逻辑处理,同步函数
    mutations: {
        message(state, step) {
            state.msgPool.push(step)
                //将消息添加到消息列表
            setTimeout(() => {
                state.msgPool.shift()
            }, step.time);
            //清除消息
        }
    },
    // 逻辑处理,异步函数
    actions: {},
}
export default notification;