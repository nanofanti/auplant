import mongoose from "mongoose";

interface IConversation {
  participants: mongoose.Types.ObjectId[];
  careRequestId?: mongoose.Types.ObjectId;
}

const conversationSchema = new mongoose.Schema<IConversation>(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    careRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareRequest",
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Conversation = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema,
);

export default Conversation;
