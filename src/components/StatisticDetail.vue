<template>
    <div>
        <b-modal id="modal-1"  hide-footer hide-header centered no-close-on-backdrop>
            <b-progress value="100" max="100" animated variant="secondary"></b-progress>
        </b-modal> 
        <CCardBody>
            <div>
                <h1>{{country_name}} {{league_name}} tier: {{tier}}</h1>
            </div>
            <CDataTable
                :items="items"
                :fields="fields"                
                hover
                border
                striped
                outlined
                :loading='loading'
            >
                <template v-slot:thead-top="props" >                
                    <tr>
                        <th colspan="4">League</th>
                        <th colspan="3">Match Result %</th>
                        <th colspan="3">Average Goals</th>
                        <th colspan="3">Fist Half Overs %</th>
                        <th colspan="5">Full Match Overs %</th>
                        <th colspan="1"></th>
                        <th colspan="6">Goal Bands [% of matches with at least one goal in time period</th>
                        <th colspan="4">First To Score</th>
                    </tr>                
                </template>                
            </CDataTable>
        </CCardBody>

        <CCardBody>
            <div>
                <h2>League Data by Start Price</h2>
                <p><b><i>* currently for most leagues we have 1 year of odds (and inplay stats data) - Odds are from pinnacle or bet365</i></b></p>
            </div>
            <CDataTable
                :items="oddlines"
                :fields="oddlines_fields"
                sorter            
                hover
                border
                striped
                outlined                
            >
                <template v-slot:thead-top="props" >                
                    <tr>
                        <th colspan="3">League</th>
                        <th colspan="3">Match Result %</th>
                        <th colspan="3">Average Goals</th>
                        <th colspan="3">Fist Half Overs %</th>
                        <th colspan="5">Full Match Overs %</th>
                        <th colspan="1"></th>
                        <th colspan="6">Goal Bands [% of matches with at least one goal in time period</th>
                        <th colspan="4">First To Score</th>
                    </tr>                
                </template>

                <template #Matches="{item, index}">
                    <td v-if="item.Matches > 0">
                        <a :href="'/#/statistic/matches/' + item.league_id + '/odds/' + item.Label" target="_blank">{{item.Matches}}</a>
                    </td>
                    <td v-else>
                        {{item.Matches}}
                    </td>
                   
                </template>
                
            </CDataTable>
        </CCardBody>
    
        <CCardBody>
            <div style="display: flex">
                <div style="width: 200px;">
                    <CSelect
                            :options="timeframe_set"
                            :value.sync = "timeframe"
                            @update:value="timeframe_select"
                    >
                    </CSelect>
                </div>
                <div style="width: 200px; margin-left: 50px;">
                    <CSelect
                            :options="odds_set"
                            :value.sync = "odds"
                            @update:value="odds_select"
                    >
                    </CSelect>
                </div>
            </div>

            <table>
                <tr>
                    <td>
                        <h2>{{minute}} scorelines that lead to more goals</h2>
                        <CDataTable
                            :items="scorelines"
                            :fields="scorelines_fields"
                            sorter            
                            hover
                            border
                            striped
                            outlined
                        >
                        <template #Matches="{item, index}">
                            <td v-if="item.Matches > 0"> 
                                <a :href="'/#/statistic/matches/' + item.league_id + '/scores/' + item.Score  + '-' + timeframe + '-' + odds" target="_blank">{{item.Matches}}</a>
                                
                            </td>
                            <td v-else>
                                {{item.Matches}}
                            </td>
                           
                        </template>
                            
                            
                        </CDataTable>
                    </td>
                    <td style="vertical-align: top; padding-left: 50px;">
                        <h2>Shots on Target to Goal Averages</h2>
                        <CDataTable
                            :items="shottargets"
                            :fields="shottargets_fields"
                            sorter            
                            hover
                            border
                            striped
                            outlined
                        >
                        <template #Matches="{item, index}">
                            <td v-if="item.Matches > 0">
                                <a :href="'/#/statistic/matches/' + item.league_id + '/shots/' + item.ShotOnTarget"  target="_blank">{{item.Matches}}</a>
                            </td>
                            <td v-else>
                                {{item.Matches}}
                            </td>
                           
                        </template>
                        </CDataTable>
                    </td>
                </tr>
            </table>
        </CCardBody>
    </div>

</template>

<script>

const fields = [
    'Country',
    'League',
    'Tier',
    'Matches',
    'home',
    'draw',
    'away',
    { key: '1st Half', label: '1st Half', _style: "width: '50px'" },
    '2nd Half',
    'total',
    { key: '0.5 FH', label: '0.5 FH'},
    { key: '1.5 FH', label: '1.5 FH'},
    { key: '2.5 FH', label: '2.5 FH'},
    { key: '0.5', label: '0.5'},
    { key: '1.5', label: '1.5'},
    { key: '2.5', label: '2.5'},
    { key: '3.5', label: '3.5'},
    { key: '4.5', label: '4.5'},    
    
    'bts',
    '0~15',
    '16~30',
    '31~45',
    '46~60',
    '61~75',
    '76~90',
    'Home',
    'H Win',
    'Away',
    'A Win'
]

const oddlines_fields = [
    'Label',
    'Odds',    
    'Matches',
    'home',
    'draw',
    'away',
    { key: '1st Half', label: '1st Half', _style: "width: '50px'" },
    '2nd Half',
    'total',
    { key: '0.5 FH', label: '0.5 FH'},
    { key: '1.5 FH', label: '1.5 FH'},
    { key: '2.5 FH', label: '2.5 FH'},
    { key: '0.5', label: '0.5'},
    { key: '1.5', label: '1.5'},
    { key: '2.5', label: '2.5'},
    { key: '3.5', label: '3.5'},
    { key: '4.5', label: '4.5'},    
    
    'bts',
    '0~15',
    '16~30',
    '31~45',
    '46~60',
    '61~75',
    '76~90',
    'Home',
    'H Win',
    'Away',
    'A Win'
]

const scorelines_fields = [
    'Matches',
    { key: 'Score', label: 'Score'},
    { key: 'goal+ home', label: 'Goal+ Home'},
    { key: 'goal+ away', label: 'Goal+ Away'},
    { key: 'Goal+', label: 'Goal+'},
    { key: 'Goal++', label: 'Goal++'},
    
]

const shottargets_fields = [
    'Matches',
    { key: 'ShotOnTarget', label: 'Shot On Target'},
    'Goal Avg'
]

const timeframe_set = [    
    { value: '15', label: '15 minutes'},
    { value: '30', label: '30 minutes'},
    { value: '45', label: '45 minutes'},
    { value: '60', label: '60 minutes'},
    { value: '75', label: '75 minutes'}
]

const odds_set = [    
    { value: 'all', label: 'all'},
    { value: 'H_StrongFav', label: '[H<1.5]'},
    { value: 'H_MediumFav', label: '[1.5>H< 2]'},
    { value: 'H_SmallFav', label: '[2>H<3]'},
    { value: 'SuperCompetative', label: '[H-A<3]'},
    { value: 'A_StrongFav', label: '[A<1.5]'},
    { value: 'A_MediumFav', label: '[1.5>A< 2]'},
    { value: 'A_SmallFav', label: '[2>A<3]'}
]


export default {
    name: 'StatisticDetail',
    data () {
        return {
            country_name: '',
            league_id: 0,
            league_name: '',
            tier: '',
            items: [],
            fields: fields,
            oddlines: [],
            oddlines_fields: oddlines_fields,
            scorelines: [],
            scorelines_fields: scorelines_fields,
            shottargets: [],
            shottargets_fields: shottargets_fields,
            loading: true,
            timeframe_set: timeframe_set,
            odds_set: odds_set,
            timeframe: '45',
            odds: 'all',
            parent_scorelines: null,
            minute: 'HT'

        }
    },
    mounted: function (){
        this.$nextTick(function () {
            this.set_items();

        })
    },
    created() {
        
    },
    methods: {
        set_items() {
            this.league_id = `${this.$route.params.id}`;
            let post_data = {
                'league_id': this.league_id
            }
            let apiURL = `${process.env.VUE_APP_URL}get_statistic` ;      
            this.showModal();
            window.axios.post(apiURL, post_data).then(({data}) => {
                
                var items = []
                var league_list = data.data;
                if (league_list.length > 0) {                
                
                    var league = league_list[0];
                    var item = {};                    
                    
                    item['league_id'] = league['league_id']
                    item['League'] = league['league_name'];
                    item['Country'] = league['country_name'];
                    item['Tier'] = league['tier'];
                    item['Matches'] = league['total_matches'];
                    item['home'] = league['home_win_percent'];
                    item['draw'] = league['draw_win_percent'];
                    item['away'] = league['away_win_percent'];
                    item['1st Half'] = league['avg_firsthalf_goals_percent'];
                    item['2nd Half'] = league['avg_secondhalf_goals_percent'];
                    item['total'] = league['avg_total_goals_percent'];
                    item['0.5 FH'] = league['first_05_percent'];
                    item['1.5 FH'] = league['first_15_percent'];
                    item['2.5 FH'] = league['first_25_percent'];
                    item['0.5'] = league['full_05_percent'];
                    item['1.5'] = league['full_15_percent'];
                    item['2.5'] = league['full_25_percent'];
                    item['3.5'] = league['full_35_percent'];
                    item['4.5'] = league['full_45_percent'];
                    item['bts'] = league['bts_percent'];
                    item['0~15'] = league['goal_bands_15_percent'];
                    item['16~30'] = league['goal_bands_30_percent'];
                    item['31~45'] = league['goal_bands_45_percent'];
                    item['46~60'] = league['goal_bands_60_percent'];
                    item['61~75'] = league['goal_bands_75_percent'];
                    item['76~90'] = league['goal_bands_90_percent'];
                    item['Home'] = league['fts_h_percent'];
                    item['H Win'] = league['fts_hw_percent'];
                    item['Away'] = league['fts_a_percent'];
                    item['A Win'] = league['fts_aw_percent'];
                    items.push(item);
                    this.country_name = item.Country;
                    this.league_name = item.League;
                    this.tier = item.Tier;
                    this.items = items;

                    var oddlines = league.oddslines;
                    var oddlines_items = []
                    for ( var i = 0; i < oddlines.length; i++ ) {
                        var oddline = oddlines[i];
                        var item = {};
                        item['league_id'] = this.league_id;
                        item['Label'] = oddline['name']
                        item['Odds'] = oddline['label'];
                        
                        item['Matches'] = oddline['total_matches'];
                        item['home'] = parseFloat(oddline['home_win_percent']);
                        item['draw'] = parseFloat(oddline['draw_win_percent']);
                        item['away'] = parseFloat(oddline['away_win_percent']);
                        item['1st Half'] = parseFloat(oddline['avg_firsthalf_goals_percent']);
                        item['2nd Half'] = parseFloat(oddline['avg_secondhalf_goals_percent']);
                        item['total'] = parseFloat(oddline['avg_total_goals_percent']);
                        item['0.5 FH'] = parseFloat(oddline['first_05_percent']);
                        item['1.5 FH'] = parseFloat(oddline['first_15_percent']);
                        item['2.5 FH'] = parseFloat(oddline['first_25_percent']);
                        item['0.5'] = parseFloat(oddline['full_05_percent']);
                        item['1.5'] = parseFloat(oddline['full_15_percent']);
                        item['2.5'] = parseFloat(oddline['full_25_percent']);
                        item['3.5'] = parseFloat(oddline['full_35_percent']);
                        item['4.5'] = parseFloat(oddline['full_45_percent']);
                        item['bts'] = parseFloat(oddline['bts_percent']);
                        item['0~15'] = parseFloat(oddline['goal_bands_15_percent']);
                        item['16~30'] = parseFloat(oddline['goal_bands_30_percent']);
                        item['31~45'] = parseFloat(oddline['goal_bands_45_percent']);
                        item['46~60'] = parseFloat(oddline['goal_bands_60_percent']);
                        item['61~75'] = parseFloat(oddline['goal_bands_75_percent']);
                        item['76~90'] = parseFloat(oddline['goal_bands_90_percent']);
                        item['Home'] = parseFloat(oddline['fts_h_percent']);
                        item['H Win'] = parseFloat(oddline['fts_hw_percent']);
                        item['Away'] = parseFloat(oddline['fts_a_percent']);
                        item['A Win'] = parseFloat(oddline['fts_aw_percent']);
                        oddlines_items.push(item);
                    }
                    this.oddlines = oddlines_items;

                    var scorelines = league.scorelines['45']['all'];
                    var scorelines_items = []
                    for ( var key in scorelines ) {
                        var scoreline = scorelines[key];
                        var item = {};
                        item['league_id'] = this.league_id;
                        item['Matches'] = scoreline['matches']
                        item['Score'] = scoreline['mark'];
                        item['goal+ home'] = parseFloat(scoreline['goalnexthome']);
                        item['goal+ away'] = parseFloat(scoreline['goalnextaway']);
                        
                        item['Goal+'] = parseFloat(scoreline['goal_1_plus']);
                        item['Goal++'] = parseFloat(scoreline['goal_2_plus']);
                        item['event_id_list'] = scoreline['event_ids']
                        
                        scorelines_items.push(item);
                    }
                    this.scorelines = scorelines_items;
                    this.parent_scorelines = league.scorelines

                    var shottargets = league.shottargets;
                    var shottargets_items = []
                    for ( var i = 0; i < shottargets.length; i++ ) {
                        var shottarget = shottargets[i];
                        var item = {};
                        item['league_id'] = this.league_id;
                        item['Matches'] = shottarget['matches']
                        item['ShotOnTarget'] = shottarget['mark'];
                        
                        item['Goal Avg'] = shottarget['avg_goals'];
                        
                        
                        shottargets_items.push(item);
                    }
                    this.shottargets = shottargets_items;

                }
                this.loading = false
                this.hideModal();
                
            })
        },
        showModal() {
            // this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')

            console.log('show modal')
            this.$bvModal.show('modal-1')
            console.log('show modal close')
        },
        hideModal() {
            this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
        },

        timeframe_select() {
            console.log(this.timeframe)
            console.log(this.odds)

            if (this.timeframe != '' && this.odds != '')
                this.reset_scorelines()
        },
        odds_select() {
            console.log(this.timeframe)
            console.log(this.odds)
            if (this.timeframe != '' && this.odds != '')
                this.reset_scorelines()
        },
        reset_scorelines() {
            var timeframe = this.timeframe;
            var odds = this.odds;

            var scorelines = this.parent_scorelines[timeframe][odds];

            var scorelines_items = []
            // for ( var i = 0; i < scorelines.length; i++ ) {
            //     var scoreline = scorelines[i];
            //     var item = {};
            //     item['league_id'] = this.league_id;
            //     item['Matches'] = scoreline['matches']
            //     item['Score'] = scoreline['mark'];
            //     item['goal+ home'] = parseFloat(scoreline['goalnexthome']);
            //     item['goal+ away'] = parseFloat(scoreline['goalnextaway']);
                
            //     item['Goal+'] = parseFloat(scoreline['goal_1_plus']);
            //     item['Goal++'] = parseFloat(scoreline['goal_2_plus']);
            //     item['event_id_list'] = scoreline['event_ids']
                
            //     scorelines_items.push(item);
            // }
            for ( var key in scorelines ) {
                var scoreline = scorelines[key];
                var item = {};
                item['league_id'] = this.league_id;
                item['Matches'] = scoreline['matches']
                item['Score'] = scoreline['mark'];
                item['goal+ home'] = parseFloat(scoreline['goalnexthome']);
                item['goal+ away'] = parseFloat(scoreline['goalnextaway']);
                
                item['Goal+'] = parseFloat(scoreline['goal_1_plus']);
                item['Goal++'] = parseFloat(scoreline['goal_2_plus']);
                item['event_id_list'] = scoreline['event_ids']
                
                scorelines_items.push(item);
            }
            this.scorelines = scorelines_items;

            if (timeframe == 45)
                this.minute = 'HT'
            else
                this.minute = timeframe + 'min'

        }
    }
}
</script>
<style>
    
</style>