<template>
    <v-app>
        <app-drawer :drawer.sync="drawer"></app-drawer>
        <v-toolbar color="primary" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Pk Area</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <router-view></router-view>
            
        </v-content>
    </v-app>
</template>
<script>
import AppDrawer from './components/AppDrawer';

export default {
    data() {
        return {
            drawer: false
        }
    },

    methods: {
    },

    components: {
        AppDrawer
    }
}

</script>
