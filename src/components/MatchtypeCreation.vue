<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <MatchtypeCreationTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import LiveScoreCard from './LiveScoreCard'
import MatchtypeCreationTemplate from './MatchtypeCreationTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        MatchtypeCreationTemplate
    }
}
</script>
