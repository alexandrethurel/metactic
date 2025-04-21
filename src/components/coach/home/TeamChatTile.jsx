"use client";

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";

const API_KEY = "b86x3fzrbzhd";
const DEV_TOKEN =
  "aj7hknp7b3cndbw46pw48dcyea9nmzbrrkyy9jw47tybq8vabad4zm734snmn8cj";

export default function TeamChatTile() {
    const [chatClient, setChatClient] = useState(null);
    const [channel, setChannel] = useState(null);
  
    useEffect(() => {
      const client = StreamChat.getInstance(API_KEY);
  
      async function init() {
        await client.connectUser(
          {
            id: "coach",
            name: "Coach Principal",
            image: "/logo-metactic.png",
          },
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY29hY2gifQ.NNTsU6jyJlvoDjHI49T30QFyUyTQihMrCFJi1TgUeNc"
      );

      const channel = client.channel("messaging", "team-chat", {
        name: "Messages d'équipe",
        members: ["coach", "membre1"],
      });

      await channel.watch();
      setChatClient(client);
      setChannel(channel);
    }

    init();

    return () => {
      if (chatClient) chatClient.disconnectUser();
    };
  }, []);

  if (!chatClient || !channel) return <p className="text-sm">Connexion au chat...</p>;

  return (
    <div className="bg-white rounded-lg shadow p-5 col-span-1 md:col-span-2 flex flex-col"
         style={{ minHeight: "h-[90%]" }}  // ← adapte ici si besoin
    >
      <h2 className="text-xl font-semibold mb-4">💬 Messagerie d'équipe</h2>
  
      <Chat client={chatClient} theme="messaging light">
        <Channel channel={channel}>
          <Window>
            <div className="flex-1 overflow-y-auto max-h-[360px]"> {/* scroll si long */}
              <MessageList />
            </div>
            <MessageInput />
          </Window>
        </Channel>
      </Chat>
    </div>
  );
}