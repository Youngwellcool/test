const path = require('path');
const webpack = require('webpack');
const extractPlugin = require('extract-text-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const glob = require('glob');
const purifyCssPlugin = require('purifycss-webpack');
<<<<<<< HEAD
const entry =  require('./webpack_config/entry_webpack.js');  // 引入自定义的一个打包入口文件
=======
const copyPlugin = require('copy-webpack-plugin');
// const json = require('../config.json');
const entry =  require('./webpack_config/entry_webpack.js');  // 引入自定义的一个打包入口模块
>>>>>>> 8c690314c02089b5b78788f85760c13e70b0a1fd
let websit = {
    publicPath:'http://127.0.0.1:1717'
}
var styleCss = new extractPlugin('css/index.css')
var lessCss = new extractPlugin('css/black.css')
console.log(path.resolve(__dirname,'dist'))  // 将dist文件解析为一个绝对路径
console.log(__dirname);  // 当前文件的绝对目录
console.log(__filename); // 当前文件的绝对路径
/**
 * 切换开发模式和生产模式
 * 在package.json中的“scripts”中设置type的值(set type=dev&webpack // 将dev赋值给type并执行webpack打包命令)
 * process.env是node提供的一个对象
 */
if(process.env.type == 'dev'){  
    console.log('开发模式')
    var mode = "development";
}else if(process.env.type == 'build'){
    console.log('生产模式')
    var mode = "production";
}else {
    var mode = "development";
}
console.log(encodeURIComponent(process.env.type));

module.exports = {
    devtool: '#cheap-module-eval-source-map',  // 开启cheap-module-eval-source-map模式的sourcemap
    mode: mode,//"development", //"production"
    // entry:{
    //     main:"./src/main1.js"
    // },
    entry: entry.path,
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        // publicPath:websit.publicPath
        // chunkFilename:[name].js,
    },
    module:{
        rules:[

            /**
             * css代码分离到两个文件中
             * .css文件的分离到styleCss创建的css/index.css中
             * .less文件的分离到lessCss创建的css/black.css中
             */
            {
                test: /\.(css|scss)$/,
                use: extractPlugin.extract({   // css代码分离插件
                    fallback: "style-loader",
                    // use: "css-loader",
                    use:[{
                        loader: "css-loader"
                    }, 
                    // {
                    //     loader: "less-loader"
                    // },
                    {
                        loader: "sass-loader"
                    },
                        'postcss-loader',  // 对css新特性，自动补全前缀，需和插件autoprefixer（自动添加前缀的插件）一起使用，此外还需在该配置文件的同级目录下新建postcss.config.js文件，默认只会补全-webkit-前缀，如需补全其他前缀需在package.json中添加browserslist参数配置
                ],
                    publicPath:'../'    // TODO 解决分离后的css的图片url路径问题
                })
            },

            /**
             * 所有css代码分离到同一个文件中
             */

            // {
            //     test: /\.(css|less)$/,
            //     use: extractPlugin.extract({   // css代码分离插件
            //         fallback: "style-loader",
            //         // use: "css-loader",
            //         use:[{
            //             loader: "css-loader"
            //         }, {
            //             loader: "less-loader"
            //         },
            //         // {
            //         //     loader: "sass-loader"
            //         // }
            //             'postcss-loader',  // 对css新特性，自动补全前缀，需和插件autoprefixer（自动添加前缀的插件）一起使用，此外还需在该配置文件的同级目录下新建postcss.config.js文件，默认只会补全-webkit-前缀，如需补全其他前缀需在package.json中添加browserslist参数配置
            //     ],
            //         publicPath:'../'    // TODO 解决分离后的css的图片url路径问题
            //     })
            // },


            /*** 因为用了css代码分离插件，所以less/sass的loader配置也要写到上面的extractPlugin.extract()配置中，不然像下面这样再写一个less/sass的loader，打包时就会报错 * */
            // {
            //     test:/\.less$/,
            //     use:[
            //         {loader:'css-loader'},
            //         {loader:'less-loader'},
            //         {loader:'style-loader'}
            //     ]
            // },
            // {
            //     test:/\.scss$/,
            //     use:[
            //         {loader:'css-loader'},
            //         {loader:'scss-loader'},
            //         {loader:'style-loader'}
            //     ]
            // },
            {
                test:/\.(jpg|png|gif)$/,
                use:[{
                        loader: 'url-loader', // url-loader中封装了file-loader
                        options:{
                            limit:5000,  // 限制小于5000B的打包成base64，大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。
                            name:'images/[name].[hash].[ext]'  // 设置打包后图片的路径和名字
                        }
                    }]
            },
            {
                test:/\.(htm|html)$/i,
                use:['html-withimg-loader']
            },
            {
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader',
                    // options:{
                    //     presets:['es2015','react']  // 建议将该配置写在.babelrc文件中
                    // }
                },
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        // new webpack.HotModuleReplacementPlugin()
        //new extractPlugin('css/index.css'),
        styleCss,
        lessCss,
        new htmlPlugin({  // 打包生成html插件
            minify:{  // 是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号。
                removeAttributeQuotes:true
            },
            hash:true, // 为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template:'./src/index.html' //是要打包的html模版路径和文件名称。
        }),
        /**
         * 清除未被使用的css插件
         * 使用这个插件必须配合extract-text-webpack-plugin这个插件
         */
        new purifyCssPlugin({  
            paths: glob.sync(path.join(__dirname, 'src/*.html'))  // 主要是寻找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
        }),

        /**
         * 全局引用jQuery和vue
         */
        new webpack.ProvidePlugin({
            $:'jquery',
            Vue:'vue'
        }),
        
        /**
         * 在打包后的文件里添加备注或者版权信息的插件
         */
        new webpack.BannerPlugin('Youngwell版权所有，webpack入门学习笔记，请访问：https://youngwellcool.github.io/'),

        // new copyPlugin([{
        //     form:__dirname + '/src/public',
        //     to:'./public'
        // }])

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
    },
    resolve: {
        alias: { // 设置别名 
            'vue': 'vue/dist/vue.js'  // 设置vue=vue/dist/vue.js，不手动设置的话默认vue=vue/dist/vue.runtime.js(引用运行时的vue就会报错)
            }
    },
    watchOptions:{
        //检测修改的时间，以毫秒为单位
        poll:1000, 
        //防止重复保存而发生重复编译错误。这里设置的500是半秒内重复保存，不进行打包操作
        aggregateTimeout:500, 
        //不监听的目录
        ignored:/node_modules/, 
    },

}