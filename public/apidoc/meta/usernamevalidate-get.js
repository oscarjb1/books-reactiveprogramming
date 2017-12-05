module.exports = {
  apiURLPage: "/catalog/usernamevalidate-get",
  title:"Validación de disponibilidad de nombre de usuario",
  desc:"Mediante este servicio es posible determinar si un nombre de usuario ya esta siendo utilizado o está disponible para crear una nueva cuenta.",
  secure: false,
  url: "/usernameValidate/:username",
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
  successResponse: "{\r\n   \"ok\": true,\r\n   \"message\": \"Usuario disponible\"\r\n}",
  errorResponse:"{\r\n   \"ok\": false,\r\n   \"message\": \"Usuario existente\"\r\n}"
}
