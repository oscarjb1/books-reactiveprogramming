var authService = require('../services/AuthService')
var Profile = require('../models/Profile')
var bcrypt = require('bcryptjs')
var configuration = require('../../serverConfig')
var jwt = require('jsonwebtoken')
var mongoose = require('mongoose')

// Servicio para crear un nuevo usuario
const signup = async (req, res, err) => {
    try {
        // Create a new profile object
        let newProfile = new Profile({
            name: req.body.name,
            userName: req.body.username.toLowerCase(),
            password: bcrypt.hashSync(req.body.password, 10)
        })

        // Create a new profile in the database
        newProfile = await newProfile.save()

        // Return the new created profile
        res.send({
            ok: true,
            body: {
                profile: newProfile
            }
        })

    } catch (err) {
        console.log(err)
        let errorMessage = null
        if (err.errors != null && err.errors.userName != null) {
            errorMessage = "Nombre de usuario existente"
        } else {
            errorMessage = 'Error al guardar el usuario'
        }
        res.send({
            ok: false,
            message: "Error al crear el usuario",
            error: errorMessage || err.message
        })
    }
}

// Servicio que valida la disponibilidad de un nombre de usuario
const usernameValidate = async (req, res, err) => {

    try {
        // find if exist some profile with the same username
        let profiles = await Profile.find().byUsername(req.params.username.toLowerCase())

        //If the profiles list is not empty, the username is taken by other user
        if (profiles.length > 0) throw new Error("Usuario existente")

        // Confirm to the username is available
        res.send({
            ok: true,
            message: "Usuario disponible"
        })
    } catch (err) {
        res.send({
            ok: false,
            message: err.message || "Error al validar el nombre de usuario"
        })
    }
}

// Servicio que autentica a un usuario a partir del usuario/password y genera un token
const login = async (req, res, err) => {
    try {
        let profile = await Profile.findOne({ userName: req.body.username.toLowerCase() })
        if (profile == null) throw new Error("Usuario y contraseña inválida")


        let valid = await bcrypt.compare(req.body.password, profile.password)
        if (!valid) throw new Error('Usuario y password inválidos')

        let user = {
            username: req.body.username,
            id: profile._id
        }

        let token = authService.generateToken(user)

        res.send({
            ok: true,
            profile: {
                id: profile.id,
                name: profile.name,
                userName: profile.userName,
                avatar: profile.avatar || '/public/resources/avatars/0.png',
                banner: profile.banner || '/public/resources/banners/4.png',
                tweetCount: profile.tweetCount,
                following: profile.following,
                followers: profile.followers
            },
            token: token
        })
    } catch (error) {
        res.send({
            ok: false,
            message: error.message || "Error al validar el usuario"
        })
    }
}

// Servicio que autentica a un usuario a partir del token
const relogin = async (req, res, err) => {
    try {
        let userToken = {
            id: req.user.id,
            username: req.user.username
        }
        let newToken = authService.generateToken(userToken)

        let profile = await Profile.findOne({ _id: req.user.id })
        if (profile === null) throw new Error("No existe el usuario")

        res.send({
            ok: true,
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
        })
    } catch (error) {
        res.send({
            ok: false,
            message: error.message || "Error al validar el usuario"
        })
    }
}

