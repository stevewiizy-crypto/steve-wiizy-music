import { useState, useRef, useEffect } from 'react';

const W1="256743911998";
const W2="2567045";

const SONGS=[
{t:'Endless Love Swing', f:'/Endless%20Love%20Swing.mp3', cat:'Love'},
{t:'Esie, My Bestie', f:'/Esie,%20My%20Bestie.mp3', cat:'Love'},
{t:'For the Rest of My Life', f:'/For%20the%20Rest%20of%20My%20Life.mp3', cat:'Dedicated'},
{t:'Holy Spirit Flow', f:'/Holy%20Spirit%20Flow.mp3', cat:'Gospel'},
{t:'Moonlight Counted Tears', f:'/Moonlight%20Counted%20Tears.mp3', cat:'Love'},
{t:'Reza Towers Again', f:'/Reza%20Towers%20Again.mp3', cat:'Vibe'},
{t:'Reza Towers', f:'/Reza%20Towers.mp3', cat:'Vibe'},
{t:'Steve Vibes', f:'/Steve%20Vibes.mp3', cat:'Vibe'},
{t:'SteveWiizy GenZ', f:'/SteveWiizy%20GenZ.mp3', cat:'GenZ'},
{t:'SteveWiizy GenZ2', f:'/SteveWiizy%20GenZ2.mp3', cat:'GenZ'},
];

const CATS = ["All","Love","Birthday","Gospel","GenZ","Motivation","Vibe","Dedicated"];

export default function App(){
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(()=> JSON.parse(localStorage.getItem('likes')||'{}'));
  const [likedByMe, setLikedByMe] = useState(()=> JSON.parse(localStorage.getItem('likedByMe')||'[]'));
  const audioRef = useRef(null);

  const filtered = SONGS.filter(s => {
    const matchSearch = s.t.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCat==="All" || s.cat===activeCat;
    return matchSearch && matchCat;
  });

  useEffect(()=>{
    if(current && audioRef.current){
      audioRef.current.src = current.f;
      audioRef.current.play().then(()=>setIsPlaying(true)).catch(()=>{});
    }
  },[current]);

  const togglePlay = (song)=>{
    if(current?.t===song.t){
      if(isPlaying){ audioRef.current.pause(); setIsPlaying(false); }
      else{ audioRef.current.play(); setIsPlaying(true); }
    } else { setCurrent(song); }
  };

  const handleLike = (t)=>{
    if(likedByMe.includes(t)) return;
    const newLikes = {...likes, [t]:(likes[t]||0)+1};
    const newMe = [...likedByMe, t];
    setLikes(newLikes); setLikedByMe(newMe);
    localStorage.setItem('likes', JSON.stringify(newLikes));
    localStorage.setItem('likedByMe', JSON.stringify(newMe));
  };

  return(
    <div className="min-h-screen bg-black text-white p-4 pb-28">
      <div className="text-center py-4">
        <h1 className="text-4xl font-black text-red-500">STEVE WIIZY</h1>
        <p className="text-zinc-400 text-sm">Artist • Songwriter • Producer | Kampala, Uganda</p>
        <p className="text-xl font-bold mt-4">Your Story. Your Vibe. Your Song.</p>
        <p className="text-zinc-500 text-sm">Download 10 latest songs FREE. Custom songs from 10k UGX - negotiable for students!</p>
      </div>

      <div className="max-w-md mx-auto mt-4">
        <input type="text" placeholder="🔍 Search songs..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full p-3 rounded-full bg-zinc-800 text-white outline-none border border-zinc-700" />
      </div>

      <h2 className="text-xl font-bold mt-6 mb-3">10 Latest Tracks 🔥 - Free Download</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {CATS.map(c=>(
          <button key={c} onClick={()=>setActiveCat(c)} className={`px-4 py-1.5 rounded-full text-sm ${activeCat===c?'bg-red-600 text-white':'bg-zinc-800 text-zinc-300'}`}>{c}</button>
        ))}
      </div>

      <div className="grid gap-4 max-w-md mx-auto">
        {filtered.map((song, i)=>(
          <div key={i} className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
            <p className="font-bold text-center">❤️ {song.t}</p>
            <p className="text-red-500 text-xs text-center mb-3">{song.cat}</p>
            <div className="flex justify-between items-center bg-zinc-800 rounded-full px-3 py-2 mb-3">
              <button onClick={()=>togglePlay(song)} className="text-lg">{current?.t===song.t && isPlaying? "⏸️" : "▶️"} {audioRef.current? `${Math.floor(audioRef.current?.currentTime||0)}s` : "0:00"}</button>
              <span className="text-xs">{current?.t===song.t && isPlaying? "Playing..." : "Tap play"}</span>
            </div>
            <div className="flex gap-2 mb-3">
              <a href={song.f} download className="flex-1 bg-green-400 text-black text-center py-2 rounded-xl font-bold text-sm">⬇️ DOWNLOAD</a>
              <a href={`https://wa.me/${W1}?text=Hi Steve, I want a song like ${song.t}`} className="flex-1 bg-white text-black text-center py-2 rounded-xl font-bold text-sm">💬 Order Similar</a>
            </div>
            <div className="flex gap-3 text-sm items-center">
              <button onClick={()=>handleLike(song.t)} className="flex items-center gap-1">❤️ {likes[song.t]||0}</button>
              <span>☆ Save</span>
              <span>↗️ Share</span>
            </div>
            <div className="flex gap-2 mt-3">
              <input placeholder="Comment..." className="flex-1 bg-black border border-zinc-700 rounded-full px-3 py-1.5 text-sm" />
              <button className="bg-zinc-700 px-4 py-1.5 rounded-full text-sm">Post</button>
            </div>
          </div>
        ))}
      </div>

      <audio ref={audioRef} onEnded={()=>setIsPlaying(false)} onTimeUpdate={()=>{}} />
    </div>
  );
  }
