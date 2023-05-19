package com.codestates.seb43_main_012.collection;

import com.codestates.seb43_main_012.bookmark.BookmarkRepository;
import com.codestates.seb43_main_012.category.Category;
import com.codestates.seb43_main_012.category.CategoryRepository;
import com.codestates.seb43_main_012.conversation.Conversation;
import com.codestates.seb43_main_012.conversation.ConversationService;
import com.codestates.seb43_main_012.member.service.MemberService;
import com.codestates.seb43_main_012.tag.entitiy.ConversationTag;
import com.codestates.seb43_main_012.tag.entitiy.Tag;
import com.codestates.seb43_main_012.tag.repository.ConversationTagRepository;
import com.codestates.seb43_main_012.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/collections")
@RequiredArgsConstructor
public class CollectionController {

    private final Long MEMBER_ID = 1L;

    private final ConversationService conversationService;
    private final MemberService memberService;
    private final BookmarkRepository bookmarkRepository;
    private final CollectionMapper collectionMapper;
    private final CategoryRepository categoryRepository;
    private final ConversationTagRepository conversationTagRepository;
    private final TagRepository tagRepository;
//    public CollectionController(ConversationService conversationService,
//                                MemberService memberService,
//                                BookmarkRepository bookmarkRepository,
//                                CollectionMapper collectionMapper,
//                                CategoryRepository categoryRepository,
//                                ConversationTagRepository conversationTagRepository)
//    {
//        this.conversationService = conversationService;
//        this.memberService = memberService;
//        this.bookmarkRepository = bookmarkRepository;
//        this.collectionMapper = collectionMapper;
//        this.categoryRepository = categoryRepository;
//        this.conversationTagRepository = conversationTagRepository;
//    }

    @GetMapping
    public ResponseEntity getCollections()
    {
        //북마크 테이블 조회는 해당 카테고리를 골랐을 때
        List<Category> categories = categoryRepository.findAllByMemberId(MEMBER_ID);

        List<Conversation> conversations = conversationService.getSavedConversation(true);

        List<Long> convIds = new ArrayList<>();
        conversations.stream().forEach(conv -> convIds.add(conv.getConversationId()));
        // 테이블을 조인 시켜서 ?

        //내가 작성한 대화의 id를 리스트로 뽑아내서 tag table을 조회
        //List<ConversationTag> conversationTags = conversationTagRepository.findAllByConversationIdIn(convIds);
        List<Tag> tags = tagRepository.findAll();
//        tagService.
//                conversation_tag조회할때 saved된 대화id리스트를 사용 -> chatgpt참고;
        //List<Bookmark> bookmark = bookmarkRepository.findAllByMemberId(1L);

        return new ResponseEntity<>(collectionMapper.responseForGetCollectionPage(conversations, categories, tags), HttpStatus.OK);
    }
}