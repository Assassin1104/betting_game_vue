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
                    <h3 style="font-family: fantasy; margin-bottom: 0px">Money management</h3>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="handleSubmitForm" class="form-style">
                <div class="form-group mr20">
                  <label class="form-label">Insert a name</label>
                  <input type="text" class="form-control" v-model="money.name" placeholder="Management Name" required />
                </div>
                <div class="form-group mr20">
                  <label class="form-label">Starting Bank</label>
                  <input type="text" class="form-control" v-model="money.startingBank" placeholder="10000" required />
                </div>
                <div class="form-group mr20">
                  <label class="form-label">Target profit</label>
                  <input type="text" class="form-control" v-model="money.targetProfit" placeholder="10%" required />
                </div>
                <div class="form-group mr20">
                  <label class="form-label">Stop Losses</label>
                  <input type="text" class="form-control" v-model="money.stopLoss" placeholder="3%" required />
                </div>
                <div class="form-group mr20">
                  <label class="form-label">Currency</label>
                   <CSelect
                      :value.sync = "money.currency"
                      :options= "currency_list"
                  >
                  </CSelect>
                </div>
                <div class="form-group mr20 mt-auto">
                  <button class="m-btn m-btn-success">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="money-table">
        <div class="card">
          <div class="card-body">
            <div class="label_1">
              <label>Money manangement list:</label>
            </div>
            <div class="col-md-12">
              <table class="table table-striped" style="text-align: center; font-family:'Poppins', sans-serif">
                <thead class="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Starting Bank(€)</th>
                    <th>Target Profit(%)</th>
                    <th>Stop Loss(%)</th>
                    <th>P / L %</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="money in Moneys" :key="money._id">
                    <td>{{ money.name }}</td>
                    <td>{{ money.startingBank }}</td>
                    <td>{{ money.targetProfit }}</td>
                    <td>{{ money.stopLoss }}</td>
                    <td>{{ money.symbol }}{{money.profit}} / {{money.losses}}%</td>
                    <td>
                      <button @click.prevent="gotoDetail(money._id)" class="btn btn-success">View </button>
                      <button @click.prevent="deleteList(money._id)" class="btn btn-danger">Delete</button>
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
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      money: {
        name: "",
        startingBank: "",
        targetProfit: "",
        stopLoss: "",
        currency: "EUR"
      },
      Moneys: [],
      moneyId: "",
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
        currency_symbol_list: {
                    "ALL": {
                        "currencyName": "Albanian Lek",
                        "currencySymbol": "Lek",
                        "id": "ALL"
                    },
                    "XCD": {
                        "currencyName": "East Caribbean Dollar",
                        "currencySymbol": "$",
                        "id": "XCD"
                    },
                    "EUR": {
                        "currencyName": "Euro",
                        "currencySymbol": "€",
                        "id": "EUR"
                    },
                    "BBD": {
                        "currencyName": "Barbadian Dollar",
                        "currencySymbol": "$",
                        "id": "BBD"
                    },
                    "BTN": {
                        "currencyName": "Bhutanese Ngultrum",
                        "id": "BTN"
                    },
                    "BND": {
                        "currencyName": "Brunei Dollar",
                        "currencySymbol": "$",
                        "id": "BND"
                    },
                    
                    "CUP": {
                        "currencyName": "Cuban Peso",
                        "currencySymbol": "$",
                        "id": "CUP"
                    },
                    "USD": {
                        "currencyName": "United States Dollar",
                        "currencySymbol": "$",
                        "id": "USD"
                    },
                    "FKP": {
                        "currencyName": "Falkland Islands Pound",
                        "currencySymbol": "£",
                        "id": "FKP"
                    },
                    "GIP": {
                        "currencyName": "Gibraltar Pound",
                        "currencySymbol": "£",
                        "id": "GIP"
                    },
                    "HUF": {
                        "currencyName": "Hungarian Forint",
                        "currencySymbol": "Ft",
                        "id": "HUF"
                    },                    
                    "JMD": {
                        "currencyName": "Jamaican Dollar",
                        "currencySymbol": "J$",
                        "id": "JMD"
                    },
                    "AUD": {
                        "currencyName": "Australian Dollar",
                        "currencySymbol": "$",
                        "id": "AUD"
                    },
                    "LAK": {
                        "currencyName": "Lao Kip",
                        "currencySymbol": "₭",
                        "id": "LAK"
                    },
                    
                    "MKD": {
                        "currencyName": "Macedonian Denar",
                        "currencySymbol": "ден",
                        "id": "MKD"
                    },                    
                    "NZD": {
                        "currencyName": "New Zealand Dollar",
                        "currencySymbol": "$",
                        "id": "NZD"
                    },
                    "OMR": {
                        "currencyName": "Omani Rial",
                        "currencySymbol": "﷼",
                        "id": "OMR"
                    },
                    "PGK": {
                        "currencyName": "Papua New Guinean Kina",
                        "id": "PGK"
                    },
                    "RWF": {
                        "currencyName": "Rwandan Franc",
                        "id": "RWF"
                    },
                    "WST": {
                        "currencyName": "Samoan Tala",
                        "id": "WST"
                    },
                    "RSD": {
                        "currencyName": "Serbian Dinar",
                        "currencySymbol": "Дин.",
                        "id": "RSD"
                    },
                    "SEK": {
                        "currencyName": "Swedish Krona",
                        "currencySymbol": "kr",
                        "id": "SEK"
                    },
                    "TZS": {
                        "currencyName": "Tanzanian Shilling",
                        "currencySymbol": "TSh",
                        "id": "TZS"
                    },
                    "AMD": {
                        "currencyName": "Armenian Dram",
                        "id": "AMD"
                    },
                    "BSD": {
                        "currencyName": "Bahamian Dollar",
                        "currencySymbol": "$",
                        "id": "BSD"
                    },
                    "BAM": {
                        "currencyName": "Bosnia And Herzegovina Konvertibilna Marka",
                        "currencySymbol": "KM",
                        "id": "BAM"
                    },
                    "CVE": {
                        "currencyName": "Cape Verdean Escudo",
                        "id": "CVE"
                    },
                    "CNY": {
                        "currencyName": "Chinese Yuan",
                        "currencySymbol": "¥",
                        "id": "CNY"
                    },
                    "CRC": {
                        "currencyName": "Costa Rican Colon",
                        "currencySymbol": "₡",
                        "id": "CRC"
                    },
                    "CZK": {
                        "currencyName": "Czech Koruna",
                        "currencySymbol": "Kč",
                        "id": "CZK"
                    },
                    "ERN": {
                        "currencyName": "Eritrean Nakfa",
                        "id": "ERN"
                    },
                    "GEL": {
                        "currencyName": "Georgian Lari",
                        "id": "GEL"
                    },
                    "HTG": {
                        "currencyName": "Haitian Gourde",
                        "id": "HTG"
                    },
                    "INR": {
                        "currencyName": "Indian Rupee",
                        "currencySymbol": "₹",
                        "id": "INR"
                    },
                    "JOD": {
                        "currencyName": "Jordanian Dinar",
                        "id": "JOD"
                    },
                    "KRW": {
                        "currencyName": "South Korean Won",
                        "currencySymbol": "₩",
                        "id": "KRW"
                    },
                    "LBP": {
                        "currencyName": "Lebanese Lira",
                        "currencySymbol": "£",
                        "id": "LBP"
                    },
                    "MWK": {
                        "currencyName": "Malawian Kwacha",
                        "id": "MWK"
                    },
                    "MRO": {
                        "currencyName": "Mauritanian Ouguiya",
                        "id": "MRO"
                    },
                    "MZN": {
                        "currencyName": "Mozambican Metical",
                        "id": "MZN"
                    },
                    "ANG": {
                        "currencyName": "Netherlands Antillean Gulden",
                        "currencySymbol": "ƒ",
                        "id": "ANG"
                    },
                    "PEN": {
                        "currencyName": "Peruvian Nuevo Sol",
                        "currencySymbol": "S/.",
                        "id": "PEN"
                    },
                    "QAR": {
                        "currencyName": "Qatari Riyal",
                        "currencySymbol": "﷼",
                        "id": "QAR"
                    },
                    "STD": {
                        "currencyName": "Sao Tome And Principe Dobra",
                        "id": "STD"
                    },
                    "SLL": {
                        "currencyName": "Sierra Leonean Leone",
                        "id": "SLL"
                    },
                    "SOS": {
                        "currencyName": "Somali Shilling",
                        "currencySymbol": "S",
                        "id": "SOS"
                    },
                    "SDG": {
                        "currencyName": "Sudanese Pound",
                        "id": "SDG"
                    },
                    "SYP": {
                        "currencyName": "Syrian Pound",
                        "currencySymbol": "£",
                        "id": "SYP"
                    },
                    "AOA": {
                        "currencyName": "Angolan Kwanza",
                        "id": "AOA"
                    },
                    "AWG": {
                        "currencyName": "Aruban Florin",
                        "currencySymbol": "ƒ",
                        "id": "AWG"
                    },
                    "BHD": {
                        "currencyName": "Bahraini Dinar",
                        "id": "BHD"
                    },
                    "BZD": {
                        "currencyName": "Belize Dollar",
                        "currencySymbol": "BZ$",
                        "id": "BZD"
                    },
                    "BWP": {
                        "currencyName": "Botswana Pula",
                        "currencySymbol": "P",
                        "id": "BWP"
                    },
                    "BIF": {
                        "currencyName": "Burundi Franc",
                        "id": "BIF"
                    },
                    "KYD": {
                        "currencyName": "Cayman Islands Dollar",
                        "currencySymbol": "$",
                        "id": "KYD"
                    },
                    "COP": {
                        "currencyName": "Colombian Peso",
                        "currencySymbol": "$",
                        "id": "COP"
                    },
                    "DKK": {
                        "currencyName": "Danish Krone",
                        "currencySymbol": "kr",
                        "id": "DKK"
                    },
                    "GTQ": {
                        "currencyName": "Guatemalan Quetzal",
                        "currencySymbol": "Q",
                        "id": "GTQ"
                    },
                    "HNL": {
                        "currencyName": "Honduran Lempira",
                        "currencySymbol": "L",
                        "id": "HNL"
                    },
                    "IDR": {
                        "currencyName": "Indonesian Rupiah",
                        "currencySymbol": "Rp",
                        "id": "IDR"
                    },
                    "ILS": {
                        "currencyName": "Israeli New Sheqel",
                        "currencySymbol": "₪",
                        "id": "ILS"
                    },
                    "KZT": {
                        "currencyName": "Kazakhstani Tenge",
                        "currencySymbol": "лв",
                        "id": "KZT"
                    },
                    "KWD": {
                        "currencyName": "Kuwaiti Dinar",
                        "id": "KWD"
                    },
                    "LSL": {
                        "currencyName": "Lesotho Loti",
                        "id": "LSL"
                    },
                    "MYR": {
                        "currencyName": "Malaysian Ringgit",
                        "currencySymbol": "RM",
                        "id": "MYR"
                    },
                    "MUR": {
                        "currencyName": "Mauritian Rupee",
                        "currencySymbol": "₨",
                        "id": "MUR"
                    },
                    "MNT": {
                        "currencyName": "Mongolian Tugrik",
                        "currencySymbol": "₮",
                        "id": "MNT"
                    },
                    "MMK": {
                        "currencyName": "Myanma Kyat",
                        "id": "MMK"
                    },
                    "NGN": {
                        "currencyName": "Nigerian Naira",
                        "currencySymbol": "₦",
                        "id": "NGN"
                    },
                    "PAB": {
                        "currencyName": "Panamanian Balboa",
                        "currencySymbol": "B/.",
                        "id": "PAB"
                    },
                    "PHP": {
                        "currencyName": "Philippine Peso",
                        "currencySymbol": "₱",
                        "id": "PHP"
                    },
                    "RON": {
                        "currencyName": "Romanian Leu",
                        "currencySymbol": "lei",
                        "id": "RON"
                    },
                    "SAR": {
                        "currencyName": "Saudi Riyal",
                        "currencySymbol": "﷼",
                        "id": "SAR"
                    },
                    "SGD": {
                        "currencyName": "Singapore Dollar",
                        "currencySymbol": "$",
                        "id": "SGD"
                    },
                    "ZAR": {
                        "currencyName": "South African Rand",
                        "currencySymbol": "R",
                        "id": "ZAR"
                    },
                    "SRD": {
                        "currencyName": "Surinamese Dollar",
                        "currencySymbol": "$",
                        "id": "SRD"
                    },
                    "TWD": {
                        "currencyName": "New Taiwan Dollar",
                        "currencySymbol": "NT$",
                        "id": "TWD"
                    },
                    "TOP": {
                        "currencyName": "Paanga",
                        "id": "TOP"
                    },
                    "VEF": {
                        "currencyName": "Venezuelan Bolivar",
                        "id": "VEF"
                    },
                    "DZD": {
                        "currencyName": "Algerian Dinar",
                        "id": "DZD"
                    },
                    "ARS": {
                        "currencyName": "Argentine Peso",
                        "currencySymbol": "$",
                        "id": "ARS"
                    },
                    "AZN": {
                        "currencyName": "Azerbaijani Manat",
                        "currencySymbol": "ман",
                        "id": "AZN"
                    },
                    "BYR": {
                        "currencyName": "Belarusian Ruble",
                        "currencySymbol": "p.",
                        "id": "BYR"
                    },
                    "BOB": {
                        "currencyName": "Bolivian Boliviano",
                        "currencySymbol": "$b",
                        "id": "BOB"
                    },
                    "BGN": {
                        "currencyName": "Bulgarian Lev",
                        "currencySymbol": "лв",
                        "id": "BGN"
                    },
                    "CAD": {
                        "currencyName": "Canadian Dollar",
                        "currencySymbol": "$",
                        "id": "CAD"
                    },
                    "CLP": {
                        "currencyName": "Chilean Peso",
                        "currencySymbol": "$",
                        "id": "CLP"
                    },
                    "CDF": {
                        "currencyName": "Congolese Franc",
                        "id": "CDF"
                    },
                    "DOP": {
                        "currencyName": "Dominican Peso",
                        "currencySymbol": "RD$",
                        "id": "DOP"
                    },
                    "FJD": {
                        "currencyName": "Fijian Dollar",
                        "currencySymbol": "$",
                        "id": "FJD"
                    },
                    "GMD": {
                        "currencyName": "Gambian Dalasi",
                        "id": "GMD"
                    },
                    "GYD": {
                        "currencyName": "Guyanese Dollar",
                        "currencySymbol": "$",
                        "id": "GYD"
                    },
                    "ISK": {
                        "currencyName": "Icelandic Króna",
                        "currencySymbol": "kr",
                        "id": "ISK"
                    },
                    "IQD": {
                        "currencyName": "Iraqi Dinar",
                        "id": "IQD"
                    },
                    "JPY": {
                        "currencyName": "Japanese Yen",
                        "currencySymbol": "¥",
                        "id": "JPY"
                    },
                    "KPW": {
                        "currencyName": "North Korean Won",
                        "currencySymbol": "₩",
                        "id": "KPW"
                    },
                    "LVL": {
                        "currencyName": "Latvian Lats",
                        "currencySymbol": "Ls",
                        "id": "LVL"
                    },
                    "CHF": {
                        "currencyName": "Swiss Franc",
                        "currencySymbol": "Fr.",
                        "id": "CHF"
                    },
                    "MGA": {
                        "currencyName": "Malagasy Ariary",
                        "id": "MGA"
                    },
                    "MDL": {
                        "currencyName": "Moldovan Leu",
                        "id": "MDL"
                    },
                    "MAD": {
                        "currencyName": "Moroccan Dirham",
                        "id": "MAD"
                    },
                    "NPR": {
                        "currencyName": "Nepalese Rupee",
                        "currencySymbol": "₨",
                        "id": "NPR"
                    },
                    "NIO": {
                        "currencyName": "Nicaraguan Cordoba",
                        "currencySymbol": "C$",
                        "id": "NIO"
                    },
                    "PKR": {
                        "currencyName": "Pakistani Rupee",
                        "currencySymbol": "₨",
                        "id": "PKR"
                    },
                    "PYG": {
                        "currencyName": "Paraguayan Guarani",
                        "currencySymbol": "Gs",
                        "id": "PYG"
                    },
                    "SHP": {
                        "currencyName": "Saint Helena Pound",
                        "currencySymbol": "£",
                        "id": "SHP"
                    },
                    "SCR": {
                        "currencyName": "Seychellois Rupee",
                        "currencySymbol": "₨",
                        "id": "SCR"
                    },
                    "SBD": {
                        "currencyName": "Solomon Islands Dollar",
                        "currencySymbol": "$",
                        "id": "SBD"
                    },
                    "LKR": {
                        "currencyName": "Sri Lankan Rupee",
                        "currencySymbol": "₨",
                        "id": "LKR"
                    },
                    "THB": {
                        "currencyName": "Thai Baht",
                        "currencySymbol": "฿",
                        "id": "THB"
                    },
                    "TRY": {
                        "currencyName": "Turkish New Lira",
                        "id": "TRY"
                    },
                    "AED": {
                        "currencyName": "UAE Dirham",
                        "id": "AED"
                    },
                    "VUV": {
                        "currencyName": "Vanuatu Vatu",
                        "id": "VUV"
                    },
                    "YER": {
                        "currencyName": "Yemeni Rial",
                        "currencySymbol": "﷼",
                        "id": "YER"
                    },
                    "AFN": {
                        "currencyName": "Afghan Afghani",
                        "currencySymbol": "؋",
                        "id": "AFN"
                    },
                    "BDT": {
                        "currencyName": "Bangladeshi Taka",
                        "id": "BDT"
                    },
                    "BRL": {
                        "currencyName": "Brazilian Real",
                        "currencySymbol": "R$",
                        "id": "BRL"
                    },
                    "KHR": {
                        "currencyName": "Cambodian Riel",
                        "currencySymbol": "៛",
                        "id": "KHR"
                    },
                    "KMF": {
                        "currencyName": "Comorian Franc",
                        "id": "KMF"
                    },
                    "HRK": {
                        "currencyName": "Croatian Kuna",
                        "currencySymbol": "kn",
                        "id": "HRK"
                    },
                    "DJF": {
                        "currencyName": "Djiboutian Franc",
                        "id": "DJF"
                    },
                    "EGP": {
                        "currencyName": "Egyptian Pound",
                        "currencySymbol": "£",
                        "id": "EGP"
                    },
                    "ETB": {
                        "currencyName": "Ethiopian Birr",
                        "id": "ETB"
                    },
                    "XPF": {
                        "currencyName": "CFP Franc",
                        "id": "XPF"
                    },
                    "GHS": {
                        "currencyName": "Ghanaian Cedi",
                        "id": "GHS"
                    },
                    "GNF": {
                        "currencyName": "Guinean Franc",
                        "id": "GNF"
                    },
                    "HKD": {
                        "currencyName": "Hong Kong Dollar",
                        "currencySymbol": "$",
                        "id": "HKD"
                    },
                    "XDR": {
                        "currencyName": "Special Drawing Rights",
                        "id": "XDR"
                    },
                    "KES": {
                        "currencyName": "Kenyan Shilling",
                        "currencySymbol": "KSh",
                        "id": "KES"
                    },
                    "KGS": {
                        "currencyName": "Kyrgyzstani Som",
                        "currencySymbol": "лв",
                        "id": "KGS"
                    },
                    "LRD": {
                        "currencyName": "Liberian Dollar",
                        "currencySymbol": "$",
                        "id": "LRD"
                    },
                    "MOP": {
                        "currencyName": "Macanese Pataca",
                        "id": "MOP"
                    },
                    "MVR": {
                        "currencyName": "Maldivian Rufiyaa",
                        "id": "MVR"
                    },
                    "MXN": {
                        "currencyName": "Mexican Peso",
                        "currencySymbol": "$",
                        "id": "MXN"
                    },
                    "NAD": {
                        "currencyName": "Namibian Dollar",
                        "currencySymbol": "$",
                        "id": "NAD"
                    },
                    "NOK": {
                        "currencyName": "Norwegian Krone",
                        "currencySymbol": "kr",
                        "id": "NOK"
                    },
                    "PLN": {
                        "currencyName": "Polish Zloty",
                        "currencySymbol": "zł",
                        "id": "PLN"
                    },
                    "RUB": {
                        "currencyName": "Russian Ruble",
                        "currencySymbol": "руб",
                        "id": "RUB"
                    },
                    "SZL": {
                        "currencyName": "Swazi Lilangeni",
                        "id": "SZL"
                    },
                    "TJS": {
                        "currencyName": "Tajikistani Somoni",
                        "id": "TJS"
                    },
                    "TTD": {
                        "currencyName": "Trinidad and Tobago Dollar",
                        "currencySymbol": "TT$",
                        "id": "TTD"
                    },
                    "UGX": {
                        "currencyName": "Ugandan Shilling",
                        "currencySymbol": "USh",
                        "id": "UGX"
                    },
                    "UYU": {
                        "currencyName": "Uruguayan Peso",
                        "currencySymbol": "$U",
                        "id": "UYU"
                    },
                    "VND": {
                        "currencyName": "Vietnamese Dong",
                        "currencySymbol": "₫",
                        "id": "VND"
                    },
                    "TND": {
                        "currencyName": "Tunisian Dinar",
                        "id": "TND"
                    },
                    "UAH": {
                        "currencyName": "Ukrainian Hryvnia",
                        "currencySymbol": "₴",
                        "id": "UAH"
                    },
                    "UZS": {
                        "currencyName": "Uzbekistani Som",
                        "currencySymbol": "лв",
                        "id": "UZS"
                    },
                    "TMT": {
                        "currencyName": "Turkmenistan Manat",
                        "id": "TMT"
                    },
                    "GBP": {
                        "currencyName": "British Pound",
                        "currencySymbol": "£",
                        "id": "GBP"
                    },
                    "ZMW": {
                        "currencyName": "Zambian Kwacha",
                        "id": "ZMW"
                    },
                    "BTC": {
                        "currencyName": "Bitcoin",
                        "currencySymbol": "BTC",
                        "id": "BTC"
                    },
                    "BYN": {
                        "currencyName": "New Belarusian Ruble",
                        "currencySymbol": "p.",
                        "id": "BYN"
                    },
                    "BMD": {
                        "currencyName": "Bermudan Dollar",
                        "id": "BMD"
                    },
                    "GGP": {
                        "currencyName": "Guernsey Pound",
                        "id": "GGP"
                    },
                    "CLF": {
                        "currencyName": "Chilean Unit Of Account",
                        "id": "CLF"
                    },
                    "CUC": {
                        "currencyName": "Cuban Convertible Peso",
                        "id": "CUC"
                    },
                    "IMP": {
                        "currencyName": "Manx pound",
                        "id": "IMP"
                    },
                    "JEP": {
                        "currencyName": "Jersey Pound",
                        "id": "JEP"
                    },
                    "SVC": {
                        "currencyName": "Salvadoran Colón",
                        "id": "SVC"
                    },
                    "ZMK": {
                        "currencyName": "Old Zambian Kwacha",
                        "id": "ZMK"
                    },
                    "XAG": {
                        "currencyName": "Silver (troy ounce)",
                        "id": "XAG"
                    },
                    "ZWL": {
                        "currencyName": "Zimbabwean Dollar",
                        "id": "ZWL"
                    }   
                }
    };
  },
  created() {
    const username = localStorage.getItem("user");
    let apiURL = `${process.env.VUE_APP_URL}api/moneys/list/${username}`;
    axios
      .get(apiURL)
      .then((res) => {
        this.Moneys = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.authorize()
     
  },
  
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({
      token: "token",
    }),
  },
  methods: {
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
    handleSubmitForm() {
      const username = localStorage.getItem("user");
      let apiURL = `${process.env.VUE_APP_URL}api/moneys/searchName/${username}/${this.money.name}`;
      axios
        .get(apiURL)
        .then((res) => {
          console.log(res.data)
          // if (res.data == "") {
          //   swal.fire("Alert!", "This name is already existed. Please input another name", "error");
          // } else {
            let apiURL1 = `${process.env.VUE_APP_URL}api/moneys/createMoney/${username}`;
            axios
              .post(apiURL1, this.money)
              .then((res) => {
                swal.fire("Success!", "Create new money management data succesfully", "success");
                
                this.money.name = "";
                this.money.startingBank = "";
                this.money.targetProfit = "";
                this.money.stopLoss = "";

                let apiURL2 = `${process.env.VUE_APP_URL}api/moneys/list/${username}`;
                axios
                  .get(apiURL2)
                  .then((res) => {
                    this.Moneys = res.data;
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                this.moneyId = res.data._id;
                const bank = res.data.startingBank;
                const id = this.moneyId;
                const data = { id, bank };
                let detailURL = `${process.env.VUE_APP_URL}api/details/create`;
                axios
                  .post(detailURL, data)
                  .then(() => {})
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          // }
        })
        .catch((error) => {
          console.log('request catch: ', error);
        });
    },
    addDetail(id) {
      let indexOfArrayItem = this.Moneys.findIndex((i) => i._id === id);
      console.log(indexOfArrayItem);
      this.$router.push("/detail");
    },
    gotoDetail(id) {
      this.$router.push({ path: `/detail/${id}` });       
    },
    deleteList(id) {
      let apiURL = `${process.env.VUE_APP_URL}api/moneys/${id}`;
      let indexOfArrayItem = this.Moneys.findIndex((i) => i._id === id);
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
                this.Moneys.splice(indexOfArrayItem, 1);
                swal("Deleted!", "Your file has been deleted.", "success");
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
  },
};
</script>

<style scoped>
.m-btn {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  padding: 9px 40px;
  font-size: 0.875rem;
  border-width: 2px;
  border: none;
  position: relative;
  overflow: hidden;
  border-radius: 0.4285rem;
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
.btn-success {
  margin-right: 10px;
}
.form-control {
  color: #222a42;
  height: calc(2.25rem + 2px);
  border-color: rgba(29, 37, 59, 0.5);
  border-radius: 0.4285rem;
  font-size: 0.75rem;
  /* -webkit-transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out; */
  transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
}
</style>

<style>
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
.form-style {
  display: flex;
}
.form-label {
  color: #344675;
  font-size: 0.75rem;
  margin-bottom: 5px;
  font-family: "Poppins", sans-serif;
}


.money-table {
  width: 80%;
  margin: auto;
}
.table td,
.table th {
  padding: 0.75rem;
  vertical-align: middle;
  border-top: 1px solid #dee2e6;
}
.mr20 {
  width: 25%;
  margin-right: 20px;
}
.mt-auto {
  margin-top: auto;
  display: flex;
  justify-content: center;
}
.mb50 {
  margin-bottom: 50px;
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
}
</style>
