# Deliberate regression: breaking the token reference

## What I did

On a branch (experiment-break-token-reference) I made two changes. First, I pointed the Primary role at a typed colour (#0a5f53) instead of the palette alias {ref.primary.40}. Second, I changed the brand colour at the source, ref primary 40, from #0a5f53 to #c0392b. I made both changes in the exported JSON copy and not in Figma, because I did not want to touch my real design file. This is a weaker test than changing the source in Figma. I also changed one line of the HTML so the "Pay now" button used the surface-tint role, which still points at the palette, so the screen would show both a broken role and a working one. I then ran the converter and opened the screen. Screenshot: evidence/11-broken-referencing.png.

## What happened

When I changed the brand colour at the source, the "Pay now" button turned red on its own, because it still pointed at the palette through the surface-tint role. The header stayed teal, because I had pointed Primary at a typed colour, so the screen now shows two different brand colours. Token referencing is the only thing that makes one change reach every place a colour is used, and one role pointing at a typed value breaks that silently, with no error, until somebody looks at the screen.
