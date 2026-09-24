# The Canary

## The string

```
"café Δ 日本語"
```

This is the canary string. It is the input to FNV-1a 64-bit. It is
the witness of polyformalism.

## Why this string

The string mixes four scripts and a whitespace character:

| Char | UTF-8 bytes | Script |
|---|---|---|
| `c` | `0x63` | ASCII |
| `a` | `0x61` | ASCII |
| `f` | `0x66` | ASCII |
| `é` | `0xc3 0xa9` | Latin-1 |
| ` ` | `0x20` | Space |
| `Δ` | `0xce 0x94` | Greek |
| ` ` | `0x20` | Space |
| `日` | `0xe6 0x97 0xa5` | CJK |
| `本` | `0xe6 0x9c 0xac` | CJK |
| `語` | `0xe8 0xaa 0x9e` | CJK |

Total: 16 UTF-8 bytes.

## The hash

```
fnv1a_64("café Δ 日本語") = 0x024a555471370b18d
                          = 2,640,610,520,279,855,501 decimal
```

## Why not a simpler string?

A pure-ASCII string would test nothing. The canary string tests:

1. **UTF-8 round-trip** — encoding ASCII + Latin-1 + Greek + CJK
2. **Multi-byte characters** — 2-byte and 3-byte sequences
3. **Whitespace preservation** — the spaces between scripts
4. **Endianness-independent** — byte-by-byte iteration, not char-by-char

A simpler string (e.g., "hello") would not catch:
- Naive byte/character confusion
- Whitespace stripping
- UTF-8 BOM handling errors
- Locale-dependent encoding

## Why this exact composition

The string is multilingual:

- `café` — French/Italian/Spanish (the letter é)
- `Δ` — Greek capital delta (U+0394)
- `日本語` — Japanese (literally "Japanese language")

The string is not about any one language. The string carries multiple
traditions without preferring any.

## The test sequence

A polyformalism port passes the canary test if:

```
fnv1a_64("café Δ 日本語") == 0x024a555471370b18d
```

All ports must agree byte-exactly. If any port produces a different hash,
the polyformalism doctrine is broken.

## The witness

The canary is the witness of polyformalism. It is the smallest possible
statement of "same algorithm, many languages, byte-exact."

## License

MIT — Casey / SuperInstance, Sept 22-23, 2026
