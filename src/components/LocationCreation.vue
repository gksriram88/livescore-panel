<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <LocationCreationTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import LiveScoreCard from './LiveScoreCard'
import LocationCreationTemplate from './LocationCreationTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        LocationCreationTemplate
    }
}
</script>
