<template>
    <v-navigation-drawer fixed v-model="mutatedDrawer" app>
        <v-list subheader>
            <v-subheader inset>Pk Area</v-subheader>
            <v-list-tile @click="updatePks">
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
export default {
    data() {
        return {

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
        updatePks(){

        }
    }
}
</script>

<style>

</style>

