<template>
    <div class="u-mt--medium">
        <v-container>
            <v-btn color="primary" small class="u-mb--medium" @click="goBack()"><v-icon small>mdi-arrow-left</v-icon> Go back</v-btn>

            <template v-if="activeLog">
                <v-btn color="info" small class="u-mb--medium" @click="scrollDownToEnd()" ref="scrollToEnd" :disabled="scrollToEndIsDisabled">
                    <v-icon small>mdi-arrow-down</v-icon> Go to end
                </v-btn>
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
        }
    },

    async mounted () {
        this.activeLog = await findLogById(this.$route.params.logId)

        if (this.activeLog.isRemote) {
            this.logPath = await createDummyLocalFile(this.activeLog)
        } else {
            this.logPath = this.activeLog.path
        }

        const that = this
        that.refreshIntervalId = setInterval(function () {
            that.activeLogContent = getLogContent(that.logPath)
            that.checkScrolling()
        }, 1000)
    },

    methods: {
        goBack () {
            if (this.activeLog.isRemote) {
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
    },
}
</script>
