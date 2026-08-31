import { useEffect, useRef, useState } from "react";

const WHATSAPP = "+256743911998";
const BASE_URL = typeof import.meta!=="undefined" && import.meta.env && import.meta.env.BASE_URL? import.meta.env.BASE_URL : "/";
const COVER = "/IMG-20260831-WA9770.jpg";
const musicFile = (f) => `${BASE_URL}${encodeURI(f)}`;

const SONGS = [
  { id: 1, title: "A Beautiful Moment", file: "A Beautiful Moment.mp3", size: "3.4 MB", dur: "2:45", cat: "Love" },
  { id: 2, title: "Close to My Heart", file: "Close to My Heart.mp3", size: "4.1 MB", dur: "3:12", cat: "Love" },
  { id: 3, title: "Endless Love Swing", file: "Endless Love Swing.mp3", size: "3.8 MB", dur: "3:05", cat: "Love" },
  { id: 4, title: "Esie My Queen", file: "Esie My Queen.mp3", size: "3.2 MB", dur: "2:58", cat: "Love" },
  { id: 5, title: "Esie, My Bestie", file: "Esie, My Bestie.mp3", size: "3.6 MB", dur: "3:20", cat: "Love" },
  { id: 6, title: "For the Rest of My Life", file: "For the Rest of My Life.mp3", size: "4.3 MB", dur: "3:45", cat: "Dedicated" },
  { id: 7, title: "Holy Spirit Flow", file: "Holy Spirit Flow.mp3", size: "3.9 MB", dur: "3:10", cat: "Gospel" },
  { id: 8, title: "I'm Still Rising", file: "I'm Still Rising.mp3", size: "3.5 MB", dur: "2:55", cat: "Vibe" },
  { id: 9, title: "Moonlight Counted Tears", file: "Moonlight Counted Tears.mp3", size: "4.0 MB", dur: "3:30", cat: "Love" },
  { id: 10, title: "My Heart Knows Your Name", file: "My Heart Knows Your Name.mp3", size: "3.7 MB", dur: "3:15", cat: "Love" },
  { id: 11, title: "One More Dance", file: "One More Dance.mp3", size: "3.3 MB", dur: "2:50", cat: "Love" },
  { id: 12, title: "Only You Know", file: "Only You Know.mp3", size: "3.1 MB", dur: "2:40", cat: "Love" },
  { id: 13, title: "Reza Towers Again", file: "Reza Towers Again.mp3", size: "4.2 MB", dur: "3:22", cat: "Vibe" },
  { id: 14, title: "Reza Towers", file: "Reza Towers.mp3", size: "3.9 MB", dur: "3:08", cat: "Vibe" },
  { id: 15, title: "Stay in this moment", file: "Stay in this moment.mp3", size: "3.4 MB", dur: "2:52", cat: "Love" },
  { id: 16, title: "Steve Vibes", file: "Steve Vibes.mp3", size: "3.6 MB", dur: "3:00", cat: "Vibe" },
  { id: 17, title: "SteveWiizy GenZ", file: "SteveWiizy GenZ.mp3", size: "4.5 MB", dur: "3:50", cat: "GenZ" },
];

const CATS = ["All","Love","Gospel","GenZ","Vibe","Dedicated"];

