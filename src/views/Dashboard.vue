<template>
  <div>
    <h1>Accedio al dashboard</h1>
    <h5 class='dashboard' v-for='acc in access' :key='acc.char_id'>
      {{ acc.name }}
    </h5>
  </div>
</template>

<script lang='ts'>
import { Prop, Component, Vue } from 'vue-property-decorator';
import { FIRE } from '../_helpers/CONST_REFS';
import axios from 'axios';

@Component
export default class Dashboard extends Vue {

  // the new data method
  private access: any = '';

  public mounted() {
    this.getAccess();
  }

  public async getAccess() {
    const token = await FIRE.auth().currentUser!.getIdToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get('http://localhost:3000/Zero', config);
    this.access = response.data;
  }
}
</script>

<style scoped>
div {
  color: inherit;
}
</style>