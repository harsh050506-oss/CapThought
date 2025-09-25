// Simple date formatting utilities (replacing date-fns)
const dateUtils = {
  format(date, formatStr) {
    const d = new Date(date);
    if (formatStr === 'yyyy-MM-dd') {
      return d.toISOString().split('T')[0];
    }
    if (formatStr === 'MMM d') {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    if (formatStr === 'EEEE, MMMM d, yyyy') {
      return d.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    return d.toLocaleDateString();
  },
  
  parseISO(dateStr) {
    return new Date(dateStr);
  },
  
  isSameDay(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.toDateString() === d2.toDateString();
  },
  
  startOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  },
  
  startOfMonth(date) {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  },
  
  isAfter(date1, date2) {
    return new Date(date1) > new Date(date2);
  }
};

// Language Service
class LanguageService {
  static currentLanguage = 'en';
  static STORAGE_KEY = 'capthought_language';
  static languages = ['en', 'hi', 'de']; // Language cycle order
  
  static translations = {
    en: {
      // Navigation
      appTitle: 'CapThought',
      appSubtitle: 'Capture Ideas',
      thoughts: 'Thoughts',
      capture: 'Capture',
      explore: 'Explore',
      insights: 'Insights',
      
      // Home Page
      beginJourney: 'Begin Your Thought Journey',
      welcomeMessage: 'Welcome to CapThought, your personal space for capturing ideas, reflections, and creative insights.',
      captureFirstThought: 'Capture Your First Thought',
      yourCapturedThoughts: 'Your Captured Thoughts',
      ideasPreserved: 'ideas preserved',
      newThought: 'New Thought',
      today: 'Today',
      words: 'words',
      
      // Write Page
      back: 'Back',
      delete: 'Delete',
      save: 'Capture',
      titlePlaceholder: 'Give your thought a title...',
      howAreYouFeeling: 'How are you feeling?',
      organizeWithTags: 'Organize with tags',
      addTags: 'Add tags...',
      contentPlaceholder: "What's on your mind?",
      deleteConfirm: 'Are you sure you want to delete this thought?',
      
      // Moods
      happy: 'Happy',
      neutral: 'Neutral',
      sad: 'Sad',
      excited: 'Excited',
      anxious: 'Anxious',
      
      // Entry Detail
      untitledThought: 'Untitled Thought',
      edit: 'Edit',
      thoughtNotFound: 'Thought not found',
      backToThoughts: 'Back to thoughts',
      
      // Search Page
      exploreMind: 'Explore Your Mind',
      discoverThoughts: 'Discover thoughts and ideas from your collection',
      searchPlaceholder: 'Search through your thoughts...',
      browseCategories: 'Browse by categories',
      
      // Stats Page
      mindAnalytics: 'Mind Analytics',
      trackPatterns: 'Track your thought patterns and creative progress',
      totalThoughts: 'Total Thoughts',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      avgWords: 'Avg. Words',
      mostFrequentTopics: 'Most Frequent Topics'
    },
    
    hi: {
      // Navigation
      appTitle: 'CapThought',
      appSubtitle: 'विचार कैप्चर करें',
      thoughts: 'विचार',
      capture: 'कैप्चर',
      explore: 'खोजें',
      insights: 'अंतर्दृष्टि',
      
      // Home Page
      beginJourney: 'अपनी विचार यात्रा शुरू करें',
      welcomeMessage: 'CapThought में आपका स्वागत है, विचारों, चिंतन और रचनात्मक अंतर्दृष्टि को कैप्चर करने के लिए आपका व्यक्तिगत स्थान।',
      captureFirstThought: 'अपना पहला विचार कैप्चर करें',
      yourCapturedThoughts: 'आपके कैप्चर किए गए विचार',
      ideasPreserved: 'विचार संरक्षित',
      newThought: 'नया विचार',
      today: 'आज',
      words: 'शब्द',
      
      // Write Page
      back: 'वापस',
      delete: 'हटाएं',
      save: 'कैप्चर',
      titlePlaceholder: 'अपने विचार को एक शीर्षक दें...',
      howAreYouFeeling: 'आप कैसा महसूस कर रहे हैं?',
      organizeWithTags: 'टैग के साथ व्यवस्थित करें',
      addTags: 'टैग जोड़ें...',
      contentPlaceholder: 'आपके दिमाग में क्या है?',
      deleteConfirm: 'क्या आप वाकई इस विचार को हटाना चाहते हैं?',
      
      // Moods
      happy: 'खुश',
      neutral: 'तटस्थ',
      sad: 'उदास',
      excited: 'उत्साहित',
      anxious: 'चिंतित',
      
      // Entry Detail
      untitledThought: 'शीर्षकहीन विचार',
      edit: 'संपादित करें',
      thoughtNotFound: 'विचार नहीं मिला',
      backToThoughts: 'विचारों पर वापस जाएं',
      
      // Search Page
      exploreMind: 'अपने दिमाग की खोज करें',
      discoverThoughts: 'अपने संग्रह से विचारों और विचारधाराओं की खोज करें',
      searchPlaceholder: 'अपने विचारों में खोजें...',
      browseCategories: 'श्रेणियों के अनुसार ब्राउज़ करें',
      
      // Stats Page
      mindAnalytics: 'मन विश्लेषण',
      trackPatterns: 'अपने विचार पैटर्न और रचनात्मक प्रगति को ट्रैक करें',
      totalThoughts: 'कुल विचार',
      thisWeek: 'इस सप्ताह',
      thisMonth: 'इस महीने',
      avgWords: 'औसत शब्द',
      mostFrequentTopics: 'सबसे आम विषय'
    },
    
    de: {
      // Navigation
      appTitle: 'CapThought',
      appSubtitle: 'Ideen Erfassen',
      thoughts: 'Gedanken',
      capture: 'Erfassen',
      explore: 'Erkunden',
      insights: 'Einblicke',
      
      // Home Page
      beginJourney: 'Beginnen Sie Ihre Gedankenreise',
      welcomeMessage: 'Willkommen bei CapThought, Ihrem persönlichen Raum zum Erfassen von Ideen, Reflexionen und kreativen Einsichten.',
      captureFirstThought: 'Erfassen Sie Ihren ersten Gedanken',
      yourCapturedThoughts: 'Ihre erfassten Gedanken',
      ideasPreserved: 'Ideen bewahrt',
      newThought: 'Neuer Gedanke',
      today: 'Heute',
      words: 'Wörter',
      
      // Write Page
      back: 'Zurück',
      delete: 'Löschen',
      save: 'Erfassen',
      titlePlaceholder: 'Geben Sie Ihrem Gedanken einen Titel...',
      howAreYouFeeling: 'Wie fühlen Sie sich?',
      organizeWithTags: 'Mit Tags organisieren',
      addTags: 'Tags hinzufügen...',
      contentPlaceholder: 'Was beschäftigt Sie?',
      deleteConfirm: 'Sind Sie sicher, dass Sie diesen Gedanken löschen möchten?',
      
      // Moods
      happy: 'Glücklich',
      neutral: 'Neutral',
      sad: 'Traurig',
      excited: 'Aufgeregt',
      anxious: 'Ängstlich',
      
      // Entry Detail
      untitledThought: 'Unbenannter Gedanke',
      edit: 'Bearbeiten',
      thoughtNotFound: 'Gedanke nicht gefunden',
      backToThoughts: 'Zurück zu den Gedanken',
      
      // Search Page
      exploreMind: 'Erkunden Sie Ihren Geist',
      discoverThoughts: 'Entdecken Sie Gedanken und Ideen aus Ihrer Sammlung',
      searchPlaceholder: 'Durchsuchen Sie Ihre Gedanken...',
      browseCategories: 'Nach Kategorien durchsuchen',
      
      // Stats Page
      mindAnalytics: 'Geist-Analytik',
      trackPatterns: 'Verfolgen Sie Ihre Gedankenmuster und kreativen Fortschritt',
      totalThoughts: 'Gesamt Gedanken',
      thisWeek: 'Diese Woche',
      thisMonth: 'Diesen Monat',
      avgWords: 'Durchschn. Wörter',
      mostFrequentTopics: 'Häufigste Themen'
    }
  };
  
  static init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved && this.translations[saved]) {
      this.currentLanguage = saved;
    }
  }
  
  static cycleLanguage() {
    const currentIndex = this.languages.indexOf(this.currentLanguage);
    const nextIndex = (currentIndex + 1) % this.languages.length;
    this.currentLanguage = this.languages[nextIndex];
    localStorage.setItem(this.STORAGE_KEY, this.currentLanguage);
    app.updateLanguage();
  }
  
  static t(key) {
    return this.translations[this.currentLanguage][key] || this.translations.en[key] || key;
  }
  
  static getCurrentLanguageFlag() {
    const flags = { en: '🇺🇸', hi: '🇮🇳', de: '🇩🇪' };
    return flags[this.currentLanguage] || '🌍';
  }
}

