# kaushikgunasekaren.github.io

Personal portfolio for Kaushik Gunasekaren, Robotics and Autonomous Systems student at Arizona State University.

Live site: https://kaushikgunasekaren.github.io

## What is on the page

- **Interactive hero.** A grid with a small robot. Each glowing node is a project (MIT Auto-ID Lab, LANL x ASU Devils Invent, AMASS Lab blimp, ARMS Club, warehouse robot, Sun Devil Motorsports, RAS 101 learning assistant). Click a node and the robot plans a route and drives there, then a panel shows the project details.
- **Draw walls.** Drag on the grid to add or erase walls. The robot re-plans live. Buttons: `reset map`, `random walls`, and `algorithm: A*` / `Dijkstra` to switch the pathfinder. Press `r` to reset.
- **Searchable resume.** A button opens the PDF, and a search box filters the resume text line by line with highlighted matches.
- **About, Skills, Contact.** Plain sections below the hero.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole site: HTML, CSS and JavaScript in one file. No build step, no dependencies, no external requests. |
| `3-resume.pdf` | The resume PDF linked from the Resume section. |
| `README.md` | This file. |

## How `index.html` is organised

The file is commented throughout. Rough map:

1. **CSS** (inside `<style>`): design tokens as CSS variables at the top (`--bg`, `--panel`, `--line`, `--fg`, `--dim`, `--acc`, `--acc2`), then header, hero, project panel, sections, resume search, and a small-screen media query.
2. **HTML body**: header nav, hero stage (canvas, buttons, text, panel), then the resume, about, skills and contact sections and a footer.
3. **JavaScript** (inside `<script>`):
   - `PROJECTS`: the data for each project node.
   - `init()`: builds the grid for the current screen size and places the nodes and robot.
   - `nb()` and `find()`: neighbour lookup and the pathfinder (A* or Dijkstra on a 4-direction grid, every step costs 1).
   - `go()` and `arrive()`: start a trip, and show the project panel on arrival.
   - Input handlers: pointer events for drawing walls and picking nodes, buttons, the `r` shortcut, window resize.
   - `frame()` and `draw()`: the animation loop and canvas drawing.
   - `RES` and `search()`: resume text and the search box.

## Common edits

- **Add or change a project:** edit `PROJECTS` in `index.html`. Each entry has `id`, `name`, `when`, `tags`, `pts` and optionally `short` and `link`. Then add one `[x, y]` position (fractions of grid width and height) to **both** layout lists named `L` inside `init()`, in the same order as `PROJECTS`.
- **Change colours:** edit the variables in `:root`.
- **Update the resume:** replace `3-resume.pdf`, and update the `RES` array so search matches the new text.
- **Change skills or contact links:** edit the matching `<section>` in the HTML.

## Run locally

Open `index.html` in a browser. No server is needed.

## Deployment

GitHub Pages serves the `main` branch of this repository. Pushing to `main` updates the live site within a minute or two.

## Notes

- `pts` and `link` values in `PROJECTS` are inserted as HTML, so only put trusted text there. Resume search results are HTML-escaped.
- The PDF is public at https://kaushikgunasekaren.github.io/3-resume.pdf, so it should only contain information meant to be public.
