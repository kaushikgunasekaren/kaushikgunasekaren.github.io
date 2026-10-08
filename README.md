# Kaushik Gunasekaren's portfolio

A static, multi-page robotics portfolio for GitHub Pages. No build step, framework, package manager, or external runtime dependency is needed. The dark grid, robot pathfinding, resume search, and existing portfolio content are preserved.

## Structure

```text
index.html                     Home: robot map, project directory, resume, bio, skills, contact
assets/
  styles.css                   Shared theme, responsive home and landing-page layout
  projects.js                  Single source of truth for every node and project page
  home.js                      Automatic node layout, canvas, A*/Dijkstra, home links
  project-page.js              Shared landing-page renderer and previous/next navigation
  resume.js                    Resume text index and keyword search
projects/
  mit/index.html               MIT Auto-ID Lab
  lanl/index.html              LANL x ASU Devils Invent
  amass/index.html             AMASS Lab Blimp
  arms/index.html              ARMS Club
  wh/index.html                Warehouse Robot Navigation
  sdm/index.html               Sun Devil Motorsports
  ta/index.html                RAS 101 Learning Assistant
  _template/index.html         Copy this wrapper when adding a page
3-resume.pdf                   Existing public resume, unchanged
```

Each landing page has a real directory URL, for example `projects/mit/`. Direct links, bookmarks, reloads, and the browser Back button work without server rewrites. Every wrapper uses relative asset paths, so this structure also works under a GitHub Pages project subdirectory.

## Add a node and its dedicated page

Only two content changes are required. You do not need to edit map coordinates, the home HTML, CSS, or the rendering code.

1. Add an object to `window.PORTFOLIO_PROJECTS` in `assets/projects.js`. The order sets map, directory, and previous/next order.
2. Copy `projects/_template/index.html` into `projects/my-project/index.html`. Change `data-project="REPLACE-WITH-ID"` to `data-project="my-project"`; also update the static title and description in its head.

Example data entry:

```js
{
  id: 'my-project',
  short: 'My project',
  name: 'My project full title',
  when: 'Your role and date',
  tags: ['robotics', 'Python'],
  pts: ['A factual summary of what you built.', 'Your contribution or result.'],
  // Optional HTTPS source link. Omit this field when there is no source to share.
  link: 'https://github.com/your-account/your-repository',
  // Optional longer case-study content. Omit unused sections.
  sections: [
    {
      heading: 'Design',
      paragraphs: ['Explain the approach, constraints, and tradeoffs.'],
      bullets: ['A tested implementation detail.']
    },
    {heading: 'Results', paragraphs: ['Describe verified results.']}
  ]
}
```

IDs must be unique lowercase URL-safe slugs using letters, digits, and hyphens. The directory and `data-project` must match the data id exactly. Keep published IDs stable so existing links do not break. Do not publish the example until its placeholder text is replaced with factual content.

The home map randomizes node locations on every page load or refresh. It shuffles disjoint layout slots and adds small bounded offsets, keeping nodes inside the grid with separated labels and no overlap. The initial map has no walls, so every node is reachable by the robot. Window resizing reuses the same random order instead of reshuffling it. Layout size comes from the number of entries and viewport width. More nodes increase the map's height rather than running out of hardcoded positions. A separate project directory gives every node a normal link for keyboards, screen readers, and visitors who do not want to drive the robot.

## Node navigation

Click or tap a glowing node to send the robot there. After arrival, its panel includes an **Explore this project** link to the dedicated page. This keeps the robot demo interactive without unexpectedly navigating away. The project directory opens the same pages immediately. Every landing page has Home, All projects, and previous/next links.

Landing pages share a renderer and styles but show only their matching project's content. No fabricated extra project claims were added. Add `sections` when you have more material for an individual page.

## Common edits

- **Add more detail to an existing page:** update its object in `assets/projects.js`. Use `pts` for overview bullets and `sections` for longer explanations. The home panel and landing page stay in sync.
- **Change the theme:** update CSS variables in `assets/styles.css`.
- **Change the biography, skills, or contact links:** edit the matching sections in `index.html`.
- **Replace the resume:** replace `3-resume.pdf`, keeping the name or updating its link in `index.html`. Update the `RES` array in `assets/resume.js` as well; it is a text index, not an automatic PDF parser.
- **Extend a particular page with custom markup:** add markup outside `#project-content` in its wrapper. Keep shared project facts in the data file. If custom styling is needed, use a new class rather than changing all pages accidentally.
- **Add a completely different page:** create its HTML file with shared `assets/styles.css`, then link it from the home nav or an appropriate section. It need not be a project node.

## Run locally

From the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Test on desktop and in a mobile viewport. A local server matches directory-index navigation more closely than opening HTML files through `file://`.

## Robot map internals

`assets/home.js` owns canvas/grid state, not portfolio content.

- `init()` calculates randomized-slot node positions and canvas sizing. Resizing rebuilds the grid and clears the old path.
- `nb()` returns four-direction walkable neighbors.
- `find()` uses unit step costs. A* uses Manhattan distance; Dijkstra uses zero heuristic.
- `go()` plans a route; `frame()` moves the robot; `arrive()` fills the project panel.
- `draw()` renders the grid, walls, trail, planned path, nodes, and robot.
- Pointer input draws/erases walls while avoiding nodes and the robot. An unreachable node flashes the robot red.
- Reset clears walls. Random walls preserves space around nodes. The algorithm button switches A*/Dijkstra.
- The `r` shortcut resets the map except while typing in a text field.

