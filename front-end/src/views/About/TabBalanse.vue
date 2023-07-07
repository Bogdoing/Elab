<template>
    <div class="mt-0" id="container">

		<div id="v-text-field">
			<v-text-field
				v-model="to_adress"
				:rules="rules"
				label="Adress"
				id="v-text-field"
			></v-text-field>
		</div>

		<v-col >
			<v-text-field
				v-model="balanse"
				label="Balanse"
				variant="outlined"
				readonly
			></v-text-field>
		</v-col>
      
      <v-divider></v-divider>

		<div class="d-flex justify-center mb-5 mt-5">
			<v-btn variant="outlined" @click="getBalanse"> Chek balanse </v-btn>
		</div>

		<v-divider></v-divider>

		<div class="d-flex justify-center mb-5 mt-5">
			<v-btn variant="outlined" @click="getMainBalanse"> Chek main balanse </v-btn>
		</div>

		<v-divider></v-divider>

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
      	to_adress: store.getAdress,
     	api : store.getApi,
     	balanse: '',
    }
},
activated(){
	selectAdress();
	console.log('Getting balanse - ' + this.to_adress);
},
methods:{
    selectAdress(){
    },

	getBalanse(){
		console.log('Getting balanse - ' + this.to_adress);
		axios.get(this.api + '/getBalanseAdress', {
			params: {
				adress: this.to_adress
			},
			data: {
				adress: this.to_adress
			}
		})
		.then((response) => {
			console.log('response - ' + response.data);
			this.balanse = (response.data / 1000000000000000000).toFixed(2);
		})
		.catch(function (error) {
			console.log(error);
		});
	},

    getMainBalanse(){
      	this.to_adress = store.getAdress;
      	this.getBalanse();
    },
}
};
</script>

<style>
#container{
	padding: 10px;
}
</style>