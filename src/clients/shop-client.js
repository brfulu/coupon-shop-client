const domainUrl = "http://localhost:8080/rest";

let ShopClient = {
    loadShops(comp) {
      fetch(domainUrl + "/shops")
        .then(function(response) {
          return response.json();
        })
        .then(function(shops) {
          comp.shops = shops;
        });
    }
}


export default ShopClient
