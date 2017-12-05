module.exports = {
  apiURLPage: "/catalog/addtweets-post",
  title:"Creación de nuevo Tweet",
  desc:"Servico utilizado para la creación de un nuevo Tweet",
  secure: true,
  url: "/secure/tweets",
  method:"POST",
  urlParams: [],
  requestFormat:"{\r\n   \"message\": \"Mensaje de texto\",\r\n   \"image\": \"<Base 64 Image> (Opcional)\"  \r\n}",
  dataParams: "{\r\n   \"message\": \"¡hola mundo! este es mi primer Tweet\",\r\n   \"image\": \"\"  \r\n}",
  successResponse: "{\r\n   \"ok\": true,\r\n   \"tweet\":    {\r\n      \"__v\": 0,\r\n      \"_creator\": \"593616dc3f66bd6ac4596328\",\r\n      \"message\": \"hola mundo\",\r\n      \"image\": \"\",\r\n      \"_id\": \"59f66ea3ceb9f6a00c7b3143\",\r\n      \"replys\": 0,\r\n      \"likeCounter\": 0,\r\n      \"date\": \"2017-10-30T00:13:23.293Z\"\r\n   }\r\n}",
  errorResponse:"{\r\n   \"ok\": false,\r\n   \"message\": \"Toket inv\u00E1lido\"\r\n}"
}
