module.exports = {
  debugMode: true,
  server: {
    port: 443,
    host: "https://api.localhost"
  },
  tweets: {
    maxTweetSize: 140
  },
  mongodb: {
    development: {
      connectionString: "mongodb://twitter:J7qcSlyiwuOzYgiz@mini-twitter-shard-00-00-wwqzb.mongodb.net:27017,mini-twitter-shard-00-01-wwqzb.mongodb.net:27017,mini-twitter-shard-00-02-wwqzb.mongodb.net:27017/test?ssl=true&replicaSet=Mini-Twitter-shard-0&authSource=admin"
    },
    production: {
      connectionString: "mongodb://twitter:J7qcSlyiwuOzYgiz@mini-twitter-shard-00-00-wwqzb.mongodb.net:27017,mini-twitter-shard-00-01-wwqzb.mongodb.net:27017,mini-twitter-shard-00-02-wwqzb.mongodb.net:27017/test?ssl=true&replicaSet=Mini-Twitter-shard-0&authSource=admin"
    }
  },
  jwt: {
    secret: "#$%EGt2eT##$EG%Y$Y&U&/IETRH45W$%whth$Y$%YGRT"
  }
}
