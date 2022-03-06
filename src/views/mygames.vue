<template>
	<div>
		<div v-for="(item, index) in scheduleArray" >
		
	        <div v-if="item.events.length > 0 && item.league"  class="header" style="width: 100%; height: 50px;">
	        	
	            <div style="height: 0px; position: relative; top: 22px; left: 5px;z-index: 1000;">
	                <input
	                    class="check-box0"
	                    type="checkbox"
	                    style="margin-top: -2px"
	                    @change='checkscheduleParent($event, index)'
	                >
	                
	            </div>
	            <div class="header-content" style="width: 15%; height: 50px; float: left; text-align: left;font-weight: bold; padding-left: 35px; padding-top: 7px; font-size: 13px!important;">
	                
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
	                        NXT%
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
	                        Goals
	                    </div>
	                    <div class="detail1">
	                        Rtg
	                    </div>
	                </div>
	            </div>
	            <div class="header-content" style="width: 16%; height: 50px; float: left; border-left: 1px solid whitesmoke; font-weight: bold; padding-top: 5px; font-size: 13px!important;">
	                Odds
	                <div style="width: 100%">
	                    <div style="width: 50%; float: left; text-align: center;">
	                        1 X 2
	                    </div>
	                    <div style="width: 50%; float: left; text-align: center;">
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
	        <div v-for="(item1, index) in item.events" class="content" :style="{'width': '100%', 'height': '62px', 'font-weight': '600', 'background': background_row[index % 2]}">
	        	
	        	<div style="height: 0px; position: relative; top: 22px; left: 5px;z-index: 1000;">
                   
                    <input
                        class="check-box0"
                        type="checkbox"
                        style="margin-top: -2px"
                        v-model="user_scheduled_ids"
                        :value = "item1._id"
                        checked="item.id"
                    >                    
                    
                </div>

	            <!--  home team data part Total -->
	            <div style="width: 15%; height: 30px; float: left; position: relative; top: 0px;">

	                
	                <div class="" style="width: 60px; float: left;position: relative; top:  23px; left: 26px; font-size: 17px; font-weight: normal">{{item1.time.starting_at.time.substring(0, 5)}}</div>
	                
	                <div style="width: calc(100% - 65px); float: left; padding-left: 10px">{{item1.localTeamName}} ({{item1.localteam_position}})</div>
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

	                <img v-b-modal.modal-mygame src="/img/info_icon.png" @click="callHistoricalData1(item1.localTeamId, item1.visitorTeamId, item1.season_id, item1.localTeamName + ' v ' + item1.visitorTeamName, 0, 0, 0, 0, item1.fixture_id)" width="13px;" style="width: 20px; cursor: pointer; outline: none;"/>
	            </div>
	            <div style="width: 4%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
	                <div style="width: 100%; padding: 3px 7px; color: black;">
	                    <div :key="item1.goalKey" :id="item1.goalKey" class="detail" style="color: red; position: relative; top: 22px; left: 7px; font-size: 18px;">
	                        0 - 0
	                    </div>                    
	                </div>
	            </div>
	            <div class="detail_total" style="width: 31%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
	                <div style="width: 100%; padding: 3px 7px; color: #212529;">
	                    <div class="detail" style="color: #212529;">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>                    

	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529;">
	                        -
	                    </div>
	                    
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529;">
	                        -
	                    </div>
	                    
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div> 
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div> 
	                   
	                </div>
	            </div>
	            <div class="detail_total" style="width: 26%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
	                <div style="width: 100%; padding: 3px 7px; color: black;">
	                    <div class="detail1">
	                        -
	                    </div>

	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                </div>
	            </div>
	            <div style="width: 16%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
	                <div style="width: 100%; padding: 3px 7px; ">
	                    <!-- <div style="width: 50%; float: left; height: 60px;">
	                        <div style="height: 16px; margin-bottom: 2px; margin-top: 2px; text-align: center;">
	                            1: <label class="Odds-label" style="margin-left: 2.3px;">{{item1.match_1}}</label>
	                        </div>
	                        <div style="height: 16px; margin-bottom: 2px; text-align: center;">
	                            X: <label class="Odds-label">{{item1.match_3}}</label>
	                        </div>
	                        <div style="height: 16px; text-align: center;">
	                            2: <label class="Odds-label" style="margin-left: 1px;">{{item1.match_2}}</label>
	                        </div>
	                    </div>
	                    <div style="width: 50%; float: left;">
	                        <div style="height: 16px; margin-bottom: 2px; margin-top: 2px; text-align: center;">
	                            O: <label class="Odds-label">{{item1.match_O}}</label>
	                        </div>
	                        <div style="height: 16px; text-align: center;">
	                            U: <label class="Odds-label">{{item1.match_U}}</label>
	                        </div>
	                    </div> -->
	                </div>
	            </div>


	            
	            <!--  away team data part  Total-->
	            <div style="width: 15%; height: 30px; float: left; position: relative; top: 0px;">
	                <div style="width: 60px; float: left; color: white;">.</div>
	                
	                <div style="width: calc(100% - 65px); float: left; padding-left: 10px">{{item1.visitorTeamName}} ({{item1.visitorteam_position}})</div>
	            </div>
	            <div style="width: 4%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
	                <div style="width: 100%; padding: 3px 7px; color: black;">
	                    <transition name="slide-fade" mode="out-in" class="livenow">
	                    </transition>
	                </div>
	            </div>
	            <div class="detail_total" style="width: 31%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
	                <div style="width: 100%; padding: 3px 7px; color: black;">
	                    <div class="detail" style="color: #212529;">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>                    

	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529;">
	                        -
	                    </div>
	                    
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529;">
	                        -
	                    </div>
	                    
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div>
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div> 
	                    <div class="detail" style="color: #212529">
	                        -
	                    </div> 
	                </div>
	            </div>
	            <div class="detail_total" style="width: 26%; height: 30px; float: left; border-left: 1px solid #e2e2e2;">
	                <div style="width: 100%; padding: 3px 7px; color: black;">
	                    <div class="detail1">
	                        -
	                    </div>

	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
	                    </div>
	                    <div class="detail1">
	                        -
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
		<div v-for="(item, index) in eventArray" style="margin-top: -3px;">
            <div v-if="item.events.length > 0 && item.league"  class="header" style="width: 100%; height: 50px;">
                <div style="height: 0px; position: relative; top: 22px; left: 5px;z-index: 1000; width: 10px;">
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
                    <img v-b-modal.modal-mygame src="/img/info_icon.png" @click="callHistoricalData1(item1.home.id, item1.away.id, item1.season_id, item1.main_data.home_name + ' v ' + item1.main_data.away_name, item1.home.rtg, item1.home.a_rtg, item1.away.rtg, item1.away.a_rtg, item1.fixtureId)" width="13px;" style="width: 20px; cursor: pointer; outline: none;"/>
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
	    <b-modal id="modal-mygame" centered :title="historicModalData.eventName">
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
	    
	    <CCol sm="4" style = "position:fixed; bottom: 0;">
		    <CButton
		        color="info"
		        class="m-2 save_match_data"
		        @click="delete_my_game"
		    >
		        Delete
		    </CButton>

		</CCol>
    </div>	
