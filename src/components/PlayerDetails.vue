<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <PlayerDetailsTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import PlayerDetailsTemplate from './PlayerDetailsTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        PlayerDetailsTemplate
    }

}
</script>
