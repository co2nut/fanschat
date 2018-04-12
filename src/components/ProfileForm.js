import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { nameChange, updateProfile, initProfile} from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
//import ImageView from 'react-native-image-view';
import ImageView from './common/ImageView';
import FastImage from 'react-native-fast-image';
import { Avatar } from 'react-native-elements';

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {isShowImageView: false};
  }
  onNameChange(text) {
    this.props.nameChange(text);
  }

  onUpdateProfilePress() {
    const { name, imageUrl } = this.props;
    this.props.updateProfile({ name, imageUrl });
  }

  onImageClick(){
    this.setState({isShowImageView: true});
  }
  onImageClose(){
    this.setState({isShowImageView: false});
  }

  renderButton() {
    if(this.props.loading){
      return ( <Spinner size="large" /> );
    }
    return (
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Button onPress={this.onUpdateProfilePress.bind(this)}>
          Update Profile
        </Button>
      </View>
    );

  }

  renderImage(){
    const { imageUrl } = this.props;
    if(!imageUrl){
      return(
        <TouchableOpacity onPress={this.onUploadImage.bind(this)}>
          <View style={[styles.companyLogo, {opacity:0.5}]}>
            <Icon name="camera" size={25} color="#fff"  style={{ alignSelf: 'center'}}/>
          </View>
        </TouchableOpacity>
      )
    }else{
      return(
        <View>
          <View style={ styles.companyPic }>
             <Avatar
                xlarge
                rounded
                source={{uri: imageUrl}}
                onPress={this.onImageClick.bind(this)}
                activeOpacity={0.7}
              />
              <ImageView
                source={{uri: imageUrl}}
                isVisible={this.state.isShowImageView}
                animationType={'scale'}
                onClose={this.onImageClose.bind(this)}
                // imageWidth={600}
                // imageHeight={400}
              />
          </View>
          <TouchableOpacity onPress={this.onUploadImage.bind(this)}>
            <Icon name="camera" size={25} color="grey"  style={{ alignSelf: 'center', opacity:0.8, marginBottom:30}}/>
          </TouchableOpacity>
        </View>
      )
    }
  }

  onUploadImage(){
    const { currentUser } = firebase.auth();
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      quality:0.5
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel) {
        const { name } = this.props;

        let messageType = 1;// image
        let source = { uri: response.uri };
        const uploadUri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        const imageRef = firebase.storage().ref(`images/profile/${currentUser.uid}`);
        let mime = 'image/jpg';
        this.props.updateProfile({ name, imageUrl:uploadUri });

        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, {type: `${mime};BASE64`})
        })
        .then((blob)=>{
          uploadBlob = blob;
          return imageRef.put(blob, {contentType: mime} )
        })
        .then((url)=>{
          this.props.updateProfile({ name, imageUrl:url.downloadURL });
        })
        .catch((err)=>{console.log(err)})
      }
    });

  }

  render() {
    const { currentUser } = firebase.auth();
    return(
      <Card>
          {this.renderImage()}
        <CardSection>
          <Input
            label="Name"
            placeholder="Name"
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.name}
          />
          <Text></Text>
        </CardSection>

        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            value={this.props.email}
            editable={false}
          />
          <Text></Text>
        </CardSection>

        <Text style={ styles.errorTextStyle }>
          {this.props.error}
        </Text>

        <CardSection style={{ borderBottomWidth: 0 }}>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
};

const styles = {
    termText: {
      fontSize: 12,
      color:'#82837E',
      marginLeft: 10
    },
    terms: {
      padding: 10,
      flexDirection: 'row'
    },
    companyLogo : {
      borderRadius: 150/2,
      height: 150,
      width: 150,
      marginBottom:30,
      marginTop:30,
      // opacity: 0.5,
      backgroundColor: '#E0E0E0',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    companyPic : {
      borderRadius: 150/2,
      height: 150,
      width: 150,
      marginBottom:20,
      marginTop:30,
      // opacity: 0.5,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    errorTextStyle: {
      marginTop:10,
      fontSize: 16,
      alignSelf: 'center',
      color: 'red'
    }
}


const mapStateToProps  = ({ profile }) => {
  const {  name, email, imageUrl, loading  } = profile;
  return {  name, email, imageUrl, loading };
}

export default connect(mapStateToProps, {
   nameChange, updateProfile, initProfile
})(ProfileForm);
