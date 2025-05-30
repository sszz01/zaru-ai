import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "./firebase/firebase";

export interface Message {
  text: string;
  sender: string;
  timestamp?: Timestamp;
}

export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ConversationInput {
  id?: number;
  name: string;
  messages: { text: string; sender: string }[];
}

class ChatService {
  async saveConversation(
    conversationData: ConversationInput
  ): Promise<string | null> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const messagesWithTimestamp: Message[] = conversationData.messages.map(
        (msg) => ({
          ...msg,
          timestamp: Timestamp.fromDate(new Date()),
        })
      );

      const conversation: Omit<Conversation, "id"> = {
        name: conversationData.name,
        messages: messagesWithTimestamp,
        userId: user.uid,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      };

      const conversationsRef = collection(
        db,
        "users",
        user.uid,
        "conversations"
      );
      const docRef = await addDoc(conversationsRef, conversation);

      console.log("Conversation saved with ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error saving conversation:", error);
      return null;
    }
  }

  async updateConversation(
    conversationId: string,
    messages: { text: string; sender: string }[]
  ): Promise<boolean> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const messagesWithTimestamp: Message[] = messages.map((msg) => ({
        ...msg,
        timestamp: Timestamp.fromDate(new Date()),
      }));

      const conversationRef = doc(
        db,
        "users",
        user.uid,
        "conversations",
        conversationId
      );

      await updateDoc(conversationRef, {
        messages: messagesWithTimestamp,
        updatedAt: serverTimestamp(),
      });

      console.log("Conversation updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating conversation:", error);
      return false;
    }
  }

  async getUserConversations(): Promise<Conversation[]> {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        return [];
      }

      console.log("Fetching conversations for user:", user.uid);

      const conversationsRef = collection(
        db,
        "users",
        user.uid,
        "conversations"
      );
      const q = query(conversationsRef, orderBy("updatedAt", "desc"));
      const querySnapshot = await getDocs(q);

      const conversations: Conversation[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        conversations.push({
          id: doc.id,
          ...data,
        } as Conversation);
      });

      console.log("Fetched conversations:", conversations.length);
      return conversations;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return [];
    }
  }

  async getConversation(conversationId: string): Promise<Conversation | null> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const conversationRef = doc(
        db,
        "users",
        user.uid,
        "conversations",
        conversationId
      );
      const docSnap = await getDoc(conversationRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as Conversation;
      } else {
        console.log("No such conversation!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
      return null;
    }
  }

  async deleteConversation(conversationId: string): Promise<boolean> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const conversationRef = doc(
        db,
        "users",
        user.uid,
        "conversations",
        conversationId
      );
      await deleteDoc(conversationRef);

      console.log("Conversation deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting conversation:", error);
      return false;
    }
  }

  async saveAllConversations(
    conversationArray: ConversationInput[]
  ): Promise<string[]> {
    const savedIds: string[] = [];

    for (const conv of conversationArray) {
      const savedId = await this.saveConversation(conv);
      if (savedId) {
        savedIds.push(savedId);
      }
    }

    return savedIds;
  }

  async autoSaveConversation(
    conversationId: string | null,
    messages: { text: string; sender: string }[],
    conversationName?: string
  ): Promise<string | null> {
    if (messages.length === 0) return null;

    try {
      if (conversationId) {
        const success = await this.updateConversation(conversationId, messages);
        return success ? conversationId : null;
      } else {
        const newConversation: ConversationInput = {
          name: conversationName || `Conversation ${Date.now()}`,
          messages: messages,
        };
        return await this.saveConversation(newConversation);
      }
    } catch (error) {
      console.error("Error auto-saving conversation:", error);
      return null;
    }
  }
}

export const chatService = new ChatService();
