import React,{Component} from 'react';
import {View,StyleSheet,Text,Modal,TouchableOpacity,Image,CameraRoll,Alert,} from 'react-native';
import ApiModel from '../api/apimodel';
import renderIf from 'render-if';
import RNFetchBlob from 'react-native-fetch-blob';


export default class ViewPhoto extends Component {
  constructor(props){
    super(props);
    this.state={
      Data : null,
      modalVisible : false,
    }
  }
  componentWillMount(){
    ApiModel.sharedInstance()._saveViewPhotoPointer(this);
  }
  toggleModal(visible) {
     this.setState({ modalVisible: visible });
  }
  _DataforModal=(item)=>{
    this.setState({
      Data: item
    });
  }
  render(){
    return(
      <Modal animationType = {"fade"} transparent = {true}
              visible = {this.state.modalVisible}
              onRequestClose = {() => { console.log("Modal has been closed.") } }>
              <View style={styles.viewContainer}>

              <TouchableOpacity onPress={()=>this.toggleModal(false)}>
              <View style={styles.closeIconContainer}>
               <Image style={styles.closeIcon}source={require('../Icons/close.png')}/>
              </View>
              </TouchableOpacity>
              {this._conditionalRender()}
              </View>
           </Modal>
    )
  }
  _conditionalRender=()=>{
    if (this.state.Data==null) {
      //
    }else {
      return(
        <View style={styles.FullPhotoContainer}>
          <Image style={styles.photoView} source={{uri : this.state.Data.images.hidpi}}/>

        <View style={styles.DetailsContainer}>
            <View style={styles.profileContainer}>
              <Image style={styles.profileImage} source={{uri: this.state.Data.user.avatar_url }}/>
              <View style={styles.profileDetailsContainer}>
              <Text style={styles.nameContainer}>{this.state.Data.user.name}</Text>
              <View style={styles.lineContainer}/>
                <Text style={styles.locationContainer}>{this.state.Data.user.location}</Text>
              </View>
             </View>
             <View style={styles.ButtonContainer}>
               <TouchableOpacity onPress={()=>this._DownloadImage(this.state.Data.images.hidpi)}>
                <View style={styles.downloadButton}>
                  <Text style={styles.DownloadText}>Donwload</Text>
                </View>
               </TouchableOpacity>
             </View>
            </View>
        </View>
      );
    }
  }

  _DownloadImage=(url)=>{
    console.log(CameraRoll);
    console.log(RNFetchBlob);
    RNFetchBlob
       .config({
         fileCache : true,
         appendExt : 'jpg'
       })
       .fetch('GET', url)
       .then((res) => {
         console.log('======',res.path());
         CameraRoll.saveToCameraRoll(res.path())
           .then(Alert.alert('Success', 'Photo added to camera roll!'))
           .catch(err => console.log('err:', err))
       })
   }

}

const styles = StyleSheet.create ({
  viewContainer:{
    flex:1,
    backgroundColor : 'rgba(34,34,34,0.8)'
  },
  closeIconContainer : {
    marginTop:'5%',
    marginLeft: '75%',
    width: '20%',
    height: '20%',
  },
  closeIcon: {
    width:'100%',
    height:'100%',
  },
  FullPhotoContainer :{
    height: 450,
    marginRight: '5%',
    marginLeft: '5%',
    backgroundColor : 'rgba(255,255,255,1)',
  },
  photoView : {
    height: '60%',
    marginTop: 10,
    marginLeft: '3%',
    width: '94%',
  },
  DetailsContainer :{
    marginTop: '5%',
    height: '35%',
    backgroundColor: 'rgba(243,243,243,1)',
  },
  profileContainer: {
    height: '50%',
    flexDirection: 'row',
  },
  profileImage : {
    marginTop: 10,
    marginLeft: 5,
    height:70,
    width: 70,
    borderRadius: 35,
  },
  profileDetailsContainer : {
    height: '100%',
    flexDirection: 'column',

  },
  nameContainer : {
    height:'49%',
    fontSize: 20,
    padding: 10,
    color: 'steelblue',
    fontWeight: 'bold',
  },
  lineContainer:{
    marginLeft:10,
    height: '1%',
    width: '100%',
    backgroundColor: 'gray',

  },
  locationContainer : {
    height:'49%',
    fontSize: 17,
    padding: 10,
    color: 'black',
  },
  ButtonContainer: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    marginTop: '5%',
    height: '70%',
    width: 150,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(214,81,131,1)',
  },
  DownloadText:{
    color:'white',
    fontSize: 18,
    padding:13,
    alignSelf: 'center',
  },

});
