# quilt-canary

> **The canary as a Quilt cell.**
> Single-purpose byte-exact verification of FNV-1a 64-bit.

## What this is

A canary is a small, portable, reproducible artifact. Its job is to verify
that two systems agree on a single computation. The canary is *the
smallest possible canon*.

This repo is the smallest polyformalism port. It contains:

1. **The algorithm** — FNV-1a 64-bit in 2 lines
2. **The canary string** — `"café Δ 日本語"` (16 UTF-8 bytes)
3. **The canary hash** — `0x024a555471370b18d` (the witness)

That's it. No framework, no abstractions, no build system.

## The algorithm

```
hash = 0xcbf29ce484222325 (offset)
for byte b in input:
    hash = hash XOR b
    hash = (hash * 0x100000001b3) mod 2^64
return hash
```

In Python:

```python
def fnv1a_64(s: str) -> int:
    h = 0xcbf29ce484222325
    for b in s.encode("utf-8"):
        h = h ^ b
        h = (h * 0x100000001b3) & 0xffffffffffffffff
    return h
```

## The canary string

```
"café Δ 日本語"
```

This string mixes ASCII, Latin-1, Greek, and CJK in 16 UTF-8 bytes.
See [CANARY.md](CANARY.md) for the rationale.

## The canary hash

```
fnv1a_64("café Δ 日本語") = 0x024a555471370b18d
                          = 2,640,610,520,279,855,501 decimal
```

## Quick start

Pick your language and verify:

```bash
# Python
python3 canary.py

# TypeScript
npx tsx canary.ts

# Rust
cargo run --release

# C#
dotnet run

# Bash (via Python bridge)
bash canary.sh
```

Expected output (any port):
```
0x024a555471370b18d
```

## Polyformalism ports

| Language | File | Lines |
|---|---|---|
| Python | [canary.py](canary.py) | 12 |
| TypeScript | [canary.ts](canary.ts) | 18 |
| Rust | [src/main.rs](src/main.rs) | 18 |
| C# | [Program.cs](Program.cs) | 22 |
| Bash | [canary.sh](canary.sh) | 6 |

All ports produce `0x024a555471370b18d` byte-exactly.

## Why this repo exists

This is the *minimum polyformalism artifact* in the Quilt canon. It's a
witness for the doctrine that:

> Same algorithm. Many languages. Same result. Byte-exact.

The canary is the smallest possible statement of the polyformalism doctrine.

## Layered navigation

| Layer | Where |
|---|---|
| **CANON.md** | [CANON.md](CANON.md) — what this repo is, in 24 lines |
| **README** | [README.md](README.md) — quick start, navigation |
| **Algorithm** | [ALGORITHM.md](ALGORITHM.md) — FNV-1a 64-bit explained |
| **Ports** | [PORTS.md](PORTS.md) — per-port reference |
| **Canary** | [CANARY.md](CANARY.md) — the canary string & hash |

## License

MIT — Casey / SuperInstance, Sept 22-23, 2026
