const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Hira-HIRAA050300000100
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();
    
        // 건강보험심사평가원의 내가 먹는 약 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/hira/hiraa050300000100");
    
        // 공동인증서 경로 설정
        const _publicPath = Constant.CertPath + "/signCert.der";
        const _privatePath = Constant.CertPath + "/signPri.key";
        let _publicCert = Buffer.alloc(0);
        let _privateKey = Buffer.alloc(0);

        _publicCert = FS.readFileSync(_publicPath);
        _privateKey = FS.readFileSync(_privatePath);
        console.log("_publicCert:", _publicCert);
        console.log("_privateKey:", _privateKey);
        
        // Body 추가
        _rest.AddBody("CertFile", _publicCert, true);                   // [암호화] 인증서 공개키(Base64 인코딩)
        _rest.AddBody("KeyFile", _privateKey, true);                    // [암호화] 인증서 개인키(Base64 인코딩)
        _rest.AddBody("CertPassword", Constant.CertPassword, true);     // [암호화] 인증서 암호(Base64 인코딩)
        _rest.AddBody("IdentityNumber", "", true);                      // [암호화] 주민등록번호(8012151XXXXXX / Base64 인코딩)
        _rest.AddBody("TelecomCompany", "", false);                     // 통신사 SKT : 0 / KT : 1 / LGT : 2 / SKT알뜰폰 : 3 / KT알뜰폰 : 4 / LGT알뜰폰 : 5 / NA : 6
        _rest.AddBody("CellphoneNumber", "", true);                     // [암호화] 연락처(010XXXXXXXX / Base64 인코딩)

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
