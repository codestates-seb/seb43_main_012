package com.codestates.seb43_main_012.collection;

import com.codestates.seb43_main_012.bookmark.BookmarkRepository;
import com.codestates.seb43_main_012.category.Category;
import com.codestates.seb43_main_012.category.CategoryRepository;
import com.codestates.seb43_main_012.conversation.Conversation;
import com.codestates.seb43_main_012.conversation.ConversationService;
import com.codestates.seb43_main_012.member.entity.MemberEntity;
import com.codestates.seb43_main_012.member.service.MemberService;
import com.codestates.seb43_main_012.tag.entitiy.ConversationTag;
import com.codestates.seb43_main_012.tag.entitiy.Tag;
import com.codestates.seb43_main_012.tag.repository.ConversationTagRepository;
import com.codestates.seb43_main_012.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/collections")
@RequiredArgsConstructor
public class CollectionController {

    private final ConversationService conversationService;
    private final MemberService memberService;
    private final BookmarkRepository bookmarkRepository;
    private final CollectionMapper collectionMapper;
    private final CategoryRepository categoryRepository;
    private final ConversationTagRepository conversationTagRepository;
    private final TagRepository tagRepository;

    @GetMapping
    public ResponseEntity getCollections(@AuthenticationPrincipal MemberEntity member)
    {
        Long memberId = member.getId();

        //북마크 테이블 조회는 해당 카테고리를 골랐을 때
        List<Category> categories = categoryRepository.findAllByMemberId(memberId, Sort.by(Sort.Direction.DESC, "id"));

        List<Conversation> conversations = conversationService.getSavedConversation(memberId,true);

        List<Long> convIDs = new ArrayList<>();
        conversations.stream().forEach(conv -> convIDs.add(conv.getConversationId()));
        // 테이블을 조인 시켜서 ?

        //내가 작성한 대화의 id를 리스트로 뽑아내서 tag table을 조회
        //List<ConversationTag> conversationTags = conversationTagRepository.findAllByConversationIdIn(convIds);
//        tagService.
//                conversation_tag조회할때 saved된 대화id리스트를 사용 -> chatgpt참고;
        //List<Bookmark> bookmark = bookmarkRepository.findAllByMemberId(1L);

        List<ConversationTag> conversationTags = conversationTagRepository.findAllByConversationConversationIdIn(convIDs);
        List<Tag> tags = new ArrayList<>();

        //conversationTags.stream().forEach(convTag -> tags.add());

        return new ResponseEntity<>(collectionMapper.responseForGetCollectionPage(conversations, categories, conversationTags), HttpStatus.OK);
    }
}
