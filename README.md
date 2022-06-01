<img src= 'https://media.giphy.com/media/xULW8jyFTUgwNAPJIs/giphy.gif'>

# Yrgonaut

This is a game bulit with PixiJS and TypeScript. You are the Yrgonaut that needs to catch the duck.

If you want to play this incredible game, you can visit this [website](https://yrgonaut.netlify.app/). Remember to turn on the sound!

# Installation

1. Clone the project `https://github.com/h-emma/our-game`
2. If you not already have NodeJS installed, do that.
3. Install dependency `npm install`
4. Start service `npm run dev`

# Changelog

-   (https://github.com/h-emma/our-game/pull/27) Update readme
-   (https://github.com/h-emma/our-game/pull/26) Fix random start position and add levels
-   (https://github.com/h-emma/our-game/pull/25) Add code review
-   (https://github.com/h-emma/our-game/pull/24) Fix scaling
-   (https://github.com/h-emma/our-game/pull/23) Fix responsive mute button (works on Chrome)
-   (https://github.com/h-emma/our-game/pull/22) Fix responsive mute button (do not work on Chrome)
-   (https://github.com/h-emma/our-game/pull/21) Update readme and license
-   (https://github.com/h-emma/our-game/pull/20) Fix error regarding Vector2
-   (https://github.com/h-emma/our-game/pull/19) Update size on player and spring circle
-   (https://github.com/h-emma/our-game/pull/18) Add level
-   (https://github.com/h-emma/our-game/pull/17) Add levels class and fix scaling
-   (https://github.com/h-emma/our-game/pull/16) Add public folder
-   (https://github.com/h-emma/our-game/pull/14) Improved movement
-   (https://github.com/h-emma/our-game/pull/13) Change size on music file
-   (https://github.com/h-emma/our-game/pull/12) Add mute icon and function
-   (https://github.com/h-emma/our-game/pull/11) Fix the start page with text and images
-   (https://github.com/h-emma/our-game/pull/10) Add a start page with a description on how to start the game
-   (https://github.com/h-emma/our-game/pull/9) Add images and sound. Install PixiJS Sound
-   (https://github.com/h-emma/our-game/pull/8) Add spring circle class
-   (https://github.com/h-emma/our-game/pull/7) Add physic object class
-   (https://github.com/h-emma/our-game/pull/4) Add player class
-   (https://github.com/h-emma/our-game/pull/2) Add setup and test assets

# Code Review by Alice Nyberg and Nelly Petrén

1. `Game.ts:21` - A comment about not forgetting to change the number of levels. Did your remember to change?
2. `General`- Very clean code, looks like you’ve managed to remove al lot unnecessary/unused things!
3. `General`- Would have liked to see some comments, just to make it a bit easier for an outsider of lower level to be able to see what’s going on in the code :)
4. `General`- You’ve managed to break out a lot of the code, which makes it easier to navigate. Good job!
5. `Classes/SpringCircle.ts:92-93` - A lot of your functions have explanatory names, this one is just named clamp. A comment or a more specific name could have helped!
6. `Classes/SpringCircle.ts:80-90` - Same here! You get an estimation of what the function does (collisionTint: change color of the bubbles on collision?) but a comment would have made it clearer!
7. `Classes/SpringCircle.ts:47-63` - Again. Not 100 % sure what the function (spring) does. Add bounce to the bubbles on impact maybe? A small comment could have put it all in to context easier!
8. `README.md` - The installation guide could contain a bit more information, maybe add a link on how to install nodeJS?
9. `README.md`- Also in the installation guide, to start the server with “npm run dev” doesn’t work if you only follow the guide.
10. `General` - Would have been fun with a feature that makes it possible to lose the game! Maybe have the yrgonaut catch the duck in a specifik time or have the duck move around a bit more?
11. super fun and cute game! love the yrgo theme! good job!

# Testers

Tested by the following people:

1. Johanna and Anton
2. Sofia and Sophie

Tested by the following muggles (non-coders):

1. Peter
2. Sara
3. Sara
4. Erik
