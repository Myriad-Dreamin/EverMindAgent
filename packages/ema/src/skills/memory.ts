interface AgentMemory {
  search(keywords: string[]): Promise<SearchMemoryResult>;
  addShortTermMemory(item: ShortTermMemory): Promise<void>;
  addLongTermMemory(item: LongTermMemory): Promise<void>;
}

interface SearchMemoryResult {
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
