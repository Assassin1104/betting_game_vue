<template>
    <div class="live-stats-container">
        <CRow>
             <b-modal id="modal-1"  hide-footer hide-header centered no-close-on-backdrop>
                <b-progress value="100" max="100" animated variant="secondary"></b-progress>
            </b-modal>
            
            <CCol lg="12" class="stats-filter-content" style="padding: 20px 30px; background-color: #ebedef">
                <div style="display: flex;"> 
                    <div style="display: inline-block;">
                        <div>
                            <label style="color: red; font-weight: bold;">League:</label>
                            
                            <CSelect
                                    class="league-list"
                                    :options="leagues"
                                    @update:value="set_league"
                            >
                            </CSelect>
                        </div>

                        <div>
                            <label style="color: red; font-weight: bold;">Season:</label>
                            
                            <CSelect
                                    class="league-list"
                                    :options="seasons"
                                    @update:value="set_season"
                                    
                            >
                            </CSelect>
                        </div>
                            
                            <!-- <div style="width: 40%; float: left; padding-left: 50px">
                                <CButton color="success" @click="getLiveData" class="G-L-button">
                                    Get Data
                                </CButton>
                            </div> -->
                        
                    </div>
                    <div style="padding-left: 50px; width: 400px;">
                        <label style="color: red; font-weight: bold;">Odds filters:</label>
                        <div>
                            <div style="width: 100%; display: flex; float: left; margin-top: 10px;">
                                <div style="flex: 1; width: 20%;">
                                    <label style="position: relative; top: 4px;">Home Team Odds: </label>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <CInput type="number" min="0" max="90000000" :value="home_pre_odd_min" class="minOdd" @update:value="set_home_pre_odd_min"></CInput>
                                    <label style="float: left; margin-top: -12px; margin-left: 5px;">min</label>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <CInput type="number" min="0" max="100000" :value="home_pre_odd_max" class="maxOdd" @update:value="set_home_pre_odd_max">  </CInput>
                                    <label style="float: left; margin-top: -12px; margin-left: 5px;">max</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style="width: 100%; display: flex; float: left; margin-top: 10px;">
                                <div style="flex: 1; width: 20%;">
                                    <label style="position: relative; top: 4px;">Away Team Odds: </label>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <CInput type="number" min="0" max="90000000" :value="away_pre_odd_min" class="minOdd" @update:value="set_away_pre_odd_min"></CInput>
                                    <label style="float: left; margin-top: -12px; margin-left: 5px;">min</label>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <CInput type="number" min="0" max="100000" :value="away_pre_odd_max" class="maxOdd" @update:value="set_away_pre_odd_max"></CInput>
                                    <label style="float: left; margin-top: -12px; margin-left: 5px;">max</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style="width: 100%; display: flex; float: left; margin-top: 10px;">
                                <div style="flex: 1; width: 20%;">
                                    <label style="position: relative; top: 4px;">The Draw Odds: </label>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <CInput type="number" min="0" max="90000000" :value="draw_pre_odd_min" class="minOdd" @update:value="set_draw_pre_odd_min"></CInput>
                                    <label style="float: left; margin-top: -12px; margin-left: 5px;">min</label>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <CInput type="number" min="0" max="100000" :value="draw_pre_odd_max" class="maxOdd" @update:value="set_draw_pre_odd_max"></CInput>
                                    <label style="float: left; margin-top: -12px; margin-left: 5px;">max</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display: flex;"> 
                    <div style="flex: 0 0 50%;">
                        <div style="width: 100%">
                            <label style="color: red; font-weight: bold;">Results Filter:</label> 
                        </div>
                        <div class="totalMatches" style="display: flex; font-weight: 600; font-size: 12px;">

                            <div style="flex: 1; text-align: center;">
                                <p class="header" style="color: #d1c4e1;">.</p>
                                <p class="value" style="padding: 3px; width: 100px;">From minute</p>
                                <p class="percent" style="padding: 3px; width: 100px;">To minute</p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Ov 0.5</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.over05.from" @update:value="score_over05_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.over05.to" @update:value="score_over05_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Ov 1.5</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.over15.from" @update:value="score_over15_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.over15.to" @update:value="score_over15_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Ov 2.5</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.over25.from" @update:value="score_over25_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.over25.to" @update:value="score_over25_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Ov 3.5</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.over35.from" @update:value="score_over35_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.over35.to" @update:value="score_over35_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Un 0.5</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.under05.from" @update:value="score_under05_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.under05.to" @update:value="score_under05_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Un 1.5</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.under15.from" @update:value="score_under15_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.under15.to" @update:value="score_under15_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Un 2.5</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.under25.from" @update:value="score_under25_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.under25.to" @update:value="score_under25_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Un 3.5</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.under35.from" @update:value="score_under35_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.under35.to" @update:value="score_under35_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Home</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.home.from" @update:value="score_home_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.home.to" @update:value="score_home_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Draws</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.draws.from" @update:value="score_draws_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.draws.to" @update:value="score_draws_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Away</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.away.from" @update:value="score_away_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.away.to" @update:value="score_away_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">BTS</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.bts.from" @update:value="score_bts_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.bts.to" @update:value="score_bts_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Odd</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.odd.from" @update:value="score_odd_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.odd.to" @update:value="score_odd_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Even</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.even.from" @update:value="score_even_from" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="score_minute_filter.even.to" @update:value="score_even_to" class="minOdd1"></CInput>
                                </p>
                            </div>
                        </div>
                    </div>
                     <div style="padding-left: 10px;">
                        <div style="width: 100%">
                            <label style="color: red; font-weight: bold;">Score time Filter:</label> 
                        </div>
                    
                        <div class="totalMatches" style="display: flex; font-weight: 600; font-size: 12px;">
                            <div style="flex: 1; text-align: center;">
                                <p class="header" style="color: #d1c4e1;">.</p>
                                <p class="value" style="padding: 3px; width: 100%;">Home Score</p>
                                <p class="percent" style="padding: 3px; width: 100%;">Away Score</p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Result at 15'</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="result_at_15.home" @update:value="result_score_15_home" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="result_at_15.away" @update:value="result_score_15_away" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Result at 30'</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="result_at_30.home" @update:value="result_score_30_home" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="result_at_30.away" @update:value="result_score_30_away" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Result at HT</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="result_at_ht.home" @update:value="result_score_ht_home" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="result_at_ht.away" @update:value="result_score_ht_away" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Result at 60'</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="result_at_60.home" @update:value="result_score_60_home" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="result_at_60.away" @update:value="result_score_60_away" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Result at 75'</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="result_at_75.home" @update:value="result_score_75_home" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="result_at_75.away" @update:value="result_score_75_away" class="minOdd1"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Result at FT</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="result_at_ft.home" @update:value="result_score_ft_home" class="minOdd1"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="result_at_ft.away" @update:value="result_score_ft_away" class="minOdd1"></CInput>
                                </p>
                            </div>
                        </div>
                    </div>
                </div> 

                <div style="display: flex;"> 
                    <div style="flex: 0 0 50%;">
                        <div style="width: 100%">
                            <label style="color: red; font-weight: bold;">Home Live stats filter:</label> 
                        </div>
                        <div class="totalMatches" style="display: flex; font-weight: 600; font-size: 12px;">
                            <div style="flex: 1; text-align: center;">
                                <p class="header" style="color: #d1c4e1;">.</p>
                                <p class="value" style="padding: 3px;">Min</p>
                                <p class="percent" style="padding: 3px;">Max</p>
                            </div>
                            
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Rank</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.rank.from" @update:value="h_rank_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.rank.to" @update:value="h_rank_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <!-- <div style="flex: 1; text-align: center;">
                                <p class="header">Goal</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.goal.from" @update:value="h_goal_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.goal.to" @update:value="h_goal_to" class="minOdd2"></CInput>
                                </p>
                            </div> -->
                            <div style="flex: 1; text-align: center;">
                                <p class="header">On</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.on.from" @update:value="h_on_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.on.to" @update:value="h_on_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Off</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.off.from" @update:value="h_off_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.off.to" @update:value="h_off_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Blk</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.blk.from" @update:value="h_blk_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.blk.to" @update:value="h_blk_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">In</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.in.from" @update:value="h_in_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.in.to" @update:value="h_in_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Out</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.out.from" @update:value="h_out_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.out.to" @update:value="h_out_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Cnr</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.cnr.from" @update:value="h_cnr_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.cnr.to" @update:value="h_cnr_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">DA</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.da.from" @update:value="h_da_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.da.to" @update:value="h_da_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Pos</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.pos.from" @update:value="h_pos_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.pos.to" @update:value="h_pos_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Red</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.red.from" @update:value="h_red_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.red.to" @update:value="h_red_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Yel</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.yel.from" @update:value="h_yel_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="homeTeam.yel.to" @update:value="h_yel_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 0 0 50%; padding-left: 10px">
                        <div style="width: 100%">
                            <label style="color: red; font-weight: bold;">Away Live stats filter:</label> 
                        </div>

                        <div class="totalMatches" style="display: flex; font-weight: 600; font-size: 12px;">
                            <div style="flex: 1; text-align: center;">
                                <p class="header" style="color: #d1c4e1;">.</p>
                                <p class="value" style="padding: 3px;">Min</p>
                                <p class="percent" style="padding: 3px;">Max</p>
                            </div>
                            
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Rank</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.rank.from" @update:value="a_rank_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.rank.to" @update:value="a_rank_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <!-- <div style="flex: 1; text-align: center;">
                                <p class="header">Goal</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.goal.from" @update:value="a_goal_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.goal.to" @update:value="a_goal_to" class="minOdd2"></CInput>
                                </p>
                            </div> -->
                            <div style="flex: 1; text-align: center;">
                                <p class="header">On</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.on.from" @update:value="a_on_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.on.to" @update:value="a_on_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Off</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.off.from" @update:value="a_off_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.off.to" @update:value="a_off_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Blk</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.blk.from" @update:value="a_blk_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.blk.to" @update:value="a_blk_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">In</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.in.from" @update:value="a_in_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.in.to" @update:value="a_in_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Out</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.out.from" @update:value="a_out_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.out.to" @update:value="a_out_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Cnr</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.cnr.from" @update:value="a_cnr_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.cnr.to" @update:value="a_cnr_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">DA</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.da.from" @update:value="a_da_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.da.to" @update:value="a_da_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Pos</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.pos.from" @update:value="a_pos_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.pos.to" @update:value="a_pos_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Red</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.red.from" @update:value="a_red_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.red.to" @update:value="a_red_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <p class="header">Yel</p>
                                <p class="value">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.yel.from" @update:value="a_yel_from" class="minOdd2"></CInput>
                                </p>
                                <p class="percent">
                                    <CInput type="number" min="0" max="90000000" :value="awayTeam.yel.to" @update:value="a_yel_to" class="minOdd2"></CInput>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 40%; float: left; padding-left: 50px">
                    <CButton color="success" @click="getLiveData" class="G-L-button">
                        Get Data
                    </CButton>
                </div>

            </CCol>
            
           
            <CCol lg="12" style="background: white; padding: 30px; padding-top: 0px;">
                <h4>Results</h4>
                <table>
                    
                    <tr style="background: rgba(193, 176, 215, 0.75);">  
                        <th colspan="1">League</th>
                        <th colspan="1">Sample Size</th> 
                        <th colspan="1"></th>
                        
                    </tr>
                    <tr style="background-color: lightgrey"> 
                        <td>{{league_name}}</td>
                        <td class="rss">{{events_found}}</td>

                        <td v-if="events_found > 0">
                            <a :href="'/#/viewevents?idlist=' + this.event_id_list" target="_blank">View Matches</a>
                        </td>
                        <td v-else>
                            View Matches
                        </td> 
                    </tr>
                  
                </table>
            </CCol>
            <CCol lg="12" style="background: white; padding: 30px; padding-top: 0px;">
                <h5>First Half and Second Half Markets</h5>
                <table style="display: inline-block;">
                    
                    <tr>        
                        <th style="background: rgba(193, 176, 215, 0.75); border-left: 1px solid white;" colspan="17">First Half Markets</th>
                    </tr>
                    <tr style="background: #b7eafc;">        
                        <th class="dualHeader1" colspan="1">&nbsp;</th>
                        <th class="dualHeader1" colspan="3">Match Odds (Half Time Market)</th>
                        <th class="dualHeader1" colspan="2">First Half goals 0.5</th>
                        <th class="dualHeader1" colspan="2">First Half goals 1.5</th>
                        <th class="dualHeader1" colspan="2">First Half goals 2.5</th>
                    </tr>
                    <tr style="background: rgba(193, 176, 215, 0.75);">  
                        <th colspan="1">&nbsp;</th>
                        <th colspan="1">Home</th> 
                        <th colspan="1">Draw</th>
                        <th colspan="1">Away</th>
                        <th colspan="1">Over</th>
                        <th colspan="1">Under</th>
                        <th colspan="1">Over</th>
                        <th colspan="1">Under</th>
                        <th colspan="1">Over</th>
                        <th colspan="1">Under</th>
                    </tr>
                    <tr style="background-color: lightgrey"> 
                        <td><b>Sample Size:</b></td>
                        <td v-if="first_half_markets.home.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + first_half_markets.home.events" target="_blank">{{first_half_markets.home.size}}</a>
                        </td>
                        <td v-else>
                            {{first_half_markets.home.size}}
                        </td>
                        <td v-if="first_half_markets.draw.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + first_half_markets.draw.events" target="_blank">{{first_half_markets.draw.size}}</a>
                        </td>
                        <td v-else>
                            {{first_half_markets.draw.size}}
                        </td>
                        <td v-if="first_half_markets.away.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + first_half_markets.away.events" target="_blank">{{first_half_markets.away.size}}</a>
                        </td>
                        <td v-else>
                            {{first_half_markets.away.size}}
                        </td>
                        <td v-if="first_half_markets.over05.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + first_half_markets.over05.events" target="_blank">{{first_half_markets.over05.size}}</a>
                        </td>
                        <td v-else>
                            {{first_half_markets.over05.size}}
                        </td> 
                        <td v-if="first_half_markets.under05.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + first_half_markets.under05.events" target="_blank">{{first_half_markets.under05.size}}</a>
                        </td>
                        <td v-else>
                            {{first_half_markets.under05.size}}
                        </td> 
                        <td v-if="first_half_markets.over15.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + first_half_markets.over15.events" target="_blank">{{first_half_markets.over15.size}}</a>
                        </td>
                        <td v-else>
                            {{first_half_markets.over15.size}}
                        </td> 
                        <td v-if="first_half_markets.under15.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + first_half_markets.under15.events" target="_blank">{{first_half_markets.under15.size}}</a>
                        </td>
                        <td v-else>
                            {{first_half_markets.under15.size}}
                        </td>
                        <td v-if="first_half_markets.over25.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + first_half_markets.over25.events" target="_blank">{{first_half_markets.over25.size}}</a>
                        </td>
                        <td v-else>
                            {{first_half_markets.over25.size}}
                        </td> 
                        <td v-if="first_half_markets.under25.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + first_half_markets.under25.events" target="_blank">{{first_half_markets.under25.size}}</a>
                        </td>
                        <td v-else>
                            {{first_half_markets.under25.size}}
                        </td> 
                    </tr>
                   <tr style="background-color: lightgrey"> 
                        <td><b>Probability%:</b></td>
                        <td class="rss">{{first_half_markets.home.prob}}</td> 
                        <td class="rss">{{first_half_markets.draw.prob}}</td>
                        <td class="rss">{{first_half_markets.away.prob}}</td>

                        <td class="rss">{{first_half_markets.over05.prob}}</td>
                        <td class="rss">{{first_half_markets.under05.prob}}</td>
                        <td class="rss">{{first_half_markets.over15.prob}}</td>
                        <td class="rss">{{first_half_markets.under15.prob}}</td>
                        <td class="rss">{{first_half_markets.over25.prob}}</td>
                        <td class="rss">{{first_half_markets.under25.prob}}</td>
                    </tr>
                    <tr style="background-color: lightgrey"> 
                        <td><b>Odds</b></td>
                        <td class="rss">{{first_half_markets.home.odds}}</td> 
                        <td class="rss">{{first_half_markets.draw.odds}}</td>
                        <td class="rss">{{first_half_markets.away.odds}}</td>

                        <td class="rss">{{first_half_markets.over05.odds}}</td>
                        <td class="rss">{{first_half_markets.under05.odds}}</td>
                        <td class="rss">{{first_half_markets.over15.odds}}</td>
                        <td class="rss">{{first_half_markets.under15.odds}}</td>
                        <td class="rss">{{first_half_markets.over25.odds}}</td>
                        <td class="rss">{{first_half_markets.under25.odds}}</td>
                    </tr>
                </table>
                <table style="display: inline-block; padding-left: 10px">
                    
                    <tr>        
                        <th style="background: rgba(193, 176, 215, 0.75); border-left: 1px solid white;" colspan="17">Half Time Score</th>
                    </tr>
                    <tr style="background: #b7eafc;">        
                        <th class="dualHeader1" colspan="1">&nbsp;</th>
                        <th class="dualHeader1" colspan="3">Home win</th> 
                        <th class="dualHeader1" colspan="1">Draw</th>
                        <th class="dualHeader1" colspan="3">Away Win</th>
                        <th class="dualHeader1" colspan="1">AUQ</th>
                    </tr>
                    <tr style="background: rgba(193, 176, 215, 0.75);">  
                        <th colspan="1">&nbsp;</th>
                        <th colspan="1">1-0</th> 
                        <th colspan="1">2-0</th>
                        <th colspan="1">2-1</th>
                        <th colspan="1">1-1</th>
                        <th colspan="1">0-1</th>
                        <th colspan="1">0-2</th>
                        <th colspan="1">1-2</th>
                        <th colspan="1">AUQ</th>
                    </tr>
                    <tr style="background-color: lightgrey"> 
                        <td><b>Sample Size:</b></td>
                        <td v-if="half_time_score['1-0'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + half_time_score['1-0'].events" target="_blank">{{half_time_score['1-0'].size}}</a>
                        </td>
                        <td v-else>
                            {{half_time_score['1-0'].size}}
                        </td>
                        <td v-if="half_time_score['2-0'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + half_time_score['2-0'].events" target="_blank">{{half_time_score['2-0'].size}}</a>
                        </td>
                        <td v-else>
                            {{half_time_score['2-0'].size}}
                        </td> 
                        <td v-if="half_time_score['2-1'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + half_time_score['2-1'].events" target="_blank">{{half_time_score['2-1'].size}}</a>
                        </td>
                        <td v-else>
                            {{half_time_score['2-1'].size}}
                        </td> 
                        <td v-if="half_time_score['1-1'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + half_time_score['1-1'].events" target="_blank">{{half_time_score['1-1'].size}}</a>
                        </td>
                        <td v-else>
                            {{half_time_score['1-1'].size}}
                        </td> 
                        <td v-if="half_time_score['0-1'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + half_time_score['0-1'].events" target="_blank">{{half_time_score['0-1'].size}}</a>
                        </td>
                        <td v-else>
                            {{half_time_score['0-1'].size}}
                        </td> 
                        <td v-if="half_time_score['0-2'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + half_time_score['0-2'].events" target="_blank">{{half_time_score['0-2'].size}}</a>
                        </td>
                        <td v-else>
                            {{half_time_score['0-2'].size}}
                        </td> 
                        <td v-if="half_time_score['1-2'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + half_time_score['1-2'].events" target="_blank">{{half_time_score['1-2'].size}}</a>
                        </td>
                        <td v-else>
                            {{half_time_score['1-2'].size}}
                        </td>
                        <td v-if="half_time_score['AUQ'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + half_time_score['AUQ'].events" target="_blank">{{half_time_score['AUQ'].size}}</a>
                        </td>
                        <td v-else>
                            {{half_time_score['AUQ'].size}}
                        </td>                       
                        
                    </tr>
                   <tr style="background-color: lightgrey"> 
                        <td><b>Probability%:</b></td>
                        <td class="rss">{{half_time_score['1-0'].prob}}</td> 
                        <td class="rss">{{half_time_score['2-0'].prob}}</td>
                        <td class="rss">{{half_time_score['2-1'].prob}}</td>

                        <td class="rss">{{half_time_score['1-1'].prob}}</td>
                        <td class="rss">{{half_time_score['0-1'].prob}}</td>
                        <td class="rss">{{half_time_score['0-2'].prob}}</td>
                        <td class="rss">{{half_time_score['1-2'].prob}}</td>
                        <td class="rss">{{half_time_score['AUQ'].prob}}</td>
                    </tr>
                    <tr style="background-color: lightgrey"> 
                        <td><b>Odds</b></td>
                        <td class="rss">{{half_time_score['1-0'].odds}}</td> 
                        <td class="rss">{{half_time_score['2-0'].odds}}</td>
                        <td class="rss">{{half_time_score['2-1'].odds}}</td>

                        <td class="rss">{{half_time_score['1-1'].odds}}</td>
                        <td class="rss">{{half_time_score['0-1'].odds}}</td>
                        <td class="rss">{{half_time_score['0-2'].odds}}</td>
                        <td class="rss">{{half_time_score['1-2'].odds}}</td>
                        <td class="rss">{{half_time_score['AUQ'].odds}}</td>
                    </tr>
                </table>
                <table style="display: inline-block; padding-left: 10px">
                    
                    <tr>        
                        <th style="background: rgba(193, 176, 215, 0.75); border-left: 1px solid white;" colspan="17">2nd Half Only</th>
                    </tr>
                    <tr style="background: #b7eafc;">        
                        <th class="dualHeader1" colspan="1">&nbsp;</th>
                        <th class="dualHeader1" colspan="3">2nd Half Match Odd</th> 
                        
                    </tr>
                    <tr style="background: rgba(193, 176, 215, 0.75);">  
                        <th colspan="1">&nbsp;</th>
                        <th colspan="1">Home</th> 
                        <th colspan="1">Draw</th>
                        <th colspan="1">Away</th>
                        
                    </tr>
                    <tr style="background-color: lightgrey"> 
                        <td><b>Sample Size:</b></td>
                        <td v-if="second_half_only.home.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + second_half_only.home.events" target="_blank">{{second_half_only.home.size}}</a>
                        </td>
                        <td v-else>
                            {{second_half_only.home.size}}
                        </td>
                        <td v-if="second_half_only.draw.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + second_half_only.draw.events" target="_blank">{{second_half_only.draw.size}}</a>
                        </td>
                        <td v-else>
                            {{second_half_only.draw.size}}
                        </td>
                        <td v-if="second_half_only.away.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + second_half_only.away.events" target="_blank">{{second_half_only.away.size}}</a>
                        </td>
                        <td v-else>
                            {{second_half_only.away.size}}
                        </td> 
                    </tr>
                   <tr style="background-color: lightgrey"> 
                        <td><b>Probability%:</b></td>
                        <td class="rss">{{second_half_only.home.prob}}</td> 
                        <td class="rss">{{second_half_only.draw.prob}}</td>
                        <td class="rss">{{second_half_only.away.prob}}</td>
                    </tr>
                    <tr style="background-color: lightgrey"> 
                        <td><b>Odds</b></td>
                        <td class="rss">{{second_half_only.home.odds}}</td> 
                        <td class="rss">{{second_half_only.draw.odds}}</td>
                        <td class="rss">{{second_half_only.away.odds}}</td>
                    </tr>
                </table>
                <div>
                    <b>note:</b> 2nd Half Match Odds market does not exist on betfair but the odds can be used at half time or in the 2nd half for an asian handicap bet or a back/lay of a team to win both halves on betfair.
                </div>
            </CCol>
            <CCol lg="12" style="background: white; padding: 30px; padding-top: 0px;">
                <h5>Full Match Markets</h5>
                <table style="display: inline-block;">
                    
                    <tr>        
                        <th style="background: rgba(193, 176, 215, 0.75); border-left: 1px solid white;" colspan="20">Full Time Main Markets</th>
                    </tr>
                    <tr style="background: #b7eafc;">        
                        <th class="dualHeader1" colspan="1">&nbsp;</th>
                        <th class="dualHeader1" colspan="3">Main Odds</th> 
                        <th class="dualHeader1" colspan="3">Next Goal</th>
                        <th class="dualHeader1" colspan="2">BTTS</th>
                        <th class="dualHeader1" colspan="2">Over/Under 0.5</th>
                        <th class="dualHeader1" colspan="2">Over/Under 1.5</th>
                        <th class="dualHeader1" colspan="2">Over/Under 2.5</th>
                        <th class="dualHeader1" colspan="2">Over/Under 3.5</th>
                        <th class="dualHeader1" colspan="2">Over/Under 4.5</th>                        
                    </tr>
                    <tr style="background: rgba(193, 176, 215, 0.75);">  
                        <th colspan="1">&nbsp;</th>
                        <th colspan="1">Home</th> 
                        <th colspan="1">Draw</th>
                        <th colspan="1">Away</th>
                        <th colspan="1">Home</th>
                        <th colspan="1">Away</th>
                        <th colspan="1">No Goal</th>
                        <th colspan="1">Yes</th>
                        <th colspan="1">No</th>
                        <th colspan="1">Over</th>
                        <th colspan="1">Under</th>
                        <th colspan="1">Over</th>
                        <th colspan="1">Under</th>
                        <th colspan="1">Over</th>
                        <th colspan="1">Under</th>
                        <th colspan="1">Over</th>
                        <th colspan="1">Under</th>
                        <th colspan="1">Over</th>
                        <th colspan="1">Under</th>
                    </tr>
                    <tr style="background-color: lightgrey"> 
                        <td><b>Sample Size:</b></td>
                        <td v-if="fulltime_main_markets.home.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.home.events" target="_blank">{{fulltime_main_markets.home.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.home.size}}
                        </td> 

                        <td v-if="fulltime_main_markets.draw.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.draw.events" target="_blank">{{fulltime_main_markets.draw.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.draw.size}}
                        </td>
                        <td v-if="fulltime_main_markets.away.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.away.events" target="_blank">{{fulltime_main_markets.away.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.away.size}}
                        </td>

                        <td v-if="fulltime_main_markets.homenextgoal.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.homenextgoal.events" target="_blank">{{fulltime_main_markets.homenextgoal.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.homenextgoal.size}}
                        </td> 

                        <td v-if="fulltime_main_markets.awaynextgoal.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.awaynextgoal.events" target="_blank">{{fulltime_main_markets.awaynextgoal.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.awaynextgoal.size}}
                        </td>

                        <td v-if="fulltime_main_markets.nogoal.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.nogoal.events" target="_blank">{{fulltime_main_markets.nogoal.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.nogoal.size}}
                        </td>

                        <td v-if="fulltime_main_markets.btts_yes.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.btts_yes.events" target="_blank">{{fulltime_main_markets.btts_yes.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.btts_yes.size}}
                        </td>

                        <td v-if="fulltime_main_markets.btts_no.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.btts_no.events" target="_blank">{{fulltime_main_markets.btts_no.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.btts_no.size}}
                        </td>

                        <td v-if="fulltime_main_markets.over05.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.over05.events" target="_blank">{{fulltime_main_markets.over05.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.over05.size}}
                        </td>

                        <td v-if="fulltime_main_markets.under05.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.under05.events" target="_blank">{{fulltime_main_markets.under05.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.under05.size}}
                        </td>

                        <td v-if="fulltime_main_markets.over15.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.over15.events" target="_blank">{{fulltime_main_markets.over15.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.over15.size}}
                        </td>

                        <td v-if="fulltime_main_markets.under15.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.under15.events" target="_blank">{{fulltime_main_markets.under15.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.under15.size}}
                        </td>

                        <td v-if="fulltime_main_markets.over25.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.over25.events" target="_blank">{{fulltime_main_markets.over25.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.over25.size}}
                        </td>

                        <td v-if="fulltime_main_markets.under25.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.under25.events" target="_blank">{{fulltime_main_markets.under25.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.under25.size}}
                        </td>

                        <td v-if="fulltime_main_markets.over35.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.over35.events" target="_blank">{{fulltime_main_markets.over35.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.over35.size}}
                        </td>

                        <td v-if="fulltime_main_markets.under35.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.under35.events" target="_blank">{{fulltime_main_markets.under35.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.under35.size}}
                        </td>

                        <td v-if="fulltime_main_markets.over45.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.over45.events" target="_blank">{{fulltime_main_markets.over45.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.over45.size}}
                        </td>

                        <td v-if="fulltime_main_markets.under45.events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + fulltime_main_markets.under45.events" target="_blank">{{fulltime_main_markets.under45.size}}</a>
                        </td>
                        <td v-else>
                            {{fulltime_main_markets.under45.size}}
                        </td>
                    </tr>
                   <tr style="background-color: lightgrey"> 
                        <td><b>Probability%:</b></td>
                        <td class="rss">{{ fulltime_main_markets.home.prob}}</td> 
                        <td class="rss">{{ fulltime_main_markets.draw.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.away.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.homenextgoal.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.awaynextgoal.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.nogoal.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.btts_yes.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.btts_no.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.over05.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.under05.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.over15.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.under15.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.over25.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.under25.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.over35.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.under35.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.over45.prob}}</td>
                        <td class="rss">{{ fulltime_main_markets.under45.prob}}</td>
                    </tr>
                    <tr style="background-color: lightgrey"> 
                        <td><b>Odds</b></td>
                        <td class="rss">{{ fulltime_main_markets.home.odds}}</td> 
                        <td class="rss">{{ fulltime_main_markets.draw.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.away.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.homenextgoal.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.awaynextgoal.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.nogoal.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.btts_yes.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.btts_no.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.over05.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.under05.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.over15.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.under15.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.over25.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.under25.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.over35.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.under35.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.over45.odds}}</td>
                        <td class="rss">{{ fulltime_main_markets.under45.odds}}</td>
                    </tr>
                </table>
                <table style="display: inline-block;">
                    
                    <tr>        
                        <th style="background: rgba(193, 176, 215, 0.75); border-left: 1px solid white;" colspan="27">Correct Score</th>
                    </tr>
                    <tr style="background: #b7eafc;">        
                        <th class="dualHeader1" colspan="1">&nbsp;</th>
                        <th class="dualHeader1" colspan="7">Home win</th> 
                        <th class="dualHeader1" colspan="4">Draw</th>
                        <th class="dualHeader1" colspan="7">Away Win</th>
                       
                    </tr>
                    <tr style="background: rgba(193, 176, 215, 0.75);">  
                        <th colspan="1">&nbsp;</th>
                        <th colspan="1">1-0</th> 
                        <th colspan="1">2-0</th>
                        <th colspan="1">3-0</th>
                        <th colspan="1">2-1</th>
                        <th colspan="1">3-1</th>
                        <th colspan="1">3-2</th>
                        <th colspan="1">AOHW</th>
                        <th colspan="1">1-1</th>
                        <th colspan="1">2-2</th>
                        <th colspan="1">3-3</th>
                        <th colspan="1">AOD</th>
                        <th colspan="1">0-1</th> 
                        <th colspan="1">0-2</th>
                        <th colspan="1">0-3</th>
                        <th colspan="1">1-2</th>
                        <th colspan="1">1-3</th>
                        <th colspan="1">2-3</th>
                        <th colspan="1">AOAW</th>
                    </tr>
                    <tr style="background-color: lightgrey"> 
                        <td><b>Sample Size:</b></td>
                        <td v-if="correct_score['1-0'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['1-0'].events" target="_blank">{{correct_score['1-0'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['1-0'].size }}
                        </td>
                        <td v-if="correct_score['2-0'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['2-0'].events" target="_blank">{{correct_score['2-0'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['2-0'].size }}
                        </td>
                        <td v-if="correct_score['3-0'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['3-0'].events" target="_blank">{{correct_score['3-0'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['3-0'].size }}
                        </td>
                        <td v-if="correct_score['2-1'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['2-1'].events" target="_blank">{{correct_score['2-1'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['2-1'].size }}
                        </td>
                        <td v-if="correct_score['3-1'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['3-1'].events" target="_blank">{{correct_score['3-1'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['3-1'].size }}
                        </td>

                        <td v-if="correct_score['3-2'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['3-2'].events" target="_blank">{{correct_score['3-2'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['3-2'].size }}
                        </td>

                        <td v-if="correct_score['AOHW'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['AOHW'].events" target="_blank">{{correct_score['AOHW'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['AOHW'].size }}
                        </td>

                        <td v-if="correct_score['1-1'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['1-1'].events" target="_blank">{{correct_score['1-1'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['1-1'].size }}
                        </td>

                        <td v-if="correct_score['2-2'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['2-2'].events" target="_blank">{{correct_score['2-2'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['2-2'].size }}
                        </td>
                        
                        <td v-if="correct_score['3-3'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['3-3'].events" target="_blank">{{correct_score['3-3'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['3-3'].size }}
                        </td>

                        <td v-if="correct_score['AOD'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['AOD'].events" target="_blank">{{correct_score['AOD'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['AOD'].size }}
                        </td>

                        <td v-if="correct_score['0-1'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['0-1'].events" target="_blank">{{correct_score['0-1'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['0-1'].size }}
                        </td>

                        <td v-if="correct_score['0-2'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['0-2'].events" target="_blank">{{correct_score['0-2'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['0-2'].size }}
                        </td>
                        <td v-if="correct_score['0-3'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['0-3'].events" target="_blank">{{correct_score['0-3'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['0-3'].size }}
                        </td>
                        <td v-if="correct_score['1-2'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['1-2'].events" target="_blank">{{correct_score['1-2'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['1-2'].size }}
                        </td>

                        <td v-if="correct_score['1-3'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['1-3'].events" target="_blank">{{correct_score['1-3'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['1-3'].size }}
                        </td>

                        <td v-if="correct_score['2-3'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['2-3'].events" target="_blank">{{correct_score['2-3'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['2-3'].size }}
                        </td> 

                        <td v-if="correct_score['AOAW'].events.length > 0">
                            <a :href="'/#/viewevents?idlist=' + correct_score['AOAW'].events" target="_blank">{{correct_score['AOAW'].size}}</a>
                        </td>
                        <td v-else>
                            {{ correct_score['AOAW'].size }}
                        </td> 
                    </tr>
                   <tr style="background-color: lightgrey"> 
                        <td><b>Probability%:</b></td>
                        <td colspan="1">{{ correct_score['1-0'].prob }}</td> 
                        <td colspan="1">{{ correct_score['2-0'].prob }}</td>
                        <td colspan="1">{{ correct_score['3-0'].prob }}</td>
                        <td colspan="1">{{ correct_score['2-1'].prob }}</td>
                        <td colspan="1">{{ correct_score['3-1'].prob }}</td>
                        <td colspan="1">{{ correct_score['3-2'].prob }}</td>
                        <td colspan="1">{{ correct_score['AOHW'].prob }}</td>
                        <td colspan="1">{{ correct_score['1-1'].prob }}</td>
                        <td colspan="1">{{ correct_score['2-2'].prob }}</td>
                        <td colspan="1">{{ correct_score['3-3'].prob }}</td>
                        <td colspan="1">{{ correct_score['AOD'].prob }}</td>
                        <td colspan="1">{{ correct_score['0-1'].prob }}</td> 
                        <td colspan="1">{{ correct_score['0-2'].prob }}</td>
                        <td colspan="1">{{ correct_score['0-3'].prob }}</td>
                        <td colspan="1">{{ correct_score['1-2'].prob }}</td>
                        <td colspan="1">{{ correct_score['1-3'].prob }}</td>
                        <td colspan="1">{{ correct_score['2-3'].prob }}</td>
                        <td colspan="1">{{ correct_score['AOAW'].prob }}</td>
                    </tr>
                    <tr style="background-color: lightgrey"> 
                        <td><b>Odds</b></td>
                        <td colspan="1">{{ correct_score['1-0'].odds }}</td> 
                        <td colspan="1">{{ correct_score['2-0'].odds }}</td>
                        <td colspan="1">{{ correct_score['3-0'].odds }}</td>
                        <td colspan="1">{{ correct_score['2-1'].odds }}</td>
                        <td colspan="1">{{ correct_score['3-1'].odds }}</td>
                        <td colspan="1">{{ correct_score['3-2'].odds }}</td>
                        <td colspan="1">{{ correct_score['AOHW'].odds }}</td>
                        <td colspan="1">{{ correct_score['1-1'].odds }}</td>
                        <td colspan="1">{{ correct_score['2-2'].odds }}</td>
                        <td colspan="1">{{ correct_score['3-3'].odds }}</td>
                        <td colspan="1">{{ correct_score['AOD'].odds }}</td>
                        <td colspan="1">{{ correct_score['0-1'].odds }}</td> 
                        <td colspan="1">{{ correct_score['0-2'].odds }}</td>
                        <td colspan="1">{{ correct_score['0-3'].odds }}</td>
                        <td colspan="1">{{ correct_score['1-2'].odds }}</td>
                        <td colspan="1">{{ correct_score['1-3'].odds }}</td>
                        <td colspan="1">{{ correct_score['2-3'].odds }}</td>
                        <td colspan="1">{{ correct_score['AOAW'].odds }}</td>
                    </tr>
                </table>
               
            </CCol>
            
        </CRow>
    </div>
</template>

<script>
    export default {
        name: 'LiveStatsAnalysis',
        components: {
        },
        data () {
            return {
                from_date: '',
                end_date: '',
                min_minute: 0,
                max_minute: 0,
                events_found: 0,
                league_name: '',
                event_id_list: [],
                eventList:[{'label': 'select an event', 'value': null}],
                leagues: [{"league": '', 'value': 0, 'label': 'select league'}],
                seasons: [
                    {'value': 0, 'label': 'select season'},
                    {'value': 1, 'label': 'Current season'},
                    {'value': 2, 'label': 'Last 2 seasons'},
                    {'value': 3, 'label': 'Last 3 seasons'},
                    {'value': 4, 'label': 'Last 4 seasons'},
                    {'value': 5, 'label': 'Last 5 seasons'},
                ],
                selected_league: null,
                selected_season: null,
                home_pre_odd_min: null,
                home_pre_odd_max: null,
                away_pre_odd_min: null,
                away_pre_odd_max: null,
                draw_pre_odd_min: null,
                draw_pre_odd_max: null,
                result_at_15:{
                    "home": NaN,
                    "away": NaN
                },
                result_at_30:{
                    "home": NaN,
                    "away": NaN
                },
                result_at_ht:{
                    "home": NaN,
                    "away": NaN
                },
                result_at_60:{
                    "home": NaN,
                    "away": NaN
                },
                result_at_75:{
                    "home": NaN,
                    "away": NaN
                },
                result_at_ft:{
                    "home": NaN,
                    "away": NaN
                },
                score_minute_filter:{
                    'minute':{
                        'from': NaN,
                        'to': NaN
                    },
                    'over05':{
                        'from': NaN,
                        'to': NaN
                    },
                    'over15':{
                        'from': NaN,
                        'to': NaN
                    },
                    'over25':{
                        'from': NaN,
                        'to': NaN
                    },
                    'over35':{
                        'from': NaN,
                        'to': NaN
                    },
                    'under05':{
                        'from': NaN,
                        'to': NaN
                    },
                    'under15':{
                        'from': NaN,
                        'to': NaN
                    },
                    'under25':{
                        'from': NaN,
                        'to': NaN
                    },
                    'under35':{
                        'from': NaN,
                        'to': NaN
                    },
                    'home':{
                        'from': NaN,
                        'to': NaN
                    },
                    'draws':{
                        'from': NaN,
                        'to': NaN
                    },
                    'away':{
                        'from': NaN,
                        'to': NaN
                    },
                    'bts':{
                        'from': NaN,
                        'to': NaN
                    },
                    'odd':{
                        'from': NaN,
                        'to': NaN
                    },
                    'even':{
                        'from': NaN,
                        'to': NaN
                    }
                },
                homeTeam:{                    
                    'rank': {
                        'from': NaN,
                        'to': NaN
                    },
                    'on': {
                        'from': NaN,
                        'to': NaN
                    },
                    'off': {
                        'from': NaN,
                        'to': NaN
                    },
                    'blk': {
                        'from': NaN,
                        'to': NaN
                    },
                    'in': {
                        'from': NaN,
                        'to': NaN
                    },
                    'out': {
                        'from': NaN,
                        'to': NaN
                    },
                    'cnr': {
                        'from': NaN,
                        'to': NaN
                    },
                    'da': {
                        'from': NaN,
                        'to': NaN
                    },
                    'pos': {
                        'from': NaN,
                        'to': NaN
                    },
                    'red': {
                        'from': NaN,
                        'to': NaN
                    },
                    'yel': {
                        'from': NaN,
                        'to': NaN
                    },
                    'goal': {
                        'from': NaN,
                        'to': NaN
                    }
                },
                awayTeam:{                    
                    'rank': {
                        'from': NaN,
                        'to': NaN
                    },
                    'on': {
                        'from': NaN,
                        'to': NaN
                    },
                    'off': {
                        'from': NaN,
                        'to': NaN
                    },
                    'blk': {
                        'from': NaN,
                        'to': NaN
                    },
                    'in': {
                        'from': NaN,
                        'to': NaN
                    },
                    'out': {
                        'from': NaN,
                        'to': NaN
                    },
                    'cnr': {
                        'from': NaN,
                        'to': NaN
                    },
                    'da': {
                        'from': NaN,
                        'to': NaN
                    },
                    'pos': {
                        'from': NaN,
                        'to': NaN
                    },
                    'red': {
                        'from': NaN,
                        'to': NaN
                    },
                    'yel': {
                        'from': NaN,
                        'to': NaN
                    },
                    'goal': {
                        'from': NaN,
                        'to': NaN
                    }
                },
                origin_events: [],
                first_half_markets:{
                    'home': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'draw': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'away': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'over05': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'under05': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'over15': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'under15': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'over25': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'under25': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    }
                },
                half_time_score:{
                    '1-0': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '2-0': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '2-1': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '1-1': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '0-1': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '0-2': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '1-2': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'AUQ': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    }
                },
                second_half_only:{
                    'home': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'draw': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'away': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    }
                },
                fulltime_main_markets:{
                    'home': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'draw': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'away': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'homenextgoal': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'awaynextgoal': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'nogoal': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'btts_yes': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'btts_no': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'over05': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'under05': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'over15': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'under15': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'over25': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'under25': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'over35': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'under35': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'over45': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'under45': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    }
                },

                correct_score:{
                    '1-0': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '2-0': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '3-0': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '2-1': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '3-1': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '3-2': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'AOHW': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '1-1': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '2-2': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '3-3': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'AOD': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '0-1': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '0-2': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '0-3': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '1-2': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '1-3': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    '2-3': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    },
                    'AOAW': {
                        'size': '',
                        'prob': '',
                        'odds': '',
                        'events': []
                    }
                },
               
                
                
            }
        },
        methods: {
            showModal() {
                this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
            },
            hideModal() {
                this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
            },
            getTable(val1, val2, val3){
                window.axios.post(`${process.env.VUE_APP_URL}getlivestatsData`, [val1, val2, val3]).then(({data})=> {
                    console.log('liveStatsData==>', data.data[0])
                    let events = data.data[0]
                    this.eventList = [{'label': 'select an event', 'value': null}]
                    for(let i = 0 ; i < events.length ; i++){
                        console.log(events[i])
                        if(events[i].time[0]){
                            let date_str = events[i].time[0].starting_at.date_time.split(" ")[0] + ', '+ events[i].time[0].starting_at.date_time.split(" ")[1]
                            let label = date_str + ' >> ' + events[i].home_name + ' v ' + events[i].away_name
                            this.eventList.push({"label": label, "value": events[i]})
                        }
                    }
                    this.origin_events = this.eventList
                    console.log('origin_events=>', this.origin_events)
                    this.matches_found = this.eventList.length - 1
                    this.missed_filtered_result = 0
                    this.missed_matches_found = 0
                    for(let i = 1 ; i < this.eventList.length ; i++){
                        if(this.eventList[i].value.stats.length < 1){
                            this.missed_filtered_result++
                            this.missed_matches_found++
                        }
                    }
                    this.filtered_result = this.eventList.length - 1
                    this.get_time_seg_stats(this.origin_events)
                    this.homeTeam = {
                        'minute':{
                            'from': 0,
                            'to': 1000
                        },
                        'rank': {
                            'from': 0,
                            'to': 1000
                        },
                        'on': {
                            'from': 0,
                            'to': 1000
                        },
                        'off': {
                            'from': 0,
                            'to': 1000
                        },
                        'blk': {
                            'from': 0,
                            'to': 1000
                        },
                        'in': {
                            'from': 0,
                            'to': 1000
                        },
                        'out': {
                            'from': 0,
                            'to': 1000
                        },
                        'cnr': {
                            'from': 0,
                            'to': 1000
                        },
                        'da': {
                            'from': 0,
                            'to': 1000
                        },
                        'pos': {
                            'from': 0,
                            'to': 1000
                        },
                        'red': {
                            'from': 0,
                            'to': 1000
                        },
                        'yel': {
                            'from': 0,
                            'to': 1000
                        },
                        'goal': {
                            'from': 0,
                            'to': 1000
                        }
                    }
                    this.awayTeam = {
                        'minute':{
                            'from': 0,
                            'to': 1000
                        },
                        'rank': {
                            'from': 0,
                            'to': 1000
                        },
                        'on': {
                            'from': 0,
                            'to': 1000
                        },
                        'off': {
                            'from': 0,
                            'to': 1000
                        },
                        'blk': {
                            'from': 0,
                            'to': 1000
                        },
                        'in': {
                            'from': 0,
                            'to': 1000
                        },
                        'out': {
                            'from': 0,
                            'to': 1000
                        },
                        'cnr': {
                            'from': 0,
                            'to': 1000
                        },
                        'da': {
                            'from': 0,
                            'to': 1000
                        },
                        'pos': {
                            'from': 0,
                            'to': 1000
                        },
                        'red': {
                            'from': 0,
                            'to': 1000
                        },
                        'yel': {
                            'from': 0,
                            'to': 1000
                        },
                        'goal': {
                            'from': 0,
                            'to': 1000
                        }
                    }
                })
            },
            get_time_seg_stats(val){
                let event_array = val
                this.stats_segment = {
                    stats_0_15:{
                        'score_over00':0,
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_over45':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_16_30:{
                        'score_over00':0,
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_over45':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_31_45:{
                        'score_over00':0,
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_over45':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_46_60:{
                        'score_over00':0,
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_over45':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_61_75:{
                        'score_over00':0,
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_over45':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_76_90:{
                        'score_over00':0,
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_over45':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    }
                }
                let stats_segment = {
                    stats_0_15:{
                        'score_over00_home':0,
                        'score_over15_home':0,
                        'score_over25_home':0,
                        'score_over35_home':0,
                        'score_over45_home':0,
                        'score_home_home':0,
                        'score_draw_home':0,
                        'score_away_home':0,
                        'score_bts_home':0,
                        'score_odd_home':0,
                        'score_even_home':0,

                        'score_over00_away':0,
                        'score_over15_away':0,
                        'score_over25_away':0,
                        'score_over35_away':0,
                        'score_over45_away':0,
                        'score_home_away':0,
                        'score_draw_away':0,
                        'score_away_away':0,
                        'score_bts_away':0,
                        'score_odd_away':0,
                        'score_even_away':0
                    },
                    stats_16_30:{
                        'score_over00_home':0,
                        'score_over15_home':0,
                        'score_over25_home':0,
                        'score_over35_home':0,
                        'score_over45_home':0,
                        'score_home_home':0,
                        'score_draw_home':0,
                        'score_away_home':0,
                        'score_bts_home':0,
                        'score_odd_home':0,
                        'score_even_home':0,

                        'score_over00_away':0,
                        'score_over15_away':0,
                        'score_over25_away':0,
                        'score_over35_away':0,
                        'score_over45_away':0,
                        'score_home_away':0,
                        'score_draw_away':0,
                        'score_away_away':0,
                        'score_bts_away':0,
                        'score_odd_away':0,
                        'score_even_away':0
                    },
                    stats_31_45:{
                        'score_over00_home':0,
                        'score_over15_home':0,
                        'score_over25_home':0,
                        'score_over35_home':0,
                        'score_over45_home':0,
                        'score_home_home':0,
                        'score_draw_home':0,
                        'score_away_home':0,
                        'score_bts_home':0,
                        'score_odd_home':0,
                        'score_even_home':0,

                        'score_over00_away':0,
                        'score_over15_away':0,
                        'score_over25_away':0,
                        'score_over35_away':0,
                        'score_over45_away':0,
                        'score_home_away':0,
                        'score_draw_away':0,
                        'score_away_away':0,
                        'score_bts_away':0,
                        'score_odd_away':0,
                        'score_even_away':0
                    },
                    stats_46_60:{
                        'score_over00_home':0,
                        'score_over15_home':0,
                        'score_over25_home':0,
                        'score_over35_home':0,
                        'score_over45_home':0,
                        'score_home_home':0,
                        'score_draw_home':0,
                        'score_away_home':0,
                        'score_bts_home':0,
                        'score_odd_home':0,
                        'score_even_home':0,

                        'score_over00_away':0,
                        'score_over15_away':0,
                        'score_over25_away':0,
                        'score_over35_away':0,
                        'score_over45_away':0,
                        'score_home_away':0,
                        'score_draw_away':0,
                        'score_away_away':0,
                        'score_bts_away':0,
                        'score_odd_away':0,
                        'score_even_away':0
                    },
                    stats_61_75:{
                        'score_over00_home':0,
                        'score_over15_home':0,
                        'score_over25_home':0,
                        'score_over35_home':0,
                        'score_over45_home':0,
                        'score_home_home':0,
                        'score_draw_home':0,
                        'score_away_home':0,
                        'score_bts_home':0,
                        'score_odd_home':0,
                        'score_even_home':0,

                        'score_over00_away':0,
                        'score_over15_away':0,
                        'score_over25_away':0,
                        'score_over35_away':0,
                        'score_over45_away':0,
                        'score_home_away':0,
                        'score_draw_away':0,
                        'score_away_away':0,
                        'score_bts_away':0,
                        'score_odd_away':0,
                        'score_even_away':0
                    },
                    stats_76_90:{
                        'score_over00_home':0,
                        'score_over15_home':0,
                        'score_over25_home':0,
                        'score_over35_home':0,
                        'score_over45_home':0,
                        'score_home_home':0,
                        'score_draw_home':0,
                        'score_away_home':0,
                        'score_bts_home':0,
                        'score_odd_home':0,
                        'score_even_home':0,

                        'score_over00_away':0,
                        'score_over15_away':0,
                        'score_over25_away':0,
                        'score_over35_away':0,
                        'score_over45_away':0,
                        'score_home_away':0,
                        'score_draw_away':0,
                        'score_away_away':0,
                        'score_bts_away':0,
                        'score_odd_away':0,
                        'score_even_away':0
                    }
                }
                this.total_live_home_stats = {
                    'goal': 0,
                    'on': 0,
                    'off': 0,
                    'blk': 0,
                    'in': 0,
                    'out': 0,
                    'cnr': 0,
                    'da': 0,
                    'pos': 0,
                    'red': 0,
                    'yel': 0
                }
                this.total_live_away_stats = {
                    'goal': 0,
                    'on': 0,
                    'off': 0,
                    'blk': 0,
                    'in': 0,
                    'out': 0,
                    'cnr': 0,
                    'da': 0,
                    'pos': 0,
                    'red': 0,
                    'yel': 0
                }
                this.live_segment_stats = {
                    'stats_0_15': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_16_30': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_31_45': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_46_60': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_61_75': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_76_90': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    }
                }
                this.live_segment_stats1 = {
                    'stats_0_15': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_16_30': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_31_45': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_46_60': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_61_75': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_76_90': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    }
                }
                for(let i = 1; i < event_array.length; i++){
                    let value = event_array[i].value.scores
                    let times = event_array[i].value.time
                    let stats = event_array[i].value.stats
                    let home_id = event_array[i].value.home_id
                    let away_id = event_array[i].value.away_id
                    stats_segment = {
                        stats_0_15:{
                            'score_over00_home':0,
                            'score_over15_home':0,
                            'score_over25_home':0,
                            'score_over35_home':0,
                            'score_over45_home':0,
                            'score_home_home':0,
                            'score_draw_home':0,
                            'score_away_home':0,
                            'score_bts_home':0,
                            'score_odd_home':0,
                            'score_even_home':0,

                            'score_over00_away':0,
                            'score_over15_away':0,
                            'score_over25_away':0,
                            'score_over35_away':0,
                            'score_over45_away':0,
                            'score_home_away':0,
                            'score_draw_away':0,
                            'score_away_away':0,
                            'score_bts_away':0,
                            'score_odd_away':0,
                            'score_even_away':0
                        },
                        stats_16_30:{
                            'score_over00_home':0,
                            'score_over15_home':0,
                            'score_over25_home':0,
                            'score_over35_home':0,
                            'score_over45_home':0,
                            'score_home_home':0,
                            'score_draw_home':0,
                            'score_away_home':0,
                            'score_bts_home':0,
                            'score_odd_home':0,
                            'score_even_home':0,

                            'score_over00_away':0,
                            'score_over15_away':0,
                            'score_over25_away':0,
                            'score_over35_away':0,
                            'score_over45_away':0,
                            'score_home_away':0,
                            'score_draw_away':0,
                            'score_away_away':0,
                            'score_bts_away':0,
                            'score_odd_away':0,
                            'score_even_away':0
                        },
                        stats_31_45:{
                            'score_over00_home':0,
                            'score_over15_home':0,
                            'score_over25_home':0,
                            'score_over35_home':0,
                            'score_over45_home':0,
                            'score_home_home':0,
                            'score_draw_home':0,
                            'score_away_home':0,
                            'score_bts_home':0,
                            'score_odd_home':0,
                            'score_even_home':0,

                            'score_over00_away':0,
                            'score_over15_away':0,
                            'score_over25_away':0,
                            'score_over35_away':0,
                            'score_over45_away':0,
                            'score_home_away':0,
                            'score_draw_away':0,
                            'score_away_away':0,
                            'score_bts_away':0,
                            'score_odd_away':0,
                            'score_even_away':0
                        },
                        stats_46_60:{
                            'score_over00_home':0,
                            'score_over15_home':0,
                            'score_over25_home':0,
                            'score_over35_home':0,
                            'score_over45_home':0,
                            'score_home_home':0,
                            'score_draw_home':0,
                            'score_away_home':0,
                            'score_bts_home':0,
                            'score_odd_home':0,
                            'score_even_home':0,

                            'score_over00_away':0,
                            'score_over15_away':0,
                            'score_over25_away':0,
                            'score_over35_away':0,
                            'score_over45_away':0,
                            'score_home_away':0,
                            'score_draw_away':0,
                            'score_away_away':0,
                            'score_bts_away':0,
                            'score_odd_away':0,
                            'score_even_away':0
                        },
                        stats_61_75:{
                            'score_over00_home':0,
                            'score_over15_home':0,
                            'score_over25_home':0,
                            'score_over35_home':0,
                            'score_over45_home':0,
                            'score_home_home':0,
                            'score_draw_home':0,
                            'score_away_home':0,
                            'score_bts_home':0,
                            'score_odd_home':0,
                            'score_even_home':0,

                            'score_over00_away':0,
                            'score_over15_away':0,
                            'score_over25_away':0,
                            'score_over35_away':0,
                            'score_over45_away':0,
                            'score_home_away':0,
                            'score_draw_away':0,
                            'score_away_away':0,
                            'score_bts_away':0,
                            'score_odd_away':0,
                            'score_even_away':0
                        },
                        stats_76_90:{
                            'score_over00_home':0,
                            'score_over15_home':0,
                            'score_over25_home':0,
                            'score_over35_home':0,
                            'score_over45_home':0,
                            'score_home_home':0,
                            'score_draw_home':0,
                            'score_away_home':0,
                            'score_bts_home':0,
                            'score_odd_home':0,
                            'score_even_home':0,

                            'score_over00_away':0,
                            'score_over15_away':0,
                            'score_over25_away':0,
                            'score_over35_away':0,
                            'score_over45_away':0,
                            'score_home_away':0,
                            'score_draw_away':0,
                            'score_away_away':0,
                            'score_bts_away':0,
                            'score_odd_away':0,
                            'score_even_away':0
                        }
                    }
                    let live_segment_stats1 = {
                        'stats_0_15': {
                            home:{
                                'goal': 0,
                                'on': 0,
                                'off': 0,
                                'blk': 0,
                                'in': 0,
                                'out': 0,
                                'cnr': 0,
                                'da': 0,
                                'pos': 0,
                                'red': 0,
                                'yel': 0
                            },
                            away:{
                                'goal': 0,
                                'on': 0,
                                'off': 0,
                                'blk': 0,
                                'in': 0,
                                'out': 0,
                                'cnr': 0,
                                'da': 0,
                                'pos': 0,
                                'red': 0,
                                'yel': 0
                            }
                        },
                        'stats_16_30': {
                            home:{
                                'goal': 0,
                                'on': 0,
                                'off': 0,
                                'blk': 0,
                                'in': 0,
                                'out': 0,
                                'cnr': 0,
                                'da': 0,
                                'pos': 0,
                                'red': 0,
                                'yel': 0
                            },
                            away:{
                                'goal': 0,
                                'on': 0,
                                'off': 0,
                                'blk': 0,
                                'in': 0,
                                'out': 0,
                                'cnr': 0,
                                'da': 0,
                                'pos': 0,
                                'red': 0,
                                'yel': 0
                            }
                        },
                        'stats_31_45': {
                            home:{
                                'goal': 0,
                                'on': 0,
                                'off': 0,
                                'blk': 0,
                                'in': 0,
                                'out': 0,
                                'cnr': 0,
                                'da': 0,
                                'pos': 0,
                                'red': 0,
                                'yel': 0
                            },
                            away:{
                                'goal': 0,
                                'on': 0,
                                'off': 0,
                                'blk': 0,
                                'in': 0,
                                'out': 0,
                                'cnr': 0,
                                'da': 0,
                                'pos': 0,
                                'red': 0,
                                'yel': 0
                            }
                        },
                        'stats_46_60': {
                            home:{
                                'goal': 0,
                                'on': 0,
                                'off': 0,
                                'blk': 0,
                                'in': 0,
                                'out': 0,
                                'cnr': 0,
                                'da': 0,
                                'pos': 0,
                                'red': 0,
                                'yel': 0
                            },
                            away:{
                                'goal': 0,
                                'on': 0,
                                'off': 0,
                                'blk': 0,
                                'in': 0,
                                'out': 0,
                                'cnr': 0,
                                'da': 0,
                                'pos': 0,
                                'red': 0,
                                'yel': 0
                            }
                        },
                        'stats_61_75': {
                            home:{
                                'goal': 0,
                                'on': 0,
                                'off': 0,
                                'blk': 0,
                                'in': 0,
                                'out': 0,
                                'cnr': 0,
                                'da': 0,
                                'pos': 0,
                                'red': 0,
                                'yel': 0
                            },
                            away:{
                                'goal': 0,
                                'on': 0,
                                'off': 0,
                                'blk': 0,
                                'in': 0,
                                'out': 0,
                                'cnr': 0,
                                'da': 0,
                                'pos': 0,
                                'red': 0,
                                'yel': 0
                            }
                        },
                        'stats_76_90': {
                            home:{
                                'goal': 0,
                                'on': 0,
                                'off': 0,
                                'blk': 0,
                                'in': 0,
                                'out': 0,
                                'cnr': 0,
                                'da': 0,
                                'pos': 0,
                                'red': 0,
                                'yel': 0
                            },
                            away:{
                                'goal': 0,
                                'on': 0,
                                'off': 0,
                                'blk': 0,
                                'in': 0,
                                'out': 0,
                                'cnr': 0,
                                'da': 0,
                                'pos': 0,
                                'red': 0,
                                'yel': 0
                            }
                        }
                    }
                    if(times.length > 0){
                        for(let j = 0; j < times.length; j++){
                            if(times[j].minute <= 15){
                                stats_segment.stats_0_15.score_over00_home = value[j].localteam_score
                                stats_segment.stats_0_15.score_over00_away = value[j].visitorteam_score
                                stats_segment.stats_0_15.score_over15_home = value[j].localteam_score
                                stats_segment.stats_0_15.score_over15_away = value[j].visitorteam_score
                                stats_segment.stats_0_15.score_over25_home = value[j].localteam_score
                                stats_segment.stats_0_15.score_over25_away = value[j].visitorteam_score
                                stats_segment.stats_0_15.score_over35_home = value[j].localteam_score
                                stats_segment.stats_0_15.score_over35_away = value[j].visitorteam_score
                                stats_segment.stats_0_15.score_over45_home = value[j].localteam_score
                                stats_segment.stats_0_15.score_over45_away = value[j].visitorteam_score
                                stats_segment.stats_0_15.score_home_home = value[j].localteam_score
                                stats_segment.stats_0_15.score_home_away = value[j].visitorteam_score
                                stats_segment.stats_0_15.score_away_home = value[j].localteam_score
                                stats_segment.stats_0_15.score_away_away = value[j].visitorteam_score
                                stats_segment.stats_0_15.score_draw_home = value[j].localteam_score
                                stats_segment.stats_0_15.score_draw_away = value[j].visitorteam_score
                                stats_segment.stats_0_15.score_bts_home = value[j].localteam_score
                                stats_segment.stats_0_15.score_bts_away = value[j].visitorteam_score
                                stats_segment.stats_0_15.score_odd_home = value[j].localteam_score
                                stats_segment.stats_0_15.score_odd_away = value[j].visitorteam_score
                                stats_segment.stats_0_15.score_even_home = value[j].localteam_score
                                stats_segment.stats_0_15.score_even_away = value[j].visitorteam_score
                            }
                            if(times[j].minute > 15 && times[j].minute <= 30){
                                stats_segment.stats_16_30.score_over00_home = value[j].localteam_score
                                stats_segment.stats_16_30.score_over00_away = value[j].visitorteam_score
                                stats_segment.stats_16_30.score_over15_home = value[j].localteam_score
                                stats_segment.stats_16_30.score_over15_away = value[j].visitorteam_score
                                stats_segment.stats_16_30.score_over25_home = value[j].localteam_score
                                stats_segment.stats_16_30.score_over25_away = value[j].visitorteam_score
                                stats_segment.stats_16_30.score_over35_home = value[j].localteam_score
                                stats_segment.stats_16_30.score_over35_away = value[j].visitorteam_score
                                stats_segment.stats_16_30.score_over45_home = value[j].localteam_score
                                stats_segment.stats_16_30.score_over45_away = value[j].visitorteam_score
                                stats_segment.stats_16_30.score_home_home = value[j].localteam_score
                                stats_segment.stats_16_30.score_home_away = value[j].visitorteam_score
                                stats_segment.stats_16_30.score_away_home = value[j].localteam_score
                                stats_segment.stats_16_30.score_away_away = value[j].visitorteam_score
                                stats_segment.stats_16_30.score_draw_home = value[j].localteam_score
                                stats_segment.stats_16_30.score_draw_away = value[j].visitorteam_score
                                stats_segment.stats_16_30.score_bts_home = value[j].localteam_score
                                stats_segment.stats_16_30.score_bts_away = value[j].visitorteam_score
                                stats_segment.stats_16_30.score_odd_home = value[j].localteam_score
                                stats_segment.stats_16_30.score_odd_away = value[j].visitorteam_score
                                stats_segment.stats_16_30.score_even_home = value[j].localteam_score
                                stats_segment.stats_16_30.score_even_away = value[j].visitorteam_score
                            }
                            if(times[j].minute > 30 && times[j].minute <= 45){
                                stats_segment.stats_31_45.score_over00_home = value[j].localteam_score
                                stats_segment.stats_31_45.score_over00_away = value[j].visitorteam_score
                                stats_segment.stats_31_45.score_over15_home = value[j].localteam_score
                                stats_segment.stats_31_45.score_over15_away = value[j].visitorteam_score
                                stats_segment.stats_31_45.score_over25_home = value[j].localteam_score
                                stats_segment.stats_31_45.score_over25_away = value[j].visitorteam_score
                                stats_segment.stats_31_45.score_over35_home = value[j].localteam_score
                                stats_segment.stats_31_45.score_over35_away = value[j].visitorteam_score
                                stats_segment.stats_31_45.score_over45_home = value[j].localteam_score
                                stats_segment.stats_31_45.score_over45_away = value[j].visitorteam_score
                                stats_segment.stats_31_45.score_home_home = value[j].localteam_score
                                stats_segment.stats_31_45.score_home_away = value[j].visitorteam_score
                                stats_segment.stats_31_45.score_away_home = value[j].localteam_score
                                stats_segment.stats_31_45.score_away_away = value[j].visitorteam_score
                                stats_segment.stats_31_45.score_draw_home = value[j].localteam_score
                                stats_segment.stats_31_45.score_draw_away = value[j].visitorteam_score
                                stats_segment.stats_31_45.score_bts_home = value[j].localteam_score
                                stats_segment.stats_31_45.score_bts_away = value[j].visitorteam_score
                                stats_segment.stats_31_45.score_odd_home = value[j].localteam_score
                                stats_segment.stats_31_45.score_odd_away = value[j].visitorteam_score
                                stats_segment.stats_31_45.score_even_home = value[j].localteam_score
                                stats_segment.stats_31_45.score_even_away = value[j].visitorteam_score
                            }
                            if(times[j].minute > 45 && times[j].minute <= 60){
                                stats_segment.stats_46_60.score_over00_home = value[j].localteam_score
                                stats_segment.stats_46_60.score_over00_away = value[j].visitorteam_score
                                stats_segment.stats_46_60.score_over15_home = value[j].localteam_score
                                stats_segment.stats_46_60.score_over15_away = value[j].visitorteam_score
                                stats_segment.stats_46_60.score_over25_home = value[j].localteam_score
                                stats_segment.stats_46_60.score_over25_away = value[j].visitorteam_score
                                stats_segment.stats_46_60.score_over35_home = value[j].localteam_score
                                stats_segment.stats_46_60.score_over35_away = value[j].visitorteam_score
                                stats_segment.stats_46_60.score_over45_home = value[j].localteam_score
                                stats_segment.stats_46_60.score_over45_away = value[j].visitorteam_score
                                stats_segment.stats_46_60.score_home_home = value[j].localteam_score
                                stats_segment.stats_46_60.score_home_away = value[j].visitorteam_score
                                stats_segment.stats_46_60.score_away_home = value[j].localteam_score
                                stats_segment.stats_46_60.score_away_away = value[j].visitorteam_score
                                stats_segment.stats_46_60.score_draw_home = value[j].localteam_score
                                stats_segment.stats_46_60.score_draw_away = value[j].visitorteam_score
                                stats_segment.stats_46_60.score_bts_home = value[j].localteam_score
                                stats_segment.stats_46_60.score_bts_away = value[j].visitorteam_score
                                stats_segment.stats_46_60.score_odd_home = value[j].localteam_score
                                stats_segment.stats_46_60.score_odd_away = value[j].visitorteam_score
                                stats_segment.stats_46_60.score_even_home = value[j].localteam_score
                                stats_segment.stats_46_60.score_even_away = value[j].visitorteam_score
                            }
                            if(times[j].minute > 60 && times[j].minute <= 75){
                                stats_segment.stats_61_75.score_over00_home = value[j].localteam_score
                                stats_segment.stats_61_75.score_over00_away = value[j].visitorteam_score
                                stats_segment.stats_61_75.score_over15_home = value[j].localteam_score
                                stats_segment.stats_61_75.score_over15_away = value[j].visitorteam_score
                                stats_segment.stats_61_75.score_over25_home = value[j].localteam_score
                                stats_segment.stats_61_75.score_over25_away = value[j].visitorteam_score
                                stats_segment.stats_61_75.score_over35_home = value[j].localteam_score
                                stats_segment.stats_61_75.score_over35_away = value[j].visitorteam_score
                                stats_segment.stats_61_75.score_over45_home = value[j].localteam_score
                                stats_segment.stats_61_75.score_over45_away = value[j].visitorteam_score
                                stats_segment.stats_61_75.score_home_home = value[j].localteam_score
                                stats_segment.stats_61_75.score_home_away = value[j].visitorteam_score
                                stats_segment.stats_61_75.score_away_home = value[j].localteam_score
                                stats_segment.stats_61_75.score_away_away = value[j].visitorteam_score
                                stats_segment.stats_61_75.score_draw_home = value[j].localteam_score
                                stats_segment.stats_61_75.score_draw_away = value[j].visitorteam_score
                                stats_segment.stats_61_75.score_bts_home = value[j].localteam_score
                                stats_segment.stats_61_75.score_bts_away = value[j].visitorteam_score
                                stats_segment.stats_61_75.score_odd_home = value[j].localteam_score
                                stats_segment.stats_61_75.score_odd_away = value[j].visitorteam_score
                                stats_segment.stats_61_75.score_even_home = value[j].localteam_score
                                stats_segment.stats_61_75.score_even_away = value[j].visitorteam_score
                            }
                            if(times[j].minute > 75 && times[j].minute <= 90){
                                stats_segment.stats_76_90.score_over00_home = value[j].localteam_score
                                stats_segment.stats_76_90.score_over00_away = value[j].visitorteam_score
                                stats_segment.stats_76_90.score_over15_home = value[j].localteam_score
                                stats_segment.stats_76_90.score_over15_away = value[j].visitorteam_score
                                stats_segment.stats_76_90.score_over25_home = value[j].localteam_score
                                stats_segment.stats_76_90.score_over25_away = value[j].visitorteam_score
                                stats_segment.stats_76_90.score_over35_home = value[j].localteam_score
                                stats_segment.stats_76_90.score_over35_away = value[j].visitorteam_score
                                stats_segment.stats_76_90.score_over45_home = value[j].localteam_score
                                stats_segment.stats_76_90.score_over45_away = value[j].visitorteam_score
                                stats_segment.stats_76_90.score_home_home = value[j].localteam_score
                                stats_segment.stats_76_90.score_home_away = value[j].visitorteam_score
                                stats_segment.stats_76_90.score_away_home = value[j].localteam_score
                                stats_segment.stats_76_90.score_away_away = value[j].visitorteam_score
                                stats_segment.stats_76_90.score_draw_home = value[j].localteam_score
                                stats_segment.stats_76_90.score_draw_away = value[j].visitorteam_score
                                stats_segment.stats_76_90.score_bts_home = value[j].localteam_score
                                stats_segment.stats_76_90.score_bts_away = value[j].visitorteam_score
                                stats_segment.stats_76_90.score_odd_home = value[j].localteam_score
                                stats_segment.stats_76_90.score_odd_away = value[j].visitorteam_score
                                stats_segment.stats_76_90.score_even_home = value[j].localteam_score
                                stats_segment.stats_76_90.score_even_away = value[j].visitorteam_score
                            }
                        }
                        if(stats_segment.stats_0_15.score_over00_home == "0" && stats_segment.stats_0_15.score_over00_away == "0"){ this.stats_segment.stats_0_15.score_over00++ }
                        if(parseInt(stats_segment.stats_0_15.score_over15_home) + parseInt(stats_segment.stats_0_15.score_over15_away) > 1){ this.stats_segment.stats_0_15.score_over15++ }
                        if(parseInt(stats_segment.stats_0_15.score_over25_home) + parseInt(stats_segment.stats_0_15.score_over25_away) > 2){ this.stats_segment.stats_0_15.score_over25++ }
                        if(parseInt(stats_segment.stats_0_15.score_over35_home) + parseInt(stats_segment.stats_0_15.score_over35_away) > 3){ this.stats_segment.stats_0_15.score_over35++ }
                        if(parseInt(stats_segment.stats_0_15.score_over45_home) + parseInt(stats_segment.stats_0_15.score_over45_away) > 4){ this.stats_segment.stats_0_15.score_over45++ }
                        if(parseInt(stats_segment.stats_0_15.score_home_home) > parseInt(stats_segment.stats_0_15.score_home_away) ){ this.stats_segment.stats_0_15.score_home++ }
                        if(parseInt(stats_segment.stats_0_15.score_away_home) < parseInt(stats_segment.stats_0_15.score_away_away) ){ this.stats_segment.stats_0_15.score_away++ }
                        if(parseInt(stats_segment.stats_0_15.score_draw_home) === parseInt(stats_segment.stats_0_15.score_draw_away) ){ this.stats_segment.stats_0_15.score_draw++ }
                        if(parseInt(stats_segment.stats_0_15.score_bts_home) > 0 && parseInt(stats_segment.stats_0_15.score_bts_away) > 0 ){ this.stats_segment.stats_0_15.score_bts++ }
                        if((parseInt(stats_segment.stats_0_15.score_home_home) + parseInt(stats_segment.stats_0_15.score_home_away)) % 2 === 1 ){ this.stats_segment.stats_0_15.score_odd++ }
                        if((parseInt(stats_segment.stats_0_15.score_home_home) + parseInt(stats_segment.stats_0_15.score_home_away)) % 2 === 0 ){ this.stats_segment.stats_0_15.score_even++ }

                        if(stats_segment.stats_16_30.score_over00_home == "0" && stats_segment.stats_16_30.score_over00_away == "0"){ this.stats_segment.stats_16_30.score_over00++ }
                        if(parseInt(stats_segment.stats_16_30.score_over15_home) + parseInt(stats_segment.stats_16_30.score_over15_away) > 1){ this.stats_segment.stats_16_30.score_over15++ }
                        if(parseInt(stats_segment.stats_16_30.score_over25_home) + parseInt(stats_segment.stats_16_30.score_over25_away) > 2){ this.stats_segment.stats_16_30.score_over25++ }
                        if(parseInt(stats_segment.stats_16_30.score_over35_home) + parseInt(stats_segment.stats_16_30.score_over35_away) > 3){ this.stats_segment.stats_16_30.score_over35++ }
                        if(parseInt(stats_segment.stats_16_30.score_over45_home) + parseInt(stats_segment.stats_16_30.score_over45_away) > 4){ this.stats_segment.stats_16_30.score_over45++ }
                        if(parseInt(stats_segment.stats_16_30.score_home_home) > parseInt(stats_segment.stats_16_30.score_home_away) ){ this.stats_segment.stats_16_30.score_home++ }
                        if(parseInt(stats_segment.stats_16_30.score_away_home) < parseInt(stats_segment.stats_16_30.score_away_away) ){ this.stats_segment.stats_16_30.score_away++ }
                        if(parseInt(stats_segment.stats_16_30.score_draw_home) === parseInt(stats_segment.stats_16_30.score_draw_away) ){ this.stats_segment.stats_16_30.score_draw++ }
                        if(parseInt(stats_segment.stats_16_30.score_bts_home) > 0 && parseInt(stats_segment.stats_16_30.score_bts_away) > 0 ){ this.stats_segment.stats_16_30.score_bts++ }
                        if((parseInt(stats_segment.stats_16_30.score_home_home) + parseInt(stats_segment.stats_16_30.score_home_away)) % 2 === 1 ){ this.stats_segment.stats_16_30.score_odd++ }
                        if((parseInt(stats_segment.stats_16_30.score_home_home) + parseInt(stats_segment.stats_16_30.score_home_away)) % 2 === 0 ){ this.stats_segment.stats_16_30.score_even++ }

                        if(stats_segment.stats_31_45.score_over00_home == "0" && stats_segment.stats_31_45.score_over00_away == "0"){ this.stats_segment.stats_31_45.score_over00++ }
                        if(parseInt(stats_segment.stats_31_45.score_over15_home) + parseInt(stats_segment.stats_31_45.score_over15_away) > 1){ this.stats_segment.stats_31_45.score_over15++ }
                        if(parseInt(stats_segment.stats_31_45.score_over25_home) + parseInt(stats_segment.stats_31_45.score_over25_away) > 2){ this.stats_segment.stats_31_45.score_over25++ }
                        if(parseInt(stats_segment.stats_31_45.score_over35_home) + parseInt(stats_segment.stats_31_45.score_over35_away) > 3){ this.stats_segment.stats_31_45.score_over35++ }
                        if(parseInt(stats_segment.stats_31_45.score_over45_home) + parseInt(stats_segment.stats_31_45.score_over45_away) > 4){ this.stats_segment.stats_31_45.score_over45++ }
                        if(parseInt(stats_segment.stats_31_45.score_home_home) > parseInt(stats_segment.stats_31_45.score_home_away) ){ this.stats_segment.stats_31_45.score_home++ }
                        if(parseInt(stats_segment.stats_31_45.score_away_home) < parseInt(stats_segment.stats_31_45.score_away_away) ){ this.stats_segment.stats_31_45.score_away++ }
                        if(parseInt(stats_segment.stats_31_45.score_draw_home) === parseInt(stats_segment.stats_31_45.score_draw_away) ){ this.stats_segment.stats_31_45.score_draw++ }
                        if(parseInt(stats_segment.stats_31_45.score_bts_home) > 0 && parseInt(stats_segment.stats_31_45.score_bts_away) > 0 ){ this.stats_segment.stats_31_45.score_bts++ }
                        if((parseInt(stats_segment.stats_31_45.score_home_home) + parseInt(stats_segment.stats_31_45.score_home_away)) % 2 === 1 ){ this.stats_segment.stats_31_45.score_odd++ }
                        if((parseInt(stats_segment.stats_31_45.score_home_home) + parseInt(stats_segment.stats_31_45.score_home_away)) % 2 === 0 ){ this.stats_segment.stats_31_45.score_even++ }

                        if(stats_segment.stats_46_60.score_over00_home == "0" && stats_segment.stats_46_60.score_over00_away == "0"){ this.stats_segment.stats_46_60.score_over00++ }
                        if(parseInt(stats_segment.stats_46_60.score_over15_home) + parseInt(stats_segment.stats_46_60.score_over15_away) > 1){ this.stats_segment.stats_46_60.score_over15++ }
                        if(parseInt(stats_segment.stats_46_60.score_over25_home) + parseInt(stats_segment.stats_46_60.score_over25_away) > 2){ this.stats_segment.stats_46_60.score_over25++ }
                        if(parseInt(stats_segment.stats_46_60.score_over35_home) + parseInt(stats_segment.stats_46_60.score_over35_away) > 3){ this.stats_segment.stats_46_60.score_over35++ }
                        if(parseInt(stats_segment.stats_46_60.score_over45_home) + parseInt(stats_segment.stats_46_60.score_over45_away) > 4){ this.stats_segment.stats_46_60.score_over45++ }
                        if(parseInt(stats_segment.stats_46_60.score_home_home) > parseInt(stats_segment.stats_46_60.score_home_away) ){ this.stats_segment.stats_46_60.score_home++ }
                        if(parseInt(stats_segment.stats_46_60.score_away_home) < parseInt(stats_segment.stats_46_60.score_away_away) ){ this.stats_segment.stats_46_60.score_away++ }
                        if(parseInt(stats_segment.stats_46_60.score_draw_home) === parseInt(stats_segment.stats_46_60.score_draw_away) ){ this.stats_segment.stats_46_60.score_draw++ }
                        if(parseInt(stats_segment.stats_46_60.score_bts_home) > 0 && parseInt(stats_segment.stats_46_60.score_bts_away) > 0 ){ this.stats_segment.stats_46_60.score_bts++ }
                        if((parseInt(stats_segment.stats_46_60.score_home_home) + parseInt(stats_segment.stats_46_60.score_home_away)) % 2 === 1 ){ this.stats_segment.stats_46_60.score_odd++ }
                        if((parseInt(stats_segment.stats_46_60.score_home_home) + parseInt(stats_segment.stats_46_60.score_home_away)) % 2 === 0 ){ this.stats_segment.stats_46_60.score_even++ }

                        if(stats_segment.stats_61_75.score_over00_home == "0" && stats_segment.stats_61_75.score_over00_away == "0"){ this.stats_segment.stats_61_75.score_over00++ }
                        if(parseInt(stats_segment.stats_61_75.score_over15_home) + parseInt(stats_segment.stats_61_75.score_over15_away) > 1){ this.stats_segment.stats_61_75.score_over15++ }
                        if(parseInt(stats_segment.stats_61_75.score_over25_home) + parseInt(stats_segment.stats_61_75.score_over25_away) > 2){ this.stats_segment.stats_61_75.score_over25++ }
                        if(parseInt(stats_segment.stats_61_75.score_over35_home) + parseInt(stats_segment.stats_61_75.score_over35_away) > 3){ this.stats_segment.stats_61_75.score_over35++ }
                        if(parseInt(stats_segment.stats_61_75.score_over45_home) + parseInt(stats_segment.stats_61_75.score_over45_away) > 4){ this.stats_segment.stats_61_75.score_over45++ }
                        if(parseInt(stats_segment.stats_61_75.score_home_home) > parseInt(stats_segment.stats_61_75.score_home_away) ){ this.stats_segment.stats_61_75.score_home++ }
                        if(parseInt(stats_segment.stats_61_75.score_away_home) < parseInt(stats_segment.stats_61_75.score_away_away) ){ this.stats_segment.stats_61_75.score_away++ }
                        if(parseInt(stats_segment.stats_61_75.score_draw_home) === parseInt(stats_segment.stats_61_75.score_draw_away) ){ this.stats_segment.stats_61_75.score_draw++ }
                        if(parseInt(stats_segment.stats_61_75.score_bts_home) > 0 && parseInt(stats_segment.stats_61_75.score_bts_away) > 0 ){ this.stats_segment.stats_61_75.score_bts++ }
                        if((parseInt(stats_segment.stats_61_75.score_home_home) + parseInt(stats_segment.stats_61_75.score_home_away)) % 2 === 1 ){ this.stats_segment.stats_61_75.score_odd++ }
                        if((parseInt(stats_segment.stats_61_75.score_home_home) + parseInt(stats_segment.stats_61_75.score_home_away)) % 2 === 0 ){ this.stats_segment.stats_61_75.score_even++ }

                        if(stats_segment.stats_76_90.score_over00_home == "0" && stats_segment.stats_76_90.score_over00_away == "0"){ this.stats_segment.stats_76_90.score_over00++ }
                        if(parseInt(stats_segment.stats_76_90.score_over15_home) + parseInt(stats_segment.stats_76_90.score_over15_away) > 1){ this.stats_segment.stats_76_90.score_over15++ }
                        if(parseInt(stats_segment.stats_76_90.score_over25_home) + parseInt(stats_segment.stats_76_90.score_over25_away) > 2){ this.stats_segment.stats_76_90.score_over25++ }
                        if(parseInt(stats_segment.stats_76_90.score_over35_home) + parseInt(stats_segment.stats_76_90.score_over35_away) > 3){ this.stats_segment.stats_76_90.score_over35++ }
                        if(parseInt(stats_segment.stats_76_90.score_over45_home) + parseInt(stats_segment.stats_76_90.score_over45_away) > 4){ this.stats_segment.stats_76_90.score_over45++ }
                        if(parseInt(stats_segment.stats_76_90.score_home_home) > parseInt(stats_segment.stats_76_90.score_home_away) ){ this.stats_segment.stats_76_90.score_home++ }
                        if(parseInt(stats_segment.stats_76_90.score_away_home) < parseInt(stats_segment.stats_76_90.score_away_away) ){ this.stats_segment.stats_76_90.score_away++ }
                        if(parseInt(stats_segment.stats_76_90.score_draw_home) === parseInt(stats_segment.stats_76_90.score_draw_away) ){ this.stats_segment.stats_76_90.score_draw++ }
                        if(parseInt(stats_segment.stats_76_90.score_bts_home) > 0 && parseInt(stats_segment.stats_76_90.score_bts_away) > 0 ){ this.stats_segment.stats_76_90.score_bts++ }
                        if((parseInt(stats_segment.stats_76_90.score_home_home) + parseInt(stats_segment.stats_76_90.score_home_away)) % 2 === 1 ){ this.stats_segment.stats_76_90.score_odd++ }
                        if((parseInt(stats_segment.stats_76_90.score_home_home) + parseInt(stats_segment.stats_76_90.score_home_away)) % 2 === 0 ){ this.stats_segment.stats_76_90.score_even++ }
                    }
                    //---------------
                    if(stats.length > 0){
                        let cStats = stats[stats.length - 1]
                        if(cStats[0].team_id == home_id){
                            if(cStats[0].shots){
                                if(cStats[0].shots.ongoal){
                                    this.total_live_home_stats.on = this.total_live_home_stats.on + cStats[0].shots.ongoal
                                    this.total_live_away_stats.on = this.total_live_away_stats.on + cStats[1].shots.ongoal
                                }
                                if(cStats[0].shots.offgoal){
                                    this.total_live_home_stats.off = this.total_live_home_stats.off + cStats[0].shots.offgoal
                                    this.total_live_away_stats.off = this.total_live_away_stats.off + cStats[1].shots.offgoal
                                }
                                if(cStats[0].shots.blocked){
                                    this.total_live_home_stats.blk = this.total_live_home_stats.blk + cStats[0].shots.blocked
                                    this.total_live_away_stats.blk = this.total_live_away_stats.blk + cStats[1].shots.blocked
                                }
                                if(cStats[0].shots.insidebox){
                                    this.total_live_home_stats.in = this.total_live_home_stats.in + cStats[0].shots.insidebox
                                    this.total_live_away_stats.in = this.total_live_away_stats.in + cStats[1].shots.insidebox
                                }
                                if(cStats[0].shots.outsidebox){
                                    this.total_live_home_stats.out = this.total_live_home_stats.out + cStats[0].shots.outsidebox
                                    this.total_live_away_stats.out = this.total_live_away_stats.out + cStats[1].shots.outsidebox
                                }
                            }
                            if(cStats[0].corners){
                                this.total_live_home_stats.cnr = this.total_live_home_stats.cnr + cStats[0].corners
                                this.total_live_away_stats.cnr = this.total_live_away_stats.cnr + cStats[1].corners
                            }
                            if(cStats[0].goals){
                                this.total_live_home_stats.goal = this.total_live_home_stats.goal + cStats[0].goals
                                this.total_live_away_stats.goal = this.total_live_away_stats.goal + cStats[1].goals
                            }
                            if(cStats[0].attacks){
                                this.total_live_home_stats.da = this.total_live_home_stats.da + cStats[0].attacks.dangerous_attacks
                                this.total_live_away_stats.da = this.total_live_away_stats.da + cStats[1].attacks.dangerous_attacks
                            }
                            if(cStats[0].possessiontime){
                                this.total_live_home_stats.pos = this.total_live_home_stats.pos + cStats[0].possessiontime
                                this.total_live_away_stats.pos = this.total_live_away_stats.pos + cStats[1].possessiontime
                            }
                            if(cStats[0].redcards){
                                this.total_live_home_stats.red = this.total_live_home_stats.red + cStats[0].redcards
                                this.total_live_away_stats.red = this.total_live_away_stats.red + cStats[1].redcards
                            }
                            if(cStats[0].yellowcards){
                                this.total_live_home_stats.yel = this.total_live_home_stats.yel + cStats[0].yellowcards
                                this.total_live_away_stats.yel = this.total_live_away_stats.yel + cStats[1].yellowcards
                            }
                        }
                        if(stats[stats.length - 1][1].team_id == home_id){
                            if(cStats[1].shots){
                                if(cStats[1].shots.ongoal){
                                    this.total_live_home_stats.on = this.total_live_home_stats.on + cStats[1].shots.ongoal
                                    this.total_live_away_stats.on = this.total_live_away_stats.on + cStats[0].shots.ongoal
                                }
                                if(cStats[1].shots.offgoal){
                                    this.total_live_home_stats.off = this.total_live_home_stats.off + cStats[1].shots.offgoal
                                    this.total_live_away_stats.off = this.total_live_away_stats.off + cStats[0].shots.offgoal
                                }
                                if(cStats[1].shots.blocked){
                                    this.total_live_home_stats.blk = this.total_live_home_stats.blk + cStats[1].shots.blocked
                                    this.total_live_away_stats.blk = this.total_live_away_stats.blk + cStats[0].shots.blocked
                                }
                                if(cStats[1].shots.insidebox){
                                    this.total_live_home_stats.in = this.total_live_home_stats.in + cStats[1].shots.insidebox
                                    this.total_live_away_stats.in = this.total_live_away_stats.in + cStats[0].shots.insidebox
                                }
                                if(cStats[1].shots.outsidebox){
                                    this.total_live_home_stats.out = this.total_live_home_stats.out + cStats[1].shots.outsidebox
                                    this.total_live_away_stats.out = this.total_live_away_stats.out + cStats[0].shots.outsidebox
                                }
                            }
                            if(cStats[0].corners){
                                this.total_live_home_stats.cnr = this.total_live_home_stats.cnr + cStats[1].corners
                                this.total_live_away_stats.cnr = this.total_live_away_stats.cnr + cStats[0].corners
                            }
                            if(cStats[0].goals){
                                this.total_live_home_stats.goal = this.total_live_home_stats.goal + cStats[1].goals
                                this.total_live_away_stats.goal = this.total_live_away_stats.goal + cStats[0].goals
                            }
                            if(cStats[0].attacks){
                                this.total_live_home_stats.da = this.total_live_home_stats.da + cStats[1].attacks.dangerous_attacks
                                this.total_live_away_stats.da = this.total_live_away_stats.da + cStats[0].attacks.dangerous_attacks
                            }
                            if(cStats[0].possessiontime){
                                this.total_live_home_stats.pos = this.total_live_home_stats.pos + cStats[1].possessiontime
                                this.total_live_away_stats.pos = this.total_live_away_stats.pos + cStats[0].possessiontime
                            }
                            if(cStats[0].redcards){
                                this.total_live_home_stats.red = this.total_live_home_stats.red + cStats[1].redcards
                                this.total_live_away_stats.red = this.total_live_away_stats.red + cStats[0].redcards
                            }
                            if(cStats[0].yellowcards){
                                this.total_live_home_stats.yel = this.total_live_home_stats.yel + cStats[1].yellowcards
                                this.total_live_away_stats.yel = this.total_live_away_stats.yel + cStats[0].yellowcards
                            }
                        }
                    }
                    //---------------
                    if(times.length > 0){
                        for(let j = 0; j < times.length; j++){
                            let cStats = stats[j]
                            if(!cStats[0]){
                                return
                            }
                            if(times[j].minute <= 15){
                                if(home_id == cStats[0].team_id){
                                    if(cStats[0].shots){
                                        if(cStats[0].shots.ongoal){
                                            live_segment_stats1.stats_0_15.home.on = cStats[0].shots.ongoal
                                            live_segment_stats1.stats_0_15.away.on = cStats[1].shots.ongoal
                                        }
                                        if(cStats[0].shots.offgoal){
                                            live_segment_stats1.stats_0_15.home.off = cStats[0].shots.offgoal
                                            live_segment_stats1.stats_0_15.away.off = cStats[1].shots.offgoal
                                        }
                                        if(cStats[0].shots.blocked){
                                            live_segment_stats1.stats_0_15.home.blk = cStats[0].shots.blocked
                                            live_segment_stats1.stats_0_15.away.blk = cStats[1].shots.blocked
                                        }
                                        if(cStats[0].shots.insidebox){
                                            live_segment_stats1.stats_0_15.home.in = cStats[0].shots.insidebox
                                            live_segment_stats1.stats_0_15.away.in = cStats[1].shots.insidebox
                                        }
                                        if(cStats[0].shots.outsidebox){
                                            live_segment_stats1.stats_0_15.home.out = cStats[0].shots.outsidebox
                                            live_segment_stats1.stats_0_15.away.out = cStats[1].shots.outsidebox
                                        }
                                    }
                                    if(cStats[0].corners){
                                        live_segment_stats1.stats_0_15.home.cnr = cStats[0].corners
                                        live_segment_stats1.stats_0_15.away.cnr = cStats[1].corners
                                    }
                                    if(cStats[0].goals){
                                        live_segment_stats1.stats_0_15.home.goal = cStats[0].goals
                                        live_segment_stats1.stats_0_15.away.goal = cStats[1].goals
                                    }
                                    if(cStats[0].attacks){
                                        if(cStats[0].attacks.dangerous_attacks){
                                            live_segment_stats1.stats_0_15.home.da = cStats[0].attacks.dangerous_attacks
                                            live_segment_stats1.stats_0_15.away.da = cStats[1].attacks.dangerous_attacks
                                        }
                                    }
                                    if(cStats[0].possessiontime){
                                        live_segment_stats1.stats_0_15.home.pos = cStats[0].possessiontime
                                        live_segment_stats1.stats_0_15.away.pos = cStats[1].possessiontime
                                    }
                                    if(cStats[0].redcards){
                                        live_segment_stats1.stats_0_15.home.red = cStats[0].redcards
                                        live_segment_stats1.stats_0_15.away.red = cStats[1].redcards
                                    }
                                    if(cStats[0].yellowcards){
                                        live_segment_stats1.stats_0_15.home.yel = cStats[0].yellowcards
                                        live_segment_stats1.stats_0_15.home.yel = cStats[1].yellowcards
                                    }
                                }
                                if(home_id == cStats[1].team_id){
                                    if(cStats[1].shots){
                                        if(cStats[1].shots.ongoal){
                                            live_segment_stats1.stats_0_15.home.on = cStats[1].shots.ongoal
                                            live_segment_stats1.stats_0_15.away.on = cStats[0].shots.ongoal
                                        }
                                        if(cStats[1].shots.offgoal){
                                            live_segment_stats1.stats_0_15.home.off = cStats[1].shots.offgoal
                                            live_segment_stats1.stats_0_15.away.off = cStats[0].shots.offgoal
                                        }
                                        if(cStats[1].shots.blocked){
                                            live_segment_stats1.stats_0_15.home.blk = cStats[1].shots.blocked
                                            live_segment_stats1.stats_0_15.away.blk = cStats[0].shots.blocked
                                        }
                                        if(cStats[1].shots.insidebox){
                                            live_segment_stats1.stats_0_15.home.in = cStats[1].shots.insidebox
                                            live_segment_stats1.stats_0_15.away.in = cStats[0].shots.insidebox
                                        }
                                        if(cStats[1].shots.outsidebox){
                                            live_segment_stats1.stats_0_15.home.out = cStats[1].shots.outsidebox
                                            live_segment_stats1.stats_0_15.away.out = cStats[0].shots.outsidebox
                                        }
                                    }
                                    if(cStats[1].corners){
                                        live_segment_stats1.stats_0_15.home.cnr = cStats[1].corners
                                        live_segment_stats1.stats_0_15.away.cnr = cStats[0].corners
                                    }
                                    if(cStats[1].goals){
                                        live_segment_stats1.stats_0_15.home.goal = cStats[1].goals
                                        live_segment_stats1.stats_0_15.away.goal = cStats[0].goals
                                    }
                                    if(cStats[1].attacks){
                                        if(cStats[1].attacks.dangerous_attacks){
                                            live_segment_stats1.stats_0_15.home.da = cStats[1].attacks.dangerous_attacks
                                            live_segment_stats1.stats_0_15.away.da = cStats[0].attacks.dangerous_attacks
                                        }
                                    }
                                    if(cStats[1].possessiontime){
                                        live_segment_stats1.stats_0_15.home.pos = cStats[1].possessiontime
                                        live_segment_stats1.stats_0_15.away.pos = cStats[0].possessiontime
                                    }
                                    if(cStats[1].redcards){
                                        live_segment_stats1.stats_0_15.home.red = cStats[1].redcards
                                        live_segment_stats1.stats_0_15.away.red = cStats[0].redcards
                                    }
                                    if(cStats[1].yellowcards){
                                        live_segment_stats1.stats_0_15.home.yel = cStats[1].yellowcards
                                        live_segment_stats1.stats_0_15.home.yel = cStats[0].yellowcards
                                    }
                                }
                            }
                            if(times[j].minute > 15 && times[j].minute <= 30){
                                if(home_id == cStats[0].team_id){
                                    if(cStats[0].shots){
                                        if(cStats[0].shots.ongoal){
                                            live_segment_stats1.stats_16_30.home.on = cStats[0].shots.ongoal
                                            live_segment_stats1.stats_16_30.away.on = cStats[1].shots.ongoal
                                        }
                                        if(cStats[0].shots.offgoal){
                                            live_segment_stats1.stats_16_30.home.off = cStats[0].shots.offgoal
                                            live_segment_stats1.stats_16_30.away.off = cStats[1].shots.offgoal
                                        }
                                        if(cStats[0].shots.blocked){
                                            live_segment_stats1.stats_16_30.home.blk = cStats[0].shots.blocked
                                            live_segment_stats1.stats_16_30.away.blk = cStats[1].shots.blocked
                                        }
                                        if(cStats[0].shots.insidebox){
                                            live_segment_stats1.stats_16_30.home.in = cStats[0].shots.insidebox
                                            live_segment_stats1.stats_16_30.away.in = cStats[1].shots.insidebox
                                        }
                                        if(cStats[0].shots.outsidebox){
                                            live_segment_stats1.stats_16_30.home.out = cStats[0].shots.outsidebox
                                            live_segment_stats1.stats_16_30.away.out = cStats[1].shots.outsidebox
                                        }
                                    }
                                    if(cStats[0].corners){
                                        live_segment_stats1.stats_16_30.home.cnr = cStats[0].corners
                                        live_segment_stats1.stats_16_30.away.cnr = cStats[1].corners
                                    }
                                    if(cStats[0].goals){
                                        live_segment_stats1.stats_16_30.home.goal = cStats[0].goals
                                        live_segment_stats1.stats_16_30.away.goal = cStats[1].goals
                                    }
                                    if(cStats[0].attacks){
                                        if(cStats[0].attacks.dangerous_attacks){
                                            live_segment_stats1.stats_16_30.home.da = cStats[0].attacks.dangerous_attacks
                                            live_segment_stats1.stats_16_30.away.da = cStats[1].attacks.dangerous_attacks
                                        }
                                    }
                                    if(cStats[0].possessiontime){
                                        live_segment_stats1.stats_16_30.home.pos = cStats[0].possessiontime
                                        live_segment_stats1.stats_16_30.away.pos = cStats[1].possessiontime
                                    }
                                    if(cStats[0].redcards){
                                        live_segment_stats1.stats_16_30.home.red = cStats[0].redcards
                                        live_segment_stats1.stats_16_30.away.red = cStats[1].redcards
                                    }
                                    if(cStats[0].yellowcards){
                                        live_segment_stats1.stats_16_30.home.yel = cStats[0].yellowcards
                                        live_segment_stats1.stats_16_30.home.yel = cStats[1].yellowcards
                                    }
                                }
                                if(home_id == cStats[1].team_id){
                                    if(cStats[1].shots){
                                        if(cStats[1].shots.ongoal){
                                            live_segment_stats1.stats_16_30.home.on = cStats[1].shots.ongoal
                                            live_segment_stats1.stats_16_30.away.on = cStats[0].shots.ongoal
                                        }
                                        if(cStats[1].shots.offgoal){
                                            live_segment_stats1.stats_16_30.home.off = cStats[1].shots.offgoal
                                            live_segment_stats1.stats_16_30.away.off = cStats[0].shots.offgoal
                                        }
                                        if(cStats[1].shots.blocked){
                                            live_segment_stats1.stats_16_30.home.blk = cStats[1].shots.blocked
                                            live_segment_stats1.stats_16_30.away.blk = cStats[0].shots.blocked
                                        }
                                        if(cStats[1].shots.insidebox){
                                            live_segment_stats1.stats_16_30.home.in = cStats[1].shots.insidebox
                                            live_segment_stats1.stats_16_30.away.in = cStats[0].shots.insidebox
                                        }
                                        if(cStats[1].shots.outsidebox){
                                            live_segment_stats1.stats_16_30.home.out = cStats[1].shots.outsidebox
                                            live_segment_stats1.stats_16_30.away.out = cStats[0].shots.outsidebox
                                        }
                                    }
                                    if(cStats[1].corners){
                                        live_segment_stats1.stats_16_30.home.cnr = cStats[1].corners
                                        live_segment_stats1.stats_16_30.away.cnr = cStats[0].corners
                                    }
                                    if(cStats[1].goals){
                                        live_segment_stats1.stats_16_30.home.goal = cStats[1].goals
                                        live_segment_stats1.stats_16_30.away.goal = cStats[0].goals
                                    }
                                    if(cStats[1].attacks){
                                        if(cStats[1].attacks.dangerous_attacks){
                                            live_segment_stats1.stats_16_30.home.da = cStats[1].attacks.dangerous_attacks
                                            live_segment_stats1.stats_16_30.away.da = cStats[0].attacks.dangerous_attacks
                                        }
                                    }
                                    if(cStats[1].possessiontime){
                                        live_segment_stats1.stats_16_30.home.pos = cStats[1].possessiontime
                                        live_segment_stats1.stats_16_30.away.pos = cStats[0].possessiontime
                                    }
                                    if(cStats[1].redcards){
                                        live_segment_stats1.stats_16_30.home.red = cStats[1].redcards
                                        live_segment_stats1.stats_16_30.away.red = cStats[0].redcards
                                    }
                                    if(cStats[1].yellowcards){
                                        live_segment_stats1.stats_16_30.home.yel = cStats[1].yellowcards
                                        live_segment_stats1.stats_16_30.home.yel = cStats[0].yellowcards
                                    }
                                }
                            }
                            if(times[j].minute > 30 && times[j].minute <= 45){
                                if(home_id == cStats[0].team_id){
                                    if(cStats[0].shots){
                                        if(cStats[0].shots.ongoal){
                                            live_segment_stats1.stats_31_45.home.on = cStats[0].shots.ongoal
                                            live_segment_stats1.stats_31_45.away.on = cStats[1].shots.ongoal
                                        }
                                        if(cStats[0].shots.offgoal){
                                            live_segment_stats1.stats_31_45.home.off = cStats[0].shots.offgoal
                                            live_segment_stats1.stats_31_45.away.off = cStats[1].shots.offgoal
                                        }
                                        if(cStats[0].shots.blocked){
                                            live_segment_stats1.stats_31_45.home.blk = cStats[0].shots.blocked
                                            live_segment_stats1.stats_31_45.away.blk = cStats[1].shots.blocked
                                        }
                                        if(cStats[0].shots.insidebox){
                                            live_segment_stats1.stats_31_45.home.in = cStats[0].shots.insidebox
                                            live_segment_stats1.stats_31_45.away.in = cStats[1].shots.insidebox
                                        }
                                        if(cStats[0].shots.outsidebox){
                                            live_segment_stats1.stats_31_45.home.out = cStats[0].shots.outsidebox
                                            live_segment_stats1.stats_31_45.away.out = cStats[1].shots.outsidebox
                                        }
                                    }
                                    if(cStats[0].corners){
                                        live_segment_stats1.stats_31_45.home.cnr = cStats[0].corners
                                        live_segment_stats1.stats_31_45.away.cnr = cStats[1].corners
                                    }
                                    if(cStats[0].goals){
                                        live_segment_stats1.stats_31_45.home.goal = cStats[0].goals
                                        live_segment_stats1.stats_31_45.away.goal = cStats[1].goals
                                    }
                                    if(cStats[0].attacks){
                                        if(cStats[0].attacks.dangerous_attacks){
                                            live_segment_stats1.stats_31_45.home.da = cStats[0].attacks.dangerous_attacks
                                            live_segment_stats1.stats_31_45.away.da = cStats[1].attacks.dangerous_attacks
                                        }
                                    }
                                    if(cStats[0].possessiontime){
                                        live_segment_stats1.stats_31_45.home.pos = cStats[0].possessiontime
                                        live_segment_stats1.stats_31_45.away.pos = cStats[1].possessiontime
                                    }
                                    if(cStats[0].redcards){
                                        live_segment_stats1.stats_31_45.home.red = cStats[0].redcards
                                        live_segment_stats1.stats_31_45.away.red = cStats[1].redcards
                                    }
                                    if(cStats[0].yellowcards){
                                        live_segment_stats1.stats_31_45.home.yel = cStats[0].yellowcards
                                        live_segment_stats1.stats_31_45.home.yel = cStats[1].yellowcards
                                    }
                                }
                                if(home_id == cStats[1].team_id){
                                    if(cStats[1].shots){
                                        if(cStats[1].shots.ongoal){
                                            live_segment_stats1.stats_31_45.home.on = cStats[1].shots.ongoal
                                            live_segment_stats1.stats_31_45.away.on = cStats[0].shots.ongoal
                                        }
                                        if(cStats[1].shots.offgoal){
                                            live_segment_stats1.stats_31_45.home.off = cStats[1].shots.offgoal
                                            live_segment_stats1.stats_31_45.away.off = cStats[0].shots.offgoal
                                        }
                                        if(cStats[1].shots.blocked){
                                            live_segment_stats1.stats_31_45.home.blk = cStats[1].shots.blocked
                                            live_segment_stats1.stats_31_45.away.blk = cStats[0].shots.blocked
                                        }
                                        if(cStats[1].shots.insidebox){
                                            live_segment_stats1.stats_31_45.home.in = cStats[1].shots.insidebox
                                            live_segment_stats1.stats_31_45.away.in = cStats[0].shots.insidebox
                                        }
                                        if(cStats[1].shots.outsidebox){
                                            live_segment_stats1.stats_31_45.home.out = cStats[1].shots.outsidebox
                                            live_segment_stats1.stats_31_45.away.out = cStats[0].shots.outsidebox
                                        }
                                    }
                                    if(cStats[1].corners){
                                        live_segment_stats1.stats_31_45.home.cnr = cStats[1].corners
                                        live_segment_stats1.stats_31_45.away.cnr = cStats[0].corners
                                    }
                                    if(cStats[1].goals){
                                        live_segment_stats1.stats_31_45.home.goal = cStats[1].goals
                                        live_segment_stats1.stats_31_45.away.goal = cStats[0].goals
                                    }
                                    if(cStats[1].attacks){
                                        if(cStats[1].attacks.dangerous_attacks){
                                            live_segment_stats1.stats_31_45.home.da = cStats[1].attacks.dangerous_attacks
                                            live_segment_stats1.stats_31_45.away.da = cStats[0].attacks.dangerous_attacks
                                        }
                                    }
                                    if(cStats[1].possessiontime){
                                        live_segment_stats1.stats_31_45.home.pos = cStats[1].possessiontime
                                        live_segment_stats1.stats_31_45.away.pos = cStats[0].possessiontime
                                    }
                                    if(cStats[1].redcards){
                                        live_segment_stats1.stats_31_45.home.red = cStats[1].redcards
                                        live_segment_stats1.stats_31_45.away.red = cStats[0].redcards
                                    }
                                    if(cStats[1].yellowcards){
                                        live_segment_stats1.stats_31_45.home.yel = cStats[1].yellowcards
                                        live_segment_stats1.stats_31_45.home.yel = cStats[0].yellowcards
                                    }
                                }
                            }
                            if(times[j].minute > 45 && times[j].minute <= 60){
                                if(home_id == cStats[0].team_id){
                                    if(cStats[0].shots){
                                        if(cStats[0].shots.ongoal){
                                            live_segment_stats1.stats_46_60.home.on = cStats[0].shots.ongoal
                                            live_segment_stats1.stats_46_60.away.on = cStats[1].shots.ongoal
                                        }
                                        if(cStats[0].shots.offgoal){
                                            live_segment_stats1.stats_46_60.home.off = cStats[0].shots.offgoal
                                            live_segment_stats1.stats_46_60.away.off = cStats[1].shots.offgoal
                                        }
                                        if(cStats[0].shots.blocked){
                                            live_segment_stats1.stats_46_60.home.blk = cStats[0].shots.blocked
                                            live_segment_stats1.stats_46_60.away.blk = cStats[1].shots.blocked
                                        }
                                        if(cStats[0].shots.insidebox){
                                            live_segment_stats1.stats_46_60.home.in = cStats[0].shots.insidebox
                                            live_segment_stats1.stats_46_60.away.in = cStats[1].shots.insidebox
                                        }
                                        if(cStats[0].shots.outsidebox){
                                            live_segment_stats1.stats_46_60.home.out = cStats[0].shots.outsidebox
                                            live_segment_stats1.stats_46_60.away.out = cStats[1].shots.outsidebox
                                        }
                                    }
                                    if(cStats[0].corners){
                                        live_segment_stats1.stats_46_60.home.cnr = cStats[0].corners
                                        live_segment_stats1.stats_46_60.away.cnr = cStats[1].corners
                                    }
                                    if(cStats[0].goals){
                                        live_segment_stats1.stats_46_60.home.goal = cStats[0].goals
                                        live_segment_stats1.stats_46_60.away.goal = cStats[1].goals
                                    }
                                    if(cStats[0].attacks){
                                        if(cStats[0].attacks.dangerous_attacks){
                                            live_segment_stats1.stats_46_60.home.da = cStats[0].attacks.dangerous_attacks
                                            live_segment_stats1.stats_46_60.away.da = cStats[1].attacks.dangerous_attacks
                                        }
                                    }
                                    if(cStats[0].possessiontime){
                                        live_segment_stats1.stats_46_60.home.pos = cStats[0].possessiontime
                                        live_segment_stats1.stats_46_60.away.pos = cStats[1].possessiontime
                                    }
                                    if(cStats[0].redcards){
                                        live_segment_stats1.stats_46_60.home.red = cStats[0].redcards
                                        live_segment_stats1.stats_46_60.away.red = cStats[1].redcards
                                    }
                                    if(cStats[0].yellowcards){
                                        live_segment_stats1.stats_46_60.home.yel = cStats[0].yellowcards
                                        live_segment_stats1.stats_46_60.home.yel = cStats[1].yellowcards
                                    }
                                }
                                if(home_id == cStats[1].team_id){
                                    if(cStats[1].shots){
                                        if(cStats[1].shots.ongoal){
                                            live_segment_stats1.stats_46_60.home.on = cStats[1].shots.ongoal
                                            live_segment_stats1.stats_46_60.away.on = cStats[0].shots.ongoal
                                        }
                                        if(cStats[1].shots.offgoal){
                                            live_segment_stats1.stats_46_60.home.off = cStats[1].shots.offgoal
                                            live_segment_stats1.stats_46_60.away.off = cStats[0].shots.offgoal
                                        }
                                        if(cStats[1].shots.blocked){
                                            live_segment_stats1.stats_46_60.home.blk = cStats[1].shots.blocked
                                            live_segment_stats1.stats_46_60.away.blk = cStats[0].shots.blocked
                                        }
                                        if(cStats[1].shots.insidebox){
                                            live_segment_stats1.stats_46_60.home.in = cStats[1].shots.insidebox
                                            live_segment_stats1.stats_46_60.away.in = cStats[0].shots.insidebox
                                        }
                                        if(cStats[1].shots.outsidebox){
                                            live_segment_stats1.stats_46_60.home.out = cStats[1].shots.outsidebox
                                            live_segment_stats1.stats_46_60.away.out = cStats[0].shots.outsidebox
                                        }
                                    }
                                    if(cStats[1].corners){
                                        live_segment_stats1.stats_46_60.home.cnr = cStats[1].corners
                                        live_segment_stats1.stats_46_60.away.cnr = cStats[0].corners
                                    }
                                    if(cStats[1].goals){
                                        live_segment_stats1.stats_46_60.home.goal = cStats[1].goals
                                        live_segment_stats1.stats_46_60.away.goal = cStats[0].goals
                                    }
                                    if(cStats[1].attacks){
                                        if(cStats[1].attacks.dangerous_attacks){
                                            live_segment_stats1.stats_46_60.home.da = cStats[1].attacks.dangerous_attacks
                                            live_segment_stats1.stats_46_60.away.da = cStats[0].attacks.dangerous_attacks
                                        }
                                    }
                                    if(cStats[1].possessiontime){
                                        live_segment_stats1.stats_46_60.home.pos = cStats[1].possessiontime
                                        live_segment_stats1.stats_46_60.away.pos = cStats[0].possessiontime
                                    }
                                    if(cStats[1].redcards){
                                        live_segment_stats1.stats_46_60.home.red = cStats[1].redcards
                                        live_segment_stats1.stats_46_60.away.red = cStats[0].redcards
                                    }
                                    if(cStats[1].yellowcards){
                                        live_segment_stats1.stats_46_60.home.yel = cStats[1].yellowcards
                                        live_segment_stats1.stats_46_60.home.yel = cStats[0].yellowcards
                                    }
                                }
                            }
                            if(times[j].minute > 60 && times[j].minute <= 75){
                                if(home_id == cStats[0].team_id){
                                    if(cStats[0].shots){
                                        if(cStats[0].shots.ongoal){
                                            live_segment_stats1.stats_61_75.home.on = cStats[0].shots.ongoal
                                            live_segment_stats1.stats_61_75.away.on = cStats[1].shots.ongoal
                                        }
                                        if(cStats[0].shots.offgoal){
                                            live_segment_stats1.stats_61_75.home.off = cStats[0].shots.offgoal
                                            live_segment_stats1.stats_61_75.away.off = cStats[1].shots.offgoal
                                        }
                                        if(cStats[0].shots.blocked){
                                            live_segment_stats1.stats_61_75.home.blk = cStats[0].shots.blocked
                                            live_segment_stats1.stats_61_75.away.blk = cStats[1].shots.blocked
                                        }
                                        if(cStats[0].shots.insidebox){
                                            live_segment_stats1.stats_61_75.home.in = cStats[0].shots.insidebox
                                            live_segment_stats1.stats_61_75.away.in = cStats[1].shots.insidebox
                                        }
                                        if(cStats[0].shots.outsidebox){
                                            live_segment_stats1.stats_61_75.home.out = cStats[0].shots.outsidebox
                                            live_segment_stats1.stats_61_75.away.out = cStats[1].shots.outsidebox
                                        }
                                    }
                                    if(cStats[0].corners){
                                        live_segment_stats1.stats_61_75.home.cnr = cStats[0].corners
                                        live_segment_stats1.stats_61_75.away.cnr = cStats[1].corners
                                    }
                                    if(cStats[0].goals){
                                        live_segment_stats1.stats_61_75.home.goal = cStats[0].goals
                                        live_segment_stats1.stats_61_75.away.goal = cStats[1].goals
                                    }
                                    if(cStats[0].attacks){
                                        if(cStats[0].attacks.dangerous_attacks){
                                            live_segment_stats1.stats_61_75.home.da = cStats[0].attacks.dangerous_attacks
                                            live_segment_stats1.stats_61_75.away.da = cStats[1].attacks.dangerous_attacks
                                        }
                                    }
                                    if(cStats[0].possessiontime){
                                        live_segment_stats1.stats_61_75.home.pos = cStats[0].possessiontime
                                        live_segment_stats1.stats_61_75.away.pos = cStats[1].possessiontime
                                    }
                                    if(cStats[0].redcards){
                                        live_segment_stats1.stats_61_75.home.red = cStats[0].redcards
                                        live_segment_stats1.stats_61_75.away.red = cStats[1].redcards
                                    }
                                    if(cStats[0].yellowcards){
                                        live_segment_stats1.stats_61_75.home.yel = cStats[0].yellowcards
                                        live_segment_stats1.stats_61_75.home.yel = cStats[1].yellowcards
                                    }
                                }
                                if(home_id == cStats[1].team_id){
                                    if(cStats[1].shots){
                                        if(cStats[1].shots.ongoal){
                                            live_segment_stats1.stats_61_75.home.on = cStats[1].shots.ongoal
                                            live_segment_stats1.stats_61_75.away.on = cStats[0].shots.ongoal
                                        }
                                        if(cStats[1].shots.offgoal){
                                            live_segment_stats1.stats_61_75.home.off = cStats[1].shots.offgoal
                                            live_segment_stats1.stats_61_75.away.off = cStats[0].shots.offgoal
                                        }
                                        if(cStats[1].shots.blocked){
                                            live_segment_stats1.stats_61_75.home.blk = cStats[1].shots.blocked
                                            live_segment_stats1.stats_61_75.away.blk = cStats[0].shots.blocked
                                        }
                                        if(cStats[1].shots.insidebox){
                                            live_segment_stats1.stats_61_75.home.in = cStats[1].shots.insidebox
                                            live_segment_stats1.stats_61_75.away.in = cStats[0].shots.insidebox
                                        }
                                        if(cStats[1].shots.outsidebox){
                                            live_segment_stats1.stats_61_75.home.out = cStats[1].shots.outsidebox
                                            live_segment_stats1.stats_61_75.away.out = cStats[0].shots.outsidebox
                                        }
                                    }
                                    if(cStats[1].corners){
                                        live_segment_stats1.stats_61_75.home.cnr = cStats[1].corners
                                        live_segment_stats1.stats_61_75.away.cnr = cStats[0].corners
                                    }
                                    if(cStats[1].goals){
                                        live_segment_stats1.stats_61_75.home.goal = cStats[1].goals
                                        live_segment_stats1.stats_61_75.away.goal = cStats[0].goals
                                    }
                                    if(cStats[1].attacks){
                                        if(cStats[1].attacks.dangerous_attacks){
                                            live_segment_stats1.stats_61_75.home.da = cStats[1].attacks.dangerous_attacks
                                            live_segment_stats1.stats_61_75.away.da = cStats[0].attacks.dangerous_attacks
                                        }
                                    }
                                    if(cStats[1].possessiontime){
                                        live_segment_stats1.stats_61_75.home.pos = cStats[1].possessiontime
                                        live_segment_stats1.stats_61_75.away.pos = cStats[0].possessiontime
                                    }
                                    if(cStats[1].redcards){
                                        live_segment_stats1.stats_61_75.home.red = cStats[1].redcards
                                        live_segment_stats1.stats_61_75.away.red = cStats[0].redcards
                                    }
                                    if(cStats[1].yellowcards){
                                        live_segment_stats1.stats_61_75.home.yel = cStats[1].yellowcards
                                        live_segment_stats1.stats_61_75.home.yel = cStats[0].yellowcards
                                    }
                                }
                            }
                            if(times[j].minute > 75 && times[j].minute <= 90){
                                if(home_id == cStats[0].team_id){
                                    if(cStats[0].shots){
                                        if(cStats[0].shots.ongoal){
                                            live_segment_stats1.stats_76_90.home.on = cStats[0].shots.ongoal
                                            live_segment_stats1.stats_76_90.away.on = cStats[1].shots.ongoal
                                        }
                                        if(cStats[0].shots.offgoal){
                                            live_segment_stats1.stats_76_90.home.off = cStats[0].shots.offgoal
                                            live_segment_stats1.stats_76_90.away.off = cStats[1].shots.offgoal
                                        }
                                        if(cStats[0].shots.blocked){
                                            live_segment_stats1.stats_76_90.home.blk = cStats[0].shots.blocked
                                            live_segment_stats1.stats_76_90.away.blk = cStats[1].shots.blocked
                                        }
                                        if(cStats[0].shots.insidebox){
                                            live_segment_stats1.stats_76_90.home.in = cStats[0].shots.insidebox
                                            live_segment_stats1.stats_76_90.away.in = cStats[1].shots.insidebox
                                        }
                                        if(cStats[0].shots.outsidebox){
                                            live_segment_stats1.stats_76_90.home.out = cStats[0].shots.outsidebox
                                            live_segment_stats1.stats_76_90.away.out = cStats[1].shots.outsidebox
                                        }
                                    }
                                    if(cStats[0].corners){
                                        live_segment_stats1.stats_76_90.home.cnr = cStats[0].corners
                                        live_segment_stats1.stats_76_90.away.cnr = cStats[1].corners
                                    }
                                    if(cStats[0].goals){
                                        live_segment_stats1.stats_76_90.home.goal = cStats[0].goals
                                        live_segment_stats1.stats_76_90.away.goal = cStats[1].goals
                                    }
                                    if(cStats[0].attacks){
                                        if(cStats[0].attacks.dangerous_attacks){
                                            live_segment_stats1.stats_76_90.home.da = cStats[0].attacks.dangerous_attacks
                                            live_segment_stats1.stats_76_90.away.da = cStats[1].attacks.dangerous_attacks
                                        }
                                    }
                                    if(cStats[0].possessiontime){
                                        live_segment_stats1.stats_76_90.home.pos = cStats[0].possessiontime
                                        live_segment_stats1.stats_76_90.away.pos = cStats[1].possessiontime
                                    }
                                    if(cStats[0].redcards){
                                        live_segment_stats1.stats_76_90.home.red = cStats[0].redcards
                                        live_segment_stats1.stats_76_90.away.red = cStats[1].redcards
                                    }
                                    if(cStats[0].yellowcards){
                                        live_segment_stats1.stats_76_90.home.yel = cStats[0].yellowcards
                                        live_segment_stats1.stats_76_90.home.yel = cStats[1].yellowcards
                                    }
                                }
                                if(home_id == cStats[1].team_id){
                                    if(cStats[1].shots){
                                        if(cStats[1].shots.ongoal){
                                            live_segment_stats1.stats_76_90.home.on = cStats[1].shots.ongoal
                                            live_segment_stats1.stats_76_90.away.on = cStats[0].shots.ongoal
                                        }
                                        if(cStats[1].shots.offgoal){
                                            live_segment_stats1.stats_76_90.home.off = cStats[1].shots.offgoal
                                            live_segment_stats1.stats_76_90.away.off = cStats[0].shots.offgoal
                                        }
                                        if(cStats[1].shots.blocked){
                                            live_segment_stats1.stats_76_90.home.blk = cStats[1].shots.blocked
                                            live_segment_stats1.stats_76_90.away.blk = cStats[0].shots.blocked
                                        }
                                        if(cStats[1].shots.insidebox){
                                            live_segment_stats1.stats_76_90.home.in = cStats[1].shots.insidebox
                                            live_segment_stats1.stats_76_90.away.in = cStats[0].shots.insidebox
                                        }
                                        if(cStats[1].shots.outsidebox){
                                            live_segment_stats1.stats_76_90.home.out = cStats[1].shots.outsidebox
                                            live_segment_stats1.stats_76_90.away.out = cStats[0].shots.outsidebox
                                        }
                                    }
                                    if(cStats[1].corners){
                                        live_segment_stats1.stats_76_90.home.cnr = cStats[1].corners
                                        live_segment_stats1.stats_76_90.away.cnr = cStats[0].corners
                                    }
                                    if(cStats[1].goals){
                                        live_segment_stats1.stats_76_90.home.goal = cStats[1].goals
                                        live_segment_stats1.stats_76_90.away.goal = cStats[0].goals
                                    }
                                    if(cStats[1].attacks){
                                        if(cStats[1].attacks.dangerous_attacks){
                                            live_segment_stats1.stats_76_90.home.da = cStats[1].attacks.dangerous_attacks
                                            live_segment_stats1.stats_76_90.away.da = cStats[0].attacks.dangerous_attacks
                                        }
                                    }
                                    if(cStats[1].possessiontime){
                                        live_segment_stats1.stats_76_90.home.pos = cStats[1].possessiontime
                                        live_segment_stats1.stats_76_90.away.pos = cStats[0].possessiontime
                                    }
                                    if(cStats[1].redcards){
                                        live_segment_stats1.stats_76_90.home.red = cStats[1].redcards
                                        live_segment_stats1.stats_76_90.away.red = cStats[0].redcards
                                    }
                                    if(cStats[1].yellowcards){
                                        live_segment_stats1.stats_76_90.home.yel = cStats[1].yellowcards
                                        live_segment_stats1.stats_76_90.home.yel = cStats[0].yellowcards
                                    }
                                }
                            }
                        }
                        //-------------------------------------------------------------Total Stats------------------------------------------------------------
                        this.live_segment_stats.stats_0_15.home.goal = this.live_segment_stats.stats_0_15.home.goal + live_segment_stats1.stats_0_15.home.goal
                        this.live_segment_stats.stats_0_15.away.goal = this.live_segment_stats.stats_0_15.away.goal + live_segment_stats1.stats_0_15.away.goal
                        this.live_segment_stats.stats_0_15.home.on = this.live_segment_stats.stats_0_15.home.on + live_segment_stats1.stats_0_15.home.on
                        this.live_segment_stats.stats_0_15.away.on = this.live_segment_stats.stats_0_15.away.on + live_segment_stats1.stats_0_15.away.on
                        this.live_segment_stats.stats_0_15.home.off = this.live_segment_stats.stats_0_15.home.off + live_segment_stats1.stats_0_15.home.off
                        this.live_segment_stats.stats_0_15.away.off = this.live_segment_stats.stats_0_15.away.off + live_segment_stats1.stats_0_15.away.off
                        this.live_segment_stats.stats_0_15.home.blk = this.live_segment_stats.stats_0_15.home.blk + live_segment_stats1.stats_0_15.home.blk
                        this.live_segment_stats.stats_0_15.away.blk = this.live_segment_stats.stats_0_15.away.blk + live_segment_stats1.stats_0_15.away.blk
                        this.live_segment_stats.stats_0_15.home.in = this.live_segment_stats.stats_0_15.home.in + live_segment_stats1.stats_0_15.home.in
                        this.live_segment_stats.stats_0_15.away.in = this.live_segment_stats.stats_0_15.away.in + live_segment_stats1.stats_0_15.away.in
                        this.live_segment_stats.stats_0_15.home.out = this.live_segment_stats.stats_0_15.home.out + live_segment_stats1.stats_0_15.home.out
                        this.live_segment_stats.stats_0_15.away.out = this.live_segment_stats.stats_0_15.away.out + live_segment_stats1.stats_0_15.away.out
                        this.live_segment_stats.stats_0_15.home.cnr = this.live_segment_stats.stats_0_15.home.cnr + live_segment_stats1.stats_0_15.home.cnr
                        this.live_segment_stats.stats_0_15.away.cnr = this.live_segment_stats.stats_0_15.away.cnr + live_segment_stats1.stats_0_15.away.cnr
                        this.live_segment_stats.stats_0_15.home.da = this.live_segment_stats.stats_0_15.home.da + live_segment_stats1.stats_0_15.home.da
                        this.live_segment_stats.stats_0_15.away.da = this.live_segment_stats.stats_0_15.away.da + live_segment_stats1.stats_0_15.away.da
                        this.live_segment_stats.stats_0_15.home.pos = this.live_segment_stats.stats_0_15.home.pos + live_segment_stats1.stats_0_15.home.pos
                        this.live_segment_stats.stats_0_15.away.pos = this.live_segment_stats.stats_0_15.away.pos + live_segment_stats1.stats_0_15.away.pos
                        this.live_segment_stats.stats_0_15.home.red = this.live_segment_stats.stats_0_15.home.red + live_segment_stats1.stats_0_15.home.red
                        this.live_segment_stats.stats_0_15.away.red = this.live_segment_stats.stats_0_15.away.red + live_segment_stats1.stats_0_15.away.red
                        this.live_segment_stats.stats_0_15.home.yel = this.live_segment_stats.stats_0_15.home.yel + live_segment_stats1.stats_0_15.home.yel
                        this.live_segment_stats.stats_0_15.away.yel = this.live_segment_stats.stats_0_15.away.yel + live_segment_stats1.stats_0_15.away.yel

                        this.live_segment_stats.stats_16_30.home.goal = this.live_segment_stats.stats_16_30.home.goal + live_segment_stats1.stats_16_30.home.goal
                        this.live_segment_stats.stats_16_30.away.goal = this.live_segment_stats.stats_16_30.away.goal + live_segment_stats1.stats_16_30.away.goal
                        this.live_segment_stats.stats_16_30.home.on = this.live_segment_stats.stats_16_30.home.on + live_segment_stats1.stats_16_30.home.on
                        this.live_segment_stats.stats_16_30.away.on = this.live_segment_stats.stats_16_30.away.on + live_segment_stats1.stats_16_30.away.on
                        this.live_segment_stats.stats_16_30.home.off = this.live_segment_stats.stats_16_30.home.off + live_segment_stats1.stats_16_30.home.off
                        this.live_segment_stats.stats_16_30.away.off = this.live_segment_stats.stats_16_30.away.off + live_segment_stats1.stats_16_30.away.off
                        this.live_segment_stats.stats_16_30.home.blk = this.live_segment_stats.stats_16_30.home.blk + live_segment_stats1.stats_16_30.home.blk
                        this.live_segment_stats.stats_16_30.away.blk = this.live_segment_stats.stats_16_30.away.blk + live_segment_stats1.stats_16_30.away.blk
                        this.live_segment_stats.stats_16_30.home.in = this.live_segment_stats.stats_16_30.home.in + live_segment_stats1.stats_16_30.home.in
                        this.live_segment_stats.stats_16_30.away.in = this.live_segment_stats.stats_16_30.away.in + live_segment_stats1.stats_16_30.away.in
                        this.live_segment_stats.stats_16_30.home.out = this.live_segment_stats.stats_16_30.home.out + live_segment_stats1.stats_16_30.home.out
                        this.live_segment_stats.stats_16_30.away.out = this.live_segment_stats.stats_16_30.away.out + live_segment_stats1.stats_16_30.away.out
                        this.live_segment_stats.stats_16_30.home.cnr = this.live_segment_stats.stats_16_30.home.cnr + live_segment_stats1.stats_16_30.home.cnr
                        this.live_segment_stats.stats_16_30.away.cnr = this.live_segment_stats.stats_16_30.away.cnr + live_segment_stats1.stats_16_30.away.cnr
                        this.live_segment_stats.stats_16_30.home.da = this.live_segment_stats.stats_16_30.home.da + live_segment_stats1.stats_16_30.home.da
                        this.live_segment_stats.stats_16_30.away.da = this.live_segment_stats.stats_16_30.away.da + live_segment_stats1.stats_16_30.away.da
                        this.live_segment_stats.stats_16_30.home.pos = this.live_segment_stats.stats_16_30.home.pos + live_segment_stats1.stats_16_30.home.pos
                        this.live_segment_stats.stats_16_30.away.pos = this.live_segment_stats.stats_16_30.away.pos + live_segment_stats1.stats_16_30.away.pos
                        this.live_segment_stats.stats_16_30.home.red = this.live_segment_stats.stats_16_30.home.red + live_segment_stats1.stats_16_30.home.red
                        this.live_segment_stats.stats_16_30.away.red = this.live_segment_stats.stats_16_30.away.red + live_segment_stats1.stats_16_30.away.red
                        this.live_segment_stats.stats_16_30.home.yel = this.live_segment_stats.stats_16_30.home.yel + live_segment_stats1.stats_16_30.home.yel
                        this.live_segment_stats.stats_16_30.away.yel = this.live_segment_stats.stats_16_30.away.yel + live_segment_stats1.stats_16_30.away.yel

                        this.live_segment_stats.stats_31_45.home.goal = this.live_segment_stats.stats_31_45.home.goal + live_segment_stats1.stats_31_45.home.goal
                        this.live_segment_stats.stats_31_45.away.goal = this.live_segment_stats.stats_31_45.away.goal + live_segment_stats1.stats_31_45.away.goal
                        this.live_segment_stats.stats_31_45.home.on = this.live_segment_stats.stats_31_45.home.on + live_segment_stats1.stats_31_45.home.on
                        this.live_segment_stats.stats_31_45.away.on = this.live_segment_stats.stats_31_45.away.on + live_segment_stats1.stats_31_45.away.on
                        this.live_segment_stats.stats_31_45.home.off = this.live_segment_stats.stats_31_45.home.off + live_segment_stats1.stats_31_45.home.off
                        this.live_segment_stats.stats_31_45.away.off = this.live_segment_stats.stats_31_45.away.off + live_segment_stats1.stats_31_45.away.off
                        this.live_segment_stats.stats_31_45.home.blk = this.live_segment_stats.stats_31_45.home.blk + live_segment_stats1.stats_31_45.home.blk
                        this.live_segment_stats.stats_31_45.away.blk = this.live_segment_stats.stats_31_45.away.blk + live_segment_stats1.stats_31_45.away.blk
                        this.live_segment_stats.stats_31_45.home.in = this.live_segment_stats.stats_31_45.home.in + live_segment_stats1.stats_31_45.home.in
                        this.live_segment_stats.stats_31_45.away.in = this.live_segment_stats.stats_31_45.away.in + live_segment_stats1.stats_31_45.away.in
                        this.live_segment_stats.stats_31_45.home.out = this.live_segment_stats.stats_31_45.home.out + live_segment_stats1.stats_31_45.home.out
                        this.live_segment_stats.stats_31_45.away.out = this.live_segment_stats.stats_31_45.away.out + live_segment_stats1.stats_31_45.away.out
                        this.live_segment_stats.stats_31_45.home.cnr = this.live_segment_stats.stats_31_45.home.cnr + live_segment_stats1.stats_31_45.home.cnr
                        this.live_segment_stats.stats_31_45.away.cnr = this.live_segment_stats.stats_31_45.away.cnr + live_segment_stats1.stats_31_45.away.cnr
                        this.live_segment_stats.stats_31_45.home.da = this.live_segment_stats.stats_31_45.home.da + live_segment_stats1.stats_31_45.home.da
                        this.live_segment_stats.stats_31_45.away.da = this.live_segment_stats.stats_31_45.away.da + live_segment_stats1.stats_31_45.away.da
                        this.live_segment_stats.stats_31_45.home.pos = this.live_segment_stats.stats_31_45.home.pos + live_segment_stats1.stats_31_45.home.pos
                        this.live_segment_stats.stats_31_45.away.pos = this.live_segment_stats.stats_31_45.away.pos + live_segment_stats1.stats_31_45.away.pos
                        this.live_segment_stats.stats_31_45.home.red = this.live_segment_stats.stats_31_45.home.red + live_segment_stats1.stats_31_45.home.red
                        this.live_segment_stats.stats_31_45.away.red = this.live_segment_stats.stats_31_45.away.red + live_segment_stats1.stats_31_45.away.red
                        this.live_segment_stats.stats_31_45.home.yel = this.live_segment_stats.stats_31_45.home.yel + live_segment_stats1.stats_31_45.home.yel
                        this.live_segment_stats.stats_31_45.away.yel = this.live_segment_stats.stats_31_45.away.yel + live_segment_stats1.stats_31_45.away.yel

                        this.live_segment_stats.stats_46_60.home.goal = this.live_segment_stats.stats_46_60.home.goal + live_segment_stats1.stats_46_60.home.goal
                        this.live_segment_stats.stats_46_60.away.goal = this.live_segment_stats.stats_46_60.away.goal + live_segment_stats1.stats_46_60.away.goal
                        this.live_segment_stats.stats_46_60.home.on = this.live_segment_stats.stats_46_60.home.on + live_segment_stats1.stats_46_60.home.on
                        this.live_segment_stats.stats_46_60.away.on = this.live_segment_stats.stats_46_60.away.on + live_segment_stats1.stats_46_60.away.on
                        this.live_segment_stats.stats_46_60.home.off = this.live_segment_stats.stats_46_60.home.off + live_segment_stats1.stats_46_60.home.off
                        this.live_segment_stats.stats_46_60.away.off = this.live_segment_stats.stats_46_60.away.off + live_segment_stats1.stats_46_60.away.off
                        this.live_segment_stats.stats_46_60.home.blk = this.live_segment_stats.stats_46_60.home.blk + live_segment_stats1.stats_46_60.home.blk
                        this.live_segment_stats.stats_46_60.away.blk = this.live_segment_stats.stats_46_60.away.blk + live_segment_stats1.stats_46_60.away.blk
                        this.live_segment_stats.stats_46_60.home.in = this.live_segment_stats.stats_46_60.home.in + live_segment_stats1.stats_46_60.home.in
                        this.live_segment_stats.stats_46_60.away.in = this.live_segment_stats.stats_46_60.away.in + live_segment_stats1.stats_46_60.away.in
                        this.live_segment_stats.stats_46_60.home.out = this.live_segment_stats.stats_46_60.home.out + live_segment_stats1.stats_46_60.home.out
                        this.live_segment_stats.stats_46_60.away.out = this.live_segment_stats.stats_46_60.away.out + live_segment_stats1.stats_46_60.away.out
                        this.live_segment_stats.stats_46_60.home.cnr = this.live_segment_stats.stats_46_60.home.cnr + live_segment_stats1.stats_46_60.home.cnr
                        this.live_segment_stats.stats_46_60.away.cnr = this.live_segment_stats.stats_46_60.away.cnr + live_segment_stats1.stats_46_60.away.cnr
                        this.live_segment_stats.stats_46_60.home.da = this.live_segment_stats.stats_46_60.home.da + live_segment_stats1.stats_46_60.home.da
                        this.live_segment_stats.stats_46_60.away.da = this.live_segment_stats.stats_46_60.away.da + live_segment_stats1.stats_46_60.away.da
                        this.live_segment_stats.stats_46_60.home.pos = this.live_segment_stats.stats_46_60.home.pos + live_segment_stats1.stats_46_60.home.pos
                        this.live_segment_stats.stats_46_60.away.pos = this.live_segment_stats.stats_46_60.away.pos + live_segment_stats1.stats_46_60.away.pos
                        this.live_segment_stats.stats_46_60.home.red = this.live_segment_stats.stats_46_60.home.red + live_segment_stats1.stats_46_60.home.red
                        this.live_segment_stats.stats_46_60.away.red = this.live_segment_stats.stats_46_60.away.red + live_segment_stats1.stats_46_60.away.red
                        this.live_segment_stats.stats_46_60.home.yel = this.live_segment_stats.stats_46_60.home.yel + live_segment_stats1.stats_46_60.home.yel
                        this.live_segment_stats.stats_46_60.away.yel = this.live_segment_stats.stats_46_60.away.yel + live_segment_stats1.stats_46_60.away.yel

                        this.live_segment_stats.stats_61_75.home.goal = this.live_segment_stats.stats_61_75.home.goal + live_segment_stats1.stats_61_75.home.goal
                        this.live_segment_stats.stats_61_75.away.goal = this.live_segment_stats.stats_61_75.away.goal + live_segment_stats1.stats_61_75.away.goal
                        this.live_segment_stats.stats_61_75.home.on = this.live_segment_stats.stats_61_75.home.on + live_segment_stats1.stats_61_75.home.on
                        this.live_segment_stats.stats_61_75.away.on = this.live_segment_stats.stats_61_75.away.on + live_segment_stats1.stats_61_75.away.on
                        this.live_segment_stats.stats_61_75.home.off = this.live_segment_stats.stats_61_75.home.off + live_segment_stats1.stats_61_75.home.off
                        this.live_segment_stats.stats_61_75.away.off = this.live_segment_stats.stats_61_75.away.off + live_segment_stats1.stats_61_75.away.off
                        this.live_segment_stats.stats_61_75.home.blk = this.live_segment_stats.stats_61_75.home.blk + live_segment_stats1.stats_61_75.home.blk
                        this.live_segment_stats.stats_61_75.away.blk = this.live_segment_stats.stats_61_75.away.blk + live_segment_stats1.stats_61_75.away.blk
                        this.live_segment_stats.stats_61_75.home.in = this.live_segment_stats.stats_61_75.home.in + live_segment_stats1.stats_61_75.home.in
                        this.live_segment_stats.stats_61_75.away.in = this.live_segment_stats.stats_61_75.away.in + live_segment_stats1.stats_61_75.away.in
                        this.live_segment_stats.stats_61_75.home.out = this.live_segment_stats.stats_61_75.home.out + live_segment_stats1.stats_61_75.home.out
                        this.live_segment_stats.stats_61_75.away.out = this.live_segment_stats.stats_61_75.away.out + live_segment_stats1.stats_61_75.away.out
                        this.live_segment_stats.stats_61_75.home.cnr = this.live_segment_stats.stats_61_75.home.cnr + live_segment_stats1.stats_61_75.home.cnr
                        this.live_segment_stats.stats_61_75.away.cnr = this.live_segment_stats.stats_61_75.away.cnr + live_segment_stats1.stats_61_75.away.cnr
                        this.live_segment_stats.stats_61_75.home.da = this.live_segment_stats.stats_61_75.home.da + live_segment_stats1.stats_61_75.home.da
                        this.live_segment_stats.stats_61_75.away.da = this.live_segment_stats.stats_61_75.away.da + live_segment_stats1.stats_61_75.away.da
                        this.live_segment_stats.stats_61_75.home.pos = this.live_segment_stats.stats_61_75.home.pos + live_segment_stats1.stats_61_75.home.pos
                        this.live_segment_stats.stats_61_75.away.pos = this.live_segment_stats.stats_61_75.away.pos + live_segment_stats1.stats_61_75.away.pos
                        this.live_segment_stats.stats_61_75.home.red = this.live_segment_stats.stats_61_75.home.red + live_segment_stats1.stats_61_75.home.red
                        this.live_segment_stats.stats_61_75.away.red = this.live_segment_stats.stats_61_75.away.red + live_segment_stats1.stats_61_75.away.red
                        this.live_segment_stats.stats_61_75.home.yel = this.live_segment_stats.stats_61_75.home.yel + live_segment_stats1.stats_61_75.home.yel
                        this.live_segment_stats.stats_61_75.away.yel = this.live_segment_stats.stats_61_75.away.yel + live_segment_stats1.stats_61_75.away.yel

                        this.live_segment_stats.stats_76_90.home.goal = this.live_segment_stats.stats_76_90.home.goal + live_segment_stats1.stats_76_90.home.goal
                        this.live_segment_stats.stats_76_90.away.goal = this.live_segment_stats.stats_76_90.away.goal + live_segment_stats1.stats_76_90.away.goal
                        this.live_segment_stats.stats_76_90.home.on = this.live_segment_stats.stats_76_90.home.on + live_segment_stats1.stats_76_90.home.on
                        this.live_segment_stats.stats_76_90.away.on = this.live_segment_stats.stats_76_90.away.on + live_segment_stats1.stats_76_90.away.on
                        this.live_segment_stats.stats_76_90.home.off = this.live_segment_stats.stats_76_90.home.off + live_segment_stats1.stats_76_90.home.off
                        this.live_segment_stats.stats_76_90.away.off = this.live_segment_stats.stats_76_90.away.off + live_segment_stats1.stats_76_90.away.off
                        this.live_segment_stats.stats_76_90.home.blk = this.live_segment_stats.stats_76_90.home.blk + live_segment_stats1.stats_76_90.home.blk
                        this.live_segment_stats.stats_76_90.away.blk = this.live_segment_stats.stats_76_90.away.blk + live_segment_stats1.stats_76_90.away.blk
                        this.live_segment_stats.stats_76_90.home.in = this.live_segment_stats.stats_76_90.home.in + live_segment_stats1.stats_76_90.home.in
                        this.live_segment_stats.stats_76_90.away.in = this.live_segment_stats.stats_76_90.away.in + live_segment_stats1.stats_76_90.away.in
                        this.live_segment_stats.stats_76_90.home.out = this.live_segment_stats.stats_76_90.home.out + live_segment_stats1.stats_76_90.home.out
                        this.live_segment_stats.stats_76_90.away.out = this.live_segment_stats.stats_76_90.away.out + live_segment_stats1.stats_76_90.away.out
                        this.live_segment_stats.stats_76_90.home.cnr = this.live_segment_stats.stats_76_90.home.cnr + live_segment_stats1.stats_76_90.home.cnr
                        this.live_segment_stats.stats_76_90.away.cnr = this.live_segment_stats.stats_76_90.away.cnr + live_segment_stats1.stats_76_90.away.cnr
                        this.live_segment_stats.stats_76_90.home.da = this.live_segment_stats.stats_76_90.home.da + live_segment_stats1.stats_76_90.home.da
                        this.live_segment_stats.stats_76_90.away.da = this.live_segment_stats.stats_76_90.away.da + live_segment_stats1.stats_76_90.away.da
                        this.live_segment_stats.stats_76_90.home.pos = this.live_segment_stats.stats_76_90.home.pos + live_segment_stats1.stats_76_90.home.pos
                        this.live_segment_stats.stats_76_90.away.pos = this.live_segment_stats.stats_76_90.away.pos + live_segment_stats1.stats_76_90.away.pos
                        this.live_segment_stats.stats_76_90.home.red = this.live_segment_stats.stats_76_90.home.red + live_segment_stats1.stats_76_90.home.red
                        this.live_segment_stats.stats_76_90.away.red = this.live_segment_stats.stats_76_90.away.red + live_segment_stats1.stats_76_90.away.red
                        this.live_segment_stats.stats_76_90.home.yel = this.live_segment_stats.stats_76_90.home.yel + live_segment_stats1.stats_76_90.home.yel
                        this.live_segment_stats.stats_76_90.away.yel = this.live_segment_stats.stats_76_90.away.yel + live_segment_stats1.stats_76_90.away.yel
                        //-------------------------------------------------------time segmented stats---------------------------------------------------------
                        this.live_segment_stats1.stats_0_15.home.goal = this.live_segment_stats1.stats_0_15.home.goal + live_segment_stats1.stats_0_15.home.goal
                        this.live_segment_stats1.stats_0_15.away.goal = this.live_segment_stats1.stats_0_15.away.goal + live_segment_stats1.stats_0_15.away.goal
                        this.live_segment_stats1.stats_0_15.home.on = this.live_segment_stats1.stats_0_15.home.on + live_segment_stats1.stats_0_15.home.on
                        this.live_segment_stats1.stats_0_15.away.on = this.live_segment_stats1.stats_0_15.away.on + live_segment_stats1.stats_0_15.away.on
                        this.live_segment_stats1.stats_0_15.home.off = this.live_segment_stats1.stats_0_15.home.off + live_segment_stats1.stats_0_15.home.off
                        this.live_segment_stats1.stats_0_15.away.off = this.live_segment_stats1.stats_0_15.away.off + live_segment_stats1.stats_0_15.away.off
                        this.live_segment_stats1.stats_0_15.home.blk = this.live_segment_stats1.stats_0_15.home.blk + live_segment_stats1.stats_0_15.home.blk
                        this.live_segment_stats1.stats_0_15.away.blk = this.live_segment_stats1.stats_0_15.away.blk + live_segment_stats1.stats_0_15.away.blk
                        this.live_segment_stats1.stats_0_15.home.in = this.live_segment_stats1.stats_0_15.home.in + live_segment_stats1.stats_0_15.home.in
                        this.live_segment_stats1.stats_0_15.away.in = this.live_segment_stats1.stats_0_15.away.in + live_segment_stats1.stats_0_15.away.in
                        this.live_segment_stats1.stats_0_15.home.out = this.live_segment_stats1.stats_0_15.home.out + live_segment_stats1.stats_0_15.home.out
                        this.live_segment_stats1.stats_0_15.away.out = this.live_segment_stats1.stats_0_15.away.out + live_segment_stats1.stats_0_15.away.out
                        this.live_segment_stats1.stats_0_15.home.cnr = this.live_segment_stats1.stats_0_15.home.cnr + live_segment_stats1.stats_0_15.home.cnr
                        this.live_segment_stats1.stats_0_15.away.cnr = this.live_segment_stats1.stats_0_15.away.cnr + live_segment_stats1.stats_0_15.away.cnr
                        this.live_segment_stats1.stats_0_15.home.da = this.live_segment_stats1.stats_0_15.home.da + live_segment_stats1.stats_0_15.home.da
                        this.live_segment_stats1.stats_0_15.away.da = this.live_segment_stats1.stats_0_15.away.da + live_segment_stats1.stats_0_15.away.da
                        this.live_segment_stats1.stats_0_15.home.pos = this.live_segment_stats1.stats_0_15.home.pos + live_segment_stats1.stats_0_15.home.pos
                        this.live_segment_stats1.stats_0_15.away.pos = this.live_segment_stats1.stats_0_15.away.pos + live_segment_stats1.stats_0_15.away.pos
                        this.live_segment_stats1.stats_0_15.home.red = this.live_segment_stats1.stats_0_15.home.red + live_segment_stats1.stats_0_15.home.red
                        this.live_segment_stats1.stats_0_15.away.red = this.live_segment_stats1.stats_0_15.away.red + live_segment_stats1.stats_0_15.away.red
                        this.live_segment_stats1.stats_0_15.home.yel = this.live_segment_stats1.stats_0_15.home.yel + live_segment_stats1.stats_0_15.home.yel
                        this.live_segment_stats1.stats_0_15.away.yel = this.live_segment_stats1.stats_0_15.away.yel + live_segment_stats1.stats_0_15.away.yel

                        this.live_segment_stats1.stats_16_30.home.goal = this.live_segment_stats1.stats_16_30.home.goal + live_segment_stats1.stats_16_30.home.goal - live_segment_stats1.stats_0_15.home.goal
                        this.live_segment_stats1.stats_16_30.away.goal = this.live_segment_stats1.stats_16_30.away.goal + live_segment_stats1.stats_16_30.away.goal - live_segment_stats1.stats_0_15.away.goal
                        this.live_segment_stats1.stats_16_30.home.on = this.live_segment_stats1.stats_16_30.home.on + live_segment_stats1.stats_16_30.home.on - live_segment_stats1.stats_0_15.home.on
                        this.live_segment_stats1.stats_16_30.away.on = this.live_segment_stats1.stats_16_30.away.on + live_segment_stats1.stats_16_30.away.on - live_segment_stats1.stats_0_15.away.on
                        this.live_segment_stats1.stats_16_30.home.off = this.live_segment_stats1.stats_16_30.home.off + live_segment_stats1.stats_16_30.home.off - live_segment_stats1.stats_0_15.home.off
                        this.live_segment_stats1.stats_16_30.away.off = this.live_segment_stats1.stats_16_30.away.off + live_segment_stats1.stats_16_30.away.off - live_segment_stats1.stats_0_15.away.off
                        this.live_segment_stats1.stats_16_30.home.blk = this.live_segment_stats1.stats_16_30.home.blk + live_segment_stats1.stats_16_30.home.blk - live_segment_stats1.stats_0_15.home.blk
                        this.live_segment_stats1.stats_16_30.away.blk = this.live_segment_stats1.stats_16_30.away.blk + live_segment_stats1.stats_16_30.away.blk - live_segment_stats1.stats_0_15.away.blk
                        this.live_segment_stats1.stats_16_30.home.in = this.live_segment_stats1.stats_16_30.home.in + live_segment_stats1.stats_16_30.home.in - live_segment_stats1.stats_0_15.home.in
                        this.live_segment_stats1.stats_16_30.away.in = this.live_segment_stats1.stats_16_30.away.in + live_segment_stats1.stats_16_30.away.in - live_segment_stats1.stats_0_15.away.in
                        this.live_segment_stats1.stats_16_30.home.out = this.live_segment_stats1.stats_16_30.home.out + live_segment_stats1.stats_16_30.home.out - live_segment_stats1.stats_0_15.home.out
                        this.live_segment_stats1.stats_16_30.away.out = this.live_segment_stats1.stats_16_30.away.out + live_segment_stats1.stats_16_30.away.out - live_segment_stats1.stats_0_15.away.out
                        this.live_segment_stats1.stats_16_30.home.cnr = this.live_segment_stats1.stats_16_30.home.cnr + live_segment_stats1.stats_16_30.home.cnr - live_segment_stats1.stats_0_15.home.cnr
                        this.live_segment_stats1.stats_16_30.away.cnr = this.live_segment_stats1.stats_16_30.away.cnr + live_segment_stats1.stats_16_30.away.cnr - live_segment_stats1.stats_0_15.away.cnr
                        this.live_segment_stats1.stats_16_30.home.da = this.live_segment_stats1.stats_16_30.home.da + live_segment_stats1.stats_16_30.home.da - live_segment_stats1.stats_0_15.home.da
                        this.live_segment_stats1.stats_16_30.away.da = this.live_segment_stats1.stats_16_30.away.da + live_segment_stats1.stats_16_30.away.da - live_segment_stats1.stats_0_15.away.da
                        this.live_segment_stats1.stats_16_30.home.pos = this.live_segment_stats1.stats_16_30.home.pos + live_segment_stats1.stats_16_30.home.pos - live_segment_stats1.stats_0_15.home.pos
                        this.live_segment_stats1.stats_16_30.away.pos = this.live_segment_stats1.stats_16_30.away.pos + live_segment_stats1.stats_16_30.away.pos - live_segment_stats1.stats_0_15.away.pos
                        this.live_segment_stats1.stats_16_30.home.red = this.live_segment_stats1.stats_16_30.home.red + live_segment_stats1.stats_16_30.home.red - live_segment_stats1.stats_0_15.home.red
                        this.live_segment_stats1.stats_16_30.away.red = this.live_segment_stats1.stats_16_30.away.red + live_segment_stats1.stats_16_30.away.red - live_segment_stats1.stats_0_15.away.red
                        this.live_segment_stats1.stats_16_30.home.yel = this.live_segment_stats1.stats_16_30.home.yel + live_segment_stats1.stats_16_30.home.yel - live_segment_stats1.stats_0_15.home.yel
                        this.live_segment_stats1.stats_16_30.away.yel = this.live_segment_stats1.stats_16_30.away.yel + live_segment_stats1.stats_16_30.away.yel - live_segment_stats1.stats_0_15.away.yel

                        this.live_segment_stats1.stats_31_45.home.goal = this.live_segment_stats1.stats_31_45.home.goal + live_segment_stats1.stats_31_45.home.goal - live_segment_stats1.stats_16_30.home.goal
                        this.live_segment_stats1.stats_31_45.away.goal = this.live_segment_stats1.stats_31_45.away.goal + live_segment_stats1.stats_31_45.away.goal - live_segment_stats1.stats_16_30.away.goal
                        this.live_segment_stats1.stats_31_45.home.on = this.live_segment_stats1.stats_31_45.home.on + live_segment_stats1.stats_31_45.home.on - live_segment_stats1.stats_16_30.home.on
                        this.live_segment_stats1.stats_31_45.away.on = this.live_segment_stats1.stats_31_45.away.on + live_segment_stats1.stats_31_45.away.on - live_segment_stats1.stats_16_30.away.on
                        this.live_segment_stats1.stats_31_45.home.off = this.live_segment_stats1.stats_31_45.home.off + live_segment_stats1.stats_31_45.home.off - live_segment_stats1.stats_16_30.home.off
                        this.live_segment_stats1.stats_31_45.away.off = this.live_segment_stats1.stats_31_45.away.off + live_segment_stats1.stats_31_45.away.off - live_segment_stats1.stats_16_30.away.off
                        this.live_segment_stats1.stats_31_45.home.blk = this.live_segment_stats1.stats_31_45.home.blk + live_segment_stats1.stats_31_45.home.blk - live_segment_stats1.stats_16_30.home.blk
                        this.live_segment_stats1.stats_31_45.away.blk = this.live_segment_stats1.stats_31_45.away.blk + live_segment_stats1.stats_31_45.away.blk - live_segment_stats1.stats_16_30.away.blk
                        this.live_segment_stats1.stats_31_45.home.in = this.live_segment_stats1.stats_31_45.home.in + live_segment_stats1.stats_31_45.home.in - live_segment_stats1.stats_16_30.home.in
                        this.live_segment_stats1.stats_31_45.away.in = this.live_segment_stats1.stats_31_45.away.in + live_segment_stats1.stats_31_45.away.in - live_segment_stats1.stats_16_30.away.in
                        this.live_segment_stats1.stats_31_45.home.out = this.live_segment_stats1.stats_31_45.home.out + live_segment_stats1.stats_31_45.home.out - live_segment_stats1.stats_16_30.home.out
                        this.live_segment_stats1.stats_31_45.away.out = this.live_segment_stats1.stats_31_45.away.out + live_segment_stats1.stats_31_45.away.out - live_segment_stats1.stats_16_30.away.out
                        this.live_segment_stats1.stats_31_45.home.cnr = this.live_segment_stats1.stats_31_45.home.cnr + live_segment_stats1.stats_31_45.home.cnr - live_segment_stats1.stats_16_30.home.cnr
                        this.live_segment_stats1.stats_31_45.away.cnr = this.live_segment_stats1.stats_31_45.away.cnr + live_segment_stats1.stats_31_45.away.cnr - live_segment_stats1.stats_16_30.away.cnr
                        this.live_segment_stats1.stats_31_45.home.da = this.live_segment_stats1.stats_31_45.home.da + live_segment_stats1.stats_31_45.home.da - live_segment_stats1.stats_16_30.home.da
                        this.live_segment_stats1.stats_31_45.away.da = this.live_segment_stats1.stats_31_45.away.da + live_segment_stats1.stats_31_45.away.da - live_segment_stats1.stats_16_30.away.da
                        this.live_segment_stats1.stats_31_45.home.pos = this.live_segment_stats1.stats_31_45.home.pos + live_segment_stats1.stats_31_45.home.pos - live_segment_stats1.stats_16_30.home.pos
                        this.live_segment_stats1.stats_31_45.away.pos = this.live_segment_stats1.stats_31_45.away.pos + live_segment_stats1.stats_31_45.away.pos - live_segment_stats1.stats_16_30.away.pos
                        this.live_segment_stats1.stats_31_45.home.red = this.live_segment_stats1.stats_31_45.home.red + live_segment_stats1.stats_31_45.home.red - live_segment_stats1.stats_16_30.home.red
                        this.live_segment_stats1.stats_31_45.away.red = this.live_segment_stats1.stats_31_45.away.red + live_segment_stats1.stats_31_45.away.red - live_segment_stats1.stats_16_30.away.red
                        this.live_segment_stats1.stats_31_45.home.yel = this.live_segment_stats1.stats_31_45.home.yel + live_segment_stats1.stats_31_45.home.yel - live_segment_stats1.stats_16_30.home.yel
                        this.live_segment_stats1.stats_31_45.away.yel = this.live_segment_stats1.stats_31_45.away.yel + live_segment_stats1.stats_31_45.away.yel - live_segment_stats1.stats_16_30.away.yel

                        this.live_segment_stats1.stats_46_60.home.goal = this.live_segment_stats1.stats_46_60.home.goal + live_segment_stats1.stats_46_60.home.goal - live_segment_stats1.stats_31_45.home.goal
                        this.live_segment_stats1.stats_46_60.away.goal = this.live_segment_stats1.stats_46_60.away.goal + live_segment_stats1.stats_46_60.away.goal - live_segment_stats1.stats_31_45.away.goal
                        this.live_segment_stats1.stats_46_60.home.on = this.live_segment_stats1.stats_46_60.home.on + live_segment_stats1.stats_46_60.home.on - live_segment_stats1.stats_31_45.home.on
                        this.live_segment_stats1.stats_46_60.away.on = this.live_segment_stats1.stats_46_60.away.on + live_segment_stats1.stats_46_60.away.on - live_segment_stats1.stats_31_45.away.on
                        this.live_segment_stats1.stats_46_60.home.off = this.live_segment_stats1.stats_46_60.home.off + live_segment_stats1.stats_46_60.home.off - live_segment_stats1.stats_31_45.home.off
                        this.live_segment_stats1.stats_46_60.away.off = this.live_segment_stats1.stats_46_60.away.off + live_segment_stats1.stats_46_60.away.off - live_segment_stats1.stats_31_45.away.off
                        this.live_segment_stats1.stats_46_60.home.blk = this.live_segment_stats1.stats_46_60.home.blk + live_segment_stats1.stats_46_60.home.blk - live_segment_stats1.stats_31_45.home.blk
                        this.live_segment_stats1.stats_46_60.away.blk = this.live_segment_stats1.stats_46_60.away.blk + live_segment_stats1.stats_46_60.away.blk - live_segment_stats1.stats_31_45.away.blk
                        this.live_segment_stats1.stats_46_60.home.in = this.live_segment_stats1.stats_46_60.home.in + live_segment_stats1.stats_46_60.home.in - live_segment_stats1.stats_31_45.home.in
                        this.live_segment_stats1.stats_46_60.away.in = this.live_segment_stats1.stats_46_60.away.in + live_segment_stats1.stats_46_60.away.in - live_segment_stats1.stats_31_45.away.in
                        this.live_segment_stats1.stats_46_60.home.out = this.live_segment_stats1.stats_46_60.home.out + live_segment_stats1.stats_46_60.home.out - live_segment_stats1.stats_31_45.home.out
                        this.live_segment_stats1.stats_46_60.away.out = this.live_segment_stats1.stats_46_60.away.out + live_segment_stats1.stats_46_60.away.out - live_segment_stats1.stats_31_45.away.out
                        this.live_segment_stats1.stats_46_60.home.cnr = this.live_segment_stats1.stats_46_60.home.cnr + live_segment_stats1.stats_46_60.home.cnr - live_segment_stats1.stats_31_45.home.cnr
                        this.live_segment_stats1.stats_46_60.away.cnr = this.live_segment_stats1.stats_46_60.away.cnr + live_segment_stats1.stats_46_60.away.cnr - live_segment_stats1.stats_31_45.away.cnr
                        this.live_segment_stats1.stats_46_60.home.da = this.live_segment_stats1.stats_46_60.home.da + live_segment_stats1.stats_46_60.home.da - live_segment_stats1.stats_31_45.home.da
                        this.live_segment_stats1.stats_46_60.away.da = this.live_segment_stats1.stats_46_60.away.da + live_segment_stats1.stats_46_60.away.da - live_segment_stats1.stats_31_45.away.da
                        this.live_segment_stats1.stats_46_60.home.pos = this.live_segment_stats1.stats_46_60.home.pos + live_segment_stats1.stats_46_60.home.pos - live_segment_stats1.stats_31_45.home.pos
                        this.live_segment_stats1.stats_46_60.away.pos = this.live_segment_stats1.stats_46_60.away.pos + live_segment_stats1.stats_46_60.away.pos - live_segment_stats1.stats_31_45.away.pos
                        this.live_segment_stats1.stats_46_60.home.red = this.live_segment_stats1.stats_46_60.home.red + live_segment_stats1.stats_46_60.home.red - live_segment_stats1.stats_31_45.home.red
                        this.live_segment_stats1.stats_46_60.away.red = this.live_segment_stats1.stats_46_60.away.red + live_segment_stats1.stats_46_60.away.red - live_segment_stats1.stats_31_45.away.red
                        this.live_segment_stats1.stats_46_60.home.yel = this.live_segment_stats1.stats_46_60.home.yel + live_segment_stats1.stats_46_60.home.yel - live_segment_stats1.stats_31_45.home.yel
                        this.live_segment_stats1.stats_46_60.away.yel = this.live_segment_stats1.stats_46_60.away.yel + live_segment_stats1.stats_46_60.away.yel - live_segment_stats1.stats_31_45.away.yel

                        this.live_segment_stats1.stats_61_75.home.goal = this.live_segment_stats1.stats_61_75.home.goal + live_segment_stats1.stats_61_75.home.goal - live_segment_stats1.stats_46_60.home.goal
                        this.live_segment_stats1.stats_61_75.away.goal = this.live_segment_stats1.stats_61_75.away.goal + live_segment_stats1.stats_61_75.away.goal - live_segment_stats1.stats_46_60.away.goal
                        this.live_segment_stats1.stats_61_75.home.on = this.live_segment_stats1.stats_61_75.home.on + live_segment_stats1.stats_61_75.home.on - live_segment_stats1.stats_46_60.home.on
                        this.live_segment_stats1.stats_61_75.away.on = this.live_segment_stats1.stats_61_75.away.on + live_segment_stats1.stats_61_75.away.on - live_segment_stats1.stats_46_60.away.on
                        this.live_segment_stats1.stats_61_75.home.off = this.live_segment_stats1.stats_61_75.home.off + live_segment_stats1.stats_61_75.home.off - live_segment_stats1.stats_46_60.home.off
                        this.live_segment_stats1.stats_61_75.away.off = this.live_segment_stats1.stats_61_75.away.off + live_segment_stats1.stats_61_75.away.off - live_segment_stats1.stats_46_60.away.off
                        this.live_segment_stats1.stats_61_75.home.blk = this.live_segment_stats1.stats_61_75.home.blk + live_segment_stats1.stats_61_75.home.blk - live_segment_stats1.stats_46_60.home.blk
                        this.live_segment_stats1.stats_61_75.away.blk = this.live_segment_stats1.stats_61_75.away.blk + live_segment_stats1.stats_61_75.away.blk - live_segment_stats1.stats_46_60.away.blk
                        this.live_segment_stats1.stats_61_75.home.in = this.live_segment_stats1.stats_61_75.home.in + live_segment_stats1.stats_61_75.home.in - live_segment_stats1.stats_46_60.home.in
                        this.live_segment_stats1.stats_61_75.away.in = this.live_segment_stats1.stats_61_75.away.in + live_segment_stats1.stats_61_75.away.in - live_segment_stats1.stats_46_60.away.in
                        this.live_segment_stats1.stats_61_75.home.out = this.live_segment_stats1.stats_61_75.home.out + live_segment_stats1.stats_61_75.home.out - live_segment_stats1.stats_46_60.home.out
                        this.live_segment_stats1.stats_61_75.away.out = this.live_segment_stats1.stats_61_75.away.out + live_segment_stats1.stats_61_75.away.out - live_segment_stats1.stats_46_60.away.out
                        this.live_segment_stats1.stats_61_75.home.cnr = this.live_segment_stats1.stats_61_75.home.cnr + live_segment_stats1.stats_61_75.home.cnr - live_segment_stats1.stats_46_60.home.cnr
                        this.live_segment_stats1.stats_61_75.away.cnr = this.live_segment_stats1.stats_61_75.away.cnr + live_segment_stats1.stats_61_75.away.cnr - live_segment_stats1.stats_46_60.away.cnr
                        this.live_segment_stats1.stats_61_75.home.da = this.live_segment_stats1.stats_61_75.home.da + live_segment_stats1.stats_61_75.home.da - live_segment_stats1.stats_46_60.home.da
                        this.live_segment_stats1.stats_61_75.away.da = this.live_segment_stats1.stats_61_75.away.da + live_segment_stats1.stats_61_75.away.da - live_segment_stats1.stats_46_60.away.da
                        this.live_segment_stats1.stats_61_75.home.pos = this.live_segment_stats1.stats_61_75.home.pos + live_segment_stats1.stats_61_75.home.pos - live_segment_stats1.stats_46_60.home.pos
                        this.live_segment_stats1.stats_61_75.away.pos = this.live_segment_stats1.stats_61_75.away.pos + live_segment_stats1.stats_61_75.away.pos - live_segment_stats1.stats_46_60.away.pos
                        this.live_segment_stats1.stats_61_75.home.red = this.live_segment_stats1.stats_61_75.home.red + live_segment_stats1.stats_61_75.home.red - live_segment_stats1.stats_46_60.home.red
                        this.live_segment_stats1.stats_61_75.away.red = this.live_segment_stats1.stats_61_75.away.red + live_segment_stats1.stats_61_75.away.red - live_segment_stats1.stats_46_60.away.red
                        this.live_segment_stats1.stats_61_75.home.yel = this.live_segment_stats1.stats_61_75.home.yel + live_segment_stats1.stats_61_75.home.yel - live_segment_stats1.stats_46_60.home.yel
                        this.live_segment_stats1.stats_61_75.away.yel = this.live_segment_stats1.stats_61_75.away.yel + live_segment_stats1.stats_61_75.away.yel - live_segment_stats1.stats_46_60.away.yel

                        this.live_segment_stats1.stats_76_90.home.goal = this.live_segment_stats1.stats_76_90.home.goal + live_segment_stats1.stats_76_90.home.goal - live_segment_stats1.stats_61_75.home.goal
                        this.live_segment_stats1.stats_76_90.away.goal = this.live_segment_stats1.stats_76_90.away.goal + live_segment_stats1.stats_76_90.away.goal - live_segment_stats1.stats_61_75.away.goal
                        this.live_segment_stats1.stats_76_90.home.on = this.live_segment_stats1.stats_76_90.home.on + live_segment_stats1.stats_76_90.home.on - live_segment_stats1.stats_61_75.home.on
                        this.live_segment_stats1.stats_76_90.away.on = this.live_segment_stats1.stats_76_90.away.on + live_segment_stats1.stats_76_90.away.on - live_segment_stats1.stats_61_75.away.on
                        this.live_segment_stats1.stats_76_90.home.off = this.live_segment_stats1.stats_76_90.home.off + live_segment_stats1.stats_76_90.home.off - live_segment_stats1.stats_61_75.home.off
                        this.live_segment_stats1.stats_76_90.away.off = this.live_segment_stats1.stats_76_90.away.off + live_segment_stats1.stats_76_90.away.off - live_segment_stats1.stats_61_75.away.off
                        this.live_segment_stats1.stats_76_90.home.blk = this.live_segment_stats1.stats_76_90.home.blk + live_segment_stats1.stats_76_90.home.blk - live_segment_stats1.stats_61_75.home.blk
                        this.live_segment_stats1.stats_76_90.away.blk = this.live_segment_stats1.stats_76_90.away.blk + live_segment_stats1.stats_76_90.away.blk - live_segment_stats1.stats_61_75.away.blk
                        this.live_segment_stats1.stats_76_90.home.in = this.live_segment_stats1.stats_76_90.home.in + live_segment_stats1.stats_76_90.home.in - live_segment_stats1.stats_61_75.home.in
                        this.live_segment_stats1.stats_76_90.away.in = this.live_segment_stats1.stats_76_90.away.in + live_segment_stats1.stats_76_90.away.in - live_segment_stats1.stats_61_75.away.in
                        this.live_segment_stats1.stats_76_90.home.out = this.live_segment_stats1.stats_76_90.home.out + live_segment_stats1.stats_76_90.home.out - live_segment_stats1.stats_61_75.home.out
                        this.live_segment_stats1.stats_76_90.away.out = this.live_segment_stats1.stats_76_90.away.out + live_segment_stats1.stats_76_90.away.out - live_segment_stats1.stats_61_75.away.out
                        this.live_segment_stats1.stats_76_90.home.cnr = this.live_segment_stats1.stats_76_90.home.cnr + live_segment_stats1.stats_76_90.home.cnr - live_segment_stats1.stats_61_75.home.cnr
                        this.live_segment_stats1.stats_76_90.away.cnr = this.live_segment_stats1.stats_76_90.away.cnr + live_segment_stats1.stats_76_90.away.cnr - live_segment_stats1.stats_61_75.away.cnr
                        this.live_segment_stats1.stats_76_90.home.da = this.live_segment_stats1.stats_76_90.home.da + live_segment_stats1.stats_76_90.home.da - live_segment_stats1.stats_61_75.home.da
                        this.live_segment_stats1.stats_76_90.away.da = this.live_segment_stats1.stats_76_90.away.da + live_segment_stats1.stats_76_90.away.da - live_segment_stats1.stats_61_75.away.da
                        this.live_segment_stats1.stats_76_90.home.pos = this.live_segment_stats1.stats_76_90.home.pos + live_segment_stats1.stats_76_90.home.pos - live_segment_stats1.stats_61_75.home.pos
                        this.live_segment_stats1.stats_76_90.away.pos = this.live_segment_stats1.stats_76_90.away.pos + live_segment_stats1.stats_76_90.away.pos - live_segment_stats1.stats_61_75.away.pos
                        this.live_segment_stats1.stats_76_90.home.red = this.live_segment_stats1.stats_76_90.home.red + live_segment_stats1.stats_76_90.home.red - live_segment_stats1.stats_61_75.home.red
                        this.live_segment_stats1.stats_76_90.away.red = this.live_segment_stats1.stats_76_90.away.red + live_segment_stats1.stats_76_90.away.red - live_segment_stats1.stats_61_75.away.red
                        this.live_segment_stats1.stats_76_90.home.yel = this.live_segment_stats1.stats_76_90.home.yel + live_segment_stats1.stats_76_90.home.yel - live_segment_stats1.stats_61_75.home.yel
                        this.live_segment_stats1.stats_76_90.away.yel = this.live_segment_stats1.stats_76_90.away.yel + live_segment_stats1.stats_76_90.away.yel - live_segment_stats1.stats_61_75.away.yel
                        //-------------------------------------------------------------------------------------------------------------------------------------
                    }
                }
            },
            
            min_minute_f(){

            },
            max_minute_f(){

            },

            score_over05_from(val){
                this.score_minute_filter.over05.from = parseInt(val)
                console.log('over 0.5 home minute=>', this.score_minute_filter.over05.from)
                // 
            },
            score_over05_to(val){
                this.score_minute_filter.over05.to = parseInt(val)
                
            },
            score_over15_from(val){
                this.score_minute_filter.over15.from = parseInt(val)
                
            },
            score_over15_to(val){
                this.score_minute_filter.over15.to = parseInt(val)
                
            },
            score_over25_from(val){
                this.score_minute_filter.over25.from = parseInt(val)
                
            },
            score_over25_to(val){
                this.score_minute_filter.over25.to = parseInt(val)
                
            },
            score_over35_from(val){
                this.score_minute_filter.over35.from = parseInt(val)
                
            },
            score_over35_to(val){
                this.score_minute_filter.over35.to = parseInt(val)
                
            },
            score_under05_from(val){
                this.score_minute_filter.under05.from = parseInt(val)
                
            },
            score_under05_to(val){
                this.score_minute_filter.under05.to = parseInt(val)
                
            },
            score_under15_from(val){
                this.score_minute_filter.under15.from = parseInt(val)
                
            },
            score_under15_to(val){
                this.score_minute_filter.under15.to = parseInt(val)
                
            },
            score_under25_from(val){
                this.score_minute_filter.under25.from = parseInt(val)
               
            },
            score_under25_to(val){
                this.score_minute_filter.under25.to = parseInt(val)
                
            },
            score_under35_from(val){
                this.score_minute_filter.under35.from = parseInt(val)
                
            },
            score_under35_to(val){
                this.score_minute_filter.under35.to = parseInt(val)
                
            },
            score_home_from(val){
                this.score_minute_filter.home.from = parseInt(val)
                
            },
            score_home_to(val){
                this.score_minute_filter.home.to = parseInt(val)
                
            },
            score_draws_from(val){
                this.score_minute_filter.draws.from = parseInt(val)
                
            },
            score_draws_to(val){
                this.score_minute_filter.draws.to = parseInt(val)
                
            },
            score_away_from(val){
                this.score_minute_filter.away.from = parseInt(val)
                
            },
            score_away_to(val){
                this.score_minute_filter.away.to = parseInt(val)
                
            },
            score_bts_from(val){
                this.score_minute_filter.bts.from = parseInt(val)
                
            },
            score_bts_to(val){
                this.score_minute_filter.bts.to = parseInt(val)
                
            },
            score_odd_from(val){
                this.score_minute_filter.odd.from = parseInt(val)
                
            },
            score_odd_to(val){
                this.score_minute_filter.odd.to = parseInt(val)
                
            },
            score_even_from(val){
                this.score_minute_filter.even.from = parseInt(val)
                
            },
            score_even_to(val){
                this.score_minute_filter.even.to = parseInt(val)
                
            },

            result_score_15_home(val){
                this.result_at_15.home = val
                //this.getSearchResult()
            },
            result_score_15_away(val){
                this.result_at_15.away = val                
            },
            result_score_30_home(val){
                this.result_at_30.home = val
                
            },
            result_score_30_away(val){
                this.result_at_30.away = val
                
            },
            result_score_ht_home(val){
                this.result_at_ht.home = val
                
            },
            result_score_ht_away(val){
                this.result_at_ht.away = val
                
            },
            result_score_60_home(val){
                this.result_at_60.home = val
                
            },
            result_score_60_away(val){
                this.result_at_60.away = val
                
            },
            result_score_75_home(val){
                this.result_at_75.home = val
                
            },
            result_score_75_away(val){
                this.result_at_75.away = val
                
            },
            result_score_ft_home(val){
                this.result_at_ft.home = val
                
            },
            result_score_ft_away(val){
                this.result_at_ft.away = val
               
            },
            score_filter_function1(sum, a , b){
                console.log('final score filter check===>', sum, a, b)
                for(let i = 1 ; i < this.eventList.length ; i++){
                    if(this.eventList[i].value.scores.length > 0){
                        let home_score = -100
                        let away_score = -100
                        for(let j = 0 ; j < this.eventList[i].value.scores.length ; j++){
                            if(this.eventList[i].value.time[j].minute >= a && this.eventList[i].value.time[j].minute <= b){
                                home_score = this.eventList[i].value.scores[j].localteam_score
                                away_score = this.eventList[i].value.scores[j].visitorteam_score
                            }
                        }
                        if((parseInt(home_score) + parseInt(away_score)) < sum){
                            console.log('remove====>', home_score, away_score, sum)
                            let index = this.eventList.indexOf(this.eventList[i]);
                            if (index > -1) {
                                i = i - 1
                                this.eventList.splice(index, 1);
                            }
                        }
                    }
                    else{
                        let index = this.eventList.indexOf(this.eventList[i]);
                        if (index > -1) {
                            i = i - 1
                            this.eventList.splice(index, 1);
                        }
                    }
                }
            },
            score_filter_function2(sum, a, b){
                for(let i = 1 ; i < this.eventList.length ; i++){
                    if(this.eventList[i].value.scores.length > 0){
                        let home_score = -100
                        let away_score = -100
                        for(let j = 0 ; j < this.eventList[i].value.scores.length ; j++){
                            if(this.eventList[i].value.time[j].minute >= a && this.eventList[i].value.time[j].minute <= b){
                                home_score = this.eventList[i].value.scores[j].localteam_score
                                away_score = this.eventList[i].value.scores[j].visitorteam_score
                            }
                        }
                        if((parseInt(home_score) + parseInt(away_score)) >= sum){
                            let index = this.eventList.indexOf(this.eventList[i]);
                            if (index > -1) {
                                i = i - 1
                                this.eventList.splice(index, 1);
                            }
                        }
                    }
                    else{
                        let index = this.eventList.indexOf(this.eventList[i]);
                        if (index > -1) {
                            i = i - 1
                            this.eventList.splice(index, 1);
                        }
                    }
                }
            },
            score_filter_function3(sum, a, b){
                if(sum === 1){
                    for(let i = 1 ; i < this.eventList.length ; i++){
                        if(this.eventList[i].value.scores.length > 0){
                            let home_score = -100
                            let away_score = -100
                            for(let j = 0 ; j < this.eventList[i].value.scores.length ; j++){
                                if(this.eventList[i].value.time[j].minute >= a && this.eventList[i].value.time[j].minute <= b){
                                    home_score = this.eventList[i].value.scores[j].localteam_score
                                    away_score = this.eventList[i].value.scores[j].visitorteam_score
                                }
                            }
                            if(parseInt(home_score) <= parseInt(away_score)){
                                let index = this.eventList.indexOf(this.eventList[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.eventList.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.eventList.indexOf(this.eventList[i]);
                            if (index > -1) {
                                i = i - 1
                                this.eventList.splice(index, 1);
                            }
                        }
                    }
                }
                if(sum === 2){
                    for(let i = 1 ; i < this.eventList.length ; i++){
                        if(this.eventList[i].value.scores.length > 0){
                            let home_score = -100
                            let away_score = -100
                            for(let j = 0 ; j < this.eventList[i].value.scores.length ; j++){
                                if(this.eventList[i].value.time[j].minute >= a && this.eventList[i].value.time[j].minute <= b){
                                    home_score = this.eventList[i].value.scores[j].localteam_score
                                    away_score = this.eventList[i].value.scores[j].visitorteam_score
                                }
                            }
                            if(parseInt(home_score) != parseInt(away_score)){
                                let index = this.eventList.indexOf(this.eventList[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.eventList.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.eventList.indexOf(this.eventList[i]);
                            if (index > -1) {
                                i = i - 1
                                this.eventList.splice(index, 1);
                            }
                        }
                    }
                }
                if(sum === 3){
                    for(let i = 1 ; i < this.eventList.length ; i++){
                        if(this.eventList[i].value.scores.length > 0){
                            let home_score = -100
                            let away_score = -100
                            for(let j = 0 ; j < this.eventList[i].value.scores.length ; j++){
                                if(this.eventList[i].value.time[j].minute >= a && this.eventList[i].value.time[j].minute <= b){
                                    home_score = this.eventList[i].value.scores[j].localteam_score
                                    away_score = this.eventList[i].value.scores[j].visitorteam_score
                                }
                            }
                            if(parseInt(home_score) >= parseInt(away_score)){
                                let index = this.eventList.indexOf(this.eventList[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.eventList.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.eventList.indexOf(this.eventList[i]);
                            if (index > -1) {
                                i = i - 1
                                this.eventList.splice(index, 1);
                            }
                        }
                    }
                }
            },
            score_filter_function4(sum, a, b){
                if(sum === 1){
                    for(let i = 1 ; i < this.eventList.length ; i++){
                        if(this.eventList[i].value.scores.length > 0){
                            let home_score = -100
                            let away_score = -100
                            for(let j = 0 ; j < this.eventList[i].value.scores.length ; j++){
                                if(this.eventList[i].value.time[j].minute >= a && this.eventList[i].value.time[j].minute <= b){
                                    home_score = this.eventList[i].value.scores[j].localteam_score
                                    away_score = this.eventList[i].value.scores[j].visitorteam_score
                                }
                            }
                            if(parseInt(home_score) < 1 || parseInt(away_score) < 1){
                                let index = this.eventList.indexOf(this.eventList[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.eventList.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.eventList.indexOf(this.eventList[i]);
                            if (index > -1) {
                                i = i - 1
                                this.eventList.splice(index, 1);
                            }
                        }
                    }
                }
                if(sum === 2){
                    for(let i = 1 ; i < this.eventList.length ; i++){
                        if(this.eventList[i].value.scores.length > 0){
                            let home_score = -100
                            let away_score = -100
                            for(let j = 0 ; j < this.eventList[i].value.scores.length ; j++){
                                if(this.eventList[i].value.time[j].minute >= a && this.eventList[i].value.time[j].minute <= b){
                                    home_score = this.eventList[i].value.scores[j].localteam_score
                                    away_score = this.eventList[i].value.scores[j].visitorteam_score
                                }
                            }
                            if((parseInt(home_score) + parseInt(away_score)) % 2 === 0){
                                let index = this.eventList.indexOf(this.eventList[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.eventList.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.eventList.indexOf(this.eventList[i]);
                            if (index > -1) {
                                i = i - 1
                                this.eventList.splice(index, 1);
                            }
                        }
                    }
                }
                if(sum === 3){
                    for(let i = 1 ; i < this.eventList.length ; i++){
                        if(this.eventList[i].value.scores.length > 0){
                            let home_score = -100
                            let away_score = -100
                            for(let j = 0 ; j < this.eventList[i].value.scores.length ; j++){
                                if(this.eventList[i].value.time[j].minute >= a && this.eventList[i].value.time[j].minute <= b){
                                    home_score = this.eventList[i].value.scores[j].localteam_score
                                    away_score = this.eventList[i].value.scores[j].visitorteam_score
                                }
                            }
                            if((parseInt(home_score) + parseInt(away_score)) % 2 === 1){
                                let index = this.eventList.indexOf(this.eventList[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.eventList.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.eventList.indexOf(this.eventList[i]);
                            if (index > -1) {
                                i = i - 1
                                this.eventList.splice(index, 1);
                            }
                        }
                    }
                }
            },
            home_minute_from_filter(val){
                this.homeTeam.minute.from = val
                
            },
            home_minute_to_filter(val){
                this.homeTeam.minute.to = val
                
            },
            away_minute_from_filter(val){
                this.awayTeam.minute.from = val
                
            },
            away_minute_to_filter(val){
                this.awayTeam.minute.to = val
                
            },
            set_event(val){
                console.log('selected event value log', val)
                this.total_home_stats = {
                    'competition': '',
                    'name': '',
                    'score': '',
                    'time': '',
                    'goal': '',
                    'on': '-',
                    'off': '-',
                    'blk': '-',
                    'in': '-',
                    'out': '-',
                    'cnr': '-',
                    'da': '-',
                    'pos': '-',
                    'red': '-',
                    'yel': '-'
                }
                this.total_away_stats = {
                    'name': '',
                    'score': '',
                    'time': '',
                    'goal': '-',
                    'on': '-',
                    'off': '-',
                    'blk': '-',
                    'in': '-',
                    'out': '-',
                    'cnr': '-',
                    'da': '-',
                    'pos': '-',
                    'red': '-',
                    'yel': '-'
                }
                this.delta_home_stats = {
                    'score': '',
                    'on': '-',
                    'off': '-',
                    'blk': '-',
                    'in': '-',
                    'out': '-',
                    'cnr': '-',
                    'da': '-',
                    'pos': '-',
                    'red': '-',
                    'yel': '-'
                }
                this.delta_away_stats = {
                    'score': '',
                    'on': '-',
                    'off': '-',
                    'blk': '-',
                    'in': '-',
                    'out': '-',
                    'cnr': '-',
                    'da': '-',
                    'pos': '-',
                    'red': '-',
                    'yel': '-'
                }
                let home_id = val.home_id
                let away_id = val.away_id
                let home_name = val.home_name
                let away_name = val.away_name
                let time = val.time[0].starting_at.date
                let home_rank = ''
                let away_rank = ''
                if(val.home_rank){
                    home_rank = val.home_rank
                    this.total_home_stats.name = home_name + ' (' + home_rank + ') '
                }
                else{
                    this.total_home_stats.name = home_name
                }
                if(val.away_rank){
                    away_rank = val.away_rank
                    this.total_away_stats.name = away_name + ' (' + away_rank + ') '
                }
                else{
                    this.total_away_stats.name = away_name
                }

                //----------------------------------------live stats part------------------------------
                this.live_segment_stats2= {
                    'stats_0_15': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_16_30': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_31_45': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_46_60': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_61_75': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    },
                    'stats_76_90': {
                        home:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        },
                        away:{
                            'goal': 0,
                            'on': 0,
                            'off': 0,
                            'blk': 0,
                            'in': 0,
                            'out': 0,
                            'cnr': 0,
                            'da': 0,
                            'pos': 0,
                            'red': 0,
                            'yel': 0
                        }
                    }
                }
                if(val.stats.length > 0){
                    let times = val.time
                    let stats = val.stats
                    for(let i = 0 ; i < times.length ; i++){
                        if(times[i].minute <= 15){
                            this.live_segment_stats2.stats_0_15.home.goal = stats[i][0].goals
                            this.live_segment_stats2.stats_0_15.away.goal = stats[i][1].goals
                            if(stats[i][0].shots){
                                this.live_segment_stats2.stats_0_15.home.on = stats[i][0].shots.ongoal
                                this.live_segment_stats2.stats_0_15.away.on = stats[i][1].shots.ongoal
                                this.live_segment_stats2.stats_0_15.home.off = stats[i][0].shots.offgoal
                                this.live_segment_stats2.stats_0_15.away.off = stats[i][1].shots.offgoal
                                if(stats[i][0].shots.blocked){
                                    this.live_segment_stats2.stats_0_15.home.blk = stats[i][0].shots.blocked
                                    this.live_segment_stats2.stats_0_15.away.blk = stats[i][1].shots.blocked
                                }
                                if(stats[i][0].shots.insidebox){
                                    this.live_segment_stats2.stats_0_15.home.in = stats[i][0].shots.insidebox
                                    this.live_segment_stats2.stats_0_15.away.in = stats[i][1].shots.insidebox
                                }
                                if(stats[i][0].shots.outsidebox){
                                    this.live_segment_stats2.stats_0_15.home.out = stats[i][0].shots.outsidebox
                                    this.live_segment_stats2.stats_0_15.away.out = stats[i][1].shots.outsidebox
                                }
                            }
                            this.live_segment_stats2.stats_0_15.home.cnr = stats[i][0].corners
                            this.live_segment_stats2.stats_0_15.away.cnr = stats[i][1].corners
                            if(stats[i][0].attacks){
                                this.live_segment_stats2.stats_0_15.home.da = stats[i][0].attacks.dangerous_attacks
                                this.live_segment_stats2.stats_0_15.away.da = stats[i][1].attacks.dangerous_attacks
                            }
                            this.live_segment_stats2.stats_0_15.home.pos = stats[i][0].possessiontime
                            this.live_segment_stats2.stats_0_15.away.pos = stats[i][1].possessiontime
                            if(stats[i][0].redcards){
                                this.live_segment_stats2.stats_0_15.home.red = stats[i][0].redcards
                                this.live_segment_stats2.stats_0_15.away.red = stats[i][1].redcards
                            }
                            if(stats[i][0].yellowcards){
                                this.live_segment_stats2.stats_0_15.home.yel = stats[i][0].yellowcards
                                this.live_segment_stats2.stats_0_15.away.yel = stats[i][1].yellowcards
                            }
                        }
                        if(times[i].minute >= 16 && times[i].minute <= 30){
                            this.live_segment_stats2.stats_16_30.home.goal = stats[i][0].goals
                            this.live_segment_stats2.stats_16_30.away.goal = stats[i][1].goals
                            if(stats[i][0].shots){
                                this.live_segment_stats2.stats_16_30.home.on = stats[i][0].shots.ongoal
                                this.live_segment_stats2.stats_16_30.away.on = stats[i][1].shots.ongoal
                                this.live_segment_stats2.stats_16_30.home.off = stats[i][0].shots.offgoal
                                this.live_segment_stats2.stats_16_30.away.off = stats[i][1].shots.offgoal
                                if(stats[i][0].shots.blocked){
                                    this.live_segment_stats2.stats_16_30.home.blk = stats[i][0].shots.blocked
                                    this.live_segment_stats2.stats_16_30.away.blk = stats[i][1].shots.blocked
                                }
                                if(stats[i][0].shots.insidebox){
                                    this.live_segment_stats2.stats_16_30.home.in = stats[i][0].shots.insidebox
                                    this.live_segment_stats2.stats_16_30.away.in = stats[i][1].shots.insidebox
                                }
                                if(stats[i][0].shots.outsidebox){
                                    this.live_segment_stats2.stats_16_30.home.out = stats[i][0].shots.outsidebox
                                    this.live_segment_stats2.stats_16_30.away.out = stats[i][1].shots.outsidebox
                                }
                            }
                            this.live_segment_stats2.stats_16_30.home.cnr = stats[i][0].corners
                            this.live_segment_stats2.stats_16_30.away.cnr = stats[i][1].corners
                            if(stats[i][0].attacks){
                                this.live_segment_stats2.stats_16_30.home.da = stats[i][0].attacks.dangerous_attacks
                                this.live_segment_stats2.stats_16_30.away.da = stats[i][1].attacks.dangerous_attacks
                            }
                            this.live_segment_stats2.stats_16_30.home.pos = stats[i][0].possessiontime
                            this.live_segment_stats2.stats_16_30.away.pos = stats[i][1].possessiontime
                            if(stats[i][0].redcards){
                                this.live_segment_stats2.stats_16_30.home.red = stats[i][0].redcards
                                this.live_segment_stats2.stats_16_30.away.red = stats[i][1].redcards
                            }
                            if(stats[i][0].yellowcards){
                                this.live_segment_stats2.stats_16_30.home.yel = stats[i][0].yellowcards
                                this.live_segment_stats2.stats_16_30.away.yel = stats[i][1].yellowcards
                            }
                        }
                        if(times[i].minute >= 31 && times[i].minute <= 45){
                            this.live_segment_stats2.stats_31_45.home.goal = stats[i][0].goals
                            this.live_segment_stats2.stats_31_45.away.goal = stats[i][1].goals
                            if(stats[i][0].shots){
                                this.live_segment_stats2.stats_31_45.home.on = stats[i][0].shots.ongoal
                                this.live_segment_stats2.stats_31_45.away.on = stats[i][1].shots.ongoal
                                this.live_segment_stats2.stats_31_45.home.off = stats[i][0].shots.offgoal
                                this.live_segment_stats2.stats_31_45.away.off = stats[i][1].shots.offgoal
                                if(stats[i][0].shots.blocked){
                                    this.live_segment_stats2.stats_31_45.home.blk = stats[i][0].shots.blocked
                                    this.live_segment_stats2.stats_31_45.away.blk = stats[i][1].shots.blocked
                                }
                                if(stats[i][0].shots.insidebox){
                                    this.live_segment_stats2.stats_31_45.home.in = stats[i][0].shots.insidebox
                                    this.live_segment_stats2.stats_31_45.away.in = stats[i][1].shots.insidebox
                                }
                                if(stats[i][0].shots.outsidebox){
                                    this.live_segment_stats2.stats_31_45.home.out = stats[i][0].shots.outsidebox
                                    this.live_segment_stats2.stats_31_45.away.out = stats[i][1].shots.outsidebox
                                }
                            }
                            this.live_segment_stats2.stats_31_45.home.cnr = stats[i][0].corners
                            this.live_segment_stats2.stats_31_45.away.cnr = stats[i][1].corners
                            if(stats[i][0].attacks){
                                this.live_segment_stats2.stats_31_45.home.da = stats[i][0].attacks.dangerous_attacks
                                this.live_segment_stats2.stats_31_45.away.da = stats[i][1].attacks.dangerous_attacks
                            }
                            this.live_segment_stats2.stats_31_45.home.pos = stats[i][0].possessiontime
                            this.live_segment_stats2.stats_31_45.away.pos = stats[i][1].possessiontime
                            if(stats[i][0].redcards){
                                this.live_segment_stats2.stats_31_45.home.red = stats[i][0].redcards
                                this.live_segment_stats2.stats_31_45.away.red = stats[i][1].redcards
                            }
                            if(stats[i][0].yellowcards){
                                this.live_segment_stats2.stats_31_45.home.yel = stats[i][0].yellowcards
                                this.live_segment_stats2.stats_31_45.away.yel = stats[i][1].yellowcards
                            }
                        }
                        if(times[i].minute >= 46 && times[i].minute <= 60){
                            this.live_segment_stats2.stats_46_60.home.goal = stats[i][0].goals
                            this.live_segment_stats2.stats_46_60.away.goal = stats[i][1].goals
                            if(stats[i][0].shots){
                                this.live_segment_stats2.stats_46_60.home.on = stats[i][0].shots.ongoal
                                this.live_segment_stats2.stats_46_60.away.on = stats[i][1].shots.ongoal
                                this.live_segment_stats2.stats_46_60.home.off = stats[i][0].shots.offgoal
                                this.live_segment_stats2.stats_46_60.away.off = stats[i][1].shots.offgoal
                                if(stats[i][0].shots.blocked){
                                    this.live_segment_stats2.stats_46_60.home.blk = stats[i][0].shots.blocked
                                    this.live_segment_stats2.stats_46_60.away.blk = stats[i][1].shots.blocked
                                }
                                if(stats[i][0].shots.insidebox){
                                    this.live_segment_stats2.stats_46_60.home.in = stats[i][0].shots.insidebox
                                    this.live_segment_stats2.stats_46_60.away.in = stats[i][1].shots.insidebox
                                }
                                if(stats[i][0].shots.outsidebox){
                                    this.live_segment_stats2.stats_46_60.home.out = stats[i][0].shots.outsidebox
                                    this.live_segment_stats2.stats_46_60.away.out = stats[i][1].shots.outsidebox
                                }
                            }
                            this.live_segment_stats2.stats_46_60.home.cnr = stats[i][0].corners
                            this.live_segment_stats2.stats_46_60.away.cnr = stats[i][1].corners
                            if(stats[i][0].attacks){
                                this.live_segment_stats2.stats_46_60.home.da = stats[i][0].attacks.dangerous_attacks
                                this.live_segment_stats2.stats_46_60.away.da = stats[i][1].attacks.dangerous_attacks
                            }
                            this.live_segment_stats2.stats_46_60.home.pos = stats[i][0].possessiontime
                            this.live_segment_stats2.stats_46_60.away.pos = stats[i][1].possessiontime
                            if(stats[i][0].redcards){
                                this.live_segment_stats2.stats_46_60.home.red = stats[i][0].redcards
                                this.live_segment_stats2.stats_46_60.away.red = stats[i][1].redcards
                            }
                            if(stats[i][0].yellowcards){
                                this.live_segment_stats2.stats_46_60.home.yel = stats[i][0].yellowcards
                                this.live_segment_stats2.stats_46_60.away.yel = stats[i][1].yellowcards
                            }
                        }
                        if(times[i].minute >= 61 && times[i].minute <= 75){
                            this.live_segment_stats2.stats_61_75.home.goal = stats[i][0].goals
                            this.live_segment_stats2.stats_61_75.away.goal = stats[i][1].goals
                            if(stats[i][0].shots){
                                this.live_segment_stats2.stats_61_75.home.on = stats[i][0].shots.ongoal
                                this.live_segment_stats2.stats_61_75.away.on = stats[i][1].shots.ongoal
                                this.live_segment_stats2.stats_61_75.home.off = stats[i][0].shots.offgoal
                                this.live_segment_stats2.stats_61_75.away.off = stats[i][1].shots.offgoal
                                if(stats[i][0].shots.blocked){
                                    this.live_segment_stats2.stats_61_75.home.blk = stats[i][0].shots.blocked
                                    this.live_segment_stats2.stats_61_75.away.blk = stats[i][1].shots.blocked
                                }
                                if(stats[i][0].shots.insidebox){
                                    this.live_segment_stats2.stats_61_75.home.in = stats[i][0].shots.insidebox
                                    this.live_segment_stats2.stats_61_75.away.in = stats[i][1].shots.insidebox
                                }
                                if(stats[i][0].shots.outsidebox){
                                    this.live_segment_stats2.stats_61_75.home.out = stats[i][0].shots.outsidebox
                                    this.live_segment_stats2.stats_61_75.away.out = stats[i][1].shots.outsidebox
                                }
                            }
                            this.live_segment_stats2.stats_61_75.home.cnr = stats[i][0].corners
                            this.live_segment_stats2.stats_61_75.away.cnr = stats[i][1].corners
                            if(stats[i][0].attacks){
                                this.live_segment_stats2.stats_61_75.home.da = stats[i][0].attacks.dangerous_attacks
                                this.live_segment_stats2.stats_61_75.away.da = stats[i][1].attacks.dangerous_attacks
                            }
                            this.live_segment_stats2.stats_61_75.home.pos = stats[i][0].possessiontime
                            this.live_segment_stats2.stats_61_75.away.pos = stats[i][1].possessiontime
                            if(stats[i][0].redcards){
                                this.live_segment_stats2.stats_61_75.home.red = stats[i][0].redcards
                                this.live_segment_stats2.stats_61_75.away.red = stats[i][1].redcards
                            }
                            if(stats[i][0].yellowcards){
                                this.live_segment_stats2.stats_61_75.home.yel = stats[i][0].yellowcards
                                this.live_segment_stats2.stats_61_75.away.yel = stats[i][1].yellowcards
                            }
                        }
                        if(times[i].minute >= 76){
                            this.live_segment_stats2.stats_76_90.home.goal = stats[i][0].goals
                            this.live_segment_stats2.stats_76_90.away.goal = stats[i][1].goals
                            if(stats[i][0].shots){
                                this.live_segment_stats2.stats_76_90.home.on = stats[i][0].shots.ongoal
                                this.live_segment_stats2.stats_76_90.away.on = stats[i][1].shots.ongoal
                                this.live_segment_stats2.stats_76_90.home.off = stats[i][0].shots.offgoal
                                this.live_segment_stats2.stats_76_90.away.off = stats[i][1].shots.offgoal
                                if(stats[i][0].shots.blocked){
                                    this.live_segment_stats2.stats_76_90.home.blk = stats[i][0].shots.blocked
                                    this.live_segment_stats2.stats_76_90.away.blk = stats[i][1].shots.blocked
                                }
                                if(stats[i][0].shots.insidebox){
                                    this.live_segment_stats2.stats_76_90.home.in = stats[i][0].shots.insidebox
                                    this.live_segment_stats2.stats_76_90.away.in = stats[i][1].shots.insidebox
                                }
                                if(stats[i][0].shots.outsidebox){
                                    this.live_segment_stats2.stats_76_90.home.out = stats[i][0].shots.outsidebox
                                    this.live_segment_stats2.stats_76_90.away.out = stats[i][1].shots.outsidebox
                                }
                            }
                            this.live_segment_stats2.stats_76_90.home.cnr = stats[i][0].corners
                            this.live_segment_stats2.stats_76_90.away.cnr = stats[i][1].corners
                            if(stats[i][0].attacks){
                                this.live_segment_stats2.stats_76_90.home.da = stats[i][0].attacks.dangerous_attacks
                                this.live_segment_stats2.stats_76_90.away.da = stats[i][1].attacks.dangerous_attacks
                            }
                            this.live_segment_stats2.stats_76_90.home.pos = stats[i][0].possessiontime
                            this.live_segment_stats2.stats_76_90.away.pos = stats[i][1].possessiontime
                            if(stats[i][0].redcards){
                                this.live_segment_stats2.stats_76_90.home.red = stats[i][0].redcards
                                this.live_segment_stats2.stats_76_90.away.red = stats[i][1].redcards
                            }
                            if(stats[i][0].yellowcards){
                                this.live_segment_stats2.stats_76_90.home.yel = stats[i][0].yellowcards
                                this.live_segment_stats2.stats_76_90.away.yel = stats[i][1].yellowcards
                            }
                        }
                    }
                }
                //-------------------------------------------------------------------------------------

                this.total_home_stats.time = 'FT'
                let statsLength = val.stats.length
                let cStats = val.stats[statsLength - 1]
                let cScore = val.scores[statsLength - 1]
                let cSeasonStats = val.season_stats
                this.total_home_stats.score = cScore.localteam_score
                this.total_away_stats.score = cScore.visitorteam_score
                if(val.competitions.length > 0){
                    this.total_home_stats.competition = val.competitions[0].name
                }
                if(home_id === cStats[0].team_id && away_id === cStats[1].team_id){
                    if(cStats[0].shots){
                        this.total_home_stats.on = cStats[0].shots.ongoal
                        this.total_away_stats.on = cStats[1].shots.ongoal
                        this.total_home_stats.off = cStats[0].shots.offgoal
                        this.total_away_stats.off = cStats[1].shots.offgoal
                        this.total_home_stats.blk = cStats[0].shots.blocked
                        this.total_away_stats.blk = cStats[1].shots.blocked
                        this.total_home_stats.in = cStats[0].shots.insidebox
                        this.total_away_stats.in = cStats[1].shots.insidebox
                        this.total_home_stats.out = cStats[0].shots.outsidebox
                        this.total_away_stats.out = cStats[1].shots.outsidebox
                    }
                    if(cStats[0].corners){
                        this.total_home_stats.cnr = cStats[0].corners
                        this.total_away_stats.cnr = cStats[1].corners
                    }
                    if(cStats[0].attacks){
                        this.total_home_stats.da = cStats[0].attacks.dangerous_attacks
                        this.total_away_stats.da = cStats[1].attacks.dangerous_attacks
                    }
                    if(cStats[0].possessiontime){
                        this.total_home_stats.pos = cStats[0].possessiontime
                        this.total_away_stats.pos = cStats[1].possessiontime
                    }
                    if(cStats[0].redcards){
                        this.total_home_stats.red = cStats[0].redcards
                        this.total_away_stats.red = cStats[1].redcards
                    }
                    if(cStats[0].yellowcards){
                        this.total_home_stats.yel = cStats[0].yellowcards
                        this.total_away_stats.yel = cStats[1].yellowcards
                    }
                }
                else if(home_id === cStats[1].team_id && away_id === cStats[0].team_id){
                    if(cStats[0].shots){
                        this.total_home_stats.on = cStats[1].shots.ongoal
                        this.total_away_stats.on = cStats[0].shots.ongoal
                        this.total_home_stats.off = cStats[1].shots.offgoal
                        this.total_away_stats.off = cStats[0].shots.offgoal
                        this.total_home_stats.blk = cStats[1].shots.blocked
                        this.total_away_stats.blk = cStats[0].shots.blocked
                        this.total_home_stats.in = cStats[1].shots.insidebox
                        this.total_away_stats.in = cStats[0].shots.insidebox
                        this.total_home_stats.out = cStats[1].shots.outsidebox
                        this.total_away_stats.out = cStats[0].shots.outsidebox
                    }
                    if(cStats[0].corners){
                        this.total_home_stats.cnr = cStats[1].corners
                        this.total_away_stats.cnr = cStats[0].corners
                    }
                    if(cStats[0].attacks){
                        this.total_home_stats.da = cStats[1].attacks.dangerous_attacks
                        this.total_away_stats.da = cStats[0].attacks.dangerous_attacks
                    }
                    if(cStats[0].possessiontime){
                        this.total_home_stats.pos = cStats[1].possessiontime
                        this.total_away_stats.pos = cStats[0].possessiontime
                    }
                    if(cStats[0].redcards){
                        this.total_home_stats.red = cStats[1].redcards
                        this.total_away_stats.red = cStats[0].redcards
                    }
                    if(cStats[0].yellowcards){
                        this.total_home_stats.yel = cStats[1].yellowcards
                        this.total_away_stats.yel = cStats[0].yellowcards
                    }
                }
                this.avg_home_stats = {
                    'p': 0,
                    'goal': 0,
                    'on': 0,
                    'off': 0,
                    'blk': 0,
                    'in': 0,
                    'out': 0,
                    'cnr': 0,
                    'da': 0,
                    'pos': 0,
                    'red': 0,
                    'yel': 0
                }
                this.avg_away_stats = {
                    'p': 0,
                    'goal': 0,
                    'on': 0,
                    'off': 0,
                    'blk': 0,
                    'in': 0,
                    'out': 0,
                    'cnr': 0,
                    'da': 0,
                    'pos': 0,
                    'red': 0,
                    'yel': 0
                }
                if(cSeasonStats.length > 0){
                    for(let i = 0; i < cSeasonStats.length ; i++){
                        if(cSeasonStats[i].stats){
                            if(cSeasonStats[i].stats.length > 0){
                                for(let j = 0; j < cSeasonStats[i].stats.length; j++){
                                    if(cSeasonStats[i].events[j]){
                                        if(cSeasonStats[i].events[j].date < time){
                                            if(cSeasonStats[i].stats[j]){
                                                if(cSeasonStats[i].stats[j].stats[0].team_id === home_id){
                                                    this.avg_home_stats.p++
                                                    if(cSeasonStats[i].stats[j].stats[0].shots){
                                                        if(cSeasonStats[i].stats[j].stats[0].shots.ongoal){
                                                            this.avg_home_stats.on = this.avg_home_stats.on + cSeasonStats[i].stats[j].stats[0].shots.ongoal
                                                        }
                                                        if(cSeasonStats[i].stats[j].stats[0].shots.offgoal){
                                                            this.avg_home_stats.off = this.avg_home_stats.off + cSeasonStats[i].stats[j].stats[0].shots.offgoal
                                                        }
                                                        if(cSeasonStats[i].stats[j].stats[0].shots.blocked){
                                                            this.avg_home_stats.blk = this.avg_home_stats.blk + cSeasonStats[i].stats[j].stats[0].shots.blocked
                                                        }
                                                        if(cSeasonStats[i].stats[j].stats[0].shots.insidebox){
                                                            this.avg_home_stats.in = this.avg_home_stats.in + cSeasonStats[i].stats[j].stats[0].shots.insidebox
                                                        }
                                                        if(cSeasonStats[i].stats[j].stats[0].shots.outsidebox){
                                                            this.avg_home_stats.out = this.avg_home_stats.out + cSeasonStats[i].stats[j].stats[0].shots.outsidebox
                                                        }
                                                    }
                                                    if(cSeasonStats[i].stats[j].stats[0].corners){
                                                        this.avg_home_stats.cnr = this.avg_home_stats.cnr + cSeasonStats[i].stats[j].stats[0].corners
                                                    }
                                                    if(cSeasonStats[i].stats[j].stats[0].goals){
                                                        this.avg_home_stats.goal = this.avg_home_stats.goal + cSeasonStats[i].stats[j].stats[0].goals
                                                    }
                                                    if(cSeasonStats[i].stats[j].stats[0].attacks){
                                                        if(cSeasonStats[i].stats[j].stats[0].attacks.dangerous_attacks){
                                                            this.avg_home_stats.da = this.avg_home_stats.da + cSeasonStats[i].stats[j].stats[0].attacks.dangerous_attacks
                                                        }
                                                    }
                                                    if(cSeasonStats[i].stats[j].stats[0].possessiontime){
                                                        this.avg_home_stats.pos = this.avg_home_stats.pos + cSeasonStats[i].stats[j].stats[0].possessiontime
                                                    }
                                                    if(cSeasonStats[i].stats[j].stats[0].redcards){
                                                        this.avg_home_stats.red = this.avg_home_stats.red + cSeasonStats[i].stats[j].stats[0].redcards
                                                    }
                                                    if(cSeasonStats[i].stats[j].stats[0].yellowcards){
                                                        this.avg_home_stats.yel = this.avg_home_stats.yel + cSeasonStats[i].stats[j].stats[0].yellowcards
                                                    }
                                                }
                                                if(cSeasonStats[i].stats[j].stats[1].team_id === away_id){
                                                    this.avg_away_stats.p++
                                                    if(cSeasonStats[i].stats[j].stats[1].shots){
                                                        if(cSeasonStats[i].stats[j].stats[1].shots.ongoal){
                                                            this.avg_away_stats.on = this.avg_away_stats.on + cSeasonStats[i].stats[j].stats[1].shots.ongoal
                                                        }
                                                        if(cSeasonStats[i].stats[j].stats[1].shots.offgoal){
                                                            this.avg_away_stats.off = this.avg_away_stats.off + cSeasonStats[i].stats[j].stats[1].shots.offgoal
                                                        }
                                                        if(cSeasonStats[i].stats[j].stats[1].shots.blocked){
                                                            this.avg_away_stats.blk = this.avg_away_stats.blk + cSeasonStats[i].stats[j].stats[1].shots.blocked
                                                        }
                                                        if(cSeasonStats[i].stats[j].stats[1].shots.insidebox){
                                                            this.avg_away_stats.in = this.avg_away_stats.in + cSeasonStats[i].stats[j].stats[1].shots.insidebox
                                                        }
                                                        if(cSeasonStats[i].stats[j].stats[1].shots.outsidebox){
                                                            this.avg_away_stats.out = this.avg_away_stats.out + cSeasonStats[i].stats[j].stats[1].shots.outsidebox
                                                        }
                                                    }
                                                    if(cSeasonStats[i].stats[j].stats[1].corners){
                                                        this.avg_away_stats.cnr = this.avg_away_stats.cnr + cSeasonStats[i].stats[j].stats[1].corners
                                                    }
                                                    if(cSeasonStats[i].stats[j].stats[1].goals){
                                                        this.avg_away_stats.goal = this.avg_away_stats.goal + cSeasonStats[i].stats[j].stats[1].goals
                                                    }
                                                    if(cSeasonStats[i].stats[j].stats[1].attacks){
                                                        if(cSeasonStats[i].stats[j].stats[1].attacks.dangerous_attacks){
                                                            this.avg_away_stats.da = this.avg_away_stats.da + cSeasonStats[i].stats[j].stats[1].attacks.dangerous_attacks
                                                        }
                                                    }
                                                    if(cSeasonStats[i].stats[j].stats[1].possessiontime){
                                                        this.avg_away_stats.pos = this.avg_away_stats.pos + cSeasonStats[i].stats[j].stats[1].possessiontime
                                                    }
                                                    if(cSeasonStats[i].stats[j].stats[1].redcards){
                                                        this.avg_away_stats.red = this.avg_away_stats.red + cSeasonStats[i].stats[j].stats[1].redcards
                                                    }
                                                    if(cSeasonStats[i].stats[j].stats[1].yellowcards){
                                                        this.avg_away_stats.yel = this.avg_away_stats.yel + cSeasonStats[i].stats[j].stats[1].yellowcards
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if(this.avg_home_stats.goal != 0){
                    this.delta_home_stats.score = (this.total_home_stats.score * 100 / this.avg_home_stats.goal *this.avg_home_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_home_stats.score = 0
                }

                if(this.avg_away_stats.goal != 0){
                    this.delta_away_stats.score = (this.total_away_stats.score * 100 / this.avg_away_stats.goal * this.avg_away_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_away_stats.score = 0
                }

                if(this.avg_home_stats.on != 0){
                    this.delta_home_stats.on = (this.total_home_stats.on * 100 / this.avg_home_stats.on * this.avg_home_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_home_stats.on = 0
                }

                if(this.avg_away_stats.on != 0){
                    this.delta_away_stats.on = (this.total_away_stats.on * 100 / this.avg_away_stats.on * this.avg_away_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_away_stats.on = 0
                }

                if(this.avg_home_stats.off != 0){
                    this.delta_home_stats.off = (this.total_home_stats.off * 100 / this.avg_home_stats.off * this.avg_home_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_home_stats.off = 0
                }

                if(this.avg_away_stats.off != 0){
                    this.delta_away_stats.off = (this.total_away_stats.off * 100 / this.avg_away_stats.off * this.avg_away_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_away_stats.off = 0
                }

                if(this.avg_home_stats.blk != 0){
                    this.delta_home_stats.blk = (this.total_home_stats.blk * 100 / this.avg_home_stats.blk * this.avg_home_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_home_stats.blk = 0
                }

                if(this.avg_away_stats.blk != 0){
                    this.delta_away_stats.blk = (this.total_away_stats.blk * 100 / this.avg_away_stats.blk * this.avg_away_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_away_stats.blk = 0
                }

                if(this.avg_home_stats.in != 0){
                    this.delta_home_stats.in = (this.total_home_stats.in * 100 / this.avg_home_stats.in * this.avg_home_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_home_stats.in = 0
                }

                if(this.avg_away_stats.in != 0){
                    this.delta_away_stats.in = (this.total_away_stats.in * 100 / this.avg_away_stats.in * this.avg_away_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_away_stats.in = 0
                }

                if(this.avg_home_stats.out != 0){
                    this.delta_home_stats.out = (this.total_home_stats.out * 100 / this.avg_home_stats.out * this.avg_home_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_home_stats.out = 0
                }

                if(this.avg_away_stats.out != 0){
                    this.delta_away_stats.out = (this.total_away_stats.out * 100 / this.avg_away_stats.out * this.avg_away_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_away_stats.out = 0
                }

                if(this.avg_home_stats.cnr != 0){
                    this.delta_home_stats.cnr = (this.total_home_stats.cnr * 100 / this.avg_home_stats.cnr * this.avg_home_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_home_stats.cnr = 0
                }

                if(this.avg_away_stats.cnr != 0){
                    this.delta_away_stats.cnr = (this.total_away_stats.cnr * 100 / this.avg_away_stats.cnr * this.avg_away_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_away_stats.cnr = 0
                }

                if(this.avg_home_stats.da != 0){
                    this.delta_home_stats.da = (this.total_home_stats.da * 100 / this.avg_home_stats.da * this.avg_home_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_home_stats.da = 0
                }

                if(this.avg_away_stats.da != 0){
                    this.delta_away_stats.da = (this.total_away_stats.da * 100 / this.avg_away_stats.da * this.avg_away_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_away_stats.da = 0
                }

                if(this.avg_home_stats.pos != 0){
                    this.delta_home_stats.pos = (this.total_home_stats.pos * 100 / this.avg_home_stats.pos * this.avg_home_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_home_stats.pos = 0
                }

                if(this.avg_away_stats.pos != 0){
                    this.delta_away_stats.pos = (this.total_away_stats.pos * 100 / this.avg_away_stats.pos * this.avg_away_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_away_stats.pos = 0
                }

                if(this.avg_home_stats.red != 0 && this.total_home_stats.red != '-'){
                    this.delta_home_stats.red = (this.total_home_stats.red * 100 / this.avg_home_stats.red * this.avg_home_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_home_stats.red = 0
                }

                if(this.avg_away_stats.red != 0 && this.total_away_stats.red != '-'){
                    this.delta_away_stats.red = (this.total_away_stats.red * 100 / this.avg_away_stats.red*this.avg_away_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_away_stats.red = 0
                }

                if(this.avg_home_stats.yel != 0){
                    this.delta_home_stats.yel = (this.total_home_stats.yel * 100 / this.avg_home_stats.yel*this.avg_home_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_home_stats.yel = 0
                }

                if(this.avg_away_stats.yel != 0){
                    this.delta_away_stats.yel = (this.total_away_stats.yel * 100 / this.avg_away_stats.yel*this.avg_away_stats.p - 100).toFixed(0)
                }
                else{
                    this.delta_away_stats.yel = 0
                }
            },

            h_rank_from(val){
                this.homeTeam.rank.from = parseInt(val)
                console.log('homeTeam From====>', val)
                
            },
            a_rank_from(val){
                this.awayTeam.rank.from = parseInt(val)
                
            },
            h_rank_to(val){
                this.homeTeam.rank.to = parseInt(val)
                
            },
            a_rank_to(val){
                this.awayTeam.rank.to = parseInt(val)
                
            },
            h_on_from(val){
                this.homeTeam.on.from = parseInt(val)
                console.log('homeTeam From====>', val)
                
            },
            a_on_from(val){
                this.awayTeam.on.from = parseInt(val)
                
            },
            h_on_to(val){
                this.homeTeam.on.to = parseInt(val)
                
            },
            a_on_to(val){
                this.awayTeam.on.to = parseInt(val)
                
            },
            h_off_from(val){
                this.homeTeam.off.from = parseInt(val)
                
            },
            a_off_from(val){
                this.awayTeam.off.from = parseInt(val)
                
            },
            h_off_to(val){
                this.homeTeam.off.to = parseInt(val)
                
            },
            a_off_to(val){
                this.awayTeam.off.to = parseInt(val)
                
            },
            h_blk_from(val){
                this.homeTeam.blk.from = parseInt(val)
                
            },
            a_blk_from(val){
                this.awayTeam.blk.from = parseInt(val)
                
            },
            h_blk_to(val){
                this.homeTeam.blk.to = parseInt(val)
                
            },
            a_blk_to(val){
                this.awayTeam.blk.to = parseInt(val)
                
            },
            h_in_from(val){
                this.homeTeam.in.from = parseInt(val)
                
            },
            a_in_from(val){
                this.awayTeam.in.from = parseInt(val)
                
            },
            h_in_to(val){
                this.homeTeam.in.to = parseInt(val)
                
            },
            a_in_to(val){
                this.awayTeam.in.to = parseInt(val)
                
            },
            h_out_from(val){
                this.homeTeam.out.from = parseInt(val)
                
            },
            a_out_from(val){
                this.awayTeam.out.from = parseInt(val)
                
            },
            h_out_to(val){
                this.homeTeam.out.to = parseInt(val)
                
            },
            a_out_to(val){
                this.awayTeam.out.to = parseInt(val)
                
            },
            h_cnr_from(val){
                this.homeTeam.cnr.from = parseInt(val)
                
            },
            a_cnr_from(val){
                this.awayTeam.cnr.from = parseInt(val)
                
            },
            h_cnr_to(val){
                this.homeTeam.cnr.to = parseInt(val)
                
            },
            a_cnr_to(val){
                this.awayTeam.cnr.to = parseInt(val)
                
            },
            h_da_from(val){
                this.homeTeam.da.from = parseInt(val)
                
            },
            a_da_from(val){
                this.awayTeam.da.from = parseInt(val)
                
            },
            h_da_to(val){
                this.homeTeam.da.to = parseInt(val)
                
            },
            a_da_to(val){
                this.awayTeam.da.to = parseInt(val)
                
            },
            h_pos_from(val){
                this.homeTeam.pos.from = parseInt(val)
                
            },
            a_pos_from(val){
                this.awayTeam.pos.from = parseInt(val)
                
            },
            h_pos_to(val){
                this.homeTeam.pos.to = parseInt(val)
                
            },
            a_pos_to(val){
                this.awayTeam.pos.to = parseInt(val)
                
            },
            h_red_from(val){
                this.homeTeam.red.from = parseInt(val)
                
            },
            a_red_from(val){
                this.awayTeam.red.from = parseInt(val)
                
            },
            h_red_to(val){
                this.homeTeam.red.to = parseInt(val)
                
            },
            a_red_to(val){
                this.awayTeam.red.to = parseInt(val)
                
            },
            h_yel_from(val){
                this.homeTeam.yel.from = parseInt(val)
                
            },
            a_yel_from(val){
                this.awayTeam.yel.from = parseInt(val)
                
            },
            h_yel_to(val){
                this.homeTeam.yel.to = parseInt(val)
                
            },
            a_yel_to(val){
                this.awayTeam.yel.to = parseInt(val)
                
            },
            h_goal_from(val){
                this.homeTeam.goal.from = parseInt(val)
                
            },
            a_goal_from(val){
                this.awayTeam.goal.from = parseInt(val)
                
            },
            h_goal_to(val){
                this.homeTeam.goal.to = parseInt(val)
                
            },
            a_goal_to(val){
                this.awayTeam.goal.to = parseInt(val)
                
            },
            getLiveData(){
                
                if(this.selected_league && this.selected_season){
                    console.log('score filter', this.score_minute_filter);
                    var post_data = {
                        'selected_league': this.selected_league,
                        'selected_season': this.selected_season,

                        'home_pre_odd_min': this.home_pre_odd_min,
                        'home_pre_odd_max': this.home_pre_odd_max,
                        'away_pre_odd_min': this.away_pre_odd_min,
                        'away_pre_odd_max': this.away_pre_odd_max,
                        'draw_pre_odd_min': this.draw_pre_odd_min,
                        'draw_pre_odd_max': this.draw_pre_odd_max,

                        'score_minute_filter': this.score_minute_filter,

                        'result_at_15': this.result_at_15,
                        'result_at_30': this.result_at_30,
                        'result_at_ht': this.result_at_ht,
                        'result_at_60': this.result_at_60,
                        'result_at_75': this.result_at_75,
                        'result_at_ft': this.result_at_ft,

                        'homeTeam': this.homeTeam,
                        'awayTeam': this.awayTeam 
                    }
                    this.showModal()
                    window.axios.post(`${process.env.VUE_APP_URL}getlivestatsData1`, post_data).then(({data})=> {
                        console.log('---==== data ===----', data)
                        this.event_id_list = data.data['event id list']
                        var events_found = data.data['event id list'].length;
                        this.events_found = events_found
                        if (events_found.length == 0)
                            return

                        let self = this

                        var ft_markets = data.data['First Half Markets'];
                        Object.keys(ft_markets).forEach(function(key) {
                            console.log('Key : ' + key + ', Value : ' + ft_markets[key])
                            var prob = 0;
                            var odds = 0;
                            var events = [];
                            if ( ft_markets[key].length != 0) {

                                prob = ( (ft_markets[key].length / events_found) * 100 ).toFixed(2);
                                odds = (100 / prob).toFixed(2)
                                events = ft_markets[key]
                            }

                            self.first_half_markets[key].size = ft_markets[key].length
                            self.first_half_markets[key].prob = prob
                            self.first_half_markets[key].odds = odds
                            self.first_half_markets[key].events = events
                        })

                        var ht_score = data.data['Half Time Score'];
                        Object.keys(ht_score).forEach(function(key) {
                            
                            var prob = 0;
                            var odds = 0;
                            var events = [];
                            if ( ht_score[key].length != 0) {

                                prob = ( (ht_score[key].length / events_found) * 100 ).toFixed(2);
                                odds = (100 / prob).toFixed(2)
                                events = ht_score[key]
                            }

                            self.half_time_score[key].size = ht_score[key].length
                            self.half_time_score[key].prob = prob
                            self.half_time_score[key].odds = odds
                            self.half_time_score[key].events = events
                        })

                        var second_half = data.data['2nd Half Only'];
                        Object.keys(second_half).forEach(function(key) {
                            
                            var prob = 0;
                            var odds = 0;
                            var events = [];
                            if ( second_half[key].length != 0) {

                                prob = ( (second_half[key].length / events_found) * 100 ).toFixed(2);
                                odds = (100 / prob).toFixed(2)
                                events = second_half[key]
                            }

                            self.second_half_only[key].size = second_half[key].length
                            self.second_half_only[key].prob = prob
                            self.second_half_only[key].odds = odds
                            self.second_half_only[key].events = events
                        })

                        var ft_main_markets = data.data['Full Time Main Markets'];
                        Object.keys(ft_main_markets).forEach(function(key) {
                            
                            var prob = 0;
                            var odds = 0;
                            var events = [];
                            if ( ft_main_markets[key].length != 0) {

                                prob = ( (ft_main_markets[key].length / events_found) * 100 ).toFixed(2);
                                odds = (100 / prob).toFixed(2)
                                events = ft_main_markets[key]
                            }

                            self.fulltime_main_markets[key].size = ft_main_markets[key].length
                            self.fulltime_main_markets[key].prob = prob
                            self.fulltime_main_markets[key].odds = odds
                            self.fulltime_main_markets[key].events = events
                        })

                        var corr_score = data.data['Correct Score'];
                        Object.keys(corr_score).forEach(function(key) {
                            
                            var prob = 0;
                            var odds = 0;
                            var events = [];
                            if ( corr_score[key].length != 0) {

                                prob = ( (corr_score[key].length / events_found) * 100 ).toFixed(2);
                                odds = (100 / prob).toFixed(2)
                                events = corr_score[key]
                            }

                            self.correct_score[key].size = corr_score[key].length
                            self.correct_score[key].prob = prob
                            self.correct_score[key].odds = odds
                            self.correct_score[key].events = events
                        })

                        this.hideModal()





                    })

                }
                else{
                    return
                }
            },
            getLeagueList(){
                window.axios.post(`${process.env.VUE_APP_URL}getleaguelist1`).then(({data})=> {
                    console.log('liveStatsData==>', data.data[0])
                    let datalist = data.data[0]
                    let self = this
                    for(let i = 0 ; i < datalist.length ; i++){
                        self.leagues.push({'league': datalist[i].league_name, 'value': datalist[i].league_id, 'label': datalist[i].country_name + ' ' + datalist[i].league_name})
                    }
                    // this.sortJSON(self.leagues,'league', '123');
                    console.log(this.leagues)
                })
            },
            set_league(val){
                console.log('value===>', val)
                if (val == 0) {
                    this.selected_league = null
                    this.league_name = ''
                }
                else {
                    this.selected_league = val
                    for ( var i=0; i< this.leagues.length; i++){
                        if (this.leagues[i].value == val) {
                            this.league_name = this.leagues[i].league
                            break
                        }
                    }

                }
            },
            set_season(val) {
                if (val == 0)
                    this.selected_season = null
                else
                    this.selected_season = val
            },
            sortJSON(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            },
            set_home_pre_odd_min(val) {
                this.home_pre_odd_min = parseFloat(val);
                console.log(this.home_pre_odd_min)
            },
            set_home_pre_odd_max(val) {
                this.home_pre_odd_max = parseFloat(val);
                
            },
            set_away_pre_odd_min(val) {
                this.away_pre_odd_min = parseFloat(val);
                
            },
            set_away_pre_odd_max(val) {
                this.away_pre_odd_max = parseFloat(val);
                
            },
            set_draw_pre_odd_min(val) {
                this.draw_pre_odd_min = parseFloat(val);
                
            },
            set_draw_pre_odd_max(val) {
                this.draw_pre_odd_max = parseFloat(val);
                
            },

            
        },
        created() {
            this.getLeagueList()
            // this.getDateList()
        },
        mounted() {

        },
        beforeDestroy() {

        }
    }
</script>
<style>
    .live-stats-container .minOdd2 input{
        padding-left: 3px!important;
        width: 44px;
    }
    .live-stats-container{
        min-width: 1340px;
    }
    .live-stats-container input{
        border-radius: 0;
        height: 25px;
    }
    .live-stats-container .stats-filter-content input{
        padding-left: 5px;
        padding-right: 0px;
    }
    .stats-cell{
        height: 35px;
        border: 1px solid white;
        border-top: none;
        border-right: none;
    }
    .from_date{
        display: flex;
        width: 60%;
    }
    .live-stats-container .event-list{
        width: calc(100% - 20px);
        background: none;
        padding: 0;
    }
    .live-stats-container .league-list{
        width: 100%;
        background: none;
        padding: 0;
    }
    .live-stats-container .stats-header{
        height: 40px;
        width: 100%;
        border: none;
        background: #b1a0c7;
        display: flex;
    }
    .live-stats-container .stats-content{
        height: 60px;
        width: 100%;
        border: none;
        background: none;
        display: flex;
        border-right: 1px solid lightgrey;
        border-left: 1px solid lightgrey;
    }
    td, th {
        border: 1px solid white;
        text-align: left;
        padding: 8px;
        text-align: center !important;
    }
    body {
        overflow-x: auto !important;
    }

</style>
<style scoped>
    
</style>
