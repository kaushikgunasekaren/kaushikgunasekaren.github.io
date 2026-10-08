/* Robot map: presentation and pathfinding only. Content lives in projects.js.
 * The canvas is supplemented by real links in #project-list for keyboard and screen-reader access.
 * The map grows vertically with node count; randomized slots are derived automatically from available width.
 */
const PROJECTS=window.PORTFOLIO_PROJECTS;
// Canvas and state.
// cv/ctx: the drawing surface. W,H: canvas size in CSS px. CS: cell size in px. cols,rows: grid size. grid[row][col]: 0 = free, 1 = wall.
// nodes: project positions. robot: grid cell (x,y) plus pixel position (px,py). path: remaining cells to visit. target: node being driven to.
// algo: 'astar' or 'dijkstra'. dpr: device pixel ratio, capped at 2 for performance. trail: recent cells the robot visited.
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
let W,H,CS,cols,rows,grid,nodes=[],robot,path=[],target=null,algo='astar',dpr=Math.min(devicePixelRatio||1,2),trail=[];
// Each page load gets new entropy. Keep these samples across resize so rotating a phone
// does not reshuffle project identity. Fisher-Yates gives an unbiased slot permutation.
const nodeOrder=PROJECTS.map((_,i)=>i);
for(let i=nodeOrder.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[nodeOrder[i],nodeOrder[j]]=[nodeOrder[j],nodeOrder[i]]}
const nodeJitter=PROJECTS.map(()=>({x:Math.random()-.5,y:Math.random()-.5}));
// init(): resize the map, choose a column count, and place every node in randomized slots.
// Leave a header/control zone and a bottom biography zone clear. More nodes grow the stage,
// rather than indexing past a fixed list of positions. A resize intentionally resets the map.
function init(){
  W=cv.clientWidth;
  const columns=W<700?2:Math.max(2,Math.min(3,Math.floor(W/280)));
  const nodeRows=Math.ceil(PROJECTS.length/columns);
  const spacing=W<700?100:110;
  document.getElementById('stage').style.height=Math.max(innerHeight,145+nodeRows*spacing+320)+'px';
  H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  CS=W<700?22:30;cols=Math.floor(W/CS);rows=Math.floor(H/CS);
  grid=Array.from({length:rows},()=>Array(cols).fill(0));
  nodes=PROJECTS.map((p,i)=>{
    // Disjoint slots plus bounded jitter prevent overlaps; quantize to walkable cells.
    // The jitter stays small enough that short mobile labels remain clear of adjacent slots.
    // Fallback slots allow live data additions without another initialization step.
    const slot=nodeOrder[i]??i,jitter=nodeJitter[i]??{x:0,y:0};
    return {...p,
      x:Math.min(cols-2,Math.max(1,Math.floor((slot%columns+.5+jitter.x*.16)*cols/columns))),
      y:Math.floor((145+Math.floor(slot/columns)*spacing+jitter.y*24)/CS)};
  });
  robot={x:1,y:rows-2,px:CS*1.5,py:CS*(rows-1.5)};path=[];trail=[];target=null;
}
// nb(x,y): returns the walkable 4-direction neighbours (no diagonals) of a cell, staying inside the grid and avoiding walls.
function nb(x,y){return[[1,0],[-1,0],[0,1],[0,-1]].map(d=>[x+d[0],y+d[1]]).filter(([a,b])=>a>=0&&b>=0&&a<cols&&b<rows&&!grid[b][a])}
// find(): shortest path from (sx,sy) to (tx,ty) on the grid; returns a list of [x,y] cells (start excluded) or null if blocked.
// Every step costs 1. With algo 'astar' the heuristic h is Manhattan distance to the goal; with 'dijkstra' h is 0, so it explores evenly in all directions.
// g = best known cost to each cell, from = back-pointers used to rebuild the path, open = frontier sorted by cost + heuristic, seen = cells already expanded.
// The frontier is re-sorted each loop, which is simple and fast enough for a grid this small.
function find(sx,sy,tx,ty){
  const key=(x,y)=>y*cols+x,h=(x,y)=>algo==='astar'?Math.abs(x-tx)+Math.abs(y-ty):0;
  const g=new Map([[key(sx,sy),0]]),from=new Map(),open=[[h(sx,sy),sx,sy]],seen=new Set();
  while(open.length){open.sort((a,b)=>a[0]-b[0]);const[,x,y]=open.shift();const k=key(x,y);if(seen.has(k))continue;seen.add(k);
    if(x===tx&&y===ty){const p=[];let c=k;while(c!==key(sx,sy)){p.unshift([c%cols,Math.floor(c/cols)]);c=from.get(c)}return p}
    for(const[a,b]of nb(x,y)){const nk=key(a,b),ng=g.get(k)+1;if(!g.has(nk)||ng<g.get(nk)){g.set(nk,ng);from.set(nk,k);open.push([ng+h(a,b),a,b])}}}
  return null}
