<template>
  <div>
    <head-bar></head-bar>
    <el-container>
      <el-aside width="20%" style="min-height: 600px;" >
        <StudentMenu></StudentMenu>
      </el-aside>
      <el-main width="75%">

      </el-main>
      <el-aside width="5%"></el-aside>
    </el-container>
  </div>
</template>

<script>
import Element from "element-ui";
export default {
  data(){
    return{
      isCollapse:false,
    }
  },
}
</script>

<style scoped>
.header{
  height: 50px;
  display: flex;
  color: aqua;
}
</style>