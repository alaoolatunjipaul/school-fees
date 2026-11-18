# Defects

## 1. Line heights are rounded to whole pixels by the token export

- **Where:** evidence/06-tokens-complete.json line 532 (display large lineHeight is 80), and tokens.css lines 76, 86, 91, 96, 101, 121, 126 and 131.
- **What happens:** Figma holds 79.8, 50.4, 44.8, 39.2, 33.6, 22.4, 19.2 and 17.6, but TokensBrucke exports whole pixels. The converter then divides by font size, so six styles come out as 1.38889 to 1.63636 and not the 1.4 or 1.6 I chose. Nine styles are exact.
- **Cost:** about 2% at worst (label small, 1.636 against 1.6), which is under a pixel on a phone. It also means tokens.css and type-scale.md disagree, so the CSS no longer follows my stated multiplier rule exactly.
- **Not fixed because:** rounding ratios back to 1.4, 1.5 or 1.6 in the script would put a design rule in the script instead of reading the JSON.

## 2. Only two colour roles follow the palette

- **Where:** tokens.css, the --color-* lines. 60 hold a typed value (hex or rgba) and only 2 are references to the palette, at lines 9, 10. In the source file, evidence/06-tokens-complete.json, every other role is a plain hex.
- **What happens:** a change to ref primary 40 reaches Primary and Surface Tint and nothing else. docs/regression.md shows it on screen: the button followed the change and the header did not.
- **Cost:** a rebrand would reach two roles and silently miss the rest, with no error. In production that is a half-rebranded product that nobody notices until someone looks at it.
- **Not fixed because:** aliasing every role needs a full tonal palette in the ref collection, which is more work than this task covered.

## 3. The five surface-tint overlays hold a typed colour

- **Where:** tokens.css lines 66, 67, 68, 69, 70 (the --color-surface-tint-*pct properties, from the Surfaces group in Figma).
- **What happens:** they carry the brand colour as typed numbers with an opacity, not as a reference to ref primary 40.
- **Cost:** after a rebrand, elevated surfaces would keep the old tint while the Surface Tint role changed, so two teals would sit on the same screen.
- **Not fixed because:** I aliased only Primary and Surface Tint, enough to demonstrate the failure.

## 4. Material's shadow colour role is still black

- **Where:** tokens.css line 34 (--color-shadow), with the value #000000 in evidence/06-tokens-complete.json.
- **What happens:** my three shadow styles use my brand colour, while the shadow role says black, so the system states shadow colour two ways.
- **Cost:** a developer who reaches for the role instead of the three shadow tokens gets a grey shadow that clashes with the rest. In docs/shadows.md the black one looked greyer and heavier next to the brand-coloured one.
- **Not fixed because:** I have not checked what uses the role, and changing it blind could change something I cannot see.

## 5. The three shadow tokens hold their colour as numbers

- **Where:** tokens.css lines 150, 151, 152 (--shadow-soft, --shadow-medium, --shadow-hard), each an rgba value for the teal.
- **What happens:** they are not tied to ref primary 40, so by construction a change at the source does not reach them. I did not take a separate screenshot to prove this.
- **Cost:** after a rebrand the card shadows would keep the old teal tint.
- **Not fixed because:** the export writes shadows as separate numbers, and referencing the colour inside them needs a different structure than I built.
