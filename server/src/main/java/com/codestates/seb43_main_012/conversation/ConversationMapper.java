package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.category.ConversationCategory;
import com.codestates.seb43_main_012.category.ConversationCategoryDto;
import com.codestates.seb43_main_012.collection.CollectionDto;
import com.codestates.seb43_main_012.member.dto.MemberDto;
import com.codestates.seb43_main_012.qna.QnADto;
import com.codestates.seb43_main_012.qna.QnAMapper;
import com.codestates.seb43_main_012.tag.entitiy.Tag;
import com.codestates.seb43_main_012.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ConversationMapper {

    private final QnAMapper qnaMapper;
    private final TagRepository tagRepository;
//    public ConversationMapper(QnAMapper qnaMapper)
//    {
//        this.qnaMapper = qnaMapper;
//    }

    public ConversationDto.Response responseForGetOneConversation(Conversation conversation)
    {
        Long conversationId = conversation.getConversationId();
        String title = conversation.getTitle();
        List<ConversationCategory> bookmarks = conversation.getBookmarks();

        List<Tag> tags = new ArrayList<>();
        conversation.getTags().stream().forEach(conversationTag-> tags.add(tagRepository.findById(conversationTag.getTagId()).orElse(null)));

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
                tags,
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
                categoriesToCategoryResponseDtos(conversation.getBookmarks()),
                conversation.getTags(),
                conversation.getPinned(),
                conversation.getTitle()
        );
        return response;
    }

    private List<ConversationCategoryDto> categoriesToCategoryResponseDtos(List<ConversationCategory> conversationCategories)
    {
        List<ConversationCategoryDto> responses = new ArrayList<>();
        conversationCategories.stream().forEach(category -> responses.add(categoryToCategoryResponseDto(category)));

        return responses;
    }

    private ConversationCategoryDto categoryToCategoryResponseDto(ConversationCategory conversationCategory)
    {
        ConversationCategoryDto response = new ConversationCategoryDto(
                conversationCategory.getCategoryId(),
                conversationCategory.getCategoryName()
        );

        return response;
    }

    public ConversationDto.ResponseForAll conversationToConversationResponseDto(Conversation conv)
    {
        List<Tag> tags = new ArrayList<>();
        conv.getTags().stream().forEach(conversationTag -> tags.add(tagRepository.findById(conversationTag.getTagId()).orElse(null)));

        ConversationDto.ResponseForAll response =
                new ConversationDto.ResponseForAll(
                        conv.getConversationId(),
                        new MemberDto.ResponseForConversation(conv.getMember().getId(),conv.getMember().getUsername()),
                        conv.getTitle(),
                        conv.getAnswerSummary(),
                        conv.getModifiedAt(),
                        conv.getBookmarks(),
                        tags,
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
                        ConversationDto.ResponseForAll response = conversationToConversationResponseDto(conv);
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
