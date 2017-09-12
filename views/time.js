import React,{Component} from 'react';
import {AppRegistry,View,StyleSheet,FlatList,Text,Image,TouchableHighlight} from 'react-native';
import ApiModel from '../api/apimodel';
import ViewPhoto from './viewphoto';
import Loader from './ActivityIndicatorView';

export default class  TimeCLass extends Component {
constructor(props){
  super(props);
  this.state = {
    TimeData : [],
  };
}
render(){
  return(
    <View style={styles.viewContainer}>
    <Loader/>
    <ViewPhoto/>
     <View style={styles.tableContainer}>
      <FlatList data={this.state.TimeData}
         keyExtractor ={item => item.id}
         renderItem={({item}) =>(
          <TouchableHighlight
             onPress={() => this._ViewPhotoAction(item)}>
          <View style={styles.rowContainer}>
            <Image style={styles.photoView} source={{uri: item.images.normal }}/>
             <View style={styles.DetailsContainer}>
               <View style={styles.statsView}>
                 <View style={styles.statsDetailContainer}>
                   <View style={styles.iconContainer}>
                     <Image style={styles.icon} source={require('../Icons/eye.png')}/>
                   </View>
                   <Text style={styles.textStyle}>{item.views_count}</Text>
                 </View>
                 <View style={styles.statsDetailContainer}>
                   <View style={styles.iconContainer}>
                     <Image style={styles.icon} source={require('../Icons/comment.png')}/>
                   </View>
                   <Text style={styles.textStyle}>{item.comments_count}</Text>
                </View>
                <View style={styles.statsDetailContainer}>
                   <View style={styles.iconContainer}>
                     <Image style={styles.icon} source={require('../Icons/like.png')}/>
                   </View>
                   <Text style={styles.textStyle}>{item.likes_count}</Text>
               </View>
             </View>
             <View style={styles.userContainer}>
                <Image style={styles.profileImage} source={{uri: item.user.avatar_url }}/>
                <Text style={styles.nameContainer}>{item.user.name}</Text>
             </View>

       </View>

       </View>
       </TouchableHighlight>
    )}/>
    </View>
    </View>
  )
}
componentWillMount(){

  ApiModel.sharedInstance()._saveTimePointer(this);
}

componentDidMount(){
  ApiModel.sharedInstance()._dataForTimeTable();
}

_UpdateTimeData=(tempData)=>{
    this.setState({
      TimeData : Array.from(tempData),
    });
}
_ViewPhotoAction=(data)=>{
  ApiModel.sharedInstance()._returnViewPhotoPointer()._DataforModal(data);
  ApiModel.sharedInstance()._returnViewPhotoPointer().toggleModal(true);
}
}

const styles = StyleSheet.create({
 viewContainer : {
   flex: 1,
 },
 tableContainer: {
   flex :1,
   backgroundColor: 'rgba(244,244,244,1)',
 },
 rowContainer : {
   marginTop : 15,
   height : 400,
   marginLeft: 10,
   marginRight: 10,
   flexDirection: 'column',
   backgroundColor: 'rgba(255,255,255,1)',
 },
 photoView : {
   marginTop: '5%',
   height : '70%',
   width : '90%',
   marginLeft : '5%',
 },
 DetailsContainer :{
   height:'20%',
   backgroundColor: 'rgba(255,255,255,1)',
 },
 itemContainer : {
   marginLeft: 10,
   paddingTop: 10,
   fontSize: 18,
   height: 60,
   color: 'rgba(74,135,184,1)'
 },
 statsView : {
   height:'50%',
   width: '90%',
   marginLeft: '5%',
   flexDirection: 'row',
   justifyContent: 'space-around',
 },
 statsDetailContainer : {
   height: '100%',
   width: '33%',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-around',
 },
 iconContainer: {
   height: '100%',
   width: '40%',
 },
 icon: {
   marginLeft: '10%',
   marginTop: '10%',
   height: '80%',
   width: '80%',
 },
 textStyle: {
   height:'100%',
   width: '60%',
   fontSize: 14,
   padding: 10,
   color: 'rgba(170,170,170,1)',
   fontStyle: 'italic',
 },
 userContainer : {
   height:'50%',
   width: '90%',
   marginLeft: '5%',
   flexDirection: 'row',
 },
 profileImage : {
   height:'100%',
   width: 40,
   borderRadius: 20,
 },
 nameContainer : {
   height:'100%',
   fontSize: 17,
   padding: 10,
   color: 'steelblue',
   fontWeight: 'bold',
 },
});
AppRegistry.registerComponent('TimeCLass',()=>TimeCLass);
