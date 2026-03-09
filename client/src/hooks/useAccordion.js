import { useEffect, useState } from "react";

export const useAccordion = (
  openingElRef,
  blockPadding,
  initialState = false,
) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    if (!openingElRef.current) return;

    if (isOpen) {
      openingElRef.current.style.height =
        openingElRef.current.scrollHeight + blockPadding + "px";
    } else {
      openingElRef.current.style.height = "0px";
    }
  }, [isOpen, openingElRef]);

  const toggle = () => setIsOpen((prev) => !prev);

  return [isOpen, toggle];
};
