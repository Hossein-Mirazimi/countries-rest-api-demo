<template>
  <div ref="container">
      <slot v-for="(item, index) in localItems" :key="itemsKey ? item[itemsKey] : (item?.key || index)" :item="item" :index="index" />
  </div>
</template>

<script lang="ts" setup>

interface IProps {
  items: Array<unknown>;
  itemsKey?: string;
  throttleDelay?: number;
  disabled?: boolean;
  delay?: number;
  // px to the end of the list
  threshold?: number;
  chunkCount?: number;
  // eslint-disable-next-line vue/require-default-prop
  onEnd?: () => void | Promise<void>;
}

const props = withDefaults(defineProps<IProps>(), {
  throttleDelay: 700,
  itemsKey: '',
  chunkCount: 10,
  delay: 800,
  threshold: 200,
});

const CHUNK_COUNT = props.chunkCount;
const container = ref<Element | null>(null);
const slice = ref(0);

let _loading = false;
watch(() => props.items, () => {
  if (_loading) return;
  slice.value = CHUNK_COUNT;
}, { immediate: true });

const localItems = computed(() => props.items.slice(0, slice.value));
if (typeof window !== 'undefined') {
  useEventListener(window, 'scroll', throttle(() => {
    console.log('listen');
      if (
          !props.disabled
              && container.value
              && container.value.getBoundingClientRect().bottom < window.innerHeight + props.threshold
      ) {
          appendChunkItems(CHUNK_COUNT);
      }
  }, props.throttleDelay));
}

function appendChunkItems (count?: number) {
  if (props.items.length && localItems.value.length < props.items.length) {
      slice.value += count ?? CHUNK_COUNT;
  } else if (props.onEnd && !_loading) {
      _loading = true;
      Promise.resolve(props.onEnd()).finally(() => {
          slice.value += count ?? CHUNK_COUNT;
          setTimeout(() => {
              _loading = false;
          }, props.delay);
      });
  }
}
defineExpose({ appendChunkItems });
</script>
