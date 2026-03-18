/* ============================================================
   js/ui.js  —  Toast & Modal helpers
   ============================================================ */

/* ── TOAST ───────────────────────────────────────────────── */

let toastTimer = null;

/**
 * Show a toast message.
 * @param {string} message
 * @param {'success'|'error'} type
 */
function showToast(message, type = 'success') {
  const el = document.getElementById('toast');
  if (!el) return;

  el.textContent = message;
  el.className = `toast ${type} show`;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 3200);
}

/* ── MODAL ───────────────────────────────────────────────── */

/**
 * Open the project detail modal with data from a project object.
 * @param {object} project
 */
function openModal(project) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  const colorIdx = groupColor(project.group);

  // stripe colour
  document.getElementById('modal-stripe').className = `modal-stripe gc-${colorIdx}`;

  // title
  document.getElementById('modal-title').textContent = project.title || 'Untitled';

  // badges
  const typeLabel = project.type === 'game'  ? '🎮 Game'
                  : project.type === 'video' ? '🎬 Video'
                  : '💡 Other';

  document.getElementById('modal-badges').innerHTML = `
    <span class="group-tag">${esc(project.group)}</span>
    <span class="type-badge type-${esc(project.type)}">${typeLabel}</span>
    <span class="mono muted" style="font-size:11px;margin-left:4px;">${formatDate(project.date)}</span>
  `;

  // description
  document.getElementById('modal-desc').textContent = project.description || '—';

  // ai tools
  const toolsSection = document.getElementById('modal-tools-section');
  if (project.tools) {
    toolsSection.style.display = 'block';
    document.getElementById('modal-tools-value').textContent = project.tools;
  } else {
    toolsSection.style.display = 'none';
  }

  // team members
  const membersSection = document.getElementById('modal-members-section');
  if (project.members) {
    membersSection.style.display = 'block';
    document.getElementById('modal-members-value').textContent = project.members;
  } else {
    membersSection.style.display = 'none';
  }

  // links
  const linksDiv = document.getElementById('modal-links');
  linksDiv.innerHTML = '';

  if (project.link1) {
    linksDiv.innerHTML += `
      <a class="modal-link" href="${esc(project.link1)}" target="_blank" rel="noopener noreferrer">
        🔗 Project / Code
      </a>`;
  }
  if (project.link2) {
    linksDiv.innerHTML += `
      <a class="modal-link" href="${esc(project.link2)}" target="_blank" rel="noopener noreferrer">
        ▶ Demo / Video
      </a>`;
  }
  if (!project.link1 && !project.link2) {
    linksDiv.innerHTML = `<span class="muted" style="font-size:.875rem;">No links provided.</span>`;
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * Close the modal.
 */
function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on backdrop click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
