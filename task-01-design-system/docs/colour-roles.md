# Colour roles

## Before and after pinning

After pinning, the primary40 swatch is a deeper, richer green than before, and it now sits close to primary30 in darkness, with a bigger jump up to primary50. primary40 went from #1C6A5D, which the plugin generated, to #0A5F53, my brand colour. The plugin's version was lighter and greyer, and mine is more saturated and darker. This matters for a parent because the deeper green reads more clearly against white on a phone in daylight (7.57:1 contrast, against 6.42:1 before), so amounts and buttons are easier to see. The cost is that the steps between tones are now uneven (5.9 from primary30 to primary40, and 14.3 from primary40 to primary50, instead of about 10 each), and primary50 on white is 4.47:1, so it is not used for text.

## Contrast ratios for pairs in use (light theme)

Method: WCAG 2.x relative luminance formula. Surface is #F5FBF7. Spot-checks with a second tool to be added below.

| Pair | Foreground | Background | Ratio | Result |
|---|---|---|---|---|
| Button text | #FFFFFF | #0A5F53 | 7.57:1 | AA, AAA |
| Panel text | #005046 | #9FF2E0 | 7.27:1 | AA, AAA |
| Page text | #171D1B | #F5FBF7 | 16.31:1 | AA, AAA |
| Primary as text or outline | #0A5F53 | #F5FBF7 | 7.22:1 | AA, AAA |
| Error | #BA1A1A | #F5FBF7 | 6.16:1 | AA |
| Success | #446732 | #F5FBF7 | 6.20:1 | AA |
| Warning | #7E570E | #F5FBF7 | 6.15:1 | AA |
| primary-container vs surface | #9FF2E0 | #F5FBF7 | 1.23:1 | Fails. Not used for text, and not used alone to mark a boundary. |

primary50 (#3B8376) on white is 4.47:1, so it is not used for text.

## Spot-check with a second tool

Tool: WebAIM contrast checker, run on 1 Nov 2026. Results agree with the computed ratios above.

| Pair | Normal text AA | Normal text AAA | Large text AAA |
|---|---|---|---|
| #FFFFFF on #0A5F53 | Pass | Pass | Pass |
| #0A5F53 on #F5FBF7 | Pass | Pass | Pass |
| #BA1A1A on #F5FBF7 | Pass | Fail | Pass |

The error pair passes AA but not AAA for normal text, as predicted by 6.16:1.
