<template>
    <div class="container">
        <p class="table-heading">Table Heading</p>
        <nav>
            <div class="filters">
                <a v-for="tab in tabs" :class="active_tab == tab ? 'active' : ''" :key="tab" @click="active_tab = tab">{{ tab }}</a>
            </div>
            <div class="amount">
                <p>Total payable amount: <strong>${{ total_payable_amount }}</strong> <small>USD</small></p>
            </div>
        </nav>
        <TableContent :users="users" :sort="sort" :search="search" :filter="filterActivity"/>
    </div>
</template>

<style scoped>
.container {
    width: 90%;
    margin: 25vh auto;
    font-size: 14px;
}


p.table-heading{
    font-size: 14px;
    color: #6E6893;
    text-transform: uppercase;
    font-weight: 700;
}

.table-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 98%;
    margin: 0 auto;
}

.table-nav{
    margin-top: 12px;
    border-bottom: 1px solid #C6C2DE;
    margin-bottom: 20px;
}

/* revisions */

.filters a{
    text-decoration: none;
    color: var(--primary-color);
    font-size: 14px;
    text-transform: capitalize;
}

nav{
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--secondary-color);
    justify-content: space-between;
    padding-bottom: 10px;
    margin: 30px 0;
}

nav .filters a{
    margin-right: 30px;
}
nav .filters a:hover,
.active{
    border-bottom: 2px solid var(--primary-color);
    padding: 10px 0;
    font-weight: bold;
}
strong{
    color: var(--primary-color-2);
}

</style>

<script>
import { ref, inject, watchEffect } from "vue"
import { paymentFilter, searchFilter, userActivityFilter } from "@/composables/filterUsers.js"
import { sortUsers } from "@/composables/sortUsers.js"
import TableContent from "@/components/TableContent.vue"

export default {
    setup() {
        const store = inject("store")
        const users = ref(store.state.users)

        const total_payable_amount = ref(store.getters.total_payable_amount)

        const active_tab = ref("All")

        const tabs = ['All', 'Paid', 'Unpaid', 'Overdue']

        watchEffect(() => {
            let current_tab = active_tab.value.toLowerCase()
            users.value = paymentFilter(current_tab)
        })

        const sort = function (filter) {
            users.value = sortUsers(filter)
        }

        const search = function (search){

            if (search === "") {
                users.value = store.state.users
            }
            else if(search.length > 1){
                users.value = searchFilter(store.state.users, search)
            }
        }

        const filterActivity = function(filter) {
            users.value = userActivityFilter(filter)
        }

        return { users, active_tab, tabs, sort, search, filterActivity, total_payable_amount }
    },
    components: {
        TableContent
    }
}
</script>