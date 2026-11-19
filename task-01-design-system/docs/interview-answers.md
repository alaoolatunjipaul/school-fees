# Interview answers

## Q10: Why is your display large line height that number and not one step either side?

I used 1.4 for display large because large text needs proportionally less line spacing than body text. A heading is a few words over two or three lines, so the eye does not have to travel back from the end of a long line, which is what extra spacing helps with. 1.4 is also the tightest value my brief allows, so it keeps the heading compact. At 57px that gives 79.8px. One step up, 1.5, would be 85.5px, and 1.6 would be 91.2px. On a small phone a display heading wraps onto several lines, so every extra pixel of line height pushes the amount owed further down the screen, and the amount is what the parent came for. A looser value would also make the lines of a big heading look like separate pieces. One honest note: the token export rounded 79.8 to 80, so my CSS holds 1.40351 and not exactly 1.4. I have not tested these values on a real phone.
