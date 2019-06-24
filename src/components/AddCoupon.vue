<template>
  <div>
    <h1>Add coupon</h1>
    <!-- Koriste v-on odreagovacemo na submit pozivom addCoupon -->
    <form v-on:submit="addCoupon">
      <!-- v-model nam sluzi da vezemo promenljivu za input -->
      <div class="form-group">
        <label>Shop:</label>
        <select v-model="selectedShop" required>
          <!-- sa :value keyword-om oznacavamo da ce vrednost selectedShop promenljive biti ceo shop a ne samo shop.name kao sto bi bilo po default-u.  -->
          <option v-bind:key="shop.id" v-for="shop in shops" :value="shop">{{shop.name}}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Product Name:</label>
        <input type="text" v-model="product">
      </div>

      <div class="form-group">
        <label>Original Price:</label>
        <input type="number" step="0.01" v-model.number="originalPrice" required>
      </div>

      <div class="form-group">
        <label>Discount Price:</label>
        <input type="number" step="0.01" v-model.number="discountPrice" required>
      </div>

      <div class="form-group">
        <label>Valid From:</label>
        <input type="date" v-model="validFrom" required>
      </div>

      <div class="form-group">
        <label>Valid To:</label>
        <input type="date" v-model="validTo">
      </div>

      <input type="submit" value="Create">
    </form>
  </div>
</template>

<script>
export default {
  name: "AddCoupon",

  /* props: To su promenljive koje ova komponenta moze da primi od strane drugih komponenti.
  Ovoj komponenti je prosledjena lista kupona koristeci v-bind:coupons od strance App.vue komponente. 
  Ove promenljive mozemo koristiti u template sekciji*/
  props: ["shops"],
  data() {
    return {
      selectedShop: {},
      product: "",
      originalPrice: 0,
      discountPrice: 0,
      validFrom: null,
      validTo: null
    };
  },
  methods: {
    addCoupon(e) {
      // Sprecavamo default-no ponasanje forme
      e.preventDefault();

      // Kreiramo kupon onako kako ga BE ocekuje na osnovu polja u data() koja su popunjena od strane template-a
      let validTo =
        this.validTo != null ? this.validTo.toString() + "T00:00:00.0Z" : null;

      const newCoupon = {
        shop: this.selectedShop,
        product: this.product,
        originalPrice: this.originalPrice,
        discountPrice: this.discountPrice,
        validFrom: this.validFrom.toString() + "T00:00:00.0Z",
        validTo: validTo
      };

      /* Kreiramo event koji ce isplivati do parent-a sa $emit funkcijom i prosledjujemo mu novokreirani kupon. 
      Ovaj event ce se zvati add-coupon. Parent ce uhvatiti ovaj event sa v-on:add-coupon. Ovo radimo jer je parent
      vlasnik svih kupona i parent je taj koji ima logiku za kontaktiranje BE.
      */
      this.$emit("add-coupon", newCoupon);

      // Vracamo sve vrednosti na staro
      this.shop = this.shops[0];
      this.product = "";
      this.originalPrice = 0;
      this.discountPrice = 0;
      this.validFrom = null;
      this.validTo = null;
      // Sprecavamo default-no ponasanje forme
      return false;
    }
  }
};
</script>

<style scoped>
label {
  margin-right: 10px;
}

.form-group {
  margin: 12px 0;
}
</style>