<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <ManualCommentryTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import ManualCommentryTemplate from './ManualCommentryTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        ManualCommentryTemplate
    }
}
</script>
