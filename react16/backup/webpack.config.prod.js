var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
var publishVersion = require('./publishVersion')
var pkg = require('./package.json')
const CleanWebpackPlugin = require('clean-webpack-plugin');
var baseurl = '\\/assets/img'
var fonturl = '\\/assets/iconfont/iconfont'
process.env.NODE_ENV = 'production'
process.env.HOT = false
const publicPath = '/assets/' + publishVersion + '/js/'
var PATHS = require('./config/PATHS');

module.exports = {
  entry: {
    index: './src/index',
    vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux', 'redux-thunk', 'isomorphic-fetch'],
    antd: ['antd/lib/button','antd/lib/input'],
  },
  output: {
    path: path.join(__dirname, 'dist/build/assets/' + publishVersion + '/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: publicPath
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'antd'] }),
    new webpack.LoaderOptionsPlugin({
      test: /\.css?$/,
      options: {
        postcss: function () {
          return [require('postcss-flexbugs-fixes')()];
        }
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: path.join(__dirname, 'dist/build/assets'),
        force: true,
      },
    ]),
    new HtmlWebpackPlugin({
      template: `src/index_prod.html`,
      filename: '../../../index.html',
      minify: {
        collapseWhitespace: false,
      },
    }),
  ],
  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    rules: [
      {
        test: /\.js$/,
        //use: [ 'babel-loader?presets[]=react,presets[]=es2015' ],
        use: {
          loader: "babel-loader?presets[]=react,presets[]=es2015",
          options: {
            presets: [
              "react", "es2015"
            ],
            plugins: [['import', { libraryName: 'antd', style: 'less' }]]
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
        use: ['style-loader', 'css-loader', 'autoprefixer-loader?{browsers: ["> 1%","last 4 versions", "iOS 7","Android >= 4.0"]}!postcss-loader!less-loader?{"modifyVars":{"baseurl":"\'' + baseurl + '\'","fonturl":"\'' + fonturl + '\'"}}']
      },
      {
        test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['base64-font-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        //use: ['url-loader?limit=1']
        use: [{
          loader: 'file-loader',
          options: {
            name:'[name].[ext]',
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            bpassOnDebug:false,
          }
        }],
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
      alias: {
          ROOT: PATHS.ROOT,
          // 自定义路径别名
          MOCK: PATHS.MOCK,
          ASSETS: PATHS.SRC.join('assets'),
          COMPONENTS: PATHS.SRC.join('components'),
          MODULES: PATHS.SRC.join('modules'),          
          ACTIONS: PATHS.SRC.join('actions'), 
          LIBS: PATHS.SRC.join('libs'),
          CONSTANTS: PATHS.SRC.join('constants'),
      },
  },
}

