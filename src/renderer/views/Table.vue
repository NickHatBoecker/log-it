<template>
    <div>
        <v-text-field
            v-model="searchTerm"
            filled
            clearable
            color="blue"
            placeholder="Search"
        ></v-text-field>

        <v-simple-table fixed-header height="450px">
            <thead>
            <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Server</th>
                <th class="text-left">Path</th>
                <th class="text-left">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="log in filteredLogs" :key="log.name">
                <td>{{ log.name }}</td>
                <td>{{ log.server }}</td>
                <td>{{ getPathForOutput(log.path) }}</td>
                <td class="c-logs__actions">
                    <v-btn
                        color="primary"
                        small
                        title="Open log"
                        @click="openLog(log)"
                    ><v-icon>mdi-eye</v-icon></v-btn>
                    <v-btn color="red" dark small title="Remove log" @click="removeLog(log)"><v-icon>mdi-delete</v-icon></v-btn>
                </td>
            </tr>
            </tbody>
        </v-simple-table>

        <v-btn fab right bottom fixed color="primary" title="Add log" @click="showAddLogModal = true">
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>

        <add-log-dialog
            :showModal="showAddLogModal"
            @close="showAddLogModal = false"
            @save="showAddLogModal = false"
        ></add-log-dialog>
    </div>
</template>

<script>
import { getPathForOutput, removeLog } from '../models/Logs.js'
import AddLogDialog from '../components/AddLogDialog'

export default {
    name: 'Table',

    components: { AddLogDialog },

    data: function () {
        return {
            logs: this.$store.getters.logs,
            searchTerm: '',

            showAddLogModal: false,
        }
    },

    computed: {
        filteredLogs: function () {
            if (this.searchTerm) {
                return this.filterLogs(this.searchTerm)
            } else {
                return this.logs
            }
        },
    },

    methods: {
        getPathForOutput,
        removeLog,

        openLog (log) {
            this.$router.push({ path: `/log/${log.id}` })
        },

        filterLogs (query) {
            query = query.toLowerCase() // Case insensitive filter

            const logs = this.logs.filter(x => x.name.toLowerCase().includes(query) || x.server.toLowerCase().includes(query) || x.path.toLowerCase().includes(query))

            return logs
        },
    },
}
</script>

<style lang="scss">
$spacing-unit: 6px;

h1 {
    font-size: 1.3rem;
}

a {
    text-decoration: none;
}

pre {
    background: #333;
    color: #fff;
    padding: $spacing-unit*2;
    white-space: pre-line;
}

.c-log {
    height: 70vh;
    width: 100%;
    overflow: auto;
    display: block;
}

.c-logs__actions .v-icon {
    font-size: 1.5em !important;
}

.u-pt--double {
    padding-top: $spacing-unit*2;
}

.u-pr {
    padding-right: $spacing-unit;
}

.u-mb--medium {
    margin-bottom: $spacing-unit*3;
}

.u-mt {
    margin-top: $spacing-unit;
}

.u-mt--medium {
    margin-top: $spacing-unit*3;
}

.u-c--danger {
    color: red;
}

.u-c--info {
    color: lightblue;
}

.u-c--warning {
    color: orange;
}
</style>
