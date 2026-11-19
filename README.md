# School fees portal for a private primary school in Surulere

A fee and payment portal for a private primary school in Surulere, Lagos, where a parent can see what they owe, pay in part or in full from a phone, and see straight away that the school received it.

This repository holds five assessment tasks in five folders (one repository, five top-level folders).

## Status

- Task 1, design system: finished except the written interview answers (docs/interview-answers.md, not started).
- Tasks 2 to 5: not started. There is no running application, no database, no login and no payment code yet. The only screens are two static HTML files in task-01-design-system.

## The stack, and why

- Figma with the Material Theme Builder plugin: the plugin generates a Material 3 palette and type scale from one source colour, which is the system the task specifies. I changed its output by hand where it did not serve my parents (see task-01-design-system/docs/divergences.md).
- TokensBrucke (Figma plugin): exports variables, typography and shadow styles as design-token JSON. I chose it because the first export, with its style toggles off, showed exactly what an incomplete export looks like.
- A Node script (task-01-design-system/scripts/convert-tokens.mjs): turns the JSON into CSS custom properties. A script means a change at the source reaches the CSS by running one command.
- OpenCode with the Big Pickle model: wrote the converter and the second screen from prompts I saved in docs/prompts.md.
- Git and GitHub: every step is committed, and the history is part of the evidence.

## Getting started

You need Git and Node. I used Node v26.7.0. CHECK: confirm an older Node version works if you want to claim one.

1. `git clone https://github.com/alaoolatunjipaul/school-fees.git`
2. `cd school-fees`
3. Regenerate the CSS from the token export: `node task-01-design-system/scripts/convert-tokens.mjs`
4. Open `task-01-design-system/screen-with-system.html` in a browser (double-click it). CHECK: the file asks for Noto Sans from the web, so open it with an internet connection.

Step 3 is optional, because tokens.css is already committed.

## Environment variables

None are used yet. The file .env.example lists DATABASE_URL and PAYSTACK_SECRET_KEY as names with no values, because later tasks will need them. CHECK: delete PAYSTACK_SECRET_KEY from .env.example if you do not use Paystack in this project, because the readme must match the code.

## What this deliberately does not do

- No application yet. Task 1 is the design system only.
- No dark theme. The Figma variables have a light column only, and my parents pay in daylight on a phone. I have not tested a dark theme with any parent.
- No spacing, radius or icon tokens. The agent reported these as gaps, and I have not filled them.

## Known defects

Full list with reasons in task-01-design-system/docs/defects.md. The main ones:

- tokens.css lines 9 and 10: only Primary and Surface Tint point at the palette. Every other colour role is a typed value, so a rebrand would reach two roles and miss the rest.
- tokens.css lines 66 to 70: the five surface-tint overlays hold typed colour numbers.
- tokens.css lines for the three shadow tokens: they hold the teal as numbers, so a change at the source does not reach them.
- evidence/06-tokens-complete.json: the export rounds line heights to whole pixels, so six styles drift from the 1.4, 1.5 or 1.6 I chose.
