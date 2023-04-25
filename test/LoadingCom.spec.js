import { mount } from '@vue/test-utils'
import Loading from '@/components/LoadingCom.vue'

describe('LoadingCom', () => {
  test('is a Function Component', () => {
    const wrapper = mount(Loading)
    expect(wrapper.isFunctionalComponent).toBeTruthy()
  })
})
