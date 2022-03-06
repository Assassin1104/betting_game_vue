<template>
    <div class="live-stats-container" style="min-width: 1275px;">
        <div class="d-flex justify-content-center" style="height: 500px" v-if="!eventArray.length" >
            <div class="spinner-border" role="status" style="margin: auto">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <CCard body-wrapper v-if="eventArray.length" >
            <CTabs variant="tabs" :active-tab="1">
                <CTab :title="'Scheduled Games('+scheduleLength+')'">
                    <div v-for="item in scheduleArray" :key="item.league">
                        <div v-if="item.events.length > 0" class="schedule-header" style="height: 30px; background: #d6d8d9; font-weight: 700; font-size: 15px; padding: 3px 10px;">
                            {{item.league}}
                        </div>
                        <div v-for="item1 in item.events" :key="item1._id" class="event-content" style="height: 35px; font-size: 16px;">
                            <div style="background: white">
                                <div style="width: 5%; float: left;">
                                    {{item1.time.starting_at.time}}
                                </div>
                                <div style="width: 20%; float: left; text-align: right; padding-right: 2%;">
                                    {{item1.localTeamName}}
                                </div>
                                <div style="width: 20%; float: left; text-align: left; padding-left: 5%;">
                                    {{item1.visitorTeamName}}
                                </div>
                            </div>
                        </div>
                    </div>
                </CTab>
                <CTab :title="'LIVE Games('+liveNumbers+')'">
                    <div v-for="(item, i) in eventArray" :key="item.league" style="margin-top: -3px;">
                        <div v-if="item.events.length > 0 && item.league"  class="header" style="width: 100%; height: 50px;">
                            <div class="header-content" style="width: 16%; height: 50px; float: left; text-align: left;">
                                {{item.league}}
                            </div>
                            <div class="header-content" style="width: 5%; min-width: 30px; height: 50px; float: left; border-left: 1px solid whitesmoke; padding-top: 23px">
                                Result
                            </div>
                            <div class="header-content detail_total" style="width: 25%; height: 50px; float: left; border-left: 1px solid whitesmoke">
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
                                    <div class="detail" style="width: 4%;">
                                        Rtg
                                    </div>
                                </div>
                            </div>
                            <div class="header-content detail_total" style="width: 26%; height: 50px; float: left; border-left: 1px solid whitesmoke">
                                Last 10 minutes
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
                                    <div class="detail" style="min-width: 32px;">
                                        Poss
                                    </div>
                                    <div class="detail" style="min-width: 30px;">
                                        Goals
                                    </div>
                                    <div class="detail" style="width: 4%;">
                                        Rtg
                                    </div>
                                </div>
                            </div>
                            <div class="header-content" style="width: 10%; height: 50px; float: left; border-left: 1px solid whitesmoke">
                                Alert
                            </div>
                            <div class="header-content" style="width: 18%; height: 50px; float: left; border-left: 1px solid whitesmoke">
                                Chart
                            </div>
                        </div>
                        <div v-for="(item1, j) in item.events" :key="item1.away_id" class="content" style="width: 100%; height: 62px; font-weight: 600">
                            <!--  home team data part Total -->
                            <div style="width: 16%; height: 30px; float: left; position: relative; top: 0px;">
                                <div class="time_manner" style="width: 60px; float: left;position: relative; top:  23px; left: 15px; font-size: 17px; font-weight: normal">{{item1.home.time}}'</div>
                                <div v-if="item1.home.flash == 1" class="goalcelebration" style="width: calc(100% - 65px); float: left;">{{item1.main_data.home_name}} ({{item1.main_data.home_rank}})</div>
                                <div v-else style="width: calc(100% - 65px); float: left;">{{item1.main_data.home_name}} ({{item1.main_data.home_rank}})</div>
                            </div>
                            <div
                                    @click="SetCollapse1(item1.index0)"
                                    duration="100"
                                    style="height: 0px; position: relative; top: 17px; left: -18px;"
                            >
                                <img v-if="isPlus(item1.index0)" src="/img/ico-plus.png" width="13px;" style="width: 16px; cursor: pointer;"/>
                                <img v-if="isMinus(item1.index0)" src="/img/ico-minus.png" width="13px;" style="width: 16px; cursor: pointer;"/>
                            </div>
                            <div style="width: 5%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: black;">
                                    <transition name="slide-fade" mode="out-in" class="livenow">
                                        <div v-c-tooltip="item1.goal_tooltip" :key="item1.home.score" class="detail" style="color: red; position: relative; top: 22px; left: 7px; font-size: 18px;">
                                            {{item1.home.score}} - {{item1.away.score}}
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div class="detail_total" style="width: 25%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: black;">
                                    <transition name="slide-fade" mode="out-in" class="livenow">
                                        <div v-if="item1.homeT.on == 0" class="detail" style="color: red;">
                                            {{item1.homeT.on}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.on" :key="'tooltip' + item1.index0 + i + j + 1" v-if="item1.homeT.on > 0" class="detail" style="color: green;">
                                            {{item1.homeT.on}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.off" :key="'tooltip' + item1.index0 + i + j + 2" v-if="item1.homeT.off == 0" class="detail" style="color: red">
                                            {{item1.homeT.off}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.off" :key="'tooltip' + item1.index0 + i + j + 3" v-if="item1.homeT.off > 0" class="detail" style="color: green">
                                            {{item1.homeT.off}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.blk" :key="'tooltip' + item1.index0 + i + j + 4" v-if="item1.homeT.blk > 0" class="detail" style="color: green">
                                            {{item1.homeT.blk}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.blk" :key="'tooltip' + item1.index0 + i + j + 5" v-if="item1.homeT.blk == 0 && item1.awayT.blk != 0" class="detail" style="color: red">
                                            {{item1.homeT.blk}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div  v-c-tooltip="item1.home_tooltip.blk" :key="'tooltip' + item1.index0 + i + j + 6" v-if="item1.homeT.blk == null || (item1.homeT.blk == 0 && item1.awayT.blk == 0)" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div  v-c-tooltip="item1.home_tooltip.in" :key="'tooltip' + item1.index0 + i + j + 7" v-if="item1.homeT.in == 0" class="detail" style="color: red">
                                            {{item1.homeT.in}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.in" :key="'tooltip' + item1.index0 + i + j + 8" v-if="item1.homeT.in > 0" class="detail" style="color: green;">
                                            {{item1.homeT.in}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.in" :key="'tooltip' + item1.index0 + i + j + 9" v-if="item1.homeT.in == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.out" :key="'tooltip' + item1.index0 + i + j + 10" v-if="item1.homeT.out == 0" class="detail" style="color: red">
                                            {{item1.homeT.out}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.out" :key="'tooltip' + item1.index0 + i + j + 11" v-if="item1.homeT.out > 0" class="detail" style="color: green">
                                            {{item1.homeT.out}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.out" :key="'tooltip' + item1.index0 + i + j + 12" v-if="item1.homeT.out == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.cnr" :key="'tooltip' + item1.index0 + i + j + 13" v-if="item1.homeT.cnr == 0" class="detail" style="color: red">
                                            {{item1.homeT.cnr}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.cnr" :key="'tooltip' + item1.index0 + i + j + 14" v-if="item1.homeT.cnr > 0" class="detail" style="color: green">
                                            {{item1.homeT.cnr}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.home_tooltip.cnr" :key="'tooltip' + item1.index0 + i + j + 15" v-if="item1.homeT.cnr == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.da" v-if="item1.homeT.da == 0" class="detail" style="color: red">
                                            {{item1.homeT.da}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.da" v-if="item1.homeT.da > 0" class="detail" style="color: green">
                                            {{item1.homeT.da}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.poss" v-if="item1.homeT.poss == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.poss" v-if="item1.homeT.poss == 0" class="detail" style="color: green">
                                            {{item1.homeT.poss}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.poss" v-if="item1.homeT.poss != 0 && item1.homeT.poss != null" class="detail" style="color: green">
                                            {{item1.homeT.poss}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.red" v-if="item1.homeT.red == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.red" v-if="item1.homeT.red == 0" class="detail" style="color: red">
                                            0
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.red" v-if="item1.homeT.red != 0 && item1.homeT.red != null" class="detail" style="color: green">
                                            {{item1.homeT.red}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div class="detail" style="color: green">
                                            -
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div class="detail_total" style="width: 26%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: black;">
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.home.on" v-if="item1.home.on >= 0" class="detail" style="color: green;">
                                            {{item1.home.on}}
                                        </div>
                                    </transition>

                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.home.off" v-if="item1.home.off >= 0" class="detail" style="color: green">
                                            {{item1.home.off}}
                                        </div>
                                    </transition>

                                    <transition name="slide-fade" mode="out-in">
                                        <div v-if="item1.homeT.blk > 0" class="detail" style="color: red">
                                            {{item1.home.blk}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-if="(item1.homeT.blk == 0 && item1.awayT.blk != 0)" class="detail" style="color: red">
                                            {{item1.home.blk}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.blk" v-if="item1.homeT.blk == null || (item1.homeT.blk == 0 && item1.awayT.blk == 0)" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>

                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.in" v-if="item1.homeT.in > 0" class="detail" style="color: green;">
                                            {{item1.home.in}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.in" v-if="item1.homeT.in == 0" class="detail" style="color: green;">
                                            {{item1.home.in}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.in" v-if="item1.homeT.in == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>

                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.out" v-if="item1.homeT.out > 0" class="detail" style="color: green">
                                            {{item1.home.out}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.out" v-if="item1.homeT.out == 0" class="detail" style="color: green">
                                            {{item1.home.out}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.out" v-if="item1.homeT.out == null" class="detail">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.cnr" v-if="item1.homeT.cnr == 0" class="detail" style="color: red">
                                            {{item1.home.cnr}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.cnr" v-if="item1.homeT.cnr > 0" class="detail" style="color: green">
                                            {{item1.home.cnr}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.homeT.cnr" v-if="item1.homeT.cnr == null" class="detail">
                                            -
                                        </div>
                                    </transition>

                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.home.da" v-if="item1.homeT.da == 0" class="detail" style="color: red">
                                            {{item1.home.da}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.home.da" v-if="item1.homeT.da > 0" class="detail" style="color: green">
                                            {{item1.home.da}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.home.poss" v-if="item1.home.poss == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.home.poss" v-if="item1.home.poss == 0" class="detail" style="color: red">
                                            0
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.home.poss" v-if="item1.home.poss != null && item1.home.poss != 0" class="detail" style="color: green">
                                            {{item1.home.poss}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.home.goal" v-if="item1.home.goal == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.home.goal" v-if="item1.home.goal != null" class="detail" style="color: green">
                                            {{item1.home.goal}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div class="detail" style="color: green">
                                            -
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div style="width: 10%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: white;">
                                    ...
                                </div>
                            </div>
                            <div style="width: 18%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: white;">
                                    ...
                                </div>
                            </div>
                            <!--  away team data part  Total-->
                            <div style="width: 16%; height: 30px; float: left; position: relative; top: 0px; border-bottom: 1px solid lightgray;">
                                <div style="width: 60px; float: left; color: white;">.</div>
                                <div v-if="item1.away.flash == 1" class="goalcelebration" style="width: calc(100% - 65px); float: left;">{{item1.main_data.away_name}} ({{item1.main_data.away_rank}})</div>
                                <div v-else style="width: calc(100% - 65px); float: left;">{{item1.main_data.away_name}} ({{item1.main_data.away_rank}})</div>
                            </div>
                            <div style="width: 5%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray;">
                                <div style="width: 100%; padding: 3px 7px; color: black;">
                                    <transition name="slide-fade" mode="out-in" class="livenow">
                                    </transition>
                                </div>
                            </div>
                            <div class="detail_total" style="width: 25%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray;">
                                <div style="width: 100%; padding: 3px 7px; color: black;">
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-if="item1.awayT.on == 0" class="detail" style="color: red;">
                                            {{item1.awayT.on}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.away_tooltip.on" :key="'tooltip' + item1.index0 + i + j + 17" v-if="item1.awayT.on > 0" class="detail" style="color: green;">
                                            {{item1.awayT.on}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.away_tooltip.off" :key="'tooltip' + item1.index0 + i + j + 18" v-if="item1.awayT.off == 0" class="detail" style="color: red">
                                            {{item1.awayT.off}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-if="item1.awayT.off > 0" v-c-tooltip="item1.away_tooltip.off" :key="'tooltip' + item1.index0 + i + j + 19" class="detail" style="color: green">
                                            {{item1.awayT.off}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.away_tooltip.blk" :key="'tooltip' + item1.index0 + i + j + 20" v-if="item1.awayT.blk > 0" class="detail" style="color: green">
                                            {{item1.awayT.blk}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.away_tooltip.blk" :key="'tooltip' + item1.index0 + i + j + 21" v-if="item1.awayT.blk == 0 && item1.homeT.blk != 0" class="detail" style="color: red">
                                            {{item1.awayT.blk}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="'tooltip' + item1.index0 + i + j + 22" v-if="item1.awayT.blk == null || (item1.awayT.blk == 0 && item1.homeT.blk == 0)" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div  v-c-tooltip="item1.away_tooltip.in" :key="'tooltip' + item1.index0 + i + j + 23" v-if="item1.awayT.in == 0" class="detail" style="color: red">
                                            {{item1.awayT.in}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-if="item1.awayT.in > 0" v-c-tooltip="item1.away_tooltip.in" :key="'tooltip' + item1.index0 + i + j + 24" class="detail" style="color: green;">
                                            {{item1.awayT.in}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="'tooltip' + item1.index0 + i + j + 25" v-if="item1.awayT.in == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.away_tooltip.out" :key="'tooltip' + item1.index0 + i + j + 26" v-if="item1.awayT.out == 0" class="detail" style="color: red">
                                            {{item1.awayT.out}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.away_tooltip.out" :key="'tooltip' + item1.index0 + i + j + 27" v-if="item1.awayT.out > 0" class="detail" style="color: green">
                                            {{item1.awayT.out}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="'tooltip' + item1.index0 + i + j + 28" v-if="item1.awayT.out == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.away_tooltip.cnr" :key="'tooltip' + item1.index0 + i + j + 29" v-if="item1.awayT.cnr == 0" class="detail" style="color: red">
                                            {{item1.awayT.cnr}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-c-tooltip="item1.away_tooltip.cnr" :key="'tooltip' + item1.index0 + i + j + 30" v-if="item1.awayT.cnr > 0" class="detail" style="color: green">
                                            {{item1.awayT.cnr}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-if="item1.awayT.cnr == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-if="item1.awayT.da == 0" class="detail" style="color: red">
                                            {{item1.awayT.da}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.da" v-if="item1.awayT.da > 0" class="detail" style="color: green">
                                            {{item1.awayT.da}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.poss" v-if="item1.awayT.poss == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.poss" v-if="item1.awayT.poss == 0" class="detail" style="color: red">
                                            0
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.poss" v-if="item1.awayT.poss != 0 && item1.awayT.poss != null" class="detail" style="color: green">
                                            {{item1.awayT.poss}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.red" v-if="item1.awayT.red == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.red" v-if="item1.awayT.red == 0" class="detail" style="color: red">
                                            0
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.red" v-if="item1.awayT.red > 0" class="detail" style="color: green">
                                            {{item1.awayT.red}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div class="detail" style="color: green">
                                            -
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div class="detail_total" style="width: 26%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray;">
                                <div style="width: 100%; padding: 3px 7px; color: black;">
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.on" v-if="item1.away.on == null" class="detail" style="color: red;">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.on" v-if="item1.away.on != null" class="detail" style="color: green;">
                                            {{item1.away.on}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.off" v-if="item1.away.off == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.off" v-if="item1.away.off != null" class="detail" style="color: green">
                                            {{item1.away.off}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.blk" v-if="item1.awayT.blk > 0" class="detail" style="color: green">
                                            {{item1.away.blk}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.blk" v-if="item1.awayT.blk == 0 && item1.homeT.blk != 0" class="detail" style="color: red">
                                            {{item1.away.blk}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.blk" v-if="item1.awayT.blk == null || (item1.awayT.blk == 0 && item1.homeT.blk == 0)" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.in" v-if="item1.awayT.in == 0" class="detail" style="color: red">
                                            {{item1.away.in}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.in" v-if="item1.awayT.in > 0" class="detail" style="color: green;">
                                            {{item1.away.in}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.in" v-if="item1.awayT.in == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>

                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.out" v-if="item1.awayT.out == 0" class="detail" style="color: red">
                                            {{item1.away.out}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.out" v-if="item1.awayT.out > 0" class="detail" style="color: green">
                                            {{item1.away.out}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.out" v-if="item1.awayT.out == null" class="detail">
                                            -
                                        </div>
                                    </transition>

                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.cnr" v-if="item1.awayT.cnr == 0" class="detail" style="color: red">
                                            {{item1.away.cnr}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.cnr" v-if="item1.awayT.cnr > 0" class="detail" style="color: green">
                                            {{item1.away.cnr}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.cnr" v-if="item1.awayT.cnr == null" class="detail">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div v-if="item1.away.da == 0" class="detail" style="color: red">
                                            {{item1.away.da}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.da" v-if="item1.away.da > 0" class="detail" style="color: green">
                                            {{item1.away.da}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.da" v-if="item1.away.da == null" class="detail" style="color: green">
                                            {{item1.away.da}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.awayT.poss" v-if="item1.away.poss == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.poss" v-if="item1.away.poss == 0" class="detail" style="color: red">
                                            0
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.poss" v-if="item1.away.poss != null && item1.away.poss != 0" class="detail" style="color: green">
                                            {{item1.away.poss}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.goal" v-if="item1.away.goal == null" class="detail" style="color: red">
                                            -
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div :key="item1.away.poss" v-if="item1.away.goal != null" class="detail" style="color: green">
                                            {{item1.away.goal}}
                                        </div>
                                    </transition>
                                    <transition name="slide-fade" mode="out-in">
                                        <div class="detail" style="color: green">
                                            -
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div style="width: 10%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray;">
                                <div style="width: 100%; padding: 3px 7px; color: white;">
                                    ...
                                </div>
                            </div>
                            <div style="width: 18%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray;">
                                <div style="width: 100%; padding: 3px 7px; color: white;">
                                    ...
                                </div>
                            </div>
                            <!--  home team data part  last 10 minutes-->
                            <CCollapse
                                v-if="isCollapsed1(item1.index0)" :show="isCollapsed1(item1.index0)" class="mt-0"
                            >
                                <div class = "bottom-part bottom-part1">
                                    <div class="header" style="width: 100%; height: 50px;">
                                        <div class="header-content detail_total" style="width: 25.5%; height: 50px; float: left; border-left: 1px solid whitesmoke">
                                            More info Total
                                            <div style="width: 100%">
                                                <div class="detail">
                                                    Pas
                                                </div>
                                                <div class="detail">
                                                    Acc
                                                </div>
                                                <div class="detail">
                                                    Atk
                                                </div>
                                                <div class="detail">
                                                    Ofs
                                                </div>
                                                <div class="detail">
                                                    Sav
                                                </div>
                                                <div class="detail">
                                                    Sbst
                                                </div>
                                                <div class="detail">
                                                    Fou
                                                </div>
                                                <div class="detail" style="min-width: 30px;">
                                                    G_att
                                                </div>
                                                <div class="detail">
                                                    Safe
                                                </div>
                                            </div>
                                        </div>
                                        <div class="header-content detail_total" style="width: 24%; height: 50px; float: left; border-left: 1px solid whitesmoke">
                                            Total Indexes
                                            <div style="width: 100%">
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    TSM
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    STPM
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    BS
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    C
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px; min-width: 32px;">
                                                    DAPM
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    SA
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    PA
                                                </div>
                                            </div>
                                        </div>
                                        <div class="header-content detail_total" style="width: 26.5%; height: 50px; float: left; border-left: 1px solid whitesmoke">
                                            More info last 10 minutes
                                            <div style="width: 100%">
                                                <div class="detail">
                                                    Pas
                                                </div>
                                                <div class="detail">
                                                    Acc
                                                </div>
                                                <div class="detail">
                                                    Atk
                                                </div>
                                                <div class="detail">
                                                    Ofs
                                                </div>
                                                <div class="detail">
                                                    Sav
                                                </div>
                                                <div class="detail">
                                                    Sbst
                                                </div>
                                                <div class="detail">
                                                    Fou
                                                </div>
                                                <div class="detail" style="min-width: 30px;">
                                                    G_att
                                                </div>
                                                <div class="detail">
                                                    Safe
                                                </div>
                                            </div>
                                        </div>
                                        <div class="header-content" style="width: 24%; height: 50px; float: left; border-left: 1px solid whitesmoke">
                                            Last 10 minutes Indexes
                                            <div style="width: 100%">
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    TSM
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    STPM
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    BS
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    C
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px; min-width: 32px;">
                                                    DAPM
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    SA
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    PA
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="detail_total" style="width: 25.5%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.pas" v-if="item1.homeT.pas == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.pas" v-if="item1.homeT.pas == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.pas" v-if="item1.homeT.pas != null && item1.homeT.pas != 0" class="detail" style="color: green">
                                                    {{item1.homeT.pas}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.acc" v-if="item1.homeT.acc == 0" class="detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.acc" v-if="item1.homeT.acc == null" class="detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.acc" v-if="item1.homeT.acc != 0 && item1.homeT.acc != null" class="detail" style="color: green">
                                                    {{item1.homeT.acc}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.atk" v-if="item1.homeT.atk == 0" class="detail" style="color: red">
                                                    {{item1.homeT.atk}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.atk" v-if="item1.homeT.atk == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.atk" v-if="item1.homeT.atk != 0 && item1.homeT.atk != null" class="detail" style="color: green">
                                                    {{item1.homeT.atk}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.ofs" v-if="item1.homeT.ofs == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.ofs" v-if="item1.homeT.ofs == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.ofs" v-if="item1.homeT.ofs != 0 && item1.homeT.ofs != null" class="detail" style="color: green">
                                                    {{item1.homeT.ofs}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.sav" v-if="item1.homeT.sav == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.sav" v-if="item1.homeT.sav == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.sav" v-if="item1.homeT.sav != 0 && item1.homeT.sav != null" class="detail" style="color: green">
                                                    {{item1.homeT.sav}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.sbst" v-if="item1.homeT.sbst == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.sbst" v-if="item1.homeT.sbst == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.sbst" v-if="item1.homeT.sbst != 0 && item1.homeT.sbst != null" class="detail" style="color: green">
                                                    {{item1.homeT.sbst}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.fou" v-if="item1.homeT.fou == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.fou" v-if="item1.homeT.fou == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.fou" v-if="item1.homeT.fou != 0 && item1.homeT.fou != null" class="detail" style="color: green">
                                                    {{item1.homeT.fou}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.g_att" v-if="item1.homeT.g_att == null" class="detail" style="color: red; min-width: 30px;">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.g_att" v-if="item1.homeT.g_att == 0" class="detail" style="color: red; min-width: 30px;">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.g_att" v-if="item1.homeT.g_att != 0 && item1.homeT.g_att != null" class="detail" style="color: green; min-width: 30px;">
                                                    {{item1.homeT.g_att}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.safe" v-if="item1.homeT.safe == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.safe" v-if="item1.homeT.safe == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.homeT.safe" v-if="item1.homeT.safe != 0 && item1.homeT.safe != null" class="detail" style="color: green">
                                                    {{item1.homeT.safe}}
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                    <div class="detail_total" style="width: 24%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time != 'HT'" :key="(item1.homeT.on + item1.homeT.off)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.homeT.on) + parseInt(item1.homeT.off))/parseInt(item1.home.time)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time == 'HT'" :key="(item1.homeT.on + item1.homeT.off)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.homeT.on) + parseInt(item1.homeT.off))/45).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time == 'HT'" :key="item1.homeT.on" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.homeT.on))/45).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time != 'HT'" :key="item1.homeT.on" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.homeT.on))/parseInt(item1.home.time)).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.homeT.blk != null && parseInt(item1.awayT.on) + parseInt(item1.awayT.off) != 0" :key="((parseInt(item1.homeT.blk))/(parseInt(item1.awayT.on) + parseInt(item1.awayT.off)))" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.homeT.blk))/(parseInt(item1.awayT.on) + parseInt(item1.awayT.off))).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.homeT.blk != null && parseInt(item1.awayT.on) + parseInt(item1.awayT.off) == 0" :key="((parseInt(item1.homeT.blk))/(parseInt(item1.awayT.on) + parseInt(item1.awayT.off)))" class="detail index_detail" style="color: green">
                                                    0.00
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.homeT.blk == null" :key="item1.homeT.blk" class="detail index_detail" style="color: green">
                                                    -
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.homeT.on != 0" :key="(parseInt(item1.home.score))/parseInt(item1.homeT.on)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.home.score))/parseInt(item1.homeT.on)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.homeT.on == 0" :key="(parseInt(item1.home.score))/parseInt(item1.homeT.on)" class="detail index_detail" style="color: green;">
                                                    0.00
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time != 'HT'" :key="item1.home.cnr" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.homeT.da))/parseInt(item1.home.time)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time == 'HT'" :key="item1.home.cnr" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.homeT.da))/45).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="(parseInt(item1.homeT.on) + parseInt(item1.homeT.off)) != 0" :key="(parseInt(item1.homeT.on)/(parseInt(item1.homeT.on) + parseInt(item1.homeT.off)))" class="detail index_detail" style="color: green">
                                                    {{(parseInt(item1.homeT.on)/(parseInt(item1.homeT.on) + parseInt(item1.homeT.off))).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="(parseInt(item1.homeT.on) + parseInt(item1.homeT.off)) == 0" :key="(parseInt(item1.homeT.on)/(parseInt(item1.homeT.on) + parseInt(item1.homeT.off)))" class="detail index_detail" style="color: green">
                                                    0.00
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.homeT.pas != 0 && item1.homeT.pas != null" :key="(parseInt(item1.homeT.on)/(parseInt(item1.homeT.on) + parseInt(item1.homeT.off)))" class="detail index_detail" style="color: green">
                                                    {{(parseInt(item1.homeT.acc)/parseInt(item1.homeT.pas)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.homeT.pas === 0 && item1.homeT.pas != null" :key="(parseInt(item1.homeT.on)/(parseInt(item1.homeT.on) + parseInt(item1.homeT.off)))" class="detail index_detail" style="color: green">
                                                    0.00
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.homeT.pas == null" :key="(parseInt(item1.homeT.on)/(parseInt(item1.homeT.on) + parseInt(item1.homeT.off)))" class="detail index_detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                    <div class="detail_total" style="width: 26.5%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.pas" v-if="item1.home.pas == null" class="detail">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.pas" v-if="item1.home.pas == 0" class="detail">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.pas" v-if="item1.home.pas > 0" class="detail" style="color: green">
                                                    {{item1.home.pas}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.acc" v-if="item1.home.acc == null" class="detail">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.acc" v-if="item1.home.acc == 0" class="detail">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.acc" v-if="item1.home.acc > 0" class="detail" style="color: green">
                                                    {{item1.home.acc}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.atk" v-if="item1.home.atk == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.atk" v-if="item1.home.atk == 0" class="detail" style="color: red">
                                                    {{item1.home.atk}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.atk" v-if="item1.home.atk > 0" class="detail" style="color: green">
                                                    {{item1.home.atk}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.ofs" v-if="item1.home.ofs == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.ofs" v-if="item1.home.ofs == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.ofs" v-if="item1.home.ofs > 0" class="detail" style="color: green">
                                                    {{item1.home.ofs}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.sav" v-if="item1.home.sav == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.sav" v-if="item1.home.sav == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.sav" v-if="item1.home.sav > 0" class="detail" style="color: green">
                                                    {{item1.home.sav}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.sbst" v-if="item1.home.sbst == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.sbst" v-if="item1.home.sbst >= 0" class="detail" style="color: green">
                                                    {{item1.home.sbst}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.fou" v-if="item1.home.fou == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.fou" v-if="item1.home.fou >= 0" class="detail" style="color: green">
                                                    {{item1.home.fou}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.g_att" v-if="item1.home.g_att == null" class="detail" style="color: red; min-width: 30px;">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.g_att" v-if="item1.home.g_att >= 0" class="detail" style="color: green; min-width: 30px;">
                                                    {{item1.home.g_att}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.safe" v-if="item1.home.safe == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home.safe" v-if="item1.home.safe >= 0" class="detail" style="color: green">
                                                    {{item1.home.safe}}
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                    <div class="detail_total" style="width: 24%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.time) < 10 && item1.home.time != 'HT'" :key="(item1.home.on + item1.home.off)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.home.on) + parseInt(item1.home.off))/parseInt(item1.home.time)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.time) >= 10 && item1.home.time != 'HT'" :key="(item1.home.on + item1.home.off)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.home.on) + parseInt(item1.home.off))/10).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time === 'HT'" :key="(item1.home.on + item1.home.off)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.home.on) + parseInt(item1.home.off))/10).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.time) < 10 && item1.home.time != 'HT'" :key="item1.home.on" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.home.on))/parseInt(item1.home.time)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.time) >= 10 && item1.home.time != 'HT'" :key="item1.home.on" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.home.on))/10).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time === 'HT'" :key="item1.home.on" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.home.on))/10).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.away.on) + parseInt(item1.away.off) != 0 && item1.home.blk != null" :key="((parseInt(item1.home.blk))/(parseInt(item1.away.on)+ parseInt(item1.away.off)))" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.home.blk))/(parseInt(item1.away.on) + parseInt(item1.away.off))).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.away.on) + parseInt(item1.away.off) == 0 && item1.home.blk != null" :key="((parseInt(item1.home.blk))/(parseInt(item1.away.on)+ parseInt(item1.away.off)))" class="detail index_detail" style="color: green">
                                                    0.00
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.blk == null" :key="item1.home.blk" class="detail index_detail" style="color: green">
                                                    -
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.on != 0" :key="(parseInt(item1.home.score))/parseInt(item1.home.on)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.home.goal))/parseInt(item1.home.on)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.on == 0" :key="(parseInt(item1.home.score))/parseInt(item1.home.on)" class="detail index_detail" style="color: green;">
                                                    0.00
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.time) < 10 && item1.home.time != 'HT'" :key="((parseInt(item1.home.da))/parseInt(item1.home.time))" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.home.da))/parseInt(item1.home.time)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.time) >= 10 && item1.home.time != 'HT'" :key="((parseInt(item1.home.da))/parseInt(item1.home.time))" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.home.da))/10).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time === 'HT'" :key="(parseInt(item1.home.da))" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.home.da))/10).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="(parseInt(item1.home.on) + parseInt(item1.home.off)) != 0" :key="(parseInt(item1.home.on)/(parseInt(item1.home.on) + parseInt(item1.home.off)))" class="detail index_detail" style="color: green">
                                                    {{(parseInt(item1.home.on)/(parseInt(item1.home.on) + parseInt(item1.home.off))).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="(parseInt(item1.home.on) + parseInt(item1.home.off)) == 0" :key="(parseInt(item1.home.on)/(parseInt(item1.home.on) + parseInt(item1.home.off)))" class="detail index_detail" style="color: green">
                                                    0.00
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.pas != 0 && item1.home.pas != null" :key="(parseInt(item1.home.on)/(parseInt(item1.home.on) + parseInt(item1.home.off)))" class="detail index_detail" style="color: green">
                                                    {{(parseInt(item1.home.acc)/parseInt(item1.home.pas)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.pas == 0 && item1.home.pas != null" :key="(parseInt(item1.home.on)/(parseInt(item1.home.on) + parseInt(item1.home.off)))" class="detail index_detail" style="color: green">
                                                    0.00
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.pas == null" :key="(parseInt(item1.home.on)/(parseInt(item1.home.on) + parseInt(item1.home.off)))" class="detail index_detail" style="color: green">
                                                    -
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                    <!--  away team data part  last 10 minutes-->
                                    <div class="detail_total" style="width: 25.5%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.pas" v-if="item1.awayT.pas == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.pas" v-if="item1.awayT.pas == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.pas" v-if="item1.awayT.pas > 0" class="detail" style="color: green">
                                                    {{item1.awayT.pas}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.acc" v-if="item1.awayT.acc == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.acc" v-if="item1.awayT.acc == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.acc" v-if="item1.awayT.acc > 0" class="detail" style="color: green">
                                                    {{item1.awayT.acc}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.atk" v-if="item1.awayT.atk == 0" class="detail" style="color: red">
                                                    {{item1.awayT.atk}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.atk" v-if="item1.awayT.atk > 0" class="detail" style="color: green">
                                                    {{item1.awayT.atk}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.ofs" v-if="item1.awayT.ofs == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.ofs" v-if="item1.awayT.ofs == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.ofs" v-if="item1.awayT.ofs > 0" class="detail" style="color: green">
                                                    {{item1.awayT.ofs}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.sav" v-if="item1.awayT.sav == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.sav" v-if="item1.awayT.sav == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.sav" v-if="item1.awayT.sav > 0" class="detail" style="color: green">
                                                    {{item1.awayT.sav}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.sbst" v-if="item1.awayT.sbst == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.sbst" v-if="item1.awayT.sbst == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.sbst" v-if="item1.awayT.sbst > 0" class="detail" style="color: green">
                                                    {{item1.awayT.sbst}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.fou" v-if="item1.awayT.fou == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.fou" v-if="item1.awayT.fou == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.fou" v-if="item1.awayT.fou > 0" class="detail" style="color: green">
                                                    {{item1.awayT.fou}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.g_att" v-if="item1.awayT.g_att == null" class="detail" style="color: red; min-width: 30px;">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.g_att" v-if="item1.awayT.g_att == 0" class="detail" style="color: red; min-width: 30px;">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.g_att" v-if="item1.awayT.g_att > 0" class="detail" style="color: green; min-width: 30px;">
                                                    {{item1.awayT.g_att}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.safe" v-if="item1.awayT.safe == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.safe" v-if="item1.awayT.safe == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.awayT.safe" v-if="item1.awayT.safe > 0" class="detail" style="color: green">
                                                    {{item1.awayT.safe}}
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                    <div class="detail_total" style="width: 24%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time != 'HT'" :key="((parseInt(item1.awayT.on) + parseInt(item1.awayT.off))/parseInt(item1.home.time))" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.awayT.on) + parseInt(item1.awayT.off))/parseInt(item1.home.time)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time == 'HT'" :key="(item1.awayT.on + item1.awayT.off)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.awayT.on) + parseInt(item1.awayT.off))/45).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time == 'HT'" :key="item1.homeT.on" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.awayT.on))/45).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time != 'HT'" :key="item1.awayT.on" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.awayT.on))/parseInt(item1.home.time)).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.awayT.blk != null && parseInt(item1.homeT.on) + parseInt(item1.homeT.off) != 0" :key="((parseInt(item1.homeT.blk))/(parseInt(item1.awayT.on) + parseInt(item1.awayT.off)))" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.awayT.blk))/(parseInt(item1.homeT.on) + parseInt(item1.homeT.off))).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.awayT.blk != null && parseInt(item1.homeT.on) + parseInt(item1.homeT.off) == 0" :key="((parseInt(item1.homeT.blk))/(parseInt(item1.awayT.on) + parseInt(item1.awayT.off)))" class="detail index_detail" style="color: green">
                                                    0.00
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.awayT.blk == null" :key="((parseInt(item1.homeT.blk))/(parseInt(item1.awayT.on) + parseInt(item1.awayT.off)))" class="detail index_detail" style="color: green">
                                                    -
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.awayT.on != 0" :key="(parseInt(item1.away.score))/parseInt(item1.awayT.on)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.away.score))/parseInt(item1.awayT.on)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.awayT.on == 0" :key="(parseInt(item1.home.score))/parseInt(item1.awayT.on)" class="detail index_detail" style="color: green;">
                                                    0.00
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time != 'HT'" :key="((parseInt(item1.awayT.da))/parseInt(item1.home.time))" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.awayT.da))/parseInt(item1.home.time)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time == 'HT'" :key="((parseInt(item1.awayT.da))/45)" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.awayT.da))/45).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="(parseInt(item1.awayT.on) + parseInt(item1.awayT.off)) != 0" :key="(parseInt(item1.awayT.on)/(parseInt(item1.awayT.on) + parseInt(item1.awayT.off)))" class="detail index_detail" style="color: green">
                                                    {{(parseInt(item1.awayT.on)/(parseInt(item1.awayT.on) + parseInt(item1.awayT.off))).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="(parseInt(item1.awayT.on) + parseInt(item1.awayT.off)) == 0" :key="(parseInt(item1.awayT.on)/(parseInt(item1.awayT.on) + parseInt(item1.awayT.off)))" class="detail index_detail" style="color: green">
                                                    0.00
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.awayT.pas != 0 && item1.awayT.pas != null" :key="(parseInt(item1.awayT.acc)/parseInt(item1.awayT.pas))" class="detail index_detail" style="color: green">
                                                    {{(parseInt(item1.awayT.acc)/parseInt(item1.awayT.pas)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.awayT.pas === 0 && item1.awayT.pas != null" :key="(parseInt(item1.awayT.acc)/parseInt(item1.awayT.pas))" class="detail index_detail" style="color: green">
                                                    0.00
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.awayT.pas == null" :key="(parseInt(item1.awayT.acc)/parseInt(item1.awayT.pas))" class="detail index_detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                    <div class="detail_total" style="width: 26.5%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.pas" v-if="item1.away.pas == null" class="detail">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.pas" v-if="item1.away.pas == 0" class="detail">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.pas" v-if="item1.away.pas > 0" class="detail" style="color: green">
                                                    {{item1.away.pas}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.acc" v-if="item1.away.acc == null" class="detail">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.acc" v-if="item1.away.acc == 0" class="detail">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.acc" v-if="item1.away.acc > 0" class="detail" style="color: green">
                                                    {{item1.away.acc}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.atk" v-if="item1.away.atk == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.atk" v-if="item1.away.atk == 0" class="detail" style="color: red">
                                                    {{item1.away.atk}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.atk" v-if="item1.away.atk > 0" class="detail" style="color: green">
                                                    {{item1.away.atk}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.ofs" v-if="item1.away.ofs == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.ofs" v-if="item1.away.ofs == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.ofs" v-if="item1.away.ofs > 0" class="detail" style="color: green">
                                                    {{item1.away.ofs}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.sav" v-if="item1.away.sav == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.sav" v-if="item1.away.sav == 0" class="detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.sav" v-if="item1.away.sav > 0" class="detail" style="color: green">
                                                    {{item1.away.sav}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.sbst" v-if="item1.away.sbst == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.sbst" v-if="item1.away.sbst >= 0" class="detail" style="color: green">
                                                    {{item1.away.sbst}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.fou" v-if="item1.away.fou == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.fou" v-if="item1.away.fou >= 0" class="detail" style="color: green">
                                                    {{item1.away.fou}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.g_att" v-if="item1.away.g_att == null" class="detail" style="color: red; min-width: 30px;">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.g_att" v-if="item1.away.g_att >= 0" class="detail" style="color: green; min-width: 30px;">
                                                    {{item1.away.g_att}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.safe" v-if="item1.away.safe == null" class="detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away.safe" v-if="item1.away.safe >= 0" class="detail" style="color: green">
                                                    {{item1.away.safe}}
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                    <div class="detail_total" style="width: 24%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.time) < 10 && item1.home.time != 'HT'" :key="(item1.away.on + item1.away.off)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.away.on) + parseInt(item1.away.off))/parseInt(item1.home.time)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.time) >= 10 && item1.home.time != 'HT'" :key="(item1.away.on + item1.away.off)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.away.on) + parseInt(item1.away.off))/10).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time === 'HT'" :key="(item1.away.on + item1.away.off)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.away.on) + parseInt(item1.away.off))/10).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.time) < 10 && item1.home.time != 'HT'" :key="item1.away.on" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.away.on))/parseInt(item1.home.time)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.time) >= 10 && item1.home.time != 'HT'" :key="item1.away.on" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.away.on))/10).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time === 'HT'" :key="item1.away.on" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.away.on))/10).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.on) + parseInt(item1.home.off) != 0 && item1.away.blk != null" :key="item1.away.blk" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.away.blk))/(parseInt(item1.home.on) + parseInt(item1.home.off))).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.on) + parseInt(item1.home.off) == 0 && item1.away.blk != null" :key="item1.away.blk" class="detail index_detail" style="color: green">
                                                    0.00
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.away.blk == null" class="detail index_detail" style="color: green">
                                                    -
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.away.on != 0" :key="(parseInt(item1.away.score))/parseInt(item1.away.on)" class="detail index_detail" style="color: green;">
                                                    {{((parseInt(item1.away.goal))/parseInt(item1.away.on)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.away.on == 0" :key="(parseInt(item1.away.score))/parseInt(item1.away.on)" class="detail index_detail" style="color: green;">
                                                    0.00
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.time) < 10 && item1.home.time != 'HT'" :key="((parseInt(item1.away.da))/parseInt(item1.away.time))" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.away.da))/parseInt(item1.home.time)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="parseInt(item1.home.time) >= 10 && item1.home.time != 'HT'" :key="((parseInt(item1.away.da))/parseInt(item1.away.time))" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.away.da))/10).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home.time === 'HT'" :key="(parseInt(item1.away.da))" class="detail index_detail" style="color: green">
                                                    {{((parseInt(item1.away.da))/10).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="(parseInt(item1.away.on) + parseInt(item1.away.off)) != 0" :key="(parseInt(item1.away.on)/(parseInt(item1.away.on) + parseInt(item1.away.off)))" class="detail index_detail" style="color: green">
                                                    {{(parseInt(item1.away.on)/(parseInt(item1.away.on) + parseInt(item1.away.off))).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="(parseInt(item1.away.on) + parseInt(item1.away.off)) == 0" :key="(parseInt(item1.away.on)/(parseInt(item1.away.on) + parseInt(item1.away.off)))" class="detail index_detail" style="color: green">
                                                    0.00
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.away.pas != 0 && item1.away.pas != null" :key="(parseInt(item1.away.on)/(parseInt(item1.away.on) + parseInt(item1.away.off)))" class="detail index_detail" style="color: green">
                                                    {{(parseInt(item1.away.acc)/parseInt(item1.away.pas)).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.away.pas == 0 && item1.away.pas != null" :key="(parseInt(item1.away.on)/(parseInt(item1.away.on) + parseInt(item1.away.off)))" class="detail index_detail" style="color: green">
                                                    0.00
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.away.pas == null" :key="(parseInt(item1.away.on)/(parseInt(item1.away.on) + parseInt(item1.away.off)))" class="detail index_detail" style="color: green">
                                                    -
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                </div>
                                <div class = "bottom-part">
                                    <div class="header" style="width: 100%; height: 50px;">
                                        <div class="header-content" style="text-align: center; padding-top: 20px; width: 2.5%; height: 50px; float: left; background: #8db4e2; border-left: 1px solid #ffffff;">
                                            P
                                        </div>
                                        <div class="header-content detail_total" style="width: 42%; height: 50px; float: left; border-left: 1px solid #ffffff; background: #8db4e2">
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
                                            </div>
                                        </div>
                                        <div class="header-content detail_total" style="width: 37.5%; height: 50px; float: left; border-left: 1px solid #ffffff; background: #8db4e2">
                                            Total Avg Stats
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
                                            </div>
                                        </div>
                                        <div class="header-content" style="width: 18%; height: 50px; float: left; border-left: 1px solid #ffffff; background: #8db4e2">
                                            Indexes
                                            <div style="width: 100%">
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    TSM
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    STPM
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    BS
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    C
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px; min-width: 32px;">
                                                    DAPM
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    SA
                                                </div>
                                                <div class="detail index_detail" style="font-size: 11px!important; padding-top: 2px;">
                                                    PA
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="width: 2.5%; height: 30px; float: left; border-left: 1px solid lightgray;">
                                        <div style="text-align: center;">{{item1.home_p}}</div>
                                    </div>
                                    <div class="detail_total season-stats-part" style="width: 42%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.goals" v-if="item1.home_season.goals == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.goals" v-if="item1.home_season.goals == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.goals" v-if="item1.home_season.goals != 0 && item1.home_season.goals != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.goals/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.on" v-if="item1.home_season.on == 0" class="detail season-detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.on" v-if="item1.home_season.on == null" class="detail season-detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.on" v-if="item1.home_season.on != null && item1.home_season.on != 0" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.on/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.off" v-if="item1.home_season.off == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.off" v-if="item1.home_season.off == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.off" v-if="item1.home_season.off != 0 && item1.home_season.off != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.off/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.blk" v-if="item1.home_season.blk == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.blk" v-if="item1.home_season.blk == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.blk" v-if="item1.home_season.blk != 0 && item1.home_season.blk != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.blk/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.in" v-if="item1.home_season.in == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.in" v-if="item1.home_season.in == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.in" v-if="item1.home_season.in != 0 && item1.home_season.in != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.in/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.out" v-if="item1.home_season.out == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.out" v-if="item1.home_season.out == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.out" v-if="item1.home_season.out != 0 && item1.home_season.out != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.out/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.cnr" v-if="item1.home_season.cnr == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.cnr" v-if="item1.home_season.cnr == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.cnr" v-if="item1.home_season.cnr != 0 && item1.home_season.cnr != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.cnr/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.da" v-if="item1.home_season.da == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.da" v-if="item1.home_season.da == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.da" v-if="item1.home_season.da != 0 && item1.home_season.da != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.da/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.pos" v-if="item1.home_season.pos == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.pos" v-if="item1.home_season.pos == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.pos" v-if="item1.home_season.pos != 0 && item1.home_season.pos != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.pos/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.pas" v-if="item1.home_season.pas == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.pas" v-if="item1.home_season.pas == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.pas" v-if="item1.home_season.pas != 0 && item1.home_season.pas != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.pas/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.acc" v-if="item1.home_season.acc == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.acc" v-if="item1.home_season.acc == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.acc" v-if="item1.home_season.acc != 0 && item1.home_season.acc != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.acc/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.atk" v-if="item1.home_season.atk == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.atk" v-if="item1.home_season.atk == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.atk" v-if="item1.home_season.atk != 0 && item1.home_season.atk != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.atk/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.ofs" v-if="item1.home_season.ofs == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.ofs" v-if="item1.home_season.ofs == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.ofs" v-if="item1.home_season.ofs != 0 && item1.home_season.ofs != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.ofs/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.sav" v-if="item1.home_season.sav == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.sav" v-if="item1.home_season.sav == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.sav" v-if="item1.home_season.sav != 0 && item1.home_season.sav != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.sav/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.sbst" v-if="item1.home_season.sbst == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.sbst" v-if="item1.home_season.sbst == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.sbst" v-if="item1.home_season.sbst != 0 && item1.home_season.sav != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.sbst/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.fou" v-if="item1.home_season.fou == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.fou" v-if="item1.home_season.fou == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.fou" v-if="item1.home_season.fou != 0 && item1.home_season.sav != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.fou/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.g_att" v-if="item1.home_season.g_att == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.g_att" v-if="item1.home_season.g_att == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.g_att" v-if="item1.home_season.g_att != 0 && item1.home_season.g_att != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.g_att/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.safe" v-if="item1.home_season.safe == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.safe" v-if="item1.home_season.safe == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.safe" v-if="item1.home_season.safe != 0 && item1.home_season.safe != null" class="detail season-detail" style="color: green">
                                                    {{(item1.home_season.safe/item1.home_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                        </div>
                                    </div>
                                    <div class="detail_total season-stats-part" style="width: 37.5%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.goals" v-if="item1.home_season.goals == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.goals" v-if="item1.home_season.goals == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.goals" v-if="item1.home_season.goals != 0 && item1.home_season.goals != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.goals}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.on" v-if="item1.home_season.on == 0" class="detail season-detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.on" v-if="item1.home_season.on == null" class="detail season-detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.on" v-if="item1.home_season.on != null && item1.home_season.on != 0" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.on}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.off" v-if="item1.home_season.off == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.off" v-if="item1.home_season.off == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.off" v-if="item1.home_season.off != 0 && item1.home_season.off != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.off}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.blk" v-if="item1.home_season.blk == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.blk" v-if="item1.home_season.blk == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.blk" v-if="item1.home_season.blk != 0 && item1.home_season.blk != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.blk}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.in" v-if="item1.home_season.in == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.in" v-if="item1.home_season.in == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.in" v-if="item1.home_season.in != 0 && item1.home_season.in != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.in}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.out" v-if="item1.home_season.out == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.out" v-if="item1.home_season.out == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.out" v-if="item1.home_season.out != 0 && item1.home_season.out != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.out}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.cnr" v-if="item1.home_season.cnr == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.cnr" v-if="item1.home_season.cnr == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.cnr" v-if="item1.home_season.cnr != 0 && item1.home_season.cnr != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.cnr}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.da" v-if="item1.home_season.da == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.da" v-if="item1.home_season.da == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.da" v-if="item1.home_season.da != 0 && item1.home_season.da != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.da}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.pos" v-if="item1.home_season.pos == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.pos" v-if="item1.home_season.pos == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.pos" v-if="item1.home_season.pos != 0 && item1.home_season.pos != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.pos}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.pas" v-if="item1.home_season.pas == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.pas" v-if="item1.home_season.pas == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.pas" v-if="item1.home_season.pas != 0 && item1.home_season.pas != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.pas}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.acc" v-if="item1.home_season.acc == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.acc" v-if="item1.home_season.acc == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.acc" v-if="item1.home_season.acc != 0 && item1.home_season.acc != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.acc}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.atk" v-if="item1.home_season.atk == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.atk" v-if="item1.home_season.atk == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.atk" v-if="item1.home_season.atk != 0 && item1.home_season.atk != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.atk}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.ofs" v-if="item1.home_season.ofs == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.ofs" v-if="item1.home_season.ofs == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.ofs" v-if="item1.home_season.ofs != 0 && item1.home_season.ofs != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.ofs}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.sav" v-if="item1.home_season.sav == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.sav" v-if="item1.home_season.sav == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.sav" v-if="item1.home_season.sav != 0 && item1.home_season.sav != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.sav}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.sbst" v-if="item1.home_season.sbst == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.sbst" v-if="item1.home_season.sbst == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.sbst" v-if="item1.home_season.sbst != 0 && item1.home_season.sav != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.sbst}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.fou" v-if="item1.home_season.fou == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.fou" v-if="item1.home_season.fou == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.fou" v-if="item1.home_season.fou != 0 && item1.home_season.sav != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.fou}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.g_att" v-if="item1.home_season.g_att == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.g_att" v-if="item1.home_season.g_att == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.g_att" v-if="item1.home_season.g_att != 0 && item1.home_season.g_att != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.g_att}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.safe" v-if="item1.home_season.safe == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.safe" v-if="item1.home_season.safe == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.home_season.safe" v-if="item1.home_season.safe != 0 && item1.home_season.safe != null" class="detail season-detail" style="color: green">
                                                    {{item1.home_season.safe}}
                                                </div>
                                            </transition>

                                        </div>
                                    </div>
                                    <div class="detail_total season-stats-part" style="width: 18%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div class="detail index_detail" style="color: green;">
                                                    {{((item1.home_season.on + item1.home_season.off)/90/item1.home_p).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div class="detail index_detail" style="color: green;">
                                                    {{((item1.home_season.on)/90/item1.home_p).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.home_season.blk" class="detail index_detail" style="color: green;">
                                                    {{((item1.home_season.blk)/item1.home_p).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="!item1.home_season.blk" class="detail index_detail" style="color: green;">
                                                    -
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div class="detail index_detail" style="color: green;">
                                                    {{((item1.home_season.goals)/(item1.home_season.on)).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div class="detail index_detail" style="color: green;">
                                                    {{((item1.home_season.da)/90/item1.home_p).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div class="detail index_detail" style="color: green;">
                                                    {{((item1.home_season.on)/(item1.home_season.on + item1.home_season.off)).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div class="detail index_detail" style="color: green;">
                                                    {{((item1.home_season.acc)/(item1.home_season.pas)).toFixed(2)}}
                                                </div>
                                            </transition>

                                        </div>
                                    </div>
                                    <!--  away team data part  last 10 minutes-->
                                    <div style="width: 2.5%; height: 30px; float: left; border-bottom: 1px solid lightgray; border-left: 1px solid lightgray;">
                                        <div style="text-align: center;">{{item1.away_p}}</div>
                                    </div>
                                    <div class="detail_total season-stats-part" style="width: 42%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.goals" v-if="item1.away_season.goals == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.goals" v-if="item1.away_season.goals == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.goals" v-if="item1.away_season.goals != 0 && item1.home_season.goals != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.goals/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.on" v-if="item1.away_season.on == 0" class="detail season-detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.on" v-if="item1.away_season.on == null" class="detail season-detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.on" v-if="item1.away_season.on != null && item1.home_season.on != 0" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.on/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.off" v-if="item1.away_season.off == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.off" v-if="item1.away_season.off == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.off" v-if="item1.away_season.off != 0 && item1.away_season.off != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.off/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.blk" v-if="item1.away_season.blk == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.blk" v-if="item1.away_season.blk == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.blk" v-if="item1.away_season.blk != 0 && item1.home_season.blk != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.blk/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.in" v-if="item1.away_season.in == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.in" v-if="item1.away_season.in == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.in" v-if="item1.away_season.in != 0 && item1.away_season.in != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.in/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.out" v-if="item1.away_season.out == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.out" v-if="item1.away_season.out == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.out" v-if="item1.away_season.out != 0 && item1.away_season.out != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.out/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.cnr" v-if="item1.away_season.cnr == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.cnr" v-if="item1.away_season.cnr == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.cnr" v-if="item1.away_season.cnr != 0 && item1.away_season.cnr != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.cnr/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.da" v-if="item1.away_season.da == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.da" v-if="item1.away_season.da == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.da" v-if="item1.away_season.da != 0 && item1.away_season.da != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.da/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.pos" v-if="item1.away_season.pos == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.pos" v-if="item1.away_season.pos == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.pos" v-if="item1.away_season.pos != 0 && item1.away_season.pos != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.pos/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.pas" v-if="item1.away_season.pas == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.pas" v-if="item1.away_season.pas == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.pas" v-if="item1.away_season.pas != 0 && item1.away_season.pas != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.pas/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.acc" v-if="item1.away_season.acc == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.acc" v-if="item1.away_season.acc == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.acc" v-if="item1.away_season.acc != 0 && item1.away_season.acc != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.acc/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.atk" v-if="item1.away_season.atk == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.atk" v-if="item1.away_season.atk == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.atk" v-if="item1.away_season.atk != 0 && item1.away_season.atk != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.atk/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.ofs" v-if="item1.away_season.ofs == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.ofs" v-if="item1.away_season.ofs == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.ofs" v-if="item1.away_season.ofs != 0 && item1.away_season.ofs != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.ofs/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.sav" v-if="item1.away_season.sav == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.sav" v-if="item1.away_season.sav == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.sav" v-if="item1.away_season.sav != 0 && item1.away_season.sav != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.sav/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.sbst" v-if="item1.away_season.sbst == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.sbst" v-if="item1.away_season.sbst == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.sbst" v-if="item1.away_season.sbst != 0 && item1.away_season.sav != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.sbst/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.fou" v-if="item1.away_season.fou == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.fou" v-if="item1.away_season.fou == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.fou" v-if="item1.away_season.fou != 0 && item1.away_season.sav != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.fou/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.g_att" v-if="item1.away_season.g_att == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.g_att" v-if="item1.away_season.g_att == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.g_att" v-if="item1.away_season.g_att != 0 && item1.away_season.g_att != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.g_att/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.safe" v-if="item1.away_season.safe == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.safe" v-if="item1.away_season.safe == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.safe" v-if="item1.away_season.safe != 0 && item1.away_season.safe != null" class="detail season-detail" style="color: green">
                                                    {{(item1.away_season.safe/item1.away_p).toFixed(1)}}
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                    <div class="detail_total season-stats-part" style="width: 37.5%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.goals" v-if="item1.away_season.goals == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.goals" v-if="item1.away_season.goals == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.goals" v-if="item1.away_season.goals != 0 && item1.home_season.goals != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.goals}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.on" v-if="item1.away_season.on == 0" class="detail season-detail" style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.on" v-if="item1.away_season.on == null" class="detail season-detail" style="color: red">
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.on" v-if="item1.away_season.on != null && item1.home_season.on != 0" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.on}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.off" v-if="item1.away_season.off == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.off" v-if="item1.away_season.off == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.off" v-if="item1.away_season.off != 0 && item1.away_season.off != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.off}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.blk" v-if="item1.away_season.blk == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.blk" v-if="item1.away_season.blk == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.blk" v-if="item1.away_season.blk != 0 && item1.home_season.blk != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.blk}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.in" v-if="item1.away_season.in == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.in" v-if="item1.away_season.in == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.in" v-if="item1.away_season.in != 0 && item1.away_season.in != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.in}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.out" v-if="item1.away_season.out == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.out" v-if="item1.away_season.out == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.out" v-if="item1.away_season.out != 0 && item1.away_season.out != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.out}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.cnr" v-if="item1.away_season.cnr == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.cnr" v-if="item1.away_season.cnr == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.cnr" v-if="item1.away_season.cnr != 0 && item1.away_season.cnr != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.cnr}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.da" v-if="item1.away_season.da == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.da" v-if="item1.away_season.da == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.da" v-if="item1.away_season.da != 0 && item1.away_season.da != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.da}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.pos" v-if="item1.away_season.pos == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.pos" v-if="item1.away_season.pos == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.pos" v-if="item1.away_season.pos != 0 && item1.away_season.pos != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.pos}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.pas" v-if="item1.away_season.pas == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.pas" v-if="item1.away_season.pas == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.pas" v-if="item1.away_season.pas != 0 && item1.away_season.pas != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.pas}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.acc" v-if="item1.away_season.acc == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.acc" v-if="item1.away_season.acc == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.acc" v-if="item1.away_season.acc != 0 && item1.away_season.acc != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.acc}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.atk" v-if="item1.away_season.atk == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.atk" v-if="item1.away_season.atk == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.atk" v-if="item1.away_season.atk != 0 && item1.away_season.atk != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.atk}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.ofs" v-if="item1.away_season.ofs == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.ofs" v-if="item1.away_season.ofs == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.ofs" v-if="item1.away_season.ofs != 0 && item1.away_season.ofs != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.ofs}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.sav" v-if="item1.away_season.sav == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.sav" v-if="item1.away_season.sav == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.sav" v-if="item1.away_season.sav != 0 && item1.away_season.sav != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.sav}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.sbst" v-if="item1.away_season.sbst == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.sbst" v-if="item1.away_season.sbst == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.sbst" v-if="item1.away_season.sbst != 0 && item1.away_season.sav != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.sbst}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.fou" v-if="item1.away_season.fou == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.fou" v-if="item1.away_season.fou == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.fou" v-if="item1.away_season.fou != 0 && item1.away_season.sav != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.fou}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.g_att" v-if="item1.away_season.g_att == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.g_att" v-if="item1.away_season.g_att == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.g_att" v-if="item1.away_season.g_att != 0 && item1.away_season.g_att != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.g_att}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.safe" v-if="item1.away_season.safe == 0" class="detail season-detail"  style="color: red">
                                                    0
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.safe" v-if="item1.away_season.safe == null" class="detail season-detail" >
                                                    -
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div :key="item1.away_season.safe" v-if="item1.away_season.safe != 0 && item1.away_season.safe != null" class="detail season-detail" style="color: green">
                                                    {{item1.away_season.safe}}
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                    <div class="detail_total season-stats-part" style="width: 18%; height: 30px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray;">
                                        <div style="width: 100%; padding: 3px 7px; color: black;">
                                            <transition name="slide-fade" mode="out-in">
                                                <div class="detail index_detail" style="color: green;">
                                                    {{((item1.away_season.on + item1.away_season.off)/90/item1.away_p).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div class="detail index_detail" style="color: green;">
                                                    {{((item1.away_season.on)/90/item1.away_p).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="item1.away_season.blk" class="detail index_detail" style="color: green;">
                                                    {{((item1.away_season.blk)/item1.away_p).toFixed(2)}}
                                                </div>
                                            </transition>
                                            <transition name="slide-fade" mode="out-in">
                                                <div v-if="!item1.away_season.blk" class="detail index_detail" style="color: green;">
                                                    -
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div class="detail index_detail" style="color: green;">
                                                    {{((item1.away_season.goals)/(item1.away_season.on)).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div class="detail index_detail" style="color: green;">
                                                    {{((item1.away_season.da)/90/item1.away_p).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div class="detail index_detail" style="color: green;">
                                                    {{((item1.away_season.on)/(item1.away_season.on + item1.away_season.off)).toFixed(2)}}
                                                </div>
                                            </transition>

                                            <transition name="slide-fade" mode="out-in">
                                                <div class="detail index_detail" style="color: green;">
                                                    {{((item1.away_season.acc)/(item1.away_season.pas)).toFixed(2)}}
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                </div>
                            </CCollapse>
                        </div>
                    </div>
                </CTab>
                <CTab :title="'Finished Games('+finishedLength+')'">
                    <div v-for="item in finishedArray" :key="item.league" class="finished-tab">
                        <div v-if="item.events.length > 0 && item.league"  class="header" style="width: 50%; height: 50px;">
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
                                        Rtg
                                    </div>
                                </div>
                            </div>
                            <div class="header-content" style="width: 15%; height: 50px; float: left; border-left: 1px solid whitesmoke">
                                <p style="text-align: center;">Cards</p>
                                <img src="/img/box-yellow.png" width="20px;" style="position: relative; top: -15px; left: -10px;"/>
                                <img src="/img/box-red.png" width="20px;" style="position: relative; top: -15px; left: 10px"/>
                            </div>
                        </div>
                        <div v-for="item1 in item.events" :key="item1.away_id" class="content" style="width: 50%; height: 62px; font-weight: 600;">
                            <!--                             home team data part  -->
                            <div style="width: 30%; height: 31px; float: left;">
                                <div style="width: 40px; float: left;position: relative; top:  23px; left: 15px; font-size: 17px; font-weight: normal">{{item1.time.status}}</div>
                                <div style="width: calc(100% - 70px); float: left;">{{item1.localTeamName}}</div>
                            </div>
                            <div style="width: 55%; height: 31px; float: left; border-left: 1px solid #e2e2e2;">
                                <div style="width: 100%; padding: 3px 7px; color: black;">

                                    <div class="detail" style="color: black;">
                                        {{item1.stats[0].shots.ongoal}}
                                    </div>

                                    <div class="detail" style="color: black">
                                        {{item1.stats[0].shots.offgoal}}
                                    </div>

                                    <div v-if="item1.stats[0].shots.blocked != null" class="detail" style="color: black">
                                        {{item1.stats[0].shots.blocked}}
                                    </div>
                                    <div v-else class="detail" style="color: black;">
                                        -
                                    </div>

                                    <div v-if="item1.stats[0].shots.insidebox != null" class="detail" style="color: black">
                                        {{item1.stats[0].shots.insidebox}}
                                    </div>
                                    <div v-else class="detail" style="color: black">
                                        -
                                    </div>

                                    <div v-if="item1.stats[0].shots.outsidebox != null" class="detail" style="color: black;">
                                        {{item1.stats[0].shots.outsidebox}}
                                    </div>
                                    <div v-else class="detail">
                                        -
                                    </div>

                                    <div v-if="item1.stats[0].corners != null" class="detail" style="color: black">
                                        {{item1.stats[0].corners}}
                                    </div>
                                    <div v-else class="detail">
                                        -
                                    </div>

                                    <div v-if="item1.stats[0].attacks != null" class="detail" style="color: black">
                                        {{item1.stats[0].attacks.dangerous_attacks}}
                                    </div>
                                    <div v-else class="detail" style="color: black">
                                        -
                                    </div>

                                    <div v-if="item1.stats[0].possessiontime != null" class="detail" style="color: black;">
                                        {{item1.stats[0].possessiontime}}
                                    </div>
                                    <div v-else class="detail">
                                        -
                                    </div>
                                    <div class="detail">
                                        -
                                    </div>
                                </div>
                            </div>
                            <div style="width: 15%; height: 31px; float: left; border-left: 1px solid #e2e2e2; border-right: 1px solid #e2e2e2; padding: 0px 10px; text-align: center;">
                                <div class="detail" style="width: 50%; position: relative; left: -4px;">{{item1.stats[0].yellowcards}}</div>
                                <div class="detail" style="width: 50%; position: relative; left: 3px;">{{item1.stats[0].redcards}}</div>
                            </div>
                            <!--                             away team data part  -->
                            <div style="width: 30%; height: 31px; float: left; border-bottom: 1px solid lightgray">
                                <div style="width: 40px; float: left; color: white;">.</div>
                                <div style="width: calc(100% - 70px); float: left;">{{item1.visitorTeamName}}</div>
                                <div style="width: 30px; float: left; font-size: 17px; font-weight: 600; position: relative; top: -15px; left: -10px;">{{item1.scores.localteam_score}} - {{item1.scores.visitorteam_score}}</div>
                            </div>
                            <div style="width: 55%; height: 31px; float: left; border-left: 1px solid #e2e2e2; border-bottom: 1px solid lightgray">
                                <div style="width: 100%; padding: 3px 7px; color: black;">

                                    <div class="detail" style="color: black;">
                                        {{item1.stats[1].shots.ongoal}}
                                    </div>

                                    <div class="detail" style="color: black">
                                        {{item1.stats[1].shots.offgoal}}
                                    </div>

                                    <div v-if="item1.stats[1].shots.blocked != null" class="detail" style="color: black">
                                        {{item1.stats[1].shots.blocked}}
                                    </div>
                                    <div v-else class="detail" style="color: black;">
                                        -
                                    </div>

                                    <div v-if="item1.stats[1].shots.insidebox != null" class="detail" style="color: black">
                                        {{item1.stats[1].shots.insidebox}}
                                    </div>
                                    <div v-else class="detail" style="color: black">
                                        -
                                    </div>

                                    <div v-if="item1.stats[1].shots.outsidebox != null" class="detail" style="color: black;">
                                        {{item1.stats[1].shots.outsidebox}}
                                    </div>
                                    <div v-else class="detail">
                                        -
                                    </div>

                                    <div v-if="item1.stats[1].corners != null" class="detail" style="color: black">
                                        {{item1.stats[1].corners}}
                                    </div>
                                    <div v-else class="detail">
                                        -
                                    </div>

                                    <div v-if="item1.stats[1].attacks.dangerous_attacks != null" class="detail" style="color: black">
                                        {{item1.stats[1].attacks.dangerous_attacks}}
                                    </div>
                                    <div v-else class="detail" style="color: black">
                                        -
                                    </div>


                                    <div v-if="item1.stats[1].possessiontime != null" class="detail" style="color: black;">
                                        {{item1.stats[1].possessiontime}}
                                    </div>
                                    <div v-else class="detail">
                                        -
                                    </div>
                                    <div class="detail">
                                        -
                                    </div>
                                </div>
                            </div>
                            <div style="width: 15%; height: 31px; float: left; border-left: 1px solid #e2e2e2; border-right: 1px solid #e2e2e2; padding: 0px 10px; text-align: center; border-bottom: 1px solid lightgray">
                                <div class="detail" style="width: 50%; position: relative; left: -4px;">{{item1.stats[1].yellowcards}}</div>
                                <div class="detail" style="width: 50%; position: relative; left: 3px;">{{item1.stats[1].redcards}}</div>
                            </div>
                        </div>
                    </div>
                </CTab>
                <CTab title="My Games">
                    My game content tabs
                    <!--                    <Plotly :data="data" :layout="layout" :display-mode-bar="false"></Plotly>-->
                    <!--                    <vue-plotly :data="data" :layout="layout" :options="options"/>-->
                </CTab>
            </CTabs>
        </CCard>
    </div>
</template>

<script>
    // import { Plotly } from 'vue-plotly'
    import VuePlotly from '@statnett/vue-plotly'
    export default {
        name: 'LiveStats',
        components: {
            // Plotly
            // VuePlotly
        },
        data () {
            return {
                eventArray:[],
                scheduleArray:[],
                liveNumbers: 0,
                liveDataArray:[],
                scheduleLength:0,
                finishedArray:[],
                finishedLength:0,
                collapsed1:[],
                data: [{ x: [1, 3], y: [2, 4] },{ x: [1, 4], y: [2, 6] }],
                layout: {},
                options: {}
            }
        },
        methods: {
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
            readData(){
                window.axios.post(`${process.env.VUE_APP_URL}getLiveStats`).then(({data})=> {
                    this.liveDataArray = data.data[1]
                    let main_data = data.data[0]
                    let competitionArray = []
                    let index = 0
                    for(let i = 0 ; i < main_data.length ; i++){
                        if((main_data[i].time.status == 'LIVE' || main_data[i].time.status == 'HT' || main_data[i].time.status == 'ET') && main_data[i].stats.length > 0){
                            if (main_data[i].competitions.length) {
                                index++
                                competitionArray[index - 1] = main_data[i].competitions[0].league
                            }
                        }
                    }
                    competitionArray = Array.from(new Set (competitionArray))

                    let k = 0
                    this.eventArray = []
                    for(let i = 0 ; i < competitionArray.length ; i++){
                        this.eventArray.push({'league': competitionArray[i], 'events': []})
                        for(let j = 0 ; j < main_data.length ; j++) {
                            let current_main_data = {...main_data[j]};
                            //console.log('current_main_data', current_main_data)
                            if(current_main_data.stats.length > 0 && current_main_data.competitions.length){
                                if((current_main_data.competitions[0].league == competitionArray[i] && current_main_data.time.status == 'LIVE') || (current_main_data.competitions[0].league == competitionArray[i] && current_main_data.time.status == 'HT') || (current_main_data.competitions[0].league == competitionArray[i] && current_main_data.time.status == 'ET')){
                                    // console.log(current_main_data)
                                    let home = {
                                        'id': 0,
                                        'on': 0,
                                        'off': 0,
                                        'blk': 0,
                                        'in': 0,
                                        'out': 0,
                                        'cnr': 0,
                                        'da': 0,
                                        'goal': 0,
                                        'rtg': 0,
                                        'time': '',
                                        'score': 0,
                                        'flash': 0,
                                        'poss': 0,
                                        'pas': 0,
                                        'acc': 0,
                                        'atk': 0,
                                        'ofs': 0,
                                        'sav': 0,
                                        'sbst': 0,
                                        'red': 0,
                                        'fou': 0,
                                        'g_att': 0,
                                        'safe': 0
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
                                        'fou': 0,
                                        'g_att': 0,
                                        'safe': 0
                                    }
                                    let away = {
                                        'id': 0,
                                        'on': 0,
                                        'off': 0,
                                        'blk': 0,
                                        'in': 0,
                                        'out': 0,
                                        'cnr': 0,
                                        'da': 0,
                                        'goal': 0,
                                        'rtg': 0,
                                        'time': 0,
                                        'score': 0,
                                        'poss': 0,
                                        'pas': 0,
                                        'acc': 0,
                                        'atk': 0,
                                        'ofs': 0,
                                        'sav': 0,
                                        'sbst': 0,
                                        'red': 0,
                                        'fou': 0,
                                        'g_att': 0,
                                        'safe': 0
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
                                        'fou': 0,
                                        'g_att': 0,
                                        'safe': 0
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
                                    home.id = current_main_data.home_id
                                    away.id = current_main_data.away_id
                                    let home_poss_index = 0
                                    let away_poss_index = 0

                                    let current_data_stats0
                                    let current_data_stats1
                                    if(current_main_data.season_stats.length > 0){
                                        for(let u = 0 ; u < current_main_data.season_stats.length ; u++){
                                            if(current_main_data.season_stats[u].stats){
                                                if(current_main_data.season_stats[u].stats.length > 0){
                                                    for(let uu = 0 ; uu < current_main_data.season_stats[u].stats.length ; uu++){
                                                        let stats = {...current_main_data.season_stats[u].stats[uu]}
                                                        if (stats.stats)
                                                            stats = {...stats.stats}
                                                        if(stats[0]){
                                                            current_data_stats0 = {...stats[0]}
                                                            current_data_stats1 = {...stats[1]}
                                                            if(current_data_stats0.team_id == home.id){
                                                                home_p++
                                                                if(current_data_stats0.shots){
                                                                    home_season.on = home_season.on + current_data_stats0.shots.ongoal
                                                                    home_season.off = home_season.off + current_data_stats0.shots.offgoal
                                                                    home_season.block = home_season.block + current_data_stats0.shots.block
                                                                    home_season.in = home_season.in + current_data_stats0.shots.insidebox
                                                                    home_season.out = home_season.out + current_data_stats0.shots.outsidebox
                                                                }

                                                                if(current_data_stats0.goals){
                                                                    home_season.goals = home_season.goals + current_data_stats0.goals
                                                                }
                                                                if(current_data_stats0.corners != null){
                                                                    home_season.cnr = home_season.cnr + current_data_stats0.corners
                                                                }
                                                                if(current_data_stats0.attacks != null){
                                                                    home_season.da = home_season.da + current_data_stats0.attacks.dangerous_attacks
                                                                }
                                                                if(current_data_stats0.possessiontime){
                                                                    home_poss_index++
                                                                    home_season.pos = home_season.pos + current_data_stats0.possessiontime
                                                                }
                                                                if(current_data_stats0.passes){
                                                                    home_season.pas = home_season.pas + current_data_stats0.passes.total
                                                                }
                                                                if(current_data_stats0.passes){
                                                                    home_season.acc = home_season.acc + current_data_stats0.passes.accurate
                                                                }
                                                                if(current_data_stats0.attacks){
                                                                    home_season.atk = home_season.atk + current_data_stats0.attacks.attacks
                                                                }
                                                                if(current_data_stats0.offsides){
                                                                    home_season.ofs = home_season.ofs + current_data_stats0.offsides
                                                                }
                                                                if(current_data_stats0.saves){
                                                                    home_season.sav = home_season.sav + current_data_stats0.saves
                                                                }
                                                                if(current_data_stats0.saves){
                                                                    home_season.sbst = home_season.sbst + current_data_stats0.substitutions
                                                                }
                                                                if(current_data_stats0.fouls){
                                                                    home_season.fou = home_season.fou + current_data_stats0.fouls
                                                                }
                                                                if(current_data_stats0.goal_attempts){
                                                                    home_season.g_att = home_season.g_att + current_data_stats0.goal_attempts
                                                                }
                                                                if(current_data_stats0.ball_safe){
                                                                    home_season.safe = home_season.safe + current_data_stats0.ball_safe
                                                                }
                                                            }
                                                            if(current_data_stats1.team_id == away.id){
                                                                away_p++
                                                                if(current_data_stats1.shots){
                                                                    away_season.on = home_season.on + current_data_stats1.shots.ongoal
                                                                    away_season.off = home_season.off + current_data_stats1.shots.offgoal

                                                                    if(current_data_stats0.shots.block != null){
                                                                        away_season.block = home_season.block + current_data_stats1.shots.block
                                                                    }
                                                                    if(current_data_stats0.shots.insidebox != null){
                                                                        away_season.in = home_season.in + current_data_stats1.shots.insidebox
                                                                    }
                                                                    if(current_data_stats0.shots.outsidebox != null){
                                                                        away_season.out = home_season.out + current_data_stats1.shots.outsidebox
                                                                    }
                                                                }
                                                                if(current_data_stats1.goals){
                                                                    away_season.goals = away_season.goals + current_data_stats1.goals
                                                                }

                                                                if(current_data_stats0.corners != null){
                                                                    away_season.cnr = home_season.cnr + current_data_stats1.corners
                                                                }
                                                                if(current_data_stats0.attacks != null){
                                                                    away_season.da = home_season.da + current_data_stats1.attacks.dangerous_attacks
                                                                }
                                                                if(current_data_stats0.possessiontime){
                                                                    away_poss_index++
                                                                    away_season.pos = home_season.pos + current_data_stats1.possessiontime
                                                                }
                                                                if(current_data_stats0.passes){
                                                                    away_season.pas = home_season.pas + current_data_stats1.passes.total
                                                                }
                                                                if(current_data_stats0.passes){
                                                                    away_season.acc = home_season.acc + current_data_stats1.passes.accurate
                                                                }
                                                                if(current_data_stats0.attacks){
                                                                    away_season.atk = home_season.atk + current_data_stats1.attacks.attacks
                                                                }
                                                                if(current_data_stats0.offsides){
                                                                    away_season.ofs = home_season.ofs + current_data_stats1.offsides
                                                                }
                                                                if(current_data_stats0.saves){
                                                                    away_season.sav = home_season.sav + current_data_stats1.saves
                                                                }
                                                                if(current_data_stats0.saves){
                                                                    away_season.sbst = home_season.sbst + current_data_stats1.substitutions
                                                                }
                                                                if(current_data_stats0.fouls){
                                                                    away_season.fou = home_season.fou + current_data_stats1.fouls
                                                                }
                                                                if(current_data_stats0.goal_attempts){
                                                                    away_season.g_att = home_season.g_att + current_data_stats1.goal_attempts
                                                                }
                                                                if(current_data_stats0.ball_safe){
                                                                    away_season.safe = home_season.safe + current_data_stats1.ball_safe
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    home.score = current_main_data.scores.localteam_score
                                    away.score = current_main_data.scores.visitorteam_score

                                    let goal_tooltip = ''
                                    if(current_main_data.goal_tooltip){
                                        goal_tooltip = current_main_data.goal_tooltip
                                    }

                                    let home_tooltip = {
                                        'on': '',
                                        'off': '',
                                        'in': '',
                                        'out': '',
                                        'blk': ''
                                    }
                                    let away_tooltip = {
                                        'on': '',
                                        'off': '',
                                        'in': '',
                                        'out': '',
                                        'blk': ''
                                    }

                                    if(current_main_data.home_tooltip){
                                        home_tooltip = {...current_main_data.home_tooltip}
                                    }
                                    if(current_main_data.away_tooltip){
                                        away_tooltip = {...current_main_data.away_tooltip}
                                    }

                                    home.time = current_main_data.time.minute
                                    if (current_main_data.time.injury_time > 0) {
                                        home.time = current_main_data.time.minute + '+' + current_main_data.time.injury_time + "'"
                                    }
                                    if (current_main_data.time.status == 'HT') {
                                        home.time = 'HT'
                                    }

                                    //---------Last 10 min Part----------//
                                    let stats = current_main_data.stats
                                    let stats_ten = current_main_data.stats_ten
                                    let current_data_home_stats, current_data_away_stats, current_data_home_stats_ten, current_data_away_stats_ten
                                    if (stats_ten) {
                                        // console.log('stats_ten', stats_ten)
                                        // if(!stats_ten[0]){return}
                                        if(stats_ten.length && stats_ten[0].length > 0){
                                            if (current_main_data.home_id == stats_ten[0][0].team_id) {
                                                current_data_home_stats = {...stats[0]}
                                                current_data_away_stats = {...stats[1]}
                                                current_data_home_stats_ten = {...stats_ten[0][0]}
                                                current_data_away_stats_ten = {...stats_ten[0][1]}

                                                if(current_data_home_stats.shots && current_data_home_stats_ten.shots){
                                                    home.on = current_data_home_stats.shots.ongoal - current_data_home_stats_ten.shots.ongoal
                                                    away.on = current_data_home_stats_ten.shots.ongoal - current_data_away_stats_ten.shots.ongoal
                                                    home.off = current_data_home_stats.shots.offgoal - current_data_home_stats_ten.shots.offgoal
                                                    away.off = current_data_away_stats.shots.offgoal - current_data_away_stats_ten.shots.offgoal
                                                    if(current_data_home_stats.shots.blocked){
                                                        home.blk = current_data_home_stats.shots.blocked - current_data_home_stats_ten.shots.blocked
                                                        away.blk = current_data_away_stats.shots.blocked - current_data_away_stats_ten.shots.blocked
                                                    }
                                                    else{
                                                        home.blk = null
                                                        away.blk = null
                                                    }
                                                    if(current_data_home_stats.shots.insidebox){
                                                        home.in = current_data_home_stats.shots.insidebox - current_data_home_stats_ten.shots.insidebox
                                                        away.in = current_data_away_stats.shots.insidebox - current_data_away_stats_ten.shots.insidebox
                                                    }
                                                    else{
                                                        home.in = null
                                                        away.in = null
                                                    }
                                                    if(current_data_home_stats.shots.outsidebox){
                                                        home.out = current_data_home_stats.shots.outsidebox - current_data_home_stats_ten.shots.outsidebox
                                                        away.out = current_data_away_stats.shots.outsidebox - current_data_away_stats_ten.shots.outsidebox
                                                    }
                                                }

                                                home.cnr = current_data_home_stats.corners - current_data_home_stats_ten.corners
                                                away.cnr = current_data_away_stats.corners - current_data_away_stats_ten.corners
                                                if (!current_data_home_stats.corners) {
                                                    home.cnr = null
                                                    away.cnr = null
                                                }

                                                if(current_data_home_stats.attacks && current_data_home_stats_ten.attacks){
                                                    home.da = current_data_home_stats.attacks.dangerous_attacks - current_data_home_stats_ten.attacks.dangerous_attacks
                                                    away.da = current_data_away_stats.attacks.dangerous_attacks - current_data_away_stats_ten.attacks.dangerous_attacks

                                                    home.atk = current_data_home_stats.attacks.attacks - current_data_home_stats_ten.attacks.attacks
                                                    away.atk = current_data_away_stats.attacks.attacks - current_data_away_stats_ten.attacks.attacks
                                                }

                                                home.goal = current_data_home_stats.goals - current_data_home_stats_ten.goals
                                                away.goal = current_data_away_stats.goals - current_data_away_stats_ten.goals

                                                home.poss = current_data_home_stats_ten.possessiontime
                                                away.poss = 100 - home.poss
                                                if (home.poss === null || home.poss === 0) {
                                                    away.poss = 0
                                                }

                                                if (current_data_home_stats.passes && current_data_home_stats_ten.passes) {
                                                    home.pas = current_data_home_stats.passes.total - current_data_home_stats_ten.passes.total
                                                    away.pas = current_data_away_stats.passes.total - current_data_away_stats_ten.passes.total
                                                } else {
                                                    home.pas = null
                                                    away.pas = null
                                                }

                                                if (current_data_home_stats.passes && current_data_home_stats_ten.passes) {
                                                    home.acc = current_data_home_stats.passes.accurate - current_data_home_stats_ten.passes.accurate
                                                    away.acc = current_data_away_stats.passes.accurate - current_data_away_stats_ten.passes.accurate
                                                } else {
                                                    home.acc = null
                                                    away.acc = null
                                                }

                                                home.ofs = current_data_home_stats.offsides - current_data_home_stats_ten.offsides
                                                away.ofs = current_data_away_stats.offsides - current_data_away_stats_ten.offsides

                                                if (!current_data_home_stats.offsides) {
                                                    home.ofs = null
                                                    away.ofs = null
                                                }
                                                home.sav = current_data_home_stats.saves - current_data_home_stats_ten.saves
                                                away.sav = current_data_away_stats.saves - current_data_away_stats_ten.saves
                                                if (!current_data_home_stats.saves) {
                                                    home.sav = null
                                                    away.sav = null
                                                }
                                                if (current_data_home_stats.substitutions != null) {
                                                    home.sbst = current_data_home_stats.substitutions - current_data_home_stats_ten.substitutions
                                                    away.sbst = current_data_away_stats.substitutions - current_data_away_stats_ten.substitutions
                                                } else {
                                                    home.sbst = null
                                                    away.sbst = null
                                                }

                                                home.red = current_data_home_stats.redcards - current_data_home_stats_ten.redcards
                                                away.red = current_data_away_stats.redcards - current_data_away_stats_ten.redcards
                                                if (!current_data_home_stats.redcards) {
                                                    home.red = null
                                                    away.red = null
                                                }
                                                home.fou = current_data_home_stats.fouls - current_data_home_stats_ten.fouls
                                                away.fou = current_data_away_stats.fouls - current_data_away_stats_ten.fouls

                                                if (!current_data_home_stats.fouls) {
                                                    home.fou = null
                                                    away.fou = null
                                                }
                                                if (current_data_home_stats.goal_attempts != null) {
                                                    home.g_att = current_data_home_stats.goal_attempts - current_data_home_stats_ten.goal_attempts
                                                    away.g_att = current_data_away_stats.goal_attempts - current_data_away_stats_ten.goal_attempts
                                                } else {
                                                    home.g_att = null
                                                    away.g_att = null
                                                }

                                                if (current_data_home_stats.ball_safe != null) {
                                                    home.safe = current_data_home_stats.ball_safe - current_data_home_stats_ten.ball_safe
                                                    away.safe = current_data_away_stats.ball_safe - current_data_away_stats_ten.ball_safe
                                                } else {
                                                    home.safe = null
                                                    away.safe = null
                                                }
                                            }
                                            else {

                                                current_data_home_stats = {...stats[1]}
                                                current_data_away_stats = {...stats[0]}
                                                current_data_home_stats_ten = {...stats_ten[0][1]}
                                                current_data_away_stats_ten = {...stats_ten[0][0]}

                                                home.on = current_data_home_stats.shots.ongoal - current_data_home_stats_ten.shots.ongoal
                                                away.on = current_data_away_stats.shots.ongoal - current_data_away_stats_ten.shots.ongoal
                                                home.off = current_data_home_stats.shots.offgoal - current_data_home_stats_ten.shots.offgoal
                                                away.off = current_data_away_stats.shots.offgoal - current_data_away_stats_ten.shots.offgoal
                                                home.blk = current_data_home_stats.shots.blocked - current_data_home_stats_ten.shots.blocked
                                                away.blk = current_data_away_stats.shots.blocked - current_data_away_stats_ten.shots.blocked
                                                if (!current_data_away_stats.shots.blocked) {
                                                    home.blk = null
                                                    away.blk = null
                                                }
                                                home.in = current_data_home_stats.shots.insidebox - current_data_home_stats_ten.shots.insidebox
                                                away.in = current_data_away_stats.shots.insidebox - current_data_away_stats_ten.shots.insidebox
                                                if (!current_data_away_stats.shots.insidebox) {
                                                    home.in = null
                                                    away.in = null
                                                }
                                                home.out = current_data_home_stats.shots.outsidebox - current_data_home_stats_ten.shots.outsidebox
                                                away.out = current_data_away_stats.shots.outsidebox - current_data_away_stats_ten.shots.outsidebox

                                                home.cnr = current_data_home_stats.corners - current_data_home_stats_ten.corners
                                                away.cnr = current_data_away_stats.corners - current_data_away_stats_ten.corners
                                                if (!current_data_away_stats.corners) {
                                                    home.cnr = null
                                                    away.cnr = null
                                                }

                                                if(current_data_home_stats.attacks && current_data_home_stats_ten.attacks){
                                                    home.da = current_data_home_stats.attacks.dangerous_attacks - current_data_home_stats_ten.attacks.dangerous_attacks
                                                    away.da = current_data_away_stats.attacks.dangerous_attacks - current_data_away_stats_ten.attacks.dangerous_attacks

                                                    home.atk = current_data_home_stats.attacks.attacks - current_data_home_stats_ten.attacks.attacks
                                                    away.atk = current_data_away_stats.attacks.attacks - current_data_away_stats_ten.attacks.attacks
                                                }

                                                home.goal = current_data_home_stats.goals - current_data_home_stats_ten.goals
                                                away.goal = current_data_away_stats.goals - current_data_away_stats_ten.goals

                                                home.poss = current_data_away_stats_ten.possessiontime
                                                away.poss = 100 - home.poss
                                                if (home.poss === null || home.poss === 0) {
                                                    away.poss = 0
                                                }

                                                if (current_data_away_stats.passes != null) {
                                                    home.pas = current_data_home_stats.passes.total - current_data_home_stats_ten.passes.total
                                                    away.pas = current_data_away_stats.passes.total - current_data_away_stats_ten.passes.total
                                                } else {
                                                    home.pas = null
                                                    away.pas = null
                                                }

                                                if (current_data_away_stats.passes != null) {
                                                    home.acc = current_data_home_stats.passes.accurate - current_data_home_stats_ten.passes.accurate
                                                    away.acc = current_data_away_stats.passes.accurate - current_data_away_stats_ten.passes.accurate
                                                } else {
                                                    home.acc = null
                                                    away.acc = null
                                                }

                                                home.ofs = current_data_home_stats.offsides - current_data_home_stats_ten.offsides
                                                away.ofs = current_data_away_stats.offsides - current_data_away_stats_ten.offsides

                                                if (!current_data_away_stats.offsides) {
                                                    home.ofs = null
                                                    away.ofs = null
                                                }
                                                home.sav = current_data_home_stats.saves - current_data_home_stats_ten.saves
                                                away.sav = current_data_away_stats.saves - current_data_away_stats_ten.saves
                                                if (!current_data_away_stats.saves) {
                                                    home.sav = null
                                                    away.sav = null
                                                }
                                                if (current_data_away_stats.substitutions != null) {
                                                    home.sbst = current_data_home_stats.substitutions - current_data_home_stats_ten.substitutions
                                                    away.sbst = current_data_away_stats.substitutions - current_data_away_stats_ten.substitutions
                                                } else {
                                                    home.sbst = null
                                                    away.sbst = null
                                                }

                                                home.red = current_data_home_stats.redcards - current_data_home_stats_ten.redcards
                                                away.red = current_data_away_stats.redcards - current_data_away_stats_ten.redcards
                                                if (!current_data_away_stats.redcards) {
                                                    home.red = null
                                                    away.red = null
                                                }
                                                home.fou = current_data_home_stats.fouls - current_data_home_stats_ten.fouls
                                                away.fou = current_data_away_stats.fouls - current_data_away_stats_ten.fouls

                                                if (!current_data_away_stats.fouls) {
                                                    home.fou = null
                                                    away.fou = null
                                                }
                                                if (current_data_away_stats.goal_attempts != null) {
                                                    home.g_att = current_data_home_stats.goal_attempts - current_data_home_stats_ten.goal_attempts
                                                    away.g_att = current_data_away_stats.goal_attempts - current_data_away_stats_ten.goal_attempts
                                                } else {
                                                    home.g_att = null
                                                    away.g_att = null
                                                }

                                                if (current_data_away_stats.ball_safe != null) {
                                                    home.safe = current_data_home_stats.ball_safe - current_data_home_stats_ten.ball_safe
                                                    away.safe = current_data_away_stats.ball_safe - current_data_away_stats_ten.ball_safe
                                                } else {
                                                    home.safe = null
                                                    away.safe = null
                                                }

                                            }
                                        }
                                    }
                                    //-------------Total Part------------//
                                    current_data_stats0 = {...stats[0]}
                                    current_data_stats1 = {...stats[1]}
                                    if (current_main_data.home_id === current_data_stats0.team_id) {
                                        if(current_data_stats0.shots){
                                            homeT.on = current_data_stats0.shots.ongoal
                                            awayT.on = current_data_stats1.shots.ongoal
                                            homeT.off = current_data_stats0.shots.offgoal
                                            awayT.off = current_data_stats1.shots.offgoal
                                            homeT.blk = current_data_stats0.shots.blocked
                                            awayT.blk = current_data_stats1.shots.blocked
                                            homeT.in = current_data_stats0.shots.insidebox
                                            awayT.in = current_data_stats1.shots.insidebox
                                            homeT.out = current_data_stats0.shots.outsidebox
                                            awayT.out = current_data_stats1.shots.outsidebox
                                        }

                                        homeT.cnr = current_data_stats0.corners
                                        awayT.cnr = current_data_stats1.corners
                                        if(current_data_stats0.attacks){
                                            homeT.da = current_data_stats0.attacks.dangerous_attacks
                                            awayT.da = current_data_stats1.attacks.dangerous_attacks
                                            homeT.atk = current_data_stats0.attacks.attacks
                                            awayT.atk = current_data_stats1.attacks.attacks
                                        }
                                        else{
                                            homeT.da = null
                                            awayT.da = null
                                            homeT.atk = null
                                            awayT.atk = null
                                        }

                                        homeT.poss = current_data_stats0.possessiontime
                                        awayT.poss = current_data_stats1.possessiontime
                                        if (current_data_stats0.passes != null) {
                                            homeT.pas = current_data_stats0.passes.total
                                            awayT.pas = current_data_stats1.passes.total
                                        } else {
                                            homeT.pas = null
                                            awayT.pas = null
                                        }

                                        if (current_data_stats0.passes != null) {
                                            homeT.acc = current_data_stats0.passes.accurate
                                            awayT.acc = current_data_stats1.passes.accurate
                                        } else {
                                            homeT.acc = null
                                            awayT.acc = null
                                        }

                                        homeT.ofs = current_data_stats0.offsides
                                        awayT.ofs = current_data_stats1.offsides
                                        homeT.sav = current_data_stats0.saves
                                        awayT.sav = current_data_stats1.saves
                                        homeT.sbst = current_data_stats0.substitutions
                                        awayT.sbst = current_data_stats1.substitutions
                                        homeT.red = current_data_stats0.redcards
                                        awayT.red = current_data_stats1.redcards
                                        homeT.fou = current_data_stats0.fouls
                                        awayT.fou = current_data_stats1.fouls
                                        homeT.g_att = current_data_stats0.goal_attempts
                                        awayT.g_att = current_data_stats1.goal_attempts
                                        homeT.safe = current_data_stats0.ball_safe
                                        awayT.safe = current_data_stats1.ball_safe
                                    }
                                    else {
                                        homeT.on = current_data_stats1.shots.ongoal
                                        awayT.on = current_data_stats0.shots.ongoal
                                        homeT.off = current_data_stats1.shots.offgoal
                                        awayT.off = current_data_stats0.shots.offgoal
                                        homeT.blk = current_data_stats1.shots.blocked
                                        awayT.blk = current_data_stats0.shots.blocked
                                        homeT.in = current_data_stats1.shots.insidebox
                                        awayT.in = current_data_stats0.shots.insidebox
                                        homeT.out = current_data_stats1.shots.outsidebox
                                        awayT.out = current_data_stats0.shots.outsidebox
                                        homeT.cnr = current_data_stats1.corners
                                        awayT.cnr = current_data_stats0.corners
                                        homeT.da = current_data_stats1.attacks.dangerous_attacks
                                        awayT.da = current_data_stats0.attacks.dangerous_attacks
                                        homeT.poss = current_data_stats1.possessiontime
                                        awayT.poss = current_data_stats0.possessiontime
                                        if (current_data_stats0.passes != null) {
                                            homeT.pas = current_data_stats1.passes.total
                                            awayT.pas = current_data_stats0.passes.total
                                        } else {
                                            homeT.pas = null
                                            awayT.pas = null
                                        }

                                        if (current_data_stats0.passes != null) {
                                            homeT.acc = current_data_stats1.passes.accurate
                                            awayT.acc = current_data_stats0.passes.accurate
                                        } else {
                                            homeT.acc = null
                                            awayT.acc = null
                                        }
                                        homeT.atk = current_data_stats1.attacks.attacks
                                        awayT.atk = current_data_stats0.attacks.attacks
                                        homeT.ofs = current_data_stats1.offsides
                                        awayT.ofs = current_data_stats0.offsides
                                        homeT.sav = current_data_stats1.saves
                                        awayT.sav = current_data_stats0.saves
                                        homeT.sbst = current_data_stats1.substitutions
                                        awayT.sbst = current_data_stats0.substitutions
                                        homeT.red = current_data_stats1.redcards
                                        awayT.red = current_data_stats0.redcards
                                        homeT.fou = current_data_stats1.fouls
                                        awayT.fou = current_data_stats0.fouls
                                        homeT.g_att = current_data_stats1.goal_attempts
                                        awayT.g_att = current_data_stats0.goal_attempts
                                        homeT.safe = current_data_stats1.ball_safe
                                        awayT.safe = current_data_stats0.ball_safe
                                    }
                                    //-----------------------------------//
                                    // home_season.pos = parseInt(home_season.pos/home_poss_index)
                                    // away_season.pos = 100 - home_season.pos
                                    current_main_data.stats = {...stats}
                                    current_main_data.stats_ten = {...stats_ten}
                                    main_data[j] = {...current_main_data}
                                    this.eventArray[i].events.push({
                                        'index0': k,
                                        'fixtureId': fixture_id,
                                        'main_data': main_data[j],
                                        'home': home,
                                        'away': away,
                                        'home_p': home_p,
                                        'goal_tooltip': goal_tooltip,
                                        'away_p': away_p,
                                        'homeT': homeT,
                                        'awayT': awayT,
                                        'home_season': home_season,
                                        'away_season': away_season,
                                        'home_tooltip': home_tooltip,
                                        'away_tooltip': away_tooltip
                                    })
                                    // console.log('eventArray => ', this.eventArray)
                                    k++
                                    //-----------------------------------//
                                }
                            }
                        }
                    }
                    let self = this
                    this.sortJSON(self.eventArray,'league', '123');
                    this.liveNumbers = k

                    let eventList = data.data[2]
                    let competitionArray1 = []
                    let competitionArrayCount = 0
                    for(let i = 0 ; i < eventList.length; i++){
                        // console.log(eventList[i])
                        if (eventList[i].competitions.length && eventList[i].competitions[0].league) {
                            let competitionName = eventList[i].competitions[0].league
                            competitionArray1[competitionArrayCount++] = competitionName
                        }
                    }
                    competitionArray1 = Array.from(new Set (competitionArray1))
                    this.scheduleArray = []
                    this.scheduleLength = 0
                    for(let j = 0 ; j < competitionArray1.length ; j++){
                        this.scheduleArray.push({'league': competitionArray1[j], 'events': []})
                        for(let k = 0 ;  k < eventList.length ; k++){
                            if(eventList[k].competitions.length && eventList[k].competitions[0].league == competitionArray1[j] && eventList[k].time.status == 'NS'){
                                this.scheduleLength++
                                this.scheduleArray[j].events.push(eventList[k])
                            }
                        }
                    }

                    this.finishedArray = []
                    this.finishedLength = 0
                    for(let j = 0 ; j < competitionArray1.length ; j++){
                        this.finishedArray.push({'league': competitionArray1[j], 'events': []})
                        for(let k = 0 ;  k < eventList.length ; k++){
                            if(eventList[k].competitions.length && eventList[k].competitions[0].league == competitionArray1[j] && eventList[k].time.status == 'FT'){
                                this.finishedLength++
                                this.finishedArray[j].events.push(eventList[k])
                            }
                        }
                    }
                    for(let j = 0 ; j < this.finishedArray.length ; j++){
                        for(let jj = 0 ; jj < this.finishedArray[j].events.length ; jj++){
                            if(!this.finishedArray[j].events[jj].stats[0]){
                                let index = this.finishedArray[j].events.indexOf(this.finishedArray[j].events[jj]);
                                if (index > -1) {
                                    jj = jj - 1
                                    this.finishedArray[j].events.splice(index, 1);
                                }
                            }
                        }
                    }

                })
            },
            sortJSON(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            },
        },
        created() {
            this.readData()
            this.sockets.subscribe('UpdateStats', (data1) => {
                let check_new_total = 0
                for(let i = 0 ; i < data1.length ; i++){
                    if(data1[i].updateArray){
                        let stats = data1[i].updateArray.stats
                        let stats_ten = data1[i].updateArray.stats_ten
                        let check_new  = 0
                        for(let j = 0 ; j < this.eventArray.length ; j++){
                            for(let k = 0 ; k < this.eventArray[j].events.length ; k++){
                                if(this.eventArray[j].events[k].main_data._id == data1[i].updateArray._id && data1[i].currentData.stats[0]){
                                    check_new = 1
                                    let current_event = {...this.eventArray[j].events[k]}
                                    // console.log('current_event ', current_event)
                                    if(data1[i].currentData.time.status == "FT"){
                                        this.readData()
                                    }
                                    current_event.home.time = data1[i].currentData.time.minute
                                    if(data1[i].currentData.time.injury_time != null){
                                        current_event.home.time = data1[i].currentData.time.minute + '+' + data1[i].currentData.time.injury_time
                                    }
                                    if(data1[i].currentData.time.status == 'HT'){
                                        current_event.home.time = 'HT'
                                    }

                                    current_event.goal_tooltip = data1[i].updateArray.goal_tooltip
                                    current_event.home_tooltip = {
                                        'on': '',
                                        'off': '',
                                        'in': '',
                                        'out': '',
                                        'blk': ''
                                    }
                                    current_event.away_tooltip = {
                                        'on': '',
                                        'off': '',
                                        'in': '',
                                        'out': '',
                                        'blk': ''
                                    }
                                    if(data1[i].updateArray.home_tooltip){
                                        current_event.home_tooltip = {...data1[i].updateArray.home_tooltip}
                                    }
                                    if(data1[i].updateArray.away_tooltip){
                                        current_event.away_tooltip = {...data1[i].updateArray.away_tooltip}
                                    }
                                    // console.log('home_T', current_event.homeT)
                                    // console.log('home_tooltip', current_event.home_tooltip)
                                    // console.log('away_T', current_event.awayT)
                                    // console.log('away_tooltip', current_event.away_tooltip)
                                    // stats[0].goals++;
                                    // console.log(current_event.home.time, stats[0].goals);
                                    if(current_event.home.id === stats[0].team_id){

                                        if (current_event.home.score < data1[i].updateArray.scores.localteam_score) {
                                            current_event.home.flash = 1
                                        } else {
                                            current_event.home.flash = 0
                                        }
                                        current_event.home.score = data1[i].updateArray.scores.localteam_score
                                        if (current_event.away.score < data1[i].updateArray.scores.visitorteam_score) {
                                            current_event.away.flash = 1
                                        } else {
                                            current_event.away.flash = 0
                                        }
                                        current_event.away.score = data1[i].updateArray.scores.visitorteam_score

                                        if(stats[0].shots && stats_ten[0][0].shots){
                                            current_event.home.on = stats[0].shots.ongoal - stats_ten[0][0].shots.ongoal
                                            current_event.away.on = stats[1].shots.ongoal - stats_ten[0][1].shots.ongoal
                                            current_event.home.off = stats[0].shots.offgoal - stats_ten[0][0].shots.offgoal
                                            current_event.away.off = stats[1].shots.offgoal - stats_ten[0][1].shots.offgoal
                                            current_event.home.blk = stats[0].shots.blocked - stats_ten[0][0].shots.blocked
                                            current_event.away.blk = stats[1].shots.blocked - stats_ten[0][1].shots.blocked
                                            current_event.home.in = stats[0].shots.insidebox - stats_ten[0][0].shots.insidebox
                                            current_event.away.in = stats[1].shots.insidebox - stats_ten[0][1].shots.insidebox
                                            current_event.home.out = stats[0].shots.outsidebox - stats_ten[0][0].shots.outsidebox
                                            current_event.away.out = stats[1].shots.outsidebox - stats_ten[0][1].shots.outsidebox
                                        }

                                        current_event.home.cnr = stats[0].corners - stats_ten[0][0].corners
                                        current_event.away.cnr = stats[1].corners - stats_ten[0][1].corners
                                        if(stats[0].attacks && stats_ten[0][0].attacks){
                                            current_event.home.da = stats[0].attacks.dangerous_attacks - stats_ten[0][0].attacks.dangerous_attacks
                                            current_event.away.da = stats[1].attacks.dangerous_attacks - stats_ten[0][1].attacks.dangerous_attacks
                                        }

                                        current_event.home.poss =stats_ten[0][0].possessiontime
                                        current_event.away.poss =stats_ten[0][1].possessiontime

                                        if(stats[0].passes && stats_ten[0][0]){
                                            if(stats_ten[0][0].passes){
                                                current_event.home.pas = stats[0].passes.total - stats_ten[0][0].passes.total
                                                current_event.away.pas = stats[1].passes.total - stats_ten[0][1].passes.total

                                                current_event.home.acc = stats[0].passes.accurate - stats_ten[0][0].passes.accurate
                                                current_event.away.acc = stats[1].passes.accurate - stats_ten[0][1].passes.accurate
                                            }
                                        }
                                        else{
                                            current_event.home.pas = null
                                            current_event.away.pas = null
                                            current_event.home.acc = null
                                            current_event.away.acc = null
                                        }

                                        if(stats[0].attacks && stats_ten[0][0].attacks){
                                            current_event.home.atk = stats[0].attacks.attacks - stats_ten[0][0].attacks.attacks
                                            current_event.away.atk = stats[1].attacks.attacks - stats_ten[0][1].attacks.attacks
                                        }

                                        current_event.home.ofs = stats[0].offsides - stats_ten[0][0].offsides
                                        current_event.away.ofs = stats[1].offsides - stats_ten[0][1].offsides
                                        current_event.home.sav = stats[0].saves - stats_ten[0][0].saves
                                        current_event.away.sav = stats[1].saves - stats_ten[0][1].saves
                                        if(stats[0].substitutions != null){
                                            current_event.home.sbst = stats[0].substitutions - stats_ten[0][0].substitutions
                                            current_event.away.sbst = stats[1].substitutions - stats_ten[0][1].substitutions
                                        }
                                        else{
                                            current_event.home.sbst = null
                                            current_event.away.sbst = null
                                        }
                                        current_event.home.red = stats[0].redcards - stats_ten[0][0].redcards
                                        current_event.away.red = stats[1].redcards - stats_ten[0][1].redcards
                                        current_event.home.fou = stats[0].fouls - stats_ten[0][0].fouls
                                        current_event.away.fou = stats[1].fouls - stats_ten[0][1].fouls
                                        if(stats[0].goal_attempts != null){
                                            current_event.home.g_att = stats[0].goal_attempts - stats_ten[0][0].goal_attempts
                                            current_event.away.g_att = stats[1].goal_attempts - stats_ten[0][1].goal_attempts
                                        }
                                        else{
                                            current_event.home.g_att = null
                                            current_event.away.g_att = null
                                        }
                                        if(stats[0].ball_safe != null){
                                            current_event.home.safe = stats[0].ball_safe - stats_ten[0][0].ball_safe
                                            current_event.away.safe = stats[1].ball_safe - stats_ten[0][1].ball_safe
                                        }
                                        else{
                                            current_event.home.safe = null
                                            current_event.away.safe = null
                                        }
                                        // stats[0].goals += 1;
                                        // if(stats[0].goals > current_event.home.goal){
                                        //     current_event.home.flash = 1
                                        // }
                                        // else{
                                        //     current_event.home.flash = 0
                                        // }
                                        // current_event.home.goal = stats[0].goals

                                        // if (current_event.main_data._id == 17638617)
                                        // {
                                        //     console.log('current-->', current_event, current_event.away.goal)
                                        //     console.log(stats[1].goals, current_event.away.goal)
                                        // }

                                        // if(stats[1].goals > current_event.away.goal){
                                        //     current_event.away.flash = 1
                                        // }
                                        // else{
                                        //     current_event.away.flash = 0
                                        // }
                                        // current_event.away.goal = stats[1].goals
                                        // current_event.home.goal = stats[0].goals - stats_ten[0][0].goals
                                        // current_event.away.goal = stats[1].goals - stats_ten[0][1].goals
                                    }
                                    else{
                                        if (current_event.home.score < data1[i].updateArray.scores.visitorteam_score) {
                                            current_event.home.flash = 1
                                        } else {
                                            current_event.home.flash = 0
                                        }
                                        current_event.home.score = data1[i].updateArray.scores.visitorteam_score
                                        if (current_event.away.score < data1[i].updateArray.scores.localteam_score) {
                                            current_event.away.flash = 1
                                        } else {
                                            current_event.away.flash = 0
                                        }
                                        current_event.away.score = data1[i].updateArray.scores.localteam_score
                                        
                                        current_event.home.on = stats[1].shots.ongoal - stats_ten[0][1].shots.ongoal
                                        current_event.away.on = stats[0].shots.ongoal - stats_ten[0][0].shots.ongoal
                                        current_event.home.off = stats[1].shots.offgoal - stats_ten[0][1].shots.offgoal
                                        current_event.away.off = stats[0].shots.offgoal - stats_ten[0][0].shots.offgoal
                                        current_event.home.blk = stats[1].shots.blocked - stats_ten[0][1].shots.blocked
                                        current_event.away.blk = stats[0].shots.blocked - stats_ten[0][0].shots.blocked
                                        current_event.home.in = stats[1].shots.insidebox - stats_ten[0][1].shots.insidebox
                                        current_event.away.in = stats[0].shots.insidebox - stats_ten[0][0].shots.insidebox
                                        current_event.home.out = stats[1].shots.outsidebox - stats_ten[0][1].shots.outsidebox
                                        current_event.away.out = stats[0].shots.outsidebox - stats_ten[0][0].shots.outsidebox
                                        current_event.home.cnr = stats[1].corners - stats_ten[0][1].corners
                                        current_event.away.cnr = stats[0].corners - stats_ten[0][0].corners
                                        current_event.home.da = stats[1].attacks.dangerous_attacks - stats_ten[0][1].attacks.dangerous_attacks
                                        current_event.away.da = stats[0].attacks.dangerous_attacks - stats_ten[0][0].attacks.dangerous_attacks

                                        current_event.home.poss =stats_ten[0][1].possessiontime
                                        current_event.away.poss =stats_ten[0][0].possessiontime

                                        if(stats[0].passes != null){
                                            current_event.home.pas = stats[1].passes.total - stats_ten[0][1].passes.total
                                            current_event.away.pas = stats[0].passes.total - stats_ten[0][0].passes.total
                                        }
                                        else{
                                            current_event.home.pas = null
                                            current_event.away.pas = null
                                        }
                                        if(stats[0].passes != null){
                                            current_event.home.acc = stats[1].passes.accurate - stats_ten[0][1].passes.accurate
                                            current_event.away.acc = stats[0].passes.accurate - stats_ten[0][0].passes.accurate
                                        }
                                        else{
                                            current_event.home.acc = null
                                            current_event.away.acc = null
                                        }
                                        current_event.home.atk = stats[1].attacks.attacks - stats_ten[0][1].attacks.attacks
                                        current_event.away.atk = stats[0].attacks.attacks - stats_ten[0][0].attacks.attacks
                                        current_event.home.ofs = stats[1].offsides - stats_ten[0][1].offsides
                                        current_event.away.ofs = stats[0].offsides - stats_ten[0][0].offsides
                                        current_event.home.sav = stats[1].saves - stats_ten[0][1].saves
                                        current_event.away.sav = stats[0].saves - stats_ten[0][0].saves
                                        if(stats[0].substitutions != null){
                                            current_event.home.sbst = stats[1].substitutions - stats_ten[0][1].substitutions
                                            current_event.away.sbst = stats[0].substitutions - stats_ten[0][0].substitutions
                                        }
                                        else{
                                            current_event.home.sbst = null
                                            current_event.away.sbst = null
                                        }
                                        current_event.home.red = stats[1].redcards - stats_ten[0][1].redcards
                                        current_event.away.red = stats[0].redcards - stats_ten[0][0].redcards
                                        current_event.home.fou = stats[1].fouls - stats_ten[0][1].fouls
                                        current_event.away.fou = stats[0].fouls - stats_ten[0][0].fouls
                                        if(stats[0].goal_attempts != null){
                                            current_event.home.g_att = stats[1].goal_attempts - stats_ten[0][1].goal_attempts
                                            current_event.away.g_att = stats[0].goal_attempts - stats_ten[0][0].goal_attempts
                                        }
                                        else{
                                            current_event.home.g_att = null
                                            current_event.away.g_att = null
                                        }
                                        if(stats[0].ball_safe != null){
                                            current_event.home.safe = stats[1].ball_safe - stats_ten[0][1].ball_safe
                                            current_event.away.safe = stats[0].ball_safe - stats_ten[0][0].ball_safe
                                        }
                                        else{
                                            current_event.home.safe = null
                                            current_event.away.safe = null
                                        }

                                        // if(stats[1].goals > current_event.home.goal){
                                        //     current_event.home.flash = 1
                                        // }
                                        // else{
                                        //     current_event.home.flash = 0
                                        // }
                                        // current_event.home.goal = stats[1].goals

                                        // if(stats[0].goals > current_event.away.goal){
                                        //     current_event.away.flash = 1
                                        // }
                                        // else{
                                        //     current_event.away.flash = 0
                                        // }
                                        // current_event.away.goal = stats[0].goals

                                        // current_event.home.goal = stats[1].goals - stats_ten[0][1].goals
                                        // current_event.away.goal = stats[0].goals - stats_ten[0][0].goals
                                    }
                                    //-----------------------------------------------------------------------------------------------
                                    // if(stats[0].goals - stats_ten[0][0].goals > current_event.home.goal){
                                    //     current_event.home.flash = 1
                                    // }
                                    // else{
                                    //     current_event.home.flash = 0
                                    // }
                                    // // console.log("home.flash", current_event.home.flash)
                                    // // console.log("away.flash", current_event.away.flash)
                                    // current_event.home.goal = stats[0].goals - stats_ten[0][0].goals

                                    // if(stats[1].goals - stats_ten[0][1].goals > current_event.away.goal){
                                    //     current_event.away.flash = 1
                                    // }
                                    // else{
                                    //     current_event.away.flash = 0
                                    // }
                                    // current_event.away.goal = stats[1].goals - stats_ten[0][1].goals
                                    //---------------------------------------Total Part-------------------------------------------
                                    if(current_event.home.id === stats[0].team_id){
                                        current_event.homeT.on = stats[0].shots.ongoal
                                        current_event.awayT.on = stats[1].shots.ongoal
                                        current_event.homeT.off = stats[0].shots.offgoal
                                        current_event.awayT.off = stats[1].shots.offgoal
                                        current_event.homeT.blk = stats[0].shots.blocked
                                        current_event.awayT.blk = stats[1].shots.blocked
                                        current_event.homeT.in = stats[0].shots.insidebox
                                        current_event.awayT.in = stats[1].shots.insidebox
                                        current_event.homeT.out = stats[0].shots.outsidebox
                                        current_event.awayT.out = stats[1].shots.outsidebox
                                        current_event.homeT.cnr = stats[0].corners
                                        current_event.awayT.cnr = stats[1].corners
                                        if(stats[0].attacks){
                                            current_event.homeT.da = stats[0].attacks.dangerous_attacks
                                            current_event.awayT.da = stats[1].attacks.dangerous_attacks
                                            current_event.homeT.atk = stats[0].attacks.attacks
                                            current_event.awayT.atk = stats[1].attacks.attacks
                                        }
                                        else{
                                            current_event.homeT.da = null
                                            current_event.awayT.da = null
                                            current_event.homeT.atk = null
                                            current_event.awayT.atk = null
                                        }

                                        current_event.homeT.goal = stats[0].goals
                                        current_event.awayT.goal = stats[1].goals

                                        current_event.homeT.poss = stats[0].possessiontime
                                        current_event.awayT.poss = stats[1].possessiontime
                                        if(stats[0].passes != null){
                                            current_event.homeT.pas = stats[0].passes.total
                                            current_event.awayT.pas = stats[1].passes.total
                                        }
                                        else{
                                            current_event.homeT.pas = null
                                            current_event.awayT.pas = null
                                        }
                                        if(stats[0].passes != null){
                                            current_event.homeT.acc = stats[0].passes.accurate
                                            current_event.awayT.acc = stats[1].passes.accurate
                                        }
                                        else{
                                            current_event.homeT.acc = null
                                            current_event.awayT.acc = null
                                        }

                                        current_event.homeT.ofs = stats[0].offsides
                                        current_event.awayT.ofs = stats[1].offsides
                                        current_event.homeT.sav = stats[0].saves
                                        current_event.awayT.sav = stats[1].saves
                                        current_event.homeT.sbst = stats[0].substitutions
                                        current_event.awayT.sbst = stats[1].substitutions
                                        current_event.homeT.red = stats[0].redcards
                                        current_event.awayT.red = stats[1].redcards
                                        current_event.homeT.fou = stats[0].fouls
                                        current_event.awayT.fou = stats[1].fouls
                                        current_event.homeT.g_att = stats[0].goal_attempts
                                        current_event.awayT.g_att = stats[1].goal_attempts
                                        current_event.homeT.safe = stats[0].ball_safe
                                        current_event.awayT.safe = stats[1].ball_safe
                                    }
                                    else{
                                        current_event.homeT.on = stats[1].shots.ongoal
                                        current_event.awayT.on = stats[0].shots.ongoal
                                        current_event.homeT.off = stats[1].shots.offgoal
                                        current_event.awayT.off = stats[0].shots.offgoal
                                        current_event.homeT.blk = stats[1].shots.blocked
                                        current_event.awayT.blk = stats[0].shots.blocked
                                        current_event.homeT.in = stats[1].shots.insidebox
                                        current_event.awayT.in = stats[0].shots.insidebox
                                        current_event.homeT.out = stats[1].shots.outsidebox
                                        current_event.awayT.out = stats[0].shots.outsidebox
                                        current_event.homeT.cnr = stats[1].corners
                                        current_event.awayT.cnr = stats[0].corners
                                        current_event.homeT.da = stats[1].attacks.dangerous_attacks
                                        current_event.awayT.da = stats[0].attacks.dangerous_attacks
                                        current_event.homeT.goal = stats[1].goals
                                        current_event.awayT.goal = stats[0].goals

                                        current_event.homeT.poss = stats[1].possessiontime
                                        current_event.awayT.poss = stats[0].possessiontime
                                        if(stats[0].passes != null){
                                            current_event.homeT.pas = stats[1].passes.total
                                            current_event.awayT.pas = stats[0].passes.total
                                        }
                                        else{
                                            current_event.homeT.pas = null
                                            current_event.awayT.pas = null
                                        }
                                        if(stats[0].passes != null){
                                            current_event.homeT.acc = stats[1].passes.accurate
                                            current_event.awayT.acc = stats[0].passes.accurate
                                        }
                                        else{
                                            current_event.homeT.acc = null
                                            current_event.awayT.acc = null
                                        }
                                        current_event.homeT.atk = stats[1].attacks.attacks
                                        current_event.awayT.atk = stats[0].attacks.attacks
                                        current_event.homeT.ofs = stats[1].offsides
                                        current_event.awayT.ofs = stats[0].offsides
                                        current_event.homeT.sav = stats[1].saves
                                        current_event.awayT.sav = stats[0].saves
                                        current_event.homeT.sbst = stats[1].substitutions
                                        current_event.awayT.sbst = stats[0].substitutions
                                        current_event.homeT.red = stats[1].redcards
                                        current_event.awayT.red = stats[0].redcards
                                        current_event.homeT.fou = stats[1].fouls
                                        current_event.awayT.fou = stats[0].fouls
                                        current_event.homeT.g_att = stats[1].goal_attempts
                                        current_event.awayT.g_att = stats[0].goal_attempts
                                        current_event.homeT.safe = stats[1].ball_safe
                                        current_event.awayT.safe = stats[0].ball_safe
                                    }
                                    //------------------------------------------------------------------------------------------------
                                    this.eventArray[j].events[k] = {...current_event}
                                    // console.log(this.eventArray[j].events[k].main_data.home_name)
                                    // console.log('home_tooltip', this.eventArray[j].events[k].home_tooltip)
                                    // console.log('away_tooltip', this.eventArray[j].events[k].away_tooltip)
                                }
                            }
                        }
                        if(check_new == 0 && data1[i].updateArray.time.status == 'LIVE'){
                            check_new_total = 1
                        }
                    }
                }
                if(check_new_total == 1){
                    // console.log('reloading data')
                    this.readData()
                }
            })
            //----------------------------------------------------
        }
    }
</script>
<style>
    .season-detail{
        width: 5.5%!important;
        min-width: 24px!important;
        font-size: 10px!important;
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
            margin-left: 180px;
        }
    }
    .c-sidebar{
        width: 180px;
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
        font-size: 10px!important;
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
        width: 10%;
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
        width: 11%;
    }
    .index_detail{
        width: 14%!important;
    }
    .time_manner{
        animation: splash infinite 1.5s;
    }
    .goal_manner{
        animation: splash1 infinite 1.5s;
    }

    @keyframes splash {
        0% {
            color: white;
        }
        25% {
            color: #dd524f;
        }
        50% {
            color: #fa1121;
        }
        70%{
            color:#dd524f;
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
        -webkit-animation-name: example;
        -webkit-animation-duration: 3s;
        -webkit-animation-iteration-count: 10;
        animation-name: example;
        animation-duration: 3s;
        animation-iteration-count: 10;
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
    @media screen and (max-width: 600px) {
        .table-cell input{
            max-width: 44px;
        }
    }
</style>
