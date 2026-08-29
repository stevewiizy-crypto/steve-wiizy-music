import { useState } from 'react';
const W1="256743911998";
const SONGS=[
{t:'Endless Love Swing',f:'/Endless%20Love%20Swing.mp3',cat:'Love'},
{t:'Esie, My Bestie',f:'/Esie,%20My%20Bestie.mp3',cat:'Love'},
{t:'For the Rest of My Life',f:'/For%20the%20Rest%20of%20My%20Life.mp3',cat:'Dedicated'},
{t:'Holy Spirit Flow',f:'/Holy%20Spirit%20Flow.mp3',cat:'Gospel'},
{t:'Moonlight Counted Tears',f:'/Moonlight%20Counted%20Tears.mp3',cat:'Love'},
{t:'Reza Towers Again',f:'/Reza%20Towers%20Again.mp3',cat:'Vibe'},
{t:'Reza Towers',f:'/Reza%20Towers.mp3',cat:'Vibe'},
{t:'Steve Vibes',f:'/Steve%20Vibes.mp3',cat:'Vibe'},
{t:'SteveWiizy GenZ',f:'/SteveWiizy%20GenZ.mp3',cat:'GenZ'},
{t:'SteveWiizy GenZ2',f:'/SteveWiizy%20GenZ2.mp3',cat:'GenZ'},
];
const CATS=["All","Love","Birthday","Gospel","GenZ","Motivation","Vibe","Dedicated"];

