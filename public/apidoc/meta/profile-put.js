module.exports = {
  apiURLPage: "/catalog/profile-put",
  title:"Actualización del perfil de usuario",
  desc:"Mediante este servicio es posible actualizar el perfil del usuario autenticado, por lo que el usuario a actualizar se determian por el header authorization",
  secure: true,
  url: "/secure/profile",
  method:"PUT",
  urlParams: [],
  requestFormat:"{\r\n   \"username\":\"Nombre de usuario\",\r\n   \"name\":\"Nombre completo del usuario\",\r\n   \"description\":\"Una breve descripci\u00F3n del usuario\",\r\n   \"avatar\":\"<Base 64 Image>\",\r\n   \"banner\":\"<Base 64 Image>\"\r\n}",
  dataParams: "{\r\n   \"username\":\"oscar\",\r\n   \"name\":\"Oscar Blancarte.\",\r\n   \"description\":\"Arquitecto & FullStack developer, Autor de \\\"Introducci\u00F3n a los patrones de dise\u00F1o\\\" y \\\"Programaci\u00F3n Reactive con React, NodeJS y MongoDB\\\".\",\r\n   \"avatar\":\"<Base 64 Image>\",\r\n   \"banner\":\"<Base 64 Image>\"\r\n}",
  successResponse: "{\r\n   \"ok\": true,\r\n   \"body\":    {\r\n      \"_id\": \"593616dc3f66bd6ac4596328\",\r\n      \"name\": \"Oscar Blancarte.\",\r\n      \"description\": \"Arquitecto & FullStack developer, Autor de \\\"Introducci\u00F3n a los patrones de dise\u00F1o\\\" y \\\"Programaci\u00F3n Reactive con React, NodeJS y MongoDB\\\".\",\r\n      \"userName\": \"oscar\",\r\n      \"avatar\": \"<Base 64 Image>\",\r\n      \"banner\": \"<Base 64 Image>\",\r\n      \"tweetCount\": 44,\r\n      \"following\": 0,\r\n      \"followers\": 3,\r\n      \"follow\": false\r\n   }\r\n}",
  errorResponse:"{\r\n   \"ok\": false,\r\n   \"message\": \"Usuario no existe\"\r\n}"
}
