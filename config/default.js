/*
 * Default configuration file
 */

module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/mern-chat',
  jwt: {
    SECRET: process.env.JWT_SECRET || 'secret',
    TOKEN_EXPIRY_TIME: process.env.TOKEN_EXPIRY_TIME || 24 * 60 * 60, // 1 day
  },
}
