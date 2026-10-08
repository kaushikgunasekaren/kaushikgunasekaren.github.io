/* SINGLE SOURCE OF TRUTH for the home nodes, directory, and dedicated pages.
 * id: stable URL slug (lowercase letters, numbers, hyphens). Never rename a published id without redirects.
 * short/name: canvas label and full title; when: role/date; tags: plain-text chips;
 * pts: plain-text overview bullets; link: optional original source/repository URL.
 * demo: optional sensors/timeline/blimp/twin/cooling/arm interactive module.
 * sections: optional [{heading, paragraphs:[], bullets:[]}] for a longer case study.
 * Add one entry and copy projects/_template/index.html to projects/<id>/index.html.
 * Set data-project in that copied page to the same id. No layout arrays to update.
 * Text is rendered with textContent, not interpreted as HTML. Keep claims factual.
 */
// LANL text paraphrases the owner-provided presentation; client-specific details and assets are omitted.
window.PORTFOLIO_PROJECTS=[
  {
    "id": "mit",
    "demo": "sensors",
    "short": "MIT Auto-ID",
    "name": "MIT Auto-ID Lab",
    "when": "Research Assistant, Jul 2026 - now",
    "tags": [
      "sensors",
      "drones",
      "field research"
    ],
    "pts": [
      "Design and prototype low-cost, projectile-deployed environmental sensors for temperature, moisture, and canopy microclimate in remote forests.",
      "Contribute to a drone-based deployment platform and low-impact attachment mechanism for hard-to-reach terrain."
    ]
  },
  {
    "id": "lanl",
    "demo": "timeline",
    "short": "LANL Hackathon",
    "name": "LANL x ASU Devils Invent",
    "when": "Programmer & Team Lead | 1st Place, ASU, Mar 2026",
    "tags": [
      "hackathon",
      "prototyping",
      "automation"
    ],
    "pts": [
      "Programmer and Team Lead for Outside The Box, a hackathon prototype addressing an Americium-cleanup challenge from Los Alamos National Laboratory.",
      "Worked with the team on an automated cleanup concept aimed at reducing difficult manual handling and operator exposure.",
      "The team built a working prototype within 48 hours and presented it to LANL judges, earning first place."
    ],
    "sections": [
      {
        "heading": "The challenge",
        "paragraphs": [
          "The project presentation describes a cleanup task that required intensive operator training, awkward working positions, and potential radiation exposure. The team explored automation as a way to reduce direct operator involvement."
        ]
      },
      {
        "heading": "My role",
        "paragraphs": [
          "I served as Programmer and Team Lead. The presentation identifies these roles but does not break down individual code contributions or control-system responsibilities."
        ]
      },
      {
        "heading": "From concept to prototype",
        "paragraphs": [
          "The presentation documents early fixture and end-effector prototypes, exploration of a rotating base, and CAD development. This page summarizes the work at a high level rather than publishing client-specific drawings or operating details."
        ]
      },
      {
        "heading": "Outcome",
        "paragraphs": [
          "As recorded in my resume, the team completed a functional prototype within 48 hours, presented the system to Los Alamos National Laboratory judges, and took first place.",
          "No measured cleanup performance or test results are reported here. The project presentation does not establish validation for use with radioactive material."
        ]
      }
    ],
    "story": [
      {
        "title": "Understand the challenge",
        "body": "The presentation describes awkward manual handling, intensive training needs, and operator exposure. The team explored an automated approach to reduce direct involvement."
      },
      {
        "title": "Explore and prototype",
        "body": "The team developed early fixture and end-effector prototypes and explored a rotating-base concept. These are documented project elements, not assigned hour-by-hour milestones."
      },
      {
        "title": "Develop the design",
        "body": "CAD work supported the prototype concept. Detailed drawings, dimensions, and operating sequences are intentionally not reproduced on this public page."
      },
      {
        "title": "Present the result",
        "body": "The resume records a working prototype built within 48 hours, presentation to LANL judges, and first place. My roles were Programmer and Team Lead."
      }
    ]
  },
  {
    "id": "amass",
    "demo": "blimp",
    "short": "AMASS Blimp",
    "name": "AMASS Lab Blimp",
    "when": "Research Assistant, ASU, 2025",
    "tags": [
      "Raspberry Pi",
      "Python",
      "controls"
    ],
    "pts": [
      "Designed and built an autonomous blimp airframe for the \"Defend the Republic\" national competition.",
      "Programmed a Raspberry Pi in Python for propulsion control."
    ]
  },
  {
    "id": "arms",
    "demo": "twin",
    "name": "ARMS Club",
    "when": "Vice President, Aug 2026 - now",
    "tags": [
      "MuJoCo",
      "Isaac Sim",
      "leadership"
    ],
    "pts": [
      "Help lead a student-run engineering consultancy for corporate clients; contract revenue funds member-led R&D.",
      "Created digital twins of the Unitree Go2 and G1 in MuJoCo and Isaac Sim."
    ]
  },
  {
    "id": "wh",
    "short": "Warehouse Bot",
    "name": "Warehouse Robot Navigation",
    "when": "ASU RAS course project",
    "tags": [
      "Python",
      "Dijkstra",
      "pygame"
    ],
    "pts": [
      "Team project with an interactive warehouse map builder and pathfinder using Dijkstra, written in Python and pygame. The grid above is a nod to it."
    ],
    "link": "https://github.com/kaushikgunasekaren/Autonomous-Warehouse-Robot-Navigation"
  },
  {
    "id": "sdm",
    "demo": "cooling",
    "short": "Motorsports",
    "name": "Sun Devil Motorsports",
    "when": "Team Member, Sep 2024 - now",
    "tags": [
      "Formula SAE",
      "thermal",
      "manufacturing"
    ],
    "pts": [
      "Designed the cooling system for a Formula SAE car and manufactured the body harness with Rapid Harness."
    ]
  },
  {
    "id": "ta",
    "demo": "arm",
    "short": "RAS 101 TA",
    "name": "RAS 101 Learning Assistant",
    "when": "ASU, Aug 2026 - now",
    "tags": [
      "Dobot",
      "teaching"
    ],
    "pts": [
      "Guide students through Dobot programming, manipulation, and intro robotics labs; troubleshoot hardware and software."
    ]
  }
];
