import { requestAuth } from '../utils/axiosConfig';
import { BookmarkType, Conversation } from '../data/d';
import { request } from 'http';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export async function getAllConversations() {
  try {
    const response = await requestAuth.get<any>(`${BASE_URL}/conversations`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSavedConversations() {
  try {
    const response = await requestAuth.get<any>(`${BASE_URL}/collections`);
    return response.data.conversations;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCollections() {
  try {
    const response = await requestAuth.get<any>(`${BASE_URL}/collections`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function askFirstQuestion(question: string) {
  try {
    const response = await requestAuth.post<any>(`${BASE_URL}/conversations`, {
      question,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function askFirstQuestionOpenAI(question: string) {
  requestAuth
    .post<any>(`${BASE_URL}/openai/question`, {
      question,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

export async function continueConversation(id: number, question: string) {
  try {
    const response = await requestAuth.post<any>(
      `${BASE_URL}/openai/question`,
      {
        conversationId: id,
        question,
      },
    );
    console.log(response.data);
    return 'success';
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getConversation(id: number): Promise<Conversation> {
  try {
    const res = await requestAuth.get<any>(`${BASE_URL}/conversations/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function editTitle({ id, title }: { id: number; title: string }) {
  // console.log('edit title api called!');
  try {
    const response = await requestAuth.patch<any>(
      `${BASE_URL}/conversations/${id}`,
      {
        title,
      },
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//conversationId
export async function deleteConveration() {
  requestAuth
    .delete<any>(`${BASE_URL}/conversations/`)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

export async function saveQnA() {}

export async function unsaveQnA() {}

export async function saveBookmark({
  cId,
  bName,
}: {
  cId: number;
  bName: string;
}): Promise<BookmarkType> {
  try {
    const response = await requestAuth.post(
      `${BASE_URL}/conversations/${cId}/bookmarks`,
      {
        bookmarkName: bName,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteBookmark({
  cId,
  bId,
}: {
  cId: number;
  bId: number;
}) {
  try {
    await requestAuth.delete(
      `${BASE_URL}/conversations/${cId}/bookmarks/${bId}`,
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editBookmark({
  bId,
  newName,
}: {
  bId: number;
  newName: string;
}) {
  try {
    await requestAuth.patch(`${BASE_URL}/bookmarks/${bId}`, {
      bookmarkName: newName,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addTag({ cId, tName }: { cId: number; tName: string }) {
  try {
    const response = await requestAuth.post(
      `${BASE_URL}/conversations/${cId}/tags`,
      {
        tagName: tName,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteTag({ cId, tId }: { cId: number; tId: number }) {
  try {
    await requestAuth.delete(`${BASE_URL}/conversations/${cId}/tags/${tId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updatePinState({
  cId,
  value,
}: {
  cId: number;
  value: boolean;
}) {
  try {
    await requestAuth.patch(`${BASE_URL}/conversations/${cId}`, {
      pinned: value,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
