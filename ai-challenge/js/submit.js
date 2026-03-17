/* ============================================================
   js/submit.js  —  Handles the submission form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('submit-form');
  if (!form) return;

  form.addEventListener('submit', handleSubmit);
});

function handleSubmit(e) {
  e.preventDefault();

  const group       = val('f-group');
  const title       = val('f-title').trim();
  const type        = document.querySelector('input[name="type"]:checked')?.value || '';
  const description = val('f-desc').trim();
  const tools       = val('f-tools').trim();
  const members     = val('f-members').trim();
  const link1       = val('f-link1').trim();
  const link2       = val('f-link2').trim();

  // ── Validation ──
  const errors = [];
  if (!group)       errors.push('group');
  if (!title)       errors.push('title');
  if (!type)        errors.push('type');
  if (!description) errors.push('desc');

  // Highlight missing fields
  clearErrors();
  if (errors.length > 0) {
    errors.forEach(id => {
      const el = document.getElementById('f-' + id) || document.querySelector(`[name="type"]`);
      if (el) el.closest?.('.field')?.classList.add('field-error');
    });
    showToast('⚠ Please fill in all required fields.', 'error');
    return;
  }

  // ── Save ──
  addProject({ group, title, type, description, tools, members, link1, link2 });

  // ── Reset form ──
  document.getElementById('submit-form').reset();
  clearErrors();

  showToast('✅ Project submitted! Redirecting…', 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1400);
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
}
