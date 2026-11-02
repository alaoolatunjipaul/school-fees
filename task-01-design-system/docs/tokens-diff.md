# Token export: what was missing

## The one-line diff

The first export (all style toggles off) contained my colours but no type scale and none of my shadow styles. I noticed because searching the file for fontFamily returned nothing, and the only "Shadow" hit was Material's black colour role. The second export, with Typography-styles and Effect-styles switched on, added all 15 text styles (all Noto Sans) and the three shadows.

## Files

- evidence/05-tokens-incomplete.json: colours only.
- evidence/06-tokens-complete.json: colours, 15 typography styles and 3 shadows.

## Known inconsistency

The Material "Shadow" colour variable still holds #000000, while my three shadow styles use #0A5F53. The tokens therefore describe shadow colour in two ways. I have not changed the role, because I have not checked what uses it.
