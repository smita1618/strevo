// import { Link, useLocation } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
// import ThemeSelector from "./ThemeSelector";
// import useLogout from "../hooks/useLogout";

// const Navbar = () => {
//   const { authUser } = useAuthUser();
//   const location = useLocation();
//   const isChatPage = location.pathname?.startsWith("/chat");

//   // const queryClient = useQueryClient();
//   // const { mutate: logoutMutation } = useMutation({
//   //   mutationFn: logout,
//   //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
//   // });

//   const { logoutMutation } = useLogout();

//   return (
//     <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-end w-full">
//           {/* LOGO - ONLY IN THE CHAT PAGE */}
//           {isChatPage && (
//             <div className="pl-5">
//               <Link to="/" className="flex items-center gap-2.5">
//                 <ShipWheelIcon className="size-9 text-primary" />
//                 <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
//                   Strevo
//                 </span>
//               </Link>
//             </div>
//           )}

//           <div className="flex items-center gap-3 sm:gap-4 ml-auto">
//             <Link to={"/notifications"}>
//               <button className="btn btn-ghost btn-circle">
//                 <BellIcon className="h-6 w-6 text-base-content opacity-70" />
//               </button>
//             </Link>
//           </div>

//           {/* TODO */}
//           <ThemeSelector />

//           <div className="avatar">
//             <div className="w-9 rounded-full">
//               <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
//             </div>
//           </div>

//           {/* Logout button */}
//           <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
//             <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };
// export default Navbar;



// import { Link, useLocation } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { BellIcon, LogOutIcon, ShipWheelIcon, ChevronDownIcon, Edit3Icon, KeyIcon, MailIcon, Eye, EyeOff } from "lucide-react";
// import ThemeSelector from "./ThemeSelector";
// import useLogout from "../hooks/useLogout";
// import { toast } from "react-hot-toast";
// import { changePassword } from "../lib/api";
// import { getProfilePicUrl } from "../utils/profilePic";
// import { useState, useRef, useEffect } from "react";

// const Navbar = () => {
//   const { authUser } = useAuthUser();
//   const location = useLocation();
//   const isChatPage = location.pathname?.startsWith("/chat");
//   const { logoutMutation } = useLogout();
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [passwordModal, setPasswordModal] = useState(false);
//   const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
//   const profileRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handlePasswordChange = async () => {
//     const currentPasswordInput = document.getElementById('current-password');
//     const newPasswordInput = document.getElementById('new-password');
//     const confirmPasswordInput = document.getElementById('confirm-password');

//     const currentPassword = currentPasswordInput.value;
//     const newPassword = newPasswordInput.value;
//     const confirmPassword = confirmPasswordInput.value;

//     if (!currentPassword || !newPassword || !confirmPassword) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     if (newPassword.length < 6) {
//       toast.error("New password must be at least 6 characters");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("New passwords do not match");
//       return;
//     }

//     try {
//       await changePassword({ currentPassword, newPassword });
//       toast.success("Password changed successfully!");
//       setPasswordModal(false);
//       // 🆕 FIXED: No optional chaining
//       if (currentPasswordInput) currentPasswordInput.value = '';
//       if (newPasswordInput) newPasswordInput.value = '';
//       if (confirmPasswordInput) confirmPasswordInput.value = '';
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to change password");
//     }
//   };

//   const closePasswordModal = () => {
//     setPasswordModal(false);
//     const currentPasswordInput = document.getElementById('current-password');
//     const newPasswordInput = document.getElementById('new-password');
//     const confirmPasswordInput = document.getElementById('confirm-password');
//     if (currentPasswordInput) currentPasswordInput.value = '';
//     if (newPasswordInput) newPasswordInput.value = '';
//     if (confirmPasswordInput) confirmPasswordInput.value = '';
//   };

//   return (
//     <>
//       <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-end w-full">
//             {isChatPage && (
//               <div className="pl-5">
//                 <Link to="/" className="flex items-center gap-2.5">
//                   <ShipWheelIcon className="size-9 text-primary" />
//                   <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
//                     Strevo
//                   </span>
//                 </Link>
//               </div>
//             )}

//             <div className="flex items-center gap-3 sm:gap-4 ml-auto">
//               <Link to="/notifications">
//                 <button className="btn btn-ghost btn-circle">
//                   <BellIcon className="h-6 w-6 text-base-content opacity-70" />
//                 </button>
//               </Link>
//             </div>

//             <ThemeSelector />

//             <div className="relative" ref={profileRef}>
//               <button 
//                 className="avatar btn btn-ghost btn-circle relative p-0" 
//                 onClick={() => setProfileOpen(!profileOpen)}
//               >
//                 <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-200 ring-offset-1 overflow-hidden">
//                   <img 
//                     src={getProfilePicUrl(authUser?.profilePic)} 
//                     alt="User Avatar" 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <ChevronDownIcon className={`h-4 w-4 absolute -top-1 -right-1 bg-base-200 p-0.5 rounded-full transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-2 w-72 bg-base-100 border border-base-300 rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
//                   <div className="p-4 border-b border-base-300">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-full ring ring-primary overflow-hidden">
//                         <img src={getProfilePicUrl(authUser?.profilePic)} alt="Profile" className="w-full h-full object-cover" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
//                         <div className="flex items-center gap-1 text-xs opacity-70">
//                           <MailIcon className="size-3" />
//                           <span className="truncate">{authUser?.email}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2 space-y-1">
//                     <Link to="/profile" className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all" onClick={() => setProfileOpen(false)}>
//                       <Edit3Icon className="size-4" /> Edit Profile Picture
//                     </Link>
//                     <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all text-left" onClick={() => {setProfileOpen(false); setPasswordModal(true);}}>
//                       <KeyIcon className="size-4" /> Change Password
//                     </button>
//                     <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-error hover:text-error-content text-sm transition-all text-left" onClick={() => {logoutMutation(); setProfileOpen(false);}}>
//                       <LogOutIcon className="size-4" /> Sign Out
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* 🆕 PERFECT PASSWORD MODAL - FIXED */}
//       {passwordModal && (
//         <div className="modal modal-open">
//           <div className="modal-box max-w-md">
//             <div className="flex items-center gap-3 mb-6">
//               <KeyIcon className="size-6 text-primary" />
//               <h3 className="font-bold text-xl">Change Password</h3>
//             </div>
            
