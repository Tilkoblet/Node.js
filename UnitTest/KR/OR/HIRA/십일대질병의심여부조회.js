const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Hira-SuspectedDiseasesGet
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();
    
        // 건강보험심사평가원의 11대 질병 의심 여부 조회내역 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/hira/suspecteddiseasesget");
    
        // Body 추가
        _rest.AddBody("MedicineCodeList", "", false);              // 내가먹는약 서비스의 약품코드(예 : {"medicine_code_list" : ["660700010","643503630","645903041","648104500","649801381"]})

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
