package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.collection.CollectionDto;
import com.codestates.seb43_main_012.qna.QnA;
import com.codestates.seb43_main_012.qna.QnADto;
import com.codestates.seb43_main_012.qna.QnAMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class ConversationMapper {

    private final QnAMapper qnaMapper;

    public ConversationMapper(QnAMapper qnaMapper)
    {
        this.qnaMapper = qnaMapper;
    }

    public ConversationDto.Response conversationToConversationResponseDto(List<QnA> qnaList)
    {
        if(qnaList.isEmpty()) return new ConversationDto.Response();

        Conversation conversation = qnaList.get(0).getConversation();
        Long conversationId = conversation.getConversationId();
        String title = conversation.getTitle();
        List<String> bookmarks = stringToList(conversation.getBookmarks());
        List<String> tag = stringToList(conversation.getTags());

        List<QnADto.Response> qnaResponseList = new ArrayList<>();
        qnaList.stream().forEach(qna ->
                    qnaResponseList.add(qnaMapper.qnaToQnAResponseDto(qna))
        );

        ConversationDto.Response response = new ConversationDto.Response(
                conversationId,
                title,
                bookmarks,
                tag,
                qnaResponseList
        );


        return response;
    }

    public CollectionDto.Response conversationToCollectionResponseDto(Conversation conversation)
    {
        CollectionDto.Response response = new CollectionDto.Response(
                conversation.getConversationId(),
                stringToList(conversation.getBookmarks()),
                stringToList(conversation.getTags()),
                conversation.getPinned(),
                conversation.getTitle()
        );
        return response;
    }

    public List<ConversationDto.ResponseForAll> conversationsToConversationResponseDtos(List<Conversation> conversations)
    {
        List<ConversationDto.ResponseForAll> responses = new ArrayList<>();

        conversations.stream()
                .forEach(conv ->
                    {
                        ConversationDto.ResponseForAll response =
                                new ConversationDto.ResponseForAll(
                                    conv.getConversationId(),
                                    conv.getMemberId(),
                                    conv.getTitle(),
                                    conv.getAnswerSummary(),
                                    conv.getModifiedAt(),
                                    stringToList(conv.getBookmarks()),
                                    stringToList(conv.getTags()),
                                    conv.getSaved(),
                                    conv.getPinned()
                        );
                        responses.add(response);
                    }
        );

        return responses;
    }

    private List<String> stringToList(String str)
    {
        List<String> list = new ArrayList<>();
        if(str.equals("[]")) return list;

        Arrays.stream(str.substring(1,str.length()-1).split(","))
                .forEach(subStr -> list.add(subStr.replace("\"","")));

        return list;
    }
}
