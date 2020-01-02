import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import LiveMatchList from './components/LiveMatchList'
import LiveScorePanel from './components/LiveScorePanel'
import MatchList from './components/MatchList'
import MatchCreation from './components/MatchCreation'
import PastMatch from './components/PastMatch'
import TeamList from './components/TeamList'
import TeamCreation from './components/TeamCreation'
import TeamDetails from './components/TeamDetails'
import TeamPlayersList from './components/TeamPlayersList'
import PlayerList from './components/PlayerList'
import PlayerCreation from './components/PlayerCreation'
import PlayerDetails from './components/PlayerDetails'
import CountryList from './components/CountryList'
import CountryCreation from './components/CountryCreation'
import MatchtypeCreation from './components/MatchtypeCreation'
import MatchtypeList from './components/MatchtypeList'
import TournamentTeamPoints from './components/TournamentTeamPoints'
import LocationCreation from './components/LocationCreation'
import LocationList from './components/LocationList'
import AutomatedCommentry from './components/AutomatedCommentry'
import ManualCommentry from './components/ManualCommentry'

Vue.use(Router)

let routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/livematchlist',
    name: 'LiveMatchList',
    component: LiveMatchList
  },
  {
    path: '/livescorepanel/:id',
    name: 'LiveScorePanel',
    component: LiveScorePanel
  },
  {
    path: '/matchlist',
    name: 'MatchList',
    component: MatchList
  },
  {
    path: '/matchcreation',
    name: 'MatchCreation',
    component: MatchCreation
  },
  {
    path: '/matchedit/:id',
    name: 'MatchEdit',
    component: MatchCreation
  },
  {
    path: '/pastmatch/:id',
    name: 'PastMatch',
    component: PastMatch
  },
  {
    path: '/teamlist',
    name: 'TeamList',
    component: TeamList
  },
  {
    path: '/teamcreation',
    name: 'TeamCreation',
    component: TeamCreation
  },
  {
    path: '/teamedit/:id',
    name: 'TeamEdit',
    component: TeamCreation
  },
  {
    path: '/teamview/:id',
    name: 'TeamView',
    component: TeamDetails
  },
  {
    path: '/playerlist',
    name: 'PlayerList',
    component: PlayerList
  },
  {
    path: '/playercreation',
    name: 'PlayerCreation',
    component: PlayerCreation
  },
  {
    path: '/playeredit/:id',
    name: 'PlayerEdit',
    component: PlayerCreation
  },
  {
    path: '/playerview/:id',
    name: 'PlayerView',
    component: PlayerDetails
  },
  {
    path: '/teamplayerslist/:id',
    name: 'TeamPlayersList',
    component: TeamPlayersList
  },
  {
    path: '/matchtypecreation',
    name: 'MatchtypeCreation',
    component: MatchtypeCreation
  },
  {
    path: '/matchtypelist',
    name: 'MatchtypeList',
    component: MatchtypeList
  },
  {
    path: '/matchtypeedit/:id',
    name: 'MatchtypeEdit',
    component: MatchtypeCreation
  },
  {
    path: '/showtornamentpoints/:id',
    name: 'ShowTurnamentPoints',
    component: TournamentTeamPoints
  },
  {
    path: '/countrylist',
    name: 'CountryList',
    component: CountryList
  },
  {
    path: '/countrycreation',
    name: 'CountryCreation',
    component: CountryCreation
  },
  {
    path: '/countryedit/:id',
    name: 'CountryEdit',
    component: CountryCreation
  },
  {
    path: '/locationlist',
    name: 'LocationList',
    component: LocationList
  },
  {
    path: '/locationcreation',
    name: 'LocationCreation',
    component: LocationCreation
  },
  {
    path: '/locationeedit/:id',
    name: 'LocationEdit',
    component: LocationCreation
  },
  {
    path: '/locationeview/:id',
    name: 'LocationView',
    component: LocationCreation
  },  
  {
    path: '/automatedcommentry/:id',
    name: 'AutomatedCommentry',
    component: AutomatedCommentry
  },
  {
    path: '/manualcommentry/:id',
    name: 'ManualCommentry',
    component: ManualCommentry
  },
  { path: '*', redirect: '/login' }

]

export  const router=new Router({
  mode: 'history',
  routes
})


router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('username');
  if (authRequired && !loggedIn) {
        return next('/login');
  }

  next();
})
