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
  data: QnAType;
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

export type QnAType = {
  qnaId: number;
  question: string;
  answer: string;
  bookmarkStatus: boolean;
};

export type BookmarkType = {
  bookmarkId: number;
  bookmarkName: string;
  checked?: boolean;
};

export type BookmarkTempType = {
  categoryId: number;
  categoryName: string;
};

export type TagType = {
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

  qnaList: QnAType[];
  saved: boolean;
  pinned: boolean;
  published: boolean;
  bookmarks: BookmarkType[];
  tags: TagType[];
  viewCount: number;
  activityLevel: number;
};

export const initialConvData = {
  conversationId: 0,
  title: '',
  member: {
    memberId: 'mumblefish',
    avatarLink: '',
  },
  answerSummary: '',
  createdAt: '',
  modifiedAt: '',
  qnaList: [] as QnAType[],
  saved: false,
  pinned: false,
  published: false,
  bookmarks: [
    {
      bookmarkId: 1,
      bookmarkName: 'Default',
    },
  ] as BookmarkType[],
  tags: [] as TagType[],
  viewCount: 0,
  activityLevel: 0,
};

export const tempBookmarks = [
  {
    bookmarkId: 1,
    bookmarkName: 'VeryVeryveryveryveryveryverylong bookmark',
  },
  {
    bookmarkId: 111,
    bookmarkName: 'Bookmark2',
  },
  {
    bookmarkId: 222,
    bookmarkName: 'Bookmark3',
  },
  {
    bookmarkId: 333,
    bookmarkName: 'Bookmark4',
  },
  {
    bookmarkId: 444,
    bookmarkName: 'Bookmark5',
  },
  {
    bookmarkId: 555,
    bookmarkName: 'Bookmark6',
  },
  {
    bookmarkId: 666,
    bookmarkName: 'Bookmark7',
  },
  {
    bookmarkId: 777,
    bookmarkName: 'Bookmark8',
  },
];

export const DefaultBookmarks = [
  {
    bookmarkId: 1,
    bookmarkName: 'Default',
  },
];
