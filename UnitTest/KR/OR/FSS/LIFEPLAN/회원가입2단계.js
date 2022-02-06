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

        // 금융감독원 통합연금포털의 회원 가입 2단계 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/FssLifeplan/RegisterStep2");

        // Body 추가
        _rest.AddBody("UserName", "", true);        // [암호화] 가입자 이름
        _rest.AddBody("Gender", "", false);         // 성별(M: 남, W:여)
        _rest.AddBody("BirthDate", "", true);       // [암호화] 생년월일(yyyyMMdd)
        _rest.AddBody("MobileCorp", "", false);     // 통신사(0: SKT, 1: KTF, 2: LGT, 3: SKT 알뜰폰, 4: KT 알뜰폰, 5: LG U+ 알뜰폰)
        _rest.AddBody("PhoneNumber", "", true);     // [암호화] 휴대폰 번호(xxxyyyyzzzz)
        _rest.AddBody("Email", "", true);           // [암호화] 이메일 주소
        _rest.AddBody("CaptchaCode", "", false);    // 회원 가입 1단계 진행 후 받은 캡챠 코드

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", JSON.stringify(Response));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
