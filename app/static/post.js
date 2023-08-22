// 削除ボタン押下時、実行される関数
function deletePost(post_id) {
    fetch(`/posts/${post_id}/`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                location.reload();
            } else {
                alert('投稿の削除に失敗しました');
                location.reload();
            }
        });
}

// 編集ボタン押下時、編集可能状態にする。保存ボタン押下時、保存する
// DOMContentLoaded イベント処理
document.addEventListener('DOMContentLoaded', function () {
    // DOMが準備されたときに行う処理
    document.querySelectorAll('.editButton, .saveButton').forEach(button => {
        button.addEventListener('click', function () {
            toggleEditMode(this.getAttribute('post_id'), this.classList.contains('editButton'));
        });
    });
});

// 編集状態のときはreturn,編集状態ではない場合は投稿を更新
function toggleEditMode(postId, isEditMode) {
    toggleUIState(postId, isEditMode);
    if (isEditMode) {
        return
    }
    updatePost(postId);
}

// 投稿を更新する
function updatePost(postId) {
    const titleElement = document.getElementById(`title-${postId}`);
    const descElement = document.getElementById(`desc-${postId}`);
    const titleText = titleElement.textContent.trim();
    const descText = descElement.textContent.trim();
    const editAlertTitle = document.getElementById('editAlertTitle');
    const editAlertDesc = document.getElementById('editAlertDesc');

    // 文字・投稿内容が入力されているかチェック
    if (titleText === "" && descText === "") {
        editAlertTitle.style.display = 'block';
        editAlertDesc.style.display = 'block';
        toggleUIState(postId, true);
        titleElement.focus();
        return
    }

    // 文字が入力されているかチェック
    if (titleText === "") {
        editAlertTitle.style.display = 'block';
        editAlertDesc.style.display = 'none';
        toggleUIState(postId, true);
        titleElement.focus();
        return;
    }

    // 投稿内容が入力されているかチェック
    if (descText === "") {
        editAlertTitle.style.display = 'none';
        editAlertDesc.style.display = 'block';
        toggleUIState(postId, true);
        descElement.focus();
        return;
    }

    const updatedPost = {
        title: titleText,
        description: descText
    };

    // サーバに編集内容を送信する
    fetch(`/posts/${postId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('投稿内容を更新しました!');
                location.reload();
            } else {
                alert('更新に失敗しました');
                location.reload();
            }
        });
}