<template>
    <div class="u-mt--medium">
        <v-container>
            <v-row no-gutters>
                <v-col md="3">
                    <v-btn color="primary" small class="u-mb--medium" @click="goBack()"><v-icon small>mdi-arrow-left</v-icon> Go back</v-btn>
                    <v-btn
                        color="info"
                        small
                        class="u-mb--medium"
                        @click="scrollDownToEnd()"
                        ref="scrollToEnd"
                        :disabled="scrollToEndIsDisabled"
                        v-if="activeLog"
                    >
                        <v-icon small>mdi-arrow-down</v-icon> Go to end
                    </v-btn>
                </v-col>
                <v-col>
                    <v-switch
                        v-model="reloadAutomatically"
                        color="primary"
                        :label="reloadLabel"
                    ></v-switch>
                </v-col>
            </v-row>

            <template v-if="activeLog">
                <h1>{{ activeLog.path }}</h1>
                <table class="c-log u-mt" @scroll="checkScrolling" ref="logContent">
                    <tr v-for="line in activeLogContent" :key="line.number">
                        <td valign="top" class="u-pt--double u-pr">{{ line.number }}</td>
                        <td><pre>{{ line.line }}</pre></td>
                    </tr>
                </table>
            </template>
        </v-container>
    </div>
</template>

<script>
import { createDummyLocalFile, findById as findLogById, getContent as getLogContent, removeDummyLocalFile } from '../models/Logs.js'

export default {
    name: 'ViewLog',

    data () {
        return {
            activeLog: [],
            activeLogContent: [],
            scrollToEndIsDisabled: false,
            logPath: '',
            refreshIntervalId: '',
            reloadAutomatically: true,
        }
    },

    computed: {
        reloadLabel () {
            return this.reloadAutomatically ? 'Log is reloaded automatically' : 'You have to reload manually'
        },
    },

    async mounted () {
        this.activeLog = await findLogById(this.$route.params.logId)
        await this.updateContent()

        const that = this
        that.refreshIntervalId = setInterval(async function () {
            if (that.reloadAutomatically) {
                await that.updateContent()
                that.checkScrolling()
            }
        }, 5000)
    },

    methods: {
        goBack () {
            if (this.activeLog.isRemote && this.logPath.length) {
                removeDummyLocalFile(this.logPath)
            }

            // Otherwise app tries to open log even on table view
            clearInterval(this.refreshIntervalId)

            this.$router.push({ path: `/` })
        },

        scrollDownToEnd () {
            this.$refs.logContent.scrollTop = this.$refs.logContent.scrollHeight
        },

        checkScrolling () {
            const logContent = this.$refs.logContent
            if (logContent.scrollTop + logContent.clientHeight >= logContent.scrollHeight) {
                this.scrollToEndIsDisabled = true
            } else {
                this.scrollToEndIsDisabled = false
            }
        },

        async updateContent () {
            if (this.activeLog.isRemote) {
                this.logPath = await createDummyLocalFile(this.activeLog)
            } else {
                this.logPath = this.activeLog.path
            }

            this.activeLogContent = getLogContent(this.logPath)
        },
    },
}
</script>

<style>
    .v-input--selection-controls {
        margin: 0 !important;
    }
</style>
