import React,{Component} from 'react';
import {AppRegistry,View,StyleSheet,Modal} from 'react-native';
import * as Progress from 'react-native-progress';
import ApiModel from '../api/apimodel';

export default class Loader extends Component{
constructor(props){
  super(props);
  this.state={
    visible: false
  };
}
_showProgress=()=>{
this.setState({
  visible : true
});
}
componentWillMount(){
 ApiModel.sharedInstance()._saveActivityIndicatorPonter(this);
}
_hideProgress=()=>{
  this.setState({
    visible: false
  });
}
render(){
  return(
    <Modal animationType = {"fade"} transparent = {true}
            visible = {this.state.visible}
            onRequestClose = {() => { console.log("Modal has been closed.") } }>
            <View style={styles.IndicatorView}>
            <View style={styles.activityIndicatorContainer}>
            <Progress.CircleSnail color={['red', 'green', 'blue']}/>
            </View>
            </View>
            </Modal>
  );
}

}

const styles = StyleSheet.create({
   IndicatorView : {
    flex: 1,
    marginTop : 22,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorContainer : {
   height:150,
   width: 150,
  },
});
