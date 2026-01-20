// // import express from "express";
// // import { protectRoute } from "../middleware/auth.middleware.js";
// // import {
// //   acceptFriendRequest,
// //   getFriendRequests,
// //   getMyFriends,
// //   getOutgoingFriendReqs,
// //   getRecommendedUsers,
// //   sendFriendRequest,
// // } from "../controllers/user.controller.js";



// // // create router
// // const router = express.Router();

// // // apply auth middleware to all routes
// // router.use(protectRoute);

// // router.get("/", getRecommendedUsers);
// // router.get("/friends", getMyFriends);

// // router.post("/friend-request/:id", sendFriendRequest);
// // router.put("/friend-request/:id/accept", acceptFriendRequest);

// // router.get("/friend-requests", getFriendRequests);
// // router.get("/outgoing-friend-requests", getOutgoingFriendReqs);



// // export default router;



// import express from "express";
// import { protectRoute } from "../middleware/auth.middleware.js";
// import User from "../models/User.js";
// import FriendRequest from "../models/FriendRequest.js";  // only once!
// import {
//   acceptFriendRequest,
//   getFriendRequests,
//   getMyFriends,
//   getOutgoingFriendReqs,
//   getRecommendedUsers,
//   sendFriendRequest,
// } from "../controllers/user.controller.js";


// // create router
// const router = express.Router();

// // apply auth middleware to all routes
// router.use(protectRoute);

// router.get("/", getRecommendedUsers);
// router.get("/friends", getMyFriends);

// router.post("/friend-request/:id", sendFriendRequest);
// router.put("/friend-request/:id/accept", acceptFriendRequest);

// router.get("/friend-requests", getFriendRequests);
// router.get("/outgoing-friend-requests", getOutgoingFriendReqs);


// router.delete("/friend/:friendId", async (req, res) => {
//   try {
//     const { friendId } = req.params;
//     const userId = req.user._id;

//     // 1️⃣ Remove from BOTH friends lists
//     await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
//     await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

//     // 2️⃣ Delete all FriendRequest documents between these users
//     await FriendRequest.deleteMany({
//       $or: [
//         { sender: userId, recipient: friendId },
//         { sender: friendId, recipient: userId }
//       ]
//     });

//     res.json({ success: true, message: "Unfriended successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to unfriend" });
//   }
// });

// export default router;











import express from "express";
import multer from "multer";
import path from "path";
import { protectRoute } from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controllers/user.controller.js";

const router = express.Router();

// 🆕 MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + `_${path.extname(file.originalname)}`);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

// 🆕 PROFILE PICTURE UPLOAD
router.put("/profile-pic", upload.single('profilePic'), async (req, res) => {
  try {
    const userId = req.user._id;
    
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: imagePath },
      { new: true }
    ).select('profilePic fullName email');

    res.json({ 
      success: true, 
      profilePic: imagePath,
      user: {
        profilePic: imagePath,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to update profile picture" });
  }
});

// 🆕 CHANGE PASSWORD - FULLY WORKING


// 🆕 FIX THIS in the change-password route:
router.put("/change-password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;
    
    // 🆕 CRITICAL: Select password field
    const user = await User.findById(userId).select('+password');
    
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }
    
    user.password = newPassword;
    await user.save();
    
    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ error: "Failed to change password" });
  }
});

// Unfriend
router.delete("/friend/:friendId", async (req, res) => {
  try {
    const { friendId } = req.params;
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

    await FriendRequest.deleteMany({
      $or: [
        { sender: userId, recipient: friendId },
        { sender: friendId, recipient: userId }
      ]
    });

    res.json({ success: true, message: "Unfriended successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to unfriend" });
  }
});

export default router;
// 🆕 ADD THIS ROUTE at the bottom:
router.delete("/delete-account", async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Delete user completely
    await User.findByIdAndDelete(userId);
    
    // Clear auth cookies (handled by frontend redirect)
    res.clearCookie('jwt');
    
    res.json({ 
      success: true, 
      message: "Account deleted permanently" 
    });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ error: "Failed to delete account" });
  }
});
