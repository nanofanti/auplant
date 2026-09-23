export type ConversationParticipant = {
  _id: string;
  name: string;
  profileImage?: string;
};

export type ConversationCareRequest = {
  _id: string;
  location: string;
  startDate: string;
  endDate: string;
  status: "open" | "closed";
};

export type Conversation = {
  _id: string;
  participants: ConversationParticipant[];
  careRequestId?: ConversationCareRequest;
  createdAt: string;
  updatedAt: string;
};

export type ChatMessage = {
  _id: string;
  conversationId: string;
  senderId: ConversationParticipant;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateConversationData = {
  recipientId: string;
  careRequestId?: string;
};

export type ConversationsResponse = {
  data: Conversation[];
};

export type ConversationResponse = {
  data: Conversation;
};

export type MessagesResponse = {
  data: ChatMessage[];
};

export type SendMessageResponse = {
  message: string;
  data: ChatMessage;
};
