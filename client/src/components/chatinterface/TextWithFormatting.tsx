import React from 'react';
import styled from 'styled-components';

const ParagraphBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  word-wrap: break-word;
  word-break: keep-all;
  white-space: pre-wrap;
  p {
    margin-bottom: 18px;
  }

  // p:first-child {
  //   margin-bottom: 0px;
  // }

  p:last-child,
  p:only-child {
    margin-bottom: 0;
  }

  ol {
    margin-left: 30px;
    margin-bottom: 16px;
  }

  ol li::marker {
    display: block !important;
    text-align: left;
    padding: 5px;
    // color: red;
  }

  ol li {
    position: relative;
    padding-left: 10px;
    width: 100%;
    margin-bottom: 3px;
  }
  ol li::before {
    width: 30px;
    // content: '';
    // position: absolute;
    // left: 0;
    // top: 50%;
    // transform: translateY(-50%);
    // width: 10px;
    // height: 5px;
    // background-color: red;
    // border-radius: 50%;
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
  margin-top: 18px;
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
  // console.log('extract sentences');
  let remainingText = text;
  const extractedPieces: string[] = [];
  const codeBlockRegex = /```[\s\S]*?```/g;
  const codeBlockRegexIncomplete = /```[\s\S]*?/g;
  const listBlockRegex =
    /^(\d+\..*?|(?:\n-[\s\S]*)+)([\s\S]*?)($(?!\s*[-*\d]))/gm;

  while (remainingText.length > 0) {
    // console.log('there is remaining text,', remainingText);

    const codeBlocks =
      ((remainingText.startsWith('```') &&
        remainingText.match(codeBlockRegex)) ||
        [])[0] || '';

    if (codeBlocks.length > 0) {
      // console.log('blocks', codeBlocks);
      extractedPieces.push(codeBlocks);
      remainingText = remainingText
        .replace(codeBlocks, '')
        .replace(/^\n\n/, '');

      continue;
    }

    // const codeBlocksIncomplete =
    //   ((remainingText.startsWith('```') &&
    //     remainingText.match(codeBlockRegexIncomplete)) ||
    //     [])[0] || '';

    // if (codeBlocksIncomplete.length > 0) {
    //   console.log('blocks', codeBlocksIncomplete);
    //   extractedPieces.push(codeBlocksIncomplete);
    //   remainingText = remainingText
    //     .replace(codeBlocksIncomplete, '')
    //     .replace(/^\n\n/, '');

    //   continue;
    // }

    const listItems =
      (remainingText.startsWith('1.' || '-' || '*' || '•') &&
        remainingText.match(listBlockRegex)) ||
      '';

    if (listItems.length > 0) {
      // console.log('list:', listItems);
      extractedPieces.push(listItems[0]);
      remainingText = remainingText.replace(listItems[0], '');

      continue;
    }

    const paragraph = remainingText.split('\n\n')[0].trim() || '';
    // console.log('paragraphs:', paragraph);

    if (paragraph.length > 0) {
      // console.log('paragraph blocks:', paragraph);

      extractedPieces.push(paragraph);
      remainingText = remainingText.replace(paragraph + '\n\n', '');
      remainingText = remainingText.replace(paragraph + ' \n\n', '');
      remainingText = remainingText.replace(paragraph, '');
      // console.log('remainder: ', remainingText);
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
    // const paragraphs = section.split('\n\n');
    const paragraphs = extractSentences(section);

    const renderParagraphs = paragraphs.map((paragraph, index) => {
      const bulletPattern = /^(\d|-|\u2022)..*/;
      const matchList =
        paragraph.startsWith('1.' || '-' || '*' || '•') &&
        paragraph.match(bulletPattern);

      if (matchList) {
        console.log('matched list!');
        const bulletItemsPattern =
          /^(\d+\..*?(?:\s+-[\s\S]*)?)([\s\S]+?)(?=(?!\s*[-])$)/gm;
        const listItems = paragraph
          .match(bulletItemsPattern)
          ?.map((item, itemIdx) => {
            // if (item.includes('\n')) item = item.replaceAll('\n', '<br>');
            if (item.match(/^\d+\.\s*/)) console.log('matched!');
            item = item.replace(/^\d+\.\s*/, '').trim();
            return <li key={itemIdx}>{item}</li>;
          });

        return <ol key={index}>{listItems}</ol>;
      }

      const lines = paragraph.split('\n');

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
        // console.log(
        //   'lineidx: ',
        //   lineIndex,
        //   'content: ',
        //   line,
        //   'linelength',
        //   line.length,
        // );
        if (
          (line.length === 0 && lineIndex === 0) ||
          (line.length === 0 && lineIndex === 1) ||
          (line.length === 1 && lineIndex === 0)
        ) {
          console.log('filtered', lineIndex);
          console.log('filteredline', line);
          return;
        }

        return (
          <React.Fragment key={lineIndex}>
            {lineIndex !== 1 ? `${line.trim()}` : ''}
            {lineIndex !== 1 ? <br /> : ''}
          </React.Fragment>
        );
      });

      return <p key={index}>{renderLines}</p>;
    });

    return <div key={sectionIndex}>{renderParagraphs}</div>;
  });

  return <ParagraphBox>{renderSections}</ParagraphBox>;
};

export default TextWithFormatting;
