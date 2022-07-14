# Node.js
Node.js 프로젝트의 소스코드입니다.

## 모듈 설치
```
npm install request
npm install node-rsa
npm install sync-request
```

## 데이터 형태별 샘플 코드
|파일명|설명|API 예시|
|---|---|---|
|UnitTest/TestCase1.js|인증서 필요 없음, 파라미터 암호화 필요 없음|인터넷등기소 등기물건 주소검색|
|UnitTest/TestCase2.js|인증서 필요 없음, 파라미터 암호화 필요함|경찰청교통민원24 운전면허진위여부|
|UnitTest/TestCase3.js|인증서 필요함|정부24 주민등록진위여부|
|UnitTest/TestCase4-1.js|간편인증 요청|국민건강보험공단 간편인증 요청|
|UnitTest/TestCase4-2.js|간편인증용 API 호출|국민건강보험공단 건강검진내역|
|UnitTest/TestCase5.js|바이너리 데이터를 파일로 저장|정부24 건축물대장 발급|

## 샘플 코드 (API 호출)
```javascript
const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Nhis-Ggpab003M0105
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 건강보험공단의 건강검진내역 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/nhis/ggpab003m0105");

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
                
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
```
