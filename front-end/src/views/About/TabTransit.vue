<template>
    <div class="mt-0" id="container">

		<div id="v-text-field">
			<v-text-field
				v-model="to_adress"
				:rules="rules"
				label="To adress"
				id="v-text-field"
			></v-text-field>

			<v-text-field
				v-model="to_amount"
				:rules="rules"
				label="Amount"
				id="v-text-field"
			></v-text-field>

			<v-text-field
				v-model="message_input"
				:rules="rules"
				label="Message"
				id="v-text-field"
			></v-text-field>
		</div>

		<div class="d-flex justify-center">
			<v-btn variant="outlined" @click="sendToken"> Button </v-btn>
		</div>

		<div id="hei-content"></div>
		
		<br	>
		<v-select class=" mr-5 ml-5 "
			clearable
			label="Select"
			:items=items_select
			variant="outlined"
			v-model="adress_select"
			density="comfortable"
		></v-select>
	


		

    </div>
</template>

<script>

import axios from 'axios'
import VueAxios from 'vue-axios'
import { useCounterStore } from '../../store/app.js'
const store = useCounterStore()

export default{
	data(){
	return {
		test: [
			"asdasdasdsaasdasdasdsadaasdasdasdsadaasdasdasdsadada", 
			'asdadsadaasdasdasdsadaasdasdasdsadaasdasdasdsadasdasd'
		],
		tab: null,
		rules: [
		value => {
			if (value) return true

			return 'You must enter.'
		},
		],
		store_app : store.getAdress,
		adressAcc: store.getToAdress,

		items_select: [store.getAdress, store.getToAdress],
		adress_select: store.getAdress,
		
		to_adress : '',
		to_amount : '',
		message_input : '',
		api : store.getApi,
	}
	},
	activated(){
		selectAdress();
	},
	methods:{
	selectAdress(){
		store.adress = this.adress_select;       
		this.text_header = 'Ваш кошелёк - ';
		//this.text_adress = this.adress_select;
		this.store_app = store.getAdress;
	},
	sendToken(){
		console.log('Sending token - ' + this.api + " | " + store.getApi);

		let url = '/'
		if (this.adress_select == store.getToAdress) url = '/sendCoinPrivat'		
		else url = '/sendCoin'

		console.log(url)
		console.log(this.api + url + " /**/ " + this.adress_select)

		axios.post(this.api + url, {
			sender: this.adress_select,
			receiver: this.to_adress,
			amount: this.to_amount,
			message: this.message_input,
		})
		.then(function (response) {
			console.log('Sending token');
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	},
	}
};
</script>

<style>
	#container{
		padding: 10px;
	}
	#selections{
		display: block;
	}
</style>