// go(n): plan a path to node n and start driving. If no route exists (walls block it), flash the robot red instead.
function go(n){const p=find(robot.x,robot.y,n.x,n.y);if(!p){flash();return}if(!p.length){arrive(n);target=null;return}path=p;target=n}
// flashT: frames left to show the red 'no path' flash.
let flashT=0;function flash(){flashT=20}
// arrive(n): offer the dedicated landing page after the robot reaches the node.
// Keep the visitor on the map until they choose the link. Use DOM text nodes so data never becomes executable HTML.
function arrive(n){
  const P=document.getElementById('panel');pt.textContent=n.name;pw.textContent=n.when;
  pl.replaceChildren(...n.pts.map(t=>{const li=document.createElement('li');li.textContent=t;return li}));
  pg.replaceChildren(...n.tags.map(t=>{const chip=document.createElement('span');chip.textContent=t;return chip}));
  const link=document.getElementById('project-open');link.href=projectURL(n);link.textContent='Explore this project →';
  P.classList.add('on');
}
// Panel element references (declared after arrive() but before any click can happen).
const pt=document.getElementById('pt'),pw=document.getElementById('pw'),pl=document.getElementById('pl'),pg=document.getElementById('pg');
document.getElementById('x').onclick=()=>document.getElementById('panel').classList.remove('on');
// Wall drawing. 'mode' is decided on pointer down: if the first cell is a wall we erase (0), otherwise we draw (1), so one drag does one thing.
let drawing=false,mode=1;
// cell(e): convert a mouse or touch event to grid coordinates [col,row].
function cell(e){const r=cv.getBoundingClientRect();const t=e.touches?e.touches[0]:e;return[Math.floor((t.clientX-r.left)/CS),Math.floor((t.clientY-r.top)/CS)]}
// paint(e): set the cell under the pointer to the current mode. Skips project nodes and the robot cell. If the robot is mid-trip, re-plans so the route updates live as walls change.
function paint(e){const[x,y]=cell(e);if(x<0||y<0||x>=cols||y>=rows)return;if(nodes.some(n=>n.x===x&&n.y===y)||(x===robot.x&&y===robot.y))return;
  if(grid[y][x]!==mode){grid[y][x]=mode;if(target){const p=find(robot.x,robot.y,target.x,target.y);if(p)path=p}}}
