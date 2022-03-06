<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="reg" class="form-style">
          <h1>Sign Up</h1>
          <p>User Name</p>
          <p>
            <input type="text" v-model="users.name">
          </p>
          <p>Email</p>
          <p>
            <input type="text" v-model="users.email">
          </p>
          <p>Password</p>
          <p>
            <input type="text" v-model="users.password">
          </p>
          <p>
            <button class="btn btn-primary">SignUp</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  // import swal from "sweetalert2";

  export default {
    name: "SignUp",
    data(){
      return {
        users: {
          name: "",
          email: "",
          password: "",
        },
      }
    },
    methods: {
      async reg(){
        let signupURL = `${process.env.VUE_APP_URL}api/users/signup`;
        axios.post(signupURL, this.users).then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error);
        });
        this.name="";
        this.email="";
        this.password="";
      }
    }
  }
</script>