export default function App(){
  const audioRef=useRef(null);
  const [current,setCurrent]=useState(null);
  const [playing,setPlaying]=useState(false);
  const [likes,setLikes]=useState({});
  const [cat,setCat]=useState("All");
  const getUrl=(s)=>musicFile(s.file);
  const filtered = cat==="All"? SONGS : SONGS.filter(s=>s.cat===cat);

  useEffect(()=>{
    if(!current||!audioRef.current) return;
    const a=audioRef.current; a.src=getUrl(current); a.load();
    a.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false));
  },[current]);

  const play=(song)=>{
    if(current?.id===song.id){
      if(audioRef.current.paused){audioRef.current.play().then(()=>setPlaying(true))}
      else{audioRef.current.pause(); setPlaying(false)}
    }else setCurrent(song);
  };

  return(
    <>
    <style>{`
      body{margin:0;background:#0a0a0a;color:white;font-family:Inter,system-ui,sans-serif}
    .site{min-height:100vh;padding-bottom:90px}
    .top{text-align:center;padding:35px 18px 15px}
    .avatar{width:110px;height:110px;border-radius:50%;margin:0 auto 14px;border:3px solid #a855f7;overflow:hidden;background:#222}
    .avatar img{width:100%;height:100%;object-fit:cover}
      h1{margin:0;font-size:32px;font-weight:900;letter-spacing:-1px}
    .sub{color:#a855f7;font-weight:700;margin-top:6px}
    .price{color:#888;margin-top:8px;font-size:14px}
    .section{max-width:600px;margin:20px auto;padding:0 14px}
    .sec-title{font-size:20px;font-weight:800;margin-bottom:4px}
    .sec-note{color:#888;font-size:12px;margin-bottom:12px}
    .cats{display:flex;gap:8px;overflow-x:auto;padding:6px 0 14px;scrollbar-width:none}
    .cats::-webkit-scrollbar{display:none}
    .cat{white-space:nowrap;border:1px solid #2a2a2a;background:#171717;color:#999;padding:8px 14px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer}
    .cat.active{background:#a855f7;border-color:#a855f7;color:white}
    .card{background:#171717;border:1px solid #262626;border-radius:16px;padding:12px;display:flex;align-items:center;gap:12px;margin-bottom:10px}
    .card.active{border-color:#a855f7;background:#1e1a24}
    .cover{width:56px;height:56px;border-radius:12px;overflow:hidden;flex-shrink:0;background:#222}
    .cover img{width:100%;height:100%;object-fit:cover}
    .info{flex:1;min-width:0}
    .title{font-weight:700;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .meta{color:#888;font-size:12px;margin-top:3px}
    .actions{display:flex;gap:6px;margin-top:6px;flex-wrap:wrap}
    .btn{border:0;border-radius:8px;padding:6px 10px;font-size:11px;font-weight:800;cursor:pointer;text-decoration:none}
    .btn-play{width:42px;height:42px;border-radius:10px;background:#ff8c00;color:white;font-size:16px;flex-shrink:0}
    .btn-dl{background:#25d366;color:#05210f}
    .btn-order{background:white;color:#111}
    .btn-like{background:none;color:#777;border:0;font-size:12px;cursor:pointer}
    .player{position:fixed;bottom:0;left:0;right:0;background:#111;border-top:1px solid #222;padding:12px 16px;display:flex;align-items:center;gap:12px}
    `}</style>

    <audio ref={audioRef} style={{display:'none'}} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onEnded={()=>setPlaying(false)} />

    <div className="site">
      <div className="top">
        <div className="avatar"><img src={COVER} alt="Steve" /></div>
        <h1>STEVE WIIZY</h1>
        <div className="sub">GenZ Love Songs • Custom Name Songs</div>
        <div className="price">Starting from 10,000 UGX - Negotiable • 24hr Delivery</div>
      </div>

      <div className="section">
        <div className="sec-title">🎵 Free Preview Songs ({filtered.length})</div>
        <div className="sec-note">Full custom version with your name = 8.5 MB High Quality</div>

        <div className="cats">
          {CATS.map(c=><button key={c} className={`cat ${cat===c?'active':''}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>

        {filtered.map(s=>{
          const active=current?.id===s.id;
          return(
            <div key={s.id} className={`card ${active?'active':''}`}>
              <div className="cover"><img src={COVER} alt="" /></div>
              <div className="info">
                <div className="title">{s.title}</div>
                <div className="meta">{s.cat} • {s.size} • {s.dur}</div>
                <div className="actions">
                  <a className="btn btn-dl" href={getUrl(s)} download>Download</a>
                  <button className="btn btn-order" onClick={()=>window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi Steve, I want a song like "${s.title}"`)}`,'_blank')}>Order Similar</button>
                  <button className="btn-like" onClick={()=>setLikes(o=>({...o,[s.id]:(o[s.id]||0)+1}))}>❤️ {likes[s.id]||0}</button>
                </div>
              </div>
              <button className="btn-play" onClick={()=>play(s)}>{active&&playing?'❚❚':'▶'}</button>
            </div>
          )
        })}
      </div>
    </div>

    {current && <div className="player"><div style={{flex:1}}><div style={{fontWeight:800}}>{current.title}</div><div style={{color:'#a855f7',fontSize:11}}>{playing?'Playing...':'Paused'}</div></div><button className="btn-play" onClick={()=>play(current)}>{playing?'❚❚':'▶'}</button></div>}
    </>
  )
     }
