var Profile = require('../models/Profile')
var Tweet = require('../models/Tweet')
var mongoose = require('mongoose');

function getNewTweets(req, res, err){
  let user = req.user || {}

  Tweet.find({tweetParent : null})
  .populate("_creator",{banner: 0})
  .sort('-date')
  .limit(10)
  .exec(function(err, tweets){
      if(err){
        res.send({
          ok: false,
          message: "Error al cargar los Tweets",
          error: err
        })
        return
      }

      let response = tweets.map( x => {
        return{
          _id: x._id,
          _creator: {
            _id: x._creator._id,
            name: x._creator.name,
            userName: x._creator.userName,
            avatar: x._creator.avatar || './public/resources/avatars/0.png'
          },
          date: x.date,
          message: x.message,
          liked: x.likeRef.find(
            likeUser => likeUser.toString() === user.id || null),
          likeCounter: x.likeCounter,
          replys: x.replys,
          image: x.image
        }
      })

      res.send({
        ok: true,
        body: response
      })
  })
}

function getUserTweets(req, res, err){
  let username = req.params.user

  Profile.findOne({userName: username}, function(err, user){
    if(err){
      res.send({
        ok: false,
        message: "Error al consultar los tweets",
        error: err
      })
      return
    }

    if(user == null){
      res.send({
        ok: false,
        message: "No existe el usuarios"
      })
      return
    }

    Tweet.find({_creator: user._id,tweetParent : null})
    .populate("_creator")
    .sort('-date')
    .exec(function(err, tweets){
      if(err){
        res.send({
          ok: false,
          message: "Error al cargar los Tweets",
          error: err
        })
        return
      }

      let response = tweets.map( x => {
        return{
          _id: x._id,
          _creator: {
            _id: x._creator._id,
            name: x._creator.name,
            userName: x._creator.userName,
            avatar: x._creator.avatar || '/public/resources/avatars/0.png'
          },
          date: x.date,
          message: x.message,
          liked: x.likeRef.find(likeUser => likeUser.toString() === user.id || null),
          likeCounter: x.likeCounter,
          replys: x.replys,
          image: x.image
        }
      })

      res.send({
        ok: true,
        body: response
      })
    })
  })
}

function addTweet(req, res, err){
  if(req.body.tweetParent){ // Reply Tweet
    createReplyTweet(req, res, err)
  }else{ // New Tweet
    createNewTweet(req, res, err)
  }
}

function createReplyTweet(req, res, err){
  let user = req.user
  const newTweet = new Tweet({
      _creator: user.id,
      tweetParent: req.body.tweetParent,
      message: req.body.message,
      image: req.body.image
  })

  Tweet.update({_id: req.body.tweetParent},{$inc:{replys:1}})
  .then(update => {
    if((!update.ok) || update.nModified == 0 )throw {message: "No existe el Tweet padre"}
    newTweet.save()
    .then(saveTweet => {
      res.send({
        ok: true,
        tweet: saveTweet
      })
    })
    .catch(err => {
      res.send({
        ok: false,
        message: "Error al guardar el Tweet",
        error: err
      })
    })
  })
  .catch(err => {
    res.send({
      ok: false,
      message: "Error al actualizar al usuario",
      error: err
    })
  })
}

function createNewTweet(req, res, err){
  let user = req.user
  const newTweet = new Tweet({
      _creator: user.id,
      tweetParent: req.body.tweetParent,
      message: req.body.message,
      image: req.body.image
  })

  Profile.update({_id: user.id},{$inc: {tweetCount: 1}})
  .then(update => {
    if((!update.ok) || update.nModified == 0 )throw {message: "No existe el usuario"}
    newTweet.save()
    .then(saveTweet => {
      res.send({
        ok: true,
        tweet: saveTweet
      })
    })
    .catch(err => {
      res.send({
        ok: false,
        message: err.message || "Error al guardar el Tweet",
        error: err.error || err
      })
    })
  })
  .catch(err => {
    res.send({
      ok: false,
      message: err.message || "Error al guardar guardar el Tweet",
      error: err.error || err
    })
  })
}

function like(req, res, err){
  let user = req.user

  let updateStatement = null
  if(req.body.like){
    updateStatement = {$push: {likeRef: mongoose.Types.ObjectId(user.id)} }
  }else{
    updateStatement = {$pull: {likeRef:mongoose.Types.ObjectId(user.id)} }
  }

  Tweet.findByIdAndUpdate(req.body.tweetID, updateStatement)
  .then(tweet => {
    if(tweet == null) throw {message: "No existe el Tweet solicitado"}
    res.send({
      ok: true,
      body: {
        _creator: tweet._creator,
        tweetParent: tweet.tweetParent,
        date: tweet.date,
        message: tweet.message,
        likeRef: tweet.likeRef,
        image: tweet.image,
        replys: tweet.replys,
        likeCounter: tweet.likeCounter += req.body.like ? 1 : -1
      }
    })
  })
  .catch(err => {
    res.send({
      ok: false,
      message: err.message || "Error al actualizar el Tweet",
      error: err.error || err
    })
  })
}

function getTweetDetails(req, res, err){
  let user = req.user || {}
  let tweetId = req.params.tweet
  if(!mongoose.Types.ObjectId.isValid(tweetId)){
    res.send({
      ok: false,
      message: "ID del Tweet Inválido"
    })
    return
  }

  Tweet.findOne({_id: tweetId}).populate("_creator").exec()
  .then(tweet => {
    if(tweet == null)throw {message: "No existe el Tweet"}

    Tweet.find({tweetParent: mongoose.Types.ObjectId(tweetId)})
    .populate("_creator").sort('-date').exec()
    .then(tweets => {
      let replys = []
      if(tweets != null && tweets.length > 0){
        replys = tweets.map(x => {
          return {
            _id: x._id,
            _creator: {
              _id: x._creator._id,
              name: x._creator.name,
              userName:x._creator.userName,
              avatar: x._creator.avatar || '/public/resources/avatars/0.png'
            },
            date: x.date,
            message: x.message,
            liked: x.likeRef.find(
              likeUser => likeUser.toString() === user.id || null),
            likeCounter: x.likeCounter,
            replys: x.replys,
            image: x.image,

          }
        })
      }
      res.send({
        ok: true,
        body: {
          _id: tweet._id,
          _creator: {
            _id: tweet._creator._id,
            name: tweet._creator.name,
            userName:tweet._creator.userName,
            avatar: tweet._creator.avatar || '/public/resources/avatars/0.png'
          },
          date: tweet.date,
          message: tweet.message,
          liked: tweet.likeRef.find(
            likeUser => likeUser.toString() === user.id || null),
          likeCounter: tweet.likeCounter,
          image: tweet.image,
          replys: tweet.replys,
          replysTweets: replys
        }
      })
    }).catch(err => {
      res.send({
        ok:false,
        message: err.message || "Error al consultar el detalle",
        error: err.error || err
      })
    })
  }).catch(err => {
    res.send({
      ok:false,
      message: err.message || "Error al cargar el Tweet",
      error: err.error || err
    })
  })
}

module.exports={
  getNewTweets,
  getUserTweets,
  addTweet,
  like,
  getTweetDetails
}
