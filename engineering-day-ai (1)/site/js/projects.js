/* ============================================================
   js/projects.js  —  Renders the project gallery
   ============================================================ */

let activeFilter = 'all';

/**
 * Re-render everything on the projects page.
 */
function renderProjects() {
  const projects = getProjects();
  updateStats(projects);
  renderCards(projects);
}

/* ── STATS ───────────────────────────────────────────────── */
function updateStats(projects) {
  const games   = projects.filter(p => p.type === 'game').length;
  const videos  = projects.filter(p => p.type === 'video').length;
  const groups  = new Set(projects.map(p => p.group)).size;

  setText('stat-total',  projects.length);
  setText('stat-games',  games);
  setText('stat-videos', videos);
  setText('stat-groups', groups);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ── FILTER ──────────────────────────────────────────────── */
function setFilter(type, btn) {
  activeFilter = type;
  document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCards(getProjects());
}

/* ── CARDS ───────────────────────────────────────────────── */
function renderCards(projects) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.type === activeFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🚀</div>
        <h3>No projects here yet!</h3>
        <p>Groups can submit their projects using the <strong>Submit</strong> tab above. They'll appear here instantly.</p>
        <a href="submit.html" class="btn btn-primary" style="display:inline-flex;margin-top:4px;">
          Submit a Project
        </a>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((project, i) => buildCard(project, i)).join('');

  // Attach click listeners (we use data-id to look up the project)
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id, 10);
      const p  = getProjects().find(x => x.id === id);
      if (p) openModal(p);
    });
  });
}

function buildCard(project, index) {
  const colorIdx  = groupColor(project.group);
  const typeLabel = project.type === 'game'  ? '🎮 Game'
                  : project.type === 'video' ? '🎬 Video'
                  : '💡 Other';
  const link1html = project.link1
    ? `<a class="card-link" href="${esc(project.link1)}" target="_blank" rel="noopener noreferrer"
         onclick="event.stopPropagation()">🔗 Project</a>` : '';
  const link2html = project.link2
    ? `<a class="card-link" href="${esc(project.link2)}" target="_blank" rel="noopener noreferrer"
         onclick="event.stopPropagation()">▶ Demo</a>` : '';

  return `
    <div class="project-card anim" data-id="${project.id}" style="animation-delay:${index * 0.055}s">
      <div class="card-stripe gc-${colorIdx}"></div>
      <div class="card-body">
        <div class="card-meta">
          <span class="group-tag">${esc(project.group)}</span>
          <span class="type-badge type-${esc(project.type)}">${typeLabel}</span>
        </div>
        <div class="card-title">${esc(project.title)}</div>
        <div class="card-desc">${esc(project.description)}</div>
        <div class="card-footer">
          ${link1html}
          ${link2html}
          <span class="card-date">${formatDate(project.date)}</span>
        </div>
      </div>
    </div>`;
}
