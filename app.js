import Store from './core/store.js';
import EventBus from './core/eventbus.js';
import { notesReducer } from './reducers.js';
import NoteService from './services/NoteService.js';
import wordCountPlugin from './plugins/wordCount.plugin.js';

// Initialize Store and EventBus
const store = new Store(notesReducer, { notes: [] });
const events = new EventBus();
const app = { store, events };

// Load plugin
wordCountPlugin(app);

// Initialize NoteService
const noteService = new NoteService(store);

// DOM Elements
const noteList = document.getElementById('noteList');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const addNoteBtn = document.getElementById('addNoteBtn');

// Render function
function renderNotes() {
  noteList.innerHTML = '';
  store.getState().notes.forEach(note => {
    const li = document.createElement('li');
    li.className = 'noteItem';
    li.innerHTML = `
      <div>
        <strong>${note.title}</strong><br/>
        <span>${note.content}</span>
      </div>
      <button data-id="${note.id}">Delete</button>
    `;
    // Delete note
    li.querySelector('button').addEventListener('click', () => {
      store.dispatch({ type: 'DELETE_NOTE', payload: note.id });
      renderNotes();
    });
    noteList.appendChild(li);
  });
}

// Add note
addNoteBtn.addEventListener('click', () => {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (!title || !content) return;
  noteService.createNote({ title, content });
  noteTitle.value = '';
  noteContent.value = '';
  renderNotes();
});

// Initial render
renderNotes();
