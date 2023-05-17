import { axiosDefault } from '../utils/axiosConfig';
import { Conversation } from '../data/dataTypes';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export async function getAllConversations() {
  try {
    const response = await axiosDefault.get<any>(`${BASE_URL}/conversations`);
    //   console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function getAllConversations() {
//   axiosDefault
//     .get<any>(`${BASE_URL}/conversations`)
//     .then((res) => {
//       console.log(res);
//       // res.data;
//       console.log(res.data);
//     })
//     .catch((err) => console.log(err));
// }

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
    console.log(res.data);
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

export async function deleteConv() {
  axiosDefault
    .delete<any>(`${BASE_URL}/conversations/5`)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

export async function saveCheckedQnA() {}

export async function deleteUncheckedQnA() {}

export async function saveBookmark({
  cId,
  bookmarks,
}: {
  cId: number;
  bookmarks: string[];
}) {
  axiosDefault
    .post(`${BASE_URL}/conversations/${cId}/bookmarks`, {
      bookmarks,
    })
    .then((res) => {
      // console.log(res);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

export async function editBookmark({
  cId,
  bookmarks,
}: {
  cId: number;
  bookmarks: string[];
}) {
  axiosDefault
    .patch(`${BASE_URL}/conversations/${cId}/bookmarks`, {
      bookmarks,
    })
    .then((res) => {
      // console.log(res);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
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
