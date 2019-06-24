const domainUrl = "http://localhost:8080/api";
import VueJwtDecode from 'vue-jwt-decode'

let UserClient = {
  loadUser(id, comp) {
    fetch(domainUrl + "/users/" + id)
      .then(function (response) {
        return response.json();
      })
      .then(function (user) {
        console.log(user);
        comp.user = user;
      });
  },
  login(user, comp) {
    fetch(domainUrl + "/users/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(function (response) {
        let token = response.headers.get('Authorization').substr(7);
        window.localStorage.setItem('token', token);

        token = VueJwtDecode.decode(token);
        const user = {
          firstName: token.firstName,
          lastName: token.lastName,
          username: token.user,
          role: token.role
        }
        window.localStorage.setItem('user', JSON.stringify(user));
        comp.loginFinished(user);
        return response.json();
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        comp.loginFinished(null);
        console.log(error);
      });
  },

  register(user, comp) {
    let token = window.localStorage.getItem('token');
    fetch(domainUrl + "/users/register", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(user)
    })
      .then(function (response) {
        if (response.status == 200) {
          return response.json();
        }
        if (response.status == 401) {
          throw "You don't have the right privileges for this operation!";
        } else {
          throw "Error while adding new user!";
        }
      })
      .then(function (response) {
        alert('User added successfully!');
        console.log(response);
      })
      .catch(function (error) {
        alert(error);
      });
  }
};


export default UserClient;
