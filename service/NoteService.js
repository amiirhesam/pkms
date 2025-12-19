import Note from '../domain/Note.js';

export default class NoteService {
  constructor(store) {
    this.store = store;
  }

  createNote(data) {
    const note = new Note({
      ...data,
      id: crypto.randomUUID()
    });

    this.store.dispatch({
      type: 'ADD_NOTE',
      payload: note
    });
  }
}
