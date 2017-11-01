module.exports = {
  debugMode: true,
  server: {
    port: 3000,
    host: "http://api.localhost"
  },
  mongodb: {
    development: {
      connectionString: "mongodb://twitter:<PASSWORD>@mini-twitter-shard-00-00-wwqzb.mongodb.net:27017,mini-twitter-shard-00-01-wwqzb.mongodb.net:27017,mini-twitter-shard-00-02-wwqzb.mongodb.net:27017/test?ssl=true&replicaSet=Mini-Twitter-shard-0&authSource=admin"
    },
    production: {
      connectionString: "mongodb://twitter:<PASSWORD>@mini-twitter-shard-00-00-wwqzb.mongodb.net:27017,mini-twitter-shard-00-01-wwqzb.mongodb.net:27017,mini-twitter-shard-00-02-wwqzb.mongodb.net:27017/test?ssl=true&replicaSet=Mini-Twitter-shard-0&authSource=admin"
    }
  }
}
