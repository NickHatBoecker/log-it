<template>
    <div class="u-mt--medium">
        <v-container>
            <v-row no-gutters>
                <v-col md="7">
                    <v-btn color="primary" small class="u-mb--medium" @click="goBack"><v-icon small left>mdi-arrow-left</v-icon> Go back</v-btn>
                    <v-btn color="success" small class="u-mb--medium" @click="save"><v-icon small left>mdi-content-save</v-icon> Save</v-btn>
                </v-col>
            </v-row>

            <div class="c-settings__wrapper">
                <div class="c-form__form-group">
                    <v-switch v-model="enableColorHighlighting" color="primary" :label="`Enable color highlighting`"></v-switch>
                </div>
                <div class="c-form__form-group">
                    <v-switch v-model="showFullPath" color="primary" :label="`Show full path of log files`"></v-switch>
                    <small class="u-help"><strong>off</strong>: /var/www/apache2/error.log || <strong>on</strong>: error.log</small>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'Settings',

        data () {
            return {
                enableColorHighlighting: null,
                showFullPath: null,

                settings: this.$store.getters.settings,
            }
        },

        mounted () {
            this.enableColorHighlighting = this.settings.highlightColor
            this.showFullPath = this.settings.showFullLogPath
        },

        methods: {
            goBack () {
                this.$router.go(-1)
            },

            save () {
                this.$store.commit('setSettings', {
                    highlightColor: this.enableColorHighlighting,
                    showFullLogPath: this.showFullPath,
                })
            },
        },
    }
</script>

<style lang="scss">
    $spacing-unit: 6px;
    .c-settings__wrapper {
        height: 600px;
        overflow-y: scroll;
        padding: $spacing-unit*2;
    }

    .theme--light.v-messages {
        display: none;
    }

    .c-form__form-group {
        margin-bottom: $spacing-unit*2;
    }

    .u-help {
        color: #888;
    }
</style>
