module.exports = {
  apiURLPage: "/catalog/followers-get",
  title:"Consulta de personas que siguen a un usuario determinado",
  desc:"Mediante este servico es posible recuperar las personas que siguen a un usuario determinado por el url param 'username'",
  secure: false,
  url: "/followings/:username",
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
  successResponse: "{\r\n   \"ok\":true,\r\n   \"body\":[\r\n      {\r\n         \"_id\":\"5938bdd8a4df2379ccabc1aa\",\r\n         \"userName\":\"emmanuel\",\r\n         \"name\":\"Emmauel Lopez\",\r\n         \"description\":\"Nuevo en Twitter\",\r\n         \"avatar\":\"<Base 64 Image>\",\r\n         \"banner\":\"<Base 64 Image>\"\r\n      },\r\n      {\r\n         \"_id\":\"5938bdd8a4df2379ccabc1aa\",\r\n         \"userName\":\"carlos\",\r\n         \"name\":\"Carlos Hernandez\",\r\n         \"description\":\"Nuevo en Twitter\",\r\n         \"avatar\":\"<Base 64 Image>\",\r\n         \"banner\":\"<Base 64 Image>\"\r\n      }\r\n   ]\r\n}",
  errorResponse:"{\r\n   \"ok\": false,\r\n   \"message\": \"No existe el usuario\"\r\n}"
}
