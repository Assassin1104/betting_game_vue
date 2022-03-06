<template>
    <div class="predictions-stats-container">
        <!--        <div v-if="!isload">-->
        <!--            <b-progress :value="current_counter" :max="counter" animated></b-progress>-->
        <!--        </div>-->
        <CRow>
            <CCol lg="6" style="height: 1850px; width: 50%!important; background: white; padding: 40px; padding-top: 20px;">
                <div style="width: 100%; color: black; font-size: 16px; font-weight: 600;">
                    <label style="color: black;">Search</label>
                </div>
                <CRow>
                    <CCol sm="6">
                        <div>
                            <div style="width: 20%; float: left;">
                                <label>Date:</label>
                            </div>
                            <div style="width: 45%; float: left;">
                                <label style="float: left; color: black;">From:</label>
                                <CSelect
                                        class="fromdate"
                                        :options="datelist1"
                                        @update:value="set_prediction_date1"
                                >
                                </CSelect>
                            </div>
                            <div style="width: 35%; float: left;">
                                <label style="float: left; color: black;">To:</label>
                                <CSelect
                                        :value.sync = "key"
                                        class="todate"
                                        :options="datelist2"
                                        @update:value="set_prediction_date2"
                                >
                                </CSelect>
                            </div>
                        </div>
                        <div style="width: 100%; float: left;">
                            <label style="float: left;">Leagues:</label>
                            <CSelect
                                    class="leaguelist"
                                    :options="leaguelist"
                                    @update:value="set_league"
                            >
                            </CSelect>
                        </div>
                        <div class="checkbox" style="width: 100%;">
                            <div style="width: 35%; float: right;">
                                <CInputCheckbox class="check-box"
                                                :checked="false"
                                                @update:checked="duplicated"
                                >
                                    <template #label>
                                        Forbidden double
                                    </template>
                                </CInputCheckbox>
                            </div>
                            <div style="width: 30%; float: right;">
                                <CInputCheckbox class="check-box"
                                                :checked="false"
                                                @update:checked="doubleTip"
                                >
                                    <template #label>
                                        Double Tips
                                    </template>
                                </CInputCheckbox>
                            </div>
                            <div style="width: 20%; float: right;">
                                <CInputCheckbox class="check-box"
                                                :checked="false"
                                                @update:checked="week_filter"
                                >
                                    <template #label>
                                        Week
                                    </template>
                                </CInputCheckbox>
                            </div>
                        </div>
                        <div>
                            <div style="width: 100%; display: flex; float: left; margin-top: 10px;">
                                <div style="flex: 1; width: 20%;">
                                    <label style="position: relative; top: 4px;">Home Team Odds: </label>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <CInput type="number" min="0" max="90000000" :value="this.searchFilter.home_pre_odd_min" @update:value="home_odd_min" class="minOdd"></CInput>
                                    <label style="float: left; margin-top: -12px; margin-left: 5px;">min</label>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <CInput type="number" min="0" max="100000" :value="this.searchFilter.home_pre_odd_max" @update:value="home_odd_max" class="maxOdd"></CInput>
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
                                    <CInput type="number" min="0" max="90000000" :value="this.searchFilter.away_pre_odd_min" @update:value="away_odd_min" class="minOdd"></CInput>
                                    <label style="float: left; margin-top: -12px; margin-left: 5px;">min</label>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <CInput type="number" min="0" max="100000" :value="this.searchFilter.away_pre_odd_max" @update:value="away_odd_max" class="maxOdd"></CInput>
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
                                    <CInput type="number" min="0" max="90000000" :value="this.searchFilter.draw_pre_odd_min" @update:value="draw_odd_min" class="minOdd"></CInput>
                                    <label style="float: left; margin-top: -12px; margin-left: 5px;">min</label>
                                </div>
                                <div style="flex: 1; width: 40%">
                                    <CInput type="number" min="0" max="100000" :value="this.searchFilter.draw_pre_odd_max" @update:value="draw_odd_max" class="maxOdd"></CInput>
                                    <label style="float: left; margin-top: -12px; margin-left: 5px;">max</label>
                                </div>
                            </div>
                        </div>

                        <div style="width: 200%; float:left; margin-top: 30px;">
                            <label style="float: left;">Total database:</label>
                            <span style="float: left; margin-left: 5px; font-weight: 600;">{{this.total_db}}</span>
                            <label style="float: left; margin-left: 20px;">Missing betfair data:</label>
                            <span style="float: left; margin-left: 5px; font-weight: 600;">{{this.t_missed_betfair}}</span>
                            <label style="float: left; margin-left: 20px;">Missing live stats :</label>
                            <span style="float: left; margin-left: 5px; font-weight: 600;">{{this.t_missed_livestats}}</span>
                        </div>
                        <div style="width: 200%; float:left; margin-top: 5px;">
                            <label style="float: left;">Matches found:</label>
                            <span style="float: left; margin-left: 5px; font-weight: 600;">{{this.matches_found}}</span>
                            <label style="float: left; margin-left: 30px;">Missing betfair data:</label>
                            <span style="float: left; margin-left: 5px; font-weight: 600;">{{this.s_missed_betfair}}</span>
                            <label style="float: left; margin-left: 30px;">Missing live stats :</label>
                            <span style="float: left; margin-left: 5px; font-weight: 600;">{{this.s_missed_livestats}}</span>
                        </div>
                    </CCol>
                    <CCol sm="6">
                        <div style="width: 100%; float: left;">
                            <label style="float: left;">Prediction:</label>
                            <CSelect
                                    class="predictionlist"
                                    :options="gameList"
                                    @update:value="set_game"
                            >
                            </CSelect>
                        </div>
                        <div style="width: 100%; display: flex; float: left;">
                            <div style="flex: 1;width: 20%;">
                                <label style="position: relative; top: 4px;">Pre-match Odds: </label>
                            </div>
                            <div style="flex: 1; width: 40%">
                                <CInput type="number" min="0" max="90000000" :value="this.searchFilter.pre_odd_min" @update:value="odd_min" class="minOdd"></CInput>
                                <label style="float: left; margin-top: -12px; margin-left: 5px;">min</label>
                            </div>
                            <div style="flex: 1; width: 40%">
                                <CInput type="number" min="0" max="100000" :value="this.searchFilter.pre_odd_max" @update:value="odd_max" class="maxOdd"></CInput>
                                <label style="float: left; margin-top: -12px; margin-left: 5px;">max</label>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex; float: left;">
                            <div style="flex: 1;width: 20%;">
                                <label style="position: relative; top: 4px;">Matched Filters: </label>
                            </div>
                            <div style="flex: 1; width: 40%">
                                <CInput type="number" min="0" max="90000000" :value="this.minOdd" @update:value="matched_min" class="minOdd"></CInput>
                                <label style="float: left; margin-top: -12px; margin-left: 5px;">min</label>
                            </div>
                            <div style="flex: 1; width: 40%">
                            </div>
                        </div>

