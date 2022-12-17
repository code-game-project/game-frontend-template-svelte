# game-frontend-template-svelte

A template for building game server frontends with Svelte and TypeScript.

## Developing

Once you've installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

After that you can start customizing the game view in [`src/routes/spectate.svelte`](./src/routes/spectate.svelte). Also don't forget to update the [`src/config.ts`](./src/config.ts) the info in [`static/security.txt`](./static/security.txt) or delete it if you don't want to use it.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Canvas Framework Recommendations

Here are some framework recommendations for libraries that can be used to make a nice view for your game:

### [Pixi.js](https://pixijs.com)
__Pros__:
- lightweight
- easy to use

__Cons__:
- less optimised for games (no camera or built in controls)
- only WebGL

### [Phaser](https://phaser.io)
__Pros__:
- made for games
- camera and controls built in
- canvas and WebGL

__Cons:__
- runs its own physics engine (not needed, because the server should handle physics)
- a bit heavier and slower than pixi

## License

MIT License

Copyright (c) 2022 CodeGame Contributors (https://github.com/orgs/code-game-project/people)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