//             <div className="space-y-4">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Current Password</span>
//                 </label>
//                 <div className="relative">
//                   <input 
//                     id="current-password"
//                     type={showPasswords.current ? "text" : "password"} 
//                     placeholder="Enter current password"
//                     className="input input-bordered w-full pr-12" 
//                   />
//                   <button 
//                     type="button"
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                     onClick={() => setShowPasswords(prev => ({...prev, current: !prev.current}))}
//                   >
//                     {showPasswords.current ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">New Password</span>
//                 </label>
//                 <div className="relative">
//                   <input 
//                     id="new-password"
//                     type={showPasswords.new ? "text" : "password"} 
//                     placeholder="New password (min 6 chars)"
//                     className="input input-bordered w-full pr-12" 
//                   />
//                   <button 
//                     type="button"
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                     onClick={() => setShowPasswords(prev => ({...prev, new: !prev.new}))}
//                   >
//                     {showPasswords.new ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Confirm New Password</span>
//                 </label>
//                 <div className="relative">
//                   <input 
//                     id="confirm-password"
//                     type={showPasswords.confirm ? "text" : "password"} 
//                     placeholder="Confirm new password"
//                     className="input input-bordered w-full pr-12" 
//                   />
//                   <button 
//                     type="button"
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                     onClick={() => setShowPasswords(prev => ({...prev, confirm: !prev.confirm}))}
//                   >
//                     {showPasswords.confirm ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="modal-action mt-8">
//               <button className="btn btn-ghost" onClick={closePasswordModal}>Cancel</button>
//               <button className="btn btn-primary" onClick={handlePasswordChange}>Update Password</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;







// import { Link, useLocation } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { BellIcon, LogOutIcon, ShipWheelIcon, ChevronDownIcon, Edit3Icon, KeyIcon, MailIcon, Eye, EyeOff, UserMinus, AlertTriangle } from "lucide-react";
// import ThemeSelector from "./ThemeSelector";
// import useLogout from "../hooks/useLogout";
// import { toast } from "react-hot-toast";
// import { changePassword, deleteAccount } from "../lib/api";
// import { getProfilePicUrl } from "../utils/profilePic";
// import { useState, useRef, useEffect } from "react";

// const Navbar = () => {
//   const { authUser } = useAuthUser();
//   const location = useLocation();
//   const isChatPage = location.pathname?.startsWith("/chat");
//   const { logoutMutation } = useLogout();
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [passwordModal, setPasswordModal] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
//   const [deleteConfirm, setDeleteConfirm] = useState("");
//   const profileRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handlePasswordChange = async () => {
//     const currentPasswordInput = document.getElementById('current-password');
//     const newPasswordInput = document.getElementById('new-password');
//     const confirmPasswordInput = document.getElementById('confirm-password');

//     const currentPassword = currentPasswordInput?.value || '';
//     const newPassword = newPasswordInput?.value || '';
//     const confirmPassword = confirmPasswordInput?.value || '';

//     if (!currentPassword || !newPassword || !confirmPassword) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     if (newPassword.length < 6) {
//       toast.error("New password must be at least 6 characters");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("New passwords do not match");
//       return;
//     }

//     try {
//       await changePassword({ currentPassword, newPassword });
//       toast.success("Password changed successfully!");
//       setPasswordModal(false);
//       if (currentPasswordInput) currentPasswordInput.value = '';
//       if (newPasswordInput) newPasswordInput.value = '';
//       if (confirmPasswordInput) confirmPasswordInput.value = '';
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to change password");
//     }
//   };

//   const closePasswordModal = () => {
//     setPasswordModal(false);
//     const currentPasswordInput = document.getElementById('current-password');
//     const newPasswordInput = document.getElementById('new-password');
//     const confirmPasswordInput = document.getElementById('confirm-password');
//     if (currentPasswordInput) currentPasswordInput.value = '';
//     if (newPasswordInput) newPasswordInput.value = '';
//     if (confirmPasswordInput) confirmPasswordInput.value = '';
//   };

//   const handleDeleteAccount = async () => {
//     if (deleteConfirm !== "DELETE MY ACCOUNT") {
//       toast.error("Please type 'DELETE MY ACCOUNT' to confirm");
//       return;
//     }

//     try {
//       await deleteAccount();
//       toast.success("Account deleted successfully. Goodbye!");
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 2000);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete account");
//     }
//   };

//   const closeDeleteModal = () => {
//     setDeleteModal(false);
//     setDeleteConfirm("");
//   };

//   return (
//     <>
//       <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-end w-full">
//             {isChatPage && (
//               <div className="pl-5">
//                 <Link to="/" className="flex items-center gap-2.5">
//                   <ShipWheelIcon className="size-9 text-primary" />
//                   <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
//                     Streamify
//                   </span>
//                 </Link>
//               </div>
//             )}

//             <div className="flex items-center gap-3 sm:gap-4 ml-auto">
//               <Link to="/notifications">
//                 <button className="btn btn-ghost btn-circle">
//                   <BellIcon className="h-6 w-6 text-base-content opacity-70" />
//                 </button>
//               </Link>
//             </div>

//             <ThemeSelector />

//             <div className="relative" ref={profileRef}>
//               <button 
//                 className="avatar btn btn-ghost btn-circle relative p-0" 
//                 onClick={() => setProfileOpen(!profileOpen)}
//               >
//                 <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-200 ring-offset-1 overflow-hidden">
//                   <img 
//                     src={getProfilePicUrl(authUser?.profilePic)} 
//                     alt="User Avatar" 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <ChevronDownIcon className={`h-4 w-4 absolute -top-1 -right-1 bg-base-200 p-0.5 rounded-full transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-2 w-72 bg-base-100 border border-base-300 rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
//                   <div className="p-4 border-b border-base-300">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-full ring ring-primary overflow-hidden">
//                         <img src={getProfilePicUrl(authUser?.profilePic)} alt="Profile" className="w-full h-full object-cover" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
//                         <div className="flex items-center gap-1 text-xs opacity-70">
//                           <MailIcon className="size-3" />
//                           <span className="truncate">{authUser?.email}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2 space-y-1">
//                     <Link to="/profile" className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all" onClick={() => setProfileOpen(false)}>
//                       <Edit3Icon className="size-4" /> Edit Profile Picture
//                     </Link>
//                     <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all text-left" onClick={() => {setProfileOpen(false); setPasswordModal(true);}}>
//                       <KeyIcon className="size-4" /> Change Password
//                     </button>
//                     <button 
//                       className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-error hover:text-error-content text-sm transition-all text-left border-t border-base-300 mt-1"
//                       onClick={() => {setProfileOpen(false); setDeleteModal(true);}}
//                     >
//                       <UserMinus className="size-4" /> Delete Account
//                     </button>
//                     <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-error hover:text-error-content text-sm transition-all text-left" onClick={() => {logoutMutation(); setProfileOpen(false);}}>
//                       <LogOutIcon className="size-4" /> Sign Out
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Password Modal */}
//       {passwordModal && (
//         <div className="modal modal-open">
//           <div className="modal-box max-w-md">
//             <div className="flex items-center gap-3 mb-6">
//               <KeyIcon className="size-6 text-primary" />
//               <h3 className="font-bold text-xl">Change Password</h3>
//             </div>
            
