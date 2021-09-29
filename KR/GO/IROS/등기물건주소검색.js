const Rest = require("../../../REST").Tilko.API.REST;

var Tilko = Tilko || {};

(function (_Tilko) {

    const _apiKey = "발급받은 API KEY";

    try {
        let _rest = new Rest(_apiKey);
        _rest.Init();

        // 인터넷등기소의 등기물건 주소검색 endPoint 설정
        _rest.SetEndPointUrl("https://api.tilko.net/api/v1.0/iros/risuconfirmsimplec");
    
        // Body 추가
        _rest.AddBody("Address", "서울특별시 중구 무교동 11");
        _rest.AddBody("Sangtae", "2");
        _rest.AddBody("KindClsFlag", "0");
        _rest.AddBody("Region", "0");
    
        // API 호출
        const response = _rest.Call();
        console.log("response:", JSON.stringify(response));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
