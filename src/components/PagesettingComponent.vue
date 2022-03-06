<template>
  <div>
    <div style="padding-top: 40px; background: #f1f1f3">
      <div class="row justify-content-center" style="margin-bottom: 30px">
        <div class="col-md-10">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div style="display: flex">
                  <div>
                    <h3 style="font-family: fantasy; margin-bottom: 0px">Page management</h3>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">

              <form @submit.prevent="handleSubmitForm" class="">
                <div class="card-body">
                  <label>membership page url</label>
                  <CInput v-model='membership_pg_url' type='url' />
                </div>

                <div class="card-body">
                  <div v-for="page in Pages" :key="page._id">
                    
                    <b-form-checkbox v-model="page.setting" :name="page.name" switch>
                      {{ page.name }} <input type="color" v-model="page.color" style="border: None" />
                    </b-form-checkbox>

                    <b-form-group>
                      <b-form-checkbox
                        v-for="option in page.membership_setting"                  
                        v-model="option.value"
                        :name="option.name.toString()"
                        inline
                      >
                        {{ option.name }}
                      </b-form-checkbox>
                    </b-form-group>
                  </div>
                </div>

                <div class="form-group mr20 mt-auto">
                  <button class="btn m-btn-success">Update</button>
                </div>
              </form>
            
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from "vuex";
  import axios from "axios";
  import swal from "sweetalert2";
  export default {
    data() {
      return {
        selected: [],
        checked1: false,
        checked2: false,
        Pages: [],
        membership_ids: [],
        membership_pg_url: ''
      }
    },
    created() {
      this.init()
      
    },
    methods: {
      handleSubmitForm() {
        console.log(this.Pages);
        
        let apiURL = `${process.env.VUE_APP_URL}api/pagesetting/update`;
        axios
          .post(apiURL, [this.Pages, this.membership_pg_url])
          .then((res) => {
            console.log(res.data)
            
            swal.fire("Success!", "Update Page setting succesfully", "success");
            
          })
                
          .catch((error) => {
            console.log('request catch: ', error);
          });
      },
      gotoDetail() {
        console.log('test')
      },
      init() {
        
        let apiURL = `${process.env.VUE_APP_URL}api/users/membership_ids`;
        axios
          .get(apiURL)
          .then((res) => {
            this.membership_ids = res.data.data;
            console.log('membership_ids', this.membership_ids);
            this.getPages()
            this.getMembershipUrl()
          })
          .catch((error) => {
            console.log(error);
          });
      },
      getPages() {
        let apiURL = `${process.env.VUE_APP_URL}api/pagesetting/list`;
        axios
          .get(apiURL)
          .then((res) => {
            
            var pages = res.data
            var new_pages = []
            pages.forEach((page) => {
              var membership = []
              if (page.membership_setting) {
                var membership_setting = {}
                page.membership_setting.forEach((row) => {
                  membership_setting[row.name.toString()] = row.value
                })
                console.log('===membership_setting', membership_setting)
                var keys = Object.keys(membership_setting)
                console.log('=====  keys', keys)
                this.membership_ids.forEach((membership_id) => {
                  if (keys.includes( membership_id.toString() )) {
                    membership.push({'name': membership_id, 'value': membership_setting[membership_id.toString()]})
                  }
                  else {
                    membership.push({'name': membership_id, 'value': false})
                  }
                })
              }
              else {
                this.membership_ids.forEach((membership_id) => {                  
                    membership.push({'name': membership_id, 'value': false})                  
                })
              }

              var color = '#FFFFFF'
              if (page.color) {
                color = page.color
              }
              var page_item = {
                'name': page.name,
                'realname': page.realname,
                'setting': page.setting,
                'membership_setting': membership,
                'color': color
              }
              new_pages.push(page_item)
            })
            this.Pages = new_pages
            console.log('this.membership_ids', this.membership_ids)
            console.log('this.Pages', this.Pages)
            
          })
          .catch((error) => {
            console.log(error);
          });
      },
      getMembershipUrl() {
        let apiURL = `${process.env.VUE_APP_URL}api/pagesetting/membership_url`;
        axios
          .get(apiURL)
          .then((res) => {
            this.membership_pg_url = res.data[0].url;
            
            
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
</script>

<style>
.mt-auto {
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding-top: 20px
}
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
    width: 120px;
    height: 120px;
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
</style>