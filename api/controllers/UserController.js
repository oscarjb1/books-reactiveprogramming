var authService = require('../services/AuthService')
var Profile = require('../models/Profile')
var bcrypt = require('bcryptjs')

var configuration = require('../../config')
var jwt = require('jsonwebtoken')

function signup(req, res, err){

  const newProfile = new Profile({
    name: req.body.name,
    userName: req.body.username.toLowerCase(),
    password: bcrypt.hashSync(req.body.password, 10)
  })

  newProfile.save()
    .then(()=> {
      res.send({
        ok: true,
        body: {
          profile: newProfile
        }
      })
    }).catch(err => {
      let errorMessage = null
      if(err.errors!=null && err.errors.userName != null){
        errorMessage = "Nombre de usuario existente"
      }else{
        errorMessage = 'Error al guardar el usuario'
      }
      res.send({
        ok:false,
        message:"Error al crear el usuario",
        error: errorMessage
      })
    })
}

function usernameValidate(req, res, err){

  Profile.find().byUsername(req.params.username.toLowerCase()).exec()
    .then(function(profiles){
      if (profiles.length > 0) throw {message: "Usuario existente"}
      res.status(200).send({
        ok: true,
        message: "Usuario disponible"
      })
    }).catch(function(err){
      res.status(200).send({
        ok: false,
        message: err.message || "Error al validar el nombre de usuario"
      })
    })
}

function login(req, res, err){
  Profile.findOne({userName: req.body.username.toLowerCase()})
  .then(profile => {
    if(profile==null){
      res.send({
        ok:false,
        message: "Usuario y contraseña inválida"
      })
      return
    }

    bcrypt.compare(req.body.password, profile.password, function(err,valid){
      if (!valid) {
        return res.send({
          ok: false,
          message: 'Usuario y password inválidos'
        });
      }

      let user = {
        username: req.body.username,
        id: profile._id
      }

      let token = authService.generateToken(user)

      res.send({
        ok:true,
        profile: {
          id: profile.id,
          name: profile.name,
          userName: profile.userName,
          avatar: profile.avatar || '/public/resources/avatars/0.png',
            // base64Img.base64Sync('./public/resources/avatars/0.png'),
          banner: profile.banner || '/public/resources/banners/4.png',
            // base64Img.base64Sync('./public/resources/banners/4.png'),
          tweetCount: profile.tweetCount,
          following: profile.following,
          followers: profile.followers
        },
        token: token
       })
    });
  }).catch(err => {
    res.send({
      ok: false,
      message: "Error al validar el usuario"
    })
  })
}

function relogin(req,res, err){
  let userToken = {
    id: req.user.id,
    username: req.user.username
  }
  let newToken = authService.generateToken(userToken)

  Profile.findOne({_id: req.user.id})
  .then(profile => {
    if(profile === null){
      res.send({
        ok: false,
        message: "No existe el usuario"
      })
    }else{
      res.send({
        ok:true,
        profile: {
          id: profile._id,
          name: profile.name,
          userName: profile.userName,
          avatar: profile.avatar || '/public/resources/avatars/0.png',
          banner: profile.banner || '/public/resources/banners/4.png',
          tweetCount: profile.tweetCount,
          following: profile.following,
          followers: profile.followers
        },
        token: newToken
       });
    }
  })
  .catch(err => {
    res.send({
      ok: false,
      message: "Error al consultar el usuario",
      error: err
    })
  })
}

function getSuggestedUser(req, res, err){
  let user = req.user

  Profile.find({userName: {$ne: user.username}})
  .sort({"date": -1})
  .limit(3).exec()
  .then(users => {
    let response = users.map(x => {
      return {
        _id: x._id,
        name: x.name,
        description: x.description,
        userName: x.userName,
        avatar: x.avatar || '/public/resources/avatars/0.png',
        banner: x.banner || '/public/resources/banners/4.png',
        tweetCount: x.tweetCount,
        following: x.following,
        followers: x.followers
      }
    })
    res.send({
      ok: true,
      body: response
    })
  })
  .catch(err => {
    res.send({
      ok: false,
      message: err.message,
      error: err
    })
  })
}

