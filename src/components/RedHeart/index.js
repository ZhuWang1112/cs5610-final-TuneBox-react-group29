// import {useSelector} from "react-redux";
// import {AiFillHeart} from "react-icons/ai";

// const RedHeart = () => {
//     const { checkSong } = useSelector((state) => state.likedSong);
//     const iconSize = 25;

//     return (
//         <div>
//             <div
//                 className={`${
//                     isSelf ? `col-1` : `col-2`
//                 } d-flex align-items-center justify-content-start p-0`}
//             >
//                 {checkSong[id] && (
//                     <AiFillHeart
//                         size={iconSize}
//                         className={`text-danger`}
//                         onClick={() => handleUnLikeClick(id, song._id)}
//                     />
//                 )}
//                 {!checkSong[id] && (
//                     <>
//                         {!playlistsOption && (
//                             <>
//                                 <div className={`position-relative`}>
//                                     <div onClick={() => setShow(!show)}>
//                                         <AiOutlineHeart
//                                             size={iconSize}
//                                             className={`text-muted`}
//                                         />
//                                     </div>
//                                     {show && (
//                                         <div
//                                             className={`like-toolkit-div position-absolute rounded-3`}
//                                         >
//                                             <h5 className={`text-white fw-bold m-2`}>
//                                                 Enjoy your Journey!
//                                             </h5>
//                                             <div
//                                                 className={`mt-3 mb-1 d-flex justify-content-center align-items-center`}
//                                             >
//                                                 <button
//                                                     className={`btn btn-light p-1`}
//                                                     onClick={() => navigate("/login")}
//                                                 >
//                                                     Log in
//                                                 </button>
//                                                 <p
//                                                     className={`text-muted mb-0 ms-3 not-now`}
//                                                     onClick={() => setShow(false)}
//                                                 >
//                                                     Not Now
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </>
//                         )}

//                         {playlistsOption && (
//                             <div className={`d-flex align-items-center`}>
//                                 <Dropdown id="playlists">
//                                     <Dropdown.Toggle
//                                         variant="secondary"
//                                         id="dropdown-basic"
//                                         className={`bg-muted`}
//                                     >
//                                         <AiFillHeart size={iconSize} />
//                                     </Dropdown.Toggle>
//                                     <Dropdown.Menu>
//                                         {playlistsOption.map((p) => (
//                                             <Dropdown.Item
//                                                 onClick={() => {
//                                                     handleAddToPlaylist(id, p._id, song._id);
//                                                 }}
//                                             >
//                                                 Add to {p.playListName}
//                                             </Dropdown.Item>
//                                         ))}
//                                     </Dropdown.Menu>
//                                 </Dropdown>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }
// export default RedHeart;
