import { useState } from 'react'
const W1="256743911998"; const W2="256763012851";
export default function App(){
const [nav,setNav]=useState('home');
return (
<div style={{background:'#070708',color:'#fff',minHeight:'100vh',fontFamily:'system-ui'}}>
<nav style={{position:'sticky',top:0,background:'#070708',borderBottom:'1px solid #222',padding:'14px',display:'flex',justifyContent:'space-between'}}>
<div style={{fontWeight:800}}><span style={{color:'#ff0a3b'}}>STEVE WIIZY</span> MUSIC</div>
<div style={{display:'flex',gap:'8px'}}>
{['home','music','order','contact'].map(id=><button key={id} onClick={()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})} style={{background:'#1a1a1a',border:'1px solid #222',color:'#fff',padding:'6px 12px',borderRadius:'20px',fontSize:'12px'}}>{id}</button>)}
</div>
</nav>

<section id="home" style={{padding:'60px 20px',textAlign:'center'}}>
<h1 style={{color:'#ff0a3b',fontSize:'42px',margin:0}}>STEVE WIIZY<br/><span style={{fontSize:'14px',letterSpacing:'8px',color:'#fff'}}>MUSIC</span></h1>
<h2>Your Story. Your Vibe. Your Song.</h2>
<p style={{color:'#aaa',maxWidth:'600px',margin:'10px auto'}}>A creative music space where stories, emotions, celebrations and ideas are turned into memorable songs. Free to browse. Payment ONLY for custom orders.</p>
<button onClick={()=>document.getElementById('order')?.scrollIntoView({behavior:'smooth'})} style={{background:'#ff0a3b',border:'none',color:'#fff',padding:'14px 24px',borderRadius:'100px',fontWeight:800}}>Create My Song</button>
</section>

<section id="music" style={{padding:'20px 16px'}}>
<h3>Music Categories • All, Dedication, Love, Birthday, Appreciation, School, Motivation</h3>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:'12px',marginTop:'12px'}}>
{[{t:'Your Story Anthem',c:'🎤'},{t:'Birthday For Bestie',c:'🎂'},{t:'Thank You Mama',c:'❤️'},{t:'My School Pride',c:'🎓'},{t:'Love Letter',c:'💌'},{t:'Hustle Motivation',c:'🔥'}].map((s,i)=><div key={i} style={{background:'#121212',border:'1px solid #222',borderRadius:'16px',padding:'16px',textAlign:'center'}}><div style={{fontSize:'32px'}}>{s.c}</div><div style={{fontWeight:700,fontSize:'13px',marginTop:'8px'}}>{s.t}</div><div style={{display:'flex',gap:'6px',justifyContent:'center',marginTop:'8px'}}><span>❤️</span><span>⭐</span><span>↗️</span><span>⬇️</span></div></div>)}
</div>
</section>

<section id="order" style={{padding:'20px 16px'}}>
<div style={{background:'#ff0a3b',borderRadius:'20px',padding:'20px',textAlign:'center'}}><h3>Have a story, occasion or idea?</h3><p>Let's turn it into a song.</p></div>
<div style={{background:'#121212',border:'1px solid #222',borderRadius:'16px',padding:'16px',marginTop:'12px',display:'grid',gap:'10px',maxWidth:'600px',margin:'12px auto'}}>
<input placeholder="Your Name" style={{background:'#1a1a1a',border:'1px solid #222',color:'#fff',padding:'12px',borderRadius:'10px'}}/>
<input placeholder="WhatsApp" style={{background:'#1a1a1a',border:'1px solid #222',color:'#fff',padding:'12px',borderRadius:'10px'}}/>
<textarea placeholder="Your story..." style={{background:'#1a1a1a',border:'1px solid #222',color:'#fff',padding:'12px',borderRadius:'10px',height:'80px'}}/>
<a href={`https://wa.me/${W1}?text=Hello%20Steve%20Wiizy%20Music%20I%20want%20to%20order%20a%20custom%20song`} target="_blank" style={{background:'#25D366',color:'#fff',padding:'14px',borderRadius:'100px',textAlign:'center',textDecoration:'none',fontWeight:800}}>Send Order via WhatsApp →</a>
</div>
</section>

<section id="contact" style={{padding:'20px 16px 100px',textAlign:'center'}}>
<div style={{background:'#fff',color:'#000',borderRadius:'16px',padding:'18px',maxWidth:'600px',margin:'0 auto'}}>
<h3>Steve Wiizy Music</h3>
<p style={{fontSize:'12px',color:'#666'}}>Custom songs • Inquiries • Collaborations</p>
<a href={`https://wa.me/${W1}`} style={{display:'block',background:'#000',color:'#fff',padding:'14px',borderRadius:'100px',textDecoration:'none',fontWeight:800,marginTop:'10px'}}>+256 743 911 998</a>
<a href={`https://wa.me/${W2}`} style={{display:'block',background:'#ff0a3b',color:'#fff',padding:'14px',borderRadius:'100px',textDecoration:'none',fontWeight:800,marginTop:'8px'}}>+256 763 012 851</a>
</div>
<p style={{color:'#444',fontSize:'10px',marginTop:'12px'}}>© 2026 Steve Wiizy Music • Kampala</p>
</section>
</div>
)
}
