<template>
    <v-data-table
      :headers="headers"
      :items="pks"
      :search="search"
      :rows-per-page-items="[15,20,50,{'text':'All','value':-1}]"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.pk_debut }}</td>
        <td >{{ props.item.pk_fin }}</td>
        <td >{{ props.item.pk_type }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Aucun pk trouvé"{{ search }}" found no results.
      </v-alert>
      <template slot="no-data">
        Aucun pk a afficher
      </template>
    </v-data-table>
</template>
<script>
export default {
    name: 'PkTable',

    props: {
        pks: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            search: '',
            headers: [
                { text: 'Pk de debut', value: 'pk_debut' },
                { text: 'Pk de fin', value: 'pk_fin' },
                { text: 'Type', value: 'pk_type' },
            ],
        }
    },

    methods: {
      
    },

    mounted() {
        
    }
}

</script>