<!--                        <div style="width: 100%; display: flex; float: left; padding-left: 43px; margin-top: 17px;">-->
<!--                            <div style="flex: 1;width: 20%;">-->
<!--                                <label style="position: relative; top: 4px;">Result at 15': </label>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                                <CInput type="number" min="0" max="90000000" :value="result_at_15.home" @update:value="result_score_15_home" class="minOdd"></CInput>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                                <CInput type="number" min="0" max="90000000" :value="result_at_15.away" @update:value="result_score_15_away" class="minOdd"></CInput>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div style="width: 100%; display: flex; float: left; padding-left: 43px;">-->
<!--                            <div style="flex: 1;width: 20%;">-->
<!--                                <label style="position: relative; top: 4px;">Result at 30': </label>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                                <CInput type="number" min="0" max="90000000" :value="result_at_30.home" @update:value="result_score_30_home" class="minOdd"></CInput>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                                <CInput type="number" min="0" max="90000000" :value="result_at_30.away" @update:value="result_score_30_away" class="minOdd"></CInput>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div style="width: 100%; display: flex; float: left; padding-left: 43px;">-->
<!--                            <div style="flex: 1;width: 20%;">-->
<!--                                <label style="position: relative; top: 4px;">Result at HT: </label>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                                <CInput type="number" min="0" max="90000000" :value="result_at_ht.home" @update:value="result_score_ht_home" class="minOdd"></CInput>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                                <CInput type="number" min="0" max="90000000" :value="result_at_ht.away" @update:value="result_score_ht_away" class="minOdd"></CInput>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div style="width: 100%; display: flex; float: left; padding-left: 43px;">-->
<!--                            <div style="flex: 1;width: 20%;">-->
<!--                                <label style="position: relative; top: 4px;">Result at 60': </label>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                                <CInput type="number" min="0" max="90000000" :value="result_at_60.home" @update:value="result_score_60_home" class="minOdd"></CInput>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                                <CInput type="number" min="0" max="90000000" :value="result_at_60.away" @update:value="result_score_60_away" class="minOdd"></CInput>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div style="width: 100%; display: flex; float: left; padding-left: 43px;">-->
<!--                            <div style="flex: 1;width: 20%;">-->
<!--                                <label style="position: relative; top: 4px;">Result at 75': </label>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                                <CInput type="number" min="0" max="90000000" :value="result_at_70.home" @update:value="result_score_70_home" class="minOdd"></CInput>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                                <CInput type="number" min="0" max="90000000" :value="result_at_70.away" @update:value="result_score_70_away" class="minOdd"></CInput>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div style="width: 100%; display: flex; float: left; padding-left: 43px;">-->
<!--                            <div style="flex: 1;width: 20%;">-->
<!--                                <label style="position: relative; top: 4px;">Result at FT: </label>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                                <CInput type="number" min="0" max="90000000" :value="result_at_ft.home" @update:value="result_score_ft_home" class="minOdd"></CInput>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                                <CInput type="number" min="0" max="90000000" :value="result_at_ft.away" @update:value="result_score_ft_away" class="minOdd"></CInput>-->
<!--                            </div>-->
<!--                            <div style="flex: 1; width: 40%">-->
<!--                            </div>-->
<!--                        </div>-->

                    </CCol>
                </CRow>

                <label style="color: red; margin-top: 30px;">Score Filter</label>
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

                <div class="totalMatches" style="display: flex; font-weight: 600; font-size: 12px; margin-top: 30px;">
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
                            <CInput type="number" min="0" max="90000000" :value="result_at_70.home" @update:value="result_score_70_home" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="result_at_70.away" @update:value="result_score_70_away" class="minOdd1"></CInput>
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
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.minute.from" @update:value="home_stats_minute_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.minute.to" @update:value="home_stats_minute_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Rank</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.rank.from" @update:value="home_stats_rank_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.rank.to" @update:value="home_stats_rank_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Goal</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.goal.from" @update:value="home_stats_goal_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.goal.to" @update:value="home_stats_goal_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">On</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.on.from" @update:value="home_stats_on_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.on.to" @update:value="home_stats_on_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Off</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.off.from" @update:value="home_stats_off_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.off.to" @update:value="home_stats_off_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Blk</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.blk.from" @update:value="home_stats_blk_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.blk.to" @update:value="home_stats_blk_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">In</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.in.from" @update:value="home_stats_in_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.in.to" @update:value="home_stats_in_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Out</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.out.from" @update:value="home_stats_out_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.out.to" @update:value="home_stats_out_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Cnr</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.cnr.from" @update:value="home_stats_cnr_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.cnr.to" @update:value="home_stats_cnr_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">DA</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.da.from" @update:value="home_stats_da_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.da.to" @update:value="home_stats_da_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Pos</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.pos.from" @update:value="home_stats_pos_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.pos.to" @update:value="home_stats_pos_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Red</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.red.from" @update:value="home_stats_red_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.red.to" @update:value="home_stats_red_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Yel</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.yel.from" @update:value="home_stats_yel_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.home_stats_filter.yel.to" @update:value="home_stats_yel_to" class="minOdd1"></CInput>
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
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.minute.from" @update:value="away_stats_minute_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.minute.to" @update:value="away_stats_minute_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Rank</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.rank.from" @update:value="away_stats_rank_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.rank.to" @update:value="away_stats_rank_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Goal</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.goal.from" @update:value="away_stats_goal_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.goal.to" @update:value="away_stats_goal_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">On</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.on.from" @update:value="away_stats_on_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.on.to" @update:value="away_stats_on_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Off</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.off.from" @update:value="away_stats_off_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.off.to" @update:value="away_stats_off_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Blk</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.blk.from" @update:value="away_stats_blk_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.blk.to" @update:value="away_stats_blk_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">In</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.in.from" @update:value="away_stats_in_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.in.to" @update:value="away_stats_in_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Out</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.out.from" @update:value="away_stats_out_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.out.to" @update:value="away_stats_out_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Cnr</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.cnr.from" @update:value="away_stats_cnr_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.cnr.to" @update:value="away_stats_cnr_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">DA</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.da.from" @update:value="away_stats_da_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.da.to" @update:value="away_stats_da_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Pos</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.pos.from" @update:value="away_stats_pos_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.pos.to" @update:value="away_stats_pos_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Red</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.red.from" @update:value="away_stats_red_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.red.to" @update:value="away_stats_red_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Yel</p>
                        <p class="value">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.yel.from" @update:value="away_stats_yel_from" class="minOdd1"></CInput>
                        </p>
                        <p class="percent">
                            <CInput type="number" min="0" max="90000000" :value="this.away_stats_filter.yel.to" @update:value="away_stats_yel_to" class="minOdd1"></CInput>
                        </p>
                    </div>
                </div>

                <div style="width: 100%; margin-top: 20px;">
                    <label>Results by Segment Time:</label>
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
                        <p v-if="this.score_stats.score0_15.score00 === 0" class="value">{{this.score_stats.score0_15.score00}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score00}} ({{(this.score_stats.score0_15.score00/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score00 === 0" class="percent">{{this.score_stats.score16_30.score00}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score00}} ({{(this.score_stats.score16_30.score00/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score00 === 0" class="value">{{this.score_stats.score31_45.score00}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score00}} ({{(this.score_stats.score31_45.score00/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score00 === 0" class="percent">{{this.score_stats.score46_60.score00}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score00}} ({{(this.score_stats.score46_60.score00/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score00 === 0" class="value">{{this.score_stats.score61_75.score00}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score00}} ({{(this.score_stats.score61_75.score00/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score00 === 0" class="percent">{{this.score_stats.score76_90.score00}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score00}} ({{(this.score_stats.score76_90.score00/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">1 - 1</p>
                        <p v-if="this.score_stats.score0_15.score11 === 0" class="value">{{this.score_stats.score0_15.score11}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score11}} ({{(this.score_stats.score0_15.score11/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score11 === 0" class="percent">{{this.score_stats.score16_30.score11}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score11}} ({{(this.score_stats.score16_30.score11/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score11 === 0" class="value">{{this.score_stats.score31_45.score11}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score11}} ({{(this.score_stats.score31_45.score11/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score11 === 0" class="percent">{{this.score_stats.score46_60.score11}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score11}} ({{(this.score_stats.score46_60.score11/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score11 === 0" class="value">{{this.score_stats.score61_75.score11}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score11}} ({{(this.score_stats.score61_75.score11/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score11 === 0" class="percent">{{this.score_stats.score76_90.score11}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score11}} ({{(this.score_stats.score76_90.score11/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">2 - 2</p>
                        <p v-if="this.score_stats.score0_15.score22 === 0" class="value">{{this.score_stats.score0_15.score22}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score22}} ({{(this.score_stats.score0_15.score22/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score22 === 0" class="percent">{{this.score_stats.score16_30.score22}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score22}} ({{(this.score_stats.score16_30.score22/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score22 === 0" class="value">{{this.score_stats.score31_45.score22}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score22}} ({{(this.score_stats.score31_45.score22/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score22 === 0" class="percent">{{this.score_stats.score46_60.score22}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score22}} ({{(this.score_stats.score46_60.score22/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score22 === 0" class="value">{{this.score_stats.score61_75.score22}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score22}} ({{(this.score_stats.score61_75.score22/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score22 === 0" class="percent">{{this.score_stats.score76_90.score22}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score22}} ({{(this.score_stats.score76_90.score22/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">1 - 0</p>
                        <p v-if="this.score_stats.score0_15.score10 === 0" class="value">{{this.score_stats.score0_15.score10}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score10}} ({{(this.score_stats.score0_15.score10/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score10 === 0" class="percent">{{this.score_stats.score16_30.score10}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score10}} ({{(this.score_stats.score16_30.score10/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score10 === 0" class="value">{{this.score_stats.score31_45.score10}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score10}} ({{(this.score_stats.score31_45.score10/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score10 === 0" class="percent">{{this.score_stats.score46_60.score10}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score10}} ({{(this.score_stats.score46_60.score10/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score10 === 0" class="value">{{this.score_stats.score61_75.score10}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score10}} ({{(this.score_stats.score61_75.score10/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score10 === 0" class="percent">{{this.score_stats.score76_90.score10}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score10}} ({{(this.score_stats.score76_90.score10/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">2 - 0</p>
                        <p v-if="this.score_stats.score0_15.score20 === 0" class="value">{{this.score_stats.score0_15.score20}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score20}} ({{(this.score_stats.score0_15.score20/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score20 === 0" class="percent">{{this.score_stats.score16_30.score20}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score20}} ({{(this.score_stats.score16_30.score20/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score20 === 0" class="value">{{this.score_stats.score31_45.score20}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score20}} ({{(this.score_stats.score31_45.score20/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score20 === 0" class="percent">{{this.score_stats.score46_60.score20}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score20}} ({{(this.score_stats.score46_60.score20/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score20 === 0" class="value">{{this.score_stats.score61_75.score20}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score20}} ({{(this.score_stats.score61_75.score20/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score20 === 0" class="percent">{{this.score_stats.score76_90.score20}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score20}} ({{(this.score_stats.score76_90.score20/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">3 - 0</p>
                        <p v-if="this.score_stats.score0_15.score20 === 0" class="value">{{this.score_stats.score0_15.score30}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score30}} ({{(this.score_stats.score0_15.score30/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score30 === 0" class="percent">{{this.score_stats.score16_30.score30}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score30}} ({{(this.score_stats.score16_30.score30/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score30 === 0" class="value">{{this.score_stats.score31_45.score30}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score30}} ({{(this.score_stats.score31_45.score30/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score30 === 0" class="percent">{{this.score_stats.score46_60.score30}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score30}} ({{(this.score_stats.score46_60.score30/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score30 === 0" class="value">{{this.score_stats.score61_75.score30}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score30}} ({{(this.score_stats.score61_75.score30/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score30 === 0" class="percent">{{this.score_stats.score76_90.score30}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score30}} ({{(this.score_stats.score76_90.score30/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">2 - 1</p>
                        <p v-if="this.score_stats.score0_15.score21 === 0" class="value">{{this.score_stats.score0_15.score21}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score21}} ({{(this.score_stats.score0_15.score21/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score21 === 0" class="percent">{{this.score_stats.score16_30.score21}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score21}} ({{(this.score_stats.score16_30.score21/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score21 === 0" class="value">{{this.score_stats.score31_45.score21}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score21}} ({{(this.score_stats.score31_45.score21/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score21 === 0" class="percent">{{this.score_stats.score46_60.score21}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score21}} ({{(this.score_stats.score46_60.score21/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score21 === 0" class="value">{{this.score_stats.score61_75.score21}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score21}} ({{(this.score_stats.score61_75.score21/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score21 === 0" class="percent">{{this.score_stats.score76_90.score21}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score21}} ({{(this.score_stats.score76_90.score21/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">3 - 1</p>
                        <p v-if="this.score_stats.score0_15.score31 === 0" class="value">{{this.score_stats.score0_15.score31}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score31}} ({{(this.score_stats.score0_15.score31/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score31 === 0" class="percent">{{this.score_stats.score16_30.score31}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score31}} ({{(this.score_stats.score16_30.score31/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score31 === 0" class="value">{{this.score_stats.score31_45.score31}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score31}} ({{(this.score_stats.score31_45.score31/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score31 === 0" class="percent">{{this.score_stats.score46_60.score31}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score31}} ({{(this.score_stats.score46_60.score31/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score31 === 0" class="value">{{this.score_stats.score61_75.score31}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score31}} ({{(this.score_stats.score61_75.score31/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score31 === 0" class="percent">{{this.score_stats.score76_90.score31}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score31}} ({{(this.score_stats.score76_90.score31/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">0 - 1</p>
                        <p v-if="this.score_stats.score0_15.score01 === 0" class="value">{{this.score_stats.score0_15.score01}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score01}} ({{(this.score_stats.score0_15.score01/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score01 === 0" class="percent">{{this.score_stats.score16_30.score01}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score01}} ({{(this.score_stats.score16_30.score01/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score01 === 0" class="value">{{this.score_stats.score31_45.score01}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score01}} ({{(this.score_stats.score31_45.score01/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score01 === 0" class="percent">{{this.score_stats.score46_60.score01}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score01}} ({{(this.score_stats.score46_60.score01/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score01 === 0" class="value">{{this.score_stats.score61_75.score01}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score01}} ({{(this.score_stats.score61_75.score01/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score01 === 0" class="percent">{{this.score_stats.score76_90.score01}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score01}} ({{(this.score_stats.score76_90.score01/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">0 - 2</p>
                        <p v-if="this.score_stats.score0_15.score02 === 0" class="value">{{this.score_stats.score0_15.score02}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score02}} ({{(this.score_stats.score0_15.score02/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score02 === 0" class="percent">{{this.score_stats.score16_30.score02}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score02}} ({{(this.score_stats.score16_30.score02/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score02 === 0" class="value">{{this.score_stats.score31_45.score02}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score02}} ({{(this.score_stats.score31_45.score02/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score02 === 0" class="percent">{{this.score_stats.score46_60.score02}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score02}} ({{(this.score_stats.score46_60.score02/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score02 === 0" class="value">{{this.score_stats.score61_75.score02}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score02}} ({{(this.score_stats.score61_75.score02/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score02 === 0" class="percent">{{this.score_stats.score76_90.score02}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score02}} ({{(this.score_stats.score76_90.score02/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">0 - 3</p>
                        <p v-if="this.score_stats.score0_15.score03 === 0" class="value">{{this.score_stats.score0_15.score03}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score03}} ({{(this.score_stats.score0_15.score03/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score03 === 0" class="percent">{{this.score_stats.score16_30.score03}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score03}} ({{(this.score_stats.score16_30.score03/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score03 === 0" class="value">{{this.score_stats.score31_45.score03}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score03}} ({{(this.score_stats.score31_45.score03/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score03 === 0" class="percent">{{this.score_stats.score46_60.score03}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score03}} ({{(this.score_stats.score46_60.score03/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score03 === 0" class="value">{{this.score_stats.score61_75.score03}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score03}} ({{(this.score_stats.score61_75.score03/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score03 === 0" class="percent">{{this.score_stats.score76_90.score03}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score03}} ({{(this.score_stats.score76_90.score03/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">1 - 2</p>
                        <p v-if="this.score_stats.score0_15.score12 === 0" class="value">{{this.score_stats.score0_15.score12}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score12}} ({{(this.score_stats.score0_15.score12/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score12 === 0" class="percent">{{this.score_stats.score16_30.score12}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score12}} ({{(this.score_stats.score16_30.score12/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score12 === 0" class="value">{{this.score_stats.score31_45.score12}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score12}} ({{(this.score_stats.score31_45.score12/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score12 === 0" class="percent">{{this.score_stats.score46_60.score12}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score12}} ({{(this.score_stats.score46_60.score12/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score12 === 0" class="value">{{this.score_stats.score61_75.score12}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score12}} ({{(this.score_stats.score61_75.score12/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score12 === 0" class="percent">{{this.score_stats.score76_90.score12}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score12}} ({{(this.score_stats.score76_90.score12/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">1 - 3</p>
                        <p v-if="this.score_stats.score0_15.score13 === 0" class="value">{{this.score_stats.score0_15.score13}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score13}} ({{(this.score_stats.score0_15.score13/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score13 === 0" class="percent">{{this.score_stats.score16_30.score13}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score13}} ({{(this.score_stats.score16_30.score13/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score13 === 0" class="value">{{this.score_stats.score31_45.score13}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score13}} ({{(this.score_stats.score31_45.score13/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score13 === 0" class="percent">{{this.score_stats.score46_60.score13}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score13}} ({{(this.score_stats.score46_60.score13/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score13 === 0" class="value">{{this.score_stats.score61_75.score13}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score13}} ({{(this.score_stats.score61_75.score13/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score13 === 0" class="percent">{{this.score_stats.score76_90.score13}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score13}} ({{(this.score_stats.score76_90.score13/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                </div>
                <div style="width: 100%; margin-top: 20px;">
                    <label>Stats by Segment Time:</label>
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
                        <p class="header">Over 1.5</p>
                        <p v-if="this.stats_segment.stats_0_15.score_over15 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_over15}} ({{(this.stats_segment.stats_0_15.score_over15/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_over15 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_over15}} ({{(this.stats_segment.stats_16_30.score_over15/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_over15 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_over15}} ({{(this.stats_segment.stats_31_45.score_over15/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_over15 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_over15}} ({{(this.stats_segment.stats_46_60.score_over15/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_over15 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_over15}} ({{(this.stats_segment.stats_61_75.score_over15/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_over15 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_over15}} ({{(this.stats_segment.stats_76_90.score_over15/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Over 2.5</p>
                        <p v-if="this.stats_segment.stats_0_15.score_over25 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_over25}} ({{(this.stats_segment.stats_0_15.score_over25/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_over25 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_over25}} ({{(this.stats_segment.stats_16_30.score_over25/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_over25 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_over25}} ({{(this.stats_segment.stats_31_45.score_over25/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_over25 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_over25}} ({{(this.stats_segment.stats_46_60.score_over25/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_over25 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_over25}} ({{(this.stats_segment.stats_61_75.score_over25/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_over25 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_over25}} ({{(this.stats_segment.stats_76_90.score_over25/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Over 3.5</p>
                        <p v-if="this.stats_segment.stats_0_15.score_over35 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_over35}} ({{(this.stats_segment.stats_0_15.score_over35/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_over35 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_over35}} ({{(this.stats_segment.stats_16_30.score_over35/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_over35 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_over35}} ({{(this.stats_segment.stats_31_45.score_over35/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_over35 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_over35}} ({{(this.stats_segment.stats_46_60.score_over35/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_over35 === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_over35}} ({{(this.stats_segment.stats_61_75.score_over35/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_over35 === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_over35}} ({{(this.stats_segment.stats_76_90.score_over35/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Home</p>
                        <p v-if="this.stats_segment.stats_0_15.score_home === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_home}} ({{(this.stats_segment.stats_0_15.score_home/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_home === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_home}} ({{(this.stats_segment.stats_16_30.score_home/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_home === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_home}} ({{(this.stats_segment.stats_31_45.score_home/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_home === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_home}} ({{(this.stats_segment.stats_46_60.score_home/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_home === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_home}} ({{(this.stats_segment.stats_61_75.score_home/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_home === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_home}} ({{(this.stats_segment.stats_76_90.score_home/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Draws</p>
                        <p v-if="this.stats_segment.stats_0_15.score_draw === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_draw}} ({{(this.stats_segment.stats_0_15.score_draw/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_draw === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_draw}} ({{(this.stats_segment.stats_16_30.score_draw/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_draw === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_draw}} ({{(this.stats_segment.stats_31_45.score_draw/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_draw === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_draw}} ({{(this.stats_segment.stats_46_60.score_draw/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_draw === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_draw}} ({{(this.stats_segment.stats_61_75.score_draw/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_draw === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_draw}} ({{(this.stats_segment.stats_76_90.score_draw/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Away</p>
                        <p v-if="this.stats_segment.stats_0_15.score_away === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_away}} ({{(this.stats_segment.stats_0_15.score_away/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_away === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_away}} ({{(this.stats_segment.stats_16_30.score_away/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_away === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_away}} ({{(this.stats_segment.stats_31_45.score_away/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_away === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_away}} ({{(this.stats_segment.stats_46_60.score_away/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_away === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_away}} ({{(this.stats_segment.stats_61_75.score_away/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_away === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_away}} ({{(this.stats_segment.stats_76_90.score_away/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">BTS</p>
                        <p v-if="this.stats_segment.stats_0_15.score_bts === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_bts}} ({{(this.stats_segment.stats_0_15.score_bts/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_bts === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_bts}} ({{(this.stats_segment.stats_16_30.score_bts/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_bts === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_bts}} ({{(this.stats_segment.stats_31_45.score_bts/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_bts === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_bts}} ({{(this.stats_segment.stats_46_60.score_bts/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_bts === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_bts}} ({{(this.stats_segment.stats_61_75.score_bts/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_bts === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_bts}} ({{(this.stats_segment.stats_76_90.score_bts/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Odd</p>
                        <p v-if="this.stats_segment.stats_0_15.score_odd === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_odd}} ({{(this.stats_segment.stats_0_15.score_odd/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_odd === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_odd}} ({{(this.stats_segment.stats_16_30.score_odd/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_odd === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_odd}} ({{(this.stats_segment.stats_31_45.score_odd/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_odd === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_odd}} ({{(this.stats_segment.stats_46_60.score_odd/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_odd === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_odd}} ({{(this.stats_segment.stats_61_75.score_odd/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_odd === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_odd}} ({{(this.stats_segment.stats_76_90.score_odd/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">Even</p>
                        <p v-if="this.stats_segment.stats_0_15.score_even === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_0_15.score_even}} ({{(this.stats_segment.stats_0_15.score_even/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_16_30.score_even === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_16_30.score_even}} ({{(this.stats_segment.stats_16_30.score_even/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_31_45.score_even === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_31_45.score_even}} ({{(this.stats_segment.stats_31_45.score_even/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_46_60.score_even === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_46_60.score_even}} ({{(this.stats_segment.stats_46_60.score_even/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_61_75.score_even === 0" class="value">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_61_75.score_even}} ({{(this.stats_segment.stats_61_75.score_even/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
                        <p v-if="this.stats_segment.stats_76_90.score_even === 0" class="percent">0</p>
                        <p v-else class="value">{{this.stats_segment.stats_76_90.score_even}} ({{(this.stats_segment.stats_76_90.score_even/(matches_found - s_missed_betfair)*100).toFixed(0)}}%)</p>
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
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_home1.goal/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_home1.on/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_home1.off/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_home1.blk/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_home1.in/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_home1.out/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_home1.cnr/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_home1.da/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_home1.pos/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_home1.red/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_home1.yel/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                    </div>
                    <div style="display: flex; height: 30px; width: 100%; text-align: left; padding-left: 5px; text-align: center; color: black; padding-top: 3px; border: 1px solid lightgray; border-top: none;">
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_away1.goal/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_away1.on/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_away1.off/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_away1.blk/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_away1.in/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_away1.out/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_away1.cnr/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_away1.da/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_away1.pos/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_away1.red/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                        <div v-if="matches_found != 0" style="flex: 1; text-align: center;">{{((last_stats_away1.yel/(matches_found - s_missed_livestats))).toFixed(1)}}</div>
                        <div v-else style="flex: 1; text-align: center;">{{(0).toFixed(1)}}</div>
                    </div>
                </div>

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
                                <div v-if="live_segment_stats1.stats_76_90.away.goal == 0" style="height: 15px;">{{live_segment_stats1.stats_76_90.away.goal}}</div>
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
                                <div v-if="live_segment_stats1.stats_76_90.home.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.out}}</div>
                                <div v-else style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.home.out}} ({{(live_segment_stats1.stats_76_90.home.out/(live_segment_stats1.stats_0_15.home.out + live_segment_stats1.stats_16_30.home.out + live_segment_stats1.stats_31_45.home.out + live_segment_stats1.stats_46_60.home.out + live_segment_stats1.stats_61_75.home.out + live_segment_stats1.stats_76_90.home.out)*100).toFixed(0)}}%)</div>
                                <div v-if="live_segment_stats1.stats_76_90.away.out == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_76_90.away.out}}</div>
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
                                <div v-if="live_segment_stats1.stats_16_30.away.yel == 0" style="height: 15px; font-size: 11px!important;">{{live_segment_stats1.stats_16_30.away.yel}}</div>
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
            <CCol lg="6" style="height: 415px; width: 50%!important; padding: 40px; padding-top: 50px;">
                <div style="width: 100%;">
                    <label style="float: left;">Match List Result:</label>
                    <CSelect
                            class="matchlist"
                            :options="predictionlist"
                            @update:value="select_prediction"
                    >
                    </CSelect>
                    <div style="float: left;">
                        <CButton color="danger" @click="delete_prediction" class="prediction-delete-button">
                            Delete
                        </CButton>
                    </div>
                    <div style="float: left;">
                        <CButton color="success" @click="score_prediction" class="prediction-delete-button">
                            Get Score
                        </CButton>
                    </div>
                </div>
                <div style="display: flex; width: 100%; font-weight: 600;">
                    <div style="flex: 1;">
                        League:
                    </div>
                    <div style="flex: 1;">
                        {{this.currentCompetition}}
                    </div>
                    <div style="flex: 1;">
                        Total Matched:
                    </div>
                    <div style="flex: 1;">
                        &euro;{{this.total_matched_money}}
                    </div>
                </div>
                <div style="display: flex; width: 50%; margin-top: 30px;">
                    <div style="flex: 1;">
                        eventId:
                    </div>
                    <div style="flex: 1;font-weight: 600; color: blue;">
                        {{this.currentEventId}}
                    </div>
                    <div style="flex: 1;">
                        marketId:
                    </div>
                    <div style="flex: 1;font-weight: 600; color: red;">
                        {{this.currentMarketId}}
                    </div>
                </div>

                <div v-if="currentPredictionType === 'MATCH_ODDS'" style="display: flex; width: 100%; font-weight: 600; margin-top: 10px;">
                    <div style="flex: 1;">
                        1X2 Pre match:
                    </div>
                    <div style="flex: 1; font-weight: normal; text-align: center;">
                        <div>
                            1
                        </div>
                        <div style="display: flex">
                            <div style="flex: 1; text-align: center;">
                                {{currentPrematchOdd[0].exchange.availableToBack[0].price}}
                            </div>
                            <div style="flex: 1; text-align: center;">
                                {{currentPrematchOdd[0].exchange.availableToLay[0].price}}
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1;  font-weight: normal; text-align: center;">
                        <div>
                            X
                        </div>
                        <div style="display: flex">
                            <div style="flex: 1; text-align: center;">
                                {{currentPrematchOdd[2].exchange.availableToBack[0].price}}
                            </div>
                            <div style="flex: 1; text-align: center;">
                                {{currentPrematchOdd[2].exchange.availableToLay[0].price}}
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1;  font-weight: normal; text-align: center;">
                        <div>
                            2
                        </div>
                        <div style="display: flex">
                            <div style="flex: 1; text-align: center;">
                                {{currentPrematchOdd[1].exchange.availableToBack[0].price}}
                            </div>
                            <div style="flex: 1; text-align: center;">
                                {{currentPrematchOdd[1].exchange.availableToLay[0].price}}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="currentPredictionType != 'MATCH_ODDS' && currentPredictionType != ''" style="display: flex; width: 100%; font-weight: 600; margin-top: 10px;">
                    <div style="flex: 1;">
                        U/O {{currentPredictionType}} Pre match:
                    </div>
                    <div style="flex: 1; font-weight: normal; text-align: center;">
                        <div>
                            Under {{currentPredictionType}}
                        </div>
                        <div style="display: flex">
                            <div style="flex: 1; text-align: center;">
                                {{currentPrematchOdd[0].exchange.availableToBack[0].price}}
                            </div>
                            <div style="flex: 1; text-align: center;">
                                {{currentPrematchOdd[0].exchange.availableToLay[0].price}}
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1;  font-weight: normal; text-align: center;">
                        <div>
                            Over {{currentPredictionType}}
                        </div>
                        <div style="display: flex">
                            <div style="flex: 1; text-align: center;">
                                {{currentPrematchOdd[1].exchange.availableToBack[0].price}}
                            </div>
                            <div style="flex: 1; text-align: center;">
                                {{currentPrematchOdd[1].exchange.availableToLay[0].price}}
                            </div>
                        </div>
                    </div>

                </div>
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
<!--                <div style="width: 100%;">-->
<!--                    <label style="margin-top: 20px;">Selected Match Stats:</label>-->
<!--                </div>-->
<!--                <div style="text-align: center;">-->
<!--                    <div style="display: flex; width: 100%;">-->
<!--                        <div style="flex: 1; text-align: left;">-->
<!--                            Risk:-->
<!--                        </div>-->
<!--                        <div style="flex: 1; background: #92d050">-->
<!--                            Easy-->
<!--                        </div>-->
<!--                        <div style="flex: 1; background: #ffff00">-->
<!--                            Medium-->
<!--                        </div>-->
<!--                        <div style="flex: 1; background: #fd4016">-->
<!--                            Hard-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div style="display: flex; width: 100%;">-->
<!--                        <div style="flex: 1; text-align: left;">-->
<!--                            Profit%:-->
<!--                        </div>-->
<!--                        <div style="flex: 1;">-->
<!--                            31.00-->
<!--                        </div>-->
<!--                        <div style="flex: 1;">-->
<!--                            56.00-->
<!--                        </div>-->
<!--                        <div style="flex: 1;">-->
<!--                            -40.00-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div style="display: flex; width: 100%;">-->
<!--                        <div style="flex: 1; text-align: left;">-->
<!--                            Cashout minute:-->
<!--                        </div>-->
<!--                        <div style="flex: 1;">-->
<!--                            35-->
<!--                        </div>-->
<!--                        <div style="flex: 1;">-->
<!--                            60-->
<!--                        </div>-->
<!--                        <div style="flex: 1;">-->
<!--                            72-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div style="display: flex; width: 100%;">-->
<!--                        <div style="flex: 1; text-align: left;">-->
<!--                            Cash Out Odds:-->
<!--                        </div>-->
<!--                        <div style="flex: 1;">-->
<!--                            4.60-->
<!--                        </div>-->
<!--                        <div style="flex: 1;">-->
<!--                            5.80-->
<!--                        </div>-->
<!--                        <div style="flex: 1;">-->
<!--                            1.80-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div style="display: flex; width: 100%;">-->
<!--                        <div style="flex: 1; text-align: left;">-->
<!--                            Score:-->
<!--                        </div>-->
<!--                        <div style="flex: 1;">-->
<!--                            0 - 1-->
<!--                        </div>-->
<!--                        <div style="flex: 1;">-->
<!--                            0 - 1-->
<!--                        </div>-->
<!--                        <div style="flex: 1;">-->
<!--                            1 - 1-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->

                <div style="margin-top: 20px;">
                    <div class="stats-header">
                        <div class="stats-header-detail">
                            On
                        </div>
                        <div class="stats-header-detail">
                            Off
                        </div>
                        <div class="stats-header-detail">
                            Blk
                        </div>
                        <div class="stats-header-detail">
                            In
                        </div>
                        <div class="stats-header-detail">
                            Out
                        </div>
                        <div class="stats-header-detail">
                            Pos
                        </div>
                        <div class="stats-header-detail">
                            Cnr
                        </div>
                        <div class="stats-header-detail">
                            Da
                        </div>
                        <div class="stats-header-detail">
                            Red
                        </div>
                        <div class="stats-header-detail">
                            Rtg
                        </div>
                    </div>
                    <div class="stats-content">
                        <div class="stats-header-detail">
                            {{last_stats_home.on}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_home.off}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_home.blk}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_home.in}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_home.out}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_home.pos}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_home.cnr}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_home.da}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_home.red}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_home.rtg}}
                        </div>
                    </div>
                    <div class="stats-content">
                        <div class="stats-header-detail">
                            {{last_stats_away.on}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_away.off}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_away.blk}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_away.in}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_away.out}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_away.pos}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_away.cnr}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_away.da}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_away.red}}
                        </div>
                        <div class="stats-header-detail">
                            {{last_stats_away.rtg}}
                        </div>
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    <div style="display: flex; width: 50%;">
                        <div style="flex: 1; width: 25%">
                            odd_Back_prematch:
                        </div>
                        <div style="flex: 1; width: 15%; font-weight: 600; text-align: center;">
                            {{odd_back_prematch}}
                        </div>
                    </div>
                    <div style="display: flex; width: 50%;">
                        <div style="flex: 1; width: 25%">
                            odd_lay_prematch:
                        </div>
                        <div style="flex: 1; width: 15%; font-weight: 600; text-align: center;">
                            {{odd_lay_prematch}}
                        </div>
                    </div>
                    <div style="display: flex; width: 50%; padding-top: 3px;">
                        <div style="flex: 1;">
                            first_goal_score:
                        </div>
                        <div style="flex: 1; font-weight: 600; text-align: center;">
                            {{first_goal_score}}
                        </div>
                    </div>
                    <div style="display: flex; width: 50%; padding-top: 3px;">
                        <div style="flex: 1;">
                            first_goal_minute:
                        </div>
                        <div style="flex: 1; font-weight: 600; text-align: center;">
                            {{first_goal_time}}
                        </div>
                    </div>
                    <div style="display: flex; width: 50%; padding-top: 3px;">
                        <div style="flex: 1;">
                            halftime_score:
                        </div>
                        <div style="flex: 1; font-weight: 600; text-align: center;">
                            {{half_time_score}}
                        </div>
                    </div>
                    <div style="display: flex; width: 50%; padding-top: 3px;">
                        <div style="flex: 1;">
                            Final_score:
                        </div>
                        <div style="flex: 1; font-weight: 600; text-align: center;">
                            {{final_score}}
                        </div>
                    </div>
                </div>
                <div style="margin-top: 10px;">
                    <label style="margin-top: 20px; margin-bottom: 0;">Timeline:</label>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%; background: #8db4e2; border: 1px solid white; border-bottom: none; border-right: none; color: black;">
                            First Half
                        </div>
                    </div>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">Minute:</div>
                            <div class="value1">
                                Odds:
                            </div>
                            <div class="value1">
                                Scores:
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">1</div>
                            <div class="value1" :style="{'background': hf_colorArray[1]}">
                                {{half_first_Odds[1]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[1]}">
                                {{half_first_Scores[1]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">2</div>
                            <div class="value1" :style="{'background': hf_colorArray[2]}">
                                {{half_first_Odds[2]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[2]}">
                                {{half_first_Scores[2]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">3</div>
                            <div class="value1" :style="{'background': hf_colorArray[3]}">
                                {{half_first_Odds[3]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[3]}">
                                {{half_first_Scores[3]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">4</div>
                            <div class="value1" :style="{'background': hf_colorArray[4]}">
                                {{half_first_Odds[4]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[4]}">
                                {{half_first_Scores[4]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">5</div>
                            <div class="value1" :style="{'background': hf_colorArray[5]}">
                                {{half_first_Odds[5]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[5]}">
                                {{half_first_Scores[5]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">6</div>
                            <div class="value1" :style="{'background': hf_colorArray[6]}">
                                {{half_first_Odds[6]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[6]}">
                                {{half_first_Scores[6]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">7</div>
                            <div class="value1" :style="{'background': hf_colorArray[7]}">
                                {{half_first_Odds[7]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[7]}">
                                {{half_first_Scores[7]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">8</div>
                            <div class="value1" :style="{'background': hf_colorArray[8]}">
                                {{half_first_Odds[8]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[8]}">
                                {{half_first_Scores[8]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">9</div>
                            <div class="value1" :style="{'background': hf_colorArray[9]}">
                                {{half_first_Odds[9]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[9]}">
                                {{half_first_Scores[9]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">10</div>
                            <div class="value1" :style="{'background': hf_colorArray[10]}">
                                {{half_first_Odds[10]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[10]}">
                                {{half_first_Scores[10]}}
                            </div>
                        </div>
                    </div>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">Minute:</div>
                            <div class="value1">
                                Odds:
                            </div>
                            <div class="value1">
                                Scores:
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">11</div>
                            <div class="value1" :style="{'background': hf_colorArray[11]}">
                                {{half_first_Odds[11]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[11]}">
                                {{half_first_Scores[11]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">12</div>
                            <div class="value1" :style="{'background': hf_colorArray[12]}">
                                {{half_first_Odds[12]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[12]}">
                                {{half_first_Scores[12]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">13</div>
                            <div class="value1" :style="{'background': hf_colorArray[13]}">
                                {{half_first_Odds[13]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[13]}">
                                {{half_first_Scores[13]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">14</div>
                            <div class="value1" :style="{'background': hf_colorArray[14]}">
                                {{half_first_Odds[14]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[14]}">
                                {{half_first_Scores[14]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">15</div>
                            <div class="value1" :style="{'background': hf_colorArray[15]}">
                                {{half_first_Odds[15]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[15]}">
                                {{half_first_Scores[15]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">16</div>
                            <div class="value1" :style="{'background': hf_colorArray[16]}">
                                {{half_first_Odds[16]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[16]}">
                                {{half_first_Scores[16]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">17</div>
                            <div class="value1" :style="{'background': hf_colorArray[17]}">
                                {{half_first_Odds[17]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[17]}">
                                {{half_first_Scores[17]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">18</div>
                            <div class="value1" :style="{'background': hf_colorArray[18]}">
                                {{half_first_Odds[18]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[18]}">
                                {{half_first_Scores[18]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">19</div>
                            <div class="value1" :style="{'background': hf_colorArray[19]}">
                                {{half_first_Odds[19]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[19]}">
                                {{half_first_Scores[19]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">20</div>
                            <div class="value1" :style="{'background': hf_colorArray[20]}">
                                {{half_first_Odds[20]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[20]}">
                                {{half_first_Scores[20]}}
                            </div>
                        </div>
                    </div>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">Minute:</div>
                            <div class="value1">
                                Odds:
                            </div>
                            <div class="value1">
                                Scores:
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">21</div>
                            <div class="value1" :style="{'background': hf_colorArray[21]}">
                                {{half_first_Odds[21]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[21]}">
                                {{half_first_Scores[21]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">22</div>
                            <div class="value1" :style="{'background': hf_colorArray[22]}">
                                {{half_first_Odds[22]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[22]}">
                                {{half_first_Scores[22]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">23</div>
                            <div class="value1" :style="{'background': hf_colorArray[23]}">
                                {{half_first_Odds[23]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[23]}">
                                {{half_first_Scores[23]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">24</div>
                            <div class="value1" :style="{'background': hf_colorArray[24]}">
                                {{half_first_Odds[24]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[24]}">
                                {{half_first_Scores[24]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">25</div>
                            <div class="value1" :style="{'background': hf_colorArray[25]}">
                                {{half_first_Odds[25]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[25]}">
                                {{half_first_Scores[25]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">26</div>
                            <div class="value1" :style="{'background': hf_colorArray[26]}">
                                {{half_first_Odds[26]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[26]}">
                                {{half_first_Scores[26]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">27</div>
                            <div class="value1" :style="{'background': hf_colorArray[27]}">
                                {{half_first_Odds[27]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[27]}">
                                {{half_first_Scores[27]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">28</div>
                            <div class="value1" :style="{'background': hf_colorArray[28]}">
                                {{half_first_Odds[28]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[28]}">
                                {{half_first_Scores[28]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">29</div>
                            <div class="value1" :style="{'background': hf_colorArray[29]}">
                                {{half_first_Odds[29]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[29]}">
                                {{half_first_Scores[29]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">30</div>
                            <div class="value1" :style="{'background': hf_colorArray[30]}">
                                {{half_first_Odds[30]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[30]}">
                                {{half_first_Scores[30]}}
                            </div>
                        </div>
                    </div>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">Minute:</div>
                            <div class="value1">
                                Odds:
                            </div>
                            <div class="value1">
                                Scores:
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">31</div>
                            <div class="value1" :style="{'background': hf_colorArray[31]}">
                                {{half_first_Odds[31]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[31]}">
                                {{half_first_Scores[31]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">32</div>
                            <div class="value1" :style="{'background': hf_colorArray[32]}">
                                {{half_first_Odds[32]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[32]}">
                                {{half_first_Scores[32]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">33</div>
                            <div class="value1" :style="{'background': hf_colorArray[33]}">
                                {{half_first_Odds[33]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[33]}">
                                {{half_first_Scores[33]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">34</div>
                            <div class="value1" :style="{'background': hf_colorArray[34]}">
                                {{half_first_Odds[34]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[34]}">
                                {{half_first_Scores[34]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">35</div>
                            <div class="value1" :style="{'background': hf_colorArray[35]}">
                                {{half_first_Odds[35]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[35]}">
                                {{half_first_Scores[35]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">36</div>
                            <div class="value1" :style="{'background': hf_colorArray[36]}">
                                {{half_first_Odds[36]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[36]}">
                                {{half_first_Scores[36]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">37</div>
                            <div class="value1" :style="{'background': hf_colorArray[37]}">
                                {{half_first_Odds[37]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[37]}">
                                {{half_first_Scores[37]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">38</div>
                            <div class="value1" :style="{'background': hf_colorArray[38]}">
                                {{half_first_Odds[38]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[38]}">
                                {{half_first_Scores[38]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">39</div>
                            <div class="value1" :style="{'background': hf_colorArray[39]}">
                                {{half_first_Odds[39]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[39]}">
                                {{half_first_Scores[39]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">40</div>
                            <div class="value1" :style="{'background': hf_colorArray[40]}">
                                {{half_first_Odds[40]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[40]}">
                                {{half_first_Scores[40]}}
                            </div>
                        </div>
                    </div>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">Minute:</div>
                            <div class="value1">
                                Odds:
                            </div>
                            <div class="value1">
                                Scores:
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">41</div>
                            <div class="value1" :style="{'background': hf_colorArray[41]}">
                                {{half_first_Odds[41]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[41]}">
                                {{half_first_Scores[41]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">42</div>
                            <div class="value1" :style="{'background': hf_colorArray[42]}">
                                {{half_first_Odds[42]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[42]}">
                                {{half_first_Scores[42]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">43</div>
                            <div class="value1" :style="{'background': hf_colorArray[43]}">
                                {{half_first_Odds[43]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[43]}">
                                {{half_first_Scores[43]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">44</div>
                            <div class="value1" :style="{'background': hf_colorArray[44]}">
                                {{half_first_Odds[44]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[44]}">
                                {{half_first_Scores[44]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">45</div>
                            <div class="value1" :style="{'background': hf_colorArray[45]}">
                                {{half_first_Odds[45]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[45]}">
                                {{half_first_Scores[45]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: rgba(250,175,0,0.47);">46</div>
                            <div class="value1" :style="{'background': hf_colorArray[46]}">
                                {{half_first_Odds[46]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[46]}">
                                {{half_first_Scores[46]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: rgba(250,175,0,0.47);">47</div>
                            <div class="value1" :style="{'background': hf_colorArray[47]}">
                                {{half_first_Odds[47]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[47]}">
                                {{half_first_Scores[47]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: rgba(250,175,0,0.47);">48</div>
                            <div class="value1" :style="{'background': hf_colorArray[48]}">
                                {{half_first_Odds[48]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[48]}">
                                {{half_first_Scores[48]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: rgba(250,175,0,0.47);">49</div>
                            <div class="value1" :style="{'background': hf_colorArray[49]}">
                                {{half_first_Odds[49]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[49]}">
                                {{half_first_Scores[49]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: rgba(250,175,0,0.47);">50</div>
                            <div class="value1" :style="{'background': hf_colorArray[50]}">
                                {{half_first_Odds[50]}}
                            </div>
                            <div class="value1" :style="{'background': hf_colorArray[50]}">
                                {{half_first_Scores[50]}}
                            </div>
                        </div>
                    </div>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%; background: #8db4e2; border: 1px solid white; border-bottom: none;border-right: none; color: black;">
                            Second Half
                        </div>
                    </div>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">Minute:</div>
                            <div class="value1">
                                Odds:
                            </div>
                            <div class="value1">
                                Scores:
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">46</div>
                            <div class="value1" :style="{'background': hs_colorArray[46]}">
                                {{half_second_Odds[46]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[46]}">
                                {{half_second_Scores[46]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">47</div>
                            <div class="value1" :style="{'background': hs_colorArray[47]}">
                                {{half_second_Odds[47]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[47]}">
                                {{half_second_Scores[47]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">48</div>
                            <div class="value1" :style="{'background': hs_colorArray[48]}">
                                {{half_second_Odds[48]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[48]}">
                                {{half_second_Scores[48]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">49</div>
                            <div class="value1" :style="{'background': hs_colorArray[49]}">
                                {{half_second_Odds[49]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[49]}">
                                {{half_second_Scores[49]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">50</div>
                            <div class="value1" :style="{'background': hs_colorArray[50]}">
                                {{half_second_Odds[50]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[50]}">
                                {{half_second_Scores[50]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">51</div>
                            <div class="value1" :style="{'background': hs_colorArray[51]}">
                                {{half_second_Odds[51]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[51]}">
                                {{half_second_Scores[51]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">52</div>
                            <div class="value1" :style="{'background': hs_colorArray[52]}">
                                {{half_second_Odds[52]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[52]}">
                                {{half_second_Scores[52]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">53</div>
                            <div class="value1" :style="{'background': hs_colorArray[53]}">
                                {{half_second_Odds[53]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[53]}">
                                {{half_second_Scores[53]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">54</div>
                            <div class="value1" :style="{'background': hs_colorArray[54]}">
                                {{half_second_Odds[54]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[54]}">
                                {{half_second_Scores[54]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">55</div>
                            <div class="value1" :style="{'background': hs_colorArray[55]}">
                                {{half_second_Odds[55]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[55]}">
                                {{half_second_Scores[55]}}
                            </div>
                        </div>
                    </div>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">Minute:</div>
                            <div class="value1">
                                Odds:
                            </div>
                            <div class="value1">
                                Scores:
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">56</div>
                            <div class="value1" :style="{'background': hs_colorArray[56]}">
                                {{half_second_Odds[56]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[56]}">
                                {{half_second_Scores[56]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">57</div>
                            <div class="value1" :style="{'background': hs_colorArray[57]}">
                                {{half_second_Odds[57]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[57]}">
                                {{half_second_Scores[57]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">58</div>
                            <div class="value1" :style="{'background': hs_colorArray[58]}">
                                {{half_second_Odds[58]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[58]}">
                                {{half_second_Scores[58]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">59</div>
                            <div class="value1" :style="{'background': hs_colorArray[59]}">
                                {{half_second_Odds[59]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[59]}">
                                {{half_second_Scores[59]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">60</div>
                            <div class="value1" :style="{'background': hs_colorArray[60]}">
                                {{half_second_Odds[60]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[60]}">
                                {{half_second_Scores[60]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">61</div>
                            <div class="value1" :style="{'background': hs_colorArray[61]}">
                                {{half_second_Odds[61]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[61]}">
                                {{half_second_Scores[61]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">62</div>
                            <div class="value1" :style="{'background': hs_colorArray[62]}">
                                {{half_second_Odds[62]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[62]}">
                                {{half_second_Scores[62]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">63</div>
                            <div class="value1" :style="{'background': hs_colorArray[63]}">
                                {{half_second_Odds[63]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[63]}">
                                {{half_second_Scores[63]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">64</div>
                            <div class="value1" :style="{'background': hs_colorArray[64]}">
                                {{half_second_Odds[64]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[64]}">
                                {{half_second_Scores[64]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">65</div>
                            <div class="value1" :style="{'background': hs_colorArray[65]}">
                                {{half_second_Odds[65]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[65]}">
                                {{half_second_Scores[65]}}
                            </div>
                        </div>
                    </div>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">Minute:</div>
                            <div class="value1">
                                Odds:
                            </div>
                            <div class="value1">
                                Scores:
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">66</div>
                            <div class="value1" :style="{'background': hs_colorArray[66]}">
                                {{half_second_Odds[66]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[66]}">
                                {{half_second_Scores[66]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">67</div>
                            <div class="value1" :style="{'background': hs_colorArray[67]}">
                                {{half_second_Odds[67]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[67]}">
                                {{half_second_Scores[67]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">68</div>
                            <div class="value1" :style="{'background': hs_colorArray[68]}">
                                {{half_second_Odds[68]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[68]}">
                                {{half_second_Scores[68]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">69</div>
                            <div class="value1" :style="{'background': hs_colorArray[69]}">
                                {{half_second_Odds[69]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[69]}">
                                {{half_second_Scores[69]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">70</div>
                            <div class="value1" :style="{'background': hs_colorArray[70]}">
                                {{half_second_Odds[70]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[70]}">
                                {{half_second_Scores[70]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">71</div>
                            <div class="value1" :style="{'background': hs_colorArray[71]}">
                                {{half_second_Odds[71]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[71]}">
                                {{half_second_Scores[71]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">72</div>
                            <div class="value1" :style="{'background': hs_colorArray[72]}">
                                {{half_second_Odds[72]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[72]}">
                                {{half_second_Scores[72]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">73</div>
                            <div class="value1" :style="{'background': hs_colorArray[73]}">
                                {{half_second_Odds[73]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[73]}">
                                {{half_second_Scores[73]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">74</div>
                            <div class="value1" :style="{'background': hs_colorArray[74]}">
                                {{half_second_Odds[74]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[74]}">
                                {{half_second_Scores[74]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">75</div>
                            <div class="value1" :style="{'background': hs_colorArray[75]}">
                                {{half_second_Odds[75]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[75]}">
                                {{half_second_Scores[75]}}
                            </div>
                        </div>
                    </div>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">Minute:</div>
                            <div class="value1">
                                Odds:
                            </div>
                            <div class="value1">
                                Scores:
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">76</div>
                            <div class="value1" :style="{'background': hs_colorArray[76]}">
                                {{half_second_Odds[76]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[76]}">
                                {{half_second_Scores[76]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">77</div>
                            <div class="value1" :style="{'background': hs_colorArray[77]}">
                                {{half_second_Odds[77]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[77]}">
                                {{half_second_Scores[77]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">78</div>
                            <div class="value1" :style="{'background': hs_colorArray[78]}">
                                {{half_second_Odds[78]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[78]}">
                                {{half_second_Scores[78]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">79</div>
                            <div class="value1" :style="{'background': hs_colorArray[79]}">
                                {{half_second_Odds[79]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[79]}">
                                {{half_second_Scores[79]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">80</div>
                            <div class="value1" :style="{'background': hs_colorArray[80]}">
                                {{half_second_Odds[80]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[80]}">
                                {{half_second_Scores[80]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">81</div>
                            <div class="value1" :style="{'background': hs_colorArray[81]}">
                                {{half_second_Odds[81]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[81]}">
                                {{half_second_Scores[81]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">82</div>
                            <div class="value1" :style="{'background': hs_colorArray[82]}">
                                {{half_second_Odds[82]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[82]}">
                                {{half_second_Scores[82]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">83</div>
                            <div class="value1" :style="{'background': hs_colorArray[83]}">
                                {{half_second_Odds[83]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[83]}">
                                {{half_second_Scores[83]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">84</div>
                            <div class="value1" :style="{'background': hs_colorArray[84]}">
                                {{half_second_Odds[84]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[84]}">
                                {{half_second_Scores[84]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">85</div>
                            <div class="value1" :style="{'background': hs_colorArray[85]}">
                                {{half_second_Odds[85]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[85]}">
                                {{half_second_Scores[85]}}
                            </div>
                        </div>
                    </div>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">Minute:</div>
                            <div class="value1">
                                Odds:
                            </div>
                            <div class="value1">
                                Scores:
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">86</div>
                            <div class="value1" :style="{'background': hs_colorArray[86]}">
                                {{half_second_Odds[86]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[86]}">
                                {{half_second_Scores[86]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">87</div>
                            <div class="value1" :style="{'background': hs_colorArray[87]}">
                                {{half_second_Odds[87]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[87]}">
                                {{half_second_Scores[87]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">88</div>
                            <div class="value1" :style="{'background': hs_colorArray[88]}">
                                {{half_second_Odds[88]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[88]}">
                                {{half_second_Scores[88]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">89</div>
                            <div class="value1" :style="{'background': hs_colorArray[89]}">
                                {{half_second_Odds[89]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[89]}">
                                {{half_second_Scores[89]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">90</div>
                            <div class="value1" :style="{'background': hs_colorArray[90]}">
                                {{half_second_Odds[90]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[90]}">
                                {{half_second_Scores[90]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">91</div>
                            <div class="value1" :style="{'background': hs_colorArray[91]}">
                                {{half_second_Odds[91]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[91]}">
                                {{half_second_Scores[91]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">92</div>
                            <div class="value1" :style="{'background': hs_colorArray[92]}">
                                {{half_second_Odds[92]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[92]}">
                                {{half_second_Scores[92]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">93</div>
                            <div class="value1" :style="{'background': hs_colorArray[93]}">
                                {{half_second_Odds[93]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[93]}">
                                {{half_second_Scores[93]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">94</div>
                            <div class="value1" :style="{'background': hs_colorArray[94]}">
                                {{half_second_Odds[94]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[94]}">
                                {{half_second_Scores[94]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">95</div>
                            <div class="value1" :style="{'background': hs_colorArray[95]}">
                                {{half_second_Odds[95]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[95]}">
                                {{half_second_Scores[95]}}
                            </div>
                        </div>
                    </div>
                    <div class="totalMatches" style="display: flex; width: 100%; text-align: center">
                        <div style="flex: 1; width: 25%;">
                            <div class="header1">Minute:</div>
                            <div class="value1">
                                Odds:
                            </div>
                            <div class="value1">
                                Scores:
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">96</div>
                            <div class="value1" :style="{'background': hs_colorArray[96]}">
                                {{half_second_Odds[96]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[96]}">
                                {{half_second_Scores[96]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">97</div>
                            <div class="value1" :style="{'background': hs_colorArray[97]}">
                                {{half_second_Odds[97]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[97]}">
                                {{half_second_Scores[97]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">98</div>
                            <div class="value1" :style="{'background': hs_colorArray[98]}">
                                {{half_second_Odds[98]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[98]}">
                                {{half_second_Scores[98]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">99</div>
                            <div class="value1" :style="{'background': hs_colorArray[99]}">
                                {{half_second_Odds[99]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[99]}">
                                {{half_second_Scores[99]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">100</div>
                            <div class="value1" :style="{'background': hs_colorArray[100]}">
                                {{half_second_Odds[100]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[100]}">
                                {{half_second_Scores[100]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">101</div>
                            <div class="value1" :style="{'background': hs_colorArray[101]}">
                                {{half_second_Odds[101]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[101]}">
                                {{half_second_Scores[101]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">102</div>
                            <div class="value1" :style="{'background': hs_colorArray[102]}">
                                {{half_second_Odds[102]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[102]}">
                                {{half_second_Scores[102]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">103</div>
                            <div class="value1" :style="{'background': hs_colorArray[103]}">
                                {{half_second_Odds[103]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[103]}">
                                {{half_second_Scores[103]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">104</div>
                            <div class="value1" :style="{'background': hs_colorArray[104]}">
                                {{half_second_Odds[104]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[104]}">
                                {{half_second_Scores[104]}}
                            </div>
                        </div>
                        <div style="flex: 1; width: 25%;">
                            <div class="header1" style="background: #fdd987;">105</div>
                            <div class="value1" :style="{'background': hs_colorArray[105]}">
                                {{half_second_Odds[105]}}
                            </div>
                            <div class="value1" :style="{'background': hs_colorArray[105]}">
                                {{half_second_Scores[105]}}
                            </div>
                        </div>
                    </div>
                </div>


            </CCol>
            <!--            <CCol lg="6" style="height: 300px; background: #fd4016;">-->

            <!--            </CCol>-->
        </CRow>
    </div>
</template>

<script>
    export default {
        name: 'PredictionStats',
        components: {
        },
        data() {
            return {
                datelist1:[],
                datelist2:[],
                leaguelist:[{'value': 0, 'label': 'All'}],
                predictionlist:[{'id': '0', 'value': 1, 'label': 'Select Prediction', 'marketType': ''}],
                gameList:[
                    { value: '100', label: 'Select' },
                    { value: '1', label: '- X - Back' },
                    { value: '2', label: '- X - Lay' },
                    { value: '3', label: '- 1 - Lay' },
                    { value: '4', label: '- 2 - Lay' },
                    { value: '5', label: '- O 0.5 - Back' },
                    { value: '6', label: '- O 1.5 - Back' },
                    { value: '7', label: '- U 2.5 - Back' },
                    { value: '8', label: '- O 2.5 - Back' },
                    { value: '9', label: '- U 3.5 - Back' },

                ],
                minOdd: 0,
                maxOdd: 0,
                mainlist:[],
                eventLists:[],
                eventLists1:[],
                eventLists2:[],
                searchFilter:{
                    'from_date':'',
                    'to_date':'',
                    'leagues':'All',
                    'prediction':'1',
                    'pre_odd_min':0,
                    'pre_odd_max':100000,
                    'matched_filter_min':0,
                    'week': false,
                    'doubleTip': false,
                    'duplicate': false,
                    'home_pre_odd_min':0,
                    'home_pre_odd_max':100000,
                    'away_pre_odd_min':0,
                    'away_pre_odd_max':100000,
                    'draw_pre_odd_min':0,
                    'draw_pre_odd_max':100000,
                    'valid_type': 'MATCH_ODDS',
                    'prediction_type': 'Back'
                },
                cupList:['Cup','Copa','UEFA','Europa League','Champions League','Cupen','Coppa'],
                total_db:0,
                matches_found: 0,
                total_matches_number:{
                    'xLay':0,
                    'xBack':0,
                    'Lay1':0,
                    'Lay2':0,
                    'o25Back':0,
                    'o15Back':0,
                    'o05Back':0,
                    'u35Back':0,
                    'u25Back':0
                },
                db_matches_number:{
                    'xLay':0,
                    'xBack':0,
                    'Lay1':0,
                    'Lay2':0,
                    'o25Back':0,
                    'o15Back':0,
                    'o05Back':0,
                    'u35Back':0,
                    'u25Back':0
                },
                score_stats:{
                    score0_15:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score30':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score03':0,
                        'score12':0,
                        'score13':0
                    },
                    score16_30:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score30':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score03':0,
                        'score12':0,
                        'score13':0
                    },
                    score31_45:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score30':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score03':0,
                        'score12':0,
                        'score13':0
                    },
                    score46_60:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score30':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score03':0,
                        'score12':0,
                        'score13':0
                    },
                    score61_75:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score30':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score03':0,
                        'score12':0,
                        'score13':0
                    },
                    score76_90:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score30':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score03':0,
                        'score12':0,
                        'score13':0
                    },
                },
                stats_segment:{
                    stats_0_15:{
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_16_30:{
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_31_45:{
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_46_60:{
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_61_75:{
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_76_90:{
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    }
                },
                duplicatedPredictions:[],
                doubleTipPredictions:[],
                currentPrediction:'',
                currentCompetition: '',
                currentEventId:'',
                currentMarketId:'',
                currentPrematchOdd: {},
                currentOdds:[],
                currentPredictionType: '',
                currentLabel:'',
                half_first_Odds: [],
                half_first_Scores:[],
                half_second_Odds: [],
                half_second_Scores:[],
                first_goal_time: 0,
                selectionId: 0,
                odd_back_prematch:0,
                odd_lay_prematch:0,
                first_goal_score:'',
                half_time_score: '',
                final_score:'',
                hf_colorArray:[],
                hs_colorArray:[],
                total_matched_money:0,
                key: 0,
                isload: false,
                counter: 10,
                current_counter: 2,
                timer: null,
                current_predictionId: '',
                current_stats: {},
                last_stats_home:{
                    'on': '-',
                    'off': '-',
                    'blk': '-',
                    'in': '-',
                    'out': '-',
                    'pos': '-',
                    'cnr': '-',
                    'da': '-',
                    'red': '-',
                    'rtg': '-'
                },
                last_stats_away:{
                    'on': '-',
                    'off': '-',
                    'blk': '-',
                    'in': '-',
                    'out': '-',
                    'pos': '-',
                    'cnr': '-',
                    'da': '-',
                    'red': '-',
                    'rtg': '-'
                },
                last_stats_home1:{
                    'goal': 0,
                    'on': 0,
                    'off': 0,
                    'blk': 0,
                    'in': 0,
                    'out': 0,
                    'pos': 0,
                    'cnr': 0,
                    'da': 0,
                    'red': 0,
                    'yel': 0
                },
                last_stats_away1:{
                    'goal': 0,
                    'on': 0,
                    'off': 0,
                    'blk': 0,
                    'in': 0,
                    'out': 0,
                    'pos': 0,
                    'cnr': 0,
                    'da': 0,
                    'red': 0,
                    'yel': 0
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
                t_missed_betfair: 0,
                t_missed_livestats: 0,
                s_missed_betfair: 0,
                s_missed_livestats: 0,
                result_at_15:{
                    "home": 100,
                    "away": 100
                },
                result_at_30:{
                    "home": 100,
                    "away": 100
                },
                result_at_ht:{
                    "home": 100,
                    "away": 100
                },
                result_at_60:{
                    "home": 100,
                    "away": 100
                },
                result_at_70:{
                    "home": 100,
                    "away": 100
                },
                result_at_ft:{
                    "home": 100,
                    "away": 100
                },
                home_stats_filter:{
                    "minute": {
                        "from": 0, "to": 1000
                    },
                    "rank": {
                        "from": 0, "to": 1000
                    },
                    "goal": {
                        "from": 0, "to": 1000
                    },
                    "on": {
                        "from": 0, "to": 1000
                    },
                    "off": {
                        "from": 0, "to": 1000
                    },
                    "blk": {
                        "from": 0, "to": 1000
                    },
                    "in": {
                        "from": 0, "to": 1000
                    },
                    "out": {
                        "from": 0, "to": 1000
                    },
                    "cnr": {
                        "from": 0, "to": 1000
                    },
                    "da": {
                        "from": 0, "to": 1000
                    },
                    "pos": {
                        "from": 0, "to": 1000
                    },
                    "red": {
                        "from": 0, "to": 1000
                    },
                    "yel": {
                        "from": 0, "to": 1000
                    },
                },
                away_stats_filter:{
                    "minute": {
                        "from": 0, "to": 1000
                    },
                    "rank": {
                        "from": 0, "to": 1000
                    },
                    "goal": {
                        "from": 0, "to": 1000
                    },
                    "on": {
                        "from": 0, "to": 1000
                    },
                    "off": {
                        "from": 0, "to": 1000
                    },
                    "blk": {
                        "from": 0, "to": 1000
                    },
                    "in": {
                        "from": 0, "to": 1000
                    },
                    "out": {
                        "from": 0, "to": 1000
                    },
                    "cnr": {
                        "from": 0, "to": 1000
                    },
                    "da": {
                        "from": 0, "to": 1000
                    },
                    "pos": {
                        "from": 0, "to": 1000
                    },
                    "red": {
                        "from": 0, "to": 1000
                    },
                    "yel": {
                        "from": 0, "to": 1000
                    },
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
                }
            }
        },
        methods: {
            getTable(val){
                window.axios.post(`${process.env.VUE_APP_URL}getPredictions`, [val]).then(({data})=> {
                    console.log('predictions==>', data.data[0])
                    let datelist = []
                    this.eventLists = [{'value': '', 'label': 'Select Match'}]
                    this.eventLists1 = [{'value': '', 'label': 'Select Match'}]
                    let date_index = 0
                    for(let i = 0 ; i < data.data[0].length ; i++){
                        if(data.data[0][i].date){
                            date_index++
                            datelist[date_index - 1] = data.data[0][i].date
                        }
                    }
                    datelist = datelist.sort((a, b) => b.date - a.date)
                    datelist = Array.from(new Set (datelist))
                    this.datelist1 = datelist
                    this.datelist2 = datelist
                    this.searchFilter.from_date = datelist[0]
                    this.searchFilter.to_date = datelist[0]

                    this.eventLists2 = []
                    this.eventLists2 = [{"value": '', "label": 'Select Match'}]
                    this.t_missed_betfair =0
                    this.t_missed_livestats = 0
                    for(let i = 0 ; i < data.data[0].length ; i++){
                        this.eventLists2.push(data.data[0][i])
                        // console.log('====>',data.data[0][i]._id)
                        if(data.data[0][i].Odds && data.data[0][i].scores){
                            if(data.data[0][i].Odds.length < 10 && data.data[0][i].scores.length < 10){
                                this.t_missed_betfair++
                            }
                        }

                        if(data.data[0][i].liveStats){
                            if(data.data[0][i].liveStats.length > 0){
                                if(data.data[0][i].liveStats[0].stats.length < 1){
                                    this.t_missed_livestats++
                                }
                            }
                            else{
                                this.t_missed_livestats++
                            }
                        }
                    }

                    console.log('eventList1', this.eventLists2)
                    this.total_db = this.eventLists2.length - 1
                    for(let i = 1 ; i < this.eventLists2.length ; i++){
                        if(this.searchFilter.leagues == 'All'){
                            this.predictionlist.push({"value": this.eventLists2[i].value, 'label': this.eventLists2[i].label})
                        }
                        else{
                            if(this.searchFilter.leagues === this.eventLists2[i].league){
                                this.predictionlist.push({"value": this.eventLists2[i].value, 'label': this.eventLists2[i].label})
                            }
                        }
                    }

                    let leagueArray = []
                    for(let i = 1 ;  i < this.eventLists2.length ; i++){
                        leagueArray[i-1] = this.eventLists2[i].league
                    }
                    leagueArray = Array.from(new Set (leagueArray))
                    this.leaguelist = []
                    this.leaguelist[0] = {'value': 'All', 'label': 'All'}
                    for(let i = 0; i < leagueArray.length ; i++){
                        this.leaguelist.push({'value': leagueArray[i], 'label': leagueArray[i]})
                    }

                    for(let i = 0 ; i < 105 ; i++){
                        this.half_first_Odds[i] = '-'
                    }

                    for(let i = 0 ; i < 105 ; i++){
                        this.half_first_Scores[i] = '-'
                    }

                    for(let i = 0 ; i < 106 ; i++){
                        this.half_second_Odds[i] = '-'
                    }

                    for(let i = 0 ; i < 106 ; i++){
                        this.half_second_Scores[i] = '-'
                    }
                    this.getSearchResult()
                    this.isload = true
                })
            },
            getSearchResult(){
                this.predictionlist = []
                this.predictionlist[0] = {'value': 0, 'label':'Select Prediction', 'marketType': '', 'week': ''}

                for(let i = 1 ; i < this.eventLists2.length ; i++){
                    if(this.searchFilter.leagues === 'All'){
                        if(this.searchFilter.prediction != '0'){
                            if(this.eventLists2[i].game === this.searchFilter.prediction){
                                if(this.eventLists2[i].date >= this.searchFilter.from_date && this.eventLists2[i].date <= this.searchFilter.to_date){
                                    if(this.eventLists2[i].prematch_Odd >= this.searchFilter.pre_odd_min && this.eventLists2[i].prematch_Odd <= this.searchFilter.pre_odd_max){
                                        if(this.eventLists2[i].totalMatched >= this.searchFilter.matched_filter_min){
                                            if(this.searchFilter.valid_type != ""){
                                                if(this.searchFilter.prediction_type === "Back"){
                                                    if(this.eventLists2[i].pre_MatchOdd){
                                                        if(this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack){
                                                            if(this.searchFilter.valid_type === this.eventLists2[i].predictionType && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price >= this.searchFilter.home_pre_odd_min && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price <= this.searchFilter.home_pre_odd_max && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price >= this.searchFilter.away_pre_odd_min && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price <= this.searchFilter.away_pre_odd_max && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price >= this.searchFilter.draw_pre_odd_min && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price <= this.searchFilter.draw_pre_odd_max){
                                                                if(this.searchFilter.week === true){
                                                                    if(this.eventLists2[i].week === 1){
                                                                        let liveStats = []
                                                                        if(this.eventLists2[i].liveStats.length > 0){
                                                                            liveStats = this.eventLists2[i].liveStats
                                                                        }
                                                                        this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time,  'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                    }
                                                                }
                                                                else{
                                                                    let liveStats = []
                                                                    if(this.eventLists2[i].liveStats.length > 0){
                                                                        liveStats = this.eventLists2[i].liveStats
                                                                    }
                                                                    this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else if(this.searchFilter.prediction_type === "Lay"){
                                                    if(this.eventLists2[i].pre_MatchOdd){
                                                        if(this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack){
                                                            if(this.searchFilter.valid_type === this.eventLists2[i].predictionType && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price >= this.searchFilter.home_pre_odd_min && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price <= this.searchFilter.home_pre_odd_max && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price >= this.searchFilter.away_pre_odd_min && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price <= this.searchFilter.away_pre_odd_max && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price >= this.searchFilter.draw_pre_odd_min && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price <= this.searchFilter.draw_pre_odd_max){
                                                                if(this.searchFilter.week === true){
                                                                    if(this.eventLists2[i].week === 1){
                                                                        let liveStats = []
                                                                        if(this.eventLists2[i].liveStats.length > 0){
                                                                            liveStats = this.eventLists2[i].liveStats
                                                                        }
                                                                        this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time,  'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                    }
                                                                }
                                                                else{
                                                                    let liveStats = []
                                                                    if(this.eventLists2[i].liveStats.length > 0){
                                                                        liveStats = this.eventLists2[i].liveStats
                                                                    }
                                                                    this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            else{
                                                if(this.searchFilter.week === true){
                                                    if(this.eventLists2[i].week === 1){
                                                        let liveStats = []
                                                        if(this.eventLists2[i].liveStats.length > 0){
                                                            liveStats = this.eventLists2[i].liveStats
                                                        }
                                                        this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time,  'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                    }
                                                }
                                                else{
                                                    let liveStats = []
                                                    if(this.eventLists2[i].liveStats.length > 0){
                                                        liveStats = this.eventLists2[i].liveStats
                                                    }
                                                    this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            if(this.eventLists2[i].date >= this.searchFilter.from_date && this.eventLists2[i].date <= this.searchFilter.to_date){
                                if(this.eventLists2[i].prematch_Odd >= this.searchFilter.pre_odd_min && this.eventLists2[i].prematch_Odd <= this.searchFilter.pre_odd_max){
                                    if(this.eventLists2[i].totalMatched >= this.searchFilter.matched_filter_min){
                                        if(this.searchFilter.valid_type != ""){
                                            if(this.searchFilter.prediction_type === "Back"){
                                                if(this.eventLists2[i].pre_MatchOdd){
                                                    if(this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack){
                                                        if(this.searchFilter.valid_type === this.eventLists2[i].predictionType && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price >= this.searchFilter.home_pre_odd_min && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price <= this.searchFilter.home_pre_odd_max && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price >= this.searchFilter.away_pre_odd_min && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price <= this.searchFilter.away_pre_odd_max && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price >= this.searchFilter.draw_pre_odd_min && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price <= this.searchFilter.draw_pre_odd_max){
                                                            if(this.searchFilter.week === true){
                                                                if(this.eventLists2[i].week === 1){
                                                                    let liveStats = []
                                                                    if(this.eventLists2[i].liveStats.length > 0){
                                                                        liveStats = this.eventLists2[i].liveStats
                                                                    }
                                                                    this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time,  'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                }
                                                            }
                                                            else{
                                                                let liveStats = []
                                                                if(this.eventLists2[i].liveStats.length > 0){
                                                                    liveStats = this.eventLists2[i].liveStats
                                                                }
                                                                this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            else if(this.searchFilter.prediction_type === "Lay"){
                                                if(this.eventLists2[i].pre_MatchOdd){
                                                    if(this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack){
                                                        if(this.searchFilter.valid_type === this.eventLists2[i].predictionType && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price >= this.searchFilter.home_pre_odd_min && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price <= this.searchFilter.home_pre_odd_max && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price >= this.searchFilter.away_pre_odd_min && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price <= this.searchFilter.away_pre_odd_max && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price >= this.searchFilter.draw_pre_odd_min && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price <= this.searchFilter.draw_pre_odd_max){
                                                            if(this.searchFilter.week === true){
                                                                if(this.eventLists2[i].week === 1){
                                                                    let liveStats = []
                                                                    if(this.eventLists2[i].liveStats.length > 0){
                                                                        liveStats = this.eventLists2[i].liveStats
                                                                    }
                                                                    this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time,  'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                }
                                                            }
                                                            else{
                                                                let liveStats = []
                                                                if(this.eventLists2[i].liveStats.length > 0){
                                                                    liveStats = this.eventLists2[i].liveStats
                                                                }
                                                                this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else{
                                            if(this.searchFilter.week === true){
                                                if(this.eventLists2[i].week === 1){
                                                    let liveStats = []
                                                    if(this.eventLists2[i].liveStats.length > 0){
                                                        liveStats = this.eventLists2[i].liveStats
                                                    }
                                                    this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time,  'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                }
                                            }
                                            else{
                                                let liveStats = []
                                                if(this.eventLists2[i].liveStats.length > 0){
                                                    liveStats = this.eventLists2[i].liveStats
                                                }
                                                this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else{
                        if(this.searchFilter.leagues === this.eventLists2[i].league){
                            if(this.searchFilter.prediction != '0'){
                                if(this.eventLists2[i].game === this.searchFilter.prediction){
                                    if(this.eventLists2[i].date >= this.searchFilter.from_date && this.eventLists2[i].date <= this.searchFilter.to_date){
                                        if(this.eventLists2[i].prematch_Odd >= this.searchFilter.pre_odd_min && this.eventLists2[i].prematch_Odd <= this.searchFilter.pre_odd_max){
                                            if(this.eventLists2[i].totalMatched >= this.searchFilter.matched_filter_min){
                                                if(this.searchFilter.valid_type != ""){
                                                    if(this.searchFilter.prediction_type === "Back"){
                                                        if(this.eventLists2[i].pre_MatchOdd){
                                                            if(this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack){
                                                                if(this.searchFilter.valid_type === this.eventLists2[i].predictionType && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price >= this.searchFilter.home_pre_odd_min && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price <= this.searchFilter.home_pre_odd_max && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price >= this.searchFilter.away_pre_odd_min && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price <= this.searchFilter.away_pre_odd_max && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price >= this.searchFilter.draw_pre_odd_min && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price <= this.searchFilter.draw_pre_odd_max){
                                                                    if(this.searchFilter.week === true){
                                                                        if(this.eventLists2[i].week === 1){
                                                                            let liveStats = []
                                                                            if(this.eventLists2[i].liveStats.length > 0){
                                                                                liveStats = this.eventLists2[i].liveStats
                                                                            }
                                                                            this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time,  'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                        }
                                                                    }
                                                                    else{
                                                                        let liveStats = []
                                                                        if(this.eventLists2[i].liveStats.length > 0){
                                                                            liveStats = this.eventLists2[i].liveStats
                                                                        }
                                                                        this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else if(this.searchFilter.prediction_type === "Lay"){
                                                        if(this.eventLists2[i].pre_MatchOdd){
                                                            if(this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack){
                                                                if(this.searchFilter.valid_type === this.eventLists2[i].predictionType && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price >= this.searchFilter.home_pre_odd_min && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price <= this.searchFilter.home_pre_odd_max && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price >= this.searchFilter.away_pre_odd_min && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price <= this.searchFilter.away_pre_odd_max && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price >= this.searchFilter.draw_pre_odd_min && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price <= this.searchFilter.draw_pre_odd_max){
                                                                    if(this.searchFilter.week === true){
                                                                        if(this.eventLists2[i].week === 1){
                                                                            let liveStats = []
                                                                            if(this.eventLists2[i].liveStats.length > 0){
                                                                                liveStats = this.eventLists2[i].liveStats
                                                                            }
                                                                            this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time,  'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                        }
                                                                    }
                                                                    else{
                                                                        let liveStats = []
                                                                        if(this.eventLists2[i].liveStats.length > 0){
                                                                            liveStats = this.eventLists2[i].liveStats
                                                                        }
                                                                        this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else{
                                                    if(this.searchFilter.week === true){
                                                        if(this.eventLists2[i].week === 1){
                                                            let liveStats = []
                                                            if(this.eventLists2[i].liveStats.length > 0){
                                                                liveStats = this.eventLists2[i].liveStats
                                                            }
                                                            this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time,  'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                        }
                                                    }
                                                    else{
                                                        let liveStats = []
                                                        if(this.eventLists2[i].liveStats.length > 0){
                                                            liveStats = this.eventLists2[i].liveStats
                                                        }
                                                        this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else{
                                if(this.eventLists2[i].date >= this.searchFilter.from_date && this.eventLists2[i].date <= this.searchFilter.to_date){
                                    if(this.eventLists2[i].prematch_Odd >= this.searchFilter.pre_odd_min && this.eventLists2[i].prematch_Odd <= this.searchFilter.pre_odd_max){
                                        if(this.eventLists2[i].totalMatched >= this.searchFilter.matched_filter_min){
                                            if(this.searchFilter.valid_type != ""){
                                                if(this.searchFilter.prediction_type === "Back"){
                                                    if(this.eventLists2[i].pre_MatchOdd){
                                                        if(this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack){
                                                            if(this.searchFilter.valid_type === this.eventLists2[i].predictionType && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price >= this.searchFilter.home_pre_odd_min && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price <= this.searchFilter.home_pre_odd_max && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price >= this.searchFilter.away_pre_odd_min && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price <= this.searchFilter.away_pre_odd_max && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price >= this.searchFilter.draw_pre_odd_min && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price <= this.searchFilter.draw_pre_odd_max){
                                                                if(this.searchFilter.week === true){
                                                                    if(this.eventLists2[i].week === 1){
                                                                        let liveStats = []
                                                                        if(this.eventLists2[i].liveStats.length > 0){
                                                                            liveStats = this.eventLists2[i].liveStats
                                                                        }
                                                                        this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time,  'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                    }
                                                                }
                                                                else{
                                                                    let liveStats = []
                                                                    if(this.eventLists2[i].liveStats.length > 0){
                                                                        liveStats = this.eventLists2[i].liveStats
                                                                    }
                                                                    this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                else if(this.searchFilter.prediction_type === "Lay"){
                                                    if(this.eventLists2[i].pre_MatchOdd){
                                                        if(this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack){
                                                            if(this.searchFilter.valid_type === this.eventLists2[i].predictionType && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price >= this.searchFilter.home_pre_odd_min && this.eventLists2[i].pre_MatchOdd[0].exchange.availableToBack[0].price <= this.searchFilter.home_pre_odd_max && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price >= this.searchFilter.away_pre_odd_min && this.eventLists2[i].pre_MatchOdd[1].exchange.availableToBack[0].price <= this.searchFilter.away_pre_odd_max && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price >= this.searchFilter.draw_pre_odd_min && this.eventLists2[i].pre_MatchOdd[2].exchange.availableToBack[0].price <= this.searchFilter.draw_pre_odd_max){
                                                                if(this.searchFilter.week === true){
                                                                    if(this.eventLists2[i].week === 1){
                                                                        let liveStats = []
                                                                        if(this.eventLists2[i].liveStats.length > 0){
                                                                            liveStats = this.eventLists2[i].liveStats
                                                                        }
                                                                        this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time,  'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                    }
                                                                }
                                                                else{
                                                                    let liveStats = []
                                                                    if(this.eventLists2[i].liveStats.length > 0){
                                                                        liveStats = this.eventLists2[i].liveStats
                                                                    }
                                                                    this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            else{
                                                if(this.searchFilter.week === true){
                                                    if(this.eventLists2[i].week === 1){
                                                        let liveStats = []
                                                        if(this.eventLists2[i].liveStats.length > 0){
                                                            liveStats = this.eventLists2[i].liveStats
                                                        }
                                                        this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time,  'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                    }
                                                }
                                                else{
                                                    let liveStats = []
                                                    if(this.eventLists2[i].liveStats.length > 0){
                                                        liveStats = this.eventLists2[i].liveStats
                                                    }
                                                    this.predictionlist.push({'date':this.eventLists2[i].date, 'ft_score': this.eventLists2[i].ft_score, 'ht_score': this.eventLists2[i].ht_score, 'liveStats': liveStats, 'value': this.eventLists2[i]._id, 'league':this.eventLists2[i].league,'half_extra': this.eventLists2[i].half_extra,'break_time':this.eventLists2[i].break_time, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value1": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                //------------------------------score minute filter-----------------------
                if(this.score_minute_filter.over05.from != 0 || this.score_minute_filter.over05.to != 1000){
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

                if(this.result_at_15.home != 100 || this.result_at_15.away != 100){
                    for(let i = 1 ; i < this.predictionlist.length ; i++){
                        if(this.predictionlist[i].scores.length > 0){
                            let home_score = 1000
                            let away_score = 1000
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime <= 15){
                                    home_score = this.predictionlist[i].scores[j].score.home
                                    away_score = this.predictionlist[i].scores[j].score.away
                                }
                            }
                            if(home_score != this.result_at_15.home || away_score != this.result_at_15.away){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.result_at_30.home != 100 || this.result_at_30.away != 100){
                    for(let i = 1 ; i < this.predictionlist.length ; i++){
                        if(this.predictionlist[i].scores.length > 0){
                            let home_score = 1000
                            let away_score = 1000
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime <= 30){
                                    home_score = this.predictionlist[i].scores[j].score.home
                                    away_score = this.predictionlist[i].scores[j].score.away
                                }
                            }
                            if(home_score != this.result_at_30.home || away_score != this.result_at_30.away){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.result_at_ht.home != 100 || this.result_at_ht.away != 100){
                    for(let i = 1 ; i < this.predictionlist.length ; i++){
                        if(this.predictionlist[i].scores.length > 0){
                            let home_score = 1000
                            let away_score = 1000
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime <= 45){
                                    home_score = this.predictionlist[i].scores[j].score.home
                                    away_score = this.predictionlist[i].scores[j].score.away
                                }
                            }
                            if(home_score != this.result_at_ht.home || away_score != this.result_at_ht.away){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.result_at_60.home != 100 || this.result_at_60.away != 100){
                    for(let i = 1 ; i < this.predictionlist.length ; i++){
                        if(this.predictionlist[i].scores.length > 0){
                            let home_score = 1000
                            let away_score = 1000
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime <= 60){
                                    home_score = this.predictionlist[i].scores[j].score.home
                                    away_score = this.predictionlist[i].scores[j].score.away
                                }
                            }
                            if(home_score != this.result_at_60.home || away_score != this.result_at_60.away){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.result_at_70.home != 100 || this.result_at_70.away != 100){
                    for(let i = 1 ; i < this.predictionlist.length ; i++){
                        if(this.predictionlist[i].scores.length > 0){
                            let home_score = 1000
                            let away_score = 1000
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime <= 75){
                                    home_score = this.predictionlist[i].scores[j].score.home
                                    away_score = this.predictionlist[i].scores[j].score.away
                                }
                            }
                            if(home_score != this.result_at_70.home || away_score != this.result_at_70.away){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.result_at_ft.home != 100 || this.result_at_ft.away != 100){
                    for(let i = 1 ; i < this.predictionlist.length ; i++){
                        if(this.predictionlist[i].scores.length > 0){
                            let home_score = 1000
                            let away_score = 1000
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime > 70){
                                    home_score = this.predictionlist[i].scores[j].score.home
                                    away_score = this.predictionlist[i].scores[j].score.away
                                }
                            }
                            if(home_score != this.result_at_ft.home || away_score != this.result_at_ft.away){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }

                //-----------------------------------------stats filter--------------------------------------------
                //--------------------------------------
                if(this.home_stats_filter.goal.from != 0 || this.home_stats_filter.goal.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_goal = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.home_stats_filter.minute.from && histo_data.time[j].minute <= this.home_stats_filter.minute.to){
                                    home_goal = histo_data.stats[j][0].goals
                                }
                            }
                            if(home_goal < this.home_stats_filter.goal.from || home_goal > this.home_stats_filter.goal.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.home_stats_filter.on.from != 0 || this.home_stats_filter.on.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_on = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.home_stats_filter.minute.from && histo_data.time[j].minute <= this.home_stats_filter.minute.to){
                                    if(histo_data.stats[j][0]){
                                        if(histo_data.stats[j][0].shots){
                                            home_on = histo_data.stats[j][0].shots.ongoal
                                        }
                                    }
                                }
                            }
                            if(home_on < this.home_stats_filter.on.from || home_on > this.home_stats_filter.on.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.home_stats_filter.off.from != 0 || this.home_stats_filter.off.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_off = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.home_stats_filter.minute.from && histo_data.time[j].minute <= this.home_stats_filter.minute.to){
                                    if(histo_data.stats[j][0]){
                                        if(histo_data.stats[j][0].shots){
                                            home_off = histo_data.stats[j][0].shots.offgoal
                                        }
                                    }
                                }
                            }
                            if(home_off < this.home_stats_filter.off.from || home_off > this.home_stats_filter.off.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.home_stats_filter.blk.from != 0 || this.home_stats_filter.blk.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_blk = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.home_stats_filter.minute.from && histo_data.time[j].minute <= this.home_stats_filter.minute.to){
                                    if(histo_data.stats[j][0]){
                                        if(histo_data.stats[j][0].shots){
                                            home_blk = histo_data.stats[j][0].shots.blocked
                                        }
                                    }
                                }
                            }
                            if(home_blk < this.home_stats_filter.blk.from || home_blk > this.home_stats_filter.blk.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.home_stats_filter.in.from != 0 || this.home_stats_filter.in.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_in = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.home_stats_filter.minute.from && histo_data.time[j].minute <= this.home_stats_filter.minute.to){
                                    if(histo_data.stats[j][0]){
                                        if(histo_data.stats[j][0].shots){
                                            home_in = histo_data.stats[j][0].shots.insidebox
                                        }
                                    }
                                }
                            }
                            if(home_in < this.home_stats_filter.in.from || home_in > this.home_stats_filter.in.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.home_stats_filter.out.from != 0 || this.home_stats_filter.out.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_out = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.home_stats_filter.minute.from && histo_data.time[j].minute <= this.home_stats_filter.minute.to){
                                    if(histo_data.stats[j][0]){
                                        if(histo_data.stats[j][0].shots){
                                            home_out = histo_data.stats[j][0].shots.outsidebox
                                        }
                                    }
                                }
                            }
                            if(home_out < this.home_stats_filter.in.from || home_out > this.home_stats_filter.in.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.home_stats_filter.cnr.from != 0 || this.home_stats_filter.cnr.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_cnr = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.home_stats_filter.minute.from && histo_data.time[j].minute <= this.home_stats_filter.minute.to){
                                    if(histo_data.stats[j][0]){
                                        if(histo_data.stats[j][0].corners){
                                            home_cnr = histo_data.stats[j][0].corners
                                        }
                                    }
                                }
                            }
                            if(home_cnr < this.home_stats_filter.cnr.from || home_cnr > this.home_stats_filter.cnr.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.home_stats_filter.da.from != 0 || this.home_stats_filter.da.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_da = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.home_stats_filter.minute.from && histo_data.time[j].minute <= this.home_stats_filter.minute.to){
                                    if(histo_data.stats[j][0]){
                                        if(histo_data.stats[j][0].attacks){
                                            home_da = histo_data.stats[j][0].attacks.dangerous_attacks
                                        }
                                    }
                                }
                            }
                            if(home_da < this.home_stats_filter.da.from || home_da > this.home_stats_filter.da.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.home_stats_filter.pos.from != 0 || this.home_stats_filter.pos.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_pos = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.home_stats_filter.minute.from && histo_data.time[j].minute <= this.home_stats_filter.minute.to){
                                    if(histo_data.stats[j][0]){
                                        if(histo_data.stats[j][0].possessiontime){
                                            home_pos = histo_data.stats[j][0].possessiontime
                                        }
                                    }
                                }
                            }
                            if(home_pos < this.home_stats_filter.pos.from || home_pos > this.home_stats_filter.pos.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.home_stats_filter.red.from != 0 || this.home_stats_filter.red.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_red = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.home_stats_filter.minute.from && histo_data.time[j].minute <= this.home_stats_filter.minute.to){
                                    if(histo_data.stats[j].length > 0){
                                        if(histo_data.stats[j][0]){
                                            let home_red_data = histo_data.stats[j][0]
                                            home_red = home_red_data.redcards
                                        }
                                    }
                                }
                            }

                            if(home_red < this.home_stats_filter.red.from || home_red > this.home_stats_filter.red.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.home_stats_filter.yel.from != 0 || this.home_stats_filter.yel.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_yel = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.home_stats_filter.minute.from && histo_data.time[j].minute <= this.home_stats_filter.minute.to){
                                    if(histo_data.stats[j][0]){
                                        if(histo_data.stats[j][0].yellowcards){
                                            home_yel = histo_data.stats[j][0].yellowcards
                                        }
                                    }
                                }
                            }
                            if(home_yel < this.home_stats_filter.yel.from || home_yel > this.home_stats_filter.yel.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                //-----------------------------------------
                if(this.away_stats_filter.goal.from != 0 || this.away_stats_filter.goal.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_goal = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.away_stats_filter.minute.from && histo_data.time[j].minute <= this.away_stats_filter.minute.to){
                                    home_goal = histo_data.stats[j][1].goals
                                }
                            }
                            if(home_goal < this.away_stats_filter.goal.from || home_goal > this.away_stats_filter.goal.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.away_stats_filter.on.from != 0 || this.away_stats_filter.on.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_on = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.away_stats_filter.minute.from && histo_data.time[j].minute <= this.away_stats_filter.minute.to){
                                    if(histo_data.stats[j][1]){
                                        if(histo_data.stats[j][1].shots){
                                            home_on = histo_data.stats[j][1].shots.ongoal
                                        }
                                    }
                                }
                            }
                            if(home_on < this.away_stats_filter.on.from || home_on > this.away_stats_filter.on.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.away_stats_filter.off.from != 0 || this.away_stats_filter.off.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_off = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.away_stats_filter.minute.from && histo_data.time[j].minute <= this.away_stats_filter.minute.to){
                                    if(histo_data.stats[j][1]){
                                        if(histo_data.stats[j][1].shots){
                                            home_off = histo_data.stats[j][1].shots.offgoal
                                        }
                                    }
                                }
                            }
                            if(home_off < this.away_stats_filter.off.from || home_off > this.away_stats_filter.off.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.away_stats_filter.blk.from != 0 || this.away_stats_filter.blk.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_blk = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.away_stats_filter.minute.from && histo_data.time[j].minute <= this.away_stats_filter.minute.to){
                                    if(histo_data.stats[j][1]){
                                        if(histo_data.stats[j][1].shots){
                                            home_blk = histo_data.stats[j][1].shots.blocked
                                        }
                                    }
                                }
                            }
                            if(home_blk < this.away_stats_filter.blk.from || home_blk > this.away_stats_filter.blk.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.away_stats_filter.in.from != 0 || this.away_stats_filter.in.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_in = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.away_stats_filter.minute.from && histo_data.time[j].minute <= this.away_stats_filter.minute.to){
                                    if(histo_data.stats[j][1]){
                                        if(histo_data.stats[j][1].shots){
                                            home_in = histo_data.stats[j][1].shots.insidebox
                                        }
                                    }
                                }
                            }
                            if(home_in < this.away_stats_filter.in.from || home_in > this.away_stats_filter.in.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.away_stats_filter.out.from != 0 || this.away_stats_filter.out.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_out = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.away_stats_filter.minute.from && histo_data.time[j].minute <= this.away_stats_filter.minute.to){
                                    if(histo_data.stats[j][1]){
                                        if(histo_data.stats[j][1].shots){
                                            home_out = histo_data.stats[j][1].shots.outsidebox
                                        }
                                    }
                                }
                            }
                            if(home_out < this.away_stats_filter.out.from || home_out > this.away_stats_filter.out.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.away_stats_filter.cnr.from != 0 || this.away_stats_filter.cnr.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_cnr = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.away_stats_filter.minute.from && histo_data.time[j].minute <= this.away_stats_filter.minute.to){
                                    if(histo_data.stats[j][1]){
                                        if(histo_data.stats[j][1].corners){
                                            home_cnr = histo_data.stats[j][1].corners
                                        }
                                    }
                                }
                            }
                            if(home_cnr < this.away_stats_filter.cnr.from || home_cnr > this.away_stats_filter.cnr.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.away_stats_filter.da.from != 0 || this.away_stats_filter.da.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_da = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.away_stats_filter.minute.from && histo_data.time[j].minute <= this.away_stats_filter.minute.to){
                                    if(histo_data.stats[j][1]){
                                        if(histo_data.stats[j][1].attacks){
                                            home_da = histo_data.stats[j][1].attacks.dangerous_attacks
                                        }
                                    }
                                }
                            }
                            if(home_da < this.away_stats_filter.da.from || home_da > this.away_stats_filter.da.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.away_stats_filter.pos.from != 0 || this.away_stats_filter.pos.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_pos = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.away_stats_filter.minute.from && histo_data.time[j].minute <= this.away_stats_filter.minute.to){
                                    if(histo_data.stats[j][1]){
                                        if(histo_data.stats[j][1].possessiontime){
                                            home_pos = histo_data.stats[j][1].possessiontime
                                        }
                                    }
                                }
                            }
                            if(home_pos < this.away_stats_filter.pos.from || home_pos > this.away_stats_filter.pos.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.away_stats_filter.red.from != 0 || this.away_stats_filter.red.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_red = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.away_stats_filter.minute.from && histo_data.time[j].minute <= this.away_stats_filter.minute.to){
                                    if(histo_data.stats[j].length > 0){
                                        let home_red_data = histo_data.stats[j][1]
                                        home_red = home_red_data.redcards
                                    }
                                }
                            }

                            if(home_red < this.away_stats_filter.red.from || home_red > this.away_stats_filter.red.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(this.away_stats_filter.yel.from != 0 || this.away_stats_filter.yel.to != 1000){
                    for(let i = 1; i < this.predictionlist.length; i++){
                        if(this.predictionlist[i].liveStats.length > 0){
                            let histo_data = this.predictionlist[i].liveStats[0]
                            let home_yel = 10000
                            for(let j = 0 ; j < histo_data.time.length; j++){
                                if(histo_data.time[j].minute >= this.away_stats_filter.minute.from && histo_data.time[j].minute <= this.away_stats_filter.minute.to){
                                    if(histo_data.stats[j][1]){
                                        if(histo_data.stats[j][1].yellowcards){
                                            home_yel = histo_data.stats[j][1].yellowcards
                                        }
                                    }
                                }
                            }
                            if(home_yel < this.away_stats_filter.yel.from || home_yel > this.away_stats_filter.yel.to){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                //---------------------------------------stats filter end------------------------------------------
                if(this.searchFilter.duplicate === true){
                    let predictionList = this.predictionlist
                    let duplicatedPredictions = []
                    for(let i = 1 ; i < predictionList.length ; i++){
                        let status = predictionList[i].status
                        console.log('status', status)
                        if(status !== 2){
                            duplicatedPredictions.push(predictionList[i].value)
                        }
                    }
                    duplicatedPredictions = Array.from(new Set (duplicatedPredictions))
                    for(let i = 0 ; i < duplicatedPredictions.length ; i++){
                        let prediction = this.predictionlist.filter(function(item) {
                            return item.value === duplicatedPredictions[i];
                        });

                        let index = this.predictionlist.indexOf(prediction[0]);
                        if (index > -1) {
                            this.predictionlist.splice(index, 1);
                            i = i - 1
                        }
                    }
                }
                else{
                    let predictionList = this.predictionlist
                    let duplicatedPredictions = []
                    for(let i = 1 ; i < predictionList.length ; i++){
                        let status = predictionList[i].status
                        if(status === 2){
                            duplicatedPredictions.push(predictionList[i].value)
                        }
                    }
                    duplicatedPredictions = Array.from(new Set (duplicatedPredictions))
                    for(let i = 0 ; i < duplicatedPredictions.length ; i++){
                        let prediction = this.predictionlist.filter(function(item) {
                            return item.value === duplicatedPredictions[i];
                        });

                        let index = this.predictionlist.indexOf(prediction[0]);
                        if (index > -1) {
                            this.predictionlist.splice(index, 1);
                            i = i - 1
                        }
                    }
                }

                if(this.searchFilter.doubleTip === true){
                    let predictionList = this.predictionlist
                    let duplicatedPredictions = []
                    for(let i = 1 ; i < predictionList.length ; i++){
                        let status = predictionList[i].status
                        if(status !== 1){
                            duplicatedPredictions.push(predictionList[i].value)
                        }
                    }
                    duplicatedPredictions = Array.from(new Set (duplicatedPredictions))
                    for(let i = 0 ; i < duplicatedPredictions.length ; i++){
                        let prediction = this.predictionlist.filter(function(item) {
                            return item.value === duplicatedPredictions[i];
                        });

                        let index = this.predictionlist.indexOf(prediction[0]);
                        if (index > -1) {
                            this.predictionlist.splice(index, 1);
                            i = i - 1
                        }
                    }
                }
                else{
                    let predictionList = this.predictionlist
                    let duplicatedPredictions = []
                    for(let i = 1 ; i < predictionList.length ; i++){
                        let status = predictionList[i].status
                        if(status === 1){
                            duplicatedPredictions.push(predictionList[i].value)
                        }
                    }
                    duplicatedPredictions = Array.from(new Set (duplicatedPredictions))
                    for(let i = 0 ; i < duplicatedPredictions.length ; i++){
                        let prediction = this.predictionlist.filter(function(item) {
                            return item.value === duplicatedPredictions[i];
                        });

                        let index = this.predictionlist.indexOf(prediction[0]);
                        if (index > -1) {
                            this.predictionlist.splice(index, 1);
                            i = i - 1
                        }
                    }
                }

                this.s_missed_betfair =0
                this.s_missed_livestats = 0
                for(let i = 1 ; i < this.predictionlist.length ; i++){
                    if(this.predictionlist[i].Odds){
                        if(this.predictionlist[i].Odds.length < 10 && this.predictionlist[i].scores.length < 10){
                            this.s_missed_betfair++
                        }
                    }
                    if(this.predictionlist[i].liveStats){
                        if(this.predictionlist[i].liveStats.length > 0){
                            if(this.predictionlist[i].liveStats[0].stats.length < 1){
                                this.s_missed_livestats++
                            }
                        }
                        else{
                            this.s_missed_livestats++
                        }
                    }
                }

                this.matches_found = this.predictionlist.length - 1
                this.total_matches_number = {
                    'xLay':0,
                    'xBack':0,
                    'Lay1':0,
                    'Lay2':0,
                    'o25Back':0,
                    'o15Back':0,
                    'o05Back':0,
                    'u35Back':0,
                    'u25Back':0
                }
                for(let i = 1 ; i < this.predictionlist.length ; i++){
                    if(this.predictionlist[i].marketType === '- X - Lay'){
                        this.total_matches_number.xLay++
                    }
                    else if(this.predictionlist[i].marketType === '- X - Back'){
                        this.total_matches_number.xBack++
                    }
                    else if(this.predictionlist[i].marketType === '- 1 - Lay'){
                        this.total_matches_number.Lay1++
                    }
                    else if(this.predictionlist[i].marketType === '- 2 - Lay'){
                        this.total_matches_number.Lay2++
                    }
                    else if(this.predictionlist[i].marketType === '- O 2.5 - Back'){
                        this.total_matches_number.o25Back++
                    }
                    else if(this.predictionlist[i].marketType === '- O 1.5 - Back'){
                        this.total_matches_number.o15Back++
                    }
                    else if(this.predictionlist[i].marketType === '- O 0.5 - Back'){
                        this.total_matches_number.o05Back++
                    }
                    else if(this.predictionlist[i].marketType === '- U 2.5 - Back'){
                        this.total_matches_number.u25Back++
                    }
                    else if(this.predictionlist[i].marketType === '- U 3.5 - Back'){
                        this.total_matches_number.u35Back++
                    }
                }
                this.db_matches_number = {
                    'xLay':0,
                    'xBack':0,
                    'Lay1':0,
                    'Lay2':0,
                    'o25Back':0,
                    'o15Back':0,
                    'o05Back':0,
                    'u35Back':0,
                    'u25Back':0
                }
                for(let i = 1 ; i < this.eventLists2.length ; i++){
                    if(this.eventLists2[i].marketType === '- X - Lay'){
                        this.db_matches_number.xLay++
                    }
                    else if(this.eventLists2[i].marketType === '- X - Back'){
                        this.db_matches_number.xBack++
                    }
                    else if(this.eventLists2[i].marketType === '- 1 - Lay'){
                        this.db_matches_number.Lay1++
                    }
                    else if(this.eventLists2[i].marketType === '- 2 - Lay'){
                        this.db_matches_number.Lay2++
                    }
                    else if(this.eventLists2[i].marketType === '- O 2.5 - Back'){
                        this.db_matches_number.o25Back++
                    }
                    else if(this.eventLists2[i].marketType === '- O 1.5 - Back'){
                        this.db_matches_number.o15Back++
                    }
                    else if(this.eventLists2[i].marketType === '- O 0.5 - Back'){
                        this.db_matches_number.o05Back++
                    }
                    else if(this.eventLists2[i].marketType === '- U 2.5 - Back'){
                        this.db_matches_number.u25Back++
                    }
                    else if(this.eventLists2[i].marketType === '- U 3.5 - Back'){
                        this.db_matches_number.u35Back++
                    }
                }
                this.score_stats = {
                    score0_15:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score30':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score03':0,
                        'score12':0,
                        'score13':0
                    },
                    score16_30:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score30':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score03':0,
                        'score12':0,
                        'score13':0
                    },
                    score31_45:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score30':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score03':0,
                        'score12':0,
                        'score13':0
                    },
                    score46_60:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score30':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score03':0,
                        'score12':0,
                        'score13':0
                    },
                    score61_75:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score30':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score03':0,
                        'score12':0,
                        'score13':0
                    },
                    score76_90:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score30':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score03':0,
                        'score12':0,
                        'score13':0
                    },
                }
                this.stats_segment = {
                    stats_0_15:{
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_16_30:{
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_31_45:{
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_46_60:{
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_61_75:{
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    },
                    stats_76_90:{
                        'score_over15':0,
                        'score_over25':0,
                        'score_over35':0,
                        'score_home':0,
                        'score_draw':0,
                        'score_away':0,
                        'score_bts':0,
                        'score_odd':0,
                        'score_even':0
                    }
                }
                console.log('prediction list===>', this.predictionlist)
                for(let i = 1; i < this.predictionlist.length ; i++){
                    let score_check = {
                        score0_15:{
                            'score00_home':'',
                            'score00_away':'',
                            'score11_home':'',
                            'score11_away':'',
                            'score22_home':'',
                            'score22_away':'',
                            'score10_home':'',
                            'score10_away':'',
                            'score20_home':'',
                            'score20_away':'',
                            'score30_home':'',
                            'score30_away':'',
                            'score21_home':'',
                            'score21_away':'',
                            'score31_home':'',
                            'score31_away':'',
                            'score01_home':'',
                            'score01_away':'',
                            'score02_home':'',
                            'score02_away':'',
                            'score03_home':'',
                            'score03_away':'',
                            'score12_home':'',
                            'score12_away':'',
                            'score13_home':'',
                            'score13_away':''
                        },
                        score16_30:{
                            'score00_home':'',
                            'score00_away':'',
                            'score11_home':'',
                            'score11_away':'',
                            'score22_home':'',
                            'score22_away':'',
                            'score10_home':'',
                            'score10_away':'',
                            'score20_home':'',
                            'score20_away':'',
                            'score30_home':'',
                            'score30_away':'',
                            'score21_home':'',
                            'score21_away':'',
                            'score31_home':'',
                            'score31_away':'',
                            'score01_home':'',
                            'score01_away':'',
                            'score02_home':'',
                            'score02_away':'',
                            'score03_home':'',
                            'score03_away':'',
                            'score12_home':'',
                            'score12_away':'',
                            'score13_home':'',
                            'score13_away':''
                        },
                        score31_45:{
                            'score00_home':'',
                            'score00_away':'',
                            'score11_home':'',
                            'score11_away':'',
                            'score22_home':'',
                            'score22_away':'',
                            'score10_home':'',
                            'score10_away':'',
                            'score20_home':'',
                            'score20_away':'',
                            'score30_home':'',
                            'score30_away':'',
                            'score21_home':'',
                            'score21_away':'',
                            'score31_home':'',
                            'score31_away':'',
                            'score01_home':'',
                            'score01_away':'',
                            'score02_home':'',
                            'score02_away':'',
                            'score03_home':'',
                            'score03_away':'',
                            'score12_home':'',
                            'score12_away':'',
                            'score13_home':'',
                            'score13_away':''
                        },
                        score46_60:{
                            'score00_home':'',
                            'score00_away':'',
                            'score11_home':'',
                            'score11_away':'',
                            'score22_home':'',
                            'score22_away':'',
                            'score10_home':'',
                            'score10_away':'',
                            'score20_home':'',
                            'score20_away':'',
                            'score30_home':'',
                            'score30_away':'',
                            'score21_home':'',
                            'score21_away':'',
                            'score31_home':'',
                            'score31_away':'',
                            'score01_home':'',
                            'score01_away':'',
                            'score02_home':'',
                            'score02_away':'',
                            'score03_home':'',
                            'score03_away':'',
                            'score12_home':'',
                            'score12_away':'',
                            'score13_home':'',
                            'score13_away':''
                        },
                        score61_75:{
                            'score00_home':'',
                            'score00_away':'',
                            'score11_home':'',
                            'score11_away':'',
                            'score22_home':'',
                            'score22_away':'',
                            'score10_home':'',
                            'score10_away':'',
                            'score20_home':'',
                            'score20_away':'',
                            'score30_home':'',
                            'score30_away':'',
                            'score21_home':'',
                            'score21_away':'',
                            'score31_home':'',
                            'score31_away':'',
                            'score01_home':'',
                            'score01_away':'',
                            'score02_home':'',
                            'score02_away':'',
                            'score03_home':'',
                            'score03_away':'',
                            'score12_home':'',
                            'score12_away':'',
                            'score13_home':'',
                            'score13_away':''
                        },
                        score76_90:{
                            'score00_home':'',
                            'score00_away':'',
                            'score11_home':'',
                            'score11_away':'',
                            'score22_home':'',
                            'score22_away':'',
                            'score10_home':'',
                            'score10_away':'',
                            'score20_home':'',
                            'score20_away':'',
                            'score30_home':'',
                            'score30_away':'',
                            'score21_home':'',
                            'score21_away':'',
                            'score31_home':'',
                            'score31_away':'',
                            'score01_home':'',
                            'score01_away':'',
                            'score02_home':'',
                            'score02_away':'',
                            'score03_home':'',
                            'score03_away':'',
                            'score12_home':'',
                            'score12_away':'',
                            'score13_home':'',
                            'score13_away':''
                        },
                    }
                    let stats_segment = {
                        stats_0_15:{
                            'score_over15_home':'',
                            'score_over25_home':'',
                            'score_over35_home':'',
                            'score_home_home':'',
                            'score_draw_home':'',
                            'score_away_home':'',
                            'score_bts_home':'',
                            'score_odd_home':'',
                            'score_even_home':'',

                            'score_over15_away':'',
                            'score_over25_away':'',
                            'score_over35_away':'',
                            'score_home_away':'',
                            'score_draw_away':'',
                            'score_away_away':'',
                            'score_bts_away':'',
                            'score_odd_away':'',
                            'score_even_away':''
                        },
                        stats_16_30:{
                            'score_over15_home':'',
                            'score_over25_home':'',
                            'score_over35_home':'',
                            'score_home_home':'',
                            'score_draw_home':'',
                            'score_away_home':'',
                            'score_bts_home':'',
                            'score_odd_home':'',
                            'score_even_home':'',

                            'score_over15_away':'',
                            'score_over25_away':'',
                            'score_over35_away':'',
                            'score_home_away':'',
                            'score_draw_away':'',
                            'score_away_away':'',
                            'score_bts_away':'',
                            'score_odd_away':'',
                            'score_even_away':''
                        },
                        stats_31_45:{
                            'score_over15_home':'',
                            'score_over25_home':'',
                            'score_over35_home':'',
                            'score_home_home':'',
                            'score_draw_home':'',
                            'score_away_home':'',
                            'score_bts_home':'',
                            'score_odd_home':'',
                            'score_even_home':'',

                            'score_over15_away':'',
                            'score_over25_away':'',
                            'score_over35_away':'',
                            'score_home_away':'',
                            'score_draw_away':'',
                            'score_away_away':'',
                            'score_bts_away':'',
                            'score_odd_away':'',
                            'score_even_away':''
                        },
                        stats_46_60:{
                            'score_over15_home':'',
                            'score_over25_home':'',
                            'score_over35_home':'',
                            'score_home_home':'',
                            'score_draw_home':'',
                            'score_away_home':'',
                            'score_bts_home':'',
                            'score_odd_home':'',
                            'score_even_home':'',

                            'score_over15_away':'',
                            'score_over25_away':'',
                            'score_over35_away':'',
                            'score_home_away':'',
                            'score_draw_away':'',
                            'score_away_away':'',
                            'score_bts_away':'',
                            'score_odd_away':'',
                            'score_even_away':''
                        },
                        stats_61_75:{
                            'score_over15_home':'',
                            'score_over25_home':'',
                            'score_over35_home':'',
                            'score_home_home':'',
                            'score_draw_home':'',
                            'score_away_home':'',
                            'score_bts_home':'',
                            'score_odd_home':'',
                            'score_even_home':'',

                            'score_over15_away':'',
                            'score_over25_away':'',
                            'score_over35_away':'',
                            'score_home_away':'',
                            'score_draw_away':'',
                            'score_away_away':'',
                            'score_bts_away':'',
                            'score_odd_away':'',
                            'score_even_away':''
                        },
                        stats_76_90:{
                            'score_over15_home':'',
                            'score_over25_home':'',
                            'score_over35_home':'',
                            'score_home_home':'',
                            'score_draw_home':'',
                            'score_away_home':'',
                            'score_bts_home':'',
                            'score_odd_home':'',
                            'score_even_home':'',

                            'score_over15_away':'',
                            'score_over25_away':'',
                            'score_over35_away':'',
                            'score_home_away':'',
                            'score_draw_away':'',
                            'score_away_away':'',
                            'score_bts_away':'',
                            'score_odd_away':'',
                            'score_even_away':''
                        }
                    }
                    for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                        if(this.predictionlist[i].scores[j].elapsedRegularTime <= 15){
                            score_check.score0_15.score00_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score00_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score11_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score11_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score22_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score22_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score10_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score10_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score20_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score20_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score30_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score30_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score21_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score21_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score31_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score31_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score01_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score01_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score02_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score02_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score03_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score03_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score12_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score12_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score13_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score13_away = this.predictionlist[i].scores[j].score.away

                            stats_segment.stats_0_15.score_over15_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_0_15.score_over15_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_0_15.score_over25_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_0_15.score_over25_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_0_15.score_over35_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_0_15.score_over35_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_0_15.score_home_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_0_15.score_home_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_0_15.score_away_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_0_15.score_away_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_0_15.score_draw_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_0_15.score_draw_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_0_15.score_bts_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_0_15.score_bts_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_0_15.score_odd_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_0_15.score_odd_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_0_15.score_even_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_0_15.score_even_away = this.predictionlist[i].scores[j].score.away

                        }
                        if(this.predictionlist[i].scores[j].elapsedRegularTime > 15 && this.predictionlist[i].scores[j].elapsedRegularTime <= 30){
                            score_check.score16_30.score00_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score00_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score11_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score11_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score22_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score22_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score10_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score10_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score20_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score20_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score30_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score30_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score21_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score21_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score31_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score31_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score01_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score01_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score02_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score02_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score03_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score03_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score12_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score12_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score13_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score13_away = this.predictionlist[i].scores[j].score.away

                            stats_segment.stats_16_30.score_over15_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_16_30.score_over15_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_16_30.score_over25_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_16_30.score_over25_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_16_30.score_over35_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_16_30.score_over35_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_16_30.score_home_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_16_30.score_home_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_16_30.score_away_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_16_30.score_away_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_16_30.score_draw_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_16_30.score_draw_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_16_30.score_bts_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_16_30.score_bts_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_16_30.score_odd_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_16_30.score_odd_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_16_30.score_even_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_16_30.score_even_away = this.predictionlist[i].scores[j].score.away
                        }
                        if(this.predictionlist[i].scores[j].elapsedRegularTime > 30 && this.predictionlist[i].scores[j].elapsedRegularTime <= 45){
                            score_check.score31_45.score00_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score00_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score11_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score11_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score22_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score22_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score10_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score10_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score20_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score20_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score30_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score30_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score21_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score21_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score31_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score31_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score01_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score01_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score02_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score02_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score03_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score03_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score12_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score12_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score13_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score13_away = this.predictionlist[i].scores[j].score.away

                            stats_segment.stats_31_45.score_over15_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_31_45.score_over15_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_31_45.score_over25_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_31_45.score_over25_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_31_45.score_over35_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_31_45.score_over35_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_31_45.score_home_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_31_45.score_home_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_31_45.score_away_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_31_45.score_away_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_31_45.score_draw_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_31_45.score_draw_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_31_45.score_bts_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_31_45.score_bts_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_31_45.score_odd_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_31_45.score_odd_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_31_45.score_even_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_31_45.score_even_away = this.predictionlist[i].scores[j].score.away
                        }
                        if(this.predictionlist[i].scores[j].elapsedRegularTime > 45 && this.predictionlist[i].scores[j].elapsedRegularTime <= 60){
                            score_check.score46_60.score00_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score00_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score11_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score11_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score22_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score22_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score10_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score10_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score20_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score20_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score30_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score30_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score21_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score21_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score31_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score31_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score01_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score01_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score02_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score02_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score03_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score03_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score12_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score12_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score13_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score13_away = this.predictionlist[i].scores[j].score.away

                            stats_segment.stats_46_60.score_over15_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_46_60.score_over15_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_46_60.score_over25_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_46_60.score_over25_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_46_60.score_over35_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_46_60.score_over35_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_46_60.score_home_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_46_60.score_home_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_46_60.score_away_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_46_60.score_away_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_46_60.score_draw_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_46_60.score_draw_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_46_60.score_bts_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_46_60.score_bts_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_46_60.score_odd_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_46_60.score_odd_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_46_60.score_even_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_46_60.score_even_away = this.predictionlist[i].scores[j].score.away
                        }
                        if(this.predictionlist[i].scores[j].elapsedRegularTime > 60 && this.predictionlist[i].scores[j].elapsedRegularTime <= 75){
                            score_check.score61_75.score00_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score00_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score11_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score11_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score22_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score22_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score10_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score10_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score20_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score20_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score30_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score30_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score21_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score21_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score31_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score31_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score01_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score01_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score02_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score02_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score03_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score03_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score12_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score12_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score13_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score13_away = this.predictionlist[i].scores[j].score.away

                            stats_segment.stats_61_75.score_over15_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_61_75.score_over15_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_61_75.score_over25_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_61_75.score_over25_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_61_75.score_over35_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_61_75.score_over35_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_61_75.score_home_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_61_75.score_home_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_61_75.score_away_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_61_75.score_away_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_61_75.score_draw_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_61_75.score_draw_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_61_75.score_bts_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_61_75.score_bts_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_61_75.score_odd_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_61_75.score_odd_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_61_75.score_even_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_61_75.score_even_away = this.predictionlist[i].scores[j].score.away
                        }
                        if(this.predictionlist[i].scores[j].elapsedRegularTime > 75){
                            score_check.score76_90.score00_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score00_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score11_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score11_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score22_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score22_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score10_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score10_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score20_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score20_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score30_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score30_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score21_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score21_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score31_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score31_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score01_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score01_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score02_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score02_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score03_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score03_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score12_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score12_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score13_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score13_away = this.predictionlist[i].scores[j].score.away

                            stats_segment.stats_76_90.score_over15_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_76_90.score_over15_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_76_90.score_over25_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_76_90.score_over25_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_76_90.score_over35_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_76_90.score_over35_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_76_90.score_home_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_76_90.score_home_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_76_90.score_away_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_76_90.score_away_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_76_90.score_draw_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_76_90.score_draw_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_76_90.score_bts_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_76_90.score_bts_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_76_90.score_odd_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_76_90.score_odd_away = this.predictionlist[i].scores[j].score.away
                            stats_segment.stats_76_90.score_even_home = this.predictionlist[i].scores[j].score.home
                            stats_segment.stats_76_90.score_even_away = this.predictionlist[i].scores[j].score.away
                        }
                    }

                    if(parseInt(stats_segment.stats_0_15.score_over15_home) + parseInt(stats_segment.stats_0_15.score_over15_away) > 1){ this.stats_segment.stats_0_15.score_over15++ }
                    if(parseInt(stats_segment.stats_0_15.score_over25_home) + parseInt(stats_segment.stats_0_15.score_over25_away) > 2){ this.stats_segment.stats_0_15.score_over25++ }
                    if(parseInt(stats_segment.stats_0_15.score_over35_home) + parseInt(stats_segment.stats_0_15.score_over35_away) > 3){ this.stats_segment.stats_0_15.score_over35++ }
                    if(parseInt(stats_segment.stats_0_15.score_home_home) > parseInt(stats_segment.stats_0_15.score_home_away) ){ this.stats_segment.stats_0_15.score_home++ }
                    if(parseInt(stats_segment.stats_0_15.score_away_home) < parseInt(stats_segment.stats_0_15.score_away_away) ){ this.stats_segment.stats_0_15.score_away++ }
                    if(parseInt(stats_segment.stats_0_15.score_draw_home) === parseInt(stats_segment.stats_0_15.score_draw_away) ){ this.stats_segment.stats_0_15.score_draw++ }
                    if(parseInt(stats_segment.stats_0_15.score_bts_home) > 0 && parseInt(stats_segment.stats_0_15.score_bts_away) > 0 ){ this.stats_segment.stats_0_15.score_bts++ }
                    if((parseInt(stats_segment.stats_0_15.score_home_home) + parseInt(stats_segment.stats_0_15.score_home_away)) % 2 === 1 ){ this.stats_segment.stats_0_15.score_odd++ }
                    if((parseInt(stats_segment.stats_0_15.score_home_home) + parseInt(stats_segment.stats_0_15.score_home_away)) % 2 === 0 ){ this.stats_segment.stats_0_15.score_even++ }

                    if(parseInt(stats_segment.stats_16_30.score_over15_home) + parseInt(stats_segment.stats_16_30.score_over15_away) > 1){ this.stats_segment.stats_16_30.score_over15++ }
                    if(parseInt(stats_segment.stats_16_30.score_over25_home) + parseInt(stats_segment.stats_16_30.score_over25_away) > 2){ this.stats_segment.stats_16_30.score_over25++ }
                    if(parseInt(stats_segment.stats_16_30.score_over35_home) + parseInt(stats_segment.stats_16_30.score_over35_away) > 3){ this.stats_segment.stats_16_30.score_over35++ }
                    if(parseInt(stats_segment.stats_16_30.score_home_home) > parseInt(stats_segment.stats_16_30.score_home_away) ){ this.stats_segment.stats_16_30.score_home++ }
                    if(parseInt(stats_segment.stats_16_30.score_away_home) < parseInt(stats_segment.stats_16_30.score_away_away) ){ this.stats_segment.stats_16_30.score_away++ }
                    if(parseInt(stats_segment.stats_16_30.score_draw_home) === parseInt(stats_segment.stats_16_30.score_draw_away) ){ this.stats_segment.stats_16_30.score_draw++ }
                    if(parseInt(stats_segment.stats_16_30.score_bts_home) > 0 && parseInt(stats_segment.stats_16_30.score_bts_away) > 0 ){ this.stats_segment.stats_16_30.score_bts++ }
                    if((parseInt(stats_segment.stats_16_30.score_home_home) + parseInt(stats_segment.stats_16_30.score_home_away)) % 2 === 1 ){ this.stats_segment.stats_16_30.score_odd++ }
                    if((parseInt(stats_segment.stats_16_30.score_home_home) + parseInt(stats_segment.stats_16_30.score_home_away)) % 2 === 0 ){ this.stats_segment.stats_16_30.score_even++ }

                    if(parseInt(stats_segment.stats_31_45.score_over15_home) + parseInt(stats_segment.stats_31_45.score_over15_away) > 1){ this.stats_segment.stats_31_45.score_over15++ }
                    if(parseInt(stats_segment.stats_31_45.score_over25_home) + parseInt(stats_segment.stats_31_45.score_over25_away) > 2){ this.stats_segment.stats_31_45.score_over25++ }
                    if(parseInt(stats_segment.stats_31_45.score_over35_home) + parseInt(stats_segment.stats_31_45.score_over35_away) > 3){ this.stats_segment.stats_31_45.score_over35++ }
                    if(parseInt(stats_segment.stats_31_45.score_home_home) > parseInt(stats_segment.stats_31_45.score_home_away) ){ this.stats_segment.stats_31_45.score_home++ }
                    if(parseInt(stats_segment.stats_31_45.score_away_home) < parseInt(stats_segment.stats_31_45.score_away_away) ){ this.stats_segment.stats_31_45.score_away++ }
                    if(parseInt(stats_segment.stats_31_45.score_draw_home) === parseInt(stats_segment.stats_31_45.score_draw_away) ){ this.stats_segment.stats_31_45.score_draw++ }
                    if(parseInt(stats_segment.stats_31_45.score_bts_home) > 0 && parseInt(stats_segment.stats_31_45.score_bts_away) > 0 ){ this.stats_segment.stats_31_45.score_bts++ }
                    if((parseInt(stats_segment.stats_31_45.score_home_home) + parseInt(stats_segment.stats_31_45.score_home_away)) % 2 === 1 ){ this.stats_segment.stats_31_45.score_odd++ }
                    if((parseInt(stats_segment.stats_31_45.score_home_home) + parseInt(stats_segment.stats_31_45.score_home_away)) % 2 === 0 ){ this.stats_segment.stats_31_45.score_even++ }

                    if(parseInt(stats_segment.stats_46_60.score_over15_home) + parseInt(stats_segment.stats_46_60.score_over15_away) > 1){ this.stats_segment.stats_46_60.score_over15++ }
                    if(parseInt(stats_segment.stats_46_60.score_over25_home) + parseInt(stats_segment.stats_46_60.score_over25_away) > 2){ this.stats_segment.stats_46_60.score_over25++ }
                    if(parseInt(stats_segment.stats_46_60.score_over35_home) + parseInt(stats_segment.stats_46_60.score_over35_away) > 3){ this.stats_segment.stats_46_60.score_over35++ }
                    if(parseInt(stats_segment.stats_46_60.score_home_home) > parseInt(stats_segment.stats_46_60.score_home_away) ){ this.stats_segment.stats_46_60.score_home++ }
                    if(parseInt(stats_segment.stats_46_60.score_away_home) < parseInt(stats_segment.stats_46_60.score_away_away) ){ this.stats_segment.stats_46_60.score_away++ }
                    if(parseInt(stats_segment.stats_46_60.score_draw_home) === parseInt(stats_segment.stats_46_60.score_draw_away) ){ this.stats_segment.stats_46_60.score_draw++ }
                    if(parseInt(stats_segment.stats_46_60.score_bts_home) > 0 && parseInt(stats_segment.stats_46_60.score_bts_away) > 0 ){ this.stats_segment.stats_46_60.score_bts++ }
                    if((parseInt(stats_segment.stats_46_60.score_home_home) + parseInt(stats_segment.stats_46_60.score_home_away)) % 2 === 1 ){ this.stats_segment.stats_46_60.score_odd++ }
                    if((parseInt(stats_segment.stats_46_60.score_home_home) + parseInt(stats_segment.stats_46_60.score_home_away)) % 2 === 0 ){ this.stats_segment.stats_46_60.score_even++ }

                    if(parseInt(stats_segment.stats_61_75.score_over15_home) + parseInt(stats_segment.stats_61_75.score_over15_away) > 1){ this.stats_segment.stats_61_75.score_over15++ }
                    if(parseInt(stats_segment.stats_61_75.score_over25_home) + parseInt(stats_segment.stats_61_75.score_over25_away) > 2){ this.stats_segment.stats_61_75.score_over25++ }
                    if(parseInt(stats_segment.stats_61_75.score_over35_home) + parseInt(stats_segment.stats_61_75.score_over35_away) > 3){ this.stats_segment.stats_61_75.score_over35++ }
                    if(parseInt(stats_segment.stats_61_75.score_home_home) > parseInt(stats_segment.stats_61_75.score_home_away) ){ this.stats_segment.stats_61_75.score_home++ }
                    if(parseInt(stats_segment.stats_61_75.score_away_home) < parseInt(stats_segment.stats_61_75.score_away_away) ){ this.stats_segment.stats_61_75.score_away++ }
                    if(parseInt(stats_segment.stats_61_75.score_draw_home) === parseInt(stats_segment.stats_61_75.score_draw_away) ){ this.stats_segment.stats_61_75.score_draw++ }
                    if(parseInt(stats_segment.stats_61_75.score_bts_home) > 0 && parseInt(stats_segment.stats_61_75.score_bts_away) > 0 ){ this.stats_segment.stats_61_75.score_bts++ }
                    if((parseInt(stats_segment.stats_61_75.score_home_home) + parseInt(stats_segment.stats_61_75.score_home_away)) % 2 === 1 ){ this.stats_segment.stats_61_75.score_odd++ }
                    if((parseInt(stats_segment.stats_61_75.score_home_home) + parseInt(stats_segment.stats_61_75.score_home_away)) % 2 === 0 ){ this.stats_segment.stats_61_75.score_even++ }

                    if(parseInt(stats_segment.stats_76_90.score_over15_home) + parseInt(stats_segment.stats_76_90.score_over15_away) > 1){ this.stats_segment.stats_76_90.score_over15++ }
                    if(parseInt(stats_segment.stats_76_90.score_over25_home) + parseInt(stats_segment.stats_76_90.score_over25_away) > 2){ this.stats_segment.stats_76_90.score_over25++ }
                    if(parseInt(stats_segment.stats_76_90.score_over35_home) + parseInt(stats_segment.stats_76_90.score_over35_away) > 3){ this.stats_segment.stats_76_90.score_over35++ }
                    if(parseInt(stats_segment.stats_76_90.score_home_home) > parseInt(stats_segment.stats_76_90.score_home_away) ){ this.stats_segment.stats_76_90.score_home++ }
                    if(parseInt(stats_segment.stats_76_90.score_away_home) < parseInt(stats_segment.stats_76_90.score_away_away) ){ this.stats_segment.stats_76_90.score_away++ }
                    if(parseInt(stats_segment.stats_76_90.score_draw_home) === parseInt(stats_segment.stats_76_90.score_draw_away) ){ this.stats_segment.stats_76_90.score_draw++ }
                    if(parseInt(stats_segment.stats_76_90.score_bts_home) > 0 && parseInt(stats_segment.stats_76_90.score_bts_away) > 0 ){ this.stats_segment.stats_76_90.score_bts++ }
                    if((parseInt(stats_segment.stats_76_90.score_home_home) + parseInt(stats_segment.stats_76_90.score_home_away)) % 2 === 1 ){ this.stats_segment.stats_76_90.score_odd++ }
                    if((parseInt(stats_segment.stats_76_90.score_home_home) + parseInt(stats_segment.stats_76_90.score_home_away)) % 2 === 0 ){ this.stats_segment.stats_76_90.score_even++ }

                    if(score_check.score0_15.score00_home == "0" && score_check.score0_15.score00_away == "0"){ this.score_stats.score0_15.score00++ }
                    if(score_check.score0_15.score11_home == "1" && score_check.score0_15.score11_away == "1"){ this.score_stats.score0_15.score11++ }
                    if(score_check.score0_15.score22_home == "2" && score_check.score0_15.score22_away == "2"){ this.score_stats.score0_15.score22++ }
                    if(score_check.score0_15.score10_home == "1" && score_check.score0_15.score10_away == "0"){ this.score_stats.score0_15.score10++ }
                    if(score_check.score0_15.score20_home == "2" && score_check.score0_15.score20_away == "0"){ this.score_stats.score0_15.score20++ }
                    if(score_check.score0_15.score30_home == "3" && score_check.score0_15.score30_away == "0"){ this.score_stats.score0_15.score30++ }
                    if(score_check.score0_15.score21_home == "2" && score_check.score0_15.score21_away == "1"){ this.score_stats.score0_15.score21++ }
                    if(score_check.score0_15.score31_home == "3" && score_check.score0_15.score31_away == "1"){ this.score_stats.score0_15.score31++ }
                    if(score_check.score0_15.score01_home == "0" && score_check.score0_15.score01_away == "1"){ this.score_stats.score0_15.score01++ }
                    if(score_check.score0_15.score02_home == "0" && score_check.score0_15.score02_away == "2"){ this.score_stats.score0_15.score02++ }
                    if(score_check.score0_15.score03_home == "0" && score_check.score0_15.score03_away == "3"){ this.score_stats.score0_15.score03++ }
                    if(score_check.score0_15.score12_home == "1" && score_check.score0_15.score12_away == "2"){ this.score_stats.score0_15.score12++ }
                    if(score_check.score0_15.score13_home == "1" && score_check.score0_15.score13_away == "3"){ this.score_stats.score0_15.score13++ }

                    if(score_check.score16_30.score00_home == "0" && score_check.score16_30.score00_away == "0"){ this.score_stats.score16_30.score00++ }
                    if(score_check.score16_30.score11_home == "1" && score_check.score16_30.score11_away == "1"){ this.score_stats.score16_30.score11++ }
                    if(score_check.score16_30.score22_home == "2" && score_check.score16_30.score22_away == "2"){ this.score_stats.score16_30.score22++ }
                    if(score_check.score16_30.score10_home == "1" && score_check.score16_30.score10_away == "0"){ this.score_stats.score16_30.score10++ }
                    if(score_check.score16_30.score20_home == "2" && score_check.score16_30.score20_away == "0"){ this.score_stats.score16_30.score20++ }
                    if(score_check.score16_30.score30_home == "3" && score_check.score16_30.score30_away == "0"){ this.score_stats.score16_30.score30++ }
                    if(score_check.score16_30.score21_home == "2" && score_check.score16_30.score21_away == "1"){ this.score_stats.score16_30.score21++ }
                    if(score_check.score16_30.score31_home == "3" && score_check.score16_30.score31_away == "1"){ this.score_stats.score16_30.score31++ }
                    if(score_check.score16_30.score01_home == "0" && score_check.score16_30.score01_away == "1"){ this.score_stats.score16_30.score01++ }
                    if(score_check.score16_30.score02_home == "0" && score_check.score16_30.score02_away == "2"){ this.score_stats.score16_30.score02++ }
                    if(score_check.score16_30.score03_home == "0" && score_check.score16_30.score02_away == "3"){ this.score_stats.score16_30.score03++ }
                    if(score_check.score16_30.score12_home == "1" && score_check.score16_30.score12_away == "2"){ this.score_stats.score16_30.score12++ }
                    if(score_check.score16_30.score13_home == "1" && score_check.score16_30.score13_away == "3"){ this.score_stats.score16_30.score13++ }

                    if(score_check.score31_45.score00_home == "0" && score_check.score31_45.score00_away == "0"){ this.score_stats.score31_45.score00++ }
                    if(score_check.score31_45.score11_home == "1" && score_check.score31_45.score11_away == "1"){ this.score_stats.score31_45.score11++ }
                    if(score_check.score31_45.score22_home == "2" && score_check.score31_45.score22_away == "2"){ this.score_stats.score31_45.score22++ }
                    if(score_check.score31_45.score10_home == "1" && score_check.score31_45.score10_away == "0"){ this.score_stats.score31_45.score10++ }
                    if(score_check.score31_45.score20_home == "2" && score_check.score31_45.score20_away == "0"){ this.score_stats.score31_45.score20++ }
                    if(score_check.score31_45.score30_home == "3" && score_check.score31_45.score30_away == "0"){ this.score_stats.score31_45.score30++ }
                    if(score_check.score31_45.score21_home == "2" && score_check.score31_45.score21_away == "1"){ this.score_stats.score31_45.score21++ }
                    if(score_check.score31_45.score31_home == "3" && score_check.score31_45.score31_away == "1"){ this.score_stats.score31_45.score31++ }
                    if(score_check.score31_45.score01_home == "0" && score_check.score31_45.score01_away == "1"){ this.score_stats.score31_45.score01++ }
                    if(score_check.score31_45.score02_home == "0" && score_check.score31_45.score02_away == "2"){ this.score_stats.score31_45.score02++ }
                    if(score_check.score31_45.score03_home == "0" && score_check.score31_45.score03_away == "3"){ this.score_stats.score31_45.score03++ }
                    if(score_check.score31_45.score12_home == "1" && score_check.score31_45.score12_away == "2"){ this.score_stats.score31_45.score12++ }
                    if(score_check.score31_45.score13_home == "1" && score_check.score31_45.score13_away == "3"){ this.score_stats.score31_45.score13++ }

                    if(score_check.score46_60.score00_home == "0" && score_check.score46_60.score00_away == "0"){ this.score_stats.score46_60.score00++ }
                    if(score_check.score46_60.score11_home == "1" && score_check.score46_60.score11_away == "1"){ this.score_stats.score46_60.score11++ }
                    if(score_check.score46_60.score22_home == "2" && score_check.score46_60.score22_away == "2"){ this.score_stats.score46_60.score22++ }
                    if(score_check.score46_60.score10_home == "1" && score_check.score46_60.score10_away == "0"){ this.score_stats.score46_60.score10++ }
                    if(score_check.score46_60.score20_home == "2" && score_check.score46_60.score20_away == "0"){ this.score_stats.score46_60.score20++ }
                    if(score_check.score46_60.score30_home == "3" && score_check.score46_60.score30_away == "0"){ this.score_stats.score46_60.score30++ }
                    if(score_check.score46_60.score21_home == "2" && score_check.score46_60.score21_away == "1"){ this.score_stats.score46_60.score21++ }
                    if(score_check.score46_60.score31_home == "3" && score_check.score46_60.score31_away == "1"){ this.score_stats.score46_60.score31++ }
                    if(score_check.score46_60.score01_home == "0" && score_check.score46_60.score01_away == "1"){ this.score_stats.score46_60.score01++ }
                    if(score_check.score46_60.score02_home == "0" && score_check.score46_60.score02_away == "2"){ this.score_stats.score46_60.score02++ }
                    if(score_check.score46_60.score03_home == "0" && score_check.score46_60.score03_away == "3"){ this.score_stats.score46_60.score03++ }
                    if(score_check.score46_60.score12_home == "1" && score_check.score46_60.score12_away == "2"){ this.score_stats.score46_60.score12++ }
                    if(score_check.score46_60.score13_home == "1" && score_check.score46_60.score13_away == "3"){ this.score_stats.score46_60.score13++ }

                    if(score_check.score61_75.score00_home == "0" && score_check.score61_75.score00_away == "0"){ this.score_stats.score61_75.score00++ }
                    if(score_check.score61_75.score11_home == "1" && score_check.score61_75.score11_away == "1"){ this.score_stats.score61_75.score11++ }
                    if(score_check.score61_75.score22_home == "2" && score_check.score61_75.score22_away == "2"){ this.score_stats.score61_75.score22++ }
                    if(score_check.score61_75.score10_home == "1" && score_check.score61_75.score10_away == "0"){ this.score_stats.score61_75.score10++ }
                    if(score_check.score61_75.score20_home == "2" && score_check.score61_75.score20_away == "0"){ this.score_stats.score61_75.score20++ }
                    if(score_check.score61_75.score30_home == "3" && score_check.score61_75.score30_away == "0"){ this.score_stats.score61_75.score30++ }
                    if(score_check.score61_75.score21_home == "2" && score_check.score61_75.score21_away == "1"){ this.score_stats.score61_75.score21++ }
                    if(score_check.score61_75.score31_home == "3" && score_check.score61_75.score31_away == "1"){ this.score_stats.score61_75.score31++ }
                    if(score_check.score61_75.score01_home == "0" && score_check.score61_75.score01_away == "1"){ this.score_stats.score61_75.score01++ }
                    if(score_check.score61_75.score02_home == "0" && score_check.score61_75.score02_away == "2"){ this.score_stats.score61_75.score02++ }
                    if(score_check.score61_75.score03_home == "0" && score_check.score61_75.score03_away == "3"){ this.score_stats.score61_75.score03++ }
                    if(score_check.score61_75.score12_home == "1" && score_check.score61_75.score12_away == "2"){ this.score_stats.score61_75.score12++ }
                    if(score_check.score61_75.score13_home == "1" && score_check.score61_75.score13_away == "3"){ this.score_stats.score61_75.score13++ }

                    if(score_check.score76_90.score00_home == "0" && score_check.score76_90.score00_away == "0"){ this.score_stats.score76_90.score00++ }
                    if(score_check.score76_90.score11_home == "1" && score_check.score76_90.score11_away == "1"){ this.score_stats.score76_90.score11++ }
                    if(score_check.score76_90.score22_home == "2" && score_check.score76_90.score22_away == "2"){ this.score_stats.score76_90.score22++ }
                    if(score_check.score76_90.score10_home == "1" && score_check.score76_90.score10_away == "0"){ this.score_stats.score76_90.score10++ }
                    if(score_check.score76_90.score20_home == "2" && score_check.score76_90.score20_away == "0"){ this.score_stats.score76_90.score20++ }
                    if(score_check.score76_90.score30_home == "3" && score_check.score76_90.score30_away == "0"){ this.score_stats.score76_90.score30++ }
                    if(score_check.score76_90.score21_home == "2" && score_check.score76_90.score21_away == "1"){ this.score_stats.score76_90.score21++ }
                    if(score_check.score76_90.score31_home == "3" && score_check.score76_90.score31_away == "1"){ this.score_stats.score76_90.score31++ }
                    if(score_check.score76_90.score01_home == "0" && score_check.score76_90.score01_away == "1"){ this.score_stats.score76_90.score01++ }
                    if(score_check.score76_90.score02_home == "0" && score_check.score76_90.score02_away == "2"){ this.score_stats.score76_90.score02++ }
                    if(score_check.score76_90.score03_home == "0" && score_check.score76_90.score03_away == "3"){ this.score_stats.score76_90.score03++ }
                    if(score_check.score76_90.score12_home == "1" && score_check.score76_90.score12_away == "2"){ this.score_stats.score76_90.score12++ }
                    if(score_check.score76_90.score13_home == "1" && score_check.score76_90.score13_away == "3"){ this.score_stats.score76_90.score13++ }
                }
                this.last_stats_home1 = {
                    'goal': 0,
                    'on': 0,
                    'off': 0,
                    'blk': 0,
                    'in': 0,
                    'out': 0,
                    'pos': 0,
                    'cnr': 0,
                    'da': 0,
                    'red': 0,
                    'yel': 0
                }
                this.last_stats_away1 = {
                    'goal': 0,
                    'on': 0,
                    'off': 0,
                    'blk': 0,
                    'in': 0,
                    'out': 0,
                    'pos': 0,
                    'cnr': 0,
                    'da': 0,
                    'red': 0,
                    'yel': 0
                }
                for(let i = 1 ; i < this.predictionlist.length; i++){
                    if(this.predictionlist[i].liveStats.length > 0){
                        let current_stats = this.predictionlist[i].liveStats
                        if(current_stats[0].stats[0].length > 0){
                            this.last_stats_home1.goal = this.last_stats_home1.goal + current_stats[0].stats[current_stats[0].stats.length - 1][0].goals
                            this.last_stats_away1.goal = this.last_stats_away1.goal + current_stats[0].stats[current_stats[0].stats.length - 1][1].goals
                            this.last_stats_home1.on = this.last_stats_home1.on + current_stats[0].stats[current_stats[0].stats.length - 1][0].shots.ongoal
                            this.last_stats_away1.on = this.last_stats_away1.on + current_stats[0].stats[current_stats[0].stats.length - 1][1].shots.ongoal
                            this.last_stats_home1.off = this.last_stats_home1.off + current_stats[0].stats[current_stats[0].stats.length - 1][0].shots.offgoal
                            this.last_stats_away1.off = this.last_stats_away1.off + current_stats[0].stats[current_stats[0].stats.length - 1][1].shots.offgoal
                            this.last_stats_home1.blk = this.last_stats_home1.blk + current_stats[0].stats[current_stats[0].stats.length - 1][0].shots.blocked
                            this.last_stats_away1.blk = this.last_stats_away1.blk + current_stats[0].stats[current_stats[0].stats.length - 1][1].shots.blocked
                            this.last_stats_home1.pos = this.last_stats_home1.pos + current_stats[0].stats[current_stats[0].stats.length - 1][0].possessiontime
                            this.last_stats_away1.pos = this.last_stats_away1.pos + current_stats[0].stats[current_stats[0].stats.length - 1][1].possessiontime
                            if(current_stats[0].stats[current_stats[0].stats.length - 1][0].shots.insidebox){
                                this.last_stats_home1.in = this.last_stats_home1.in + current_stats[0].stats[current_stats[0].stats.length - 1][0].shots.insidebox
                                this.last_stats_away1.in = this.last_stats_away1.in + current_stats[0].stats[current_stats[0].stats.length - 1][1].shots.insidebox
                            }
                            if(current_stats[0].stats[current_stats[0].stats.length - 1][0].shots.outsidebox){
                                this.last_stats_home1.out = this.last_stats_home1.out + current_stats[0].stats[current_stats[0].stats.length - 1][0].shots.outsidebox
                                this.last_stats_away1.out = this.last_stats_away1.out + current_stats[0].stats[current_stats[0].stats.length - 1][1].shots.outsidebox
                            }
                            this.last_stats_home1.cnr = this.last_stats_home1.cnr + current_stats[0].stats[current_stats[0].stats.length - 1][0].corners
                            this.last_stats_away1.cnr = this.last_stats_away1.cnr + current_stats[0].stats[current_stats[0].stats.length - 1][1].corners
                            if(current_stats[0].stats[current_stats[0].stats.length - 1][0].attacks){
                                this.last_stats_home1.da = this.last_stats_home1.da + current_stats[0].stats[current_stats[0].stats.length - 1][0].attacks.dangerous_attacks
                                this.last_stats_away1.da = this.last_stats_away1.da + current_stats[0].stats[current_stats[0].stats.length - 1][1].attacks.dangerous_attacks
                            }
                            this.last_stats_home1.red = this.last_stats_home1.red + current_stats[0].stats[current_stats[0].stats.length - 1][0].redcards
                            this.last_stats_away1.red = this.last_stats_away1.red + current_stats[0].stats[current_stats[0].stats.length - 1][1].redcards
                            this.last_stats_home1.yel = this.last_stats_home1.yel + current_stats[0].stats[current_stats[0].stats.length - 1][0].yellowcards
                            this.last_stats_away1.yel = this.last_stats_away1.yel + current_stats[0].stats[current_stats[0].stats.length - 1][1].yellowcards
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
                for(let i = 1 ; i < this.predictionlist.length; i++){
                    if(this.predictionlist[i].liveStats.length > 0){
                        let current_stats = this.predictionlist[i].liveStats
                        let times = current_stats[0].time
                        let stats = current_stats[0].stats
                        let home_id = current_stats[0].home_id
                        let away_id = current_stats[0].away_id
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
                                let cStats = stats[j]
                                if(cStats[0]){
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
                            }
                            //-------------------------------------------------------------Total Stats------------------------------------------------------------
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
                }
            },
            score_filter_function1(sum, a , b){
                for(let i = 1 ; i < this.predictionlist.length ; i++){
                    if(this.predictionlist[i].scores.length > 0){
                        let home_score = -100
                        let away_score = -100
                        for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                            if(this.predictionlist[i].scores[j].elapsedRegularTime >= a && this.predictionlist[i].scores[j].elapsedRegularTime <= b){
                                home_score = this.predictionlist[i].scores[j].score.home
                                away_score = this.predictionlist[i].scores[j].score.away
                            }
                        }
                        if((parseInt(home_score) + parseInt(away_score)) < sum){
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                    else{
                        let index = this.predictionlist.indexOf(this.predictionlist[i]);
                        if (index > -1) {
                            i = i - 1
                            this.predictionlist.splice(index, 1);
                        }
                    }
                }
            },
            score_filter_function2(sum, a, b){
                for(let i = 1 ; i < this.predictionlist.length ; i++){
                    if(this.predictionlist[i].scores.length > 0){
                        let home_score = -100
                        let away_score = -100
                        for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                            if(this.predictionlist[i].scores[j].elapsedRegularTime >= a && this.predictionlist[i].scores[j].elapsedRegularTime <= b){
                                home_score = this.predictionlist[i].scores[j].score.home
                                away_score = this.predictionlist[i].scores[j].score.away
                            }
                        }
                        if((parseInt(home_score) + parseInt(away_score)) >= sum){
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                    else{
                        let index = this.predictionlist.indexOf(this.predictionlist[i]);
                        if (index > -1) {
                            i = i - 1
                            this.predictionlist.splice(index, 1);
                        }
                    }
                }
            },
            score_filter_function3(sum, a, b){
                if(sum === 1){
                    for(let i = 1 ; i < this.predictionlist.length ; i++){
                        if(this.predictionlist[i].scores.length > 0){
                            let home_score = -100
                            let away_score = -100
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime >= a && this.predictionlist[i].scores[j].elapsedRegularTime <= b){
                                    home_score = this.predictionlist[i].scores[j].score.home
                                    away_score = this.predictionlist[i].scores[j].score.away
                                }
                            }
                            if(parseInt(home_score) <= parseInt(away_score)){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(sum === 2){
                    for(let i = 1 ; i < this.predictionlist.length ; i++){
                        if(this.predictionlist[i].scores.length > 0){
                            let home_score = -100
                            let away_score = -100
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime >= a && this.predictionlist[i].scores[j].elapsedRegularTime <= b){
                                    home_score = this.predictionlist[i].scores[j].score.home
                                    away_score = this.predictionlist[i].scores[j].score.away
                                }
                            }
                            if(parseInt(home_score) != parseInt(away_score)){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(sum === 3){
                    for(let i = 1 ; i < this.predictionlist.length ; i++){
                        if(this.predictionlist[i].scores.length > 0){
                            let home_score = -100
                            let away_score = -100
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime >= a && this.predictionlist[i].scores[j].elapsedRegularTime <= b){
                                    home_score = this.predictionlist[i].scores[j].score.home
                                    away_score = this.predictionlist[i].scores[j].score.away
                                }
                            }
                            if(parseInt(home_score) >= parseInt(away_score)){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
            },
            score_filter_function4(sum, a, b){
                if(sum === 1){
                    for(let i = 1 ; i < this.predictionlist.length ; i++){
                        if(this.predictionlist[i].scores.length > 0){
                            let home_score = -100
                            let away_score = -100
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime >= a && this.predictionlist[i].scores[j].elapsedRegularTime <= b){
                                    home_score = this.predictionlist[i].scores[j].score.home
                                    away_score = this.predictionlist[i].scores[j].score.away
                                }
                            }
                            if(parseInt(home_score) < 1 || parseInt(away_score) < 1){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(sum === 2){
                    for(let i = 1 ; i < this.predictionlist.length ; i++){
                        if(this.predictionlist[i].scores.length > 0){
                            let home_score = -100
                            let away_score = -100
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime >= a && this.predictionlist[i].scores[j].elapsedRegularTime <= b){
                                    home_score = this.predictionlist[i].scores[j].score.home
                                    away_score = this.predictionlist[i].scores[j].score.away
                                }
                            }
                            console.log('odd check===>', home_score, ', ', away_score, ', ', this.predictionlist[i].scores, ', ', (parseInt(home_score) + parseInt(away_score)) % 2)
                            if((parseInt(home_score) + parseInt(away_score)) % 2 === 0){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
                if(sum === 3){
                    for(let i = 1 ; i < this.predictionlist.length ; i++){
                        if(this.predictionlist[i].scores.length > 0){
                            let home_score = -100
                            let away_score = -100
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime >= a && this.predictionlist[i].scores[j].elapsedRegularTime <= b){
                                    home_score = this.predictionlist[i].scores[j].score.home
                                    away_score = this.predictionlist[i].scores[j].score.away
                                }
                            }
                            if((parseInt(home_score) + parseInt(away_score)) % 2 === 1){
                                let index = this.predictionlist.indexOf(this.predictionlist[i]);
                                if (index > -1) {
                                    i = i - 1
                                    this.predictionlist.splice(index, 1);
                                }
                            }
                        }
                        else{
                            let index = this.predictionlist.indexOf(this.predictionlist[i]);
                            if (index > -1) {
                                i = i - 1
                                this.predictionlist.splice(index, 1);
                            }
                        }
                    }
                }
            },
            score_minute_from(val){
                this.score_minute_filter.minute.from = parseInt(val)
            },
            score_minute_to(val){
                this.score_minute_filter.minute.to = parseInt(val)
            },
            score_over05_from(val){
                this.score_minute_filter.over05.from = parseInt(val)
                this.getSearchResult()
            },
            score_over05_to(val){
                this.score_minute_filter.over05.to = parseInt(val)
                this.getSearchResult()
            },
            score_over15_from(val){
                this.score_minute_filter.over15.from = parseInt(val)
                this.getSearchResult()
            },
            score_over15_to(val){
                this.score_minute_filter.over15.to = parseInt(val)
                this.getSearchResult()
            },
            score_over25_from(val){
                this.score_minute_filter.over25.from = parseInt(val)
                this.getSearchResult()
            },
            score_over25_to(val){
                this.score_minute_filter.over25.to = parseInt(val)
                this.getSearchResult()
            },
            score_over35_from(val){
                this.score_minute_filter.over35.from = parseInt(val)
                this.getSearchResult()
            },
            score_over35_to(val){
                this.score_minute_filter.over35.to = parseInt(val)
                this.getSearchResult()
            },
            score_under05_from(val){
                this.score_minute_filter.under05.from = parseInt(val)
                this.getSearchResult()
            },
            score_under05_to(val){
                this.score_minute_filter.under05.to = parseInt(val)
                this.getSearchResult()
            },
            score_under15_from(val){
                this.score_minute_filter.under15.from = parseInt(val)
                this.getSearchResult()
            },
            score_under15_to(val){
                this.score_minute_filter.under15.to = parseInt(val)
                this.getSearchResult()
            },
            score_under25_from(val){
                this.score_minute_filter.under25.from = parseInt(val)
                this.getSearchResult()
            },
            score_under25_to(val){
                this.score_minute_filter.under25.to = parseInt(val)
                this.getSearchResult()
            },
            score_under35_from(val){
                this.score_minute_filter.under35.from = parseInt(val)
                this.getSearchResult()
            },
            score_under35_to(val){
                this.score_minute_filter.under35.to = parseInt(val)
                this.getSearchResult()
            },
            score_home_from(val){
                this.score_minute_filter.home.from = parseInt(val)
                this.getSearchResult()
            },
            score_home_to(val){
                this.score_minute_filter.home.to = parseInt(val)
                this.getSearchResult()
            },
            score_draws_from(val){
                this.score_minute_filter.draws.from = parseInt(val)
                this.getSearchResult()
            },
            score_draws_to(val){
                this.score_minute_filter.draws.to = parseInt(val)
                this.getSearchResult()
            },
            score_away_from(val){
                this.score_minute_filter.away.from = parseInt(val)
                this.getSearchResult()
            },
            score_away_to(val){
                this.score_minute_filter.away.to = parseInt(val)
                this.getSearchResult()
            },
            score_bts_from(val){
                this.score_minute_filter.bts.from = parseInt(val)
                this.getSearchResult()
            },
            score_bts_to(val){
                this.score_minute_filter.bts.to = parseInt(val)
                this.getSearchResult()
            },
            score_odd_from(val){
                this.score_minute_filter.odd.from = parseInt(val)
                this.getSearchResult()
            },
            score_odd_to(val){
                this.score_minute_filter.odd.to = parseInt(val)
                this.getSearchResult()
            },
            score_even_from(val){
                this.score_minute_filter.even.from = parseInt(val)
                this.getSearchResult()
            },
            score_even_to(val){
                this.score_minute_filter.even.to = parseInt(val)
                this.getSearchResult()
            },
            set_league(val){
                this.searchFilter.leagues = val
                console.log(this.searchFilter.leagues)
                this.getSearchResult()
            },
            set_game(val){
                if(val != 100){
                    this.isload = false
                    this.searchFilter.prediction = val
                    let predictionType = this.gameList.filter(function(item) {
                        return item.value === val;
                    });
                    console.log('predictionValue=>', predictionType[0].label)
                    if(val === "1" || val === "2" || val === "3" || val === "4"){
                        this.searchFilter.valid_type = 'MATCH_ODDS'
                    }
                    else{
                        this.searchFilter.valid_type = ''
                    }

                    if(val === "1"){
                        this.searchFilter.prediction_type = "Back"
                    }
                    else if(val === "2" || val === "3" || val === "4"){
                        this.searchFilter.prediction_type = "Lay"
                    }
                    else{
                        this.searchFilter.prediction_type = ""
                    }
                    console.log('prediction type===>', this.searchFilter.prediction_type)
                    this.searchFilter.valid_pre_odd_min = 0
                    this.searchFilter.valid_pre_odd_max = 100000
                    this.getTable(predictionType[0].label)
                    this.getSearchResult()
                }
            },
            set_prediction_date1(val){
                this.searchFilter.from_date = val
                let datelist2 = []
                for(let i = 0 ; i < this.datelist1.length ;  i++){
                    console.log(this.datelist1[i])
                    let query = this.datelist1[i]
                    if(query >= this.searchFilter.from_date){
                        datelist2.push(query)
                    }
                }
                this.datelist2 = datelist2
                this.searchFilter.to_date = datelist2[0]
                this.getSearchResult()
            },
            set_prediction_date2(val){
                this.searchFilter.to_date =  val
                this.getSearchResult()
            },
            select_prediction(val){
                let prediction = this.predictionlist.filter(function(item) {
                    return item.value == val;
                })
                this.current_predictionId = val

                this.currentPrediction = prediction[0].value1
                this.current_stats = prediction[0].liveStats

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

                if(this.current_stats.length > 0){
                    let times = this.current_stats[0].time
                    let stats = this.current_stats[0].stats
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

                if(this.current_stats.length > 0){
                    this.last_stats_home.on = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][0].shots.ongoal
                    this.last_stats_away.on = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][1].shots.ongoal
                    this.last_stats_home.off = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][0].shots.offgoal
                    this.last_stats_away.off = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][1].shots.offgoal
                    this.last_stats_home.blk = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][0].shots.blocked
                    this.last_stats_away.blk = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][1].shots.blocked
                    this.last_stats_home.pos = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][0].possessiontime
                    this.last_stats_away.pos = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][1].possessiontime
                    if(this.current_stats[0].stats[this.current_stats[0].stats.length - 1][0].shots.insidebox){
                        this.last_stats_home.in = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][0].shots.insidebox
                        this.last_stats_away.in = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][1].shots.insidebox
                    }
                    else{
                        this.last_stats_home.in = '-'
                        this.last_stats_away.in = '-'
                    }
                    if(this.current_stats[0].stats[this.current_stats[0].stats.length - 1][0].shots.outsidebox){
                        this.last_stats_home.out = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][0].shots.outsidebox
                        this.last_stats_away.out = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][1].shots.outsidebox
                    }
                    else{
                        this.last_stats_home.out = '-'
                        this.last_stats_away.out = '-'
                    }
                    this.last_stats_home.cnr = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][0].corners
                    this.last_stats_away.cnr = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][1].corners
                    if(this.current_stats[0].stats[this.current_stats[0].stats.length - 1][0].attacks){
                        this.last_stats_home.da = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][0].attacks.dangerous_attacks
                        this.last_stats_away.da = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][1].attacks.dangerous_attacks
                    }
                    else{
                        this.last_stats_home.da = '-'
                        this.last_stats_away.da = '-'
                    }
                    this.last_stats_home.red = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][0].redcards
                    this.last_stats_away.red = this.current_stats[0].stats[this.current_stats[0].stats.length - 1][1].redcards
                    console.log('current_stats====>', this.current_stats)
                }
                else{
                    this.last_stats_home = {
                        'on': '-',
                        'off': '-',
                        'blk': '-',
                        'in': '-',
                        'out': '-',
                        'pos': '-',
                        'cnr': '-',
                        'da': '-',
                        'red': '-',
                        'rtg': '-'
                    },
                        this.last_stats_away = {
                            'on': '-',
                            'off': '-',
                            'blk': '-',
                            'in': '-',
                            'out': '-',
                            'pos': '-',
                            'cnr': '-',
                            'da': '-',
                            'red': '-',
                            'rtg': '-'
                        }
                }

                this.select_filter()
            },
            select_filter(){
                for(let i = 1 ;  i < this.predictionlist.length; i++){
                    if(this.predictionlist[i].value === this.current_predictionId){
                        console.log(this.predictionlist[i])
                        let self = this
                        let matched =this.eventLists2.filter(function(item) {
                            return item.value === self.currentPrediction
                        });
                        if(matched.length > 0){
                            this.total_matched_money = matched[0].totalMatched
                        }

                        this.currentPrematchOdd = this.predictionlist[i].pre_MatchOdd
                        console.log('currentPrematchOdd===>', this.currentPrematchOdd)
                        this.currentCompetition = this.predictionlist[i].league
                        this.currentOdds = this.predictionlist[i].Odds
                        this.currentPredictionType = this.predictionlist[i].predictionType
                        if(this.predictionlist[i].predictionType == ""){
                            var str = this.predictionlist[i].marketType;
                            var res = str.split("- ")[1];
                            res = str.split(" ")[2];
                            this.currentPredictionType = res
                        }
                        this.currentLabel = this.predictionlist[i].label
                        let pre_value = this.currentPrediction
                        this.selectionId = pre_value.split(',')[1]
                        this.currentEventId = pre_value.split(',')[2]
                        this.currentMarketId = pre_value.split(',')[0]
                        let half_extra = 1
                        if(this.predictionlist[i].half_extra){
                            half_extra = this.predictionlist[i].half_extra
                        }
                        let break_time = this.predictionlist[i].break_time
                        break_time = 15
                        if(this.predictionlist[i].date >= "2020-08-23" && this.predictionlist[i].date <= "2020-09-25" && !this.predictionlist[i].mark){
                            break_time = 0
                        }
                        console.log('half extra and break time=>', half_extra,', ', break_time)

                        this.half_first_Odds = []
                        this.half_first_Scores = []
                        this.half_second_Odds = []
                        this.half_second_Scores = []
                        this.first_goal_score = ''
                        this.first_goal_time = ''
                        for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                            if((this.predictionlist[i].scores[j].score.home == 1 && this.predictionlist[i].scores[j].score.away == 0) || (this.predictionlist[i].scores[j].score.home == 0 && this.predictionlist[i].scores[j].score.away == 1)){
                                if(this.predictionlist[i].scores[j].score.home == 1 && this.predictionlist[i].scores[j].score.away == 0){
                                    this.first_goal_score = '1 - 0'
                                    this.first_goal_time = this.predictionlist[i].scores[j].elapsedRegularTime
                                    console.log('first goal minute', this.first_goal_time)
                                    break
                                }
                                else if(this.predictionlist[i].scores[j].score.home == 0 && this.predictionlist[i].scores[j].score.away == 1){
                                    this.first_goal_score = '0 - 1'
                                    this.first_goal_time = this.predictionlist[i].scores[j].elapsedRegularTime
                                    console.log('first goal minute', this.first_goal_time)
                                    break
                                }
                            }
                        }

                        if(this.predictionlist[i].scores.length > 0){
                            this.final_score = this.predictionlist[i].scores[this.predictionlist[i].scores.length - 1].score.home.toString() + ' - ' + this.predictionlist[i].scores[this.predictionlist[i].scores.length - 1].score.away.toString()
                        }

                        for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                            if(this.predictionlist[i].scores[j].elapsedRegularTime <= 45 + half_extra){
                                this.half_time_score = this.predictionlist[i].scores[j].score.home.toString() + ' - ' + this.predictionlist[i].scores[j].score.away.toString()
                            }
                        }

                        for(let p = 1 ;  p <= 45 + half_extra ; p++){
                            this.half_first_Odds[p] = '-'
                            for(let j = 0 ; j < this.predictionlist[i].Odds.length ; j++){
                                if(this.predictionlist[i].Odds[j].elapsedRegularTime <= 45 + half_extra && this.predictionlist[i].Odds[j].timeElapsed === p){
                                    let self = this
                                    let Odd0 =this.predictionlist[i].Odds[j].runners.filter(function(item) {
                                        return item.selectionId == self.selectionId;
                                    });
                                    if(Odd0.length > 0){
                                        if(this.currentLabel.includes('Back')){
                                            if(Odd0[0].exchange.availableToBack){
                                                this.half_first_Odds[p] = Odd0[0].exchange.availableToBack[0].price
                                            }
                                            else{
                                                this.half_first_Odds[p] = 0
                                            }
                                        }
                                        else if(this.currentLabel.includes('Lay')){
                                            if(Odd0[0].exchange.availableToLay){
                                                this.half_first_Odds[p] = Odd0[0].exchange.availableToLay[0].price
                                            }
                                            else{
                                                this.half_first_Odds[p] = 0
                                            }
                                        }
                                    }
                                    else{
                                        this.half_first_Odds[p] = 0
                                    }
                                }
                            }
                        }

                        for(let p = 1 ;  p <= 45 + half_extra ; p++){
                            this.half_first_Scores[p] = '-'
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime <= 45 && this.predictionlist[i].scores[j].timeElapsed === p){
                                    this.half_first_Scores[p] = this.predictionlist[i].scores[j].score.home.toString() + ' - ' + this.predictionlist[i].scores[j].score.away.toString()
                                }
                            }
                        }

                        for(let p = 1 ; p <= 45 + half_extra ; p++){
                            if(this.half_first_Scores[1] == '-'){
                                this.half_first_Scores[1] = '0 - 0'
                            }
                            if(p != 1 && this.half_first_Scores[p] == '-'){
                                this.half_first_Scores[p] = this.half_first_Scores[p - 1]
                            }
                        }
                        let check1 = 0
                        let check2 = 0
                        for(let p = 2 ; p <= 45 + half_extra ; p++){
                            let homeScore1 = this.half_first_Scores[p - 1].split(' - ')[0]
                            let awayScore1 = this.half_first_Scores[p - 1].split(' - ')[1]
                            let homeScore2 = this.half_first_Scores[p].split(' - ')[0]
                            let awayScore2 = this.half_first_Scores[p].split(' - ')[1]
                            if(homeScore1 && awayScore1 && homeScore2 && awayScore2){
                                if(parseInt(homeScore2) < parseInt(homeScore1) || parseInt(awayScore2) < parseInt(awayScore1)){
                                    check2 = p
                                }
                            }
                        }

                        for(let p = 2 ; p <= 45 + half_extra ; p++){
                            let homeScore1 = this.half_first_Scores[p - 1].split(' - ')[0]
                            let awayScore1 = this.half_first_Scores[p - 1].split(' - ')[1]
                            let homeScore2 = this.half_first_Scores[p].split(' - ')[0]
                            let awayScore2 = this.half_first_Scores[p].split(' - ')[1]
                            if(homeScore1 && awayScore1 && homeScore2 && awayScore2){
                                if(parseInt(homeScore2) > parseInt(homeScore1) || parseInt(awayScore2) > parseInt(awayScore1)){
                                    if(p < check2){
                                        check1 = p
                                    }
                                }
                            }
                        }
                        console.log('check1 check 2', check1, check2)
                        for(let p = 0 ;  p < 116 + half_extra + break_time ; p++){
                            this.half_second_Odds[p] = '-'
                            for(let j = 0 ; j < this.predictionlist[i].Odds.length ; j++){
                                if(this.predictionlist[i].Odds[j].elapsedRegularTime >= 45 + half_extra + break_time && this.predictionlist[i].Odds[j].timeElapsed === p){
                                    let self = this
                                    let Odd0 =this.predictionlist[i].Odds[j].runners.filter(function(item) {
                                        return item.selectionId == self.selectionId;
                                    });
                                    let p1 = p - half_extra - break_time
                                    if(Odd0.length > 0){
                                        if(this.currentLabel.includes('Back') && Odd0[0].exchange.availableToBack){
                                            this.half_second_Odds[p1] = Odd0[0].exchange.availableToBack[0].price
                                        }
                                        else if(this.currentLabel.includes('Lay') && Odd0[0].exchange.availableToLay){
                                            this.half_second_Odds[p1] = Odd0[0].exchange.availableToLay[0].price
                                        }
                                    }
                                    else{
                                        this.half_second_Odds[p1] = 0
                                    }
                                }
                            }
                        }

                        for(let p = 0 ;  p < 106 ; p++){
                            this.half_second_Scores[p] = '-'
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime > 45 && this.predictionlist[i].scores[j].timeElapsed === p){
                                    // let p1 = p-1
                                    this.half_second_Scores[p] = this.predictionlist[i].scores[j].score.home.toString() + ' - ' + this.predictionlist[i].scores[j].score.away.toString()
                                }
                            }
                        }

                        for(let p = 46 ; p <= 92 ; p++){
                            if(this.half_second_Scores[46] == '-'){
                                this.half_second_Scores[46] = this.half_second_Scores[p - 1]
                            }
                            if(p != 46 && this.half_second_Scores[p] == '-'){
                                this.half_second_Scores[p] = this.half_second_Scores[p - 1]
                            }
                        }

                        let check3 = 0
                        let check4 = 0
                        for(let p = 45 ; p <= 100 ; p++){
                            let homeScore1 = this.half_second_Scores[p - 1].split(' - ')[0]
                            let awayScore1 = this.half_second_Scores[p - 1].split(' - ')[1]
                            let homeScore2 = this.half_second_Scores[p].split(' - ')[0]
                            let awayScore2 = this.half_second_Scores[p].split(' - ')[1]
                            if(homeScore1 && awayScore1 && homeScore2 && awayScore2){
                                if(parseInt(homeScore2) < parseInt(homeScore1) || parseInt(awayScore2) < parseInt(awayScore1)){
                                    check4 = p
                                }
                            }
                        }

                        for(let p = 45 ; p <= 100 ; p++){
                            let homeScore1 = this.half_second_Scores[p - 1].split(' - ')[0]
                            let awayScore1 = this.half_second_Scores[p - 1].split(' - ')[1]
                            let homeScore2 = this.half_second_Scores[p].split(' - ')[0]
                            let awayScore2 = this.half_second_Scores[p].split(' - ')[1]
                            if(homeScore1 && awayScore1 && homeScore2 && awayScore2){
                                if(parseInt(homeScore2) > parseInt(homeScore1) || parseInt(awayScore2) > parseInt(awayScore1)){
                                    if(p < check4){
                                        check3 = p
                                    }
                                }
                            }
                        }
                        console.log('wrong_score_check2', check3, check4)

                        for(let p = 2 ; p < 45 + half_extra ; p++){
                            this.hf_colorArray[p] = 'rgba(215,243,253,0.68)'
                            let homeScore1 = this.half_first_Scores[p - 1].split(' - ')[0]
                            let awayScore1 = this.half_first_Scores[p - 1].split(' - ')[1]
                            let homeScore2 = this.half_first_Scores[p].split(' - ')[0]
                            let awayScore2 = this.half_first_Scores[p].split(' - ')[1]
                            if(parseInt(homeScore2) > parseInt(homeScore1) || parseInt(awayScore2) > parseInt(awayScore1)){
                                this.hf_colorArray[p] = '#2eb85cad'
                            }
                            if(check1 != 0 && check2 != 0 && p >= check1 && p < check2){
                                this.hf_colorArray[p] = 'rgba(241,196,15,0.68)'
                            }
                        }
                        for(let p = 46 ; p < 105 ; p++){
                            this.hs_colorArray[p] = 'rgba(215,243,253,0.68)'
                            let homeScore1 = this.half_second_Scores[p - 1].split(' - ')[0]
                            let awayScore1 = this.half_second_Scores[p - 1].split(' - ')[1]
                            let homeScore2 = this.half_second_Scores[p].split(' - ')[0]
                            let awayScore2 = this.half_second_Scores[p].split(' - ')[1]
                            if(parseInt(homeScore2) > parseInt(homeScore1) || parseInt(awayScore2) > parseInt(awayScore1)){
                                this.hs_colorArray[p] = '#2eb85cad'
                            }
                            if(check3 != 0 && check4 != 0 && p >= check3 && p < check4){
                                this.hs_colorArray[p] = 'rgba(241,196,15,0.68)'
                            }
                        }
                        if(this.half_second_Scores[46] != this.half_first_Scores[45 + half_extra]){
                            this.hs_colorArray[46] = '#2eb85cad'
                        }

                        // this.first_goal_score = '0 - 0'
                        // this.first_goal_time = 0
                        // for(let p = 2 ; p <= 45 + half_extra ; p++){
                        //     let homeScore1 = this.half_first_Scores[p - 1].split(' - ')[0]
                        //     let awayScore1 = this.half_first_Scores[p - 1].split(' - ')[1]
                        //     let homeScore2 = this.half_first_Scores[p].split(' - ')[0]
                        //     let awayScore2 = this.half_first_Scores[p].split(' - ')[1]
                        //     if(homeScore1 && awayScore1 && homeScore2 && awayScore2 && (p < check1 || p > check2)){
                        //         if(parseInt(homeScore2) > parseInt(homeScore1) || parseInt(awayScore2) > parseInt(awayScore1)){
                        //             if(parseInt(homeScore2) > parseInt(homeScore1)){
                        //                 this.first_goal_score = '1 - 0'
                        //                 this.first_goal_time = p
                        //             }
                        //             else{
                        //                 this.first_goal_score = '0 - 1'
                        //                 this.first_goal_time = p
                        //             }
                        //             break;
                        //         }
                        //     }
                        // }
                        //
                        // for(let p = 47 ; p <= 90 ; p++){
                        //     let homeScore1 = this.half_second_Scores[p - 1].split(' - ')[0]
                        //     let awayScore1 = this.half_second_Scores[p - 1].split(' - ')[1]
                        //     let homeScore2 = this.half_second_Scores[p].split(' - ')[0]
                        //     let awayScore2 = this.half_second_Scores[p].split(' - ')[1]
                        //     if(homeScore1 && awayScore1 && homeScore2 && awayScore2 && (p < check3 || p > check4)){
                        //         if(parseInt(homeScore2) > parseInt(homeScore1) || parseInt(awayScore2) > parseInt(awayScore1)){
                        //             if(parseInt(homeScore2) > parseInt(homeScore1)){
                        //                 this.first_goal_score = '1 - 0'
                        //                 this.first_goal_time = p
                        //             }
                        //             else{
                        //                 this.first_goal_score = '0 - 1'
                        //                 this.first_goal_time = p
                        //             }
                        //         }
                        //     }
                        // }
                    }
                }

                let selected_match = this.currentPrematchOdd
                console.log('selected_matched==>', selected_match)
                let self = this
                let predictions = selected_match.filter(function(item) {
                    return item.selectionId == self.selectionId;
                });
                if(predictions.length > 0){
                    this.odd_back_prematch = predictions[0].exchange.availableToBack[0].price
                    this.odd_lay_prematch = predictions[0].exchange.availableToLay[0].price
                }
            },
            delete_prediction(){
                console.log('current_predictionId===>', this.current_predictionId)
                if(this.current_predictionId === ''){
                    return
                }
                else{
                    window.axios.post(`${process.env.VUE_APP_URL}removePrediction`,[this.current_predictionId]).then(({data})=>{
                        console.log(data.message)
                        if(data.message == "success"){
                            // this.makeToast('success')
                            let self = this
                            let prediction = this.predictionlist.filter(function(item) {
                                return item.value === self.current_predictionId;
                            });
                            let index = this.predictionlist.indexOf(prediction[0]);
                            if (index > -1) {
                                this.predictionlist.splice(index, 1);
                            }
                            alert("sucessfully removed!")
                        }
                        else{
                            // this.makeToast('warning')
                            alert("sorry, something wrong.")
                        }
                    })
                }
            },
            score_prediction(){
                console.log('current_predictionId===>', this.current_predictionId)
                if(this.current_predictionId === ''){
                    return
                }
                else{
                    window.axios.post(`${process.env.VUE_APP_URL}scoreGet_Prediction`,[this.current_predictionId]).then(({data})=>{
                        console.log(data.message)
                        if(data.message == "success"){
                            // this.makeToast('success')
                            let self = this
                            let prediction = this.predictionlist.filter(function(item) {
                                return item.value === self.current_predictionId;
                            });
                            let index = this.predictionlist.indexOf(prediction[0]);
                            if (index > -1) {
                                this.predictionlist.splice(index, 1);
                            }
                            alert("sucessfully got scores!")
                        }
                        else{
                            // this.makeToast('warning')
                            alert("sorry, something wrong.")
                        }
                    })
                }
            },
            home_stats_minute_from(val){
                this.home_stats_filter.minute.from = parseInt(val)
                this.getSearchResult()
            },
            home_stats_minute_to(val){
                this.home_stats_filter.minute.to = parseInt(val)
                this.getSearchResult()
            },
            home_stats_rank_from(val){
                this.home_stats_filter.rank.from = parseInt(val)
                // this.getSearchResult()
            },
            home_stats_rank_to(val){
                this.home_stats_filter.rank.to = parseInt(val)
                // this.getSearchResult()
            },
            home_stats_goal_from(val){
                this.home_stats_filter.goal.from = parseInt(val)
                this.getSearchResult()
            },
            home_stats_goal_to(val){
                this.home_stats_filter.goal.to = parseInt(val)
                this.getSearchResult()
            },
            home_stats_on_from(val){
                this.home_stats_filter.on.from = parseInt(val)
                this.getSearchResult()
                console.log(val)
            },
            home_stats_on_to(val){
                this.home_stats_filter.on.to = parseInt(val)
                this.getSearchResult()
                console.log(val)
            },
            home_stats_off_from(val){
                this.home_stats_filter.off.from = parseInt(val)
                this.getSearchResult()
            },
            home_stats_off_to(val){
                this.home_stats_filter.off.to = parseInt(val)
                this.getSearchResult()
            },
            home_stats_blk_from(val){
                this.home_stats_filter.blk.from = parseInt(val)
                this.getSearchResult()
            },
            home_stats_blk_to(val){
                this.home_stats_filter.blk.to = parseInt(val)
                this.getSearchResult()
            },
            home_stats_in_from(val){
                this.home_stats_filter.in.from = parseInt(val)
                this.getSearchResult()
            },
            home_stats_in_to(val){
                this.home_stats_filter.in.to = parseInt(val)
                this.getSearchResult()
            },
            home_stats_out_from(val){
                this.home_stats_filter.out.from = parseInt(val)
                this.getSearchResult()
            },
            home_stats_out_to(val){
                this.home_stats_filter.out.to = parseInt(val)
                this.getSearchResult()
            },
            home_stats_cnr_from(val){
                this.home_stats_filter.cnr.from = parseInt(val)
                this.getSearchResult()
            },
            home_stats_cnr_to(val){
                this.home_stats_filter.cnr.to = parseInt(val)
                this.getSearchResult()
            },
            home_stats_da_from(val){
                this.home_stats_filter.da.from = parseInt(val)
                this.getSearchResult()
            },
            home_stats_da_to(val){
                this.home_stats_filter.da.to = parseInt(val)
                this.getSearchResult()
            },
            home_stats_pos_from(val){
                this.home_stats_filter.pos.from = parseInt(val)
                this.getSearchResult()
            },
            home_stats_pos_to(val){
                this.home_stats_filter.pos.to = parseInt(val)
                this.getSearchResult()
            },
            home_stats_red_from(val){
                this.home_stats_filter.red.from = parseInt(val)
                console.log(val)
                this.getSearchResult()
            },
            home_stats_red_to(val){
                this.home_stats_filter.red.to = parseInt(val)
                this.getSearchResult()
                console.log(val)
            },
            home_stats_yel_from(val){
                this.home_stats_filter.yel.from = parseInt(val)
                this.getSearchResult()
            },
            home_stats_yel_to(val){
                this.home_stats_filter.yel.to = parseInt(val)
                this.getSearchResult()
            },

            away_stats_minute_from(val){
                this.away_stats_filter.minute.from = parseInt(val)
                this.getSearchResult()
            },
            away_stats_minute_to(val){
                this.away_stats_filter.minute.to = parseInt(val)
                this.getSearchResult()
            },
            away_stats_rank_from(val){
                this.away_stats_filter.rank.from = parseInt(val)
                // this.getSearchResult()
            },
            away_stats_rank_to(val){
                this.away_stats_filter.rank.to = parseInt(val)
                // this.getSearchResult()
            },
            away_stats_goal_from(val){
                this.away_stats_filter.goal.from = parseInt(val)
                this.getSearchResult()
            },
            away_stats_goal_to(val){
                this.away_stats_filter.goal.to = parseInt(val)
                this.getSearchResult()
            },
            away_stats_on_from(val){
                this.away_stats_filter.on.from = parseInt(val)
                this.getSearchResult()
            },
            away_stats_on_to(val){
                this.away_stats_filter.on.to = parseInt(val)
                this.getSearchResult()
            },
            away_stats_off_from(val){
                this.away_stats_filter.off.from = parseInt(val)
                this.getSearchResult()
            },
            away_stats_off_to(val){
                this.away_stats_filter.off.to = parseInt(val)
                this.getSearchResult()
            },
            away_stats_blk_from(val){
                this.away_stats_filter.blk.from = parseInt(val)
                this.getSearchResult()
            },
            away_stats_blk_to(val){
                this.away_stats_filter.blk.to = parseInt(val)
                this.getSearchResult()
            },
            away_stats_in_from(val){
                this.away_stats_filter.in.from = parseInt(val)
                this.getSearchResult()
            },
            away_stats_in_to(val){
                this.away_stats_filter.in.to = parseInt(val)
                this.getSearchResult()
            },
            away_stats_out_from(val){
                this.away_stats_filter.out.from = parseInt(val)
                this.getSearchResult()
            },
            away_stats_out_to(val){
                this.away_stats_filter.out.to = parseInt(val)
                this.getSearchResult()
            },
            away_stats_cnr_from(val){
                this.away_stats_filter.cnr.from = parseInt(val)
                this.getSearchResult()
            },
            away_stats_cnr_to(val){
                this.away_stats_filter.cnr.to = parseInt(val)
                this.getSearchResult()
            },
            away_stats_da_from(val){
                this.away_stats_filter.da.from = parseInt(val)
                this.getSearchResult()
            },
            away_stats_da_to(val){
                this.away_stats_filter.da.to = parseInt(val)
                this.getSearchResult()
            },
            away_stats_pos_from(val){
                this.away_stats_filter.pos.from = parseInt(val)
                this.getSearchResult()
            },
            away_stats_pos_to(val){
                this.away_stats_filter.pos.to = parseInt(val)
                this.getSearchResult()
            },
            away_stats_red_from(val){
                this.away_stats_filter.red.from = parseInt(val)
                console.log(val)
                this.getSearchResult()
            },
            away_stats_red_to(val){
                this.away_stats_filter.red.to = parseInt(val)
                console.log(val)
                this.getSearchResult()
            },
            away_stats_yel_from(val){
                this.away_stats_filter.yel.from = parseInt(val)
                this.getSearchResult()
            },
            away_stats_yel_to(val){
                this.away_stats_filter.yel.to = parseInt(val)
                this.getSearchResult()
            },

            result_score_15_home(val){
                this.result_at_15.home = val
                this.getSearchResult()
            },
            result_score_15_away(val){
                this.result_at_15.away = val
                this.getSearchResult()
            },
            result_score_30_home(val){
                this.result_at_30.home = val
                this.getSearchResult()
            },
            result_score_30_away(val){
                this.result_at_30.away = val
                this.getSearchResult()
            },
            result_score_ht_home(val){
                this.result_at_ht.home = val
                this.getSearchResult()
            },
            result_score_ht_away(val){
                this.result_at_ht.away = val
                this.getSearchResult()
            },
            result_score_60_home(val){
                this.result_at_60.home = val
                this.getSearchResult()
            },
            result_score_60_away(val){
                this.result_at_60.away = val
                this.getSearchResult()
            },
            result_score_70_home(val){
                this.result_at_70.home = val
                this.getSearchResult()
            },
            result_score_70_away(val){
                this.result_at_70.away = val
                this.getSearchResult()
            },
            result_score_ft_home(val){
                this.result_at_ft.home = val
                this.getSearchResult()
            },
            result_score_ft_away(val){
                this.result_at_ft.away = val
                this.getSearchResult()
            },
            odd_min(val){
                this.searchFilter.pre_odd_min = val
                this.getSearchResult()
            },
            odd_max(val){
                this.searchFilter.pre_odd_max =  val
                this.getSearchResult()
            },
            home_odd_min(val){
                this.searchFilter.home_pre_odd_min = parseFloat(val)
                console.log('valid_type=>', this.searchFilter.valid_type)
                console.log('prediction_type=>', this.searchFilter.prediction)
                this.getSearchResult()
            },
            home_odd_max(val){
                this.searchFilter.home_pre_odd_max =  parseFloat(val)
                console.log('valid_type=>', this.searchFilter.valid_type)
                console.log('prediction_type=>', this.searchFilter.prediction)
                this.getSearchResult()
            },
            away_odd_min(val){
                this.searchFilter.away_pre_odd_min = parseFloat(val)
                console.log('valid_type=>', this.searchFilter.valid_type)
                console.log('prediction_type=>', this.searchFilter.prediction)
                this.getSearchResult()
            },
            away_odd_max(val){
                this.searchFilter.away_pre_odd_max = parseFloat(val)
                console.log('valid_type=>', this.searchFilter.valid_type)
                console.log('prediction_type=>', this.searchFilter.prediction)
                this.getSearchResult()
            },
            draw_odd_min(val){
                this.searchFilter.draw_pre_odd_min = parseFloat(val)
                console.log('valid_type=>', this.searchFilter.valid_type)
                console.log('prediction_type=>', this.searchFilter.prediction)
                this.getSearchResult()
            },
            draw_odd_max(val){
                this.searchFilter.draw_pre_odd_max = parseFloat(val)
                console.log('valid_type=>', this.searchFilter.valid_type)
                console.log('prediction_type=>', this.searchFilter.prediction)
                this.getSearchResult()
            },
            matched_min(val){
                this.searchFilter.matched_filter_min = val
                this.getSearchResult()
            },
            week_filter(val){
                this.searchFilter.week = val
                this.getSearchResult()
                console.log(val)
            },
            doubleTip(val){
                this.searchFilter.doubleTip = val
                this.getSearchResult()
                console.log(val)
            },
            duplicated(val){
                this.searchFilter.duplicate =  val
                this.getSearchResult()
                console.log(val)
            }
        },
        created() {
            // this.getTable('- X - Back')
        },
        mounted() {
            this.timer = setInterval(() => {
                this.current_counter = this.current_counter + 5
            }, 2000)
        },
        beforeDestroy() {
            clearInterval(this.timer)
            this.timer = null
        }
    }
</script>
<style>
    .minOdd1 input{
        width: 100%;
    }
    .stats-header{
        display: flex;
        width: 400px;
        border-left: 1px solid lightgrey;
    }
    .stats-header .stats-header-detail{
        flex: 1;
        background: #8db4e2;
        text-align: center;
        border-left: 1px solid lightgrey;
    }
    .stats-content{
        display: flex;
        width: 400px;
        border-left: 1px solid lightgrey;
    }
    .stats-content .stats-header-detail{
        flex: 1;
        text-align: center;
        border: 1px solid lightgrey;
        border-top: none;
        border-left: none;
    }
    .prediction-delete-button{
        height: 30px;
        padding: 0px 15px;
        margin-left: 30px;
    }
    .predictions-stats-container{
        padding: 20px;
        background: white;
        min-width: 1800px;
    }
    .fromdate, .todate{
        float: left;
        width: 108px;
        margin-top: -4px;
        margin-left: 5px;
    }
    .leaguelist{
        float: left;
        width: 265px;
        margin-top: -4px;
        margin-left: 65px;
    }
    .matchlist{
        float: left;
        width: 400px;
        margin-top: -1px;
        margin-left: 15px;
    }
    .predictionlist{
        float: left;
        width: 210px;
        margin-top: -4px;
        margin-left: 65px;
    }
    .minOdd input, .maxOdd input{
        width: 80px;
        float: left;
    }
    .predictions-stats-container select{
        height: 25px;
        padding: 0;
        padding-left: 10px;
        border-radius: 0!important;
    }
    .predictions-stats-container input[type='number']{
        height: 25px;
        padding: 0;
        padding-left: 10px;
        border-radius: 0!important;
    }
    .predictions-stats-container label{
        color: red;
    }
    .checkbox{

    }
    .score_stats p{
        padding-top: 3px;
        padding-bottom: 3px;
    }
    .totalMatches p{
        margin-bottom: 1px;
        border-left: 1px solid white;
    }
    .totalMatches .header{
        background: rgba(193, 176, 215, 0.75);
        border-left: 1px solid white;
    }
    .totalMatches .header1{
        background: rgba(193, 176, 215, 0.75);
        border-left: 1px solid white;
        border-top: 1px solid white;
    }
    .totalMatches .value{
        background: #b7eafc;
        border-left: 1px solid white;
    }
    .totalMatches .value1{
        background: rgba(183, 234, 252, 0.56);
        border-left: 1px solid white;
        border-top: 1px solid white;
    }
    .totalMatches .percent{
        background: #b7eafc;
    }
    .progressBar{
        width: 100%;
        height: 10px;
    }
    .value div{
        margin:0;
    }
    @media screen and (max-width: 600px) {

    }
</style>
