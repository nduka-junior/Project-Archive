
---

# 📚 Project Archive

**Project Archive** is a full-stack web application designed to help students **submit, store, and showcase** their final year projects in a centralized digital repository. It allows lecturers to **review and assess** submissions, while linking each project to its **corresponding GitHub repository** for code transparency and collaboration.

---

## 🚀 Features

* 🧾 **Project Uploads:** Students can submit their final year projects along with descriptions, documentation, and GitHub links.
* 🧠 **Search & Filter:** Browse and filter through projects by title, department, or technology used.
* 🧑‍🏫 **Lecturer Dashboard:** Admin view for assessing and approving submitted projects.
* 🗃️ **GitHub Integration:** Each project includes its associated GitHub repo for code review.
* 🧩 **Responsive UI:** Fully responsive interface built with modern UI components.

---

## 🧰 Tech Stack

**Frontend:**

* Next.js 14 (App Router)
* React
* TypeScript
* Tailwind CSS
* ShadCN UI

**Backend:**

* Supabase (Database + Authentication)
* Drizzle ORM
* Node.js

**Additional Tools:**

* ESLint & Prettier for linting and formatting
* Vercel for deployment

---

## ⚙️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nduka-junior/project-archive.git
   cd project-archive
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment variables:**
   Create a `.env.local` file and include your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Visit 👉 [http://localhost:3000](http://localhost:3000)

---

## 🧩 Folder Structure

```
src/
 ┣ components/      # UI and reusable components
 ┣ app/             # Next.js app router pages and routes
 ┣ lib/             # Supabase, Drizzle, and config helpers
 ┣ hooks/           # Custom React hooks
 ┣ styles/          # Global styles
 ┗ utils/           # Helper functions
```

---

## 🧠 Future Improvements

* ✅ Project categorization using AI-based tags
* ✅ User profiles with project statistics
* ✅ Admin-level analytics dashboard
* ✅ Improved search with semantic understanding

---
