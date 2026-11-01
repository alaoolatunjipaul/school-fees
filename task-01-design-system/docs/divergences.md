# Divergences from the Material baseline

## 1. Font family: Noto Sans instead of the plugin default

- **Default:** Roboto for body and label styles, and the plugin box I could reach offered Noto Sans only for display, headline and title.
- **Chosen:** Noto Sans for all 15 styles, so the app loads one family.
- **Why:** One family means one download for a parent whose data bundle runs low. Noto Sans also covers the marked letters in Yoruba names, and the naira sign displayed correctly when I tested it in Figma.
- **Where it fails:** If a parent's data is almost gone, any web font costs bytes that a system font would not. I have not measured Noto Sans's file size, so I cannot say how much. It is also a neutral, generic face, so it does little to set this product apart.

## 2. Display large letter spacing: -1.14px instead of -0.25px

- **Default:** -0.25px.
- **Chosen:** 2% of the font size on all three display styles: -1.14px on large (57px), -0.9px on medium (45px) and -0.72px on small (36px).
- **Why:** The brief says compact spacing helps people scan. On display large I tried it and could barely tell the difference from the default, because the change from the default is only 0.89px, about 1.6% of a 57px letter. I kept it as a mild nudge and not a visible improvement.
- **Where it fails:** Tighter spacing hurts readers with low vision or dyslexia, who often need looser letters. On a very narrow phone, long words in a heading could also crowd.




## 3. Title weight: Medium instead of Regular

- **Default:** Regular. That is what the plugin generated for all three title styles in my file.
- **Chosen:** Medium on title large, medium and small.
- **Why:** Titles label the figures a parent scans for, such as the amount owed and the amount paid. Medium separates them from the Regular body text beneath. Labels already use Medium, so I expect no extra weight to load, though I have not yet checked how the font will be served.
- **Where it fails:** If a title is already prominent from its size and colour, Medium adds weight without helping anyone scan. The page then looks heavier, and the emphasis stops meaning anything.
