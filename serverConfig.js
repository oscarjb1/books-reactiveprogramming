module.exports = {
  server: {
    securePort: 443,
    insecurePort: 80,
  },
  mongodb: {
    development: {
      connectionString: "mongodb://twitter:Dummy1234@mini-twitter-shard-00-00-wwqzb.mongodb.net:27017,mini-twitter-shard-00-01-wwqzb.mongodb.net:27017,mini-twitter-shard-00-02-wwqzb.mongodb.net:27017/test?ssl=true&replicaSet=Mini-Twitter-shard-0&authSource=admin"
    },
    production: {
      connectionString: "mongodb://twitter:Dummy1234@mini-twitter-shard-00-00-wwqzb.mongodb.net:27017,mini-twitter-shard-00-01-wwqzb.mongodb.net:27017,mini-twitter-shard-00-02-wwqzb.mongodb.net:27017/test?ssl=true&replicaSet=Mini-Twitter-shard-0&authSource=admin"
    }
  },
  jwt: {
    secret: "#$%EGt2eT##$EG%Y$Y&U&/IETRH45W$%whth$Y$%YGRT"
  }
}
