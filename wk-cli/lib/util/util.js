exports.cwd = process.cwd()

exports.env = () => {
  const args = process.argv.slice(2)
  let env = 'dev'
  for (let i = 0, l = args.length; i < l; i++) {
    const arg = args[i]
    if (arg.startsWith('env')) {
      env = arg.replace('env=', '')
      break
    }
  }
  return env
}