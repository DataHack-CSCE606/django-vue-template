<template>
  <el-form
    :model="form"
    ref="form"
    class="demo-form"
    label-position="left"
    v-loading="loading"
  >
    <el-form-item label="Name" prop="name" label-width="50px" class="item_name">
      <el-input
        v-model="form.name"
        :disabled="true"
        style="width: 50%"
      ></el-input>
    </el-form-item>

    <el-form-item label="Email" prop="email" label-width="50px">
      <el-input
        v-model="form.email"
        :disabled="true"
        style="width: 50%"
      ></el-input>
    </el-form-item>

    <el-form :inline="true">
      <el-form-item
        label="Short Tax Rate"
        prop="short_tax_rate"
        label-width="120px"
      >
        <el-input v-model="form.short_tax_rate"></el-input>
      </el-form-item>
      <el-form-item
        label="Long Tax Rate"
        prop="long_tax_rate"
        label-width="120px"
      >
        <el-input v-model="form.long_tax_rate"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true"
      ><el-form-item label="Investment Horizon" prop="investment_horizon">
        <el-input v-model="form.investment_horizon"></el-input>
      </el-form-item>
      <el-form-item label="Opportunity Cost" prop="opp_cost"
        ><el-input v-model="form.opp_cost"></el-input
      ></el-form-item>
    </el-form>
    <el-form :inline="true">
      <el-form-item label="Login Notification"
        ><el-switch v-model="form.login_notification"></el-switch
      ></el-form-item>
      <el-form-item label="Sell Notification"
        ><el-switch v-model="form.sell_notification"></el-switch
      ></el-form-item>
    </el-form>
    <el-form-item>
      <el-button type="primary" @click="Save">Save</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import axios from "axios";
import { getStore } from "@/config/utils";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        short_tax_rate: "",
        long_tax_rate: "",
        investment_horizon: "",
        opp_cost: "",
        login_notification: "",
        sell_notification: "",
      },
      loading: true,
    };
  },
  methods: {
    Save() {
      this.loading = true;
      axios
        .post("/profile/set/", {
          id: getStore("user").user_id,
          short_tax_rate: this.form.short_tax_rate,
          long_tax_rate: this.form.long_tax_rate,
          investment_horizon: this.form.investment_horizon,
          opp_cost: this.form.opp_cost,
          login_notification: this.form.login_notification,
          sell_notification: this.form.sell_notification,
        })
        .then((res) => {
          this.loading = false;
          // console.log(res);
          if (res.data.state == "success") {
            this.$message({
              message: "Your profile has been updated!",
              type: "success",
            });
          } else {
            this.$message({
              message: "Something went wrong...",
              type: "error",
            });
          }
        })
        .catch((err) => {
          // console.error(err);
          this.$message({
            message: "Something went wrong...",
            type: "error",
          });
        });
    },
  },
  created() {
    axios
      .post("/profile/", {
        id: getStore("user").user_id,
      })
      .then((res) => {
        this.loading = false;
        // this.form = res.data;
        console.log(res);
        this.form.name = getStore("user").name;
        this.form.email = getStore("user").email;
        this.form.short_tax_rate = res.data.short_tax_rate;
        this.form.long_tax_rate = res.data.long_tax_rate;
        this.form.investment_horizon = res.data.investment_horizon;
        this.form.opp_cost = res.data.opp_cost;
        this.form.login_notification = res.data.login_notification;
        this.form.sell_notification = res.data.sell_notification;
      })
      .catch((err) => {
        // console.error(err);
      });
  },
};
</script>

