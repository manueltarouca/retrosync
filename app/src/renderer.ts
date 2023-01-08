const selectFolderButton = document.getElementById('select-folder-button');
selectFolderButton.addEventListener('click', () => {
    const options = {
        title: 'Select a folder',
        properties: ['openDirectory']
    };

    window.electronAPI.sendOptions(options);
});

