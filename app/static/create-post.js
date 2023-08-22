// DOMContentLoaded イベント処理
document.addEventListener('DOMContentLoaded', function () {
    // DOMが準備されたときに行う処理
    createButton = document.querySelector('.createButton')
    createButton.addEventListener('click', function (event) {
        const titleElement = document.getElementById(`title`);
        const descElement = document.getElementById(`description`);
        const titleText = titleElement.value.trim();
        const descText = descElement.value.trim();

        // 文字・投稿内容が入力されているかチェック
        if (titleText === "" && descText === "") {
            createAlertTitle.style.display = 'block';
            createAlertDesc.style.display = 'block';
            titleElement.focus();
            // デフォルトの処理を中断
            event.preventDefault();
            return
        }

        // 文字が入力されているかチェックï
        if (titleText === "") {
            createAlertTitle.style.display = 'block';
            createAlertDesc.style.display = 'none';
            titleElement.focus();
            event.preventDefault();
            return;
        }

        // 投稿内容が入力されているかチェック
        if (descText === "") {
            createAlertTitle.style.display = 'none';
            createAlertDesc.style.display = 'block';
            descElement.focus();
            event.preventDefault()
            return;
        }
    });
});