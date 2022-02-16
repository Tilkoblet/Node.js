const FS = require("fs");
const Rest = require("../../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-NpsEdi-U040206M01
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 국민연금EDI의 소급분 확인 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/npsedi/u040206m01");

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
        _rest.AddBody("BusinessNumber", "", true);                      // [암호화] 검색 할 사업자등록번호 또는 주민등록번호(xxxxxxxxxx 또는 xxxxxxxxxxxxx / Base64 인코딩)
        _rest.AddBody("DocNo", "", false);                              // 문서번호(국민연금보험료 결정내역 조회 후 받은 DocNo 값)
        _rest.AddBody("TrDt", "", false);                               // 해당년월(국민연금보험료 결정내역 조회 후 받은 TrDt 값)
        _rest.AddBody("FmCd", "", false);                               // 국민연금보험료 결정내역 조회 후 받은 FmCd 값
        _rest.AddBody("RgstChrgpId", "", false);                        // 사업장관리번호(국민연금보험료 결정내역 조회 후 받은 RgstChrgpId 값)

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", JSON.stringify(Response));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
