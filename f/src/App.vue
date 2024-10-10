<template>
  <main>
    <div id="app">
      <router-view v-if="isShow"></router-view>    
    </div>
  </main>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    reload() {
      this.isShow= false
      this.$nextTick(function () {
        this.isShow= true
      })
    }, 
    store() {
      console.log('正在保存store的状态到sessionStorage')
      console.log(this.$store.state)
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    }
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息,解决浏览器刷新之后vuex数据丢失的问题，导致需要重复请求网络
    if (sessionStorage.getItem("store")) {
      // this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
      console.log('正在从sessionStorage恢复store')
      // console.log(this.$store.state)
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", this.store)
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.store)
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
 
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
