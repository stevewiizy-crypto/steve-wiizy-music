import { useEffect, useRef, useState } from "react";

/* =========================================================
   STEVE WIIZY MUSIC WEBSITE
   GitHub / GitHub Pages friendly version
   ========================================================= */

const WHATSAPP = "+256743911998";

const BASE_URL =
  typeof import.meta!== "undefined" &&
  import.meta.env &&
  import.meta.env.BASE_URL
   ? import.meta.env.BASE_URL
    : "/";

const COVER = "/IMG-20260831-WA9770.jpg";

const musicFile = (fileName) => `${BASE_URL}${encodeURI(fileName)}`;

const SONGS = [
  { id: 1, title: "A Beautiful Moment", file: "A Beautiful Moment.mp3", category: "Love", icon: "❤️", size: "3.4 MB", duration: "2:45" },
  { id: 2, title: "Close to My Heart", file: "Close to My Heart.mp3", category: "Love", icon: "❤️", size: "4.1 MB", duration: "3:12" },
  { id: 3, title: "Endless Love Swing", file: "Endless Love Swing.mp3", category: "Love", icon: "❤️", size: "3.8 MB", duration: "3:05" },
  { id: 4, title: "Esie My Queen", file: "Esie My Queen.mp3", category: "Love", icon: "❤️", size: "3.2 MB", duration: "2:58" },
  { id: 5, title: "Esie, My Bestie", file: "Esie, My Bestie.mp3", category: "Love", icon: "🎶", size: "3.6 MB", duration: "3:20" },
  { id: 6, title: "For the Rest of My Life", file: "For the Rest of My Life.mp3", category: "Dedicated", icon: "🎤", size: "4.3 MB", duration: "3:45" },
  { id: 7, title: "Holy Spirit Flow", file: "Holy Spirit Flow.mp3", category: "Gospel", icon: "🙏", size: "3.9 MB", duration: "3:10" },
  { id: 8, title: "I'm Still Rising", file: "I'm Still Rising.mp3", category: "Vibe", icon: "🔥", size: "3.5 MB", duration: "2:55" },
  { id: 9, title: "Moonlight Counted Tears", file: "Moonlight Counted Tears.mp3", category: "Love", icon: "🌙", size: "4.0 MB", duration: "3:30" },
  { id: 10, title: "My Heart Knows Your Name", file: "My Heart Knows Your Name.mp3", category: "Love", icon: "❤️", size: "3.7 MB", duration: "3:15" },
  { id: 11, title: "One More Dance", file: "One More Dance.mp3", category: "Love", icon: "❤️", size: "3.3 MB", duration: "2:50" },
  { id: 12, title: "Only You Know", file: "Only You Know.mp3", category: "Love", icon: "❤️", size: "3.1 MB", duration: "2:40" },
  { id: 13, title: "Reza Towers Again", file: "Reza Towers Again.mp3", category: "Vibe", icon: "🏢", size: "4.2 MB", duration: "3:22" },
  { id: 14, title: "Reza Towers", file: "Reza Towers.mp3", category: "Vibe", icon: "🎧", size: "3.9 MB", duration: "3:08" },
  { id: 15, title: "Stay in this moment", file: "Stay in this moment.mp3", category: "Love", icon: "❤️", size: "3.4 MB", duration: "2:52" },
  { id: 16, title: "Steve Vibes", file: "Steve Vibes.mp3", category: "Vibe", icon: "🔥", size: "3.6 MB", duration: "3:00" },
  { id: 17, title: "SteveWiizy GenZ", file: "SteveWiizy GenZ.mp3", category: "GenZ", icon: "💿", size: "4.5 MB", duration: "3:50" },
];

const CATEGORIES = ["All", "Love", "Gospel", "GenZ", "Vibe", "Dedicated"];

