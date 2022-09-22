import { store } from "@/store"

export const sortUsers = (filter_type) => {
    let users = store.state.users

    const sorters = {
        default(){
            return users
        },
        first_name(){
            return Array.from(users).sort((a, b) => (a.firstName > b.firstName) ? 1 : (b.firstName > a.firstName) ? -1 : 0)
        },
        last_name(){
            console.log('lasgsgchsc')
            return Array.from(users).sort((a, b) => (a.lastName > b.lastName) ? 1 : (b.lastName > a.lastName) ? -1 : 0)
        },
        due_date(){
            return users
        },
        last_login(){
            return users
        },
    }

    return sorters[filter_type]();
}