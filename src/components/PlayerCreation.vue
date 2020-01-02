<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <PlayerCreationTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import LiveScoreCard from './LiveScoreCard'
import PlayerCreationTemplate from './PlayerCreationTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        PlayerCreationTemplate
    }
}
</script>
