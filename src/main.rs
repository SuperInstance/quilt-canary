// FNV-1a 64-bit canary — Rust (18 lines).
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
