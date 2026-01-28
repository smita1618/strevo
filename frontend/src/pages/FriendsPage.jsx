// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getUserFriends, unfriendFriend } from "../lib/api.js";
// import FriendCard from "../components/FriendCard.jsx";
// import NoFriendsFound from "../components/NoFriendsFound.jsx";
// import { UsersIcon } from "lucide-react";

// const FriendsPage = () => {
//   const queryClient = useQueryClient();

//   const { data: friends = [], isLoading: loadingFriends } = useQuery({
//     queryKey: ["friends"],
//     queryFn: getUserFriends,
//   });

//   const { mutate: unfriendMutation, isPending: unfriending } = useMutation({
//     mutationFn: unfriendFriend,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["friends"] });
//     },
//   });

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto space-y-10">
//         <div className="flex items-center gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
//         </div>

//         {loadingFriends ? (
//           <div className="flex justify-center py-12">
//             <span className="loading loading-spinner loading-lg" />
//           </div>
//         ) : friends.length === 0 ? (
//           <NoFriendsFound />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {friends.map((friend) => (
//               <FriendCard 
//                 key={friend._id} 
//                 friend={friend}
//                 onUnfriend={() => unfriendMutation(friend._id)}
//                 isUnfriending={unfriending}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FriendsPage;






import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getUserFriends, unfriendFriend } from "../lib/api.js";
import FriendCard from "../components/FriendCard.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";
import { UsersIcon } from "lucide-react";

const FriendsPage = () => {
  const queryClient = useQueryClient();

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { mutate: unfriendMutation, isPending: unfriending } = useMutation({
    mutationFn: unfriendFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      toast.success("Unfriended successfully!");
    },
    onError: () => {
      toast.error("Failed to unfriend");
    },
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard 
                key={friend._id} 
                friend={friend}
                onUnfriend={() => unfriendMutation(friend._id)}
                isUnfriending={unfriending}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
