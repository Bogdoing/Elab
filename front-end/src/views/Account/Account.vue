<template>
<div v-if="reg">
    <!--  bg-surface-variant  -->
    <v-container class="" id="container">

        <v-row no-gutters id="row-one">
            <v-col cols="12" sm="8">
                <v-sheet id="sheet" class="pa-0 ma-0" > 
                    <div align="center">
                        <v-card id="card" class="mt-0 mb-0" width="100%">
                            <template id="card-template" v-slot:title class="mx-auto mt-5">
                                <p class="text-h2 pt-7 pb-7 pl-7 pr-7 mx-auto">
                                    {{ balanse }} ETC
                                    <!-- <img src="../assets/ethereum64.png" style="transform: scale(1.0)" alt="ethereum64">                                     -->
                                </p>
                                <v-card-text> 
                                    You blalanse
                                    <br> 
                                    {{ adress }} 
                                </v-card-text>
                                <v-divider></v-divider>
                                <p class="text-h2 pt-7 pb-7 pl-7 pr-7 mx-auto">
                                    {{ balanse_account }} ETC
                                    <!-- <img src="../assets/ethereum64.png" style="transform: scale(1.0)" alt="ethereum64"> -->
                                </p>
                                <v-card-text> 
                                    You blalanse account 
                                    <br>
                                    {{ adress_account }}
                                </v-card-text>
                            </template>
                        </v-card>
                    </div>
                </v-sheet>
            </v-col>
            <v-col align-self="center">
                <v-sheet id="sheet-icon-user" class="pa-2 ma-2" height="100%"> 
                    <img id="img-user" origin="overlap" style="transform: scale(1.0)" src="https://randomuser.me/api/portraits/men/85.jpg" alt="Icons">
                </v-sheet>
                
            </v-col>
        </v-row>
        
        <v-row no-gutters id="row-one" >
            <v-col>
                <v-sheet class="bg-deep-purple accent-4 pa-2 ma-4 rounded-lg " height="100%">       
                    <div class="d-flex justify-center mb-5 mt-5">
                        <v-btn variant="outlined" @click="logIN"> TEST </v-btn>
                    </div>              
                    <div class="d-flex justify-center mb-5 mt-5">
                        <v-btn variant="outlined" @click="clearLocalStorage"> Exit </v-btn>
                    </div>  
                    <div class="d-flex justify-center mb-5 mt-5">
                        <v-btn variant="outlined" @click="getPriceETC"> Update price ETC </v-btn>
                    </div>
                    <div class="d-flex justify-center mb-5 mt-5">
                        <v-btn variant="outlined" @click="getBalanse"> Update balanse </v-btn>
                    </div>
                    <div class="d-flex justify-center mb-5 mt-5">
                        <router-link style="text-decoration: none; color: inherit;" to="/accountrep">
                            <v-btn variant="outlined" @click="replenishBalanse"  value="course"> 
                                Replenish balanse
                            </v-btn>
                        </router-link>
                    </div>

                </v-sheet>
            </v-col>
            <v-col cols="12" sm="8">
                <v-sheet class="pa-2 pt-4 ma-2 mt-4" height="100%"> 
                    <v-card id="card" class="mx-auto mt-0" height="100%" width="100%">
                        <template v-slot:title id="card-template">
                            <p class="text-h2 mt-5">
                                <img src="../../assets/course64.png" style="transform: scale(1)" alt="course32">
                                Курс
                            </p>
                            <ul class="text-h4 mt-5" id="array-rendering">
                                <li> {{ pruseETHusd }} </li>
                                <li> {{ pruseETHrub }} </li>
                            </ul>
                            
                        </template>
                        <div class="pa-2">
                            <v-alert
                                v-model="alert"
                                border="start"
                                variant="tonal"
                                closable
                                close-label="Close Alert"
                                color="deep-purple-accent-4"
                                title="Update prise"  
                                text="Update prise is OK"                             
                            ></v-alert>
                        </div>

                    </v-card>
                </v-sheet>
            </v-col>
        </v-row>
 
    </v-container>
