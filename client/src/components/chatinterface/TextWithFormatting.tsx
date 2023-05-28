import React from 'react';
import styled from 'styled-components';

const ParagraphBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  word-wrap: break-word;
  white-space: pre-wrap;
  p {
    margin-bottom: 16px;
  }

  p:last-child,
  p:only-child {
    margin-bottom: 0;
  }

  ol {
    margin-left: 18px;
  }

  ol li::marker {
    margin-right: 5px;
  }

  ol li {
    position: relative;
    padding-left: 10px;
  }
  ol li::before {
    li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 5px;
      background-color: red;
      border-radius: 50%;
    }
  }
`;

const CodeBlock = styled.pre`
  display: flex;
  flex-direction: row;

  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  overflow: auto;
  white-space: pre-wrap;
  max-width: 100%;
  margin-bottom: 18px;
  font-size: 16px;

  &::-webkit-scrollbar {
    height: 8px;
    background-color: #f4f4f4;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

function extractSentences(text: string): string[] {
  console.log('extract sentences');
  let remainingText = text;
  const extractedPieces: string[] = [];
  const codeBlockRegex = /```[\s\S]*?```/g;

  while (remainingText.length > 0) {
    console.log('there is remaining text,', remainingText);

    const codeBlocks =
      ((remainingText.startsWith('```') &&
        remainingText.match(codeBlockRegex)) ||
        [])[0] || '';

    if (codeBlocks.length > 0) {
      console.log('blocks', codeBlocks);
      extractedPieces.push(...codeBlocks);
      remainingText = remainingText
        .replace(codeBlocks, '')
        .replace(/^\n\n/, '');

      continue;
    }

    const paragraph = remainingText.split('\n\n')[0] || '';
    if (paragraph.length > 0) {
      console.log('blocks:', paragraph);

      extractedPieces.push(paragraph);
      remainingText = remainingText.replace(paragraph + '\n\n', '');
      remainingText = remainingText.replace(paragraph, '');
      console.log('remainder: ', remainingText);
      continue;
    }

    extractedPieces.push(remainingText);
    break;
  }
  return extractedPieces;
}

const TextWithFormatting = (text: string) => {
  const sections = text.split('\n\n\n');

  const renderSections = sections.map((section, sectionIndex) => {
    const paragraphs = section.split('\n\n');
    // const paragraphs = extractSentences(section);

    const renderParagraphs = paragraphs.map((paragraph, index) => {
      const lines = paragraph.split('\n');

      if (lines.length === 1 && !lines[0].startsWith('```')) {
        return <p key={index}>{lines[0]}</p>;
      }

      const isNumberedList = lines.every((line, lineIndex) =>
        line.trim().startsWith(`${lineIndex + 1}. `),
      );

      if (isNumberedList) {
        const listItems = lines.map((line, lineIndex) => {
          const listItem = line.replace(`${lineIndex + 1}. `, '');
          return <li key={lineIndex}>{listItem}</li>;
        });

        return <ol key={index}>{listItems}</ol>;
      }

      if (
        lines[0].startsWith('```') &&
        lines[lines.length - 1].endsWith('```')
      ) {
        const codeLines = lines.slice(1, -1);
        const code = codeLines.join('\n');
        return (
          <CodeBlock key={index}>
            <code>{code}</code>
          </CodeBlock>
        );
      }

      const renderLines = lines.map((line, lineIndex) => {
        if (line.startsWith('```')) {
          const code = line.slice(3);
          return (
            <CodeBlock key={lineIndex}>
              <code>{code}</code>
            </CodeBlock>
          );
        }

        return (
          <React.Fragment key={lineIndex}>
            {line}
            <br />
          </React.Fragment>
        );
      });

      return <p key={index}>{renderLines}</p>;
    });

    return (
      <div key={sectionIndex}>
        {renderParagraphs}
        {/* {sectionIndex < sections.length - 1 && <br />} */}
      </div>
    );
  });

  return <ParagraphBox>{renderSections}</ParagraphBox>;
};

export default TextWithFormatting;
