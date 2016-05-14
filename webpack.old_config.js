const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry: {
        main: [
            "webpack-dev-server/client?http://localhost:8000",
            "webpack/hot/only-dev-server",
            "./js/dist/app.js"
        ]
    },

    output: {
        path: __dirname + "/js",
        filename: "build.js"
    },

    watch: true,

    devtool: NODE_ENV == "development" ? "cheap-inline-module-source-map" : null,

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV:JSON.stringify(NODE_ENV)
        }),
        new webpack.optimize.DedupePlugin()
    ],

    resolve: {
        modulesDirectories: ['node_modules', 'dist'],
        extensions: ['','.js','.jsx']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['','.js','.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel?presets[]=react,presets[]=es2015"]
            }
        ]
    },

    devServer: {
        host: 'localhost',
        port: 8000,
        proxy: {
            '*' : 'http://localhost:8080'
        },
        hot: true
    }
}