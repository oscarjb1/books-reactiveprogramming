var express = require('express')
var router = express.Router()
var userController = require('../api/controllers/UserController')
var tweetController = require('../api/controllers/TweetController')
const pug = require('pug')

var configuration = require('../config')
var jwt = require('jsonwebtoken')

const methodCatalog = require('../public/apidoc/meta/catalog.js')


router.use('/',function(req, res, next) {
  var token = req.headers['authorization']
  if(!token){
    req.user = null
    next()
    return
  }

  token = token.replace('Bearer ', '')
  jwt.verify(token, configuration.jwt.secret, function(err, user) {
    if (err) {
      req.user = null
      next()
    } else {
      req.user = user
      next()
    }
  })
})

router.use('/secure',function(req, res, next) {
  if(req.user === null){
    res.status(401).send({
      ok: false,
      message: 'Token inválido'
    })
    return
  }
  next()
})

router.get('/', function(req, res) {
    res.send(pug.renderFile(__dirname + '/../public/apidoc/api-index.pug'))
})

router.get('/catalog', function(req, res){
  const meta = require('../public/apidoc/meta/catalog.js')
  res.send(
    pug.renderFile(__dirname + '/../public/apidoc/api-catalog.pug', meta))
})

router.get('/catalog/:method', function(req, res){
  let method = req.params.method
  const index = methodCatalog.services.map(x => {return x.apiURLPage}).indexOf('/catalog/'+req.params.method)
  if(index === -1){
    res.send(pug.renderFile(__dirname + '/../public/apidoc/api-index.pug'))
  }else{
    const meta = methodCatalog.services[index]
    res.send(pug.renderFile(__dirname + '/../public/apidoc/api-method.pug', meta))
  }
})

//Private access services (security)
router.get('/secure/relogin',userController.relogin)
router.get('/secure/suggestedUsers',userController.getSuggestedUser)
router.put('/secure/profile', userController.updateProfile)
router.post('/secure/follow', userController.follow)
router.post('/secure/tweet', tweetController.addTweet)
router.post('/secure/like', tweetController.like)


//Public access services
router.get('/tweets/:user', tweetController.getUserTweets)
router.get('/tweets',tweetController.getNewTweets)
router.get('/usernameValidate/:username', userController.usernameValidate)
router.get('/profile/:user',userController.getProfileByUsername)
router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/followings/:user',userController.getFollowing)
router.get('/followers/:user',userController.getFollower)
router.get('/tweetDetails/:tweet', tweetController.getTweetDetails )



router.get('/*', function(req, res, err){
  res.status(400).send({message: "Servicio inválido"})
})

module.exports = router;
