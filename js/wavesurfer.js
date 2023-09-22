// Инициализация WaveSurfer
const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
});

wavesurfer.on('finish', () => {
    if (isRepeatEnabled) {
        playTrack(currentTrackIndex);
    } else {
        playNextTrack();
    }
});

wavesurfer.on('audioprocess', () => {
    updateCurrentTime();
});

wavesurfer.on('ready', () => {
    updateTotalTime();
});