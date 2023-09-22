const fileInput = document.getElementById('fileInput'); // Получаем элемент для загрузки файла
const repeatButton = document.getElementById('repeatButton'); // Получаем кнопку повтора
const audio = document.getElementById('audio'); // Получаем элемент аудио
const playPauseButton = document.getElementById('playPauseButton'); // Получаем кнопку воспроизведения/паузы
const volumeBar = document.getElementById('volumeBar'); // Получаем ползунок громкости
const currentTime = document.getElementById('currentTime'); // Получаем элемент текущего времени
const totalTime = document.getElementById('totalTime'); // Получаем элемент общего времени
const trackList = document.getElementById('trackList'); // Получаем список треков
const currentTrackElement = document.getElementById('currentTrack'); // Получаем элемент текущего трека

// Получаем элементы управления
const previousButton = document.getElementById("previousButton"); // Получаем кнопку "Предыдущий трек"
const nextButton = document.getElementById("nextButton"); // Получаем кнопку "Следующий трек"
const randomButton = document.getElementById("randomButton"); // Получаем кнопку "Случайный трек"

let playlist = []; // Создаем пустой плейлист
let currentTrackIndex = 0; // Устанавливаем индекс текущего трека

let isRepeatEnabled = false; // Устанавливаем флаг повтора в false

// Добавление трека в плейлист
playlist.push({ name: 'Кравц, Гио Пика - Где прошла ты', path: './assest/audio/song1.mp3' });
playlist.push({ name: 'Михаил Круг - Владимирский централ', path: './assest/audio/song2.mp3' });
playlist.push({ name: 'GAYAZOV$ BROTHER$ - Пошла жара', path: './assest/audio/song3.mp3' });
playlist.push({ name: 'Люся Чеботина - Солнце Монако', path: './assest/audio/song4.mp3' });
playlist.push({ name: 'HammAli & Navai - Птичка', path: './assest/audio/song5.mp3' });

// Сохранение плейлиста
savePlaylist();

// Обновление списка треков в плейлисте
updateTrackList();

// Загрузка плейлиста и обновление интерфейса
loadPlaylist();
updateTrackList();

// Обработчики событий
playPauseButton.addEventListener('click', playPause); // Обработчик нажатия на кнопку воспроизведения/паузы
volumeBar.addEventListener('input', () => { // Обработчик изменения значения ползунка громкости
  wavesurfer.setVolume(volumeBar.value);
});

// Обработчик нажатия на кнопку "Предыдущий трек"
previousButton.addEventListener("click", function() {
  playPreviousTrack();
});

// Обработчик нажатия на кнопку "Следующий трек"
nextButton.addEventListener("click", function() {
  playNextTrack();
});

// Обработчик нажатия на кнопку "Случайный трек"
randomButton.addEventListener("click", function() {
  playRandomTrack();
});

fileInput.addEventListener('change', () => { // Обработчик изменения значения элемента загрузки файла
  const file = fileInput.files[0]; // Получаем выбранный файл
  const trackName = file.name; // Получаем имя файла
  const trackPath = URL.createObjectURL(file); // Создаем путь к файлу
  playlist.push({ name: trackName, path: trackPath }); // Добавляем трек в плейлист
  savePlaylist(); // Сохраняем плейлист
  updateTrackList(); // Обновляем список треков
});

function toggleRepeat() { // Функция для включения/выключения повтора
  isRepeatEnabled = !isRepeatEnabled; // Инвертируем значение флага повтора
  if (isRepeatEnabled) { // Если флаг повтора включен
    repeatButton.classList.add('button__red'); // Добавляем класс для кнопки повтора
  } else { // Если флаг повтора выключен
    repeatButton.classList.remove('button__red'); // Удаляем класс для кнопки повтора
  }
}