//             <div className="space-y-4">
//               <div className="form-control">
//                 <label className="label"><span className="label-text">Current Password</span></label>
//                 <div className="relative">
//                   <input id="current-password" type={showPasswords.current ? "text" : "password"} placeholder="Enter current password" className="input input-bordered w-full pr-12" />
//                   <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPasswords(prev => ({...prev, current: !prev.current}))}>
//                     {showPasswords.current ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-control">
//                 <label className="label"><span className="label-text">New Password</span></label>
//                 <div className="relative">
//                   <input id="new-password" type={showPasswords.new ? "text" : "password"} placeholder="New password (min 6 chars)" className="input input-bordered w-full pr-12" />
//                   <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPasswords(prev => ({...prev, new: !prev.new}))}>
//                     {showPasswords.new ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-control">
//                 <label className="label"><span className="label-text">Confirm New Password</span></label>
//                 <div className="relative">
//                   <input id="confirm-password" type={showPasswords.confirm ? "text" : "password"} placeholder="Confirm new password" className="input input-bordered w-full pr-12" />
//                   <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPasswords(prev => ({...prev, confirm: !prev.confirm}))}>
//                     {showPasswords.confirm ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="modal-action mt-8">
//               <button className="btn btn-ghost" onClick={closePasswordModal}>Cancel</button>
//               <button className="btn btn-primary" onClick={handlePasswordChange}>Update Password</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Account Modal */}
//       {deleteModal && (
//         <div className="modal modal-open">
//           <div className="modal-box max-w-md">
//             <div className="flex items-center gap-3 mb-6">
//               <AlertTriangle className="size-6 text-error" />
//               <h3 className="font-bold text-xl text-error">Delete Account</h3>
//             </div>
            
//             <div className="alert alert-warning shadow-lg mb-6">
//               <span>This action cannot be undone! All your data will be permanently deleted.</span>
//             </div>

//             <div className="space-y-4">
//               <p className="text-sm opacity-80">
//                 Type <strong>"DELETE MY ACCOUNT"</strong> below to confirm:
//               </p>
//               <input
//                 id="delete-confirm"
//                 type="text"
//                 value={deleteConfirm}
//                 onChange={(e) => setDeleteConfirm(e.target.value)}
//                 className="input input-bordered w-full"
//                 placeholder="DELETE MY ACCOUNT"
//               />
//             </div>

//             <div className="modal-action mt-8">
//               <button className="btn btn-ghost" onClick={closeDeleteModal}>Cancel</button>
//               <button 
//                 className="btn btn-error"
//                 onClick={handleDeleteAccount}
//                 disabled={deleteConfirm !== "DELETE MY ACCOUNT"}
//               >
//                 Permanently Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// // 🔥 CRITICAL: THIS WAS MISSING!
// export default Navbar;







// import { Link, useLocation } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { BellIcon, LogOutIcon, ShipWheelIcon, ChevronDownIcon, Edit3Icon, KeyIcon, MailIcon, Eye, EyeOff, UserMinus, AlertTriangle } from "lucide-react";
// import ThemeSelector from "./ThemeSelector";
// import useLogout from "../hooks/useLogout";
// import { toast } from "react-hot-toast";
// import { changePassword, deleteAccount, updateBio } from "../lib/api";  // 🆕 Added updateBio
// import { getProfilePicUrl } from "../utils/profilePic";
// import { useState, useRef, useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";  // 🆕 Added

// const Navbar = () => {
//   const { authUser } = useAuthUser();
//   const location = useLocation();
//   const isChatPage = location.pathname?.startsWith("/chat");
//   const { logoutMutation } = useLogout();
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [passwordModal, setPasswordModal] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [bioModal, setBioModal] = useState(false);  // 🆕 NEW
//   const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
//   const [deleteConfirm, setDeleteConfirm] = useState("");
//   const [currentBio, setCurrentBio] = useState("");  // 🆕 NEW
//   const [newBio, setNewBio] = useState("");  // 🆕 NEW
//   const profileRef = useRef(null);

//   // 🆕 NEW: Bio update mutation
//   const updateBioMutation = useMutation({
//     mutationFn: updateBio,
//     onSuccess: () => {
//       toast.success("Bio updated successfully!");
//       setBioModal(false);
//       setNewBio("");
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || "Failed to update bio");
//     },
//   });

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // 🆕 NEW: Load current bio when modal opens
//   useEffect(() => {
//     if (bioModal && authUser?.bio) {
//       setCurrentBio(authUser.bio);
//       setNewBio(authUser.bio);
//     }
//   }, [bioModal, authUser?.bio]);

//   const handlePasswordChange = async () => {
//     const currentPasswordInput = document.getElementById('current-password');
//     const newPasswordInput = document.getElementById('new-password');
//     const confirmPasswordInput = document.getElementById('confirm-password');

//     const currentPassword = currentPasswordInput?.value || '';
//     const newPassword = newPasswordInput?.value || '';
//     const confirmPassword = confirmPasswordInput?.value || '';

//     if (!currentPassword || !newPassword || !confirmPassword) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     if (newPassword.length < 6) {
//       toast.error("New password must be at least 6 characters");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("New passwords do not match");
//       return;
//     }

