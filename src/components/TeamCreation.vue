<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <TeamCreationTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import LiveScoreCard from './LiveScoreCard'
import TeamCreationTemplate from './TeamCreationTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        TeamCreationTemplate
    }
}
</script>
