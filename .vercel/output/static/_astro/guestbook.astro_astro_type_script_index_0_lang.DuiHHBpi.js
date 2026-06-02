const i=document.getElementById("cursor"),r=document.getElementById("cursor-follower");if(i&&r){let e=0,n=0,t=0,s=0;window.addEventListener("mousemove",o=>{e=o.clientX,n=o.clientY,i.style.left=e+"px",i.style.top=n+"px"});const a=()=>{t+=(e-t)*.1,s+=(n-s)*.1,r.style.left=t+"px",r.style.top=s+"px",requestAnimationFrame(a)};a(),document.querySelectorAll("a, button, input, textarea").forEach(o=>{o.addEventListener("mouseenter",()=>{r.style.transform="translate(-50%, -50%) scale(1.4)",r.style.borderColor="var(--accent-violet)",i.style.width="10px",i.style.height="10px"}),o.addEventListener("mouseleave",()=>{r.style.transform="translate(-50%, -50%) scale(1)",r.style.borderColor="rgba(255, 255, 255, 0.15)",i.style.width="8px",i.style.height="8px"})})}const B="/api/guestbook",v=document.getElementById("message-form"),y=document.getElementById("content"),d=document.getElementById("char-counter"),h=document.getElementById("submit-button"),u=document.getElementById("btn-spinner"),c=document.getElementById("form-status-msg"),l=document.getElementById("refresh-button"),g=document.getElementById("messages-container"),b=document.getElementById("hero-messages-count"),E=document.getElementById("list-messages-count");y?.addEventListener("input",()=>{const e=y.value.length;d&&(d.textContent=`${e} / 500`,e>=480?d.classList.add("limit"):d.classList.remove("limit"))});const w=["linear-gradient(135deg, #8b5cf6, #ec4899)","linear-gradient(135deg, #06b6d4, #3b82f6)","linear-gradient(135deg, #f59e0b, #e11d48)","linear-gradient(135deg, #10b981, #059669)","linear-gradient(135deg, #d946ef, #8b5cf6)"];function L(e){let n=0;for(let t=0;t<e.length;t++)n+=e.charCodeAt(t);return w[n%w.length]}async function f(){if(g){l?.classList.add("spinning"),l&&(l.disabled=!0);try{const e=await fetch(B);if(!e.ok)throw new Error("Network error");const t=(await e.json()).messages||[];if(b&&(b.textContent=t.length.toString()),E&&(E.textContent=t.length.toString()),t.length===0){g.innerHTML=`
              <div class="empty-state">
                <div class="empty-icon">✏️</div>
                <h4 class="empty-title">还没有留言</h4>
                <p class="empty-desc">来做第一个留言的人吧！</p>
              </div>`;return}g.innerHTML=`
            <div class="messages-list">
              ${t.map((s,a)=>{const m=new Date(s.created_at).toLocaleDateString("zh-CN",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),o=s.nickname||"匿名旅者",p=L(o),C=`#${t.length-a}`;return`
                  <div class="message-card" style="animation: fadeInUp 0.5s ease forwards; animation-delay: ${a*.04}s">
                    <div class="message-avatar-zone">
                      <div class="message-avatar" style="background: ${p}">
                        ${o.substring(0,2).toUpperCase()}
                      </div>
                      <div class="avatar-glow" style="background: ${p}"></div>
                    </div>
                    
                    <div class="message-detail">
                      <div class="message-meta-bar">
                        <div class="message-user-info">
                          <span class="message-nickname">${o}</span>
                          ${s.email?`<span class="message-via" title="${s.email}">${s.email}</span>`:""}
                        </div>
                        <div class="message-badge-zone">
                          <span class="message-floor">${C}</span>
                          <span class="message-split">|</span>
                          <span class="message-time">${m}</span>
                        </div>
                      </div>
                      <div class="message-body">${s.content}</div>
                    </div>
                  </div>
                `}).join("")}
            </div>
          `}catch{g.innerHTML=`
            <div class="empty-state" style="border-color: rgba(239,68,68,0.15)">
              <div class="empty-icon">⚠️</div>
              <h4 class="empty-title" style="color: #ef4444">量子同步中断</h4>
              <p class="empty-desc">无法获取远端数据，请确保后端 API 正常或已在 script 中更换你的真实 API 终点。</p>
            </div>`}finally{setTimeout(()=>{l?.classList.remove("spinning"),l&&(l.disabled=!1)},500)}}}v?.addEventListener("submit",async e=>{e.preventDefault();const n=document.getElementById("username"),t=document.getElementById("email"),s={nickname:n.value.trim(),email:t.value.trim(),content:y.value.trim()};h.disabled=!0,u&&(u.style.display="block"),c&&(c.className="form-message",c.textContent="");try{const a=await fetch(B,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!a.ok){const m=await a.json();throw new Error(m.error||"Unknown error")}I("留言已成功向服务器同步。","success"),v.reset(),d&&(d.textContent="0 / 500"),await f()}catch(a){I(a.message||"发射失败，链路遭遇未知错误阻截。","error")}finally{h.disabled=!1,u&&(u.style.display="none")}});function I(e,n){c&&(c.textContent=e,c.className=`form-message visible ${n}`,setTimeout(()=>{c.className="form-message"},4e3))}l?.addEventListener("click",f);document.addEventListener("DOMContentLoaded",f);
