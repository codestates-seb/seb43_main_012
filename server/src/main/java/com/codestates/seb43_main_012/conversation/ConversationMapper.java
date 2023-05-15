package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.collection.CollectionDto;
import com.codestates.seb43_main_012.member.dto.MemberDto;
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

    public ConversationDto.Response responseForGetOneConversation(Conversation conversation)
    {
        Long conversationId = conversation.getConversationId();
        String title = conversation.getTitle();
        List<String> bookmarks = stringToList(conversation.getBookmarks());
        List<String> tag = stringToList(conversation.getTags());

        List<QnADto.Response> qnaResponseList = new ArrayList<>();
        conversation.getQnaList().stream().forEach(qna ->
                    qnaResponseList.add(qnaMapper.qnaToQnAResponseDto(qna))
        );

        ConversationDto.Response response = new ConversationDto.Response(
                conversationId,
                new MemberDto.ResponseForConversation(conversation.getMember().getId(),conversation.getMember().getUsername()),
                title,
                qnaResponseList,
                bookmarks,
                tag,
                conversation.getSaved(),
                conversation.getPinned(),
                conversation.getPublished(),
                conversation.getViewCount(),
                conversation.getActivityLevel()
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

    public ConversationDto.ResponseForAll conversationToConversationResponseDto(Conversation conv)
    {
        ConversationDto.ResponseForAll response =
                new ConversationDto.ResponseForAll(
                        conv.getConversationId(),
                        new MemberDto.ResponseForConversation(conv.getMember().getId(),conv.getMember().getUsername()),
                        conv.getTitle(),
                        conv.getAnswerSummary(),
                        conv.getModifiedAt(),
                        stringToList(conv.getBookmarks()),
                        stringToList(conv.getTags()),
                        conv.getSaved(),
                        conv.getPinned(),
                        conv.getPublished(),
                        conv.getViewCount(),
                        conv.getActivityLevel()
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
                                        new MemberDto.ResponseForConversation(conv.getMember().getId(),conv.getMember().getUsername()),
                                        conv.getTitle(),
                                        conv.getAnswerSummary(),
                                        conv.getModifiedAt(),
                                        stringToList(conv.getBookmarks()),
                                        stringToList(conv.getTags()),
                                        conv.getSaved(),
                                        conv.getPinned(),
                                        conv.getPublished(),
                                        conv.getViewCount(),
                                        conv.getActivityLevel()
                        );
                        responses.add(response);
                    }
        );

        return responses;
    }


    private List<String> stringToList(String str)
    {
        List<String> list = new ArrayList<>();
        if(str == null || str.equals("[]")) return list;

        Arrays.stream(str.substring(1,str.length()-1).split(","))
                .forEach(subStr -> list.add(subStr.replace("\"","")));

        return list;
    }
}
