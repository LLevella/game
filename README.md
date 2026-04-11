# JS Game

[![CI](https://github.com/LLevella/game/actions/workflows/ci.yml/badge.svg)](https://github.com/LLevella/game/actions/workflows/ci.yml)
[![Deploy GitHub Pages](https://github.com/LLevella/game/actions/workflows/pages.yml/badge.svg)](https://github.com/LLevella/game/actions/workflows/pages.yml)

Browser platform game written in plain JavaScript. The player collects coins,
avoids lava and fireballs, and advances through levels loaded from
`levels.json`.

The project has no bundler or framework. Source files are regular browser
scripts, and the same game logic is covered by Node.js tests.

## Features

- Tile-based levels stored as text maps in `levels.json`.
- Actors for the player, coins, horizontal fireballs, vertical fireballs, and
  falling fireballs.
- Dry static hosting: open through a local web server or deploy to GitHub Pages.
- Local test runner for the original Mocha-style specs.
- CI checks on every push and pull request.
- GitHub Pages deployment after successful tests on `main` or `master`.

## Requirements

- Node.js 18 or newer.
- npm.

## Install

```sh
npm install
```

For CI and clean local installs, use:

```sh
npm ci
```

## Run Locally

```sh
npm start
```

BrowserSync serves the game at:

```text
http://localhost:3000
```

When the page loads, confirm the start dialog. Controls:

| Key | Action |
| --- | --- |
| Left arrow | Move left |
| Right arrow | Move right |
| Up arrow | Jump |

## Test

```sh
npm test
```

The test command runs all files matching `test/*.spec.js` through
`test/run-node.js`. The tests cover vectors, actors, level parsing, collisions,
fireballs, coins, player behavior, and movement edge cases.

You can also open the browser test page while the dev server is running:

```text
http://localhost:3000/test/index.html
```

## Project Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Browser entry point. |
| `js/app.js` | Display, animation loop, keyboard handling, and runtime helpers. |
| `game.js` | Game keys, actor mapping, startup flow. |
| `levels.json` | Level maps. |
| `actor.js`, `player.js`, `coin.js`, `fireball.js` | Game actor classes. |
| `level.js`, `levelparser.js`, `vector.js` | Core game model and utilities. |
| `test/` | Unit and browser specs. |
| `.github/workflows/` | CI and GitHub Pages deployment. |

## Level Symbols

| Symbol | Meaning |
| --- | --- |
| `x` | Wall |
| `!` | Lava |
| `@` | Player start |
| `o` | Coin |
| `=` | Horizontal fireball |
| `|` | Vertical fireball |
| `v` | Falling fireball |

Any other character is treated as empty space.

## CI/CD

### CI

`.github/workflows/ci.yml` runs on pushes, pull requests, and manual dispatches.
It installs dependencies with `npm ci`, runs `npm test`, and checks dependencies
with `npm audit --omit=optional` on Node.js 18 and 20.

### Deployment

`.github/workflows/pages.yml` runs on pushes to `main` or `master`, and can also
be started manually. It runs the test suite, copies the static game files into
`dist/`, uploads a Pages artifact, and deploys it with GitHub Pages.

For the first deployment, configure the repository in GitHub:

1. Open `Settings` -> `Pages`.
2. Set `Build and deployment` -> `Source` to `GitHub Actions`.
3. Push to `main` or `master`, or run `Deploy GitHub Pages` manually from the
   Actions tab.

## Development Notes

- The game loads levels from `./levels.json`, so use `npm start` instead of
  opening `index.html` directly from the filesystem.
- `npm test` is the fastest local check before pushing.
- Keep level maps rectangular when possible; the engine tolerates uneven rows,
  but rectangular maps are easier to read and edit.
