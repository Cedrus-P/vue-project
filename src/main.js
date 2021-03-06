import { createApp, createRenderer, h } from 'vue'
import App from './App.vue'
import CanvasApp from './CanvasApp.vue'

createApp(App)
.component('comp', {
	render(){
		return h('div', 'I am a comp')
	}
})
.mount('#app')
App.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})


// 自定义渲染器
const nodeOps = {
	insert: (child, parent, anchor) => {
		// 我们重写了insert逻辑，因为在我们canvasApp中不存在实际dom插入操作
		// 这里面只需要将元素之间的父子关系保存一下即可
		child.parent = parent

		if (!parent.childs) {
			parent.childs = [child]
		} else {
			parent.childs.push(child)
		}

		// 只有canvas有nodeType，这里就是开始绘制内容到canvas
		if (parent.nodeType == 1) {
			draw(child)
			// 如果子元素上附加了事件，我们给canvas添加监听器
			if (child.onClick) {
				ctx.canvas.addEventListener('click', () => {
					child.onClick()
					setTimeout(() => {
						draw(child)
					}, 0)
				})
			}
		}
	},
	remove: (child) => {},
	createElement: (tag, isSVG, is) => {
		// 创建元素时由于没有需要创建的dom元素，只需返回当前元素数据对象
		return { tag }
	},
	createText: (text) => {},
	createComment: (text) => {},
	setText: (node, text) => {},
	setElementText: (el, text) => {},
	parentNode: (node) => {},
	nextSibling: (node) => {},
	querySelector: (selector) => {},
	setScopeId(el, id) {},
	cloneNode(el) {},
	insertStaticContent(content, parent, anchor, isSVG) {},
	patchProp(el, key, prevValue, nextValue) {
		el[key] = nextValue
	}
}

// 创建一个渲染器
let renderer = createRenderer(nodeOps)
// 绘制方法：el：子元素
const draw = (el,noClear) => {
  if (!noClear) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  if (el.tag == 'piechart') {
    let { data, r, x, y } = el;
    let total = data.reduce((memo, current) => memo + current.count, 0);
    let start = 0,
        end = 0;
    data.forEach(item => {
      end += item.count / total * 360;
      drawPieChart(start, end, item.color, x, y, r);
      drawPieChartText(item.name, (start + end) / 2, x, y, r);
      start = end;
    });
  }
  el.childs && el.childs.forEach(child => draw(child,true));
}

const d2a = (n) => {
  return n * Math.PI / 180;
}
const drawPieChart = (start, end, color, cx, cy, r) => {
  let x = cx + Math.cos(d2a(start)) * r;
  let y = cy + Math.sin(d2a(start)) * r;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(x, y);
  ctx.arc(cx, cy, r, d2a(start), d2a(end), false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
const drawPieChartText = (val, position, cx, cy, r) => {
  ctx.beginPath();
  let x = cx + Math.cos(d2a(position)) * r/1.25 - 20;
  let y = cy + Math.sin(d2a(position)) * r/1.25;
  ctx.fillStyle = '#000';
  ctx.font = '20px 微软雅黑';
  ctx.fillText(val,x,y);
  ctx.closePath();
}

// 保存画布和其上下文
let ctx
let canvas

// 扩展mount，首先创建一个画布元素
function createCanvasApp(App) {
	const app = renderer.createApp(App)
	const mount = app.mount
	app.mount = function (selector) {
		// 创建并插入画布
		canvas = document.createElement('canvas')
		// 设置画布基础属性
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		document.querySelector(selector).appendChild(canvas)
		ctx = canvas.getContext('2d')
		// 执行默认mount
		mount(canvas)
	}
	return app
}

createCanvasApp(CanvasApp).mount('#demo')
