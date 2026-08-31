import { useEffect, useMemo, useRef, useState } from "react";

const WHATSAPP = "256743911998";

const BASE_URL =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.BASE_URL
    ? import.meta.env.BASE_URL
    : "/";

const cleanBase = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;

const COVER = `${cleanBase}IMG-20260831-WA9770.jpg`;

const musicFile = (file) =>
  `${cleanBase}${encodeURIComponent(file).replace(/%2F/g, "/")}`;

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

const CATS = [
  "All",
  "Love",
  "Birthday",
  "Gospel",
  "GenZ",
  "Motivation",
  "Vibe",
  "Dedicated",
];

function App() {
  const audioRef = useRef(null);

  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [message, setMessage] = useState("");

  const [likes, setLikes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("steveWiizyLikes")) || {};
    } catch {
      return {};
    }
  });

  const [order, setOrder] = useState({
    name: "",
    occasion: "",
    category: "Love",
    style: "",
    mood: "Happy",
    duration: "Around 3 minutes",
    language: "English",
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
      localStorage.setItem(
        "steveWiizyLikes",
        JSON.stringify(likes)
      );
    } catch {}
  }, [likes]);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 4500);

    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleEnded = () => {
      if (!current) return;

      const index = SONGS.findIndex(
        (song) => song.id === current.id
      );

      const next =
        SONGS[(index + 1) % SONGS.length];

      setCurrent(next);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [current]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!current || !audio) return;

    setPlaying(false);
    setProgress(0);
    setDuration(0);

    audio.pause();
    audio.src = musicFile(current.file);
    audio.load();

    const playAfterLoad = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        /*
          Some browsers block automatic playback.
          The user can simply tap Play.
        */
        setPlaying(false);
      }
    };

    playAfterLoad();
  }, [current]);

  const play = async (song) => {
    const audio = audioRef.current;

    if (!audio) return;

    if (current?.id !== song.id) {
      setCurrent(song);
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
    } catch {
      setMessage(
        "Unable to play this song. Check that the MP3 filename matches the file in GitHub."
      );
    }
  };

  const nextSong = () => {
    if (!current) return;

    const index = SONGS.findIndex(
      (song) => song.id === current.id
    );

    setCurrent(
      SONGS[(index + 1) % SONGS.length]
    );
  };

  const previousSong = () => {
    if (!current) return;

    const index = SONGS.findIndex(
      (song) => song.id === current.id
    );

    setCurrent(
      SONGS[
        (index - 1 + SONGS.length) %
          SONGS.length
      ]
    );
  };

  const toggleLike = (id) => {
    setLikes((old) => ({
      ...old,
      [id]: old[id] ? 0 : 1,
    }));
  };

  const shareSong = async (song) => {
    const data = {
      title: `${song.title} — Steve Wiizy`,
      text: `Listen to "${song.title}" by Steve Wiizy 🎵`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(data);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          window.location.href
        );

        setMessage(
          "Website link copied. Share it with your friends!"
        );
      } else {
        setMessage(
          "Copy the website address and share it with your friends."
        );
      }
    } catch {}
  };

  const orderOnWhatsApp = (song = null) => {
    const similar = song
      ? `I like "${song.title}" and want something similar.`
      : "";

    const text = [
      "Hi Steve Wiizy 👋",
      "",
      "🎤 CUSTOM SONG ORDER",
      "",
      similar,
      `Name: ${order.name || "Not provided"}`,
      `Occasion: ${order.occasion || "Not provided"}`,
      `Category: ${order.category}`,
      `Style: ${order.style || "Not specified"}`,
      `Mood: ${order.mood}`,
      `Duration: ${order.duration}`,
      `Language: ${order.language}`,
      `Budget: ${order.budget || "Negotiable"}`,
      `Details: ${order.details || "Not provided"}`,
      "",
      "Please let me know the next step. Thank you!",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        text
      )}`,
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
            radial-gradient(
              circle at 10% 5%,
              rgba(255,255,255,.55),
              transparent 24%
            ),
            radial-gradient(
              circle at 90% 20%,
              rgba(255,205,80,.42),
              transparent 28%
            ),
            linear-gradient(
              145deg,
              #ff3d00 0%,
              #ff7300 38%,
              #e91e63 100%
            );
          color: white;
          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              circle at 30% 80%,
              rgba(255,255,255,.10),
              transparent 30%
            );
          z-index: -1;
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
          padding-bottom: 145px;
        }

        .hero {
          max-width: 950px;
          margin: auto;
          padding: 32px 18px 20px;
          text-align: center;
        }

        .avatar {
          width: 120px;
          height: 120px;
          margin: 0 auto 15px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid white;
          background: rgba(255,255,255,.2);
          box-shadow:
            0 15px 45px rgba(80,20,0,.35);
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .brand {
          margin: 0;
          font-size: clamp(36px, 9vw, 65px);
          line-height: .95;
          font-weight: 950;
          letter-spacing: -3px;
          text-shadow:
            0 5px 22px rgba(80,10,0,.25);
        }

        .tagline {
          margin-top: 10px;
          font-size: 15px;
          font-weight: 900;
        }

        .heroText {
          max-width: 680px;
          margin: 10px auto;
          line-height: 1.6;
          font-size: 13px;
          opacity: .9;
        }

        .heroButtons {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .heroBtn {
          padding: 12px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.4);
          background: rgba(255,255,255,.17);
          color: white;
          text-decoration: none;
          font-size: 12px;
          font-weight: 900;
          backdrop-filter: blur(12px);
        }

        .heroBtn.primary {
          background: white;
          color: #e84900;
        }

        .content {
          width: min(950px, calc(100% - 28px));
          margin: auto;
        }

        .glass {
          background: rgba(45,15,10,.30);
          border: 1px solid rgba(255,255,255,.22);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 20px 60px rgba(80,10,0,.22);
        }

        .featured {
          padding: 19px;
          border-radius: 26px;
        }

        .sectionHeading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .sectionHeading h2 {
          margin: 0;
          font-size: 21px;
          font-weight: 950;
        }

        .sectionHeading p {
          margin: 4px 0 0;
          font-size: 11px;
          opacity: .75;
        }

        .featuredGrid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 12px;
        }

        .featuredCard {
          min-height: 190px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 15px;
          border-radius: 20px;
          background:
            linear-gradient(
              to top,
              rgba(0,0,0,.82),
              rgba(0,0,0,.05)
            ),
            url("${COVER}") center/cover;
          border: 1px solid rgba(255,255,255,.18);
        }

        .featuredBadge {
          position: absolute;
          top: 11px;
          left: 11px;
          padding: 5px 9px;
          border-radius: 999px;
          background: #ff8c00;
          font-size: 9px;
          font-weight: 950;
        }

        .featuredTitle {
          max-width: 80%;
          font-size: 15px;
          line-height: 1.2;
          font-weight: 950;
        }

        .featuredMeta {
          margin-top: 5px;
          font-size: 10px;
          opacity: .7;
        }

        .featuredPlay {
          position: absolute;
          right: 13px;
          bottom: 13px;
          width: 45px;
          height: 45px;
          border: 0;
          border-radius: 50%;
          background: #ff8c00;
          color: white;
          font-size: 17px;
          cursor: pointer;
          box-shadow:
            0 8px 25px rgba(255,100,0,.4);
        }

        .library {
          margin-top: 25px;
        }

        .searchWrap {
          position: relative;
          margin-bottom: 12px;
        }

        .searchIcon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 17px;
        }

        .searchBox {
          width: 100%;
          padding: 15px 17px 15px 45px;
          border-radius: 17px;
          outline: none;
          border: 1px solid rgba(255,255,255,.28);
          background: rgba(40,10,5,.35);
          color: white;
          box-shadow:
            0 10px 25px rgba(80,10,0,.12);
        }

        .searchBox::placeholder {
          color: rgba(255,255,255,.7);
        }

        .cats {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 4px 0 14px;
          scrollbar-width: none;
        }

        .cats::-webkit-scrollbar {
          display: none;
        }

        .cat {
          white-space: nowrap;
          border: 1px solid rgba(255,255,255,.25);
          background: rgba(30,10,5,.25);
          color: white;
          padding: 9px 15px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
          cursor: pointer;
        }

        .cat.active {
          background: white;
          color: #e84900;
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
          background: rgba(35,10,5,.38);
          border: 1px solid rgba(255,255,255,.16);
          transition: .2s ease;
        }

        .songCard:hover {
          transform: translateY(-2px);
          background: rgba(45,10,5,.52);
        }

        .songCard.active {
          border-color: #ffd000;
          box-shadow:
            0 0 0 1px rgba(255,208,0,.2),
            0 12px 30px rgba(255,120,0,.18);
        }

        .songCover {
          width: 64px;
          height: 64px;
          flex: 0 0 64px;
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          background: rgba(0,0,0,.2);
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
          background: rgba(0,0,0,.25);
          font-size: 20px;
        }

        .songInfo {
          flex: 1;
          min-width: 0;
        }

        .songTitle {
          font-size: 14px;
          font-weight: 950;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .songMeta {
          margin-top: 4px;
          font-size: 10px;
          opacity: .65;
        }

        .songActions {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        .smallBtn {
          border: 0;
          border-radius: 8px;
          padding: 6px 9px;
          font-size: 10px;
          font-weight: 950;
          cursor: pointer;
          text-decoration: none;
        }

        .download {
          background: #25d366;
          color: #05210f;
        }

        .order {
          background: white;
          color: #111;
        }

        .share {
          background: rgba(255,255,255,.14);
          color: white;
        }

        .like {
          border: 0;
          background: transparent;
          color: white;
          cursor: pointer;
          font-size: 10px;
          padding: 5px;
        }

        .like.liked {
          color: #ffd000;
        }

        .playBtn {
          width: 46px;
          height: 46px;
          flex: 0 0 46px;
          border: 0;
          border-radius: 14px;
          background: #ff8c00;
          color: white;
          font-size: 17px;
          font-weight: 950;
          cursor: pointer;
          box-shadow:
            0 8px 20px rgba(255,100,0,.3);
        }

        .empty {
          padding: 35px;
          text-align: center;
          border-radius: 18px;
          background: rgba(30,10,5,.25);
          font-size: 13px;
          opacity: .8;
        }

        .orderSection {
          margin-top: 27px;
          padding: 21px;
          border-radius: 26px;
        }

        .orderSection h2 {
          margin: 0;
          font-size: 23px;
          font-weight: 950;
        }

        .orderIntro {
          margin: 7px 0 19px;
          font-size: 12px;
          line-height: 1.65;
          opacity: .8;
        }

        .formGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 11px;
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
          font-size: 9px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: .5px;
          opacity: .75;
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          border: 1px solid rgba(255,255,255,.18);
          background: rgba(0,0,0,.23);
          color: white;
          border-radius: 12px;
          padding: 12px;
          outline: none;
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #ffd000;
          box-shadow:
            0 0 0 2px rgba(255,208,0,.12);
        }

        .field select option {
          color: #111;
        }

        .field textarea {
          min-height: 105px;
          resize: vertical;
        }

        .priceBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: 14px;
          padding: 14px;
          border-radius: 15px;
          background: rgba(255,255,255,.10);
        }

        .priceLabel {
          font-size: 11px;
          opacity: .8;
        }

        .priceValue {
          font-size: 20px;
          font-weight: 950;
        }

        .submitOrder {
          width: 100%;
          margin-top: 12px;
          padding: 14px;
          border: 0;
          border-radius: 14px;
          background: #25d366;
          color: #05210f;
          font-weight: 950;
          cursor: pointer;
          box-shadow:
            0 8px 25px rgba(37,211,102,.22);
        }

        .quickOrder {
          margin-top: 12px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .quickBtn {
          padding: 12px;
          border-radius: 12px;
          text-align: center;
          text-decoration: none;
          font-size: 11px;
          font-weight: 950;
          border: 1px solid rgba(255,255,255,.2);
          background: rgba(255,255,255,.1);
          color: white;
        }

        .about {
          margin-top: 27px;
          padding: 21px;
          border-radius: 26px;
          text-align: center;
        }

        .about h2 {
          margin: 0 0 7px;
          font-size: 20px;
          font-weight: 950;
        }

        .about p {
          margin: 0;
          font-size: 12px;
          line-height: 1.7;
          opacity: .78;
        }

        .stats {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 9px;
          margin-top: 15px;
        }

        .stat {
          padding: 12px 5px;
          border-radius: 13px;
          background: rgba(255,255,255,.08);
        }

        .stat strong {
          display: block;
          font-size: 18px;
          font-weight: 950;
        }

        .stat span {
          display: block;
          margin-top: 3px;
          font-size: 9px;
          opacity: .65;
        }

        .footer {
          text-align: center;
          padding: 25px 15px;
          font-size: 10px;
          opacity: .7;
        }

        .toast {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          max-width: calc(100% - 30px);
          padding: 11px 16px;
          border-radius: 999px;
          background: rgba(25,8,5,.94);
          border: 1px solid rgba(255,255,255,.2);
          box-shadow:
            0 15px 40px rgba(0,0,0,.35);
          font-size: 11px;
          font-weight: 800;
          text-align: center;
          cursor: pointer;
        }

        .player {
          position: fixed;
          left: 12px;
          right: 12px;
          bottom: 12px;
          z-index: 80;
          padding: 12px;
          border-radius: 21px;
          background: rgba(35,10,5,.94);
          border: 1px solid rgba(255,255,255,.2);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow:
            0 18px 60px rgba(60,10,0,.45);
        }

        .playerTop {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .playerCover {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          object-fit: cover;
        }

        .playerInfo {
          flex: 1;
          min-width: 0;
        }

        .playerTitle {
          font-size: 13px;
          font-weight: 950;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .playerStatus {
          margin-top: 3px;
          color: #ffd000;
          font-size: 9px;
          font-weight: 900;
        }

        .playerControls {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .control {
          width: 35px;
          height: 35px;
          border: 0;
          border-radius: 50%;
          background: rgba(255,255,255,.10);
          color: white;
          cursor: pointer;
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
          width: 32px;
          text-align: center;
          font-size: 9px;
          opacity: .65;
        }

        .progress {
          flex: 1;
          accent-color: #ff8c00;
          cursor: pointer;
        }

        .volume {
          width: 70px;
          accent-color: #ff8c00;
        }

        @media (max-width: 680px) {
          .featuredGrid {
            grid-template-columns: 1fr;
          }

          .featuredCard {
            min-height: 155px;
          }

          .formGrid {
            grid-template-columns: 1fr;
          }

          .field.full {
            grid-column: auto;
          }

          .quickOrder {
            grid-template-columns: 1fr;
          }

          .songCard {
            gap: 8px;
          }

          .songCover {
            width: 55px;
            height: 55px;
            flex-basis: 55px;
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
            left: 7px;
            right: 7px;
            bottom: 7px;
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
        onError={() => {
          setPlaying(false);

          setMessage(
            "This MP3 could not be found. Check the filename in GitHub — spaces, commas and capital letters must match exactly."
          );
        }}
      />

      {message && (
        <div
          className="toast"
          onClick={() => setMessage("")}
        >
          {message}
        </div>
      )}

      <div className="app">

        {/* HERO */}
        <header className="hero">
          <div className="avatar">
            <img
              src={COVER}
              alt="Steve Wiizy"
            />
          </div>

          <h1 className="brand">
            STEVE WIIZY
          </h1>

          <div className="tagline">
            ❤️ Music • Creativity • Custom Songs
          </div>

          <p className="heroText">
            Welcome to the official Steve Wiizy
            music space. Discover original sounds,
            download your favourites and order a
            personalized song created around your
            story.
          </p>

          <div className="heroButtons">
            <a
              className="heroBtn primary"
              href="#songs"
            >
              🎧 Explore Music
            </a>

            <a
              className="heroBtn"
              href="#custom"
            >
              🎤 Create My Song
            </a>

            <a
              className="heroBtn"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
            >
              💬 WhatsApp
            </a>
          </div>
        </header>

        <main className="content">

          {/* FEATURED */}
          <section className="featured glass">
            <div className="sectionHeading">
              <div>
                <h2>
                  🔥 Featured & Trending
                </h2>

                <p>
                  Start with these selected
                  Steve Wiizy sounds.
                </p>
              </div>
            </div>

            <div className="featuredGrid">
              {featured.map((song) => {
                const active =
                  current?.id === song.id;

                return (
                  <div
                    className="featuredCard"
                    key={song.id}
                  >
                    <div className="featuredBadge">
                      {active && playing
                        ? "NOW PLAYING"
                        : "🔥 FEATURED"}
                    </div>

                    <div className="featuredTitle">
                      {song.emoji}{" "}
                      {song.title}
                    </div>

                    <div className="featuredMeta">
                      {song.cat} • {song.dur}
                    </div>

                    <button
                      className="featuredPlay"
                      onClick={() =>
                        play(song)
                      }
                    >
                      {active && playing
                        ? "❚❚"
                        : "▶"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* MUSIC */}
          <section
            className="library"
            id="songs"
          >
            <div className="sectionHeading">
              <div>
                <h2>
                  🎵 Music Library
                </h2>

                <p>
                  {filtered.length} track
                  {filtered.length !== 1
                    ? "s"
                    : ""} available
                </p>
              </div>
            </div>

            {/* SEARCH */}
            <div className="searchWrap">
              <span className="searchIcon">
                🔎
              </span>

              <input
                className="searchBox"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search songs, Love, Gospel, GenZ..."
              />
            </div>

            {/* CATEGORIES */}
            <div className="cats">
              {CATS.map((item) => (
                <button
                  key={item}
                  className={`cat ${
                    cat === item
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setCat(item)
                  }
                >
                  {item}
                </button>
              ))}
            </div>

            {/* SONG LIST */}
            <div className="songList">
              {filtered.map((song) => {
                const active =
                  current?.id === song.id;

                return (
                  <article
                    className={`songCard ${
                      active ? "active" : ""
                    }`}
                    key={song.id}
                  >
                    <div className="songCover">
                      <img
                        src={COVER}
                        alt=""
                      />

                      <div className="songNumber">
                        {song.emoji}
                      </div>
                    </div>

                    <div className="songInfo">
                      <div className="songTitle">
                        {song.title}
                      </div>

                      <div className="songMeta">
                        {song.cat} •{" "}
                        {song.size} •{" "}
                        {song.dur}
                      </div>

                      <div className="songActions">

                        <a
                          className="smallBtn download"
                          href={musicFile(
                            song.file
                          )}
                          download={song.file}
                        >
                          ⬇ Download
                        </a>

                        <button
                          className="smallBtn order"
                          onClick={() =>
                            orderOnWhatsApp(
                              song
                            )
                          }
                        >
                          💬 Order Similar
                        </button>

                        <button
                          className="smallBtn share"
                          onClick={() =>
                            shareSong(song)
                          }
                        >
                          ↗ Share
                        </button>

                        <button
                          className={`like ${
                            likes[song.id]
                              ? "liked"
                              : ""
                          }`}
                          onClick={() =>
                            toggleLike(
                              song.id
                            )
                          }
                        >
                          {likes[song.id]
                            ? "❤️ Liked"
                            : "♡ Like"}
                        </button>

                      </div>
                    </div>

                    <button
                      className="playBtn"
                      onClick={() =>
                        play(song)
                      }
                      aria-label={`Play ${song.title}`}
                    >
                      {active && playing
                        ? "❚❚"
                        : "▶"}
                    </button>
                  </article>
                );
              })}

              {filtered.length === 0 && (
                <div className="empty">
                  🔎 No songs found for
                  "{search}".
                  <br />
                  Try another song or
                  category.
                </div>
              )}
            </div>
          </section>

          {/* CUSTOM SONG */}
          <section
            className="orderSection glass"
            id="custom"
          >
            <h2>
              🎤 Create Your Custom Song
            </h2>

            <p className="orderIntro">
              Want a song made around your
              name, birthday, relationship,
              friendship, graduation, event
              or special message? Fill in the
              details below and send your
              request directly to Steve Wiizy
              on WhatsApp.
            </p>

            <form onSubmit={submitOrder}>
              <div className="formGrid">

                <div className="field">
                  <label>
                    Your Name
                  </label>

                  <input
                    required
                    value={order.name}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        name:
                          e.target.value,
                      })
                    }
                    placeholder="Your name"
                  />
                </div>

                <div className="field">
                  <label>
                    Occasion
                  </label>

                  <input
                    value={order.occasion}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        occasion:
                          e.target.value,
                      })
                    }
                    placeholder="Birthday, love, graduation..."
                  />
                </div>

                <div className="field">
                  <label>
                    Music Category
                  </label>

                  <select
                    value={order.category}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        category:
                          e.target.value,
                      })
                    }
                  >
                    <option>
                      Love
                    </option>

                    <option>
                      Birthday
                    </option>

                    <option>
                      Gospel
                    </option>

                    <option>
                      GenZ
                    </option>

                    <option>
                      Motivation
                    </option>

                    <option>
                      Vibe
                    </option>

                    <option>
                      Dedicated
                    </option>
                  </select>
                </div>

                <div className="field">
                  <label>
                    Style / Vibe
                  </label>

                  <input
                    value={order.style}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        style:
                          e.target.value,
                      })
                    }
                    placeholder="Afrobeat, R&B, Amapiano..."
                  />
                </div>

                <div className="field">
                  <label>
                    Mood
                  </label>

                  <select
                    value={order.mood}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        mood:
                          e.target.value,
                      })
                    }
                  >
                    <option>
                      Happy
                    </option>

                    <option>
                      Romantic
                    </option>

                    <option>
                      Emotional
                    </option>

                    <option>
                      Inspirational
                    </option>

                    <option>
                      Energetic
                    </option>

                    <option>
                      Chill
                    </option>

                    <option>
                      Spiritual
                    </option>
                  </select>
                </div>

                <div className="field">
                  <label>
                    Song Duration
                  </label>

                  <select
                    value={order.duration}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        duration:
                          e.target.value,
                      })
                    }
                  >
                    <option>
                      Around 2½ minutes
                    </option>

                    <option>
                      Around 3 minutes
                    </option>

                    <option>
                      Around 3½ minutes
                    </option>
                  </select>
                </div>

                <div className="field">
                  <label>
                    Language
                  </label>

                  <select
                    value={order.language}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        language:
                          e.target.value,
                      })
                    }
                  >
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

                <div className="field">
                  <label>
                    Budget
                  </label>

                  <input
                    value={order.budget}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        budget:
                          e.target.value,
                      })
                    }
                    placeholder="e.g. 10,000 UGX"
                  />
                </div>

                <div className="field full">
                  <label>
                    Tell Steve About The Song
                  </label>

                  <textarea
                    value={order.details}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        details:
                          e.target.value,
                      })
                    }
                    placeholder="Tell Steve the names, story, message, people to mention, lyrics ideas or anything else you want in the song..."
                  />
                </div>

              </div>

              <div className="priceBox">
                <div>
                  <div className="priceLabel">
                    CUSTOM SONGS START FROM
                  </div>

                  <div className="priceValue">
                    10,000 UGX
                  </div>
                </div>

                <div className="priceLabel">
                  Negotiable
                </div>
              </div>

              <button
                className="submitOrder"
                type="submit"
              >
                💬 SEND CUSTOM ORDER ON WHATSAPP
              </button>

              <div className="quickOrder">
                <a
                  className="quickBtn"
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                    "Hi Steve Wiizy 👋 I want to ask about custom songs."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  💬 Ask About Pricing
                </a>

                <a
                  className="quickBtn"
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  📲 Chat With Steve
                </a>
              </div>
            </form>
          </section>

          {/* ABOUT */}
          <section className="about glass">
            <h2>
              ❤️ About Steve Wiizy
            </h2>

            <p>
              Steve Wiizy is building a
              creative music space focused
              on original songs, personalized
              music and fresh GenZ sounds.
              Discover the music, share it
              with friends and request a
              custom song for your special
              moment.
            </p>

            <div className="stats">
              <div className="stat">
                <strong>
                  {SONGS.length}+
                </strong>

                <span>
                  MUSIC TRACKS
                </span>
              </div>

              <div className="stat">
                <strong>
                  10K
                </strong>

                <span>
                  STARTING PRICE
                </span>
              </div>

              <div className="stat">
                <strong>
                  24H
                </strong>

                <span>
                  TARGET DELIVERY
                </span>
              </div>
            </div>
          </section>

        </main>

        <footer className="footer">
          ❤️ Steve Wiizy Music •
          Original • Creative • Personal
          <br />
          © 2026 Steve Wiizy. All rights
          reserved.
        </footer>
      </div>

      {/* FIXED MUSIC PLAYER */}
      {current && (
        <div className="player">

          <div className="playerTop">

            <img
              className="playerCover"
              src={COVER}
              alt=""
            />

            <div className="playerInfo">
              <div className="playerTitle">
                {current.emoji}{" "}
                {current.title}
              </div>

              <div className="playerStatus">
                {playing
                  ? "● NOW PLAYING"
                  : "Ⅱ PAUSED"}
              </div>
            </div>

            <div className="playerControls">

              <button
                className="control"
                onClick={previousSong}
                aria-label="Previous song"
              >
                ⏮
              </button>

              <button
                className="control main"
                onClick={() =>
                  play(current)
                }
                aria-label="Play or pause"
              >
                {playing
                  ? "❚❚"
                  : "▶"}
              </button>

              <button
                className="control"
                onClick={nextSong}
                aria-label="Next song"
              >
                ⏭
              </button>

            </div>
          </div>

          <div className="progressRow">

            <span className="time">
              {formatTime(progress)}
            </span>

            <input
              className="progress"
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={
                Math.min(
                  progress,
                  duration || 0
                )
              }
              onChange={changeProgress}
            />

            <span className="time">
              {formatTime(duration)}
            </span>

            <input
              className="volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={changeVolume}
              aria-label="Volume"
            />

          </div>
        </div>
      )}
    </>
  );
}

export default App;
