import { useEffect, useRef, useState } from "react";

/* =========================================================
   STEVE WIIZY MUSIC WEBSITE
   GitHub / GitHub Pages friendly version
   ========================================================= */

const WHATSAPP = "256743911998";

/*
  GitHub Pages can host the site inside a repository folder.
  BASE_URL automatically handles that folder.
*/
const BASE_URL =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.BASE_URL
    ? import.meta.env.BASE_URL
    : "/";

const musicFile = (fileName) =>
  `${BASE_URL}${encodeURIComponent(fileName).replace(/%2F/g, "/")}`;

const SONGS = [
  {
    id: 1,
    title: "Endless Love Swing",
    file: "Endless Love Swing.mp3",
    category: "Love",
    icon: "❤️",
  },
  {
    id: 2,
    title: "Esie, My Bestie",
    file: "Esie, My Bestie.mp3",
    category: "Love",
    icon: "🎶",
  },
  {
    id: 3,
    title: "For the Rest of My Life",
    file: "For the Rest of My Life.mp3",
    category: "Dedicated",
    icon: "🎤",
  },
  {
    id: 4,
    title: "Holy Spirit Flow",
    file: "Holy Spirit Flow.mp3",
    category: "Gospel",
    icon: "🙏",
  },
  {
    id: 5,
    title: "Moonlight Counted Tears",
    file: "Moonlight Counted Tears.mp3",
    category: "Love",
    icon: "🌙",
  },
  {
    id: 6,
    title: "Reza Towers Again",
    file: "Reza Towers Again.mp3",
    category: "Vibe",
    icon: "🏢",
  },
  {
    id: 7,
    title: "Reza Towers",
    file: "Reza Towers.mp3",
    category: "Vibe",
    icon: "🎧",
  },
  {
    id: 8,
    title: "Steve Vibes",
    file: "Steve Vibes.mp3",
    category: "Vibe",
    icon: "🔥",
  },
  {
    id: 9,
    title: "SteveWiizy GenZ",
    file: "SteveWiizy GenZ.mp3",
    category: "GenZ",
    icon: "💿",
  },
  {
    id: 10,
    title: "SteveWiizy GenZ2",
    file: "SteveWiizy GenZ2.mp3",
    category: "GenZ",
    icon: "🎵",
  },
];

