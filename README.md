# Duolingo Notes

Duolingo Notes is a Google Chrome Extension can help the duolingo users save notes during learning.

This Extension is free on [Google Web Store | Duolingo Notes](https://chrome.google.com/webstore/detail/duolingo-notes/fdhafjdcofficgjebiflfamofkoedieh).

User Guide is availabe on [Duolingo | Duolingo Notes App - Help you learn Duolingo faster and better](https://www.duolingo.com/comment/2976444).

### Features
* bookmark the question and answer during learning.
* Review your bookmarked notes.
* Copy the note.
* Speak the note.
* Add personal comments.
* Search the note.
* Delete the note.
* Delete all notes.
* Export notes to CSV.

### Design Considerations
* I use chrome.storage (chrome.storage.sync) instead of IndexedDB because I want to sync the notes across different Google Chrome browsers easily. Due to storage limit, I have changed to use chrome.storage.local to replace chrome.storage.sync.

### License
The app is under MIT License. The duolingo trademark and the owl logo are owned by Duolingo. And the third party libraries are owned by original vendors.

### Release Notes
* V1.9
Add delete all notes button. Add export notes to CSV feature. Thanks to [northernguy](https://www.duolingo.com/northernguy) for suggesting these features.

* V1.8
Support image select question.

* V1.7
Improve User Experience, show bigger image when mouse hover over, add tooltip for buttons, resize the popup and display better for Windows users.

* V1.6
Use chrome.storage.local to replace chrome.storage.sync due to the storage limit of chrome.storage.sync (https://developer.chrome.com/extensions/storage#type-StorageArea). Thanks to [northernguy](https://www.duolingo.com/northernguy) for reporting that.

* V1.5
Added Support to Practice Lesson(practicing/strengthening a lesson). The user can add notes during Practice Lesson. Thanks to [jan williams](https://www.duolingo.com/willijanb) for reporting that.

* V1.4
Added tooltip for personal comments. Thanks to [Dessamator](https://www.duolingo.com/Dessamator) for suggesting this feature.

* V1.3
Added personal comments box.

* V1.2
Added speech button.
