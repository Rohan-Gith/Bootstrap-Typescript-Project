(function () {
  const horoscopeData = {
    aries: {
      general: 'Your courage attracts new beginnings. Capture the opportunity that arrives around sunset and write down your wins before bed.',
      love: 'Plan a spontaneous gesture; heartfelt words heal a lingering misunderstanding.',
      career: 'A senior notices your initiative. Volunteer for the visible task to unlock a fresh revenue stream.',
      health: 'Hydrate generously and stretch your shoulders. Mars energy needs a gentle release today.'
    },
    taurus: {
      general: 'Ground yourself with a short walk in nature. Financial stability increases when you declutter your workspace.',
      love: 'Sensuous Venus vibes inspire romance. Share a slow meal and open a long-pending conversation.',
      career: 'Your patience wins a delayed project. Review details before approval to avoid rework.',
      health: 'Focus on slow breathing exercises. Herbal tea before bed resets your rhythm.'
    },
    gemini: {
      general: 'Conversations crackle with insights. Capture ideas in voice notes to revisit during the week.',
      love: 'Flirtation turns meaningful when you listen more than you speak today.',
      career: 'Schedule brainstorming between 3-5 PM; collaborative projects spark profitable directions.',
      health: 'Digital detox for 20 minutes restores your nervous system. Keep sugar intake moderate.'
    },
    cancer: {
      general: 'Moonlight reveals hidden allies. Reconnect with someone from your hometown for emotional strength.',
      love: 'Offer reassurance to your partner. Your vulnerability creates deeper trust.',
      career: 'A domestic responsibility inspires a business idea—sketch the roadmap tonight.',
      health: 'Prioritise restful sleep. Lavender aroma or calming chants soothe your energy.'
    },
    leo: {
      general: 'Step into the spotlight. Sharing your story inspires the right community support.',
      love: 'Compliment your partner publicly. Appreciation brings joyful surprise plans.',
      career: 'Take the mic in meetings; leadership opportunities manifest through public speaking.',
      health: 'Add cardio to your routine to release excess fire energy. Avoid overindulgence late night.'
    },
    virgo: {
      general: 'Organise your calendar and colour-code tasks. Precision now saves hours later in the week.',
      love: 'Support arrives when you articulate your needs clearly and softly.',
      career: 'Document a process—this becomes a micro-course or template you can monetise.',
      health: 'Focus on gut health with warm, home-cooked meals. Avoid cold beverages post-sunset.'
    },
    libra: {
      general: 'Balance your yes and no. A diplomatic response keeps multiple options open.',
      love: 'Plan a shared creative activity. Art, music, or dance reconnects you instantly.',
      career: 'Collaborations flourish when responsibilities are written down today.',
      health: 'Align your posture. Gentle yin yoga or pilates keeps your energy balanced.'
    },
    scorpio: {
      general: 'Your intuition is razor sharp. Journal your dreams—they hold profitable clues.',
      love: 'Expect a magnetic connection. Honest conversation transforms a situationship.',
      career: 'Confidential negotiations go in your favour. Protect sensitive data with new passwords.',
      health: 'Detox with infused water. Focus on lymphatic drainage through dry brushing.'
    },
    sagittarius: {
      general: 'Adventure calls even within routine. Sign up for a short workshop to fuel your curiosity.',
      love: 'Plan a mini road trip with your partner. Shared laughter clears old doubts.',
      career: 'Pitch your idea to someone overseas; global luck is lit.',
      health: 'Hip-opening stretches release stored tension. Keep caffeine intake light.'
    },
    capricorn: {
      general: 'Structure your finances. A disciplined habit now builds generational wealth.',
      love: 'Set a realistic relationship goal for the next quarter and share it.',
      career: 'Delegate a repetitive task to free up time for strategic thinking.',
      health: 'Take a mindful break between meetings. Add iron-rich foods to your meals.'
    },
    aquarius: {
      general: 'Innovation flows effortlessly. Connect with a community of creators to exchange ideas.',
      love: 'Friendship energy deepens romance. Collaborate on a cause together.',
      career: 'Experiment with a new tool; it soon becomes your signature offering.',
      health: 'Balance nervous energy with grounding breathwork. Limit late-night screen time.'
    },
    pisces: {
      general: 'Your dreams are vivid. Transform them into an art project or guided meditation for clients.',
      love: 'Express empathy but hold your boundaries. Compassion attracts devotion.',
      career: 'Focus on soulful branding—your story needs to be on your landing page.',
      health: 'Salt baths or foot soaks restore your aura. Hydrate with coconut water.'
    }
  };

  const toneAdjustments = {
    balanced: '',
    motivational: ' Reminder: the universe is cheering for you. Take one bold action within the next 24 hours.',
    cautious: ' Move slowly and double-check promises. Delay decisions if your gut feels uneasy.'
  };

  const quickBookingForm = document.getElementById('quickBookingForm');
  const contactForm = document.getElementById('contactForm');
  const horoscopeForm = document.getElementById('horoscopeForm');
  const horoscopePreview = document.getElementById('horoscopePreview');
  const copyHoroscopeButton = document.getElementById('copyHoroscope');
  const yearHolder = document.getElementById('currentYear');

  if (yearHolder) {
    yearHolder.textContent = new Date().getFullYear().toString();
  }

  function handleFormSubmission(event, successMessage) {
    event.preventDefault();
    const submitButton = event.submitter;
    const originalText = submitButton ? submitButton.textContent : '';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
    }

    setTimeout(() => {
      event.target.reset();
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
      showToast(successMessage);
    }, 800);
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 2800);
  }

  if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', (event) =>
      handleFormSubmission(event, 'Slot reserved! Share the UPI link to confirm payment.')
    );
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) =>
      handleFormSubmission(event, 'Lead captured! Follow up on WhatsApp within 10 minutes.')
    );
  }

  function generateHoroscope(sign, focus, tone) {
    const baseMessage = horoscopeData[sign]?.[focus];
    if (!baseMessage) {
      return 'Select a zodiac sign and focus area to receive an instant insight crafted for your client.';
    }

    const toneSuffix = toneAdjustments[tone] ?? '';
    const title = sign.charAt(0).toUpperCase() + sign.slice(1);
    return `${title} ${focus} insight: ${baseMessage}${toneSuffix}`;
  }

  if (horoscopeForm && horoscopePreview && copyHoroscopeButton) {
    horoscopeForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const sign = document.getElementById('zodiac').value;
      const focus = document.getElementById('focus').value;
      const tone = document.getElementById('tone').value;
      const message = generateHoroscope(sign, focus, tone);
      horoscopePreview.textContent = message;
      copyHoroscopeButton.disabled = false;
      copyHoroscopeButton.dataset.message = message;
      showToast('Insight ready! Copy and share instantly.');
    });

    copyHoroscopeButton.addEventListener('click', async () => {
      const message = copyHoroscopeButton.dataset.message;
      if (!message) return;
      try {
        await navigator.clipboard.writeText(message);
        showToast('Horoscope copied to clipboard.');
      } catch (error) {
        console.error('Clipboard copy failed:', error);
        showToast('Copy failed. Select and copy manually.');
      }
    });
  }
})();