//     try {
//       await changePassword({ currentPassword, newPassword });
//       toast.success("Password changed successfully!");
//       setPasswordModal(false);
//       if (currentPasswordInput) currentPasswordInput.value = '';
//       if (newPasswordInput) newPasswordInput.value = '';
//       if (confirmPasswordInput) confirmPasswordInput.value = '';
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to change password");
//     }
//   };

//   const closePasswordModal = () => {
//     setPasswordModal(false);
//     const currentPasswordInput = document.getElementById('current-password');
//     const newPasswordInput = document.getElementById('new-password');
//     const confirmPasswordInput = document.getElementById('confirm-password');
//     if (currentPasswordInput) currentPasswordInput.value = '';
//     if (newPasswordInput) newPasswordInput.value = '';
//     if (confirmPasswordInput) confirmPasswordInput.value = '';
//   };

//   // 🆕 NEW: Bio handlers
//   const handleBioUpdate = () => {
//     if (!newBio.trim()) {
//       toast.error("Bio cannot be empty");
//       return;
//     }
    
//     updateBioMutation.mutate({ bio: newBio.trim() });
//   };

//   const closeBioModal = () => {
//     setBioModal(false);
//     setNewBio("");
//     setCurrentBio("");
//   };

//   const handleDeleteAccount = async () => {
//     if (deleteConfirm !== "DELETE MY ACCOUNT") {
//       toast.error("Please type 'DELETE MY ACCOUNT' to confirm");
//       return;
//     }

//     try {
//       await deleteAccount();
//       toast.success("Account deleted successfully. Goodbye!");
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 2000);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete account");
//     }
//   };

//   const closeDeleteModal = () => {
//     setDeleteModal(false);
//     setDeleteConfirm("");
//   };

//   return (
//     <>
//       <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-end w-full">
//             {isChatPage && (
//               <div className="pl-5">
//                 <Link to="/" className="flex items-center gap-2.5">
//                   <ShipWheelIcon className="size-9 text-primary" />
//                   <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
//                     Streamify
//                   </span>
//                 </Link>
//               </div>
//             )}

//             <div className="flex items-center gap-3 sm:gap-4 ml-auto">
//               <Link to="/notifications">
//                 <button className="btn btn-ghost btn-circle">
//                   <BellIcon className="h-6 w-6 text-base-content opacity-70" />
//                 </button>
//               </Link>
//             </div>

//             <ThemeSelector />

//             <div className="relative" ref={profileRef}>
//               <button 
//                 className="avatar btn btn-ghost btn-circle relative p-0" 
//                 onClick={() => setProfileOpen(!profileOpen)}
//               >
//                 <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-200 ring-offset-1 overflow-hidden">
//                   <img 
//                     src={getProfilePicUrl(authUser?.profilePic)} 
//                     alt="User Avatar" 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <ChevronDownIcon className={`h-4 w-4 absolute -top-1 -right-1 bg-base-200 p-0.5 rounded-full transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-2 w-72 bg-base-100 border border-base-300 rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
//                   <div className="p-4 border-b border-base-300">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-full ring ring-primary overflow-hidden">
//                         <img src={getProfilePicUrl(authUser?.profilePic)} alt="Profile" className="w-full h-full object-cover" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
//                         <div className="flex items-center gap-1 text-xs opacity-70">
//                           <MailIcon className="size-3" />
//                           <span className="truncate">{authUser?.email}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2 space-y-1">
//                     <Link to="/profile" className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all" onClick={() => setProfileOpen(false)}>
//                       <Edit3Icon className="size-4" /> Edit Profile Picture
//                     </Link>
                    
//                     {/* 🆕 NEW: Edit Bio */}
//                     <button 
//                       className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all text-left" 
//                       onClick={() => {setProfileOpen(false); setBioModal(true);}}
//                     >
//                       <Edit3Icon className="size-4" /> Edit Bio
//                     </button>
                    
//                     <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all text-left" onClick={() => {setProfileOpen(false); setPasswordModal(true);}}>
//                       <KeyIcon className="size-4" /> Change Password
//                     </button>
//                     <button 
//                       className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-error hover:text-error-content text-sm transition-all text-left border-t border-base-300 mt-1"
//                       onClick={() => {setProfileOpen(false); setDeleteModal(true);}}
//                     >
//                       <UserMinus className="size-4" /> Delete Account
//                     </button>
//                     <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-error hover:text-error-content text-sm transition-all text-left" onClick={() => {logoutMutation(); setProfileOpen(false);}}>
//                       <LogOutIcon className="size-4" /> Sign Out
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Password Modal */}
//       {passwordModal && (
//         <div className="modal modal-open">
//           <div className="modal-box max-w-md">
//             <div className="flex items-center gap-3 mb-6">
//               <KeyIcon className="size-6 text-primary" />
//               <h3 className="font-bold text-xl">Change Password</h3>
//             </div>
            
//             <div className="space-y-4">
//               <div className="form-control">
//                 <label className="label"><span className="label-text">Current Password</span></label>
//                 <div className="relative">
//                   <input id="current-password" type={showPasswords.current ? "text" : "password"} placeholder="Enter current password" className="input input-bordered w-full pr-12" />
//                   <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPasswords(prev => ({...prev, current: !prev.current}))}>
//                     {showPasswords.current ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-control">
//                 <label className="label"><span className="label-text">New Password</span></label>
//                 <div className="relative">
//                   <input id="new-password" type={showPasswords.new ? "text" : "password"} placeholder="New password (min 6 chars)" className="input input-bordered w-full pr-12" />
//                   <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPasswords(prev => ({...prev, new: !prev.new}))}>
//                     {showPasswords.new ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-control">
//                 <label className="label"><span className="label-text">Confirm New Password</span></label>
//                 <div className="relative">
//                   <input id="confirm-password" type={showPasswords.confirm ? "text" : "password"} placeholder="Confirm new password" className="input input-bordered w-full pr-12" />
//                   <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPasswords(prev => ({...prev, confirm: !prev.confirm}))}>
//                     {showPasswords.confirm ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="modal-action mt-8">
//               <button className="btn btn-ghost" onClick={closePasswordModal}>Cancel</button>
//               <button className="btn btn-primary" onClick={handlePasswordChange}>Update Password</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🆕 NEW: Bio Edit Modal */}
//       {bioModal && (
//         <div className="modal modal-open">
//           <div className="modal-box max-w-md">
//             <div className="flex items-center gap-3 mb-6">
//               <Edit3Icon className="size-6 text-primary" />
//               <h3 className="font-bold text-xl">Edit Bio</h3>
//             </div>
            
