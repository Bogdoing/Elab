<template>
	<v-card>
		<v-layout>

		<v-navigation-drawer
			v-model="drawer"
			:rail="rail"
			permanent
			@click="rail = false"
		>
		<!--https://randomuser.me/api/portraits/men/85.jpg-->
			<v-list-item
				prepend-avatar="../src/assets/user512.png"
				title="John Leider"
				nav
			>
			<template v-slot:append>
				<v-btn
					variant="text"
					icon="mdi-chevron-left"
					@click.stop="rail = !rail"
				></v-btn>              
			</template>
			</v-list-item>
		

			<v-divider></v-divider>
			<v-list density="compact" nav>

			<router-link style="text-decoration: none; color: inherit;" to="/account">
				<v-list-item prepend-icon="mdi-account" title="Account" value="account"></v-list-item>
			</router-link>

			<router-link style="text-decoration: none; color: inherit;" to="/about">
				<v-list-item prepend-icon="mdi-widgets" title="Translation" value="about"></v-list-item>
			</router-link>

			<router-link style="text-decoration: none; color: inherit;" to="/course">
				<v-list-item prepend-icon="mdi-clock" title="History" value="course"></v-list-item>
			</router-link>

			<router-link style="text-decoration: none; color: inherit;" to="/">
				<v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
			</router-link>

			<!-- <router-link style="text-decoration: none; color: inherit;" to="/">
				<v-list-item prepend-icon="" title="" value="">{{ width }}</v-list-item>
			</router-link> -->
			</v-list>
		</v-navigation-drawer>
		<v-main style="height: 100%">
			<router-view />
		</v-main>
		</v-layout>
	</v-card>

</template>

<script>
import { useCounterStore } from './store/app.js'
//const store = useCounterStore()

import axios from 'axios'
import VueAxios from 'vue-axios'

export default{
data(){
	return {
		width: 0,

		drawer: true,
		rail: true,

		adress: '',
		password: '',
		reg: false,

		store : useCounterStore(),
	}
},
created(){
	this.width = window.innerWidth
	this.getLocalStorage()
	console.log(localStorage.adress)
	console.log(localStorage.password)
	console.log(localStorage.reg)

	console.log(this.adress)
	console.log(this.password)
	console.log(this.reg)

	this.logINauthorize()
},
mounted() {
	window.addEventListener("resize", this.updateWidth);
	this.logINauthorize()
},
unmounted() {
	window.removeEventListener("resize", this.updateWidth);
},
methods:{
	updateWidth() {
		this.width = window.innerWidth;
		if (this.width > 768) {
			this.rail = false;
		}
		else {
			this.rail = true;
		}
	},	
	updateStore(){
		this.store.adress = this.adress;
	},
	saveLocalStorage(){
		localStorage.adress = this.adress;
		localStorage.password = this.password;
		localStorage.reg = this.reg;
	},
	getLocalStorage(){
		this.adress = localStorage.adress;
		this.password = localStorage.password;
		this.reg = localStorage.reg;
	},
	clearLocalStorage(){
		localStorage.clear();
		window.location.reload();
	},
	logINauthorize(){
		this.updateStore();
		if (this.reg == true) {
			this.logIN();
		}
	},
	logIN() {
		console.log('LOGIN');
		if(this.adress == null){
			this.getLocalStorage()
			this.updateStore()
		}
		axios.get(this.api + '/getUserAccount', {
		params: {
			adress: this.adress,
			password: this.password
		},
		data: {
			adress: this.adress,
			password: this.password
		}
		})
		.then((response) => {
			console.log('Object response - ' + Object.keys(response.data[0]));
			console.log('response - ' + response.data[0].Adres_servis);
			this.adress_account = response.data[0].Adres_servis;
			this.balanse_account = response.data[0].Balanse_servis;
			this.store.balanse_adress = this.balanse_account
			this.store.activ_adress = true;
			this.reg = this.store.activ_adress;
			this.adress = response.data[0].Adres_user;
			this.store.adress = response.data[0].Adres_user;

			this.store.to_adress = response.data[0].Adres_servis
			
			this.updateStore();

			this.saveLocalStorage();

		})
		.catch(async (error) => {
			console.log('error - ' + error);
			await this.sleep(500) 
			this.alertAccount = ''
		});
            
	},
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
};
</script>

<style>
	#fix-adress{
		position: fixed;
		bottom: 0;
		right: 0;
	}
</style>
