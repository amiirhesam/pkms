export default class Note {
  constructor({ id, title, content, tags = [], version = 1 }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.version = version;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateContent(newContent) {
    this.content = newContent;
    this.version++;
    this.updatedAt = new Date();
  }
}
