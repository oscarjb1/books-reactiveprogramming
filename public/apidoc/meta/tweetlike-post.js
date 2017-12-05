module.exports = {
  apiURLPage: "/catalog/tweetlike-post",
  title:"Servicio para dar like/unlike a un Tweet",
  desc:"Mediante este servicio es posible dar like o unlike a un tweet determinado ",
  secure: true,
  url: "/secure/like",
  method:"POST",
  urlParams: [],
  requestFormat:"{\r\n   \"tweetID\": \"ID del Tweet\",\r\n   \"like\": Boolean que indica si es like(true) o unlike(false)\r\n}",
  dataParams: "{\r\n   \"tweetID\": \"59ed5728022307a950b3c756\",\r\n   \"like\": true\r\n}",
  successResponse: "{\r\n   \"ok\": true,\r\n   \"body\":    {\r\n      \"_id\": \"59ed5728022307a950b3c756\",\r\n      \"_creator\": \"593616dc3f66bd6ac4596328\",\r\n      \"message\": \"Mi libro de \\\"Patrones de dise\u00F1o\\\"\",\r\n      \"image\": \"<Base 64 Image>\",\r\n      \"__v\": 0,\r\n      \"replys\": 4,\r\n      \"likeCounter\": 1,\r\n      \"date\": \"2017-10-23T02:42:48.679Z\"\r\n   }\r\n}",
  errorResponse:"{\r\n   \"ok\": false,\r\n   \"message\": \"No existe el Tweet solicitado\"\r\n}"
}
