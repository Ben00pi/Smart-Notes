// Smart Notes Application

// Note Management Class
class NoteManager {
    constructor() {
        this.notes = this.loadNotes();
    }

    loadNotes() {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    addNote(note) {
        this.notes.push(note);
        this.saveNotes();
    }

    deleteNote(index) {
        this.notes.splice(index, 1);
        this.saveNotes();
    }

    getNotes() {
        return this.notes;
    }
}

// Note Formatting Class
class NoteFormatter {
    formatNote(note) {
        return `# ${note.title}\n\n${note.content}`;
    }
}

// Calculate Mode Class
class CalculateMode {
    static calculate(a, b, operation) {
        switch (operation) {
            case 'add': return a + b;
            case 'subtract': return a - b;
            case 'multiply': return a * b;
            case 'divide': return a / b;
            default: return null;
        }
    }
}

// UI Interaction
document.addEventListener('DOMContentLoaded', () => {
    const noteManager = new NoteManager();
    const noteFormatter = new NoteFormatter();

    // Setting up UI components
    const noteList = document.getElementById('note-list');
    const addNoteButton = document.getElementById('add-note');
    const noteTitleInput = document.getElementById('note-title');
    const noteContentInput = document.getElementById('note-content');

    function renderNotes() {
        noteList.innerHTML = '';
        noteManager.getNotes().forEach((note, index) => {
            const noteElement = document.createElement('li');
            noteElement.textContent = noteFormatter.formatNote(note);
            noteElement.appendChild(createDeleteButton(index));
            noteList.appendChild(noteElement);
        });
    }

    function createDeleteButton(index) {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.addEventListener('click', () => {
            noteManager.deleteNote(index);
            renderNotes();
        });
        return button;
    }

    addNoteButton.addEventListener('click', () => {
        const newNote = { title: noteTitleInput.value, content: noteContentInput.value };
        noteManager.addNote(newNote);
        noteTitleInput.value = '';
        noteContentInput.value = '';
        renderNotes();
    });

    renderNotes();
});

// Auto-save functionality
setInterval(() => {
    const noteManager = new NoteManager();
    noteManager.saveNotes();
}, 5000);

// Keyboard Shortcuts
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        const noteManager = new NoteManager();
        noteManager.saveNotes();
        alert('Notes auto-saved!');
    }
});