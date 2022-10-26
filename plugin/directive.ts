export const lazyImage = {
  inserted: (el: any) => {
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
  },
};
