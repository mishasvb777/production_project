//хук с помощью которого можно будет использовать возможность intersection api

import { MutableRefObject, useEffect, useRef } from "react";

export interface UseInfiniteScrollOptions {
  callback?: () => void; // колбек который будет вызываться когда мы пересекли тот или иной элемент
  triggerRef: MutableRefObject<HTMLElement>; // это будет ссылка на элемент, при пересечении которого будет тригерится(вызываться) наша функция callback
  wrapperRef: MutableRefObject<HTMLElement>; // врапер где у нас будет находится элемент triiggerRef
}

export function useInfiniteScroll({callback, wrapperRef, triggerRef}: UseInfiniteScrollOptions) {
  const observer = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;

    if (callback) {
        const options = {
            root: wrapperElement,
            rootMargin: '0px',
            threshold: 1.0,
        };

        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback();
            }
        }, options);

        observer.current.observe(triggerElement);
    }

    return () => {
        if (observer.current && triggerElement) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.current.unobserve(triggerElement);
        }
    };
}, [callback, triggerRef, wrapperRef]);

}