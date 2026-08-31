import { useEffect, useMemo, useRef, useState } from "react";

const WHATSAPP = "256743911998";

const BASE_URL =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.BASE_URL
    ? import.meta.env.BASE_URL
    : "/";

const COVER = `${BASE_URL}IMG-20260831-WA9770.jpg`;

const musicFile = (file) => {
  const cleanBase = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  return `${cleanBase}${encodeURI(file)}`;
};

const SONGS = [
  {
    id: 1,
    title: "A Beautiful Moment",
    file: "A Beautiful Moment.mp3",
    size: "3.4 MB",
    dur: "2:45",
    cat: "Love",
    emoji: "❤️",
  },
  {
    id: 2,
    title: "Close to My Heart",
    file: "Close to My Heart.mp3",
    size: "4.1 MB",
    dur: "3:12",
    cat: "Love",
    emoji: "💖",
  },
  {
    id: 3,
    title: "Endless Love Swing",
    file: "Endless Love Swing.mp3",
    size: "3.8 MB",
    dur: "3:05",
    cat: "Love",
    emoji: "💕",
  },
  {
    id: 4,
    title: "Esie My Queen",
    file: "Esie My Queen.mp3",
    size: "3.2 MB",
    dur: "2:58",
    cat: "Love",
    emoji: "👑",
  },
  {
    id: 5,
    title: "Esie, My Bestie",
    file: "Esie, My Bestie.mp3",
    size: "3.6 MB",
    dur: "3:20",
    cat: "Love",
    emoji: "🎶",
  },
  {
    id: 6,
    title: "For the Rest of My Life",
    file: "For the Rest of My Life.mp3",
    size: "4.3 MB",
    dur: "3:45",
    cat: "Dedicated",
    emoji: "💝",
  },
  {
    id: 7,
    title: "Holy Spirit Flow",
    file: "Holy Spirit Flow.mp3",
    size: "3.9 MB",
    dur: "3:10",
    cat: "Gospel",
    emoji: "🙏",
  },
  {
    id: 8,
    title: "I'm Still Rising",
    file: "I'm Still Rising.mp3",
    size: "3.5 MB",
    dur: "2:55",
    cat: "Vibe",
    emoji: "🔥",
  },
  {
    id: 9,
    title: "Moonlight Counted Tears",
    file: "Moonlight Counted Tears.mp3",
    size: "4.0 MB",
    dur: "3:30",
    cat: "Love",
    emoji: "🌙",
  },
  {
    id: 10,
    title: "My Heart Knows Your Name",
    file: "My Heart Knows Your Name.mp3",
    size: "3.7 MB",
    dur: "3:15",
    cat: "Love",
    emoji: "❤️",
  },
  {
    id: 11,
    title: "One More Dance",
    file: "One More Dance.mp3",
    size: "3.3 MB",
    dur: "2:50",
    cat: "Love",
    emoji: "💃",
  },
  {
    id: 12,
    title: "Only You Know",
    file: "Only You Know.mp3",
    size: "3.1 MB",
    dur: "2:40",
    cat: "Love",
    emoji: "💗",
  },
  {
    id: 13,
    title: "Reza Towers Again",
    file: "Reza Towers Again.mp3",
    size: "4.2 MB",
    dur: "3:22",
    cat: "Vibe",
    emoji: "🏢",
  },
  {
    id: 14,
    title: "Reza Towers",
    file: "Reza Towers.mp3",
    size: "3.9 MB",
    dur: "3:08",
    cat: "Vibe",
    emoji: "🎧",
  },
  {
    id: 15,
    title: "Stay in this moment",
    file: "Stay in this moment.mp3",
    size: "3.4 MB",
    dur: "2:52",
    cat: "Love",
    emoji: "✨",
  },
  {
    id: 16,
    title: "Steve Vibes",
    file: "Steve Vibes.mp3",
    size: "3.6 MB",
    dur: "3:00",
    cat: "Vibe",
    emoji: "🔥",
  },
  {
    id: 17,
    title: "SteveWiizy GenZ",
    file: "SteveWiizy GenZ.mp3",
    size: "4.5 MB",
    dur: "3:50",
    cat: "GenZ",
    emoji: "💿",
  },
];

