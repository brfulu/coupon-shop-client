const domainUrl = "http://localhost:8080/rest";

let CouponClient = {
    loadCoupons(comp) {
        fetch(domainUrl + "/coupons")
            .then(function (response) {
                return response.json();
            })
            .then(function (couponsVal) {
                comp.coupons = couponsVal;
            });
    },

    addCoupon(coupon, comp) {  
        fetch(domainUrl + "/coupons", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(coupon)
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(coupon) {
            comp.coupons = [...comp.coupons, coupon]
          });
      }
}


export default CouponClient
