---
description: "Use when building frontend UI from design files with Pug, Sass, TailwindCSS, and jQuery, especially for section-based pages that follow strict design-system conventions."
---

# Frontend UI Design System Conventions

Apply these conventions when the project stack is Pug + Sass + TailwindCSS + jQuery, or when the user asks to convert a design image into UI sections.

## Before Coding

- Re-read the design before implementing UI.
- Re-read the current project's tailwind.config.js before coding.
- Treat the actual tailwind.config.js in the current project as the source of truth if any copied guideline differs from it.
- Reuse the existing component and section patterns already present in the repo.

## Markup Rules

- Wrap each main content block in a section tag.
- For sections inside main, use naming in the form section.section-[name]. Do not apply this rule to header or footer.
- Write Tailwind utilities directly in the class attribute, for example div(class="...").
- Keep semantic HTML structure optimized for SEO, especially heading hierarchy such as h1, h2, and h3.

## Layout Rules

- Prioritize grid and flexbox for layout.
- If using flexbox columns, prefer the project pattern below:

```pug
div.row
  div.col(class="lg:w-6/12")
  div.col(class="lg:w-6/12")
```

## Styling Rules

- Prefer using @apply inside Sass for reusable styling.
- Reuse the project's Tailwind tokens for spacing, font sizes, colors, radius, shadows, and breakpoints.
- If the project supports the rem variant for arbitrary px utilities, prefer forms like rem:text-[16px] instead of raw text-[16px].

## Asset Rules

- Put images in the project's image folder.
- If the project provides a Pug image mixin such as +img(), use it instead of hardcoding image tags.
- Do not use SVG icons when the project convention is Font Awesome. Use Font Awesome instead.

## JavaScript Rules

- Use jQuery when the project is already built around jQuery.
- Put general UI JavaScript in the project's main JS entry file.
- Put slider or carousel logic in the project's swiper or slider entry file when that convention exists.

## Form Rules

- Do not use select unless it is required for a real form control.

## Working Style

- When converting from design, start from structure and content first. Keep styling simple unless the user explicitly asks for pixel-accurate implementation.
- Follow the existing repo's naming, spacing, and file organization rather than introducing a new pattern.