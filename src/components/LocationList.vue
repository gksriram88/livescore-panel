<template>
<div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
            <LocationListTemplate />
        </el-main>
    </el-container>
</div>
</template>

<script>
import Header from './Header'
import SideMenu from './SideMenu'
import LocationListTemplate from './LocationListTemplate'

export default {
    name: 'App',
    components: {
        Header,
        SideMenu,
        LocationListTemplate
    }
}
</script>
