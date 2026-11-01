# Type scale

Typeface: Noto Sans for all 15 styles. Values read from my own Figma file.

| Style | Weight | Size | Line height | Letter spacing |
|---|---|---|---|---|
| display large | Regular | 57 | 79.8 | -1.14px |
| display medium | Regular | 45 | 63 | -0.9px |
| display small | Regular | 36 | 50.4 | -0.72px |
| headline large | Regular | 32 | 44.8 | 0px |
| headline medium | Regular | 28 | 39.2 | 0px |
| headline small | Regular | 24 | 33.6 | 0px |
| title large | Medium | 22 | 33 | 0px |
| title medium | Medium | 16 | 24 | 0.15px |
| title small | Medium | 14 | 21 | 0.1px |
| body large | Regular | 16 | 24 | 0.5px |
| body medium | Regular | 14 | 21 | 0.25px |
| body small | Regular | 12 | 18 | 0.4px |
| label large | Medium | 14 | 22.4 | 0.1px |
| label medium | Medium | 12 | 19.2 | 0.5px |
| label small | Medium | 11 | 17.6 | 0.5px |

## Line height multipliers

Every line height is the font size times a multiplier.

- Display and headline use 1.4. Large text needs proportionally less spacing, and 1.4 is the tightest the rule allows.
- Title and body use 1.5. Body is what a parent reads for longest, so it gets the middle value.
- Label uses 1.6. Small text needs proportionally more air, and labels sit on buttons where cramped lines look worse.

## Letter spacing

Display uses 2% of the font size, tightened. Headline stays at 0px. Title, body and label keep the Material baseline spacing, which opens up slightly as text gets smaller.

## Usage rule

Body small (12px) is for secondary notes only. It is never used for amounts or due dates, because parents read those on a moving bus.
