const FS = require("fs");
const Rest = require("../../../REST").Tilko.API.REST;
const Constant = require("../../../Constant").Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Credit4u-CheckedSelfCaptcha

    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();
    
        // 한국신용정보원의 본인인증 서비스 1단계 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/credit4u/checkedselfcaptcha");
    
        // Body 추가
        _rest.AddBody("UserID", "", true);              // [암호화] 로그인 아이디(Base64 인코딩)
        _rest.AddBody("UserPassword", "", true);        // [암호화] 로그인 비밀번호(Base64 인코딩)
        _rest.AddBody("UserName", "", true);            // [암호화] 가입자 명(Base64 인코딩)
        _rest.AddBody("IdentityNumber", "", true);      // [암호화] 주민등록번호(8012151XXXXXX / Base64 인코딩)
        _rest.AddBody("NiceMobileCorp", "", false);     // 통신사코드 SKT: 0 / KT: 1 / LGT: 2 / SKM(알뜰폰): 3 / KTM(알뜰폰): 4 / LGM(알뜰폰): 5
    
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
        
        // Captcha Image 파일 저장
        console.log(Response.CaptchaImage);
        FS.writeFileSync("D:/Temp/Captcha.png", Response.CaptchaImage.replace(/^data:image\/png;base64,/, ""), "base64");
    } catch (e) {
        console.error(e);
    }

})(Tilko);
