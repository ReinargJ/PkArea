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
                <pk-table :pks="allPks"></pk-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import PkTable from './PkTable';

export default {
    name: 'Home',

    data() {
        return {
            allPks: [{
                id: 1 , 
                pk_debut: 115.6, 
                pk_fin: 121, 
                pk_autoroute:'a41', 
                pk_voie: 'lente', 
                pk_sens: 'sud', 
                pk_type: 'FLR', 
                pk_debut_zone: 116, 
                pk_fin_zone: 122.1
            }],
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
                androidDatabaseImplementation: 2, //Workaround pour eviter la corruption si ouverture de plusieurs instances
                createFromLocation: 1
            },  this.loadPks);
        },
        loadPks(){
                this.db.executeSql('CREATE TABLE IF NOT EXISTS pks (id unique, pk_debut, pk_fin, pk_autoroute, pk_voie, pk_sens, pk_type, pk_debut_zone, pk_fin_zone)');
                // this.db.executeSql('INSERT INTO pks VALUES (?,?,?,?,?,?,?,?,?)', [1,115.6,121,'a41','lente','sud','FLR',116,122.1], function(err){
                //     console.log(err);
                // })
                // this.db.executeSql('INSERT INTO pks VALUES (?,?,?,?,?,?,?,?,?)', [2,121.9,122.9,'a41','lente','sud','FLR',122.1,124.8], function(err){
                //     console.log(err);
                // })

                this.db.executeSql('SELECT * FROM pks', [], (rs) => {
                    console.log(rs);
                    console.log(rs.rows.length);
                    if(!rs.rows.length){
                        this.promptLoadFromFile();
                    }else {
                        for(let i = 0; i<rs.rows.length; i++){
                            console.log(rs.rows.item(i), i);
                            this.allPks.push(rs.rows.item(i));
                        }

                    console.log(this.allPks);
                    }
                }, (error) => {
                    this.db.executeSql('CREATE TABLE IF NOT EXISTS pks (id unique, pk_debut, pk_fin, pk_autoroute, pk_voie, pk_sens, pk_type, pk_debut_zone, pk_fin_zone)');                
                    console.log(error);
                });

            
        },
        initDb(){

        },
        promptLoadFromFile(){

        },
        loadPksFromFile(file){
            
        },
        search(){
            
        },
        showAll(){

        },
    },

    mounted() {
        document.addEventListener('deviceready', this.openDb);
    },

    components: {
        PkTable
    }
}

</script>
