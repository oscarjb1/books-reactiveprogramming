module.exports = {
  apiURLPage: "/catalog/tweetsusername-get",
  title:"Consulta los últimos Tweets de un determinado usuario",
  desc:"Mediante este servicio es posible recuperar los últimos tweets realizados por un único usuario determinado por el url param 'username'",
  secure: false,
  url: "/tweets/:username",
  method:"GET",
  urlParams: [
    {
      name: "username",
      desc: "Nombre de usuario",
      require: true
    }
  ],
  requestFormat:"",
  dataParams: "",
  successResponse: "{\r\n   \"ok\": true,\r\n   \"body\":    [\r\n            {\r\n         \"_id\": \"59ed5728022307a950b3c756\",\r\n         \"_creator\":          {\r\n            \"_id\": \"593616dc3f66bd6ac4596328\",\r\n            \"name\": \"Oscar Blancarte.\",\r\n            \"userName\": \"oscar\",\r\n            \"avatar\": \"<Base 64 Image>\"\r\n         },\r\n         \"date\": \"2017-10-23T02:42:48.679Z\",\r\n         \"message\": \"Mi libro de \\\"Patrones de dise\u00F1o\\\"\",\r\n         \"liked\": false,\r\n         \"likeCounter\": 0,\r\n         \"replys\": 4,\r\n         \"image\": \"<Base 64 Image>\"\r\n      },\r\n            {\r\n         \"_id\": \"59eaaf2f191450b5506aae18\",\r\n         \"_creator\":          {\r\n            \"_id\": \"593616dc3f66bd6ac4596328\",\r\n            \"name\": \"Oscar Blancarte.\",\r\n            \"userName\": \"oscar\",\r\n            \"avatar\": \"<Base 64 Image>\"\r\n         },\r\n         \"date\": \"2017-10-21T02:21:35.790Z\",\r\n         \"message\": \"fasfasdassdf\",\r\n         \"liked\": false,\r\n         \"likeCounter\": 0,\r\n         \"replys\": 0,\r\n         \"image\": null\r\n      }\r\n   ]\r\n}",
  errorResponse:"{\r\n   \"ok\": false,\r\n   \"message\": \"No existe el usuarios\"\r\n}"
}
