<template>
    <div>
        <div>
            <audio ref="goal_sound_on" src="../assets/goal_sound.mp3" preload="auto"></audio>        
        </div>
        <CCard>
            <CCardHeader>
                <CRow>
                    <CCol xs="12" sm="6" md="6" class="dashboard-logo-wrapper">
                        <label class="dashboard-logo">Dashboard</label>
                    </CCol>
                </CRow>
                <CRow class="mt-3">
                    <CCol xs="12" sm="12" md="5">
                        <div class="filter-container">
                            <label class="sub-title">
                                General Filters:
                            </label>
                            <div class="checkbox-group">
                                <div class="checkbox-sub-group">
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter1"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            1
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter2"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            x
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter3"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            2
                                        </template>
                                    </CInputCheckbox>
                                </div>
                                <div class="checkbox-sub-group">
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter4"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            O 0.5
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter5"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            O 1.5
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter6"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            O 2.5
                                        </template>
                                    </CInputCheckbox>
                                </div>
                                <div class="checkbox-sub-group">
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter7"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            U 2.5
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter8"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            U 3.5
                                        </template>
                                    </CInputCheckbox>
                                </div>
                                <div style="width: 25%; flex: 1; ">
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter9"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            Back
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter10"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            Lay
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter11"
                                    >
                                        <template #label>
                                            Double Tips
                                        </template>
                                    </CInputCheckbox>
                                </div>
                                <div style="width: 15%; flex: 1;">
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter12"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            Cup
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                                    @update:checked="select_filter13"
                                                    :checked = "true"
                                    >
                                        <template #label>
                                            Week
                                        </template>
                                    </CInputCheckbox>
                                </div>
                            </div>
                        </div>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                        <div class="filter-wrapper">
                            <label class="sub-title">Odd Filters:</label>
                            <div class="odd-filter">
                                <label>min:</label>
                                <CInput type="number" :value="this.oddMin" @update:value="odd_min" class="odd-filter-inputbox"></CInput>
                                <label>max:</label>
                                <CInput type="number" :value="this.oddMax" @update:value="odd_max" class="odd-filter-inputbox"></CInput>
                            </div>
                            <label class="sub-title mt-2">Matched Filters:</label>
                            <div class="matched-filter">
                                <label>min:</label>
                                <CInput type="number" :value="this.matchedMin" @update:value="matched_min" class="odd-filter-inputbox"></CInput>
                                <label>max:</label>
                                <CInput type="number" :value="this.matchedMax" @update:value="matched_max" class="odd-filter-inputbox"></CInput>
                            </div>
                        </div>
                    </CCol>
                    <CCol xs="12" sm="3" md="2">
                        <label style="color: red; font-weight: 600;">Commissions(%):</label>
                        <CInput
                                type="number"
                                @update:value = "commission"
                        ></CInput>
                    </CCol>
                    <CCol xs="12" sm="3" md="2">
                        <CButton color="success" class="dashboard-button" @click="eventClick" :value="'all'">Add all events</CButton>
                        <CButton color="success" class="dashboard-button" @click="eventClick" :value="'clear'">Clear</CButton>
                        <CButton color="success" class="dashboard-button" @click="eventClick" :value="'end'">Clear ended events</CButton>
                    </CCol>
                </CROW>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol md="12">
                        <DashboardTable
                            :eventLists3="eventLists3"
                            :competitionList="competitionList"
                            :mainList="mainList"
                            :eventLists="eventLists"
                            :prematchOddList="prematchOddList"
                            :eventFlag="eventFlag"
                            :clickEventValue="clickEventValue"
                            :bookmarkerFee="bookmarkerFee"
                            @sound="playSound"
                        >
                        </DashboardTable>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>

    import DashboardTable from "../components/DashboardTable";

    export default {
        name: 'NavDashboard',
        components: {
            DashboardTable
        },
        data () {
            return {
                bet_data:{
                    src: 'betfair.com',
                    date:'today'
                },
                select_odd_from : [
                    { value: 'betfair.com', label: 'Betfair.com' },
                    { value: 'betfair.it', label: 'Betfair.it' }
                ],
                data_load_date:[
                    { value: 'today', label: 'Today' },
                    { value: 'tomorrow', label: 'Tomorrow' },
                    { value: '2_days', label: 'In two days' },
                    { value: '3_days', label: 'In three days' }
                ],
                gameList:[
                    { value: '0', label: 'Select Prediction' },
                    { value: '1', label: '- X - Back' },
                    { value: '2', label: '- X - Lay' },
                    { value: '3', label: '- 1 - Lay' },
                    { value: '4', label: '- 2 - Lay' },
                    { value: '5', label: '- Over 0.5 Back' },
                    { value: '6', label: '- Over 1.5 Back' },
                    { value: '7', label: '- Under 2.5 Back' },
                    { value: '8', label: '- Over 2.5 Back' },
                    { value: '9', label: '- Under 3.5 Back' },

                ],
                gameList1:[],
                gameList2:[],
                mainList: [],
                eventLists: [],
                eventLists1: [],
                eventLists2: [],
                eventLists3: [],
                marketId: '',
                selectionId: 0,
                lay:'' ,
                back: '',
                total_matched: 0,
                back_matched: 0,
                lay_matched: 0,
                scoreOne: '',
                scoreTwo: '',
                status: '',
                timeRecord:'' ,
                eventId: 0,
                openDate: '',
                selectedArray: [],
                marketStatus: '',
                key:'',
                key1:'',
                predictionList:[],
                teamgroups1:[],
                teamgroups2:[],
                competitionList:[],
                competitionName:'Competition >> N/D',
                matchWidth: '50%',
                predictionWidth: 'block',
                filterQuery:['- 1 -','- X -','- 2 -','- Over 0.5','- Over 1.5','- Over 2.5','- Under 2.5','- Under 3.5'],
                cupList:['Cup','Copa','UEFA','Europa League','Champions League','Cupen','Coppa'],
                predictionList1:[],
                filterSection:['Back','Lay','Cup','Week'],
                cupFilter:true,
                weekFilter:true,
                backFilter:true,
                layFilter:true,
                doubleTips:false,
                oddMin:0,
                oddMax:100000,
                matchedMin:0,
                matchedMax:90000000,
                predictionStatus:true,
                oddUrl:"",
                eventName:"",
                selectedValue:"",
                prematchOddList:[],
                prematchOdd:0,
                calc_odd:0,
                calc_stake:0,
                max_profit:0,
                max_lose:0,
                percent_text1:'',
                percent_text2:'Insert Odd and Stake',
                guad_max:0,
                guad_att:0,
                percentTextColor:'#20a052',
                percentTextColor1:'#20a052',
                percentBackgroundColor:'#d8e4bc',
                percentBackgroundColor1:'#d8e4bc',
                currentPercent:0,
                adminTable: {},
                stopLoss:false,
                tradingMode:false,
                riskTrading:'easy',
                bookmarkerFee: 0,
                classic_match:'',
                low_cash: false,
                cash_out: true,
                high_cash: false,
                net_profit1: 0,
                net_profit2: 0,
                stakeCashout:0,
                eventFlag: false,
                clickEventValue: ''
            }
        },
        methods: {
            playSound() {
                this.$refs.goal_sound_on.play();
            },
            bet_date(){
                this.bet_data.date = 'today';
                var user_id = localStorage.getItem("user_id");
                console.log('user_id', user_id)
                if (user_id == 'undefined' || user_id == null) {
                    console.log('---- user id not found ---');
                    swal.fire("Alert!", "User not specified", "error");
                    return;
                }
                else {
                    console.log('---- user id  found ---');
                    
                }

                window.axios.post(`${process.env.VUE_APP_URL}from_betsrc`,[this.bet_data, user_id]).then(({data})=>{
                    this.eventLists[0] = {'value': '', 'label': 'Select Match'}
                    this.mainList = data.data[0]
                    this.teamgroups1 = data.data[1]
                    this.teamgroups2 = data.data[2]
                    this.competitionList = data.data[3]
                    this.adminTable = data.data[4]

                    let premarketArray = data.data[0]
                    let m_index = 0
                    for(let pp = 0 ; pp < premarketArray.length; pp++){
                        for(let uu = 0; uu < premarketArray[pp].markets.length; uu ++){
                            if(premarketArray[pp].markets[uu].prematchMarket){
                                m_index++
                                this.prematchOddList[m_index - 1] = premarketArray[pp].markets[uu].prematchMarket
                            }
                        }
                    }

                    let eventList0 = data.data[0]
                    let marketNode = []
                    let marketArray = []
                    let marketIds = []
                    let check = 0

                    for(let i = 0; i < eventList0.length ; i++){
                        let eventNode = eventList0[i]
                        if(eventNode.status == 'IN_PLAY'){
                            marketNode[i] = eventNode.openDate.substring(11, 16) + " >> " + eventNode.name + ' - Live'
                        }else{
                            marketNode[i] = eventNode.openDate.substring(11, 16) + " >> " + eventNode.name
                        }
                        let selectionNodes = []

                        for(let j = 0; j < eventNode.markets.length; j++){
                            let marketElement = eventNode.markets[j]
                            if(marketElement.marketType == 'MATCH_ODDS'){
                                check = check + 1
                                marketIds[0] = marketElement.marketId
                                selectionNodes[0] = marketElement.runners[0].selectionId
                                selectionNodes[1] = marketElement.runners[1].selectionId
                                selectionNodes[2] = marketElement.runners[2].selectionId
                            }else if(marketElement.marketType == 'OVER_UNDER_05'){
                                marketIds[1] = marketElement.marketId
                                selectionNodes[3] = marketElement.runners[1].selectionId
                            }else if(marketElement.marketType == 'OVER_UNDER_15'){
                                marketIds[2] = marketElement.marketId
                                selectionNodes[4] = marketElement.runners[1].selectionId
                            }else if(marketElement.marketType == 'OVER_UNDER_25'){
                                marketIds[3] = marketElement.marketId
                                selectionNodes[5] = marketElement.runners[0].selectionId
                                selectionNodes[6] = marketElement.runners[1].selectionId
                            }else if(marketElement.marketType == 'OVER_UNDER_35'){
                                marketIds[4] = marketElement.marketId
                                selectionNodes[7] = marketElement.runners[0].selectionId
                            }
                        }

                        let selectionString = selectionNodes[0]
                        for(let k = 1; k < 8; k++){
                            selectionString = selectionString + ',' + selectionNodes[k]
                        }

                        let marketString = marketIds[0]
                        for(let k = 1; k < 5; k++){
                            marketString = marketString + ',' + marketIds[k]
                        }

                        marketArray[i] = eventNode.eventId + ',' + marketString + ',' + selectionString
                        this.eventLists.push({'value': marketArray[i], 'label': marketNode[i]})
                    }
                    this.eventLists3 = this.eventLists
                    this.select_prediction(true)
                })

            },
            select_prediction(val){
                this.key1 = 0
                let eventList0 = this.mainList
                let marketNode1 = []
                let marketArray1 = []
                let index = 0
                this.eventLists[0] = {'value': '', 'label': 'Select Match'}
                this.predictionList[0] = {'value': '', 'label': 'Select Match'}
                let teamGroups = this.teamgroups2
                this.competitionName = 'Competition >> N/D'

                this.eventId = 0
                this.marketId =
                this.selectionId = 0
                this.lay =''
                this.lay_matched = 0
                this.back =''
                this.back_matched = 0
                this.total_matched = 0
                this.status =''
                this.scoreOne =''
                this.scoreTwo =''
                this.timeRecord =''

                for(let i = 0; i < eventList0.length ; i++){
                    let eventNode =  eventList0[i].name
                    let name1 = eventNode.split(' v ').splice(0,1).toString().trim()
                    let name2 = eventNode.split(' v ').splice(1,1).toString().trim()
                    let name11 =''
                    let name22 =''

                    let teamGroup1 = this.teamgroups1.filter(function(item) {
                        return item.betfair_com == name1;
                    });
                    if(teamGroup1.length > 0){
                        name11 = teamGroup1[0].statistic
                    }

                    let teamGroup2 = this.teamgroups1.filter(function(item) {
                        return item.betfair_com == name2;
                    });
                    if(teamGroup2.length > 0){
                        name22 = teamGroup2[0].statistic
                    }

                    for(let ii = 0 ;  ii < teamGroups.length ; ii++){
                        let groupAverage = 0
                        let groupSum = 0
                        for(let a = 0 ; a < teamGroups[ii].teamNames.length; a++){
                            groupSum = groupSum + parseInt(teamGroups[ii].teamNames[a].teamNo)
                        }
                        groupAverage = groupSum/teamGroups[ii].teamNames.length
                        for(let jj = 0 ; jj < teamGroups[ii].teamNames.length ; jj++){
                            if(teamGroups[ii].teamNames[jj].teamName == name1 || teamGroups[ii].teamNames[jj].teamName == name11){
                                let groupList = teamGroups[ii].groupName
                                let groupName = teamGroups[ii].groupName1
                                let marketType =  teamGroups[ii].marketType
                                let direction = teamGroups[ii].direction
                                let teamValue = teamGroups[ii].teamNames[jj].teamNo
                                if(groupList == '- Over 0.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 0.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 0.5 Back'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Over 1.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY') {
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 1.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 1.5 Back'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Under 2.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 2.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 2.5 Back'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Over 2.5 Back' && direction == 0 || groupList == '- Over 3.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 2.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 2.5 Back'
                                    }
                                    if(groupList == '- Over 3.5 Back' && direction == 0){
                                        marketType = 'OVER_UNDER_25'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Under 3.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 3.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 3.5 Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Lay' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 1){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 2){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Lay' && direction == 3){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Back' && direction == 3){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 1 - Lay' && direction == 3){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 2 - Lay' && direction == 3){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                            }
                            else if(teamGroups[ii].teamNames[jj].teamName == name2 || teamGroups[ii].teamNames[jj].teamName == name22){
                                let groupList = teamGroups[ii].groupName
                                let groupName = teamGroups[ii].groupName1
                                let marketType =  teamGroups[ii].marketType
                                let direction = teamGroups[ii].direction
                                let teamValue = teamGroups[ii].teamNames[jj].teamNo
                                if(groupList == '- Over 0.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 0.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 0.5 Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Over 1.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 1.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 1.5 Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Under 2.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 2.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 2.5 Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Over 2.5 Back' && direction == 0 || groupList == '- Over 3.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 2.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Over 2.5 Back'
                                    }
                                    if(groupList == '- Over 3.5 Back' && direction == 0){
                                        marketType = 'OVER_UNDER_25'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- Under 3.5 Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 3.5 Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - Under 3.5 Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Lay' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Back' && direction == 0){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 1){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 1 - Lay or - 2 Lay' && direction == 2){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Lay' && direction == 4){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Lay'
                                    }
                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- X - Back' && direction == 4){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - X - Back'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',2,' + groupAverage + ',' + teamValue + ',0'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 2 - Lay' && direction == 4){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] = eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 2 - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',1,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                                else if(groupList == '- 1 - Lay' && direction == 4){
                                    index += 1
                                    if(eventList0[i].status == 'IN_PLAY'){
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay' + ' - Live'
                                    }
                                    else{
                                        marketNode1[index] =eventList0[i].openDate.substring(11, 16) + ' >> ' + eventList0[i].name + ' - 1 - Lay'
                                    }

                                    marketArray1[index] = '0,' + eventList0[i].eventId + ',' + marketType + ',0,' + groupAverage + ',' + teamValue + ',1'+ ',' + groupName
                                    this.predictionList.push({'value': marketArray1[index], 'label': marketNode1[index]})
                                }
                            }
                        }
                    }
                }

                this.eventLists2 = []
                for(let i = 0 ; i < this.predictionList.length ; i++){
                    let check = 0
                    for(let j = 0 ; j < this.eventLists2.length ; j++){
                        if(this.predictionList[i].label == this.eventLists2[j].label){
                            check = 1
                        }
                    }
                    if(check == 0){
                        this.eventLists2.push({'value': this.predictionList[i].value, 'label': this.predictionList[i].label})
                    }
                }
                this.predictionList = this.eventLists2
                if(val == true){
                    this.eventLists3 = this.predictionList
                    this.gameList1 = this.gameList2
                    this.matchWidth = '83.333333333%'
                    this.predictionWidth = 'none'
                    this.filter1(this.filterQuery)
                    this.predictionStatus =  true
                }
                else{
                    this.eventLists3 = this.eventLists
                    this.gameList1 = this.gameList
                    this.matchWidth = '50%'
                    this.predictionWidth = 'block'
                    this.predictionStatus = false
                }
            },
            select_filter1(val){
                if(val == true){
                    this.filterQuery.push('- 1 -')
                }
                else{
                    let index = this.filterQuery.indexOf('- 1 -');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter2(val){
                if(val == true){
                    this.filterQuery.push('- X -')
                }
                else{
                    let index = this.filterQuery.indexOf('- X -');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter3(val){
                if(val == true){
                    this.filterQuery.push('- 2 -')
                }
                else{
                    let index = this.filterQuery.indexOf('- 2 -');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter4(val){
                if(val ==  true){
                    this.filterQuery.push('- Over 0.5')
                }
                else{
                    let index = this.filterQuery.indexOf('- Over 0.5');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter5(val){
                if(val == true){
                    this.filterQuery.push('- Over 1.5')
                }
                else{
                    let index = this.filterQuery.indexOf('- Over 1.5');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter6(val){
                if(val == true){
                    this.filterQuery.push('- Over 2.5')
                }
                else{
                    let index = this.filterQuery.indexOf('- Over 2.5');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter7(val){
                if(val == true){
                    this.filterQuery.push('- Under 2.5')
                }
                else{
                    let index = this.filterQuery.indexOf('- Under 2.5');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter8(val){
                if(val ==  true){
                    this.filterQuery.push('- Under 3.5')
                }
                else{
                    let index = this.filterQuery.indexOf('- Under 3.5');
                    if (index > -1) {
                        this.filterQuery.splice(index, 1);
                    }
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter9(val){
                if(val == true){
                    this.backFilter = true
                }
                else{
                    this.backFilter = false
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter10(val){
                if(val == true){
                    this.layFilter = true
                }
                else{
                    this.layFilter = false
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter11(val){
                if(val == true){
                    this.doubleTips = true
                }
                else{
                    this.doubleTips = false
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter12(val){
                if(val == true){
                    this.cupFilter = true
                }
                else{
                    this.cupFilter = false
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            select_filter13(val){
                if(val == true){
                    this.weekFilter = true
                }
                else{
                    this.weekFilter = false
                }
                if(this.predictionStatus ==  true){
                    this.filter1(this.filterQuery)
                }
            },
            filter1(filterArray){
                this.predictionList1 = []
                this.predictionList1[0] = {'value': '', 'label': 'Select Match'}

                if(filterArray.length < 1){
                    this.eventLists3 = this.predictionList1
                    return
                }
                else{
                    for(let j = 1 ; j < this.predictionList.length; j++){
                        let prediction = this.predictionList[j].label.toString()
                        let value = this.predictionList[j].value
                        for(let i = 0 ; i < filterArray.length; i++){
                            if(filterArray[i] == '- 1 -'){
                                if(prediction.includes('- 1 -') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- X -'){
                                if(prediction.includes('- X -') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- 2 -'){
                                if(prediction.includes('- 2 -') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- Over 0.5'){
                                if(prediction.includes('- Over 0.5') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- Over 1.5'){
                                if(prediction.includes('- Over 1.5') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- Over 2.5'){
                                if(prediction.includes('- Over 2.5') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- Under 2.5'){
                                if(prediction.includes('- Under 2.5') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                            else if(filterArray[i] == '- Under 3.5'){
                                if(prediction.includes('- Under 3.5') == true){
                                    this.predictionList1.push({'value': value, 'label':prediction})
                                }
                            }
                        }
                    }

                    if(this.backFilter == false){
                        let predictions =this.predictionList1.filter(function(item) {
                            return !item.label.includes('Back');
                        });
                        this.predictionList1 = predictions
                    }

                    if(this.layFilter == false){
                        let predictions =this.predictionList1.filter(function(item) {
                            return !item.label.includes('Lay');
                        });
                        this.predictionList1 = predictions
                    }

                    //---------excluded filter-------------

                    for(let i = 0; i < this.predictionList1.length ; i++){
                        if(this.predictionList1[i].value.split(',')[2] != 'MATCH_ODDS'){
                            let self = this
                            let predictions =this.predictionList1.filter(function(item) {
                                return item.value.split(',')[1] == self.predictionList1[i].value.split(',')[1] && item.value.split(',')[2] == self.predictionList1[i].value.split(',')[2];
                            });
                            if(predictions.length > 1){
                                for(let j = 0 ; j < predictions.length; j++){
                                    let index = this.predictionList1.indexOf(predictions[j]);
                                    if (index > -1) {
                                        i = i - 1
                                        this.predictionList1.splice(index, 1);
                                    }
                                }
                            }

                            let predictions1 =this.predictionList1.filter(function(item) {
                                return item.value.split(',')[1] == self.predictionList1[i].value.split(',')[1] && self.predictionList1[i].value.split(',')[2] != 'MATCH_ODDS';
                            });

                            let pp = 0
                            let pp1 = 0

                            for(let j = 0 ; j < predictions1.length ; j++){
                                if(predictions1[j].value.split(',')[2] == 'OVER_UNDER_35' && predictions1[j].value.split(',')[3] == '0'){
                                    pp = 1
                                }
                                if(predictions1[j].value.split(',')[2] == 'OVER_UNDER_25' && predictions1[j].value.split(',')[3] == '1'){
                                    pp1 = 1
                                }
                            }

                            if(pp == 1 && pp1 == 1){
                                for(let j = 0 ; j < predictions1.length ; j++) {
                                    if(predictions1[j].value.split(',')[2] == 'OVER_UNDER_25' || predictions1[j].value.split(',')[2] == 'OVER_UNDER_35'){
                                        let index = this.predictionList1.indexOf(predictions1[j]);
                                        if (index > -1) {
                                            i = i - 1
                                            this.predictionList1.splice(index, 1);
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            let self = this
                            let predictions =this.predictionList1.filter(function(item) {
                                return item.value.split(',')[1] == self.predictionList1[i].value.split(',')[1] && item.value.split(',')[2] == self.predictionList1[i].value.split(',')[2];
                            });
                            if(predictions.length > 1){
                                let check001 = 0
                                let check002 = 0
                                let check003 = 0
                                let check004 = 0
                                for(let c = 0 ; c < predictions.length ; c++){
                                    if(predictions[c].label.includes('1 - Lay')){
                                        check001 = 1
                                    }
                                    if(predictions[c].label.includes('2 - Lay')){
                                        check002 = 1
                                    }
                                    if(predictions[c].label.includes('X - Back')){
                                        check003 = 1
                                    }
                                    if(predictions[c].label.includes('X - Lay')){
                                        check004 = 1
                                    }
                                }
                                if((check001 === 1 && check002 === 1) || ((check003 === 1) && (check001 === 1 || check002 === 1)) || (check003 === 1 && check004 === 1)){
                                    for(let j = 0 ; j < predictions.length; j++){
                                        let index = this.predictionList1.indexOf(predictions[j]);
                                        if (index > -1) {
                                            i = i - 1
                                            this.predictionList1.splice(index, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    //-------------------------------------

                    if(this.cupFilter == false){
                        for(let i = 1 ; i < this.predictionList1.length; i++){
                            let p_value = this.predictionList1[i].value
                            let com_label = p_value.split(',')
                            let com_eventId =  com_label[1]
                            let competition = this.competitionList.filter(function(item) {
                                return item.eventId == com_eventId;
                            });

                            let competitionLabel = competition[0].competitions[0].name
                            let check = 0
                            for(let k = 0; k < this.cupList.length; k++){
                                if(competitionLabel.includes(this.cupList[k]) == true){
                                    check = 1
                                }
                            }

                            if(check == 1){
                                let index = this.predictionList1.indexOf(this.predictionList1[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionList1.splice(index, 1);
                                }
                            }

                        }
                    }

                    if(this.weekFilter ==  false){
                        // let predictions =this.predictionList1.filter(function(item) {
                        //     return parseInt(item.value.split(',')[5]) > parseInt(item.value.split(',')[4]);
                        // });

                        for(let n = 1 ; n < this.predictionList1.length ; n++){
                            let p_val = this.predictionList1[n].value.split(',')[7].trim()
                            let val1 = parseInt(this.predictionList1[n].value.split(',')[4])
                            let val2 = parseInt(this.predictionList1[n].value.split(',')[5])
                            if(p_val == 'Perde da' || p_val == 'Perde in casa da' || p_val == 'Pareggia fuori da'){
                                let index = this.predictionList1.indexOf(this.predictionList1[n]);
                                if (index > -1) {
                                    n = n - 1
                                    this.predictionList1.splice(index, 1);
                                }
                            }
                            else if(p_val != 'Non vince da' && p_val != 'Non pareggia da' && p_val != 'Non perde da' && p_val != 'Non perde in casa da' && p_val != 'Non vince fuori da' && p_val != 'Non pareggia fuori da'){
                                if(val1 > val2){
                                    let index = this.predictionList1.indexOf(this.predictionList1[n]);
                                    if (index > -1) {
                                        n = n - 1
                                        this.predictionList1.splice(index, 1);
                                    }
                                }
                            }
                            else{
                            }
                        }
                    }

                    if(this.doubleTips ==  false){
                        let eventArray = []
                        for(let d = 0 ; d < this.predictionList1.length; d++){
                            eventArray[d] = this.predictionList1[d].value.split(',')[1]
                        }
                        eventArray = Array.from(new Set (eventArray))

                        for(let d = 0 ; d < eventArray.length; d++){
                            let predictions = this.predictionList1.filter(function(item) {
                                return item.value.split(',')[1] == eventArray[d] && item.value.split(',')[2] == 'MATCH_ODDS';
                            });

                            if(predictions.length > 1){
                                let predictions1 = predictions.filter(function(item) {
                                    return item.value.split(',')[3] == '2';
                                });

                                if(predictions1.length > 0){
                                    for(let g = 0 ; g < predictions.length ; g++){
                                        if(predictions[g].value.split(',')[3] != '2'){
                                            let index = this.predictionList1.indexOf(predictions[g]);
                                            if (index > -1) {
                                                g = g - 1
                                                this.predictionList1.splice(index, 1);
                                            }
                                        }
                                    }
                                }

                                if(predictions.length > 1){
                                    let predictions1 = predictions.filter(function(item) {
                                        return item.value.split(',')[3] == '2' && item.value.split(',')[6] == '0';
                                    });
                                    if(predictions1.length > 0){
                                        for(let g = 0 ; g < predictions.length ; g++){
                                            if(predictions[g].label.includes('1 - Lay') == true || predictions[g].label.includes('2 - Lay') == true){
                                                let index = this.predictionList1.indexOf(predictions[g]);
                                                if (index > -1) {
                                                    g = g - 1
                                                    this.predictionList1.splice(index, 1);
                                                }
                                            }
                                        }
                                        let index = this.predictionList1.indexOf(predictions1[0]);
                                        if (index > -1) {
                                            this.predictionList1.splice(index, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if(this.doubleTips ==  true){
                        let eventArray = []
                        for(let d = 0 ; d < this.predictionList1.length; d++){
                            eventArray[d] = this.predictionList1[d].value.split(',')[1]
                        }
                        eventArray = Array.from(new Set (eventArray))

                        for(let d = 0 ; d < eventArray.length; d++){
                            let predictions = this.predictionList1.filter(function(item) {
                                return item.value.split(',')[1] == eventArray[d] && item.value.split(',')[2] == 'MATCH_ODDS';
                            });

                            if(predictions.length > 1){
                                let predictions1 = predictions.filter(function(item) {
                                    return item.value.split(',')[3] == '2' && item.value.split(',')[6] == '0';
                                });
                                if(predictions1.length > 0){
                                    for(let g = 0 ; g < predictions.length ; g++){
                                        if(predictions[g].label.includes('1 - Lay') == true || predictions[g].label.includes('2 - Lay') == true){
                                            let index = this.predictionList1.indexOf(predictions[g]);
                                            if (index > -1) {
                                                g = g - 1
                                                this.predictionList1.splice(index, 1);
                                            }
                                        }
                                    }
                                    let index = this.predictionList1.indexOf(predictions1[0]);
                                    if (index > -1) {
                                        this.predictionList1.splice(index, 1);
                                    }
                                }
                            }
                        }
                    }

                    if(this.predictionStatus == true){
                        //-----------------------total_matched_money--------------------------
                        for(let p = 1; p < this.predictionList1.length; p++){
                            let eventId = this.predictionList1[p].value.split(',')[1]
                            let marketType = this.predictionList1[p].value.split(',')[2]

                            let eventNode = this.mainList.filter(function(item) {
                                return item.eventId == eventId;
                            });

                            let marketNode = eventNode[0].markets.filter(function(item) {
                                return item.marketType == marketType;
                            });
                            if(marketNode.length > 0){
                                if(marketNode[0].totalMatched < this.matchedMin || marketNode[0].totalMatched > this.matchedMax){
                                    let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                    if (index > -1) {
                                        p = p - 1
                                        this.predictionList1.splice(index, 1);
                                    }
                                }
                            }
                            else{
                                // let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                // if (index > -1) {
                                //     p = p - 1
                                //     this.predictionList1.splice(index, 1);
                                // }
                            }
                        }
                        //---------------------------odd_filter----------------------------
                        for(let p = 1 ; p < this.predictionList1.length; p++){
                            let eventId = this.predictionList1[p].value.split(',')[1]
                            let marketType = this.predictionList1[p].value.split(',')[2]
                            let marketNo = parseInt(this.predictionList1[p].value.split(',')[3])
                            let runnerNo = parseInt(this.predictionList1[p].value.split(',')[6])
                            let predictionLabel = this.predictionList1[p].label

                            let eventNode = this.mainList.filter(function(item) {
                                return item.eventId == eventId;
                            });

                            let marketNode = eventNode[0].markets.filter(function(item) {
                                return item.marketType == marketType;
                            });
                            if(marketNode[0]){
                                if(!marketNode[0].runners){
                                    return
                                }

                                if(predictionLabel.includes(' - Live') == true){
                                    for(let h = 0  ; h < this.prematchOddList.length ;  h++){
                                        if(this.prematchOddList[h].marketId == marketNode[0].marketId){
                                            if(this.prematchOddList[h].runners[marketNo].exchange){
                                                if(runnerNo == '0'){
                                                    if(this.prematchOddList[h].runners[marketNo].exchange.availableToBack){
                                                        let backOdds = parseFloat(this.prematchOddList[h].runners[marketNo].exchange.availableToBack[0].price)
                                                        if(this.marketId == marketNode[0].marketId){
                                                            this.prematchOdd = backOdds
                                                        }
                                                        if(backOdds < parseFloat(this.oddMin) || backOdds > parseFloat(this.oddMax)){
                                                            let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                                            if (index > -1) {
                                                                p = p - 1
                                                                this.predictionList1.splice(index, 1);
                                                            }
                                                        }

                                                    }
                                                }
                                                else {
                                                    if(this.prematchOddList[h].runners[marketNo].exchange.availableToLay){
                                                        let layOdds = parseFloat(this.prematchOddList[h].runners[marketNo].exchange.availableToLay[0].price)
                                                        if(this.marketId == marketNode[0].marketId){
                                                            this.prematchOdd = layOdds
                                                        }
                                                        if(layOdds < parseFloat(this.oddMin) || layOdds > parseFloat(this.oddMax)){
                                                            let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                                            if (index > -1) {
                                                                p = p - 1
                                                                this.predictionList1.splice(index, 1);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else{
                                    if(marketNode[0].runners[marketNo].exchange){
                                        if(runnerNo == '0'){
                                            if(marketNode[0].runners[marketNo].exchange.availableToBack){
                                                let backOdds = parseFloat(marketNode[0].runners[marketNo].exchange.availableToBack[0].price)
                                                if(backOdds < parseFloat(this.oddMin) || backOdds > parseFloat(this.oddMax)){
                                                    let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                                    if (index > -1) {
                                                        p = p - 1
                                                        this.predictionList1.splice(index, 1);
                                                    }
                                                }

                                            }
                                        }
                                        else {
                                            if(marketNode[0].runners[marketNo].exchange.availableToLay){
                                                let layOdds = parseFloat(marketNode[0].runners[marketNo].exchange.availableToLay[0].price)
                                                if(layOdds < parseFloat(this.oddMin) || layOdds > parseFloat(this.oddMax)){
                                                    let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                                    if (index > -1) {
                                                        p = p - 1
                                                        this.predictionList1.splice(index, 1);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else{
                                let index = this.predictionList1.indexOf(this.predictionList1[p]);
                                if (index > -1) {
                                    p = p - 1
                                    this.predictionList1.splice(index, 1);
                                }
                            }
                        }



                        let checkSelect = 0;
                        for(let s = 0 ; s < this.predictionList1.length ; s++){
                            if(this.predictionList1[s].value == this.selectedValue){
                                checkSelect = 1
                            }
                        }
                        if(checkSelect == 0){
                            this.eventId = 0
                            this.marketId =
                                this.selectionId = 0
                            this.lay =
                                this.lay_matched = 0
                            this.back =
                                this.back_matched = 0
                            this.total_matched = 0
                            this.status =
                                this.scoreOne =
                                    this.scoreTwo =
                                        this.timeRecord =
                                            this.key1 = 0
                        }
                        this.eventLists3 = this.predictionList1
                    }
                }

            },
            odd_min(val){
                this.oddMin = val
                if(this.predictionStatus == true){
                    this.filter1(this.filterQuery)
                }
            },
            odd_max(val){
                this.oddMax = val
                if(this.predictionStatus == true){
                    this.filter1(this.filterQuery)
                }
            },
            matched_min(val){
                this.matchedMin = val
                if(this.predictionStatus == true){
                    this.filter1(this.filterQuery)
                }
            },
            matched_max(val){
                this.matchedMin = val
                if(this.predictionStatus == true){
                    this.filter1(this.filterQuery)
                }
            },
            eventClick(event){
                this.eventFlag = !this.eventFlag;
                this.clickEventValue = event.target.value;
            },
            commission(val){
                this.bookmarkerFee = Number(val)
            },
        },
        created() {
            this.bet_date();
            this.gameList1 = this.gameList
        }
    }
</script>

<style scoped>
    /* Dashboard Logo */
    .dashboard-logo-wrapper {
        min-width: 300px;
    }
    .dashboard-logo {
        width: 200px;
        display: initial;
        color: #ca2640;
        background-color: rgb(247, 205, 205);
        border: 1px solid red;
        text-align: center;
        font-weight: 500;
        font-size: 2.4em !important;
        margin: 0;
        padding: 0 30px;
    }
    
    /* Filter */
    /* Checkbox of Filter */
    .check-box {
        margin-bottom: 20px;
    }
    .checkbox-group {
        display: flex;
    }
    .checkbox-group .checkbox-sub-group {
        width: 20%;
        flex: 1;
        text-align: left;
    }
    .checkbox-sub-group label {
        align-self: center;
    }
    /* End Checkbox of Filter */
    /* Label */
    label.sub-title {
        color: red;
        font-weight: 600;
        display: block;
    }
    /* End Label */
    /* Input of Filter */
    .odd-filter, .matched-filter {
        display: inline-flex;
        align-items: center;
        justify-content: space-around;
    }
    .odd-filter .form-group, .matched-filter .form-group {
        margin: 0 5px;
    }
    .odd-filter label, .matched-filter label {
        margin: 0;
    }
    /* End Input of Filter */
    /* End Filter */
    
    /* Button */
    .dashboard-button {
        color: #2b2b2b;
        background-color: #e6eef5;
        border-color: #ebedef;
        width: 100%;
        min-width: 100px;
        margin-bottom: 12px!important;
    }
    /* End Button */
</style>

<style>
    .facile{
        float: left;
    }
    .table-cell input{
        max-width: 70px;
    }
    .table-cell{
        background: lightgoldenrodyellow;
        height: 50px;
        border-left: 1px solid lightgray;
    }
    .table td {
        padding: 5px;
    }
    .float-left{
        height: 35px;
    }
    .table th, .table td {
        border-top: 0px solid!important;
        border-bottom: 1px solid lightgray!important;
    }
    .table{
        margin-bottom: 0!important;
        border-bottom: none;
    }
    @media screen and (max-width: 600px) {
        .table-cell input{
            max-width: 44px;
        }
    }
</style>
