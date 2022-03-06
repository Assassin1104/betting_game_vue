<template>
  <CCard>
    <CCardHeader>
      Subscribed Users
    </CCardHeader>
    <CCardBody>
      <ListTable 
        :loading="loading"
        :items="items" 
        :fields="fields" 
        :showPagination="false" 
        @row-clicked="handleRowClick" />
    </CCardBody>
  </CCard>
</template>

<script>
  import {mapActions} from 'vuex';

  import ListTable from '@/components/ListTable';
  import comminMixin from '@/mixins/common/commonMixin';

  export default {
    mixins: [comminMixin],
    components: {
      ListTable
    },
    data () {
      return {
        items: [
        ],
        fields: [
          { key: 'user', label: 'User', _style:'width:300px' },
          { key: 'total_tips', label: 'Total Tips', _style:'' },
          { key: 'pending_tips', label: 'Pending Tips', _style:'' },
          { key: 'roi', label: 'ROI%', _style:'' },
          { key: 'profit_pts', label: 'Profit pts', _style:'' },
          { key: 'w_rate', label: 'W/rate', _style:'' },
          { key: 'followers', label: 'Followers', _style:'' },
          { key: 'actions', label: 'Follow', _style:'' },
        ],
      }
    },
    methods: {
      ...mapActions(['getSubscribedUsers', 'toggleFollowUser']),
      getData() { 
        this.items = [];
        this.loading = true;
        this.getSubscribedUsers().then(({data: {users, stats}}) => {
          users.forEach(uItem => {
            let fResult = stats.find(sItem => sItem._id === uItem._id);
            let actions = [];
            let user_id = localStorage.getItem('user_id');
            if(uItem._id !== parseInt(user_id)) {
              actions.push({
                type: 'switch',
                funcAction: this.handleChange
              });
            }
            this.items.push({
              user_id: uItem._id,
              user: {
                url: `${uItem.avatar}`,
                name: uItem.alias,
              },
              total_tips: fResult ? fResult.totalCount : 0,
              pending_tips: fResult ? fResult.totalCount - fResult.settledWin - fResult.settledLose : 0,
              roi: fResult && fResult.stakeTotal ? (fResult.profitPTS / fResult.stakeTotal * 100).toFixed(2) : 0,
              profit_pts: fResult ? fResult.profitPTS.toFixed(2) : 0,
              w_rate: fResult && (fResult.settledWin + fResult.settledLose) ? ((fResult.settledWin / (fResult.settledWin + fResult.settledLose)) * 100).toFixed(2) : 0,
              followers: uItem.followers,
              isFollowed: uItem.isFollowed,
              actions
            })
          });
        }).catch(err => console.log(err)).finally(() => {
          this.loading = false;
        });
      },
      handleChange(val, idx, e) {
        let user_id = localStorage.getItem('user_id');
        let params = {
          toUserId: this.items[idx].user_id,
          fromUserId: parseInt(user_id)
        };
        try {
          this.toggleFollowUser(params).then(({status}) => {
            if(status === 'success') {
              if(val) {
                this.items[idx].followers ++;
              } else {
                this.items[idx].followers --;
              }
            }
          })
        } catch(err) {
          console.log(err);
        }
      },
      handleRowClick(idx) {
        this.$router.push({
          name: 'UserTipStat',
          params: { id: this.items[idx].user_id}
        });
      }
    },
    created() {
      this.getData();
    },
    watch: {
    
    },
  }
</script>