export default function App() {
  const audioRef = useRef(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [order, setOrder] = useState({
    songType: "", style: "", mood: "", language: "", duration: "", forWho: "", topic: "", details: "",
  });

  const filteredSongs = SONGS.filter((song) => {
    const categoryMatch = category === "All" || song.category === category;
    const searchMatch = song.title.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const getSongUrl = (song) => musicFile(song.file);

  useEffect(() => {
    if (!currentSong ||!audioRef.current) return;
    const audio = audioRef.current;
    audio.src = getSongUrl(currentSong);
    audio.load();
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [currentSong]);

  const playSong = (song) => {
    if (currentSong?.id === song.id) {
      if (!audioRef.current) return;
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => setIsPlaying(true));
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setCurrentSong(song);
    }
  };

  const toggleLike = (id) => {
    setLikes((old) => ({...old, [id]: (old[id] || 0) + 1 }));
  };

  const shareSong = async (song) => {
    const text = `🎵 ${song.title} by Steve Wiizy`;
    if (navigator.share) {
      try { await navigator.share({ title: song.title, text, url: window.location.href }); } catch {}
    } else {
      try { await navigator.clipboard.writeText(`${text} - ${window.location.href}`); alert("Song link copied!"); } catch { alert("Unable to copy the link."); }
    }
  };

  const orderSimilar = (song) => {
    const message = `Hi Steve, I want a song similar to "${song.title}".`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const updateOrder = (field, value) => setOrder((old) => ({...old, [field]: value }));

  const submitCustomOrder = (event) => {
    event.preventDefault();
    const message = `🎤 STEVE WIIZY CUSTOM SONG ORDER\n\nSong Type: ${order.songType || "Not specified"}\nMusic Style: ${order.style || "Not specified"}\nMood / Vibe: ${order.mood || "Not specified"}\nLanguage: ${order.language || "Not specified"}\nDuration: ${order.duration || "Not specified"}\nSong For: ${order.forWho || "Not specified"}\n\nWhat the song should be about:\n${order.topic || "Not specified"}\n\nSpecial message / extra details:\n${order.details || "Not specified"}\n\nPlease let me know the price and next steps.`.trim();
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const scrollToMusic = () => { document.getElementById("music")?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const scrollToOrder = () => { document.getElementById("order")?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <>
      <style>{`
        *{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;background:#070709;color:white;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
        button,input,select,textarea{font:inherit} button,a{-webkit-tap-highlight-color:transparent}
       .site{min-height:100vh;background:radial-gradient(circle at 50% 0%,rgba(220,20,60,0.14),transparent 32%),#070709;padding-bottom:130px}
       .header{position:sticky;top:0;z-index:100;background:rgba(7,7,9,0.94);backdrop-filter:blur(18px);border-bottom:1px solid #202024}
       .header-inner{max-width:1150px;margin:auto;padding:14px 22px;display:flex;align-items:center;justify-content:space-between}
       .brand{display:flex;align-items:center;gap:11px;border:0;background:none;color:white;cursor:pointer;padding:0}
       .brand-logo{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#ffd700,#ff1744,#7c3aed);display:flex;align-items:center;justify-content:center;font-weight:900;overflow:hidden}
       .brand-name{font-size:15px;font-weight:900;letter-spacing:1px}.brand-name span{color:#ff1744}.brand-small{color:#777;font-size:9px;letter-spacing:2px;margin-top:2px}
       .nav{display:flex;align-items:center;gap:25px}.nav button{border:0;background:none;color:#aaa;cursor:pointer}.nav button:hover{color:white}
       .whatsapp-nav{text-decoration:none;background:#25d366;color:#061108!important;padding:10px 17px;border-radius:999px;font-weight:800}
       .menu-button{display:none;border:1px solid #333;background:#111;color:white;border-radius:10px;width:42px;height:42px;font-size:20px}.mobile-menu{display:none}
       .hero{max-width:1000px;margin:auto;padding:75px 22px 70px;text-align:center}
       .hero-logo{width:105px;height:105px;margin:auto;border-radius:50%;background:linear-gradient(135deg,#ffd700,#ff1744,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:31px;font-weight:900;box-shadow:0 20px 70px rgba(255,23,68,0.2);overflow:hidden}
       .hero-label{color:#ff3358;font-size:12px;font-weight:800;letter-spacing:3px;margin-top:28px}
       .hero h1{margin:12px 0 0;font-size:clamp(42px,8vw,78px);line-height:0.98;letter-spacing:-3px;font-weight:950}.hero h1 span{color:#ff1744}
       .hero p{max-width:650px;margin:24px auto 0;color:#92929b;line-height:1.7;font-size:16px}
       .hero-actions{display:flex;justify-content:center;gap:12px;margin-top:30px;flex-wrap:wrap}
       .primary-button,.secondary-button{border:0;cursor:pointer;padding:14px 23px;border-radius:999px;font-weight:850}
       .primary-button{background:#ff1744;color:white}.secondary-button{background:white;color:#080808}
       .music-section{max-width:1150px;margin:auto;padding:0 22px}
       .section-top{display:flex;align-items:end;justify-content:space-between;gap:25px;margin-bottom:25px}
       .section-label{color:#ff1744;font-size:11px;font-weight:900;letter-spacing:3px}.section-title{margin:7px 0 0;font-size:34px;font-weight:900}.section-subtitle{color:#686870;margin-top:5px;font-size:13px}
       .search{width:310px;background:#111115;color:white;border:1px solid #29292f;border-radius:14px;padding:14px 17px;outline:none}.search:focus{border-color:#ff1744}
       .categories{display:flex;gap:8px;overflow-x:auto;padding:5px 0 24px;scrollbar-width:none}.categories::-webkit-scrollbar{display:none}
       .category{white-space:nowrap;border:1px solid #27272c;background:#101014;color:#8f8f97;padding:9px 17px;border-radius:999px;cursor:pointer;font-size:13px;font-weight:700}
       .category.active{background:#ff1744;border-color:#ff1744;color:white}
       .song-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:17px}
       .song-card{background:#101014;border:1px solid #202025;border-radius:22px;padding:19px;transition:0.2s ease}
       .song-card:hover{border-color:#3b3b43;transform:translateY(-2px)}.song-card.active{border-color:#ff1744;background:#141014}
       .song-head{display:flex;align-items:center;gap:13px}
       .song-icon{width:57px;height:57px;flex-shrink:0;border-radius:16px;background:#19191e;display:flex;align-items:center;justify-content:center;font-size:24px;overflow:hidden}
       .active.song-icon{background:#ff1744}
       .song-info{min-width:0;flex:1}.song-title{margin:0;font-size:16px;font-weight:850;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
       .song-category{margin-top:5px;color:#ff4567;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px}
       .song-meta{margin-top:4px;color:#888;font-size:11px}
       .play-button{width:46px;height:46px;flex-shrink:0;border:0;border-radius:50%;background:white;color:#090909;cursor:pointer;font-size:17px;font-weight:900}
       .now-playing{color:#ff1744;font-size:10px;font-weight:900;letter-spacing:1px;margin-top:13px}
       .song-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:17px}
       .download-button,.order-button{border:0;padding:11px 8px;border-radius:11px;text-align:center;font-size:12px;font-weight:850;cursor:pointer;text-decoration:none}
       .download-button{background:#25d366;color:#061108}.order-button{background:white;color:#080808}
       .song-bottom{display:flex;justify-content:space-between;margin-top:13px}
       .small-action{border:0;background:none;color:#777780;cursor:pointer;font-size:12px}
       .order-section{max-width:900px;margin:80px auto 0;padding:0 22px}
       .order-box{border:1px solid #29292f;border-radius:28px;padding:40px 25px;background:radial-gradient(circle at 50% 0%,rgba(255,23,68,0.12),transparent 50%),#101014}
       .order-heading{text-align:center}.order-icon{width:65px;height:65px;border-radius:50%;margin:auto;background:#ff1744;display:flex;align-items:center;justify-content:center;font-size:28px}
       .order-box h2{margin:17px 0 0;font-size:32px}.order-description{max-width:600px;margin:12px auto 25px;color:#85858e;line-height:1.6;font-size:14px;text-align:center}
       .price{color:#ffd43b;font-weight:900;text-align:center;font-size:18px;margin-bottom:28px}
       .order-form{display:grid;grid-template-columns:1fr 1fr;gap:15px}.form-group{display:flex;flex-direction:column;gap:7px}.form-group.full{grid-column:1/-1}
       .form-label{color:#b7b7bf;font-size:12px;font-weight:750}.form-control{width:100%;border:1px solid #29292f;background:#09090b;color:white;border-radius:12px;padding:13px 14px;outline:none}
       .form-control:focus{border-color:#ff1744} textarea.form-control{resize:vertical;min-height:105px}
       .submit-order{grid-column:1/-1;border:0;background:#25d366;color:#061108;padding:15px;border-radius:13px;font-weight:900;cursor:pointer;margin-top:4px}
       .submit-order:hover{background:#38e078}
       .player{position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(10,10,12,0.97);backdrop-filter:blur(20px);border-top:1px solid #29292f;padding:14px 20px;display:flex;align-items:center;gap:15px}
       .player-info{flex:1;min-width:0}.player-title{font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.player-status{color:#ff1744;font-size:11px;font-weight:700;margin-top:2px}
       .player.play-button{background:#ff1744;color:white}.hidden-audio{display:none}
        @media(max-width:800px){.nav{display:none}.menu-button{display:block}.mobile-menu{display:flex;flex-direction:column;gap:10px;padding:15px 22px;background:#0a0a0c;border-bottom:1px solid #222}.song-grid{grid-template-columns:1fr}.section-top{flex-direction:column;align-items:stretch}.search{width:100%}.order-form{grid-template-columns:1fr}}
      `}</style>

      <div className="site">
        <audio ref={audioRef} preload="metadata" playsInline onPlay={()=>setIsPlaying(true)} onPause={()=>setIsPlaying(false)} onEnded={()=>setIsPlaying(false)} style={{display:'none'}} />

        <header className="header">
          <div className="header-inner">
            <button className="brand" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>
              <div className="brand-logo"><img src={COVER} alt="SW" style={{width:'100%',height:'100%',objectFit:'cover'}} /></div>
              <div><div className="brand-name">STEVE <span>WIIZY</span></div><div className="brand-small">MUSIC OFFICIAL</div></div>
            </button>
            <div className="nav">
              <button onClick={scrollToMusic}>Music</button>
              <button onClick={scrollToOrder}>Custom Order</button>
              <a className="whatsapp-nav" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
