export const myProjects = [
  {
    id: 1,
    title: "Restaurant Platform Frontend",
    description:
      "An interactive single-page restaurant frontend that showcases a modern dining brand",
    subDescription: [
      "Developed a modern, responsive restaurant frontend using HTML, CSS, and JavaScript to showcase dining services and menu offerings",
      "Built intuitive navigation with light/dark theming, sticky header, and scroll-aware interactions to enhance user experience.",
      "Structured content into clear sections with interactive elements and animations for visual engagement.",
      "Designed a mobile-friendly layout with persistent theme preferences and smooth scroll features for cross-device usability",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/restaurant.png",
    tags: [
      {
        id: 1,
        name: "HTML5",
        path: "/assets/logos/html5.svg",
      },
      {
        id: 2,
        name: "CSS3",
        path: "/assets/logos/css3.svg",
      },
      {
        id: 3,
        name: "Javascript",
        path: "/assets/logos/javascript.svg",
      },
    ],
  },
  {
    id: 2,
    title: "BitForge",
    description:
      "BitForge is a custom-built torrent-like peer-to-peer file sharing client designed from scratch in Python.",
    subDescription: [
      "Built a custom peer-to-peer file sharing system inspired by the BitTorrent protocol using Python, demonstrating deep understanding of networking and distributed systems.",
      "Implemented torrent file parsing, tracker-based peer discovery, parallel chunk downloads, resume support, and chunk verification for reliable, resumable transfers.",
      "Integrated a PyQt5 GUI with progress visualization, theme toggle, and threaded backend for a seamless user experience.",
      "Designed modular components for seeding, uploading, and multi-peer communication, enabling experimentation with P2P mechanics and extensibility.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/bitforge.png",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.svg",
      },
      {
        id: 2,
        name: "PyQt5",
        path: "/assets/logos/pyqt.svg",
      },
    ],
  },
  {
    id: 3,
    title: "VCS Implementation",
    description:
      "This system is inspired by the core principles of Git, reimagined through the lens of SQL",
    subDescription: [
      "Implemented commit tracking, branching, and merging logic using relational database constructs and hashing for history management.",
      "Developed a Tkinter GUI frontend for intuitive interaction with version control actions like commit creation, branch management, and history viewing.",
      "Explored Git-inspired design patterns in a novel context, blending database engineering with user-friendly tooling to deepen understanding of VCS principles.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/vcs.png",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.svg",
      },
      {
        id: 2,
        name: "MySQL",
        path: "/assets/logos/mysql.svg",
      },
    ],
  },
  {
    id: 4,
    title: "VPN Tunnel",
    description:
      "A simplified educational implementation of how VPN (Virtual Private Network) technology works.",
    subDescription: [
      "Implemented AES symmetric encryption and RSA key exchange with real-time packet capture/forwarding using Pcap4J for hands-on learning of network security concepts.",
      "Designed a Swing-based GUI featuring dark/light themes, traffic visualization, and responsive controls to monitor VPN traffic and encryption state.",
      "Structured threaded networking, socket communication, and encryption modules for extensibility and experimentation with secure networking workflows.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/vpn.png",
    tags: [
      {
        id: 1,
        name: "Java",
        path: "/assets/logos/java.svg",
      },
    ],
  },
  {
    id: 5,
    title: "Custom Web-Server in PHP",
    description:
      "A custom multi-client, socket-based web server written entirely in PHP.",
    subDescription: [
      "Built a custom multi-client web server from scratch in PHP using low-level socket programming for handling HTTP requests and responses.",
      "Implemented static file serving, custom routing, file uploads/downloads, MIME detection, and secure request handling.",
      "Designed multi-client non-blocking socket support and logging for concurrent request processing and monitoring.",
      "Focused on core networking fundamentals and PHP server internals to demonstrate understanding of server-side systems beyond typical Apache/Nginx usage.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/webserver.jpeg",
    tags: [
      {
        id: 1,
        name: "PHP",
        path: "/assets/logos/php.svg",
      },
      {
        id: 2,
        name: "HTML5",
        path: "/assets/logos/html5.svg",
      },
      {
        id: 3,
        name: "CSS3",
        path: "/assets/logos/css3.svg",
      },
    ],
  },
  {
    id: 6,
    title: "Live Cyberattack Detector",
    description:
      "The Cyberattack Detection & Visualization Dashboard is an interactive 3D visualization system that simulates and displays real-time cyberattack activity across the globe.",
    subDescription: [
      "Built a real-time cyberattack detection and visualization system using machine learning to identify DDoS-style network threats and display them on an interactive dashboard.",
      "Implemented backend detection logic with Python, Flask, and trained models to continuously monitor traffic and flag abnormal activity.",
      "Developed an immersive 3D frontend visualization using HTML/CSS/JavaScript and Three.js to represent attack sources and patterns globally.",
      "Integrated real-time analytics, logs, and visual alerts to support interactive insights into cybersecurity events and enhance situational awareness.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/cyberattack.png",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.svg",
      },
      {
        id: 2,
        name: "TensorFlow",
        path: "/assets/logos/tensorflow.svg",
      },
      {
        id: 3,
        name: "Pandas",
        path: "/assets/logos/pandas.svg",
      },
      {
        id: 4,
        name: "HTML5",
        path: "/assets/logos/html5.svg",
      },
      {
        id: 5,
        name: "CSS3",
        path: "/assets/logos/css3.svg",
      },
      {
        id: 6,
        name: "Javascript",
        path: "/assets/logos/javascript.svg",
      },
    ],
  },
];

export const mySocials = [
  {
    name: "GitHub",
    href: "https://github.com/Arijit2175",
    icon: "/assets/socials/github.svg",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/arijitkarmakar2175",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/oreojit/",
    icon: "/assets/socials/instagram.svg",
  },
];

export const experiences = [
  {
    title: "Summer Intern",
    job: "Full Stack Developer Intern",
    date: "2025-2025",
    contents: [
      "Developed a basic applicant registration system using Java Full Stack to streamline recruitment processes.",
      "Designed and implemented intuitive user interfaces with HTML, CSS and Javascript for enhanced user experience.",
      "The backend was built using Java Servlets to handle business logic and data processing efficiently.",
      "Made use of the Maven build automation tool to manage project dependencies and streamline the build process.",
      "Database operations were performed using MySQL to ensure reliable data storage and retrieval.",
    ],
  }
];
