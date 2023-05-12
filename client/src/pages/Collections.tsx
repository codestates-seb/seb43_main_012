import styled from 'styled-components';
import { useState } from 'react';
import data from '../data/data.json';
// @ts-ignore
import { ReactComponent as BookmarkSolid } from '../assets/icons/bookmark-solid.svg';
import { ReactComponent as ThumbtackSolid } from '../assets/icons/thumbtack-solid.svg';

const Main = styled.main`
  /* display: flex; */
  /* justify-content: space-between; */
  /* background-color: #f0f0f0; */
  padding: 0 40px 0 40px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
  /* background-color: orange; */
  padding: 5px;
`;

const Content = styled.a`
  flex-basis: 17rem;
  /* width: 30vw; */
  /* background-color: #f0f0f0; */
  padding: 5px;
  border: solid;
  border-color: #c9ad6e;
  border-radius: 10px;
  p {
    text-align: left;
    word-break: break-all;
  }
  .bookmark {
    color: #c9ad6e;
  }
  .tag {
    color: #7bb06e;
  }
`;

const FixedContent = styled(Content)`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  align-items: flex-start;
`;

const FixedContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #faf7f1;
`;

// const FixedPin = styled.a`
//   justify-content: center;
//   align-items: center;
//   padding: 5px;
//   margin: 5px;
//   background-color: #f0f0f0;
//   border: solid;
// `;

const BookmarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10.5rem;
  /* background-color: blue; */
`;

const Bookmark = styled.a`
  /* background-color: #f0f0f0; */
  padding: 5px;
`;

const BookmarkAdd = styled.button`
  flex-basis: 10rem;
  /* background-color: #f0f0f0; */
  margin: 5px;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 10.5rem;
  /* background-color: green; */
  margin: 10px 0 0 0;
`;
const Tag = styled.a`
  background-color: #f0f0f0;
  border-radius: 20px;
  margin: 0 5px 5px 0;
  padding: 5px;
`;

const BookmarkTagContent = styled.main`
  display: flex;
  justify-content: space-between;
`;

const SvgButton = styled.button`
  width: 20px;
  border: none;
  background-color: transparent;

  cursor: pointer;
`;

const BookmarkButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <SvgButton>
      <BookmarkSolid onClick={handleClick} style={{ fill: clicked ? 'blue' : 'black' }} />
    </SvgButton>
  );
};

const PinButton = () => {
  return (
    <SvgButton>
      <ThumbtackSolid />
    </SvgButton>
  );
};

const Collections = () => {
  //data를 받아서 map으로 돌리기
  const [content, setContent] = useState(data);

  return (
    <Main>
      {/* <div>
            <BookmarkButton />
            <PinButton />
          </div> */}
      <FixedContentContainer>
        {data.chat
          .filter(item => item.fixed)
          .map(({ title, content, bookmark, tags, id }) => (
            <FixedContent key={id} href="#">
              <h3>{title}</h3>
              <p>{content}</p>
              <span className="bookmark">{bookmark}</span>

              <div className="tag">
                {tags.map(
                  tag => (
                    // <Tag key={tag} href="#">
                    <span>#{tag} </span>
                  )
                  // </Tag>
                )}
              </div>
            </FixedContent>
          ))}
      </FixedContentContainer>

      <BookmarkTagContent>
        <div>
          <BookmarkContainer>
            <Bookmark href="#">All</Bookmark>
            <Bookmark href="#">AI project </Bookmark>
            <Bookmark href="#">Pre-project</Bookmark>
            <Bookmark href="#">Coding test</Bookmark>
            <Bookmark href="#">interview Prep</Bookmark>
          </BookmarkContainer>
          <BookmarkAdd>+New Collection</BookmarkAdd>
          <TagContainer>
            <Tag href="#">React</Tag>
            <Tag href="#">AI </Tag>
            <Tag href="#">ML</Tag>
            <Tag href="#">NLP </Tag>
            <Tag href="#">React hooks </Tag>
            <Tag href="#">Writing </Tag>
            <Tag href="#">Algorithms </Tag>
            <Tag href="#">Figma </Tag>
            <Tag href="#">OpenAI </Tag>
            <Tag href="#">Data Science</Tag>
          </TagContainer>
        </div>
        <div>
          <ContentContainer>
            {data.chat.map(({ title, content, bookmark, tags, id }) => (
              <Content key={id} href="#">
                <h3>{title}</h3>
                <p>{content}</p>
                <span className="bookmark">{bookmark}</span>

                <div className="tag">
                  {tags.map(
                    tag => (
                      // <Tag key={tag} href="#">
                      <span>#{tag} </span>
                    )
                    // </Tag>
                  )}
                </div>
              </Content>
            ))}
          </ContentContainer>
        </div>

        <div></div>
      </BookmarkTagContent>
      {/* <BookmarkButton>
        <BookmarkSolid />
      </BookmarkButton> */}
    </Main>
  );
};

export default Collections;
