<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <CountryCreationTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import LiveScoreCard from './LiveScoreCard'
import CountryCreationTemplate from './CountryCreationTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        CountryCreationTemplate
    },
    data() {
        return {
            info: null
        }
    }
}
</script>
