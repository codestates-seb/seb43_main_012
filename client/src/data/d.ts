export type MyGenericFunctionType<T> = (...args: T[]) => void;

export type ContentType = {
  conversations: Conversation[];
  tags: TagType[];
  bookmarks: BookmarkType[];
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
  bookmarkList: BookmarkType[];
  tags: TagType[];
  viewCount: number;
  activityLevel: number;
};

export type ConversationThumbnail = Omit<Conversation, 'qnaList'>;

export const initialConvData = {
  conversationId: -1,
  title: '',
  member: {
    memberId: 'NoOne',
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
      bookmarkId: -1,
      bookmarkName: 'Default',
    },
  ] as BookmarkType[],
  bookmarkList: [] as BookmarkType[],
  tags: [] as TagType[],
  viewCount: 0,
  activityLevel: 0,
};

export const DefaultBookmarks = [
  {
    bookmarkId: 1,
    bookmarkName: 'Default',
  },
];

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
