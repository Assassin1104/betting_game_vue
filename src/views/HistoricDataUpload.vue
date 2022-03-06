<template>
    <div  style="min-width: 800px; min-height: calc(100vh - 100px)">
        <CCard body-wrapper>
            <b-form-group>
                <div style="position: relative; text-align: center;display: flex;flex-wrap: nowrap;">
                    <b-form-file v-model="file" ref="file-input" class="" placeholder="Drag file to upload or Select"
                                 style="flex: 1" v-on:input="readFile"></b-form-file>
                    <b-button style="z-index: 1;" type="submit" variant="primary" @click="sendData" size="sm">Submit</b-button>
                </div>
            </b-form-group>
            <div style="padding: 10px;">
                <div>event Name: <label style="color: #3526b2">{{data.eventName}}</label></div>
                <div>event Id: <label style="color: #3526b2">{{data.eventId}}</label></div>
                <div>Market Id: <label style="color: #3526b2">{{data.marketId}}</label></div>
                <div>Market Type: <label style="color: #3526b2">{{data.marketType}}</label></div>
            </div>
<!--            <b-button variant="success" @click="makeToast('success')" class="mb-2">Success</b-button>-->
            <b-row>
                <b-col v-for="(item, index) in data.marketsData" :key="index" sm="4" style="float: left; background: lightgoldenrodyellow;">
                    <div>Runnder Id: {{item.selectionId}}</div>
                    <div v-for="(item1, index1) in item.markets_data" :key="index1">
                        <div>
                            time: <label style="color: red; margin: 0;">{{item1.minute}}'</label>, Back: <label style="color: blue; margin: 0;">{{item1.back}}</label>, Lay: <label style="color: red; margin: 0;">{{item1.lay}}</label>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </CCard>
    </div>
</template>
<script>
    export default {
        name: 'HistoricDataUpload',
        components: {
        },
        data () {
            return {
                collapse: false,
                file: null,
                marketData:{

                },
                data: {
                    marketsData: '',
                    finalData:'',
                    marketId: '',
                    eventId: '',
                    eventName: '',
                    marketType: ''
                }
            }
        },
        methods: {
            readFile(evt) {
                //console.log(evt.target.files)
                let file = evt
                var loader = new FileReader();
                var vm = this;
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
                                // var d1 = new Date(marketStartTime)
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

                    vm.data.marketsData = text[0],
                    vm.data.finalData = market_final_data
                    vm.data.marketId = text[1]
                    vm.data.eventId = text[2]
                    vm.data.eventName = text[3]
                    vm.data.marketType = text[4]
                    console.log('totalData=>', vm.data)
                };
                loader.readAsText(file)
            },
            sendData1(){
                window.axios.post(`${process.env.VUE_APP_URL}saveHistoricalData`,[this.data]).then(({data})=>{
                    console.log(data.message)
                    if(data.message == "success"){
                        console.log('toast!')
                        // this.makeToast('success')
                        alert("sucessfully parsed!")
                    }
                    else{
                        // this.makeToast('warning')
                        alert("sorry, something wrong.")
                    }
                })
            },
            makeToast(variant = null) {
                this.$bvToast.toast('Toast body content', {
                    title: `Variant ${variant || 'default'}`,
                    variant: variant,
                    solid: true
                })
            }
        },
        created() {

        }
    }
</script>
<style scoped>
    .card{
        min-height: calc( 100vh - 80px);
    }
</style>
