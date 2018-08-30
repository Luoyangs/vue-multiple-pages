const glob = require('glob')

exports.getEntries = (sourcePath) => {
  let entries = {}

  // 读取入口目录，并进行截取
  glob.sync(sourcePath).forEach(entry => {
    const entryName = entry.split('/').splice(-3).slice(1, 2)
    entries[entryName] = entry
  })

  return entries
}
