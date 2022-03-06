<template>
    <div    style="min-width: 1250px">
        <CCard body-wrapper>
            <div
                    v-for="(item,index) in eventList"
                    :key="item.league"
            >
                <div
                        @click="SetCollapse(index)"
                        duration="500"
                        class="event-list"
                        v-if="item.events.length > 0"
                >
                    {{item.country}} - {{item.league}}  <span v-if="item.historicData.mdayNum != 0" style="font-weight: normal; margin-left: 10px;">{{(parseInt(item.currentMatchday)/item.historicData.mdayNum*100).toFixed(0)}}%</span>
                    <img v-if="parseInt(item.currentMatchday) >= 6 && item.historicData.mdayNum - parseInt(item.currentMatchday) >= 3" src="/img/icon-warning-orange.png" width="13px;" style="width: 18px; position:relative; top: -3px; margin-left: 5px; margin-right: 10px;"/>
                    <img v-if="parseInt(item.currentMatchday) < 6 && item.historicData.mdayNum - parseInt(item.currentMatchday) >= 3" src="/img/icon-warning-red.png" width="13px;" style="width: 18px; position:relative; top: -3px; margin-left: 5px; margin-right: 10px;"/>
                    <img v-if="item.historicData.mdayNum - parseInt(item.currentMatchday) < 3 && item.historicData.mdayNum != 0" src="/img/icon-tick.png" width="13px;" style="width: 18px; position:relative; top: -1px; margin-left: 5px; margin-right: 10px;"/>
                    {{item.events.length}} matches
                    <img v-if="isPlus(index)" src="/img/ico-plus.png" width="13px;" style="width: 16px; float: right;"/>
                    <img v-if="isMinus(index)" src="/img/ico-minus.png" width="13px;" style="width: 16px; float: right;"/>
                </div>
                <CCollapse
                        :show="isCollapsed(index)" class="mt-0"
                >
                    <div
                            v-for="item1 in item.events"
                            :key="item1.eventId"
                    >
                        <div
                                class="event-content"
                                @click="SetCollapse1(item1.eventName)"
                                duration="500"
                        >
                            {{item1.openDate.substring(11,16)}} {{item1.home.name}} {{item1.home.rank}} v {{item1.away.name}} {{item1.away.rank}}
                        </div>
                        <CCollapse
                                :show="isCollapsed1(item1.eventName)" class="mt-0"
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
                                </div>
                                <div class="graph1">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 50px; text-align: center; padding-top: 15px;">
                                        H
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 50px; padding-top: 15px;">
                                        {{item1.home.name}} {{item1.home.rank}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 50px; padding-top: 15px;">
                                        {{item1.home.p}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.home.z_z/item1.home.p * 100) <= 10" class="graph-inner" :style="{'background':'#00CC00','height': (item1.home.z_z/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.z_z/item1.home.p * 100) >= 20" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.home.z_z/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.z_z/item1.home.p * 100) > 10 && (item1.home.z_z/item1.home.p * 100) < 20" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.home.z_z/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.z_z/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.home.Over15/item1.home.p * 100) >= 80" class="graph-inner" :style="{'background':'#00CC00','height': (item1.home.Over15/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.Over15/item1.home.p * 100) < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.home.Over15/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.Over15/item1.home.p * 100) < 80 && (item1.home.Over15/item1.home.p * 100) >= 60" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.home.Over15/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.Over15/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.home.Over25/item1.home.p * 100) >= 65" class="graph-inner" :style="{'background':'#00CC00','height': (item1.home.Over25/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.Over25/item1.home.p * 100) < 50" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.home.Over25/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.Over25/item1.home.p * 100) >= 50 && (item1.home.Over25/item1.home.p * 100) < 65" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.home.Over25/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.Over25/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.home.Over35/item1.home.p * 100) >= 40" class="graph-inner" :style="{'background':'#00CC00','height': (item1.home.Over35/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.Over35/item1.home.p * 100) < 25" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.home.Over35/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.Over35/item1.home.p * 100) >= 25 && (item1.home.Over35/item1.home.p * 100) < 40" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.home.Over35/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.Over35/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.home.scored/item1.home.p * 100) >= 70" class="graph-inner" :style="{'background':'#00CC00','height': (item1.home.scored/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.scored/item1.home.p * 100) < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.home.scored/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.scored/item1.home.p * 100) >= 60 && (item1.home.scored/item1.home.p * 100) < 70" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.home.scored/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.scored/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.home.conc/item1.home.p * 100) >= 70" class="graph-inner" :style="{'background':'#00CC00','height': (item1.home.conc/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.conc/item1.home.p * 100) < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.home.conc/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.conc/item1.home.p * 100) >= 60 && (item1.home.conc/item1.home.p * 100) <70" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.home.conc/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.conc/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 80px; float: left; width: 8%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :style="{'position': 'absolute', 'left': '0','width': (item1.home.average1/(item1.home.average1 + item1.home.average2)*100).toFixed(2)+'%'}"></div>
                                            <div class="graph-inner" :style="{'position': 'absolute', 'right': '-1px','width': (item1.home.average2/(item1.home.average1 + item1.home.average2)*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{(item1.home.average1/item1.home.p).toFixed(2)}}</label>
                                            <label class="graph-label1">{{(item1.home.average2/item1.home.p).toFixed(2)}}</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.home.bts/item1.home.p * 100) >= 65" class="graph-inner" :style="{'background':'#00CC00','height': (item1.home.bts/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.bts/item1.home.p * 100) < 45" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.home.bts/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.bts/item1.home.p * 100) >= 45 && (item1.home.bts/item1.home.p * 100) < 65" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.home.bts/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.bts/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.home.first1/item1.home.p * 100) >= 80" class="graph-inner" :style="{'background':'#00CC00','height': (item1.home.first1/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.first1/item1.home.p * 100) < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.home.first1/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.first1/item1.home.p * 100) >= 60 && (item1.home.first1/item1.home.p * 100) < 80" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.home.first1/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.first1/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.home.first2/item1.home.p * 100) >= 50" class="graph-inner" :style="{'background':'#00CC00','height': (item1.home.first2/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.first2/item1.home.p * 100) < 40" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.home.first2/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.first2/item1.home.p * 100) >= 40 && (item1.home.first2/item1.home.p * 100) <50" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.home.first2/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.first2/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.home.second1/item1.home.p * 100) >= 80" class="graph-inner" :style="{'background':'#00CC00','height': (item1.home.second1/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.second1/item1.home.p * 100) < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.home.second1/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.second1/item1.home.p * 100) >= 60 && (item1.home.second1/item1.home.p * 100) < 80" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.home.second1/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.second1/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.home.second2/item1.home.p * 100) >= 50" class="graph-inner" :style="{'background':'#00CC00','height': (item1.home.second2/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.second2/item1.home.p * 100) < 40" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.home.second2/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.home.second2/item1.home.p * 100) >= 40 && (item1.home.second2/item1.home.p * 100) < 50" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.home.second2/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.second2/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 150px; float: left; width: 15%;">
                                        <label style="float: left; margin-top: 40px; margin-left: 10px; ">Show last</label>
                                        <CSelect
                                                v-if="item1.home.eventdays.length <= item1.away.eventdays.length"
                                                class="eventdays"
                                                :options="item1.home.eventdays"
                                                @click="item_X = item1"
                                                @update:value="refreshCalc"
                                        >
                                        </CSelect>

                                        <CSelect
                                                v-if="item1.home.eventdays.length > item1.away.eventdays.length"
                                                class="eventdays"
                                                @click="item_X = item1"
                                                :options="item1.away.eventdays"
                                                @update:value="refreshCalc"
                                        >
                                        </CSelect>
                                        <label style="margin-top: 40px;">days</label>
                                    </div>
                                </div>
                                <div class="graph1">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 50px; text-align: center; padding-top: 15px;">
                                        A
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 50px; padding-top: 15px;">
                                        {{item1.away.name}} {{item1.away.rank}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 50px; padding-top: 15px;">
                                        {{item1.away.p}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.away.z_z/item1.away.p * 100) <= 10" class="graph-inner" :style="{'background':'#00CC00','height': (item1.away.z_z/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.z_z/item1.away.p * 100) >= 20" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.away.z_z/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.z_z/item1.away.p * 100) < 20 && (item1.away.z_z/item1.away.p * 100) > 10" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.away.z_z/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.z_z/item1.away.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.away.Over15/item1.away.p * 100) >= 80" class="graph-inner" :style="{'background':'#00CC00','height': (item1.away.Over15/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.Over15/item1.away.p * 100) < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.away.Over15/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.Over15/item1.away.p * 100) < 80 && (item1.away.Over15/item1.away.p * 100) >= 60" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.away.Over15/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.Over15/item1.away.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.away.Over25/item1.away.p * 100) >= 65" class="graph-inner" :style="{'background':'#00CC00','height': (item1.away.Over25/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.Over25/item1.away.p * 100) < 50" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.away.Over25/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.Over25/item1.away.p * 100) >= 50 && (item1.away.Over25/item1.away.p * 100) < 65" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.away.Over25/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.Over25/item1.away.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.away.Over35/item1.away.p * 100) >= 40" class="graph-inner" :style="{'background':'#00CC00','height': (item1.away.Over35/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.Over35/item1.away.p * 100) < 25" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.away.Over35/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.Over35/item1.away.p * 100) >= 25 && (item1.away.Over35/item1.away.p * 100) < 40" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.away.Over35/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.Over35/item1.away.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.away.scored/item1.away.p * 100) >= 70" class="graph-inner" :style="{'background':'#00CC00','height': (item1.away.scored/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.scored/item1.away.p * 100) < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.away.scored/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.scored/item1.away.p * 100) >= 60 && (item1.away.scored/item1.away.p * 100) < 70" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.away.scored/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.scored/item1.away.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.away.conc/item1.away.p * 100) >= 70" class="graph-inner" :style="{'background':'#00CC00','height': (item1.away.conc/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.conc/item1.away.p * 100) < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.away.conc/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.conc/item1.away.p * 100) >= 60 && (item1.away.conc/item1.away.p * 100) < 70" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.away.conc/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.conc/item1.away.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 80px; float: left; width: 8%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :style="{'position': 'absolute', 'left': '0','width': (item1.away.average1/(item1.away.average1 + item1.away.average2)*100).toFixed(2)+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :style="{'position': 'absolute', 'right': '-1px','width': (item1.away.average2/(item1.away.average1 + item1.away.average2)*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{(item1.away.average1/item1.away.p).toFixed(2)}}</label>
                                            <label class="graph-label1">{{(item1.away.average2/item1.away.p).toFixed(2)}}</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.away.bts/item1.away.p * 100) >= 65" class="graph-inner" :style="{'background':'#00CC00','height': (item1.away.bts/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.bts/item1.away.p * 100) < 45" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.away.bts/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.bts/item1.away.p * 100) >= 45 && (item1.away.bts/item1.away.p * 100) < 65" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.away.bts/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.bts/item1.away.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.away.first1/item1.away.p * 100) >= 80" class="graph-inner" :style="{'background':'#00CC00','height': (item1.away.first1/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.first1/item1.away.p * 100) < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.away.first1/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.first1/item1.away.p * 100) >= 60 && (item1.away.first1/item1.away.p * 100) < 80" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.away.first1/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.first1/item1.away.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.away.first2/item1.away.p * 100) >= 50" class="graph-inner" :style="{'background':'#00CC00','height': (item1.away.first2/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.first2/item1.away.p * 100) < 40" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.away.first2/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.first2/item1.away.p * 100) >= 40 && (item1.away.first2/item1.away.p * 100) < 50" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.away.first2/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.first2/item1.away.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.away.second1/item1.away.p * 100) >= 80" class="graph-inner" :style="{'background':'#00CC00','height': (item1.away.second1/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.second1/item1.away.p * 100) < 60" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.away.second1/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.second1/item1.away.p * 100) >= 60 && (item1.away.second1/item1.away.p * 100) < 80" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.away.second1/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.second1/item1.away.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%;">
                                        <div class="graph-detail">
                                            <div v-if="(item1.away.second2/item1.away.p * 100) >= 50" class="graph-inner" :style="{'background':'#00CC00','height': (item1.away.second2/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.second2/item1.away.p * 100) < 40" class="graph-inner" :style="{'background':'#FE9F9F','height': (item1.away.second2/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <div v-if="(item1.away.second2/item1.away.p * 100) >= 40 && (item1.away.second2/item1.away.p * 100) < 50" class="graph-inner" :style="{'background':'#CDCF46','height': (item1.away.second2/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.second2/item1.away.p * 100).toFixed(0)}}%</label>
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
                                        {{item1.home.name}} {{item1.home.rank}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 50px; padding-top: 15px;">
                                        {{item1.home.p}}
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 7%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :style="{'position': 'absolute', 'left': '0','width': (item1.home.average1/(item1.home.average1 + item1.home.average2)*100).toFixed(2)+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :style="{'position': 'absolute', 'right': '-1px','width': (item1.home.average2/(item1.home.average1 + item1.home.average2)*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{(item1.home.average1)}}</label>
                                            <label class="graph-label1">{{(item1.home.average2)}}</label>
                                        </div>
                                    </div>
                                    <!--                                    <div style="min-width:450px ;width: 42%;">-->
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time15_S" :style="{'height': (item1.home.time15_S/item1.home.p*100).toFixed(2)+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time15_C" :style="{'position': 'absolute', 'right': '5px','height': (item1.home.time15_C/(item1.home.p)*100).toFixed(2)+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label" style="left: 0;">{{(item1.home.time15_S/item1.home.p*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.home.time15_C/item1.home.p*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time30_S" :style="{'height': (item1.home.time30_S/item1.home.p*100).toFixed(2)+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time30_C" :style="{'position': 'absolute', 'right': '5px','height': (item1.home.time30_C/item1.home.p*100).toFixed(2)+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{(item1.home.time30_S/item1.home.p*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.home.time30_C/item1.home.p*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time45_S" :style="{'height': (item1.home.time45_S/item1.home.p*100).toFixed(2)+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time45_C" :style="{'position': 'absolute', 'right': '5px','height': (item1.home.time45_C/item1.home.p*100).toFixed(2)+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{(item1.home.time45_S/item1.home.p*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.home.time45_C/item1.home.p*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time60_S" :style="{'height': (item1.home.time60_S/item1.home.p*100).toFixed(2)+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time60_C" :style="{'position': 'absolute', 'right': '5px','height': (item1.home.time60_C/item1.home.p*100).toFixed(2)+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{(item1.home.time60_S/item1.home.p*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.home.time60_C/item1.home.p*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time75_S" :style="{'height': (item1.home.time75_S/item1.home.p*100).toFixed(2)+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time75_C" :style="{'position': 'absolute', 'right': '5px','height': (item1.home.time75_C/item1.home.p*100).toFixed(2)+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{(item1.home.time75_S/item1.home.p*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.home.time75_C/item1.home.p*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.home.time90_S" :style="{'height': (item1.home.time90_S/item1.home.p*100).toFixed(2)+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.home.time90_C" :style="{'position': 'absolute', 'right': '5px','height': (item1.home.time90_C/item1.home.p*100).toFixed(2)+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{(item1.home.time90_S/item1.home.p*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.home.time90_C/item1.home.p*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <!--                                    </div>-->


                                    <div style="min-width: 90px; float: left; width: 9%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :title="item1.home.gs1" :style="{'position': 'absolute', 'left': '0','width': (item1.home.gs1/(item1.home.gs1 + item1.home.gs2)*100).toFixed(2)+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :title="item1.home.gs2" :style="{'position': 'absolute', 'right': '-1px','width': (item1.home.gs2/(item1.home.gs1 + item1.home.gs2)*100).toFixed(2)+'%', 'background': '#00c900'}"></div>
                                            <label class="graph-label">{{(item1.home.gs1/(item1.home.gs1 + item1.home.gs2)*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.home.gs2/(item1.home.gs1 + item1.home.gs2)*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :title="item1.home.gc1" :style="{'position': 'absolute', 'left': '0','width': (item1.home.gc1/(item1.home.gc1 + item1.home.gc2)*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <div class="graph-inner" :title="item1.home.gc2" :style="{'position': 'absolute', 'right': '-1px','width': (item1.home.gc2/(item1.home.gc1 + item1.home.gc2)*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{(item1.home.gc1/(item1.home.gc1 + item1.home.gc2)*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.home.gc2/(item1.home.gc1 + item1.home.gc2)*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%;">
                                        <div class="graph-detail">
                                            <div class="graph-inner" :title="item1.home.over40" :style="{'height': (item1.home.over40/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.over40/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%;">
                                        <div class="graph-detail">
                                            <div class="graph-inner" :title="item1.home.over85" :style="{'height': (item1.home.over85/item1.home.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.home.over85/item1.home.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="graph1">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 50px; text-align: center; padding-top: 15px;">
                                        A
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 50px; padding-top: 15px;">
                                        {{item1.away.name}} {{item1.away.rank}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 50px; padding-top: 15px;">
                                        {{item1.away.p}}
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 7%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :style="{'position': 'absolute', 'left': '0','width': (item1.away.average1/(item1.away.average1 + item1.away.average2)*100).toFixed(2)+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :style="{'position': 'absolute', 'right': '-1px','width': (item1.away.average2/(item1.away.average1 + item1.away.average2)*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{(item1.away.average1)}}</label>
                                            <label class="graph-label1">{{(item1.away.average2)}}</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time15_S" :style="{'height': (item1.away.time15_S/item1.away.p*100).toFixed(2)+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time15_C" :style="{'position': 'absolute', 'right': '5px','height': (item1.away.time15_C/item1.away.p*100).toFixed(2)+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label" style="left: 0;">{{(item1.away.time15_S/item1.away.p*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.away.time15_C/item1.away.p*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time30_S" :style="{'height': (item1.away.time30_S/item1.away.p*100).toFixed(2)+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time30_C" :style="{'position': 'absolute', 'right': '5px','height': (item1.away.time30_C/item1.away.p*100).toFixed(2)+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{(item1.away.time30_S/item1.away.p*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.away.time30_C/item1.away.p*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time45_S" :style="{'height': (item1.away.time45_S/item1.away.p*100).toFixed(2)+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time45_C" :style="{'position': 'absolute', 'right': '5px','height': (item1.away.time45_C/item1.away.p*100).toFixed(2)+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{(item1.away.time45_S/item1.away.p*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.away.time45_C/item1.away.p*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time60_S" :style="{'height': (item1.away.time60_S/item1.away.p*100).toFixed(2)+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time60_C" :style="{'position': 'absolute', 'right': '5px','height': (item1.away.time60_C/item1.away.p*100).toFixed(2)+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{(item1.away.time60_S/item1.away.p*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.away.time60_C/item1.away.p*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time75_S" :style="{'height': (item1.away.time75_S/item1.away.p*100).toFixed(2)+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time75_C" :style="{'position': 'absolute', 'right': '5px','height': (item1.away.time75_C/item1.away.p*100).toFixed(2)+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{(item1.away.time75_S/item1.away.p*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.away.time75_C/item1.away.p*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 75px; float: left; width: 7%;">
                                        <div class="graph-detail1" style="width: 75px; border: 1px solid lightgrey;">
                                            <div class="graph-inner" :title="item1.away.time90_S" :style="{'height': (item1.away.time90_S/item1.away.p*100).toFixed(2)+'%', 'background': '#00cc00','width': '25px'}"></div>
                                            <div class="graph-inner" :title="item1.away.time90_C" :style="{'position': 'absolute', 'right': '5px','height': (item1.away.time90_C/item1.away.p*100).toFixed(2)+'%', 'background': '#fe9f9f','width': '25px'}"></div>
                                            <label class="graph-label">{{(item1.away.time90_S/item1.away.p*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.away.time90_C/item1.away.p*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :title="item1.away.gs1" :style="{'position': 'absolute', 'left': '0','width': (item1.away.gs1/(item1.away.gs1 + item1.away.gs2)*100).toFixed(2)+'%', 'background': '#00cc00'}"></div>
                                            <div class="graph-inner" :title="item1.away.gs2" :style="{'position': 'absolute', 'right': '-1px','width': (item1.away.gs2/(item1.away.gs1 + item1.away.gs2)*100).toFixed(2)+'%', 'background': '#00cc00'}"></div>
                                            <label class="graph-label">{{(item1.away.gs1/(item1.away.gs1 + item1.away.gs2)*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.away.gs2/(item1.away.gs1 + item1.away.gs2)*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 90px; float: left; width: 9%;">
                                        <div class="graph-detail1">
                                            <div class="graph-inner" :title="item1.away.gc1" :style="{'position': 'absolute', 'left': '0','width': (item1.away.gc1/(item1.away.gc1 + item1.away.gc2)*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <div class="graph-inner" :title="item1.away.gc2" :style="{'position': 'absolute', 'right': '-1px','width': (item1.away.gc2/(item1.away.gc1 + item1.away.gc2)*100).toFixed(2)+'%', 'background': '#fe9f9f'}"></div>
                                            <label class="graph-label">{{(item1.away.gc1/(item1.away.gc1 + item1.away.gc2)*100).toFixed(0)}}%</label>
                                            <label class="graph-label1">{{(item1.away.gc2/(item1.away.gc1 + item1.away.gc2)*100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%;">
                                        <div class="graph-detail">
                                            <div class="graph-inner" :title="item1.away.over40" :style="{'height': (item1.away.over40/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.over40/item1.away.p * 100).toFixed(0)}}%</label>
                                        </div>
                                    </div>
                                    <div style="min-width: 60px; float: left; width: 6%;">
                                        <div class="graph-detail">
                                            <div class="graph-inner" :title="item1.away.over85" :style="{'height': (item1.away.over85/item1.away.p * 100).toFixed(2)+'%'}"></div>
                                            <label class="graph-label">{{(item1.away.over85/item1.away.p * 100).toFixed(0)}}%</label>
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
                                        {{item1.home.name}} {{item1.home.rank}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 31px;">
                                        {{item1.home.p}}
                                    </div>
                                    <div class="graph-detail00" style="border-left: 1px solid lightgray;">
                                        {{(item1.home.C_H/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.home.C_D/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{(item1.home.C_A/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.home.first10).toFixed(0)}}
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.home.first11/(item1.home.first10 + 0.0000001)*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{(item1.home.first20/(item1.home.first10 + 0.0000001)*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.home.second01).toFixed(0)}}
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.home.second11/(item1.home.second01 + 0.0000001)*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{(item1.home.second02/(item1.home.second01 + 0.0000001)*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.home.first10/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.home.lastGoal/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.home.secondplus/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{(item1.home.secondminus/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        {{(item1.home.homefirst/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{(item1.home.drawfirst/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        {{(item1.home.awayfirst/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 4.5%; text-align: center;">
                                        {{(item1.home.homesecond/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{(item1.home.drawsecond/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{(item1.home.awaysecond/item1.home.p*100).toFixed(0)}}%
                                    </div>
                                </div>
                                <div class="graph1 graph-percent" style="margin-top: -10px;">
                                    <div style="min-width: 40px; float: left; width: 5%; height: 31px; text-align: center;">
                                        A
                                    </div>
                                    <div style="min-width: 100px; float: left; width: 10%; height: 31px;">
                                        {{item1.away.name}} {{item1.away.rank}}
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; height: 31px;">
                                        {{item1.away.p}}
                                    </div>
                                    <div class="graph-detail00" style="border-left: 1px solid lightgray;">
                                        {{(item1.away.C_H/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.away.C_D/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{(item1.away.C_A/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.away.first10).toFixed(0)}}
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.away.first11/(item1.away.first10 + 0.000000001)*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{(item1.away.first20/(item1.away.first10 + 0.000000001)*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.away.second01).toFixed(0)}}
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.away.second11/(item1.away.second01 + 0.00001)*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{(item1.away.second02/(item1.away.second01 + 0.00001)*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.away.second01/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.away.lastGoal/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00">
                                        {{(item1.away.secondplus/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray;">
                                        {{(item1.away.secondminus/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center;">
                                        {{(item1.away.homefirst/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{(item1.away.drawfirst/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; height: 40px; top: -9px; padding-top: 9px;">
                                        {{(item1.away.awayfirst/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 4.5%; text-align: center;">
                                        {{(item1.away.homesecond/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{(item1.away.drawsecond/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center;">
                                        {{(item1.away.awaysecond/item1.away.p*100).toFixed(0)}}%
                                    </div>
                                </div>
                                <div class="graph1 graph-percent0" style="margin-top: -10px;">
                                    <div style="min-width: 190px; float: left; width: 20%; height: 70px; text-align: right; padding-right: 45px;">
                                        Total
                                    </div>
                                    <div class="graph-detail00" style="border-left: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.C_H*100 + item1.home.C_H*100)/(item1.away.p + item1.home.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.C_H*100 + item1.home.C_H*100)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>
                                    <div class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.C_D*100 + item1.home.C_D*100)/(item1.away.p + item1.home.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.C_D*100 + item1.home.C_D*100)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.C_A*100 + item1.home.C_A*100)/(item1.away.p + item1.home.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.C_A*100 + item1.home.C_A*100)/(item1.away.p + item1.home.p)).toFixed(0)}}%</label>
                                    </div>
                                    <div class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.first10/item1.away.p + item1.home.first10/item1.home.p)*50).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.first10/item1.away.p + item1.home.first10/item1.home.p)*50).toFixed(0)}}%</label>
                                    </div>
                                    <div class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.first11*100 + item1.home.first11*100)/(item1.home.first10 + item1.away.first10)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.first11*100 + item1.home.first11*100)/(item1.home.first10 + item1.away.first10)).toFixed(0)}}%</label>
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.first20*100 + item1.home.first20*100)/(item1.home.first10 + item1.away.first10)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.first20*100 + item1.home.first20*100)/(item1.home.first10 + item1.away.first10)).toFixed(0)}}%</label>
                                    </div>
                                    <div class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.second01/item1.away.p + item1.home.second01/item1.home.p)*50).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.second01/item1.away.p + item1.home.second01/item1.home.p)*50).toFixed(0)}}%</label>
                                    </div>
                                    <div class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.second11*100 + item1.home.second11*100)/(item1.home.second01 + item1.away.second01)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.second11*100 + item1.home.second11*100)/(item1.home.second01 + item1.away.second01)).toFixed(0)}}%</label>
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.second02*100 + item1.home.second02*100)/(item1.home.second01 + item1.away.second01)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.second02*100 + item1.home.second02*100)/(item1.home.second01 + item1.away.second01)).toFixed(0)}}%</label>
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
                                    <div class="graph-detail00" style="height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.secondplus*100 + item1.home.secondplus*100)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.secondplus*100 + item1.home.secondplus*100)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>
                                    <div class="graph-detail00" style="border-right: 1px solid lightgray; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.secondminus*100 + item1.home.secondminus*100)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 13px">{{((item1.away.secondminus*100 + item1.home.secondminus*100)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.homefirst*100 + item1.home.homefirst*100)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px; position: relative; top: -10px;">{{((item1.away.homefirst*100 + item1.home.homefirst*100)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.drawfirst*100 + item1.home.drawfirst*100)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.drawfirst*100 + item1.home.drawfirst*100)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>
                                    <div style="height: 70px; min-width: 50px; float: left; width: 5%; text-align: center; position: relative; border-right: 1px solid lightgray; top: -9px; padding-top: 9px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.awayfirst*100 + item1.home.awayfirst*100)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.awayfirst*100 + item1.home.awayfirst*100)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>
                                    <div style="min-width: 50px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.homesecond*100 + item1.home.homesecond*100)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.homesecond*100 + item1.home.homesecond*100)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.drawsecond*100 + item1.home.drawsecond*100)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.drawsecond*100 + item1.home.drawsecond*100)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>
                                    <div style="min-width: 45px; float: left; width: 4.5%; text-align: center; height: 70px;">
                                        <div class="graph-detail" style="top: -10px;">
                                            <div class="graph-inner" :style="{'background':'#01235b','height': ((item1.away.awaysecond*100 + item1.home.awaysecond*100)/(item1.home.p + item1.away.p)).toFixed(2)+'%'}"></div>
                                        </div>
                                        <label class="graph-label" style="left: 0px;  position: relative; top: -10px;">{{((item1.away.awaysecond*100 + item1.home.awaysecond*100)/(item1.home.p + item1.away.p)).toFixed(0)}}%</label>
                                    </div>
                                </div>
                            </div>
                        </CCollapse>
                    </div>

                </CCollapse>
            </div>

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
                eventIndex: 0
            }
        },
        methods: {
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
                console.log(this.collapsed1)
            },
            isPlus(id){
                return this.collapsed.indexOf(id)>-1?false:true;
            },
            isMinus(id){
                return this.collapsed.indexOf(id)>-1?true:false;
            },
            refreshCalc(val){
                let counts1 = val
                let counts2 = val
                let historyS = this.item_X
                let leagueId = 1
                let eventId = 1

                for(let i = 0 ; i < this.eventList.length; i++){
                    for(let j = 0 ; j < this.eventList[i].events.length; j++){
                        let eventName = this.eventList[i].events[j].eventName
                        if(eventName == historyS.eventName){
                            leagueId = i
                            eventId = j
                        }
                    }
                }
                if(val == 'All'){
                    counts1 = this.getMatchedNumbers(historyS.home.name, this.eventList[leagueId].currentMatchday, historyS.home.historicD, 'home', counts1)
                    counts2 = this.getMatchedNumbers(historyS.away.name, this.eventList[leagueId].currentMatchday, historyS.away.historicD, 'away', counts2)
                }
                this.eventList[leagueId].events[eventId].home.p = counts1
                this.eventList[leagueId].events[eventId].away.p = counts2

                let z_home = this.zeroScored1(historyS.home.name, this.eventList[leagueId].currentMatchday, historyS.home.historicD, 'home', counts1)
                let z_away = this.zeroScored1(historyS.away.name, this.eventList[leagueId].currentMatchday, historyS.away.historicD, 'away', counts2)
                this.eventList[leagueId].events[eventId].home.z_z = z_home
                this.eventList[leagueId].events[eventId].away.z_z = z_away
                console.log(historyS.home.name,z_home, z_away,historyS.away.name)
            },
            zeroScored1(name, matchday, histories, direction, counts){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = matchDay_detail.length - counts ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return item.score.trim() == "0:0" && item.homeTeam.trim() == name.trim();
                        });
                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                else{
                    for(let i = matchDay_detail.length - counts ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return item.score.trim() == "0:0" && item.awayTeam.trim() == name.trim();
                        });
                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                return p
            },
            getMatchedNumbers(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0

                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return item.homeTeam.trim() == name.trim() && item.score != '-:-'
                        });

                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return item.awayTeam.trim() == name.trim() && item.score != '-:-'
                        });

                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                return p
            },
            zeroScored(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0

                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return item.score.trim() == "0:0" && item.homeTeam.trim() == name.trim();
                        });
                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return item.score.trim() == "0:0" && item.awayTeam.trim() == name.trim();
                        });
                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                return p
            },
            Ov15Scored(name, matchday, histories, direction, size){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) + parseInt(item.score.split(':')[1]) >= size && item.homeTeam.trim() == name.trim());
                        });
                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) + parseInt(item.score.split(':')[1]) >= size && item.awayTeam.trim() == name.trim());
                        });
                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                return p
            },
            Scored(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return parseInt(item.score.split(':')[0]) >= 1 && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return parseInt(item.score.split(':')[1]) >= 1 && item.awayTeam.trim() == name.trim()

                        });
                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                return p
            },
            Conc(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return parseInt(item.score.split(':')[1]) >= 1 && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return parseInt(item.score.split(':')[0]) >= 1 && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                return p
            },
            averageScore(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return parseInt(item.score.split(':')[0]) >= 1 && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                p = p + parseInt(result_detail[j].score.split(':')[0])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return parseInt(item.score.split(':')[1]) >= 1 && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                p = p + parseInt(result_detail[j].score.split(':')[1])
                            }
                        }
                    }
                }
                return p
            },
            averageConc(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return parseInt(item.score.split(':')[1]) >= 1 && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                p = p + parseInt(result_detail[j].score.split(':')[1])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return parseInt(item.score.split(':')[0]) >= 1 && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                p = p + parseInt(result_detail[j].score.split(':')[0])
                            }
                        }
                    }
                }
                return p
            },
            bothTeamScore(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return parseInt(item.score.split(':')[0]) >= 1 && parseInt(item.score.split(':')[1]) >= 1 && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return parseInt(item.score.split(':')[0]) >= 1 && parseInt(item.score.split(':')[1]) >= 1 && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            p++
                        }
                    }
                }
                return p
            },
            firstOne(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) <= 45){
                                            check = 1
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) <= 45){
                                            check = 1
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) <= 45){
                                            check = 1
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) <= 45){
                                            check = 1
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }

                return p
            },
            firstTwo(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) <= 45){
                                            check ++
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) <= 45){
                                            check ++
                                        }
                                    }
                                }
                                if(check >= 2){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) <= 45){
                                            check ++

                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) <= 45){
                                            check ++

                                        }
                                    }
                                }
                                if(check >= 2){
                                    p++
                                }
                            }
                        }
                    }
                }

                return p
            },
            secondOne(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45 && parseInt(compareTime) <= 90){
                                            check = 1
                                        }
                                    }
                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) > 45 && parseInt(compareTime) <= 90){
                                            check = 1
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45 && parseInt(compareTime) <= 90){
                                            check = 1
                                        }
                                    }
                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) > 45 && parseInt(compareTime) <= 90){
                                            check = 1
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }

                return p
            },
            secondTwo(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45 && parseInt(compareTime) <= 90){
                                            check ++
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) > 45 && parseInt(compareTime) <= 90){
                                            check ++
                                        }
                                    }
                                }
                                if(check >= 2){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45 && parseInt(compareTime) <= 90){
                                            check ++
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) > 45 && parseInt(compareTime) <= 90){
                                            check ++
                                        }
                                    }
                                }
                                if(check >= 2){
                                    p++
                                }
                            }
                        }
                    }
                }

                return p
            },
            timeScored(name, matchday, histories, direction, time){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > time - 15 && parseInt(compareTime) <= time){
                                            check =  1
                                        }
                                    }
                                }
                                if(check >= 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > time - 15 && parseInt(compareTime) <= time){
                                            check = 1
                                        }
                                    }
                                }
                                if(check >= 1){
                                    p++
                                }
                            }
                        }
                    }
                }

                return p
            },
            timeConceded(name, matchday, histories, direction, time){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > time - 15 && parseInt(compareTime) <= time){
                                            check =  1
                                        }
                                    }
                                }
                                if(check >= 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > time - 15 && parseInt(compareTime) <= time){
                                            check = 1
                                        }
                                    }
                                }
                                if(check >= 1){
                                    p++
                                }
                            }
                        }
                    }
                }

                return p
            },
            GS(name, matchday, histories, direction, time){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > time - 45 && parseInt(compareTime) <= time){
                                            p++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return parseInt(item.score.split(':')[1]) >= 1 && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > time - 45 && parseInt(compareTime) <= time){
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
            GC(name, matchday, histories, direction, time){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > time - 45 && parseInt(compareTime) <= time){
                                            p ++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return parseInt(item.score.split(':')[0]) >= 1 && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > time - 45 && parseInt(compareTime) <= time){
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
            over4085(name, matchday, histories, direction, time1, time2){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) >= time1 && parseInt(compareTime) <= time2){
                                            check =  1
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) >= time1 && parseInt(compareTime) <= time2){
                                            check =  1
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[1]) >= 1 || parseInt(item.score.split(':')[0]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) >= time1 && parseInt(compareTime) <= time2){
                                            check = 1
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) >= time1 && parseInt(compareTime) <= time2){
                                            check = 1
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }

                return p
            },
            CH1(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) > parseInt(item.score.split(':')[1])) && item.homeTeam.trim() == name.trim()
                        });
                        p = p + result_detail.length
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) > parseInt(item.score.split(':')[1])) && item.awayTeam.trim() == name.trim()
                        });
                        p = p + result_detail.length
                    }
                }
                return p
            },
            CD1(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) == parseInt(item.score.split(':')[1])) && item.homeTeam.trim() == name.trim()
                        });
                        p = p + result_detail.length
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) == parseInt(item.score.split(':')[1])) && item.awayTeam.trim() == name.trim()
                        });
                        p = p + result_detail.length
                    }
                }

                return p
            },
            CA1(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) < parseInt(item.score.split(':')[1])) && item.homeTeam.trim() == name.trim()
                        });
                        p = p + result_detail.length
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) < parseInt(item.score.split(':')[1])) && item.awayTeam.trim() == name.trim()
                        });
                        p = p + result_detail.length
                    }
                }
                return p
            },
            first1_0(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length > 0){
                                    let scoredTime = result_detail[j].scoreRecord[0].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length > 0){
                                    let scoredTime = result_detail[j].scoreRecord[0].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            first1_1(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length >= 2){
                                    let scoredTime = result_detail[j].scoreRecord[0].split(' ')[0].trim()
                                    let scoredTime1 = result_detail[j].scoreRecord[1].split(' ')[1].trim()
                                    if(scoredTime.includes("'") == true && scoredTime1.includes("'") == true){
                                        p++
                                        console.log()
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length >= 2){
                                    let scoredTime = result_detail[j].scoreRecord[0].split(' ')[0].trim()
                                    let scoredTime1 = result_detail[j].scoreRecord[1].split(' ')[1].trim()
                                    if(scoredTime.includes("'") == true && scoredTime1.includes("'") == true){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            first2_0(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length >= 2){
                                    let scoredTime = result_detail[j].scoreRecord[0].split(' ')[0].trim()
                                    let scoredTime1 = result_detail[j].scoreRecord[1].split(' ')[0].trim()
                                    if(scoredTime.includes("'") == true && scoredTime1.includes("'") == true){
                                        p++
                                        console.log()
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length >= 2){
                                    let scoredTime = result_detail[j].scoreRecord[0].split(' ')[0].trim()
                                    let scoredTime1 = result_detail[j].scoreRecord[1].split(' ')[0].trim()
                                    if(scoredTime.includes("'") == true && scoredTime1.includes("'") == true){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            second1_0(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length > 0){
                                    let scoredTime = result_detail[j].scoreRecord[0].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length > 0){
                                    let scoredTime = result_detail[j].scoreRecord[0].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            second1_1(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length >= 2){
                                    let scoredTime = result_detail[j].scoreRecord[0].split(' ')[1].trim()
                                    let scoredTime1 = result_detail[j].scoreRecord[1].split(' ')[0].trim()
                                    if(scoredTime.includes("'") == true && scoredTime1.includes("'") == true){
                                        p++
                                        console.log()
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length >= 2){
                                    let scoredTime = result_detail[j].scoreRecord[0].split(' ')[1].trim()
                                    let scoredTime1 = result_detail[j].scoreRecord[1].split(' ')[0].trim()
                                    if(scoredTime.includes("'") == true && scoredTime1.includes("'") == true){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            second2_0(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length >= 2){
                                    let scoredTime = result_detail[j].scoreRecord[0].split(' ')[1].trim()
                                    let scoredTime1 = result_detail[j].scoreRecord[1].split(' ')[1].trim()
                                    if(scoredTime.includes("'") == true && scoredTime1.includes("'") == true){
                                        p++
                                        console.log()
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length >= 2){
                                    let scoredTime = result_detail[j].scoreRecord[0].split(' ')[1].trim()
                                    let scoredTime1 = result_detail[j].scoreRecord[1].split(' ')[1].trim()
                                    if(scoredTime.includes("'") == true && scoredTime1.includes("'") == true){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            lastGoal(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length > 0){
                                    let scoredTime = result_detail[j].scoreRecord[result_detail[j].scoreRecord.length - 1].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                if(result_detail[j].scoreRecord.length > 0){
                                    let scoredTime = result_detail[j].scoreRecord[result_detail[j].scoreRecord.length - 1].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                return p
            },
            secondPlus(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });
                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    let scoredString = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let str1 = parseInt(scoredString.split(":")[0].trim())
                                        let str2 = parseInt(scoredString.split(":")[1].trim())
                                        if(str1 - str2 >= 2){
                                            check = 1
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    let scoredString = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let str1 = parseInt(scoredString.split(":")[0].trim())
                                        let str2 = parseInt(scoredString.split(":")[1].trim())
                                        if(str2 - str1 >= 2){
                                            check = 1
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }

                return p
            },
            secondMinus(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });
                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    let scoredString = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let str1 = parseInt(scoredString.split(":")[0].trim())
                                        let str2 = parseInt(scoredString.split(":")[1].trim())
                                        if(str2 - str1 >= 2){
                                            check = 1
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    let scoredString1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime1.includes("'")){
                                        let str1 = parseInt(scoredString1.split(":")[0].trim())
                                        let str2 = parseInt(scoredString1.split(":")[1].trim())
                                        if(str2 - str1 >= 2){
                                            check = 1
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    let scoredString = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let str1 = parseInt(scoredString.split(":")[0].trim())
                                        let str2 = parseInt(scoredString.split(":")[1].trim())
                                        if(str1 - str2 >= 2){
                                            check = 1
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    let scoredString1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime1.includes("'")){
                                        let str1 = parseInt(scoredString1.split(":")[0].trim())
                                        let str2 = parseInt(scoredString1.split(":")[1].trim())
                                        if(str1 - str2 >= 2){
                                            check = 1
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }

                return p
            },
            homeFirst(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    let scoredString = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        let str1 =parseInt(scoredString.split(':')[0].trim())
                                        let str2 =parseInt(scoredString.split(':')[1].trim())
                                        if(parseInt(compareTime) <= 45 && str1 > str2){
                                            check = 1
                                        }
                                        else if(parseInt(compareTime) <= 45 && str1 <= str2){
                                            check = 0
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    let scoredString1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime.length - 1)
                                        let str1 =parseInt(scoredString1.split(':')[0].trim())
                                        let str2 =parseInt(scoredString1.split(':')[1].trim())
                                        if(parseInt(compareTime) <= 45 && str1 > str2){
                                            check = 1
                                        }
                                        else if(parseInt(compareTime) <= 45 && str1 <= str2){
                                            check = 0
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    let scoredString = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        let str1 =parseInt(scoredString.split(':')[0].trim())
                                        let str2 =parseInt(scoredString.split(':')[1].trim())
                                        if(parseInt(compareTime) <= 45 && str1 > str2){
                                            check = 1
                                        }
                                        else if(parseInt(compareTime) <= 45 && str1 <= str2){
                                            check = 0
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    let scoredString1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime.length - 1)
                                        let str1 =parseInt(scoredString1.split(':')[0].trim())
                                        let str2 =parseInt(scoredString1.split(':')[1].trim())
                                        if(parseInt(compareTime) <= 45 && str1 > str2){
                                            check = 1
                                        }
                                        else if(parseInt(compareTime) <= 45 && str1 <= str2){
                                            check = 0
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            drawFirst(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 0 || parseInt(item.score.split(':')[1]) >= 0) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                let check0 = 0
                                if(parseInt(result_detail[j].score.split(':')[0]) == 0 && parseInt(result_detail[j].score.split(':')[1]) == 0){
                                    check = 1
                                }
                                else{
                                    for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                        let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                        let scoredString = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                        if(scoredTime.includes("'")){
                                            let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                            let str1 =parseInt(scoredString.split(':')[0].trim())
                                            let str2 =parseInt(scoredString.split(':')[1].trim())
                                            if(parseInt(compareTime) <= 45 && str1 == str2){
                                                check = 1
                                                check0 = 1
                                            }
                                            else if(parseInt(compareTime) <= 45 && str1 != str2){
                                                check = 0
                                                check0 = 1
                                            }
                                        }

                                        let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                        let scoredString1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                        if(scoredTime1.includes("'")){
                                            let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                            let str1 =parseInt(scoredString1.split(':')[0].trim())
                                            let str2 =parseInt(scoredString1.split(':')[1].trim())
                                            if(parseInt(compareTime) <= 45 && str1 == str2){
                                                check = 1
                                                check0 = 1
                                            }
                                            else if(parseInt(compareTime) <= 45 && str1 != str2){
                                                check = 0
                                                check0 = 1
                                            }
                                        }
                                    }
                                }

                                if(check == 1 || (result_detail[j].scoreRecord.length > 0 && check0 == 0)){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 0 || parseInt(item.score.split(':')[1]) >= 0) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                let check0 = 0
                                if(parseInt(result_detail[j].score.split(':')[0]) == 0 && parseInt(result_detail[j].score.split(':')[1]) == 0){
                                    check = 1
                                }
                                else{
                                    for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                        let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                        let scoredString = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                        if(scoredTime.includes("'")){
                                            let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                            let str1 =parseInt(scoredString.split(':')[0].trim())
                                            let str2 =parseInt(scoredString.split(':')[1].trim())
                                            if(parseInt(compareTime) <= 45 && str1 == str2){
                                                check = 1
                                                check0 = 1
                                            }
                                            else if(parseInt(compareTime) <= 45 && str1 != str2){
                                                check = 0
                                                check0 = 1
                                            }
                                        }

                                        let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                        let scoredString1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                        if(scoredTime1.includes("'")){
                                            let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                            let str1 =parseInt(scoredString1.split(':')[0].trim())
                                            let str2 =parseInt(scoredString1.split(':')[1].trim())
                                            if(parseInt(compareTime) <= 45 && str1 == str2){
                                                check = 1
                                                check0 = 1
                                            }
                                            else if(parseInt(compareTime) <= 45 && str1 != str2){
                                                check = 0
                                                check0 = 1
                                            }
                                        }
                                    }
                                }
                                if(check == 1 || (result_detail[j].scoreRecord.length > 0 && check0 == 0)){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            awayFirst(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    let scoredString = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        let str1 =parseInt(scoredString.split(':')[0].trim())
                                        let str2 =parseInt(scoredString.split(':')[1].trim())
                                        if(parseInt(compareTime) <= 45 && str1 < str2){
                                            check = 1
                                        }
                                        else if(parseInt(compareTime) <= 45 && str1 >= str2){
                                            check = 0
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    let scoredString1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime.length - 1)
                                        let str1 =parseInt(scoredString1.split(':')[0].trim())
                                        let str2 =parseInt(scoredString1.split(':')[1].trim())
                                        if(parseInt(compareTime) <= 45 && str1 < str2){
                                            check = 1
                                        }
                                        else if(parseInt(compareTime) <= 45 && str1 >= str2){
                                            check = 0
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    let scoredString = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        let str1 =parseInt(scoredString.split(':')[0].trim())
                                        let str2 =parseInt(scoredString.split(':')[1].trim())
                                        if(parseInt(compareTime) <= 45 && str1 < str2){
                                            check = 1
                                        }
                                        else if(parseInt(compareTime) <= 45 && str1 >= str2){
                                            check = 0
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    let scoredString1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime.length - 1)
                                        let str1 =parseInt(scoredString1.split(':')[0].trim())
                                        let str2 =parseInt(scoredString1.split(':')[1].trim())
                                        if(parseInt(compareTime) <= 45 && str1 < str2){
                                            check = 1
                                        }
                                        else if(parseInt(compareTime) <= 45 && str1 >= str2){
                                            check = 0
                                        }
                                    }
                                }
                                if(check == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            homeSecond(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check1 = 0
                                let check2 = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45){
                                            check1++
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45){
                                            check2++
                                        }
                                    }
                                }
                                if(check1 > check2){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 1 || parseInt(item.score.split(':')[1]) >= 1) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check1 = 0
                                let check2 = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45){
                                            check1++
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) > 45){
                                            check2++
                                        }
                                    }
                                }
                                if(check1 > check2){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            drawSecond(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 0 || parseInt(item.score.split(':')[1]) >= 0) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check1 = 0
                                let check2 = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45){
                                            check1++
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45){
                                            check2++
                                        }
                                    }
                                }
                                if(check1 == check2){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 0 || parseInt(item.score.split(':')[1]) >= 0) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check1 = 0
                                let check2 = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45){
                                            check1++
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) > 45){
                                            check2++
                                        }
                                    }
                                }
                                if(check1 == check2){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            awaySecond(name, matchday, histories, direction){
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) <= matchday;
                });

                let p = 0
                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 0 || parseInt(item.score.split(':')[1]) >= 0) && item.homeTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check1 = 0
                                let check2 = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45){
                                            check1++
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45){
                                            check2++
                                        }
                                    }
                                }
                                if(check1 < check2){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return (parseInt(item.score.split(':')[0]) >= 0 || parseInt(item.score.split(':')[1]) >= 0) && item.awayTeam.trim() == name.trim()
                        });
                        if(result_detail.length > 0){
                            for(let j = 0 ; j < result_detail.length ; j++){
                                let check1 = 0
                                let check2 = 0
                                for(let b = 0 ; b < result_detail[j].scoreRecord.length ; b++){
                                    let scoredTime = result_detail[j].scoreRecord[b].split(' ')[0].trim()
                                    if(scoredTime.includes("'")){
                                        let compareTime = scoredTime.substring(0, scoredTime.length - 1)
                                        if(parseInt(compareTime) > 45){
                                            check1++
                                        }
                                    }

                                    let scoredTime1 = result_detail[j].scoreRecord[b].split(' ')[1].trim()
                                    if(scoredTime1.includes("'")){
                                        let compareTime = scoredTime1.substring(0, scoredTime1.length - 1)
                                        if(parseInt(compareTime) > 45){
                                            check2++
                                        }
                                    }
                                }
                                if(check1 < check2){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            rankOne(name, matchday, histories, direction){
                matchday = matchday + 1
                let matchDay_detail = histories.filter(function(item) {
                    return parseInt(item.matchday) == matchday;
                });

                let p = 0

                if(direction == 'home'){
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return item.homeTeam.trim() == name.trim()
                        });

                        if(result_detail.length > 0){
                            p = result_detail[0].homeRank
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < matchDay_detail.length ; i++){
                        let result_detail = matchDay_detail[i].result.filter(function(item) {
                            return item.awayTeam.trim() == name.trim()
                        });

                        if(result_detail.length > 0){
                            p = result_detail[0].awayRank
                        }
                    }
                }
                return p
            },
            readData(){
                window.axios.post(`${process.env.VUE_APP_URL}getStats`).then(({data})=> {
                    this.historicArray = data.data[1]
                    console.log('historyData', this.historicArray)
                    this.coldMap = data.data[2]
                    console.log('coldMap',this.coldMap)
                    let eventsData = data.data[0]
                    console.log('eventList==>',data.data[0])
                    let competitionArray = []
                    for(let i = 0 ; i < eventsData.length ; i++){
                        if(!eventsData[i].competitions[0]){
                            let index = eventsData.indexOf(eventsData[i]);
                            if (index > -1) {
                                i = i - 1
                                eventsData.splice(index, 1);
                            }
                        }
                    }

                    for(let i = 0 ; i < eventsData.length ; i++){
                        competitionArray[i] = eventsData[i].competitions[0].name
                    }

                    let competitionList = Array.from(new Set (competitionArray))
                    let eventArray = []
                    for(let i = 0 ; i < competitionList.length ; i++){
                        let events = []
                        let k = 0
                        let countryCode =
                        for(let j = 0 ; j < eventsData.length ; j++){
                            if(competitionList[i] == eventsData[j].competitions[0].name){
                                k++
                                countryCode = eventsData[j].countryCode
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
                                    historicD:[]
                                }
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
                                    secondPlus:0,
                                    secondMinus:0,
                                    homefirst:0,
                                    drawfirst:0,
                                    awayfirst:0,
                                    homesecond:0,
                                    drawsecond:0,
                                    awaysecond:0,
                                    eventdays:['All'],
                                    historicD:[]
                                }
                                events[k - 1] = {'eventName':  eventsData[j].name, 'openDate':  eventsData[j].openDate, 'home':home, 'away': away}
                            }
                        }

                        let countryName = this.countryCodeList.filter(function(item) {
                            return item.ccode == countryCode;
                        });
                        if(countryName.length > 0){
                            eventArray.push({'country': countryName[0].cname, 'league': competitionList[i], 'events': events, 'historicData': [], 'currentMatchday': '1'})
                        }
                        else{
                            eventArray.push({'country': 'International', 'league': competitionList[i], 'events': events, 'historicData': [], 'currentMatchday': '1'})
                        }
                    }
                    this.sortJSON(eventArray,'country', '123');
                    this.eventList = eventArray

                    for(let i = 0 ; i < this.eventList.length ; i++){
                        let check = 0
                        for(let j = 0 ; j < this.historicArray.length ; j++){
                            let country = this.historicArray[j].leagueName.split(">>")[0].trim()
                            let league = this.historicArray[j].leagueName.split(">>")[1].trim()
                            // console.log(country, '----', league)
                            if(this.eventList[i].country == country && this.eventList[i].league == league){
                                this.eventList[i].historicData = this.historicArray[j]
                                for(let l = 0 ; l < this.eventList[i].historicData.historic_data.length; l++){
                                    let historic_filter = this.eventList[i].historicData.historic_data[l]
                                    if(historic_filter.result.length == 0){
                                        let index = this.eventList[i].historicData.historic_data.indexOf(historic_filter);
                                        if (index > -1) {
                                            l = l - 1
                                            this.eventList[i].historicData.historic_data.splice(index, 1);
                                        }
                                    }
                                    else{
                                        if(historic_filter.result[0]){
                                            let eventLength = 0
                                            if(historic_filter.result[0].score.includes('0') == true || historic_filter.result[0].score.includes('1') == true || historic_filter.result[0].score.includes('2') == true || historic_filter.result[0].score.includes('3') == true || historic_filter.result[0].score.includes('4') == true || historic_filter.result[0].score.includes('5') == true || historic_filter.result[0].score.includes('6') == true || historic_filter.result[0].score.includes('7') == true || historic_filter.result[0].score.includes('8') == true || historic_filter.result[0].score.includes('9') == true || historic_filter.result[0].score.includes('10') == true){
                                                for(let jj = 0 ; jj < historic_filter.result.length ; jj++){
                                                    if(historic_filter.result[jj].score.includes('0') == true || historic_filter.result[jj].score.includes('1') == true || historic_filter.result[jj].score.includes('2') == true || historic_filter.result[jj].score.includes('3') == true || historic_filter.result[jj].score.includes('4') == true || historic_filter.result[jj].score.includes('5') == true || historic_filter.result[jj].score.includes('6') == true || historic_filter.result[jj].score.includes('7') == true || historic_filter.result[jj].score.includes('8') == true || historic_filter.result[jj].score.includes('9') == true || historic_filter.result[jj].score.includes('10') == true){
                                                        eventLength ++
                                                    }
                                                }
                                                if(eventLength == historic_filter.result.length){
                                                    console.log('==> ok ==>')
                                                    let match_day = parseInt(this.eventList[i].currentMatchday)
                                                    if(parseInt(historic_filter.matchday) > match_day){
                                                        this.eventList[i].currentMatchday = parseInt(historic_filter.matchday)
                                                    }
                                                }
                                                else{
                                                    let before_day = parseInt(this.eventList[i].currentMatchday)
                                                    if(parseInt(historic_filter.matchday) - 1 > before_day){
                                                        this.eventList[i].currentMatchday = parseInt(historic_filter.matchday) - 1
                                                    }
                                                }

                                            }
                                        }
                                    }

                                }
                                check = 1
                            }
                        }
                        if(check == 0){
                            let index = this.eventList.indexOf(this.eventList[i]);
                            if (index > -1) {
                                i = i - 1
                                this.eventList.splice(index, 1);
                            }
                        }

                    }

                    for(let i = 0 ; i < this.eventList.length ; i ++){
                        for(let j = 0 ; j < this.eventList[i].events.length ; j++){
                            let remove = 0
                            let homeName = this.eventList[i].events[j].eventName.split(' v ').splice(0, 1)[0]
                            let awayName = this.eventList[i].events[j].eventName.split(' v ').splice(1, 1)[0]

                            let homeNames = this.coldMap.filter(function(item) {
                                return item.betfair.trim() == homeName.trim();
                            });

                            let homeName1 =
                                let awayName1 =

                            if(homeNames.length > 0){
                                homeName1 = homeNames[0].transfer
                            }

                            let awayNames = this.coldMap.filter(function(item) {
                                return item.betfair.trim() == awayName.trim();
                            });

                            if(awayNames.length > 0){
                                awayName1 = awayNames[0].transfer
                            }

                            let self = this
                            let historyData = this.historicArray.filter(function(item) {
                                return item.leagueName.split('>>').splice(1,1)[0].trim() == self.eventList[i].league;
                            });

                            let currentMatchday = parseInt(this.eventList[i].currentMatchday)
                            if(historyData.length > 0 && historyData[0].historic_data.length > 0){
                                let matchDay_detail = historyData[0].historic_data.filter(function(item) {
                                    return parseInt(item.matchday) == currentMatchday;
                                });

                                let result_detail = matchDay_detail[0].result.filter(function(item) {
                                    return item.awayTeam.trim() == homeName.trim() || item.homeTeam.trim() == homeName.trim();
                                });

                                let result_detail0 = matchDay_detail[0].result.filter(function(item) {
                                    return item.awayTeam.trim() == homeName1.trim() || item.homeTeam.trim() == homeName1.trim();
                                });

                                if(result_detail.length > 0){
                                    if(homeName.trim() == result_detail[0].homeTeam.trim()){
                                        this.eventList[i].events[j].home.name = homeName
                                    }
                                    else if(homeName.trim() == result_detail[0].awayTeam.trim()){
                                        this.eventList[i].events[j].home.name = homeName
                                        this.eventList[i].events[j].home.rank = result_detail[0].awayRank
                                    }
                                    let p = this.getMatchedNumbers(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.p = p

                                    for(let h = 1; h < p + 1; h++){
                                        this.eventList[i].events[j].home.eventdays.push(h)
                                    }

                                    if(p == 0){
                                        remove = 1
                                    }
                                    this.eventList[i].events[j].home.historicD = historyData[0].historic_data

                                    let rank = this.rankOne(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.rank = rank
                                    let z = this.zeroScored(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.z_z = z
                                    let Ov15 = this.Ov15Scored(homeName, currentMatchday, historyData[0].historic_data, 'home', 2)
                                    this.eventList[i].events[j].home.Over15 = Ov15
                                    let Ov25 = this.Ov15Scored(homeName, currentMatchday, historyData[0].historic_data, 'home', 3)
                                    this.eventList[i].events[j].home.Over25 = Ov25
                                    let Ov35 = this.Ov15Scored(homeName, currentMatchday, historyData[0].historic_data, 'home', 4)
                                    this.eventList[i].events[j].home.Over35 = Ov35
                                    let scored = this.Scored(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.scored = scored
                                    let conc = this.Conc(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.conc = conc
                                    let average1 = this.averageScore(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.average1 = average1
                                    let average2 = this.averageConc(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.average2 = average2
                                    let bts = this.bothTeamScore(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.bts = bts
                                    let firstOne = this.firstOne(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.first1 = firstOne
                                    let firstTwo = this.firstTwo(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.first2 = firstTwo
                                    let secondOne = this.secondOne(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.second1 = secondOne
                                    let secondTwo = this.secondTwo(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.second2 = secondTwo
                                    let timescored15 = this.timeScored(homeName, currentMatchday, historyData[0].historic_data, 'home', 15)
                                    this.eventList[i].events[j].home.time15_S = timescored15
                                    let timescored30 = this.timeScored(homeName, currentMatchday, historyData[0].historic_data, 'home', 30)
                                    this.eventList[i].events[j].home.time30_S = timescored30
                                    let timescored45 = this.timeScored(homeName, currentMatchday, historyData[0].historic_data, 'home', 45)
                                    this.eventList[i].events[j].home.time45_S = timescored45
                                    let timescored60 = this.timeScored(homeName, currentMatchday, historyData[0].historic_data, 'home', 60)
                                    this.eventList[i].events[j].home.time60_S = timescored60
                                    let timescored75 = this.timeScored(homeName, currentMatchday, historyData[0].historic_data, 'home', 75)
                                    this.eventList[i].events[j].home.time75_S = timescored75
                                    let timescored90 = this.timeScored(homeName, currentMatchday, historyData[0].historic_data, 'home', 90)
                                    this.eventList[i].events[j].home.time90_S = timescored90

                                    let timeconceded15 = this.timeConceded(homeName, currentMatchday, historyData[0].historic_data, 'home', 15)
                                    this.eventList[i].events[j].home.time15_C = timeconceded15
                                    let timeconceded30 = this.timeConceded(homeName, currentMatchday, historyData[0].historic_data, 'home', 30)
                                    this.eventList[i].events[j].home.time30_C = timeconceded30
                                    let timeconceded45 = this.timeConceded(homeName, currentMatchday, historyData[0].historic_data, 'home', 45)
                                    this.eventList[i].events[j].home.time45_C = timeconceded45
                                    let timeconceded60 = this.timeConceded(homeName, currentMatchday, historyData[0].historic_data, 'home', 60)
                                    this.eventList[i].events[j].home.time60_C = timeconceded60
                                    let timeconceded75 = this.timeConceded(homeName, currentMatchday, historyData[0].historic_data, 'home', 75)
                                    this.eventList[i].events[j].home.time75_C = timeconceded75
                                    let timeconceded90 = this.timeConceded(homeName, currentMatchday, historyData[0].historic_data, 'home', 90)
                                    this.eventList[i].events[j].home.time90_C = timeconceded90

                                    let gs1 = this.GS(homeName, currentMatchday, historyData[0].historic_data, 'home', 45)
                                    this.eventList[i].events[j].home.gs1 = gs1
                                    let gs2 = this.GS(homeName, currentMatchday, historyData[0].historic_data, 'home', 90)
                                    this.eventList[i].events[j].home.gs2 = gs2

                                    let gc1 = this.GC(homeName, currentMatchday, historyData[0].historic_data, 'home', 45)
                                    this.eventList[i].events[j].home.gc1 = gc1
                                    let gc2 = this.GC(homeName, currentMatchday, historyData[0].historic_data, 'home', 90)
                                    this.eventList[i].events[j].home.gc2 = gc2

                                    let over40 = this.over4085(homeName, currentMatchday, historyData[0].historic_data, 'home', 40, 45)
                                    this.eventList[i].events[j].home.over40 = over40
                                    let over85 = this.over4085(homeName, currentMatchday, historyData[0].historic_data, 'home', 85, 90)
                                    this.eventList[i].events[j].home.over85 = over85
                                    let ch = this.CH1(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.C_H = ch
                                    let cd = this.CD1(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.C_D = cd
                                    let ca = this.CA1(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.C_A = ca
                                    let first10 = this.first1_0(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.first10 = first10
                                    let first11 = this.first1_1(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.first11 = first11
                                    let first20 = this.first2_0(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.first20 = first20
                                    let second01 = this.second1_0(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.second01 = second01
                                    let second11 = this.second1_1(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.second11 = second11
                                    let second20 = this.second2_0(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.second02 = second20

                                    let lastgoal = this.lastGoal(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.lastGoal = lastgoal
                                    let secondplus = this.secondPlus(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.secondplus = secondplus
                                    let secondminus = this.secondMinus(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.secondminus = secondminus
                                    let homefirst = this.homeFirst(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.homefirst = homefirst
                                    let drawfirst = this.drawFirst(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.drawfirst = drawfirst
                                    let awayfirst = this.awayFirst(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.awayfirst = awayfirst
                                    let homesecond = this.homeSecond(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.homesecond = homesecond
                                    let drawsecond = this.drawSecond(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.drawsecond = drawsecond
                                    let awaysecond = this.awaySecond(homeName, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.awaysecond = awaysecond
                                    // console.log('homeName===>',this.eventList[i].events[j].home.name)

                                }
                                else if(result_detail0.length > 0){
                                    if(homeName1.trim() == result_detail0[0].homeTeam.trim()){
                                        this.eventList[i].events[j].home.name = homeName
                                    }
                                    else if(homeName1.trim() == result_detail0[0].awayTeam.trim()){
                                        this.eventList[i].events[j].home.name = homeName
                                    }
                                    let p = this.getMatchedNumbers(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.p = p

                                    for(let h = 1; h < p + 1; h++){
                                        this.eventList[i].events[j].home.eventdays.push(h)
                                    }

                                    if(p == 0){
                                        remove = 1
                                    }
                                    this.eventList[i].events[j].home.historicD = historyData[0].historic_data

                                    let rank = this.rankOne(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.rank = rank
                                    let z = this.zeroScored(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.z_z = z
                                    let Ov15 = this.Ov15Scored(homeName1, currentMatchday, historyData[0].historic_data, 'home', 2)
                                    this.eventList[i].events[j].home.Over15 = Ov15
                                    let Ov25 = this.Ov15Scored(homeName1, currentMatchday, historyData[0].historic_data, 'home', 3)
                                    this.eventList[i].events[j].home.Over25 = Ov25
                                    let Ov35 = this.Ov15Scored(homeName1, currentMatchday, historyData[0].historic_data, 'home', 4)
                                    this.eventList[i].events[j].home.Over35 = Ov35
                                    let scored = this.Scored(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.scored = scored
                                    let conc = this.Conc(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.conc = conc
                                    let average1 = this.averageScore(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.average1 = average1
                                    let average2 = this.averageConc(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.average2 = average2
                                    let bts = this.bothTeamScore(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.bts = bts
                                    let firstOne = this.firstOne(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.first1 = firstOne
                                    let firstTwo = this.firstTwo(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.first2 = firstTwo
                                    let secondOne = this.secondOne(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.second1 = secondOne
                                    let secondTwo = this.secondTwo(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.second2 = secondTwo
                                    let timescored15 = this.timeScored(homeName1, currentMatchday, historyData[0].historic_data, 'home', 15)
                                    this.eventList[i].events[j].home.time15_S = timescored15
                                    let timescored30 = this.timeScored(homeName1, currentMatchday, historyData[0].historic_data, 'home', 30)
                                    this.eventList[i].events[j].home.time30_S = timescored30
                                    let timescored45 = this.timeScored(homeName1, currentMatchday, historyData[0].historic_data, 'home', 45)
                                    this.eventList[i].events[j].home.time45_S = timescored45
                                    let timescored60 = this.timeScored(homeName1, currentMatchday, historyData[0].historic_data, 'home', 60)
                                    this.eventList[i].events[j].home.time60_S = timescored60
                                    let timescored75 = this.timeScored(homeName1, currentMatchday, historyData[0].historic_data, 'home', 75)
                                    this.eventList[i].events[j].home.time75_S = timescored75
                                    let timescored90 = this.timeScored(homeName1, currentMatchday, historyData[0].historic_data, 'home', 90)
                                    this.eventList[i].events[j].home.time90_S = timescored90

                                    let timeconceded15 = this.timeConceded(homeName1, currentMatchday, historyData[0].historic_data, 'home', 15)
                                    this.eventList[i].events[j].home.time15_C = timeconceded15
                                    let timeconceded30 = this.timeConceded(homeName1, currentMatchday, historyData[0].historic_data, 'home', 30)
                                    this.eventList[i].events[j].home.time30_C = timeconceded30
                                    let timeconceded45 = this.timeConceded(homeName1, currentMatchday, historyData[0].historic_data, 'home', 45)
                                    this.eventList[i].events[j].home.time45_C = timeconceded45
                                    let timeconceded60 = this.timeConceded(homeName1, currentMatchday, historyData[0].historic_data, 'home', 60)
                                    this.eventList[i].events[j].home.time60_C = timeconceded60
                                    let timeconceded75 = this.timeConceded(homeName1, currentMatchday, historyData[0].historic_data, 'home', 75)
                                    this.eventList[i].events[j].home.time75_C = timeconceded75
                                    let timeconceded90 = this.timeConceded(homeName1, currentMatchday, historyData[0].historic_data, 'home', 90)
                                    this.eventList[i].events[j].home.time90_C = timeconceded90

                                    let gs1 = this.GS(homeName1, currentMatchday, historyData[0].historic_data, 'home', 45)
                                    this.eventList[i].events[j].home.gs1 = gs1
                                    let gs2 = this.GS(homeName1, currentMatchday, historyData[0].historic_data, 'home', 90)
                                    this.eventList[i].events[j].home.gs2 = gs2

                                    let gc1 = this.GC(homeName1, currentMatchday, historyData[0].historic_data, 'home', 45)
                                    this.eventList[i].events[j].home.gc1 = gc1
                                    let gc2 = this.GC(homeName1, currentMatchday, historyData[0].historic_data, 'home', 90)
                                    this.eventList[i].events[j].home.gc2 = gc2

                                    let over40 = this.over4085(homeName1, currentMatchday, historyData[0].historic_data, 'home', 40, 45)
                                    this.eventList[i].events[j].home.over40 = over40
                                    let over85 = this.over4085(homeName1, currentMatchday, historyData[0].historic_data, 'home', 85, 90)
                                    this.eventList[i].events[j].home.over85 = over85

                                    let ch = this.CH1(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.C_H = ch
                                    let cd = this.CD1(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.C_D = cd
                                    let ca = this.CA1(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.C_A = ca
                                    let first10 = this.first1_0(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.first10 = first10
                                    let first11 = this.first1_1(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.first11 = first11
                                    let first20 = this.first2_0(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.first20 = first20
                                    let second01 = this.second1_0(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.second01 = second01
                                    let second11 = this.second1_1(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.second11 = second11
                                    let second20 = this.second2_0(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.second02 = second20

                                    let lastgoal = this.lastGoal(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.lastGoal = lastgoal
                                    let secondplus = this.secondPlus(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.secondplus = secondplus
                                    let secondminus = this.secondMinus(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.secondminus = secondminus
                                    let homefirst = this.homeFirst(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.homefirst = homefirst
                                    let drawfirst = this.drawFirst(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.drawfirst = drawfirst

                                    let awayfirst = this.awayFirst(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.awayfirst = awayfirst
                                    let homesecond = this.homeSecond(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.homesecond = homesecond
                                    let drawsecond = this.drawSecond(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.drawsecond = drawsecond
                                    let awaysecond = this.awaySecond(homeName1, currentMatchday, historyData[0].historic_data, 'home')
                                    this.eventList[i].events[j].home.awaysecond = awaysecond
                                    // console.log('homeName===>',this.eventList[i].events[j].home.name)

                                }
                                else{
                                    remove = 1
                                }

                                let result_detail1 = matchDay_detail[0].result.filter(function(item) {
                                    return item.awayTeam.trim() == awayName.trim() || item.homeTeam.trim() == awayName.trim();
                                });
                                let result_detail2 = matchDay_detail[0].result.filter(function(item) {
                                    return item.awayTeam.trim() == awayName1.trim() || item.homeTeam.trim() == awayName1.trim();
                                });
                                if(result_detail1.length > 0){
                                    if(awayName.trim() == result_detail1[0].homeTeam.trim()){
                                        this.eventList[i].events[j].away.name = awayName
                                    }
                                    else if(awayName.trim() == result_detail1[0].awayTeam.trim()){
                                        this.eventList[i].events[j].away.name = awayName
                                    }
                                    let p = this.getMatchedNumbers(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.p = p

                                    for(let h = 1; h < p + 1; h++){
                                        this.eventList[i].events[j].away.eventdays.push(h)
                                    }

                                    if(p == 0){
                                        remove = 1
                                    }
                                    this.eventList[i].events[j].away.historicD = historyData[0].historic_data
                                    let rank = this.rankOne(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.rank = rank
                                    let z = this.zeroScored(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.z_z = z
                                    let Ov15 = this.Ov15Scored(awayName, currentMatchday, historyData[0].historic_data, 'away', 2)
                                    this.eventList[i].events[j].away.Over15 = Ov15
                                    let Ov25 = this.Ov15Scored(awayName, currentMatchday, historyData[0].historic_data, 'away', 3)
                                    this.eventList[i].events[j].away.Over25 = Ov25
                                    let Ov35 = this.Ov15Scored(awayName, currentMatchday, historyData[0].historic_data, 'away', 4)
                                    this.eventList[i].events[j].away.Over35 = Ov35
                                    let scored = this.Scored(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.scored = scored
                                    let conc = this.Conc(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.conc = conc
                                    let average1 = this.averageScore(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.average1 = average1
                                    let average2 = this.averageConc(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.average2 = average2
                                    let bts = this.bothTeamScore(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.bts = bts
                                    let firstOne = this.firstOne(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.first1 = firstOne
                                    let firstTwo = this.firstTwo(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.first2 = firstTwo
                                    let secondOne = this.secondOne(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.second1 = secondOne
                                    let secondTwo = this.secondTwo(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.second2 = secondTwo
                                    let timescored15 = this.timeScored(awayName, currentMatchday, historyData[0].historic_data, 'away', 15)
                                    this.eventList[i].events[j].away.time15_S = timescored15
                                    let timescored30 = this.timeScored(awayName, currentMatchday, historyData[0].historic_data, 'away', 30)
                                    this.eventList[i].events[j].away.time30_S = timescored30
                                    let timescored45 = this.timeScored(awayName, currentMatchday, historyData[0].historic_data, 'away', 45)
                                    this.eventList[i].events[j].away.time45_S = timescored45
                                    let timescored60 = this.timeScored(awayName, currentMatchday, historyData[0].historic_data, 'away', 60)
                                    this.eventList[i].events[j].away.time60_S = timescored60
                                    let timescored75 = this.timeScored(awayName, currentMatchday, historyData[0].historic_data, 'away', 75)
                                    this.eventList[i].events[j].away.time75_S = timescored75
                                    let timescored90 = this.timeScored(awayName, currentMatchday, historyData[0].historic_data, 'away', 90)
                                    this.eventList[i].events[j].away.time90_S = timescored90

                                    let timeconceded15 = this.timeConceded(awayName, currentMatchday, historyData[0].historic_data, 'away', 15)
                                    this.eventList[i].events[j].away.time15_C = timeconceded15
                                    let timeconceded30 = this.timeConceded(awayName, currentMatchday, historyData[0].historic_data, 'away', 30)
                                    this.eventList[i].events[j].away.time30_C = timeconceded30
                                    let timeconceded45 = this.timeConceded(awayName, currentMatchday, historyData[0].historic_data, 'away', 45)
                                    this.eventList[i].events[j].away.time45_C = timeconceded45
                                    let timeconceded60 = this.timeConceded(awayName, currentMatchday, historyData[0].historic_data, 'away', 60)
                                    this.eventList[i].events[j].away.time60_C = timeconceded60
                                    let timeconceded75 = this.timeConceded(awayName, currentMatchday, historyData[0].historic_data, 'away', 75)
                                    this.eventList[i].events[j].away.time75_C = timeconceded75
                                    let timeconceded90 = this.timeConceded(awayName, currentMatchday, historyData[0].historic_data, 'away', 90)
                                    this.eventList[i].events[j].away.time90_C = timeconceded90

                                    let gs1 = this.GS(awayName, currentMatchday, historyData[0].historic_data, 'away', 45)
                                    this.eventList[i].events[j].away.gs1 = gs1
                                    let gs2 = this.GS(awayName, currentMatchday, historyData[0].historic_data, 'away', 90)
                                    this.eventList[i].events[j].away.gs2 = gs2

                                    let gc1 = this.GC(awayName, currentMatchday, historyData[0].historic_data, 'away', 45)
                                    this.eventList[i].events[j].away.gc1 = gc1
                                    let gc2 = this.GC(awayName, currentMatchday, historyData[0].historic_data, 'away', 90)
                                    this.eventList[i].events[j].away.gc2 = gc2

                                    let over40 = this.over4085(awayName, currentMatchday, historyData[0].historic_data, 'away', 40, 45)
                                    this.eventList[i].events[j].away.over40 = over40
                                    let over85 = this.over4085(awayName, currentMatchday, historyData[0].historic_data, 'away', 85, 90)
                                    this.eventList[i].events[j].away.over85 = over85
                                    let ch = this.CH1(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.C_H = ch
                                    let cd = this.CD1(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.C_D = cd
                                    let ca = this.CA1(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.C_A = ca
                                    let first10 = this.first1_0(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.first10 = first10
                                    let first11 = this.first1_1(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.first11 = first11
                                    let first20 = this.first2_0(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.first20 = first20
                                    let second01 = this.second1_0(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.second01 = second01
                                    let second11 = this.second1_1(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.second11 = second11
                                    let second20 = this.second2_0(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.second02 = second20

                                    let lastgoal = this.lastGoal(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.lastGoal = lastgoal
                                    let secondplus = this.secondPlus(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.secondplus = secondplus
                                    let secondminus = this.secondMinus(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.secondminus = secondminus
                                    let homefirst = this.homeFirst(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.homefirst = homefirst
                                    let drawfirst = this.drawFirst(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.drawfirst = drawfirst
                                    let awayfirst = this.awayFirst(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.awayfirst = awayfirst
                                    let homesecond = this.homeSecond(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.homesecond = homesecond
                                    let drawsecond = this.drawSecond(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.drawsecond = drawsecond
                                    let awaysecond = this.awaySecond(awayName, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.awaysecond = awaysecond
                                    // console.log('awayName===>',this.eventList[i].events[j].away.name)
                                }
                                else if(result_detail2.length > 0){
                                    if(awayName1.trim() == result_detail2[0].homeTeam.trim()){
                                        this.eventList[i].events[j].away.name = awayName
                                    }
                                    else if(awayName1.trim() == result_detail2[0].awayTeam.trim()){
                                        this.eventList[i].events[j].away.name = awayName
                                    }
                                    let p = this.getMatchedNumbers(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.p = p

                                    for(let h = 1; h < p + 1; h++){
                                        this.eventList[i].events[j].away.eventdays.push(h)
                                    }

                                    if(p == 0){
                                        remove = 1
                                    }
                                    this.eventList[i].events[j].away.historicD = historyData[0].historic_data
                                    let rank = this.rankOne(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.rank = rank
                                    let z = this.zeroScored(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.z_z = z
                                    let Ov15 = this.Ov15Scored(awayName1, currentMatchday, historyData[0].historic_data, 'away', 2)
                                    this.eventList[i].events[j].away.Over15 = Ov15
                                    let Ov25 = this.Ov15Scored(awayName1, currentMatchday, historyData[0].historic_data, 'away', 3)
                                    this.eventList[i].events[j].away.Over25 = Ov25
                                    let Ov35 = this.Ov15Scored(awayName1, currentMatchday, historyData[0].historic_data, 'away', 4)
                                    this.eventList[i].events[j].away.Over35 = Ov35
                                    let scored = this.Scored(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.scored = scored
                                    let conc = this.Conc(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.conc = conc
                                    let average1 = this.averageScore(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.average1 = average1
                                    let average2 = this.averageConc(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.average2 = average2
                                    let bts = this.bothTeamScore(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.bts = bts
                                    let firstOne = this.firstOne(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.first1 = firstOne
                                    let firstTwo = this.firstTwo(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.first2 = firstTwo
                                    let secondOne = this.secondOne(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.second1 = secondOne
                                    let secondTwo = this.secondTwo(awayName1, currentMatchday, historyData[0].historic_data, 'away')

                                    this.eventList[i].events[j].away.second2 = secondTwo
                                    let timescored15 = this.timeScored(awayName1, currentMatchday, historyData[0].historic_data, 'away', 15)
                                    this.eventList[i].events[j].away.time15_S = timescored15
                                    let timescored30 = this.timeScored(awayName1, currentMatchday, historyData[0].historic_data, 'away', 30)
                                    this.eventList[i].events[j].away.time30_S = timescored30
                                    let timescored45 = this.timeScored(awayName1, currentMatchday, historyData[0].historic_data, 'away', 45)
                                    this.eventList[i].events[j].away.time45_S = timescored45
                                    let timescored60 = this.timeScored(awayName1, currentMatchday, historyData[0].historic_data, 'away', 60)
                                    this.eventList[i].events[j].away.time60_S = timescored60
                                    let timescored75 = this.timeScored(awayName1, currentMatchday, historyData[0].historic_data, 'away', 75)
                                    this.eventList[i].events[j].away.time75_S = timescored75
                                    let timescored90 = this.timeScored(awayName1, currentMatchday, historyData[0].historic_data, 'away', 90)
                                    this.eventList[i].events[j].away.time90_S = timescored90

                                    let timeconceded15 = this.timeConceded(awayName1, currentMatchday, historyData[0].historic_data, 'away', 15)
                                    this.eventList[i].events[j].away.time15_C = timeconceded15
                                    let timeconceded30 = this.timeConceded(awayName1, currentMatchday, historyData[0].historic_data, 'away', 30)
                                    this.eventList[i].events[j].away.time30_C = timeconceded30
                                    let timeconceded45 = this.timeConceded(awayName1, currentMatchday, historyData[0].historic_data, 'away', 45)
                                    this.eventList[i].events[j].away.time45_C = timeconceded45
                                    let timeconceded60 = this.timeConceded(awayName1, currentMatchday, historyData[0].historic_data, 'away', 60)
                                    this.eventList[i].events[j].away.time60_C = timeconceded60
                                    let timeconceded75 = this.timeConceded(awayName1, currentMatchday, historyData[0].historic_data, 'away', 75)
                                    this.eventList[i].events[j].away.time75_C = timeconceded75
                                    let timeconceded90 = this.timeConceded(awayName1, currentMatchday, historyData[0].historic_data, 'away', 90)
                                    this.eventList[i].events[j].away.time90_C = timeconceded90

                                    let gs1 = this.GS(awayName1, currentMatchday, historyData[0].historic_data, 'away', 45)
                                    this.eventList[i].events[j].away.gs1 = gs1
                                    let gs2 = this.GS(awayName1, currentMatchday, historyData[0].historic_data, 'away', 90)
                                    this.eventList[i].events[j].away.gs2 = gs2

                                    let gc1 = this.GC(awayName1, currentMatchday, historyData[0].historic_data, 'away', 45)
                                    this.eventList[i].events[j].away.gc1 = gc1
                                    let gc2 = this.GC(awayName1, currentMatchday, historyData[0].historic_data, 'away', 90)
                                    this.eventList[i].events[j].away.gc2 = gc2

                                    let over40 = this.over4085(awayName1, currentMatchday, historyData[0].historic_data, 'away', 40, 45)
                                    this.eventList[i].events[j].away.over40 = over40
                                    let over85 = this.over4085(awayName1, currentMatchday, historyData[0].historic_data, 'away', 85, 90)
                                    this.eventList[i].events[j].away.over85 = over85
                                    let ch = this.CH1(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.C_H = ch
                                    let cd = this.CD1(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.C_D = cd
                                    let ca = this.CA1(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.C_A = ca
                                    let first10 = this.first1_0(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.first10 = first10
                                    let first11 = this.first1_1(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.first11 = first11
                                    let first20 = this.first2_0(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.first20 = first20
                                    let second01 = this.second1_0(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.second01 = second01
                                    let second11 = this.second1_1(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.second11 = second11
                                    let second20 = this.second2_0(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.second02 = second20

                                    let lastgoal = this.lastGoal(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.lastGoal = lastgoal
                                    let secondplus = this.secondPlus(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.secondplus = secondplus
                                    let secondminus = this.secondMinus(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.secondminus = secondminus
                                    let homefirst = this.homeFirst(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.homefirst = homefirst
                                    let drawfirst = this.drawFirst(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.drawfirst = drawfirst
                                    let awayfirst = this.awayFirst(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.awayfirst = awayfirst
                                    let homesecond = this.homeSecond(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.homesecond = homesecond
                                    let drawsecond = this.drawSecond(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.drawsecond = drawsecond
                                    let awaysecond = this.awaySecond(awayName1, currentMatchday, historyData[0].historic_data, 'away')
                                    this.eventList[i].events[j].away.awaysecond = awaysecond
                                    // console.log('awayName===>',this.eventList[i].events[j].away.name)
                                }
                                else{
                                    remove = 1
                                }
                            }
                            else{
                                remove = 1
                            }

                            if(remove == 1){
                                let index = this.eventList[i].events.indexOf(this.eventList[i].events[j]);
                                if (index > -1) {
                                    j = j - 1
                                    this.eventList[i].events.splice(index, 1);
                                }
                            }
                        }
                    }
                    console.log(this.eventList)
                })
            },
            sortJSON(data, key) {
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }
        },
        created() {
            this.readData()
        }
    }
</script>
<style>
    .eventdays select{
        padding-left: 5px;
    }
    .eventdays{
        width: 55px;
        float: left;
        margin-top: 35px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .event-list{
        background: #dff0d8;
        padding: 7px 12px;
        font-weight: 600;
        cursor: pointer;
    }
    .event-content{
        background: #effaeb;
        font-size: 13px;
        padding: 7px 12px;
        cursor: pointer;
    }
    .event-graph{
        height: 668px;
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
        height: 90px;
    }
</style>
