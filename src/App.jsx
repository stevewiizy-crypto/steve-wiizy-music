import { useState } from 'react'
const W1="256743911998"; const W2="256704536";
export default function App(){
const [nav,setNav]=useState('home');
return (
<div style={{background:'#070708',color:'#fff',minHeight:'100vh',fontFamily:'sans-serif'}}>
<nav style={{position:'sticky',top:0,background:'#000',padding:'12px',display:'flex',justifyContent:'space-between',zIndex:10}}>
<div style={{fontWeight:800}}><span style={{color:'#ff0a3b'}}>STEVE</span> WIIZY MUSIC</div>
<div style={{display:'flex',gap:'8px'}}>
{['home','music','order','contact'].map(t=><button key={t} onClick={()=>document.getElementById(t)?.scrollIntoView({behavior:'smooth'})} style={{background:'#222',color:'#fff',border:'none',padding:'8px 12px',borderRadius:'20px'}}>{t}</button>)}
</div>
</nav>

<section id="home" style={{padding:'60px 20px',textAlign:'center'}}>
<h1 style={{color:'#ff0a3b',fontSize:'42px',margin:0}}>STEVE WIIZY</h1>
<h2>Your Story. Your Vibe. Your Song.</h2>
<p style={{color:'#aaa',maxWidth:'600px',margin:'10px auto'}}>A creative music space where stories, emotions, celebrations and ideas are turned into memorable songs. Free to browse. Payment ONLY for custom orders.</p>
<button onClick={()=>document.getElementById('music')?.scrollIntoView({behavior:'smooth'})} style={{background:'#ff0a3b',color:'#fff',border:'none',padding:'14px 28px',borderRadius:'30px',fontWeight:'700',marginTop:'12px'}}>Create My Song</button>
</section>

<section id="music" style={{padding:'20px'}}>
<h2 style={{textAlign:'center',letterSpacing:'8px'}}>MUSIC</h2>
<h2 style={{textAlign:'center'}}>Your 10 Latest Tracks 🔥</h2>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',maxWidth:'800px',margin:'0 auto'}}>
{[
{t:'Endless Love Swing', f:'/Endless%20Love%20Swing.mp3'},
{t:'Esie, My Bestie', f:'/Esie,%20My%20Bestie.mp3'},
{t:'For the Rest of My Life', f:'/For%20the%20Rest%20of%20My%20Life.mp3'},
{t:'Holy Spirit Flow', f:'/Holy%20Spirit%20Flow.mp3'},
{t:'Moonlight Counted Tears', f:'/Moonlight%20Counted%20Tears.mp3'},
{t:'Reza Towers Again', f:'/Reza%20Towers%20Again.mp3'},
{t:'Reza Towers', f:'/Reza%20Towers.mp3'},
{t:'Steve Vibes', f:'/Steve%20Vibes.mp3'},
{t:'SteveWiizy GenZ', f:'/SteveWiizy%20GenZ.mp3'},
{t:'SteveWiizy GenZ2', f:'/SteveWiizy%20Genz2.mp3'}
].map(s=>(
<div key={s.t} style={{background:'#121212',border:'1px solid #333',borderRadius:'16px',padding:'14px'}}>
<p style={{fontWeight:'700',margin:'0 0 8px'}}>🎵 {s.t}</p>
<audio controls src={s.f} style={{width:'100%'}} preload="none"></audio>
</div>
))}
</div>
</section>

<section id="order" style={{padding:'60px 20px',textAlign:'center'}}>
<h2>Order Custom Song</h2>
<p>WhatsApp: {W1} / {W2}</p>
<a href={`https://wa.me/${W1}?text=Hi Steve Wiizy, I want a custom song`} style={{background:'#25D366',color:'#fff',padding:'14px 28px',borderRadius:'30px',textDecoration:'none',display:'inline-block',margin:'8px'}}>Order on WhatsApp 1</a>
<a href={`https://wa.me/${W2}?text=Hi Steve Wiizy, I want a custom song`} style={{background:'#128C7E',color:'#fff',padding:'14px 28px',borderRadius:'30px',textDecoration:'none',display:'inline-block',margin:'8px'}}>Order on WhatsApp 2</a>
</section>

<section id="contact" style={{padding:'40px',textAlign:'center',color:'#888'}}>
<p>© 2026 Steve Wiizy Music - Kampala, Uganda</p>
</section>
</div>
)
            }
