// ---------- helpers ----------
const qs = (s, p=document) => p.querySelector(s);
const qsa = (s, p=document) => [...p.querySelectorAll(s)];

// ---------- letter (typewriter) ----------
const letterText = `My Beloved Abiha, 🌹❤️

I want to begin with the truth, not with excuses. The truth is—I hurt you 💔. The truth is—you didn’t deserve the moments of carelessness, impatience, or harshness that came from me. And the deepest truth is—I regret it all with every part of me 😔.

Abiha, meri zindagi 🌙✨, I’ve been thinking over and over about the things I said, the things I didn’t say, and the ways I should have been there for you. I should’ve listened better when your heart spoke softly 👂💕. I should’ve spoken kinder when you needed reassurance 🤍. I should’ve protected your feelings like they were more precious than my own breath—because they are 🌹.

They say in Urdu:
"محبت میں قصور ہمیشہ اسی کا ہوتا ہے جو زیادہ چاہتا ہے۔"
💭 (In love, the one who loves more is always the one who feels the blame more deeply.)
And I feel it, Abiha 🌸. I feel it because my love for you is limitless ♾️, and so is the weight of my regret 😢.

I know apologies don’t erase pain. But I don’t want my words to just touch your ears—I want them to reach your heart 💖. That’s why I’m not here to say sorry as a formality 🙏. I’m here to promise change, to show you that my love will be gentler, steadier, truer 💞.

You deserve a partner who doesn’t just stand by you, but stands for you 🤝. Who doesn’t just love you in easy moments, but proves it in difficult ones 💪❤️. That’s who I want to be. That’s who I’m becoming.

"معافی مانگنے والا شخص کمزور نہیں ہوتا، وہ رشتہ مضبوط کرنے والا ہوتا ہے۔"
🌷 (The one who asks for forgiveness isn’t weak—they’re the one who makes the bond stronger.)

Abiha, I am asking you to let me rebuild us 🏗️💓. Slowly, patiently, brick by brick 🧱, moment by moment ⏳. I want to turn every apology into an action, every regret into a lesson, every promise into proof 💍💖.

You are not just my wife 💕, you are my safe place 🏡, my best friend 👩‍❤️‍👨, my answered prayer 🤲, my forever peace ☁️. You are the calm in my storms 🌧️, the light in my darkness 🌟, the joy in my every tomorrow 🌸. Without you, my world is just a map with no destination 🗺️. With you, everything finally makes sense ✨.

"تم میری دعا ہو، تم میرا سکون ہو، تم ہی میری محبت کی آخری منزل ہو۔"
(You are my prayer 🙏, you are my peace 🌷, you are the final destination of my love ❤️.)

Abiha, meri rooh 🤍, meri mohabbat 💖, I will keep choosing you 🌹. Again, again, and again ♾️—no matter how many times I stumble, I will rise for you 💪❤️. No matter how many times I fall short, I will grow for you 🌱.

So here I am—your Saad—laying down my pride, my ego, my flaws 🕊️, just to hold onto you 🤲, to us 💞, to this love we’ve built together 🌹. Because you are worth it all 💖.

Forever yours,
With a heart that beats only for you ❤️‍🔥,
— Saad 🌹✨`;

function typeWriter(node, text, speed=24){
  let i = 0; node.textContent = '';
  const tick = () => {
    if(i < text.length){
      node.textContent += text[i++];
      setTimeout(tick, text[i-1] === '\n' ? speed*3 : speed);
    }
  };
  tick();
}

// ---------- init ----------
document.addEventListener('DOMContentLoaded', () => {
  typeWriter(qs('#letterBox'), letterText);

  qs('#scrollBtn').addEventListener('click', () =>
    qs('#letter').scrollIntoView({behavior:'smooth'})
  );

  // promises toggle + confetti
  qs('#promiseList').addEventListener('click', (e)=>{
    const li = e.target.closest('li'); if(!li) return;
    li.classList.toggle('checked');
    confetti({particleCount: li.classList.contains('checked') ? 60 : 24, spread: 45, origin:{y: .9}});
  });

  // lightbox
  const lightbox = qs('#lightbox'), lbImg = qs('#lightboxImg'), lbCap = qs('#lightboxCap');
  qsa('.gallery .photo').forEach(card=>{
    card.addEventListener('click', ()=>{
      lbImg.src = qs('img', card).src;
      lbCap.textContent = qs('figcaption', card).textContent;
      lightbox.classList.add('open');
    });
  });
  qs('#lightboxClose').addEventListener('click', ()=> lightbox.classList.remove('open'));
  lightbox.addEventListener('click', e=>{ if(e.target===lightbox) lightbox.classList.remove('open'); });

  // final CTA
  qs('#yesBtn').addEventListener('click', onForgiveClick);

  // easter egg petals
  qs('#easterHeart').addEventListener('click', () => rainPetals(220, 7000));

  // cursor hearts
  document.addEventListener('mousemove', heartTrail);

  // scroll progress heart
  setupProgressHeart();

  // background particles
  startParticles();
});

