import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store';

import MainView from "../views/MainView";
import AdminVue from "../views/AdminVue";
import StatsList from "../views/StatsList";
import LiveStats from "../views/LiveStats";
import PredictionStats from "../views/prediction_stats";
import TeamAnalysis from "../views/TeamAnalysis";
import HistoricDataUpload from "../views/HistoricDataUpload";
import prediction_upload from "../views/prediction_upload";
import LiveStatsAnalysis from "../views/LiveStatsAnalysis";
import LiveStatsAnalysis1 from "../views/LiveStatsAnalysis1";
import viewevents from "../views/viewevents";
import LiveStatsNew from "../views/LiveStatsNew";
import ColdStats2 from "../views/ColdStats2";
import LeagueTable from "../views/LeagueTable";

import MoneyManage from "@/components/MoneyComponent";
import DetailPage from "@/components/DetailComponent";
import PageSetting from "@/components/PagesettingComponent";
import UserSetting from "@/components/UsersettingComponent";
import membership from "../views/membership";

import {isAuthenticatedGuard} from "@/helpers/guard";

// Containers
const TheContainer = () => import("@/containers/TheContainer");

// Views
const Dashboard = () => import("@/views/Dashboard");

// const NavDashboard = () => import("@/views/navigations/pages/NavDashboard");
const NavDashboard = () => import("@/views/NavDashboard");

const Colors = () => import("@/views/theme/Colors");
const Typography = () => import("@/views/theme/Typography");

const Charts = () => import("@/views/charts/Charts");
const Widgets = () => import("@/views/widgets/Widgets");

// Views - Components
const Cards = () => import("@/views/base/Cards");
const Forms = () => import("@/views/base/Forms");
const Switches = () => import("@/views/base/Switches");
const Tables = () => import("@/views/base/Tables");
const Tabs = () => import("@/views/base/Tabs");
const Breadcrumbs = () => import("@/views/base/Breadcrumbs");
const Carousels = () => import("@/views/base/Carousels");
const Collapses = () => import("@/views/base/Collapses");
const Jumbotrons = () => import("@/views/base/Jumbotrons");
const ListGroups = () => import("@/views/base/ListGroups");
const Navs = () => import("@/views/base/Navs");
const Navbars = () => import("@/views/base/Navbars");
const Paginations = () => import("@/views/base/Paginations");
const Popovers = () => import("@/views/base/Popovers");
const ProgressBars = () => import("@/views/base/ProgressBars");
const Tooltips = () => import("@/views/base/Tooltips");


// Views - Buttons
const StandardButtons = () => import("@/views/buttons/StandardButtons");
const ButtonGroups = () => import("@/views/buttons/ButtonGroups");
const Dropdowns = () => import("@/views/buttons/Dropdowns");
const BrandButtons = () => import("@/views/buttons/BrandButtons");

// Views - Icons
const CoreUIIcons = () => import("@/views/icons/CoreUIIcons");
const Brands = () => import("@/views/icons/Brands");
const Flags = () => import("@/views/icons/Flags");

// Views - Notifications
const Alerts = () => import("@/views/notifications/Alerts");
const Badges = () => import("@/views/notifications/Badges");
const Modals = () => import("@/views/notifications/Modals");

// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");
const Login = () => import("@/components/LoginComponent");
const Register = () => import("@/views/pages/Register");

// Users
const Users = () => import("@/views/users/Users");
const User = () => import("@/views/users/User");

// Statistic pages
const Statistic = () => import("@/components/StatisticTable");
const StatisticDetail = () => import("@/components/StatisticDetail")
const Matches = () => import("@/components/MatchesTable")

Vue.use(VueRouter);

const Router = new VueRouter({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});



