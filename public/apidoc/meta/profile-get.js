module.exports = {
  apiURLPage: "/catalog/profile-get",
  title:"Consulta del perfil de usuario",
  desc:"Mediante este servico es posible recuperar los datos del perfil de usuario, como nombre, descripción, avatar, banner.etc.",
  secure: false,
  url: "/profile/:username",
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
  successResponse: "{\r\n   \"ok\": true,\r\n   \"body\":    {\r\n      \"_id\": \"593616dc3f66bd6ac4596328\",\r\n      \"name\": \"Oscar Blancarte.\",\r\n      \"description\": \"Arquitecto & FullStack developer, Autor de \\\"Introducci\u00F3n a los patrones de dise\u00F1o\\\" y \\\"Programaci\u00F3n Reactive con React, NodeJS y MongoDB\\\".\",\r\n      \"userName\": \"oscar\",\r\n      \"avatar\": \"<Base 64 Image>\",\r\n      \"banner\": \"<Base 64 Image>\",\r\n      \"tweetCount\": 44,\r\n      \"following\": 0,\r\n      \"followers\": 3,\r\n      \"follow\": false\r\n   }\r\n}",
  errorResponse:"{\r\n   \"ok\": false,\r\n   \"message\": \"Usuario no existe\"\r\n}"
}
