import styled from "styled-components";

const FixedPinContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: red;
`;

const FixedPin = styled.a`
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 5px;
  background-color: #f0f0f0;
  border: solid;
`;

const BookmarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10.5rem;
  background-color: blue;
`;

const Bookmark = styled.a`
  background-color: #f0f0f0;
  padding: 5px;
`;

const BookmarkAdd = styled.button`
  flex-basis: 10rem;
  background-color: #f0f0f0;
  margin: 5px;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 10.5rem;
  background-color: green;
  margin: 10px 0 0 0;
`;
const Tag = styled.a`
  background-color: #f0f0f0;
  padding: 5px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
  background-color: orange;
  padding: 5px;
`;

const Content = styled.a`
  flex-basis: 17rem;
  /* width: 30vw; */
  background-color: #f0f0f0;
  padding: 5px;

  border: solid;
`;

const BookmarkTagContent = styled.main`
  display: flex;
  justify-content: space-between;
`;

const Collections = () => {
  return (
    <main>
      <FixedPinContainer>
        <FixedPin href="#">Fixed 1</FixedPin>
        <FixedPin href="#">Fixed 2</FixedPin>
        <FixedPin href="#">Fixed 3</FixedPin>
        <FixedPin href="#">Fixed 4</FixedPin>
      </FixedPinContainer>

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
            <Content href="#"> Content 1</Content>
            <Content href="#"> Content 2</Content>
            <Content href="#"> Content 3</Content>
            <Content href="#"> Content 4</Content>
            <Content href="#"> Content 5</Content>
            <Content href="#"> Content 6</Content>
            <Content href="#"> Content 7</Content>
            <Content href="#"> Content 8</Content>
            <Content href="#"> Content 9</Content>
            <Content href="#"> Content 10</Content>
          </ContentContainer>
        </div>

        <div></div>
      </BookmarkTagContent>
    </main>
  );
};

export default Collections;
