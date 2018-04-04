<template>
    <v-navigation-drawer fixed v-model="mutatedDrawer" app>
        <v-list subheader>
            <v-subheader inset>Pk Area</v-subheader>
            <v-list-tile @click="handleRefreshClick">
                <v-list-tile-action>
                    <v-icon>refresh</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Mettre à jour les pks</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapAction} from 'vuex'

export default {
    data() {
        return {
            db: null
        }
    },

    props: {
        drawer:{
            type: Boolean,
            required: true
        }
    },

    computed: {
        mutatedDrawer:{
            get(){
                return this.drawer;
            },

            set(v){
                this.$emit('update:drawer', v)
            }
        }
    },

    methods: {
        refreshFromUrl(){
            this.$store.dispatch('refreshFromUrl');
            this.mutatedDrawer = false;
        },
        handleRefreshClick(){
            this.refreshFromUrl('http://localhost:3030/pkarea');
        }
    }
}
</script>

<style>

</style>

