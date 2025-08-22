import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        name: 'Guest',
    }),
    actions: {
        setName(newName: string) {
            this.name = newName
        },
    },
})
