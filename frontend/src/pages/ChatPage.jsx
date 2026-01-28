// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { useQuery } from "@tanstack/react-query";
// import { getStreamToken } from "../lib/api";

// import {
//   Channel,
//   ChannelHeader,
//   Chat,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
// } from "stream-chat-react";
// import { StreamChat } from "stream-chat";
// import toast from "react-hot-toast";

// import ChatLoader from "../components/ChatLoader";
// import CallButton from "../components/CallButton";

// const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// const ChatPage = () => {
//   const { id: targetUserId } = useParams();

//   const [chatClient, setChatClient] = useState(null);
//   const [channel, setChannel] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const { authUser } = useAuthUser();

//   const { data: tokenData } = useQuery({
//     queryKey: ["streamToken"],
//     queryFn: getStreamToken,
//     enabled: !!authUser, // this will run only when authUser is available
//   });

//   useEffect(() => {
//     const initChat = async () => {
//       if (!tokenData?.token || !authUser) return;

//       try {
//         console.log("Initializing stream chat client...");

//         const client = StreamChat.getInstance(STREAM_API_KEY);

//         await client.connectUser(
//           {
//             id: authUser._id,
//             name: authUser.fullName,
//             image: authUser.profilePic,
//           },
//           tokenData.token
//         );

//         //
//         const channelId = [authUser._id, targetUserId].sort().join("-");

//         // you and me
//         // if i start the chat => channelId: [myId, yourId]
//         // if you start the chat => channelId: [yourId, myId]  => [myId,yourId]

//         const currChannel = client.channel("messaging", channelId, {
//           members: [authUser._id, targetUserId],
//         });

//         await currChannel.watch();

//         setChatClient(client);
//         setChannel(currChannel);
//       } catch (error) {
//         console.error("Error initializing chat:", error);
//         toast.error("Could not connect to chat. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     initChat();
//   }, [tokenData, authUser, targetUserId]);

//   const handleVideoCall = () => {
//     if (channel) {
//       const callUrl = `${window.location.origin}/call/${channel.id}`;

//       channel.sendMessage({
//         text: `I've started a video call. Join me here: ${callUrl}`,
//       });

//       toast.success("Video call link sent successfully!");
//     }
//   };

//   if (loading || !chatClient || !channel) return <ChatLoader />;

//   return (
//     <div className="h-[93vh]">
//       <Chat client={chatClient}>
//         <Channel channel={channel}>
//           <div className="w-full relative">
//             <CallButton handleVideoCall={handleVideoCall} />
//             <Window>
//               <ChannelHeader />
//               <MessageList />
//               <MessageInput focus />
//             </Window>
//           </div>
//           <Thread />
//         </Channel>
//       </Chat>
//     </div>
//   );
// };
// export default ChatPage;











import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Moon, Sun } from "lucide-react";

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";

import useAuthUser from "../hooks/useAuthUser";
import { getStreamToken } from "../lib/api";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const { authUser } = useAuthUser();

  /* 🔹 CHAT-PAGE-ONLY THEME STATE */
  const [chatTheme, setChatTheme] = useState("light");

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  const toggleChatTheme = () => {
    setChatTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const initChat = async () => {
      if (!authUser || !tokenData?.token) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image:
              authUser.profilePic ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${authUser.fullName}`,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Chat init error:", error);
        toast.error("Could not connect to chat");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      chatClient?.disconnectUser();
    };
  }, [authUser, tokenData, targetUserId]);

  const handleVideoCall = () => {
    if (!channel) return;

    const callUrl = `${window.location.origin}/call/${channel.id}`;
    channel.sendMessage({
      text: `📞 I've started a video call. Join here: ${callUrl}`,
    });

    toast.success("Video call link sent!");
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    /* 🔥 CHAT-PAGE-ONLY THEME APPLIED HERE */
    <div
      className="h-[93vh] relative"
      data-theme={chatTheme}
      style={{
        backgroundColor: chatTheme === "dark" ? "#020617" : "#ffffff",
      }}
    >
      <Chat
        client={chatClient}
        theme={
          chatTheme === "dark"
            ? "str-chat__theme-dark"
            : "str-chat__theme-light"
        }
      >
        <Channel channel={channel}>
          <div className="relative h-full w-full">
            {/* THEME TOGGLE */}
            <button
              onClick={toggleChatTheme}
              className="absolute right-20 top-3 z-50 rounded-full p-2
                         bg-base-200 text-base-content hover:bg-base-300 transition"
              title="Toggle chat theme"
            >
              {chatTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <CallButton handleVideoCall={handleVideoCall} />

            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>

          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
