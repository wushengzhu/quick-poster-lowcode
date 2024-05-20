import { describe, it, expect } from "vitest";
import store from '../../src/store/index'

// const cloneComponents = clone(testComponents)
// 用于组织和分组相关的测试用例。它提供了一种结构化的方式来表述测试的不同部分
describe('test vuex store', () => {
  // 用来定义一个测试用例（test case）的。它是描述并执行单个测试逻辑的基本构建块
  it('should have three modules', () => {
    expect(store.state).toHaveProperty('user')
    expect(store.state).toHaveProperty('templates')
    expect(store.state).toHaveProperty('editor')
  })
  describe('test user module', () => {
    it('test login mutation', () => {
      store.commit('login')
      // toBeTruthy 检查一个值是否为非假值，非零值，非空值，
      expect(store.state.user.user.isLogin).toBeTruthy()
    })
    it('test logout mutation', () => {
      store.commit('logout')
      // console.log('store.state.user', store.state.user)
      expect(store.state.user.user.isLogin).toBeFalsy()
    })
  })
  // describe('test templates module', () => {
  //   it('should have default templates', () => {
  //     expect(store.state.templates.data).toHaveLength(testData.length)
  //   })
  //   it('should get the correct template by Id', () => {
  //     const selectTemplate = store.getters.getTemplateById(1)
  //     expect(selectTemplate.title).toBe('test title 1')
  //   })
  // })
})