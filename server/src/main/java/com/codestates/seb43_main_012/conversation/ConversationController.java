package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.bookmark.Bookmark;
import com.codestates.seb43_main_012.bookmark.BookmarkRepository;
import com.codestates.seb43_main_012.qna.QnAService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/conversation")
public class ConversationController {

    @Value("${apikey}")
    private String API_KEY;
    private static final String API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
    private final ConversationService conversationService;
    private final BookmarkRepository bookmarkRepository;
    private final QnAService qnaService;

    public ConversationController(ConversationService conversationService,
                                  BookmarkRepository bookmarkRepository,
                                  QnAService qnaService)
    {
        this.conversationService = conversationService;
        this.bookmarkRepository = bookmarkRepository;
        this.qnaService = qnaService;
    }

    @PostMapping
    public ResponseEntity generateConversation(long memberId) // memberId 대신 토큰
    {
        Conversation conversation = new Conversation();
        // conversation.setTitle("abc"); // 자동생성 또는 처음질문
        conversation.setMemberId(memberId);
        Conversation savedConversation = conversationService.saveConversation(conversation);

        return new ResponseEntity<>(savedConversation,HttpStatus.CREATED);
    }

    @GetMapping("/{conversation-id}")
    public ResponseEntity getConversation(@PathVariable("conversation-id") long conversationId)
    {
        //Conversation conversation = conversationService.findConversation(conversationId);


        return new ResponseEntity<>(qnaService.buildMessage(conversationId),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getConversations(@RequestParam(value = "sort", required = false) String sort,
                                           @RequestParam(value = "bookmarked", required = false) String bookmarked)
    {
        if(sort == null) sort = "desc";
        if(bookmarked == null) bookmarked = "false";
        return new ResponseEntity<>(conversationService.findConversations(sort,bookmarked),HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity getBookmarkedConversations()
//    {
//        return new ResponseEntity<>(conversationService.findConversations(bookmarked),HttpStatus.OK);
//    }

    @PostMapping("/{conversation-id}/bookmark")
    public ResponseEntity bookmarkConversation(@PathVariable("conversation-id") long conversationId,
                                               long memberId)
    {
        //북마크가 된 상태인지 확인
        if(conversationService.findConversation(conversationId).getBookmarked()==true) throw new RuntimeException("이미 북마크");
        Bookmark bookmark = new Bookmark();
        //bookmark.addMember(new MemberEntity(memberId,"a","a","a"));
        bookmark.setMemberId(memberId);
        Conversation conversation = conversationService.findConversation(conversationId);
        conversation.setBookmarked(true);
        bookmark.addConversation(conversationService.saveConversation(conversation));
        Bookmark savedBookmark = bookmarkRepository.save(bookmark);

        return new ResponseEntity<>(savedBookmark,HttpStatus.OK);
    }
}
