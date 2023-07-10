<template>
    <div class="pa-5" id="v-text-field">

        <p class="text-h2 pb-5">Replenish</p>
        <v-divider></v-divider>

        <p class="text-h5">{{ adress }}</p>
        <v-divider></v-divider>
        <p class="text-h5">to</p>
        <v-divider></v-divider>
        <p class="text-h5">{{ to_adress }}</p>

        <v-text-field
            class="pt-5"
            v-model="to_amount"
            label="Amount"
            id="v-text-field"
        ></v-text-field>

        <div class="d-flex justify-center">
			<v-btn variant="outlined" @click="sendToken"> Button </v-btn>
		</div>

    </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import { useCounterStore } from '../../store/app.js'
const store = useCounterStore()

export default {
    data() {
        return {
            to_amount: '',

            adress: store.getAdress,
            to_adress: store.getToAdress,
        }
        },
        methods: {
            sendToken(){
                axios.post(store.getApi + '/sendCoin', {
                    sender: this.adress,
                    receiver: this.to_adress,
                    amount: this.to_amount,
                    message: 'replenishment of the balance',
                })
                .then((response) => {                    
                    console.log('Sending token');
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                this.sendTokenUpdateDB();
            },
            sendTokenUpdateDB(){
                console.log('sendTokenUpdateDB');
                axios.post(store.getApi + '/sendCoinUser', {
                    amount_user: store.balanse,
                    amount_acc: this.to_amount,
                    adress: this.adress,
                })
                .then((response) => {
                    console.log('Sending token');
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
        }
}
</script>

<style>
    .text-h5{
        font-weight: 100;
    }
</style>