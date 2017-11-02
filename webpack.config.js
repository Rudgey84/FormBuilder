var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "application.css",
    disable: false //process.env.NODE_ENV === "development"
});

 module.exports = {

    entry:  "./app.js",
    output: {
        filename: "app.js",
        path: __dirname + "/build",
            },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [ 'env', 'react', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy', 'transform-object-rest-spread'],       
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        sourceMap: true,
                    },
                },                
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        includePaths: ["css", "./css"]
                    },
                },
            ],
        }),
    },
    ]
  },
  plugins: [
    extractSass
]
}