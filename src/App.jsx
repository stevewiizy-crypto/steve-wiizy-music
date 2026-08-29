import { useState } from 'react'
const W1="256743911998"; const W2="256704536";
const SONGS=[
{t:'Endless Love Swing', f:'/Endless%20Love%20Swing.mp3', cat:'Love', emo:'❤️'},
{t:'Esie, My Bestie', f:'/Esie,%20My%20Bestie.mp3', cat:'Birthday', emo:'🎂'},
{t:'For the Rest of My Life', f:'/For%20the%20Rest%20of%20My%20Life.mp3', cat:'Dedicated', emo:'🎤'},
{t:'Holy Spirit Flow', f:'/Holy%20Spirit%20Flow.mp3', cat:'Gospel', emo:'🙏'},
{t:'Moonlight Counted Tears', f:'/Moonlight%20Counted%20Tears.mp3', cat:'Love', emo:'🌙'},
{t:'Reza Towers Again', f:'/Reza%20Towers%20Again.mp3', cat:'Motivation', emo:'🏢'},
{t:'Reza Towers', f:'/Reza%20Towers.mp3', cat:'Motivation', emo:'🎓'},
{t:'Steve Vibes', f:'/Steve%20Vibes.mp3', cat:'Vibe', emo:'🎵'},
{t:'SteveWiizy GenZ', f:'/SteveWiizy%20GenZ.mp3', cat:'GenZ', emo:'🔥'},
{t:'SteveWiizy GenZ2', f:'/SteveWiizy%20Genz2.mp3', cat:'GenZ', emo:'💿'},
];
export default function App(){
const [nav,setNav]=useState('All');
const [likes,setLikes]=useState({});
const [favs,setFavs]=useState({});
const [cmts,setCmts]=useState({});
const [inputs,setInputs]=useState({});
const [form,setForm]=useState({name:'',story:'',style:'Love Song',occasion:'Birthday',budget:'50000',deadline:'3 days'});
const filtered = nav==='All' ? SONGS : SONGS.filter(s=>s.cat===nav);
const waMsg = `Hi Steve Wiizy! I want custom song:%0AName: ${form.name}%0AStyle: ${form.style}%0AOccasion: ${form.occasion}%0ABudget: UGX ${form.budget} (negotiable)%0ADeadline: ${form.deadline}%0AStory: ${form.story}`;
return (
<div style={{background:'#070708',color:'#fff',minHeight:'100vh',fontFamily:'system-ui'}}>
<nav style={{position:'sticky',top:0,background:'#000',padding:'12px',display:'flex',justifyContent:'space-between',zIndex:20,borderBottom:'1px solid #222'}}>
<div style={{fontWeight:900}}><span style={{color:'#ff0a3b'}}>STEVE</span> WIIZY</div>
<div style={{display:'flex',gap:'6px'}}>{['home','music','order','contact'].map(t=><button key={t} onClick={()=>document.getElementById(t)?.scrollIntoView({behavior:'smooth'})} style={{background:'#1a1a1a',color:'#fff',border:'none',padding:'7px 12px',borderRadius:'20px',fontSize:'11px'}}>{t}</button>)}</div>
</nav>
<section id="home" style={{padding:'50px 20px',textAlign:'center'}}>
<div style={{width:'92px',height:'92px',background:'linear-gradient(135deg,#ff0a3b,#ffb700)',borderRadius:'50%',margin:'0 auto 14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'34px',fontWeight:900}}>SW</div>
<h1 style={{color:'#ff0a3b',fontSize:'38px',margin:0}}>STEVE WIIZY</h1>
<p style={{color:'#aaa',fontSize:'13px'}}>Artist • Songwriter • Producer | Kampala</p>
<h2 style={{marginTop:'16px'}}>Your Story. Your Vibe. Your Song.</h2>
<p style={{color:'#777',maxWidth:'560px',margin:'10px auto',fontSize:'13px'}}>Free to browse. Payment ONLY for custom orders - negotiable for students & small budgets.</p>
</section>
<section id="music" style={{padding:'20px'}}>
<h3 style={{textAlign:'center'}}>Your 10 Latest Tracks 🔥</h3>
<div style={{display:'flex',gap:'7px',flexWrap:'wrap',justifyContent:'center',marginBottom:'16px'}}>
{['All','Love','Birthday','Gospel','GenZ','Motivation','Vibe','Dedicated'].map(c=><button key={c} onClick={()=>setNav(c)} style={{background:nav===c?'#ff0a3b':'#151515',color:'#fff',border:'1px solid #333',padding:'7px 14px',borderRadius:'20px',fontSize:'11px'}}>{c}</button>)}
</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',maxWidth:'900px',margin:'0 auto'}}>
{filtered.map(s=>(
<div key={s.t} style={{background:'#111',border:'1px solid #222',borderRadius:'14px',padding:'11px'}}>
<p style={{fontWeight:'700',margin:'0',fontSize:'12px'}}>{s.emo} {s.t}</p>
<p style={{fontSize:'9px',color:'#ff0a3b'}}>{s.cat}</p>
<audio controls src={s.f} style={{width:'100%',height:'32px',margin:'6px 0'}} preload="none"></audio>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',margin:'8px 0'}}>
<a href={s.f} download={s.t} style={{background:'#90EE90',color:'#000',padding:'8px',borderRadius:'10px',fontSize:'11px',fontWeight:'800',textAlign:'center',textDecoration:'none',border:'1px solid #4CAF50'}}>⬇️ DOWNLOAD</a>
<a href={`https://wa.me/${W1}?text=Hi, I want ${s.t}`} style={{background:'#fff',color:'#000',padding:'8px',borderRadius:'10px',fontSize:'11px',fontWeight:'800',textAlign:'center',textDecoration:'none'}}>💬 Order Similar</a>
</div>
<div style={{display:'flex',gap:'10px',fontSize:'13px'}}>
<span onClick={()=>setLikes(p=>({...p,[s.t]:(p[s.t]||0)+1}))} style={{cursor:'pointer'}}>❤️ {likes[s.t]||0}</span>
<span onClick={()=>setFavs(p=>({...p,[s.t]:!p[s.t]}))} style={{cursor:'pointer'}}>{favs[s.t]?'⭐ Saved':'☆ Save'}</span>
<span onClick={()=>{navigator.clipboard.writeText(window.location.href)}} style={{cursor:'pointer'}}>↗️ Share</span>
</div>
<div style={{marginTop:'8px',display:'flex',gap:'4px'}}>
<input value={inputs[s.t]||''} onChange={e=>setInputs(p=>({...p,[s.t]:e.target.value}))} placeholder="Comment..." style={{flex:1,background:'#000',border:'1px solid #333',color:'#fff',padding:'6px 8px',borderRadius:'8px',fontSize:'11px'}}/>
<button onClick={()=>{if(!inputs[s.t])return; setCmts(p=>({...p,[s.t]:[...(p[s.t]||[]),inputs[s.t]]})); setInputs(q=>({...q,[s.t]:''}))}} style={{background:'#222',border:'none',color:'#fff',padding:'6px 12px',borderRadius:'8px',fontSize:'11px'}}>Post</button>
</div>
<div style={{fontSize:'10px',color:'#aaa',marginTop:'6px'}}>{(cmts[s.t]||[]).map((c,i)=><div key={i}>💬 {c}</div>)}</div>
</div>
))}
</div>
</section>
<section id="order" style={{padding:'30px 16px',maxWidth:'620px',margin:'0 auto'}}>
<h2 style={{textAlign:'center'}}>Order Custom Song 🎤 - Negotiable!</h2>
<p style={{textAlign:'center',color:'#888',fontSize:'12px'}}>Small payments welcome! Students discount!</p>
<div style={{background:'#111',border:'1px solid #222',borderRadius:'18px',padding:'16px',marginTop:'16px',display:'grid',gap:'12px'}}>
<input placeholder="Your Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{background:'#000',border:'1px solid #333',color:'#fff',padding:'13px',borderRadius:'12px'}}/>
<textarea placeholder="Describe your story / who it's for..." value={form.story} onChange={e=>setForm({...form,story:e.target.value})} rows="3" style={{background:'#000',border:'1px solid #333',color:'#fff',padding:'13px',borderRadius:'12px'}}/>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
<select value={form.style} onChange={e=>setForm({...form,style:e.target.value})} style={{background:'#000',color:'#fff',border:'1px solid #333',padding:'12px',borderRadius:'10px'}}><option>Love Song</option><option>Birthday</option><option>Gospel</option><option>GenZ / Rap</option><option>School</option><option>Dedicated</option></select>
<select value={form.occasion} onChange={e=>setForm({...form,occasion:e.target.value})} style={{background:'#000',color:'#fff',border:'1px solid #333',padding:'12px',borderRadius:'10px'}}><option>Birthday</option><option>Love</option><option>Appreciation</option><option>Graduation</option><option>Business</option><option>Just Vibes</option></select>
</div>
<div style={{background:'#000',padding:'12px',borderRadius:'12px'}}><label style={{fontSize:'11px'}}>Budget UGX (negotiable)</label><input type="range" min="20000" max="500000" step="5000" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} style={{width:'100%',accentColor:'#90EE90'}}/><div style={{color:'#90EE90',fontWeight:'800',fontSize:'12px'}}>UGX {form.budget} - negotiable!</div></div>
<select value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})} style={{background:'#000',color:'#fff',border:'1px solid #333',padding:'12px',borderRadius:'10px'}}><option>24 hours</option><option>3 days</option><option>1 week</option><option>Flexible</option></select>
<div style={{fontSize:'11px',color:'#aaa',background:'#000',padding:'12px',borderRadius:'12px',border:'1px dashed #333'}}><b>Admission:</b> 20% deposit to start. Balance after preview. No song = full refund. Students discount - we negotiate!</div>
<a href={`https://wa.me/${W1}?text=${waMsg}`} style={{background:'#25D366',color:'#fff',padding:'15px',borderRadius:'14px',textAlign:'center',textDecoration:'none',fontWeight:'800'}}>💬 Negotiate & Order on WhatsApp</a>
<a href={`https://wa.me/${W2}?text=${waMsg}`} style={{background:'#fff',color:'#000',padding:'15px',borderRadius:'14px',textAlign:'center',textDecoration:'none',fontWeight:'800'}}>WhatsApp 2</a>
</div>
</section>
<section style={{padding:'20px',textAlign:'center',color:'#666',fontSize:'11px'}}>
<p>© 2026 Steve Wiizy Music - Kampala | Upload profile.jpg to public folder for your photo</p>
</section>
</div>
)
}
