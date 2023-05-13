package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.bookmark.Bookmark;
import com.codestates.seb43_main_012.bookmark.BookmarkRepository;
import com.codestates.seb43_main_012.collection.CollectionDto;
import com.codestates.seb43_main_012.qna.QnA;
import com.codestates.seb43_main_012.qna.QnADto;
import com.codestates.seb43_main_012.qna.QnAService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/conversation")
public class ConversationController {

    @Value("${apikey}")
    private String API_KEY;
    private static final String API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
    private final ConversationService conversationService;
    private final ConversationMapper mapper;
    private final BookmarkRepository bookmarkRepository;
    private final QnAService qnaService;

    public ConversationController(ConversationService conversationService,
                                  ConversationMapper mapper,
                                  BookmarkRepository bookmarkRepository,
                                  QnAService qnaService)
    {
        this.conversationService = conversationService;
        this.mapper = mapper;
        this.bookmarkRepository = bookmarkRepository;
        this.qnaService = qnaService;
    }

    private long memberId = 1L;

    @PostMapping
    public ResponseEntity generateConversation(@RequestBody QnADto.Post dto)
    {
        Conversation conversation = conversationService.createConversation(memberId);
        long conversationId = conversation.getConversationId();;
        dto.setConversationId(conversationId);
        qnaService.requestAnswer(dto);
        //ConversationDto.Response response = mapper.conversationToConversationResponseDto(conversation);
        Conversation savedConversation = conversationService.findConversation(conversationId);
        return new ResponseEntity<>(savedConversation, HttpStatus.CREATED);
    }

    @GetMapping("/{conversation-id}")
    public ResponseEntity getConversation(@PathVariable("conversation-id") long conversationId)
    {
        //List<QnA> qnaList = qnaService.findQnAs(conversationId);
        Conversation conversation = conversationService.viewCountUp(conversationId);
        //List<QnA> qnaList = qnaService.findQnAs(conversationId);
        ConversationDto.Response response = mapper.responseForGetOneConversation(conversation);
        //response.setConversationId(conversationId);

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

    @PostMapping("/{conversation-id}/collection")
    public ResponseEntity collectConversation(@PathVariable("conversation-id") long conversationId,
                                              @RequestBody CollectionDto.Post collectionDto)
    {
        Conversation savedConversation = conversationService.createCollection(conversationId, collectionDto);

        return new ResponseEntity<>(mapper.conversationToCollectionResponseDto(savedConversation),HttpStatus.OK);
    }

    @PostMapping("/{conversation-id}/bookmark")
    public ResponseEntity bookmarkConversation(@PathVariable("conversation-id") long conversationId,
                                               long memberId)
    {
        if(conversationService.findConversation(conversationId).getBookmarks() != null) throw new RuntimeException("이미 북마크");

        Bookmark bookmark = new Bookmark();
        bookmark.setMemberId(memberId);
        Conversation conversation = conversationService.findConversation(conversationId);
        conversation.setBookmarks("Y");
        bookmark.addConversation(conversationService.saveConversation(conversation));
        Bookmark savedBookmark = bookmarkRepository.save(bookmark);

        return new ResponseEntity<>(savedBookmark,HttpStatus.OK);
    }
}
