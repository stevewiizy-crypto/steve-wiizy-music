import { useState } from 'react';
const W1="256743911998";
const SONGS=[
{t:'Endless Love Swing',f:'/Endless%20Love%20Swing.mp3',cat:'Love',icon:'❤️'},
{t:'Esie, My Bestie',f:'/Esie,%20My%20Bestie.mp3',cat:'Love',icon:'🎶'},
{t:'For the Rest of My Life',f:'/For%20the%20Rest%20of%20My%20Life.mp3',cat:'Dedicated',icon:'🎤'},
{t:'Holy Spirit Flow',f:'/Holy%20Spirit%20Flow.mp3',cat:'Gospel',icon:'🙏'},
{t:'Moonlight Counted Tears',f:'/Moonlight%20Counted%20Tears.mp3',cat:'Love',icon:'🌙'},
{t:'Reza Towers Again',f:'/Reza%20Towers%20Again.mp3',cat:'Vibe',icon:'🏢'},
{t:'Reza Towers',f:'/Reza%20Towers.mp3',cat:'Vibe',icon:'🎧'},
{t:'Steve Vibes',f:'/Steve%20Vibes.mp3',cat:'Vibe',icon:'🔥'},
{t:'SteveWiizy GenZ',f:'/SteveWiizy%20GenZ.mp3',cat:'GenZ',icon:'💿'},
{t:'SteveWiizy GenZ2',f:'/SteveWiizy%20GenZ2.mp3',cat:'GenZ',icon:'🎵'},
];
const CATS=["All","Love","Birthday","Gospel","GenZ","Motivation","Vibe","Dedicated"];

export default function App(){
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("All");
  const [likes,setLikes]=useState({});
  const list=SONGS.filter(s=>(cat==="All"||s.cat===cat)&&s.t.toLowerCase().includes(search.toLowerCase()));
  return(
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-red-600 flex items-center justify-center text-2xl font-black">SW</div>
          <h1 className="text-4xl font-black text-red-500 mt-2">STEVE WIIZY</h1>
          <p className="text-zinc-400 text-sm">Artist • Songwriter • Producer | Kampala, Uganda</p>
          <h2 className="text-2xl font-bold mt-4">Your Story. Your Vibe. Your Song.</h2>
          <p className="text-zinc-500 text-sm mt-1">Download 10 latest songs FREE. Custom songs from 10k UGX - negotiable for students!</p>
        </div>

        <div className="mt-6">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search songs... love, gospel, vibe" className="w-full p-4 rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 outline-none" />
        </div>

        <h3 className="text-xl font-bold mt-6">10 Latest Tracks 🔥 - Free Download</h3>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {CATS.map(c=><button key={c} onClick={()=>setCat(c)} className={`px-4 py-2 rounded-full text-sm border ${cat===c?'bg-red-600 border-red-600':'bg-zinc-900 border-zinc-800'}`}>{c}</button>)}
        </div>

        <div className="grid gap-4 mt-6">
          {list.map((s,i)=>(
            <div key={i} className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
              <p className="font-bold text-center">{s.icon} {s.t}</p>
              <p className="text-red-600 text-xs text-center mt-1">{s.cat}</p>
              <audio controls className="w-full mt-3" src={s.f}></audio>
              <div className="flex gap-2 mt-3">
                <a href={s.f} download className="flex-1 bg-green-300 text-black font-bold text-sm py-3 rounded-xl text-center">⬇️ DOWNLOAD</a>
                <a href={`https://wa.me/${W1}?text=Hi Steve, I want similar to ${s.t}`} className="flex-1 bg-white text-black font-bold text-sm py-3 rounded-xl text-center">💬 Order Similar</a>
              </div>
              <div className="flex gap-3 mt-3 text-sm">
                <button onClick={()=>setLikes({...likes,[s.t]:(likes[s.t]||0)+1})}>❤️ {likes[s.t]||0}</button>
                <span>☆ Save</span><span>↗️ Share</span>
              </div>
              <div className="flex gap-2 mt-3">
                <input placeholder="Comment..." className="flex-1 bg-black border border-zinc-700 rounded-full px-3 py-2 text-sm outline-none" />
                <button className="bg-zinc-800 px-4 rounded-full text-sm">Post</button>
              </div>
            </div>
          ))}
          {list.length===0 && <p className="text-center text-zinc-500 py-10">No songs found for "{search}"</p>}
        </div>

        <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 mt-10 text-center">
          <h3 className="font-bold">Order Custom Song 🎤 From 10k!</h3>
          <p className="text-xs text-zinc-500 mt-1">Starting at 10,000 UGX - Students welcome! Negotiable!</p>
          <a href={`https://wa.me/${W1}?text=Hi Steve, I want custom song`} className="block bg-green-500 text-white font-bold py-3 rounded-full mt-4">💬 Negotiate from 10k on WhatsApp</a>
          <a href={`https://wa.me/${W1}`} className="block bg-white text-black font-bold py-3 rounded-full mt-2">WhatsApp 2</a>
        </div>

        <p className="text-center text-[10px] text-zinc-600 mt-8 pb-10">© 2026 Steve Wiizy Music • Kampala | Search on Google: Steve Wiizy Music</p>
      </div>
    </div>
  );
            }
