<template>
    <div class="pa-5" id="v-text-field">

        <span>
            <v-switch
                color="indigo-darken-3"
                v-model="model_switch"
                hide-details
                inset
                true-value='Withdraw'
                false-value="Replenish"
                :label="`Switch: ${model_switch.toString()}`"
            ></v-switch>
        </span> 

        <div v-if="model_switch.toString() == 'Replenish'"> 
            <p class="text-h2 pb-5">Replenish</p>
            <v-divider></v-divider>
            <p class="text-h5">{{ adress }}</p>
            <v-divider></v-divider>
            <p class="text-h5">to</p>
            <v-divider></v-divider>
            <p class="text-h5">{{ to_adress }}</p>
        </div>

        <div v-else> 
            <p class="text-h2 pb-5">Withdraw</p>
            <v-divider></v-divider>
            <p class="text-h5">{{ to_adress }}</p>
            <v-divider></v-divider>
            <p class="text-h5">to</p>
            <v-divider></v-divider>
            <p class="text-h5">{{ adress }}</p>
        </div>


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
            api: '',
            to_amount: '',

            adress: store.getAdress,
            to_adress: store.getToAdress,

            model_switch: 'Replenish',

            adress_sender: '',
            adress_resiver: '',
            message_send: '',
        }
        },
        methods: {
            sendToken(){
                if (this.model_switch.toString() == "Replenish"){
                    this.adress_sender = this.adress
                    this.adress_resiver = this.to_adress
                    this.api = '/sendCoin'
                    this.message_send = 'replenishment of the balance'
                }
                else{
                    this.adress_sender = this.to_adress
                    this.adress_resiver = this.adress
                    this.api = '/sendCoinPrivat'
                    this.message_send = 'Withdrawal of funds'
                }
                
                console.log('store.getApi + this.api - ' + store.getApi + this.api)

                axios.post(store.getApi + this.api, {
                    sender: this.adress_sender,
                    receiver: this.adress_resiver,
                    amount: this.to_amount,
                    message: this.message_send,
                })
                .then((response) => {                    
                    console.log('Sending token');
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                //this.sendTokenUpdateDB();
            },
            sendTokenUpdateDB(){
                console.log('sendTokenUpdateDB');
                axios.post(store.getApi + '/sendCoinUser', {
                    amount_user: store.balanse,
                    amount_acc: this.to_amount,
                    adress: this.adress_sender,
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