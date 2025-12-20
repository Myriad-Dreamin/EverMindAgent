import type { Message } from "../schema";

/**
 * Interface for agent memory
 */
interface ConversationStorage {
  /**
   * Save a conversation
   * @param messages - The messages in the conversation
   * @returns Promise resolving to the message ids of the conversation
   */
  saveConversation(messages: Message[]): Promise<number[]>;
}

/**
 * Interface for agent memory
 */
interface AgentMemory {
  /**
   * Search agent memory
   * @param keywords - Keywords to search for
   * @returns Promise resolving to the search result
   */
  search(keywords: string[]): Promise<SearchAgentMemoryResult>;
  /**
   * Add short term memory
   * @param item - Short term memory item
   * @param messageIds - The message ids facilitating the short term memory, for debugging purpose.
   * @returns Promise resolving when the memory is added
   */
  addShortTermMemory(
    item: ShortTermMemory,
    messageIds?: number[],
  ): Promise<void>;
  /**
   * Add long term memory
   * @param item - Long term memory item
   * @param messageIds - The message ids facilitating the long term memory, for debugging purpose.
   * @returns Promise resolving when the memory is added
   */
  addLongTermMemory(item: LongTermMemory, messageIds?: number[]): Promise<void>;
}

/**
 * Result of searching agent memory
 */
interface SearchAgentMemoryResult {
  /**
   * The long term memories found
   */
  items: LongTermMemory[];
}

interface ShortTermMemory {
  /**
   * The os when the actor saw the messages.
   */
  os: string;
  /**
   * The statement when the actor saw the messages.
   */
  statement: string;
  /**
   * The date and time the memory was created
   */
  createdAt: number;
}

interface LongTermMemory {
  /**
   * The 0-index to search, a.k.a. 一级分类
   */
  index0: string;
  /**
   * The 1-index to search, a.k.a. 二级分类
   */
  index1: string;
  /**
   * The keywords to search
   */
  keywords: string[];
  /**
   * The os when the actor saw the messages.
   */
  os: string;
  /**
   * The statement when the actor saw the messages.
   */
  statement: string;
  /**
   * The date and time the memory was created
   */
  createdAt: number;
}
