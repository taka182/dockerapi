// 削除ボタン押下時、実行される関数
function deletePost(post_id) {
    fetch(`/posts/${post_id}/`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('投稿を削除しました!');
                location.reload();
            } else {
                alert('投稿の削除に失敗しました');
                location.reload();
            }
        });
}

// 編集ボタン押下時、編集可能状態にする。保存ボタン押下時、保存する。
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.editButton, .saveButton').forEach(button => {
        button.addEventListener('click', function () {
            toggleEditMode(this.getAttribute('post_id'), this.classList.contains('editButton'));
        });
    });
});

function toggleEditMode(postId, isEditMode) {
    const titleElement = document.getElementById(`title-${postId}`);
    const descElement = document.getElementById(`desc-${postId}`);
    const editButton = document.querySelector(`.editButton[post_id="${postId}"]`);
    const saveButton = document.querySelector(`.saveButton[post_id="${postId}"]`);

    titleElement.contentEditable = isEditMode;
    descElement.contentEditable = isEditMode;

    editButton.style.display = isEditMode ? 'none' : 'inline-block';
    saveButton.style.display = isEditMode ? 'inline-block' : 'none';

    // 編集状態時、タイトルにフォーカスを当てreturn
    if (isEditMode) {
        titleElement.focus();
        return;
    }

    const titleText = titleElement.textContent.trim();
    const descText = descElement.textContent.trim();

    if (titleText === "" || descText === "") {
        alert("タイトルまたは投稿内容が空白です。");
        titleElement.contentEditable = true;
        descElement.contentEditable = true;
        // 編集ボタンの非表示
        editButton.style.display = 'none';
        // 保存ボタンの表示
        saveButton.style.display = 'inline-block';
        titleElement.focus();
    } else {
        // サーバに編集内容を送信する
        const updatedPost = {
            title: titleText,
            description: descText
        };
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
}