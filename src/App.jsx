import React, { useState, useRef } from 'react';

const COVER = "/IMG-20260831-WA9770.jpg";

const SONGS = [
  { title: "A Beautiful Moment", url: "/A%20Beautiful%20Moment.mp3", size: "3.4 MB", duration: "2:45" },
  { title: "Close to My Heart", url: "/Close%20to%20My%20Heart.mp3", size: "4.1 MB", duration: "3:12" },
  { title: "Endless Love Swing", url: "/Endless%20Love%20Swing.mp3", size: "3.8 MB", duration: "3:05" },
  { title: "Esie My Queen", url: "/Esie%20My%20Queen.mp3", size: "3.2 MB", duration: "2:58" },
  { title: "Esie, My Bestie", url: "/Esie,%20My%20Bestie.mp3", size: "3.6 MB", duration: "3:20" },
  { title: "For the Rest of My Life", url: "/For%20the%20Rest%20of%20My%20Life.mp3", size: "4.3 MB", duration: "3:45" },
  { title: "Holy Spirit Flow", url: "/Holy%20Spirit%20Flow.mp3", size: "3.9 MB", duration: "3:10" },
  { title: "I'm Still Rising", url: "/I'm%20Still%20Rising.mp3", size: "3.5 MB", duration: "2:55" },
  { title: "Moonlight Counted Tears", url: "/Moonlight%20Counted%20Tears.mp3", size: "4.0 MB", duration: "3:30" },
  { title: "My Heart Knows Your Name", url: "/My%20Heart%20Knows%20Your%20Name.mp3", size: "3.7 MB", duration: "3:15" },
  { title: "One More Dance", url: "/One%20More%20Dance.mp3", size: "3.3 MB", duration: "2:50" },
  { title: "Only You Know", url: "/Only%20You%20Know.mp3", size: "3.1 MB", duration: "2:40" },
  { title: "Reza Towers Again", url: "/Reza%20Towers%20Again.mp3", size: "4.2 MB", duration: "3:22" },
  { title: "Reza Towers", url: "/Reza%20Towers.mp3", size: "3.9 MB", duration: "3:08" },
  { title: "Stay in this moment", url: "/Stay%20in%20this%20moment.mp3", size: "3.4 MB", duration: "2:52" },
  { title: "Steve Vibes", url: "/Steve%20Vibes.mp3", size: "3.6 MB", duration: "3:00" },
  { title: "SteveWiizy GenZ", url: "/SteveWiizy%20GenZ.mp3", size: "4.5 MB", duration: "3:50" },
];

export default function App() {
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const audioRef = useRef(null);

  const playSong = (index) => {
    if (current === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setCurrent(index);
      setTimeout(() => {
        audioRef.current.play();
        setIsPlaying(true);
      }, 100);
    }
  };

  const submitCustomOrder = () => {
    if (!name ||!phone) {
      alert('Please enter name and WhatsApp number');
      return;
    }
    const message = `Hello Steve Wiizy! I want custom song:%0AName: ${name}%0AWhatsApp: ${phone}%0APrice: 10,000 UGX - Negotiable`;
    window.open(`https://wa.me/256702123456?text=${message}`, '_blank');
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif', paddingBottom: '40px' }}>
      <div style={{ textAlign: 'center', padding: '30px 20px 10px' }}>
        <img src={COVER} alt="Steve Wiizy" style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #a855f7', marginBottom: '12px' }} />
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0' }}>STEVE WIIZY</h1>
        <p style={{ color: '#a855f7', fontWeight: '600', margin: '5px 0' }}>GenZ Love Songs • Custom Name Songs</p>
        <p style={{ color: '#888', fontSize: '13px' }}>Starting from 10,000 UGX - Negotiable • 24hr Delivery</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '0 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>🎵 Free Preview Songs ({SONGS.length})</h2>
        <p style={{ fontSize: '11px', color: '#888', marginBottom: '12px' }}>Full custom version with your name = 8.5 MB High Quality</p>

        {SONGS.map((song, idx) => (
          <div key={idx} onClick={() => playSong(idx)} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            background: current === idx? '#1f1f1f' : '#141414',
            border: current === idx? '1px solid #a855f7' : '1px solid #222',
            borderRadius: '12px', padding: '10px', marginBottom: '10px', cursor: 'pointer'
          }}>
            <img src={COVER} alt="cover" style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>{song.title}</div>
              <div style={{ fontSize: '11px', color: '#888' }}>{song.size} • {song.duration} • {current === idx && isPlaying? '▶️ Playing' : 'Tap to play'}</div>
            </div>
            <div style={{ fontSize: '20px' }}>{current === idx && isPlaying? '⏸️' : '▶️'}</div>
          </div>
        ))}
      </div>

      <audio ref={audioRef} src={current!== null? SONGS[current].url : ''} onEnded={() => setIsPlaying(false)} />

      <div style={{ maxWidth: '600px', margin: '30px auto', padding: '0 16px' }}>
        <div style={{ background: 'linear-gradient(135deg, #1a0b2e, #2d1b4e)', border: '1px solid #a855f7', borderRadius: '16px', padding: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', textAlign: 'center' }}>🔥 WANT YOUR OWN NAME INSIDE SONG?</h2>
          <div style={{ background: '#00000066', borderRadius: '10px', padding: '12px', margin: '12px 0', fontSize: '13px', lineHeight: '1.6' }}>
            <div>✅ Your name sung inside</div>
            <div>✅ 320kbps High Quality (8.5 MB)</div>
            <div>✅ Lyrics + Cover with your name</div>
            <div>✅ 24hr delivery on WhatsApp</div>
            <div>✅ You own it forever</div>
            <div style={{ marginTop: '8px', color: '#22c55e', fontWeight: '700' }}>💰 Price: 10,000 UGX - Negotiable</div>
          </div>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter name to sing (e.g. Esie)" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white', marginBottom: '10px', boxSizing: 'border-box' }} />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="WhatsApp number" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: 'white', marginBottom: '12px', boxSizing: 'border-box' }} />
          <button onClick={submitCustomOrder} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: '#a855f7', color: 'white', fontWeight: '800', fontSize: '15px' }}>ORDER ON WHATSAPP - 10K NEGOTIABLE</button>
        </div>
      </div>
    </div>
  );
}
