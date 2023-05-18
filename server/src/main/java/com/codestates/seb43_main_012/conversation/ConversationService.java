package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.bookmark.*;
import com.codestates.seb43_main_012.category.Category;
import com.codestates.seb43_main_012.category.CategoryRepository;
import com.codestates.seb43_main_012.category.ConversationCategory;
import com.codestates.seb43_main_012.category.ConversationCategoryRepository;
import com.codestates.seb43_main_012.member.repository.MemberRepository;
import com.codestates.seb43_main_012.qna.QnADto;
import com.codestates.seb43_main_012.qna.QnAService;
import com.codestates.seb43_main_012.tag.dto.TagDto;
import com.codestates.seb43_main_012.tag.entitiy.ConversationTag;
import com.codestates.seb43_main_012.tag.entitiy.Tag;
import com.codestates.seb43_main_012.tag.repository.ConversationTagRepository;
import com.codestates.seb43_main_012.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ConversationService {

    private final Long MEMBER_ID = 1L;

    private final ConversationRepository conversationRepository;
    private final MemberRepository memberRepository;
    private final BookmarkRepository bookmarkRepository;
    private final CategoryRepository categoryRepository;
    private final ConversationCategoryRepository conversationCategoryRepository;
    private final TagRepository tagRepository;
    private final ConversationTagRepository conversationTagRepository;
    private final QnAService qnaService;
//    public ConversationService(ConversationRepository conversationRepository,
//                               MemberRepository memberRepository,
//                               BookmarkRepository bookmarkRepository,
//                               CategoryRepository categoryRepository,
//                               ConversationCategoryRepository conversationCategoryRepository)
//    {
//        this.conversationRepository = conversationRepository;
//        this.memberRepository = memberRepository;
//        this.bookmarkRepository = bookmarkRepository;
//        this.categoryRepository = categoryRepository;
//        this.conversationCategoryRepository = conversationCategoryRepository;
//    }

    public Conversation saveConversation(Conversation conversation)
    {
        return conversationRepository.save(conversation);
    }

    @Transactional
    public Conversation createConversation(long memberId, QnADto.Post dto)
    {
        Conversation conversation = new Conversation();
        conversation.addMember(memberRepository.findById(memberId).orElse(null));
        Conversation savedConversation = conversationRepository.save(conversation);
        long conversationId = savedConversation.getConversationId();
        dto.setConversationId(conversationId);
        qnaService.requestAnswer(dto);

        return conversationRepository.save(conversation);
    }

    public Conversation updateConversation(long conversationId)
    {
        Optional<Conversation> optional = conversationRepository.findById(conversationId);
        Conversation findConversation = optional.orElseThrow(()->new RuntimeException());

        findConversation.setModifiedAt(String.valueOf(LocalDateTime.now()));
        return conversationRepository.save(findConversation);
    }

    public Conversation findConversation(long conversationId)
    {
        Optional<Conversation> optional = conversationRepository.findById(conversationId);
        Conversation conversation = optional.orElseThrow(()->new RuntimeException("wrong id"));
        return conversation;
    }

    public List<Conversation> findConversations(String sort)
    {
       if(sort.equals("desc"))
            return conversationRepository.findAllByDeleteStatus(false,Sort.by(Sort.Direction.DESC, "modifiedAt"));
        else
            return conversationRepository.findAllByDeleteStatus(false, Sort.by(Sort.Direction.ASC, "modifiedAt"));
    }

    public List<Bookmark> findBookmarkedConversations(String bookmarkName)
    {
        return bookmarkRepository.findAllByBookmarkName(MEMBER_ID,bookmarkName);
    }

    @Transactional
    public Conversation createBookmark(long conversationId, BookmarkDto.Post dto)
    {
        Conversation findConversation = findConversation(conversationId);
        findConversation.setSaved(true);
        findConversation.setBookmarked(true);

        if(bookmarkRepository.findByMemberIdAndConversationConversationId(MEMBER_ID,conversationId).isEmpty())
        {
            Bookmark bookmark = new Bookmark();
            bookmark.setMemberId(MEMBER_ID);
            bookmark.addConversation(findConversation);
            bookmarkRepository.save(bookmark);
        }
        Category category = categoryRepository.findByName(dto.getBookmarkName()).orElse(new Category(MEMBER_ID, dto.getBookmarkName()));
        categoryRepository.save(category);

        Optional<ConversationCategory> optional = conversationCategoryRepository.findByConversationConversationIdAndBookmarkName(conversationId, dto.getBookmarkName());

        if(optional.isEmpty())
        {
            ConversationCategory conversationCategory = new ConversationCategory(
                    findConversation,
                    category.getId(),
                    category.getName()
            );
            conversationCategoryRepository.save(conversationCategory);
        }

        return conversationRepository.save(findConversation);
    }

    @Transactional
    public Conversation cancelBookmark(long conversationId, long bookmarkId)
    {
        Conversation findConversation = findConversation(conversationId);

        conversationCategoryRepository.deleteByConversationConversationIdAndBookmarkId(conversationId, bookmarkId);
        List<ConversationCategory> conversationCategories = conversationCategoryRepository.findAllByConversationConversationId(conversationId);
        if(conversationCategories.isEmpty())
        {
            bookmarkRepository.deleteByMemberIdAndConversationConversationId(MEMBER_ID,conversationId);
            findConversation.setBookmarked(false);
        }


        return conversationRepository.save(findConversation);
    }

    @Transactional
    public Conversation createTag(long conversationId, TagDto.Post tagDto)
    {
        Conversation findConversation = findConversation(conversationId);
        findConversation.setSaved(true);
        findConversation.setTagged(true);

        Tag tag = tagRepository.findByTagName(tagDto.getTagName()).orElse(new Tag(tagDto.getTagName()));
        tagRepository.save(tag);

        Optional<ConversationTag> optional = conversationTagRepository.findByConversationConversationIdAndTagName(conversationId, tagDto.getTagName());

        if(optional.isEmpty())
        {
            ConversationTag conversationTag = new ConversationTag(
                    findConversation,
                    tag.getTagId(),
                    tag.getTagName()
            );
            conversationTagRepository.save(conversationTag);
        }

        return conversationRepository.save(findConversation);
    }

    @Transactional
    public Conversation deleteTag(long conversationId, long tagId) // 현재 사용하지 않는 태그를 삭제하는 로직이 필요함? -> 공개 기능까지가면 필요없을듯
    {
        Conversation findConversation = findConversation(conversationId);

        conversationTagRepository.deleteByConversationConversationIdAndTagId(conversationId, tagId);

        // 태그id에 해당하는 row가 convTag table에 없다면 tag삭제

        List<ConversationTag> conversationTags = conversationTagRepository.findAllByConversationConversationId(conversationId);
        if(conversationTags.isEmpty()) findConversation.setTagged(false);

        return conversationRepository.save(findConversation);
    }

    public Conversation viewCountUp(long conversationId)
    {
        Conversation conversation = findConversation(conversationId);
        conversation.setViewCount(conversation.getViewCount()+1);
        return conversationRepository.save(conversation);
    }

    public List<Conversation> getSavedConversation(boolean isSaved)
    {
        return conversationRepository.findAllBySavedAndDeleteStatus(isSaved, false);
    }

    public void removeConversation(long conversationId)
    {
        Conversation findConversation = findConversation(conversationId);
        findConversation.setDeleteStatus(true);
        conversationRepository.save(findConversation);
    }

    public void setSaveStatus(Conversation conversation)
    {
        if(conversation.isTagged() || conversation.isBookmarked()) return;

        conversation.setSaved(false);
        conversationRepository.save(conversation);
    }

//    public Conversation createBookmark(long conversationId, BookmarkDto.Post dto)
//    {
//        // 북마크 생성
//        // 카테고리 생성
//
//        Conversation conversation = findConversation(conversationId);
//        conversation.setSaved(true);
//
//        Bookmark bookmark = new Bookmark();
//        bookmark.setMemberId(MEMBER_ID);
//        bookmark.addConversation(conversation);
//        bookmarkRepository.save(bookmark);
//
//        conversationCategoryRepository.deleteAllByConversationConversationId(conversationId);
//
//        List<String> categories = dto.getBookmarks();
//        categories.stream().forEach(category -> {
//            //중복 조회
//            Optional<Category> optional = categoryRepository.findByName(category);
//            if(optional.isEmpty())
//            {
//                Category savedCategory = categoryRepository.save(new Category(MEMBER_ID, category));
//                ConversationCategory conversationCategory = new ConversationCategory(conversation,savedCategory.getId(),category);
//                conversationCategoryRepository.save(conversationCategory);
//            }
//            else
//            {
//                Category findCategory = optional.orElse(null);
//                ConversationCategory conversationCategory = new ConversationCategory(conversation,findCategory.getId(),category);
//                conversationCategoryRepository.save(conversationCategory);
//            }
//        });
//
//        //Optional.ofNullable(collection.getPinned()).ifPresent(pin -> conversation.setPinned(pin));
//        //Optional.ofNullable(collection.getPublished()).ifPresent(publish -> conversation.setPublished(publish));
//        //Optional.ofNullable(collection.getTitle()).ifPresent(title -> conversation.setTitle(title));
//
//        return conversationRepository.save(conversation);
//    }
//
//    public Conversation createTag(long conversationId, TagDto.Post tagDto)
//    {
//        Conversation conversation = findConversation(conversationId);
//        conversation.setSaved(true);
//
//        //conversationTagRepository.deleteAllByConversationId(conversationId);
//
//        List<String> tags = tagDto.getTags();
//        tags.stream().forEach(tag-> {
//            Optional<Tag> optional = tagRepository.findByTagName(tag);
//            if(optional.isEmpty())
//            {
//                Tag savedTag = tagRepository.save(new Tag(tag));
//                ConversationTag conversationTag = new ConversationTag(conversation,savedTag.getTagId(),tag);
//                conversationTagRepository.save(conversationTag);
//            }
//            else
//            {
//                Tag findTag= optional.orElse(null);
//                ConversationTag conversationTag = new ConversationTag(conversation,findTag.getTagId(),tag);
//                conversationTagRepository.save(conversationTag);
//            }
//        });
//        //conversation.addTag();
//        return conversationRepository.save(conversation);
//    }
}
