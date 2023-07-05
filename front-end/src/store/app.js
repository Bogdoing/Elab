// Utilities
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    api : "http://localhost:3001",
    count: 159,
    adress: '',
    activ_adress: false,
    balanse_adress: 0,
    to_adress: '',
    // messages: [
    //   {
    //       you: '',
    //       to:  '',
    //       type: '',
    //       amount: '0 ETC',
    //       message: `Тест`,
    //       time: '10:42am', 
    //       color: '#f00', 
    //   },]
  }),
  getters: {
    getCount() {
      return this.count
    },
    getAdress() {
      return this.adress
    },
    getActivAdress() {
      return this.activ_adress
    },
    getToAdress() {
      return this.to_adress
    },
    getApi(){
      return this.api
    },
    getBalanseAccount(){
      return this.balanse_adress
    }
  },
})
