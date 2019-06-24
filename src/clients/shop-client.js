const domainUrl = "http://localhost:8080/api";

let ShopClient = {
  loadShops(comp) {
    let token = window.localStorage.getItem('token');
    console.log('asda', token);
    fetch(domainUrl + "/shops", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (shops) {
        comp.shops = shops;
      });
  },
  deleteShop(id, comp) {
    let token = window.localStorage.getItem('token');
    fetch(domainUrl + "/shops/" + id, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (deleted) {
        console.log(deleted);
        if (deleted) {
          comp.coupons = [];
          comp.shop = { name: comp.shop.name + ' (deleted)' }
        }
      });
  }
};


export default ShopClient;
