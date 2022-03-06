<template>
    <div class="cold-stats-container" style="min-width: 1200px">
        <b-modal id="modal-1"  hide-footer hide-header centered no-close-on-backdrop>
            <b-progress value="100" max="100" animated variant="secondary"></b-progress>
        </b-modal>
<!--        <div v-if="!isload" style="height: 10px;">-->
<!--            <b-progress :value="current_counter" :max="counter" animated></b-progress>-->
<!--        </div>-->
        <CCard body-wrapper>
            <label style="font-weight: 600;">
                League:
            </label>
            <div class="selector">
                <CSelect
                        :options="league_list"
                        @update:value="league_filter"
                >
                </CSelect>
            </div>
            <div v-if="current_league_value != 1000" class="selector">
                <CSelect
                        :options="typeofdata_list"
                        @update:value="typeofdata_filter"
                >
                </CSelect>
            </div>
            <div class="league-table-container">
                <div v-if="full_table.length > 0 && current_type == 1" class="header" style="display: flex">
                    <div style="flex: 3;" class="parent_left">
                        <div style="height: 30px; color: #dff0d8;">
                            ...
                        </div>
                        <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                            # Team
                        </div>
                    </div>
                    <div style="flex: 4;">
                        <div style="height: 30px; text-align: center;">
                            Total
                        </div>
                        <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                            <div style="flex: 1">P</div>
                            <div style="flex: 1">W</div>
                            <div style="flex: 1">D</div>
                            <div style="flex: 1">L</div>
                            <div style="flex: 1">F</div>
                            <div style="flex: 1">A</div>
                        </div>
                    </div>
                    <div style="flex: 4;">
                        <div style="height: 30px; text-align: center;">
                            Home
                        </div>
                        <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                            <div style="flex: 1">P</div>
                            <div style="flex: 1">W</div>
                            <div style="flex: 1">D</div>
                            <div style="flex: 1">L</div>
                            <div style="flex: 1">F</div>
                            <div style="flex: 1">A</div>
                        </div>
                    </div>
                    <div style="flex: 4;">
                        <div style="height: 30px; text-align: center;">
                            Away
                        </div>
                        <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                            <div style="flex: 1">P</div>
                            <div style="flex: 1">W</div>
                            <div style="flex: 1">D</div>
                            <div style="flex: 1">L</div>
                            <div style="flex: 1">F</div>
                            <div style="flex: 1">A</div>
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div style="height: 30px; color: #dff0d8;">
                            ...
                        </div>
                        <div style="height: 30px; display: flex; text-align: center">
                            <div style="flex: 1">GD</div>
                            <div style="flex: 1">Pts</div>
                        </div>
                    </div>
                </div>
                <div v-if="full_table.length > 0 && current_type == 1" v-for="(item, index) in full_table" class="content" style="display: flex">
                    <div style="flex: 3;">
                        <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                            {{index + 1}}. {{item.team_name}}
                        </div>
                    </div>
                    <div style="flex: 4;">
                        <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                            <div style="flex: 1">{{item.total.p}}</div>
                            <div style="flex: 1">{{item.total.w}}</div>
                            <div style="flex: 1">{{item.total.d}}</div>
                            <div style="flex: 1">{{item.total.l}}</div>
                            <div style="flex: 1">{{item.total.f}}</div>
                            <div style="flex: 1">{{item.total.a}}</div>
                        </div>
                    </div>
                    <div style="flex: 4;">
                        <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                            <div style="flex: 1">{{item.home.p}}</div>
                            <div style="flex: 1">{{item.home.w}}</div>
                            <div style="flex: 1">{{item.home.d}}</div>
                            <div style="flex: 1">{{item.home.l}}</div>
                            <div style="flex: 1">{{item.home.f}}</div>
                            <div style="flex: 1">{{item.home.a}}</div>
                        </div>
                    </div>
                    <div style="flex: 4;">
                        <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                            <div style="flex: 1">{{item.away.p}}</div>
                            <div style="flex: 1">{{item.away.w}}</div>
                            <div style="flex: 1">{{item.away.d}}</div>
                            <div style="flex: 1">{{item.away.l}}</div>
                            <div style="flex: 1">{{item.away.f}}</div>
                            <div style="flex: 1">{{item.away.a}}</div>
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div style="height: 30px; display: flex; text-align: center">
                            <div style="flex: 1">{{item.last.d}}</div>
                            <div style="flex: 1">{{item.last.points}}</div>
                        </div>
                    </div>
                </div>
                <div v-if="home_away_table.home.length > 0 && current_type == 2" style="display: flex;">
                    <div style="flex: 1; margin-right: 10px;">
                        <div v-if="home_away_table.home.length > 0 && current_type == 2" class="header" style="display: flex;">
                            <div style="flex: 5;" class="parent_left">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 5;">
                                <div style="height: 30px; text-align: center;">
                                    Home
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">W</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">L</div>
                                    <div style="flex: 1">F</div>
                                    <div style="flex: 1">A</div>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Pts</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="home_away_table.home.length > 0 && current_type == 2" v-for="(item, index) in home_away_table.home" class="content" style="float: left; display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 5;">
                                <div style="flex: 4;">
                                    <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                        <div style="flex: 1">{{item.home.p}}</div>
                                        <div style="flex: 1">{{item.home.w}}</div>
                                        <div style="flex: 1">{{item.d}}</div>
                                        <div style="flex: 1">{{item.home.l}}</div>
                                        <div style="flex: 1">{{item.home.f}}</div>
                                        <div style="flex: 1">{{item.home.a}}</div>
                                    </div>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.last.d}}</div>
                                    <div style="flex: 1">{{item.last.points}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; margin-left: 10px;">
                        <div v-if="home_away_table.away.length > 0 && current_type == 2" class="header" style="display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 5;">
                                <div style="height: 30px; text-align: center;">
                                    Away
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">W</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">L</div>
                                    <div style="flex: 1">F</div>
                                    <div style="flex: 1">A</div>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Pts</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="home_away_table.away.length > 0 && current_type == 2" v-for="(item, index) in home_away_table.away" class="content" style="float: left; display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 5;">
                                <div style="flex: 4;">
                                    <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                        <div style="flex: 1">{{item.away.p}}</div>
                                        <div style="flex: 1">{{item.away.w}}</div>
                                        <div style="flex: 1">{{item.d}}</div>
                                        <div style="flex: 1">{{item.away.l}}</div>
                                        <div style="flex: 1">{{item.away.f}}</div>
                                        <div style="flex: 1">{{item.away.a}}</div>
                                    </div>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.last.d}}</div>
                                    <div style="flex: 1">{{item.last.points}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="first_half.home.length > 0 && current_type == 3" style="display: flex;">
                    <div style="flex: 1; margin-right: 10px;">
                        <div v-if="first_half.home.length > 0 && current_type == 3" class="header" style="display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 5;">
                                <div style="height: 30px; text-align: center;">
                                    Home
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">W</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">L</div>
                                    <div style="flex: 1">F</div>
                                    <div style="flex: 1">A</div>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Pts</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="first_half.home.length > 0 && current_type == 3" v-for="(item, index) in first_half.home" class="content" style="float: left; display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 5;">
                                <div style="flex: 4;">
                                    <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                        <div style="flex: 1">{{item.home.p}}</div>
                                        <div style="flex: 1">{{item.home.w}}</div>
                                        <div style="flex: 1">{{item.d}}</div>
                                        <div style="flex: 1">{{item.home.l}}</div>
                                        <div style="flex: 1">{{item.home.f}}</div>
                                        <div style="flex: 1">{{item.home.a}}</div>
                                    </div>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.last.d}}</div>
                                    <div style="flex: 1">{{item.last.points}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; margin-left: 10px;">
                        <div v-if="first_half.away.length > 0 && current_type == 3" class="header" style="display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 5;">
                                <div style="height: 30px; text-align: center;">
                                    Away
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">W</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">L</div>
                                    <div style="flex: 1">F</div>
                                    <div style="flex: 1">A</div>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Pts</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="first_half.away.length > 0 && current_type == 3" v-for="(item, index) in first_half.away" class="content" style="float: left; display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 5;">
                                <div style="flex: 4;">
                                    <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                        <div style="flex: 1">{{item.away.p}}</div>
                                        <div style="flex: 1">{{item.away.w}}</div>
                                        <div style="flex: 1">{{item.d}}</div>
                                        <div style="flex: 1">{{item.away.l}}</div>
                                        <div style="flex: 1">{{item.away.f}}</div>
                                        <div style="flex: 1">{{item.away.a}}</div>
                                    </div>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.last.d}}</div>
                                    <div style="flex: 1">{{item.last.points}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="second_half.home.length > 0 && current_type == 4" style="display: flex;">
                    <div style="flex: 1; margin-right: 10px;">
                        <div v-if="second_half.home.length > 0 && current_type == 4" class="header" style="display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 5;">
                                <div style="height: 30px; text-align: center;">
                                    Home
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">W</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">L</div>
                                    <div style="flex: 1">F</div>
                                    <div style="flex: 1">A</div>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Pts</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="second_half.home.length > 0 && current_type == 4" v-for="(item, index) in second_half.home" class="content" style="float: left; display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 5;">
                                <div style="flex: 4;">
                                    <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                        <div style="flex: 1">{{item.home.p}}</div>
                                        <div style="flex: 1">{{item.home.w}}</div>
                                        <div style="flex: 1">{{item.d}}</div>
                                        <div style="flex: 1">{{item.home.l}}</div>
                                        <div style="flex: 1">{{item.home.f}}</div>
                                        <div style="flex: 1">{{item.home.a}}</div>
                                    </div>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.last.d}}</div>
                                    <div style="flex: 1">{{item.last.points}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; margin-left: 10px;">
                        <div v-if="second_half.away.length > 0 && current_type == 4" class="header" style="display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 5;">
                                <div style="height: 30px; text-align: center;">
                                    Away
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">W</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">L</div>
                                    <div style="flex: 1">F</div>
                                    <div style="flex: 1">A</div>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Pts</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="second_half.away.length > 0 && current_type == 4" v-for="(item, index) in second_half.away" class="content" style="float: left; display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 5;">
                                <div style="flex: 4;">
                                    <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                        <div style="flex: 1">{{item.away.p}}</div>
                                        <div style="flex: 1">{{item.away.w}}</div>
                                        <div style="flex: 1">{{item.d}}</div>
                                        <div style="flex: 1">{{item.away.l}}</div>
                                        <div style="flex: 1">{{item.away.f}}</div>
                                        <div style="flex: 1">{{item.away.a}}</div>
                                    </div>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.last.d}}</div>
                                    <div style="flex: 1">{{item.last.points}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="overall.home.length > 0 && current_type == 5" style="display: flex;">
                    <div style="flex: 1; margin-right: 10px;">
                        <div v-if="overall.home.length > 0 && current_type == 5" class="header" style="display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 7;">
                                <div style="height: 30px; text-align: center;">
                                    Last 6 matches (overall)
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">W</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">L</div>
                                    <div style="flex: 1">F</div>
                                    <div style="flex: 1">A</div>
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Points</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="overall.home.length > 0 && current_type == 5" v-for="(item, index) in overall.home" class="content" style="float: left; display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 7;">
                                <div style="flex: 4;">
                                    <div style="height: 30px; display: flex; text-align: center">
                                        <div style="flex: 1">{{item.home.p}}</div>
                                        <div style="flex: 1">{{item.home.w}}</div>
                                        <div style="flex: 1">{{item.d}}</div>
                                        <div style="flex: 1">{{item.home.l}}</div>
                                        <div style="flex: 1">{{item.home.f}}</div>
                                        <div style="flex: 1">{{item.home.a}}</div>
                                        <div style="flex: 1">{{item.gd}}</div>
                                        <div style="flex: 1">{{item.points}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; margin-left: 10px;">
                        <div v-if="overall.away.length > 0 && current_type == 5" class="header" style="display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 7;">
                                <div style="height: 30px; text-align: center;">
                                    Last 12 matches (overall)
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">W</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">L</div>
                                    <div style="flex: 1">F</div>
                                    <div style="flex: 1">A</div>
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Points</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="overall.away.length > 0 && current_type == 5" v-for="(item, index) in overall.away" class="content" style="float: left; display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 7;">
                                <div style="flex: 4;">
                                    <div style="height: 30px; display: flex; text-align: center">
                                        <div style="flex: 1">{{item.away.p}}</div>
                                        <div style="flex: 1">{{item.away.w}}</div>
                                        <div style="flex: 1">{{item.d}}</div>
                                        <div style="flex: 1">{{item.away.l}}</div>
                                        <div style="flex: 1">{{item.away.f}}</div>
                                        <div style="flex: 1">{{item.away.a}}</div>
                                        <div style="flex: 1">{{item.gd}}</div>
                                        <div style="flex: 1">{{item.points}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="form_3_matches.home.length > 0 && current_type == 6" style="display: flex;">
                    <div style="flex: 1; margin-right: 10px;">
                        <div v-if="form_3_matches.home.length > 0 && current_type == 6" class="header" style="display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 7;">
                                <div style="height: 30px; text-align: center;">
                                    Home
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">W</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">L</div>
                                    <div style="flex: 1">F</div>
                                    <div style="flex: 1">A</div>
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Points</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="form_3_matches.home.length > 0 && current_type == 6" v-for="(item, index) in form_3_matches.home" class="content" style="float: left; display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 7;">
                                <div style="flex: 4;">
                                    <div style="height: 30px; display: flex; text-align: center">
                                        <div style="flex: 1">{{item.home.p}}</div>
                                        <div style="flex: 1">{{item.home.w}}</div>
                                        <div style="flex: 1">{{item.d}}</div>
                                        <div style="flex: 1">{{item.home.l}}</div>
                                        <div style="flex: 1">{{item.home.f}}</div>
                                        <div style="flex: 1">{{item.home.a}}</div>
                                        <div style="flex: 1">{{item.gd}}</div>
                                        <div style="flex: 1">{{item.points}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; margin-left: 10px;">
                        <div v-if="form_3_matches.away.length > 0 && current_type == 6" class="header" style="display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 7;">
                                <div style="height: 30px; text-align: center;">
                                    Away
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">W</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">L</div>
                                    <div style="flex: 1">F</div>
                                    <div style="flex: 1">A</div>
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Points</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="form_3_matches.away.length > 0 && current_type == 6" v-for="(item, index) in form_3_matches.away" class="content" style="float: left; display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 7;">
                                <div style="flex: 4;">
                                    <div style="height: 30px; display: flex; text-align: center">
                                        <div style="flex: 1">{{item.away.p}}</div>
                                        <div style="flex: 1">{{item.away.w}}</div>
                                        <div style="flex: 1">{{item.d}}</div>
                                        <div style="flex: 1">{{item.away.l}}</div>
                                        <div style="flex: 1">{{item.away.f}}</div>
                                        <div style="flex: 1">{{item.away.a}}</div>
                                        <div style="flex: 1">{{item.gd}}</div>
                                        <div style="flex: 1">{{item.points}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="form_6_matches.home.length > 0 && current_type == 7" style="display: flex;">
                    <div style="flex: 1; margin-right: 10px;">
                        <div v-if="form_6_matches.home.length > 0 && current_type == 7" class="header" style="display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 7;">
                                <div style="height: 30px; text-align: center;">
                                    Home
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">W</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">L</div>
                                    <div style="flex: 1">F</div>
                                    <div style="flex: 1">A</div>
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Points</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="form_6_matches.home.length > 0 && current_type == 7" v-for="(item, index) in form_6_matches.home" class="content" style="float: left; display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 7;">
                                <div style="flex: 4;">
                                    <div style="height: 30px; display: flex; text-align: center">
                                        <div style="flex: 1">{{item.home.p}}</div>
                                        <div style="flex: 1">{{item.home.w}}</div>
                                        <div style="flex: 1">{{item.d}}</div>
                                        <div style="flex: 1">{{item.home.l}}</div>
                                        <div style="flex: 1">{{item.home.f}}</div>
                                        <div style="flex: 1">{{item.home.a}}</div>
                                        <div style="flex: 1">{{item.gd}}</div>
                                        <div style="flex: 1">{{item.points}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; margin-left: 10px;">
                        <div v-if="form_6_matches.away.length > 0 && current_type == 7" class="header" style="display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 7;">
                                <div style="height: 30px; text-align: center;">
                                    Away
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">W</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">L</div>
                                    <div style="flex: 1">F</div>
                                    <div style="flex: 1">A</div>
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Points</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="form_6_matches.away.length > 0 && current_type == 7" v-for="(item, index) in form_6_matches.away" class="content" style="float: left; display: flex;">
                            <div style="flex: 5;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 7;">
                                <div style="flex: 4;">
                                    <div style="height: 30px; display: flex; text-align: center">
                                        <div style="flex: 1">{{item.away.p}}</div>
                                        <div style="flex: 1">{{item.away.w}}</div>
                                        <div style="flex: 1">{{item.d}}</div>
                                        <div style="flex: 1">{{item.away.l}}</div>
                                        <div style="flex: 1">{{item.away.f}}</div>
                                        <div style="flex: 1">{{item.away.a}}</div>
                                        <div style="flex: 1">{{item.gd}}</div>
                                        <div style="flex: 1">{{item.points}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="margin_overall.home.length > 0 && current_type == 8" style="display: flex;">
                    <div style="flex: 1; margin-right: 10px;">
                        <div v-if="margin_overall.home.length > 0 && current_type == 8" class="header" style="display: flex;">
                            <div style="flex: 3;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; text-align: center; color: #dff0d8;">
                                    .
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                            <div style="flex: 3;">
                                <div style="height: 30px; text-align: center;">
                                    Losses
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">5-</div>
                                    <div style="flex: 1">4</div>
                                    <div style="flex: 1">3</div>
                                    <div style="flex: 1">2</div>
                                    <div style="flex: 1">1</div>
                                </div>
                            </div>
                            <div style="flex: 1;">
                                <div style="height: 30px; text-align: center;">
                                    D
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">0</div>
                                </div>
                            </div>
                            <div style="flex: 3;">
                                <div style="height: 30px; text-align: center;">
                                    Wins
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">1</div>
                                    <div style="flex: 1">2</div>
                                    <div style="flex: 1">3</div>
                                    <div style="flex: 1">4</div>
                                    <div style="flex: 1">5+</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="margin_overall.home.length > 0 && current_type == 8" v-for="(item, index) in margin_overall.home" class="content" style="float: left; display: flex;">
                            <div style="flex: 3;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.home.p}}</div>
                                    <div style="flex: 1">{{item.gd}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                            <div style="flex: 3;">
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.loss_5}}</div>
                                    <div style="flex: 1">{{item.loss_4}}</div>
                                    <div style="flex: 1">{{item.loss_3}}</div>
                                    <div style="flex: 1">{{item.loss_2}}</div>
                                    <div style="flex: 1">{{item.loss_1}}</div>
                                </div>
                            </div>
                            <div style="flex: 1;">
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.d}}</div>
                                </div>
                            </div>
                            <div style="flex: 3;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.win_5}}</div>
                                    <div style="flex: 1">{{item.win_4}}</div>
                                    <div style="flex: 1">{{item.win_3}}</div>
                                    <div style="flex: 1">{{item.win_2}}</div>
                                    <div style="flex: 1">{{item.win_1}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="margin_home.home.length > 0 && current_type == 9" style="display: flex;">
                    <div style="flex: 1; margin-right: 10px;">
                        <div v-if="margin_home.home.length > 0 && current_type == 9" class="header" style="display: flex;">
                            <div style="flex: 3;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; text-align: center; color: #dff0d8;">
                                    .
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                            <div style="flex: 3;">
                                <div style="height: 30px; text-align: center;">
                                    Losses
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">5-</div>
                                    <div style="flex: 1">4</div>
                                    <div style="flex: 1">3</div>
                                    <div style="flex: 1">2</div>
                                    <div style="flex: 1">1</div>
                                </div>
                            </div>
                            <div style="flex: 1;">
                                <div style="height: 30px; text-align: center;">
                                    D
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">0</div>
                                </div>
                            </div>
                            <div style="flex: 3;">
                                <div style="height: 30px; text-align: center;">
                                    Wins
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">1</div>
                                    <div style="flex: 1">2</div>
                                    <div style="flex: 1">3</div>
                                    <div style="flex: 1">4</div>
                                    <div style="flex: 1">5+</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="margin_home.home.length > 0 && current_type == 9" v-for="(item, index) in margin_home.home" class="content" style="float: left; display: flex;">
                            <div style="flex: 3;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.home.p}}</div>
                                    <div style="flex: 1">{{item.gd}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                            <div style="flex: 3;">
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.loss_5}}</div>
                                    <div style="flex: 1">{{item.loss_4}}</div>
                                    <div style="flex: 1">{{item.loss_3}}</div>
                                    <div style="flex: 1">{{item.loss_2}}</div>
                                    <div style="flex: 1">{{item.loss_1}}</div>
                                </div>
                            </div>
                            <div style="flex: 1;">
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.d}}</div>
                                </div>
                            </div>
                            <div style="flex: 3;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.win_5}}</div>
                                    <div style="flex: 1">{{item.win_4}}</div>
                                    <div style="flex: 1">{{item.win_3}}</div>
                                    <div style="flex: 1">{{item.win_2}}</div>
                                    <div style="flex: 1">{{item.win_1}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="margin_away.home.length > 0 && current_type == 10" style="display: flex;">
                    <div style="flex: 1; margin-right: 10px;">
                        <div v-if="margin_away.home.length > 0 && current_type == 10" class="header" style="display: flex;">
                            <div style="flex: 3;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; text-align: center; color: #dff0d8;">
                                    .
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">D</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                            <div style="flex: 3;">
                                <div style="height: 30px; text-align: center;">
                                    Losses
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">5-</div>
                                    <div style="flex: 1">4</div>
                                    <div style="flex: 1">3</div>
                                    <div style="flex: 1">2</div>
                                    <div style="flex: 1">1</div>
                                </div>
                            </div>
                            <div style="flex: 1;">
                                <div style="height: 30px; text-align: center;">
                                    D
                                </div>
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">0</div>
                                </div>
                            </div>
                            <div style="flex: 3;">
                                <div style="height: 30px; text-align: center;">
                                    Wins
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">1</div>
                                    <div style="flex: 1">2</div>
                                    <div style="flex: 1">3</div>
                                    <div style="flex: 1">4</div>
                                    <div style="flex: 1">5+</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="margin_away.home.length > 0 && current_type == 10" v-for="(item, index) in margin_away.home" class="content" style="float: left; display: flex;">
                            <div style="flex: 3;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 2;">
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.home.p}}</div>
                                    <div style="flex: 1">{{item.gd}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                            <div style="flex: 3;">
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.loss_5}}</div>
                                    <div style="flex: 1">{{item.loss_4}}</div>
                                    <div style="flex: 1">{{item.loss_3}}</div>
                                    <div style="flex: 1">{{item.loss_2}}</div>
                                    <div style="flex: 1">{{item.loss_1}}</div>
                                </div>
                            </div>
                            <div style="flex: 1;">
                                <div style="height: 30px; border-right: 1px solid gray; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.d}}</div>
                                </div>
                            </div>
                            <div style="flex: 3;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.win_5}}</div>
                                    <div style="flex: 1">{{item.win_4}}</div>
                                    <div style="flex: 1">{{item.win_3}}</div>
                                    <div style="flex: 1">{{item.win_2}}</div>
                                    <div style="flex: 1">{{item.win_1}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="home_A_away_D.home.length > 0 && current_type == 11" style="display: flex;">
                    <div style="flex: 1; margin-right: 10px;">
                        <div v-if="home_A_away_D.home.length > 0 && current_type == 11" class="header" style="display: flex;">
                            <div style="flex: 8;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 4;">
                                <div style="height: 30px; text-align: center;">
                                    Home Attack
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="home_A_away_D.home.length > 0 && current_type == 11" v-for="(item, index) in home_A_away_D.home" class="content" style="float: left; display: flex;">
                            <div style="flex: 8;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 4;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.p}}</div>
                                    <div style="flex: 1">{{item.gd}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; margin-left: 10px;">
                        <div v-if="home_A_away_D.away.length > 0 && current_type == 11" class="header" style="display: flex;">
                            <div style="flex: 8;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 4;">
                                <div style="height: 30px; text-align: center;">
                                    Away Defence
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="home_A_away_D.away.length > 0 && current_type == 11" v-for="(item, index) in home_A_away_D.away" class="content" style="float: left; display: flex;">
                            <div style="flex: 8;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 4;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.p}}</div>
                                    <div style="flex: 1">{{item.gd}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="home_D_away_A.home.length > 0 && current_type == 12" style="display: flex;">
                    <div style="flex: 1; margin-right: 10px;">
                        <div v-if="home_D_away_A.home.length > 0 && current_type == 12" class="header" style="display: flex;">
                            <div style="flex: 8;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 4;">
                                <div style="height: 30px; text-align: center;">
                                    Home Defence
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="home_D_away_A.home.length > 0 && current_type == 12" v-for="(item, index) in home_D_away_A.home" class="content" style="float: left; display: flex;">
                            <div style="flex: 8;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 4;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.p}}</div>
                                    <div style="flex: 1">{{item.gd}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 1; margin-left: 10px;">
                        <div v-if="home_D_away_A.away.length > 0 && current_type == 12" class="header" style="display: flex;">
                            <div style="flex: 8;">
                                <div style="height: 30px; color: #dff0d8;">
                                    ...
                                </div>
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    # Team
                                </div>
                            </div>
                            <div style="flex: 4;">
                                <div style="height: 30px; text-align: center;">
                                    Away Attack
                                </div>
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">P</div>
                                    <div style="flex: 1">GD</div>
                                    <div style="flex: 1">Av</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="home_D_away_A.away.length > 0 && current_type == 12" v-for="(item, index) in home_D_away_A.away" class="content" style="float: left; display: flex;">
                            <div style="flex: 8;">
                                <div style="height: 30px; padding-left: 15px; border-right: 1px solid gray;">
                                    {{index + 1}}. {{item.team_name}}
                                    <span v-if="item.over > 0" style="margin-left: 10px; color: #00cc84; ">+ {{item.over}}</span>
                                    <span v-if="item.over == 0" style="margin-left: 10px;">-</span>
                                    <span v-if="item.over < 0" style="margin-left: 10px; color: #fe9f9f; ">{{item.over}}</span>
                                </div>
                            </div>
                            <div style="flex: 4;">
                                <div style="height: 30px; display: flex; text-align: center">
                                    <div style="flex: 1">{{item.p}}</div>
                                    <div style="flex: 1">{{item.gd}}</div>
                                    <div style="flex: 1">{{item.av}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CCard>
    </div>
</template>
<script>
    export default {
        name: 'LeagueTable',
        components: {
        },
        data () {
            return {
                'standingList': [],
                'league_list':[{"value": 1000, "label": "Select League..."}],
                'typeofdata_list': [
                    {"value": 1000, "label": "Please select..."},
                    {"value": 1, "label": "Full"},
                    {"value": 2, "label": "Home - Away"},
                    {"value": 3, "label": "First Half"},
                    {"value": 4, "label": "Second Half"},
                    {"value": 5, "label": "Form - Overall"},
                    {"value": 6, "label": "Form - 3 Matches"},
                    {"value": 7, "label": "Form - 6 Matches"},
                    // {"value": 8, "label": "Win/Loss Margin - Overall"},
                    // {"value": 9, "label": "Win/Loss Margin - Home"},
                    // {"value": 10, "label": "Win/Loss Margin - Away"},
                    {"value": 11, "label": "Home Attack v Away Defence"},
                    {"value": 12, "label": "Home Defence v Away Attack"},
                ],
                'leagueList': [],
                'league_map':[],
                'current_league': [],
                'current_type': null,
                'current_league_id': null,
                'current_league_value': 1000,
                'full_table': [],
                'home_away_table': {
                    'home': [],
                    'away': []
                },
                'first_half': {
                    'home': [],
                    'away': []
                },
                'second_half': {
                    'home': [],
                    'away': []
                },
                'overall': {
                    'home': [],
                    'away': []
                },
                'form_3_matches': {
                    'home': [],
                    'away': []
                },
                'form_6_matches': {
                    'home': [],
                    'away': []
                },
                'margin_overall': {
                    'home': []
                },
                'margin_home': {
                    'home': []
                },
                'margin_away': {
                    'home': []
                },
                'home_A_away_D': {
                    'home': [],
                    'away': []
                },
                'home_D_away_A': {
                    'home': [],
                    'away': []
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
            create_UUID(){
                var dt = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (dt + Math.random()*16)%16 | 0;
                    dt = Math.floor(dt/16);
                    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
                });
                return uuid
            },
            league_filter(val){
                this.current_league_id = val
                this.current_league = this.league_list.filter(function(item) {
                    return item.value == val
                });
                console.log("current league=>", this.current_league[0])
                this.current_league_value = val
                this.full_table = []
                this.home_away_table = {
                    'home': [],
                    'away': []
                }
                this.first_half = {
                    'home': [],
                    'away': []
                }
                this.second_half = {
                    'home': [],
                    'away': []
                }
                this.overall = {
                    'home': [],
                    'away': []
                }
                this.form_3_matches = {
                    'home': [],
                    'away': []
                }
                this.form_6_matches = {
                    'home': [],
                    'away': []
                }
                this.margin_overall = {
                    'home': []
                }
                this.margin_home = {
                    'home': []
                }
                this.margin_away = {
                    'home': []
                }
                this.home_A_away_D = {
                    'home': [],
                    'away': []
                }
                this.home_D_away_A = {
                    'home': [],
                    'away': []
                }
                let season_data = this.current_league[0].season.standings
                for(let i = 0 ; i < season_data.length ; i++){
                    let new_team_data = {
                        "id": this.create_UUID(),
                        "team_name": null,
                        "team_id": null,
                        "total": {
                            "p": null,
                            "w": null,
                            "d": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "home": {
                            "p": null,
                            "w": null,
                            "d": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "away": {
                            "p": null,
                            "w": null,
                            "d": null,
                            "l": null,
                            "f": null,
                            "a": null,
                        },
                        "last": {
                            "d": null,
                            "points": null,
                        }
                    }
                    if(season_data[i].overall != null){
                        new_team_data.total.p = season_data[i].overall.games_played
                        new_team_data.total.w = season_data[i].overall.won
                        new_team_data.total.d = season_data[i].overall.draw
                        new_team_data.total.l = season_data[i].overall.lost
                        new_team_data.total.f = season_data[i].overall.goals_scored
                        new_team_data.total.a = season_data[i].overall.goals_against
                    }
                    if(season_data[i].home != null){
                        new_team_data.home.p = season_data[i].home.games_played
                        new_team_data.home.w = season_data[i].home.won
                        new_team_data.home.d = season_data[i].home.draw
                        new_team_data.home.l = season_data[i].home.lost
                        new_team_data.home.f = season_data[i].home.goals_scored
                        new_team_data.home.a = season_data[i].home.goals_against
                    }
                    if(season_data[i].away != null){
                        new_team_data.away.p = season_data[i].away.games_played
                        new_team_data.away.w = season_data[i].away.won
                        new_team_data.away.d = season_data[i].away.draw
                        new_team_data.away.l = season_data[i].away.lost
                        new_team_data.away.f = season_data[i].away.goals_scored
                        new_team_data.away.a = season_data[i].away.goals_against
                    }
                    new_team_data.last.points = season_data[i].points
                    new_team_data.last.d = season_data[i].total.goal_difference
                    new_team_data.team_name = season_data[i].team_name
                    new_team_data.team_id = season_data[i].team_id
                    this.full_table.push(new_team_data)
                }
                console.log("full table data=>", this.full_table)
                if(this.current_type == 1){
                    this.full_table = []
                    let season_data = this.current_league[0].season.standings
                    for(let i = 0 ; i < season_data.length ; i++){
                        let new_team_data = {
                            "id": this.create_UUID(),
                            "team_name": null,
                            "team_id": null,
                            "total": {
                                "p": null,
                                "w": null,
                                "d": null,
                                "l": null,
                                "f": null,
                                "a": null,
                            },
                            "home": {
                                "p": null,
                                "w": null,
                                "d": null,
                                "l": null,
                                "f": null,
                                "a": null,
                            },
                            "away": {
                                "p": null,
                                "w": null,
                                "d": null,
                                "l": null,
                                "f": null,
                                "a": null,
                            },
                            "last": {
                                "d": null,
                                "points": null,
                            },
                            "f": null,
                            "gd": null,
                            "points": null
                        }
                        if(season_data[i].overall != null){
                            new_team_data.total.p = season_data[i].overall.games_played
                            new_team_data.total.w = season_data[i].overall.won
                            new_team_data.total.d = season_data[i].overall.draw
                            new_team_data.total.l = season_data[i].overall.lost
                            new_team_data.total.f = season_data[i].overall.goals_scored
                            new_team_data.total.a = season_data[i].overall.goals_against
                        }
                        if(season_data[i].home != null){
                            new_team_data.home.p = season_data[i].home.games_played
                            new_team_data.home.w = season_data[i].home.won
                            new_team_data.home.d = season_data[i].home.draw
                            new_team_data.home.l = season_data[i].home.lost
                            new_team_data.home.f = season_data[i].home.goals_scored
                            new_team_data.home.a = season_data[i].home.goals_against
                        }
                        if(season_data[i].away != null){
                            new_team_data.away.p = season_data[i].away.games_played
                            new_team_data.away.w = season_data[i].away.won
                            new_team_data.away.d = season_data[i].away.draw
                            new_team_data.away.l = season_data[i].away.lost
                            new_team_data.away.f = season_data[i].away.goals_scored
                            new_team_data.away.a = season_data[i].away.goals_against
                        }
                        new_team_data.last.points = season_data[i].points
                        new_team_data.last.d = season_data[i].total.goal_difference
                        new_team_data.team_name = season_data[i].team_name
                        new_team_data.team_id = season_data[i].team_id
                        new_team_data.f = new_team_data.total.f
                        new_team_data.gd = new_team_data.last.d
                        new_team_data.points = new_team_data.last.points
                        this.full_table.push(new_team_data)
                    }
                    // let self = this
                    // console.log("full table data=>", this.full_table)
                    // let new_away1 = []
                    // for(let j = 0 ; j < self.full_table.length ; j++){
                    //     let len = self.full_table.filter(function(item) {
                    //         return (item.points == self.full_table[j].points)
                    //     });
                    //     if(len.length > 1){
                    //         this.sortJSON1(len,'gd', '123');
                    //         for(let p = j ; p < j + len.length ; p++){
                    //             new_away1.push(len[p - j])
                    //         }
                    //         j = j + len.length - 1
                    //     }
                    //     else{
                    //         new_away1.push(self.full_table[j])
                    //     }
                    // }
                    // self.full_table = new_away1
                    //
                    // let new_away = []
                    // for(let j = 0 ; j < self.full_table.length ; j++){
                    //     let len = self.full_table.filter(function(item) {
                    //         return (item.points == self.full_table[j].points && item.gd == self.full_table[j].gd)
                    //     });
                    //     if(len.length > 1){
                    //         this.sortJSON1(len,'f', '123');
                    //         for(let p = j ; p < j + len.length ; p++){
                    //             new_away.push(len[p - j])
                    //         }
                    //         j = j + len.length - 1
                    //     }
                    //     else{
                    //         new_away.push(self.full_table[j])
                    //     }
                    // }
                    // self.full_table = new_away
                }
                if(this.current_type == 2){
                    let season_data = this.current_league[0].season.standings
                    for(let i = 0 ; i < season_data.length ; i++){
                        let home_team_data = {
                            "id": this.create_UUID(),
                            "team_name": null,
                            "team_id": null,
                            "over": null,
                            "home": {
                                "p": null,
                                "w": null,
                                "l": null,
                                "f": null,
                                "a": null,
                            },
                            "d": null,
                            "last": {
                                "d": null,
                                "points": null,
                            },
                            "f": null,
                            "av": null,
                            "gd": null,
                        }
                        let away_team_data = {
                            "id": this.create_UUID(),
                            "team_name": null,
                            "team_id": null,
                            "over": null,
                            "away": {
                                "p": null,
                                "w": null,
                                "l": null,
                                "f": null,
                                "a": null,
                            },
                            "d": null,
                            "last": {
                                "d": null,
                                "points": null,
                            },
                            "f": null,
                            "av": null,
                            "gd": null,
                        }
                        if(season_data[i].home != null){
                            home_team_data.home.p = season_data[i].home.games_played
                            home_team_data.team_name = season_data[i].team_name
                            home_team_data.team_id = season_data[i].team_id
                            home_team_data.home.w = season_data[i].home.won
                            home_team_data.d = season_data[i].home.draw
                            home_team_data.home.l = season_data[i].home.lost
                            home_team_data.home.f = season_data[i].home.goals_scored
                            home_team_data.f = season_data[i].home.goals_scored
                            home_team_data.home.a = season_data[i].home.goals_against
                            home_team_data.last.d = season_data[i].home.goals_scored - season_data[i].home.goals_against
                            home_team_data.gd = season_data[i].home.goals_scored - season_data[i].home.goals_against
                            home_team_data.last.points = home_team_data.home.w*3 + home_team_data.d
                            home_team_data.av = (home_team_data.last.points/home_team_data.home.p).toFixed(2)
                        }
                        if(season_data[i].away != null){
                            away_team_data.away.p = season_data[i].away.games_played
                            away_team_data.team_name = season_data[i].team_name
                            away_team_data.team_id = season_data[i].team_id
                            away_team_data.away.w = season_data[i].away.won
                            away_team_data.d = season_data[i].away.draw
                            away_team_data.away.l = season_data[i].away.lost
                            away_team_data.away.f = season_data[i].away.goals_scored
                            away_team_data.f = season_data[i].away.goals_scored
                            away_team_data.away.a = season_data[i].away.goals_against
                            away_team_data.last.d = season_data[i].away.goals_scored - season_data[i].away.goals_against
                            away_team_data.gd = season_data[i].away.goals_scored - season_data[i].away.goals_against
                            away_team_data.last.points = away_team_data.away.w*3 + away_team_data.d
                            away_team_data.av = (away_team_data.last.points/away_team_data.away.p).toFixed(2)
                        }
                        this.home_away_table.home.push(home_team_data)
                        this.home_away_table.away.push(away_team_data)
                    }
                    let self = this
                    this.sortJSON1(self.home_away_table.home,'av', '123');
                    this.sortJSON1(self.home_away_table.away,'av', '123');

                    let new_away_table1 = []
                    for(let j = 0 ; j < self.home_away_table.home.length ; j++){
                        let len = self.home_away_table.home.filter(function(item) {
                            return item.av == self.home_away_table.home[j].av
                        });
                        if(len.length > 1){
                            this.sortJSON1(len,'gd', '123');
                            for(let p = j ; p < j + len.length ; p++){
                                self.home_away_table.home[p] = len[p - j]
                                new_away_table1.push(len[p - j])
                            }
                            j = j + len.length - 1
                        }
                        else{
                            new_away_table1.push(self.home_away_table.home[j])
                        }
                    }
                    self.home_away_table.home = new_away_table1

                    let new_away_table2 = []
                    for(let j = 0 ; j < self.home_away_table.home.length ; j++){
                        let len = self.home_away_table.home.filter(function(item) {
                            return (item.av == self.home_away_table.home[j].av && item.gd == self.home_away_table.home[j].gd)
                        });
                        if(len.length > 1){
                            this.sortJSON1(len,'f', '123');
                            for(let p = j ; p < j + len.length ; p++){
                                self.home_away_table.home[p] = len[p - j]
                                new_away_table2.push(len[p - j])
                            }
                            j = j + len.length - 1
                        }
                        else{
                            new_away_table2.push(self.home_away_table.home[j])
                        }
                    }
                    self.home_away_table.home = new_away_table2

                    let new_away_table = []
                    for(let j = 0 ; j < self.home_away_table.away.length ; j++){
                        let len = self.home_away_table.away.filter(function(item) {
                            return item.av == self.home_away_table.away[j].av
                        });
                        if(len.length > 1){
                            this.sortJSON1(len,'gd', '123');
                            for(let p = j ; p < j + len.length ; p++){
                                self.home_away_table.away[p] = len[p - j]
                                new_away_table.push(len[p - j])
                            }
                            j = j + len.length - 1
                        }
                        else{
                            new_away_table.push(self.home_away_table.away[j])
                        }
                    }
                    self.home_away_table.away = new_away_table

                    let new_away_table3 = []
                    for(let j = 0 ; j < self.home_away_table.away.length ; j++){
                        let len = self.home_away_table.away.filter(function(item) {
                            return (item.av == self.home_away_table.away[j].av && item.gd == self.home_away_table.away[j].gd)
                        });
                        if(len.length > 1){
                            this.sortJSON1(len,'f', '123');
                            for(let p = j ; p < j + len.length ; p++){
                                self.home_away_table.away[p] = len[p - j]
                                new_away_table3.push(len[p - j])
                            }
                            j = j + len.length - 1
                        }
                        else{
                            new_away_table3.push(self.home_away_table.away[j])
                        }
                    }
                    self.home_away_table.away = new_away_table3

                    for(let j = 0 ; j < self.home_away_table.home.length ; j++){
                        let full_rank_home = this.full_table.filter(function(item) {
                            return item.team_id === self.home_away_table.home[j].team_id;
                        });
                        if(full_rank_home.length > 0){
                            self.home_away_table.home[j].over = this.full_table.indexOf(full_rank_home[0]) - j
                        }

                        let full_rank_away = this.full_table.filter(function(item) {
                            return item.team_id === self.home_away_table.away[j].team_id;
                        });
                        if(full_rank_away.length > 0){
                            self.home_away_table.away[j].over = this.full_table.indexOf(full_rank_away[0]) - j
                        }
                    }
                    console.log("full table data=>", this.home_away_table)
                }
                if(this.current_type == 3) {
                    this.showModal()
                    window.axios.post(`${process.env.VUE_APP_URL}getLeagueTableEvents`, [this.current_league[0].season.season_id, this.current_league[0].season.round_id, this.current_league[0].season.stage_id]).then(({data})=> {
                        this.hideModal()
                        let season_data = this.current_league[0].season.standings
                        for (let i = 0; i < season_data.length; i++) {
                            let home_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "home": {
                                    "p": null,
                                    "w": null,
                                    "l": null,
                                    "f": null,
                                    "a": null,
                                },
                                "d": null,
                                "last": {
                                    "d": null,
                                    "points": null,
                                },
                                "f": null,
                                "av": null,
                                "gd": null,
                            }
                            let away_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "away": {
                                    "p": null,
                                    "w": null,
                                    "l": null,
                                    "f": null,
                                    "a": null,
                                },
                                "d": null,
                                "last": {
                                    "d": null,
                                    "points": null,
                                },
                                "f": null,
                                "av": null,
                                "gd": null,
                            }

                            home_team_data.team_name = season_data[i].team_name
                            home_team_data.team_id = season_data[i].team_id

                            away_team_data.team_name = season_data[i].team_name
                            away_team_data.team_id = season_data[i].team_id
                            this.first_half.home.push(home_team_data)
                            this.first_half.away.push(away_team_data)
                        }

                        let events = data.data[0]
                        console.log('Events History=>', events)
                        for(let i = 0 ; i < this.first_half.home.length ; i++){
                            this.first_half.home[i].home.p = this.first_half_p(this.first_half.home[i].team_id, events, '1')
                            this.first_half.away[i].away.p = this.first_half_p(this.first_half.away[i].team_id, events, '2')
                            this.first_half.home[i].home.w = this.first_half_w(this.first_half.home[i].team_id, events, '1')
                            this.first_half.away[i].away.w = this.first_half_w(this.first_half.away[i].team_id, events, '2')
                            this.first_half.home[i].d = this.first_half_d(this.first_half.home[i].team_id, events, '1')
                            this.first_half.away[i].d = this.first_half_d(this.first_half.away[i].team_id, events, '2')
                            this.first_half.home[i].home.l = this.first_half_l(this.first_half.home[i].team_id, events, '1')
                            this.first_half.away[i].away.l = this.first_half_l(this.first_half.away[i].team_id, events, '2')
                            this.first_half.home[i].home.f = this.first_half_f(this.first_half.home[i].team_id, events, '1')
                            this.first_half.home[i].f = this.first_half_f(this.first_half.home[i].team_id, events, '1')
                            this.first_half.away[i].away.f = this.first_half_f(this.first_half.away[i].team_id, events, '2')
                            this.first_half.away[i].f = this.first_half_f(this.first_half.away[i].team_id, events, '2')
                            this.first_half.home[i].home.a = this.first_half_a(this.first_half.home[i].team_id, events, '1')
                            this.first_half.away[i].away.a = this.first_half_a(this.first_half.away[i].team_id, events, '2')
                            this.first_half.home[i].last.d = this.first_half.home[i].home.f - this.first_half.home[i].home.a
                            this.first_half.away[i].last.d = this.first_half.away[i].away.f - this.first_half.away[i].away.a
                            this.first_half.home[i].gd = this.first_half.home[i].home.f - this.first_half.home[i].home.a
                            this.first_half.away[i].gd = this.first_half.away[i].away.f - this.first_half.away[i].away.a
                            this.first_half.home[i].last.points = this.first_half_w(this.first_half.home[i].team_id, events, '1')*3 + this.first_half_d(this.first_half.home[i].team_id, events, '1')
                            this.first_half.away[i].last.points = this.first_half_w(this.first_half.home[i].team_id, events, '2')*3 + this.first_half_d(this.first_half.home[i].team_id, events, '2')
                            this.first_half.home[i].av = (this.first_half.home[i].last.points/this.first_half.home[i].home.p).toFixed(2)
                            this.first_half.away[i].av = (this.first_half.away[i].last.points/this.first_half.away[i].away.p).toFixed(2)
                        }
                        let self = this
                        this.sortJSON1(self.first_half.home, 'av', '123')
                        this.sortJSON1(self.first_half.away, 'av', '123')

                        let new_away_table1 = []
                        for(let j = 0 ; j < self.first_half.home.length ; j++){
                            let len = self.first_half.home.filter(function(item) {
                                return item.av == self.first_half.home[j].av
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.first_half.home[p] = len[p - j]
                                    new_away_table1.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table1.push(self.first_half.home[j])
                            }
                        }
                        self.first_half.home = new_away_table1

                        let new_away_table2 = []
                        for(let j = 0 ; j < self.first_half.home.length ; j++){
                            let len = self.first_half.home.filter(function(item) {
                                return (item.av == self.first_half.home[j].av && item.gd == self.first_half.home[j].gd)
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'f', '123')
                                for(let p = j ; p < j + len.length ; p++){
                                    self.first_half.home[p] = len[p - j]
                                    new_away_table2.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table2.push(self.first_half.home[j])
                            }
                        }
                        self.first_half.home = new_away_table2

                        let new_away_table = []
                        for(let j = 0 ; j < self.first_half.away.length ; j++){
                            let len = self.first_half.away.filter(function(item) {
                                return item.av == self.first_half.away[j].av
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.first_half.away[p] = len[p - j]
                                    new_away_table.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table.push(self.first_half.away[j])
                            }
                        }
                        self.first_half.away = new_away_table

                        let new_away_table3 = []
                        for(let j = 0 ; j < self.first_half.away.length ; j++){
                            let len = self.first_half.away.filter(function(item) {
                                return (item.av == self.first_half.away[j].av && item.gd == self.first_half.away[j].gd)
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'f', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.first_half.away[p] = len[p - j]
                                    new_away_table3.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table3.push(self.first_half.away[j])
                            }
                        }
                        self.first_half.away = new_away_table3

                        for(let j = 0 ; j < self.first_half.home.length ; j++){
                            let full_rank_home = this.full_table.filter(function(item) {
                                return item.team_id === self.first_half.home[j].team_id;
                            });
                            if(full_rank_home.length > 0){
                                self.first_half.home[j].over = this.full_table.indexOf(full_rank_home[0]) - j
                            }

                            let full_rank_away = this.full_table.filter(function(item) {
                                return item.team_id === self.first_half.away[j].team_id;
                            });
                            if(full_rank_away.length > 0){
                                self.first_half.away[j].over = this.full_table.indexOf(full_rank_away[0]) - j
                            }
                        }

                    })
                }
                if(this.current_type == 4) {
                    this.showModal()
                    window.axios.post(`${process.env.VUE_APP_URL}getLeagueTableEvents`, [ this.current_league[0].season.season_id, this.current_league[0].season.round_id, this.current_league[0].season.stage_id]).then(({data})=> {
                        this.hideModal()
                        let season_data = this.current_league[0].season.standings
                        for (let i = 0; i < season_data.length; i++) {
                            let home_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "home": {
                                    "p": null,
                                    "w": null,
                                    "l": null,
                                    "f": null,
                                    "a": null,
                                },
                                "d": null,
                                "last": {
                                    "d": null,
                                    "points": null,
                                },
                                "f": null,
                                "av": null,
                                "gd": null,
                            }
                            let away_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "away": {
                                    "p": null,
                                    "w": null,
                                    "l": null,
                                    "f": null,
                                    "a": null,
                                },
                                "d": null,
                                "last": {
                                    "d": null,
                                    "points": null,
                                },
                                "f": null,
                                "av": null,
                                "gd": null,
                            }

                            home_team_data.team_name = season_data[i].team_name
                            home_team_data.team_id = season_data[i].team_id

                            away_team_data.team_name = season_data[i].team_name
                            away_team_data.team_id = season_data[i].team_id
                            this.second_half.home.push(home_team_data)
                            this.second_half.away.push(away_team_data)
                        }

                        let events = data.data[0]
                        console.log('Events History=>', events)
                        for(let i = 0 ; i < this.second_half.home.length ; i++){
                            this.second_half.home[i].home.p = this.second_half_p(this.second_half.home[i].team_id, events, '1')
                            this.second_half.away[i].away.p = this.second_half_p(this.second_half.away[i].team_id, events, '2')
                            this.second_half.home[i].home.w = this.second_half_w(this.second_half.home[i].team_id, events, '1')
                            this.second_half.away[i].away.w = this.second_half_w(this.second_half.away[i].team_id, events, '2')
                            this.second_half.home[i].d = this.second_half_d(this.second_half.home[i].team_id, events, '1')
                            this.second_half.away[i].d = this.second_half_d(this.second_half.away[i].team_id, events, '2')
                            this.second_half.home[i].home.l = this.second_half_l(this.second_half.home[i].team_id, events, '1')
                            this.second_half.away[i].away.l = this.second_half_l(this.second_half.away[i].team_id, events, '2')
                            this.second_half.home[i].home.f = this.second_half_f(this.second_half.home[i].team_id, events, '1')
                            this.second_half.home[i].f = this.second_half_f(this.second_half.home[i].team_id, events, '1')
                            this.second_half.away[i].away.f = this.second_half_f(this.second_half.away[i].team_id, events, '2')
                            this.second_half.away[i].f = this.second_half_f(this.second_half.away[i].team_id, events, '2')
                            this.second_half.home[i].home.a = this.second_half_a(this.second_half.home[i].team_id, events, '1')
                            this.second_half.away[i].away.a = this.second_half_a(this.second_half.away[i].team_id, events, '2')
                            this.second_half.home[i].last.d = this.second_half.home[i].home.f - this.second_half.home[i].home.a
                            this.second_half.away[i].last.d = this.second_half.away[i].away.f - this.second_half.away[i].away.a
                            this.second_half.home[i].gd = this.second_half.home[i].home.f - this.second_half.home[i].home.a
                            this.second_half.away[i].gd = this.second_half.away[i].away.f - this.second_half.away[i].away.a
                            this.second_half.home[i].last.points = this.second_half_w(this.second_half.home[i].team_id, events, '1')*3 + this.second_half_d(this.second_half.home[i].team_id, events, '1')
                            this.second_half.away[i].last.points = this.second_half_w(this.second_half.home[i].team_id, events, '2')*3 + this.second_half_d(this.second_half.home[i].team_id, events, '2')
                            this.second_half.home[i].av = (this.second_half.home[i].last.points/this.second_half.home[i].home.p).toFixed(2)
                            this.second_half.away[i].av = (this.second_half.away[i].last.points/this.second_half.away[i].away.p).toFixed(2)
                        }
                        let self = this
                        this.sortJSON1(self.second_half.home, 'av', '123');
                        this.sortJSON1(self.second_half.away, 'av', '123');

                        let new_away_table1 = []
                        for(let j = 0 ; j < self.second_half.home.length ; j++){
                            let len = self.second_half.home.filter(function(item) {
                                return item.av == self.second_half.home[j].av
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.second_half.home[p] = len[p - j]
                                    new_away_table1.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table1.push(self.second_half.home[j])
                            }
                        }
                        self.second_half.home = new_away_table1

                        let new_away_table2 = []
                        for(let j = 0 ; j < self.second_half.home.length ; j++){
                            let len = self.second_half.home.filter(function(item) {
                                return (item.av == self.second_half.home[j].av && item.gd == self.second_half.home[j].gd)
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'f', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.second_half.home[p] = len[p - j]
                                    new_away_table2.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table2.push(self.second_half.home[j])
                            }
                        }
                        self.second_half.home = new_away_table2

                        let new_away_table = []
                        for(let j = 0 ; j < self.second_half.away.length ; j++){
                            let len = self.second_half.away.filter(function(item) {
                                return item.av == self.second_half.away[j].av
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.second_half.away[p] = len[p - j]
                                    new_away_table.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table.push(self.second_half.away[j])
                            }
                        }
                        self.second_half.away = new_away_table

                        let new_away_table3 = []
                        for(let j = 0 ; j < self.second_half.away.length ; j++){
                            let len = self.second_half.away.filter(function(item) {
                                return (item.av == self.second_half.away[j].av && item.gd == self.second_half.away[j].gd)
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'f', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.second_half.away[p] = len[p - j]
                                    new_away_table3.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table3.push(self.second_half.away[j])
                            }
                        }
                        self.second_half.away = new_away_table3

                        for(let j = 0 ; j < self.second_half.home.length ; j++){
                            let full_rank_home = this.full_table.filter(function(item) {
                                return item.team_id === self.second_half.home[j].team_id;
                            });
                            if(full_rank_home.length > 0){
                                self.second_half.home[j].over = this.full_table.indexOf(full_rank_home[0]) - j
                            }

                            let full_rank_away = this.full_table.filter(function(item) {
                                return item.team_id === self.second_half.away[j].team_id;
                            });
                            if(full_rank_away.length > 0){
                                self.second_half.away[j].over = this.full_table.indexOf(full_rank_away[0]) - j
                            }
                        }
                    })
                }
                if(this.current_type == 5) {
                    this.showModal()
                    window.axios.post(`${process.env.VUE_APP_URL}getLeagueTableEvents`, [ this.current_league[0].season.season_id, this.current_league[0].season.round_id, this.current_league[0].season.stage_id]).then(({data})=> {
                        this.hideModal()
                        let season_data = this.current_league[0].season.standings
                        for (let i = 0; i < season_data.length; i++) {
                            let home_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "home": {
                                    "p": null,
                                    "w": null,
                                    "l": null,
                                    "f": null,
                                    "a": null,
                                },
                                "d": null,
                                "f": null,
                                "points": null,
                                "gd": null,
                            }
                            let away_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "away": {
                                    "p": null,
                                    "w": null,
                                    "l": null,
                                    "f": null,
                                    "a": null,
                                },
                                "d": null,
                                "f": null,
                                "points": null,
                                "gd": null,
                            }
                            home_team_data.team_name = season_data[i].team_name
                            home_team_data.team_id = season_data[i].team_id

                            away_team_data.team_name = season_data[i].team_name
                            away_team_data.team_id = season_data[i].team_id
                            this.overall.home.push(home_team_data)
                            this.overall.away.push(away_team_data)
                        }

                        let events = data.data[0]
                        console.log('Events History=>', events)
                        for(let i = 0 ; i < this.overall.home.length ; i++){
                            this.overall.home[i].home.p = this.overall_p(this.overall.home[i].team_id, events, '1')
                            this.overall.away[i].away.p = this.overall_p(this.overall.away[i].team_id, events, '2')
                            this.overall.home[i].home.w = this.overall_w(this.overall.home[i].team_id, events, '1')
                            this.overall.away[i].away.w = this.overall_w(this.overall.away[i].team_id, events, '2')
                            this.overall.home[i].d = this.overall_d(this.overall.home[i].team_id, events, '1')
                            this.overall.away[i].d = this.overall_d(this.overall.away[i].team_id, events, '2')
                            this.overall.home[i].home.l = this.overall_l(this.overall.home[i].team_id, events, '1')
                            this.overall.away[i].away.l = this.overall_l(this.overall.away[i].team_id, events, '2')
                            this.overall.home[i].home.f = this.overall_f(this.overall.home[i].team_id, events, '1')
                            this.overall.home[i].f = this.overall_f(this.overall.home[i].team_id, events, '1')
                            this.overall.away[i].away.f = this.overall_f(this.overall.away[i].team_id, events, '2')
                            this.overall.away[i].f = this.overall_f(this.overall.away[i].team_id, events, '2')
                            this.overall.home[i].home.a = this.overall_a(this.overall.home[i].team_id, events, '1')
                            this.overall.away[i].away.a = this.overall_a(this.overall.away[i].team_id, events, '2')
                            this.overall.home[i].gd = this.overall.home[i].home.f - this.overall.home[i].home.a
                            this.overall.away[i].gd = this.overall.away[i].away.f - this.overall.away[i].away.a
                            this.overall.home[i].points = this.overall_w(this.overall.home[i].team_id, events, '1')*3 + this.overall_d(this.overall.home[i].team_id, events, '1')
                            this.overall.away[i].points = this.overall_w(this.overall.away[i].team_id, events, '2')*3 + this.overall_d(this.overall.away[i].team_id, events, '2')
                        }
                        let self = this
                        this.sortJSON1(self.overall.home, 'points', '123');
                        this.sortJSON1(self.overall.away, 'points', '123');

                        let new_away_table1 = []
                        for(let j = 0 ; j < self.overall.home.length ; j++){
                            let len = self.overall.home.filter(function(item) {
                                return item.points == self.overall.home[j].points
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.overall.home[p] = len[p - j]
                                    new_away_table1.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table1.push(self.overall.home[j])
                            }
                        }
                        self.overall.home = new_away_table1

                        let new_away_table2 = []
                        for(let j = 0 ; j < self.overall.home.length ; j++){
                            let len = self.overall.home.filter(function(item) {
                                return (item.points == self.overall.home[j].points && item.gd == self.overall.home[j].gd)
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'f', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.overall.home[p] = len[p - j]
                                    new_away_table2.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table2.push(self.overall.home[j])
                            }
                        }
                        self.overall.home = new_away_table2

                        let new_away_table = []
                        for(let j = 0 ; j < self.overall.away.length ; j++){
                            let len = self.overall.away.filter(function(item) {
                                return item.points == self.overall.away[j].points
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.overall.away[p] = len[p - j]
                                    new_away_table.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table.push(self.overall.away[j])
                            }
                        }
                        self.overall.away = new_away_table

                        let new_away_table3 = []
                        for(let j = 0 ; j < self.overall.away.length ; j++){
                            let len = self.overall.away.filter(function(item) {
                                return (item.points == self.overall.away[j].points && item.gd == self.overall.away[j].gd)
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'f', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.overall.away[p] = len[p - j]
                                    new_away_table3.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table3.push(self.overall.away[j])
                            }
                        }
                        self.overall.away = new_away_table3

                        for(let j = 0 ; j < self.overall.home.length ; j++){
                            let full_rank_home = this.full_table.filter(function(item) {
                                return item.team_id === self.overall.home[j].team_id;
                            });
                            if(full_rank_home.length > 0){
                                self.overall.home[j].over = this.full_table.indexOf(full_rank_home[0]) - j
                            }

                            let full_rank_away = this.full_table.filter(function(item) {
                                return item.team_id === self.overall.away[j].team_id;
                            });
                            if(full_rank_away.length > 0){
                                self.overall.away[j].over = this.full_table.indexOf(full_rank_away[0]) - j
                            }
                        }
                    })
                }
                if(this.current_type == 6) {
                    this.showModal()
                    window.axios.post(`${process.env.VUE_APP_URL}getLeagueTableEvents`, [ this.current_league[0].season.season_id, this.current_league[0].season.round_id, this.current_league[0].season.stage_id]).then(({data})=> {
                        this.hideModal()
                        let season_data = this.current_league[0].season.standings
                        for (let i = 0; i < season_data.length; i++) {
                            let home_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "home": {
                                    "p": null,
                                    "w": null,
                                    "l": null,
                                    "f": null,
                                    "a": null,
                                },
                                "d": null,
                                "f": null,
                                "points": null,
                                "gd": null,
                            }
                            let away_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "away": {
                                    "p": null,
                                    "w": null,
                                    "l": null,
                                    "f": null,
                                    "a": null,
                                },
                                "d": null,
                                "f": null,
                                "points": null,
                                "gd": null,
                            }
                            home_team_data.team_name = season_data[i].team_name
                            home_team_data.team_id = season_data[i].team_id

                            away_team_data.team_name = season_data[i].team_name
                            away_team_data.team_id = season_data[i].team_id
                            this.form_3_matches.home.push(home_team_data)
                            this.form_3_matches.away.push(away_team_data)
                        }

                        let events = data.data[0]
                        console.log('Events History=>', events)
                        for(let i = 0 ; i < this.form_3_matches.home.length ; i++){
                            this.form_3_matches.home[i].home.p = this.form_3_p(this.form_3_matches.home[i].team_id, events, '1')
                            this.form_3_matches.away[i].away.p = this.form_3_p(this.form_3_matches.away[i].team_id, events, '2')
                            this.form_3_matches.home[i].home.w = this.form_3_w(this.form_3_matches.home[i].team_id, events, '1')
                            this.form_3_matches.away[i].away.w = this.form_3_w(this.form_3_matches.away[i].team_id, events, '2')
                            this.form_3_matches.home[i].d = this.form_3_d(this.form_3_matches.home[i].team_id, events, '1')
                            this.form_3_matches.away[i].d = this.form_3_d(this.form_3_matches.away[i].team_id, events, '2')
                            this.form_3_matches.home[i].home.l = this.form_3_l(this.form_3_matches.home[i].team_id, events, '1')
                            this.form_3_matches.away[i].away.l = this.form_3_l(this.form_3_matches.away[i].team_id, events, '2')
                            this.form_3_matches.home[i].home.f = this.form_3_f(this.form_3_matches.home[i].team_id, events, '1')
                            this.form_3_matches.home[i].f = this.form_3_f(this.form_3_matches.home[i].team_id, events, '1')
                            this.form_3_matches.away[i].away.f = this.form_3_f(this.form_3_matches.away[i].team_id, events, '2')
                            this.form_3_matches.away[i].f = this.form_3_f(this.form_3_matches.away[i].team_id, events, '2')
                            this.form_3_matches.home[i].home.a = this.form_3_a(this.form_3_matches.home[i].team_id, events, '1')
                            this.form_3_matches.away[i].away.a = this.form_3_a(this.form_3_matches.away[i].team_id, events, '2')
                            this.form_3_matches.home[i].gd = this.form_3_matches.home[i].home.f - this.form_3_matches.home[i].home.a
                            this.form_3_matches.away[i].gd = this.form_3_matches.away[i].away.f - this.form_3_matches.away[i].away.a
                            this.form_3_matches.home[i].points = this.form_3_w(this.form_3_matches.home[i].team_id, events, '1')*3 + this.form_3_d(this.form_3_matches.home[i].team_id, events, '1')
                            this.form_3_matches.away[i].points = this.form_3_w(this.form_3_matches.away[i].team_id, events, '2')*3 + this.form_3_d(this.form_3_matches.away[i].team_id, events, '2')
                        }
                        let self = this
                        this.sortJSON1(self.form_3_matches.home, 'points', '123');
                        this.sortJSON1(self.form_3_matches.away, 'points', '123');

                        let new_away_table1 = []
                        for(let j = 0 ; j < self.form_3_matches.home.length ; j++){
                            let len = self.form_3_matches.home.filter(function(item) {
                                return item.points == self.form_3_matches.home[j].points
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.form_3_matches.home[p] = len[p - j]
                                    new_away_table1.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table1.push(self.form_3_matches.home[j])
                            }
                        }
                        self.form_3_matches.home = new_away_table1

                        let new_away_table2 = []
                        for(let j = 0 ; j < self.form_3_matches.home.length ; j++){
                            let len = self.form_3_matches.home.filter(function(item) {
                                return (item.points == self.form_3_matches.home[j].points && item.gd == self.form_3_matches.home[j].gd)
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'f', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.form_3_matches.home[p] = len[p - j]
                                    new_away_table2.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table2.push(self.form_3_matches.home[j])
                            }
                        }
                        self.form_3_matches.home = new_away_table2

                        let new_away_table = []
                        for(let j = 0 ; j < self.form_3_matches.away.length ; j++){
                            let len = self.form_3_matches.away.filter(function(item) {
                                return item.points == self.form_3_matches.away[j].points
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.form_3_matches.away[p] = len[p - j]
                                    new_away_table.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table.push(self.form_3_matches.away[j])
                            }
                        }
                        self.form_3_matches.away = new_away_table

                        let new_away_table3 = []
                        for(let j = 0 ; j < self.form_3_matches.away.length ; j++){
                            let len = self.form_3_matches.away.filter(function(item) {
                                return (item.points == self.form_3_matches.away[j].points && item.gd == self.form_3_matches.away[j].gd)
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'f', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.form_3_matches.away[p] = len[p - j]
                                    new_away_table3.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table3.push(self.form_3_matches.away[j])
                            }
                        }
                        self.form_3_matches.away = new_away_table3

                        for(let j = 0 ; j < self.form_3_matches.home.length ; j++){
                            let full_rank_home = this.full_table.filter(function(item) {
                                return item.team_id === self.form_3_matches.home[j].team_id;
                            });
                            if(full_rank_home.length > 0){
                                self.form_3_matches.home[j].over = this.full_table.indexOf(full_rank_home[0]) - j
                            }

                            let full_rank_away = this.full_table.filter(function(item) {
                                return item.team_id === self.form_3_matches.away[j].team_id;
                            });
                            if(full_rank_away.length > 0){
                                self.form_3_matches.away[j].over = this.full_table.indexOf(full_rank_away[0]) - j
                            }
                        }
                    })
                }
                if(this.current_type == 7) {
                    this.showModal()
                    window.axios.post(`${process.env.VUE_APP_URL}getLeagueTableEvents`, [ this.current_league[0].season.season_id, this.current_league[0].season.round_id, this.current_league[0].season.stage_id]).then(({data})=> {
                        this.hideModal()
                        let season_data = this.current_league[0].season.standings
                        for (let i = 0; i < season_data.length; i++) {
                            let home_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "home": {
                                    "p": null,
                                    "w": null,
                                    "l": null,
                                    "f": null,
                                    "a": null,
                                },
                                "d": null,
                                "f": null,
                                "points": null,
                                "gd": null,
                            }
                            let away_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "away": {
                                    "p": null,
                                    "w": null,
                                    "l": null,
                                    "f": null,
                                    "a": null,
                                },
                                "d": null,
                                "f": null,
                                "points": null,
                                "gd": null,
                            }
                            home_team_data.team_name = season_data[i].team_name
                            home_team_data.team_id = season_data[i].team_id

                            away_team_data.team_name = season_data[i].team_name
                            away_team_data.team_id = season_data[i].team_id
                            this.form_6_matches.home.push(home_team_data)
                            this.form_6_matches.away.push(away_team_data)
                        }

                        let events = data.data[0]
                        console.log('Events History=>', events)
                        for(let i = 0 ; i < this.form_6_matches.home.length ; i++){
                            this.form_6_matches.home[i].home.p = this.form_6_p(this.form_6_matches.home[i].team_id, events, '1')
                            this.form_6_matches.away[i].away.p = this.form_6_p(this.form_6_matches.away[i].team_id, events, '2')
                            this.form_6_matches.home[i].home.w = this.form_6_w(this.form_6_matches.home[i].team_id, events, '1')
                            this.form_6_matches.away[i].away.w = this.form_6_w(this.form_6_matches.away[i].team_id, events, '2')
                            this.form_6_matches.home[i].d = this.form_6_d(this.form_6_matches.home[i].team_id, events, '1')
                            this.form_6_matches.away[i].d = this.form_6_d(this.form_6_matches.away[i].team_id, events, '2')
                            this.form_6_matches.home[i].home.l = this.form_6_l(this.form_6_matches.home[i].team_id, events, '1')
                            this.form_6_matches.away[i].away.l = this.form_6_l(this.form_6_matches.away[i].team_id, events, '2')
                            this.form_6_matches.home[i].home.f = this.form_6_f(this.form_6_matches.home[i].team_id, events, '1')
                            this.form_6_matches.away[i].away.f = this.form_6_f(this.form_6_matches.away[i].team_id, events, '2')
                            this.form_6_matches.home[i].f = this.form_6_f(this.form_6_matches.home[i].team_id, events, '1')
                            this.form_6_matches.away[i].f = this.form_6_f(this.form_6_matches.away[i].team_id, events, '2')
                            this.form_6_matches.home[i].home.a = this.form_6_a(this.form_6_matches.home[i].team_id, events, '1')
                            this.form_6_matches.away[i].away.a = this.form_6_a(this.form_6_matches.away[i].team_id, events, '2')
                            this.form_6_matches.home[i].gd = this.form_6_matches.home[i].home.f - this.form_6_matches.home[i].home.a
                            this.form_6_matches.away[i].gd = this.form_6_matches.away[i].away.f - this.form_6_matches.away[i].away.a
                            this.form_6_matches.home[i].points = this.form_6_w(this.form_6_matches.home[i].team_id, events, '1')*3 + this.form_6_d(this.form_6_matches.home[i].team_id, events, '1')
                            this.form_6_matches.away[i].points = this.form_6_w(this.form_6_matches.away[i].team_id, events, '2')*3 + this.form_6_d(this.form_6_matches.away[i].team_id, events, '2')
                        }
                        let self = this
                        this.sortJSON1(self.form_6_matches.home, 'points', '123');
                        this.sortJSON1(self.form_6_matches.away, 'points', '123');

                        let new_away_table1 = []
                        for(let j = 0 ; j < self.form_6_matches.home.length ; j++){
                            let len = self.form_6_matches.home.filter(function(item) {
                                return item.points == self.form_6_matches.home[j].points
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.form_6_matches.home[p] = len[p - j]
                                    new_away_table1.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table1.push(self.form_6_matches.home[j])
                            }
                        }
                        self.form_6_matches.home = new_away_table1

                        let new_away_table2 = []
                        for(let j = 0 ; j < self.form_6_matches.home.length ; j++){
                            let len = self.form_6_matches.home.filter(function(item) {
                                return (item.points == self.form_6_matches.home[j].points && item.gd == self.form_6_matches.home[j].gd)
                            });
                            if(len.length > 1){
                                console.log("check===>")
                                this.sortJSON1(len,'f', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.form_6_matches.home[p] = len[p - j]
                                    new_away_table2.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table2.push(self.form_6_matches.home[j])
                            }
                        }
                        self.form_6_matches.home = new_away_table2

                        let new_away_table = []
                        for(let j = 0 ; j < self.form_6_matches.away.length ; j++){
                            let len = self.form_6_matches.away.filter(function(item) {
                                return item.points == self.form_6_matches.away[j].points
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.form_6_matches.away[p] = len[p - j]
                                    new_away_table.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table.push(self.form_6_matches.away[j])
                            }
                        }
                        self.form_6_matches.away = new_away_table

                        let new_away_table3 = []
                        for(let j = 0 ; j < self.form_6_matches.away.length ; j++){
                            let len = self.form_6_matches.away.filter(function(item) {
                                return (item.points == self.form_6_matches.away[j].points && item.gd == self.form_6_matches.away[j].gd)
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'f', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.form_6_matches.away[p] = len[p - j]
                                    new_away_table3.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table3.push(self.form_6_matches.away[j])
                            }
                        }
                        self.form_6_matches.away = new_away_table3

                        for(let j = 0 ; j < self.form_6_matches.home.length ; j++){
                            let full_rank_home = this.full_table.filter(function(item) {
                                return item.team_id === self.form_6_matches.home[j].team_id;
                            });
                            if(full_rank_home.length > 0){
                                self.form_6_matches.home[j].over = this.full_table.indexOf(full_rank_home[0]) - j
                            }

                            let full_rank_away = this.full_table.filter(function(item) {
                                return item.team_id === self.form_6_matches.away[j].team_id;
                            });
                            if(full_rank_away.length > 0){
                                self.form_6_matches.away[j].over = this.full_table.indexOf(full_rank_away[0]) - j
                            }
                        }
                    })
                }
                if(this.current_type == 8) {
                    this.showModal()
                    window.axios.post(`${process.env.VUE_APP_URL}getLeagueTableEvents`, [ this.current_league[0].season.season_id, this.current_league[0].season.round_id, this.current_league[0].season.stage_id]).then(({data})=> {
                        this.hideModal()
                        let season_data = this.current_league[0].season.standings
                        for (let i = 0; i < season_data.length; i++) {
                            let home_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "home": {
                                    "p": null,
                                },
                                "av": null,
                                "gd": null,
                                "d": null,
                                "loss_5": null,
                                "loss_4": null,
                                "loss_3": null,
                                "loss_2": null,
                                "loss_1": null,
                                "win_5": null,
                                "win_4": null,
                                "win_3": null,
                                "win_2": null,
                                "win_1": null,
                            }
                            home_team_data.team_name = season_data[i].team_name
                            home_team_data.team_id = season_data[i].team_id
                            this.margin_overall.home.push(home_team_data)
                        }

                        let events = data.data[0]
                        console.log('Events History=>', events)
                        for(let i = 0 ; i < this.margin_overall.home.length ; i++){
                            this.margin_overall.home[i].home.p = this.margin_overall_p(this.margin_overall.home[i].team_id, events, '1')
                            this.margin_overall.home[i].gd = this.margin_overall_f(this.margin_overall.home[i].team_id, events, '1') - this.margin_overall_a(this.margin_overall.home[i].team_id, events, '1')
                            this.margin_overall.home[i].av = (this.margin_overall.home[i].gd/this.margin_overall.home[i].home.p).toFixed(2)
                            this.margin_overall.home[i].d = this.margin_overall_d(this.margin_overall.home[i].team_id, events, '1')
                            this.margin_overall.home[i].loss_5 = this.margin_overall_loss_5(this.margin_overall.home[i].team_id, events, '1')
                            this.margin_overall.home[i].loss_4 = this.margin_overall_loss_4(this.margin_overall.home[i].team_id, events, '1')
                            this.margin_overall.home[i].loss_3 = this.margin_overall_loss_3(this.margin_overall.home[i].team_id, events, '1')
                            this.margin_overall.home[i].loss_2 = this.margin_overall_loss_2(this.margin_overall.home[i].team_id, events, '1')
                            this.margin_overall.home[i].loss_1 = this.margin_overall_loss_1(this.margin_overall.home[i].team_id, events, '1')
                            this.margin_overall.home[i].win_5 = this.margin_overall_win_5(this.margin_overall.home[i].team_id, events, '1')
                            this.margin_overall.home[i].win_4 = this.margin_overall_win_4(this.margin_overall.home[i].team_id, events, '1')
                            this.margin_overall.home[i].win_3 = this.margin_overall_win_3(this.margin_overall.home[i].team_id, events, '1')
                            this.margin_overall.home[i].win_2 = this.margin_overall_win_2(this.margin_overall.home[i].team_id, events, '1')
                            this.margin_overall.home[i].win_1 = this.margin_overall_win_1(this.margin_overall.home[i].team_id, events, '1')
                        }
                        let self = this
                        this.sortJSON1(self.margin_overall.home, 'av', '123');

                        let new_away_table1 = []
                        for(let j = 0 ; j < self.margin_overall.home.length ; j++){
                            let len = self.margin_overall.home.filter(function(item) {
                                return item.points == self.margin_overall.home[j].points
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.margin_overall.home[p] = len[p - j]
                                    new_away_table1.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table1.push(self.margin_overall.home[j])
                            }
                        }
                        self.margin_overall.home = new_away_table1

                        for(let j = 0 ; j < self.margin_overall.home.length ; j++){
                            let full_rank_home = this.full_table.filter(function(item) {
                                return item.team_id === self.margin_overall.home[j].team_id;
                            });
                            if(full_rank_home.length > 0){
                                self.margin_overall.home[j].over = this.full_table.indexOf(full_rank_home[0]) - j
                            }
                        }
                    })
                }
                if(this.current_type == 9) {
                    this.showModal()
                    window.axios.post(`${process.env.VUE_APP_URL}getLeagueTableEvents`, [ this.current_league[0].season.season_id, this.current_league[0].season.round_id, this.current_league[0].season.stage_id]).then(({data})=> {
                        this.hideModal()
                        let season_data = this.current_league[0].season.standings
                        for (let i = 0; i < season_data.length; i++) {
                            let home_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "home": {
                                    "p": null,
                                },
                                "av": null,
                                "gd": null,
                                "d": null,
                                "loss_5": null,
                                "loss_4": null,
                                "loss_3": null,
                                "loss_2": null,
                                "loss_1": null,
                                "win_5": null,
                                "win_4": null,
                                "win_3": null,
                                "win_2": null,
                                "win_1": null,
                            }
                            home_team_data.team_name = season_data[i].team_name
                            home_team_data.team_id = season_data[i].team_id
                            this.margin_home.home.push(home_team_data)
                        }

                        let events = data.data[0]
                        console.log('Events History=>', events)
                        for(let i = 0 ; i < this.margin_home.home.length ; i++){
                            this.margin_home.home[i].home.p = this.margin_overall_p(this.margin_home.home[i].team_id, events, '2')
                            this.margin_home.home[i].gd = this.margin_overall_f(this.margin_home.home[i].team_id, events, '2') - this.margin_overall_a(this.margin_home.home[i].team_id, events, '2')
                            this.margin_home.home[i].av = (this.margin_home.home[i].gd/this.margin_home.home[i].home.p).toFixed(2)
                            this.margin_home.home[i].d = this.margin_overall_d(this.margin_home.home[i].team_id, events, '2')
                            this.margin_home.home[i].loss_5 = this.margin_overall_loss_5(this.margin_home.home[i].team_id, events, '2')
                            this.margin_home.home[i].loss_4 = this.margin_overall_loss_4(this.margin_home.home[i].team_id, events, '2')
                            this.margin_home.home[i].loss_3 = this.margin_overall_loss_3(this.margin_home.home[i].team_id, events, '2')
                            this.margin_home.home[i].loss_2 = this.margin_overall_loss_2(this.margin_home.home[i].team_id, events, '2')
                            this.margin_home.home[i].loss_1 = this.margin_overall_loss_1(this.margin_home.home[i].team_id, events, '2')
                            this.margin_home.home[i].win_5 = this.margin_overall_win_5(this.margin_home.home[i].team_id, events, '2')
                            this.margin_home.home[i].win_4 = this.margin_overall_win_4(this.margin_home.home[i].team_id, events, '2')
                            this.margin_home.home[i].win_3 = this.margin_overall_win_3(this.margin_home.home[i].team_id, events, '2')
                            this.margin_home.home[i].win_2 = this.margin_overall_win_2(this.margin_home.home[i].team_id, events, '2')
                            this.margin_home.home[i].win_1 = this.margin_overall_win_1(this.margin_home.home[i].team_id, events, '2')
                        }
                        let self = this
                        this.sortJSON1(self.margin_home.home, 'av', '123');

                        let new_away_table1 = []
                        for(let j = 0 ; j < self.margin_home.home.length ; j++){
                            let len = self.margin_home.home.filter(function(item) {
                                return item.points == self.margin_home.home[j].points
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.margin_home.home[p] = len[p - j]
                                    new_away_table1.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table1.push(self.margin_home.home[j])
                            }
                        }
                        self.margin_home.home = new_away_table1

                        for(let j = 0 ; j < self.margin_home.home.length ; j++){
                            let full_rank_home = this.full_table.filter(function(item) {
                                return item.team_id === self.margin_home.home[j].team_id;
                            });
                            if(full_rank_home.length > 0){
                                self.margin_home.home[j].over = this.full_table.indexOf(full_rank_home[0]) - j
                            }
                        }
                    })
                }
                if(this.current_type == 10) {
                    this.showModal()
                    window.axios.post(`${process.env.VUE_APP_URL}getLeagueTableEvents`, [ this.current_league[0].season.season_id, this.current_league[0].season.round_id, this.current_league[0].season.stage_id]).then(({data})=> {
                        this.hideModal()
                        let season_data = this.current_league[0].season.standings
                        for (let i = 0; i < season_data.length; i++) {
                            let home_team_data = {
                                "id": this.create_UUID(),
                                "team_name": null,
                                "team_id": null,
                                "over": null,
                                "home": {
                                    "p": null,
                                },
                                "av": null,
                                "gd": null,
                                "d": null,
                                "loss_5": null,
                                "loss_4": null,
                                "loss_3": null,
                                "loss_2": null,
                                "loss_1": null,
                                "win_5": null,
                                "win_4": null,
                                "win_3": null,
                                "win_2": null,
                                "win_1": null,
                            }
                            home_team_data.team_name = season_data[i].team_name
                            home_team_data.team_id = season_data[i].team_id
                            this.margin_away.home.push(home_team_data)
                        }

                        let events = data.data[0]
                        console.log('Events History=>', events)
                        for(let i = 0 ; i < this.margin_away.home.length ; i++){
                            this.margin_away.home[i].home.p = this.margin_overall_p(this.margin_away.home[i].team_id, events, '3')
                            this.margin_away.home[i].gd = this.margin_overall_f(this.margin_away.home[i].team_id, events, '3') - this.margin_overall_a(this.margin_away.home[i].team_id, events, '3')
                            this.margin_away.home[i].av = (this.margin_away.home[i].gd/this.margin_away.home[i].home.p).toFixed(2)
                            this.margin_away.home[i].d = this.margin_overall_d(this.margin_away.home[i].team_id, events, '3')
                            this.margin_away.home[i].loss_5 = this.margin_overall_loss_5(this.margin_away.home[i].team_id, events, '3')
                            this.margin_away.home[i].loss_4 = this.margin_overall_loss_4(this.margin_away.home[i].team_id, events, '3')
                            this.margin_away.home[i].loss_3 = this.margin_overall_loss_3(this.margin_away.home[i].team_id, events, '3')
                            this.margin_away.home[i].loss_2 = this.margin_overall_loss_2(this.margin_away.home[i].team_id, events, '3')
                            this.margin_away.home[i].loss_1 = this.margin_overall_loss_1(this.margin_away.home[i].team_id, events, '3')
                            this.margin_away.home[i].win_5 = this.margin_overall_win_5(this.margin_away.home[i].team_id, events, '3')
                            this.margin_away.home[i].win_4 = this.margin_overall_win_4(this.margin_away.home[i].team_id, events, '3')
                            this.margin_away.home[i].win_3 = this.margin_overall_win_3(this.margin_away.home[i].team_id, events, '3')
                            this.margin_away.home[i].win_2 = this.margin_overall_win_2(this.margin_away.home[i].team_id, events, '3')
                            this.margin_away.home[i].win_1 = this.margin_overall_win_1(this.margin_away.home[i].team_id, events, '3')
                        }
                        let self = this
                        this.sortJSON1(self.margin_away.home, 'av', '123');

                        let new_away_table1 = []
                        for(let j = 0 ; j < self.margin_away.home.length ; j++){
                            let len = self.margin_away.home.filter(function(item) {
                                return item.points == self.margin_away.home[j].points
                            });
                            if(len.length > 1){
                                this.sortJSON1(len,'gd', '123');
                                for(let p = j ; p < j + len.length ; p++){
                                    self.margin_away.home[p] = len[p - j]
                                    new_away_table1.push(len[p - j])
                                }
                                j = j + len.length - 1
                            }
                            else{
                                new_away_table1.push(self.margin_away.home[j])
                            }
                        }
                        self.margin_away.home = new_away_table1

                        for(let j = 0 ; j < self.margin_away.home.length ; j++){
                            let full_rank_home = this.full_table.filter(function(item) {
                                return item.team_id === self.margin_away.home[j].team_id;
                            });
                            if(full_rank_home.length > 0){
                                self.margin_away.home[j].over = this.full_table.indexOf(full_rank_home[0]) - j
                            }
                        }
                    })
                }
                if(this.current_type == 11) {
                    for(let i = 0 ; i < this.full_table.length ; i++){
                        let home_team_data = {
                            "id": this.create_UUID(),
                            "team_name": this.full_table[i].team_name,
                            "team_id": this.full_table[i].team_id,
                            "over": null,
                            "p": this.full_table[i].home.p,
                            "f": this.full_table[i].home.f,
                            "gd": this.full_table[i].home.f - this.full_table[i].home.a,
                            "av": (this.full_table[i].home.f/this.full_table[i].home.p).toFixed(2),
                        }
                        let away_team_data = {
                            "id": this.create_UUID(),
                            "team_name": this.full_table[i].team_name,
                            "team_id": this.full_table[i].team_id,
                            "over": null,
                            "p": this.full_table[i].away.p,
                            "f": this.full_table[i].away.a,
                            "gd": this.full_table[i].away.f - this.full_table[i].away.a,
                            "av": (this.full_table[i].away.a/this.full_table[i].away.p).toFixed(2),
                        }
                        this.home_A_away_D.home.push(home_team_data)
                        this.home_A_away_D.away.push(away_team_data)
                    }
                    let self = this
                    this.sortJSON1(self.home_A_away_D.home, 'av', '123')
                    this.sortJSON(self.home_A_away_D.away, 'av', '123')

                    let new_away_table1 = []
                    for(let j = 0 ; j < self.home_A_away_D.home.length ; j++){
                        let len = self.home_A_away_D.home.filter(function(item) {
                            return item.av == self.home_A_away_D.home[j].av
                        });
                        if(len.length > 1){
                            this.sortJSON1(len,'gd', '123');
                            for(let p = j ; p < j + len.length ; p++){
                                self.home_A_away_D.home[p] = len[p - j]
                                new_away_table1.push(len[p - j])
                            }
                            j = j + len.length - 1
                        }
                        else{
                            new_away_table1.push(self.home_A_away_D.home[j])
                        }
                    }
                    self.home_A_away_D.home = new_away_table1

                    let new_away_table2 = []
                    for(let j = 0 ; j < self.home_A_away_D.home.length ; j++){
                        let len = self.home_A_away_D.home.filter(function(item) {
                            return (item.av == self.home_A_away_D.home[j].av && item.gd == self.home_A_away_D.home[j].gd)
                        });
                        if(len.length > 1){
                            this.sortJSON1(len,'f', '123');
                            for(let p = j ; p < j + len.length ; p++){
                                self.home_A_away_D.home[p] = len[p - j]
                                new_away_table2.push(len[p - j])
                            }
                            j = j + len.length - 1
                        }
                        else{
                            new_away_table2.push(self.home_A_away_D.home[j])
                        }
                    }
                    self.home_A_away_D.home = new_away_table2

                    let new_away_table = []
                    for(let j = 0 ; j < self.home_A_away_D.away.length ; j++){
                        let len = self.home_A_away_D.away.filter(function(item) {
                            return item.av == self.home_A_away_D.away[j].av
                        });
                        if(len.length > 1){
                            this.sortJSON1(len,'gd', '123');
                            for(let p = j ; p < j + len.length ; p++){
                                self.home_A_away_D.away[p] = len[p - j]
                                new_away_table.push(len[p - j])
                            }
                            j = j + len.length - 1
                        }
                        else{
                            new_away_table.push(self.home_A_away_D.away[j])
                        }
                    }
                    self.home_A_away_D.away = new_away_table

                    let new_away_table3 = []
                    for(let j = 0 ; j < self.home_A_away_D.away.length ; j++){
                        let len = self.home_A_away_D.away.filter(function(item) {
                            return (item.av == self.home_A_away_D.away[j].av && item.gd == self.home_A_away_D.away[j].gd)
                        });
                        if(len.length > 1){
                            this.sortJSON(len,'f', '123');
                            for(let p = j ; p < j + len.length ; p++){
                                self.home_A_away_D.away[p] = len[p - j]
                                new_away_table3.push(len[p - j])
                            }
                            j = j + len.length - 1
                        }
                        else{
                            new_away_table3.push(self.home_A_away_D.away[j])
                        }
                    }
                    self.home_A_away_D.away = new_away_table3

                    for(let j = 0 ; j < self.home_A_away_D.home.length ; j++){
                        let full_rank_home = this.full_table.filter(function(item) {
                            return item.team_id === self.home_A_away_D.home[j].team_id;
                        });
                        if(full_rank_home.length > 0){
                            self.home_A_away_D.home[j].over = this.full_table.indexOf(full_rank_home[0]) - j
                        }

                        let full_rank_away = this.full_table.filter(function(item) {
                            return item.team_id === self.home_A_away_D.away[j].team_id;
                        });
                        if(full_rank_away.length > 0){
                            self.home_A_away_D.away[j].over = this.full_table.indexOf(full_rank_away[0]) - j
                        }
                    }

                }
                if(this.current_type == 12) {
                    for(let i = 0 ; i < this.full_table.length ; i++){
                        let home_team_data = {
                            "id": this.create_UUID(),
                            "team_name": this.full_table[i].team_name,
                            "team_id": this.full_table[i].team_id,
                            "over": null,
                            "p": this.full_table[i].home.p,
                            "f": this.full_table[i].home.a,
                            "gd": this.full_table[i].home.f - this.full_table[i].home.a,
                            "av": (this.full_table[i].home.a/this.full_table[i].home.p).toFixed(2),
                        }
                        let away_team_data = {
                            "id": this.create_UUID(),
                            "team_name": this.full_table[i].team_name,
                            "team_id": this.full_table[i].team_id,
                            "over": null,
                            "p": this.full_table[i].away.p,
                            "f": this.full_table[i].away.f,
                            "gd": this.full_table[i].away.f - this.full_table[i].away.a,
                            "av": (this.full_table[i].away.f/this.full_table[i].away.p).toFixed(2),
                        }
                        this.home_D_away_A.home.push(home_team_data)
                        this.home_D_away_A.away.push(away_team_data)
                    }
                    let self = this
                    this.sortJSON(self.home_D_away_A.home, 'av', '123')
                    this.sortJSON1(self.home_D_away_A.away, 'av', '123')

                    let new_away_table1 = []
                    for(let j = 0 ; j < self.home_D_away_A.home.length ; j++){
                        let len = self.home_D_away_A.home.filter(function(item) {
                            return item.av == self.home_D_away_A.home[j].av
                        });
                        if(len.length > 1){
                            this.sortJSON1(len,'gd', '123');
                            for(let p = j ; p < j + len.length ; p++){
                                self.home_D_away_A.home[p] = len[p - j]
                                new_away_table1.push(len[p - j])
                            }
                            j = j + len.length - 1
                        }
                        else{
                            new_away_table1.push(self.home_D_away_A.home[j])
                        }
                    }
                    self.home_D_away_A.home = new_away_table1

                    let new_away_table2 = []
                    for(let j = 0 ; j < self.home_D_away_A.home.length ; j++){
                        let len = self.home_D_away_A.home.filter(function(item) {
                            return (item.av == self.home_D_away_A.home[j].av && item.gd == self.home_D_away_A.home[j].gd)
                        });
                        if(len.length > 1){
                            this.sortJSON1(len,'f', '123');
                            for(let p = j ; p < j + len.length ; p++){
                                self.home_D_away_A.home[p] = len[p - j]
                                new_away_table2.push(len[p - j])
                            }
                            j = j + len.length - 1
                        }
                        else{
                            new_away_table2.push(self.home_D_away_A.home[j])
                        }
                    }
                    self.home_D_away_A.home = new_away_table2

                    let new_away_table = []
                    for(let j = 0 ; j < self.home_D_away_A.away.length ; j++){
                        let len = self.home_D_away_A.away.filter(function(item) {
                            return item.av == self.home_D_away_A.away[j].av
                        });
                        if(len.length > 1){
                            this.sortJSON1(len,'gd', '123');
                            for(let p = j ; p < j + len.length ; p++){
                                self.home_D_away_A.away[p] = len[p - j]
                                new_away_table.push(len[p - j])
                            }
                            j = j + len.length - 1
                        }
                        else{
                            new_away_table.push(self.home_D_away_A.away[j])
                        }
                    }
                    self.home_D_away_A.away = new_away_table

                    let new_away_table3 = []
                    for(let j = 0 ; j < self.home_D_away_A.away.length ; j++){
                        let len = self.home_D_away_A.away.filter(function(item) {
                            return (item.av == self.home_D_away_A.away[j].av && item.gd == self.home_D_away_A.away[j].gd)
                        });
                        if(len.length > 1){
                            this.sortJSON(len,'f', '123');
                            for(let p = j ; p < j + len.length ; p++){
                                self.home_D_away_A.away[p] = len[p - j]
                                new_away_table3.push(len[p - j])
                            }
                            j = j + len.length - 1
                        }
                        else{
                            new_away_table3.push(self.home_D_away_A.away[j])
                        }
                    }
                    self.home_D_away_A.away = new_away_table3

                    for(let j = 0 ; j < self.home_D_away_A.home.length ; j++){
                        let full_rank_home = this.full_table.filter(function(item) {
                            return item.team_id === self.home_D_away_A.home[j].team_id;
                        });
                        if(full_rank_home.length > 0){
                            self.home_D_away_A.home[j].over = this.full_table.indexOf(full_rank_home[0]) - j
                        }

                        let full_rank_away = this.full_table.filter(function(item) {
                            return item.team_id === self.home_D_away_A.away[j].team_id;
                        });
                        if(full_rank_away.length > 0){
                            self.home_D_away_A.away[j].over = this.full_table.indexOf(full_rank_away[0]) - j
                        }
                    }

                }
            },
            first_half_p(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                p++
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            first_half_w(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && local_score > visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && local_score < visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            first_half_d(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && local_score == visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && local_score == visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            first_half_l(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && local_score < visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && local_score > visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            first_half_f(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                if(events[i].events[j].localteamId == team_id){
                                    p += local_score
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id){
                                    p += visitor_score
                                }
                            }
                        }
                    }
                }
                return p
            },
            first_half_a(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let visitor_score = parseInt(events[i].events[j].hf_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id){
                                    p += visitor_score
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].hf_score != null){
                                let local_score = parseInt(events[i].events[j].hf_score.split("-")[0])
                                if(events[i].events[j].visitorteamId == team_id){
                                    p += local_score
                                }
                            }
                        }
                    }
                }
                return p
            },

            second_half_p(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                p++
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            second_half_w(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let local_score = local_score1 - local_score2
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].localteamId == team_id && local_score > visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let local_score = local_score1 - local_score2
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].visitorteamId == team_id && local_score < visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            second_half_d(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let local_score = local_score1 - local_score2
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].localteamId == team_id && local_score == visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let local_score = local_score1 - local_score2
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].visitorteamId == team_id && local_score == visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            second_half_l(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let local_score = local_score1 - local_score2
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].localteamId == team_id && local_score < visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let local_score = local_score1 - local_score2
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].visitorteamId == team_id && local_score > visitor_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            second_half_f(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let local_score = local_score1 - local_score2
                                if(events[i].events[j].localteamId == team_id){
                                    p += local_score
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].visitorteamId == team_id){
                                    p += visitor_score
                                }
                            }
                        }
                    }
                }
                return p
            },
            second_half_a(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let visitor_score1 = parseInt(events[i].events[j].ft_score.split("-")[1])
                                let visitor_score2 = parseInt(events[i].events[j].hf_score.split("-")[1])
                                let visitor_score = visitor_score1 - visitor_score2
                                if(events[i].events[j].localteamId == team_id){
                                    p += visitor_score
                                }
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null && events[i].events[j].hf_score != null){
                                let local_score1 = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let local_score2 = parseInt(events[i].events[j].hf_score.split("-")[0])
                                let local_score = local_score1 - local_score2
                                if(events[i].events[j].visitorteamId == team_id){
                                    p += local_score
                                }
                            }
                        }
                    }
                }
                return p
            },

            overall_p(team_id, events, d){
                let p = 0
                let new_event_arr = []
                for(let i = 0 ; i < events.length ; i++){
                    for(let j = 0 ; j < events[i].events.length ; j++){
                        if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                            new_event_arr.push(events[i].events[j])
                        }
                    }
                }
                this.sortJSON1(new_event_arr,'date', '123');
                if(d === '1'){
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        if(p > 5){ break }
                        p++
                    }
                }
                else{
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        if(p > 11){ break }
                        p++
                    }
                }
                return p
            },
            overall_w(team_id, events, d){
                let p = 0
                let new_event_arr = []
                for(let i = 0 ; i < events.length ; i++){
                    for(let j = 0 ; j < events[i].events.length ; j++){
                        if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                            new_event_arr.push(events[i].events[j])
                        }
                    }
                }
                this.sortJSON1(new_event_arr,'date', '123');
                let p1 = 0
                if(d === '1'){
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 6){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if((new_event_arr[i].localteamId == team_id && local_score > visitor_score) || (new_event_arr[i].visitorteamId == team_id && local_score < visitor_score)){
                                p++
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 12){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if((new_event_arr[i].localteamId == team_id && local_score > visitor_score) || (new_event_arr[i].visitorteamId == team_id && local_score < visitor_score)){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            overall_d(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                for(let i = 0 ; i < events.length ; i++){
                    for(let j = 0 ; j < events[i].events.length ; j++){
                        if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                            new_event_arr.push(events[i].events[j])
                        }
                    }
                }
                this.sortJSON1(new_event_arr,'date', '123');
                if(d === '1'){
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 6){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if(local_score == visitor_score){
                                p++
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 12){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if(local_score == visitor_score){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            overall_l(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                for(let i = 0 ; i < events.length ; i++){
                    for(let j = 0 ; j < events[i].events.length ; j++){
                        if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                            new_event_arr.push(events[i].events[j])
                        }
                    }
                }
                this.sortJSON1(new_event_arr,'date', '123');
                if(d === '1'){
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 6){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if((new_event_arr[i].localteamId == team_id && local_score < visitor_score) || (new_event_arr[i].visitorteamId == team_id && local_score > visitor_score)){
                                p++
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 12){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if((new_event_arr[i].localteamId == team_id && local_score < visitor_score) || (new_event_arr[i].visitorteamId == team_id && local_score > visitor_score)){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            overall_f(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                for(let i = 0 ; i < events.length ; i++){
                    for(let j = 0 ; j < events[i].events.length ; j++){
                        if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                            new_event_arr.push(events[i].events[j])
                        }
                    }
                }
                this.sortJSON1(new_event_arr,'date', '123');
                if(d === '1'){
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 6){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if(new_event_arr[i].localteamId == team_id){
                                p += local_score
                            }
                            if(new_event_arr[i].visitorteamId == team_id){
                                p += visitor_score
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p > 12){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if(new_event_arr[i].localteamId == team_id){
                                p += local_score
                            }
                            if(new_event_arr[i].visitorteamId == team_id){
                                p += visitor_score
                            }
                        }
                    }
                }
                return p
            },
            overall_a(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                for(let i = 0 ; i < events.length ; i++){
                    for(let j = 0 ; j < events[i].events.length ; j++){
                        if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                            new_event_arr.push(events[i].events[j])
                        }
                    }
                }
                this.sortJSON1(new_event_arr,'date', '123');
                if(d === '1'){
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 6){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if(new_event_arr[i].localteamId == team_id){
                                p += visitor_score
                            }
                            if(new_event_arr[i].visitorteamId == team_id){
                                p += local_score
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < new_event_arr.length ; i++){
                        p1++
                        if(p1 > 12){ break }
                        if(new_event_arr[i].ft_score != null){
                            let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                            let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                            if(new_event_arr[i].localteamId == team_id){
                                p += visitor_score
                            }
                            if(new_event_arr[i].visitorteamId == team_id){
                                p += local_score
                            }
                        }
                    }
                }
                return p
            },

            form_3_p(team_id, events, d){
                let p = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    if(p > 2){ break }
                    p++
                }
                return p
            },
            form_3_w(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 3){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id && local_score > visitor_score){
                                p++
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id && local_score < visitor_score){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            form_3_d(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 3){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id && local_score == visitor_score){
                                p++
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id && local_score == visitor_score){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            form_3_l(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 3){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id && local_score < visitor_score){
                                p++
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id && local_score > visitor_score){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            form_3_f(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 3){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id){
                                p+=local_score
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id){
                                p+=visitor_score
                            }
                        }
                    }
                }
                return p
            },
            form_3_a(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 3){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id){
                                p+=visitor_score
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id){
                                p+=local_score
                            }
                        }
                    }
                }
                return p
            },

            form_6_p(team_id, events, d){
                let p = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    if(p > 5){ break }
                    p++
                }
                return p
            },
            form_6_w(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 6){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id && local_score > visitor_score){
                                p++
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id && local_score < visitor_score){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            form_6_d(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 6){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id && local_score == visitor_score){
                                p++
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id && local_score == visitor_score){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            form_6_l(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 6){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id && local_score < visitor_score){
                                p++
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id && local_score > visitor_score){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            form_6_f(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 6){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id){
                                p+=local_score
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id){
                                p+=visitor_score
                            }
                        }
                    }
                }
                return p
            },
            form_6_a(team_id, events, d){
                let p = 0
                let p1 = 0
                let new_event_arr = []
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }
                else{
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                new_event_arr.push(events[i].events[j])
                            }
                        }
                    }
                }

                this.sortJSON1(new_event_arr,'date', '123');
                for(let i = 0 ; i < new_event_arr.length ; i++){
                    p1++
                    if(p1 > 6){ break }
                    if(new_event_arr[i].ft_score != null){
                        let local_score = parseInt(new_event_arr[i].ft_score.split("-")[0])
                        let visitor_score = parseInt(new_event_arr[i].ft_score.split("-")[1])
                        if(d === '1'){
                            if(new_event_arr[i].localteamId == team_id){
                                p+=visitor_score
                            }
                        }
                        else{
                            if(new_event_arr[i].visitorteamId == team_id){
                                p+=local_score
                            }
                        }
                    }
                }
                return p
            },

            margin_overall_p(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                p++
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id){
                                p++
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].visitorteamId == team_id){
                                p++
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_f(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id){
                                        p+=local_score
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id){
                                        p+=visitor_score
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                if(events[i].events[j].localteamId == team_id){
                                    p+=local_score
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id){
                                    p+=visitor_score
                                }
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_a(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id){
                                        p+=visitor_score
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id){
                                        p+=local_score
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id){
                                    p+=visitor_score
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                if(events[i].events[j].visitorteamId == team_id){
                                    p+=local_score
                                }
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_loss_5(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id && visitor_score > local_score && visitor_score >= 5){
                                        p++
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id && visitor_score < local_score && local_score >= 5){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && visitor_score > local_score && visitor_score >= 5){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && visitor_score < local_score && local_score >= 5){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_loss_4(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id && visitor_score > local_score && visitor_score == 4){
                                        p++
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id && visitor_score < local_score && local_score == 4){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && visitor_score > local_score && visitor_score == 4){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && visitor_score < local_score && local_score == 4){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_loss_3(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id && visitor_score > local_score && visitor_score == 3){
                                        p++
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id && visitor_score < local_score && local_score == 3){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && visitor_score > local_score && visitor_score == 3){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && visitor_score < local_score && local_score == 3){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_loss_2(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id && visitor_score > local_score && visitor_score == 2){
                                        p++
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id && visitor_score < local_score && local_score == 2){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && visitor_score > local_score && visitor_score == 2){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && visitor_score < local_score && local_score == 2){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_loss_1(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id && visitor_score > local_score && visitor_score == 1){
                                        p++
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id && visitor_score < local_score && local_score == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && visitor_score > local_score && visitor_score == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && visitor_score < local_score && local_score == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_d(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id && visitor_score == local_score){
                                        p++
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id && visitor_score == local_score){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && visitor_score == local_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && visitor_score == local_score){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_win_5(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id && visitor_score < local_score && local_score >= 5){
                                        p++
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id && visitor_score > local_score && visitor_score >= 5){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && visitor_score < local_score && local_score >= 5){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && visitor_score > local_score && visitor_score >= 5){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_win_4(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id && visitor_score < local_score && local_score == 4){
                                        p++
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id && visitor_score > local_score && visitor_score == 4){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && visitor_score < local_score && local_score == 4){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && visitor_score > local_score && visitor_score == 4){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_win_3(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id && visitor_score < local_score && local_score == 3){
                                        p++
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id && visitor_score > local_score && visitor_score == 3){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && visitor_score < local_score && local_score == 3){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && visitor_score > local_score && visitor_score == 3){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_win_2(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id && visitor_score < local_score && local_score == 2){
                                        p++
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id && visitor_score > local_score && visitor_score == 2){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && visitor_score < local_score && local_score == 2){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && visitor_score > local_score && visitor_score == 2){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },
            margin_overall_win_1(team_id, events, d){
                let p = 0
                if(d === '1'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].localteamId == team_id || events[i].events[j].visitorteamId == team_id){
                                if(events[i].events[j].ft_score != null) {
                                    let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                    let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                    if(events[i].events[j].localteamId == team_id && visitor_score < local_score && local_score == 1){
                                        p++
                                    }
                                    else if(events[i].events[j].visitorteamId == team_id && visitor_score > local_score && visitor_score == 1){
                                        p++
                                    }
                                }
                            }
                        }
                    }
                }
                else if(d === '2'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].localteamId == team_id && visitor_score < local_score && local_score == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                else if(d === '3'){
                    for(let i = 0 ; i < events.length ; i++){
                        for(let j = 0 ; j < events[i].events.length ; j++){
                            if(events[i].events[j].ft_score != null) {
                                let local_score = parseInt(events[i].events[j].ft_score.split("-")[0])
                                let visitor_score = parseInt(events[i].events[j].ft_score.split("-")[1])
                                if(events[i].events[j].visitorteamId == team_id && visitor_score > local_score && visitor_score == 1){
                                    p++
                                }
                            }
                        }
                    }
                }
                return p
            },

            typeofdata_filter(val){
                console.log("type log=>", val)
                this.current_type = val
                let self = this
                this.league_filter(self.current_league_id)
            },
            readData(){
                this.current_league_value = 1000
                window.axios.post(`${process.env.VUE_APP_URL}getLeagueTable`).then(({data})=> {
                    let standing = data.data[0]
                    this.league_map = data.data[1]
                    console.log('standing=>', standing)
                    console.log('leagueMap=>', this.league_map)
                    let new_standing = []
                    let league_list = []
                    for(let i = 0 ; i < standing.length ; i++){
                        let check = 0
                        for(let j = 0 ; j < standing[i].standings.length ; j++){
                            if(standing[i].standings[j].standings){
                                check = 1
                                standing[i].standings[j].standings = standing[i].standings[j].standings.data
                                new_standing.push(standing[i].standings[j])
                            }
                        }
                        if(check == 0){
                            new_standing.push(standing[i])
                            
                        }

                        
                    }
                    this.standingList = new_standing

                    for(let i = 0 ; i < new_standing.length ; i++){
                        let league_name = ""
                        league_name = this.league_map.filter(function(item) {
                            return item.id == new_standing[i].league_id;
                        });
                        let seasons = []
                        seasons = new_standing.filter(function(item) {
                            return item.league_id == new_standing[i].league_id;
                        });
                        this.sortJSON(seasons,'season_id', '123');
                        if(league_name.length > 0){
                            league_name = league_name[0].league
                        }
                        
                        league_list.push({"value": this.create_UUID(), "league_id": new_standing[i].league_id,"label": league_name + " - " + new_standing[i].name, "league_name": league_name, "stage_name": new_standing[i].stage_name, "season": new_standing[i]})
                    }
                    
                    
                    for(let i = 0 ; i < league_list.length ; i++){
                        for(let j = 0 ; j < league_list.length ; j++){
                            if(i != j && league_list[i].season.league_id == league_list[j].season.league_id && league_list[i].season.round_id == league_list[j].season.round_id && league_list[i].season.name == league_list[j].season.name){
                                let index = league_list.indexOf(league_list[i]);
                                if (index > -1) {
                                    league_list.splice(index, 1);
                                    if(i > 0){
                                        i = i - 1;
                                        break
                                    }
                                }
                            }
                        }
                    }
                    

                    for(let i = 0 ; i < league_list.length ; i++){ 
                        
                        let item = league_list[i].label.split("(")[1]
                        let item1 = league_list[i].label.split("(")[0]
                        let item2 = item.split(")")[1]
                        league_list[i].label = item.split(")")[0] + ' - ' + item1 + item2
                    }
                    this.sortJSON(league_list, 'label', '123')
                    league_list.unshift({"value": 1000, "label": "Select League..."});
                    this.league_list = league_list
                    console.log('league_list=>', league_list)
                })
            },
            sortJSON(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            },
            sortJSON1(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                });
            }
        },
        created() {
            this.readData()
        }
    }
</script>
<style scoped>
    .selector{
        width: 100%;
        float: left;
        margin-bottom: 10px;
    }
    .selector .form-group{
        width: 300px!important;
    }
    .league-table-container{
        clear: left;
    }
    .header div{
        background: #dff0d8;
    }
</style>
