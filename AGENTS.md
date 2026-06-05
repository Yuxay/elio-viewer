# Elio Viewer

A PWA document editor supporting 25+ file types with syntax highlighting. Vue 3 + TypeScript + CodeMirror 6 + Shiki.

## Project

- **Stack:** Vue 3 (Composition API, `<script setup>`), TypeScript strict, Vite 6, vue-router 4, PWA (vite-plugin-pwa)
- **Entry:** `src/main.ts` → `src/App.vue` → `<router-view>`
- **Storage:** IndexedDB via localforage (`elio-docs` / `documents` store)
- **Key deps:** `codemirror` (editor), `shiki` (preview highlight), `prettier` (formatting), `markdown-it` (md render)

## Commands

| Command | What |
|---------|------|
| `npm run dev` | Start Vite dev server (port 5173, 0.0.0.0) |
| `npm run build` | `vue-tsc --noEmit` then `vite build` → `dist/` |
| `npm run preview` | `vite preview` — serve production build |

No linter or test runner configured.

## Architecture

```
src/
├── main.ts               # createApp, router, global CSS
├── App.vue                # App shell: header (back/title, lang toggle, theme btn) + <router-view>
├── router/index.ts        # 2 routes: / (home), /editor/:id (editor)
├── views/
│   ├── HomeView.vue       # Document list + FABs (new / import) + FileTypeDialog
│   └── EditorView.vue     # Editor shell: toolbar + editor/preview, switches by fileType
├── components/
│   ├── DocList.vue        # Document list with type badges
│   ├── FileTypeDialog.vue # Bottom-sheet file type picker (grouped by category)
│   ├── AppToolbar.vue     # Editor toolbar (edit/preview toggle, format, export, delete)
│   ├── MdEditor.vue       # Plain textarea for Markdown editing
│   ├── CodeEditor.vue     # CodeMirror 6 wrapper for code files
│   └── MdPreview.vue      # Renders markdown OR code-view for non-md files (Shiki)
├── db/index.ts            # CRUD over localforage: listDocuments, getDocument, createDocument, saveDocument, deleteDocument
├── composables/
│   ├── useAutoSave.ts     # Debounced watch on doc content → saveDocument
│   └── useTheme.ts        # dark/light/system toggle, persists to localStorage
├── utils/
│   ├── markdown.ts        # MarkdownIt instance + Shiki highlighter (lazy singleton)
│   ├── format.ts          # Prettier standalone lazy-load + canFormat/formatCode
│   ├── file.ts            # importMdFile (file picker), exportFile (Blob download)
│   └── fileTypes.ts       # FILE_TYPES registry, ext→CodeMirror lang, ext→Shiki lang, helpers
├── types/index.ts         # Document, FileTypeInfo, ThemeMode
├── i18n/index.ts          # zh/en dictionaries + useI18n() composable
└── styles/variables.css   # CSS custom properties for light/dark themes + reset
```

### Key flows
- **New file:** FAB `+` → `FileTypeDialog` (pick ext) → `createDocument(title, ext)` → navigate `/editor/:id`
- **Import:** FAB 📥 → file picker → auto-detect ext → `createDocument` + `saveDocument` → navigate
- **Editor:** `EditorView` checks `isCodeFile(ext)` → renders `CodeEditor` (code) or `MdEditor` (md); preview via `MdPreview` which does Shiki code-view for non-md
- **Save:** `useAutoSave` debounce-watches `doc.content + doc.title` → `saveDocument` to IndexedDB
- **Export:** `exportFile` creates Blob with correct MIME + `.ext` download
- **Format:** Toolbar 🔧 → `formatCode` (Prettier) → rewrites `doc.content` → triggers save

## Conventions

- **Path alias:** `@/` → `src/` (configured in both tsconfig `paths` and vite `resolve.alias`)
- **Components:** Vue SFC with `<script setup lang="ts">`, scoped styles (except MdPreview which uses global styles for rendered markdown)
- **Props/Emits:** TypeScript generics — `defineProps<{...}>()`, `defineEmits<{...}>()`
- **Composables:** Exported factory functions (`useXxx()`) placed in `src/composables/`
- **Type imports:** Use `import type { X }` for type-only imports
- **Lazy modules:** Shiki, Prettier, CodeMirror language packs are loaded via dynamic `import()` with module-level singletons
- **CSS themes:** Dark mode via `:root.dark` class toggled on `<html>`, all colors use `var(--xxx)` custom properties
- **i18n:** `useI18n()` returns reactive `{ locale, $t, setLocale, toggleLocale }`; `$t` is a `ComputedRef<Dict>` accessed via `$t.value.xxx`
- **Document model:** `fileType` defaults to `'md'` for backward compat; code detect in EditorView falls back to `'md'` if missing
- **No `lang` attribute on `<script>`:** Use `lang="ts"` only (Vue convention — already in place)

## Notes

