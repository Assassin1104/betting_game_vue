<template>
  <div>
    

    <div style="padding-top: 40px;">
      <div class="row justify-content-center" style="margin: 0px; margin-bottom: 30px;">
        <div class="col-md-10">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div style="display: flex">
                  <div>
                    <h3 style="font-family: fantasy; margin-bottom: 0px">User Settings</h3>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">         
        </div>
        <div class="col-md-4">         
          <form @submit.prevent="handleSubmitForm" class="">
            <div class="form-group ">
                <label style="float: left; margin-top: 6px; margin-right: 5px;">Default Bf com.</label>
                  <CInput type="number" min="0" max="90000000" class="odd-filter-inputbox" :value.sync="default_bf"></CInput>
                </div>
            <div class="form-group ">
                <b-form-checkbox  v-model="goal_sound" switch>
                  Goal sound
                </b-form-checkbox>
            </div>
            <div class="form-group ">
                <b-form-checkbox   v-model="alert_sound" switch>
                  New alert sound
                </b-form-checkbox>
            </div>

            <div class="form-group ">
                  <label style="float: left; margin-top: 6px; margin-right: 5px;">Currency</label>
                  <CSelect
                      :value.sync = "mycurrency"
                      :options= "currency_list"
                  >
                  </CSelect>
            </div>

            <div class="form-group ">
                  <label style="float: left; margin-top: 6px; margin-right: 5px;">Language</label>
                  <CSelect
                      :value.sync = "mylang"
                      :options = "lang_list"
                      @update:value = "changeLocale"

                  >
                  </CSelect>
            </div>
            <div class="form-group ">
                  <label style="float: left; margin-top: 6px; margin-right: 5px;">Timezone:</label>
                  <CSelect
                      :value.sync = "mytimezone"
                      :options = "timezone_list"                      
                  >
                  </CSelect>              
            </div>

            <div class="form-group mt-auto">
              <button class="btn m-btn-success">Update</button>
            </div>
          </form>
        </div>
        <div class="col-md-4">         
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from "vuex";
  import axios from "axios";
  import swal from "sweetalert2";
  import i18n from '@/plugins/i18n';
  export default {
    components: {
          i18n
      },
    data() {
      return {
        lang_list: [
            { value: 'en', language: 'en', label: 'English' },
            { value: 'es', language: 'es', label: 'Español' },
            { value: 'it', language: 'en', label: 'Italian' },
            { value: 'pt', language: 'en', label: 'Português' },
            { value: 'fr', language: 'en', label: 'Française' },
            { value: 'ru', language: 'en', label: 'Pусский' },
            { value: 'de', language: 'en', label: 'Deutsche' }
        ],
        goal_sound: true,
        alert_sound: true,
        Pages: [],
        default_bf: 0,
        mycurrency: 'Euro',
        mylang: 'en',
        mytimezone: 0,
        //lang_list: ['English', 'Spanish', 'Portuguese'],
        currency_list: [          
          "ALL" ,         
          "ANG" ,          
          "ARS" ,
          "AUD" ,
          "AWG" ,
          "AZN" ,
          "BAM" ,
          "BBD" ,          
          "BGN" ,          
          "BND" ,
          "BOB" ,
          "BRL" ,
          "BSD" ,
          "BTC" ,          
          "BWP" ,
          "BYN" ,
          "BYR" ,
          "BZD" ,
          "CAD" ,          
          "CHF" ,          
          "CLP" ,
          "CNY" ,
          "COP" ,
          "CRC" ,          
          "CUP" ,          
          "CZK" ,          
          "DKK" ,
          "DOP" ,          
          "EGP" , 
          "EUR" ,
          "FJD" ,
          "FKP" ,
          "GBP" ,
          "GIP" , 
          "GTQ" ,
          "GYD" ,
          "HKD" ,
          "HNL" ,
          "HRK" ,          
          "HUF" ,
          "IDR" ,
          "ILS" ,          
          "INR" ,          
          "ISK" ,          
          "JMD" ,          
          "JPY" ,
          "KES" ,
          "KGS" ,
          "KHR" ,          
          "KPW" ,
          "KRW" ,          
          "KYD" ,
          "KZT" ,
          "LAK" ,
          "LBP" ,
          "LKR" ,
          "LRD" ,
          "LVL" , 
          "MKD" ,          
          "MNT" ,            
          "MUR" ,           
          "MXN" ,
          "MYR" ,          
          "NAD" ,
          "NGN" ,
          "NIO" ,
          "NOK" ,
          "NPR" ,
          "NZD" ,          
          "PAB" ,
          "PEN" ,          
          "PHP" ,
          "PKR" ,
          "PLN" ,
          "PYG" ,          
          "RON" ,
          "RSD" ,
          "RUB" ,          
          "SBD" ,
          "SCR" ,          
          "SEK" ,
          "SGD" ,
          "SHP" ,          
          "SOS" ,
          "SRD" ,          
          "SYP" ,          
          "THB" ,          
          "TTD" ,
          "TWD" ,
          "TZS" ,
          "UAH" ,
          "UGX" ,
          "USD" ,
          "UYU" ,
          "UZS" ,          
          "VND" ,
          "XCD" ,
          "ZAR" 
        ],
        timezone_list: [
          {"value": -12, "label": "(GMT-12:00) International Date Line West"},
          {"value": -11, "label": "(GMT-11:00) Midway Island, Samoa"},
          {"value": -10, "label": "(GMT-10:00) Hawaii"},
          {"value": -9, "label": "(GMT-09:00) Alaska"},
          {"value": -8, "label": "(GMT-08:00) Pacific Time (US & Canada)"},
          {"value": -7, "label": "(GMT-07:00) Arizona"},
          {"value": -6, "label": "(GMT-06:00) Saskatchewan"},
          {"value": -5, "label": "(GMT-05:00) Indiana (East)"},
          {"value": -4, "label": "(GMT-04:00) Atlantic Time (Canada)"},
          {"value": -3, "label": "(GMT-03:00) Brasilia"},
          {"value": -2, "label": "(GMT-02:00) Mid-Atlantic"},
          {"value": -1, "label": "(GMT-01:00) Cape Verde Is."},
          {"value": 0, "label": "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"},
          {"value": 1, "label": "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"},
          {"value": 2, "label": "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>"},
          {"value": 3, "label": "(GMT+03:00) Moscow, St. Petersburg, Volgograd"},
          {"value": 4, "label": "(GMT+04:00) Abu Dhabi, Muscat"},
          {"value": 5, "label": "(GMT+05:00) Islamabad, Karachi, Tashkent"},
          {"value": 6, "label": "(GMT+06:30) Yangon (Rangoon)"},
          {"value": 7, "label": "(GMT+07:00) Bangkok, Hanoi, Jakarta"},
          {"value": 8, "label": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"},
          {"value": 9, "label": "(GMT+09:00) Osaka, Sapporo, Tokyo"},
          {"value": 10, "label": "(GMT+10:00) Canberra, Melbourne, Sydney"},
          {"value": 11, "label": "(GMT+11:00) Magadan, Solomon Is., New Caledonia"},
          {"value": 12, "label": "(GMT+12:00) Fiji, Kamchatka, Marshall Is"},
        ],
      }
    },
    created() {
       this.user_setting();
       this.lang_setting();

       
    },
    methods: {
      lang_setting() {
        i18n.locale = localStorage.getItem('lang');
      },
      changeLocale(locale) {
        console.log(locale)
        i18n.locale = locale;
        localStorage.setItem('lang', locale);
      },
      handleSubmitForm() {

        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");
        console.log(token);
        if(!token){
          this.$router.push("/pages/login")
        } else {
          
        }
    
        var default_bf = this.default_bf;

        var mycurrency = this.mycurrency;
        var mytimezone = this.mytimezone;
        var mylang = this.mylang;
        var goal_sound = this.goal_sound;
        var alert_sound = this.alert_sound;

        var post_data = {
          "user_id": user_id,
          "default_bf": default_bf,
          "mycurrency": mycurrency,
          "mytimezone": mytimezone,
          "mylang": mylang,
          "goal_sound": goal_sound,
          "alert_sound": alert_sound
        }

        let apiURL = `${process.env.VUE_APP_URL}usersetting`;

        axios
          .post(apiURL, post_data)
          .then((res) => {
            console.log(res.data)
            localStorage.setItem('lang', this.mylang)
            
            swal.fire("Success!", "Update User setting succesfully", "success");
            location.reload();
            
          })
                
          .catch((error) => {
            console.log('request catch: ', error);
          });


        console.log(mycurrency, mytimezone, mylang, goal_sound, alert_sound, default_bf);
        
        
      },
      user_setting() {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");
        console.log(token);
        if(!token){
          this.$router.push("/pages/login")
        } else {
          
        }
        var post_data = {
          "user_id": user_id          
        }

        let apiURL = `${process.env.VUE_APP_URL}get_usersetting`;

        axios
          .post(apiURL, post_data)
          .then((res) => {
            console.log(res.data.data.default_bf)
            if (res.data.data) {
              this.default_bf = res.data.data.default_bf;
              this.mycurrency = res.data.data.mycurrency;
              this.mytimezone = res.data.data.mytimezone;
              this.mylang = res.data.data.mylang;
              this.goal_sound = res.data.data.goal_sound;
              this.alert_sound = res.data.data.alert_sound;

            }
            
          })
                
          .catch((error) => {
            console.log('request catch: ', error);
          });
      },
      gotoDetail() {
        console.log('test')
      },
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