const path = require('path');
const webpack = require('webpack');
const extractPlugin = require('extract-text-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
let websit = {
    publicPath:'http://127.0.0.1:1717'
}
module.exports = {
    mode:"development",
    entry:{
        main:"./src/main1.js"
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        // publicPath:websit.publicPath
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: extractPlugin.extract({   // css代码分离插件
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath:'../'    // TODO 解决分离后的css的图片url路径问题
                })
            },
            {
                test:/\.(jpg|png|gif)$/,
                use:[{
                        loader: 'url-loader',
                        options:{
                            limit:5000,
                            name:'images/[name].[hash].[ext]'  // 设置打包后图片的路径和名字
                        }
                    }]
            }
        ]
    },
    plugins:[
        // new webpack.HotModuleReplacementPlugin()
        new extractPlugin('css/index.css'),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'

        })
    ],
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: 'localhost',
        //服务端压缩是否开启
        compress: true,
        //配置服务端口号
        port: 1717,
        // open: true
    }

}