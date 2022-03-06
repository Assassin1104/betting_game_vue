<template>
    <div class="post-tip-container">
        <div v-if="loading" style="height: 10px;">
            <b-progress :value="current_counter" :max="100" animated></b-progress>
        </div>
        <CCard bodyWrapper>
            <CRow>
                <CCol sm="4">
                    <CSelect
                        label="Date"
                        placeholder="select..."
                        :options="dateOptions"
                        :value.sync="model.date"
                        @update:value="handleDateChange"
                    />
                </CCol>
                <CCol sm="4">
                    <CSelect
                        label="Country"
                        placeholder="select..."
                        :options="countryOptions"
                        :value.sync="model.country"
                        @update:value="handleCountryChange"
                    />
                </CCol>
                <CCol sm="4">
                    <CSelect
                        label="League"
                        placeholder="select..."
                        :options="leagueOptions"
                        :value.sync="model.league"
                        @update:value="handleLeagueChange"
                    />
                </CCol>
                <CCol sm="4">
                    <CSelect
                        label="Event"
                        placeholder="select..."
                        :options="eventOptions"
                        :value.sync="model.event"
                        @update:value="handleEventChange"
                    />
                </CCol>
                <CCol sm="2">
                    <CInput
                        label="Status"
                        :plaintext="true"
                        :value="model.status"
                    />
                </CCol>
                <CCol sm="2">
                    <CInput
                        label="Score"
                        :plaintext="true"
                        :value="model.score"
                    />
                </CCol>
                <CCol sm="4">
                    <CInput
                        label="Odd"
                        :plaintext="true"
                        :value="model.odd"
                    />
                </CCol>
                <CCol sm="4">
                    <CSelect
                        label="Prediction type available"
                        placeholder="select..."
                        :options="predictionTypeOptions"
                        :value.sync="model.predictionType"
                        @update:value="handlePredictionTypeChange"
                    />
                </CCol>
                <CCol sm="4">
                    <CSelect
                        label="Stake"
                        placeholder="select..."
                        :options="stakeOptions"
                        :value.sync="model.stake"
                    />
                </CCol>
                <CCol sm="4">
                    <CSelect
                        label="Visibility"
                        placeholder="select..."
                        :options="visibilityOptions"
                        :value.sync="model.visibility"
                    />
                </CCol>
                <CCol sm="4">
                    <CSelect
                        label="Add to Strategy"
                        placeholder="select.."
                        :options="strategyOptions"
                        :value.sync="strategy"
                    />
                </CCol>
                <CCol sm="12">
                    <CTextarea
                        label="Note"
                        :value.sync="model.note"
                        rows="7"
                    />
                </CCol>
            </CRow>
            <div class="d-flex justify-content-end action-btns">
                <CButton
                    color="info"
                    class="m-2"
                    @click="handleReset"
                >
                    Reset
                </CButton>
                <CButton
                    color="info"
                    class="m-2"
                    :disabled="canPost || loading"
                    @click="handlePostTip"
                >
                    Post tip
                    <CSpinner v-if="loading" color="danger" size="sm" />
                </CButton>
            </div>
            <div style="clear: left; width: 100%; border: 1px solid lightgray; text-align: center; height: 30px;padding-top: 5px; margin-top: 20px; background: #e6eef5">
                <div style="width: 250px; margin: auto;">
                    <label style="float:left; font-weight: bold; margin-right: 10px;">Last Updated: </label> 
                    <div style="float: left; background: #17a2b8; color: white; width: 80px; text-align: center; font-weight: bold;">{{last_updated_time}}</div>
                </div>
            </div>
        </CCard>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import moment from 'moment';

    import {displaySuccess, displayError} from '../helpers/message';
    import {convertUTCToLocal} from '../helpers/time';

    export default {
        name: 'PostTip',
        components: {
        },
        data () {
            return {
                model: {
                    date: '',
                    country: '',
                    league: '',
                    event: '',
                    predictionType: '',
                    stake: '',
                    visibility: '',
                    note: '',
                    odd: '',
                },
                loading: false,
                loadingTimer: '',
                current_counter: 0,
                allLeagues: [],
                countryOptions: [],
                leagueOptions: [],
                eventOptions: [],
                predictionTypeOptions: ['Over 0.5', 'Over 1.5'],
                fixturesByDate: [],
                refreshLiveScore: 0,
                last_updated_time: '',
                tipQueue: [],
                old_model: '',
                strategyOptions: [],
                strategy: '',
                timer: ''
            }
        },
        computed: {
            ...mapGetters(['loggedInUser']),
            dateOptions(){
                let arr = [];
                let day = ['Today', 'Tomorrow'];
                if(this.loggedInUser) {
                    for(let i = 0; i < 2 ; i++){
                        let date = moment.utc().add(i, 'days').add(this.loggedInUser.mytimezone, 'hours').format('YYYY-MM-DD');
                        arr.push({
                            'label': `${date} (${day[i % 2]})`, 
                            'value': date
                        });
                    }
                    arr.push({
                        label: 'Live Events',
                        value: 'Live'
                    });
                }
                return arr;
            },
            stakeOptions() {
                let result = [];
                for(let i = 0; i < 8; i++) {
                    result.push({
                        label: `${0.25*(i + 1).toFixed(2)}`,
                        value: 0.25 * (i + 1)
                    });
                }
                return result;
            },
            visibilityOptions() {
                let arr = [{
                        label: 'Public', 
                        value: 'public'
                    }, {
                        label: 'Private',
                        value: 'private'
                    }];
                return arr;
            },
            canPost() {
                let result = true;
                let fResult = this.fixturesByDate.find(item => item.id === this.model.event);
                if(!fResult) {
                    fResult = this.eventOptions.find(eItem => eItem.value === this.model.event);
                }
                if(fResult) {
                    const {time: {status}} = fResult;
                    if(status === 'NS' || status === 'LIVE' || status === 'HT') {
                        result = false;
                        for(const prop in this.model)
                            result = result || !this.model[prop];
                    }
                }
                return result;
            }
        },
        methods: {
            ...mapActions([
                'getFixturesByDate',
                'postTip',
                'getUserStrategies'
            ]),
            handleReset() {
                this.model = {
                    date: '',
                    country: '',
                    league: '',
                    event: '',
                    predictionType: '',
                    stake: '',
                    visibility: '',
                    note: '',
                    odd: ''
                };
                this.handleDateChange(this.dateOptions[0].value);
            },
            handlePostTip() {
                var userId = localStorage.getItem('user_id');
                this.tipQueue.push({
                    ...this.model,
                    userId: parseInt(userId),
                    strategy: this.strategy
                });
                this.loading = true;
            },
            handleDateChange(val) {
                this.model.date = val;
                this.model.country = '';
                this.getCountriesByDate(val);
            },
            handleCountryChange(val) {
                if(val !== '')
                    this.model.league = '';
                this.leagueOptions = [];
                
                let result = this.countryOptions.find(cItem => cItem.value === this.model.country);
                if(result) {
                    this.leagueOptions = result.leagues;
                }                    
                this.handleLeagueChange('');
            },
            handleLeagueChange(val) {
                if(val !== '')
                    this.model.event = '';
                this.eventOptions = [];
                
                let result = this.leagueOptions.find(lItem => lItem.value === this.model.league);
                if(result) {
                    this.eventOptions = result.events[this.model.league];
                    this.eventOptions.sort((a, b) => a.label.localeCompare(b.label));
                }
                    this.handleEventChange('');
            },
            handleEventChange(val) {
                if(val !== '')
                    this.model.predictionType = '';
                this.predictionTypeOptions = [];
                this.getEventInfo();
            },
            handlePredictionTypeChange(val) {
                let fResult = this.predictionTypeOptions.find(pItem => pItem.value === this.model.predictionType);
                if(fResult) {
                    this.model.odd = fResult.odd;
                } else {
                    this.model.odd = '';
                }
            },
            runTimer(activate = true) {
                this.current_counter = 0;
                //clear old timer
                if(this.loadingTimer)
                    clearInterval(this.loadingTimer);
                if(activate) {
                    this.loadingTimer = setInterval(() => {
                        this.current_counter ++;
                    }, 300);
                }
            },
            getEventInfo() {
                this.predictionTypeOptions = [];
                /** save to compare score and odd */
                this.old_model = _.cloneDeep(this.model);
                let fResult = this.eventOptions.find(eItem => eItem.value === this.model.event);
                if(fResult) {
                    let odds = [];
                    let {localteam_score, visitorteam_score} = fResult.scores;
                    /** set status */
                    const time = fResult.time;
                    this.model.status = time.status;
                    if(time.status === 'LIVE' || time.status === 'HT') {
                        let minute = time.minute ? `${Math.floor(time.minute / 10)}${time.minute % 10}'` : '00\'';
                        let second = time.second ? time.second : '00';
                        let added_time = time.added_time ? `+${time.added_time}\'` : '';
                        this.model.status = `${time.status}  ${minute} ${second} ${added_time}`;
                    }
                    /** set score */
                    this.model.score = `${localteam_score} : ${visitorteam_score}`;
                    /** make prediction available types */
                    if(fResult.time.status === 'LIVE' || fResult.time.status == 'HT') {
                        odds = fResult.inplayOdds.data;
                    } else if(fResult.time.status === 'NS') {
                        odds = fResult.flatOdds.data;
                    }
                    const order = {
                        '1': 1,
                        '12': 2,
                        '136703813': 2,
                        '137918022': 2,
                        '28077': 2,
                        '37': 5,
                        '975903': 6, 
                        '976105': 7,
                        '31379': 8,
                        '976226': 9 
                    };
                    odds.forEach((oItem) => {
                        let mkt_id = oItem.market_id;
                        if(oItem.bookmaker_id === 2) {
                            let suffix;
                            if(mkt_id === 1 || mkt_id === 12 || mkt_id === 976105  || mkt_id === 136703813 || mkt_id === 137918022 || mkt_id === 28077) 
                                suffix = 'FT';
                            else if(mkt_id === 37 || mkt_id === 31379 || mkt_id === 975903 || mkt_id === 976226)
                                suffix = 'HT';
                            if(suffix) {
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
                                        this.predictionTypeOptions.push({
                                            label: `${label} - ${suffix}`,
                                            value: `${label} - ${suffix}`.trim(),
                                            odd: parseFloat(item.value),
                                            order: order[mkt_id]
                                        });
                                    }
                                });
                            }
                        }
                    });
                    /** sort in order of FT, HT, BTS */
                    if(this.predictionTypeOptions.length > 0) {
                        this.predictionTypeOptions.sort((a, b) => {
                            if(a.order === 2 && b.order === 2) {
                                return a.value < b.value ? -1 : 0;
                            }
                            return a.order - b.order;
                        });
                        let fResult = this.predictionTypeOptions.find(fItem => fItem.value === this.model.predictionType);
                        if(!fResult)
                            this.handlePredictionTypeChange(this.predictionTypeOptions[0].value);
                        else
                            this.handlePredictionTypeChange(this.model.predictionType);
                    } else {
                        this.handlePredictionTypeChange('');
                    }
                } else {
                    this.model.event = '';
                    this.model.predictionTypeOptions = [];
                    this.model.score = '';
                    this.model.odd = '';
                    this.model.status = '';
                }
                /** check tip to post */
                if(this.old_model.odd === this.model.odd && this.old_model.score === this.model.score) {
                    this.tipQueue.forEach(tItem => {
                        try {
                            this.postTip(tItem).then((res) => {
                                displaySuccess(res);
                            });
                        } catch(err) {
                            displayError(err);
                        } finally {
                            this.tipQueue = [];
                            this.loading = false;
                        }
                    });
                } else {
                    if(this.tipQueue.length > 0) 
                        displayError({message: "Posting failed due to change of odds or score."});
                    this.tipQueue = [];
                    this.loading = false;
                }
                /** set updated time */
                this.last_updated_time = moment().format('hh:mm:ss');
            },
            getCountriesByDate(c_date, init = true){
                if(init) {
                    this.loading = true;
                    this.runTimer();
                }
                this.allLeagues = [];
                this.getFixturesByDate({date: c_date}).then(({data}) => {
                    this.fixturesByDate = data;
                    data.forEach(dItem => {
                        let league = dItem.league[0].league;
                        /** extract country and league name from 'Community Shield (England)' */
                        let arr = league.split("(");
                        let leagueName = arr[0].trim();
                        let country = arr[1].split(")")[0];
                        /** convert to user timezone */

                        let event = {
                            ...dItem,
                            eventName: convertUTCToLocal(dItem.time.starting_at.date_time).toTimeString().substring(0, 5) + ' ' + 
                                dItem.localTeamName + 
                                // '(' + dItem.standing.localteam_position + ')' + 
                                ' v ' + 
                                dItem.visitorTeamName  
                                // + '(' + dItem.standing.visitorteam_position + ')'
                        };
                        let fIndex = this.allLeagues.findIndex(aItem => aItem['country'] === country);
                        if(fIndex === -1) {
                            this.allLeagues.push({
                                'country': country, 
                                'league1': leagueName,
                                'events': [event]
                            });
                        } else {
                            let fIndex1 = this.allLeagues.findIndex(aItem => aItem['country'] === country && aItem['league1'] === leagueName);
                            if(fIndex1 === -1) {
                                this.allLeagues.push({
                                    'country': country,
                                    'league1': leagueName,
                                    'events': [event]
                                });
                            } else {
                                this.allLeagues[fIndex1]['events'].push(event);
                            }
                        }
                    });
                    this.sortJSON(this.allLeagues,'country', '123');
                    this.makeOptions();
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    this.loading = false;
                    this.runTimer(false);
                });
            },
            makeOptions() {
                this.countryOptions = [];
                this.allLeagues.forEach(aItem => {
                    let fIndex = this.countryOptions.findIndex(cItem => cItem.label === aItem.country);
                    let events = {};
                    events[aItem.league1] = aItem.events.map(eItem => ({
                        ...eItem,
                        label: eItem.eventName,
                        value: eItem._id
                    }));
                    if(fIndex > -1) {
                        this.countryOptions[fIndex].leagues.push({
                            label: aItem.league1,
                            value: aItem.league1,
                            events
                        });
                    } else {
                        this.countryOptions.push({
                            label: aItem.country,
                            value: aItem.country,
                            leagues: [{
                                label: aItem.league1,
                                value: aItem.league1,
                                events
                            }],
                        });
                    }
                });

                this.handleCountryChange('');
            },
            getAllFixturesByDay() {
                if(this.model.date) {
                    this.getFixturesByDate({date: this.model.date}).then(({data}) => {
                        this.fixturesByDate = data;
                        this.getEventInfo();
                    });
                }
            },
            sortJSON(data, key){
                return data.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            },
        },
        watch: {
            'model.event': {
                deep: true,
                immediate: true,
                handler(val) {
                    this.model.event = val;
                    this.getEventInfo();
                }
            }
        },
        mounted() {
        },
        created() {
            this.timer = setInterval(() => this.model.date && this.getCountriesByDate(this.model.date, false), 13000);
            this.getUserStrategies().then(({data}) => {
                this.strategyOptions = [
                    {label: 'None', value: ''}
                ];
                data.forEach((dItem) => {
                    this.strategyOptions.push({
                        label: dItem.name,
                        value: dItem._id
                    })
                });
            });
        },
        beforeDestroy() {
            if(this.timer)
                clearInterval(this.timer);
        }
    }
</script>
<style lang="scss" scoped>
    .post-tip-container {
        .action-btns {
            button {
                min-width: 80px;
            }
        }
    }
</style>