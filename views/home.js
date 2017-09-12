
import React,{Component} from 'react';
import {Text,View,StyleSheet, Alert} from 'react-native';
import ReBound from './rebound';
import PopularData from './popular';
import TimeCLass from './time';
import ScrollableTabView ,{DefaultTabBar, } from 'react-native-scrollable-tab-view';


export default class Segment extends Component {
  constructor() {
    super();
  }
  render() {
      return (
        <ScrollableTabView
        style={{marginTop: 20, }}
        tabBarActiveTextColor='rgba(255,255,255,1)'
        tabBarInactiveTextColor= 'rgba(152,144,131,1)'
        renderTabBar={() => <DefaultTabBar backgroundColor='rgba(51, 51, 51, 1)'/>}>

        <ReBound tabLabel='Rebound'/>
        <PopularData tabLabel='Popular'/>
        <TimeCLass tabLabel='Time'/>

      </ScrollableTabView>
    );
    }
}
