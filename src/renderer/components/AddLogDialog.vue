<template>
    <v-dialog v-model="showModal" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="blue darken-3">
                <v-btn icon dark @click="resetAndClose">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Add log</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn text dark @click="save"><v-icon small left>mdi-content-save</v-icon> Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container>
                <v-form>
                    <v-text-field
                            v-model="formLogname"
                            label="Log name"
                            placeholder="e.g. domain.test"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="formServername"
                            label="Server name (SSH host for remote log files)"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="formLogpath"
                            label="Log path"
                            placeholder="/var/www/apache2/error_log"
                            required
                    ></v-text-field>
                    <v-checkbox
                            v-model="formIsRemote"
                            label="Log file is on remote server"
                    ></v-checkbox>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    import { hashCode } from '../models/Logs.js'

    export default {
        name: 'AddLogDialog',

        props: {
            showModal: {
                type: Boolean,
                default: false,
                required: true,
            },
        },

        data () {
            return {
                formLogname: '',
                formServername: 'localhost',
                formLogpath: '',
                formIsRemote: false,
            }
        },

        methods: {
            close () {
                this.$emit('close')
            },

            resetAndClose () {
                this.reset()
                this.close()
            },

            reset () {
                this.formLogname = ''
                this.formServername = 'localhost'
                this.formLogpath = ''
                this.formIsRemote = false
            },

            save () {
                if (!this.formLogname || !this.formServername || !this.formLogpath) {
                    return
                }

                try {
                    const logs = this.$store.getters.logs || []
                    logs.push(this.createLogObject())
                    this.$store.commit('setLogs', logs)

                    this.reset()
                    this.$emit('save')
                } catch (e) {
                    alert(e)
                }
            },

            createLogObject () {
                const log = {
                    name: this.formLogname,
                    server: this.formServername,
                    path: this.formLogpath,
                    isRemote: this.formIsRemote,
                }

                log.id = hashCode(`${log.name}_${log.server}_${log.path}`)

                return log
            },
        },
    }
</script>
