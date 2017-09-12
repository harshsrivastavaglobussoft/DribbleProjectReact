import React,{Component} from 'react';
import {AppRegistry} from 'react-native';

export default class ApiModel extends Component {
  constructor(props) {
    super(props);
    this.state={
      reboundPointer : null,
      popularPointer : null,
      timePointer : null,
      viewPhotoPointer: null,
      activityIndicatorPointer : null,
    };
  }

  static getInstance = null;

  static sharedInstance=()=>{
    if (this.getInstance == null) {
      this.getInstance= new ApiModel();
    }
    return this.getInstance;
  }

  _saveActivityIndicatorPonter=(pointer)=>{
    this.state.activityIndicatorPointer=pointer;
  }

  _saveViewPhotoPointer=(pointer)=>{
    this.state.viewPhotoPointer=pointer;
  }
  _returnViewPhotoPointer=()=>{
    return this.state.viewPhotoPointer;
  }
 _saveReboundPointer=(pointer)=>{
  this.state.reboundPointer = pointer;
 }
 _savePopularPointer=(pointer)=>{
   this.state.popularPointer = pointer;
 }
 _saveTimePointer=(pointer)=>{
   this.state.timePointer = pointer;
 }
  async _dataForReboundTable(){
    this.state.activityIndicatorPointer._showProgress();
    let url = 'https://api.dribbble.com/v1/shots?sort=&access_token=a589847521cfb6420457b84d97addee8c7b108ad49d9a5768f66109bc0bbea21';
    console.log('url : ' + url);
    try {
        let resp = await fetch(url);
        let jsonResponse = await resp.json();
        this.state.activityIndicatorPointer._hideProgress();
        this.state.reboundPointer._UpdateReboundData(jsonResponse);
    } catch(error) {
        return error
    }
  }


  async _dataForPopularTable(){
    this.state.activityIndicatorPointer._showProgress();
    let url = 'https://api.dribbble.com/v1/shots?sort=&list=rebounds&access_token=a589847521cfb6420457b84d97addee8c7b108ad49d9a5768f66109bc0bbea21';
    console.log('url : ' + url);
    try {
        let resp = await fetch(url);
        let jsonResponse = await resp.json();
        this.state.activityIndicatorPointer._hideProgress();
        this.state.popularPointer._UpdatePopularData(jsonResponse);
    } catch(error) {
        return error
    }
  }

  async _dataForTimeTable(){
    this.state.activityIndicatorPointer._showProgress();
    let url = 'https://api.dribbble.com/v1/shots?sort=&list=teams&access_token=a589847521cfb6420457b84d97addee8c7b108ad49d9a5768f66109bc0bbea21';
    console.log('url : ' + url);
    try {
        let resp = await fetch(url);
        let jsonResponse = await resp.json();
        this.state.activityIndicatorPointer._hideProgress();
        this.state.timePointer._UpdateTimeData(jsonResponse);
    } catch(error) {
        return error
    }
  }

}
