<template>
    <div style="display: flex">
        <div style="min-width:200px">
            <el-menu class="el-menu-vertical-demo" :default-active="this.$router.path" active-text-color="#a6dcff"
                router>
                <el-menu-item index="/borrowRecord">
                    <i class="el-icon-document"></i>
                    <span slot="title">个人记录</span>
                </el-menu-item>
                <el-menu-item index="/tools">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">工具借用</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div> <router-view></router-view></div>
    </div>
</template>

<script>
export default {
    name: 'studentmenu',
}
</script>

<style></style>