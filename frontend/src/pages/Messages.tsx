import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { getConversations } from "../services/messageService";

import type { Conversation } from "../types/Message";

import { formatMessageDate } from "../utils/formatMessageDate";

import instructionBanner from "../assets/banners/instructions-banner.png";
import PageHero from "../components/PageHero";

function Messages() {
  const { user } = useAuth();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const response = await getConversations();
        setConversations(response.data);
      } catch (error) {
        console.error("Failed to load conversations:", error);
        setError("Failed to load conversations");
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-gray-600">Loading conversations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <main className="bg-auplant-cream">
      <PageHero
        image={instructionBanner}
        eyebrow="Messages"
        title="Your conversations"
        description="Keep in touch with plant owners and sitters."
      />
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Conversations */}
        {conversations.length === 0 ? (
          <div className="rounded-xl border border-auplant-sage bg-auplant-cream p-8 text-center">
            <p className="font-medium text-auplant-dark">
              You don't have any conversations yet.
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Contact a plant owner or sitter to start a conversation.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((conversation) => {
              const otherParticipant = conversation.participants.find(
                (participant) => participant._id !== user?._id,
              );

              const latestMessage = conversation.latestMessage;
              const careRequest = conversation.careRequestId;

              const lastActivity = formatMessageDate(conversation.updatedAt);

              return (
                <Link
                  key={conversation._id}
                  to={`/messages/${conversation._id}`}
                  className="block rounded-xl border border-auplant-sage bg-white p-5 transition hover:border-auplant-green hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    {/* Profile image */}
                    {otherParticipant?.profileImage ? (
                      <img
                        src={otherParticipant.profileImage}
                        alt={`${otherParticipant.name}'s profile`}
                        className="h-14 w-14 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-auplant-sage text-lg font-bold text-auplant-dark">
                        {otherParticipant?.name.charAt(0).toUpperCase() ?? "?"}
                      </div>
                    )}

                    {/* Conversation information */}
                    <div className="min-w-0 flex-1">
                      {/* Name and last activity */}
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-lg font-semibold text-auplant-dark">
                          {otherParticipant?.name ?? "Unknown user"}
                        </h2>

                        <span className="shrink-0 text-sm text-gray-500">
                          {lastActivity}
                        </span>
                      </div>

                      {/* Latest message */}
                      <p className="mt-1 truncate text-sm text-gray-500">
                        {latestMessage
                          ? latestMessage.senderId._id === user?._id
                            ? `You: ${latestMessage.content}`
                            : latestMessage.content
                          : "No messages yet"}
                      </p>

                      {/* Care request context */}
                      {careRequest ? (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-auplant-green">
                            Care request · {careRequest.location}
                          </p>

                          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                            <span>
                              {new Date(
                                careRequest.startDate,
                              ).toLocaleDateString("en-GB")}
                            </span>

                            <span>–</span>

                            <span>
                              {new Date(careRequest.endDate).toLocaleDateString(
                                "en-GB",
                              )}
                            </span>

                            <span>·</span>

                            <span className="capitalize">
                              {careRequest.status}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-3 text-sm text-gray-500">
                          Direct conversation
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default Messages;
