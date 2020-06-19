// const Service = require('egg').Service

// class RedisService extends Service {
//   // 设置
//   async set(key, value, seconds) {
//     let { redis } = this.app
//     if (!seconds) {
//       await redis.set(key, value)
//     } else {
//       // 设置有效时间
//       await redis.set(key, value, 'EX', seconds)
//     }
//   }
//   // 获取
//   async get(key, seconds) {
//     let { redis } = this.app
//     let data = await redis.get(key);
//     if (!data) return ''
//     if (seconds) {
//       redis.expire(key, seconds)
//     }
//     return data
//   }
//   // 清空redis
//   async flushall() {
//     let { redis } = this.app
//     redis.flushall()
//     return
//   }
// }

// module.exports = RedisService;
