<template>
    <v-container fluid>
        <v-card id="card-form">
            <v-layout column wrap justify-center id="search-form">
               <v-text-field name="input-pk" label="Chercher un pk" type="number" v-model="paramPk"></v-text-field> 
                <v-select :items="autoroutes" v-model="paramAutoroute" label="Autoroute" single-line></v-select>
                <v-select :items="voies" v-model="paramVoie" label="Voie" single-line></v-select>
                <v-select :items="sens" v-model="paramSens" label="Sens" single-line></v-select>
               
                <v-btn @click="handleSearchClick">Rechercher</v-btn>
                <v-btn @click="handleShowAllClick">Tout afficher</v-btn>
            </v-layout>
        </v-card>        

        <v-layout row wrap id="result">
            <v-text-field v-if="show || showAll"
                append-icon="search"
                label="Filtrer"
                single-line
                hide-details
                v-model="search"
            ></v-text-field>
            <v-flex xs12>
                <v-card v-if="show">
                    <pk-table  :pks="selectedPks" :search="search"></pk-table>
                </v-card>
                <v-tabs v-if="showAll" v-model="active" color="darkgrey" dark slider-color="primary">
                    <v-tab v-for="(a, index) in autoroutes" :key="index" ripple>
                        {{ a.text }}
                    </v-tab>

                    <v-tab-item v-for="(n, index) in autoroutes" :key="index">
                        <pk-table :pks="filteredPks[n.value]" :search="search"></pk-table>
                    </v-tab-item>
                </v-tabs>
            </v-flex>   
        </v-layout>
    </v-container>
</template>

<script>
import PkTable from "./PkTable";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",

  data() {
    return {
      filteredPks: {},
      active: null,
      selectedPks: [],
      show: false,
      showAll: false,
      paramPk: "",
      paramAutoroute: "a410",
      paramSens: "nord",
      paramVoie: "lente",
      autoroutes: [
        { text: "A410", value: "a410" },
        { text: "ADELAC", value: "adelac" },
        { text: "A41", value: "a41" }
      ],
      voies: [
        { text: "Lente", value: "lente" },
        { text: "Rapide", value: "rapide" }
      ],
      sens: [{ text: "Nord", value: "nord" }, { text: "Sud", value: "sud" }],
        search: ''

    };
  },

  watch: {
    allPks: "filterAllPks"
  },

  computed: {
    allPks() {
      return this.$store.getters.allPks;
    }
  },

  methods: {
    loadFromDb() {
      this.$store.dispatch("loadFromDb");
    },

    //EVENT HANDLERS
    handleSearchClick() {
      this.selectedPks = this.allPks.filter(pk => {
        if (
          this.paramVoie == pk.pk_voie &&
          this.paramAutoroute == pk.pk_autoroute &&
          this.paramSens == pk.pk_sens
        ) {
          if (this.paramSens == "nord") {
            if (
              this.paramPk < pk.pk_debut_zone &&
              this.paramPk > pk.pk_fin_zone
            ) {
              return pk;
            }
          } else {
            if (
              this.paramPk > pk.pk_debut_zone &&
              this.paramPk < pk.pk_fin_zone
            ) {
              return pk;
            }
          }
        }
      });
      this.show = true;
      this.showAll = false;
    },
    handleShowAllClick() {
      this.show = false;
      this.showAll = true;
    },

    // FILTERS
    filterAllPks() {
      this.autoroutes.forEach(autoroute => {
        this.$set(this.filteredPks, autoroute.value, []);
      });

      this.allPks.forEach(pk => {
        this.filteredPks[pk.pk_autoroute].push(pk);
      });
    }
  },

  mounted() {
    this.loadFromDb();
  },

  components: {
    PkTable
  }
};
</script>

<style scoped>
#card-form {
  padding: 16px;
}

#result > div{
    padding-bottom: 16px;
}
</style>
