<template>
  <div style="height: 100%; width: 100%; background-color: #ffffff">
    <div class="card" style="height: 500px; padding-bottom: 500px">
      <div style="padding-top: 10px; margin-left: 20%; margin-right: 20%">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          active-text-color="red"
        >
          <el-menu-item style="width: 50%" index="0">Market</el-menu-item>
          <el-menu-item style="width: 50%" index="1">Limit</el-menu-item>
        </el-menu>
      </div>
      <div style="display: flex; flex-direction: column">
        <div style="margin-top: 45px">
          <el-radio-group
            v-model="labelPosition"
            @change="changeRadioGroup"
            size="medium"
            fill="#F56C6C"
          >
            <el-radio-button label="0">Long</el-radio-button>
            <el-radio-button label="1">Short</el-radio-button>
          </el-radio-group>
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
            style="margin-left: 10%; margin-right: 10%; margin-top: 20px"
          >
            <el-form-item label="SwapRate">
              <el-input style="width: 280px" v-model="form.swapRate"></el-input>
              %
            </el-form-item>
            <el-form-item label="Margin">
              <el-input
                style="width: 250px"
                v-model="form.MarginAmount"
              ></el-input>
              USDC
            </el-form-item>
            <el-form-item label="NotionalSize">
              <el-input
                style="width: 280px"
                v-model="form.notionalSize"
              ></el-input>
            </el-form-item>
            <el-form-item label="yourBalance:">
              <div style="color: #666666">
                <span>{{ yourBalane }} USDC</span
                ><el-button
                  type="danger"
                  plain
                  size="mini"
                  @click="faucetToken"
                  style="margin-left: 20px"
                  >Faucet USDC</el-button
                >
              </div>
            </el-form-item>
          </el-form>
          <el-button
            v-if="!isLoading"
            style="width: 300px; margin-top: 10px"
            @click="book"
            type="danger"
            >Book</el-button
          >
          <el-button
            v-if="isLoading"
            style="width: 300px; margin-top: 10px"
            type="danger"
            :loading="true"
            >Loading</el-button
          >
        </div>
      </div>
    </div>
        <div
      class="card"
      style="
        width: 1400px;
        margin-left: 50px;
        margin-right: 50px;
        margin-bottom: 50px;
      "
    >
      <div style="padding-top: 20px;padding-bottom: 20px;font-size: 24px;font-weight: 600;">My LimitOrder</div>
      <el-table :data="MyPositions" style="width: 100%;padding-left:30px;padding-right:30px;padding-top:10px;padding-bottom:20px;">
        <el-table-column label="Type" width="90">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_fixed_receiver" type="success">Long</el-tag>
            <el-tag v-if="!scope.row.is_fixed_receiver" type="danger">Short</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="SwapRate" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.swap_rate/10**4 }}%</span>
          </template>
        </el-table-column>
        <el-table-column label="StartTime" width="240">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{time(scope.row.start_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="EndTime" width="240">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ time(scope.row.end_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="MarginAmount" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.margin_amount/10**6 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="NotionalAmount" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.notional_amount/10**6 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Operate"  width="200">
          <template slot-scope="scope">
            <el-button 
              size="mini" 
              type="warning"
              @click="UserUnlistLimitOrder(scope.$index, scope.row)"
              >Close</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="card"
      style="
        width: 1400px;
        margin-left: 50px;
        margin-right: 50px;
        margin-bottom: 50px;
      "
    >
      <div style="padding-top: 20px;padding-bottom: 20px;font-size: 24px;font-weight: 600;">My Position</div>
      <el-table :data="MyPositions" style="width: 100%;padding-left:30px;padding-right:30px;padding-top:10px;padding-bottom:20px;">
        <el-table-column label="Type" width="70">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_fixed_receiver" type="success">Long</el-tag>
            <el-tag v-if="!scope.row.is_fixed_receiver" type="danger">Short</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="SwapRate" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.swap_rate/10**4 }}%</span>
          </template>
        </el-table-column>
        <el-table-column label="StartTime" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{time(scope.row.start_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="EndTime" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ time(scope.row.end_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status" width="90">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.health_factor>=10**6" type="success">healthy</el-tag>
            <el-tag v-if="scope.row.health_factor<10**6" type="danger">unhealthy</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="MarginAmount" width="140">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.margin_amount/10**6 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="NotionalAmount" width="140">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.notional_amount/10**6 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Margin Operate"  width="500">
          <template slot-scope="scope">
            <el-input
            v-if="!scope.row.is_liquidable&&(parseInt(new Date().getTime()/1000)<scope.row.end_time)"
            style="width:100px;margin-right:20px;"
            v-model="scope.row.new_margin_amount"
            size="mini"
            placeholder="margin"/>
            <el-button 
              v-if="!scope.row.is_liquidable&&(parseInt(new Date().getTime()/1000)<scope.row.end_time)"
              size="mini" 
              type="danger"
              @click="MarginOperate(scope.$index, scope.row, 1)"
              >Increase</el-button
            >
            <el-button
              v-if="!scope.row.is_liquidable&&(scope.row.health_factor>10**6)&&(parseInt(new Date().getTime()/1000)<scope.row.end_time)"
              size="mini"
               type="info"
              @click="MarginOperate(scope.$index, scope.row, 2)"
              >Decrease</el-button
            >
            <el-button 
              v-if="!scope.row.is_liquidable&&(parseInt(new Date().getTime()/1000)<scope.row.end_time)"
              size="mini" 
              type="warning"
              @click="MarginOperate(scope.$index, scope.row, 4)"
              >Close</el-button
            >
            <el-tag v-if="scope.row.is_liquidable&&(parseInt(new Date().getTime()/1000)<scope.row.end_time)" type="info">Closed</el-tag>
            <el-button 
              v-if="!scope.row.is_liquidable&&(parseInt(new Date().getTime()/1000)>=scope.row.end_time)"
              size="mini" 
              type="danger"
              @click="MarginOperate(scope.$index, scope.row, 3)"
              >Withdraw Token</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters, mapActions } from "vuex";
import BasePoolABI from "@/contracts/BasePool.json";
import MockERC20ABI from "@/contracts/IMockERC20.json";
// import PositionManager from "@/contracts/PositionManager.json";

export default {
  components: {},
  data() {
    return {
      activeIndex: "1",
      labelPosition: "0",
      yourBalane: 100,
      isLoading: false,
      form: {
        swapRate: 0,
        MarginAmount: 0,
        notionalSize: 0,
        longFlag: 0, // 0=long;1=short
        swapType: 0, // 0=market;1=Limit
      },
      MyPositions: [{
        position_id:1,
        swap_rate: 10000,
        notional_amount: 7000000,
        margin_amount: 6000000,
        is_fixed_receiver: true,
        is_liquidable: false,
        health_factor: 20000000,
        start_time: 1653270954,
        end_time: 1673670954,
        new_margin_amount:0,
      },{
        position_id:0,
        swap_rate: 25000,
        notional_amount: 12000000,
        margin_amount: 60000000,
        is_fixed_receiver: false,
        is_liquidable: true,
        health_factor: 6000000,
        start_time: 1655270954,
        end_time: 1673370954,
        new_margin_amount:0,
      },{
        position_id:2,
        swap_rate: 178400,
        notional_amount: 7800000,
        margin_amount: 6580000,
        is_fixed_receiver: true,
        is_liquidable: false,
        health_factor: 20000,
        start_time: 1653170954,
        end_time: 1673570954,
        new_margin_amount:0,
      },{
        position_id:3,
        swap_rate: 1045000,
        notional_amount: 7007800,
        margin_amount: 6450000,
        is_fixed_receiver: true,
        is_liquidable: false,
        health_factor: 20000000,
        start_time: 1553270954,
        end_time: 1573670954,
        new_margin_amount:0,
      }],
    };
  },
  computed: {
    ...mapGetters("accounts", [
      "getActiveAccount",
      "isUserConnected",
      "getWeb3Modal",
      "getWeb3",
      "getContractAddress",
    ]),
  },
  created: {

  },
  methods: {
    handleEdit(index, row) {
        console.log(index, row);
    },
    handleDelete(index, row) {
        console.log(index, row);
    },
    ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"]),
    async getAllData() {
      await this.getBalance();
    },
    async getBalance(){
      const my = this;
      const web3 = this.$store.getters["accounts/getWeb3"];
      const ActiveAccount = this.$store.getters["accounts/getActiveAccount"];
      const contractAddress =
        this.$store.getters["accounts/getContractAddress"];
      try {
        const MockERC20Contract = new web3.eth.Contract(
          MockERC20ABI,
          contractAddress.MockERC20
        );
        if (MockERC20Contract) {
          let myBalance = await MockERC20Contract.methods.balanceOf(ActiveAccount).call()
          my.yourBalane = myBalance;
        }
      } catch (error) {
        console.log(error);
        // alert("Error:Transaction failed!");
        my.sendErrorMsg(my, "Error: Something Wrong!");
      }
    },
    faucetToken(){
      const my = this;
      const web3 = this.$store.getters["accounts/getWeb3"];
      const ActiveAccount = this.$store.getters["accounts/getActiveAccount"];
      const contractAddress =
        this.$store.getters["accounts/getContractAddress"];
      try {
        const MockERC20Contract = new web3.eth.Contract(
          MockERC20ABI,
          contractAddress.MockERC20
        );
        if (MockERC20Contract) {
          MockERC20Contract.methods
            .faucet(contractAddress.BasePool)
            .send({
              from: ActiveAccount,
            })
            .on("receipt", function (receipt) {
              console.log(receipt);
              if (receipt.status) {
                my.sendMsg(
                  my,
                  "Success",
                  "The transaction is successful",
                  "success"
                );
              } else {
                my.sendErrorMsg(my, "Transaction failed!");
              }
            })
            .on("error", function (error) {
              console.log(error);
              // alert("Transaction failed");
              my.sendErrorMsg(my, "Transaction failed!");
            });
        }
      } catch (error) {
        console.log(error);
        // alert("Error:Transaction failed!");
        my.sendErrorMsg(my, "Error:Transaction failed!");
      }
    },
    UserUnlistLimitOrder(index, row){
      console.log(index, row);
      const my = this;
      const web3 = this.$store.getters["accounts/getWeb3"];
      const ActiveAccount = this.$store.getters["accounts/getActiveAccount"];
      const contractAddress =
        this.$store.getters["accounts/getContractAddress"];
      try {
        const BasePoolContract = new web3.eth.Contract(
          BasePoolABI,
          contractAddress.BasePool
        );
        if (BasePoolContract) {
          BasePoolContract.methods
            .ClosePosition(row.position_id)
            .send({
              from: ActiveAccount,
            })
            .on("receipt", function (receipt) {
              console.log(receipt);
              if (receipt.status) {
                my.sendMsg(
                  my,
                  "Success",
                  "The transaction is successful",
                  "success"
                );
              } else {
                my.sendErrorMsg(my, "Transaction failed!");
              }
            })
            .on("error", function (error) {
              console.log(error);
              // alert("Transaction failed");
              my.sendErrorMsg(my, "Transaction failed!");
            });
        }
      } catch (error) {
        console.log(error);
        // alert("Error:Transaction failed!");
        my.sendErrorMsg(my, "Error:Transaction failed!");
      }
    },
    MarginOperate(index, row, type){
      console.log(index, row, type);
      const my = this;
      const web3 = this.$store.getters["accounts/getWeb3"];
      const ActiveAccount = this.$store.getters["accounts/getActiveAccount"];
      const contractAddress =
        this.$store.getters["accounts/getContractAddress"];
      try {
        const BasePoolContract = new web3.eth.Contract(
          BasePoolABI,
          contractAddress.BasePool
        );
        if (BasePoolContract) {
          if(type == 1) {
            console.log("increase")
            if (parseFloat(row.new_margin_amount) <= 0) {
              this.sendErrorMsg(this, "Error: margin amount must be positive!");
              return;
            }
            my.IncreaseMargin(my,BasePoolContract,ActiveAccount,row.position_id,parseFloat(row.new_margin_amount));
          } else if(type == 2) {
            console.log("descrise")
            if (parseFloat(row.new_margin_amount) <= 0) {
              this.sendErrorMsg(this, "Error: margin amount must be positive!");
              return;
            }
            my.DecreaseMargin(my,BasePoolContract,ActiveAccount,row.position_id,parseFloat(row.new_margin_amount));
          } else if(type == 3) {
            console.log("withdraw")
            my.RedeemMargin(my,BasePoolContract,ActiveAccount,row.position_id);
          } else if(type == 4) {
            console.log("close")
            my.ClosePosition(my,BasePoolContract,ActiveAccount,row.position_id);
          }
        }
      } catch (error) {
        console.log(error);
        // alert("Error:Transaction failed!");
        my.sendErrorMsg(my, "Error:Transaction failed!");
      }
    },
    IncreaseMargin(
      my,
      contrsct,
      ActiveAccount,
      position_id,
      margin_amount
    ) {
      contrsct.methods
        .IncreaseMargin(position_id, margin_amount)
        .send({
          from: ActiveAccount,
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
          if (receipt.status) {
            my.sendMsg(
              my,
              "Success",
              "The transaction is successful",
              "success"
            );
          } else {
            my.sendErrorMsg(my, "Transaction failed!");
          }
        })
        .on("error", function (error) {
          console.log(error);
          // alert("Transaction failed");
          my.sendErrorMsg(my, "Transaction failed!");
        });
    },
    DecreaseMargin(
      my,
      contrsct,
      ActiveAccount,
      position_id,
      margin_amount
    ) {
      contrsct.methods
        .DecreaseMargin(position_id, margin_amount)
        .send({
          from: ActiveAccount,
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
          if (receipt.status) {
            my.sendMsg(
              my,
              "Success",
              "The transaction is successful",
              "success"
            );
          } else {
            my.sendErrorMsg(my, "Transaction failed!");
          }
        })
        .on("error", function (error) {
          console.log(error);
          // alert("Transaction failed");
          my.sendErrorMsg(my, "Transaction failed!");
        });
    },
    RedeemMargin(
      my,
      contrsct,
      ActiveAccount,
      position_id
    ) {
      contrsct.methods
        .RedeemMargin(position_id)
        .send({
          from: ActiveAccount,
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
          if (receipt.status) {
            my.sendMsg(
              my,
              "Success",
              "The transaction is successful",
              "success"
            );
          } else {
            my.sendErrorMsg(my, "Transaction failed!");
          }
        })
        .on("error", function (error) {
          console.log(error);
          // alert("Transaction failed");
          my.sendErrorMsg(my, "Transaction failed!");
        });
    },
    ClosePosition(
      my,
      contrsct,
      ActiveAccount,
      position_id
    ) {
      contrsct.methods
        .ClosePosition(position_id)
        .send({
          from: ActiveAccount,
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
          if (receipt.status) {
            my.sendMsg(
              my,
              "Success",
              "The transaction is successful",
              "success"
            );
          } else {
            my.sendErrorMsg(my, "Transaction failed!");
          }
        })
        .on("error", function (error) {
          console.log(error);
          // alert("Transaction failed");
          my.sendErrorMsg(my, "Transaction failed!");
        });
    },
    book() {
      const my = this;
      if (parseFloat(this.form.swapRate) < 0) {
        this.sendErrorMsg(this, "Error: SwapRate must be greater than zero!");
        return;
      }
      if (parseFloat(this.form.MarginAmount) <= 0) {
        this.sendErrorMsg(this, "Error: Margin must be greater than zero!");
        return;
      }
      if (parseFloat(this.form.MarginAmount) > this.yourBalane) {
        this.sendErrorMsg(
          this,
          "Error: Insufficient balance!Please faucet some tokens!"
        );
        return;
      }
      if (
        parseFloat(this.form.notionalSize) < parseFloat(this.form.MarginAmount)
      ) {
        this.sendErrorMsg(
          this,
          "Error: notionalSize must be greater than or qual to MarginAmount!"
        );
        return;
      }
      if (
        parseFloat(this.form.notionalSize) >
        40 * parseFloat(this.form.MarginAmount)
      ) {
        this.sendErrorMsg(this, "Error: the maximum leverage is 40× !");
        return;
      }
      const inputStruct = {
        swap_rate: Math.floor(parseFloat(this.form.swapRate) * 10 ** 4),
        margin_amount: Math.floor(parseFloat(this.form.MarginAmount) * 10 ** 6),
        notional_amount: Math.floor(
          parseFloat(this.form.notionalSize) * 10 ** 6
        ),
      };
      console.log(inputStruct);
      const web3 = this.$store.getters["accounts/getWeb3"];
      const ActiveAccount = this.$store.getters["accounts/getActiveAccount"];
      const contractAddress =
        this.$store.getters["accounts/getContractAddress"];
      try {
        const BasePoolContract = new web3.eth.Contract(
          BasePoolABI,
          contractAddress.BasePool
        );
        if (BasePoolContract) {
          if (this.form.swapType == 0) {
            if (this.form.longFlag == 0) {
              my.FixedMarketOrder(
                my,
                BasePoolContract,
                ActiveAccount,
                inputStruct.swap_rate,
                inputStruct.margin_amount,
                inputStruct.notional_amount
              );
            } else if (this.form.longFlag == 1) {
              my.VariableMarketOrder(
                my,
                BasePoolContract,
                ActiveAccount,
                inputStruct.swap_rate,
                inputStruct.margin_amount,
                inputStruct.notional_amount
              );
            }
          } else if (this.form.swapType == 1) {
            if (this.form.longFlag == 0) {
              my.FixedLimitOrder(
                my,
                BasePoolContract,
                ActiveAccount,
                inputStruct.swap_rate,
                inputStruct.margin_amount,
                inputStruct.notional_amount
              );
            } else if (this.form.longFlag == 1) {
              my.VariableLimitOrder(
                my,
                BasePoolContract,
                ActiveAccount,
                inputStruct.swap_rate,
                inputStruct.margin_amount,
                inputStruct.notional_amount
              );
            }
          }
        }
      } catch (error) {
        console.log(error);
        // alert("Error:Transaction failed!");
        my.sendErrorMsg(my, "Error:Transaction failed!");
      }
      // this.sendMsg(this, "Success", "The transaction is successful", "success");
    },
    FixedMarketOrder(
      my,
      contrsct,
      ActiveAccount,
      swap_rate,
      margin_amount,
      notional_amount
    ) {
      my.isLoading = true;
      contrsct.methods
        .FixedMarketOrder(swap_rate, margin_amount, notional_amount)
        .send({
          from: ActiveAccount,
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
          if (receipt.status) {
            my.isLoading = false;
            my.sendMsg(
              my,
              "Success",
              "The transaction is successful",
              "success"
            );
          } else {
            my.isLoading = false;
            my.sendErrorMsg(my, "Transaction failed!");
          }
        })
        .on("error", function (error) {
          console.log(error);
          // alert("Transaction failed");
          my.isLoading = false;
          my.sendErrorMsg(my, "Transaction failed!");
        });
    },
    VariableMarketOrder(
      my,
      contrsct,
      ActiveAccount,
      swap_rate,
      margin_amount,
      notional_amount
    ) {
      my.isLoading = true;
      contrsct.methods
        .VariableMarketOrder(swap_rate, margin_amount, notional_amount)
        .send({
          from: ActiveAccount,
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
          if (receipt.status) {
            my.isLoading = false;
            my.sendMsg(
              my,
              "Success",
              "The transaction is successful",
              "success"
            );
          } else {
            my.isLoading = false;
            my.sendErrorMsg(my, "Transaction failed!");
          }
        })
        .on("error", function (error) {
          console.log(error);
          // alert("Transaction failed");
          my.isLoading = false;
          my.sendErrorMsg(my, "Transaction failed!");
        });
    },
    FixedLimitOrder(
      my,
      contrsct,
      ActiveAccount,
      swap_rate,
      margin_amount,
      notional_amount
    ) {
      my.isLoading = true;
      contrsct.methods
        .FixedLimitOrder(swap_rate, margin_amount, notional_amount)
        .send({
          from: ActiveAccount,
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
          if (receipt.status) {
            my.isLoading = false;
            my.sendMsg(
              my,
              "Success",
              "The transaction is successful",
              "success"
            );
          } else {
            my.isLoading = false;
            my.sendErrorMsg(my, "Transaction failed!");
          }
        })
        .on("error", function (error) {
          console.log(error);
          // alert("Transaction failed");
          my.isLoading = false;
          my.sendErrorMsg(my, "Transaction failed!");
        });
    },
    VariableLimitOrder(
      my,
      contrsct,
      ActiveAccount,
      swap_rate,
      margin_amount,
      notional_amount
    ) {
      my.isLoading = true;
      contrsct.methods
        .VariableLimitOrder(swap_rate, margin_amount, notional_amount)
        .send({
          from: ActiveAccount,
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
          if (receipt.status) {
            my.isLoading = false;
            my.sendMsg(
              my,
              "Success",
              "The transaction is successful",
              "success"
            );
          } else {
            my.isLoading = false;
            my.sendErrorMsg(my, "Transaction failed!");
          }
        })
        .on("error", function (error) {
          console.log(error);
          // alert("Transaction failed");
          my.isLoading = false;
          my.sendErrorMsg(my, "Transaction failed!");
        });
    },
    handleSelect(e) {
      console.log(e);
      this.activeIndex = e;
      this.form.swapType = parseInt(e);
    },
    changeRadioGroup(e) {
      console.log(e);
      this.form.longFlag = parseInt(e);
    },
    sendMsg(my, title, msg, type) {
      const h = my.$createElement;
      my.$notify({
        title: title,
        type: type,
        message: h("i", { style: "color: teal" }, msg),
      });
    },
    sendErrorMsg(my, msg) {
      let h = my.$createElement;
      my.$notify.error({
        title: "Error",
        message: h("i", { style: "color: red" }, msg),
      });
    },
    time(time) {
      var date = new Date(time*1000);
      return date.toJSON().substr(0, 19).replace('T', ' ');
    },
  },
};
</script>
<style scoped>
.card {
  width: 500px;
  margin-left: 500px;
  margin-right: 500px;
  margin-top: 50px;
  /* background-color: blue; */
  /* border-radius: 50px; */
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
}
</style>
