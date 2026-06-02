const c=document.getElementById("shader-canvas"),g=c.getContext("webgl")||c.getContext("experimental-webgl");function y(){c.width=innerWidth,c.height=innerHeight,g&&g.viewport(0,0,c.width,c.height)}y();window.addEventListener("resize",y);if(g){let o=function(n,w,S){const b=n.createShader(w);return n.shaderSource(b,S),n.compileShader(b),b},r=function(n){e.uniform1f(x,n*.001),e.uniform2f(A,c.width,c.height),e.uniform2f(l,u,d),e.drawArrays(e.TRIANGLE_STRIP,0,4),requestAnimationFrame(r)};const e=g,a="attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}",f=`precision highp float;
uniform float t;uniform vec2 r;uniform vec2 m;
vec3 pal(float t,vec3 a,vec3 b,vec3 c,vec3 d){return a+b*cos(6.28318*(c*t+d));}
float n(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
float sn(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);return mix(mix(n(i),n(i+vec2(1,0)),f.x),mix(n(i+vec2(0,1)),n(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.;float a=.5;for(int i=0;i<5;i++){v+=a*sn(p);p=p*2.1+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*r)/min(r.x,r.y);
  vec2 mu=(m/r-.5)*2.;
  float time=t*.2;
  vec2 q=vec2(fbm(uv+vec2(0,0)),fbm(uv+vec2(5.2,1.3)));
  vec2 p2=uv+.5*q+vec2(1.7+sin(time*.5)*mu.x*.2,9.2+cos(time*.3)*mu.y*.2);
  float f=fbm(p2);
  vec3 col=pal(f+time*.05,vec3(.3,.3,.4),vec3(.2,.2,.3),vec3(.8,.8,1.),vec3(0,.1,.2));
  col=mix(col,vec3(.2,.1,.3),clamp(f*f*2.,0.,1.));
  col*=1.-length(uv)*.3;
  gl_FragColor=vec4(col*.25,1);
}`,t=e.createProgram();e.attachShader(t,o(e,e.VERTEX_SHADER,a)),e.attachShader(t,o(e,e.FRAGMENT_SHADER,f)),e.linkProgram(t),e.useProgram(t);const p=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,p),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);const v=e.getAttribLocation(t,"p");e.enableVertexAttribArray(v),e.vertexAttribPointer(v,2,e.FLOAT,!1,0,0);const x=e.getUniformLocation(t,"t"),A=e.getUniformLocation(t,"r"),l=e.getUniformLocation(t,"m");let u=0,d=0;document.addEventListener("mousemove",n=>{u=n.clientX,d=n.clientY}),requestAnimationFrame(r)}const i=document.getElementById("hero-canvas"),h=i.getContext("webgl")||i.getContext("experimental-webgl");function E(){i.width=i.offsetWidth,i.height=i.offsetHeight,h&&h.viewport(0,0,i.width,i.height)}E();window.addEventListener("resize",E);if(h){let o=function(l,u,d){const n=l.createShader(u);return l.shaderSource(n,d),l.compileShader(n),n},r=function(l){e.uniform1f(x,l*.001),e.uniform2f(A,i.width,i.height),e.drawArrays(e.TRIANGLE_STRIP,0,4),requestAnimationFrame(r)};const e=h,a="attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}",f=`precision highp float;
uniform float t;uniform vec2 r;
float n(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
float sn(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);return mix(mix(n(i),n(i+vec2(1,0)),f.x),mix(n(i+vec2(0,1)),n(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.;float a=.5;for(int i=0;i<6;i++){v+=a*sn(p);p=p*2.1+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*r)/min(r.x,r.y);
  float time=t*.3;
  
  float f=fbm(uv+vec2(time*.2,0));
  float g=fbm(uv+vec2(time*.1,-time*.15));
  
  vec3 col=vec3(.1,.1,.15);
  col=mix(col,vec3(.2,.25,.35),f);
  col=mix(col,vec3(.15,.2,.3),g);
  
  float ring=smoothstep(.5,.8,length(uv));
  col=mix(col,vec3(.05,.05,.08),ring);
  
  float edge=smoothstep(.9,1.,length(uv));
  col=mix(col,vec3(0),edge);
  
  gl_FragColor=vec4(col,1);
}`,t=e.createProgram();e.attachShader(t,o(e,e.VERTEX_SHADER,a)),e.attachShader(t,o(e,e.FRAGMENT_SHADER,f)),e.linkProgram(t),e.useProgram(t);const p=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,p),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);const v=e.getAttribLocation(t,"p");e.enableVertexAttribArray(v),e.vertexAttribPointer(v,2,e.FLOAT,!1,0,0);const x=e.getUniformLocation(t,"t"),A=e.getUniformLocation(t,"r");requestAnimationFrame(r)}const s=document.getElementById("cursor"),m=document.getElementById("cursor-follower");if(s&&m){let o=function(){r+=(a-r)*.1,e+=(f-e)*.1,m.style.left=r+"px",m.style.top=e+"px",requestAnimationFrame(o)},r=0,e=0,a=0,f=0;document.addEventListener("mousemove",t=>{a=t.clientX,f=t.clientY,s.style.left=a+"px",s.style.top=f+"px"}),o(),document.querySelectorAll("a, button, input, textarea").forEach(t=>{t.addEventListener("mouseenter",()=>{m.style.transform="translate(-50%, -50%) scale(1.4)",m.style.borderColor="var(--accent-violet)",s.style.width="10px",s.style.height="10px"}),t.addEventListener("mouseleave",()=>{m.style.transform="translate(-50%, -50%) scale(1)",m.style.borderColor="rgba(255, 255, 255, 0.15)",s.style.width="8px",s.style.height="8px"})})}const R=new IntersectionObserver(o=>{o.forEach((r,e)=>{r.isIntersecting&&(setTimeout(()=>{r.target.style.transition="opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",r.target.style.opacity="1",r.target.style.transform="translateY(0)"},e*80),R.unobserve(r.target))})},{threshold:.1,rootMargin:"0px 0px -30px 0px"});document.querySelectorAll(".reveal").forEach(o=>R.observe(o));
