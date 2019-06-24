<template>
  <div>
    <h1>Coupons</h1>
    <form v-if="pagination" v-on:submit="filter">
      <div class="form-group">
        <label>Show active:</label>
        <input v-model="active" class="mr" type="checkbox">
        <button type="submit">Filter</button>
      </div>
    </form>
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Shop</th>
          <th>New Price</th>
          <th>OldPrice</th>
          <th>Discount</th>
          <th>Valid From</th>
          <th>Valid To</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for sluzi da kreira HTML element <tr> za svaki element u nizu coupons-->
        <tr v-bind:key="coupon.id" v-for="coupon in coupons">
          <td>{{ coupon.product }}</td>
          <td>
            <a href="#" @click="goToShopPage(coupon.shop.id)">{{ coupon.shop.name }}</a>
          </td>
          <td class="green">{{ coupon.discountPrice }}</td>
          <td class="red">{{ coupon.originalPrice }}</td>
          <td>{{ coupon.discount.toFixed(2) }}%</td>
          <td>{{ coupon.validFrom.toString().substr(0, 10) }}</td>
          <td v-if="coupon.validTo != null">{{ coupon.validTo.toString().substr(0, 10) }}</td>
          <td v-else>Always</td>
          <td>
            <button class="btn-delete" @click="deleteCoupon($event, coupon.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="pagination">
      <button @click="prevPage" class="mr">&larr; Prev</button>
      <button @click="nextPage">Next &rarr;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Coupons",
  data() {
    return {
      page: 1,
      active: false
    };
  },

  /* props: To su promenljive koje ova komponenta moze da primi od strane drugih komponenti.
  Ovoj komponenti je prosledjena lista kupona koristeci v-bind:coupons od strance App.vue komponente. 
  Ove promenljive mozemo koristiti u template sekciji*/
  props: ["coupons", "pagination"],
  methods: {
    deleteCoupon(e, id) {
      this.$emit("delete-coupon", id);
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.$emit("load-page", { page: this.page, active: this.active });
      }
    },
    nextPage() {
      if (this.coupons.length > 0) {
        this.page++;
        this.$emit("load-page", { page: this.page, active: this.active });
      }
    },
    filter(e) {
      e.preventDefault();
      this.$emit("load-page", { page: this.page, active: this.active });
      return false;
    },
    goToShopPage(id) {
      this.$emit("go-to-shop", id);
      console.log(id);
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  margin-bottom: 20px;
}

table,
th,
td {
  border: 1px solid black;
}

td {
  padding: 0 5px;
}

.btn-delete {
  display: block;
}

.green {
  color: green;
}

.red {
  color: red;
}

.mr {
  margin-right: 8px;
}

.form-group {
  margin: 12px 0;
}
</style>