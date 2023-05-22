package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.bookmark.Bookmark;
import com.codestates.seb43_main_012.bookmark.BookmarkDto;
import com.codestates.seb43_main_012.bookmark.BookmarkRepository;
import com.codestates.seb43_main_012.category.Category;
import com.codestates.seb43_main_012.category.CategoryRepository;
import com.codestates.seb43_main_012.member.entity.MemberEntity;
import com.codestates.seb43_main_012.qna.QnADto;
import com.codestates.seb43_main_012.qna.QnAService;
import com.codestates.seb43_main_012.tag.dto.TagDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


@RestController
@RequestMapping("/conversations")
@RequiredArgsConstructor
public class ConversationController {

    @Value("${apikey}")
    private String API_KEY;
    private static final String API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
    private final ConversationService conversationService;
    private final ConversationMapper mapper;
    private final BookmarkRepository bookmarkRepository;
    private final QnAService qnaService;


    @PostMapping
    public ResponseEntity generateConversation(@RequestBody QnADto.Post dto,
                                               @AuthenticationPrincipal MemberEntity member)
    {
        Long memberId = member.getId();

        Conversation savedConversation = conversationService.createConversation(memberId, dto);

        return new ResponseEntity<>(savedConversation, HttpStatus.CREATED);
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

        ConversationDto.Response response = conversationService.getConversationAndCategoryList(conversationId, memberId);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getConversations(@RequestParam(value = "sort", required = false) String sort,
                                           @RequestParam(value = "q", required = false) String query,
                                           @AuthenticationPrincipal MemberEntity member)
    {
        Long memberId = member.getId();

        if(sort == null) sort = "desc";
        List<Conversation> conversations = conversationService.findConversations(sort, query, memberId);
        List<ConversationDto.ResponseForAll> responses = mapper.conversationsToConversationResponseDtos(conversations);
        return new ResponseEntity<>(responses, HttpStatus.OK);
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

}
