<template>
  <div>
    <div class='error' v-if='error'>{{ error.message }}</div>
    <form @submit.prevent='registerUser'>
      <p>Register</p>
      <div class='email'>
        <input type='text' v-model='this.email' placeholder='Ingrese su email' />
      </div>
      <div class='password'>
        <input
          type='password'
          v-model='this.password'
          placeholder='Type your password 🛡'
        />
      </div>
      <button type='submit' class='bt-normal'>Register</button>
    </form>
    <div class="preview">
      <h3>Preview User Data</h3>
      <p id="p-pre">Email: {{ this.email }}</p>
      <p id="p-pre">Password: {{ this.password }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Prop, Component, Vue } from 'vue-property-decorator';
import { FIRE } from '../_helpers/CONST_REFS';
import { createUserWithEmailAndPassowrd } from '../_services/firebaseAuths';

@Component
export default class Register extends Vue {
  // New data()
  private email: string = '';
  private password: string = '';
  private error: string = '';

  get fillEmail() {
    return this.email;
  }

  set fillEmail(email: any) {
    this.email = email.target.value;
  }

  get fillPass() {
    return this.password;
  }

  set fillPass(password: any) {
    this.password = password.target.value;
  }

  public async registerUser() {
    const response: any = await createUserWithEmailAndPassowrd(
      this.fillEmail,
      this.fillPass
    );
    if (response.code === 200) {
      console.log(`User response -> ${JSON.stringify(response.data)}`);
      console.log('Redirecting to Dashboard 😁 ');
      this.$router.replace({ name: 'Dashboard' });
    } else if (response.code === 400) {
      console.error('Ocurrio un error 😥 ');
      this.error = response;
    }
  }
}
</script>

<style scoped lang='scss'>
.error {
  color: red;
  font-size: 18px;
}
p {
  font-weight: bold;
  color: darkcyan;
}
input {
  width: 200;
  padding: 15px;
  margin: 20px;
  font-size: 21px;
}
.preview {
  width: 800px;
  padding: 10px;
  border: 1px dotted #ccc;
  margin: 1% 28%;
  .p-pre {
    font-weight: bold;
    color: darkcyan;
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