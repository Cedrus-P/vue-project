<script>
import {
	reactive,
	computed,
	onMounted,
	onUnmounted,
	ref,
	toRef,
	toRefs,
	watch
} from 'vue'
import ModelButton from './components/ModelButton.vue'
import Emits from './components/Emits.vue'
import Emits1 from './components/Emits.vue'
import VmodelTest from './components/VmodelTest.vue'

export default {
	components: {
    ModelButton,
    Emits,
    Emits1,
    VmodelTest
},
	props: {
		msg: String
	},
	methods: {
		onClick() {
			console.log('click me')
		}
	},
	setup() {
		const { counter, doubleCounter } = useCounter()

		// 使用元素引用
		const desc = ref(null)

		// 侦听器
		watch(counter, (val, oldValue) => {
			const p = desc.value
			p.textContent = `counter change from ${oldValue} to ${val}`
		})

		const msg2 = ref('some message')
		return { counter, doubleCounter, msg2, desc }
	}
}
function useCounter() {
	const data = reactive({
		counter: 1,
		doubleCounter: computed(() => data.counter * 2)
	})
	let timer

	onMounted(() => {
		setInterval(() => {
			data.counter++
		}, 1000)
	})
	onUnmounted(() => {
		clearInterval(timer)
	})
	//
	return toRefs(data)
}
</script>

<template>
	<header></header>

	<main>
		<!-- 第一课 -->
		<p ref="desc"></p>
		<p>{{ doubleCounter }}</p>
		<p>{{ counter }}</p>
		<!-- <p>{{ msg2 }}</p> -->

		<!-- composition -->
		<!-- <Composition></Composition> -->

		<!-- Teleport: ModalButton -->
		<ModelButton></ModelButton>

		<!-- Emits -->
		<Emits @my-click="onClick"></Emits>

		<!-- 实例方法定义组件 -->
		<comp></comp>

		<!-- v-model 的使用 -->
		<VmodelTest></VmodelTest>
</main>
</template>

<style>
@import './assets/base.css';

#app {
	max-width: 1280px;
	margin: 0 auto;
	padding: 2rem;
	font-weight: normal;
}

header {
	line-height: 1.5;
}
</style>
