const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-HometaxAgent-UTERNAA801-SuImNabSeJa-BuGaGaChiSe-YeJeongGoJi
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 홈택스의 부가가치세 예정고지 세액조회 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/hometaxagent/uternaa801/suimnabseja/bugagachise/yejeonggoji");

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
        _rest.AddBody("AgentId", "", true);                             // [암호화] 세무대리인 ID(세무대리 관리번호가 있는 경우 / Base64 인코딩)
        _rest.AddBody("AgentPassword", "", true);                       // [암호화] 세무대리인 암호(세무대리 관리번호가 있는 경우 / Base64 인코딩)
        _rest.AddBody("BusinessNumber", "", true);                      // [암호화] 검색 할 사업자등록번호 또는 주민등록번호(xxxxxxxxxx 또는 xxxxxxxxxxxxx / Base64 인코딩)

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
