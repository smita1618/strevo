export const getProfilePicUrl = (profilePic) => {
  if (!profilePic || profilePic === "") {
    return "https://via.placeholder.com/150/4285F4/FFFFFF?text=👤";
  }
  if (profilePic.startsWith("http")) {
    return profilePic;
  }
  return `http://localhost:5001${profilePic}`;
};
