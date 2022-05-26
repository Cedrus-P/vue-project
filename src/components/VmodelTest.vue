<script>
import { h } from 'vue'
export default {
	render() {
		const emit = this.$emit
		const onclick = this.onclick
		return h('div', [
			h(
				'div',
				{
					onClick() {
						emit('update:modelValue', 'new value')
					}
				},
				`i am comp, ${this.modelValue}`
			),
			h(
				'button',
				{
					onClick() {
						onclick()
					}
				},
				'buty it!'
			)
		])
	}
}
</script>
<template>
	<div @click="$emit('update:modelValue', modelValue + 1)">{{ counter }}</div>
</template>
<style lang="scss" scoped></style>
