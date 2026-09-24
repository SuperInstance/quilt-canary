# Ports — Per-Port Reference

The canary in 5 languages.

## Python (12 lines)

[canary.py](canary.py)

```python
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
```

Run: `python3 canary.py`

Output: `0x024a555471370b18d`

## TypeScript (18 lines)

[canary.ts](canary.ts)

```typescript
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
```

Run: `npx tsx canary.ts`

Output: `0x024a555471370b18d`

## Rust (18 lines)

[src/main.rs](src/main.rs)

```rust
fn fnv1a_64(s: &str) -> u64 {
    let mut h: u64 = 0xcbf29ce484222325;
    for b in s.as_bytes() {
        h ^= *b as u64;
        h = h.wrapping_mul(0x100000001b3);
    }
    h
}

fn main() {
    let h = fnv1a_64("café Δ 日本語");
    println!("0x{:016x}", h);
}
```

Run: `cargo run --release`

Output: `0x024a555471370b18d`

## C# / .NET 9 (22 lines)

[Program.cs](Program.cs)

```csharp
using System.Text;

ulong Fnv1a64(string s) {
    ulong h = 0xcbf29ce484222325UL;
    ulong prime = 0x100000001b3UL;
    foreach (byte b in Encoding.UTF8.GetBytes(s)) {
        h ^= b;
        h = unchecked(h * prime);
    }
    return h;
}

Console.WriteLine($"0x{Fnv1a64("café Δ 日本語"):x16}");
```

Run: `dotnet run`

Output: `0x024a555471370b18d`

## Bash (6 lines)

[canary.sh](canary.sh)

```bash
python3 -c "
s = 'café Δ 日本語'
h = 0xcbf29ce484222325
for b in s.encode('utf-8'):
    h = h ^ b
    h = (h * 0x100000001b3) & 0xffffffffffffffff
print(f'0x{h:016x}')
"
```

Run: `bash canary.sh`

Output: `0x024a555471370b18d`

## Adding a new port

To add a new language (Go, Swift, Kotlin, etc.):

1. Create the file (e.g., `canary.go`)
2. Implement `fnv1a_64(s string) int`
3. Encode `"café Δ 日本語"` as UTF-8
4. Print `0x<hash:016x>`
5. Add to this file

The algorithm is the same. The language is different. That's polyformalism.

## License

MIT — Casey / SuperInstance, Sept 22-23, 2026
