import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
  getConversationById,
  getMessages,
  sendMessage,
} from "../services/messageService";
import type {
  ChatMessage,
  Conversation as ConversationType,
} from "../types/Message";

function Conversation() {
  const { user } = useAuth();
  const { conversationId } = useParams();

  const [conversation, setConversation] = useState<ConversationType | null>(
    null,
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const loadConversation = async () => {
      if (!conversationId) {
        setError("Conversation ID is missing");
        setLoading(false);
        return;
      }

      try {
        const [conversationResponse, messagesResponse] = await Promise.all([
          getConversationById(conversationId),
          getMessages(conversationId),
        ]);

        setConversation(conversationResponse.data);
        setMessages(messagesResponse.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load conversation");
      } finally {
        setLoading(false);
      }
    };

    loadConversation();
  }, [conversationId]);

  const handleSendMessage = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!conversationId || !newMessage.trim()) {
      return;
    }

    try {
      setSending(true);

      const response = await sendMessage(conversationId, newMessage);

      setMessages((currentMessages) => [...currentMessages, response.data]);

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-gray-600">Loading conversation...</p>
      </div>
    );
  }

  if (error || !conversation) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-red-600">{error || "Conversation not found"}</p>
      </div>
    );
  }

  const otherParticipant = conversation.participants.find(
    (participant) => participant._id !== user?._id,
  );

  const careRequest = conversation.careRequestId;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* Back to inbox */}
      <Link
        to="/messages"
        className="mb-4 inline-block text-sm font-medium text-auplant-green hover:text-auplant-dark"
      >
        ← Back to messages
      </Link>

      <div className="overflow-hidden rounded-2xl border border-auplant-sage bg-white shadow-sm">
        {/* Chat header */}
        <div className="border-b border-auplant-sage bg-auplant-cream px-6 py-5">
          <div className="flex items-center gap-4">
            {otherParticipant?.profileImage ? (
              <img
                src={otherParticipant.profileImage}
                alt={`${otherParticipant.name}'s profile`}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-auplant-sage text-lg font-bold text-auplant-dark">
                {otherParticipant?.name.charAt(0).toUpperCase() ?? "?"}
              </div>
            )}

            <div>
              <h1 className="text-xl font-bold text-auplant-dark">
                {otherParticipant?.name ?? "Conversation"}
              </h1>

              {careRequest ? (
                <p className="mt-1 text-sm text-gray-600">
                  Care request · {careRequest.location}
                </p>
              ) : (
                <p className="mt-1 text-sm text-gray-500">
                  Direct conversation
                </p>
              )}
            </div>
          </div>

          {/* Care request context */}
          {careRequest && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span>
                {new Date(careRequest.startDate).toLocaleDateString("en-GB")}
              </span>

              <span>–</span>

              <span>
                {new Date(careRequest.endDate).toLocaleDateString("en-GB")}
              </span>

              <span>·</span>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  careRequest.status === "open"
                    ? "bg-auplant-sage text-auplant-dark"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {careRequest.status === "open" ? "Open" : "Closed"}
              </span>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="min-h-96 space-y-4 bg-white px-6 py-6">
          {messages.length === 0 ? (
            <div className="flex min-h-72 items-center justify-center">
              <div className="text-center">
                <p className="font-medium text-auplant-dark">No messages yet</p>

                <p className="mt-1 text-sm text-gray-500">
                  Send a message to start the conversation.
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => {
              const isOwnMessage = message.senderId._id === user?._id;

              const messageTime = new Date(
                message.createdAt,
              ).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={message._id}
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] ${
                      isOwnMessage ? "text-right" : "text-left"
                    }`}
                  >
                    {!isOwnMessage && (
                      <p className="mb-1 ml-1 text-xs font-semibold text-auplant-dark">
                        {message.senderId.name}
                      </p>
                    )}

                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        isOwnMessage
                          ? "rounded-br-md bg-auplant-green text-white"
                          : "rounded-bl-md bg-auplant-sage text-auplant-dark"
                      }`}
                    >
                      <p className="break-words">{message.content}</p>
                    </div>

                    <p className="mt-1 px-1 text-xs text-gray-400">
                      {messageTime}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Message form */}
        <form
          onSubmit={handleSendMessage}
          className="flex gap-3 border-t border-auplant-sage bg-auplant-cream p-4"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder="Write a message..."
            aria-label="Write a message"
            className="min-w-0 flex-1 rounded-xl border border-auplant-sage bg-white px-4 py-3 text-auplant-dark outline-none transition focus:border-auplant-green focus:ring-2 focus:ring-auplant-sage"
          />

          <button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="cursor-pointer rounded-xl bg-auplant-green px-6 py-3 font-semibold text-white transition-colors hover:bg-auplant-dark disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Conversation;
