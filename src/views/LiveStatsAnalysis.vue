<template>
    <div class="live-stats-container">
        <CRow>
            <CCol lg="6" style="height: 180px; background: white; padding: 20px 30px;">
                <label style="color: red; font-weight: bold;">Date:</label>
                <div class="from_date" style="height: 40px; width: 100%;">
                    <div style="flex: 1; padding-top: 1px; padding-right: 10px;">From:</div>
                    <div style="flex: 4; padding-right: 35px;">
                        <!--                        <CInput type="text"  :value="this.from_date" @update:value="from_date_f" class="odd-filter-inputbox" placeholder="2000-01-01"></CInput>-->
                        <CSelect
                                class="fromdate"
                                :options="dateList1"
                                @update:value="from_date_f"
                        >
                        </CSelect>
                    </div>
                    <div style="flex: 1; padding-top: 1px; padding-right: 10px;">End:</div>
                    <div style="flex: 4; padding-right: 35px;">
                        <!--                        <CInput type="text"  :value="this.end_date" @update:value="end_date_f" class="odd-filter-inputbox" placeholder="2000-01-01"></CInput>-->
                        <CSelect
                                class="fromdate"
                                :options="dateList2"
                                @update:value="end_date_f"
                        >
                        </CSelect>
                    </div>
                    <div style="width: 40%; float: left;">
                        <CButton color="success" @click="getLiveData" class="G-L-button">
                            Get Data
                        </CButton>
                    </div>
                </div>

                <div class="from_date" style="padding-right: 35px;">
                    <label style="flex: 1; color: red; font-weight: bold;">League:</label>
                    <div style="flex: 4;">
                        <CSelect
                                class="league-list"
                                :options="leagues"
                                @update:value="set_league"
                        >
                        </CSelect>
                    </div>
                </div>

                <div class="from_date" style="padding-right: 35px;">
                    <label style="flex: 2; color: red; font-weight: bold;">Minute:</label>
                    <div style="flex: 2; text-align: right; padding-top: 1px; padding-right: 10px;">From:</div>
                    <div style="flex: 3;">
                        <CInput type="text"  :value="this.min_minute" @update:value="min_minute_f" class="odd-filter-inputbox"></CInput>
                    </div>
                    <div style="flex: 2; text-align: right; padding-top: 1px; padding-right: 10px;">End:</div>
                    <div style="flex: 3;">
                        <CInput type="text"  :value="this.max_minute" @update:value="max_minute_f" class="odd-filter-inputbox"></CInput>
                    </div>
                </div>
            </CCol>
            <CCol lg="6" style="height: 180px; background: white; padding: 20px 30px;">
                <div style="width: 40%; float: left">
                    <label style="color: red; font-weight: bold;">Events List</label>
                    <CSelect
                            class="event-list"
                            :options="eventList"
                            @update:value="set_event"
                    >
                    </CSelect>
                </div>
                <div style="width: 30%; float: left; padding-top: 20px;">
                    <label style="color: red; font-weight: bold;">Total Matches Found: <strong style="color: blue; font-weight: bold; font-size: 14px!important">{{matches_found}}</strong></label><br>
                    <label style="color: red; font-weight: bold;">Total Filtered: <strong style="color: blue; font-weight: bold; font-size: 14px!important">{{filtered_result}}</strong></label>
                </div>
                <div style="width: 30%; float: left; padding-top: 20px;">
                    <label style="color: red; font-weight: bold;">Missed livestats Data: <strong style="color: blue; font-weight: bold; font-size: 14px!important">{{missed_matches_found}}</strong></label><br>
                    <label style="color: red; font-weight: bold;">Missed livestats data: <strong style="color: blue; font-weight: bold; font-size: 14px!important">{{missed_filtered_result}}</strong></label>
                </div>
            </CCol>
            <CCol lg="6" class="stats-filter-content" style="height: 800px; background: white; padding: 20px 30px;">
                <label style="color: red;">Score Filter</label>
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

                <div style="width: 100%;">
                    <label>Home Team:</label>
                </div>
                <div class="totalMatches" style="display: flex; font-weight: 600; font-size: 12px;">
                    <div style="flex: 1; text-align: center;">
                        <p class="header" style="color: #d1c4e1;">.</p>
                        <p class="value" style="padding: 3px;">Min</p>
                        <p class="percent" style="padding: 3px;">Max</p>
                    </div>
                    <div  style="flex: 1; text-align: center;">
                        <p class="header">minute</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="homeTeam.minute.from" @update:value="home_minute_from_filter" class="minOdd2"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="homeTeam.minute.to" @update:value="home_minute_to_filter" class="minOdd2"></CInput>
                        </p>
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
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Goal</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="homeTeam.goal.from" @update:value="h_goal_from" class="minOdd2"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="homeTeam.goal.to" @update:value="h_goal_to" class="minOdd2"></CInput>
                        </p>
                    </div>
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

                <div style="width: 100%;">
                    <label>Away Team:</label>
                </div>
                <div class="totalMatches" style="display: flex; font-weight: 600; font-size: 12px;">
                    <div style="flex: 1; text-align: center;">
                        <p class="header" style="color: #d1c4e1;">.</p>
                        <p class="value" style="padding: 3px;">Min</p>
                        <p class="percent" style="padding: 3px;">Max</p>
                    </div>
                    <div  style="flex: 1; text-align: center;">
                        <p class="header">minute</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="awayTeam.minute.from" @update:value="away_minute_from_filter" class="minOdd2"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="awayTeam.minute.to" @update:value="away_minute_to_filter" class="minOdd2"></CInput>
                        </p>
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
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Goal</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="awayTeam.goal.from" @update:value="a_goal_from" class="minOdd2"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="awayTeam.goal.to" @update:value="a_goal_to" class="minOdd2"></CInput>
                        </p>
                    </div>
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

                <div style="width: 100%; margin-top: 20px;">
                    <label style="color: red; font-weight: bold; margin-top: 20px;">Stats by Segment Time:</label>
                </div>
                <div class="totalMatches score_stats" style="display: flex; font-weight: 600; font-size: 12px;">
                    <div  style="flex: 1; text-align: center;">
                        <p class="header" style="color: #d1c4e1">Time</p>
                        <p class="value">0 - 15</p>
                        <p class="percent">16 - 30</p>
                        <p class="value">31 - 45</p>
                        <p class="percent">46 - 60</p>
                        <p class="value">61 - 75</p>
                        <p class="percent">76 - 90</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">0 - 0</p>
                        <p v-if="this.stats_segment.stats_0_15.score_over00 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_over00}} ({{(this.stats_segment.stats_0_15.score_over00/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_over00 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_over00}} ({{(this.stats_segment.stats_16_30.score_over00/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_over00 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_over00}} ({{(this.stats_segment.stats_31_45.score_over00/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_over00 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_over00}} ({{(this.stats_segment.stats_46_60.score_over00/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_over00 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_over00}} ({{(this.stats_segment.stats_61_75.score_over00/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_over00 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_over00}} ({{(this.stats_segment.stats_76_90.score_over00/this.filtered_result*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Over 1.5</p>
                        <p v-if="this.stats_segment.stats_0_15.score_over15 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_over15}} ({{(this.stats_segment.stats_0_15.score_over15/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_over15 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_over15}} ({{(this.stats_segment.stats_16_30.score_over15/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_over15 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_over15}} ({{(this.stats_segment.stats_31_45.score_over15/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_over15 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_over15}} ({{(this.stats_segment.stats_46_60.score_over15/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_over15 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_over15}} ({{(this.stats_segment.stats_61_75.score_over15/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_over15 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_over15}} ({{(this.stats_segment.stats_76_90.score_over15/this.filtered_result*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Over 2.5</p>
                        <p v-if="this.stats_segment.stats_0_15.score_over25 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_over25}} ({{(this.stats_segment.stats_0_15.score_over25/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_over25 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_over25}} ({{(this.stats_segment.stats_16_30.score_over25/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_over25 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_over25}} ({{(this.stats_segment.stats_31_45.score_over25/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_over25 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_over25}} ({{(this.stats_segment.stats_46_60.score_over25/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_over25 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_over25}} ({{(this.stats_segment.stats_61_75.score_over25/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_over25 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_over25}} ({{(this.stats_segment.stats_76_90.score_over25/this.filtered_result*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Over 3.5</p>
                        <p v-if="this.stats_segment.stats_0_15.score_over35 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_over35}} ({{(this.stats_segment.stats_0_15.score_over35/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_over35 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_over35}} ({{(this.stats_segment.stats_16_30.score_over35/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_over35 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_over35}} ({{(this.stats_segment.stats_31_45.score_over35/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_over35 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_over35}} ({{(this.stats_segment.stats_46_60.score_over35/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_over35 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_over35}} ({{(this.stats_segment.stats_61_75.score_over35/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_over35 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_over35}} ({{(this.stats_segment.stats_76_90.score_over35/this.filtered_result*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Over 4.5</p>
                        <p v-if="this.stats_segment.stats_0_15.score_over45 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_over45}} ({{(this.stats_segment.stats_0_15.score_over45/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_over45 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_over45}} ({{(this.stats_segment.stats_16_30.score_over45/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_over45 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_over45}} ({{(this.stats_segment.stats_31_45.score_over45/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_over45 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_over45}} ({{(this.stats_segment.stats_46_60.score_over45/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_over45 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_over45}} ({{(this.stats_segment.stats_61_75.score_over45/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_over45 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_over45}} ({{(this.stats_segment.stats_76_90.score_over45/this.filtered_result*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Home</p>
                        <p v-if="this.stats_segment.stats_0_15.score_home === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_home}} ({{(this.stats_segment.stats_0_15.score_home/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_home === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_home}} ({{(this.stats_segment.stats_16_30.score_home/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_home === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_home}} ({{(this.stats_segment.stats_31_45.score_home/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_home === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_home}} ({{(this.stats_segment.stats_46_60.score_home/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_home === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_home}} ({{(this.stats_segment.stats_61_75.score_home/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_home === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_home}} ({{(this.stats_segment.stats_76_90.score_home/this.filtered_result*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Draws</p>
                        <p v-if="this.stats_segment.stats_0_15.score_draw === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_draw}} ({{(this.stats_segment.stats_0_15.score_draw/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_draw === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_draw}} ({{(this.stats_segment.stats_16_30.score_draw/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_draw === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_draw}} ({{(this.stats_segment.stats_31_45.score_draw/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_draw === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_draw}} ({{(this.stats_segment.stats_46_60.score_draw/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_draw === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_draw}} ({{(this.stats_segment.stats_61_75.score_draw/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_draw === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_draw}} ({{(this.stats_segment.stats_76_90.score_draw/this.filtered_result*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Away</p>
                        <p v-if="this.stats_segment.stats_0_15.score_away === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_away}} ({{(this.stats_segment.stats_0_15.score_away/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_away === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_away}} ({{(this.stats_segment.stats_16_30.score_away/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_away === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_away}} ({{(this.stats_segment.stats_31_45.score_away/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_away === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_away}} ({{(this.stats_segment.stats_46_60.score_away/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_away === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_away}} ({{(this.stats_segment.stats_61_75.score_away/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_away === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_away}} ({{(this.stats_segment.stats_76_90.score_away/this.filtered_result*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">BTS</p>
                        <p v-if="this.stats_segment.stats_0_15.score_bts === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_bts}} ({{(this.stats_segment.stats_0_15.score_bts/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_bts === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_bts}} ({{(this.stats_segment.stats_16_30.score_bts/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_bts === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_bts}} ({{(this.stats_segment.stats_31_45.score_bts/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_bts === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_bts}} ({{(this.stats_segment.stats_46_60.score_bts/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_bts === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_bts}} ({{(this.stats_segment.stats_61_75.score_bts/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_bts === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_bts}} ({{(this.stats_segment.stats_76_90.score_bts/this.filtered_result*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Odd</p>
                        <p v-if="this.stats_segment.stats_0_15.score_odd === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_odd}} ({{(this.stats_segment.stats_0_15.score_odd/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_odd === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_odd}} ({{(this.stats_segment.stats_16_30.score_odd/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_odd === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_odd}} ({{(this.stats_segment.stats_31_45.score_odd/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_odd === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_odd}} ({{(this.stats_segment.stats_46_60.score_odd/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_odd === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_odd}} ({{(this.stats_segment.stats_61_75.score_odd/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_odd === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_odd}} ({{(this.stats_segment.stats_76_90.score_odd/this.filtered_result*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Even</p>
                        <p v-if="this.stats_segment.stats_0_15.score_even === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_even}} ({{(this.stats_segment.stats_0_15.score_even/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_even === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_even}} ({{(this.stats_segment.stats_16_30.score_even/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_even === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_even}} ({{(this.stats_segment.stats_31_45.score_even/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_even === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_even}} ({{(this.stats_segment.stats_46_60.score_even/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_even === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_even}} ({{(this.stats_segment.stats_61_75.score_even/this.filtered_result*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_even === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_even}} ({{(this.stats_segment.stats_76_90.score_even/this.filtered_result*100).toFixed(0)}}%)</p>
                    </div>
                </div>

            </CCol>
            <CCol lg="6" class="stats-filter-content" style="height: 800px; background: white; padding: 0px 30px;">
                <div style="width: 100%;">
                    <div style="width: 100%;">
                        <label style="color: red; font-weight: bold; margin-top: 20px;">Time Segmented Live Stats:</label>
                    </div>
                    <div class="totalMatches score_stats" style="display: flex; font-weight: 600; font-size: 12px;">
                        <div  style="flex: 1; text-align: center;">
                            <p class="header" style="color: #d1c4e1">Time</p>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                        </div>
                        <div  style="flex: 1; text-align: center;">
                            <p class="header">Time</p>
                            <div class="value stats-cell" style="padding-top: 8px;">0 - 15</div>
                            <div class="percent stats-cell" style="padding-top: 8px;">16 - 30</div>
                            <div class="value stats-cell" style="padding-top: 8px;">31 - 45+</div>
                            <div class="percent stats-cell" style="padding-top: 8px;">46 - 60</div>
                            <div class="value stats-cell" style="padding-top: 8px;">61 - 75</div>
                            <div class="percent stats-cell" style="padding-top: 8px;">76 - 90+</div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Goal</p>
                            <div class="value stats-cell">
                                <div style="height: 15px;">{{live_segment_stats2.stats_0_15.home.goal}}</div>
                                <div style="height: 15px;">{{live_segment_stats2.stats_0_15.away.goal}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">{{live_segment_stats2.stats_16_30.home.goal}}</div>
                                <div style="height: 15px;">{{live_segment_stats2.stats_16_30.away.goal}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">{{live_segment_stats2.stats_31_45.home.goal}}</div>
                                <div style="height: 15px;">{{live_segment_stats2.stats_31_45.away.goal}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">{{live_segment_stats2.stats_46_60.home.goal}}</div>
                                <div style="height: 15px;">{{live_segment_stats2.stats_46_60.away.goal}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">{{live_segment_stats2.stats_61_75.home.goal}}</div>
                                <div style="height: 15px;">{{live_segment_stats2.stats_61_75.away.goal}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">{{live_segment_stats2.stats_76_90.home.goal}}</div>
                                <div style="height: 15px;">{{live_segment_stats2.stats_76_90.away.goal}}</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">On</p>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.home.on}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.away.on}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.home.on}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.away.on}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.home.on}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.away.on}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.home.on}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.away.on}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.home.on}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.away.on}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.home.on}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.away.on}}</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Off</p>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.home.off}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.away.off}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.home.off}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.away.off}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.home.off}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.away.off}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.home.off}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.away.off}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.home.off}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.away.off}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.home.off}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.away.off}}</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Blk</p>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.home.blk}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.away.blk}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.home.blk}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.away.blk}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.home.blk}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.away.blk}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.home.blk}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.away.blk}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.home.blk}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.away.blk}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.home.blk}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.away.blk}}</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">In</p>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.home.in}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.away.in}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.home.in}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.away.in}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.home.in}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.away.in}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.home.in}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.away.in}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.home.in}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.away.in}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.home.in}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.away.in}}</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Out</p>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.home.out}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.away.out}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.home.out}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.away.out}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.home.out}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.away.out}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.home.out}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.away.out}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.home.out}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.away.out}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.home.out}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.away.out}}</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Cnr</p>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.home.cnr}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.away.cnr}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.home.cnr}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.away.cnr}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.home.cnr}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.away.cnr}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.home.cnr}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.away.cnr}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.home.cnr}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.away.cnr}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.home.cnr}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.away.cnr}}</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">DA</p>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.home.da}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.away.da}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.home.da}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.away.da}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.home.da}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.away.da}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.home.da}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.away.da}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.home.da}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.away.da}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.home.da}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.away.da}}</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Pos</p>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.home.pos}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.away.pos}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.home.pos}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.away.pos}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.home.pos}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.away.pos}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.home.pos}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.away.pos}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.home.pos}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.away.pos}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.home.pos}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.away.pos}}</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Red</p>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.home.red}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.away.red}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.home.red}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.away.red}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.home.red}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.away.red}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.home.red}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.away.red}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.home.red}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.away.red}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.home.red}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.away.red}}</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Yel</p>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.home.yel}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_0_15.away.yel}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.home.yel}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_16_30.away.yel}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.home.yel}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_31_45.away.yel}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.home.yel}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_46_60.away.yel}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.home.yel}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_61_75.away.yel}}</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.home.yel}}</div>
                                <div style="height: 15px; font-size: 11px!important;">{{live_segment_stats2.stats_76_90.away.yel}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <label style="color: red; font-weight: bold;">Selected Event Stats:</label>
                <div class="stats-header">
                    <div style="flex: 2; border-right: 1px solid lightgray; color: black;">
                        <div style="height: 20px; width: 100%; text-align: center; padding: 3px;">
                            {{total_home_stats.competition}}
                        </div>
                        <div style="height: 20px; width: 100%; text-align: left; padding-left: 5px;">
                            Time
                        </div>
                    </div>
                    <div style="flex: 1; border-right: 1px solid lightgray;">
                        <div style="height: 20px; width: 100%; text-align: center; padding: 3px;">
                        </div>
                        <div style="height: 20px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black;">
                            Result
                        </div>
                    </div>
                    <div style="flex: 7;">
                        <div style="height: 20px; width: 100%; text-align: center; padding: 3px; color: black;">
                            Total Games
                        </div>
                        <div style="display: flex; height: 20px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black;">
                            <div style="flex: 1; text-align: center;">Goal</div>
                            <div style="flex: 1; text-align: center;">On</div>
                            <div style="flex: 1; text-align: center;">Off</div>
                            <div style="flex: 1; text-align: center;">Blk</div>
                            <div style="flex: 1; text-align: center;">In</div>
                            <div style="flex: 1; text-align: center;">Out</div>
                            <div style="flex: 1; text-align: center;">Cnr</div>
                            <div style="flex: 1; text-align: center;">DA</div>
                            <div style="flex: 1; text-align: center;">Pos</div>
                            <div style="flex: 1; text-align: center;">Red</div>
                            <div style="flex: 1; text-align: center;">Yel</div>
                        </div>
                    </div>
                </div>
                <div class="stats-content">
                    <div style="flex: 2; border-right: 1px solid lightgray; color: black;">
                        <div style="width: 20%; float: left; text-align: center; padding-top: 20px;">{{total_home_stats.time}}</div>
                        <div style="width: 80%; float: left;">
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px;">
                                {{total_home_stats.name}}
                            </div>
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px;">
                                {{total_away_stats.name}}
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; border-right: 1px solid lightgray;">
                        <div style="height: 60px; width: 100%; text-align: center; padding-top: 20px;">
                            {{total_home_stats.score}} - {{total_away_stats.score}}
                        </div>
                    </div>
                    <div style="flex: 7;">
                        <div style="display: flex; height: 30px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black; padding-top: 3px;">
                            <div style="flex: 1; text-align: center;">{{total_home_stats.score}}</div>
                            <div style="flex: 1; text-align: center;">{{total_home_stats.on}}</div>
                            <div style="flex: 1; text-align: center;">{{total_home_stats.off}}</div>
                            <div style="flex: 1; text-align: center;">{{total_home_stats.blk}}</div>
                            <div style="flex: 1; text-align: center;">{{total_home_stats.in}}</div>
                            <div style="flex: 1; text-align: center;">{{total_home_stats.out}}</div>
                            <div style="flex: 1; text-align: center;">{{total_home_stats.cnr}}</div>
                            <div style="flex: 1; text-align: center;">{{total_home_stats.da}}</div>
                            <div style="flex: 1; text-align: center;">{{total_home_stats.pos}}</div>
                            <div style="flex: 1; text-align: center;">{{total_home_stats.red}}</div>
                            <div style="flex: 1; text-align: center;">{{total_home_stats.yel}}</div>
                        </div>
                        <div style="display: flex; height: 30px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black; padding-top: 3px;">
                            <div style="flex: 1; text-align: center;">{{total_away_stats.score}}</div>
                            <div style="flex: 1; text-align: center;">{{total_away_stats.on}}</div>
                            <div style="flex: 1; text-align: center;">{{total_away_stats.off}}</div>
                            <div style="flex: 1; text-align: center;">{{total_away_stats.blk}}</div>
                            <div style="flex: 1; text-align: center;">{{total_away_stats.in}}</div>
                            <div style="flex: 1; text-align: center;">{{total_away_stats.out}}</div>
                            <div style="flex: 1; text-align: center;">{{total_away_stats.cnr}}</div>
                            <div style="flex: 1; text-align: center;">{{total_away_stats.da}}</div>
                            <div style="flex: 1; text-align: center;">{{total_away_stats.pos}}</div>
                            <div style="flex: 1; text-align: center;">{{total_away_stats.red}}</div>
                            <div style="flex: 1; text-align: center;">{{total_away_stats.yel}}</div>
                        </div>
                    </div>
                </div>
                <div class="stats-header" style="background: #7c9fc7;">
                    <div style="flex: 2; border-right: 1px solid lightgray; color: black;">
                        <div style="height: 20px; width: 100%; text-align: center; padding: 3px; color: #7c9fc7">
                            .
                        </div>
                        <div style="height: 20px; width: 100%; text-align: left; padding-left: 5px;">
                            H/A
                        </div>
                    </div>
                    <div style="flex: 1; border-right: 1px solid lightgray;">
                        <div style="height: 20px; width: 100%; text-align: center; padding: 3px;">
                        </div>
                        <div style="height: 20px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black;">
                            P
                        </div>
                    </div>
                    <div style="flex: 7;">
                        <div style="height: 20px; width: 100%; text-align: center; padding: 3px; color: black;">
                            Avg Stats Per Game
                        </div>
                        <div style="display: flex; height: 20px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black;">
                            <div style="flex: 1; text-align: center;">Goal</div>
                            <div style="flex: 1; text-align: center;">On</div>
                            <div style="flex: 1; text-align: center;">Off</div>
                            <div style="flex: 1; text-align: center;">Blk</div>
                            <div style="flex: 1; text-align: center;">In</div>
                            <div style="flex: 1; text-align: center;">Out</div>
                            <div style="flex: 1; text-align: center;">Cnr</div>
                            <div style="flex: 1; text-align: center;">DA</div>
                            <div style="flex: 1; text-align: center;">Pos</div>
                            <div style="flex: 1; text-align: center;">Red</div>
                            <div style="flex: 1; text-align: center;">Yel</div>
                        </div>
                    </div>
                </div>

                <div class="stats-content">
                    <div style="flex: 2; border-right: 1px solid lightgray; color: black;">
                        <div style="width: 20%; float: left; text-align: center;">
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px;">
                                H
                            </div>
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px;">
                                A
                            </div>
                        </div>
                        <div style="width: 80%; float: left;">
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px;">
                                {{total_home_stats.name}}
                            </div>
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px;">
                                {{total_away_stats.name}}
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; border-right: 1px solid lightgray;">
                        <div style="height: 60px; width: 100%; text-align: center;">
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px;">
                                {{avg_home_stats.p}}
                            </div>
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px;">
                                {{avg_away_stats.p}}
                            </div>
                        </div>
                    </div>
                    <div style="flex: 7;">
                        <div style="display: flex; height: 30px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black; padding-top: 3px;">
                            <div v-if="avg_home_stats.goal == 0" style="flex: 1; text-align: center;">{{(avg_home_stats.goal).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_home_stats.goal/avg_home_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_home_stats.on == 0" style="flex: 1; text-align: center;">{{(avg_home_stats.on).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_home_stats.on/avg_home_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_home_stats.off == 0" style="flex: 1; text-align: center;">{{(avg_home_stats.off).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_home_stats.off/avg_home_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_home_stats.blk == 0" style="flex: 1; text-align: center;">{{(avg_home_stats.blk).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_home_stats.blk/avg_home_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_home_stats.in == 0" style="flex: 1; text-align: center;">{{(avg_home_stats.in).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_home_stats.in/avg_home_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_home_stats.out == 0" style="flex: 1; text-align: center;">{{(avg_home_stats.out).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_home_stats.out/avg_home_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_home_stats.cnr == 0" style="flex: 1; text-align: center;">{{(avg_home_stats.cnr).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_home_stats.cnr/avg_home_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_home_stats.da == 0" style="flex: 1; text-align: center;">{{(avg_home_stats.da).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_home_stats.da/avg_home_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_home_stats.pos == 0" style="flex: 1; text-align: center;">{{(avg_home_stats.pos).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_home_stats.pos/avg_home_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_home_stats.red == 0" style="flex: 1; text-align: center;">{{(avg_home_stats.red).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_home_stats.red/avg_home_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_home_stats.yel == 0" style="flex: 1; text-align: center;">{{(avg_home_stats.yel).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_home_stats.yel/avg_home_stats.p).toFixed(2)}}</div>
                        </div>
                        <div style="display: flex; height: 30px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black; padding-top: 3px;">
                            <div v-if="avg_away_stats.goal == 0" style="flex: 1; text-align: center;">{{(avg_away_stats.goal).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_away_stats.goal/avg_away_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_away_stats.on == 0" style="flex: 1; text-align: center;">{{(avg_away_stats.on).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_away_stats.on/avg_away_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_away_stats.off == 0" style="flex: 1; text-align: center;">{{(avg_away_stats.off).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_away_stats.off/avg_away_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_away_stats.blk == 0" style="flex: 1; text-align: center;">{{(avg_away_stats.blk).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_away_stats.blk/avg_away_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_away_stats.in == 0" style="flex: 1; text-align: center;">{{(avg_away_stats.in).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_away_stats.in/avg_away_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_away_stats.out == 0" style="flex: 1; text-align: center;">{{(avg_away_stats.out).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_away_stats.out/avg_away_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_away_stats.cnr == 0" style="flex: 1; text-align: center;">{{(avg_away_stats.cnr).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_away_stats.cnr/avg_away_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_away_stats.da == 0" style="flex: 1; text-align: center;">{{(avg_away_stats.da).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_away_stats.da/avg_away_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_away_stats.pos == 0" style="flex: 1; text-align: center;">{{(avg_away_stats.pos).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_away_stats.pos/avg_away_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_away_stats.red == 0" style="flex: 1; text-align: center;">{{(avg_away_stats.red).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_away_stats.red/avg_away_stats.p).toFixed(2)}}</div>
                            <div v-if="avg_away_stats.yel == 0" style="flex: 1; text-align: center;">{{(avg_away_stats.yel).toFixed(2)}}</div>
                            <div v-else style="flex: 1; text-align: center;">{{(avg_away_stats.yel/avg_away_stats.p).toFixed(2)}}</div>
                        </div>
                    </div>
                </div>
                <div class="stats-header" style="background: #00ad4e;">
                    <div style="flex: 2; border-right: 1px solid lightgray; color: black;">
                        <div style="height: 20px; width: 100%; text-align: center; padding: 3px; color: #00ad4e">
                            .
                        </div>
                        <div style="height: 20px; width: 100%; text-align: left; padding-left: 5px; color: #00ad4e">
                            .
                        </div>
                    </div>
                    <div style="flex: 1; border-right: 1px solid lightgray;">
                        <div style="height: 20px; width: 100%; text-align: center; padding: 3px;">
                        </div>
                        <div style="height: 20px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black; color: #00ad4e">
                            .
                        </div>
                    </div>
                    <div style="flex: 7;">
                        <div style="height: 20px; width: 100%; text-align: center; padding: 3px; color: black;">
                            Delta Indexes
                        </div>
                        <div style="display: flex; height: 20px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black;">
                            <div style="flex: 1; text-align: center;">Goal</div>
                            <div style="flex: 1; text-align: center;">On</div>
                            <div style="flex: 1; text-align: center;">Off</div>
                            <div style="flex: 1; text-align: center;">Blk</div>
                            <div style="flex: 1; text-align: center;">In</div>
                            <div style="flex: 1; text-align: center;">Out</div>
                            <div style="flex: 1; text-align: center;">Cnr</div>
                            <div style="flex: 1; text-align: center;">DA</div>
                            <div style="flex: 1; text-align: center;">Pos</div>
                            <div style="flex: 1; text-align: center;">Red</div>
                            <div style="flex: 1; text-align: center;">Yel</div>
                        </div>
                    </div>
                </div>

                <div class="stats-content" style="border-bottom: 1px solid lightgrey;">
                    <div style="flex: 2; border-right: 1px solid lightgray; color: black;">
                        <div style="width: 20%; float: left; text-align: center;">
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px;">
                                H
                            </div>
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px;">
                                A
                            </div>
                        </div>
                        <div style="width: 80%; float: left;">
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px;">
                                {{total_home_stats.name}}
                            </div>
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px;">
                                {{total_away_stats.name}}
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; border-right: 1px solid lightgray;">
                        <div style="height: 60px; width: 100%; text-align: center;">
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px; color: white">
                                .
                            </div>
                            <div style="height: 30px; width: 100%; text-align: center; padding: 2px; color: white">
                                .
                            </div>
                        </div>
                    </div>
                    <div style="flex: 7;">
                        <div style="display: flex; height: 30px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black; padding-top: 3px;">
                            <div style="flex: 1; text-align: center;">{{delta_home_stats.score}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_home_stats.on}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_home_stats.off}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_home_stats.blk}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_home_stats.in}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_home_stats.out}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_home_stats.cnr}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_home_stats.da}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_home_stats.pos}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_home_stats.red}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_home_stats.yel}}</div>
                        </div>
                        <div style="display: flex; height: 30px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black; padding-top: 3px;">
                            <div style="flex: 1; text-align: center;">{{delta_away_stats.score}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_away_stats.on}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_away_stats.off}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_away_stats.blk}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_away_stats.in}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_away_stats.out}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_away_stats.cnr}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_away_stats.da}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_away_stats.pos}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_away_stats.red}}</div>
                            <div style="flex: 1; text-align: center;">{{delta_away_stats.yel}}</div>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    <label style="color: red; font-weight: bold">Total filtered livestats</label>
                    <div style="flex: 7; background: #b1a0c7">
                        <div style="height: 20px; width: 100%; text-align: center; padding: 3px; color: black;">
                            Total Live Stats
                        </div>
                        <div style="display: flex; height: 20px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black;">
                            <div style="flex: 1; text-align: center;">Goal</div>
                            <div style="flex: 1; text-align: center;">On</div>
                            <div style="flex: 1; text-align: center;">Off</div>
                            <div style="flex: 1; text-align: center;">Blk</div>
                            <div style="flex: 1; text-align: center;">In</div>
                            <div style="flex: 1; text-align: center;">Out</div>
                            <div style="flex: 1; text-align: center;">Cnr</div>
                            <div style="flex: 1; text-align: center;">DA</div>
                            <div style="flex: 1; text-align: center;">Pos</div>
                            <div style="flex: 1; text-align: center;">Red</div>
                            <div style="flex: 1; text-align: center;">Yel</div>
                        </div>
                    </div>
                    <div style="display: flex; height: 30px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black; padding-top: 3px; border: 1px solid lightgray;  border-bottom: none;">
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_home_stats.goal/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_home_stats.on/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_home_stats.off/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_home_stats.blk/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_home_stats.in/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_home_stats.out/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_home_stats.cnr/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_home_stats.da/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_home_stats.pos/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_home_stats.red/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_home_stats.yel/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                    </div>
                    <div style="display: flex; height: 30px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black; padding-top: 3px; border: 1px solid lightgray; border-top: none;">
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_away_stats.goal/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_away_stats.on/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_away_stats.off/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_away_stats.blk/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_away_stats.in/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_away_stats.out/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_away_stats.cnr/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_away_stats.da/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_away_stats.pos/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_away_stats.red/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="filtered_result != 0" style="flex: 1; text-align: center;">{{((total_live_away_stats.yel/filtered_result)).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                    </div>
                </div>
            </CCol>
            <CCol lg="12" style="background: white; padding: 30px; padding-top: 0px;">
                <div style="width: 100%;">
                    <div style="width: 100%;">
                        <label style="color: red; font-weight: bold; margin-top: 20px;">Time Segmented Live Stats:</label>
                    </div>
                    <div class="totalMatches score_stats" style="display: flex; font-weight: 600; font-size: 12px;">
                        <div  style="flex: 1; text-align: center;">
                            <p class="header" style="color: #d1c4e1">Time</p>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                        </div>
                        <div  style="flex: 1; text-align: center;">
                            <p class="header">Time</p>
                            <div class="value stats-cell" style="padding-top: 8px;">0 - 15</div>
                            <div class="percent stats-cell" style="padding-top: 8px;">16 - 30</div>
                            <div class="value stats-cell" style="padding-top: 8px;">31 - 45+</div>
                            <div class="percent stats-cell" style="padding-top: 8px;">46 - 60</div>
                            <div class="value stats-cell" style="padding-top: 8px;">61 - 75</div>
                            <div class="percent stats-cell" style="padding-top: 8px;">76 - 90+</div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Goal</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_0_15.home.goal == 0" style="height: 15px;">{{live_segment_stats.stats_0_15.home.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.goal}} ({{(live_segment_stats.stats_0_15.home.goal/live_segment_stats.stats_76_90.home.goal*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_0_15.away.goal == 0" style="height: 15px;">{{live_segment_stats.stats_0_15.away.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.away.goal}} ({{(live_segment_stats.stats_0_15.away.goal/live_segment_stats.stats_76_90.away.goal*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_16_30.home.goal == 0" style="height: 15px;">{{live_segment_stats.stats_16_30.home.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.goal}} ({{(live_segment_stats.stats_16_30.home.goal/live_segment_stats.stats_76_90.home.goal*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_16_30.away.goal == 0" style="height: 15px;">{{live_segment_stats.stats_16_30.away.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.goal}} ({{(live_segment_stats.stats_16_30.away.goal/live_segment_stats.stats_76_90.away.goal*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_31_45.home.goal == 0" style="height: 15px;">{{live_segment_stats.stats_31_45.home.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.goal}} ({{(live_segment_stats.stats_31_45.home.goal/live_segment_stats.stats_76_90.home.goal*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_31_45.away.goal == 0" style="height: 15px;">{{live_segment_stats.stats_31_45.away.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.goal}} ({{(live_segment_stats.stats_31_45.away.goal/live_segment_stats.stats_76_90.away.goal*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_46_60.home.goal == 0" style="height: 15px;">{{live_segment_stats.stats_46_60.home.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.goal}} ({{(live_segment_stats.stats_46_60.home.goal/live_segment_stats.stats_76_90.home.goal*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_46_60.away.goal == 0" style="height: 15px;">{{live_segment_stats.stats_46_60.away.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.goal}} ({{(live_segment_stats.stats_46_60.away.goal/live_segment_stats.stats_76_90.away.goal*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_61_75.home.goal == 0" style="height: 15px;">{{live_segment_stats.stats_61_75.home.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.goal}} ({{(live_segment_stats.stats_61_75.home.goal/live_segment_stats.stats_76_90.home.goal*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_61_75.away.goal == 0" style="height: 15px;">{{live_segment_stats.stats_61_75.away.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.goal}} ({{(live_segment_stats.stats_61_75.away.goal/live_segment_stats.stats_76_90.away.goal*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_76_90.home.goal == 0" style="height: 15px;">{{live_segment_stats.stats_76_90.home.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.goal}} ({{(live_segment_stats.stats_76_90.home.goal/live_segment_stats.stats_76_90.home.goal*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_76_90.away.goal == 0" style="height: 15px;">{{live_segment_stats.stats_76_90.away.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.goal}} ({{(live_segment_stats.stats_76_90.away.goal/live_segment_stats.stats_76_90.away.goal*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">On</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_0_15.home.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.on}} ({{(live_segment_stats.stats_0_15.home.on/live_segment_stats.stats_76_90.home.on*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_0_15.away.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.away.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.on}} ({{(live_segment_stats.stats_0_15.away.on/live_segment_stats.stats_76_90.away.on*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_16_30.home.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.on}} ({{(live_segment_stats.stats_16_30.home.on/live_segment_stats.stats_76_90.home.on*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_16_30.away.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.on}} ({{(live_segment_stats.stats_16_30.away.on/live_segment_stats.stats_76_90.away.on*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_31_45.home.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.on}} ({{(live_segment_stats.stats_31_45.home.on/live_segment_stats.stats_76_90.home.on*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_31_45.away.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.on}} ({{(live_segment_stats.stats_31_45.away.on/live_segment_stats.stats_76_90.away.on*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_46_60.home.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.on}} ({{(live_segment_stats.stats_46_60.home.on/live_segment_stats.stats_76_90.home.on*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_46_60.away.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.on}} ({{(live_segment_stats.stats_46_60.away.on/live_segment_stats.stats_76_90.away.on*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_61_75.home.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.on}} ({{(live_segment_stats.stats_61_75.home.on/live_segment_stats.stats_76_90.home.on*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_61_75.away.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.on}} ({{(live_segment_stats.stats_61_75.away.on/live_segment_stats.stats_76_90.away.on*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_76_90.home.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.on}} ({{(live_segment_stats.stats_76_90.home.on/live_segment_stats.stats_76_90.home.on*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_76_90.away.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.on}} ({{(live_segment_stats.stats_76_90.away.on/live_segment_stats.stats_76_90.away.on*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Off</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_0_15.home.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.off}} ({{(live_segment_stats.stats_0_15.home.off/live_segment_stats.stats_76_90.home.off*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_0_15.away.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.away.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.off}} ({{(live_segment_stats.stats_0_15.away.off/live_segment_stats.stats_76_90.away.off*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_16_30.home.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.off}} ({{(live_segment_stats.stats_16_30.home.off/live_segment_stats.stats_76_90.home.off*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_16_30.away.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.off}} ({{(live_segment_stats.stats_16_30.away.off/live_segment_stats.stats_76_90.away.off*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_31_45.home.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.off}} ({{(live_segment_stats.stats_31_45.home.off/live_segment_stats.stats_76_90.home.off*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_31_45.away.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.off}} ({{(live_segment_stats.stats_31_45.away.off/live_segment_stats.stats_76_90.away.off*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_46_60.home.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.off}} ({{(live_segment_stats.stats_46_60.home.off/live_segment_stats.stats_76_90.home.off*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_46_60.away.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.off}} ({{(live_segment_stats.stats_46_60.away.off/live_segment_stats.stats_76_90.away.off*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_61_75.home.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.off}} ({{(live_segment_stats.stats_61_75.home.off/live_segment_stats.stats_76_90.home.off*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_61_75.away.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.off}} ({{(live_segment_stats.stats_61_75.away.off/live_segment_stats.stats_76_90.away.off*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_76_90.home.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.off}} ({{(live_segment_stats.stats_76_90.home.off/live_segment_stats.stats_76_90.home.off*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_76_90.away.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.off}} ({{(live_segment_stats.stats_76_90.away.off/live_segment_stats.stats_76_90.away.off*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Blk</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_0_15.home.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.blk}} ({{(live_segment_stats.stats_0_15.home.blk/live_segment_stats.stats_76_90.home.blk*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_0_15.away.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.away.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.blk}} ({{(live_segment_stats.stats_0_15.away.blk/live_segment_stats.stats_76_90.away.blk*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_16_30.home.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.blk}} ({{(live_segment_stats.stats_16_30.home.blk/live_segment_stats.stats_76_90.home.blk*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_16_30.away.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.blk}} ({{(live_segment_stats.stats_16_30.away.blk/live_segment_stats.stats_76_90.away.blk*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_31_45.home.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.blk}} ({{(live_segment_stats.stats_31_45.home.blk/live_segment_stats.stats_76_90.home.blk*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_31_45.away.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.blk}} ({{(live_segment_stats.stats_31_45.away.blk/live_segment_stats.stats_76_90.away.blk*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_46_60.home.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.blk}} ({{(live_segment_stats.stats_46_60.home.blk/live_segment_stats.stats_76_90.home.blk*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_46_60.away.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.blk}} ({{(live_segment_stats.stats_46_60.away.blk/live_segment_stats.stats_76_90.away.blk*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_61_75.home.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.blk}} ({{(live_segment_stats.stats_61_75.home.blk/live_segment_stats.stats_76_90.home.blk*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_61_75.away.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.blk}} ({{(live_segment_stats.stats_61_75.away.blk/live_segment_stats.stats_76_90.away.blk*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_76_90.home.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.blk}} ({{(live_segment_stats.stats_76_90.home.blk/live_segment_stats.stats_76_90.home.blk*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_76_90.away.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.blk}} ({{(live_segment_stats.stats_76_90.away.blk/live_segment_stats.stats_76_90.away.blk*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">In</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_0_15.home.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.in}} ({{(live_segment_stats.stats_0_15.home.in/live_segment_stats.stats_76_90.home.in*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_0_15.away.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.away.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.in}} ({{(live_segment_stats.stats_0_15.away.in/live_segment_stats.stats_76_90.away.in*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_16_30.home.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.in}} ({{(live_segment_stats.stats_16_30.home.in/live_segment_stats.stats_76_90.home.in*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_16_30.away.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.in}} ({{(live_segment_stats.stats_16_30.away.in/live_segment_stats.stats_76_90.away.in*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_31_45.home.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.in}} ({{(live_segment_stats.stats_31_45.home.in/live_segment_stats.stats_76_90.home.in*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_31_45.away.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.in}} ({{(live_segment_stats.stats_31_45.away.in/live_segment_stats.stats_76_90.away.in*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_46_60.home.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.in}} ({{(live_segment_stats.stats_46_60.home.in/live_segment_stats.stats_76_90.home.in*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_46_60.away.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.in}} ({{(live_segment_stats.stats_46_60.away.in/live_segment_stats.stats_76_90.away.in*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_61_75.home.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.in}} ({{(live_segment_stats.stats_61_75.home.in/live_segment_stats.stats_76_90.home.in*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_61_75.away.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.in}} ({{(live_segment_stats.stats_61_75.away.in/live_segment_stats.stats_76_90.away.in*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_76_90.home.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.in}} ({{(live_segment_stats.stats_76_90.home.in/live_segment_stats.stats_76_90.home.in*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_76_90.away.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.in}} ({{(live_segment_stats.stats_76_90.away.in/live_segment_stats.stats_76_90.away.in*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Out</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_0_15.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.out}} ({{(live_segment_stats.stats_0_15.home.out/live_segment_stats.stats_76_90.home.out*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_0_15.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.away.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.out}} ({{(live_segment_stats.stats_0_15.away.out/live_segment_stats.stats_76_90.away.out*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_16_30.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.out}} ({{(live_segment_stats.stats_16_30.home.out/live_segment_stats.stats_76_90.home.out*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_16_30.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.out}} ({{(live_segment_stats.stats_16_30.away.out/live_segment_stats.stats_76_90.away.out*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_31_45.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.out}} ({{(live_segment_stats.stats_31_45.home.out/live_segment_stats.stats_76_90.home.out*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_31_45.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.out}} ({{(live_segment_stats.stats_31_45.away.out/live_segment_stats.stats_76_90.away.out*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_46_60.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.out}} ({{(live_segment_stats.stats_46_60.home.out/live_segment_stats.stats_76_90.home.out*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_46_60.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.out}} ({{(live_segment_stats.stats_46_60.away.out/live_segment_stats.stats_76_90.away.out*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_61_75.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.out}} ({{(live_segment_stats.stats_61_75.home.out/live_segment_stats.stats_76_90.home.out*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_61_75.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.out}} ({{(live_segment_stats.stats_61_75.away.out/live_segment_stats.stats_76_90.away.out*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_76_90.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.out}} ({{(live_segment_stats.stats_76_90.home.out/live_segment_stats.stats_76_90.home.out*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_76_90.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.out}} ({{(live_segment_stats.stats_76_90.away.out/live_segment_stats.stats_76_90.away.out*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Cnr</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_0_15.home.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.cnr}} ({{(live_segment_stats.stats_0_15.home.cnr/live_segment_stats.stats_76_90.home.cnr*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_0_15.away.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.away.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.cnr}} ({{(live_segment_stats.stats_0_15.away.cnr/live_segment_stats.stats_76_90.away.cnr*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_16_30.home.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.cnr}} ({{(live_segment_stats.stats_16_30.home.cnr/live_segment_stats.stats_76_90.home.cnr*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_16_30.away.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.cnr}} ({{(live_segment_stats.stats_16_30.away.cnr/live_segment_stats.stats_76_90.away.cnr*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_31_45.home.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.cnr}} ({{(live_segment_stats.stats_31_45.home.cnr/live_segment_stats.stats_76_90.home.cnr*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_31_45.away.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.cnr}} ({{(live_segment_stats.stats_31_45.away.cnr/live_segment_stats.stats_76_90.away.cnr*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_46_60.home.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.cnr}} ({{(live_segment_stats.stats_46_60.home.cnr/live_segment_stats.stats_76_90.home.cnr*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_46_60.away.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.cnr}} ({{(live_segment_stats.stats_46_60.away.cnr/live_segment_stats.stats_76_90.away.cnr*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_61_75.home.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.cnr}} ({{(live_segment_stats.stats_61_75.home.cnr/live_segment_stats.stats_76_90.home.cnr*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_61_75.away.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.cnr}} ({{(live_segment_stats.stats_61_75.away.cnr/live_segment_stats.stats_76_90.away.cnr*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_76_90.home.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.cnr}} ({{(live_segment_stats.stats_76_90.home.cnr/live_segment_stats.stats_76_90.home.cnr*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_76_90.away.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.cnr}} ({{(live_segment_stats.stats_76_90.away.cnr/live_segment_stats.stats_76_90.away.cnr*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">DA</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_0_15.home.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.da}} ({{(live_segment_stats.stats_0_15.home.da/live_segment_stats.stats_76_90.home.da*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_0_15.away.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.away.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.da}} ({{(live_segment_stats.stats_0_15.away.da/live_segment_stats.stats_76_90.away.da*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_16_30.home.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.da}} ({{(live_segment_stats.stats_16_30.home.da/live_segment_stats.stats_76_90.home.da*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_16_30.away.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.da}} ({{(live_segment_stats.stats_16_30.away.da/live_segment_stats.stats_76_90.away.da*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_31_45.home.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.da}} ({{(live_segment_stats.stats_31_45.home.da/live_segment_stats.stats_76_90.home.da*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_31_45.away.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.da}} ({{(live_segment_stats.stats_31_45.away.da/live_segment_stats.stats_76_90.away.da*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_46_60.home.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.da}} ({{(live_segment_stats.stats_46_60.home.da/live_segment_stats.stats_76_90.home.da*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_46_60.away.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.da}} ({{(live_segment_stats.stats_46_60.away.da/live_segment_stats.stats_76_90.away.da*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_61_75.home.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.da}} ({{(live_segment_stats.stats_61_75.home.da/live_segment_stats.stats_76_90.home.da*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_61_75.away.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.da}} ({{(live_segment_stats.stats_61_75.away.da/live_segment_stats.stats_76_90.away.da*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_76_90.home.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.da}} ({{(live_segment_stats.stats_76_90.home.da/live_segment_stats.stats_76_90.home.da*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_76_90.away.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.da}} ({{(live_segment_stats.stats_76_90.away.da/live_segment_stats.stats_76_90.away.da*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Pos</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_0_15.home.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.pos}} ({{(live_segment_stats.stats_0_15.home.pos/live_segment_stats.stats_76_90.home.pos*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_0_15.away.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.away.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.pos}} ({{(live_segment_stats.stats_0_15.away.pos/live_segment_stats.stats_76_90.away.pos*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_16_30.home.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.pos}} ({{(live_segment_stats.stats_16_30.home.pos/live_segment_stats.stats_76_90.home.pos*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_16_30.away.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.pos}} ({{(live_segment_stats.stats_16_30.away.pos/live_segment_stats.stats_76_90.away.pos*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_31_45.home.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.pos}} ({{(live_segment_stats.stats_31_45.home.pos/live_segment_stats.stats_76_90.home.pos*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_31_45.away.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.pos}} ({{(live_segment_stats.stats_31_45.away.pos/live_segment_stats.stats_76_90.away.pos*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_46_60.home.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.pos}} ({{(live_segment_stats.stats_46_60.home.pos/live_segment_stats.stats_76_90.home.pos*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_46_60.away.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.pos}} ({{(live_segment_stats.stats_46_60.away.pos/live_segment_stats.stats_76_90.away.pos*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_61_75.home.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.pos}} ({{(live_segment_stats.stats_61_75.home.pos/live_segment_stats.stats_76_90.home.pos*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_61_75.away.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.pos}} ({{(live_segment_stats.stats_61_75.away.pos/live_segment_stats.stats_76_90.away.pos*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_76_90.home.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.pos}} ({{(live_segment_stats.stats_76_90.home.pos/live_segment_stats.stats_76_90.home.pos*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_76_90.away.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.pos}} ({{(live_segment_stats.stats_76_90.away.pos/live_segment_stats.stats_76_90.away.pos*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Red</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_0_15.home.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.red}} ({{(live_segment_stats.stats_0_15.home.red/live_segment_stats.stats_76_90.home.red*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_0_15.away.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.away.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.red}} ({{(live_segment_stats.stats_0_15.away.red/live_segment_stats.stats_76_90.away.red*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_16_30.home.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.red}} ({{(live_segment_stats.stats_16_30.home.red/live_segment_stats.stats_76_90.home.red*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_16_30.away.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.red}} ({{(live_segment_stats.stats_16_30.away.red/live_segment_stats.stats_76_90.away.red*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_31_45.home.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.red}} ({{(live_segment_stats.stats_31_45.home.red/live_segment_stats.stats_76_90.home.red*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_31_45.away.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.red}} ({{(live_segment_stats.stats_31_45.away.red/live_segment_stats.stats_76_90.away.red*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_46_60.home.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.red}} ({{(live_segment_stats.stats_46_60.home.red/live_segment_stats.stats_76_90.home.red*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_46_60.away.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.red}} ({{(live_segment_stats.stats_46_60.away.red/live_segment_stats.stats_76_90.away.red*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_61_75.home.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.red}} ({{(live_segment_stats.stats_61_75.home.red/live_segment_stats.stats_76_90.home.red*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_61_75.away.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.red}} ({{(live_segment_stats.stats_61_75.away.red/live_segment_stats.stats_76_90.away.red*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_76_90.home.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.red}} ({{(live_segment_stats.stats_76_90.home.red/live_segment_stats.stats_76_90.home.red*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_76_90.away.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.red}} ({{(live_segment_stats.stats_76_90.away.red/live_segment_stats.stats_76_90.away.red*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Yel</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_0_15.home.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.yel}} ({{(live_segment_stats.stats_0_15.home.yel/live_segment_stats.stats_76_90.home.yel*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_0_15.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.away.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_0_15.home.yel}} ({{(live_segment_stats.stats_0_15.away.yel/live_segment_stats.stats_76_90.away.yel*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_16_30.home.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.home.yel}} ({{(live_segment_stats.stats_16_30.home.yel/live_segment_stats.stats_76_90.home.yel*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_16_30.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_16_30.away.yel}} ({{(live_segment_stats.stats_16_30.away.yel/live_segment_stats.stats_76_90.away.yel*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_31_45.home.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.home.yel}} ({{(live_segment_stats.stats_31_45.home.yel/live_segment_stats.stats_76_90.home.yel*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_31_45.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_31_45.away.yel}} ({{(live_segment_stats.stats_31_45.away.yel/live_segment_stats.stats_76_90.away.yel*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_46_60.home.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.home.yel}} ({{(live_segment_stats.stats_46_60.home.yel/live_segment_stats.stats_76_90.home.yel*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_46_60.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_46_60.away.yel}} ({{(live_segment_stats.stats_46_60.away.yel/live_segment_stats.stats_76_90.away.yel*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_61_75.home.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.home.yel}} ({{(live_segment_stats.stats_61_75.home.yel/live_segment_stats.stats_76_90.home.yel*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_61_75.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_61_75.away.yel}} ({{(live_segment_stats.stats_61_75.away.yel/live_segment_stats.stats_76_90.away.yel*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_76_90.home.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.home.yel}} ({{(live_segment_stats.stats_76_90.home.yel/live_segment_stats.stats_76_90.home.yel*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_76_90.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats.stats_76_90.away.yel}} ({{(live_segment_stats.stats_76_90.away.yel/live_segment_stats.stats_76_90.away.yel*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </CCol>
            <CCol lg="12" style="background: white; padding: 30px; padding-top: 0px;">
                <div style="width: 100%;">
                    <div style="width: 100%;">
                        <label style="color: red; font-weight: bold; margin-top: 20px;">Time Segmented Live Stats:</label>
                    </div>
                    <div class="totalMatches score_stats" style="display: flex; font-weight: 600; font-size: 12px;">
                        <div  style="flex: 1; text-align: center;">
                            <p class="header" style="color: #d1c4e1">Time</p>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                            <div class="value stats-cell">
                                <div style="height: 15px;">home</div>
                                <div style="height: 15px;">away</div>
                            </div>
                        </div>
                        <div  style="flex: 1; text-align: center;">
                            <p class="header">Time</p>
                            <div class="value stats-cell" style="padding-top: 8px;">0 - 15</div>
                            <div class="percent stats-cell" style="padding-top: 8px;">16 - 30</div>
                            <div class="value stats-cell" style="padding-top: 8px;">31 - 45+</div>
                            <div class="percent stats-cell" style="padding-top: 8px;">46 - 60</div>
                            <div class="value stats-cell" style="padding-top: 8px;">61 - 75</div>
                            <div class="percent stats-cell" style="padding-top: 8px;">76 - 90+</div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Goal</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_0_15.home.goal == 0" style="height: 15px;">{{live_segment_stats1.stats_0_15.home.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.goal}} ({{(live_segment_stats1.stats_0_15.home.goal/(live_segment_stats1.stats_0_15.home.goal + live_segment_stats1.stats_16_30.home.goal + live_segment_stats1.stats_31_45.home.goal + live_segment_stats1.stats_46_60.home.goal + live_segment_stats1.stats_61_75.home.goal + live_segment_stats1.stats_76_90.home.goal)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_0_15.away.goal == 0" style="height: 15px;">{{live_segment_stats1.stats_0_15.away.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.away.goal}} ({{(live_segment_stats1.stats_0_15.away.goal/(live_segment_stats1.stats_0_15.away.goal + live_segment_stats1.stats_16_30.away.goal + live_segment_stats1.stats_31_45.away.goal + live_segment_stats1.stats_46_60.away.goal + live_segment_stats1.stats_61_75.away.goal + live_segment_stats1.stats_76_90.away.goal)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_16_30.home.goal == 0" style="height: 15px;">{{live_segment_stats1.stats_16_30.home.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.goal}} ({{(live_segment_stats1.stats_16_30.home.goal/(live_segment_stats1.stats_0_15.home.goal + live_segment_stats1.stats_16_30.home.goal + live_segment_stats1.stats_31_45.home.goal + live_segment_stats1.stats_46_60.home.goal + live_segment_stats1.stats_61_75.home.goal + live_segment_stats1.stats_76_90.home.goal)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_16_30.away.goal == 0" style="height: 15px;">{{live_segment_stats1.stats_16_30.away.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.goal}} ({{(live_segment_stats1.stats_16_30.away.goal/(live_segment_stats1.stats_0_15.away.goal + live_segment_stats1.stats_16_30.away.goal + live_segment_stats1.stats_31_45.away.goal + live_segment_stats1.stats_46_60.away.goal + live_segment_stats1.stats_61_75.away.goal + live_segment_stats1.stats_76_90.away.goal)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_31_45.home.goal == 0" style="height: 15px;">{{live_segment_stats1.stats_31_45.home.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.goal}} ({{(live_segment_stats1.stats_31_45.home.goal/(live_segment_stats1.stats_0_15.home.goal + live_segment_stats1.stats_16_30.home.goal + live_segment_stats1.stats_31_45.home.goal + live_segment_stats1.stats_46_60.home.goal + live_segment_stats1.stats_61_75.home.goal + live_segment_stats1.stats_76_90.home.goal)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_31_45.away.goal == 0" style="height: 15px;">{{live_segment_stats1.stats_31_45.away.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.goal}} ({{(live_segment_stats1.stats_31_45.away.goal/(live_segment_stats1.stats_0_15.away.goal + live_segment_stats1.stats_16_30.away.goal + live_segment_stats1.stats_31_45.away.goal + live_segment_stats1.stats_46_60.away.goal + live_segment_stats1.stats_61_75.away.goal + live_segment_stats1.stats_76_90.away.goal)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_46_60.home.goal == 0" style="height: 15px;">{{live_segment_stats1.stats_46_60.home.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.goal}} ({{(live_segment_stats1.stats_46_60.home.goal/(live_segment_stats1.stats_0_15.home.goal + live_segment_stats1.stats_16_30.home.goal + live_segment_stats1.stats_31_45.home.goal + live_segment_stats1.stats_46_60.home.goal + live_segment_stats1.stats_61_75.home.goal + live_segment_stats1.stats_76_90.home.goal)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_46_60.away.goal == 0" style="height: 15px;">{{live_segment_stats1.stats_46_60.away.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.goal}} ({{(live_segment_stats1.stats_46_60.away.goal/(live_segment_stats1.stats_0_15.away.goal + live_segment_stats1.stats_16_30.away.goal + live_segment_stats1.stats_31_45.away.goal + live_segment_stats1.stats_46_60.away.goal + live_segment_stats1.stats_61_75.away.goal + live_segment_stats1.stats_76_90.away.goal)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_61_75.home.goal == 0" style="height: 15px;">{{live_segment_stats1.stats_61_75.home.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.goal}} ({{(live_segment_stats1.stats_61_75.home.goal/(live_segment_stats1.stats_0_15.home.goal + live_segment_stats1.stats_16_30.home.goal + live_segment_stats1.stats_31_45.home.goal + live_segment_stats1.stats_46_60.home.goal + live_segment_stats1.stats_61_75.home.goal + live_segment_stats1.stats_76_90.home.goal)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_61_75.away.goal == 0" style="height: 15px;">{{live_segment_stats1.stats_61_75.away.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.goal}} ({{(live_segment_stats1.stats_61_75.away.goal/(live_segment_stats1.stats_0_15.away.goal + live_segment_stats1.stats_16_30.away.goal + live_segment_stats1.stats_31_45.away.goal + live_segment_stats1.stats_46_60.away.goal + live_segment_stats1.stats_61_75.away.goal + live_segment_stats1.stats_76_90.away.goal)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_76_90.home.goal == 0" style="height: 15px;">{{live_segment_stats1.stats_76_90.home.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.goal}} ({{(live_segment_stats1.stats_76_90.home.goal/(live_segment_stats1.stats_0_15.home.goal + live_segment_stats1.stats_16_30.home.goal + live_segment_stats1.stats_31_45.home.goal + live_segment_stats1.stats_46_60.home.goal + live_segment_stats1.stats_61_75.home.goal + live_segment_stats1.stats_76_90.home.goal)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_76_90.away.goal == 0" style="height: 15px;">{{live_segment_stats.stats_76_90.away.goal}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.goal}} ({{(live_segment_stats1.stats_76_90.away.goal/(live_segment_stats1.stats_0_15.away.goal + live_segment_stats1.stats_16_30.away.goal + live_segment_stats1.stats_31_45.away.goal + live_segment_stats1.stats_46_60.away.goal + live_segment_stats1.stats_61_75.away.goal + live_segment_stats1.stats_76_90.away.goal)*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">On</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_0_15.home.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.on}} ({{(live_segment_stats1.stats_0_15.home.on/(live_segment_stats1.stats_0_15.home.on + live_segment_stats1.stats_16_30.home.on + live_segment_stats1.stats_31_45.home.on + live_segment_stats1.stats_46_60.home.on + live_segment_stats1.stats_61_75.home.on + live_segment_stats1.stats_76_90.home.on)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_0_15.away.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.away.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.on}} ({{(live_segment_stats1.stats_0_15.away.on/(live_segment_stats1.stats_0_15.away.on + live_segment_stats1.stats_16_30.away.on + live_segment_stats1.stats_31_45.away.on + live_segment_stats1.stats_46_60.away.on + live_segment_stats1.stats_61_75.away.on + live_segment_stats1.stats_76_90.away.on)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_16_30.home.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.on}} ({{(live_segment_stats1.stats_16_30.home.on/(live_segment_stats1.stats_0_15.home.on + live_segment_stats1.stats_16_30.home.on + live_segment_stats1.stats_31_45.home.on + live_segment_stats1.stats_46_60.home.on + live_segment_stats1.stats_61_75.home.on + live_segment_stats1.stats_76_90.home.on)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_16_30.away.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.on}} ({{(live_segment_stats1.stats_16_30.away.on/(live_segment_stats1.stats_0_15.away.on + live_segment_stats1.stats_16_30.away.on + live_segment_stats1.stats_31_45.away.on + live_segment_stats1.stats_46_60.away.on + live_segment_stats1.stats_61_75.away.on + live_segment_stats1.stats_76_90.away.on)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_31_45.home.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.on}} ({{(live_segment_stats1.stats_31_45.home.on/(live_segment_stats1.stats_0_15.home.on + live_segment_stats1.stats_16_30.home.on + live_segment_stats1.stats_31_45.home.on + live_segment_stats1.stats_46_60.home.on + live_segment_stats1.stats_61_75.home.on + live_segment_stats1.stats_76_90.home.on)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_31_45.away.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.on}} ({{(live_segment_stats1.stats_31_45.away.on/(live_segment_stats1.stats_0_15.away.on + live_segment_stats1.stats_16_30.away.on + live_segment_stats1.stats_31_45.away.on + live_segment_stats1.stats_46_60.away.on + live_segment_stats1.stats_61_75.away.on + live_segment_stats1.stats_76_90.away.on)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_46_60.home.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.on}} ({{(live_segment_stats1.stats_46_60.home.on/(live_segment_stats1.stats_0_15.home.on + live_segment_stats1.stats_16_30.home.on + live_segment_stats1.stats_31_45.home.on + live_segment_stats1.stats_46_60.home.on + live_segment_stats1.stats_61_75.home.on + live_segment_stats1.stats_76_90.home.on)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_46_60.away.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.on}} ({{(live_segment_stats1.stats_46_60.away.on/(live_segment_stats1.stats_0_15.away.on + live_segment_stats1.stats_16_30.away.on + live_segment_stats1.stats_31_45.away.on + live_segment_stats1.stats_46_60.away.on + live_segment_stats1.stats_61_75.away.on + live_segment_stats1.stats_76_90.away.on)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_61_75.home.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.on}} ({{(live_segment_stats1.stats_61_75.home.on/(live_segment_stats1.stats_0_15.home.on + live_segment_stats1.stats_16_30.home.on + live_segment_stats1.stats_31_45.home.on + live_segment_stats1.stats_46_60.home.on + live_segment_stats1.stats_61_75.home.on + live_segment_stats1.stats_76_90.home.on)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_61_75.away.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.on}} ({{(live_segment_stats1.stats_61_75.away.on/(live_segment_stats1.stats_0_15.away.on + live_segment_stats1.stats_16_30.away.on + live_segment_stats1.stats_31_45.away.on + live_segment_stats1.stats_46_60.away.on + live_segment_stats1.stats_61_75.away.on + live_segment_stats1.stats_76_90.away.on)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_76_90.home.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.on}} ({{(live_segment_stats1.stats_76_90.home.on/(live_segment_stats1.stats_0_15.home.on + live_segment_stats1.stats_16_30.home.on + live_segment_stats1.stats_31_45.home.on + live_segment_stats1.stats_46_60.home.on + live_segment_stats1.stats_61_75.home.on + live_segment_stats1.stats_76_90.home.on)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_76_90.away.on == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.on}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.on}} ({{(live_segment_stats1.stats_76_90.away.on/(live_segment_stats1.stats_0_15.away.on + live_segment_stats1.stats_16_30.away.on + live_segment_stats1.stats_31_45.away.on + live_segment_stats1.stats_46_60.away.on + live_segment_stats1.stats_61_75.away.on + live_segment_stats1.stats_76_90.away.on)*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Off</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_0_15.home.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.off}} ({{(live_segment_stats1.stats_0_15.home.off/(live_segment_stats1.stats_0_15.home.off + live_segment_stats1.stats_16_30.home.off + live_segment_stats1.stats_31_45.home.off + live_segment_stats1.stats_46_60.home.off + live_segment_stats1.stats_61_75.home.off + live_segment_stats1.stats_76_90.home.off)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_0_15.away.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.away.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.off}} ({{(live_segment_stats1.stats_0_15.away.off/(live_segment_stats1.stats_0_15.away.off + live_segment_stats1.stats_16_30.away.off + live_segment_stats1.stats_31_45.away.off + live_segment_stats1.stats_46_60.away.off + live_segment_stats1.stats_61_75.away.off + live_segment_stats1.stats_76_90.away.off)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_16_30.home.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.off}} ({{(live_segment_stats1.stats_16_30.home.off/(live_segment_stats1.stats_0_15.home.off + live_segment_stats1.stats_16_30.home.off + live_segment_stats1.stats_31_45.home.off + live_segment_stats1.stats_46_60.home.off + live_segment_stats1.stats_61_75.home.off + live_segment_stats1.stats_76_90.home.off)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_16_30.away.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.off}} ({{(live_segment_stats1.stats_16_30.away.off/(live_segment_stats1.stats_0_15.away.off + live_segment_stats1.stats_16_30.away.off + live_segment_stats1.stats_31_45.away.off + live_segment_stats1.stats_46_60.away.off + live_segment_stats1.stats_61_75.away.off + live_segment_stats1.stats_76_90.away.off)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_31_45.home.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.off}} ({{(live_segment_stats1.stats_31_45.home.off/(live_segment_stats1.stats_0_15.home.off + live_segment_stats1.stats_16_30.home.off + live_segment_stats1.stats_31_45.home.off + live_segment_stats1.stats_46_60.home.off + live_segment_stats1.stats_61_75.home.off + live_segment_stats1.stats_76_90.home.off)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_31_45.away.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.off}} ({{(live_segment_stats1.stats_31_45.away.off/(live_segment_stats1.stats_0_15.away.off + live_segment_stats1.stats_16_30.away.off + live_segment_stats1.stats_31_45.away.off + live_segment_stats1.stats_46_60.away.off + live_segment_stats1.stats_61_75.away.off + live_segment_stats1.stats_76_90.away.off)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_46_60.home.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.off}} ({{(live_segment_stats1.stats_46_60.home.off/(live_segment_stats1.stats_0_15.home.off + live_segment_stats1.stats_16_30.home.off + live_segment_stats1.stats_31_45.home.off + live_segment_stats1.stats_46_60.home.off + live_segment_stats1.stats_61_75.home.off + live_segment_stats1.stats_76_90.home.off)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_46_60.away.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.off}} ({{(live_segment_stats1.stats_46_60.away.off/(live_segment_stats1.stats_0_15.away.off + live_segment_stats1.stats_16_30.away.off + live_segment_stats1.stats_31_45.away.off + live_segment_stats1.stats_46_60.away.off + live_segment_stats1.stats_61_75.away.off + live_segment_stats1.stats_76_90.away.off)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_61_75.home.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.off}} ({{(live_segment_stats1.stats_61_75.home.off/(live_segment_stats1.stats_0_15.home.off + live_segment_stats1.stats_16_30.home.off + live_segment_stats1.stats_31_45.home.off + live_segment_stats1.stats_46_60.home.off + live_segment_stats1.stats_61_75.home.off + live_segment_stats1.stats_76_90.home.off)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_61_75.away.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.off}} ({{(live_segment_stats1.stats_61_75.away.off/(live_segment_stats1.stats_0_15.away.off + live_segment_stats1.stats_16_30.away.off + live_segment_stats1.stats_31_45.away.off + live_segment_stats1.stats_46_60.away.off + live_segment_stats1.stats_61_75.away.off + live_segment_stats1.stats_76_90.away.off)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_76_90.home.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.off}} ({{(live_segment_stats1.stats_76_90.home.off/(live_segment_stats1.stats_0_15.home.off + live_segment_stats1.stats_16_30.home.off + live_segment_stats1.stats_31_45.home.off + live_segment_stats1.stats_46_60.home.off + live_segment_stats1.stats_61_75.home.off + live_segment_stats1.stats_76_90.home.off)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_76_90.away.off == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.off}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.off}} ({{(live_segment_stats1.stats_76_90.away.off/(live_segment_stats1.stats_0_15.away.off + live_segment_stats1.stats_16_30.away.off + live_segment_stats1.stats_31_45.away.off + live_segment_stats1.stats_46_60.away.off + live_segment_stats1.stats_61_75.away.off + live_segment_stats1.stats_76_90.away.off)*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Blk</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_0_15.home.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.blk}} ({{(live_segment_stats1.stats_0_15.home.blk/(live_segment_stats1.stats_0_15.home.blk + live_segment_stats1.stats_16_30.home.blk + live_segment_stats1.stats_31_45.home.blk + live_segment_stats1.stats_46_60.home.blk + live_segment_stats1.stats_61_75.home.blk + live_segment_stats1.stats_76_90.home.blk)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_0_15.away.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.away.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.blk}} ({{(live_segment_stats1.stats_0_15.away.blk/(live_segment_stats1.stats_0_15.away.blk + live_segment_stats1.stats_16_30.away.blk + live_segment_stats1.stats_31_45.away.blk + live_segment_stats1.stats_46_60.away.blk + live_segment_stats1.stats_61_75.away.blk + live_segment_stats1.stats_76_90.away.blk)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_16_30.home.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.blk}} ({{(live_segment_stats1.stats_16_30.home.blk/(live_segment_stats1.stats_0_15.home.blk + live_segment_stats1.stats_16_30.home.blk + live_segment_stats1.stats_31_45.home.blk + live_segment_stats1.stats_46_60.home.blk + live_segment_stats1.stats_61_75.home.blk + live_segment_stats1.stats_76_90.home.blk)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_16_30.away.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.blk}} ({{(live_segment_stats1.stats_16_30.away.blk/(live_segment_stats1.stats_0_15.away.blk + live_segment_stats1.stats_16_30.away.blk + live_segment_stats1.stats_31_45.away.blk + live_segment_stats1.stats_46_60.away.blk + live_segment_stats1.stats_61_75.away.blk + live_segment_stats1.stats_76_90.away.blk)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_31_45.home.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.blk}} ({{(live_segment_stats1.stats_31_45.home.blk/(live_segment_stats1.stats_0_15.home.blk + live_segment_stats1.stats_16_30.home.blk + live_segment_stats1.stats_31_45.home.blk + live_segment_stats1.stats_46_60.home.blk + live_segment_stats1.stats_61_75.home.blk + live_segment_stats1.stats_76_90.home.blk)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_31_45.away.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.blk}} ({{(live_segment_stats1.stats_31_45.away.blk/(live_segment_stats1.stats_0_15.away.blk + live_segment_stats1.stats_16_30.away.blk + live_segment_stats1.stats_31_45.away.blk + live_segment_stats1.stats_46_60.away.blk + live_segment_stats1.stats_61_75.away.blk + live_segment_stats1.stats_76_90.away.blk)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_46_60.home.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.blk}} ({{(live_segment_stats1.stats_46_60.home.blk/(live_segment_stats1.stats_0_15.home.blk + live_segment_stats1.stats_16_30.home.blk + live_segment_stats1.stats_31_45.home.blk + live_segment_stats1.stats_46_60.home.blk + live_segment_stats1.stats_61_75.home.blk + live_segment_stats1.stats_76_90.home.blk)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_46_60.away.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.blk}} ({{(live_segment_stats1.stats_46_60.away.blk/(live_segment_stats1.stats_0_15.away.blk + live_segment_stats1.stats_16_30.away.blk + live_segment_stats1.stats_31_45.away.blk + live_segment_stats1.stats_46_60.away.blk + live_segment_stats1.stats_61_75.away.blk + live_segment_stats1.stats_76_90.away.blk)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_61_75.home.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.blk}} ({{(live_segment_stats1.stats_61_75.home.blk/(live_segment_stats1.stats_0_15.home.blk + live_segment_stats1.stats_16_30.home.blk + live_segment_stats1.stats_31_45.home.blk + live_segment_stats1.stats_46_60.home.blk + live_segment_stats1.stats_61_75.home.blk + live_segment_stats1.stats_76_90.home.blk)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_61_75.away.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.blk}} ({{(live_segment_stats1.stats_61_75.away.blk/(live_segment_stats1.stats_0_15.away.blk + live_segment_stats1.stats_16_30.away.blk + live_segment_stats1.stats_31_45.away.blk + live_segment_stats1.stats_46_60.away.blk + live_segment_stats1.stats_61_75.away.blk + live_segment_stats1.stats_76_90.away.blk)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_76_90.home.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.blk}} ({{(live_segment_stats1.stats_76_90.home.blk/(live_segment_stats1.stats_0_15.home.blk + live_segment_stats1.stats_16_30.home.blk + live_segment_stats1.stats_31_45.home.blk + live_segment_stats1.stats_46_60.home.blk + live_segment_stats1.stats_61_75.home.blk + live_segment_stats1.stats_76_90.home.blk)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_76_90.away.blk == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.blk}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.blk}} ({{(live_segment_stats1.stats_76_90.away.blk/(live_segment_stats1.stats_0_15.away.blk + live_segment_stats1.stats_16_30.away.blk + live_segment_stats1.stats_31_45.away.blk + live_segment_stats1.stats_46_60.away.blk + live_segment_stats1.stats_61_75.away.blk + live_segment_stats1.stats_76_90.away.blk)*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">In</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_0_15.home.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.in}} ({{(live_segment_stats1.stats_0_15.home.in/(live_segment_stats1.stats_0_15.home.in + live_segment_stats1.stats_16_30.home.in + live_segment_stats1.stats_31_45.home.in + live_segment_stats1.stats_46_60.home.in + live_segment_stats1.stats_61_75.home.in + live_segment_stats1.stats_76_90.home.in)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_0_15.away.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.away.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.in}} ({{(live_segment_stats1.stats_0_15.away.in/(live_segment_stats1.stats_0_15.away.in + live_segment_stats1.stats_16_30.away.in + live_segment_stats1.stats_31_45.away.in + live_segment_stats1.stats_46_60.away.in + live_segment_stats1.stats_61_75.away.in + live_segment_stats1.stats_76_90.away.in)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_16_30.home.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.in}} ({{(live_segment_stats1.stats_16_30.home.in/(live_segment_stats1.stats_0_15.home.in + live_segment_stats1.stats_16_30.home.in + live_segment_stats1.stats_31_45.home.in + live_segment_stats1.stats_46_60.home.in + live_segment_stats1.stats_61_75.home.in + live_segment_stats1.stats_76_90.home.in)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_16_30.away.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.in}} ({{(live_segment_stats1.stats_16_30.away.in/(live_segment_stats1.stats_0_15.away.in + live_segment_stats1.stats_16_30.away.in + live_segment_stats1.stats_31_45.away.in + live_segment_stats1.stats_46_60.away.in + live_segment_stats1.stats_61_75.away.in + live_segment_stats1.stats_76_90.away.in)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_31_45.home.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.in}} ({{(live_segment_stats1.stats_31_45.home.in/(live_segment_stats1.stats_0_15.home.in + live_segment_stats1.stats_16_30.home.in + live_segment_stats1.stats_31_45.home.in + live_segment_stats1.stats_46_60.home.in + live_segment_stats1.stats_61_75.home.in + live_segment_stats1.stats_76_90.home.in)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_31_45.away.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.in}} ({{(live_segment_stats1.stats_31_45.away.in/(live_segment_stats1.stats_0_15.away.in + live_segment_stats1.stats_16_30.away.in + live_segment_stats1.stats_31_45.away.in + live_segment_stats1.stats_46_60.away.in + live_segment_stats1.stats_61_75.away.in + live_segment_stats1.stats_76_90.away.in)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_46_60.home.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.in}} ({{(live_segment_stats1.stats_46_60.home.in/(live_segment_stats1.stats_0_15.home.in + live_segment_stats1.stats_16_30.home.in + live_segment_stats1.stats_31_45.home.in + live_segment_stats1.stats_46_60.home.in + live_segment_stats1.stats_61_75.home.in + live_segment_stats1.stats_76_90.home.in)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_46_60.away.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.in}} ({{(live_segment_stats1.stats_46_60.away.in/(live_segment_stats1.stats_0_15.away.in + live_segment_stats1.stats_16_30.away.in + live_segment_stats1.stats_31_45.away.in + live_segment_stats1.stats_46_60.away.in + live_segment_stats1.stats_61_75.away.in + live_segment_stats1.stats_76_90.away.in)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_61_75.home.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.in}} ({{(live_segment_stats1.stats_61_75.home.in/(live_segment_stats1.stats_0_15.home.in + live_segment_stats1.stats_16_30.home.in + live_segment_stats1.stats_31_45.home.in + live_segment_stats1.stats_46_60.home.in + live_segment_stats1.stats_61_75.home.in + live_segment_stats1.stats_76_90.home.in)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_61_75.away.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.in}} ({{(live_segment_stats1.stats_61_75.away.in/(live_segment_stats1.stats_0_15.away.in + live_segment_stats1.stats_16_30.away.in + live_segment_stats1.stats_31_45.away.in + live_segment_stats1.stats_46_60.away.in + live_segment_stats1.stats_61_75.away.in + live_segment_stats1.stats_76_90.away.in)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_76_90.home.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.in}} ({{(live_segment_stats1.stats_76_90.home.in/(live_segment_stats1.stats_0_15.home.in + live_segment_stats1.stats_16_30.home.in + live_segment_stats1.stats_31_45.home.in + live_segment_stats1.stats_46_60.home.in + live_segment_stats1.stats_61_75.home.in + live_segment_stats1.stats_76_90.home.in)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_76_90.away.in == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.in}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.in}} ({{(live_segment_stats1.stats_76_90.away.in/(live_segment_stats1.stats_0_15.away.in + live_segment_stats1.stats_16_30.away.in + live_segment_stats1.stats_31_45.away.in + live_segment_stats1.stats_46_60.away.in + live_segment_stats1.stats_61_75.away.in + live_segment_stats1.stats_76_90.away.in)*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Out</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_0_15.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.out}} ({{(live_segment_stats1.stats_0_15.home.out/(live_segment_stats1.stats_0_15.home.out + live_segment_stats1.stats_16_30.home.out + live_segment_stats1.stats_31_45.home.out + live_segment_stats1.stats_46_60.home.out + live_segment_stats1.stats_61_75.home.out + live_segment_stats1.stats_76_90.home.out)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_0_15.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.away.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.out}} ({{(live_segment_stats1.stats_0_15.away.out/(live_segment_stats1.stats_0_15.away.out + live_segment_stats1.stats_16_30.away.out + live_segment_stats1.stats_31_45.away.out + live_segment_stats1.stats_46_60.away.out + live_segment_stats1.stats_61_75.away.out + live_segment_stats1.stats_76_90.away.out)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_16_30.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.out}} ({{(live_segment_stats1.stats_16_30.home.out/(live_segment_stats1.stats_0_15.home.out + live_segment_stats1.stats_16_30.home.out + live_segment_stats1.stats_31_45.home.out + live_segment_stats1.stats_46_60.home.out + live_segment_stats1.stats_61_75.home.out + live_segment_stats1.stats_76_90.home.out)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_16_30.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.out}} ({{(live_segment_stats1.stats_16_30.away.out/(live_segment_stats1.stats_0_15.away.out + live_segment_stats1.stats_16_30.away.out + live_segment_stats1.stats_31_45.away.out + live_segment_stats1.stats_46_60.away.out + live_segment_stats1.stats_61_75.away.out + live_segment_stats1.stats_76_90.away.out)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_31_45.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.out}} ({{(live_segment_stats1.stats_31_45.home.out/(live_segment_stats1.stats_0_15.home.out + live_segment_stats1.stats_16_30.home.out + live_segment_stats1.stats_31_45.home.out + live_segment_stats1.stats_46_60.home.out + live_segment_stats1.stats_61_75.home.out + live_segment_stats1.stats_76_90.home.out)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_31_45.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.out}} ({{(live_segment_stats1.stats_31_45.away.out/(live_segment_stats1.stats_0_15.away.out + live_segment_stats1.stats_16_30.away.out + live_segment_stats1.stats_31_45.away.out + live_segment_stats1.stats_46_60.away.out + live_segment_stats1.stats_61_75.away.out + live_segment_stats1.stats_76_90.away.out)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_46_60.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.out}} ({{(live_segment_stats1.stats_46_60.home.out/(live_segment_stats1.stats_0_15.home.out + live_segment_stats1.stats_16_30.home.out + live_segment_stats1.stats_31_45.home.out + live_segment_stats1.stats_46_60.home.out + live_segment_stats1.stats_61_75.home.out + live_segment_stats1.stats_76_90.home.out)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_46_60.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.out}} ({{(live_segment_stats1.stats_46_60.away.out/(live_segment_stats1.stats_0_15.away.out + live_segment_stats1.stats_16_30.away.out + live_segment_stats1.stats_31_45.away.out + live_segment_stats1.stats_46_60.away.out + live_segment_stats1.stats_61_75.away.out + live_segment_stats1.stats_76_90.away.out)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_61_75.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.out}} ({{(live_segment_stats1.stats_61_75.home.out/(live_segment_stats1.stats_0_15.home.out + live_segment_stats1.stats_16_30.home.out + live_segment_stats1.stats_31_45.home.out + live_segment_stats1.stats_46_60.home.out + live_segment_stats1.stats_61_75.home.out + live_segment_stats1.stats_76_90.home.out)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_61_75.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.out}} ({{(live_segment_stats1.stats_61_75.away.out/(live_segment_stats1.stats_0_15.away.out + live_segment_stats1.stats_16_30.away.out + live_segment_stats1.stats_31_45.away.out + live_segment_stats1.stats_46_60.away.out + live_segment_stats1.stats_61_75.away.out + live_segment_stats1.stats_76_90.away.out)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats.stats_76_90.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.out}} ({{(live_segment_stats1.stats_76_90.home.out/(live_segment_stats1.stats_0_15.home.out + live_segment_stats1.stats_16_30.home.out + live_segment_stats1.stats_31_45.home.out + live_segment_stats1.stats_46_60.home.out + live_segment_stats1.stats_61_75.home.out + live_segment_stats1.stats_76_90.home.out)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_76_90.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.out}} ({{(live_segment_stats1.stats_76_90.away.out/(live_segment_stats1.stats_0_15.away.out + live_segment_stats1.stats_16_30.away.out + live_segment_stats1.stats_31_45.away.out + live_segment_stats1.stats_46_60.away.out + live_segment_stats1.stats_61_75.away.out + live_segment_stats1.stats_76_90.away.out)*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Cnr</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_0_15.home.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.cnr}} ({{(live_segment_stats1.stats_0_15.home.cnr/(live_segment_stats1.stats_0_15.home.cnr + live_segment_stats1.stats_16_30.home.cnr + live_segment_stats1.stats_31_45.home.cnr + live_segment_stats1.stats_46_60.home.cnr + live_segment_stats1.stats_61_75.home.cnr + live_segment_stats1.stats_76_90.home.cnr)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_0_15.away.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.away.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.cnr}} ({{(live_segment_stats1.stats_0_15.away.cnr/(live_segment_stats1.stats_0_15.away.cnr + live_segment_stats1.stats_16_30.away.cnr + live_segment_stats1.stats_31_45.away.cnr + live_segment_stats1.stats_46_60.away.cnr + live_segment_stats1.stats_61_75.away.cnr + live_segment_stats1.stats_76_90.away.cnr)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_16_30.home.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.cnr}} ({{(live_segment_stats1.stats_16_30.home.cnr/(live_segment_stats1.stats_0_15.home.cnr + live_segment_stats1.stats_16_30.home.cnr + live_segment_stats1.stats_31_45.home.cnr + live_segment_stats1.stats_46_60.home.cnr + live_segment_stats1.stats_61_75.home.cnr + live_segment_stats1.stats_76_90.home.cnr)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_16_30.away.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.cnr}} ({{(live_segment_stats1.stats_16_30.away.cnr/(live_segment_stats1.stats_0_15.away.cnr + live_segment_stats1.stats_16_30.away.cnr + live_segment_stats1.stats_31_45.away.cnr + live_segment_stats1.stats_46_60.away.cnr + live_segment_stats1.stats_61_75.away.cnr + live_segment_stats1.stats_76_90.away.cnr)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_31_45.home.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.cnr}} ({{(live_segment_stats1.stats_31_45.home.cnr/(live_segment_stats1.stats_0_15.home.cnr + live_segment_stats1.stats_16_30.home.cnr + live_segment_stats1.stats_31_45.home.cnr + live_segment_stats1.stats_46_60.home.cnr + live_segment_stats1.stats_61_75.home.cnr + live_segment_stats1.stats_76_90.home.cnr)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_31_45.away.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.cnr}} ({{(live_segment_stats1.stats_31_45.away.cnr/(live_segment_stats1.stats_0_15.away.cnr + live_segment_stats1.stats_16_30.away.cnr + live_segment_stats1.stats_31_45.away.cnr + live_segment_stats1.stats_46_60.away.cnr + live_segment_stats1.stats_61_75.away.cnr + live_segment_stats1.stats_76_90.away.cnr)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_46_60.home.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.cnr}} ({{(live_segment_stats1.stats_46_60.home.cnr/(live_segment_stats1.stats_0_15.home.cnr + live_segment_stats1.stats_16_30.home.cnr + live_segment_stats1.stats_31_45.home.cnr + live_segment_stats1.stats_46_60.home.cnr + live_segment_stats1.stats_61_75.home.cnr + live_segment_stats1.stats_76_90.home.cnr)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_46_60.away.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.cnr}} ({{(live_segment_stats1.stats_46_60.away.cnr/(live_segment_stats1.stats_0_15.away.cnr + live_segment_stats1.stats_16_30.away.cnr + live_segment_stats1.stats_31_45.away.cnr + live_segment_stats1.stats_46_60.away.cnr + live_segment_stats1.stats_61_75.away.cnr + live_segment_stats1.stats_76_90.away.cnr)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_61_75.home.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.cnr}} ({{(live_segment_stats1.stats_61_75.home.cnr/(live_segment_stats1.stats_0_15.home.cnr + live_segment_stats1.stats_16_30.home.cnr + live_segment_stats1.stats_31_45.home.cnr + live_segment_stats1.stats_46_60.home.cnr + live_segment_stats1.stats_61_75.home.cnr + live_segment_stats1.stats_76_90.home.cnr)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_61_75.away.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.cnr}} ({{(live_segment_stats1.stats_61_75.away.cnr/(live_segment_stats1.stats_0_15.away.cnr + live_segment_stats1.stats_16_30.away.cnr + live_segment_stats1.stats_31_45.away.cnr + live_segment_stats1.stats_46_60.away.cnr + live_segment_stats1.stats_61_75.away.cnr + live_segment_stats1.stats_76_90.away.cnr)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_76_90.home.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.cnr}} ({{(live_segment_stats1.stats_76_90.home.cnr/(live_segment_stats1.stats_0_15.home.cnr + live_segment_stats1.stats_16_30.home.cnr + live_segment_stats1.stats_31_45.home.cnr + live_segment_stats1.stats_46_60.home.cnr + live_segment_stats1.stats_61_75.home.cnr + live_segment_stats1.stats_76_90.home.cnr)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_76_90.away.cnr == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.cnr}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.cnr}} ({{(live_segment_stats1.stats_76_90.away.cnr/(live_segment_stats1.stats_0_15.away.cnr + live_segment_stats1.stats_16_30.away.cnr + live_segment_stats1.stats_31_45.away.cnr + live_segment_stats1.stats_46_60.away.cnr + live_segment_stats1.stats_61_75.away.cnr + live_segment_stats1.stats_76_90.away.cnr)*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">DA</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_0_15.home.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.da}} ({{(live_segment_stats1.stats_0_15.home.da/(live_segment_stats1.stats_0_15.home.da + live_segment_stats1.stats_16_30.home.da + live_segment_stats1.stats_31_45.home.da + live_segment_stats1.stats_46_60.home.da + live_segment_stats1.stats_61_75.home.da + live_segment_stats1.stats_76_90.home.da)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_0_15.away.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.away.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.da}} ({{(live_segment_stats1.stats_0_15.away.da/(live_segment_stats1.stats_0_15.away.da + live_segment_stats1.stats_16_30.away.da + live_segment_stats1.stats_31_45.away.da + live_segment_stats1.stats_46_60.away.da + live_segment_stats1.stats_61_75.away.da + live_segment_stats1.stats_76_90.away.da)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_16_30.home.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.da}} ({{(live_segment_stats1.stats_16_30.home.da/(live_segment_stats1.stats_0_15.home.da + live_segment_stats1.stats_16_30.home.da + live_segment_stats1.stats_31_45.home.da + live_segment_stats1.stats_46_60.home.da + live_segment_stats1.stats_61_75.home.da + live_segment_stats1.stats_76_90.home.da)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_16_30.away.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.da}} ({{(live_segment_stats1.stats_16_30.away.da/(live_segment_stats1.stats_0_15.away.da + live_segment_stats1.stats_16_30.away.da + live_segment_stats1.stats_31_45.away.da + live_segment_stats1.stats_46_60.away.da + live_segment_stats1.stats_61_75.away.da + live_segment_stats1.stats_76_90.away.da)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_31_45.home.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.da}} ({{(live_segment_stats1.stats_31_45.home.da/(live_segment_stats1.stats_0_15.home.da + live_segment_stats1.stats_16_30.home.da + live_segment_stats1.stats_31_45.home.da + live_segment_stats1.stats_46_60.home.da + live_segment_stats1.stats_61_75.home.da + live_segment_stats1.stats_76_90.home.da)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_31_45.away.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.da}} ({{(live_segment_stats1.stats_31_45.away.da/(live_segment_stats1.stats_0_15.away.da + live_segment_stats1.stats_16_30.away.da + live_segment_stats1.stats_31_45.away.da + live_segment_stats1.stats_46_60.away.da + live_segment_stats1.stats_61_75.away.da + live_segment_stats1.stats_76_90.away.da)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_46_60.home.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.da}} ({{(live_segment_stats1.stats_46_60.home.da/(live_segment_stats1.stats_0_15.home.da + live_segment_stats1.stats_16_30.home.da + live_segment_stats1.stats_31_45.home.da + live_segment_stats1.stats_46_60.home.da + live_segment_stats1.stats_61_75.home.da + live_segment_stats1.stats_76_90.home.da)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_46_60.away.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.da}} ({{(live_segment_stats1.stats_46_60.away.da/(live_segment_stats1.stats_0_15.away.da + live_segment_stats1.stats_16_30.away.da + live_segment_stats1.stats_31_45.away.da + live_segment_stats1.stats_46_60.away.da + live_segment_stats1.stats_61_75.away.da + live_segment_stats1.stats_76_90.away.da)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_61_75.home.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.da}} ({{(live_segment_stats1.stats_61_75.home.da/(live_segment_stats1.stats_0_15.home.da + live_segment_stats1.stats_16_30.home.da + live_segment_stats1.stats_31_45.home.da + live_segment_stats1.stats_46_60.home.da + live_segment_stats1.stats_61_75.home.da + live_segment_stats1.stats_76_90.home.da)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_61_75.away.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.da}} ({{(live_segment_stats1.stats_61_75.away.da/(live_segment_stats1.stats_0_15.away.da + live_segment_stats1.stats_16_30.away.da + live_segment_stats1.stats_31_45.away.da + live_segment_stats1.stats_46_60.away.da + live_segment_stats1.stats_61_75.away.da + live_segment_stats1.stats_76_90.away.da)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_76_90.home.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.da}} ({{(live_segment_stats1.stats_76_90.home.da/(live_segment_stats1.stats_0_15.home.da + live_segment_stats1.stats_16_30.home.da + live_segment_stats1.stats_31_45.home.da + live_segment_stats1.stats_46_60.home.da + live_segment_stats1.stats_61_75.home.da + live_segment_stats1.stats_76_90.home.da)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_76_90.away.da == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.da}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.da}} ({{(live_segment_stats1.stats_76_90.away.da/(live_segment_stats1.stats_0_15.away.da + live_segment_stats1.stats_16_30.away.da + live_segment_stats1.stats_31_45.away.da + live_segment_stats1.stats_46_60.away.da + live_segment_stats1.stats_61_75.away.da + live_segment_stats1.stats_76_90.away.da)*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Pos</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_0_15.home.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.pos}} ({{(live_segment_stats1.stats_0_15.home.pos/(live_segment_stats1.stats_0_15.home.pos + live_segment_stats1.stats_16_30.home.pos + live_segment_stats1.stats_31_45.home.pos + live_segment_stats1.stats_46_60.home.pos + live_segment_stats1.stats_61_75.home.pos + live_segment_stats1.stats_76_90.home.pos)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_0_15.away.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.away.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.pos}} ({{(live_segment_stats1.stats_0_15.away.pos/(live_segment_stats1.stats_0_15.away.pos + live_segment_stats1.stats_16_30.away.pos + live_segment_stats1.stats_31_45.away.pos + live_segment_stats1.stats_46_60.away.pos + live_segment_stats1.stats_61_75.away.pos + live_segment_stats1.stats_76_90.away.pos)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_16_30.home.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.pos}} ({{(live_segment_stats1.stats_16_30.home.pos/(live_segment_stats1.stats_0_15.home.pos + live_segment_stats1.stats_16_30.home.pos + live_segment_stats1.stats_31_45.home.pos + live_segment_stats1.stats_46_60.home.pos + live_segment_stats1.stats_61_75.home.pos + live_segment_stats1.stats_76_90.home.pos)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_16_30.away.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.pos}} ({{(live_segment_stats1.stats_16_30.away.pos/(live_segment_stats1.stats_0_15.away.pos + live_segment_stats1.stats_16_30.away.pos + live_segment_stats1.stats_31_45.away.pos + live_segment_stats1.stats_46_60.away.pos + live_segment_stats1.stats_61_75.away.pos + live_segment_stats1.stats_76_90.away.pos)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_31_45.home.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.pos}} ({{(live_segment_stats1.stats_31_45.home.pos/(live_segment_stats1.stats_0_15.home.pos + live_segment_stats1.stats_16_30.home.pos + live_segment_stats1.stats_31_45.home.pos + live_segment_stats1.stats_46_60.home.pos + live_segment_stats1.stats_61_75.home.pos + live_segment_stats1.stats_76_90.home.pos)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_31_45.away.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.pos}} ({{(live_segment_stats1.stats_31_45.away.pos/(live_segment_stats1.stats_0_15.away.pos + live_segment_stats1.stats_16_30.away.pos + live_segment_stats1.stats_31_45.away.pos + live_segment_stats1.stats_46_60.away.pos + live_segment_stats1.stats_61_75.away.pos + live_segment_stats1.stats_76_90.away.pos)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_46_60.home.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.pos}} ({{(live_segment_stats1.stats_46_60.home.pos/(live_segment_stats1.stats_0_15.home.pos + live_segment_stats1.stats_16_30.home.pos + live_segment_stats1.stats_31_45.home.pos + live_segment_stats1.stats_46_60.home.pos + live_segment_stats1.stats_61_75.home.pos + live_segment_stats1.stats_76_90.home.pos)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_46_60.away.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.pos}} ({{(live_segment_stats1.stats_46_60.away.pos/(live_segment_stats1.stats_0_15.away.pos + live_segment_stats1.stats_16_30.away.pos + live_segment_stats1.stats_31_45.away.pos + live_segment_stats1.stats_46_60.away.pos + live_segment_stats1.stats_61_75.away.pos + live_segment_stats1.stats_76_90.away.pos)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_61_75.home.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.pos}} ({{(live_segment_stats1.stats_61_75.home.pos/(live_segment_stats1.stats_0_15.home.pos + live_segment_stats1.stats_16_30.home.pos + live_segment_stats1.stats_31_45.home.pos + live_segment_stats1.stats_46_60.home.pos + live_segment_stats1.stats_61_75.home.pos + live_segment_stats1.stats_76_90.home.pos)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_61_75.away.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.pos}} ({{(live_segment_stats1.stats_61_75.away.pos/(live_segment_stats1.stats_0_15.away.pos + live_segment_stats1.stats_16_30.away.pos + live_segment_stats1.stats_31_45.away.pos + live_segment_stats1.stats_46_60.away.pos + live_segment_stats1.stats_61_75.away.pos + live_segment_stats1.stats_76_90.away.pos)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_76_90.home.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.pos}} ({{(live_segment_stats1.stats_76_90.home.pos/(live_segment_stats1.stats_0_15.home.pos + live_segment_stats1.stats_16_30.home.pos + live_segment_stats1.stats_31_45.home.pos + live_segment_stats1.stats_46_60.home.pos + live_segment_stats1.stats_61_75.home.pos + live_segment_stats1.stats_76_90.home.pos)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_76_90.away.pos == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.pos}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.pos}} ({{(live_segment_stats1.stats_76_90.away.pos/(live_segment_stats1.stats_0_15.away.pos + live_segment_stats1.stats_16_30.away.pos + live_segment_stats1.stats_31_45.away.pos + live_segment_stats1.stats_46_60.away.pos + live_segment_stats1.stats_61_75.away.pos + live_segment_stats1.stats_76_90.away.pos)*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Red</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_0_15.home.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.red}} ({{(live_segment_stats1.stats_0_15.home.red/(live_segment_stats1.stats_0_15.home.red + live_segment_stats1.stats_16_30.home.red + live_segment_stats1.stats_31_45.home.red + live_segment_stats1.stats_46_60.home.red + live_segment_stats1.stats_61_75.home.red + live_segment_stats1.stats_76_90.home.red)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_0_15.away.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.away.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.red}} ({{(live_segment_stats1.stats_0_15.away.red/(live_segment_stats1.stats_0_15.away.red + live_segment_stats1.stats_16_30.away.red + live_segment_stats1.stats_31_45.away.red + live_segment_stats1.stats_46_60.away.red + live_segment_stats1.stats_61_75.away.red + live_segment_stats1.stats_76_90.away.red)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_16_30.home.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.red}} ({{(live_segment_stats1.stats_16_30.home.red/(live_segment_stats1.stats_0_15.home.red + live_segment_stats1.stats_16_30.home.red + live_segment_stats1.stats_31_45.home.red + live_segment_stats1.stats_46_60.home.red + live_segment_stats1.stats_61_75.home.red + live_segment_stats1.stats_76_90.home.red)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_16_30.away.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.red}} ({{(live_segment_stats1.stats_16_30.away.red/(live_segment_stats1.stats_0_15.away.red + live_segment_stats1.stats_16_30.away.red + live_segment_stats1.stats_31_45.away.red + live_segment_stats1.stats_46_60.away.red + live_segment_stats1.stats_61_75.away.red + live_segment_stats1.stats_76_90.away.red)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_31_45.home.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.red}} ({{(live_segment_stats1.stats_31_45.home.red/(live_segment_stats1.stats_0_15.home.red + live_segment_stats1.stats_16_30.home.red + live_segment_stats1.stats_31_45.home.red + live_segment_stats1.stats_46_60.home.red + live_segment_stats1.stats_61_75.home.red + live_segment_stats1.stats_76_90.home.red)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_31_45.away.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.red}} ({{(live_segment_stats1.stats_31_45.away.red/(live_segment_stats1.stats_0_15.away.red + live_segment_stats1.stats_16_30.away.red + live_segment_stats1.stats_31_45.away.red + live_segment_stats1.stats_46_60.away.red + live_segment_stats1.stats_61_75.away.red + live_segment_stats1.stats_76_90.away.red)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_46_60.home.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.red}} ({{(live_segment_stats1.stats_46_60.home.red/(live_segment_stats1.stats_0_15.home.red + live_segment_stats1.stats_16_30.home.red + live_segment_stats1.stats_31_45.home.red + live_segment_stats1.stats_46_60.home.red + live_segment_stats1.stats_61_75.home.red + live_segment_stats1.stats_76_90.home.red)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_46_60.away.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.red}} ({{(live_segment_stats1.stats_46_60.away.red/(live_segment_stats1.stats_0_15.away.red + live_segment_stats1.stats_16_30.away.red + live_segment_stats1.stats_31_45.away.red + live_segment_stats1.stats_46_60.away.red + live_segment_stats1.stats_61_75.away.red + live_segment_stats1.stats_76_90.away.red)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_61_75.home.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.red}} ({{(live_segment_stats1.stats_61_75.home.red/(live_segment_stats1.stats_0_15.home.red + live_segment_stats1.stats_16_30.home.red + live_segment_stats1.stats_31_45.home.red + live_segment_stats1.stats_46_60.home.red + live_segment_stats1.stats_61_75.home.red + live_segment_stats1.stats_76_90.home.red)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_61_75.away.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.red}} ({{(live_segment_stats1.stats_61_75.away.red/(live_segment_stats1.stats_0_15.away.red + live_segment_stats1.stats_16_30.away.red + live_segment_stats1.stats_31_45.away.red + live_segment_stats1.stats_46_60.away.red + live_segment_stats1.stats_61_75.away.red + live_segment_stats1.stats_76_90.away.red)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_76_90.home.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.red}} ({{(live_segment_stats1.stats_76_90.home.red/(live_segment_stats1.stats_0_15.home.red + live_segment_stats1.stats_16_30.home.red + live_segment_stats1.stats_31_45.home.red + live_segment_stats1.stats_46_60.home.red + live_segment_stats1.stats_61_75.home.red + live_segment_stats1.stats_76_90.home.red)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_76_90.away.red == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.red}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.red}} ({{(live_segment_stats1.stats_76_90.away.red/(live_segment_stats1.stats_0_15.away.red + live_segment_stats1.stats_16_30.away.red + live_segment_stats1.stats_31_45.away.red + live_segment_stats1.stats_46_60.away.red + live_segment_stats1.stats_61_75.away.red + live_segment_stats1.stats_76_90.away.red)*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <p class="header">Yel</p>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_0_15.home.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.yel}} ({{(live_segment_stats1.stats_0_15.home.yel/(live_segment_stats1.stats_0_15.home.yel + live_segment_stats1.stats_16_30.home.yel + live_segment_stats1.stats_31_45.home.yel + live_segment_stats1.stats_46_60.home.yel + live_segment_stats1.stats_61_75.home.yel + live_segment_stats1.stats_76_90.home.yel)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_0_15.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.away.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_0_15.home.yel}} ({{(live_segment_stats1.stats_0_15.away.yel/(live_segment_stats1.stats_0_15.away.yel + live_segment_stats1.stats_16_30.away.yel + live_segment_stats1.stats_31_45.away.yel + live_segment_stats1.stats_46_60.away.yel + live_segment_stats1.stats_61_75.away.yel + live_segment_stats1.stats_76_90.away.yel)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_16_30.home.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.home.yel}} ({{(live_segment_stats1.stats_16_30.home.yel/(live_segment_stats1.stats_0_15.home.yel + live_segment_stats1.stats_16_30.home.yel + live_segment_stats1.stats_31_45.home.yel + live_segment_stats1.stats_46_60.home.yel + live_segment_stats1.stats_61_75.home.yel + live_segment_stats1.stats_76_90.home.yel)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats.stats_16_30.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.yel}} ({{(live_segment_stats1.stats_16_30.away.yel/(live_segment_stats1.stats_0_15.away.yel + live_segment_stats1.stats_16_30.away.yel + live_segment_stats1.stats_31_45.away.yel + live_segment_stats1.stats_46_60.away.yel + live_segment_stats1.stats_61_75.away.yel + live_segment_stats1.stats_76_90.away.yel)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_31_45.home.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.home.yel}} ({{(live_segment_stats1.stats_31_45.home.yel/(live_segment_stats1.stats_0_15.home.yel + live_segment_stats1.stats_16_30.home.yel + live_segment_stats1.stats_31_45.home.yel + live_segment_stats1.stats_46_60.home.yel + live_segment_stats1.stats_61_75.home.yel + live_segment_stats1.stats_76_90.home.yel)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_31_45.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_31_45.away.yel}} ({{(live_segment_stats1.stats_31_45.away.yel/(live_segment_stats1.stats_0_15.away.yel + live_segment_stats1.stats_16_30.away.yel + live_segment_stats1.stats_31_45.away.yel + live_segment_stats1.stats_46_60.away.yel + live_segment_stats1.stats_61_75.away.yel + live_segment_stats1.stats_76_90.away.yel)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_46_60.home.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.home.yel}} ({{(live_segment_stats1.stats_46_60.home.yel/(live_segment_stats1.stats_0_15.home.yel + live_segment_stats1.stats_16_30.home.yel + live_segment_stats1.stats_31_45.home.yel + live_segment_stats1.stats_46_60.home.yel + live_segment_stats1.stats_61_75.home.yel + live_segment_stats1.stats_76_90.home.yel)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_46_60.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_46_60.away.yel}} ({{(live_segment_stats1.stats_46_60.away.yel/(live_segment_stats1.stats_0_15.away.yel + live_segment_stats1.stats_16_30.away.yel + live_segment_stats1.stats_31_45.away.yel + live_segment_stats1.stats_46_60.away.yel + live_segment_stats1.stats_61_75.away.yel + live_segment_stats1.stats_76_90.away.yel)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_61_75.home.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.home.yel}} ({{(live_segment_stats1.stats_61_75.home.yel/(live_segment_stats1.stats_0_15.home.yel + live_segment_stats1.stats_16_30.home.yel + live_segment_stats1.stats_31_45.home.yel + live_segment_stats1.stats_46_60.home.yel + live_segment_stats1.stats_61_75.home.yel + live_segment_stats1.stats_76_90.home.yel)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_61_75.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_61_75.away.yel}} ({{(live_segment_stats1.stats_61_75.away.yel/(live_segment_stats1.stats_0_15.away.yel + live_segment_stats1.stats_16_30.away.yel + live_segment_stats1.stats_31_45.away.yel + live_segment_stats1.stats_46_60.away.yel + live_segment_stats1.stats_61_75.away.yel + live_segment_stats1.stats_76_90.away.yel)*100).toFixed(0)}}%)</div>
                            </div>
                            <div class="value stats-cell">
                                <div v-if="live_segment_stats1.stats_76_90.home.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.yel}} ({{(live_segment_stats1.stats_76_90.home.yel/(live_segment_stats1.stats_0_15.home.yel + live_segment_stats1.stats_16_30.home.yel + live_segment_stats1.stats_31_45.home.yel + live_segment_stats1.stats_46_60.home.yel + live_segment_stats1.stats_61_75.home.yel + live_segment_stats1.stats_76_90.home.yel)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_76_90.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.yel}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.yel}} ({{(live_segment_stats1.stats_76_90.away.yel/(live_segment_stats1.stats_0_15.away.yel + live_segment_stats1.stats_16_30.away.yel + live_segment_stats1.stats_31_45.away.yel + live_segment_stats1.stats_46_60.away.yel + live_segment_stats1.stats_61_75.away.yel + live_segment_stats1.stats_76_90.away.yel)*100).toFixed(0)}}%)</div>
                            </div>
                        </div>
                    </div>
                </div>
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
                eventList:[{'label': 'select an event', 'value': null}],
                leagues: [{"league": '', 'value': 0, 'label': 'select league'}],
                selected_league: null,
                homeTeam:{
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
                },
                awayTeam:{
                    'minute': {
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
                },
                origin_events: [],
                total_home_stats:{
                    'competition': '',
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
                },
                total_away_stats:{
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
                },
                dateList1: [],
                dateList2:[],
                avg_home_stats:{
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
                },
                avg_away_stats:{
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
                },
                delta_home_index:{
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
                delta_away_index:{
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
                stats_segment:{
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
                },
                matches_found: 0,
                missed_matches_found: 0,
                filtered_result: 0,
                missed_filtered_result: 0,
                total_live_home_stats:{
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
                total_live_away_stats:{
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
                live_segment_stats:{
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
                },
                live_segment_stats1:{
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
                },
                delta_home_stats:{
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
                },
                delta_away_stats:{
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
                },
                score_minute_filter:{
                    'minute':{
                        'from': 0,
                        'to': 1000
                    },
                    'over05':{
                        'from': 0,
                        'to': 1000
                    },
                    'over15':{
                        'from': 0,
                        'to': 1000
                    },
                    'over25':{
                        'from': 0,
                        'to': 1000
                    },
                    'over35':{
                        'from': 0,
                        'to': 1000
                    },
                    'under05':{
                        'from': 0,
                        'to': 1000
                    },
                    'under15':{
                        'from': 0,
                        'to': 1000
                    },
                    'under25':{
                        'from': 0,
                        'to': 1000
                    },
                    'under35':{
                        'from': 0,
                        'to': 1000
                    },
                    'home':{
                        'from': 0,
                        'to': 1000
                    },
                    'draws':{
                        'from': 0,
                        'to': 1000
                    },
                    'away':{
                        'from': 0,
                        'to': 1000
                    },
                    'bts':{
                        'from': 0,
                        'to': 1000
                    },
                    'odd':{
                        'from': 0,
                        'to': 1000
                    },
                    'even':{
                        'from': 0,
                        'to': 1000
                    }
                },
                live_segment_stats2:{
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
                },
            }
        },
        methods: {
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
            from_date_f(val){
                console.log(val)
                this.from_date = val
                this.end_date = val
                let new_dateList = []
                for(let i = 0 ; i < this.dateList1.length ; i++){
                    if(this.dateList1[i].value >= this.from_date){
                        new_dateList.push(this.dateList1[i])
                    }
                }
                this.dateList2 = new_dateList
            },
            end_date_f(val){
                console.log(val)
                this.end_date = val
            },
            min_minute_f(){

            },
            max_minute_f(){

            },

            score_over05_from(val){
                this.score_minute_filter.over05.from = parseInt(val)
                console.log('over 0.5 home minute=>', this.score_minute_filter.over05.from)
                this.get_search_events()
            },
            score_over05_to(val){
                this.score_minute_filter.over05.to = parseInt(val)
                this.get_search_events()
            },
            score_over15_from(val){
                this.score_minute_filter.over15.from = parseInt(val)
                this.get_search_events()
            },
            score_over15_to(val){
                this.score_minute_filter.over15.to = parseInt(val)
                this.get_search_events()
            },
            score_over25_from(val){
                this.score_minute_filter.over25.from = parseInt(val)
                this.get_search_events()
            },
            score_over25_to(val){
                this.score_minute_filter.over25.to = parseInt(val)
                this.get_search_events()
            },
            score_over35_from(val){
                this.score_minute_filter.over35.from = parseInt(val)
                this.get_search_events()
            },
            score_over35_to(val){
                this.score_minute_filter.over35.to = parseInt(val)
                this.get_search_events()
            },
            score_under05_from(val){
                this.score_minute_filter.under05.from = parseInt(val)
                this.get_search_events()
            },
            score_under05_to(val){
                this.score_minute_filter.under05.to = parseInt(val)
                this.get_search_events()
            },
            score_under15_from(val){
                this.score_minute_filter.under15.from = parseInt(val)
                this.get_search_events()
            },
            score_under15_to(val){
                this.score_minute_filter.under15.to = parseInt(val)
                this.get_search_events()
            },
            score_under25_from(val){
                this.score_minute_filter.under25.from = parseInt(val)
                this.get_search_events()
            },
            score_under25_to(val){
                this.score_minute_filter.under25.to = parseInt(val)
                this.get_search_events()
            },
            score_under35_from(val){
                this.score_minute_filter.under35.from = parseInt(val)
                this.get_search_events()
            },
            score_under35_to(val){
                this.score_minute_filter.under35.to = parseInt(val)
                this.get_search_events()
            },
            score_home_from(val){
                this.score_minute_filter.home.from = parseInt(val)
                this.get_search_events()
            },
            score_home_to(val){
                this.score_minute_filter.home.to = parseInt(val)
                this.get_search_events()
            },
            score_draws_from(val){
                this.score_minute_filter.draws.from = parseInt(val)
                this.get_search_events()
            },
            score_draws_to(val){
                this.score_minute_filter.draws.to = parseInt(val)
                this.get_search_events()
            },
            score_away_from(val){
                this.score_minute_filter.away.from = parseInt(val)
                this.get_search_events()
            },
            score_away_to(val){
                this.score_minute_filter.away.to = parseInt(val)
                this.get_search_events()
            },
            score_bts_from(val){
                this.score_minute_filter.bts.from = parseInt(val)
                this.get_search_events()
            },
            score_bts_to(val){
                this.score_minute_filter.bts.to = parseInt(val)
                this.get_search_events()
            },
            score_odd_from(val){
                this.score_minute_filter.odd.from = parseInt(val)
                this.get_search_events()
            },
            score_odd_to(val){
                this.score_minute_filter.odd.to = parseInt(val)
                this.get_search_events()
            },
            score_even_from(val){
                this.score_minute_filter.even.from = parseInt(val)
                this.get_search_events()
            },
            score_even_to(val){
                this.score_minute_filter.even.to = parseInt(val)
                this.get_search_events()
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
                this.get_search_events()
            },
            home_minute_to_filter(val){
                this.homeTeam.minute.to = val
                this.get_search_events()
            },
            away_minute_from_filter(val){
                this.awayTeam.minute.from = val
                this.get_search_events()
            },
            away_minute_to_filter(val){
                this.awayTeam.minute.to = val
                this.get_search_events()
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
            get_search_events(){
                let events = this.origin_events
                let event_list = [{'label': 'select an event', 'value': null}]
                for(let i = 1 ; i < events.length ; i++){
                    let value = events[i].value
                    let stats = value.stats
                    let times = value.time
                    let home_id = value.home_id
                    let away_id = value.away_id
                    let home_statsData = []
                    let away_statsdata = []
                    let check_status = 0
//---------------------------------------home team filter------------------------
                    for(let j = 0 ; j < times.length; j++){
                        if(times[j].minute >= this.homeTeam.minute.from && times[j].minute <= this.homeTeam.minute.to){
                            home_statsData = stats[j]
                        }
                    }
                    if(home_statsData.length < 1){
                        check_status = 1
                    }

                    if(this.homeTeam.rank.from != 0 || this.homeTeam.rank.to != 1000){
                        if(value.home_rank){
                            if(value.home_rank < this.homeTeam.rank.from || value.home_rank > this.homeTeam.rank.to){
                                check_status = 1
                            }
                        }
                        else{
                            check_status = 1
                        }
                    }

                    let home_stats_data = {
                        'on': null,
                        'off': null,
                        'blk': null,
                        'in': null,
                        'out': null,
                        'cnr': null,
                        'da': null,
                        'pos': null,
                        'red': null,
                        'yel': null,
                        'goal': null
                    }

                    if(home_statsData.length > 0){
                        if(home_statsData[0].team_id == home_id){
                            if(home_statsData[0].shots){
                                if(home_statsData[0].shots.ongoal){
                                    home_stats_data.on = home_statsData[0].shots.ongoal
                                }
                                if(home_statsData[0].shots.offgoal){
                                    home_stats_data.off = home_statsData[0].shots.offgoal
                                }
                                if(home_statsData[0].shots.blocked){
                                    home_stats_data.blk = home_statsData[0].shots.blocked
                                }

                                if(home_statsData[0].shots.insidebox){
                                    home_stats_data.in = home_statsData[0].shots.insidebox
                                }

                                if(home_statsData[0].shots.outsidebox){
                                    home_stats_data.out = home_statsData[0].shots.outsidebox
                                }
                            }

                            if(home_statsData[0].corners){
                                home_stats_data.cnr = home_statsData[0].corners
                            }

                            if(home_statsData[0].attacks){
                                if(home_statsData[0].attacks.dangerous_attacks){
                                    home_stats_data.da = home_statsData[0].attacks.dangerous_attacks
                                }
                            }

                            if(home_statsData[0].possessiontime){
                                home_stats_data.pos = home_statsData[0].possessiontime
                            }

                            if(home_statsData[0].redcards){
                                home_stats_data.red = home_statsData[0].redcards
                            }

                            if(home_statsData[0].yellowcards){
                                home_stats_data.yel = home_statsData[0].yellowcards
                            }

                            if(home_statsData[0].goals){
                                home_stats_data.goal = home_statsData[0].goals
                            }
                        }
                        else if(home_statsData[1].team_id == home_id){
                            if(home_statsData[1].shots){
                                if(home_statsData[1].shots.ongoal){
                                    home_stats_data.on = home_statsData[1].shots.ongoal
                                }
                                if(home_statsData[1].shots.offgoal){
                                    home_stats_data.off = home_statsData[1].shots.offgoal
                                }
                                if(home_statsData[1].shots.blocked){
                                    home_stats_data.blk = home_statsData[1].shots.blocked
                                }

                                if(home_statsData[1].shots.insidebox){
                                    home_stats_data.in = home_statsData[1].shots.insidebox
                                }

                                if(home_statsData[1].shots.outsidebox){
                                    home_stats_data.out = home_statsData[1].shots.outsidebox
                                }
                            }

                            if(home_statsData[1].corners){
                                home_stats_data.cnr = home_statsData[1].corners
                            }

                            if(home_statsData[1].attacks){
                                if(home_statsData[1].attacks.dangerous_attacks){
                                    home_stats_data.da = home_statsData[1].attacks.dangerous_attacks
                                }
                            }

                            if(home_statsData[1].possessiontime){
                                home_stats_data.pos = home_statsData[1].possessiontime
                            }

                            if(home_statsData[1].redcards){
                                home_stats_data.red = home_statsData[1].redcards
                            }

                            if(home_statsData[1].yellowcards){
                                home_stats_data.yel = home_statsData[1].yellowcards
                            }

                            if(home_statsData[1].goals){
                                home_stats_data.goal = home_statsData[1].goals
                            }
                        }
                    }
                    else{
                        check_status = 1
                    }
                    if(this.homeTeam.on.from != 0 || this.homeTeam.on.to != 1000){
                        if(check_status === 0){
                            console.log('on&off filter check===>', home_stats_data.on)
                            if(home_stats_data.on < this.homeTeam.on.from || home_stats_data.on > this.homeTeam.on.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.homeTeam.off.from != 0 || this.homeTeam.off.to != 1000){
                        if(check_status === 0){
                            if(home_stats_data.off < this.homeTeam.off.from || home_stats_data.off > this.homeTeam.off.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.homeTeam.blk.from != 0 || this.homeTeam.blk.to != 1000){
                        if(check_status === 0){
                            if(home_stats_data.blk < this.homeTeam.blk.from || home_stats_data.blk > this.homeTeam.blk.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.homeTeam.in.from != 0 || this.homeTeam.in.to != 1000){
                        if(check_status === 0){
                            if(home_stats_data.in < this.homeTeam.in.from || home_stats_data.in > this.homeTeam.in.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.homeTeam.out.from != 0 || this.homeTeam.out.to != 1000){
                        if(check_status === 0){
                            if(home_stats_data.out < this.homeTeam.out.from || home_stats_data.out > this.homeTeam.out.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.homeTeam.cnr.from != 0 || this.homeTeam.cnr.to != 1000){
                        if(check_status === 0){
                            if(home_stats_data.cnr < this.homeTeam.cnr.from || home_stats_data.cnr > this.homeTeam.cnr.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.homeTeam.da.from != 0 || this.homeTeam.da.to != 1000){
                        if(check_status === 0){
                            if(home_stats_data.da < this.homeTeam.da.from || home_stats_data.da > this.homeTeam.da.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.homeTeam.pos.from != 0 || this.homeTeam.pos.to != 1000){
                        if(check_status === 0){
                            if(home_stats_data.pos < this.homeTeam.pos.from || home_stats_data.pos > this.homeTeam.pos.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.homeTeam.red.from != 0 || this.homeTeam.red.to != 1000){
                        if(check_status === 0){
                            if(home_stats_data.red < this.homeTeam.red.from || home_stats_data.red > this.homeTeam.red.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.homeTeam.yel.from != 0 || this.homeTeam.yel.to != 1000){
                        if(check_status === 0){
                            if(home_stats_data.yel < this.homeTeam.yel.from || home_stats_data.yel > this.homeTeam.yel.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.homeTeam.goal.from != 0 || this.homeTeam.goal.to != 1000){
                        if(check_status === 0){
                            if(home_stats_data.goal < this.homeTeam.goal.from || home_stats_data.goal > this.homeTeam.goal.to){
                                check_status = 1
                            }
                        }
                    }
//------------------------------------away team filter----------------------------------
                    for(let j = 0 ; j < times.length; j++){
                        if(times[j].minute >= this.awayTeam.minute.from && times[j].minute <= this.awayTeam.minute.to){
                            away_statsdata = stats[j]
                        }
                    }
                    if(away_statsdata.length < 1){
                        check_status = 1
                    }

                    if(this.awayTeam.rank.from != 0 || this.awayTeam.rank.to != 1000){
                        if(value.away_rank){
                            if(value.away_rank < this.awayTeam.rank.from || value.away_rank > this.awayTeam.rank.to){
                                check_status = 1
                            }
                        }
                        else{
                            check_status = 1
                        }
                    }

                    let away_stats_data = {
                        'on': null,
                        'off': null,
                        'blk': null,
                        'in': null,
                        'out': null,
                        'cnr': null,
                        'da': null,
                        'pos': null,
                        'red': null,
                        'yel': null,
                        'goal': null
                    }

                    if(away_statsdata.length > 0){
                        if(away_statsdata[0].team_id == home_id){
                            if(away_statsdata[1].shots){
                                if(away_statsdata[1].shots.ongoal){
                                    away_stats_data.on = away_statsdata[1].shots.ongoal
                                }
                                if(away_statsdata[1].shots.offgoal){
                                    away_stats_data.off = away_statsdata[1].shots.offgoal
                                }
                                if(away_statsdata[1].shots.blocked){
                                    away_stats_data.blk = away_statsdata[1].shots.blocked
                                }

                                if(away_statsdata[1].shots.insidebox){
                                    away_stats_data.in = away_statsdata[1].shots.insidebox
                                }

                                if(away_statsdata[1].shots.outsidebox){
                                    away_stats_data.out = away_statsdata[1].shots.outsidebox
                                }
                            }

                            if(away_statsdata[1].corners){
                                away_stats_data.cnr = away_statsdata[1].corners
                            }

                            if(away_statsdata[1].attacks){
                                if(away_statsdata[1].attacks.dangerous_attacks){
                                    away_stats_data.da = away_statsdata[1].attacks.dangerous_attacks
                                }
                            }

                            if(away_statsdata[1].possessiontime){
                                away_stats_data.pos = away_statsdata[1].possessiontime
                            }

                            if(away_statsdata[1].redcards){
                                away_stats_data.red = away_statsdata[1].redcards
                            }

                            if(away_statsdata[1].yellowcards){
                                away_stats_data.yel = away_statsdata[1].yellowcards
                            }

                            if(away_statsdata[1].goals){
                                away_stats_data.goal = away_statsdata[1].goals
                            }
                        }
                        else if(home_statsData[1].team_id == home_id){
                            if(away_statsdata[0].shots){
                                if(away_statsdata[0].shots.ongoal){
                                    away_stats_data.on = away_statsdata[0].shots.ongoal
                                }
                                if(away_statsdata[0].shots.offgoal){
                                    away_stats_data.off = away_statsdata[0].shots.offgoal
                                }
                                if(away_statsdata[0].shots.blocked){
                                    away_stats_data.blk = away_statsdata[0].shots.blocked
                                }

                                if(away_statsdata[0].shots.insidebox){
                                    away_stats_data.in = away_statsdata[0].shots.insidebox
                                }

                                if(away_statsdata[0].shots.outsidebox){
                                    away_stats_data.out = away_statsdata[0].shots.outsidebox
                                }
                            }

                            if(away_statsdata[0].corners){
                                away_stats_data.cnr = away_statsdata[0].corners
                            }

                            if(away_statsdata[0].attacks){
                                if(away_statsdata[1].attacks.dangerous_attacks){
                                    away_stats_data.da = away_statsdata[0].attacks.dangerous_attacks
                                }
                            }

                            if(away_statsdata[0].possessiontime){
                                away_stats_data.pos = away_statsdata[0].possessiontime
                            }

                            if(away_statsdata[0].redcards){
                                away_stats_data.red = away_statsdata[0].redcards
                            }

                            if(away_statsdata[0].yellowcards){
                                away_stats_data.yel = away_statsdata[0].yellowcards
                            }

                            if(away_statsdata[0].goals){
                                away_stats_data.goal = away_statsdata[0].goals
                            }
                        }
                    }
                    else{
                        check_status = 1
                    }

                    if(this.awayTeam.on.from != 0 || this.awayTeam.on.to != 1000){
                        if(check_status === 0){
                            if(away_stats_data.on < this.awayTeam.on.from || away_stats_data.on > this.awayTeam.on.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.awayTeam.off.from != 0 || this.awayTeam.off.to != 1000){
                        if(check_status === 0){
                            if(away_stats_data.off < this.awayTeam.off.from || away_stats_data.off > this.awayTeam.off.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.awayTeam.blk.from != 0 || this.awayTeam.blk.to != 1000){
                        if(check_status === 0){
                            if(away_stats_data.blk < this.awayTeam.blk.from || away_stats_data.blk > this.awayTeam.blk.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.awayTeam.in.from != 0 || this.awayTeam.in.to != 1000){
                        if(check_status === 0){
                            if(away_stats_data.in < this.awayTeam.in.from || away_stats_data.in > this.awayTeam.in.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.awayTeam.out.from != 0 || this.awayTeam.out.to != 1000){
                        if(check_status === 0){
                            if(away_stats_data.out < this.awayTeam.out.from || away_stats_data.out > this.awayTeam.out.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.awayTeam.cnr.from != 0 || this.awayTeam.cnr.to != 1000){
                        if(check_status === 0){
                            if(away_stats_data.cnr < this.awayTeam.cnr.from || away_stats_data.cnr > this.awayTeam.cnr.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.awayTeam.da.from != 0 || this.awayTeam.da.to != 1000){
                        if(check_status === 0){
                            if(away_stats_data.da < this.awayTeam.da.from || away_stats_data.da > this.awayTeam.da.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.awayTeam.pos.from != 0 || this.awayTeam.pos.to != 1000){
                        if(check_status === 0){
                            if(away_stats_data.pos < this.awayTeam.pos.from || away_stats_data.pos > this.awayTeam.pos.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.awayTeam.red.from != 0 || this.awayTeam.red.to != 1000){
                        if(check_status === 0){
                            if(away_stats_data.red < this.awayTeam.red.from || away_stats_data.red > this.awayTeam.red.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.awayTeam.yel.from != 0 || this.awayTeam.yel.to != 1000){
                        if(check_status === 0){
                            if(away_stats_data.yel < this.awayTeam.yel.from || away_stats_data.yel > this.awayTeam.yel.to){
                                check_status = 1
                            }
                        }
                    }
                    if(this.awayTeam.goal.from != 0 || this.awayTeam.goal.to != 1000){
                        if(check_status === 0){
                            if(away_stats_data.goal < this.awayTeam.goal.from || away_stats_data.goal > this.awayTeam.goal.to){
                                check_status = 1
                            }
                        }
                    }

//--------------------------------------------------------------------
                    console.log('check_status====>!!!!!!!!!', check_status)
                    if(check_status === 0){
                        event_list.push({"label": events[i].label, "value": events[i].value})
                    }
//------------------------------------------------------------------------
//                     if(value.away_rank && value.home_rank){
//                         if(value.home_rank >= this.homeTeam.rank.from && value.home_rank <= this.homeTeam.rank.to && value.away_rank >= this.awayTeam.rank.from && value.away_rank <= this.awayTeam.rank.to){
//                             let stats_length = stats.length
//
//                             if(stats_length > 0){
//                                 // console.log('rank checking', value.home_rank, value.away_rank)
//                                 let statsData = stats[stats_length - 1]
//
//                                 // for(let j = 0 ; j < times.length; j++){
//                                 //     if(times[j].minute >= this.homeTeam.minute.from && times[j].minute <= this.homeTeam.minute.to && times[j].minute >= this.awayTeam.minute.from && times[j].minute <= this.awayTeam.minute.to){
//                                 //         statsData = stats[j]
//                                 //     }
//                                 // }
//
//                                 // console.log('statsData=>', statsData)
//                                 let home_stats_data = {
//                                     'on': 0,
//                                     'off': 0,
//                                     'blk': 0,
//                                     'in': 0,
//                                     'out': 0,
//                                     'cnr': 0,
//                                     'da': 0,
//                                     'pos': 0,
//                                     'red': 0,
//                                     'yel': 0,
//                                     'goal': 0
//                                 }
//                                 let away_stats_data = {
//                                     'on': 0,
//                                     'off': 0,
//                                     'blk': 0,
//                                     'in': 0,
//                                     'out': 0,
//                                     'cnr': 0,
//                                     'da': 0,
//                                     'pos': 0,
//                                     'red': 0,
//                                     'yel': 0,
//                                     'goal': 0
//                                 }
//                                 if(statsData[0].team_id == home_id){
//                                     if(statsData[0].shots){
//                                         if(statsData[0].shots.ongoal){
//                                             home_stats_data.on = statsData[0].shots.ongoal
//                                             away_stats_data.on = statsData[1].shots.ongoal
//                                         }
//                                         else{
//                                             home_stats_data.on = 0
//                                             away_stats_data.on = 0
//                                         }
//                                         if(statsData[0].shots.offgoal){
//                                             home_stats_data.off = statsData[0].shots.offgoal
//                                             away_stats_data.off = statsData[1].shots.offgoal
//                                         }
//                                         else{
//                                             home_stats_data.off = 0
//                                             away_stats_data.off = 0
//                                         }
//                                         if(statsData[0].shots.blocked){
//                                             home_stats_data.blk = statsData[0].shots.blocked
//                                             away_stats_data.blk = statsData[1].shots.blocked
//                                         }
//                                         else{
//                                             home_stats_data.blk = 0
//                                             away_stats_data.blk = 0
//                                         }
//                                         if(statsData[0].shots.insidebox){
//                                             home_stats_data.in = statsData[0].shots.insidebox
//                                             away_stats_data.in = statsData[1].shots.insidebox
//                                         }
//                                         else{
//                                             home_stats_data.in = 0
//                                             away_stats_data.in = 0
//                                         }
//                                         if(statsData[0].shots.outsidebox){
//                                             home_stats_data.out = statsData[0].shots.outsidebox
//                                             away_stats_data.out = statsData[1].shots.outsidebox
//                                         }
//                                         else{
//                                             home_stats_data.out = 0
//                                             away_stats_data.out = 0
//                                         }
//                                     }
//
//                                     if(statsData[0].corners){
//                                         home_stats_data.cnr = statsData[0].corners
//                                         away_stats_data.cnr = statsData[1].corners
//                                     }
//                                     else{
//                                         home_stats_data.cnr = 0
//                                         away_stats_data.cnr = 0
//                                     }
//                                     if(statsData[0].attacks){
//                                         if(statsData[0].attacks.dangerous_attacks){
//                                             home_stats_data.da = statsData[0].attacks.dangerous_attacks
//                                             away_stats_data.da = statsData[1].attacks.dangerous_attacks
//                                         }
//                                         else{
//                                             home_stats_data.da = 0
//                                             away_stats_data.da = 0
//                                         }
//                                     }
//                                     if(statsData[0].possessiontime){
//                                         home_stats_data.pos = statsData[0].possessiontime
//                                         away_stats_data.pos = statsData[1].possessiontime
//                                     }
//                                     else{
//                                         home_stats_data.pos = 0
//                                         away_stats_data.pos = 0
//                                     }
//                                     if(statsData[0].redcards){
//                                         home_stats_data.red = statsData[0].redcards
//                                         away_stats_data.red = statsData[1].redcards
//                                     }
//                                     else{
//                                         if(this.homeTeam.red.from !== 0 || this.homeTeam.red.to !== 1000 || this.awayTeam.red.from !== 0 || this.awayTeam.red.to !== 1000){
//                                             home_stats_data.red = -1
//                                             away_stats_data.red = -1
//                                         }
//                                         else{
//                                             home_stats_data.red = 0
//                                             away_stats_data.red = 0
//                                         }
//                                     }
//                                     if(statsData[0].yellowcards){
//                                         home_stats_data.yel = statsData[0].yellowcards
//                                         away_stats_data.yel = statsData[1].yellowcards
//                                     }
//                                     else{
//                                         if(this.homeTeam.yel.from !== 0 || this.homeTeam.yel.to !== 1000 || this.awayTeam.yel.from !== 0 || this.awayTeam.yel.to !== 1000){
//                                             home_stats_data.yel = -1
//                                             away_stats_data.yel = -1
//                                         }
//                                         else{
//                                             home_stats_data.yel = 0
//                                             away_stats_data.yel = 0
//                                         }
//                                     }
//                                     if(statsData[0].goals){
//                                         home_stats_data.goal = statsData[0].goals
//                                         away_stats_data.goal = statsData[1].goals
//                                     }
//                                     else{
//                                         home_stats_data.goal = 0
//                                         away_stats_data.goal = 0
//                                     }
//                                 }
//                                 else if(statsData[1].team_id == home_id){
//                                     if(statsData[1].shots){
//                                         if(statsData[1].shots.ongoal){
//                                             home_stats_data.on = statsData[1].shots.ongoal
//                                             away_stats_data.on = statsData[0].shots.ongoal
//                                         }
//                                         else{
//                                             home_stats_data.on = 0
//                                             away_stats_data.on = 0
//                                         }
//                                         if(statsData[1].shots.offgoal){
//                                             home_stats_data.off = statsData[1].shots.offgoal
//                                             away_stats_data.off = statsData[0].shots.offgoal
//                                         }
//                                         else{
//                                             home_stats_data.off = 0
//                                             away_stats_data.off = 0
//                                         }
//                                         if(statsData[1].shots.blocked){
//                                             home_stats_data.blk = statsData[1].shots.blocked
//                                             away_stats_data.blk = statsData[0].shots.blocked
//                                         }
//                                         else{
//                                             home_stats_data.blk = 0
//                                             away_stats_data.blk = 0
//                                         }
//                                         if(statsData[1].shots.insidebox){
//                                             home_stats_data.in = statsData[1].shots.insidebox
//                                             away_stats_data.in = statsData[0].shots.insidebox
//                                         }
//                                         else{
//                                             home_stats_data.in = 0
//                                             away_stats_data.in = 0
//                                         }
//                                         if(statsData[1].shots.outsidebox){
//                                             home_stats_data.out = statsData[1].shots.outsidebox
//                                             away_stats_data.out = statsData[0].shots.outsidebox
//                                         }
//                                         else{
//                                             home_stats_data.out = 0
//                                             away_stats_data.out = 0
//                                         }
//                                     }
//
//                                     if(statsData[1].corners){
//                                         home_stats_data.cnr = statsData[1].corners
//                                         away_stats_data.cnr = statsData[0].corners
//                                     }
//                                     else{
//                                         home_stats_data.cnr = 0
//                                         away_stats_data.cnr = 0
//                                     }
//                                     if(statsData[1].attacks){
//                                         if(statsData[1].attacks.dangerous_attacks){
//                                             home_stats_data.da = statsData[1].attacks.dangerous_attacks
//                                             away_stats_data.da = statsData[0].attacks.dangerous_attacks
//                                         }
//                                         else{
//                                             home_stats_data.da = 0
//                                             away_stats_data.da = 0
//                                         }
//                                     }
//                                     if(statsData[1].possessiontime){
//                                         home_stats_data.pos = statsData[1].possessiontime
//                                         away_stats_data.pos = statsData[0].possessiontime
//                                     }
//                                     else{
//                                         home_stats_data.pos = 0
//                                         away_stats_data.pos = 0
//                                     }
//                                     if(statsData[1].redcards){
//                                         home_stats_data.red = statsData[1].redcards
//                                         away_stats_data.red = statsData[0].redcards
//                                     }
//                                     else{
//                                         if(this.homeTeam.red.from !== 0 || this.homeTeam.red.to !== 1000 || this.awayTeam.red.from !== 0 || this.awayTeam.red.to !== 1000){
//                                             home_stats_data.red = -1
//                                             away_stats_data.red = -1
//                                         }
//                                         else{
//                                             home_stats_data.red = 0
//                                             away_stats_data.red = 0
//                                         }
//                                     }
//                                     if(statsData[1].yellowcards){
//                                         home_stats_data.yel = statsData[1].yellowcards
//                                         away_stats_data.yel = statsData[0].yellowcards
//                                     }
//                                     else{
//                                         if(this.homeTeam.yel.from !== 0 || this.homeTeam.yel.to !== 1000 || this.awayTeam.yel.from !== 0 || this.awayTeam.yel.to !== 1000){
//                                             home_stats_data.yel = -1
//                                             away_stats_data.yel = -1
//                                         }
//                                         else{
//                                             home_stats_data.yel = 0
//                                             away_stats_data.yel = 0
//                                         }
//                                     }
//
//                                     if(statsData[1].goals){
//                                         home_stats_data.goal = statsData[1].goals
//                                         away_stats_data.goal = statsData[0].goals
//                                     }
//                                     else{
//                                         home_stats_data.goal = 0
//                                         away_stats_data.goal = 0
//                                     }
//                                 }
//                                 if(home_stats_data.on >= this.homeTeam.on.from && home_stats_data.on <= this.homeTeam.on.to && away_stats_data.on >= this.awayTeam.on.from && away_stats_data.on <= this.awayTeam.on.to){
//                                     if(home_stats_data.off >= this.homeTeam.off.from && home_stats_data.off <= this.homeTeam.off.to && away_stats_data.off >= this.awayTeam.off.from && away_stats_data.off <= this.awayTeam.off.to){
//                                         if(home_stats_data.blk >= this.homeTeam.blk.from && home_stats_data.blk <= this.homeTeam.blk.to && away_stats_data.blk >= this.awayTeam.blk.from && away_stats_data.blk <= this.awayTeam.blk.to){
//                                               if(home_stats_data.in >= this.homeTeam.in.from && home_stats_data.in <= this.homeTeam.in.to && away_stats_data.in >= this.awayTeam.in.from && away_stats_data.in <= this.awayTeam.in.to){
//                                                 if(home_stats_data.out >= this.homeTeam.out.from && home_stats_data.out <= this.homeTeam.out.to && away_stats_data.out >= this.awayTeam.out.from && away_stats_data.out <= this.awayTeam.out.to){
//                                                     if(home_stats_data.cnr >= this.homeTeam.cnr.from && home_stats_data.cnr <= this.homeTeam.cnr.to && away_stats_data.cnr >= this.awayTeam.cnr.from && away_stats_data.cnr <= this.awayTeam.cnr.to){
//                                                         if(home_stats_data.da >= this.homeTeam.da.from && home_stats_data.da <= this.homeTeam.da.to && away_stats_data.da >= this.awayTeam.da.from && away_stats_data.da <= this.awayTeam.da.to){
//                                                             if(home_stats_data.pos >= this.homeTeam.pos.from && home_stats_data.pos <= this.homeTeam.pos.to && away_stats_data.pos >= this.awayTeam.pos.from && away_stats_data.pos <= this.awayTeam.pos.to){
//                                                                 if(home_stats_data.red >= this.homeTeam.red.from && home_stats_data.red <= this.homeTeam.red.to && away_stats_data.red >= this.awayTeam.red.from && away_stats_data.red <= this.awayTeam.red.to){
//                                                                     if(home_stats_data.yel >= this.homeTeam.yel.from && home_stats_data.yel <= this.homeTeam.yel.to && away_stats_data.yel >= this.awayTeam.yel.from && away_stats_data.yel <= this.awayTeam.yel.to){
//                                                                         if(home_stats_data.goal >= this.homeTeam.goal.from && home_stats_data.goal <= this.homeTeam.goal.to && away_stats_data.goal >= this.awayTeam.goal.from && away_stats_data.goal <= this.awayTeam.goal.to){
//                                                                             event_list.push({"label": events[i].label, "value": events[i].value})
//                                                                         }
//                                                                     }
//                                                                 }
//                                                             }
//                                                         }
//                                                     }
//                                                 }
//                                             }
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                     }
                }
                this.eventList = event_list

                //------------------------------score minute filter-----------------------
                if(this.score_minute_filter.over05.from != 0 || this.score_minute_filter.over05.to != 1000){
                    console.log('score filter check==>', this.score_minute_filter.over05.from)
                    this.score_filter_function1(1, this.score_minute_filter.over05.from, this.score_minute_filter.over05.to)
                }
                if(this.score_minute_filter.over15.from != 0 || this.score_minute_filter.over15.to != 1000){
                    this.score_filter_function1(2, this.score_minute_filter.over15.from, this.score_minute_filter.over15.to)
                }
                if(this.score_minute_filter.over25.from != 0 || this.score_minute_filter.over25.to != 1000){
                    this.score_filter_function1(3, this.score_minute_filter.over25.from, this.score_minute_filter.over25.to)
                }
                if(this.score_minute_filter.over35.from != 0 || this.score_minute_filter.over35.to != 1000){
                    this.score_filter_function1(4, this.score_minute_filter.over35.from, this.score_minute_filter.over35.to)
                }
                if(this.score_minute_filter.under05.from != 0 || this.score_minute_filter.under05.to != 1000){
                    this.score_filter_function2(1, this.score_minute_filter.under05.from, this.score_minute_filter.under05.to)
                }
                if(this.score_minute_filter.under15.from != 0 || this.score_minute_filter.under15.to != 1000){
                    this.score_filter_function2(2, this.score_minute_filter.under15.from, this.score_minute_filter.under15.to)
                }
                if(this.score_minute_filter.under25.from != 0 || this.score_minute_filter.under25.to != 1000){
                    this.score_filter_function2(3, this.score_minute_filter.under25.from, this.score_minute_filter.under25.to)
                }
                if(this.score_minute_filter.under35.from != 0 || this.score_minute_filter.under35.to != 1000){
                    this.score_filter_function2(4, this.score_minute_filter.under35.from, this.score_minute_filter.under35.to)
                }
                if(this.score_minute_filter.home.from != 0 || this.score_minute_filter.home.to != 1000){
                    this.score_filter_function3(1, this.score_minute_filter.home.from, this.score_minute_filter.home.to)
                }
                if(this.score_minute_filter.draws.from != 0 || this.score_minute_filter.draws.to != 1000){
                    this.score_filter_function3(2, this.score_minute_filter.draws.from, this.score_minute_filter.draws.to)
                }
                if(this.score_minute_filter.away.from != 0 || this.score_minute_filter.away.to != 1000){
                    this.score_filter_function3(3, this.score_minute_filter.away.from, this.score_minute_filter.away.to)
                }
                if(this.score_minute_filter.bts.from != 0 || this.score_minute_filter.bts.to != 1000){
                    this.score_filter_function4(1, this.score_minute_filter.bts.from, this.score_minute_filter.bts.to)
                }
                if(this.score_minute_filter.odd.from != 0 || this.score_minute_filter.odd.to != 1000){
                    this.score_filter_function4(2, this.score_minute_filter.odd.from, this.score_minute_filter.odd.to)
                }
                if(this.score_minute_filter.even.from != 0 || this.score_minute_filter.even.to != 1000){
                    this.score_filter_function4(3, this.score_minute_filter.even.from, this.score_minute_filter.even.to)
                }
                //------------------------------------end--------------------------------
                this.filtered_result = event_list.length - 1
                this.missed_filtered_result = 0
                for(let i = 1 ; i < event_list.length ; i++){
                    if(event_list[i].value.stats.length < 1){
                        this.missed_filtered_result++
                    }
                }
                this.get_time_seg_stats(event_list)
            },
            h_rank_from(val){
                this.homeTeam.rank.from = parseInt(val)
                console.log('homeTeam From====>', val)
                this.get_search_events()
            },
            a_rank_from(val){
                this.awayTeam.rank.from = parseInt(val)
                this.get_search_events()
            },
            h_rank_to(val){
                this.homeTeam.rank.to = parseInt(val)
                this.get_search_events()
            },
            a_rank_to(val){
                this.awayTeam.rank.to = parseInt(val)
                this.get_search_events()
            },
            h_on_from(val){
                this.homeTeam.on.from = parseInt(val)
                console.log('homeTeam From====>', val)
                this.get_search_events()
            },
            a_on_from(val){
                this.awayTeam.on.from = parseInt(val)
                this.get_search_events()
            },
            h_on_to(val){
                this.homeTeam.on.to = parseInt(val)
                this.get_search_events()
            },
            a_on_to(val){
                this.awayTeam.on.to = parseInt(val)
                this.get_search_events()
            },
            h_off_from(val){
                this.homeTeam.off.from = parseInt(val)
                this.get_search_events()
            },
            a_off_from(val){
                this.awayTeam.off.from = parseInt(val)
                this.get_search_events()
            },
            h_off_to(val){
                this.homeTeam.off.to = parseInt(val)
                this.get_search_events()
            },
            a_off_to(val){
                this.awayTeam.off.to = parseInt(val)
                this.get_search_events()
            },
            h_blk_from(val){
                this.homeTeam.blk.from = parseInt(val)
                this.get_search_events()
            },
            a_blk_from(val){
                this.awayTeam.blk.from = parseInt(val)
                this.get_search_events()
            },
            h_blk_to(val){
                this.homeTeam.blk.to = parseInt(val)
                this.get_search_events()
            },
            a_blk_to(val){
                this.awayTeam.blk.to = parseInt(val)
                this.get_search_events()
            },
            h_in_from(val){
                this.homeTeam.in.from = parseInt(val)
                this.get_search_events()
            },
            a_in_from(val){
                this.awayTeam.in.from = parseInt(val)
                this.get_search_events()
            },
            h_in_to(val){
                this.homeTeam.in.to = parseInt(val)
                this.get_search_events()
            },
            a_in_to(val){
                this.awayTeam.in.to = parseInt(val)
                this.get_search_events()
            },
            h_out_from(val){
                this.homeTeam.out.from = parseInt(val)
                this.get_search_events()
            },
            a_out_from(val){
                this.awayTeam.out.from = parseInt(val)
                this.get_search_events()
            },
            h_out_to(val){
                this.homeTeam.out.to = parseInt(val)
                this.get_search_events()
            },
            a_out_to(val){
                this.awayTeam.out.to = parseInt(val)
                this.get_search_events()
            },
            h_cnr_from(val){
                this.homeTeam.cnr.from = parseInt(val)
                this.get_search_events()
            },
            a_cnr_from(val){
                this.awayTeam.cnr.from = parseInt(val)
                this.get_search_events()
            },
            h_cnr_to(val){
                this.homeTeam.cnr.to = parseInt(val)
                this.get_search_events()
            },
            a_cnr_to(val){
                this.awayTeam.cnr.to = parseInt(val)
                this.get_search_events()
            },
            h_da_from(val){
                this.homeTeam.da.from = parseInt(val)
                this.get_search_events()
            },
            a_da_from(val){
                this.awayTeam.da.from = parseInt(val)
                this.get_search_events()
            },
            h_da_to(val){
                this.homeTeam.da.to = parseInt(val)
                this.get_search_events()
            },
            a_da_to(val){
                this.awayTeam.da.to = parseInt(val)
                this.get_search_events()
            },
            h_pos_from(val){
                this.homeTeam.pos.from = parseInt(val)
                this.get_search_events()
            },
            a_pos_from(val){
                this.awayTeam.pos.from = parseInt(val)
                this.get_search_events()
            },
            h_pos_to(val){
                this.homeTeam.pos.to = parseInt(val)
                this.get_search_events()
            },
            a_pos_to(val){
                this.awayTeam.pos.to = parseInt(val)
                this.get_search_events()
            },
            h_red_from(val){
                this.homeTeam.red.from = parseInt(val)
                this.get_search_events()
            },
            a_red_from(val){
                this.awayTeam.red.from = parseInt(val)
                this.get_search_events()
            },
            h_red_to(val){
                this.homeTeam.red.to = parseInt(val)
                this.get_search_events()
            },
            a_red_to(val){
                this.awayTeam.red.to = parseInt(val)
                this.get_search_events()
            },
            h_yel_from(val){
                this.homeTeam.yel.from = parseInt(val)
                this.get_search_events()
            },
            a_yel_from(val){
                this.awayTeam.yel.from = parseInt(val)
                this.get_search_events()
            },
            h_yel_to(val){
                this.homeTeam.yel.to = parseInt(val)
                this.get_search_events()
            },
            a_yel_to(val){
                this.awayTeam.yel.to = parseInt(val)
                this.get_search_events()
            },
            h_goal_from(val){
                this.homeTeam.goal.from = parseInt(val)
                this.get_search_events()
            },
            a_goal_from(val){
                this.awayTeam.goal.from = parseInt(val)
                this.get_search_events()
            },
            h_goal_to(val){
                this.homeTeam.goal.to = parseInt(val)
                this.get_search_events()
            },
            a_goal_to(val){
                this.awayTeam.goal.to = parseInt(val)
                this.get_search_events()
            },
            getLiveData(){
                console.log('get live data parameters===>', this.from_date, this.end_date, this.selected_league)
                if(this.selected_league){
                    this.getTable(this.from_date, this.end_date, this.selected_league)
                }
                else{
                    return
                }
            },
            getLeagueList(){
                window.axios.post(`${process.env.VUE_APP_URL}getleaguelist`).then(({data})=> {
                    console.log('liveStatsData==>', data.data[0])
                    let datalist = data.data[0]
                    let self = this
                    for(let i = 0 ; i < datalist.length ; i++){
                        self.leagues.push({'league': datalist[i].name, 'value': datalist[i].eventId, 'label': datalist[i].name})
                    }
                    this.sortJSON(self.leagues,'league', '123');
                    console.log(this.leagues)
                })
            },
            set_league(val){
                console.log('value===>', val)
                this.selected_league = val
            },
            sortJSON(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            },
            getDateList(){
                this.dateList1 = []
                this.dateList2 = []
                for(let i = 0; i < 119 ; i++){
                    let start_date = new Date();
                    let next_date = start_date.setDate(start_date.getDate() - (118 - i));
                    next_date = new Date(next_date).toISOString()
                    next_date = next_date.substring(0,10)
                    this.dateList1.push({'label': next_date, 'value': next_date})
                }
                this.dateList2 = this.dateList1
                this.from_date = this.dateList1[0].value
                console.log('datelistcheck===>', this.dateList1, this.dateList2)
            }
        },
        created() {
            this.getLeagueList()
            this.getDateList()
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
</style>
