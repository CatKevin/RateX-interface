<template>
  <div style="background-color:#ffffff;">
    <img alt="Vue logo" style="margin-top:100px;width:500px;" src="@/assets/RateX.png" />
    
    <div style="color:#000000;font-size:25px;font-weight:600;padding-left:20%;padding-right:20%;">
        RateX is a decentralized interest rate swap (IRS) product that offers synthetic exposure to interest rates, supporting up to 40x leverage trading.
    </div>
    <div style="margin-top:60px;">
        <el-button type="danger" v-if="isUserConnected" @click="toTrade">Get Started</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {  },
  computed: {
    ...mapGetters("accounts", ["getActiveAccount", "isUserConnected", "getWeb3Modal"]),
  },
    methods: {
    ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"]),
    toTrade() {
      this.$router.push('/trade');
    }
  }
};
</script>
