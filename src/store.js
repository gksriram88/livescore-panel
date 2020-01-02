import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scoreCard : {},
    scoreCardHeader : {},
    playersName:{},
    showScoreCard:false,
    highlight1stCol:false,
    highlight2ndCol:false,
    battingTeam:'',
    quickScore:'',
    config:{}
  },
  mutations: {
    addScoreCard(state, scoreCard) {
      state.scoreCard = scoreCard
      return state.scoreCard 
    },
    addScoreCardHeader(state, scoreCardHeader) {
      state.scoreCardHeader = scoreCardHeader
    },
    addPlayersName(state, playersName) {
      state.playersName = playersName
    },
    changeShowScoreCard(state, showScoreCard) {
      state.showScoreCard = showScoreCard
    },
    changebattingTeam(state, battingTeam) {
      state.battingTeam = battingTeam
    },
    changequickScore(state, quickScore) {
      state.quickScore = quickScore
    },
    changeHighlight1stCol(state, highlight1stCol) {
      state.highlight1stCol = highlight1stCol
    },
    changeHighlight2ndCol(state, highlight2ndCol) {
      state.highlight2ndCol = highlight2ndCol
    },
    addConfig(state,config){
      state.config=config
    }
  },
  getters: {
    scoreCard: state => state.scoreCard,
    scoreCardHeader : state => state.scoreCardHeader,
    playersName : state => state.playersName,
    showScoreCard : state => state.showScoreCard,
    highlight1stCol : state => state.highlight1stCol,
    highlight2ndCol : state => state.highlight2ndCol,
    config : state => state.config,
    battingTeam:state=>state.battingTeam,
    quickScore:state=>state.quickScore
  }
})
