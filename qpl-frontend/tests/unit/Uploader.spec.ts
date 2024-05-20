import { beforeAll, describe, it } from "vitest"
import { VueWrapper, mount, shallowMount } from "@vue/test-utils"
import LibUploader from "@/components/LibUploader.vue"

let warpper: VueWrapper<any>
describe('uploader Compnnent', () => {
  beforeAll(() => {
    warpper = shallowMount(LibUploader, {
      props: {
        action: 'test.url'
      }
    })
  })

  it('basic layout before uploading', () => {

  })
})