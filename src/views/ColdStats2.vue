<template>
    <div class="cold-stats-container" style="min-width: 1000px">
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
                        :value.sync = "filter_key"
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
                    <div class="event-content" style="display: flex;">
                        <div style="flex: 6; color: #dff0d8">.</div>
                        <div style="flex: 6; display: flex; text-align: center">
                            <div style="flex: 2; color: #dff0d8;">...</div>
                            <div style="flex: 1;">Home</div>
                            <div style="flex: 1;">Draw</div>
                            <div style="flex: 1;">Away</div>
                            <div style="flex: 1;">BTS</div>
                            <div style="flex: 1;">O1.5</div>
                            <div style="flex: 1;">O2.5</div>
                            <div style="flex: 1;">O3.5</div>
                        </div>
                    </div>
                    <div v-for="(item1, index) in item.events" :key="item1.eventId">
                        <div v-if="index % 2 == 0" class="event-content" style="display: flex; background: #faf9fa;">
                            <div style="flex: 6; color: #faf9fa">.</div>
                            <div style="flex: 6; display: flex; text-align: center">
                                <div style="flex: 2; text-align: left;">1 year</div>
                                <div :key="item1.c_stats.home.tooltip"  :id="item1.c_stats.home.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.home.color, 'background': item1.c_stats.home.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.home.percent}}</span>
                                </div>
                                <div :key="item1.c_stats.draw.tooltip"  :id="item1.c_stats.draw.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.draw.color, 'background': item1.c_stats.draw.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.draw.percent}}</span>
                                </div>
                                <div :key="item1.c_stats.away.tooltip"  :id="item1.c_stats.away.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.away.color, 'background': item1.c_stats.away.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.away.percent}}</span>
                                </div>
                                <div :key="item1.c_stats.bts.tooltip"  :id="item1.c_stats.bts.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.bts.color, 'background': item1.c_stats.bts.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.bts.percent}}</span>
                                </div>
                                <div :key="item1.c_stats.O_15.tooltip"  :id="item1.c_stats.O_15.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.O_15.color, 'background': item1.c_stats.O_15.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.O_15.percent}}</span>
                                </div>
                                <div :key="item1.c_stats.O_25.tooltip"  :id="item1.c_stats.O_25.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.O_25.color, 'background': item1.c_stats.O_25.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.O_25.percent}}</span>
                                </div>
                                <div :key="item1.c_stats.O_35.tooltip"  :id="item1.c_stats.O_35.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.O_35.color, 'background': item1.c_stats.O_35.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.O_35.percent}}</span>
                                </div>
                                <b-tooltip :key="item1.c_stats.home.tooltip + '1'" :target="item1.c_stats.home.tooltip" v-if="item1.c_stats.home.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.home.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.home.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.c_stats.away.tooltip + '1'" :target="item1.c_stats.away.tooltip" v-if="item1.c_stats.away.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.away.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.away.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.c_stats.draw.tooltip + '1'" :target="item1.c_stats.draw.tooltip" v-if="item1.c_stats.draw.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.draw.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.draw.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.c_stats.O_15.tooltip + '1'" :target="item1.c_stats.O_15.tooltip" v-if="item1.c_stats.O_15.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.O_15.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.O_15.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.c_stats.O_25.tooltip + '1'" :target="item1.c_stats.O_25.tooltip" v-if="item1.c_stats.O_25.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.O_25.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.O_25.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.c_stats.O_35.tooltip + '1'" :target="item1.c_stats.O_35.tooltip" v-if="item1.c_stats.O_35.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.O_35.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.O_35.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.c_stats.bts.tooltip + '1'" :target="item1.c_stats.bts.tooltip" v-if="item1.c_stats.bts.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.bts.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.bts.value}}%</span>
                                </b-tooltip>
                            </div>
                        </div>
                        <div v-else class="event-content" style="display: flex; background: white;">
                            <div style="flex: 6; color: white;">.</div>
                            <div style="flex: 6; display: flex; text-align: center;">
                                <div style="flex: 2; text-align: left;">1 year</div>
                                <div :key="item1.c_stats.home.tooltip"  :id="item1.c_stats.home.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.home.color, 'background': item1.c_stats.home.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.home.percent}}</span>
                                </div>
                                <div :key="item1.c_stats.draw.tooltip"  :id="item1.c_stats.draw.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.draw.color, 'background': item1.c_stats.draw.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.draw.percent}}</span>
                                </div>
                                <div :key="item1.c_stats.away.tooltip"  :id="item1.c_stats.away.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.away.color, 'background': item1.c_stats.away.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.away.percent}}</span>
                                </div>
                                <div :key="item1.c_stats.bts.tooltip"  :id="item1.c_stats.bts.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.bts.color, 'background': item1.c_stats.bts.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.bts.percent}}</span>
                                </div>
                                <div :key="item1.c_stats.O_15.tooltip"  :id="item1.c_stats.O_15.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.O_15.color, 'background': item1.c_stats.O_15.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.O_15.percent}}</span>
                                </div>
                                <div :key="item1.c_stats.O_25.tooltip"  :id="item1.c_stats.O_25.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.O_25.color, 'background': item1.c_stats.O_25.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.O_25.percent}}</span>
                                </div>
                                <div :key="item1.c_stats.O_35.tooltip"  :id="item1.c_stats.O_35.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.c_stats.O_35.color, 'background': item1.c_stats.O_35.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.c_stats.O_35.percent}}</span>
                                </div>
                                <b-tooltip :key="item1.c_stats.home.tooltip + '1'" :target="item1.c_stats.home.tooltip" v-if="item1.c_stats.home.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.home.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.home.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.c_stats.away.tooltip + '1'" :target="item1.c_stats.away.tooltip" v-if="item1.c_stats.away.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.away.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.away.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.c_stats.draw.tooltip + '1'" :target="item1.c_stats.draw.tooltip" v-if="item1.c_stats.draw.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.draw.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.draw.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.c_stats.O_15.tooltip + '1'" :target="item1.c_stats.O_15.tooltip" v-if="item1.c_stats.O_15.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.O_15.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.O_15.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.c_stats.O_25.tooltip + '1'" :target="item1.c_stats.O_25.tooltip" v-if="item1.c_stats.O_25.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.O_25.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.O_25.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.c_stats.O_35.tooltip + '1'" :target="item1.c_stats.O_35.tooltip" v-if="item1.c_stats.O_35.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.O_35.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.O_35.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.c_stats.bts.tooltip + '1'" :target="item1.c_stats.bts.tooltip" v-if="item1.c_stats.bts.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.c_stats.bts.odd}}</span><br>
                                    <span>Stat: {{item1.c_stats.bts.value}}%</span>
                                </b-tooltip>
                            </div>
                        </div>

                        <div v-if="index % 2 == 0" class="event-content" style="display: flex; background: #faf9fa;">
                            <div style="flex: 6; position: relative; top: 15px;">{{item1.eventtime}} - {{item.country}} - {{item.league1}} - {{item1.eventName}}</div>
                            <div style="flex: 6; display: flex; text-align: center">
                                <div style="flex: 2; text-align: left">3 year</div>
                                <div :key="item1.past_3_stats.home.tooltip"  :id="item1.past_3_stats.home.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.home.color, 'background': item1.past_3_stats.home.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.home.percent}}</span>
                                </div>
                                <div :key="item1.past_3_stats.draw.tooltip"  :id="item1.past_3_stats.draw.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.draw.color, 'background': item1.past_3_stats.draw.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.draw.percent}}</span>
                                </div>
                                <div :key="item1.past_3_stats.away.tooltip"  :id="item1.past_3_stats.away.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.away.color, 'background': item1.past_3_stats.away.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.away.percent}}</span>
                                </div>
                                <div :key="item1.past_3_stats.bts.tooltip"  :id="item1.past_3_stats.bts.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.bts.color, 'background': item1.past_3_stats.bts.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.bts.percent}}</span>
                                </div>
                                <div :key="item1.past_3_stats.O_15.tooltip"  :id="item1.past_3_stats.O_15.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.O_15.color, 'background': item1.past_3_stats.O_15.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.O_15.percent}}</span>
                                </div>
                                <div :key="item1.past_3_stats.O_25.tooltip"  :id="item1.past_3_stats.O_25.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.O_25.color, 'background': item1.past_3_stats.O_25.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.O_25.percent}}</span>
                                </div>
                                <div :key="item1.past_3_stats.O_35.tooltip"  :id="item1.past_3_stats.O_35.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.O_35.color, 'background': item1.past_3_stats.O_35.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.O_35.percent}}</span>
                                </div>
                                <b-tooltip :key="item1.past_3_stats.home.tooltip + '1'" :target="item1.past_3_stats.home.tooltip" v-if="item1.past_3_stats.home.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.home.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.home.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_3_stats.away.tooltip + '1'" :target="item1.past_3_stats.away.tooltip" v-if="item1.past_3_stats.away.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.away.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.away.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_3_stats.draw.tooltip + '1'" :target="item1.past_3_stats.draw.tooltip" v-if="item1.past_3_stats.draw.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.draw.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.draw.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_3_stats.O_15.tooltip + '1'" :target="item1.past_3_stats.O_15.tooltip" v-if="item1.past_3_stats.O_15.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.O_15.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.O_15.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_3_stats.O_25.tooltip + '1'" :target="item1.past_3_stats.O_25.tooltip" v-if="item1.past_3_stats.O_25.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.O_25.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.O_25.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_3_stats.O_35.tooltip + '1'" :target="item1.past_3_stats.O_35.tooltip" v-if="item1.past_3_stats.O_35.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.O_35.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.O_35.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_3_stats.bts.tooltip + '1'" :target="item1.past_3_stats.bts.tooltip" v-if="item1.past_3_stats.bts.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.bts.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.bts.value}}%</span>
                                </b-tooltip>
                            </div>
                        </div>
                        <div v-else class="event-content" style="display: flex; background: white;">
                            <div style="flex: 6; position: relative; top: 15px;">{{item1.eventtime}} - {{item.country}} - {{item.league1}} - {{item1.eventName}}</div>
                            <div style="flex: 6; display: flex; text-align: center">
                                <div style="flex: 2; text-align: left">3 year</div>
                                <div :key="item1.past_3_stats.home.tooltip"  :id="item1.past_3_stats.home.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.home.color, 'background': item1.past_3_stats.home.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.home.percent}}</span>
                                </div>
                                <div :key="item1.past_3_stats.draw.tooltip"  :id="item1.past_3_stats.draw.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.draw.color, 'background': item1.past_3_stats.draw.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.draw.percent}}</span>
                                </div>
                                <div :key="item1.past_3_stats.away.tooltip"  :id="item1.past_3_stats.away.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.away.color, 'background': item1.past_3_stats.away.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.away.percent}}</span>
                                </div>
                                <div :key="item1.past_3_stats.bts.tooltip"  :id="item1.past_3_stats.bts.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.bts.color, 'background': item1.past_3_stats.bts.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.bts.percent}}</span>
                                </div>
                                <div :key="item1.past_3_stats.O_15.tooltip"  :id="item1.past_3_stats.O_15.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.O_15.color, 'background': item1.past_3_stats.O_15.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.O_15.percent}}</span>
                                </div>
                                <div :key="item1.past_3_stats.O_25.tooltip"  :id="item1.past_3_stats.O_25.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.O_25.color, 'background': item1.past_3_stats.O_25.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.O_25.percent}}</span>
                                </div>
                                <div :key="item1.past_3_stats.O_35.tooltip"  :id="item1.past_3_stats.O_35.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_3_stats.O_35.color, 'background': item1.past_3_stats.O_35.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_3_stats.O_35.percent}}</span>
                                </div>
                                <b-tooltip :key="item1.past_3_stats.home.tooltip + '1'" :target="item1.past_3_stats.home.tooltip" v-if="item1.past_3_stats.home.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.home.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.home.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_3_stats.away.tooltip + '1'" :target="item1.past_3_stats.away.tooltip" v-if="item1.past_3_stats.away.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.away.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.away.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_3_stats.draw.tooltip + '1'" :target="item1.past_3_stats.draw.tooltip" v-if="item1.past_3_stats.draw.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.draw.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.draw.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_3_stats.O_15.tooltip + '1'" :target="item1.past_3_stats.O_15.tooltip" v-if="item1.past_3_stats.O_15.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.O_15.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.O_15.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_3_stats.O_25.tooltip + '1'" :target="item1.past_3_stats.O_25.tooltip" v-if="item1.past_3_stats.O_25.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.O_25.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.O_25.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_3_stats.O_35.tooltip + '1'" :target="item1.past_3_stats.O_35.tooltip" v-if="item1.past_3_stats.O_35.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.O_35.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.O_35.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_3_stats.bts.tooltip + '1'" :target="item1.past_3_stats.bts.tooltip" v-if="item1.past_3_stats.bts.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_3_stats.bts.odd}}</span><br>
                                    <span>Stat: {{item1.past_3_stats.bts.value}}%</span>
                                </b-tooltip>
                            </div>
                        </div>

                        <div v-if="index % 2 == 0" class="event-content" style="display: flex; background: #faf9fa;">
                            <div style="flex: 6; color: #faf9fa">.</div>
                            <div style="flex: 6; display: flex; text-align: center">
                                <div style="flex: 2; text-align: left">10 year</div>
                                <div :key="item1.past_10_stats.home.tooltip"  :id="item1.past_10_stats.home.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.home.color, 'background': item1.past_10_stats.home.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.home.percent}}</span>
                                </div>
                                <div :key="item1.past_10_stats.draw.tooltip"  :id="item1.past_10_stats.draw.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.draw.color, 'background': item1.past_10_stats.draw.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.draw.percent}}</span>
                                </div>
                                <div :key="item1.past_10_stats.away.tooltip"  :id="item1.past_10_stats.away.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.away.color, 'background': item1.past_10_stats.away.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.away.percent}}</span>
                                </div>
                                <div :key="item1.past_10_stats.bts.tooltip"  :id="item1.past_10_stats.bts.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.bts.color, 'background': item1.past_10_stats.bts.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.bts.percent}}</span>
                                </div>
                                <div :key="item1.past_10_stats.O_15.tooltip"  :id="item1.past_10_stats.O_15.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.O_15.color, 'background': item1.past_10_stats.O_15.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.O_15.percent}}</span>
                                </div>
                                <div :key="item1.past_10_stats.O_25.tooltip"  :id="item1.past_10_stats.O_25.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.O_25.color, 'background': item1.past_10_stats.O_25.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.O_25.percent}}</span>
                                </div>
                                <div :key="item1.past_10_stats.O_35.tooltip"  :id="item1.past_10_stats.O_35.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.O_35.color, 'background': item1.past_10_stats.O_35.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.O_35.percent}}</span>
                                </div>
                                <b-tooltip :key="item1.past_10_stats.home.tooltip + '1'" :target="item1.past_10_stats.home.tooltip" v-if="item1.past_10_stats.home.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.home.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.home.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_10_stats.away.tooltip + '1'" :target="item1.past_10_stats.away.tooltip" v-if="item1.past_10_stats.away.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.away.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.away.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_10_stats.draw.tooltip + '1'" :target="item1.past_10_stats.draw.tooltip" v-if="item1.past_10_stats.draw.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.draw.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.draw.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_10_stats.O_15.tooltip + '1'" :target="item1.past_10_stats.O_15.tooltip" v-if="item1.past_10_stats.O_15.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.O_15.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.O_15.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_10_stats.O_25.tooltip + '1'" :target="item1.past_10_stats.O_25.tooltip" v-if="item1.past_10_stats.O_25.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.O_25.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.O_25.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_10_stats.O_35.tooltip + '1'" :target="item1.past_10_stats.O_35.tooltip" v-if="item1.past_10_stats.O_35.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.O_35.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.O_35.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_10_stats.bts.tooltip + '1'" :target="item1.past_10_stats.bts.tooltip" v-if="item1.past_10_stats.bts.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.bts.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.bts.value}}%</span>
                                </b-tooltip>
                            </div>
                        </div>
                        <div v-else class="event-content" style="display: flex; background: white;">
                            <div style="flex: 6; color: white;">.</div>
                            <div style="flex: 6; display: flex; text-align: center">
                                <div style="flex: 2; text-align: left">10 year</div>
                                <div :key="item1.past_10_stats.home.tooltip"  :id="item1.past_10_stats.home.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.home.color, 'background': item1.past_10_stats.home.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.home.percent}}</span>
                                </div>
                                <div :key="item1.past_10_stats.draw.tooltip"  :id="item1.past_10_stats.draw.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.draw.color, 'background': item1.past_10_stats.draw.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.draw.percent}}</span>
                                </div>
                                <div :key="item1.past_10_stats.away.tooltip"  :id="item1.past_10_stats.away.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.away.color, 'background': item1.past_10_stats.away.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.away.percent}}</span>
                                </div>
                                <div :key="item1.past_10_stats.bts.tooltip"  :id="item1.past_10_stats.bts.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.bts.color, 'background': item1.past_10_stats.bts.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.bts.percent}}</span>
                                </div>
                                <div :key="item1.past_10_stats.O_15.tooltip"  :id="item1.past_10_stats.O_15.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.O_15.color, 'background': item1.past_10_stats.O_15.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.O_15.percent}}</span>
                                </div>
                                <div :key="item1.past_10_stats.O_25.tooltip"  :id="item1.past_10_stats.O_25.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.O_25.color, 'background': item1.past_10_stats.O_25.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.O_25.percent}}</span>
                                </div>
                                <div :key="item1.past_10_stats.O_35.tooltip"  :id="item1.past_10_stats.O_35.tooltip" style="flex: 1;">
                                    <span :style="{'font-weight': 500, 'color': item1.past_10_stats.O_35.color, 'background': item1.past_10_stats.O_35.background, 'padding': '0px 6px', 'border-radius': '6px'}">{{item1.past_10_stats.O_35.percent}}</span>
                                </div>
                                <b-tooltip :key="item1.past_10_stats.home.tooltip + '1'" :target="item1.past_10_stats.home.tooltip" v-if="item1.past_10_stats.home.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.home.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.home.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_10_stats.away.tooltip + '1'" :target="item1.past_10_stats.away.tooltip" v-if="item1.past_10_stats.away.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.away.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.away.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_10_stats.draw.tooltip + '1'" :target="item1.past_10_stats.draw.tooltip" v-if="item1.past_10_stats.draw.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.draw.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.draw.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_10_stats.O_15.tooltip + '1'" :target="item1.past_10_stats.O_15.tooltip" v-if="item1.past_10_stats.O_15.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.O_15.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.O_15.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_10_stats.O_25.tooltip + '1'" :target="item1.past_10_stats.O_25.tooltip" v-if="item1.past_10_stats.O_25.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.O_25.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.O_25.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_10_stats.O_35.tooltip + '1'" :target="item1.past_10_stats.O_35.tooltip" v-if="item1.past_10_stats.O_35.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.O_35.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.O_35.value}}%</span>
                                </b-tooltip>
                                <b-tooltip :key="item1.past_10_stats.bts.tooltip + '1'" :target="item1.past_10_stats.bts.tooltip" v-if="item1.past_10_stats.bts.odd != '-'" triggers="hover">
                                    <span>True Odd: {{item1.past_10_stats.bts.odd}}</span><br>
                                    <span>Stat: {{item1.past_10_stats.bts.value}}%</span>
                                </b-tooltip>
                            </div>
                        </div>
                        

                        <div v-if="index % 2 == 0" class="event-content" style="display: flex; background: #faf9fa;">
                            <div style="flex: 6; color: #faf9fa">.</div>
                            <div style="flex: 6; display: flex; text-align: center;">
                                <div style="flex: 2;">Bet365 odds</div>
                                <div style="flex: 1;"><a  style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_1}}</a></div>
                                <div style="flex: 1;"><a style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_2}}</a></div>
                                <div style="flex: 1;"><a style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_3}}</a></div>
                                <div style="flex: 1;"><a style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_BS}}</a></div>
                                <div style="flex: 1;"><a style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_O15}}</a></div>
                                <div style="flex: 1;"><a style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_O25}}</a></div>
                                <div style="flex: 1;"><a style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_O35}}</a></div>
                            </div>
                        </div>
                        <div v-else class="event-content" style="display: flex; background: white;">
                            <div style="flex: 6; color: white;">.</div>
                            <div style="flex: 6; display: flex; text-align: center;">
                                <div style="flex: 2;">Bet365 odds</div>
                                <div style="flex: 1;"><a  style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_1}}</a></div>
                                <div style="flex: 1;"><a style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_2}}</a></div>
                                <div style="flex: 1;"><a style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_3}}</a></div>
                                <div style="flex: 1;"><a style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_BS}}</a></div>
                                <div style="flex: 1;"><a style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_O15}}</a></div>
                                <div style="flex: 1;"><a style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_O25}}</a></div>
                                <div style="flex: 1;"><a style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.flatodds.match_O35}}</a></div>
                            </div>
                        </div>

                        <div v-if="index % 2 == 0" class="event-content" style="display: flex; background: #faf9fa;">
                            <div style="flex: 6; color: #faf9fa">.</div>
                            <div style="flex: 6; display: flex; text-align: center;">
                                <div style="flex: 2;">Betfair price</div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_1_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_1}}</a></div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_2_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_2}}</a></div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_3_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_3}}</a></div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_BS_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_BS}}</a></div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_O15_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_O15}}</a></div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_O25_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_O25}}</a></div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_O35_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_O35}}</a></div>
                            </div>
                        </div>
                        <div v-else class="event-content" style="display: flex; background: white;">
                            <div style="flex: 6; color: white;">.</div>
                            <div style="flex: 6; display: flex; text-align: center;">
                                <div style="flex: 2;">Betfair price</div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_1_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_1}}</a></div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_2_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_2}}</a></div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_3_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_3}}</a></div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_BS_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_BS}}</a></div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_O15_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_O15}}</a></div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_O25_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_O25}}</a></div>
                                <div style="flex: 1;"><a target="_blank" :href="item1.odds.match_O35_link" style="background: lightgray; padding: 1px 10px; border-radius: 5px; color: black; font-weight: 600;">{{item1.odds.match_O35}}</a></div>
                            </div>
                        </div>
                    </div>
                </CCollapse>
            </div>
        </CCard>
    </div>
