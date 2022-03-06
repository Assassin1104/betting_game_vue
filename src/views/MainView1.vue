<template>
    <div>
        <CCard>
            <CCardHeader>
                <img src="/img/betlogo.png" width="200px;"/>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol lg="6">
                        <label>Match</label>
                        <div class="match-container">
                            <CRow>
                                <CCol sm="5">
                                    <label style="color: red; font-weight: 600;">Select Match({{this.eventLists3.length}})</label>
                                    <CSelect
                                            :options="eventLists3"
                                            @update:value="select_match"
                                    >
                                    </CSelect>
                                    <p style="text-align: center; margin-bottom: 8px;">Competition >> N/D</p>
                                </CCol>
                                <CCol sm="3">
                                    <div style="margin-bottom: 40px;">
                                        <label style="color: red; font-weight: 600;">All Games:</label>
                                        <CInputCheckbox class="check-box"
                                                        @update:checked="select_prediction"
                                        >
                                        </CInputCheckbox>
                                    </div>
                                </CCol>
                                <CCol sm="6">
                                    <label style="color: red; font-weight: 600;">Score:</label>
                                    <div style="background: #20a052;
                                            text-align: center;
                                            font-weight: 600;
                                            color: #fff;
                                            height: 30px;
                                            padding-top: 2px;
                                            border: 1px solid white;
                                            ">
                                        {{this.status}} {{this.timeRecord}}
                                    </div>
                                    <div style="background: #4db375;
                                    font-size: 25px;
                                    text-align: center;
                                    font-weight: 600;
                                    margin-bottom: 10px;
                                    padding: 5px;
                                    color: white;
                                    height: 60px;
                                    border: 1px solid white;
                                    border-top: none;
                                    ">
                                        <p :v-if="this.scoreOne">
                                            {{this.scoreOne}}  {{this.scoreTwo}}
                                        </p>

                                    </div>
                                    <label style="color: red; font-weight: 600;">
                                        Notifications:
                                    </label>
                                    <div style="background: #f4e7e9; height: 55px; border-radius: 3px;">

                                    </div>
                                </CCol>
                                <CCol sm="6">
                                    <CRow>
                                        <CCol sm="6" >
                                            <label style="color: red; font-weight: 600;">Odds:</label>
                                            <div style="width: 100%;
                                                        display: flex;
                                                        background: #a6d8ff;
                                                        text-align: center;
                                                        height: 30px;
                                                        padding: 5px;
                                                        border: 1px solid white;
                                                ">
                                                <p style="margin-bottom: 0; text-align: center; width: 100%; font-weight: 600">Back</p>
                                            </div>
                                            <div style="display: flex;
                                                        width: 100%;
                                                        background: #e0f1ff;
                                                        text-align: center;
                                                        padding: 5px;
                                                        height: 30px;
                                                        border: 1px solid white;
                                                        border-top: none;
                                                ">
                                                <p style="margin-bottom: 0; text-align: center; width: 100%; height: 20px; font-weight: 600">
                                                    {{this.back}}
                                                </p>
                                            </div>
                                            <div style="display: flex;
                                                        width: 100%;
                                                        background: #e0f1ff;
                                                        text-align: center;
                                                        padding: 5px;
                                                        height: 30px;
                                                        border: 1px solid white;
                                                        border-top: none;
                                                ">
                                                <p style="margin-bottom: 0; text-align: center; width: 100%; height: 20px;">
                                                    &euro;{{this.back_matched}}
                                                </p>
                                            </div>
                                            <p style="text-align: center; width: 100%; min-width: 100px; font-weight: 600;">Total Matched</p>
                                            <CButton
                                                    color="info"
                                                    class="refresh-btn"
                                            >
                                                Start/Refresh
                                            </CButton>
                                        </CCol>
                                        <CCol sm="6" >
                                            <label style="color: white">Odds:</label>
                                            <div style="width: 100%;
                                                        display: flex;
                                                        background: #fac9d1;
                                                        text-align: center;
                                                        height: 30px;
                                                        border: 1px solid white;
                                                        padding: 5px;">
                                                <p style="margin-bottom: 0; text-align: center; width: 100%; font-weight: 600">Lay</p>
                                            </div>
                                            <div style="display: flex;
                                                        width: 100%;
                                                        background: #fdecef;
                                                        text-align: center;
                                                        height: 30px;
                                                        border: 1px solid white;
                                                        border-top: none;
                                                        padding: 5px;">
                                                <p style="margin-bottom: 0; text-align: center; width: 100%; height: 20px; font-weight: 600">
                                                    {{this.lay}}
                                                </p>
                                            </div>
                                            <div style="display: flex;
                                                        width: 100%;
                                                        background: #fdecef;
                                                        text-align: center;
                                                        height: 30px;
                                                        border: 1px solid white;
                                                        border-top: none;
                                                        padding: 5px;">
                                                <p style="margin-bottom: 0; text-align: center; width: 100%; height: 20px;">
                                                    &euro;{{this.lay_matched}}
                                                </p>
                                            </div>
                                            <p style="text-align: center; width: 90%; font-weight: 600;">&euro;{{this.total_matched}}</p>
                                            <CButton
                                                    color="info"
                                                    class="stop-btn"
                                            >
                                                Stop
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </div>
                    </CCol>
                    <CCol lg="4">
                        <label>Filter</label>
                        <div class="filter-container">
                            <label style="color: red; font-weight: 600;">
                                General Filters:
                            </label>
                            <div style="display: flex; margin-bottom: 20px;">
                                <div style="width: 20%; flex: 1; text-align: center">
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            1
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            x
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            2
                                        </template>
                                    </CInputCheckbox>
                                </div>
                                <div style="width: 20%; flex: 1; text-align: center">
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            O 0.5
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            O 1.5
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            O 2.5
                                        </template>
                                    </CInputCheckbox>
                                </div>
                                <div style="width: 20%; flex: 1; text-align: center">
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            U 2.5
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            U 3.5
                                        </template>
                                    </CInputCheckbox>
                                </div>
                                <div style="width: 20%; flex: 1; ">
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            Back
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            Lay
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            Double Tips
                                        </template>
                                    </CInputCheckbox>
                                </div>
                                <div style="width: 20%; flex: 1;">
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            Cup
                                        </template>
                                    </CInputCheckbox>
                                    <CInputCheckbox class="check-box"
                                    >
                                        <template #label>
                                            Week
                                        </template>
                                    </CInputCheckbox>
                                </div>
                            </div>
                            <label style="color: red; font-weight: 600;">Odd Filters:</label>
                            <div style="display: flex;">
                                <div style="flex: 1;">
                                    <label style="float: left; margin-top: 6px; margin-right: 5px;">min:</label>
                                    <CInput @update:value="1000" class="odd-filter-inputbox"></CInput>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <label style="float: left; margin-top: 6px; margin-right: 5px;">max:</label>
                                    <CInput  class="odd-filter-inputbox"></CInput>
                                </div>
                            </div>
                            <label style="color: red; font-weight: 600;">Matched Filters:</label>
                            <div style="display: flex;">
                                <div style="flex: 1;">
                                    <label style="float: left; margin-top: 6px; margin-right: 5px;">min:</label>
                                    <CInput class="odd-filter-inputbox"></CInput>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <label style="float: left; margin-top: 6px; margin-right: 5px;">max:</label>
                                    <CInput  class="odd-filter-inputbox"></CInput>
                                </div>
                            </div>
                        </div>
                    </CCol>
                    <CCol lg="2">
                        <label>Data Option</label>
                        <div class="data_option-container">

                            <div style="margin: auto; width: 80%; max-width: 200px; margin-bottom: 23px;">
                                <label style="color: red; font-weight: 600;">Select Odd from:</label>
                                <CSelect
                                        :options="this.select_odd_from"
                                        @update:value="this.bet_src"
                                >
                                </CSelect>
                            </div>
                        </div>
                    </CCol>
                    <CCol lg="12" style="height: 50px;"></CCol>
                    <CCol lg="6">
                        <div class="select-container">
                            <label>Select</label>
                            <div class="select-container1">
                                <CRow>
                                    <CCol sm="3">
                                        <div style="margin: auto; width: 100%; ">
                                            <label style="color: red; font-weight: 600;">Enter the Odd:</label>
                                            <CInput></CInput>
                                        </div>
                                        <label style="font-weight: 600;">pre-match Odd</label><br>
                                        <label style="font-weight: 600; margin-bottom: 20px;">7.00</label>
                                        <label style="font-weight: 600;">Max Potential earn</label><br>
                                        <label style="font-weight: 600;">
                                            &euro;100.00
                                        </label>
                                    </CCol>
                                    <CCol sm="4">
                                        <div style="width: 100%; ">
                                            <label style="color: red; font-weight: 600;">Enter the Stake:</label>
                                            <CInput></CInput>
                                            <label style="font-weight: 600;">
                                                &euro;300.00
                                            </label><br>
                                            <label style="color: red; font-weight: 600;">Bookmaker Commissions:</label>
                                            <CInput></CInput>
                                            <CButton
                                                    color="info"
                                                    class="m-2"
                                            >
                                                Save match Data
                                            </CButton>
                                        </div>
                                    </CCol>
                                    <CCol sm="5">
                                        <div style="width: 100%; ">
                                            <label style="color: red; font-weight: 600;">Select Risk Trading:</label>
                                            <CSelect
                                                    :options="[ { value: 'js', label: 'Easy' }, { value: 'html', label: 'Today' } ]"
                                                    @update:value=""
                                            >
                                            </CSelect>
                                            <div style="margin-top: 34px;">
                                                <div style="float: left; width: 46%">
                                                    <label style="color: red; font-weight: 600;">Trading Mode:</label>
                                                    <CInput></CInput>
                                                </div>
                                                <div style="float: right; width: 46%">
                                                    <label style="color: red; font-weight: 600;">Stop Losses:</label>
                                                    <CInput></CInput>
                                                </div>
                                            </div>


                                            <CButton
                                                    color="info"
                                                    class="m-2"
                                            >
                                                Delete match Data
                                            </CButton>
                                        </div>
                                    </CCol>
                                </CRow>
                            </div>
                            <label>Messages</label>
                            <div class="select-container2">
                                <CRow>
                                    <CCol sm="9">
                                        <label style="color: red; font-weight: 600;">Cash out bar:</label>
                                        <div style="background: #ffb80c; color: #030303; text-align: center; width: 100%; border-radius: 5px; padding: 10px; font-size: 25px; font-weight: 600;">
                                            #N/A
                                        </div>
                                    </CCol>
                                    <CCol sm="3">
                                        <CButton
                                                color="success"
                                                class="m-2"
                                        >
                                            OFF
                                        </CButton>
                                    </CCol>
                                </CRow>

                            </div>
                        </div>
                    </CCol>
                    <CCol lg="6">
                        <label>
                            Betfair Classic:
                        </label>
                        <div class="betfair-classic-container">
                            <CRow  style="margin: 0;">
                                <CCol sm="6">
                                    <label style="font-weight: 600; color: gray">
                                        Back
                                    </label>
                                    <p style="font-style: italic; color: gray">You're betting in favour of: -x - Banca</p>
                                </CCol>
                                <CCol sm="2">
                                    <label style="font-weight: 600;">
                                        Odd
                                    </label><br>
                                    <label>4.00</label>
                                </CCol>
                                <CCol sm="2">
                                    <label style="color: gray; font-weight: 600;">Stake:</label>
                                    <CInput></CInput>
                                </CCol>
                                <CCol sm="2">
                                    <label style="font-weight: 600; color: gray;">
                                        Earn
                                    </label><br>
                                    <label style="color: gray">&euro;300.00</label>
                                </CCol>
                            </CRow>
                            <CRow style="margin: 0; background: #fac9d1; padding-top: 5px;">
                                <CCol sm="5">
                                    <label style="font-weight: 600; color: black">
                                        Back
                                    </label>
                                </CCol>
                                <CCol sm="2">
                                    <label style="font-weight: 600; color: black">
                                        Odd
                                    </label><br>
                                </CCol>
                                <CCol sm="2">
                                    <label style="font-weight: 600; color: black">Earn:</label>
                                </CCol>
                                <CCol sm="3">
                                    <label style="font-weight: 600; color: black">
                                        Responsiblity:
                                    </label>
                                </CCol>
                            </CRow>
                            <CRow style="margin: 0; background: #fdecef; padding-top: 5px;">
                                <CCol sm="5">
                                    <p style="font-style: italic; margin-top: 30px;">You're betting in favour of: -x - Banca</p>
                                </CCol>
                                <CCol sm="2">
                                    <CInput></CInput>
                                </CCol>
                                <CCol sm="2">
                                    <CInput></CInput>
                                </CCol>
                                <CCol sm="3">
                                    <label style="color: gray">&euro;300.00</label>
                                </CCol>
                            </CRow>
                            <p style="text-align: right; font-weight: 600; margin-top: 20px;">Net Earnings</p>
                            <div>
                                <CRow style="margin-bottom: 20px;">
                                    <CCol sm="10" style="text-align: left">
                                        <p style="margin: 0;">In case of - X - Banca wins you'll earn:</p>
                                    </CCol>
                                    <CCol sm="2" style="text-align: right">
                                        <label style="font-weight: bold;">&euro;0.00</label>
                                    </CCol>
                                    <CCol sm="10" style="text-align: left">
                                        <p style="margin: 0;">In case of - X - Banca does NOT win you'll earn:</p>
                                    </CCol>
                                    <CCol sm="2" style="text-align: right">
                                        <label style="font-weight: bold;">&euro;0.00</label>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol sm="10" style="text-align: left">
                                        <p style="margin: 0;">Stake CASH OUT:</p>
                                    </CCol>
                                    <CCol sm="2" style="text-align: right">
                                        <label style="font-weight: bold;">&euro;100.00</label>
                                    </CCol>
                                </CRow>
                                <CButtonGroup class="button_group">
                                    <CButton class="before_btn">- X - Banca W</CButton>
                                    <CButton class="current_btn">CASH OUT</CButton>
                                    <CButton class="after_btn">- X - Banca L</CButton>
                                </CButtonGroup>
                            </div>
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>

    export default {
        name: 'MainView',
        data(){
            return{
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
                eventLists:[],
                eventLists1:[],
                eventLists2:[],
                eventLists3:[],
                marketId: '',
                lay:'',
                back:'',
                total_matched:0,
                back_matched:0,
                lay_matched:0,
                selectionId:0,
                scoreOne: ,
                scoreTwo: ,
                status:,
                timeRecord:,
                eventId:0,
                openDate:,
            }
        },
        methods:{
            bet_src: function (val) {
                this.bet_data.src = val;

                window.axios.post(`${process.env.VUE_APP_URL}from_betsrc`, [this.bet_data]).then(({data}) => {

                    let marketNode = []
                    let marketArray = []
                    let m_index = 0
                    this.eventLists = [{'value': , 'label': 'Select Match'}]
                    this.eventLists1 = [{'value': , 'label': 'Select Match'}]
                    let teamGroups = data.data[2]

                    for(let i = 0; i < data.data[0].length;  i++){
                        let eventNode = data.data[0][i]
                        let eventName = eventNode.name
                        let name1 = eventName.split('v').splice(0,1).toString().trim()
                        let name2 = eventName.split('v').splice(1,1).toString().trim()
                        let name11 =''
                            let name22 =''

                            let teamGroup1 = data.data[2].filter(function(item) {
                            return item.teamNames.teamName == name1;
                        });
                        if(teamGroup1.length > 0){
                            name11 = teamGroup1[0].statistic
                        }

                        let teamGroup2 = data.data[2].filter(function(item) {
                            return item.teamNames.teamName == name2;
                        });
                        if(teamGroup2.length > 0){
                            name22 = teamGroup2[0].statistic
                        }

                        for(let ii = 0 ;  ii < teamGroups.length ; ii++){
                            for(let jj = 0 ; jj < teamGroups[ii].teamNames.length ; jj++){
                                if(teamGroups[ii].teamNames[jj].teamName == name1 || teamGroups[ii].teamNames[jj].teamName == name11){
                                    let groupList = teamGroups[ii].groupName
                                    let marketType =  teamGroups[ii].marketType
                                    let direction = teamGroups[ii].direction
                                    let bl = teamGroups[ii].bl
                                    for(let j = 0; j < eventNode.markets.length; j++){
                                        if((eventNode.markets[j].marketStatus != 'SUSPENDED') && (eventNode.markets[j].marketStatus != 'CLOSED')) {
                                            if (eventNode.markets[j].marketType == "MATCH_ODDS" && marketType == "MATCH_ODDS") {
                                                let runnerNode = eventNode.markets[j].runners
                                                for (let k = 0; k < runnerNode.length; k++) {
                                                    let runnerName =
                                                    if(runnerNode[k].description){
                                                        runnerName = runnerNode[k].description.runnerName
                                                    }
                                                    else{
                                                        runnerName = runnerNode[k].runnerName
                                                    }

                                                    console.log('runnerId', runnerNode[k].selectionId)
                                                    marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                                    if(groupList == '-X - Lay' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Back' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Back"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay or -2 Lay' && direction == 1){
                                                        if(runnerName == name1){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 1 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Lay' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay or -2 Lay' && direction == 2){
                                                        if(runnerName == name1){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 2 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Lay' && direction == 3){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Back' && direction == 3){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Back"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay' && direction == 3){
                                                        if(runnerName == name1){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 1 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-2 - Lay' && direction == 3){
                                                        if(runnerName == name1){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 2 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    m_index++
                                                }

                                            } else {
                                                console.log('groupList', groupList)
                                                let runnerNode = eventNode.markets[j].runners
                                                for (let k = 0; k < runnerNode.length; k++) {
                                                    if (runnerNode[k].runnerName == "Over 0.5 Goals" || runnerNode[k].runnerName == "Over 1.5 Goals" || runnerNode[k].runnerName == "Under 2.5 Goals" || runnerNode[k].runnerName == "Over 2.5 Goals" || runnerNode[k].runnerName == "Under 3.5 Goals") {
                                                        let runnerName =
                                                        if(runnerNode[k].description){
                                                            runnerName = runnerNode[k].description.runnerName
                                                        }
                                                        else{
                                                            runnerName = runnerNode[k].runnerName
                                                        }
                                                        marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId

                                                        if(groupList == 'Over 0.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Over 0.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 0.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Over 1.5 Goals' && direction == 0 && bl == "Back"){
                                                            console.log('over 1.5')
                                                            if(runnerName == 'Over 1.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 1.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Under 2.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Under 2.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- U 2.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Over 2.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Over 2.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 2.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Under 3.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Under 3.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- U 3.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        m_index++
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else if(teamGroups[ii].teamNames[jj].teamName == name2 || teamGroups[ii].teamNames[jj].teamName == name22){

                                    let groupList = teamGroups[ii].groupName
                                    let marketType =  teamGroups[ii].marketType
                                    let direction = teamGroups[ii].direction
                                    let bl = teamGroups[ii].bl
                                    for(let j = 0; j < eventNode.markets.length; j++){
                                        if((eventNode.markets[j].marketStatus != 'SUSPENDED') && (eventNode.markets[j].marketStatus != 'CLOSED')) {
                                            if (eventNode.markets[j].marketType == "MATCH_ODDS" && marketType == "MATCH_ODDS") {
                                                let runnerNode = eventNode.markets[j].runners
                                                for (let k = 0; k < runnerNode.length; k++) {
                                                    let runnerName =
                                                    if(runnerNode[k].description){
                                                        runnerName = runnerNode[k].description.runnerName
                                                    }
                                                    else{
                                                        runnerName = runnerNode[k].runnerName
                                                    }
                                                    marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                                    if(groupList == '-X - Lay' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Back' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Back"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay or -2 Lay' && direction == 1){
                                                        if(runnerName == name2){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 2 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Lay' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay or -2 Lay' && direction == 2){
                                                        if(runnerName == name2){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 1 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Lay' && direction == 4){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Back' && direction == 4){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Back"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-2 - Lay' && direction == 4){
                                                        if(runnerName == name2){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 2 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay' && direction == 4){
                                                        if(runnerName == name2){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 1 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    m_index++
                                                }

                                            } else {
                                                let runnerNode = eventNode.markets[j].runners
                                                for (let k = 0; k < runnerNode.length; k++) {
                                                    if (runnerNode[k].runnerName == "Over 0.5 Goals" || runnerNode[k].runnerName == "Over 1.5 Goals" || runnerNode[k].runnerName == "Under 2.5 Goals" || runnerNode[k].runnerName == "Over 2.5 Goals" || runnerNode[k].runnerName == "Under 3.5 Goals") {
                                                        let runnerName =
                                                        if(runnerNode[k].description){
                                                            runnerName = runnerNode[k].description.runnerName
                                                        }
                                                        else{
                                                            runnerName = runnerNode[k].runnerName
                                                        }
                                                        marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId

                                                        if(groupList == 'Over 0.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Over 0.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 0.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Over 1.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Over 1.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 1.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Under 2.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Under 2.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- U 2.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Over 2.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Over 2.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 2.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Under 3.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Under 3.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- U 3.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        m_index++
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        for(let j = 0; j < eventNode.markets.length; j++){
                            if((eventNode.markets[j].marketStatus != 'SUSPENDED') && (eventNode.markets[j].marketStatus != 'CLOSED')) {
                                if (eventNode.markets[j].marketType == "MATCH_ODDS") {
                                    let runnerNode = eventNode.markets[j].runners
                                    for (let k = 0; k < runnerNode.length; k++) {
                                        if(runnerNode[k].description){
                                            marketNode[m_index] = eventNode.openDate.substring(12, 16) + " >> " + eventNode.name + " -" + (runnerNode[k].description.runnerName || )
                                        }
                                        else{
                                            marketNode[m_index] = eventNode.openDate.substring(12, 16) + " >> " + eventNode.name + " -" + (runnerNode[k].runnerName || )
                                        }
                                        marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                        this.eventLists.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                        m_index++
                                    }

                                } else {
                                    let runnerNode = eventNode.markets[j].runners
                                    let runnerName =
                                    for (let k = 0; k < runnerNode.length; k++) {
                                        if(runnerNode[k].description){
                                            runnerName = runnerNode[k].description.runnerName
                                        }else{
                                            runnerName = runnerNode[k].runnerName
                                        }
                                        // console.log('runnerName', runnerName)
                                        if (runnerName == "Over 0.5 Goals" || runnerName == "Più di 0,5 goal" || runnerName == "Over 1.5 Goals" || runnerName == "Più di 1,5 goal" || runnerName == "Under 2.5 Goals" || runnerName == "Meno di 2,5 goal" || runnerName == "Over 2.5 Goals"  || runnerName == "Più di 2,5 goal" || runnerName == "Under 3.5 Goals" || runnerName == "Meno di 3,5 goal") {
                                            marketNode[m_index] = eventNode.openDate.substring(12, 16) + " >> " + eventNode.name + " -" + runnerName
                                            marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                            this.eventLists.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                            m_index++
                                        }
                                    }
                                }
                            }
                        }

                    }

                    this.eventLists2 = []
                    for(let i = 0 ; i < this.eventLists1.length ; i++){
                        let check = 0
                        for(let j = 0 ; j < this.eventLists2.length ; j++){
                            console.log('list2', this.eventLists2[j].label)
                            if(this.eventLists1[i].label == this.eventLists2[j].label){
                                check = 1
                            }
                        }
                        if(check == 0){
                            this.eventLists2.push({'value': this.eventLists1[i].value, 'label': this.eventLists1[i].label})
                        }
                    }
                    this.eventLists3 = this.eventLists
                    console.log('eventList1', this.eventLists2)
                })
            },
            bet_date(){
                this.bet_data.date = 'today';
                console.log('bet data', this.bet_data)

                window.axios.post(`${process.env.VUE_APP_URL}from_betsrc`,[this.bet_data]).then(({data})=>{
                    console.log('asdasdas',data.data)
                    let marketNode = []
                    let marketArray = []
                    let m_index = 0
                    this.eventLists = [{'value': , 'label': 'Select Match'}]
                    this.eventLists1 = [{'value': , 'label': 'Select Match'}]
                    let teamGroups = data.data[2]

                    for(let i = 0; i < data.data[0].length;  i++){
                        let eventNode = data.data[0][i]
                        let eventName = eventNode.name
                        let name1 = eventName.split('v').splice(0,1).toString().trim()
                        let name2 = eventName.split('v').splice(1,1).toString().trim()
                        let name11 =
                            let name22 =

                            let teamGroup1 = data.data[2].filter(function(item) {
                            return item.teamNames.teamName == name1;
                        });
                        if(teamGroup1.length > 0){
                            name11 = teamGroup1[0].statistic
                        }

                        let teamGroup2 = data.data[2].filter(function(item) {
                            return item.teamNames.teamName == name2;
                        });
                        if(teamGroup2.length > 0){
                            name22 = teamGroup2[0].statistic
                        }

                        for(let ii = 0 ;  ii < teamGroups.length ; ii++){
                            for(let jj = 0 ; jj < teamGroups[ii].teamNames.length ; jj++){
                                if(teamGroups[ii].teamNames[jj].teamName == name1 || teamGroups[ii].teamNames[jj].teamName == name11){
                                    let groupList = teamGroups[ii].groupName
                                    // console.log('groupListA', groupList)
                                    let marketType =  teamGroups[ii].marketType
                                    let direction = teamGroups[ii].direction
                                    let bl = teamGroups[ii].bl
                                    console.log('----------------->',groupList, marketType, direction, bl, )
                                    for(let j = 0; j < eventNode.markets.length; j++){
                                        if((eventNode.markets[j].marketStatus != 'SUSPENDED') && (eventNode.markets[j].marketStatus != 'CLOSED')) {
                                            if (eventNode.markets[j].marketType == "MATCH_ODDS" && marketType == "MATCH_ODDS") {
                                                let runnerNode = eventNode.markets[j].runners
                                                for (let k = 0; k < runnerNode.length; k++) {
                                                    let runnerName =
                                                    if(runnerNode[k].description){
                                                        runnerName = runnerNode[k].description.runnerName
                                                    }
                                                    else{
                                                        runnerName = runnerNode[k].runnerName
                                                    }

                                                    console.log('runnerId', runnerNode[k].selectionId)
                                                    marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                                    if(groupList == '-X - Lay' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Back' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Back"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay or -2 Lay' && direction == 1){
                                                        if(runnerName == name1){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 1 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Lay' && direction == 0){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay or -2 Lay' && direction == 2){
                                                        if(runnerName == name1){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 2 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Lay' && direction == 3){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-X - Back' && direction == 3){
                                                        if(runnerName == 'The Draw'){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Back"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-1 - Lay' && direction == 3){
                                                        if(runnerName == name1){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 1 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    else if(groupList == '-2 - Lay' && direction == 3){
                                                        if(runnerName == name1){
                                                            marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 2 - Lay"
                                                            this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                        }
                                                    }
                                                    m_index++
                                                }

                                            } else {
                                                let runnerNode = eventNode.markets[j].runners
                                                for (let k = 0; k < runnerNode.length; k++) {
                                                    let runnerName =
                                                    if(runnerNode[k].description){
                                                        runnerName = runnerNode[k].description.runnerName
                                                    }
                                                    else{
                                                        runnerName = runnerNode[k].runnerName
                                                    }
                                                    if (runnerName == "Over 0.5 Goals" || runnerName == "Over 1.5 Goals" || runnerName == "Under 2.5 Goals" || runnerName == "Over 2.5 Goals" || runnerName == "Under 3.5 Goals") {

                                                        marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId

                                                        if(groupList == 'Over 0.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Over 0.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 0.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                                                console.log('asdfasdf----------------->', runnerName)
                                                            }
                                                        }
                                                        else if(groupList == 'Over 1.5 Goals' && direction == 0 && bl == "Back"){
                                                            console.log('over 1.5')
                                                            if(runnerName == 'Over 1.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 1.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Under 2.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Under 2.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- U 2.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Over 2.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Over 2.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 2.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        else if(groupList == 'Under 3.5 Goals' && direction == 0 && bl == "Back"){
                                                            if(runnerName == 'Under 3.5 Goals'){
                                                                marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- U 3.5 - Back"
                                                                this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})

                                                            }
                                                        }
                                                        m_index++
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else if(teamGroups[ii].teamNames[jj].teamName == name2 || teamGroups[ii].teamNames[jj].teamName == name22){

                                    let groupList = teamGroups[ii].groupName
                                    console.log('groupistB', groupList)
                                    // let marketType =  teamGroups[ii].marketType
                                    // let direction = teamGroups[ii].direction
                                    // let bl = teamGroups[ii].bl
                                    // for(let j = 0; j < eventNode.markets.length; j++){
                                    //     if((eventNode.markets[j].marketStatus != 'SUSPENDED') && (eventNode.markets[j].marketStatus != 'CLOSED')) {
                                    //         if (eventNode.markets[j].marketType == "MATCH_ODDS" && marketType == "MATCH_ODDS") {
                                    //             let runnerNode = eventNode.markets[j].runners
                                    //             for (let k = 0; k < runnerNode.length; k++) {
                                    //                 let runnerName =
                                    //                 if(runnerNode[k].description){
                                    //                     runnerName = runnerNode[k].description.runnerName
                                    //                 }
                                    //                 else{
                                    //                     runnerName = runnerNode[k].runnerName
                                    //                 }
                                    //                 marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                    //                 if(groupList == '-X - Lay' && direction == 0){
                                    //                     if(runnerName == 'The Draw'){
                                    //                         marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                    //                         this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                     }
                                    //                 }
                                    //                 else if(groupList == '-X - Back' && direction == 0){
                                    //                     if(runnerName == 'The Draw'){
                                    //                         marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Back"
                                    //                         this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                     }
                                    //                 }
                                    //                 else if(groupList == '-1 - Lay or -2 Lay' && direction == 1){
                                    //                     if(runnerName == name2){
                                    //                         marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 2 - Lay"
                                    //                         this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                     }
                                    //                 }
                                    //                 else if(groupList == '-X - Lay' && direction == 0){
                                    //                     if(runnerName == 'The Draw'){
                                    //                         marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                    //                         this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                     }
                                    //                 }
                                    //                 else if(groupList == '-1 - Lay or -2 Lay' && direction == 2){
                                    //                     if(runnerName == name2){
                                    //                         marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 1 - Lay"
                                    //                         this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                     }
                                    //                 }
                                    //                 else if(groupList == '-X - Lay' && direction == 4){
                                    //                     if(runnerName == 'The Draw'){
                                    //                         marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Lay"
                                    //                         this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                     }
                                    //                 }
                                    //                 else if(groupList == '-X - Back' && direction == 4){
                                    //                     if(runnerName == 'The Draw'){
                                    //                         marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- X - Back"
                                    //                         this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                     }
                                    //                 }
                                    //                 else if(groupList == '-2 - Lay' && direction == 4){
                                    //                     if(runnerName == name2){
                                    //                         marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 2 - Lay"
                                    //                         this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                     }
                                    //                 }
                                    //                 else if(groupList == '-1 - Lay' && direction == 4){
                                    //                     if(runnerName == name2){
                                    //                         marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- 1 - Lay"
                                    //                         this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                     }
                                    //                 }
                                    //                 m_index++
                                    //             }
                                    //
                                    //         } else {
                                    //             let runnerNode = eventNode.markets[j].runners
                                    //             for (let k = 0; k < runnerNode.length; k++) {
                                    //                 if (runnerNode[k].runnerName == "Over 0.5 Goals" || runnerNode[k].runnerName == "Over 1.5 Goals" || runnerNode[k].runnerName == "Under 2.5 Goals" || runnerNode[k].runnerName == "Over 2.5 Goals" || runnerNode[k].runnerName == "Under 3.5 Goals") {
                                    //                     let runnerName =
                                    //                     if(runnerNode[k].description){
                                    //                         runnerName = runnerNode[k].description.runnerName
                                    //                     }
                                    //                     else{
                                    //                         runnerName = runnerNode[k].runnerName
                                    //                     }
                                    //                     marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                    //
                                    //                     if(groupList == 'Over 0.5 Goals' && direction == 0 && bl == "Back"){
                                    //                         if(runnerName == 'Over 0.5 Goals'){
                                    //                             marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 0.5 - Back"
                                    //                             this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                         }
                                    //                     }
                                    //                     else if(groupList == 'Over 1.5 Goals' && direction == 0 && bl == "Back"){
                                    //                         if(runnerName == 'Over 1.5 Goals'){
                                    //                             marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 1.5 - Back"
                                    //                             this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                         }
                                    //                     }
                                    //                     else if(groupList == 'Under 2.5 Goals' && direction == 0 && bl == "Back"){
                                    //                         if(runnerName == 'Under 2.5 Goals'){
                                    //                             marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- U 2.5 - Back"
                                    //                             this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                         }
                                    //                     }
                                    //                     else if(groupList == 'Over 2.5 Goals' && direction == 0 && bl == "Back"){
                                    //                         if(runnerName == 'Over 2.5 Goals'){
                                    //                             marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- O 2.5 - Back"
                                    //                             this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                         }
                                    //                     }
                                    //                     else if(groupList == 'Under 3.5 Goals' && direction == 0 && bl == "Back"){
                                    //                         if(runnerName == 'Under 3.5 Goals'){
                                    //                             marketNode[m_index] = eventNode.openDate.substring(0, 16) + ">>" + eventNode.name + "- U 3.5 - Back"
                                    //                             this.eventLists1.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                    //
                                    //                         }
                                    //                     }
                                    //                     m_index++
                                    //                 }
                                    //             }
                                    //         }
                                    //     }
                                    // }
                                }
                            }
                        }

                        for(let j = 0; j < eventNode.markets.length; j++){
                            if((eventNode.markets[j].marketStatus != 'SUSPENDED') && (eventNode.markets[j].marketStatus != 'CLOSED')) {
                                if (eventNode.markets[j].marketType == "MATCH_ODDS") {
                                    let runnerNode = eventNode.markets[j].runners
                                    for (let k = 0; k < runnerNode.length; k++) {
                                        if(runnerNode[k].description){
                                            marketNode[m_index] = eventNode.openDate.substring(12, 16) + " >> " + eventNode.name + " -" + (runnerNode[k].description.runnerName || )
                                        }
                                        else{
                                            marketNode[m_index] = eventNode.openDate.substring(12, 16) + " >> " + eventNode.name + " -" + (runnerNode[k].runnerName || )
                                        }
                                        marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                        this.eventLists.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                        m_index++
                                    }

                                } else {
                                    let runnerNode = eventNode.markets[j].runners
                                    let runnerName =''
                                    for (let k = 0; k < runnerNode.length; k++) {
                                        if(runnerNode[k].description){
                                            runnerName = runnerNode[k].description.runnerName
                                        }else{
                                            runnerName = runnerNode[k].runnerName
                                        }

                                        if (runnerName == "Over 0.5 Goals" || runnerName == "Over 1.5 Goals" || runnerName == "Under 2.5 Goals" || runnerName == "Over 2.5 Goals" || runnerName == "Under 3.5 Goals") {
                                            marketNode[m_index] = eventNode.openDate.substring(12, 16) + " >> " + eventNode.name + " -" + runnerName
                                            marketArray[m_index] = eventNode.markets[j].marketId + "," + runnerNode[k].selectionId + "," + eventNode.eventId
                                            this.eventLists.push({'value': marketArray[m_index], 'label': marketNode[m_index]})
                                            m_index++
                                        }
                                    }
                                }
                            }
                        }

                    }

                    this.eventLists2 = []
                    for(let i = 0 ; i < this.eventLists1.length ; i++){
                        let check = 0
                        for(let j = 0 ; j < this.eventLists2.length ; j++){
                            console.log('list2', this.eventLists2[j].label)
                            if(this.eventLists1[i].label == this.eventLists2[j].label){
                                check = 1
                            }
                        }
                        if(check == 0){
                            this.eventLists2.push({'value': this.eventLists1[i].value, 'label': this.eventLists1[i].label})
                        }
                    }
                    this.eventLists3 = this.eventLists
                    console.log('eventList1', this.eventLists2)
                })

            },
            select_match(val){
                if(val == ){
                    return
                }
                let self = this
                this.marketId =  (val.split(',').splice(0,1)).toString()
                this.selectionId = parseInt(val.split(',').splice(1,1))
                this.eventId = parseInt(val.split(',').splice(2,1))
                window.axios.post(`${process.env.VUE_APP_URL}select_match`,[val]).then(({data})=>{
                    console.log('eventResult', data.data[0])
                    console.log('marketResult', data.data[1])
                    let start_date = new Date();
                    let startDate = start_date.setDate(start_date.getDate() - 0);
                    startDate = new Date(startDate).toISOString()

                    if(data.data[0].score){
                        this.scoreOne = data.data[0].score.home.score + ' -'
                        this.scoreTwo = data.data[0].score.away.score
                        this.status = data.data[0].status
                        if(data.data[0].status == 'IN_PLAY'){
                            this.status = 'Live !'
                        }
                        this.timeRecord = data.data[0].timeElapsed + "'"
                    }else{
                        this.scoreOne=
                            this.scoreTwo=
                                this.timeRecord=
                                    this.static=

                        if(startDate < data.data[0].openDate){
                            this.status='Coming Up'
                        }
                        else{
                            this.status='COMPLETED'
                        }
                    }

                    this.total_matched = data.data[1].totalMatched
                    // this.lay = data.data[1].runners.

                    let selections = data.data[1].runners.filter(function(runner) {
                        return runner.selectionId == self.selectionId;
                    });

                    if(!selections[0].exchange){
                        return
                    }
                    if(selections[0].exchange.availableToBack){
                        this.back = selections[0].exchange.availableToBack[0].price ||
                        this.back_matched = selections[0].exchange.availableToBack[0].size || 0
                    }
                    if(selections[0].exchange.availableToLay){
                        this.lay = selections[0].exchange.availableToLay[0].price ||
                        this.lay_matched = selections[0].exchange.availableToLay[0].size || 0
                    }
                    // console.log(selections)
                })
            },
            select_prediction(val){
                if(val == true){
                    this.eventLists3 = this.eventLists2
                }
                else{
                    this.eventLists3 = this.eventLists
                }
            }
        },
        created() {
            this.bet_date();
            let self = this
            this.sockets.subscribe('UpdateOdds', (data) => {
                if(self.bet_data.src == 'betfair.com'){
                    for(let i = 0; i < data.length; i++){
                        if(this.marketId == data[i].marketId){
                            let selections = data[i].runners.filter(function(runner) {
                                return runner.selectionId == self.selectionId;
                            });

                            if(selections[0].exchange.availableToBack){
                                self.back = selections[0].exchange.availableToBack[0].price ||
                                self.back_matched = selections[0].exchange.availableToBack[0].size || 0
                            }

                            if(selections[0].exchange.availableToLay){
                                self.lay = selections[0].exchange.availableToLay[0].price ||
                                self.lay_matched = selections[0].exchange.availableToLay[0].size || 0
                            }
                            self.total_matched = (data[i].state.totalMatched).toFixed(1)

                        }
                    }
                }
            });
            this.sockets.subscribe('UpdateOdds1', (data) => {
                if(self.bet_data.src == 'betfair.it'){
                    for(let i = 0; i < data.length; i++){
                        if(this.marketId == data[i].marketId){
                            let selections = data[i].runners.filter(function(runner) {
                                return runner.selectionId == self.selectionId;
                            });

                            if(selections[0].exchange.availableToBack){
                                self.back = selections[0].exchange.availableToBack[0].price ||
                                self.back_matched = selections[0].exchange.availableToBack[0].size || 0
                            }

                            if(selections[0].exchange.availableToLay){
                                self.lay = selections[0].exchange.availableToLay[0].price ||
                                self.lay_matched = selections[0].exchange.availableToLay[0].size || 0
                            }
                            self.total_matched = (data[i].state.totalMatched).toFixed(1)

                        }
                    }
                }

            });
            this.sockets.subscribe('UpdateScore', (data) => {
                console.log('RefreshScore',data)

                if(self.eventId ==  data.eventId && self.bet_data.src == 'betfair.com'){
                    self.timeRecord = data.timeElapsed
                    self.status = data.status
                    if(data.status == 'IN_PLAY'){
                        self.status = 'Live !'
                    }
                    this.scoreOne = data.score.home.score + " -"
                    this.scoreTwo = data.score.away.score
                    this.status = data.status
                    this.timeRecord = data.timeElapsed+ "'"
                }
            });
            this.sockets.subscribe('UpdateScore1', (data) => {
                console.log('RefreshScore',data)
                if(self.eventId ==  data.eventId && self.bet_data.src == 'betfair.it'){
                    self.timeRecord = data.timeElapsed
                    self.status = data.status
                    if(data.status == 'IN_PLAY'){
                        self.status = 'Live !'
                    }
                    this.scoreOne = data.score.home.score + " -"
                    this.scoreTwo = data.score.away.score
                    this.status = data.status
                    this.timeRecord = data.timeElapsed+ "'"
                }
            });
        }
    }
</script>
<style scoped>
    .match-container{
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;
        /*background: #1e1e1e;*/
    }
    .filter-container{
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;

    }
    .data_option-container{
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;
    }
    .form-group{
        margin-bottom: 5px;
    }
    .check-box{
        margin-bottom: 5px;
        min-width: 55px;
    }
    .checkbox-row{
        padding: 0;
    }
    .odd-filter-inputbox{
        width: calc(100% - 40px);
        float: left;
    }
    .select-container1{
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
    }
    .select-container2{
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;
    }
    .betfair-classic-container{
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;
    }
    .btn-info{
        font-size: 15px;
        padding-top: 5px;
        padding-bottom: 10px;
        background: #ebedef;
        color: #3c4b64;
        font-weight: 500;
        border: 1px solid #ebedef;
    }
    .btn-success {
        color: #2b2b2b;
        background-color: #f2f4f6;
        border-color: #ebedef;
        font-size: 25px;
        width: 100px;
        margin-top: 28px!important;
    }
    .button_group{
        width: 100%;
        margin-bottom: 10px;
    }
    .before_btn{
        background: #ebedef;
        font-weight: 600;
    }
    .current_btn{
        background: #cecece;
        font-weight: 600;
    }
    .after_btn{
        background: #ebedef;
        font-weight: 600;
    }
    .refresh-btn{
        width: 100%;
        background: #00791f;
        color: white;
        margin-top: 10px;
        padding-top: 7px;
        font-size: 15px;
        padding-left: 0px;
        padding-right: 0px;
        min-width: 100px;
        text-align: center;
    }
    .stop-btn{
        width: 100%;
        background: #ca2640;
        color: white;
        margin-top: 10px;
        padding-top: 7px;
        font-size: 15px;
        padding-left: 0px;
        padding-right: 0px;
        text-align: center;
    }
</style>