// ---------- WhatsApp redirect + celebration ----------
function onForgiveClick(){
  burstConfetti();
  pulseCards();

  // open WhatsApp after a short moment
  setTimeout(() => {
    // Replace with Abiha’s real number — format: country code + number (no +, spaces, or dashes)
    const phone = "923341237799";
    const msg = encodeURIComponent("Yes 💕 I forgive you!");
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  }, 1600);
}

function burstConfetti(){
  const end = Date.now() + 900;
  (function frame(){
    confetti({particleCount: 5, angle: 60, spread: 65, origin: { x: 0 }});
    confetti({particleCount: 5, angle: 120, spread: 65, origin: { x: 1 }});
    if(Date.now() < end) requestAnimationFrame(frame);
  })();
}

function pulseCards(){
  qsa('.photo').forEach((el,i)=>{
    el.style.transition = 'transform .18s ease';
    el.style.transform = 'scale(1.05)';
    setTimeout(()=> el.style.transform = '', 220 + i*20);
  });
}

// ---------- petals ----------
function rainPetals(count=150, duration=5000){
  const wrap = qs('#petals');
  for(let i=0;i<count;i++){
    const span = document.createElement('span');
    span.textContent = '🌸';
    span.style.position='absolute';
    span.style.left = Math.random()*100 + 'vw';
    span.style.fontSize = 12 + Math.random()*18 + 'px';
    span.style.top = -20 - Math.random()*200 + 'px';
    span.style.animation = `fall ${5+Math.random()*5}s linear ${Math.random()*2}s forwards`;
    wrap.appendChild(span);
    setTimeout(()=> span.remove(), duration);
  }
}
// add fall keyframes
const styleEl = document.createElement('style');
styleEl.textContent = `@keyframes fall { to { transform: translateY(120vh) rotate(20deg); opacity:.85 } }`;
document.head.appendChild(styleEl);

// ---------- cursor heart trail ----------
let lastTrail = 0;
function heartTrail(e){
  const now = Date.now();
  if(now - lastTrail < 25) return; lastTrail = now;
  const h = document.createElement('div'); h.className='cursor-heart'; h.textContent = '❤';
  h.style.left = (e.clientX+8)+'px'; h.style.top = (e.clientY+8)+'px';
  h.style.opacity = .9; h.style.transition='transform .6s ease, opacity .6s ease';
  document.body.appendChild(h);
  requestAnimationFrame(()=>{h.style.transform='translateY(-18px) scale(0.8)'; h.style.opacity=.0;});
  setTimeout(()=> h.remove(), 650);
}

// ---------- scroll progress heart ----------
function setupProgressHeart(){
  const path = qs('#heartPath');
  const len = path.getTotalLength();
  const prog = path.cloneNode(); prog.classList.add('progress'); prog.style.strokeDasharray = len; prog.style.strokeDashoffset = len;
  qs('.progress-heart').appendChild(prog);
  const onScroll = () => {
    const h = document.documentElement, b = document.body;
    const scrollTop = h.scrollTop || b.scrollTop;
    const scrollHeight = (h.scrollHeight || b.scrollHeight) - h.clientHeight;
    const progress = Math.max(0, Math.min(1, scrollTop/scrollHeight));
    prog.style.strokeDashoffset = len * (1 - progress);
  };
  document.addEventListener('scroll', onScroll, {passive:true}); onScroll();
}

// ---------- soft particle bubbles ----------
function startParticles(){
  const c = qs('#particlesCanvas'); const ctx = c.getContext('2d');
  const DPR = window.devicePixelRatio || 1; let W, H; const bubbles = [];
  function resize(){ W = c.width = innerWidth*DPR; H = c.height = innerHeight*DPR; c.style.width=innerWidth+'px'; c.style.height=innerHeight+'px'; }
  resize(); window.addEventListener('resize', resize);
  for(let i=0;i<70;i++) bubbles.push({ x: Math.random()*W, y: Math.random()*H, r: 6+Math.random()*18, a: Math.random()*Math.PI*2, s: .2+Math.random()*1 });
  (function draw(){
    ctx.clearRect(0,0,W,H); ctx.globalAlpha = .35; ctx.fillStyle = '#ffffff';
    bubbles.forEach(b=>{
      b.x += Math.cos(b.a)*b.s; b.y += Math.sin(b.a*.7)*b.s; b.a += 0.003;
      if(b.x<-50) b.x=W+50; if(b.x>W+50) b.x=-50; if(b.y<-50) b.y=H+50; if(b.y>H+50) b.y=-50;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}
