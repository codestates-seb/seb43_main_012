import { axiosDefault } from '../utils/axiosConfig';
import { Conversation } from '../data/d';

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
    // console.log(response.data);
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
      // console.log(res);
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
// export async function continueConversation(id: number, question: string) {
//   axiosDefault
//     .post<any>(`${BASE_URL}/openai/question`, {
//       conversationId: 11,
//       question,
//     })
//     .then((res) => {
//       // console.log(res);
//       console.log(res.data);
//       return 'success'!;
//     })
//     .catch((err) => console.log(err));
// }

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
  console.log('edit title api called!');
  try {
    const response = await axiosDefault.patch<any>(
      `${BASE_URL}/conversations/${id}`,
      {
        title,
        // pinned: true,
      },
    );
    console.log(response.data);
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
}): Promise<string> {
  try {
    console.log('sending bookmark create request');
    const response = await axiosDefault.post(
      `${BASE_URL}/conversations/${cId}/bookmarks`,
      {
        bookmarkName: bName,
      },
    );
    console.log('success in creating bookmark!', response.data);
    return response.data.message;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function saveBookmark({
//   cId,
//   bookmarks,
// }: {
//   cId: number;
//   bookmarks: string[];
// }) {
//   axiosDefault
//     .post(`${BASE_URL}/conversations/${cId}/bookmarks`, {
//       bookmarks,
//     })
//     .then((res) => {
//       // console.log(res);
//       console.log(res.data);
//     })
//     .catch((err) => console.log(err));
// }

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
    // console.log(response.data);
    // return response.data.message;
    // Handle any further operations with the response if needed
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// 참조
// import fetch from 'node-fetch';

// export async function getFlight(filterBy = {}) {
//   let queryResult = '';
//   if (filterBy.departure.length) queryResult +=  `?departure=${filterBy.departure}`;
//   if (filterBy.destination.length) queryResult += queryResult.length ? `&destination=${filterBy.destination}`: `?destination=${filterBy.destination}`;

//   const filtered = await fetch(`http://ec2-13-124-90-231.ap-northeast-2.compute.amazonaws.com:81/flight${queryResult}`,
//     {method: 'GET'})
//     .then(resp => resp.json())
//     .then(json=> json)
//   return filtered;
// }
