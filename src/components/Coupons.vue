<template>
  <div>
    <h1>Coupons</h1>
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Shop</th>
          <th>New Price</th>
          <th>OldPrice</th>
          <th>Discount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for sluzi da kreira HTML element <tr> za svaki element u nizu coupons-->
        <tr v-bind:key="coupon.id" v-for="coupon in coupons">
          <td>{{ coupon.productName }}</td>
          <td>{{ coupon.shop.name }}</td>
          <td>{{ coupon.newPrice }}</td>
          <td>{{ coupon.oldPrice }}</td>
          <td>{{ coupon.discount }}%</td>
          <td>
            <button >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Coupons",

  /* props: To su promenljive koje ova komponenta moze da primi od strane drugih komponenti.
  Ovoj komponenti je prosledjena lista kupona koristeci v-bind:coupons od strance App.vue komponente. 
  Ove promenljive mozemo koristiti u template sekciji*/
  props: ["coupons"]
};
</script>

<style scoped>

table {
  border-collapse: collapse;
  margin-bottom: 20px;
}

table, th, td {
  border: 1px solid black;
}

td {
  padding: 0 5px;
}
</style>