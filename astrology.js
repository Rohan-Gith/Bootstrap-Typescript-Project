const zodiacInsights = {
  aries: {
    traits: "Bold, pioneering, and full of cosmic fire.",
    love: "Lead with your heart but listen twice before reacting.",
    career: "New challenges spark your creativity—take initiative.",
    wellness: "Channel your energy into purposeful movement today.",
  },
  taurus: {
    traits: "Grounded, sensual, and inspired by comfort.",
    love: "Slow, intentional gestures build lasting bonds.",
    career: "Consistency wins—review finances and practical plans.",
    wellness: "Nourish your body with wholesome meals and rest.",
  },
  gemini: {
    traits: "Curious, social, and quick-witted.",
    love: "Conversations open doors—share your honest thoughts.",
    career: "Collaborations thrive when you lead with curiosity.",
    wellness: "Balance your mind with journaling or breathwork.",
  },
  cancer: {
    traits: "Intuitive, compassionate, and nurturing.",
    love: "Create spaces where emotions can be expressed freely.",
    career: "Empathy is your superpower—support a teammate today.",
    wellness: "Ground yourself with water rituals or meditation.",
  },
  leo: {
    traits: "Radiant, courageous, and heart-centered.",
    love: "Compliments and appreciation rekindle sparks.",
    career: "Spotlight moments arrive—share your ideas confidently.",
    wellness: "Movement that feels like dance reignites your joy.",
  },
  virgo: {
    traits: "Insightful, detail-oriented, and devoted.",
    love: "Acts of service speak volumes—notice the little things.",
    career: "Strategic planning now saves time later—organize your workflow.",
    wellness: "A calming ritual helps soften analytical edges.",
  },
  libra: {
    traits: "Harmonious, diplomatic, and refined.",
    love: "Seek balance by hearing every side of the story.",
    career: "Your charm bridges gaps—facilitate important conversations.",
    wellness: "Find beauty in movement, like yoga or stretching.",
  },
  scorpio: {
    traits: "Magnetic, intuitive, and transformative.",
    love: "Deep talks reveal hidden desires—lean into vulnerability.",
    career: "Focus on research or passion projects for breakthroughs.",
    wellness: "Release tension through breathwork and grounding.",
  },
  sagittarius: {
    traits: "Adventurous, visionary, and free-spirited.",
    love: "Shared experiences expand your connection.",
    career: "A bold idea deserves exploration—map your next venture.",
    wellness: "Get outdoors to reset your inner compass.",
  },
  capricorn: {
    traits: "Ambitious, disciplined, and wise.",
    love: "Quality time beats quantity—invest in meaningful moments.",
    career: "Structure your goals—progress follows a solid plan.",
    wellness: "Ground with mindful breathing between commitments.",
  },
  aquarius: {
    traits: "Innovative, progressive, and community-focused.",
    love: "Authenticity attracts—share your unconventional dreams.",
    career: "Teamwork around humanitarian ideas flourishes today.",
    wellness: "Try a new wellness modality to spark inspiration.",
  },
  pisces: {
    traits: "Dreamy, empathetic, and imaginative.",
    love: "Creativity fuels romance—write, draw, or sing together.",
    career: "Trust your intuition on collaborative projects.",
    wellness: "Protect your energy with gentle boundaries.",
  },
};

const moonPhaseCycle = [
  { phase: "New Moon", focus: "Set intentions and invite fresh starts." },
  { phase: "Waxing Crescent", focus: "Cultivate habits that support your dreams." },
  { phase: "First Quarter", focus: "Take decisive action toward your goals." },
  { phase: "Waxing Gibbous", focus: "Refine plans and trust the momentum." },
  { phase: "Full Moon", focus: "Celebrate growth and release what no longer serves." },
  { phase: "Waning Gibbous", focus: "Share wisdom and practice gratitude." },
  { phase: "Last Quarter", focus: "Course-correct and focus on inner alignment." },
  { phase: "Waning Crescent", focus: "Rest, recharge, and dream about what's next." },
];

