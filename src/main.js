import { createApp , createRenderer } from 'vue'
import App from './App.vue'
import App from './App.vue'

createApp(App).mount('#app')

// 自定义渲染器
const nodeOps = {
  createElement(){
    // 处理元素创建逻辑

  },
  insert(){
    // 处理元素的插入逻辑

  }
}
createRenderer()
