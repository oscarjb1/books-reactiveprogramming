var Profile = require('../models/Profile')
var Tweet = require('../models/Tweet')
var mongoose = require('mongoose')

// Servicio para consultar los 10 últimos tweets para mostrar en el home del usuario
const getNewTweets = async (req, res, err) => {
  let user = req.user || {}
  let page = req.query.page;
  let perPage = 10

  try {
    //Query the first 10 tweets
    let tweets = await Tweet.find({ tweetParent: null })
      .populate("_creator", { banner: 0 })
      .sort({'_id': -1})
      .limit(10)
      .skip(perPage * page)

    // Transform MongoDB response
    let response = tweets.map(x => {
      return {
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

  } catch (error) {
    console.log(error)
    res.send({
      ok: false,
      message: "Error al cargar los Tweets",
      error: error
    })
  }
}

//Consulta todos los tweets de un usuario determinado
const getUserTweets = async (req, res, err) => {
  let username = req.params.user
  let page = req.query.page;
  let perPage = 10

  try {
    // Query the user profile
    let user = await Profile.findOne({ userName: username })
    // if the profile dont exist, throw error
    if (user == null) throw new Error("No existe el usuario")

    // Query all user tweets
    let tweets = await Tweet.find({ _creator: user._id, tweetParent: null })
      .populate("_creator")
      .sort({'_id': -1})
      .limit(10)
      .skip(perPage * page)

    let response = tweets.map(x => {
      return {
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
  } catch (error) {
    res.send({
      ok: false,
      message: error.message || "Error al consultar los tweets",
      error: err
    })
  }
}

//Servicio para agregar o responder a un Tweet
const addTweet = (req, res, err) => {
  if (req.body.tweetParent) { // Reply Tweet
    createReplyTweet(req, res, err)
  } else { // New Tweet
    createNewTweet(req, res, err)
  }
}

// Add reply to exist tweet
const createReplyTweet = async (req, res, err) => {
  let user = req.user

  let session
  try {
    session = await mongoose.startSession()
    session.startTransaction()


    let newTweet = new Tweet({
      _creator: user.id,
      tweetParent: req.body.tweetParent,
      message: req.body.message,
      image: req.body.image
    })

    // Increment replys in the parent tweet
    let updatedTweet = await Tweet.updateOne(
      { _id: req.body.tweetParent }, { $inc: { replys: 1 } })
      .session(session)

    // Throw error if the parent tweet dont exist
    if ((!updatedTweet.ok) || updatedTweet.nModified == 0) throw new Error("No existe el Tweet padre")
    
    newTweet = await newTweet.save({session})
    res.send({
      ok: true,
      tweet: newTweet
    })
    session.commitTransaction();
  } catch (error) {
    session.abortTransaction()
    console.log("error => ", error.message)
    res.send({
      ok: false,
      message: error.message || "Error al guardar el Tweet",
      error: err
    })
  }
}

// servicio que crea un nuevo Tweet
const createNewTweet = async (req, res, err) => {
  let user = req.user
  
  let session
  try {
    session = await mongoose.startSession()
    session.startTransaction()

    let newTweet = new Tweet({
      _creator: user.id,
      tweetParent: req.body.tweetParent,
      message: req.body.message,
      image: req.body.image
    })

    //Update the user profile to increment the tweet counter
    let updateProfile = await Profile.updateOne({ _id: user.id }, { $inc: { tweetCount: 1 } }, {session})

    // If the user profile dont exist, throw error
    if ((!updateProfile.ok) || updateProfile.nModified == 0) throw new Error("No existe el usuario")

    // Save the new Tweet
    newTweet = await newTweet.save({session})
    res.send({
      ok: true,
      tweet: newTweet
    })

    session.commitTransaction()
  } catch (error) {
    console.log("error => ", error.message)
    session.abortTransaction()
    res.send({
      ok: false,
      message: error.message || "Error al guardar el Tweet",
      error: error.error || error
    })
  }
}

// Incrementa los Liks de un Tweet
const like = async (req, res, err) => {
  let user = req.user

  try {
    let updateStatement = req.body.like
      ? { $push: { likeRef: mongoose.Types.ObjectId(user.id) } }
      : { $pull: { likeRef: mongoose.Types.ObjectId(user.id) } }

    // Find the tweet and increase/decrease like counter
    //findOneAndUpdate
    let tweet = await Tweet.findOneAndUpdate({ _id: req.body.tweetID }, updateStatement)

    // If the tweet dont exist,  throw error
    if (tweet == null) throw { message: "No existe el Tweet solicitado" }

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
  } catch (error) {
    console.error("error => ",  error.message)
    res.send({
      ok: false,
      message: err.message || "Error al actualizar el Tweet",
      error: error.error || error
    })
  }
}

const getTweetDetails = async (req, res, err) => {
  let user = req.user || {}

  try {
    let tweetId = req.params.tweet
    if (!mongoose.Types.ObjectId.isValid(tweetId)) throw new Error("ID del Tweet Inválido")



    let tweet = await Tweet.findOne({ _id: tweetId }).populate("_creator")
    if (tweet == null) throw { message: "No existe el Tweet" }

    let tweets = await Tweet.find({ tweetParent: mongoose.Types.ObjectId(tweetId) })
      .populate("_creator")
      .sort('-date')

    tweets = tweets || []

    replys = tweets.map(x => {
      return {
        _id: x._id,
        _creator: {
          _id: x._creator._id,
          name: x._creator.name,
          userName: x._creator.userName,
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

    res.send({
      ok: true,
      body: {
        _id: tweet._id,
        _creator: {
          _id: tweet._creator._id,
          name: tweet._creator.name,
          userName: tweet._creator.userName,
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

  } catch (error) {
    res.send({
      ok: false,
      message: error.message || "Error al cargar el Tweet",
      e: error
    })
  }
}

const getTweetImage = async (req, res, err) => {
  try {
    let tweetId = req.params.tweet
    let tweet = await Tweet.findOne({ _id: tweetId })

    let image = tweet.image //data:image/jpeg; 
    if (image) {
      let mimeType = image.split(";")[0].split(":")[0]
      res.header('Content-Type', 'image/jpeg')
    }
    res.send(tweet.image)
  } catch (error) {
    console.log("error =>")
    res.send({
      ok: false,
      message: error.message || "Error al cargar la imagen"
    })
  }
}

module.exports = {
  getNewTweets,
  getUserTweets,
  addTweet,
  like,
  getTweetDetails,
  getTweetImage
}
