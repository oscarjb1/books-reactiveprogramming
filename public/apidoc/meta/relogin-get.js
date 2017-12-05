module.exports = {
  apiURLPage: "/catalog/relogin-get",
  title:"Actualización de credenciales",
  desc:"Mediante este servicio es posible validar las credenciales del usuario (token) para comprobar su vigencia y crear un nuevo token con nueva vigencia",
  secure: true,
  url: "/secure/relogin",
  method:"GET",
  urlParams: [],
  requestFormat:"",
  dataParams: "",
  successResponse: "{\r\n   \"ok\": true,\r\n   \"profile\":    {\r\n      \"id\": \"593616dc3f66bd6ac4596328\",\r\n      \"name\": \"Oscar Blancarte.\",\r\n      \"userName\": \"oscar\",\r\n      \"avatar\": \"<Base 64 image>\",\r\n      \"banner\": \"<Base 64 image>\",\r\n      \"tweetCount\": 44,\r\n      \"following\": 0,\r\n      \"followers\": 3\r\n   },\r\n   \"token\": \"<TOKEN>\"\r\n}",
  errorResponse:"{\r\n   \"ok\":false,\r\n   \"message\":\"Toket inv\u00E1lido\"\r\n}"
}
