module.exports = {
  apiURLPage: "/catalog/suggestedusers-get",
  title:"Consulta de usuario sugeridos",
  desc:"Servicio utilizado para obtener un listado de usuario sugeridos para seguir basado en el usuario autenticado.",
  secure: true,
  url: "/secure/suggestedUsers",
  method:"GET",
  urlParams: [],
  requestFormat:"",
  dataParams: "",
  successResponse: "{\r\n   \"ok\": true,\r\n   \"body\":    [\r\n            {\r\n         \"_id\": \"59f5fe18e577551185cd6efe\",\r\n         \"name\": \"Juan Perez\",\r\n         \"description\": \"Nuevo en Twitter\",\r\n         \"userName\": \"jperez\",\r\n         \"avatar\": \"<Base 64 Imagen>\",\r\n         \"banner\": \"<Base 64 Imagen>\",\r\n         \"tweetCount\": 0,\r\n         \"following\": 0,\r\n         \"followers\": 0\r\n      },\r\n            {\r\n         \"_id\": \"59e9385121c8d79130946bea\",\r\n         \"name\": \"javier\",\r\n         \"description\": \"Nuevo en Twitter\",\r\n         \"userName\": \"javier\",\r\n         \"avatar\": \"<Base 64 Imagen>\",\r\n         \"banner\": \"<Base 64 Imagen>\",\r\n         \"tweetCount\": 0,\r\n         \"following\": 0,\r\n         \"followers\": 0\r\n      }\r\n   ]\r\n}",
  errorResponse:"{\r\n   \"ok\": false,\r\n   \"message\": \"Toket inv\u00E1lido\"\r\n}"
}
