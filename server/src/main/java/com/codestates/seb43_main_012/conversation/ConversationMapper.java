package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.bookmark.BookmarkDto;
import com.codestates.seb43_main_012.category.Category;
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

import java.util.*;

@Component
@RequiredArgsConstructor
public class ConversationMapper {

    private final QnAMapper qnaMapper;
    private final TagRepository tagRepository;
//    public ConversationMapper(QnAMapper qnaMapper)
//    {
//        this.qnaMapper = qnaMapper;
//    }

    public ConversationDto.Response responseForGetOneConversation(Conversation conversation, List<Category> categories)
    {


        List<Tag> tags = new ArrayList<>();
        conversation.getTags().stream().forEach(conversationTag-> tags.add(tagRepository.findById(conversationTag.getTagId()).orElse(null)));

        List<QnADto.Response> qnaResponseList = new ArrayList<>();
        conversation.getQnaList().stream().forEach(qna ->
                    qnaResponseList.add(qnaMapper.qnaToQnAResponseDto(qna))
        );

        ConversationDto.Response response = new ConversationDto.Response(
                conversation.getConversationId(),
                new MemberDto.ResponseForConversation(conversation.getMember().getId(),conversation.getMember().getUsername()),
                conversation.getTitle(),
                qnaResponseList,
                conversation.getBookmarks(),
                categoriesToCategoryResponseDtos(categories),
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
                conversationCategoriesToCategoryResponseDtos(conversation.getBookmarks()),
                conversation.getTags(),
                conversation.getPinned(),
                conversation.getTitle()
        );
        return response;
    }

    private List<ConversationCategoryDto> conversationCategoriesToCategoryResponseDtos(List<ConversationCategory> conversationCategories)
    {
        List<ConversationCategoryDto> responses = new ArrayList<>();
        conversationCategories.stream().forEach(category -> responses.add(conversationCategoryToCategoryResponseDto(category)));

        return responses;
    }

    private ConversationCategoryDto conversationCategoryToCategoryResponseDto(ConversationCategory conversationCategory)
    {
        ConversationCategoryDto response = new ConversationCategoryDto(
                conversationCategory.getBookmarkId(),
                conversationCategory.getBookmarkName()
        );

        return response;
    }

    private List<ConversationCategoryDto> categoriesToCategoryResponseDtos(List<Category> categories)
    {
        List<ConversationCategoryDto> responses = new ArrayList<>();
        categories.stream().forEach(category -> responses.add(categoryToCategoryResponseDto(category)));

        return responses;
    }

    private ConversationCategoryDto categoryToCategoryResponseDto(Category category)
    {
        ConversationCategoryDto response = new ConversationCategoryDto(
                category.getId(),
                category.getName()
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

    public Map<String, String> simpleMessageResponse(String message)
    {
        Map<String,String> response = new HashMap<>();
        response.put("message",message);

        return response;
    }
    public Map<String, Object> postBookmarkResponse(long bookmarkId, String bookmarkName)
    {
        Map<String,Object> response = new HashMap<>();

        response.put("bookmarkId", bookmarkId);
        response.put("bookmarkName", bookmarkName);

        return response;
    }
    public Map<String, Object> postTagResponse(long tagId, String tagName)
    {
        Map<String,Object> response = new HashMap<>();

        response.put("tagId", tagId);
        response.put("tagName", tagName);

        return response;
    }
}
