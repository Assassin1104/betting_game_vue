<template>
    <div>
        <b-modal id="modal-1"  hide-footer hide-header centered no-close-on-backdrop>
            <b-progress value="100" max="100" animated variant="secondary"></b-progress>
        </b-modal>       
        
        <CCardBody>            
            <CDataTable
                :items="items"
                :fields="fields"
                sorter
                tableFilter
                hover
                border
                striped
                outlined
                :loading='loading'
            >
                <template v-slot:thead-top="props" >                
                    <tr>
                        <th colspan="3">Fixture</th>
                        <th colspan="4">Odds</th>
                        <th colspan="2">Shots on Target</th>
                        <th colspan="8">Goal Times</th>
                        <th colspan="1">Red</th>
                        <th colspan="5">Results</th>
                    </tr>                
                </template>
                <template #League="{item, index}">
                    
                        <a :href="'/#/statistic/details/' + item.league_id" target="_blank">{{item.League}}</a>
                   
              </template>
            </CDataTable>
        </CCardBody>
    </div>
</template>

<script>
const fields = [
    { key: 'Date', label: 'Date'},
    { key: 'Home', label: 'Home'},
    { key: 'Away', label: 'Away'},
    { key: 'Label', label: 'Label'},
    
    { key: 'home_odds', label: 'Home'},
    { key: 'draw_odds', label: 'Draw'},
    { key: 'away_odds', label: 'Away'},
    { key: 'h_shot_on_target', label: 'Home'},
    { key: 'a_shot_on_target', label: 'Away'},
    
    { key: '0-15', label: '0-15'},
    { key: '16-30', label: '16-30'},
    { key: '31-45', label: '31-45'},
    { key: 'HT', label: 'HT'},
    { key: '46-60', label: '46-60'},
    { key: '61-75', label: '61-75'},
    { key: '76-90', label: '75-90'},
    { key: 'FT', label: 'FT'},

    { key: 'card', label: 'Cards?'},

    { key: 'result', label: 'Result'},
    { key: 'btts', label: 'BTTS'},
    { key: 'o15', label: 'O1.5'},
    { key: 'o25', label: 'O2.5'},
    { key: 'o35', label: 'O3.5'},
]


