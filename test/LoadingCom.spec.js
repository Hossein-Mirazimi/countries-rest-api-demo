import { shallowMount } from '@vue/test-utils'
import Loading from '@/components/LoadingCom.vue'

describe('LoadingCom', () => {
  test('is a Function Component', () => {
    const wrapper = shallowMount(Loading)
    expect(wrapper.isFunctionalComponent).toBeTruthy()
  })
})
