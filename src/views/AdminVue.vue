<template>
    <div>
        <CRow>
            <CCol md="12">
                <CCard>
                    <CCardHeader>
                        Opozioni Admin
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                                class="mb-0 table-outline"
                                hover
                                :items="tableItems"
                                :fields="tableFields"
                                head-color="light"
                                no-sorting
                        >
                            <td slot="mode" slot-scope="{item}">
                                <div>{{item.mode.name}}</div>
                            </td>

                            <td slot="facile" slot-scope="{item}" class="table-cell">
                                <div class="clearfix">
                                    <div class="float-left">
                                        <CInput type="number" min="-1" :value="item.facile.value" @click="mode = item.mode.name" @update:value="saveTable1" class="facile"></CInput>
                                        <span v-if="item.mode.name != 'MG' && item.mode.name != 'Special min'" style="position: relative; top: 6px; left: 4px;">%</span>
                                    </div>
                                </div>
                            </td>
                            <td
                                slot="medio"
                                 slot-scope="{item}"
                                class="table-cell"
                            >
                                <div class="float-left">
                                    <CInput v-if="item.mode.name != 'Special %' && item.mode.name != 'Special min'" type="number" min="-1" :value="item.medio.value" @click="mode = item.mode.name" @update:value="saveTable2" class="facile"></CInput>
                                    <span v-if="item.mode.name != 'Special %' && item.mode.name != 'MG' && item.mode.name != 'Special min'" style="position: relative; top: 6px; left: 4px;">%</span>
                                </div>
                            </td>
                            <td slot="elevato" slot-scope="{item}" class="table-cell">
                                <div class="float-left">
                                    <CInput v-if="item.mode.name != 'Special %' && item.mode.name != 'Special min'" type="number" min="-1" :value="item.elevato.value" @click="mode = item.mode.name" @update:value="saveTable3" class="facile"></CInput>
                                    <span v-if="item.mode.name != 'Special %' && item.mode.name != 'MG' && item.mode.name != 'Special min'" style="position: relative; top: 6px; left: 4px;">%</span>
                                </div>
                            </td>
                        </CDataTable>
                        <div style="height: 30px;">

                        </div>
                        <div style="height: 400px;">
                            <CInput type="text" :value="alert_name"  @update:value="update_alert_name" class="facile" placeholder="Enter the alert name123..."></CInput>
                            <div style="float: left; margin-left: 50px;">
                                <CButton
                                        color="info"
                                        class="sm-0"
                                        size="sm"
                                        @click="add_alert_name"
                                >
                                    Add Alert Name
                                </CButton>
                            </div>

                            <div style="clear: left; border-bottom: 1px solid lightgray; width: 300px; overflow-y: scroll; max-height: 350px;">
                                <div v-for="item1 in alert_name_list" :key="item1.id" style="border: 1px solid lightgray; padding: 5px; width: 300px;">
                                    <div style="float:left; width: 200px; padding-top: 4px; padding-left: 10px;">{{item1.value}}</div>
                                    <CButton
                                            color="danger"
                                            size="sm"
                                            @click="deleteAlertName(item1.id)"
                                    >
                                        delete
                                    </CButton>
                                </div>
                            </div>
                        </div>

                        <CButton
                            color="info"
                            class="m-2"
                            @click="addrow"
                        >
                            Add Row
                        </CButton>
                        <CDataTable
                                class="mb-0 table-outline condition_table"
                                hover
                                :items="table_conditions"
                                :fields="conditions_fields"
                                head-color="light"
                                no-sorting
                        >
                            <td slot="adminMode" slot-scope="{item}" class="table-cell">
                                <CInputCheckbox
                                    class="check-box0 trading-mode"
                                    @click="con_key = item._key.value"
                                    @update:checked="admin_mode_save"
                                    :checked = "item.adminMode.value"
                                >
                                </CInputCheckbox>
                            </td>
                            <td slot="PredType" slot-scope="{item}" class="predictionType">
                                <CSelect :value.sync = "item.PredType.value" :options="pred_type_list" @click="con_key = item._key.value" @update:value="save_pred"></CSelect>
                            </td>
                            <td slot="minOddpre" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.minOddpre.value" @click="cond = item.minOddpre.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="maxOddpre" slot-scope="{item}" class="table-cell"
                            >
                                <CInput type="number" min="-1" :value="item.maxOddpre.value" @click="cond = item.maxOddpre.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="minOddlive" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.minOddlive.value" @click="cond = item.minOddlive.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="maxoddlive" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.maxoddlive.value" @click="cond = item.maxoddlive.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="min_score_home" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_score_home.value" @click="cond = item.min_score_home.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="max_score_home" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_score_home.value" @click="cond = item.max_score_home.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="min_score_away" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_score_away.value" @click="cond = item.min_score_away.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="max_score_away" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_score_away.value" @click="cond = item.max_score_away.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="min_total_goal" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_total_goal.value" @click="cond = item.min_total_goal.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="max_total_goal" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_total_goal.value" @click="cond = item.max_total_goal.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="min_time" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_time.value" @click="cond = item.min_time.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="max_time" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_time.value" @click="cond = item.max_time.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="MatchStatus" slot-scope="{item}" class="table-cell">
                                <CSelect :value.sync = "item.MatchStatus.value" :options="statusList" @click="con_key = item._key.value" @update:value="save_status"></CSelect>
                            </td>
                            <td slot="Alert_Name" slot-scope="{item}" class="table-cell">

                                <CSelect :value.sync = "item.Alert_Name.value" :options="alert_name_list" @click="con_key = item._key.value" @update:value="save_alert_name"></CSelect>
                            </td>
                            <td slot="min_on_home" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_on_home.value" @click="cond = item.min_on_home.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="max_on_home" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_on_home.value" @click="cond = item.max_on_home.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="min_off_home" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_off_home.value" @click="cond = item.min_off_home.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="max_off_home" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_off_home.value" @click="cond = item.max_off_home.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="min_on_away" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_on_away.value" @click="cond = item.min_on_away.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="max_on_away" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_on_away.value" @click="cond = item.max_on_away.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="min_off_away" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_off_away.value" @click="cond = item.min_off_away.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="max_off_away" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_off_away.value" @click="cond = item.max_off_away.name, con_key = item._key.value" @update:value="saveCond" class="facile"></CInput>
                            </td>
                            <td slot="switch_btn" slot-scope="{item}" class="table-cell">
                                <CSelect :value.sync = "item.switch_btn.value" :options="switch_list" @click="con_key = item._key.value" @update:value="save_switch"></CSelect>
                            </td>
                            <td slot="hold_on" slot-scope="{item}" class="table-cell">
                                <CSelect :value.sync = "item.hold_on.value" :options="switch_list" @click="con_key = item._key.value" @update:value="save_holdOn"></CSelect>
                            </td>
                            <td slot="deleteBtn" slot-scope="{item}" class="table-cell">
                                <CButton
                                    color="danger"
                                    @click="deleteRow(item._key)"
                                >
                                    delete
                                </CButton>
                            </td>
                        </CDataTable>

                        <CButton
                                color="info"
                                class="m-2"
                                @click="addrow1"
                        >
                            Add Row
                        </CButton>
                        <CDataTable
                                class="mb-0 table-outline condition_table"
                                hover
                                :items="table_conditions1"
                                :fields="conditions_fields1"
                                head-color="light"
                                no-sorting
                        >
                            <td slot="PredType" slot-scope="{item}" class="predictionType">
                                <CSelect :value.sync = "item.PredType.value" :options="pred_type_list" @click="con_key1 = item._key.value" @update:value="save_pred1"></CSelect>
                            </td>
                            <td slot="minOddpre" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.minOddpre.value" @click="cond1 = item.minOddpre.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="maxOddpre" slot-scope="{item}" class="table-cell"
                            >
                                <CInput type="number" min="-1" :value="item.maxOddpre.value" @click="cond1 = item.maxOddpre.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="minOddlive" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.minOddlive.value" @click="cond1 = item.minOddlive.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="maxoddlive" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.maxoddlive.value" @click="cond1 = item.maxoddlive.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="min_score_home" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_score_home.value" @click="cond1 = item.min_score_home.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="max_score_home" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_score_home.value" @click="cond1 = item.max_score_home.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="min_score_away" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_score_away.value" @click="cond1 = item.min_score_away.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="max_score_away" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_score_away.value" @click="cond1 = item.max_score_away.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="min_total_goal" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_total_goal.value" @click="cond1 = item.min_total_goal.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="max_total_goal" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_total_goal.value" @click="cond1 = item.max_total_goal.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="min_time" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_time.value" @click="cond1 = item.min_time.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="max_time" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_time.value" @click="cond1 = item.max_time.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="MatchStatus" slot-scope="{item}" class="table-cell">
                                <CSelect :value.sync = "item.MatchStatus.value" :options="statusList" @click="con_key1 = item._key.value" @update:value="save_status1"></CSelect>
                            </td>
                            <td slot="Alert_Name" slot-scope="{item}" class="table-cell">

                                <CSelect :value.sync = "item.Alert_Name.value" :options="alert_name_list" @click="con_key1 = item._key.value" @update:value="save_alert_name1"></CSelect>
                            </td>
                            <td slot="min_on_home" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_on_home.value" @click="cond1 = item.min_on_home.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="max_on_home" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_on_home.value" @click="cond1 = item.max_on_home.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="min_off_home" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_off_home.value" @click="cond1 = item.min_off_home.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="max_off_home" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_off_home.value" @click="cond1 = item.max_off_home.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="min_on_away" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_on_away.value" @click="cond1 = item.min_on_away.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="max_on_away" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_on_away.value" @click="cond1 = item.max_on_away.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="min_off_away" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_off_away.value" @click="cond1 = item.min_off_away.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="max_off_away" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_off_away.value" @click="cond1 = item.max_off_away.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="min_profit" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.min_profit.value" @click="cond1 = item.min_profit.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="max_profit" slot-scope="{item}" class="table-cell">
                                <CInput type="number" min="-1" :value="item.max_profit.value" @click="cond1 = item.max_profit.name, con_key1 = item._key.value" @update:value="saveCond1" class="facile"></CInput>
                            </td>
                            <td slot="stop_loss" slot-scope="{item}" class="table-cell">
                                <CInputCheckbox
                                    class="check-box0 trading-mode"
                                    @click="con_key1 = item._key.value"
                                    @update:checked="stop_loss_save"
                                    :checked = "item.stop_loss.value"
                                >
                                </CInputCheckbox>
                            </td>
                            <td slot="tradingMode" slot-scope="{item}" class="table-cell">
                                <CInputCheckbox
                                    class="check-box0 trading-mode"
                                    @click="con_key1 = item._key.value"
                                    @update:checked="trading_mode_save"
                                    :checked = "item.tradingMode.value"
                                >
                                </CInputCheckbox>
                            </td>
                            <td slot="deleteBtn" slot-scope="{item}" class="table-cell">
                                <CButton
                                        color="danger"
                                        @click="deleteRow1(item._key)"
                                >
                                    delete
                                </CButton>
                            </td>
                        </CDataTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>

    export default {
        name: 'Dashboard',
        components: {
        },
        data () {
            return {
                alert_name: "",

                pred_type_list:[
                    {"value": 10, "label": "- 1 - Lay"},
                    {"value": 1, "label": "- X - Lay"},
                    {"value": 2, "label": "- 2 - Lay"},
                    {"value": 3, "label": "- X - Back"},
                    {"value": 4, "label": "- O 0.5 - Back"},
                    {"value": 5, "label": "- O 1.5 - Back"},
                    {"value": 6, "label": "- O 2.5 - Back"},
                    {"value": 7, "label": "- U 2.5 - Back"},
                    {"value": 8, "label": "- U 3.5 - Back"}
                ],
                statusList:[
                    {"value": 0, "label": "All status"},
                    {"value": 1, "label": "Live"},
                    {"value": 2, "label": "Pre match"}
                ],
                selected: 'Month',
                tableItems: [
                    {
                        mode: { name: 'GN'},
                        facile: { value: 10},
                        medio:{value: 20},
                        elevato:{value: 30},
                    },
                    {
                        mode: { name: 'GT'},
                        facile: { value: 3},
                        medio:{value: 5},
                        elevato:{value: 10},
                    },
                    {
                        mode: { name: 'MG'},
                        facile: { value: 10},
                        medio:{value: 30},
                        elevato:{value: 60},
                    },
                    {
                        mode: { name: 'SLN'},
                        facile: { value: 30},
                        medio:{value: 60},
                        elevato:{value: 91},
                    },
                    {
                        mode: { name: 'SLT'},
                        facile: { value: 9},
                        medio:{value: 15},
                        elevato:{value: 30},
                    },
                    {
                        mode: { name: 'Special %'},
                        facile: { value: 10},
                        medio:{value: 0},
                        elevato:{value: 0},
                    },
                    {
                        mode: { name: 'Special min'},
                        facile: { value: 45},
                        medio:{value: 0},
                        elevato:{value: 0},
                    }
                ],
                tableFields: [
                    { key: 'mode', label:  ''},
                    { key: 'facile', label: 'Facile', _classes: 'table-success'},
                    { key: 'medio', label: 'Medio', _classes: 'table-warning'},
                    { key: 'elevato', label: 'Elevato',_classes: 'table-danger'  },
                ],
                mode:'',
                cond: '',
                con_key: '',
                cond1: '',
                con_key1: '',
                adminTable:{
                    facile:{
                        'GN': 10,
                        'GT': 3,
                        'MG': 10,
                        'SLN': 30,
                        'SLT': 9,
                        'Special1': 10,
                        'Special2': 45
                    },
                    medio:{
                        'GN': 20,
                        'GT': 5,
                        'MG': 30,
                        'SLN': 60,
                        'SLT': 15,
                    },
                    elevato:{
                        'GN': 30,
                        'GT': 10,
                        'MG': 60,
                        'SLN': 91,
                        'SLT': 30,
                    }
                },
                newRow: {
                    _key: {name: "key", value: null},
                    adminMode: {name:"adminMode", value: false},
                    PredType: {name: "PredType", value: 10},
                    minOddpre: {name: "minOddpre", value: null},
                    maxOddpre:{name: "maxOddpre", value: null},
                    minOddlive:{name: "minOddlive", value: null},
                    maxoddlive: {name: "maxoddlive", value: null},
                    min_score_home: {name: "min_score_home", value: null},
                    max_score_home: {name: "max_score_home", value: null},
                    min_score_away:{name: "min_score_away", value: null},
                    max_score_away:{name: "max_score_away", value: null},
                    min_total_goal:{name: "min_total_goal", value: null},
                    max_total_goal:{name: "max_total_goal", value: null},
                    min_time:{name: "min_time", value: null},
                    max_time: {name:"max_time", value: null},
                    MatchStatus: {name:"MatchStatus", value: null},
                    Alert_Name: {name:"Alert_Name", value: 'Test'},
                    min_on_home: {name:"min_on_home", value: null},
                    max_on_home: {name:"max_on_home", value: null},
                    min_off_home: {name:"min_off_home", value: null},
                    max_off_home: {name:"max_off_home", value: null},
                    min_on_away: {name:"min_on_away", value: null},
                    max_on_away: {name:"max_on_away", value: null},
                    min_off_away: {name:"min_off_away", value: null},
                    max_off_away: {name:"max_off_away", value: null},
                    switch_btn: {name:"switch_btn", value: null},
                    hold_on: {name:"hold_on", value: null},
                    deleteBtn: {name:"deleteBtn", value: null},
                    
                },
                newRow1: {
                    _key: {name: "key", value: null},
                    PredType: {name: "PredType", value: ""},
                    minOddpre: {name: "minOddpre", value: null},
                    maxOddpre:{name: "maxOddpre", value: null},
                    minOddlive:{name: "minOddlive", value: null},
                    maxoddlive: {name: "maxoddlive", value: null},
                    min_score_home: {name: "min_score_home", value: null},
                    max_score_home: {name: "max_score_home", value: null},
                    min_score_away:{name: "min_score_away", value: null},
                    max_score_away:{name: "max_score_away", value: null},
                    min_total_goal:{name: "min_total_goal", value: null},
                    max_total_goal:{name: "max_total_goal", value: null},
                    min_time:{name: "min_time", value: null},
                    max_time: {name:"max_time", value: null},
                    MatchStatus: {name:"MatchStatus", value: null},
                    Alert_Name: {name:"Alert_Name", value: null},
                    min_on_home: {name:"min_on_home", value: null},
                    max_on_home: {name:"max_on_home", value: null},
                    min_off_home: {name:"min_off_home", value: null},
                    max_off_home: {name:"max_off_home", value: null},
                    min_on_away: {name:"min_on_away", value: null},
                    max_on_away: {name:"max_on_away", value: null},
                    min_off_away: {name:"min_off_away", value: null},
                    max_off_away: {name:"max_off_away", value: null},
                    min_profit: {name:"min_profit", value: null},
                    max_profit: {name:"max_profit", value: null},
                    stop_loss: {name:"stop_loss", value: 0},
                    tradingMode: {name:"tradingMode", value: 0},
                    deleteBtn: {name:"deleteBtn", value: null},
                },
                table_conditions: [],
                table_conditions1: [],
                conditions_fields: [
                    { key: "adminMode", label: "Admin Role"},
                    { key: "PredType", label: "Pred. Type"},
                    { key: "minOddpre", label: "min Odd pre"},
                    { key: "maxOddpre", label: "max Odd pre"},
                    { key: "minOddlive", label: "min Odd live"},
                    { key: "maxoddlive", label: "max odd live"},
                    { key: "min_score_home", label: "min_score_home"},
                    { key: "max_score_home", label: "max_score_home"},
                    { key: "min_score_away", label: "min_score_away"},
                    { key: "max_score_away", label: "max_score_away"},
                    { key: "min_total_goal", label: "min_total_goal"},
                    { key: "max_total_goal", label: "max_total_goal"},
                    { key: "min_time", label: "min_time"},
                    { key: "max_time", label: "max_time"},
                    { key: "MatchStatus", label: "MatchStatus"},
                    { key: "Alert_Name", label: "Alert_Name"},
                    { key: "min_on_home", label: "min_on_home"},
                    { key: "max_on_home", label: "max_on_home"},
                    { key: "min_off_home", label: "min_off_home"},
                    { key: "max_off_home", label: "max_off_home"},
                    { key: "min_on_away", label: "min_on_away"},
                    { key: "max_on_away", label: "max_on_away"},
                    { key: "min_off_away", label: "min_off_away"},
                    { key: "max_off_away", label: "max_off_away"},
                    { key: "switch_btn", label: "Switch_Button"},
                    { key: "hold_on", label: "hold_on"},
                    { key: "deleteBtn", label: ""},
                ],
                conditions_fields1: [
                    { key: "PredType", label: "Pred. Type"},
                    { key: "minOddpre", label: "min Odd pre"},
                    { key: "maxOddpre", label: "max Odd pre"},
                    { key: "minOddlive", label: "min Odd live"},
                    { key: "maxoddlive", label: "max odd live"},
                    { key: "min_score_home", label: "min_score_home"},
                    { key: "max_score_home", label: "max_score_home"},
                    { key: "min_score_away", label: "min_score_away"},
                    { key: "max_score_away", label: "max_score_away"},
                    { key: "min_total_goal", label: "min_total_goal"},
                    { key: "max_total_goal", label: "max_total_goal"},
                    { key: "min_time", label: "min_time"},
                    { key: "max_time", label: "max_time"},
                    { key: "MatchStatus", label: "MatchStatus"},
                    { key: "Alert_Name", label: "Alert_Name"},
                    { key: "min_on_home", label: "min_on_home"},
                    { key: "max_on_home", label: "max_on_home"},
                    { key: "min_off_home", label: "min_off_home"},
                    { key: "max_off_home", label: "max_off_home"},
                    { key: "min_on_away", label: "min_on_away"},
                    { key: "max_on_away", label: "max_on_away"},
                    { key: "min_off_away", label: "min_off_away"},
                    { key: "max_off_away", label: "max_off_away"},
                    { key: "min_profit", label: "min_profit"},
                    { key: "max_profit", label: "max_profit"},
                    { key: "stop_loss", label: "stop_loss"},
                    { key: "tradingMode", label: "tradingMode"},
                    { key: "deleteBtn", label: ""},
                ],
                switch_list:[
                    {"value": 100, "label": "Off"},
                    {"value": 1, "label": "min Odd pre"},
                    {"value": 2, "label": "max Odd pre"},
                    {"value": 3, "label": "min Odd live"},
                    {"value": 4, "label": "max odd live"},
                    {"value": 5, "label": "min_score_home"},
                    {"value": 20, "label": "min_score_away"},
                    {"value": 6, "label": "max_score_home"},
                    {"value": 21, "label": "max_score_away"},
                    {"value": 8, "label": "min_total_goal"},
                    {"value": 9, "label": "max_total_goal"},
                    {"value": 10, "label": "min_time"},
                    {"value": 11, "label": "max_time"},
                    {"value": 12, "label": "min_on_home"},
                    {"value": 13, "label": "max_on_home"},
                    {"value": 14, "label": "min_off_home"},
                    {"value": 15, "label": "max_off_home"},
                    {"value": 16, "label": "min_on_away"},
                    {"value": 17, "label": "max_on_away"},
                    {"value": 18, "label": "min_off_away"},
                    {"value": 19, "label": "max_off_away"},
                ],
                alert_name_list: [],

            }
        },
        methods: {
            stop_loss_save(val){
                for(let i = 0; i < this.table_conditions1.length ; i++){
                    if(this.table_conditions1[i]._key.value == this.con_key1){
                        this.table_conditions1[i].stop_loss.value = val
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions1`, [this.table_conditions1]).then(({data}) => {
                    console.log(data.data)
                })
            },
            trading_mode_save(val){
                for(let i = 0; i < this.table_conditions1.length ; i++){
                    if(this.table_conditions1[i]._key.value == this.con_key1){
                        this.table_conditions1[i].tradingMode.value = val
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions1`, [this.table_conditions1]).then(({data}) => {
                    console.log(data.data)
                })
            },
            admin_mode_save(val) {
                for(let i = 0; i < this.table_conditions.length ; i++){
                    if(this.table_conditions[i]._key.value == this.con_key){
                        this.table_conditions[i].adminMode.value = val
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions`, [this.table_conditions]).then(({data}) => {
                    console.log(data.data)
                })
            },
            save_alert_name(val){
                for(let i = 0; i < this.table_conditions.length ; i++){
                    if(this.table_conditions[i]._key.value == this.con_key){
                        this.table_conditions[i].Alert_Name.value = val
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions`, [this.table_conditions]).then(({data}) => {
                    console.log(data.data)
                })
            },
            deleteAlertName(id){
                let del_item = this.alert_name_list.filter(function(item) {
                    return item.id == id;
                });
                let index = this.alert_name_list.indexOf(del_item[0]);
                if (index > -1) {
                    this.alert_name_list.splice(index, 1);
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_alert_names`, [this.alert_name_list]).then(({data}) => {
                    console.log(data.data)
                })

            },
            update_alert_name(val){
                this.alert_name = val
                console.log('updated alert name =>', this.alert_name)
            },
            add_alert_name(){
                let self = this
                if(self.alert_name != ''){
                    this.alert_name_list.push({"value": self.alert_name, "label": self.alert_name, "id": self.create_UUID()})
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_alert_names`, [this.alert_name_list]).then(({data}) => {
                    console.log(data.data)
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
            save_pred(val){
                console.log("=======updated_pred_value========>", val, this.con_key)
                for(let i = 0; i < this.table_conditions.length ; i++){
                    if(this.table_conditions[i]._key.value == this.con_key){
                        this.table_conditions[i].PredType.value = val
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions`, [this.table_conditions]).then(({data}) => {
                    console.log(data.data)
                })
            },
            save_status(val){
                console.log("=======updated_status_value========>", val)
                for(let i = 0; i < this.table_conditions.length ; i++){
                    if(this.table_conditions[i]._key.value == this.con_key){
                        this.table_conditions[i].MatchStatus.value = val
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions`, [this.table_conditions]).then(({data}) => {
                    console.log(data.data)
                })
            },
            save_holdOn(val){
                console.log("=======updated_status_value========>", val)
                for(let i = 0; i < this.table_conditions.length ; i++){
                    if(this.table_conditions[i]._key.value == this.con_key){
                        this.table_conditions[i].hold_on.value = val
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions`, [this.table_conditions]).then(({data}) => {
                    console.log(data.data)
                })
            },
            save_switch(val){
                console.log("=======updated_status_value========>", val)
                for(let i = 0; i < this.table_conditions.length ; i++){
                    if(this.table_conditions[i]._key.value == this.con_key){
                        this.table_conditions[i].switch_btn.value = val
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions`, [this.table_conditions]).then(({data}) => {
                    console.log(data.data)
                })
            },
            saveCond(val){
               // console.log("value===>", val)
                if(this.cond == "PredType"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            if(val == 10){
                                val = 0
                            }
                            this.table_conditions[i].PredType.value = val
                        }
                    }
                }
                if(this.cond == "minOddpre"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].minOddpre.value = val
                        }
                    }
                }
                if(this.cond == "maxOddpre"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].maxOddpre.value = val
                        }
                    }
                }
                if(this.cond == "minOddlive"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].minOddlive.value = val
                        }
                    }
                }
                if(this.cond == "maxoddlive"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].maxoddlive.value = val
                        }
                    }
                }
                if(this.cond == "min_score_home"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].min_score_home.value = val
                        }
                    }
                }
                if(this.cond == "max_score_home"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].max_score_home.value = val
                        }
                    }
                }
                if(this.cond == "min_score_away"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].min_score_away.value = val
                        }
                    }
                }
                if(this.cond == "max_score_away"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].max_score_away.value = val
                        }
                    }
                }
                if(this.cond == "min_total_goal"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].min_total_goal.value = val
                        }
                    }
                }
                if(this.cond == "max_total_goal"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].max_total_goal.value = val
                        }
                    }
                }
                if(this.cond == "min_time"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].min_time.value = val
                        }
                    }
                }
                if(this.cond == "max_time"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].max_time.value = val
                        }
                    }
                }
                if(this.cond == "MatchStatus"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].MatchStatus.value = val
                        }
                    }
                }
                if(this.cond == "Alert_Name"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].Alert_Name.value = val
                        }
                    }
                }
                if(this.cond == "min_on_home"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].min_on_home.value = val
                        }
                    }
                }
                if(this.cond == "max_on_home"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].max_on_home.value = val
                        }
                    }
                }
                if(this.cond == "min_off_home"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].min_off_home.value = val
                        }
                    }
                }
                if(this.cond == "max_off_home"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].max_off_home.value = val
                        }
                    }
                }
                if(this.cond == "min_on_away"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].min_on_away.value = val
                        }
                    }
                }
                if(this.cond == "max_on_away"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].max_on_away.value = val
                        }
                    }
                }
                if(this.cond == "min_off_away"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].min_off_away.value = val
                        }
                    }
                }
                if(this.cond == "max_off_away"){
                    for(let i = 0; i < this.table_conditions.length ; i++){
                        if(this.table_conditions[i]._key.value == this.con_key){
                            this.table_conditions[i].max_off_away.value = val
                        }
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions`, [this.table_conditions]).then(({data}) => {
                    console.log(data.data)
                })
                console.log("updated conditions table=====>", this.table_conditions)
            },
            addrow(){
                console.log('push row======================>', this.newRow, this.table_conditions)
                
                this.newRow._key.value = this.create_UUID()
                this.table_conditions.push(this.newRow)
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions`, [this.table_conditions]).then(({data}) => {
                    console.log(data.data)
                })
            },
            deleteRow(key){
                console.log('delete row key===>', key)
                let deleteItem = this.table_conditions.filter(function(item) {
                    return item._key == key;
                });
                if(deleteItem.length > 0){
                    let index = this.table_conditions.indexOf(deleteItem[0])
                    if (index > -1) {
                        this.table_conditions.splice(index, 1)
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions`, [this.table_conditions]).then(({data}) => {
                    console.log(data.data)
                })
            },

            save_pred1(val){
                console.log("=======updated_pred_value========>", val, this.con_key1)
                for(let i = 0; i < this.table_conditions1.length ; i++){
                    if(this.table_conditions1[i]._key.value == this.con_key1){
                        this.table_conditions1[i].PredType.value = val
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions1`, [this.table_conditions1]).then(({data}) => {
                    console.log(data.data)
                })
            },
            save_status1(val){
                console.log("=======updated_status_value========>", val)
                for(let i = 0; i < this.table_conditions1.length ; i++){
                    if(this.table_conditions1[i]._key.value == this.con_key1){
                        this.table_conditions1[i].MatchStatus.value = val
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions1`, [this.table_conditions1]).then(({data}) => {
                    console.log(data.data)
                })
            },
            saveCond1(val){
                // console.log("value===>", val)
                if(this.cond1 == "PredType"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            if(val == 10){
                                val = 0
                            }
                            this.table_conditions1[i].PredType.value = val
                        }
                    }
                }
                if(this.cond1 == "minOddpre"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].minOddpre.value = val
                        }
                    }
                }
                if(this.cond1 == "maxOddpre"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].maxOddpre.value = val
                        }
                    }
                }
                if(this.cond1 == "minOddlive"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].minOddlive.value = val
                        }
                    }
                }
                if(this.cond1 == "maxoddlive"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].maxoddlive.value = val
                        }
                    }
                }
                if(this.cond1 == "min_score_home"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].min_score_home.value = val
                        }
                    }
                }
                if(this.cond1 == "max_score_home"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].max_score_home.value = val
                        }
                    }
                }
                if(this.cond1 == "min_score_away"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].min_score_away.value = val
                        }
                    }
                }
                if(this.cond1 == "max_score_away"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].max_score_away.value = val
                        }
                    }
                }
                if(this.cond1 == "min_total_goal"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].min_total_goal.value = val
                        }
                    }
                }
                if(this.cond1 == "max_total_goal"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].max_total_goal.value = val
                        }
                    }
                }
                if(this.cond1 == "min_time"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].min_time.value = val
                        }
                    }
                }
                if(this.cond1 == "max_time"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].max_time.value = val
                        }
                    }
                }
                if(this.cond1 == "MatchStatus"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].MatchStatus.value = val
                        }
                    }
                }
                if(this.cond1 == "Alert_Name"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].Alert_Name.value = val
                        }
                    }
                }
                if(this.cond1 == "min_on_home"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].min_on_home.value = val
                        }
                    }
                }
                if(this.cond1 == "max_on_home"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].max_on_home.value = val
                        }
                    }
                }
                if(this.cond1 == "min_off_home"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].min_off_home.value = val
                        }
                    }
                }
                if(this.cond1 == "max_off_home"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].max_off_home.value = val
                        }
                    }
                }
                if(this.cond1 == "min_on_away"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].min_on_away.value = val
                        }
                    }
                }
                if(this.cond1 == "max_on_away"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].max_on_away.value = val
                        }
                    }
                }
                if(this.cond1 == "min_off_away"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].min_off_away.value = val
                        }
                    }
                }
                if(this.cond1 == "max_off_away"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].max_off_away.value = val
                        }
                    }
                }
                if(this.cond1 == "min_profit"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].min_profit.value = val
                        }
                    }
                }
                if(this.cond1 == "max_profit"){
                    for(let i = 0; i < this.table_conditions1.length ; i++){
                        if(this.table_conditions1[i]._key.value == this.con_key1){
                            this.table_conditions1[i].max_profit.value = val
                        }
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions1`, [this.table_conditions1]).then(({data}) => {
                    console.log(data.data)
                })
                console.log("updated conditions table=====>", this.table_conditions1)
            },
            addrow1(){
                console.log('push row======================>', this.newRow, this.table_conditions)
                this.newRow1 = {
                    _key: {name: "key", value: null},
                    
                    PredType: {name: "PredType", value: 10},
                    minOddpre: {name: "minOddpre", value: null},
                    maxOddpre:{name: "maxOddpre", value: null},
                    minOddlive:{name: "minOddlive", value: null},
                    maxoddlive: {name: "maxoddlive", value: null},
                    min_score_home: {name: "min_score_home", value: null},
                    max_score_home: {name: "max_score_home", value: null},
                    min_score_away:{name: "min_score_away", value: null},
                    max_score_away:{name: "max_score_away", value: null},
                    min_total_goal:{name: "min_total_goal", value: null},
                    max_total_goal:{name: "max_total_goal", value: null},
                    min_time:{name: "min_time", value: null},
                    max_time: {name:"max_time", value: null},
                    MatchStatus: {name:"MatchStatus", value: null},
                    Alert_Name: {name:"Alert_Name", value: null},
                    min_on_home: {name:"min_on_home", value: null},
                    max_on_home: {name:"max_on_home", value: null},
                    min_off_home: {name:"min_off_home", value: null},
                    max_off_home: {name:"max_off_home", value: null},
                    min_on_away: {name:"min_on_away", value: null},
                    max_on_away: {name:"max_on_away", value: null},
                    min_off_away: {name:"min_off_away", value: null},
                    max_off_away: {name:"max_off_away", value: null},
                    min_profit: {name:"min_profit", value: null},
                    max_profit: {name:"max_profit", value: null},
                    stop_loss: {name:"stop_loss", value: 0},
                    tradingMode: {name:"tradingMode", value: 0},
                    deleteBtn: {name:"deleteBtn", value: null},
                }
                this.newRow1._key.value = this.create_UUID()
                this.table_conditions1.push(this.newRow1)
            },
            deleteRow1(key){
                console.log('delete row key===>', key)
                let deleteItem = this.table_conditions1.filter(function(item) {
                    return item._key == key;
                });
                if(deleteItem.length > 0){
                    let index = this.table_conditions1.indexOf(deleteItem[0])
                    if (index > -1) {
                        this.table_conditions1.splice(index, 1)
                    }
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table_conditions1`, [this.table_conditions1]).then(({data}) => {
                    console.log(data.data)
                })
            },

            saveTable1(val1){
                let val = parseInt(val1)
                if(this.mode == 'GN'){
                    this.adminTable.facile.GN = val
                }
                else if(this.mode == 'GT'){
                    this.adminTable.facile.GT = val
                }
                else if(this.mode == 'MG'){
                    this.adminTable.facile.MG = val
                }
                else if(this.mode == 'SLN'){
                    this.adminTable.facile.SLN = val
                }
                else if(this.mode == 'SLT'){
                    this.adminTable.facile.SLT = val
                }
                else if(this.mode == 'Special %'){
                    this.adminTable.facile.Special1 = val
                }
                else if(this.mode == 'Special min'){
                    this.adminTable.facile.Special2 = val
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table`, [this.adminTable]).then(({data}) => {
                    console.log(data.data)
                })
                console.log(val, this.mode, this.adminTable)

            },
            saveTable2(val1){
                let val = parseInt(val1)
                if(this.mode == 'GN'){
                    this.adminTable.medio.GN = val
                }
                else if(this.mode == 'GT'){
                    this.adminTable.medio.GT = val
                }
                else if(this.mode == 'MG'){
                    this.adminTable.medio.MG = val
                }
                else if(this.mode == 'SLN'){
                    this.adminTable.medio.SLN = val
                }
                else if(this.mode == 'SLT'){
                    this.adminTable.medio.SLT = val
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table`, [this.adminTable]).then(({data}) => {
                    console.log(data.data)
                })
                console.log(val, this.mode, this.adminTable)
            },
            saveTable3(val1){
                let val = parseInt(val1)
                if(this.mode == 'GN'){
                    this.adminTable.elevato.GN = val
                }
                else if(this.mode == 'GT'){
                    this.adminTable.elevato.GT = val
                }
                else if(this.mode == 'MG'){
                    this.adminTable.elevato.MG = val
                }
                else if(this.mode == 'SLN'){
                    this.adminTable.elevato.SLN = val
                }
                else if(this.mode == 'SLT'){
                    this.adminTable.elevato.SLT = val
                }
                window.axios.post(`${process.env.VUE_APP_URL}save_table`, [this.adminTable]).then(({data}) => {
                    console.log(data.data)
                })
                console.log(val, this.mode, this.adminTable)
            },
            getTable(){
                window.axios.post(`${process.env.VUE_APP_URL}getTable`).then(({data})=> {
                    console.log('get_table_1', data.data[0])
                    this.adminTable = data.data[0]

                    var tb_conditions = data.data[1]
                    for ( var i=0; i<tb_conditions.length; i++) {
                        if (!tb_conditions[i].adminMode) {
                            tb_conditions[i]['adminMode'] = {
                                'value': false
                            }
                        }
                    }
                    this.table_conditions = tb_conditions

                    console.log("this.table_conditions", this.table_conditions)
                    this.alert_name_list = data.data[2]
                    this.table_conditions1 = data.data[3]
                    console.log("get_table_2", data.data[1])
                    console.log('this.table_conditions1', this.table_conditions1)
                    if(data.data[1].length < 1){
                        this.table_conditions = []
                        this.newRow._key.value = this.create_UUID()
                        this.table_conditions.push(this.newRow)
                    }

                    if(this.table_conditions1.length == 0){
                        this.table_conditions1 = []
                        this.newRow1._key.value = this.create_UUID()
                        this.table_conditions1.push(this.newRow1)
                    }

                    this.tableItems = [
                        {
                            mode: { name: 'GN'},
                            facile: { value: data.data[0].facile.GN},
                            medio:{value: data.data[0].medio.GN},
                            elevato:{value: data.data[0].elevato.GN},
                        },
                        {
                            mode: { name: 'GT'},
                            facile: { value: data.data[0].facile.GT},
                            medio:{value: data.data[0].medio.GT},
                            elevato:{value: data.data[0].elevato.GT},
                        },
                        {
                            mode: { name: 'MG'},
                            facile: { value: data.data[0].facile.MG},
                            medio:{value: data.data[0].medio.MG},
                            elevato:{value: data.data[0].elevato.MG},
                        },
                        {
                            mode: { name: 'SLN'},
                            facile: { value: data.data[0].facile.SLN},
                            medio:{value: data.data[0].medio.SLN},
                            elevato:{value:  data.data[0].elevato.SLN},
                        },
                        {
                            mode: { name: 'SLT'},
                            facile: { value: data.data[0].facile.SLT},
                            medio:{value: data.data[0].medio.SLT},
                            elevato:{value: data.data[0].elevato.SLT},
                        },
                        {
                            mode: { name: 'Special %'},
                            facile: { value: data.data[0].facile.Special1},
                            medio:{value: 0},
                            elevato:{value: 0},
                        },
                        {
                            mode: { name: 'Special min'},
                            facile: { value: data.data[0].facile.Special2},
                            medio:{value: 0},
                            elevato:{value: 0},
                        }
                    ]
                    console.log("newRowAdd===>", this.table_conditions)
                })
            }
        },
        created() {
            this.getTable()
        }
    }
</script>
<style>
    .predictionType{
        min-width: 150px;
    }
    .condition_table th{
        font-size: 12px;
        min-width: 99px;
        border-right: 1px solid lightgray;
        height: 30px;
    }
    .facile{
        float: left;
    }
    .table-cell input{
        max-width: 70px;
    }
    .table-cell{
        background: lightgoldenrodyellow;
        height: 50px;
        border-left: 1px solid lightgray;
    }
    .table td {
        padding: 5px;
    }
    .float-left{
        height: 35px;
    }
    .table th, .table td {
        border-top: 0px solid!important;
        border-bottom: 1px solid lightgray!important;
    }
    .table{
        margin-bottom: 0!important;
        border-bottom: none;
    }
    @media screen and (max-width: 600px) {
        .table-cell input{
            max-width: 44px;
        }
    }
</style>
