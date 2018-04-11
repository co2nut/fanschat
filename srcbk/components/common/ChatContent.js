import React, { Component } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { Card, CardSection } from '../common';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import ImageView from 'react-native-image-view';
import FastImage from 'react-native-fast-image';
import RNFetchBlob from 'react-native-fetch-blob';


class ChatContent extends Component{
  constructor(props) {
    super(props);
    this.state = {isShowImageView: false, imagePath:this.props.chatInfo.localURL};
  }
  onImageClick(){
    this.setState({isShowImageView: true});
  }
  onImageClose(){
    this.setState({isShowImageView: false});
  }
  renderTime(){
    const { currentUser } = firebase.auth();
    const { time, sender, messageType } = this.props.chatInfo;
    let flexPos = 'flex-start';
    let n = require('day-format');
    let format = 'hh:i';
    let timeFormat = new Date(time);

    if( currentUser.uid === sender ){
      flexPos = 'flex-end';
    }
    return (
      <View style={{alignSelf:flexPos, opacity:0.6}}><Text style={{fontSize:11}}>{n.date({format, date:timeFormat.toString()})}</Text></View>
    )
  }

  renderContent(){
    const { time, content, sender, messageType, downloadURL, localURL } = this.props.chatInfo;
    // console.log(this.state.imagePath);
    // <Image
    //    style={{width: 200, height: 200}}
    //    source={{uri: this.state.imagePath}}
    //    onError={()=>{
    //      this.setState({ imagePath: downloadURL})
    //     }
    //    }
    //  />

    if(messageType === 1){
      return (
        <View>
          <TouchableOpacity onPress={ this.onImageClick.bind(this) }>
          <FastImage
              style={{width: 200, height: 200}}
              source={{
                uri: this.state.imagePath,
                priority: FastImage.priority.fast,
              }}
              resizeMode={FastImage.resizeMode.cover}
              onError={()=>{
                this.setState({ imagePath: downloadURL})
              }}
          />

          </TouchableOpacity>
          <ImageView
            imageWidth={1000}
            imageHeight={800}
            source={{uri: this.state.imagePath}}
            isVisible={this.state.isShowImageView}
            animationType={'scale'}
            onClose={this.onImageClose.bind(this)}
          />
        </View>
      )
    }else{
      return (<Text style={{fontSize:15}}>{content}</Text>)
    }
  }
  render() {
    const { time, sender, messageType } = this.props.chatInfo;
    const { currentUser } = firebase.auth();
    let contentStyle = [styles.commonContent,styles.sender];
    let imageStyle = styles.imageSender;
    let bubbleStyle = styles.bubbleLeft;

    if( currentUser.uid === sender ){
      contentStyle = [styles.commonContent, styles.receiver];
      imageStyle = styles.imageReceiver;
      bubbleStyle = styles.bubbleRight;
    }
    if( messageType === 1 ){
      return (
        <View style={imageStyle}>
        {this.renderContent()}
        {this.renderTime()}
        <View style={bubbleStyle} />
        </View>
      );
    }else{
      return (
        <View style={contentStyle}>
          {this.renderContent()}
          {this.renderTime()}
          <View style={bubbleStyle} />
        </View>

      );
    }
  }
}

// const commonStyle = {
//   commonContent:{
//     backgroundColor:'#AAB3AB',
//     opacity:0.8,
//     borderTopRightRadius:5,
//     borderTopLeftRadius:5,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginTop: 10,
//   }
// }
const styles = {

  bubbleLeft: {
    position: 'absolute',
    left: -5,
    bottom: 0,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: '#AAB3AB',
  },

  bubbleRight: {
    position: 'absolute',
    right: -5,
    bottom: 0,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: '#7FC7AF',
  },

  imageSender: {
    backgroundColor:'#AAB3AB',
    opacity:0.8,
    borderRadius:5,
    alignSelf:'flex-start',
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
  },

  commonContent:{
    opacity:0.8,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },

  sender: {
    backgroundColor:'#AAB3AB',
    marginLeft: 10,
    alignSelf:'flex-start',
    borderBottomRightRadius: 5,
  },

  imageReceiver: {
    backgroundColor:'#7FC7AF',
    opacity:0.8,
    borderRadius:5,
    alignSelf:'flex-end',
    padding: 5,
    marginTop: 15,
    marginRight: 15,
  },

  receiver: {
    backgroundColor:'#7FC7AF',
    marginRight: 10,
    alignSelf:'flex-end',
    borderBottomLeftRadius: 5,
  }
};

export default ChatContent;
