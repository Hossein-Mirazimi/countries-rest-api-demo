<template>
  <figure ref="figureEl" class="image__wrapper">
    <!-- loading -->
    <div class="image__spinner">
      <loading class="loading" />
    </div>
    <!-- image -->
    <img :data-url="src" :style="{'border-radius': `${radiusT}px ${radiusT}px 0 0`}" class="flag image__item" alt="" />
  </figure>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
  src: string;
  radiusT?: number;
}>(), { radiusT: 0 })

const figureEl = ref<HTMLElement>()

onMounted(() => {
  const el = figureEl.value!;
  function loadImage() {
      const imageElement = Array.from(el.children).find(
        // @ts-ignore
        (el) => el.nodeName === "IMG"
        );

        if (imageElement) {
        // @ts-ignore
        imageElement.addEventListener("load", () => {
          setTimeout(() => el.classList.add("loaded"), 100);
        });
        // @ts-ignore
        // imageElement.addEventListener("error", () => console.error("error"));
        // @ts-ignore
        imageElement.src = imageElement.dataset.url;
      }
    }

    // @ts-ignore
    function handleIntersect(entries, observer) {
      // @ts-ignore
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // do
        } else {
          loadImage();
          observer.unobserve(el);
        }
      });
    }

    function createObserver() {
      const options = {
        // circumstances under which the observer's callback is invoked
        root: null, // defaults to the browser viewport if not specified or if null
        threshold: "0", // the degree of intersection between the target element and its root (0 - 1)
        // threshold of 1.0 means that when 100% of the target is visible within
        // the element specified by the root option, the callback is invoked
      };

      // Whether you're using the viewport or some other element as the root,the API works the same way,
      // executing a callback function you provide whenever the visibility of the target element changes
      // so that it crosses desired amounts of intersection with the root

      // @ts-ignore
      const observer = new IntersectionObserver(handleIntersect, options);

      observer.observe(el); // target element to watch
    }

    if (!window.IntersectionObserver) {
      loadImage();
    } else {
      createObserver();
    }
})
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
