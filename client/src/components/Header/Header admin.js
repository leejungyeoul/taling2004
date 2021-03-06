import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import 'react-app-polyfill/ie11';
import axios from "axios";
import Swal from 'sweetalert2'
import $ from 'jquery';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            responseNotice: '',    //subcode response 변수
            append_NoticeFld: '',   //연구분야 append 변수
            notice_cnt: '',   //알림 갯수
            //관리자 세션 처리
            admin_usernm:'', //관리자 이름
            admin_userid:'', //관리자 아이디
        };

        this.temp_ref = () => {
            $(this).css('display', 'block');
        }
    }

    componentDidMount() {
        var cookie_admin_userid = cookie.load('userid')
        var cookie_admin_usernm = cookie.load('username')

        //사용자가 페이지 로드를 한 시점부터 다시 세션시간 계산
        if(cookie_admin_userid != undefined){
            const expires = new Date()
            expires.setMinutes(expires.getMinutes() + 60)
            cookie.save('userid', cookie_admin_userid
                , {
                    path: '/',
                    expires
                }
            );
            cookie.save('username', cookie_admin_usernm
            , {
                path: '/',
                expires
                }
            );
            cookie.save('user_flag', 'Y'
                , {
                    path: '/',
                    expires
                }
            );
            $('.menulist').show()
            $('.hd_top').show()
        }else{
            $('.menulist').hide()
            $('.hd_top').hide()
        }
        this.callSessionInfoApi()
    }

    // 커뮤니티 탭 드롭다운 이벤트
    mouseEnter () {
        $('.gn_2').stop().slideDown(300);
    };

    // 커뮤니티 탭 드롭다운 이벤트
    mouseLeave () {
        $('.gn_2').stop().slideUp(300);
    };

    // 내 정보 영역 마우스 hover 이벤트
    myInfoHover () {
        $(".hd_left > li > .box1").stop().fadeIn(400);
    }
    
    // 내 정보 영역 마우스 leave 이벤트
    myInfoLeave () {
        $(".hd_left > li > .box1").stop().fadeOut(400);
    }
    
    // 알림 영역 마우스 hover 이벤트
    alarmHover = (e) => {
        // this.callNoticeApi('display')
    }

    // 알림 영역 마우스 hover 이벤트
    alarmLeave () {
        $(".hd_left > li > .box0").stop().fadeOut(400);
    }

    //로그아웃 아이디 세션 정보 삭제
    logout = async e => {
        cookie.remove('userid', { path: '/'});
        cookie.remove('username', { path: '/'});
        cookie.remove('user_flag', { path: '/'});
        cookie.remove('userpassword', { path: '/'});

        window.location.href = '/admin';
    }

    // 쿠키값 userid, username 호출
    callSessionInfoApi = (type) => {
        axios.post('/api/LoginForm?type=SessionConfirm', {
            token1 : cookie.load('userid') 
            , token2 : cookie.load('username') 
        })
        .then( response => {
            this.state.admin_usernm = response.data.token2
            this.state.admin_userid = response.data.token1
        })
        .catch( error => {this.sweetalert('작업중 오류가 발생하였습니다.', error, 'error', '닫기');return false;} );
    }

    //alert 기본 함수
    sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
          })
    }

    render () {
        return(
            <header className="gnb_box">
                    <div className="hd_top">
                        <div className="top_wrap ct1 af">
                        <ul className="hd_left af">
                            <li className="my1" onMouseEnter={this.myInfoHover} onMouseLeave={this.myInfoLeave}><b>내정보</b>
                            <div className="box0 box1">
                                <ul>
                                <li><Link to={'/register'}>내 정보 수정</Link></li>
                                <li><a href="javascript:" onClick={this.logout}>로그아웃</a></li>
                                </ul>
                            </div>
                            </li>
                            <li  className="my2" onMouseEnter={this.alarmHover} onMouseLeave={this.alarmLeave}><b><span>{this.state.notice_cnt}</span>알림</b>
                            <div className="box0 box2">
                                <ul className="al_box">
                                    {this.state.append_NoticeFld}
                                </ul>
                                <span className="bt_ty1">
                                {/* <a href="javascript:" onClick={this.deleteNotice}>알림 모두 제거</a> */}
                                </span>
                            </div>
                            </li>
                        </ul>
                        <div className="hd_right">
                            <p><span>'{this.state.admin_usernm}'</span>님 반갑습니다.</p>
                        </div>
                        </div>
                    </div>
                <div className="h_nav ct1 af">
                    <div className="logo">
                        <Link to={'/admin'}><img src={require("../../img/layout/logo.jpg")} height="65px" width="200px" alt=""/></Link>
                    </div>
                    <nav className="gnb gnb_admin">
                    <ul className="af">
                        <li className="menulist">
                            <Link to={'/UserApproval'}>사용자 관리</Link>
                        </li>
                        <li className="menulist">
                            <Link to={'/AdminResearchProject'}>Research Projects 관리</Link>
                        </li>
                        <li className="menulist">
                            <Link to={'/AdminSoftwareList'}>Software Tools 관리</Link>
                        </li>
                        <li className="menulist">
                            <Link to={'/AdminDataSourceList'}>Data Sources 관리</Link>
                        </li>
                        {/* 드롭다운 이벤트 */}
                        <li  className="menulist" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} ><Link to={'/floatPopulationList'}>유동인구 조회</Link>
                        <ul className="gn_2">
                            <li><Link to={'/community/notice'}>공지사항</Link></li>
                        </ul>
                        </li>
                        <li  className="menulist">
                            <Link to={'/SubCodeManage'}>Sub code 관리</Link>
                        </li>
                    </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;