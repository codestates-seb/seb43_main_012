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

// export type QnA = {
//   conversationId: number;
//   memberId: 1;
//   title: string;
//   answerSummary: string;
//   modifiedAt: string;
//   bookmarks: string;
//   tags: string;
//   saved: boolean;
//   pinned: boolean;
// };

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

export type QnA = {
  qnaId: number;
  question: string;
  answer: string;
  bookmarkStatus: boolean;
};

export type Bookmark = {
  bookmarkId: number;
  bookmarkName: string;
};

export type Tag = {
  tagId: number;
  tagName: string;
};

export type Conversation = {
  conversationId: number;
  title: string;
  member: {
    memberId: string;
    avatarLink: string;
  };
  answerSummary: string;
  createdAt: string;
  modifiedAt: string;

  qnaList: QnA[];
  saved: boolean;
  pinned: boolean;
  published: boolean;
  bookmarks: Bookmark[];
  tags: Tag[];
  viewCount: number;
  activityLevel: number;
};

export const initialConvData = {
  conversationId: 1,
  title: '',
  member: {
    memberId: 'mumblefish',
    avatarLink: 'http://..',
  },
  answerSummary: 'AnswerSummary',
  createdAt: '',
  modifiedAt: '',
  qnaList: [{} as QnA],
  saved: false,
  pinned: false,
  published: false,
  bookmarks: [{} as Bookmark],
  tags: [{} as Tag],
  viewCount: 0,
  activityLevel: 0,
};
