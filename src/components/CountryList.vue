<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <CountryListTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import CountryListTemplate from './CountryListTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        CountryListTemplate
    },
    data() {
        return {
            info: null
        }
    }
}
</script>
