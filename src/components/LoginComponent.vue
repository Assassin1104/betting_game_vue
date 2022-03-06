<template>
  <div class="limiter">
    <div class="container-login100" style="background-image: url('/assets/bg-01.jpg');">
      <div class="wrap-login100">
        <form class="login100-form validate-form" @submit.prevent="login">
          <div class="login_logo_parent">
          <img src="/img/logo.png" alt="..." class="img-thumbnail logo-image login_logo" style = "zoom : 47%; border:none;">
          </div>
          <span class="login100-form-title p-b-34 p-t-27" id = "login_letters_modify">Log in</span>
          <span class="login100-form-logo">
            <svg data-v-7983366c="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" style="width:24px"><path d="M19.294 16.109l-3.414-2.219 1.287-2.359c0.288-0.519 0.457-1.137 0.458-1.796v-3.735c0-2.9-2.351-5.25-5.25-5.25s-5.25 2.351-5.25 5.25v0 3.735c0.001 0.658 0.17 1.277 0.468 1.815l-0.010-0.019 1.287 2.359-3.414 2.219c-1.033 0.676-1.706 1.828-1.706 3.137 0 0.002 0 0.005 0 0.007v-0 3.997h17.25v-3.997c0-0.002 0-0.005 0-0.007 0-1.309-0.673-2.461-1.692-3.128l-0.014-0.009zM19.5 21.75h-14.25v-2.497c0-0.001 0-0.003 0-0.004 0-0.785 0.404-1.477 1.015-1.877l0.009-0.005 4.578-2.976-1.952-3.578c-0.173-0.311-0.274-0.682-0.275-1.077v-3.735c0-2.071 1.679-3.75 3.75-3.75s3.75 1.679 3.75 3.75v0 3.735c-0 0.395-0.102 0.766-0.281 1.089l0.006-0.012-1.952 3.579 4.578 2.976c0.62 0.406 1.024 1.097 1.024 1.882 0 0.001 0 0.003 0 0.004v-0z"></path></svg>
          </span>
          <div style="margin-bottom: 30px">
            <label class="form-label">Username</label>
            <input type="text" v-model="username" class="form-control" placeholder="Username" required />
          </div>
          <div style="margin-bottom: 30px">
            <label class="form-label">Password</label>
            <input type="password" v-model="password" placeholder="Password" class="form-control" required />
          </div>
          <div class="container-login100-form-btn">
            <button type="submit" class="" style="padding: 9px 40px; border-radius: 1.25rem; border: none; background-color: #0000ff; color: white;">Login</button>
          </div>
          <div class="text-center p-t-40"></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions } from "vuex";
  import axios from "axios";
  import swal from "sweetalert2";
  import store from '@/store';
  export default {
    data: () => {
      return {
        username: "",
        password: "",
        role: ""
      };
    },
    created() {
      this.role = "admin"
    },
    methods: {
      ...mapMutations(["setUser", "setToken"]),
      login(e) {
        e.preventDefault();
        let apiURL = `${process.env.VUE_APP_URL}api/users/wordpress/userlists/${this.username}/${this.password}`;
      axios
        .post(apiURL)
        .then((res) => {
          if (res.data.state == "active") {
            const user = res.data.user;
            const token = res.data.token;
            const admin = res.data.admin;
            console.log(user, token, admin)
            localStorage.setItem("user", user.name);
            localStorage.setItem("user_id", user.user_id);
            localStorage.setItem("token", token);
            localStorage.setItem("admin", admin);
            localStorage.setItem("membership_level", user.membership_level);
            this.setUser(user)
            this.setToken(token)
            if(!user || !token) {
              console.log('Please check again your login information')
              swal.fire("Error!", "Please check again your login information", "error");
            } else {
              this.$router.push({name: 'MoneyManage'});
              store.dispatch('me');
            }
          } else {
            swal.fire("Error!", "Your account is not activated", "error");
          }
        })
      }
    }
  };
</script>
<style scope>
.form-label {
    color: #000;
    font-size: 16px;
    margin-bottom: 5px;
    font-family: "Poppins", sans-serif;
}
.form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>

<style>
.limiter {
    width: 100%;
    margin: 0 auto;
}
.container-login100 {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    z-index: 1;
    background-color: black;
}
.container-login100::before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255,255,255,.9);
}
.wrap-login100 {
    width: 500px;
    border-radius: 10px;
    overflow: hidden;
    padding: 55px 55px 37px;
    background: #fff;
    /* background: -webkit-linear-gradient(top,#7579ff,#b224ef); */
}
.contact100-form-checkbox {
    padding-left: 5px;
    padding-top: 5px;
    padding-bottom: 35px;
}
.login100-form {
    width: 100%;
}
.login100-form-logo {
    font-size: 60px;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #d2d2d2;
    margin: 0 auto;
}
.login100-form-title {
    font-family: fantasy;
    font-size: 34px;
    color: #292929;
    line-height: 1.2;
    text-align: center;
    text-transform: uppercase;
    display: block;
}
.container-login100-form-btn {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.btn2 {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  padding: 9px 40px;
  font-size: 18px;
  border-width: 2px;
  border: none;
  position: relative;
  overflow: hidden;
  border-radius: 1.25rem;
  cursor: pointer;
  background: #344675;
  background-image: linear-gradient(to bottom left, #344675, #263148, #344675);
  background-size: 210% 210%;
  background-position: top right;
  background-color: #344675;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #ffffff;
}
.m-btn-success {
  background: #00f2c3;
  background-image: linear-gradient(to bottom left, #00f2c3, #0098f0, #00f2c3);
  background-size: 210% 210%;
  background-position: top right;
  background-color: #00f2c3;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #ffffff;
}
.p-b-34 {
    padding-bottom: 34px;
}
.p-t-27 {
    padding-top: 27px;
}
.p-t-40 {
    padding-top: 40px;
}

#login_letters_modify{
  padding-bottom: 1px !important;
}

.login_logo{

}

.login_logo_parent{
  width: 78%;
  margin: 0 auto;
}
</style>
