<template>
    <v-container>
      <v-row justify="space-around">
        <v-card width="2000">
          <v-card-text>
            <strong> Твой адрес <i> {{ messages[0].you_adress }} </i> </strong> 
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

                        <strong v-if="message.you_adress === adress_you">Отправлено {{message.amount}}  <!--{{ message.you_adress }}--> </strong>  
                        <strong v-else>Получено {{message.amount}} <!--{{ message.you_adress }}--></strong>    
                        <br />
                        @{{ message.time_transition }}
                        <br />
                        <strong v-if="message.you_adress === adress_you"> {{ message.to_adress }}</strong>  
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
    import { useCounterStore } from '../../store/app.js'
    const store = useCounterStore()
    export default {

        props: {
            messages: []
        },
        data: () => ({
            width_i: window.innerWidth,
            adress_you: store.getAdress,
            circle_history: '',
            // messages:[
            // {
            //     you: '0x85289b9ee778051188efc2a39ac900612d100a26',
            //     to:  '0x58159043703749e032687f7e51c5a218ffaba410',
            //     type: 'Отправлено',
            //     amount: '601 ETC',
            //     message: `Yeah, sure. Does 1:00pm work?`,
            //     time: '10:42am', 
            //     color: 'green', 
            // },
            // {
            //     you: '0x18bb0d2373c02ac68038bc5dda60a79bab83e9bb',
            //     to:  '0x58159043703749e032687f7e51c5a218ffaba410',
            //     type: 'Отправлено',
            //     amount: '601 ETC',
            //     message: `Yeah, sure. Does 1:00pm work?`,
            //     time: '10:42am', 
            //     color: 'green', 
            // },
            // {
            //     from: 'You',
            //     you: '0x85289b9ee778051188efc2a39ac900612d100a26',
            //     to:  '0x18bb0d2373c02ac68038bc5dda60a79bab83e9bb',
            //     type: 'Отправлено',
            //     amount: '1684 ETC',
            //     message: `Sure, I'll see you later.`, 
            //     time: '10:42am', 
            //     color: 'deep-purple-lighten-1',
            // },]
        }),
        created(){

        },
        methods: {
            test(){                
            }
        }
    }
  </script>
  