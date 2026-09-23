// FNV-1a 64-bit canary — C#/.NET 9 (22 lines).
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
