#Install

1. Download
2. <a href="chrome://extensions/" target="_blank" />chrome://extensions/</a>
3. Click Developer Mode in the top right
4. Click load unpacked extension
5. Refresh Page to Activate

#How it works

**Boxes**
The boxes at the top indicate what kind of style to apply to your selectors. The red border creates, well a red border around your selector. Instead of border I used box-shadow so it won't disturb your layout. One down fall of this technique is there are a number of elements that will not respond to the box-shadow rule. The second box is a shader which uses a grey background color with a small amount of opacity so you can see how elements are layering. The final box are the two styles combined.

**Selectors**
The input field allows you to use sizzle syntax(how jQuery does it) and apply the style of your choosing. Here is an example. `*` would apply to all elements on the page and `.post > *` would apply to all elements inside the post class. Easy right?


#Helpful 

##Future Features

- Ability to add multiple input fields and for each one to have a custom color.
- Better UI.
- Add window width to badge and maybe the badge changes colors at common breakpoints(bootstrap/foundation). Maybe people can can customize this at some point.
- Make a new icon.
- Make a website for it.
- Figure out a solution for applying box-shadow to an image. 