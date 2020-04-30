import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router";
import {Redirect} from 'react-router-dom'

import Api_test from './Api_test'
import cookie from 'react-cookies';
import axios from "axios";

// css
import '../css/new.css';
import '../css/owl.carousel.min.css';
import '../css/owl.theme.default.min.css';

// header
import HeaderAdmin from './Header/Header admin';

// footer
import Footer from './Footer/Footer';

// login
import LoginForm from './LoginForm';
import PwChangeForm from './PwChangeForm';

// admin floatingPopulationList
import floatingPopulationList from './Floating_population/floatingPopulationList';

// admin softwareinfo
import AdminSoftwareList from './SoftwareToolsManage/AdminSoftwareList';
import AdminSoftwareView from './SoftwareToolsManage/AdminSoftwareView';

// register
import Register from './Register/Register';
import RegisterCheck from './Register/RegisterCheck';

class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
    }
}

  componentDidMount() {
      
    // 비밀번호 재설정 패이지를 제외하고, 세션이 유효하지 않으면 home url로 이동.
    if(window.location.pathname.indexOf('/PwChangeForm') == -1){

      //쿠키에서 userid, username을 가져와 복호화한다.
      axios.post('/api/LoginForm?type=SessionConfirm', {
        token1 : cookie.load('userid') 
        , token2 : cookie.load('username') 
      })
      .then( response => {
          this.state.userid = response.data.token1
          let password = cookie.load('userpassword')
          if(password == undefined){
            password = ''
          }
          axios.post('/api/LoginForm?type=pwemail', {
            is_Email: this.state.userid,
            is_Token : password
          })
          .then( response => {
            if(response.data.json[0] !== undefined){
              var userid = response.data.json[0].useremail
                
              if(userid == undefined || password == undefined){
                window.location.href = '/nocookie/#nocookie';
              }
            }else{
              // 계정정보가 유효하지 않다면 세션값 삭제후, 홈으로 이동
              if(window.location.hash != 'nocookie'){
                this.remove_cookie();
                window.location.href = '/nocookie/#nocookie';
              }  
            }
          })
          .catch( response => {
            this.remove_cookie()
            window.location.href = '/nocookie/#nocookie';
          } );
      })
      .catch( response => {window.location.href = '/nocookie/#nocookie';} );
    }
  }

  //쿠키 초기화
  remove_cookie = (e) => {
    cookie.remove('userid', { path: '/'});
    cookie.remove('username', { path: '/'});
    cookie.remove('user_flag', { path: '/'});
    cookie.remove('userpassword', { path: '/'});
  }

  render () {
    return (
      <div className="App">
          <HeaderAdmin/> 
          <Switch>
          {
              (cookie.load('userid') !== undefined) ? (
                <Route exact path='/' component={AdminSoftwareList} />
              ):(
                  <Route exact path='/admin' component={LoginForm} />
              )
            }
            <Route exact path='/' component={LoginForm} />
            <Route path='/nocookie' component={LoginForm} />
            <Route path='/Api_test' component={Api_test} />
            <Route path='/floatPopulationList' component={floatingPopulationList} />
            <Route path='/AdminSoftwareList' component={AdminSoftwareList} />
            <Route path='/AdminSoftwareView/:swtcode' component={AdminSoftwareView} />
            <Route path='/register' component={Register} />
            <Route path='/register_check' component={RegisterCheck} />
            <Route path='/PwChangeForm/:email/:token' component={PwChangeForm} />
          </Switch>
          <Footer 
            footer_address={this.props.footer_address} 
            footer_tel={this.props.footer_tel}  
            footer_email={this.props.footer_email} 
            footer_mobile={this.props.footer_mobile} 
          />
      </div>
    );
  }
}

App.defaultProps = {
  // footer value
  footer_address: '[34234] 서울특별시 강남구 삼성동 111-114',
  footer_tel: '02-1234-5678',
  footer_email: 'ljung5@naver.com',
  footer_mobile: '010-3288-3398',
};

export default App