// Servicio que consulta usuarios sugeridos para seguir
const getSuggestedUser = async (req, res, err) => {
    let user = req.user

    try {
        let users = await Profile.find({ userName: { $ne: user.username } })
            .sort({ "date": -1 })
            .limit(6)

        res.send({
            ok: true,
            body: users.map(x => {
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
        })
    } catch (error) {
        res.send({
            ok: false,
            message: error.message || "Error al validar el usuario"
        })
    }
}

// Servicio que consulta el perfil de un usuario por medio de su nombre de usuario
const getProfileByUsername = async (req, res, err) => {
    let user = req.params.user

    try {
        if (user === null) throw new Error("parametro 'user' requerido")

        // Find profile by username
        let profile = await Profile.findOne({ userName: user })

        //if the user dont exist, throw error
        if (profile === null) throw new Error("Usuario no existe")

        // Retrieve token from the header request
        var token = req.headers['authorization'] || ''
        token = token.replace('Bearer ', '')

        //Validate token
        let userToken = await jwt.verify(token, configuration.jwt.secret)

        // Validate if the user profile is follower
        let follow = profile.followersRef.find(x => x.toString() === userToken.id.toString()) != null

        // Return user profile
        res.send({
            ok: true,
            body: {
                _id: profile._id,
                name: profile.name,
                description: profile.description,
                userName: profile.userName,
                avatar: profile.avatar || '/public/resources/avatars/0.png',
                banner: profile.banner || '/public/resources/banners/4.png',
                tweetCount: profile.tweetCount,
                following: profile.following,
                followers: profile.followers,
                follow: follow
            }
        })
    } catch (error) {
        res.send({
            ok: false,
            message: error.message || "parametro 'user' requerido"
        })
    }
}

// Servicio utilizado para actualizar el perfil del usuario
const updateProfile = async (req, res, err) => {
    let username = req.user.username

    try {
        const updates = {
            name: req.body.name,
            description: req.body.description,
            avatar: req.body.avatar,
            banner: req.body.banner
        }

        let response = await Profile.updateOne({ userName: username }, updates)
        res.send({
            ok: true
        })
    } catch (error) {
        res.send({
            ok: false,
            message: error.message || "Error al actualizar el perfil"
        })
    }

}

// Servicio que consulta todos los seguidores
const getFollower = async (req, res, err) => {
    let username = req.params.user

    try {
        let followers = await Profile.findOne({ userName: username })
            .populate("followersRef")
        if (followers === null) throw new Error("No existe el usuario")

        let response = followers.followersRef.map(x => {
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
    } catch (error) {
        res.send({
            ok: false,
            message: error.message || "Error al consultara los seguidores",
        })
    }
}

// Servicio para consultar a los usuarios que seguimos
const getFollowing = async (req, res, err) => {
    let username = req.params.user

    try {
        let followings = await Profile.findOne({ userName: username })
            .populate("followingRef")

        if (followings === null) throw new Error("No existe el usuario")

        let response = followings.followingRef.map(x => {
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

    } catch (error) {
        res.send({
            ok: false,
            message: error.message || "Error al consultara los seguidores",
        })
    }
}

// Servicio que permite comenzar a seguir a otro usuario
const follow = async (req, res, err) => {
    let username = req.user.username
    let followingUser = req.body.followingUser
    let session

    try {
        session = await mongoose.startSession()
        session.startTransaction()

        // Find the two profiles
        let users = await Profile.find({ userName: { $in: [username, followingUser] } })

        if (users.length != 2) throw { message: "El usuario no existe" }
        let my = users.find(x => x.userName == username)
        let other = users.find(x => x.userName == followingUser)
        let following = my.followingRef.find(x => x.toString() === other._id.toString()) != null
        let myUpdate = null
        let otherUpdate = null
        if (following) {
            myUpdate = { $pull: { followingRef: other._id } }
            otherUpdate = { $pull: { followersRef: my._id } }
        } else {
            myUpdate = { $push: { followingRef: other._id } }
            otherUpdate = { $push: { followersRef: my._id } }
        }

        let myUp = await Profile.updateOne({ userName: my.userName }, myUpdate, { session })
        let otherUp = await Profile.updateOne({ userName: other.userName }, otherUpdate, { session })

        res.send({
            ok: true,
            unfollow: following,
        })

        session.commitTransaction()
    } catch (err) {
        console.log("error => ", err.message)
        session.abortTransaction()
        res.send({
            ok: false,
            message: err.message || "Error al ejecutar la operación",
        })
    }
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
