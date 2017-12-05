module.exports = {
  apiURLPage: "/catalog/tweets-get",
  title:"Consultar los últimos Tweets",
  desc:"Mediante este servicio es posible recuperar los últimos Tweets creados por los todos los usuarios",
  secure: false,
  url: "/tweets",
  method:"GET",
  urlParams: [],
  requestFormat:"",
  dataParams: "",
  successResponse: "{\r\n   \"ok\":true,\r\n   \"body\":[\r\n      {\r\n         \"_id\":\"59ed5728022307a950b3c756\",\r\n         \"_creator\":{\r\n            \"_id\":\"593616dc3f66bd6ac4596328\",\r\n            \"name\":\"Oscar Blancarte.\",\r\n            \"userName\":\"oscar\",\r\n            \"avatar\":\"<Base 64 Image>\"\r\n         },\r\n         \"date\":\"2017-10-23T02:42:48.679Z\",\r\n         \"message\":\"Mi libro de \\\"Patrones de dise\u00F1o\\\"\",\r\n         \"liked\":false,\r\n         \"likeCounter\":0,\r\n         \"replys\":4,\r\n         \"image\":\"<Base 64 Image>\"\r\n      },\r\n      {\r\n         \"_id\":\"59eaaf2f191450b5506aae18\",\r\n         \"_creator\":{\r\n            \"_id\":\"593616dc3f66bd6ac4596328\",\r\n            \"name\":\"Oscar Blancarte.\",\r\n            \"userName\":\"oscar\",\r\n            \"avatar\":\"<Base 64 Image>\"\r\n         },\r\n         \"date\":\"2017-10-21T02:21:35.790Z\",\r\n         \"message\":\"fasfasdassdf\",\r\n         \"liked\":false,\r\n         \"likeCounter\":0,\r\n         \"replys\":0,\r\n         \"image\":null\r\n      }\r\n   ]\r\n}",
  errorResponse:""
}
