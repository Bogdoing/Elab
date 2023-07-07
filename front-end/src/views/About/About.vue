<template>
  
  <v-card>

      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="1">Transition</v-tab>
        <v-tab :value="2">Balanse</v-tab>
        <v-tab :value="3">History</v-tab>
      </v-tabs>

      <v-window v-model="tab">

        <v-window-item :value="1" id="v-window-item">
          <TabTransit />
        </v-window-item>

        <v-window-item :value="2" id="v-window-item">
          <TabBalanse/>
        </v-window-item>

        <v-window-item :value="3" id="v-window-item">
          <TabHistory/>
        </v-window-item>

      </v-window>
    </v-card>

    <!-- <div class="d-flex justify-center mb-5 mt-5">
      <v-btn variant="outlined" @click="getHistoryUser"> Chek  </v-btn>
    </div> -->

  
</template>
  
 
<script>
import TabTransit from './TabTransit.vue'
import TabBalanse from './TabBalanse.vue'
import TabHistory from './TabHistory.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import { useCounterStore } from '../../store/app.js'
const store = useCounterStore()

export default{
  data(){
    return {
      api: store.api,
      tab: null,
      store_app : store.getAdress,
      messagesTest:[
            {
              you_adress: '0x0000000000000000000000000000000000000000', 
              to_adress:  '0x9999999999999999999999999999999999999999', 
              amount: '0 ETC',
              message: `This is a test message from the app`,
              time_transition: '10:42am', 
            },],
    }
  },
  components: {
    TabTransit,
    TabBalanse,
    TabHistory,
  },
  beforeMount(){
    //this.getHistoryUser();
    //this.setColorMessage();
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
      console.log(this.store_app);
    },
    sendToken(){

    },
    getBalanse(){
    },
    getHistoryUser(){
      // console.log(this.api + '/getTestSol');
      // axios.get(this.api + '/getTestSol', {
      //   params: {
      //     account: store.getAdress
      //   },
      //   data: {
      //     account: store.getAdress
      //   }
      // })
      // .then((response) => {
      //   console.log('response.data - ')
      //   console.log(response.data)

      //   if (response.data == null || response.data.length == 0) {
      //     console.log('response.data - null')
      //   }
      //   else {
      //     console.log('response.data - not null')
      //     this.messagesTest = response.data
      //     this.setColorMessage();
      //   }
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    },
    setColorMessage(){
      // console.log('this.messagesTest.length - ' + this.messagesTest.length)
      // for (let i = 0; i < this.messagesTest.length; i++) {
      //     if (this.messagesTest[i].you_adress === this.store_app) {
      //         this.messagesTest[i].color = 'green'
      //         console.log(this.messagesTest[i].color + ' | ' + i)
      //     }
      //     else {
      //         this.messagesTest[i].color = 'deep-purple-lighten-1'
      //         console.log(this.messagesTest[i].color + ' | ' + i)
      //     }
      // }
      // console.log('this.messagesTest - ')
      // console.log(this.messagesTest)
    }
  }
};
</script>

<style type>
  #fix-adress{
    position: fixed;
    bottom: 0;
    right: 0;
  }

  #v-window-item{
      min-height: 100vh;
  }
</style>
  