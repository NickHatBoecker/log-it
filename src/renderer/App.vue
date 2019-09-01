<template>
    <v-app>
        <div id="app" data-app>
            <v-toolbar color="blue darken-3" dark fixed>
                <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                    Log-it!
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="openSettings">
                    <v-icon>settings</v-icon>
                </v-btn>
            </v-toolbar>

            <router-view></router-view>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: 'log-it',

        methods: {
            openSettings () {
                this.$router.push({ path: `/settings` })
            },
        },
    }
</script>

<style lang="scss">
    @import url('https://fonts.cat.net/css?family=Roboto:100,300,400,500,700,900|Material+Icons');
</style>
