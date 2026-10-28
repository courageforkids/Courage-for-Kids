# Courage for Kids — brand guidelines

Built from the existing Canva work (Brand Kit, "Our Mission" page, Courage Boxes carousels). Use it for the website, Instagram, flyers, and sponsor decks so everything feels like one organization.

## Voice

**Their fight. Our mission.** Warm, hopeful, kid-first, never pitying. Short sentences. Facts with sources (we cite the Association of Child Life Professionals for educational content). Never exaggerate impact.

## Color

| Token | Hex | Use |
| --- | --- | --- |
| CFK Navy | `#004F81` | Primary brand color, buttons, headlines on light backgrounds |
| Deep Navy | `#0B2740` | Body text, footer, outlines on illustrations |
| Ribbon Yellow | `#FED438` | Highlights, underline swashes, primary buttons. **Never as text on light backgrounds** (fails contrast) |
| Cream | `#FBF6EC` | Default background ("paper") |
| Sand | `#F4ECDB` | Secondary background |
| Sky | `#E3EEF6` | Educational and calm sections |

Ratio guide: about 60% cream, 25% navy, 10% yellow, 5% white or sky. Avoid gradients; use flat color, outlines, and offset "sticker" shadows instead.

## Typography

| Role | Typeface | Notes |
| --- | --- | --- |
| Display | **Fraunces** (italic for emphasis) | Headlines; set one key word in italic ("Our *mission.*"). Free on Google Fonts and in Canva. |
| Text | **Plus Jakarta Sans** | Body, labels, buttons. Free on Google Fonts and in Canva. |
| Eyebrows | Plus Jakarta Sans Bold, ALL CAPS, +14% tracking, with a short yellow dash before it | Section labels |

Do: one display weight per piece, generous line spacing, left-aligned body text.
Don't: more than two typefaces, script fonts for body text, all-caps paragraphs.

## Graphic language

- **Hand-drawn yellow swash** under one key word.
- **Sticker cards:** white card, 2px deep-navy outline, solid offset shadow (navy or yellow).
- **Line icons:** rounded 1.75-weight strokes (box, heart, hands, ribbon, sparkle).
- **Cape curve:** gentle wave at section edges, echoing the logo's cape.
- **Gold ribbon** (childhood cancer awareness) appears in September campaigns and as a small accent.

## Logo

Heart with a raised-arms figure and a flowing yellow cape, beside "Courage for Kids". Keep clear space equal to the figure's head on all sides. Minimum width: 24px (mark only), 120px (full lockup). Don't recolor the heart outside navy, deep navy, or white.

**To do:** export the official logo from the Canva Brand Kit as SVG and PNG into `public/brand/`. The website currently uses a faithful inline-SVG redraw.

## Templates (Canva)

See the Canva folder **"CFK Brand System 2026"** for working templates. Each new design starts from a template, never from scratch, so posts stay consistent.

## Mascot concept: "Sunny"

An original companion to the existing superhero-kid illustration: **Sunny is a living, huggable superhero cape**, a cozy golden-yellow blanket-cape with a navy heart emblem, big friendly eyes and stubby cape-corner arms. It ties three brand ideas into one character:

- **The cape** in the logo (courage),
- **The blanket** in every Courage Box (comfort),
- **The hug** (no one fights alone).

Uses: Courage Box insert cards ("Sunny came to keep you company"), sticker sheets, coloring pages, a plush version for sponsors to fund, Instagram "Sunny says" tips, event photo-op cutout. Concept art is in the Canva folder (draft for leadership review; not approved or published).

## Social templates (code-built)

`brand/social/templates.html` holds pixel-exact templates (Fact Friday, Sponsor a Courage Box, Holiday, What's Inside story, Event flyer). Edit the copy and run `node brand/social/render.cjs` (after `npm run build`) to export PNGs into `brand/social/out/`. Upload them to Canva to use as editable backgrounds.
