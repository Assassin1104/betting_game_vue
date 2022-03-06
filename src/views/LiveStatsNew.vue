<template>
    <!-- <div class="live-stats-container" style="min-width: 1275px;"> -->
    <div class="live-stats-container" style="min-width: 1500px;">
        <!--        <div class="d-flex justify-content-center" style="height: 500px" v-if="!eventArray.length" >-->
        <!--            <div class="spinner-border" role="status" style="margin: auto">-->
        <!--                <span class="sr-only">Loading...</span>-->
        <!--            </div>-->
        <!--        </div>-->
        <b-modal id="modal-1"  hide-footer hide-header centered no-close-on-backdrop>
            <b-progress value="100" max="100" animated variant="secondary"></b-progress>
        </b-modal>
        <div v-if="!isload" style="height: 10px;">
            <b-progress :value="current_counter" :max="counter" animated></b-progress>
        </div>
        <CCard body-wrapper >
            <CTabs variant="tabs" :active-tab="1">
                <CTab @click.native="scheduled_tab()" :title="'Scheduled Games('+scheduleLength+')'">
                    
                    <div class="filter">
                        <label style="font-weight: bold; color: red; float: left;">Filter: </label>
                        <div style="width: 150px; float: left;">
                            <CSelect
                                    :options="sort_by"
                                    @update:value="sort_filter"
                            >
                            </CSelect>
                        </div>
                    </div>
                    <div style="clear: left;">
                    </div>
                    <div v-for="(item, index) in scheduleArray" >
                        
                        <div v-if="item.events.length > 0" class="schedule-header" style="display: flex; height: 30px; background: #d6d8d9; font-weight: 700; font-size: 15px; padding: 3px 10px;">
                            <div style="width: 35px">
                                <input
                                    class="check-box0"
                                    type="checkbox"
                                    style="margin-top: -2px"
                                    @change='checkscheduleParent($event, index)'
                                >
                                
                            </div>
                            <div style="flex: 3;">{{item.league}}</div>
                            <div style="flex: 1">
                                1X2
                            </div>
                            <div style="flex: 1">
                                O/U 0.5
                            </div>
                            <div style="flex: 1">
                                O/U 1.5
                            </div>
                            <div style="flex: 1">
                                O/U 2.5
                            </div>
                            <div style="flex: 1">
                                O/U 3.5
                            </div>

                            <div style="flex: 1">
                                O/U 0.5 (ht)
                            </div>

                            <div style="flex: 1">
                                BTS Yes/No
                            </div>
                            
                        </div>

                        <div v-for="item1 in item.events" class="event-content" style="height: 50px; font-size: 16px;">

                            <div style="display: flex">
                                <div style="width: 35px">
                                    <input
                                        class="check-box0"
                                        type="checkbox"
                                        style="margin-top: -2px"
                                        v-model="user_scheduled_ids"
                                        :value = "item1._id"
                                        checked="item.id"
                                    >
                                    
                                </div>
                                <div style="flex: 1; float: left;">
                                    {{item1.time.starting_at.date_time}}
                                </div>
                                <div style="flex: 1; float: left; text-align: right; padding-right: 2%;">
                                    {{item1.localTeamName}}
                                </div>
                                <div style="flex: 1; float: left; text-align: left; padding-left: 1%;">
                                    {{item1.visitorTeamName}}
                                </div>
                                <div style="flex: 1; float: left; text-align: left; padding-left: 1%;">
                                    <div v-if="item1.match_1 != null" >
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.match_1}}</span>,
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.match_3}}</span>,
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.match_2}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>
                                    <div v-if="item1.prob_home != null">
                                        <span style="padding: 0px 5px; border-radius: 3px; ">{{item1.prob_home + '%'}}</span>,
                                        <span style="padding: 0px 5px;  border-radius: 3px; ">{{item1.prob_draw + '%'}}</span>,
                                        <span style="padding: 0px 5px; border-radius: 3px; ">{{item1.prob_away + '%'}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>

                                </div>
                                

                                <div  style="flex: 1; float: left; text-align: left; padding-left: 1%;">
                                    <div v-if="item1.odds_over05 != null">
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.odds_over05}}</span>,
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.odds_under05}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>
                                    <div v-if="item1.prob_over05 != null">
                                        <span style="padding: 0px 5px; border-radius: 3px; ">{{item1.prob_over05 + '%'}}</span>,
                                        <span style="padding: 0px 5px;  border-radius: 3px; ">{{item1.prob_under05 + '%'}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>

                                </div>
                                

                                <div style="flex: 1; float: left; text-align: left; padding-left: 1%;">
                                    <div v-if="item1.odds_over15 != null">
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.odds_over15}}</span>,
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.odds_under15}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>
                                    <div v-if="item1.prob_over15 != null">
                                        <span style="padding: 0px 5px; border-radius: 3px; ">{{item1.prob_over15 + '%'}}</span>,
                                        <span style="padding: 0px 5px;  border-radius: 3px; ">{{item1.prob_under15 + '%'}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>

                                </div>
                                

                                <div style="flex: 1; float: left; text-align: left; padding-left: 1%;">
                                    <div v-if="item1.odds_over25 != null" >
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.odds_over25}}</span>,
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.odds_under25}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>
                                    <div v-if="item1.prob_over25 != null">
                                        <span style="padding: 0px 5px; border-radius: 3px; ">{{item1.prob_over25 + '%'}}</span>,
                                        <span style="padding: 0px 5px;  border-radius: 3px; ">{{item1.prob_under25 + '%'}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>

                                </div>
                                

                                <div style="flex: 1; float: left; text-align: left; padding-left: 1%;">
                                    <div v-if="item1.odds_over35 != null">
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.odds_over35}}</span>,
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.odds_under35}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>
                                    <div v-if="item1.prob_over35 != null">
                                        <span style="padding: 0px 5px; border-radius: 3px; ">{{item1.prob_over35 + '%'}}</span>,
                                        <span style="padding: 0px 5px;  border-radius: 3px; ">{{item1.prob_under35 + '%'}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>

                                </div>
                                

                                <div  style="flex: 1; float: left; text-align: left; padding-left: 1%;">
                                    <div v-if="item1.odds_over05_ht != null">
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.odds_over05_ht}}</span>,
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.odds_under05_ht}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>
                                    <div v-if="item1.prob_over05_ht != null">
                                        <span style="padding: 0px 5px; border-radius: 3px; ">{{item1.prob_over05_ht + '%'}}</span>,
                                        <span style="padding: 0px 5px;  border-radius: 3px; ">{{item1.prob_under05_ht + '%'}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>

                                </div>
                                

                                <div style="flex: 1; float: left; text-align: left; padding-left: 1%;">
                                    <div v-if="item1.odds_bts_yes != null" >
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.odds_bts_yes}}</span>,
                                        <span style="background: #6c757d; padding: 0px 5px; font-weight: bold; border-radius: 3px; color: white;">{{item1.odds_bts_no}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>
                                    <div v-if="item1.prob_bts != null">
                                        <span style="padding: 0px 5px; border-radius: 3px; ">{{item1.prob_bts + '%'}}</span>,
                                        <span style="padding: 0px 5px;  border-radius: 3px; ">{{item1.prob_bts_no + '%'}}</span>
                                    </div>
                                    <div v-else>
                                        ...
                                    </div>

                                </div>
                                
                                
                            </div>
                        </div>
                    </div>
                    <CCol sm="4" style="position:fixed; bottom: 0;">
                        <CButton
                            color="info"
                            class="m-2 save_match_data"
                            @click="save_scheduled"
                        >
                            Save to My Game
                        </CButton>

                    </CCol>
                </CTab>
                <CTab :title="'LIVE Games('+liveNumbers+')'">
                    
                    <div v-for="(item, index) in eventArray" style="margin-top: -3px;">
                        <div v-if="item.events.length > 0 && item.league"  class="header" style="width: 100%; height: 50px;">
                            <div style="height: 0px; position: relative; top: 22px; left: 5px;z-index: 1000;">
                                <input
                                    class="check-box0"
                                    type="checkbox"
                                    style="margin-top: -2px"
                                    @change='checkliveParent($event, index)'
                                >
                                
                            </div>
                            
                            <div class="header-content" style="width: 15%; height: 50px; float: left; text-align: left;font-weight: bold; padding-left: 35px; padding-top: 7px; font-size: 13px!important;">
                                <div style="width: 35px; ">
                                
                                </div>
                                {{item.league}}
                            </div>
                            <div class="header-content" style="width: 4%; min-width: 30px; height: 50px; float: left; border-left: 1px solid whitesmoke; padding-top: 20px; font-weight: bold; font-size: 13px!important;">
                                Result
                            </div>
                            <div class="header-content detail_total" style="width: 31%; height: 50px; float: left; border-left: 1px solid whitesmoke; font-size: 13px!important; font-weight: bold;">
                                Total Game
                                <div style="width: 100%">
                                    <div class="detail">
                                        On
                                    </div>
                                    <div class="detail">
                                        Off
                                    </div>
                                    <div class="detail">
                                        Blk
                                    </div>
                                    <div class="detail">
                                        In
                                    </div>
                                    <div class="detail">
                                        Out
                                    </div>
                                    <div class="detail">
                                        Cnr
                                    </div>
                                    <div class="detail">
                                        DA
                                    </div>
                                    <div class="detail">
                                        Poss
                                    </div>
                                    <div class="detail">
                                        Red
                                    </div>
                                    <div class="detail">
                                        Yel
                                    </div>
                                    <div class="detail">
                                        Sbst
                                    </div>
                                    <div class="detail" style="min-width: 37px;">
                                        Ini
                                    </div>
                                    <div class="detail" style="width: 4%;">
                                        PFM
                                    </div>
                                </div>
                            </div>
                            <div class="header-content detail_total" style="width: 26%; height: 50px; float: left; border-left: 1px solid whitesmoke; font-size: 13px!important; font-weight: bold;">
                                Last 10 minutes
                                <div style="width: 100%">
                                    <div class="detail1">
                                        On
                                    </div>
                                    <div class="detail1">
                                        Off
                                    </div>
                                    <div class="detail1">
                                        Blk
                                    </div>
                                    <div class="detail1">
                                        In
                                    </div>
                                    <div class="detail1">
                                        Out
                                    </div>
                                    <div class="detail1">
                                        Cnr
                                    </div>
                                    <div class="detail1">
                                        DA
                                    </div>
                                    <div class="detail1" style="min-width: 32px;">
                                        Poss
                                    </div>
                                    <div class="detail1">
                                        Sbst
                                    </div>
                                    <div class="detail1" style="min-width: 35px;">
                                        Goal
                                    </div>
                                    <div class="detail1">
                                        Rtg
                                    </div>
                                </div>
                            </div>
                            <div class="header-content" style="width: 16%; height: 50px; float: left; border-left: 1px solid whitesmoke; font-weight: bold; padding-top: 5px; font-size: 13px!important;">
                                Odds
                                <div style="width: 100%">
                                    <div style="width: 45%; float: left; text-align: center;">
                                        1 X 2
                                    </div>
                                    <div style="width: 55%; float: left; text-align: center;">
                                        O / U
                                    </div>
                                </div>
                            </div>

                            <div class="header-content" style="width: 4%; height: 50px; float: left; border-left: 1px solid whitesmoke; font-weight: bold; padding-top: 5px; font-size: 13px!important;">
                                Next Goal                                
                            </div>

                            <div class="header-content detail_total" style="width: 4%; height: 50px; float: left; border-left: 1px solid whitesmoke; font-size: 13px!important; font-weight: bold;">
                                GB (%)                                
                            </div>
                            
                        </div>
                        <div v-for="(item1, index) in item.events" class="content" :style="{'width': '100%', 'height': '130px', 'font-weight': '600', 'background': background_row[index % 2]}">

                            <div style="height: 0px; position: relative; top: 22px; left: 5px;z-index: 1000;">
                                
                                <input
                                    class="check-box0"
                                    type="checkbox"
                                    style="margin-top: -2px"
                                    v-model="user_live_ids"
                                    :value = "item1.main_data._id"
                                >
                                
                            </div>

                            
                            <!--  home team data part Total -->
                            <div style="width: 15%; height: 30px; float: left; position: relative; top: 0px;">

                                
                                <div class="time_manner" style="width: 60px; float: left;position: relative; top:  23px; left: 26px; font-size: 17px; font-weight: normal"><p>{{item1.home.time}}'</p><p>{{item1.home.added_time}}</p></div>
                                
                                <div v-if="item1.home.flash == 1" class="goal_manner" style="width: calc(100% - 65px); float: left;">{{item1.main_data.home_name}} <span v-if="item1.stage_has_standings">({{item1.main_data.home_rank}})</span></div>
                                <div v-else style="width: calc(100% - 65px); float: left;">{{item1.main_data.home_name}} <span v-if="item1.stage_has_standings">({{item1.main_data.home_rank}})</span></div>
                            </div>
                            <a :href="item1.com_url" target="_blank" style="float: left; height: 0px; position: relative; top: 17px; left: -53px; z-index: 1000;">
                                <img src="/img/bf.com_icon.png" style="width: 20px; cursor: pointer; outline: none;"/>
                            </a>
                            <a :href="item1.it_url" target="_blank" style="float: left; height: 0px; position: relative; top: 17px; left: -25px; z-index: 1000;">
                                <img v-if="item1.it_url != ''" src="/img/bf.it_icon_new.png" style="width: 20px; cursor: pointer; outline: none;"/>
                            </a>
                            <div
                                    @click="SetCollapse1(item1.index0)"
                                    duration="100"
                                    style="height: 0px; position: relative; top: 17px; left: -80px; float: left; z-index: 1000;"
                            >
                                <img v-b-modal.modal-center src="/img/info_icon.png" @click="callHistoricalData(item1.home.id, item1.away.id, item1.season_id, item1.main_data.home_name + ' v ' + item1.main_data.away_name, item1.home.rtg, item1.home.a_rtg, item1.away.rtg, item1.away.a_rtg, item1.fixtureId)" width="13px;" style="width: 20px; cursor: pointer; outline: none;"/>
                            </div>
                            <div style="width: 4%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: black;">
                                    <div :key="item1.goalKey" class="detail" style="color: red; position: relative; top: 22px; left: 7px; font-size: 18px;">
                                        <p :id="item1.goalKey">{{item1.home.score}} - {{item1.away.score}}</p>
                                        <p>{{item1.aggregate_result}}</p>
                                    </div>
                                    <b-tooltip :key="item1.goalKey + '1'" :target="item1.goalKey" v-if="item1.goal_tooltip != ''" triggers="hover">
                                        {{item1.goal_tooltip}}
                                    </b-tooltip>
                                </div>
                            </div>
                            <div class="detail_total" style="width: 31%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: #212529;">
                                    <div v-if="item1.homeT.on == 0" class="detail" style="color: #212529;">
                                        0
                                    </div>
                                    <div :key="item1.home_tooltip.onKey" :id="item1.home_tooltip.onKey"  v-if="item1.homeT.on > 0" class="detail" style="color: #212529;">
                                        {{item1.homeT.on}}
                                    </div>
                                    <b-tooltip v-if="item1.homeT.on > 0" :key="item1.home_tooltip.onKey + '1'" :target="item1.home_tooltip.onKey" triggers="hover">
                                        {{item1.home_tooltip.on}}
                                    </b-tooltip>

                                    <div v-if="item1.homeT.off == 0" class="detail" style="color: #212529">
                                        {{item1.homeT.off}}
                                    </div>
                                    <div :key="item1.home_tooltip.offKey" :id="item1.home_tooltip.offKey"  v-if="item1.homeT.off > 0" class="detail" style="color: #212529;">
                                        {{item1.homeT.off}}
                                    </div>
                                    <b-tooltip v-if="item1.homeT.off > 0" :key="item1.home_tooltip.offKey + '1'" :target="item1.home_tooltip.offKey" triggers="hover">
                                        {{item1.home_tooltip.off}}
                                    </b-tooltip>
                                    <div :key="item1.home_tooltip.blkKey" :id="item1.home_tooltip.blkKey"  v-if="item1.homeT.blk > 0" class="detail" style="color: #212529;">
                                        {{item1.homeT.blk}}
                                    </div>
                                    <b-tooltip v-if="item1.homeT.blk > 0" :key="item1.home_tooltip.blkKey + '1'" :target="item1.home_tooltip.blkKey" triggers="hover">
                                        {{item1.home_tooltip.blk}}
                                    </b-tooltip>

                                    <div v-if="item1.homeT.blk == 0 && item1.awayT.blk != 0" class="detail" style="color: #212529">
                                        {{item1.homeT.blk}}
                                    </div>
                                    <div v-if="item1.homeT.blk == null || (item1.homeT.blk == 0 && item1.awayT.blk == 0)" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.in == 0" class="detail" style="color: #212529">
                                        {{item1.homeT.in}}
                                    </div>
                                    <div :key="item1.home_tooltip.inKey" :id="item1.home_tooltip.inKey"  v-if="item1.homeT.in > 0" class="detail" style="color: #212529;">
                                        {{item1.homeT.in}}
                                    </div>
                                    <b-tooltip v-if="item1.homeT.in > 0" :key="item1.home_tooltip.inKey + '1'" :target="item1.home_tooltip.inKey" triggers="hover">
                                        {{item1.home_tooltip.in}}
                                    </b-tooltip>
                                    <div v-if="item1.homeT.in == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.out == 0" class="detail" style="color: #212529">
                                        {{item1.homeT.out}}
                                    </div>
                                    <div :key="item1.home_tooltip.outKey" :id="item1.home_tooltip.outKey"  v-if="item1.homeT.out > 0" class="detail" style="color: #212529;">
                                        {{item1.homeT.out}}
                                    </div>
                                    <b-tooltip v-if="item1.homeT.out > 0" :key="item1.home_tooltip.outKey + '1'" :target="item1.home_tooltip.outKey" triggers="hover">
                                        {{item1.home_tooltip.out}}
                                    </b-tooltip>
                                    <div v-if="item1.homeT.out == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.cnr == 0" class="detail" style="color: #212529">
                                        {{item1.homeT.cnr}}
                                    </div>
                                    <div :key="item1.home_tooltip.cnrKey" :id="item1.home_tooltip.cnrKey"  v-if="item1.homeT.cnr > 0" class="detail" style="color: #212529;">
                                        {{item1.homeT.cnr}}
                                    </div>
                                    <b-tooltip v-if="item1.homeT.cnr > 0" :key="item1.home_tooltip.cnrKey + '1'" :target="item1.home_tooltip.cnrKey" triggers="hover">
                                        {{item1.home_tooltip.cnr}}
                                    </b-tooltip>

                                    <div v-if="item1.homeT.cnr == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.da == 0" class="detail" style="color: #212529">
                                        {{item1.homeT.da}}
                                    </div>
                                    <div v-if="item1.homeT.da > 0" class="detail" style="color: #212529">
                                        {{item1.homeT.da}}
                                    </div>
                                    <div v-if="item1.homeT.poss == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.poss == 0" class="detail" style="color: #212529">
                                        {{item1.homeT.poss}}
                                    </div>
                                    <div v-if="item1.homeT.poss != 0 && item1.homeT.poss != null" class="detail" style="color: #212529">
                                        {{item1.homeT.poss}}
                                    </div>
                                    <div v-if="item1.homeT.red == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.red == 0" class="detail" style="color: #212529">
                                        0
                                    </div>
                                    <div v-if="item1.homeT.red != 0 && item1.homeT.red != null" class="detail" :id="item1.home_tooltip.redKey" style="color: #212529; background-color: red;">
                                        {{item1.homeT.red}}
                                    </div>
                                    <b-tooltip v-if="item1.homeT.red != 0 && item1.homeT.red != null" :target="item1.home_tooltip.redKey" triggers="hover">
                                        {{item1.home_tooltip.red}}
                                    </b-tooltip>
                                    <div v-if="item1.homeT.yel == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.yel == 0" class="detail" style="color: #212529">
                                        0
                                    </div>
                                    <div v-if="item1.homeT.yel != 0 && item1.homeT.yel != null" class="detail" :id="item1.home_tooltip.yelKey" style="color: #212529">
                                        {{item1.homeT.yel}}
                                    </div>
                                    <b-tooltip v-if="item1.homeT.yel != 0 && item1.homeT.yel != null" :target="item1.home_tooltip.yelKey" triggers="hover">
                                        {{item1.home_tooltip.yel}}
                                    </b-tooltip>
                                    <div v-if="item1.homeT.sbst == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.sbst == 0" class="detail" style="color: #212529">
                                        0
                                    </div>
                                    <div v-if="item1.homeT.sbst != 0 && item1.homeT.sbst != null" class="detail" :id="item1.home_tooltip.sbstKey" style="color: #212529">
                                        {{item1.homeT.sbst}}
                                    </div>
                                    <b-tooltip v-if="item1.homeT.yel != 0 && item1.homeT.yel != null" :target="item1.home_tooltip.sbstKey" triggers="hover">
                                        {{item1.home_tooltip.sbst}}
                                    </b-tooltip>
                                    <div class="detail" style="color: #212529; min-width: 37px; font-weight: bold">
                                        {{item1.homeT.nxt}}
                                    </div>
                                    <div class="detail" style="color: #212529; font-weight: bold">
                                        {{item1.homeT.rtg}}
                                    </div>
                                </div>
                            </div>
                            <div class="detail_total" style="width: 26%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: black;">
                                    <div v-if="item1.home.on > 0 || item1.home.on < 0" class="detail1" :style="{'color': item1.home1.on}">
                                        {{item1.home.on}}
                                    </div>
                                    <div v-if="item1.home.on == 0" class="detail1" :style="{'color': item1.home1.on}">
                                        0
                                    </div>
                                    <div v-if="item1.home.on != 0 && item1.home.on == null" class="detail1" :style="{'color': item1.home1.on}">
                                        -
                                    </div>

                                    <div v-if="item1.home.off > 0 || item1.home.off < 0" class="detail1" :style="{'color': item1.home1.off}">
                                        {{item1.home.off}}
                                    </div>
                                    <div v-if="item1.home.off == 0" class="detail1" :style="{'color': item1.home1.off}">
                                        {{item1.home.off}}
                                    </div>
                                    <div v-if="item1.home.off != 0 && item1.home.off == null" class="detail1" :style="{'color': item1.home1.off}">
                                        -
                                    </div>

                                    <div v-if="item1.home.blk > 0" class="detail1" :style="{'color': item1.home1.blk}">
                                        {{item1.home.blk}}
                                    </div>
                                    <div v-if="(item1.home.blk == 0 && item1.away.blk != 0)" class="detail1" :style="{'color': item1.home1.blk}">
                                        {{item1.home.blk}}
                                    </div>
                                    <div v-if="(item1.home.blk == 0 && item1.away.blk == 0)" class="detail1" :style="{'color': item1.home1.blk}">
                                        -
                                    </div>
                                    <div v-if="item1.home.blk != 0 && item1.home.blk == null" class="detail1" :style="{'color': item1.home1.blk}">
                                        -
                                    </div>

                                    <div v-if="item1.home.in > 0 || item1.home.in < 0" class="detail1" :style="{'color': item1.home1.in}">
                                        {{item1.home.in}}
                                    </div>
                                    <div v-if="item1.home.in == 0" class="detail1" :style="{'color': item1.home1.in}">
                                        {{item1.home.in}}
                                    </div>
                                    <div v-if="item1.home.in != 0 && item1.home.in == null" class="detail1" :style="{'color': item1.home1.in}">
                                        -
                                    </div>

                                    <div v-if="item1.home.out > 0 || item1.home.out < 0" class="detail1" :style="{'color': item1.home1.out}">
                                        {{item1.home.out}}
                                    </div>
                                    <div v-if="item1.home.out == 0" class="detail1" :style="{'color': item1.home1.out}">
                                        {{item1.home.out}}
                                    </div>
                                    <div v-if="item1.home.out != 0 && item1.home.out == null" class="detail1" :style="{'color': item1.home1.out}">
                                        -
                                    </div>

                                    <div v-if="item1.home.cnr > 0 || item1.home.cnr < 0" class="detail1" :style="{'color': item1.home1.cnr}">
                                        {{item1.home.cnr}}
                                    </div>
                                    <div v-if="item1.home.cnr == 0" class="detail1" :style="{'color': item1.home1.cnr}">
                                        {{item1.home.cnr}}
                                    </div>
                                    <div v-if="item1.home.cnr != 0 && item1.home.cnr == null" class="detail1" :style="{'color': item1.home1.cnr}">
                                        -
                                    </div>

                                    <div v-if="item1.home.da > 0 || item1.home.da < 0" class="detail1" :style="{'color': item1.home1.da}">
                                        {{item1.home.da}}
                                    </div>
                                    <div v-if="item1.home.da == 0" class="detail1" :style="{'color': item1.home1.da}">
                                        {{item1.home.da}}
                                    </div>
                                    <div v-if="item1.home.da != 0 && item1.home.da == null" class="detail1" :style="{'color': item1.home1.da}">
                                        -
                                    </div>

                                    <div v-if="item1.home.poss > 0 || item1.home.poss < 0" class="detail1" :style="{'color': item1.home1.poss}">
                                        {{item1.home.poss}}
                                    </div>
                                    <div v-if="item1.home.poss == 0" class="detail1" :style="{'color': item1.home1.poss}">
                                        0
                                    </div>
                                    <div v-if="item1.home.poss != 0 && item1.home.poss == null" class="detail1" :style="{'color': item1.home1.poss}">
                                        -
                                    </div>

                                    <div v-if="item1.home.sbst > 0 || item1.home.sbst < 0" class="detail1" style="color: black">
                                        {{item1.home.sbst}}
                                    </div>
                                    <div v-if="item1.home.sbst == 0" class="detail1" style="color: black">
                                        {{item1.home.sbst}}
                                    </div>
                                    <div v-if="item1.home.sbst != 0 && item1.home.sbst == null" class="detail1" style="color: black">
                                        -
                                    </div>

                                    <div v-if="item1.home.goal > 0 || item1.home.goal < 0" class="detail1" style="color: black; min-width: 36px;">
                                        {{item1.home.goal}}
                                    </div>
                                    <div v-if="item1.home.goal == 0" class="detail1" style="color: black; min-width: 36px;">
                                        {{item1.home.goal}}
                                    </div>
                                    <div v-if="item1.home.goal != 0 && item1.home.goal == null" class="detail1" style="color: black;  min-width: 36px;">
                                        -
                                    </div>

                                    <div v-if="item1.home.rtg > item1.home.a_rtg" class="detail1" style="color: #263043; font-weight: bold; background: #d4edda; height: 31px;">
                                        {{item1.home.rtg}}
                                    </div>
                                    <div v-else class="detail1" style="color: #263043; font-weight: bold; height: 31px;">
                                        {{item1.home.rtg}}
                                    </div>
                                </div>
                            </div>
                            <div style="width: 16%; float: left; height:  80px;border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; ">
                                    <div style="width: 45%; float: left; height: 60px;">
                                        <div v-if="item1.homeT.homewin_stat_green" style="height: 16px; margin-bottom: 2px; margin-top: 2px;">
                                            1: <label class="Odds-label" style="margin-left: 2.3px;">{{item1.homeT.homeodds}}</label><label class='green-label' :id="item1.home.id + '-' +  item1.away.id + 'hw'">{{item1.homeT.homewin_stat}}</label>
                                        </div>
                                        <div v-else style="height: 16px; margin-bottom: 2px; margin-top: 2px;">
                                            1: <label class="Odds-label" style="margin-left: 2.3px;">{{item1.homeT.homeodds}}</label><label style='padding-left: 5px'  :id="item1.home.id + '-' +  item1.away.id + 'hw'">{{item1.homeT.homewin_stat}}</label>
                                        </div>
                                        
                                        
                                        <b-tooltip v-if="item1.homeT.homewin_stat_tooltip_1" :target="item1.home.id + '-' +  item1.away.id + 'hw'" triggers="hover">
                                            <span>True Odds: {{item1.homeT.homewin_stat_tooltip_1}}</span><br>
                                            <span>Value: {{item1.homeT.homewin_stat_tooltip_2}}%</span>
                                            
                                        </b-tooltip>
                                        <div v-if="item1.homeT.drawwin_stat_green" style="height: 16px; margin-bottom: 2px;">
                                            X: <label class="Odds-label">{{item1.homeT.drawodds}}</label><label class='green-label' :id="item1.home.id + '-' +  item1.away.id + 'dw'">{{item1.homeT.drawwin_stat}}</label>
                                        </div>
                                        <div v-else style="height: 16px; margin-bottom: 2px;">
                                            X: <label class="Odds-label">{{item1.homeT.drawodds}}</label><label :id="item1.home.id + '-' +  item1.away.id + 'dw'" style='padding-left: 5px'>{{item1.homeT.drawwin_stat}}</label>
                                        </div>
                                        <b-tooltip v-if="item1.homeT.drawwin_stat_tooltip_1" :target="item1.home.id + '-' +  item1.away.id + 'dw'" triggers="hover">
                                            <span>True Odds: {{item1.homeT.drawwin_stat_tooltip_1}}</span><br>
                                            <span>Value: {{item1.homeT.drawwin_stat_tooltip_2}}%</span>
                                            
                                        </b-tooltip>
                                        <div v-if="item1.homeT.awaywin_stat_green"  style="height: 16px;">
                                            2: <label class="Odds-label" style="margin-left: 1px;">{{item1.homeT.awayodds}}</label><label class='green-label' :id="item1.home.id + '-awin' +  item1.away.id">{{item1.homeT.awaywin_stat}}</label>
                                        </div>
                                        <div v-else style="height: 16px;">
                                            2: <label class="Odds-label" style="margin-left: 1px;">{{item1.homeT.awayodds}}</label><label :id="item1.home.id + '-awin' +  item1.away.id" style="padding-left: 5px">{{item1.homeT.awaywin_stat}}</label>
                                        </div>
                                        <b-tooltip v-if="item1.homeT.awaywin_stat_tooltip_1" :target="item1.home.id + '-awin' +  item1.away.id" triggers="hover">
                                            <span>True Odds: {{item1.homeT.awaywin_stat_tooltip_1}}</span><br>
                                            <span>Value: {{item1.homeT.awaywin_stat_tooltip_2}}%</span>
                                        </b-tooltip>
                                        <div style="height: 16px;">
                                            Matches: {{item1.homeT.number_of_matches}}
                                        </div>
                                    </div>
                                    
                                    <div style="width: 55%; float: left;">
                                        <div v-if="item1.homeT.over_odds[0]['mark']" style="height: 16px; margin-bottom: 2px; margin-top: 2px;">
                                            O {{item1.homeT.over_odds[0]['mark']}}: <label class="Odds-label">{{item1.homeT.over_odds[0]['value']}}</label>
                                            
                                                <label v-bind:class="[item1.homeT.goal_1_plus_green ? 'green-label' : 'stats-label']" :id="item1.home.id + 'o05' + item1.away.id">
                                                    {{item1.homeT.goal_1_plus}}
                                                    
                                                </label>
                                                <b-tooltip v-if="item1.homeT.goal_1_plus_tooltip_1" :target="item1.home.id + 'o05' +  item1.away.id " triggers="hover">
                                                    <span>True Odds: {{item1.homeT.goal_1_plus_tooltip_1}}</span><br>
                                                    <span>Value: {{item1.homeT.goal_1_plus_tooltip_2}}%</span>
                                                </b-tooltip>
                                           
                                        </div>
                                        <!-- <div v-else style="height: 16px; margin-bottom: 2px; margin-top: 2px;">
                                            O x.x: <label class="Odds-label"></label>
                                        </div> -->
                                        <div v-if="item1.homeT.under_odds[0]['mark']" style="height: 16px;">
                                            U {{item1.homeT.under_odds[0]['mark']}}: <label class="Odds-label">{{item1.homeT.under_odds[0]['value']}}</label>

                                            <label v-bind:class="[item1.homeT.goal_1_minus_green ? 'green-label' : 'stats-label']" :id="item1.home.id + 'u05' + item1.away.id">{{item1.homeT.goal_1_minus}}</label>
                                            <b-tooltip v-if="item1.homeT.goal_1_minus_tooltip_1" :target="item1.home.id + 'u05' +  item1.away.id " triggers="hover">
                                                <span>True Odds: {{item1.homeT.goal_1_minus_tooltip_1}}</span><br>
                                                <span>Value: {{item1.homeT.goal_1_minus_tooltip_2}}%</span>
                                            </b-tooltip>
                                        </div>
                                        <!-- <div v-else style="height: 16px; margin-bottom: 2px; margin-top: 2px;">
                                            U x.x: <label class="Odds-label"></label>
                                        </div> -->
                                        <div v-if="item1.homeT.over_odds[1]['mark']" style="height: 16px; margin-bottom: 2px; margin-top: 2px;">
                                            O {{item1.homeT.over_odds[1]['mark']}}: <label class="Odds-label">{{item1.homeT.over_odds[1]['value']}}</label>
                                            <label v-bind:class="[item1.homeT.goal_2_plus_green ? 'green-label' : 'stats-label']" :id="item1.home.id + 'o15' + item1.away.id">{{item1.homeT.goal_2_plus}}</label>
                                            <b-tooltip v-if="item1.homeT.goal_2_plus_tooltip_1" :target="item1.home.id + 'o15' +  item1.away.id " triggers="hover">
                                                <span>True Odds: {{item1.homeT.goal_2_plus_tooltip_1}}</span><br>
                                                <span>Value: {{item1.homeT.goal_2_plus_tooltip_2}}%</span>
                                            </b-tooltip>
                                        </div>
                                        <!-- <div v-else style="height: 16px; margin-bottom: 2px; margin-top: 2px;">
                                            O x.x: <label class="Odds-label"></label>
                                        </div> -->
                                        <div v-if="item1.homeT.under_odds[1]['mark']" style="height: 16px;">
                                            U {{item1.homeT.under_odds[1]['mark']}}: <label class="Odds-label">{{item1.homeT.under_odds[1]['value']}}</label>
                                            <label v-bind:class="[item1.homeT.goal_2_minus_green ? 'green-label' : 'stats-label']" :id="item1.home.id + 'u15' + item1.away.id">{{item1.homeT.goal_2_minus}}</label>
                                            <b-tooltip v-if="item1.homeT.goal_2_minus_tooltip_1" :target="item1.home.id + 'u15' +  item1.away.id " triggers="hover">
                                                <span>True Odds: {{item1.homeT.goal_2_minus_tooltip_1}}</span><br>
                                                <span>Value: {{item1.homeT.goal_2_minus_tooltip_2}}%</span>
                                            </b-tooltip>
                                        </div>
                                        <!-- <div v-else style="height: 16px; margin-bottom: 2px; margin-top: 2px;">
                                            U x.x: <label class="Odds-label"></label>
                                        </div> -->
                                    </div>
                                    
                                </div>
                            </div>

                            <div style="width: 4%; float: left;height: 80px; border-left: 1px solid #e2e2e2;">

                                <div style="width: 100%; padding: 3px 7px; ">
                                    <div style="width: 100%; float: left; height: 60px;">
                                        <div style="height: 16px; margin-bottom: 2px; margin-top: 2px;">
                                            H:<label class="" style="margin-left: 2.3px;">{{item1.homeT.goalnexthome}}</label>
                                        </div>
                                        <div style="height: 16px;">
                                            A:<label class="" style="margin-left: 1px;">{{item1.homeT.goalnextaway}}</label>
                                        </div>
                                        <div style="height: 16px; margin-bottom: 2px;">
                                            N:<label class="">{{item1.homeT.goalnextdraw}}</label>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                            <div style="width: 4%; height: 80px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; ">

                                   <div style="width: 100%; float: left; height: 60px;">
                                        <div v-if="item1.homeT.goalyes.length > 0"  style="height: 16px; margin-bottom: 2px; margin-top: 2px; text-align: center;">
                                            <label class="" style="margin-left: 2.3px;">{{item1.homeT.goalyes[0]['mark']}}</label>
                                        </div>
                                        <div v-if="item1.homeT.goalyes.length > 0"  style="height: 16px; text-align: center;">
                                           <label v-bind:class="[item1.homeT.goalyes[0].green ? 'green-label' : '']" :id="item1.home.id + '-goal_1-' + item1.away.id">{{item1.homeT.goalyes[0]['value']}}</label>

                                           <b-tooltip v-if="item1.homeT.goalyes[0].tooltip_1" :target="item1.home.id + '-goal_1-' +  item1.away.id " triggers="hover">
                                                <span>True Odds: {{item1.homeT.goalyes[0].tooltip_1}}</span><br>
                                                <span>Value: {{item1.homeT.goalyes[0].tooltip_2}}%</span>
                                            </b-tooltip>
                                        </div>
                                        <div v-if="item1.homeT.goalyes.length > 1"  style="height: 16px; margin-bottom: 2px; margin-top: 2px; text-align: center;">
                                            <label class="" style="margin-left: 2.3px;">{{item1.homeT.goalyes[1]['mark']}}</label>
                                        </div>
                                        <div v-if="item1.homeT.goalyes.length > 1"  style="height: 16px; text-align: center;">
                                           <label v-bind:class="[item1.homeT.goalyes[1].green ? 'green-label' : '']" :id="item1.home.id + '-goal_2-' + item1.away.id">{{item1.homeT.goalyes[1]['value']}}</label>
                                           <b-tooltip v-if="item1.homeT.goalyes[1].tooltip_1" :target="item1.home.id + '-goal_2-' +  item1.away.id " triggers="hover">
                                                <span>True Odds: {{item1.homeT.goalyes[1].tooltip_1}}</span><br>
                                                <span>Value: {{item1.homeT.goalyes[1].tooltip_2}}%</span>
                                            </b-tooltip>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>


                            
                            <!--  away team data part  Total-->
                            <div style="width: 15%; height: 30px; float: left; position: relative; top: 0px;">
                                <div style="width: 60px; float: left; color: white;">.</div>
                                <div v-if="item1.away.flash == 1" class="goal_manner" style="width: calc(100% - 65px); float: left;">{{item1.main_data.away_name}} <span v-if="item1.stage_has_standings">({{item1.main_data.away_rank}})</span></div>
                                <div v-else style="width: calc(100% - 65px); float: left;">{{item1.main_data.away_name}} <span v-if="item1.stage_has_standings">({{item1.main_data.away_rank}})</span></div>
                            </div>
                            <div style="width: 4%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: black;">
                                    <transition name="slide-fade" mode="out-in" class="livenow">
                                    </transition>
                                </div>
                            </div>
                            <div class="detail_total" style="width: 31%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: black;">
                                    <div v-if="item1.awayT.on == 0"  class="detail" style="color: #212529;">
                                        {{item1.awayT.on}}
                                    </div>
                                    <div :key="item1.away_tooltip.onKey" :id="item1.away_tooltip.onKey"  v-if="item1.awayT.on > 0" class="detail" style="color: #212529;">
                                        {{item1.awayT.on}}
                                    </div>
                                    <b-tooltip v-if="item1.awayT.on > 0" :key="item1.away_tooltip.onKey + '1'" :target="item1.away_tooltip.onKey" triggers="hover">
                                        {{item1.away_tooltip.on}}
                                    </b-tooltip>

                                    <div v-if="item1.awayT.off == 0" class="detail" style="color: #212529">
                                        {{item1.awayT.off}}
                                    </div>
                                    <div :key="item1.away_tooltip.offKey" :id="item1.away_tooltip.offKey"  v-if="item1.awayT.off > 0" class="detail" style="color: #212529;">
                                        {{item1.awayT.off}}
                                    </div>
                                    <b-tooltip v-if="item1.awayT.off > 0" :key="item1.away_tooltip.offKey + '1'" :target="item1.away_tooltip.offKey" triggers="hover">
                                        {{item1.away_tooltip.off}}
                                    </b-tooltip>

                                    <div :key="item1.away_tooltip.blkKey" :id="item1.away_tooltip.blkKey"  v-if="item1.awayT.blk > 0" class="detail" style="color: #212529;">
                                        {{item1.awayT.blk}}
                                    </div>
                                    <b-tooltip v-if="item1.awayT.blk > 0" :key="item1.away_tooltip.blkKey + '1'" :target="item1.away_tooltip.blkKey" triggers="hover">
                                        {{item1.away_tooltip.blk}}
                                    </b-tooltip>

                                    <div v-if="item1.awayT.blk == 0 && item1.homeT.blk != 0" class="detail" style="color: #212529">
                                        {{item1.awayT.blk}}
                                    </div>

                                    <div v-if="item1.awayT.blk == null || (item1.awayT.blk == 0 && item1.homeT.blk == 0)" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.in == 0" class="detail" style="color: #212529">
                                        {{item1.awayT.in}}
                                    </div>
                                    <div :key="item1.away_tooltip.inKey" :id="item1.away_tooltip.inKey"  v-if="item1.awayT.in > 0" class="detail" style="color: #212529;">
                                        {{item1.awayT.in}}
                                    </div>
                                    <b-tooltip v-if="item1.awayT.in > 0" :key="item1.away_tooltip.inKey + '1'" :target="item1.away_tooltip.inKey" triggers="hover">
                                        {{item1.away_tooltip.in}}
                                    </b-tooltip>

                                    <div v-if="item1.awayT.in == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.out == 0" class="detail" style="color: #212529">
                                        {{item1.awayT.out}}
                                    </div>
                                    <div :key="item1.away_tooltip.outKey" :id="item1.away_tooltip.outKey"  v-if="item1.awayT.out > 0" class="detail" style="color: #212529;">
                                        {{item1.awayT.out}}
                                    </div>
                                    <b-tooltip v-if="item1.awayT.out > 0" :key="item1.away_tooltip.outKey + '1'" :target="item1.away_tooltip.outKey" triggers="hover">
                                        {{item1.away_tooltip.out}}
                                    </b-tooltip>

                                    <div v-if="item1.awayT.out == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.cnr == 0" class="detail" style="color: #212529">
                                        {{item1.awayT.cnr}}
                                    </div>
                                    <div :key="item1.away_tooltip.cnrKey" :id="item1.away_tooltip.cnrKey"  v-if="item1.awayT.cnr > 0" class="detail" style="color: #212529;">
                                        {{item1.awayT.cnr}}
                                    </div>
                                    <b-tooltip v-if="item1.awayT.cnr > 0" :key="item1.away_tooltip.cnrKey + '1'" :target="item1.away_tooltip.cnrKey" triggers="hover">
                                        {{item1.away_tooltip.cnr}}
                                    </b-tooltip>

                                    <div v-if="item1.awayT.cnr == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.da == 0" class="detail" style="color: #212529">
                                        {{item1.awayT.da}}
                                    </div>

                                    <div v-if="item1.awayT.da > 0" class="detail" style="color: #212529">
                                        {{item1.awayT.da}}
                                    </div>

                                    <div v-if="item1.awayT.poss == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.poss == 0" class="detail" style="color: #212529">
                                        0
                                    </div>

                                    <div v-if="item1.awayT.poss != 0 && item1.awayT.poss != null" class="detail" style="color: #212529">
                                        {{item1.awayT.poss}}
                                    </div>

                                    <div v-if="item1.awayT.red == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.red == 0" class="detail" style="color: #212529">
                                        0
                                    </div>

                                    <div v-if="item1.awayT.red > 0" class="detail" :id="item1.away_tooltip.redKey" style="color: #212529; background-color: red;">
                                        {{item1.awayT.red}}
                                    </div>

                                    <b-tooltip v-if="item1.awayT.red > 0" :target="item1.away_tooltip.redKey" triggers="hover">
                                        {{item1.away_tooltip.red}}
                                    </b-tooltip>

                                    <div v-if="item1.awayT.yel == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.yel == 0" class="detail" style="color: #212529">
                                        0
                                    </div>

                                    <div v-if="item1.awayT.yel > 0" class="detail" :id="item1.away_tooltip.yelKey" style="color: #212529">
                                        {{item1.awayT.yel}}
                                    </div>

                                    <b-tooltip v-if="item1.awayT.yel > 0" :target="item1.away_tooltip.yelKey" triggers="hover">
                                        {{item1.away_tooltip.yel}}
                                    </b-tooltip>

                                    <div v-if="item1.awayT.sbst == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.sbst == 0" class="detail" style="color: #212529">
                                        0
                                    </div>

                                    <div v-if="item1.awayT.sbst > 0" class="detail" :id="item1.away_tooltip.sbstKey" style="color: #212529">
                                        {{item1.awayT.sbst}}
                                    </div>

                                    <b-tooltip v-if="item1.awayT.sbst > 0" :target="item1.away_tooltip.sbstKey" triggers="hover">
                                        {{item1.away_tooltip.sbst}}
                                    </b-tooltip>
                                    <div class="detail" style="color: #212529; min-width: 37px; font-weight: bold">
                                        {{item1.awayT.nxt}}
                                    </div>
                                    <div class="detail" style="color: #212529; font-weight: bold">
                                        {{item1.awayT.rtg}}
                                    </div>
                                </div>
                            </div>
                            <div class="detail_total" style="width: 26%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: black;">
                                    <div v-if="item1.away.on > 0" class="detail1" :style="{'color': item1.away1.on}">
                                        {{item1.away.on}}
                                    </div>
                                    <div v-if="item1.away.on == 0" class="detail1" :style="{'color': item1.away1.on}">
                                        0
                                    </div>
                                    <div v-if="item1.away.on != 0 && item1.away.on == null" class="detail1" :style="{'color': item1.away1.on}">
                                        -
                                    </div>

                                    <div v-if="item1.away.off > 0" class="detail1" :style="{'color': item1.away1.off}">
                                        {{item1.away.off}}
                                    </div>
                                    <div v-if="item1.away.off == 0" class="detail1" :style="{'color': item1.away1.off}">
                                        {{item1.away.off}}
                                    </div>
                                    <div v-if="item1.away.off != 0 && item1.away.off == null" class="detail1" :style="{'color': item1.away1.off}">
                                        -
                                    </div>

                                    <div v-if="item1.away.blk > 0" class="detail1" :style="{'color': item1.away1.blk}">
                                        {{item1.away.blk}}
                                    </div>
                                    <div v-if="(item1.away.blk == 0 && item1.home.blk != 0)" class="detail1" :style="{'color': item1.away1.blk}">
                                        {{item1.away.blk}}
                                    </div>
                                    <div v-if="(item1.away.blk == 0 && item1.home.blk == 0)" class="detail1" :style="{'color': item1.away1.blk}">
                                        -
                                    </div>
                                    <div v-if="item1.away.blk != 0 && item1.away.blk == null" class="detail1" :style="{'color': item1.away1.blk}">
                                        -
                                    </div>

                                    <div v-if="item1.away.in > 0" class="detail1" :style="{'color': item1.away1.in}">
                                        {{item1.away.in}}
                                    </div>
                                    <div v-if="item1.away.in == 0" class="detail1" :style="{'color': item1.away1.in}">
                                        {{item1.away.in}}
                                    </div>
                                    <div v-if="item1.away.in != 0 && item1.away.in == null" class="detail1" :style="{'color': item1.away1.in}">
                                        -
                                    </div>

                                    <div v-if="item1.away.out > 0" class="detail1" :style="{'color': item1.away1.out}">
                                        {{item1.away.out}}
                                    </div>
                                    <div v-if="item1.away.out == 0" class="detail1" :style="{'color': item1.away1.out}">
                                        {{item1.away.out}}
                                    </div>
                                    <div v-if="item1.away.out != 0 && item1.away.out == null" class="detail1" :style="{'color': item1.away1.out}">
                                        -
                                    </div>

                                    <div v-if="item1.away.cnr > 0 || item1.away.cnr < 0" class="detail1" :style="{'color': item1.away1.cnr}">
                                        {{item1.away.cnr}}
                                    </div>
                                    <div v-if="item1.away.cnr == 0" class="detail1" :style="{'color': item1.away1.cnr}">
                                        {{item1.away.cnr}}
                                    </div>
                                    <div v-if="item1.away.cnr != 0 && item1.away.cnr == null" class="detail1" :style="{'color': item1.away1.cnr}">
                                        -
                                    </div>

                                    <div v-if="item1.away.da > 0 || item1.away.da < 0" class="detail1" :style="{'color': item1.away1.da}">
                                        {{item1.away.da}}
                                    </div>
                                    <div v-if="item1.away.da == 0" class="detail1" :style="{'color': item1.away1.da}">
                                        {{item1.away.da}}
                                    </div>
                                    <div v-if="item1.away.da != 0 && item1.away.da == null" class="detail1" :style="{'color': item1.away1.da}">
                                        -
                                    </div>

                                    <div v-if="item1.away.poss > 0 || item1.away.poss < 0" class="detail1" :style="{'color': item1.away1.poss}">
                                        {{item1.away.poss}}
                                    </div>
                                    <div v-if="item1.away.poss == 0" class="detail1" :style="{'color': item1.away1.poss}">
                                        0
                                    </div>
                                    <div v-if="item1.away.poss != 0 && item1.away.poss == null" class="detail1" :style="{'color': item1.away1.poss}">
                                        -
                                    </div>

                                    <div v-if="item1.away.sbst > 0 || item1.away.sbst < 0" class="detail1" style="color: black">
                                        {{item1.away.sbst}}
                                    </div>
                                    <div v-if="item1.away.sbst == 0" class="detail1" style="color: black">
                                        {{item1.away.sbst}}
                                    </div>
                                    <div v-if="item1.away.sbst != 0 && item1.away.sbst == null" class="detail1" style="color: black">
                                        -
                                    </div>

                                    <div v-if="item1.away.goal > 0 || item1.away.goal < 0" class="detail1" style="color: black; min-width: 36px;">
                                        {{item1.away.goal}}
                                    </div>
                                    <div v-if="item1.away.goal == 0" class="detail1" style="color: black; min-width: 36px;">
                                        {{item1.away.goal}}
                                    </div>
                                    <div v-if="item1.away.goal != 0 && item1.away.goal == null" class="detail1" style="color: black;  min-width: 36px;">
                                        -
                                    </div>

                                    <div v-if="item1.away.rtg > item1.away.a_rtg" class="detail1" style="color: #263043; font-weight: bold; background: #d4edda; height: 31px;">
                                        {{item1.away.rtg}}
                                    </div>
                                    <div v-else class="detail1" style="color: #263043; font-weight: bold; height: 31px;">
                                        {{item1.away.rtg}}
                                    </div>
                                </div>
                            </div>
                            <div style="width: 20%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: white;">
                                    ...
                                </div>
                            </div>
                            
                            <!--  home team data part  last 10 minutes-->
                        </div>
                    </div>
                    <div style="clear: left; width: 100%; border: 1px solid lightgray; text-align: center; height: 30px;padding-top: 5px; margin-top: 20px; background: #e6eef5">
                        <div style="width: 250px; margin: auto;">
                            <label style="float:left; font-weight: bold; margin-right: 10px;">Last Updated: </label> <div style="float: left; background: #17a2b8; color: white; width: 60px; text-align: center; font-weight: bold;">{{last_updated_time}}</div>
                        </div>
                    </div>

                    <CCol sm="4" style = "position:fixed; bottom: 0;">
                        <CButton
                            color="info"
                            class="m-2 save_match_data"
                            @click="save_live"
                        >
                            Save to My Game
                        </CButton>

                    </CCol>
                </CTab>
                
                <CTab @click.native="finished_tab()" :title="'Finished Games('+finishedLength+')'">
                    <div v-for="item in finishedArray" class="finished-tab">
                        <div v-if="item.events.length > 0 && item.league"  class="header" style="width: 65%; height: 50px;">
                            <div class="header-content" style="width: 30%; height: 50px; float: left; text-align: left;">
                                {{item.league}}
                            </div>
                            <div class="header-content" style="width: 55%; height: 50px; float: left; border-left: 1px solid whitesmoke">
                                Total Game
                                <div style="width: 100%">
                                    <div class="detail">
                                        On
                                    </div>
                                    <div class="detail">
                                        Off
                                    </div>
                                    <div class="detail">
                                        Blk
                                    </div>
                                    <div class="detail">
                                        In
                                    </div>
                                    <div class="detail">
                                        Out
                                    </div>
                                    <div class="detail">
                                        Cnr
                                    </div>
                                    <div class="detail">
                                        DA
                                    </div>
                                    <div class="detail">
                                        Poss
                                    </div>
                                    <div class="detail">
                                        Red
                                    </div>
                                    <div class="detail">
                                        Yel
                                    </div>
                                    <div class="detail">
                                        Sbst
                                    </div>
                                    <div class="detail" style="min-width: 37px;">
                                        NXT%
                                    </div>
                                    <div class="detail" style="width: 4%;">
                                        PFM
                                    </div>
                                </div>
                            </div>
                            <div class="header-content" style="width: 15%; height: 50px; float: left; border-left: 1px solid whitesmoke">
                                <p style="text-align: center;">Cards</p>
                                <img src="/img/box-yellow.png" width="20px;" style="position: relative; top: -15px; left: -10px;"/>
                                <img src="/img/box-red.png" width="20px;" style="position: relative; top: -15px; left: 10px"/>
                            </div>
                        </div>
                        <div v-for="item1 in item.events" class="content" style="width: 65%; height: 62px; font-weight: 600;">
                            <!--                             home team data part  -->

                            <div style="width: 30%; height: 31px; float: left;">
                                <div style="width: 40px; float: left;position: relative; top:  16px; left: 15px; font-size: 17px; font-weight: normal">{{item1.status}}</div>
                                <div style="width: calc(100% - 70px); float: left;">{{item1.home_name}}</div>
                                <img v-b-modal.modal-center src="/img/info_icon.png" @click="callHistoricalData(item1.home.id, item1.away.id, item1.season_id, item1.main_data.home_name + ' v ' + item1.main_data.away_name, item1.home.rtg, item1.home.a_rtg, item1.away.rtg, item1.away.a_rtg, item1.main_data._id)" width="13px;" style="width: 20px; cursor: pointer; outline: none; position: relative; top: 18px; left: -36px"/>
                            </div>
                            <div style="width: 55%; height: 31px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: #212529;">
                                    <div v-if="item1.homeT.on == 0" class="detail" style="color: #212529;">
                                        0
                                    </div>
                                    <div :key="item1.home_tooltip.onKey" :id="item1.home_tooltip.onKey"  v-if="item1.homeT.on > 0" class="detail" style="color: #212529;">
                                        {{item1.homeT.on}}
                                    </div>
                                    <b-tooltip v-if="item1.home_tooltip.on != ''" :key="item1.home_tooltip.onKey + '1'" :target="item1.home_tooltip.onKey" triggers="hover">
                                        {{item1.home_tooltip.on}}
                                    </b-tooltip>

                                    <div v-if="item1.homeT.off == 0" class="detail" style="color: #212529">
                                        {{item1.homeT.off}}
                                    </div>
                                    <div :key="item1.home_tooltip.offKey" :id="item1.home_tooltip.offKey"  v-if="item1.homeT.off > 0" class="detail" style="color: #212529;">
                                        {{item1.homeT.off}}
                                    </div>
                                    <b-tooltip v-if="item1.home_tooltip.off != ''" :key="item1.home_tooltip.offKey + '1'" :target="item1.home_tooltip.offKey" triggers="hover">
                                        {{item1.home_tooltip.off}}
                                    </b-tooltip>
                                    <div :key="item1.home_tooltip.blkKey" :id="item1.home_tooltip.blkKey"  v-if="item1.homeT.blk > 0" class="detail" style="color: #212529;">
                                        {{item1.homeT.blk}}
                                    </div>
                                    <b-tooltip v-if="item1.home_tooltip.blk != ''" :key="item1.home_tooltip.blkKey + '1'" :target="item1.home_tooltip.blkKey" triggers="hover">
                                        {{item1.home_tooltip.blk}}
                                    </b-tooltip>

                                    <div v-if="item1.homeT.blk == 0 && item1.awayT.blk != 0" class="detail" style="color: #212529">
                                        {{item1.homeT.blk}}
                                    </div>
                                    <div v-if="item1.homeT.blk == null || (item1.homeT.blk == 0 && item1.awayT.blk == 0)" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.in == 0" class="detail" style="color: #212529">
                                        {{item1.homeT.in}}
                                    </div>
                                    <div :key="item1.home_tooltip.inKey" :id="item1.home_tooltip.inKey"  v-if="item1.homeT.in > 0" class="detail" style="color: #212529;">
                                        {{item1.homeT.in}}
                                    </div>
                                    <b-tooltip v-if="item1.home_tooltip.in != ''" :key="item1.home_tooltip.inKey + '1'" :target="item1.home_tooltip.inKey" triggers="hover">
                                        {{item1.home_tooltip.in}}
                                    </b-tooltip>
                                    <div v-if="item1.homeT.in == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.out == 0" class="detail" style="color: #212529">
                                        {{item1.homeT.out}}
                                    </div>
                                    <div :key="item1.home_tooltip.outKey" :id="item1.home_tooltip.outKey"  v-if="item1.homeT.out > 0" class="detail" style="color: #212529;">
                                        {{item1.homeT.out}}
                                    </div>
                                    <b-tooltip v-if="item1.home_tooltip.out != ''" :key="item1.home_tooltip.outKey + '1'" :target="item1.home_tooltip.outKey" triggers="hover">
                                        {{item1.home_tooltip.out}}
                                    </b-tooltip>
                                    <div v-if="item1.homeT.out == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.cnr == 0" class="detail" style="color: #212529">
                                        {{item1.homeT.cnr}}
                                    </div>
                                    <div :key="item1.home_tooltip.cnrKey" :id="item1.home_tooltip.cnrKey"  v-if="item1.homeT.cnr > 0" class="detail" style="color: #212529;">
                                        {{item1.homeT.cnr}}
                                    </div>
                                    <b-tooltip v-if="item1.home_tooltip.cnr != ''" :key="item1.home_tooltip.cnrKey + '1'" :target="item1.home_tooltip.cnrKey" triggers="hover">
                                        {{item1.home_tooltip.cnr}}
                                    </b-tooltip>

                                    <div v-if="item1.homeT.cnr == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.da == 0" class="detail" style="color: #212529">
                                        {{item1.homeT.da}}
                                    </div>
                                    <div v-if="item1.homeT.da > 0" class="detail" style="color: #212529">
                                        {{item1.homeT.da}}
                                    </div>
                                    <div v-if="item1.homeT.poss == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.poss == 0" class="detail" style="color: #212529">
                                        {{item1.homeT.poss}}
                                    </div>
                                    <div v-if="item1.homeT.poss != 0 && item1.homeT.poss != null" class="detail" style="color: #212529">
                                        {{item1.homeT.poss}}
                                    </div>
                                    <div v-if="item1.homeT.red == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.red == 0" class="detail" style="color: #212529">
                                        0
                                    </div>
                                    <div v-if="item1.homeT.red != 0 && item1.homeT.red != null" class="detail" style="color: #212529">
                                        {{item1.homeT.red}}
                                    </div>
                                    <div v-if="item1.homeT.yel == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.yel == 0" class="detail" style="color: #212529">
                                        0
                                    </div>
                                    <div v-if="item1.homeT.yel != 0 && item1.homeT.yel != null" class="detail" style="color: #212529">
                                        {{item1.homeT.yel}}
                                    </div>
                                    <div v-if="item1.homeT.sbst == null" class="detail" style="color: #212529">
                                        -
                                    </div>
                                    <div v-if="item1.homeT.sbst == 0" class="detail" style="color: #212529">
                                        0
                                    </div>
                                    <div v-if="item1.homeT.sbst != 0 && item1.homeT.sbst != null" class="detail" style="color: #212529">
                                        {{item1.homeT.sbst}}
                                    </div>
                                    <div class="detail" style="color: #212529; min-width: 37px; font-weight: bold">
                                        {{item1.homeT.nxt}}
                                    </div>
                                    <div class="detail" style="color: #212529; font-weight: bold">
                                        {{item1.homeT.rtg}}
                                    </div>
                                </div>
                            </div>
                            <div style="width: 15%; height: 31px; float: left; border-left: 1px solid #e2e2e2; border-right: 1px solid #e2e2e2; padding: 0px 10px; text-align: center;">
                                <div class="detail" style="width: 50%; position: relative; left: -4px;">{{item1.homeT.yel}}</div>
                                <div class="detail" style="width: 50%; position: relative; left: 3px;">{{item1.homeT.red}}</div>
                            </div>
                            <!--                             away team data part  -->
                            <div style="width: 30%; height: 31px; float: left; border-bottom: 1px solid lightgray">
                                <div style="width: 40px; float: left; color: white;">.</div>
                                <div style="width: calc(100% - 70px); float: left;">{{item1.away_name}}</div>
                                <!--                                <div style="width: 30px; float: left; font-size: 17px; font-weight: 600; position: relative; top: -12px; left: -10px;">{{item1.home_score}} - {{item1.away_score}}</div>-->
                                <div :key="item1.goalKey" v-c-tooltip="item1.goal_tooltip" class="detail" style="color: red; position: relative; top: -12px; left: -10px; font-size: 18px;">
                                    {{item1.home_score}} - {{item1.away_score}}
                                </div>
                            </div>
                            <div style="width: 55%; height: 31px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray">
                                <div style="width: 100%; padding: 3px 7px; color: black;">
                                    <div v-if="item1.awayT.on == 0"  class="detail" style="color: #212529;">
                                        {{item1.awayT.on}}
                                    </div>
                                    <div :key="item1.away_tooltip.onKey" :id="item1.away_tooltip.onKey"  v-if="item1.awayT.on > 0" class="detail" style="color: #212529;">
                                        {{item1.awayT.on}}
                                    </div>
                                    <b-tooltip v-if="item1.away_tooltip.on != ''" :key="item1.away_tooltip.onKey + '1'" :target="item1.away_tooltip.onKey" triggers="hover">
                                        {{item1.away_tooltip.on}}
                                    </b-tooltip>

                                    <div v-if="item1.awayT.off == 0" class="detail" style="color: #212529">
                                        {{item1.awayT.off}}
                                    </div>
                                    <div :key="item1.away_tooltip.offKey" :id="item1.away_tooltip.offKey"  v-if="item1.awayT.off > 0" class="detail" style="color: #212529;">
                                        {{item1.awayT.off}}
                                    </div>
                                    <b-tooltip v-if="item1.away_tooltip.off != ''" :key="item1.away_tooltip.offKey + '1'" :target="item1.away_tooltip.offKey" triggers="hover">
                                        {{item1.away_tooltip.off}}
                                    </b-tooltip>

                                    <div :key="item1.away_tooltip.blkKey" :id="item1.away_tooltip.blkKey"  v-if="item1.awayT.blk > 0" class="detail" style="color: #212529;">
                                        {{item1.awayT.blk}}
                                    </div>
                                    <b-tooltip v-if="item1.away_tooltip.blk != ''" :key="item1.away_tooltip.blkKey + '1'" :target="item1.away_tooltip.blkKey" triggers="hover">
                                        {{item1.away_tooltip.blk}}
                                    </b-tooltip>

                                    <div v-if="item1.awayT.blk == 0 && item1.homeT.blk != 0" class="detail" style="color: #212529">
                                        {{item1.awayT.blk}}
                                    </div>

                                    <div v-if="item1.awayT.blk == null || (item1.awayT.blk == 0 && item1.homeT.blk == 0)" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.in == 0" class="detail" style="color: #212529">
                                        {{item1.awayT.in}}
                                    </div>
                                    <div :key="item1.away_tooltip.inKey" :id="item1.away_tooltip.inKey"  v-if="item1.awayT.in > 0" class="detail" style="color: #212529;">
                                        {{item1.awayT.in}}
                                    </div>
                                    <b-tooltip v-if="item1.away_tooltip.in != ''" :key="item1.away_tooltip.inKey + '1'" :target="item1.away_tooltip.inKey" triggers="hover">
                                        {{item1.away_tooltip.in}}
                                    </b-tooltip>

                                    <div v-if="item1.awayT.in == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.out == 0" class="detail" style="color: #212529">
                                        {{item1.awayT.out}}
                                    </div>
                                    <div :key="item1.away_tooltip.outKey" :id="item1.away_tooltip.outKey"  v-if="item1.awayT.out > 0" class="detail" style="color: #212529;">
                                        {{item1.awayT.out}}
                                    </div>
                                    <b-tooltip v-if="item1.away_tooltip.out != ''" :key="item1.away_tooltip.outKey + '1'" :target="item1.away_tooltip.outKey" triggers="hover">
                                        {{item1.away_tooltip.out}}
                                    </b-tooltip>

                                    <div v-if="item1.awayT.out == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.cnr == 0" class="detail" style="color: #212529">
                                        {{item1.awayT.cnr}}
                                    </div>
                                    <div :key="item1.away_tooltip.cnrKey" :id="item1.away_tooltip.cnrKey"  v-if="item1.awayT.cnr > 0" class="detail" style="color: #212529;">
                                        {{item1.awayT.cnr}}
                                    </div>
                                    <b-tooltip v-if="item1.away_tooltip.cnr != ''" :key="item1.away_tooltip.cnrKey + '1'" :target="item1.away_tooltip.cnrKey" triggers="hover">
                                        {{item1.away_tooltip.cnr}}
                                    </b-tooltip>

                                    <div v-if="item1.awayT.cnr == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.da == 0" class="detail" style="color: #212529">
                                        {{item1.awayT.da}}
                                    </div>

                                    <div v-if="item1.awayT.da > 0" class="detail" style="color: #212529">
                                        {{item1.awayT.da}}
                                    </div>

                                    <div v-if="item1.awayT.poss == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.poss == 0" class="detail" style="color: #212529">
                                        0
                                    </div>

                                    <div v-if="item1.awayT.poss != 0 && item1.awayT.poss != null" class="detail" style="color: #212529">
                                        {{item1.awayT.poss}}
                                    </div>

                                    <div v-if="item1.awayT.red == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.red == 0" class="detail" style="color: #212529">
                                        0
                                    </div>

                                    <div v-if="item1.awayT.red > 0" class="detail" style="color: #212529">
                                        {{item1.awayT.red}}
                                    </div>

                                    <div v-if="item1.awayT.yel == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.yel == 0" class="detail" style="color: #212529">
                                        0
                                    </div>

                                    <div v-if="item1.awayT.yel > 0" class="detail" style="color: #212529">
                                        {{item1.awayT.yel}}
                                    </div>

                                    <div v-if="item1.awayT.sbst == null" class="detail" style="color: #212529">
                                        -
                                    </div>

                                    <div v-if="item1.awayT.sbst == 0" class="detail" style="color: #212529">
                                        0
                                    </div>

                                    <div v-if="item1.awayT.sbst > 0" class="detail" style="color: #212529">
                                        {{item1.awayT.sbst}}
                                    </div>
                                    <div class="detail" style="color: #212529; min-width: 37px; font-weight: bold">
                                        {{item1.awayT.nxt}}
                                    </div>
                                    <div class="detail" style="color: #212529; font-weight: bold">
                                        {{item1.awayT.rtg}}
                                    </div>
                                </div>
                            </div>
                            <div style="width: 15%; height: 31px; float: left; border-left: 1px solid #e2e2e2; border-right: 1px solid #e2e2e2; padding: 0px 10px; text-align: center; border-bottom: 1px solid lightgray">
                                <div class="detail" style="width: 50%; position: relative; left: -4px;">{{item1.awayT.yel}}</div>
                                <div class="detail" style="width: 50%; position: relative; left: 3px;">{{item1.awayT.red}}</div>
                            </div>
                        </div>
                    </div>
                </CTab>
                <CTab  @click.native="mygames_tab()" :title="'My Games(' + mygamesnumber + ')'">
                    <mygames ref="mygames_ref" v-on:update_mygames="update_mygamesnumber"></mygames>
                </CTab>

            </CTabs>
            <b-modal id="modal-center" centered :title="historicModalData.eventName">
                <div v-if="!isload" style="height: 10px;">
                    <b-progress :value="current_counter" :max="counter" animated></b-progress>
                </div>
                <div v-else>
                    <CTabs variant="tabs" :active-tab="0">
                        <CTab title="Historical Stats">
                            <div class="header" style="width: 100%; height: 50px;">
                                <div class="header-content" style="text-align: center; padding-top: 20px; width: 5%; height: 50px; float: left; background: #8db4e2; border-left: 1px solid #ffffff;">
                                    P
                                </div>
                                <div class="header-content detail_total" style="width: 95%; height: 50px; float: left; border-left: 1px solid #ffffff; background: #8db4e2; font-weight: bold; font-size: 13px!important;">
                                    Avg Stats Per Game
                                    <div class="season-part" style="width: 100%">
                                        <div class="detail season-detail" style="min-width: 30px!important; width: 6.5%!important">
                                            Goals
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 4.5%!important">
                                            On
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important;">
                                            Off
                                        </div>
                                        <div class="detail season-detail">
                                            Blk
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 4.5%!important">
                                            In
                                        </div>
                                        <div class="detail season-detail">
                                            Out
                                        </div>
                                        <div class="detail season-detail">
                                            Cnr
                                        </div>
                                        <div class="detail season-detail">
                                            DA
                                        </div>
                                        <div class="detail season-detail" style="min-width: 30px;">
                                            Pos
                                        </div>
                                        <div class="detail season-detail">
                                            Pas
                                        </div>
                                        <div class="detail season-detail">
                                            Acc
                                        </div>
                                        <div class="detail season-detail">
                                            Atk
                                        </div>
                                        <div class="detail season-detail">
                                            Ofs
                                        </div>
                                        <div class="detail season-detail">
                                            Sav
                                        </div>
                                        <div class="detail season-detail">
                                            Sbst
                                        </div>
                                        <div class="detail season-detail">
                                            Fou
                                        </div>
                                        <div class="detail season-detail" style="min-width: 30px!important; width: 6.5%!important">
                                            G_att
                                        </div>
                                        <div class="detail season-detail">
                                            Safe
                                        </div>
                                        <div class="detail season-detail">
                                            Rtg
                                        </div>
                                    </div>
                                </div>
                                <div style="width: 5%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid #e2e2e2;">
                                    <div style="text-align: center;">{{historicModalData.home_p}}</div>
                                </div>
                                <div class="detail_total season-stats-part" style="width: 95%; height: 30px; float: left; border: 1px solid #e2e2e2; border-top: none;">
                                    <div style="width: 100%; padding: 3px 7px; color: black;">
                                        <div v-if="historicModalData.home_season.goals == 0" class="detail season-detail"  style="color: red; min-width: 45px!important;">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.goals == null" class="detail season-detail" style="min-width: 45px!important;">
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.goals != 0 && historicModalData.home_season.goals != null" class="detail season-detail" style="color: green; min-width: 45px!important;">
                                            {{(historicModalData.home_season.goals/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.on == 0" class="detail season-detail" style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.on == null" class="detail season-detail" style="color: red">
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.on != null && historicModalData.home_season.on != 0" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.on/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.off == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.off == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.off != 0 && historicModalData.home_season.off != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.off/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.blk == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.blk == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.blk != 0 && historicModalData.home_season.blk != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.blk/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.in == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.in == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.in != 0 && historicModalData.home_season.in != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.in/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.out == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.out == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.out != 0 && historicModalData.home_season.out != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.out/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.cnr == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.cnr == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.cnr != 0 && historicModalData.home_season.cnr != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.cnr/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.da == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.da == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.da != 0 && historicModalData.home_season.da != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.da/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.pos == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.pos == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.pos != 0 && historicModalData.home_season.pos != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.pos/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.pas == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.pas == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.pas != 0 && historicModalData.home_season.pas != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.pas/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.acc == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.acc == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.acc != 0 && historicModalData.home_season.acc != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.acc/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.atk == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.atk == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.atk != 0 && historicModalData.home_season.atk != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.atk/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.ofs == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.ofs == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.ofs != 0 && historicModalData.home_season.ofs != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.ofs/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.sav == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.sav == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.sav != 0 && historicModalData.home_season.sav != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.sav/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.sbst == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.sbst == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.sbst != 0 && historicModalData.home_season.sav != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.sbst/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.fou == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.fou == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.fou != 0 && historicModalData.home_season.sav != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.fou/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.g_att == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.g_att == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.g_att != 0 && historicModalData.home_season.g_att != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.g_att/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.home_season.safe == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.home_season.safe == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.home_season.safe != 0 && historicModalData.home_season.safe != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.home_season.safe/historicModalData.home_p).toFixed(1)}}
                                        </div>

                                        <div class="detail season-detail" style="color: #263043; font-weight: bold;">
                                            {{(historicModalData.home_a_rtg).toFixed(0)}}
                                        </div>
                                    </div>
                                </div>
                                <div style="width: 5%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid #e2e2e2;">
                                    <div style="text-align: center;">{{historicModalData.away_p}}</div>
                                </div>
                                <div class="detail_total season-stats-part" style="width: 95%; height: 30px; float: left; border: 1px solid #e2e2e2; border-top: none;">
                                    <div style="width: 100%; padding: 3px 7px; color: black;">
                                        <div v-if="historicModalData.away_season.goals == 0" class="detail season-detail"  style="color: red; min-width: 45px!important;">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.goals == null" class="detail season-detail" style="min-width: 45px!important;">
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.goals != 0 && historicModalData.away_season.goals != null" class="detail season-detail" style="color: green; min-width: 45px!important;">
                                            {{(historicModalData.away_season.goals/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.on == 0" class="detail season-detail" style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.on == null" class="detail season-detail" style="color: red">
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.on != null && historicModalData.away_season.on != 0" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.on/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.off == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.off == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.off != 0 && historicModalData.away_season.off != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.off/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.blk == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.blk == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.blk != 0 && historicModalData.away_season.blk != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.blk/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.in == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.in == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.in != 0 && historicModalData.away_season.in != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.in/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.out == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.out == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.out != 0 && historicModalData.away_season.out != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.out/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.cnr == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.cnr == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.cnr != 0 && historicModalData.away_season.cnr != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.cnr/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.da == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.da == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.da != 0 && historicModalData.away_season.da != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.da/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.pos == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.pos == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.pos != 0 && historicModalData.away_season.pos != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.pos/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.pas == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.pas == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.pas != 0 && historicModalData.away_season.pas != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.pas/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.acc == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.acc == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.acc != 0 && historicModalData.away_season.acc != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.acc/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.atk == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.atk == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.atk != 0 && historicModalData.away_season.atk != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.atk/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.ofs == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.ofs == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.ofs != 0 && historicModalData.away_season.ofs != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.ofs/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.sav == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.sav == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.sav != 0 && historicModalData.away_season.sav != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.sav/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.sbst == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.sbst == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.sbst != 0 && historicModalData.away_season.sav != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.sbst/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.fou == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.fou == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.fou != 0 && historicModalData.away_season.sav != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.fou/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.g_att == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.g_att == null" class="detail season-detail" >
                                            -
                                        </div>

                                        <div v-if="historicModalData.away_season.g_att != 0 && historicModalData.away_season.g_att != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.g_att/historicModalData.away_p).toFixed(1)}}
                                        </div>

                                        <div v-if="historicModalData.away_season.safe == 0" class="detail season-detail"  style="color: red">
                                            0
                                        </div>

                                        <div v-if="historicModalData.away_season.safe == null" class="detail season-detail" >
                                            -
                                        </div>
                                        <div  v-if="historicModalData.away_season.safe != 0 && historicModalData.away_season.safe != null" class="detail season-detail" style="color: green">
                                            {{(historicModalData.away_season.safe/historicModalData.away_p).toFixed(1)}}
                                        </div>
                                        <div class="detail season-detail" style="color: #263043; font-weight: bold;">
                                            {{(historicModalData.away_a_rtg).toFixed(0)}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CTab>
                        <CTab title="Chart">
                            <Plotly :data="data" :layout="layout" :display-mode-bar="true"></Plotly>
                        </CTab>
                        <CTab title="Odds">
                            <div class="header" style="width: 100%; height: 50px;">
                                
                                <div class="header-content detail_total" style="width: 95%; height: 50px; float: left; border-left: 1px solid #ffffff; background: #8db4e2; font-weight: bold; font-size: 13px!important;">
                                    Odds
                                    <div class="season-part" style="width: 100%">
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            H
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            D
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            A
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            O-0.5
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            U-0.5
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            O-1.5
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            U-1.5
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            O-2.5
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            U-2.5
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            O-3.5
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            U-3.5
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 7.5%!important">
                                            O-0.5(ht)
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 7.5%!important">
                                            U-0.5(ht)
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            BTS(yes)
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            BTS(no)
                                        </div>
                                        
                                    </div>
                                </div>
                                
                                <div class="detail_total season-stats-part" style="width: 95%; height: 30px; float: left; border: 1px solid #e2e2e2; border-top: none;">
                                    <div style="width: 100%; padding: 3px 7px; color: black;">
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            {{this.flatodds.h_win}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                           {{this.flatodds.d_win}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                           {{this.flatodds.a_win}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            {{this.flatodds.o_05}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                           {{this.flatodds.u_05}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            {{this.flatodds.o_15}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            {{this.flatodds.u_15}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            {{this.flatodds.o_25}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            {{this.flatodds.u_25}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            {{this.flatodds.o_35}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            {{this.flatodds.u_35}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 7.5%!important">
                                           {{this.flatodds.o_05_ht}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 7.5%!important">
                                            {{this.flatodds.u_05_ht}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            {{this.flatodds.bts_yes}}
                                        </div>
                                        <div class="detail season-detail" style="min-width: 20px!important; width: 6.5%!important">
                                            {{this.flatodds.bts_no}}
                                        </div>
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </CTab>
                    </CTabs>
                </div>
            </b-modal>
        </CCard>
    </div>
</template>

<script>
    console.log('----------------------- this is very bad')
    import { Plotly } from 'vue-plotly'
    import swal from "sweetalert2";
    import mygames from './mygames.vue'
    const io = require("socket.io-client")
    export default {
        name: 'LiveStatsNew',
        components: {
            Plotly,
            mygames
        },
        data () {
            return {
                finished_tab_clicked: false,
                scheduled_tab_clicked: false,
                user_scheduled_ids: [],
                user_live_ids: [],
                socket: undefined,
                isload: false,
                counter: 50,
                current_counter: 0,
                eventArray:[],
                scheduleArray:[],
                scheduleArray1:[],
                liveNumbers: 0,
                mygamesnumber: 0,
                liveDataArray:[],
                scheduleLength:0,
                finishedArray:[],
                finishedLength:0,
                collapsed1:[],
                flatodds: {
                    "h_win": "-",
                    "a_win": "-",
                    "d_win": "-",
                    "o_05": "-",
                    "o_15": "-",
                    "o_25": "-",
                    "o_35": "-",
                    "u_05": "-",
                    "u_15": "-",
                    "u_25": "-",
                    "u_35": "-",
                    "o_05_ht": "-",
                    "u_05_ht": "-",
                    "bts_yes": "-",
                    "bts_no": "-"
                },
                historicModalData:{
                    "eventName": "",
                    "home_season": {
                        'on': 0,
                        'off': 0,
                        'block': 0,
                        'in': 0,
                        'out': 0,
                        'cnr': 0,
                        'da': 0,
                        'pos': 0,
                        'pas': 0,
                        'acc': 0,
                        'atk': 0,
                        'ofs': 0,
                        'sav': 0,
                        'sbst': 0,
                        'fou': 0 ,
                        'g_att': 0 ,
                        'safe': 0,
                        'goals':0
                    },
                    "away_season": {
                        'on': 0,
                        'off': 0,
                        'block': 0,
                        'in': 0,
                        'out': 0,
                        'cnr': 0,
                        'da': 0,
                        'pos': 0,
                        'pas': 0,
                        'acc': 0,
                        'atk': 0,
                        'ofs': 0,
                        'sav': 0,
                        'sbst': 0,
                        'fou': 0 ,
                        'g_att': 0 ,
                        'safe': 0,
                        'goals': 0
                    },
                    "home_p": 1,
                    "away_p": 1,
                    "home_rtg": 0,
                    "home_a_rtg": 0,
                    "away_rtg": 0,
                    "away_a_rtg": 0
                },
                data:[
                    {
                        x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                        y: [10,15,13,17,10,15,13,17,10,15,13,17],
                        type:"bar",
                        name: '-',
                        showarrow: false,
                        marker: {
                            color: 'rgba(244,66,66, 1)',
                            line: {
                                color: 'rgb(244,66,66)',
                                width: 1
                            }
                        }
                    },
                    {
                        x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                        y: [-10,-15,-13,-17,10,15,13,17,10,15,13,17],
                        type:"bar",
                        name: '-',
                        yaxis: 'y2',
                        showarrow: false,
                        marker: {
                            color: 'rgba(65,149,244,1)',
                            line: {
                                color: 'rgb(65,149,244)',
                                width: 1
                            }
                        }
                    },
                ],
                layout:{
                    title: "",
                    xaxis:{
                        "title": {
                            "text": 'Time',
                            "font": {
                                "size": 18,
                                "color": '#263043',
                                "weight": "bold"
                            }
                        },
                    },
                    yaxis: {
                        'showgrid': false,
                        'zeroline': false,
                        'visible': false
                    },
                    yaxis2: {
                        "title": {
                            "text": 'RTG',
                            "font": {
                                "size": 18,
                                "color": '#263043',
                                "weight": "bold"
                            }
                        },
                        "overlaying": 'y',
                        "matches": 'y',
                        "tickfont" : {
                            "color" : 'white'
                        },
                        // 'showgrid': true,
                        // 'zeroline': false,
                        // 'visible': false
                        // "autorange": 'reversed',
                    },
                    showlegend: true,
                    barmode: 'relative',
                    showarrow: false
                },
                refreshIndex: 0,
                background_row:[
                    'white',
                    '#f2f2f2'
                ],
                sort_by: [
                    {"value": 1, "label": "Sort By League"},
                    {"value": 2, "label": "Sort By Time"}
                ],
                last_updated_time: null,
                sort: 0,
                reload_flag: false,
                live_load_flag: false,
                league5yearsStats: []
            }
        },
        methods: {
            get_trueodds_value(odds, stat) {
                var true_odd = 100 / stat;
                var value = ( (odds - 1) * 100 / (true_odd - 1) ) - 100
                return [true_odd, value]
            },
            
            checkscheduleParent(e, index){
                const { checked } = e.target;
                const _childs = this.scheduleArray[index]['events'];
                if(!_childs.length) return;
                for(var i = 0; i < _childs.length; i++){
                    var _child = _childs[i];
                    if (!checked) {
                        if ( this.user_scheduled_ids.includes(_child._id) ) {
                            this.user_scheduled_ids = this.user_scheduled_ids.filter(function(ele){ 
                                return ele != _child._id; 
                            });
                        }
                    }
                    else {
                        if ( !this.user_scheduled_ids.includes(_child._id) ) {
                            this.user_scheduled_ids.push(_child._id);                            
                        }
                    }
                }
            },
            checkliveParent(e, index){
                const { checked } = e.target;
                const _childs = this.eventArray[index]['events'];
                if(!_childs.length) return;
                for(var i = 0; i < _childs.length; i++){
                    var _child = _childs[i];
                    if (!checked) {
                        if ( this.user_live_ids.includes(_child.main_data._id) ) {
                            this.user_live_ids = this.user_live_ids.filter(function(ele){ 
                                return ele != _child.main_data._id; 
                            });
                        }
                    }
                    else {
                        if ( !this.user_live_ids.includes(_child.main_data._id) ) {
                            this.user_live_ids.push(_child.main_data._id);                            
                        }
                    }
                }
            },
            showModal() {
                this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
            },
            hideModal() {
                this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
            },

            update_mygamesnumber(val) {
                console.log('number_of_games', val)
                this.mygamesnumber = val;
            },
            
            mygames_tab() {

                this.$refs.mygames_ref.readData()
            },
            save_scheduled() {
                var user_id = localStorage.getItem("user_id");
                console.log('user_id', user_id)
                if (user_id == 'undefined') {
                    console.log('---- user id not found ---');
                    swal.fire("Alert!", "User not specified", "error");
                    return;
                }
                else {
                    console.log('---- user id  found ---');
                    
                }
                if (this.user_scheduled_ids.length == 0) {
                    swal.fire("Alert!", "No events selected", "error");
                    return;
                }
                var post_data = {
                    "user_id": user_id,
                    "event_ids": this.user_scheduled_ids
                }

                window.axios.post(`${process.env.VUE_APP_URL}save_scheduled`, post_data).then(({data}) => {
                    console.log(data.message);
                    swal.fire("Success!", "Data saved successfully", "success");
                    
                    this.mygames_tab();
                })
            },

            save_live() {
                var user_id = localStorage.getItem("user_id");
                console.log('user_id', user_id)
                if (user_id == 'undefined') {
                    console.log('---- user id not found ---');
                    swal.fire("Alert!", "User not specified", "error");
                    return;
                }
                else {
                    console.log('---- user id  found ---');                   
                    
                }
                if (this.user_live_ids.length == 0) {
                    swal.fire("Alert!", "No events selected", "error");
                    return;
                }
                var post_data = {
                    "user_id": user_id,
                    "event_ids": this.user_live_ids
                }

                window.axios.post(`${process.env.VUE_APP_URL}save_scheduled`, post_data).then(({data}) => {
                    console.log(data.message);
                    swal.fire("Success!", "Data saved successfully", "success");
                    
                    this.mygames_tab();
                })
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
            isCollapsed1(id){
                return this.collapsed1.indexOf(id)>-1?true:false;
            },
            SetCollapse1(id){
                if (this.isCollapsed1(id)){
                    this.collapsed1.splice(this.collapsed1.indexOf(id), 1)
                }
                else{
                    this.collapsed1.push(id)
                }
            },
            isPlus(id){
                return this.collapsed1.indexOf(id)>-1?false:true;
            },
            isMinus(id){
                return this.collapsed1.indexOf(id)>-1?true:false;
            },
            frame() {
                if (this.current_counter >= 45) {
                    this.current_counter = 45
                    clearInterval(this.clock);
                } else {
                    this.current_counter++;
                }
            },
            frame1() {
                //this.readData()
                //this.mygames_tab()

            },
            scheduled_tab(){
                if (!this.scheduled_tab_clicked)
                    this.showModal();
                var user_id = localStorage.getItem("user_id");
                var post_data = {
                    "user_id": user_id
                }
                window.axios.post(`${process.env.VUE_APP_URL}getLiveStatsNew_scheduled`, post_data).then(({data})=> {
                    if (!this.scheduled_tab_clicked)
                        this.hideModal();
                    this.scheduled_tab_clicked = true;
                    console.log('scheduled tab====>', data.data[0])
                    let eventList = data.data[0]
                    let probList = data.data[1]
                    let probData = {};
                    for (let i = 0; i < probList.length; i++) {
                        probData[probList[i].league_id.toString()] = probList[i].oddslines;
                    }
                    let competitionArray1 = []
                    let competitionArrayCount = 0
                    for(let i = 0 ; i < eventList.length; i++){
                        if (eventList[i].competitions.length && eventList[i].competitions[0].league) {
                            let competitionName = eventList[i].competitions[0].league
                            competitionArray1[competitionArrayCount++] = competitionName
                        }
                    }
                    competitionArray1 = Array.from(new Set (competitionArray1))
                    this.scheduleArray = []
                    this.scheduleArray1 = []
                    this.scheduleLength = 0
                    for(let j = 0 ; j < competitionArray1.length ; j++){
                        this.scheduleArray.push({'id': this.create_UUID(), 'league': competitionArray1[j].split("(")[1].split(")")[0] + " - " + competitionArray1[j].split("(")[0], 'events': []})
                        this.scheduleArray1.push({'id': this.create_UUID(), 'league': competitionArray1[j].split("(")[1].split(")")[0] + " - " + competitionArray1[j].split("(")[0], 'events': []})
                        for(let k = 0 ;  k < eventList.length ; k++){
                            if(eventList[k].competitions.length && eventList[k].competitions[0].league == competitionArray1[j] && eventList[k].time.status == 'NS'){
                                this.scheduleLength++
                                let current_main_data = {
                                    
                                    "competitionId": eventList[k].competitionId,
                                    "competitions": eventList[k].competitions,
                                    "scores": eventList[k].scores,
                                    "stats": eventList[k].stats,
                                    "time": eventList[k].time,
                                    "localTeamName": eventList[k].localTeamName,
                                    "visitorTeamName": eventList[k].visitorTeamName,
                                    "_id": eventList[k]._id,
                                    "marketId_matched": null,
                                    "marketId_o_u": null,
                                    "match_1": null,
                                    "match_2": null,
                                    "match_3": null,
                                    "match_O": null,
                                    "match_U": null,

                                    "prob_home": null,
                                    "prob_draw": null,
                                    "prob_away": null,
                                    "prob_over05": null,
                                    "prob_over15": null,
                                    "prob_over25": null,
                                    "prob_over35": null,
                                    "prob_bts": null,
                                    "prob_over05_ht": null,

                                    "prob_under05": null,
                                    "prob_under15": null,
                                    "prob_under25": null,
                                    "prob_under35": null,
                                    "prob_bts_no": null,
                                    "prob_under05_ht": null,

                                    "odds_home": null,
                                    "odds_draw": null,
                                    "odds_away": null,
                                    "odds_over05": null,
                                    "odds_over15": null,
                                    "odds_over25": null,
                                    "odds_over35": null,
                                    "odds_bts_yes": null,
                                    "odds_over05_ht": null,

                                    "odds_under05": null,
                                    "odds_under15": null,
                                    "odds_under25": null,
                                    "odds_under35": null,
                                    "odds_bts_no": null,
                                    "odds_under05_ht": null,

                                }

                                var home_odds = 100;
                                var away_odds = 100;
                                var draw_odds = 100;

                                var event_odds_list = []

                                if (eventList[k].DailyFixtures.length != 0) {
                                    eventList[k].DailyFixtures[0].flatOdds.data.forEach((oItem) => {
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
                                                        current_main_data.match_1 = parseFloat(item.value)
                                                        home_odds = parseFloat(item.value)
                                                    }
                                                    else if(label == 'Away - FT') {
                                                        current_main_data.match_2 = parseFloat(item.value)
                                                        away_odds = parseFloat(item.value)
                                                    }
                                                    else if(label == 'Draw - FT') {
                                                        current_main_data.match_3 = parseFloat(item.value)
                                                        draw_odds = parseFloat(item.value)
                                                    }

                                                    else if(label == "Over - 0.5 - FT")
                                                        current_main_data.odds_over05 = parseFloat(item.value)
                                                    else if(label == "Over - 1.5 - FT")
                                                        current_main_data.odds_over15 = parseFloat(item.value)
                                                    else if(label == "Over - 2.5 - FT")
                                                        current_main_data.odds_over25 = parseFloat(item.value)
                                                    else if(label == "Over - 3.5 - FT")
                                                        current_main_data.odds_over35 = parseFloat(item.value)

                                                    else if(label == "Under - 0.5 - FT")
                                                        current_main_data.odds_under05 = parseFloat(item.value)
                                                    else if(label == "Under - 1.5 - FT")
                                                        current_main_data.odds_under15 = parseFloat(item.value)
                                                    else if(label == "Under - 2.5 - FT")
                                                        current_main_data.odds_under25 = parseFloat(item.value)
                                                    else if(label == "Under - 3.5 - FT")
                                                        current_main_data.odds_under35 = parseFloat(item.value)

                                                    else if(label == "BTS - FT")
                                                        current_main_data.odds_bts_yes = parseFloat(item.value)
                                                    else if(label == "No BTS - FT")
                                                        current_main_data.odds_bts_no = parseFloat(item.value)

                                                    else if(label == "Over - 0.5 - HT")
                                                        current_main_data.odds_over05_ht = parseFloat(item.value)
                                                    else if(label == "Under - 0.5 - HT")
                                                        current_main_data.odds_under05_ht = parseFloat(item.value)

                                                    // event_odds_list.push({
                                                    //     label: `${label} - ${suffix}`,
                                                    //     value: `${label} - ${suffix}`.trim(),
                                                    //     odd: parseFloat(item.value)
                                                    // });
                                                }
                                            });
                                        }
                                    });
                                    
                                
                                }

                                console.log('event_odds_list', event_odds_list)

                                // if(current_main_data.Odds.length > 0){
                                //     for(let b = 0 ; b < current_main_data.Odds.length; b++){
                                //         if(current_main_data.Odds[b].marketType === "MATCH_ODDS"){
                                //             current_main_data.marketId_matched = current_main_data.Odds[b].marketId
                                //             if(current_main_data.Odds[b].runners[0]){
                                //                 let runnerNode = current_main_data.Odds[b].runners[0]
                                //                 if(runnerNode.exchange){
                                //                     if(runnerNode.exchange.availableToBack){
                                //                         if(runnerNode.exchange.availableToBack[0]){
                                //                             current_main_data.match_1 = runnerNode.exchange.availableToBack[0].price
                                //                             home_odds = parseFloat(runnerNode.exchange.availableToBack[0].price)
                                //                         }
                                //                     }
                                //                 }
                                //             }
                                //             if(current_main_data.Odds[b].runners[1]){
                                //                 let runnerNode1 = current_main_data.Odds[b].runners[1]
                                //                 if(runnerNode1.exchange){
                                //                     if(runnerNode1.exchange.availableToBack){
                                //                         if(runnerNode1.exchange.availableToBack[0]){
                                //                             current_main_data.match_2 = runnerNode1.exchange.availableToBack[0].price
                                //                             away_odds = parseFloat(runnerNode1.exchange.availableToBack[0].price)
                                //                         }
                                //                     }
                                //                 }
                                //             }
                                //             if(current_main_data.Odds[b].runners[2]){
                                //                 let runnerNode2 = current_main_data.Odds[b].runners[2]
                                //                 if(runnerNode2.exchange){
                                //                     if(runnerNode2.exchange.availableToBack){
                                //                         if(runnerNode2.exchange.availableToBack[0]){
                                //                             current_main_data.match_3 = runnerNode2.exchange.availableToBack[0].price
                                //                             draw_odds = parseFloat(runnerNode2.exchange.availableToBack[0].price)
                                //                         }
                                //                     }
                                //                 }
                                //             }
                                //         }
                                //         else{
                                //             current_main_data.marketId_o_u = current_main_data.Odds[b].marketId
                                //             if(current_main_data.Odds[b].runners[0]){
                                //                 let runnerNode = current_main_data.Odds[b].runners[0]
                                //                 if(runnerNode.exchange){
                                //                     if(runnerNode.exchange.availableToBack){
                                //                         if(runnerNode.exchange.availableToBack[0]){
                                //                             current_main_data.match_O = runnerNode.exchange.availableToBack[0].price
                                //                         }
                                //                     }
                                //                 }
                                //             }
                                //             if(current_main_data.Odds[b].runners[1]){
                                //                 let runnerNode1 = current_main_data.Odds[b].runners[1]
                                //                 if(runnerNode1.exchange){
                                //                     if(runnerNode1.exchange.availableToBack){
                                //                         if(runnerNode1.exchange.availableToBack[0]){
                                //                             current_main_data.match_U = runnerNode1.exchange.availableToBack[0].price
                                //                         }
                                //                     }
                                //                 }
                                //             }
                                //         }
                                //     }
                                // }

                                var oddslines = probData[eventList[k].leagueId.toString()];

                                var odds = null;
                                if (home_odds <= 3 && away_odds <= 3) {
                                    odds = oddslines[3]
                                }
                                else if (home_odds <= 1.5) {
                                    odds = oddslines[0]
                                }
                                else if (home_odds > 1.5 && home_odds <= 2) {
                                    odds = oddslines[1]
                                }
                                else if (home_odds > 2 && home_odds <= 3) {
                                    odds = oddslines[2]
                                }
                                
                                else if (away_odds <= 1.5) {
                                    odds = oddslines[4]
                                }
                                else if (away_odds > 1.5 && away_odds <= 2) {
                                    odds = oddslines[5]
                                }
                                else if (away_odds > 2 && away_odds <= 3) {
                                    odds = oddslines[6]
                                }

                                if (odds) {
                                    current_main_data.prob_home = parseInt(odds.home_win_percent)
                                    current_main_data.prob_draw = parseInt(odds.draw_win_percent)
                                    current_main_data.prob_away = parseInt(odds.away_win_percent)
                                    current_main_data.prob_over05 = parseInt(odds.full_05_percent)
                                    current_main_data.prob_over15 = parseInt(odds.full_15_percent)
                                    current_main_data.prob_over25 = parseInt(odds.full_25_percent)
                                    current_main_data.prob_over35 = parseInt(odds.full_35_percent)
                                    current_main_data.prob_bts = parseInt(odds.bts_percent)
                                    current_main_data.prob_over05_ht = parseInt(odds.first_05_percent)

                                    current_main_data.prob_under05 = 100 - parseInt(odds.full_05_percent)
                                    current_main_data.prob_under15 = 100 - parseInt(odds.full_15_percent)
                                    current_main_data.prob_under25 = 100 - parseInt(odds.full_25_percent)
                                    current_main_data.prob_under35 = 100 - parseInt(odds.full_35_percent)

                                    current_main_data.prob_bts_no = 100 - parseInt(odds.bts_percent)
                                    current_main_data.prob_under05_ht = 100 - parseInt(odds.first_05_percent)


                                }
                                this.scheduleArray[j].events.push(current_main_data)
                                this.scheduleArray1[j].events.push(current_main_data)


                            }
                        }
                    }
                    let self = this
                    this.sortJSON(self.scheduleArray,'league', '123')
                    if(this.sort === 1){
                        this.sort_filter(2)
                    }
                })
            },
            finished_tab(){
                if (!this.finished_tab_clicked)
                    this.showModal();

                window.axios.post(`${process.env.VUE_APP_URL}getLiveStatsNew_finished`).then(({data})=> {
                    if (!this.finished_tab_clicked)
                        this.hideModal();
                    this.finished_tab_clicked = true;
                    console.log('finished_events=====>', data.data[0])
                    let main_data = data.data[0]
                    let competitionArray = []
                    let competitionArrayCount = 0
                    for(let i = 0 ; i < main_data.length; i++){
                        if (main_data[i].competitions.length && main_data[i].competitions[0].league) {
                            let competitionName = main_data[i].competitions[0].league
                            competitionArray[competitionArrayCount++] = competitionName
                        }
                    }
                    competitionArray = Array.from(new Set (competitionArray))
                    this.finishedArray = []
                    // this.finishedLength = 0
                    // for(let j = 0 ; j < competitionArray1.length ; j++){
                    //     this.finishedArray.push({'league': competitionArray1[j].split("(")[1].split(")")[0] + " - " + competitionArray1[j].split("(")[0], 'events': []})
                    //     for(let k = 0 ;  k < eventList.length ; k++){
                    //         if(eventList[k].competitions.length && eventList[k].competitions[0].league == competitionArray1[j] && (eventList[k].time.status == 'FT' || eventList[k].time.status == 'FT_PEN' || eventList[k].time.status == 'AET')){
                    //             this.finishedLength++
                    //             this.finishedArray[j].events.push(eventList[k])
                    //         }
                    //     }
                    // }
                    for(let i = 0 ; i < competitionArray.length ; i++){
                        this.finishedArray.push({'league': competitionArray[i].split("(")[1].split(")")[0] + " - " + competitionArray[i].split("(")[0], 'events': []})
                        for(let j = 0 ; j < main_data.length ; j++) {
                            let current_main_data = main_data[j]
                            if(current_main_data.stats.length > 0 && current_main_data.competitions.length){
                                if(current_main_data.competitions[0].league == competitionArray[i]){
                                    let home = {
                                        'id': 0,
                                        'on': null,
                                        'off': null,
                                        'blk': null,
                                        'in': null,
                                        'out': null,
                                        'cnr': null,
                                        'da': null,
                                        'goal': null,
                                        'rtg': 0,
                                        'gdr':0,
                                        'time': '',
                                        'score': 0,
                                        'flash': 0,
                                        'poss': null,
                                        'pas': 0,
                                        'acc': 0,
                                        'atk': 0,
                                        'ofs': 0,
                                        'sav': 0,
                                        'sbst': null,
                                        'red': 0,
                                        'fou': 0,
                                        'g_att': 0,
                                        'safe': 0,
                                        'last_on': 0,
                                        'last_off': 0,
                                        'last_cnr': 0,
                                        'last_da': 0,
                                        'last_goal': 0,
                                        'a_rtg': 14
                                    }
                                    let homeT = {
                                        'on': 0,
                                        'off': 0,
                                        'blk': 0,
                                        'in': 0,
                                        'out': 0,
                                        'cnr': 0,
                                        'da': 0,
                                        'poss': 0,
                                        'flash': 0,
                                        'pas': 0,
                                        'acc': 0,
                                        'atk': 0,
                                        'ofs': 0,
                                        'sav': 0,
                                        'sbst': 0,
                                        'red': 0,
                                        'yel': 0,
                                        'fou': 0,
                                        'g_att': 0,
                                        'safe': 0,
                                        'nxt': 0,
                                        'rtg': 0,
                                    }
                                    let away = {
                                        'id': 0,
                                        'on': null,
                                        'off': null,
                                        'blk': null,
                                        'in': null,
                                        'out': null,
                                        'cnr': null,
                                        'da': null,
                                        'goal': null,
                                        'rtg': 0,
                                        'gdr': 0,
                                        'time': 0,
                                        'score': 0,
                                        'poss': null,
                                        'pas': 0,
                                        'acc': 0,
                                        'atk': 0,
                                        'ofs': 0,
                                        'sav': 0,
                                        'sbst': null,
                                        'red': 0,
                                        'fou': 0,
                                        'g_att': 0,
                                        'safe': 0,
                                        'last_on': 0,
                                        'last_off': 0,
                                        'last_cnr': 0,
                                        'last_da': 0,
                                        'last_goal': 0,
                                        'a_rtg': 14
                                    }
                                    let awayT = {
                                        'on': 0,
                                        'off': 0,
                                        'blk': 0,
                                        'in': 0,
                                        'out': 0,
                                        'cnr': 0,
                                        'da': 0,
                                        'poss': 0,
                                        'pas': 0,
                                        'acc': 0,
                                        'atk': 0,
                                        'ofs': 0,
                                        'sav': 0,
                                        'sbst': 0,
                                        'red': 0,
                                        'yel': 0,
                                        'fou': 0,
                                        'g_att': 0,
                                        'safe': 0,
                                        'nxt': 0,
                                        'rtg': 0
                                    }
                                    let home_season = {
                                        'on': 0,
                                        'off': 0,
                                        'block': 0,
                                        'in': 0,
                                        'out': 0,
                                        'cnr': 0,
                                        'da': 0,
                                        'pos': 0,
                                        'pas': 0,
                                        'acc': 0,
                                        'atk': 0,
                                        'ofs': 0,
                                        'sav': 0,
                                        'sbst': 0,
                                        'fou': 0 ,
                                        'g_att': 0 ,
                                        'safe': 0,
                                        'goals':0
                                    }
                                    let away_season = {
                                        'on': 0,
                                        'off': 0,
                                        'block': 0,
                                        'in': 0,
                                        'out': 0,
                                        'cnr': 0,
                                        'da': 0,
                                        'pos': 0,
                                        'pas': 0,
                                        'acc': 0,
                                        'atk': 0,
                                        'ofs': 0,
                                        'sav': 0,
                                        'sbst': 0,
                                        'fou': 0 ,
                                        'g_att': 0 ,
                                        'safe': 0,
                                        'goals': 0
                                    }
                                    let home_p = 0
                                    let away_p = 0
                                    let fixture_id = current_main_data._id

                                    let home_rtg_stats = current_main_data.home_rtg_stats
                                    let away_rtg_stats = current_main_data.away_rtg_stats
                                   
                                    let half_extra_time = 0

                                    if(home_rtg_stats){
                                        for(let c = 0; c < home_rtg_stats.length; c++){
                                            let minute = home_rtg_stats[c].time.minute
                                            let home_rtg = {
                                                'on': null,
                                                'off': null,
                                                'cnr': null,
                                                'da': null,
                                                'goal': null,
                                                'rtg': null
                                            }

                                            if(home_rtg_stats[c].time.extra_time != null){
                                                minute = home_rtg_stats[c].time.minute + home_rtg_stats[c].time.extra_time
                                                if(home_rtg_stats[c].time.minute < 46){
                                                    half_extra_time = home_rtg_stats[c].time.extra_time
                                                }
                                            }
                                            if(home_rtg_stats[c].time.minute > 45){
                                                minute = minute + half_extra_time
                                            }
                                            

                                            if(c <= 10){
                                                if(home_rtg_stats[c].shots != null){
                                                    home_rtg.on = home_rtg_stats[c].shots.ongoal
                                                    home_rtg.off = home_rtg_stats[c].shots.offgoal
                                                }
                                                if(home_rtg_stats[c].da != null){
                                                    home_rtg.da = home_rtg_stats[c].da.dangerous_attacks
                                                }
                                                home_rtg.cnr = home_rtg_stats[c].cnr
                                                home_rtg.goal = home_rtg_stats[c].goals
                                            }
                                            else{
                                                if(home_rtg_stats[c - 10].shots != null){
                                                    home_rtg.on = home_rtg_stats[c].shots.ongoal - home_rtg_stats[c - 10].shots.ongoal
                                                    home_rtg.off = home_rtg_stats[c].shots.offgoal - home_rtg_stats[c - 10].shots.offgoal
                                                }
                                                if(home_rtg_stats[c - 10].da != null){
                                                    home_rtg.da = home_rtg_stats[c].da.dangerous_attacks - home_rtg_stats[c - 10].da.dangerous_attacks
                                                }
                                                home_rtg.cnr = home_rtg_stats[c].cnr - home_rtg_stats[c - 10].cnr
                                                home_rtg.goal = home_rtg_stats[c].goals - home_rtg_stats[c - 10].goals
                                            }

                                            if((home_rtg.on >= 0) || (home_rtg.off >= 0) || (home_rtg.cnr >= 0) || (home_rtg.da > 0)){
                                                home_rtg.rtg = 0
                                                if(home_rtg.on >= 0){
                                                    home_rtg.rtg = home_rtg.rtg + home_rtg.on*3
                                                }
                                                if(home_rtg.off >= 0){
                                                    home_rtg.rtg = home_rtg.rtg + home_rtg.off*2
                                                }
                                                if(home_rtg.cnr >= 0){
                                                    home_rtg.rtg = home_rtg.rtg + home_rtg.cnr
                                                }
                                                if(home_rtg.da >= 0){
                                                    home_rtg.rtg = home_rtg.rtg + home_rtg.da
                                                }
                                            }
                                            else{
                                                home_rtg.rtg = '-'
                                            }
                                            
                                        }
                                    }
                                    if(away_rtg_stats){
                                        for(let c = 0; c < away_rtg_stats.length; c++){
                                            let home_rtg = {
                                                'on': null,
                                                'off': null,
                                                'cnr': null,
                                                'da': null,
                                                'goal': null,
                                                'rtg': null
                                            }
                                            if(c <= 10){
                                                if(away_rtg_stats[c].shots != null){
                                                    home_rtg.on = away_rtg_stats[c].shots.ongoal
                                                    home_rtg.off = away_rtg_stats[c].shots.offgoal
                                                }
                                                if(away_rtg_stats[c].da != null){
                                                    home_rtg.da = away_rtg_stats[c].da.dangerous_attacks
                                                }
                                                home_rtg.cnr = away_rtg_stats[c].cnr
                                                home_rtg.goal = away_rtg_stats[c].goals
                                            }
                                            else{
                                                if(away_rtg_stats[c - 10].shots != null){
                                                    home_rtg.on = away_rtg_stats[c].shots.ongoal - away_rtg_stats[c - 10].shots.ongoal
                                                    home_rtg.off = away_rtg_stats[c].shots.offgoal - away_rtg_stats[c - 10].shots.offgoal
                                                }
                                                if(away_rtg_stats[c - 10].da != null){
                                                    home_rtg.da = away_rtg_stats[c].da.dangerous_attacks - away_rtg_stats[c - 10].da.dangerous_attacks
                                                }
                                                home_rtg.cnr = away_rtg_stats[c].cnr - away_rtg_stats[c - 10].cnr
                                                home_rtg.goal = away_rtg_stats[c].goals - away_rtg_stats[c - 10].goals
                                            }

                                            if((home_rtg.on >= 0) || (home_rtg.off >= 0) || (home_rtg.cnr >= 0) || (home_rtg.da > 0)){
                                                home_rtg.rtg = 0
                                                if(home_rtg.on >= 0){
                                                    home_rtg.rtg = home_rtg.rtg + home_rtg.on*3
                                                }
                                                if(home_rtg.off >= 0){
                                                    home_rtg.rtg = home_rtg.rtg + home_rtg.off*2
                                                }
                                                if(home_rtg.cnr >= 0){
                                                    home_rtg.rtg = home_rtg.rtg + home_rtg.cnr
                                                }
                                                if(home_rtg.da >= 0){
                                                    home_rtg.rtg = home_rtg.rtg + home_rtg.da
                                                }
                                            }
                                            else{
                                                home_rtg.rtg = '-'
                                            }
                                            
                                        }
                                    }
                                    home.id = current_main_data.home_id
                                    away.id = current_main_data.away_id
                                    home.score = current_main_data.scores.localteam_score
                                    away.score = current_main_data.scores.visitorteam_score
                                    let home_goal = current_main_data.scores.localteam_score
                                    let away_goal = current_main_data.scores.visitorteam_score
                                    let goal_tooltip = ''
                                    if(current_main_data.goal_tooltip){
                                        goal_tooltip = current_main_data.goal_tooltip
                                    }
                                    let home_tip_array = {
                                        'on': '',
                                        'off': '',
                                        'in': '',
                                        'out': '',
                                        'blk': '',
                                        'cnr': '',
                                        'onKey': this.create_UUID(),
                                        'offKey': this.create_UUID(),
                                        'inKey': this.create_UUID(),
                                        'outKey': this.create_UUID(),
                                        'blkKey': this.create_UUID(),
                                        'cnrKey': this.create_UUID()
                                    }
                                    let away_tip_array = {
                                        'on': '',
                                        'off': '',
                                        'in': '',
                                        'out': '',
                                        'blk': '',
                                        'cnr': '',
                                        'onKey': this.create_UUID(),
                                        'offKey': this.create_UUID(),
                                        'inKey': this.create_UUID(),
                                        'outKey': this.create_UUID(),
                                        'blkKey': this.create_UUID(),
                                        'cnrKey': this.create_UUID()
                                    }
                                    if(current_main_data.home_tip_shots){
                                        for(let n = 0 ; n < current_main_data.home_tip_shots.length - 1 ; n++){
                                            if(current_main_data.home_tip_shots[n].shots != null){
                                                if(n === 0 && current_main_data.home_tip_shots[n].shots.ongoal != 0 && current_main_data.home_tip_shots[n].shots.ongoal != null){
                                                    let time = current_main_data.home_tip_shots[n].time.minute
                                                    if(current_main_data.home_tip_shots[n].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.home_tip_shots[n].time.extra_time + "'"
                                                    }
                                                    home_tip_array.on = home_tip_array.on + " " + time
                                                }
                                                else{
                                                    let time = current_main_data.home_tip_shots[n + 1].time.minute
                                                    if(current_main_data.home_tip_shots[n + 1].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.home_tip_shots[n + 1].time.extra_time + "'"
                                                    }
                                                    if(current_main_data.home_tip_shots[n + 1].shots.ongoal >= 0 && current_main_data.home_tip_shots[n].shots.ongoal === null){
                                                        current_main_data.home_tip_shots[n].shots.ongoal = 0
                                                    }
                                                    let check1 = current_main_data.home_tip_shots[n + 1].shots.ongoal - current_main_data.home_tip_shots[n].shots.ongoal
                                                    let check2 = 0
                                                    if(n >= 1){
                                                        if(current_main_data.home_tip_shots[n].shots.ongoal >= 0 && current_main_data.home_tip_shots[n - 1].shots.ongoal === null){
                                                            current_main_data.home_tip_shots[n - 1].shots.ongoal = 0
                                                        }
                                                        check2 = current_main_data.home_tip_shots[n].shots.ongoal - current_main_data.home_tip_shots[n - 1].shots.ongoal
                                                    }
                                                    if(check1 < 0){
                                                        current_main_data.home_tip_shots[n + 1].shots.ongoal = current_main_data.home_tip_shots[n].shots.ongoal
                                                    }

                                                    if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                        home_tip_array.on = home_tip_array.on + " " + time
                                                    }
                                                    else if(check1 > 1 && check2 >= 0){
                                                        home_tip_array.on = home_tip_array.on + " " + time + "(" + check1 + ")"
                                                    }
                                                }

                                                if(n === 0 && current_main_data.home_tip_shots[n].shots.offgoal != 0 && current_main_data.home_tip_shots[n].shots.offgoal != null){
                                                    let time = current_main_data.home_tip_shots[n].time.minute
                                                    if(current_main_data.home_tip_shots[n].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.home_tip_shots[n].time.extra_time + "'"
                                                    }
                                                    home_tip_array.off = home_tip_array.off + " " + time
                                                }
                                                else{
                                                    let time = current_main_data.home_tip_shots[n + 1].time.minute
                                                    if(current_main_data.home_tip_shots[n + 1].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.home_tip_shots[n + 1].time.extra_time + "'"
                                                    }
                                                    if(current_main_data.home_tip_shots[n + 1].shots.offgoal >= 0 && current_main_data.home_tip_shots[n].shots.offgoal === null){
                                                        current_main_data.home_tip_shots[n].shots.offgoal = 0
                                                    }
                                                    let check1 = current_main_data.home_tip_shots[n + 1].shots.offgoal - current_main_data.home_tip_shots[n].shots.offgoal
                                                    let check2 = 0
                                                    if(n >= 1){
                                                        if(current_main_data.home_tip_shots[n].shots.offgoal >= 0 && current_main_data.home_tip_shots[n - 1].shots.offgoal === null){
                                                            current_main_data.home_tip_shots[n - 1].shots.offgoal = 0
                                                        }
                                                        check2 = current_main_data.home_tip_shots[n].shots.offgoal - current_main_data.home_tip_shots[n - 1].shots.offgoal
                                                    }
                                                    if(check1 < 0){
                                                        current_main_data.home_tip_shots[n + 1].shots.offgoal = current_main_data.home_tip_shots[n].shots.offgoal
                                                    }
                                                    if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                        home_tip_array.off = home_tip_array.off + " " + time
                                                    }
                                                    else if(check1 > 1 && check2 >= 0){
                                                        home_tip_array.off = home_tip_array.off + " " + time + "(" + check1 + ")"
                                                    }
                                                }

                                                if(n === 0 && current_main_data.home_tip_shots[n].shots.insidebox != 0 && current_main_data.home_tip_shots[n].shots.insidebox != null){
                                                    let time = current_main_data.home_tip_shots[n].time.minute
                                                    if(current_main_data.home_tip_shots[n].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.home_tip_shots[n].time.extra_time + "'"
                                                    }
                                                    home_tip_array.in = home_tip_array.in + " " + time
                                                }
                                                else{
                                                    let time = current_main_data.home_tip_shots[n + 1].time.minute
                                                    if(current_main_data.home_tip_shots[n + 1].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.home_tip_shots[n + 1].time.extra_time + "'"
                                                    }
                                                    if(current_main_data.home_tip_shots[n + 1].shots.insidebox >= 0 && current_main_data.home_tip_shots[n].shots.insidebox === null){
                                                        current_main_data.home_tip_shots[n].shots.insidebox = 0
                                                    }
                                                    let check1 = current_main_data.home_tip_shots[n + 1].shots.insidebox - current_main_data.home_tip_shots[n].shots.insidebox
                                                    let check2 = 0
                                                    if(n >= 1){
                                                        if(current_main_data.home_tip_shots[n].shots.insidebox >= 0 && current_main_data.home_tip_shots[n - 1].shots.insidebox === null){
                                                            current_main_data.home_tip_shots[n - 1].shots.insidebox = 0
                                                        }
                                                        check2 = current_main_data.home_tip_shots[n].shots.insidebox - current_main_data.home_tip_shots[n - 1].shots.insidebox
                                                    }
                                                    if(check1 < 0){
                                                        current_main_data.home_tip_shots[n + 1].shots.insidebox = current_main_data.home_tip_shots[n].shots.insidebox
                                                    }
                                                    if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                        home_tip_array.in = home_tip_array.in + " " + time
                                                    }
                                                    else if(check1 > 1 && check2 >= 0){
                                                        home_tip_array.in = home_tip_array.in + " " + time + "(" + check1 + ")"
                                                    }
                                                }

                                                if(n === 0 && current_main_data.home_tip_shots[n].shots.outsidebox != 0 && current_main_data.home_tip_shots[n].shots.outsidebox != null){
                                                    let time = current_main_data.home_tip_shots[n].time.minute
                                                    if(current_main_data.home_tip_shots[n].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.home_tip_shots[n].time.extra_time + "'"
                                                    }
                                                    home_tip_array.out = home_tip_array.out + " " + time
                                                }
                                                else{
                                                    let time = current_main_data.home_tip_shots[n + 1].time.minute
                                                    if(current_main_data.home_tip_shots[n + 1].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.home_tip_shots[n + 1].time.extra_time + "'"
                                                    }
                                                    if(current_main_data.home_tip_shots[n + 1].shots.outsidebox >= 0 && current_main_data.home_tip_shots[n].shots.outsidebox === null){
                                                        current_main_data.home_tip_shots[n].shots.outsidebox = 0
                                                    }
                                                    let check1 = current_main_data.home_tip_shots[n + 1].shots.outsidebox - current_main_data.home_tip_shots[n].shots.outsidebox
                                                    let check2 = 0
                                                    if(n >= 1){
                                                        if(current_main_data.home_tip_shots[n].shots.outsidebox >= 0 && current_main_data.home_tip_shots[n - 1].shots.outsidebox === null){
                                                            current_main_data.home_tip_shots[n - 1].shots.outsidebox = 0
                                                        }
                                                        check2 = current_main_data.home_tip_shots[n].shots.outsidebox - current_main_data.home_tip_shots[n - 1].shots.outsidebox
                                                    }
                                                    if(check1 < 0){
                                                        current_main_data.home_tip_shots[n + 1].shots.outsidebox = current_main_data.home_tip_shots[n].shots.outsidebox
                                                    }
                                                    if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                        home_tip_array.out = home_tip_array.out + " " + time
                                                    }
                                                    else if(check1 > 1 && check2 >= 0){
                                                        home_tip_array.out = home_tip_array.out + " " + time + "(" + check1 + ")"
                                                    }
                                                }

                                                if(n === 0 && current_main_data.home_tip_shots[n].shots.blocked != 0 && current_main_data.home_tip_shots[n].shots.blocked != null){
                                                    let time = current_main_data.home_tip_shots[n].time.minute
                                                    if(current_main_data.home_tip_shots[n].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.home_tip_shots[n].time.extra_time + "'"
                                                    }
                                                    home_tip_array.blk = home_tip_array.blk + " " + time
                                                }
                                                else{
                                                    let time = current_main_data.home_tip_shots[n + 1].time.minute
                                                    if(current_main_data.home_tip_shots[n + 1].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.home_tip_shots[n + 1].time.extra_time + "'"
                                                    }
                                                    if(current_main_data.home_tip_shots[n + 1].shots.blocked >= 0 && current_main_data.home_tip_shots[n].shots.blocked === null){
                                                        current_main_data.home_tip_shots[n].shots.blocked = 0
                                                    }
                                                    let check1 = current_main_data.home_tip_shots[n + 1].shots.blocked - current_main_data.home_tip_shots[n].shots.blocked

                                                    let check2 = 0
                                                    if(n >= 1){
                                                        if(current_main_data.home_tip_shots[n].shots.blocked >= 0 && current_main_data.home_tip_shots[n - 1].shots.blocked === null ){
                                                            current_main_data.home_tip_shots[n - 1].shots.blocked = 0
                                                        }
                                                        check2 = current_main_data.home_tip_shots[n].shots.blocked - current_main_data.home_tip_shots[n - 1].shots.blocked
                                                    }
                                                    if(check1 < 0){
                                                        current_main_data.home_tip_shots[n + 1].shots.blocked = current_main_data.home_tip_shots[n].shots.blocked
                                                    }
                                                    if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                        home_tip_array.blk = home_tip_array.blk + " " + time
                                                    }
                                                    else if(check1 > 1 && check2 >= 0){
                                                        home_tip_array.blk = home_tip_array.blk + " " + time + "(" + check1 + ")"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if(current_main_data.home_tip_cnr){
                                        for(let n = 0 ; n < current_main_data.home_tip_cnr.length - 1 ; n++){
                                            let time = current_main_data.home_tip_cnr[n].time.minute
                                            if(current_main_data.home_tip_shots[n].time.extra_time > 0){
                                                time = time + "+" + current_main_data.home_tip_cnr[n].time.extra_time + "'"
                                            }
                                            if(n === 0 && current_main_data.home_tip_cnr[n].shots != 0 && current_main_data.home_tip_cnr[n].shots != null){
                                                home_tip_array.cnr = home_tip_array.cnr + " " + time
                                            }
                                            else{
                                                if(current_main_data.home_tip_cnr[n + 1].shots >= 0 && current_main_data.home_tip_cnr[n].shots === null){
                                                    current_main_data.home_tip_cnr[n].shots = 0
                                                }
                                                let check1 = current_main_data.home_tip_cnr[n + 1].shots - current_main_data.home_tip_cnr[n].shots
                                                let check2 = 0
                                                if(n >= 1){
                                                    if(current_main_data.home_tip_cnr[n].shots >= 0 && current_main_data.home_tip_cnr[n - 1].shots === null){
                                                        current_main_data.home_tip_cnr[n - 1].shots = 0
                                                    }
                                                    check2 = current_main_data.home_tip_cnr[n].shots - current_main_data.home_tip_cnr[n - 1].shots
                                                }
                                                if(check1 < 0){
                                                    current_main_data.home_tip_cnr[n + 1].shots =  current_main_data.home_tip_cnr[n].shots
                                                }

                                                if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                    home_tip_array.cnr = home_tip_array.cnr + " " + time
                                                }
                                                else if(check1 > 1 && check2 >= 0){
                                                    home_tip_array.cnr = home_tip_array.cnr + " " + time + "(" + check1 + ")"
                                                }
                                            }
                                        }
                                    }
                                    if(current_main_data.away_tip_shots){
                                        for(let n = 0 ; n < current_main_data.away_tip_shots.length - 1 ; n++){
                                            if(current_main_data.away_tip_shots[n].shots != null){

                                                if(n === 0 && current_main_data.away_tip_shots[n].shots.ongoal != 0 && current_main_data.away_tip_shots[n].shots.ongoal != null){
                                                    let time = current_main_data.away_tip_shots[n].time.minute
                                                    if(current_main_data.away_tip_shots[n].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.away_tip_shots[n].time.extra_time + "'"
                                                    }
                                                    away_tip_array.on = away_tip_array.on + " " + time
                                                }
                                                else{
                                                    let time = current_main_data.away_tip_shots[n + 1].time.minute
                                                    if(current_main_data.away_tip_shots[n + 1].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.away_tip_shots[n + 1].time.extra_time + "'"
                                                    }
                                                    if(current_main_data.away_tip_shots[n + 1].shots.ongoal >= 0 && current_main_data.away_tip_shots[n].shots.ongoal === null){
                                                        current_main_data.away_tip_shots[n].shots.ongoal = 0
                                                    }
                                                    let check1 = current_main_data.away_tip_shots[n + 1].shots.ongoal - current_main_data.away_tip_shots[n].shots.ongoal
                                                    let check2 = 0
                                                    if(n >= 1){
                                                        if(current_main_data.away_tip_shots[n].shots.ongoal >= 0 && current_main_data.away_tip_shots[n - 1].shots.ongoal === null){
                                                            current_main_data.away_tip_shots[n - 1].shots.ongoal = 0
                                                        }
                                                        check2 = current_main_data.away_tip_shots[n].shots.ongoal - current_main_data.away_tip_shots[n - 1].shots.ongoal
                                                    }
                                                    if(check1 < 0){
                                                        current_main_data.away_tip_shots[n + 1].shots.ongoal = current_main_data.away_tip_shots[n].shots.ongoal
                                                    }
                                                    if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                        away_tip_array.on = away_tip_array.on + " " + time
                                                    }
                                                    else if(check1 > 1 && check2 >= 0){
                                                        away_tip_array.on = away_tip_array.on + " " + time + "(" + check1 + ")"
                                                    }
                                                }

                                                if(n === 0 && current_main_data.away_tip_shots[n].shots.offgoal != 0 && current_main_data.away_tip_shots[n].shots.offgoal != null){
                                                    let time = current_main_data.away_tip_shots[n].time.minute
                                                    if(current_main_data.away_tip_shots[n].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.away_tip_shots[n].time.extra_time + "'"
                                                    }
                                                    away_tip_array.off = away_tip_array.off + " " + time
                                                }
                                                else{
                                                    let time = current_main_data.away_tip_shots[n + 1].time.minute
                                                    if(current_main_data.away_tip_shots[n + 1].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.away_tip_shots[n + 1].time.extra_time + "'"
                                                    }
                                                    if(current_main_data.away_tip_shots[n + 1].shots.offgoal >= 0 && current_main_data.away_tip_shots[n].shots.offgoal === null){
                                                        current_main_data.away_tip_shots[n].shots.offgoal = 0
                                                    }
                                                    let check1 = current_main_data.away_tip_shots[n + 1].shots.offgoal - current_main_data.away_tip_shots[n].shots.offgoal
                                                    let check2 = 0
                                                    if(n >= 1){
                                                        if(current_main_data.away_tip_shots[n].shots.offgoal >= 0 && current_main_data.away_tip_shots[n - 1].shots.offgoal === null){
                                                            current_main_data.away_tip_shots[n - 1].shots.offgoal = 0
                                                        }
                                                        check2 = current_main_data.away_tip_shots[n].shots.offgoal - current_main_data.away_tip_shots[n - 1].shots.offgoal
                                                    }
                                                    if(check1 < 0){
                                                        current_main_data.away_tip_shots[n + 1].shots.offgoal = current_main_data.away_tip_shots[n].shots.offgoal
                                                    }
                                                    if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                        away_tip_array.off = away_tip_array.off + " " + time
                                                    }
                                                    else if(check1 > 1 && check2 >= 0){
                                                        away_tip_array.off = away_tip_array.off + " " + time + "(" + check1 + ")"
                                                    }
                                                }

                                                if(n === 0 && current_main_data.away_tip_shots[n].shots.insidebox != 0 && current_main_data.away_tip_shots[n].shots.insidebox != null){
                                                    let time = current_main_data.away_tip_shots[n].time.minute
                                                    if(current_main_data.away_tip_shots[n].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.away_tip_shots[n].time.extra_time + "'"
                                                    }
                                                    away_tip_array.in = away_tip_array.in + " " + time
                                                }
                                                else{
                                                    let time = current_main_data.away_tip_shots[n + 1].time.minute
                                                    if(current_main_data.away_tip_shots[n + 1].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.away_tip_shots[n + 1].time.extra_time + "'"
                                                    }
                                                    if(current_main_data.away_tip_shots[n + 1].shots.insidebox >= 0 && current_main_data.away_tip_shots[n].shots.insidebox === null){
                                                        current_main_data.away_tip_shots[n].shots.insidebox = 0
                                                    }
                                                    let check1 = current_main_data.away_tip_shots[n + 1].shots.insidebox - current_main_data.away_tip_shots[n].shots.insidebox
                                                    let check2 = 0
                                                    if(n >= 1){
                                                        if(current_main_data.away_tip_shots[n].shots.insidebox >= 0 && current_main_data.away_tip_shots[n - 1].shots.insidebox === null){
                                                            current_main_data.away_tip_shots[n - 1].shots.insidebox = 0
                                                        }
                                                        check2 = current_main_data.away_tip_shots[n].shots.insidebox - current_main_data.away_tip_shots[n - 1].shots.insidebox
                                                    }
                                                    if(check1 < 0){
                                                        current_main_data.away_tip_shots[n + 1].shots.insidebox = current_main_data.away_tip_shots[n].shots.insidebox
                                                    }
                                                    if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                        away_tip_array.in = away_tip_array.in + " " + time
                                                    }
                                                    else if(check1 > 1 && check2 >= 0){
                                                        away_tip_array.in = away_tip_array.in + " " + time + "(" + check1 + ")"
                                                    }
                                                }

                                                if(n === 0 && current_main_data.away_tip_shots[n].shots.outsidebox != 0 && current_main_data.away_tip_shots[n].shots.outsidebox != null){
                                                    let time = current_main_data.away_tip_shots[n].time.minute
                                                    if(current_main_data.away_tip_shots[n].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.away_tip_shots[n].time.extra_time + "'"
                                                    }
                                                    away_tip_array.out = away_tip_array.out + " " + time
                                                }
                                                else{
                                                    let time = current_main_data.away_tip_shots[n + 1].time.minute
                                                    if(current_main_data.away_tip_shots[n + 1].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.away_tip_shots[n + 1].time.extra_time + "'"
                                                    }
                                                    if(current_main_data.away_tip_shots[n + 1].shots.outsidebox >= 0 && current_main_data.away_tip_shots[n].shots.outsidebox === null){
                                                        current_main_data.away_tip_shots[n].shots.outsidebox = 0
                                                    }
                                                    let check1 = current_main_data.away_tip_shots[n + 1].shots.outsidebox - current_main_data.away_tip_shots[n].shots.outsidebox
                                                    let check2 = 0
                                                    if(n >= 1){
                                                        if(current_main_data.away_tip_shots[n].shots.outsidebox >= 0 && current_main_data.away_tip_shots[n - 1].shots.outsidebox === null){
                                                            current_main_data.away_tip_shots[n - 1].shots.outsidebox = 0
                                                        }
                                                        check2 = current_main_data.away_tip_shots[n].shots.outsidebox - current_main_data.away_tip_shots[n - 1].shots.outsidebox
                                                    }
                                                    if(check1 < 0){
                                                        current_main_data.away_tip_shots[n + 1].shots.outsidebox = current_main_data.away_tip_shots[n].shots.outsidebox
                                                    }
                                                    if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                        away_tip_array.out = away_tip_array.out + " " + time
                                                    }
                                                    else if(check1 > 1 && check2 >= 0){
                                                        away_tip_array.out = away_tip_array.out + " " + time + "(" + check1 + ")"
                                                    }
                                                }

                                                if(n === 0 && current_main_data.away_tip_shots[n].shots.blocked != 0 && current_main_data.away_tip_shots[n].shots.blocked != null){
                                                    let time = current_main_data.away_tip_shots[n].time.minute
                                                    if(current_main_data.away_tip_shots[n].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.away_tip_shots[n].time.extra_time + "'"
                                                    }
                                                    away_tip_array.blk = away_tip_array.blk + " " + time
                                                }
                                                else{
                                                    let time = current_main_data.away_tip_shots[n + 1].time.minute
                                                    if(current_main_data.away_tip_shots[n + 1].time.extra_time > 0){
                                                        time = time + "+" + current_main_data.away_tip_shots[n + 1].time.extra_time + "'"
                                                    }
                                                    if(current_main_data.away_tip_shots[n + 1].shots.blocked >= 0 && current_main_data.away_tip_shots[n].shots.blocked === null){
                                                        current_main_data.away_tip_shots[n].shots.blocked = 0
                                                    }
                                                    let check1 = current_main_data.away_tip_shots[n + 1].shots.blocked - current_main_data.away_tip_shots[n].shots.blocked
                                                    let check2 = 0
                                                    if(n >= 1){
                                                        if(current_main_data.away_tip_shots[n].shots.blocked >= 0 && current_main_data.away_tip_shots[n - 1].shots.blocked === null){
                                                            current_main_data.away_tip_shots[n - 1].shots.blocked = 0
                                                        }
                                                        check2 = current_main_data.away_tip_shots[n].shots.blocked - current_main_data.away_tip_shots[n - 1].shots.blocked
                                                    }
                                                    if(check1 < 0){
                                                        current_main_data.away_tip_shots[n + 1].shots.blocked = current_main_data.away_tip_shots[n].shots.blocked
                                                    }
                                                    if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                        away_tip_array.blk = away_tip_array.blk + " " + time
                                                    }
                                                    else if(check1 > 1 && check2 >= 0){
                                                        away_tip_array.blk = away_tip_array.blk + " " + time + "(" + check1 + ")"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if(current_main_data.away_tip_cnr){
                                        for(let n = 0 ; n < current_main_data.away_tip_cnr.length - 1 ; n++){
                                            let time = current_main_data.away_tip_cnr[n].time.minute
                                            if(current_main_data.away_tip_cnr[n].time.extra_time > 0){
                                                time = time + "+" + current_main_data.away_tip_cnr[n].time.extra_time + "'"
                                            }
                                            if(n === 0 && current_main_data.away_tip_cnr[n].shots > 0 && current_main_data.away_tip_cnr[n].shots != null){
                                                away_tip_array.cnr = away_tip_array.cnr + " " + time
                                                if(away.id == 10270){
                                                    console.log('check1===>', away_tip_array.cnr)
                                                }
                                            }
                                            else{
                                                if(current_main_data.away_tip_cnr[n + 1].shots >= 0 && current_main_data.away_tip_cnr[n].shots === null){
                                                    current_main_data.away_tip_cnr[n].shots = 0
                                                }
                                                let check1  = current_main_data.away_tip_cnr[n + 1].shots - current_main_data.away_tip_cnr[n].shots
                                                let check2 = 0
                                                if(n >= 1){
                                                    if(current_main_data.away_tip_cnr[n].shots >= 0 && current_main_data.away_tip_cnr[n - 1].shots === null){
                                                        current_main_data.away_tip_cnr[n - 1].shots = 0
                                                    }
                                                    check2  = current_main_data.away_tip_cnr[n].shots - current_main_data.away_tip_cnr[n - 1].shots
                                                }
                                                if(check1 < 0){
                                                    current_main_data.away_tip_cnr[n + 1].shots = current_main_data.away_tip_cnr[n].shots
                                                }
                                                if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                    away_tip_array.cnr = away_tip_array.cnr + " " + time
                                                }
                                                else if(check1 > 1 && check2 >= 0){
                                                    away_tip_array.cnr = away_tip_array.cnr + " " + time + "(" + check1 + ")"
                                                }
                                            }
                                        }
                                    }
                                    home.time = current_main_data.time.minute
                                    let tot_time = current_main_data.time.minute
                                    if (current_main_data.time.injury_time > 0) {
                                        home.time = current_main_data.time.minute + '+' + current_main_data.time.injury_time + "'"
                                        tot_time = current_main_data.time.minute + current_main_data.time.injury_time
                                    }
                                    if (current_main_data.time.status == 'HT') {
                                        home.time = 'HT'
                                        tot_time = 45
                                    }
                                    if(current_main_data.time.extra_minute > 0){
                                        home.time = current_main_data.time.minute + current_main_data.time.extra_minute + "'"
                                    }
                                    let stats = current_main_data.stats
                                    let stats_ten = current_main_data.stats_ten
                                    //-------------Total Part------------//
                                    if (current_main_data.home_id === stats[0].team_id) {
                                        if(stats[0].shots){
                                            homeT.on = stats[0].shots.ongoal
                                            awayT.on = stats[1].shots.ongoal
                                            homeT.off = stats[0].shots.offgoal
                                            awayT.off = stats[1].shots.offgoal
                                            homeT.blk = stats[0].shots.blocked
                                            awayT.blk = stats[1].shots.blocked
                                            homeT.in = stats[0].shots.insidebox
                                            awayT.in = stats[1].shots.insidebox
                                            homeT.out = stats[0].shots.outsidebox
                                            awayT.out = stats[1].shots.outsidebox
                                        }

                                        homeT.cnr = stats[0].corners
                                        awayT.cnr = stats[1].corners
                                        if(stats[0].attacks != null){
                                            homeT.da = stats[0].attacks.dangerous_attacks
                                            awayT.da = stats[1].attacks.dangerous_attacks
                                        }
                                        else{
                                            homeT.da = null
                                            awayT.da = null
                                        }
                                        homeT.sbst = stats[0].substitutions
                                        awayT.sbst = stats[1].substitutions
                                        homeT.poss = stats[0].possessiontime
                                        awayT.poss = stats[1].possessiontime
                                        homeT.red = stats[0].redcards
                                        awayT.red = stats[1].redcards
                                        homeT.yel = stats[0].yellowcards
                                        awayT.yel = stats[1].yellowcards
                                    }
                                    else {
                                        if(stats[1].shots){
                                            homeT.on = stats[1].shots.ongoal
                                            awayT.on = stats[0].shots.ongoal
                                            homeT.off = stats[1].shots.offgoal
                                            awayT.off = stats[0].shots.offgoal
                                            homeT.blk = stats[1].shots.blocked
                                            awayT.blk = stats[0].shots.blocked
                                            homeT.in = stats[1].shots.insidebox
                                            awayT.in = stats[0].shots.insidebox
                                            homeT.out = stats[1].shots.outsidebox
                                            awayT.out = stats[0].shots.outsidebox
                                        }

                                        homeT.cnr = stats[1].corners
                                        awayT.cnr = stats[0].corners
                                        if(stats[1].attacks != null){
                                            homeT.da = stats[1].attacks.dangerous_attacks
                                            awayT.da = stats[0].attacks.dangerous_attacks
                                        }
                                        else{
                                            homeT.da = null
                                            awayT.da = null
                                        }

                                        homeT.sbst = stats[1].substitutions
                                        awayT.sbst = stats[0].substitutions
                                        homeT.poss = stats[1].possessiontime
                                        awayT.poss = stats[0].possessiontime
                                        homeT.red = stats[1].redcards
                                        awayT.red = stats[0].redcards
                                        homeT.yel = stats[1].yellowcards
                                        awayT.yel = stats[0].yellowcards
                                    }

                                    if((home.on >= 0) || (home.off >= 0) || (home.cnr >= 0) || (home.da > 0)){
                                        if(home.on >= 0){
                                            home.rtg = home.rtg + home.on*3
                                        }
                                        if(home.off >= 0){
                                            home.rtg = home.rtg + home.off*2
                                        }
                                        if(home.cnr >= 0){
                                            home.rtg = home.rtg + home.cnr
                                        }
                                        if(home.da >= 0){
                                            home.rtg = home.rtg + home.da
                                        }
                                    }
                                    else{
                                        home.rtg = '-'
                                    }

                                    if((away.on >= 0) || (away.off >= 0) || (away.cnr >= 0) || (away.da > 0)){
                                        if(away.on >= 0){
                                            away.rtg = away.rtg + away.on*3
                                        }
                                        if(away.off >= 0){
                                            away.rtg = away.rtg + away.off*2
                                        }
                                        if(away.cnr >= 0){
                                            away.rtg = away.rtg + away.cnr
                                        }
                                        if(away.da >= 0){
                                            away.rtg = away.rtg + away.da
                                        }
                                    }
                                    else{
                                        away.rtg = '-'
                                    }
                                    home.gdr = '-'
                                    away.gdr = '-'
                                    homeT.nxt = '-'
                                    awayT.nxt = '-'
                                    homeT.rtg = '-'
                                    awayT.rtg = '-'
                                    if(current_main_data.historical_stats.length > 0){
                                        if(current_main_data.historical_stats[0].home_season){
                                            if(current_main_data.historical_stats[0].home_season.p > 0){
                                                home.gdr = 0
                                                homeT.rtg = 0
                                                if(current_main_data.historical_stats[0].home_season.on > 0){
                                                    home.last_on = current_main_data.historical_stats[0].home_season.on/current_main_data.historical_stats[0].home_season.p
                                                }
                                                if(current_main_data.historical_stats[0].home_season.off > 0){
                                                    home.last_off = current_main_data.historical_stats[0].home_season.off/current_main_data.historical_stats[0].home_season.p
                                                }
                                                if(current_main_data.historical_stats[0].home_season.cnr > 0){
                                                    home.last_cnr = current_main_data.historical_stats[0].home_season.cnr/current_main_data.historical_stats[0].home_season.p
                                                }
                                                if(current_main_data.historical_stats[0].home_season.da > 0){
                                                    home.last_da = current_main_data.historical_stats[0].home_season.da/current_main_data.historical_stats[0].home_season.p
                                                }
                                                if(current_main_data.historical_stats[0].home_season.goals > 0){
                                                    home.last_goal = current_main_data.historical_stats[0].home_season.goals/current_main_data.historical_stats[0].home_season.p
                                                }
                                                //----------average rtg-----------
                                                home.a_rtg = 0
                                                if(home.last_on > 0){
                                                    home.a_rtg = home.a_rtg + (home.last_on/9)*3
                                                }
                                                if(home.last_off > 0){
                                                    home.a_rtg = home.a_rtg + (home.last_off/9)*2
                                                }
                                                if(home.last_cnr > 0){
                                                    home.a_rtg = home.a_rtg + (home.last_cnr/9)
                                                }
                                                if(home.last_da > 0){
                                                    home.a_rtg = home.a_rtg + (home.last_da/9)
                                                }
                                                //--------------------------------

                                                if(home.last_goal > 0 && home.last_on > 0){
                                                    home.gdr = home.gdr + ((100*home.on/home.last_goal/home.last_on/9)*home.on)
                                                }
                                                if(home.last_goal > 0 && home.last_off > 0){
                                                    home.gdr = home.gdr + ( ( 100*home.off/home.last_goal/home.last_off/ 9 )*home.off )
                                                }
                                                if(home.last_goal > 0 && home.last_cnr > 0){
                                                    home.gdr = home.gdr + ((100*home.cnr/home.last_goal/home.last_cnr/9)*home.cnr )
                                                }
                                                if(home.last_goal > 0 && home.last_da > 0){
                                                    home.gdr = home.gdr + ((100*home.da/home.last_goal/home.last_da/9)*home.da )
                                                }
                                                home.gdr = home.gdr.toFixed(0)

                                                if(home_goal === 0){
                                                    homeT.nxt = 0
                                                    if(home.last_goal > 0 && home.last_on > 0){
                                                        homeT.nxt = homeT.nxt + ((homeT.on*90/tot_time/(home.last_on*home.last_goal/home.last_goal)))
                                                    }
                                                    if(home.last_goal > 0 && home.last_off > 0){
                                                        homeT.nxt = homeT.nxt + ((homeT.off*90/tot_time/(home.last_off*home.last_goal/home.last_goal)))
                                                    }
                                                    if(home.last_goal > 0 && home.last_cnr > 0){
                                                        homeT.nxt = homeT.nxt + ((homeT.cnr*90/tot_time/(home.last_cnr*home.last_goal/home.last_goal)))
                                                    }
                                                    if(home.last_goal > 0 && home.last_da > 0){
                                                        homeT.nxt = homeT.nxt + ((homeT.da*90/tot_time/(home.last_da*home.last_goal/home.last_goal)))
                                                    }
                                                    homeT.nxt = (homeT.nxt*100/4).toFixed(0)
                                                    homeT.nxt = -1 * homeT.nxt
                                                }
                                                else if(home_goal > 0){
                                                    homeT.nxt = 0
                                                    if(home.last_goal > 0 && home.last_on > 0){
                                                        homeT.nxt = homeT.nxt + ((homeT.on*90/tot_time/(home.last_on*home_goal/home.last_goal)))
                                                    }
                                                    if(home.last_goal > 0 && home.last_off > 0){
                                                        homeT.nxt = homeT.nxt + ((homeT.off*90/tot_time/(home.last_off*home_goal/home.last_goal)))
                                                    }
                                                    if(home.last_goal > 0 && home.last_cnr > 0){
                                                        homeT.nxt = homeT.nxt + ((homeT.cnr*90/tot_time/(home.last_cnr*home_goal/home.last_goal)))
                                                    }
                                                    if(home.last_goal > 0 && home.last_da > 0){
                                                        homeT.nxt = homeT.nxt + ((homeT.da*90/tot_time/(home.last_da*home_goal/home.last_goal)))
                                                    }
                                                    homeT.nxt = (homeT.nxt*100/4 - 100).toFixed(0)
                                                    homeT.nxt = -1 * homeT.nxt
                                                }

                                                if(home_goal > 0){
                                                    if(tot_time > 0 && home.last_on > 0 && homeT.on > 0){
                                                        homeT.rtg = homeT.rtg + homeT.on*90/tot_time/home.last_on
                                                    }
                                                    if(tot_time > 0 && home.last_off > 0 && homeT.off > 0){
                                                        homeT.rtg = homeT.rtg + homeT.off*90/tot_time/home.last_off
                                                    }
                                                    if(tot_time > 0 && home.last_cnr > 0 && homeT.cnr){
                                                        homeT.rtg = homeT.rtg + homeT.cnr*90/tot_time/home.last_cnr
                                                    }
                                                    if(tot_time > 0 && home.last_da > 0 && homeT.da > 0){
                                                        homeT.rtg = homeT.rtg + homeT.da*90/tot_time/home.last_da
                                                    }
                                                    if(tot_time > 0 && home.last_goal > 0){
                                                        homeT.rtg = homeT.rtg + home_goal*90/tot_time/home.last_goal
                                                    }
                                                    homeT.rtg = (homeT.rtg*20 - 100).toFixed(0)
                                                }
                                                else{
                                                    if(tot_time > 0 && home.last_on > 0 && homeT.on > 0){
                                                        homeT.rtg = homeT.rtg + homeT.on*90/tot_time/home.last_on
                                                    }
                                                    if(tot_time > 0 && home.last_off > 0 && homeT.off > 0){
                                                        homeT.rtg = homeT.rtg + homeT.off*90/tot_time/home.last_off
                                                    }
                                                    if(tot_time > 0 && home.last_cnr > 0 && homeT.cnr){
                                                        homeT.rtg = homeT.rtg + homeT.cnr*90/tot_time/home.last_cnr
                                                    }
                                                    if(tot_time > 0 && home.last_da > 0 && homeT.da > 0){
                                                        homeT.rtg = homeT.rtg + homeT.da*90/tot_time/home.last_da
                                                    }
                                                    homeT.rtg = (homeT.rtg*20 - 100).toFixed(0)
                                                }
                                            }
                                        }

                                        if(current_main_data.historical_stats[0].away_season){
                                            if(current_main_data.historical_stats[0].away_season.p > 0){
                                                away.gdr = 0
                                                awayT.rtg = 0
                                                if(current_main_data.historical_stats[0].away_season.on > 0){
                                                    away.last_on = current_main_data.historical_stats[0].away_season.on/current_main_data.historical_stats[0].away_season.p
                                                }
                                                if(current_main_data.historical_stats[0].away_season.off > 0){
                                                    away.last_off = current_main_data.historical_stats[0].away_season.off/current_main_data.historical_stats[0].away_season.p
                                                }
                                                if(current_main_data.historical_stats[0].away_season.cnr > 0){
                                                    away.last_cnr = current_main_data.historical_stats[0].away_season.cnr/current_main_data.historical_stats[0].away_season.p
                                                }
                                                if(current_main_data.historical_stats[0].away_season.da > 0){
                                                    away.last_da = current_main_data.historical_stats[0].away_season.da/current_main_data.historical_stats[0].away_season.p
                                                }
                                                if(current_main_data.historical_stats[0].away_season.goals > 0){
                                                    away.last_goal = current_main_data.historical_stats[0].away_season.goals/current_main_data.historical_stats[0].away_season.p
                                                }

                                                if(away.last_goal > 0 && away.last_on > 0){
                                                    away.gdr = away.gdr + ((100*away.on/away.last_goal/away.last_on/9)*away.on)
                                                }
                                                if(away.last_goal > 0 && away.last_off > 0){
                                                    away.gdr = away.gdr + ( ( 100*away.off/away.last_goal/away.last_off/ 9 )*away.off )
                                                }
                                                if(away.last_goal > 0 && away.last_cnr > 0){
                                                    away.gdr = away.gdr + ((100*away.cnr/away.last_goal/away.last_cnr/9)*away.cnr )
                                                }
                                                if(away.last_goal > 0 && away.last_da > 0){
                                                    away.gdr = away.gdr + ((100*away.da/away.last_goal/away.last_da/9)*away.da )
                                                }
                                                away.gdr = away.gdr.toFixed(0)

                                                //---------------away average rtg-------------------
                                                away.a_rtg = 0
                                                if(away.last_on > 0){
                                                    away.a_rtg = away.a_rtg + (away.last_on/9)*3
                                                }
                                                if(away.last_off > 0){
                                                    away.a_rtg = away.a_rtg + (away.last_off/9)*2
                                                }
                                                if(away.last_cnr > 0){
                                                    away.a_rtg = away.a_rtg + (away.last_cnr/9)
                                                }
                                                if(home.last_da > 0){
                                                    away.a_rtg = away.a_rtg + (away.last_da/9)
                                                }
                                                //----------------------------------------------

                                                if(away_goal === 0){
                                                    awayT.nxt = 0
                                                    if(away.last_goal > 0 && away.last_on > 0){
                                                        awayT.nxt = awayT.nxt + ((awayT.on*90/tot_time/(away.last_on*away.last_goal/away.last_goal)))
                                                    }
                                                    if(away.last_goal > 0 && away.last_off > 0){
                                                        awayT.nxt = awayT.nxt + ((awayT.off*90/tot_time/(away.last_off*away.last_goal/away.last_goal)))
                                                    }
                                                    if(away.last_goal > 0 && away.last_cnr > 0){
                                                        awayT.nxt = awayT.nxt + ((awayT.cnr*90/tot_time/(away.last_cnr*away.last_goal/away.last_goal)))
                                                    }
                                                    if(away.last_goal > 0 && away.last_da > 0){
                                                        awayT.nxt = awayT.nxt + ((awayT.da*90/tot_time/(away.last_da*away.last_goal/away.last_goal)))
                                                    }
                                                    awayT.nxt =(awayT.nxt*100/4).toFixed(0)
                                                    awayT.nxt = -1 * awayT.nxt
                                                }
                                                else if(away_goal > 0){
                                                    awayT.nxt = 0
                                                    if(away.last_goal > 0 && away.last_on > 0){
                                                        awayT.nxt = awayT.nxt + ((awayT.on*90/tot_time/(away.last_on*away_goal/away.last_goal)))
                                                    }
                                                    if(away.last_goal > 0 && away.last_off > 0){
                                                        awayT.nxt = awayT.nxt + ((awayT.off*90/tot_time/(away.last_off*away_goal/away.last_goal)))
                                                    }
                                                    if(away.last_goal > 0 && away.last_cnr > 0){
                                                        awayT.nxt = awayT.nxt + ((awayT.cnr*90/tot_time/(away.last_cnr*away_goal/away.last_goal)))
                                                    }
                                                    if(away.last_goal > 0 && away.last_da > 0){
                                                        awayT.nxt = awayT.nxt + ((awayT.da*90/tot_time/(away.last_da*away_goal/away.last_goal)))
                                                    }
                                                    awayT.nxt =(awayT.nxt*100/4 - 100).toFixed(0)
                                                    awayT.nxt = -1 * awayT.nxt
                                                }

                                                if(away_goal > 0){
                                                    if(tot_time > 0 && away.last_on > 0 && awayT.on > 0){
                                                        awayT.rtg = awayT.rtg + awayT.on*90/tot_time/away.last_on
                                                    }
                                                    if(tot_time > 0 && away.last_off > 0 && awayT.off > 0){
                                                        awayT.rtg = awayT.rtg + awayT.off*90/tot_time/away.last_off
                                                    }
                                                    if(tot_time > 0 && away.last_cnr > 0 && awayT.cnr > 0){
                                                        awayT.rtg = awayT.rtg + awayT.cnr*90/tot_time/away.last_cnr
                                                    }
                                                    if(tot_time > 0 && away.last_da > 0 && awayT.da > 0){
                                                        awayT.rtg = awayT.rtg + awayT.da*90/tot_time/away.last_da
                                                    }
                                                    if(tot_time > 0 && away.last_goal > 0){
                                                        awayT.rtg = awayT.rtg + away_goal*90/tot_time/away.last_goal
                                                    }
                                                    awayT.rtg = (awayT.rtg*20 - 100).toFixed(0)
                                                }
                                                else{
                                                    if(tot_time > 0 && away.last_on > 0 && awayT.on > 0){
                                                        awayT.rtg = awayT.rtg + awayT.on*90/tot_time/away.last_on
                                                    }
                                                    if(tot_time > 0 && away.last_off > 0 && awayT.off > 0){
                                                        awayT.rtg = awayT.rtg + awayT.off*90/tot_time/away.last_off
                                                    }
                                                    if(tot_time > 0 && away.last_cnr > 0 && awayT.cnr > 0){
                                                        awayT.rtg = awayT.rtg + awayT.cnr*90/tot_time/away.last_cnr
                                                    }
                                                    if(tot_time > 0 && away.last_da > 0 && awayT.da > 0){
                                                        awayT.rtg = awayT.rtg + awayT.da*90/tot_time/away.last_da
                                                    }
                                                    awayT.rtg = (awayT.rtg*20 - 100).toFixed(0)
                                                }
                                            }
                                        }
                                    }

                                    current_main_data.stats = stats
                                    current_main_data.stats_ten = stats_ten
                                    main_data[j] = current_main_data
                                    this.finishedArray[i].events.push({
                                        'home_name': current_main_data.home_name + '(' + current_main_data.home_rank + ')',
                                        "away_name": current_main_data.away_name + '(' + current_main_data.away_rank + ")",
                                        "status": current_main_data.time.status,
                                        "home_score": home.score,
                                        "away_score": away.score,
                                        "home_season": home_season,
                                        "away_season": away_season,
                                        "yellowcards": "",
                                        "redcards": "",
                                        
                                        'main_data': main_data[j],
                                        'goal_tooltip': goal_tooltip,
                                        'goalKey': this.create_UUID(),
                                        'homeT': homeT,
                                        'awayT': awayT,
                                        'home': home,
                                        'away': away,
                                        'home_tooltip': home_tip_array,
                                        'away_tooltip': away_tip_array,
                                        'season_id': main_data[j].season_id,
                                    })
                                }
                            }
                        }
                    }
                    console.log("finished_array===>", this.finishedArray)
                    let self = this
                    this.sortJSON(self.finishedArray,'league', '123')
                })
            },
            percallfunction(){
                this.current_counter = 0
                clearInterval(this.clock)
                this.clock = setInterval(this.frame1, 9000)
            },
            callHistoricalData(home_id, away_id, season_id, eventName, home_rtg, home_a_rtg, away_rtg, away_a_rtg, fixtureId){
                console.log('home_id, away_id====>', home_id, away_id, home_rtg, home_a_rtg, away_rtg, away_a_rtg)
                console.log('stage_id=======>', fixtureId)
                this.historicModalData = {
                    "eventName": "",
                    "home_season": {
                        'on': 0,
                        'off': 0,
                        'block': 0,
                        'in': 0,
                        'out': 0,
                        'cnr': 0,
                        'da': 0,
                        'pos': 0,
                        'pas': 0,
                        'acc': 0,
                        'atk': 0,
                        'ofs': 0,
                        'sav': 0,
                        'sbst': 0,
                        'fou': 0 ,
                        'g_att': 0 ,
                        'safe': 0,
                        'goals':0
                    },
                    "away_season": {
                        'on': 0,
                        'off': 0,
                        'block': 0,
                        'in': 0,
                        'out': 0,
                        'cnr': 0,
                        'da': 0,
                        'pos': 0,
                        'pas': 0,
                        'acc': 0,
                        'atk': 0,
                        'ofs': 0,
                        'sav': 0,
                        'sbst': 0,
                        'fou': 0 ,
                        'g_att': 0 ,
                        'safe': 0,
                        'goals': 0
                    },
                    "home_p": 0,
                    "away_p": 0,
                    "home_rtg": home_rtg,
                    "home_a_rtg": home_a_rtg,
                    "away_rtg": away_rtg,
                    "away_a_rtg": away_a_rtg
                }
                this.historicModalData.eventName = eventName
                this.isload = false
                this.current_counter = 0
                clearInterval(this.clock)
                this.clock = setInterval(this.frame, 100)
                window.axios.post(`${process.env.VUE_APP_URL}getLiveEventHistory`, [fixtureId]).then(({data})=> {
                    console.log('called historical data===>', data.data[0])
                    this.isload = true
                    let seasonData = data.data[0][0]
                    let home_poss_index = 0
                    let away_poss_index = 0
                    let home_p = 0
                    let away_p = 0
                    let home_season = {}
                    let away_season = {}
                    if(seasonData.home_season){
                        home_p = seasonData.home_season.p
                        away_p = seasonData.away_season.p
                        home_season = seasonData.home_season
                        away_season = seasonData.away_season
                    }

                    this.flatodds = {
                        "h_win": "-",
                        "a_win": "-",
                        "d_win": "-",
                        "o_05": "-",
                        "o_15": "-",
                        "o_25": "-",
                        "o_35": "-",
                        "u_05": "-",
                        "u_15": "-",
                        "u_25": "-",
                        "u_35": "-",
                        "o_05_ht": "-",
                        "u_05_ht": "-",
                        "bts_yes": "-",
                        "bts_no": "-"
                    }
                    if (seasonData.DailyFixtures.length != 0) {
                        seasonData.DailyFixtures[0].flatOdds.data.forEach((oItem) => {
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
                                            
                                            this.flatodds.h_win = parseFloat(item.value)
                                        }
                                        else if(label == 'Away - FT') {
                                            this.flatodds.a_win = parseFloat(item.value)
                                        }
                                        else if(label == 'Draw - FT') {
                                            
                                            this.flatodds.d_win = parseFloat(item.value)
                                        }

                                        else if(label == "Over - 0.5 - FT")
                                            this.flatodds.o_05 = parseFloat(item.value)
                                        else if(label == "Over - 1.5 - FT")
                                            this.flatodds.o_15 = parseFloat(item.value)
                                        else if(label == "Over - 2.5 - FT")
                                            this.flatodds.o_25 = parseFloat(item.value)
                                        else if(label == "Over - 3.5 - FT")
                                            this.flatodds.o_35 = parseFloat(item.value)

                                        else if(label == "Under - 0.5 - FT")
                                            this.flatodds.u_05 = parseFloat(item.value)
                                        else if(label == "Under - 1.5 - FT")
                                            this.flatodds.u_15  = parseFloat(item.value)
                                        else if(label == "Under - 2.5 - FT")
                                            this.flatodds.u_25  = parseFloat(item.value)
                                        else if(label == "Under - 3.5 - FT")
                                            this.flatodds.u_35  = parseFloat(item.value)

                                        else if(label == "BTS - FT")
                                            this.flatodds.bts_yes  = parseFloat(item.value)
                                        else if(label == "No BTS - FT")
                                            this.flatodds.bts_no = parseFloat(item.value)

                                        else if(label == "Over - 0.5 - HT")
                                            this.flatodds.o_05_ht = parseFloat(item.value)
                                        else if(label == "Under - 0.5 - HT")
                                            this.flatodds.u_05_ht = parseFloat(item.value)

                                        // event_odds_list.push({
                                        //     label: `${label} - ${suffix}`,
                                        //     value: `${label} - ${suffix}`.trim(),
                                        //     odd: parseFloat(item.value)
                                        // });
                                    }
                                });
                            }
                        });
                        
                    
                    }

                    console.log('home&away season===>', home_season, away_season)
                    let rtgTime = []
                    let homeRS = []
                    let awayRS = []

                    if (seasonData.liveStatsT.length > 0) {
                        let home_rtg_stats = seasonData.liveStatsT[0].home_rtg_stats
                        let away_rtg_stats = seasonData.liveStatsT[0].away_rtg_stats
                        if(home_rtg_stats){
                            for(let c = 0; c < home_rtg_stats.length; c++){
                                let minute = home_rtg_stats[c].time.minute
                                let half_extra_time = 0;
                                let home_rtg = {
                                    'on': null,
                                    'off': null,
                                    'cnr': null,
                                    'da': null,
                                    'goal': null,
                                    'rtg': null
                                }

                                if(home_rtg_stats[c].time.extra_time != null){
                                    minute = home_rtg_stats[c].time.minute + home_rtg_stats[c].time.extra_time
                                    if(home_rtg_stats[c].time.minute < 46){
                                        half_extra_time = home_rtg_stats[c].time.extra_time
                                    }
                                }
                                if(home_rtg_stats[c].time.minute > 45){
                                    minute = minute + half_extra_time
                                }
                                rtgTime.push(minute)

                                if(c <= 10){
                                    if(home_rtg_stats[c].shots != null){
                                        home_rtg.on = home_rtg_stats[c].shots.ongoal
                                        home_rtg.off = home_rtg_stats[c].shots.offgoal
                                    }
                                    if(home_rtg_stats[c].da != null){
                                        home_rtg.da = home_rtg_stats[c].da.dangerous_attacks
                                    }
                                    home_rtg.cnr = home_rtg_stats[c].cnr
                                    home_rtg.goal = home_rtg_stats[c].goals
                                }
                                else{
                                    if(home_rtg_stats[c - 10].shots != null){
                                        home_rtg.on = home_rtg_stats[c].shots.ongoal - home_rtg_stats[c - 10].shots.ongoal
                                        home_rtg.off = home_rtg_stats[c].shots.offgoal - home_rtg_stats[c - 10].shots.offgoal
                                    }
                                    if(home_rtg_stats[c - 10].da != null){
                                        home_rtg.da = home_rtg_stats[c].da.dangerous_attacks - home_rtg_stats[c - 10].da.dangerous_attacks
                                    }
                                    home_rtg.cnr = home_rtg_stats[c].cnr - home_rtg_stats[c - 10].cnr
                                    home_rtg.goal = home_rtg_stats[c].goals - home_rtg_stats[c - 10].goals
                                }

                                if((home_rtg.on >= 0) || (home_rtg.off >= 0) || (home_rtg.cnr >= 0) || (home_rtg.da > 0)){
                                    home_rtg.rtg = 0
                                    if(home_rtg.on >= 0){
                                        home_rtg.rtg = home_rtg.rtg + home_rtg.on*3
                                    }
                                    if(home_rtg.off >= 0){
                                        home_rtg.rtg = home_rtg.rtg + home_rtg.off*2
                                    }
                                    if(home_rtg.cnr >= 0){
                                        home_rtg.rtg = home_rtg.rtg + home_rtg.cnr
                                    }
                                    if(home_rtg.da >= 0){
                                        home_rtg.rtg = home_rtg.rtg + home_rtg.da
                                    }
                                }
                                else{
                                    home_rtg.rtg = '-'
                                }
                                homeRS.push(home_rtg.rtg)
                            }
                        }
                        if(away_rtg_stats){
                            for(let c = 0; c < away_rtg_stats.length; c++){
                                let home_rtg = {
                                    'on': null,
                                    'off': null,
                                    'cnr': null,
                                    'da': null,
                                    'goal': null,
                                    'rtg': null
                                }
                                if(c <= 10){
                                    if(away_rtg_stats[c].shots != null){
                                        home_rtg.on = away_rtg_stats[c].shots.ongoal
                                        home_rtg.off = away_rtg_stats[c].shots.offgoal
                                    }
                                    if(away_rtg_stats[c].da != null){
                                        home_rtg.da = away_rtg_stats[c].da.dangerous_attacks
                                    }
                                    home_rtg.cnr = away_rtg_stats[c].cnr
                                    home_rtg.goal = away_rtg_stats[c].goals
                                }
                                else{
                                    if(away_rtg_stats[c - 10].shots != null){
                                        home_rtg.on = away_rtg_stats[c].shots.ongoal - away_rtg_stats[c - 10].shots.ongoal
                                        home_rtg.off = away_rtg_stats[c].shots.offgoal - away_rtg_stats[c - 10].shots.offgoal
                                    }
                                    if(away_rtg_stats[c - 10].da != null){
                                        home_rtg.da = away_rtg_stats[c].da.dangerous_attacks - away_rtg_stats[c - 10].da.dangerous_attacks
                                    }
                                    home_rtg.cnr = away_rtg_stats[c].cnr - away_rtg_stats[c - 10].cnr
                                    home_rtg.goal = away_rtg_stats[c].goals - away_rtg_stats[c - 10].goals
                                }

                                if((home_rtg.on >= 0) || (home_rtg.off >= 0) || (home_rtg.cnr >= 0) || (home_rtg.da > 0)){
                                    home_rtg.rtg = 0
                                    if(home_rtg.on >= 0){
                                        home_rtg.rtg = home_rtg.rtg + home_rtg.on*3
                                    }
                                    if(home_rtg.off >= 0){
                                        home_rtg.rtg = home_rtg.rtg + home_rtg.off*2
                                    }
                                    if(home_rtg.cnr >= 0){
                                        home_rtg.rtg = home_rtg.rtg + home_rtg.cnr
                                    }
                                    if(home_rtg.da >= 0){
                                        home_rtg.rtg = home_rtg.rtg + home_rtg.da
                                    }
                                }
                                else{
                                    home_rtg.rtg = '-'
                                }
                                awayRS.push(-home_rtg.rtg)
                            }
                        }
                    }


                    for(let i = 0 ; i < this.eventArray.length ; i++){
                        for(let j = 0 ; j < this.eventArray[i].events.length ; j++){
                            console.log('===>', this.eventArray[i].events[j].home.id, this.eventArray[i].events[j].away.id)
                            if(this.eventArray[i].events[j].home.id == home_id && this.eventArray[i].events[j].away.id == away_id){
                                this.historicModalData.home_season = Object.assign(home_season)
                                this.historicModalData.away_season = Object.assign(away_season)
                                this.historicModalData.home_p = home_p
                                this.historicModalData.away_p = away_p
                                // this.data[0].x = this.eventArray[i].events[j].chart.time
                                // this.data[1].x = this.eventArray[i].events[j].chart.time
                                // this.data[0].y = this.eventArray[i].events[j].chart.homeRTG
                                // this.data[1].y = this.eventArray[i].events[j].chart.awayRTG
                                this.data[0].x = rtgTime
                                this.data[1].x = rtgTime
                                this.data[0].y = homeRS
                                this.data[1].y = awayRS

                                this.data[0].name = this.eventArray[i].events[j].main_data.home_name
                                this.data[1].name = this.eventArray[i].events[j].main_data.away_name
                                this.historicModalData.eventName = this.eventArray[i].events[j].main_data.home_name + " v " + this.eventArray[i].events[j].main_data.away_name
                                // this.eventArray[i].events[j].show = true
                            }
                        }
                    }
                    for(let i = 0 ; i < this.finishedArray.length ; i++){
                        for(let j = 0 ; j < this.finishedArray[i].events.length ; j++){
                            console.log('===>', this.finishedArray[i].events[j].home.id, this.finishedArray[i].events[j].away.id)
                            if(this.finishedArray[i].events[j].home.id == home_id && this.finishedArray[i].events[j].away.id == away_id){
                                this.historicModalData.home_season = Object.assign(home_season)
                                this.historicModalData.away_season = Object.assign(away_season)
                                this.historicModalData.home_p = home_p
                                this.historicModalData.away_p = away_p
                                // this.data[0].x = this.finishedArray[i].events[j].chart.time
                                // this.data[1].x = this.finishedArray[i].events[j].chart.time
                                // this.data[0].y = this.finishedArray[i].events[j].chart.homeRTG
                                // this.data[1].y = this.finishedArray[i].events[j].chart.awayRTG

                                this.data[0].x = rtgTime
                                this.data[1].x = rtgTime
                                this.data[0].y = homeRS
                                this.data[1].y = awayRS

                                this.data[0].name = this.finishedArray[i].events[j].main_data.home_name
                                this.data[1].name = this.finishedArray[i].events[j].main_data.away_name
                                this.historicModalData.eventName = this.finishedArray[i].events[j].main_data.home_name + " v " + this.finishedArray[i].events[j].main_data.away_name
                                // this.eventArray[i].events[j].show = true
                            }
                        }
                    }

                    this.percallfunction()
                })
            },
            update5yStats() {
                if(this.reload_flag == false){
                    var check_new_total = 0;
                    console.log('=====================  5 year stats start')
                    for(let j = 0 ; j < this.eventArray.length ; j++){
                        for(let k = 0 ; k < this.eventArray[j].events.length ; k++){
                            
                            check_new_total = check_new_total + 1
                            let current_event = this.eventArray[j].events[k]
                            let oddslines = this.eventArray[j].league5yearsStats.oddslines
                            let current_scorelines = this.eventArray[j].league5yearsStats.scorelines

                            let current_flatOdds = current_event.flatOdds

                            ////////////////////    5 years stats data    //////////////////////
                            var inplayOdds_home = current_event.homeT.homeodds
                            var inplayOdds_away = current_event.homeT.awayodds
                            var inplayOdds_draw = current_event.homeT.drawodds

                            var over_odds = []
                            var under_odds = []
                            
                            

                            var mark1 = (current_event.home.score + current_event.away.score + 0.5).toString()
                            var mark2 = (current_event.home.score + current_event.away.score + 1.5).toString()
                            var cur_score = current_event.home.score + '-' + current_event.away.score

                            var homewin_stat = '';
                            var awaywin_stat = '';
                            var drawwin_stat = '';
                            var homeT_homewin_stat = '';
                            var homeT_awaywin_stat = '';
                            var homeT_drawwin_stat = '';
                            var homeT_homewin_stat_tooltip_1 = null;
                            var homeT_homewin_stat_tooltip_2 = null;
                            var homeT_awaywin_stat_tooltip_1 = null;
                            var homeT_awaywin_stat_tooltip_2 = null;
                            var homeT_drawwin_stat_tooltip_1 = null;
                            var homeT_drawwin_stat_tooltip_2 = null;

                            var goal_1_plus = '';
                            var goal_2_plus = '';
                            var goal_1_minus = '';
                            var goal_2_minus = '';
                            var homeT_goal_1_plus = '';
                            var homeT_goal_2_plus = '';
                            var homeT_goal_1_minus = '';
                            var homeT_goal_2_minus = '';

                            var homeT_goalnexthome = ''
                            var homeT_goalnextaway = ''
                            var homeT_goalnextdraw  = ''

                            var homeT_goalyes = []

                            var homeT_homewin_stat_green = false;
                            var homeT_awaywin_stat_green = false;
                            var homeT_drawwin_stat_green = false;

                            var homeT_goal_1_plus_green = false;
                            var homeT_goal_1_minus_green = false;
                            var homeT_goal_2_plus_green = false;
                            var homeT_goal_2_minus_green = false;

                            var homeT_goal_1_plus_tooltip_1 = null;
                            var homeT_goal_1_plus_tooltip_2 = null;
                            var homeT_goal_1_minus_tooltip_1 = null;
                            var homeT_goal_1_minus_tooltip_2 = null;
                            var homeT_goal_2_plus_tooltip_1 = null;
                            var homeT_goal_2_plus_tooltip_2 = null;
                            var homeT_goal_2_minus_tooltip_1 = null;
                            var homeT_goal_2_minus_tooltip_2 = null;


                            var flatOdds_home = 100
                            var flatOdds_away = 100
                            var flatOdds_draw = 100
                            var event_oddsname = ''
                            
                            if (current_flatOdds) {
                                current_flatOdds.data.forEach((oItem) => {
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
                                            
                                            if(label === '1')
                                                label = "Home";
                                            else if(label === '2')
                                                label = 'Away';
                                            else if(label === 'X')
                                                label = 'Draw';
                                            if(!label.includes(",")) {              //except over 2.0,2.5 case
                                                label = `${label} - ${suffix}`
                                                if(label == 'Home - FT') {
                                                    flatOdds_home = parseFloat(item.value)
                                                }
                                                else if(label == 'Away - FT') {
                                                    
                                                    flatOdds_away = parseFloat(item.value)
                                                }
                                                else if(label == 'Draw - FT') {
                                                    
                                                    flatOdds_draw = parseFloat(item.value)
                                                }
                                            }
                                        });
                                    }
                                });
                            }

                            if (flatOdds_home <= 3 && flatOdds_away <= 3) {
                                event_oddsname = 'SuperCompetative'
                            }
                            else if (flatOdds_home <= 1.5) {
                                event_oddsname = 'H_StrongFav'
                            }
                            else if (flatOdds_home > 1.5 && flatOdds_home <= 2) {
                                event_oddsname = 'H_MediumFav'
                            }
                            else if (flatOdds_home > 2 && flatOdds_home <= 3) {
                                event_oddsname = 'H_SmallFav'
                            }
                            
                            else if (flatOdds_away <= 1.5) {
                                event_oddsname = 'A_StrongFav'
                            }
                            else if (flatOdds_away > 1.5 && flatOdds_away <= 2) {
                                event_oddsname = 'A_MediumFav'
                            }
                            else if (flatOdds_away > 2 && flatOdds_away <= 3) {
                                event_oddsname = 'A_SmallFav'
                            }

                            var cur_minute = current_event.homeT.minute
                            var mark_minute = ''
                            if (cur_minute >= 0 && cur_minute <= 30)
                                mark_minute = '15'
                            else if (cur_minute > 30 && cur_minute <= 45 && current_event.home.time != 'HT')
                                mark_minute = '30'
                            else if ((cur_minute > 45 && cur_minute <= 60) || (current_event.home.time == 'HT'))
                                mark_minute = '45'
                            else if (cur_minute > 60 && cur_minute <= 75)
                                mark_minute = '60'
                            else if (cur_minute > 75 && cur_minute <= 90)
                                mark_minute = '75'

                            var matched_events = 0
                            if (cur_minute >= 0 && cur_minute < 15 && cur_score == '0-0'){
                                if (event_oddsname != '') {
                                    
                                    var oddsline
                                    if (event_oddsname == 'H_StrongFav')
                                        oddsline = oddslines[0]
                                    else if (event_oddsname == 'H_MediumFav')
                                        oddsline = oddslines[1]
                                    else if (event_oddsname == 'H_SmallFav')
                                        oddsline = oddslines[2]
                                    else if (event_oddsname == 'SuperCompetative')
                                        oddsline = oddslines[3]
                                    else if (event_oddsname == 'A_StrongFav')
                                        oddsline = oddslines[4]
                                    else if (event_oddsname == 'A_MediumFav')
                                        oddsline = oddslines[5]
                                    else if (event_oddsname == 'A_SmallFav')
                                        oddsline = oddslines[6]

                                    matched_events = oddsline.total_matches
                                    if (oddsline.total_matches != 0) {
                                        homeT_homewin_stat = parseInt(oddsline.home_win_percent) + '%'
                                        homeT_awaywin_stat = parseInt(oddsline.away_win_percent) + '%'
                                        homeT_drawwin_stat = parseInt(oddsline.draw_win_percent) + '%'

                                        homewin_stat = parseInt(oddsline.home_win_percent)
                                        awaywin_stat = parseInt(oddsline.away_win_percent)
                                        drawwin_stat = parseInt(oddsline.draw_win_percent)

                                        homeT_goalnexthome = parseInt(oddsline.fts_h_percent) + '%'
                                        homeT_goalnextaway = parseInt(oddsline.fts_a_percent) + '%'
                                        homeT_goalnextdraw = parseInt(100 - parseInt(oddsline.fts_h_percent) - parseInt(oddsline.fts_a_percent)) + '%'
                                        homeT_goal_1_plus = parseInt(oddsline.full_05_percent) + '%'
                                        homeT_goal_2_plus = parseInt(oddsline.full_15_percent) + '%'
                                        homeT_goal_1_minus = (100 - parseInt(oddsline.full_05_percent)) + '%'
                                        homeT_goal_2_minus = (100 - parseInt(oddsline.full_15_percent)) + '%'

                                        goal_1_plus = parseInt(oddsline.full_05_percent)
                                        goal_2_plus = parseInt(oddsline.full_15_percent)
                                        goal_1_minus = (100 - parseInt(oddsline.full_05_percent))
                                        goal_2_minus = (100 - parseInt(oddsline.full_15_percent))
                                        
                                        
                                        if (cur_minute >= 0 && cur_minute <= 15){
                                            homeT_goalyes = [
                                                {
                                                    'mark': '0-15',
                                                    'value': parseInt(oddsline.goal_bands_15_percent) + '%',
                                                    'green': null,
                                                    'tooltip_1': null,
                                                    'tooltip_2': null
                                                },
                                                {
                                                    'mark': '16-30',
                                                    'value': parseInt(oddsline.goal_bands_30_percent) + '%',
                                                    'green': null,
                                                    'tooltip_1': null,
                                                    'tooltip_2': null
                                                }
                                            ]
                                            
                                        }
                                    }

                                }
                            }
                            else {
                                if (mark_minute != '' && event_oddsname != '') {
                                    
                                    var band15_isgoal = false;
                                    var band30_isgoal = false;
                                    var band45_isgoal = false;
                                    var band60_isgoal = false;
                                    var band75_isgoal = false;
                                    var band90_isgoal = false;
                                    if (current_event.goal_tooltip != ''){
                                        var goal_minutes = current_event.goal_tooltip.split(' ');
                                        goal_minutes.forEach((item) => {
                                            var goal_minute = parseInt(item.replace("'", ""))
                                            if ( goal_minute <= 15 )
                                                band15_isgoal = true;
                                            else if ( goal_minute <= 30 )
                                                band30_isgoal = true;
                                            else if ( goal_minute <= 45 )
                                                band45_isgoal = true;
                                            else if ( goal_minute <= 60 )
                                                band60_isgoal = true;
                                            else if ( goal_minute <= 75 )
                                                band75_isgoal = true;
                                            else if ( goal_minute <= 90 )
                                                band90_isgoal = true;
                                        })
                                    }
                                    var scorelines = current_scorelines[mark_minute][event_oddsname];
                                    if (cur_score in scorelines) {
                                        var scoreline = scorelines[cur_score];
                                        matched_events = scoreline.matches
                                        homeT_homewin_stat = parseInt(scoreline.homewin) + '%'
                                        homeT_awaywin_stat = parseInt(scoreline.awaywin) + '%'
                                        homeT_drawwin_stat = parseInt(scoreline.drawwin) + '%'

                                        homewin_stat = parseInt(scoreline.homewin)
                                        awaywin_stat = parseInt(scoreline.awaywin)
                                        drawwin_stat = parseInt(scoreline.drawwin)

                                        homeT_goalnexthome = parseInt(scoreline.goalnexthome) + '%'
                                        homeT_goalnextaway = parseInt(scoreline.goalnextaway) + '%'
                                        homeT_goalnextdraw = parseInt(100 - scoreline.goalnexthome - scoreline.goalnextaway) + '%'
                                        homeT_goal_1_plus = parseInt(scoreline.goal_1_plus) + '%'
                                        homeT_goal_2_plus = parseInt(scoreline.goal_2_plus) + '%'
                                        homeT_goal_1_minus = (100 - parseInt(scoreline.goal_1_plus)) + '%'
                                        homeT_goal_2_minus = (100 - parseInt(scoreline.goal_2_plus)) + '%'

                                        goal_1_plus = parseInt(scoreline.goal_1_plus)
                                        goal_2_plus = parseInt(scoreline.goal_2_plus)
                                        goal_1_minus = (100 - parseInt(scoreline.goal_1_plus))
                                        goal_2_minus = (100 - parseInt(scoreline.goal_2_plus))

                                        
                                        
                                        if (cur_minute >= 0 && cur_minute <= 15){
                                            if (band15_isgoal) {
                                                homeT_goalyes = [
                                                    {
                                                        'mark': '0-15',
                                                        'value': '-',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                    {
                                                        'mark': '16-30',
                                                        'value': parseInt(scoreline.goalyes['30']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    }
                                                ]
                                            }
                                            else {
                                                homeT_goalyes = [
                                                    {
                                                        'mark': '0-15',
                                                        'value': parseInt(scoreline.goalyes['15']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                    {
                                                        'mark': '16-30',
                                                        'value': parseInt(scoreline.goalyes['30']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    }
                                                ]
                                            }
                                        }

                                        else if (cur_minute > 15 && cur_minute <= 30){
                                            if (band30_isgoal) {
                                                homeT_goalyes = [
                                                    {
                                                        'mark': '16-30',
                                                        'value': '-',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                    {
                                                        'mark': '31-45',
                                                        'value': parseInt(scoreline.goalyes['45']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    }
                                                ]
                                            }
                                            else {
                                                homeT_goalyes = [
                                                    {
                                                        'mark': '16-30',
                                                        'value': parseInt(scoreline.goalyes['30']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                    {
                                                        'mark': '31-45',
                                                        'value': parseInt(scoreline.goalyes['45']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    }
                                                ]
                                            }
                                            
                                            
                                        }
                                        else if (cur_minute > 30 && cur_minute <= 45 && current_event.home.time != 'HT') {
                                            if (band45_isgoal) {
                                                homeT_goalyes = [
                                                    {
                                                        'mark': '31-45',
                                                        'value': '-',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                    {
                                                        'mark': '46-60',
                                                        'value': parseInt(scoreline.goalyes['60']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                ]
                                            }
                                            else {
                                                homeT_goalyes = [
                                                    {
                                                        'mark': '31-45',
                                                        'value': parseInt(scoreline.goalyes['45']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                    {
                                                        'mark': '46-60',
                                                        'value': parseInt(scoreline.goalyes['60']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                ]
                                            }
                                            
                                            
                                        }
                                           
                                        else if ((cur_minute > 45 && cur_minute <= 60) || (current_event.home.time == 'HT')){
                                            if (band60_isgoal) {
                                                homeT_goalyes = [
                                                   {
                                                        'mark': '46-60',
                                                        'value': '-',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    }, 
                                                    {
                                                        'mark': '61-75',
                                                        'value': parseInt(scoreline.goalyes['75']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                ]
                                            }
                                            else {
                                                homeT_goalyes = [
                                                   {
                                                        'mark': '46-60',
                                                        'value': parseInt(scoreline.goalyes['60']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    }, 
                                                    {
                                                        'mark': '61-75',
                                                        'value': parseInt(scoreline.goalyes['75']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                ]
                                            }
                                            
                                            
                                        }
                                        else if (cur_minute > 60 && cur_minute <= 75){
                                            if (band75_isgoal) {
                                                homeT_goalyes = [
                                                    {
                                                        'mark': '61-75',
                                                        'value': '-',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                    {
                                                        'mark': '76-90',
                                                        'value': parseInt(scoreline.goalyes['90']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                ]
                                            }
                                            else {
                                                homeT_goalyes = [
                                                    {
                                                        'mark': '61-75',
                                                        'value': parseInt(scoreline.goalyes['75']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                    {
                                                        'mark': '76-90',
                                                        'value': parseInt(scoreline.goalyes['90']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                ]
                                            }
                                            
                                            
                                        }
                                        else if (cur_minute > 75 && cur_minute <= 90){
                                            if (band90_isgoal){
                                                homeT_goalyes = [
                                                    {
                                                        'mark': '76-90',
                                                        'value': '-',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                ]   
                                            }
                                            else {
                                                homeT_goalyes = [
                                                    {
                                                        'mark': '76-90',
                                                        'value': parseInt(scoreline.goalyes['90']) + '%',
                                                        'green': null,
                                                        'tooltip_1': null,
                                                        'tooltip_2': null
                                                    },
                                                ] 
                                            }
                                        }
                                    }
                                }
                                
                            }

                           
                            if (inplayOdds_home !== '' && homewin_stat != '') {
                                var val = this.get_trueodds_value(inplayOdds_home, homewin_stat)
                                var true_odd = val[0]
                                var value = val[1]
                                homeT_homewin_stat_tooltip_1 = true_odd.toFixed(2)
                                homeT_homewin_stat_tooltip_2 = value.toFixed(2)
                                if (value > 10) {
                                    homeT_homewin_stat_green = true;
                                }
                            }

                            if (inplayOdds_draw !== '' && drawwin_stat != '') {
                                var val = this.get_trueodds_value(inplayOdds_draw, drawwin_stat)
                                var true_odd = val[0]
                                var value = val[1]
                                homeT_drawwin_stat_tooltip_1 = true_odd.toFixed(2)
                                homeT_drawwin_stat_tooltip_2 = value.toFixed(2)
                                if (value > 10) {
                                    homeT_drawwin_stat_green = true;
                                }
                            }

                            if (inplayOdds_away !== '' && awaywin_stat != '') {
                                var val = this.get_trueodds_value(inplayOdds_away, awaywin_stat)
                                var true_odd = val[0]
                                var value = val[1]
                                homeT_awaywin_stat_tooltip_1 = true_odd.toFixed(2)
                                homeT_awaywin_stat_tooltip_2 = value.toFixed(2)
                                if (value > 10) {
                                    homeT_awaywin_stat_green = true;
                                }
                            }

                            if (current_event.homeT.over_odds[0].mark) {
                                if (current_event.homeT.over_odds[0].value !== '' && goal_1_plus != '') {
                                    var val = this.get_trueodds_value(current_event.homeT.over_odds[0].value, goal_1_plus)
                                    var true_odd = val[0]
                                    var value = val[1]
                                    homeT_goal_1_plus_tooltip_1 = true_odd.toFixed(2)
                                    homeT_goal_1_plus_tooltip_2 = value.toFixed(2)
                                    if (value > 10) {
                                        homeT_goal_1_plus_green = true;
                                    }
                                }
                                if (current_event.homeT.under_odds[0].value !== '' && goal_1_minus != '') {
                                    var val = this.get_trueodds_value(current_event.homeT.under_odds[0].value, goal_1_minus)
                                    var true_odd = val[0]
                                    var value = val[1]
                                    homeT_goal_1_minus_tooltip_1 = true_odd.toFixed(2)
                                    homeT_goal_1_minus_tooltip_2 = value.toFixed(2)
                                    if (value > 10) {
                                        homeT_goal_1_minus_green = true;
                                    }
                                }

                            }
                            if (current_event.homeT.over_odds[1].mark) {
                                if (current_event.homeT.over_odds[1].value !== '' && goal_2_plus != '') {
                                    var val = this.get_trueodds_value(current_event.homeT.over_odds[1].value, goal_2_plus)
                                    var true_odd = val[0]
                                    var value = val[1]
                                    homeT_goal_2_plus_tooltip_1 = true_odd.toFixed(2)
                                    homeT_goal_2_plus_tooltip_2 = value.toFixed(2)
                                    if (value > 10) {
                                        homeT_goal_2_plus_green = true;
                                    }
                                }
                                if (current_event.homeT.under_odds[1].value !== '' && goal_2_minus != '') {
                                    var val = this.get_trueodds_value(current_event.homeT.under_odds[1].value, goal_2_minus)
                                    var true_odd = val[0]
                                    var value = val[1]
                                    homeT_goal_2_minus_tooltip_1 = true_odd.toFixed(2)
                                    homeT_goal_2_minus_tooltip_2 = value.toFixed(2)
                                    if (value > 10) {
                                        homeT_goal_2_minus_green = true;
                                    }
                                }

                            }

                            if (current_event.homeT.over_odds[0].mark) {
                                if (current_event.homeT.over_odds[0].value !== '') {
                                    for (var gb_index=0; gb_index < homeT_goalyes.length; gb_index++ ){
                                        if (homeT_goalyes[gb_index].value != '-' && homeT_goalyes[gb_index].value != '0%') {
                                            var val = this.get_trueodds_value(current_event.homeT.over_odds[0].value, parseInt(homeT_goalyes[gb_index].value.replace('%', '')))
                                            var true_odd = val[0]
                                            var value = val[1]

                                            homeT_goalyes[gb_index].tooltip_1 = true_odd.toFixed(2)
                                            homeT_goalyes[gb_index].tooltip_2 = value.toFixed(2)
                                            if (value > 10) {
                                                homeT_goalyes[gb_index].green = true;
                                            }
                                        }
                                    }
                                }
                            }


                            current_event.homeT.homewin_stat = homeT_homewin_stat
                            current_event.homeT.awaywin_stat =homeT_awaywin_stat
                            current_event.homeT.drawwin_stat =homeT_drawwin_stat
                            current_event.homeT.homewin_stat_tooltip_1 =homeT_homewin_stat_tooltip_1 
                            current_event.homeT.homewin_stat_tooltip_2 =homeT_homewin_stat_tooltip_2 
                            current_event.homeT.awaywin_stat_tooltip_1 =homeT_awaywin_stat_tooltip_1
                            current_event.homeT.awaywin_stat_tooltip_2 =homeT_awaywin_stat_tooltip_2
                            current_event.homeT.drawwin_stat_tooltip_1 =homeT_drawwin_stat_tooltip_1
                            current_event.homeT.drawwin_stat_tooltip_2 =homeT_drawwin_stat_tooltip_2

                            
                            current_event.homeT.goal_1_plus=homeT_goal_1_plus
                            current_event.homeT.goal_2_plus=homeT_goal_2_plus
                            current_event.homeT.goal_1_minus=homeT_goal_1_minus
                            current_event.homeT.goal_2_minus=homeT_goal_2_minus

                            current_event.homeT.goalnexthome=homeT_goalnexthome
                            current_event.homeT.goalnextaway=homeT_goalnextaway
                            current_event.homeT.goalnextdraw=homeT_goalnextdraw

                            current_event.homeT.goalyes=homeT_goalyes

                            current_event.homeT.homewin_stat_green=homeT_homewin_stat_green
                            current_event.homeT.awaywin_stat_green=homeT_awaywin_stat_green
                            current_event.homeT.drawwin_stat_green=homeT_drawwin_stat_green

                            current_event.homeT.goal_1_plus_green=homeT_goal_1_plus_green
                            current_event.homeT.goal_1_minus_green=homeT_goal_1_minus_green
                            current_event.homeT.goal_2_plus_green=homeT_goal_2_plus_green
                            current_event.homeT.goal_2_minus_green=homeT_goal_2_minus_green
                            current_event.homeT.goal_1_plus_tooltip_1=homeT_goal_1_plus_tooltip_1
                            current_event.homeT.goal_1_plus_tooltip_2=homeT_goal_1_plus_tooltip_2
                            current_event.homeT.goal_1_minus_tooltip_1=homeT_goal_1_minus_tooltip_1
                            current_event.homeT.goal_1_minus_tooltip_2=homeT_goal_1_minus_tooltip_2
                            current_event.homeT.goal_2_plus_tooltip_1=homeT_goal_2_plus_tooltip_1
                            current_event.homeT.goal_2_plus_tooltip_2=homeT_goal_2_plus_tooltip_2
                            current_event.homeT.goal_2_minus_tooltip_1=homeT_goal_2_minus_tooltip_1
                            current_event.homeT.goal_2_minus_tooltip_2=homeT_goal_2_minus_tooltip_2

                            current_event.homeT.number_of_matches = matched_events

                            ////////////////////////////////////////////////////
                            
                            this.eventArray[j].events[k] = current_event
                            
                        }
                    }
                    console.log('========================================= 5 year stats update', check_new_total)
                }
            },
            readData(){
                if(this.reload_flag == false){
                    this.reload_flag = true

                    if (!this.live_load_flag)
                        this.showModal();

                    var user_id = localStorage.getItem("user_id");
                    var post_data = {
                        "user_id": user_id
                    }
                    window.axios.post(`${process.env.VUE_APP_URL}getLiveStatsNew`, post_data).then(({data})=> {
                        
                        this.liveDataArray = data.data[1]
                        console.log("<======= before reload data!======>")
                        this.eventArray = data.data[0][0]
                        
                        this.liveNumbers = data.data[0][1]
                        this.scheduleLength = data.data[3]
                        this.finishedLength =  data.data[4]
                        var d = new Date()
                        var hour = d.getHours()
                        var minute = d.getMinutes()
                        var second = d.getSeconds()
                        if(hour < 10){
                            hour = '0' + hour
                        }
                        if(minute < 10){
                            minute = '0' + minute
                        }
                        if(second < 10){
                            second = '0' + second
                        }
                        //this.last_updated_time = hour + ":" + minute + ":" + second
                        console.log('====================    eventarray length', this.eventArray.length)
                        
                        if (!this.live_load_flag) {
                            this.hideModal()
                            this.live_load_flag = true;
                        }
                        console.log('++++++++++++++++++++++++', this.live_load_flag)

                        this.reload_flag = false
                        
                    })
                    .catch(error => {                      
                        console.error("There was an error!", error);
                        this.reload_flag = false
                    });

                }
            },
            sortJSON(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            },
            sort_filter(val){
                console.log("sort filter check!===>", val)
                if(val === 1){
                    this.sort = 0
                    this.scheduleArray = this.scheduleArray1
                }
                else{
                    this.sort = 1
                    let temp0 =  JSON.stringify(this.scheduleArray)
                    let schedule0 = JSON.parse(temp0)
                    let newArray = []
                    for(let i = 0 ; i < schedule0.length; i++){
                        for(let j = 0 ; j < schedule0[i].events.length; j++){
                            newArray.push({"data": schedule0[i].events[j], "time": schedule0[i].events[j].time.starting_at.timestamp})
                        }
                    }
                    this.sortJSON(newArray,'time', '123')
                    let sortedNewArray = []
                    let k = 0
                    for(let i = 0 ; i < newArray.length - 1 ; i++){
                        let league1 = newArray[i].data.competitions[0].league
                        let league2 = newArray[i + 1].data.competitions[0].league
                        if(i === 0){
                            k++
                            sortedNewArray.push({'id': this.create_UUID(), "league": newArray[0].data.competitions[0].league, "events": [newArray[i].data]})
                        }
                        else{
                            if(league1 === league2){
                                sortedNewArray[k - 1].events.push(newArray[i + 1].data)
                            }
                            else{
                                k++
                                sortedNewArray.push({'id': this.create_UUID(),"league": league2, "events": [newArray[i + 1].data]})
                            }
                        }
                    }
                    console.log(sortedNewArray)
                    this.scheduleArray = sortedNewArray
                }
            }
        },
        mounted: function (){
            this.$nextTick(function () {
                console.log('======================  mounted  ========================', this.eventArray.length)
                console.log('++++++++++++++++++++++++', this.live_load_flag)
                if (!this.live_load_flag) {
                    this.readData()
                    // setInterval(() => this.readData(), 90 * 1000);
                    setInterval(() => this.update5yStats(), 90 * 1000);
                }

            })
        },
        created() {
            // this.percallfunction()
            this.refreshIndex++
            

            let chatUrl = "http://34.242.166.202:5000";

            this.socket = io(chatUrl, {        
            //force websockets only - it's optional
            transports: ["websocket"]
            });

            //socket io events
            //this.socket.on("UpdateStats", data1 => {
            //    console.log("--------UpdateStats ", data1);
            //});

            
            
            //this.sockets.subscribe('UpdateStats', (data1) => {
            this.socket.on("UpdateStats", data1 => {
                if(this.reload_flag == false){
                    var d = new Date()
                    var hour = d.getHours()
                    var minute = d.getMinutes()
                    var second = d.getSeconds()
                    if(hour < 10){
                        hour = '0' + hour
                    }
                    if(minute < 10){
                        minute = '0' + minute
                    }
                    if(second < 10){
                        second = '0' + second
                    }
                    this.last_updated_time = hour + ":" + minute + ":" + second

                    let check_new_total = 0
                    for(let i = 0 ; i < data1.length ; i++){
                        if(data1[i].updateArray){
                            let stats = data1[i].updateArray.stats
                            let stats_ten = data1[i].updateArray.stats_ten
                            let goal_tooltip = data1[i].updateArray.goal_tooltip
                            let check_new  = 0
                            let current_main_data = {
                                "home_tip_shots": data1[i].updateArray.home_tip_shots,
                                "home_tip_cnr": data1[i].updateArray.home_tip_cnr,
                                "away_tip_shots": data1[i].updateArray.away_tip_shots,
                                "away_tip_cnr": data1[i].updateArray.away_tip_cnr,
                                "home_tooltip2": data1[i].updateArray.home_tooltip2,
                                "away_tooltip2": data1[i].updateArray.away_tooltip2,
                            }
                            for(let j = 0 ; j < this.eventArray.length ; j++){
                                for(let k = 0 ; k < this.eventArray[j].events.length ; k++){
                                    if(this.eventArray[j].events[k].fixtureId == data1[i].updateArray._id && data1[i].currentData.stats.length > 0){
                                        check_new = 1
                                        let current_event = this.eventArray[j].events[k]
                                        if(data1[i].currentData.time.status == "FT"){
                                            this.readData()
                                            return
                                            //this.mygames_tab()
                                            
                                            // let index = this.eventArray[j].events.indexOf(current_event)
                                            // if (index > -1) {
                                            //     this.eventArray[j].events.splice(index, 1)
                                            //     if(k > 0){
                                            //         k = k - 1
                                            //     }
                                            // }
                                        }
                                        current_event.home.time = data1[i].currentData.time.minute

                                        if (data1[i].currentData.time.added_time !== null)
                                            current_event.home.added_time = data1[i].currentData.time.added_time + "'"
                                        else
                                            current_event.home.added_time = ""
                                        current_event.homeT.minute = data1[i].currentData.time.minute
                                        let tot_time = data1[i].currentData.time.minute
                                        if(data1[i].currentData.time.injury_time != null){
                                            current_event.home.time = data1[i].currentData.time.minute + '+' + data1[i].currentData.time.injury_time
                                            tot_time = data1[i].currentData.time.minute + data1[i].currentData.time.injury_time
                                        }
                                        if(data1[i].currentData.time.status == 'HT'){
                                            current_event.home.time = 'HT'
                                            tot_time = 45
                                        }
                                        if(data1[i].currentData.time.extra_minute > 0){
                                            current_event.home.time = data1[i].currentData.time.minute + data1[i].currentData.time.extra_minute + "'"
                                        }
                                        current_event.goal_tooltip = data1[i].updateArray.goal_tooltip
                                        let home_goal = data1[i].updateArray.scores.localteam_score
                                        let away_goal = data1[i].updateArray.scores.visitorteam_score
                                        //---------------------------------Last 10 Min--------------------------------------
                                        if(current_event.home.id === stats[0].team_id){
                                            current_event.home.score = data1[i].updateArray.scores.localteam_score
                                            current_event.away.score = data1[i].updateArray.scores.visitorteam_score
                                            if(stats[0].shots && stats_ten.length > 0){
                                                if(stats[0].shots.ongoal != null){
                                                    current_event.home.on = stats[0].shots.ongoal - stats_ten[0][0].shots.ongoal
                                                    current_event.away.on = stats[1].shots.ongoal - stats_ten[0][1].shots.ongoal
                                                }
                                                if(stats[0].shots.offgoal != null){
                                                    current_event.home.off = stats[0].shots.offgoal - stats_ten[0][0].shots.offgoal
                                                    current_event.away.off = stats[1].shots.offgoal - stats_ten[0][1].shots.offgoal
                                                }
                                                if(stats[0].shots.blocked != null){
                                                    current_event.home.blk = stats[0].shots.blocked - stats_ten[0][0].shots.blocked
                                                    current_event.away.blk = stats[1].shots.blocked - stats_ten[0][1].shots.blocked
                                                }
                                                if(stats[0].shots.insidebox != null){
                                                    current_event.home.in = stats[0].shots.insidebox - stats_ten[0][0].shots.insidebox
                                                    current_event.away.in = stats[1].shots.insidebox - stats_ten[0][1].shots.insidebox
                                                }
                                                if(stats[0].shots.outsidebox != null){
                                                    current_event.home.out = stats[0].shots.outsidebox - stats_ten[0][0].shots.outsidebox
                                                    current_event.away.out = stats[1].shots.outsidebox - stats_ten[0][1].shots.outsidebox
                                                }
                                            }
                                            if(stats[0].corners != null){
                                                current_event.home.cnr = stats[0].corners - stats_ten[0][0].corners
                                                current_event.away.cnr = stats[1].corners - stats_ten[0][1].corners
                                            }

                                            if(stats[0].attacks && stats_ten[0][0].attacks != null){
                                                if(stats[0].attacks.dangerous_attacks != null){
                                                    current_event.home.da = stats[0].attacks.dangerous_attacks - stats_ten[0][0].attacks.dangerous_attacks
                                                    current_event.away.da = stats[1].attacks.dangerous_attacks - stats_ten[0][1].attacks.dangerous_attacks
                                                }
                                            }
                                            if(stats_ten[0][0].possessiontime != null){
                                                current_event.home.poss = stats_ten[0][0].possessiontime
                                                current_event.away.poss = stats_ten[0][1].possessiontime
                                            }

                                            if(stats[0].substitutions != null){
                                                current_event.home.sbst = stats[0].substitutions - stats_ten[0][0].substitutions
                                                current_event.away.sbst = stats[1].substitutions - stats_ten[0][1].substitutions
                                            }

                                            if(stats[0].goals > current_event.home.goal){
                                                current_event.home.flash = 1
                                            }
                                            else{
                                                current_event.home.flash = 0
                                            }

                                            if(stats[1].goals > current_event.away.goal){
                                                current_event.away.flash = 1
                                            }
                                            else{
                                                current_event.away.flash = 0
                                            }

                                            current_event.home.goal = stats[0].goals - stats_ten[0][0].goals
                                            current_event.away.goal = stats[1].goals - stats_ten[0][1].goals
                                        }
                                        else{
                                            current_event.home.score = data1[i].updateArray.scores.localteam_score
                                            current_event.away.score = data1[i].updateArray.scores.visitorteam_score
                                            if(stats[0].shots && stats_ten[0][0].shots){
                                                if(stats[0].shots.ongoal != null){
                                                    current_event.home.on = stats[1].shots.ongoal - stats_ten[0][1].shots.ongoal
                                                    current_event.away.on = stats[0].shots.ongoal - stats_ten[0][0].shots.ongoal
                                                }
                                                if(stats[0].shots.offgoal != null){
                                                    current_event.home.off = stats[1].shots.offgoal - stats_ten[0][1].shots.offgoal
                                                    current_event.away.off = stats[0].shots.offgoal - stats_ten[0][0].shots.offgoal
                                                }
                                                if(stats[0].shots.blocked != null){
                                                    current_event.home.blk = stats[1].shots.blocked - stats_ten[0][1].shots.blocked
                                                    current_event.away.blk = stats[0].shots.blocked - stats_ten[0][0].shots.blocked
                                                }
                                                if(stats[0].shots.insidebox != null){
                                                    current_event.home.in = stats[1].shots.insidebox - stats_ten[0][1].shots.insidebox
                                                    current_event.away.in = stats[0].shots.insidebox - stats_ten[0][0].shots.insidebox
                                                }
                                                if(stats[0].shots.outsidebox != null){
                                                    current_event.home.out = stats[1].shots.outsidebox - stats_ten[0][1].shots.outsidebox
                                                    current_event.away.out = stats[0].shots.outsidebox - stats_ten[0][0].shots.outsidebox
                                                }
                                            }
                                            if(stats[0].corners != null){
                                                current_event.home.cnr = stats[1].corners - stats_ten[0][1].corners
                                                current_event.away.cnr = stats[0].corners - stats_ten[0][0].corners
                                            }

                                            if(stats[0].attacks && stats_ten[0][0].attacks != null){
                                                if(stats[0].attacks.dangerous_attacks != null){
                                                    current_event.home.da = stats[1].attacks.dangerous_attacks - stats_ten[0][1].attacks.dangerous_attacks
                                                    current_event.away.da = stats[0].attacks.dangerous_attacks - stats_ten[0][0].attacks.dangerous_attacks
                                                }
                                            }
                                            if(stats_ten[0][0].possessiontime != null){
                                                current_event.home.poss = stats_ten[0][1].possessiontime
                                                current_event.away.poss = stats_ten[0][0].possessiontime
                                            }

                                            if(stats[0].substitutions != null){
                                                current_event.home.sbst = stats[1].substitutions - stats_ten[0][1].substitutions
                                                current_event.away.sbst = stats[0].substitutions - stats_ten[0][0].substitutions
                                            }

                                            if(stats[0].goals > current_event.home.goal){
                                                current_event.home.flash = 1
                                            }
                                            else{
                                                current_event.home.flash = 0
                                            }

                                            if(stats[1].goals > current_event.away.goal){
                                                current_event.away.flash = 1
                                            }
                                            else{
                                                current_event.away.flash = 0
                                            }

                                            current_event.home.goal = stats[1].goals - stats_ten[0][1].goals
                                            current_event.away.goal = stats[0].goals - stats_ten[0][0].goals
                                        }

                                        current_event.home.rtg = 0
                                        current_event.away.rtg = 0
                                        if((current_event.home.on >= 0) || (current_event.home.off >= 0) || (current_event.home.cnr >= 0) || (current_event.home.da > 0)){
                                            if(current_event.home.on >= 0){
                                                current_event.home.rtg = current_event.home.rtg + current_event.home.on*3
                                            }
                                            if(current_event.home.off >= 0){
                                                current_event.home.rtg = current_event.home.rtg + current_event.home.off*2
                                            }
                                            if(current_event.home.cnr >= 0){
                                                current_event.home.rtg = current_event.home.rtg + current_event.home.cnr
                                            }
                                            if(current_event.home.da >= 0){
                                                current_event.home.rtg = current_event.home.rtg + current_event.home.da
                                            }
                                        }
                                        else{
                                            current_event.home.rtg = '-'
                                        }

                                        if((current_event.away.on >= 0) || (current_event.away.off >= 0) || (current_event.away.cnr >= 0) || (current_event.away.da > 0)){
                                            if(current_event.away.on >= 0){
                                                current_event.away.rtg = current_event.away.rtg + current_event.away.on*3
                                            }
                                            if(current_event.away.off >= 0){
                                                current_event.away.rtg = current_event.away.rtg + current_event.away.off*2
                                            }
                                            if(current_event.away.cnr >= 0){
                                                current_event.away.rtg = current_event.away.rtg + current_event.away.cnr
                                            }
                                            if(current_event.away.da >= 0){
                                                current_event.away.rtg = current_event.away.rtg + current_event.away.da
                                            }
                                        }
                                        else{
                                            current_event.away.rtg = '-'
                                        }

                                        if(current_event.home.last_goal > 0){
                                            current_event.home.gdr = 0
                                            if(current_event.home.last_on > 0){
                                                current_event.home.gdr = current_event.home.gdr + ((100*current_event.home.on/current_event.home.last_goal/current_event.home.last_on/9)*current_event.home.on)
                                            }
                                            if(current_event.home.last_off > 0){
                                                current_event.home.gdr = current_event.home.gdr + ( ( 100*current_event.home.off/current_event.home.last_goal/current_event.home.last_off/ 9 )*current_event.home.off )
                                            }
                                            if(current_event.home.last_cnr > 0){
                                                current_event.home.gdr = current_event.home.gdr + ((100*current_event.home.cnr/current_event.home.last_goal/current_event.home.last_cnr/9)*current_event.home.cnr )
                                            }
                                            if(current_event.home.last_da > 0){
                                                current_event.home.gdr = current_event.home.gdr + ((100*current_event.home.da/current_event.home.last_goal/current_event.home.last_da/9)*current_event.home.da )
                                            }

                                            if(home_goal === 0){
                                                current_event.homeT.nxt = 0
                                                if(current_event.home.last_goal > 0 && current_event.home.last_on > 0){
                                                    current_event.homeT.nxt = current_event.homeT.nxt + ((current_event.homeT.on*90/tot_time/(current_event.home.last_on*current_event.home.last_goal/current_event.home.last_goal)))
                                                }
                                                if(current_event.home.last_goal > 0 && current_event.home.last_off > 0){
                                                    current_event.homeT.nxt = current_event.homeT.nxt + ((current_event.homeT.off*90/tot_time/(current_event.home.last_off*current_event.home.last_goal/current_event.home.last_goal)))
                                                }
                                                if(current_event.home.last_goal > 0 && current_event.home.last_cnr > 0){
                                                    current_event.homeT.nxt = current_event.homeT.nxt + ((current_event.homeT.cnr*90/tot_time/(current_event.home.last_cnr*current_event.home.last_goal/current_event.home.last_goal)))
                                                }
                                                if(current_event.home.last_goal > 0 && current_event.home.last_da > 0){
                                                    current_event.homeT.nxt = current_event.homeT.nxt + ((current_event.homeT.da*90/tot_time/(current_event.home.last_da*current_event.home.last_goal/current_event.home.last_goal)))
                                                }
                                                current_event.homeT.nxt = (current_event.homeT.nxt*100/4).toFixed(0)
                                                current_event.homeT.nxt = -1 * current_event.homeT.nxt
                                            }
                                            else if(home_goal > 0){
                                                current_event.homeT.nxt = 0
                                                if(current_event.home.last_goal > 0 && current_event.home.last_on > 0){
                                                    current_event.homeT.nxt = current_event.homeT.nxt + ((current_event.homeT.on*90/tot_time/(current_event.home.last_on*home_goal/current_event.home.last_goal)))
                                                }
                                                if(current_event.home.last_goal > 0 && current_event.home.last_off > 0){
                                                    current_event.homeT.nxt = current_event.homeT.nxt + ((current_event.homeT.off*90/tot_time/(current_event.home.last_off*home_goal/current_event.home.last_goal)))
                                                }
                                                if(current_event.home.last_goal > 0 && current_event.home.last_cnr > 0){
                                                    current_event.homeT.nxt = current_event.homeT.nxt + ((current_event.homeT.cnr*90/tot_time/(current_event.home.last_cnr*home_goal/current_event.home.last_goal)))
                                                }
                                                if(current_event.home.last_goal > 0 && current_event.home.last_da > 0){
                                                    current_event.homeT.nxt = current_event.homeT.nxt + ((current_event.homeT.da*90/tot_time/(current_event.home.last_da*home_goal/current_event.home.last_goal)))
                                                }
                                                current_event.homeT.nxt = (current_event.homeT.nxt*100/4 - 100).toFixed(0)
                                                current_event.homeT.nxt = -1 * current_event.homeT.nxt
                                            }
                                            
                                        }
                                        if(current_event.away.last_goal > 0){
                                            current_event.away.gdr = 0
                                            if(current_event.away.last_on > 0){
                                                current_event.away.gdr = current_event.away.gdr + ((100*current_event.away.on/current_event.away.last_goal/current_event.away.last_on/9)*current_event.away.on)
                                            }
                                            if(current_event.away.last_off > 0){
                                                current_event.away.gdr = current_event.away.gdr + ( ( 100*current_event.away.off/current_event.away.last_goal/current_event.away.last_off/ 9 )*current_event.away.off )
                                            }
                                            if(current_event.away.last_cnr > 0){
                                                current_event.away.gdr = current_event.away.gdr + ((100*current_event.away.cnr/current_event.away.last_goal/current_event.away.last_cnr/9)*current_event.away.cnr )
                                            }
                                            if(current_event.away.last_da > 0){
                                                current_event.away.gdr = current_event.away.gdr + ((100*current_event.away.da/current_event.away.last_goal/current_event.away.last_da/9)*current_event.away.da )
                                            }

                                            if(away_goal === 0){
                                                current_event.awayT.nxt = 0
                                                if(current_event.away.last_goal > 0 && current_event.away.last_on > 0){
                                                    current_event.awayT.nxt = current_event.awayT.nxt + ((current_event.awayT.on*90/tot_time/(current_event.away.last_on*current_event.away.last_goal/current_event.away.last_goal)))
                                                }
                                                if(current_event.away.last_goal > 0 && current_event.away.last_off > 0){
                                                    current_event.awayT.nxt = current_event.awayT.nxt + ((current_event.awayT.off*90/tot_time/(current_event.away.last_off*current_event.away.last_goal/current_event.away.last_goal)))
                                                }
                                                if(current_event.away.last_goal > 0 && current_event.away.last_cnr > 0){
                                                    current_event.awayT.nxt = current_event.awayT.nxt + ((current_event.awayT.cnr*90/tot_time/(current_event.away.last_cnr*current_event.away.last_goal/current_event.away.last_goal)))
                                                }
                                                if(current_event.away.last_goal > 0 && current_event.away.last_da > 0){
                                                    current_event.awayT.nxt = current_event.awayT.nxt + ((current_event.awayT.da*90/tot_time/(current_event.away.last_da*current_event.away.last_goal/current_event.away.last_goal)))
                                                }
                                                current_event.awayT.nxt = (current_event.awayT.nxt*100/4).toFixed(0)
                                                current_event.awayT.nxt = -1 * current_event.awayT.nxt
                                            }
                                            else if(away_goal > 0){
                                                current_event.awayT.nxt = 0
                                                if(current_event.away.last_goal > 0 && current_event.away.last_on > 0){
                                                    current_event.awayT.nxt = current_event.awayT.nxt + ((current_event.awayT.on*90/tot_time/(current_event.away.last_on*away_goal/current_event.away.last_goal)))
                                                }
                                                if(current_event.away.last_goal > 0 && current_event.away.last_off > 0){
                                                    current_event.awayT.nxt = current_event.awayT.nxt + ((current_event.awayT.off*90/tot_time/(current_event.away.last_off*away_goal/current_event.away.last_goal)))
                                                }
                                                if(current_event.away.last_goal > 0 && current_event.away.last_cnr > 0){
                                                    current_event.awayT.nxt = current_event.awayT.nxt + ((current_event.awayT.cnr*90/tot_time/(current_event.away.last_cnr*away_goal/current_event.away.last_goal)))
                                                }
                                                if(current_event.away.last_goal > 0 && current_event.away.last_da > 0){
                                                    current_event.awayT.nxt = current_event.awayT.nxt + ((current_event.awayT.da*90/tot_time/(current_event.away.last_da*away_goal/current_event.away.last_goal)))
                                                }
                                                current_event.awayT.nxt = (current_event.awayT.nxt*100/4 - 100).toFixed(0)
                                                current_event.awayT.nxt = -1 * current_event.awayT.nxt
                                            }

                                            
                                        }
                                        if(current_event.home.gdr > 0){
                                            current_event.home.gdr = current_event.home.gdr.toFixed(0)
                                        }
                                        if(current_event.away.gdr > 0){
                                            current_event.away.gdr = current_event.away.gdr.toFixed(0)
                                        }
                                        //----------------------------------goal notification-------------------------------
                                        if(current_event.home.id === stats[0].team_id){
                                            if(stats_ten.length > 1){
                                                if(stats_ten[stats_ten.length - 1][0].goals - stats_ten[stats_ten.length - 2][0].goals > 0){
                                                    current_event.home.flash = 1
                                                }
                                                else{
                                                    current_event.home.flash = 0
                                                }
                                                if(stats_ten[stats_ten.length - 1][1].goals - stats_ten[stats_ten.length - 2][1].goals > 0){
                                                    current_event.away.flash = 1
                                                }
                                                else{
                                                    current_event.away.flash = 0
                                                }
                                            }
                                        }
                                        else{
                                            if(stats_ten.length > 1){
                                                if(stats_ten[stats_ten.length - 1][1].goals - stats_ten[stats_ten.length - 2][1].goals > 0){
                                                    current_event.home.flash = 1
                                                }
                                                else{
                                                    current_event.home.flash = 0
                                                }
                                                if(stats_ten[stats_ten.length - 1][0].goals - stats_ten[stats_ten.length - 2][0].goals > 0){
                                                    current_event.away.flash = 1
                                                }
                                                else{
                                                    current_event.away.flash = 0
                                                }
                                            }
                                        }

                                        current_event.home.goal = stats[0].goals - stats_ten[0][0].goals
                                        current_event.away.goal = stats[1].goals - stats_ten[0][1].goals
                                        //---------------------------------------Total Part---------------------------------
                                        if(current_event.home.id === stats[0].team_id){
                                            if(stats[0].shots){
                                                if(stats[0].shots.ongoal != null){
                                                    current_event.homeT.on = stats[0].shots.ongoal
                                                    current_event.awayT.on = stats[1].shots.ongoal
                                                }
                                                if(stats[0].shots.offgoal != null){
                                                    current_event.homeT.off = stats[0].shots.offgoal
                                                    current_event.awayT.off = stats[1].shots.offgoal
                                                }
                                                if(stats[0].shots.blocked != null){
                                                    current_event.homeT.blk = stats[0].shots.blocked
                                                    current_event.awayT.blk = stats[1].shots.blocked
                                                }
                                                if(stats[0].shots.insidebox != null){
                                                    current_event.homeT.in = stats[0].shots.insidebox
                                                    current_event.awayT.in = stats[1].shots.insidebox
                                                }
                                                if(stats[0].shots.outsidebox != null){
                                                    current_event.homeT.out = stats[0].shots.outsidebox
                                                    current_event.awayT.out = stats[1].shots.outsidebox
                                                }
                                            }
                                            if(stats[0].corners != null){
                                                current_event.homeT.cnr = stats[0].corners
                                                current_event.awayT.cnr = stats[1].corners
                                            }

                                            if(stats[0].attacks != null){
                                                if(stats[0].attacks.dangerous_attacks != null){
                                                    current_event.homeT.da = stats[0].attacks.dangerous_attacks
                                                    current_event.awayT.da = stats[1].attacks.dangerous_attacks
                                                }
                                            }
                                            if(stats[0].goals != null){
                                                current_event.homeT.goal = stats[0].goals
                                                current_event.awayT.goal = stats[1].goals
                                            }
                                            if(stats[0].possessiontime != null){
                                                current_event.homeT.poss = stats[0].possessiontime
                                                current_event.awayT.poss = stats[1].possessiontime
                                            }
                                            if(stats[0].substitutions != null){
                                                current_event.homeT.sbst = stats[0].substitutions
                                                current_event.awayT.sbst = stats[1].substitutions
                                            }
                                            if(stats[0].redcards != null){
                                                current_event.homeT.red = stats[0].redcards
                                                current_event.awayT.red = stats[1].redcards
                                            }
                                            if(stats[0].yellowcards != null){
                                                current_event.homeT.yel = stats[0].yellowcards
                                                current_event.awayT.yel = stats[1].yellowcards
                                            }
                                        }
                                        else{
                                            if(stats[0].shots){
                                                if(stats[0].shots.ongoal != null){
                                                    current_event.homeT.on = stats[1].shots.ongoal
                                                    current_event.awayT.on = stats[0].shots.ongoal
                                                }
                                                if(stats[0].shots.offgoal != null){
                                                    current_event.homeT.off = stats[1].shots.offgoal
                                                    current_event.awayT.off = stats[0].shots.offgoal
                                                }
                                                if(stats[0].shots.blocked != null){
                                                    current_event.homeT.blk = stats[1].shots.blocked
                                                    current_event.awayT.blk = stats[0].shots.blocked
                                                }
                                                if(stats[0].shots.insidebox != null){
                                                    current_event.homeT.in = stats[1].shots.insidebox
                                                    current_event.awayT.in = stats[0].shots.insidebox
                                                }
                                                if(stats[0].shots.outsidebox != null){
                                                    current_event.homeT.out = stats[1].shots.outsidebox
                                                    current_event.awayT.out = stats[0].shots.outsidebox
                                                }
                                            }
                                            if(stats[0].corners != null){
                                                current_event.homeT.cnr = stats[1].corners
                                                current_event.awayT.cnr = stats[0].corners
                                            }

                                            if(stats[0].attacks != null){
                                                if(stats[0].attacks.dangerous_attacks != null){
                                                    current_event.homeT.da = stats[1].attacks.dangerous_attacks
                                                    current_event.awayT.da = stats[0].attacks.dangerous_attacks
                                                }
                                            }
                                            if(stats[0].goals != null){
                                                current_event.homeT.goal = stats[1].goals
                                                current_event.awayT.goal = stats[0].goals
                                            }
                                            if(stats[0].possessiontime != null){
                                                current_event.homeT.poss = stats[1].possessiontime
                                                current_event.awayT.poss = stats[0].possessiontime
                                            }
                                            if(stats[0].substitutions != null){
                                                current_event.homeT.sbst = stats[1].substitutions
                                                current_event.awayT.sbst = stats[0].substitutions
                                            }
                                            if(stats[0].redcards != null){
                                                current_event.homeT.red = stats[1].redcards
                                                current_event.awayT.red = stats[0].redcards
                                            }
                                            if(stats[0].yellowcards != null){
                                                current_event.homeT.yel = stats[1].yellowcards
                                                current_event.awayT.yel = stats[0].yellowcards
                                            }
                                        }

                                        if(current_event.home.last_on > 0 || current_event.home.last_off > 0 || current_event.home.last_cnr > 0 || current_event.home.last_da > 0){
                                            current_event.homeT.rtg = 0
                                            if(home_goal > 0){
                                                if(tot_time > 0 && current_event.home.last_on > 0 && current_event.homeT.on > 0){
                                                    current_event.homeT.rtg = current_event.homeT.rtg + current_event.homeT.on*90/tot_time/current_event.home.last_on
                                                }
                                                if(tot_time > 0 && current_event.home.last_off > 0 && current_event.homeT.off > 0){
                                                    current_event.homeT.rtg = current_event.homeT.rtg + current_event.homeT.off*90/tot_time/current_event.home.last_off
                                                }
                                                if(tot_time > 0 && current_event.home.last_cnr > 0 && current_event.homeT.cnr > 0){
                                                    current_event.homeT.rtg = current_event.homeT.rtg + current_event.homeT.cnr*90/tot_time/current_event.home.last_cnr
                                                }
                                                if(tot_time > 0 && current_event.home.last_da > 0 && current_event.homeT.da > 0){
                                                    current_event.homeT.rtg = current_event.homeT.rtg + current_event.homeT.da*90/tot_time/current_event.home.last_da
                                                }
                                                if(tot_time > 0 && current_event.home.last_goal > 0){
                                                    current_event.homeT.rtg = current_event.homeT.rtg + home_goal*90/tot_time/current_event.home.last_goal
                                                }
                                                current_event.homeT.rtg = (current_event.homeT.rtg*20 - 100).toFixed(0)
                                            }
                                            else{
                                                if(tot_time > 0 && current_event.home.last_on > 0 && current_event.homeT.on > 0){
                                                    current_event.homeT.rtg = current_event.homeT.rtg + current_event.homeT.on*90/tot_time/current_event.home.last_on
                                                }
                                                if(tot_time > 0 && current_event.home.last_off > 0 && current_event.homeT.off > 0){
                                                    current_event.homeT.rtg = current_event.homeT.rtg + current_event.homeT.off*90/tot_time/current_event.home.last_off
                                                }
                                                if(tot_time > 0 && current_event.home.last_cnr > 0 && current_event.homeT.cnr > 0){
                                                    current_event.homeT.rtg = current_event.homeT.rtg + current_event.homeT.cnr*90/tot_time/current_event.home.last_cnr
                                                }
                                                if(tot_time > 0 && current_event.home.last_da > 0 && current_event.homeT.da > 0){
                                                    current_event.homeT.rtg = current_event.homeT.rtg + current_event.homeT.da*90/tot_time/current_event.home.last_da
                                                }
                                                current_event.homeT.rtg = (current_event.homeT.rtg*20 - 100).toFixed(0)
                                            }
                                        }
                                        else{
                                            current_event.homeT.rtg = '-'
                                        }
                                        if(current_event.away.last_on > 0 || current_event.away.last_off > 0 || current_event.away.last_cnr > 0 || current_event.away.last_da > 0){
                                            current_event.awayT.rtg = 0
                                            if(away_goal > 0){
                                                if(tot_time > 0 && current_event.away.last_on > 0 && current_event.awayT.on > 0){
                                                    current_event.awayT.rtg = current_event.awayT.rtg + current_event.awayT.on*90/tot_time/current_event.away.last_on
                                                }
                                                if(tot_time > 0 && current_event.away.last_off > 0 && current_event.awayT.off > 0){
                                                    current_event.awayT.rtg = current_event.awayT.rtg + current_event.awayT.off*90/tot_time/current_event.away.last_off
                                                }
                                                if(tot_time > 0 && current_event.away.last_cnr > 0 && current_event.awayT.cnr > 0){
                                                    current_event.awayT.rtg = current_event.awayT.rtg + current_event.awayT.cnr*90/tot_time/current_event.away.last_cnr
                                                }
                                                if(tot_time > 0 && current_event.away.last_da > 0 && current_event.awayT.da > 0){
                                                    current_event.awayT.rtg = current_event.awayT.rtg + current_event.awayT.da*90/tot_time/current_event.away.last_da
                                                }
                                                if(tot_time > 0 && current_event.away.last_goal > 0){
                                                    current_event.awayT.rtg = current_event.awayT.rtg + away_goal*90/tot_time/current_event.away.last_goal
                                                }
                                                current_event.awayT.rtg = (current_event.awayT.rtg*20 - 100).toFixed(0)
                                            }
                                            else{
                                                if(tot_time > 0 && current_event.away.last_on > 0 && current_event.awayT.on > 0){
                                                    current_event.awayT.rtg = current_event.awayT.rtg + current_event.awayT.on*90/tot_time/current_event.away.last_on
                                                }
                                                if(tot_time > 0 && current_event.away.last_off > 0 && current_event.awayT.off > 0){
                                                    current_event.awayT.rtg = current_event.awayT.rtg + current_event.awayT.off*90/tot_time/current_event.away.last_off
                                                }
                                                if(tot_time > 0 && current_event.away.last_cnr > 0 && current_event.awayT.cnr > 0){
                                                    current_event.awayT.rtg = current_event.awayT.rtg + current_event.awayT.cnr*90/tot_time/current_event.away.last_cnr
                                                }
                                                if(tot_time > 0 && current_event.away.last_da > 0 && current_event.awayT.da > 0){
                                                    current_event.awayT.rtg = current_event.awayT.rtg + current_event.awayT.da*90/tot_time/current_event.away.last_da
                                                }
                                                current_event.awayT.rtg = (current_event.awayT.rtg*20 - 100).toFixed(0)
                                            }
                                        }
                                        else{
                                            current_event.awayT.rtg = '-'
                                        }

                                        let home_tip_array = {
                                            'on': '',
                                            'off': '',
                                            'in': '',
                                            'out': '',
                                            'blk': '',
                                            'cnr': ''
                                        }
                                        let away_tip_array = {
                                            'on': '',
                                            'off': '',
                                            'in': '',
                                            'out': '',
                                            'blk': '',
                                            'cnr': ''
                                        }

                                        if(current_main_data.home_tip_shots){
                                            for(let n = 0 ; n < current_main_data.home_tip_shots.length - 1 ; n++){
                                                if(current_main_data.home_tip_shots[n].shots != null){
                                                    if(n === 0 && current_main_data.home_tip_shots[n].shots.ongoal != 0 && current_main_data.home_tip_shots[n].shots.ongoal != null){
                                                        let time = current_main_data.home_tip_shots[n].time.minute
                                                        if(current_main_data.home_tip_shots[n].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.home_tip_shots[n].time.extra_time + "'"
                                                        }
                                                        home_tip_array.on = home_tip_array.on + " " + time
                                                    }
                                                    else{
                                                        let time = current_main_data.home_tip_shots[n + 1].time.minute
                                                        if(current_main_data.home_tip_shots[n + 1].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.home_tip_shots[n + 1].time.extra_time + "'"
                                                        }
                                                        if(current_main_data.home_tip_shots[n + 1].shots.ongoal >= 0 && current_main_data.home_tip_shots[n].shots.ongoal === null){
                                                            current_main_data.home_tip_shots[n].shots.ongoal = 0
                                                        }
                                                        let check1 = current_main_data.home_tip_shots[n + 1].shots.ongoal - current_main_data.home_tip_shots[n].shots.ongoal
                                                        let check2 = 0
                                                        if(n >= 1){
                                                            if(current_main_data.home_tip_shots[n].shots.ongoal >= 0 && current_main_data.home_tip_shots[n - 1].shots.ongoal === null){
                                                                current_main_data.home_tip_shots[n - 1].shots.ongoal = 0
                                                            }
                                                            check2 = current_main_data.home_tip_shots[n].shots.ongoal - current_main_data.home_tip_shots[n - 1].shots.ongoal
                                                        }
                                                        if(check1 < 0){
                                                            current_main_data.home_tip_shots[n + 1].shots.ongoal = current_main_data.home_tip_shots[n].shots.ongoal
                                                        }

                                                        if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                            home_tip_array.on = home_tip_array.on + " " + time
                                                        }
                                                        else if(check1 > 1 && check2 >= 0){
                                                            home_tip_array.on = home_tip_array.on + " " + time + "(" + check1 + ")"
                                                        }
                                                    }

                                                    if(n === 0 && current_main_data.home_tip_shots[n].shots.offgoal != 0 && current_main_data.home_tip_shots[n].shots.offgoal != null){
                                                        let time = current_main_data.home_tip_shots[n].time.minute
                                                        if(current_main_data.home_tip_shots[n].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.home_tip_shots[n].time.extra_time + "'"
                                                        }
                                                        home_tip_array.off = home_tip_array.off + " " + time
                                                    }
                                                    else{
                                                        let time = current_main_data.home_tip_shots[n + 1].time.minute
                                                        if(current_main_data.home_tip_shots[n + 1].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.home_tip_shots[n + 1].time.extra_time + "'"
                                                        }
                                                        if(current_main_data.home_tip_shots[n + 1].shots.offgoal >= 0 && current_main_data.home_tip_shots[n].shots.offgoal === null){
                                                            current_main_data.home_tip_shots[n].shots.offgoal = 0
                                                        }
                                                        let check1 = current_main_data.home_tip_shots[n + 1].shots.offgoal - current_main_data.home_tip_shots[n].shots.offgoal
                                                        let check2 = 0
                                                        if(n >= 1){
                                                            if(current_main_data.home_tip_shots[n].shots.offgoal >= 0 && current_main_data.home_tip_shots[n - 1].shots.offgoal === null){
                                                                current_main_data.home_tip_shots[n - 1].shots.offgoal = 0
                                                            }
                                                            check2 = current_main_data.home_tip_shots[n].shots.offgoal - current_main_data.home_tip_shots[n - 1].shots.offgoal
                                                        }
                                                        if(check1 < 0){
                                                            current_main_data.home_tip_shots[n + 1].shots.offgoal = current_main_data.home_tip_shots[n].shots.offgoal
                                                        }
                                                        if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                            home_tip_array.off = home_tip_array.off + " " + time
                                                        }
                                                        else if(check1 > 1 && check2 >= 0){
                                                            home_tip_array.off = home_tip_array.off + " " + time + "(" + check1 + ")"
                                                        }
                                                    }

                                                    if(n === 0 && current_main_data.home_tip_shots[n].shots.insidebox != 0 && current_main_data.home_tip_shots[n].shots.insidebox != null){
                                                        let time = current_main_data.home_tip_shots[n].time.minute
                                                        if(current_main_data.home_tip_shots[n].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.home_tip_shots[n].time.extra_time + "'"
                                                        }
                                                        home_tip_array.in = home_tip_array.in + " " + time
                                                    }
                                                    else{
                                                        let time = current_main_data.home_tip_shots[n + 1].time.minute
                                                        if(current_main_data.home_tip_shots[n + 1].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.home_tip_shots[n + 1].time.extra_time + "'"
                                                        }
                                                        if(current_main_data.home_tip_shots[n + 1].shots.insidebox >= 0 && current_main_data.home_tip_shots[n].shots.insidebox === null){
                                                            current_main_data.home_tip_shots[n].shots.insidebox = 0
                                                        }
                                                        let check1 = current_main_data.home_tip_shots[n + 1].shots.insidebox - current_main_data.home_tip_shots[n].shots.insidebox
                                                        let check2 = 0
                                                        if(n >= 1){
                                                            if(current_main_data.home_tip_shots[n].shots.insidebox >= 0 && current_main_data.home_tip_shots[n - 1].shots.insidebox === null){
                                                                current_main_data.home_tip_shots[n - 1].shots.insidebox = 0
                                                            }
                                                            check2 = current_main_data.home_tip_shots[n].shots.insidebox - current_main_data.home_tip_shots[n - 1].shots.insidebox
                                                        }
                                                        if(check1 < 0){
                                                            current_main_data.home_tip_shots[n + 1].shots.insidebox = current_main_data.home_tip_shots[n].shots.insidebox
                                                        }
                                                        if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                            home_tip_array.in = home_tip_array.in + " " + time
                                                        }
                                                        else if(check1 > 1 && check2 >= 0){
                                                            home_tip_array.in = home_tip_array.in + " " + time + "(" + check1 + ")"
                                                        }
                                                    }

                                                    if(n === 0 && current_main_data.home_tip_shots[n].shots.outsidebox != 0 && current_main_data.home_tip_shots[n].shots.outsidebox != null){
                                                        let time = current_main_data.home_tip_shots[n].time.minute
                                                        if(current_main_data.home_tip_shots[n].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.home_tip_shots[n].time.extra_time + "'"
                                                        }
                                                        home_tip_array.out = home_tip_array.out + " " + time
                                                    }
                                                    else{
                                                        let time = current_main_data.home_tip_shots[n + 1].time.minute
                                                        if(current_main_data.home_tip_shots[n + 1].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.home_tip_shots[n + 1].time.extra_time + "'"
                                                        }
                                                        if(current_main_data.home_tip_shots[n + 1].shots.outsidebox >= 0 && current_main_data.home_tip_shots[n].shots.outsidebox === null){
                                                            current_main_data.home_tip_shots[n].shots.outsidebox = 0
                                                        }
                                                        let check1 = current_main_data.home_tip_shots[n + 1].shots.outsidebox - current_main_data.home_tip_shots[n].shots.outsidebox
                                                        let check2 = 0
                                                        if(n >= 1){
                                                            if(current_main_data.home_tip_shots[n].shots.outsidebox >= 0 && current_main_data.home_tip_shots[n - 1].shots.outsidebox === null){
                                                                current_main_data.home_tip_shots[n - 1].shots.outsidebox = 0
                                                            }
                                                            check2 = current_main_data.home_tip_shots[n].shots.outsidebox - current_main_data.home_tip_shots[n - 1].shots.outsidebox
                                                        }
                                                        if(check1 < 0){
                                                            current_main_data.home_tip_shots[n + 1].shots.outsidebox = current_main_data.home_tip_shots[n].shots.outsidebox
                                                        }
                                                        if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                            home_tip_array.out = home_tip_array.out + " " + time
                                                        }
                                                        else if(check1 > 1 && check2 >= 0){
                                                            home_tip_array.out = home_tip_array.out + " " + time + "(" + check1 + ")"
                                                        }
                                                    }

                                                    if(n === 0 && current_main_data.home_tip_shots[n].shots.blocked != 0 && current_main_data.home_tip_shots[n].shots.blocked != null){
                                                        let time = current_main_data.home_tip_shots[n].time.minute
                                                        if(current_main_data.home_tip_shots[n].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.home_tip_shots[n].time.extra_time + "'"
                                                        }
                                                        home_tip_array.blk = home_tip_array.blk + " " + time
                                                    }
                                                    else{
                                                        let time = current_main_data.home_tip_shots[n + 1].time.minute
                                                        if(current_main_data.home_tip_shots[n + 1].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.home_tip_shots[n + 1].time.extra_time + "'"
                                                        }
                                                        if(current_main_data.home_tip_shots[n + 1].shots.blocked >= 0 && current_main_data.home_tip_shots[n].shots.blocked === null){
                                                            current_main_data.home_tip_shots[n].shots.blocked = 0
                                                        }
                                                        let check1 = current_main_data.home_tip_shots[n + 1].shots.blocked - current_main_data.home_tip_shots[n].shots.blocked

                                                        let check2 = 0
                                                        if(n >= 1){
                                                            if(current_main_data.home_tip_shots[n].shots.blocked >= 0 && current_main_data.home_tip_shots[n - 1].shots.blocked === null ){
                                                                current_main_data.home_tip_shots[n - 1].shots.blocked = 0
                                                            }
                                                            check2 = current_main_data.home_tip_shots[n].shots.blocked - current_main_data.home_tip_shots[n - 1].shots.blocked
                                                        }
                                                        if(check1 < 0){
                                                            current_main_data.home_tip_shots[n + 1].shots.blocked = current_main_data.home_tip_shots[n].shots.blocked
                                                        }
                                                        if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                            home_tip_array.blk = home_tip_array.blk + " " + time
                                                        }
                                                        else if(check1 > 1 && check2 >= 0){
                                                            home_tip_array.blk = home_tip_array.blk + " " + time + "(" + check1 + ")"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if(current_main_data.home_tip_cnr){
                                            for(let n = 0 ; n < current_main_data.home_tip_cnr.length - 1 ; n++){
                                                let time = current_main_data.home_tip_cnr[n].time.minute
                                                if(current_main_data.home_tip_shots[n].time.extra_time > 0){
                                                    time = time + "+" + current_main_data.home_tip_cnr[n].time.extra_time + "'"
                                                }
                                                if(n === 0 && current_main_data.home_tip_cnr[n].shots != 0 && current_main_data.home_tip_cnr[n].shots != null){
                                                    home_tip_array.cnr = home_tip_array.cnr + " " + time
                                                }
                                                else{
                                                    if(current_main_data.home_tip_cnr[n + 1].shots >= 0 && current_main_data.home_tip_cnr[n].shots === null){
                                                        current_main_data.home_tip_cnr[n].shots = 0
                                                    }
                                                    let check1 = current_main_data.home_tip_cnr[n + 1].shots - current_main_data.home_tip_cnr[n].shots
                                                    let check2 = 0
                                                    if(n >= 1){
                                                        if(current_main_data.home_tip_cnr[n].shots >= 0 && current_main_data.home_tip_cnr[n - 1].shots === null){
                                                            current_main_data.home_tip_cnr[n - 1].shots = 0
                                                        }
                                                        check2 = current_main_data.home_tip_cnr[n].shots - current_main_data.home_tip_cnr[n - 1].shots
                                                    }
                                                    if(check1 < 0){
                                                        current_main_data.home_tip_cnr[n + 1].shots =  current_main_data.home_tip_cnr[n].shots
                                                    }
                                                    if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                        home_tip_array.cnr = home_tip_array.cnr + " " + time
                                                    }
                                                    else if(check1 > 1 && check2 >= 0){
                                                        home_tip_array.cnr = home_tip_array.cnr + " " + time + "(" + check1 + ")"
                                                    }
                                                }
                                            }
                                        }
                                        if(current_main_data.away_tip_shots){
                                            for(let n = 0 ; n < current_main_data.away_tip_shots.length - 1 ; n++){
                                                if(current_main_data.away_tip_shots[n].shots != null){

                                                    if(n === 0 && current_main_data.away_tip_shots[n].shots.ongoal != 0 && current_main_data.away_tip_shots[n].shots.ongoal != null){
                                                        let time = current_main_data.away_tip_shots[n].time.minute
                                                        if(current_main_data.away_tip_shots[n].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.away_tip_shots[n].time.extra_time + "'"
                                                        }
                                                        away_tip_array.on = away_tip_array.on + " " + time
                                                    }
                                                    else{
                                                        let time = current_main_data.away_tip_shots[n + 1].time.minute
                                                        if(current_main_data.away_tip_shots[n + 1].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.away_tip_shots[n + 1].time.extra_time + "'"
                                                        }
                                                        if(current_main_data.away_tip_shots[n + 1].shots.ongoal >= 0 && current_main_data.away_tip_shots[n].shots.ongoal === null){
                                                            current_main_data.away_tip_shots[n].shots.ongoal = 0
                                                        }
                                                        let check1 = current_main_data.away_tip_shots[n + 1].shots.ongoal - current_main_data.away_tip_shots[n].shots.ongoal
                                                        let check2 = 0
                                                        if(n >= 1){
                                                            if(current_main_data.away_tip_shots[n].shots.ongoal >= 0 && current_main_data.away_tip_shots[n - 1].shots.ongoal === null){
                                                                current_main_data.away_tip_shots[n - 1].shots.ongoal = 0
                                                            }
                                                            check2 = current_main_data.away_tip_shots[n].shots.ongoal - current_main_data.away_tip_shots[n - 1].shots.ongoal
                                                        }
                                                        if(check1 < 0){
                                                            current_main_data.away_tip_shots[n + 1].shots.ongoal = current_main_data.away_tip_shots[n].shots.ongoal
                                                        }
                                                        if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                            away_tip_array.on = away_tip_array.on + " " + time
                                                        }
                                                        else if(check1 > 1 && check2 >= 0){
                                                            away_tip_array.on = away_tip_array.on + " " + time + "(" + check1 + ")"
                                                        }
                                                    }

                                                    if(n === 0 && current_main_data.away_tip_shots[n].shots.offgoal != 0 && current_main_data.away_tip_shots[n].shots.offgoal != null){
                                                        let time = current_main_data.away_tip_shots[n].time.minute
                                                        if(current_main_data.away_tip_shots[n].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.away_tip_shots[n].time.extra_time + "'"
                                                        }
                                                        away_tip_array.off = away_tip_array.off + " " + time
                                                    }
                                                    else{
                                                        let time = current_main_data.away_tip_shots[n + 1].time.minute
                                                        if(current_main_data.away_tip_shots[n + 1].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.away_tip_shots[n + 1].time.extra_time + "'"
                                                        }
                                                        if(current_main_data.away_tip_shots[n + 1].shots.offgoal >= 0 && current_main_data.away_tip_shots[n].shots.offgoal === null){
                                                            current_main_data.away_tip_shots[n].shots.offgoal = 0
                                                        }
                                                        let check1 = current_main_data.away_tip_shots[n + 1].shots.offgoal - current_main_data.away_tip_shots[n].shots.offgoal
                                                        let check2 = 0
                                                        if(n >= 1){
                                                            if(current_main_data.away_tip_shots[n].shots.offgoal >= 0 && current_main_data.away_tip_shots[n - 1].shots.offgoal === null){
                                                                current_main_data.away_tip_shots[n - 1].shots.offgoal = 0
                                                            }
                                                            check2 = current_main_data.away_tip_shots[n].shots.offgoal - current_main_data.away_tip_shots[n - 1].shots.offgoal
                                                        }
                                                        if(check1 < 0){
                                                            current_main_data.away_tip_shots[n + 1].shots.offgoal = current_main_data.away_tip_shots[n].shots.offgoal
                                                        }
                                                        if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                            away_tip_array.off = away_tip_array.off + " " + time
                                                        }
                                                        else if(check1 > 1 && check2 >= 0){
                                                            away_tip_array.off = away_tip_array.off + " " + time + "(" + check1 + ")"
                                                        }
                                                    }

                                                    if(n === 0 && current_main_data.away_tip_shots[n].shots.insidebox != 0 && current_main_data.away_tip_shots[n].shots.insidebox != null){
                                                        let time = current_main_data.away_tip_shots[n].time.minute
                                                        if(current_main_data.away_tip_shots[n].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.away_tip_shots[n].time.extra_time + "'"
                                                        }
                                                        away_tip_array.in = away_tip_array.in + " " + time
                                                    }
                                                    else{
                                                        let time = current_main_data.away_tip_shots[n + 1].time.minute
                                                        if(current_main_data.away_tip_shots[n + 1].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.away_tip_shots[n + 1].time.extra_time + "'"
                                                        }
                                                        if(current_main_data.away_tip_shots[n + 1].shots.insidebox >= 0 && current_main_data.away_tip_shots[n].shots.insidebox === null){
                                                            current_main_data.away_tip_shots[n].shots.insidebox = 0
                                                        }
                                                        let check1 = current_main_data.away_tip_shots[n + 1].shots.insidebox - current_main_data.away_tip_shots[n].shots.insidebox
                                                        let check2 = 0
                                                        if(n >= 1){
                                                            if(current_main_data.away_tip_shots[n].shots.insidebox >= 0 && current_main_data.away_tip_shots[n - 1].shots.insidebox === null){
                                                                current_main_data.away_tip_shots[n - 1].shots.insidebox = 0
                                                            }
                                                            check2 = current_main_data.away_tip_shots[n].shots.insidebox - current_main_data.away_tip_shots[n - 1].shots.insidebox
                                                        }
                                                        if(check1 < 0){
                                                            current_main_data.away_tip_shots[n + 1].shots.insidebox = current_main_data.away_tip_shots[n].shots.insidebox
                                                        }
                                                        if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                            away_tip_array.in = away_tip_array.in + " " + time
                                                        }
                                                        else if(check1 > 1 && check2 >= 0){
                                                            away_tip_array.in = away_tip_array.in + " " + time + "(" + check1 + ")"
                                                        }
                                                    }

                                                    if(n === 0 && current_main_data.away_tip_shots[n].shots.outsidebox != 0 && current_main_data.away_tip_shots[n].shots.outsidebox != null){
                                                        let time = current_main_data.away_tip_shots[n].time.minute
                                                        if(current_main_data.away_tip_shots[n].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.away_tip_shots[n].time.extra_time + "'"
                                                        }
                                                        away_tip_array.out = away_tip_array.out + " " + time
                                                    }
                                                    else{
                                                        let time = current_main_data.away_tip_shots[n + 1].time.minute
                                                        if(current_main_data.away_tip_shots[n + 1].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.away_tip_shots[n + 1].time.extra_time + "'"
                                                        }
                                                        if(current_main_data.away_tip_shots[n + 1].shots.outsidebox >= 0 && current_main_data.away_tip_shots[n].shots.outsidebox === null){
                                                            current_main_data.away_tip_shots[n].shots.outsidebox = 0
                                                        }
                                                        let check1 = current_main_data.away_tip_shots[n + 1].shots.outsidebox - current_main_data.away_tip_shots[n].shots.outsidebox
                                                        let check2 = 0
                                                        if(n >= 1){
                                                            if(current_main_data.away_tip_shots[n].shots.outsidebox >= 0 && current_main_data.away_tip_shots[n - 1].shots.outsidebox === null){
                                                                current_main_data.away_tip_shots[n - 1].shots.outsidebox = 0
                                                            }
                                                            check2 = current_main_data.away_tip_shots[n].shots.outsidebox - current_main_data.away_tip_shots[n - 1].shots.outsidebox
                                                        }
                                                        if(check1 < 0){
                                                            current_main_data.away_tip_shots[n + 1].shots.outsidebox = current_main_data.away_tip_shots[n].shots.outsidebox
                                                        }
                                                        if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                            away_tip_array.out = away_tip_array.out + " " + time
                                                        }
                                                        else if(check1 > 1 && check2 >= 0){
                                                            away_tip_array.out = away_tip_array.out + " " + time + "(" + check1 + ")"
                                                        }
                                                    }

                                                    if(n === 0 && current_main_data.away_tip_shots[n].shots.blocked != 0 && current_main_data.away_tip_shots[n].shots.blocked != null){
                                                        let time = current_main_data.away_tip_shots[n].time.minute
                                                        if(current_main_data.away_tip_shots[n].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.away_tip_shots[n].time.extra_time + "'"
                                                        }
                                                        away_tip_array.blk = away_tip_array.blk + " " + time
                                                    }
                                                    else{
                                                        let time = current_main_data.away_tip_shots[n + 1].time.minute
                                                        if(current_main_data.away_tip_shots[n + 1].time.extra_time > 0){
                                                            time = time + "+" + current_main_data.away_tip_shots[n + 1].time.extra_time + "'"
                                                        }
                                                        if(current_main_data.away_tip_shots[n + 1].shots.blocked >= 0 && current_main_data.away_tip_shots[n].shots.blocked === null){
                                                            current_main_data.away_tip_shots[n].shots.blocked = 0
                                                        }
                                                        let check1 = current_main_data.away_tip_shots[n + 1].shots.blocked - current_main_data.away_tip_shots[n].shots.blocked
                                                        let check2 = 0
                                                        if(n >= 1){
                                                            if(current_main_data.away_tip_shots[n].shots.blocked >= 0 && current_main_data.away_tip_shots[n - 1].shots.blocked === null){
                                                                current_main_data.away_tip_shots[n - 1].shots.blocked = 0
                                                            }
                                                            check2 = current_main_data.away_tip_shots[n].shots.blocked - current_main_data.away_tip_shots[n - 1].shots.blocked
                                                        }
                                                        if(check1 < 0){
                                                            current_main_data.away_tip_shots[n + 1].shots.blocked = current_main_data.away_tip_shots[n].shots.blocked
                                                        }
                                                        if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                            away_tip_array.blk = away_tip_array.blk + " " + time
                                                        }
                                                        else if(check1 > 1 && check2 >= 0){
                                                            away_tip_array.blk = away_tip_array.blk + " " + time + "(" + check1 + ")"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if(current_main_data.away_tip_cnr){
                                            for(let n = 0 ; n < current_main_data.away_tip_cnr.length - 1 ; n++){
                                                let time = current_main_data.away_tip_cnr[n].time.minute
                                                if(current_main_data.away_tip_cnr[n].time.extra_time > 0){
                                                    time = time + "+" + current_main_data.away_tip_cnr[n].time.extra_time + "'"
                                                }
                                                if(n === 0 && current_main_data.away_tip_cnr[n].shots != 0 && current_main_data.away_tip_cnr[n].shots != null){
                                                    away_tip_array.cnr = away_tip_array.cnr + " " + time
                                                }
                                                else{
                                                    if(current_main_data.away_tip_cnr[n + 1].shots >= 0 && current_main_data.away_tip_cnr[n].shots === null){
                                                        current_main_data.away_tip_cnr[n].shots = 0
                                                    }
                                                    let check1  = current_main_data.away_tip_cnr[n + 1].shots - current_main_data.away_tip_cnr[n].shots
                                                    let check2 = 0
                                                    if(n >= 1){
                                                        if(current_main_data.away_tip_cnr[n].shots >= 0 && current_main_data.away_tip_cnr[n - 1].shots === null){
                                                            current_main_data.away_tip_cnr[n - 1].shots = 0
                                                        }
                                                        check2  = current_main_data.away_tip_cnr[n].shots - current_main_data.away_tip_cnr[n - 1].shots
                                                    }
                                                    if(check1 < 0){
                                                        current_main_data.away_tip_cnr[n + 1].shots = current_main_data.away_tip_cnr[n].shots
                                                    }
                                                    if(check1 > 0 && check1 < 2 && check2 >= 0){
                                                        away_tip_array.cnr = away_tip_array.cnr + " " + time
                                                    }
                                                    else if(check1 > 1 && check2 >= 0){
                                                        away_tip_array.cnr = away_tip_array.cnr + " " + time + "(" + check1 + ")"
                                                    }
                                                }
                                            }
                                        }

                                        if(current_event.home_tooltip.on != home_tip_array.on && home_tip_array.on != ''){
                                            current_event.home_tooltip.onKey = this.create_UUID()
                                            current_event.home_tooltip.on = home_tip_array.on
                                        }
                                        if(current_event.home_tooltip.off != home_tip_array.off && home_tip_array.off != ''){
                                            current_event.home_tooltip.offKey = this.create_UUID()
                                            current_event.home_tooltip.off = home_tip_array.off
                                        }
                                        if(current_event.home_tooltip.in != home_tip_array.in && home_tip_array.in != ''){
                                            current_event.home_tooltip.inKey = this.create_UUID()
                                            current_event.home_tooltip.in = home_tip_array.in
                                        }
                                        if(current_event.home_tooltip.out != home_tip_array.out && home_tip_array.out != ''){
                                            current_event.home_tooltip.outKey = this.create_UUID()
                                            current_event.home_tooltip.out = home_tip_array.out
                                        }
                                        if(current_event.home_tooltip.blk != home_tip_array.blk && home_tip_array.blk != ''){
                                            current_event.home_tooltip.blkKey = this.create_UUID()
                                            current_event.home_tooltip.blk = home_tip_array.blk
                                        }
                                        if(current_event.home_tooltip.cnr != home_tip_array.cnr && home_tip_array.cnr != ''){
                                            current_event.home_tooltip.cnrKey = this.create_UUID()
                                            current_event.home_tooltip.cnr = home_tip_array.cnr
                                        }

                                        if(current_event.away_tooltip.on != away_tip_array.on && away_tip_array.on != ''){
                                            current_event.away_tooltip.onKey = this.create_UUID()
                                            current_event.away_tooltip.on = away_tip_array.on
                                        }
                                        if(current_event.away_tooltip.off != away_tip_array.off && away_tip_array.off != ''){
                                            current_event.away_tooltip.offKey = this.create_UUID()
                                            current_event.away_tooltip.off = away_tip_array.off
                                        }
                                        if(current_event.away_tooltip.in != away_tip_array.in && away_tip_array.in != ''){
                                            current_event.away_tooltip.inKey = this.create_UUID()
                                            current_event.away_tooltip.in = away_tip_array.in
                                        }
                                        if(current_event.away_tooltip.out != away_tip_array.out && away_tip_array.out != ''){
                                            current_event.away_tooltip.outKey = this.create_UUID()
                                            current_event.away_tooltip.out = away_tip_array.out
                                        }
                                        if(current_event.away_tooltip.blk != away_tip_array.blk && away_tip_array.blk != ''){
                                            current_event.away_tooltip.blkKey = this.create_UUID()
                                            current_event.away_tooltip.blk = away_tip_array.blk
                                        }
                                        if(current_event.away_tooltip.cnr != away_tip_array.cnr && away_tip_array.cnr != ''){
                                            current_event.away_tooltip.cnrKey = this.create_UUID()
                                            current_event.away_tooltip.cnr = away_tip_array.cnr
                                        }
                                        if(current_event.goal_tooltip != goal_tooltip && goal_tooltip != ''){
                                            current_event.goalKey = this.create_UUID()
                                            current_event.goal_tooltip = goal_tooltip
                                        }

                                        ////         red yellow tooltip   
                                        if(current_event.home_tooltip.red != current_main_data.home_tooltip2.redCard && current_main_data.home_tooltip2.redCard != ''){
                                            current_event.home_tooltip.redKey = this.create_UUID()
                                            current_event.home_tooltip.red = current_main_data.home_tooltip2.redCard
                                        }
                                        if(current_event.home_tooltip.yel != current_main_data.home_tooltip2.yelCard && current_main_data.home_tooltip2.yelCard != ''){
                                            current_event.home_tooltip.yelKey = this.create_UUID()
                                            current_event.home_tooltip.yel = current_main_data.home_tooltip2.yelCard
                                        }
                                        if(current_event.home_tooltip.sbst != current_main_data.home_tooltip2.subs && current_main_data.home_tooltip2.subs != ''){
                                            current_event.home_tooltip.sbstKey = this.create_UUID()
                                            current_event.home_tooltip.sbst = current_main_data.home_tooltip2.subs
                                        }

                                        if(current_event.away_tooltip.red != current_main_data.away_tooltip2.redCard && current_main_data.away_tooltip2.redCard != ''){
                                            current_event.away_tooltip.redKey = this.create_UUID()
                                            current_event.away_tooltip.red = current_main_data.away_tooltip2.redCard
                                        }
                                        if(current_event.away_tooltip.yel != current_main_data.away_tooltip2.yelCard && current_main_data.away_tooltip2.yelCard != ''){
                                            current_event.away_tooltip.yelKey = this.create_UUID()
                                            current_event.away_tooltip.yel = current_main_data.away_tooltip2.yelCard
                                        }
                                        if(current_event.away_tooltip.sbst != current_main_data.away_tooltip2.subs && current_main_data.away_tooltip2.subs != ''){
                                            current_event.away_tooltip.sbstKey = this.create_UUID()
                                            current_event.away_tooltip.sbst = current_main_data.away_tooltip2.subs
                                        }
                                        //console.log("color check!=>", current_event.home, current_event.home_season, current_event.home1)
                                        if(current_event.home.on > current_event.home_season.on/9/(current_event.home_season.p + 0.00000001)){ current_event.home1.on = 'green'}
                                        else{ current_event.home1.on = 'red'}
                                        if(current_event.home.off > current_event.home_season.off/9/(current_event.home_season.p + 0.00000001)){ current_event.home1.off = 'green'}
                                        else{ current_event.home1.off = 'red'}
                                        if(current_event.home.blk > current_event.home_season.block/9/(current_event.home_season.p + 0.00000001)){ current_event.home1.blk = 'green'}
                                        else{ current_event.home1.blk = 'red'}
                                        if(current_event.home.in > current_event.home_season.in/9/(current_event.home_season.p + 0.00000001)){ current_event.home1.in = 'green'}
                                        else{ current_event.home1.in = 'red'}
                                        if(current_event.home.out > current_event.home_season.out/9/(current_event.home_season.p + 0.00000001)){ current_event.home1.out = 'green'}
                                        else{ current_event.home1.out = 'red'}
                                        if(current_event.home.cnr > current_event.home_season.cnr/9/(current_event.home_season.p + 0.00000001)){ current_event.home1.cnr = 'green'}
                                        else{ current_event.home1.cnr = 'red'}
                                        if(current_event.home.da > current_event.home_season.da/9/(current_event.home_season.p + 0.00000001)){ current_event.home1.da = 'green'}
                                        else{ current_event.home1.da = 'red'}
                                        if(current_event.home.poss > current_event.home_season.pos/(current_event.home_season.p + 0.00000001)){ current_event.home1.poss = 'green'}
                                        else{ current_event.home1.poss = 'red'}

                                        if(current_event.away.on > current_event.away_season.on/9/(current_event.away_season.p + 0.00000001)){ current_event.away1.on = 'green'}
                                        else{ current_event.away1.on = 'red' }
                                        if(current_event.away.off > current_event.away_season.off/9/(current_event.away_season.p + 0.00000001)){ current_event.away1.off = 'green'}
                                        else{ current_event.away1.off = 'red' }
                                        if(current_event.away.blk > current_event.away_season.block/9/(current_event.away_season.p + 0.00000001)){ current_event.away1.blk = 'green'}
                                        else{ current_event.away1.blk = 'red' }
                                        if(current_event.away.in > current_event.away_season.in/9/(current_event.away_season.p + 0.00000001)){ current_event.away1.in = 'green'}
                                        else{ current_event.away1.in = 'red' }
                                        if(current_event.away.out > current_event.away_season.out/9/(current_event.away_season.p + 0.00000001)){ current_event.away1.out = 'green'}
                                        else{ current_event.away1.out = 'red' }
                                        if(current_event.away.cnr > current_event.away_season.cnr/9/(current_event.away_season.p + 0.00000001)){ current_event.away1.cnr = 'green'}
                                        else{ current_event.away1.cnr = 'red' }
                                        if(current_event.away.da > current_event.away_season.da/9/(current_event.away_season.p + 0.00000001)){ current_event.away1.da = 'green'}
                                        else{ current_event.away1.da = 'red' }
                                        if(current_event.away.poss > current_event.away_season.pos/(current_event.away_season.p + 0.00000001)){ current_event.away1.poss = 'green'}
                                        else{ current_event.away1.poss = 'red' }

                                        if(current_event.home_season.p == 0){
                                            current_event.home1 = {
                                                'on': 'black',
                                                'off': 'black',
                                                'blk': 'black',
                                                'in': 'black',
                                                'out': 'black',
                                                'cnr': 'black',
                                                'da': 'black',
                                                'poss': 'black',
                                            }
                                        }
                                        if(current_event.away_season.p == 0){
                                            current_event.away1 = {
                                                'on': 'black',
                                                'off': 'black',
                                                'blk': 'black',
                                                'in': 'black',
                                                'out': 'black',
                                                'cnr': 'black',
                                                'da': 'black',
                                                'poss': 'black',
                                            }
                                        }
                                        this.eventArray[j].events[k] = current_event
                                    }
                                }
                            }
                            if(check_new == 0 && data1[i].updateArray.time.status == 'LIVE' && stats.length > 0){
                                // console.log("new item==>", data1[i].updateArray._id)
                                check_new_total = 1
                            }
                        }
                    }
                    console.log("reload flag===>", check_new_total)
                    if(check_new_total == 1){
                        this.readData()
                        //this.mygames_tab()
                        
                    }
                }
            })

            this.socket.on("UpdateStats_inplayodds", data1 => {
                if(this.reload_flag == false){
                    var d = new Date()
                    var hour = d.getHours()
                    var minute = d.getMinutes()
                    var second = d.getSeconds()
                    if(hour < 10){
                        hour = '0' + hour
                    }
                    if(minute < 10){
                        minute = '0' + minute
                    }
                    if(second < 10){
                        second = '0' + second
                    }
                    this.last_updated_time = hour + ":" + minute + ":" + second                

                    let check_new_total = 0
                    for(let i = 0 ; i < data1.length ; i++){
                        if(data1[i].currentData){
                            
                            for(let j = 0 ; j < this.eventArray.length ; j++){
                                for(let k = 0 ; k < this.eventArray[j].events.length ; k++){
                                    if(this.eventArray[j].events[k].fixtureId == data1[i].currentData._id && data1[i].currentData.inplayOdds.data.length > 0){
                                        check_new_total = check_new_total + 1
                                        let current_event = this.eventArray[j].events[k]


                                        var inplayOdds_home = ''
                                        var inplayOdds_away = ''
                                        var inplayOdds_draw = ''

                                        var over_odds = []
                                        var under_odds = []
                                        var homeT_over_odds = []
                                        var homeT_under_odds = [] 
                                            
                                        data1[i].currentData.inplayOdds.data.forEach((oItem) => {
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
                                                    
                                                    if(label === '1')
                                                        label = "Home";
                                                    else if(label === '2')
                                                        label = 'Away';
                                                    else if(label === 'X')
                                                        label = 'Draw';
                                                    if(!label.includes(",")) {              //except over 2.0,2.5 case
                                                        label = `${label} - ${suffix}`
                                                        if(label == 'Home - FT') {
                                                            inplayOdds_home = parseFloat(item.value)
                                                        }
                                                        else if(label == 'Away - FT') {
                                                            
                                                            inplayOdds_away = parseFloat(item.value)
                                                        }
                                                        else if(label == 'Draw - FT') {
                                                            
                                                            inplayOdds_draw = parseFloat(item.value)
                                                        }

                                                        else if (label.includes('Over') && label.includes('FT')) {                                                                    
                                                            over_odds.push({
                                                                'mark': label.replace('Over', '').replace('FT', '').replaceAll('-', '').trim(),
                                                                'value': parseFloat(item.value)
                                                            })
                                                        }

                                                        else if (label.includes('Under') && label.includes('FT')) {
                                                            under_odds.push({
                                                                'mark': label.replace('Under', '').replace('FT', '').replaceAll('-', '').trim(),
                                                                'value': parseFloat(item.value)
                                                            })
                                                        }

                                                    }
                                                });
                                            }
                                        });
                                            

                                        var mark1 = (current_event.home.score + current_event.away.score + 0.5).toString()
                                        var mark2 = (current_event.home.score + current_event.away.score + 1.5).toString()

                                        for (var m_index = 0; m_index < over_odds.length; m_index++ ){
                                            if (over_odds[m_index].mark == mark1){
                                                homeT_over_odds.push(over_odds[m_index])
                                                break
                                            }
                                        }
                                        if (homeT_over_odds.length == 0) {
                                            homeT_over_odds.push({
                                                'mark': null,
                                                'value': ''
                                            })
                                        }

                                        for (var m_index = 0; m_index < over_odds.length; m_index++ ){
                                            if (over_odds[m_index].mark == mark2){
                                                homeT_over_odds.push(over_odds[m_index])
                                                break
                                            }
                                        }
                                        if (homeT_over_odds.length == 1) {
                                            homeT_over_odds.push({
                                                'mark': null,
                                                'value': ''
                                            })
                                        }

                                        for (var m_index = 0; m_index < under_odds.length; m_index++ ){
                                            if (under_odds[m_index].mark == mark1){
                                                homeT_under_odds.push(under_odds[m_index])
                                                break
                                            }
                                        }
                                        if (homeT_under_odds.length == 0) {
                                            homeT_under_odds.push({
                                                'mark': null,
                                                'value': ''
                                            })
                                        }

                                        for (var m_index = 0; m_index < under_odds.length; m_index++ ){
                                            if (under_odds[m_index].mark == mark2){
                                                homeT_under_odds.push(under_odds[m_index])
                                                break
                                            }
                                        }
                                        if (homeT_under_odds.length == 1) {
                                            homeT_under_odds.push({
                                                'mark': null,
                                                'value': ''
                                            })
                                        }

                                        current_event.homeT.homeodds = inplayOdds_home
                                        current_event.homeT.awayodds = inplayOdds_away
                                        current_event.homeT.drawodds = inplayOdds_draw
                                        current_event.homeT.over_odds = homeT_over_odds
                                        current_event.homeT.under_odds = homeT_under_odds
                                        current_event.flatOdds = data1[i].currentData.flatOdds
                                        this.eventArray[j].events[k] = current_event
                                    }
                                }
                            }
                            
                        }
                    }
                    console.log("=========  inplayodds live udpate reload flag===>", check_new_total)
                }
                
            })
        },
        beforeDestroy() {
            console.log('=========================  beforeDestroy')

            this.eventArray = []
            this.socket.off('UpdateStats');
        }
    }
</script>
<style>
    .Odds-label{
        background: #6c757d;
        color: white;
        width: 40px;
        text-align: center;
        border-radius: 3px;
        padding: 0;
        height: 15px;
        margin: 0;
    }
    .green-label {
        background: green;
        color: white;
        width: 40px;
        text-align: center;
        border-radius: 3px;
        padding: 0;
        height: 15px;
        margin: 0;
        margin-left:  1px;
    }
    .stats-label {
        padding-left:  5px;
    }
    .filter{
        float: left;
        margin-top: 20px;
    }
    .filter label{
        font-weight: bold;
        color: red;
        float: left;
        margin-bottom: 0px;
        margin-top: 5px;
        margin-left: 10px;
        margin-right: 15px;
        font-size: 14px;
    }
    .card.drag, .card .drag {
        cursor: crosshair;
    }
    .modal-dialog {
        max-width: 820px!important;
    }
    .modal-backdrop {
        background-color: #000!important;
        opacity: 0.2!important;
    }
    .season-detail{
        width: 5%!important;
        min-width: 38px!important;
        font-size: 12px!important;
    }
    .bottom-part.bottom-part1 .detail{
        width: 11%!important;
    }
    .bottom-part.bottom-part1 .index_detail{
        width: 14%!important;
    }
    .live-stats-container .nav-item a{
        height: 30px;
        margin-bottom: 1px;
        padding-top: 5px;
    }
    .c-subheader{
        padding: 0;
        height: 30px!important;
        min-height: 30px!important;
    }
    .breadcrumb{
        padding: 0!important;
        padding-top: 4px!important;
    }
    .season-part .detail{
        width: 5%;
    }
    .c-header-nav {
        min-height: 45px!important;
        height: 45px!important;
    }
    @media (min-width: 992px){
        html:not([dir="rtl"]) .c-sidebar.c-sidebar-lg-show:not(.c-sidebar-right).c-sidebar-fixed ~ .c-wrapper, html:not([dir="rtl"]) .c-sidebar.c-sidebar-show:not(.c-sidebar-right).c-sidebar-fixed ~ .c-wrapper {
            margin-left: 194px;
        }
    }
    .c-sidebar{
        width: 194px;
    }
    @media (min-width: 992px){
        .c-sidebar-minimized.c-sidebar-fixed {
            z-index: 1031;
            width: 56px;
        }
    }
    @media (min-width: 992px){
        html:not([dir="rtl"]) .c-sidebar.c-sidebar-lg-show:not(.c-sidebar-right), html:not([dir="rtl"]) .c-sidebar.c-sidebar-show:not(.c-sidebar-right) {
            margin-left: 0;
        }
    }
    @media (min-width: 992px){
        html:not([dir="rtl"]) .c-sidebar.c-sidebar-lg-show:not(.c-sidebar-right).c-sidebar-fixed.c-sidebar-minimized ~ .c-wrapper, html:not([dir="rtl"]) .c-sidebar.c-sidebar-show:not(.c-sidebar-right).c-sidebar-fixed.c-sidebar-minimized ~ .c-wrapper {
            margin-left: 56px;
        }
    }

    .live-stats-container .nav-item{
        font-size: 14px!important;
    }
    .live-stats-container .card{
        border: none
    }
    .live-stats-container div{
        font-size: 12px!important;
    }
    .live-stats-container .season-detail{
        font-size: 12px!important;
    }
    .live-stats-container .card-body{
        padding: 5px;
    }
    .c-main{
        padding: 0;
        overflow-x: auto;
    }
    .c-main .container-fluid{
        padding: 0;
    }
    .live-stats-container .nav-item{
        width: 25%;
        text-align: center;
        font-size: 16px;
    }
    .live-stats-container .tab-content{
        padding: 0px;
    }
    .header .header-content{
        font-size: 16px;
        font-weight: 600;
        padding: 2px 6px;
        text-align: center;
        background: #cecece;
    }
    .detail{
        width: 7.5%;
        min-width: 26px;
        float: left;
        padding:0;
        text-align: center;
        font-size: 12px;
    }
    .detail_gb{
        width: 16%;
        min-width: 26px;
        float: left;
        padding:0;
        text-align: center;
        font-size: 12px;
    }
    .detail1{
        width: 8.6%;
        min-width: 26px;
        float: left;
        padding:0;
        text-align: center;
        font-size: 12px;
    }
    .detail_total .detail{
        min-width: 28px;
    }
    .finished-tab .detail{
        width: 7.5%;
    }
    .index_detail{
        width: 14%!important;
    }
    .time_manner{
        animation: splash infinite 1s;
    }
    .goal_manner{
        animation: splash1 infinite 1s;
    }

    @keyframes splash {
        0% {
            color: white;
        }
        50% {
            color: #fa050d;
        }
        100%{
            color:white;
        }
    }
    @keyframes splash1 {
        0% {
            color: white;
        }
        25% {
            color: #16ad57;
        }
        50% {
            color: #199e69;
        }
        70%{
            color: #28b06f;
        }
        100%{
            color:white;
        }
    }
    .slide-fade-enter-active {
        -webkit-animation-name: example;
        -webkit-animation-duration: 3s;
        -webkit-animation-iteration-count: 1;
        animation-name: example;
        animation-duration: 3s;
        animation-iteration-count: 1;
    }

    .livenow {
        -webkit-animation-name: example;
        -webkit-animation-duration: 3s;
        -webkit-animation-iteration-count: 1;
        animation-name: example;
        animation-duration: 3s;
        animation-iteration-count: 1;
    }
    .goalcelebration {
        -webkit-animation-name: example1;
        -webkit-animation-duration: 3s;
        -webkit-animation-iteration-count: 10;
        animation-name: example1;
        animation-duration: 3s;
        animation-iteration-count: 10;
    }
    .pre-formatted {
      white-space: pre;
    }
    @keyframes example {
        0% {
            background-color: rgba(166, 216, 255, 0.53);
        }
        50% {
            background-color: rgba(18, 18, 18, 0.34);
        }
        100% {
            background-color: rgba(250, 201, 209, 0.53);
        }
        100% {
            background-color: rgba(243, 196, 0, 0.5)!important;
        }
    }
    @keyframes example1 {
        0% {
            color: rgba(76, 175, 80, 0.5);
        }
        50% {
            color: rgba(76, 175, 80, 1);
        }
        100% {
            color: rgba(76, 175, 80, 0.5);
        }
        100% {
            color: rgba(76, 175, 80, 1) !important;
        }
    }
    @media screen and (max-width: 600px) {
        .table-cell input{
            max-width: 44px;
        }
    }
</style>
