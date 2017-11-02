var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: path.resolve(__dirname, './css/application.css.scss'),
});

module.exports = {
  entry: {
    app: "./src/index.js"
  },

  output: {
    path: __dirname + "/lib",
    filename: "app.js",
    library: 'ReactFormBuilder',
    libraryTarget: 'umd',
  },
  

  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    'react': 'react',
    'react-dom': 'react-dom',
    'react-datepicker': 'react-datepicker',
    //'react/addons': 'react/addons',
    'classnames': 'classnames',
    'jquery': 'jquery',
    'bootstrap': 'bootstrap'
  },

  module:  {
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
                        sourceMap: false,
                    },
                },                
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false,
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
