<template>
  <div class="chat">
  <div class="chat__sidebar">
    <h3>People</h3>
    <div id="users">
      <ul>
          <li class="w3-container w3-animate-bottom" v-for="user in users">{{user}}</li>
      </ul>
    </div>
  </div>
  <div class="chat__main">
    <ol id="messages" class="chat__messages">
      <app-message v-for="text in messages" :text="text">
      </app-message>
    </ol>
    <div class="chat__footer">
        <input name="message" v-model="textBox" type="text" placeholder="Message" autofocus autocomplete="off"/>
        <button @click="clickedSend">Send</button>
        <button @click="goHome">Go Back to Home</button>
    </div>
  </div>
  </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import Message from "./Message";
    import store from "../../store/store";
    export default {
        name: "Chat",
        data(){
            return {
                username: '',
                roomName: '',
                users: [],
                messages: [],
                textBox: ''
            }
        },
        components: {
            appMessage: Message
        },
        methods:{
            ...mapActions({
                setUsername: 'setUsername',
                setRoom: 'setRoom'
            }),
            clickedSend(){
              console.log(this.textBox);
              this.$socket.emit('createMessage',{text: this.textBox});
              //this.messages.push({from: 'Mahathir',createdAt: '12:50', message: this.textBox});
              this.textBox="";
            },
            goHome(){
                console.log('Back to home');
                this.$router.push('/');
            }
        },
        beforeRouteEnter(to,from,next){
            console.log('Chat route entering');
            next();
        },

        beforeRouteLeave(to,from,next){
            console.log('Chat route leaving');
            next();
        },
        sockets:{
            updateUserList: function (users) {
                console.log('Userlist receieved from server');
                if(users){
                    this.users = users;
                }else{
                    console.log('User list null');
                }
            },
            newMessage: function(message){
                var formattedTime = moment(message.createdAt).format('h:mm a');
                this.messages.push({from: message.from,createdAt: formattedTime, message: message.text});
            },
            invalidAuthorization: function(){
                this.setUsername("");
                this.setRoom("");
                this.goHome();
            }
        },
        mounted() {
            this.$socket.emit('join',{name: this.$store.getters.username,room: this.$store.getters.roomName});
        }
    }
</script>

<style scoped>

</style>
