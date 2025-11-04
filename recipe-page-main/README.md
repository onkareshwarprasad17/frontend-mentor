# Frontend Mentor - Recipe page

![Design preview for the Recipe page coding challenge](./preview.jpg)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Build out the recipe page to match the provided design as closely as possible. This project demonstrates responsive layout, semantic HTML, and usage of Bulma with custom Sass for theming.

### Links

- Solution URL: [GitHub Repo](https://github.com/onkareshwarprasad17/frontend-mentor/tree/main/recipe-page-main)
- Live Site URL: [Live](https://recipe-page-main-psi-sooty.vercel.app/)

## My process

### Built with

- Semantic HTML5
- SCSS with Bulma
- Bulma helpers and custom color map
- Mobile-first responsive layout (Flexbox)

### What I learned

I experimented with Bulma's Sass module system (`@use`) and adding custom theme colors. Key takeaways:

- Bulma's modern Sass modules scope variables: to add custom colors you must provide a `$custom-colors` map before Bulma's `derived-variables` are loaded so Bulma can generate helper classes like `.has-background-<name>` and `.has-text-<name>`.
- Keep `@use` rules at the top of your SCSS file. Configure `initial-variables` and `derived-variables` before importing `bulma/bulma`.

Adding custom colors (Bulma) — example

```scss
// define the color values
$mint: hsl(160, 50%, 45%);
$mint-invert: hsl(0, 0%, 100%);

// add to the custom colors map
$custom-colors: (
  "mint": (
    $mint,
    $mint-invert,
  ),
);

// configure derived variables with our custom map
@use "bulma/sass/utilities/derived-variables" with (
  $custom-colors: $custom-colors
);

// then load Bulma
@use "bulma/bulma";
```

After rebuilding your Sass (for example `npm run build-bulma`) Bulma will generate helpers like `.has-text-mint` and `.has-background-mint`.

### Continued development

- Tidy up and document the preferred `@use` order in `index.scss`.
- Improve accessibility features and keyboard navigation.

### Useful resources

- Bulma documentation — https://bulma.io/documentation/
- Sass modules (`@use`/`@forward`) — https://sass-lang.com/documentation/at-rules/use

## Author

- Frontend Mentor: [@onkareshwarprasad17](https://www.frontendmentor.io/profile/onkareshwarprasad17)
- GitHub: [onkareshwarprasad17](https://github.com/onkareshwarprasad17)

## Acknowledgments

Thanks to Frontend Mentor for the challenge and Bulma's maintainers for a great CSS toolkit.