</div>
<div v-else> 
    <div id="logheader">
        <p v-if="model_switch.toString() == 'SING IN'" class="text-h1 pa-5"> SING IN </p>
        <p v-else class="text-h1 pa-5"> LOG IN </p>
        <span>
            <v-switch
                color="indigo-darken-3"
                v-model="model_switch"
                hide-details
                inset
                true-value='SING IN'
                false-value="LOG IN"
                :label="`Switch: ${model_switch.toString()}`"
            ></v-switch>
        </span>   
    </div>
    <v-col >
        <v-text-field
            v-model="adress"
            label="Adress"
            variant="outlined"          
        ></v-text-field>
    </v-col>
    <v-col >
        <v-text-field
            v-model="password"
            label="Password"
            variant="outlined"          
        ></v-text-field>
    </v-col>
    <div class="d-flex justify-center mb-5 mt-5">
        <v-btn v-if="model_switch.toString() == 'SING IN'" variant="outlined" @click="getAccount"> SING IN </v-btn>
        <v-btn v-else variant="outlined" @click="getAccount"> LOG IN </v-btn>
    </div>
    <div class="pa-2">
        <v-alert
            v-model="alert_account"
            border="start"
            variant="tonal"
            closable
            close-label="Close Alert"
            color="deep-purple-accent-4"
            text="Введите адрес и пароль"                             
        ></v-alert>
    </div>
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
        api : store.getApi,
        reg: store.getActivAdress,

        width: 0,

        balanse: 0,
        balanse_account: 0,

        adress: store.getAdress,
        adress_service: '',

        password: '',

        drawer: true,
        rail: true,
        alert: false,
        alert_account: false,
        model_switch: 'LOG IN',

        pruseETHusd: '',
        pruseETHrub: '',
      }
    },
    created() {
        if (this.reg == true) {
            this.getBalanse();
            this.getPriceETC();
            this.getAccount();
        }
        else {}
    },
    mounted() {
        this.getLocalStorage();
        if (this.reg == true) {
            this.getBalanse();
            this.getPriceETC();
            this.getAccount();
        }
        else {}
        this.logIN();
    },
    methods: {
        updateStore(){
            store.adress = this.adress;
            store.balanse = this.balanse_account;
            //this.balanse = store.getBalanse;
        },
        testApi(){            
            axios.get('https://api.coingecko.com/api/v3/ping', {})
            .then((response) => {
                console.log('response - ' + Object.keys(response.data.gecko_says));
                console.log('response - ' + response.data.gecko_says);                
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        getPriceETC(){
            console.log('getPriceETC')
            axios.get('https://api.coingecko.com/api/v3/coins/ethereum?tickers=true&market_data=true', {})
            .then((response) => {
                this.pruseETHusd = ''
                this.pruseETHrub = ''
                //console.log('response - ' + Object.keys(response.data.market_data.current_price)); //market_data.current_price
                //console.log('response usd - ' + response.data.market_data.current_price.usd); 
                this.pruseETHusd += 'USD - '  + response.data.market_data.current_price.usd;
                //console.log('response rub - ' + response.data.market_data.current_price.rub);
                this.pruseETHrub += 'RUB - '  + response.data.market_data.current_price.rub;             
                this.sendAlert()
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        sendAlert(){
            this.alert = true;
        },
        getBalanse(){
        console.log('Getting balanse - ' + this.adress);
        axios.get(this.api + '/getBalanseAdress', {
            params: {
                adress: this.adress
            },
            data: {
                adress: this.adress
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

        getAccount (){
            if (this.reg == true) {
                this.getLocalStorage();
            }
            else {
                if (this.model_switch == 'LOG IN') {
                    console.log('Getting account -'+ this.adress);
                    this.logIN();
                }
                else {
                    axios.post(this.api + '/postAddUser', {
                        adres_user: this.adress,
                        pass: this.password
                    })
                    .then(function (response) {
                        console.log('User created: ' + response);
                        this.saveLocalStorage();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    
                }
            }
            
            
        },
        replenishBalanse(){
            
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

        logIN(){
            if(this.adress == null){
                this.getLocalStorage();
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
                //console.log('Object response - ' + Object.keys(response.data[0]));
                //console.log('response - ' + response.data[0].Adres_servis);
                this.adress_account = response.data[0].Adres_servis;
                this.balanse_account = response.data[0].Balanse_servis;
                store.balanse_adress = this.balanse_account
                store.activ_adress = true;
                this.reg = store.activ_adress;
                this.adress = response.data[0].Adres_user;
                store.adress = response.data[0].Adres_user;

                store.to_adress = response.data[0].Adres_servis
                
                this.updateStore();

                this.getBalanse();
                this.getPriceETC();

                this.saveLocalStorage();

            })
            .catch(function (error) {
                console.log(error);
                //alert('Неверный логин или пароль.')
            });
            
        },
    }
}

</script>

<style>
    #container{
        min-height: 50vh;
    }
    #sheet{
        
    }
    #row-one{
        /*min-height: 50vh;*/
        margin: 0px 0px 0px 0px;
    }
    #card{
        /* mt-15 mb-15 mx-auto */
        margin-top: 15px;
        margin-bottom: 15px;
        display: inline-block;
        height: 50%;
        vertical-align: middle;
    }
    #card-template{
        display: inline-block;
        vertical-align: middle;
    }
    #img-user{
        border-radius: 50%;
    }
    #sheet-icon-user{
        text-align: center;
    }

    #logheader{
        display: flex;
        justify-content: space-between;
    }
    #logheader span{
        display: block;

    }
</style>