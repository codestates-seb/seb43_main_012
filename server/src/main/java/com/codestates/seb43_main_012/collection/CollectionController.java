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
    private final CollectionMapper collectionMapper;
    private final CategoryRepository categoryRepository;
    private final ConversationTagRepository conversationTagRepository;

    @GetMapping
    public ResponseEntity getCollections(@AuthenticationPrincipal MemberEntity member)
    {
        Long memberId = member.getId();

        List<Category> categories = categoryRepository.findAllByMemberId(memberId, Sort.by(Sort.Direction.DESC, "id"));

        List<Conversation> conversations = conversationService.getSavedConversation(memberId,true);

        List<Long> convIDs = new ArrayList<>();
        conversations.stream().forEach(conv -> convIDs.add(conv.getConversationId()));

        List<ConversationTag> conversationTags = conversationTagRepository.findAllByConversationConversationIdIn(convIDs);

        return new ResponseEntity<>(collectionMapper.responseForGetCollectionPage(conversations, categories, conversationTags), HttpStatus.OK);
    }
}
