import { useMemo } from "react";

export const useCuttedText = (text, maxChars) => {
  return useMemo(() => {
    const trimmed = text.trim();
    return trimmed.length > maxChars
      ? trimmed.slice(0, maxChars) + " …"
      : trimmed;
  }, [text, maxChars]);
};
