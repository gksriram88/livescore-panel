<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <TeamListTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import TeamListTemplate from './TeamListTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        TeamListTemplate
    }
}
</script>
