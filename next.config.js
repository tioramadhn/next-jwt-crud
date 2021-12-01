module.exports = {
  reactStrictMode: true,
  target: "experimental-serverless-trace",
  env: {
    SECRET_KEY: 'tioganteng',
    NEXT_PUBLIC_ORIGIN: process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://next-jwt-tio.netlify.app",
    MONGO_URI: "mongodb://tioramadhn:mongodb@cluster0-shard-00-00.gduwf.mongodb.net:27017,cluster0-shard-00-01.gduwf.mongodb.net:27017,cluster0-shard-00-02.gduwf.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-8m45f7-shard-0&authSource=admin&retryWrites=true&w=majority"
  }
}
