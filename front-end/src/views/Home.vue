<template>
	<div class="d-flex justify-center mb-8 mt-8">    
		<p class="text-h3"> {{ text_header }} </p>
	</div>
	<div class="d-flex justify-center mb-8 mt-8">    
		<p class="text-h6"> * {{ store_app }} * </p>
	</div>

	<v-select class=" mr-5 ml-5 "
		clearable
		label="Select"
		:items=items_select
		variant="outlined"
		v-model="adress_select"
	></v-select>

	<div class="d-flex justify-center">
		<v-btn variant="outlined" @click="selectAdress"> Button </v-btn>
	</div>
	
	<List :items="items_select"/>
</template>

<script>
import List from '@/components/List.vue';

import { useCounterStore } from '../store/app.js'

const store = useCounterStore()

export default{
data(){
	return {
		store_app : store.getAdress,
		api: 'http://localhost:3001/',

		items_select: this.getList(),
		adress_select: '',
		text_header: 'Выберите кошелёк',
	}
},
components: {
    List,
},
created(){
},
activated(){
	console.log('activated');
	this.activated_adress();
	if (this.store_app === '' || this.store_app === null) {
		this.text_header = 'Выберите кошелёк';
	}
	else {
		this.text_header = 'Ваш кошелёк:'+ this.store_app;
	}
},
mounted() {
},
unmounted() {
},
methods:{
	getList() {
	console.log(this.api + "/getAccounts");
	this.api = "http://localhost:3001/getAccounts";
	this.axios.get(this.api).then((response) => {
		console.log(response.data)
		this.items_select = response.data;
	})
	},
	selectAdress(){
	//console.log(this.adress_select);
	if (this.adress_select == null) {
		store.activ_adress = false;
		this.activated_adress();
	}
	else{
		console.log(this.adress_select);
		store.adress = this.adress_select;   
		store.activ_adress = true;    
		this.store_app = store.getAdress;
		this.activated_adress();
	}
	},
	activated_adress(){
		console.log(store.activ_adress);
		if (store.activ_adress == false) this.text_header = 'Выберите кошелёк'
		else this.text_header = 'Ваш кошелёк - '	
	},
}
};
</script>


<!-- <template>
  <HelloWorld />
</template>

<script setup>
  import HelloWorld from '@/components/HelloWorld.vue'
</script> -->
