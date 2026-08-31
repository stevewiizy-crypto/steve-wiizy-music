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
            -apple
