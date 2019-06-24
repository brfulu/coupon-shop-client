

<template>
  <div>
    <h1>Shop: {{shop.name}}</h1>

    <button @click="deleteShop">Delete shop</button>
    <Coupons v-bind:coupons="coupons" v-on:delete-coupon="deleteCoupon"/>
  </div>
</template>

<script>
import Coupons from "./Coupons";
import CouponClient from "@/clients/coupon-client.js";
import ShopClient from "@/clients/shop-client.js";
import { constants } from "fs";

export default {
  components: {
    Coupons
  },
  props: ["shop", "coupons"],
  methods: {
    deleteShop() {
      ShopClient.deleteShop(this.shop.id, this);
    },
    deleteCoupon(id) {
      CouponClient.deleteCoupon(id, this);
      // CouponClient.loadCoupons({ page: 1, active: false }, this);
    }
  },
  mounted() {
    console.log(this.shop);
    if (this.shop == undefined) {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped>
.red {
  color: red;
  height: 30px;
}
</style>

