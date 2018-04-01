<template>
    <v-container fluid >
         <v-layout column wrap justify-center id="search-form">
            <v-flex xs12>
                <v-text-field
                name="input-pk"
                label="Chercher un pk"
                type="number"
                v-model="paramPk"
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
                <pk-table v-if="show" :pks="selectedPks"></pk-table>
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
            allPks: [
                {
                id: 1 , 
                pk_debut: 130.6, 
                pk_fin: 127, 
                pk_autoroute:'a41', 
                pk_voie: 'lente', 
                pk_sens: 'sud', 
                pk_type: 'FLR', 
                pk_debut_zone: 116, 
                pk_fin_zone: 122.1
            },
            {
                id: 1 , 
                pk_debut: 115.6, 
                pk_fin: 121, 
                pk_autoroute:'a410', 
                pk_voie: 'lente', 
                pk_sens: 'sud', 
                pk_type: 'FLR', 
                pk_debut_zone: 116, 
                pk_fin_zone: 122.1
            },
            {
                id: 1 , 
                pk_debut: 115.6, 
                pk_fin: 121, 
                pk_autoroute:'a410', 
                pk_voie: 'lente', 
                pk_sens: 'sud', 
                pk_type: 'Bassin', 
                pk_debut_zone: 116, 
                pk_fin_zone: 122.1
            },
            {
                id: 1 , 
                pk_debut: 115.6, 
                pk_fin: 121, 
                pk_autoroute:'adelac', 
                pk_voie: 'lente', 
                pk_sens: 'sud', 
                pk_type: 'FLR', 
                pk_debut_zone: 116, 
                pk_fin_zone: 122.1
            },
            {
                id: 1 , 
                pk_debut: 115.6, 
                pk_fin: 121, 
                pk_autoroute:'a41', 
                pk_voie: 'lente', 
                pk_sens: 'sud', 
                pk_type: 'FLR', 
                pk_debut_zone: 116, 
                pk_fin_zone: 122.1
            },
            {
                id: 1 , 
                pk_debut: 115.6, 
                pk_fin: 121, 
                pk_autoroute:'a41', 
                pk_voie: 'lente', 
                pk_sens: 'sud', 
                pk_type: 'FLR', 
                pk_debut_zone: 116, 
                pk_fin_zone: 122.1
            },
            {
                id: 1 , 
                pk_debut: 115.6, 
                pk_fin: 121, 
                pk_autoroute:'a41', 
                pk_voie: 'lente', 
                pk_sens: 'sud', 
                pk_type: 'FLR', 
                pk_debut_zone: 116, 
                pk_fin_zone: 122.1
            },
            {
                id: 1 , 
                pk_debut: 115.6, 
                pk_fin: 121, 
                pk_autoroute:'a41', 
                pk_voie: 'lente', 
                pk_sens: 'sud', 
                pk_type: 'FLR', 
                pk_debut_zone: 116, 
                pk_fin_zone: 122.1
            },
            {
                id: 1 , 
                pk_debut: 115.6, 
                pk_fin: 121, 
                pk_autoroute:'a41', 
                pk_voie: 'lente', 
                pk_sens: 'sud', 
                pk_type: 'FLR', 
                pk_debut_zone: 116, 
                pk_fin_zone: 122.1
            }
            ],
            selectedPks:[],
            show: false,
            paramPk: '',
            paramAutoroute: 'a410',
            paramSens: 'nord',
            paramVoie: 'lente',

            autoroutes: [{text:'A410', value: 'a410'},{text: 'ADELAC', value: 'adelac'},{text: 'A41', value: 'a41'}],
            voies: [{text:'Lente', value: 'lente'}, {text: 'Rapide', value: 'rapide'}],
            sens: [{text:'Nord', value: 'nord'}, {text:'Sud', value: 'sud'}],
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
                    if(!rs.rows.length){
                        this.promptLoadFromFile();
                    }else {
                        for(let i = 0; i<rs.rows.length; i++){
                            this.allPks.push(rs.rows.item(i));
                        }
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
            let test =  this.allPks.filter( (pk) => {
                console.log(pk);
                if(this.paramVoie == pk.pk_voie && this.paramAutoroute == pk.pk_autoroute && this.paramSens == pk.pk_sens){
                    if(this.paramSens == 'nord'){
                        if(this.paramPk<pk.pk_debut_zone && this.paramPk>pk.pk_fin_zone){
                            return pk
                        }
                    } else {
                        if(this.paramPk>pk.pk_debut_zone && this.paramPk<pk.pk_fin_zone){
                            return pk
                        }
                    }
                }
            })

            console.log(test);
            this.selectedPks = test 
            this.show = true;
        },
        showAll(){
            this.selectedPks = this.allPks;
            this.show = true;
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
