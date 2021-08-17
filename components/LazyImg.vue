<template>
  <figure v-lazyload class="image__wrapper">
    <!-- loading -->
    <div class="image__spinner">
      <loading class="loading" />
    </div>
    <!-- image -->
    <img :data-url="src" :style="{'border-radius': `${radiusT}px ${radiusT}px 0 0`}" class="flag image__item" alt="" />
  </figure>
</template>

<script>
import {lazyImage} from '@/plugin/directive';

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    radiusT: {
      type: Number,
      default:0
    }
  },
  directives: {
    lazyload: lazyImage,
  },
};
</script>

<style lang="scss" scoped>

.image {
  &__wrapper {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    .image__spinner {
      height: 160px;
      width: 100%;
      .loading {
        position: absolute;
        top: 50px;
        left: calc(50% - 20px);
      }
    }
    &.loaded {
      .image {
        &__item {
          visibility: visible;
          opacity: 1;
          border: 0;
          width: 100%;
          background-size: cover;
          object-fit: cover;
          background-repeat: no-repeat;
          background-position: center;
          aspect-ratio: 4/3;
        }

        &__spinner {
          display: none;
          width: 100%;
        }
      }
    }
  }

  &__item {
    width: 100%;
    transition: all 0.4s ease-in-out;
    opacity: 0;
    visibility: hidden;
  }
}
</style>