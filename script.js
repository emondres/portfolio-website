const phrases = [
  'I resolve customer issues before they escalate.',
  'I keep CRM data clean and audit-ready.',
  'I reconcile the books so the numbers add up.'
];

const typedText = document.querySelector('[data-typing]');

if (typedText) {
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const current = phrases[phraseIndex];
    typedText.textContent = current.slice(0, charIndex);

    if (!isDeleting && charIndex < current.length) {
      charIndex += 1;
      setTimeout(type, 70);
    } else if (isDeleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(type, 40);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      setTimeout(type, 850);
    }
  };

  type();
}

const skillButtons = document.querySelectorAll('.skill-chip');
const detailTitle = document.querySelector('[data-skill-title]');
const detailText = document.querySelector('[data-skill-text]');
const detailList = document.querySelector('[data-skill-list]');

const skillContent = {
  zendesk: {
    title: 'Zendesk Expertise',
    text: 'I coordinate ticket lifecycles, resolve customer issues, and support retention with a client-first approach.',
    points: ['Omnichannel support handling', 'Complaint resolution', 'Ticket workflow organization']
  },
  convoso: {
    title: 'Convoso Workflow Support',
    text: 'I help maintain high-volume outreach operations with organized callbacks and SLA-conscious follow-through.',
    points: ['Inbound and outbound coordination', 'Dialer navigation', 'Lead qualification support']
  },
  slack: {
    title: 'Slack Collaboration',
    text: 'I keep communication flowing across teams with clear channel organization and timely updates.',
    points: ['Workspace coordination', 'Cross-functional updates', 'Remote team alignment']
  },
  teams: {
    title: 'Microsoft Teams Operations',
    text: 'I support collaborative scheduling, file handling, and meeting alignment in fast-paced remote environments.',
    points: ['Calendar coordination', 'Document sharing', 'Meeting and inbox support']
  },
  sheets: {
    title: 'Google Sheets & Excel',
    text: 'I maintain accurate records, audit entries, and build dependable reporting habits for compliance-focused tasks.',
    points: ['Data verification', 'Audit logs', 'Report tracking']
  },
  quickbooks: {
    title: 'QuickBooks Online',
    text: 'I process AP/AR activity, reconcile accounts, and support reporting with accuracy and attention to detail.',
    points: ['Invoice and transaction processing', 'Bank reconciliation', 'Financial reporting support']
  }
};

function renderSkill(id) {
  const content = skillContent[id];
  if (!content || !detailTitle || !detailText || !detailList) return;

  detailTitle.textContent = content.title;
  detailText.textContent = content.text;
  detailList.innerHTML = content.points.map((point) => `<li>${point}</li>`).join('');
}

skillButtons.forEach((button) => {
  button.addEventListener('click', () => {
    skillButtons.forEach((chip) => chip.classList.remove('is-active'));
    button.classList.add('is-active');
    renderSkill(button.dataset.skill);
  });
});

if (skillButtons.length) {
  renderSkill('zendesk');
  skillButtons[0].classList.add('is-active');
}

const metricCards = document.querySelectorAll('.metric-card');

const animateCounter = (card) => {
  const element = card.querySelector('.metric-value');
  if (!element) return;

  const target = Number(element.dataset.target || 0);
  const duration = 1500;
  const startTime = performance.now();
  const prefix = element.dataset.prefix || '';
  const suffix = element.dataset.suffix || '';

  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);
    element.textContent = `${prefix}${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = `${prefix}${target}${suffix}`;
    }
  };

  requestAnimationFrame(step);
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  metricCards.forEach((card) => observer.observe(card));
} else {
  metricCards.forEach((card) => {
    card.classList.add('is-visible');
    animateCounter(card);
  });
}
