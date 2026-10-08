/* Dedicated landing page controller shared by every projects/<id>/index.html.
 * Page wrappers contain only the stable id; all content comes from projects.js.
 * Optional sections let a project grow without changing this renderer or its siblings.
 * This is static multi-page navigation, not a hash router: direct links and reloads work on GitHub Pages.
 */
const projects=window.PORTFOLIO_PROJECTS;
const id=document.body.dataset.project;
const project=projects.find(p=>p.id===id);
const root=document.getElementById('project-content');
// All authored text is inserted as plain text. External URLs are restricted to HTTPS.
function text(tag,value,className){const el=document.createElement(tag);el.textContent=value;if(className)el.className=className;return el}
function safeLink(value){try{const url=new URL(value);return url.protocol==='https:'?url.href:null}catch{return null}}
if(!project){
  document.title='Project not found - Kaushik Gunasekaren';
  root.append(text('h1','Project not found'),text('p','This page is not connected to a project yet. Use the home link to explore the portfolio.'));
}else{
  document.title=project.name+' - Kaushik Gunasekaren';
  document.querySelector('meta[name="description"]').content=project.name+' | '+project.when;
  root.append(text('div','PROJECT / EXPERIENCE','eyebrow'),text('h1',project.name),text('p',project.when,'when'));
  const tags=document.createElement('div');tags.className='tags';project.tags.forEach(t=>tags.append(text('span',t)));root.append(tags);
  const overview=document.createElement('section');overview.append(text('h2','Overview'));
  const bullets=document.createElement('ul');project.pts.forEach(t=>bullets.append(text('li',t)));overview.append(bullets);root.append(overview);
  // Longer case studies are optional. Omit unfilled sections instead of inventing project details.
  (project.sections||[]).forEach(s=>{
    const section=document.createElement('section');section.append(text('h2',s.heading));
    (s.paragraphs||[]).forEach(t=>section.append(text('p',t)));
    if(s.bullets?.length){const ul=document.createElement('ul');s.bullets.forEach(t=>ul.append(text('li',t)));section.append(ul)}
    root.append(section);
  });
  const source=safeLink(project.link);
  if(source){const link=text('a','View source on GitHub →','btn');link.href=source;link.target='_blank';link.rel='noopener';root.append(link)}
  // Previous/next navigation follows data order; each route still has its own static wrapper.
  const index=projects.indexOf(project),nav=document.createElement('div');nav.className='page-nav';
  for(const [label,p] of [['← Previous',projects[index-1]],['Next →',projects[index+1]]]){
    if(p){const a=text('a',label+': '+p.name);a.href='../'+encodeURIComponent(p.id)+'/';nav.append(a)}
  }
  root.append(nav);
}
