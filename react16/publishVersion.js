var pkg = require('./package.json')
var md5 = require('md5')
var gutil = require('gulp-util')

function getPubVersion(){
    var versonMd5 = md5(pkg.version)
    versonMd5 = versonMd5.substring(0,8)
    console.log(gutil.colors.red('publish version md5 is '+versonMd5))
    return versonMd5
}
var pubVersion =  getPubVersion()

module.exports = pubVersion
