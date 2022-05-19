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
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

export default {
	components: {
		HelloWorld,
		TheWelcome
	},
	props: {
		msg: String
	},
	setup() {
		const { counter, doubleCounter } = useCounter()

		// 使用元素引用
		const desc = ref(null)

		// 侦听器
		watch(
			counter,
			(val, oldValue) => {
				const p = desc.value
				p.textContent = `counter change from ${oldValue} to ${val}`
			}
		)

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
		<!-- <TheWelcome /> -->
		<p ref="desc"></p>
		<p>{{ doubleCounter }}</p>
		<p>{{ counter }}</p>
		<p>{{ msg2 }}</p>
		
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

.logo {
	display: block;
	margin: 0 auto 2rem;
}

a,
.green {
	text-decoration: none;
	color: hsla(160, 100%, 37%, 1);
	transition: 0.4s;
}

@media (hover: hover) {
	a:hover {
		background-color: hsla(160, 100%, 37%, 0.2);
	}
}

@media (min-width: 1024px) {
	body {
		display: flex;
		place-items: center;
	}

	#app {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 0 2rem;
	}

	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}

	.logo {
		margin: 0 2rem 0 0;
	}
}
</style>
