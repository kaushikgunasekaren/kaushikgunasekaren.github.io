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
window.PORTFOLIO_PROJECTS=[
 {id:'mit',demo:'sensors',short:'MIT Auto-ID',name:'MIT Auto-ID Lab',when:'Research Assistant, Jul 2026 - now',tags:['sensors','drones','field research'],pts:['Design and prototype low-cost, projectile-deployed environmental sensors for temperature, moisture, and canopy microclimate in remote forests.','Contribute to a drone-based deployment platform and low-impact attachment mechanism for hard-to-reach terrain.']},
 {id:'lanl',demo:'timeline',short:'LANL Hackathon',name:'LANL x ASU Devils Invent',when:'1st Place, ASU, Mar 2026',tags:['hackathon','prototyping','automation'],pts:['Built a working prototype in 48 hours and presented to Los Alamos National Laboratory judges.','Engineered an automated system to safely scrape and collect fired Americium Dioxide from a crucible, cutting operator exposure and the need for skilled manual handling.']},
 {id:'amass',demo:'blimp',short:'AMASS Blimp',name:'AMASS Lab Blimp',when:'Research Assistant, ASU, 2025',tags:['Raspberry Pi','Python','controls'],pts:['Designed and built an autonomous blimp airframe for the "Defend the Republic" national competition.','Programmed a Raspberry Pi in Python for propulsion control.']},
 {id:'arms',demo:'twin',name:'ARMS Club',when:'Vice President, Aug 2026 - now',tags:['MuJoCo','Isaac Sim','leadership'],pts:['Help lead a student-run engineering consultancy for corporate clients; contract revenue funds member-led R&D.','Created digital twins of the Unitree Go2 and G1 in MuJoCo and Isaac Sim.']},
 {id:'wh',short:'Warehouse Bot',name:'Warehouse Robot Navigation',when:'ASU RAS course project',tags:['Python','Dijkstra','pygame'],pts:['Team project with an interactive warehouse map builder and pathfinder using Dijkstra, written in Python and pygame. The grid above is a nod to it.'],link:'https://github.com/kaushikgunasekaren/Autonomous-Warehouse-Robot-Navigation'},
 {id:'sdm',demo:'cooling',short:'Motorsports',name:'Sun Devil Motorsports',when:'Team Member, Sep 2024 - now',tags:['Formula SAE','thermal','manufacturing'],pts:['Designed the cooling system for a Formula SAE car and manufactured the body harness with Rapid Harness.']},
 {id:'ta',demo:'arm',short:'RAS 101 TA',name:'RAS 101 Learning Assistant',when:'ASU, Aug 2026 - now',tags:['Dobot','teaching'],pts:['Guide students through Dobot programming, manipulation, and intro robotics labs; troubleshoot hardware and software.']}
];
