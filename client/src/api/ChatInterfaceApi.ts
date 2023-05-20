import { axiosDefault } from '../utils/axiosConfig';
import { BookmarkType, Conversation } from '../data/d';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export async function getAllConversations() {
  try {
    const response = await axiosDefault.get<any>(`${BASE_URL}/conversations`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function askFirstQuestion(question: string) {
  try {
    const response = await axiosDefault.post<any>(`${BASE_URL}/conversations`, {
      question,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function askFirstQuestionOpenAI(question: string) {
  axiosDefault
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
    const response = await axiosDefault.post<any>(
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
    const res = await axiosDefault.get<any>(`${BASE_URL}/conversations/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function editTitle({ id, title }: { id: number; title: string }) {
  // console.log('edit title api called!');
  try {
    const response = await axiosDefault.patch<any>(
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
  axiosDefault
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
    const response = await axiosDefault.post(
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
    await axiosDefault.delete(
      `${BASE_URL}/conversations/${cId}/bookmarks/${bId}`,
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addTag({ cId, tName }: { cId: number; tName: string }) {
  try {
    const response = await axiosDefault.post(
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
    await axiosDefault.delete(`${BASE_URL}/conversations/${cId}/tags/${tId}`);
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
    await axiosDefault.patch(`${BASE_URL}/conversations/${cId}`, {
      pinned: value,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
