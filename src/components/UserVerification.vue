<template>
  <div>
    <p>Logged In</p>
    <div class="conditional" v-if="loggedIn">Yep..😀</div>
    <div class="conditional" v-else>Nop..😥</div>
    <button class="bt-logout" type="submit" @click="signOut">Sign Out</button>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { FIRE } from "../_helpers/CONST_REFS";
import { pushNotifcation } from "../_services/notification";

@Component
export default class UserVerification extends Vue {
  // @Prop() public loggedIn!: boolean;

  // Data props
  private loggedIn: boolean = false;

  public mounted() {
    this.setupFirebase();
  }

  public async setupFirebase() {
    FIRE.auth().onAuthStateChanged((user) => {
      user ? (this.loggedIn = true) : (this.loggedIn = false);
    });
  }

  public signOut() {
    let notification: any = {
      title: `Back soon ${FIRE.auth().currentUser?.displayName} 😥`,
      body: "Have a good night 😎",
      icon:
        "https://www.pinclipart.com/picdir/big/548-5485193_iphone-7-push-technology-apple-push-notification-push.png",
    };

    FIRE.auth()
      .signOut()
      .then(() => {
        pushNotifcation(notification);
        this.$router.replace({ name: "Login" });
      });
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
h3 {
  margin: 40px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
p {
  font-weight: bold;
  margin: 10px;
}
.conditional {
  margin: 10px;
}
a {
  color: #42b983;
}
button {
  width: 200px;
  height: 50px;
  margin-top: 25 px;
  font-size: 100%;
  background-color: #36c5ca;
}
</style>
