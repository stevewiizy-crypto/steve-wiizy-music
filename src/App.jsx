import { useEffect, useRef, useState } from "react";

const WHATSAPP = "256743911998";

const SONGS = [
  {
    id: 1,
    title: "Endless Love Swing",
    file: "/Endless%20Love%20Swing.mp3",
    category: "Love",
    icon: "❤️",
  },
  {
    id: 2,
    title: "Esie, My Bestie",
    file: "/Esie,%20My%20Bestie.mp3",
    category: "Love",
    icon: "🎶",
  },
  {
    id: 3,
    title: "For the Rest of My Life",
    file: "/For%20the%20Rest%20of%20My%20Life.mp3",
    category: "Dedicated",
    icon: "🎤",
  },
  {
    id: 4,
    title: "Holy Spirit Flow",
    file: "/Holy%20Spirit%20Flow.mp3",
    category: "Gospel",
    icon: "🙏",
  },
  {
    id: 5,
    title: "Moonlight Counted Tears",
    file: "/Moonlight%20Counted%20Tears.mp3",
    category: "Love",
    icon: "🌙",
  },
  {
    id: 6,
    title: "Reza Towers Again",
    file: "/Reza%20Towers%20Again.mp3",
    category: "Vibe",
    icon: "🏢",
  },
  {
    id: 7,
    title: "Reza Towers",
    file: "/Reza%20Towers.mp3",
    category: "Vibe",
    icon: "🎧",
  },
  {
    id: 8,
    title: "Steve Vibes",
    file: "/Steve%20Vibes.mp3",
    category: "Vibe",
    icon: "🔥",
  },
  {
    id: 9,
    title: "SteveWiizy GenZ",
    file: "/SteveWiizy%20GenZ.mp3",
    category: "GenZ",
    icon: "💿",
  },
  {
    id: 10,
    title: "SteveWiizy GenZ2",
    file: "/SteveWiizy%20GenZ2.mp3",
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

export default function App() {
  const audioRef = useRef(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredSongs = SONGS.filter((song) => {
    const categoryMatch =
      category === "All" || song.category === category;

    const searchMatch = song.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  useEffect(() => {
    if (!currentSong || !audioRef.current) return;

    const audio = audioRef.current;

    audio.pause();
    audio.src = currentSong.file;
    audio.load();

    if (isPlaying) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentSong]);

  const playSong = (song) => {
    const audio = audioRef.current;

    if (!audio) return;

    if (currentSong?.id === song.id) {
      if (audio.paused) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        audio.pause();
        setIsPlaying(false);
      }

      return;
    }

    audio.pause();

    setCurrentSong(song);
    setIsPlaying(true);
  };

  const toggleLike = (id) => {
    setLikes((old) => ({
      ...old,
      [id]: (old[id] || 0) + 1,
    }));
  };

  const orderSimilar = (song) => {
    const message =
      `Hi Steve, I want a song similar to "${song.title}".`;

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const orderCustomSong = () => {
    const message =
      "Hi Steve, I want to order a custom song. Please send me the details.";

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const shareSong = async (song) => {
    const text = `🎵 ${song.title} by Steve Wiizy`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: song.title,
          text,
          url: window.location.href,
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(
          `${text} ${window.location.href}`
        );
        alert("Song link copied!");
      } catch {
        alert("Unable to copy the link.");
      }
    }
  };

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
        input {
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
              rgba(220, 20, 60, 0.13),
              transparent 32%
            ),
            #070709;
          padding-bottom: 120px;
        }

        /* HEADER */

        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(7, 7, 9, 0.92);
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
          font-size: 15px;
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
          gap: 26px;
        }

        .nav button {
          border: 0;
          background: none;
          color: #aaa;
          cursor: pointer;
          font-size: 14px;
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

        /* HERO */

        .hero {
          max-width: 1000px;
          margin: auto;
          padding: 85px 22px 75px;
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
          box-shadow: 0 20px 70px rgba(255, 23, 68, 0.2);
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

        .primary-button:hover {
          background: #e9143d;
        }

        .secondary-button {
          background: white;
          color: #080808;
        }

        /* MUSIC */

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

        /* SONG GRID */

        .song-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
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

        .play-button:hover {
          transform: scale(1.06);
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
          text-decoration: none;
          border: 0;
          padding: 11px 8px;
          border-radius: 11px;
          text-align: center;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
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

        .small-action:hover {
          color: white;
        }

        /* ORDER */

        .order-section {
          max-width: 850px;
          margin: 80px auto 0;
          padding: 0 22px;
        }

        .order-box {
          border: 1px solid #29292f;
          border-radius: 28px;
          padding: 48px 25px;
          text-align: center;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255, 23, 68, 0.12),
              transparent 50%
            ),
            #101014;
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

        .order-box p {
          max-width: 580px;
          margin: 13px auto 0;
          color: #85858e;
          line-height: 1.6;
          font-size: 14px;
        }

        .price {
          color: #ffd43b !important;
          font-size: 19px !important;
          font-weight: 900;
          margin-top: 20px !important;
        }

        .whatsapp-order {
          display: inline-block;
          text-decoration: none;
          background: #25d366;
          color: #061108;
          font-weight: 900;
          padding: 14px 25px;
          border-radius: 999px;
          margin-top: 20px;
        }

        /* PLAYER */

        .player {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 200;
          background: rgba(10, 10, 12, 0.96);
          backdrop-filter: blur(20px);
          border-top: 1px solid #29292f;
        }

        .player-inner {
          max-width: 1150px;
          margin: auto;
          padding: 11px 22px;
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
        }

        .audio {
          width: 100%;
          height: 32px;
          margin-top: 5px;
        }

        /* FOOTER */

        .footer {
          text-align: center;
          color: #55555c;
          font-size: 11px;
          padding: 45px 20px 10px;
        }

        /* MOBILE */

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
            padding: 38px 19px;
          }

          .order-box h2 {
            font-size: 27px;
          }

          .player-inner {
            padding: 9px 12px;
          }

        }

      `}</style>

      <div className="site">

        {/* HEADER */}

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

        {/* HERO */}

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
            and order a custom song for your special
            moment.
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

        {/* MUSIC */}

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
                  category === item ? "active" : ""
                }`}
                onClick={() => setCategory(item)}
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
                      href={song.file}
                      download
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

          {filteredSongs.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#777",
              }}
            >
              🎵
              <br />
              No songs found.
            </div>
          )}

        </section>

        {/* CUSTOM SONG */}

        <section
          id="order"
          className="order-section"
        >

          <div className="order-box">

            <div className="order-icon">
              🎤
            </div>

            <div className="section-label">
              CUSTOM MUSIC
            </div>

            <h2>
              Want Your Own Song?
            </h2>

            <p>
              Order a personalized song for a birthday,
              dedication, celebration, love story or
              another special moment.
            </p>

            <p className="price">
              Starting from 10,000 UGX
            </p>

            <p>
              Price can be discussed depending on
              the project.
            </p>

            <a
              className="whatsapp-order"
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                "Hi Steve, I want to order a custom song. Please send me the details."
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              💬 Order on WhatsApp
            </a>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="footer">
          © 2026 Steve Wiizy Music • Kampala, Uganda
        </footer>

        {/* ONE AUDIO PLAYER */}

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
                onPlay={() =>
                  setIsPlaying(true)
                }
                onPause={() =>
                  setIsPlaying(false)
                }
                onEnded={() =>
                  setIsPlaying(false)
                }
              />

            </div>

          </div>
        )}

      </div>
    </>
  );
}
