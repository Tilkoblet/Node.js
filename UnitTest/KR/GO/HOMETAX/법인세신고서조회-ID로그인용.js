const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-HometaxIdLogin-UTERNAAZ110-BeobInSe-SinGo
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 홈택스의 법인세 신고서 조회 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/hometaxidlogin/uternaaz110/beobinse/singo");

        // Body 추가
        _rest.AddBody("UserId", "", true);                          // [암호화] 홈택스 ID(Base64 인코딩)
        _rest.AddBody("UserPassword", "", true);                    // [암호화] 홈택스 암호(Base64 인코딩)
        _rest.AddBody("BusinessNumber", "", true);                  // [암호화] 검색 할 사업자등록번호 또는 주민등록번호(xxxxxxxxxx 또는 xxxxxxxxxxxxx / Base64 인코딩) 공백일 검색기간은 30일, 아닐경우 검색기간은 365일
        _rest.AddBody("StartDate", "20210101", false);              // 검색시작일(yyyyMMdd) 공백일 경우 기본값을 API에서 셋팅
        _rest.AddBody("EndDate", "20211231", false);                // 검색종료일(yyyyMMdd) 공백일 경우 기본값을 API에서 셋팅
                
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", JSON.stringify(Response));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
