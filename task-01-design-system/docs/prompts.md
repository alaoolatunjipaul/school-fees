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

## Agent response 1 (its questions)

Note: the opening of this reply was not captured. What I saved starts at the shadow explanation.

Each $value is an array with one shadow object containing inset (all false), color (8-digit hex), and offsetX/offsetY/blur/spread as {value, unit:px}. I'll join them as Xpx Ypx Bpx Spx rgba(...) → --shadow-soft, --shadow-medium, --shadow-hard (3 properties).

Ambiguities I need you to confirm

1. Typography naming — I propose --text-display-large-font-family, --text-display-large-font-size, etc. OK?
2. % in names — Surface Tint 5% → --color-surface-tint-5 (drop the %) or --color-surface-tint-5pct? Which?
3. rem scope — should letter-spacing also be converted to rem (e.g. 0.4px → 0.025rem), or kept in px/em? And line-height as rem (yes, per "use rem for sizes")?
4. Extended Colors casing — treat as roles → --color-success, --color-on-success, --color-success-container, etc. Confirm.
5. alpha rounding — round rgba() alpha to 3 decimals and trim trailing zeros (e.g. 0.2, 0.239, 0.051). OK?
6. Omitted typography fields — fine to leave out fontStyle, paragraphSpacing, paragraphIndent, textDecoration, textCase?

Expected total properties: 1 ref + 62 roles + 75 typography + 3 shadows = 141 (pending your answers to the above).

Waiting for your confirmation before writing anything.

## My answers to the agent

Drafted with Claude's help, then sent by me. Check this matches what was actually sent.

1. Yes, use that naming.
2. Use --color-surface-tint-5pct, and the same pattern for 8, 11, 12 and 14.
3. Keep font sizes in rem. For letter-spacing use em, worked out as the px value divided by that style's font size. For line-height use a plain ratio, worked out as line height divided by font size. Calculate both from the JSON. Add a comment saying why.
4. Yes, treat Extended Colors as roles.
5. Yes, round alpha to 3 decimals.
6. Yes, leave those fields out, but tell me if any of them has a value that is not the default.
Now write the script and tokens.css, and tell me the property count.

## Agent response 2 (after writing the script)

Note: the opening of this reply was also not captured.

Each $value is an array with one shadow object containing inset (all false), color (8-digit hex), and offsetX/offsetY/blur/spread as {value, unit:px}. I'll join them as Xpx Ypx Bpx Spx rgba(...) → --shadow-soft, --shadow-medium, --shadow-hard (3 properties).

Could not be converted: none.

Non-default values in omitted typography fields: none — fontStyle was always normal, textDecoration always NONE, textCase always ORIGINAL, and paragraphSpacing/paragraphIndent always 0.

Assumptions:

- Font sizes converted to rem assuming a 16px root.
- Line-height emitted as a unitless ratio (lineHeight / fontSize).
- Letter-spacing emitted in em (letterSpacing / fontSize).
- 8-digit hex → rgba(); 6-digit left as hex.
- rgba() alpha rounded to 3 decimals.
- Converted decimals rounded to 5 places.
- ref emitted as --ref-*, marked internal.
- Omitted typography fields per your rule.
- Font families with spaces are quoted.

Primary and Surface Tint correctly resolve to var(--ref-primary-40), not copied hex.

(Build, Big Pickle, 2m 2s)

## What I changed from my original prompt

For letter-spacing and line-height I replaced "use rem for sizes" with em and a unitless ratio, so responsive type keeps the 2% tracking. The ratios came out slightly off 1.4, 1.5 and 1.6 because the token export rounds line heights to whole pixels (see defects.md).

## Attempt 0 (mistake, made before Prompt 1 was sent)

I opened OpenCode and pasted two PowerShell commands (mkdir task-01-design-system\scripts and dir task-01-design-system\docs) into the agent instead of the prompt. The agent combined them into a malformed command, created an empty folder called scriptsdir inside task-01-design-system, and the tool run was aborted. I found the folder with dir and removed it. git status afterwards showed no other changes.
