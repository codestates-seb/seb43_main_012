import { requestAuth } from '../utils/axiosConfig';
import { BookmarkType, Conversation, ConversationThumbType } from '../data/d';
import { request } from 'http';

export async function getAllConversations(queries?: string) {
  try {
    // console.log(queries);
    let url = `/conversations`;
    if (queries) url = `/conversations?${queries}`;
    const response = await requestAuth.get<any>(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSavedConversations() {
  try {
    const response = await requestAuth.get<any>(`/collections`);
    return response.data.conversations;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCollection() {
  try {
    const response = await requestAuth.get<any>(`/collections`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function askFirstQuestion(question: string) {
  try {
    const response = await requestAuth.post<any>(`/conversations`, {
      question,
    });
    // console.log(response.data.qnaList[0].answer);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function continueConversation(id: number, question: string) {
  try {
    const response = await requestAuth.post<any>(`/openai/question`, {
      conversationId: id,
      question,
    });
    // console.log(response.data);
    return 'success';
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getConversation(id: number): Promise<Conversation> {
  try {
    const res = await requestAuth.get<any>(`/conversations/${id}`);
    // console.log('conversation: ', res.data.qnaList[0].answer);
    // for (let i = 0; i < res.data.qnaList.length; i++) {
    //   console.log('answer:', res.data.qnaList);
    // }

    console.log('cId:', res.data.conversationId);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getSearchResults(
  text: string,
): Promise<ConversationThumbType[]> {
  try {
    const res = await requestAuth.get(`/conversations?q=${text}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function editTitle({ id, title }: { id: number; title: string }) {
  try {
    const response = await requestAuth.patch<any>(`/conversations/${id}`, {
      title,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteConversation(cId: number) {
  requestAuth
    .delete<any>(`/conversations/${cId}`)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

export async function deleteAllConversations() {}

export async function deleteUnsavedConversations() {}
//searchTagResults
export async function getTaggedConversations(tagId: number | string) {
  try {
    const res = await requestAuth.get(`/conversations/tags/${tagId}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
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
    const response = await requestAuth.post(`/conversations/${cId}/bookmarks`, {
      bookmarkName: bName,
    });
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
    await requestAuth.delete(`/conversations/${cId}/bookmarks/${bId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createBookmark({ bName }: { bName: string }) {
  try {
    await requestAuth.post('/bookmarks', {
      bookmarkName: bName,
    });
  } catch (err) {
    console.log(err);
    throw err;
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
    await requestAuth.patch(`/bookmarks/${bId}`, {
      bookmarkName: newName,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addTag({ cId, tName }: { cId: number; tName: string }) {
  try {
    const response = await requestAuth.post(`/conversations/${cId}/tags`, {
      tagName: tName,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteTag({ cId, tId }: { cId: number; tId: number }) {
  try {
    await requestAuth.delete(`/conversations/${cId}/tags/${tId}`);
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
    await requestAuth.patch(`/conversations/${cId}`, {
      pinned: value,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