//             <div className="space-y-4">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Current Bio</span>
//                 </label>
//                 <textarea 
//                   className="textarea textarea-bordered w-full h-24" 
//                   value={currentBio} 
//                   readOnly 
//                   placeholder="No bio set"
//                 />
//               </div>
              
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">New Bio</span>
//                 </label>
//                 <textarea 
//                   className="textarea textarea-bordered w-full h-32" 
//                   value={newBio}
//                   onChange={(e) => setNewBio(e.target.value)}
//                   placeholder="Tell others about yourself and what you're looking for in a language partner..."
//                   maxLength={500}
//                 />
//                 <label className="label">
//                   <span className="label-text-alt">
//                     {newBio.length}/500 characters
//                   </span>
//                 </label>
//               </div>
//             </div>

//             <div className="modal-action mt-8">
//               <button className="btn btn-ghost" onClick={closeBioModal}>Cancel</button>
//               <button 
//                 className="btn btn-primary" 
//                 onClick={handleBioUpdate}
//                 disabled={updateBioMutation.isPending || newBio.trim() === currentBio}
//               >
//                 {updateBioMutation.isPending ? (
//                   <>
//                     <span className="loading loading-spinner"></span>
//                     Saving...
//                   </>
//                 ) : (
//                   "Update Bio"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Account Modal */}
//       {deleteModal && (
//         <div className="modal modal-open">
//           <div className="modal-box max-w-md">
//             <div className="flex items-center gap-3 mb-6">
//               <AlertTriangle className="size-6 text-error" />
//               <h3 className="font-bold text-xl text-error">Delete Account</h3>
//             </div>
            
//             <div className="alert alert-warning shadow-lg mb-6">
//               <span>This action cannot be undone! All your data will be permanently deleted.</span>
//             </div>

//             <div className="space-y-4">
//               <p className="text-sm opacity-80">
//                 Type <strong>"DELETE MY ACCOUNT"</strong> below to confirm:
//               </p>
//               <input
//                 id="delete-confirm"
//                 type="text"
//                 value={deleteConfirm}
//                 onChange={(e) => setDeleteConfirm(e.target.value)}
//                 className="input input-bordered w-full"
//                 placeholder="DELETE MY ACCOUNT"
//               />
//             </div>

//             <div className="modal-action mt-8">
//               <button className="btn btn-ghost" onClick={closeDeleteModal}>Cancel</button>
//               <button 
//                 className="btn btn-error"
//                 onClick={handleDeleteAccount}
//                 disabled={deleteConfirm !== "DELETE MY ACCOUNT"}
//               >
//                 Permanently Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;






// import { Link, useLocation } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { 
//   BellIcon, 
//   LogOutIcon, 
//   ShipWheelIcon, 
//   ChevronDownIcon, 
//   Edit3Icon, 
//   KeyIcon, 
//   MailIcon, 
//   Eye, 
//   EyeOff, 
//   UserMinus, 
//   AlertTriangle 
// } from "lucide-react";
// import ThemeSelector from "./ThemeSelector";
// import useLogout from "../hooks/useLogout";
// import { toast } from "react-hot-toast";
// import { changePassword, deleteAccount, updateBio } from "../lib/api";
// import { getProfilePicUrl } from "../utils/profilePic";
// import { useState, useRef, useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";

// const Navbar = () => {
//   const { authUser } = useAuthUser();
//   const location = useLocation();
//   const isChatPage = location.pathname?.startsWith("/chat");
//   const { logoutMutation } = useLogout();
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [passwordModal, setPasswordModal] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [bioModal, setBioModal] = useState(false);
//   const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
//   const [deleteConfirm, setDeleteConfirm] = useState("");
//   const [currentBio, setCurrentBio] = useState("");
//   const [newBio, setNewBio] = useState("");
//   const profileRef = useRef(null);

//   // Bio update mutation
//   const updateBioMutation = useMutation({
//     mutationFn: updateBio,
//     onSuccess: () => {
//       toast.success("Bio updated successfully!");
//       setBioModal(false);
//       setNewBio("");
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || "Failed to update bio");
//     },
//   });

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Load current bio when modal opens
//   useEffect(() => {
//     if (bioModal && authUser?.bio) {
//       setCurrentBio(authUser.bio);
//       setNewBio(authUser.bio);
//     }
//   }, [bioModal, authUser?.bio]);

//   const handlePasswordChange = async () => {
//     const currentPasswordInput = document.getElementById('current-password');
//     const newPasswordInput = document.getElementById('new-password');
//     const confirmPasswordInput = document.getElementById('confirm-password');

//     const currentPassword = currentPasswordInput?.value || '';
//     const newPassword = newPasswordInput?.value || '';
//     const confirmPassword = confirmPasswordInput?.value || '';

//     if (!currentPassword || !newPassword || !confirmPassword) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     if (newPassword.length < 6) {
//       toast.error("New password must be at least 6 characters");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("New passwords do not match");
//       return;
//     }

//     try {
//       await changePassword({ currentPassword, newPassword });
//       toast.success("Password changed successfully!");
//       setPasswordModal(false);
//       if (currentPasswordInput) currentPasswordInput.value = '';
//       if (newPasswordInput) newPasswordInput.value = '';
//       if (confirmPasswordInput) confirmPasswordInput.value = '';
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to change password");
//     }
//   };

//   const closePasswordModal = () => {
//     setPasswordModal(false);
//     const currentPasswordInput = document.getElementById('current-password');
//     const newPasswordInput = document.getElementById('new-password');
//     const confirmPasswordInput = document.getElementById('confirm-password');
//     if (currentPasswordInput) currentPasswordInput.value = '';
//     if (newPasswordInput) newPasswordInput.value = '';
//     if (confirmPasswordInput) confirmPasswordInput.value = '';
//   };

//   const handleBioUpdate = () => {
//     if (!newBio.trim()) {
//       toast.error("Bio cannot be empty");
//       return;
//     }
//     updateBioMutation.mutate({ bio: newBio.trim() });
//   };

//   const closeBioModal = () => {
//     setBioModal(false);
//     setNewBio("");
//     setCurrentBio("");
//   };

