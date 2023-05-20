//import style
import { useState } from 'react';
import styled from 'styled-components';

//import redux/api
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectConversation,
  addTagAsync,
  deleteTagAsync,
  updateTags,
} from '../../features/main/conversationSlice';

export const TagsInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 100px;
  min-width: 250px;
  padding: 10px;
  border: 1px solid rgb(214, 216, 218);
  border-radius: 6px;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;
    // align-items: center;

    > .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(41, 41, 41, 1);
      padding: 0 8px;
      font-size: 13px;
      list-style: none;
      border-radius: 100px;
      margin: 0 8px 8px 0;
      white-space: nowrap;
      background: rgba(242, 242, 242, 1);
      > .tag-title {
        color: rgba(41, 41, 41, 1);
      }
      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 10px;
        margin-left: 8px;
        color: var(--color-default-gray);
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
      }
    }
  }

  > input {
    flex: 1;
    border: none;
    height: 46px;
    font-size: 14px;
    padding: 4px 0 0 0;
    :focus {
      outline: transparent;
    }
  }

  &:focus-within {
    border: 1px solid var(--color-default-gray);
  }
`;

//test
function uuidToDecimal(uuid: string): number {
  const number = parseInt(uuid.replace(/-/g, ''), 16);
  return number;
}

const DialogBoxAddTag = () => {
  const dispatch = useAppDispatch();
  const tagList = useAppSelector(selectConversation).tags;

  const [newTag, setNewTag] = useState('');

  //0. triggered when enter is clicked
  //1. checks if the tag already exists before adding the tag
  //2. if there is no input, does not add tag
  //3. once a tag is added, the input value is emptied
  const addTags = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length) {
      // console.log('text', event.currentTarget.value);
      const tagNames = tagList.map((t) => t.tagName.toLowerCase());
      if (!tagNames.includes(event.currentTarget.value.toLowerCase())) {
        const res = await dispatch(
          addTagAsync({ tName: event.currentTarget.value }),
        );

        if (res.payload) {
          const payload = res.payload as {
            tagId: number;
            tagName: string;
          };
          dispatch(
            updateTags({
              tId: payload.tagId,
              tName: newTag,
              type: 'ADD',
            }),
          );
        }

        setNewTag('');
      }
    }
  };

  const removeTags = async (indexToRemove: number) => {
    await dispatch(deleteTagAsync({ tId: indexToRemove }));
    dispatch(updateTags({ tId: indexToRemove, type: 'DELETE' }));
  };

  const newTagHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };
  return (
    <>
      <TagsInput>
        <ul id="tags">
          {tagList.map((tag) => (
            <li key={tag.tagId} className="tag">
              <span className="tag-title">{tag.tagName}</span>
              <span
                className="tag-close-icon"
                onClick={() => removeTags(tag.tagId)}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
        <input
          className="tag-input"
          type="text"
          value={newTag}
          onChange={newTagHandler}
          onKeyUp={(e) => {
            {
              if (e.key === 'Enter') {
                addTags(e);
              }
            }
          }}
          placeholder="Click enter to add tags!"
        />
      </TagsInput>
    </>
  );
};

export default DialogBoxAddTag;
