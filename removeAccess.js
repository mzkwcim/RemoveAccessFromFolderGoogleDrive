function removeAccessForAllUsersRecursively() {
  var folderId = "1Yghrhan9_4a0WJrdb-OA4iEXpQU2U0pC";  // Zamień na ID folderu
  var folder = DriveApp.getFolderById(folderId);
  
  removeAccessFromFolderAndContentsForAll(folder);
}

function removeAccessFromFolderAndContentsForAll(folder) {
  removeAllUsersFromFileOrFolder(folder);

  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    removeAllUsersFromFileOrFolder(file);
  }
}

function removeAllUsersFromFileOrFolder(fileOrFolder) {
  var editors = fileOrFolder.getEditors();
  for (var i = 0; i < editors.length; i++) {
    var editor = editors[i];
    if (editor.getEmail() !== Session.getActiveUser().getEmail()) {
      fileOrFolder.removeEditor(editor);
    }
  }
  
  var viewers = fileOrFolder.getViewers();
  for (var i = 0; i < viewers.length; i++) {
    var viewer = viewers[i];
    if (viewer.getEmail() !== Session.getActiveUser().getEmail()) {
      fileOrFolder.removeViewer(viewer);
    }
  }
}

