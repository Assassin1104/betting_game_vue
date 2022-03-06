<template>
    <div class="cold-stats-container" style="min-width: 1250px">
        <b-modal id="modal-1"  hide-footer hide-header centered no-close-on-backdrop>
            <b-progress value="100" max="100" animated variant="secondary"></b-progress>
        </b-modal>
        <div v-if="!isload" style="height: 10px;">
            <b-progress :value="current_counter" :max="counter" animated></b-progress>
        </div>
        <CCard body-wrapper>
            <div style="width: 200px; float: left;">
                <CSelect
                        :options="week_filter"
                        @update:value="date_select"
                >
                </CSelect>
            </div>
            <div style="width: 200px; float: left; margin-left: 50px;">
                <CSelect
                        :options="filter_set"
                        @update:value="filter_selector"
                >
                </CSelect>
            </div>
            <div
                    v-for="(item,index) in mainList"
                    :key="item.league1 + index"
                    style="clear: left;"
            >
                <div
                        duration="500"
                        class="event-list"
                        v-if="item.events.length > 0"
                >
                    {{item.country}} - {{item.league1}} -
                    {{item.events.length}} matches
                    <img v-if="item.percentage >= 96 && item.clubs > 3" src="/img/icon-warning-orange.png" width="13px;" style="width: 18px; position:relative; top: 4px; margin-left: 5px; margin-right: 25px; float: right;"/>
                    <img v-if="item.percentage <= 10 || item.clubs <= 3" src="/img/icon-warning-red.png" width="13px;" style="width: 18px; position:relative; top: 4px; margin-left: 5px; margin-right: 25px; float: right;"/>
                    <img v-if="item.percentage >= 11  && item.clubs > 3 && item.percentage <= 95" src="/img/icon-tick.png" width="13px;" style="width: 18px; position:relative; top: -1px; margin-left: 5px; margin-right: 25px; float: right;"/>
                    <span v-if="item.percentage > 0" style="font-weight: normal; margin-left: 10px; float: right; ">{{item.percentage}}%</span>
                    <span v-else style="font-weight: normal; margin-left: 10px; float: right; ">{{item.percentage}}</span>
                </div>
                <CCollapse
                        :show="item.events.length > 0" class="mt-0"
                >
                    <div
                            v-for="item1 in item.events"
                            :key="item1.eventId"
                    >
                        <div
                                class="event-content"
                                @click="SetCollapse1(item1.eventName), eventDetailData(item1.home_id, item1.away_id, item1.season_id, item1)"
                                duration="500"
                        >
                            {{item1.eventName}}
                            <img v-if="!item1.show" src="/img/ico-plus.png" width="13px;" style="width: 16px; float: right;"/>
                            <img v-if="item1.show" src="/img/ico-minus.png" width="13px;" style="width: 16px; float: right;"/>
                        </div>
                        <CCollapse
                                :show="item1.show" class="mt-0"
                                v-if="item1.show"
                        >
                            <div
                                    class="event-graph"
                            >
                                <div class="event-graph-header">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 30px;">

                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%;">
                                        Team
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        P
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        0 - 0
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        Ov. 1.5
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        Ov. 2.5
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        Ov. 3.5
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        Scored
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        Conc.
                                    </div>
                                    <div style="min-width: 80px; float: left; width: 8%; text-align: center;">
                                        Average
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        BTS
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        1 + 1st
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        2 + 1st
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        1 + 2st
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        2 + 2st
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 14%; text-align: center;">
                                        Filters
                                    </div>
                                </div>
                                <div class="graph1">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 50px; text-align: center; padding-top: 15px;">
                                        H
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 50px; padding-top: 15px;">
                                        {{item1.home.name}}
                                        <img  v-b-modal.modal-center @click="current_modal_title = item1.home.name, replace_modal_data(item1.home_id, item1.away_id)" src="/img/info_icon.png" width="13px;" style="width: 20px; cursor: pointer; outline: none; position: relative; top: 40px; left: 12px"/>
                                    </div>

                                    <div style="min-width: 50px; float: left; width: 5%; height: 50px; padding-top: 15px;">
                                        {{item1.home.p}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.z_z <= 10" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.z_z+'%'}"></div>
                                            <div v-if="item1.home.z_z >= 20" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.z_z+'%'}"></div>
                                            <div v-if="item1.home.z_z > 10 && item1.home.z_z < 20" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.z_z+'%'}"></div>
                                            <label class="graph-label">{{item1.home.z_z}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.over15 >= 80" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.over15 +'%'}"></div>
                                            <div v-if="item1.home.over15 < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.over15 +'%'}"></div>
                                            <div v-if="item1.home.over15 < 80 && item1.home.over15 >= 60" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.over15+'%'}"></div>
                                            <label class="graph-label">{{item1.home.over15}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.over25 >= 65" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.over25+'%'}"></div>
                                            <div v-if="item1.home.over25 < 50" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.over25 +'%'}"></div>
                                            <div v-if="item1.home.over25 >= 50 && item1.home.over25 < 65" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.over25+'%'}"></div>
                                            <label class="graph-label">{{item1.home.over25}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.over35 >= 40" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.over35+'%'}"></div>
                                            <div v-if="item1.home.over35 < 25" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.over35+'%'}"></div>
                                            <div v-if="item1.home.over35 >= 25 && item1.home.over35 < 40" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.over35 +'%'}"></div>
                                            <label class="graph-label">{{item1.home.over35}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.scored >= 70" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.scored +'%'}"></div>
                                            <div v-if="item1.home.scored < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.scored +'%'}"></div>
                                            <div v-if="item1.home.scored >= 60 && item1.home.scored < 70" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.scored +'%'}"></div>
                                            <label class="graph-label">{{item1.home.scored}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.conc >= 70" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.conc +'%'}"></div>
                                            <div v-if="item1.home.conc < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.conc +'%'}"></div>
                                            <div v-if="item1.home.conc >= 60 && item1.home.conc <70" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.conc +'%'}"></div>
                                            <label class="graph-label">{{item1.home.conc}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 80px; float: left; width: 8%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :style="{'position': 'absolute', 'left': '0','width':'100%', 'width': (item1.home.average1/(parseFloat(item1.home.average1) + parseFloat(item1.home.average2))*100).toFixed(2)+'%'}"></div>
                                            <div class="graph-inner" :style="{'position': 'absolute', 'right': '-1px','width':'0%','width': (item1.home.average2/(parseFloat(item1.home.average1) + parseFloat(item1.home.average2))*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{item1.home.average1}}</label>
                                            <label class="graph-label1">{{item1.home.average2}}</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.bts >= 65" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.bts+'%'}"></div>
                                            <div v-if="item1.home.bts < 45" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.bts+'%'}"></div>
                                            <div v-if="item1.home.bts >= 45 && item1.home.bts < 65" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.bts +'%'}"></div>
                                            <label class="graph-label">{{item1.home.bts}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.first1 >= 80" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.first1+'%'}"></div>
                                            <div v-if="item1.home.first1 < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.first1+'%'}"></div>
                                            <div v-if="item1.home.first1 >= 60 && item1.home.first1 < 80" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.first1+'%'}"></div>
                                            <label class="graph-label">{{item1.home.first1}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.first2 >= 50" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.first2+'%'}"></div>
                                            <div v-if="item1.home.first2 < 40" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.first2+'%'}"></div>
                                            <div v-if="item1.home.first2 >= 40 && item1.home.first2 <50" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.first2+'%'}"></div>
                                            <label class="graph-label">{{item1.home.first2}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.second1 >= 80" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.second1+'%'}"></div>
                                            <div v-if="item1.home.second1 < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.second1+'%'}"></div>
                                            <div v-if="item1.home.second1 >= 60 && item1.home.second1 < 80" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.second1+'%'}"></div>
                                            <label class="graph-label">{{item1.home.second1}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.home.second2 >= 50" class="graph-inner" :style="{'background':'#00CC00','height': item1.home.second2+'%'}"></div>
                                            <div v-if="item1.home.second2 < 40" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.home.second2+'%'}"></div>
                                            <div v-if="item1.home.second2 >= 40 && item1.home.second2 < 50" class="graph-inner" :style="{'background':'#CDCF46','height': item1.home.second2+'%'}"></div>
                                            <label class="graph-label">{{item1.home.second2}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 150px; float: left; width: 17%;">
                                        <div style="width: 100%; height: 30px;">
                                            <label style="float: left; margin-left: 10px; ">Red Card</label>

                                            <div style="width: 25%; float: right;">
                                                <CInputCheckbox class="check-box"
                                                                :key="filter_key1"
                                                                :checked="false"
                                                                @update:checked="SH_red"
                                                                @click="item_X = item1, home_date_list = item1.homeDateList, away_date_list = item1.awayDateList, basic_data = item1.b_data"
                                                >
                                                    <template #label>
                                                        SH
                                                    </template>
                                                </CInputCheckbox>
                                            </div>

                                            <div style="width: 25%; float: right;">
                                                <CInputCheckbox class="check-box"
                                                                :checked="false"
                                                                :key="filter_key2"
                                                                @update:checked="FH_red"
                                                                @click="item_X = item1, home_date_list = item1.homeDateList, away_date_list = item1.awayDateList, basic_data = item1.b_data"
                                                >
                                                    <template #label>
                                                        FH
                                                    </template>
                                                </CInputCheckbox>
                                            </div>
                                        </div>
                                        <div>
                                            <label style="float: left; margin-left: 10px; margin-top: 0px;">Show last</label>
                                            <CSelect
                                                    v-if="item1.homeDateList.length <= item1.awayDateList.length"
                                                    class="eventdays date-range"
                                                    :value.sync = "filter_key3"
                                                    :options="item1.homeDateList"
                                                    @click="item_X = item1, home_date_list = item1.homeDateList, away_date_list = item1.awayDateList, basic_data = item1.b_data"
                                                    @update:value="refreshCalc"
                                            >
                                            </CSelect>

                                            <CSelect
                                                    v-if="item1.homeDateList.length > item1.awayDateList.length"
                                                    class="eventdays date-range"
                                                    @click="item_X = item1, home_date_list = item1.homeDateList, away_date_list = item1.awayDateList, basic_data = item1.b_data"
                                                    :value.sync = "filter_key4"
                                                    :options="item1.awayDateList"
                                                    @update:value="refreshCalc"
                                            >
                                            </CSelect>
                                            <label style="margin-top: 0px;">days</label>
                                        </div>
                                        <div v-if="item1.homeLineupList.length > 1" style="height: 25px; margin-top: 3px; margin-bottom: 5px;">
                                            <label style="float: left; margin-left: 10px;">Home Lineup:</label>
                                            <CSelect
                                                    class="eventdays date-range lineup"
                                                    :options="item1.homeLineupList"
                                                    :value.sync = "filter_key5"
                                                    @click="item_X = item1, lineup_home_id = item1.home_id, away_team = item1.away, lineup_away_id = item1.away_id"
                                                    @update:value="home_lineup_refresh"
                                            >
                                            </CSelect>
                                        </div>
                                    </div>
                                </div>
                                <div class="graph1" style="padding-top: 0;">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 50px; text-align: center; padding-top: 15px;">
                                        A
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 50px; padding-top: 15px;">
                                        {{item1.away.name}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 50px; padding-top: 15px;">
                                        {{item1.away.p}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.z_z <= 10" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.z_z+'%'}"></div>
                                            <div v-if="item1.away.z_z >= 20" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.z_z+'%'}"></div>
                                            <div v-if="item1.away.z_z < 20 && item1.away.z_z > 10" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.z_z+'%'}"></div>
                                            <label class="graph-label">{{item1.away.z_z}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.over15 >= 80" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.over15+'%'}"></div>
                                            <div v-if="item1.away.over15 < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.over15+'%'}"></div>
                                            <div v-if="item1.away.over15 < 80 && item1.away.over15 >= 60" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.over15+'%'}"></div>
                                            <label class="graph-label">{{item1.away.over15}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.over25 >= 65" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.over25+'%'}"></div>
                                            <div v-if="item1.away.over25 < 50" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.over25+'%'}"></div>
                                            <div v-if="item1.away.over25 >= 50 && item1.away.over25 < 65" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.over25+'%'}"></div>
                                            <label class="graph-label">{{item1.away.over25}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.over35 >= 40" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.over35+'%'}"></div>
                                            <div v-if="item1.away.over35 < 25" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.over35+'%'}"></div>
                                            <div v-if="item1.away.over35 >= 25 && item1.away.over35 < 40" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.over35+'%'}"></div>
                                            <label class="graph-label">{{item1.away.over35}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.scored >= 70" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.scored+'%'}"></div>
                                            <div v-if="item1.away.scored < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.scored+'%'}"></div>
                                            <div v-if="item1.away.scored >= 60 && item1.away.scored < 70" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.scored+'%'}"></div>
                                            <label class="graph-label">{{item1.away.scored}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.conc >= 70" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.conc+'%'}"></div>
                                            <div v-if="item1.away.conc < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.conc+'%'}"></div>
                                            <div v-if="item1.away.conc >= 60 && item1.away.conc < 70" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.conc+'%'}"></div>
                                            <label class="graph-label">{{item1.away.conc}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 80px; float: left; width: 8%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :style="{'position': 'absolute', 'left': '0','width':'100%','width': (item1.away.average1/(parseFloat(item1.away.average1) + parseFloat(item1.away.average2))*100).toFixed(2)+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :style="{'position': 'absolute', 'right': '-1px','width':'0%','width': (item1.away.average2/(parseFloat(item1.away.average1) + parseFloat(item1.away.average2))*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{item1.away.average1}}</label>
                                            <label class="graph-label1">{{item1.away.average2}}</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.bts >= 65" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.bts+'%'}"></div>
                                            <div v-if="item1.away.bts < 45" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.bts+'%'}"></div>
                                            <div v-if="item1.away.bts >= 45 && item1.away.bts < 65" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.bts+'%'}"></div>
                                            <label class="graph-label">{{item1.away.bts}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.first1 >= 80" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.first1+'%'}"></div>
                                            <div v-if="item1.away.first1 < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.first1+'%'}"></div>
                                            <div v-if="item1.away.first1 >= 60 && item1.away.first1 < 80" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.first1+'%'}"></div>
                                            <label class="graph-label">{{item1.away.first1}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.first2 >= 50" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.first2+'%'}"></div>
                                            <div v-if="item1.away.first2 < 40" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.first2+'%'}"></div>
                                            <div v-if="item1.away.first2 >= 40 && item1.away.first2 < 50" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.first2+'%'}"></div>
                                            <label class="graph-label">{{item1.away.first2}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.second1 >= 80" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.second1+'%'}"></div>
                                            <div v-if="item1.away.second1 < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.second1+'%'}"></div>
                                            <div v-if="item1.away.second1 >= 60 && item1.away.second1 < 80" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.second1+'%'}"></div>
                                            <label class="graph-label">{{item1.away.second1}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="item1.away.second2 >= 50" class="graph-inner" :style="{'background':'#00CC00','height': item1.away.second2+'%'}"></div>
                                            <div v-if="item1.away.second2 < 40" class="graph-inner" :style="{'background':'#FE9F9F','height': item1.away.second2+'%'}"></div>
                                            <div v-if="item1.away.second2 >= 40 && item1.away.second2 < 50" class="graph-inner" :style="{'background':'#CDCF46','height': item1.away.second2+'%'}"></div>
                                            <label class="graph-label">{{item1.away.second2}}%</label>
                                        </div>
                                    </div>

                                    <!-- <div v-if="item1.rankFilter === true" style="min-width: 150px; float: left; width: 17%; margin-top: -5px;"> -->
                                    <div style="min-width: 150px; float: left; width: 17%; margin-top: -5px;">
                                        <div v-if="item1.awayLineupList.length > 1" style="height: 25px; margin-top: 3px;">
                                            <label style="float: left; margin-left: 15px; margin-bottom: 0;">Away Lineup:</label>
                                            <CSelect
                                                    class="eventdays date-range lineup"
                                                    :options="item1.awayLineupList"
                                                    :value.sync = "filter_key6"
                                                    @click="item_X = item1, lineup_home_id = item1.home_id, home_team = item1.home, lineup_away_id = item1.away_id"
                                                    @update:value="away_lineup_refresh"
                                            >
                                            </CSelect>
                                        </div>
                                        <div v-if="item1.rankFilter === true" style="width: 100%; height: 30px; margin-top: 5px;">
                                            <label style="float: left; margin-left: 10px; ">HomeTeam:</label>
                                            <div style="width: 50%; float: right;">
                                                <CSelect
                                                        class="rank_filter"
                                                        :options="item1.rank_option"
                                                        :value.sync = "filter_key7"
                                                        @click = "rank_filter = item1.rank_set, item_X = item1, away_team = item1.away, home_team = item1.home"
                                                        @update:value="home_rank_filter"
                                                >
                                                </CSelect>
                                            </div>
                                        </div>
                                        <div v-if="item1.rankFilter === true" style="width: 100%; height: 30px; margin-top: -2px;">
                                            <label style="float: left; margin-left: 10px; ">AwayTeam:</label>
                                            <div style="width: 50%; float: right;">
                                                <CSelect
                                                        class="rank_filter"
                                                        :options="item1.rank_option"
                                                        :value.sync = "filter_key8"
                                                        @click = "rank_filter = item1.rank_set, item_X = item1, away_team = item1.away, home_team = item1.home"
                                                        @update:value="away_rank_filter"
                                                >
                                                </CSelect>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="clear: left; display: flex">                                    
                                    <div style="flex: 2.5"><label style="font-weight: 600; margin-right: 10px;">FH goals Scored:</label>
                                        <span style="display:inline-block;padding-left: 15px;">home: {{item1.home.fh_percentage}}%</span>
                                        <span style="display:inline-block;padding-left: 15px;">away: {{item1.away.fh_percentage}}%</span>
                                        <span style="display:inline-block;padding-left: 15px;">probability: {{item1.home.fh_probability}}%</span>
                                    </div>
                                    
                                    <div style="flex: 2.5"><label style="font-weight: 600; margin-right: 10px;">SH goals Scored:</label>
                                        <span style="display:inline-block;padding-left: 15px;">home: {{item1.home.sh_percentage}}%</span>
                                        <span style="display:inline-block;padding-left: 15px;">away: {{item1.away.sh_percentage}}%</span>
                                        <span style="display:inline-block;padding-left: 15px;">probability: {{item1.home.sh_probability}}%</span>
                                    </div>                                    
                                    <div style="flex: 1"></div>
                                </div>
                                <div class="event-graph-header">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 30px;">

                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%;">
                                        Team
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        P
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 7%; text-align: center; padding: 0px 10px;">
                                        <span style="float: left;">G+</span><span style="float: right;">G-</span>
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        0 - 15
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        16 - 30
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        31 - 45
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 7%; text-align: center;">
                                        46 - 60
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 7%; text-align: center;">
                                        61 - 75
                                    </div>
                                    <div title="sdfsdfsdf" style="min-width: 60px; float: left; width: 7%; text-align: center;">
                                        76 - 90
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%; text-align: center; padding: 0px 10px;">
                                        <span style="float: left;">GS1</span><span style="float: right;">GS2</span>
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%; text-align: center; padding: 0px 10px;">
                                        <span style="float: left;">GC1</span><span style="float: right;">GC2</span>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%; text-align: center;">
                                        40+
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%; text-align: center;">
                                        85+
                                    </div>
                                </div>
                                <div class="graph1">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 50px; text-align: center; padding-top: 15px;">
                                        H
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 50px; padding-top: 15px;">
                                        {{item1.home.name}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 50px; padding-top: 15px;">
                                        {{item1.home.p}}
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 7%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :style="{'position': 'absolute', 'left': '0','width': (item1.home.average1/(parseFloat(item1.home.average1) + parseFloat(item1.home.average2))*100).toFixed(2)+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :style="{'position': 'absolute', 'right': '-1px','width': (item1.home.average2/(parseFloat(item1.home.average1) + parseFloat(item1.home.average2))*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{(parseFloat(item1.home.average1)*parseFloat(item1.home.p)).toFixed(0)}}</label>
                                            <label class="graph-label1">{{(parseFloat(item1.home.average2)*parseFloat(item1.home.p)).toFixed(0)}}</label>
                                        </div>
                                    </div>
                                    <!--                                    <div style="min-width:450px ;width: 42%;">-->
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time15_S" :style="{'height': item1.home.time15_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time15_C" :style="{'position': 'absolute', 'right': '5px','height': item1.home.time15_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label" style="left: 0;">{{item1.home.time15_S}}%</label>
                                            <label class="graph-label1">{{item1.home.time15_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time30_S" :style="{'height': item1.home.time30_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time30_C" :style="{'position': 'absolute', 'right': '5px','height': item1.home.time30_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.home.time30_S}}%</label>
                                            <label class="graph-label1">{{item1.home.time30_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time45_S" :style="{'height': item1.home.time45_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time45_C" :style="{'position': 'absolute', 'right': '5px','height': item1.home.time45_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.home.time45_S}}%</label>
                                            <label class="graph-label1">{{item1.home.time45_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time60_S" :style="{'height': item1.home.time60_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time60_C" :style="{'position': 'absolute', 'right': '5px','height': item1.home.time60_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.home.time60_S}}%</label>
                                            <label class="graph-label1">{{item1.home.time60_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time75_S" :style="{'height': item1.home.time75_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time75_C" :style="{'position': 'absolute', 'right': '5px','height': item1.home.time75_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.home.time75_S}}%</label>
                                            <label class="graph-label1">{{item1.home.time75_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time90_S" :style="{'height': item1.home.time90_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time90_C" :style="{'position': 'absolute', 'right': '5px','height': item1.home.time90_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.home.time90_S}}%</label>
                                            <label class="graph-label1">{{item1.home.time90_C}}%</label>
                                        </div>
                                    </div>
                                    <!--                                    </div>-->


                                    <div style="min-width: 90px; float: left; width: 9%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :title="item1.home.gs1" :style="{'position': 'absolute', 'left': '0','width': item1.home.gs1+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :title="item1.home.gs2" :style="{'position': 'absolute', 'right': '-1px','width': (100 - parseInt(item1.home.gs1))+'%', 'background': '#00c900'}"></div>
                                            <label class="graph-label">{{item1.home.gs1}}%</label>
                                            <label class="graph-label1">{{100 - parseInt(item1.home.gs1)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :title="item1.home.gc1" :style="{'position': 'absolute', 'left': '0','width': item1.home.gc1+'%', 'background': '#fe9f9f'}"></div>
                                            <div class="graph-inner" :title="item1.home.gc2" :style="{'position': 'absolute', 'right': '-1px','width': 100 - parseInt(item1.home.gc1)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{item1.home.gc1}}%</label>
                                            <label class="graph-label1">{{100 - parseInt(item1.home.gc1)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%;">
                                        <div class="graph-detail">
                                            <div class="graph-inner" :title="item1.home.over40" :style="{'height': item1.home.over40+'%', 'background': '#655'}"></div>
                                            <label class="graph-label">{{item1.home.over40}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%;">
                                        <div class="graph-detail">
                                            <div class="graph-inner" :title="item1.home.over85" :style="{'height': item1.home.over85+'%', 'background': '#655'}"></div>
                                            <label class="graph-label">{{item1.home.over85}}%</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="graph1">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 50px; text-align: center; padding-top: 15px;">
                                        A
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 50px; padding-top: 15px;">
                                        {{item1.away.name}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 50px; padding-top: 15px;">
                                        {{item1.away.p}}
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 7%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :style="{'position': 'absolute', 'left': '0','width': item1.away.average1/(parseFloat(item1.away.average1) + parseFloat(item1.away.average2))*100+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :style="{'position': 'absolute', 'right': '-1px','width': item1.away.average2/(parseFloat(item1.away.average1) + parseFloat(item1.away.average2))*100+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{(parseFloat(item1.away.average1)*item1.away.p).toFixed(0)}}</label>
                                            <label class="graph-label1">{{(parseFloat(item1.away.average2)*item1.away.p).toFixed(0)}}</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time15_S" :style="{'height': item1.away.time15_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time15_C" :style="{'position': 'absolute', 'right': '5px','height': item1.away.time15_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label" style="left: 0;">{{item1.away.time15_S}}%</label>
                                            <label class="graph-label1">{{item1.away.time15_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time30_S" :style="{'height': item1.away.time30_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time30_C" :style="{'position': 'absolute', 'right': '5px','height': item1.away.time30_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.away.time30_S}}%</label>
                                            <label class="graph-label1">{{item1.away.time30_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time45_S" :style="{'height': item1.away.time45_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time45_C" :style="{'position': 'absolute', 'right': '5px','height': item1.away.time45_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.away.time45_S}}%</label>
                                            <label class="graph-label1">{{item1.away.time45_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time60_S" :style="{'height': item1.away.time60_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time60_C" :style="{'position': 'absolute', 'right': '5px','height': item1.away.time60_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.away.time60_S}}%</label>
                                            <label class="graph-label1">{{item1.away.time60_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time75_S" :style="{'height': item1.away.time75_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time75_C" :style="{'position': 'absolute', 'right': '5px','height': item1.away.time75_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.away.time75_S}}%</label>
                                            <label class="graph-label1">{{item1.away.time75_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time90_S" :style="{'height': item1.away.time90_S+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time90_C" :style="{'position': 'absolute', 'right': '5px','height': item1.away.time90_C+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{item1.away.time90_S}}%</label>
                                            <label class="graph-label1">{{item1.away.time90_C}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :title="item1.away.gs1" :style="{'position': 'absolute', 'left': '0','width': item1.away.gs1+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :title="item1.away.gs2" :style="{'position': 'absolute', 'right': '-1px','width': item1.away.gs2+'%', 'background': '#00cc00'}"></div>
                                            <label class="graph-label">{{item1.away.gs1}}%</label>
                                            <label class="graph-label1">{{item1.away.gs2}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :title="item1.away.gc1" :style="{'position': 'absolute', 'left': '0','width': item1.away.gc1+'%', 'background': '#fe9f9f'}"></div>
                                            <div class="graph-inner" :title="item1.away.gc2" :style="{'position': 'absolute', 'right': '-1px','width': item1.away.gc2+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{item1.away.gc1}}%</label>
                                            <label class="graph-label1">{{item1.away.gc2}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%;">
                                        <div class="graph-detail">
                                            <div class="graph-inner" :title="item1.away.over40" :style="{'height': item1.away.over40+'%', 'background': '#655'}"></div>
                                            <label class="graph-label">{{item1.away.over40}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%;">
                                        <div class="graph-detail">
                                            <div class="graph-inner" :title="item1.away.over85" :style="{'height': item1.away.over85+'%', 'background': '#655'}"></div>
                                            <label class="graph-label">{{item1.away.over85}}%</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="event-graph-header">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 30px;">

                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%;">
                                        Team
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        P
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center; position: relative; border-left: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        H
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        D
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        A
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        1-0
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        1-1
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        2-0
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        0-1
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        1-1
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        0-2
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        First
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        Last
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center;">
                                        2+
                                    </div>
                                    <div style="min-width: 40px; float: left; width: 4%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        2-
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        H 1st
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        D 1st
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        A 1st
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 4.5%; text-align: center;">
                                        H 2nd
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        D 2nd
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        A 2nd
                                    </div>

                                </div>
                                <div class="graph1 graph-percent">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 31px; text-align: center;">
                                        H
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 31px;">
                                        {{item1.home.name}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 31px;">
                                        {{item1.home.p}}
                                    </div>
                                    <div class="graph-detail00" style="border-left: 1px solid lightgray;">
                                        {{item1.home.C_H}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.C_D}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.home.C_A}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.first10}}
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.first11}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.home.first20}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.second01}}
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.second11}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.home.second02}}%
                                    </div>
                                    <div v-if="item1.home.p != 0" class="graph-detail00">
                                        {{(item1.home.first10/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div v-if="item1.home.p == 0" class="graph-detail00">
                                        0%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.lastGoal}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.home.secondplus}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.home.secondminus}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        {{item1.home.homefirst}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.home.drawfirst}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        {{item1.home.awayfirst}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.home.homesecond}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.home.drawsecond}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.home.awaysecond}}%
                                    </div>
                                </div>
                                <div class="graph1 graph-percent" style="margin-top: -10px;">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 31px; text-align: center;">
                                        A
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 31px;">
                                        {{item1.away.name}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 31px;">
                                        {{item1.away.p}}
                                    </div>
                                    <div class="graph-detail00" style="border-left: 1px solid lightgray;">
                                        {{item1.away.C_H}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.C_D}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.away.C_A}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.first10}}
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.first11}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.away.first20}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.second01}}
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.second11}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.away.second02}}%
                                    </div>
                                    <div v-if="item1.away.p != 0" class="graph-detail00">
                                        {{(item1.away.second01/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div v-if="item1.away.p == 0" class="graph-detail00">
                                        0%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.lastGoal}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{item1.away.secondplus}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{item1.away.secondminus}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        {{item1.away.homefirst}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.away.drawfirst}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        {{item1.away.awayfirst}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.away.homesecond}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.away.drawsecond}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{item1.away.awaysecond}}%
                                    </div>
                                </div>
                                <div class="graph1 graph-percent0" style="margin-top: -10px;">
                                    <div style="min-width: 190px; float: left; width: 20%; height: 70px; text-align: right; padding-right: 45px;">
                                        Total
                                    </div>
                                    <div v-if="(item1.away.p + item1.home.p) == 0" class="graph-detail00" style="border-left: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b', 'height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="border-left: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b', 'height': ((item1.away.C_H*item1.away.p + item1.home.C_H*item1.home.p)/(item1.away.p + item1.home.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.C_H*item1.away.p + item1.home.C_H*item1.home.p)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.away.p + item1.home.p) == 0" class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.C_D*item1.away.p + item1.home.C_D*item1.home.p)/(item1.away.p + item1.home.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.C_D*item1.away.p + item1.home.C_D*item1.home.p)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.away.p + item1.home.p) == 0" class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.C_A*item1.away.p + item1.home.C_A*item1.home.p)/(item1.away.p + item1.home.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.C_A*item1.away.p + item1.home.C_A*item1.home.p)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.away.p + item1.home.p) == 0" class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.first10/item1.away.p + item1.home.first10/item1.home.p)*50).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.first10*100 + item1.home.first10*100)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.first10 + item1.away.first10) == 0" class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height':'0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.first11*item1.away.first10 + item1.home.first11*item1.home.first10)/(item1.home.first10 + item1.away.first10)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.first11*item1.away.first10 + item1.home.first11*item1.home.first10)/(item1.home.first10 + item1.away.first10)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.first10 + item1.away.first10) == 0" class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.first20*item1.away.first10 + item1.home.first20*item1.home.first10)/(item1.home.first10 + item1.away.first10)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.first20*item1.away.first10 + item1.home.first20*item1.home.first10)/(item1.home.first10 + item1.away.first10)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.away.p + item1.home.p) == 0" class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.second01*100 + item1.home.second01*100)/(item1.away.p + item1.home.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.second01*100 + item1.home.second01*100)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.second01 + item1.away.second01) == 0" class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.second11*item1.away.second01 + item1.home.second11*item1.home.second01)/(item1.home.second01 + item1.away.second01)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.second11*item1.away.second01 + item1.home.second11*item1.home.second01)/(item1.home.second01 + item1.away.second01)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.second01 + item1.away.second01) == 0" class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.second02*item1.away.second01 + item1.home.second02*item1.home.second01)/(item1.home.second01 + item1.away.second01)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.second02*item1.away.second01 + item1.home.second02*item1.home.second01)/(item1.home.second01 + item1.away.second01)).toFixed(0)}}%</label>
                                    </div>

                                    <div class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px; border: none;">

                                        </div>
                                        <label class="graph-label" style="left: 13px"></label>
                                    </div>
                                    <div class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px; border: none;">

                                        </div>
                                        <label class="graph-label" style="left: 13px"></label>
                                    </div>
                                    <div v-if="(item1.home.p + item1.away.p) == 0" class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.secondplus*item1.away.p + item1.home.secondplus*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.secondplus*item1.away.p + item1.home.secondplus*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">0%</label>
                                    </div>
                                    <div v-else class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.secondminus*item1.away.p + item1.home.secondminus*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.secondminus*item1.away.p + item1.home.secondminus*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" style="min-width: 50px; float: left; width: 5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px; position: relative; top: -10px;">0%</label>
                                    </div>
                                    <div v-else style="min-width: 50px; float: left; width: 5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.homefirst*item1.away.p + item1.home.homefirst*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px; position: relative; top: -10px;">{{((item1.away.homefirst*item1.away.p + item1.home.homefirst*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">0%</label>
                                    </div>
                                    <div v-else style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.drawfirst*item1.away.p + item1.home.drawfirst*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.drawfirst*item1.away.p + item1.home.drawfirst*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" style="height: 70px; min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; top: -9px; padding-top: 9px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">0%</label>
                                    </div>
                                    <div v-else style="height: 70px; min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; top: -9px; padding-top: 9px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.awayfirst*item1.away.p + item1.home.awayfirst*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.awayfirst*item1.away.p + item1.home.awayfirst*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" style="min-width: 50px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">0%</label>
                                    </div>
                                    <div v-else style="min-width: 50px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.homesecond*item1.away.p + item1.home.homesecond*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.homesecond*item1.away.p + item1.home.homesecond*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">0%</label>
                                    </div>
                                    <div v-else style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.drawsecond*item1.away.p + item1.home.drawsecond*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.drawsecond*item1.away.p + item1.home.drawsecond*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>

                                    <div v-if="(item1.home.p + item1.away.p) == 0" style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': '0%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">0%</label>
                                    </div>
                                    <div v-else style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.awaysecond*item1.away.p + item1.home.awaysecond*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.awaysecond*item1.away.p + item1.home.awaysecond*item1.home.p)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>
                                </div>
                                <div class="event-graph-header">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 30px;">

                                    </div>
                                    <div style="min-width: 150px; float: left; width: 15%;">
                                        Team
                                    </div>

                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center; position: relative; border-left: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        Pos
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        H/A
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        Swing
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        FH
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        Swing
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        SH
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        Swing
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center;">
                                        Attack
                                    </div>
                                    <div style="min-width: 70px; float: left; width: 7%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        Defense
                                    </div>
                                    <div style="min-width: 80px; float: left; width: 8%; text-align: center;">
                                        Form
                                    </div>
                                    <div style="min-width: 80px; float: left; width: 8%; text-align: center; position: relative; height: 40px; top: -9px; padding-top: 9px;">
                                        H/A Form
                                    </div>
                                </div>
                                <div class="graph1 graph-percent">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 31px; text-align: center;">
                                        H
                                    </div>
                                    <div style="min-width: 150px; float: left; width: 15%; height: 31px;">
                                        {{item1.home.name}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; border-left: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.home.pos}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; min-width: 70px; width: 7%;">
                                        {{item1.home.h_a}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; border-right: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.home.swing1}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; min-width: 70px; width: 7%;">
                                        {{item1.home.FH}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; border-right: 1px solid lightgray;min-width: 70px; width: 7%;">
                                        {{item1.home.swing2}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; min-width: 70px; width: 7%;">
                                        {{item1.home.SH}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; border-right: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.home.swing3}}
                                    </div>
                                    <div class="height: 50px; graph-detail00" style="min-width: 70px; width: 7%;">
                                        {{item1.home.attack}}
                                    </div>
                                    <div class="graph-detail00" style="height: 50px; border-right: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.home.defense}}
                                    </div>
                                    <div style="height: 50px; min-width: 80px; float: left; text-align: center; width: 8%;">
                                        {{item1.home.form}}
                                    </div>
                                    <div style="height: 50px; min-width: 80px; float: left; text-align: center; width: 8%;">
                                        {{item1.home.form_H_A}}
                                    </div>
                                </div>
                                <div class="graph1 graph-percent">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 31px; text-align: center;">
                                        A
                                    </div>
                                    <div style="min-width: 150px; float: left; width: 15%; height: 31px;">
                                        {{item1.away.name}}
                                    </div>
                                    <div class="graph-detail00" style="border-left: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.away.pos}}
                                    </div>
                                    <div class="graph-detail00" style="min-width: 70px; width: 7%;">
                                        {{item1.away.h_a}}
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.away.swing1}}
                                    </div>
                                    <div class="graph-detail00" style="min-width: 70px; width: 7%;">
                                        {{item1.away.FH}}
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;min-width: 70px; width: 7%;">
                                        {{item1.away.swing2}}
                                    </div>
                                    <div class="graph-detail00" style="min-width: 70px; width: 7%;">
                                        {{item1.away.SH}}
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.away.swing3}}
                                    </div>
                                    <div class="graph-detail00" style="min-width: 70px; width: 7%;">
                                        {{item1.away.attack}}
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray; min-width: 70px; width: 7%;">
                                        {{item1.away.defense}}
                                    </div>
                                    <div style="min-width: 80px; float: left; text-align: center; width: 8%;">
                                        {{item1.away.form}}
                                    </div>
                                    <div style="min-width: 80px; float: left; text-align: center; width: 8%;">
                                        {{item1.away.form_H_A}}
                                    </div>
                                </div>
                            </div>
                        </CCollapse>
                    </div>
                </CCollapse>
            </div>
            <b-modal id="modal-center" centered :title="''">
                <CTabs variant="tabs" :active-tab="0">
                    <CTab title="Details">
                        <div v-if="current_modal_data">
                            <div style="display: flex; ">
                                <div style="flex: 1;">
                                    <div style="width: 90%;">
                                        <div style="text-align: center; background: #d6d8d9; font-size: 16px!important; font-size: 12px!important;">{{current_home_name}}</div>
                                        <div style="text-align: center; background: #d6d8d9; font-size: 16px!important; font-weight: 600;">Home</div>
                                        <div style="width: 50%; background: #d6d8d9; float: left; font-size: 14px!important; text-align: center; font-weight: 600;">
                                            HT
                                        </div>
                                        <div style="width: 50%; background: #d6d8d9; float: left;  font-size: 14px!important; text-align: center; font-weight: 600;">
                                            FT
                                        </div>
                                    </div>
                                    <div v-for="item in current_modal_data.home_team_scores">
                                        <div :id = "item.key + '1'" :style="{'width': '42.5%', 'float': 'left', 'text-align': 'center', 'background': item.ht_color, 'margin-bottom': '5px'}">{{item.ht_score}}</div>
                                        <b-tooltip :target="item.key + '1'" v-if="item.goal_tlp != ''" triggers="hover">
                                            <div>{{item.local_name}} V {{item.visitor_name}}</div>
                                            <div>{{item.goal_tlp}}</div>
                                            <div style="font-size: 12px!important;">
                                                {{item.date}}
                                            </div>
                                        </b-tooltip>
                                        <div :id = "item.key" :style="{'width': '42.5%', 'float': 'left', 'text-align': 'center', 'background': item.ft_color, 'margin-bottom': '5px', 'margin-left': '5%'}">{{item.ft_score}}</div>
                                        <b-tooltip :target="item.key" v-if="item.goal_tlp != ''" triggers="hover">
                                            <div>{{item.local_name}} V {{item.visitor_name}}</div>
                                            <div>{{item.goal_tlp}}</div>
                                            <div style="font-size: 12px!important;">
                                                {{item.date}}
                                            </div>
                                        </b-tooltip>
                                    </div>
                                </div>
                                <div style="flex: 1">
                                    <div style="width: 90%;">
                                        <div style="text-align: center; background: #d6d8d9; font-size: 16px!important; font-size: 12px!important;">{{current_away_name}}</div>
                                        <div style="text-align: center; background: #d6d8d9; font-size: 16px!important; font-weight: 600;">Away</div>
                                        <div style="width: 50%; background: #d6d8d9; float: left; font-size: 14px!important; text-align: center; font-weight: 600;">
                                            HT
                                        </div>
                                        <div style="width: 50%; background: #d6d8d9; float: left;  font-size: 14px!important; text-align: center; font-weight: 600;">
                                            FT
                                        </div>
                                    </div>
                                    <div v-for="item in current_modal_data.away_team_scores">
                                        <div :id="item.key + '1'" :style="{'width': '42.5%', 'float': 'left', 'text-align': 'center', 'background': item.ht_color, 'margin-bottom': '5px'}">{{item.ht_score}}</div>
                                        <b-tooltip :target="item.key + '1'" v-if="item.goal_tlp != ''"  triggers="hover">
                                            <div>{{item.local_name}} V {{item.visitor_name}}</div>
                                            <div>{{item.goal_tlp}}</div>
                                            <div style="font-size: 12px!important;">{{item.date}}</div>
                                        </b-tooltip>
                                        <div :id="item.key" :style="{'width': '42.5%', 'float': 'left', 'text-align': 'center', 'background': item.ft_color, 'margin-bottom': '5px', 'margin-left': '5%'}">{{item.ft_score}}</div>
                                        <b-tooltip :target="item.key" v-if="item.goal_tlp != ''"  triggers="hover">
                                            <div>{{item.local_name}} V {{item.visitor_name}}</div>
                                            <div>{{item.goal_tlp}}</div>
                                            <div style="font-size: 12px!important;">{{item.date}}</div>
                                        </b-tooltip>
                                    </div>
                                </div>
                                <div style="flex: 4;">
                                    <div v-for="item0 in current_modal_data.full_time_score_array1">
                                        <div style="text-align: center; background: #fff; font-size: 16px!important; font-weight: 600; display: flex;">
                                            <div style="flex: 3; background: #d6d8d9;">
                                                {{item0.stage_name}}{{item0.group_name}}
                                            </div>
                                            <div style="flex: 1; text-align: center; width:80%; height: 25px; background: #d6d8d9; font-size: 16px!important; font-size: 12px!important;">{{current_home_name}}</div>
                                            <div :style="{'flex': '1', 'text-align': 'center', 'width': '80%', 'height': '25px', 'background': '#d6d8d9', 'font-size': '12px!important'}">{{current_away_name}}</div>
                                        </div>
                                        <div style="text-align: center; background: #d6d8d9; font-size: 16px!important; font-weight: 600; display: flex;">
                                            <div style="flex: 3">
                                                Full Score Table
                                            </div>
                                            <div style="flex: 1; text-align: center; width:80%; background: #d6d8d9; font-size: 16px!important; font-weight: 600;">Home</div>
                                            <div style="flex: 1 ;text-align: center; width:80%; background: #d6d8d9; font-size: 16px!important; font-weight: 600;">Away</div>
                                        </div>
                                        <!--<div v-for="item in item0.standings" style="display: flex;">
                                            <div :style="{'flex': '3', 'text-align': 'left', 'margin-bottom': '5px', 'color': item.color}">{{item.rank}}. {{item.teamName}}</div>
                                            <div style="flex: 1;">
                                                <div :id="item.home_score.key" v-if="item.home_score != null" :style="{'width': '80%', 'background': item.home_score.ft_color, 'text-align': 'center', 'margin-bottom': '5px'}">{{item.home_score.ft_score}}</div>
                                                <div v-else style="width: 80%; background: #cccccc; margin-bottom: 5px; color: #cccccc;"> ...</div>
                                                <b-tooltip v-if="item.home_score != null && item.home_score.goal_tlp != ''" :target="item.home_score.key" triggers="hover">
                                                    <div>{{item.home_score.local_name}} V {{item.home_score.visitor_name}}</div>
                                                    <div>{{item.home_score.goal_tlp}}</div>
                                                    <div style="font-size: 12px!important;">{{item.home_score.date}}</div>
                                                </b-tooltip>
                                            </div>
                                            <div style="flex: 1;">
                                                <div :id="item.away_score.key" v-if="item.away_score != null" :style="{'width': '80%', 'background': item.away_score.ft_color, 'text-align': 'center', 'margin-bottom': '5px', 'float': 'right'}">{{item.away_score.ft_score}}</div>
                                                <div v-else style="width: 80%; background: #cccccc; margin-bottom: 5px; color: #cccccc; float: right;"> ...</div>
                                                <b-tooltip v-if="item.away_score != null && item.away_score.goal_tlp != ''" :target="item.away_score.key" triggers="hover">
                                                    <div>{{item.away_score.local_name}} V {{item.away_score.visitor_name}}</div>
                                                    <div>{{item.away_score.goal_tlp}}</div>
                                                    <div style="font-size: 12px!important;">{{item.away_score.date}}</div>
                                                </b-tooltip>
                                            </div>
                                        </div>-->

                                        <div v-for="item in item0.standings" style="display: flex;">
                                            <div :style="{'flex': '3', 'text-align': 'left', 'margin-bottom': '5px', 'color': item.color}">{{item.rank}}. {{item.teamName}}</div>
                                            <div style="flex: 1;">
                                                <div :id="item.home_score.key" v-if="item.home_score != null" :style="{'width': '80%', 'background': item.home_score.ft_color, 'text-align': 'center', 'margin-bottom': '5px'}">{{item.home_score.ft_score}}</div>
                                                <div v-else style="width: 80%; background: #cccccc; margin-bottom: 5px; color: #cccccc;"> ...</div>
                                                <b-tooltip v-if="item.home_score != null && item.home_score.goal_tlp != ''" :target="item.home_score.key" triggers="hover">
                                                    <div>{{item.home_score.local_name}} V {{item.home_score.visitor_name}}</div>
                                                    <div>{{item.home_score.goal_tlp}}</div>
                                                    <div style="font-size: 12px!important;">{{item.home_score.date}}</div>
                                                </b-tooltip>
                                            </div>
                                            <div style="flex: 1;">
                                                <div :id="item.away_score.key" v-if="item.away_score != null" :style="{'width': '80%', 'background': item.away_score.ft_color, 'text-align': 'center', 'margin-bottom': '5px', 'float': 'right'}">{{item.away_score.ft_score}}</div>
                                                <div v-else style="width: 80%; background: #cccccc; margin-bottom: 5px; color: #cccccc; float: right;"> ...</div>
                                                <b-tooltip v-if="item.away_score != null && item.away_score.goal_tlp != ''" :target="item.away_score.key" triggers="hover">
                                                    <div>{{item.away_score.local_name}} V {{item.away_score.visitor_name}}</div>
                                                    <div>{{item.away_score.goal_tlp}}</div>
                                                    <div style="font-size: 12px!important;">{{item.away_score.date}}</div>
                                                </b-tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CTab>
                    <CTab title="Standings">
                        <div v-if="current_modal_data">
                            <div v-for="item1 in current_modal_data.standing_details">
                                <div style="display: flex;">
                                    <div style="flex: 1;background: lightblue; text-align: center;">#</div>
                                    <div style="flex: 4;background: lightblue;">{{item1.stage_name}}{{item1.group_name}}</div>
                                    <div style="flex: 1; border-left: 1px solid lightgray;background: lightblue; text-align: center">P</div>
                                    <div style="flex: 1;background: lightblue; text-align: center">W</div>
                                    <div style="flex: 1;background: lightblue;text-align: center">D</div>
                                    <div style="flex: 1;background: lightblue;text-align: center">L</div>
                                    <div style="flex: 1;background: lightblue;text-align: center">F</div>
                                    <div style="flex: 1; border-right: 1px solid lightgray;background: lightblue;text-align: center">A</div>
                                    <div style="flex: 1;background: lightblue;text-align: center">GD</div>
                                    <div style="flex: 1;background: lightblue;text-align: center">P</div>
                                </div>
                                <div v-for="(item, index) in item1.positions">
                                    <div v-if="index % 2 == 1"  style="display: flex; background: lightgrey; border: 1px solid white">
                                        <div :id="item.key" :style="{'flex': '1', 'text-align': 'center', 'background': item.color, 'color': item.border, 'font-weight': '600'}">{{item.position}}</div>
                                        <b-tooltip v-if="item.tooltip != null" :target="item.key" triggers="hover">
                                            {{item.tooltip}}
                                        </b-tooltip>
                                        <div style="flex: 4">{{item.name}}</div>
                                        <div style="flex: 1; border-left: 1px solid white; text-align: center">{{item.p}}</div>
                                        <div style="flex: 1; text-align: center">{{item.w}}</div>
                                        <div style="flex: 1; text-align: center">{{item.d}}</div>
                                        <div style="flex: 1; text-align: center">{{item.l}}</div>
                                        <div style="flex: 1; text-align: center">{{item.f}}</div>
                                        <div style="flex: 1; border-right: 1px solid lightgray; text-align: center">{{item.a}}</div>
                                        <div style="flex: 1; text-align: center">{{item.gf}}</div>
                                        <div style="flex: 1; text-align: center">{{item.points}}</div>
                                    </div>
                                    <div v-else style="display: flex; border: 1px solid white">
                                        <div :id="item.key" :style="{'flex': '1', 'text-align': 'center', 'background': item.color, 'color': item.border, 'font-weight': '600'}">{{item.position}}</div>
                                        <b-tooltip v-if="item.tooltip != null" :target="item.key" triggers="hover">
                                            {{item.tooltip}}
                                        </b-tooltip>
                                        <div style="flex: 4">{{item.name}}</div>
                                        <div style="flex: 1; border-left: 1px solid lightgray; text-align: center">{{item.p}}</div>
                                        <div style="flex: 1; text-align: center">{{item.w}}</div>
                                        <div style="flex: 1; text-align: center">{{item.d}}</div>
                                        <div style="flex: 1; text-align: center">{{item.l}}</div>
                                        <div style="flex: 1; text-align: center">{{item.f}}</div>
                                        <div style="flex: 1; border-right: 1px solid lightgray; text-align: center">{{item.a}}</div>
                                        <div style="flex: 1; text-align: center">{{item.gf}}</div>
                                        <div style="flex: 1; text-align: center">{{item.points}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CTab>
                </CTabs>
            </b-modal>
        </CCard>
    </div>
</template>
<script>
    export default {
        name: 'StatsList',
        components: {
        },
        data () {
            return {
                clock: null,
                clock1: null,
                clock2: null,
                clock3: null,
                clock4: null,
                current_week: 0,
                isload: false,
                counter: 100,
                current_counter: 0,
                collapse: false,
                countryCodeList:[
                    {'ccode' : 'AF', 'cname' : 'Afghanistan'},
                    {'ccode' : 'AX', 'cname' : 'Aland Islands'},
                    {'ccode' : 'AL', 'cname' : 'Albania'},
                    {'ccode' : 'DZ', 'cname' : 'Algeria'},
                    {'ccode' : 'AS', 'cname' : 'American Samoa'},
                    {'ccode' : 'AD', 'cname' : 'Andorra'},
                    {'ccode' : 'AO', 'cname' : 'Angola'},
                    {'ccode' : 'AI', 'cname' : 'Anguilla'},
                    {'ccode' : 'AQ', 'cname' : 'Antarctica'},
                    {'ccode' : 'AG', 'cname' : 'Antigua And Barbuda'},
                    {'ccode' : 'AR', 'cname' : 'Argentina'},
                    {'ccode' : 'AM', 'cname' : 'Armenia'},
                    {'ccode' : 'AW', 'cname' : 'Aruba'},
                    {'ccode' : 'AU', 'cname' : 'Australia'},
                    {'ccode' : 'AT', 'cname' : 'Austria'},
                    {'ccode' : 'AZ', 'cname' : 'Azerbaijan'},
                    {'ccode' : 'BS', 'cname' : 'Bahamas'},
                    {'ccode' : 'BH', 'cname' : 'Bahrain'},
                    {'ccode' : 'BD', 'cname' : 'Bangladesh'},
                    {'ccode' : 'BB', 'cname' : 'Barbados'},
                    {'ccode' : 'BY', 'cname' : 'Belarus'},
                    {'ccode' : 'BE', 'cname' : 'Belgium'},
                    {'ccode' : 'BZ', 'cname' : 'Belize'},
                    {'ccode' : 'BJ', 'cname' : 'Benin'},
                    {'ccode' : 'BM', 'cname' : 'Bermuda'},
                    {'ccode' : 'BT', 'cname' : 'Bhutan'},
                    {'ccode' : 'BO', 'cname' : 'Bolivia'},
                    {'ccode' : 'BA', 'cname' : 'Bosnia And Herzegovina'},
                    {'ccode' : 'BW', 'cname' : 'Botswana'},
                    {'ccode' : 'BV', 'cname' : 'Bouvet Island'},
                    {'ccode' : 'BR', 'cname' : 'Brazil'},
                    {'ccode' : 'IO', 'cname' : 'British Indian Ocean Territory'},
                    {'ccode' : 'BN', 'cname' : 'Brunei Darussalam'},
                    {'ccode' : 'BG', 'cname' : 'Bulgaria'},
                    {'ccode' : 'BF', 'cname' : 'Burkina Faso'},
                    {'ccode' : 'BI', 'cname' : 'Burundi'},
                    {'ccode' : 'KH', 'cname' : 'Cambodia'},
                    {'ccode' : 'CM', 'cname' : 'Cameroon'},
                    {'ccode' : 'CA', 'cname' : 'Canada'},
                    {'ccode' : 'CV', 'cname' : 'Cape Verde'},
                    {'ccode' : 'KY', 'cname' : 'Cayman Islands'},
                    {'ccode' : 'CF', 'cname' : 'Central African Republic'},
                    {'ccode' : 'TD', 'cname' : 'Chad'},
                    {'ccode' : 'CL', 'cname' : 'Chile'},
                    {'ccode' : 'CN', 'cname' : 'China'},
                    {'ccode' : 'CX', 'cname' : 'Christmas Island'},
                    {'ccode' : 'CC', 'cname' : 'Cocos (Keeling) Islands'},
                    {'ccode' : 'CO', 'cname' : 'Colombia'},
                    {'ccode' : 'KM', 'cname' : 'Comoros'},
                    {'ccode' : 'CG', 'cname' : 'Congo'},
                    {'ccode' : 'CD', 'cname' : 'Congo, Democratic Republic'},
                    {'ccode' : 'CK', 'cname' : 'Cook Islands'},
                    {'ccode' : 'CR', 'cname' : 'Costa Rica'},
                    {'ccode' : 'CI', 'cname' : 'Cote D\'Ivoire'},
                    {'ccode' : 'HR', 'cname' : 'Croatia'},
                    {'ccode' : 'CU', 'cname' : 'Cuba'},
                    {'ccode' : 'CY', 'cname' : 'Cyprus'},
                    {'ccode' : 'CZ', 'cname' : 'Czech Republic'},
                    {'ccode' : 'DK', 'cname' : 'Denmark'},
                    {'ccode' : 'DJ', 'cname' : 'Djibouti'},
                    {'ccode' : 'DM', 'cname' : 'Dominica'},
                    {'ccode' : 'DO', 'cname' : 'Dominican Republic'},
                    {'ccode' : 'EC', 'cname' : 'Ecuador'},
                    {'ccode' : 'EG', 'cname' : 'Egypt'},
                    {'ccode' : 'SV', 'cname' : 'El Salvador'},
                    {'ccode' : 'GQ', 'cname' : 'Equatorial Guinea'},
                    {'ccode' : 'ER', 'cname' : 'Eritrea'},
                    {'ccode' : 'EE', 'cname' : 'Estonia'},
                    {'ccode' : 'ET', 'cname' : 'Ethiopia'},
                    {'ccode' : 'FK', 'cname' : 'Falkland Islands (Malvinas)'},
                    {'ccode' : 'FO', 'cname' : 'Faroe Islands'},
                    {'ccode' : 'FJ', 'cname' : 'Fiji'},
                    {'ccode' : 'FI', 'cname' : 'Finland'},
                    {'ccode' : 'FR', 'cname' : 'France'},
                    {'ccode' : 'GF', 'cname' : 'French Guiana'},
                    {'ccode' : 'PF', 'cname' : 'French Polynesia'},
                    {'ccode' : 'TF', 'cname' : 'French Southern Territories'},
                    {'ccode' : 'GA', 'cname' : 'Gabon'},
                    {'ccode' : 'GM', 'cname' : 'Gambia'},
                    {'ccode' : 'GE', 'cname' : 'Georgia'},
                    {'ccode' : 'DE', 'cname' : 'Germany'},
                    {'ccode' : 'GH', 'cname' : 'Ghana'},
                    {'ccode' : 'GI', 'cname' : 'Gibraltar'},
                    {'ccode' : 'GR', 'cname' : 'Greece'},
                    {'ccode' : 'GL', 'cname' : 'Greenland'},
                    {'ccode' : 'GD', 'cname' : 'Grenada'},
                    {'ccode' : 'GP', 'cname' : 'Guadeloupe'},
                    {'ccode' : 'GU', 'cname' : 'Guam'},
                    {'ccode' : 'GT', 'cname' : 'Guatemala'},
                    {'ccode' : 'GG', 'cname' : 'Guernsey'},
                    {'ccode' : 'GN', 'cname' : 'Guinea'},
                    {'ccode' : 'GW', 'cname' : 'Guinea-Bissau'},
                    {'ccode' : 'GY', 'cname' : 'Guyana'},
                    {'ccode' : 'HT', 'cname' : 'Haiti'},
                    {'ccode' : 'HM', 'cname' : 'Heard Island & Mcdonald Islands'},
                    {'ccode' : 'VA', 'cname' : 'Holy See (Vatican City State)'},
                    {'ccode' : 'HN', 'cname' : 'Honduras'},
                    {'ccode' : 'HK', 'cname' : 'Hong Kong'},
                    {'ccode' : 'HU', 'cname' : 'Hungary'},
                    {'ccode' : 'IS', 'cname' : 'Iceland'},
                    {'ccode' : 'IN', 'cname' : 'India'},
                    {'ccode' : 'ID', 'cname' : 'Indonesia'},
                    {'ccode' : 'IR', 'cname' : 'Iran, Islamic Republic Of'},
                    {'ccode' : 'IQ', 'cname' : 'Iraq'},
                    {'ccode' : 'IE', 'cname' : 'Ireland'},
                    {'ccode' : 'IM', 'cname' : 'Isle Of Man'},
                    {'ccode' : 'IL', 'cname' : 'Israel'},
                    {'ccode' : 'IT', 'cname' : 'Italy'},
                    {'ccode' : 'JM', 'cname' : 'Jamaica'},
                    {'ccode' : 'JP', 'cname' : 'Japan'},
                    {'ccode' : 'JE', 'cname' : 'Jersey'},
                    {'ccode' : 'JO', 'cname' : 'Jordan'},
                    {'ccode' : 'KZ', 'cname' : 'Kazakhstan'},
                    {'ccode' : 'KE', 'cname' : 'Kenya'},
                    {'ccode' : 'KI', 'cname' : 'Kiribati'},
                    {'ccode' : 'KR', 'cname' : 'Korea'},
                    {'ccode' : 'KW', 'cname' : 'Kuwait'},
                    {'ccode' : 'KG', 'cname' : 'Kyrgyzstan'},
                    {'ccode' : 'LA', 'cname' : 'Lao People\'s Democratic Republic'},
                    {'ccode' : 'LV', 'cname' : 'Latvia'},
                    {'ccode' : 'LB', 'cname' : 'Lebanon'},
                    {'ccode' : 'LS', 'cname' : 'Lesotho'},
                    {'ccode' : 'LR', 'cname' : 'Liberia'},
                    {'ccode' : 'LY', 'cname' : 'Libyan Arab Jamahiriya'},
                    {'ccode' : 'LI', 'cname' : 'Liechtenstein'},
                    {'ccode' : 'LT', 'cname' : 'Lithuania'},
                    {'ccode' : 'LU', 'cname' : 'Luxembourg'},
                    {'ccode' : 'MO', 'cname' : 'Macao'},
                    {'ccode' : 'MK', 'cname' : 'Macedonia'},
                    {'ccode' : 'MG', 'cname' : 'Madagascar'},
                    {'ccode' : 'MW', 'cname' : 'Malawi'},
                    {'ccode' : 'MY', 'cname' : 'Malaysia'},
                    {'ccode' : 'MV', 'cname' : 'Maldives'},
                    {'ccode' : 'ML', 'cname' : 'Mali'},
                    {'ccode' : 'MT', 'cname' : 'Malta'},
                    {'ccode' : 'MH', 'cname' : 'Marshall Islands'},
                    {'ccode' : 'MQ', 'cname' : 'Martinique'},
                    {'ccode' : 'MR', 'cname' : 'Mauritania'},
                    {'ccode' : 'MU', 'cname' : 'Mauritius'},
                    {'ccode' : 'YT', 'cname' : 'Mayotte'},
                    {'ccode' : 'MX', 'cname' : 'Mexico'},
                    {'ccode' : 'FM', 'cname' : 'Micronesia, Federated States Of'},
                    {'ccode' : 'MD', 'cname' : 'Moldova'},
                    {'ccode' : 'MC', 'cname' : 'Monaco'},
                    {'ccode' : 'MN', 'cname' : 'Mongolia'},
                    {'ccode' : 'ME', 'cname' : 'Montenegro'},
                    {'ccode' : 'MS', 'cname' : 'Montserrat'},
                    {'ccode' : 'MA', 'cname' : 'Morocco'},
                    {'ccode' : 'MZ', 'cname' : 'Mozambique'},
                    {'ccode' : 'MM', 'cname' : 'Myanmar'},
                    {'ccode' : 'NA', 'cname' : 'Namibia'},
                    {'ccode' : 'NR', 'cname' : 'Nauru'},
                    {'ccode' : 'NP', 'cname' : 'Nepal'},
                    {'ccode' : 'NL', 'cname' : 'Netherlands'},
                    {'ccode' : 'AN', 'cname' : 'Netherlands Antilles'},
                    {'ccode' : 'NC', 'cname' : 'New Caledonia'},
                    {'ccode' : 'NZ', 'cname' : 'New Zealand'},
                    {'ccode' : 'NI', 'cname' : 'Nicaragua'},
                    {'ccode' : 'NE', 'cname' : 'Niger'},
                    {'ccode' : 'NG', 'cname' : 'Nigeria'},
                    {'ccode' : 'NU', 'cname' : 'Niue'},
                    {'ccode' : 'NF', 'cname' : 'Norfolk Island'},
                    {'ccode' : 'MP', 'cname' : 'Northern Mariana Islands'},
                    {'ccode' : 'NO', 'cname' : 'Norway'},
                    {'ccode' : 'OM', 'cname' : 'Oman'},
                    {'ccode' : 'PK', 'cname' : 'Pakistan'},
                    {'ccode' : 'PW', 'cname' : 'Palau'},
                    {'ccode' : 'PS', 'cname' : 'Palestinian Territory, Occupied'},
                    {'ccode' : 'PA', 'cname' : 'Panama'},
                    {'ccode' : 'PG', 'cname' : 'Papua New Guinea'},
                    {'ccode' : 'PY', 'cname' : 'Paraguay'},
                    {'ccode' : 'PE', 'cname' : 'Peru'},
                    {'ccode' : 'PH', 'cname' : 'Philippines'},
                    {'ccode' : 'PN', 'cname' : 'Pitcairn'},
                    {'ccode' : 'PL', 'cname' : 'Poland'},
                    {'ccode' : 'PT', 'cname' : 'Portugal'},
                    {'ccode' : 'PR', 'cname' : 'Puerto Rico'},
                    {'ccode' : 'QA', 'cname' : 'Qatar'},
                    {'ccode' : 'RE', 'cname' : 'Reunion'},
                    {'ccode' : 'RO', 'cname' : 'Romania'},
                    {'ccode' : 'RU', 'cname' : 'Russian Federation'},
                    {'ccode' : 'RW', 'cname' : 'Rwanda'},
                    {'ccode' : 'BL', 'cname' : 'Saint Barthelemy'},
                    {'ccode' : 'SH', 'cname' : 'Saint Helena'},
                    {'ccode' : 'KN', 'cname' : 'Saint Kitts And Nevis'},
                    {'ccode' : 'LC', 'cname' : 'Saint Lucia'},
                    {'ccode' : 'MF', 'cname' : 'Saint Martin'},
                    {'ccode' : 'PM', 'cname' : 'Saint Pierre And Miquelon'},
                    {'ccode' : 'VC', 'cname' : 'Saint Vincent And Grenadines'},
                    {'ccode' : 'WS', 'cname' : 'Samoa'},
                    {'ccode' : 'SM', 'cname' : 'San Marino'},
                    {'ccode' : 'ST', 'cname' : 'Sao Tome And Principe'},
                    {'ccode' : 'SA', 'cname' : 'Saudi Arabia'},
                    {'ccode' : 'SN', 'cname' : 'Senegal'},
                    {'ccode' : 'CS', 'cname' : 'Serbia'},
                    {'ccode' : 'SC', 'cname' : 'Seychelles'},
                    {'ccode' : 'SL', 'cname' : 'Sierra Leone'},
                    {'ccode' : 'SG', 'cname' : 'Singapore'},
                    {'ccode' : 'SK', 'cname' : 'Slovakia'},
                    {'ccode' : 'SI', 'cname' : 'Slovenia'},
                    {'ccode' : 'SB', 'cname' : 'Solomon Islands'},
                    {'ccode' : 'SO', 'cname' : 'Somalia'},
                    {'ccode' : 'ZA', 'cname' : 'South Africa'},
                    {'ccode' : 'GS', 'cname' : 'South Georgia And Sandwich Isl.'},
                    {'ccode' : 'ES', 'cname' : 'Spain'},
                    {'ccode' : 'LK', 'cname' : 'Sri Lanka'},
                    {'ccode' : 'SD', 'cname' : 'Sudan'},
                    {'ccode' : 'SR', 'cname' : 'Suriname'},
                    {'ccode' : 'SJ', 'cname' : 'Svalbard And Jan Mayen'},
                    {'ccode' : 'SZ', 'cname' : 'Swaziland'},
                    {'ccode' : 'SE', 'cname' : 'Sweden'},
                    {'ccode' : 'CH', 'cname' : 'Switzerland'},
                    {'ccode' : 'SY', 'cname' : 'Syrian Arab Republic'},
                    {'ccode' : 'TW', 'cname' : 'Taiwan'},
                    {'ccode' : 'TJ', 'cname' : 'Tajikistan'},
                    {'ccode' : 'TZ', 'cname' : 'Tanzania'},
                    {'ccode' : 'TH', 'cname' : 'Thailand'},
                    {'ccode' : 'TL', 'cname' : 'Timor-Leste'},
                    {'ccode' : 'TG', 'cname' : 'Togo'},
                    {'ccode' : 'TK', 'cname' : 'Tokelau'},
                    {'ccode' : 'TO', 'cname' : 'Tonga'},
                    {'ccode' : 'TT', 'cname' : 'Trinidad And Tobago'},
                    {'ccode' : 'TN', 'cname' : 'Tunisia'},
                    {'ccode' : 'TR', 'cname' : 'Turkey'},
                    {'ccode' : 'TM', 'cname' : 'Turkmenistan'},
                    {'ccode' : 'TC', 'cname' : 'Turks And Caicos Islands'},
                    {'ccode' : 'TV', 'cname' : 'Tuvalu'},
                    {'ccode' : 'UG', 'cname' : 'Uganda'},
                    {'ccode' : 'UA', 'cname' : 'Ukraine'},
                    {'ccode' : 'AE', 'cname' : 'United Arab Emirates'},
                    {'ccode' : 'GB', 'cname' : 'England'},
                    {'ccode' : 'US', 'cname' : 'United States'},
                    {'ccode' : 'UM', 'cname' : 'United States Outlying Islands'},
                    {'ccode' : 'UY', 'cname' : 'Uruguay'},
                    {'ccode' : 'UZ', 'cname' : 'Uzbekistan'},
                    {'ccode' : 'VU', 'cname' : 'Vanuatu'},
                    {'ccode' : 'VE', 'cname' : 'Venezuela'},
                    {'ccode' : 'VN', 'cname' : 'Viet Nam'},
                    {'ccode' : 'VG', 'cname' : 'Virgin Islands, British'},
                    {'ccode' : 'VI', 'cname' : 'Virgin Islands, U.S.'},
                    {'ccode' : 'WF', 'cname' : 'Wallis And Futuna'},
                    {'ccode' : 'EH', 'cname' : 'Western Sahara'},
                    {'ccode' : 'YE', 'cname' : 'Yemen'},
                    {'ccode' : 'ZM', 'cname' : 'Zambia'},
                    {'ccode' : 'ZW', 'cname' : 'Zimbabwe'}
                ],
                eventList:[],
                collapsed:[],
                collapsed1:[],
                historicArray:[],
                historicResult:[],
                coldMap:[],
                item_X: {},
                leagueIndex: 0,
                eventIndex: 0,
                mainList: [],
                standingList:[],
                mainData:[],
                home_date_list:[],
                away_date_list:[],
                basic_data:[],
                red_FH_check: false,
                red_SH_check: false,
                rankList:[
                    {"value": 1, "label": "vs All"},
                    {"value": 2, "label": "vs High rank"},
                    {"value": 3, "label": "vs middle-high rank"},
                    {"value": 4, "label": "vs middle-low rank"},
                    {"value": 5, "label": "vs low rank"},
                ],
                rank_filter:{},
                home_team:{},
                away_team:{},
                week_set:[
                    {'value': 0 , 'label': 'Monday'},
                    {'value': 1 , 'label': 'Tuesday'},
                    {'value': 2 , 'label': 'Wendnesday'},
                    {'value': 3 , 'label': 'Tursday'},
                    {'value': 4 , 'label': 'Friday'},
                    {'value': 5 , 'label': 'Saturday'},
                    {'value': 6 , 'label': 'Sunday'},
                ],
                week_filter:[],
                lineup_list:[
                    { value: '0', label: 'All'},
                    { value: '4-3-1-2', label: '4-3-1-2'},
                    { value: '4-3-3', label: '4-3-3'},
                    { value: '4-3-2-1', label: '4-3-2-1'},
                    { value: '4-4-2', label: '4-4-2'},
                    { value: '4-2-3-1', label: '4-2-3-1'},
                    { value: '4-4-1-1', label: '4-4-1-1'},
                    { value: '5-4-1', label: '5-4-1'},
                    { value: '3-4-1-2', label: '3-4-1-2'},
                    { value: '3-5-2', label: '3-5-2'},
                    { value: '3-5-1-1', label: '3-5-1-1'},
                    { value: '3-4-2-1', label: '3-4-2-1'},
                    { value: '5-3-2', label: '5-3-2'},
                    { value: '5-3-1-1', label: '5-3-1-1'},
                    { value: '4-5-1', label: '4-5-1'},
                    { value: '4-1-4-1', label: '4-1-4-1'},
                    { value: '4-1-3-2', label: '4-1-3-2'},
                    { value: '3-4-3', label: '3-4-3'},
                    { value: '3-1-4-2', label: '3-1-4-2'}
                ],
                lineup_home_id: null,
                lineup_away_id: null,
                pages: [],
                pagination: false,
                current_page: 1,
                current_date: null,
                max_page_num: 1,
                filter_set: [
                    {"value": 1, "label": "Competition"},
                    {"value": 2, "label": "Time"}
                ],
                current_modal_data : null,
                current_modal_title: null,
                current_home_name: null,
                current_away_name: null,
                filter_key1: '',
                filter_key2: '',
                filter_key3: '',
                filter_key4: '',
                filter_key5: '',
                filter_key6: '',
                filter_key7: '',
                filter_key8: ''
            }
        },
        methods: {
            showModal() {
                this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
            },
            hideModal() {
                this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
            },
            replace_modal_data(home_id, away_id){
                for(let u = 0 ; u < this.mainList.length ; u++) {
                    for (let uu = 0; uu < this.mainList[u].events.length; uu++) {
                        if (home_id == this.mainList[u].events[uu].home_id && away_id == this.mainList[u].events[uu].away_id) {
                            this.current_modal_data = this.mainList[u].events[uu].spots
                        }
                    }
                }
                console.log('this.current_modal_data=>>>>>>>>>>>>>', this.current_modal_data)
            },
            create_UUID(){
                var dt = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (dt + Math.random()*16)%16 | 0;
                    dt = Math.floor(dt/16);
                    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
                });
                return uuid
            },
            isCollapsed(id){
                return this.collapsed.indexOf(id)>-1?true:false;
            },
            SetCollapse(id){
                if (this.isCollapsed(id)){
                    this.collapsed.splice(this.collapsed.indexOf(id), 1)
                }
                else{
                    this.collapsed.push(id)
                }
                console.log(this.collapsed)
            },
            isCollapsed1(id){
                return this.collapsed1.indexOf(id)>-1?true:false;
            },
            SetCollapse1(id){
                if (this.isCollapsed1(id)){
                    this.collapsed1.splice(this.collapsed.indexOf(id), 1)
                }
                else{
                    this.collapsed1.push(id)
                }
            },
            isPlus(id){
                return this.collapsed.indexOf(id)>-1?false:true;
            },
            isMinus(id){
                return this.collapsed.indexOf(id)>-1?true:false;
            },
            next_pagination(){
                this.current_page = this.current_page + 1
                this.readData(this.current_date)
            },
            prev_pagination(){
                this.current_page = this.current_page - 1
                if(this.current_page < 1){
                    this.current_page = 1
                }
                this.readData(this.current_date)
            },
            h_a_calculation(standings, team_id, d){
                let p = 0
                if (standings.length == 0)
                    return '-'
                let season_data = standings[0].standings
                let home_away_table = {
                    "home": [],
                    "away": []
                }

                for(let i = 0 ; i < season_data.length ; i++){
                    let home_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "over": null,
                        "home": {
                            "p": null,
                            "w": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "d": null,
                        "last": {
                            "d": null,
                            "points": null,
                        },
                        "f": null,
                        "av": null,
                        "gd": null,
                    }
                    let away_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "over": null,
                        "away": {
                            "p": null,
                            "w": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "d": null,
                        "last": {
                            "d": null,
                            "points": null,
                        },
                        "f": null,
                        "av": null,
                        "gd": null,
                    }
                    if(season_data[i].home != null){
                        home_team_data.home.p = season_data[i].home.games_played
                        home_team_data.team_name = season_data[i].team_name
                        home_team_data.team_id = season_data[i].team_id
                        home_team_data.home.w = season_data[i].home.won
                        home_team_data.d = season_data[i].home.draw
                        home_team_data.home.l = season_data[i].home.lost
                        home_team_data.home.f = season_data[i].home.goals_scored
                        home_team_data.f = season_data[i].home.goals_scored
                        home_team_data.home.a = season_data[i].home.goals_against
                        home_team_data.last.d = season_data[i].home.goals_scored - season_data[i].home.goals_against
                        home_team_data.gd = season_data[i].home.goals_scored - season_data[i].home.goals_against
                        home_team_data.last.points = home_team_data.home.w*3 + home_team_data.d
                        home_team_data.av = (home_team_data.last.points/home_team_data.home.p).toFixed(2)
                    }
                    if(season_data[i].away != null){
                        away_team_data.away.p = season_data[i].away.games_played
                        away_team_data.team_name = season_data[i].team_name
                        away_team_data.team_id = season_data[i].team_id
                        away_team_data.away.w = season_data[i].away.won
                        away_team_data.d = season_data[i].away.draw
                        away_team_data.away.l = season_data[i].away.lost
                        away_team_data.away.f = season_data[i].away.goals_scored
                        away_team_data.f = season_data[i].away.goals_scored
                        away_team_data.away.a = season_data[i].away.goals_against
                        away_team_data.last.d = season_data[i].away.goals_scored - season_data[i].away.goals_against
                        away_team_data.gd = season_data[i].away.goals_scored - season_data[i].away.goals_against
                        away_team_data.last.points = away_team_data.away.w*3 + away_team_data.d
                        away_team_data.av = (away_team_data.last.points/away_team_data.away.p).toFixed(2)
                    }
                    home_away_table.home.push(home_team_data)
                    home_away_table.away.push(away_team_data)
                }

                this.sortJSON1(home_away_table.home,'av', '123');
                this.sortJSON1(home_away_table.away,'av', '123');

                let new_away_table1 = []
                for(let j = 0 ; j < home_away_table.home.length ; j++){
                    let len = home_away_table.home.filter(function(item) {
                        return item.av == home_away_table.home[j].av
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            home_away_table.home[p] = len[p - j]
                            new_away_table1.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table1.push(home_away_table.home[j])
                    }
                }
                home_away_table.home = new_away_table1

                let new_away_table2 = []
                for(let j = 0 ; j < home_away_table.home.length ; j++){
                    let len = home_away_table.home.filter(function(item) {
                        return (item.av == home_away_table.home[j].av && item.gd == home_away_table.home[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            home_away_table.home[p] = len[p - j]
                            new_away_table2.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table2.push(home_away_table.home[j])
                    }
                }
                home_away_table.home = new_away_table2

                let new_away_table = []
                for(let j = 0 ; j < home_away_table.away.length ; j++){
                    let len = home_away_table.away.filter(function(item) {
                        return item.av == home_away_table.away[j].av
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            home_away_table.away[p] = len[p - j]
                            new_away_table.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table.push(home_away_table.away[j])
                    }
                }
                home_away_table.away = new_away_table

                let new_away_table3 = []
                for(let j = 0 ; j < home_away_table.away.length ; j++){
                    let len = home_away_table.away.filter(function(item) {
                        return (item.av == home_away_table.away[j].av && item.gd == home_away_table.away[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            home_away_table.away[p] = len[p - j]
                            new_away_table3.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table3.push(home_away_table.away[j])
                    }
                }
                home_away_table.away = new_away_table3

                for(let j = 0 ; j < home_away_table.home.length ; j++){
                    if(home_away_table.home[j].team_id == team_id && d == '1'){
                        p = j + 1
                    }
                }
                for(let j = 0 ; j < home_away_table.away.length ; j++){
                    if(home_away_table.away[j].team_id == team_id && d == '2'){
                        p = j + 1
                    }
                }
                return p
            },
            first_half_p(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                p++
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            first_half_w(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && local_score > visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && local_score < visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            first_half_d(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && local_score == visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && local_score == visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            first_half_l(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && local_score < visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && local_score > visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            first_half_f(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                if(events[i].events[j].localteamId == team_id){
                                    p += local_score
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id){
                                    p += visitor_score
                                }
                            }
                        }
                    }
                }
                return p
            },
            first_half_a(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id){
                                    p += visitor_score
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                if(events[i].events[j].visitorteamId == team_id){
                                    p += local_score
                                }
                            }
                        }
                    }
                }
                return p
            },
            f_h_calculation(standings, events, team_id, d){
                console.log('----team id', team_id)
                console.log('----d', d)
                let ppp = 1
                if (standings.length == 0)
                    return '-'
                let season_data = standings[0].standings
                let first_half = {
                    "home": [],
                    "away": []
                }
                for (let i = 0; i < season_data.length; i++) {
                    let home_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "over": null,
                        "home": {
                            "p": null,
                            "w": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "d": null,
                        "last": {
                            "d": null,
                            "points": null,
                        },
                        "f": null,
                        "av": null,
                        "gd": null,
                    }
                    let away_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "over": null,
                        "away": {
                            "p": null,
                            "w": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "d": null,
                        "last": {
                            "d": null,
                            "points": null,
                        },
                        "f": null,
                        "av": null,
                        "gd": null,
                    }

                    home_team_data.team_name = season_data[i].team_name
                    home_team_data.team_id = season_data[i].team_id

                    away_team_data.team_name = season_data[i].team_name
                    away_team_data.team_id = season_data[i].team_id
                    first_half.home.push(home_team_data)
                    first_half.away.push(away_team_data)
                }

                for(let i = 0 ; i < first_half.home.length ; i++){
                    first_half.home[i].home.p = this.first_half_p(first_half.home[i].team_id, events, '1')
                    first_half.away[i].away.p = this.first_half_p(first_half.away[i].team_id, events, '2')
                    first_half.home[i].home.w = this.first_half_w(first_half.home[i].team_id, events, '1')
                    first_half.away[i].away.w = this.first_half_w(first_half.away[i].team_id, events, '2')
                    first_half.home[i].d = this.first_half_d(first_half.home[i].team_id, events, '1')
                    first_half.away[i].d = this.first_half_d(first_half.away[i].team_id, events, '2')
                    first_half.home[i].home.l = this.first_half_l(first_half.home[i].team_id, events, '1')
                    first_half.away[i].away.l = this.first_half_l(first_half.away[i].team_id, events, '2')
                    first_half.home[i].home.f = this.first_half_f(first_half.home[i].team_id, events, '1')
                    first_half.home[i].f = this.first_half_f(first_half.home[i].team_id, events, '1')
                    first_half.away[i].away.f = this.first_half_f(first_half.away[i].team_id, events, '2')
                    first_half.away[i].f = this.first_half_f(first_half.away[i].team_id, events, '2')
                    first_half.home[i].home.a = this.first_half_a(first_half.home[i].team_id, events, '1')
                    first_half.away[i].away.a = this.first_half_a(first_half.away[i].team_id, events, '2')
                    first_half.home[i].last.d = first_half.home[i].home.f - first_half.home[i].home.a
                    first_half.away[i].last.d = first_half.away[i].away.f - first_half.away[i].away.a
                    first_half.home[i].gd = first_half.home[i].home.f - first_half.home[i].home.a
                    first_half.away[i].gd = first_half.away[i].away.f - first_half.away[i].away.a
                    first_half.home[i].last.points = this.first_half_w(first_half.home[i].team_id, events, '1')*3 + this.first_half_d(first_half.home[i].team_id, events, '1')
                    first_half.away[i].last.points = this.first_half_w(first_half.home[i].team_id, events, '2')*3 + this.first_half_d(first_half.home[i].team_id, events, '2')
                    first_half.home[i].av = (first_half.home[i].last.points/first_half.home[i].home.p).toFixed(2)
                    first_half.away[i].av = (first_half.away[i].last.points/first_half.away[i].away.p).toFixed(2)
                }

                this.sortJSON1(first_half.home, 'av', '123')
                this.sortJSON1(first_half.away, 'av', '123')

                let new_away_table1 = []
                for(let j = 0 ; j < first_half.home.length ; j++){
                    let len = first_half.home.filter(function(item) {
                        return item.av == first_half.home[j].av
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            first_half.home[p] = len[p - j]
                            new_away_table1.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table1.push(first_half.home[j])
                    }
                }
                first_half.home = new_away_table1

                let new_away_table2 = []
                for(let j = 0 ; j < first_half.home.length ; j++){
                    let len = first_half.home.filter(function(item) {
                        return (item.av == first_half.home[j].av && item.gd == first_half.home[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'f', '123')
                        for(let p = j ; p < j + len.length ; p++){
                            first_half.home[p] = len[p - j]
                            new_away_table2.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table2.push(first_half.home[j])
                    }
                }
                first_half.home = new_away_table2

                let new_away_table = []
                for(let j = 0 ; j < first_half.away.length ; j++){
                    let len = first_half.away.filter(function(item) {
                        return item.av == first_half.away[j].av
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            first_half.away[p] = len[p - j]
                            new_away_table.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table.push(first_half.away[j])
                    }
                }
                first_half.away = new_away_table

                let new_away_table3 = []
                for(let j = 0 ; j < first_half.away.length ; j++){
                    let len = first_half.away.filter(function(item) {
                        return (item.av == first_half.away[j].av && item.gd == first_half.away[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            first_half.away[p] = len[p - j]
                            new_away_table3.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table3.push(first_half.away[j])
                    }
                }
                first_half.away = new_away_table3

                console.log("first half=>", first_half)
                for(let j = 0 ; j < first_half.home.length ; j++){
                    if(first_half.home[j].team_id == team_id && d == '1'){
                        ppp = j + 1;
                        console.log('------ home team', j)
                    }
                }
                for(let j = 0 ; j < first_half.away.length ; j++){
                    if(first_half.away[j].team_id == team_id && d == '2'){
                        ppp = j + 1;
                        console.log('------ away team', j)
                    }
                }
                console.log('------ppp', ppp)
                return ppp
            },
            second_half_p(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                p++
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            second_half_w(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let local_score = local_score1 - local_score2
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].localteamId == team_id && local_score > visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let local_score = local_score1 - local_score2
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].visitorteamId == team_id && local_score < visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            second_half_d(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let local_score = local_score1 - local_score2
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].localteamId == team_id && local_score == visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let local_score = local_score1 - local_score2
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].visitorteamId == team_id && local_score == visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            second_half_l(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let local_score = local_score1 - local_score2
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].localteamId == team_id && local_score < visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let local_score = local_score1 - local_score2
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].visitorteamId == team_id && local_score > visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            second_half_f(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let local_score = local_score1 - local_score2
                                if(events[i].events[j].localteamId == team_id){
                                    p += local_score
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].visitorteamId == team_id){
                                    p += visitor_score
                                }
                            }
                        }
                    }
                }
                return p
            },
            second_half_a(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].localteamId == team_id){
                                    p += visitor_score
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let local_score = local_score1 - local_score2
                                if(events[i].events[j].visitorteamId == team_id){
                                    p += local_score
                                }
                            }
                        }
                    }
                }
                return p
            },
            s_h_calculation(standings, events, team_id, d){
                let p = 1
                if (standings.length == 0)
                    return '-'
                let season_data = standings[0].standings
                let second_half = {
                    "home": [],
                    "away": []
                }
                for (let i = 0; i < season_data.length; i++) {
                    let home_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "over": null,
                        "home": {
                            "p": null,
                            "w": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "d": null,
                        "last": {
                            "d": null,
                            "points": null,
                        },
                        "f": null,
                        "av": null,
                        "gd": null,
                    }
                    let away_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "over": null,
                        "away": {
                            "p": null,
                            "w": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "d": null,
                        "last": {
                            "d": null,
                            "points": null,
                        },
                        "f": null,
                        "av": null,
                        "gd": null,
                    }

                    home_team_data.team_name = season_data[i].team_name
                    home_team_data.team_id = season_data[i].team_id

                    away_team_data.team_name = season_data[i].team_name
                    away_team_data.team_id = season_data[i].team_id
                    second_half.home.push(home_team_data)
                    second_half.away.push(away_team_data)
                }

                for(let i = 0 ; i < second_half.home.length ; i++){
                    second_half.home[i].home.p = this.second_half_p(second_half.home[i].team_id, events, '1')
                    second_half.away[i].away.p = this.second_half_p(second_half.away[i].team_id, events, '2')
                    second_half.home[i].home.w = this.second_half_w(second_half.home[i].team_id, events, '1')
                    second_half.away[i].away.w = this.second_half_w(second_half.away[i].team_id, events, '2')
                    second_half.home[i].d = this.second_half_d(second_half.home[i].team_id, events, '1')
                    second_half.away[i].d = this.second_half_d(second_half.away[i].team_id, events, '2')
                    second_half.home[i].home.l = this.second_half_l(second_half.home[i].team_id, events, '1')
                    second_half.away[i].away.l = this.second_half_l(second_half.away[i].team_id, events, '2')
                    second_half.home[i].home.f = this.second_half_f(second_half.home[i].team_id, events, '1')
                    second_half.home[i].f = this.second_half_f(second_half.home[i].team_id, events, '1')
                    second_half.away[i].away.f = this.second_half_f(second_half.away[i].team_id, events, '2')
                    second_half.away[i].f = this.second_half_f(second_half.away[i].team_id, events, '2')
                    second_half.home[i].home.a = this.second_half_a(second_half.home[i].team_id, events, '1')
                    second_half.away[i].away.a = this.second_half_a(second_half.away[i].team_id, events, '2')
                    second_half.home[i].last.d = second_half.home[i].home.f - second_half.home[i].home.a
                    second_half.away[i].last.d = second_half.away[i].away.f - second_half.away[i].away.a
                    second_half.home[i].gd = second_half.home[i].home.f - second_half.home[i].home.a
                    second_half.away[i].gd = second_half.away[i].away.f - second_half.away[i].away.a
                    second_half.home[i].last.points = this.second_half_w(second_half.home[i].team_id, events, '1')*3 + this.second_half_d(second_half.home[i].team_id, events, '1')
                    second_half.away[i].last.points = this.second_half_w(second_half.home[i].team_id, events, '2')*3 + this.second_half_d(second_half.home[i].team_id, events, '2')
                    second_half.home[i].av = (second_half.home[i].last.points/second_half.home[i].home.p).toFixed(2)
                    second_half.away[i].av = (second_half.away[i].last.points/second_half.away[i].away.p).toFixed(2)
                }

                this.sortJSON1(second_half.home, 'av', '123');
                this.sortJSON1(second_half.away, 'av', '123');

                let new_away_table1 = []
                for(let j = 0 ; j < second_half.home.length ; j++){
                    let len = second_half.home.filter(function(item) {
                        return item.av == second_half.home[j].av
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            second_half.home[p] = len[p - j]
                            new_away_table1.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table1.push(second_half.home[j])
                    }
                }
                second_half.home = new_away_table1

                let new_away_table2 = []
                for(let j = 0 ; j < second_half.home.length ; j++){
                    let len = second_half.home.filter(function(item) {
                        return (item.av == second_half.home[j].av && item.gd == second_half.home[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            second_half.home[p] = len[p - j]
                            new_away_table2.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table2.push(second_half.home[j])
                    }
                }
                second_half.home = new_away_table2

                let new_away_table = []
                for(let j = 0 ; j < second_half.away.length ; j++){
                    let len = second_half.away.filter(function(item) {
                        return item.av == second_half.away[j].av
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            second_half.away[p] = len[p - j]
                            new_away_table.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table.push(second_half.away[j])
                    }
                }
                second_half.away = new_away_table

                let new_away_table3 = []
                for(let j = 0 ; j < second_half.away.length ; j++){
                    let len = second_half.away.filter(function(item) {
                        return (item.av == second_half.away[j].av && item.gd == second_half.away[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            second_half.away[p] = len[p - j]
                            new_away_table3.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table3.push(second_half.away[j])
                    }
                }
                second_half.away = new_away_table3

                for(let j = 0 ; j < second_half.home.length ; j++){
                    if(second_half.home[j].team_id == team_id && d == '1'){
                        p = j + 1
                    }
                }
                for(let j = 0 ; j < second_half.away.length ; j++){
                    if(second_half.away[j].team_id == team_id && d == '2'){
                        p = j + 1
                    }
                }
                return p
            },
            att_calculation(standings, team_id, d){
                let p = 1
                if (standings.length == 0)
                    return '-'
                let full_table = []
                let home_A_away_D = {
                    "home": [],
                    "away": []
                }

                let season_data = standings[0].standings
                for(let i = 0 ; i < season_data.length ; i++){
                    let new_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "total": {
                            "p": null,
                            "w": null,
                            "d": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "home": {
                            "p": null,
                            "w": null,
                            "d": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "away": {
                            "p": null,
                            "w": null,
                            "d": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "last": {
                            "d": null,
                            "points": null,
                        },
                        "f": null,
                        "gd": null,
                        "points": null
                    }
                    if(season_data[i].overall != null){
                        new_team_data.total.p = season_data[i].overall.games_played
                        new_team_data.total.w = season_data[i].overall.won
                        new_team_data.total.d = season_data[i].overall.draw
                        new_team_data.total.l = season_data[i].overall.lost
                        new_team_data.total.f = season_data[i].overall.goals_scored
                        new_team_data.total.a = season_data[i].overall.goals_against
                    }
                    if(season_data[i].home != null){
                        new_team_data.home.p = season_data[i].home.games_played
                        new_team_data.home.w = season_data[i].home.won
                        new_team_data.home.d = season_data[i].home.draw
                        new_team_data.home.l = season_data[i].home.lost
                        new_team_data.home.f = season_data[i].home.goals_scored
                        new_team_data.home.a = season_data[i].home.goals_against
                    }
                    if(season_data[i].away != null){
                        new_team_data.away.p = season_data[i].away.games_played
                        new_team_data.away.w = season_data[i].away.won
                        new_team_data.away.d = season_data[i].away.draw
                        new_team_data.away.l = season_data[i].away.lost
                        new_team_data.away.f = season_data[i].away.goals_scored
                        new_team_data.away.a = season_data[i].away.goals_against
                    }
                    new_team_data.last.points = season_data[i].points
                    new_team_data.last.d = season_data[i].total.goal_difference
                    new_team_data.team_name = season_data[i].team_name
                    new_team_data.team_id = season_data[i].team_id
                    new_team_data.f = new_team_data.total.f
                    new_team_data.gd = new_team_data.last.d
                    new_team_data.points = new_team_data.last.points
                    full_table.push(new_team_data)
                }

                for(let i = 0 ; i < full_table.length ; i++){
                    let home_team_data = {
                        "id": this.create_UUID(),
                        "team_name": full_table[i].team_name,
                        "team_id": full_table[i].team_id,
                        "over": null,
                        "p": full_table[i].home.p,
                        "f": full_table[i].home.f,
                        "gd": full_table[i].home.f - full_table[i].home.a,
                        "av": (full_table[i].home.f/full_table[i].home.p).toFixed(2),
                    }
                    let away_team_data = {
                        "id": this.create_UUID(),
                        "team_name": full_table[i].team_name,
                        "team_id": full_table[i].team_id,
                        "over": null,
                        "p": full_table[i].away.p,
                        "f": full_table[i].away.a,
                        "gd": full_table[i].away.f - full_table[i].away.a,
                        "av": (full_table[i].away.a/full_table[i].away.p).toFixed(2),
                    }
                    home_A_away_D.home.push(home_team_data)
                    home_A_away_D.away.push(away_team_data)
                }
                // console.log("season data=>", home_A_away_D)
                this.sortJSON1(home_A_away_D.home, 'av', '123')
                this.sortJSON(home_A_away_D.away, 'av', '123')

                let new_away_table1 = []
                for(let j = 0 ; j < home_A_away_D.home.length ; j++){
                    let len = home_A_away_D.home.filter(function(item) {
                        return item.av == home_A_away_D.home[j].av
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            home_A_away_D.home[p] = len[p - j]
                            new_away_table1.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table1.push(home_A_away_D.home[j])
                    }
                }
                home_A_away_D.home = new_away_table1

                let new_away_table2 = []
                for(let j = 0 ; j < home_A_away_D.home.length ; j++){
                    let len = home_A_away_D.home.filter(function(item) {
                        return (item.av == home_A_away_D.home[j].av && item.gd == home_A_away_D.home[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            home_A_away_D.home[p] = len[p - j]
                            new_away_table2.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table2.push(home_A_away_D.home[j])
                    }
                }
                home_A_away_D.home = new_away_table2

                let new_away_table = []
                for(let j = 0 ; j < home_A_away_D.away.length ; j++){
                    let len = home_A_away_D.away.filter(function(item) {
                        return item.av == home_A_away_D.away[j].av
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            home_A_away_D.away[p] = len[p - j]
                            new_away_table.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table.push(home_A_away_D.away[j])
                    }
                }
                home_A_away_D.away = new_away_table

                let new_away_table3 = []
                for(let j = 0 ; j < home_A_away_D.away.length ; j++){
                    let len = home_A_away_D.away.filter(function(item) {
                        return (item.av == home_A_away_D.away[j].av && item.gd == home_A_away_D.away[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            home_A_away_D.away[p] = len[p - j]
                            new_away_table3.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table3.push(home_A_away_D.away[j])
                    }
                }
                home_A_away_D.away = new_away_table3

                for(let j = 0 ; j < home_A_away_D.home.length ; j++){
                    if(home_A_away_D.home[j].team_id == team_id && d == '1'){
                        p = j + 1
                    }
                }
                for(let j = 0 ; j < home_A_away_D.home.length ; j++){
                    if(home_A_away_D.away[j].team_id == team_id && d == '2'){
                        p = j + 1
                    }
                }
                // console.log("season data=>", p)
                return p
            },
            def_calculation(standings, team_id, d){

                let p = 1
                if (standings.length == 0)
                    return '-'
                let full_table = []
                let home_D_away_A = {
                    "home": [],
                    "away": []
                }
                let season_data = standings[0].standings
                for(let i = 0 ; i < season_data.length ; i++){
                    let new_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "total": {
                            "p": null,
                            "w": null,
                            "d": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "home": {
                            "p": null,
                            "w": null,
                            "d": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "away": {
                            "p": null,
                            "w": null,
                            "d": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "last": {
                            "d": null,
                            "points": null,
                        },
                        "f": null,
                        "gd": null,
                        "points": null
                    }
                    if(season_data[i].overall != null){
                        new_team_data.total.p = season_data[i].overall.games_played
                        new_team_data.total.w = season_data[i].overall.won
                        new_team_data.total.d = season_data[i].overall.draw
                        new_team_data.total.l = season_data[i].overall.lost
                        new_team_data.total.f = season_data[i].overall.goals_scored
                        new_team_data.total.a = season_data[i].overall.goals_against
                    }
                    if(season_data[i].home != null){
                        new_team_data.home.p = season_data[i].home.games_played
                        new_team_data.home.w = season_data[i].home.won
                        new_team_data.home.d = season_data[i].home.draw
                        new_team_data.home.l = season_data[i].home.lost
                        new_team_data.home.f = season_data[i].home.goals_scored
                        new_team_data.home.a = season_data[i].home.goals_against
                    }
                    if(season_data[i].away != null){
                        new_team_data.away.p = season_data[i].away.games_played
                        new_team_data.away.w = season_data[i].away.won
                        new_team_data.away.d = season_data[i].away.draw
                        new_team_data.away.l = season_data[i].away.lost
                        new_team_data.away.f = season_data[i].away.goals_scored
                        new_team_data.away.a = season_data[i].away.goals_against
                    }
                    new_team_data.last.points = season_data[i].points
                    new_team_data.last.d = season_data[i].total.goal_difference
                    new_team_data.team_name = season_data[i].team_name
                    new_team_data.team_id = season_data[i].team_id
                    new_team_data.f = new_team_data.total.f
                    new_team_data.gd = new_team_data.last.d
                    new_team_data.points = new_team_data.last.points
                    full_table.push(new_team_data)
                }

                for(let i = 0 ; i < full_table.length ; i++){
                    let home_team_data = {
                        "id": this.create_UUID(),
                        "team_name": full_table[i].team_name,
                        "team_id": full_table[i].team_id,
                        "over": null,
                        "p": full_table[i].home.p,
                        "f": full_table[i].home.a,
                        "gd": full_table[i].home.f - full_table[i].home.a,
                        "av": (full_table[i].home.a/full_table[i].home.p).toFixed(2),
                    }
                    let away_team_data = {
                        "id": this.create_UUID(),
                        "team_name": full_table[i].team_name,
                        "team_id": full_table[i].team_id,
                        "over": null,
                        "p": full_table[i].away.p,
                        "f": full_table[i].away.f,
                        "gd": full_table[i].away.f - full_table[i].away.a,
                        "av": (full_table[i].away.f/full_table[i].away.p).toFixed(2),
                    }
                    home_D_away_A.home.push(home_team_data)
                    home_D_away_A.away.push(away_team_data)
                }

                this.sortJSON(home_D_away_A.home, 'av', '123')
                this.sortJSON1(home_D_away_A.away, 'av', '123')


                let new_away_table1 = []
                for(let j = 0 ; j < home_D_away_A.home.length ; j++){
                    let len = home_D_away_A.home.filter(function(item) {
                        return item.av == home_D_away_A.home[j].av
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            home_D_away_A.home[p] = len[p - j]
                            new_away_table1.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table1.push(home_D_away_A.home[j])
                    }
                }
                home_D_away_A.home = new_away_table1

                let new_away_table2 = []
                for(let j = 0 ; j < home_D_away_A.home.length ; j++){
                    let len = home_D_away_A.home.filter(function(item) {
                        return (item.av == home_D_away_A.home[j].av && item.gd == home_D_away_A.home[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            home_D_away_A.home[p] = len[p - j]
                            new_away_table2.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table2.push(home_D_away_A.home[j])
                    }
                }
                home_D_away_A.home = new_away_table2

                let new_away_table = []
                for(let j = 0 ; j < home_D_away_A.away.length ; j++){
                    let len = home_D_away_A.away.filter(function(item) {
                        return item.av == home_D_away_A.away[j].av
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            home_D_away_A.away[p] = len[p - j]
                            new_away_table.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table.push(home_D_away_A.away[j])
                    }
                }
                home_D_away_A.away = new_away_table

                let new_away_table3 = []
                for(let j = 0 ; j < home_D_away_A.away.length ; j++){
                    let len = home_D_away_A.away.filter(function(item) {
                        return (item.av == home_D_away_A.away[j].av && item.gd == home_D_away_A.away[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            home_D_away_A.away[p] = len[p - j]
                            new_away_table3.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table3.push(home_D_away_A.away[j])
                    }
                }
                home_D_away_A.away = new_away_table3

                for(let j = 0 ; j < home_D_away_A.home.length ; j++){
                    if(home_D_away_A.home[j].team_id == team_id && d == '1'){
                        p = j + 1
                    }
                }

                for(let j = 0 ; j < home_D_away_A.away.length ; j++){
                    if(home_D_away_A.away[j].team_id == team_id && d == '2'){
                        p = j + 1
                    }
                }
                return p
            },
            overall_p(team_id, events, d){
                let p = 0
                let new_event_arr = []
                for(let i = 0 ; i < events.length ; i++){
                    for(let j = 0 ; j < events[i].events.length ; j++){
                        if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                            new_event_arr.push(events[i].events[j])
                        }
                    }
                }
                this.sortJSON1(new_event_arr,'date', '123');
                if(d === '1'){
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        if(p > 5){ break }
                        p++
                    }
                }
                else{
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        if(p > 11){ break }
                        p++
                    }
                }
                return p
            },
            overall_w(team_id, events, d){
                let p = 0
                let new_event_arr = []
                for(let i = 0 ; i < events.length ; i++){
                    for(let j = 0 ; j < events[i].events.length ; j++){
                        if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                            new_event_arr.push(events[i].events[j])
                        }
                    }
                }
                this.sortJSON1(new_event_arr,'date', '123');
                let p1 = 0
                if(d === '1'){
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 6){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if((new_event_arr[i].localteamId == team_id && local_score > visitor_score) || (new_event_arr[i].visitorteamId == team_id && local_score < visitor_score)){
                                p++
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 12){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if((new_event_arr[i].localteamId == team_id && local_score > visitor_score) || (new_event_arr[i].visitorteamId == team_id && local_score < visitor_score)){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            overall_d(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                for(let i = 0 ; i < events.length ; i++){
                    for(let j = 0 ; j < events[i].events.length ; j++){
                        if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                            new_event_arr.push(events[i].events[j])
                        }
                    }
                }
                this.sortJSON1(new_event_arr,'date', '123');
                if(d === '1'){
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 6){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if(local_score == visitor_score){
                                p++
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 12){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if(local_score == visitor_score){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            overall_l(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                for(let i = 0 ; i < events.length ; i++){
                    for(let j = 0 ; j < events[i].events.length ; j++){
                        if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                            new_event_arr.push(events[i].events[j])
                        }
                    }
                }
                this.sortJSON1(new_event_arr,'date', '123');
                if(d === '1'){
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 6){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if((new_event_arr[i].localteamId == team_id && local_score < visitor_score) || (new_event_arr[i].visitorteamId == team_id && local_score > visitor_score)){
                                p++
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 12){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if((new_event_arr[i].localteamId == team_id && local_score < visitor_score) || (new_event_arr[i].visitorteamId == team_id && local_score > visitor_score)){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            overall_f(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                for(let i = 0 ; i < events.length ; i++){
                    for(let j = 0 ; j < events[i].events.length ; j++){
                        if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                            new_event_arr.push(events[i].events[j])
                        }
                    }
                }
                this.sortJSON1(new_event_arr,'date', '123');
                if(d === '1'){
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 6){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if(new_event_arr[i].localteamId == team_id){
                                p += local_score
                            }
                            if(new_event_arr[i].visitorteamId == team_id){
                                p += visitor_score
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p > 12){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if(new_event_arr[i].localteamId == team_id){
                                p += local_score
                            }
                            if(new_event_arr[i].visitorteamId == team_id){
                                p += visitor_score
                            }
                        }
                    }
                }
                return p
            },
            overall_a(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                for(let i = 0 ; i < events.length ; i++){
                    for(let j = 0 ; j < events[i].events.length ; j++){
                        if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                            new_event_arr.push(events[i].events[j])
                        }
                    }
                }
                this.sortJSON1(new_event_arr,'date', '123');
                if(d === '1'){
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 6){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if(new_event_arr[i].localteamId == team_id){
                                p += visitor_score
                            }
                            if(new_event_arr[i].visitorteamId == team_id){
                                p += local_score
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 12){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if(new_event_arr[i].localteamId == team_id){
                                p += visitor_score
                            }
                            if(new_event_arr[i].visitorteamId == team_id){
                                p += local_score
                            }
                        }
                    }
                }
                return p
            },
            form_calculation(standings, events, team_id, d){
                let p = 0
                if (standings.length == 0)
                    return '-'
                let season_data = standings[0].standings
                let overall = {
                    "home": [],
                    "away": []
                }
                for (let i = 0; i < season_data.length; i++) {
                    let home_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "over": null,
                        "home": {
                            "p": null,
                            "w": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "d": null,
                        "f": null,
                        "points": null,
                        "gd": null,
                    }
                    let away_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "over": null,
                        "away": {
                            "p": null,
                            "w": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "d": null,
                        "f": null,
                        "points": null,
                        "gd": null,
                    }
                    home_team_data.team_name = season_data[i].team_name
                    home_team_data.team_id = season_data[i].team_id

                    away_team_data.team_name = season_data[i].team_name
                    away_team_data.team_id = season_data[i].team_id
                    overall.home.push(home_team_data)
                    overall.away.push(away_team_data)
                }

                for(let i = 0 ; i < overall.home.length ; i++){
                    overall.home[i].home.p = this.overall_p(overall.home[i].team_id, events, '1')
                    overall.away[i].away.p = this.overall_p(overall.away[i].team_id, events, '2')
                    overall.home[i].home.w = this.overall_w(overall.home[i].team_id, events, '1')
                    overall.away[i].away.w = this.overall_w(overall.away[i].team_id, events, '2')
                    overall.home[i].d = this.overall_d(overall.home[i].team_id, events, '1')
                    overall.away[i].d = this.overall_d(overall.away[i].team_id, events, '2')
                    overall.home[i].home.l = this.overall_l(overall.home[i].team_id, events, '1')
                    overall.away[i].away.l = this.overall_l(overall.away[i].team_id, events, '2')
                    overall.home[i].home.f = this.overall_f(overall.home[i].team_id, events, '1')
                    overall.home[i].f = this.overall_f(overall.home[i].team_id, events, '1')
                    overall.away[i].away.f = this.overall_f(overall.away[i].team_id, events, '2')
                    overall.away[i].f = this.overall_f(overall.away[i].team_id, events, '2')
                    overall.home[i].home.a = this.overall_a(overall.home[i].team_id, events, '1')
                    overall.away[i].away.a = this.overall_a(overall.away[i].team_id, events, '2')
                    overall.home[i].gd = overall.home[i].home.f - overall.home[i].home.a
                    overall.away[i].gd = overall.away[i].away.f - overall.away[i].away.a
                    overall.home[i].points = this.overall_w(overall.home[i].team_id, events, '1')*3 + this.overall_d(overall.home[i].team_id, events, '1')
                    overall.away[i].points = this.overall_w(overall.away[i].team_id, events, '2')*3 + this.overall_d(overall.away[i].team_id, events, '2')
                }

                this.sortJSON1(overall.home, 'points', '123');
                this.sortJSON1(overall.away, 'points', '123');

                let new_away_table1 = []
                for(let j = 0 ; j < overall.home.length ; j++){
                    let len = overall.home.filter(function(item) {
                        return item.points == overall.home[j].points
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            overall.home[p] = len[p - j]
                            new_away_table1.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table1.push(overall.home[j])
                    }
                }
                overall.home = new_away_table1

                let new_away_table2 = []
                for(let j = 0 ; j < overall.home.length ; j++){
                    let len = overall.home.filter(function(item) {
                        return (item.points == overall.home[j].points && item.gd == overall.home[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            overall.home[p] = len[p - j]
                            new_away_table2.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table2.push(overall.home[j])
                    }
                }
                overall.home = new_away_table2

                let new_away_table = []
                for(let j = 0 ; j < overall.away.length ; j++){
                    let len = overall.away.filter(function(item) {
                        return item.points == overall.away[j].points
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            overall.away[p] = len[p - j]
                            new_away_table.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table.push(overall.away[j])
                    }
                }
                overall.away = new_away_table

                let new_away_table3 = []
                for(let j = 0 ; j < overall.away.length ; j++){
                    let len = overall.away.filter(function(item) {
                        return (item.points == overall.away[j].points && item.gd == overall.away[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            overall.away[p] = len[p - j]
                            new_away_table3.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table3.push(overall.away[j])
                    }
                }
                overall.away = new_away_table3

                for(let j = 0 ; j < overall.home.length ; j++){
                    if(overall.home[j].team_id == team_id){
                        p = j + 1
                    }
                }
                return p
            },
            form_3_p(team_id, events, d){
                let p = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    if(p > 2){ break }
                    p++
                }
                return p
            },
            form_3_w(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 3){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id && local_score > visitor_score){
                                p++
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id && local_score < visitor_score){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            form_3_d(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 3){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id && local_score == visitor_score){
                                p++
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id && local_score == visitor_score){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            form_3_l(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 3){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id && local_score < visitor_score){
                                p++
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id && local_score > visitor_score){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            form_3_f(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 3){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id){
                                p+=local_score
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id){
                                p+=visitor_score
                            }
                        }
                    }
                }
                return p
            },
            form_3_a(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 3){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id){
                                p+=visitor_score
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id){
                                p+=local_score
                            }
                        }
                    }
                }
                return p
            },
            form_h_a_calculation(standings, events, team_id, d){
                let p = 1
                if (standings.length == 0)
                    return '-'
                let season_data = standings[0].standings
                let form_3_matches = {
                    "home": [],
                    "away": []
                }
                for (let i = 0; i < season_data.length; i++) {
                    let home_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "over": null,
                        "home": {
                            "p": null,
                            "w": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "d": null,
                        "f": null,
                        "points": null,
                        "gd": null,
                    }
                    let away_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "over": null,
                        "away": {
                            "p": null,
                            "w": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "d": null,
                        "f": null,
                        "points": null,
                        "gd": null,
                    }
                    home_team_data.team_name = season_data[i].team_name
                    home_team_data.team_id = season_data[i].team_id

                    away_team_data.team_name = season_data[i].team_name
                    away_team_data.team_id = season_data[i].team_id
                    form_3_matches.home.push(home_team_data)
                    form_3_matches.away.push(away_team_data)
                }

                for(let i = 0 ; i < form_3_matches.home.length ; i++){
                    form_3_matches.home[i].home.p = this.form_3_p(form_3_matches.home[i].team_id, events, '1')
                    form_3_matches.away[i].away.p = this.form_3_p(form_3_matches.away[i].team_id, events, '2')
                    form_3_matches.home[i].home.w = this.form_3_w(form_3_matches.home[i].team_id, events, '1')
                    form_3_matches.away[i].away.w = this.form_3_w(form_3_matches.away[i].team_id, events, '2')
                    form_3_matches.home[i].d = this.form_3_d(form_3_matches.home[i].team_id, events, '1')
                    form_3_matches.away[i].d = this.form_3_d(form_3_matches.away[i].team_id, events, '2')
                    form_3_matches.home[i].home.l = this.form_3_l(form_3_matches.home[i].team_id, events, '1')
                    form_3_matches.away[i].away.l = this.form_3_l(form_3_matches.away[i].team_id, events, '2')
                    form_3_matches.home[i].home.f = this.form_3_f(form_3_matches.home[i].team_id, events, '1')
                    form_3_matches.home[i].f = this.form_3_f(form_3_matches.home[i].team_id, events, '1')
                    form_3_matches.away[i].away.f = this.form_3_f(form_3_matches.away[i].team_id, events, '2')
                    form_3_matches.away[i].f = this.form_3_f(form_3_matches.away[i].team_id, events, '2')
                    form_3_matches.home[i].home.a = this.form_3_a(form_3_matches.home[i].team_id, events, '1')
                    form_3_matches.away[i].away.a = this.form_3_a(form_3_matches.away[i].team_id, events, '2')
                    form_3_matches.home[i].gd = form_3_matches.home[i].home.f - form_3_matches.home[i].home.a
                    form_3_matches.away[i].gd = form_3_matches.away[i].away.f - form_3_matches.away[i].away.a
                    form_3_matches.home[i].points = this.form_3_w(form_3_matches.home[i].team_id, events, '1')*3 + this.form_3_d(form_3_matches.home[i].team_id, events, '1')
                    form_3_matches.away[i].points = this.form_3_w(form_3_matches.away[i].team_id, events, '2')*3 + this.form_3_d(form_3_matches.away[i].team_id, events, '2')
                }

                this.sortJSON1(form_3_matches.home, 'points', '123');
                this.sortJSON1(form_3_matches.away, 'points', '123');

                let new_away_table1 = []
                for(let j = 0 ; j < form_3_matches.home.length ; j++){
                    let len = form_3_matches.home.filter(function(item) {
                        return item.points == form_3_matches.home[j].points
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            form_3_matches.home[p] = len[p - j]
                            new_away_table1.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table1.push(form_3_matches.home[j])
                    }
                }
                form_3_matches.home = new_away_table1

                let new_away_table2 = []
                for(let j = 0 ; j < form_3_matches.home.length ; j++){
                    let len = form_3_matches.home.filter(function(item) {
                        return (item.points == form_3_matches.home[j].points && item.gd == form_3_matches.home[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            form_3_matches.home[p] = len[p - j]
                            new_away_table2.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table2.push(form_3_matches.home[j])
                    }
                }
                form_3_matches.home = new_away_table2

                let new_away_table = []
                for(let j = 0 ; j < form_3_matches.away.length ; j++){
                    let len = form_3_matches.away.filter(function(item) {
                        return item.points == form_3_matches.away[j].points
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'gd', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            form_3_matches.away[p] = len[p - j]
                            new_away_table.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table.push(form_3_matches.away[j])
                    }
                }
                form_3_matches.away = new_away_table

                let new_away_table3 = []
                for(let j = 0 ; j < form_3_matches.away.length ; j++){
                    let len = form_3_matches.away.filter(function(item) {
                        return (item.points == form_3_matches.away[j].points && item.gd == form_3_matches.away[j].gd)
                    });
                    if(len.length > 1){
                        this.sortJSON1(len,'f', '123');
                        for(let p = j ; p < j + len.length ; p++){
                            form_3_matches.away[p] = len[p - j]
                            new_away_table3.push(len[p - j])
                        }
                        j = j + len.length - 1
                    }
                    else{
                        new_away_table3.push(form_3_matches.away[j])
                    }
                }
                form_3_matches.away = new_away_table3

                for(let j = 0 ; j < form_3_matches.home.length ; j++){
                    if(form_3_matches.home[j].team_id == team_id && d == '1'){
                        p =  j + 1
                    }
                }
                for(let j = 0 ; j < form_3_matches.away.length ; j++){
                    if(form_3_matches.away[j].team_id == team_id && d == '2'){
                        p =  j + 1
                    }
                }
                return p
            },
            eventDetailData(home_id, away_id, season_id, item){
                console.log('======home_id==>', home_id)
                console.log('======away_id==>', away_id)
                console.log('=======item==>', item)
                console.log('======_id==>', item._id)
                this.current_modal_data = null
                let ranking = this.standingList
                for(let u = 0 ; u < this.mainList.length ; u++) {
                    for (let uu = 0; uu < this.mainList[u].events.length; uu++) {
                        if(home_id == this.mainList[u].events[uu].home_id && away_id == this.mainList[u].events[uu].away_id){
                            if(this.mainList[u].events[uu].show){
                                this.mainList[u].events[uu].show = false
                                break;
                            }
                            else{
                                this.showModal()
                                window.axios.post(`${process.env.VUE_APP_URL}geteventData`, [item._id]).then(({data})=> {
                                    console.log('data0******', data.data[0])
                                    this.hideModal()
                                    this.filter_key1 = 0
                                    this.filter_key2 = 0
                                    this.filter_key3 = 0
                                    this.filter_key4 = 0
                                    this.filter_key5 = 0
                                    this.filter_key6 = 0
                                    this.filter_key7 = 0
                                    this.filter_key8 = 0
                                    let start_date4 = new Date();
                                    let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
                                    next_date4 = new Date(next_date4).toISOString()
                                    next_date4 = next_date4.substring(0,10)
                                    let main_data =  data.data[0]
                                    this.mainData = main_data

                                    let localteamevents = []
                                    let awayteamevents = []

                                    for(let u = 0 ; u < this.mainList.length ; u++){
                                        for(let uu = 0 ; uu < this.mainList[u].events.length ; uu++){
                                            for(let j = 0 ; j < main_data.length ; j++){
                                                let localTeamId = main_data[j].localTeamId
                                                let visitorTeamId = main_data[j].visitorTeamId
                                                let stage_id = main_data[j].stage_id
                                                let round_id = main_data[j].round_id
                                                if(localTeamId == this.mainList[u].events[uu].home_id && visitorTeamId == this.mainList[u].events[uu].away_id){
                                                    if(this.mainList[u].events[uu].show){
                                                        this.mainList[u].events[uu].show = false
                                                        break;
                                                    }
                                                    else{
                                                        let start_date4 = new Date();
                                                        let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
                                                        next_date4 = new Date(next_date4).toISOString()
                                                        next_date4 = next_date4.substring(0,10)
                                                        let home = {
                                                            p:0,
                                                            name:'',
                                                            rank: '',
                                                            z_z: 0,
                                                            over15: 0,
                                                            over25:0,
                                                            over35:0,
                                                            scored:0,
                                                            conc:0,
                                                            average1:0,
                                                            average2:0,
                                                            bts:0,
                                                            first1:0,
                                                            first2:0,
                                                            second1:0,
                                                            second2:0,
                                                            time15_S:0,
                                                            time30_S:0,
                                                            time45_S:0,
                                                            time60_S:0,
                                                            time75_S:0,
                                                            time90_S:0,
                                                            time15_C:0,
                                                            time30_C:0,
                                                            time45_C:0,
                                                            time60_C:0,
                                                            time75_C:0,
                                                            time90_C:0,
                                                            gs1:0,
                                                            gs2:0,
                                                            gc1:0,
                                                            gc2:0,
                                                            over40:0,
                                                            over85:0,
                                                            C_H:0,
                                                            C_D:0,
                                                            C_A:0,
                                                            first10:0,
                                                            first11:0,
                                                            first20:0,
                                                            second01:0,
                                                            second11:0,
                                                            second02:0,
                                                            firstGoal:0,
                                                            lastGoal:0,
                                                            secondplus:0,
                                                            secondminus:0,
                                                            homefirst:0,
                                                            drawfirst:0,
                                                            awayfirst:0,
                                                            homesecond:0,
                                                            drawsecond:0,
                                                            awaysecond:0,
                                                            eventdays:['All'],
                                                            pos:0,
                                                            h_a:0,
                                                            swing1:'',
                                                            FH:0,
                                                            swing2:'',
                                                            SH:0,
                                                            swing3:'',
                                                            attack:0,
                                                            defense:0,
                                                            form:0,
                                                            form_H_A:0,
                                                            fh_percentage: 0,
                                                            sh_percentage: 0,
                                                            fh_probability: 0,
                                                            sh_probability: 0,
                                                            pro: 0
                                                        }
                                                        let away = {
                                                            p:0,
                                                            name:'',
                                                            rank:'' ,
                                                            z_z: 0,
                                                            over15: 0,
                                                            over25:0,
                                                            over35:0,
                                                            scored:0,
                                                            conc:0,
                                                            average1:0,
                                                            average2:0,
                                                            bts:0,
                                                            first1:0,
                                                            first2:0,
                                                            second1:0,
                                                            second2:0,
                                                            time15_S:0,
                                                            time30_S:0,
                                                            time45_S:0,
                                                            time60_S:0,
                                                            time75_S:0,
                                                            time90_S:0,
                                                            time15_C:0,
                                                            time30_C:0,
                                                            time45_C:0,
                                                            time60_C:0,
                                                            time75_C:0,
                                                            time90_C:0,
                                                            gs1:0,
                                                            gs2:0,
                                                            gc1:0,
                                                            gc2:0,
                                                            over40:0,
                                                            over85:0,
                                                            C_H:0,
                                                            C_D:0,
                                                            C_A:0,
                                                            first10:0,
                                                            first11:0,
                                                            first20:0,
                                                            second01:0,
                                                            second11:0,
                                                            second02:0,
                                                            firstGoal:0,
                                                            lastGoal:0,
                                                            secondPlus:0,
                                                            secondMinus:0,
                                                            homefirst:0,
                                                            drawfirst:0,
                                                            awayfirst:0,
                                                            homesecond:0,
                                                            drawsecond:0,
                                                            awaysecond:0,
                                                            eventdays:['All'],
                                                            pos:0,
                                                            h_a:0,
                                                            swing1: '',
                                                            FH:0,
                                                            swing2: '',
                                                            SH:0,
                                                            swing3: '',
                                                            attack:0,
                                                            defense:0,
                                                            form:0,
                                                            form_H_A:0,
                                                            fh_percentage: 0,
                                                            sh_percentage: 0,
                                                            probability: 0,
                                                            fh_probability: 0,
                                                            sh_probability: 0,
                                                            pro: 0
                                                        }
                                                        home.name = this.mainList[u].events[uu].home.name
                                                        away.name = this.mainList[u].events[uu].away.name
                                                        let eventName = this.mainList[u].events[uu].eventName
                                                        this.current_home_name = main_data[j].localTeamName.substring(0,12) + '(' + main_data[j].standing.localteam_position + ')'
                                                        this.current_away_name = main_data[j].visitorTeamName.substring(0,12) + '(' + main_data[j].standing.visitorteam_position + ')'
                                                        let self =  this
                                                        let season_id = main_data[j].season_id

                                                        console.log('==================  seasonId', season_id)

                                                        let temp2 =  JSON.stringify(self.lineup_list)
                                                        let temp3 =  JSON.stringify(self.lineup_list)
                                                        let homelineuplist = JSON.parse(temp2)
                                                        let awaylineuplist = JSON.parse(temp3)
                                                        let local_Id = main_data[j].localTeamId
                                                        let visitor_Id = main_data[j].visitorTeamId
                                                        let home_lineups = []
                                                        let away_lineups = []
                                                        let home_team_scores = []
                                                        let away_team_scores = []

                                                        let p_check = 0
                                                        let h_w_check = 0
                                                        let h_d_check = 0
                                                        let h_l_check = 0
                                                        let a_w_check = 0
                                                        let a_d_check = 0
                                                        let a_l_check = 0
                                                        if(main_data[j].time.status === 'FT' || main_data[j].time.status === "FT_PEN" || main_data[j].time.status === "AET"){
                                                            p_check = 1
                                                            if(main_data[j].scores.localteam_score > main_data[j].scores.visitorteam_score){
                                                                h_w_check = 1
                                                                a_l_check = 1
                                                            }
                                                            else if(main_data[j].scores.localteam_score == main_data[j].scores.visitorteam_score){
                                                                h_d_check = 1
                                                                a_d_check = 1
                                                            }
                                                            else{
                                                                a_w_check = 1
                                                                h_l_check = 1
                                                            }
                                                        }

                                                        let full_time_score_array = []
                                                        let position_details_array = []
                                                        let position_details_array1 = []
                                                        let standing_details_array = []
                                                        let k = 0
                                                        for(let c = 0 ; c < ranking.length ; c++){
                                                            if(ranking[c].season_id == season_id){
                                                                k++
                                                                let stage_name = ''
                                                                let group_name = ''
                                                                if(ranking[c].resource == 'stage'){
                                                                    stage_name = ranking[c].stage_name
                                                                    group_name = ''
                                                                }
                                                                else{
                                                                    stage_name = ranking[c].stage_name
                                                                    group_name = ' / ' + ranking[c].name
                                                                }
                                                                let round_id = ranking[c].round_id
                                                                let stage_id = ranking[c].stage_id
                                                                position_details_array1[k - 1] = {'stage_id': stage_id, 'stage_name': stage_name, 'group_name': group_name, 'round_id': round_id, 'standings': []}
                                                                standing_details_array[k - 1] = {'stage_id': stage_id, 'stage_name': stage_name, 'group_name': group_name, 'round_id': round_id, 'positions': []}
                                                                for(let cc = 0 ; cc < ranking[c].standings.length ; cc++){
                                                                    let color = "black"
                                                                    if((local_Id == ranking[c].standings[cc].team_id) || (visitor_Id == ranking[c].standings[cc].team_id)){
                                                                        color = "blue"
                                                                    }
                                                                    position_details_array1[k - 1].standings.push({"color": color, "rank": ranking[c].standings[cc].position, "teamId": ranking[c].standings[cc].team_id, "teamName": ranking[c].standings[cc].team_name, "home_score": null, "away_score": null})
                                                                    full_time_score_array.push({"color": color, "rank": ranking[c].standings[cc].position, "teamId": ranking[c].standings[cc].team_id, "teamName": ranking[c].standings[cc].team_name})
                                                                    let standing_details = {
                                                                        "name": ranking[c].standings[cc].team_name,
                                                                        "position": null,
                                                                        "p": null,
                                                                        "w": null,
                                                                        "d": null,
                                                                        "l": null,
                                                                        "f": null,
                                                                        "a": null,
                                                                        "gf": null,
                                                                        "points": null,
                                                                        "tooltip": null,
                                                                        "color": '',
                                                                        "border": '',
                                                                        "key": this.create_UUID(),
                                                                        "perRank": null
                                                                    }
                                                                    standing_details.position = ranking[c].standings[cc].position
                                                                    standing_details.tooltip = ranking[c].standings[cc].result
                                                                    if((standing_details.tooltip == "UEFA Champions League") || (standing_details.tooltip == "Promotion") || (standing_details.tooltip == "Championship Round") || (standing_details.tooltip == "Championship Round")){
                                                                        standing_details.color = 'blue'
                                                                        standing_details.border = "white"
                                                                    }
                                                                    if(standing_details.tooltip == "UEFA Champions League Qualifiers"){
                                                                        standing_details.color = 'lightblue'
                                                                        standing_details.border = "white"
                                                                    }
                                                                    if((standing_details.tooltip == "Promotion Play-off") || (standing_details.tooltip == "UEFA Europa League")){
                                                                        standing_details.color = 'brown'
                                                                        standing_details.border = "white"
                                                                    }
                                                                    if(standing_details.tooltip == "UEFA Europa League Qualifiers"){
                                                                        standing_details.color = 'magenta'
                                                                        standing_details.border = "white"
                                                                    }
                                                                    if(standing_details.tooltip == "Relegation"){
                                                                        standing_details.color = 'red'
                                                                        standing_details.border = "white"
                                                                    }
                                                                    if((standing_details.tooltip == "Relegation Round") || (standing_details.tooltip == "Relegation Play-off")){
                                                                        standing_details.color = 'tomato'
                                                                        standing_details.border = "white"
                                                                    }
                                                                    if(ranking[c].standings[cc].overall != null){
                                                                        standing_details.p = ranking[c].standings[cc].overall.games_played
                                                                        standing_details.w = ranking[c].standings[cc].overall.won
                                                                        standing_details.d = ranking[c].standings[cc].overall.draw
                                                                        standing_details.l = ranking[c].standings[cc].overall.lost
                                                                        standing_details.f = ranking[c].standings[cc].overall.goals_scored
                                                                        standing_details.a = ranking[c].standings[cc].overall.goals_against
                                                                    }
                                                                    else{
                                                                        standing_details.p = '-'
                                                                        standing_details.w = '-'
                                                                        standing_details.d = '-'
                                                                        standing_details.l = '-'
                                                                        standing_details.f = '-'
                                                                        standing_details.a = '-'
                                                                    }
                                                                    if(ranking[c].standings[cc].total != null){
                                                                        standing_details.gf = ranking[c].standings[cc].total.goal_difference
                                                                        standing_details.points = ranking[c].standings[cc].total.points
                                                                    }
                                                                    else{
                                                                        standing_details.gf = '-'
                                                                        standing_details.points = '-'
                                                                    }
                                                                    // console.log("standing details=>", standing_details, 'p->check=>', p_check)
                                                                    if(ranking[c].standings[cc].team_id == local_Id){
                                                                        if(standing_details.p > 0){
                                                                            standing_details.p = parseInt(standing_details.p) - p_check
                                                                        }
                                                                        if(standing_details.w > 0){
                                                                            standing_details.w = parseInt(standing_details.w) - h_w_check
                                                                        }
                                                                        if(standing_details.l > 0){
                                                                            standing_details.l = parseInt(standing_details.l) - h_l_check
                                                                        }
                                                                        if(standing_details.d > 0){
                                                                            standing_details.d = parseInt(standing_details.l) - h_d_check
                                                                        }
                                                                    }
                                                                    if(ranking[c].standings[cc].team_id == visitor_Id){
                                                                        if(standing_details.p > 0){
                                                                            standing_details.p = standing_details.p - p_check
                                                                        }
                                                                        if(standing_details.w > 0){
                                                                            standing_details.w = standing_details.w - a_w_check
                                                                        }
                                                                        if(standing_details.l > 0){
                                                                            standing_details.l = standing_details.l - a_l_check
                                                                        }
                                                                        if(standing_details.d > 0){
                                                                            standing_details.d = standing_details.l - a_d_check
                                                                        }
                                                                    }
                                                                    if(parseInt(standing_details.p) > 0 && parseInt(standing_details.points) > 0){
                                                                        standing_details.perRank = parseInt(standing_details.points)/parseInt(standing_details.p)
                                                                    }
                                                                    standing_details_array[k - 1].positions.push(standing_details)
                                                                    position_details_array.push(standing_details)
                                                                }
                                                            }
                                                        }
                                                        
                                                        for(let p = 0 ; p < main_data[j].events.length ;p++){
                                                            let events = main_data[j].events[p].events
                                                            for(let pp = 0 ; pp < events.length ; pp++){
                                                                if(local_Id == events[pp].localteamId){
                                                                    localteamevents.push(events[pp])
                                                                }
                                                                else if(local_Id == events[pp].visitorteamId){
                                                                    localteamevents.push(events[pp])
                                                                }
                                                                if(visitor_Id == events[pp].localteamId){
                                                                    awayteamevents.push(events[pp])
                                                                }
                                                                if(visitor_Id == events[pp].visitorteamId){
                                                                    awayteamevents.push(events[pp])
                                                                }

                                                                if(local_Id == events[pp].localteamId && events[pp].date < next_date4){
                                                                    let home_goal_tlp = ""
                                                                    let away_goal_tlp = ""
                                                                    let goal_tlp = "0 - 0"
                                                                    for(let e = 0 ; e < events[pp].goals.length ; e++){
                                                                        if(events[pp].goals[e].teamId == local_Id){
                                                                            home_goal_tlp = home_goal_tlp + " " + events[pp].goals[e].minute + "'"
                                                                        }
                                                                        else {
                                                                            away_goal_tlp = away_goal_tlp + " " + events[pp].goals[e].minute + "'"
                                                                        }
                                                                    }
                                                                    if(home_goal_tlp == "" && away_goal_tlp != ""){
                                                                        goal_tlp = away_goal_tlp
                                                                    }
                                                                    else if(away_goal_tlp == "" && home_goal_tlp != ""){
                                                                        goal_tlp = home_goal_tlp
                                                                    }
                                                                    else if(away_goal_tlp != "" && home_goal_tlp != ""){
                                                                        goal_tlp = home_goal_tlp + '-' + away_goal_tlp
                                                                    }
                                                                    let hf_color = ""
                                                                    if(events[pp].hf_score != null){
                                                                        if(parseInt(events[pp].hf_score.split("-")[0]) == parseInt(events[pp].hf_score.split("-")[1])){
                                                                            hf_color = "#cdcf46"
                                                                        }
                                                                        else if(parseInt(events[pp].hf_score.split("-")[0]) > parseInt(events[pp].hf_score.split("-")[1])){
                                                                            hf_color = "#00cc00"
                                                                        }
                                                                        else if(parseInt(events[pp].hf_score.split("-")[0]) < parseInt(events[pp].hf_score.split("-")[1])){
                                                                            hf_color = "#fe9f9f"
                                                                        }

                                                                        let ft_color = ""
                                                                        if(parseInt(events[pp].ft_score.split("-")[0]) == parseInt(events[pp].ft_score.split("-")[1])){
                                                                            ft_color = "#cdcf46"
                                                                        }
                                                                        else if(parseInt(events[pp].ft_score.split("-")[0]) > parseInt(events[pp].ft_score.split("-")[1])){
                                                                            ft_color = "#00cc00"
                                                                        }
                                                                        else if(parseInt(events[pp].ft_score.split("-")[0]) < parseInt(events[pp].ft_score.split("-")[1])){
                                                                            ft_color = "#fe9f9f"
                                                                        }

                                                                        let local_name = ""
                                                                        let visitor_name = ""
                                                                        let local = full_time_score_array.filter(function(item) {
                                                                            return item.teamId === events[pp].localteamId
                                                                        });
                                                                        let visit = full_time_score_array.filter(function(item) {
                                                                            return item.teamId === events[pp].visitorteamId
                                                                        });
                                                                        if(local.length > 0){
                                                                            local_name = local[0].teamName
                                                                        }
                                                                        if(visit.length > 0){
                                                                            visitor_name = visit[0].teamName
                                                                        }
                                                                        home_team_scores.push({"key": this.create_UUID(),"ht_color": hf_color, "ft_color": ft_color, "goal_tlp": goal_tlp, "local_name": local_name, "visitor_name": visitor_name, "date": events[pp].date, "ht_score": events[pp].hf_score, "ft_score": events[pp].ft_score, "home_goals": home_goal_tlp, "away_goals": away_goal_tlp})
                                                                        if(events[pp].local_formation){
                                                                            home_lineups.push(events[pp].local_formation)
                                                                        }
                                                                    }
                                                                }
                                                                if(visitor_Id == events[pp].visitorteamId && events[pp].date < next_date4){
                                                                    let home_goal_tlp = ""
                                                                    let away_goal_tlp = ""
                                                                    let goal_tlp = "0 - 0"
                                                                    for(let e = 0 ; e < events[pp].goals.length ; e++){
                                                                        if(events[pp].goals[e].teamId == visitor_Id){
                                                                            away_goal_tlp = away_goal_tlp + " " + events[pp].goals[e].minute + "'"
                                                                        }
                                                                        else {
                                                                            home_goal_tlp = home_goal_tlp + " " + events[pp].goals[e].minute + "'"
                                                                        }
                                                                    }
                                                                    if(home_goal_tlp == "" && away_goal_tlp != ""){
                                                                        goal_tlp = away_goal_tlp
                                                                    }
                                                                    else if(away_goal_tlp == "" && home_goal_tlp != ""){
                                                                        goal_tlp = home_goal_tlp
                                                                    }
                                                                    else if(away_goal_tlp != "" && home_goal_tlp != ""){
                                                                        goal_tlp = home_goal_tlp + '-' + away_goal_tlp
                                                                    }

                                                                    let hf_color = ""
                                                                    if(events[pp].hf_score != null){
                                                                        if(parseInt(events[pp].hf_score.split("-")[0]) == parseInt(events[pp].hf_score.split("-")[1])){
                                                                            hf_color = "#cdcf46"
                                                                        }
                                                                        else if(parseInt(events[pp].hf_score.split("-")[0]) < parseInt(events[pp].hf_score.split("-")[1])){
                                                                            hf_color = "#00cc00"
                                                                        }
                                                                        else if(parseInt(events[pp].hf_score.split("-")[0]) > parseInt(events[pp].hf_score.split("-")[1])){
                                                                            hf_color = "#fe9f9f"
                                                                        }

                                                                        let ft_color = ""
                                                                        if(parseInt(events[pp].ft_score.split("-")[0]) == parseInt(events[pp].ft_score.split("-")[1])){
                                                                            ft_color = "#cdcf46"
                                                                        }
                                                                        else if(parseInt(events[pp].ft_score.split("-")[0]) < parseInt(events[pp].ft_score.split("-")[1])){
                                                                            ft_color = "#00cc00"
                                                                        }
                                                                        else if(parseInt(events[pp].ft_score.split("-")[0]) > parseInt(events[pp].ft_score.split("-")[1])){
                                                                            ft_color = "#fe9f9f"
                                                                        }
                                                                        let local_name = ""
                                                                        let visitor_name = ""
                                                                        let local = full_time_score_array.filter(function(item) {
                                                                            return item.teamId === events[pp].localteamId
                                                                        });
                                                                        let visit = full_time_score_array.filter(function(item) {
                                                                            return item.teamId === events[pp].visitorteamId
                                                                        });
                                                                        if(local.length > 0){
                                                                            local_name = local[0].teamName
                                                                        }
                                                                        if(visit.length > 0){
                                                                            visitor_name = visit[0].teamName
                                                                        }
                                                                        away_team_scores.push({"key": this.create_UUID(), "ht_color": hf_color, "ft_color": ft_color, "goal_tlp": goal_tlp, "local_name": local_name, "visitor_name": visitor_name, "date": events[pp].date, "ht_score": events[pp].hf_score, "ft_score": events[pp].ft_score, "home_goals": home_goal_tlp, "away_goals": away_goal_tlp})
                                                                        if(events[pp].visit_formation){
                                                                            away_lineups.push(events[pp].visit_formation)
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        

                                                        let temp =  JSON.stringify(main_data)
                                                        let main_data1 = JSON.parse(temp)
                                                        let full_time_score_array1 = position_details_array1
                                                        
                                                        console.log('full time score array=>', position_details_array1)
                                                        for(let c = 0 ; c < full_time_score_array1.length ; c++){
                                                            for(let h = 0 ; h < full_time_score_array1[c].standings.length ; h++){
                                                                for(let cc = 0 ; cc < main_data1[j].events.length ; cc++){
                                                                    let events = main_data1[j].events[cc].events
                                                                    for(let ccc = 0 ; ccc < events.length ; ccc++){
                                                                        if(full_time_score_array1[c].stage_id == events[ccc].stage_id && full_time_score_array1[c].standings[h].teamId == events[ccc].visitorteamId && local_Id == events[ccc].localteamId && events[ccc].date < next_date4){
                                                                            let home_score_tlp = ""
                                                                            let away_score_tlp = ""
                                                                            let goal_tlp = "0 - 0"
                                                                            for(let e = 0 ; e < events[ccc].goals.length ; e++){
                                                                                if(events[ccc].goals[e].teamId == events[ccc].localteamId){
                                                                                    home_score_tlp = home_score_tlp + " " + events[ccc].goals[e].minute + "'"
                                                                                }
                                                                                else{
                                                                                    away_score_tlp = away_score_tlp + " " + events[ccc].goals[e].minute + "'"
                                                                                }
                                                                            }
                                                                            if(home_score_tlp == "" && away_score_tlp != ""){
                                                                                goal_tlp = away_score_tlp
                                                                            }
                                                                            else if(away_score_tlp == "" && home_score_tlp != ""){
                                                                                goal_tlp = home_score_tlp
                                                                            }
                                                                            else if(away_score_tlp != "" && home_score_tlp != ""){
                                                                                goal_tlp = home_score_tlp + '-' + away_score_tlp
                                                                            }

                                                                            let ft_color = ""
                                                                            if(events[ccc].ft_score != null){
                                                                                if(parseInt(events[ccc].ft_score.split("-")[0]) == parseInt(events[ccc].ft_score.split("-")[1])){
                                                                                    ft_color = "#cdcf46"
                                                                                }
                                                                                else if(parseInt(events[ccc].ft_score.split("-")[0]) > parseInt(events[ccc].ft_score.split("-")[1])){
                                                                                    ft_color = "#00cc00"
                                                                                }
                                                                                else if(parseInt(events[ccc].ft_score.split("-")[0]) < parseInt(events[ccc].ft_score.split("-")[1])){
                                                                                    ft_color = "#fe9f9f"
                                                                                }

                                                                                let local_name = ""
                                                                                let visitor_name = ""
                                                                                let local = full_time_score_array.filter(function(item) {
                                                                                    return item.teamId === events[ccc].localteamId
                                                                                });
                                                                                let visit = full_time_score_array.filter(function(item) {
                                                                                    return item.teamId === events[ccc].visitorteamId
                                                                                });
                                                                                if(local.length > 0){
                                                                                    local_name = local[0].teamName
                                                                                }
                                                                                if(visit.length > 0){
                                                                                    visitor_name = visit[0].teamName
                                                                                }
                                                                                full_time_score_array1[c].standings[h].home_score = {"key": this.create_UUID(), "ft_color": ft_color , "goal_tlp": goal_tlp, "local_name": local_name, "visitor_name": visitor_name, "date": events[ccc].date, "ht_score": events[ccc].hf_score, "ft_score": events[ccc].ft_score, "home_goals": home_score_tlp, "away_goals": away_score_tlp}
                                                                            }
                                                                            // console.log("****************", full_time_score_array1[c].round_id,', ',main_data[j].events[cc].round_id)
                                                                        }
                                                                        if(full_time_score_array1[c].stage_id == events[ccc].stage_id && full_time_score_array1[c].standings[h].teamId == events[ccc].localteamId && visitor_Id == events[ccc].visitorteamId && events[ccc].date < next_date4){
                                                                            let home_score_tlp = ""
                                                                            let away_score_tlp = ""
                                                                            let goal_tlp = "0 - 0"
                                                                            for(let e = 0 ; e < events[ccc].goals.length ; e++){
                                                                                if(events[ccc].goals[e].teamId == events[ccc].visitorteamId){
                                                                                    away_score_tlp = away_score_tlp + " " + events[ccc].goals[e].minute + "'"
                                                                                }
                                                                                else{
                                                                                    home_score_tlp = home_score_tlp + " " + events[ccc].goals[e].minute + "'"
                                                                                }
                                                                            }
                                                                            if(home_score_tlp == "" && away_score_tlp != ""){
                                                                                goal_tlp = away_score_tlp
                                                                            }
                                                                            else if(away_score_tlp == "" && home_score_tlp != ""){
                                                                                goal_tlp = home_score_tlp
                                                                            }
                                                                            else if(away_score_tlp != "" && home_score_tlp != ""){
                                                                                goal_tlp = home_score_tlp + '-' + away_score_tlp
                                                                            }

                                                                            let ft_color = ""
                                                                            if(events[ccc].ft_score != null){
                                                                                if(parseInt(events[ccc].ft_score.split("-")[0]) == parseInt(events[ccc].ft_score.split("-")[1])){
                                                                                    ft_color = "#cdcf46"
                                                                                }
                                                                                else if(parseInt(events[ccc].ft_score.split("-")[0]) < parseInt(events[ccc].ft_score.split("-")[1])){
                                                                                    ft_color = "#00cc00"
                                                                                }
                                                                                else if(parseInt(events[ccc].ft_score.split("-")[0]) > parseInt(events[ccc].ft_score.split("-")[1])){
                                                                                    ft_color = "#fe9f9f"
                                                                                }

                                                                                let local_name = ""
                                                                                let visitor_name = ""
                                                                                let local = full_time_score_array.filter(function(item) {
                                                                                    return item.teamId === events[ccc].localteamId
                                                                                });
                                                                                let visit = full_time_score_array.filter(function(item) {
                                                                                    return item.teamId === events[ccc].visitorteamId
                                                                                });
                                                                                if(local.length > 0){
                                                                                    local_name = local[0].teamName
                                                                                }
                                                                                if(visit.length > 0){
                                                                                    visitor_name = visit[0].teamName
                                                                                }
                                                                                full_time_score_array1[c].standings[h].away_score = {"key": this.create_UUID(), "goal_tlp": goal_tlp,"local_name": local_name, "visitor_name": visitor_name,  "ft_color": ft_color , "date": events[ccc].date, "ht_score": events[ccc].hf_score, "ft_score": events[ccc].ft_score, "home_goals": home_score_tlp, "away_goals": away_score_tlp}
                                                                                // let index = main_data1[j].events[cc].events.indexOf(events[ccc]);
                                                                                // if (index > -1) {
                                                                                //     main_data1[j].events[cc].events.splice(index, 1);
                                                                                //     if(ccc > 0){
                                                                                //         ccc = ccc - 1
                                                                                //     }
                                                                                // }
                                                                            }
                                                                            //console.log("****************", full_time_score_array1[c].round_id,', ',main_data[j].events[cc].round_id)
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        let home_full_scores = []
                                                        let away_full_scores = []
                                                        
                                                        for(let c = 0 ; c < full_time_score_array.length ; c++){
                                                            for(let cc = 0 ; cc < main_data[j].events.length ; cc++){
                                                                let events = main_data[j].events[cc].events
                                                                


                                                                for(let ccc = 0 ; ccc < events.length ; ccc++){
                                                                    if(full_time_score_array[c].teamId == events[ccc].visitorteamId && local_Id == events[ccc].localteamId){
                                                                        console.log('=================    home matched   ==============')
                                                                    }
                                                                    if(full_time_score_array[c].teamId == events[ccc].visitorteamId && local_Id == events[ccc].localteamId && events[ccc].date < next_date4){
                                                                        console.log('=================    home matched   ==============')
                                                                        let home_score_tlp = ""
                                                                        let away_score_tlp = ""
                                                                        let goal_tlp = "0 - 0"
                                                                        for(let e = 0 ; e < events[ccc].goals.length ; e++){
                                                                            if(events[ccc].goals[e].teamId == events[ccc].localteamId){
                                                                                home_score_tlp = home_score_tlp + " " + events[ccc].goals[e].minute + "'"
                                                                            }
                                                                            else{
                                                                                away_score_tlp = away_score_tlp + " " + events[ccc].goals[e].minute + "'"
                                                                            }
                                                                        }
                                                                        if(home_score_tlp == "" && away_score_tlp != ""){
                                                                            goal_tlp = away_score_tlp
                                                                        }
                                                                        else if(away_score_tlp == "" && home_score_tlp != ""){
                                                                            goal_tlp = home_score_tlp
                                                                        }
                                                                        else if(away_score_tlp != "" && home_score_tlp != ""){
                                                                            goal_tlp = home_score_tlp + '-' + away_score_tlp
                                                                        }

                                                                        let ft_color = ""
                                                                        if(events[ccc].ft_score != null){
                                                                            if(parseInt(events[ccc].ft_score.split("-")[0]) == parseInt(events[ccc].ft_score.split("-")[1])){
                                                                                ft_color = "#cdcf46"
                                                                            }
                                                                            else if(parseInt(events[ccc].ft_score.split("-")[0]) > parseInt(events[ccc].ft_score.split("-")[1])){
                                                                                ft_color = "#00cc00"
                                                                            }
                                                                            else if(parseInt(events[ccc].ft_score.split("-")[0]) < parseInt(events[ccc].ft_score.split("-")[1])){
                                                                                ft_color = "#fe9f9f"
                                                                            }

                                                                            let local_name = ""
                                                                            let visitor_name = ""
                                                                            let local = full_time_score_array.filter(function(item) {
                                                                                return item.teamId === events[ccc].localteamId
                                                                            });
                                                                            let visit = full_time_score_array.filter(function(item) {
                                                                                return item.teamId === events[ccc].visitorteamId
                                                                            });
                                                                            if(local.length > 0){
                                                                                local_name = local[0].teamName
                                                                            }
                                                                            if(visit.length > 0){
                                                                                visitor_name = visit[0].teamName
                                                                            }
                                                                            home_full_scores[c] = {"key": this.create_UUID(), "ft_color": ft_color , "goal_tlp": goal_tlp, "local_name": local_name, "visitor_name": visitor_name, "date": events[ccc].date, "ht_score": events[ccc].hf_score, "ft_score": events[ccc].ft_score, "home_goals": home_score_tlp, "away_goals": away_score_tlp}
                                                                        }
                                                                    }
                                                                    if(full_time_score_array[c].teamId == events[ccc].localteamId && visitor_Id == events[ccc].visitorteamId && events[ccc].date < next_date4){
                                                                        console.log('=================    away matched   ==============')
                                                                        let home_score_tlp = ""
                                                                        let away_score_tlp = ""
                                                                        let goal_tlp = "0 - 0"
                                                                        for(let e = 0 ; e < events[ccc].goals.length ; e++){
                                                                            if(events[ccc].goals[e].teamId == events[ccc].visitorteamId){
                                                                                away_score_tlp = away_score_tlp + " " + events[ccc].goals[e].minute + "'"
                                                                            }
                                                                            else{
                                                                                home_score_tlp = home_score_tlp + " " + events[ccc].goals[e].minute + "'"
                                                                            }
                                                                        }
                                                                        if(home_score_tlp == "" && away_score_tlp != ""){
                                                                            goal_tlp = away_score_tlp
                                                                        }
                                                                        else if(away_score_tlp == "" && home_score_tlp != ""){
                                                                            goal_tlp = home_score_tlp
                                                                        }
                                                                        else if(away_score_tlp != "" && home_score_tlp != ""){
                                                                            goal_tlp = home_score_tlp + '-' + away_score_tlp
                                                                        }

                                                                        let ft_color = ""
                                                                        if(events[ccc].ft_score != null){
                                                                            if(parseInt(events[ccc].ft_score.split("-")[0]) == parseInt(events[ccc].ft_score.split("-")[1])){
                                                                                ft_color = "#cdcf46"
                                                                            }
                                                                            else if(parseInt(events[ccc].ft_score.split("-")[0]) < parseInt(events[ccc].ft_score.split("-")[1])){
                                                                                ft_color = "#00cc00"
                                                                            }
                                                                            else if(parseInt(events[ccc].ft_score.split("-")[0]) > parseInt(events[ccc].ft_score.split("-")[1])){
                                                                                ft_color = "#fe9f9f"
                                                                            }

                                                                            let local_name = ""
                                                                            let visitor_name = ""
                                                                            let local = full_time_score_array.filter(function(item) {
                                                                                return item.teamId === events[ccc].localteamId
                                                                            });
                                                                            let visit = full_time_score_array.filter(function(item) {
                                                                                return item.teamId === events[ccc].visitorteamId
                                                                            });
                                                                            if(local.length > 0){
                                                                                local_name = local[0].teamName
                                                                            }
                                                                            if(visit.length > 0){
                                                                                visitor_name = visit[0].teamName
                                                                            }
                                                                            away_full_scores[c] = {"key": this.create_UUID(), "goal_tlp": goal_tlp,"local_name": local_name, "visitor_name": visitor_name,  "ft_color": ft_color , "date": events[ccc].date, "ht_score": events[ccc].hf_score, "ft_score": events[ccc].ft_score, "home_goals": home_score_tlp, "away_goals": away_score_tlp}
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        console.log('=================    home_full_scores   ==============', home_full_scores)
                                                        console.log('=================    away_full_scores   ==============', away_full_scores)
                                                        for(let c = 0 ; c < full_time_score_array.length ; c++){
                                                            if(!home_full_scores[c]){
                                                                home_full_scores[c] = null
                                                            }
                                                            if(!away_full_scores[c]){
                                                                away_full_scores[c] = null
                                                            }
                                                        }


                                                        let current_modal_data = {
                                                            "home_team_scores": home_team_scores,
                                                            "away_team_scores": away_team_scores,
                                                            "full_time_score_array": full_time_score_array,
                                                            "full_time_score_array1": position_details_array1,
                                                            "home_full_scores": home_full_scores,
                                                            "away_full_scores": away_full_scores,
                                                            "position_details": position_details_array,
                                                            "standing_details": standing_details_array
                                                        }
                                                        this.current_modal_data = {
                                                            "home_team_scores": home_team_scores,
                                                            "away_team_scores": away_team_scores,
                                                            "full_time_score_array": full_time_score_array,
                                                            "home_full_scores": home_full_scores,
                                                            "away_full_scores": away_full_scores,
                                                            "position_details": position_details_array,
                                                            "standing_details": standing_details_array
                                                        }
                                                        let home_lineup_check = 0
                                                        let away_lineup_check = 0
                                                        for(let p = 0 ; p < homelineuplist.length ; p++){
                                                            let count = 0
                                                            for(let pp = 0 ; pp < home_lineups.length ; pp++){
                                                                if(homelineuplist[p].value == home_lineups[pp]){
                                                                    count++
                                                                }
                                                            }
                                                            if(count > 0){
                                                                home_lineup_check = 1
                                                                homelineuplist[p].label = homelineuplist[p].label + '(' + count + ')'
                                                            }
                                                        }

                                                        console.log('=================awaylineuplist', awaylineuplist)
                                                        console.log('=================away_lineups', away_lineups)
                                                        for(let p = 0 ; p < awaylineuplist.length ; p++){
                                                            let count = 0
                                                            for(let pp = 0 ; pp < away_lineups.length ; pp++){
                                                                if(awaylineuplist[p].value == away_lineups[pp]){
                                                                    count++
                                                                }
                                                            }
                                                            if(count > 0){
                                                                away_lineup_check = 1
                                                                awaylineuplist[p].label = awaylineuplist[p].label + '(' + count + ')'
                                                            }
                                                        }
                                                        let homelineuplist1 = [{ value: '0', label: 'All'}]
                                                        let awaylineuplist1 = [{ value: '0', label: 'All'}]
                                                        for(let p = 0 ; p < homelineuplist.length ; p++){
                                                            if(homelineuplist[p].label.includes('(')){
                                                                homelineuplist1.push(homelineuplist[p])
                                                            }
                                                        }
                                                        for(let p = 0 ; p < awaylineuplist.length ; p++){
                                                            if(awaylineuplist[p].label.includes('(')){
                                                                awaylineuplist1.push(awaylineuplist[p])
                                                            }
                                                        }
                                                        if(away_lineup_check === 0){
                                                            awaylineuplist1 = []
                                                        }
                                                        if(home_lineup_check === 0){
                                                            homelineuplist1 = []
                                                        }
                                                        let seasonId = main_data[j].season_id
                                                        console.log('=================awaylineuplist1', awaylineuplist1)
                                                        this.mainList[u].events[uu] = Object.assign(this.mainList[u].events[uu],{'_id': main_data[j]._id,'season_id': seasonId, 'spots': current_modal_data,'show': false, 'homeLineupList': homelineuplist1,'awayLineupList': awaylineuplist1, 'rank_option': [], 'rank_set': {}, 'rankFilter': false, 'b_data': main_data[j].events, 'eventName': eventName, 'home_id': 0, 'away_id': 0, 'openDate':  main_data[j].time.starting_at.time, 'home':home, 'away': away, 'homeDateList': [], "awayDateList": []})
                                                        let homeTeamId = main_data[j].localTeamId
                                                        let awayTeamId = main_data[j].visitorTeamId

                                                        this.mainList[u].events[uu].home_id = homeTeamId
                                                        this.mainList[u].events[uu].away_id = awayTeamId

                                                        let teamsInfo = main_data[j].teamInfo
                                                        let rank_filter_show = true
                                                        let teamArray = []
                                                        for(let m = 0 ; m < teamsInfo.length ; m++){
                                                            let teams = teamsInfo[m].teams
                                                            if(teams.length < 5){
                                                                // rank_filter_show = false
                                                                // break
                                                                continue
                                                            }
                                                            for(let mm = 0 ; mm < teams.length ; mm++){
                                                                if (teams[mm].team_id)
                                                                    teamArray.push(teams[mm].team_id)
                                                            }
                                                        }
                                                        if(teamArray.length < 5){
                                                            rank_filter_show = false
                                                        }
                                                        teamArray = Array.from(new Set (teamArray))

                                                        let rank_set = {
                                                            "v1": {"from": 1, "to": 0},
                                                            "v2": {"from": 0, "to": 0},
                                                            "v3": {"from": 0, "to": 0},
                                                            "v4": {"from": 0, "to": 0}
                                                        }
                                                        let rankList_option = []
                                                        if(rank_filter_show === true){
                                                            let total_teams = teamArray.length
                                                            if(total_teams % 2 === 0){
                                                                let sec = total_teams/2
                                                                if(sec % 2 === 0){
                                                                    rank_set.v1.to = sec/2
                                                                    rank_set.v2.to = sec
                                                                    rank_set.v3.to = sec*3/2
                                                                    rank_set.v4.to = sec*2

                                                                    rank_set.v2.from = rank_set.v1.to + 1
                                                                    rank_set.v3.from = rank_set.v2.to + 1
                                                                    rank_set.v4.from = rank_set.v3.to + 1
                                                                }
                                                                else{
                                                                    rank_set.v1.to = (sec - 1)/2
                                                                    rank_set.v2.to = sec
                                                                    rank_set.v3.to = sec + (sec - 1)/2
                                                                    rank_set.v4.to = sec*2

                                                                    rank_set.v2.from = rank_set.v1.to + 1
                                                                    rank_set.v3.from = rank_set.v2.to + 1
                                                                    rank_set.v4.from = rank_set.v3.to + 1
                                                                }
                                                            }
                                                            else{
                                                                let f_sec = (total_teams - 1)/2
                                                                let s_sec = (total_teams - 1)/2 + 1
                                                                if(f_sec % 2 === 0){
                                                                    rank_set.v1.to = f_sec/2
                                                                    rank_set.v2.to = f_sec
                                                                    rank_set.v2.from = rank_set.v1.to + 1
                                                                    rank_set.v3.from = rank_set.v2.to + 1
                                                                }
                                                                else{
                                                                    rank_set.v1.to = (f_sec - 1)/2
                                                                    rank_set.v2.to = f_sec
                                                                    rank_set.v2.from = rank_set.v1.to + 1
                                                                    rank_set.v3.from = rank_set.v2.to + 1
                                                                }

                                                                if(s_sec % 2 === 0){
                                                                    rank_set.v3.to = s_sec/2
                                                                    rank_set.v4.to = s_sec
                                                                    rank_set.v4.from = rank_set.v3.to + 1
                                                                }
                                                                else{
                                                                    rank_set.v3.to = f_sec + (s_sec - 1)/2
                                                                    rank_set.v4.to = total_teams
                                                                    rank_set.v4.from = rank_set.v3.to + 1
                                                                }
                                                            }
                                                            this.mainList[u].events[uu].rankFilter = true
                                                            this.mainList[u].events[uu].rank_set = rank_set
                                                            rankList_option = [
                                                                {"value": 1, "label": "vs All"},
                                                                {"value": 2, "label": "vs High rank ( " + rank_set.v1.from + ' to ' + rank_set.v1.to + ' )'},
                                                                {"value": 3, "label": "vs middle-high rank ( " + rank_set.v2.from + ' to ' + rank_set.v2.to + ' )'},
                                                                {"value": 4, "label": "vs middle-low rank (" + rank_set.v3.from + ' to ' + rank_set.v3.to + ' )'},
                                                                {"value": 5, "label": "vs low rank (" + rank_set.v4.from + ' to ' + rank_set.v4.to + ' )'},
                                                            ]
                                                            this.mainList[u].events[uu].rank_option = rankList_option
                                                        }

                                                        let event_item = main_data[j].events
                                                        console.log("event_item===>", event_item)
                                                        let home_date_list = [{'value': 1000,"date": '1900-01-01', "label": "ALL"}]
                                                        let away_date_list = [{'value': 1000,"date": '1900-01-01', "label": "ALL"}]
                                                        let home_date_Index = 0
                                                        let away_date_Index = 0
                                                        for(let m = 0 ; m < event_item.length ; m++){
                                                            for(let mm = 0 ; mm < event_item[m].events.length ; mm++){
                                                                if(event_item[m].events[mm].localteamId == homeTeamId){
                                                                    home_date_Index++
                                                                    home_date_list.push({'value': home_date_Index,"date": event_item[m].events[mm].date, "label": home_date_Index})
                                                                }
                                                                if(event_item[m].events[mm].visitorteamId == awayTeamId){
                                                                    away_date_Index++
                                                                    away_date_list.push({'value': away_date_Index,"date": event_item[m].events[mm].date, "label": away_date_Index})
                                                                }
                                                            }
                                                        }
                                                        this.sortJSON(home_date_list,'date', '123');
                                                        this.sortJSON(away_date_list,'date', '123');

                                                        for(let m = 1 ; m < home_date_list.length; m++){
                                                            home_date_list[m].value = m
                                                            home_date_list[m].label = m
                                                        }

                                                        for(let m = 1 ; m < away_date_list.length; m++){
                                                            away_date_list[m].value = m
                                                            away_date_list[m].label = m
                                                        }

                                                        this.mainList[u].events[uu].homeDateList = home_date_list
                                                        this.mainList[u].events[uu].awayDateList = away_date_list
                                                        home.pos = main_data[j].standing.localteam_position
                                                        away.pos = main_data[j].standing.visitorteam_position

                                                        
                                                        let standings = this.standingList.filter(function(item) {
                                                            
                                                            //return item.stage_id == stage_id;
                                                            return item.season_id == main_data[j].season_id;
                                                            //return item.standings.team_name == main_data[j].localTeamName;
                                                        });


                                                        let new_standing = [];
                                                        
                                                        if (standings.length > 1) {
                                                            
                                                            for (var ss = 0; ss < standings.length; ss++) {
                                                                var find_home = false;
                                                                var find_away = false;
                                                                for (var sss = 0; sss < standings[ss].standings.length; sss++) {
                                                                    if (standings[ss].standings[sss].team_name == main_data[j].localTeamName) {
                                                                        find_home = true
                                                                    }
                                                                    else if (standings[ss].standings[sss].team_name == main_data[j].visitorTeamName ) {
                                                                        find_away = true;                                                                        
                                                                    }
                                                                }
                                                                if (find_home && find_away) {
                                                                    new_standing.push(standings[ss]);
                                                                    break
                                                                }
                                                                    
                                                            }
                                                            
                                                        }
                                                        if (new_standing.length > 0)
                                                            standings = new_standing;
                                                        
                                                        console.log('round_id =>', round_id)
                                                        console.log('stage_id =>', stage_id)

                                                        console.log('this.standingList =>', this.standingList)
                                                        console.log(" new standings=>", standings, stage_id, main_data[j])
                                                        console.log(" new standings--=>", standings)
                                                        console.log(' main id', main_data[j]._id)
                                                        home.h_a = this.h_a_calculation(standings, homeTeamId, '1')
                                                        away.h_a = this.h_a_calculation(standings, awayTeamId, '2')

                                                        // home.h_a = this.H_A_calculation(seasonId, homeTeamId, stage_id,round_id, 'home')
                                                        // away.h_a = this.H_A_calculation(seasonId, awayTeamId, stage_id,round_id,'away')

                                                        let swing1 = (away.pos - away.h_a) - (home.pos - home.h_a)
                                                        if(swing1 > 0){
                                                            away.swing1 = '+'+swing1
                                                            home.swing1 =''
                                                        }
                                                        else if(swing1 < 0){
                                                            away.swing1 =''
                                                            home.swing1 = '+'+swing1*(-1)
                                                        }
                                                        if((home.pos > home.h_a && away.pos > away.h_a) || (home.pos < home.h_a && away.pos < away.h_a)){
                                                            away.swing1 =''
                                                            home.swing1 =''
                                                        }

                                                        let events = main_data[j].events.filter(function(item) {
                                                            return item.stage_id == stage_id
                                                        });
                                                        console.log("events====>", events)
                                                        home.FH = this.f_h_calculation(standings, events, main_data[j].localTeamId, '1')
                                                        away.FH = this.f_h_calculation(standings, events, main_data[j].visitorTeamId, '2')

                                                        // home.FH = this.FH_calculation(main_data[j].events, main_data[j].localTeamId, seasonId, 'home', next_date4, '1', {}, stage_id)
                                                        // away.FH = this.FH_calculation(main_data[j].events, main_data[j].visitorTeamId, seasonId, 'away', next_date4, '1', {}, stage_id)

                                                        let swing2 =(away.pos - away.FH) -  (home.pos - home.FH)
                                                        if(swing2 > 0){
                                                            away.swing2 = '+'+swing2
                                                            home.swing2 =''
                                                        }
                                                        else if(swing2 < 0){
                                                            away.swing2 =''
                                                            home.swing2 = '+'+swing2*(-1)
                                                        }
                                                        if((home.pos > home.FH && away.pos > away.FH) || (home.pos < home.FH && away.pos < away.FH)){
                                                            away.swing2 =''
                                                            home.swing2 =''
                                                        }

                                                        home.SH = this.s_h_calculation(standings, events, main_data[j].localTeamId, '1')
                                                        away.SH = this.s_h_calculation(standings, events, main_data[j].visitorTeamId, '2')

                                                        // home.SH = this.SH_calculation(main_data[j].events, main_data[j].localTeamId,seasonId, 'home', next_date4, '1', {}, stage_id)
                                                        // away.SH = this.SH_calculation(main_data[j].events, main_data[j].visitorTeamId,seasonId, 'away', next_date4, '1', {}, stage_id)

                                                        let swing3 =(away.pos - away.SH) -  (home.pos - home.SH)
                                                        if(swing3 > 0){
                                                            away.swing3 = '+'+swing3
                                                            home.swing3 =''
                                                        }
                                                        else if(swing3 < 0){
                                                            away.swing3 =''
                                                            home.swing3 = '+'+swing3*(-1)
                                                        }
                                                        if((home.pos > home.SH && away.pos > away.SH) || (home.pos < home.SH && away.pos < away.SH)){
                                                            away.swing3 =''
                                                            home.swing3 =''
                                                        }

                                                        home.attack = this.att_calculation(standings, main_data[j].localTeamId, '1')
                                                        // home.attack = this.attack_calculation(seasonId, homeTeamId, 'home', stage_id)
                                                        away.attack = this.def_calculation(standings, main_data[j].visitorTeamId, '2')
                                                        // away.attack = this.attack_calculation(seasonId, awayTeamId, 'away', stage_id)
                                                        home.defense = this.def_calculation(standings, main_data[j].localTeamId, '1')
                                                        // home.defense = this.defense_calculation(seasonId, homeTeamId, 'home', stage_id)
                                                        away.defense = this.att_calculation(standings, main_data[j].visitorTeamId, '2')
                                                        // away.defense = this.defense_calculation(seasonId, awayTeamId, 'away', stage_id)
                                                        home.form = this.form_calculation(standings, events, main_data[j].localTeamId, '1')
                                                        away.form = this.form_calculation(standings, events, main_data[j].visitorTeamId, '2')
                                                        home.form_H_A = this.form_h_a_calculation(standings, events, main_data[j].localTeamId, '1')
                                                        away.form_H_A = this.form_h_a_calculation(standings, events, main_data[j].visitorTeamId, '2')

                                                        // home.form_H_A = this.H_A_Form_calculation(main_data[j].events, main_data[j].localTeamId, seasonId, 'home', next_date4, '1', {}, stage_id)
                                                        // away.form_H_A = this.H_A_Form_calculation(main_data[j].events, main_data[j].visitorTeamId, seasonId, 'away', next_date4, '1', {}, stage_id)
                                                        //home.form = this.Form_calculation(main_data[j].events, main_data[j].localTeamId, seasonId, next_date4, '1', {}, stage_id)
                                                        //away.form = this.Form_calculation(main_data[j].events, main_data[j].visitorTeamId, seasonId, next_date4, '1', {}, stage_id)

                                                        let percentage0 = this.percentage_calculation(main_data[j])
                                                        // percentage = percentage0[0]
                                                        // numbers = percentage0[1]

                                                        home.p = this.p_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                                        away.p = this.p_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})

                                                        console.log('home p========>', home.p)
                                                        console.log('away p========>', away.p)

                                                        home.fh_percentage = (this.fh_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '0', {})/(home.p)*100).toFixed(0)
                                                        away.fh_percentage = (this.fh_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '0', {})/(away.p)*100).toFixed(0)
                                                        home.sh_percentage = (this.sh_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '0', {})/(home.p)*100).toFixed(0)
                                                        away.sh_percentage = (this.sh_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '0', {})/(away.p)*100).toFixed(0)
                                                        home.fh_probability = ((this.fh_probability_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '0', {})/(home.p) + this.fh_probability_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '0', {})/(away.p))/2*100).toFixed(0)
                                                        home.sh_probability = ((this.sh_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '0', {})/(home.p) + this.sh_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '0', {})/(away.p))/2*100).toFixed(0)
                                                        home.pro = this.fh_probability_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '0', {})/(home.p)
                                                        away.pro = this.fh_probability_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '0', {})/(away.p)
                                                        if(home.p == 0){
                                                            home.fh_percentage = 0
                                                            home.sh_percentage = 0
                                                        }
                                                        if(away.p == 0){
                                                            away.fh_percentage = 0
                                                            away.sh_percentage = 0
                                                        }
                                                        if(home.p == 0 && away.p == 0){
                                                            home.fh_probability = 0
                                                            home.sh_probability = 0
                                                        }
                                                        home.z_z = (this.zeroTozero_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.001)*100).toFixed(0)
                                                        away.z_z = (this.zeroTozero_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.001)*100).toFixed(0)
                                                        home.over15 = (this.over15_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.001)*100).toFixed(0)
                                                        away.over15 = (this.over15_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.001)*100).toFixed(0)
                                                        home.over25 = (this.over25_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.001)*100).toFixed(0)
                                                        away.over25 = (this.over25_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.001)*100).toFixed(0)
                                                        home.over35 = (this.over35_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.001)*100).toFixed(0)
                                                        away.over35 = (this.over35_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.001)*100).toFixed(0)
                                                        home.scored = (this.scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.001)*100).toFixed(0)
                                                        away.scored = (this.scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.001)*100).toFixed(0)
                                                        home.conc = (this.concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.001)*100).toFixed(0)
                                                        away.conc = (this.concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.001)*100).toFixed(0)
                                                        home.average1 = (this.average_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)).toFixed(2)
                                                        away.average1 = (this.average_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)).toFixed(2)
                                                        home.average2 = (this.average_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)).toFixed(2)
                                                        away.average2 = (this.average_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)).toFixed(2)
                                                        if(this.average_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {}) == 0){home.average1 = 0;}
                                                        if(this.average_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {}) == 0){away.average1 = 0;}
                                                        if(this.average_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {}) == 0){home.average2 = 0;}
                                                        if(this.average_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {}) == 0){away.average2 = 0;}
                                                        home.bts = (this.average_bts_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.bts = (this.average_bts_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.first1 = (this.FH_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.first1 = (this.FH_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.first2 = (this.FH_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.first2 = (this.FH_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.second1 = (this.SH_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.second1 = (this.SH_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.second2 = (this.SH_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.second2 = (this.SH_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p + 0.0001)*100).toFixed(0)

                                                        home.time15_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 15, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.time15_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 15, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.time15_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 15, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.time15_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 15, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.time30_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 30, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.time30_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 30, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.time30_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 30, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.time30_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 30, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.time45_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.time45_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.time45_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.time45_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.time60_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 60, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.time60_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 60, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.time60_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 60, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.time60_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 60, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.time75_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 75, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.time75_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 75, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.time75_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 75, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.time75_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 75, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.time90_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.time90_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        home.time90_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90, '1', {})/(home.p + 0.0001)*100).toFixed(0)
                                                        away.time90_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90, '1', {})/(away.p + 0.0001)*100).toFixed(0)
                                                        let hgs1 = this.scored_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                                        let ags1 = this.scored_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})
                                                        let hgs2 = this.scored_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                                        let ags2 = this.scored_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})
                                                        home.gs1 = (hgs1/(hgs1 + hgs2)*100).toFixed(0)
                                                        home.gs2 = (hgs2/(hgs1 + hgs2)*100).toFixed(0)
                                                        if((hgs1 + hgs2) == 0){home.gs1 = 0; home.gs2 = 0}
                                                        away.gs1 = (ags1/(ags1 + ags2)*100).toFixed(0)
                                                        away.gs2 = (ags2/(ags1 + ags2)*100).toFixed(0)
                                                        if((ags1 + ags2) == 0){away.gs1 = 0 ; away.gs2 = 0}
                                                        let hgc1 = this.concd_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                                        let agc1 = this.concd_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})
                                                        let hgc2 = this.concd_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                                        let agc2 = this.concd_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})
                                                        home.gc1 = (hgc1/(hgc1 + hgc2)*100).toFixed(0)
                                                        home.gc2 = (hgc2/(hgc1 + hgc2)*100).toFixed(0)
                                                        if((hgc1 + hgc2) == 0){home.gc1 = 0; home.gc2 = 0}
                                                        away.gc1 = (agc1/(agc1 + agc2)*100).toFixed(0)
                                                        away.gc2 = (agc2/(agc1 + agc2)*100).toFixed(0)
                                                        if((agc1 + agc2) == 0){away.gc1 = 0 ; away.gc2 = 0}
                                                        home.over40 = (this.scored_plus_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45, '1', {})/(home.p)*100).toFixed(0)
                                                        away.over40 = (this.scored_plus_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45, '1', {})/(away.p)*100).toFixed(0)
                                                        home.over85 = (this.scored_plus_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90, '1', {})/(home.p)*100).toFixed(0)
                                                        away.over85 = (this.scored_plus_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90, '1', {})/(away.p)*100).toFixed(0)

                                                        home.C_H = (this.win_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                                        away.C_H = (this.win_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                                        home.C_D = (this.draw_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                                        away.C_D = (this.draw_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                                        home.C_A = (this.loss_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                                        away.C_A = (this.loss_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)

                                                        home.lastGoal = (this.Last_goal_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                                        away.lastGoal = (this.Last_goal_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                                        if(home.p == 0){home.over40 = 0; home.over85 = 0; home.C_H = 0; home.C_D = 0; home.C_A = 0; home.lastGoal = 0}
                                                        if(away.p == 0){away.over40 = 0; away.over85 = 0; away.C_H = 0; away.C_D = 0; away.C_A = 0; away.lastGoal = 0}
                                                        home.first10 = this.one_to_zero_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                                        away.first10 = this.one_to_zero_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})

                                                        home.first11 = (this.one_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.first10)*100).toFixed(0)
                                                        away.first11 = (this.one_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.first10)*100).toFixed(0)
                                                        home.first20 = (this.two_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.first10)*100).toFixed(0)
                                                        away.first20 = (this.two_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.first10)*100).toFixed(0)

                                                        if(home.first10 == 0){home.first11 = 0; home.first20 = 0}
                                                        if(away.first10 == 0){away.first11 = 0; away.first20 = 0}
                                                        home.second01 = this.zero_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})
                                                        away.second01 = this.zero_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})

                                                        home.second11 = (this.one_to_one2_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.second01)*100).toFixed(0)
                                                        away.second11 = (this.one_to_one2_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.second01)*100).toFixed(0)
                                                        home.second02 = (this.zero_to_two_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.second01)*100).toFixed(0)
                                                        away.second02 = (this.zero_to_two_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.second01)*100).toFixed(0)

                                                        if(home.second01 == 0){home.second11 = 0; home.second02 = 0}
                                                        if(away.second01 == 0){away.second11 = 0; away.second02 = 0}
                                                        home.secondplus = (this.two_score_ahead_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                                        away.secondplus = (this.two_score_ahead_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                                        home.secondminus = (this.two_score_behind_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                                        away.secondminus = (this.two_score_behind_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                                        home.homefirst = (this.H_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                                        away.homefirst = (this.H_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                                        home.drawfirst = (this.D_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                                        away.drawfirst = (this.D_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                                        home.awayfirst = (this.A_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                                        away.awayfirst = (this.A_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)

                                                        home.homesecond = (this.H_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                                        away.homesecond = (this.H_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                                        home.drawsecond = (this.D_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                                        away.drawsecond = (this.D_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                                        home.awaysecond = (this.A_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '1', {})/(home.p)*100).toFixed(0)
                                                        away.awaysecond = (this.A_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})/(away.p)*100).toFixed(0)
                                                        if(home.p == 0){home.secondplus = 0; home.secondminus = 0; home.homefirst = 0; home.drawfirst = 0; home.awayfirst = 0; home.homesecond = 0; home.drawsecond = 0; home.awaysecond = 0}
                                                        if(away.p == 0){away.secondplus = 0; away.secondminus = 0; away.homefirst = 0; away.drawfirst = 0; away.awayfirst = 0; away.homesecond = 0; away.drawsecond = 0; away.awaysecond = 0}
                                                        this.mainList[u].events[uu].home =  home
                                                        this.mainList[u].events[uu].away =  away
                                                        this.mainList[u].events[uu].show =  true
                                                        console.log('home&away==>', home, away, this.mainList[u].events[uu])
                                                        this.A_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '1', {})
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    console.log('localteamevents========>', localteamevents)
                                    console.log('awayteamevents========>', awayteamevents)
                                    
                                })
                            }
                        }
                    }
                }

            },
            filter_selector(val){
                if(val == 1){
                    let eventsList = []
                    for(let i = 0 ; i < this.mainList.length ; i++){
                        let item = this.mainList[i]
                        for(let j = 0 ; j < item.events.length ; j++){
                            let c = {
                                "country": item.country,
                                "league1": item.league1,
                                "numbers": item.numbers,
                                "percentage": item.percentage,
                                "away": item.events[j].away,
                                "awayDateList": item.events[j].awayDateList,
                                "awayLineupList": item.events[j].awayLineupList,
                                "away_id": item.events[j].away_id,
                                "b_data": item.events[j].b_data,
                                "_id": item.events[j]._id,
                                "eventName": item.events[j].eventName,
                                "home": item.events[j].home,
                                "homeDateList": item.events[j].homeDateList,
                                "homeLineupList": item.events[j].homeLineupList,
                                "home_id": item.events[j].home_id,
                                "openDate": item.events[j].openDate,
                                "rankFilter": item.events[j].rankFilter,
                                "rank_option": item.events[j].rank_option,
                                "rank_set": item.events[j].rank_set
                            }
                            eventsList.push(c)
                        }
                    }
                    let competitionList = eventsList.map(x=>x.league1)
                    competitionList = Array.from(new Set (competitionList))
                    console.log('competition array=>', competitionList)
                    this.mainList = []
                    for(let i = 0 ; i < competitionList.length ; i++){
                        this.mainList.push({"league1": competitionList[i], "country": null, "numbers": null, "percentage": null, "events": []})
                        for(let j = 0 ; j < eventsList.length; j++){
                            if(competitionList[i] == eventsList[j].league1){
                                this.mainList[i].country = eventsList[j].country
                                this.mainList[i].numbers = eventsList[j].numbers
                                this.mainList[i].percentage = eventsList[j].percentage
                                let c = {
                                    "show": eventsList[j].show,
                                    "away": eventsList[j].away,
                                    "awayDateList": eventsList[j].awayDateList,
                                    "awayLineupList": eventsList[j].awayLineupList,
                                    "away_id": eventsList[j].away_id,
                                    "b_data": eventsList[j].b_data,
                                    "_id": eventsList[j]._id,
                                    "eventName": eventsList[j].eventName,
                                    "home": eventsList[j].home,
                                    "homeDateList": eventsList[j].homeDateList,
                                    "homeLineupList": eventsList[j].homeLineupList,
                                    "home_id": eventsList[j].home_id,
                                    "openDate": eventsList[j].openDate,
                                    "rankFilter": eventsList[j].rankFilter,
                                    "rank_option": eventsList[j].rank_option,
                                    "rank_set": eventsList[j].rank_set,
                                }
                                this.mainList[i].events.push(c)
                            }
                        }
                    }
                    let self = this
                    this.sortJSON(self.mainList,'country', '123');
                    console.log('main_list===>', this.mainList)
                }
                else{
                    let eventsList = []
                    for(let i = 0 ; i < this.mainList.length ; i++){
                        let item = this.mainList[i]
                        for(let j = 0 ; j < item.events.length ; j++){
                            let c = {
                                "country": item.country,
                                "league1": item.league1,
                                "numbers": item.numbers,
                                "percentage": item.percentage,
                                "show": item.events[j].show,
                                "away": item.events[j].away,
                                "awayDateList": item.events[j].awayDateList,
                                "awayLineupList": item.events[j].awayLineupList,
                                "away_id": item.events[j].away_id,
                                "b_data": item.events[j].b_data,
                                "_id": item.events[j]._id,
                                "eventName": item.events[j].eventName,
                                "home": item.events[j].home,
                                "homeDateList": item.events[j].homeDateList,
                                "homeLineupList": item.events[j].homeLineupList,
                                "home_id": item.events[j].home_id,
                                "openDate": item.events[j].openDate,
                                "rankFilter": item.events[j].rankFilter,
                                "rank_option": item.events[j].rank_option,
                                "rank_set": item.events[j].rank_set
                            }
                            eventsList.push(c)
                        }
                    }
                    console.log('events_list==>', eventsList)
                    this.mainList = []
                    this.sortJSON(eventsList,'openDate', '123');
                    let p = 0
                    for(let i = 0 ; i < eventsList.length - 1 ; i++){
                        let league1 = eventsList[i].league1
                        let league2 = eventsList[i + 1].league1
                        let events1 = {
                            "show" : eventsList[i].show,
                            "away" : eventsList[i].away,
                            "awayDateList" : eventsList[i].awayDateList,
                            "awayLineupList" : eventsList[i].awayLineupList,
                            "away_id" : eventsList[i].away_id,
                            "b_data" : eventsList[i].b_data,
                            "_id" : eventsList[i]._id,
                            "eventName" : eventsList[i].eventName,
                            "home" : eventsList[i].home,
                            "homeDateList" : eventsList[i].homeDateList,
                            "homeLineupList" : eventsList[i].homeLineupList,
                            "home_id" : eventsList[i].home_id,
                            "openDate" : eventsList[i].openDate,
                            "rankFilter" : eventsList[i].rankFilter,
                            "rank_option" : eventsList[i].rank_option,
                            "rank_set" : eventsList[i].rank_set
                        }
                        let events2 = {
                            "show" : eventsList[i + 1].show,
                            "away" : eventsList[i + 1].away,
                            "awayDateList" : eventsList[i + 1].awayDateList,
                            "awayLineupList" : eventsList[i + 1].awayLineupList,
                            "away_id" : eventsList[i + 1].away_id,
                            "b_data" : eventsList[i + 1].b_data,
                            "_id" : eventsList[i + 1]._id,
                            "eventName" : eventsList[i + 1].eventName,
                            "home" : eventsList[i + 1].home,
                            "homeDateList" : eventsList[i + 1].homeDateList,
                            "homeLineupList" : eventsList[i + 1].homeLineupList,
                            "home_id" : eventsList[i + 1].home_id,
                            "openDate" : eventsList[i + 1].openDate,
                            "rankFilter" : eventsList[i + 1].rankFilter,
                            "rank_option" : eventsList[i + 1].rank_option,
                            "rank_set" : eventsList[i + 1].rank_set
                        }
                        if(i === 0){
                            p++
                            this.mainList.push({"league1": league1,"league": league1, "country": eventsList[i].country, "numbers": eventsList[i].numbers, "percentage": eventsList[i].percentage, "events": [events1]})
                        }
                        if(league1 == league2){
                            this.mainList[p - 1].events.push(events2)
                        }
                        else{
                            p++
                            this.mainList.push({"league1": league2, "league": league2, "country": eventsList[i + 1].country, "numbers": eventsList[i].numbers, "percentage": eventsList[i].percentage, "events": [events2]})
                        }
                    }
                    // console.log('====>', this.mainList)
                }
            },
            //----------cold filter script------------------
            FH_red(val){
                this.filter_key3 = 0
                this.filter_key4 = 0
                this.filter_key5 = 0
                this.filter_key6 = 0
                this.filter_key7 = 0
                this.filter_key8 = 0

                this.red_FH_check = val
                let home_id = this.item_X.home_id
                let away_id = this.item_X.away_id
                let temp =  JSON.stringify(this.mainData)
                let  main_data = JSON.parse(temp)
                console.log('main_data', main_data)
                let bc_data = []
                this.home_date_list = []
                this.away_date_list = []
                let home_date_index = 0
                let away_date_list = 0
                for(let j = 0; j < main_data.length ; j++){
                    if(main_data[j].events.length < 100){
                        if(this.item_X.home_id === main_data[j].localTeamId && this.item_X.away_id === main_data[j].visitorTeamId){
                            bc_data = main_data[j].events
                            for(let p = 0 ; p < main_data[j].events.length ; p++){
                                for(let pp = 0 ; pp < main_data[j].events[p].events.length ; pp++){
                                    if(this.item_X.home_id === main_data[j].events[p].events[pp].localteamId){
                                        home_date_index++
                                        this.home_date_list.push({"date": main_data[j].events[p].events[pp].date, "value": home_date_index, "label": home_date_index})
                                    }
                                    if(this.item_X.away_id === main_data[j].events[p].events[pp].visitorteamId){
                                        away_date_list++
                                        this.away_date_list.push({"date": main_data[j].events[p].events[pp].date, "value": away_date_list, "label": away_date_list})
                                    }
                                }
                            }
                        }
                    }
                }
                console.log('date list check ===>', this.home_date_list, this.away_date_list)
                let self = this
                this.sortJSON(self.home_date_list,'date', '123');
                this.sortJSON(self.away_date_list,'date', '123');
                for(let i = 0 ; i < bc_data.length; i++){
                    for(let j = 0 ; j < bc_data[i].redCards.length ; j++){
                        if(this.red_FH_check === true && bc_data[i].redCards[j].redFH > 0){
                            if(home_id === bc_data[i].redCards[j].localteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }

                                let index1 = this.home_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.home_date_list.splice(index1, 1)

                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                            }
                            if(away_id === bc_data[i].redCards[j].visitorteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }

                                let index1 = this.away_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.away_date_list.splice(index1, 1)

                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                            }
                        }
                        if(this.red_SH_check === true && bc_data[i].redCards[j].redSH > 0){
                            if(home_id === bc_data[i].redCards[j].localteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }

                                let index1 = this.home_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.home_date_list.splice(index1, 1)

                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                            }
                            if(away_id === bc_data[i].redCards[j].visitorteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }

                                let index1 = this.away_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.away_date_list.splice(index1, 1)

                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                            }
                        }
                    }
                }
                this.basic_data = bc_data
                this.refresh_calculation(this.item_X, this.home_date_list[0].date, this.away_date_list[0].date, this.basic_data)
            },
            SH_red(val){
                this.filter_key3 = 0
                this.filter_key4 = 0
                this.filter_key5 = 0
                this.filter_key6 = 0
                this.filter_key7 = 0
                this.filter_key8 = 0

                this.red_SH_check = val
                let home_id = this.item_X.home_id
                let away_id = this.item_X.away_id
                let temp =  JSON.stringify(this.mainData)
                let  main_data = JSON.parse(temp)
                let bc_data = []

                this.home_date_list = []
                this.away_date_list = []
                let home_date_index = 0
                let away_date_list = 0
                for(let j = 0; j < main_data.length ; j++){
                    if(main_data[j].events.length < 100){
                        if(this.item_X.home_id === main_data[j].localTeamId && this.item_X.away_id === main_data[j].visitorTeamId){
                            bc_data = main_data[j].events
                            for(let p = 0 ; p < main_data[j].events.length ; p++){
                                for(let pp = 0 ; pp < main_data[j].events[p].events.length ; pp++){
                                    if(this.item_X.home_id === main_data[j].events[p].events[pp].localteamId){
                                        home_date_index++
                                        this.home_date_list.push({"date": main_data[j].events[p].events[pp].date, "value": home_date_index, "label": home_date_index})
                                    }
                                    if(this.item_X.away_id === main_data[j].events[p].events[pp].visitorteamId){
                                        away_date_list++
                                        this.away_date_list.push({"date": main_data[j].events[p].events[pp].date, "value": away_date_list, "label": away_date_list})
                                    }
                                }
                            }
                        }
                    }
                }
                console.log('date list check ===>', this.home_date_list, this.away_date_list)
                let self = this
                this.sortJSON(self.home_date_list,'date', '123');
                this.sortJSON(self.away_date_list,'date', '123');
                for(let i = 0 ; i < bc_data.length; i++){
                    for(let j = 0 ; j < bc_data[i].redCards.length ; j++){
                        if(this.red_FH_check === true && bc_data[i].redCards[j].redFH > 0){
                            if(home_id === bc_data[i].redCards[j].localteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }
                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                                let index1 = this.home_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.home_date_list.splice(index1, 1)
                            }
                            if(away_id === bc_data[i].redCards[j].visitorteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }
                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                                let index1 = this.away_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.away_date_list.splice(index1, 1)
                            }
                        }
                        if(this.red_SH_check === true && bc_data[i].redCards[j].redSH > 0){
                            if(home_id === bc_data[i].redCards[j].localteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }
                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                                let index1 = this.home_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.home_date_list.splice(index1, 1)
                            }
                            if(away_id === bc_data[i].redCards[j].visitorteamId){
                                let index2 = bc_data[i].events.indexOf(bc_data[i].events[j]);
                                if (index2 > -1) {
                                    bc_data[i].events.splice(index2, 1);
                                }
                                let index = bc_data[i].redCards.indexOf(bc_data[i].redCards[j]);
                                if (index > -1) {
                                    bc_data[i].redCards.splice(index, 1);
                                    j = j - 1
                                }
                                let index1 = this.away_date_list.indexOf(bc_data[i].redCards[j].date)
                                this.away_date_list.splice(index1, 1)
                            }
                        }
                    }
                }
                this.basic_data = bc_data
                this.refresh_calculation(this.item_X, this.home_date_list[0].date, this.away_date_list[0].date, this.basic_data)
            },
            refreshCalc(val){
                this.filter_key1 = this.create_UUID()
                this.filter_key2 = this.create_UUID() + '00'
                this.filter_key5 = 0
                this.filter_key6 = 0
                this.filter_key7 = 0
                this.filter_key8 = 0

                if(val == 1000){
                    this.refresh_calculation(this.item_X, this.home_date_list[1].date, this.away_date_list[1].date, this.basic_data)
                }
                else{
                    let home_date = ''
                    let away_date = ''
                    for(let i = 0 ; i < this.home_date_list.length ; i++){
                        if(this.home_date_list.length - i == val){
                            home_date = this.home_date_list[i].date
                        }
                    }
                    for(let i = 0 ; i < this.away_date_list.length; i++){
                        if(this.away_date_list.length - i == val){
                            away_date = this.away_date_list[i].date
                        }
                    }
                    // console.log('=====>', this.home_date_list, ', ', this.away_date_list)
                    this.refresh_calculation(this.item_X, home_date, away_date, this.basic_data)
                }
            },
            fh_probability_calculation(data, teamId, dir, date, d, ranks){
                let getDate = new Date();
                let endDate = getDate.setDate(getDate.getDate() + 0);
                endDate = new Date(endDate).toISOString()
                endDate = endDate.substring(0,10)

                let p = 0
                if(d == '0'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    let away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    if(home_goal > 0 || away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    let away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    if(home_goal > 0 || away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d == '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    let away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    if(home_goal > 0 || away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    let away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    if(home_goal > 0 || away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d == '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    let away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    if(home_goal > 0 || away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    let away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    if(home_goal > 0 || away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d == '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    let away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    if(home_goal > 0 || away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    let away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    if(home_goal > 0 || away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            fh_percentage_calculation(data, teamId, dir, date, d, ranks){
                let getDate = new Date();
                let endDate = getDate.setDate(getDate.getDate() + 0);
                endDate = new Date(endDate).toISOString()
                endDate = endDate.substring(0,10)

                let p = 0
                if(d == '0'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    if(home_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    if(away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d == '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    if(home_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    if(away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d == '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    if(home_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    if(away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d == '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    if(home_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].date < endDate && data[i].events[j].hf_score != null){
                                    let away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    if(away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            sh_percentage_calculation(data, teamId, dir, date, d, ranks){
                let getDate = new Date();
                let endDate = getDate.setDate(getDate.getDate() + 0);
                endDate = new Date(endDate).toISOString()
                endDate = endDate.substring(0,10)

                let p = 0
                if(d == '0'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < endDate && data[i].events[j].hf_score != null && data[i].events[j].ft_score != null){
                                    let fh_home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    let sh_home_goal = parseInt(data[i].events[j].ft_score.split("-")[0])
                                    if(sh_home_goal - fh_home_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < endDate && data[i].events[j].hf_score != null && data[i].events[j].ft_score != null){
                                    let fh_away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    let sh_away_goal = parseInt(data[i].events[j].ft_score.split("-")[1])
                                    if(sh_away_goal - fh_away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                if(d == '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].date < endDate && data[i].events[j].hf_score != null && data[i].events[j].ft_score != null){
                                    let fh_home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    let sh_home_goal = parseInt(data[i].events[j].ft_score.split("-")[0])
                                    if(sh_home_goal - fh_home_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].date < endDate && data[i].events[j].hf_score != null && data[i].events[j].ft_score != null){
                                    let fh_away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    let sh_away_goal = parseInt(data[i].events[j].ft_score.split("-")[1])
                                    if(sh_away_goal - fh_away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d == '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].date < endDate && data[i].events[j].hf_score != null && data[i].events[j].ft_score != null){
                                    let fh_home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    let sh_home_goal = parseInt(data[i].events[j].ft_score.split("-")[0])
                                    if(sh_home_goal - fh_home_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].date < endDate && data[i].events[j].hf_score != null && data[i].events[j].ft_score != null){
                                    let fh_away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    let sh_away_goal = parseInt(data[i].events[j].ft_score.split("-")[1])
                                    if(sh_away_goal - fh_away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d == '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].date < endDate && data[i].events[j].hf_score != null && data[i].events[j].ft_score != null){
                                    let fh_home_goal = parseInt(data[i].events[j].hf_score.split("-")[0])
                                    let sh_home_goal = parseInt(data[i].events[j].ft_score.split("-")[0])
                                    if(sh_home_goal - fh_home_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].date < endDate && data[i].events[j].hf_score != null && data[i].events[j].ft_score != null){
                                    let fh_away_goal = parseInt(data[i].events[j].hf_score.split("-")[1])
                                    let sh_away_goal = parseInt(data[i].events[j].ft_score.split("-")[1])
                                    if(sh_away_goal - fh_away_goal > 0){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            p_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    console.log('==>', dir, ranks)
                    for(let i = 0; i < data.length; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            percentage_calculation(data){
                let p = 0
                let p1 = 0
                let events = data.events
                let roundId = data.round_id
                let name1 = 0
                let stage_id = 0
                let round_ids = events.filter(function(item) {
                    return item.round_id == roundId;
                });
                if(events.length > 0){
                    if(round_ids.length > 0){
                        name1 = round_ids[0].name
                        stage_id =round_ids[0].stage_id
                        p = (name1/events.length*100).toFixed(0)
                    }

                    for(let i = 0 ; i < events.length ; i++){
                        if(events[i].stage_id !== stage_id && events[i].events.length > 0){
                            p1++
                        }
                    }

                    if(p1 > 0){
                        name1 = name1 + p1
                        p = (name1/events.length*100).toFixed(0)
                    }
                }
                return [p, name1]
            },
            zeroTozero_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore == 0 && data[i].events[j].visitorteamSore == 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            over15_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 1)){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            over25_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 2)){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            over35_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && (data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 3)){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            scored_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            concd_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            average_scored_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                    }
                }
                return p
            },
            average_concd_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore > 0){
                                    p = p + data[i].events[j].visitorteamSore
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore > 0){
                                    p = p + data[i].events[j].localteamScore
                                }
                            }
                        }
                    }
                }
                return p
            },
            average_bts_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore > 0 && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore > 0 && data[i].events[j].visitorteamSore > 0 ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore > 0 && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore > 0 && data[i].events[j].visitorteamSore > 0 ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore > 0 && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore > 0 && data[i].events[j].visitorteamSore > 0 ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore > 0 && data[i].events[j].localteamScore > 0){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore > 0 && data[i].events[j].visitorteamSore > 0 ){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            FH_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            FH_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute < 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            SH_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            SH_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45){
                                            check++
                                        }
                                    }
                                    if(check > 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            time_scored_calculation(data, teamId, dir, date, time, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == teamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            time_concd_calculation(data, teamId, dir, date, time, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].localteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].localteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].localteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].teamId == data[i].events[j].localteamId && data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 15){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            scored_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            scored_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            concd_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            concd_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 &&  data[i].events[j].goals[k].teamId ==data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            scored_plus_calculation(data, teamId, dir, date, time, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d ==='2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d ==='3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d ==='4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= time && data[i].events[j].goals[k].minute > time - 6){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            win_percentage_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore < data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore > data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore < data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore > data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore < data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore > data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore < data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore > data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            draw_percentage_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore == data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore == data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore == data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore == data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore == data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore == data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore == data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore == data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            loss_percentage_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore > data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore < data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore > data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore < data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore > data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore < data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore > data[i].events[j].localteamScore ){
                                    p++
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore < data[i].events[j].visitorteamSore ){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            one_to_zero_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            one_to_one_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            two_to_one_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].localteamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            zero_to_one_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[0].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            one_to_one2_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[1].teamId == teamId && data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[1].teamId == teamId && data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[1].teamId == teamId && data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[1].teamId == teamId && data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == data[i].events[j].localteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            zero_to_two_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == data[i].events[j].visitorteamId && data[i].events[j].goals[1].teamId == data[i].events[j].visitorteamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 1){
                                        if(data[i].events[j].goals[0].teamId == teamId && data[i].events[j].goals[1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            two_score_ahead_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                return p
            },
            two_score_behind_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(awayteamScore - hometeamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let check = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        let hometeamScore = parseInt(data[i].events[j].goals[k].result.split('-')[0])
                                        let awayteamScore = parseInt(data[i].events[j].goals[k].result.split('-')[1])
                                        if(hometeamScore - awayteamScore >= 2){
                                            check = 1
                                        }
                                    }
                                    if(check == 1){p++}
                                }
                            }
                        }
                    }
                }
                return p
            },
            H_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            D_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            A_1st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute <= 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            H_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum > visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            D_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum == visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            A_2st_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            localScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].visitorteamId){
                                            visitorScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    let localScoreSum = 0
                                    let visitorScoreSum = 0
                                    for(let k = 0 ; k < data[i].events[j].goals.length ; k++){
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == teamId){
                                            visitorScoreSum++
                                        }
                                        if(data[i].events[j].goals[k].minute > 45 && data[i].events[j].goals[k].teamId == data[i].events[j].localteamId){
                                            localScoreSum++
                                        }
                                    }
                                    if(localScoreSum < visitorScoreSum){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            Last_goal_calculation(data, teamId, dir, date, d, ranks){
                let p = 0
                if(d === '1'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date < date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date < date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].date >= date && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].date >= date && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].awayRank >= ranks.from && data[i].events[j].awayRank <= ranks.to && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].homeRank >= ranks.from && data[i].events[j].homeRank <= ranks.to && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0; i < data.length ; i++){
                        if(dir == 'home'){
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].localteamId == teamId && data[i].events[j].local_formation == ranks && data[i].events[j].visitorteamSore + data[i].events[j].localteamScore > 0){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            for(let j = 0 ; j < data[i].events.length; j++){
                                if(data[i].events[j].visitorteamId == teamId && data[i].events[j].visit_formation == ranks && data[i].events[j].localteamScore + data[i].events[j].visitorteamSore > 0 ){
                                    if(data[i].events[j].goals.length > 0){
                                        if(data[i].events[j].goals[data[i].events[j].goals.length - 1].teamId == teamId){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            H_A_calculation(seasonId, teamId, stage_id, round_id, dir){
                //console.log('stage_id & seasonId=>', seasonId, ', ', stage_id)
                let rankArray = []
                let teamPoints = 0
                let rank = 1
                let team_goals_scored = 0
                let team_goals_against = 0
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId && this.standingList[i].stage_id == stage_id){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            if(dir == 'home'){
                                rankArray.push({"teamId": this.standingList[i].standings[j].team_id, "points": (this.standingList[i].standings[j].home.won*3 + this.standingList[i].standings[j].home.draw)/(this.standingList[i].standings[j].overall.games_played), 'goals_scored': this.standingList[i].standings[j].home.goals_scored, 'goals_against': this.standingList[i].standings[j].home.goals_against})
                                if(this.standingList[i].standings[j].team_id == teamId){
                                    teamPoints =  (this.standingList[i].standings[j].home.won*3 + this.standingList[i].standings[j].home.draw)/(this.standingList[i].standings[j].overall.games_played)
                                    team_goals_scored = this.standingList[i].standings[j].home.goals_scored
                                    team_goals_against = this.standingList[i].standings[j].home.goals_against
                                }
                            }
                            else{
                                rankArray.push({"teamId": this.standingList[i].standings[j].team_id, "points": (this.standingList[i].standings[j].away.won*3 + this.standingList[i].standings[j].away.draw)/(this.standingList[i].standings[j].overall.games_played), 'goals_scored': this.standingList[i].standings[j].away.goals_scored, 'goals_against': this.standingList[i].standings[j].away.goals_against})
                                if(this.standingList[i].standings[j].team_id == teamId){
                                    teamPoints =  (this.standingList[i].standings[j].away.won*3 + this.standingList[i].standings[j].away.draw)/(this.standingList[i].standings[j].overall.games_played)
                                    team_goals_scored = this.standingList[i].standings[j].away.goals_scored
                                    team_goals_against = this.standingList[i].standings[j].away.goals_against
                                }
                            }
                        }
                        for(let j = 0 ; j < rankArray.length ; j++){
                            if(rankArray[j].points > teamPoints){
                                rank++
                            }
                            if(rankArray[j].points == teamPoints){
                                if((team_goals_scored - team_goals_against) < (rankArray[j].goals_scored - rankArray[j].goals_against)){
                                    rank++
                                }
                            }
                        }
                    }
                }
                if(teamId == 300){
                    console.log('teamPoints=>',teamPoints)
                }
                return rank
            },
            FH_calculation(data, teamId, seasonId, dir, date, d, ranks, stage_id){
                console.log("stage_id=>", stage_id)
                let teamIdArray = []
                let pArray = []
                let rank = 1
                let currentTeamData = {}
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId && this.standingList[i].stage_id == stage_id){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            teamIdArray[j] = this.standingList[i].standings[j].team_id
                            pArray[j] = this.standingList[i].standings[j].overall.games_played
                        }
                    }
                }
                teamIdArray = Array.from(new Set (teamIdArray))
                let rankArray = []
                if(d === '1'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0, "p": 1})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && stage_id == data[j].events[k].stage_id && data[j].events[k].date < date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        // let hf_score = data[j].events[k].hf_score
                                        // if(hf_score){
                                        //     localScoreSum = parseInt(hf_score.split("-")[0])
                                        //     visitorScoreSum = parseInt(hf_score.split("-")[1])
                                        // }
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].stage_id == stage_id && data[j].events[k].date < date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        // let hf_score = data[j].events[k].hf_score
                                        // if(hf_score){
                                        //     localScoreSum = parseInt(hf_score.split("-")[0])
                                        //     visitorScoreSum = parseInt(hf_score.split("-")[1])
                                        // }
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = (draw + won*3)/pArray[i]
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }

                }
                else if(d === '2'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].date >= date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].date >= date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }

                }
                else if(d === '3'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].awayRank >= ranks.from && data[j].events[k].awayRank <= ranks.to){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].homeRank >= ranks.from && data[j].events[k].homeRank <= ranks.to){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].local_formation == ranks){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].visit_formation == ranks){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute <= 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                for(let i = 0 ; i < rankArray.length ; i++){
                    if(rankArray[i].points > currentTeamData.points){
                        rank++
                    }
                    if(rankArray[i].points == currentTeamData.points){
                        if((rankArray[i].goals_scored - rankArray[i].goals_against) > (currentTeamData.goals_scored - currentTeamData.goals_against)){
                            rank++
                        }
                    }
                }
                console.log("current team data=>", currentTeamData, ', rankArray=>', rankArray)
                return rank
            },
            SH_calculation(data, teamId, seasonId, dir, date, d, ranks, stage_id){
                let teamIdArray = []
                let pArray = []
                let rank = 1
                let currentTeamData = {}
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId && this.standingList[i].stage_id == stage_id){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            teamIdArray[j] = this.standingList[i].standings[j].team_id
                            pArray[j] = this.standingList[i].standings[j].overall.games_played
                        }
                    }
                }
                teamIdArray = Array.from(new Set (teamIdArray))
                let rankArray = []
                if(d === '1'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].stage_id == stage_id && data[j].events[k].date < date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].stage_id == stage_id && data[j].events[k].date < date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = (draw + won*3)/pArray[i]
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                            console.log("====>", currentTeamData.points, (draw + won*3))
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].date >= date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].date >= date){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].awayRank >= ranks.from && data[j].events[k].awayRank <= ranks.to){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].homeRank >= ranks.from && data[j].events[k].homeRank <= ranks.to){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = 0 ; j < data.length ; j++){
                            if(dir == 'home'){
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].local_formation == ranks){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = 0 ; k < data[j].events.length; k++){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].visit_formation == ranks){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].minute > 45 && data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                for(let i = 0 ; i < rankArray.length ; i++){
                    if(rankArray[i].points > currentTeamData.points){
                        rank++
                    }
                    if(rankArray[i].points == currentTeamData.points){
                        if((rankArray[i].goals_scored - rankArray[i].goals_against) > (currentTeamData.goals_scored - currentTeamData.goals_against)){
                            rank++
                        }
                    }
                }
                return rank
            },
            attack_calculation(seasonId, teamId, dir, stage_id){
                let rankArray = []
                let rank = 1
                let team_goals_scored = 0
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId && this.standingList[i].stage_id == stage_id){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            if(dir == 'home'){
                                rankArray.push({"teamId": this.standingList[i].standings[j].team_id, "points": this.standingList[i].standings[j].home.won*3 + this.standingList[i].standings[j].home.draw, 'goals_scored': this.standingList[i].standings[j].home.goals_scored, 'goals_against': this.standingList[i].standings[j].home.goals_against})
                                if(this.standingList[i].standings[j].team_id == teamId){
                                    team_goals_scored = this.standingList[i].standings[j].home.goals_scored
                                }
                            }
                            else{
                                rankArray.push({"teamId": this.standingList[i].standings[j].team_id, "points": this.standingList[i].standings[j].away.won*3 + this.standingList[i].standings[j].away.draw, 'goals_scored': this.standingList[i].standings[j].away.goals_scored, 'goals_against': this.standingList[i].standings[j].away.goals_against})
                                if(this.standingList[i].standings[j].team_id == teamId){
                                    team_goals_scored = this.standingList[i].standings[j].away.goals_scored
                                }
                            }
                        }

                        for(let j = 0 ; j < rankArray.length ; j++){
                            if(rankArray[j].goals_scored > team_goals_scored){
                                rank++
                            }
                        }
                    }
                }
                return rank
            },
            defense_calculation(seasonId, teamId, dir, stage_id){
                let rankArray = []
                let rank = 1
                let team_goals_against = 0
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId && this.standingList[i].stage_id == stage_id){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            if(dir == 'home'){
                                rankArray.push({"teamId": this.standingList[i].standings[j].team_id, "points": this.standingList[i].standings[j].home.won*3 + this.standingList[i].standings[j].home.draw, 'goals_scored': this.standingList[i].standings[j].home.goals_scored, 'goals_against': this.standingList[i].standings[j].home.goals_against})
                                if(this.standingList[i].standings[j].team_id == teamId){
                                    team_goals_against = this.standingList[i].standings[j].home.goals_against
                                }
                            }
                            else{
                                rankArray.push({"teamId": this.standingList[i].standings[j].team_id, "points": this.standingList[i].standings[j].away.won*3 + this.standingList[i].standings[j].away.draw, 'goals_scored': this.standingList[i].standings[j].away.goals_scored, 'goals_against': this.standingList[i].standings[j].away.goals_against})
                                if(this.standingList[i].standings[j].team_id == teamId){
                                    team_goals_against = this.standingList[i].standings[j].away.goals_against
                                }
                            }
                        }

                        for(let j = 0 ; j < rankArray.length ; j++){
                            if(rankArray[j].goals_against < team_goals_against){
                                rank++
                            }
                        }
                    }
                }
                return rank
            },
            H_A_Form_calculation(data, teamId, seasonId, dir, date,d, ranks, stage_id){
                let teamIdArray = []
                let pArray = []
                let rank = 1
                let currentTeamData = {}
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId && stage_id == this.standingList[i].stage_id){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            teamIdArray[j] = this.standingList[i].standings[j].team_id
                            pArray[j] = this.standingList[i].standings[j].overall.games_played
                        }
                    }
                }
                teamIdArray = Array.from(new Set (teamIdArray))
                let rankArray = []
                if(d === '1'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            if(dir == 'home'){
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].stage_id == stage_id && data[j].events[k].date < date){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    localScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum > visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].stage_id == stage_id &&  data[j].events[k].date < date){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                    localScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum < visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = (draw + won*3)
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            if(dir == 'home'){
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].date >= date){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    localScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum > visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].date >= date){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                    localScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum < visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            if(dir == 'home'){
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].awayRank >= ranks.from && data[j].events[k].awayRank <= ranks.to){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    localScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum > visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].homeRank >= ranks.from && data[j].events[k].homeRank <= ranks.to){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                    localScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum < visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '4'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            if(dir == 'home'){
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].localteamId == teamIdArray[i] && data[j].events[k].local_formation == ranks){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    localScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum > visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                            else{
                                for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                    if(data[j].events[k].visitorteamId == teamIdArray[i] && data[j].events[k].visit_formation == ranks){
                                        limit++
                                        if(limit <= 3){
                                            let localScoreSum = 0
                                            let visitorScoreSum = 0
                                            for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                                if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                    visitorScoreSum++
                                                    rankArray[i].goals_scored++
                                                }
                                                if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                    localScoreSum++
                                                    rankArray[i].goals_against++
                                                }
                                            }
                                            if(localScoreSum == visitorScoreSum){
                                                draw++
                                            }
                                            else if(localScoreSum < visitorScoreSum){
                                                won++
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                for(let i = 0 ; i < rankArray.length ; i++){
                    if(rankArray[i].points > currentTeamData.points){
                        rank++
                    }
                    if(rankArray[i].points == currentTeamData.points){
                        if((rankArray[i].goals_scored - rankArray[i].goals_against) > (currentTeamData.goals_scored - currentTeamData.goals_against)){
                            rank++
                        }
                    }
                }
                return rank
            },
            Form_calculation(data, teamId, seasonId, date, d, ranks, stage_id){
                let teamIdArray = []
                let pArray = []
                let rank = 1
                let currentTeamData = {}
                for(let i = 0 ; i < this.standingList.length ; i++){
                    if(this.standingList[i].season_id == seasonId && this.standingList[i].stage_id == stage_id){
                        for(let j = 0 ; j < this.standingList[i].standings.length; j++){
                            teamIdArray[j] = this.standingList[i].standings[j].team_id
                            pArray[j] = this.standingList[i].standings[j].overall.games_played
                        }
                    }
                }
                teamIdArray = Array.from(new Set (teamIdArray))
                let rankArray = []
                if(d === '1'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                if((data[j].events[k].localteamId == teamIdArray[i] || data[j].events[k].visitorteamId == teamIdArray[i]) && data[j].events[k].stage_id == stage_id && data[j].events[k].date < date){
                                    limit++
                                    if(data[j].events[k].localteamId == teamIdArray[i] && limit <= 6){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                    else if(data[j].events[k].visitorteamId == teamIdArray[i] && limit <= 6){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = (draw + won*3)
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                if((data[j].events[k].localteamId == teamIdArray[i] || data[j].events[k].visitorteamId == teamIdArray[i]) && data[j].events[k].date >= date){
                                    limit++
                                    if(data[j].events[k].localteamId == teamIdArray[i] && limit <= 6){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                    else if(data[j].events[k].visitorteamId == teamIdArray[i] && limit <= 6){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < teamIdArray.length ; i++){
                        let won = 0
                        let draw = 0
                        let limit = 0
                        rankArray.push({"teamId": teamIdArray[i], "points": 0, 'goals_scored': 0, 'goals_against': 0})
                        for(let j = data.length - 1 ; j >= 0 ; j--){
                            for(let k = data[j].events.length - 1 ; k >= 0; k--){
                                if((data[j].events[k].localteamId == teamIdArray[i] || data[j].events[k].visitorteamId == teamIdArray[i])  && data[j].events[k].date >= date){
                                    limit++
                                    if(data[j].events[k].localteamId == teamIdArray[i] && limit <= 6){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                localScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].teamId == data[j].events[k].visitorteamId){
                                                visitorScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum > visitorScoreSum){
                                            won++
                                        }
                                    }
                                    else if(data[j].events[k].visitorteamId == teamIdArray[i] && limit <= 6){
                                        let localScoreSum = 0
                                        let visitorScoreSum = 0
                                        for(let l = 0 ; l < data[j].events[k].goals.length ; l++){
                                            if(data[j].events[k].goals[l].teamId == teamIdArray[i]){
                                                visitorScoreSum++
                                                rankArray[i].goals_scored++
                                            }
                                            if(data[j].events[k].goals[l].teamId == data[j].events[k].localteamId){
                                                localScoreSum++
                                                rankArray[i].goals_against++
                                            }
                                        }
                                        if(localScoreSum == visitorScoreSum){
                                            draw++
                                        }
                                        else if(localScoreSum < visitorScoreSum){
                                            won++
                                        }
                                    }
                                }
                            }
                        }
                        rankArray[i].points = draw + won*3
                        if(teamIdArray[i] == teamId){
                            currentTeamData = rankArray[i]
                        }
                    }
                }

                for(let i = 0 ; i < rankArray.length ; i++){
                    if(rankArray[i].points > currentTeamData.points){
                        rank++
                    }
                    if(rankArray[i].points == currentTeamData.points){
                        if((rankArray[i].goals_scored - rankArray[i].goals_against) > (currentTeamData.goals_scored - currentTeamData.goals_against)){
                            rank++
                        }
                    }
                }
                return rank
            },
            date_select(val){
                let week = this.week_filter.filter(function(item) {
                    return item.value == val;
                });
                this.current_week = week[0].pages
                this.current_date = val
                this.readData(val)
            },
            frame() {
                if (this.current_counter >= 95) {
                    this.current_counter = 95
                    clearInterval(this.clock);
                } else {
                    this.current_counter++;
                }
            },
            frame1() {
                if (this.current_counter >= 95) {
                    this.current_counter = 95
                    clearInterval(this.clock1);
                } else {
                    this.current_counter++;
                }
            },
            frame2() {
                if (this.current_counter >= 95) {
                    this.current_counter = 95
                    clearInterval(this.clock2);
                } else {
                    this.current_counter++;
                }
            },
            frame3() {
                if (this.current_counter >= 95) {
                    this.current_counter = 95
                    clearInterval(this.clock3);
                } else {
                    this.current_counter++;
                }
            },
            frame4() {
                if (this.current_counter >= 95) {
                    this.current_counter = 95
                    clearInterval(this.clock4);
                } else {
                    this.current_counter++;
                }
            },
            readData(c_date){
                this.isload = false
                this.current_counter = 0
                clearInterval(this.clock)
                clearInterval(this.clock1)
                clearInterval(this.clock2)
                clearInterval(this.clock3)
                clearInterval(this.clock4)
                console.log('this current week====>', this.current_week)
                if(this.current_week <= 1){
                    this.clock = setInterval(this.frame, 300);
                }
                else if(this.current_week === 2){
                    this.clock1 = setInterval(this.frame1, 400);
                }
                else if(this.current_week === 3){
                    this.clock2 = setInterval(this.frame2, 600);
                }
                else if(this.current_week === 4){
                    this.clock3 = setInterval(this.frame3, 1000);
                }
                else{
                    this.clock4 = setInterval(this.frame4, 1000);
                }
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
                window.axios.post(`${process.env.VUE_APP_URL}getStatsNew`, [c_date, user_id, this.current_page]).then(({data})=> {
                    console.log('data******', data.data[2])
                    console.log('data1******', data.data[1])
                    console.log('data_date_fixture===>', data.data[3])
                    console.log('events Length===>', data.data[4])
                    let p = 0
                    this.pages = []
                    for(let i = 1 ; i < data.data[4]; i++){
                        if((i % 20) === 0){
                            p++
                            if(p === this.current_page){
                                this.pages.push({'value': p, 'label': p, 'color': 'blue', 'font_weight': 'bold'})
                            }
                            else{
                                this.pages.push({'value': p, 'label': p, 'color': 'black', 'font_weight': 'normal'})
                            }
                        }
                    }
                    if(p*20 < data.data[4]){
                        if(p + 1 === this.current_page){
                            this.pages.push({'value': p + 1, 'label': p + 1, 'color': 'blue', 'font_weight': 'bold'})
                        }
                        else{
                            this.pages.push({'value': p + 1, 'label': p + 1, 'color': 'black', 'font_weight': 'normal'})
                        }
                    }
                    this.max_page_num = this.pages.length
                    // console.log('pages===>', this.pages)
                    let date_list = data.data[3]
                    let standing = data.data[1]


                    let new_standing = []
                    let seasonStandings_idList = []
                    for(let i = 0 ; i < standing.length ; i++){
                        let check = 0
                        for(let j = 0 ; j < standing[i].standings.length ; j++){
                            if(standing[i].standings[j].standings){
                                check = 1
                                standing[i].standings[j].standings = standing[i].standings[j].standings.data
                                if (!seasonStandings_idList.includes(standing[i].standings[j].id)) {
                                    new_standing.push(standing[i].standings[j])
                                    seasonStandings_idList.push(standing[i].standings[j].id)
                                }
                                
                            }
                        }
                        if(check == 0){
                            
                            if (!seasonStandings_idList.includes(standing[i]._id)) {
                                new_standing.push(standing[i])
                                seasonStandings_idList.push(standing[i]._id)
                            }
                        }
                    }
                    this.standingList = new_standing
                   
                    let main_data = data.data[2]
                    
                    let competitionArray = []
                    for(let i = 0 ; i < main_data.length ; i++){
                        if(main_data[i].competitions[0]){
                            competitionArray[i] = main_data[i].competitions[0].league
                        }
                    }
                    competitionArray = Array.from(new Set (competitionArray))
                    this.mainList = []
                    for(let i = 0 ; i < competitionArray.length; i++){
                        let k = 0
                        let events = []
                        let percentage = 0
                        let numbers = 0
                        let clubs = 0
                        for(let j = 0; j < main_data.length ; j++){
                            if(main_data[j].competitions[0]){
                                if(competitionArray[i] == main_data[j].competitions[0].league){
                                    k++
                                    let start_date4 = new Date();
                                    let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
                                    next_date4 = new Date(next_date4).toISOString()
                                    next_date4 = next_date4.substring(0,10)
                                    let home = {
                                        p:0,
                                        name:'',
                                        rank: '',
                                        z_z: 0,
                                        over15: 0,
                                        over25:0,
                                        over35:0,
                                        scored:0,
                                        conc:0,
                                        average1:0,
                                        average2:0,
                                        bts:0,
                                        first1:0,
                                        first2:0,
                                        second1:0,
                                        second2:0,
                                        time15_S:0,
                                        time30_S:0,
                                        time45_S:0,
                                        time60_S:0,
                                        time75_S:0,
                                        time90_S:0,
                                        time15_C:0,
                                        time30_C:0,
                                        time45_C:0,
                                        time60_C:0,
                                        time75_C:0,
                                        time90_C:0,
                                        gs1:0,
                                        gs2:0,
                                        gc1:0,
                                        gc2:0,
                                        over40:0,
                                        over85:0,
                                        C_H:0,
                                        C_D:0,
                                        C_A:0,
                                        first10:0,
                                        first11:0,
                                        first20:0,
                                        second01:0,
                                        second11:0,
                                        second02:0,
                                        firstGoal:0,
                                        lastGoal:0,
                                        secondplus:0,
                                        secondminus:0,
                                        homefirst:0,
                                        drawfirst:0,
                                        awayfirst:0,
                                        homesecond:0,
                                        drawsecond:0,
                                        awaysecond:0,
                                        eventdays:['All'],
                                        pos:0,
                                        h_a:0,
                                        swing1:'',
                                        FH:0,
                                        swing2:'',
                                        SH:0,
                                        swing3:'',
                                        attack:0,
                                        defense:0,
                                        form:0,
                                        form_H_A:0

                                    }
                                    let away = {
                                        p:0,
                                        name:'',
                                        rank:'' ,
                                        z_z: 0,
                                        over15: 0,
                                        over25:0,
                                        over35:0,
                                        scored:0,
                                        conc:0,
                                        average1:0,
                                        average2:0,
                                        bts:0,
                                        first1:0,
                                        first2:0,
                                        second1:0,
                                        second2:0,
                                        time15_S:0,
                                        time30_S:0,
                                        time45_S:0,
                                        time60_S:0,
                                        time75_S:0,
                                        time90_S:0,
                                        time15_C:0,
                                        time30_C:0,
                                        time45_C:0,
                                        time60_C:0,
                                        time75_C:0,
                                        time90_C:0,
                                        gs1:0,
                                        gs2:0,
                                        gc1:0,
                                        gc2:0,
                                        over40:0,
                                        over85:0,
                                        C_H:0,
                                        C_D:0,
                                        C_A:0,
                                        first10:0,
                                        first11:0,
                                        first20:0,
                                        second01:0,
                                        second11:0,
                                        second02:0,
                                        firstGoal:0,
                                        lastGoal:0,
                                        secondPlus:0,
                                        secondMinus:0,
                                        homefirst:0,
                                        drawfirst:0,
                                        awayfirst:0,
                                        homesecond:0,
                                        drawsecond:0,
                                        awaysecond:0,
                                        eventdays:['All'],
                                        pos:0,
                                        h_a:0,
                                        swing1: '',
                                        FH:0,
                                        swing2: '',
                                        SH:0,
                                        swing3: '',
                                        attack:0,
                                        defense:0,
                                        form:0,
                                        form_H_A:0
                                    }
                                    let localTeamId = main_data[j].localTeamId
                                    let visitorTeamId = main_data[j].visitorTeamId
                                    let seasonId = main_data[j].season_id
                                    let id = main_data[j]._id
                                    if(main_data[j].season_percentage){
                                        percentage = main_data[j].season_percentage
                                    }

                                    if(main_data[j].played_numbers){
                                        numbers = main_data[j].played_numbers
                                        clubs = parseInt(main_data[j].played_numbers/main_data[j].number_of_clubs)
                                    }
                                    else{
                                        numbers = 0
                                    }
                                    home.name = main_data[j].localTeamName + '(' + main_data[j].standing.localteam_position + ')'
                                    away.name = main_data[j].visitorTeamName +  '(' + main_data[j].standing.visitorteam_position + ')'
                                    events[k - 1] = {'_id': id, 'season_id': seasonId, 'show': false, "spots": [], 'homeLineupList': [],'awayLineupList': [], 'rank_option': [], 'rank_set': {}, 'rankFilter': false, 'b_data': [], 'eventName': main_data[j].time.starting_at.time.substring(0, 5) + ' ' + main_data[j].localTeamName + '(' + main_data[j].standing.localteam_position + ')' + ' v ' + main_data[j].visitorTeamName +  '(' + main_data[j].standing.visitorteam_position + ')', 'home_id': localTeamId, 'away_id': visitorTeamId, 'openDate':  main_data[j].time.starting_at.time, 'home':home, 'away': away, 'homeDateList': [], "awayDateList": []}
                                }
                            }
                        }
                        let country1 = ''
                        if(competitionArray[i]){
                            country1 = (competitionArray[i].split('(')[1]).split(')')[0]
                        }
                        if(events.length > 0){
                            this.mainList.push({'country': country1, 'league1': competitionArray[i].split('(')[0],'clubs': clubs, 'percentage': percentage, 'numbers': numbers,  'events': events})
                        }
                        let self = this
                        this.sortJSON(self.mainList,'country', '123');
                    }
                    console.log('this.mainList==>',this.mainList)
                    this.current_counter = 95
                    this.isload = true
                    clearInterval(this.clock)
                    clearInterval(this.clock1)
                    clearInterval(this.clock2)
                    clearInterval(this.clock3)
                    clearInterval(this.clock4)

                    var d = new Date();
                    var n = d.getDay();

                    let dayList = []
                    for(let i = 0 ; i < 7 ; i++){
                        let day = this.week_set.filter(function(item) {
                            return item.value === ((n + i) % 7);
                        });
                        dayList[i] = day[0].label
                    }
                    this.week_filter = []
                    for(let i = 0 ; i < date_list.length ; i++){
                        let date1 = new Date();
                        let date2 = date1.setDate(date1.getDate() + i);
                        date2 = new Date(date2).toISOString()
                        let date = date2.substring(0,10)
                        console.log('====>', i)
                        if(i === 0){
                            this.week_filter[i] = {'value': date, 'label': 'Search fixtures for today', 'pages': date_list[0].pages}
                        }
                        else if(i === 1){
                            this.week_filter[i] = {'value': date, 'label': 'Search fixtures for tomorrow', 'pages': date_list[1].pages}
                        }
                        else{
                            this.week_filter[i] = {'value': date, 'label': 'Search fixtures for ' + dayList[i - 1], 'pages': date_list[i].pages}
                        }
                    }
                    console.log('date list==>', this.week_filter)
                    this.current_counter = 100
                })
            },
            refresh_calculation(val, home_date, away_date, b_data){
                console.log('refresh final data check==!', val, ', ', home_date, ', ', away_date, ', ', b_data)
                let c_home_id = val.home_id
                let c_away_id = val.away_id
                let main_data = this.mainData
                for(let j = 0; j < main_data.length ; j++){
                    if(main_data[j].events.length < 100){
                        let home = {
                            p:0,
                            name:'',
                            rank: '',
                            z_z: 0,
                            over15: 0,
                            over25:0,
                            over35:0,
                            scored:0,
                            conc:0,
                            average1:0,
                            average2:0,
                            bts:0,
                            first1:0,
                            first2:0,
                            second1:0,
                            second2:0,
                            time15_S:0,
                            time30_S:0,
                            time45_S:0,
                            time60_S:0,
                            time75_S:0,
                            time90_S:0,
                            time15_C:0,
                            time30_C:0,
                            time45_C:0,
                            time60_C:0,
                            time75_C:0,
                            time90_C:0,
                            gs1:0,
                            gs2:0,
                            gc1:0,
                            gc2:0,
                            over40:0,
                            over85:0,
                            C_H:0,
                            C_D:0,
                            C_A:0,
                            first10:0,
                            first11:0,
                            first20:0,
                            second01:0,
                            second11:0,
                            second02:0,
                            firstGoal:0,
                            lastGoal:0,
                            secondplus:0,
                            secondminus:0,
                            homefirst:0,
                            drawfirst:0,
                            awayfirst:0,
                            homesecond:0,
                            drawsecond:0,
                            awaysecond:0,
                            eventdays:['All'],
                            pos:0,
                            h_a:0,
                            swing1:'',
                            FH:0,
                            swing2:'',
                            SH:0,
                            swing3:'',
                            attack:0,
                            defense:0,
                            form:0,
                            form_H_A:0

                        }
                        let away = {
                            p:0,
                            name:'',
                            rank:'' ,
                            z_z: 0,
                            over15: 0,
                            over25:0,
                            over35:0,
                            scored:0,
                            conc:0,
                            average1:0,
                            average2:0,
                            bts:0,
                            first1:0,
                            first2:0,
                            second1:0,
                            second2:0,
                            time15_S:0,
                            time30_S:0,
                            time45_S:0,
                            time60_S:0,
                            time75_S:0,
                            time90_S:0,
                            time15_C:0,
                            time30_C:0,
                            time45_C:0,
                            time60_C:0,
                            time75_C:0,
                            time90_C:0,
                            gs1:0,
                            gs2:0,
                            gc1:0,
                            gc2:0,
                            over40:0,
                            over85:0,
                            C_H:0,
                            C_D:0,
                            C_A:0,
                            first10:0,
                            first11:0,
                            first20:0,
                            second01:0,
                            second11:0,
                            second02:0,
                            firstGoal:0,
                            lastGoal:0,
                            secondPlus:0,
                            secondMinus:0,
                            homefirst:0,
                            drawfirst:0,
                            awayfirst:0,
                            homesecond:0,
                            drawsecond:0,
                            awaysecond:0,
                            eventdays:['All'],
                            pos:0,
                            h_a:0,
                            swing1: '',
                            FH:0,
                            swing2: '',
                            SH:0,
                            swing3: '',
                            attack:0,
                            defense:0,
                            form:0,
                            form_H_A:0
                        }
                        let homeTeamId = main_data[j].localTeamId
                        let awayTeamId = main_data[j].visitorTeamId
                        if(homeTeamId == c_home_id && awayTeamId == c_away_id){
                            let seasonId = main_data[j].season_id

                            home.p = this.p_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                            away.p = this.p_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')

                            home.fh_percentage = (this.fh_percentage_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '1', {})/(home.p)*100).toFixed(0)
                            away.fh_percentage = (this.fh_percentage_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '1', {})/(away.p)*100).toFixed(0)
                            home.sh_percentage = (this.sh_percentage_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '1', {})/(home.p)*100).toFixed(0)
                            away.sh_percentage = (this.sh_percentage_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '1', {})/(away.p)*100).toFixed(0)
                            home.fh_probability = ((this.fh_probability_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '1', {})/(home.p) + this.fh_probability_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '1', {})/(away.p))/2*100).toFixed(0)
                            home.sh_probability = ((this.sh_percentage_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '1', {})/(home.p) + this.sh_percentage_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '1', {})/(away.p))/2*100).toFixed(0)
                            home.pro = this.fh_probability_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '1', {})/(home.p)
                            away.pro = this.fh_probability_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '1', {})/(away.p)
                            if(home.p == 0){
                                home.fh_percentage = 0
                                home.sh_percentage = 0
                            }
                            if(away.p == 0){
                                away.fh_percentage = 0
                                away.sh_percentage = 0
                            }
                            if(home.p == 0 && away.p == 0){
                                home.fh_probability = 0
                                home.sh_probability = 0
                            }

                            home.z_z = (this.zeroTozero_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.001)*100).toFixed(0)
                            away.z_z = (this.zeroTozero_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.001)*100).toFixed(0)
                            home.over15 = (this.over15_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.001)*100).toFixed(0)
                            away.over15 = (this.over15_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.001)*100).toFixed(0)
                            home.over25 = (this.over25_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.001)*100).toFixed(0)
                            away.over25 = (this.over25_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.001)*100).toFixed(0)
                            home.over35 = (this.over35_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.001)*100).toFixed(0)
                            away.over35 = (this.over35_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.001)*100).toFixed(0)
                            home.scored = (this.scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.001)*100).toFixed(0)
                            away.scored = (this.scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.001)*100).toFixed(0)
                            home.conc = (this.concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.001)*100).toFixed(0)
                            away.conc = (this.concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.001)*100).toFixed(0)
                            home.average1 = (this.average_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)).toFixed(2)
                            away.average1 = (this.average_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)).toFixed(2)
                            home.average2 = (this.average_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)).toFixed(2)
                            away.average2 = (this.average_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)).toFixed(2)
                            if(this.average_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2') == 0){home.average1 = 0;}
                            if(this.average_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2') == 0){away.average1 = 0;}
                            if(this.average_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2') == 0){home.average2 = 0;}
                            if(this.average_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2') == 0){away.average2 = 0;}
                            home.bts = (this.average_bts_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.bts = (this.average_bts_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.first1 = (this.FH_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.first1 = (this.FH_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.first2 = (this.FH_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.first2 = (this.FH_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.second1 = (this.SH_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.second1 = (this.SH_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.second2 = (this.SH_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.second2 = (this.SH_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.time15_S = (this.time_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 15, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.time15_S = (this.time_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 15, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.time15_C = (this.time_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 15, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.time15_C = (this.time_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 15, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.time30_S = (this.time_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 30, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.time30_S = (this.time_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 30, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.time30_C = (this.time_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 30, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.time30_C = (this.time_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 30, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.time45_S = (this.time_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 45, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.time45_S = (this.time_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 45, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.time45_C = (this.time_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 45, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.time45_C = (this.time_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 45, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.time60_S = (this.time_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 60, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.time60_S = (this.time_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 60, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.time60_C = (this.time_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 60, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.time60_C = (this.time_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 60, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.time75_S = (this.time_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 75, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.time75_S = (this.time_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 75, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.time75_C = (this.time_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 75, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.time75_C = (this.time_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 75, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.time90_S = (this.time_scored_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 90, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.time90_S = (this.time_scored_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 90, '2')/(away.p + 0.0001)*100).toFixed(0)
                            home.time90_C = (this.time_concd_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 90, '2')/(home.p + 0.0001)*100).toFixed(0)
                            away.time90_C = (this.time_concd_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 90, '2')/(away.p + 0.0001)*100).toFixed(0)
                            let hgs1 = this.scored_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                            let ags1 = this.scored_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')
                            let hgs2 = this.scored_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                            let ags2 = this.scored_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')
                            home.gs1 = (hgs1/(hgs1 + hgs2)*100).toFixed(0)
                            home.gs2 = (hgs2/(hgs1 + hgs2)*100).toFixed(0)
                            if((hgs1 + hgs2) == 0){home.gs1 = 0; home.gs2 = 0}
                            away.gs1 = (ags1/(ags1 + ags2)*100).toFixed(0)
                            away.gs2 = (ags2/(ags1 + ags2)*100).toFixed(0)
                            if((ags1 + ags2) == 0){away.gs1 = 0 ; away.gs2 = 0}
                            let hgc1 = this.concd_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                            let agc1 = this.concd_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')
                            let hgc2 = this.concd_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                            let agc2 = this.concd_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')
                            home.gc1 = (hgc1/(hgc1 + hgc2)*100).toFixed(0)
                            home.gc2 = (hgc2/(hgc1 + hgc2)*100).toFixed(0)
                            if((hgc1 + hgc2) == 0){home.gc1 = 0; home.gc2 = 0}
                            away.gc1 = (agc1/(agc1 + agc2)*100).toFixed(0)
                            away.gc2 = (agc2/(agc1 + agc2)*100).toFixed(0)
                            if((agc1 + agc2) == 0){away.gc1 = 0 ; away.gc2 = 0}
                            home.over40 = (this.scored_plus_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 45, '2')/(home.p)*100).toFixed(0)
                            away.over40 = (this.scored_plus_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 45, '2')/(away.p)*100).toFixed(0)
                            home.over85 = (this.scored_plus_calculation(b_data, main_data[j].localTeamId, 'home', home_date, 90, '2')/(home.p)*100).toFixed(0)
                            away.over85 = (this.scored_plus_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, 90, '2')/(away.p)*100).toFixed(0)

                            home.C_H = (this.win_percentage_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                            away.C_H = (this.win_percentage_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                            home.C_D = (this.draw_percentage_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                            away.C_D = (this.draw_percentage_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                            home.C_A = (this.loss_percentage_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                            away.C_A = (this.loss_percentage_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)

                            home.lastGoal = (this.Last_goal_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                            away.lastGoal = (this.Last_goal_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                            if(home.p == 0){home.over40 = 0; home.over85 = 0; home.C_H = 0; home.C_D = 0; home.C_A = 0; home.lastGoal = 0}
                            if(away.p == 0){away.over40 = 0; away.over85 = 0; away.C_H = 0; away.C_D = 0; away.C_A = 0; away.lastGoal = 0}
                            home.first10 = this.one_to_zero_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                            away.first10 = this.one_to_zero_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')

                            home.first11 = (this.one_to_one_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.first10)*100).toFixed(0)
                            away.first11 = (this.one_to_one_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.first10)*100).toFixed(0)
                            home.first20 = (this.two_to_one_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.first10)*100).toFixed(0)
                            away.first20 = (this.two_to_one_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.first10)*100).toFixed(0)

                            if(home.first10 == 0){home.first11 = 0; home.first20 = 0}
                            if(away.first10 == 0){away.first11 = 0; away.first20 = 0}
                            home.second01 = this.zero_to_one_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')
                            away.second01 = this.zero_to_one_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')

                            home.second11 = (this.one_to_one2_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.second01)*100).toFixed(0)
                            away.second11 = (this.one_to_one2_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.second01)*100).toFixed(0)
                            home.second02 = (this.zero_to_two_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.second01)*100).toFixed(0)
                            away.second02 = (this.zero_to_two_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.second01)*100).toFixed(0)

                            if(home.second01 == 0){home.second11 = 0; home.second02 = 0}
                            if(away.second01 == 0){away.second11 = 0; away.second02 = 0}
                            home.secondplus = (this.two_score_ahead_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                            away.secondplus = (this.two_score_ahead_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                            home.secondminus = (this.two_score_behind_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                            away.secondminus = (this.two_score_behind_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                            home.homefirst = (this.H_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                            away.homefirst = (this.H_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                            home.drawfirst = (this.D_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                            away.drawfirst = (this.D_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                            home.awayfirst = (this.A_1st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                            away.awayfirst = (this.A_1st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)

                            home.homesecond = (this.H_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                            away.homesecond = (this.H_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                            home.drawsecond = (this.D_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                            away.drawsecond = (this.D_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                            home.awaysecond = (this.A_2st_calculation(b_data, main_data[j].localTeamId, 'home', home_date, '2')/(home.p)*100).toFixed(0)
                            away.awaysecond = (this.A_2st_calculation(b_data, main_data[j].visitorTeamId, 'away', away_date, '2')/(away.p)*100).toFixed(0)
                            if(home.p == 0){home.secondplus = 0; home.secondminus = 0; home.homefirst = 0; home.drawfirst = 0; home.awayfirst = 0; home.homesecond = 0; home.drawsecond = 0; home.awaysecond = 0}
                            if(away.p == 0){away.secondplus = 0; away.secondminus = 0; away.homefirst = 0; away.drawfirst = 0; away.awayfirst = 0; away.homesecond = 0; away.drawsecond = 0; away.awaysecond = 0}

                            for(let c = 0 ; c < this.mainList.length ; c++){
                                for(let cc = 0 ; cc < this.mainList[c].events.length ; cc++){
                                    if(this.mainList[c].events[cc].home_id == homeTeamId && this.mainList[c].events[cc].away_id == awayTeamId){
                                        let home_name = this.mainList[c].events[cc].home.name
                                        let home_rank = this.mainList[c].events[cc].home.rank
                                        let away_name = this.mainList[c].events[cc].away.name
                                        let away_rank = this.mainList[c].events[cc].away.rank
                                        let home_pos = this.mainList[c].events[cc].home.pos
                                        let away_pos = this.mainList[c].events[cc].away.pos
                                        let home_h_a = this.mainList[c].events[cc].home.h_a
                                        let away_h_a = this.mainList[c].events[cc].away.h_a
                                        let home_swing1 = this.mainList[c].events[cc].home.swing1
                                        let away_swing1 = this.mainList[c].events[cc].away.swing1
                                        let home_FH = this.mainList[c].events[cc].home.FH
                                        let away_FH = this.mainList[c].events[cc].away.FH
                                        let home_swing2 = this.mainList[c].events[cc].home.swing2
                                        let away_swing2 = this.mainList[c].events[cc].away.swing2
                                        let home_SH = this.mainList[c].events[cc].home.SH
                                        let away_SH = this.mainList[c].events[cc].away.SH
                                        let home_swing3 = this.mainList[c].events[cc].home.swing3
                                        let away_swing3 = this.mainList[c].events[cc].away.swing3
                                        let home_attack = this.mainList[c].events[cc].home.attack
                                        let away_attack = this.mainList[c].events[cc].away.attack
                                        let home_defense = this.mainList[c].events[cc].home.defense
                                        let away_defense = this.mainList[c].events[cc].away.defense
                                        let home_form_H_A = this.mainList[c].events[cc].home.form_H_A
                                        let away_form_H_A = this.mainList[c].events[cc].away.form_H_A
                                        let home_form = this.mainList[c].events[cc].home.form
                                        let away_form = this.mainList[c].events[cc].away.form

                                        this.mainList[c].events[cc].home = home
                                        this.mainList[c].events[cc].away = away
                                        this.mainList[c].events[cc].home.name = home_name
                                        this.mainList[c].events[cc].home.rank = home_rank
                                        this.mainList[c].events[cc].away.name = away_name
                                        this.mainList[c].events[cc].away.rank = away_rank
                                        this.mainList[c].events[cc].home.pos = home_pos
                                        this.mainList[c].events[cc].away.pos = away_pos
                                        this.mainList[c].events[cc].home.h_a = home_h_a
                                        this.mainList[c].events[cc].away.h_a = away_h_a
                                        this.mainList[c].events[cc].home.swing1 = home_swing1
                                        this.mainList[c].events[cc].away.swing1 = away_swing1
                                        this.mainList[c].events[cc].home.FH = home_FH
                                        this.mainList[c].events[cc].away.FH = away_FH
                                        this.mainList[c].events[cc].home.swing2 = home_swing2
                                        this.mainList[c].events[cc].away.swing2 = away_swing2
                                        this.mainList[c].events[cc].home.SH = home_SH
                                        this.mainList[c].events[cc].away.SH = away_SH
                                        this.mainList[c].events[cc].home.swing3 = home_swing3
                                        this.mainList[c].events[cc].away.swing3 = away_swing3
                                        this.mainList[c].events[cc].home.attack = home_attack
                                        this.mainList[c].events[cc].away.attack = away_attack
                                        this.mainList[c].events[cc].home.defense = home_defense
                                        this.mainList[c].events[cc].away.defense = away_defense
                                        this.mainList[c].events[cc].home.form_H_A = home_form_H_A
                                        this.mainList[c].events[cc].away.form_H_A = away_form_H_A
                                        this.mainList[c].events[cc].home.form = home_form
                                        this.mainList[c].events[cc].away.form = away_form
                                    }
                                }
                            }
                        }
                    }
                }
            },
            home_rank_refresh(ranks, val){
                console.log('refresh final data check==!', val, ', ', ranks)
                let c_home_id = val.home_id
                let c_away_id = val.away_id
                let main_data = this.mainData

                let start_date4 = new Date();
                let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
                next_date4 = new Date(next_date4).toISOString()
                next_date4 = next_date4.substring(0,10)
                for(let j = 0; j < main_data.length ; j++){
                    if(main_data[j].events.length < 100){
                        let home = {
                            p:0,
                            name:'',
                            rank: '',
                            z_z: 0,
                            over15: 0,
                            over25:0,
                            over35:0,
                            scored:0,
                            conc:0,
                            average1:0,
                            average2:0,
                            bts:0,
                            first1:0,
                            first2:0,
                            second1:0,
                            second2:0,
                            time15_S:0,
                            time30_S:0,
                            time45_S:0,
                            time60_S:0,
                            time75_S:0,
                            time90_S:0,
                            time15_C:0,
                            time30_C:0,
                            time45_C:0,
                            time60_C:0,
                            time75_C:0,
                            time90_C:0,
                            gs1:0,
                            gs2:0,
                            gc1:0,
                            gc2:0,
                            over40:0,
                            over85:0,
                            C_H:0,
                            C_D:0,
                            C_A:0,
                            first10:0,
                            first11:0,
                            first20:0,
                            second01:0,
                            second11:0,
                            second02:0,
                            firstGoal:0,
                            lastGoal:0,
                            secondplus:0,
                            secondminus:0,
                            homefirst:0,
                            drawfirst:0,
                            awayfirst:0,
                            homesecond:0,
                            drawsecond:0,
                            awaysecond:0,
                            eventdays:['All'],
                            pos:0,
                            h_a:0,
                            swing1:'',
                            FH:0,
                            swing2:'',
                            SH:0,
                            swing3:'',
                            attack:0,
                            defense:0,
                            form:0,
                            form_H_A:0

                        }
                        let away = this.away_team
                        let homeTeamId = main_data[j].localTeamId
                        let awayTeamId = main_data[j].visitorTeamId
                        if(homeTeamId == c_home_id && awayTeamId == c_away_id){
                            let seasonId = main_data[j].season_id
                            home.p = this.p_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            home.fh_percentage = (this.fh_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '2', ranks)/(home.p)*100).toFixed(0)
                            home.sh_percentage = (this.sh_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '2', ranks)/(home.p)*100).toFixed(0)
                            home.fh_probability = ((this.fh_probability_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '2', ranks)/(home.p) + away.pro)/2*100).toFixed(0)
                            home.sh_probability = ((this.sh_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '2', ranks)/(home.p) + parseFloat(away.sh_percentage)/100)/2*100).toFixed(0)
                            home.pro = this.fh_probability_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '2', ranks)/(home.p)
                            // this.mainList[c].events[cc].home.name
                            if(home.p == 0){
                                home.fh_percentage = 0
                                home.sh_percentage = 0
                            }
                            if(away.p == 0){
                                away.fh_percentage = 0
                                away.sh_percentage = 0
                            }
                            if(home.p == 0 && away.p == 0){
                                home.fh_probability = 0
                                home.sh_probability = 0
                            }

                            home.z_z = (this.zeroTozero_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.001)*100).toFixed(0)
                            home.over15 = (this.over15_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.001)*100).toFixed(0)
                            home.over25 = (this.over25_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.001)*100).toFixed(0)
                            home.over35 = (this.over35_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.001)*100).toFixed(0)
                            home.scored = (this.scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.001)*100).toFixed(0)
                            home.conc = (this.concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.001)*100).toFixed(0)
                            home.average1 = (this.average_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)).toFixed(2)
                            home.average2 = (this.average_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)).toFixed(2)
                            if(this.average_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks) == 0){home.average1 = 0;}
                            if(this.average_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks) == 0){home.average2 = 0;}
                            home.bts = (this.average_bts_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.first1 = (this.FH_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.first2 = (this.FH_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.second1 = (this.SH_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.second2 = (this.SH_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time15_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 15, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time15_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 15, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time30_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 30, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time30_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 30, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time45_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time45_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time60_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 60, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time60_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 60, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time75_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 75, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time75_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 75, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time90_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            home.time90_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90, '3', ranks)/(home.p + 0.0001)*100).toFixed(0)
                            let hgs1 = this.scored_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            let hgs2 = this.scored_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            home.gs1 = (hgs1/(hgs1 + hgs2)*100).toFixed(0)
                            home.gs2 = (hgs2/(hgs1 + hgs2)*100).toFixed(0)
                            if((hgs1 + hgs2) == 0){home.gs1 = 0; home.gs2 = 0}
                            let hgc1 = this.concd_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            let hgc2 = this.concd_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            home.gc1 = (hgc1/(hgc1 + hgc2)*100).toFixed(0)
                            home.gc2 = (hgc2/(hgc1 + hgc2)*100).toFixed(0)
                            if((hgc1 + hgc2) == 0){home.gc1 = 0; home.gc2 = 0}
                            home.over40 = (this.scored_plus_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45, '3', ranks)/(home.p)*100).toFixed(0)
                            home.over85 = (this.scored_plus_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90, '3', ranks)/(home.p)*100).toFixed(0)
                            home.C_H = (this.win_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.C_D = (this.draw_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.C_A = (this.loss_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)

                            home.lastGoal = (this.Last_goal_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            if(home.p == 0){home.over40 = 0; home.over85 = 0; home.C_H = 0; home.C_D = 0; home.C_A = 0; home.lastGoal = 0}
                            home.first10 = this.one_to_zero_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            home.first11 = (this.one_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '2')/(home.first10)*100).toFixed(0)
                            home.first20 = (this.two_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.first10)*100).toFixed(0)
                            if(home.first10 == 0){home.first11 = 0; home.first20 = 0}
                            home.second01 = this.zero_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)
                            home.second11 = (this.one_to_one2_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.second01)*100).toFixed(0)
                            home.second02 = (this.zero_to_two_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.second01)*100).toFixed(0)
                            if(home.second01 == 0){home.second11 = 0; home.second02 = 0}
                            home.secondplus = (this.two_score_ahead_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.secondminus = (this.two_score_behind_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.homefirst = (this.H_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.drawfirst = (this.D_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.awayfirst = (this.A_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.homesecond = (this.H_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.drawsecond = (this.D_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            home.awaysecond = (this.A_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '3', ranks)/(home.p)*100).toFixed(0)
                            if(home.p == 0){home.secondplus = 0; home.secondminus = 0; home.homefirst = 0; home.drawfirst = 0; home.awayfirst = 0; home.homesecond = 0; home.drawsecond = 0; home.awaysecond = 0}

                            for(let c = 0 ; c < this.mainList.length ; c++){
                                for(let cc = 0 ; cc < this.mainList[c].events.length ; cc++){
                                    if(this.mainList[c].events[cc].home_id == homeTeamId && this.mainList[c].events[cc].away_id == awayTeamId){
                                        let home_name = this.mainList[c].events[cc].home.name
                                        let home_rank = this.mainList[c].events[cc].home.rank
                                        let away_name = this.mainList[c].events[cc].away.name
                                        let away_rank = this.mainList[c].events[cc].away.rank
                                        let home_pos = this.mainList[c].events[cc].home.pos
                                        let home_h_a = this.mainList[c].events[cc].home.h_a
                                        let home_swing1 = this.mainList[c].events[cc].home.swing1
                                        let home_FH = this.mainList[c].events[cc].home.FH
                                        let home_swing2 = this.mainList[c].events[cc].home.swing2
                                        let home_SH = this.mainList[c].events[cc].home.SH
                                        let home_swing3 = this.mainList[c].events[cc].home.swing3
                                        let home_attack = this.mainList[c].events[cc].home.attack
                                        let home_defense = this.mainList[c].events[cc].home.defense
                                        let home_form_H_A = this.mainList[c].events[cc].home.form_H_A
                                        let home_form = this.mainList[c].events[cc].home.form

                                        this.mainList[c].events[cc].home = home
                                        this.mainList[c].events[cc].away = away
                                        this.mainList[c].events[cc].home.name = home_name
                                        this.mainList[c].events[cc].home.rank = home_rank
                                        this.mainList[c].events[cc].away.name = away_name
                                        this.mainList[c].events[cc].away.rank = away_rank

                                        this.mainList[c].events[cc].home.pos = home_pos
                                        this.mainList[c].events[cc].home.h_a = home_h_a
                                        this.mainList[c].events[cc].home.swing1 = home_swing1
                                        this.mainList[c].events[cc].home.FH = home_FH
                                        this.mainList[c].events[cc].home.swing2 = home_swing2
                                        this.mainList[c].events[cc].home.SH = home_SH
                                        this.mainList[c].events[cc].home.swing3 = home_swing3
                                        this.mainList[c].events[cc].home.attack = home_attack
                                        this.mainList[c].events[cc].home.defense = home_defense
                                        this.mainList[c].events[cc].home.form_H_A = home_form_H_A
                                        this.mainList[c].events[cc].home.form = home_form
                                    }
                                }

                            }
                        }
                    }
                }
            },
            away_rank_refresh(ranks, val){
                console.log('refresh final data check==!', val, ', ', ranks)
                let c_home_id = val.home_id
                let c_away_id = val.away_id
                let main_data = this.mainData

                let start_date4 = new Date();
                let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
                next_date4 = new Date(next_date4).toISOString()
                next_date4 = next_date4.substring(0,10)

                for(let j = 0; j < main_data.length ; j++){
                    if(main_data[j].events.length < 100){

                        let away = {
                            p:0,
                            name:'',
                            rank: '',
                            z_z: 0,
                            over15: 0,
                            over25:0,
                            over35:0,
                            scored:0,
                            conc:0,
                            average1:0,
                            average2:0,
                            bts:0,
                            first1:0,
                            first2:0,
                            second1:0,
                            second2:0,
                            time15_S:0,
                            time30_S:0,
                            time45_S:0,
                            time60_S:0,
                            time75_S:0,
                            time90_S:0,
                            time15_C:0,
                            time30_C:0,
                            time45_C:0,
                            time60_C:0,
                            time75_C:0,
                            time90_C:0,
                            gs1:0,
                            gs2:0,
                            gc1:0,
                            gc2:0,
                            over40:0,
                            over85:0,
                            C_H:0,
                            C_D:0,
                            C_A:0,
                            first10:0,
                            first11:0,
                            first20:0,
                            second01:0,
                            second11:0,
                            second02:0,
                            firstGoal:0,
                            lastGoal:0,
                            secondplus:0,
                            secondminus:0,
                            homefirst:0,
                            drawfirst:0,
                            awayfirst:0,
                            homesecond:0,
                            drawsecond:0,
                            awaysecond:0,
                            eventdays:['All'],
                            pos:0,
                            h_a:0,
                            swing1:'',
                            FH:0,
                            swing2:'',
                            SH:0,
                            swing3:'',
                            attack:0,
                            defense:0,
                            form:0,
                            form_H_A:0

                        }
                        let home = this.home_team
                        let homeTeamId = main_data[j].localTeamId
                        let awayTeamId = main_data[j].visitorTeamId

                        if(homeTeamId == c_home_id && awayTeamId == c_away_id){
                            let seasonId = main_data[j].season_id

                            away.p = this.p_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            away.fh_percentage = (this.fh_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '2', ranks)/(away.p)*100).toFixed(0)
                            away.sh_percentage = (this.sh_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '2', ranks)/(away.p)*100).toFixed(0)
                            home.fh_probability = ((home.pro + this.fh_probability_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '2', ranks)/(away.p))/2*100).toFixed(0)
                            home.sh_probability = ((parseFloat(home.sh_percentage)/100 + this.sh_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '2', ranks)/(away.p))/2*100).toFixed(0)
                            away.pro = this.fh_probability_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '2', ranks)/(away.p)
                            if(home.p == 0){
                                home.fh_percentage = 0
                                home.sh_percentage = 0
                            }
                            if(away.p == 0){
                                away.fh_percentage = 0
                                away.sh_percentage = 0
                            }
                            if(home.p == 0 && away.p == 0){
                                home.fh_probability = 0
                                home.sh_probability = 0
                            }

                            away.z_z = (this.zeroTozero_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.001)*100).toFixed(0)
                            away.over15 = (this.over15_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.001)*100).toFixed(0)
                            away.over25 = (this.over25_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.001)*100).toFixed(0)
                            away.over35 = (this.over35_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.001)*100).toFixed(0)
                            away.scored = (this.scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.001)*100).toFixed(0)
                            away.conc = (this.concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.001)*100).toFixed(0)
                            away.average1 = (this.average_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)).toFixed(2)
                            away.average2 = (this.average_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)).toFixed(2)
                            if(this.average_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks) == 0){away.average1 = 0;}
                            if(this.average_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks) == 0){away.average2 = 0;}
                            away.bts = (this.average_bts_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.first1 = (this.FH_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.first2 = (this.FH_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.second1 = (this.SH_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.second2 = (this.SH_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time15_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 15, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time15_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 15, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time30_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 30, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time30_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 30, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time45_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time45_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time60_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 60, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time60_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 60, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time75_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 75, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time75_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 75, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time90_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            away.time90_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90, '3', ranks)/(away.p + 0.0001)*100).toFixed(0)
                            let ags1 = this.scored_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            let ags2 = this.scored_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            away.gs1 = (ags1/(ags1 + ags2)*100).toFixed(0)
                            away.gs2 = (ags2/(ags1 + ags2)*100).toFixed(0)
                            if((ags1 + ags2) == 0){away.gs1 = 0 ; away.gs2 = 0}
                            let agc1 = this.concd_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            let agc2 = this.concd_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            away.gc1 = (agc1/(agc1 + agc2)*100).toFixed(0)
                            away.gc2 = (agc2/(agc1 + agc2)*100).toFixed(0)
                            if((agc1 + agc2) == 0){away.gc1 = 0 ; away.gc2 = 0}
                            away.over40 = (this.scored_plus_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45, '3', ranks)/(away.p)*100).toFixed(0)
                            away.over85 = (this.scored_plus_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90, '3', ranks)/(away.p)*100).toFixed(0)
                            away.C_H = (this.win_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.C_D = (this.draw_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.C_A = (this.loss_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.lastGoal = (this.Last_goal_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            if(away.p == 0){away.over40 = 0; away.over85 = 0; away.C_H = 0; away.C_D = 0; away.C_A = 0; away.lastGoal = 0}
                            away.first10 = this.one_to_zero_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            away.first11 = (this.one_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.first10)*100).toFixed(0)
                            away.first20 = (this.two_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.first10)*100).toFixed(0)
                            if(away.first10 == 0){away.first11 = 0; away.first20 = 0}
                            away.second01 = this.zero_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)
                            away.second11 = (this.one_to_one2_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.second01)*100).toFixed(0)
                            away.second02 = (this.zero_to_two_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.second01)*100).toFixed(0)
                            if(away.second01 == 0){away.second11 = 0; away.second02 = 0}
                            away.secondplus = (this.two_score_ahead_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.secondminus = (this.two_score_behind_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.homefirst = (this.H_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.drawfirst = (this.D_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.awayfirst = (this.A_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.homesecond = (this.H_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.drawsecond = (this.D_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            away.awaysecond = (this.A_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '3', ranks)/(away.p)*100).toFixed(0)
                            if(away.p == 0){away.secondplus = 0; away.secondminus = 0; away.homefirst = 0; away.drawfirst = 0; away.awayfirst = 0; away.homesecond = 0; away.drawsecond = 0; away.awaysecond = 0}

                            for(let c = 0 ; c < this.mainList.length ; c++){
                                for(let cc = 0 ; cc < this.mainList[c].events.length ; cc++){
                                    if(this.mainList[c].events[cc].home_id == homeTeamId && this.mainList[c].events[cc].away_id == awayTeamId){
                                        let home_name = this.mainList[c].events[cc].home.name
                                        let home_rank = this.mainList[c].events[cc].home.rank
                                        let away_name = this.mainList[c].events[cc].away.name
                                        let away_rank = this.mainList[c].events[cc].away.rank
                                        let home_pos = this.mainList[c].events[cc].away.pos
                                        let home_h_a = this.mainList[c].events[cc].away.h_a
                                        let home_swing1 = this.mainList[c].events[cc].away.swing1
                                        let home_FH = this.mainList[c].events[cc].away.FH
                                        let home_swing2 = this.mainList[c].events[cc].away.swing2
                                        let home_SH = this.mainList[c].events[cc].away.SH
                                        let home_swing3 = this.mainList[c].events[cc].away.swing3
                                        let home_attack = this.mainList[c].events[cc].away.attack
                                        let home_defense = this.mainList[c].events[cc].away.defense
                                        let home_form_H_A = this.mainList[c].events[cc].away.form_H_A
                                        let home_form = this.mainList[c].events[cc].away.form

                                        this.mainList[c].events[cc].home = home
                                        this.mainList[c].events[cc].away = away
                                        this.mainList[c].events[cc].home.name = home_name
                                        this.mainList[c].events[cc].home.rank = home_rank
                                        this.mainList[c].events[cc].away.name = away_name
                                        this.mainList[c].events[cc].away.rank = away_rank

                                        this.mainList[c].events[cc].away.pos = home_pos
                                        this.mainList[c].events[cc].away.h_a = home_h_a
                                        this.mainList[c].events[cc].away.swing1 = home_swing1
                                        this.mainList[c].events[cc].away.FH = home_FH
                                        this.mainList[c].events[cc].away.swing2 = home_swing2
                                        this.mainList[c].events[cc].away.SH = home_SH
                                        this.mainList[c].events[cc].away.swing3 = home_swing3
                                        this.mainList[c].events[cc].away.attack = home_attack
                                        this.mainList[c].events[cc].away.defense = home_defense
                                        this.mainList[c].events[cc].away.form_H_A = home_form_H_A
                                        this.mainList[c].events[cc].away.form = home_form
                                    }
                                }

                            }
                        }
                    }
                }
            },
            home_lineup_refresh(val){
                this.filter_key1 = this.create_UUID()
                this.filter_key2 = this.create_UUID() + '00'
                this.filter_key3 = 0
                this.filter_key4 = 0
                this.filter_key7 = 0
                this.filter_key8 = 0
                console.log('refresh final data check==!', val, this.lineup_home_id, this.lineup_away_id)
                if(val != '0'){
                    let c_home_id = this.lineup_home_id
                    let c_away_id = this.lineup_away_id
                    let main_data = this.mainData

                    let start_date4 = new Date();
                    let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
                    next_date4 = new Date(next_date4).toISOString()
                    next_date4 = next_date4.substring(0,10)

                    for(let j = 0; j < main_data.length ; j++){
                        if(main_data[j].events.length > 0){
                            let home = {
                                p:0,
                                name:'',
                                rank: '',
                                z_z: 0,
                                over15: 0,
                                over25:0,
                                over35:0,
                                scored:0,
                                conc:0,
                                average1:0,
                                average2:0,
                                bts:0,
                                first1:0,
                                first2:0,
                                second1:0,
                                second2:0,
                                time15_S:0,
                                time30_S:0,
                                time45_S:0,
                                time60_S:0,
                                time75_S:0,
                                time90_S:0,
                                time15_C:0,
                                time30_C:0,
                                time45_C:0,
                                time60_C:0,
                                time75_C:0,
                                time90_C:0,
                                gs1:0,
                                gs2:0,
                                gc1:0,
                                gc2:0,
                                over40:0,
                                over85:0,
                                C_H:0,
                                C_D:0,
                                C_A:0,
                                first10:0,
                                first11:0,
                                first20:0,
                                second01:0,
                                second11:0,
                                second02:0,
                                firstGoal:0,
                                lastGoal:0,
                                secondplus:0,
                                secondminus:0,
                                homefirst:0,
                                drawfirst:0,
                                awayfirst:0,
                                homesecond:0,
                                drawsecond:0,
                                awaysecond:0,
                                eventdays:['All'],
                                pos:0,
                                h_a:0,
                                swing1:'',
                                FH:0,
                                swing2:'',
                                SH:0,
                                swing3:'',
                                attack:0,
                                defense:0,
                                form:0,
                                form_H_A:0

                            }
                            let away = this.away_team
                            let homeTeamId = main_data[j].localTeamId
                            let awayTeamId = main_data[j].visitorTeamId
                            if(homeTeamId == c_home_id && awayTeamId == c_away_id){
                                let seasonId = main_data[j].season_id
                                home.p = this.p_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)
                                home.fh_percentage = (this.fh_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '4', val)/(home.p)*100).toFixed(0)
                                home.sh_percentage = (this.sh_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '4', val)/(home.p)*100).toFixed(0)
                                home.fh_probability = ((this.fh_probability_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '4', val)/(home.p) + away.pro)/2*100).toFixed(0)
                                home.sh_probability = ((this.sh_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '4', val)/(home.p) + parseFloat(away.sh_percentage)/100)/2*100).toFixed(0)
                                home.pro = this.fh_probability_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '4', val)/(home.p)
                                if(home.p == 0){
                                    home.fh_percentage = 0
                                    home.sh_percentage = 0
                                }
                                if(away.p == 0){
                                    away.fh_percentage = 0
                                    away.sh_percentage = 0
                                }
                                if(home.p == 0 && away.p == 0){
                                    home.fh_probability = 0
                                    home.sh_probability = 0
                                }

                                home.z_z = (this.zeroTozero_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p + 0.001)*100).toFixed(0)
                                home.over15 = (this.over15_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p + 0.001)*100).toFixed(0)
                                home.over25 = (this.over25_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p + 0.001)*100).toFixed(0)
                                home.over35 = (this.over35_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p + 0.001)*100).toFixed(0)
                                home.scored = (this.scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p + 0.001)*100).toFixed(0)
                                home.conc = (this.concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p + 0.001)*100).toFixed(0)
                                home.average1 = (this.average_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)).toFixed(2)
                                home.average2 = (this.average_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)).toFixed(2)
                                if(this.average_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val) == 0){home.average1 = 0;}
                                if(this.average_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val) == 0){home.average2 = 0;}
                                home.bts = (this.average_bts_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.first1 = (this.FH_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.first2 = (this.FH_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.second1 = (this.SH_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.second2 = (this.SH_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.time15_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 15,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.time15_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 15,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.time30_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 30,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.time30_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 30,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.time45_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.time45_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.time60_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 60,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.time60_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 60,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.time75_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 75,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.time75_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 75,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.time90_S = (this.time_scored_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                home.time90_C = (this.time_concd_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90,  '4', val)/(home.p + 0.0001)*100).toFixed(0)
                                let hgs1 = this.scored_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)
                                let hgs2 = this.scored_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)
                                home.gs1 = (hgs1/(hgs1 + hgs2)*100).toFixed(0)
                                home.gs2 = (hgs2/(hgs1 + hgs2)*100).toFixed(0)
                                if((hgs1 + hgs2) == 0){home.gs1 = 0; home.gs2 = 0}
                                let hgc1 = this.concd_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)
                                let hgc2 = this.concd_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)
                                home.gc1 = (hgc1/(hgc1 + hgc2)*100).toFixed(0)
                                home.gc2 = (hgc2/(hgc1 + hgc2)*100).toFixed(0)
                                if((hgc1 + hgc2) == 0){home.gc1 = 0; home.gc2 = 0}
                                home.over40 = (this.scored_plus_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 45,  '4', val)/(home.p)*100).toFixed(0)
                                home.over85 = (this.scored_plus_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, 90,  '4', val)/(home.p)*100).toFixed(0)
                                home.C_H = (this.win_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)*100).toFixed(0)
                                home.C_D = (this.draw_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)*100).toFixed(0)
                                home.C_A = (this.loss_percentage_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)*100).toFixed(0)

                                home.lastGoal = (this.Last_goal_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)*100).toFixed(0)
                                if(home.p == 0){home.over40 = 0; home.over85 = 0; home.C_H = 0; home.C_D = 0; home.C_A = 0; home.lastGoal = 0}
                                home.first10 = this.one_to_zero_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)
                                home.first11 = (this.one_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4, '2')/(home.first10)*100).toFixed(0)
                                home.first20 = (this.two_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.first10)*100).toFixed(0)
                                if(home.first10 == 0){home.first11 = 0; home.first20 = 0}
                                home.second01 = this.zero_to_one_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)
                                home.second11 = (this.one_to_one2_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.second01)*100).toFixed(0)
                                home.second02 = (this.zero_to_two_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.second01)*100).toFixed(0)
                                if(home.second01 == 0){home.second11 = 0; home.second02 = 0}
                                home.secondplus = (this.two_score_ahead_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)*100).toFixed(0)
                                home.secondminus = (this.two_score_behind_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)*100).toFixed(0)
                                home.homefirst = (this.H_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)*100).toFixed(0)
                                home.drawfirst = (this.D_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)*100).toFixed(0)
                                home.awayfirst = (this.A_1st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)*100).toFixed(0)
                                home.homesecond = (this.H_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)*100).toFixed(0)
                                home.drawsecond = (this.D_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)*100).toFixed(0)
                                home.awaysecond = (this.A_2st_calculation(main_data[j].events, main_data[j].localTeamId, 'home', next_date4,  '4', val)/(home.p)*100).toFixed(0)
                                if(home.p == 0){home.secondplus = 0; home.secondminus = 0; home.homefirst = 0; home.drawfirst = 0; home.awayfirst = 0; home.homesecond = 0; home.drawsecond = 0; home.awaysecond = 0}

                                for(let c = 0 ; c < this.mainList.length ; c++){
                                    for(let cc = 0 ; cc < this.mainList[c].events.length ; cc++){
                                        if(this.mainList[c].events[cc].home_id == homeTeamId && this.mainList[c].events[cc].away_id == awayTeamId){
                                            let home_name = this.mainList[c].events[cc].home.name
                                            let home_rank = this.mainList[c].events[cc].home.rank
                                            let away_name = this.mainList[c].events[cc].away.name
                                            let away_rank = this.mainList[c].events[cc].away.rank
                                            let home_pos = this.mainList[c].events[cc].home.pos
                                            let home_h_a = this.mainList[c].events[cc].home.h_a
                                            let home_swing1 = this.mainList[c].events[cc].home.swing1
                                            let home_FH = this.mainList[c].events[cc].home.FH
                                            let home_swing2 = this.mainList[c].events[cc].home.swing2
                                            let home_SH = this.mainList[c].events[cc].home.SH
                                            let home_swing3 = this.mainList[c].events[cc].home.swing3
                                            let home_attack = this.mainList[c].events[cc].home.attack
                                            let home_defense = this.mainList[c].events[cc].home.defense
                                            let home_form_H_A = this.mainList[c].events[cc].home.form_H_A
                                            let home_form = this.mainList[c].events[cc].home.form

                                            this.mainList[c].events[cc].home = home
                                            this.mainList[c].events[cc].away = away
                                            this.mainList[c].events[cc].home.name = home_name
                                            this.mainList[c].events[cc].home.rank = home_rank
                                            this.mainList[c].events[cc].away.name = away_name
                                            this.mainList[c].events[cc].away.rank = away_rank

                                            this.mainList[c].events[cc].home.pos = home_pos
                                            this.mainList[c].events[cc].home.h_a = home_h_a
                                            this.mainList[c].events[cc].home.swing1 = home_swing1
                                            this.mainList[c].events[cc].home.FH = home_FH
                                            this.mainList[c].events[cc].home.swing2 = home_swing2
                                            this.mainList[c].events[cc].home.SH = home_SH
                                            this.mainList[c].events[cc].home.swing3 = home_swing3
                                            this.mainList[c].events[cc].home.attack = home_attack
                                            this.mainList[c].events[cc].home.defense = home_defense
                                            this.mainList[c].events[cc].home.form_H_A = home_form_H_A
                                            this.mainList[c].events[cc].home.form = home_form

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    let data = this.item_X
                    let ranks = {"from": 0, "to": 50}
                    this.home_rank_refresh(ranks, data)
                }
            },
            away_lineup_refresh(val){
                this.filter_key1 = this.create_UUID()
                this.filter_key2 = this.create_UUID() + '00'
                this.filter_key3 = 0
                this.filter_key4 = 0
                this.filter_key7 = 0
                this.filter_key8 = 0
                console.log('refresh final data check==!', val)
                if(val != '0'){
                    let c_home_id = this.lineup_home_id
                    let c_away_id = this.lineup_away_id
                    let main_data = this.mainData

                    let start_date4 = new Date();
                    let next_date4 = start_date4.setDate(start_date4.getDate() + 0);
                    next_date4 = new Date(next_date4).toISOString()
                    next_date4 = next_date4.substring(0,10)

                    for(let j = 0; j < main_data.length ; j++){
                        if(main_data[j].events.length > 0){
                            let away = {
                                p:0,
                                name:'',
                                rank: '',
                                z_z: 0,
                                over15: 0,
                                over25:0,
                                over35:0,
                                scored:0,
                                conc:0,
                                average1:0,
                                average2:0,
                                bts:0,
                                first1:0,
                                first2:0,
                                second1:0,
                                second2:0,
                                time15_S:0,
                                time30_S:0,
                                time45_S:0,
                                time60_S:0,
                                time75_S:0,
                                time90_S:0,
                                time15_C:0,
                                time30_C:0,
                                time45_C:0,
                                time60_C:0,
                                time75_C:0,
                                time90_C:0,
                                gs1:0,
                                gs2:0,
                                gc1:0,
                                gc2:0,
                                over40:0,
                                over85:0,
                                C_H:0,
                                C_D:0,
                                C_A:0,
                                first10:0,
                                first11:0,
                                first20:0,
                                second01:0,
                                second11:0,
                                second02:0,
                                firstGoal:0,
                                lastGoal:0,
                                secondplus:0,
                                secondminus:0,
                                homefirst:0,
                                drawfirst:0,
                                awayfirst:0,
                                homesecond:0,
                                drawsecond:0,
                                awaysecond:0,
                                eventdays:['All'],
                                pos:0,
                                h_a:0,
                                swing1:'',
                                FH:0,
                                swing2:'',
                                SH:0,
                                swing3:'',
                                attack:0,
                                defense:0,
                                form:0,
                                form_H_A:0

                            }
                            let home = this.home_team
                            let homeTeamId = main_data[j].localTeamId
                            let awayTeamId = main_data[j].visitorTeamId

                            if(homeTeamId == c_home_id && awayTeamId == c_away_id){
                                let seasonId = main_data[j].season_id

                                away.p = this.p_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)

                                away.fh_percentage = (this.fh_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '4', val)/(away.p)*100).toFixed(0)
                                away.sh_percentage = (this.sh_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '4', val)/(away.p)*100).toFixed(0)
                                home.fh_probability = ((home.pro + this.fh_probability_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '4', val)/(away.p))/2*100).toFixed(0)
                                home.sh_probability = ((parseFloat(home.sh_percentage)/100 + this.sh_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '4', val)/(away.p))/2*100).toFixed(0)
                                away.pro = this.fh_probability_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, '4', val)/(away.p)
                                if(home.p == 0){
                                    home.fh_percentage = 0
                                    home.sh_percentage = 0
                                }
                                if(away.p == 0){
                                    away.fh_percentage = 0
                                    away.sh_percentage = 0
                                }
                                if(home.p == 0 && away.p == 0){
                                    home.fh_probability = 0
                                    home.sh_probability = 0
                                }

                                away.z_z = (this.zeroTozero_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p + 0.001)*100).toFixed(0)
                                away.over15 = (this.over15_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p + 0.001)*100).toFixed(0)
                                away.over25 = (this.over25_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p + 0.001)*100).toFixed(0)
                                away.over35 = (this.over35_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p + 0.001)*100).toFixed(0)
                                away.scored = (this.scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p + 0.001)*100).toFixed(0)
                                away.conc = (this.concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p + 0.001)*100).toFixed(0)
                                away.average1 = (this.average_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)).toFixed(2)
                                away.average2 = (this.average_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)).toFixed(2)
                                if(this.average_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val) == 0){away.average1 = 0;}
                                if(this.average_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val) == 0){away.average2 = 0;}
                                away.bts = (this.average_bts_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.first1 = (this.FH_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.first2 = (this.FH_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.second1 = (this.SH_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.second2 = (this.SH_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.time15_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 15,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.time15_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 15,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.time30_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 30,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.time30_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 30,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.time45_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.time45_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.time60_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 60,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.time60_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 60,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.time75_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 75,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.time75_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 75,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.time90_S = (this.time_scored_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                away.time90_C = (this.time_concd_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90,  '4', val)/(away.p + 0.0001)*100).toFixed(0)
                                let ags1 = this.scored_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)
                                let ags2 = this.scored_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)
                                away.gs1 = (ags1/(ags1 + ags2)*100).toFixed(0)
                                away.gs2 = (ags2/(ags1 + ags2)*100).toFixed(0)
                                if((ags1 + ags2) == 0){away.gs1 = 0 ; away.gs2 = 0}
                                let agc1 = this.concd_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)
                                let agc2 = this.concd_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)
                                away.gc1 = (agc1/(agc1 + agc2)*100).toFixed(0)
                                away.gc2 = (agc2/(agc1 + agc2)*100).toFixed(0)
                                if((agc1 + agc2) == 0){away.gc1 = 0 ; away.gc2 = 0}
                                away.over40 = (this.scored_plus_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 45,  '4', val)/(away.p)*100).toFixed(0)
                                away.over85 = (this.scored_plus_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4, 90,  '4', val)/(away.p)*100).toFixed(0)
                                away.C_H = (this.win_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)*100).toFixed(0)
                                away.C_D = (this.draw_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)*100).toFixed(0)
                                away.C_A = (this.loss_percentage_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)*100).toFixed(0)
                                away.lastGoal = (this.Last_goal_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)*100).toFixed(0)
                                if(away.p == 0){away.over40 = 0; away.over85 = 0; away.C_H = 0; away.C_D = 0; away.C_A = 0; away.lastGoal = 0}
                                away.first10 = this.one_to_zero_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)
                                away.first11 = (this.one_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.first10)*100).toFixed(0)
                                away.first20 = (this.two_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.first10)*100).toFixed(0)
                                if(away.first10 == 0){away.first11 = 0; away.first20 = 0}
                                away.second01 = this.zero_to_one_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)
                                away.second11 = (this.one_to_one2_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.second01)*100).toFixed(0)
                                away.second02 = (this.zero_to_two_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.second01)*100).toFixed(0)
                                if(away.second01 == 0){away.second11 = 0; away.second02 = 0}
                                away.secondplus = (this.two_score_ahead_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)*100).toFixed(0)
                                away.secondminus = (this.two_score_behind_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)*100).toFixed(0)
                                away.homefirst = (this.H_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)*100).toFixed(0)
                                away.drawfirst = (this.D_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)*100).toFixed(0)
                                away.awayfirst = (this.A_1st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)*100).toFixed(0)
                                away.homesecond = (this.H_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)*100).toFixed(0)
                                away.drawsecond = (this.D_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)*100).toFixed(0)
                                away.awaysecond = (this.A_2st_calculation(main_data[j].events, main_data[j].visitorTeamId, 'away', next_date4,  '4', val)/(away.p)*100).toFixed(0)
                                if(away.p == 0){away.secondplus = 0; away.secondminus = 0; away.homefirst = 0; away.drawfirst = 0; away.awayfirst = 0; away.homesecond = 0; away.drawsecond = 0; away.awaysecond = 0}

                                for(let c = 0 ; c < this.mainList.length ; c++){
                                    for(let cc = 0 ; cc < this.mainList[c].events.length ; cc++){
                                        if(this.mainList[c].events[cc].home_id == homeTeamId && this.mainList[c].events[cc].away_id == awayTeamId){
                                            let home_name = this.mainList[c].events[cc].home.name
                                            let home_rank = this.mainList[c].events[cc].home.rank
                                            let away_name = this.mainList[c].events[cc].away.name
                                            let away_rank = this.mainList[c].events[cc].away.rank
                                            let home_pos = this.mainList[c].events[cc].away.pos
                                            let home_h_a = this.mainList[c].events[cc].away.h_a
                                            let home_swing1 = this.mainList[c].events[cc].away.swing1
                                            let home_FH = this.mainList[c].events[cc].away.FH
                                            let home_swing2 = this.mainList[c].events[cc].away.swing2
                                            let home_SH = this.mainList[c].events[cc].away.SH
                                            let home_swing3 = this.mainList[c].events[cc].away.swing3
                                            let home_attack = this.mainList[c].events[cc].away.attack
                                            let home_defense = this.mainList[c].events[cc].away.defense
                                            let home_form_H_A = this.mainList[c].events[cc].away.form_H_A
                                            let home_form = this.mainList[c].events[cc].away.form

                                            this.mainList[c].events[cc].home = home
                                            this.mainList[c].events[cc].away = away
                                            this.mainList[c].events[cc].home.name = home_name
                                            this.mainList[c].events[cc].home.rank = home_rank
                                            this.mainList[c].events[cc].away.name = away_name
                                            this.mainList[c].events[cc].away.rank = away_rank

                                            this.mainList[c].events[cc].away.pos = home_pos
                                            this.mainList[c].events[cc].away.h_a = home_h_a
                                            this.mainList[c].events[cc].away.swing1 = home_swing1
                                            this.mainList[c].events[cc].away.FH = home_FH
                                            this.mainList[c].events[cc].away.swing2 = home_swing2
                                            this.mainList[c].events[cc].away.SH = home_SH
                                            this.mainList[c].events[cc].away.swing3 = home_swing3
                                            this.mainList[c].events[cc].away.attack = home_attack
                                            this.mainList[c].events[cc].away.defense = home_defense
                                            this.mainList[c].events[cc].away.form_H_A = home_form_H_A
                                            this.mainList[c].events[cc].away.form = home_form
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
                else{
                    let data = this.item_X
                    let ranks = {"from": 0, "to": 50}
                    this.away_rank_refresh(ranks, data)
                }
            },
            home_rank_filter(val){
                this.filter_key1 = this.create_UUID()
                this.filter_key2 = this.create_UUID() + '00'
                this.filter_key3 = 0
                this.filter_key4 = 0
                this.filter_key5 = 0
                this.filter_key6 = 0
                if(val === 1){
                    console.log("ALL")
                    let data = this.item_X
                    let ranks = {"from": 0, "to": 50}
                    this.home_rank_refresh(ranks, data)
                }
                else if(val === 2){
                    console.log(this.rank_filter.v1)
                    let data = this.item_X
                    let ranks = this.rank_filter.v1
                    this.home_rank_refresh(ranks, data)
                }
                else if(val === 3){
                    console.log(this.rank_filter.v2)
                    let data = this.item_X
                    let ranks = this.rank_filter.v2
                    this.home_rank_refresh(ranks, data)
                }
                else if(val === 4){
                    console.log(this.rank_filter.v3)
                    let data = this.item_X
                    let ranks = this.rank_filter.v3
                    this.home_rank_refresh(ranks, data)
                }
                else if(val === 5){
                    console.log(this.rank_filter.v4)
                    let data = this.item_X
                    let ranks = this.rank_filter.v4
                    this.home_rank_refresh(ranks, data)
                }
            },
            away_rank_filter(val){
                this.filter_key1 = this.create_UUID()
                this.filter_key2 = this.create_UUID() + '00'
                this.filter_key3 = 0
                this.filter_key4 = 0
                this.filter_key5 = 0
                this.filter_key6 = 0
                if(val === 1){
                    console.log("ALL")
                    let data = this.item_X
                    let ranks = {"from": 0, "to": 50}
                    this.away_rank_refresh(ranks, data)
                }
                else if(val === 2){
                    console.log(this.rank_filter.v1)
                    let data = this.item_X
                    let ranks = this.rank_filter.v1
                    this.away_rank_refresh(ranks, data)
                }
                else if(val === 3){
                    console.log(this.rank_filter.v2)
                    let data = this.item_X
                    let ranks = this.rank_filter.v2
                    this.away_rank_refresh(ranks, data)
                }
                else if(val === 4){
                    console.log(this.rank_filter.v3)
                    let data = this.item_X
                    let ranks = this.rank_filter.v3
                    this.away_rank_refresh(ranks, data)
                }
                else if(val === 5){
                    console.log(this.rank_filter.v4)
                    let data = this.item_X
                    let ranks = this.rank_filter.v4
                    this.away_rank_refresh(ranks, data)
                }
            },
            sortJSON(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            },
            sortJSON1(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                });
            }
        },
        created() {
            let date1 = new Date();
            let date2 = date1.setDate(date1.getDate() + 0);
            date2 = new Date(date2).toISOString()
            let date = date2.substring(0,10)
            this.readData(date)
        }
    }
