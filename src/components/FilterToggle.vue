<template>
    <div class="filter-toggle" v-show="open">
        <h4>SORT BY:</h4>
        <ul>
            <li><strong>Default</strong><input type="radio" name="sort_type" value="default" v-model="sort_type"></li>
            <li><strong>First Name</strong><input type="radio" name="sort_type" value="first_name" v-model="sort_type"></li>
            <li><strong>Last Name</strong><input type="radio" name="sort_type" value="last_name" v-model="sort_type"></li>
            <li><strong>Due Date </strong><input type="radio" name="sort_type" value="due_date" v-model="sort_type"></li>
            <li><strong>Last Login</strong><input type="radio" name="sort_type" value="last_login" v-model="sort_type"></li>
        </ul>
        <ul class="users">
            <h4>USERS</h4>
            <li><strong>All</strong><input type="radio" name="filter" value="all" v-model="filter_type"></li>
            <li><strong>Active</strong><input type="radio" name="filter" value="active" v-model="filter_type"></li>
            <li><strong>Inactive</strong><input type="radio" name="filter" value="inactive" v-model="filter_type"></li>
        </ul>
    </div>
</template>


<script>
import { ref, watchEffect, toRefs } from 'vue'
export default {
    props: {
        open: Boolean,
        sort: Function,
        filter: Function
    },
    setup(props){
        const { sort, filter} = toRefs(props)

        const sort_type = ref("default")
        const filter_type = ref("all")
        
        watchEffect(() => {
            console.log(sort_type.value)
            sort.value(sort_type.value)
            filter.value(filter_type.value)
        })
        return { sort_type, filter_type }
    }
}
</script>

<style scoped>
.filter-toggle{
    position: absolute;
    top: calc(100% + 0.5rem);
    bottom: 0;
    left: 0;
    width: 220px;
    height: 330px;
    background-color: #FFF;
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    border: 1px solid var(--secondary-color);
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    padding: 20px;
    z-index: 6;
}
.filter-toggle ul li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
}
.filter-toggle ul li strong{
    color: var(--primary-color);
}
.users{
    margin-top: 20px;
    border-top: 1px solid var(--secondary-color-7);
}
.users h4{
    margin-top: 10px;
}
.view-more-options{
    position: absolute;
    bottom: 0;
    /* right: 110px;
    top: 260px; */
    width: 120px;
    height: 110px;
    display: flex;
    align-items: left;
    flex-direction: column;
    align-items: left;
    background-color: #FFF;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    transform: rotate(-30deg);
    border-radius: 6px;
}
.view-more-options ul li{
    font-weight: bold;
    padding-left: 10px;
    width: 100%;
    margin-top: 5px;
    cursor: pointer;
}
.view-more-options ul li:hover{
    background-color: var(--secondary-color-7);
}
</style>

