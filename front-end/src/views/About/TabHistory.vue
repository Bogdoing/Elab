<template>
    
  <!-- <p>adress    {{ user_select }} </p>
  <p>to adress {{ items_select }} </p> -->

  <v-select class=" pt-5 pr-5 pl-5 "
    clearable
    label="Select"
    :items=items_select
    variant="outlined"
    v-model="user_select"
  ></v-select>

  <History :messages="messagesTest" />
  
 
</template>
  
<script>
import History from '../../components/History.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { useCounterStore } from '../../store/app.js'
const store = useCounterStore()

export default {
	data: () => ({
		width_i: window.innerWidth,
		adress_you: store.getAdress,
		circle_history: '',

		api: store.api,

		user_select: [store.getAdress],
		items_select: [store.getAdress, store.getToAdress],

		messagesTest:[
		{
			you_adress: '0x0000000000000000000000000000000000000000', 
			to_adress:  '0x9999999999999999999999999999999999999999', 
			amount: '0 ETC',
			message: `This is a test message from the app`,
			time_transition: '10:42am', 
		},],
	}),
	components: {
		History,
	},
	created(){
		//this.message = this.messages.reverse();
		//console.log('this.message - ' + this.message);
		this.getHistoryUser();
		this.setColorMessage();
	},
	methods: {
		getHistoryUser(){
			console.log(this.api + '/getTestSol');
			axios.get(this.api + '/getTestSol', {
			params: {
				account: store.getAdress
			},
			data: {
				account: store.getAdress
			}
			})
			.then((response) => {
				console.log('response.data - ')
				console.log(response.data)
				if (response.data == null || response.data.length == 0) {
					console.log('response.data - null')
				}
				else {
					console.log('response.data - not null')
					this.messagesTest = response.data
					this.setColorMessage();
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		setColorMessage(){
		console.log('this.messagesTest.length - ' + this.messagesTest.length)
		for (let i = 0; i < this.messagesTest.length; i++) {
			if (this.messagesTest[i].you_adress === this.adress_you) {
				this.messagesTest[i].color = 'green'
				console.log(this.messagesTest[i].color + ' | ' + i)
			}
			else {
				this.messagesTest[i].color = 'deep-purple-lighten-1'
				console.log(this.messagesTest[i].color + ' | ' + i)
			}
		}
		console.log('this.messagesTest - ')
		console.log(this.messagesTest)
		}
	}
}
</script>

<style>
p{
	font-weight: 100;
	font-size: 12px;
}
</style>
  