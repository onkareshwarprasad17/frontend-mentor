# Frontend Mentor - Blog preview card solution

This is a solution to the [Blog preview card challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/blog-preview-card-ckPaj01IcS).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See hover and focus states for all interactive elements on the page

### Screenshot

![](./assets/images/result.png)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Local Fonts Integration

### What I learned

Instead of adding the google fonts using the link HTML tag, I learned using the local font files and adding it in the CSS. Below is a sample of the same:-

```css
@font-face {
  font-family: "Figtree-Normal";
  src: url("./assets/fonts/Figtree-VariableFont_wght.ttf") format("woff2-variations");
  src: url("./assets/fonts/Figtree-VariableFont_wght.ttf") format("woff2") tech(
      "variations"
    );
}
```

### Continued development

I would explore more on the variable fonts and grid layout to understand them better.

### Useful resources

- [Variable Fonts](https://web.dev/articles/variable-fonts) - This helped me understand the basics of variable fonts. I really liked how this documentation is written and will explore it more going forward.

## Author

- Frontend Mentor - [@onkareshwarprasad17](https://www.frontendmentor.io/profile/onkareshwarprasad17)
