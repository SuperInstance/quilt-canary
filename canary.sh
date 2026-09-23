#!/usr/bin/env bash
# FNV-1a 64-bit canary — Bash (via Python bridge).
python3 -c "
s = 'café Δ 日本語'
h = 0xcbf29ce484222325
for b in s.encode('utf-8'):
    h = h ^ b
    h = (h * 0x100000001b3) & 0xffffffffffffffff
print(f'0x{h:016x}')
"
