// tests/unit/ExampleComponent.spec.js
import { mount } from '@vue/test-utils';
import ExampleComponent from '@/components/ExampleComponent.vue';
import { test, expect } from 'vitest';

test('renders correctly', () => {
  // 获取渲染组件
  const wrapper = mount(ExampleComponent);
  // 元素是否成功显示
  expect(wrapper.get('h1').text()).toContain('期望的文本');
});

test('should update the count when clicking the button', async () => {
  // 获取渲染组件
  const wrapper = mount(ExampleComponent);
  // 事件触发测试
  // wrapper.get('button').trigger('click')
})
