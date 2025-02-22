function deleteNote(noteId) {
    fetch("/delete-note", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId: noteId }),
        credentials: 'same-origin'  // Include cookies in the request
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error || 'Failed to delete note');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            // Remove the note element from the DOM
            const noteElement = document.querySelector(`[data-note-id="${noteId}"]`);
            if (noteElement) {
                noteElement.remove();
            } else {
                window.location.href = "/";
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
}