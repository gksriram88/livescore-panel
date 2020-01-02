<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <PastMatchTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import PastMatchTemplate from './PastMatchTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        PastMatchTemplate
    }
}
</script>