export default {
    name: 'MatchesTable',
    
    data () {
        return {
            items: [],
            fields: fields,
            loading: true
        }
    },
    created() {
        
    },
    mounted: function (){
        this.$nextTick(function () {
            this.set_items();

        })
    },
    methods: {
        set_items() {
            this.showModal();
            let post_data = {
                'league_id': `${this.$route.params.id}`,
                'match_type': `${this.$route.params.match_type}`,
                'match_label': `${this.$route.params.match_label}`
            }
            window.axios.post(`${process.env.VUE_APP_URL}getEvents`, post_data).then(({data}) => {

                var items = []
                var event_list = data.data;
                
                var total_matches = event_list.length;
                var total_15_score = 0;
                var total_30_score = 0;
                var total_45_score = 0;
                var total_60_score = 0;
                var total_75_score = 0;
                var total_90_score = 0;

                for ( var i = 0; i < event_list.length; i++) {
                    var event = event_list[i];
                    var item = {};
                    item['event_id'] = event.event_id;
                    item['Date'] = event.date;
                    item['Home'] = event.home_name;
                    item['Away'] = event.away_name;
                    item['home_odds'] = event.home_odds;
                    item['draw_odds'] = event.draw_odds;
                    item['away_odds'] = event.away_odds;
                    item['0-15'] = event.event_15_score;
                    if (event.event_15_score != '')
                        total_15_score += 1;
                    item['16-30'] = event.event_30_score;
                    if (event.event_30_score != '')
                        total_30_score += 1;
                    item['31-45'] = event.event_45_score;
                    if (event.event_45_score != '')
                        total_45_score += 1;
                    item['HT'] = event.ht_score;
                    item['46-60'] = event.event_60_score;
                    if (event.event_60_score != '')
                        total_60_score += 1;
                    item['61-75'] = event.event_75_score;
                    if (event.event_75_score != '')
                        total_75_score += 1;
                    item['76-90'] = event.event_90_score;
                    if (event.event_90_score != '')
                        total_90_score += 1;
                    item['FT'] = event.ft_score;
                    item['card'] = event.cards;
                    item['result'] = event.event_result;
                    item['btts'] = 'N';
                    if (event.ft_score.split('-')[0] != 0 && event.ft_score.split('-')[1] != 0)
                        item['btts'] = 'Y';
                    item['o15'] = event.event_o15;
                    item['o25'] = event.event_o25;
                    item['o35'] = event.event_o35;

                    item['h_shot_on_target'] = '';
                    if (event.h_shot_on_target != null)
                        item['h_shot_on_target'] = event.h_shot_on_target;
                    item['a_shot_on_target'] = '';
                    if (event.a_shot_on_target != null)
                        item['a_shot_on_target'] = event.a_shot_on_target;

                    var label = ''
                    if (event.home_odds <= 3 && event.away_odds <= 3)
                        label = "[H-A<3]";
                    else if (event.home_odds <= 1.5)
                        label = "[H<1.5]";
                    else if (event.home_odds > 1.5 && event.home_odds <= 2)
                        label = "[1.5>H< 2]";
                    else if (event.home_odds > 2 && event.home_odds <= 3)
                        label = "[2>H<3]";
                    
                    else if (event.away_odds <= 1.5)
                        label = "[A<1.5]";
                    else if (event.away_odds > 1.5 && event.away_odds <= 2)
                        label = "[1.5>A< 2]";
                    else if (event.away_odds > 2 && event.away_odds <= 3)
                        label = "[2>A<3]";

                    item['Label'] = label
                    
                    items.push(item);
                }
                var total_15_per = (100 * total_15_score / total_matches).toFixed(2);
                var total_30_per = (100 * total_30_score / total_matches).toFixed(2);
                var total_45_per = (100 * total_45_score / total_matches).toFixed(2);
                var total_60_per = (100 * total_60_score / total_matches).toFixed(2);
                var total_75_per = (100 * total_75_score / total_matches).toFixed(2);
                var total_90_per = (100 * total_90_score / total_matches).toFixed(2);

                var tmp_fields = [
                    { key: 'Date', label: 'Date'},
                    { key: 'Home', label: 'Home'},
                    { key: 'Away', label: 'Away'},
                    { key: 'Label', label: 'Label'},
                    
                    { key: 'home_odds', label: 'Home'},
                    { key: 'draw_odds', label: 'Draw'},
                    { key: 'away_odds', label: 'Away'},
                    { key: 'h_shot_on_target', label: 'Home'},
                    { key: 'a_shot_on_target', label: 'Away'},
                    
                    { key: '0-15', label: '0-15'},
                    { key: '16-30', label: '16-30'},
                    { key: '31-45', label: '31-45'},
                    { key: 'HT', label: 'HT'},
                    { key: '46-60', label: '46-60'},
                    { key: '61-75', label: '61-75'},
                    { key: '76-90', label: '75-90'},
                    { key: 'FT', label: 'FT'},

                    { key: 'card', label: 'Cards?'},

                    { key: 'result', label: 'Result'},
                    { key: 'btts', label: 'BTTS'},
                    { key: 'o15', label: 'O1.5'},
                    { key: 'o25', label: 'O2.5'},
                    { key: 'o35', label: 'O3.5'},
                ]
                for ( var j = 0; j < tmp_fields.length; j ++) {
                    if (tmp_fields[j].key == '0-15')
                        tmp_fields[j].label = '0-15 (' + total_15_per + '%)'
                    if (tmp_fields[j].key == '16-30')
                        tmp_fields[j].label = '16-30 (' + total_30_per + '%)'
                    if (tmp_fields[j].key == '31-45')
                        tmp_fields[j].label = '31-45 (' + total_45_per + '%)'
                    if (tmp_fields[j].key == '46-60')
                        tmp_fields[j].label = '46-60 (' + total_60_per + '%)'
                    if (tmp_fields[j].key == '61-75')
                        tmp_fields[j].label = '61-75 (' + total_75_per + '%)'
                    if (tmp_fields[j].key == '76-90')
                        tmp_fields[j].label = '76-90 (' + total_90_per + '%)'

                }
                this.fields = tmp_fields;
                this.items = items;
                this.loading = false;
                this.hideModal();
                
            })
        },
        showModal() {
            this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')            
        },
        hideModal() {
            this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
        },
    }
}
</script>
<style scoped>

.table-responsive {
    max-height: 80vh !important;
}

</style>
<style>

.table-responsive {
    max-height: 80vh !important;
}
thead {
    padding: 3px;
    position: sticky;
    top: 0;
    z-index: 1;
    /* width: 25vw; */
    background: white;
}
</style>