var webpack = require('webpack')

module.exports = {
  entry: [
    __dirname + "/app/App.js",
  ],
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
    publicPath: "/public"
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query:{
        presets: ['env','react'],
        plugins: ["jsx-control-statements"]
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   mangle: {
    //     screw_ie8: true,
    //     keep_fnames: true
    //   },
    //   compress: {
    //     screw_ie8: true
    //   },
    //   comments: false
    // })
  ]
};
