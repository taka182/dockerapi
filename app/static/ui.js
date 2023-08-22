// UIの状態を切り替える
function toggleUIState(postId, isEditMode) {
    const titleElement = document.getElementById(`title-${postId}`);
    const descElement = document.getElementById(`desc-${postId}`);
    const editButton = document.querySelector(`.editButton[post_id="${postId}"]`);
    const saveButton = document.querySelector(`.saveButton[post_id="${postId}"]`);

    titleElement.contentEditable = isEditMode;
    descElement.contentEditable = isEditMode;

    editButton.style.display = isEditMode ? 'none' : 'inline-block';
    saveButton.style.display = isEditMode ? 'inline-block' : 'none';
}