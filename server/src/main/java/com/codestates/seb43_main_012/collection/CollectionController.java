package com.codestates.seb43_main_012.collection;

import com.codestates.seb43_main_012.bookmark.BookmarkCategory;
import com.codestates.seb43_main_012.bookmark.BookmarkCategoryRepository;
import com.codestates.seb43_main_012.bookmark.BookmarkRepository;
import com.codestates.seb43_main_012.category.Category;
import com.codestates.seb43_main_012.category.CategoryRepository;
import com.codestates.seb43_main_012.conversation.Conversation;
import com.codestates.seb43_main_012.conversation.ConversationService;
import com.codestates.seb43_main_012.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/collections")
public class CollectionController {

    private final Long MEMBER_ID = 1L;

    private final ConversationService conversationService;
    private final MemberService memberService;
    private final BookmarkRepository bookmarkRepository;
    private final CollectionMapper collectionMapper;
    private final CategoryRepository categoryRepository;
    public CollectionController(ConversationService conversationService,
                                MemberService memberService,
                                BookmarkRepository bookmarkRepository,
                                CollectionMapper collectionMapper,
                                CategoryRepository categoryRepository)
    {
        this.conversationService = conversationService;
        this.memberService = memberService;
        this.bookmarkRepository = bookmarkRepository;
        this.collectionMapper = collectionMapper;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public ResponseEntity getCollections()
    {
        //북마크 테이블 조회는 해당 카테고리를 골랐을 때
        List<Category> categories = categoryRepository.findAllByMemberId(MEMBER_ID);

        List<Conversation> conversations = conversationService.getSavedConversation(true);
//        tagService.
//                conversation_tag조회할때 saved된 대화id리스트를 사용 -> chatgpt참고;
        //List<Bookmark> bookmark = bookmarkRepository.findAllByMemberId(1L);

        return new ResponseEntity<>(collectionMapper.responseForGetCollectionPage(conversations, categories), HttpStatus.OK);
    }
}
