module.exports = {
  "port": process.env.PORT || 8000,
  "http": {
    "CORS": true,
    "secure": false
  },
  "photos": {
    "aws": {
      "accessKeyId":     process.env.AWS_ACCESS_ID  || "SET-IN-ENV",
      "secretAccessKey": process.env.AWS_SECRET_KEY || "SET-IN-ENV"
    }
  }
};