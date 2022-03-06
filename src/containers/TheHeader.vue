<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none d-lg-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
<!--      <CDropdown-->
<!--              color=""-->
<!--              toggler-text="Dropdown Button"-->
<!--              class="m-2 multi-language"-->
<!--      >-->
<!--          <template #toggler>-->
<!--              <CHeaderNavLink>-->
<!--                  <div class="c-avatar">-->
<!--                      <country-flag country='gb' size='small'/>-->
<!--                  </div>-->
<!--              </CHeaderNavLink>-->
<!--          </template>-->
<!--          <CDropdownItem><a><country-flag country='gb' size='small'/>English - UK</a></CDropdownItem>-->
<!--          <CDropdownItem><a href="#"><country-flag country='it' size='small'/>Italian - IT</a></CDropdownItem>-->
<!--          <CDropdownItem><a><country-flag country='br' size='small'/>Portuguese - BR</a></CDropdownItem>-->
<!--      </CDropdown>-->

    <CHeaderBrand class="mx-auto d-lg-none" to="/">
<!--      <CIcon name="logo" height="48" alt="Logo"/>-->
      <!-- <p style="font-size: 25px;">SOSPESO</p> -->
      <img src="/img/logo.png" alt="..." class="img-thumbnail logo-image" style = "zoom : 25%; border:none;">
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
<!--      <CHeaderNavItem class="px-3">-->
<!--        <CHeaderNavLink to="/dashboard">-->
<!--          Dashboard-->
<!--        </CHeaderNavLink>-->
<!--      </CHeaderNavItem>-->
<!--      <CHeaderNavItem class="px-3">-->
<!--        <CHeaderNavLink to="/users" exact>-->
<!--          Users-->
<!--        </CHeaderNavLink>-->
<!--      </CHeaderNavItem>-->
<!--      <CHeaderNavItem class="px-3">-->
<!--        <CHeaderNavLink>-->
<!--          Settings-->
<!--        </CHeaderNavLink>-->
<!--      </CHeaderNavItem>-->
    </CHeaderNav>
    <CHeaderNav class="dropdown_notify_zoom mr-4 ">
      <TheHeaderDropdownNotification />
    </CHeaderNav>
    <!-- <CHeaderNav class="mr-4">
      <a :href="`#/user_tip_stat/${loggedInUser._id}`">
        <strong>{{loggedInUser.alias}}</strong>
      </a>
    </CHeaderNav> -->

    <CHeaderNav class="dropdown_accnt_zoom mr-4 ">
<!--      <CHeaderNavItem class="d-md-down-none mx-2">-->
<!--        <CHeaderNavLink>-->
<!--          <CIcon name="cil-bell"/>-->
<!--        </CHeaderNavLink>-->
<!--      </CHeaderNavItem>-->
<!--      <CHeaderNavItem class="d-md-down-none mx-2">-->
<!--        <CHeaderNavLink>-->
<!--          <CIcon name="cil-list"/>-->
<!--        </CHeaderNavLink>-->
<!--      </CHeaderNavItem>-->
<!--      <CHeaderNavItem class="d-md-down-none mx-2">-->
<!--        <CHeaderNavLink>-->
<!--          <CIcon name="cil-envelope-open"/>-->
<!--        </CHeaderNavLink>-->
<!--      </CHeaderNavItem>-->
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt';
import TheHeaderDropdownNotification from './TheHeaderDropdownNotification';

export default {
  name: 'TheHeader',
  data () {
    return { 
    }
  },
  components: {
    TheHeaderDropdownAccnt,
    TheHeaderDropdownNotification
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    ...mapActions('notifications', ['getNotificationInfo']),
    updatNotification() {
      this.getNotificationInfo().then(data => {})
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.sockets.subscribe('newNotifications', (data) => {
      this.updatNotification();
    // setInterval(this.getNotificationInfo, 30000);
    });
  },
  created() {
    this.updatNotification();
  },
  watch: {
    loggedInUser: {
      deep: true,
      immediate: true,
      handler(val) {
        if(this.loggedInUser)
          this.$socket.emit('new-user', this.loggedInUser);
      }
    }
  }
}
</script>
<style>
    .multi-language{
        float: right;
    }
</style>
