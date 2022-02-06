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

        // 금융감독원 통합연금포털의 회원 가입 1단계 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/FssLifeplan/RegisterStep1");

        // Body 추가
        _rest.AddBody("UserId", "", true);              // [암호화] 가입 희망 아이디
        _rest.AddBody("UserName", "", true);            // [암호화] 가입자 이름
        _rest.AddBody("BirthDate", "", true);           // [암호화] 생년월일(yyyyMMdd)
        _rest.AddBody("IdentityNumber", "", true);      // [암호화] 주민등록번호(xxxxxxxxxxxxx)
        _rest.AddBody("MobileCorp", "", false);         // 통신사(0: SKT, 1: KTF, 2: LGT, 3: SKT 알뜰폰, 4: KT 알뜰폰, 5: LG U+ 알뜰폰)
        _rest.AddBody("PhoneNumber", "", true);         // [암호화] 휴대폰 번호(xxxyyyyzzzz)
        _rest.AddBody("RegionCode1", "", false);        // 지역코드1(001: 강원도, 002: 경기도, 003: 경상남도, 004: 경상북도, 005: 광주광역시, 006: 대구광역시, 007: 대전광역시, 008:, 부산광역시, 009: 서울특별시, 010: 울산광역시, 011: 인천광역시, 012: 전라남도, 013: 전라북도, 014: 제주도, 015: 충청남도, 016: 충청북도, 017: 세종특별자치시, 018: 해외)

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", JSON.stringify(Response));

        // PDF 파일 저장
        FS.writeFileSync("D:/Temp/captcha.png", Buffer.from(Response.Result.CaptchaImage, "base64"));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
