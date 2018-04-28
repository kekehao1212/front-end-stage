var path = require('path')
var webpack = require('webpack')
var publishVersion = require('./publishVersion')
const CleanWebpackPlugin = require('clean-webpack-plugin');
var FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var baseurl = '\\/src/assets/img'
process.env.NODE_ENV = 'development'
process.env.HOT = true
console.log('path : ' + __dirname)
const publicPath = '/static/'

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: [
      'webpack-hot-middleware/client',
      './src/index',
    ],
    vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux', 'redux-thunk', 'isomorphic-fetch'],
    antd: ['antd/lib/button'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: publicPath
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.css?$/,
      options: {
        postcss: function () {
          return [require('postcss-flexbugs-fixes')()];
        }
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'antd'] }),    
  ],
  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader?presets[]=react,presets[]=es2015",
          options: {
            presets: [
              "react", "es2015"
            ],
            plugins: [['import', { libraryName: 'antd', style: 'css' }]]
          }
        },
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'autoprefixer-loader?{browsers: ["> 1%","last 4 versions", "iOS 7","Android >= 4.0"]}!postcss-loader!less-loader?{"modifyVars":{"baseurl":"\'' + baseurl + '\'"}}']
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
  },
}
