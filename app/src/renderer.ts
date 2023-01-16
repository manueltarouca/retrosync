const selectFolderButton = document.getElementById('select-folder-button');
selectFolderButton.addEventListener('click', () => {
  const options = {
    title: 'Select a folder',
    properties: ['openDirectory']
  };

  window.electronAPI.sendOptions(options);
});

window.electronAPI.onData(data => {
  const list = data.map(item => `<li>${item.name}</li>`)
  document.body.innerHTML += `<div><ul>${list.join('')}</ul></div>`;
})