Content is rendered with DOM `textContent`, so project data is plain text, not HTML. Optional external project links accept HTTPS only. Scripts are deferred and loaded in data-before-renderer order. Resume search escapes displayed text and regular-expression query characters.

## Deployment

Commit the HTML, `assets/`, `projects/`, README, and resume to the repository's `main` branch. GitHub Pages serves the static files directly using the existing Pages configuration. There is no build command and no SPA routing configuration.

After deployment, open the home page and at least one direct project URL in a new tab. Confirm that shared scripts/styles and the resume load. If old assets persist, hard-refresh before assuming a deployment failed.

## Verification checklist

- Home renders on desktop and mobile without horizontal overflow.
- All nodes appear, and the project directory contains one link per data entry. Refresh to confirm a fresh randomized layout; nodes stay in bounds and separated.
- A node click drives the robot, then its page link opens the correct landing page.
- Each direct project URL reloads correctly and its Home/All projects links work.
- Previous/next links follow data order and work at the ends of the list.
- A*, Dijkstra, random walls, drawing, and reset work.
- Resume search finds keywords such as `ROS2`; typing does not trigger reset.
- The PDF is reachable and current; inspect any new personal information before publishing.
- No JavaScript errors appear in the browser console.
- For a new project, verify its unique id, directory, and `data-project` agree.

## Privacy

This is a public repository and website. The resume PDF is public and unchanged by this restructure. Review any personal/contact details before replacing it. Never commit passwords, authenticator codes, API keys, private research, or confidential client material.

## Project-page interactive modules

`assets/demos.js` mounts a module selected by the optional `demo` field in each project object. It loads only on dedicated pages, not the home page. Shared styles are in `assets/styles.css`. The current modules are:

| Project | Data key | Interaction | Evidence boundary |
| --- | --- | --- | --- |
| AMASS | `blimp` | Thrust/wind sliders, animated checkpoint flight, reset | Simplified motion, not the real controller |
| MIT Auto-ID | `sensors` | Choose drop position, deploy sensor, reset | Synthetic readings, not lab data |
| Motorsports | `cooling` | Load/airflow sliders change example temperature and gauge | Arbitrary teaching formula, not telemetry |
| LANL hackathon | `timeline` | Scrub four story stages or use next/previous | High-level story from presentation/resume; no exact milestone timing or measured results |
| RAS 101 | `arm` | Add commands, validate/run a pick-and-place sequence, clear | Schematic arm, not a Dobot model or hardware interface |
| ARMS | `twin` | View-angle control, show/hide conceptual joint markers, reset | 2D schematic stand-in, not an actual Unitree model or running simulation |

These are visibly labeled interactive illustrations or scaffolds. They must not be described as validated project performance, real research measurements, licensed robot models, or real-world versus simulation comparisons. The digital-twin module is a concept placeholder, not yet a true 3D viewer. A web-ready publishable model is required to replace it.

To add another module, add a key/title/note/UI definition in `DEMOS`, add its behavior beside the existing modules, and reference its key from `assets/projects.js`. Use visible explanatory captions, accessible native controls, responsive SVGs, and a live status region. Text content is plain text; `innerHTML` is limited to the fixed authored UI definitions, never user data. The animation helper cancels earlier motion on reset and page exit.

### Assets and facts needed to personalize these demos

- **Hackathon:** actual concept/prototype/test/demo milestones (rough order/times), your role, results you can substantiate, and photos/sketches you are allowed to publish. Do not imply confidential material or detailed handling procedures belong on this public site.
- **Digital twins:** a Go2/G1 model you have permission to publish, ideally GLB/glTF (or original meshes with license/source and textures), plus approved simulation screenshots/recordings and notes. Without this, keep the explicitly schematic stand-in.
- **Optional real-data upgrades:** publishable blimp controls/flight logs, sensor readings/deployment images, cooling measurements/design diagrams, and Dobot lesson material. These are not required to run the illustrative versions, but are needed before claiming the demos represent actual systems.

### Demo testing

At desktop and mobile sizes, exercise every range input and button, check status changes and resets, run valid and invalid arm sequences, let animations finish, and verify captions remain visible. Test navigation and reloads after adding each module. Keep simulations off the home page so its pathfinding demo stays light.

### LANL page content update

The LANL page now uses original high-level text informed by the owner-provided project presentation and resume. The role is **Programmer and Team Lead**, as the presentation states. `sections` contains the case study; `story` contains four `{title, body}` objects read by the interactive story module. The four stages are thematic, not claimed timed milestones or a fabricated test sequence.

The presentation itself is not a site asset. Do not upload, embed, link, or reuse its slides, photos, teammate identities, or CAD. Detailed client-specific dimensions, mechanism sequences, material specifications, and operating details remain omitted pending explicit public-clearance confirmation. No measured performance or radioactive-material validation is asserted.
