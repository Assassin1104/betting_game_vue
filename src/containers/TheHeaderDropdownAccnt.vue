<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="name-position">
          {{loggedInUser.alias}}&ensp;
        </div>
        <div class="c-avatar">
          <img
            :src="loggedInUser.avatar"
            class="c-avatar-img "
          />
        </div>&ensp;
        <div class="dropdown_icon" style="zoom:1.5;">
          ⌄
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownItem @click="goToPage('UserTipStat', {id: parseInt(loggedInUser.user_id)})">
      <CIcon name="cil-chart" class="my_tips_color"/> My Tips and Stats
    </CDropdownItem>
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Settings</strong>
    </CDropdownHeader>
    <CDropdownItem @click="goToPage('Profile')">
      <CIcon name="cil-user" class="profile_color"/> Profile
    </CDropdownItem>
    <CDropdownItem @click="goToPage('UserSetting')">
      <CIcon name="cil-settings" class="setting_color"/> Setting
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-dollar" /> Payments
      <CBadge color="secondary" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem>
      <CIcon name="cil-shield-alt" /> Lock Account
    </CDropdownItem>
    <CDropdownItem>
      <div v-on:click="logout"><CIcon name="cil-lock-locked" class="logout_color" /> Logout</div>
    </CDropdownItem>
  </CDropdown>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42
    }
  },
  computed: {
    ...mapGetters('notifications', {
      unread: 'info'
    }),
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    logout: function (event) {
      const token = localStorage.getItem("token");
      console.log(token);
      
      if(token) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('user_id');
        this.$router.push({name: 'Login'});
      }
    },
    goToPage(page, params = {}) {
      this.$router.push({
        name: page,
        params
      })
    }    
  },
  created() {
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
  
  .my_tips_color{
    color: #15a826;
  }

  .profile_color{
    color: #1000ff;
  }

  .setting_color{
    color: #dcb90d;
  }

  .logout_color{
    color: red;
  }
</style>