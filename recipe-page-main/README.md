# Frontend Mentor - Recipe page

![Design preview for the Recipe page coding challenge](./preview.jpg)

## Welcome! 👋

Thanks for checking out this front-end coding challenge.

[Frontend Mentor](https://www.frontendmentor.io) challenges help you improve your coding skills by building realistic projects.

**To do this challenge, you need a basic understanding of HTML and CSS.**

## The challenge

Your challenge is to build out this recipe page and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Want some support on the challenge? [Join our community](https://www.frontendmentor.io/community) and ask questions in the **#help** channel.

## Adding custom colors (Bulma)

This project uses Bulma and the modern Sass `@use` pattern to register custom colors. To add a new color (for example, `mint`), edit `index.scss` and add your color variables and a `$custom-colors` entry before Bulma is loaded. Example:

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

// then configure Bulma's derived-variables with the map
@use "bulma/sass/utilities/derived-variables" with (
  $custom-colors: $custom-colors
);

@use "bulma/bulma";
```

After rebuilding your Sass (for example `npm run build-bulma`), Bulma will automatically generate helper classes such as `.has-text-mint`, `.has-background-mint`, and shaded variants like `.has-text-mint-05`.

If you'd rather keep using `@import`, ensure your `$custom-colors` variable is defined before importing Bulma's `derived-variables` so the helpers are generated.
