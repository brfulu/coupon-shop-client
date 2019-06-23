
<template>
  <div>
    <!-- Coupons tag je zahtev da se na mestu ovog taga izrenderuje template Coupons komponente. 
    Ovaj tag je moguc ako se komponenta doda u listu komponenti (components) u skirpt sekciji.
    v-bind:coupons="coupons" znaci da za komponentu Coupons vezujemo promenljivu coupons 
    (iz data() u skript zekciji, ovo je pod navodnicima) pod imenom coupons (ime promenljive je posle ':')-->
    <Coupons
      v-bind:coupons="coupons"
      v-bind:pagination="pagination"
      v-on:delete-coupon="deleteCoupon"
      v-on:load-page="loadPage"
      v-on:go-to-shop="goToShop"
    />

    <!-- Na slican nacin umecemo i komponentu AddCoupon (komponenta zaduzena za dodavanje novog kupona). 
    v-on:add-coupon="addCoupon" je nacin kako da vezemo addCoupon funkciju na event add-coupon.
    Ukoliko komponenta AddCoupon okine event add-coupon onda ce pozvati fukcija addCoupon koja se nalazi u "methods"-->
    <AddCoupon v-on:add-coupon="addCoupon" v-bind:shops="shops"/>
  </div>
</template>

<script>
/* Pre nego sto budemo uopste mogli da koristimo komponente u 
template-u moramo da ih importujemo i zaregistrujemo u "components" */
import Coupons from "./Coupons";
import AddCoupon from "./AddCoupon";

/* Importovali smo svoja dva modula za klijente. Klijenti ce pozivati BE.
 */
import CouponClient from "@/clients/coupon-client.js";
import ShopClient from "@/clients/shop-client.js";

export default {
  name: "home", // name: Definise ime komponente

  props: ["user"],

  /* components: Lista komponenti. Zaregistruje importovane komponente. 
  Ove komponente sada mozemo koristiti u template-u. */
  components: {
    Coupons,
    AddCoupon
  },

  /* data: Mora biti funkcija koja vraca objekat. 
  Taj objekat ce sadrzati podatke koje ce ova komponenta koristiti. 
  Svi podaci zaregistrovani u data sekciji mogu se pristupiti sa this npr. this.coupons */
  data() {
    return {
      coupons: [],
      shops: [],
      pagination: true
    };
  },

  /* methods: Funkcije dostupne ovoj komponenti cak i u template-u. 
  Kao i u data sekciji ovim metodama mozemo pristupiti sa this.*/
  methods: {
    addCoupon(coupon) {
      CouponClient.addCoupon(coupon, this);
    },
    deleteCoupon(id) {
      CouponClient.deleteCoupon(id, this);
      CouponClient.loadCoupons({ page: 1, active: false }, this);
    },
    loadPage(pageInfo) {
      CouponClient.loadCoupons(pageInfo, this);
    },
    goToShop(id) {
      let shop = this.shops.find(x => x.id === id);
      shop = {
        id: shop.id,
        name: shop.name
      };
      let coupons = this.coupons.filter(x => x.shop.id == id);
      this.$router.push({ name: "shop", params: { shop, coupons } });
    }
  },
  /* created: ovde stavljamo kod koji ce se izvrsiti cim se stranica i komponente ucitaju
   */
  created() {
    CouponClient.loadCoupons({ page: 1, active: false }, this);
    ShopClient.loadShops(this);
  },
  mounted() {
    if (this.user == null) {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style>
</style>
