<template>
    <div style="min-width: 1250px">
        <div v-if="!isload" style="height: 10px;">
            <b-progress :value="current_counter" :max="counter" animated></b-progress>
        </div>
        <b-modal id="modal-1"  hide-footer hide-header centered no-close-on-backdrop>
            <b-progress value="100" max="100" animated variant="secondary"></b-progress>
        </b-modal>
        <CCard body-wrapper>
            <div>
                <p @click="readData" class="content-tabs" :style="style_current_tag">Current Events</p>
                <p @click="readData1" class="content-tabs1" :style="style_past_tag">Past Events</p>
            </div>
            <div v-if="alert" style="font-size: 15px!important; clear: left;">no events available at the moment, please try later.</div>
            <div v-if="currentData">
                <div
                        v-for="(item,index) in mainList"
                        :key="item.league"
                        style="clear: left;"
                >
                    <div
                            duration="500"
                            class="event-list"
                            v-if="item.events.length > 0"
                    >
                        {{item.country}} - {{item.league1}}  <span v-if="item.percentage != 0" style="font-weight: normal; margin-left: 10px;">{{item.percentage}}%</span>
                        <img v-if="item.percentage >= 96 && item.numbers > 6" src="/img/icon-warning-orange.png" width="13px;" style="width: 18px; position:relative; top: -3px; margin-left: 5px; margin-right: 10px;"/>
                        <img v-if="item.percentage <= 10 || item.numbers <= 6" src="/img/icon-warning-red.png" width="13px;" style="width: 18px; position:relative; top: -3px; margin-left: 5px; margin-right: 10px;"/>
                        <img v-if="item.percentage >= 11  && item.numbers > 6 && item.percentage <= 95" src="/img/icon-tick.png" width="13px;" style="width: 18px; position:relative; top: -1px; margin-left: 5px; margin-right: 10px;"/>
                        {{item.events.length}} matches
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
                                    @click="SetCollapse1(item1.eventName), select_team(item1.home_id, item1.away_id)"
                                    duration="500"
                            >
                                {{item1.eventName}}
                                <img v-if="!isCollapsed1(item1.eventName)" src="/img/ico-plus.png" width="13px;" style="width: 16px; float: right;"/>
                                <img v-if="isCollapsed1(item1.eventName)" src="/img/ico-minus.png" width="13px;" style="width: 16px; float: right;"/>
                            </div>
                            <CCollapse
                                    v-if="item1.show"
                                    :show="isCollapsed1(item1.eventName)" class="mt-0"
                            >
                                <div class="event-graph1"
                                >
                                    <label>Unit analysis and stats_</label>
                                    <div v-if="item1.homeTeam.length > 0" class="unit-analysis">
                                        <div class="homeTeam_Container">
                                            <CRow style="margin: 0px;">
                                                <CCol sm="12" style="padding: 10px; border-right: 1px solid lightgray;">
                                                    <div class="home_main_tab">
                                                        <div style="display: flex;">
                                                            <div class="hometeam_info" style="flex: 0 0 50%">
                                                                <label style="float:left;">Home Team: <span style="font-weight: 700; color: darkblue;">{{item1.homeTeamName}}</span></label>
                                                                <label style="margin-left: 3%; float: left;">Lineup (pre): <span style="font-weight: 600; color: darkblue">{{item1.homeTeamPformation}}</span></label>
                                                                <label style="margin-left: 3%; float: left;">Manual: </label>
                                                                <CSelect
                                                                        @click = "selected_team = item1.homeTeamName, selected_direction = 'home'"
                                                                        class="lineup-selector"
                                                                        :options="lineup_list"
                                                                        @update:value="select_lineup"
                                                                >
                                                                </CSelect>
                                                                <label style="margin-left: 3%">Used: {{item1.home_fmt_ans.used}}, {{(item1.home_fmt_ans.used/item1.home_fmt_ans.counts*100).toFixed(2)}}%</label>
                                                                <div class="content" style="color: black;">
                                                                    
                                                                    <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            S.Role
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            M.R
                                                                        </div>
                                                                        <div style="width: 18%; float: left; border-right: 1px solid white;">
                                                                            Line Up Home
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            Sub
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            Market Value
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            P.M.Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Primary_Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role1
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role2
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            Rate
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            Titularity %
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div v-for="item2 in item1.homeTeam" :key="item2.index" style="display: flex; text-align: center; background: #d8e4bc">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item2.sRole}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item2.mR}}
                                                                        </div>
                                                                        <div :style="{'height': '18px','overflow': 'hidden', 'width': '18%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'left', 'padding-left': '5px', 'background': item2.sub_order_color}">
                                                                            {{item2.Pname}}
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            {{item2.sub_minute}}
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            {{item2.marketValue}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item2.p_m_Role}}
                                                                        </div>
                                                                        <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'background': item2.rule_color}">
                                                                            {{item2.primaryRole}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item2.altRole1}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item2.altRole2}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item2.rating}}
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            {{item2.Tit}}
                                                                        </div>
                                                                    </div>
                                                                    <div style="padding-top: 2%; height: 45px;">
                                                                        <label style="margin-left: 3%;float: left;">Lineup (live): <span style="font-weight: 600; color: darkblue">{{item1.homeTeamLformation}}</span></label>
                                                                        <label style="margin-left: 3%; float: left;">Manual: </label>
                                                                        <CSelect
                                                                                @click = "selected_team = item1.homeTeamName, selected_direction = 'home'"
                                                                                class="lineup-selector"
                                                                                :options="lineup_list"
                                                                                @update:value="select_lineup1"
                                                                        >
                                                                        </CSelect>
                                                                    </div>
                                                                    <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            S.Role
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            M.R
                                                                        </div>
                                                                        <div style="width: 18%; float: left; border-right: 1px solid white;">
                                                                            Line Up Home
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            Sub
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            Market Value
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            P.M.Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Primary_Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role1
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role2
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            Rate
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            Titularity %
                                                                        </div>
                                                                    </div>
                                                                    <div v-for="item2 in item1.homeTeam1" :key="item2.index" style="display: flex; text-align: center; background: #d8e4bc">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item2.sRole}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item2.mR}}
                                                                        </div>
                                                                        <div :style="{'height': '18px','overflow': 'hidden', 'width': '18%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'left', 'padding-left': '5px', 'background': item2.sub_order_color}">
                                                                            {{item2.Pname}}
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            {{item2.sub_minute}}
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            {{item2.marketValue}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item2.p_m_Role}}
                                                                        </div>
                                                                        <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'background': item2.rule_color}">
                                                                            {{item2.primaryRole}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item2.altRole1}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item2.altRole2}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item2.rating}}
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            {{item2.Tit}}
                                                                        </div>
                                                                    </div>
                                                                    <br>
                                                                    <div style="display: flex;">
                                                                        <div class="lineup-ans" style="flex: 1; text-align: center;">
                                                                            <label style="font-weight: 600; color: blue;">System of play used in the season:</label>
                                                                            <div v-for="(item0, index0) in item1.home_b_fmt_ans.ans" :key="index0 + 100">
                                                                                <div style="display: flex; display: flex; text-align: center;">
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.label}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.count}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{(item0.count/(item1.home_b_fmt_ans.counts + 0.00001)*100).toFixed(2)}}%
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="lineup-ans" style="flex:1 ;text-align: center;">
                                                                            <label style="font-weight: 600; color: blue;">System of play used in home team:</label>
                                                                            <div v-for="(item0, index0) in item1.home_fmt_ans.ans" :key="index0 + 100">
                                                                                <div style="display: flex; display: flex; text-align: center;">
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.label}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.count}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{(item0.count/(item1.home_fmt_ans.counts + 0.00001)*100).toFixed(2)}}%
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br>
                                                                    <div style="width: 100%">
                                                                        <div style="width: 17%; float: left; height: 62px; padding-left: 20px;">
                                                                            Role legend:
                                                                        </div>
                                                                        <div style="width: 43%; float: left; height: 62px;">
                                                                            <div style="display: flex;">
                                                                                <div style="flex: 2; height: 20px; background: #92d050; text-align: center;">{{item1.home_rule_set.green_color}}</div>
                                                                                <div style="flex: 5; padding-left: 5px;">Player in Role</div>
                                                                            </div>
                                                                            <div style="display: flex;">
                                                                                <div style="flex: 2; height: 20px; background: #ffff00; text-align: center;">{{item1.home_rule_set.yellow_color}}</div>
                                                                                <div style="flex: 5; padding-left: 5px;">Player in alternative Role</div>
                                                                            </div>
                                                                            <div style="display: flex;">
                                                                                <div style="flex: 2; height: 20px; background: #ff0000; text-align: center;">{{item1.home_rule_set.red_color}}</div>
                                                                                <div style="flex: 5; padding-left: 5px;">Player out of role</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style="width: 15%; float: left; height: 62px; text-align: right;">
                                                                            Subst.legend:
                                                                        </div>
                                                                        <div style="width: 25%; float: left; text-align: center; margin-bottom: 10px;">
                                                                            <div v-for="item4  in item1.home_legend" :key="item4.index" style="display: flex; width: 80%; margin: auto;">
                                                                                <div :style="{'flex': '1', 'height': '20px', 'background': item4.color}">{{item4.label}}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="awayteam_info" style="flex: 0 0 50%; padding-left: 10px">
                                                                <label style="float:left;">Away Team: <span style="font-weight: 700; color: darkblue;">{{item1.awayTeamName}}</span></label>
                                                                <label style="margin-left: 3%; float: left;">Lineup (pre): <span style="font-weight: 600; color: darkblue">{{item1.awayTeamPformation}}</span></label>
                                                                <label style="margin-left: 3%; float: left;">Manual: </label>
                                                                <CSelect
                                                                        @click = "selected_team = item1.awayTeamName, selected_direction = 'away'"
                                                                        class="lineup-selector"
                                                                        :options="lineup_list"
                                                                        @update:value="select_lineup"
                                                                >
                                                                </CSelect>
                                                                <label style="margin-left: 3%">Used: {{item1.away_fmt_ans.used}}, , {{(item1.away_fmt_ans.used/item1.away_fmt_ans.counts*100).toFixed(2)}}%</label>
                                                                <div class="content" style="color: black;">
                                                                    <div style="display: flex; text-align: center; background: #e6b8b7; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            S.Role
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            M.R
                                                                        </div>
                                                                        <div style="width: 18%; float: left; border-right: 1px solid white;">
                                                                            Line Up Home
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            Sub
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            Market Value
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            P.M.Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Primary_Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role1
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role2
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            Rate
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            Titularity %
                                                                        </div>
                                                                    </div>
                                                                    <div v-for="item3 in item1.awayTeam" :key="item3.index" style="display: flex; text-align: center; background: #e6b8b7">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item3.sRole}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item3.mR}}
                                                                        </div>
                                                                        <div :style="{'height': '18px','overflow': 'hidden', 'width': '18%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'left', 'padding-left': '5px', 'background': item3.sub_order_color}">
                                                                            {{item3.Pname}}
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            {{item3.sub_minute}}
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            {{item3.marketValue}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item3.p_m_Role}}
                                                                        </div>
                                                                        <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'background': item3.rule_color}">
                                                                            {{item3.primaryRole}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item3.altRole1}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item3.altRole2}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item3.rating}}
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            {{item3.Tit}}
                                                                        </div>
                                                                    </div>
                                                                    <div style="padding-top: 2%; height: 45px;">
                                                                        <label style="margin-left: 3%; float: left;">Lineup (live): <span style="font-weight: 600; color: darkblue">{{item1.awayTeamLformation}}</span></label>
                                                                        <label style="margin-left: 3%; float: left;">Manual: </label>
                                                                        <CSelect
                                                                                @click = "selected_team = item1.awayTeamName, selected_direction = 'away'"
                                                                                class="lineup-selector"
                                                                                :options="lineup_list"
                                                                                @update:value="select_lineup1"
                                                                        >
                                                                        </CSelect>
                                                                    </div>
                                                                    <div style="display: flex; text-align: center; background: #e6b8b7; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            S.Role
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            M.R
                                                                        </div>
                                                                        <div style="width: 18%; float: left; border-right: 1px solid white;">
                                                                            Line Up Home
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            Sub
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            Market Value
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            P.M.Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Primary_Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role1
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role2
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            Rate
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            Titularity %
                                                                        </div>
                                                                    </div>
                                                                    <div v-for="item3 in item1.awayTeam1" :key="item3.index" style="display: flex; text-align: center; background: #e6b8b7">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item3.sRole}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item3.mR}}
                                                                        </div>
                                                                        <div :style="{'height': '18px','overflow': 'hidden', 'width': '18%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'left', 'padding-left': '5px', 'background': item3.sub_order_color}">
                                                                            {{item3.Pname}}
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            {{item3.sub_minute}}
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            {{item3.marketValue}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item3.p_m_Role}}
                                                                        </div>
                                                                        <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'background': item3.rule_color}">
                                                                            {{item3.primaryRole}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item3.altRole1}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item3.altRole2}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item3.rating}}
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            {{item3.Tit}}
                                                                        </div>
                                                                    </div>
                                                                    <br>
                                                                    <div style="display: flex">
                                                                        <div class="lineup-ans" style="flex: 1; text-align: center;">
                                                                            <label style="font-weight: 600; color: blue;">System of play used in the season:</label>
                                                                            <div v-for="(item0, index0) in item1.away_b_fmt_ans.ans" :key="index0 + 100">
                                                                                <div style="display: flex; display: flex; text-align: center;">
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.label}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.count}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{(item0.count/(item1.away_b_fmt_ans.counts + 0.00001)*100).toFixed(2)}}%
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="lineup-ans" style="flex: 1; text-align: center;">
                                                                            <label style="font-weight: 600; color: blue;">System of play used in away team:</label>
                                                                            <div v-for="(item0, index0) in item1.away_fmt_ans.ans" :key="index0 + 100">
                                                                                <div style="display: flex; display: flex; text-align: center;">
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.label}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.count}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{(item0.count/(item1.away_fmt_ans.counts + 0.00001)*100).toFixed(2)}}%
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <br>
                                                                    <div style="width: 100%">
                                                                        <div style="width: 20%; float: left; height: 62px; padding-left: 20px;">
                                                                            Role legend:
                                                                        </div>
                                                                        <div style="width: 40%; float: left; height: 62px;">
                                                                            <div style="display: flex;">
                                                                                <div style="flex: 1; height: 20px; background: #92d050; text-align: center;">{{item1.away_rule_set.green_color}}</div>
                                                                                <div style="flex: 2; padding-left: 5px;">Player in Role</div>
                                                                            </div>
                                                                            <div style="display: flex;">
                                                                                <div style="flex: 1; height: 20px; background: #ffff00; text-align: center;">{{item1.away_rule_set.yellow_color}}</div>
                                                                                <div style="flex: 2; padding-left: 5px;">Player in alternative Role</div>
                                                                            </div>
                                                                            <div style="display: flex;">
                                                                                <div style="flex: 1; height: 20px; background: #ff0000; text-align: center;">{{item1.away_rule_set.red_color}}</div>
                                                                                <div style="flex: 2; padding-left: 5px;">Player out of role</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style="width: 15%; float: left; height: 62px; text-align: right;">
                                                                            Subst.legend:
                                                                        </div>
                                                                        <div style="width: 25%; float: left; text-align: center; margin-bottom: 10px;">
                                                                            <div v-for="item4  in item1.away_legend" :key="item4.index" style="display: flex; width: 80%; margin: auto;">
                                                                                <div :style="{'flex': '1', 'height': '20px', 'background': item4.color}">{{item4.label}}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div style="display: flex;">
                                                            <div class="hometeam_info" style="flex: 0 0 50%">
                                                                <label style="color: red; font-weight: bold;">GK</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.home_players.gk_arrow.rating = !item1.home_players.gk_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.gk, current_sort_team = 'home', current_sort_group = 'GK', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.home_players.gk_arrow.rating">&#8593;</span><span v-if="!item1.home_players.gk_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.gk_arrow.goal = !item1.home_players.gk_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.gk, current_sort_team = 'home', current_sort_group = 'GK', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.home_players.gk_arrow.goal">&#8593;</span><span v-if="!item1.home_players.gk_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.gk_arrow.assist = !item1.home_players.gk_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.gk, current_sort_team = 'home', current_sort_group = 'GK', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.home_players.gk_arrow.assist">&#8593;</span><span v-if="!item1.home_players.gk_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.gk_arrow.Tit = !item1.home_players.gk_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.gk, current_sort_team = 'home', current_sort_group = 'GK', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.home_players.gk_arrow.Tit">&#8593;</span><span v-if="!item1.home_players.gk_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item5, index5 ) in item1.home_players.gk" :key="item5.player_name" v-if="index5 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item5.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.rating}}
                                                                    </div>
                                                                    <div v-if="item5.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item5.goal}} ({{item5.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item5.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item5.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="awayteam_info" style="flex: 0 0 50%; padding-left: 10px">
                                                                <label style="color: red; font-weight: bold;">GK</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.away_players.gk_arrow.rating = !item1.away_players.gk_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.gk, current_sort_team = 'away', current_sort_group = 'GK', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.away_players.gk_arrow.rating">&#8593;</span><span v-if="!item1.away_players.gk_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.gk_arrow.goal = !item1.away_players.gk_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.gk, current_sort_team = 'away', current_sort_group = 'GK', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.away_players.gk_arrow.goal">&#8593;</span><span v-if="!item1.away_players.gk_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.gk_arrow.assist = !item1.away_players.gk_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.gk, current_sort_team = 'away', current_sort_group = 'GK', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.away_players.gk_arrow.assist">&#8593;</span><span v-if="!item1.away_players.gk_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.gk_arrow.Tit = !item1.away_players.gk_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.gk, current_sort_team = 'away', current_sort_group = 'GK', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.away_players.gk_arrow.Tit">&#8593;</span><span v-if="!item1.away_players.gk_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item5, index5) in item1.away_players.gk" :key="item5.player_name" v-if="index5 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item5.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.rating}}
                                                                    </div>
                                                                    <div v-if="item5.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item5.goal}} ({{item5.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item5.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item5.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div style="display: flex;">
                                                            <div class="hometeam_info" style="flex: 0 0 50%">
                                                                <label style="color: red; font-weight: bold;">DEF</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.home_players.def_arrow.rating = !item1.home_players.def_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.def, current_sort_team = 'home', current_sort_group = 'DEF', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.home_players.def_arrow.rating">&#8593;</span><span v-if="!item1.home_players.def_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.def_arrow.goal = !item1.home_players.def_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.def, current_sort_team = 'home', current_sort_group = 'DEF', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.home_players.def_arrow.goal">&#8593;</span><span v-if="!item1.home_players.def_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.def_arrow.assist = !item1.home_players.def_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.def, current_sort_team = 'home', current_sort_group = 'DEF', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.home_players.def_arrow.assist">&#8593;</span><span v-if="!item1.home_players.def_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.def_arrow.Tit = !item1.home_players.def_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.def, current_sort_team = 'home', current_sort_group = 'DEF', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.home_players.def_arrow.Tit">&#8593;</span><span v-if="!item1.home_players.def_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item5, index5 ) in item1.home_players.def" :key="item5.player_name" v-if="index5 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item5.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.rating}}
                                                                    </div>
                                                                    <div v-if="item5.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item5.goal}} ({{item5.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item5.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item5.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="awayteam_info" style="flex: 0 0 50%; padding-left: 10px;">
                                                                <label style="color: red; font-weight: bold;">DEF</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.away_players.def_arrow.rating = !item1.away_players.def_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.def, current_sort_team = 'away', current_sort_group = 'DEF', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.away_players.def_arrow.rating">&#8593;</span><span v-if="!item1.away_players.def_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.def_arrow.goal = !item1.away_players.def_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.def, current_sort_team = 'away', current_sort_group = 'DEF', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.away_players.def_arrow.goal">&#8593;</span><span v-if="!item1.away_players.def_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.def_arrow.assist = !item1.away_players.def_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.def, current_sort_team = 'away', current_sort_group = 'DEF', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.away_players.def_arrow.assist">&#8593;</span><span v-if="!item1.away_players.def_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.def_arrow.Tit = !item1.away_players.def_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.def, current_sort_team = 'away', current_sort_group = 'DEF', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.away_players.def_arrow.Tit">&#8593;</span><span v-if="!item1.away_players.def_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item5, index5) in item1.away_players.def" :key="item5.player_name" v-if="index5 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item5.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.rating}}
                                                                    </div>
                                                                    <div v-if="item5.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item5.goal}} ({{item5.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item5.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item5.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style="display: flex;">
                                                            <div class="hometeam_info" style="flex: 0 0 50%">
                                                                <label style="color: red; font-weight: bold;">MID</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.home_players.mid_arrow.rating = !item1.home_players.mid_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.mid, current_sort_team = 'home', current_sort_group = 'MID', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.home_players.mid_arrow.rating">&#8593;</span><span v-if="!item1.home_players.mid_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.mid_arrow.goal = !item1.home_players.mid_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.mid, current_sort_team = 'home', current_sort_group = 'MID', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.home_players.mid_arrow.goal">&#8593;</span><span v-if="!item1.home_players.mid_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.mid_arrow.assist = !item1.home_players.mid_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.mid, current_sort_team = 'home', current_sort_group = 'MID', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.home_players.mid_arrow.assist">&#8593;</span><span v-if="!item1.home_players.mid_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.mid_arrow.Tit = !item1.home_players.mid_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.mid, current_sort_team = 'home', current_sort_group = 'MID', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.home_players.mid_arrow.Tit">&#8593;</span><span v-if="!item1.home_players.mid_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item6, index6 ) in item1.home_players.mid" :key="item6.player_name" v-if="index6 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item6.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item6.rating}}
                                                                    </div>
                                                                    <div v-if="item6.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item6.goal}} ({{item6.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item6.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item6.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item6.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item6.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item6.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item6.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item6.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="awayteam_info" style="flex: 0 0 50%; padding-left: 10px;">
                                                                <label style="color: red; font-weight: bold;">MID</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.away_players.mid_arrow.rating = !item1.away_players.mid_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.mid, current_sort_team = 'away', current_sort_group = 'MID', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.away_players.mid_arrow.rating">&#8593;</span><span v-if="!item1.away_players.mid_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.mid_arrow.goal = !item1.away_players.mid_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.mid, current_sort_team = 'away', current_sort_group = 'MID', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.away_players.mid_arrow.goal">&#8593;</span><span v-if="!item1.away_players.mid_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.mid_arrow.assist = !item1.away_players.mid_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.mid, current_sort_team = 'away', current_sort_group = 'MID', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.away_players.mid_arrow.assist">&#8593;</span><span v-if="!item1.away_players.mid_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.mid_arrow.Tit = !item1.away_players.mid_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.mid, current_sort_team = 'away', current_sort_group = 'MID', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.away_players.mid_arrow.Tit">&#8593;</span><span v-if="!item1.away_players.mid_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item5, index5) in item1.away_players.mid" :key="item5.player_name"  v-if="index5 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item5.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.rating}}
                                                                    </div>
                                                                    <div v-if="item5.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item5.goal}} ({{item5.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item5.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item5.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style="display: flex;">
                                                            <div class="hometeam_info" style="flex: 0 0 50%">
                                                                <label style="color: red; font-weight: bold;">FWD</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.home_players.fwd_arrow.rating = !item1.home_players.fwd_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.fwd, current_sort_team = 'home', current_sort_group = 'FWD', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.home_players.fwd_arrow.rating">&#8593;</span><span v-if="!item1.home_players.fwd_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.fwd_arrow.goal = !item1.home_players.fwd_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.fwd, current_sort_team = 'home', current_sort_group = 'FWD', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.home_players.fwd_arrow.goal">&#8593;</span><span v-if="!item1.home_players.fwd_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.fwd_arrow.assist = !item1.home_players.fwd_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.fwd, current_sort_team = 'home', current_sort_group = 'FWD', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.home_players.fwd_arrow.assist">&#8593;</span><span v-if="!item1.home_players.fwd_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.fwd_arrow.Tit = !item1.home_players.fwd_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.fwd, current_sort_team = 'home', current_sort_group = 'FWD', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.home_players.fwd_arrow.Tit">&#8593;</span><span v-if="!item1.home_players.fwd_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item7, index7 ) in item1.home_players.fwd" :key="item7.player_name" v-if="index7 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item7.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item7.rating}}
                                                                    </div>
                                                                    <div v-if="item7.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item7.goal}} ({{item7.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item7.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item7.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item7.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item7.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item7.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item7.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item7.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="awayteam_info" style="flex: 0 0 50%; padding-left: 10px;">
                                                                <label style="color: red; font-weight: bold;">FWD</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.away_players.fwd_arrow.rating = !item1.away_players.fwd_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.fwd, current_sort_team = 'away', current_sort_group = 'FWD', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.away_players.fwd_arrow.rating">&#8593;</span><span v-if="!item1.away_players.fwd_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.fwd_arrow.goal = !item1.away_players.fwd_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.fwd, current_sort_team = 'away', current_sort_group = 'FWD', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.away_players.fwd_arrow.goal">&#8593;</span><span v-if="!item1.away_players.fwd_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.fwd_arrow.assist = !item1.away_players.fwd_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.fwd, current_sort_team = 'away', current_sort_group = 'FWD', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.away_players.fwd_arrow.assist">&#8593;</span><span v-if="!item1.away_players.fwd_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.fwd_arrow.Tit = !item1.away_players.fwd_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.fwd, current_sort_team = 'away', current_sort_group = 'FWD', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.away_players.fwd_arrow.Tit">&#8593;</span><span v-if="!item1.away_players.fwd_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item5, index5) in item1.away_players.fwd" :key="item5.player_name"  v-if="index5 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item5.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.rating}}
                                                                    </div>
                                                                    <div v-if="item5.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item5.goal}} ({{item5.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item5.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item5.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style="display: flex;">
                                                            <div class="hometeam_info" style="flex: 0 0 50%">
                                                                <div style="margin-top: 10px; clear: left;">
                                                                <label style="color: blue; font-weight: bold; font-size: 14px; float: left;">best formation by titularity</label>
                                                                <CSelect
                                                                        @click = "best_players = item1.local_p1, best_players_r = item1.local_p2, best_direction = 'home', best_id = item1.home_id"
                                                                        class="lineup-selector"
                                                                        :options="lineup_list"
                                                                        @update:value="select_best_position"
                                                                >
                                                                </CSelect>
                                                                <div v-if="item1.home_lineup">
                                                                    <div :style="{'width': (100*item1.home_best.gk.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray', 'clear': 'left'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">GK</label>
                                                                        <div v-for="item5 in item1.home_best.gk" :key="item5.player_name" :style="{'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.home_best.def.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">DEF</label>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best.def" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-if="item1.home_best.mid1.length > item1.home_best.mid2.length" :style="{'width': (100*item1.home_best.mid1.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best.mid1" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best.mid2" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else :style="{'width': (100*item1.home_best.mid2.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best.mid1" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best.mid2" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.home_best.fwd.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">FWD</label>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best.fwd" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>

                                                                    <label style="color: blue; font-weight: bold; font-size: 14px; float: left;">best formation by rating</label>
                                                                    <div :style="{'width': (100*item1.home_best1.gk.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray', 'clear': 'left'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">GK</label>
                                                                        <div v-for="item5 in item1.home_best1.gk"  :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.home_best1.def.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">DEF</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.home_best1.def" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-if="item1.home_best1.mid1.length > item1.home_best1.mid2.length" :style="{'width': (100*item1.home_best1.mid1.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.home_best1.mid1" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.home_best1.mid2" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else :style="{'width': (100*item1.home_best1.mid2.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.home_best1.mid1" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.home_best1.mid2" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.home_best1.fwd.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">FWD</label>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best1.fwd" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div v-else style="clear: left; text-align: center;">info not available...</div>
                                                            </div>
                                                            </div>
                                                            <div class="awayteam_info" style="flex: 0 0 50%; padding-left: 10px;">
                                                                <div style="margin-top: 10px; clear: left;">
                                                                <label style="color: blue; font-weight: bold; font-size: 14px; float: left">best formation by titularity</label>
                                                                <CSelect
                                                                        @click = "best_players = item1.visit_p1,best_players_r = item1.visit_p2, best_direction = 'away', best_id = item1.away_id"
                                                                        class="lineup-selector"
                                                                        :options="lineup_list"
                                                                        @update:value="select_best_position"
                                                                >
                                                                </CSelect>
                                                                <div v-if="item1.home_lineup">
                                                                    <div :style="{'width': (100*item1.away_best.gk.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray', 'clear': 'left'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">GK</label>
                                                                        <div v-for="item5 in item1.away_best.gk" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.away_best.def.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">DEF</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best.def" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-if="item1.away_best.mid1.length > item1.away_best.mid2.length" :style="{'width': (100*item1.away_best.mid1.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best.mid1" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best.mid2" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else :style="{'width': (100*item1.away_best.mid2.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best.mid1" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best.mid2" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.away_best.fwd.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">FWD</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best.fwd" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>

                                                                    <label style="color: blue; font-weight: bold; font-size: 14px; float: left">best formation by rating</label>
                                                                    <div :style="{'width': (100*item1.away_best1.gk.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray', 'clear': 'left'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">GK</label>
                                                                        <div v-for="item5 in item1.away_best1.gk" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.away_best1.def.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">DEF</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best1.def" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-if="item1.away_best1.mid1.length > item1.away_best1.mid2.length" :style="{'width': (100*item1.away_best1.mid1.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best1.mid1" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best1.mid2" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else :style="{'width': (100*item1.away_best1.mid2.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best1.mid1" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best1.mid2" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.away_best1.fwd.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">FWD</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best1.fwd" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div v-else style="clear: left; text-align: center;">info not available...</div>
                                                            </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </CCol>                                                
                                            </CRow>
                                        </div>
                                    </div>
                                </div>
                            </CCollapse>
                        </div>
                    </CCollapse>
                </div>
            </div>
            <div v-if="pastData">
                <div
                        v-for="(item,index) in mainList"
                        :key="item.league"
                        style="clear: left;"
                >
                    <div
                            duration="500"
                            class="event-list"
                            v-if="item.events.length > 0"
                    >
                        {{item.country}} - {{item.league1}}  <span v-if="item.percentage != 0" style="font-weight: normal; margin-left: 10px;">{{item.percentage}}%</span>
                        <img v-if="item.percentage >= 96 && item.numbers > 6" src="/img/icon-warning-orange.png" width="13px;" style="width: 18px; position:relative; top: -3px; margin-left: 5px; margin-right: 10px;"/>
                        <img v-if="item.percentage <= 10 || item.numbers <= 6" src="/img/icon-warning-red.png" width="13px;" style="width: 18px; position:relative; top: -3px; margin-left: 5px; margin-right: 10px;"/>
                        <img v-if="item.percentage >= 11  && item.numbers > 6 && item.percentage <= 95" src="/img/icon-tick.png" width="13px;" style="width: 18px; position:relative; top: -1px; margin-left: 5px; margin-right: 10px;"/>
                        {{item.events.length}} matches
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
                                    @click="SetCollapse1(item1.eventName), select_team(item1.home_id, item1.away_id)"
                                    duration="500"
                            >
                                {{item1.eventName}}
                                <img v-if="!isCollapsed1(item1.eventName)" src="/img/ico-plus.png" width="13px;" style="width: 16px; float: right;"/>
                                <img v-if="isCollapsed1(item1.eventName)" src="/img/ico-minus.png" width="13px;" style="width: 16px; float: right;"/>
                            </div>
                            <CCollapse
                                    v-if="item1.show"
                                    :show="isCollapsed1(item1.eventName)" class="mt-0"
                            >
                                <div class="event-graph1"
                                >
                                    <label>Unit analysis and stats_</label>
                                    <div v-if="item1.homeTeam.length > 0" class="unit-analysis">
                                        <div class="homeTeam_Container">
                                            <CRow style="margin: 0px;">
                                                <CCol sm="12" style="padding: 10px; border-right: 1px solid lightgray;">
                                                    <div class="home_main_tab">
                                                        <div style="display: flex;">
                                                            <div class="hometeam_info" style="flex: 0 0 50%">
                                                                <label style="float:left;">Home Team: <span style="font-weight: 700; color: darkblue;">{{item1.homeTeamName}}</span></label>
                                                                <label style="margin-left: 3%; float: left;">Lineup (pre): <span style="font-weight: 600; color: darkblue">{{item1.homeTeamPformation}}</span></label>
                                                                <label style="margin-left: 3%; float: left;">Manual: </label>
                                                                <CSelect
                                                                        @click = "selected_team = item1.homeTeamName, selected_direction = 'home'"
                                                                        class="lineup-selector"
                                                                        :options="lineup_list"
                                                                        @update:value="select_lineup"
                                                                >
                                                                </CSelect>
                                                                <label style="margin-left: 3%">Used: {{item1.home_fmt_ans.used}}, {{(item1.home_fmt_ans.used/item1.home_fmt_ans.counts*100).toFixed(2)}}%</label>
                                                                <div class="content" style="color: black;">
                                                                    <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            S.Role
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            M.R
                                                                        </div>
                                                                        <div style="width: 18%; float: left; border-right: 1px solid white;">
                                                                            Line Up Home
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            Sub
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            Market Value
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            P.M.Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Primary_Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role1
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role2
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            Rate
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            Titularity %
                                                                        </div>
                                                                    </div>
                                                                    <div v-for="item2 in item1.homeTeam" :key="item2.index" style="display: flex; text-align: center; background: #d8e4bc">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item2.sRole}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item2.mR}}
                                                                        </div>
                                                                        <div :style="{'height': '18px','overflow': 'hidden', 'width': '18%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'left', 'padding-left': '5px', 'background': item2.sub_order_color}">
                                                                            {{item2.Pname}}
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            {{item2.sub_minute}}
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            {{item2.marketValue}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item2.p_m_Role}}
                                                                        </div>
                                                                        <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'background': item2.rule_color}">
                                                                            {{item2.primaryRole}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item2.altRole1}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item2.altRole2}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item2.rating}}
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            {{item2.Tit}}
                                                                        </div>
                                                                    </div>
                                                                    <div style="padding-top: 2%; height: 45px;">
                                                                        <label style="margin-left: 3%;float: left;">Lineup (live): <span style="font-weight: 600; color: darkblue">{{item1.homeTeamLformation}}</span></label>
                                                                        <label style="margin-left: 3%; float: left;">Manual: </label>
                                                                        <CSelect
                                                                                @click = "selected_team = item1.homeTeamName, selected_direction = 'home'"
                                                                                class="lineup-selector"
                                                                                :options="lineup_list"
                                                                                @update:value="select_lineup1"
                                                                        >
                                                                        </CSelect>
                                                                    </div>
                                                                    <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            S.Role
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            M.R
                                                                        </div>
                                                                        <div style="width: 18%; float: left; border-right: 1px solid white;">
                                                                            Line Up Home
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            Sub
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            Market Value
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            P.M.Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Primary_Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role1
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role2
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            Rate
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            Titularity %
                                                                        </div>
                                                                    </div>
                                                                    <div v-for="item2 in item1.homeTeam1" :key="item2.index" style="display: flex; text-align: center; background: #d8e4bc">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item2.sRole}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item2.mR}}
                                                                        </div>
                                                                        <div :style="{'height': '18px','overflow': 'hidden', 'width': '18%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'left', 'padding-left': '5px', 'background': item2.sub_order_color}">
                                                                            {{item2.Pname}}
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            {{item2.sub_minute}}
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            {{item2.marketValue}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item2.p_m_Role}}
                                                                        </div>
                                                                        <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'background': item2.rule_color}">
                                                                            {{item2.primaryRole}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item2.altRole1}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item2.altRole2}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item2.rating}}
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            {{item2.Tit}}
                                                                        </div>
                                                                    </div>
                                                                    <br>
                                                                    <div style="display: flex;">
                                                                        <div class="lineup-ans" style="flex: 1; text-align: center;">
                                                                            <label style="font-weight: 600; color: blue;">System of play used in the season:</label>
                                                                            <div v-for="(item0, index0) in item1.home_b_fmt_ans.ans" :key="index0 + 100">
                                                                                <div style="display: flex; display: flex; text-align: center;">
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.label}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.count}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{(item0.count/(item1.home_b_fmt_ans.counts + 0.00001)*100).toFixed(2)}}%
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="lineup-ans" style="flex:1 ;text-align: center;">
                                                                            <label style="font-weight: 600; color: blue;">System of play used in home team:</label>
                                                                            <div v-for="(item0, index0) in item1.home_fmt_ans.ans" :key="index0 + 100">
                                                                                <div style="display: flex; display: flex; text-align: center;">
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.label}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.count}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{(item0.count/(item1.home_fmt_ans.counts + 0.00001)*100).toFixed(2)}}%
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br>
                                                                    <div style="width: 100%">
                                                                        <div style="width: 17%; float: left; height: 62px; padding-left: 20px;">
                                                                            Role legend:
                                                                        </div>
                                                                        <div style="width: 43%; float: left; height: 62px;">
                                                                            <div style="display: flex;">
                                                                                <div style="flex: 2; height: 20px; background: #92d050; text-align: center;">{{item1.home_rule_set.green_color}}</div>
                                                                                <div style="flex: 5; padding-left: 5px;">Player in Role</div>
                                                                            </div>
                                                                            <div style="display: flex;">
                                                                                <div style="flex: 2; height: 20px; background: #ffff00; text-align: center;">{{item1.home_rule_set.yellow_color}}</div>
                                                                                <div style="flex: 5; padding-left: 5px;">Player in alternative Role</div>
                                                                            </div>
                                                                            <div style="display: flex;">
                                                                                <div style="flex: 2; height: 20px; background: #ff0000; text-align: center;">{{item1.home_rule_set.red_color}}</div>
                                                                                <div style="flex: 5; padding-left: 5px;">Player out of role</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style="width: 15%; float: left; height: 62px; text-align: right;">
                                                                            Subst.legend:
                                                                        </div>
                                                                        <div style="width: 25%; float: left; text-align: center; margin-bottom: 10px;">
                                                                            <div v-for="item4  in item1.home_legend" :key="item4.index" style="display: flex; width: 80%; margin: auto;">
                                                                                <div :style="{'flex': '1', 'height': '20px', 'background': item4.color}">{{item4.label}}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="awayteam_info" style="flex: 0 0 50%; padding-left: 10px">
                                                                <label style="float:left;">Away Team: <span style="font-weight: 700; color: darkblue;">{{item1.awayTeamName}}</span></label>
                                                                <label style="margin-left: 3%; float: left;">Lineup (pre): <span style="font-weight: 600; color: darkblue">{{item1.awayTeamPformation}}</span></label>
                                                                <label style="margin-left: 3%; float: left;">Manual: </label>
                                                                <CSelect
                                                                        @click = "selected_team = item1.awayTeamName, selected_direction = 'away'"
                                                                        class="lineup-selector"
                                                                        :options="lineup_list"
                                                                        @update:value="select_lineup"
                                                                >
                                                                </CSelect>
                                                                <label style="margin-left: 3%">Used: {{item1.away_fmt_ans.used}}, , {{(item1.away_fmt_ans.used/item1.away_fmt_ans.counts*100).toFixed(2)}}%</label>
                                                                <div class="content" style="color: black;">
                                                                    <div style="display: flex; text-align: center; background: #e6b8b7; border-bottom: 1px solid white; height: 20px; color: black; width: 100%;">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            S.Role
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            M.R
                                                                        </div>
                                                                        <div style="width: 18%; float: left; border-right: 1px solid white;">
                                                                            Line Up Home
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            Sub
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            Market Value
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            P.M.Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Primary_Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role1
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role2
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            Rate
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            Titularity %
                                                                        </div>
                                                                    </div>
                                                                    <div v-for="item3 in item1.awayTeam" :key="item3.index" style="display: flex; text-align: center; background: #e6b8b7">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item3.sRole}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item3.mR}}
                                                                        </div>
                                                                        <div :style="{'height': '18px','overflow': 'hidden', 'width': '18%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'left', 'padding-left': '5px', 'background': item3.sub_order_color}">
                                                                            {{item3.Pname}}
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            {{item3.sub_minute}}
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            {{item3.marketValue}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item3.p_m_Role}}
                                                                        </div>
                                                                        <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'background': item3.rule_color}">
                                                                            {{item3.primaryRole}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item3.altRole1}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item3.altRole2}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item3.rating}}
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            {{item3.Tit}}
                                                                        </div>
                                                                    </div>
                                                                    <div style="padding-top: 2%; height: 45px;">
                                                                        <label style="margin-left: 3%; float: left;">Lineup (live): <span style="font-weight: 600; color: darkblue">{{item1.awayTeamLformation}}</span></label>
                                                                        <label style="margin-left: 3%; float: left;">Manual: </label>
                                                                        <CSelect
                                                                                @click = "selected_team = item1.awayTeamName, selected_direction = 'away'"
                                                                                class="lineup-selector"
                                                                                :options="lineup_list"
                                                                                @update:value="select_lineup1"
                                                                        >
                                                                        </CSelect>
                                                                    </div>
                                                                    <div style="display: flex; text-align: center; background: #e6b8b7; border-bottom: 1px solid white; height: 20px; color: black; width: 100%; ">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            S.Role
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            M.R
                                                                        </div>
                                                                        <div style="width: 18%; float: left; border-right: 1px solid white;">
                                                                            Line Up Home
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            Sub
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            Market Value
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            P.M.Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Primary_Role
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role1
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            Alt.Role2
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            Rate
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            Titularity %
                                                                        </div>
                                                                    </div>
                                                                    <div v-for="item3 in item1.awayTeam1" :key="item3.index" style="display: flex; text-align: center; background: #e6b8b7">
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item3.sRole}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item3.mR}}
                                                                        </div>
                                                                        <div :style="{'height': '18px','overflow': 'hidden', 'width': '18%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'left', 'padding-left': '5px', 'background': item3.sub_order_color}">
                                                                            {{item3.Pname}}
                                                                        </div>
                                                                        <div style="width: 5%; float: left; border-right: 1px solid white;">
                                                                            {{item3.sub_minute}}
                                                                        </div>
                                                                        <div style="width: 15%; float: left; border-right: 1px solid white;">
                                                                            {{item3.marketValue}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item3.p_m_Role}}
                                                                        </div>
                                                                        <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'background': item3.rule_color}">
                                                                            {{item3.primaryRole}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item3.altRole1}}
                                                                        </div>
                                                                        <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                            {{item3.altRole2}}
                                                                        </div>
                                                                        <div style="width: 7%; float: left; border-right: 1px solid white;">
                                                                            {{item3.rating}}
                                                                        </div>
                                                                        <div style="width: 13%;">
                                                                            {{item3.Tit}}
                                                                        </div>
                                                                    </div>
                                                                    <br>
                                                                    <div style="display: flex">
                                                                        <div class="lineup-ans" style="flex: 1; text-align: center;">
                                                                            <label style="font-weight: 600; color: blue;">System of play used in the season:</label>
                                                                            <div v-for="(item0, index0) in item1.away_b_fmt_ans.ans" :key="index0 + 100">
                                                                                <div style="display: flex; display: flex; text-align: center;">
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.label}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.count}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{(item0.count/(item1.away_b_fmt_ans.counts + 0.00001)*100).toFixed(2)}}%
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="lineup-ans" style="flex: 1; text-align: center;">
                                                                            <label style="font-weight: 600; color: blue;">System of play used in away team:</label>
                                                                            <div v-for="(item0, index0) in item1.away_fmt_ans.ans" :key="index0 + 100">
                                                                                <div style="display: flex; display: flex; text-align: center;">
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.label}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{item0.count}}
                                                                                    </div>
                                                                                    <div style="flex: 1; font-weight: 600">
                                                                                        {{(item0.count/(item1.away_fmt_ans.counts + 0.00001)*100).toFixed(2)}}%
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <br>
                                                                    <div style="width: 100%">
                                                                        <div style="width: 20%; float: left; height: 62px; padding-left: 20px;">
                                                                            Role legend:
                                                                        </div>
                                                                        <div style="width: 40%; float: left; height: 62px;">
                                                                            <div style="display: flex;">
                                                                                <div style="flex: 1; height: 20px; background: #92d050; text-align: center;">{{item1.away_rule_set.green_color}}</div>
                                                                                <div style="flex: 2; padding-left: 5px;">Player in Role</div>
                                                                            </div>
                                                                            <div style="display: flex;">
                                                                                <div style="flex: 1; height: 20px; background: #ffff00; text-align: center;">{{item1.away_rule_set.yellow_color}}</div>
                                                                                <div style="flex: 2; padding-left: 5px;">Player in alternative Role</div>
                                                                            </div>
                                                                            <div style="display: flex;">
                                                                                <div style="flex: 1; height: 20px; background: #ff0000; text-align: center;">{{item1.away_rule_set.red_color}}</div>
                                                                                <div style="flex: 2; padding-left: 5px;">Player out of role</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style="width: 15%; float: left; height: 62px; text-align: right;">
                                                                            Subst.legend:
                                                                        </div>
                                                                        <div style="width: 25%; float: left; text-align: center; margin-bottom: 10px;">
                                                                            <div v-for="item4  in item1.away_legend" :key="item4.index" style="display: flex; width: 80%; margin: auto;">
                                                                                <div :style="{'flex': '1', 'height': '20px', 'background': item4.color}">{{item4.label}}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div style="display: flex;">
                                                            <div class="hometeam_info" style="flex: 0 0 50%">
                                                                <label style="color: red; font-weight: bold;">GK</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.home_players.gk_arrow.rating = !item1.home_players.gk_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.gk, current_sort_team = 'home', current_sort_group = 'GK', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.home_players.gk_arrow.rating">&#8593;</span><span v-if="!item1.home_players.gk_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.gk_arrow.goal = !item1.home_players.gk_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.gk, current_sort_team = 'home', current_sort_group = 'GK', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.home_players.gk_arrow.goal">&#8593;</span><span v-if="!item1.home_players.gk_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.gk_arrow.assist = !item1.home_players.gk_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.gk, current_sort_team = 'home', current_sort_group = 'GK', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.home_players.gk_arrow.assist">&#8593;</span><span v-if="!item1.home_players.gk_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.gk_arrow.Tit = !item1.home_players.gk_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.gk, current_sort_team = 'home', current_sort_group = 'GK', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.home_players.gk_arrow.Tit">&#8593;</span><span v-if="!item1.home_players.gk_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item5, index5 ) in item1.home_players.gk" :key="item5.player_name" v-if="index5 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item5.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.rating}}
                                                                    </div>
                                                                    <div v-if="item5.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item5.goal}} ({{item5.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item5.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item5.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="awayteam_info" style="flex: 0 0 50%; padding-left: 10px">
                                                                <label style="color: red; font-weight: bold;">GK</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.away_players.gk_arrow.rating = !item1.away_players.gk_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.gk, current_sort_team = 'away', current_sort_group = 'GK', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.away_players.gk_arrow.rating">&#8593;</span><span v-if="!item1.away_players.gk_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.gk_arrow.goal = !item1.away_players.gk_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.gk, current_sort_team = 'away', current_sort_group = 'GK', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.away_players.gk_arrow.goal">&#8593;</span><span v-if="!item1.away_players.gk_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.gk_arrow.assist = !item1.away_players.gk_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.gk, current_sort_team = 'away', current_sort_group = 'GK', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.away_players.gk_arrow.assist">&#8593;</span><span v-if="!item1.away_players.gk_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.gk_arrow.Tit = !item1.away_players.gk_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.gk, current_sort_team = 'away', current_sort_group = 'GK', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.away_players.gk_arrow.Tit">&#8593;</span><span v-if="!item1.away_players.gk_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item5, index5) in item1.away_players.gk" :key="item5.player_name" v-if="index5 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item5.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.rating}}
                                                                    </div>
                                                                    <div v-if="item5.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item5.goal}} ({{item5.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item5.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item5.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role2}}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div style="display: flex;">
                                                            <div class="hometeam_info" style="flex: 0 0 50%">
                                                                <label style="color: red; font-weight: bold;">DEF</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.home_players.def_arrow.rating = !item1.home_players.def_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.def, current_sort_team = 'home', current_sort_group = 'DEF', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.home_players.def_arrow.rating">&#8593;</span><span v-if="!item1.home_players.def_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.def_arrow.goal = !item1.home_players.def_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.def, current_sort_team = 'home', current_sort_group = 'DEF', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.home_players.def_arrow.goal">&#8593;</span><span v-if="!item1.home_players.def_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.def_arrow.assist = !item1.home_players.def_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.def, current_sort_team = 'home', current_sort_group = 'DEF', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.home_players.def_arrow.assist">&#8593;</span><span v-if="!item1.home_players.def_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.def_arrow.Tit = !item1.home_players.def_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.def, current_sort_team = 'home', current_sort_group = 'DEF', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.home_players.def_arrow.Tit">&#8593;</span><span v-if="!item1.home_players.def_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item5, index5 ) in item1.home_players.def" :key="item5.player_name" v-if="index5 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item5.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.rating}}
                                                                    </div>
                                                                    <div v-if="item5.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item5.goal}} ({{item5.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item5.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item5.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="awayteam_info" style="flex: 0 0 50%; padding-left: 10px">
                                                                <label style="color: red; font-weight: bold;">DEF</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.away_players.def_arrow.rating = !item1.away_players.def_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.def, current_sort_team = 'away', current_sort_group = 'DEF', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.away_players.def_arrow.rating">&#8593;</span><span v-if="!item1.away_players.def_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.def_arrow.goal = !item1.away_players.def_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.def, current_sort_team = 'away', current_sort_group = 'DEF', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.away_players.def_arrow.goal">&#8593;</span><span v-if="!item1.away_players.def_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.def_arrow.assist = !item1.away_players.def_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.def, current_sort_team = 'away', current_sort_group = 'DEF', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.away_players.def_arrow.assist">&#8593;</span><span v-if="!item1.away_players.def_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.def_arrow.Tit = !item1.away_players.def_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.def, current_sort_team = 'away', current_sort_group = 'DEF', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.away_players.def_arrow.Tit">&#8593;</span><span v-if="!item1.away_players.def_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item5, index5) in item1.away_players.def" :key="item5.player_name" v-if="index5 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item5.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.rating}}
                                                                    </div>
                                                                    <div v-if="item5.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item5.goal}} ({{item5.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item5.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item5.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role2}}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div style="display: flex;">
                                                            <div class="hometeam_info" style="flex: 0 0 50%">
                                                                <label style="color: red; font-weight: bold;">MID</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.home_players.mid_arrow.rating = !item1.home_players.mid_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.mid, current_sort_team = 'home', current_sort_group = 'MID', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.home_players.mid_arrow.rating">&#8593;</span><span v-if="!item1.home_players.mid_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.mid_arrow.goal = !item1.home_players.mid_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.mid, current_sort_team = 'home', current_sort_group = 'MID', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.home_players.mid_arrow.goal">&#8593;</span><span v-if="!item1.home_players.mid_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.mid_arrow.assist = !item1.home_players.mid_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.mid, current_sort_team = 'home', current_sort_group = 'MID', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.home_players.mid_arrow.assist">&#8593;</span><span v-if="!item1.home_players.mid_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.mid_arrow.Tit = !item1.home_players.mid_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.mid, current_sort_team = 'home', current_sort_group = 'MID', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.home_players.mid_arrow.Tit">&#8593;</span><span v-if="!item1.home_players.mid_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item6, index6 ) in item1.home_players.mid" :key="item6.player_name" v-if="index6 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item6.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item6.rating}}
                                                                    </div>
                                                                    <div v-if="item6.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item6.goal}} ({{item6.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item6.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item6.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item6.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item6.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item6.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item6.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item6.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="awayteam_info" style="flex: 0 0 50%; padding-left: 10px">
                                                                <label style="color: red; font-weight: bold;">MID</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.away_players.mid_arrow.rating = !item1.away_players.mid_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.mid, current_sort_team = 'away', current_sort_group = 'MID', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.away_players.mid_arrow.rating">&#8593;</span><span v-if="!item1.away_players.mid_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.mid_arrow.goal = !item1.away_players.mid_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.mid, current_sort_team = 'away', current_sort_group = 'MID', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.away_players.mid_arrow.goal">&#8593;</span><span v-if="!item1.away_players.mid_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.mid_arrow.assist = !item1.away_players.mid_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.mid, current_sort_team = 'away', current_sort_group = 'MID', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.away_players.mid_arrow.assist">&#8593;</span><span v-if="!item1.away_players.mid_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.mid_arrow.Tit = !item1.away_players.mid_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.mid, current_sort_team = 'away', current_sort_group = 'MID', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.away_players.mid_arrow.Tit">&#8593;</span><span v-if="!item1.away_players.mid_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item5, index5) in item1.away_players.mid" :key="item5.player_name"  v-if="index5 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item5.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.rating}}
                                                                    </div>
                                                                    <div v-if="item5.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item5.goal}} ({{item5.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item5.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item5.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div style="display: flex;">
                                                            <div class="hometeam_info" style="flex: 0 0 50%">
                                                                <label style="color: red; font-weight: bold;">FWD</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black; width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.home_players.fwd_arrow.rating = !item1.home_players.fwd_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.fwd, current_sort_team = 'home', current_sort_group = 'FWD', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.home_players.fwd_arrow.rating">&#8593;</span><span v-if="!item1.home_players.fwd_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.fwd_arrow.goal = !item1.home_players.fwd_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.fwd, current_sort_team = 'home', current_sort_group = 'FWD', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.home_players.fwd_arrow.goal">&#8593;</span><span v-if="!item1.home_players.fwd_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.fwd_arrow.assist = !item1.home_players.fwd_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.fwd, current_sort_team = 'home', current_sort_group = 'FWD', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.home_players.fwd_arrow.assist">&#8593;</span><span v-if="!item1.home_players.fwd_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.home_players.fwd_arrow.Tit = !item1.home_players.fwd_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.home_players.fwd, current_sort_team = 'home', current_sort_group = 'FWD', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.home_players.fwd_arrow.Tit">&#8593;</span><span v-if="!item1.home_players.fwd_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item7, index7 ) in item1.home_players.fwd" :key="item7.player_name" v-if="index7 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item7.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item7.rating}}
                                                                    </div>
                                                                    <div v-if="item7.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item7.goal}} ({{item7.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item7.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item7.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item7.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item7.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item7.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item7.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item7.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="awayteam_info" style="flex: 0 0 50%; padding-left: 10px">
                                                                <label style="color: red; font-weight: bold;">FWD</label>
                                                                <div style="display: flex; text-align: center; background: #d8e4bc; border-bottom: 1px solid white; height: 20px; color: black;width: 100%">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; text-align: left; padding-left: 10px;">
                                                                        Player Name
                                                                    </div>
                                                                    <div @click="item1.away_players.fwd_arrow.rating = !item1.away_players.fwd_arrow.rating, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.fwd, current_sort_team = 'away', current_sort_group = 'FWD', current_sort_field = 'rating', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Rating</span><span v-if="item1.away_players.fwd_arrow.rating">&#8593;</span><span v-if="!item1.away_players.fwd_arrow.rating">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.fwd_arrow.goal = !item1.away_players.fwd_arrow.goal, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.fwd, current_sort_team = 'away', current_sort_group = 'FWD', current_sort_field = 'goal', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Goal</span><span v-if="item1.away_players.fwd_arrow.goal">&#8593;</span><span v-if="!item1.away_players.fwd_arrow.goal">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.fwd_arrow.assist = !item1.away_players.fwd_arrow.assist, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.fwd, current_sort_team = 'away', current_sort_group = 'FWD', current_sort_field = 'assist', current_sort_teamId = item1.home_id, sort_function()" style="width: 10%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Assist</span><span v-if="item1.away_players.fwd_arrow.assist">&#8593;</span><span v-if="!item1.away_players.fwd_arrow.assist">&#8595;</span>
                                                                    </div>
                                                                    <div @click="item1.away_players.fwd_arrow.Tit = !item1.away_players.fwd_arrow.Tit, current_sort_direction = !current_sort_direction, current_sort_data = item1.away_players.fwd, current_sort_team = 'away', current_sort_group = 'FWD', current_sort_field = 'Tit', current_sort_teamId = item1.home_id, sort_function()" style="width: 15%; float: left; border-right: 1px solid white; cursor: pointer">
                                                                        <span style="float: left">Titularity</span><span v-if="item1.away_players.fwd_arrow.Tit">&#8593;</span><span v-if="!item1.away_players.fwd_arrow.Tit">&#8595;</span>
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white;">
                                                                        Market Value
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        P.M.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        S.Role
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R1
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white;">
                                                                        Alt.R2
                                                                    </div>
                                                                </div>
                                                                <div v-for="(item5, index5) in item1.away_players.fwd" :key="item5.player_name"  v-if="index5 < 5" style="display: flex; text-align: left; background: #d8e4bc">
                                                                    <div style="width: 25%; float: left; border-right: 1px solid white; padding-left: 10px;">
                                                                        {{item5.player_name}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.rating}}
                                                                    </div>
                                                                    <div v-if="item5.goal" :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        {{item5.goal}} ({{item5.goal_percentage}})
                                                                    </div>
                                                                    <div v-else :style="{'height': '18px','overflow': 'hidden', 'width': '15%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center', 'padding-left': '5px'}">
                                                                        -
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.assist}}
                                                                    </div>
                                                                    <div style="width: 15%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.Tit}}
                                                                    </div>
                                                                    <div style="width: 20%; float: left; border-right: 1px solid white; text-align: center">
                                                                        {{item5.market_value}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.roles}}
                                                                    </div>
                                                                    <div :style="{'width': '10%', 'float': 'left', 'border-right': '1px solid white', 'text-align': 'center'}">
                                                                        {{item5.s_role}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role1}}
                                                                    </div>
                                                                    <div style="width: 10%; float: left; border-right: 1px solid white; text-align: center;">
                                                                        {{item5.alt_role2}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div style="display: flex;">
                                                            <div class="hometeam_info" style="flex: 0 0 50%">
                                                                <div style="margin-top: 10px; clear: left;">
                                                                <label style="color: blue; font-weight: bold; font-size: 14px; float: left;">best formation by titularity</label>
                                                                <CSelect
                                                                        @click = "best_players = item1.local_p1, best_players_r = item1.local_p2, best_direction = 'home', best_id = item1.home_id"
                                                                        class="lineup-selector"
                                                                        :options="lineup_list"
                                                                        @update:value="select_best_position"
                                                                >
                                                                </CSelect>
                                                                <div v-if="item1.home_lineup">
                                                                    <div :style="{'width': (100*item1.home_best.gk.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray', 'clear': 'left'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">GK</label>
                                                                        <div v-for="item5 in item1.home_best.gk" :key="item5.player_name" :style="{'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.home_best.def.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">DEF</label>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best.def" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-if="item1.home_best.mid1.length > item1.home_best.mid2.length" :style="{'width': (100*item1.home_best.mid1.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best.mid1" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best.mid2" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else :style="{'width': (100*item1.home_best.mid2.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best.mid1" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best.mid2" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.home_best.fwd.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">FWD</label>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best.fwd" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>

                                                                    <label style="color: blue; font-weight: bold; font-size: 14px; float: left;">best formation by rating</label>
                                                                    <div :style="{'width': (100*item1.home_best1.gk.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray', 'clear': 'left'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">GK</label>
                                                                        <div v-for="item5 in item1.home_best1.gk"  :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.home_best1.def.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">DEF</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.home_best1.def" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-if="item1.home_best1.mid1.length > item1.home_best1.mid2.length" :style="{'width': (100*item1.home_best1.mid1.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.home_best1.mid1" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.home_best1.mid2" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else :style="{'width': (100*item1.home_best1.mid2.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.home_best1.mid1" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.home_best1.mid2" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.home_best1.fwd.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">FWD</label>
                                                                        <div style="display: flex;">
                                                                            <div  v-for="item5 in item1.home_best1.fwd" :key="item5.player_name" :style="{'flex': 1, 'border': '1px solid ' + item5.color}"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div v-else style="clear: left; text-align: center;">info not available...</div>
                                                            </div>
                                                            </div>
                                                            <div class="awayteam_info" style="flex: 0 0 50%; padding-left: 10px">
                                                                <div style="margin-top: 10px; clear: left;">
                                                                <label style="color: blue; font-weight: bold; font-size: 14px; float: left">best formation by titularity</label>
                                                                <CSelect
                                                                        @click = "best_players = item1.visit_p1,best_players_r = item1.visit_p2, best_direction = 'away', best_id = item1.away_id"
                                                                        class="lineup-selector"
                                                                        :options="lineup_list"
                                                                        @update:value="select_best_position"
                                                                >
                                                                </CSelect>
                                                                <div v-if="item1.home_lineup">
                                                                    <div :style="{'width': (100*item1.away_best.gk.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray', 'clear': 'left'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">GK</label>
                                                                        <div v-for="item5 in item1.away_best.gk" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.away_best.def.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">DEF</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best.def" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-if="item1.away_best.mid1.length > item1.away_best.mid2.length" :style="{'width': (100*item1.away_best.mid1.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best.mid1" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best.mid2" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else :style="{'width': (100*item1.away_best.mid2.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best.mid1" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best.mid2" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.away_best.fwd.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">FWD</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best.fwd" :key="item5.player_id" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>

                                                                    <label style="color: blue; font-weight: bold; font-size: 14px; float: left">best formation by rating</label>
                                                                    <div :style="{'width': (100*item1.away_best1.gk.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray', 'clear': 'left'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">GK</label>
                                                                        <div v-for="item5 in item1.away_best1.gk" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.away_best1.def.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">DEF</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best1.def" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-if="item1.away_best1.mid1.length > item1.away_best1.mid2.length" :style="{'width': (100*item1.away_best1.mid1.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best1.mid1" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best1.mid2" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else :style="{'width': (100*item1.away_best1.mid2.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">MID</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best1.mid1" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best1.mid2" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                    <div :style="{'width': (100*item1.away_best1.fwd.length) + 'px', 'margin': 'auto', 'text-align': 'center', 'border': '1px solid lightgray',  'margin-top': '10px'}">
                                                                        <label style="color: red; font-weight: bold; margin: 0">FWD</label>
                                                                        <div style="display: flex;">
                                                                            <div v-for="item5 in item1.away_best1.fwd" :key="item5.player_name" style="flex: 1"><p style="margin-bottom: 0; color: red">{{item5.s_role}}</p>{{item5.player_name}}<p style="margin-bottom: 0;">({{item5.tit}})</p></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div v-else style="clear: left; text-align: center;">info not available...</div>
                                                            </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </CCol>
                                            </CRow>
                                        </div>
                                    </div>
                                </div>
                            </CCollapse>
                        </div>
                    </CCollapse>
                </div>
            </div>
        </CCard>
    </div>
</template>
<script>
    import LiveStatsAnalysis from "./LiveStatsAnalysis";
    export default {
        name: 'StatsList',
        components: {
            LiveStatsAnalysis
        },
        data () {
            return {
                style_current_tag: {'color': 'blue', 'border-bottom': '2px solid blue', 'font-weight': 'bold'},
                style_past_tag: {'color': 'gray', 'border-bottom': '1px solid gray', 'font-weight': 'normal'},
                currentData: true,
                pastData: false,

                clock: null,
                clock1: null,
                clock2: null,
                clock3: null,
                clock4: null,
                current_week: 0,
                isload: false,
                counter: 100,
                current_counter: 0,

                current_sort_field: "",
                current_sort_data: [],
                current_sort_teamId: 0,
                current_sort_direction: true,
                current_sort_team: "home",
                current_sort_group: "DEF",
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
                sub_color_set:[
                    {'color': '#c6d9ec', 'label': '1st Substitution'},
                    {'color': '#9fbedf', 'label': '2nd Substitution'},
                    {'color': '#79a6d2', 'label': '3rd Substitution'},
                    {'color': '#6699cc', 'label': '4th Substitution'},
                    {'color': '#538cc6', 'label': '5th Substitution'},
                    {'color': '#4080be', 'label': '6th Substitution'},
                    {'color': '#4080be', 'label': '7th Substitution'},
                    {'color': '#4080be', 'label': '8th Substitution'},
                    {'color': '#4080be', 'label': '9th Substitution'},
                    {'color': '#4080be', 'label': '10th Substitution'},
                    {'color': '#4080be', 'label': '8th Substitution'},
                    {'color': '#4080be', 'label': '9th Substitution'},
                    {'color': '#4080be', 'label': '10th Substitution'},
                ],
                s_role_set:[
                    {
                        "name": "4-3-1-2",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "CM", "CM", "CM", "AM", "CF", "CF"],
                        "alt_s_role":["", "RM", "", "", "LM", "RM", "DM", "LM", "", "SS", ""],
                        "alt_s_role1":["", "RW", "", "", "LW", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "4-3-3",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "CM", "CM", "CM", "RW", "CF", "LW"],
                        "alt_s_role":["", "RM", "", "", "LM", "RM", "DM", "LM", "", "", ""],
                        "alt_s_role1":["", "RW", "", "", "LW", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "FWD", "FWD", "FWD"]
                    },
                    {
                        "name": "4-3-2-1",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "CM", "CM", "CM", "AM", "AM", "CF"],
                        "alt_s_role":["", "RM", "", "", "LM", "RM", "DM", "LM", "", "SS", ""],
                        "alt_s_role1":["", "RW", "", "", "LW", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "4-4-2",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "RM", "CM", "CM", "LM", "CF", "CF"],
                        "alt_s_role":["", "RM", "", "", "LM", "RW", "DM", "DM", "LW", "SS", ""],
                        "alt_s_role1":["", "RW", "", "", "LW", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "4-2-3-1",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "DM", "DM", "RM", "AM", "LM", "CF"],
                        "alt_s_role":["", "RM", "", "", "LM", "CM", "CM", "RW", "", "LW", ""],
                        "alt_s_role1":["", "RW", "", "", "LW", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "4-4-1-1",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "RM", "CM", "CM", "LM", "SS", "CF"],
                        "alt_s_role":["", "RM", "", "", "LM", "RW", "DM", "DM", "LW", "AM", ""],
                        "alt_s_role1":["", "RW", "", "", "LW", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "5-4-1",
                        "s_role":["GK", "RB", "CB", "CB", "CB", "LB", "RM", "CM", "CM", "LM", "CF"],
                        "alt_s_role":["", "RM", "", "", "", "LM", "RW", "DM", "DM", "LW", ""],
                        "alt_s_role1":["", "RW", "", "", "", "LW", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "3-4-1-2",
                        "s_role":["GK", "CB", "CB", "CB", "RM", "CM", "CM", "LM", "AM", "CF", "CF"],
                        "alt_s_role":["", "RB", "", "LB", "", "DM", "DM", "", "", "SS", ""],
                        "alt_s_role1":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "3-5-2",
                        "s_role":["GK", "CB", "CB", "CB", "RM", "CM", "CM", "CM", "LM", "CF", "CF"],
                        "alt_s_role":["", "RB", "", "LB", "RB", "DM", "DM", "DM", "LB", "SS", ""],
                        "alt_s_role1":["", "", "", "", "RW", "", "", "", "LW", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "3-5-1-1",
                        "s_role":["GK", "CB", "CB", "CB", "RM", "CM", "CM", "CM", "LM", "AM", "CF"],
                        "alt_s_role":["", "RB", "", "LB", "RB", "DM", "DM", "DM", "LB", "", ""],
                        "alt_s_role1":["", "", "", "", "RW", "", "", "", "LW", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "3-4-2-1",
                        "s_role":["GK", "CB", "CB", "CB", "RM", "CM", "CM", "LM", "AM", "AM", "CF"],
                        "alt_s_role":["", "RB", "", "LB", "", "DM", "DM", "", "", "SS", ""],
                        "alt_s_role1":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "5-3-2",
                        "s_role":["GK", "RB", "CB", "CB", "CB", "LB", "CM", "CM", "CM", "CF", "CF"],
                        "alt_s_role":["", "RM", "", "", "", "LM", "RM", "DM", "LM", "SS", ""],
                        "alt_s_role1":["", "RW", "", "", "", "LW", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "5-3-1-1",
                        "s_role":["GK", "RB", "CB", "CB", "CB", "LB", "CM", "CM", "CM", "AM", "CF"],
                        "alt_s_role":["", "RM", "", "", "", "LM", "RM", "DM", "LM", "", ""],
                        "alt_s_role1":["", "RW", "", "", "", "LW", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "4-5-1",
                        "s_role":["GK", "RB", "CB", "CB", "LB", "RM", "CM", "CM", "CM", "LM", "CF"],
                        "alt_s_role":["", "RM", "", "", "LM", "RW", "DM", "DM", "DM", "LW", ""],
                        "alt_s_role1":["", "RW", "", "", "LW", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "4-1-4-1",
                        "s_role":["GK", "CB", "CB", "CB", "CB", "DM", "RM", "CM", "CM", "LM", "CF"],
                        "alt_s_role":["", "RB", "", "", "LB", "CM", "AM", "AM", "AM", "AM", ""],
                        "alt_s_role1":["", "", "", "", "", "", "RW", "DM", "DM", "LW", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD"]
                    },
                    {
                        "name": "4-1-3-2",
                        "s_role":["GK", "CB", "CB", "CB", "CB", "DM", "AM", "AM", "AM", "CF", "CF"],
                        "alt_s_role":["", "RB", "", "", "LB", "CM", "RM", "", "LM", "SS", ""],
                        "alt_s_role1":["", "", "", "", "", "", "RW", "", "LW", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                    {
                        "name": "3-4-3",
                        "s_role":["GK", "CB", "CB", "CB", "RM", "CM", "CM", "LM", "RW", "CF", "LW"],
                        "alt_s_role":["", "RB", "", "LB", "CM", "DM", "DM", "CM", "", "", ""],
                        "alt_s_role1":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "FWD", "FWD", "FWD"]
                    },
                    {
                        "name": "3-1-4-2",
                        "s_role":["GK", "CB", "CB", "CB", "DM", "RM", "CM", "CM", "LM", "CF", "CF"],
                        "alt_s_role":["", "RB", "", "LB", "CM", "RW", "", "", "LW", "SS", ""],
                        "alt_s_role1":["", "", "", "", "", "", "", "", "", "", ""],
                        "mean_role":["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "FWD", "FWD"]
                    },
                ],
                lineup_list:[
                    { value: '0', label: 'Auto'},
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
                selected_team: '',
                selected_direction: '',
                alert: false,

                best_players: null,
                best_players_r:null,
                best_direction: null,
                best_id: null
            }
        },
        // sub_color_set:[
        //     'rgba(236,242,249)',
        //     'rgba(217,230,242)',
        //     '#c6d9ec',
        //     '#b3cce6',
        //     '#9fbedf',
        //     '#8cb3d9',
        //     '#79a6d2',
        //     '#6699cc',
        //     '#538cc6',
        //     '#4080be'
        // ]
        methods: {
            showModal() {
                this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
            },
            hideModal() {
                this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
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

                if(data.localTeamId === 1858){
                    console.log('percentage calculation', name1, p)
                }

                return [p, name1]
            },
            select_lineup(value){
                for(let i = 0 ; i < this.mainList.length ; i++){
                    for(let j = 0 ; j < this.mainList[i].events.length ; j++){
                        let eventNode = this.mainList[i].events[j]
                        if(this.selected_direction === 'home' && this.selected_team === eventNode.homeTeamName){
                            if(value !== '0'){
                                let temp2 =  JSON.stringify(eventNode.homeTeam3)
                                let temp3 =  JSON.stringify(eventNode.homeTeam3)
                                let homeTeam2 = JSON.parse(temp2)
                                let homeTeam3 = JSON.parse(temp3)

                                console.log('homeTeam2===>', homeTeam2, homeTeam3)
                                for(let k = 0 ; k < homeTeam2.length ; k++){
                                    homeTeam2[k].order_key = 0
                                    homeTeam3[k].order_key = 0
                                }

                                let s_roles = this.s_role_set.filter(function(item) {
                                    return item.name === value;
                                });
                                if(s_roles.length > 0) {
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role || s_role22 === main_role) && (position === mean_role) && alt_role1 === '' && alt_role2 === '') {
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'blue'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }

                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role|| s_role22 === main_role) && (position === mean_role)){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((position === mean_role) && ((s_role === alt_role1 || s_role === alt_role2) || ((s_role12 === alt_role1 || s_role12 === alt_role2) && s_role12 != '') || ((s_role22 === alt_role1 || s_role22 === alt_role2) && s_role22 != ''))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((position === mean_role)){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }

                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role || s_role22 === main_role) && (alt_role1 === '' || alt_role2 === '')){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((position === mean_role) && (((alt_role1 === s_role || alt_role1 === s_role12 || alt_role1 === s_role22) && (alt_role1 != '')) || ((alt_role2 === s_role || alt_role2 === s_role12 || alt_role2 === s_role22) && (alt_role2 != '')))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if(position === mean_role){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if(((alt_role1 === s_role || alt_role1 === s_role12 || alt_role1 === s_role22) && (alt_role1 != '')) || ((alt_role2 === s_role || alt_role2 === s_role12 || alt_role2 === s_role22) && (alt_role2 != ''))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        if(homeTeam3[k].order_key === 0){
                                            let mean_role = homeTeam3[k].mR
                                            for(let kk = 0 ; kk < 11 ; kk++){
                                                if(homeTeam2[kk].order_key === 0){
                                                    let mean_role1 = homeTeam2[kk].mR
                                                    let s_role = homeTeam2[kk].sRole
                                                    if(mean_role === 'DEF'){
                                                        if(mean_role1 === 'DEF'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'MID'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'FWD'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                    }
                                                    else if(mean_role === 'MID'){
                                                        if(mean_role1 === 'MID'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'FWD'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'DEF'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                    }
                                                    else if(mean_role === 'FWD'){
                                                        if(mean_role1 === 'FWD'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'MID'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'DEF'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                    }
                                                    break
                                                }
                                            }
                                        }
                                    }
                                }
                                this.mainList[i].events[j].homeTeam = homeTeam2
                                //-------------------------------------------------------
                                // for(let k = 0 ; k < eventNode.homeTeam.length ; k++){
                                //     let s_roles = this.s_role_set.filter(function(item) {
                                //         return item.name === value;
                                //     });
                                //     console.log('s roles===>', s_roles, eventNode.homeTeam[k])
                                //     if(s_roles.length > 0){
                                //         let position_number = eventNode.homeTeam[k].formation_position
                                //         // let s_role = s_roles[0].s_role[k]
                                //         // let s_role12 = s_roles[0].alt_s_role[k]
                                //         // let mean_role = s_roles[0].mean_role[k]
                                //
                                //         let s_role = s_roles[0].s_role[position_number - 1]
                                //         let s_role12 = s_roles[0].alt_s_role[position_number - 1]
                                //         let mean_role = s_roles[0].mean_role[position_number - 1]
                                //
                                //         this.mainList[i].events[j].homeTeam[k].sRole = s_role
                                //         this.mainList[i].events[j].homeTeam[k].sRole2 = s_role12
                                //         this.mainList[i].events[j].homeTeam[k].mR = mean_role
                                //         console.log('s_role=>', s_role)
                                //         console.log('s_role12=>', s_role12)
                                //         console.log('mean_role=>', mean_role)
                                //         console.log('formation_position=>', position_number)
                                //         let main_role = this.mainList[i].events[j].homeTeam[k].primaryRole
                                //         let position = this.mainList[i].events[j].homeTeam[k].p_m_Role
                                //         let alt_role1 = this.mainList[i].events[j].homeTeam[k].altRole1
                                //         let alt_role2 = this.mainList[i].events[j].homeTeam[k].altRole2
                                //         let s_role2 = this.mainList[i].events[j].homeTeam[k].sRole2
                                //         let rule_color = 'rgb(216, 228, 188)'
                                //         if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                //             rule_color = 'rgb(146,208,80)'
                                //         }
                                //         else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                //             rule_color = 'rgb(255,255,0)'
                                //         }
                                //         else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                //             rule_color = 'rgb(255,0,0)'
                                //         }
                                //         this.mainList[i].events[j].homeTeam[k].rule_color = rule_color
                                //     }
                                // }
                            }
                            else{
                                for(let k = 0 ; k < eventNode.homeTeam.length ; k++){
                                    this.mainList[i].events[j].homeTeam[k] = eventNode.homeTeam3[k]
                                    // this.mainList[i].events[j].homeTeam[k].sRole = eventNode.homeTeam3[k].sRole1
                                    // this.mainList[i].events[j].homeTeam[k].mR = eventNode.homeTeam3[k].mR1
                                    // this.mainList[i].events[j].homeTeam[k].rule_color = eventNode.homeTeam3[k].rule_color
                                }
                            }
                        }
                        else if(this.selected_direction === 'away' && this.selected_team === eventNode.awayTeamName){
                            if(value !== '0'){
                                let temp2 =  JSON.stringify(eventNode.awayTeam3)
                                let temp3 =  JSON.stringify(eventNode.awayTeam3)
                                let homeTeam2 = JSON.parse(temp2)
                                let homeTeam3 = JSON.parse(temp3)

                                console.log('homeTeam2===>', homeTeam2, homeTeam3)
                                for(let k = 0 ; k < homeTeam2.length ; k++){
                                    homeTeam2[k].order_key = 0
                                    homeTeam3[k].order_key = 0
                                }

                                let s_roles = this.s_role_set.filter(function(item) {
                                    return item.name === value;
                                });
                                if(s_roles.length > 0) {
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role || s_role22 === main_role) && (position === mean_role) && alt_role1 === '' && alt_role2 === '') {
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'blue'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }

                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role|| s_role22 === main_role) && (position === mean_role)){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((position === mean_role) && ((s_role === alt_role1 || s_role === alt_role2) || ((s_role12 === alt_role1 || s_role12 === alt_role2) && s_role12 != '') || ((s_role22 === alt_role1 || s_role22 === alt_role2) && s_role22 != ''))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((position === mean_role)){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }

                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role || s_role22 === main_role) && (alt_role1 === '' || alt_role2 === '')){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((position === mean_role) && (((alt_role1 === s_role || alt_role1 === s_role12 || alt_role1 === s_role22) && (alt_role1 != '')) || ((alt_role2 === s_role || alt_role2 === s_role12 || alt_role2 === s_role22) && (alt_role2 != '')))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if(position === mean_role){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if(((alt_role1 === s_role || alt_role1 === s_role12 || alt_role1 === s_role22) && (alt_role1 != '')) || ((alt_role2 === s_role || alt_role2 === s_role12 || alt_role2 === s_role22) && (alt_role2 != ''))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        if(homeTeam3[k].order_key === 0){
                                            let mean_role = homeTeam3[k].mR
                                            for(let kk = 0 ; kk < 11 ; kk++){
                                                if(homeTeam2[kk].order_key === 0){
                                                    let mean_role1 = homeTeam2[kk].mR
                                                    let s_role = homeTeam2[kk].sRole
                                                    if(mean_role === 'DEF'){
                                                        if(mean_role1 === 'DEF'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'MID'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'FWD'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                    }
                                                    else if(mean_role === 'MID'){
                                                        if(mean_role1 === 'MID'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'FWD'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'DEF'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                    }
                                                    else if(mean_role === 'FWD'){
                                                        if(mean_role1 === 'FWD'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'MID'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'DEF'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                    }
                                                    break
                                                }
                                            }
                                        }
                                    }
                                }
                                this.mainList[i].events[j].awayTeam = homeTeam2
                                //-------------------------------------------------------
                                // for(let k = 0 ; k < eventNode.awayTeam.length ; k++){
                                //     let s_roles = this.s_role_set.filter(function(item) {
                                //         return item.name === value;
                                //     });
                                //     if(s_roles.length > 0){
                                //         let position_number = eventNode.awayTeam[k].formation_position
                                //         // let s_role = s_roles[0].s_role[k]
                                //         // let s_role12 = s_roles[0].alt_s_role[k]
                                //         // let mean_role = s_roles[0].mean_role[k]
                                //
                                //         let s_role = s_roles[0].s_role[position_number - 1]
                                //         let s_role12 = s_roles[0].alt_s_role[position_number - 1]
                                //         let mean_role = s_roles[0].mean_role[position_number - 1]
                                //
                                //         this.mainList[i].events[j].awayTeam[k].sRole = s_role
                                //         this.mainList[i].events[j].awayTeam[k].sRole2 = s_role12
                                //         this.mainList[i].events[j].awayTeam[k].mR = mean_role
                                //         let main_role = this.mainList[i].events[j].awayTeam[k].primaryRole
                                //         let position = this.mainList[i].events[j].awayTeam[k].p_m_Role
                                //         let alt_role1 = this.mainList[i].events[j].awayTeam[k].altRole1
                                //         let alt_role2 = this.mainList[i].events[j].awayTeam[k].altRole2
                                //         let s_role2 = this.mainList[i].events[j].awayTeam[k].sRole2
                                //         let rule_color = 'rgb(230,184,183)'
                                //         if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                //             rule_color = 'rgb(146,208,80)'
                                //         }
                                //         else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                //             rule_color = 'rgb(255,255,0)'
                                //         }
                                //         else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                //             rule_color = 'rgb(255,0,0)'
                                //         }
                                //         this.mainList[i].events[j].awayTeam[k].rule_color = rule_color
                                //     }
                                // }
                            }
                            else{
                                for(let k = 0 ; k < eventNode.homeTeam.length ; k++){
                                    this.mainList[i].events[j].awayTeam[k] = eventNode.awayTeam3[k]
                                    // this.mainList[i].events[j].awayTeam[k].sRole = eventNode.awayTeam3[k].sRole1
                                    // this.mainList[i].events[j].awayTeam[k].mR = eventNode.awayTeam3[k].mR1
                                    // this.mainList[i].events[j].awayTeam[k].rule_color = eventNode.awayTeam3[k].rule_color
                                }
                            }
                        }

                        let home_rule_color_number = {"green_color": 0, "yellow_color": 0, "red_color": 0}
                        for(let pp = 0 ; pp < this.mainList[i].events[j].homeTeam.length ; pp++){
                            if(this.mainList[i].events[j].homeTeam[pp].rule_color === 'rgb(146,208,80)'){
                                home_rule_color_number.green_color++
                            }
                            else if(this.mainList[i].events[j].homeTeam[pp].rule_color === 'rgb(255,255,0)'){
                                home_rule_color_number.yellow_color++
                            }
                            else if(this.mainList[i].events[j].homeTeam[pp].rule_color === 'rgb(255,0,0)'){
                                home_rule_color_number.red_color++
                            }
                        }

                        let away_rule_color_number = {"green_color": 0, "yellow_color": 0, "red_color": 0}
                        for(let pp = 0 ; pp < this.mainList[i].events[j].awayTeam.length ; pp++){
                            if(this.mainList[i].events[j].awayTeam[pp].rule_color === 'rgb(146,208,80)'){
                                away_rule_color_number.green_color++
                            }
                            else if(this.mainList[i].events[j].awayTeam[pp].rule_color === 'rgb(255,255,0)'){
                                away_rule_color_number.yellow_color++
                            }
                            else if(this.mainList[i].events[j].awayTeam[pp].rule_color === 'rgb(255,0,0)'){
                                away_rule_color_number.red_color++
                            }
                        }
                        this.mainList[i].events[j].home_rule_set = home_rule_color_number
                        this.mainList[i].events[j].away_rule_set = away_rule_color_number
                    }
                }
            },
            select_lineup1(value){
                for(let i = 0 ; i < this.mainList.length ; i++){
                    for(let j = 0 ; j < this.mainList[i].events.length ; j++){
                        let eventNode = this.mainList[i].events[j]
                        if(this.selected_direction === 'home' && this.selected_team === eventNode.homeTeamName){
                            if(value !== '0'){
                                let temp2 =  JSON.stringify(eventNode.homeTeam2)
                                let temp3 =  JSON.stringify(eventNode.homeTeam2)
                                let homeTeam2 = JSON.parse(temp2)
                                let homeTeam3 = JSON.parse(temp3)
                                for(let k = 0 ; k < homeTeam2.length ; k++){
                                    homeTeam2[k].order_key = 0
                                    homeTeam3[k].order_key = 0
                                }

                                let s_roles = this.s_role_set.filter(function(item) {
                                    return item.name === value;
                                });
                                if(s_roles.length > 0) {
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role || s_role22 === main_role) && (position === mean_role) && alt_role1 === '' && alt_role2 === '') {
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'blue'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }

                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role|| s_role22 === main_role) && (position === mean_role)){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((position === mean_role) && ((s_role === alt_role1 || s_role === alt_role2) || ((s_role12 === alt_role1 || s_role12 === alt_role2) && s_role12 != '') || ((s_role22 === alt_role1 || s_role22 === alt_role2) && s_role22 != ''))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((position === mean_role)){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }

                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role || s_role22 === main_role) && (alt_role1 === '' || alt_role2 === '')){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((position === mean_role) && (((alt_role1 === s_role || alt_role1 === s_role12 || alt_role1 === s_role22) && (alt_role1 != '')) || ((alt_role2 === s_role || alt_role2 === s_role12 || alt_role2 === s_role22) && (alt_role2 != '')))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if(position === mean_role){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if(((alt_role1 === s_role || alt_role1 === s_role12 || alt_role1 === s_role22) && (alt_role1 != '')) || ((alt_role2 === s_role || alt_role2 === s_role12 || alt_role2 === s_role22) && (alt_role2 != ''))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        if(homeTeam3[k].order_key === 0){
                                            let mean_role = homeTeam3[k].mR
                                            for(let kk = 0 ; kk < 11 ; kk++){
                                                if(homeTeam2[kk].order_key === 0){
                                                    let mean_role1 = homeTeam2[kk].mR
                                                    let s_role = homeTeam2[kk].sRole
                                                    if(mean_role === 'DEF'){
                                                        if(mean_role1 === 'DEF'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'MID'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'FWD'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                    }
                                                    else if(mean_role === 'MID'){
                                                        if(mean_role1 === 'MID'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'FWD'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'DEF'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                    }
                                                    else if(mean_role === 'FWD'){
                                                        if(mean_role1 === 'FWD'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'MID'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'DEF'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                    }
                                                    break
                                                }
                                            }
                                        }
                                    }
                                }
                                this.mainList[i].events[j].homeTeam1 = homeTeam2
                            }
                            else{
                                for(let k = 0 ; k < eventNode.homeTeam2.length ; k++){
                                    this.mainList[i].events[j].homeTeam1[k] = eventNode.homeTeam2[k]
                                    // this.mainList[i].events[j].homeTeam1[k].sRole = eventNode.homeTeam2[k].sRole1
                                    // this.mainList[i].events[j].homeTeam1[k].mR = eventNode.homeTeam2[k].mR1
                                    // this.mainList[i].events[j].homeTeam1[k].rule_color = eventNode.homeTeam2[k].rule_color
                                }
                            }
                        }
                        else if(this.selected_direction === 'away' && this.selected_team === eventNode.awayTeamName){
                            if(value !== '0'){
                                let temp2 =  JSON.stringify(eventNode.awayTeam2)
                                let temp3 =  JSON.stringify(eventNode.awayTeam2)
                                let homeTeam2 = JSON.parse(temp2)
                                let homeTeam3 = JSON.parse(temp3)
                                console.log('homeTeam2===>', homeTeam2, homeTeam3)
                                for(let k = 0 ; k < homeTeam2.length ; k++){
                                    homeTeam2[k].order_key = 0
                                    homeTeam3[k].order_key = 0
                                }

                                let s_roles = this.s_role_set.filter(function(item) {
                                    return item.name === value;
                                });
                                if(s_roles.length > 0) {
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role || s_role22 === main_role) && (position === mean_role) && alt_role1 === '' && alt_role2 === '') {
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'blue'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }

                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role|| s_role22 === main_role) && (position === mean_role)){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((position === mean_role) && ((s_role === alt_role1 || s_role === alt_role2) || ((s_role12 === alt_role1 || s_role12 === alt_role2) && s_role12 != '') || ((s_role22 === alt_role1 || s_role22 === alt_role2) && s_role22 != ''))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((position === mean_role)){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'green'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }

                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((s_role === main_role || s_role12 === main_role || s_role22 === main_role) && (alt_role1 === '' || alt_role2 === '')){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if((position === mean_role) && (((alt_role1 === s_role || alt_role1 === s_role12 || alt_role1 === s_role22) && (alt_role1 != '')) || ((alt_role2 === s_role || alt_role2 === s_role12 || alt_role2 === s_role22) && (alt_role2 != '')))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if(position === mean_role){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        let s_role = s_roles[0].s_role[k]
                                        let s_role12 = s_roles[0].alt_s_role[k]
                                        let s_role22 = s_roles[0].alt_s_role1[k]
                                        let mean_role = s_roles[0].mean_role[k]
                                        homeTeam2[k].sRole = s_role
                                        homeTeam2[k].sRole2 = s_role12
                                        homeTeam2[k].mR = mean_role
                                        for(let kk = 0 ; kk < homeTeam3.length ; kk++){
                                            if(homeTeam3[kk].order_key === 0 && homeTeam2[k].order_key === 0){
                                                let main_role = homeTeam3[kk].primaryRole
                                                let position = homeTeam3[kk].p_m_Role
                                                let alt_role1 = homeTeam3[kk].altRole1
                                                let alt_role2 = homeTeam3[kk].altRole2
                                                let s_role2 = homeTeam2[kk].sRole2

                                                if (alt_role1 === '...' || alt_role1 === '') {
                                                    alt_role1 = ''
                                                }
                                                if (alt_role2 === '...' || alt_role2 === '') {
                                                    alt_role2 = ''
                                                }
                                                if(((alt_role1 === s_role || alt_role1 === s_role12 || alt_role1 === s_role22) && (alt_role1 != '')) || ((alt_role2 === s_role || alt_role2 === s_role12 || alt_role2 === s_role22) && (alt_role2 != ''))){
                                                    homeTeam2[k].Pname = homeTeam3[kk].Pname
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].marketValue = homeTeam3[kk].marketValue
                                                    homeTeam2[k].playerId = homeTeam3[kk].playerId
                                                    homeTeam2[k].formation_position = homeTeam3[kk].formation_position
                                                    homeTeam2[k].teamId = homeTeam3[kk].teamId
                                                    homeTeam2[k].mR1 = homeTeam3[kk].mR1
                                                    homeTeam2[k].p_m_Role = homeTeam3[kk].p_m_Role
                                                    homeTeam2[k].primaryRole = homeTeam3[kk].primaryRole
                                                    homeTeam2[k].altRole1 = homeTeam3[kk].altRole1
                                                    homeTeam2[k].altRole2 = homeTeam3[kk].altRole2
                                                    homeTeam2[k].sub_order_color = homeTeam3[kk].sub_order_color
                                                    homeTeam2[k].sub_minute = homeTeam3[kk].sub_minute
                                                    homeTeam2[k].rule_color = 'pink'
                                                    homeTeam2[k].Tit = homeTeam3[kk].Tit
                                                    homeTeam2[k].order_key = 1
                                                    homeTeam3[kk].order_key = 1
                                                }
                                            }
                                        }
                                    }
                                    for(let k = 0 ; k < 11 ; k++){
                                        if(homeTeam3[k].order_key === 0){
                                            let mean_role = homeTeam3[k].mR
                                            for(let kk = 0 ; kk < 11 ; kk++){
                                                if(homeTeam2[kk].order_key === 0){
                                                    let mean_role1 = homeTeam2[kk].mR
                                                    let s_role = homeTeam2[kk].sRole
                                                    if(mean_role === 'DEF'){
                                                        if(mean_role1 === 'DEF'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'MID'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'FWD'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                    }
                                                    else if(mean_role === 'MID'){
                                                        if(mean_role1 === 'MID'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'FWD'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'DEF'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                    }
                                                    else if(mean_role === 'FWD'){
                                                        if(mean_role1 === 'FWD'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'MID'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                        else if(mean_role1 === 'DEF'){
                                                            homeTeam2[kk] = homeTeam3[k]
                                                            homeTeam2[kk].sRole = s_role
                                                            homeTeam2[kk].mR = mean_role1
                                                            homeTeam2[kk].rule_color = 'gray'
                                                            homeTeam2[kk].order_key = 1
                                                            homeTeam3[k].order_key = 1
                                                        }
                                                    }
                                                    break
                                                }
                                            }
                                        }
                                    }
                                }
                                this.mainList[i].events[j].awayTeam1 = homeTeam2
                            }
                            else{
                                for(let k = 0 ; k < eventNode.homeTeam.length ; k++){
                                    this.mainList[i].events[j].awayTeam1[k] = eventNode.awayTeam2[k]
                                    // this.mainList[i].events[j].awayTeam1[k].sRole = eventNode.awayTeam2[k].sRole1
                                    // this.mainList[i].events[j].awayTeam1[k].mR = eventNode.awayTeam2[k].mR1
                                    // this.mainList[i].events[j].awayTeam1[k].rule_color = eventNode.awayTeam2[k].rule_color
                                }
                            }
                        }

                        let home_rule_color_number = {"green_color": 0, "yellow_color": 0, "red_color": 0}
                        for(let pp = 0 ; pp < this.mainList[i].events[j].homeTeam1.length ; pp++){
                            if(this.mainList[i].events[j].homeTeam1[pp].rule_color === 'rgb(146,208,80)'){
                                home_rule_color_number.green_color++
                            }
                            else if(this.mainList[i].events[j].homeTeam1[pp].rule_color === 'rgb(255,255,0)'){
                                home_rule_color_number.yellow_color++
                            }
                            else if(this.mainList[i].events[j].homeTeam1[pp].rule_color === 'rgb(255,0,0)'){
                                home_rule_color_number.red_color++
                            }
                        }

                        let away_rule_color_number = {"green_color": 0, "yellow_color": 0, "red_color": 0}
                        for(let pp = 0 ; pp < this.mainList[i].events[j].awayTeam1.length ; pp++){
                            if(this.mainList[i].events[j].awayTeam1[pp].rule_color === 'rgb(146,208,80)'){
                                away_rule_color_number.green_color++
                            }
                            else if(this.mainList[i].events[j].awayTeam1[pp].rule_color === 'rgb(255,255,0)'){
                                away_rule_color_number.yellow_color++
                            }
                            else if(this.mainList[i].events[j].awayTeam1[pp].rule_color === 'rgb(255,0,0)'){
                                away_rule_color_number.red_color++
                            }
                        }
                        this.mainList[i].events[j].home_rule_set = home_rule_color_number
                        this.mainList[i].events[j].away_rule_set = away_rule_color_number
                    }
                }
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
            select_best_position(val){
                if(val != 0){
                    if(this.best_direction === 'home'){
                        let temp_l =  JSON.stringify(this.best_players)
                        let local_p = JSON.parse(temp_l)
                        let home_formation = null
                        let lineup = this.lineup_list.filter(function(item) {
                            return item.value === val;
                        });

                        if(lineup.length > 0){
                            home_formation = lineup[0].label
                        }

                        let home_s_roles = this.s_role_set.filter(function(item) {
                            return item.name === home_formation;
                        });
                        let home_position = []
                        if(home_s_roles.length > 0){
                            let sRoles = home_s_roles[0].s_role
                            let sRoles1 = home_s_roles[0].alt_s_role
                            let sRoles2 = home_s_roles[0].alt_s_role1
                            let meanRole = home_s_roles[0].mean_role
                            for(let uu = 0 ; uu < sRoles.length ; uu++){
                                let local = local_p.filter(function(item) {
                                    return item.primary_role === sRoles[uu];
                                });
                                let player_id = null
                                let player_name = null
                                let tit = 0
                                let market_value = null
                                let alt_role1 = ""
                                let alt_role2 = ""
                                if(local.length > 0){
                                    player_id = local[0].player_id
                                    player_name = local[0].player_name
                                    tit = local[0].tit
                                    market_value = local[0].market_value
                                    alt_role1 = local[0].alt_role1
                                    alt_role2 = local[0].alt_role2
                                }
                                home_position.push({"player_id": player_id, "player_name": player_name, "tit": tit, "market_value": market_value, "s_role": sRoles[uu],"s_role1": sRoles1[uu],"s_role2": sRoles2[uu], "alt_role1": alt_role1, "alt_role2": alt_role2, "pm_role": meanRole[uu]})

                                if(local.length > 0){
                                    let index = local_p.indexOf(local[0]);
                                    if (index > -1) {
                                        local_p.splice(index, 1);
                                    }
                                }
                            }
                        }

                        for(let b = 0 ; b < home_position.length ; b++){
                            for(let bb = 0 ; bb < local_p.length ; bb++){
                                if(home_position[b].tit < local_p[bb].tit){
                                    let check = 0
                                    let player_id = home_position[b].player_id
                                    let player_name = home_position[b].player_name
                                    let primary_role = home_position[b].s_role
                                    let tit = home_position[b].tit
                                    let alt_role1 = home_position[b].alt_role1
                                    let alt_role2 = home_position[b].alt_role2
                                    let market_value = home_position[b].market_value
                                    if(home_position[b].s_role == local_p[bb].primary_role){
                                        home_position[b].player_id = local_p[bb].player_id
                                        home_position[b].player_name = local_p[bb].player_name
                                        home_position[b].primary_role = local_p[bb].primary_role
                                        home_position[b].tit = local_p[bb].tit
                                        check = 1
                                    }
                                    if(home_position[b].s_role == local_p[bb].alt_role1){
                                        home_position[b].player_id = local_p[bb].player_id
                                        home_position[b].player_name = local_p[bb].player_name
                                        home_position[b].primary_role = local_p[bb].alt_role1
                                        home_position[b].tit = local_p[bb].tit
                                        check = 1
                                    }
                                    if(home_position[b].s_role == local_p[bb].alt_role2){
                                        home_position[b].player_id = local_p[bb].player_id
                                        home_position[b].player_name = local_p[bb].player_name
                                        home_position[b].primary_role = local_p[bb].alt_role2
                                        home_position[b].tit = local_p[bb].tit
                                        check = 1
                                    }
                                    if(check === 1){
                                        let index = local_p.indexOf(local_p[bb]);
                                        if (index > -1) {
                                            bb = bb - 1
                                            local_p.splice(index, 1);
                                        }
                                        if(player_id != null){
                                            local_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                        }
                                    }
                                }
                                else if(home_position[b].tit <= local_p[bb].tit){
                                    let check = 0
                                    let player_id = home_position[b].player_id
                                    let player_name = home_position[b].player_name
                                    let primary_role = home_position[b].s_role
                                    let tit = home_position[b].tit
                                    let alt_role1 = home_position[b].alt_role1
                                    let alt_role2 = home_position[b].alt_role2
                                    let market_value = home_position[b].market_value
                                    // if(home_position[b].s_role == local_p[bb].primary_role){
                                    //     home_position[b].player_id = local_p[bb].player_id
                                    //     home_position[b].player_name = local_p[bb].player_name
                                    //     home_position[b].primary_role = local_p[bb].primary_role
                                    //     home_position[b].tit = local_p[bb].tit
                                    //     check = 1
                                    // }
                                    if(home_position[b].s_role == local_p[bb].alt_role1){
                                        home_position[b].player_id = local_p[bb].player_id
                                        home_position[b].player_name = local_p[bb].player_name
                                        home_position[b].primary_role = local_p[bb].alt_role1
                                        home_position[b].tit = local_p[bb].tit
                                        check = 1
                                    }
                                    if(home_position[b].s_role == local_p[bb].alt_role2){
                                        home_position[b].player_id = local_p[bb].player_id
                                        home_position[b].player_name = local_p[bb].player_name
                                        home_position[b].primary_role = local_p[bb].alt_role2
                                        home_position[b].tit = local_p[bb].tit
                                        check = 1
                                    }
                                    if(check === 1){
                                        let index = local_p.indexOf(local_p[bb]);
                                        if (index > -1) {
                                            bb = bb - 1
                                            local_p.splice(index, 1);
                                        }
                                        if(player_id != null){
                                            local_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                        }
                                    }
                                }
                            }
                        }
                        for(let b = 0 ; b < home_position.length ; b++){
                            for(let bb = 0 ; bb < local_p.length ; bb++){
                                if(home_position[b].tit <= local_p[bb].tit){
                                    let check = 0
                                    let player_id = home_position[b].player_id
                                    let player_name = home_position[b].player_name
                                    let primary_role = home_position[b].s_role
                                    let tit = home_position[b].tit
                                    let alt_role1 = home_position[b].alt_role1
                                    let alt_role2 = home_position[b].alt_role2
                                    let market_value = home_position[b].market_value
                                    if((home_position[b].s_role1 == local_p[bb].primary_role) && (home_position[b].s_role1 != '')){
                                        home_position[b].player_id = local_p[bb].player_id
                                        home_position[b].player_name = local_p[bb].player_name
                                        home_position[b].primary_role = local_p[bb].primary_role
                                        home_position[b].tit = local_p[bb].tit
                                        check = 1
                                    }
                                    if((home_position[b].s_role1 == local_p[bb].alt_role1) && (home_position[b].s_role1 != '')){
                                        home_position[b].player_id = local_p[bb].player_id
                                        home_position[b].player_name = local_p[bb].player_name
                                        home_position[b].primary_role = local_p[bb].alt_role1
                                        home_position[b].tit = local_p[bb].tit
                                        check = 1
                                    }
                                    if((home_position[b].s_role1 == local_p[bb].alt_role2) && (home_position[b].s_role1 != '')){
                                        home_position[b].player_id = local_p[bb].player_id
                                        home_position[b].player_name = local_p[bb].player_name
                                        home_position[b].primary_role = local_p[bb].alt_role2
                                        home_position[b].tit = local_p[bb].tit
                                        check = 1
                                    }
                                    if(check === 1){
                                        let index = local_p.indexOf(local_p[bb]);
                                        if (index > -1) {
                                            bb = bb - 1
                                            local_p.splice(index, 1);
                                        }
                                        if(player_id != null){
                                            local_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                        }
                                    }
                                }
                            }
                        }
                        for(let b = 0 ; b < home_position.length ; b++){
                            for(let bb = 0 ; bb < local_p.length ; bb++){
                                if(home_position[b].tit <= local_p[bb].tit){
                                    let check = 0
                                    let player_id = home_position[b].player_id
                                    let player_name = home_position[b].player_name
                                    let primary_role = home_position[b].s_role
                                    let tit = home_position[b].tit
                                    let alt_role1 = home_position[b].alt_role1
                                    let alt_role2 = home_position[b].alt_role2
                                    let market_value = home_position[b].market_value
                                    if((home_position[b].s_role2 == local_p[bb].primary_role) && (home_position[b].s_role2 != '')){
                                        home_position[b].player_id = local_p[bb].player_id
                                        home_position[b].player_name = local_p[bb].player_name
                                        home_position[b].primary_role = local_p[bb].primary_role
                                        home_position[b].tit = local_p[bb].tit
                                        check = 1
                                    }
                                    if((home_position[b].s_role2 == local_p[bb].alt_role1) && (home_position[b].s_role2 != '')){
                                        home_position[b].player_id = local_p[bb].player_id
                                        home_position[b].player_name = local_p[bb].player_name
                                        home_position[b].primary_role = local_p[bb].alt_role1
                                        home_position[b].tit = local_p[bb].tit
                                        check = 1
                                    }
                                    if((home_position[b].s_role2 == local_p[bb].alt_role2) && (home_position[b].s_role2 != '')){
                                        home_position[b].player_id = local_p[bb].player_id
                                        home_position[b].player_name = local_p[bb].player_name
                                        home_position[b].primary_role = local_p[bb].alt_role2
                                        home_position[b].tit = local_p[bb].tit
                                        check = 1
                                    }
                                    if(check === 1){
                                        let index = local_p.indexOf(local_p[bb]);
                                        if (index > -1) {
                                            bb = bb - 1
                                            local_p.splice(index, 1);
                                        }
                                        if(player_id != null){
                                            local_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                        }
                                    }
                                }
                            }
                        }
                        // console.log("****************", home_position, away_position, local_p1, visit_p1)
                        let home_best_p = []
                        let gk_p = []
                        let def_p = []
                        let mid_p = []
                        let fwd_p = []
                        for(let b = 0 ; b < home_position.length ; b++){
                            if(home_position[b].pm_role === "GK"){
                                gk_p.push(home_position[b])
                            }
                            else if(home_position[b].pm_role === "DEF"){
                                def_p.push(home_position[b])
                            }
                            else if(home_position[b].pm_role === "MID"){
                                mid_p.push(home_position[b])
                            }
                            else if(home_position[b].pm_role === "FWD"){
                                fwd_p.push(home_position[b])
                            }
                        }
                        home_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}
                        let home_best_p1 = {"gk": home_best_p.gk, "def": home_best_p.def, "mid1": home_best_p.mid, "mid2": [], "fwd": home_best_p.fwd}
                        if(home_formation != null){
                            if(home_formation.split('-').length > 3){
                                let mid1_len = parseInt(home_formation.split('-')[1])
                                let mid2_len = parseInt(home_formation.split('-')[2])
                                let mid1 = []
                                let mid2 = []
                                for(let c = 0 ; c < mid1_len ; c++){
                                    mid1.push(home_best_p.mid[c])
                                }
                                for(let c = home_best_p.mid.length - mid2_len ; c < home_best_p.mid.length ; c++){
                                    mid2.push(home_best_p.mid[c])
                                }
                                home_best_p1 = {"gk": home_best_p.gk, "def": home_best_p.def, "mid1": mid1, "mid2": mid2, "fwd": home_best_p.fwd}
                            }
                        }

                        //------------------------------------------------
                        let temp_l1 =  JSON.stringify(this.best_players_r)
                        let local_p0 = JSON.parse(temp_l1)

                        home_position = []
                        if(home_s_roles.length > 0){
                            let sRoles = home_s_roles[0].s_role
                            let sRoles1 = home_s_roles[0].alt_s_role
                            let sRoles2 = home_s_roles[0].alt_s_role1
                            let meanRole = home_s_roles[0].mean_role
                            for(let uu = 0 ; uu < sRoles.length ; uu++){
                                let local = local_p0.filter(function(item) {
                                    return item.primary_role === sRoles[uu];
                                });
                                let player_id = null
                                let player_name = null
                                let tit = 0
                                let market_value = null
                                let alt_role1 = ""
                                let alt_role2 = ""
                                if(local.length > 0){
                                    player_id = local[0].player_id
                                    player_name = local[0].player_name
                                    tit = local[0].tit
                                    market_value = local[0].market_value
                                    alt_role1 = local[0].alt_role1
                                    alt_role2 = local[0].alt_role2
                                }
                                home_position.push({"player_id": player_id, "player_name": player_name, "tit": tit, "market_value": market_value, "s_role": sRoles[uu], "s_role1":sRoles1[uu], "s_role2":sRoles2[uu], "alt_role1": alt_role1, "alt_role2": alt_role2, "pm_role": meanRole[uu]})
                                if(local.length > 0){
                                    let index = local_p0.indexOf(local[0]);
                                    if (index > -1) {
                                        local_p0.splice(index, 1);
                                    }
                                }
                            }
                        }

                        home_best_p = []
                        gk_p = []
                        def_p = []
                        mid_p = []
                        fwd_p = []
                        for(let b = 0 ; b < home_position.length ; b++){
                            if(home_position[b].pm_role === "GK"){
                                gk_p.push(home_position[b])
                            }
                            else if(home_position[b].pm_role === "DEF"){
                                def_p.push(home_position[b])
                            }
                            else if(home_position[b].pm_role === "MID"){
                                mid_p.push(home_position[b])
                            }
                            else if(home_position[b].pm_role === "FWD"){
                                fwd_p.push(home_position[b])
                            }
                        }
                        home_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}
                        gk_p = []
                        def_p = []
                        mid_p = []
                        fwd_p = []

                        for(let b = 0 ; b < home_position.length ; b++){
                            for(let bb = 0 ; bb < local_p0.length ; bb++){
                                if(home_position[b].tit < local_p0[bb].tit){
                                    let check = 0
                                    let player_id = home_position[b].player_id
                                    let player_name = home_position[b].player_name
                                    let primary_role = home_position[b].s_role
                                    let tit = home_position[b].tit
                                    let alt_role1 = home_position[b].alt_role1
                                    let alt_role2 = home_position[b].alt_role2
                                    let market_value = home_position[b].market_value
                                    if(home_position[b].s_role == local_p0[bb].primary_role){
                                        home_position[b].player_id = local_p0[bb].player_id
                                        home_position[b].player_name = local_p0[bb].player_name
                                        home_position[b].primary_role = local_p0[bb].primary_role
                                        home_position[b].tit = local_p0[bb].tit
                                        check = 1
                                    }
                                    if(home_position[b].s_role == local_p0[bb].alt_role1){
                                        home_position[b].player_id = local_p0[bb].player_id
                                        home_position[b].player_name = local_p0[bb].player_name
                                        home_position[b].primary_role = local_p0[bb].alt_role1
                                        home_position[b].tit = local_p0[bb].tit
                                        check = 1
                                    }
                                    if(home_position[b].s_role == local_p0[bb].alt_role2){
                                        home_position[b].player_id = local_p0[bb].player_id
                                        home_position[b].player_name = local_p0[bb].player_name
                                        home_position[b].primary_role = local_p0[bb].alt_role2
                                        home_position[b].tit = local_p0[bb].tit
                                        check = 1
                                    }
                                    if(check === 1){
                                        let index = local_p0.indexOf(local_p0[bb]);
                                        if (index > -1) {
                                            bb = bb - 1
                                            local_p0.splice(index, 1);
                                        }
                                        if(player_id != null){
                                            local_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                        }
                                    }
                                }
                                else if(home_position[b].tit <= local_p0[bb].tit){
                                    let check = 0
                                    let player_id = home_position[b].player_id
                                    let player_name = home_position[b].player_name
                                    let primary_role = home_position[b].s_role
                                    let tit = home_position[b].tit
                                    let alt_role1 = home_position[b].alt_role1
                                    let alt_role2 = home_position[b].alt_role2
                                    let market_value = home_position[b].market_value
                                    // if(home_position[b].s_role == local_p[bb].primary_role){
                                    //     home_position[b].player_id = local_p[bb].player_id
                                    //     home_position[b].player_name = local_p[bb].player_name
                                    //     home_position[b].primary_role = local_p[bb].primary_role
                                    //     home_position[b].tit = local_p[bb].tit
                                    //     check = 1
                                    // }
                                    if(home_position[b].s_role == local_p0[bb].alt_role1){
                                        home_position[b].player_id = local_p0[bb].player_id
                                        home_position[b].player_name = local_p0[bb].player_name
                                        home_position[b].primary_role = local_p0[bb].alt_role1
                                        home_position[b].tit = local_p0[bb].tit
                                        check = 1
                                    }
                                    if(home_position[b].s_role == local_p0[bb].alt_role2){
                                        home_position[b].player_id = local_p0[bb].player_id
                                        home_position[b].player_name = local_p0[bb].player_name
                                        home_position[b].primary_role = local_p0[bb].alt_role2
                                        home_position[b].tit = local_p0[bb].tit
                                        check = 1
                                    }
                                    if(check === 1){
                                        let index = local_p0.indexOf(local_p0[bb]);
                                        if (index > -1) {
                                            local_p0.splice(index, 1);
                                        }
                                        if(player_id != null){
                                            local_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                        }
                                    }
                                }
                            }
                        }
                        for(let b = 0 ; b < home_position.length ; b++){
                            for(let bb = 0 ; bb < local_p0.length ; bb++){
                                if(home_position[b].tit <= local_p0[bb].tit){
                                    let check = 0
                                    let player_id = home_position[b].player_id
                                    let player_name = home_position[b].player_name
                                    let primary_role = home_position[b].s_role
                                    let tit = home_position[b].tit
                                    let alt_role1 = home_position[b].alt_role1
                                    let alt_role2 = home_position[b].alt_role2
                                    let market_value = home_position[b].market_value
                                    if((home_position[b].s_role1 == local_p0[bb].primary_role) && (home_position[b].s_role1 != '')){
                                        home_position[b].player_id = local_p0[bb].player_id
                                        home_position[b].player_name = local_p0[bb].player_name
                                        home_position[b].primary_role = local_p0[bb].primary_role
                                        home_position[b].tit = local_p0[bb].tit
                                        check = 1
                                    }
                                    if((home_position[b].s_role1 == local_p0[bb].alt_role1) && (home_position[b].s_role1 != '')){
                                        home_position[b].player_id = local_p0[bb].player_id
                                        home_position[b].player_name = local_p0[bb].player_name
                                        home_position[b].primary_role = local_p0[bb].alt_role1
                                        home_position[b].tit = local_p0[bb].tit
                                        check = 1
                                    }
                                    if((home_position[b].s_role1 == local_p0[bb].alt_role2) && (home_position[b].s_role1 != '')){
                                        home_position[b].player_id = local_p0[bb].player_id
                                        home_position[b].player_name = local_p0[bb].player_name
                                        home_position[b].primary_role = local_p0[bb].alt_role2
                                        home_position[b].tit = local_p0[bb].tit
                                        check = 1
                                    }
                                    if(check === 1){
                                        let index = local_p0.indexOf(local_p0[bb]);
                                        if (index > -1) {
                                            local_p0.splice(index, 1);
                                        }
                                        if(player_id != null){
                                            local_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                        }
                                    }
                                }
                            }
                        }
                        for(let b = 0 ; b < home_position.length ; b++){
                            for(let bb = 0 ; bb < local_p.length ; bb++){
                                if(home_position[b].tit <= local_p0[bb].tit){
                                    let check = 0
                                    let player_id = home_position[b].player_id
                                    let player_name = home_position[b].player_name
                                    let primary_role = home_position[b].s_role
                                    let tit = home_position[b].tit
                                    let alt_role1 = home_position[b].alt_role1
                                    let alt_role2 = home_position[b].alt_role2
                                    let market_value = home_position[b].market_value
                                    if((home_position[b].s_role2 == local_p0[bb].primary_role) && (home_position[b].s_role2 != '')){
                                        home_position[b].player_id = local_p0[bb].player_id
                                        home_position[b].player_name = local_p0[bb].player_name
                                        home_position[b].primary_role = local_p0[bb].primary_role
                                        home_position[b].tit = local_p0[bb].tit
                                        check = 1
                                    }
                                    if((home_position[b].s_role2 == local_p0[bb].alt_role1) && (home_position[b].s_role2 != '')){
                                        home_position[b].player_id = local_p0[bb].player_id
                                        home_position[b].player_name = local_p0[bb].player_name
                                        home_position[b].primary_role = local_p0[bb].alt_role1
                                        home_position[b].tit = local_p0[bb].tit
                                        check = 1
                                    }
                                    if((home_position[b].s_role2 == local_p0[bb].alt_role2) && (home_position[b].s_role2 != '')){
                                        home_position[b].player_id = local_p0[bb].player_id
                                        home_position[b].player_name = local_p0[bb].player_name
                                        home_position[b].primary_role = local_p0[bb].alt_role2
                                        home_position[b].tit = local_p0[bb].tit
                                        check = 1
                                    }
                                    if(check === 1){
                                        let index = local_p0.indexOf(local_p0[bb]);
                                        if (index > -1) {
                                            local_p0.splice(index, 1);
                                        }
                                        if(player_id != null){
                                            local_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                        }
                                    }
                                }
                            }
                        }
                        gk_p = []
                        def_p = []
                        mid_p = []
                        fwd_p = []
                        for(let b = 0 ; b < home_position.length ; b++){
                            if(home_position[b].pm_role === "GK"){
                                gk_p.push(home_position[b])
                            }
                            else if(home_position[b].pm_role === "DEF"){
                                def_p.push(home_position[b])
                            }
                            else if(home_position[b].pm_role === "MID"){
                                mid_p.push(home_position[b])
                            }
                            else if(home_position[b].pm_role === "FWD"){
                                fwd_p.push(home_position[b])
                            }
                        }
                        home_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}

                        let home_best_p2 = {"gk": home_best_p.gk, "def": home_best_p.def, "mid1": home_best_p.mid, "mid2": [], "fwd": home_best_p.fwd}
                        if(home_formation != null){
                            if(home_formation.split('-').length > 3){
                                let mid1_len = parseInt(home_formation.split('-')[1])
                                let mid2_len = parseInt(home_formation.split('-')[2])
                                let mid1 = []
                                let mid2 = []
                                for(let c = 0 ; c < mid1_len ; c++){
                                    mid1.push(home_best_p.mid[c])
                                }
                                for(let c = home_best_p.mid.length - mid2_len ; c < home_best_p.mid.length ; c++){
                                    mid2.push(home_best_p.mid[c])
                                }
                                home_best_p2 = {"gk": home_best_p.gk, "def": home_best_p.def, "mid1": mid1, "mid2": mid2, "fwd": home_best_p.fwd}
                            }
                        }
                        //------------------------------------------------

                        for(let i = 0 ; i < this.mainList.length ; i++){
                            for(let j = 0 ; j < this.mainList[i].events.length ; j++){
                                if(this.mainList[i].events[j].home_id == this.best_id){
                                    this.mainList[i].events[j].home_best = home_best_p1
                                    this.mainList[i].events[j].home_best1 = home_best_p2
                                }
                            }
                        }
                    }
                    else if(this.best_direction === 'away'){
                        let temp_v =  JSON.stringify(this.best_players)
                        let visit_p = JSON.parse(temp_v)

                        let away_formation = null
                        let lineup = this.lineup_list.filter(function(item) {
                            return item.value === val;
                        });

                        if(lineup.length > 0){
                            away_formation = lineup[0].label
                        }

                        let away_s_roles = this.s_role_set.filter(function(item) {
                            return item.name === away_formation;
                        });
                        let away_position = []
                        if(away_s_roles.length > 0){
                            let sRoles = away_s_roles[0].s_role
                            let sRoles1 = away_s_roles[0].alt_s_role
                            let sRoles2 = away_s_roles[0].alt_s_role1
                            let meanRole = away_s_roles[0].mean_role
                            for(let uu = 0 ; uu < sRoles.length ; uu++){
                                let visit = visit_p.filter(function(item) {
                                    return item.primary_role === sRoles[uu];
                                });
                                let player_id = null
                                let player_name = null
                                let tit = 0
                                let market_value = null
                                if(visit.length > 0){
                                    player_id = visit[0].player_id
                                    player_name = visit[0].player_name
                                    tit = visit[0].tit
                                    market_value = visit[0].market_value
                                }
                                away_position.push({"player_id": player_id, "player_name": player_name, "tit": tit, "market_value": market_value, "s_role": sRoles[uu], "s_role1": sRoles1[uu], "s_role2": sRoles2[uu], "pm_role": meanRole[uu]})

                                if(visit.length > 0){
                                    let index = visit_p.indexOf(visit[0]);
                                    if (index > -1) {
                                        visit_p.splice(index, 1);
                                    }
                                }

                            }
                        }

                        for(let b = 0 ; b < away_position.length ; b++){
                            for(let bb = 0 ; bb < visit_p.length ; bb++){
                                if(away_position[b].player_id != null){
                                    if(away_position[b].tit < visit_p[bb].tit){
                                        let check = 0
                                        let player_id = away_position[b].player_id
                                        let player_name = away_position[b].player_name
                                        let primary_role = away_position[b].s_role
                                        let tit = away_position[b].tit
                                        let alt_role1 = away_position[b].alt_role1
                                        let alt_role2 = away_position[b].alt_role2
                                        let market_value = away_position[b].market_value
                                        if(away_position[b].s_role == visit_p[bb].primary_role){
                                            away_position[b].player_id = visit_p[bb].player_id
                                            away_position[b].player_name = visit_p[bb].player_name
                                            away_position[b].primary_role = visit_p[bb].primary_role
                                            away_position[b].tit = visit_p[bb].tit
                                            check = 1
                                        }
                                        if(away_position[b].s_role == visit_p[bb].alt_role1){
                                            away_position[b].player_id = visit_p[bb].player_id
                                            away_position[b].player_name = visit_p[bb].player_name
                                            away_position[b].primary_role = visit_p[bb].alt_role1
                                            away_position[b].tit = visit_p[bb].tit
                                            check = 1
                                        }
                                        if(away_position[b].s_role == visit_p[bb].alt_role2){
                                            away_position[b].player_id = visit_p[bb].player_id
                                            away_position[b].player_name = visit_p[bb].player_name
                                            away_position[b].primary_role = visit_p[bb].alt_role2
                                            away_position[b].tit = visit_p[bb].tit
                                            check = 1
                                        }
                                        if(check === 1){
                                            let index = visit_p.indexOf(visit_p[bb]);
                                            if (index > -1) {
                                                bb = bb - 1
                                                visit_p.splice(index, 1);
                                            }
                                            visit_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                        }
                                    }
                                }
                                else{
                                    if(away_position[b].tit <= visit_p[bb].tit){
                                        let check = 0
                                        let player_id = away_position[b].player_id
                                        let player_name = away_position[b].player_name
                                        let primary_role = away_position[b].s_role
                                        let tit = away_position[b].tit
                                        let alt_role1 = away_position[b].alt_role1
                                        let alt_role2 = away_position[b].alt_role2
                                        let market_value = away_position[b].market_value
                                        // if(away_position[b].s_role == visit_p[bb].primary_role){
                                        //     away_position[b].player_id = visit_p[bb].player_id
                                        //     away_position[b].player_name = visit_p[bb].player_name
                                        //     away_position[b].primary_role = visit_p[bb].primary_role
                                        //     away_position[b].tit = visit_p[bb].tit
                                        //     check = 1
                                        // }
                                        if(away_position[b].s_role == visit_p[bb].alt_role1){
                                            away_position[b].player_id = visit_p[bb].player_id
                                            away_position[b].player_name = visit_p[bb].player_name
                                            away_position[b].primary_role = visit_p[bb].alt_role1
                                            away_position[b].tit = visit_p[bb].tit
                                            check = 1
                                        }
                                        if(away_position[b].s_role == visit_p[bb].alt_role2){
                                            away_position[b].player_id = visit_p[bb].player_id
                                            away_position[b].player_name = visit_p[bb].player_name
                                            away_position[b].primary_role = visit_p[bb].alt_role2
                                            away_position[b].tit = visit_p[bb].tit
                                            check = 1
                                        }
                                        if(check === 1){
                                            let index = visit_p.indexOf(visit_p[bb]);
                                            if (index > -1) {
                                                bb = bb - 1
                                                visit_p.splice(index, 1);
                                            }
                                            if(player_id != null){
                                                visit_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                            }

                                        }
                                    }
                                }
                            }
                        }
                        for(let b = 0 ; b < away_position.length ; b++){
                            for(let bb = 0 ; bb < visit_p.length ; bb++){
                                if(away_position[b].tit <= visit_p[bb].tit){
                                    let check = 0
                                    let player_id = away_position[b].player_id
                                    let player_name = away_position[b].player_name
                                    let primary_role = away_position[b].s_role
                                    let tit = away_position[b].tit
                                    let alt_role1 = away_position[b].alt_role1
                                    let alt_role2 = away_position[b].alt_role2
                                    let market_value = away_position[b].market_value
                                    if((away_position[b].s_role1 == visit_p[bb].primary_role) && (away_position[b].s_role1 != '')){
                                        away_position[b].player_id = visit_p[bb].player_id
                                        away_position[b].player_name = visit_p[bb].player_name
                                        away_position[b].primary_role = visit_p[bb].primary_role
                                        away_position[b].tit = visit_p[bb].tit
                                        check = 1
                                    }
                                    if((away_position[b].s_role1 == visit_p[bb].alt_role1) && (away_position[b].s_role1 != '')){
                                        away_position[b].player_id = visit_p[bb].player_id
                                        away_position[b].player_name = visit_p[bb].player_name
                                        away_position[b].primary_role = visit_p[bb].alt_role1
                                        away_position[b].tit = visit_p[bb].tit
                                        check = 1
                                    }
                                    if((away_position[b].s_role1 == visit_p[bb].alt_role2) && (away_position[b].s_role1 != '')){
                                        away_position[b].player_id = visit_p[bb].player_id
                                        away_position[b].player_name = visit_p[bb].player_name
                                        away_position[b].primary_role = visit_p[bb].alt_role2
                                        away_position[b].tit = visit_p[bb].tit
                                        check = 1
                                    }
                                    if(check === 1){
                                        let index = visit_p.indexOf(visit_p[bb]);
                                        if (index > -1) {
                                            bb = bb - 1
                                            visit_p.splice(index, 1);
                                        }
                                        visit_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                    }
                                }
                            }
                        }
                        for(let b = 0 ; b < away_position.length ; b++){
                            for(let bb = 0 ; bb < visit_p.length ; bb++){
                                if(away_position[b].tit <= visit_p[bb].tit){
                                    let check = 0
                                    let player_id = away_position[b].player_id
                                    let player_name = away_position[b].player_name
                                    let primary_role = away_position[b].s_role
                                    let tit = away_position[b].tit
                                    let alt_role1 = away_position[b].alt_role1
                                    let alt_role2 = away_position[b].alt_role2
                                    let market_value = away_position[b].market_value
                                    if((away_position[b].s_role2 == visit_p[bb].primary_role) && (away_position[b].s_role2 != '')){
                                        away_position[b].player_id = visit_p[bb].player_id
                                        away_position[b].player_name = visit_p[bb].player_name
                                        away_position[b].primary_role = visit_p[bb].primary_role
                                        away_position[b].tit = visit_p[bb].tit
                                        check = 1
                                    }
                                    if((away_position[b].s_role2 == visit_p[bb].alt_role1) && (away_position[b].s_role2 != '')){
                                        away_position[b].player_id = visit_p[bb].player_id
                                        away_position[b].player_name = visit_p[bb].player_name
                                        away_position[b].primary_role = visit_p[bb].alt_role1
                                        away_position[b].tit = visit_p[bb].tit
                                        check = 1
                                    }
                                    if((away_position[b].s_role2 == visit_p[bb].alt_role2) && (away_position[b].s_role2 != '')){
                                        away_position[b].player_id = visit_p[bb].player_id
                                        away_position[b].player_name = visit_p[bb].player_name
                                        away_position[b].primary_role = visit_p[bb].alt_role2
                                        away_position[b].tit = visit_p[bb].tit
                                        check = 1
                                    }
                                    if(check === 1){
                                        let index = visit_p.indexOf(visit_p[bb]);
                                        if (index > -1) {
                                            bb = bb - 1
                                            visit_p.splice(index, 1);
                                        }
                                        visit_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                    }
                                }
                            }
                        }

                        let away_best_p = []
                        let gk_p = []
                        let def_p = []
                        let mid_p = []
                        let fwd_p = []
                        for(let b = 0 ; b < away_position.length ; b++){
                            if(away_position[b].pm_role === "GK"){
                                gk_p.push(away_position[b])
                            }
                            else if(away_position[b].pm_role === "DEF"){
                                def_p.push(away_position[b])
                            }
                            else if(away_position[b].pm_role === "MID"){
                                mid_p.push(away_position[b])
                            }
                            else if(away_position[b].pm_role === "FWD"){
                                fwd_p.push(away_position[b])
                            }
                        }
                        away_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}
                        let away_best_p1 = {"gk": away_best_p.gk, "def": away_best_p.def, "mid1": away_best_p.mid, "mid2": [], "fwd": away_best_p.fwd}
                        if(away_formation != null){
                            if(away_formation.split('-').length > 3){
                                let mid1_len = parseInt(away_formation.split('-')[1])
                                let mid2_len = parseInt(away_formation.split('-')[2])
                                let mid1 = []
                                let mid2 = []
                                for(let c = 0 ; c < mid1_len ; c++){
                                    mid1.push(away_best_p.mid[c])
                                }
                                for(let c = away_best_p.mid.length - mid2_len ; c < away_best_p.mid.length ; c++){
                                    mid2.push(away_best_p.mid[c])
                                }
                                away_best_p1 = {"gk": away_best_p.gk, "def": away_best_p.def, "mid1": mid1, "mid2": mid2, "fwd": away_best_p.fwd}
                            }
                        }
                        //-------------------------------------------------
                        let temp_v1 =  JSON.stringify(this.best_players_r)
                        let visit_p0 = JSON.parse(temp_v1)

                        away_position = []
                        if(away_s_roles.length > 0){
                            let sRoles = away_s_roles[0].s_role
                            let sRoles1 = away_s_roles[0].alt_s_role
                            let sRoles2 = away_s_roles[0].alt_s_role1
                            let meanRole = away_s_roles[0].mean_role
                            for(let uu = 0 ; uu < sRoles.length ; uu++){
                                let visit = visit_p0.filter(function(item) {
                                    return item.primary_role === sRoles[uu];
                                });
                                let player_id = null
                                let player_name = null
                                let tit = 0
                                let market_value = null
                                let alt_role1 = ""
                                let alt_role2 = ""
                                if(visit.length > 0){
                                    player_id = visit[0].player_id
                                    player_name = visit[0].player_name
                                    tit = visit[0].tit
                                    market_value = visit[0].market_value
                                    alt_role1 = visit[0].alt_role1
                                    alt_role2 = visit[0].alt_role2

                                    let index = visit_p0.indexOf(visit[0]);
                                    if (index > -1) {
                                        visit_p0.splice(index, 1);
                                    }
                                }
                                away_position.push({"player_id": player_id, "player_name": player_name, "tit": tit, "market_value": market_value, "s_role": sRoles[uu], "s_role1":sRoles1[uu], "s_role2":sRoles2[uu], "alt_role1": alt_role1, "alt_role2": alt_role2, "pm_role": meanRole[uu]})
                            }
                        }
                        away_best_p = []
                        gk_p = []
                        def_p = []
                        mid_p = []
                        fwd_p = []
                        for(let b = 0 ; b < away_position.length ; b++){
                            if(away_position[b].pm_role === "GK"){
                                gk_p.push(away_position[b])
                            }
                            else if(away_position[b].pm_role === "DEF"){
                                def_p.push(away_position[b])
                            }
                            else if(away_position[b].pm_role === "MID"){
                                mid_p.push(away_position[b])
                            }
                            else if(away_position[b].pm_role === "FWD"){
                                fwd_p.push(away_position[b])
                            }
                        }
                        away_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}
                        for(let b = 0 ; b < away_position.length ; b++){
                            for(let bb = 0 ; bb < visit_p0.length ; bb++){
                                if(away_position[b].player_id != null){
                                    if(away_position[b].tit < visit_p0[bb].tit){
                                        let check = 0
                                        let player_id = away_position[b].player_id
                                        let player_name = away_position[b].player_name
                                        let primary_role = away_position[b].s_role
                                        let tit = away_position[b].tit
                                        let alt_role1 = away_position[b].alt_role1
                                        let alt_role2 = away_position[b].alt_role2
                                        let market_value = away_position[b].market_value
                                        if(away_position[b].s_role == visit_p0[bb].primary_role){
                                            away_position[b].player_id = visit_p0[bb].player_id
                                            away_position[b].player_name = visit_p0[bb].player_name
                                            away_position[b].primary_role = visit_p0[bb].primary_role
                                            away_position[b].tit = visit_p0[bb].tit
                                            check = 1
                                        }
                                        if(away_position[b].s_role == visit_p0[bb].alt_role1){
                                            away_position[b].player_id = visit_p0[bb].player_id
                                            away_position[b].player_name = visit_p0[bb].player_name
                                            away_position[b].primary_role = visit_p0[bb].alt_role1
                                            away_position[b].tit = visit_p0[bb].tit
                                            check = 1
                                        }
                                        if(away_position[b].s_role == visit_p0[bb].alt_role2){
                                            away_position[b].player_id = visit_p0[bb].player_id
                                            away_position[b].player_name = visit_p0[bb].player_name
                                            away_position[b].primary_role = visit_p0[bb].alt_role2
                                            away_position[b].tit = visit_p0[bb].tit
                                            check = 1
                                        }
                                        if(check === 1){
                                            let index = visit_p0.indexOf(visit_p0[bb]);
                                            if (index > -1) {
                                                bb = bb - 1
                                                visit_p0.splice(index, 1);
                                            }
                                            visit_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                        }
                                    }
                                }
                                else{
                                    if(away_position[b].tit <= visit_p0[bb].tit){
                                        let check = 0
                                        let player_id = away_position[b].player_id
                                        let player_name = away_position[b].player_name
                                        let primary_role = away_position[b].s_role
                                        let tit = away_position[b].tit
                                        let alt_role1 = away_position[b].alt_role1
                                        let alt_role2 = away_position[b].alt_role2
                                        let market_value = away_position[b].market_value
                                        // if(away_position[b].s_role == visit_p[bb].primary_role){
                                        //     away_position[b].player_id = visit_p[bb].player_id
                                        //     away_position[b].player_name = visit_p[bb].player_name
                                        //     away_position[b].primary_role = visit_p[bb].primary_role
                                        //     away_position[b].tit = visit_p[bb].tit
                                        //     check = 1
                                        // }
                                        if(away_position[b].s_role == visit_p0[bb].alt_role1){
                                            away_position[b].player_id = visit_p0[bb].player_id
                                            away_position[b].player_name = visit_p0[bb].player_name
                                            away_position[b].primary_role = visit_p0[bb].alt_role1
                                            away_position[b].tit = visit_p0[bb].tit
                                            check = 1
                                        }
                                        if(away_position[b].s_role == visit_p0[bb].alt_role2){
                                            away_position[b].player_id = visit_p0[bb].player_id
                                            away_position[b].player_name = visit_p0[bb].player_name
                                            away_position[b].primary_role = visit_p0[bb].alt_role2
                                            away_position[b].tit = visit_p0[bb].tit
                                            check = 1
                                        }
                                        if(check === 1){
                                            let index = visit_p0.indexOf(visit_p0[bb]);
                                            if (index > -1) {
                                                visit_p0.splice(index, 1);
                                            }
                                            if(player_id != null){
                                                visit_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        for(let b = 0 ; b < away_position.length ; b++){
                            for(let bb = 0 ; bb < visit_p0.length ; bb++){
                                if(away_position[b].tit <= visit_p0[bb].tit){
                                    let check = 0
                                    let player_id = away_position[b].player_id
                                    let player_name = away_position[b].player_name
                                    let primary_role = away_position[b].s_role
                                    let tit = away_position[b].tit
                                    let alt_role1 = away_position[b].alt_role1
                                    let alt_role2 = away_position[b].alt_role2
                                    let market_value = away_position[b].market_value
                                    if((away_position[b].s_role1 == visit_p0[bb].primary_role) && (away_position[b].s_role1 != '')){
                                        away_position[b].player_id = visit_p0[bb].player_id
                                        away_position[b].player_name = visit_p0[bb].player_name
                                        away_position[b].primary_role = visit_p0[bb].primary_role
                                        away_position[b].tit = visit_p0[bb].tit
                                        check = 1
                                    }
                                    if((away_position[b].s_role1 == visit_p0[bb].alt_role1) && (away_position[b].s_role1 != '')){
                                        away_position[b].player_id = visit_p0[bb].player_id
                                        away_position[b].player_name = visit_p0[bb].player_name
                                        away_position[b].primary_role = visit_p0[bb].alt_role1
                                        away_position[b].tit = visit_p0[bb].tit
                                        check = 1
                                    }
                                    if((away_position[b].s_role1 == visit_p0[bb].alt_role2) && (away_position[b].s_role1 != '')){
                                        away_position[b].player_id = visit_p0[bb].player_id
                                        away_position[b].player_name = visit_p0[bb].player_name
                                        away_position[b].primary_role = visit_p0[bb].alt_role2
                                        away_position[b].tit = visit_p0[bb].tit
                                        check = 1
                                    }
                                    if(check === 1){
                                        let index = visit_p0.indexOf(visit_p0[bb]);
                                        if (index > -1) {
                                            visit_p0.splice(index, 1);
                                        }
                                        visit_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                    }
                                }
                            }
                        }
                        for(let b = 0 ; b < away_position.length ; b++){
                            for(let bb = 0 ; bb < visit_p0.length ; bb++){
                                if(away_position[b].tit <= visit_p0[bb].tit){
                                    let check = 0
                                    let player_id = away_position[b].player_id
                                    let player_name = away_position[b].player_name
                                    let primary_role = away_position[b].s_role
                                    let tit = away_position[b].tit
                                    let alt_role1 = away_position[b].alt_role1
                                    let alt_role2 = away_position[b].alt_role2
                                    let market_value = away_position[b].market_value
                                    if((away_position[b].s_role2 == visit_p0[bb].primary_role) && (away_position[b].s_role2 != '')){
                                        away_position[b].player_id = visit_p0[bb].player_id
                                        away_position[b].player_name = visit_p0[bb].player_name
                                        away_position[b].primary_role = visit_p0[bb].primary_role
                                        away_position[b].tit = visit_p0[bb].tit
                                        check = 1
                                    }
                                    if((away_position[b].s_role2 == visit_p0[bb].alt_role1) && (away_position[b].s_role2 != '')){
                                        away_position[b].player_id = visit_p0[bb].player_id
                                        away_position[b].player_name = visit_p0[bb].player_name
                                        away_position[b].primary_role = visit_p0[bb].alt_role1
                                        away_position[b].tit = visit_p0[bb].tit
                                        check = 1
                                    }
                                    if((away_position[b].s_role2 == visit_p0[bb].alt_role2) && (away_position[b].s_role2 != '')){
                                        away_position[b].player_id = visit_p0[bb].player_id
                                        away_position[b].player_name = visit_p0[bb].player_name
                                        away_position[b].primary_role = visit_p0[bb].alt_role2
                                        away_position[b].tit = visit_p0[bb].tit
                                        check = 1
                                    }
                                    if(check === 1){
                                        let index = visit_p0.indexOf(visit_p0[bb]);
                                        if (index > -1) {
                                            visit_p0.splice(index, 1);
                                        }
                                        visit_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                    }
                                }
                            }
                        }
                        gk_p = []
                        def_p = []
                        mid_p = []
                        fwd_p = []
                        for(let b = 0 ; b < away_position.length ; b++){
                            if(away_position[b].pm_role === "GK"){
                                gk_p.push(away_position[b])
                            }
                            else if(away_position[b].pm_role === "DEF"){
                                def_p.push(away_position[b])
                            }
                            else if(away_position[b].pm_role === "MID"){
                                mid_p.push(away_position[b])
                            }
                            else if(away_position[b].pm_role === "FWD"){
                                fwd_p.push(away_position[b])
                            }
                        }
                        away_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}
                        let away_best_p2 = {"gk": away_best_p.gk, "def": away_best_p.def, "mid1": away_best_p.mid, "mid2": [], "fwd": away_best_p.fwd}
                        if(away_formation != null){
                            if(away_formation.split('-').length > 3){
                                let mid1_len = parseInt(away_formation.split('-')[1])
                                let mid2_len = parseInt(away_formation.split('-')[2])
                                let mid1 = []
                                let mid2 = []
                                for(let c = 0 ; c < mid1_len ; c++){
                                    mid1.push(away_best_p.mid[c])
                                }
                                for(let c = away_best_p.mid.length - mid2_len ; c < away_best_p.mid.length ; c++){
                                    mid2.push(away_best_p.mid[c])
                                }
                                away_best_p2 = {"gk": away_best_p.gk, "def": away_best_p.def, "mid1": mid1, "mid2": mid2, "fwd": away_best_p.fwd}
                            }
                        }
                        //---------------------------------------------
                        for(let i = 0 ; i < this.mainList.length ; i++){
                            for(let j = 0 ; j < this.mainList[i].events.length ; j++){
                                if(this.mainList[i].events[j].away_id == this.best_id){
                                    this.mainList[i].events[j].away_best = away_best_p1
                                    this.mainList[i].events[j].away_best1 = away_best_p2
                                }
                            }
                        }
                    }
                }
            },
            readData(){
                this.currentData = true
                this.pastData = false
                this.isload = false
                this.current_counter = 0
                clearInterval(this.clock)
                clearInterval(this.clock1)
                clearInterval(this.clock2)
                clearInterval(this.clock3)
                clearInterval(this.clock4)

                this.style_current_tag = {'color': 'blue', 'border-bottom': '2px solid blue', 'font-weight': 'bold'}
                this.style_past_tag = {'color': 'gray', 'border-bottom': '1px solid gray', 'font-weight': 'normal'}

                var d = new Date();
                var n = d.getDay();
                if(n <= 1){
                    this.clock = setInterval(this.frame, 150);
                }
                else if(n === 2){
                    this.clock1 = setInterval(this.frame1, 200);
                }
                else if(n === 3){
                    this.clock2 = setInterval(this.frame2, 300);
                }
                else if(n === 4){
                    this.clock3 = setInterval(this.frame3, 500);
                }
                else{
                    this.clock4 = setInterval(this.frame4, 700);
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
                
                var post_data = {
                    "user_id": user_id
                }
                window.axios.post(`${process.env.VUE_APP_URL}teamAnalysis`, post_data).then(({data})=> {
                    console.log('data******', data.data[0])
                    console.log('data1******', data.data[1])
                    this.isload = true
                    this.standingList = data.data[1]
                    let main_data = data.data[0]
                    if(main_data.length === 0){
                        this.alert = true
                    }
                    else
                        this.alert = false
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
                        for(let j = 0; j < main_data.length ; j++){
                            if(competitionArray[i] == main_data[j].competitions[0].league && main_data[j].local_players.length > 0 && main_data[j].visitor_players.length > 0){
                                k++
                                let localTeamId = main_data[j].localTeamId
                                let visitTeamId = main_data[j].visitorTeamId
                                let homeTeamName = main_data[j].localTeamName
                                let awayTeamName = main_data[j].visitorTeamName
                                if (main_data[j].percentage)
                                    percentage = parseInt(main_data[j].percentage)
                                numbers = parseInt(main_data[j].numbers)

                                if(main_data[j].lineup != null){
                                    events.push({"show": false, "home_lineup": [], "away_lineup": [], "home_fmt_ans": [], "away_fmt_ans": [], "home_b_fmt_ans": [], "away_b_fmt_ans": [], 'local_p1': [], 'visit_p1': [], 'local_p2': [], 'visit_p2': [], 'home_best': [], 'away_best': [], 'home_best1': [], 'away_best1': [], 'home_id': localTeamId, 'away_id': visitTeamId, 'home_players': [], 'away_players': [], 'home_player': [], 'away_player': [], 'eventName': main_data[j].time.starting_at.time.substring(0, 5) + ' ' + main_data[j].localTeamName + '(' + main_data[j].standing.localteam_position + ')' + ' v ' + main_data[j].visitorTeamName +  '(' + main_data[j].standing.visitorteam_position + ')', 'openDate':  main_data[j].time.starting_at.time, 'homeTeam': [], 'awayTeam': [], 'homeTeam3': [], 'awayTeam3': [],  'homeTeam1': [], 'awayTeam1': [], 'homeTeam2': [], 'awayTeam2': [], 'homeTeamName': homeTeamName, 'awayTeamName': awayTeamName, 'homeTeamformation': [], 'awayTeamformation': [], 'homeTeamPformation': [], 'awayTeamPformation': [],  'homeTeamLformation': [], 'awayTeamLformation': [], 'home_substitutions': [], 'away_substitutions': [], 'home_legend': [], 'away_legend': [], 'home_rule_set': [], 'away_rule_set': []})
                                }
                            }
                        }

                        let country1 = (competitionArray[i].split('(')[1]).split(')')[0]
                        let league = competitionArray[i].split('(')[0]

                        if(events.length > 0){
                            this.mainList.push({'country': country1, 'league1': league, 'percentage': percentage, 'numbers': numbers, 'events': events})
                        }

                        let self = this
                        this.sortJSON(self.mainList,'country', '123');
                    }
                    console.log('this.mainList==>',this.mainList)
                    this.current_counter = 100
                })
            },
            readData1(){
                this.style_past_tag = {'color': 'blue', 'border-bottom': '2px solid blue', 'font-weight': 'bold'}
                this.style_current_tag = {'color': 'gray', 'border-bottom': '1px solid gray', 'font-weight': 'normal'}

                this.currentData = false
                this.pastData = true
                this.isload = false
                this.current_counter = 0
                clearInterval(this.clock)
                clearInterval(this.clock1)
                clearInterval(this.clock2)
                clearInterval(this.clock3)
                clearInterval(this.clock4)

                var d = new Date();
                var n = d.getDay();
                if(n <= 1){
                    this.clock = setInterval(this.frame, 150);
                }
                else if(n === 2){
                    this.clock1 = setInterval(this.frame1, 200);
                }
                else if(n === 3){
                    this.clock2 = setInterval(this.frame2, 300);
                }
                else if(n === 4){
                    this.clock3 = setInterval(this.frame3, 500);
                }
                else{
                    this.clock4 = setInterval(this.frame4, 700);
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
                
                var post_data = {
                    "user_id": user_id
                }
                window.axios.post(`${process.env.VUE_APP_URL}teamAnalysisEnded`, post_data).then(({data})=> {
                    console.log('data******', data.data[0])
                    this.isload = true
                    this.standingList = data.data[1]
                    let main_data = data.data[0]
                    if(main_data.length === 0){
                        this.alert = true
                    }
                    else
                        this.alert = false
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
                        for(let j = 0; j < main_data.length ; j++){
                            if(competitionArray[i] == main_data[j].competitions[0].league && main_data[j].local_players.length > 0 && main_data[j].visitor_players.length > 0){
                                k++
                                let localTeamId = main_data[j].localTeamId
                                let visitTeamId = main_data[j].visitorTeamId
                                let homeTeamName = main_data[j].localTeamName
                                let awayTeamName = main_data[j].visitorTeamName
                                if (main_data[j].percentage)
                                    percentage = parseInt(main_data[j].percentage)
                                
                                numbers = parseInt(main_data[j].numbers)

                                if(main_data[j].lineup != null){

                                    events[k - 1] = {"show": false, "home_lineup": [], "away_lineup": [], "home_fmt_ans": [], "away_fmt_ans": [], "home_b_fmt_ans": [], "away_b_fmt_ans": [], 'local_p1': [], 'visit_p1': [], 'local_p2': [], 'visit_p2': [], 'home_best': [], 'away_best': [], 'home_best1': [], 'away_best1': [], 'home_id': localTeamId, 'away_id': visitTeamId, 'home_players': [], 'away_players': [], 'home_player': [], 'away_player': [], 'eventName': main_data[j].time.starting_at.time.substring(0, 5) + ' ' + main_data[j].localTeamName + '(' + main_data[j].standing.localteam_position + ')' + ' v ' + main_data[j].visitorTeamName +  '(' + main_data[j].standing.visitorteam_position + ')', 'openDate':  main_data[j].time.starting_at.time, 'homeTeam': [], 'awayTeam': [], 'homeTeam3': [], 'awayTeam3': [],  'homeTeam1': [], 'awayTeam1': [], 'homeTeam2': [], 'awayTeam2': [], 'homeTeamName': homeTeamName, 'awayTeamName': awayTeamName, 'homeTeamformation': [], 'awayTeamformation': [], 'homeTeamPformation': [], 'awayTeamPformation': [],  'homeTeamLformation': [], 'awayTeamLformation': [], 'home_substitutions': [], 'away_substitutions': [], 'home_legend': [], 'away_legend': [], 'home_rule_set': [], 'away_rule_set': []}
                                }
                            }
                        }

                        let country1 = (competitionArray[i].split('(')[1]).split(')')[0]
                        let league = competitionArray[i].split('(')[0]

                        if(events.length > 0){
                            this.mainList.push({'country': country1, 'league1': league, 'percentage': percentage, 'numbers': numbers, 'events': events})
                        }

                        let self = this
                        this.sortJSON(self.mainList,'country', '123');
                    }
                    console.log('this.mainList for ended==>',this.mainList)
                    this.current_counter = 100
                })
            },
            select_team(home_id, away_id){
                console.log('=======>', home_id, away_id)
                for(let u = 0 ; u < this.mainList.length ; u++) {
                    for (let uu = 0; uu < this.mainList[u].events.length; uu++) {
                        if (this.mainList[u].events[uu].home_id == home_id && this.mainList[u].events[uu].away_id == away_id) {
                            if(this.mainList[u].events[uu].show == true){
                                this.mainList[u].events[uu].show == false
                            }
                            else{
                                this.showModal()

                                window.axios.post(`${process.env.VUE_APP_URL}teamAnalysisSelected`, [home_id, away_id]).then(({data})=> {
                                    console.log('data******', data.data[0])
                                    let main_data = data.data[0]

                                    for(let u = 0 ; u < this.mainList.length ; u++){
                                        for(let uu = 0 ; uu < this.mainList[u].events.length ; uu++){
                                            if(this.mainList[u].events[uu].home_id == home_id && this.mainList[u].events[uu].away_id == away_id){
                                                for(let j = 0; j < main_data.length ; j++){
                                                    // if(competitionArray[i] == main_data[j].competitions[0].league && main_data[j].local_players.length > 0 && main_data[j].visitor_players.length > 0){
                                                    // k++
                                                    let homeTeam = []
                                                    let awayTeam = []
                                                    let homeTeam1 = []
                                                    let awayTeam1 = []
                                                    let localTeamId = main_data[j].localTeamId
                                                    let visitTeamId = main_data[j].visitorTeamId
                                                    let homeTeamName = main_data[j].localTeamName
                                                    let awayTeamName = main_data[j].visitorTeamName
                                                    let homeTeamFormation = ''
                                                    let awayTeamFormation = ''

                                                    if (main_data[j].formations) {
                                                        homeTeamFormation = main_data[j].formations.localteam_formation
                                                        awayTeamFormation = main_data[j].formations.visitorteam_formation
                                                    }

                                                   
                                                    let homeTeamPformation = ''
                                                    let awayTeamPformation = ''
                                                    if(main_data[j].pre_formations){
                                                        homeTeamPformation = main_data[j].pre_formations.localteam_formation
                                                        awayTeamPformation = main_data[j].pre_formations.visitorteam_formation
                                                    }

                                                    // let percentage0 = this.percentage_calculation(main_data[j])
                                                    let homeTeamLformation = ''
                                                    let awayTeamLformation = ''
                                                    if(main_data[j].live_formations){
                                                        homeTeamLformation = main_data[j].live_formations.localteam_formation
                                                        awayTeamLformation = main_data[j].live_formations.visitorteam_formation
                                                    }
                                                    
                                                    if(main_data[j].lineup != null){
                                                        let h_k = 0
                                                        let a_k = 0
                                                        for(let k = 0 ; k < main_data[j].lineup.data.length ; k++){
                                                            if(main_data[j].lineup.data[k].team_id === localTeamId && main_data[j].local_players.length > 0){
                                                                h_k++
                                                                let position = ''
                                                                if(main_data[j].lineup.data[k].position === 'G'){
                                                                    position = 'GK'
                                                                }
                                                                else if(main_data[j].lineup.data[k].position === 'D'){
                                                                    position = 'DEF'
                                                                }
                                                                else if(main_data[j].lineup.data[k].position === 'M'){
                                                                    position = 'MID'
                                                                }
                                                                else if(main_data[j].lineup.data[k].position === 'A'){
                                                                    position = 'FWD'
                                                                }
                                                                else{
                                                                    position = '-'
                                                                }

                                                                let market_value = '...'
                                                                let main_role = '...'
                                                                let alt_role1 = '...'
                                                                let alt_role2 = '...'
                                                                let market_player_name = ''
                                                                let local_players = main_data[j].local_players.filter(function(item) {
                                                                    return item.team_id == localTeamId && item.market_values.length > 0;
                                                                });

                                                                let player_birthday = ''
                                                                let titularity1 = main_data[j].local_players[0].titularity.filter(function(item) {
                                                                    return item.player_id === main_data[j].lineup.data[k].player_id;
                                                                })
                                                                if(titularity1.length > 0){
                                                                    if(titularity1[0].player){
                                                                        player_birthday = titularity1[0].player.data.birthdate
                                                                    }
                                                                }
                                                                if(player_birthday === "NaN/NaN/NaN"){
                                                                    player_birthday = ''
                                                                }

                                                                if(local_players.length > 0){
                                                                    let values = local_players[0].market_values.filter(function(item) {
                                                                        return item.player_number == main_data[j].lineup.data[k].number;
                                                                    });
                                                                    if(values.length > 0){
                                                                        if(values.length > 1){
                                                                            let values00 = local_players[0].market_values.filter(function(item) {
                                                                                return item.player_number == main_data[j].lineup.data[k].number && item.player_birthday == player_birthday;
                                                                            });
                                                                            if(values00.length > 0){
                                                                                market_value = values00[0].player_marketvalue
                                                                                market_player_name = values00[0].player_name
                                                                            }
                                                                        }
                                                                        else{
                                                                            market_value = values[0].player_marketvalue
                                                                            market_player_name = values[0].player_name
                                                                        }
                                                                    }
                                                                    else{
                                                                        let value = local_players[0].market_values.filter(function(item) {
                                                                            return player_birthday == item.player_birthday ;
                                                                        });
                                                                        if(value.length > 0){
                                                                            market_value = value[0].player_marketvalue
                                                                            market_player_name = value[0].player_name

                                                                        }
                                                                        else{
                                                                            let value0 = local_players[0].market_values.filter(function(item) {
                                                                                return item.player_name.trim() == main_data[j].lineup.data[k].player_name;
                                                                            });
                                                                            if(value0.length > 0){
                                                                                market_value = value0[0].player_marketvalue
                                                                                market_player_name = value0[0].player_name
                                                                            }
                                                                            else{
                                                                                let value1 = local_players[0].market_values.filter(function(item) {
                                                                                    return player_birthday == item.player_birthday;
                                                                                });
                                                                                if(value1.length > 0){
                                                                                    market_value = value1[0].player_marketvalue
                                                                                    market_player_name = value1[0].player_name
                                                                                }
                                                                            }
                                                                        }
                                                                    }

                                                                    let roles = local_players[0].roles.filter(function(item) {
                                                                        return item.player_number == main_data[j].lineup.data[k].number && item.player_name == market_player_name;
                                                                    });
                                                                    if(roles.length > 0){
                                                                        main_role = roles[0].player_main_role
                                                                        alt_role1 = roles[0].player_alt_role1
                                                                        alt_role2 = roles[0].player_alt_role2
                                                                        if(localTeamId == 329){
                                                                            console.log('====>', roles[0], main_data[j].lineup.data[k].player_name, main_role, main_data[j].lineup.data[k].number)
                                                                        }
                                                                        if(alt_role1 == ''){
                                                                            alt_role1 = '...'
                                                                        }
                                                                        if(alt_role2 == ''){
                                                                            alt_role2 = '...'
                                                                        }
                                                                    }
                                                                    else{
                                                                        let names = local_players[0].roles.filter(function(item) {
                                                                            return item.player_name.trim() == market_player_name;
                                                                        });
                                                                        if(names.length > 0){
                                                                            main_role = names[0].player_main_role
                                                                            alt_role1 = names[0].player_alt_role1
                                                                            alt_role2 = names[0].player_alt_role2
                                                                            if(alt_role1 == ''){
                                                                                alt_role1 = '...'
                                                                            }
                                                                            if(alt_role2 == ''){
                                                                                alt_role2 = '...'
                                                                            }
                                                                        }
                                                                        else{
                                                                            let namex = local_players[0].roles.filter(function(item) {
                                                                                return item.player_name.trim() === market_player_name;
                                                                            });
                                                                            if(namex.length > 0){
                                                                                main_role = namex[0].player_main_role
                                                                                alt_role1 = namex[0].player_alt_role1
                                                                                alt_role2 = namex[0].player_alt_role2
                                                                                if(alt_role1 == ''){
                                                                                    alt_role1 = '...'
                                                                                }
                                                                                if(alt_role2 == ''){
                                                                                    alt_role2 = '...'
                                                                                }
                                                                            }else{
                                                                                let name0 = local_players[0].roles.filter(function(item) {
                                                                                    return item.player_name.trim().substring(item.player_name.trim().length - 4, item.player_name.trim().length) == main_data[j].lineup.data[k].player_name.substring(main_data[j].lineup.data[k].player_name.length - 4, main_data[j].lineup.data[k].player_name.length);
                                                                                });
                                                                                if(name0.length > 0){
                                                                                    main_role = name0[0].player_main_role
                                                                                    alt_role1 = name0[0].player_alt_role1
                                                                                    alt_role2 = name0[0].player_alt_role2
                                                                                    if(alt_role1 == ''){
                                                                                        alt_role1 = '...'
                                                                                    }
                                                                                    if(alt_role2 == ''){
                                                                                        alt_role2 = '...'
                                                                                    }
                                                                                }
                                                                                else{
                                                                                    let name1 = local_players[0].roles.filter(function(item) {
                                                                                        return item.player_name.trim().substring(0, 3) == main_data[j].lineup.data[k].player_name.substring(0, 3);
                                                                                    });
                                                                                    if(name1.length > 0){
                                                                                        main_role = name1[0].player_main_role
                                                                                        alt_role1 = name1[0].player_alt_role1
                                                                                        alt_role2 = name1[0].player_alt_role2
                                                                                        if(alt_role1 == ''){
                                                                                            alt_role1 = '...'
                                                                                        }
                                                                                        if(alt_role2 == ''){
                                                                                            alt_role2 = '...'
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }

                                                                if(main_role == 'GK'){ position = 'GK' }
                                                                else if(main_role == 'RB'){ position = 'DEF' }
                                                                else if(main_role == 'CB'){ position = 'DEF' }
                                                                else if(main_role == 'LB'){ position = 'DEF' }
                                                                else if(main_role == 'RM'){ position = 'MID' }
                                                                else if(main_role == 'CM'){ position = 'MID' }
                                                                else if(main_role == 'LM'){ position = 'MID' }
                                                                else if(main_role == 'DM'){ position = 'MID' }
                                                                else if(main_role == 'AM'){ position = 'MID' }
                                                                else if(main_role == 'RW'){ position = 'FWD' }
                                                                else if(main_role == 'LW'){ position = 'FWD' }
                                                                else if(main_role == 'SS'){ position = 'FWD' }
                                                                else if(main_role == 'CF'){ position = 'FWD' }

                                                                let Tit = (0).toFixed(2)
                                                                let rate = "..."
                                                                let titularity = main_data[j].local_players[0].titularity.filter(function(item) {
                                                                    return item.player_id === main_data[j].lineup.data[k].player_id;
                                                                })

                                                                let home_team_played = 0
                                                                home_team_played = main_data[j].home_events_number
                                                                let minute = 0
                                                                if(titularity[0]){
                                                                    minute = titularity[0].minutes
                                                                    if(titularity[0].rating){
                                                                        rate = titularity[0].rating
                                                                    }
                                                                }
                                                                if(home_team_played > 0){
                                                                    Tit = (minute/90/home_team_played*100).toFixed(2) + ', ' + home_team_played
                                                                }


                                                                let rule_color = 'rgb(216, 228, 188)'
                                                                // pre-formartion part
                                                                let s_roles = this.s_role_set.filter(function(item) {
                                                                    return item.name === homeTeamPformation;
                                                                })

                                                                if(s_roles.length > 0){
                                                                    let position_number = main_data[j].lineup.data[k].formation_position
                                                                    if(!main_data[j].lineup.data[k].formation_position){
                                                                        position_number = h_k
                                                                    }
                                                                    let s_role = s_roles[0].s_role[position_number - 1]
                                                                    let s_role2 = s_roles[0].alt_s_role[position_number - 1]
                                                                    let s_role3 = s_roles[0].alt_s_role1[position_number - 1]
                                                                    let mean_role = s_roles[0].mean_role[position_number - 1]
                                                                    if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2)) || (mean_role === position && (s_role3 === alt_role1 || s_role3 === alt_role2 || main_role === s_role3))){
                                                                        rule_color = 'rgb(146,208,80)'
                                                                    }
                                                                    else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2)) || (mean_role === position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2)) || (mean_role !== position && (main_role === s_role3 || s_role3 === alt_role1 || s_role3 === alt_role2))){
                                                                        rule_color = 'rgb(255,255,0)'
                                                                    }
                                                                    else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2))){
                                                                        rule_color = 'rgb(255,0,0)'
                                                                    }

                                                                    homeTeam.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id, 'formation_position': position_number, 'teamId':localTeamId ,'sRole': s_role, 'mR': mean_role, 'sRole1': s_role, 'sRole2': s_role2, 'sRole3': s_role3, 'mR1': mean_role, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(216, 228, 188)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit, 'rating': rate})
                                                                }
                                                                else{
                                                                    let position_number = main_data[j].lineup.data[k].formation_position
                                                                    homeTeam.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id, 'formation_position': position_number, 'teamId':localTeamId ,'sRole': '...', 'mR': position, 'sRole1': '...','sRole2': '', 'mR1': position, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(216, 228, 188)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit, 'rating': rate})
                                                                }

                                                                //live formartion part
                                                                let s_roles_live = this.s_role_set.filter(function(item) {
                                                                    return item.name === homeTeamLformation;
                                                                })

                                                                if(s_roles_live.length > 0){
                                                                    let position_number = main_data[j].lineup.data[k].formation_position
                                                                    if(!main_data[j].lineup.data[k].formation_position){
                                                                        position_number = h_k
                                                                    }
                                                                    let s_role = s_roles_live[0].s_role[position_number - 1]
                                                                    let s_role2 = s_roles_live[0].alt_s_role[position_number - 1]
                                                                    let s_role3 = s_roles_live[0].alt_s_role1[position_number - 1]
                                                                    let mean_role = s_roles_live[0].mean_role[position_number - 1]
                                                                    if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2)) || (mean_role === position && (s_role3 === alt_role1 || s_role3 === alt_role2 || main_role === s_role3))){
                                                                        rule_color = 'rgb(146,208,80)'
                                                                    }
                                                                    else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2)) || (mean_role === position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2)) || (mean_role !== position && (main_role === s_role3 || s_role3 === alt_role1 || s_role3 === alt_role2))){
                                                                        rule_color = 'rgb(255,255,0)'
                                                                    }
                                                                    else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2))){
                                                                        rule_color = 'rgb(255,0,0)'
                                                                    }
                                                                    homeTeam1.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id, 'formation_position': position_number, 'teamId':localTeamId ,'sRole': s_role, 'mR': mean_role, 'sRole1': s_role, 'sRole2': s_role2, 'sRole3': s_role3, 'mR1': mean_role, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(216, 228, 188)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit, 'rating': rate})
                                                                }
                                                                else{
                                                                    let position_number = main_data[j].lineup.data[k].formation_position
                                                                    homeTeam1.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id, 'formation_position': position_number, 'teamId':localTeamId ,'sRole': '...', 'mR': position, 'sRole1': '...','sRole2': '', 'mR1': position, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(216, 228, 188)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit, 'rating': rate})
                                                                }
                                                                //-------------------------------------------------------------------
                                                            }
                                                            else{

                                                                let position = ''
                                                                if(main_data[j].lineup.data[k].position === 'G'){
                                                                    position = 'GK'
                                                                }
                                                                else if(main_data[j].lineup.data[k].position === 'D'){
                                                                    position = 'DEF'
                                                                }
                                                                else if(main_data[j].lineup.data[k].position === 'M'){
                                                                    position = 'MID'
                                                                }
                                                                else if(main_data[j].lineup.data[k].position === 'A'){
                                                                    position = 'FWD'
                                                                }
                                                                else{
                                                                    position = '-'
                                                                }

                                                                let market_value = '...'
                                                                let main_role = '...'
                                                                let alt_role1 = '...'
                                                                let alt_role2 = '...'
                                                                let market_player_name = '...'
                                                                let local_players = main_data[j].visitor_players.filter(function(item) {
                                                                    return item.team_id == visitTeamId && item.market_values.length > 0;
                                                                });

                                                                let player_birthday = ''
                                                                let titularity1 = main_data[j].local_players[0].titularity.filter(function(item) {
                                                                    return item.player_id === main_data[j].lineup.data[k].player_id;
                                                                })
                                                                if(titularity1.length > 0){
                                                                    if(titularity1[0].player){
                                                                        player_birthday = titularity1[0].player.data.birthdate
                                                                    }
                                                                }
                                                                if(player_birthday === "NaN/NaN/NaN"){
                                                                    player_birthday = ''
                                                                }

                                                                if(local_players.length > 0){
                                                                    let values = local_players[0].market_values.filter(function(item) {
                                                                        return item.player_number == main_data[j].lineup.data[k].number;
                                                                    });
                                                                    if(values.length > 0){
                                                                        market_value = values[0].player_marketvalue
                                                                        market_player_name  = values[0].player_name
                                                                    }
                                                                    else{
                                                                        let value = local_players[0].market_values.filter(function(item) {
                                                                            return item.player_name == main_data[j].lineup.data[k].player_name;
                                                                        });
                                                                        if(value.length > 0){
                                                                            market_value = value[0].player_marketvalue
                                                                            market_player_name  = value[0].player_name
                                                                        }
                                                                        else{
                                                                            // let value0 = local_players[0].market_values.filter(function(item) {
                                                                            //     return item.player_name.substring(item.player_name.length - 4, item.player_name.length) == main_data[j].lineup.data[k].player_name.substring(main_data[j].lineup.data[k].player_name.length - 4, main_data[j].lineup.data[k].player_name.length) && player_birthday == item.player_birthday;
                                                                            // });
                                                                            let value0 = local_players[0].market_values.filter(function(item) {
                                                                                return player_birthday == item.player_birthday;
                                                                            });
                                                                            if(value0.length > 0){
                                                                                market_value = value0[0].player_marketvalue
                                                                                market_player_name  = value0[0].player_name
                                                                            }
                                                                            else{
                                                                                // let value1 = local_players[0].market_values.filter(function(item) {
                                                                                //     return item.player_name.substring(0, 3) == main_data[j].lineup.data[k].player_name.substring(0, 3) && player_birthday == item.player_birthday;
                                                                                // });
                                                                                let value1 = local_players[0].market_values.filter(function(item) {
                                                                                    return player_birthday == item.player_birthday;
                                                                                });
                                                                                if(value1.length > 0){
                                                                                    market_value = value1[0].player_marketvalue
                                                                                    market_player_name  = value1[0].player_name
                                                                                }
                                                                            }
                                                                        }
                                                                    }

                                                                    let roles = local_players[0].roles.filter(function(item) {
                                                                        return item.player_number == main_data[j].lineup.data[k].number;
                                                                    });
                                                                    if(roles.length > 0){
                                                                        main_role = roles[0].player_main_role
                                                                        alt_role1 = roles[0].player_alt_role1
                                                                        alt_role2 = roles[0].player_alt_role2
                                                                        if(alt_role1 == ''){
                                                                            alt_role1 = '...'
                                                                        }
                                                                        if(alt_role2 == ''){
                                                                            alt_role2 = '...'
                                                                        }
                                                                    }
                                                                    else{
                                                                        let names = local_players[0].roles.filter(function(item) {
                                                                            return item.player_name == main_data[j].lineup.data[k].player_name || market_player_name  == item.player_name;
                                                                        });
                                                                        if(names.length > 0){
                                                                            main_role = names[0].player_main_role
                                                                            alt_role1 = names[0].player_alt_role1
                                                                            alt_role2 = names[0].player_alt_role2
                                                                            if(alt_role1 == ''){
                                                                                alt_role1 = '...'
                                                                            }
                                                                            if(alt_role2 == ''){
                                                                                alt_role2 = '...'
                                                                            }
                                                                        }
                                                                        else{
                                                                            let name0 = local_players[0].roles.filter(function(item) {
                                                                                return item.player_name.substring(item.player_name.length - 4, item.player_name.length) == main_data[j].lineup.data[k].player_name.substring(main_data[j].lineup.data[k].player_name.length - 4, main_data[j].lineup.data[k].player_name.length);
                                                                            });
                                                                            if(name0.length > 0){
                                                                                main_role = name0[0].player_main_role
                                                                                alt_role1 = name0[0].player_alt_role1
                                                                                alt_role2 = name0[0].player_alt_role2
                                                                                if(alt_role1 == ''){
                                                                                    alt_role1 = '...'
                                                                                }
                                                                                if(alt_role2 == ''){
                                                                                    alt_role2 = '...'
                                                                                }
                                                                            }
                                                                            else{
                                                                                let name1 = local_players[0].roles.filter(function(item) {
                                                                                    return item.player_name.substring(0, 3) == main_data[j].lineup.data[k].player_name.substring(0, 3);
                                                                                });
                                                                                if(name1.length > 0){
                                                                                    main_role = name1[0].player_main_role
                                                                                    alt_role1 = name1[0].player_alt_role1
                                                                                    alt_role2 = name1[0].player_alt_role2
                                                                                    if(alt_role1 == ''){
                                                                                        alt_role1 = '...'
                                                                                    }
                                                                                    if(alt_role2 == ''){
                                                                                        alt_role2 = '...'
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }

                                                                if(main_role == 'GK'){ position = 'GK' }
                                                                else if(main_role == 'RB'){ position = 'DEF' }
                                                                else if(main_role == 'CB'){ position = 'DEF' }
                                                                else if(main_role == 'LB'){ position = 'DEF' }
                                                                else if(main_role == 'RM'){ position = 'MID' }
                                                                else if(main_role == 'CM'){ position = 'MID' }
                                                                else if(main_role == 'LM'){ position = 'MID' }
                                                                else if(main_role == 'DM'){ position = 'MID' }
                                                                else if(main_role == 'AM'){ position = 'MID' }
                                                                else if(main_role == 'RW'){ position = 'FWD' }
                                                                else if(main_role == 'LW'){ position = 'FWD' }
                                                                else if(main_role == 'SS'){ position = 'FWD' }
                                                                else if(main_role == 'CF'){ position = 'FWD' }

                                                                let Tit = (0).toFixed(2)
                                                                let rate = '...'
                                                                let titularity = []
                                                                if(main_data[j].visitor_players.length > 0){
                                                                    titularity = main_data[j].visitor_players[0].titularity.filter(function(item) {
                                                                        return item.player_id === main_data[j].lineup.data[k].player_id;
                                                                    })
                                                                }

                                                                let away_team_played = 0
                                                                away_team_played = main_data[j].away_events_number
                                                                let minute = 0
                                                                if(titularity[0]){
                                                                    minute = titularity[0].minutes
                                                                    if(titularity[0].rating){
                                                                        rate = titularity[0].rating
                                                                    }
                                                                }
                                                                if(away_team_played > 0){
                                                                    Tit = (minute/90/away_team_played*100).toFixed(2) + ', ' + away_team_played
                                                                }
                                                                let rule_color = 'rgb(230,184,183)'
                                                                // away pre formation part
                                                                let s_roles = this.s_role_set.filter(function(item) {
                                                                    return item.name === awayTeamPformation;
                                                                });
                                                                a_k++
                                                                if(s_roles.length > 0){
                                                                    let position_number = main_data[j].lineup.data[k].formation_position
                                                                    if(!main_data[j].lineup.data[k].formation_position){
                                                                        position_number = a_k
                                                                    }
                                                                    let s_role = s_roles[0].s_role[position_number - 1]
                                                                    let s_role2 = s_roles[0].alt_s_role[position_number - 1]
                                                                    let s_role3 = s_roles[0].alt_s_role1[position_number - 1]
                                                                    let mean_role = s_roles[0].mean_role[position_number - 1]
                                                                    if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2)) || (mean_role === position && (s_role3 === alt_role1 || s_role3 === alt_role2 || main_role === s_role3))){
                                                                        rule_color = 'rgb(146,208,80)'
                                                                    }
                                                                    else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2)) || (mean_role === position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2)) || (mean_role !== position && (main_role === s_role3 || s_role3 === alt_role1 || s_role3 === alt_role2))){
                                                                        rule_color = 'rgb(255,255,0)'
                                                                    }
                                                                    else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2))){
                                                                        rule_color = 'rgb(255,0,0)'
                                                                    }
                                                                    awayTeam.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id,'formation_position': position_number, 'teamId': visitTeamId, 'sRole': s_role, 'mR': mean_role, 'sRole1': s_role, 'sRole2': s_role2, 'sRole3': s_role3, 'mR1': mean_role, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(230, 184, 183)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit, 'rating': rate})
                                                                }
                                                                else{
                                                                    let position_number = main_data[j].lineup.data[k].formation_position
                                                                    awayTeam.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id,'formation_position': position_number,  'teamId': visitTeamId, 'sRole': '...', 'mR': position, 'sRole1': '...', 'sRole2': '', 'mR1': position, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(230, 184, 183)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit, 'rating': rate})
                                                                }
                                                                // away live formation part
                                                                let s_roles_live_a = this.s_role_set.filter(function(item) {
                                                                    return item.name === awayTeamLformation;
                                                                });

                                                                if(s_roles_live_a.length > 0){
                                                                    let position_number = main_data[j].lineup.data[k].formation_position
                                                                    if(!main_data[j].lineup.data[k].formation_position){
                                                                        position_number = a_k
                                                                    }
                                                                    let s_role = s_roles_live_a[0].s_role[position_number - 1]
                                                                    let s_role2 = s_roles_live_a[0].alt_s_role[position_number - 1]
                                                                    let s_role3 = s_roles_live_a[0].alt_s_role1[position_number - 1]
                                                                    let mean_role = s_roles_live_a[0].mean_role[position_number - 1]
                                                                    if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2)) || (mean_role === position && (s_role3 === alt_role1 || s_role3 === alt_role2 || main_role === s_role3))){
                                                                        rule_color = 'rgb(146,208,80)'
                                                                    }
                                                                    else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2)) || (mean_role === position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2)) || (mean_role !== position && (main_role === s_role3 || s_role3 === alt_role1 || s_role3 === alt_role2))){
                                                                        rule_color = 'rgb(255,255,0)'
                                                                    }
                                                                    else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2))){
                                                                        rule_color = 'rgb(255,0,0)'
                                                                    }
                                                                    awayTeam1.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id,'formation_position': position_number, 'teamId': visitTeamId, 'sRole': s_role, 'mR': mean_role, 'sRole1': s_role, 'sRole2': s_role2, 'sRole3': s_role3, 'mR1': mean_role, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(230, 184, 183)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit, 'rating': rate})
                                                                }
                                                                else{
                                                                    let position_number = main_data[j].lineup.data[k].formation_position
                                                                    awayTeam1.push({'order_key': 0, 'playerId':main_data[j].lineup.data[k].player_id,'formation_position': position_number,  'teamId': visitTeamId, 'sRole': '...', 'mR': position, 'sRole1': '...', 'sRole2': '', 'mR1': position, 'Pname': main_data[j].lineup.data[k].player_name, 'marketValue': market_value, 'p_m_Role': position, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': 'rgb(230, 184, 183)', 'sub_minute': '', 'rule_color': rule_color, 'Tit': Tit, 'rating': rate})
                                                                }
                                                            }
                                                        }

                                                        let local_sub_array = []
                                                        let visitor_sub_array = []
                                                        let localTeam_substitution_index = 0
                                                        let visitorTeam_substitution_index = 0
                                                        if(main_data[j].events1 != null){
                                                            for(let k = 0 ; k < main_data[j].events1.data.length ; k++){
                                                                let eventsNode = main_data[j].events1.data[k]
                                                                if(eventsNode.type === 'substitution'){
                                                                    if(eventsNode.team_id == localTeamId){
                                                                        localTeam_substitution_index++
                                                                        local_sub_array[localTeam_substitution_index - 1] = {'minute': eventsNode.minute, 'player_id': eventsNode.player_id, 'player_name':eventsNode.player_name, 'related_player_id': eventsNode.related_player_id, 'related_player_name': eventsNode.related_player_name}
                                                                    }
                                                                    else{
                                                                        visitorTeam_substitution_index++
                                                                        visitor_sub_array[visitorTeam_substitution_index - 1] = {'minute': eventsNode.minute, 'player_id': eventsNode.player_id, 'player_name':eventsNode.player_name, 'related_player_id': eventsNode.related_player_id, 'related_player_name': eventsNode.related_player_name}
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        let home_order_index = 0
                                                        let home_substitutions = []
                                                        for(let kk = 0 ; kk < local_sub_array.length; kk++){
                                                            for(let k = 0 ; k < homeTeam.length ; k++){
                                                                if(homeTeam[k].playerId === local_sub_array[kk].related_player_id){
                                                                    home_order_index++
                                                                    homeTeam[k].sub_order_color = this.sub_color_set[home_order_index - 1].color
                                                                    homeTeam[k].sub_minute = local_sub_array[kk].minute
                                                                    let local_players_markets = main_data[j].local_players[0].market_values
                                                                    let local_players_roles = main_data[j].local_players[0].roles
                                                                    let local_players_titularity = main_data[j].local_players[0].titularity

                                                                    let market_value = '...'
                                                                    let player_name = '...'
                                                                    let player_birthday = '...'
                                                                    let main_role = '...'
                                                                    let alt_role1 = '...'
                                                                    let alt_role2 = '...'

                                                                    let players = local_players_titularity.filter(function(item) {
                                                                        return item.player_id === local_sub_array[kk].player_id
                                                                    });

                                                                    if(players.length > 0){
                                                                        if(players[0].player){
                                                                            player_birthday = players[0].player.data.birthdate
                                                                        }
                                                                    }

                                                                    let market_values = local_players_markets.filter(function(item) {
                                                                        return item.player_birthday === player_birthday;
                                                                    });
                                                                    if(market_values.length > 0){
                                                                        market_value = market_values[0].player_marketvalue
                                                                        player_name = market_values[0].player_name
                                                                    }
                                                                    else{
                                                                        let compare_index = 0
                                                                        for(let n = 0 ; n < local_players_markets.length ; n++){
                                                                            let compare1 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 4, local_players_markets[n].player_name.length - 3)
                                                                            let compare2 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 3, local_players_markets[n].player_name.length - 2)
                                                                            let compare3 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 2, local_players_markets[n].player_name.length - 1)
                                                                            let compare4 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 1, local_players_markets[n].player_name.length)
                                                                            let local_compare1 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 4, local_sub_array[kk].player_name.length - 3)
                                                                            let local_compare2 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 3, local_sub_array[kk].player_name.length - 2)
                                                                            let local_compare3 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 2, local_sub_array[kk].player_name.length - 1)
                                                                            let local_compare4 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 1, local_sub_array[kk].player_name.length)
                                                                            if(compare1 === local_compare1){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare2 === local_compare2){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare3 === local_compare3){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare4 === local_compare4){
                                                                                compare_index++
                                                                            }
                                                                            if(compare_index >= 3){
                                                                                market_value = local_players_markets[n].player_marketvalue
                                                                            }
                                                                        }
                                                                    }

                                                                    let roles = local_players_roles.filter(function(item) {
                                                                        return item.player_name.trim() === player_name.trim();
                                                                    });
                                                                    if(roles.length > 0){
                                                                        main_role = roles[0].player_main_role
                                                                        alt_role1 = roles[0].player_alt_role1
                                                                        alt_role2 = roles[0].player_alt_role2
                                                                    }
                                                                    else{
                                                                        let compare_index = 0
                                                                        for(let n = 0 ; n < local_players_roles.length ; n++){
                                                                            let compare1 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 4, local_players_roles[n].player_name.length - 3)
                                                                            let compare2 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 3, local_players_roles[n].player_name.length - 2)
                                                                            let compare3 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 2, local_players_roles[n].player_name.length - 1)
                                                                            let compare4 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 1, local_players_roles[n].player_name.length)
                                                                            let local_compare1 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 4, local_sub_array[kk].player_name.length - 3)
                                                                            let local_compare2 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 3, local_sub_array[kk].player_name.length - 2)
                                                                            let local_compare3 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 2, local_sub_array[kk].player_name.length - 1)
                                                                            let local_compare4 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 1, local_sub_array[kk].player_name.length)
                                                                            if(compare1 === local_compare1){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare2 === local_compare2){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare3 === local_compare3){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare4 === local_compare4){
                                                                                compare_index++
                                                                            }
                                                                            if(compare_index >= 3){
                                                                                main_role = local_players_roles[n].player_main_role
                                                                                alt_role1 = local_players_roles[n].player_alt_role1
                                                                                alt_role2 = local_players_roles[n].player_alt_role2
                                                                            }
                                                                        }
                                                                    }

                                                                    let rule_color = 'rgb(216,228,188)'
                                                                    let mean_role = homeTeam[k].mR
                                                                    let position = homeTeam[k].p_m_Role
                                                                    let s_role = homeTeam[k].sRole
                                                                    let s_role2 = homeTeam[k].sRole2

                                                                    if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2))){
                                                                        rule_color = 'rgb(146,208,80)'
                                                                    }
                                                                    else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2))){
                                                                        rule_color = 'rgb(255,255,0)'
                                                                    }
                                                                    else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2))){
                                                                        rule_color = 'rgb(255,0,0)'
                                                                    }

                                                                    let Tit = (0).toFixed(2)
                                                                    let titularity = main_data[j].local_players[0].titularity.filter(function(item) {
                                                                        return item.player_id === local_sub_array[kk].player_id;
                                                                    })

                                                                    let home_team_played = 0
                                                                    home_team_played = main_data[j].home_events_number
                                                                    let minute = 0
                                                                    if(titularity[0]){
                                                                        minute = titularity[0].minutes
                                                                    }
                                                                    if(home_team_played > 0){
                                                                        Tit = (minute/90/home_team_played*100).toFixed(2) + ', ' + home_team_played
                                                                    }
                                                                    home_substitutions.push({'playerId': local_sub_array[kk].player_id, 'teamId':homeTeam[k].teamId ,'sRole': homeTeam[k].sRole, 'sRole2': homeTeam[k].sRole2, 'mR': homeTeam[k].mR, 'Pname': local_sub_array[kk].player_name, 'marketValue': market_value, 'p_m_Role': homeTeam[k].p_m_Role, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': homeTeam[k].sub_order_color, 'sub_minute': homeTeam[k].sub_minute, 'rule_color': rule_color, 'Tit': Tit})
                                                                }
                                                            }
                                                        }
                                                        home_order_index = 0
                                                        for(let kk = 0 ; kk < local_sub_array.length; kk++){
                                                            for(let k = 0 ; k < homeTeam1.length ; k++){
                                                                if(homeTeam1[k].playerId === local_sub_array[kk].related_player_id){
                                                                    home_order_index++
                                                                    homeTeam1[k].sub_order_color = this.sub_color_set[home_order_index - 1].color
                                                                    homeTeam1[k].sub_minute = local_sub_array[kk].minute
                                                                    let local_players_markets = main_data[j].local_players[0].market_values
                                                                    let local_players_roles = main_data[j].local_players[0].roles
                                                                    let local_players_titularity = main_data[j].local_players[0].titularity

                                                                    let market_value = '...'
                                                                    let player_name = '...'
                                                                    let player_birthday = '...'
                                                                    let main_role = '...'
                                                                    let alt_role1 = '...'
                                                                    let alt_role2 = '...'

                                                                    let players = local_players_titularity.filter(function(item) {
                                                                        return item.player_id === local_sub_array[kk].player_id
                                                                    });

                                                                    if(players.length > 0){
                                                                        if(players[0].player){
                                                                            player_birthday = players[0].player.data.birthdate
                                                                        }
                                                                    }

                                                                    let market_values = local_players_markets.filter(function(item) {
                                                                        return item.player_birthday === player_birthday;
                                                                    });
                                                                    if(market_values.length > 0){
                                                                        market_value = market_values[0].player_marketvalue
                                                                        player_name = market_values[0].player_name
                                                                    }
                                                                    else{
                                                                        let compare_index = 0
                                                                        for(let n = 0 ; n < local_players_markets.length ; n++){
                                                                            let compare1 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 4, local_players_markets[n].player_name.length - 3)
                                                                            let compare2 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 3, local_players_markets[n].player_name.length - 2)
                                                                            let compare3 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 2, local_players_markets[n].player_name.length - 1)
                                                                            let compare4 = local_players_markets[n].player_name.substring(local_players_markets[n].player_name.length - 1, local_players_markets[n].player_name.length)
                                                                            let local_compare1 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 4, local_sub_array[kk].player_name.length - 3)
                                                                            let local_compare2 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 3, local_sub_array[kk].player_name.length - 2)
                                                                            let local_compare3 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 2, local_sub_array[kk].player_name.length - 1)
                                                                            let local_compare4 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 1, local_sub_array[kk].player_name.length)
                                                                            if(compare1 === local_compare1){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare2 === local_compare2){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare3 === local_compare3){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare4 === local_compare4){
                                                                                compare_index++
                                                                            }
                                                                            if(compare_index >= 3){
                                                                                market_value = local_players_markets[n].player_marketvalue
                                                                            }
                                                                        }
                                                                    }

                                                                    let roles = local_players_roles.filter(function(item) {
                                                                        return item.player_name.trim() === player_name.trim();
                                                                    });
                                                                    if(roles.length > 0){
                                                                        main_role = roles[0].player_main_role
                                                                        alt_role1 = roles[0].player_alt_role1
                                                                        alt_role2 = roles[0].player_alt_role2
                                                                    }
                                                                    else{
                                                                        let compare_index = 0
                                                                        for(let n = 0 ; n < local_players_roles.length ; n++){
                                                                            let compare1 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 4, local_players_roles[n].player_name.length - 3)
                                                                            let compare2 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 3, local_players_roles[n].player_name.length - 2)
                                                                            let compare3 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 2, local_players_roles[n].player_name.length - 1)
                                                                            let compare4 = local_players_roles[n].player_name.substring(local_players_roles[n].player_name.length - 1, local_players_roles[n].player_name.length)
                                                                            let local_compare1 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 4, local_sub_array[kk].player_name.length - 3)
                                                                            let local_compare2 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 3, local_sub_array[kk].player_name.length - 2)
                                                                            let local_compare3 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 2, local_sub_array[kk].player_name.length - 1)
                                                                            let local_compare4 = local_sub_array[kk].player_name.substring(local_sub_array[kk].player_name.length - 1, local_sub_array[kk].player_name.length)
                                                                            if(compare1 === local_compare1){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare2 === local_compare2){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare3 === local_compare3){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare4 === local_compare4){
                                                                                compare_index++
                                                                            }
                                                                            if(compare_index >= 3){
                                                                                main_role = local_players_roles[n].player_main_role
                                                                                alt_role1 = local_players_roles[n].player_alt_role1
                                                                                alt_role2 = local_players_roles[n].player_alt_role2
                                                                            }
                                                                        }
                                                                    }

                                                                    let Tit = (0).toFixed(2)
                                                                    let rate = '...'
                                                                    let titularity = main_data[j].local_players[0].titularity.filter(function(item) {
                                                                        return item.player_id === local_sub_array[kk].player_id;
                                                                    })

                                                                    let home_team_played = 0
                                                                    home_team_played = main_data[j].home_events_number
                                                                    let minute = 0
                                                                    if(titularity[0]){
                                                                        minute = titularity[0].minutes
                                                                        if(titularity[0].rating){
                                                                            rate = titularity[0].rating
                                                                        }
                                                                    }
                                                                    if(home_team_played > 0){
                                                                        Tit = (minute/90/home_team_played*100).toFixed(2) + ', ' + home_team_played
                                                                    }
                                                                    homeTeam1[k].playerId = local_sub_array[kk].player_id
                                                                    homeTeam1[k].Pname = local_sub_array[kk].player_name
                                                                    homeTeam1[k].marketValue = market_value
                                                                    homeTeam1[k].primaryRole = main_role
                                                                    homeTeam1[k].altRole1 = alt_role1
                                                                    homeTeam1[k].altRole2 = alt_role2
                                                                    homeTeam1[k].Tit = Tit
                                                                    homeTeam1[k].rating = rate

                                                                    if(main_role == 'GK'){ homeTeam1[k].p_m_Role = 'GK' }
                                                                    else if(main_role == 'RB'){ homeTeam1[k].p_m_Role = 'DEF' }
                                                                    else if(main_role == 'CB'){ homeTeam1[k].p_m_Role = 'DEF' }
                                                                    else if(main_role == 'LB'){ homeTeam1[k].p_m_Role = 'DEF' }
                                                                    else if(main_role == 'RM'){ homeTeam1[k].p_m_Role = 'MID' }
                                                                    else if(main_role == 'CM'){ homeTeam1[k].p_m_Role = 'MID' }
                                                                    else if(main_role == 'LM'){ homeTeam1[k].p_m_Role = 'MID' }
                                                                    else if(main_role == 'DM'){ homeTeam1[k].p_m_Role = 'MID' }
                                                                    else if(main_role == 'AM'){ homeTeam1[k].p_m_Role = 'MID' }
                                                                    else if(main_role == 'RW'){ homeTeam1[k].p_m_Role = 'FWD' }
                                                                    else if(main_role == 'LW'){ homeTeam1[k].p_m_Role = 'FWD' }
                                                                    else if(main_role == 'SS'){ homeTeam1[k].p_m_Role = 'FWD' }
                                                                    else if(main_role == 'CF'){ homeTeam1[k].p_m_Role = 'FWD' }

                                                                    let rule_color = 'rgb(216,228,188)'
                                                                    let mean_role = homeTeam1[k].mR
                                                                    let position = homeTeam1[k].p_m_Role
                                                                    let s_role = homeTeam1[k].sRole
                                                                    let s_role2 = homeTeam1[k].sRole2
                                                                    let s_role3 = homeTeam1[k].sRole3

                                                                    if(s_role2 === ''){
                                                                        s_role2 = '...'
                                                                    }
                                                                    if(s_role3 === ''){
                                                                        s_role3 === '...'
                                                                    }
                                                                    if(alt_role1 === ''){
                                                                        alt_role1 = '...'
                                                                    }
                                                                    if(alt_role2 === ''){
                                                                        alt_role2 = '...'
                                                                    }
                                                                    if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && s_role2 != '...' && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2)) || (mean_role === position && (s_role3 != '' && s_role3 != '...') && (s_role3 === alt_role1 || s_role3 === alt_role2 || main_role === s_role3))){
                                                                        rule_color = 'rgb(146,208,80)'
                                                                    }
                                                                    else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2)) || (mean_role === position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2)) || (mean_role !== position && (main_role === s_role3 || s_role3 === alt_role1 || s_role3 === alt_role2))){
                                                                        rule_color = 'rgb(255,255,0)'
                                                                    }
                                                                    else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2))){
                                                                        rule_color = 'rgb(255,0,0)'
                                                                    }
                                                                    homeTeam1[k].rule_color = rule_color
                                                                    // if(localTeamId === 329){
                                                                    //     console.log('local_sub_array====>', local_sub_array[kk].player_name, mean_role,', ', position, ', ', s_role, ', ' ,main_role, ', ', alt_role1, ', ', alt_role2, ', ', s_role2, ', ', s_role3)
                                                                    // }
                                                                    // home_substitutions.push({'playerId': local_sub_array[kk].player_id, 'teamId':homeTeam[k].teamId ,'sRole': homeTeam[k].sRole, 'sRole2': homeTeam[k].sRole2, 'mR': homeTeam[k].mR, 'Pname': local_sub_array[kk].player_name, 'marketValue': market_value, 'p_m_Role': homeTeam[k].p_m_Role, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': homeTeam[k].sub_order_color, 'sub_minute': homeTeam[k].sub_minute, 'rule_color': rule_color, 'Tit': Tit})
                                                                }
                                                            }
                                                        }

                                                        let away_order_index = 0
                                                        let away_substitutions = []
                                                        for(let kk = 0 ; kk < visitor_sub_array.length; kk++){
                                                            for(let k = 0 ; k < awayTeam.length ; k++){
                                                                if(awayTeam[k].playerId === visitor_sub_array[kk].related_player_id){
                                                                    away_order_index++
                                                                    awayTeam[k].sub_order_color = this.sub_color_set[away_order_index - 1].color
                                                                    awayTeam[k].sub_minute = visitor_sub_array[kk].minute

                                                                    let visitor_players_markets = []
                                                                    let visitor_players_roles = []
                                                                    let visitor_players_titularity = []
                                                                    if(main_data[j].visitor_players.length > 0){
                                                                        visitor_players_markets = main_data[j].visitor_players[0].market_values
                                                                        visitor_players_roles = main_data[j].visitor_players[0].roles
                                                                        visitor_players_titularity = main_data[j].visitor_players[0].titularity
                                                                    }
                                                                    let market_value = '...'
                                                                    let player_name = '...'
                                                                    let player_birthday = '...'
                                                                    let main_role = '...'
                                                                    let alt_role1 = '...'
                                                                    let alt_role2 = '...'

                                                                    let players = visitor_players_titularity.filter(function(item) {
                                                                        return item.player_id === visitor_sub_array[kk].player_id
                                                                    });

                                                                    if(players.length > 0){
                                                                        if(players[0].player){
                                                                            player_birthday = players[0].player.data.birthdate
                                                                        }
                                                                    }

                                                                    let market_values = visitor_players_markets.filter(function(item) {
                                                                        return item.player_birthday === player_birthday;
                                                                    });
                                                                    if(market_values.length > 0){
                                                                        market_value = market_values[0].player_marketvalue
                                                                        player_name = market_values[0].player_name
                                                                    }
                                                                    else{
                                                                        let compare_index = 0
                                                                        for(let n = 0 ; n < visitor_players_markets.length ; n++){
                                                                            let compare1 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 4, visitor_players_markets[n].player_name.length - 3)
                                                                            let compare2 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 3, visitor_players_markets[n].player_name.length - 2)
                                                                            let compare3 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 2, visitor_players_markets[n].player_name.length - 1)
                                                                            let compare4 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 1, visitor_players_markets[n].player_name.length)
                                                                            let local_compare1 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 4, visitor_sub_array[kk].player_name.length - 3)
                                                                            let local_compare2 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 3, visitor_sub_array[kk].player_name.length - 2)
                                                                            let local_compare3 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 2, visitor_sub_array[kk].player_name.length - 1)
                                                                            let local_compare4 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 1, visitor_sub_array[kk].player_name.length)
                                                                            if(compare1 === local_compare1){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare2 === local_compare2){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare3 === local_compare3){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare4 === local_compare4){
                                                                                compare_index++
                                                                            }
                                                                            if(compare_index >= 3){
                                                                                market_value = visitor_players_markets[n].player_marketvalue
                                                                            }
                                                                        }
                                                                    }

                                                                    let roles = visitor_players_roles.filter(function(item) {
                                                                        return item.player_name.trim() === player_name.trim();
                                                                    });
                                                                    if(roles.length > 0){
                                                                        main_role = roles[0].player_main_role
                                                                        alt_role1 = roles[0].player_alt_role1
                                                                        alt_role2 = roles[0].player_alt_role2
                                                                    }
                                                                    else{
                                                                        let compare_index = 0
                                                                        for(let n = 0 ; n < visitor_players_roles.length ; n++){
                                                                            let compare1 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 4, visitor_players_roles[n].player_name.length - 3)
                                                                            let compare2 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 3, visitor_players_roles[n].player_name.length - 2)
                                                                            let compare3 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 2, visitor_players_roles[n].player_name.length - 1)
                                                                            let compare4 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 1, visitor_players_roles[n].player_name.length)
                                                                            let local_compare1 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 4, visitor_sub_array[kk].player_name.length - 3)
                                                                            let local_compare2 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 3, visitor_sub_array[kk].player_name.length - 2)
                                                                            let local_compare3 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 2, visitor_sub_array[kk].player_name.length - 1)
                                                                            let local_compare4 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 1, visitor_sub_array[kk].player_name.length)
                                                                            if(compare1 === local_compare1){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare2 === local_compare2){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare3 === local_compare3){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare4 === local_compare4){
                                                                                compare_index++
                                                                            }
                                                                            if(compare_index >= 3){
                                                                                main_role = visitor_players_roles[n].player_main_role
                                                                                alt_role1 = visitor_players_roles[n].player_alt_role1
                                                                                alt_role2 = visitor_players_roles[n].player_alt_role2
                                                                            }
                                                                        }
                                                                    }

                                                                    if(visitor_sub_array[kk].player_id === 323){
                                                                        console.log('***********', player_name, player_birthday, main_role)
                                                                    }

                                                                    let rule_color = 'rgb(230,184,183)'
                                                                    let mean_role = awayTeam[k].mR
                                                                    let position = awayTeam[k].p_m_Role
                                                                    let s_role = awayTeam[k].sRole
                                                                    let s_role2 = awayTeam[k].sRole2
                                                                    let s_role3 = awayTeam[k].sRole3
                                                                    if(s_role2 === ''){
                                                                        s_role2 = '...'
                                                                    }

                                                                    if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2)) || (mean_role === position && (s_role3 === alt_role1 || s_role3 === alt_role2 || main_role === s_role3))){
                                                                        rule_color = 'rgb(146,208,80)'
                                                                    }
                                                                    else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2)) || (mean_role === position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2)) || (mean_role !== position && (main_role === s_role3 || s_role3 === alt_role1 || s_role3 === alt_role2))){
                                                                        rule_color = 'rgb(255,255,0)'
                                                                    }
                                                                    else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2))){
                                                                        rule_color = 'rgb(255,0,0)'
                                                                    }

                                                                    let Tit = (0).toFixed(2)
                                                                    let titularity = []
                                                                    if(main_data[j].visitor_players.length > 0){
                                                                        titularity = main_data[j].visitor_players[0].titularity.filter(function(item) {
                                                                            return item.player_id === visitor_sub_array[kk].player_id;
                                                                        })
                                                                    }

                                                                    let away_team_played = 0
                                                                    away_team_played = main_data[j].away_events_number
                                                                    let minute = 0
                                                                    if(titularity[0]){
                                                                        minute = titularity[0].minutes
                                                                    }
                                                                    if(away_team_played > 0){
                                                                        Tit = (minute/90/away_team_played*100).toFixed(2) + ', ' + away_team_played
                                                                    }
                                                                    //-----------------
                                                                    away_substitutions.push({'playerId': visitor_sub_array[kk].player_id, 'teamId':awayTeam[k].teamId ,'sRole': awayTeam[k].sRole, 'sRole2': awayTeam[k].sRole2, 'mR': awayTeam[k].mR, 'Pname': visitor_sub_array[kk].player_name, 'marketValue': market_value, 'p_m_Role': awayTeam[k].p_m_Role, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': awayTeam[k].sub_order_color, 'sub_minute': awayTeam[k].sub_minute,'rule_color': rule_color, 'Tit': Tit})
                                                                }
                                                            }
                                                        }
                                                        away_order_index = 0
                                                        for(let kk = 0 ; kk < visitor_sub_array.length; kk++){
                                                            for(let k = 0 ; k < awayTeam1.length ; k++){
                                                                if(awayTeam1[k].playerId === visitor_sub_array[kk].related_player_id){
                                                                    away_order_index++
                                                                    awayTeam1[k].sub_order_color = this.sub_color_set[away_order_index - 1].color
                                                                    awayTeam1[k].sub_minute = visitor_sub_array[kk].minute

                                                                    let visitor_players_markets = []
                                                                    let visitor_players_roles = []
                                                                    let visitor_players_titularity = []
                                                                    if(main_data[j].visitor_players.length > 0){
                                                                        visitor_players_markets = main_data[j].visitor_players[0].market_values
                                                                        visitor_players_roles = main_data[j].visitor_players[0].roles
                                                                        visitor_players_titularity = main_data[j].visitor_players[0].titularity
                                                                    }

                                                                    let market_value = '...'
                                                                    let player_name = '...'
                                                                    let player_birthday = '...'
                                                                    let main_role = '...'
                                                                    let alt_role1 = '...'
                                                                    let alt_role2 = '...'

                                                                    let players = visitor_players_titularity.filter(function(item) {
                                                                        return item.player_id === visitor_sub_array[kk].player_id
                                                                    });

                                                                    if(players.length > 0){
                                                                        if(players[0].player){
                                                                            player_birthday = players[0].player.data.birthdate
                                                                        }
                                                                    }

                                                                    let market_values = visitor_players_markets.filter(function(item) {
                                                                        return item.player_birthday === player_birthday;
                                                                    });

                                                                    if(market_values.length > 0){
                                                                        market_value = market_values[0].player_marketvalue
                                                                        player_name = market_values[0].player_name
                                                                    }
                                                                    else{
                                                                        let compare_index = 0
                                                                        for(let n = 0 ; n < visitor_players_markets.length ; n++){
                                                                            let compare1 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 4, visitor_players_markets[n].player_name.length - 3)
                                                                            let compare2 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 3, visitor_players_markets[n].player_name.length - 2)
                                                                            let compare3 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 2, visitor_players_markets[n].player_name.length - 1)
                                                                            let compare4 = visitor_players_markets[n].player_name.substring(visitor_players_markets[n].player_name.length - 1, visitor_players_markets[n].player_name.length)
                                                                            let local_compare1 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 4, visitor_sub_array[kk].player_name.length - 3)
                                                                            let local_compare2 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 3, visitor_sub_array[kk].player_name.length - 2)
                                                                            let local_compare3 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 2, visitor_sub_array[kk].player_name.length - 1)
                                                                            let local_compare4 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 1, visitor_sub_array[kk].player_name.length)
                                                                            if(compare1 === local_compare1){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare2 === local_compare2){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare3 === local_compare3){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare4 === local_compare4){
                                                                                compare_index++
                                                                            }
                                                                            if(compare_index >= 3){
                                                                                market_value = visitor_players_markets[n].player_marketvalue
                                                                            }
                                                                        }
                                                                    }

                                                                    let roles = visitor_players_roles.filter(function(item) {
                                                                        return item.player_name.trim() === player_name.trim();
                                                                    });
                                                                    if(roles.length > 0){
                                                                        main_role = roles[0].player_main_role
                                                                        alt_role1 = roles[0].player_alt_role1
                                                                        alt_role2 = roles[0].player_alt_role2
                                                                    }
                                                                    else{
                                                                        let compare_index = 0
                                                                        for(let n = 0 ; n < visitor_players_roles.length ; n++){
                                                                            let compare1 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 4, visitor_players_roles[n].player_name.length - 3)
                                                                            let compare2 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 3, visitor_players_roles[n].player_name.length - 2)
                                                                            let compare3 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 2, visitor_players_roles[n].player_name.length - 1)
                                                                            let compare4 = visitor_players_roles[n].player_name.substring(visitor_players_roles[n].player_name.length - 1, visitor_players_roles[n].player_name.length)
                                                                            let local_compare1 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 4, visitor_sub_array[kk].player_name.length - 3)
                                                                            let local_compare2 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 3, visitor_sub_array[kk].player_name.length - 2)
                                                                            let local_compare3 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 2, visitor_sub_array[kk].player_name.length - 1)
                                                                            let local_compare4 = visitor_sub_array[kk].player_name.substring(visitor_sub_array[kk].player_name.length - 1, visitor_sub_array[kk].player_name.length)
                                                                            if(compare1 === local_compare1){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare2 === local_compare2){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare3 === local_compare3){
                                                                                compare_index++
                                                                            }
                                                                            else if(compare4 === local_compare4){
                                                                                compare_index++
                                                                            }
                                                                            if(compare_index >= 3){
                                                                                main_role = visitor_players_roles[n].player_main_role
                                                                                alt_role1 = visitor_players_roles[n].player_alt_role1
                                                                                alt_role2 = visitor_players_roles[n].player_alt_role2
                                                                            }
                                                                        }
                                                                    }

                                                                    let Tit = (0).toFixed(2)
                                                                    let rate = '...'
                                                                    let titularity = []
                                                                    if(main_data[j].visitor_players.length > 0){
                                                                        titularity = main_data[j].visitor_players[0].titularity.filter(function(item) {
                                                                            return item.player_id === visitor_sub_array[kk].player_id;
                                                                        })
                                                                    }

                                                                    let away_team_played = 0
                                                                    away_team_played = main_data[j].away_events_number
                                                                    let minute = 0
                                                                    if(titularity[0]){
                                                                        minute = titularity[0].minutes
                                                                        if(titularity[0].rating){
                                                                            rate = titularity[0].rating
                                                                        }
                                                                    }
                                                                    if(away_team_played > 0){
                                                                        Tit = (minute/90/away_team_played*100).toFixed(2) + ', ' + away_team_played
                                                                    }
                                                                    //-----------------------
                                                                    awayTeam1[k].playerId = visitor_sub_array[kk].player_id
                                                                    awayTeam1[k].Pname = visitor_sub_array[kk].player_name
                                                                    awayTeam1[k].marketValue = market_value
                                                                    awayTeam1[k].primaryRole = main_role
                                                                    awayTeam1[k].altRole1 = alt_role1
                                                                    awayTeam1[k].altRole2 = alt_role2
                                                                    awayTeam1[k].Tit = Tit
                                                                    awayTeam1[k].rating = rate
                                                                    if(main_role == 'GK'){ awayTeam1[k].p_m_Role = 'GK' }
                                                                    else if(main_role == 'RB'){ awayTeam1[k].p_m_Role = 'DEF' }
                                                                    else if(main_role == 'CB'){ awayTeam1[k].p_m_Role = 'DEF' }
                                                                    else if(main_role == 'LB'){ awayTeam1[k].p_m_Role = 'DEF' }
                                                                    else if(main_role == 'RM'){ awayTeam1[k].p_m_Role = 'MID' }
                                                                    else if(main_role == 'CM'){ awayTeam1[k].p_m_Role = 'MID' }
                                                                    else if(main_role == 'LM'){ awayTeam1[k].p_m_Role = 'MID' }
                                                                    else if(main_role == 'DM'){ awayTeam1[k].p_m_Role = 'MID' }
                                                                    else if(main_role == 'AM'){ awayTeam1[k].p_m_Role = 'MID' }
                                                                    else if(main_role == 'RW'){ awayTeam1[k].p_m_Role = 'FWD' }
                                                                    else if(main_role == 'LW'){ awayTeam1[k].p_m_Role = 'FWD' }
                                                                    else if(main_role == 'SS'){ awayTeam1[k].p_m_Role = 'FWD' }
                                                                    else if(main_role == 'CF'){ awayTeam1[k].p_m_Role = 'FWD' }

                                                                    let rule_color = 'rgb(230,184,183)'
                                                                    let mean_role = awayTeam1[k].mR
                                                                    let position = awayTeam1[k].p_m_Role
                                                                    let s_role = awayTeam1[k].sRole
                                                                    let s_role2 = awayTeam1[k].sRole2
                                                                    let s_role3 = awayTeam1[k].sRole3
                                                                    if(s_role2 === ''){
                                                                        s_role2 = '...'
                                                                    }
                                                                    if(s_role3 === ''){
                                                                        s_role3 === '...'
                                                                    }
                                                                    if(alt_role1 === ''){
                                                                        alt_role1 = '...'
                                                                    }
                                                                    if(alt_role2 === ''){
                                                                        alt_role2 = '...'
                                                                    }
                                                                    if((mean_role === position && (s_role === alt_role1 || s_role === alt_role2 || main_role === s_role)) || (mean_role === position && (s_role2 === alt_role1 || s_role2 === alt_role2 || main_role === s_role2)) || (mean_role === position && (s_role3 === alt_role1 || s_role3 === alt_role2 || main_role === s_role3))){
                                                                        rule_color = 'rgb(146,208,80)'
                                                                    }
                                                                    else if((mean_role === position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role === s_role || s_role === alt_role1 || s_role === alt_role2)) || (mean_role === position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role === s_role2 || s_role2 === alt_role1 || s_role2 === alt_role2)) || (mean_role === position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2)) || (mean_role !== position && (main_role === s_role3 || s_role3 === alt_role1 || s_role3 === alt_role2))){
                                                                        rule_color = 'rgb(255,255,0)'
                                                                    }
                                                                    else if((mean_role !== position && (main_role !== s_role && s_role !== alt_role1 && s_role !== alt_role2)) || (mean_role !== position && (main_role !== s_role2 && s_role2 !== alt_role1 && s_role2 !== alt_role2)) || (mean_role !== position && (main_role !== s_role3 && s_role3 !== alt_role1 && s_role3 !== alt_role2))){
                                                                        rule_color = 'rgb(255,0,0)'
                                                                    }

                                                                    awayTeam1[k].rule_color = rule_color
                                                                    // away_substitutions.push({'playerId': visitor_sub_array[kk].player_id, 'teamId':awayTeam[k].teamId ,'sRole': awayTeam[k].sRole, 'sRole2': awayTeam[k].sRole2, 'mR': awayTeam[k].mR, 'Pname': visitor_sub_array[kk].player_name, 'marketValue': market_value, 'p_m_Role': awayTeam[k].p_m_Role, 'primaryRole': main_role, 'altRole1': alt_role1, 'altRole2': alt_role2, 'tit': '###', 'sub_order_color': awayTeam[k].sub_order_color, 'sub_minute': awayTeam[k].sub_minute,'rule_color': rule_color, 'Tit': Tit})
                                                                }
                                                            }
                                                        }
                                                        let home_legend = []
                                                        let away_legend = []
                                                        for(let k = 0 ; k < home_substitutions.length ; k++){
                                                            home_legend.push(this.sub_color_set[k])
                                                        }
                                                        for(let k = 0 ; k < away_substitutions.length ; k++){
                                                            away_legend.push(this.sub_color_set[k])
                                                        }

                                                        homeTeam.sort(this.sortByProperty('formation_position'))
                                                        awayTeam.sort(this.sortByProperty('formation_position'))
                                                        homeTeam1.sort(this.sortByProperty('formation_position'))
                                                        awayTeam1.sort(this.sortByProperty('formation_position'))

                                                        let temp0 =  JSON.stringify(main_data[j].local_players)
                                                        let temp1 = JSON.parse(temp0)

                                                        let market_p = []
                                                        let home_player = []
                                                        let home_players = {"gk": [], "gk_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}, "def": [], "def_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}, "mid": [], "mid_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}, "fwd": [], "fwd_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}}
                                                        if(temp1[0].market_values.length > 0){
                                                            for(let p = 0 ; p < temp1[0].market_values.length ; p++){
                                                                let check = 0
                                                                for(let pp = 0 ; pp < homeTeam.length ; pp++){
                                                                    if(temp1[0].market_values[p].player_name == homeTeam[pp].Pname){
                                                                        check = 1
                                                                    }
                                                                }
                                                                for(let pp = 0 ; pp < homeTeam1.length ; pp++){
                                                                    if(temp1[0].market_values[p].player_name == homeTeam1[pp].Pname){
                                                                        check = 1
                                                                    }
                                                                }
                                                                if(check === 0){
                                                                    market_p.push(temp1[0].market_values[p])
                                                                }
                                                            }

                                                            for(let p = 0 ; p < market_p.length ; p++){
                                                                let role = temp1[0].roles.filter(function(item) {
                                                                    return item.player_name.trim() == market_p[p].player_name.trim();
                                                                });
                                                                let titu = []
                                                                if(temp1[0].titularity.length > 0){
                                                                    if(temp1[0].titularity[0].player){
                                                                        titu = temp1[0].titularity.filter(function(item) {
                                                                            return item.player.data.birthdate == market_p[p].player_birthday;
                                                                        });
                                                                    }
                                                                }

                                                                if(role.length > 0 && titu.length > 0){
                                                                    let roles = ''
                                                                    let main_role = ''
                                                                    let alt_role1 = ''
                                                                    let alt_role2 = ''
                                                                    for(let c = 0 ; c < role.length ; c++){
                                                                        let position = ''
                                                                        main_role = role[c].player_main_role
                                                                        alt_role1 = role[c].player_alt_role1
                                                                        alt_role2 = role[c].player_alt_role2
                                                                        if(main_role == 'GK'){ position = 'GK' }
                                                                        else if(main_role == 'RB'){ position = 'DEF' }
                                                                        else if(main_role == 'CB'){ position = 'DEF' }
                                                                        else if(main_role == 'LB'){ position = 'DEF' }
                                                                        else if(main_role == 'RM'){ position = 'MID' }
                                                                        else if(main_role == 'CM'){ position = 'MID' }
                                                                        else if(main_role == 'LM'){ position = 'MID' }
                                                                        else if(main_role == 'DM'){ position = 'MID' }
                                                                        else if(main_role == 'AM'){ position = 'MID' }
                                                                        else if(main_role == 'RW'){ position = 'FWD' }
                                                                        else if(main_role == 'LW'){ position = 'FWD' }
                                                                        else if(main_role == 'SS'){ position = 'FWD' }
                                                                        else if(main_role == 'CF'){ position = 'FWD' }
                                                                        roles = position
                                                                    }
                                                                    let minute = 0
                                                                    if(titu[0].minutes){
                                                                        minute = titu[0].minutes
                                                                    }
                                                                    let rating = "-"
                                                                    if(titu[0].rating){
                                                                        rating = titu[0].rating
                                                                    }
                                                                    let assist = "-"
                                                                    if(titu[0].assists){
                                                                        assist = titu[0].assists
                                                                    }
                                                                    let goals = null
                                                                    let goal_percentage = null
                                                                    if(titu[0].goals){
                                                                        goals = titu[0].goals
                                                                        if(minute > 0){
                                                                            goal_percentage = (goals/(minute/90)*100).toFixed(2)+"%"
                                                                        }
                                                                    }
                                                                    let market ="-"
                                                                    if(market_p[p].player_marketvalue.trim() != ""){
                                                                        market = market_p[p].player_marketvalue
                                                                    }
                                                                    let home_team_played = main_data[j].home_events_number
                                                                    let Tit = 0
                                                                    if(minute != 0 && home_team_played > 0){
                                                                        Tit = parseFloat((minute/90/home_team_played*100).toFixed(2))
                                                                    }

                                                                    home_player.push({'assist': assist, 'goal': goals, 'goal_percentage': goal_percentage, 'rating': rating, 'Tit': Tit, 'player_name': market_p[p].player_name, 'market_value': market, 's_role': main_role, 'alt_role1': alt_role1, 'alt_role2': alt_role2, 'market_value1': market_p[p], 'role': role[0], 'tit': titu[0], 'roles': roles})

                                                                    for(let c = 0 ; c < home_player.length ; c++){
                                                                        let check = 0
                                                                        for(let cc = 0 ; cc < homeTeam.length ; cc++){
                                                                            if(home_player[c].tit.player_id == homeTeam[cc].playerId){
                                                                                check = 1
                                                                            }
                                                                        }
                                                                        for(let cc = 0 ; cc < homeTeam1.length ; cc++){
                                                                            if(home_player[c].tit.player_id == homeTeam1[cc].playerId){
                                                                                check = 1
                                                                            }
                                                                        }
                                                                        if(check == 1){
                                                                            let index = home_player.indexOf(home_player[c]);
                                                                            if (index > -1) {
                                                                                c = c - 1
                                                                                home_player.splice(index, 1);
                                                                            }
                                                                        }
                                                                    }

                                                                    let def = []
                                                                    let mid = []
                                                                    let fwd = []
                                                                    let gk = []
                                                                    for(let c = 0 ; c < home_player.length ; c++){
                                                                        if(home_player[c].roles === "GK"){
                                                                            gk.push(home_player[c])
                                                                        }
                                                                        else if(home_player[c].roles === "DEF"){
                                                                            def.push(home_player[c])
                                                                        }
                                                                        else if(home_player[c].roles === "MID"){
                                                                            mid.push(home_player[c])
                                                                        }
                                                                        else if(home_player[c].roles === "FWD"){
                                                                            fwd.push(home_player[c])
                                                                        }
                                                                    }
                                                                    gk.sort(this.sortByProperty1('Tit'))
                                                                    def.sort(this.sortByProperty1('Tit'))
                                                                    mid.sort(this.sortByProperty1('Tit'))
                                                                    fwd.sort(this.sortByProperty1('Tit'))
                                                                    home_players = {"gk": gk, "gk_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}, "def": def, "def_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}, "mid": mid, "mid_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}, "fwd": fwd, "fwd_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}}
                                                                }
                                                            }
                                                        }

                                                        let temp2 =  JSON.stringify(main_data[j].visitor_players)
                                                        let temp3 = JSON.parse(temp2)

                                                        let market_p1 = []
                                                        let away_player = []
                                                        let away_players = {"gk": [], "gk_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}, "def": [], "def_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}, "mid": [], "mid_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}, "fwd": [], "fwd_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}}
                                                        if(temp1[0].market_values.length > 0){
                                                            for(let p = 0 ; p < temp3[0].market_values.length ; p++){
                                                                let check = 0
                                                                for(let pp = 0 ; pp < awayTeam.length ; pp++){
                                                                    if(temp3[0].market_values[p].player_name == awayTeam[pp].Pname){
                                                                        check = 1
                                                                    }
                                                                }
                                                                for(let pp = 0 ; pp < awayTeam1.length ; pp++){
                                                                    if(temp3[0].market_values[p].player_name == awayTeam1[pp].Pname){
                                                                        check = 1
                                                                    }
                                                                }
                                                                if(check === 0){
                                                                    market_p1.push(temp3[0].market_values[p])
                                                                }
                                                            }

                                                            for(let p = 0 ; p < market_p1.length ; p++){
                                                                let role = temp3[0].roles.filter(function(item) {
                                                                    return item.player_name.trim() == market_p1[p].player_name.trim();
                                                                });
                                                                let titu = []
                                                                if(temp3[0].titularity.length > 0){
                                                                    if(temp3[0].titularity[0].player){
                                                                        titu = temp3[0].titularity.filter(function(item) {
                                                                            return item.player.data.birthdate == market_p1[p].player_birthday;
                                                                        });
                                                                    }
                                                                }

                                                                if(role.length > 0 && titu.length > 0){
                                                                    let roles = ''
                                                                    let main_role = ''
                                                                    let alt_role1 = ''
                                                                    let alt_role2 = ''
                                                                    for(let c = 0 ; c < role.length ; c++){
                                                                        let position = ''
                                                                        main_role = role[c].player_main_role
                                                                        alt_role1 = role[c].player_alt_role1
                                                                        alt_role2 = role[c].player_alt_role2
                                                                        if(main_role == 'GK'){ position = 'GK' }
                                                                        else if(main_role == 'RB'){ position = 'DEF' }
                                                                        else if(main_role == 'CB'){ position = 'DEF' }
                                                                        else if(main_role == 'LB'){ position = 'DEF' }
                                                                        else if(main_role == 'RM'){ position = 'MID' }
                                                                        else if(main_role == 'CM'){ position = 'MID' }
                                                                        else if(main_role == 'LM'){ position = 'MID' }
                                                                        else if(main_role == 'DM'){ position = 'MID' }
                                                                        else if(main_role == 'AM'){ position = 'MID' }
                                                                        else if(main_role == 'RW'){ position = 'FWD' }
                                                                        else if(main_role == 'LW'){ position = 'FWD' }
                                                                        else if(main_role == 'SS'){ position = 'FWD' }
                                                                        else if(main_role == 'CF'){ position = 'FWD' }
                                                                        roles = position
                                                                    }
                                                                    let minute = 0
                                                                    if(titu[0].minutes){
                                                                        minute = titu[0].minutes
                                                                    }
                                                                    let rating = "-"
                                                                    if(titu[0].rating){
                                                                        rating = titu[0].rating
                                                                    }
                                                                    let assist = "-"
                                                                    if(titu[0].assists){
                                                                        assist = titu[0].assists
                                                                    }
                                                                    let goals = null
                                                                    let goal_percentage = null
                                                                    if(titu[0].goals){
                                                                        goals = titu[0].goals
                                                                        if(minute > 0){
                                                                            goal_percentage = (goals/(minute/90)*100).toFixed(2) + "%"
                                                                        }
                                                                    }

                                                                    let home_team_played = main_data[j].away_events_number
                                                                    let Tit = parseFloat((minute/90/home_team_played*100).toFixed(2))
                                                                    let market = "-"
                                                                    if(market_p1[p].player_marketvalue.trim() != ""){
                                                                        market = market_p1[p].player_marketvalue
                                                                    }
                                                                    away_player.push({'assist': assist, 'goal': goals, 'goal_percentage': goal_percentage, 'rating': rating, 'Tit': Tit, 'player_name': market_p1[p].player_name, 'market_value': market, 's_role': main_role,'alt_role1': alt_role1, 'alt_role2': alt_role2, 'market_value1': market_p1[p], 'role': role[0], 'tit': titu[0], 'roles': roles})

                                                                    for(let c = 0 ; c < away_player.length ; c++){
                                                                        let check = 0
                                                                        for(let cc = 0 ; cc < awayTeam.length ; cc++){
                                                                            if(away_player[c].tit.player_id == awayTeam[cc].playerId){
                                                                                check = 1
                                                                            }
                                                                        }
                                                                        for(let cc = 0 ; cc < awayTeam1.length ; cc++){
                                                                            if(away_player[c].tit.player_id == awayTeam1[cc].playerId){
                                                                                check = 1
                                                                            }
                                                                        }
                                                                        if(check == 1){
                                                                            let index = away_player.indexOf(away_player[c]);
                                                                            if (index > -1) {
                                                                                c = c - 1
                                                                                away_player.splice(index, 1);
                                                                            }
                                                                        }
                                                                    }

                                                                    let def = []
                                                                    let mid = []
                                                                    let fwd = []
                                                                    let gk = []
                                                                    for(let c = 0 ; c < away_player.length ; c++){
                                                                        if(away_player[c].roles === "GK"){
                                                                            gk.push(away_player[c])
                                                                        }
                                                                        else if(away_player[c].roles === "DEF"){
                                                                            def.push(away_player[c])
                                                                        }
                                                                        else if(away_player[c].roles === "MID"){
                                                                            mid.push(away_player[c])
                                                                        }
                                                                        else if(away_player[c].roles === "FWD"){
                                                                            fwd.push(away_player[c])
                                                                        }
                                                                    }
                                                                    gk.sort(this.sortByProperty1('Tit'))
                                                                    def.sort(this.sortByProperty1('Tit'))
                                                                    mid.sort(this.sortByProperty1('Tit'))
                                                                    fwd.sort(this.sortByProperty1('Tit'))
                                                                    away_players = {"gk": gk, "gk_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}, "def": def, "def_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}, "mid": mid, "mid_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}, "fwd": fwd, "fwd_arrow": {"rating": true, "assist": true, "Tit": true, "goal": true}}
                                                                }
                                                            }
                                                        }

                                                        let s_roles = this.s_role_set.filter(function(item) {
                                                            return item.name === homeTeamPformation;
                                                        })

                                                        if(s_roles.length > 0){
                                                            for(let p = 0 ; p < homeTeam.length ; p++){
                                                                homeTeam[p].sRole = s_roles[0].s_role[p]
                                                                homeTeam[p].sRole1 = s_roles[0].s_role[p]
                                                                homeTeam[p].sRole2 = s_roles[0].alt_s_role[p]
                                                                homeTeam[p].mR = s_roles[0].mean_role[p]
                                                                homeTeam[p].mR1 = s_roles[0].mean_role[p]
                                                            }
                                                        }

                                                        let s_roles_live = this.s_role_set.filter(function(item) {
                                                            return item.name === homeTeamLformation;
                                                        })
                                                        if(s_roles_live.length > 0){
                                                            for(let p = 0 ; p < homeTeam1.length ; p++){
                                                                homeTeam1[p].sRole = s_roles_live[0].s_role[p]
                                                                homeTeam1[p].sRole1 = s_roles_live[0].s_role[p]
                                                                homeTeam1[p].sRole2 = s_roles_live[0].alt_s_role[p]
                                                                homeTeam1[p].mR = s_roles_live[0].mean_role[p]
                                                                homeTeam1[p].mR1 = s_roles_live[0].mean_role[p]
                                                            }
                                                        }

                                                        let s_roles1 = this.s_role_set.filter(function(item) {
                                                            return item.name === awayTeamPformation;
                                                        });

                                                        if(s_roles1.length > 0){
                                                            for(let p = 0 ; p < awayTeam.length ; p++){
                                                                awayTeam[p].sRole = s_roles1[0].s_role[p]
                                                                awayTeam[p].sRole1 = s_roles1[0].s_role[p]
                                                                awayTeam[p].sRole2 = s_roles1[0].alt_s_role[p]
                                                                awayTeam[p].mR = s_roles1[0].mean_role[p]
                                                                awayTeam[p].mR1 = s_roles1[0].mean_role[p]
                                                            }
                                                        }

                                                        let s_roles_live_a = this.s_role_set.filter(function(item) {
                                                            return item.name === awayTeamLformation;
                                                        });
                                                        if(s_roles_live_a.length > 0){
                                                            for(let p = 0 ; p < awayTeam1.length ; p++){
                                                                awayTeam1[p].sRole = s_roles_live_a[0].s_role[p]
                                                                awayTeam1[p].sRole1 = s_roles_live_a[0].s_role[p]
                                                                awayTeam1[p].sRole2 = s_roles_live_a[0].alt_s_role[p]
                                                                awayTeam1[p].mR = s_roles_live_a[0].mean_role[p]
                                                                awayTeam1[p].mR1 = s_roles_live_a[0].mean_role[p]
                                                            }
                                                        }

                                                        let home_rule_color_number = {"green_color": 0, "yellow_color": 0, "red_color": 0}
                                                        for(let pp = 0 ; pp < homeTeam.length ; pp++){
                                                            if(homeTeam[pp].rule_color === 'rgb(146,208,80)'){
                                                                home_rule_color_number.green_color++
                                                            }
                                                            else if(homeTeam[pp].rule_color === 'rgb(255,255,0)'){
                                                                home_rule_color_number.yellow_color++
                                                            }
                                                            else if(homeTeam[pp].rule_color === 'rgb(255,0,0)'){
                                                                home_rule_color_number.red_color++
                                                            }
                                                        }

                                                        let away_rule_color_number = {"green_color": 0, "yellow_color": 0, "red_color": 0}
                                                        for(let pp = 0 ; pp < awayTeam.length ; pp++){
                                                            if(awayTeam[pp].rule_color === 'rgb(146,208,80)'){
                                                                away_rule_color_number.green_color++
                                                            }
                                                            else if(awayTeam[pp].rule_color === 'rgb(255,255,0)'){
                                                                away_rule_color_number.yellow_color++
                                                            }
                                                            else if(awayTeam[pp].rule_color === 'rgb(255,0,0)'){
                                                                away_rule_color_number.red_color++
                                                            }
                                                        }
                                                        //----------------------------formation analysis---------------------------------------
                                                        let home_formation_array = []
                                                        let away_formation_array = []
                                                        let home_formation_array1 = []
                                                        let away_formation_array1 = []
                                                        let home_b_formation_array = []
                                                        let away_b_formation_array = []
                                                        let home_b_formation_array1 = []
                                                        let away_b_formation_array1 = []
                                                        let home_formation = homeTeamLformation
                                                        let away_formation = awayTeamLformation

                                                        if(!home_formation){
                                                            home_formation = homeTeamPformation
                                                        }
                                                        if(!away_formation){
                                                            away_formation = awayTeamPformation
                                                        }

                                                        for(let b = 0 ; b < main_data[j].events.length ; b++){
                                                            if (main_data[j].events[b].formations) {
                                                                if(main_data[j].events[b].formations.length > 0){
                                                                    let formation_item = main_data[j].events[b].formations
                                                                    for(let bb = 0 ; bb < formation_item.length ; bb++){
                                                                        if(formation_item[bb].localteamId == localTeamId || formation_item[bb].visitorteamId == localTeamId){
                                                                            home_b_formation_array1.push({'formation': formation_item[bb].local_formation, 'date': formation_item[bb].date})
                                                                        }
                                                                        if(formation_item[bb].localteamId == visitTeamId || formation_item[bb].visitorteamId == visitTeamId){
                                                                            away_b_formation_array1.push({'formation': formation_item[bb].visit_formation, 'date': formation_item[bb].date})
                                                                        }
                                                                    }
                                                                    for(let bb = 0 ; bb < formation_item.length ; bb++){
                                                                        if(formation_item[bb].localteamId == localTeamId){
                                                                            home_formation_array1.push({'formation': formation_item[bb].local_formation, 'date': formation_item[bb].date})
                                                                        }
                                                                        if(formation_item[bb].visitorteamId == visitTeamId){
                                                                            away_formation_array1.push({'formation': formation_item[bb].visit_formation, 'date': formation_item[bb].date})
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            
                                                        }

                                                        home_b_formation_array1.sort(this.sortByProperty1('date'))
                                                        away_b_formation_array1.sort(this.sortByProperty1('date'))
                                                        home_formation_array1.sort(this.sortByProperty1('date'))
                                                        away_formation_array1.sort(this.sortByProperty1('date'))

                                                        for(let b = 0 ; b < home_b_formation_array1.length ; b++){
                                                            home_b_formation_array.push(home_b_formation_array1[b].formation)
                                                        }
                                                        for(let b = 0 ; b < away_b_formation_array1.length ; b++){
                                                            away_b_formation_array.push(away_b_formation_array1[b].formation)
                                                        }
                                                        for(let b = 0 ; b < home_formation_array1.length ; b++){
                                                            home_formation_array.push(home_formation_array1[b].formation)
                                                        }
                                                        for(let b = 0 ; b < away_formation_array1.length ; b++){
                                                            away_formation_array.push(away_formation_array1[b].formation)
                                                        }
                                                        let temp_h =  JSON.stringify(home_formation_array)
                                                        let fmt_home = JSON.parse(temp_h)
                                                        let temp_a =  JSON.stringify(away_formation_array)
                                                        let fmt_away = JSON.parse(temp_a)

                                                        let temp_b_h =  JSON.stringify(home_b_formation_array)
                                                        let fmt_b_home = JSON.parse(temp_b_h)
                                                        let temp_b_a =  JSON.stringify(away_b_formation_array)
                                                        let fmt_b_away = JSON.parse(temp_b_a)

                                                        let used_home = 0
                                                        let used_away = 0
                                                        let used_b_home = 0
                                                        let used_b_away = 0

                                                        let index1 = home_formation_array.indexOf(home_formation);
                                                        if (index1 > -1) {
                                                            home_formation_array.splice(index1, 1);
                                                        }

                                                        let index2 = away_formation_array.indexOf(away_formation);
                                                        if (index2 > -1) {
                                                            away_formation_array.splice(index2, 1);
                                                        }

                                                        let index3 = home_b_formation_array.indexOf(home_formation);
                                                        if (index3 > -1) {
                                                            home_b_formation_array.splice(index3, 1);
                                                        }

                                                        let index4 = away_b_formation_array.indexOf(away_formation);
                                                        if (index4 > -1) {
                                                            away_b_formation_array.splice(index4, 1);
                                                        }

                                                        for(let b = 0 ; b < home_formation_array.length; b++){
                                                            if(home_formation_array[b] == home_formation){
                                                                used_home++
                                                            }
                                                        }
                                                        for(let b = 0 ; b < away_formation_array.length; b++){
                                                            if(away_formation_array[b] == away_formation){
                                                                used_away++
                                                            }
                                                        }

                                                        for(let b = 0 ; b < home_b_formation_array.length; b++){
                                                            if(home_formation_array[b] == home_formation){
                                                                used_b_home++
                                                            }
                                                        }
                                                        for(let b = 0 ; b < away_b_formation_array.length; b++){
                                                            if(away_formation_array[b] == away_formation){
                                                                used_b_away++
                                                            }
                                                        }

                                                        fmt_home = Array.from(new Set (fmt_home))
                                                        fmt_away = Array.from(new Set (fmt_away))
                                                        let home_fmt_pct = []
                                                        let away_fmt_pct = []
                                                        fmt_b_home = Array.from(new Set (fmt_b_home))
                                                        fmt_b_away = Array.from(new Set (fmt_b_away))
                                                        let home_b_fmt_pct = []
                                                        let away_b_fmt_pct = []
                                                        for(let b = 0 ; b < fmt_home.length ; b++){
                                                            let count = 0
                                                            for(let bb = 0 ; bb < home_formation_array.length ; bb++){
                                                                if(fmt_home[b] == home_formation_array[bb]){
                                                                    count++
                                                                }
                                                            }
                                                            home_fmt_pct.push({"label": fmt_home[b], "count": count})
                                                        }
                                                        for(let b = 0 ; b < fmt_away.length ; b++){
                                                            let count = 0
                                                            for(let bb = 0 ; bb < away_formation_array.length ; bb++){
                                                                if(fmt_away[b] == away_formation_array[bb]){
                                                                    count++
                                                                }
                                                            }
                                                            away_fmt_pct.push({"label": fmt_away[b], "count": count})
                                                        }

                                                        for(let b = 0 ; b < fmt_b_home.length ; b++){
                                                            let count = 0
                                                            for(let bb = 0 ; bb < home_b_formation_array.length ; bb++){
                                                                if(fmt_b_home[b] == home_b_formation_array[bb]){
                                                                    count++
                                                                }
                                                            }
                                                            home_b_fmt_pct.push({"label": fmt_b_home[b], "count": count})
                                                        }
                                                        for(let b = 0 ; b < fmt_b_away.length ; b++){
                                                            let count = 0
                                                            for(let bb = 0 ; bb < away_b_formation_array.length ; bb++){
                                                                if(fmt_b_away[b] == away_b_formation_array[bb]){
                                                                    count++
                                                                }
                                                            }
                                                            away_b_fmt_pct.push({"label": fmt_b_away[b], "count": count})
                                                        }
                                                        home_fmt_pct.sort(this.sortByProperty1('count'))
                                                        away_fmt_pct.sort(this.sortByProperty1('count'))
                                                        home_b_fmt_pct.sort(this.sortByProperty1('count'))
                                                        away_b_fmt_pct.sort(this.sortByProperty1('count'))
                                                        let home_fmt_ans = {"used": used_home, "ans": home_fmt_pct, "counts": home_formation_array.length}
                                                        let away_fmt_ans = {"used": used_away, "ans": away_fmt_pct, "counts": away_formation_array.length}
                                                        let home_b_fmt_ans = {"used": used_b_home, "ans": home_b_fmt_pct, "counts": home_b_formation_array.length}
                                                        let away_b_fmt_ans = {"used": used_b_away, "ans": away_b_fmt_pct, "counts": away_b_formation_array.length}
                                                        //-----------------------------------by titularity---------------------------------
                                                        let local_players1 = main_data[j].local_players[0]
                                                        let temp_p =  JSON.stringify(local_players1)
                                                        let local_players = JSON.parse(temp_p)

                                                        let visitor_players1 = main_data[j].visitor_players[0]
                                                        let temp_pp =  JSON.stringify(visitor_players1)
                                                        let visitor_players = JSON.parse(temp_pp)
                                                        let local_p1 = []
                                                        let visit_p1 = []
                                                        let local_markets = local_players.market_values
                                                        let local_roles = local_players.roles
                                                        let visit_markets = []
                                                        let visit_roles = []
                                                        if(visitor_players){
                                                            visit_markets = visitor_players.market_values
                                                            visit_roles = visitor_players.roles
                                                            for(let u = 0 ; u < visitor_players.titularity.length ; u++){
                                                                let tits = visitor_players.titularity[u]
                                                                if(tits.player){
                                                                    let minutes = 0
                                                                    let goals = 0
                                                                    if(tits.minutes){
                                                                        minutes = tits.minutes
                                                                    }
                                                                    if(tits.goals){
                                                                        goals = tits.goals
                                                                    }
                                                                    let played_num = main_data[j].away_events_number
                                                                    let tit = 0
                                                                    if(played_num > 0 && minutes > 0){
                                                                        tit = parseFloat((minutes/90/played_num*100).toFixed(1))
                                                                    }
                                                                    let market = visit_markets.filter(function(item) {
                                                                        return item.player_birthday === tits.player.data.birthdate || (item.player_birthday.split("/")[1] + "/" + item.player_birthday.split("/")[0] + "/" + item.player_birthday.split("/")[2]) == tits.player.data.birthdate;
                                                                    });

                                                                    if(market.length < 1){
                                                                        market = visit_markets.filter(function(item) {
                                                                            return item.player_name === tits.player.data.display_name;
                                                                        });
                                                                    }

                                                                    if(market.length > 0){
                                                                        let role = visit_roles.filter(function(item) {
                                                                            return item.player_name.trim() === market[0].player_name.trim();
                                                                        });
                                                                        if(role.length > 0){
                                                                            let index = visit_markets.indexOf(market[0]);
                                                                            if (index > -1) {
                                                                                visit_markets.splice(index, 1);
                                                                            }
                                                                            visit_p1.push({"player_id": tits.player_id, "player_name": market[0].player_name.trim(),"primary_role": role[0].player_main_role, "alt_role1": role[0].player_alt_role1, "alt_role2": role[0].player_alt_role2, "tit": tit, "market_value": market[0].player_marketvalue})
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        for(let u = 0 ; u < local_players.titularity.length ; u++){
                                                            let tits = local_players.titularity[u]
                                                            if(tits.player){
                                                                let minutes = 0
                                                                let goals = 0
                                                                if(tits.minutes){
                                                                    minutes = tits.minutes
                                                                }
                                                                if(tits.goals){
                                                                    goals = tits.goals
                                                                }
                                                                let played_num = main_data[j].home_events_number
                                                                let tit = 0
                                                                if(played_num > 0 && minutes > 0){
                                                                    tit = parseFloat((minutes/90/played_num*100).toFixed(1))
                                                                }
                                                                let market = local_markets.filter(function(item) {
                                                                    return item.player_birthday === tits.player.data.birthdate || (item.player_birthday.split("/")[1] + "/" + item.player_birthday.split("/")[0] + "/" + item.player_birthday.split("/")[2]) == tits.player.data.birthdate ;
                                                                });

                                                                if(market.length < 1){
                                                                    market = local_markets.filter(function(item) {
                                                                        return item.player_name === tits.player.data.display_name;
                                                                    });
                                                                }

                                                                if(market.length > 0){
                                                                    let role = local_roles.filter(function(item) {
                                                                        return item.player_name.trim() === market[0].player_name.trim();
                                                                    });
                                                                    if(role.length > 0){

                                                                        let index = local_markets.indexOf(market[0]);
                                                                        if (index > -1) {
                                                                            local_markets.splice(index, 1);
                                                                        }

                                                                        local_p1.push({"player_id": tits.player_id, "player_name": market[0].player_name.trim(),"primary_role": role[0].player_main_role, "alt_role1": role[0].player_alt_role1, "alt_role2": role[0].player_alt_role2, "tit": tit, "market_value": market[0].player_marketvalue})
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        local_p1 = Array.from(new Set (local_p1))
                                                        visit_p1 = Array.from(new Set (visit_p1))
                                                        local_p1.sort(this.sortByProperty1('tit'))
                                                        visit_p1.sort(this.sortByProperty1('tit'))
                                                        let temp_l =  JSON.stringify(local_p1)
                                                        let local_p = JSON.parse(temp_l)
                                                        let temp_v =  JSON.stringify(visit_p1)
                                                        let visit_p = JSON.parse(temp_v)
                                                        if(!home_formation){
                                                            if(home_fmt_pct.length > 0){
                                                                home_formation = home_fmt_pct[0].label
                                                            }
                                                        }

                                                        if(!away_formation){
                                                            if(away_fmt_pct.length > 0){
                                                                away_formation = away_fmt_pct[0].label
                                                            }
                                                        }

                                                        let home_s_roles = this.s_role_set.filter(function(item) {
                                                            return item.name === home_formation;
                                                        });
                                                        let away_s_roles = this.s_role_set.filter(function(item) {
                                                            return item.name === away_formation;
                                                        });
                                                        let home_position = []
                                                        let away_position = []
                                                        if(home_s_roles.length > 0){
                                                            let sRoles = home_s_roles[0].s_role
                                                            let sRoles1 = home_s_roles[0].alt_s_role
                                                            let sRoles2 = home_s_roles[0].alt_s_role1
                                                            let meanRole = home_s_roles[0].mean_role
                                                            for(let uu = 0 ; uu < sRoles.length ; uu++){
                                                                let local = local_p.filter(function(item) {
                                                                    return item.primary_role === sRoles[uu];
                                                                });
                                                                let player_id = null
                                                                let player_name = null
                                                                let tit = 0
                                                                let market_value = null
                                                                let alt_role1 = ""
                                                                let alt_role2 = ""
                                                                if(local.length > 0){
                                                                    player_id = local[0].player_id
                                                                    player_name = local[0].player_name
                                                                    tit = local[0].tit
                                                                    market_value = local[0].market_value
                                                                    alt_role1 = local[0].alt_role1
                                                                    alt_role2 = local[0].alt_role2
                                                                }
                                                                // if(localTeamId == 625){
                                                                //     console.log("home_position, local_p====----===>", player_name, sRoles[uu], tit)
                                                                // }
                                                                home_position.push({"player_id": player_id, "player_name": player_name, "tit": tit, "market_value": market_value, "s_role": sRoles[uu], "s_role1":sRoles1[uu], "s_role2":sRoles2[uu], "alt_role1": alt_role1, "alt_role2": alt_role2, "pm_role": meanRole[uu]})

                                                                if(local.length > 0){
                                                                    let index = local_p.indexOf(local[0]);
                                                                    if (index > -1) {
                                                                        local_p.splice(index, 1);
                                                                    }
                                                                }

                                                            }
                                                        }
                                                        if(away_s_roles.length > 0){
                                                            let sRoles = away_s_roles[0].s_role
                                                            let sRoles1 = away_s_roles[0].alt_s_role
                                                            let sRoles2 = away_s_roles[0].alt_s_role1
                                                            let meanRole = away_s_roles[0].mean_role
                                                            for(let uu = 0 ; uu < sRoles.length ; uu++){
                                                                let visit = visit_p.filter(function(item) {
                                                                    return item.primary_role === sRoles[uu];
                                                                });
                                                                let player_id = null
                                                                let player_name = null
                                                                let tit = 0
                                                                let market_value = null
                                                                let alt_role1 = ""
                                                                let alt_role2 = ""
                                                                if(visit.length > 0){
                                                                    player_id = visit[0].player_id
                                                                    player_name = visit[0].player_name
                                                                    tit = visit[0].tit
                                                                    market_value = visit[0].market_value
                                                                    alt_role1 = visit[0].alt_role1
                                                                    alt_role2 = visit[0].alt_role2

                                                                    let index = visit_p.indexOf(visit[0]);
                                                                    if (index > -1) {
                                                                        visit_p.splice(index, 1);
                                                                    }
                                                                }
                                                                away_position.push({"player_id": player_id, "player_name": player_name, "tit": tit, "market_value": market_value, "s_role": sRoles[uu], "s_role1":sRoles1[uu], "s_role2":sRoles2[uu], "alt_role1": alt_role1, "alt_role2": alt_role2, "pm_role": meanRole[uu]})
                                                            }
                                                        }

                                                        let home_best_p = []
                                                        let away_best_p = []
                                                        let gk_p = []
                                                        let def_p = []
                                                        let mid_p = []
                                                        let fwd_p = []
                                                        for(let b = 0 ; b < home_position.length ; b++){
                                                            if(home_position[b].pm_role === "GK"){
                                                                gk_p.push(home_position[b])
                                                            }
                                                            else if(home_position[b].pm_role === "DEF"){
                                                                def_p.push(home_position[b])
                                                            }
                                                            else if(home_position[b].pm_role === "MID"){
                                                                mid_p.push(home_position[b])
                                                            }
                                                            else if(home_position[b].pm_role === "FWD"){
                                                                fwd_p.push(home_position[b])
                                                            }
                                                        }
                                                        home_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}
                                                        gk_p = []
                                                        def_p = []
                                                        mid_p = []
                                                        fwd_p = []
                                                        for(let b = 0 ; b < away_position.length ; b++){
                                                            if(away_position[b].pm_role === "GK"){
                                                                gk_p.push(away_position[b])
                                                            }
                                                            else if(away_position[b].pm_role === "DEF"){
                                                                def_p.push(away_position[b])
                                                            }
                                                            else if(away_position[b].pm_role === "MID"){
                                                                mid_p.push(away_position[b])
                                                            }
                                                            else if(away_position[b].pm_role === "FWD"){
                                                                fwd_p.push(away_position[b])
                                                            }
                                                        }
                                                        away_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}

                                                        for(let b = 0 ; b < away_position.length ; b++){
                                                            for(let bb = 0 ; bb < visit_p.length ; bb++){
                                                                if(away_position[b].player_id != null){
                                                                    if(away_position[b].tit < visit_p[bb].tit){
                                                                        let check = 0
                                                                        let player_id = away_position[b].player_id
                                                                        let player_name = away_position[b].player_name
                                                                        let primary_role = away_position[b].s_role
                                                                        let tit = away_position[b].tit
                                                                        let alt_role1 = away_position[b].alt_role1
                                                                        let alt_role2 = away_position[b].alt_role2
                                                                        let market_value = away_position[b].market_value
                                                                        if(away_position[b].s_role == visit_p[bb].primary_role){
                                                                            away_position[b].player_id = visit_p[bb].player_id
                                                                            away_position[b].player_name = visit_p[bb].player_name
                                                                            away_position[b].primary_role = visit_p[bb].primary_role
                                                                            away_position[b].tit = visit_p[bb].tit
                                                                            check = 1
                                                                        }
                                                                        if(away_position[b].s_role == visit_p[bb].alt_role1){
                                                                            away_position[b].player_id = visit_p[bb].player_id
                                                                            away_position[b].player_name = visit_p[bb].player_name
                                                                            away_position[b].primary_role = visit_p[bb].alt_role1
                                                                            away_position[b].tit = visit_p[bb].tit
                                                                            check = 1
                                                                        }
                                                                        if(away_position[b].s_role == visit_p[bb].alt_role2){
                                                                            away_position[b].player_id = visit_p[bb].player_id
                                                                            away_position[b].player_name = visit_p[bb].player_name
                                                                            away_position[b].primary_role = visit_p[bb].alt_role2
                                                                            away_position[b].tit = visit_p[bb].tit
                                                                            check = 1
                                                                        }
                                                                        if(check === 1){
                                                                            let index = visit_p.indexOf(visit_p[bb]);
                                                                            if (index > -1) {
                                                                                visit_p.splice(index, 1);
                                                                            }
                                                                            visit_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                        }
                                                                    }
                                                                }
                                                                else{
                                                                    if(away_position[b].tit <= visit_p[bb].tit){
                                                                        let check = 0
                                                                        let player_id = away_position[b].player_id
                                                                        let player_name = away_position[b].player_name
                                                                        let primary_role = away_position[b].s_role
                                                                        let tit = away_position[b].tit
                                                                        let alt_role1 = away_position[b].alt_role1
                                                                        let alt_role2 = away_position[b].alt_role2
                                                                        let market_value = away_position[b].market_value
                                                                        // if(away_position[b].s_role == visit_p[bb].primary_role){
                                                                        //     away_position[b].player_id = visit_p[bb].player_id
                                                                        //     away_position[b].player_name = visit_p[bb].player_name
                                                                        //     away_position[b].primary_role = visit_p[bb].primary_role
                                                                        //     away_position[b].tit = visit_p[bb].tit
                                                                        //     check = 1
                                                                        // }
                                                                        if(away_position[b].s_role == visit_p[bb].alt_role1){
                                                                            away_position[b].player_id = visit_p[bb].player_id
                                                                            away_position[b].player_name = visit_p[bb].player_name
                                                                            away_position[b].primary_role = visit_p[bb].alt_role1
                                                                            away_position[b].tit = visit_p[bb].tit
                                                                            check = 1
                                                                        }
                                                                        if(away_position[b].s_role == visit_p[bb].alt_role2){
                                                                            away_position[b].player_id = visit_p[bb].player_id
                                                                            away_position[b].player_name = visit_p[bb].player_name
                                                                            away_position[b].primary_role = visit_p[bb].alt_role2
                                                                            away_position[b].tit = visit_p[bb].tit
                                                                            check = 1
                                                                        }
                                                                        if(check === 1){
                                                                            let index = visit_p.indexOf(visit_p[bb]);
                                                                            if (index > -1) {
                                                                                bb = bb - 1
                                                                                visit_p.splice(index, 1);
                                                                            }
                                                                            if(player_id != null){
                                                                                visit_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                            }

                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        for(let b = 0 ; b < away_position.length ; b++){
                                                            for(let bb = 0 ; bb < visit_p.length ; bb++){
                                                                if(away_position[b].tit <= visit_p[bb].tit){
                                                                    let check = 0
                                                                    let player_id = away_position[b].player_id
                                                                    let player_name = away_position[b].player_name
                                                                    let primary_role = away_position[b].s_role
                                                                    let tit = away_position[b].tit
                                                                    let alt_role1 = away_position[b].alt_role1
                                                                    let alt_role2 = away_position[b].alt_role2
                                                                    let market_value = away_position[b].market_value
                                                                    if((away_position[b].s_role1 == visit_p[bb].primary_role) && (away_position[b].s_role1 != '')){
                                                                        away_position[b].player_id = visit_p[bb].player_id
                                                                        away_position[b].player_name = visit_p[bb].player_name
                                                                        away_position[b].primary_role = visit_p[bb].primary_role
                                                                        away_position[b].tit = visit_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((away_position[b].s_role1 == visit_p[bb].alt_role1) && (away_position[b].s_role1 != '')){
                                                                        away_position[b].player_id = visit_p[bb].player_id
                                                                        away_position[b].player_name = visit_p[bb].player_name
                                                                        away_position[b].primary_role = visit_p[bb].alt_role1
                                                                        away_position[b].tit = visit_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((away_position[b].s_role1 == visit_p[bb].alt_role2) && (away_position[b].s_role1 != '')){
                                                                        away_position[b].player_id = visit_p[bb].player_id
                                                                        away_position[b].player_name = visit_p[bb].player_name
                                                                        away_position[b].primary_role = visit_p[bb].alt_role2
                                                                        away_position[b].tit = visit_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(check === 1){
                                                                        let index = visit_p.indexOf(visit_p[bb]);
                                                                        if (index > -1) {
                                                                            visit_p.splice(index, 1);
                                                                        }
                                                                        visit_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        for(let b = 0 ; b < away_position.length ; b++){
                                                            for(let bb = 0 ; bb < visit_p.length ; bb++){
                                                                if(away_position[b].tit <= visit_p[bb].tit){
                                                                    let check = 0
                                                                    let player_id = away_position[b].player_id
                                                                    let player_name = away_position[b].player_name
                                                                    let primary_role = away_position[b].s_role
                                                                    let tit = away_position[b].tit
                                                                    let alt_role1 = away_position[b].alt_role1
                                                                    let alt_role2 = away_position[b].alt_role2
                                                                    let market_value = away_position[b].market_value
                                                                    if((away_position[b].s_role2 == visit_p[bb].primary_role) && (away_position[b].s_role2 != '')){
                                                                        away_position[b].player_id = visit_p[bb].player_id
                                                                        away_position[b].player_name = visit_p[bb].player_name
                                                                        away_position[b].primary_role = visit_p[bb].primary_role
                                                                        away_position[b].tit = visit_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((away_position[b].s_role2 == visit_p[bb].alt_role1) && (away_position[b].s_role2 != '')){
                                                                        away_position[b].player_id = visit_p[bb].player_id
                                                                        away_position[b].player_name = visit_p[bb].player_name
                                                                        away_position[b].primary_role = visit_p[bb].alt_role1
                                                                        away_position[b].tit = visit_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((away_position[b].s_role2 == visit_p[bb].alt_role2) && (away_position[b].s_role2 != '')){
                                                                        away_position[b].player_id = visit_p[bb].player_id
                                                                        away_position[b].player_name = visit_p[bb].player_name
                                                                        away_position[b].primary_role = visit_p[bb].alt_role2
                                                                        away_position[b].tit = visit_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(check === 1){
                                                                        let index = visit_p.indexOf(visit_p[bb]);
                                                                        if (index > -1) {
                                                                            visit_p.splice(index, 1);
                                                                        }
                                                                        visit_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        gk_p = []
                                                        def_p = []
                                                        mid_p = []
                                                        fwd_p = []
                                                        for(let b = 0 ; b < away_position.length ; b++){
                                                            if(away_position[b].pm_role === "GK"){
                                                                gk_p.push(away_position[b])
                                                            }
                                                            else if(away_position[b].pm_role === "DEF"){
                                                                def_p.push(away_position[b])
                                                            }
                                                            else if(away_position[b].pm_role === "MID"){
                                                                mid_p.push(away_position[b])
                                                            }
                                                            else if(away_position[b].pm_role === "FWD"){
                                                                fwd_p.push(away_position[b])
                                                            }
                                                        }
                                                        away_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}

                                                        for(let b = 0 ; b < home_position.length ; b++){
                                                            for(let bb = 0 ; bb < local_p.length ; bb++){
                                                                if(home_position[b].tit < local_p[bb].tit){
                                                                    let check = 0
                                                                    let player_id = home_position[b].player_id
                                                                    let player_name = home_position[b].player_name
                                                                    let primary_role = home_position[b].s_role
                                                                    let tit = home_position[b].tit
                                                                    let alt_role1 = home_position[b].alt_role1
                                                                    let alt_role2 = home_position[b].alt_role2
                                                                    let market_value = home_position[b].market_value
                                                                    if(home_position[b].s_role == local_p[bb].primary_role){
                                                                        home_position[b].player_id = local_p[bb].player_id
                                                                        home_position[b].player_name = local_p[bb].player_name
                                                                        home_position[b].primary_role = local_p[bb].primary_role
                                                                        home_position[b].tit = local_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(home_position[b].s_role == local_p[bb].alt_role1){
                                                                        home_position[b].player_id = local_p[bb].player_id
                                                                        home_position[b].player_name = local_p[bb].player_name
                                                                        home_position[b].primary_role = local_p[bb].alt_role1
                                                                        home_position[b].tit = local_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(home_position[b].s_role == local_p[bb].alt_role2){
                                                                        home_position[b].player_id = local_p[bb].player_id
                                                                        home_position[b].player_name = local_p[bb].player_name
                                                                        home_position[b].primary_role = local_p[bb].alt_role2
                                                                        home_position[b].tit = local_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(check === 1){
                                                                        let index = local_p.indexOf(local_p[bb]);
                                                                        if (index > -1) {
                                                                            local_p.splice(index, 1);
                                                                        }
                                                                        if(player_id != null){
                                                                            local_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                        }
                                                                    }
                                                                }
                                                                else if(home_position[b].tit <= local_p[bb].tit){
                                                                    let check = 0
                                                                    let player_id = home_position[b].player_id
                                                                    let player_name = home_position[b].player_name
                                                                    let primary_role = home_position[b].s_role
                                                                    let tit = home_position[b].tit
                                                                    let alt_role1 = home_position[b].alt_role1
                                                                    let alt_role2 = home_position[b].alt_role2
                                                                    let market_value = home_position[b].market_value
                                                                    // if(home_position[b].s_role == local_p[bb].primary_role){
                                                                    //     home_position[b].player_id = local_p[bb].player_id
                                                                    //     home_position[b].player_name = local_p[bb].player_name
                                                                    //     home_position[b].primary_role = local_p[bb].primary_role
                                                                    //     home_position[b].tit = local_p[bb].tit
                                                                    //     check = 1
                                                                    // }
                                                                    if(home_position[b].s_role == local_p[bb].alt_role1){
                                                                        home_position[b].player_id = local_p[bb].player_id
                                                                        home_position[b].player_name = local_p[bb].player_name
                                                                        home_position[b].primary_role = local_p[bb].alt_role1
                                                                        home_position[b].tit = local_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(home_position[b].s_role == local_p[bb].alt_role2){
                                                                        home_position[b].player_id = local_p[bb].player_id
                                                                        home_position[b].player_name = local_p[bb].player_name
                                                                        home_position[b].primary_role = local_p[bb].alt_role2
                                                                        home_position[b].tit = local_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(check === 1){
                                                                        let index = local_p.indexOf(local_p[bb]);
                                                                        if (index > -1) {
                                                                            local_p.splice(index, 1);
                                                                        }
                                                                        if(player_id != null){
                                                                            local_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        for(let b = 0 ; b < home_position.length ; b++){
                                                            for(let bb = 0 ; bb < local_p.length ; bb++){
                                                                if(home_position[b].tit <= local_p[bb].tit){
                                                                    let check = 0
                                                                    let player_id = home_position[b].player_id
                                                                    let player_name = home_position[b].player_name
                                                                    let primary_role = home_position[b].s_role
                                                                    let tit = home_position[b].tit
                                                                    let alt_role1 = home_position[b].alt_role1
                                                                    let alt_role2 = home_position[b].alt_role2
                                                                    let market_value = home_position[b].market_value
                                                                    if((home_position[b].s_role1 == local_p[bb].primary_role) && (home_position[b].s_role1 != '')){
                                                                        home_position[b].player_id = local_p[bb].player_id
                                                                        home_position[b].player_name = local_p[bb].player_name
                                                                        home_position[b].primary_role = local_p[bb].primary_role
                                                                        home_position[b].tit = local_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((home_position[b].s_role1 == local_p[bb].alt_role1) && (home_position[b].s_role1 != '')){
                                                                        home_position[b].player_id = local_p[bb].player_id
                                                                        home_position[b].player_name = local_p[bb].player_name
                                                                        home_position[b].primary_role = local_p[bb].alt_role1
                                                                        home_position[b].tit = local_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((home_position[b].s_role1 == local_p[bb].alt_role2) && (home_position[b].s_role1 != '')){
                                                                        home_position[b].player_id = local_p[bb].player_id
                                                                        home_position[b].player_name = local_p[bb].player_name
                                                                        home_position[b].primary_role = local_p[bb].alt_role2
                                                                        home_position[b].tit = local_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(check === 1){
                                                                        let index = local_p.indexOf(local_p[bb]);
                                                                        if (index > -1) {
                                                                            local_p.splice(index, 1);
                                                                        }
                                                                        if(player_id != null){
                                                                            local_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        for(let b = 0 ; b < home_position.length ; b++){
                                                            for(let bb = 0 ; bb < local_p.length ; bb++){
                                                                if(home_position[b].tit <= local_p[bb].tit){
                                                                    let check = 0
                                                                    let player_id = home_position[b].player_id
                                                                    let player_name = home_position[b].player_name
                                                                    let primary_role = home_position[b].s_role
                                                                    let tit = home_position[b].tit
                                                                    let alt_role1 = home_position[b].alt_role1
                                                                    let alt_role2 = home_position[b].alt_role2
                                                                    let market_value = home_position[b].market_value
                                                                    if((home_position[b].s_role2 == local_p[bb].primary_role) && (home_position[b].s_role2 != '')){
                                                                        home_position[b].player_id = local_p[bb].player_id
                                                                        home_position[b].player_name = local_p[bb].player_name
                                                                        home_position[b].primary_role = local_p[bb].primary_role
                                                                        home_position[b].tit = local_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((home_position[b].s_role2 == local_p[bb].alt_role1) && (home_position[b].s_role2 != '')){
                                                                        home_position[b].player_id = local_p[bb].player_id
                                                                        home_position[b].player_name = local_p[bb].player_name
                                                                        home_position[b].primary_role = local_p[bb].alt_role1
                                                                        home_position[b].tit = local_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((home_position[b].s_role2 == local_p[bb].alt_role2) && (home_position[b].s_role2 != '')){
                                                                        home_position[b].player_id = local_p[bb].player_id
                                                                        home_position[b].player_name = local_p[bb].player_name
                                                                        home_position[b].primary_role = local_p[bb].alt_role2
                                                                        home_position[b].tit = local_p[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(check === 1){
                                                                        let index = local_p.indexOf(local_p[bb]);
                                                                        if (index > -1) {
                                                                            local_p.splice(index, 1);
                                                                        }
                                                                        if(player_id != null){
                                                                            local_p.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        gk_p = []
                                                        def_p = []
                                                        mid_p = []
                                                        fwd_p = []
                                                        for(let b = 0 ; b < home_position.length ; b++){
                                                            if(home_position[b].pm_role === "GK"){
                                                                gk_p.push(home_position[b])
                                                            }
                                                            else if(home_position[b].pm_role === "DEF"){
                                                                def_p.push(home_position[b])
                                                            }
                                                            else if(home_position[b].pm_role === "MID"){
                                                                mid_p.push(home_position[b])
                                                            }
                                                            else if(home_position[b].pm_role === "FWD"){
                                                                fwd_p.push(home_position[b])
                                                            }
                                                        }
                                                        home_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}

                                                        let home_best_p1 = {"gk": home_best_p.gk, "def": home_best_p.def, "mid1": home_best_p.mid, "mid2": [], "fwd": home_best_p.fwd}
                                                        let away_best_p1 = {"gk": away_best_p.gk, "def": away_best_p.def, "mid1": away_best_p.mid, "mid2": [], "fwd": away_best_p.fwd}
                                                        if(home_formation != null){
                                                            if(home_formation.split('-').length > 3){
                                                                let mid1_len = parseInt(home_formation.split('-')[1])
                                                                let mid2_len = parseInt(home_formation.split('-')[2])
                                                                let mid1 = []
                                                                let mid2 = []
                                                                for(let c = 0 ; c < mid1_len ; c++){
                                                                    mid1.push(home_best_p.mid[c])
                                                                }
                                                                for(let c = home_best_p.mid.length - mid2_len ; c < home_best_p.mid.length ; c++){
                                                                    mid2.push(home_best_p.mid[c])
                                                                }
                                                                home_best_p1 = {"gk": home_best_p.gk, "def": home_best_p.def, "mid1": mid1, "mid2": mid2, "fwd": home_best_p.fwd}
                                                            }
                                                        }
                                                        if(away_formation != null){
                                                            if(away_formation.split('-').length > 3){
                                                                let mid1_len = parseInt(away_formation.split('-')[1])
                                                                let mid2_len = parseInt(away_formation.split('-')[2])
                                                                let mid1 = []
                                                                let mid2 = []
                                                                for(let c = 0 ; c < mid1_len ; c++){
                                                                    if(away_best_p.mid[c]){
                                                                        mid1.push(away_best_p.mid[c])
                                                                    }
                                                                }
                                                                for(let c = away_best_p.mid.length - mid2_len ; c < away_best_p.mid.length ; c++){
                                                                    if(away_best_p.mid[c]){
                                                                        mid2.push(away_best_p.mid[c])
                                                                    }
                                                                }
                                                                away_best_p1 = {"gk": away_best_p.gk, "def": away_best_p.def, "mid1": mid1, "mid2": mid2, "fwd": away_best_p.fwd}
                                                            }
                                                        }
                                                        //----------------------------by rating----------------------------------------
                                                        let local_p2 = []
                                                        let visit_p2 = []
                                                        temp_p =  JSON.stringify(local_players1)
                                                        local_players = JSON.parse(temp_p)

                                                        temp_pp =  JSON.stringify(visitor_players1)
                                                        visitor_players = JSON.parse(temp_pp)
                                                        local_markets = local_players.market_values
                                                        local_roles = local_players.roles
                                                        visit_markets = []
                                                        visit_roles = []

                                                        for(let u = 0 ; u < local_players.titularity.length ; u++){
                                                            let tits = local_players.titularity[u]
                                                            if(tits.player){
                                                                let minutes = 0
                                                                let rating = 0
                                                                if(tits.minutes){
                                                                    minutes = tits.minutes
                                                                }
                                                                if(tits.rating){
                                                                    rating = parseFloat(tits.rating)
                                                                }
                                                                let played_num = main_data[j].home_events_number
                                                                let tit = 0
                                                                if(played_num > 0 && minutes > 0){
                                                                    tit = parseFloat((minutes/90/played_num*100).toFixed(1))
                                                                }
                                                                let market = local_markets.filter(function(item) {
                                                                    return item.player_birthday === tits.player.data.birthdate || (item.player_birthday.split("/")[1] + "/" + item.player_birthday.split("/")[0] + "/" + item.player_birthday.split("/")[2]) == tits.player.data.birthdate ;
                                                                });

                                                                if(market.length < 1){
                                                                    market = local_markets.filter(function(item) {
                                                                        return item.player_name === tits.player.data.display_name;
                                                                    });
                                                                }

                                                                if(market.length > 0){
                                                                    let role = local_roles.filter(function(item) {
                                                                        return item.player_name.trim() === market[0].player_name.trim();
                                                                    });
                                                                    if(role.length > 0){

                                                                        let index = local_markets.indexOf(market[0]);
                                                                        if (index > -1) {
                                                                            local_markets.splice(index, 1);
                                                                        }
                                                                        local_p2.push({"player_id": tits.player_id, "player_name": market[0].player_name.trim(),"primary_role": role[0].player_main_role, "alt_role1": role[0].player_alt_role1, "alt_role2": role[0].player_alt_role2, "tit": rating, "market_value": market[0].player_marketvalue})
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if(visitor_players){
                                                            visit_markets = visitor_players.market_values
                                                            visit_roles = visitor_players.roles
                                                            for(let u = 0 ; u < visitor_players.titularity.length ; u++){
                                                                let tits = visitor_players.titularity[u]
                                                                if(tits.player){
                                                                    let minutes = 0
                                                                    let rating = 0
                                                                    if(tits.minutes){
                                                                        minutes = tits.minutes
                                                                    }
                                                                    if(tits.rating){
                                                                        rating = parseFloat(tits.rating)
                                                                    }
                                                                    let played_num = main_data[j].away_events_number
                                                                    let tit = 0
                                                                    if(played_num > 0 && minutes > 0){
                                                                        tit = parseFloat((minutes/90/played_num*100).toFixed(1))
                                                                    }
                                                                    let market = visit_markets.filter(function(item) {
                                                                        return item.player_birthday === tits.player.data.birthdate || (item.player_birthday.split("/")[1] + "/" + item.player_birthday.split("/")[0] + "/" + item.player_birthday.split("/")[2]) == tits.player.data.birthdate;
                                                                    });

                                                                    if(market.length < 1){
                                                                        market = visit_markets.filter(function(item) {
                                                                            return item.player_name === tits.player.data.display_name;
                                                                        });
                                                                    }

                                                                    if(market.length > 0){
                                                                        let role = visit_roles.filter(function(item) {
                                                                            return item.player_name.trim() === market[0].player_name.trim();
                                                                        });
                                                                        if(role.length > 0){
                                                                            let index = visit_markets.indexOf(market[0]);
                                                                            if (index > -1) {
                                                                                visit_markets.splice(index, 1);
                                                                            }
                                                                            visit_p2.push({"player_id": tits.player_id, "player_name": market[0].player_name.trim(),"primary_role": role[0].player_main_role, "alt_role1": role[0].player_alt_role1, "alt_role2": role[0].player_alt_role2, "tit": rating, "market_value": market[0].player_marketvalue})
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        local_p2.sort(this.sortByProperty1('tit'))
                                                        visit_p2.sort(this.sortByProperty1('tit'))
                                                        let temp_l1 =  JSON.stringify(local_p2)
                                                        let local_p0 = JSON.parse(temp_l1)
                                                        let temp_v1 =  JSON.stringify(visit_p2)
                                                        let visit_p0 = JSON.parse(temp_v1)

                                                        home_position = []
                                                        away_position = []
                                                        if(home_s_roles.length > 0){
                                                            let sRoles = home_s_roles[0].s_role
                                                            let sRoles1 = home_s_roles[0].alt_s_role
                                                            let sRoles2 = home_s_roles[0].alt_s_role1
                                                            let meanRole = home_s_roles[0].mean_role
                                                            for(let uu = 0 ; uu < sRoles.length ; uu++){
                                                                let local = local_p0.filter(function(item) {
                                                                    return item.primary_role === sRoles[uu];
                                                                });
                                                                let player_id = null
                                                                let player_name = null
                                                                let tit = 0
                                                                let market_value = null
                                                                let alt_role1 = ""
                                                                let alt_role2 = ""
                                                                if(local.length > 0){
                                                                    player_id = local[0].player_id
                                                                    player_name = local[0].player_name
                                                                    tit = local[0].tit
                                                                    market_value = local[0].market_value
                                                                    alt_role1 = local[0].alt_role1
                                                                    alt_role2 = local[0].alt_role2
                                                                }
                                                                home_position.push({"player_id": player_id, "player_name": player_name, "tit": tit, "market_value": market_value, "s_role": sRoles[uu], "s_role1":sRoles1[uu], "s_role2":sRoles2[uu], "alt_role1": alt_role1, "alt_role2": alt_role2, "pm_role": meanRole[uu]})
                                                                if(local.length > 0){
                                                                    let index = local_p0.indexOf(local[0]);
                                                                    if (index > -1) {
                                                                        local_p0.splice(index, 1);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if(away_s_roles.length > 0){
                                                            let sRoles = away_s_roles[0].s_role
                                                            let sRoles1 = away_s_roles[0].alt_s_role
                                                            let sRoles2 = away_s_roles[0].alt_s_role1
                                                            let meanRole = away_s_roles[0].mean_role
                                                            for(let uu = 0 ; uu < sRoles.length ; uu++){
                                                                let visit = visit_p0.filter(function(item) {
                                                                    return item.primary_role === sRoles[uu];
                                                                });
                                                                let player_id = null
                                                                let player_name = null
                                                                let tit = 0
                                                                let market_value = null
                                                                let alt_role1 = ""
                                                                let alt_role2 = ""
                                                                if(visit.length > 0){
                                                                    player_id = visit[0].player_id
                                                                    player_name = visit[0].player_name
                                                                    tit = visit[0].tit
                                                                    market_value = visit[0].market_value
                                                                    alt_role1 = visit[0].alt_role1
                                                                    alt_role2 = visit[0].alt_role2

                                                                    let index = visit_p0.indexOf(visit[0]);
                                                                    if (index > -1) {
                                                                        visit_p0.splice(index, 1);
                                                                    }
                                                                }
                                                                away_position.push({"player_id": player_id, "player_name": player_name, "tit": tit, "market_value": market_value, "s_role": sRoles[uu], "s_role1":sRoles1[uu], "s_role2":sRoles2[uu], "alt_role1": alt_role1, "alt_role2": alt_role2, "pm_role": meanRole[uu]})
                                                            }
                                                        }

                                                        home_best_p = []
                                                        away_best_p = []
                                                        gk_p = []
                                                        def_p = []
                                                        mid_p = []
                                                        fwd_p = []
                                                        for(let b = 0 ; b < home_position.length ; b++){
                                                            if(home_position[b].pm_role === "GK"){
                                                                gk_p.push(home_position[b])
                                                            }
                                                            else if(home_position[b].pm_role === "DEF"){
                                                                def_p.push(home_position[b])
                                                            }
                                                            else if(home_position[b].pm_role === "MID"){
                                                                mid_p.push(home_position[b])
                                                            }
                                                            else if(home_position[b].pm_role === "FWD"){
                                                                fwd_p.push(home_position[b])
                                                            }
                                                        }
                                                        home_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}
                                                        gk_p = []
                                                        def_p = []
                                                        mid_p = []
                                                        fwd_p = []

                                                        for(let b = 0 ; b < away_position.length ; b++){
                                                            if(away_position[b].pm_role === "GK"){
                                                                gk_p.push(away_position[b])
                                                            }
                                                            else if(away_position[b].pm_role === "DEF"){
                                                                def_p.push(away_position[b])
                                                            }
                                                            else if(away_position[b].pm_role === "MID"){
                                                                mid_p.push(away_position[b])
                                                            }
                                                            else if(away_position[b].pm_role === "FWD"){
                                                                fwd_p.push(away_position[b])
                                                            }
                                                        }
                                                        away_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}
                                                        for(let b = 0 ; b < away_position.length ; b++){
                                                            for(let bb = 0 ; bb < visit_p0.length ; bb++){
                                                                if(away_position[b].player_id != null){
                                                                    if(away_position[b].tit < visit_p0[bb].tit){
                                                                        let check = 0
                                                                        let player_id = away_position[b].player_id
                                                                        let player_name = away_position[b].player_name
                                                                        let primary_role = away_position[b].s_role
                                                                        let tit = away_position[b].tit
                                                                        let alt_role1 = away_position[b].alt_role1
                                                                        let alt_role2 = away_position[b].alt_role2
                                                                        let market_value = away_position[b].market_value
                                                                        if(away_position[b].s_role == visit_p0[bb].primary_role){
                                                                            away_position[b].player_id = visit_p0[bb].player_id
                                                                            away_position[b].player_name = visit_p0[bb].player_name
                                                                            away_position[b].primary_role = visit_p0[bb].primary_role
                                                                            away_position[b].tit = visit_p0[bb].tit
                                                                            check = 1
                                                                        }
                                                                        if(away_position[b].s_role == visit_p0[bb].alt_role1){
                                                                            away_position[b].player_id = visit_p0[bb].player_id
                                                                            away_position[b].player_name = visit_p0[bb].player_name
                                                                            away_position[b].primary_role = visit_p0[bb].alt_role1
                                                                            away_position[b].tit = visit_p0[bb].tit
                                                                            check = 1
                                                                        }
                                                                        if(away_position[b].s_role == visit_p0[bb].alt_role2){
                                                                            away_position[b].player_id = visit_p0[bb].player_id
                                                                            away_position[b].player_name = visit_p0[bb].player_name
                                                                            away_position[b].primary_role = visit_p0[bb].alt_role2
                                                                            away_position[b].tit = visit_p0[bb].tit
                                                                            check = 1
                                                                        }
                                                                        if(check === 1){
                                                                            let index = visit_p0.indexOf(visit_p0[bb]);
                                                                            if (index > -1) {
                                                                                visit_p0.splice(index, 1);
                                                                            }
                                                                            visit_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                        }
                                                                    }
                                                                }
                                                                else{
                                                                    if(away_position[b].tit <= visit_p0[bb].tit){
                                                                        let check = 0
                                                                        let player_id = away_position[b].player_id
                                                                        let player_name = away_position[b].player_name
                                                                        let primary_role = away_position[b].s_role
                                                                        let tit = away_position[b].tit
                                                                        let alt_role1 = away_position[b].alt_role1
                                                                        let alt_role2 = away_position[b].alt_role2
                                                                        let market_value = away_position[b].market_value
                                                                        // if(away_position[b].s_role == visit_p[bb].primary_role){
                                                                        //     away_position[b].player_id = visit_p[bb].player_id
                                                                        //     away_position[b].player_name = visit_p[bb].player_name
                                                                        //     away_position[b].primary_role = visit_p[bb].primary_role
                                                                        //     away_position[b].tit = visit_p[bb].tit
                                                                        //     check = 1
                                                                        // }
                                                                        if(away_position[b].s_role == visit_p0[bb].alt_role1){
                                                                            away_position[b].player_id = visit_p0[bb].player_id
                                                                            away_position[b].player_name = visit_p0[bb].player_name
                                                                            away_position[b].primary_role = visit_p0[bb].alt_role1
                                                                            away_position[b].tit = visit_p0[bb].tit
                                                                            check = 1
                                                                        }
                                                                        if(away_position[b].s_role == visit_p0[bb].alt_role2){
                                                                            away_position[b].player_id = visit_p0[bb].player_id
                                                                            away_position[b].player_name = visit_p0[bb].player_name
                                                                            away_position[b].primary_role = visit_p0[bb].alt_role2
                                                                            away_position[b].tit = visit_p0[bb].tit
                                                                            check = 1
                                                                        }
                                                                        if(check === 1){
                                                                            let index = visit_p0.indexOf(visit_p0[bb]);
                                                                            if (index > -1) {
                                                                                visit_p0.splice(index, 1);
                                                                            }
                                                                            if(player_id != null){
                                                                                visit_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        for(let b = 0 ; b < away_position.length ; b++){
                                                            for(let bb = 0 ; bb < visit_p0.length ; bb++){
                                                                if(away_position[b].tit <= visit_p0[bb].tit){
                                                                    let check = 0
                                                                    let player_id = away_position[b].player_id
                                                                    let player_name = away_position[b].player_name
                                                                    let primary_role = away_position[b].s_role
                                                                    let tit = away_position[b].tit
                                                                    let alt_role1 = away_position[b].alt_role1
                                                                    let alt_role2 = away_position[b].alt_role2
                                                                    let market_value = away_position[b].market_value
                                                                    if((away_position[b].s_role1 == visit_p0[bb].primary_role) && (away_position[b].s_role1 != '')){
                                                                        away_position[b].player_id = visit_p0[bb].player_id
                                                                        away_position[b].player_name = visit_p0[bb].player_name
                                                                        away_position[b].primary_role = visit_p0[bb].primary_role
                                                                        away_position[b].tit = visit_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((away_position[b].s_role1 == visit_p0[bb].alt_role1) && (away_position[b].s_role1 != '')){
                                                                        away_position[b].player_id = visit_p0[bb].player_id
                                                                        away_position[b].player_name = visit_p0[bb].player_name
                                                                        away_position[b].primary_role = visit_p0[bb].alt_role1
                                                                        away_position[b].tit = visit_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((away_position[b].s_role1 == visit_p0[bb].alt_role2) && (away_position[b].s_role1 != '')){
                                                                        away_position[b].player_id = visit_p0[bb].player_id
                                                                        away_position[b].player_name = visit_p0[bb].player_name
                                                                        away_position[b].primary_role = visit_p0[bb].alt_role2
                                                                        away_position[b].tit = visit_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(check === 1){
                                                                        let index = visit_p0.indexOf(visit_p0[bb]);
                                                                        if (index > -1) {
                                                                            visit_p0.splice(index, 1);
                                                                        }
                                                                        visit_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        for(let b = 0 ; b < away_position.length ; b++){
                                                            for(let bb = 0 ; bb < visit_p0.length ; bb++){
                                                                if(away_position[b].tit <= visit_p0[bb].tit){
                                                                    let check = 0
                                                                    let player_id = away_position[b].player_id
                                                                    let player_name = away_position[b].player_name
                                                                    let primary_role = away_position[b].s_role
                                                                    let tit = away_position[b].tit
                                                                    let alt_role1 = away_position[b].alt_role1
                                                                    let alt_role2 = away_position[b].alt_role2
                                                                    let market_value = away_position[b].market_value
                                                                    if((away_position[b].s_role2 == visit_p0[bb].primary_role) && (away_position[b].s_role2 != '')){
                                                                        away_position[b].player_id = visit_p0[bb].player_id
                                                                        away_position[b].player_name = visit_p0[bb].player_name
                                                                        away_position[b].primary_role = visit_p0[bb].primary_role
                                                                        away_position[b].tit = visit_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((away_position[b].s_role2 == visit_p0[bb].alt_role1) && (away_position[b].s_role2 != '')){
                                                                        away_position[b].player_id = visit_p0[bb].player_id
                                                                        away_position[b].player_name = visit_p0[bb].player_name
                                                                        away_position[b].primary_role = visit_p0[bb].alt_role1
                                                                        away_position[b].tit = visit_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((away_position[b].s_role2 == visit_p0[bb].alt_role2) && (away_position[b].s_role2 != '')){
                                                                        away_position[b].player_id = visit_p0[bb].player_id
                                                                        away_position[b].player_name = visit_p0[bb].player_name
                                                                        away_position[b].primary_role = visit_p0[bb].alt_role2
                                                                        away_position[b].tit = visit_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(check === 1){
                                                                        let index = visit_p0.indexOf(visit_p0[bb]);
                                                                        if (index > -1) {
                                                                            visit_p0.splice(index, 1);
                                                                        }
                                                                        visit_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        gk_p = []
                                                        def_p = []
                                                        mid_p = []
                                                        fwd_p = []
                                                        for(let b = 0 ; b < away_position.length ; b++){
                                                            if(away_position[b].pm_role === "GK"){
                                                                gk_p.push(away_position[b])
                                                            }
                                                            else if(away_position[b].pm_role === "DEF"){
                                                                def_p.push(away_position[b])
                                                            }
                                                            else if(away_position[b].pm_role === "MID"){

                                                                mid_p.push(away_position[b])
                                                            }
                                                            else if(away_position[b].pm_role === "FWD"){
                                                                fwd_p.push(away_position[b])
                                                            }
                                                        }
                                                        away_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}

                                                        for(let b = 0 ; b < home_position.length ; b++){
                                                            for(let bb = 0 ; bb < local_p0.length ; bb++){
                                                                if(home_position[b].tit < local_p0[bb].tit){
                                                                    let check = 0
                                                                    let player_id = home_position[b].player_id
                                                                    let player_name = home_position[b].player_name
                                                                    let primary_role = home_position[b].s_role
                                                                    let tit = home_position[b].tit
                                                                    let alt_role1 = home_position[b].alt_role1
                                                                    let alt_role2 = home_position[b].alt_role2
                                                                    let market_value = home_position[b].market_value
                                                                    if(home_position[b].s_role == local_p0[bb].primary_role){
                                                                        home_position[b].player_id = local_p0[bb].player_id
                                                                        home_position[b].player_name = local_p0[bb].player_name
                                                                        home_position[b].primary_role = local_p0[bb].primary_role
                                                                        home_position[b].tit = local_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(home_position[b].s_role == local_p0[bb].alt_role1){
                                                                        home_position[b].player_id = local_p0[bb].player_id
                                                                        home_position[b].player_name = local_p0[bb].player_name
                                                                        home_position[b].primary_role = local_p0[bb].alt_role1
                                                                        home_position[b].tit = local_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(home_position[b].s_role == local_p0[bb].alt_role2){
                                                                        home_position[b].player_id = local_p0[bb].player_id
                                                                        home_position[b].player_name = local_p0[bb].player_name
                                                                        home_position[b].primary_role = local_p0[bb].alt_role2
                                                                        home_position[b].tit = local_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(check === 1){
                                                                        let index = local_p0.indexOf(local_p0[bb]);
                                                                        if (index > -1) {
                                                                            local_p0.splice(index, 1);
                                                                        }
                                                                        if(player_id != null){
                                                                            local_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                        }
                                                                    }
                                                                }
                                                                else if(home_position[b].tit <= local_p0[bb].tit){
                                                                    let check = 0
                                                                    let player_id = home_position[b].player_id
                                                                    let player_name = home_position[b].player_name
                                                                    let primary_role = home_position[b].s_role
                                                                    let tit = home_position[b].tit
                                                                    let alt_role1 = home_position[b].alt_role1
                                                                    let alt_role2 = home_position[b].alt_role2
                                                                    let market_value = home_position[b].market_value
                                                                    // if(home_position[b].s_role == local_p[bb].primary_role){
                                                                    //     home_position[b].player_id = local_p[bb].player_id
                                                                    //     home_position[b].player_name = local_p[bb].player_name
                                                                    //     home_position[b].primary_role = local_p[bb].primary_role
                                                                    //     home_position[b].tit = local_p[bb].tit
                                                                    //     check = 1
                                                                    // }
                                                                    if(home_position[b].s_role == local_p0[bb].alt_role1){
                                                                        home_position[b].player_id = local_p0[bb].player_id
                                                                        home_position[b].player_name = local_p0[bb].player_name
                                                                        home_position[b].primary_role = local_p0[bb].alt_role1
                                                                        home_position[b].tit = local_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(home_position[b].s_role == local_p0[bb].alt_role2){
                                                                        home_position[b].player_id = local_p0[bb].player_id
                                                                        home_position[b].player_name = local_p0[bb].player_name
                                                                        home_position[b].primary_role = local_p0[bb].alt_role2
                                                                        home_position[b].tit = local_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(check === 1){
                                                                        let index = local_p0.indexOf(local_p0[bb]);
                                                                        if (index > -1) {
                                                                            local_p0.splice(index, 1);
                                                                        }
                                                                        if(player_id != null){
                                                                            local_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        for(let b = 0 ; b < home_position.length ; b++){
                                                            for(let bb = 0 ; bb < local_p0.length ; bb++){
                                                                if(home_position[b].tit <= local_p0[bb].tit){
                                                                    let check = 0
                                                                    let player_id = home_position[b].player_id
                                                                    let player_name = home_position[b].player_name
                                                                    let primary_role = home_position[b].s_role
                                                                    let tit = home_position[b].tit
                                                                    let alt_role1 = home_position[b].alt_role1
                                                                    let alt_role2 = home_position[b].alt_role2
                                                                    let market_value = home_position[b].market_value
                                                                    if((home_position[b].s_role1 == local_p0[bb].primary_role) && (home_position[b].s_role1 != '')){
                                                                        home_position[b].player_id = local_p0[bb].player_id
                                                                        home_position[b].player_name = local_p0[bb].player_name
                                                                        home_position[b].primary_role = local_p0[bb].primary_role
                                                                        home_position[b].tit = local_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((home_position[b].s_role1 == local_p0[bb].alt_role1) && (home_position[b].s_role1 != '')){
                                                                        home_position[b].player_id = local_p0[bb].player_id
                                                                        home_position[b].player_name = local_p0[bb].player_name
                                                                        home_position[b].primary_role = local_p0[bb].alt_role1
                                                                        home_position[b].tit = local_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((home_position[b].s_role1 == local_p0[bb].alt_role2) && (home_position[b].s_role1 != '')){
                                                                        home_position[b].player_id = local_p0[bb].player_id
                                                                        home_position[b].player_name = local_p0[bb].player_name
                                                                        home_position[b].primary_role = local_p0[bb].alt_role2
                                                                        home_position[b].tit = local_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(check === 1){
                                                                        let index = local_p0.indexOf(local_p0[bb]);
                                                                        if (index > -1) {
                                                                            local_p0.splice(index, 1);
                                                                        }
                                                                        if(player_id != null){
                                                                            local_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        for(let b = 0 ; b < home_position.length ; b++){
                                                            for(let bb = 0 ; bb < local_p0.length ; bb++){
                                                                if(home_position[b].tit <= local_p0[bb].tit){
                                                                    let check = 0
                                                                    let player_id = home_position[b].player_id
                                                                    let player_name = home_position[b].player_name
                                                                    let primary_role = home_position[b].s_role
                                                                    let tit = home_position[b].tit
                                                                    let alt_role1 = home_position[b].alt_role1
                                                                    let alt_role2 = home_position[b].alt_role2
                                                                    let market_value = home_position[b].market_value
                                                                    if((home_position[b].s_role2 == local_p0[bb].primary_role) && (home_position[b].s_role2 != '')){
                                                                        home_position[b].player_id = local_p0[bb].player_id
                                                                        home_position[b].player_name = local_p0[bb].player_name
                                                                        home_position[b].primary_role = local_p0[bb].primary_role
                                                                        home_position[b].tit = local_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((home_position[b].s_role2 == local_p0[bb].alt_role1) && (home_position[b].s_role2 != '')){
                                                                        home_position[b].player_id = local_p0[bb].player_id
                                                                        home_position[b].player_name = local_p0[bb].player_name
                                                                        home_position[b].primary_role = local_p0[bb].alt_role1
                                                                        home_position[b].tit = local_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if((home_position[b].s_role2 == local_p0[bb].alt_role2) && (home_position[b].s_role2 != '')){
                                                                        home_position[b].player_id = local_p0[bb].player_id
                                                                        home_position[b].player_name = local_p0[bb].player_name
                                                                        home_position[b].primary_role = local_p0[bb].alt_role2
                                                                        home_position[b].tit = local_p0[bb].tit
                                                                        check = 1
                                                                    }
                                                                    if(check === 1){
                                                                        let index = local_p0.indexOf(local_p0[bb]);
                                                                        if (index > -1) {
                                                                            local_p0.splice(index, 1);
                                                                        }
                                                                        if(player_id != null){
                                                                            local_p0.push({"player_id": player_id, "player_name": player_name, "primary_role": primary_role, "alt_role1": alt_role1, "alt_role2": alt_role2, "tit": tit, "market_value": market_value})
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }

                                                        gk_p = []
                                                        def_p = []
                                                        mid_p = []
                                                        fwd_p = []
                                                        for(let b = 0 ; b < home_position.length ; b++){
                                                            if(home_position[b].pm_role === "GK"){
                                                                gk_p.push(home_position[b])
                                                            }
                                                            else if(home_position[b].pm_role === "DEF"){
                                                                def_p.push(home_position[b])
                                                            }
                                                            else if(home_position[b].pm_role === "MID"){
                                                                mid_p.push(home_position[b])
                                                            }
                                                            else if(home_position[b].pm_role === "FWD"){
                                                                fwd_p.push(home_position[b])
                                                            }
                                                        }
                                                        home_best_p = {"gk": gk_p, "def": def_p, "mid": mid_p, "fwd": fwd_p}

                                                        let home_best_p2 = {"gk": home_best_p.gk, "def": home_best_p.def, "mid1": home_best_p.mid, "mid2": [], "fwd": home_best_p.fwd}
                                                        let away_best_p2 = {"gk": away_best_p.gk, "def": away_best_p.def, "mid1": away_best_p.mid, "mid2": [], "fwd": away_best_p.fwd}
                                                        if(home_formation != null){
                                                            if(home_formation.split('-').length > 3){
                                                                let mid1_len = parseInt(home_formation.split('-')[1])
                                                                let mid2_len = parseInt(home_formation.split('-')[2])
                                                                let mid1 = []
                                                                let mid2 = []
                                                                for(let c = 0 ; c < mid1_len ; c++){
                                                                    mid1.push(home_best_p.mid[c])
                                                                }
                                                                for(let c = home_best_p.mid.length - mid2_len ; c < home_best_p.mid.length ; c++){
                                                                    mid2.push(home_best_p.mid[c])
                                                                }
                                                                home_best_p2 = {"gk": home_best_p.gk, "def": home_best_p.def, "mid1": mid1, "mid2": mid2, "fwd": home_best_p.fwd}
                                                            }
                                                        }
                                                        if(away_formation != null){
                                                            if(away_formation.split('-').length > 3){
                                                                let mid1_len = parseInt(away_formation.split('-')[1])
                                                                let mid2_len = parseInt(away_formation.split('-')[2])
                                                                let mid1 = []
                                                                let mid2 = []
                                                                for(let c = 0 ; c < mid1_len ; c++){
                                                                    if(away_best_p.mid[c]){
                                                                        mid1.push(away_best_p.mid[c])
                                                                    }
                                                                }
                                                                for(let c = away_best_p.mid.length - mid2_len ; c < away_best_p.mid.length ; c++){
                                                                    if(away_best_p.mid[c]){
                                                                        mid2.push(away_best_p.mid[c])
                                                                    }
                                                                }
                                                                away_best_p2 = {"gk": away_best_p.gk, "def": away_best_p.def, "mid1": mid1, "mid2": mid2, "fwd": away_best_p.fwd}
                                                            }
                                                        }

                                                        for(let g = 0 ; g < home_best_p1.gk.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < homeTeam.length ; u++){
                                                                if(home_best_p1.gk[g].player_id == homeTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < homeTeam1.length ; u++){
                                                                if(home_best_p1.gk[g].player_id == homeTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                console.log(home_best_p1.gk[g])
                                                                home_best_p1.gk[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < home_best_p1.def.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < homeTeam.length ; u++){
                                                                if(home_best_p1.def[g].player_id == homeTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < homeTeam1.length ; u++){
                                                                if(home_best_p1.def[g].player_id == homeTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                home_best_p1.def[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < home_best_p1.mid1.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < homeTeam.length ; u++){
                                                                if(home_best_p1.mid1[g].player_id == homeTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < homeTeam1.length ; u++){
                                                                if(home_best_p1.mid1[g].player_id == homeTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                home_best_p1.mid1[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < home_best_p1.mid2.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < homeTeam.length ; u++){
                                                                if(home_best_p1.mid2[g].player_id == homeTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < homeTeam1.length ; u++){
                                                                if(home_best_p1.mid2[g].player_id == homeTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                console.log('====>', home_best_p1.mid2[g])
                                                                console.log('====>', homeTeam)
                                                                home_best_p1.mid2[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < home_best_p1.fwd.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < homeTeam.length ; u++){
                                                                if(home_best_p1.fwd[g].player_id == homeTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < homeTeam1.length ; u++){
                                                                if(home_best_p1.fwd[g].player_id == homeTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                home_best_p1.fwd[g].color = 'blue'
                                                            }
                                                        }

                                                        for(let g = 0 ; g < home_best_p2.gk.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < homeTeam.length ; u++){
                                                                if(home_best_p2.gk[g].player_id == homeTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < homeTeam1.length ; u++){
                                                                if(home_best_p2.gk[g].player_id == homeTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                console.log(home_best_p2.gk[g])
                                                                home_best_p2.gk[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < home_best_p2.def.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < homeTeam.length ; u++){
                                                                if(home_best_p2.def[g].player_id == homeTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < homeTeam1.length ; u++){
                                                                if(home_best_p2.def[g].player_id == homeTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                home_best_p2.def[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < home_best_p2.mid1.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < homeTeam.length ; u++){
                                                                if(home_best_p2.mid1[g].player_id == homeTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < homeTeam1.length ; u++){
                                                                if(home_best_p2.mid1[g].player_id == homeTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                home_best_p2.mid1[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < home_best_p2.mid2.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < homeTeam.length ; u++){
                                                                if(home_best_p2.mid2[g].player_id == homeTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < homeTeam1.length ; u++){
                                                                if(home_best_p2.mid2[g].player_id == homeTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                console.log('====>', home_best_p2.mid2[g])
                                                                console.log('====>', homeTeam)
                                                                home_best_p2.mid2[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < home_best_p2.fwd.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < homeTeam.length ; u++){
                                                                if(home_best_p2.fwd[g].player_id == homeTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < homeTeam1.length ; u++){
                                                                if(home_best_p2.fwd[g].player_id == homeTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                home_best_p2.fwd[g].color = 'blue'
                                                            }
                                                        }

                                                        for(let g = 0 ; g < away_best_p1.gk.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < awayTeam.length ; u++){
                                                                if(away_best_p1.gk[g].player_id == awayTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < awayTeam1.length ; u++){
                                                                if(away_best_p1.gk[g].player_id == awayTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                away_best_p1.gk[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < away_best_p1.def.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < awayTeam.length ; u++){
                                                                if(away_best_p1.def[g].player_id == awayTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < awayTeam1.length ; u++){
                                                                if(away_best_p1.def[g].player_id == awayTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                away_best_p1.def[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < away_best_p1.mid1.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < awayTeam.length ; u++){
                                                                if(away_best_p1.mid1[g].player_id == awayTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < awayTeam1.length ; u++){
                                                                if(away_best_p1.mid1[g].player_id == awayTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                away_best_p1.mid1[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < away_best_p1.mid2.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < awayTeam.length ; u++){
                                                                if(away_best_p1.mid2[g].player_id == awayTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < awayTeam1.length ; u++){
                                                                if(away_best_p1.mid2[g].player_id == awayTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                away_best_p1.mid2[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < away_best_p1.fwd.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < awayTeam.length ; u++){
                                                                if(away_best_p1.fwd[g].player_id == awayTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < awayTeam1.length ; u++){
                                                                if(away_best_p1.fwd[g].player_id == awayTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                away_best_p1.fwd[g].color = 'blue'
                                                            }
                                                        }

                                                        for(let g = 0 ; g < away_best_p2.gk.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < awayTeam.length ; u++){
                                                                if(away_best_p2.gk[g].player_id == awayTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < awayTeam1.length ; u++){
                                                                if(away_best_p2.gk[g].player_id == awayTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                away_best_p2.gk[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < away_best_p2.def.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < awayTeam.length ; u++){
                                                                if(away_best_p2.def[g].player_id == awayTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < awayTeam1.length ; u++){
                                                                if(away_best_p2.def[g].player_id == awayTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                away_best_p2.def[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < away_best_p2.mid1.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < awayTeam.length ; u++){
                                                                if(away_best_p2.mid1[g].player_id == awayTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < awayTeam1.length ; u++){
                                                                if(away_best_p2.mid1[g].player_id == awayTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                away_best_p2.mid1[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < away_best_p2.mid2.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < awayTeam.length ; u++){
                                                                if(away_best_p2.mid2[g].player_id == awayTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < awayTeam1.length ; u++){
                                                                if(away_best_p2.mid2[g].player_id == awayTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                away_best_p2.mid2[g].color = 'blue'
                                                            }
                                                        }
                                                        for(let g = 0 ; g < away_best_p2.fwd.length ; g++){
                                                            let check = 0
                                                            for(let u = 0 ; u < awayTeam.length ; u++){
                                                                if(away_best_p2.fwd[g].player_id == awayTeam[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            for(let u = 0 ; u < awayTeam1.length ; u++){
                                                                if(away_best_p2.fwd[g].player_id == awayTeam1[u].playerId){
                                                                    check = 1
                                                                }
                                                            }
                                                            if(check === 0){
                                                                away_best_p2.fwd[g].color = 'blue'
                                                            }
                                                        }

                                                        // this.mainList[u].events[uu] = Object.assign({'home_rule_set': home_rule_color_number, 'away_rule_set': away_rule_color_number})
                                                        this.mainList[u].events[uu].show = true
                                                        this.mainList[u].events[uu].home_lineup = home_formation
                                                        this.mainList[u].events[uu].away_lineup = away_formation
                                                        this.mainList[u].events[uu].home_fmt_ans = home_fmt_ans
                                                        this.mainList[u].events[uu].away_fmt_ans = away_fmt_ans
                                                        this.mainList[u].events[uu].home_b_fmt_ans = home_b_fmt_ans
                                                        this.mainList[u].events[uu].away_b_fmt_ans = away_b_fmt_ans
                                                        this.mainList[u].events[uu].local_p1 = local_p1
                                                        this.mainList[u].events[uu].visit_p1 = visit_p1
                                                        this.mainList[u].events[uu].local_p2 = local_p2
                                                        this.mainList[u].events[uu].visit_p2 = visit_p2
                                                        this.mainList[u].events[uu].home_best = home_best_p1
                                                        this.mainList[u].events[uu].away_best = away_best_p1
                                                        this.mainList[u].events[uu].home_best1 = home_best_p2
                                                        this.mainList[u].events[uu].away_best1 = away_best_p2
                                                        this.mainList[u].events[uu].home_players = home_players
                                                        this.mainList[u].events[uu].away_players = away_players
                                                        this.mainList[u].events[uu].home_player = home_player
                                                        this.mainList[u].events[uu].away_player = away_player
                                                        this.mainList[u].events[uu].homeTeam = homeTeam
                                                        this.mainList[u].events[uu].awayTeam = awayTeam
                                                        this.mainList[u].events[uu].homeTeam3 = homeTeam
                                                        this.mainList[u].events[uu].awayTeam3 = awayTeam
                                                        this.mainList[u].events[uu].homeTeam1 = homeTeam1
                                                        this.mainList[u].events[uu].awayTeam1 = awayTeam1
                                                        this.mainList[u].events[uu].homeTeam2 = homeTeam1
                                                        this.mainList[u].events[uu].awayTeam2 = awayTeam1
                                                        this.mainList[u].events[uu].homeTeamName = homeTeamName
                                                        this.mainList[u].events[uu].awayTeamName = awayTeamName
                                                        this.mainList[u].events[uu].homeTeamformation = homeTeamFormation
                                                        this.mainList[u].events[uu].awayTeamformation = awayTeamFormation
                                                        this.mainList[u].events[uu].homeTeamPformation = homeTeamPformation
                                                        this.mainList[u].events[uu].awayTeamPformation = awayTeamPformation
                                                        this.mainList[u].events[uu].homeTeamLformation = homeTeamLformation
                                                        this.mainList[u].events[uu].awayTeamLformation = awayTeamLformation
                                                        this.mainList[u].events[uu].home_substitutions = home_substitutions
                                                        this.mainList[u].events[uu].away_substitutions = away_substitutions
                                                        this.mainList[u].events[uu].home_legend = home_legend
                                                        this.mainList[u].events[uu].away_legend = away_legend
                                                        this.mainList[u].events[uu].home_rule_set = home_rule_color_number
                                                        this.mainList[u].events[uu].away_rule_set = away_rule_color_number
                                                        console.log('=====>', this.mainList[u].events[uu])
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    this.hideModal()
                                })
                            }
                        }
                    }
                }
            },
            sort_function(){
                console.log('--------------------------',this.current_sort_direction, this.current_sort_data, this.current_sort_team, this.current_sort_group, this.current_sort_teamId, this.current_sort_field)
                let self =  this
                if(this.current_sort_direction === true){
                    if(this.current_sort_field === 'rating'){
                        this.current_sort_data.sort(self.sortByProperty1('rating'))
                    }
                    if(this.current_sort_field === 'goal'){
                        this.current_sort_data.sort(self.sortByProperty1('goal'))
                    }
                    if(this.current_sort_field === 'assist'){
                        this.current_sort_data.sort(self.sortByProperty1('assist'))
                    }
                    if(this.current_sort_field === 'Tit'){
                        this.current_sort_data.sort(self.sortByProperty1('Tit'))
                    }
                }
                else{
                    if(this.current_sort_field === 'rating'){
                        this.current_sort_data.sort(self.sortByProperty('rating'))
                    }
                    if(this.current_sort_field === 'goal'){
                        this.current_sort_data.sort(self.sortByProperty('goal'))
                    }
                    if(this.current_sort_field === 'assist'){
                        this.current_sort_data.sort(self.sortByProperty('assist'))
                    }
                    if(this.current_sort_field === 'Tit'){
                        this.current_sort_data.sort(self.sortByProperty('Tit'))
                    }
                }

                for(let i = 0 ; i < this.mainList.length ; i++){
                    for(let j = 0 ; j < this.mainList[i].events.length ; j++){
                        if(this.current_sort_team === 'home'){
                            if(this.mainList[i].events[j].home_id === this.current_sort_teamId){
                                if(this.current_sort_group === "GK"){
                                    this.mainList[i].events[j].home_players.gk = this.current_sort_data
                                }
                                if(this.current_sort_group === "DEF"){
                                    this.mainList[i].events[j].home_players.def = this.current_sort_data
                                }
                                if(this.current_sort_group === "MID"){
                                    this.mainList[i].events[j].home_players.mid = this.current_sort_data
                                }
                                if(this.current_sort_group === "FWD"){
                                    this.mainList[i].events[j].home_players.fwd = this.current_sort_data
                                }
                            }
                        }
                        else{
                            if(this.mainList[i].events[j].away_id === this.current_sort_teamId){
                                if(this.current_sort_group === "GK"){
                                    this.mainList[i].events[j].away_players.gk = this.current_sort_data
                                }
                                if(this.current_sort_group === "DEF"){
                                    this.mainList[i].events[j].away_players.def = this.current_sort_data
                                }
                                if(this.current_sort_group === "MID"){
                                    this.mainList[i].events[j].away_players.mid = this.current_sort_data
                                }
                                if(this.current_sort_group === "FWD"){
                                    this.mainList[i].events[j].away_players.fwd = this.current_sort_data
                                }
                            }
                        }
                    }
                }
            },
            sortJSON(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            },
            sortByProperty(property){
                return function(a,b){
                    if(a[property] > b[property])
                        return 1;
                    else if(a[property] < b[property])
                        return -1;
                    return 0;
                }
            },
            sortByProperty1(property){
                return function(a,b){
                    if(a[property] < b[property])
                        return 1;
                    else if(a[property] > b[property])
                        return -1;
                    return 0;
                }
            }
        },
        created() {
            this.readData()
        }
    }
</script>
<style>
    .content-tabs{
        width: 100px;
        float: left;
        color: gray;
        border-bottom: 1px solid gray;
        text-align: center;
        cursor: pointer;
    }
    .content-tabs1{
        width: 100px;
        float: left;
        color: gray;
        border-bottom: 1px solid gray;
        text-align: center;
        cursor: pointer;
        margin-left: 50px;
    }
    .eventdays select{
        padding-left: 5px;
    }
    .event-graph1{
        /*height: auto;*/
        background: #f9f9f9;
        padding: 20px 20px;
    }
    .unit-analysis{
        border: 1px solid gray;
        padding: 30px 10px;
    }
    .homeTeam_Container{
        width: 100%;
        min-height: 450px;
        border: 1px solid lightgrey;
        font-size: 12px;
    }
    .awayTeam_Container{
        width: 100%;
        min-height: 450px;
        border: 1px solid lightgrey;
        font-size: 12px;
        margin-top: 25px;
    }
    .home_main_tab{
        width: 100%;
        /*height: 420px;*/
        padding: 0px;
        padding-top: 5px;
    }
    .content{
        width: 100%;
    }
    .lineup-selector{
        width: 70px;
        margin-bottom: 0;
        float: left;
        margin-left: 10px;
    }
    .lineup-selector select{
        border-radius: 0;
        padding: 0;
        padding-left: 5px;
        padding-right: 5px;
        height: 20px;
    }
</style>
