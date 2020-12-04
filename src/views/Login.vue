<template>
  <div>
    <form>
      <p>Login</p>
      <div class='email'>
        <input
          type='text'
          v-model.lazy='fillEmail'
          placeholder='type your email'
        />
      </div>
      <div class='password'>
        <input
          type='password'
          v-model.lazy='fillPass'
          placeholder='type your password'
        />
      </div>
      <button
        type='submit'
        class='bt-normal'
        @click.prevent='LoginWithNormalEmailAndPassword'
      >
        Login
      </button>
      <button
        type='submit'
        class='bt-microsoft'
        @click.prevent='singleSignOnMs'
      >
        Login Microsoft
      </button>
      <div class='error'>
        {{ this.error.data ? this.error.data : this.error }}
      </div>
    </form>
    <div class='preview'>
      <h3>Preview User Data</h3>
      <p id='p-pre'>Email: {{ this.email }}</p>
      <p id='p-pre'>Password: {{ this.password }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Prop, Component, Vue } from 'vue-property-decorator';
import {
  signInWithEmailAndPassword,
  signInWithSSOMicrosoft,
} from '../_services/firebaseAuths';
import { pushNotifcation } from '../_services/notification';

@Component
export default class Login extends Vue {
  // ? This is the new Data()
  private email: string = 'test@gmail.com';
  private password: string = 'smoketest';
  private error: string | object = '';

  get fillEmail() {
    return this.email;
  }
  set fillEmail(event: string) {
    // console.log(`This is the event pressed -> ${event}`);
    this.email = event;
  }

  get fillPass() {
    return this.password;
  }

  set fillPass(event: string) {
    // console.log(`This is the event pressed -> ${event}`);
    this.password = event;
  }
  public async LoginWithNormalEmailAndPassword(event: any) {
    console.log(`Login with -> ${this.email} & ${this.password}`);
    const response: any = await signInWithEmailAndPassword(
      this.email,
      this.password,
    );

    if (response.code === 200) {
      console.log('User Response -> ', response.data);
      console.log('Redirecting to Dashboard 😁 ');
      const notification: any = {
        title: `Welcome ${response.data.name} 😳`,
        body: 'Today is good day to work with firebase 😏 🎈',
        icon: 'https://www.pinclipart.com/picdir/big/548-5485193_iphone-7-push-technology-apple-push-notification-push.png',
      };

      pushNotifcation(notification);

      this.$router.replace({ name: 'Dashboard' });
    } else {
      console.error('Ocurrio un error 😥 ');
      // pushNotifcation();
      this.error = response;
    }
  }

  public async singleSignOnMs() {
    console.log(`Login With microsoft account`);
    const response: any = await signInWithSSOMicrosoft();
    if (response.code === 200) {
      console.log('User Response -> ', response.data);
      console.log('Redirecting to Dashboard 😁 ');

      const notification: any = {
        title: `Welcome ${response.data.name} 😳`,
        body: 'Today is good day to work with firebase 😏 🎈',
        icon: 'https://www.pinclipart.com/picdir/big/548-5485193_iphone-7-push-technology-apple-push-notification-push.png',
      };
      pushNotifcation(notification);

      this.$router.replace({ name: 'Dashboard' });
    } else if (response.code === 400) {
      console.error('Ocurrio un error 😥 ');
      // console.log('Error message -> ', response.data);
      this.error = response;
    }
  }
}
</script>

<style scoped lang='scss'>
div {
  color: inherit;
}
input {
  width: 200;
  padding: 15px;
  margin: 10px;
  font-size: 21px;
}
p {
  font-weight: bold;
  color: darkcyan;
}

.preview {
  width: 800px;
  padding: 10px;
  border: 1px dotted #ccc;
  margin: 1vh 28vw;

  .p-pre {
    font-weight: bold;
    color: darkcyan;
  }
}

@media screen and (max-width: 1024px){
  .preview {
    margin: 1vh 10vw;
    width: 700px
  }
}

@media screen and (max-width: 900px){
  .preview {
    margin: 1vh 10vw;
    width: 600px
  }
}

@media screen and (max-width: 700px){
  .preview {
    margin: 1vh 10vw;
    width: 500px
  }
}
@media screen and (max-width: 500px){
  .preview {
    margin: 1vh 5vw;
    width: 400px
  }
}

.bt-normal {
  width: 200px;
  height: 50px;
  margin: 15px;
  font-size: 100%;
  background-color: rgb(28, 231, 130);
}

.bt-microsoft {
  background-color: rgba(88, 134, 204, 0.2);
  width: 200px;
  height: 50px;
  margin: 15px;
  font-size: 100%;
}
.error {
  color: red;
}
</style>