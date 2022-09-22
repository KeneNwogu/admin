import { store } from "@/store"

export const paymentFilter = (filter_type) => {
    let users = store.state.users

    if(filter_type === 'all') return users
    let results = Array.from(users).filter((user) => user.paymentStatus == filter_type)

    return results
}

export const userActivityFilter = (filter_type) => {
    let users = store.state.users

    if(filter_type === 'all') return users
    let results = Array.from(users).filter((user) => user.userStatus == filter_type)

    return results
}

export const searchFilter = (users, search_key) => {
    search_key = search_key.toLowerCase()
    return Array.from(users).filter(
        (user) => user.firstName.toLowerCase().includes(search_key) || 
        user.lastName.toLowerCase().includes(search_key) || 
        user.email.toLowerCase().includes(search_key)
    )
}

// export default filterUsers