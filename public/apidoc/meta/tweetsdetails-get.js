module.exports = {
  apiURLPage: "/catalog/tweetsdetails-get",
  title:"Consultar el detalle de un Tweet",
  desc:"Mediante este servicio es posible recuperar el detalle de un Tweet, es decir, todos los Tweet relacionados (respuestas) a el.",
  secure: false,
  url: "/tweetDetails/:tweetId",
  method:"GET",
  urlParams: [
    {
      name: "tweetId",
      desc: "ID del Tweet a buscar",
      require: true
    }
  ],
  requestFormat:"",
  dataParams: "",
  successResponse: "{\r\n   \"ok\": true,\r\n   \"body\":    {\r\n      \"_id\": \"59ed5728022307a950b3c756\",\r\n      \"_creator\":       {\r\n         \"_id\": \"593616dc3f66bd6ac4596328\",\r\n         \"name\": \"Oscar Blancarte.\",\r\n         \"userName\": \"oscar\",\r\n         \"avatar\": \"<Base 64 Image>\"\r\n      },\r\n      \"date\": \"2017-10-23T02:42:48.679Z\",\r\n      \"message\": \"Mi libro de \\\"Patrones de dise\u00F1o\\\"\",\r\n      \"liked\": false,\r\n      \"likeCounter\": 0,\r\n      \"image\": \"<Base 64 Image>\",\r\n      \"replys\": 4,\r\n      \"replysTweets\":       [\r\n                  {\r\n            \"_id\": \"59f51e49830f6ac1c4c841a2\",\r\n            \"_creator\":             {\r\n               \"_id\": \"593616dc3f66bd6ac4596328\",\r\n               \"name\": \"Oscar Blancarte.\",\r\n               \"userName\": \"oscar\",\r\n               \"avatar\": \"<Base 64 Image>\"\r\n            },\r\n            \"date\": \"2017-10-29T00:18:17.071Z\",\r\n            \"message\": \"dgnfdgh\",\r\n            \"liked\": false,\r\n            \"likeCounter\": 0,\r\n            \"replys\": 0,\r\n            \"image\": null\r\n         },\r\n                  {\r\n            \"_id\": \"59f50d54830f6ac1c4c841a1\",\r\n            \"_creator\":             {\r\n               \"_id\": \"593616dc3f66bd6ac4596328\",\r\n               \"name\": \"Oscar Blancarte.\",\r\n               \"userName\": \"oscar\",\r\n               \"avatar\": \"<Base 64 Image>\"\r\n            },\r\n            \"date\": \"2017-10-28T23:05:56.314Z\",\r\n            \"message\": \"sdfasfs\",\r\n            \"liked\": false,\r\n            \"likeCounter\": 0,\r\n            \"replys\": 0,\r\n            \"image\": null\r\n         }\r\n      ]\r\n   }\r\n}",
  errorResponse:"{\r\n   \"ok\": false,\r\n   \"message\": \"No existe el Tweet\"\r\n}"
}
