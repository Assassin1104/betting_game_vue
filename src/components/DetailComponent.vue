<template>
  <div style="padding-top: 40px; background: #f1f1f3">
    <div class="row justify-content-center" style="margin-bottom: 30px">
      <div class="col-md-11">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div style="display: flex">
                <div>
                  <h3 style="font-family: fantasy; margin-bottom: 0px">Money management detail: {{Moneys.name}}</h3>

                </div>
                <div style="margin: auto 0 auto auto;">
                  <router-link to="/money">Home</router-link> / 
                  <span>Detail</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12" style="display: flex; padding-left: 0px; padding-right: 0px;">
          <div class="col-md-3">
            <div class="card" >
              <div class="card-body">
                <div class="media">
                  <div class="media-left">
                    <span class="icoleaf bg-primary text-white">
                      <i class="fa fa-eur"></i>
                    </span>
                  </div>
                  <div class="media-body">
                    <h3 class="info-count text-blue">{{this.Moneys.startingBank}}</h3>
                    <p class="info-text font-12" style="margin-bottom: 0px;">Starting Bank</p>
                    <span class="hr-line"></span>
                    <p class="info-ot font-15" >
                      
                    </p>
                  </div>
                </div>
              </div>
            </div>   
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <div class="media">
                  <div class="media-left">
                    <span class="icoleaf bg-primary text-white">
                      <i class="fa fa-cart-plus"></i>
                    </span>
                  </div>
                  <div class="media-body">
                    <h3 class="info-count text-blue">{{this.Moneys.targetProfit}}</h3>
                    <p class="info-text font-12" style="margin-bottom: 0px;">Target Profit</p>
                    <span class="hr-line"></span>
                    <p v-if="total_today_profit >= 0" class="info-ot font-15" >
                      Today in profits

                      <span class="label label-rounded label-success">{{total_today_profit}}%</span>
                    </p>
                    <p v-else class="info-ot font-15" >
                      Today in profits

                      <span class="label label-rounded label-success">0.00%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div> 
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <div class="media">
                  <div class="media-left">
                    <span class="icoleaf bg-primary text-white">
                      <i class="fa fa-cart-arrow-down "></i>
                    </span>
                  </div>
                  <div class="media-body">
                    <h3 class="info-count text-blue">{{this.Moneys.stopLoss}}</h3>
                    <p class="info-text font-12" style="margin-bottom: 0px;">Daily stop losses</p>
                    <span class="hr-line"></span>
                    <p v-if="total_today_profit >= 0" class="info-ot font-15" >
                      Today losses
                      <span class="label label-rounded label-success">0.00%</span>
                    </p>
                    <p v-else class="info-ot font-15" >
                      Today losses

                      <span class="label label-rounded label-danger">{{total_today_profit}}%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div> 
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <div class="media">
                  <div class="media-left">
                    <span class="icoleaf bg-primary text-white">
                      <i class="fa fa-money"></i>
                    </span>
                  </div>
                  <div class="media-body">
                    <h3 class="info-count text-blue">{{Moneys.symbol}}{{recentCurrentBank}}</h3>
                    <p class="info-text font-12" style="margin-bottom: 0px;">Current Bank</p>
                    <span class="hr-line"></span>
                    <p v-if="recentProfitLoss[0] != '-'" class="info-ot font-15" >
                      Profit / Losses
                      <span class="label label-rounded label-success">{{Moneys.symbol}} {{recentProfitLoss}}</span>
                      <span class="label label-rounded label-success">{{recentPercentProfitLoss}} %</span>
                    </p>

                    <p v-else class="info-ot font-15" >
                      Profit / Losses
                      <span class="label label-rounded label-danger">{{Moneys.symbol}} {{recentProfitLoss}}</span>
                      <span class="label label-rounded label-danger">{{recentPercentProfitLoss}} %</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
      <div class="col-md-11">
        <div class="card">
          <div class="card-body">
            <div class="label_1">
              <label></label>
            </div>
            <div class="col-md-12">
              <table class="table table-striped" style="text-align: center; font-family: 'FontAwesome';">
                <thead class="thead-dark">
                  <tr>
                    <th></th>
                    <th>Trades in profits</th>
                    <th>Best profit</th>
                    <th>Trades losses</th>
                    <th>Worse loss</th>
                    <th>Today in profits</th>
                    <th>Today losses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="table_row_1" style="width: 25px;">n&#176;</td>
                    <td style="background-color: #7df795;">{{profit_number_N}}</td>
                    <td style="background-color: #7df795;">{{best_profit_N}}</td>
                    <td style="background-color: #ffbdbd;">{{loss_number_N}}</td>
                    <td style="background-color: #ffbdbd;">{{worse_loss_N}}</td>         
                    <td>{{today_profit_N}}</td>
                    <td>{{today_loss_N}}</td>
                  </tr>
                  <tr>
                    <td class="table_row_1">{{Moneys.currency}}</td>
                    <td style="background-color: #7df795;">{{total_profit_Eur}}</td>
                    <td style="background-color: #7df795;">{{max_profit_Eur}}</td>
                    <td style="background-color: #ffbdbd;">{{total_loss_Eur}}</td>
                    <td style="background-color: #ffbdbd;">{{max_loss_Eur}}</td>         
                    <td>{{total_today_profit}}</td>
                    <td>{{total_today_loss}}</td>
                  </tr>
                  <tr>
                    <td class="table_row_1">%</td>
                    <td style="background-color: #7df795;">{{percent_profit}}%</td>
                    <td style="background-color: #7df795;">{{percent_best_profit}}%</td>
                    <td style="background-color: #ffbdbd;">{{percent_loss}}%</td>
                    <td style="background-color: #ffbdbd;">{{percent_worse_loss}}%</td>         
                    <td>{{percent_today_profit}}%</td>
                    <td>{{percent_today_loss}}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="label_1">
            <label></label>
            </div>
            <div class="col-md-12">
              <CInputCheckbox class="check-box"
                  @update:checked="round_check"
                  :checked = "true"
              >
                  <template #label>
                      round stake values 0,50 multiple
                  </template>
              </CInputCheckbox>
              
            </div>
            <div class="label_1">
            <label></label>
            </div>
            <div class="col-md-12">
              <table class="table table-striped" style="text-align: center; font-family: 'FontAwesome';">
                <thead class="thead-dark">
                  <tr>
                    <th>Index</th>
                    <th>Events</th>
                    <th style="width: 100px;">Date</th>
                    <th style="width: 120px;">Current Bank({{Moneys.symbol}})</th>
                    <th>Stake (points)</th>
                    <th style="max-width: 60px;">Back/Lay</th>
                    <th style="width: 70px;">Odd</th>
                    <th style="max-width: 85px;">Stake ({{Moneys.symbol}}:{{Moneys.currency}})</th>
                    <th style="max-width: 110px;">Profit ({{Moneys.symbol}}:potential)</th>
                    <th style="max-width: 85px;">Risk({{Moneys.symbol}})</th>
                    <th style="width: 80px;">Real Profit({{Moneys.symbol}})</th>
                    <th style="max-width: 100px;">Balance({{Moneys.symbol}})</th>
                    <th style="width: 90px;">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(detail, index) in Details" :key="detail._id">
                    <td>{{index + 1}}</td>
                    <td class="table2_td" style="padding: 0em;">
                      <input type="text" class="form-control table2_form" style="font-size: 16px!important; height: calc(2.25rem + 14px); border: 0px; border-radius: 0px; text-align: center;" :id="detail._id" v-model="detail.events" v-on:change="changeEvent" required>
                    </td>
                    <td class="table2_td" style="padding: 0em;">
                      <input type="date" class="form-control table2_form" style="font-size: 16px!important; height: calc(2.25rem + 14px); border: 0px; border-radius: 0px; text-align: center;" :id="detail._id" v-model="detail.date" v-on:change="changeDate" required>
                    </td>
                    <td class="table2_td">{{detail.currentBank}}</td>
                    <td class="table2_td" style="padding: 0em; width: 70px;">
                      <select v-model="detail.stake_points" @change.prevent="changeStakePoints(detail._id, detail.backLay, detail.currentBank, detail.odd, detail.stake_points)" style="width: 100%; height: 50px; border-color: white;">
                        <option>0.25</option>
                        <option>0.5</option>
                        <option>0.75</option>
                        <option>1.00</option>
                        <option>1.25</option>
                        <option>1.5</option>
                        <option>1.75</option>
                        <option>2.00</option>
                      </select>
                    </td>
                    <td class="table2_td" style="padding: 0em;">
                      <select v-model="detail.backLay" @change.prevent="changeBackLay(detail._id, detail.backLay, detail.currentBank, detail.odd, detail.stake_points)" style="width: 100%; height: 50px; border-color: white;">
                        <option>Back</option>
                        <option>Lay</option>
                      </select>
                    </td>
                    <td class="table2_td" style="padding: 0em;">
                      <input type="number" class="form-control table2_form" style="font-size: 16px!important; height: calc(2.25rem + 14px); border: 0px; border-radius: 0px; text-align: center;" v-model="detail.odd" @change.prevent="changeOdd(detail._id, detail.backLay, detail.currentBank, detail.odd, detail.stake_points)" required>
                    </td>
                    <td class="table2_td" style="background-color: #ffbdbd;">
                      {{detail.stake_eur}}
                    </td>
                    <td class="table2_td">{{detail.profit}}</td>
                    <td class="table2_td">{{detail.risk}}</td>
                    <td class="table2_td" style="padding: 0em;">
                      <input v-if="detail.stake_points && detail.backLay && detail.odd" type="number" class="form-control table2_form" style="font-size: 16px!important; height: calc(2.25rem + 14px); border: 0px; border-radius: 0px; text-align: center;" v-model="detail.realProfit" @change.prevent="changeRealProfit(index, detail._id, detail.realProfit)" required>
                    </td>
                    <td class="table2_td">{{detail.balance}}</td>
                    <td style="padding: 5px; display: table-cell">
                      <!-- <button type="button" class="btn1 btn-outline-info" style="border-color: #17a2b8; margin-right: 5px;"><i class="fa fa-calculator" @click.prevent="calculate(index, detail._id, detail.backLay, detail.currentBank, detail.odd, detail.stake_points, detail.realProfit)"></i></button>   -->
                      <div style="display: flex">
                        <button type="button" class="btn1 btn-outline-info" style="margin-right: 5px; border-color: #17a2b8;" @click.prevent="createNewRecord(index, detail.currentBank, detail.realProfit, detail.date)">
                          <svg style="width: 23px; height: 23px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="42">
                            <polygon fill="var(--ci-primary-color, currentColor)" points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240" class="ci-primary"></polygon>'
                          </svg>
                        </button>
                        <button type="button" class="btn1 btn-outline-info" style="border-color: #17a2b8;" @click.prevent="deleteTable2List(index, detail._id)">
                          <svg style="width: 23px; height: 23px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="42">
                            <path fill="var(--ci-primary-color, currentColor)" d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z" class="ci-primary"></path>
                            <rect width="32" height="200" x="168" y="216" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
                            <rect width="32" height="200" x="240" y="216" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
                            <rect width="32" height="200" x="312" y="216" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
                            <path fill="var(--ci-primary-color, currentColor)" d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z" class="ci-primary"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import swal from "sweetalert2";

  export default {
    data() {
      return {
        money: {
          name: '',
          startingBank: '',
          targetProfit: '',
          stopLoss: '',
          currency: '',
          symbol: ''
        },
        Moneys: [],
        Details: [],
        bank:[],
        realProfit: [],
        stakeEur: [],
        balance: [],
        balance_before: [],
        profitPotential: [],
        risk: [],
        recentCurrentBank: [],
        recentProfitLoss: [],
        recentPercentProfitLoss: [],

        profit_number_N: [],
        best_profit_N: [],
        total_profit_Eur: [],
        max_profit_Eur: [],
        percent_profit: [],
        percent_best_profit: [],

        loss_number_N: [],
        worse_loss_N: [],
        total_loss_Eur: [],
        max_loss_Eur: [],
        percent_loss: [],
        percent_worse_loss: [],

        today_profit_N: [],
        today_loss_N: [],
        total_today_profit: [],
        total_today_loss: [],
        percent_today_profit: [],
        percent_today_loss: [],

        fMonth: [],
        stopLoss_state: [],
        total_today_profit: 0,
        round_flag: false
      }
    },
    created() {
      this.init()
      
    },
    methods: {
      round_check(val) {

        this.round_flag = val;
            
      },
      init() {
        this.authorize()
        let apiURL = `${process.env.VUE_APP_URL}api/moneys/list/searchbyId/${this.$route.params.id}` ;
        axios.post(apiURL).then(res => {
            console.log('====== money   ', res)
            this.Moneys = res.data[0];
            let detailURL = `${process.env.VUE_APP_URL}api/details/list/${this.$route.params.id}` ;
            axios.post(detailURL).then(res => {
              this.Details = res.data;
              console.log('----- this.Details', this.Details)

              this.calc_details()
              // All Table Data
              const data = this.Details.map((res) => res.realProfit)
              const resultMinus = [];
              const resultPlus = [];
              data.forEach((e) => {
                const minus = e.slice(0, 1);
                e = +e;
                if(minus == "-") {
                  resultMinus.push(e)
                } else if(minus != ""){
                  resultPlus.push(e)
                }
              });
              // Plus Data
              var sum_profit = resultPlus.reduce(function(a, b){
                return a + b;
              }, 0);
              this.total_profit_Eur = sum_profit.toFixed(2)
              if (resultPlus.length == 0)
                this.max_profit_Eur = '0.00'
              else
                this.max_profit_Eur = Math.max(...resultPlus);
              // Minus Data
              var sum_loss = resultMinus.reduce(function(a, b){
                return a + b;
              }, 0);
              this.total_loss_Eur = sum_loss.toFixed(2)

              if (resultMinus.length == 0)
                this.max_loss_Eur = '0.00'
              else
                this.max_loss_Eur = Math.min(...resultMinus);

              this.profit_number_N = resultPlus.length
              this.loss_number_N = resultMinus.length

              if(this.profit_number_N > 0) {
                this.best_profit_N = "1";
              } else if (this.profit_number_N < 1) {
                this.best_profit_N = "0";
              } else {
                return;
              }
              if(this.loss_number_N > 0) {
                this.worse_loss_N = "1";
              } else if (this.loss_number_N < 1) {
                this.worse_loss_N = "0";
              } else {
                return;
              }
              // Today Table Data
              const fYear = new Date().getFullYear();
              const fDay = ("0" + new Date().getDate()).slice(-2)

              const month_value = new Date().getMonth() + 1
              if(month_value < 10) {
                this.fMonth = "0" + month_value;
              } else if (month_value > 9){
                this.fMonth = month_value;
              } else {
                return;
              }
              
              const today = fYear + "-" + this.fMonth + "-" + fDay;
              console.log('---------today:', today)
              const resultTodayList = [];
              this.Details.forEach((e) => {
                if(e.date == today)
                  resultTodayList.push(e)
              })
              const todayData = resultTodayList.map((res) => res.realProfit)
              const resultTodayMinus = [];
              const resultTodayPlus = [];
              console.log('---------todayData', todayData )
              todayData.forEach((e) => {
                const minus = e.slice(0, 1);
                e = +e;
                if(minus == "-") {
                  resultTodayMinus.push(e)
                } else {
                  resultTodayPlus.push(e)
                }
              });
              this.today_profit_N = resultTodayPlus.length
              this.today_loss_N = resultTodayMinus.length
              // Today Profit Data
              var sum_today_profit = resultTodayPlus.reduce(function(a, b){
                return a + b;
              }, 0);
              this.total_today_profit = sum_today_profit.toFixed(2)
              // Today Loss Data
              var sum_today_loss = resultTodayMinus.reduce(function(a, b){
                return a + b;
              }, 0);
              this.total_today_loss = sum_today_loss.toFixed(2)
              // Percentage Data
              const starting_bank = this.Moneys.startingBank.slice(this.Moneys.symbol.length)


              const percent_profit = this.total_profit_Eur/starting_bank*100; 
              this.percent_profit = percent_profit.toFixed(2).toString().slice(0, 5)

              const percent_best_profit = this.max_profit_Eur/starting_bank*100;
              this.percent_best_profit = percent_best_profit.toFixed(2).toString().slice(0, 5)

              const percent_loss = this.total_loss_Eur/starting_bank*100;
              this.percent_loss = percent_loss.toFixed(2).toString().slice(0, 5);

              const percent_worse_loss = this.max_loss_Eur/starting_bank*100;
              this.percent_worse_loss = percent_worse_loss.toFixed(2).toString().slice(0, 6)

              const percent_today_profit = this.total_today_profit/starting_bank*100;
              this.percent_today_profit = percent_today_profit.toFixed(2).toString().slice(0, 5);

              const percent_today_loss = this.total_today_loss/starting_bank*100;
              this.percent_today_loss = percent_today_loss.toFixed(2).toString().slice(0, 6)
              console.log('this.Details[this.Details.length-1].currentBank.toString()', this.Details[this.Details.length-1].currentBank.toString())
              const recentCurrentBank = this.Details[this.Details.length-1].currentBank.toString().slice(this.Moneys.symbol.length);
              console.log('this.Details[this.Details.length-1].currentBank.toString()', recentCurrentBank)
              const recentRealProfit = this.Details[this.Details.length-1].realProfit;
              this.recentCurrentBank = Number(recentCurrentBank) + Number(recentRealProfit)

              //const recentProfitLoss = Number(this.total_profit_Eur) + Number(this.max_profit_Eur) + Number(this.total_loss_Eur) + Number(this.max_loss_Eur)
              const recentProfitLoss = Number(this.total_profit_Eur) + Number(this.total_loss_Eur)
              this.recentProfitLoss = recentProfitLoss.toFixed(2).toString().slice(0, 5)

              const recentPercentProfitLoss = recentProfitLoss/starting_bank*100
              this.recentPercentProfitLoss = recentPercentProfitLoss.toFixed(2).toString().slice(0, 5)
              this.total_today_profit = (percent_today_profit + percent_today_loss).toFixed(2)
              console.log(this.recentCurrentBank)
              this.updateProfitLosses()
            }).catch(error => {
                console.log(error)
            });
        }).catch(error => {
            console.log(error)
        });
      },
      calc_details() {
        for (var i = 0; i < this.Details.length; i++) {
          var row = this.Details[i];
          var currency = this.Moneys.symbol;
          if ( i == 0) {
            this.Details[i].balance = this.Details[i].realProfit
          }
          else {
            this.Details[i].balance = Number(this.Details[i-1].balance) + Number(this.Details[i].realProfit)
            this.Details[i].currentBank = currency + (Number(this.Details[i-1].currentBank.replace(currency, '')) + Number(this.Details[i-1].realProfit))
          }

        }
      },
      authorize() {
        const token = localStorage.getItem("token");
        console.log(token);
        if(!token){
          this.$router.push("/pages/login")
        } else {
          const response = fetch(`${process.env.VUE_APP_URL}api/users/authorize`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('response', response)
        }
      },
      updateProfitLosses() {
        let targetURL = `${process.env.VUE_APP_URL}api/moneys/updateProfitLosses/${this.$route.params.id}` ;
        var recentProfitLoss = this.recentProfitLoss
        var recentPercentProfitLoss = this.recentPercentProfitLoss
        const data = {recentProfitLoss, recentPercentProfitLoss}
        axios.post(targetURL, data).then(res => {
          console.log(res)
        }).catch(error => {
            console.log(error)
        });
      },
      // Update Event
      changeEvent(e) {
        const events = e.target.value
        const id = e.target.id
        let updateDetailURL = `${process.env.VUE_APP_URL}api/details/updateEvent`;
        const data = {id, events}
        axios.put(updateDetailURL, data).then(() => {
          console.log('Success')
        }).catch(error => {
          console.log(error)
        });
      },
      // Update Date
      changeDate(e) {
        const date = e.target.value
        const id = e.target.id
        let updateDetailURL = `${process.env.VUE_APP_URL}api/details/updateDate`;
        const data = {id, date}
        axios.put(updateDetailURL, data).then(() => {
          console.log('Success')
          this.init()
        }).catch(error => {
          console.log(error)
        });
      },
      // Update Back/Lay
      changeBackLay(id1, backLay_value, currentBank, odd, stake_points) {
        const backLay = backLay_value
        const id = id1
        let updateDetailURL = `${process.env.VUE_APP_URL}api/details/updateBackLay`;
        const data = {id, backLay}
        axios.put(updateDetailURL, data).then(() => {
          console.log('Success')
        }).catch(error => {
          console.log(error)
        });
        this.calculate1(id, backLay, currentBank, odd, stake_points)
      },
      // Update Stake(points)
      changeStakePoints(id1, backLay, currentBank, odd, stake_points) {
        const stake = stake_points
        const id = id1
        let updateDetailURL = `${process.env.VUE_APP_URL}api/details/updateStakePoints`;
        const data = {id, stake}
        axios.put(updateDetailURL, data).then(() => {
          console.log('Success')
        }).catch(error => {
          console.log(error)
        });
        this.calculate1(id, backLay, currentBank, odd, stake_points)
      },
      // Update Odd
      changeOdd(id1, backLay, currentBank, odd1, stake_points) {
        const odd = odd1
        const id = id1
        let updateDetailURL = `${process.env.VUE_APP_URL}api/details/updateOdd`;
        const data = {id, odd}
        axios.put(updateDetailURL, data).then(() => {
          console.log('Success')
        }).catch(error => {
          console.log(error)
        });
        this.calculate1(id, backLay, currentBank, odd, stake_points)
      },
      // Update Real Profit
      changeRealProfit(index, rowId, real_profit) {
        const realProfit = Number(real_profit).toFixed(2)
        const id = rowId
        let updateDetailURL = `${process.env.VUE_APP_URL}api/details/updateRealProfit`;
        const data = {id, realProfit}
        axios.put(updateDetailURL, data).then(() => {
          console.log('Success')
        }).catch(error => {
          console.log(error)
        });
        this.calculate2(index, id, realProfit)
        this.init()
      },
      calculate1(id, backLay, currentBank, odd, stake_points) {
        // Calculate Stake(Eur) Value
        if (backLay == "Lay") {
          const currentBank_value = currentBank.slice(this.Moneys.symbol.length)
          const stakeEur = ((odd/(odd-1))*stake_points*currentBank_value/100) - stake_points*currentBank_value/100;

          if (this.round_flag )
            this.stakeEur = (Math.round(stakeEur*2)/2).toFixed(2).toString()
          else
            this.stakeEur = stakeEur.toFixed(2).toString()
          this.profitPotential = this.stakeEur;
          const risk = stake_points*currentBank_value/100;
          this.risk = risk.toFixed(2).toString();

        } else if (backLay == "Back") {
          const currentBank_value = currentBank.slice(this.Moneys.symbol.length)
          const stakeEur = currentBank_value*stake_points/100;
          if (this.round_flag )
            var stakeEur_ = (Math.round(stakeEur*2)/2)
          else
            var stakeEur_ = stakeEur
          this.stakeEur = stakeEur_.toFixed(2).toString()
          const profit_potential = (stakeEur_*odd)-stakeEur_;
          this.profitPotential = profit_potential.toFixed(2).toString();
          const risk = stakeEur_;
          this.risk = risk.toFixed(2).toString();
        } else {
          return;
        }
        const stake_eur_value = this.stakeEur.slice(0, 5);
        const profit_potential_value = this.profitPotential.slice(0, 5);
        const risk_value = this.risk.slice(0, 5);
        const data1 = {id, stake_eur_value, profit_potential_value, risk_value}
        let updateDetailURL1 = `${process.env.VUE_APP_URL}api/details/addStakeEur`;
        axios.put(updateDetailURL1, data1).then(() => {
          let detailURL = `${process.env.VUE_APP_URL}api/details/list/${this.$route.params.id}`;
          axios.post(detailURL).then(res => {
              this.Details = res.data;
              this.calc_details()
          }).catch(error => {
              console.log(error)
          });
        }).catch(error => {
          console.log(error)
        });
      },
      calculate2(index, id, real_profit) {
        // Calculate Balance
        if(index == 0) {
          const balance = Number(real_profit);
          let updateDetailURL = `${process.env.VUE_APP_URL}api/details/addStakeEur`;
          const stake_eur_value = this.stakeEur.slice(0, 5);
          const profit_potential_value = this.profitPotential.slice(0, 5);
          const risk_value = this.risk.slice(0, 5);
          const data = {id, stake_eur_value, profit_potential_value, risk_value, balance}
          axios.put(updateDetailURL, data).then(() => {
            let detailURL = `${process.env.VUE_APP_URL}api/details/list/${this.$route.params.id}`;
            axios.post(detailURL).then(res => {
                this.Details = res.data;
                this.calc_details()
            }).catch(error => {
                console.log(error)
            });
          }).catch(error => {
            console.log(error)
          });
        } else {
          let detailURL = `${process.env.VUE_APP_URL}api/details/customlist/${this.$route.params.id}/${index}`;
          axios.post(detailURL).then(res => {
            const balance_before = res.data[0].balance
            const balance_value = Number(real_profit) + Number(balance_before)

            let updateDetailURL = `${process.env.VUE_APP_URL}api/details/addStakeEur`;
            const stake_eur_value = this.stakeEur.slice(0, 5);
            const profit_potential_value = this.profitPotential.slice(0, 5);
            const risk_value = this.risk.slice(0, 5);
            const balance = balance_value.toString().slice(0, 5);
            const data = {id, stake_eur_value, profit_potential_value, risk_value, balance}
            axios.put(updateDetailURL, data).then(() => {
              let detailURL = `${process.env.VUE_APP_URL}api/details/list/${this.$route.params.id}`;
              axios.post(detailURL).then(res => {
                  this.Details = res.data;
                  this.calc_details()
              }).catch(error => {
                  console.log(error)
              });
            }).catch(error => {
              console.log(error)
            });
          })
        }
      },
      createNewRecord(index, currentBank, realProfit, date) {
        if (date == '' || realProfit == '') {
          swal.fire("Alert!", "Pleaes fill out all information", "error");
          return
        }
        const sign = realProfit.slice(0, 1)
        const currentBank_value = currentBank.slice(this.Moneys.symbol.length)
        if(sign == "-") {
          const realProfit_value = realProfit.slice(1)
          this.bank = currentBank_value - realProfit_value
        } else {
          this.bank = Number(currentBank_value) + Number(realProfit);
        }
        const percent_today_loss_value = this.percent_today_loss
        const stopLoss = Number(percent_today_loss_value) +Number(this.percent_today_profit)
        const stopLoss_value = stopLoss
        const percent = this.Moneys.stopLoss.indexOf("%");
        const percent_stopLoss = -1 * Number(this.Moneys.stopLoss.toString().slice(0, percent))
        this.stopLoss_state == "enable";
        const bank = this.bank;
        const id = this.$route.params.id
        const index1 = index + 1;
        const index2 = index + 2;
        const symbol = this.Moneys.symbol;
        const data = { id, bank, index1, symbol}

        console.log('stopLoss_value', stopLoss_value)
        console.log('percent_stopLoss', percent_stopLoss)
        // let detailURL = `${process.env.VUE_APP_URL}api/details/customlist/${this.$route.params.id}/${index2}`;
        // axios.post(detailURL).then(res => {
        //   const result = res.data[0]
          if (index1 < this.Details.length) {
            swal.fire("Alert!", "You can't add new record", "error");
          }
          
          else if (stopLoss_value < percent_stopLoss) {
            swal.fire("Stop Loss!", "You can't add new record", "error");
          } else {
            let newRecordURL = `${process.env.VUE_APP_URL}api/details/createNewRecord`;
            axios
            .post(newRecordURL, data)
            .then(() => {
              let detailURL = `${process.env.VUE_APP_URL}api/details/list/${this.$route.params.id}`;
              axios.post(detailURL).then(res => {
                  this.Details = res.data;
                  this.calc_details()
              }).catch(error => {
                  console.log(error)
              });
            })
            .catch((error) => {
              console.log(error);
            });
          }
        // })
      },
      deleteTable2List(index, id) {
        if (index == 0) {
          swal.fire("Alert!", "Can not delete first row", "error");
          return
        }
        let apiURL = `${process.env.VUE_APP_URL}api/details/delete/${id}`;
        let indexOfArrayItem = this.Details.findIndex((i) => i._id === id);
        swal
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          })
          .then((result) => {
            if (result.value) {
              axios
                .delete(apiURL)
                .then(() => {
                  // this.Details.splice(indexOfArrayItem, 1);
                  this.init()
                  swal.fire("Deleted!", "This record has been deleted.", "success");
                  
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
      },
    }
  }
</script>

<style>
  .media {
    padding: 0;
    border: none;
    margin: 0;
  }
  .media-left {
    padding-right: 30px;
    display: table-cell;
    vertical-align: top;
  }
  .card {
    background: #ffffff;
    border: 0;
    position: relative;
    width: 100%;
    margin-bottom: 30px;
    -webkit-box-shadow: 0 1px 15px 0 rgb(123 123 123 / 5%);
    box-shadow: 0 1px 15px 0 rgb(123 123 123 / 5%);
  }
  .card-body {
    padding: 15px;
  }
  .icoleaf {
    display: inline-block;
    text-align: center;
    width: 50px;
    height: 50px;
    padding: 5px 12px;
    font-size: 28px;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
  }
  .bg-primary {
    background-color: #0283cc!important;
    color: #fff;
  }
  .text-white {
    color: #fff!important;
  }
  .media-body {
    display: table-cell;
    vertical-align: top;
    overflow: hidden;
    zoom: 1;
  }
  .info-count {
    font-size: 30px;
    margin-top: -5px;
    margin-bottom: 5px;
  }
  .text-blue {
    color: #0078bc!important;
  }
  .info-text {
    /* font-family: ; */
    text-transform: uppercase;
  }
  .font-12 {
    font-size: 12px!important;
  }
  .hr-line {
    display: inline-block;
    height: 3px;
    width: 90px;
    background-color: #e5ebec;
    /* margin: 16px 0; */
  }
  .info-ot {
    margin: 4px 0 0;
  }
  .font-15 {
    font-size: 15px!important;
  }
  .label {
    margin-left: 5px;
    font-size: 14px;
    border-radius: 4px;
    padding: 0 4px;
    color: #fff;
    min-width: 35px;
    height: 20px;
    font-weight: 600;
  }
  .label-success {
    background-color: #2ecc71;
  }
  .label-danger {
    background-color: #e74a25;
  }
  .table_1 {
    width: 80%;
    margin: auto;
  }
  .label_1 {
    text-align: left;
    margin-left: 12px;
    font-size: 20px;
    font-family: fantasy;
  }
  .table .thead-dark th {
    color: #fff;
    background-color: #687582;
    border-color: #687582;
    border-bottom: 0px
  }
  .table_row_1 {
    background: #687582;
    color: white;
    font-weight: 700;
  }
  .table2_td {
    padding: 0em;
    border-right: 1px solid #c0c3c5;
    border-left: 1px solid #c0c3c5;
  }
  .table2_form {
    background-color: #ece9cb;
    height: calc(1.5em + .75rem + 14px);
  }
  .btn1 {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.35rem 0.35rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
</style>