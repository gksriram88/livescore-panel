<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <TeamDetailsTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import TeamDetailsTemplate from './TeamDetailsTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        TeamDetailsTemplate
    }
}
</script>
