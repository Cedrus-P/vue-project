<script>
export default {
	data() {
		return {
			modelOpen: true
		}
	},
	setup() {
		return {}
	}
}
</script>
<template>
	<div>
		<button @click="modelOpen = true">弹出一个模态窗口</button>
		<teleport to="body">
			<div v-if="modelOpen" class="model">
				<div>
					这是一个弹窗 父元素是body
					<button @click="modelOpen = false">close</button>
				</div>
			</div>
		</teleport>
	</div>
</template>

<style scoped>
.model {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.model div {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: white;
	width: 300px;
	height: 300px;
	padding: 5px;
}
</style>
