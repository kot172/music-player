//Обновление треклиста
function updateTrackList() {
    trackList.innerHTML = '';
    playlist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.name;
        li.classList = 'track';
        li.addEventListener('click', () => {
            playTrack(index);
        });
        trackList.appendChild(li);
    });
}

function playTrack(index) {
    // Воспроизведение трека по индексу
    const track = playlist[index];
    currentTrackIndex = index;
    wavesurfer.load(track.path);
    wavesurfer.on('ready', function () {
        wavesurfer.play();
        updateCurrentTrack(); // Обновление текущего трека
    });
}

function playPause() {
    // Воспроизведение / пауза
    if (wavesurfer.isPlaying()) {
        wavesurfer.pause();
        playPauseButton.innerText = 'Play'
        playPauseButton.classList.add('button__red')
    } else {
        if (wavesurfer.getCurrentTime() === 0) {
            if (playlist.length > 0) {
                playTrack(0);
            }
        } else {
            wavesurfer.play();
            playPauseButton.innerText = 'Pause'
            playPauseButton.classList.remove('button__red')
        }
    }
}

function updateCurrentTime() {
    // Обновление текущего времени трека
    const minutes = Math.floor(wavesurfer.getCurrentTime() / 60);
    const seconds = Math.floor(wavesurfer.getCurrentTime() % 60);
    currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
    // Обновление общей длительности трека
    const minutes = Math.floor(wavesurfer.getDuration() / 60);
    const seconds = Math.floor(wavesurfer.getDuration() % 60);
    totalTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function playNextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex >= playlist.length) {
        currentTrackIndex = 0;
    }
    playTrack(currentTrackIndex);
    updateCurrentTrack(); // Обновление текущего трека
}

function playPreviousTrack() {
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
        currentTrackIndex = playlist.length - 1;
    }
    playTrack(currentTrackIndex);
    updateCurrentTrack(); // Обновление текущего трека
}

function playRandomTrack() {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    playTrack(randomIndex);
    updateCurrentTrack(); // Обновление текущего трека
}

function updateCurrentTrack() {
    const currentTrack = playlist[currentTrackIndex];
    currentTrackElement.textContent = currentTrack ? currentTrack.name : '';
}
