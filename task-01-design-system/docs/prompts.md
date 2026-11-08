# Prompts

## Prompt 1: JSON to CSS conversion

Drafted with Claude's help, then read and edited by me before sending. Sent to OpenCode (Big Pickle).

### Prompt as sent

Read the file task-01-design-system/evidence/06-tokens-complete.json. It is a design tokens export from Figma. Before writing any code, tell me how its colour, typography and shadow entries are structured, and wait for me to confirm.

Then write a Node script at task-01-design-system/scripts/convert-tokens.mjs that reads that JSON and writes task-01-design-system/tokens.css as CSS custom properties on :root.

Rules:

1. Read every value from the JSON. Do not type any hex value, size or font name into the script. If a value is not in the JSON, leave it out and tell me.
2. Colour roles are used on the interface. Primitive colours are not. The collection called "ref" holds primitives, so output them as --ref-* properties and mark them in a comment as internal. Output every role as --color-* (for example "On Primary Container" becomes --color-on-primary-container). A role whose value is an alias such as {ref.primary.40} must become var(--ref-primary-40), never a copied hex.
3. Convert 8-digit hex colours to rgba() so older Android browsers handle them.
4. Each shadow has separate offsetX, offsetY, blur, spread and colour. Combine them into one valid box-shadow value for --shadow-soft, --shadow-medium and --shadow-hard.
5. For each of the 15 text styles, output font-family, font-weight, font-size, line-height and letter-spacing as custom properties. Use rem for sizes, assuming a 16px base, and say so in a comment.
6. Do not edit the JSON file. Do not run git commands. Do not create any file except the script and tokens.css.
7. After running it, print how many properties were written, and list anything that could not be converted and every assumption you made. If something is ambiguous, stop and ask me instead of guessing.

Sent: 2026-11-02 06:12

Correction to Attempt 0: the malformed command did create an empty folder called scriptsdir inside task-01-design-system. I found it with dir and removed it.
