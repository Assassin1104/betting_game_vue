<template>
    <div  style="min-width: 800px; min-height: calc(100vh - 100px); padding: 20px;">
        <div class="warning">

        </div>
        <b-row>
            <b-col sm="6">
                <b-form-group>
                    <div style="position: relative; text-align: center;display: flex;flex-wrap: nowrap;">
                        <b-form-file v-model="file" ref="file-input" class="" placeholder="Drag file to upload or Select"
                                     style="flex: 1" v-on:input="readFile"></b-form-file>
                    </div>
                </b-form-group>
                <div style="padding: 10px;">
                    <div>Event Name: <label style="color: #3526b2">{{data1.eventName}}</label></div>
                    <div>Date: <label style="color: #3526b2">{{data.date}}</label></div>
                    <div>event Id: <label style="color: #3526b2">{{data1.eventId}}</label></div>
                    <div>Market Id: <label style="color: #3526b2">{{data1.marketId}}</label></div>
                    <div>Market Type: <label style="color: #3526b2">{{data1.marketType}}</label></div>
                    <div>League: <label style="color: #3526b2">{{data.league}}</label></div>
                </div>
                <div style="width: 127px; margin: auto;">
                    <CButton
                            color="info"
                            @click="sendData1"
                            class="submit-prediction"
                    >
                        Odds Upload
                    </CButton>
                </div>
            </b-col>
            <b-col sm="6">
                <div class="input-cell">
                    <label style="float: left; position: relative; top: 4px; margin-right: 37px;">Date:</label>
                    <CInput placeholder="YYYY-MM-DD" :value="data.date" @update:value="openDate" class="date-input"></CInput>
                </div>
                <div class="input-cell">
                    <label style="float: left; position: relative; top: 4px; margin-right: 10px;">Event Name:</label>
                    <CInput :value="data.eventName" @update:value="eventName" class="date-input date-input3"></CInput>
                </div>
                <div class="input-cell">
                    <label style="float: left; position: relative; top: 4px; margin-right: 21px;">League:</label>
                    <CInput placeholder="" :value="data.league" @update:value="league" class="date-input"></CInput>
                </div>
                <div class="input-cell">
                    <label style="float: left; position: relative; top: 4px; margin-right: 15px;">Event ID:</label>
                    <CInput type="number" placeholder="" :value="data.eventId" @update:value="eventId" class="date-input"></CInput>
                </div>
                <div class="input-cell">
                    <label style="float: left; position: relative; top: 4px; margin-right: 5px;">Market ID:</label>
                    <CInput placeholder="" :value="data.marketId" @update:value="marketId" class="date-input"></CInput>
                </div>
                <div class="input-cell">
                    <label style="float: left; position: relative; top: 4px; margin-right: 4px;">Runner ID:</label>
                    <CInput type="number" placeholder="" :value="data.runnerId" @update:value="runnerId" class="date-input"></CInput>
                </div>
                <div class="input-cell">
                    <label style="float: left; position: relative; top: 4px; margin-right: 4px;">Total Matched:</label>
                    <CInput type="number" placeholder="" @update:value="totalMatched" class="date-input2"></CInput>
                </div>
                <div class="input-cell">
                    <label style="float: left; position: relative; top: 4px; margin-right: 16px;">Prediction Type:</label>
                    <CSelect
                            :options="gameList"
                            @update:value="set_game"
                            class="date-input1"
                    >
                    </CSelect>
                </div>
                <div class="input-cell">
                    <label style="float: left; position: relative; top: 4px; margin-right: 28px;">Status:</label>
                    <CSelect
                            :options="status"
                            @update:value="set_status"
                            class="date-input"
                    >
                    </CSelect>
                </div>
                <div class="input-cell">
                    <label style="float: left; position: relative; top: -1px; margin-right: 32px;">Week:</label>
                    <CInputCheckbox
                            @update:checked="weekselector"
                            :checked = "false"
                            class="date-input"
                    >
                    </CInputCheckbox>
                </div>
                <div class="input-cell">
                    <div style="width: 157px; margin: auto;">
                        <CButton
                                color="info"
                                @click="sendData"
                                class="submit-prediction"
                        >
                            Prediction Upload
                        </CButton>
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col v-for="(item, index) in data1.marketsData" :key="index" sm="4" style="float: left; background: lightgoldenrodyellow; margin-top: 20px;">
                <div>Runnder Id: {{item.selectionId}}</div>
                <div v-for="(item1, index1) in item.markets_data" :key="index1">
                    <div>
                        time: <label style="color: red; margin: 0;">{{item1.minute}}'</label>, Back: <label style="color: blue; margin: 0;">{{item1.back}}</label>, Lay: <label style="color: red; margin: 0;">{{item1.lay}}</label>
                    </div>
                </div>
            </b-col>
        </b-row>

        <CToaster :autohide="3000">
            <template v-for="toast in fixedToasts">
                <CToast
                    :key="'toast' + toast"
                    :show="true"
                    color="success"
                    :style="{'background': toast_color.background, 'color':toast_color.color}"
                >
                    {{toast_text}}
                </CToast>
            </template>
        </CToaster>
    </div>
