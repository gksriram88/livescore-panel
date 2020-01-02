<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <TeamPlayersListTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import TeamPlayersListTemplate from './TeamPlayersListTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        TeamPlayersListTemplate
    }
}
</script>
