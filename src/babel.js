async function start() {
  return Promise.resolve('async is work')
}

start().then(console.log)

class Util {
  static id = Date.now()
}

console.log(Util.id)