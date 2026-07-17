# Fonts

The brand doc specifies two typefaces:

| Role | Brand font | Fallback currently loading |
|---|---|---|
| Display / headings | **Radio Stars** | Orbitron (Google Fonts) |
| Body | **Gabriel Sans** | Jost (Google Fonts) |

The site renders correctly right now on the fallbacks. To switch to the real fonts:

1. Get the licensed `.woff2` files. **Gabriel Sans is a commercial font (Latinotype)** — it needs a webfont licence, which is a different licence from the desktop one the designer used. Check what the brand owner actually bought before shipping it.
2. Drop them in this folder with these exact names:
   - `RadioStars.woff2`
   - `GabrielSans-Regular.woff2`
   - `GabrielSans-Medium.woff2`
   - `GabrielSans-Bold.woff2`
3. Delete the Google Fonts `<link>` block in `index.html`.

That's it — the `@font-face` rules in `src/index.css` already point at these paths, and `tailwind.config.js` already lists them first in the font stack.

**Converting from OTF/TTF:** use `fonttools`:
```bash
pip install fonttools brotli
fonttools ttLib.woff2 compress GabrielSans-Regular.otf
```
