// src/contexts/ProfileContext.jsx
import { createContext, useContext, useState } from "react";
import ProfileModal from "../components/ProfileModal";

const ProfileContext = createContext();

export const useProfileModal = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileModal must be used within ProfileProvider");
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openProfile = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const closeProfile = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  return (
    <ProfileContext.Provider value={{ openProfile, closeProfile }}>
      {children}
      <ProfileModal 
        user={selectedUser} 
        isOpen={isOpen} 
        onClose={closeProfile} 
      />
    </ProfileContext.Provider>
  );
};