function configRoutes() {

   const ifAuthenticated = (to, from, next) => {
      console.log('to', to)
      console.log('from', from)
      console.log('next', next)

      if (localStorage.getItem('token') && localStorage.getItem('membership_level')) {
          console.log('lang', localStorage.getItem('lang'))
          if (!localStorage.getItem('lang') || localStorage.getItem('lang') == null) {
            console.log('lang response1')
            var user_id = localStorage.getItem('user_id');
            var xhr0 = new XMLHttpRequest();
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
                }
            };

            var data = {user_id: user_id}

            xhr0.open('GET', `${process.env.VUE_APP_URL}get_usersetting/${user_id}`, true);
            // xhr.setRequestHeader("Content-type", "application/json");
            xhr0.send()

          }
          if (localStorage.getItem('admin') == 'true') {

            console.log('go to admin')
            next();
            return;
          }
          else {
            console.log(' no admin ')
            var nexturl_name = to.name;
            console.log('nexturl_name', nexturl_name)
            if (nexturl_name == 'UserSetting' || from.name == "MoneyManage") {
              next();
              return;
            }

            var membership_level = localStorage.getItem('membership_level')

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4){
                    var response = JSON.parse(xhr.responseText);
                    
                    console.log('xhr.responseText.setting',response['setting'])
                    var visit_allowed = false
                    response.membership_setting.forEach((item) =>{
                      if (item.name == membership_level){

                         visit_allowed = item.value
                        
                      }
                    })
                    // if(response['setting'] == true) {
                    if( visit_allowed ) {
                      console.log('setting is true')
                      next();
                      return;
                    }
                    else {
                      console.log('setting is false')
                      if (from.path.includes('/pages/')) {
                        next({

                            // path: '/pages/404',
                            
                            path: 'membership',
                            params: { nextUrl: to.fullPath }
                        })
                      }
                      else {
                        next({

                            // path: '/pages/404',
                            
                            path: 'pages/membership',
                            params: { nextUrl: to.fullPath }
                        })
                      }
                      

                    }
                }
            };

            var data = {realname: nexturl_name}

            xhr.open('GET', `${process.env.VUE_APP_URL}api/pagesetting/check_page/${nexturl_name}`, true);
            xhr.send();
          }
          
      }
      else {
        console.log(' no token ')
        next({
            path: '/pages/login',
            params: { nextUrl: to.fullPath }
        })
      }

  };


  
  return [
    {
      path: "/",
      redirect: "/main_view",
      name: "Home",
      component: TheContainer,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "membership",
          name: "membership",
          component: membership          
        },

        {
          path: "theme",
          redirect: "/theme/colors",
          name: "Theme",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "colors",
              name: "Colors",
              component: Colors,
            },
            {
              path: "typography",
              name: "Typography",
              component: Typography,
            },
          ],
        },
        {
          path: "charts",
          name: "Charts",
          component: Charts,
        },
        {
          path: "main_view",
          name: "MainView",
          component: MainView,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "admin_view",
          name: "AdminView",
          component: AdminVue,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "stats_list",
          name: "StatsList",
          component: StatsList,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "cold_stats2",
          name: "ColdStats2",
          component: ColdStats2,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "live_stats",
          name: "LiveStats",
          component: LiveStats,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "predictionstats",
          name: "Pstats",
          component: PredictionStats,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "team_analysis",
          name: "Tanalysis",
          component: TeamAnalysis,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "historic_upload",
          name: "HistoricData",
          component: HistoricDataUpload,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "prediction_upload",
          name: "PredictionUpload",
          component: prediction_upload,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "livestats_analysis",
          name: "LiveStatsAnalysis",
          component: LiveStatsAnalysis,
          beforeEnter: ifAuthenticated,
        },        
        {
          path: "Search_stats",
          name: "Search Stats",
          component: LiveStatsAnalysis1,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "viewevents",
          name: "LiveStatsAnalysis1",
          component: viewevents,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "liveStatsNew",
          name: "liveStatsNew",
          component: LiveStatsNew,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "leagueTable",
          name: "LeagueTable",
          component: LeagueTable,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "nav-dashboard",
          name: "NavDashboard",
          component: NavDashboard,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "money",
          name: "MoneyManage",
          component: MoneyManage,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "pagesetting",
          name: "PageSetting",
          component: PageSetting,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "settings",
          name: "UserSetting",
          component: UserSetting,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "detail/:id",
          name: "DetailPage",
          component: DetailPage,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "statistic",
          name: "League Stats",
          component: Statistic,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "statistic/details/:id",
          name: "League Stats",
          component: StatisticDetail,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "statistic/matches/:id/:match_type/:match_label",
          name: "League Stats",
          component: Matches,
          beforeEnter: ifAuthenticated,
        },
        // {
        //   path: "notifications",
        //   redirect: "/notifications/alerts",
        //   name: "Notifications",
        //   component: {
        //     render(c) {
        //       return c("router-view");
        //     },
        //   },
        //   children: [
        //     {
        //       path: "alerts",
        //       name: "Alerts",
        //       component: Alerts,
        //     },
        //   ],
        // },
        {
          path: "post_tip",
          name: "PostTip",
          component: () => import('@/views/PostTip'),
          beforeEnter: isAuthenticatedGuard,
        },
        {
          path: "subscribed_users",
          name: "SubscribedUsers",
          component: () => import('@/views/SubscribedUsers'),
          beforeEnter: isAuthenticatedGuard,
        },
        {
          path: "feed_page",
          name: "FeedPage",
          component: () => import('@/views/FeedPage'),
          beforeEnter: isAuthenticatedGuard,
        },
        {
          path: "user_tip_stat/:id",
          meta: {
            label: "User Stat Details",
          },
          name: "UserTipStat",
          component: () => import('@/views/UserTipStat'),
          beforeEnter: isAuthenticatedGuard,
        },
        {
          path: 'user-strategy-stat/:id',
          meta: {
            label: 'User Strategy Details'
          },
          name: 'UserStrategyStat',
          component: () => import('@/views/UserStrategyStat'),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: "notification",
          name: "Notification",
          component: () => import('@/views/Notification'),
          beforeEnter: isAuthenticatedGuard,
        },
        {
          path: "profile",
          name: "Profile",
          component: () => import('@/views/Profile'),
          beforeEnter: isAuthenticatedGuard,
        }
      ],
    },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "404",
          name: "Page404",
          component: Page404,
        },
        {
          path: "500",
          name: "Page500",
          component: Page500,
        },
        {
          path: "login",
          name: "Login",
          component: Login,
        },
        {
          path: "register",
          name: "Register",
          component: Register,
        },
        {
          path: "membership",
          name: "membership",
          component: membership          
        },
      ],
    },
  ];
}

Router.beforeEach( (to, from, next) => {
  
  if(localStorage.getItem('token')) {
      store.dispatch('me');
  }
  
  next();
});

export default Router;