//   const handleDeleteAccount = async () => {
//     if (deleteConfirm !== "DELETE MY ACCOUNT") {
//       toast.error("Please type 'DELETE MY ACCOUNT' to confirm");
//       return;
//     }

//     try {
//       await deleteAccount();
//       toast.success("Account deleted successfully. Goodbye!");
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 2000);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete account");
//     }
//   };

//   const closeDeleteModal = () => {
//     setDeleteModal(false);
//     setDeleteConfirm("");
//   };

//   return (
//     <>
//       <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-end w-full">
//             {isChatPage && (
//               <div className="pl-5">
//                 <Link to="/" className="flex items-center gap-2.5">
//                   <ShipWheelIcon className="size-9 text-primary" />
//                   <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
//                     Streamify
//                   </span>
//                 </Link>
//               </div>
//             )}

//             <div className="flex items-center gap-3 sm:gap-4 ml-auto">
//               <Link to="/notifications">
//                 <button className="btn btn-ghost btn-circle">
//                   <BellIcon className="h-6 w-6 text-base-content opacity-70" />
//                 </button>
//               </Link>
//             </div>

//             <ThemeSelector />

//             <div className="relative" ref={profileRef}>
//               <button 
//                 className="avatar btn btn-ghost btn-circle relative p-0" 
//                 onClick={() => setProfileOpen(!profileOpen)}
//               >
//                 <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-200 ring-offset-1 overflow-hidden">
//                   <img 
//                     src={getProfilePicUrl(authUser?.profilePic)} 
//                     alt="User Avatar" 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <ChevronDownIcon className={`h-4 w-4 absolute -top-1 -right-1 bg-base-200 p-0.5 rounded-full transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-2 w-72 bg-base-100 border border-base-300 rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
//                   {/* 🆕 UPDATED: Profile header with BIO after name, before email */}
//                   <div className="p-4 border-b border-base-300">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-full ring ring-primary overflow-hidden flex-shrink-0">
//                         <img src={getProfilePicUrl(authUser?.profilePic)} alt="Profile" className="w-full h-full object-cover" />
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
                        
//                         {/* 🆕 BIO - After name, before email */}
//                         {authUser?.bio && (
//                           <p className="text-xs opacity-70 truncate max-w-[180px] mt-1 leading-tight">
//                             {authUser.bio.length > 80 
//                               ? `${authUser.bio.slice(0, 80)}...` 
//                               : authUser.bio
//                             }
//                           </p>
//                         )}
                        
//                         {/* Email - After bio */}
//                         <div className="flex items-center gap-1 text-xs opacity-70 mt-1 pt-1">
//                           <MailIcon className="size-3 flex-shrink-0" />
//                           <span className="truncate flex-1">{authUser?.email}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="p-2 space-y-1">
//                     <Link to="/profile" className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all" onClick={() => setProfileOpen(false)}>
//                       <Edit3Icon className="size-4" /> Edit Profile Picture
//                     </Link>
                    
//                     <button 
//                       className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all text-left" 
//                       onClick={() => {setProfileOpen(false); setBioModal(true);}}
//                     >
//                       <Edit3Icon className="size-4" /> Edit Bio
//                     </button>
                    
//                     <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all text-left" onClick={() => {setProfileOpen(false); setPasswordModal(true);}}>
//                       <KeyIcon className="size-4" /> Change Password
//                     </button>
//                     <button 
//                       className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-error hover:text-error-content text-sm transition-all text-left border-t border-base-300 mt-1"
//                       onClick={() => {setProfileOpen(false); setDeleteModal(true);}}
//                     >
//                       <UserMinus className="size-4" /> Delete Account
//                     </button>
//                     <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-error hover:text-error-content text-sm transition-all text-left" onClick={() => {logoutMutation(); setProfileOpen(false);}}>
//                       <LogOutIcon className="size-4" /> Sign Out
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Password Modal */}
//       {passwordModal && (
//         <div className="modal modal-open">
//           <div className="modal-box max-w-md">
//             <div className="flex items-center gap-3 mb-6">
//               <KeyIcon className="size-6 text-primary" />
//               <h3 className="font-bold text-xl">Change Password</h3>
//             </div>
            
//             <div className="space-y-4">
//               <div className="form-control">
//                 <label className="label"><span className="label-text">Current Password</span></label>
//                 <div className="relative">
//                   <input id="current-password" type={showPasswords.current ? "text" : "password"} placeholder="Enter current password" className="input input-bordered w-full pr-12" />
//                   <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPasswords(prev => ({...prev, current: !prev.current}))}>
//                     {showPasswords.current ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-control">
//                 <label className="label"><span className="label-text">New Password</span></label>
//                 <div className="relative">
//                   <input id="new-password" type={showPasswords.new ? "text" : "password"} placeholder="New password (min 6 chars)" className="input input-bordered w-full pr-12" />
//                   <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPasswords(prev => ({...prev, new: !prev.new}))}>
//                     {showPasswords.new ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-control">
//                 <label className="label"><span className="label-text">Confirm New Password</span></label>
//                 <div className="relative">
//                   <input id="confirm-password" type={showPasswords.confirm ? "text" : "password"} placeholder="Confirm new password" className="input input-bordered w-full pr-12" />
//                   <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPasswords(prev => ({...prev, confirm: !prev.confirm}))}>
//                     {showPasswords.confirm ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="modal-action mt-8">
//               <button className="btn btn-ghost" onClick={closePasswordModal}>Cancel</button>
//               <button className="btn btn-primary" onClick={handlePasswordChange}>Update Password</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Bio Edit Modal */}
//       {bioModal && (
//         <div className="modal modal-open">
//           <div className="modal-box max-w-md">
//             <div className="flex items-center gap-3 mb-6">
//               <Edit3Icon className="size-6 text-primary" />
//               <h3 className="font-bold text-xl">Edit Bio</h3>
//             </div>
            
//             <div className="space-y-4">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Current Bio</span>
//                 </label>
//                 <textarea 
//                   className="textarea textarea-bordered w-full h-24" 
//                   value={currentBio} 
//                   readOnly 
//                   placeholder="No bio set"
//                 />
//               </div>
              
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">New Bio</span>
//                 </label>
//                 <textarea 
//                   className="textarea textarea-bordered w-full h-32" 
//                   value={newBio}
//                   onChange={(e) => setNewBio(e.target.value)}
//                   placeholder="Tell others about yourself and what you're looking for in a language partner..."
//                   maxLength={500}
//                 />
//                 <label className="label">
//                   <span className="label-text-alt">
//                     {newBio.length}/500 characters
//                   </span>
//                 </label>
//               </div>
//             </div>

