function loadPlaylist() {
    // Загрузка плейлиста из localStorage
    const storedPlaylist = localStorage.getItem('playlist');
    if (storedPlaylist) {
      playlist = JSON.parse(storedPlaylist);
    }
  }
  
  function savePlaylist() {
    // Сохранение плейлиста в localStorage
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }