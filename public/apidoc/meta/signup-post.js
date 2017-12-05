module.exports = {
  apiURLPage: "/catalog/signup-post",
  title:"Alta de usuarios",
  desc:"Servicios de alta de usuarios",
  secure: false,
  url: "/signup",
  method:"POST",
  urlParams: [
  ],
  requestFormat:"{\r\n   \"name\": \"Nombre completo del usuario\",\r\n   \"username\": \"Nombre de usuario\",\r\n   \"password\": \"Password del usuario\"\r\n}",
  dataParams: "{\r\n   \"name\": \"Juan Perez\",\r\n   \"username\": \"jperez\",\r\n   \"password\": \"1234\"\r\n}",
  successResponse: "{\r\n   \"ok\": true,\r\n   \"body\":    {\r\n      \"profile\":       {\r\n         \"__v\": 0,\r\n         \"name\": \"Juan Perez\",\r\n         \"userName\": \"jperez\",\r\n         \"password\": \"$2a$10$XeloKwM8SgjwfhUYFSidROs5Ujik83s9YDTkX8YZliRzERj51jb1K\",\r\n         \"_id\": \"59f5fe18e577551185cd6efe\",\r\n         \"Tweets\": [],\r\n         \"date\": \"2017-10-29T16:13:12.290Z\",\r\n         \"followersRef\": [],\r\n         \"followers\": 0,\r\n         \"followingRef\": [],\r\n         \"following\": 0,\r\n         \"tweetCount\": 0,\r\n         \"banner\": null,\r\n         \"avatar\": null,\r\n         \"description\": \"Nuevo en Twitter\"\r\n      },\r\n      \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpwZXJleiIsImlkIjoiNTlmNWZlMThlNTc3NTUxMTg1Y2Q2ZWZlIiwiaWF0IjoxNTA5MjkzNTkyLCJleHAiOjE1MDkzNzk5OTJ9.RmML_aHsz4FY6VgXpdGnboQ27IMMzWqvZOaao6IXCOA\"\r\n   }\r\n}",
  errorResponse:"{\r\n   \"ok\": false,\r\n   \"message\": \"Error al crear el usuario\",\r\n   \"error\": \"Nombre de usuario existente\"\r\n}"
}
