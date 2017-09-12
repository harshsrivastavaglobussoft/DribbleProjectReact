/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


 import React,{Component} from 'react';
 import {
   AppRegistry,
 } from 'react-native';
 import {StackNavigator,} from 'react-navigation';
 import Segment from './views/home';
 import viewPhoto from './views/viewphoto';

 class reactNavigationSample extends Component {
   render(){
     return (
       <Segment/>
     );
   }
 }


 AppRegistry.registerComponent('dribbleReact',() => reactNavigationSample);
