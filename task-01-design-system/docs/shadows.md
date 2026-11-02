# Shadows

Three shadows built from the primary colour #0A5F53, not from black. Values read from my own Figma file.

| Shadow | X | Y | Blur | Spread | Opacity | Colour |
|---|---|---|---|---|---|---|
| soft | 0 | 1 | 3 | 0 | 20% | #0A5F53 |
| medium | 0 | 4 | 12 | 0 | 24% | #0A5F53 |
| hard | 0 | 8 | 24 | 0 | 32% | #0A5F53 |

## How they were chosen

I started from 12%, 16% and 24% opacity. On the pale page surface (#F5FBF7) the soft shadow at 12% was barely visible, so I raised it to 20% and then raised medium and hard so the three still step up. The hard shadow first had a blur of 3 by mistake, which gave a solid band along the bottom edge. I set the blur to 24 so it matches the soft-to-medium progression and suits a calm page.

## Usage

- Soft: cards at rest.
- Medium: raised or hovered cards.
- Hard: dialogs and payment confirmations that float above the page.

## Brand-coloured shadow against black

I compared the medium shadow in #0A5F53 with the same shadow in black (#000000) on the pale surface (#F5FBF7). Screenshot: evidence/06-shadow-teal-vs-black.png.

A shadow built from the brand colour looked softer and blended with the pale green page, while the black one looked greyer and heavier next to it. A real shadow is the surface colour with less light on it, so tinting it with the brand colour keeps it in the same family as the page, and pure black adds a neutral grey that doesn't belong to the palette.
