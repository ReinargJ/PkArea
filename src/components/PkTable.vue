<template>

    <v-data-table
      :headers="headers"
      :items="pks"
      :rows-per-page-items="[15,20,50,{'text':'All','value':-1}]"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.pk_debut }}</td>
        <td >{{ (props.item.pk_fin?props.item.pk_fin:props.item.pk_debut) }}</td>
        <td >{{ props.item.pk_type }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Aucun pk trouvé pour "{{ search }}".
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
            default: () =>[]
        },
        search: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            headers: [
                { text: 'Début', value: 'pk_debut' },
                { text: 'Fin', value: 'pk_fin' },
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

<style>
    table {
        word-break: break-all;
    }
</style>