//             <div className="modal-action mt-8">
//               <button className="btn btn-ghost" onClick={closeBioModal}>Cancel</button>
//               <button 
//                 className="btn btn-primary" 
//                 onClick={handleBioUpdate}
//                 disabled={updateBioMutation.isPending || newBio.trim() === currentBio}
//               >
//                 {updateBioMutation.isPending ? (
//                   <>
//                     <span className="loading loading-spinner"></span>
//                     Saving...
//                   </>
//                 ) : (
//                   "Update Bio"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Account Modal */}
//       {deleteModal && (
//         <div className="modal modal-open">
//           <div className="modal-box max-w-md">
//             <div className="flex items-center gap-3 mb-6">
//               <AlertTriangle className="size-6 text-error" />
//               <h3 className="font-bold text-xl text-error">Delete Account</h3>
//             </div>
            
//             <div className="alert alert-warning shadow-lg mb-6">
//               <span>This action cannot be undone! All your data will be permanently deleted.</span>
//             </div>

//             <div className="space-y-4">
//               <p className="text-sm opacity-80">
//                 Type <strong>"DELETE MY ACCOUNT"</strong> below to confirm:
//               </p>
//               <input
//                 id="delete-confirm"
//                 type="text"
//                 value={deleteConfirm}
//                 onChange={(e) => setDeleteConfirm(e.target.value)}
//                 className="input input-bordered w-full"
//                 placeholder="DELETE MY ACCOUNT"
//               />
//             </div>

//             <div className="modal-action mt-8">
//               <button className="btn btn-ghost" onClick={closeDeleteModal}>Cancel</button>
//               <button 
//                 className="btn btn-error"
//                 onClick={handleDeleteAccount}
//                 disabled={deleteConfirm !== "DELETE MY ACCOUNT"}
//               >
//                 Permanently Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;





