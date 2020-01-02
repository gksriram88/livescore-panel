<template>
<el-aside class="sidemenu" width="auto">
    <div style="margin: 20px 10px; text-align: left;">
        <el-button v-if="isCollapse" type="plain" @click="expand"><i class="el-icon-tickets"></i></el-button>
        <el-button v-else type="plain" @click="collapse"><i class="el-icon-caret-left"></i></el-button>
    </div>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true" style="border-right: none; text-align: left; margin-right: 10px;">
        <el-submenu index="1">
            <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <img class='el-icon-menu' src="https://images.sportsflashes.com/1556529980-cricket-equipment.svg">
                <span slot="title">Match</span>
            </template>
            <el-menu-item index="1-1" :route="{name:'MatchCreation'}">Create Match
            </el-menu-item>
            <el-menu-item index="1-2" :route="{name:'MatchList'}">Match List</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <img class='el-icon-menu' src="https://images.sportsflashes.com/1556534807-1246264.svg">
                <span slot="title">LIVE</span>
            </template>
            <el-menu-item index="1-1" :route="{name:'LiveMatchList'}">LIVE Panel</el-menu-item>
            <!-- <el-menu-item index="1-2" :route="{name:'Coment'}">LIVE Comment</el-menu-item> -->
        </el-submenu>

        <el-submenu index="3">
            <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <img class='el-icon-menu' src="https://images.sportsflashes.com/1556535494-1623367.svg">
                <span slot="title">Teams</span>
            </template>
            <el-menu-item index="1-1" :route="{name:'TeamCreation'}">Create Team</el-menu-item>
            <el-menu-item index="1-2" :route="{name:'TeamList'}">Team List</el-menu-item>
        </el-submenu>

        <el-submenu index="4">
            <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <img class='el-icon-menu' src="https://images.sportsflashes.com/1556534867-1682761.png">
                <span slot="title">Country</span>
            </template>
            <el-menu-item index="1-1" :route="{name:'CountryCreation'}">Create Country</el-menu-item>
            <el-menu-item index="1-2" :route="{name:'CountryList'}">Country List</el-menu-item>
        </el-submenu>

        <el-submenu index="5">
            <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <img class='el-icon-menu' src="https://images.sportsflashes.com/1556535723-1152912.svg">
                <span slot="title">Match Type</span>
            </template>
            <el-menu-item index="1-1" :route="{name:'MatchtypeCreation'}">Create Matchtype</el-menu-item>
            <el-menu-item index="1-2" :route="{name:'MatchtypeList'}">MatchType List</el-menu-item>
        </el-submenu>

        <el-submenu index="6">
            <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <img class='el-icon-menu' src="https://images.sportsflashes.com/1556531508-cricket-player.svg">
                <span slot="title">Players</span>
            </template>
            <el-menu-item index="1-1" :route="{name:'PlayerCreation'}">Add Player</el-menu-item>
            <el-menu-item index="1-2" :route="{name:'PlayerList'}">Players List</el-menu-item>
        </el-submenu>

        <el-submenu index="7">
            <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <img class='el-icon-menu' src="https://images.sportsflashes.com/1556535093-33622.svg">
                <span slot="title">Venue</span>
            </template>
            <el-menu-item index="1-1" :route="{name:'LocationCreation'}">Add Venue</el-menu-item>
            <el-menu-item index="1-2" :route="{name:'LocationList'}">Venue List</el-menu-item>
        </el-submenu>
    </el-menu>
</el-aside>
</template>

<script>
export default {
    name: "sidemenu",
    data() {
        return {
            isCollapse: true
        };
    },
    methods: {
        collapse() {
            this.isCollapse = true
        },
        expand() {
            this.isCollapse = false
        },
    }
}
</script>
