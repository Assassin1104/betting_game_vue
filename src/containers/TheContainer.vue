<style>

  @media (max-width: 991.98px) {
    .margin_top90 {
      margin-top: 90px !important;
    }
  }
</style>
<template>
  <div class="c-app">
    <TheHeader/>
    <div style="width:100%">
      <TheSidebar style = 'margin-top: 75px' class="margin_top90"/>
      <CWrapper>
        <div class="c-body margin_top90" style = 'margin-top : 75px;' >
          <main class="c-main">
            <CContainer fluid>
              <transition name="fade">
                <router-view></router-view>
              </transition>
            </CContainer>
          </main>
          <TheFooter/>
        </div>
      </CWrapper>
    </div>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'TheContainer',
  components: {
    TheHeader,
    TheSidebar,
    TheFooter
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
