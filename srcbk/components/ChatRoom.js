import _ from 'lodash';
import React, { Component } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, View, FlatList, SectionList, Text, TouchableOpacity, TextInput, Keyboard, PixelRatio } from 'react-native';
// import { SafeAreaView } from 'react-navigation';
import { Spinner, CardSection, Card, Button, Input } from '../components/common';
import ChatContent from '../components/common/ChatContent';
import { connect } from 'react-redux';
import { messageChanged, chatMessageFetch, chatMessageSend, loadMessage, chatLoadMessage, resetUnread, leaveRoom } from '../actions';
import { Actions } from 'react-native-router-flux';
import { Avatar, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';


class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      androidKeyboardUp: 6,
      mounted: false
    };

    this.getItemLayout = sectionListGetItemLayout({
      // The height of the row with rowData at the given sectionIndex and rowIndex
      getItemHeight: (rowData, sectionIndex, rowIndex) => rowData.messageType === 0 ? 52 : 234,

      // These four properties are optional
      getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
      getSectionHeaderHeight: () => 20, // The height of your section headers
      getSectionFooterHeight: () => 10, // The height of your section footers
      listHeaderHeight: 40, // The height of your list header
    })
  }

  scrollToBottom(){
    const { messages } = this.props;
    if(messages.length > 0 && this.messageList){
      this.messageList.scrollToLocation({
        itemIndex:0,
        sectionIndex:0,
        viewPosition:1,
        // animated:false
      })
    }
  }

  componentDidUpdate(){
    // this.scrollToBottom();
  }

  componentDidMount(){
    this.setState({mounted:true})
    // console.log('will mount');
    // console.log(this.state.mounted);
  }

  componentWillMount(){
    this.props.leaveRoom();
    this.setState({mounted:false})
    // console.log('will mount');
    // console.log(this.state.mounted);
    const { contact, loadCount, contactEmail, messages } = this.props;
    this.props.chatMessageFetch(contact, loadCount, contactEmail);
    // setTimeout(() =>
    // {
    //   this.scrollToBottom();
    // }
    // , 500);

    //for keyboard
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  componentWillReceiveProps(){
    // console.log('received from props');
  }

  componentWillUnmount() {
    // console.log('unmount');
    const { contact, roomId} = this.props;
    if(contact && roomId){
      this.props.resetUnread({contact, roomId});
    }

    //for keyboard
    this.keyboardWillShowSub.remove();
  }

  onMessageChange(text) {
    this.props.messageChanged(text);
  }

  onSendMessage(){
    // console.log('aaa');
    let messageType = 0;
    let downloadURL = '';
    let localURL = '';
    let chatRoomKey = '';
    const { messageInput, roomId, contact, contactEmail } = this.props;
    this.props.chatMessageSend( { messageInput, roomId, contact, contactEmail, messageType, downloadURL, localURL, chatRoomKey} )
    .then( ()=>{

      this.scrollToBottom()
      // setTimeout(() =>
      // {
      // }
      // , 800);
    })
  }

  onLoadOlderMessage(){
    if (!this.onEndReachedCalledDuringMomentum) {
      this.onEndReachedCalledDuringMomentum = true;
        const { roomId, loadCount } = this.props;
        // console.log('roomId : ' + roomId);
        setTimeout(() =>
        {
          //this.scrollToBottom()
          // debugger;
          this.props.loadMessage(roomId, loadCount)
        }
        , 800);
    }

  }

  keyboardWillShow = (event) => {
    if(Platform.OS === 'android'){
      this.setState({androidKeyboardUp: 1.5});
    }
    setTimeout(() =>
    {
      if(this.messageList){
        this.scrollToBottom()
      }
    }
    , 500);
  };

  keyboardWillHide = (event) => {
    if(Platform.OS === 'android'){
      this.setState({androidKeyboardUp: 6});
    }
  };

  renderSeparator(){
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "18%"
        }}
      />
    );
  }

  renderRow(data){
    return (
      <ChatContent chatInfo={data.item}/>
    )
  }

  renderHeader(data){
    let format = 'DD-MM-YYYY';
    let formatDiff = 'YYYY-MM-DD';
    let n = require('day-format');
    let sectionDate = new Date( (100000 - data.section.key) * 100000000);
    dateDiff =  parseInt(n.date({format:formatDiff, date:Date.now().toString()}).replace(/-/g,'')) - parseInt(n.date({format:formatDiff, date:sectionDate.toString()}).replace(/-/g,''));
    let result = 'Today';
    if( dateDiff > 1 ){
      if( dateDiff <= 7 ){
        format = 'l';
      }
      result = n.date({format, date:sectionDate.toString()});
    }

    return (
      <View style={{alignSelf:'center', marginTop: 10, paddingHorizontal: 10, borderRadius: 10, backgroundColor: '#F8ECC9', opacity:0.9}}>
        <Text>{result}</Text>
      </View>
    )
  }

  renderHeaderComponent(){
    // if(this.props.loading){
    //   return(
    //     <View style={{alignSelf:'center', marginTop: 10, paddingHorizontal: 10, borderRadius: 10, backgroundColor: '#F8ECC9', opacity:0.9}}>
    //       <Text>Loading</Text>
    //     </View>
    //   );
    // }
    // return (
    //   <View style={{alignSelf:'center', marginTop: 10, paddingHorizontal: 10, borderRadius: 10, backgroundColor: '#F8ECC9', opacity:0.9}}>
    //     <Text>Done</Text>
    //   </View>
    // )
  }

  onUploadImage(){
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      quality:0.5
    };

    ImagePicker.showImagePicker(options, (response) => {
      // console.log(response);
      if (!response.didCancel) {
        const { messageInput, roomId, contact, contactEmail } = this.props;
        let messageType = 1;// image

        let source = { uri: response.uri };
        const chatRoomKey = firebase.database().ref(`chatRoom`).push().key;
        const uploadUri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri
        // const uploadUri = response.uri;
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        const imageRef = firebase.storage().ref(`images/chat/${chatRoomKey}`);
        let mime = 'image/jpg';
        this.props.chatMessageSend( {
          messageInput,
          roomId,
          contact,
          contactEmail,
          messageType,
          downloadURL : "",
          localURL : uploadUri,
          chatRoomKey} )

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
          let downloadURL = url.downloadURL;
          return this.props.chatMessageSend( {
            messageInput,
            roomId,
            contact,
            contactEmail,
            messageType,
            downloadURL,
            localURL : uploadUri,
            chatRoomKey} )
        })
        .then( ()=>{
          this.scrollToBottom()
        })
        .catch((err)=>{console.log(err)})
      }
    });
  }

  render() {
    return (
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps='always'
          enableAutomaticScroll={true}
          bounces={false}
          behavior="padding"
          contentContainerStyle={{ flex:1, bottom:7 }}
          // enableResetScrollToCoords={true}
          // enableOnAndroid={true}
          // keyboardVerticalOffset={70}
          // scrollEnabled={false}
          // resetScrollToCoords={{ x: 0, y: 0 }}
          // enableResetScrollToCoords={true}
        >
          <List containerStyle={{ flex:Platform.OS === 'ios' ? 8 : this.state.androidKeyboardUp, borderTopWidth: 0, borderBottomWidth: 0 }}>
              <SectionList
                  // bounces={false}
                  inverted={true}
                  getItemLayout={ this.getItemLayout }
                  refreshing={ this.props.loading }
                  ref={(ref) => { this.messageList = ref; }}
                  //onRefresh={ this.onLoadOlderMessage.bind(this) }
                  sections={ this.props.messages }
                  renderItem={ this.renderRow }
                  renderSectionFooter={ this.renderHeader }
                  keyExtractor={(item) => item.time}
                  // stickySectionHeadersEnabled={true}
                  //ListFooterComponent={this.renderHeaderComponent.bind(this)}
                  onEndReached={this.onLoadOlderMessage.bind(this)}
                  onEndReachedThreshold={0.5}
                  onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}

              />
          </List>


          <View style={styles.messageInputCointanerStyle} >

              <TextInput
                multiline={true}
                numberOfLines={3}
                underlineColorAndroid="transparent"
                style={styles.messageInputStyle}
                onChangeText={this.onMessageChange.bind(this)}
                value={this.props.messageInput}
              />


              <TouchableOpacity style={{flex:0.5}} onPress={ this.onSendMessage.bind(this) }>
                <Icon name="send" size={20} color="#000"  style={{ alignSelf: 'center', opacity:0.7}}/>
              </TouchableOpacity>

              <TouchableOpacity style={{flex:0.2}}>
                <Icon name="ellipsis-v" size={20} color="#000"  style={{ alignSelf: 'center', opacity:0.7}}/>
              </TouchableOpacity>

              <TouchableOpacity style={{flex:0.5}} onPress={ this.onUploadImage.bind(this) } >
                <Icon name="camera" size={20} color="#000"  style={{ alignSelf: 'center', opacity:0.7}}/>
              </TouchableOpacity>
          </View>

        </KeyboardAwareScrollView>
    )
  }

}


const styles = {
    messageInputStyle : {
      // alignSelf: 'center',
      flex:4,
      opacity:0.7,
      paddingHorizontal:10,
      borderRadius:10,
      backgroundColor:'white',
      height:Platform.OS === 'ios' ? 28 : 38,
      borderColor: '#000',
      borderWidth:0.5,
      fontSize:15
    },

    messageInputCointanerStyle : {
      opacity:0.8,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      paddingHorizontal:5,
      paddingVertical:5
    }
}

const mapStateToProps = ({ chatMessages }) => {
  let messages = _.groupBy(chatMessages.messages, d=>(100000 - Math.trunc(d.time / 100000000)))
  messages = _.reduce(messages, (acc,next,index)=>{
    acc.push({
      key:index,
      data:next
    })
    return acc
  },[])


  const { loadCount, contactId, messageInput, roomId, loading } = chatMessages;
  // console.log(roomId);

  return { loadCount, messages, messageInput, contactId, roomId, loading };
}

export default connect(mapStateToProps,
    {
       messageChanged,
       chatMessageFetch,
       chatMessageSend,
       loadMessage,
       chatLoadMessage,
       resetUnread,
       leaveRoom
    })(ChatRoom);