export default function App(){
  const [page,setPage]=useState("home");
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("All");
  const [likes,setLikes]=useState({});
  const [form,setForm]=useState({name:"",story:"",type:"Love Song",budget:10000});
  const filtered=SONGS.filter(s=>(cat==="All"||s.cat===cat)&&s.t.toLowerCase().includes(search.toLowerCase()));

  const Card=({s})=>(
    <div className="bg-[#161616] rounded-[20px] p-4 border border-zinc-800">
      <p className="font-bold text-[14px] text-center">❤️ {s.t}</p>
      <p className="text-red-500 text-[10px] font-bold text-center mt-1 uppercase tracking-widest">{s.cat}</p>
      <audio controls className="w-full mt-3 h-8" src={s.f}></audio>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <a href={s.f} download className="bg-[#b9f2c1] text-black font-black text-[11px] py-3 rounded-full text-center">⬇ DOWNLOAD</a>
        <a href={`https://wa.me/${W1}?text=Hi Steve, I want similar to ${s.t}`} className="bg-white text-black font-black text-[11px] py-3 rounded-full text-center">Order Similar</a>
      </div>
      <div className="flex gap-4 mt-3 text-[11px] text-zinc-400">
        <button onClick={()=>setLikes({...likes,[s.t]:(likes[s.t]||0)+1})}>❤️ {likes[s.t]||0}</button><span>☆ Save</span><span>↗ Share</span>
      </div>
    </div>
  );

  return(
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-zinc-900">
        <div className="max-w-[420px] mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-black text-red-500 tracking-tighter">STEVE WIIZY</span>
          <div className="flex gap-4 text-[11px]">
            <button onClick={()=>setPage("home")} className={page==="home"?"text-white font-bold":"text-zinc-500"}>home</button>
            <button onClick={()=>setPage("music")} className={page==="music"?"text-white font-bold":"text-zinc-500"}>music</button>
            <button onClick={()=>setPage("order")} className={page==="order"?"text-white font-bold":"text-zinc-500"}>order</button>
            <button onClick={()=>setPage("contact")} className={page==="contact"?"text-white font-bold":"text-zinc-500"}>contact</button>
          </div>
        </div>
      </nav>

      <div className="max-w-[420px] mx-auto p-4">
        {/* HOME PAGE */}
        {page==="home" && (
          <>
            <div className="text-center mt-2">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-3xl font-black shadow-xl shadow-orange-500/20">SW</div>
              <h1 className="text-[30px] font-black text-red-500 mt-3 tracking-tighter">STEVE WIIZY</h1>
              <p className="text-zinc-400 text-[11px]">Artist • Songwriter • Producer | Kampala, Uganda</p>
              <h2 className="text-[20px] font-bold mt-5">Your Story. Your Vibe. Your Song.</h2>
              <p className="text-zinc-500 text-[12px] mt-1">Download 10 latest songs FREE. Custom songs from 10k UGX - negotiable for students!</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-8">
              <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 text-center"><p className="text-2xl">🎵</p><p className="font-bold text-sm mt-1">10 Free Songs</p><p className="text-[10px] text-zinc-500">Download instantly</p></div>
              <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 text-center"><p className="text-2xl">🎤</p><p className="font-bold text-sm mt-1">From 10k UGX</p><p className="text-[10px] text-zinc-500">Custom songs</p></div>
            </div>
            <button onClick={()=>setPage("music")} className="w-full bg-red-600 py-4 rounded-full font-black mt-6 shadow-lg shadow-red-600/20">🔥 EXPLORE MUSIC</button>
            <button onClick={()=>setPage("order")} className="w-full bg-white text-black py-4 rounded-full font-black mt-3">ORDER CUSTOM SONG</button>

            <h3 className="font-bold mt-10">Featured Tracks</h3>
            <div className="grid gap-3 mt-3">{filtered.slice(0,3).map((s,i)=><Card key={i} s={s} />)}</div>
          </>
        )}

        {/* MUSIC PAGE */}
        {page==="music" && (
          <>
            <div className="relative mt-2">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search songs..." className="w-full p-4 pl-10 rounded-full bg-zinc-900 border border-zinc-800 outline-none focus:border-red-600 text-sm" />
            </div>
            <h3 className="text-[18px] font-bold mt-6">10 Latest Tracks 🔥</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {CATS.map(c=><button key={c} onClick={()=>setCat(c)} className={`px-3 py-2 rounded-full text-[11px] border ${cat===c?'bg-red-600 border-red-600 text-white':'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>{c}</button>)}
            </div>
            <div className="grid gap-4 mt-4">{filtered.map((s,i)=><Card key={i} s={s} />)}{filtered.length===0&&<p className="text-center text-zinc-500 py-10">No songs for "{search}"</p>}</div>
          </>
        )}

        {/* ORDER PAGE */}
        {page==="order" && (
          <div className="bg-[#161616] rounded-[20px] p-5 border border-zinc-800 mt-2">
            <h2 className="text-xl font-black text-center">Order Custom Song 🎤</h2>
            <p className="text-[11px] text-zinc-500 text-center mt-1">From 10,000 UGX - Students welcome! Negotiable!</p>

            <div className="mt-5 space-y-3">
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your Name" className="w-full p-4 rounded-xl bg-black border border-zinc-800 text-sm outline-none focus:border-zinc-700" />
              <textarea value={form.story} onChange={e=>setForm({...form,story:e.target.value})} placeholder="Your story / vibe..." rows={3} className="w-full p-4 rounded-xl bg-black border border-zinc-800 text-sm outline-none focus:border-zinc-700" />
              <div className="grid grid-cols-2 gap-2">
                {["Love Song","Birthday","Gospel","Vibe"].map(t=><button key={t} onClick={()=>setForm({...form,type:t})} className={`p-3 rounded-xl text-xs border ${form.type===t?'bg-red-600 border-red-600':'bg-black border-zinc-800'}`}>{t}</button>)}
              </div>
              <div>
                <label className="text-[11px] text-zinc-400">Budget: {form.budget} UGX (slide to negotiate)</label>
                <input type="range" min={10000} max={100000} step={1000} value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} className="w-full accent-red-600 mt-2" />
                <div className="flex justify-between text-[10px] text-zinc-500"><span>10k Min</span><span className="text-white font-bold">UGX {form.budget}</span><span>100k Premium</span></div>
              </div>
              <div className="bg-black p-3 rounded-xl text-[11px] border border-zinc-800">
                <p className="text-green-400 font-bold">From 10,000 UGX Only!</p>
                <p className="text-zinc-400 mt-1">• 20% deposit to start (2k if 10k)</p>
                <p className="text-zinc-400">• Students & low budget - negotiable on WhatsApp</p>
              </div>
              <a href={`https://wa.me/${W1}?text=Hi Steve! Name:${form.name} Type:${form.type} Budget:${form.budget} Story:${form.story}`} className="block bg-[#25D366] text-white font-black py-4 rounded-full text-center text-sm shadow-lg">💬 Negotiate from 10k on WhatsApp</a>
              <a href={`https://wa.me/${W1}`} className="block bg-white text-black font-black py-4 rounded-full text-center text-sm">WhatsApp 2</a>
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {page==="contact" && (
          <div className="mt-2 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-3xl font-black">SW</div>
            <h2 className="text-2xl font-black text-red-500 mt-3">STEVE WIIZY</h2>
            <p className="text-zinc-400 text-xs mt-1">Kampala, Uganda • Nsangi</p>
            <div className="bg-[#161616] rounded-2xl p-5 border border-zinc-800 mt-8 space-y-4 text-left">
              <a href={`https://wa.me/${W1}`} className="flex items-center gap-3"><span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">💬</span><div><p className="font-bold text-sm">WhatsApp 1</p><p className="text-xs text-zinc-400">+256 743 911 998</p></div></a>
              <a href="mailto:stevewiizy@gmail.com" className="flex items-center gap-3"><span className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">✉️</span><div><p className="font-bold text-sm">Email</p><p className="text-xs text-zinc-400">stevewiizy@gmail.com</p></div></a>
              <div className="flex items-center gap-3"><span className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">📍</span><div><p className="font-bold text-sm">Location</p><p className="text-xs text-zinc-400">Nsangi, Kampala District, UG</p></div></div>
            </div>
            <a href={`https://wa.me/${W1}?text=Hi Steve!`} className="block bg-[#25D366] text-white font-black py-4 rounded-full mt-6 text-sm">Chat on WhatsApp</a>
          </div>
        )}

        <p className="text-center text-[9px] text-zinc-600 mt-10 pb-6">© 2026 Steve Wiizy Music - Kampala | Google: Steve Wiizy Music</p>
      </div>
    </div>
  );
}
