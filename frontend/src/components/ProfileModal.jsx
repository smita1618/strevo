// src/components/ProfileModal.jsx
import { useEffect, useRef } from "react";
import { XIcon } from "lucide-react";
import { getProfilePicUrl } from "../utils/profilePic";
import { Link } from "react-router";

const ProfileModal = ({ user, isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  if (!isOpen || !user) return null;

  const isOwnProfile = user._id === "me"; // You can replace with actual check

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-200 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl border border-base-300 animate-in slide-in-from-top-4 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-base-300 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{user.fullName || "Profile"}</h2>
          <button 
            onClick={onClose}
            className="btn btn-ghost btn-circle p-1 hover:bg-base-300"
            aria-label="Close"
          >
            <XIcon className="size-6" />
          </button>
        </div>

        {/* Large Profile Image */}
        <div className="p-8 text-center">
          <div className="relative mx-auto mb-8">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden ring-8 ring-primary/30 shadow-2xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10">
              <img 
                src={getProfilePicUrl(user.profilePic)} 
                alt={`${user.fullName || "User"} profile`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-3 mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {user.fullName}
            </h3>
            
            {user.bio && (
              <div className="px-6 py-4 bg-base-100/50 rounded-2xl backdrop-blur-sm border border-base-200">
                <p className="text-base-content/80 text-lg leading-relaxed">
                  "{user.bio}"
                </p>
              </div>
            )}

            {user.location && (
              <p className="text-base-content/70 text-lg flex items-center justify-center gap-2">
                📍 {user.location}
              </p>
            )}
          </div>

          {/* Languages */}
          {(user.nativeLanguage || user.learningLanguage) && (
            <div className="px-6 pb-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {user.nativeLanguage && (
                  <div className="badge badge-lg badge-secondary px-4 py-3 shadow-lg">
                    🏠 Native
                    <br />
                    <span className="font-semibold">{user.nativeLanguage}</span>
                  </div>
                )}
                {user.learningLanguage && (
                  <div className="badge badge-lg badge-outline px-4 py-3 shadow-lg">
                    📚 Learning
                    <br />
                    <span className="font-semibold">{user.learningLanguage}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {!isOwnProfile && (
            <div className="p-6 pt-0 border-t border-base-300">
              <div className="grid grid-cols-1 gap-3">
                <Link 
                  to={`/chat/${user._id}`} 
                  className="btn btn-primary btn-lg w-full shadow-lg"
                  onClick={onClose}
                >
                  💬 Message
                </Link>
                <button className="btn btn-outline btn-error btn-lg w-full shadow-lg">
                  👋 Unfriend
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
