import Vue from 'vue'
import Vuex from 'vuex'
import {openDb, resetDb, loadFromUrl, loadFromDb} from '../methods'

Vue.use(Vuex)

const state = {
  allPks: []
}

const mutations = {
  setPks (state, pks){
      state.allPks = pks;
  }
}

const actions = {
    refreshFromUrl ({commit}, url) {
        let pks = loadFromUrl('http://54.38.241.19/pkarea', (pks) => {
            commit('setPks', pks);

            let db = openDb('pkarea', 'default');
            resetDb(db, pks);
            
            db.close();
        })
    },
    loadFromDb ({commit}) {
        let db = openDb('pkarea', 'default');
        
        let pks = loadFromDb(db);
        db.close(); 

        commit('setPks', pks)
    },
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