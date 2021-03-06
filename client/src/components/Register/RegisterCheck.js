import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import $ from 'jquery';

class RegisterCheck extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            agree_value_1: false,
            agree_value_2: false,
            agree_value_3: false,
            go_register:false,
        }
    }

    // 약관 동의 체크 확인 function
    toggleChangeFunc = (e) => {
        let current_check_id = e.target.id;
        if(current_check_id === "check1")
        {
            this.state.agree_value_1 = !this.state.agree_value_1
            if(!this.state.agree_value_1){
                this.state.agree_value_3 = false
                $('#agree1').prop('checked',true)
            }
        }
        else if(current_check_id === "check2")
        {
            this.state.agree_value_2 = !this.state.agree_value_2
            if(!this.state.agree_value_2){
                this.state.agree_value_3 = false
                $('#agree1').prop('checked',true)
            }
        }
        if(current_check_id === "agree1"){
            if(!this.state.agree_value_3)
            {
                this.state.agree_value_1 = true
                this.state.agree_value_2 = true
                this.state.agree_value_3 = !this.state.agree_value_3
                $('#check1').prop('checked',true)
                $('#check2').prop('checked',true)
            }else{
                this.state.agree_value_1 = false
                this.state.agree_value_2 = false
                this.state.agree_value_3 = !this.state.agree_value_3
                $('#check1').prop('checked',false)
                $('#check2').prop('checked',false)
            }
        }
        if(this.state.agree_value_1 === true && this.state.agree_value_2 === true && this.state.agree_value_3 === true){
            this.setState({go_register : true})
        }else{
            this.setState({go_register : false})
        }
    }
    
    //회원 가입 페이지로 이동
    nextClick = () => {
            this.sweetalert('회원 가입을 위해서는 회원 약관에 \n동의하셔야 합니다.', '', 'info', '닫기')
    };

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
        return (
            <div>
                <section className="sub_wrap">
                    <article className="s_cnt re_check ct1">
                        <div className="li_top">
                            <h2 className="s_tit1">회원 약관</h2>
                            <div className="check_wrap">
                                <div className="check_cnt af">
                                    <div className="check_top">
                                        <h3>회원가입약관</h3>
                                        <input 
                                            type="checkbox" 
                                            name="" 
                                            id="check1" 
                                            // checked={this.state.agree_value_1}
                                            onChange={this.toggleChangeFunc}
                                        />
                                        <label htmlFor="check1">회원가입약관의 내용에 동의합니다.</label>
                                    </div>
                                    <div className="check_box">
                                        <textarea name="" rows="" cols="" disabled>
                제 1장 총칙
                제 1 조(목적)

                본 약관은 정열대학교산학협력단 웹사이트(이하 "정열대학교산학협력단")가 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차, 회원과 정열대학교산학협력단의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.

                제 2 조(약관의 효력과 변경)

                1. 정열대학교산학협력단은 이용자가 본 약관 내용에 동의하는 경우, 정열대학교산학협력단의 서비스 제공 행위 및 회원의 서비스 사용 행위에 본 약관이 우선적으로 적용됩니다.
                2. 정열대학교산학협력단은 약관을 개정할 경우, 적용일자 및 개정사유를 명시하여 현행약관과 함께 정열대학교산학협력단의 초기화면에 그 적용일 7일 이전부터 적용 전일까지 공지합니다. 단, 회원에 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 정열대학교산학협력단은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 회원이 알기 쉽도록 표시합니다.
                3. 변경된 약관은 정열대학교산학협력단 홈페이지에 공지하거나 e-mail을 통해 회원에게 공지하며, 약관의 부칙에 명시된 날부터 그 효력이 발생됩니다. 회원이 변경된 약관에 동의하지 않는 경우, 회원은 본인의 회원등록을 취소(회원탈퇴)할 수 있으며, 변경된 약관의 효력 발생일로부터 7일 이내에 거부의사를 표시하지 아니하고 서비스를 계속 사용할 경우는 약관 변경에 대한 동의로 간주됩니다.

                제 3 조(약관 외 준칙)

                본 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법, 정보통신윤리위원회심의규정, 정보통신 윤리강령, 프로그램보호법 및 기타 관련 법령의 규정에 의합니다.

                제 4 조(용어의 정의)

                본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                1. 이용자 : 본 약관에 따라 정열대학교산학협력단이 제공하는 서비스를 받는 자
                2. 가입 : 정열대학교산학협력단이 제공하는 신청서 양식에 해당 정보를 기입하고, 본 약관에 동의하여 서비스 이용계약을 완료시키는 행위
                3. 회원 : 정열대학교산학협력단에 개인 정보를 제공하여 회원 등록을 한 자로서 정열대학교산학협력단이 제공하는 서비스를 이용할 수 있는 자.
                4. 계정(ID) : 회원의 식별과 회원의 서비스 이용을 위하여 회원이 선정하고 정열대학교산학협력단에서 부여하는 문자와 숫자의 조합
                5. 비밀번호 : 회원과 계정이 일치하는지를 확인하고 통신상의 자신의 비밀보호를 위하여 회원 자신이 선정한 문자와 숫자의 조합
                6. 탈퇴 : 회원이 이용계약을 종료시키는 행위
                7. 본 약관에서 정의하지 않은 용어는 개별서비스에 대한 별도 약관 및 이용규정에서 정의합니다.


                제 2장 서비스 제공 및 이용

                제 5 조 (이용계약의 성립)

                1. 이용계약은 이용자가 온라인으로 정열대학교산학협력단에서 제공하는 소정의 가입신청 양식에서 요구하는 사항을 기록하여 가입을 완료하는 것으로 성립됩니다.
                2. 정열대학교산학협력단은 다음 각 호에 해당하는 이용계약에 대하여는 가입을 취소할 수 있습니다.
                1) 다른 사람의 명의를 사용하여 신청하였을 때
                2) 이용계약 신청서의 내용을 허위로 기재하였거나 신청하였을 때
                3) 다른 사람의 정열대학교산학협력단 서비스 이용을 방해하거나 그 정보를 도용하는 등의 행위를 하였을 때
                4) 정열대학교산학협력단을 이용하여 법령과 본 약관이 금지하는 행위를 하는 경우
                5) 기타 정열대학교산학협력단이 정한 이용신청요건이 미비 되었을 때

                제 6 조 (회원정보 사용에 대한 동의)

                1. 회원의 개인정보는 「공공기관의개인정보보호에관한법률」에 의해 보호됩니다.
                2. 정열대학교산학협력단의 회원 정보는 다음과 같이 사용, 관리, 보호됩니다.
                1) 개인정보의 사용 : 정열대학교산학협력단은 서비스 제공과 관련해서 수집된 회원의 신상정보를 본인의 승낙 없이 제3자에게 누설, 배포하지 않습 니다. 단, 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우, 범죄에 대한 수사상의 목적이 있거나 정보통신윤리위원회의 요청이 있는 경우 또는 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우, 이용자 스스로 개인정보를 공개한 경우에는 그러 하지 않습니다.
                2) 개인정보의 관리 : 회원은 개인정보의 보호 및 관리를 위하여 서비스의 개인정보관리에서 수시로 회원의 개인정보를 수정/삭제할 수 있습니다.
                3) 개인정보의 보호 : 회원의 개인정보는 오직 본인만이 열람/수정/삭제 할 수 있으며, 이는 전적으로 회원의 계정과 비밀번호에 의해 관리되고 있습니다. 따라서 타인에게 본인의 계정과 비밀번호를 알려주어서는 안되며, 작업 종료시에는 반드시 로그아웃해 주시기 바랍니다.
                3. 회원이 본 약관에 따라 이용신청을 하는 것은, 정열대학교산학협력단의 신청서에 기재된 회원정보를 수집, 이용하는 것에 동의하는 것으로 간주 됩니다.

                제 7 조 (사용자의 정보 보안)

                1. 이용자는 정열대학교산학협력단 서비스 가입 절차를 완료하는 순간부터 본인이 입력한 정보의 비밀을 유지할 책임이 있으며, 회원이 고의나 중대한 실수로 회원의 계정과 비밀번호를 사용하여 발생한 피해에 대한 책임은 회원 본인에게 있습니다.
                2. 계정과 비밀번호에 관한 모든 관리의 책임은 회원에게 있으며, 회원의 계정이나 비밀번호가 부정하게 사용되었다는 사실을 발견한 경우에는 즉시 정열대학교산학협력단에 신고하여야 합니다. 신고를 하지 않음으로 인한 모든 책임은 회원 본인에게 있습니다.
                3. 이용자는 정열대학교산학협력단 서비스의 사용 종료시마다 정확히 접속을 종료해야 하며, 정확히 종료하지 아니함으로써 제3자가 이용자에 관한 정보를 이용하게 되는 등의 결과로 인해 발생하는 손해 및 손실에 대하여 정열대학교산학협력단은 책임을 부담하지 아니합니다.

                제 8 조 (서비스의 변경)

                1. 당 사이트는 귀하가 서비스를 이용하여 기대하는 손익이나 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않으며, 회원이 본 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을 지지 않습니다. 
                2. 당 사이트는 서비스 이용과 관련하여 가입자에게 발생한 손해 중 가입자의 고의,과실에 의한 손해에 대하여 책임을 부담하지 아니합니다.

                제 9 조 (이용기간 및 자격의 정지 및 상실)

                1. 정열대학교산학협력단 회원이용기간은 조직통폐합에 따른 불가항력을 제외하고 회원신청에서 탈퇴까지로 합니다.
                2. 정열대학교산학협력단은 이용자가 본 약관에 명시된 내용을 위배하는 행동을 한 경우, 이용자격을 일시적으로 정지하고 30일 이내에 시정하도록 이용자에게 요구할 수 있으며, 이후 동일한 행위를 2회 이상 반복할 경우에 30일간의 소명기회를 부여한 후 이용자격을 상실시킬 수 있습니다.
                3. 정열대학교산학협력단 회원이 신청 후 12개월이상 장시간 이용하지 않은 회원은 휴면아이디로 분류하여, 자격 정지 및 상실이 가능합니다.

                제 10 조 (계약해제, 해지 등)

                1. 회원은 언제든지 서비스 초기화면의 마이페이지 또는 정보수정 메뉴 등을 통하여 이용계약 해지 신청을 할 수 있으며, 정열대학교산학협력단은 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.
                2. 회원이 계약을 해지할 경우, 관련법 및 개인정보취급방침에 따라 정열대학교산학협력단이 회원정보를 보유하는 경우를 제외하고는 해지 즉시 회원의 모든 데이터는 소멸됩니다.
                3. 회원이 계약을 해지하는 경우, 회원이 작성한 게시물 중 블로그 등과 같이 본인 계정에 등록된 게시물 일체는 삭제됩니다. 단, 타인에 의해 스크랩 되어 재게시되거나, 공용게시판에 등록된 게시물 등은 삭제되지 않으니 사전에 삭제 후 탈퇴하시기 바랍니다.

                제 11 조 (게시물의 저작권)

                1. 이용자가 게시한 게시물의 저작권은 이용자가 소유하며, 정열대학교산학협력단은 서비스 내에 이를 게시할 수 있는 권리를 갖습니다.
                2. 정열대학교산학협력단은 다음 각 호에 해당하는 게시물이나 자료를 사전통지 없이 삭제하거나 이동 또는 등록 거부를 할 수 있습니다.
                1) 본서비스 약관에 위배되거나 상용 또는 불법, 음란, 저속하다고 판단되는 게시물을 게시한 경우
                2) 다른 회원 또는 제 3자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우
                3) 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우
                4) 불법복제 또는 해킹을 조장하는 내용인 경우
                5) 영리를 목적으로 하는 광고일 경우
                6) 범죄와 결부된다고 객관적으로 인정되는 내용일 경우
                7) 다른 이용자 또는 제 3자의 저작권 등 기타 권리를 침해하는 내용인 경우
                8) 정열대학교산학협력단에서 규정한 게시물 원칙에 어긋나거나, 게시판 성격에 부합하지 않는 경우
                9) 기타 관계법령에 위배된다고 판단되는 경우
                3. 이용자의 게시물이 타인의 저작권을 침해함으로써 발생하는 민, 형사상의 책임은 전적으로 이용자가 부담하여야 합니다.


                제 3장 의무 및 책임


                제 12 조 (정열대학교산학협력단의 의무)

                1. 정열대학교산학협력단은 회원의 개인 신상 정보를 본인의 승낙없이 타인에게 누설, 배포하지 않습니다. 단, 전기통신관련법령 등 관계법령에 의하여 관계 국가기관 등의 요구가 있는 경우에는 그러하지 아니합니다.
                2. 정열대학교산학협력단은 법령과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 지속적·안정적으로 서비스를 제공하기 위해 노력 할 의무가 있습니다.
                3. 정열대학교산학협력단은 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.

                제 13 조 (회원의 의무)

                1. 회원 가입시에 요구되는 정보는 정확하게 기입하여야 합니다. 또한 이미 제공된 회원에 대한 정보가 정확한 정보가 되도록 유지, 갱신하여야 하며, 회원은 자신의 계정 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.
                2. 회원은 정열대학교산학협력단의 사전 승낙없이 서비스를 이용하여 어떠한 영리행위도 할 수 없으며, 그 영업활동의 결과에 대해 정열대학교산학협력단은 일절 책임을 지지 않습니다. 또한 회원은 이와 같은 영업활동으로 정열대학교산학협력단이 손해를 입은 경우 손해배상의무를 지며, 정열대학교산학협력단은 해당 회원에 대해 서비스 이용제한 및 적법한 절차를 거쳐 손해배상 등을 청구할 수 있습니다.
                3. 회원은 정열대학교산학협력단 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다.
                1) 회원가입 신청 또는 회원정보 변경 시 허위내용을 기재하거나 다른 회원의 비밀번호와 ID를 도용하여 부정 사용하는 행위
                2) 저속, 음란, 모욕적, 위협적이거나 타인의 Privacy를 침해할 수 있는 내용을 전송, 게시, 게재, 전자우편 또는 기타의 방법으로 전송하는 행위
                3) 정열대학교산학협력단 운영진, 직원 또는 관계자를 사칭하는 행위
                4) 서비스를 통하여 전송된 내용의 출처를 위장하는 행위
                5) 법률, 계약에 의해 이용할 수 없는 내용을 게시, 게재, 전자우편 또는 기타의 방법으로 전송하는 행위
                6) 서버 해킹 및 컴퓨터바이러스 유포, 웹사이트 또는 게시된 정보의 일부분 또는 전체를 임의로 변경하는 행위
                7) 타인의 특허, 상표, 영업비밀, 저작권, 기타 지적재산권을 침해하는 내용을 게시, 게재, 전자우편 또는 기타의 방법으로 전송하는 행위
                8) 정열대학교산학협력단의 승인을 받지 아니한 광고, 판촉물, 스팸메일, 행운의 편지, 피라미드 조직 기타 다른 형태의 권유를 게시, 게재, 전자우편 또는 기타의 방법으로 전송하는 행위
                9) 다른 사용자의 개인정보를 수집, 저장, 공개하는 행위
                10) 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위
                11) 선량한 풍속, 기타 사회질서를 해하는 행위
                12) 타인의 명예를 훼손하거나 모욕하는 행위
                13) 타인의 지적재산권 등의 권리를 침해하는 행위
                14) 타인의 의사에 반하여 광고성 정보 등 일정한 내용을 지속적으로 전송하는 행위
                15) 서비스의 안정적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위
                17) 본 약관을 포함하여 기타 정열대학교산학협력단이 정한 제반 규정 또는 이용 조건을 위반하는 행위
                18) 기타 관계법령에 위배되는 행위


                제 4장 기타


                제 14 조 (양도금지)

                회원이 서비스의 이용권한, 기타 이용계약 상 지위를 타인에게 양도, 증여할 수 없습니다.

                제 15조 (면책조항)

                1. 정열대학교산학협력단은 서비스 이용과 관련하여 이용자에게 발생한 손해에 대하여 정열대학교산학협력단의 중대한 과실, 고의 또는 범죄행위로 인해 발생한 손해를 제외하고 이에 대하여 책임을 부담하지 않으며, 이용자가 본 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을 지지 않습니다.
                2. 정열대학교산학협력단은 서비스 이용과 관련하여 이용자에게 발생한 손해 중 이용자의 고의, 실수에 의한 손해에 대하여 책임을 부담하지 아니합니다.
                3. 정열대학교산학협력단은 이용자간 또는 이용자와 제3자간에 서비스를 매개로 하여 물품거래 혹은 금전적 거래 등과 관련하여 어떠한 책임도 부담하지 아니하고, 이용자가 서비스의 이용과 관련하여 기대하는 이익에 관하여 책임을 부담하지 않습니다.

                제 16 조 (재판관할)

                정열대학교산학협력단과 이용자간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국 법을 적용하며, 본 분쟁으로 인한 소는 민사소송법상의 관할법원에 제기합니다.
                부 칙 1. (시행일) 본 약관은 2016년 1월 1일부터 시행됩니다.	
                                        </textarea>
                                    </div>
                                </div>

                                <div className="check_cnt check_cnt2 af">
                                    <div className="check_top">
                                        <h3>개인정보처리방침안내</h3>
                                        <input 
                                            type="checkbox" 
                                            name="" 
                                            id="check2" 
                                            checked={this.state.agree_value_2}
                                            onChange={this.toggleChangeFunc}
                                        />
                                        <label htmlFor="check2">개인정보처리방침안내의 내용에 동의합니다.</label>
                                    </div>
                                    <div className="check_box">
                                        <textarea name="" rows="" cols="" disabled>
                “정열대학교산학협력단“(이하 “회사”)는 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다. 고객님의 정보는 개인의 소중한 자산인 동시에 회사 운영의 중요한 자료가 됩니다. 그러므로 회사는 운영상의 모든 과정에서 고객님의 개인정보를 보호하는데 최선의 노력을 다할 것을 약속 드립니다. 회사는 개인정보처리방침을 개정하는 경우 웹사이트를 통하여 공지할 것입니다.

                제 1장. 개인정보 수집 동의절차
                회사는 귀하께서 웹사이트의 개인정보보호방침 또는 이용약관의 내용에 대해 (동의한다)버튼 또는 (동의하지 않는다)버튼을 클릭할 수 있는 절차를 마련하여 (동의한다)버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 봅니다.

                제 2장. 개인정보의 수집 및 이용 목적
                회사는 개인정보를 다음의 목적을 위해 활용합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시 사전동의를 구할 예정입니다.

                가. 성명, 아이디, 비밀번호 : 회원 가입의사 확인, 서비스 부정이용 방지, 접속 빈도파악, 회원제 서비스 이용에 따른 본인 식별 절차
                나. 이메일주소, 전화번호(수신여부 확인) : 고지사항 전달, 본인 의사 확인, 불만 처리 등 원활한 의사소통 경로의 확보,
                이벤트 및 광고성 정보 제공 및 참여기회 제공, 접속 빈도파악 또는 회원의 서비스이용에 대한 통계
                다. 주소, 전화번호 : 경품과 물품 배송에 대한 정확한 배송지의 확보

                제 3장. 광고정보의 전송
                가. 회사는 귀하의 명시적인 수신거부의사에 반하여 영리목적의 광고성 정보를 전송하지 않습니다.
                나. 회사는 약관변경, 기타 서비스 이용에 관한 변경사항, 새로운 서비스/신상품이나 이벤트 정보, 기타 상품정보 등을 전자우편, 휴대폰 문자전송 기타 전지적 전송매체 등의 방법으로 알려드립니다. 이 경우 관련 법령상 명시사항 및 명시방법을 준수합니다.
                다. 회사는 상품정보 안내 등 온라인 마케팅을 위해 광고성 정보를 전자우편 등으로 전송하는 경우
                전자 우편의 제목란 및 본문란에 귀하가 쉽게 알아 볼 수 있도록 조치합니다.

                제 4장. 개인정보의 수집범위
                회사는 별도의 회원가입 절차 없이 대부분의 콘텐츠에 자유롭게 접근할 수 있습니다. 회원제 서비스를 이용하고자 할 경우 다음의 정보를 입력해주셔야 합니다.
                가. 개인정보 수집항목 : 이름, 이메일, 생년월일, 아이디, 비밀번호, 성별, 주소, 휴대폰 번호(전화), 이메일 수신여부,
                SMS 수신여부, 서비스 이용기록, 접속로그, 받는 고객 정보(이름, 전화번호, 주소, 이메일)
                나. 개인정보 수집방법 : 홈페이지 내 회원가입 및 게시판 등

                제 5장. 개인정보의 보유 및 이용기간
                회사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다. 

                -보존항목 : 이름, 로그인 ID, 비밀번호, 이메일, 생년월일
                -보존근거 : 불량 회원의 부정한 이용의 재발 방지
                -보존기간 : 1개월

                그리고 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 
                소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 (전자상거래 등에서의 소비자보호에 관한 법률)

                제 6장. 개인정보의 파기 절차 및 방법
                회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체 없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.

                -파기절차
                회원님이 회원가입 등을 위해 입력하신 정보는 목적 달성 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장 된 후 파기합니다. 별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유 이외의 다른 목적으로 이용되지 않습니다.

                -파기기한
                이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.

                -파기방법
                전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.

                제 7장. 개인정보의 안전성 확보 조치
                회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 조치를 하고 있습니다.

                가. 개인정보 취급 직원의 최소화 및 교육
                개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.

                나. 개인정보의 암호화
                이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.

                제 8장. 개인정보 보호책임자 작성
                회사는 고객님께서 정보를 안전하게 이용할 수 있도록 최선을 다하고 있습니다. 고객님의 개인정보를 취급하는 책임자는 다음과 같으며 개인정보 관련 문의사항에 신속하고 성실하게 답변해드리고 있습니다.

                ▶ 개인정보보호 담당자
                이름 : 홍길동
                소속/직위 : ○○/○○
                e-mail : ○○○@○○○○.net
                전화번호 : 02-0000-0000
                정보주체께서는 회사 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당자에게 문의하실 수 있습니다.

                제 9장. 의견수렴 및 불만처리
                회사는 회원님의 의견을 소중하게 생각하며, 회원님은 의문사항으로부터 언제나 성실한 답변을 받을 권리가 있습니다. 회사는 회원님과의 원활한 의사소통을 위해 고객센터를 운영하고 있습니다. 

                실시간 상담 및 전화상담은 영업시간에만 가능합니다. 이메일 및 우편을 이용한 상담은 수신 후 24시간 내에 성실하게 답변 드리겠습니다. 다만, 근무시간 이후 또는 주말 및 공휴일에는 익일 처리하는 것을 원칙으로 합니다.
                도용된 개인정보에 대한 회사의 조치는 다음과 같습니다.
                1. 이용자가 타인의 기타 개인정보를 도용하여 회원가입 등을 하였음을 알게 된 때에는 지체 없이 해당 아이디에 대한 서비스 이용정지 또는 회원탈퇴 등 필요한 조치를 취합니다.
                2. 자신의 개인정보 도용을 인지한 이용자가 해당 아이디에 대해 서비스 이용정지 또는 회원탈퇴를 요구하는 경우에는 즉시 조치를 취합니다. 
                기타 개인정보에 관한 상담이 필요한 경우에는 개인정보침해신고센터, 대검찰청 인터넷범죄수사센터, 경찰청 사이버테러대응센터 등으로 문의하실 수 있습니다.

                개인정보침해센터 (http://www.118.or.kr)
                대검찰청 인터넷범죄수사센터 (http://icic.sppo.go.kr)
                경찰청 사이버테러대응센터 (http://www.police.go.kr/ctrc/ctrc_main.htm)

                제 10장. 고지의 의무
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                                        </textarea>
                                    </div>
                                </div>
                                <div className="agree_box">
                                    <input 
                                        type="checkbox" 
                                        name="" 
                                        id="agree1" 
                                        checked={this.state.agree_value_3}
                                        onChange={this.toggleChangeFunc}
                                    />
                                    <label htmlFor="agree1">위 회원 약관에 동의합니다.</label>
                                </div>
                                <div className="btn_confirm">
                                    <Link to={'/'} className="bt_ty bt_ty1 cancel_ty1">취소</Link>
                                    {/* <div> */}
                                    {
                                    (this.state.go_register) ?
                                    <Link to={'/register'} className="bt_ty bt_ty2 submit_ty1">다음</Link> :
                                    <a href="javascript:return false;" onClick={this.nextClick} class="bt_ty bt_ty2 submit_ty1">다음</a>
                                    }
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        );
    }
}

export default RegisterCheck;