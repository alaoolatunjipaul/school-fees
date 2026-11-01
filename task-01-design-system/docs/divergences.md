# Divergences from the Material baseline

## 1. Font family: Noto Sans instead of the plugin default

- **Default:** Roboto for body and label styles, and the plugin box I could reach offered Noto Sans only for display, headline and title.
- **Chosen:** Noto Sans for all 15 styles, so the app loads one family.
- **Why:** One family means one download for a parent whose data bundle runs low. Noto Sans also covers the marked letters in Yoruba names, and the naira sign displayed correctly when I tested it in Figma.
- **Where it fails:** If a parent's data is almost gone, any web font costs bytes that a system font would not. I have not measured Noto Sans's file size, so I cannot say how much. It is also a neutral, generic face, so it does little to set this product apart.

## 2. Display large letter spacing: -1.14px instead of -0.25px

- **Default:** -0.25px.
- **Chosen:** -1.14px, which is 2% of the 57px size.
- **Why:** The brief says compact spacing helps people scan. I tried it and could barely tell the difference from the default, because the change from the default is only 0.89px, about 1.6% of a 57px letter. I kept it as a mild nudge and not a visible improvement.
- **Where it fails:** Tighter spacing hurts readers with low vision or dyslexia, who often need looser letters. On a very narrow phone, long words in a heading could also crowd.

