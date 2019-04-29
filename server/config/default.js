/*
 * Default configuration file
 */

module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://104.168.6.217:27017/mern-chat',
  // MONGODB_URL: 'mongodb://104.168.6.217:27017/mern-chat',
  // MONGODB_URL: 'mongodb://localhost:27017/mern-chat',
  jwt: {
    SECRET: process.env.JWT_SECRET || 'secret',
    TOKEN_EXPIRY_TIME: process.env.TOKEN_EXPIRY_TIME || 24 * 60 * 60, // 1 day
  },
  CHAT_KIT: {
    INSTANCELOCATOR:'v1:us1:dbb5f3fa-9c14-4a50-a5c2-f87ebfbc028b',
    KEY: '0886cc54-173d-4dbc-8a34-4a6ed5347686:8GKd4LLH4Qi78dRsyOuX1M+0zhIf4FFUZuIngywTZmU='
  }
}
