const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Efine-LicenTruth
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 경찰청교통민원24의 운전면허진위여부 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/efine/licentruth");

        // Body 추가
        _rest.AddBody("BirthDate", "", false);                  // 대상자 생년월일(yyyyMMdd)
        _rest.AddBody("Name", "", false);                       // 대상자 성명
        _rest.AddBody("LicNumber", "xx-xx-xxxxxx-xx", true);    // [암호화] 운전면허번호(예: 서울-XX-XXXXXX-XX / Base64 인코딩)
        _rest.AddBody("SpecialNumber", "", true);               // [암호화] 식별번호(면허증 우측 하단 작은 사진 밑에 있는 일련번호 / Base64 인코딩)
        
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
