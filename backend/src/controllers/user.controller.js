// import User from "../models/User.js";
// import FriendRequest from "../models/FriendRequest.js";



// // CONTROLLERS FOR USER ROUTES 
// export async function getRecommendedUsers(req, res) {
//   try {
//     const currentUserId = req.user.id;
//     const currentUser = req.user;


//     // find users who are not the current user and not already friends
//     const recommendedUsers = await User.find({
//       $and: [
//         { _id: { $ne: currentUserId } }, //exclude current user
//         { _id: { $nin: currentUser.friends } }, // exclude current user's friends
//         { isOnboarded: true },
//       ],
//     });
//     res.status(200).json(recommendedUsers);
//   } catch (error) {
//     console.error("Error in getRecommendedUsers controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }


// // get my friends controller 
// export async function getMyFriends(req, res) {
//   try {
//     const user = await User.findById(req.user.id)   //here we get the friends array
//       .select("friends")
//       .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

//     res.status(200).json(user.friends);
//   } catch (error) {
//     console.error("Error in getMyFriends controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// export async function sendFriendRequest(req, res) {
//   try {
//     const myId = req.user.id;
//     const { id: recipientId } = req.params;

//     // prevent sending req to yourself
//     if (myId === recipientId) {
//       return res.status(400).json({ message: "You can't send friend request to yourself" });
//     }

//     const recipient = await User.findById(recipientId);
//     if (!recipient) {
//       return res.status(404).json({ message: "Recipient not found" });
//     }

//     // check if user is already friends
//     if (recipient.friends.includes(myId)) {
//       return res.status(400).json({ message: "You are already friends with this user" });
//     }

//    // check if a pending request already exists
// const existingPending = await FriendRequest.findOne({
//   $or: [
//     { sender: myId, recipient: recipientId, status: "pending" },
//     { sender: recipientId, recipient: myId, status: "pending" },
//   ],
// });

// if (existingPending) {
//   return res
//     .status(400)
//     .json({ message: "A friend request is already pending with this user" });
// }


//     const friendRequest = await FriendRequest.create({
//       sender: myId,
//       recipient: recipientId,
//     });

//     res.status(201).json(friendRequest);
//   } catch (error) {
//     console.error("Error in sendFriendRequest controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// export async function acceptFriendRequest(req, res) {
//   try {
//     const { id: requestId } = req.params;

//     const friendRequest = await FriendRequest.findById(requestId);

//     if (!friendRequest) {
//       return res.status(404).json({ message: "Friend request not found" });
//     }

//     // Verify the current user is the recipient
//     if (friendRequest.recipient.toString() !== req.user.id) {
//       return res.status(403).json({ message: "You are not authorized to accept this request" });
//     }

//     friendRequest.status = "accepted";
//     await friendRequest.save();

//     // add each user to the other's friends array
//     // $addToSet: adds elements to an array only if they do not already exist.
//     await User.findByIdAndUpdate(friendRequest.sender, {
//       $addToSet: { friends: friendRequest.recipient },
//     });

//     await User.findByIdAndUpdate(friendRequest.recipient, {
//       $addToSet: { friends: friendRequest.sender },
//     });

//     res.status(200).json({ message: "Friend request accepted" });
//   } catch (error) {
//     console.log("Error in acceptFriendRequest controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// export async function getFriendRequests(req, res) {
//   try {
//     const incomingReqs = await FriendRequest.find({
//       recipient: req.user.id,
//       status: "pending",
//     }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

//     const acceptedReqs = await FriendRequest.find({
//       sender: req.user.id,
//       status: "accepted",
//     }).populate("recipient", "fullName profilePic");

//     res.status(200).json({ incomingReqs, acceptedReqs });
//   } catch (error) {
//     console.log("Error in getPendingFriendRequests controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// export async function getOutgoingFriendReqs(req, res) {
//   try {
//     const outgoingRequests = await FriendRequest.find({
//       sender: req.user.id,
//       status: "pending",
//     }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

//     res.status(200).json(outgoingRequests);
//   } catch (error) {
//     console.log("Error in getOutgoingFriendReqs controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }








import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

// CONTROLLERS FOR USER ROUTES 
export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    // find users who are not the current user and not already friends
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentUser.friends } }, // exclude current user's friends
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// get my friends controller 
export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)   //here we get the friends array
      .select("friends")
      .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending req to yourself
    if (myId === recipientId) {
      return res.status(400).json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // check if user is already friends
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }

   // check if a pending request already exists
const existingPending = await FriendRequest.findOne({
  $or: [
    { sender: myId, recipient: recipientId, status: "pending" },
    { sender: recipientId, recipient: myId, status: "pending" },
  ],
});

if (existingPending) {
  return res
    .status(400)
    .json({ message: "A friend request is already pending with this user" });
}

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Verify the current user is the recipient
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to the other's friends array
    // $addToSet: adds elements to an array only if they do not already exist.
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// 🆕 NEW: Update Bio Controller
export async function updateBio(req, res) {
  try {
    const { bio } = req.body;
    const userId = req.user.id;

    // Validate bio length (optional - adjust as needed)
    if (bio && bio.length > 500) {
      return res.status(400).json({ message: "Bio must be less than 500 characters" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio: bio || "" }, // Allow empty string to clear bio
      { new: true, runValidators: true }
    ).select("bio"); // Only return bio field

    res.status(200).json({ 
      message: "Bio updated successfully",
      bio: updatedUser.bio 
    });
  } catch (error) {
    console.error("Error in updateBio controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
// 🆕 ADD THIS NEW FUNCTION to your user.controller.js
export async function updateName(req, res) {
  try {
    const { fullName } = req.body;
    const userId = req.user.id;

    // Validate name
    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters" });
    }

    if (fullName.trim().length > 50) {
      return res.status(400).json({ message: "Name must be less than 50 characters" });
    }

    const cleanName = fullName.trim();

    // 🆕 UNIQUE NAME CHECK - exclude current user
    const existingUser = await User.findOne({ 
      fullName: cleanName, 
      _id: { $ne: userId } 
    });

    if (existingUser) {
      return res.status(400).json({ message: "This name is already taken by another user" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName: cleanName },
      { new: true, runValidators: true }
    ).select("fullName");

    res.status(200).json({ 
      message: "Name updated successfully",
      fullName: updatedUser.fullName 
    });
  } catch (error) {
    console.error("Error in updateName controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
