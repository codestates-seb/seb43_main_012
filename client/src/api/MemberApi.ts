import { requestAuth } from '../utils/axiosConfig';

export type UserInfoItemTypes = {
  id: number;
  createdAt: number[];
  avatarLink: string;
  username: string;
  userId: string;
};

export const handleUserInfo = async (
  URL: String,
): Promise<UserInfoItemTypes> => {
  const response = await requestAuth.get(`/api/${URL}`, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const handleUpdate = async (
  URL: String,
  newAvatarLink: String,
): Promise<UserInfoItemTypes> => {
  const response = await requestAuth.patch(
    `/api/${URL}`,
    {
      avatarLink: newAvatarLink,
    },
    { withCredentials: true },
  );
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data.message;
};

export const handleNameUpdate = async (
  URL: String,
  username: String,
): Promise<UserInfoItemTypes> => {
  const response = await requestAuth.patch(
    `/api/${URL}`,
    {
      username: username,
    },
    { withCredentials: true },
  );
  // console.log('update success!', response);

  if (response.status === 200) {
    // console.log('updating token');
    localStorage.setItem('token', response.data.Authorization);
    localStorage.setItem('refresh', JSON.stringify(response.data.Refresh));
  }
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;
  // return response.data;
  // return response.data.message;
};

export const handlePasswordUpdate = async (
  URL: String,
  password: String,
): Promise<UserInfoItemTypes> => {
  const response = await requestAuth.patch(
    `/api/${URL}`,
    {
      password: password,
    },
    { withCredentials: true },
  );
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data.message;
};
