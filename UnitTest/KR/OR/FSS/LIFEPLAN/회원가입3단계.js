const FS = require("fs");
const Rest = require("../../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // 
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 금융감독원 통합연금포털의 회원 가입 3단계 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/FssLifeplan/RegisterStep3");

        // Body 추가
        _rest.AddBody("UserId", "", true);              // [암호화] 가입 희망 아이디
        _rest.AddBody("Password", "", true);            // [암호화] 비밀번호 (8~20 자리의 영문자, 숫자, 특수문자 조합)
        _rest.AddBody("PhoneNumber1", "", true);        // [암호화] 휴대폰 번호(xxx-yyyy-zzzz) 중 xxx
        _rest.AddBody("PhoneNumber2", "", true);        // [암호화] 휴대폰 번호(xxx-yyyy-zzzz) 중 yyyy
        _rest.AddBody("PhoneNumber3", "", true);        // [암호화] 휴대폰 번호(xxx-yyyy-zzzz) 중 zzzz
        _rest.AddBody("Email", "", true);               // [암호화] 이메일 주소
        _rest.AddBody("RegionCode1", "009", false);     // 회원 가입 1단계에서 입력한 지역코드1
        _rest.AddBody("RegionCode2", "001", false);     // 지역코드2 (회원 가입 1단계 진행 후 받은 지역코드2 리스트 참조)
        _rest.AddBody("SmsCode", "", false);            // 회원 가입 2단계 진행 후 휴대전화로 받은 SMS 인증번호

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", JSON.stringify(Response));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
