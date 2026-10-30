/* Schwwaaa site content.
   Edit this file to change the site. It is a plain script, so index.html
   also works when opened straight from disk. Keep the commas and quotes. */

window.SCHWWAAA = {
  site: {
    // Shown in the sidebar, newest first. Keep it short.
    whatsNew: [
      { date: "Dec 4, 2026", text: "VideoSync Telethon, online on Discord and live.schwwaaa.net", href: "#events" },
      { date: "Now", text: "Software catalogue updated with 12 projects", href: "#software" },
      { date: "Ongoing", text: "Subscribe to the newsletter for event dates and releases", href: "#newsletter" }
    ],

    // The embedded player is the existing schwwaaa-live-player.html, unchanged.
    live: {
      embed: "schwwaaa-live-player.html?embed=true",
      player: "schwwaaa-live-player.html"
    },

    // Google Form that already collects sign-ups. Field IDs map the form inputs to its entries.
    newsletter: {
      formAction: "https://docs.google.com/forms/d/e/1FAIpQLSfskOAqaiQxcYu8ZAQlL_XnOftaMdXAV_CHpDjKapP9WqENSQ/formResponse",
      fields: {
        name: "entry.789014902",
        email: "entry.2136796510",
        comment: "entry.837356963",
        newsletter: "entry.1141659498"
      }
    },

    socials: [
      { label: "Discord", url: "https://discord.gg/7p9vrdGP", blurb: "Hang out, get event invites first." },
      { label: "YouTube", url: "https://youtube.com/@schwwaaa", blurb: "Full productions, live replays, orientation." },
      { label: "Instagram", url: "https://www.instagram.com/schwwaaa", blurb: "Behind the scenes and quick clips." },
      { label: "The Schwwaaap", url: "https://www.etsy.com/shop/schwwaaap", blurb: "Merch from the Schwwaaa family." }
    ],

  },

  // status: live | beta | partner | idea
  projects: [
    {
      name: "Videobeaux",
      icon: "img/projects/videobeaux.png",
      status: "live",
      summary: "Patch video. Watch it change.",
      description: "A video playground: drag 155 effect programs onto a canvas, wire them into a pipeline, press Run. Glitch and corruption looks, frame effects, colour and filters, compositing, transcript-driven editing, and AI captioning. Use the node GUI or script the same programs from the CLI. Everything runs on your machine, with no accounts and no API keys.",
      tags: ["video", "artists"],
      links: [
        { label: "Visit", url: "https://videobeaux.online" },
        { label: "GitHub", url: "https://github.com/schwwaaa/videobeaux" }
      ]
    },
    {
      name: "VS20 VideoSampler",
      icon: "img/projects/vs10.png",
      status: "live",
      summary: "A video sampler: slice clips into pads, record a jam, take it to output.",
      description: "Add sources, slice them into pads, set markers and in/out points, then record and take the result live. Effects, presets and an output window are built in.",
      tags: ["video", "tool"],
      links: [{ label: "Open VS20", url: "https://vs20.schwwaaa.net" }]
    },
    {
      name: "FRED",
      icon: "",
      status: "live",
      summary: "Fast Response Effects Deck: a local soundboard and voice changer.",
      description: "FRED shows up as its own microphone, so it works in any app. Built for radio shows, podcasts, games, role-play and chat with friends. No cloud, no account.",
      tags: ["audio", "tool"],
      links: [{ label: "Visit", url: "https://fred.schwwaaa.net" }]
    },
    {
      name: "HUFF",
      icon: "img/projects/huff.png",
      status: "live",
      summary: "Real-time datamosh and glitch-art for the desktop.",
      description: "Load a video file or connect a webcam, then sculpt the image with a live effect chain: datamosh tile displacement, feedback loops, flow warps, symmetry folds, solarise, scanline corruption and ghost trails. A controls window drives a fullscreen output, with Syphon, Spout, MIDI and OSC support. There is also a browser version, HUFF Web.",
      tags: ["video", "tool"],
      links: [
        { label: "HUFF Web", url: "https://schwwaaa.github.io/huff-web/" },
        { label: "Reference", url: "https://schwwaaa.github.io/huff-docs/reference/index.html" },
        { label: "GitHub", url: "https://github.com/schwwaaa/huff" }
      ]
    },
    {
      name: "LiquidTitler9000",
      icon: "",
      status: "beta",
      summary: "Lower-thirds and title graphics for OBS, pushed from a browser tab.",
      description: "A self-hosted, browser-based lower-third and title graphics controller for OBS Studio. Run the server on any machine, open the console in a browser tab, and push styled text overlays to OBS in real time. No plugins required.",
      tags: ["obs", "graphics"],
      links: []
    },
    {
      name: "AdSlicer",
      icon: "img/projects/adslicer.png",
      status: "live",
      summary: "Boundary detection and segment slicing for VHS and broadcast recordings.",
      description: "Built for archival work: finds commercial and segment boundaries in long-form recordings, lets you review them, and exports the segments. Desktop app built with Tauri, Rust and FFmpeg for macOS, Windows and Linux.",
      tags: ["video", "archive"],
      links: [
        { label: "Help & app", url: "https://schwwaaa.github.io/AdSlicer/#home" },
        { label: "GitHub", url: "https://github.com/schwwaaa/AdSlicer" }
      ]
    },
    {
      name: "DropZoneOps",
      icon: "img/projects/dropzoneops.png",
      status: "live",
      summary: "Build broadcast-ready M3U playlists without touching a text editor.",
      description: "Drop local files, folders or remote media URLs, arrange them into order, and tag entries as content or commercial. Automate commercial breaks and export clean M3U playlists for VLC, OBS and compatible players. Processing happens in your browser.",
      tags: ["web", "broadcast"],
      links: [
        { label: "Open", url: "https://schwwaaa.github.io/drop-zone-ops/" },
        { label: "GitHub", url: "https://github.com/schwwaaa/drop-zone-ops" }
      ]
    },
    {
      name: "SSHH",
      icon: "",
      status: "beta",
      summary: "Spectral Synthesis for Harmonic Habitats: a procedural ambient soundscape generator.",
      description: "A modular procedural ambient noise and soundscape generator. Blend noise colors, layer in real bird recordings from Xeno-Canto, synthesize wind, rain, ocean and thunder, and shape the mix with reverb, filtering, compression and stereo widening. Animate almost any parameter over time: storms building, birds waking up, a space opening up.",
      tags: ["audio", "generative"],
      links: []
    },
    {
      name: "TURRRBO",
      icon: "img/projects/turrrbo.png",
      status: "live",
      summary: "A free, offline StyleGAN instrument for navigating latent space.",
      description: "Generate images by moving through the latent space of pretrained StyleGAN2 models. This is not a text-to-image tool: you navigate a space the network learned. Runs entirely on your machine, with no API key, no subscription and no internet connection needed. Free, non-commercial, macOS.",
      tags: ["generative", "tool"],
      links: [{ label: "Open", url: "https://schwwaaa.github.io/TURRRBO/" }]
    },
    {
      name: "OBS Relay",
      icon: "img/projects/obsrelay.png",
      status: "live",
      summary: "Remote control for OBS Studio over REST, WebSocket and OSC.",
      description: "Sits between your control surfaces and OBS. Switch scenes, manage video playlists, start and stop streams, and control audio from a phone, tablet, custom controller or script. Includes a TouchOSC bridge, an M3U playlist scheduler and overlay control.",
      tags: ["obs", "tool"],
      links: [{ label: "Open", url: "https://schwwaaa.github.io/obs-relay/" }]
    },
    {
      name: "Raspi Composite Player",
      icon: "img/projects/rpi.png",
      status: "beta",
      summary: "A ready-made looping media player for Raspberry Pi composite output.",
      description: "Composite A/V support past Raspberry Pi OS Bullseye is mostly gone, so this image boots a Pi 3 Model B+ straight into a looping media player. Copy MP4 files into the media folder over SFTP or SCP and they loop in alphanumeric order.",
      tags: ["hardware", "video"],
      links: [{ label: "GitHub", url: "https://github.com/schwwaaa/raspi-composite-player" }]
    },
    {
      name: "Illogica Factory",
      icon: "img/projects/illogicafactory.png",
      status: "live",
      summary: "Automated AI cannibalism: AI sharing what it learned about your world.",
      description: "A creative automation lab. Each request generates seed words, a title, a description and a generative video prompt, then exports a YouTube-short-style video to a folder. Run the looper to repeat every two minutes. Python 3.11.",
      tags: ["ai", "automation"],
      links: [
        { label: "Open", url: "https://schwwaaa.github.io/illogica-factory/" },
        { label: "GitHub", url: "https://github.com/schwwaaa/illogica-factory" }
      ]
    }
  ],

  // kind: music-video | short-film | vignette. youtube: video ID, or null for a placeholder.
  productions: [
    {
      title: "Schwwaaa Core Ethos",
      kind: "vignette",
      year: "",
      youtube: "e7QLoMve8BE",
      blurb: "Our orientation video. What Schwwaaa is, and what we believe."
    },
    {
      title: "Your Music Video Here",
      kind: "music-video",
      year: "",
      youtube: null,
      blurb: "Placeholder. Add a YouTube ID to link a real video."
    }
  ],

  // date: "YYYY-MM-DD" is formatted for display; any other text is shown as written.
  events: {
    upcoming: [
      {
        title: "VideoSync Telethon",
        date: "2026-12-04",
        location: "Online, on the Schwwaaa Discord and live.schwwaaa.net",
        blurb: "A live telethon from the Schwwaaa crew, streamed online. Join the Discord for the schedule and to hang out.",
        url: "https://discord.gg/7p9vrdGP"
      }
    ],
    past: [
      {
        title: "VideoSync 2025",
        date: "2025-08-15",
        location: "Portland, OR",
        blurb: "Schwwaaa and Vondas Software at VideoSync, Aug 15 to 17. Came to meet VB and the Schwwaaa family.",
        url: "https://www.synthlibraryportland.org/events/video-sync",
        youtube: null
      },
      { title: "Schwwaaa Corporate Christmas Spectacular Wintertime Experience", date: "Holiday season", blurb: "Our annual holiday party!", youtube: "3C6S-6UM5Xk" },
      { title: "Valentine's Day Heart Health Seminar", date: "Valentine's Day", blurb: "Hearts are top of mind.", youtube: "vVYSf90GH5E" },
      { title: "All Day USA", date: "2024 election", blurb: "Special 2024 election coverage.", youtube: "xhum7_lTmts" },
      { title: "Richard We Hardly Knew Ye", date: "", blurb: "Honoring Richard Simmons.", youtube: "4wCcPbMHzVo" },
      { title: "A Leap Year Jubilee", date: "Leap Day 2024", blurb: "With a very special guest!", youtube: "vwxY_rXSUaI" },
      { title: "RIP the_garbage_man", date: "", blurb: "A memorial vigil for a dearly departed friend.", youtube: "KiHFQBMxNQU" }
    ]
  }
};