</script>
<style>
    #modal-1___BV_modal_outer_{

    }
    #modal-1 #modal-1___BV_modal_content_{
        width: 300px!important;
        height:19px!important;
        margin: auto!important;
    }
    #modal-1 #modal-1___BV_modal_content_ #modal-1___BV_modal_body_{
        padding: 1px!important;
    }
    #modal-1 #modal-1___BV_modal_content_ #modal-1___BV_modal_body_ .progress{
        height: 15px!important;
    }
    .prev_pagination_btn, .prev_pagination_btn1{
        width: 71px;
        float: left;
        margin-top: 3px;
    }
    .next_pagination_btn, .next_pagination_btn1{
        width: 55px;
        float: left;
        margin-top: 3px;
    }
    .prev_pagination_btn:hover, .next_pagination_btn:hover {
        color: blue;
        font-weight: bold;
        cursor: pointer;
    }
    .pagination{
        max-width: 300px;
        float: left;
        margin: 4px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .bottom-pagination{
        height: 50px;
        width: 100%;
    }
    .rank_filter{
        margin-bottom: 0px;
    }
    .rank_filter select{
        border-radius: 0px;
        height: 24px;
        padding: 0;
        padding-left: 5px;
        padding-right: 5px;
    }
    .eventdays select{
        padding-left: 5px;
    }
    .eventdays{
        width: 55px;
        float: left;
        margin-left: 10px;
        margin-right: 10px;
    }
    .eventdays select{
        height: 25px;
        border-radius: 0;
        padding: 0;
        padding-left: 5px;
    }
    .eventdays.date-range{
        margin-top: 0px;
        margin-bottom: 0px;
    }
    .eventdays.date-range.lineup{
        width: 80px;
    }
    .event-list{
        background: #dff0d8;
        padding: 7px 12px;
        font-weight: 600;
        cursor: pointer;
    }
    .event-content{
        clear: left;
        background: #effaeb;
        font-size: 13px;
        padding: 7px 12px;
        cursor: pointer;
    }
    .event-graph{
        height: 803px;
        background: #f9f9f9;
    }
    .event-graph-header{
        background: #b1a0c7;
        height: 40px;
        padding: 9px 0px;
        font-size: 13px;
        font-weight: 600;
    }
    .graph1{
        height: 92px;
        padding: 9px 0px;
        font-size: 13px;
        font-weight: 600;
    }
    .graph-detail{
        width: 40px;
        height: 50px;
        padding: 10px 5px;
        border: 1px solid #bebebe;
        position: relative;
        margin: auto;
    }
    .graph-detail1{
        width: 80px;
        height: 50px;
        padding: 10px 5px;
        /*border: 1px solid #bebebe;*/
        position: relative;
        margin: auto;
    }
    .graph-inner{
        height: 20px;
        background: #00cc00;
        position: absolute;
        width: 28px;
        bottom: 0px;
    }
    .graph-label{
        position: absolute;
        top: 48px;
        font-size: 12px;
        left: 7px;
        font-weight: normal;
    }
    .graph-label1{
        position: absolute;
        top: 48px;
        font-size: 12px;
        left: 45px;
        font-weight: normal;
    }
    .graph-detail00{
        margin: auto;
        text-align: center;
        min-width: 40px;
        float: left;
        width: 4%;
        position: relative;
        height: 40px; top: -9px;
        padding-top: 9px;
    }
    .graph-percent{
        height: 50px;
    }
    .graph-percent0{
        height: 70px;
    }
    .cold-stats-container .form-group {
        margin-bottom: 0!important;
    }
</style>
