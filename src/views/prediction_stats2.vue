<template>
    <div class="predictions-stats-container">
        <!--        <div v-if="!isload">-->
        <!--            <CProgressBar-->
        <!--                class="progressBar"-->
        <!--                indeterminate-->
        <!--                :value="counter*(current_counter/10)"-->
        <!--                animated-->
        <!--                :max = 10-->
        <!--                color="warning"-->
        <!--            />-->
        <!--        </div>-->
        <CRow>
            <CCol lg="6" style="height: 650px; width: 50%!important; background: white; padding: 40px; padding-top: 20px;">
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
                        <div style="width: 100%; float:left; margin-top: 30px;">
                            <label>Total database:</label><span style="margin-left: 50px; font-weight: 600;">{{this.total_db}}</span>
                        </div>
                        <div style="width: 100%; float:left; margin-top: 5px;">
                            <label>Matches found:</label><span style="margin-left: 50px; font-weight: 600;">{{this.matches_found}}</span>
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
                    </CCol>
                </CRow>
                <div style="width: 100%;">
                    <label>Total Matches:</label>
                </div>
                <div class="totalMatches" style="display: flex; font-weight: 600; font-size: 12px;">
                    <div  style="flex: 1; text-align: center;">
                        <p class="header">X Lay</p>
                        <p class="value">{{this.total_matches_number.xLay}}</p>
                        <p v-if="this.db_matches_number.xLay != 0" class="percent">{{(this.total_matches_number.xLay/this.matches_found*100).toFixed(2)}}%</p>
                        <p v-else class="percent">0.00%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">X Back</p>
                        <p class="value">{{this.total_matches_number.xBack}}</p>
                        <p v-if="this.db_matches_number.xBack != 0" class="percent">{{(this.total_matches_number.xBack/this.matches_found*100).toFixed(2)}}%</p>
                        <p v-else class="percent">0.00%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">1 Lay</p>
                        <p class="value">{{this.total_matches_number.Lay1}}</p>
                        <p v-if="this.db_matches_number.Lay1 != 0" class="percent">{{(this.total_matches_number.Lay1/this.matches_found*100).toFixed(2)}}%</p>
                        <p v-else class="percent">0.00%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">2 Lay</p>
                        <p class="value">{{this.total_matches_number.Lay2}}</p>
                        <p v-if="this.db_matches_number.Lay2 != 0" class="percent">{{(this.total_matches_number.Lay2/this.matches_found*100).toFixed(2)}}%</p>
                        <p v-else class="percent">0.00%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">O 2.5 Back</p>
                        <p class="value">{{this.total_matches_number.o25Back}}</p>
                        <p v-if="this.db_matches_number.o25Back != 0" class="percent">{{(this.total_matches_number.o25Back/this.matches_found*100).toFixed(2)}}%</p>
                        <p v-else class="percent">0.00%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">O 1.5 Back</p>
                        <p class="value">{{this.total_matches_number.o15Back}}</p>
                        <p v-if="this.db_matches_number.o15Back != 0" class="percent">{{(this.total_matches_number.o15Back/this.matches_found*100).toFixed(2)}}%</p>
                        <p v-else class="percent">0.00%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">O 0.5 Back</p>
                        <p class="value">{{this.total_matches_number.o05Back}}</p>
                        <p v-if="this.db_matches_number.o05Back != 0" class="percent">{{(this.total_matches_number.o05Back/this.matches_found*100).toFixed(2)}}%</p>
                        <p v-else class="percent">0.00%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">U 3.5 Back</p>
                        <p class="value">{{this.total_matches_number.u35Back}}</p>
                        <p v-if="this.db_matches_number.u35Back != 0" class="percent">{{(this.total_matches_number.u35Back/this.matches_found*100).toFixed(2)}}%</p>
                        <p v-else class="percent">0.00%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">U 2.5 Back</p>
                        <p class="value">{{this.total_matches_number.u25Back}}</p>
                        <p v-if="this.db_matches_number.u25Back != 0" class="percent">{{(this.total_matches_number.u25Back/this.matches_found*100).toFixed(2)}}%</p>
                        <p v-else class="percent">0.00%</p>
                    </div>
                </div>
                <div style="width: 100%;">
                    <label>Total opportunity matches:</label>
                </div>
                <div class="totalMatches" style="display: flex; font-weight: 600; font-size: 12px;">
                    <div  style="flex: 1; text-align: center;">
                        <p class="header">X Lay</p>
                        <p class="value">0</p>
                        <p class="percent">33.33%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">X Back</p>
                        <p class="value">0</p>
                        <p class="percent">33.33%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">1 Lay</p>
                        <p class="value">0</p>
                        <p class="percent">33.33%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">2 Lay</p>
                        <p class="value">0</p>
                        <p class="percent">33.33%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">O 2.5 Back</p>
                        <p class="value">0</p>
                        <p class="percent">33.33%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">O 1.5 Back</p>
                        <p class="value">0</p>
                        <p class="percent">33.33%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">O 0.5 Back</p>
                        <p class="value">0</p>
                        <p class="percent">33.33%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">U 3.5 Back</p>
                        <p class="value">0</p>
                        <p class="percent">33.33%</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">U 2.5 Back</p>
                        <p class="value">0</p>
                        <p class="percent">33.33%</p>
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
                        <p v-else class="value">{{this.score_stats.score0_15.score00}} ({{(this.score_stats.score0_15.score00/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score00 === 0" class="percent">{{this.score_stats.score16_30.score00}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score00}} ({{(this.score_stats.score16_30.score00/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score00 === 0" class="value">{{this.score_stats.score31_45.score00}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score00}} ({{(this.score_stats.score31_45.score00/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score00 === 0" class="percent">{{this.score_stats.score46_60.score00}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score00}} ({{(this.score_stats.score46_60.score00/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score00 === 0" class="value">{{this.score_stats.score61_75.score00}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score00}} ({{(this.score_stats.score61_75.score00/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score00 === 0" class="percent">{{this.score_stats.score76_90.score00}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score00}} ({{(this.score_stats.score76_90.score00/this.matches_found*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">1 - 1</p>
                        <p v-if="this.score_stats.score0_15.score11 === 0" class="value">{{this.score_stats.score0_15.score11}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score11}} ({{(this.score_stats.score0_15.score11/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score11 === 0" class="percent">{{this.score_stats.score16_30.score11}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score11}} ({{(this.score_stats.score16_30.score11/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score11 === 0" class="value">{{this.score_stats.score31_45.score11}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score11}} ({{(this.score_stats.score31_45.score11/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score11 === 0" class="percent">{{this.score_stats.score46_60.score11}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score11}} ({{(this.score_stats.score46_60.score11/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score11 === 0" class="value">{{this.score_stats.score61_75.score11}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score11}} ({{(this.score_stats.score61_75.score11/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score11 === 0" class="percent">{{this.score_stats.score76_90.score11}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score11}} ({{(this.score_stats.score76_90.score11/this.matches_found*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">2 - 2</p>
                        <p v-if="this.score_stats.score0_15.score22 === 0" class="value">{{this.score_stats.score0_15.score22}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score22}} ({{(this.score_stats.score0_15.score22/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score22 === 0" class="percent">{{this.score_stats.score16_30.score22}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score22}} ({{(this.score_stats.score16_30.score22/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score22 === 0" class="value">{{this.score_stats.score31_45.score22}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score22}} ({{(this.score_stats.score31_45.score22/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score22 === 0" class="percent">{{this.score_stats.score46_60.score22}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score22}} ({{(this.score_stats.score46_60.score22/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score22 === 0" class="value">{{this.score_stats.score61_75.score22}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score22}} ({{(this.score_stats.score61_75.score22/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score22 === 0" class="percent">{{this.score_stats.score76_90.score22}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score22}} ({{(this.score_stats.score76_90.score22/this.matches_found*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">1 - 0</p>
                        <p v-if="this.score_stats.score0_15.score10 === 0" class="value">{{this.score_stats.score0_15.score10}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score10}} ({{(this.score_stats.score0_15.score10/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score10 === 0" class="percent">{{this.score_stats.score16_30.score10}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score10}} ({{(this.score_stats.score16_30.score10/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score10 === 0" class="value">{{this.score_stats.score31_45.score10}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score10}} ({{(this.score_stats.score31_45.score10/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score10 === 0" class="percent">{{this.score_stats.score46_60.score10}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score10}} ({{(this.score_stats.score46_60.score10/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score10 === 0" class="value">{{this.score_stats.score61_75.score10}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score10}} ({{(this.score_stats.score61_75.score10/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score10 === 0" class="percent">{{this.score_stats.score76_90.score10}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score10}} ({{(this.score_stats.score76_90.score10/this.matches_found*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">2 - 0</p>
                        <p v-if="this.score_stats.score0_15.score20 === 0" class="value">{{this.score_stats.score0_15.score20}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score20}} ({{(this.score_stats.score0_15.score20/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score20 === 0" class="percent">{{this.score_stats.score16_30.score20}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score20}} ({{(this.score_stats.score16_30.score20/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score20 === 0" class="value">{{this.score_stats.score31_45.score20}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score20}} ({{(this.score_stats.score31_45.score20/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score20 === 0" class="percent">{{this.score_stats.score46_60.score20}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score20}} ({{(this.score_stats.score46_60.score20/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score20 === 0" class="value">{{this.score_stats.score61_75.score20}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score20}} ({{(this.score_stats.score61_75.score20/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score20 === 0" class="percent">{{this.score_stats.score76_90.score20}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score20}} ({{(this.score_stats.score76_90.score20/this.matches_found*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">2 - 1</p>
                        <p v-if="this.score_stats.score0_15.score21 === 0" class="value">{{this.score_stats.score0_15.score21}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score21}} ({{(this.score_stats.score0_15.score21/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score21 === 0" class="percent">{{this.score_stats.score16_30.score21}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score21}} ({{(this.score_stats.score16_30.score21/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score21 === 0" class="value">{{this.score_stats.score31_45.score21}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score21}} ({{(this.score_stats.score31_45.score21/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score21 === 0" class="percent">{{this.score_stats.score46_60.score21}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score21}} ({{(this.score_stats.score46_60.score21/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score21 === 0" class="value">{{this.score_stats.score61_75.score21}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score21}} ({{(this.score_stats.score61_75.score21/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score21 === 0" class="percent">{{this.score_stats.score76_90.score21}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score21}} ({{(this.score_stats.score76_90.score21/this.matches_found*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">3 - 1</p>
                        <p v-if="this.score_stats.score0_15.score31 === 0" class="value">{{this.score_stats.score0_15.score31}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score31}} ({{(this.score_stats.score0_15.score31/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score31 === 0" class="percent">{{this.score_stats.score16_30.score31}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score31}} ({{(this.score_stats.score16_30.score31/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score31 === 0" class="value">{{this.score_stats.score31_45.score31}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score31}} ({{(this.score_stats.score31_45.score31/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score31 === 0" class="percent">{{this.score_stats.score46_60.score31}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score31}} ({{(this.score_stats.score46_60.score31/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score31 === 0" class="value">{{this.score_stats.score61_75.score31}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score31}} ({{(this.score_stats.score61_75.score31/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score31 === 0" class="percent">{{this.score_stats.score76_90.score31}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score31}} ({{(this.score_stats.score76_90.score31/this.matches_found*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">0 - 1</p>
                        <p v-if="this.score_stats.score0_15.score01 === 0" class="value">{{this.score_stats.score0_15.score01}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score01}} ({{(this.score_stats.score0_15.score01/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score01 === 0" class="percent">{{this.score_stats.score16_30.score01}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score01}} ({{(this.score_stats.score16_30.score01/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score01 === 0" class="value">{{this.score_stats.score31_45.score01}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score01}} ({{(this.score_stats.score31_45.score01/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score01 === 0" class="percent">{{this.score_stats.score46_60.score01}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score01}} ({{(this.score_stats.score46_60.score01/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score01 === 0" class="value">{{this.score_stats.score61_75.score01}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score01}} ({{(this.score_stats.score61_75.score01/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score01 === 0" class="percent">{{this.score_stats.score76_90.score01}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score01}} ({{(this.score_stats.score76_90.score01/this.matches_found*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">0 - 2</p>
                        <p v-if="this.score_stats.score0_15.score02 === 0" class="value">{{this.score_stats.score0_15.score02}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score02}} ({{(this.score_stats.score0_15.score02/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score02 === 0" class="percent">{{this.score_stats.score16_30.score02}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score02}} ({{(this.score_stats.score16_30.score02/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score02 === 0" class="value">{{this.score_stats.score31_45.score02}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score02}} ({{(this.score_stats.score31_45.score02/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score02 === 0" class="percent">{{this.score_stats.score46_60.score02}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score02}} ({{(this.score_stats.score46_60.score02/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score02 === 0" class="value">{{this.score_stats.score61_75.score02}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score02}} ({{(this.score_stats.score61_75.score02/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score02 === 0" class="percent">{{this.score_stats.score76_90.score02}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score02}} ({{(this.score_stats.score76_90.score02/this.matches_found*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">1 - 2</p>
                        <p v-if="this.score_stats.score0_15.score12 === 0" class="value">{{this.score_stats.score0_15.score12}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score12}} ({{(this.score_stats.score0_15.score12/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score12 === 0" class="percent">{{this.score_stats.score16_30.score12}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score12}} ({{(this.score_stats.score16_30.score12/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score12 === 0" class="value">{{this.score_stats.score31_45.score12}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score12}} ({{(this.score_stats.score31_45.score12/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score12 === 0" class="percent">{{this.score_stats.score46_60.score12}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score12}} ({{(this.score_stats.score46_60.score12/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score12 === 0" class="value">{{this.score_stats.score61_75.score12}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score12}} ({{(this.score_stats.score61_75.score12/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score12 === 0" class="percent">{{this.score_stats.score76_90.score12}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score12}} ({{(this.score_stats.score76_90.score12/this.matches_found*100).toFixed(0)}}%)</p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <p class="header">1 - 3</p>
                        <p v-if="this.score_stats.score0_15.score13 === 0" class="value">{{this.score_stats.score0_15.score13}}</p>
                        <p v-else class="value">{{this.score_stats.score0_15.score13}} ({{(this.score_stats.score0_15.score13/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score16_30.score13 === 0" class="percent">{{this.score_stats.score16_30.score13}}</p>
                        <p v-else class="value">{{this.score_stats.score16_30.score13}} ({{(this.score_stats.score16_30.score13/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score31_45.score13 === 0" class="value">{{this.score_stats.score31_45.score13}}</p>
                        <p v-else class="value">{{this.score_stats.score31_45.score13}} ({{(this.score_stats.score31_45.score13/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score46_60.score13 === 0" class="percent">{{this.score_stats.score46_60.score13}}</p>
                        <p v-else class="value">{{this.score_stats.score46_60.score13}} ({{(this.score_stats.score46_60.score13/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score61_75.score13 === 0" class="value">{{this.score_stats.score61_75.score13}}</p>
                        <p v-else class="value">{{this.score_stats.score61_75.score13}} ({{(this.score_stats.score61_75.score13/this.matches_found*100).toFixed(0)}}%)</p>
                        <p v-if="this.score_stats.score76_90.score13 === 0" class="percent">{{this.score_stats.score76_90.score13}}</p>
                        <p v-else class="value">{{this.score_stats.score76_90.score13}} ({{(this.score_stats.score76_90.score13/this.matches_found*100).toFixed(0)}}%)</p>
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
                <div style="width: 100%;">
                    <label style="margin-top: 20px;">Selected Match Stats:</label>
                </div>
                <div style="text-align: center;">
                    <div style="display: flex; width: 100%;">
                        <div style="flex: 1; text-align: left;">
                            Risk:
                        </div>
                        <div style="flex: 1; background: #92d050">
                            Easy
                        </div>
                        <div style="flex: 1; background: #ffff00">
                            Medium
                        </div>
                        <div style="flex: 1; background: #fd4016">
                            Hard
                        </div>
                    </div>
                    <div style="display: flex; width: 100%;">
                        <div style="flex: 1; text-align: left;">
                            Profit%:
                        </div>
                        <div style="flex: 1;">
                            31.00
                        </div>
                        <div style="flex: 1;">
                            56.00
                        </div>
                        <div style="flex: 1;">
                            -40.00
                        </div>
                    </div>
                    <div style="display: flex; width: 100%;">
                        <div style="flex: 1; text-align: left;">
                            Cashout minute:
                        </div>
                        <div style="flex: 1;">
                            35
                        </div>
                        <div style="flex: 1;">
                            60
                        </div>
                        <div style="flex: 1;">
                            72
                        </div>
                    </div>
                    <div style="display: flex; width: 100%;">
                        <div style="flex: 1; text-align: left;">
                            Cash Out Odds:
                        </div>
                        <div style="flex: 1;">
                            4.60
                        </div>
                        <div style="flex: 1;">
                            5.80
                        </div>
                        <div style="flex: 1;">
                            1.80
                        </div>
                    </div>
                    <div style="display: flex; width: 100%;">
                        <div style="flex: 1; text-align: left;">
                            Score:
                        </div>
                        <div style="flex: 1;">
                            0 - 1
                        </div>
                        <div style="flex: 1;">
                            0 - 1
                        </div>
                        <div style="flex: 1;">
                            1 - 1
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
                                {{half_first_Odds[80]}}
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
            <CCol lg="7" style="height: 600px;">

            </CCol>
            <CCol lg="5" style="height: 300px;">

            </CCol>
            <!--            <CCol lg="6" style="height: 300px; background: #8583ff;">-->

            <!--            </CCol>-->
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
        data () {
            return {
                datelist1:[],
                datelist2:[],
                leaguelist:[{'value': 0, 'label': 'All'}],
                predictionlist:[{'value': 1, 'label': 'Select Prediction', 'marketType': ''}],
                gameList:[
                    // { value: '0', label: 'All' },
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
                    'prediction':'0',
                    'pre_odd_min':0,
                    'pre_odd_max':100000,
                    'matched_filter_min':0,
                    'week': false,
                    'doubleTip': false,
                    'duplicate':false
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
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score12':0,
                        'score13':0
                    },
                    score16_30:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score12':0,
                        'score13':0
                    },
                    score31_45:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score12':0,
                        'score13':0
                    },
                    score46_60:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score12':0,
                        'score13':0
                    },
                    score61_75:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score12':0,
                        'score13':0
                    },
                    score76_90:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score12':0,
                        'score13':0
                    },
                },
                duplicatedPredictions:[],
                doubleTipPredictions:[],
                currentPrediction:'',
                currentCompetition: '',
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
                current_counter: 7
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
                    for(let i = 0 ; i < data.data[0].length ; i++){
                        this.eventLists2.push(data.data[0][i])
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
                                            if(this.searchFilter.week === true){
                                                if(this.eventLists2[i].week === 1){
                                                    this.predictionlist.push({'league':this.eventLists2[i].league, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                }
                                            }
                                            else{
                                                this.predictionlist.push({'league':this.eventLists2[i].league,'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
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
                                        if(this.searchFilter.week === true){
                                            if(this.eventLists2[i].week === 1){
                                                this.predictionlist.push({'league':this.eventLists2[i].league,'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                            }
                                        }
                                        else{
                                            this.predictionlist.push({'league':this.eventLists2[i].league,'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
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
                                                if(this.searchFilter.week === true){
                                                    if(this.eventLists2[i].week === 1){
                                                        this.predictionlist.push({'league':this.eventLists2[i].league, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                    }
                                                }
                                                else{
                                                    this.predictionlist.push({'league':this.eventLists2[i].league, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
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
                                            if(this.searchFilter.week === true){
                                                if(this.eventLists2[i].week === 1){
                                                    this.predictionlist.push({'league':this.eventLists2[i].league, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                                }
                                            }
                                            else{
                                                this.predictionlist.push({'league':this.eventLists2[i].league, 'pre_MatchOdd': this.eventLists2[i].pre_MatchOdd,'predictionType': this.eventLists2[i].predictionType,"value": this.eventLists2[i].value,'week':this.eventLists2[i].week, 'label': this.eventLists2[i].label, 'marketType': this.eventLists2[i].marketType, 'scores': this.eventLists2[i].scores, 'Odds': this.eventLists2[i].Odds, 'status': this.eventLists2[i].status})
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

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
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score12':0,
                        'score13':0
                    },
                    score16_30:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score12':0,
                        'score13':0
                    },
                    score31_45:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score12':0,
                        'score13':0
                    },
                    score46_60:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score12':0,
                        'score13':0
                    },
                    score61_75:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score12':0,
                        'score13':0
                    },
                    score76_90:{
                        'score00':0,
                        'score11':0,
                        'score22':0,
                        'score10':0,
                        'score20':0,
                        'score21':0,
                        'score31':0,
                        'score01':0,
                        'score02':0,
                        'score12':0,
                        'score13':0
                    },
                }
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
                            'score21_home':'',
                            'score21_away':'',
                            'score31_home':'',
                            'score31_away':'',
                            'score01_home':'',
                            'score01_away':'',
                            'score02_home':'',
                            'score02_away':'',
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
                            'score21_home':'',
                            'score21_away':'',
                            'score31_home':'',
                            'score31_away':'',
                            'score01_home':'',
                            'score01_away':'',
                            'score02_home':'',
                            'score02_away':'',
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
                            'score21_home':'',
                            'score21_away':'',
                            'score31_home':'',
                            'score31_away':'',
                            'score01_home':'',
                            'score01_away':'',
                            'score02_home':'',
                            'score02_away':'',
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
                            'score21_home':'',
                            'score21_away':'',
                            'score31_home':'',
                            'score31_away':'',
                            'score01_home':'',
                            'score01_away':'',
                            'score02_home':'',
                            'score02_away':'',
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
                            'score21_home':'',
                            'score21_away':'',
                            'score31_home':'',
                            'score31_away':'',
                            'score01_home':'',
                            'score01_away':'',
                            'score02_home':'',
                            'score02_away':'',
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
                            'score21_home':'',
                            'score21_away':'',
                            'score31_home':'',
                            'score31_away':'',
                            'score01_home':'',
                            'score01_away':'',
                            'score02_home':'',
                            'score02_away':'',
                            'score12_home':'',
                            'score12_away':'',
                            'score13_home':'',
                            'score13_away':''
                        },
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
                            score_check.score0_15.score21_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score21_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score31_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score31_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score01_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score01_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score02_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score02_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score12_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score12_away = this.predictionlist[i].scores[j].score.away
                            score_check.score0_15.score13_home = this.predictionlist[i].scores[j].score.home
                            score_check.score0_15.score13_away = this.predictionlist[i].scores[j].score.away
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
                            score_check.score16_30.score21_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score21_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score31_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score31_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score01_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score01_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score02_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score02_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score12_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score12_away = this.predictionlist[i].scores[j].score.away
                            score_check.score16_30.score13_home = this.predictionlist[i].scores[j].score.home
                            score_check.score16_30.score13_away = this.predictionlist[i].scores[j].score.away
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
                            score_check.score31_45.score21_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score21_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score31_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score31_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score01_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score01_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score02_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score02_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score12_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score12_away = this.predictionlist[i].scores[j].score.away
                            score_check.score31_45.score13_home = this.predictionlist[i].scores[j].score.home
                            score_check.score31_45.score13_away = this.predictionlist[i].scores[j].score.away
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
                            score_check.score46_60.score21_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score21_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score31_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score31_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score01_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score01_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score02_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score02_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score12_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score12_away = this.predictionlist[i].scores[j].score.away
                            score_check.score46_60.score13_home = this.predictionlist[i].scores[j].score.home
                            score_check.score46_60.score13_away = this.predictionlist[i].scores[j].score.away
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
                            score_check.score61_75.score21_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score21_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score31_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score31_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score01_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score01_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score02_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score02_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score12_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score12_away = this.predictionlist[i].scores[j].score.away
                            score_check.score61_75.score13_home = this.predictionlist[i].scores[j].score.home
                            score_check.score61_75.score13_away = this.predictionlist[i].scores[j].score.away
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
                            score_check.score76_90.score21_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score21_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score31_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score31_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score01_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score01_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score02_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score02_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score12_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score12_away = this.predictionlist[i].scores[j].score.away
                            score_check.score76_90.score13_home = this.predictionlist[i].scores[j].score.home
                            score_check.score76_90.score13_away = this.predictionlist[i].scores[j].score.away
                        }
                    }
                    if(score_check.score0_15.score00_home == "0" && score_check.score0_15.score00_away == "0"){ this.score_stats.score0_15.score00++ }
                    if(score_check.score0_15.score11_home == "1" && score_check.score0_15.score11_away == "1"){ this.score_stats.score0_15.score11++ }
                    if(score_check.score0_15.score22_home == "2" && score_check.score0_15.score22_away == "2"){ this.score_stats.score0_15.score22++ }
                    if(score_check.score0_15.score10_home == "1" && score_check.score0_15.score10_away == "0"){ this.score_stats.score0_15.score10++ }
                    if(score_check.score0_15.score20_home == "2" && score_check.score0_15.score20_away == "0"){ this.score_stats.score0_15.score20++ }
                    if(score_check.score0_15.score21_home == "2" && score_check.score0_15.score21_away == "1"){ this.score_stats.score0_15.score21++ }
                    if(score_check.score0_15.score31_home == "3" && score_check.score0_15.score31_away == "1"){ this.score_stats.score0_15.score31++ }
                    if(score_check.score0_15.score01_home == "0" && score_check.score0_15.score01_away == "1"){ this.score_stats.score0_15.score01++ }
                    if(score_check.score0_15.score02_home == "0" && score_check.score0_15.score02_away == "2"){ this.score_stats.score0_15.score02++ }
                    if(score_check.score0_15.score12_home == "1" && score_check.score0_15.score12_away == "2"){ this.score_stats.score0_15.score12++ }
                    if(score_check.score0_15.score13_home == "1" && score_check.score0_15.score13_away == "3"){ this.score_stats.score0_15.score13++ }

                    if(score_check.score16_30.score00_home == "0" && score_check.score16_30.score00_away == "0"){ this.score_stats.score16_30.score00++ }
                    if(score_check.score16_30.score11_home == "1" && score_check.score16_30.score11_away == "1"){ this.score_stats.score16_30.score11++ }
                    if(score_check.score16_30.score22_home == "2" && score_check.score16_30.score22_away == "2"){ this.score_stats.score16_30.score22++ }
                    if(score_check.score16_30.score10_home == "1" && score_check.score16_30.score10_away == "0"){ this.score_stats.score16_30.score10++ }
                    if(score_check.score16_30.score20_home == "2" && score_check.score16_30.score20_away == "0"){ this.score_stats.score16_30.score20++ }
                    if(score_check.score16_30.score21_home == "2" && score_check.score16_30.score21_away == "1"){ this.score_stats.score16_30.score21++ }
                    if(score_check.score16_30.score31_home == "3" && score_check.score16_30.score31_away == "1"){ this.score_stats.score16_30.score31++ }
                    if(score_check.score16_30.score01_home == "0" && score_check.score16_30.score01_away == "1"){ this.score_stats.score16_30.score01++ }
                    if(score_check.score16_30.score02_home == "0" && score_check.score16_30.score02_away == "2"){ this.score_stats.score16_30.score02++ }
                    if(score_check.score16_30.score12_home == "1" && score_check.score16_30.score12_away == "2"){ this.score_stats.score16_30.score12++ }
                    if(score_check.score16_30.score13_home == "1" && score_check.score16_30.score13_away == "3"){ this.score_stats.score16_30.score13++ }

                    if(score_check.score31_45.score00_home == "0" && score_check.score31_45.score00_away == "0"){ this.score_stats.score31_45.score00++ }
                    if(score_check.score31_45.score11_home == "1" && score_check.score31_45.score11_away == "1"){ this.score_stats.score31_45.score11++ }
                    if(score_check.score31_45.score22_home == "2" && score_check.score31_45.score22_away == "2"){ this.score_stats.score31_45.score22++ }
                    if(score_check.score31_45.score10_home == "1" && score_check.score31_45.score10_away == "0"){ this.score_stats.score31_45.score10++ }
                    if(score_check.score31_45.score20_home == "2" && score_check.score31_45.score20_away == "0"){ this.score_stats.score31_45.score20++ }
                    if(score_check.score31_45.score21_home == "2" && score_check.score31_45.score21_away == "1"){ this.score_stats.score31_45.score21++ }
                    if(score_check.score31_45.score31_home == "3" && score_check.score31_45.score31_away == "1"){ this.score_stats.score31_45.score31++ }
                    if(score_check.score31_45.score01_home == "0" && score_check.score31_45.score01_away == "1"){ this.score_stats.score31_45.score01++ }
                    if(score_check.score31_45.score02_home == "0" && score_check.score31_45.score02_away == "2"){ this.score_stats.score31_45.score02++ }
                    if(score_check.score31_45.score12_home == "1" && score_check.score31_45.score12_away == "2"){ this.score_stats.score31_45.score12++ }
                    if(score_check.score31_45.score13_home == "1" && score_check.score31_45.score13_away == "3"){ this.score_stats.score31_45.score13++ }

                    if(score_check.score46_60.score00_home == "0" && score_check.score46_60.score00_away == "0"){ this.score_stats.score46_60.score00++ }
                    if(score_check.score46_60.score11_home == "1" && score_check.score46_60.score11_away == "1"){ this.score_stats.score46_60.score11++ }
                    if(score_check.score46_60.score22_home == "2" && score_check.score46_60.score22_away == "2"){ this.score_stats.score46_60.score22++ }
                    if(score_check.score46_60.score10_home == "1" && score_check.score46_60.score10_away == "0"){ this.score_stats.score46_60.score10++ }
                    if(score_check.score46_60.score20_home == "2" && score_check.score46_60.score20_away == "0"){ this.score_stats.score46_60.score20++ }
                    if(score_check.score46_60.score21_home == "2" && score_check.score46_60.score21_away == "1"){ this.score_stats.score46_60.score21++ }
                    if(score_check.score46_60.score31_home == "3" && score_check.score46_60.score31_away == "1"){ this.score_stats.score46_60.score31++ }
                    if(score_check.score46_60.score01_home == "0" && score_check.score46_60.score01_away == "1"){ this.score_stats.score46_60.score01++ }
                    if(score_check.score46_60.score02_home == "0" && score_check.score46_60.score02_away == "2"){ this.score_stats.score46_60.score02++ }
                    if(score_check.score46_60.score12_home == "1" && score_check.score46_60.score12_away == "2"){ this.score_stats.score46_60.score12++ }
                    if(score_check.score46_60.score13_home == "1" && score_check.score46_60.score13_away == "3"){ this.score_stats.score46_60.score13++ }

                    if(score_check.score61_75.score00_home == "0" && score_check.score61_75.score00_away == "0"){ this.score_stats.score61_75.score00++ }
                    if(score_check.score61_75.score11_home == "1" && score_check.score61_75.score11_away == "1"){ this.score_stats.score61_75.score11++ }
                    if(score_check.score61_75.score22_home == "2" && score_check.score61_75.score22_away == "2"){ this.score_stats.score61_75.score22++ }
                    if(score_check.score61_75.score10_home == "1" && score_check.score61_75.score10_away == "0"){ this.score_stats.score61_75.score10++ }
                    if(score_check.score61_75.score20_home == "2" && score_check.score61_75.score20_away == "0"){ this.score_stats.score61_75.score20++ }
                    if(score_check.score61_75.score21_home == "2" && score_check.score61_75.score21_away == "1"){ this.score_stats.score61_75.score21++ }
                    if(score_check.score61_75.score31_home == "3" && score_check.score61_75.score31_away == "1"){ this.score_stats.score61_75.score31++ }
                    if(score_check.score61_75.score01_home == "0" && score_check.score61_75.score01_away == "1"){ this.score_stats.score61_75.score01++ }
                    if(score_check.score61_75.score02_home == "0" && score_check.score61_75.score02_away == "2"){ this.score_stats.score61_75.score02++ }
                    if(score_check.score61_75.score12_home == "1" && score_check.score61_75.score12_away == "2"){ this.score_stats.score61_75.score12++ }
                    if(score_check.score61_75.score13_home == "1" && score_check.score61_75.score13_away == "3"){ this.score_stats.score61_75.score13++ }

                    if(score_check.score76_90.score00_home == "0" && score_check.score76_90.score00_away == "0"){ this.score_stats.score76_90.score00++ }
                    if(score_check.score76_90.score11_home == "1" && score_check.score76_90.score11_away == "1"){ this.score_stats.score76_90.score11++ }
                    if(score_check.score76_90.score22_home == "2" && score_check.score76_90.score22_away == "2"){ this.score_stats.score76_90.score22++ }
                    if(score_check.score76_90.score10_home == "1" && score_check.score76_90.score10_away == "0"){ this.score_stats.score76_90.score10++ }
                    if(score_check.score76_90.score20_home == "2" && score_check.score76_90.score20_away == "0"){ this.score_stats.score76_90.score20++ }
                    if(score_check.score76_90.score21_home == "2" && score_check.score76_90.score21_away == "1"){ this.score_stats.score76_90.score21++ }
                    if(score_check.score76_90.score31_home == "3" && score_check.score76_90.score31_away == "1"){ this.score_stats.score76_90.score31++ }
                    if(score_check.score76_90.score01_home == "0" && score_check.score76_90.score01_away == "1"){ this.score_stats.score76_90.score01++ }
                    if(score_check.score76_90.score02_home == "0" && score_check.score76_90.score02_away == "2"){ this.score_stats.score76_90.score02++ }
                    if(score_check.score76_90.score12_home == "1" && score_check.score76_90.score12_away == "2"){ this.score_stats.score76_90.score12++ }
                    if(score_check.score76_90.score13_home == "1" && score_check.score76_90.score13_away == "3"){ this.score_stats.score61_75.score13++ }
                }

            },
            set_league(val){
                this.searchFilter.leagues = val
                console.log(this.searchFilter.leagues)
                this.getSearchResult()
            },
            set_game(val){
                // this.key = 0
                this.isload = false
                this.searchFilter.prediction = val
                let predictionType = this.gameList.filter(function(item) {
                    return item.value === val;
                });
                console.log('predictionValue=>', predictionType[0].label)
                this.getTable(predictionType[0].label)
                this.getSearchResult()
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
                this.currentPrediction = val
                this.select_filter()
            },
            select_filter(){
                for(let i = 1 ;  i < this.predictionlist.length; i++){
                    if(this.predictionlist[i].value === this.currentPrediction){
                        console.log(this.predictionlist[i])
                        let self = this
                        let matched =this.eventLists2.filter(function(item) {
                            return item.value === self.currentPrediction
                        });
                        if(matched.length > 0){
                            this.total_matched_money = matched[0].totalMatched
                        }

                        this.currentPrematchOdd = this.predictionlist[i].pre_MatchOdd
                        this.currentCompetition = this.predictionlist[i].league
                        this.currentOdds = this.predictionlist[i].Odds
                        this.currentPredictionType = this.predictionlist[i].predictionType
                        this.currentLabel = this.predictionlist[i].label
                        let pre_value = this.currentPrediction
                        this.selectionId = pre_value.split(',')[1]
                        for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                            if((this.predictionlist[i].scores[j].score.home == 1 && this.predictionlist[i].scores[j].score.away == 0) || (this.predictionlist[i].scores[j].score.home == 0 && this.predictionlist[i].scores[j].score.away == 1)){
                                if(this.predictionlist[i].scores[j].score.home == 1 && this.predictionlist[i].scores[j].score.away == 0){
                                    this.first_goal_score = '1 - 0'
                                }
                                else if(this.predictionlist[i].scores[j].score.home == 0 && this.predictionlist[i].scores[j].score.away == 1){
                                    this.first_goal_score = '0 - 1'
                                }
                                this.first_goal_time = this.predictionlist[i].scores[j].elapsedRegularTime
                                break
                            }
                        }
                        this.final_score = this.predictionlist[i].scores[this.predictionlist[i].scores.length - 1].score.home.toString() + ' - ' + this.predictionlist[i].scores[this.predictionlist[i].scores.length - 1].score.away.toString()

                        for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                            if(this.predictionlist[i].scores[j].elapsedRegularTime <= 45){
                                this.half_time_score = this.predictionlist[i].scores[j].score.home.toString() + ' - ' + this.predictionlist[i].scores[j].score.away.toString()
                            }
                        }

                        for(let p = 1 ;  p <= 50 ; p++){
                            this.half_first_Odds[p] = '-'
                            for(let j = 0 ; j < this.predictionlist[i].Odds.length ; j++){
                                if(this.predictionlist[i].Odds[j].elapsedRegularTime <= 45 && this.predictionlist[i].Odds[j].timeElapsed === p){
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

                        for(let p = 1 ;  p <= 50 ; p++){
                            this.half_first_Scores[p] = '-'
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime <= 45 && this.predictionlist[i].scores[j].timeElapsed === p){
                                    this.half_first_Scores[p] = this.predictionlist[i].scores[j].score.home.toString() + ' - ' + this.predictionlist[i].scores[j].score.away.toString()
                                }
                            }
                        }

                        for(let p = 1 ; p <= 45 ; p++){
                            if(this.half_first_Scores[1] == '-'){
                                this.half_first_Scores[1] = '0 - 0'
                            }
                            if(p != 1 && this.half_first_Scores[p] == '-'){
                                this.half_first_Scores[p] = this.half_first_Scores[p - 1]
                            }
                        }
                        let check1 = 0
                        let check2 = 0
                        for(let p = 2 ; p <= 50 ; p++){
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

                        for(let p = 2 ; p <= 50 ; p++){
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
                        for(let p = 0 ;  p < 106 ; p++){
                            this.half_second_Odds[p] = '-'
                            for(let j = 0 ; j < this.predictionlist[i].Odds.length ; j++){
                                if(this.predictionlist[i].Odds[j].elapsedRegularTime > 45 && this.predictionlist[i].Odds[j].timeElapsed === p){
                                    let self = this
                                    let Odd0 =this.predictionlist[i].Odds[j].runners.filter(function(item) {
                                        return item.selectionId == self.selectionId;
                                    });
                                    if(Odd0.length > 0){
                                        if(this.currentLabel.includes('Back') && Odd0[0].exchange.availableToBack){
                                            this.half_second_Odds[p] = Odd0[0].exchange.availableToBack[0].price
                                        }
                                        else if(this.currentLabel.includes('Lay') && Odd0[0].exchange.availableToLay){
                                            this.half_second_Odds[p] = Odd0[0].exchange.availableToLay[0].price
                                        }
                                    }
                                    else{
                                        this.half_second_Odds[p] = 0
                                    }
                                }
                            }
                        }

                        for(let p = 0 ;  p < 106 ; p++){
                            this.half_second_Scores[p] = '-'
                            for(let j = 0 ; j < this.predictionlist[i].scores.length ; j++){
                                if(this.predictionlist[i].scores[j].elapsedRegularTime > 45 && this.predictionlist[i].scores[j].timeElapsed === p){
                                    this.half_second_Scores[p] = this.predictionlist[i].scores[j].score.home.toString() + ' - ' + this.predictionlist[i].scores[j].score.away.toString()
                                }
                            }
                        }

                        for(let p = 46 ; p <= 92 ; p++){
                            if(this.half_second_Scores[46] == '-'){
                                this.half_second_Scores[46] = '0 - 0'
                            }
                            if(p != 46 && this.half_second_Scores[p] == '-'){
                                this.half_second_Scores[p] = this.half_second_Scores[p - 1]
                            }
                        }

                        let check3 = 0
                        let check4 = 0
                        for(let p = 47 ; p <= 90 ; p++){
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

                        for(let p = 47 ; p <= 90 ; p++){
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

                        for(let p = 1 ; p < 50 ; p++){
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

                        this.first_goal_score = '0 - 0'
                        this.first_goal_time = 0
                        for(let p = 2 ; p <= 50 ; p++){
                            let homeScore1 = this.half_first_Scores[p - 1].split(' - ')[0]
                            let awayScore1 = this.half_first_Scores[p - 1].split(' - ')[1]
                            let homeScore2 = this.half_first_Scores[p].split(' - ')[0]
                            let awayScore2 = this.half_first_Scores[p].split(' - ')[1]
                            if(homeScore1 && awayScore1 && homeScore2 && awayScore2 && (p < check1 || p > check2)){
                                if(parseInt(homeScore2) > parseInt(homeScore1) || parseInt(awayScore2) > parseInt(awayScore1)){
                                    if(parseInt(homeScore2) > parseInt(homeScore1)){
                                        this.first_goal_score = '1 - 0'
                                        this.first_goal_time = p
                                    }
                                    else{
                                        this.first_goal_score = '0 - 1'
                                        this.first_goal_time = p
                                    }
                                    break;
                                }
                            }
                        }

                        for(let p = 47 ; p <= 90 ; p++){
                            let homeScore1 = this.half_second_Scores[p - 1].split(' - ')[0]
                            let awayScore1 = this.half_second_Scores[p - 1].split(' - ')[1]
                            let homeScore2 = this.half_second_Scores[p].split(' - ')[0]
                            let awayScore2 = this.half_second_Scores[p].split(' - ')[1]
                            if(homeScore1 && awayScore1 && homeScore2 && awayScore2 && (p < check3 || p > check4)){
                                if(parseInt(homeScore2) > parseInt(homeScore1) || parseInt(awayScore2) > parseInt(awayScore1)){
                                    if(parseInt(homeScore2) > parseInt(homeScore1)){
                                        this.first_goal_score = '1 - 0'
                                        this.first_goal_time = p
                                    }
                                    else{
                                        this.first_goal_score = '0 - 1'
                                        this.first_goal_time = p
                                    }
                                }
                            }
                        }
                    }
                }

                let selected_match = this.currentPrematchOdd
                let self = this
                let predictions =selected_match.filter(function(item) {
                    return item.selectionId == self.selectionId;
                });
                if(predictions.length > 0){
                    this.odd_back_prematch = predictions[0].exchange.availableToBack[0].price
                    this.odd_lay_prematch = predictions[0].exchange.availableToLay[0].price
                }
            },
            odd_min(val){
                this.searchFilter.pre_odd_min = val
                this.getSearchResult()
            },
            odd_max(val){
                this.searchFilter.pre_odd_max =  val
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
            this.getTable('- X - Back')
        },
        mounted() {

        }
    }
</script>
<style>
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
    @media screen and (max-width: 600px) {

    }
</style>
