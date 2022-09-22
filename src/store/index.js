import { createStore, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate"


export const key = Symbol()

export const store = createStore({
    state() {
        return{
            users: []
        }
    },
    actions: {
        setUsers: (context, payload) => {
            context.commit('SET_USERS', payload)
        },
        payUsers: (context, payload) => {
            let promises = []
            Array.from(payload).forEach((user_id) => {
                promises.push(fetch(`https://cornie-assessment.herokuapp.com/mark-paid/${user_id}`, {
                    method: "PATCH"
                }))
            })
            Promise.all(promises)
                .then(() => {
                    context.commit("MARK_AS_PAID", payload)
            })
        }
    },
    mutations: {
        SET_USERS: (state, users) => {
            state.users = users
        },
        MARK_AS_PAID: (state, payload) => {
            Array.from(payload).forEach((user_id) => {
                let user = Array.from(state.users).filter((user) => user.id == user_id)[0]
                user.paymentStatus = "paid"
            })
        }
    },
    getters: {
        total_payable_amount(state){
            let total = 0
            state.users.forEach((user) => {
                if(user.paymentStatus === 'overdue' || user.paymentStatus === 'unpaid') {
                    total += (user.amountInCents / 100)
                }
            })
            return total.toFixed(2)
        }
    },
    plugins: [createPersistedState()]
})

export function useStore(){
    return baseUseStore(key)
}