const CATEGORIES = [
  "All",
  "Love",
  "Gospel",
  "GenZ",
  "Vibe",
  "Dedicated",
];

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const audioRef = useRef(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [likes, setLikes] = useState({});

  const [menuOpen, setMenuOpen] = useState(false);

  /* CUSTOM ORDER FORM */

  const [order, setOrder] = useState({
    songType: "",
    style: "",
    mood: "",
    language: "",
    duration: "",
    forWho: "",
    topic: "",
    details: "",
  });

  /* =======================================================
     FILTER SONGS
     ======================================================= */

  const filteredSongs = SONGS.filter((song) => {
    const categoryMatch =
      category === "All" || song.category === category;

    const searchMatch = song.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  /* =======================================================
     GET FULL GITHUB-FRIENDLY SONG URL
     ======================================================= */

  const getSongUrl = (song) => {
    return musicFile(song.file);
  };

  /* =======================================================
     PLAY SONG
     ======================================================= */

  const playSong = (song) => {
    const audio = audioRef.current;

    if (!audio) return;

    const songUrl = getSongUrl(song);

    /*
      If the same song is selected:
      pause/resume it.
    */
    if (currentSong?.id === song.id) {
      if (audio.paused) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error("Audio playback error:", error);
            setIsPlaying(false);
          });
      } else {
        audio.pause();
        setIsPlaying(false);
      }

      return;
    }

    /*
      Stop the previous song before loading another one.
    */
    audio.pause();

    audio.src = songUrl;
    audio.load();

    setCurrentSong(song);

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Could not play audio:", error);
        setIsPlaying(false);
      });
  };

  /* =======================================================
     LIKE
     ======================================================= */

  const toggleLike = (id) => {
    setLikes((old) => ({
      ...old,
      [id]: (old[id] || 0) + 1,
    }));
  };

  /* =======================================================
     SHARE
     ======================================================= */

  const shareSong = async (song) => {
    const text = `🎵 ${song.title} by Steve Wiizy`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: song.title,
          text,
          url: window.location.href,
        });
      } catch {
        // Sharing cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${text} - ${window.location.href}`
        );

        alert("Song link copied!");
      } catch {
        alert("Unable to copy the link.");
      }
    }
  };

  /* =======================================================
     SIMILAR SONG WHATSAPP
     ======================================================= */

  const orderSimilar = (song) => {
    const message =
      `Hi Steve, I want a song similar to "${song.title}".`;

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  /* =======================================================
     UPDATE CUSTOM ORDER
     ======================================================= */

  const updateOrder = (field, value) => {
    setOrder((old) => ({
      ...old,
      [field]: value,
    }));
  };

  /* =======================================================
     SEND CUSTOM ORDER TO WHATSAPP
     ======================================================= */

  const submitCustomOrder = (event) => {
    event.preventDefault();

    const message = `
🎤 STEVE WIIZY CUSTOM SONG ORDER

Song Type: ${order.songType || "Not specified"}

Music Style: ${order.style || "Not specified"}

Mood / Vibe: ${order.mood || "Not specified"}

Language: ${order.language || "Not specified"}

Duration: ${order.duration || "Not specified"}

Song For: ${order.forWho || "Not specified"}

What the song should be about:
${order.topic || "Not specified"}

Special message / extra details:
${order.details || "Not specified"}

Please let me know the price and next steps.
    `.trim();

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  /* =======================================================
     NAVIGATION
     ======================================================= */

  const scrollToMusic = () => {
    document
      .getElementById("music")
      ?.scrollIntoView({ behavior: "smooth" });

    setMenuOpen(false);
  };

  const scrollToOrder = () => {
    document
      .getElementById("order")
      ?.scrollIntoView({ behavior: "smooth" });

    setMenuOpen(false);
  };

  /* =======================================================
     DESIGN
     ======================================================= */

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
          background: #070709;
          color: white;
          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
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

        .site {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(220, 20, 60, 0.14),
              transparent 32%
            ),
            #070709;
          padding-bottom: 130px;
        }

        /* ================= HEADER ================= */

        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(7, 7, 9, 0.94);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid #202024;
        }

        .header-inner {
          max-width: 1150px;
          margin: auto;
          padding: 14px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
          border: 0;
          background: none;
          color: white;
          cursor: pointer;
          padding: 0;
        }

        .brand-logo {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #ffd700,
            #ff1744,
            #7c3aed
          );
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
        }

        .brand-name {
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .brand-name span {
          color: #ff1744;
        }

        .brand-small {
          color: #777;
          font-size: 9px;
          letter-spacing: 2px;
          margin-top: 2px;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .nav button {
          border: 0;
          background: none;
          color: #aaa;
          cursor: pointer;
        }

        .nav button:hover {
          color: white;
        }

        .whatsapp-nav {
          text-decoration: none;
          background: #25d366;
          color: #061108 !important;
          padding: 10px 17px;
          border-radius: 999px;
          font-weight: 800;
        }

        .menu-button {
          display: none;
          border: 1px solid #333;
          background: #111;
          color: white;
          border-radius: 10px;
          width: 42px;
          height: 42px;
          font-size: 20px;
        }

        .mobile-menu {
          display: none;
        }

        /* ================= HERO ================= */

        .hero {
          max-width: 1000px;
          margin: auto;
          padding: 75px 22px 70px;
          text-align: center;
        }

        .hero-logo {
          width: 105px;
          height: 105px;
          margin: auto;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #ffd700,
            #ff1744,
            #7c3aed
          );
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 31px;
          font-weight: 900;
          box-shadow:
            0 20px 70px rgba(255, 23, 68, 0.2);
        }

        .hero-label {
          color: #ff3358;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 3px;
          margin-top: 28px;
        }

        .hero h1 {
          margin: 12px 0 0;
          font-size: clamp(42px, 8vw, 78px);
          line-height: 0.98;
          letter-spacing: -3px;
          font-weight: 950;
        }

        .hero h1 span {
          color: #ff1744;
        }

        .hero p {
          max-width: 650px;
          margin: 24px auto 0;
          color: #92929b;
          line-height: 1.7;
          font-size: 16px;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 30px;
          flex-wrap: wrap;
        }

        .primary-button,
        .secondary-button {
          border: 0;
          cursor: pointer;
          padding: 14px 23px;
          border-radius: 999px;
          font-weight: 850;
        }

        .primary-button {
          background: #ff1744;
          color: white;
        }

        .secondary-button {
          background: white;
          color: #080808;
        }

        /* ================= MUSIC ================= */

        .music-section {
          max-width: 1150px;
          margin: auto;
          padding: 0 22px;
        }

        .section-top {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 25px;
          margin-bottom: 25px;
        }

        .section-label {
          color: #ff1744;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
        }

        .section-title {
          margin: 7px 0 0;
          font-size: 34px;
          font-weight: 900;
        }

        .section-subtitle {
          color: #686870;
          margin-top: 5px;
          font-size: 13px;
        }

        .search {
          width: 310px;
          background: #111115;
          color: white;
          border: 1px solid #29292f;
          border-radius: 14px;
          padding: 14px 17px;
          outline: none;
        }

        .search:focus {
          border-color: #ff1744;
        }

        .categories {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 5px 0 24px;
          scrollbar-width: none;
        }

        .categories::-webkit-scrollbar {
          display: none;
        }

        .category {
          white-space: nowrap;
          border: 1px solid #27272c;
          background: #101014;
          color: #8f8f97;
          padding: 9px 17px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
        }

        .category.active {
          background: #ff1744;
          border-color: #ff1744;
          color: white;
        }

        /* ================= SONG CARDS ================= */

        .song-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 17px;
        }

        .song-card {
          background: #101014;
          border: 1px solid #202025;
          border-radius: 22px;
          padding: 19px;
          transition: 0.2s ease;
        }

        .song-card:hover {
          border-color: #3b3b43;
          transform: translateY(-2px);
        }

        .song-card.active {
          border-color: #ff1744;
          background: #141014;
        }

        .song-head {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .song-icon {
          width: 57px;
          height: 57px;
          flex-shrink: 0;
          border-radius: 16px;
          background: #19191e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .active .song-icon {
          background: #ff1744;
        }

        .song-info {
          min-width: 0;
          flex: 1;
        }

        .song-title {
          margin: 0;
          font-size: 16px;
          font-weight: 850;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .song-category {
          margin-top: 5px;
          color: #ff4567;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .play-button {
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          border: 0;
          border-radius: 50%;
          background: white;
          color: #090909;
          cursor: pointer;
          font-size: 17px;
          font-weight: 900;
        }

        .now-playing {
          color: #ff1744;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
          margin-top: 13px;
        }

        .song-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 17px;
        }

        .download-button,
        .order-button {
          border: 0;
          padding: 11px 8px;
          border-radius: 11px;
          text-align: center;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
          text-decoration: none;
        }

        .download-button {
          background: #25d366;
          color: #061108;
        }

        .order-button {
          background: white;
          color: #080808;
        }

        .song-bottom {
          display: flex;
          justify-content: space-between;
          margin-top: 13px;
        }

        .small-action {
          border: 0;
          background: none;
          color: #777780;
          cursor: pointer;
          font-size: 12px;
        }

        /* ================= CUSTOM ORDER ================= */

        .order-section {
          max-width: 900px;
          margin: 80px auto 0;
          padding: 0 22px;
        }

        .order-box {
          border: 1px solid #29292f;
          border-radius: 28px;
          padding: 40px 25px;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255, 23, 68, 0.12),
              transparent 50%
            ),
            #101014;
        }

        .order-heading {
          text-align: center;
        }

        .order-icon {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          margin: auto;
          background: #ff1744;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .order-box h2 {
          margin: 17px 0 0;
          font-size: 32px;
        }

        .order-description {
          max-width: 600px;
          margin: 12px auto 25px;
          color: #85858e;
          line-height: 1.6;
          font-size: 14px;
          text-align: center;
        }

        .price {
          color: #ffd43b;
          font-weight: 900;
          text-align: center;
          font-size: 18px;
          margin-bottom: 28px;
        }

        .order-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-label {
          color: #b7b7bf;
          font-size: 12px;
          font-weight: 750;
        }

        .form-control {
          width: 100%;
          border: 1px solid #29292f;
          background: #09090b;
          color: white;
          border-radius: 12px;
          padding: 13px 14px;
          outline: none;
        }

        .form-control:focus {
          border-color: #ff1744;
        }

        textarea.form-control {
          resize: vertical;
          min-height: 105px;
        }

        .submit-order {
          grid-column: 1 / -1;
          border: 0;
          background: #25d366;
          color: #061108;
          padding: 15px;
          border-radius: 13px;
          font-weight: 900;
          cursor: pointer;
          margin-top: 4px;
        }

        .submit-order:hover {
          background: #38e078;
        }

        /* ================= PLAYER ================= */

        .player {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 200;
          background: rgba(10, 10, 12, 0.97);
          backdrop-filter: blur(20px);
          border-top: 1px solid #29292f;
          box-shadow: 0 -10px 40px rgba(0,0,0,0.3);
        }

        .player-inner {
          max-width: 1150px;
          margin: auto;
          padding: 10px 22px;
        }

        .player-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .player-icon {
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          border-radius: 11px;
          background: #ff1744;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .player-info {
          min-width: 0;
          flex: 1;
        }

        .player-title {
          font-size: 13px;
          font-weight: 850;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .player-category {
          color: #777780;
          font-size: 10px;
          margin-top: 3px;
        }

        .player-toggle {
          width: 40px;
          height: 40px;
          border: 0;
          border-radius: 50%;
          background: white;
          color: black;
          font-weight: 900;
          cursor: pointer;
        }

        .audio {
          width: 100%;
          height: 32px;
          margin-top: 5px;
        }

        /* ================= FOOTER ================= */

        .footer {
          text-align: center;
          color: #55555c;
          font-size: 11px;
          padding: 45px 20px 10px;
        }

        /* ================= MOBILE ================= */

        @media (max-width: 700px) {

          .header-inner {
            padding: 11px 16px;
          }

          .nav {
            display: none;
          }

          .menu-button {
            display: block;
          }

          .mobile-menu {
            padding: 12px 16px 17px;
            border-top: 1px solid #202024;
            flex-direction: column;
            gap: 8px;
          }

          .mobile-menu.open {
            display: flex;
          }

          .mobile-menu button,
          .mobile-menu a {
            width: 100%;
            padding: 13px;
            border-radius: 12px;
            border: 0;
            text-align: center;
            text-decoration: none;
          }

          .mobile-menu button {
            background: #151519;
            color: white;
          }

          .mobile-menu a {
            background: #25d366;
            color: #061108;
            font-weight: 850;
          }

          .hero {
            padding: 55px 17px 55px;
          }

          .hero-logo {
            width: 85px;
            height: 85px;
            font-size: 26px;
          }

          .hero h1 {
            font-size: 46px;
            letter-spacing: -2px;
          }

          .hero p {
            font-size: 14px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
          }

          .music-section {
            padding: 0 15px;
          }

          .section-top {
            display: block;
          }

          .section-title {
            font-size: 28px;
          }

          .search {
            width: 100%;
            margin-top: 18px;
          }

          .song-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .song-card {
            padding: 16px;
            border-radius: 19px;
          }

          .order-section {
            padding: 0 15px;
            margin-top: 55px;
          }

          .order-box {
            padding: 35px 17px;
          }

          .order-box h2 {
            font-size: 27px;
          }

          .order-form {
            grid-template-columns: 1fr;
          }

          .form-group.full {
            grid-column: auto;
          }

          .submit-order {
            grid-column: auto;
          }

          .player-inner {
            padding: 9px 12px;
          }
        }

      `}</style>

      <div className="site">

        {/* =================================================
            HEADER
            ================================================= */}

        <header className="header">

          <div className="header-inner">

            <button
              className="brand"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              <div className="brand-logo">
                SW
              </div>

              <div>
                <div className="brand-name">
                  STEVE <span>WIIZY</span>
                </div>

                <div className="brand-small">
                  MUSIC
                </div>
              </div>
            </button>

            <nav className="nav">

              <button onClick={scrollToMusic}>
                Music
              </button>

              <button onClick={scrollToOrder}>
                Custom Song
              </button>

              <a
                className="whatsapp-nav"
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>

            </nav>

            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>

          <div
            className={`mobile-menu ${
              menuOpen ? "open" : ""
            }`}
          >
            <button onClick={scrollToMusic}>
              🎵 Music
            </button>

            <button onClick={scrollToOrder}>
              🎤 Custom Song
            </button>

            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
            >
              💬 WhatsApp Steve
            </a>
          </div>

        </header>

        {/* =================================================
            HERO
            ================================================= */}

        <section className="hero">

          <div className="hero-logo">
            SW
          </div>

          <div className="hero-label">
            STEVE WIIZY MUSIC
          </div>

          <h1>
            Your Story.
            <br />
            <span>Your Vibe.</span>
            <br />
            Your Song.
          </h1>

          <p>
            Listen to my music, discover different vibes
            and order a custom song for your special moment.
          </p>

          <div className="hero-actions">

            <button
              className="primary-button"
              onClick={scrollToMusic}
            >
              🎧 Explore Music
            </button>

            <button
              className="secondary-button"
              onClick={scrollToOrder}
            >
              🎤 Order Custom Song
            </button>

          </div>

        </section>

        {/* =================================================
            MUSIC
            ================================================= */}

        <section
          id="music"
          className="music-section"
        >

          <div className="section-top">

            <div>
              <div className="section-label">
                MY MUSIC
              </div>

              <h2 className="section-title">
                Latest Tracks 🔥
              </h2>

              <div className="section-subtitle">
                {SONGS.length} songs available to listen to
              </div>
            </div>

            <input
              className="search"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="🔍 Search songs..."
            />

          </div>

          <div className="categories">

            {CATEGORIES.map((item) => (
              <button
                key={item}
                className={`category ${
                  category === item
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

          <div className="song-grid">

            {filteredSongs.map((song) => {

              const active =
                currentSong?.id === song.id;

              return (
                <article
                  className={`song-card ${
                    active ? "active" : ""
                  }`}
                  key={song.id}
                >

                  <div className="song-head">

                    <div className="song-icon">
                      {song.icon}
                    </div>

                    <div className="song-info">

                      <h3 className="song-title">
                        {song.title}
                      </h3>

                      <div className="song-category">
                        {song.category}
                      </div>

                    </div>

                    <button
                      className="play-button"
                      onClick={() =>
                        playSong(song)
                      }
                    >
                      {active && isPlaying
                        ? "Ⅱ"
                        : "▶"}
                    </button>

                  </div>

                  {active && (
                    <div className="now-playing">
                      {isPlaying
                        ? "● NOW PLAYING"
                        : "Ⅱ PAUSED"}
                    </div>
                  )}

                  <div className="song-actions">

                    <a
                      className="download-button"
                      href={getSongUrl(song)}
                      download={song.file}
                    >
                      ⬇ Download
                    </a>

                    <button
                      className="order-button"
                      onClick={() =>
                        orderSimilar(song)
                      }
                    >
                      💬 Order Similar
                    </button>

                  </div>

                  <div className="song-bottom">

                    <button
                      className="small-action"
                      onClick={() =>
                        toggleLike(song.id)
                      }
                    >
                      ❤️ {likes[song.id] || 0}
                    </button>

                    <button
                      className="small-action"
                      onClick={() =>
                        shareSong(song)
                      }
                    >
                      ↗ Share
                    </button>

                  </div>

                </article>
              );
            })}

          </div>

        </section>

        {/* =================================================
            CUSTOM SONG ORDER
            ================================================= */}

        <section
          id="order"
          className="order-section"
        >

          <div className="order-box">

            <div className="order-heading">

              <div className="order-icon">
                🎤
              </div>

              <div
                className="section-label"
                style={{ marginTop: "20px" }}
              >
                CUSTOM MUSIC
              </div>

              <h2>
                Create Your Own Song
              </h2>

              <p className="order-description">
                Tell Steve Wiizy what you want and send
                your request directly to WhatsApp.
              </p>

              <div className="price">
                Starting from 10,000 UGX
              </div>

            </div>

            <form
              className="order-form"
              onSubmit={submitCustomOrder}
            >

              {/* SONG TYPE */}

              <div className="form-group">

                <label className="form-label">
                  What type of song? *
                </label>

                <select
                  className="form-control"
                  value={order.songType}
                  onChange={(e) =>
                    updateOrder(
                      "songType",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">
                    Select song type
                  </option>

                  <option>
                    Love Song
                  </option>

                  <option>
                    Birthday Song
                  </option>

                  <option>
                    Dedication
                  </option>

                  <option>
                    Gospel
                  </option>

                  <option>
                    Graduation
                  </option>

                  <option>
                    Motivation
                  </option>

                  <option>
                    Friendship / Bestie
                  </option>

                  <option>
                    Celebration
                  </option>

                  <option>
                    Other
                  </option>

                </select>

              </div>

              {/* STYLE */}

              <div className="form-group">

                <label className="form-label">
                  Music style *
                </label>

                <select
                  className="form-control"
                  value={order.style}
                  onChange={(e) =>
                    updateOrder(
                      "style",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">
                    Choose a style
                  </option>

                  <option>
                    Afrobeat
                  </option>

                  <option>
                    Afropop
                  </option>

                  <option>
                    Amapiano
                  </option>

                  <option>
                    R&B
                  </option>

                  <option>
                    Gospel
                  </option>

                  <option>
                    Dancehall
                  </option>

                  <option>
                    Acoustic
                  </option>

                  <option>
                    Chill / Emotional
                  </option>

                  <option>
                    Gen Z / Vibe
                  </option>

                  <option>
                    Not sure - recommend one
                  </option>

                </select>

              </div>

              {/* MOOD */}

              <div className="form-group">

                <label className="form-label">
                  Mood / Vibe
                </label>

                <select
                  className="form-control"
                  value={order.mood}
                  onChange={(e) =>
                    updateOrder(
                      "mood",
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Choose mood
                  </option>

                  <option>
                    Romantic ❤️
                  </option>

                  <option>
                    Happy 😊
                  </option>

                  <option>
                    Emotional 🌙
                  </option>

                  <option>
                    Energetic 🔥
                  </option>

                  <option>
                    Peaceful 🙏
                  </option>

                  <option>
                    Inspirational 💪
                  </option>

                  <option>
                    Party 🎉
                  </option>

                </select>

              </div>

              {/* LANGUAGE */}

              <div className="form-group">

                <label className="form-label">
                  Language
                </label>

                <select
                  className="form-control"
                  value={order.language}
                  onChange={(e) =>
                    updateOrder(
                      "language",
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Choose language
                  </option>

                  <option>
                    English
                  </option>

                  <option>
                    Luganda
                  </option>

                  <option>
                    Swahili
                  </option>

                  <option>
                    English + Luganda
                  </option>

                  <option>
                    English + Swahili
                  </option>

                  <option>
                    Other
                  </option>

                </select>

              </div>

              {/* DURATION */}

              <div className="form-group">

                <label className="form-label">
                  Desired duration
                </label>

                <select
                  className="form-control"
                  value={order.duration}
                  onChange={(e) =>
                    updateOrder(
                      "duration",
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Choose duration
                  </option>

                  <option>
                    1–2 minutes
                  </option>

                  <option>
                    2–3 minutes
                  </option>

                  <option>
                    3–4 minutes
                  </option>

                  <option>
                    4+ minutes
                  </option>

                  <option>
                    Not sure
                  </option>

                </select>

              </div>

              {/* WHO */}

              <div className="form-group">

                <label className="form-label">
                  Who is the song for?
                </label>

                <input
                  className="form-control"
                  value={order.forWho}
                  onChange={(e) =>
                    updateOrder(
                      "forWho",
                      e.target.value
                    )
                  }
                  placeholder="e.g. My bestie, mum, partner..."
                />

              </div>

              {/* TOPIC */}

              <div className="form-group full">

                <label className="form-label">
                  What should the song be about? *
                </label>

                <textarea
                  className="form-control"
                  value={order.topic}
                  onChange={(e) =>
                    updateOrder(
                      "topic",
                      e.target.value
                    )
                  }
                  placeholder="Tell us the story, names, occasion, feelings, important details..."
                  required
                />

              </div>

              {/* EXTRA DETAILS */}

              <div className="form-group full">

                <label className="form-label">
                  Special message / extra instructions
                </label>

                <textarea
                  className="form-control"
                  value={order.details}
                  onChange={(e) =>
                    updateOrder(
                      "details",
                      e.target.value
                    )
                  }
                  placeholder="Anything else you want included in the song?"
                />

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="submit-order"
              >
                💬 Send Custom Song Order on WhatsApp
              </button>

            </form>

          </div>

        </section>

        {/* =================================================
            FOOTER
            ================================================= */}

        <footer className="footer">
          © 2026 Steve Wiizy Music • Kampala, Uganda
        </footer>

        {/* =================================================
            SINGLE AUDIO PLAYER
            ================================================= */}

        {currentSong && (
          <div className="player">

            <div className="player-inner">

              <div className="player-top">

                <div className="player-icon">
                  {currentSong.icon}
                </div>

                <div className="player-info">

                  <div className="player-title">
                    {currentSong.title}
                  </div>

                  <div className="player-category">
                    {currentSong.category} • Steve Wiizy
                  </div>

                </div>

                <button
                  className="player-toggle"
                  onClick={() =>
                    playSong(currentSong)
                  }
                >
                  {isPlaying ? "Ⅱ" : "▶"}
                </button>

              </div>

              <audio
                ref={audioRef}
                className="audio"
                controls
                preload="metadata"
                onPlay={() =>
                  setIsPlaying(true)
                }
                onPause={() =>
                  setIsPlaying(false)
                }
                onEnded={() =>
                  setIsPlaying(false)
                }
                onError={(event) => {
                  console.error(
                    "Audio file could not be loaded:",
                    event
                  );
                  setIsPlaying(false);
                }}
              />

            </div>

          </div>
        )}

      </div>
    </>
  );
}
