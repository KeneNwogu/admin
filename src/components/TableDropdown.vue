<template>
    <!-- dropdown menu -->
    <div class="container">
        <table class="info">
            <tr class="table-heading">
                <th style="width: 15%">Date</th>
                <th style="width: 35%">User Activity</th>
                <th>Detail</th>
            </tr>

            <tr v-for="activity in activities" :key="activity">
                <td>{{ activity.date }}</td>
                <td>
                    {{ activity.details }}
                </td>
                <td>{{ activity.userActivity}}</td>
            </tr>
        </table>
        <div class="container" v-if="activities.length == 0">
            <p>NO DETAILS FOUND</p>
        </div>
    </div>
    
</template>

<script>
// import { parseDate } from "@/composables/parsers.js"
export default {
    props: {
        activities: Array
    },
    setup() {
        // return parseDate
    },
}
</script>

<style scoped>
.container{
    width: 90%;
    margin: 0 auto;
    padding: 1rem;
}

table{
    width: 100%;
    border-collapse: collapse;
}

.table-heading{
    height: 45px;
    padding: 0;
}
.table-heading > th{
    /* width: 100%; */
    font-size: 12px;
    color: #6E6893;
    text-align: left;
    padding-left: 5px;
    text-transform: uppercase;
    align-items: flex-start;
}

/* .info tr{
    border-bottom: 1px solid var(--secondary-color-8);
} */
.open th{
    background-color: var(--secondary-color-7);
}
.detail td{
    font-size: 12px;
    background-color: var(--secondary-color-3);
}
.description{
    padding: 0 50px;
}

.dropdown-table{
    /* position: absolute;
    top: 100%;
    left: 0;
    bottom: -10px; */
    width: 100%;
    background: #F2F0F9;
    margin-bottom: 20px;
}
.dropdown-table > table{
    width: 80%;
    margin: 0 auto;
}

.dropdown-table > table > td{
    padding: 12px;
}
</style>