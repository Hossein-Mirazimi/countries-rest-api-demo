<script>
export default {
  props: {
    modelValue: {
      type: String,
      require: true,
      default: null,
    },
  },
  emits: ['update:model-value'],
  computed: {
    searchInput: {
      get() {
        return this.modelValue || ''
      },
      set(value) {
        this.$emit('update:model-value', value)
      },
    },
  },
  methods: {
    focusInput() {
      this.$nextTick(() => this.$refs.searchInput.focus())
    },
  },
}
</script>

<template>
  <div class="primary-background search-input" @click="focusInput">
    <!-- prefix -->
    <Icon name="fa:search" class="search-icon prefix cursor-pointer" />

    <input ref="searchInput" v-model.lazy="searchInput" type="text" placeholder="Search for a country...">
  </div>
</template>

<style scoped lang="scss">
.search-input {
  padding-left: 1em;
  width: 100%;
  height: 47px;
  position: relative;
  padding-left: 60px;

  // prefix
  .search-icon {
    font-size: 16px;
    position: absolute;
    left: 1.7rem;
    top: calc(50% - 8px);
  }
  input {
    width: 100%;
    height: 100%;
    outline: none;
    padding-left: 7px;
    background-color: transparent;
    border: none;
  }
}
</style>
