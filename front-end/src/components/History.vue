<template>
    <v-container>
        <v-row justify="space-around">
        <v-card width="2000">
            <v-card-text>
            <strong> Твой адрес <i> {{ adress_you }} </i> </strong> 
            <v-timeline density="compact" align="start">
                <v-timeline-item
                v-for="message in messages"
                :key="message.time_transition"
                :dot-color="message.color"
                size="x-small"
                @click="test"
                v-model="circle_history"
                >
                <div class="mb-4">
                    <div class="font-weight-normal">

                        <strong v-if="message.you_adress == adress_you">Отправлено {{message.amount}}  <!--{{ message.you_adress }}--> </strong>  
                        <strong v-else>Получено {{message.amount}} <!--{{ message.you_adress }}--></strong>    
                        <br />
                        @{{ message.time_transition }}
                        <br />
                        <strong v-if="message.you_adress == adress_you"> {{ message.to_adress }}</strong>  
                        <strong v-else>{{ message.you_adress }}</strong>           
                        <div style="width: 300px;"> </div>      
                    </div>
                    <div>{{ message.message }}</div>
                </div>
                </v-timeline-item>
            </v-timeline>
            </v-card-text>
        </v-card>
        </v-row>
    </v-container>
</template>


<script>

import { useCounterStore } from '../store/app.js'
const store = useCounterStore()
export default {

    props: {
        messages: []
    },
    data: () => ({
        width_i: window.innerWidth,
        adress_you: store.getAdress,
        circle_history: '',

        messages:[
		{
			you_adress: '0x0000000000000000000000000000000000000000', 
			to_adress:  '0x9999999999999999999999999999999999999999', 
			amount: '0 ETC',
			message: `This is a test message from the app`,
			time_transition: '10:42am', 
		},],
    }),
    created(){
        //this.messagess = this.messages.reverse();
    },
    methods: {
        
    }
}
</script>

<style>
  p{
    font-weight: 100;
    font-size: 12px;
  }
</style>