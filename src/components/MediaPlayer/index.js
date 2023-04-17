import {useEffect, useRef, useState} from "react";
import {FaPlay, FaPause, FaVolumeUp, FaRegPlayCircle, FaRegPauseCircle} from 'react-icons/fa';
import {AiOutlinePause, AiOutlinePlaySquare} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {getTrackThunk} from "../../services/thunks/track-thunk";
import {updateIsPlaying} from "../../reducers/currentTrack-reducer";
const MediaPlayer = () => {

    // const song = {
    //     mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    //     isPlaying: false,
    //     artist: 'Artist Name',
    //     songName: 'Song Title',
    //     img: 'https://example.com/song.jpg'
    // };
    const audioRef = useRef(null);
    const isPlaying = useSelector(state => state.currentTrack.isPlaying);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const song = useSelector(state => state.currentTrack.track);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // useEffect(() => {
    //     dispatch(getTrackThunk(song));
    // }, [song]);
    const handlePlay = () => {
        dispatch(updateIsPlaying(true));
        audioRef.current.play();
    };

    const handlePause = () => {
        dispatch(updateIsPlaying(false));
        audioRef.current.pause();
    };

    const handleTimeUpdate = (e) => {
        setCurrentTime(e.target.currentTime);
    };

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    return (
        <div className={"row text-white"}>
            <div className={"col-2"}>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <img src={song.img} alt="Song Cover" style={{ height: '85px' }} />
                    </div>
                    <div className={"col-6 pt-2"}>
                        <h4>{song.songName}</h4>
                        <div>{song.artistName}</div>
                    </div>
                </div>
            </div>

            <div className={"col-8"} >
                <div style={{ display: 'flex', justifyContent: 'center' }} className={"mt-2"}>
                    <div onClick={isPlaying ? handlePause : handlePlay}>
                        {isPlaying ? <FaRegPauseCircle style={{ width: '32px', height: '32px'}}/> : <FaRegPlayCircle style={{ width: '32px', height: '32px'}}/>}
                    </div>
                </div >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} className={"mt-0"}>
                    <input
                        type="range"
                        min="0"
                        max={audioRef.current ? audioRef.current.duration : 0}
                        value={currentTime}
                        step="0.01"
                        onChange={handleSeek}
                        style={{
                            width: '60%',
                            height: '4px',
                            background: 'transparent',
                            outline: 'none'
                        }}
                    />
                    <span className={"m-1"}>{formatTime(currentTime)}</span>
                </div>
            </div>

            <div className="col-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <FaVolumeUp className={"m-3"}/>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={{
                            width: '100px',
                            height: '4px',
                        }}
                    />
                </div>
            </div>
            <audio ref={audioRef} src={song.mp3Url} onTimeUpdate={handleTimeUpdate} />
        </div>
    );
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}
export default MediaPlayer;
// <div>{formatTime(currentTime)}</div>