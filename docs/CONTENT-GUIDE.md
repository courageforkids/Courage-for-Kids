# Content guide

How to keep the website accurate, on-brand, and safe for the families we serve.

## Ground rules

1. **Only publish what's true and verified.** No estimated numbers, no partners we haven't confirmed in writing, no stories we can't stand behind.
2. **Children's privacy comes first.** Never publish a child's full name, hospital, diagnosis details, school, or photo without **written permission from a parent or guardian**. Set `familyConsent: true` on the story only after the signed permission is saved in the shared drive.
3. **Team members are listed by first name** (several are minors). Add a last name or photo only with that person's (and a parent's) OK.
4. **No donor names** without the donor's permission.

## Adding a story

Create `src/content/stories/your-story-slug.md`:

```markdown
---
title: A clear, human headline
summary: One sentence that appears on cards and in search results.
date: 2026-11-15
author: Arleigh, Director of Media
tag: Community        # From the founder | Courage Boxes | Community | Family story | News
familyConsent: false  # true only with signed parent/guardian permission on file
draft: true           # change to false to publish
---

Write the story here. Short paragraphs. Use ## for subheadings.
```

## Adding an event

Copy `src/content/events/_example-event.md` to a new file, fill it in, and set `draft: false`. Events disappear from the list automatically after their date.

## Impact numbers

Add numbers to `impactStats` in `src/config/content.ts` only after Julia (fundraising) or David (logistics) confirms them from records. Note the as-of date in a code comment.

## Voice

Warm, hopeful, plain-spoken, never pitying. Talk about children as kids first ("kids who love Legos and happen to be in treatment"), not as patients. Avoid war metaphors beyond our tagline.
