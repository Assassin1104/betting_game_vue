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
                <template #League="{item, index}">
                    <td>                    
                        <a :href="'/#/statistic/details/' + item.league_id" target="_blank">{{item.League}}</a>
                    </td>
                   
              </template>
            </CDataTable>
        </CCardBody>
    </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import swal from "sweetalert2";
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


export default {
    name: 'StatisticTable',
    components: {
        Plotly,
       
    },
    data () {
        return {
            fields,
            startDate: 1325376000000,
            endDate: 1330560000000,
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
            window.axios.post(`${process.env.VUE_APP_URL}get_statistic`).then(({data}) => {

                var items = []
                var league_list = data.data;
                for ( var i = 0; i < league_list.length; i++) {
                    var league = league_list[i];
                    var item = {};                    
                    if (!league['league_name'])
                        continue
                    item['league_id'] = league['league_id']
                    item['League'] = league['league_name'];
                    item['Country'] = league['country_name'];
                    item['Tier'] = league['tier'];
                    if (league['total_matches'] == 0)
                        continue
                    item['Matches'] = parseFloat(league['total_matches']);
                    item['home'] = parseFloat(league['home_win_percent']);
                    item['draw'] = parseFloat(league['draw_win_percent']);
                    item['away'] = parseFloat(league['away_win_percent']);
                    item['1st Half'] = parseFloat(league['avg_firsthalf_goals_percent']);
                    item['2nd Half'] = parseFloat(league['avg_secondhalf_goals_percent']);
                    item['total'] = parseFloat(league['avg_total_goals_percent']);
                    item['0.5 FH'] = parseFloat(league['first_05_percent']);
                    item['1.5 FH'] = parseFloat(league['first_15_percent']);
                    item['2.5 FH'] = parseFloat(league['first_25_percent']);
                    item['0.5'] = parseFloat(league['full_05_percent']);
                    item['1.5'] = parseFloat(league['full_15_percent']);
                    item['2.5'] = parseFloat(league['full_25_percent']);
                    item['3.5'] = parseFloat(league['full_35_percent']);
                    item['4.5'] = parseFloat(league['full_45_percent']);
                    item['bts'] = parseFloat(league['bts_percent']);
                    item['0~15'] = parseFloat(league['goal_bands_15_percent']);
                    item['16~30'] = parseFloat(league['goal_bands_30_percent']);
                    item['31~45'] = parseFloat(league['goal_bands_45_percent']);
                    item['46~60'] = parseFloat(league['goal_bands_60_percent']);
                    item['61~75'] = parseFloat(league['goal_bands_75_percent']);
                    item['76~90'] = parseFloat(league['goal_bands_90_percent']);
                    item['Home'] = parseFloat(league['fts_h_percent']);
                    item['H Win'] = parseFloat(league['fts_hw_percent']);
                    item['Away'] = parseFloat(league['fts_a_percent']);
                    item['A Win'] = parseFloat(league['fts_aw_percent']);
                    items.push(item);
                }
                this.items = items;
                this.loading = false;
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