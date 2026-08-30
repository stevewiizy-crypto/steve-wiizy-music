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

  /*
   * SINGLE AUDIO PLAYER
   *
   * Only one audio element exists on the whole page.
   * Selecting another song changes this player's source.
   * Therefore two songs cannot play simultaneously.
   */
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

  const toggleLike = (songId) => {
    setLikes((previous) => ({
      ...previous,
      [songId]: (previous[songId] || 0) + 1,
    }));
  };

  const orderSimilar = (song) => {
    const message = `Hi Steve, I want a song similar to "${song.title}".`;

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
    const shareText = `🎵 ${song.title} by Steve Wiizy`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: song.title,
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // Sharing cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${shareText} - ${window.location.href}`
        );

        alert("Song link copied!");
      } catch {
        alert("Copying the link is not supported on this browser.");
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
    <div className="min-h-screen bg-black text-white">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-5 py-4">

          <div className="flex items-center justify-between">

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700 flex items-center justify-center font-black">
                SW
              </div>

              <div className="text-left">
                <p className="font-black tracking-wide">
                  STEVE <span className="text-red-500">WIIZY</span>
                </p>

                <p className="text-[10px] text-zinc-500">
                  MUSIC
                </p>
              </div>
            </button>

            {/* DESKTOP NAVIGATION */}

            <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
              <button
                onClick={scrollToMusic}
                className="hover:text-white transition"
              >
                Music
              </button>

              <button
                onClick={scrollToOrder}
                className="hover:text-white transition"
              >
                Custom Song
              </button>

              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 text-black px-4 py-2 rounded-full font-bold"
              >
                WhatsApp
              </a>
            </nav>

            {/* MOBILE MENU */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl"
              aria-label="Open menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>

          {menuOpen && (
            <div className="md:hidden border-t border-zinc-900 mt-4 pt-4 pb-2 flex flex-col gap-3">

              <button
                onClick={scrollToMusic}
                className="text-left py-2 text-zinc-300"
              >
                🎵 Music
              </button>

              <button
                onClick={scrollToOrder}
                className="text-left py-2 text-zinc-300"
              >
                🎤 Custom Song
              </button>

              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 text-black font-bold text-center py-3 rounded-xl"
              >
                💬 WhatsApp Steve
              </a>

            </div>
          )}

        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="max-w-6xl mx-auto px-5 pt-12 pb-10">

        <div className="text-center">

          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-700 flex items-center justify-center text-4xl font-black shadow-2xl">
            SW
          </div>

          <p className="text-red-500 font-bold text-sm mt-6 tracking-widest">
            STEVE WIIZY MUSIC
          </p>

          <h1 className="text-4xl md:text-7xl font-black mt-2 leading-tight">
            Your Story.
            <br />
            <span className="text-red-500">Your Vibe.</span>
            <br />
            Your Song.
          </h1>

          <p className="text-zinc-400 max-w-xl mx-auto mt-5">
            Listen to my music, discover different vibes and
            order a custom song for your special moment.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">

            <button
              onClick={scrollToMusic}
              className="bg-red-600 hover:bg-red-500 px-7 py-4 rounded-full font-black transition"
            >
              🎧 Explore Music
            </button>

            <button
              onClick={scrollToOrder}
              className="bg-white hover:bg-zinc-200 text-black px-7 py-4 rounded-full font-black transition"
            >
              🎤 Order Custom Song
            </button>

          </div>

        </div>

      </section>

      {/* ================= MUSIC ================= */}

      <main
        id="music"
        className="max-w-6xl mx-auto px-5 pb-40"
      >

        <div className="border-t border-zinc-900 pt-10">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

            <div>
              <p className="text-red-500 text-sm font-bold">
                MY MUSIC
              </p>

              <h2 className="text-3xl md:text-4xl font-black mt-1">
                Latest Tracks 🔥
              </h2>

              <p className="text-zinc-500 text-sm mt-2">
                {SONGS.length} songs available to listen to.
              </p>
            </div>

            {/* SEARCH */}

            <div className="w-full md:w-80">

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Search songs..."
                className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 outline-none focus:border-red-500 transition"
              />

            </div>

          </div>

          {/* CATEGORIES */}

          <div className="flex gap-2 overflow-x-auto py-6 scrollbar-hide">

            {CATEGORIES.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold border transition ${
                  category === item
                    ? "bg-red-600 border-red-600"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          {/* SONG GRID */}

          <div className="grid md:grid-cols-2 gap-5">

            {filteredSongs.map((song) => {

              const active = currentSong?.id === song.id;

              return (
                <article
                  key={song.id}
                  className={`rounded-3xl p-5 border transition ${
                    active
                      ? "bg-zinc-900 border-red-600 shadow-xl shadow-red-950/20"
                      : "bg-zinc-950 border-zinc-900 hover:border-zinc-700"
                  }`}
                >

                  {/* SONG HEADER */}

                  <div className="flex items-center gap-4">

                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                        active
                          ? "bg-red-600"
                          : "bg-zinc-900"
                      }`}
                    >
                      {song.icon}
                    </div>

                    <div className="flex-1 min-w-0">

                      <h3 className="font-black text-lg truncate">
                        {song.title}
                      </h3>

                      <p className="text-red-500 text-xs font-bold mt-1">
                        {song.category}
                      </p>

                    </div>

                    {/* PLAY */}

                    <button
                      onClick={() => playSong(song)}
                      className="w-13 h-13 min-w-13 rounded-full bg-white text-black font-black text-xl flex items-center justify-center hover:scale-105 transition"
                      aria-label={
                        active && isPlaying
                          ? "Pause song"
                          : "Play song"
                      }
                    >
                      {active && isPlaying ? "⏸" : "▶"}
                    </button>

                  </div>

                  {/* ACTIVE INDICATOR */}

                  {active && (
                    <div className="mt-4 text-xs text-red-500 font-bold">
                      {isPlaying
                        ? "● NOW PLAYING"
                        : "Ⅱ PAUSED"}
                    </div>
                  )}

                  {/* ACTION BUTTONS */}

                  <div className="grid grid-cols-2 gap-2 mt-5">

                    <a
                      href={song.file}
                      download
                      className="bg-green-500 hover:bg-green-400 text-black font-black py-3 rounded-xl text-center text-sm transition"
                    >
                      ⬇️ Download
                    </a>

                    <button
                      onClick={() => orderSimilar(song)}
                      className="bg-white hover:bg-zinc-200 text-black font-black py-3 rounded-xl text-sm transition"
                    >
                      💬 Order Similar
                    </button>

                  </div>

                  {/* SECONDARY ACTIONS */}

                  <div className="flex justify-between mt-4 text-sm text-zinc-500">

                    <button
                      onClick={() => toggleLike(song.id)}
                      className="hover:text-red-400 transition"
                    >
                      ❤️ {likes[song.id] || 0}
                    </button>

                    <button
                      onClick={() => shareSong(song)}
                      className="hover:text-white transition"
                    >
                      ↗️ Share
                    </button>

                  </div>

                </article>
              );
            })}

          </div>

          {/* NO RESULTS */}

          {filteredSongs.length === 0 && (
            <div className="text-center py-20">

              <div className="text-4xl">
                🎵
              </div>

              <p className="text-zinc-400 mt-3">
                No songs found for "{search}".
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="text-red-500 font-bold mt-3"
              >
                Show all songs
              </button>

            </div>
          )}

        </div>

        {/* ================= CUSTOM SONG ================= */}

        <section
          id="order"
          className="mt-16 rounded-3xl p-7 md:p-12 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 text-center"
        >

          <div className="w-16 h-16 mx-auto rounded-full bg-red-600 flex items-center justify-center text-3xl">
            🎤
          </div>

          <p className="text-red-500 text-sm font-bold mt-5">
            CUSTOM MUSIC
          </p>

          <h2 className="text-3xl md:text-4xl font-black mt-2">
            Want Your Own Song?
          </h2>

          <p className="text-zinc-400 max-w-xl mx-auto mt-3">
            Order a personalized song for a birthday,
            dedication, celebration, love story or another
            special moment.
          </p>

          <p className="text-yellow-400 font-black text-xl mt-5">
            From 10,000 UGX
          </p>

          <p className="text-zinc-500 text-xs mt-1">
            Price can be discussed depending on the project.
          </p>

          <button
            onClick={orderCustomSong}
            className="bg-green-500 hover:bg-green-400 text-black font-black px-8 py-4 rounded-full mt-6 transition"
          >
            💬 Order on WhatsApp
          </button>

        </section>

      </main>

      {/* ================= SHARED AUDIO PLAYER ================= */}

      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 shadow-2xl">

          <div className="max-w-6xl mx-auto px-4 py-3">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 min-w-12 rounded-xl bg-red-600 flex items-center justify-center text-xl">
                {currentSong.icon}
              </div>

              <div className="flex-1 min-w-0">

                <p className="font-black text-sm truncate">
                  {currentSong.title}
                </p>

                <p className="text-xs text-zinc-500">
                  {currentSong.category} • Steve Wiizy
                </p>

              </div>

              <button
                onClick={() => playSong(currentSong)}
                className="w-11 h-11 min-w-11 rounded-full bg-white text-black font-black"
              >
                {isPlaying ? "⏸" : "▶"}
              </button>

            </div>

            <audio
              ref={audioRef}
              controls
              className="w-full mt-2 h-9"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />

          </div>

        </div>
      )}

    </div>
  );
}
