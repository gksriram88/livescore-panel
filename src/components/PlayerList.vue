<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <PlayerListTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import PlayerListTemplate from './PlayerListTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        PlayerListTemplate
    }
}
</script>
