# 📅 FamilyTime — Mini App (Figma Make Powered)

A lightweight, beautifully structured event-management mini-application built with **React + TypeScript + Vite**, fully powered by **Figma Make** auto-generated components.
Supports:

* ✅ Add Events
* ✅ View Events
* ✅ Update Events
* ✅ Delete Events
* 🔍 Search
* 🎚️ Filter
* 🎨 Rich UI components (Radix UI, Tailwind, ShadCN-style primitives)

This repository contains the source code bundled from the original Figma Make Design.

---

## 🚀 Live Demo (Optional)

https://family-time.figma.site/

---

## 📁 Directory Structure

```
albindavidc-familytime/
├── README.md
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── Attributions.md
    ├── main.tsx
    ├── components/
    │   ├── AddEventModal.tsx
    │   ├── EventDetailsModal.tsx
    │   ├── EventList.tsx
    │   ├── SearchHeader.tsx
    │   ├── SidebarFilters.tsx
    │   ├── figma/
    │   │   └── ImageWithFallback.tsx
    │   └── ui/  (ShadCN-styled component library)
    │       ├── accordion.tsx
    │       ├── alert-dialog.tsx
    │       ├── alert.tsx
    │       ├── aspect-ratio.tsx
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── breadcrumb.tsx
    │       ├── button.tsx
    │       ├── calendar.tsx
    │       ├── card.tsx
    │       ├── carousel.tsx
    │       ├── chart.tsx
    │       ├── checkbox.tsx
    │       ├── collapsible.tsx
    │       ├── command.tsx
    │       ├── context-menu.tsx
    │       ├── dialog.tsx
    │       ├── drawer.tsx
    │       ├── dropdown-menu.tsx
    │       ├── form.tsx
    │       ├── GlassCard.tsx
    │       ├── hover-card.tsx
    │       ├── input-otp.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── menubar.tsx
    │       ├── navigation-menu.tsx
    │       ├── pagination.tsx
    │       ├── popover.tsx
    │       ├── progress.tsx
    │       ├── radio-group.tsx
    │       ├── resizable.tsx
    │       ├── scroll-area.tsx
    │       ├── select.tsx
    │       ├── separator.tsx
    │       ├── sheet.tsx
    │       ├── sidebar.tsx
    │       ├── skeleton.tsx
    │       ├── slider.tsx
    │       ├── sonner.tsx
    │       ├── switch.tsx
    │       ├── table.tsx
    │       ├── tabs.tsx
    │       ├── textarea.tsx
    │       ├── toggle-group.tsx
    │       ├── toggle.tsx
    │       ├── tooltip.tsx
    │       ├── use-mobile.ts
    │       └── utils.ts
    ├── guidelines/Guidelines.md
    ├── lib/utils.ts
    └── styles/globals.css
```

---

## ⚙️ Tech Stack

| Category               | Technology            |
| ---------------------- | --------------------- |
| **Frontend Framework** | React + TypeScript    |
| **Bundler**            | Vite                  |
| **UI Components**      | Radix UI + Figma Make |
| **Styles**             | TailwindCSS           |
| **Icons**              | Lucide React          |
| **Forms**              | React Hook Form       |
| **Charts**             | Recharts              |
| **Animations**         | Motion                |
| **Notifications**      | Sonner                |

---

## 🧠 Features

### 🗂 Event Management

* Add new family events
* Edit existing events
* Delete events
* View details in beautifully styled modals

### 🔎 Search & Filter

* Global search via SearchHeader
* Category/date filters via SidebarFilters

### 🧩 UI System (Figma Make → Production Code)

* 40+ reusable UI components
* Auto-generated but fully editable
* Built on Radix primitives
* ShadCN-style utility approach
* Mobile responsive support

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

---

## 🧪 Development Notes

* The UI library inside `src/components/ui/` is auto-generated but fully customizable.
* The project uses Tailwind's design tokens defined in **globals.css**.
* Sidebar, Modals, and DatePicker are Radix-driven for accessibility & UX consistency.
* Mobile detection is handled by the custom hook `useIsMobile()`.

---

## 📘 Guidelines

You can define your own rules for AI-assisted code generation in:

```
src/guidelines/Guidelines.md
```

This allows highly consistent automated updates using Figma Make / AI coding tools.

---

## 👤 Author

**Albin David C**
