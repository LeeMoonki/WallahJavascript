varwebpack = require("webpack");
module.exports = {
    entry: {
        main: __dirname + "/src/index.js"
    },
    output: {
        path: __dirname + "/public/dist/",
        filename: "[name].js",
        publicPath: "/dist"
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new varwebpack.optimize.UglifyJsPlugin()
    ]
}