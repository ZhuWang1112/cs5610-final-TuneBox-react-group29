import {useEffect, useRef, useState} from "react";
import {FaPlay, FaPause, FaVolumeUp, FaRegPlayCircle, FaRegPauseCircle} from 'react-icons/fa';
import {AiFillHeart, AiOutlinePause, AiOutlinePlaySquare} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {getTrackThunk} from "../../services/thunks/track-thunk";
import {updateIsPlaying} from "../../reducers/currentTrack-reducer";
import "./index.css";
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

    useEffect(() => {
        // This is to switch the song,
        // but it needs to add (if statement) to prevent the default song playing automatically when the page is refreshed
        if (song.img) {
            audioRef.current.play();
        }
    },[song]);

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

    const handleAudioEnded = () => {
        dispatch(updateIsPlaying(false));
    };

    return (
        <div className={"row text-white"}>
            <div className={"col-2"}>
                <div className={"row"}>
                    <div className={" col-6 p-0 m-0"}>
                        {song.img && <img src={song.img} alt="Song Cover" style={{ height: '85px' }} />}
                    </div>
                    <div className={"d-none d-md-block col-6 p-0 m-0 pt-2 "} >
                        <div className="wd-scrolling-text">
                            {song.songName}
                        </div>
                        <div style={{ color: 'darkgray', fontSize: 'small' }}>{song.artistName}</div>
                        {song.songName &&
                            <>
                                <div>
                                    <AiFillHeart/>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>

            <div className={"col-7 col-lg-8"} >
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

            <div className="col-3 col-lg-2 d-none d-md-block" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            <audio ref={audioRef} src={song.mp3Url} onTimeUpdate={handleTimeUpdate} onEnded={handleAudioEnded}/>
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