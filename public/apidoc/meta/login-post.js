module.exports = {
  apiURLPage: "/catalog/login-post",
  title:"Autenticación",
  desc:"Servicio de autenticación de usuario por medio de Token",
  secure: false,
  url: "/login",
  method:"POST",
  urlParams: [
    {
      name: "username",
      desc: "Nombre de usuario",
      require: true
    },
    {
      name: "password",
      desc: "Password del usuario",
      require: true
    }
  ],
  requestFormat:"{\r\n   \"username\":\"Nombre de usuario\",\r\n   \"password\":\"Contraseña del usuario\"\r\n}",
  dataParams: "{\r\n   \"username\":\"test\",\r\n   \"password\":\"1234\"\r\n}",
  successResponse: "{\r\n   \"ok\":true,\r\n   \"profile\":{\r\n      \"id\":\"593616dc3f66bd6ac4596328\",\r\n      \"name\":\"Oscar Blancarte.\",\r\n      \"userName\":\"oscar\",\r\n      \"avatar\":\"<Base 64 Image>\",\r\n      \"banner\":\"<Base 64 Image>\",\r\n      \"tweetCount\":44,\r\n      \"following\":0,\r\n      \"followers\":3\r\n   },\r\n   \"token\":\"<TOKEN>\"\r\n}",
  errorResponse:"{\r\n   \"ok\": false,\r\n   \"message\": \"Usuario y password inv\u00E1lidos\"\r\n}"
}
