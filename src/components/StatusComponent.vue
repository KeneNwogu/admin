<template>
    <div class="status" :class="status_name">
        <div class="container">
            <div class="circle" :class="status_name">
                
            </div>
            <small>{{ status_name }}</small>
        </div>
    </div>
</template>

<style scoped>
/* status */
.status{
    min-width: 55px;
    max-width: 79px;
    height: 19px;
    border-radius: 10px;
    background-color: var(--secondary-color-4);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    
}

.container{
    display: flex;
    align-items: center;
    padding: 0.2rem 0px;
    margin: 0 auto;
    text-align: center;
}



.status.unpaid{
    color: var(--primary-color-6);
    background-color: var(--primary-color-7);
}
.status.inactive{
    background-color: #F2F0F9;
    color: #6E6893;
}
.status.paid{
    color: var(--secondary-color-6);
    background-color: var(--secondary-color-5);
}

.status.overdue{
    color: var(--primary-color-5);
    background-color: #FFE0E0;
}
.status.active{
    color: var(--circle-active);
}

small {
    text-transform: capitalize;
}
.circle{
    width: 6px;
    height: 6px;
    background-color: var(--primary-color-4);
    border-radius: 50%;
    margin-right: 5px;
}

.circle.inactive{
    color: #6E6893;
    background-color: #6E6893;
}

.circle.unpaid{
    background-color: var(--primary-color-6);
}
.circle.active{
    color: var(--circle-active);
}
.circle.paid{
    background-color: var(--secondary-color-6);
}
.circle.overdue{
    background-color: var(--primary-color-5);
}

</style>

<script>
export default {
    props: {
        status_name: String
    },
    data(){
        return {
            
        }
    },
    
}
</script>