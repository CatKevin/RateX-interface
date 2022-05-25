<template>
  <div style="height: 100%; background-color: #ffffff">
    <div class="card">
      <div style="padding-top: 10px; margin-left: 20%; margin-right: 20%">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          active-text-color="red"
        >
          <el-menu-item style="width: 50%" index="1">Market</el-menu-item>
          <el-menu-item style="width: 50%" index="2">Limit</el-menu-item>
        </el-menu>
      </div>
      <div style="display:flex;flex-direction:column;">
        <div style="margin-top:45px;">
            <el-radio-group v-model="labelPosition" @change="changeRadioGroup" size="medium" fill="#F56C6C">
                <el-radio-button label="long">Long</el-radio-button>
                <el-radio-button label="short">Short</el-radio-button>
            </el-radio-group>
            <el-form ref="form" :model="form" label-width="80px" style="margin-left:10%;margin-right:10%;margin-top:20px;">
                <el-form-item label="SwapRate">
                    <el-input style="width:280px;" v-model="form.swapRate"></el-input>
                </el-form-item>
                <el-form-item label="NotionalSize">
                    <el-input style="width:280px;" v-model="form.notionalSize"></el-input>
                </el-form-item>
                <el-form-item label="Leverage">
                    <el-input style="width:280px;" v-model="form.leverage"></el-input>
                </el-form-item>
                
            </el-form>
            <el-button style="width:300px;margin-top:40px;" type="danger">Book</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";
export default {
  components: {},
  data() {
    return {
      activeIndex: "1",
      labelPosition: 'long',
      form:{},
    };
  },
  methods: {
    handleSelect(e) {
      console.log(e);
      this.activeIndex = e;
    },
    changeRadioGroup(e) {
        console.log(e)
    }
  },
};
</script>
<style scoped>
.card {
  width: 500px;
  height: 500px;
  margin-left: 500px;
  margin-right: 500px;
  margin-top: 50px;
  padding-bottom: 500px;
  /* background-color: blue; */
  /* border-radius: 50px; */
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
}
</style>
