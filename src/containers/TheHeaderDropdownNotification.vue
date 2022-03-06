<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom"
    add-menu-classes="pt-0"
    :show.sync="isOpen"
  >
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cil-bell" />
        <span v-if="isMark" class="unread-mark danger"></span>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Notifications</strong>
      <CDropdownItem class="p-0">
        <CButton
          size="sm"
          color="info"
          shape="pill"
          variant="ghost"
          class="go-to-notification"
          @click="goToNotificationPage"
        >
          <CIcon name="cil-arrow-right" />
        </CButton>
      </CDropdownItem>
    </CDropdownHeader>
    <CDropdownItem @click="handleClick('post')" class="dropdown_items_modify">
      <CIcon name="cil-bell"/> Updates
      <CBadge color="info" class="ml-auto">{{ unread.post || 0 }}</CBadge>
    </CDropdownItem>
    <CDropdownItem class="dropdown_items_modify">
      <CIcon name="cil-envelope-open" /> Messages
      <CBadge color="success" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem @click="handleClick('settle')" class="dropdown_items_modify">
      <CIcon name="cil-task" /> Settled Tips
      <CBadge color="danger" class="ml-auto">{{ unread.settle || 0 }}</CBadge>
    </CDropdownItem>
    <CDropdownItem @click="handleClick('comment')" class="dropdown_items_modify">
      <CIcon name="cil-comment-square" /> Comments
      <CBadge color="warning" class="ml-auto">{{ (unread.comment || 0) + (unread['comment-reply'] || 0) }}</CBadge>
    </CDropdownItem>
  </CDropdown>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 0,
      isMark: false,
      isOpen: false,
    }
  },
  computed: {
    ...mapGetters('notifications', {
      unread: 'unread'
    }),
    isNewNotification() {
      let total = 0;
      for(const property in this.unread) {
        total += this.unread[property];
      }
      return total !== 0;
    }
  },
  methods: {
    goToNotificationPage() {
      this.$router.push({name: "Notification"});
    },
    handleClick(type) {
      this.$router.push({
        name: "Notification",
        params: {
          type
        }
      });
    }
  },
  created() {
  },
  watch: {
    unread: {
      deep: true,
      immediate: true,
      handler(val) {
        this.isMark = this.isNewNotification;
      }
    },
    isOpen(val) {
      this.isMark = false;
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
  .go-to-notification {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 8px;
    padding: 0;
    border: none;
    color: black;
    background-color: transparent;
  }
  .unread-mark {
    top: 0;
  }

  .dropdown_items_modify{
    display: flex;
  }
</style>