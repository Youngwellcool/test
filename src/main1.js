import css from './css/index.css';
// import black from './less/black.less';
import main2 from './main2.js'
// import Vue from 'vue'
/**
 * 引入第三方库
 * 这种引入第三方库的方式是局部引入，没有全局引入
 * 如果要全局引入jQuery，需要使用webpack自带的ProvidePlugin插件，在webpack.config.js的plugins中进行配置
 */
//import $ from 'jquery'  // 这里引入是不需要我们写相对路径的，因为jquery的包是在node_modules里的，只要写一个包名jquery，系统会自动为我们查找的。需要说的是你不仅可以在入口中进行引入，你还可以在任何你需要的js中引入，webpack并不会重复打包，它只给我们打包一次。(但这说明了这种引入第三方库的方式是局部引入，没有全局引入)


import nav from './sass/nav.scss';
let str = "Hello World and Webpack";

document.getElementById('title').innerHTML = str;
// document.getElementById('json').innerHTML = json.name;
console.log(str);
$('#title').html('测试jQuery引入是否成功');
// console.log(Vue)
// var vm = new Vue({
//     el:'#app',
//     data:{
//         str:'Hello Vue'
//     }
// })
