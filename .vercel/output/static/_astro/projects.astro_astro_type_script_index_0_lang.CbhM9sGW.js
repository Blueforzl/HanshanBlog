const c=document.getElementById("shader-canvas"),g=c.getContext("webgl")||c.getContext("experimental-webgl");function E(){c.width=innerWidth,c.height=innerHeight,g&&g.viewport(0,0,c.width,c.height)}E();window.addEventListener("resize",E);if(g){let o=function(n,f,b){const v=n.createShader(f);return n.shaderSource(v,b),n.compileShader(v),v},t=function(n){e.uniform1f(u,n*.001),e.uniform2f(A,c.width,c.height),e.uniform2f(d,p,h),e.drawArrays(e.TRIANGLE_STRIP,0,4),requestAnimationFrame(t)};const e=g,s="attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}",a=`precision highp float;
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
}`,r=e.createProgram();e.attachShader(r,o(e,e.VERTEX_SHADER,s)),e.attachShader(r,o(e,e.FRAGMENT_SHADER,a)),e.linkProgram(r),e.useProgram(r);const x=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,x),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);const i=e.getAttribLocation(r,"p");e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0);const u=e.getUniformLocation(r,"t"),A=e.getUniformLocation(r,"r"),d=e.getUniformLocation(r,"m");let p=0,h=0;document.addEventListener("mousemove",n=>{p=n.clientX,h=n.clientY}),requestAnimationFrame(t)}const l=document.getElementById("cursor"),m=document.getElementById("cursor-follower");if(l&&m){let o=function(){t+=(s-t)*.1,e+=(a-e)*.1,m.style.left=t+"px",m.style.top=e+"px",requestAnimationFrame(o)},t=0,e=0,s=0,a=0;document.addEventListener("mousemove",r=>{s=r.clientX,a=r.clientY,l.style.left=s+"px",l.style.top=a+"px"}),o(),document.querySelectorAll("a, button, input, textarea").forEach(r=>{r.addEventListener("mouseenter",()=>{m.style.transform="translate(-50%, -50%) scale(1.4)",m.style.borderColor="var(--accent-violet)",l.style.width="10px",l.style.height="10px"}),r.addEventListener("mouseleave",()=>{m.style.transform="translate(-50%, -50%) scale(1)",m.style.borderColor="rgba(255, 255, 255, 0.15)",l.style.width="8px",l.style.height="8px"})})}document.querySelectorAll(".card-canvas").forEach(o=>{const t=o,e=t.getContext("webgl")||t.getContext("experimental-webgl");if(!e)return;parseFloat(t.dataset.hue);const s=parseFloat(t.dataset.speed)||1;function a(){t.width=t.offsetWidth,t.height=t.offsetHeight,e.viewport(0,0,t.width,t.height)}a(),window.addEventListener("resize",a);const r="attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}",x=`precision highp float;
uniform float t;uniform vec2 r;
float n(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
float sn(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);return mix(mix(n(i),n(i+vec2(1,0)),f.x),mix(n(i+vec2(0,1)),n(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.;float a=.5;for(int i=0;i<4;i++){v+=a*sn(p);p=p*2.2+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*r)/min(r.x,r.y);
  float time=t*${s};
  float f=fbm(uv+vec2(time*.1,0));
  float g=fbm(uv+vec2(0,time*.15));
  float c=sin(f*10.+time)*.5+.5;
  vec3 col=vec3(c*.3,c*.2,c*.4);
  col=mix(col,vec3(.1,.1,.15),smoothstep(.3,.8,length(uv)));
  gl_FragColor=vec4(col,1);
}`,i=e.createProgram();e.attachShader(i,u(e,e.VERTEX_SHADER,r)),e.attachShader(i,u(e,e.FRAGMENT_SHADER,x)),e.linkProgram(i),e.useProgram(i);function u(f,b,v){const y=f.createShader(b);return f.shaderSource(y,v),f.compileShader(y),y}const A=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);const d=e.getAttribLocation(i,"p");e.enableVertexAttribArray(d),e.vertexAttribPointer(d,2,e.FLOAT,!1,0,0);const p=e.getUniformLocation(i,"t"),h=e.getUniformLocation(i,"r");function n(f){e.uniform1f(p,f*.001),e.uniform2f(h,t.width,t.height),e.drawArrays(e.TRIANGLE_STRIP,0,4),requestAnimationFrame(n)}requestAnimationFrame(n)});const R=new IntersectionObserver(o=>{o.forEach((t,e)=>{t.isIntersecting&&(setTimeout(()=>{t.target.style.transition="opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",t.target.style.opacity="1",t.target.style.transform="translateY(0)"},e*80),R.unobserve(t.target))})},{threshold:.1,rootMargin:"0px 0px -30px 0px"});document.querySelectorAll(".reveal").forEach(o=>R.observe(o));
