const domainUrl = "http://localhost:8080/api";

let CouponClient = {
  loadCoupons(pageInfo, comp) {
    let token = window.localStorage.getItem('token');
    fetch(domainUrl + "/coupons?size=10&page=" + pageInfo.page + "&active=" + pageInfo.active, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        comp.coupons = response.data;
      });
  },

  addCoupon(coupon, comp) {
    let token = window.localStorage.getItem('token');
    fetch(domainUrl + "/coupons", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(coupon)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (coupon) {
        comp.coupons = [...comp.coupons, coupon]
      });
  },

  deleteCoupon(id, comp) {
    let token = window.localStorage.getItem('token');
    fetch(domainUrl + "/coupons/" + id, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (deleted) {
        if (deleted) {
          comp.coupons = comp.coupons.filter(obj => obj.id != id);
        }
      });
  }
};


export default CouponClient;
