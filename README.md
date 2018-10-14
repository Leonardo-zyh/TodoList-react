React项目
#Create React App创建
npm install -g create-react-app
create-react-app my-app
cd my-app
npm start

#分析代码
import './index.css'   (引入css) 
import App from './App.js'  (引入js)
ReactDOM.render(<App />,div );  (render,标签渲染且放置在div)

App标签
简写XML,通过JSX转换为js
onClick={function(){alert('hi')}}  花括号内为js，括号外为XML

#代码实时更新（npm start）

#展示页面
npm run-script build
package中加  "homepage" : "https://leonardo-zyh.github.io/react-learn/build",

.gitignore中production去除build，使得能够git add

#React生命周期
React 的生命周期包括三个阶段：mount（挂载）、update（更新）和 unmount（移除）

`mount`
constructor()               初始化props和state
componentWillMount()        模块渲染前
render()                    模块渲染（render中的内容插入）
componentDidMount()         模块渲染后

`update`
componentWillReceiveProps(nextProps)           我要读取 props 啦！
shouldComponentUpdate(nextProps, nextState)    请问要不要更新组件？true / false
componentWillUpdate()                          我要更新组件啦！
render()                                       更新！
componentDidUpdate()                           更新完毕啦！

`unmount`
componentWillUnmount()                         我要死啦

`一般，我们只在这几个钩子里 setState`
componentWillMount
componentDidMount
componentWillReceiveProps


#this.setState  (render是更新)
shouldComponentUpdate  判断模块需不需要重新渲染
componentWillUpdate    准备更新前
render                 模块渲染
componentDidUpdate     模块渲染结束
(componentWillReceiveProps  模块将接受新的数据)

#this.setState函数的隐藏功能