</template>
<script>
    export default {
        name: 'ColdStats2',
        components: {
        },
        data () {
            return {
                filter_key: 1,
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
            filter_selector(val){
                if(val == 1){
                    let eventsList = []
                    for(let i = 0 ; i < this.mainList.length ; i++){
                        let item = this.mainList[i]
                        for(let j = 0 ; j < item.events.length ; j++){
                            let c = {
                               "country": item.country,
                                "league1": item.league1,
                                "clubs": item.clubs,
                                "numbers": item.numbers,
                                "percentage": item.percentage,
                                "past_10_stats": item.events[j].past_10_stats,
                                "past_3_stats": item.events[j].past_3_stats,
                                "c_stats": item.events[j].c_stats,
                                "past10_year_stats": item.events[j].past10_year_stats,
                                "past3_year_stats": item.events[j].past3_year_stats,
                                "stats": item.events[j].stats,
                                "odds": item.events[j].odds,
                                "flatodds": item.events[j].flatodds,
                                "show": item.events[j].show,
                                "spots": item.events[j].spots,
                                "homeLineupList": item.events[j].homeLineupList,
                                "awayLineupList": item.events[j].awayLineupList,
                                "rank_option": item.events[j].rank_option,
                                "rank_set": item.events[j].rank_set,
                                "rankFilter": item.events[j].rankFilter,
                                "b_data": item.events[j].b_data,
                                "eventtime": item.events[j].eventtime,
                                "eventName": item.events[j].eventName,
                                "home_id": item.events[j].home_id,
                                "away_id": item.events[j].away_id,
                                "openDate": item.events[j].openDate,
                                "home": item.events[j].home,
                                "away": item.events[j].away,
                                "homeDateList": item.events[j].homeDateList,
                                "awayDateList": item.events[j].awayDateList,  
                            }
                            eventsList.push(c)
                        }
                    }
                    let competitionList = eventsList.map(x=>x.league1)
                    competitionList = Array.from(new Set (competitionList))
                    // console.log('competition array=>', competitionList)
                    this.mainList = []
                    for(let i = 0 ; i < competitionList.length ; i++){
                        this.mainList.push({"league1": competitionList[i], "country": null, "numbers": null, "percentage": null, "events": []})
                        for(let j = 0 ; j < eventsList.length; j++){
                            if(competitionList[i] == eventsList[j].league1){
                                this.mainList[i].country = eventsList[j].country
                                this.mainList[i].numbers = eventsList[j].numbers
                                this.mainList[i].percentage = eventsList[j].percentage
                                this.mainList[i].clubs = eventsList[j].clubs
                                let c = {
                                    "past_10_stats": eventsList[j].past_10_stats,
                                    "past_3_stats": eventsList[j].past_3_stats,
                                    "c_stats": eventsList[j].c_stats,
                                    "past10_year_stats": eventsList[j].past10_year_stats,
                                    "past3_year_stats": eventsList[j].past3_year_stats,
                                    "stats": eventsList[j].stats,
                                    "odds": eventsList[j].odds,
                                    "flatodds": eventsList[j].flatodds,
                                    "show": eventsList[j].show,
                                    "spots": eventsList[j].spots,
                                    "homeLineupList":eventsList[j].homeLineupList,
                                    "awayLineupList": eventsList[j].awayLineupList,
                                    "rank_option": eventsList[j].rank_option,
                                    "rank_set": eventsList[j].rank_set,
                                    "rankFilter": eventsList[j].rankFilter,
                                    "b_data": eventsList[j].b_data,
                                    "eventtime": eventsList[j].eventtime,
                                    "eventName": eventsList[j].eventName,
                                    "home_id": eventsList[j].home_id,
                                    "away_id": eventsList[j].away_id,
                                    "openDate": eventsList[j].openDate,
                                    "home": eventsList[j].home,
                                    "away": eventsList[j].away,
                                    "homeDateList": eventsList[j].homeDateList,
                                    "awayDateList": eventsList[j].awayDateList,  
                                }
                                this.mainList[i].events.push(c)
                            }
                        }
                    }
                    let self = this
                    this.sortJSON(self.mainList,'country', '123');
                    // console.log('main_list===>', this.mainList)
                }
                else{
                    let eventsList = []
                    for(let i = 0 ; i < this.mainList.length ; i++){
                        let item = this.mainList[i]
                        for(let j = 0 ; j < item.events.length ; j++){
                            let c = {
                                "country": item.country,
                                "league1": item.league1,
                                "clubs": item.clubs,
                                "numbers": item.numbers,
                                "percentage": item.percentage,
                                "past_10_stats": item.events[j].past_10_stats,
                                "past_3_stats": item.events[j].past_3_stats,
                                "c_stats": item.events[j].c_stats,
                                "past10_year_stats": item.events[j].past10_year_stats,
                                "past3_year_stats": item.events[j].past3_year_stats,
                                "stats": item.events[j].stats,
                                "odds": item.events[j].odds,
                                "flatodds": item.events[j].flatodds,
                                "show": item.events[j].show,
                                "spots": item.events[j].spots,
                                "homeLineupList": item.events[j].homeLineupList,
                                "awayLineupList": item.events[j].awayLineupList,
                                "rank_option": item.events[j].rank_option,
                                "rank_set": item.events[j].rank_set,
                                "rankFilter": item.events[j].rankFilter,
                                "b_data": item.events[j].b_data,
                                "eventtime": item.events[j].eventtime,
                                "eventName": item.events[j].eventName,
                                "home_id": item.events[j].home_id,
                                "away_id": item.events[j].away_id,
                                "openDate": item.events[j].openDate,
                                "home": item.events[j].home,
                                "away": item.events[j].away,
                                "homeDateList": item.events[j].homeDateList,
                                "awayDateList": item.events[j].awayDateList,                                
                            }
                            eventsList.push(c)
                        }
                    }
                    // console.log('events_list==>', eventsList)
                    this.mainList = []
                    this.sortJSON(eventsList,'openDate', '123');
                    let p = 0
                    for(let i = 0 ; i < eventsList.length - 1 ; i++){
                        let league1 = eventsList[i].league1
                        let league2 = eventsList[i + 1].league1

                        let events1 = {
                            "past_10_stats": eventsList[i].past_10_stats,
                            "past_3_stats": eventsList[i].past_3_stats,
                            "c_stats": eventsList[i].c_stats,
                            "past10_year_stats": eventsList[i].past10_year_stats,
                            "past3_year_stats": eventsList[i].past3_year_stats,
                            "stats": eventsList[i].stats,
                            "odds": eventsList[i].odds,
                            "flatodds": eventsList[i].flatodds,
                            "show": eventsList[i].show,
                            "spots": eventsList[i].spots,
                            "homeLineupList":eventsList[i].homeLineupList,
                            "awayLineupList": eventsList[i].awayLineupList,
                            "rank_option": eventsList[i].rank_option,
                            "rank_set": eventsList[i].rank_set,
                            "rankFilter": eventsList[i].rankFilter,
                            "b_data": eventsList[i].b_data,
                            "eventtime": eventsList[i].eventtime,
                            "eventName": eventsList[i].eventName,
                            "home_id": eventsList[i].home_id,
                            "away_id": eventsList[i].away_id,
                            "openDate": eventsList[i].openDate,
                            "home": eventsList[i].home,
                            "away": eventsList[i].away,
                            "homeDateList": eventsList[i].homeDateList,
                            "awayDateList": eventsList[i].awayDateList,   
                        }
                        let events2 = {
                            "past_10_stats": eventsList[i+1].past_10_stats,
                            "past_3_stats": eventsList[i+1].past_3_stats,
                            "c_stats": eventsList[i+1].c_stats,
                            "past10_year_stats": eventsList[i+1].past10_year_stats,
                            "past3_year_stats": eventsList[i+1].past3_year_stats,
                            "stats": eventsList[i+1].stats,
                            "odds": eventsList[i+1].odds,
                            "flatodds": eventsList[i+1].flatodds,
                            "show": eventsList[i+1].show,
                            "spots": eventsList[i+1].spots,
                            "homeLineupList":eventsList[i+1].homeLineupList,
                            "awayLineupList": eventsList[i+1].awayLineupList,
                            "rank_option": eventsList[i+1].rank_option,
                            "rank_set": eventsList[i+1].rank_set,
                            "rankFilter": eventsList[i+1].rankFilter,
                            "b_data": eventsList[i+1].b_data,
                            "eventtime": eventsList[i+1].eventtime,
                            "eventName": eventsList[i+1].eventName,
                            "home_id": eventsList[i+1].home_id,
                            "away_id": eventsList[i+1].away_id,
                            "openDate": eventsList[i+1].openDate,
                            "home": eventsList[i+1].home,
                            "away": eventsList[i+1].away,
                            "homeDateList": eventsList[i+1].homeDateList,
                            "awayDateList": eventsList[i+1].awayDateList,   
                        }
                        if(i === 0){
                            p++
                            this.mainList.push({"league1": league1,"league": league1, "country": eventsList[i].country, "numbers": eventsList[i].numbers, "percentage": eventsList[i].percentage, "clubs": eventsList[i].clubs, "events": [events1]})
                        }
                        if(league1 == league2){
                            this.mainList[p - 1].events.push(events2)
                        }
                        else{
                            p++
                            this.mainList.push({"league1": league2, "league": league2, "country": eventsList[i + 1].country, "numbers": eventsList[i+1].numbers, "percentage": eventsList[i+1].percentage, "clubs": eventsList[i+1].clubs, "events": [events2]})
                        }
                    }
                    // console.log('====>', this.mainList)
                }
            },
            date_select(val){
                this.filter_key = 1
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
                window.axios.post(`${process.env.VUE_APP_URL}cold_stats2`, [c_date, user_id, this.current_page]).then(({data})=> {
                    // console.log('data******', data.data[2])
                    // console.log('data1******', data.data[1])
                    // console.log('data_date_fixture===>', data.data[3])
                    // console.log('events Length===>', data.data[4])
                    // console.log('season stats data===>', data.data[5])
                    // console.log('past 3 seasons stats data===>', data.data[6])
                    // console.log('past 10 seasons stats data===>', data.data[7])
                    let season_stats = data.data[5]
                    let past3_season_stats =  data.data[6]
                    let past10_season_stats =  data.data[7]
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
                    console.log('pages===>', this.pages)
                    let date_list = data.data[3].slice(0,2)
                    this.standingList = data.data[1]
                    let main_data = data.data[2]
                    // console.log("standings===>", this.standingList)
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
                                    }
                                    let away = {
                                        p:0,
                                        name:'',
                                        rank:'' ,
                                    }
                                    let localTeamId = main_data[j].localTeamId
                                    let visitorTeamId = main_data[j].visitorTeamId
                                    if(main_data[j].season_percentage){
                                        percentage = main_data[j].season_percentage
                                    }

                                    if(main_data[j].played_numbers){
                                        numbers = main_data[j].played_numbers
                                        clubs = parseInt(numbers/main_data[j].number_of_clubs)
                                    }
                                    else{
                                        numbers = 0
                                    }

                                    let current_main_data = {
                                        "Odds": main_data[j].Odds,
                                        "marketId_matched": null,
                                        "marketId_o_u": null,
                                        "match_1": null,
                                        "match_2": null,
                                        "match_3": null,
                                        "match_O15": null,
                                        "match_O25": null,
                                        "match_O35": null,
                                        "match_BS": null,
                                        "match_1_link": null,
                                        "match_2_link": null,
                                        "match_3_link": null,
                                        "match_O15_link": null,
                                        "match_O25_link": null,
                                        "match_O35_link": null,
                                        "match_BS_link": null,
                                    }
                                    let current_flatOdds = {
                                        "Odds": main_data[j].DailyFixtures, 
                                        "match_1": null,
                                        "match_2": null,
                                        "match_3": null,
                                        "match_O15": null,
                                        "match_O25": null,
                                        "match_O35": null,
                                        "match_BS": null
                                       
                                    }
                                    let current_year_stats = {
                                        "home": '-',
                                        "away": '-',
                                        "draw": '-',
                                        "bts": '-',
                                        "O_15": '-',
                                        "O_25": '-',
                                        "O_35": '-'
                                    }
                                    let past3_year_stats = {
                                        "home": '-',
                                        "away": '-',
                                        "draw": '-',
                                        "bts": '-',
                                        "O_15": '-',
                                        "O_25": '-',
                                        "O_35": '-'
                                    }
                                    let past10_year_stats = {
                                        "home": '-',
                                        "away": '-',
                                        "draw": '-',
                                        "bts": '-',
                                        "O_15": '-',
                                        "O_25": '-',
                                        "O_35": '-'
                                    }
                                    if(main_data[j].current_stats){
                                        current_year_stats.home = main_data[j].current_stats.home
                                        current_year_stats.away = main_data[j].current_stats.away
                                        current_year_stats.draw = main_data[j].current_stats.draw
                                        current_year_stats.bts = main_data[j].current_stats.bts
                                        current_year_stats.O_15 = main_data[j].current_stats.O_15
                                        current_year_stats.O_25 = main_data[j].current_stats.O_25
                                        current_year_stats.O_35 = main_data[j].current_stats.O_35
                                    }
                                    if(main_data[j].past_3_years_stats){
                                        past3_year_stats.home = main_data[j].past_3_years_stats.home
                                        past3_year_stats.away = main_data[j].past_3_years_stats.away
                                        past3_year_stats.draw = main_data[j].past_3_years_stats.draw
                                        past3_year_stats.bts = main_data[j].past_3_years_stats.bts
                                        past3_year_stats.O_15 = main_data[j].past_3_years_stats.O_15
                                        past3_year_stats.O_25 = main_data[j].past_3_years_stats.O_25
                                        past3_year_stats.O_35 = main_data[j].past_3_years_stats.O_35
                                    }
                                    if(main_data[j].past_10_years_stats){
                                        past10_year_stats.home = main_data[j].past_10_years_stats.home
                                        past10_year_stats.away = main_data[j].past_10_years_stats.away
                                        past10_year_stats.draw = main_data[j].past_10_years_stats.draw
                                        past10_year_stats.bts = main_data[j].past_10_years_stats.bts
                                        past10_year_stats.O_15 = main_data[j].past_10_years_stats.O_15
                                        past10_year_stats.O_25 = main_data[j].past_10_years_stats.O_25
                                        past10_year_stats.O_35 = main_data[j].past_10_years_stats.O_35
                                    }
                                    
                                    if(current_main_data.Odds.length > 0){
                                        for(let b = 0 ; b < current_main_data.Odds.length; b++){
                                            if(current_main_data.Odds[b].marketTime.includes(main_data[j].time.starting_at.date) == true){
                                                if(current_main_data.Odds[b].marketType === "MATCH_ODDS"){
                                                    current_main_data.marketId_matched = current_main_data.Odds[b].marketId
                                                    current_main_data.match_1_link = "https://www.betfair.com/exchange/plus/football/market/" + current_main_data.Odds[b].marketId
                                                    current_main_data.match_2_link = "https://www.betfair.com/exchange/plus/football/market/" + current_main_data.Odds[b].marketId
                                                    current_main_data.match_3_link = "https://www.betfair.com/exchange/plus/football/market/" + current_main_data.Odds[b].marketId
                                                    if(current_main_data.Odds[b].runners){
                                                        if(current_main_data.Odds[b].runners[0]){
                                                            let runnerNode = current_main_data.Odds[b].runners[0]
                                                            if(runnerNode.exchange){
                                                                if(runnerNode.exchange.availableToBack){
                                                                    if(runnerNode.exchange.availableToBack[0]){
                                                                        current_main_data.match_1 = runnerNode.exchange.availableToBack[0].price
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if(current_main_data.Odds[b].runners[1]){
                                                            let runnerNode1 = current_main_data.Odds[b].runners[2]
                                                            if(runnerNode1.exchange){
                                                                if(runnerNode1.exchange.availableToBack){
                                                                    if(runnerNode1.exchange.availableToBack[0]){
                                                                        current_main_data.match_2 = runnerNode1.exchange.availableToBack[0].price
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if(current_main_data.Odds[b].runners[2]){
                                                            let runnerNode2 = current_main_data.Odds[b].runners[1]
                                                            if(runnerNode2.exchange){
                                                                if(runnerNode2.exchange.availableToBack){
                                                                    if(runnerNode2.exchange.availableToBack[0]){
                                                                        current_main_data.match_3 = runnerNode2.exchange.availableToBack[0].price
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else if(current_main_data.Odds[b].marketType === "OVER_UNDER_15"){
                                                    current_main_data.marketId_o_u = current_main_data.Odds[b].marketId
                                                    current_main_data.match_O15_link = "https://www.betfair.com/exchange/plus/football/market/" + current_main_data.Odds[b].marketId
                                                    if(current_main_data.Odds[b].runners){
                                                        if(current_main_data.Odds[b].runners[1]){
                                                            let runnerNode = current_main_data.Odds[b].runners[1]
                                                            if(runnerNode.exchange){
                                                                if(runnerNode.exchange.availableToBack){
                                                                    if(runnerNode.exchange.availableToBack[0]){
                                                                        current_main_data.match_O15 = runnerNode.exchange.availableToBack[0].price
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else if(current_main_data.Odds[b].marketType === "OVER_UNDER_25"){
                                                    current_main_data.marketId_o_u = current_main_data.Odds[b].marketId
                                                    current_main_data.match_O25_link = "https://www.betfair.com/exchange/plus/football/market/" + current_main_data.Odds[b].marketId
                                                    if(current_main_data.Odds[b].runners){
                                                        if(current_main_data.Odds[b].runners[1]){
                                                            let runnerNode = current_main_data.Odds[b].runners[1]
                                                            if(runnerNode.exchange){
                                                                if(runnerNode.exchange.availableToBack){
                                                                    if(runnerNode.exchange.availableToBack[0]){
                                                                        current_main_data.match_O25 = runnerNode.exchange.availableToBack[0].price
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else if(current_main_data.Odds[b].marketType === "OVER_UNDER_35"){
                                                    current_main_data.marketId_o_u = current_main_data.Odds[b].marketId
                                                    current_main_data.match_O35_link = "https://www.betfair.com/exchange/plus/football/market/" + current_main_data.Odds[b].marketId
                                                    if(current_main_data.Odds[b].runners){
                                                        if(current_main_data.Odds[b].runners[1]){
                                                            let runnerNode = current_main_data.Odds[b].runners[1]
                                                            if(runnerNode.exchange){
                                                                if(runnerNode.exchange.availableToBack){
                                                                    if(runnerNode.exchange.availableToBack[0]){
                                                                        current_main_data.match_O35 = runnerNode.exchange.availableToBack[0].price
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else if(current_main_data.Odds[b].marketType === "BOTH_TEAMS_TO_SCORE"){
                                                    current_main_data.marketId_cs = current_main_data.Odds[b].marketId
                                                    current_main_data.match_BS_link = "https://www.betfair.com/exchange/plus/football/market/" + current_main_data.Odds[b].marketId
                                                    if(current_main_data.Odds[b].runners){
                                                        if(current_main_data.Odds[b].runners[0]){
                                                            let runnerNode = current_main_data.Odds[b].runners[0]
                                                            if(runnerNode.exchange){
                                                                if(runnerNode.exchange.availableToBack){
                                                                    if(runnerNode.exchange.availableToBack[0]){
                                                                        current_main_data.match_BS = runnerNode.exchange.availableToBack[0].price
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if(main_data[j].DailyFixtures.length > 0){
                                        var current_fixture = main_data[j].DailyFixtures[0]
                                        if (current_fixture.flatOdds) {
                                            current_fixture.flatOdds.data.forEach((oItem) => {
                                                let mkt_id = oItem.market_id;
                                                if(oItem.bookmaker_id === 2) {
                                                    let suffix;
                                                    if(mkt_id === 1 || mkt_id === 12 || mkt_id === 976105  || mkt_id === 136703813 || mkt_id === 137918022 || mkt_id === 28077) 
                                                        suffix = 'FT';
                                                    else if(mkt_id === 37 || mkt_id === 31379 || mkt_id === 975903 || mkt_id === 976226)
                                                        suffix = 'HT';
                                                    (oItem.odds || oItem.values).forEach((item) => {
                                                        let label;
                                                        if(item.label)
                                                            label = `${item.label}${item.total ? ' - ' + item.total : ''}`;
                                                        else if(item.team)
                                                            label = item.team;
                                                        else if(item.info) {
                                                            label = item.info;
                                                        }
                                                        if(label === 'Yes')
                                                            label = 'BTS';
                                                        else if(label === 'No')
                                                            label = 'No BTS';
                                                        if(label === '1')
                                                            label = "Home";
                                                        else if(label === '2')
                                                            label = 'Away';
                                                        else if(label === 'X')
                                                            label = 'Draw';
                                                        if(!label.includes(",")) {              //except over 2.0,2.5 case
                                                            label = `${label} - ${suffix}`
                                                            if(label == 'Home - FT') {
                                                                current_flatOdds.match_1 = parseFloat(item.value)
                                                                
                                                            }
                                                            else if(label == 'Away - FT') {
                                                                current_flatOdds.match_3 = parseFloat(item.value)
                                                                
                                                            }
                                                            else if(label == 'Draw - FT') {
                                                                current_flatOdds.match_2 = parseFloat(item.value)
                                                                
                                                            }

                                                            
                                                            else if(label == "Over - 1.5 - FT")
                                                                current_flatOdds.match_O15 = parseFloat(item.value)
                                                            else if(label == "Over - 2.5 - FT")
                                                                current_flatOdds.match_O25 = parseFloat(item.value)
                                                            else if(label == "Over - 3.5 - FT")
                                                                current_flatOdds.match_O35 = parseFloat(item.value)

                                                            else if(label == "BTS - FT")
                                                                current_flatOdds.match_BS = parseFloat(item.value)         
                                                        }                                                       
                                                    });
                                                }
                                            });
                                        }
                                    }
                                    let current_stats_data = {
                                        "home": {'value': current_year_stats.home, 'odd': '-','percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "away": {'value': current_year_stats.away, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "draw": {'value': current_year_stats.draw, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "bts": {'value': current_year_stats.bts, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "O_15": {'value': current_year_stats.O_15, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "O_25": {'value': current_year_stats.O_25, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "O_35": {'value': current_year_stats.O_35, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()}
                                    }
                                    let past_3_years_data = {
                                        "home": {'value': past3_year_stats.home, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "away": {'value': past3_year_stats.away, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "draw": {'value': past3_year_stats.draw, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "bts": {'value': past3_year_stats.bts, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "O_15": {'value': past3_year_stats.O_15, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "O_25": {'value': past3_year_stats.O_25, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "O_35": {'value': past3_year_stats.O_35, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()}
                                    }
                                    let past_10_years_data = {
                                        "home": {'value': past10_year_stats.home, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "away": {'value': past10_year_stats.away, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "draw": {'value': past10_year_stats.draw, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "bts": {'value': past10_year_stats.bts, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "O_15": {'value': past10_year_stats.O_15, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "O_25": {'value': past10_year_stats.O_25, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()},
                                        "O_35": {'value': past10_year_stats.O_35, 'odd': '-', 'percent': '-', 'color': 'black', 'background': 'white', 'tooltip': this.create_UUID()}
                                    }

                                    if(current_flatOdds.match_1 != null){
                                        current_flatOdds.match_1 = current_flatOdds.match_1.toFixed(2)
                                        if(parseInt(current_year_stats.home) > 0){
                                            current_stats_data.home.odd = (100/parseInt(current_year_stats.home)).toFixed(2)
                                            if(parseFloat(current_stats_data.home.odd) == parseFloat(current_flatOdds.match_1)){
                                                current_stats_data.home.percent = (100 - (parseFloat(current_stats_data.home.odd) - 1)*100/(parseFloat(current_flatOdds.match_1) - 1)).toFixed(0)
                                            }
                                            else{
                                                current_stats_data.home.percent = ((parseFloat(current_flatOdds.match_1) - 1)*100/(parseFloat(current_stats_data.home.odd) - 1) - 100).toFixed(0)
                                            }
                                            if(parseFloat(current_stats_data.home.percent) > 10){
                                                current_stats_data.home.background = 'green'
                                            }
                                            else if(parseFloat(current_stats_data.home.percent) < -10){
                                                current_stats_data.home.background = 'red'
                                            }
                                            else{
                                                current_stats_data.home.background = 'yellow'
                                            }
                                            if(parseFloat(current_stats_data.home.percent) > 0){
                                                current_stats_data.home.percent = '+ ' + current_stats_data.home.percent + ' %'
                                            }
                                            else if(parseFloat(current_stats_data.home.percent) < 0){
                                                current_stats_data.home.percent = '- ' + current_stats_data.home.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                current_stats_data.home.percent = current_stats_data.home.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past3_year_stats.home) > 0){
                                            past_3_years_data.home.odd = (100/parseInt(past3_year_stats.home)).toFixed(2)
                                            if(parseFloat(past_3_years_data.home.odd) == parseFloat(current_flatOdds.match_1)){
                                                past_3_years_data.home.percent = (100 - (parseFloat(past_3_years_data.home.odd) - 1)*100/(parseFloat(current_flatOdds.match_1) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_3_years_data.home.percent = ((parseFloat(current_flatOdds.match_1) - 1)*100/(parseFloat(past_3_years_data.home.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_3_years_data.home.percent) > 10){
                                                past_3_years_data.home.background = 'green'
                                            }
                                            else if(parseFloat(past_3_years_data.home.percent) < -10){
                                                past_3_years_data.home.background = 'red'
                                            }
                                            else{
                                                past_3_years_data.home.background = 'yellow'
                                            }
                                            if(parseFloat(past_3_years_data.home.percent) > 0){
                                                past_3_years_data.home.percent = '+ ' + past_3_years_data.home.percent + ' %'
                                            }
                                            else if(parseFloat(past_3_years_data.home.percent) < 0){
                                                past_3_years_data.home.percent = '- ' + past_3_years_data.home.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_3_years_data.home.percent = past_3_years_data.home.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past10_year_stats.home) > 0){
                                            past_10_years_data.home.odd = (100/parseInt(past10_year_stats.home)).toFixed(2)
                                            if(parseFloat(past_10_years_data.home.odd) == parseFloat(current_flatOdds.match_1)){
                                                past_10_years_data.home.percent = (100 - (parseFloat(past_10_years_data.home.odd) - 1)*100/(parseFloat(current_flatOdds.match_1) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_10_years_data.home.percent = ((parseFloat(current_flatOdds.match_1) - 1)*100/(parseFloat(past_10_years_data.home.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_10_years_data.home.percent) > 10){
                                                past_10_years_data.home.background = 'green'
                                            }
                                            else if(parseFloat(past_10_years_data.home.percent) < -10){
                                                past_10_years_data.home.background = 'red'
                                            }
                                            else{
                                                past_10_years_data.home.background = 'yellow'
                                            }
                                            if(parseFloat(past_10_years_data.home.percent) > 0){
                                                past_10_years_data.home.percent = '+ ' + past_10_years_data.home.percent + ' %'
                                            }
                                            else if(parseFloat(past_10_years_data.home.percent) < 0){
                                                past_10_years_data.home.percent = '- ' + past_10_years_data.home.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_10_years_data.home.percent = past_10_years_data.home.percent + ' %'
                                            }
                                        }
                                    }
                                    if(current_flatOdds.match_3 != null){
                                        current_flatOdds.match_3 = current_flatOdds.match_3.toFixed(2)
                                        if(parseInt(current_year_stats.away) > 0){
                                            current_stats_data.away.odd = (100/parseInt(current_year_stats.away)).toFixed(2)
                                            if(parseFloat(current_stats_data.away.odd) == parseFloat(current_flatOdds.match_3)){
                                                current_stats_data.away.percent = (100 - (parseFloat(current_stats_data.away.odd) - 1)*100/(parseFloat(current_flatOdds.match_3) - 1)).toFixed(0)
                                            }
                                            else{
                                                current_stats_data.away.percent = ((parseFloat(current_flatOdds.match_3) - 1)*100/(parseFloat(current_stats_data.away.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(current_stats_data.away.percent) > 10){
                                                current_stats_data.away.background = 'green'
                                            }
                                            else if(parseFloat(current_stats_data.away.percent) < -10){
                                                current_stats_data.away.background = 'red'
                                            }
                                            else{
                                                current_stats_data.away.background = 'yellow'
                                            }
                                            if(parseFloat(current_stats_data.away.percent) > 0){
                                                current_stats_data.away.percent = '+ ' + current_stats_data.away.percent + ' %'
                                            }
                                            else if(parseFloat(current_stats_data.away.percent) < 0){
                                                current_stats_data.away.percent = '- ' + current_stats_data.away.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                current_stats_data.away.percent = current_stats_data.away.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past3_year_stats.away) > 0){
                                            past_3_years_data.away.odd = (100/parseInt(past3_year_stats.away)).toFixed(2)
                                            if(parseFloat(past_3_years_data.away.odd) == parseFloat(current_flatOdds.match_3)){
                                                past_3_years_data.away.percent = (100 - (parseFloat(past_3_years_data.away.odd) - 1)*100/(parseFloat(current_flatOdds.match_3) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_3_years_data.away.percent = ((parseFloat(current_flatOdds.match_3) - 1)*100/(parseFloat(past_3_years_data.away.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_3_years_data.away.percent) > 10){
                                                past_3_years_data.away.background = 'green'
                                            }
                                            else if(parseFloat(past_3_years_data.away.percent) < -10){
                                                past_3_years_data.away.background = 'red'
                                            }
                                            else{
                                                past_3_years_data.away.background = 'yellow'
                                            }
                                            if(parseFloat(past_3_years_data.away.percent) > 0){
                                                past_3_years_data.away.percent = '+ ' + past_3_years_data.away.percent + ' %'
                                            }
                                            else if(parseFloat(past_3_years_data.away.percent) < 0){
                                                past_3_years_data.away.percent = '- ' + past_3_years_data.away.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_3_years_data.away.percent =  past_3_years_data.away.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past10_year_stats.away) > 0){
                                            past_10_years_data.away.odd = (100/parseInt(past10_year_stats.away)).toFixed(2)
                                            if(parseFloat(past_10_years_data.away.odd) == parseFloat(current_flatOdds.match_3)){
                                                past_10_years_data.away.percent = (100 - (parseFloat(past_10_years_data.away.odd) - 1)*100/(parseFloat(current_flatOdds.match_3) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_10_years_data.away.percent = ((parseFloat(current_flatOdds.match_3) - 1)*100/(parseFloat(past_10_years_data.away.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_10_years_data.away.percent) > 10){
                                                past_10_years_data.away.background = 'green'
                                            }
                                            else if(parseFloat(past_10_years_data.away.percent) < -10){
                                                past_10_years_data.away.background = 'red'
                                            }
                                            else{
                                                past_10_years_data.away.background = 'yellow'
                                            }
                                            if(parseFloat(past_10_years_data.away.percent) > 0){
                                                past_10_years_data.away.percent = '+ ' + past_10_years_data.away.percent + ' %'
                                            }
                                            else if(parseFloat(past_10_years_data.away.percent) < 0){
                                                past_10_years_data.away.percent = '- ' + past_10_years_data.away.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_10_years_data.away.percent = past_10_years_data.away.percent + ' %'
                                            }
                                        }
                                    }
                                    if(current_flatOdds.match_2 != null){
                                        current_flatOdds.match_2 = current_flatOdds.match_2.toFixed(2)
                                        if(parseInt(current_year_stats.draw) > 0){
                                            current_stats_data.draw.odd = (100/parseInt(current_year_stats.draw)).toFixed(2)
                                            if(parseFloat(current_stats_data.draw.odd) == parseFloat(current_flatOdds.match_2)){
                                                current_stats_data.draw.percent = (100 - (parseFloat(current_stats_data.draw.odd) - 1)*100/(parseFloat(current_flatOdds.match_2) - 1)).toFixed(0)
                                            }
                                            else{
                                                current_stats_data.draw.percent = ((parseFloat(current_flatOdds.match_2) - 1)*100/(parseFloat(current_stats_data.draw.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(current_stats_data.draw.percent) > 10){
                                                current_stats_data.draw.background = 'green'
                                            }
                                            else if(parseFloat(current_stats_data.draw.percent) < -10){
                                                current_stats_data.draw.background = 'red'
                                            }
                                            else{
                                                current_stats_data.draw.background = 'yellow'
                                            }
                                            if(current_stats_data.draw.percent > 0){
                                                current_stats_data.draw.percent = '+ ' + current_stats_data.draw.percent + ' %'
                                            }
                                            else if(current_stats_data.draw.percent < 0){
                                                current_stats_data.draw.percent = '- ' + current_stats_data.draw.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                current_stats_data.draw.percent = current_stats_data.draw.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past3_year_stats.draw) > 0){
                                            past_3_years_data.draw.odd = (100/parseInt(past3_year_stats.draw)).toFixed(2)
                                            if(parseFloat(past_3_years_data.draw.odd) == parseFloat(current_flatOdds.match_2)){
                                                past_3_years_data.draw.percent = (100 - (parseFloat(past_3_years_data.draw.odd) - 1)*100/(parseFloat(current_flatOdds.match_2) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_3_years_data.draw.percent = ((parseFloat(current_flatOdds.match_2) - 1)*100/(parseFloat(past_3_years_data.draw.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_3_years_data.draw.percent) > 10){
                                                past_3_years_data.draw.background = 'green'
                                            }
                                            else if(parseFloat(past_3_years_data.draw.percent) < -10){
                                                past_3_years_data.draw.background = 'red'
                                            }
                                            else{
                                                past_3_years_data.draw.background = 'yellow'
                                            }
                                            if(past_3_years_data.draw.percent > 0){
                                                past_3_years_data.draw.percent = '+ ' + past_3_years_data.draw.percent + ' %'
                                            }
                                            else if(past_3_years_data.draw.percent < 0){
                                                past_3_years_data.draw.percent = '- ' + past_3_years_data.draw.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_3_years_data.draw.percent = past_3_years_data.draw.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past10_year_stats.draw) > 0){
                                            past_10_years_data.draw.odd = (100/parseInt(past10_year_stats.draw)).toFixed(2)
                                            if(parseFloat(past_10_years_data.draw.odd) == parseFloat(current_flatOdds.match_2)){
                                                past_10_years_data.draw.percent = (100 - (parseFloat(past_10_years_data.draw.odd) - 1)*100/(parseFloat(current_flatOdds.match_2) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_10_years_data.draw.percent = ((parseFloat(current_flatOdds.match_2) - 1)*100/(parseFloat(past_10_years_data.draw.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_10_years_data.draw.percent) > 10){
                                                past_10_years_data.draw.background = 'green'
                                            }
                                            else if(parseFloat(past_10_years_data.draw.percent) < -10){
                                                past_10_years_data.draw.background = 'red'
                                            }
                                            else{
                                                past_10_years_data.draw.background = 'yellow'
                                            }
                                            if(past_10_years_data.draw.percent > 0){
                                                past_10_years_data.draw.percent = '+ ' + past_10_years_data.draw.percent + ' %'
                                            }
                                            else if(past_10_years_data.draw.percent < 0){
                                                past_10_years_data.draw.percent = '- ' + past_10_years_data.draw.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_10_years_data.draw.percent = past_10_years_data.draw.percent + ' %'
                                            }
                                        }
                                    }
                                    if(current_flatOdds.match_O15 != null){
                                        current_flatOdds.match_O15 = current_flatOdds.match_O15.toFixed(2)
                                        if(parseInt(current_year_stats.O_15) > 0){
                                            current_stats_data.O_15.odd = (100/parseInt(current_year_stats.O_15)).toFixed(2)
                                            if(parseFloat(current_stats_data.O_15.odd) == parseFloat(current_flatOdds.match_O15)){
                                                current_stats_data.O_15.percent = (100 - (parseFloat(current_stats_data.O_15.odd) - 1)*100/(parseFloat(current_flatOdds.match_O15) - 1)).toFixed(0)
                                            }
                                            else{
                                                current_stats_data.O_15.percent = ((parseFloat(current_flatOdds.match_O15) - 1)*100/(parseFloat(current_stats_data.O_15.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(current_stats_data.O_15.percent) > 10){
                                                current_stats_data.O_15.background = 'green'
                                            }
                                            else if(parseFloat(current_stats_data.O_15.percent) < -10){
                                                current_stats_data.O_15.background = 'red'
                                            }
                                            else{
                                                current_stats_data.O_15.background = 'yellow'
                                            }
                                            if(current_stats_data.O_15.percent > 0){
                                                current_stats_data.O_15.percent = '+ ' + current_stats_data.O_15.percent + ' %'
                                            }
                                            else if(current_stats_data.draw.percent < 0){
                                                current_stats_data.O_15.percent = '- ' + current_stats_data.O_15.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                current_stats_data.O_15.percent = current_stats_data.O_15.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past3_year_stats.O_15) > 0){
                                            past_3_years_data.O_15.odd = (100/parseInt(past3_year_stats.O_15)).toFixed(2)
                                            if(parseFloat(past_3_years_data.O_15.odd) == parseFloat(current_flatOdds.match_O15)){
                                                past_3_years_data.O_15.percent = (100 - (parseFloat(past_3_years_data.O_15.odd) - 1)*100/(parseFloat(current_flatOdds.match_O15) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_3_years_data.O_15.percent = ((parseFloat(current_flatOdds.match_O15) - 1)*100/(parseFloat(past_3_years_data.O_15.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_3_years_data.O_15.percent) > 10){
                                                past_3_years_data.O_15.background = 'green'
                                            }
                                            else if(parseFloat(past_3_years_data.O_15.percent) < -10){
                                                past_3_years_data.O_15.background = 'red'
                                            }
                                            else{
                                                past_3_years_data.O_15.background = 'yellow'
                                            }
                                            if(past_3_years_data.O_15.percent > 0){
                                                past_3_years_data.O_15.percent = '+ ' + past_3_years_data.O_15.percent + ' %'
                                            }
                                            else if(past_3_years_data.O_15.percent < 0){
                                                past_3_years_data.O_15.percent = '- ' + past_3_years_data.O_15.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_3_years_data.O_15.percent = past_3_years_data.O_15.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past10_year_stats.O_15) > 0){
                                            past_10_years_data.O_15.odd = (100/parseInt(past10_year_stats.O_15)).toFixed(2)
                                            if(parseFloat(past_10_years_data.O_15.odd) == parseFloat(current_flatOdds.match_O15)){
                                                past_10_years_data.O_15.percent = (100 - (parseFloat(past_10_years_data.O_15.odd) - 1)*100/(parseFloat(current_flatOdds.match_O15) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_10_years_data.O_15.percent = ((parseFloat(current_flatOdds.match_O15) - 1)*100/(parseFloat(past_10_years_data.O_15.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_10_years_data.O_15.percent) > 10){
                                                past_10_years_data.O_15.background = 'green'
                                            }
                                            else if(parseFloat(past_10_years_data.O_15.percent) < -10){
                                                past_10_years_data.O_15.background = 'red'
                                            }
                                            else{
                                                past_10_years_data.O_15.background = 'yellow'
                                            }
                                            if(past_10_years_data.O_15.percent > 0){
                                                past_10_years_data.O_15.percent = '+ ' + past_10_years_data.O_15.percent + ' %'
                                            }
                                            else if(past_10_years_data.draw.percent < 0){
                                                past_10_years_data.O_15.percent = '- ' + past_10_years_data.O_15.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_10_years_data.O_15.percent = past_10_years_data.O_15.percent + ' %'
                                            }
                                        }
                                    }
                                    if(current_flatOdds.match_O25 != null){
                                        current_flatOdds.match_O25 = current_flatOdds.match_O25.toFixed(2)
                                        if(parseInt(current_year_stats.O_25) > 0){
                                            current_stats_data.O_25.odd = (100/parseInt(current_year_stats.O_25)).toFixed(2)
                                            if(parseFloat(current_stats_data.O_25.odd) == parseFloat(current_flatOdds.match_O25)){
                                                current_stats_data.O_25.percent = (100 - (parseFloat(current_stats_data.O_25.odd) - 1)*100/(parseFloat(current_flatOdds.match_O25) - 1)).toFixed(0)
                                            }
                                            else{
                                                current_stats_data.O_25.percent = ((parseFloat(current_flatOdds.match_O25) - 1)*100/(parseFloat(current_stats_data.O_25.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(current_stats_data.O_25.percent) > 10){
                                                current_stats_data.O_25.background = 'green'
                                            }
                                            else if(parseFloat(current_stats_data.O_25.percent) < -10){
                                                current_stats_data.O_25.background = 'red'
                                            }
                                            else{
                                                current_stats_data.O_25.background = 'yellow'
                                            }
                                            if(current_stats_data.O_25.percent > 0){
                                                current_stats_data.O_25.percent = '+ ' + current_stats_data.O_25.percent + ' %'
                                            }
                                            else if(current_stats_data.O_25.percent < 0){
                                                current_stats_data.O_25.percent = '- ' + current_stats_data.O_25.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                current_stats_data.O_25.percent = current_stats_data.O_25.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past3_year_stats.O_25) > 0){
                                            past_3_years_data.O_25.odd = (100/parseInt(past3_year_stats.O_25)).toFixed(2)
                                            if(parseFloat(past_3_years_data.O_25.odd) == parseFloat(current_flatOdds.match_O25)){
                                                past_3_years_data.O_25.percent = (100 - (parseFloat(past_3_years_data.O_25.odd) - 1)*100/(parseFloat(current_flatOdds.match_O25) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_3_years_data.O_25.percent = ((parseFloat(current_flatOdds.match_O25) - 1)*100/(parseFloat(past_3_years_data.O_25.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_3_years_data.O_25.percent) > 10){
                                                past_3_years_data.O_25.background = 'green'
                                            }
                                            else if(parseFloat(past_3_years_data.O_25.percent) < -10){
                                                past_3_years_data.O_25.background = 'red'
                                            }
                                            else{
                                                past_3_years_data.O_25.background = 'yellow'
                                            }
                                            if(past_3_years_data.O_25.percent > 0){
                                                past_3_years_data.O_25.percent = '+ ' + past_3_years_data.O_25.percent + ' %'
                                            }
                                            else if(past_3_years_data.O_25.percent < 0){
                                                past_3_years_data.O_25.percent = '- ' + past_3_years_data.O_25.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_3_years_data.O_25.percent = past_3_years_data.O_25.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past10_year_stats.O_25) > 0){
                                            past_10_years_data.O_25.odd = (100/parseInt(past10_year_stats.O_25)).toFixed(2)
                                            if(parseFloat(past_10_years_data.O_25.odd) == parseFloat(current_flatOdds.match_O25)){
                                                past_10_years_data.O_25.percent = (100 - (parseFloat(past_10_years_data.O_25.odd) - 1)*100/(parseFloat(current_flatOdds.match_O25) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_10_years_data.O_25.percent = ((parseFloat(current_flatOdds.match_O25) - 1)*100/(parseFloat(past_10_years_data.O_25.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_10_years_data.O_25.percent) > 10){
                                                past_10_years_data.O_25.background = 'green'
                                            }
                                            else if(parseFloat(past_10_years_data.O_25.percent) < -10){
                                                past_10_years_data.O_25.background = 'red'
                                            }
                                            else{
                                                past_10_years_data.O_25.background = 'yellow'
                                            }
                                            if(past_10_years_data.O_25.percent > 0){
                                                past_10_years_data.O_25.percent = '+ ' + past_10_years_data.O_25.percent + ' %'
                                            }
                                            else if(past_10_years_data.O_25.percent < 0){
                                                past_10_years_data.O_25.percent = '- ' + past_10_years_data.O_25.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_10_years_data.O_25.percent = past_10_years_data.O_25.percent + ' %'
                                            }
                                        }
                                    }
                                    if(current_flatOdds.match_O35 != null){
                                        current_flatOdds.match_O35 = current_flatOdds.match_O35.toFixed(2)
                                        if(parseInt(current_year_stats.O_35) > 0){
                                            current_stats_data.O_35.odd = (100/parseInt(current_year_stats.O_35)).toFixed(2)
                                            if(parseFloat(current_stats_data.O_35.odd) == parseFloat(current_flatOdds.match_O35)){
                                                current_stats_data.O_35.percent = (100 - (parseFloat(current_stats_data.O_35.odd) - 1)*100/(parseFloat(current_flatOdds.match_O35) - 1)).toFixed(0)
                                            }
                                            else{
                                                current_stats_data.O_35.percent = ((parseFloat(current_flatOdds.match_O35) - 1)*100/(parseFloat(current_stats_data.O_35.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(current_stats_data.O_35.percent) > 10){
                                                current_stats_data.O_35.background = 'green'
                                            }
                                            else if(parseFloat(current_stats_data.O_35.percent) < -10){
                                                current_stats_data.O_35.background = 'red'
                                            }
                                            else{
                                                current_stats_data.O_35.background = 'yellow'
                                            }
                                            if(current_stats_data.O_35.percent > 0){
                                                current_stats_data.O_35.percent = '+ ' + current_stats_data.O_35.percent + ' %'
                                            }
                                            else if(current_stats_data.O_35.percent < 0){
                                                current_stats_data.O_35.percent = '- ' + current_stats_data.O_35.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                current_stats_data.O_35.percent = current_stats_data.O_35.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past3_year_stats.O_35) > 0){
                                            past_3_years_data.O_35.odd = (100/parseInt(past3_year_stats.O_35)).toFixed(2)
                                            if(parseFloat(past_3_years_data.O_35.odd) == parseFloat(current_flatOdds.match_O35)){
                                                past_3_years_data.O_35.percent = (100 - (parseFloat(past_3_years_data.O_35.odd) - 1)*100/(parseFloat(current_flatOdds.match_O35) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_3_years_data.O_35.percent = ((parseFloat(current_flatOdds.match_O35) - 1)*100/(parseFloat(past_3_years_data.O_35.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_3_years_data.O_35.percent) > 10){
                                                past_3_years_data.O_35.background = 'green'
                                            }
                                            else if(parseFloat(past_3_years_data.O_35.percent) < -10){
                                                past_3_years_data.O_35.background = 'red'
                                            }
                                            else{
                                                past_3_years_data.O_35.background = 'yellow'
                                            }
                                            if(past_3_years_data.O_35.percent > 0){
                                                past_3_years_data.O_35.percent = '+ ' + past_3_years_data.O_35.percent + ' %'
                                            }
                                            else if(past_3_years_data.O_35.percent < 0){
                                                past_3_years_data.O_35.percent = '- ' + past_3_years_data.O_35.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_3_years_data.O_35.percent = past_3_years_data.O_35.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past10_year_stats.O_35) > 0){
                                            past_10_years_data.O_35.odd = (100/parseInt(past10_year_stats.O_35)).toFixed(2)
                                            if(parseFloat(past_10_years_data.O_35.odd) == parseFloat(current_flatOdds.match_O35)){
                                                past_10_years_data.O_35.percent = (100 - (parseFloat(past_10_years_data.O_35.odd) - 1)*100/(parseFloat(current_flatOdds.match_O35) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_10_years_data.O_35.percent = ((parseFloat(current_flatOdds.match_O35) - 1)*100/(parseFloat(past_10_years_data.O_35.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_10_years_data.O_35.percent) > 10){
                                                past_10_years_data.O_35.background = 'green'
                                            }
                                            else if(parseFloat(past_10_years_data.O_35.percent) < -10){
                                                past_10_years_data.O_35.background = 'red'
                                            }
                                            else{
                                                past_10_years_data.O_35.background = 'yellow'
                                            }
                                            if(past_10_years_data.O_35.percent > 0){
                                                past_10_years_data.O_35.percent = '+ ' + past_10_years_data.O_35.percent + ' %'
                                            }
                                            else if(past_10_years_data.O_35.percent < 0){
                                                past_10_years_data.O_35.percent = '- ' + past_10_years_data.O_35.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_10_years_data.O_35.percent = past_10_years_data.O_35.percent + ' %'
                                            }
                                        }
                                    }
                                    if(current_flatOdds.match_BS != null){
                                        current_flatOdds.match_BS = current_flatOdds.match_BS.toFixed(2)
                                        if(parseInt(current_year_stats.bts) > 0){
                                            current_stats_data.bts.odd = (100/parseInt(current_year_stats.bts)).toFixed(2)
                                            if(parseFloat(current_stats_data.bts.odd) == parseFloat(current_flatOdds.match_BS)){
                                                current_stats_data.bts.percent = (100 - (parseFloat(current_stats_data.bts.odd) - 1)*100/(parseFloat(current_flatOdds.match_BS) - 1)).toFixed(0)
                                            }
                                            else{
                                                current_stats_data.bts.percent = ((parseFloat(current_flatOdds.match_BS) - 1)*100/(parseFloat(current_stats_data.bts.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(current_stats_data.bts.percent) > 10){
                                                current_stats_data.bts.background = 'green'
                                            }
                                            else if(parseFloat(current_stats_data.bts.percent) < -10){
                                                current_stats_data.bts.background = 'red'
                                            }
                                            else{
                                                current_stats_data.bts.background = 'yellow'
                                            }
                                            if(current_stats_data.bts.percent > 0){
                                                current_stats_data.bts.percent = '+ ' + current_stats_data.bts.percent + ' %'
                                            }
                                            else if(current_stats_data.bts.percent < 0){
                                                current_stats_data.bts.percent = '- ' + current_stats_data.bts.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                current_stats_data.bts.percent = current_stats_data.bts.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past3_year_stats.bts) > 0){
                                            past_3_years_data.bts.odd = (100/parseInt(past3_year_stats.bts)).toFixed(2)
                                            if(parseFloat(past_3_years_data.bts.odd) == parseFloat(current_flatOdds.match_BS)){
                                                past_3_years_data.bts.percent = (100 - (parseFloat(past_3_years_data.bts.odd) - 1)*100/(parseFloat(current_flatOdds.match_BS) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_3_years_data.bts.percent = ((parseFloat(current_flatOdds.match_BS) - 1)*100/(parseFloat(past_3_years_data.bts.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_3_years_data.bts.percent) > 10){
                                                past_3_years_data.bts.background = 'green'
                                            }
                                            else if(parseFloat(past_3_years_data.bts.percent) < -10){
                                                past_3_years_data.bts.background = 'red'
                                            }
                                            else{
                                                past_3_years_data.bts.background = 'yellow'
                                            }
                                            if(past_3_years_data.bts.percent > 0){
                                                past_3_years_data.bts.percent = '+ ' + past_3_years_data.bts.percent + ' %'
                                            }
                                            else if(past_3_years_data.bts.percent < 0){
                                                past_3_years_data.bts.percent = '- ' + past_3_years_data.bts.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_3_years_data.bts.percent = past_3_years_data.bts.percent + ' %'
                                            }
                                        }
                                        if(parseInt(past10_year_stats.bts) > 0){
                                            past_10_years_data.bts.odd = (100/parseInt(past10_year_stats.bts)).toFixed(2)
                                            if(parseFloat(past_10_years_data.bts.odd) == parseFloat(current_flatOdds.match_BS)){
                                                past_10_years_data.bts.percent = (100 - (parseFloat(past_10_years_data.bts.odd) - 1)*100/(parseFloat(current_flatOdds.match_BS) - 1)).toFixed(0)
                                            }
                                            else{
                                                past_10_years_data.bts.percent = ((parseFloat(current_flatOdds.match_BS) - 1)*100/(parseFloat(past_10_years_data.bts.odd) - 1) - 100).toFixed(0)
                                            }

                                            if(parseFloat(past_10_years_data.bts.percent) > 10){
                                                past_10_years_data.bts.background = 'green'
                                            }
                                            else if(parseFloat(past_10_years_data.bts.percent) < -10){
                                                past_10_years_data.bts.background = 'red'
                                            }
                                            else{
                                                past_10_years_data.bts.background = 'yellow'
                                            }
                                            if(past_10_years_data.bts.percent > 0){
                                                past_10_years_data.bts.percent = '+ ' + past_10_years_data.bts.percent + ' %'
                                            }
                                            else if(past_10_years_data.bts.percent < 0){
                                                past_10_years_data.bts.percent = '- ' + past_10_years_data.bts.percent.split('-')[1] + ' %'
                                            }
                                            else{
                                                past_10_years_data.bts.percent = past_10_years_data.bts.percent + ' %'
                                            }
                                        }
                                    }
                                    //
                                    // console.log('============>', past_3_years_data.home)
                                    home.name = main_data[j].localTeamName + '(' + main_data[j].standing.localteam_position + ')'
                                    away.name = main_data[j].visitorTeamName +  '(' + main_data[j].standing.visitorteam_position + ')'
                                    events[k - 1] = {'past_10_stats': past_10_years_data, 'past_3_stats': past_3_years_data, 'c_stats': current_stats_data, 'past10_year_stats': past10_year_stats, 'past3_year_stats': past3_year_stats , 'stats': current_year_stats, 'odds': current_main_data, 'flatodds': current_flatOdds, 'show': false, "spots": [], 'homeLineupList': [],'awayLineupList': [], 'rank_option': [], 'rank_set': {}, 'rankFilter': false, 'b_data': [],'eventtime': main_data[j].time.starting_at.time.substring(0, 5), 'eventName': main_data[j].localTeamName + '(' + main_data[j].standing.localteam_position + ')' + ' v ' + main_data[j].visitorTeamName +  '(' + main_data[j].standing.visitorteam_position + ')', 'home_id': localTeamId, 'away_id': visitorTeamId, 'openDate':  main_data[j].time.starting_at.time, 'home':home, 'away': away, 'homeDateList': [], "awayDateList": []}
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
                    for(let i = 0 ; i < 2 ; i++){
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
            sortJSON(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
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
