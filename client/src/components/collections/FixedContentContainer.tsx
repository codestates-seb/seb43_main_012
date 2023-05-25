import {
  FixedContentContainer,
  FixedContent,
  Title,
  SvgButton,
} from '../../styles/CollectionsStyle';
import { ReactComponent as BookmarkSolid } from '../assets/icons/bookmark-solid.svg';
import { ReactComponent as ThumbtackSolid } from '../assets/icons/thumbtack-solid.svg';

const BookmarkButton = () => {
  return (
    <SvgButton>
      <BookmarkSolid />
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

type MainProps = {
  content?: [];
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isMax?: boolean;
  newCId?: number;
  hasOnClick?: boolean;
};

const FixedContentContainer = (content={content}) => {

  return(
  {content.conversations
    .filter((item: any) => item.pinned)
    .map((conversation: Conversation) => (
      <FixedContent>
        <div className="header">
          <Title
            className="title"
            key={conversation.conversationId}
            href="#"
            onClick={() => {
              handleThumbnailClick(conversation.conversationId);
            }}
            // onClick={() => handleContentClick(conversation)}
          >
            {conversation.title}
          </Title>
          <span className="buttons">
            <PinButton /> <BookmarkButton />
          </span>
        </div>
        <p>{conversation.answerSummary}</p>
        <span className="bookmark">
          {conversation.bookmarks[0]?.bookmarkName}
        </span>

        <div className="tag">
          {conversation.tags.map((tag: TagType) => (
            <span key={tag.tagId}>#{tag.tagName} </span>
          ))}
        </div>
      </FixedContent>
    ))})
          };
