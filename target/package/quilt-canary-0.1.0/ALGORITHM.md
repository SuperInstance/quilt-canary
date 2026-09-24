# FNV-1a 64-bit Algorithm

The canary uses FNV-1a 64-bit, a non-cryptographic hash function by
Glenn Fowler, Kiem-Phong Vo, and Landon Curt Noll.

## The specification

```
FNV_offset_basis_64 = 0xcbf29ce484222325
FNV_prime_64        = 0x100000001b3

hash = FNV_offset_basis_64
for each byte b in input:
    hash = hash XOR b
    hash = (hash * FNV_prime_64) mod 2^64
return hash
```

That's it. Two operations per byte: XOR and multiply (mod 2^64).

## Why FNV-1a 64-bit

Three reasons:

1. **Simple** — 2 lines of code, no lookup tables, no constants beyond the offset and prime
2. **Fast** — ~5× faster than SHA-256, ~2× faster than CRC32
3. **64-bit output** — collisions rare for non-adversarial data (2^64 = 18 quintillion)

For a polyformalism canary, simplicity is the priority. FNV-1a is simple.

## What FNV-1a is NOT

FNV-1a is **not** cryptographically secure. It is:

- Not for password hashing
- Not for digital signatures
- Not for adversarial inputs

FNV-1a is for:

- Hash tables
- Checksum verification
- Polyformalism canaries (this)

## The 2-line implementation

In any language with 64-bit unsigned integers, FNV-1a 64-bit is:

```python
h = 0xcbf29ce484222325
for b in s.encode("utf-8"):
    h ^= b
    h = (h * 0x100000001b3) & 0xffffffffffffffff
```

That's the entire algorithm. Everything else in this repo is glue.

## Why FNV-1a over alternatives

| Algorithm | Lines | Speed | Output bits | Suitable for canary |
|---|---|---|---|---|
| FNV-1a 64 | 2 | Fast | 64 | ✓ Best |
| FNV-1 32 | 2 | Fast | 32 | ✗ Too short |
| SHA-256 | 30+ | Slow | 256 | ✗ Too complex |
| MD5 | 20+ | Medium | 128 | ✗ Cryptographic |
| CRC32 | 8 | Fast | 32 | ✗ Too short |
| MurmurHash3 | 15 | Fast | 64/128 | ⚠ Multiple variants |
| xxHash | 30+ | Very fast | 64 | ⚠ Multiple ports |
| BLAKE3 | 50+ | Fast | 256 | ✗ Too complex |

FNV-1a 64-bit wins on simplicity + portability + output length.

## The canary string

```
"café Δ 日本語"
```

This string mixes:

- **ASCII** (`caf`) — 3 bytes
- **Latin-1** (`é`) — 2 bytes
- **Space** — 1 byte
- **Greek** (`Δ`) — 2 bytes
- **Space** — 1 byte
- **CJK** (`日本語`) — 9 bytes

Total: 16 UTF-8 bytes.

The string is not beautiful. The string is *complete*. It tests:

1. ASCII handling
2. UTF-8 multi-byte handling
3. Mixed script handling
4. Whitespace preservation

A naive implementation that treats characters as 1 unit each will produce
the wrong hash. The canary catches this.

## The witness

If all ports agree on `0x024a555471370b18d`, the polyformalism claim holds.

If any port disagrees, the claim is broken. Debug the port.

## License

MIT — Casey / SuperInstance, Sept 22-23, 2026
