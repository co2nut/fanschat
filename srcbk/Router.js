import React, { Component } from 'react';
import { Text } from 'react-native';
import { Scene, Router, Stack, renderRightButton } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { showMenu, signUpRoute, tabPress } from './actions';
import LoginForm from './components/LoginForm';
import LoginFormFull from './components/LoginFormFull';
import SignupForm from './components/SignupForm';
import ProfileForm from './components/ProfileForm';
import ChatMain from './components/ChatMain';
import AddContact from './components/AddContact';
import PhoneBook from './components/PhoneBook';
import ChatRoom from './components/ChatRoom';
import { NavRight } from './components/common';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

// const RouterComponent = () => {
class RouterComponent extends Component {

  componentDidUpdate(){
    // console.log('b');
  }

  onPressMenu(){
    this.props.showMenu()
  }

  // renderMenu() {
    // if(this.props.menuPress){
    //   return (
    //     <CardSection>
    //       <View>
    //         <TouchableOpacity>
    //           <Text>Add User</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </CardSection>
    //   );
    // }
  // }

  render() {
    // {this.renderMenu()}
    return (
      <Router sceneStyle={styles.scenes}>
        <Scene key="root" >
          <Scene key="loginMain"  navigationBarStyle={{'height':0, 'borderBottomWidth':0, 'backgroundColor':'transparent'}} >
              <Scene
                // sceneStyle={styles.scenes}
                key="login"
                component={LoginForm}
                hideNavBar={true}
                // navigationBarStyle={{'backgroundColor':'transparent'}}
                // backTitle=""
                // rightTitle="right"
                // title=""
                initial
                />
              <Scene sceneStyle={styles.scenes} key="loginFull" component={LoginFormFull} hideNavBar={true} />

          </Scene>
          <Scene navigationBarStyle={{'backgroundColor':'#fff'}} sceneStyle={styles.scenes} key="signup" component={SignupForm} title="Sign Up" backTitle="" />
          <Scene navigationBarStyle={{'backgroundColor':'#fff'}} sceneStyle={styles.scenes} key="profile" component={ProfileForm} title="Profile" backTitle="" />
          <Scene navigationBarStyle={{'backgroundColor':'#fff'}} key="chatRoom"  title={this.props.contactEmail} component={ChatRoom} backTitle="" />

          <Scene navigationBarStyle={{'backgroundColor':'#fff'}} sceneStyle={styles.scenes} key="addContact" component={AddContact} title="AddContact" backTitle="" />
          {/*=======TABS=======*/}
          <Scene key="tabbar" tabs={true} hideNavBar tabBarPosition={'bottom'} tabBarStyle={{ backgroundColor: '#fff' }} showLabel={false} >
              <Scene key="chatMain"
                icon={TabIcon}
                iconName="commenting"
                component={ChatMain}
                title="Chats"
                navigationBarStyle={{ backgroundColor: '#fff' }}
                rightTitle="right"
                backTitle=""
                renderRightButton={()=>
                  <Icon
                    name="ellipsis-v"
                    size={20}
                    color="#9D9D93"
                    style={{paddingRight:25}}
                    onPress={()=>{ this.props.showMenu() }}
                  />
                }
              />

              <Scene key="phoneBook" navigationBarStyle={{'backgroundColor':'#fff'}} title="" icon={TabIcon} iconName="vcard" component={PhoneBook} title="PhoneBook"  />

              <Scene key="profile" navigationBarStyle={{'backgroundColor':'#fff'}} title="" tabBarOnPress={()=>this.props.tabPress()} icon={TabIcon} iconName="user-o" component={ProfileForm} title="Profile" />

          </Scene>
          {/*=======TABS=======*/}
        </Scene>

      </Router>
    );
  };
}

const TabIcon = ({ focused, iconName }) => {
  return (
    // <Text style={{color:focused ? 'blue':'grey'}}>{title}</Text>
    <Icon name={iconName} size={25} color="#000"  style={{color:focused ? '#7FC7AF':'grey', opacity:focused ?1:0.8}} />
  );
};

const styles = {
  scenes: {
    flex:1,
    backgroundColor: '#fff',
  }
}

const mapStateToProps  = ({ auth, chatMessages }) => {
  const { contactEmail  } = chatMessages;
  const {  menuPress } = auth;
  return { menuPress, contactEmail };
}

export default connect(mapStateToProps, {
  showMenu, tabPress
})(RouterComponent);
// export default RouterComponent;