</template>
<script>
	import { Plotly } from 'vue-plotly'
	import swal from "sweetalert2";
	const io = require("socket.io-client")
    export default {
    	components: {
            Plotly
           
        },
    	data () {
            return {
            	interval: null,
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
                reload_flag: false
            }
        },
    	created() {
    		this.readData();
    		this.interval = setInterval(() => this.readData(), 60000);
    		//this.readData();
           
    	},
    	beforeDestroy() {
	      console.log("beforeDestroy");
	      clearInterval(this.interval);
	    },
    	
    	methods: {
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
    		delete_my_game() {
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

                if ( (this.user_scheduled_ids.length + this.user_live_ids.length) == 0) {
                    swal.fire("Alert!", "No events selected", "error");
                    return;
                }
                console.log('this.user_scheduled_ids.length + this.user_live_ids.length', this.user_scheduled_ids.length + this.user_live_ids.length)
                var post_data = {
                    "user_id": user_id,
                    "event_ids": this.user_scheduled_ids.concat(this.user_live_ids)
                }

                window.axios.post(`${process.env.VUE_APP_URL}delete_my_game`, post_data).then(({data}) => {
                    console.log(data.message);
                    this.readData();

                    swal.fire("Success!", "Data deleted successfully", "success");
                    this.user_scheduled_ids = []
                    this.user_live_ids = []
                    
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
            sortJSON(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            },
    		readData(){
    			console.log(' my game read data function')
    			var user_id = localStorage.getItem("user_id");
                console.log('user_id', user_id)
                if (user_id == 'undefined') {
                    console.log('---- user id not found ---');
                    swal.fire("Alert!", "User not specified", "error");
                    return;
                }
                var post_data = {"user_id": user_id}
                if(this.reload_flag == false){
                    this.reload_flag = true
                    window.axios.post(`${process.env.VUE_APP_URL}getMygames`, post_data).then(({data})=> {
                    	console.log('my game data', data)
                    	var number_of_games = data.data[0].length + data.data[1][1]
                    	this.$emit('update_mygames', number_of_games);

                    	console.log("total my games", number_of_games)

                        this.eventArray = data.data[1][0]
                        let self = this
                        this.sortJSON(self.eventArray,'league', '123')
                        // end of live games


                        // start of scheduled games
                    	console.log('scheduled tab====>', data.data[0])
	                    let eventList = data.data[0]
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

	                                let com_url = 'https://www.betfair.com/exchange/plus/en/football/'
                                    let it_url = ''
                                    
                                    if(eventList[k].com_link){                                    	
                                       
                                        let com_name = eventList[k].com_link.competitionName
                                        let eventN = eventList[k].com_link.eventName
                                        com_name = com_name.toLowerCase()
                                        com_name = com_name.replaceAll(" ", "-")
                                        eventN = eventN.toLowerCase()
                                        eventN = eventN.replaceAll(" ", "-")
                                        com_url = com_name + "/" + eventN
                                        com_url = 'https://www.betfair.com/exchange/plus/en/football/' + com_url + '-betting-' + eventList[k].com_link.eventId                                        
                                    }
                                    if(eventList[k].it_link){
                                        let it_name = eventList[k].it_link.competitionName
                                        let itN = eventList[k].it_link.eventName
                                        it_name = it_name.toLowerCase()
                                        it_name = it_name.replaceAll(" ", "")
                                        itN = itN.toLowerCase()
                                        itN = itN.replaceAll(" ", "")
                                        it_url = it_name + "/" + itN
                                        it_url = 'https://www.betfair.it/exchange/plus/it/calcio/' + it_url + '-scommesse-' + eventList[k].it_link.eventId
                                    }
                                    

	                                let current_main_data = {
	                                    "Odds": eventList[k].Odds,
	                                    "competitionId": eventList[k].competitionId,
	                                    "competitions": eventList[k].competitions,
	                                    "scores": eventList[k].scores,
	                                    "stats": eventList[k].stats,
	                                    "time": eventList[k].time,
	                                    "localTeamName": eventList[k].localTeamName,
	                                    "visitorTeamName": eventList[k].visitorTeamName,
	                                    "localTeamId": eventList[k].localTeamId,
	                                    "visitorTeamId": eventList[k].visitorTeamId,
	                                    "fixture_id": eventList[k]._id,
	                                    "_id": eventList[k]._id,
	                                    "marketId_matched": null,
	                                    "marketId_o_u": null,
	                                    "match_1": null,
	                                    "match_2": null,
	                                    "match_3": null,
	                                    "match_O": null,
	                                    "match_U": null,
	                                    "localteam_position": eventList[k].standing.localteam_position,
	                                    "visitorteam_position": eventList[k].standing.visitorteam_position,
	                                    "com_url": com_url,
	                                    "it_url": it_url
	                                }
	                                if(current_main_data.Odds.length > 0){
	                                    for(let b = 0 ; b < current_main_data.Odds.length; b++){
	                                        if(current_main_data.Odds[b].marketType === "MATCH_ODDS"){
	                                            current_main_data.marketId_matched = current_main_data.Odds[b].marketId
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
	                                                let runnerNode1 = current_main_data.Odds[b].runners[1]
	                                                if(runnerNode1.exchange){
	                                                    if(runnerNode1.exchange.availableToBack){
	                                                        if(runnerNode1.exchange.availableToBack[0]){
	                                                            current_main_data.match_2 = runnerNode1.exchange.availableToBack[0].price
	                                                        }
	                                                    }
	                                                }
	                                            }
	                                            if(current_main_data.Odds[b].runners[2]){
	                                                let runnerNode2 = current_main_data.Odds[b].runners[2]
	                                                if(runnerNode2.exchange){
	                                                    if(runnerNode2.exchange.availableToBack){
	                                                        if(runnerNode2.exchange.availableToBack[0]){
	                                                            current_main_data.match_3 = runnerNode2.exchange.availableToBack[0].price
	                                                        }
	                                                    }
	                                                }
	                                            }
	                                        }
	                                        else{
	                                            current_main_data.marketId_o_u = current_main_data.Odds[b].marketId
	                                            if(current_main_data.Odds[b].runners[0]){
	                                                let runnerNode = current_main_data.Odds[b].runners[0]
	                                                if(runnerNode.exchange){
	                                                    if(runnerNode.exchange.availableToBack){
	                                                        if(runnerNode.exchange.availableToBack[0]){
	                                                            current_main_data.match_O = runnerNode.exchange.availableToBack[0].price
	                                                        }
	                                                    }
	                                                }
	                                            }
	                                            if(current_main_data.Odds[b].runners[1]){
	                                                let runnerNode1 = current_main_data.Odds[b].runners[1]
	                                                if(runnerNode1.exchange){
	                                                    if(runnerNode1.exchange.availableToBack){
	                                                        if(runnerNode1.exchange.availableToBack[0]){
	                                                            current_main_data.match_U = runnerNode1.exchange.availableToBack[0].price
	                                                        }
	                                                    }
	                                                }
	                                            }
	                                        }
	                                    }
	                                }
	                                this.scheduleArray[j].events.push(current_main_data)
	                                this.scheduleArray1[j].events.push(current_main_data)
	                            }
	                        }
	                    }
	                    //let self = this
	                    this.sortJSON(self.scheduleArray,'league', '123')
	                    if(this.sort === 1){
	                        this.sort_filter(2)
	                    }
	                    // end of scheduled games

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

                        // start of my live games
                        this.reload_flag = false
                    })
                }
            },
            percallfunction(){
                //this.current_counter = 0
                //clearInterval(this.clock)
                //this.clock = setInterval(this.frame1, 9000)
            },
            callHistoricalData1(home_id, away_id, season_id, eventName, home_rtg, home_a_rtg, away_rtg, away_a_rtg, fixtureId){
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
                    console.log('home&away season===>', home_season, away_season)
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

                    for(let i = 0 ; i < this.scheduleArray.length ; i++){
                        for(let j = 0 ; j < this.scheduleArray[i].events.length ; j++){
                            
                            if(this.scheduleArray[i].events[j].localTeamId == home_id && this.scheduleArray[i].events[j].visitorTeamId == away_id){
                                this.historicModalData.home_season = Object.assign(home_season)
                                this.historicModalData.away_season = Object.assign(away_season)
                                this.historicModalData.home_p = home_p
                                this.historicModalData.away_p = away_p
                                this.data[0].x = []
                                this.data[1].x = []
                                this.data[0].y = []
                                this.data[1].y = []
                                this.data[0].name = this.scheduleArray[i].events[j].localTeamName
                                this.data[1].name = this.scheduleArray[i].events[j].visitorTeamName
                                this.historicModalData.eventName = this.scheduleArray[i].events[j].localTeamName + " v " + this.scheduleArray[i].events[j].visitorTeamName
                                // this.eventArray[i].events[j].show = true
                            }
                        }
                    }
                    console.log('this.historicModalData.eventName', this.historicModalData.eventName)
                    this.percallfunction()
                })
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
    	}
        
    };
</script>