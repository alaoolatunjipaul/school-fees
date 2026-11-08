# Defects

## 1. Line heights are rounded to whole pixels by the token export

- **Where:** evidence/06-tokens-complete.json line 532 (display large lineHeight is 80), and tokens.css lines 76, 86, 91, 96, 101, 121, 126 and 131.
- **What happens:** Figma holds 79.8, 50.4, 44.8, 39.2, 33.6, 22.4, 19.2 and 17.6, but TokensBrucke exports whole pixels. The converter then divides by font size, so six styles come out as 1.38889 to 1.63636 and not the 1.4 or 1.6 I chose. Nine styles are exact.
- **Cost:** about 2% at worst (label small, 1.636 against 1.6), which is under a pixel on a phone. It also means tokens.css and type-scale.md disagree, so the CSS no longer follows my stated multiplier rule exactly.
- **Not fixed because:** rounding ratios back to 1.4, 1.5 or 1.6 in the script would put a design rule in the script instead of reading the JSON.
