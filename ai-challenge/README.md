# 🚀 AI Engineering Challenge 2026
### A project showcase site for student teams — pure HTML/CSS/JS, no backend needed.

---

## 📁 Folder Structure

```
ai-challenge/
├── index.html        ← Main gallery (all projects)
├── submit.html       ← Project submission form
├── README.md
├── css/
│   └── style.css     ← All styles
└── js/
    ├── data.js       ← localStorage helpers
    ├── ui.js         ← Toast & modal
    ├── projects.js   ← Gallery rendering
    └── submit.js     ← Form handling
```

---

## ✨ Features

| Feature | Details |
|---|---|
| 🏆 Project Gallery | Cards for every submitted project with colour-coded group stripes |
| 🔍 Filter | Filter by All / Games / Videos / Other |
| 📊 Live Stats | Counts of projects, games, videos, groups submitted |
| 🪟 Detail Modal | Click any card to see full description, AI tools, team, links |
| 📤 Submit Form | Group name, title, type, description, AI tools, team, 2 links |
| ✅ Validation | Required-field checking with visual error highlights |
| 💾 Storage | localStorage — no server, no login, instant saves |
| 📱 Responsive | Works on mobile, tablet, desktop |

---

## 🚀 Deploy to GitHub Pages (5 minutes)

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository**.
3. Name it anything, e.g. `ai-challenge-2026`.
4. Set it to **Public**.
5. Click **Create repository**.

### Step 2 — Upload files
**Option A — Drag & drop (easiest)**
1. Open your new repo on GitHub.
2. Click **uploading an existing file**.
3. Drag the entire `ai-challenge` folder contents (all files and folders) into the window.
4. Click **Commit changes**.

**Option B — Git CLI**
```bash
cd ai-challenge
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-challenge-2026.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. In your repo, go to **Settings → Pages**.
2. Under **Source**, select **Deploy from a branch**.
3. Choose **main** branch, **/ (root)** folder.
4. Click **Save**.

### Step 4 — Share the link
After ~60 seconds your site will be live at:
```
https://YOUR_USERNAME.github.io/ai-challenge-2026/
```

Share that URL with all 8 groups! 🎉

---

## ⚠️ Important note about localStorage

Projects are saved in the **browser's localStorage**.  
This means:
- Data is stored on the **device that submitted the form**.
- Groups submitting on **different devices won't see each other's projects** unless they're on the same device/browser.

### Workaround for the event day:
Use **one shared device / browser** for all submissions, then show the main gallery on a projected screen — everyone will see all projects.

Or have each group submit from their own device, then you open each device on the gallery to show their card on the big screen.

---

## 🎨 Customisation

### Change the group count (default: 8)
Edit the `<option>` list in `submit.html`:
```html
<select id="f-group">
  <option value="Group 1">Group 1</option>
  <!-- add or remove groups here -->
</select>
```

Also update the stats label in `index.html`:
```html
<strong id="stat-groups">0</strong> / 8 Groups Submitted
```

### Change event name / year
- Update the `<title>` tags in both HTML files.
- Update the hero text in `index.html`.

---

## 🛠 Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, grid, flexbox, animations
- **Vanilla JavaScript** — zero dependencies, zero frameworks
- **Google Fonts** — Syne + Space Mono
- **localStorage** — client-side persistence

---

Built for the AI Engineering Challenge 2026 🔧
