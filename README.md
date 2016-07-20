<p align="center"><img src="https://github.com/Blumed/looksee/blob/master/resources/promo440.png"></p>

<hr>
![](https://img.shields.io/badge/build-passing-green.svg)
![](https://img.shields.io/badge/looksee-v1.3.0-orange.svg)

Type in class's, id's, element's, anything that you would use in a `$('Selector')` to have a quick looksee at your layout. The idea here is to add borders and shaders on the fly.  You could add the styles and markup to your project and remove it later, but why do that when you could quickly target the markup you need to see. 

Head to your favorite webpage and try these on for size:

`*` - Select everything inside the body

`p:even` - Select all even `p` tags

`input[type="email"]` - Select all `input` tags with the type attribute email

##Use Cases
1. Quickly identify specific markup on a webpage. Find all the header tags
2. Have you ever viewed your project on a phone/tablet and the site was bigger than the viewport which allowed you to move the site left and right? I know it has happened to me once or twice. Looksee will help you find that pesky child element on the double!


##Support
If you're experiencing a bug and would be so lovely to report it. Please head over [here](https://github.com/Blumed/looksee/issues)

Things to know:

- I use box-shadow to create the border instead of border so it won't hurt your layout. This has a side effect. Box-shadow does not work on images. I can fix this with wrapping a container around the image, but this may effect elements relying up on images relationship with the markup. If people really want this than maybe I will make it an option you can turn on inside of prefrences.

##Future Features

- Ability to add multiple input fields and for each one to have a custom color.
- Better UI.
- Make a website for this here extension
- Figure out a solution for applying box-shadow to an image
- Connect options page for more user prefrences
- Toggle borders on while hovering
- Add help link to options page