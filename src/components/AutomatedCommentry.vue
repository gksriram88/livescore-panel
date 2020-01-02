<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <AutomatedCommentryTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import AutomatedCommentryTemplate from './AutomatedCommentryTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        AutomatedCommentryTemplate
    }
}
</script>