// Pointer input. Pressing within one cell of a node sends the robot there; anywhere else starts drawing walls. Pointer capture keeps the drag working if the cursor leaves the canvas.
cv.addEventListener('pointerdown',e=>{const[x,y]=cell(e);const n=nodes.find(n=>Math.abs(n.x-x)<=1&&Math.abs(n.y-y)<=1);
  if(n){go(n);return}drawing=true;mode=grid[y]&&grid[y][x]?0:1;paint(e);cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',e=>{if(drawing)paint(e)});
cv.addEventListener('pointerup',()=>drawing=false);
cv.addEventListener('pointercancel',()=>drawing=false);
// Buttons and keyboard.
// reset: clear all walls and stop the robot.  rand: scatter walls (~20% of cells) but keep clear zones around nodes and the robot start.  algo: toggle A* / Dijkstra.  Key 'r': same as reset.
document.getElementById('reset').onclick=()=>{grid.forEach(r=>r.fill(0));path=[];target=null};
document.getElementById('rand').onclick=()=>{for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){grid[y][x]=Math.random()<.2&&!nodes.some(n=>Math.abs(n.x-x)<2&&Math.abs(n.y-y)<2)&&!(x<2&&y>rows-3)?1:0}path=[];target=null};
document.getElementById('algo').onclick=e=>{algo=algo==='astar'?'dijkstra':'astar';e.target.textContent='algorithm: '+(algo==='astar'?'A*':'Dijkstra')};
// Do not reset while somebody types an r into resume search or another editable field.
addEventListener('keydown',e=>{if(e.key==='r'&&!e.target.matches('input,textarea,[contenteditable]'))document.getElementById('reset').click()});
// Rebuild the grid when the window size changes.
addEventListener('resize',()=>init());
// Animation loop (requestAnimationFrame). dt is the time since the last frame, capped at 50ms so a background tab does not cause a huge jump.
// Each frame the robot moves toward the next path cell at a speed proportional to dt (sp), snapping to the cell when close, keeping a trail of the last 40 cells, and calling arrive() at the end.
let last=0;
function frame(t){requestAnimationFrame(frame);const dt=Math.min(t-last,50);last=t;
  if(path.length){const[nx,ny]=path[0];const tx=(nx+.5)*CS,ty=(ny+.5)*CS;const dx=tx-robot.px,dy=ty-robot.py,d=Math.hypot(dx,dy),sp=dt*.28;
    if(d<=sp){robot.px=tx;robot.py=ty;robot.x=nx;robot.y=ny;path.shift();trail.push([nx,ny]);if(trail.length>40)trail.shift();if(!path.length&&target){arrive(target);target=null}}
    else{robot.px+=dx/d*sp;robot.py+=dy/d*sp}}
  draw(t)}
// draw(t): paints one frame, in order: grid lines, walls, robot trail, planned path dots, project nodes (pulsing glow and label), then the robot. t is the animation time in ms, used for the pulse.
function draw(t){ctx.clearRect(0,0,W,H);
  ctx.strokeStyle='#162030';ctx.lineWidth=1;ctx.beginPath();for(let x=0;x<=cols;x++){ctx.moveTo(x*CS,0);ctx.lineTo(x*CS,rows*CS)}for(let y=0;y<=rows;y++){ctx.moveTo(0,y*CS);ctx.lineTo(cols*CS,y*CS)}ctx.stroke();
  ctx.fillStyle='#2a3a52';for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)if(grid[y][x])ctx.fillRect(x*CS+1,y*CS+1,CS-2,CS-2);
  ctx.fillStyle='rgba(56,214,168,.15)';trail.forEach(([x,y])=>ctx.fillRect(x*CS+2,y*CS+2,CS-4,CS-4));
  ctx.fillStyle='rgba(255,176,0,.35)';path.forEach(([x,y])=>ctx.fillRect(x*CS+CS*.33,y*CS+CS*.33,CS*.34,CS*.34));
  ctx.font='11px ui-monospace,monospace';ctx.textAlign='center';
  nodes.forEach(n=>{const cx=(n.x+.5)*CS,cy=(n.y+.5)*CS,pulse=4+Math.sin(t/400+n.x)*2;
    ctx.fillStyle='rgba(255,176,0,.18)';ctx.beginPath();ctx.arc(cx,cy,CS*.5+pulse,0,7);ctx.fill();
    ctx.fillStyle='#ffb000';ctx.beginPath();ctx.arc(cx,cy,CS*.28,0,7);ctx.fill();
    const lb=W<700&&n.short?n.short:n.name;const w=ctx.measureText(lb).width+10;ctx.fillStyle='rgba(11,15,20,.85)';ctx.fillRect(cx-w/2,cy+CS*.75,w,16);ctx.fillStyle='#e6edf3';ctx.fillText(lb,cx,cy+CS*.75+12)});
  const r=CS*.34;ctx.save();ctx.translate(robot.px,robot.py);ctx.fillStyle=flashT>0?'#ff5f5f':'#38d6a8';ctx.fillRect(-r,-r,r*2,r*2);ctx.fillStyle='#0b0f14';ctx.fillRect(-r*.6,-r*.4,r*.4,r*.4);ctx.fillRect(r*.2,-r*.4,r*.4,r*.4);ctx.restore();
  if(flashT>0)flashT--}


// Render one real, keyboard-accessible link for every node using exactly the same source.
// encodeURIComponent guards the path segment; documented IDs are lowercase URL-safe slugs.
function projectURL(p){return 'projects/'+encodeURIComponent(p.id)+'/'}
const directory=document.getElementById('project-list');
PROJECTS.forEach(p=>{
  const a=document.createElement('a');a.className='card project-card';a.href=projectURL(p);
  const title=document.createElement('h3');title.textContent=p.name;
  const when=document.createElement('div');when.className='when';when.textContent=p.when;
  const open=document.createElement('span');open.className='open';open.textContent='Explore project →';
  a.append(title,when,open);directory.append(a);
});
// Startup after deferred data/script loading and DOM parsing have completed.
init();requestAnimationFrame(frame);
