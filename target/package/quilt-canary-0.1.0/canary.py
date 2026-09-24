"""FNV-1a 64-bit canary — Python (12 lines)."""


def fnv1a_64(s: str) -> int:
    h = 0xcbf29ce484222325
    for b in s.encode("utf-8"):
        h = h ^ b
        h = (h * 0x100000001b3) & 0xffffffffffffffff
    return h


if __name__ == "__main__":
    s = "café Δ 日本語"
    h = fnv1a_64(s)
    print(f"0x{h:016x}")
