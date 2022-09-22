<template>
    <div class="search-tab">
        <div class="filter-search">
            <button class="filter-btn" @click.self="open = !open">
                <img @click.self="open = !open" src="@/assets/Filter.png" alt=""> <p>Filter</p> 
                <FilterToggle :open="open" :sort="sort" :filter="filter"/>
            </button>
            <div class="search"><img src="@/assets/Search.png" alt="">
            <input type="text" placeholder="Search Users by Name, Email or Date" v-model="search_key"></div>
        </div>
        <button class="dues" @click="payDues">PAY DUES</button>
    </div>

    <div class="table-heading">
        <p><input type="checkbox"></p>
        <p align="center">Name</p>
        <p align="left">User Status</p>
        <p align="left">payment Status</p>
        <p align="left">Amount</p>
        <p></p>
        <p><span><img src="@/assets/More.png" alt=""></span></p>
    </div>

    <div class="container" v-for="user in users" :key="user.id">
        <table>
            <tr class="row">
                <td align="center"><input type="checkbox" :value="user.id" v-model="selected_users"></td>
                <td class="entry">
                    <div class="mail">
                        <small class="name">{{ user.firstName + ' ' + user.lastName }}</small>
                        <small>{{ user.email }}</small>
                    </div>
                </td>
                <td>
                    <StatusComponent :status_name="user.userStatus" />
                    <small>Last login: {{ parseDate(user.lastLogin) }}</small>
                </td>
                <td>
                    <StatusComponent :status_name="user.paymentStatus" />
                    <small>{{ paymentStatusKeys[user.paymentStatus ]}} on: 15/APR/2020</small>
                </td>
                <td class="amount"><strong>${{ parseCurrency(user.amountInCents) }} </strong> <small>USD</small></td>
                <td class="view">View More</td>
                <td><img src="@/assets/More.png" alt=""></td>  
            </tr>
        </table>
        <TableDropdown :activities="user.activities" v-if="selected_users.includes(user.id)"/>
    </div>
</template>


<script>
import { ref, watch, toRefs, inject } from "vue"
import TableDropdown from "@/components/TableDropdown.vue"
import { parseCurrency, parseDate } from "@/composables/parsers.js"
import StatusComponent from "@/components/StatusComponent.vue"
import FilterToggle from "@/components/FilterToggle.vue"

export default {
    props: {
        users: Array,
        sort: Function,
        search: Function,
        filter: Function
    },
    setup(props) {
        let open = ref(false)
        const store = inject('store')
        const sort_type = "default"

        const search_function = toRefs(props).search

        let search_key = ref('')

        watch(search_key, () => {
            search_function.value(search_key.value)
        })

        let selected_users = ref([])

        function payDues(){
            store.dispatch('payUsers', selected_users.value)
        }

        const paymentStatusKeys = {
            overdue: "Dued",
            paid: "Paid",
            unpaid: "Dues",

        }
        return { open, sort_type, search_key, selected_users, payDues, parseCurrency, paymentStatusKeys, parseDate }
    },
    components: {
        TableDropdown,
        StatusComponent, 
        FilterToggle
    }
}
</script>

<style scoped>
/* filters */
.search-tab{
    width: 100%;
    border-bottom: 1px solid var(--secondary-color-2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: white;
}
.filter-search{
    display: flex;
    align-items: center;
    gap: 10px;
}
.filter-search button{
    width: 80px;
    height: 40px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 10px;
    color: var(--primary-color);
    border: 1px solid var(--secondary-color);
    background-color: #FFF;
    cursor: pointer;
    position: relative;
}
.search{
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid var(--secondary-color-3);
    background-color: var(--secondary-color-3);
    padding: 0 10px;
    width: 380px;
    height: 40px;
    border-radius: 6px;
}
.search input{
    border: none;
    background-color: var(--secondary-color-3);
    width: 100%;
    font-size: 12px;
    outline: none;
}
.dues{
    background-color: var(--primary-color-2);
    color: #FFF;
    height: 40px;
    border-radius: 6px;
    border: 0;
    width: 99px;
    cursor: pointer;
}
/* end filters */

/* table */

table{
    width: 100%;
    align-items: center;
    border-collapse: collapse;
    background: white;
}
th{
    padding: 10px 0;
    font-size: 12px;
    color: var(--primary-color-3);
}
td{
    padding: 10px 0;
}
small{
    font-size: 12px;
}
th img
{
    cursor: pointer;
    padding-right: 10px;
}
td img{
    padding-left: 10px;
}
td strong{
    color: var(--primary-color);
}


input{
    width: 20px;
    height: 20px;
    border: 1.5px;
    cursor: pointer;
}
th, .table-heading p{
    background-color: var(--secondary-color-3);
    text-transform: uppercase;
}
/* .table-heading p{
    position: relative;
    left: 1.9rem;
} */
.table-heading {
    padding: 12px;
    width: 100%; 
    display: flex; 
    justify-content: space-between; 
    margin: 0 auto;
    align-items: center;
}
/* end table styles */

/* table cell styles */
.address{
    display: flex;
    flex-direction: column;
    align-items: left;
}
.name{
    font-weight: bold;
    color: var(--primary-color);
}
small{
    color: var(--primary-color-3);
}
.entry{
    display: flex;
    justify-content: center;
    align-items:center;
    gap: 10px;
}
.mail{
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: left;
}

/* end table cell */

.row{
    border-bottom: 1px solid #D9D5EC;
    display: table-row;
    flex-direction: column;
}


</style>

