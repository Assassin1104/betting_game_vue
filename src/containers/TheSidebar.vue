<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <!-- <CSidebarBrand class="d-md-down-none" to="/">
      <p style="font-weight: 600;font-size: 25px; padding-top: 13px;">SOSPESO</p> -->
<!--      <CIcon -->
<!--        class="c-sidebar-brand-full" -->
<!--        name="logo" -->
<!--        size="custom-size" -->
<!--        :height="35" -->
<!--        viewBox="0 0 556 134"-->
<!--      />-->
<!--      <CIcon -->
<!--        class="c-sidebar-brand-minimized" -->
<!--        name="logo" -->
<!--        size="custom-size" -->
<!--        :height="35" -->
<!--        viewBox="0 0 110 134"-->
<!--      />-->
    <!-- </CSidebarBrand> -->

    <CRenderFunction flat :content-to-render="navoptions"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import { mapGetters } from 'vuex';

import nav from './_nav'
import axios from "axios";
import i18n from '@/plugins/i18n';

export default {
  name: 'TheSidebar',
  components: {
      i18n
  },
  data(){
    return {
      navoptions: [],
      lang: {
        'Dashboard': {
            'en': 'Dashboard',
            'it': 'Dashboard',
            'es': 'Dashboard',
            'pt': 'Dashboard',
            'fr': 'Dashboard',
            'ru': 'Dashboard',
            'de': 'Sospeso'
        },
        'Main': {
             'en': 'Sospeso',
             'it': 'Sospeso',
             'es': 'Sospeso',
             'pt': 'Sospeso',
             'fr': 'Sospeso',
             'ru': 'Sospeso',
             'de': 'Sospeso'
          },

        'liveStatsNew': {
             'en': 'Live stats',
             'it': 'Live stats',
             'es': 'Live stats',
             'pt': 'Ao vivo',
             'fr': 'Live stats',
             'ru': 'Live stats',
             'de': 'Live stats'
          },

          'AdminView': {
             'en': 'Admin settings',
             'it': 'Opzioni admin',
             'es': 'Opzioni admin',
             'pt': 'Configuracoes admin',
             'fr': 'Admin settings',
             'ru': 'Admin settings',
             'de': 'Admin settings'
          },

          'Cold Stats': {
             'en': 'Cold stats',
             'it': 'Statistiche prematch',
             'es': 'Statistiche prematch',
             'pt': 'Estatisticas',
             'fr': 'Cold stats',
             'ru': 'Cold stats',
             'de': 'Cold stats'
          },

          'League Table': {
             'en': 'League tables',
             'it': 'League tables',
             'es': 'League tables',
             'pt': 'League tables',
             'fr': 'League tables',
             'ru': 'League tables',
             'de': 'League tables'
          },

          'Value stats data': {
             'en': 'Value stats data',
             'it': 'Value stats data',
             'es': 'Value stats data',
             'pt': 'Value stats data',
             'fr': 'Value stats data',
             'ru': 'Value stats data',
             'de': 'Value stats data'
          },

          'Live Stats Analysis': {
             'en': 'Live Stats Analysis',
             'it': 'Live Stats Analysis',
             'es': 'Live Stats Analysis',
             'pt': 'Live Stats Analysis',
             'fr': 'Live Stats Analysis',
             'ru': 'Live Stats Analysis',
             'de': 'Live Stats Analysis'
          },

          'Live Stats Analysis 1': {
             'en': 'Search stats',
             'it': 'Search stats',
             'es': 'Search stats',
             'pt': 'Search stats',
             'fr': 'Search stats',
             'ru': 'Search stats',
             'de': 'Search stats'
          },

          'Prediction Stats': {
             'en': 'Prediction Stats',
             'it': 'Prediction Stats',
             'es': 'Prediction Stats',
             'pt': 'Prediction Stats',
             'fr': 'Prediction Stats',
             'ru': 'Prediction Stats',
             'de': 'Prediction Stats'
          },

          'Team Analysis': {
             'en': 'Team Analysis',
             'it': 'Team Analysis',
             'es': 'Team Analysis',
             'pt': 'Team Analysis',
             'fr': 'Team Analysis',
             'ru': 'Team Analysis',
             'de': 'Team Analysis'
          },

          'Historic Data': {
             'en': 'Historic Data',
             'it': 'Historic Data',
             'es': 'Historic Data',
             'pt': 'Historic Data',
             'fr': 'Historic Data',
             'ru': 'Historic Data',
             'de': 'Historic Data'
          },

          'Prediction Upload': {
             'en': 'Prediction Upload',
             'it': 'Prediction Upload',
             'es': 'Prediction Upload',
             'pt': 'Prediction Upload',
             'fr': 'Prediction Upload',
             'ru': 'Prediction Upload',
             'de': 'Prediction Upload'
          },

          'Nav Dashboard': {
             'en': 'Nav Dashboard',
             'it': 'Nav Dashboard',
             'es': 'Nav Dashboard',
             'pt': 'Nav Dashboard',
             'fr': 'Nav Dashboard',
             'ru': 'Nav Dashboard',
             'de': 'Nav Dashboard'
          },

          'Today': {
             'en': 'Today',
             'it': 'Oggi',
             'es': 'Hoy',
             'pt': 'Hoje',
             'fr': "Aujourd'hui",
             'ru': 'Сегодня',
             'de': 'Heute'
          },

          'Money Manage': {
             'en': 'Money Manage',
             'it': 'Gestione cassa',
             'es': 'Money Manage',
             'pt': 'Money Manage',
             'fr': 'Money Manage',
             'ru': 'Money Manage',
             'de': 'Money Manage'
          },

          'Page Setting': {
             'en': 'Page Settings',
             'it': 'Opzioni pagine',
             'es': 'Page Setting',
             'pt': 'Page Setting',
             'fr': 'Page Setting',
             'ru': 'Page Setting',
             'de': 'Page Setting'
          },
          'Feed Page': {
             'en': 'Feed Page',
             'it': 'Feed Page',
             'es': 'Feed Page',
             'pt': 'Feed Page',
             'fr': 'Feed Page',
             'ru': 'Feed Page',
             'de': 'Feed Page'
          },
          'User List Page': {
             'en': 'User List Page',
             'it': 'User List Page',
             'es': 'User List Page',
             'pt': 'User List Page',
             'fr': 'User List Page',
             'ru': 'User List Page',
             'de': 'User List Page'
          },
          'Post a tip': {
             'en': 'Post a tip',
             'it': 'Post a tip',
             'es': 'Post a tip',
             'pt': 'Post a tip',
             'fr': 'Post a tip',
             'ru': 'Post a tip',
             'de': 'Post a tip'
          },

          'League Stats': {
             'en': 'League Stats',
             'it': 'League Stats',
             'es': 'League Stats',
             'pt': 'League Stats',
             'fr': 'League Stats',
             'ru': 'League Stats',
             'de': 'League Stats'
          }
      }
    }
  },
  computed: {
    ...mapGetters('notifications', {
      allInfo: 'info'
    }),
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  },
  methods: {
    resetnav() {
      
      var admin = localStorage.getItem("admin");
      var membership_level = localStorage.getItem("membership_level");
      console.log('admin cache:----------------', admin);
      console.log('membership_level:----------------', membership_level);

      var icon_content = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" class="c-sidebar-nav-icon" style="fill: icon_color"><path d="M19.955 4.045c-2.036-2.039-4.851-3.3-7.959-3.3-6.213 0-11.25 5.037-11.25 11.25 0 3.109 1.261 5.923 3.299 7.959l0 0c2.036 2.039 4.851 3.3 7.959 3.3 6.213 0 11.25-5.037 11.25-11.25 0-3.109-1.261-5.923-3.299-7.959l-0-0zM19.746 6.086c1.175 1.52 1.913 3.431 1.995 5.511l0.001 0.019-3.1-2.333zM14.814 2.665l-2.736 2.033-2.865-2.041c0.834-0.258 1.794-0.407 2.788-0.407 1.004 0 1.972 0.152 2.883 0.433l-0.069-0.018zM5.475 9.283l-3.217 2.357c0.078-2.121 0.826-4.053 2.036-5.606l-0.016 0.022zM4.041 17.625h3.72l1.174 3.631c-2.022-0.688-3.697-1.954-4.874-3.601l-0.020-0.030zM10.64 21.655l-1.788-5.53h-5.685c-0.377-0.782-0.661-1.69-0.805-2.643l-0.007-0.054 4.92-3.604-1.858-5.009c0.621-0.572 1.326-1.069 2.089-1.468l0.054-0.026 4.537 3.231 4.347-3.23c0.82 0.427 1.527 0.927 2.158 1.508l-0.007-0.006-1.727 5 4.779 3.596c-0.151 1.009-0.435 1.92-0.838 2.762l0.025-0.058h-5.481l-1.971 5.527c-0.415 0.063-0.894 0.098-1.381 0.098-0.48 0-0.951-0.035-1.413-0.102l0.053 0.006zM15.121 21.238l1.288-3.613h3.55c-1.186 1.661-2.84 2.919-4.769 3.592l-0.069 0.021z"></path><path d="M16.257 10.473l-4.17-3.030-4.17 3.030 1.593 4.902h5.154zM13.574 13.875h-2.975l-0.919-2.829 2.406-1.748 2.406 1.748z"></path></svg>'

      const name = nav[0]['_name'];
      // const list = [...nav[0]['_children']];
      let list = []

      nav[0]['_children'].forEach((item) => {
        list.push(item)
      })

      
      let apiURL = `${process.env.VUE_APP_URL}api/pagesetting/list`;
      axios
      .get(apiURL)
      .then((res) => {
        var Pages = res.data;
        var Pages_dic = {};
        var Colors_dic = {};
        var i;
        
        for (i = 0; i < Pages.length; i++) {
          Colors_dic[Pages[i].name] = Pages[i].color
          if (!Pages[i].setting)
            continue
          
          Pages[i].membership_setting.forEach((item) =>{
            if (item.name == membership_level){

              Pages_dic[Pages[i].name] = item.value

              if (item.value)
                console.log('Pages[i]', Pages[i])
            }
          })            
          
        }
        if (admin == 'false') {
          let name_keys = Object.keys(Pages_dic)
          console.log('Pages_dic', Pages_dic)
          console.log('list', list)
          var j;
          var deleted = 0;

          let _list = [];
          let _list_hidden = [];

          for (j = 0; j < list.length; j++) {
            if (name_keys.includes(list[j]['en_name'])) {
              if ( Pages_dic[list[j]['en_name']] ) {
                var content = icon_content.replace('icon_color', Colors_dic[list[j]['en_name']])

                  var new_item = {}
                  new_item['en_name'] = list[j].en_name
                  new_item['name'] = list[j].name
                  new_item['_name'] = list[j]._name
                  new_item['to'] = list[j].to
                  new_item['badge'] = list[j].badge
                  new_item['icon'] = {customClasses: 'ord-ball', size: 'custom', content: content}
                _list = [..._list, new_item];
              }
              else {

                var new_item = {}
                  new_item['en_name'] = list[j].en_name
                  new_item['name'] = list[j].name
                  new_item['_name'] = list[j]._name
                  new_item['badge'] = list[j].badge
                  new_item['to'] = '/membership'
                  new_item['icon'] = {name: 'cil-lock-locked', customClasses: 'lock', size: 'custom'}
                
                _list_hidden = [..._list_hidden, new_item];
              }
            }
            
          }

          var total_list = _list.concat(_list_hidden)

          console.log('_list', _list)
          console.log('_list_hidden', _list_hidden)

          this.navoptions = [{_name: name, _children: total_list}];
          for (var i = 0; i < this.navoptions[0]._children.length; i++) {        
            
            var nav_name = this.navoptions[0]._children[i].en_name;           
            this.navoptions[0]._children[i].name = this.lang[nav_name][i18n.locale];           
            
          }
        }
        else {
          let admin_list = []
          for (j = 0; j < list.length; j++) {
            console.log(Colors_dic[list[j]['en_name']])
              
            var content = icon_content.replace('icon_color', Colors_dic[list[j]['en_name']])

            var new_item = {}
            new_item['en_name'] = list[j].en_name
            new_item['name'] = list[j].name
            new_item['_name'] = list[j]._name
            new_item['to'] = list[j].to
            new_item['badge'] = list[j].badge
            new_item['icon'] = {customClasses: 'ord-ball', size: 'custom', content: content}
            admin_list = [...admin_list, new_item];
          }
          this.navoptions = [{_name: name, _children: [...admin_list]}];
          for (var i = 0; i < this.navoptions[0]._children.length; i++) {           
            var nav_name = this.navoptions[0]._children[i].en_name;           
            this.navoptions[0]._children[i].name = this.lang[nav_name][i18n.locale];
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });     
      
    }
    
  },  
  created() {
    if (localStorage.getItem('lang') == null || localStorage.getItem('lang') == '') {
      console.log('lang response1')
          var user_id = localStorage.getItem('user_id');
          var xhr0 = new XMLHttpRequest();
          var self = this;
          xhr0.onreadystatechange = function(){
              if (xhr0.readyState === 4){
                  console.log('lang response2')
                  var response = JSON.parse(xhr0.responseText);
                  
                  console.log('lang response',response)
                  if(response.hasOwnProperty('mylang')){
                    localStorage.setItem('lang', response.mylang);

                  }
                  else {
                    localStorage.setItem('lang', 'en');

                  }
                  i18n.locale = localStorage.getItem('lang')
                  self.resetnav();
              }
          };

          var data = {user_id: user_id}

          xhr0.open('GET', `${process.env.VUE_APP_URL}get_usersetting/${user_id}`, true);
          // xhr.setRequestHeader("Content-type", "application/json");
          xhr0.send()
    }
    else {
      console.log('lang', localStorage.getItem('lang'))
      i18n.locale = localStorage.getItem('lang')
      console.log('i18n.locale', i18n.locale)
      this.resetnav();
    }
  },
  beforeMount(){
    
  },
  mounted () {
    
  },
  watch: {
    'allInfo.totalFeeds': {
      deep: true,
      immediate: true,
      handler(val) {
        if(this.navoptions.length > 0) {
          let fIndex = this.navoptions[0]._children.findIndex(nItem => nItem.to === '/feed_page');
          if(fIndex > -1)
            this.navoptions[0]._children[fIndex].badge = {
              color: 'primary',
              text: `${this.allInfo.totalFeeds}`
            };
        }
      }
    }
  }
}
</script>
<style>
  .red {
    fill: red;
  }
  .c-sidebar {

  }
  .lock {
    width: 20px;
      margin-right: 10px;
      fill:  gray;
      position: absolute;
      left:  15px; 
  }
  .ball {
    width: 20px;
      margin-right: 10px;
      fill:  #ffff99;
      position: absolute;
      left:  15px; 
  }
  .ord-ball {
    width: 20px;
      margin-right: 10px;
      position: absolute;
      left:  15px; 
  }
  .c-sidebar-nav-link {
    padding-left: 55px;
  }
</style>