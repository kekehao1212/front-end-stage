var path = require('path')
var webpack = require('webpack')
var publishVersion = require('./publishVersion')
var pkg = require('./package.json')
const CleanWebpackPlugin = require('clean-webpack-plugin');
var baseurl = '\\//mc.vpalstatic.com/img'
process.env.NODE_ENV ='production'
process.env.HOT = false

module.exports = {
  // devtool:'cheap-module-eval-source-map',
  entry: {
    index: './src/index',
    vendor: ['react', 'react-dom','react-redux','react-router','react-router-redux','redux','redux-thunk','isomorphic-fetch']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // chunkFilename: '[name].[chunkhash:5].chunk.js',
    chunkFilename: '[name].chunk.js',
    publicPath: 'https://mc.vpalstatic.com/'+publishVersion+'/js/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new CleanWebpackPlugin(['dist']),
    new webpack.LoaderOptionsPlugin({
       test: /\.css?$/,
       options: {
         postcss: function () {
            return [require('postcss-flexbugs-fixes')()];
          }
       }
     }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader?presets[]=react,presets[]=es2015' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css?$/,
        use: ['style-loader','css-loader','postcss-loader']
      },
      {
        test: /\.less/,
        use: ['style-loader','css-loader','autoprefixer-loader?{browsers: ["> 1%","last 4 versions", "iOS 7","Android >= 4.0"]}!postcss-loader!less-loader?{"modifyVars":{"baseurl":"\'' + baseurl +'\'"}}']
      }, 
      {
        test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['base64-font-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader?limit=0']
      }, 
      {
        test: /\.(mp4|ogg|svg)$/,
        use: ['file-loader']
      }
    ]
  }
}

