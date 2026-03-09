import { useEffect } from "react";

const useInfiniteScroll = (
  loaderRef,
  status,
  initFirstPageFunc,
  loadNextPageFunc,
) => {
  useEffect(() => {
    initFirstPageFunc();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status !== "loading") {
          loadNextPageFunc();
        }
      },
      { threshold: 1 },
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [loaderRef, status, loadNextPageFunc]);
};

export default useInfiniteScroll;
