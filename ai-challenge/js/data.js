/* ============================================================
   js/data.js  —  Storage helpers
   ============================================================ */

const STORAGE_KEY = 'ai_challenge_v3';

/**
 * Return all stored projects (array).
 */
function getProjects() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Persist the projects array.
 */
function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

/**
 * Add a single project and return the updated array.
 */
function addProject(project) {
  const projects = getProjects();
  project.id   = Date.now();
  project.date = new Date().toISOString();
  projects.push(project);
  saveProjects(projects);
  return projects;
}

/**
 * Delete a project by id.
 */
function deleteProject(id) {
  const updated = getProjects().filter(p => p.id !== id);
  saveProjects(updated);
  return updated;
}

/**
 * Escape HTML to prevent XSS.
 */
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Format an ISO date string as "17 Mar 2026".
 */
function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

/**
 * Map group string ("Group 3") → 0-based index for colour selection.
 */
function groupColor(groupStr) {
  const n = parseInt((groupStr || '').replace(/\D/g, ''), 10);
  return isNaN(n) ? 0 : (n - 1) % 8;
}
