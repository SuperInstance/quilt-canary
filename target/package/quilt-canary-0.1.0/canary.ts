// FNV-1a 64-bit canary — TypeScript (18 lines).
function fnv1a64(s: string): bigint {
  let h = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;
  const mask = (1n << 64n) - 1n;
  const bytes = new TextEncoder().encode(s);
  for (const b of bytes) {
    h ^= BigInt(b);
    h = (h * prime) & mask;
  }
  return h;
}

console.log("0x" + fnv1a64("café Δ 日本語").toString(16).padStart(16, "0"));
