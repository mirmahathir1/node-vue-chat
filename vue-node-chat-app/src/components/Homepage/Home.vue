<template>
  <div class="centered-form">
    <div class="centered-form__form w3-container w3-animate-top">
        <div class="form-field">
          <h3>Join a Chat</h3>
        </div>
        <div class="form-field">
          <label>Display name</label>
          <input v-model="username" type="text" name="name" autofocus/>
        </div>
        <div class="form-field">
          <label>Room name</label>
          <input v-model="roomName" type="text" name="room"/>
        </div>
        <div class="form-field">
          <button @click="joinClick">Join</button>
        </div>
    </div>
  </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        data () {
            return {
                username: '',
                roomName: '',
            }
        },
        methods: {
            ...mapActions({
                setUsername: 'setUsername',
                setRoom: 'setRoom'
            }),
            joinClick(){
                this.setUsername(this.username);
                this.setRoom(this.roomName);

                this.$socket.emit('checkUser',{name: this.username,room: this.roomName});
            }
        },
        sockets: {
            connect: function () {
                console.log('socket connected from home');
            },
            redirect: function (data) {
                console.log('this method was fired by the socket server.');
                this.$router.push({ path: '/chat' });
            },
        }
    }
</script>

<style>

</style>