import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { 
  BellIcon, 
  LogOutIcon, 
  ShipWheelIcon, 
  ChevronDownIcon, 
  Edit3Icon, 
  KeyIcon, 
  MailIcon, 
  Eye, 
  EyeOff, 
  UserMinus, 
  AlertTriangle 
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { toast } from "react-hot-toast";
import { changePassword, deleteAccount, updateBio, updateName } from "../lib/api";
import { getProfilePicUrl } from "../utils/profilePic";
import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();
  
  // Name editing states
  const [nameModal, setNameModal] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [newName, setNewName] = useState("");
  
  // Bio editing states
  const [bioModal, setBioModal] = useState(false);
  const [currentBio, setCurrentBio] = useState("");
  const [newBio, setNewBio] = useState("");
  
  // Other states
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const profileRef = useRef(null);

  // Name update mutation
  const updateNameMutation = useMutation({
    mutationFn: updateName,
    onSuccess: () => {
      toast.success("Name updated successfully!");
      setNameModal(false);
      setNewName("");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update name");
    },
  });

  // Bio update mutation
  const updateBioMutation = useMutation({
    mutationFn: updateBio,
    onSuccess: () => {
      toast.success("Bio updated successfully!");
      setBioModal(false);
      setNewBio("");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update bio");
    },
  });

  // Load current name when name modal opens
  useEffect(() => {
    if (nameModal && authUser?.fullName) {
      setCurrentName(authUser.fullName);
      setNewName(authUser.fullName);
    }
  }, [nameModal, authUser?.fullName]);

  // Load current bio when bio modal opens
  useEffect(() => {
    if (bioModal && authUser?.bio) {
      setCurrentBio(authUser.bio);
      setNewBio(authUser.bio);
    }
  }, [bioModal, authUser?.bio]);

  // Close modals and reset states
  const closeNameModal = () => {
    setNameModal(false);
    setNewName("");
    setCurrentName("");
  };

  const closeBioModal = () => {
    setBioModal(false);
    setNewBio("");
    setCurrentBio("");
  };

  const closePasswordModal = () => {
    setPasswordModal(false);
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    if (currentPasswordInput) currentPasswordInput.value = '';
    if (newPasswordInput) newPasswordInput.value = '';
    if (confirmPasswordInput) confirmPasswordInput.value = '';
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDeleteConfirm("");
  };

  // Handlers
  const handleNameUpdate = () => {
    if (!newName.trim() || newName.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }
    if (newName.trim().length > 50) {
      toast.error("Name must be less than 50 characters");
      return;
    }
    if (newName.trim() === currentName) {
      toast.error("Please enter a different name");
      return;
    }
    updateNameMutation.mutate({ fullName: newName.trim() });
  };

  const handleBioUpdate = () => {
    if (!newBio.trim()) {
      toast.error("Bio cannot be empty");
      return;
    }
    updateBioMutation.mutate({ bio: newBio.trim() });
  };

  const handlePasswordChange = async () => {
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    const currentPassword = currentPasswordInput?.value || '';
    const newPassword = newPasswordInput?.value || '';
    const confirmPassword = confirmPasswordInput?.value || '';

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      toast.success("Password changed successfully!");
      setPasswordModal(false);
      if (currentPasswordInput) currentPasswordInput.value = '';
      if (newPasswordInput) newPasswordInput.value = '';
      if (confirmPasswordInput) confirmPasswordInput.value = '';
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE MY ACCOUNT") {
      toast.error("Please type 'DELETE MY ACCOUNT' to confirm");
      return;
    }

    try {
      await deleteAccount();
      toast.success("Account deleted successfully. Goodbye!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end w-full">
            {isChatPage && (
              <div className="pl-5">
                <Link to="/" className="flex items-center gap-2.5">
                  <ShipWheelIcon className="size-9 text-primary" />
                  <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                    Streamify
                  </span>
                </Link>
              </div>
            )}

            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              <Link to="/notifications">
                <button className="btn btn-ghost btn-circle">
                  <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                </button>
              </Link>
            </div>

            <ThemeSelector />

            <div className="relative" ref={profileRef}>
              <button 
                className="avatar btn btn-ghost btn-circle relative p-0" 
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-200 ring-offset-1 overflow-hidden">
                  <img 
                    src={getProfilePicUrl(authUser?.profilePic)} 
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDownIcon className={`h-4 w-4 absolute -top-1 -right-1 bg-base-200 p-0.5 rounded-full transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-base-100 border border-base-300 rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-base-300">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full ring ring-primary overflow-hidden flex-shrink-0">
                        <img src={getProfilePicUrl(authUser?.profilePic)} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
                        
                        {authUser?.bio && (
                          <p className="text-xs opacity-70 truncate max-w-[180px] mt-1 leading-tight">
                            {authUser.bio.length > 80 
                              ? `${authUser.bio.slice(0, 80)}...` 
                              : authUser.bio
                            }
                          </p>
                        )}
                        
                        <div className="flex items-center gap-1 text-xs opacity-70 mt-1 pt-1">
                          <MailIcon className="size-3 flex-shrink-0" />
                          <span className="truncate flex-1">{authUser?.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2 space-y-1">
                    <button 
                      className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all text-left" 
                      onClick={() => {setProfileOpen(false); setNameModal(true);}}
                    >
                      <Edit3Icon className="size-4" /> Edit Name
                    </button>
                    
                    <Link to="/profile" className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all" onClick={() => setProfileOpen(false)}>
                      <Edit3Icon className="size-4" /> Edit Profile Picture
                    </Link>
                    
                    <button 
                      className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all text-left" 
                      onClick={() => {setProfileOpen(false); setBioModal(true);}}
                    >
                      <Edit3Icon className="size-4" /> Edit Bio
                    </button>
                    
                    <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-base-200 text-sm transition-all text-left" onClick={() => {setProfileOpen(false); setPasswordModal(true);}}>
                      <KeyIcon className="size-4" /> Change Password
                    </button>
                    
                    <button 
                      className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-error hover:text-error-content text-sm transition-all text-left border-t border-base-300 mt-1"
                      onClick={() => {setProfileOpen(false); setDeleteModal(true);}}
                    >
                      <UserMinus className="size-4" /> Delete Account
                    </button>
                    
                    <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-error hover:text-error-content text-sm transition-all text-left" onClick={() => {logoutMutation(); setProfileOpen(false);}}>
                      <LogOutIcon className="size-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Name Edit Modal */}
      {nameModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <Edit3Icon className="size-6 text-primary" />
              <h3 className="font-bold text-xl">Edit Name</h3>
            </div>
            
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Current Name</span>
                </label>
                <input 
                  className="input input-bordered w-full" 
                  value={currentName} 
                  readOnly 
                  placeholder="No name set"
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Name</span>
                </label>
                <input 
                  className="input input-bordered w-full" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter your full name"
                  maxLength={50}
                />
                <label className="label">
                  <span className="label-text-alt">
                    {newName.length}/50 characters
                  </span>
                </label>
              </div>
            </div>

            <div className="modal-action mt-8">
              <button className="btn btn-ghost" onClick={closeNameModal}>Cancel</button>
              <button 
                className="btn btn-primary" 
                onClick={handleNameUpdate}
                disabled={updateNameMutation.isPending || newName.trim() === currentName}
              >
                {updateNameMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Saving...
                  </>
                ) : (
                  "Update Name"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bio Edit Modal */}
      {bioModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <Edit3Icon className="size-6 text-primary" />
              <h3 className="font-bold text-xl">Edit Bio</h3>
            </div>
            
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Current Bio</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered w-full h-24" 
                  value={currentBio} 
                  readOnly 
                  placeholder="No bio set"
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Bio</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered w-full h-32" 
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  placeholder="Tell others about yourself and what you're looking for in a language partner..."
                  maxLength={500}
                />
                <label className="label">
                  <span className="label-text-alt">
                    {newBio.length}/500 characters
                  </span>
                </label>
              </div>
            </div>

            <div className="modal-action mt-8">
              <button className="btn btn-ghost" onClick={closeBioModal}>Cancel</button>
              <button 
                className="btn btn-primary" 
                onClick={handleBioUpdate}
                disabled={updateBioMutation.isPending || newBio.trim() === currentBio}
              >
                {updateBioMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Saving...
                  </>
                ) : (
                  "Update Bio"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {passwordModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <KeyIcon className="size-6 text-primary" />
              <h3 className="font-bold text-xl">Change Password</h3>
            </div>
            
            <div className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Current Password</span></label>
                <div className="relative">
                  <input id="current-password" type={showPasswords.current ? "text" : "password"} placeholder="Enter current password" className="input input-bordered w-full pr-12" />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPasswords(prev => ({...prev, current: !prev.current}))}>
                    {showPasswords.current ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">New Password</span></label>
                <div className="relative">
                  <input id="new-password" type={showPasswords.new ? "text" : "password"} placeholder="New password (min 6 chars)" className="input input-bordered w-full pr-12" />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPasswords(prev => ({...prev, new: !prev.new}))}>
                    {showPasswords.new ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Confirm New Password</span></label>
                <div className="relative">
                  <input id="confirm-password" type={showPasswords.confirm ? "text" : "password"} placeholder="Confirm new password" className="input input-bordered w-full pr-12" />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPasswords(prev => ({...prev, confirm: !prev.confirm}))}>
                    {showPasswords.confirm ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-action mt-8">
              <button className="btn btn-ghost" onClick={closePasswordModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handlePasswordChange}>Update Password</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {deleteModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="size-6 text-error" />
              <h3 className="font-bold text-xl text-error">Delete Account</h3>
            </div>
            
            <div className="alert alert-warning shadow-lg mb-6">
              <span>This action cannot be undone! All your data will be permanently deleted.</span>
            </div>

            <div className="space-y-4">
              <p className="text-sm opacity-80">
                Type <strong>"DELETE MY ACCOUNT"</strong> below to confirm:
              </p>
              <input
                id="delete-confirm"
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                className="input input-bordered w-full"
                placeholder="DELETE MY ACCOUNT"
              />
            </div>

            <div className="modal-action mt-8">
              <button className="btn btn-ghost" onClick={closeDeleteModal}>Cancel</button>
              <button 
                className="btn btn-error"
                onClick={handleDeleteAccount}
                disabled={deleteConfirm !== "DELETE MY ACCOUNT"}
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
