import Vue from 'vue'
import Vuex from 'vuex'
import notification from "./module/notification.js"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0,
    // Mail:null,
    // userID:null
  },
  mutations: {
    increment(state){
      state.count++;
    },

    changeLogin(state,user){
      state.UID = user.UID;
      state.Mail = user.Mail;
      localStorage.setItem('Mail',user.Mail);
      localStorage.setItem('UID',user.UID);
    }

    // changeLogin(state,user){
    //   state.userID = user.userID;
    //   state.Mail = user.Mail;
    //   // localStorage.setItem('Mail',user.Mail);
    //   localStorage.setItem('userID',user.userID);
    //   console.log(user)
    //     }

  },
  actions: {
  },
  modules: {
    message: notification
  }
})
