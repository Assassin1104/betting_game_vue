export default [
  {
    _name: 'CSidebarNav',
    _children: [
      // {
      //   _name: 'CSidebarNavItem',

      //   name: 'Dashboard',
      //   en_name: 'Dashboard',
      //   to: '/dashboard',
      //   icon: 'cil-speedometer',
      //   badge: {
      //     color: 'primary',
      //     text: 'NEW'
      //   }
      // },
      {
        _name: "CSidebarNavItem",
        name: "Feed Page",
        en_name: 'Feed Page',
        to: "/feed_page",
        addLinkClasses: 'menu-class',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'},
        badge: {
          color: 'primary',
          text: '0'
        }
      },
      {
        _name: "CSidebarNavItem",
        name: "Post a tip",
        en_name: 'Post a tip',
        to: "/post_tip",
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'},
      },
      {
        _name: "CSidebarNavItem",
        name: "User List Page",
        en_name: 'User List Page',
        to: "/subscribed_users",
         icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'},
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Main',
        en_name: 'Main',
        to: '/main_view',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Nav Dashboard',
        en_name: 'Nav Dashboard',
        to: '/nav-dashboard',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Cold Stats',
        en_name: 'Cold Stats',
        to: '/stats_list',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
      {
        _name: 'CSidebarNavItem',
        name: 'League Table',
        en_name: 'League Table',
        to: '/leagueTable',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
      {
        _name: "CSidebarNavItem",
        name: "League Stats",
        en_name: 'League Stats',
        to: "/statistic",
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },    
      {
        _name: 'CSidebarNavItem',
        name: 'liveStatsNew',
        en_name: 'liveStatsNew',
        to: '/liveStatsNew',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}        
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Team Analysis',
        en_name: 'Team Analysis',
        to: '/team_analysis',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },

      {
        _name: "CSidebarNavItem",
        name: "Money Manage",
        en_name: 'Money Manage',
        to: "/money",
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Value stats data',
        en_name: 'Value stats data',
        to: '/cold_stats2',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Live Stats Analysis 1',
        en_name: 'Live Stats Analysis 1',
        to: '/Search_stats',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
      {
        _name: 'CSidebarNavItem',
        name: 'AdminView',
        en_name: 'AdminView',
        to: '/admin_view',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },      
      {
        _name: 'CSidebarNavItem',
        name: 'Live Stats Analysis',
        en_name: 'Live Stats Analysis',
        to: '/livestats_analysis',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
      
      {
        _name: 'CSidebarNavItem',
        name: 'Prediction Stats',
        en_name: 'Prediction Stats',
        to: '/predictionstats',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
      
      {
        _name: 'CSidebarNavItem',
        name: 'Historic Data',
        en_name: 'Historic Data',
        to: '/historic_upload',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Prediction Upload',
        en_name: 'Prediction Upload',
        to: '/prediction_upload',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
      
      {
        _name: 'CSidebarNavItem',
        name: 'Today',
        en_name: 'Today',
        to: '/theme/colors',
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
      
      {
        _name: "CSidebarNavItem",
        name: "Page Setting",
        en_name: 'Page Setting',
        to: "/pagesetting",
        icon: {name: 'cil-football', customClasses: 'ball', size: 'custom'}
      },
    ]
  }
]