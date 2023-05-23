package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.bookmark.Bookmark;
import com.codestates.seb43_main_012.bookmark.BookmarkDto;
import com.codestates.seb43_main_012.bookmark.BookmarkRepository;
import com.codestates.seb43_main_012.category.Category;
import com.codestates.seb43_main_012.category.CategoryRepository;
import com.codestates.seb43_main_012.member.entity.MemberEntity;
import com.codestates.seb43_main_012.qna.QnADto;
import com.codestates.seb43_main_012.qna.QnAService;
import com.codestates.seb43_main_012.response.MultiResponseDto;
import com.codestates.seb43_main_012.tag.dto.TagDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


@RestController
@RequestMapping("/conversations")
@RequiredArgsConstructor
public class ConversationController {

    private final ConversationService conversationService;
    private final ConversationMapper mapper;


    @PostMapping
    public ResponseEntity generateConversation(@RequestBody QnADto.Post dto,
                                               @AuthenticationPrincipal MemberEntity member)
    {
        Long memberId = member.getId();

        Conversation savedConversation = conversationService.createConversation(memberId, dto);

        ConversationDto.Response response = conversationService.getConversationAndCategoryList(savedConversation, memberId);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{conversation-id}")
    public ResponseEntity patchConversation(@PathVariable("conversation-id") long conversationId,
                                            @RequestBody ConversationDto.Patch dto)
    {
        Conversation conversation = conversationService.updateConversation(conversationId, dto);

        return new ResponseEntity<>(conversation, HttpStatus.OK);
    }

    @GetMapping("/{conversation-id}")
    public ResponseEntity getConversation(@PathVariable("conversation-id") long conversationId,
                                          @AuthenticationPrincipal MemberEntity member)
    {
        Long memberId = member.getId();

        ConversationDto.Response response = conversationService.viewConversationAndCategoryList(conversationId, memberId);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getConversations(@RequestParam(value = "sort", required = false) String sort,
                                           @RequestParam(value = "q", required = false) String query,
                                           @RequestParam(value = "page", required = false) Integer page,
                                           @AuthenticationPrincipal MemberEntity member) {
        Long memberId = member.getId();

        if (sort == null) sort = "desc";
        int size = 10;

        List<Conversation> conversations;
        if (page == null)
        {
            conversations = conversationService.findConversationList(sort, query, memberId);
            List<ConversationDto.ResponseForAll> responses = mapper.conversationsToConversationResponseDtos(conversations);
            return new ResponseEntity<>(responses, HttpStatus.OK);
        }
        else
        {
            Page<Conversation> conversationPage = conversationService.findConversations(sort, query, memberId, page-1, size);
            conversations = conversationPage.getContent();
            List<ConversationDto.ResponseForAll> responses = mapper.conversationsToConversationResponseDtos(conversations);
            return new ResponseEntity<>(new MultiResponseDto<>(responses, conversationPage), HttpStatus.OK);
        }
    }

    @PostMapping("/{conversation-id}/bookmarks")
    public ResponseEntity bookmarkConversation(@PathVariable("conversation-id") long conversationId,
                                               @RequestBody BookmarkDto.Post bookmarkDto,
                                               @AuthenticationPrincipal MemberEntity member)
    {
        Long memberId = member.getId();

        long bookmarkId = conversationService.createBookmark(conversationId, bookmarkDto, memberId);

        return new ResponseEntity<>(mapper.postBookmarkResponse(bookmarkId,bookmarkDto.getBookmarkName()), HttpStatus.OK);
    }

    @DeleteMapping("/{conversation-id}/bookmarks/{bookmark-id}")
    public ResponseEntity deleteConversationBookmark(@PathVariable("conversation-id") long conversationId,
                                                     @PathVariable("bookmark-id") long bookmarkId,
                                                     @AuthenticationPrincipal MemberEntity member)
    {
        Long memberId = member.getId();

        Conversation savedConversation = conversationService.cancelBookmark(conversationId, bookmarkId, memberId);
        conversationService.setSaveStatus(savedConversation);

        return new ResponseEntity<>(mapper.simpleMessageResponse("북마크 삭제 성공"), HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{conversation-id}/tags")
    public ResponseEntity tagConversation(@PathVariable("conversation-id") long conversationId,
                                          @RequestBody TagDto.Post tagDto,
                                          @AuthenticationPrincipal MemberEntity member)
    {
        long tagId = conversationService.createTag(conversationId, tagDto);

        return new ResponseEntity<>(mapper.postTagResponse(tagId,tagDto.getTagName()),HttpStatus.OK);
    }

    @DeleteMapping("/{conversation-id}/tags/{tag-id}")
    public ResponseEntity deleteConversationTag(@PathVariable("conversation-id") long conversationId,
                                                @PathVariable("tag-id") long tagId,
                                                @AuthenticationPrincipal MemberEntity member)
    {
        Conversation savedConversation = conversationService.deleteTag(conversationId, tagId);
        conversationService.setSaveStatus(savedConversation);

        return new ResponseEntity<>(mapper.simpleMessageResponse("태그 삭제 성공"),HttpStatus.NO_CONTENT);
    }

    @GetMapping("/bookmarks/{bookmark-name}")
    public ResponseEntity getBookmarkedConversation(@PathVariable("bookmark-name") String categoryName,
                                                    @AuthenticationPrincipal MemberEntity member)
    {
        Long memberId = member.getId();

        List<Conversation> conversations = conversationService.findBookmarkedConversations(categoryName, memberId);
        List<ConversationDto.ResponseForAll> responses = mapper.conversationsToConversationResponseDtos(conversations);
        return new ResponseEntity<>(responses,HttpStatus.OK);
    }

    @GetMapping("/tags/{tag-name}")
    public ResponseEntity getTaggedConversation(@PathVariable("tag-name") String tagName,
                                                @AuthenticationPrincipal MemberEntity member)
    {
        Long memberId = member.getId();

        List<Conversation> conversations = conversationService.findTaggedConversations(tagName, memberId);
        List<ConversationDto.ResponseForAll> responses = mapper.conversationsToConversationResponseDtos(conversations);
        return new ResponseEntity<>(responses,HttpStatus.OK);
    }

    @DeleteMapping("/{conversation-id}")
    public ResponseEntity deleteConversation(@PathVariable("conversation-id") long conversationId,
                                             @AuthenticationPrincipal MemberEntity member)
    {
        conversationService.removeConversation(conversationId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity deleteConversations()
    {
        conversationService.removeAll();

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{conversation-id}/time")
    public ResponseEntity setModifiedAt(@PathVariable("conversation-id") long conversationId,
                                        @RequestBody ConversationDto.ModifiedAt modifiedAt)
    {
        conversationService.setModifiedAtCustom(conversationId, modifiedAt);

        return new ResponseEntity(HttpStatus.OK);
    }
}
