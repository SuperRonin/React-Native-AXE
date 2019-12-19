import React from 'react';
import {
  Image,
  StyleSheet,
  BackHandler
} from 'react-native';
// 路由相关
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// Tab主页
import HomePage from './Home/HomePage'
import FindPage from './Find/FindPage'
import SchedulingPage from './Scheduling/SchedulingPage'
import MinePage from './Mine/MinePage'
import MywebPage from './webview'
import TwoLevePage from './Home/demo/2nd-leve-page'
import scrollPage from './Home/demo/scroll'
import sectionListPage from './Home/demo/section'

// Tab菜单配置
const TabNavigator = createBottomTabNavigator({

  Home: {
    screen: HomePage,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          source={focused ? { uri: "https://www.bus365.com/public/www/images/icon_home_sel.png" } : { uri: "https://www.bus365.com/public/www/images/icon_home_nor.png" }}
          style={styles.tabBarIcon}
        />
      )
    }
  },
  Find: {
    screen: FindPage,
    navigationOptions: {
      tabBarLabel: '发现',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          source={focused ? { uri: "https://www.bus365.com/public/www/images/icon_selectfind.png" } : { uri: "https://www.bus365.com/public/www/images/icon_find.png" }}
          style={styles.tabBarIcon}
        />
      )
    }
  },
  Scheduling: {
    screen: SchedulingPage,
    navigationOptions: {
      tabBarLabel: '行程',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          source={focused ? { uri: "https://wwwd.bus365.cn/public/www/images/journey_select.png" } : { uri: "https://wwwd.bus365.cn/public/www/images/journey_normal.png" }}
          style={styles.tabBarIcon}
        />
      )
    }
  },
  Mine: {
    screen: MinePage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          source={focused ? { uri: "https://www.bus365.com/public/www/images/icon_selfinfo_sel.png" } : { uri: "https://www.bus365.com/public/www/images/icon_selfinfo_nor.png" }}
          style={styles.tabBarIcon}
        />
      )
    }
  }
}, {
  headerShown: false, 
  backBehavior: 'none',
});




// 页面历史堆栈
const MyApp = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    },
  },
  Myweb: MywebPage,
  Twoleve: TwoLevePage,
  Scroll: scrollPage,
  section: sectionListPage
}, {
  navigationOptions: {

  },
});

export default createAppContainer(MyApp);





const styles = StyleSheet.create({
  tabBarIcon: {
    width: 21,
    height: 21,
  }
})
