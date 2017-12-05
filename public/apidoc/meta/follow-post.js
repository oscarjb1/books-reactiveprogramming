module.exports = {
  apiURLPage: "/catalog/follow-post",
  title:"Seguir o dejar de seguir a un usuario",
  desc:"Mediante este servicio es posible iniciar a seguir a un usuario o dejarlo se de seguir en caso de que ya se este siguiendo",
  secure: true,
  url: "/secure/follow",
  method:"POST",
  urlParams: [],
  requestFormat:"{\r\n   \"followingUser\":\"Nombre de usuario de la persona que deseamos seguir o dejar de seguir\"\t\r\n}",
  dataParams: "{\r\n   \"followingUser\":\"jperez\"\t\r\n}",
  successResponse: "{\r\n   \"ok\": true,\r\n   \"unfollow\": false\r\n}",
  errorResponse:"{\r\n   \"ok\": false,\r\n   \"message\": \"Usuario inv\u00E1lido\"\r\n}"
}
