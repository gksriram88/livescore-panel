<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <MatchtypeListTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import MatchtypeListTemplate from './MatchtypeListTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        MatchtypeListTemplate
    }
}
</script>
