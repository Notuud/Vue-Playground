
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
  App.vue                # Root component, dynamic layout
  main.ts                # App entry, plugin registration
  style.css              # Tailwind & custom styles
  assets/                # SVGs and images
  components/            # UI components
	 presentation/        # Presentation-specific components
  composables/           # Custom hooks (useTheme, useNavigation, etc.)
  layouts/               # App and Login layouts
  router/                # Vue Router setup
  stores/                # Pinia stores
  views/                 # Route views
public/                  # Static assets
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