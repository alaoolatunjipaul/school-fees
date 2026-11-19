# Task 1: the design system, and proving the agent used it

For a four-minute read. Everything below is backed by a file in this folder.

## What this was

A design system for a fee portal at a private primary school in Surulere, Lagos, built so that an agent has to use it and not invent its own look. The business and the parent it serves are in docs/business-brief.md.

## What I built

- **Colour.** Brand colour #0A5F53, a deep teal that started from the Nigerian flag green and was darkened and shifted for contrast. On white it measures 7.56:1 on WebAIM. Contrast for every role pair in use is in docs/colour-roles.md.
- **Type.** Noto Sans for all 15 styles, chosen for Yoruba marked letters and the naira sign. Line heights are font size times 1.4 (display, headline), 1.5 (title, body) or 1.6 (label). All 15 are in docs/type-scale.md.
- **Shadows.** Three, soft, medium and hard, built from the brand colour and not black (docs/shadows.md).
- **Export and conversion.** The tokens were exported twice, once incomplete and once complete (docs/tokens-diff.md). A script then produced tokens.css with 141 properties.
- **Proof the agent used it.** The same fees screen was built twice. Without the system, a search for raw colours found 34 and none was my brand colour. With tokens.css it found 0 raw colours, 33 colour roles, 46 text properties and 4 shadows.
- **The deliberate regression.** On a branch I pointed Primary at a typed colour and changed the source. The button followed and the header did not (docs/regression.md, evidence/11-broken-referencing.png).

## What I decided

Three divergences from the Material defaults, each with where it would be wrong: the typeface, display letter spacing at 2% of the font size, and Medium weight for titles (docs/divergences.md).

## What I got wrong

- My first pin of the brand colour did not reach the roles. Primary still held #016B5D, and so did five other variables, until I searched for the old value.
- The first token export had no typography and no shadows. I only noticed because a search for fontFamily found nothing.
- I pasted shell commands into the agent by mistake. It made a stray folder, which I removed (docs/prompts.md).
- A script I was given to edit the HTML corrupted the naira sign. The diff caught it before it was committed, and I restored the file.
- The export rounds six line heights, so the CSS does not exactly match my type scale.

## Known defects

See docs/defects.md.