function getProfileByUsername(req, res, err){
  let user = req.params.user
  if(user === null){
    res.send({
      ok:false,
      message: "parametro 'user' requerido"
    })
  }

  Profile.findOne({userName: user})
  .then(user => {
    if(user === null){
      res.send({
        ok: false,
        message: "Usuario no existe"
      })
      return
    }

    var token = req.headers['authorization'] || ''
    token = token.replace('Bearer ', '')
    jwt.verify(token, configuration.jwt.secret, function(err, userToken) {
      let follow = false

      if (!err) {
        follow = user.followersRef.find(
          x => x.toString() === userToken.id.toString()) != null
      }
      res.send({
        ok:true,
        body: {
          _id: user._id,
          name: user.name,
          description: user.description,
          userName: user.userName,
          avatar: user.avatar || '/public/resources/avatars/0.png',
          banner: user.banner || '/public/resources/banners/4.png',
          tweetCount: user.tweetCount,
          following: user.following,
          followers: user.followers,
          follow: follow
        }
      })
    })
  }).catch(err => {
    res.send({
      ok: false,
      message: err.message || "Error al obtener los datos del usuario",
      error: err
    })
  })
}

function updateProfile(req, res, err){
  let username = req.user.username
  const updates = {
    name: req.body.name,
    description: req.body.description,
    avatar: req.body.avatar,
    banner: req.body.banner
  }

  Profile.update({ userName: username }, updates)
  .then(updates => {
    res.send({
      ok: true
    })
  })
  .catch(err => {
    res.send({
      ok: false,
      message: "Error al actualizar el perfil",
      error: err
    })
  })
}

function getFollower(req, res, err){
  let username = req.params.user
  Profile.findOne({userName : username})
  .populate("followersRef")
  .exec()
  .then(followers => {
    if(followers === null) throw {message: "No existe el usuario"}
    let response = followers.followersRef.map( x => {
      return {
        _id: x._id,
        userName: x.userName,
        name: x.name,
        description: x.description,
        avatar: x.avatar || '/public/resources/avatars/0.png',
        banner: x.banner || '/public/resources/banners/4.png'
      }
    })
    res.send({
      ok: true,
      body: response
    })
  })
  .catch(err => {
    res.send({
      ok:false,
      message: err.message || "Error al consultara los seguidores",
      error: err.error || err
    })
  })
}

function getFollowing(req, res, err){
  let username = req.params.user
  Profile.findOne({userName : username})
  .populate("followingRef")
  .exec()
  .then(followings => {
    if(followings === null) throw {  message: "No existe el usuario"}

    let response = followings.followingRef.map( x => {
      return {
        _id: x._id,
        userName: x.userName,
        name: x.name,
        description: x.description,
        avatar: x.avatar || '/public/resources/avatars/0.png',
        banner: x.banner || '/public/resources/banners/4.png'
      }
    })

    res.send({
      ok: true,
      body: response
    })
  })
  .catch(err => {
    res.send({
      ok:false,
      message: err.message || "Error al consultara los seguidores",
      error: err.error || err
    })
  })
}

function follow(req, res, err){
  let username = req.user.username
  let followingUser = req.body.followingUser

  Profile.find({userName: {$in:[username,followingUser]}})
  .then(users => {
    if(users.length != 2) throw {message: "El usuario no existe"}
    let my = users.find( x =>  x.userName == username)
    let other = users.find( x => x.userName == followingUser)
    let following = my.followingRef.find(x => x.toString() === other._id.toString()) != null
    let myUpdate = null
    let otherUpdate = null
    if(following){
      myUpdate    = {$pull: {followingRef: other._id}}
      otherUpdate = {$pull: {followersRef: my._id}}
    }else{
      myUpdate    = {$push: {followingRef: other._id}}
      otherUpdate = {$push: {followersRef: my._id}}
    }

    Profile.update({userName: my.userName}, myUpdate)
    .then(myUp => {
      Profile.update({userName: other.userName}, otherUpdate)
      .then(otherUp => {
        res.send({
          ok: true,
          unfollow: following,
          err: err.error || err
        })
      })
      .catch( err => {
        res.send({
          ok: false,
          message: err.message || "Error al ejecutar la operación",
          err: err.error || err
        })
      })
    })
    .catch(err => {
      res.send({
        ok: false,
        message: err.message || "Error al ejecutar la operación",
        err: err.error || err
      })
    })
  })
  .catch(err => {
    res.send({
      ok: false,
      message: err.message || "Error al ejecutar la operación",
      err: err.error || err
    })
  })
}

module.exports = {
  usernameValidate,
  signup,
  login,
  relogin,
  getSuggestedUser,
  getProfileByUsername,
  updateProfile,
  getFollower,
  getFollowing,
  follow
}
