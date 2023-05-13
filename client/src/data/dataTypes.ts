export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
};

export type GetPostResponse = {
  data: Post;
};

export type QnA = {
  conversationId: number;
  memberId: 1;
  title: string;
  answerSummary: string;
  modifiedAt: string;
  bookmarks: string;
  tags: string;
  saved: boolean;
  pinned: boolean;
};

export type GetNewQnAResponse = {
  data: QnA;
};

export type openAIAnswer = {
  conversationId: number;
  title: string;
  bookmarks: string[];
  tags: string[];
  qnaList: [
    {
      qnaId: number;
      question: string;
      answer: string;
      bookmarkStatus: boolean;
      displayStatus: boolean;
    },
  ];
};

export type GetOpenAIResponse = {
  data: openAIAnswer;
};
