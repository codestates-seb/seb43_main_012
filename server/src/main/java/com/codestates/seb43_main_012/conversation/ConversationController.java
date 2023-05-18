package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.bookmark.Bookmark;
import com.codestates.seb43_main_012.bookmark.BookmarkDto;
import com.codestates.seb43_main_012.bookmark.BookmarkRepository;
import com.codestates.seb43_main_012.category.Category;
import com.codestates.seb43_main_012.category.CategoryRepository;
import com.codestates.seb43_main_012.qna.QnADto;
import com.codestates.seb43_main_012.qna.QnAService;
import com.codestates.seb43_main_012.tag.dto.TagDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
    private final CategoryRepository categoryRepository;



    private final long MEMBER_ID = 1L;

    @PostMapping
    public ResponseEntity generateConversation(@RequestBody QnADto.Post dto)
    {
        Conversation savedConversation = conversationService.createConversation(MEMBER_ID, dto);

        return new ResponseEntity<>(savedConversation, HttpStatus.CREATED);
    }

    @GetMapping("/{conversation-id}")
    public ResponseEntity getConversation(@PathVariable("conversation-id") long conversationId)
    {
        Conversation conversation = conversationService.viewCountUp(conversationId);

        // 이 부분 서비스 클래스로 분리해야함
        List<Long> conversationCategoryIDs = new ArrayList<>();
        conversation.getBookmarks().stream().forEach(category -> conversationCategoryIDs.add(category.getBookmarkId()));

        if(conversationCategoryIDs.isEmpty()) conversationCategoryIDs.add(0L);

        List<Category> categories = categoryRepository.findAllByMemberIdAndIdNotIn(MEMBER_ID, conversationCategoryIDs);

        ConversationDto.Response response = mapper.responseForGetOneConversation(conversation, categories);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getConversations(@RequestParam(value = "sort", required = false) String sort)
    {
        if(sort == null) sort = "desc";
        List<Conversation> conversations = conversationService.findConversations(sort);
        List<ConversationDto.ResponseForAll> responses = mapper.conversationsToConversationResponseDtos(conversations);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PostMapping("/{conversation-id}/bookmarks")
    public ResponseEntity bookmarkConversation(@PathVariable("conversation-id") long conversationId,
                                              @RequestBody BookmarkDto.Post bookmarkDto)
    {
        Conversation savedConversation = conversationService.createBookmark(conversationId, bookmarkDto);

        return new ResponseEntity<>(mapper.simpleMessageResponse("북마크 추가 성공"), HttpStatus.OK);
    }

    @DeleteMapping("/{conversation-id}/bookmarks/{bookmark-id}")
    public ResponseEntity deleteConversationBookmark(@PathVariable("conversation-id") long conversationId,
                                                     @PathVariable("bookmark-id") long bookmarkId)
    {
        Conversation savedConversation = conversationService.cancelBookmark(conversationId, bookmarkId);
        conversationService.setSaveStatus(savedConversation);

        return new ResponseEntity<>(mapper.simpleMessageResponse("북마크 삭제 성공"), HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{conversation-id}/tags")
    public ResponseEntity tagConversation(@PathVariable("conversation-id") long conversationId,
                                              @RequestBody TagDto.Post tagDto)
    {
        Conversation savedConversation = conversationService.createTag(conversationId, tagDto);

        return new ResponseEntity<>(mapper.simpleMessageResponse("태그 추가 성공"),HttpStatus.OK);
    }

    @DeleteMapping("/{conversation-id}/tags/{tag-id}")
    public ResponseEntity deleteConversationTag(@PathVariable("conversation-id") long conversationId,
                                                @PathVariable("tag-id") long tagId)
    {
        Conversation savedConversation = conversationService.deleteTag(conversationId, tagId);
        conversationService.setSaveStatus(savedConversation);

        return new ResponseEntity<>(mapper.simpleMessageResponse("태그 삭제 성공"),HttpStatus.NO_CONTENT);
    }

    @GetMapping("/bookmarks/{bookmark-name}")
    public ResponseEntity bookmarkConversation(@PathVariable("bookmark-name") String bookmarkName)
    {
        List<Bookmark> bookmarks = conversationService.findBookmarkedConversations(bookmarkName);

        return new ResponseEntity<>(bookmarks,HttpStatus.OK);
    }

    @DeleteMapping("/{conversation-id}")
    public ResponseEntity deleteConversation(@PathVariable("conversation-id") long conversationId)
    {
        conversationService.removeConversation(conversationId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
