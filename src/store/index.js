import Vue from 'vue'
import Vuex from 'vuex'
import {openSqliteDb, resetDb, loadFromUrl, loadFromDb} from '../methods'

Vue.use(Vuex)

const state = {
  allPks: [],
  db: null
}

const mutations = {
  setPks (state, pks){
      state.allPks = pks;
  },
  setDb(state, db){
      state.db = db
  }
}

const actions = {
    refreshFromUrl ({commit, state}) {
        let pks = loadFromUrl('http://jgranier.fr/pkarea', (pks) => {
            commit('setPks', pks);

            resetDb(state.db, pks);
        })
    },
    loadFromDb ({commit, state}) {
        let pks = loadFromDb(state.db,(pks) => {
            console.log(pks);
            commit('setPks', pks)
        });

        
    },
    openDb( {commit, dispatch}, sqlite){
        console.log(sqlite);
        let db = sqlite.openDatabase({
            name: 'pkarea',
            iosDatabaseLocation: 'Library'
            //androidDatabaseImplementation: 2, //Workaround pour eviter la corruption si ouverture de plusieurs instances
        });
        commit('setDb', db);
        dispatch('loadFromDb');
    }
}

const getters = {
  allPks: state => state.allPks
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})