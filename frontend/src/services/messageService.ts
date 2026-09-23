import type {
  ConversationsResponse,
  ConversationResponse,
  CreateConversationData,
  MessagesResponse,
  SendMessageResponse,
} from "../types/Message";

export async function getConversations(): Promise<ConversationsResponse> {
  const response = await fetch("http://localhost:8080/api/conversations", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }

  const data: ConversationsResponse = await response.json();

  return data;
}

export async function getConversationById(
  conversationId: string,
): Promise<ConversationResponse> {
  const response = await fetch(
    `http://localhost:8080/api/conversations/${conversationId}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch conversation");
  }

  const data: ConversationResponse = await response.json();

  return data;
}

export async function createOrGetConversation(
  conversationData: CreateConversationData,
): Promise<ConversationResponse> {
  const response = await fetch("http://localhost:8080/api/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(conversationData),
  });

  if (!response.ok) {
    throw new Error("Failed to create or get conversation");
  }

  const data: ConversationResponse = await response.json();

  return data;
}

export async function getMessages(
  conversationId: string,
): Promise<MessagesResponse> {
  const response = await fetch(
    `http://localhost:8080/api/conversations/${conversationId}/messages`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  const data: MessagesResponse = await response.json();

  return data;
}

export async function sendMessage(
  conversationId: string,
  content: string,
): Promise<SendMessageResponse> {
  const response = await fetch(
    `http://localhost:8080/api/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  const data: SendMessageResponse = await response.json();

  return data;
}