</template>
<script>
    export default {
        name: 'PredictionUpload',
        components: {
        },
        data () {
            return {
                collapse: false,
                data:{
                    "date": "",
                    "eventId": 0,
                    "eventName": "",
                    "marketId": "",
                    "runnerId": 0,
                    "total_matched": 0,
                    "game": "1",
                    "marketType": "- X - Back",
                    "predictionType": "MATCH_ODDS",
                    "league": "",
                    "week": 0,
                    "status": 0
                },
                gameList:[
                    { value: '1', label: '- X - Back' },
                    { value: '2', label: '- X - Lay' },
                    { value: '3', label: '- 1 - Lay' },
                    { value: '4', label: '- 2 - Lay' },
                    { value: '5', label: '- O 0.5 - Back' },
                    { value: '6', label: '- O 1.5 - Back' },
                    { value: '7', label: '- U 2.5 - Back' },
                    { value: '8', label: '- O 2.5 - Back' },
                    { value: '9', label: '- U 3.5 - Back' },

                ],
                status:[
                    { value: 0, label: 'General' },
                    { value: 1, label: 'DoubleTips' },
                    { value: 2, label: 'Forbidden' }
                ],
                fixedToasts: 0,
                toast_text:"",
                toast_color:{
                    "background":"",
                    "color":""
                },
                file: null,
                data1: {
                    marketsData: '',
                    finalData:'',
                    marketId: '',
                    eventId: '',
                    eventName: '',
                    marketType: ''
                },
                runnerId_set:[
                    {"value": "1", "label": 58805},
                    {"value": "2", "label": 58805},
                    {"value": "3", "label": 12562519},
                    {"value": "4", "label": 6242675},
                    {"value": "5", "label": 5851483},
                    {"value": "6", "label": 1221386},
                    {"value": "7", "label": 47972},
                    {"value": "8", "label": 47973},
                    {"value": "9", "label": 1222344},
                ],
                runnerIds: []
            }
        },
        methods: {
            readFile(evt) {
                let file = evt
                var loader = new FileReader();
                var vm = this;
                var eventId = ''
                loader.onload = function (loadEvent) {
                    if (loadEvent.target.readyState != 2)
                        return;
                    if (loadEvent.target.error) {
                        alert("Error while reading file " + file.name + ": " + loadEvent.target.error);
                        return;
                    }
                    function csvJSON(csv){
                        var lines = csv.split("\n");
                        console.log('==>', 'success-parsed!')
                        var eventId = 0
                        var eventName = ''
                        var marketId = 0
                        var marketType = ''
                        var runnerIds = []
                        var marketStartTime = ''
                        var marketEndTime = ''

                        let item = JSON.parse(lines[0])
                        // console.log(item, ' ,linesLength=>', lines.length)
                        let lastItem = JSON.parse(lines[lines.length - 2])
                        marketStartTime = lastItem.mc[0].marketDefinition.marketTime
                        marketEndTime = lastItem.mc[0].marketDefinition.settledTime
                        // console.log('lastItem=>', lastItem, marketStartTime, marketEndTime)
                        marketId = item.mc[0].id
                        eventId = item.mc[0].marketDefinition.eventId
                        eventName = item.mc[0].marketDefinition.eventName
                        marketType = item.mc[0].marketDefinition.marketType
                        for(let r = 0 ; r < item.mc[0].marketDefinition.runners.length ; r++){
                            runnerIds[r] = item.mc[0].marketDefinition.runners[r].id
                        }
                        vm.runnerIds = runnerIds
                        let market_array = []
                        for(let s = 0 ; s < runnerIds.length ; s++){
                            let markets = []
                            let check = 0
                            for(let i = 0; i < lines.length - 1; i++){
                                let item = JSON.parse(lines[i])
                                if(item.mc[0].marketDefinition){
                                    if(item.mc[0].marketDefinition.inPlay === true){
                                        check = 1
                                    }
                                }

                                if(item.mc[0].rc && check === 1){
                                    for(let ss = 0 ; ss < item.mc[0].rc.length ; ss++){
                                        if(item.mc[0].rc[ss].id === runnerIds[s] && item.mc[0].rc[ss].atb){
                                            markets.push({"pt": item.pt, "price": item.mc[0].rc[ss].atb[0][0], "id":item.mc[0].rc[ss].id})
                                        }
                                        else if(item.mc[0].rc[ss].id === runnerIds[s] && item.mc[0].rc[ss].ltp){
                                            markets.push({"pt": item.pt, "price": item.mc[0].rc[ss].ltp, "id":item.mc[0].rc[ss].id})
                                        }
                                    }
                                }
                            }
                            market_array.push({"runnerId": runnerIds[s], "markets": markets})
                        }

                        // console.log('Result=>', market_array)
                        let market_values = []
                        for(let i = 0 ; i < market_array.length ; i++){
                            let market_elem = []
                            let d1 = 0
                            for(let j = 0 ; j < market_array[i].markets.length - 1 ; j++) {
                                let marketDetail = market_array[i].markets[j]
                                let marketDetail1 = market_array[i].markets[j + 1]

                                if(j === 0){
                                    d1 = marketDetail.pt
                                }

                                var d = new Date(marketDetail.pt)
                                var event_d = new Date(marketStartTime).toISOString()
                                vm.data.date = event_d.substring(0,10)
                                console.log('d1+++++++++++++++++++++++++++++++++++++++++++', event_d.substring(0,10))
                                var diff = d - d1
                                var back = 0
                                var lay = 0

                                if (diff > 60e3){
                                    if(market_elem.length === 0){
                                        let price1 = marketDetail.price
                                        let price2 = marketDetail1.price
                                        if(price1 > price2){
                                            back = price2
                                            lay = price1
                                        }
                                        else{
                                            back = price1
                                            lay = price2
                                        }
                                        j = j + 2
                                        market_elem.push({'minute':Math.floor(diff / 60e3), 'back': back, 'lay': lay})
                                    }
                                    else if(Math.floor(diff / 60e3) > market_elem[market_elem.length - 1].minute){
                                        let price1 = marketDetail.price
                                        let price2 = marketDetail1.price
                                        if(price1 > price2){
                                            back = price2
                                            lay = price1
                                        }
                                        else{
                                            back = price1
                                            lay = price2
                                        }
                                        j = j + 2
                                        market_elem.push({'minute':Math.floor(diff / 60e3),  'back': back, 'lay': lay})
                                    }
                                }
                            }
                            market_values.push({"selectionId": market_array[i].runnerId, "markets_data": market_elem})
                        }
                        console.log(market_values)
                        // console.log('markets=>', marketId, eventId,eventName, marketType, runnerIds)
                        let market_values1 = []
                        for(let i = 0 ; i < market_values.length ; i++){
                            let markets1 = []
                            if(market_values[i].markets_data[0].minute > 1){
                                let elem1 = market_values[i].markets_data[0]
                                for(let k = 1 ; k < elem1.minute ; k++){
                                    markets1.push({"minute": k, "back": elem1.back, "lay": elem1.lay})
                                }
                            }
                            for(let j = 0 ; j < market_values[i].markets_data.length - 1 ; j++){
                                let elem1 = market_values[i].markets_data[j]
                                markets1.push(elem1)
                                let elem2 = market_values[i].markets_data[j + 1]
                                if(elem2.minute - elem1.minute > 1){
                                    for(let k = elem1.minute + 1 ; k < elem2.minute ; k++){
                                        markets1.push({"minute": k, "back": elem1.back, "lay": elem1.lay})
                                    }
                                }
                            }
                            market_values1.push({"selectionId": market_values[i].selectionId, "markets_data": markets1})
                        }
                        return [market_values1,marketId, eventId, eventName, marketType]; //JSON
                    }

                    let text = csvJSON(loadEvent.target.result)
                    let max = 0
                    let numbers = text[0].length
                    for(let i = 0 ; i < text[0].length ; i++){
                        let value = text[0][i].markets_data.length
                        if(value > max){
                            max = value
                        }
                    }
                    let market_final_data = []
                    for(let i = 0 ; i < max ; i++){
                        let runners = []
                        for(let j = 0 ; j < text[0].length ; j++){
                            let runnerId = text[0][j].selectionId
                            let runner = text[0][j].markets_data.filter(function(item) {
                                return item.minute === i + 1;
                            });
                            if(runner.length > 0){
                                runners.push({"selectionId": runnerId, "exchange": {"availableToBack":[{"price": runner[0].back, "size": 0}], "availableToLay":[{"price": runner[0].lay, "size": 0}]}})
                            }
                        }
                        market_final_data.push({"timeElapsed": i + 1, "elapsedRegularTime": i + 1, "runners": runners})
                    }

                    vm.data1.marketsData = text[0],
                    vm.data1.finalData = market_final_data
                    vm.data1.marketId = text[1]
                    vm.data1.eventId = text[2]
                    vm.data1.eventName = text[3]
                    vm.data1.marketType = text[4]
                    eventId = text[2]
                    vm.data.eventId = parseInt(text[2])
                    vm.data.marketId = text[1]
                    vm.data.eventName = text[3]

                    vm.getLeague(parseInt(eventId))
                    console.log('totalData=>', vm.data1)
                };
                loader.readAsText(file)

            },
            getLeague(val){
                console.log('eventId-check', val)
                window.axios.post(`${process.env.VUE_APP_URL}getLeague`,[val]).then(({data})=>{
                    if(data.message === "success"){
                        this.data.league = data.data[0]
                        this.data.date = data.data[1]
                    }
                    else{
                        // alert("can't find this event!")
                    }
                })
            },
            sendData1(){
                window.axios.post(`${process.env.VUE_APP_URL}saveHistoricalData`,[this.data1]).then(({data})=>{
                    console.log(data.message)
                    if(data.message == "success"){
                        this.toast_color.background = "#dff0d8"
                        this.toast_color.color = "#3c763d"
                        this.toast_text ="This Odds has been uploaded successfully."
                        this.addFixedToast()
                    }
                    else{
                        this.toast_color.background = "#f2dede"
                        this.toast_color.color = "#a94442"
                        this.toast_text="Sorry! Something Wrong!"
                        this.addFixedToast()
                    }
                })
            },
            openDate(val) {
                this.data.date = val
            },
            eventName(val) {
                this.data.eventName = val
            },
            eventId(val) {
                this.data.eventId = parseInt(val)
            },
            marketId(val) {
                this.data.marketId = val
            },
            runnerId(val) {
                this.data.runnerId = parseInt(val)
            },
            totalMatched(val){
                this.data.total_matched = parseInt(val)
            },
            league(val) {
                this.data.league = val
            },
            set_game(val){
                this.data.game = val
                let predictionType = this.gameList.filter(function(item) {
                    return item.value === val;
                });
                this.data.marketType = predictionType[0].label

                let runnerId = this.runnerId_set.filter(function(item) {
                    return item.value === val;
                });
                this.data.runnerId = parseInt(runnerId[0].label)
                if(val === '3' && this.data1.marketType === "MATCH_ODDS"){
                    this.data.runnerId = parseInt(this.runnerIds[0])
                }
                if(val === '4' && this.data1.marketType === "MATCH_ODDS"){
                    this.data.runnerId = parseInt(this.runnerIds[1])
                }
                if(parseInt(val) <= 4){
                    this.data.predictionType = "MATCH_ODDS"
                }
                else{
                    this.data.predictionType = ""
                }
                console.log('predictionValue=>', predictionType[0].label)
            },
            set_status(val){
                this.data.status = val
            },
            weekselector(val){
                if(val === true){
                    this.data.week = 1
                }
            },
            sendData(){
                if(this.data.date === "" || this.data.eventId === 0 || this.data.marketId === "" || this.data.runnerId === 0){
                    this.toast_color.background = "#f2dede"
                    this.toast_color.color = "#a94442"
                    this.toast_text="Sorry! something wrong."
                    this.addFixedToast()
                }
                else{
                    window.axios.post(`${process.env.VUE_APP_URL}savePredictionData`,[this.data]).then(({data})=>{
                        console.log(data.message)
                        if(data.message == "success"){
                            this.toast_color.background = "#dff0d8"
                            this.toast_color.color = "#3c763d"
                            this.toast_text ="This prediction has been uploaded successfully."
                            this.addFixedToast()
                        }
                        else{
                            this.toast_color.background = "#f2dede"
                            this.toast_color.color = "#a94442"
                            this.toast_text="Sorry! can't find this event on API."
                            this.addFixedToast()
                        }
                    })
                }
            },
            addFixedToast () {
                this.fixedToasts++
            }
        },
        created() {

        }
    }
</script>
<style scoped>
    .date-input3{
        width: 231px!important;
    }
    .input-cell{
        width: 360px;
    }
    .date-input{
        width: 250px;
        float: left;
        margin-bottom: 10px;
    }
    .date-input1{
        width: 205px;
        float: left;
        margin-bottom: 10px;
    }
    .submit-prediction{
        margin-top: 25px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .date-input2{
        width: 223px;
        margin-bottom: 10px;
        float: left;
    }
    .warning{
        width: 300px;
        height: 50px;
    }
</style>
