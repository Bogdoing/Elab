<template>
    <v-card class="mx-auto" max-width="600">
        <v-list lines="two">
            <v-list-item v-for="item in items" :title="item">
                <template v-slot:append>
                    <v-btn
                        color="grey-lighten-0"
                        icon="mdi-dots-vertical"
                        variant="text"
                        @click="test(item)"
                    ></v-btn>
                </template>
            </v-list-item>

            <v-divider inset></v-divider>
        </v-list>
    </v-card>
</template>
  
  <script>
    export default {
        name: 'List',
        props: {
            items: Array
        },
        methods:{
            async test(item){
                try {
                    await navigator.clipboard.writeText(item);
                    alert('Copied - ' + item);
                } catch($e) {
                    alert('Cannot copy - ' + $e.message);
                }
            }
        }

    }
  </script>
  