<template>
  <component :is="$props.tag" :style="styleProps" class="l-text-component">
    {{ text }}
  </component>
</template>
<script setup lang='ts'>
import { computed, ref } from 'vue'
import { pick } from 'lodash-es'
import { textDefaultProps, textStylePropNames, transformToComponentProps } from '@/defaultProps';

const defaultProps = transformToComponentProps(textDefaultProps)
const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  },
  ...defaultProps
})
// 创建一个从 props 中选中的属性的对象。
const styleProps = computed(() => pick(props, [textStylePropNames]))
</script>
<style lang='scss' scoped></style>
