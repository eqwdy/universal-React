export default function isEqualField(oldVal, newVal) {
  if (newVal === null || newVal === undefined) return true;

  if (typeof oldVal === "string" && typeof newVal === "string") {
    return oldVal.trim() === newVal.trim();
  }

  if (typeof oldVal === "number") {
    return oldVal === Number(newVal);
  }

  if (Array.isArray(oldVal) && Array.isArray(newVal)) {
    if (oldVal.length !== newVal.length) return false;
    return oldVal.every((v, i) => v === newVal[i]);
  }

  return oldVal === newVal;
}
