// import { Link } from "react-router";
// import { LANGUAGE_TO_FLAG } from "../constants";

// const FriendCard = ({ friend }) => {
//   return (
//     <div className="card bg-base-200 hover:shadow-md transition-shadow">
//       <div className="card-body p-4">
//         {/* USER INFO */}
//         <div className="flex items-center gap-3 mb-3">
//           <div className="avatar size-12">
//             <img src={friend.profilePic} alt={friend.fullName} />
//           </div>
//           <h3 className="font-semibold truncate">{friend.fullName}</h3>
//         </div>

//         <div className="flex flex-wrap gap-1.5 mb-3">
//           <span className="badge badge-secondary text-xs">
//             {getLanguageFlag(friend.nativeLanguage)}
//             Native: {friend.nativeLanguage}
//           </span>
//           <span className="badge badge-outline text-xs">
//             {getLanguageFlag(friend.learningLanguage)}
//             Learning: {friend.learningLanguage}
//           </span>
//         </div>

//         <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
//           Message
//         </Link>
//       </div>
//     </div>
//   );
// };
// export default FriendCard;

// export function getLanguageFlag(language) {
//   if (!language) return null;

//   const langLower = language.toLowerCase();
//   const countryCode = LANGUAGE_TO_FLAG[langLower];

//   if (countryCode) {
//     return (
//       <img
//         src={`https://flagcdn.com/24x18/${countryCode}.png`}
//         alt={`${langLower} flag`}
//         className="h-3 mr-1 inline-block"
//       />
//     );
//   }
//   return null;
// }


// import { Link } from "react-router";
// import { LANGUAGE_TO_FLAG } from "../constants/index.js";
// import { UserMinusIcon } from "lucide-react";

// const FriendCard = ({ friend, onUnfriend, isUnfriending = false }) => {
//   const getLanguageFlag = (language) => {
//     if (!language) return null;
//     const langLower = language.toLowerCase();
//     const countryCode = LANGUAGE_TO_FLAG[langLower];
//     if (countryCode) {
//       return (
//         <img
//           src={`https://flagcdn.com/24x18/${countryCode}.png`}
//           alt={`${langLower} flag`}
//           className="h-3 mr-1 inline-block"
//         />
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="card bg-base-200 hover:shadow-lg transition-all duration-300">
//       <div className="card-body p-4">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="avatar size-12">
//             <img src={friend.profilePic} alt={friend.fullName} />
//           </div>
//           <h3 className="font-semibold truncate">{friend.fullName}</h3>
//         </div>

//         <div className="flex flex-wrap gap-1.5 mb-4">
//           <span className="badge badge-secondary text-xs">
//             {getLanguageFlag(friend.nativeLanguage)}
//             Native: {friend.nativeLanguage}
//           </span>
//           <span className="badge badge-outline text-xs">
//             {getLanguageFlag(friend.learningLanguage)}
//             Learning: {friend.learningLanguage}
//           </span>
//         </div>

//         <div className="space-y-2">
//           <Link to={`/chat/${friend._id}`} className="btn btn-primary w-full">
//             Message
//           </Link>
//           {onUnfriend && (
//             <button
//               onClick={onUnfriend}
//               disabled={isUnfriending}
//               className="btn btn-outline btn-error w-full text-xs h-10 flex items-center gap-2"
//             >
//               {isUnfriending ? (
//                 <>
//                   <span className="loading loading-spinner loading-xs" />
//                   Unfriending...
//                 </>
//               ) : (
//                 <>
//                   <UserMinusIcon className="size-4" />
//                   Unfriend
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FriendCard;







import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants/index.js";
import { UserMinusIcon } from "lucide-react";
import { getProfilePicUrl } from "../utils/profilePic";  // 🆕 ADD THIS

const FriendCard = ({ friend, onUnfriend, isUnfriending = false }) => {
  const getLanguageFlag = (language) => {
    if (!language) return null;
    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];
    if (countryCode) {
      return (
        <img
          src={`https://flagcdn.com/24x18/${countryCode}.png`}
          alt={`${langLower} flag`}
          className="h-3 mr-1 inline-block"
        />
      );
    }
    return null;
  };

  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={getProfilePicUrl(friend.profilePic)} alt={friend.fullName} className="object-cover" />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <div className="space-y-2">
          <Link to={`/chat/${friend._id}`} className="btn btn-primary w-full">
            Message
          </Link>
          {onUnfriend && (
            <button
              onClick={onUnfriend}
              disabled={isUnfriending}
              className="btn btn-outline btn-error w-full text-xs h-10 flex items-center gap-2"
            >
              {isUnfriending ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  Unfriending...
                </>
              ) : (
                <>
                  <UserMinusIcon className="size-4" />
                  Unfriend
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