const STORAGE_KEY = 'journal_entries';

class JournalService {
  static getEntries() {
    try {
      const entries = localStorage.getItem(STORAGE_KEY);
      return entries ? JSON.parse(entries) : [];
    } catch {
      return [];
    }
  }

  static saveEntries(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  static createEntry(entry) {
    const newEntry = {
      ...entry,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const entries = this.getEntries();
    entries.unshift(newEntry);
    this.saveEntries(entries);
    return newEntry;
  }

  static updateEntry(id, updates) {
    const entries = this.getEntries();
    const index = entries.findIndex(entry => entry.id === id);
    if (index === -1) return null;
    entries[index] = { ...entries[index], ...updates, updatedAt: new Date().toISOString() };
    this.saveEntries(entries);
    return entries[index];
  }

  static deleteEntry(id) {
    const entries = this.getEntries();
    const filteredEntries = entries.filter(entry => entry.id !== id);
    if (filteredEntries.length === entries.length) return false;
    this.saveEntries(filteredEntries);
    return true;
  }
  
  static getEntry(id) {
    return this.getEntries().find(e => e.id === id);
  }

  static getStats() {
    const entries = this.getEntries();
    const now = new Date();
    const weekStart = dateUtils.startOfWeek(now);
    const monthStart = dateUtils.startOfMonth(now);
    const entriesThisWeek = entries.filter(e => dateUtils.isAfter(new Date(e.createdAt), weekStart)).length;
    const entriesThisMonth = entries.filter(e => dateUtils.isAfter(new Date(e.createdAt), monthStart)).length;
    const totalWords = entries.reduce((sum, e) => sum + e.content.split(' ').filter(w => w.length > 0).length, 0);
    return {
      totalEntries: entries.length,
      entriesThisWeek,
      entriesThisMonth,
      averageWordsPerEntry: entries.length > 0 ? Math.round(totalWords / entries.length) : 0,
    };
  }

  static searchEntries(query) {
    const entries = this.getEntries();
    const lowerQuery = query.toLowerCase();
    return entries.filter(e =>
      (e.title && e.title.toLowerCase().includes(lowerQuery)) ||
      e.content.toLowerCase().includes(lowerQuery) ||
      e.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  static getEntriesByTag(tag) {
    return this.getEntries().filter(entry => entry.tags.includes(tag));
  }

  static getAllTags() {
    const tagSet = new Set();
    this.getEntries().forEach(entry => entry.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }

  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

const moodEmojis = {
  happy: '😊', 
  neutral: '😐', 
  sad: '😢', 
  excited: '🤩', 
  anxious: '😰',
};

const app = {
  root: null,
  
  init() {
    this.root = document.getElementById('app-root');
    LanguageService.init();
    this.updateLanguage();
    window.addEventListener('hashchange', () => this.router());
    this.router();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  updateLanguage() {
    // Update navigation
    document.querySelector('.logo-title').textContent = LanguageService.t('appTitle');
    document.querySelector('.logo-subtitle').textContent = LanguageService.t('appSubtitle');
    
    const navLinks = document.querySelectorAll('.nav-link span');
    const navKeys = ['thoughts', 'capture', 'explore', 'insights'];
    navLinks.forEach((span, index) => {
      if (navKeys[index]) {
        span.textContent = LanguageService.t(navKeys[index]);
      }
    });

    // Update page title
    document.title = `${LanguageService.t('appTitle')} - ${LanguageService.t('appSubtitle')}`;
    
    // Update language button flag if it exists
    const languageFlag = document.querySelector('.language-flag');
    if (languageFlag) {
      languageFlag.textContent = LanguageService.getCurrentLanguageFlag();
    }
    
    // Re-render current page
    this.router();
  },

  createLanguageSelector() {
    return `
      <button class="language-selector-btn" id="language-selector-btn" title="Change Language">
        <span class="language-flag">${LanguageService.getCurrentLanguageFlag()}</span>
        <i data-lucide="globe"></i>
      </button>
    `;
  },

  setupLanguageSelector() {
    const languageBtn = document.getElementById('language-selector-btn');
    
    if (languageBtn) {
      languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        LanguageService.cycleLanguage();
      });
    }
  },

  router() {
    const path = location.hash.slice(1) || '/';
    const [route, param] = path.split('/').filter(p => p);

    this.root.innerHTML = '';
    
    // Update navigation active state
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPath = link.getAttribute('href').substring(1); // Remove #
        link.classList.toggle('active', linkPath === path);
    });

    switch (route) {
      case 'write': 
        this.renderWritePage(param); 
        break;
      case 'entry': 
        this.renderEntryDetailPage(param); 
        break;
      case 'search': 
        this.renderSearchPage(); 
        break;
      case 'stats': 
        this.renderStatsPage(); 
        break;
      default: 
        this.renderHomePage();
    }
    
    // Re-initialize Lucide icons after content change
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  renderHomePage() {
    const entries = JournalService.getEntries();
    if (entries.length === 0) {
      this.root.innerHTML = `
        <div class="page empty-state">
          <div class="empty-state-header">
            ${this.createLanguageSelector()}
          </div>
          <div class="empty-state-content">
            <i data-lucide="brain"></i>
            <h2>${LanguageService.t('beginJourney')}</h2>
            <p>${LanguageService.t('welcomeMessage')}</p>
            <a href="#/write" class="btn btn-primary"><i data-lucide="pen-tool"></i> ${LanguageService.t('captureFirstThought')}</a>
          </div>
        </div>
      `;
      this.setupLanguageSelector();
      return;
    }

    const grouped = entries.reduce((acc, entry) => {
        const date = dateUtils.format(dateUtils.parseISO(entry.createdAt), 'yyyy-MM-dd');
        if (!acc[date]) acc[date] = [];
        acc[date].push(entry);
        return acc;
    }, {});

    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

    this.root.innerHTML = `
      <div class="page">
        <div class="home-header">
          <div>
            <h1>${LanguageService.t('yourCapturedThoughts')}</h1>
            <p>${entries.length} ${LanguageService.t('ideasPreserved')}</p>
          </div>
          <div class="header-actions">
            ${this.createLanguageSelector()}
            <a href="#/write" class="btn btn-primary"><i data-lucide="pen-tool"></i> ${LanguageService.t('newThought')}</a>
          </div>
        </div>
        ${sortedDates.map(date => `
          <div class="entries-group">
            <div class="entries-group-header">
              <i data-lucide="calendar"></i>
              <span>${dateUtils.isSameDay(dateUtils.parseISO(date), new Date()) ? LanguageService.t('today') : dateUtils.format(dateUtils.parseISO(date), 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div class="entries-grid">
              ${grouped[date].map(entry => this.getEntryCardHTML(entry)).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    this.setupLanguageSelector();
  },
  
  getEntryCardHTML(entry) {
    const wordCount = entry.content.split(' ').filter(w => w.length > 0).length;
    const preview = entry.content.substring(0, 150) + (entry.content.length > 150 ? '...' : '');
    return `
      <a href="#/entry/${entry.id}" class="entry-card">
        <div class="entry-card-header">
          <h3>${entry.title || LanguageService.t('untitledThought')}</h3>
          <div class="entry-card-date"><i data-lucide="calendar"></i> ${dateUtils.format(new Date(entry.createdAt), 'MMM d')}</div>
        </div>
        <p class="entry-card-preview">${preview}</p>
        <div class="entry-card-footer">
          <div class="tag-list">
            ${entry.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
            ${entry.tags.length > 3 ? `<span>+${entry.tags.length - 3}</span>` : ''}
          </div>
          <span>${wordCount} ${LanguageService.t('words')}</span>
        </div>
      </a>
    `;
  },

  renderWritePage(id) {
    const isEditing = !!id;
    const entry = isEditing ? JournalService.getEntry(id) : {};
    let tags = entry.tags || [];

    this.root.innerHTML = `
      <div class="page write-form" id="write-form-container">
        <div class="form-header">
            <a href="#/" class="btn"><i data-lucide="arrow-left"></i> ${LanguageService.t('back')}</a>
            <div class="form-header-actions">
                ${isEditing ? `<button class="btn btn-danger" id="delete-btn"><i data-lucide="trash-2"></i> ${LanguageService.t('delete')}</button>` : ''}
                <button class="btn btn-primary" id="save-btn"><i data-lucide="save"></i> ${LanguageService.t('save')}</button>
            </div>
        </div>
        <input type="text" id="title-input" class="form-title-input" placeholder="${LanguageService.t('titlePlaceholder')}" value="${entry.title || ''}">
        <div>
            <label class="form-label">${LanguageService.t('howAreYouFeeling')}</label>
            <div class="mood-selector" id="mood-selector">
                ${Object.entries(moodEmojis).map(([key, emoji]) => `
                    <button type="button" class="mood-btn" data-mood="${key}">${emoji} ${LanguageService.t(key)}</button>
                `).join('')}
            </div>
        </div>
        <div>
            <label class="form-label">${LanguageService.t('organizeWithTags')}</label>
            <div class="tag-input-container" id="tag-input-container">
                <input type="text" class="tag-input" id="tag-input" placeholder="${LanguageService.t('addTags')}">
            </div>
        </div>
        <textarea id="content-input" class="content-textarea" placeholder="${LanguageService.t('contentPlaceholder')}">${entry.content || ''}</textarea>
      </div>
    `;

    const tagInputContainer = document.getElementById('tag-input-container');
    const tagInput = document.getElementById('tag-input');

    const renderTags = () => {
        tagInputContainer.querySelectorAll('.tag').forEach(t => t.remove());
        tags.forEach((tag, i) => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag';
            tagEl.innerHTML = `${tag} <button type="button" data-index="${i}"><i data-lucide="x" style="width:12px; height:12px;"></i></button>`;
            tagInputContainer.insertBefore(tagEl, tagInput);
        });
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
    };
    
    tagInputContainer.addEventListener('click', e => {
        if (e.target.closest('button')) {
            const index = e.target.closest('button').dataset.index;
            tags.splice(index, 1);
            renderTags();
        }
    });

    tagInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = tagInput.value.trim();
            if (tag && !tags.includes(tag)) {
                tags.push(tag);
                renderTags();
            }
            tagInput.value = '';
        }
    });
    
    renderTags();

    document.getElementById('save-btn').addEventListener('click', () => {
        const newEntry = {
            title: document.getElementById('title-input').value,
            content: document.getElementById('content-input').value,
            tags: tags,
            mood: document.querySelector('.mood-btn.selected')?.dataset.mood
        };
        
        if (isEditing) {
            JournalService.updateEntry(id, newEntry);
        } else {
            JournalService.createEntry(newEntry);
        }
        location.hash = '#/';
    });
    
    if(isEditing) {
        document.getElementById('delete-btn').addEventListener('click', () => {
            if (confirm(LanguageService.t('deleteConfirm'))) {
                JournalService.deleteEntry(id);
                location.hash = '#/';
            }
        });
    }

    const moodSelector = document.getElementById('mood-selector');
    moodSelector.addEventListener('click', e => {
        const btn = e.target.closest('.mood-btn');
        if (btn) {
            moodSelector.querySelector('.selected')?.classList.remove('selected');
            btn.classList.toggle('selected');
        }
    });
    
    if (entry.mood) {
        const moodBtn = moodSelector.querySelector(`[data-mood="${entry.mood}"]`);
        if (moodBtn) {
            moodBtn.classList.add('selected');
        }
    }
  },

  renderEntryDetailPage(id) {
    const entry = JournalService.getEntry(id);
    if (!entry) {
      this.root.innerHTML = `<div class="page empty-state"><h2>${LanguageService.t('thoughtNotFound')}</h2><a href="#/" class="btn">${LanguageService.t('backToThoughts')}</a></div>`;
      return;
    }
    
    this.root.innerHTML = `
      <div class="page">
        <div class="form-header">
            <a href="#/" class="btn"><i data-lucide="arrow-left"></i> ${LanguageService.t('back')}</a>
            <div class="form-header-actions">
                <a href="#/write/${id}" class="btn"><i data-lucide="edit"></i> ${LanguageService.t('edit')}</a>
                <button class="btn btn-danger" id="delete-btn"><i data-lucide="trash-2"></i> ${LanguageService.t('delete')}</button>
            </div>
        </div>
        <header class="detail-header">
          <h1>${entry.title || LanguageService.t('untitledThought')}</h1>
          <div class="detail-meta">
            <div class="detail-meta-item"><i data-lucide="calendar"></i> ${dateUtils.format(new Date(entry.createdAt), 'EEEE, MMMM d, yyyy')}</div>
            ${entry.mood ? `<div class="detail-meta-item">${moodEmojis[entry.mood]} ${LanguageService.t(entry.mood)}</div>` : ''}
          </div>
          <div class="detail-tags tag-list">${entry.tags.map(tag => `<a href="#/search?tag=${tag}" class="tag">${tag}</a>`).join('')}</div>
        </header>
        <div class="detail-content">${entry.content}</div>
      </div>
    `;
    
    document.getElementById('delete-btn').addEventListener('click', () => {
        if (confirm(LanguageService.t('deleteConfirm'))) {
            JournalService.deleteEntry(id);
            location.hash = '#/';
        }
    });
  },

  renderSearchPage() {
    this.root.innerHTML = `
        <div class="page">
            <div class="page-header">
                <div class="page-title-section">
                    <h1>${LanguageService.t('exploreMind')}</h1>
                    <p>${LanguageService.t('discoverThoughts')}</p>
                </div>
                ${this.createLanguageSelector()}
            </div>
            <div class="search-input-container">
                <i data-lucide="search"></i>
                <input type="text" id="search-input" class="search-input" placeholder="${LanguageService.t('searchPlaceholder')}">
            </div>
            <div class="search-tags">
                <h3>${LanguageService.t('browseCategories')}</h3>
                <div class="tag-list" id="tag-list-search"></div>
            </div>
            <div class="entries-grid" id="search-results"></div>
        </div>
    `;

    const searchInput = document.getElementById('search-input');
    const tagList = document.getElementById('tag-list-search');
    const resultsContainer = document.getElementById('search-results');
    
    const allTags = JournalService.getAllTags();
    tagList.innerHTML = allTags.map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`).join('');

    const performSearch = () => {
        const query = searchInput.value;
        const selectedTag = tagList.querySelector('.selected')?.dataset.tag;
        let results = [];
        
        if (query) {
            results = JournalService.searchEntries(query);
        } else if (selectedTag) {
            results = JournalService.getEntriesByTag(selectedTag);
        }
        
        resultsContainer.innerHTML = results.map(entry => this.getEntryCardHTML(entry)).join('');
        
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
    };

    searchInput.addEventListener('input', () => {
        tagList.querySelector('.selected')?.classList.remove('selected');
        performSearch();
    });

    tagList.addEventListener('click', e => {
        if (e.target.classList.contains('tag')) {
            searchInput.value = '';
            tagList.querySelector('.selected')?.classList.remove('selected');
            e.target.classList.add('selected');
            performSearch();
        }
    });
    
    this.setupLanguageSelector();
  },

  renderStatsPage() {
    const stats = JournalService.getStats();
    const topTags = JournalService.getAllTags().map(tag => ({
        tag,
        count: JournalService.getEntriesByTag(tag).length
    })).sort((a, b) => b.count - a.count).slice(0, 5);

    this.root.innerHTML = `
      <div class="page">
        <div class="page-header">
            <div class="page-title-section">
                <h1>${LanguageService.t('mindAnalytics')}</h1>
                <p>${LanguageService.t('trackPatterns')}</p>
            </div>
            ${this.createLanguageSelector()}
        </div>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-content">
                    <div class="stat-card-icon" style="background-color:var(--color-indigo-50); color:var(--color-indigo-600);"><i data-lucide="brain"></i></div>
                    <div>
                        <div class="stat-card-value">${stats.totalEntries}</div>
                        <div class="stat-card-label">${LanguageService.t('totalThoughts')}</div>
                    </div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-content">
                    <div class="stat-card-icon" style="background-color:var(--color-green-50); color:var(--color-green-600);"><i data-lucide="calendar"></i></div>
                    <div>
                        <div class="stat-card-value">${stats.entriesThisWeek}</div>
                        <div class="stat-card-label">${LanguageService.t('thisWeek')}</div>
                    </div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-content">
                    <div class="stat-card-icon" style="background-color:var(--color-purple-50); color:var(--color-purple-600);"><i data-lucide="trending-up"></i></div>
                    <div>
                        <div class="stat-card-value">${stats.entriesThisMonth}</div>
                        <div class="stat-card-label">${LanguageService.t('thisMonth')}</div>
                    </div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-content">
                    <div class="stat-card-icon" style="background-color:var(--color-orange-50); color:var(--color-orange-600);"><i data-lucide="bar-chart-3"></i></div>
                    <div>
                        <div class="stat-card-value">${stats.averageWordsPerEntry}</div>
                        <div class="stat-card-label">${LanguageService.t('avgWords')}</div>
                    </div>
                </div>
            </div>
        </div>
        ${topTags.length > 0 ? `
        <div class="top-tags-card">
            <h2>${LanguageService.t('mostFrequentTopics')}</h2>
            ${topTags.map(t => `
                <div class="tag-stat-item">
                    <span>${t.tag}</span>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div class="tag-stat-bar-container"><div class="tag-stat-bar" style="width:${(t.count / topTags[0].count) * 100}%"></div></div>
                        <span>${t.count}</span>
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}
      </div>
    `;
    
    this.setupLanguageSelector();
  }
};

// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
