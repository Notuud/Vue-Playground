
# Stonker Vue Playground

## Overview
Stonker is a Vue 3 playground project using Vite, TypeScript, Pinia, Vue Router, PrimeVue, Tailwind CSS, and Font Awesome. It demonstrates modular architecture, dynamic layouts, and modern UI practices.

## Tech Stack
- **Vue 3** with Composition API and SFC `<script setup>`
- **Vite** for fast development
- **TypeScript** for type safety
- **Pinia** for state management
- **Vue Router** for navigation
- **PrimeVue** for UI components
- **Tailwind CSS** for utility-first styling
- **Font Awesome** for icons

## Project Structure
```
src/
	App.vue                # Root component; selects layout dynamically via route meta
	main.ts                # App entry: plugin and global registration
	style.css              # Tailwind and global styles
	assets/                # Images and SVGs (logo, flags, illustrations)
	components/            # Reusable UI components and atoms
		auth/                # Authentication-specific components (forms, helpers)
		presentation/        # Landing / marketing UI (cards, sections)
		ui/                  # Generic UI atoms/molecules (ContainerCenter, buttons)
		layout/              # Header, Footer, SideNav and other shell pieces
		shared/              # Small shared utilities (LanguageSelect, ThemeSwitch)
	composables/           # Composition API helpers (useTheme, useNavigation, toasts)
	layouts/               # Route layouts (AppLayout.vue, DefaultLayout.vue)
	plugins/               # Plugin setup (i18n, pinia, primevue, fontawesome)
	router/                # Vue Router configuration and lazy-loaded views
	stores/                # Pinia stores (user.ts, etc.)
	views/                 # Page-level views (HomeView.vue, AboutView.vue, auth/*)
	locales/               # i18n JSON files (en.json, cs.json)
public/                  # Static assets copied to the dev/prod root
```

## Getting Started

1. **Install dependencies**
	```sh
	npm install
	```
2. **Run the development server**
	```sh
	npm run dev
	```
3. **Format code**
	```sh
	npm run format
	```

## Features
- Dynamic layout selection based on route meta
- Toast notifications (PrimeVue)
- Dark mode support (Tailwind + PrimeVue)
- Modular components and composables
- Font Awesome icon integration