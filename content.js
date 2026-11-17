// ============================================================
//  EDIT THIS FILE ONLY. Everything on the website comes from here.
//  Keep the quotes "" and commas , exactly as they are.
//  Each section has a "type":
//    "text"      -> paragraphs (and an optional button)
//    "list"      -> items with a title and a line of text
//    "projects"  -> items with a name, text and a GitHub link
//  To remove a section, delete its whole { ... }, block.
//  To reorder sections, move the blocks up or down.
// ============================================================

const PORTFOLIO = {
  title: "Portfolio",
  tagline: "Robotics and Automation student at LPU.",
  heading: "Everything in one place.",
  footer: "\u00A9 2026. Built by hand.",

  // Links at the top bar. Format: ["Label", "section id"]
  nav: [
    ["About", "about"],
    ["Projects", "projects"],
    ["Skills", "skills"],
    ["Contact", "contact"]
  ],

  sections: [
    {
      id: "about",
      title: "About me",
      type: "text",
      paragraphs: [
        "My name is Vinendder Singh Bassi, I'm a Robotics and Automation student at LPU. I like building things that think, from AI based OpenCV systems to cars that teach themselves to drive in simulation.",
        "I'm a first year student and I am looking for every opportunity to learn and explore more. For now my focus is small hardware projects and machine learning"
      ],
      button: { label: "Download resume", url: "Vinendder Singh Bassi.pdf" }
    },
    {
      id: "education",
      title: "Education",
      type: "list",
      items: [
        { title: "B.Tech, Robotics and Automation", text: "Lovely Professional University (LPU). Minor in engineering: AI/ML in second year, embedded systems in third year." },
        { title: "CS50P", text: "Harvard's Introduction to Programming with Python, completed." },
        { title: "School", text: "St. Joseph's Convent Senior Secondary School." }
      ]
    },
    {
      id: "experience",
      title: "Experience",
      type: "list",
      items: [
        { title: "Head Boy, St. Joseph's Convent Senior Secondary School", text: "Coordinated many events such as Independence Day, Teacher's Day, etc." },
        { title: "AI Generalist, Scalar AI", text: "Assessed different AI prompts and Output and gave feedback. Such as Image and Video generation." }
      ]
    },
    {
      id: "achievements",
      title: "Achievements",
      type: "list",
      items: [
        { title: "Completed CS50P", text: "Finished every problem set and a final project." },
        { title: "2nd Place in Jugad Mela", text: "Team showcased different hardware models." }
      ]
    },
    {
      id: "projects",
      title: "Projects",
      type: "projects",
      items: [
        { name: "Obstacle-avoidance car", text: "An ESP32 remote-control car that steers around obstacles on its own.", link: "https://github.com/Vinendder" },
        { name: "Self-driving car simulation", text: "A car that learns to drive around tracks using deep Q-learning in PyTorch.", link: "https://github.com/Vinendder" },
        { name: "Object Recognizing Program", text: "A program which can identify different electronic components using ResNet", link: "https://github.com/Vinendder" },
        { name: "Simple Programs", text: "A collection of programs built while learning Python.", link: "https://github.com/Vinendder/Python_Projects_2026" }
      ],
      button: { label: "See my GitHub", url: "https://github.com/Vinendder" }
    },
    {
      id: "skills",
      title: "Skills",
      type: "list",
      items: [
        { title: "Programming", text: "Python, C, Luau." },
        { title: "Machine learning", text: "PyTorch, deep Q-learning." },
        { title: "Hardware", text: "ESP32 and embedded basics." },
        { title: "Tools", text: "Git, GitHub, VS Code." }
      ]
    },
    {
      id: "certifications",
      title: "Certifications",
      type: "list",
      items: [
        { title: "CS50P: Introduction to Programming with Python", text: "Harvard University, via edX." },
        { text: "Pursuing more..." }
      ]
    },
    {
      id: "extra",
      title: "Extra skills",
      type: "text",
      paragraphs: [
        "Anchoring, Speeches, Debates, Athletics."
      ]
    }
  ],

  // The big block at the bottom. The first button is the solid blue one.
  contact: {
    title: "Let's talk.",
    text: "Open to internships, collaborations and good ideas. The fastest way to reach me is email.",
    buttons: [
      { label: "Send an email", url: "mailto:vinenddersingh@gmail.com" },
      { label: "GitHub", url: "https://github.com/Vinendder" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/vinendder-singh-bassi-b849b4430/" }
    ]
  }
};