const CATS = ["All", "Love", "Gospel", "GenZ", "Vibe", "Dedicated"];

function App() {
  const audioRef = useRef(null);

  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [likes, setLikes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("steveWiizyLikes")) || {};
    } catch {
      return {};
    }
  });

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [message, setMessage] = useState("");

  const [order, setOrder] = useState({
    name: "",
    occasion: "",
    category: "Love",
    style: "",
    duration: "Around 3 minutes",
    budget: "",
    details: "",
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return SONGS.filter((song) => {
      const categoryMatch = cat === "All" || song.cat === cat;

      const searchMatch =
        !term ||
        song.title.toLowerCase().includes(term) ||
        song.cat.toLowerCase().includes(term);

      return categoryMatch && searchMatch;
    });
  }, [cat, search]);

  const featured = SONGS.slice(0, 3);

  useEffect(() => {
    try {
      localStorage.setItem("steveWiizyLikes", JSON.stringify(likes));
    } catch {}
  }, [likes]);

  useEffect(() => {
    if (!current || !audioRef.current) return;

    const audio = audioRef.current;

    audio.src = musicFile(current.file);
    audio.load();

    const startPlayback = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.log("Playback waiting for user interaction:", error);
        setPlaying(false);
      }
    };

    startPlayback();
  }, [current]);

  const play = async (song) => {
    const audio = audioRef.current;

    if (!audio) return;

    if (current?.id !== song.id) {
      setCurrent(song);
      setProgress(0);
      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch (error) {
      console.error("Could not play audio:", error);
      setMessage(
        "The song could not play. Please make sure the MP3 filename matches the file in your repository."
      );
    }
  };

  const nextSong = () => {
    if (!current) return;

    const index = SONGS.findIndex((song) => song.id === current.id);
    const next = SONGS[(index + 1) % SONGS.length];

    setCurrent(next);
  };

  const previousSong = () => {
    if (!current) return;

    const index = SONGS.findIndex((song) => song.id === current.id);
    const previous =
      SONGS[(index - 1 + SONGS.length) % SONGS.length];

    setCurrent(previous);
  };

  const toggleLike = (id) => {
    setLikes((old) => ({
      ...old,
      [id]: old[id] ? 0 : 1,
    }));
  };

  const shareSong = async (song) => {
    const shareData = {
      title: `${song.title} — Steve Wiizy`,
      text: `Listen to "${song.title}" by Steve Wiizy 🎵`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setMessage("Website link copied. Share it with your friends!");
      }
    } catch {}
  };

  const orderOnWhatsApp = (song = null) => {
    const selectedSong = song
      ? `I like the song "${song.title}" and want something similar.`
      : "";

    const text = [
      "Hi Steve Wiizy 👋",
      "",
      "I want to order a custom song 🎵",
      selectedSong,
      "",
      `Name: ${order.name || "Not provided"}`,
      `Occasion: ${order.occasion || "Not provided"}`,
      `Category: ${order.category}`,
      `Style: ${order.style || "Not specified"}`,
      `Duration: ${order.duration}`,
      `Budget: ${order.budget || "Negotiable"}`,
      `Details: ${order.details || "Not provided"}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const submitOrder = (e) => {
    e.preventDefault();
    orderOnWhatsApp();
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${mins}:${secs}`;
  };

  const changeProgress = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const value = Number(e.target.value);
    audio.currentTime = value;
    setProgress(value);
  };

  const changeVolume = (e) => {
    const value = Number(e.target.value);
    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          min-width: 320px;
          background:
            radial-gradient(circle at 10% 10%, rgba(255,255,255,.18), transparent 25%),
            radial-gradient(circle at 90% 30%, rgba(255,180,0,.20), transparent 25%),
            linear-gradient(145deg, #ff3d00 0%, #ff6a00 38%, #e91e63 100%);
          color: #fff;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }

        .app {
          min-height: 100vh;
          padding-bottom: 125px;
        }

        .hero {
          max-width: 900px;
          margin: auto;
          padding: 28px 18px 18px;
          text-align: center;
        }

        .avatar {
          width: 112px;
          height: 112px;
          margin: 0 auto 14px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid rgba(255,255,255,.9);
          box-shadow: 0 12px 35px rgba(0,0,0,.28);
          background: rgba(255,255,255,.15);
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .brand {
          margin: 0;
          font-size: clamp(34px, 8vw, 58px);
          line-height: .95;
          font-weight: 950;
          letter-spacing: -2px;
          text-shadow: 0 5px 20px rgba(0,0,0,.22);
        }

        .tagline {
          margin: 10px auto 0;
          font-size: 15px;
          font-weight: 800;
          opacity: .95;
        }

        .heroText {
          max-width: 650px;
          margin: 8px auto 0;
          font-size: 13px;
          opacity: .84;
          line-height: 1.5;
        }

        .heroButtons {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .heroBtn {
          border: 1px solid rgba(255,255,255,.35);
          color: #fff;
          background: rgba(255,255,255,.16);
          backdrop-filter: blur(12px);
          padding: 11px 17px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }

        .heroBtn.primary {
          background: #fff;
          color: #e84900;
        }

        .content {
          width: min(900px, calc(100% - 28px));
          margin: 0 auto;
        }

        .glass {
          background: rgba(25, 12, 12, .34);
          border: 1px solid rgba(255,255,255,.17);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 18px 50px rgba(70, 10, 0, .20);
        }

        .featured {
          padding: 18px;
          border-radius: 24px;
          margin-top: 8px;
        }

        .sectionHeading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 12px;
          margin-bottom: 14px;
        }

        .sectionHeading h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 900;
        }

        .sectionHeading p {
          margin: 3px 0 0;
          font-size: 12px;
          opacity: .72;
        }

        .featuredGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .featuredCard {
          position: relative;
          overflow: hidden;
          min-height: 190px;
          border-radius: 19px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background:
            linear-gradient(to top, rgba(0,0,0,.78), rgba(0,0,0,.05)),
            url("${COVER}") center/cover;
          border: 1px solid rgba(255,255,255,.15);
        }

        .featuredBadge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #ff8c00;
          padding: 5px 8px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 900;
        }

        .featuredTitle {
          font-weight: 900;
          font-size: 15px;
          line-height: 1.15;
        }

        .featuredMeta {
          opacity: .7;
          font-size: 11px;
          margin-top: 4px;
        }

        .featuredPlay {
          position: absolute;
          right: 12px;
          bottom: 12px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 0;
          background: #ff8c00;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 7px 20px rgba(0,0,0,.28);
        }

        .library {
          margin-top: 22px;
        }

        .searchBox {
          width: 100%;
          border: 1px solid rgba(255,255,255,.2);
          background: rgba(30, 10, 10, .34);
          color: white;
          padding: 14px 17px;
          border-radius: 16px;
          outline: none;
          margin-bottom: 12px;
        }

        .searchBox::placeholder {
          color: rgba(255,255,255,.6);
        }

        .cats {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 3px 0 13px;
          scrollbar-width: none;
        }

        .cats::-webkit-scrollbar {
          display: none;
        }

        .cat {
          white-space: nowrap;
          border: 1px solid rgba(255,255,255,.2);
          background: rgba(30, 10, 10, .28);
          color: rgba(255,255,255,.82);
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .cat.active {
          background: #fff;
          color: #e84900;
          border-color: #fff;
        }

        .songList {
          display: grid;
          gap: 10px;
        }

        .songCard {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px;
          border-radius: 18px;
          background: rgba(25, 12, 12, .40);
          border: 1px solid rgba(255,255,255,.14);
          transition: transform .18s ease, background .18s ease;
        }

        .songCard:hover {
          transform: translateY(-2px);
          background: rgba(25, 12, 12, .55);
        }

        .songCard.active {
          border-color: rgba(255,190,0,.8);
          background: rgba(70, 20, 10, .55);
        }

        .songCover {
          width: 62px;
          height: 62px;
          flex: 0 0 62px;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          background: rgba(0,0,0,.25);
        }

        .songCover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .songNumber {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          background: rgba(0,0,0,.28);
          font-size: 18px;
          font-weight: 950;
        }

        .songInfo {
          min-width: 0;
          flex: 1;
        }

        .songTitle {
          font-size: 14px;
          font-weight: 900;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .songMeta {
          margin-top: 4px;
          font-size: 11px;
          opacity: .65;
        }

        .songActions {
          display: flex;
          gap: 6px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        .smallBtn {
          border: 0;
          border-radius: 8px;
          padding: 6px 9px;
          font-size: 10px;
          font-weight: 900;
          cursor: pointer;
          text-decoration: none;
        }

        .download {
          background: #25d366;
          color: #06250f;
        }

        .order {
          background: #fff;
          color: #222;
        }

        .share {
          background: rgba(255,255,255,.12);
          color: white;
        }

        .like {
          border: 0;
          background: transparent;
          color: white;
          cursor: pointer;
          font-size: 11px;
          padding: 5px;
        }

        .like.liked {
          color: #ffb000;
        }

        .playBtn {
          width: 45px;
          height: 45px;
          flex: 0 0 45px;
          border: 0;
          border-radius: 13px;
          background: #ff8c00;
          color: #fff;
          font-size: 17px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 8px 18px rgba(255, 100, 0, .25);
        }

        .empty {
          text-align: center;
          padding: 30px;
          opacity: .7;
          font-size: 13px;
        }

        .orderSection {
          margin-top: 25px;
          padding: 20px;
          border-radius: 24px;
        }

        .orderSection h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 950;
        }

        .orderIntro {
          margin: 6px 0 17px;
          opacity: .75;
          font-size: 12px;
          line-height: 1.5;
        }

        .formGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .field.full {
          grid-column: 1 / -1;
        }

        .field label {
          font-size: 10px;
          font-weight: 900;
          opacity: .75;
          text-transform: uppercase;
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(0,0,0,.22);
          color: #fff;
          border-radius: 11px;
          padding: 11px;
          outline: none;
        }

        .field select option {
          color: #111;
        }

        .field textarea {
          min-height: 90px;
          resize: vertical;
        }

        .submitOrder {
          width: 100%;
          margin-top: 13px;
          border: 0;
          border-radius: 13px;
          padding: 13px;
          background: #25d366;
          color: #05210f;
          font-weight: 950;
          cursor: pointer;
        }

        .priceBox {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 12px;
          padding: 13px;
          border-radius: 14px;
          background: rgba(255,255,255,.08);
          font-size: 12px;
        }

        .price {
          font-size: 18px;
          font-weight: 950;
        }

        .about {
          margin-top: 25px;
          padding: 20px;
          border-radius: 24px;
          text-align: center;
        }

        .about h2 {
          margin: 0 0 7px;
          font-size: 20px;
        }

        .about p {
          margin: 0;
          font-size: 12px;
          line-height: 1.7;
          opacity: .75;
        }

        .footer {
          text-align: center;
          padding: 25px 15px 20px;
          font-size: 10px;
          opacity: .62;
        }

        .toast {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          background: rgba(20,10,10,.92);
          color: white;
          padding: 11px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.16);
          font-size: 11px;
          font-weight: 800;
          box-shadow: 0 12px 30px rgba(0,0,0,.3);
        }

        .player {
          position: fixed;
          left: 12px;
          right: 12px;
          bottom: 12px;
          z-index: 50;
          background: rgba(25,10,10,.92);
          border: 1px solid rgba(255,255,255,.18);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 15px 50px rgba(0,0,0,.35);
        }

        .playerTop {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .playerCover {
          width: 48px;
          height: 48px;
          border-radius: 11px;
          object-fit: cover;
        }

        .playerInfo {
          min-width: 0;
          flex: 1;
        }

        .playerTitle {
          font-size: 13px;
          font-weight: 900;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .playerStatus {
          color: #ffad00;
          font-size: 10px;
          margin-top: 2px;
          font-weight: 800;
        }

        .playerControls {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .control {
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 50%;
          background: rgba(255,255,255,.1);
          color: white;
          cursor: pointer;
          font-size: 12px;
        }

        .control.main {
          background: #ff8c00;
          font-size: 15px;
        }

        .progressRow {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 8px;
        }

        .time {
          font-size: 9px;
          opacity: .65;
          width: 30px;
          text-align: center;
        }

        .progress {
          flex: 1;
          accent-color: #ff8c00;
        }

        .volume {
          width: 70px;
          accent-color: #ff8c00;
        }

        @media (max-width: 650px) {
          .featuredGrid {
            grid-template-columns: 1fr;
          }

          .featuredCard {
            min-height: 160px;
          }

          .formGrid {
            grid-template-columns: 1fr;
          }

          .field.full {
            grid-column: auto;
          }

          .songCard {
            gap: 8px;
          }

          .songCover {
            width: 54px;
            height: 54px;
            flex-basis: 54px;
          }

          .playBtn {
            width: 42px;
            height: 42px;
            flex-basis: 42px;
          }

          .volume {
            display: none;
          }

          .player {
            bottom: 8px;
            left: 8px;
            right: 8px;
          }
        }
      `}</style>

      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration || 0);
          e.currentTarget.volume = volume;
        }}
        onTimeUpdate={(e) => {
          setProgress(e.currentTarget.currentTime);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
        onError={() => {
          setPlaying(false);
          setMessage(
            "Audio file not found. Check that the MP3 is uploaded to the same location and the filename matches exactly."
          );
        }}
      />

      {message && (
        <div className="toast" onClick={() => setMessage("")}>
          {message}
        </div>
      )}

      <div className="app">

        {/* HERO */}
        <header className="hero">
          <div className="avatar">
            <img src={COVER} alt="Steve Wiizy" />
          </div>

          <h1 className="brand">STEVE WIIZY</h1>

          <div className="tagline">
            🎵 Music • Creativity • Custom Songs
          </div>

          <p className="heroText">
            Original songs, personalized music and fresh GenZ vibes from
            Steve Wiizy. Discover a song, download it or create something
            made especially for you.
          </p>

          <div className="heroButtons">
            <a className="heroBtn primary" href="#songs">
              🎧 Explore Music
            </a>

            <a className="heroBtn" href="#custom">
              🎤 Order Custom Song
            </a>
          </div>
        </header>

        <main className="content">

          {/* FEATURED */}
          <section className="featured glass">
            <div className="sectionHeading">
              <div>
                <h2>🔥 Featured Tracks</h2>
                <p>Start with some of Steve Wiizy's latest sounds.</p>
              </div>
            </div>

            <div className="featuredGrid">
              {featured.map((song) => {
                const active = current?.id === song.id;

                return (
                  <div className="featuredCard" key={song.id}>
                    <div className="featuredBadge">
                      {active && playing ? "NOW PLAYING" : "FEATURED"}
                    </div>

                    <div className="featuredTitle">
                      {song.emoji} {song.title}
                    </div>

                    <div className="featuredMeta">
                      {song.cat} • {song.dur}
                    </div>

                    <button
                      className="featuredPlay"
                      onClick={() => play(song)}
                      aria-label={`Play ${song.title}`}
                    >
                      {active && playing ? "❚❚" : "▶"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SONG LIBRARY */}
          <section className="library" id="songs">
            <div className="sectionHeading">
              <div>
                <h2>🎵 Music Library</h2>
                <p>
                  {filtered.length} track
                  {filtered.length !== 1 ? "s" : ""} available
                </p>
              </div>
            </div>

            <input
              className="searchBox"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔎 Search songs, Love, Gospel, GenZ..."
            />

            <div className="cats">
              {CATS.map((item) => (
                <button
                  key={item}
                  className={`cat ${cat === item ? "active" : ""}`}
                  onClick={() => setCat(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="songList">
              {filtered.map((song) => {
                const active = current?.id === song.id;

                return (
                  <article
                    className={`songCard ${active ? "active" : ""}`}
                    key={song.id}
                  >
                    <div className="songCover">
                      <img src={COVER} alt="" />
                      <div className="songNumber">
                        {song.emoji}
                      </div>
                    </div>

                    <div className="songInfo">
                      <div className="songTitle">
                        {song.title}
                      </div>

                      <div className="songMeta">
                        {song.cat} • {song.size} • {song.dur}
                      </div>

                      <div className="songActions">
                        <a
                          className="smallBtn download"
                          href={musicFile(song.file)}
                          download={song.file}
                        >
                          ⬇ Download
                        </a>

                        <button
                          className="smallBtn order"
                          onClick={() => orderOnWhatsApp(song)}
                        >
                          💬 Order Similar
                        </button>

                        <button
                          className="smallBtn share"
                          onClick={() => shareSong(song)}
                        >
                          ↗ Share
                        </button>

                        <button
                          className={`like ${
                            likes[song.id] ? "liked" : ""
                          }`}
                          onClick={() => toggleLike(song.id)}
                        >
                          {likes[song.id] ? "❤️ Liked" : "♡ Like"}
                        </button>
                      </div>
                    </div>

                    <button
                      className="playBtn"
                      onClick={() => play(song)}
                      aria-label={`Play ${song.title}`}
                    >
                      {active && playing ? "❚❚" : "▶"}
                    </button>
                  </article>
                );
              })}

              {filtered.length === 0 && (
                <div className="empty">
                  🔎 No songs found for "{search}".
                </div>
              )}
            </div>
          </section>

          {/* CUSTOM ORDER */}
          <section className="orderSection glass" id="custom">
            <h2>🎤 Create Your Custom Song</h2>

            <p className="orderIntro">
              Want a song made around your name, birthday, relationship,
              event, friendship or special message? Fill in the details
              and send your request directly to Steve Wiizy on WhatsApp.
            </p>

            <form onSubmit={submitOrder}>
              <div className="formGrid">

                <div className="field">
                  <label>Your Name</label>
                  <input
                    required
                    value={order.name}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        name: e.target.value,
                      })
                    }
                    placeholder="Your name"
                  />
                </div>

                <div className="field">
                  <label>Occasion</label>
                  <input
                    value={order.occasion}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        occasion: e.target.value,
                      })
                    }
                    placeholder="Birthday, love, graduation..."
                  />
                </div>

                <div className="field">
                  <label>Music Category</label>

                  <select
                    value={order.category}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        category: e.target.value,
                      })
                    }
                  >
                    <option>Love</option>
                    <option>Birthday</option>
                    <option>Gospel</option>
                    <option>GenZ</option>
                    <option>Motivation</option>
                    <option>Vibe</option>
                    <option>Dedicated</option>
                  </select>
                </div>

                <div className="field">
                  <label>Style / Vibe</label>

                  <input
                    value={order.style}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        style: e.target.value,
                      })
                    }
                    placeholder="Afrobeat, R&B, Amapiano..."
                  />
                </div>

                <div className="field">
                  <label>Song Duration</label>

                  <select
                    value={order.duration}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        duration: e.target.value,
                      })
                    }
                  >
                    <option>Around 2½ minutes</option>
                    <option>Around 3 minutes</option>
                    <option>Around 3½ minutes</option>
                  </select>
                </div>

                <div className="field">
                  <label>Budget</label>

                  <input
                    value={order.budget}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        budget: e.target.value,
                      })
                    }
                    placeholder="e.g. 10,000 UGX"
                  />
                </div>

                <div className="field full">
                  <label>Tell Me About The Song</label>

                  <textarea
                    value={order.details}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        details: e.target.value,
                      })
                    }
                    placeholder="Tell Steve what you want mentioned in the song..."
                  />
                </div>

              </div>

              <div className="priceBox">
                <span>
