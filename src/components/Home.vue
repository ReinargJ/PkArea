<template>
    <v-container fluid >
         <v-layout column wrap justify-center id="search-form">
            <v-flex xs12>
                <v-text-field
                name="input-pk"
                label="Chercher un pk"
                type="number"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-select
                :items="autoroutes"
                v-model="paramAutoroute"
                label="Autoroute"
                single-line
                ></v-select>
            </v-flex>
            <v-flex xs12>
                <v-select
                :items="voies"
                v-model="paramVoie"
                label="Voie"
                single-line
                ></v-select>
            </v-flex>
            <v-flex xs12>
                <v-select
                :items="sens"
                v-model="paramSens"
                label="Sens"
                single-line
                ></v-select>
            </v-flex>

            <v-btn @click="search">Rechercher</v-btn>
            <v-btn @click="showAll">Tout afficher</v-btn>
            
        </v-layout>
        <v-layout row wrap id="result">
            <v-flex xs12>
               
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            allPks: [],
            paramAutoroute: 'A410',
            paramSens: 'Nord',
            paramVoie: 'Lente',

            autoroutes: ['A410','ADELAC','A41'],
            voies: ['Lente', 'Rapide'],
            sens: ['Nord', 'Sud'],
            test: "1;115,6;121;a41;lente;sud;FLR;116;122,1\n2;121,9;122,9;a41;lente;sud;FLR;122,1;124,8\n3;124,6;126,8;a41;lente;sud;FLR;124,8;127,7",
            db: null
        }
    },

    methods: {
        openDb(){
            this.db = window.sqlitePlugin.openDatabase({
                name: 'pkarea',
                location: 'default',
                androidDatabaseImplementation: 2 //Workaround pour eviter la corruption si ouverture de plusieurs instances
            });

            this.loadPks();
        },
        loadPks(){
            console.log(this.db);
            this.db.executeSql('SELECT* FROM pks', [], function(rs) {
                console.log(rs.rows);
            }, function(error) {
                console.log('error'+error.message);
            });
            this.allPks = [];
        },
        loadPksFromFile(){
            this.allPks = [];
        },
        search(){
            
        },
        showAll(){

        },
    },

    mounted() {
        document.addEventListener('deviceready', this.openDb);
    }
}

</script>
