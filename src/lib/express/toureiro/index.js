import Toureiro from 'toureiro'

const [,host,port,db] = process.env.REDIS_URL.match(/redis\:\/\/([\d\w\.]*)\:(\d*)\/(\d*)/)

const toureiroMiddleware = Toureiro({ redis: { port, host, db }})

export default toureiroMiddleware
