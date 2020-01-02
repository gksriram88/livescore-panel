<template>
  <div>
    <Header />
    <el-container>
        <SideMenu />
        <el-main>
          <MatchtypeTeamPointsTemplate />
        </el-main>
    </el-container>
  </div>  
</template>
<script>
import Header from './Header'
import SideMenu from './SideMenu'
import MatchtypeTeamPointsTemplate from './MatchtypeTeamPointsTemplate'

export default {
  name: 'App',
  components: {
    Header,
    SideMenu,
    MatchtypeTeamPointsTemplate
  },
  data () {
    return {
      info: null
    }
  },
  
}
</script>