<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: false,
      default: null,
    },
  },
  emits: ['update:model-value'],
  data() {
    return {
      showDropDown: false,
    }
  },
  computed: {
    selected: {
      get() {
        if (this.modelValue) {
          const option = this.options.find(e => e.value === this.modelValue)
          return option.text
        }
        return 'Filter By Region'
      },
      set(value) {
        this.$emit('update:model-value', value.value)
      },
    },
  },
}
</script>

<template>
  <div class="select" @blur="showDropDown = false">
    <div
      class="select-inner primary-background cursor-pointer"
      :class="{ 'open-options': showDropDown }"
      @click="showDropDown = !showDropDown"
    >
      {{ selected }}
      <Icon name="fa:chevron-down" class="suffix-icon" />
    </div>

    <!-- dropdown list -->
    <transition name="drop-down">
      <div v-if="showDropDown" class="options primary-background mt-2">
        <div
          v-for="(option, i) of options"
          :key="i"
          @click="
            selected = option;
            showDropDown = false;
          "
        >
          {{ option.text }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/variable.scss';

.select {
  position: relative;
  width: 100%;
  max-width: 200px;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
  .select-inner {
    padding-left: 1em;

    // arrow
    .suffix-icon {
      position: absolute;
      top: calc(50% - 5px);
      right: 1.5em;
      font-size: 10px;
      transition: $transition;
    }

    // arrow open drop down
    &.open-options .suffix-icon {
      transform: rotate(180deg);
    }
  }

  // options list
  .options {
    border-radius: 5px;
    overflow: hidden;
    padding: 10px 0;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;

    // option item
    div {
      padding-left: 1em;
      cursor: pointer;
      user-select: none;
      &:hover {
        background-color: #00000010;
      }
    }
  }
}

// drop down animation
.drop-down-enter-active,
.drop-down-leave-active {
  transform: translateY(0);
  transition: .2s ease;
}
.drop-down-enter,
.drop-down-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
