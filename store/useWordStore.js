import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Equivalente della funzione uid() nell'HTML originale
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

const SAMPLE_WORDS = [
  {
    inf: 'to go',
    past: 'went',
    pp: 'gone',
    example: 'She went to the store.',
    trans: 'andare',
  },
  {
    inf: 'to eat',
    past: 'ate',
    pp: 'eaten',
    example: 'He ate an apple.',
    trans: 'mangiare',
  },
  {
    inf: 'to make',
    past: 'made',
    pp: 'made',
    example: 'They made a cake.',
    trans: 'fare',
  },
  {
    inf: 'to see',
    past: 'saw',
    pp: 'seen',
    example: 'I saw a bird.',
    trans: 'vedere',
  },
  {
    inf: 'to play',
    past: 'played',
    pp: 'played',
    example: 'We played football.',
    trans: 'giocare',
  },
];

export const useWordStore = create(
  persist(
    (set, get) => ({
      // ── STATE ──────────────────────────────────────────
      words: [],
      currentScreen: 'home', // 'home' | 'add' | 'detail' | 'favs' | 'settings'
      currentId: null, // id della parola aperta nel detail screen
      editingId: null, // id della parola in modifica (null = nuova parola)
      searchQuery: '',

      // ── NAVIGAZIONE ────────────────────────────────────
      goTo: screen => set({ currentScreen: screen }),
      goHome: () => set({ currentScreen: 'home' }),

      openDetail: id => set({ currentScreen: 'detail', currentId: id }),

      openAdd: () =>
        set({
          currentScreen: 'add',
          editingId: null,
        }),

      openEdit: id =>
        set({
          currentScreen: 'add',
          editingId: id,
        }),

      // ── RICERCA ────────────────────────────────────────
      setSearchQuery: q => set({ searchQuery: q }),

      // ── WORDS: LETTURA ─────────────────────────────────

      // Lista filtrata per la home (equivalente di renderList())
      getFilteredWords: () => {
        const { words, searchQuery } = get();
        const q = searchQuery.toLowerCase();
        if (!q) return words;
        return words.filter(
          w =>
            w.inf.toLowerCase().includes(q) ||
            w.past.toLowerCase().includes(q) ||
            w.pp.toLowerCase().includes(q),
        );
      },

      // Stats (equivalente dei contatori in renderList() e renderSettings())
      getStats: () => {
        const { words } = get();
        return {
          total: words.length,
          learned: words.filter(w => w.learned).length,
          favs: words.filter(w => w.fav).length,
        };
      },

      // Parola corrente nel detail screen
      getCurrentWord: () => {
        const { words, currentId } = get();
        return words.find(w => w.id === currentId) ?? null;
      },

      // Parola in modifica nel form
      getEditingWord: () => {
        const { words, editingId } = get();
        if (!editingId) return null;
        return words.find(w => w.id === editingId) ?? null;
      },

      // Favorites (equivalente di renderFavs())
      getFavWords: () => {
        return get().words.filter(w => w.fav);
      },

      // ── WORDS: SCRITTURA ───────────────────────────────

      // Equivalente di saveWord()
      saveWord: ({ inf, past, pp, example, trans }) => {
        const { words, editingId } = get();
        const existing = editingId ? words.find(w => w.id === editingId) : null;

        const word = {
          id: editingId ?? uid(),
          inf,
          past,
          pp,
          example: example ?? '',
          trans: trans ?? '',
          fav: existing?.fav ?? false,
          learned: existing?.learned ?? false,
          added: existing?.added ?? Date.now(),
        };

        if (editingId) {
          set({
            words: words.map(w => (w.id === editingId ? word : w)),
            currentScreen: 'detail',
            currentId: editingId,
            editingId: null,
          });
        } else {
          set({
            words: [word, ...words],
            currentScreen: 'home',
            editingId: null,
          });
        }
      },

      // Equivalente di toggleFav() e toggleFavDetail()
      toggleFav: id =>
        set(state => ({
          words: state.words.map(w => (w.id === id ? { ...w, fav: !w.fav } : w)),
        })),

      // Equivalente di toggleLearned()
      toggleLearned: id =>
        set(state => ({
          words: state.words.map(w => (w.id === id ? { ...w, learned: !w.learned } : w)),
        })),

      // Equivalente di confirmDelete()
      deleteWord: id =>
        set(state => ({
          words: state.words.filter(w => w.id !== id),
          currentScreen: 'home',
          currentId: null,
        })),

      // Equivalente di clearLearned()
      clearLearned: () =>
        set(state => ({
          words: state.words.map(w => ({ ...w, learned: false })),
        })),

      // Equivalente di addSamples()
      addSamples: () => {
        const { words } = get();
        const toAdd = SAMPLE_WORDS.filter(s => !words.find(w => w.inf === s.inf)).map(s => ({
          ...s,
          id: uid(),
          fav: false,
          learned: false,
          added: Date.now(),
        }));
        set({ words: [...toAdd, ...words] });
      },
    }),

    {
      // persist salva e ricarica automaticamente da localStorage
      // equivalente delle funzioni save() e del JSON.parse all'avvio
      name: 'lexicon-words',
    },
  ),
);