const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const userMessageInput = document.getElementById("userMessage");
const userNameInput = document.getElementById("userName");
const zodiacSelect = document.getElementById("zodiacSign");
const clearChatBtn = document.getElementById("clearChat");

function renderHighlights() {
  const highlights = document.getElementById("dailyHighlights");
  const today = new Date();
  const dayIndex = today.getDate() % moonPhaseCycle.length;
  const moonIndex = (today.getDate() + 2) % moonPhaseCycle.length;

  const highlightTemplate = `
    <p class="badge-zodiac">${today.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    })}</p>
    <p class="mb-2">
      <strong>Celestial Weather:</strong> ${moonPhaseCycle[dayIndex].focus}
    </p>
    <p class="mb-0">
      <strong>Lunar Pulse:</strong> Currently influenced by the <em>${
        moonPhaseCycle[moonIndex].phase
      }</em> energy.
    </p>
  `;

  highlights.innerHTML = highlightTemplate;
}

function renderMoonPhases() {
  const moonList = document.getElementById("moonPhases");
  moonList.innerHTML = moonPhaseCycle
    .map(
      (entry) => `
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div>
            <h6 class="mb-1">${entry.phase}</h6>
            <small>${entry.focus}</small>
          </div>
          <span class="badge rounded-pill bg-primary">☆</span>
        </li>
      `
    )
    .join("");
}

function appendMessage({ author, text, type }) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${type}`;
  wrapper.innerHTML = `
    <div class="message-avatar">${author[0].toUpperCase()}</div>
    <div>
      <div class="message-content">${text}</div>
      <div class="message-time">${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}</div>
    </div>
  `;
  chatWindow.appendChild(wrapper);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function formatUserMessage(message) {
  return message.trim().replace(/</g, "&lt;");
}

function buildAstroResponse({ name, sign, message }) {
  const normalizedSign = sign?.toLowerCase();
  const profile = zodiacInsights[normalizedSign];

  const intro = profile
    ? `Hi ${name || "Star Voyager"}, tuning into your ${
        normalizedSign.charAt(0).toUpperCase() + normalizedSign.slice(1)
      } rhythms.`
    : `Hi ${name || "Star Voyager"}, let's explore what the cosmos is whispering.`;

  const focusArea = /(love|relationship|romance)/i.test(message)
    ? "love"
    : /(work|career|job|business|success)/i.test(message)
    ? "career"
    : /(health|wellness|energy|self-care|stress)/i.test(message)
    ? "wellness"
    : null;

  const guidance = profile
    ? focusArea
      ? profile[focusArea]
      : profile.traits
    : "Focus on what feels aligned—your intuition is a reliable compass today.";

  const followUp = focusArea
    ? "If you want to explore other areas like career or wellness, just ask!"
    : "Curious about love, career, or wellness? I can attune to each.";

  const moonMessage = moonPhaseCycle[Math.floor(Math.random() * moonPhaseCycle.length)];

  return `${intro}<br><br><strong>Guidance:</strong> ${guidance}<br><br><em>Moon Muse:</em> ${moonMessage.focus}<br><br>${followUp}`;
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const rawMessage = userMessageInput.value;
  const cleanMessage = formatUserMessage(rawMessage);
  if (!cleanMessage) return;

  appendMessage({ author: "You", text: cleanMessage, type: "user" });

  const response = buildAstroResponse({
    name: formatUserMessage(userNameInput.value),
    sign: zodiacSelect.value,
    message: cleanMessage,
  });

  setTimeout(() => {
    appendMessage({ author: "StarSense", text: response, type: "bot" });
  }, 400);

  userMessageInput.value = "";
  userMessageInput.focus();
});

clearChatBtn.addEventListener("click", () => {
  chatWindow.innerHTML = "";
});

renderHighlights();
renderMoonPhases();
appendMessage({
  author: "StarSense",
  text: "Welcome! Share your name, choose your sign, and ask a question when you're ready.",
  type: "bot",
});
