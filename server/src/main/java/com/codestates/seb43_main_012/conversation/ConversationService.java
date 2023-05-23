package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.bookmark.*;
import com.codestates.seb43_main_012.category.*;
import com.codestates.seb43_main_012.exception.BusinessLogicException;
import com.codestates.seb43_main_012.exception.ExceptionCode;
import com.codestates.seb43_main_012.member.repository.MemberRepository;
import com.codestates.seb43_main_012.qna.QnADto;
import com.codestates.seb43_main_012.qna.QnAService;
import com.codestates.seb43_main_012.tag.dto.TagDto;
import com.codestates.seb43_main_012.tag.entitiy.ConversationTag;
import com.codestates.seb43_main_012.tag.entitiy.Tag;
import com.codestates.seb43_main_012.tag.repository.ConversationTagRepository;
import com.codestates.seb43_main_012.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ConversationService {

    private final Long MEMBER_ID = 1L;

    private final ConversationRepository conversationRepository;
    private final MemberRepository memberRepository;
    private final BookmarkRepository bookmarkRepository;
    private final CategoryService categoryService;
    private final ConversationCategoryRepository conversationCategoryRepository;
    private final TagRepository tagRepository;
    private final ConversationTagRepository conversationTagRepository;
    private final QnAService qnaService;
    private final ConversationMapper conversationMapper;
    private final CategoryRepository categoryRepository;

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

    public Conversation updateConversation(long conversationId, ConversationDto.Patch dto)
    {
        Optional<Conversation> optional = conversationRepository.findById(conversationId);
        Conversation findConversation = optional.orElseThrow(()->new RuntimeException());

        Optional.ofNullable(dto.getTitle()).ifPresent(title -> findConversation.setTitle(title));
        Optional.ofNullable(dto.getPinned()).ifPresent(pinned -> findConversation.setPinned(pinned));

        findConversation.setModifiedAt(String.valueOf(LocalDateTime.now()));
        return conversationRepository.save(findConversation);
    }

    public Conversation updateTimeConversation(long conversationId)
    {
        Optional<Conversation> optional = conversationRepository.findById(conversationId);
        Conversation findConversation = optional.orElseThrow(()->new RuntimeException());

        findConversation.setModifiedAt(String.valueOf(LocalDateTime.now()));
        return conversationRepository.save(findConversation);
    }

    public Conversation findConversation(long conversationId)
    {
        Optional<Conversation> optional = conversationRepository.findById(conversationId);
        Conversation conversation = optional.orElseThrow(()->new BusinessLogicException(ExceptionCode.CONV_NOT_FOUND));
        return conversation;
    }

    public List<Conversation> findConversationList(String sort, String query, long memberId)
    {
        if (query == null) query = "";
        List<Long> IDs = qnaService.findConversationIDs(query, memberId);
        Sort sortBy;
        if (sort.equals("activityLevel"))
            sortBy = Sort.by(Sort.Direction.DESC, "activityLevel", "modifiedAt");
        else if (sort.equals("asc"))
            sortBy = Sort.by(Sort.Direction.ASC, "modifiedAt");
        else
            sortBy = Sort.by(Sort.Direction.DESC, "modifiedAt");

        return conversationRepository.findAllByDeleteStatusAndConversationIdIn(false, IDs, sortBy);
    }

    public Page<Conversation> findConversations(String sort, String query, long memberId, int page, int size) {
        if (query == null) query = "";
        List<Long> IDs = qnaService.findConversationIDs(query, memberId);
        PageRequest pageRequest;
        if (sort.equals("activityLevel"))
            pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "activityLevel", "modifiedAt"));
        else if (sort.equals("asc"))
            pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "modifiedAt"));
        else
            pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "modifiedAt"));

        return conversationRepository.findAllByDeleteStatusAndConversationIdIn(false, IDs, pageRequest);
    }

    @Transactional
    public ConversationDto.Response viewConversationAndCategoryList(long conversationId, long memberId)
    {
        Conversation conversation = viewCountUp(conversationId);

        ConversationDto.Response response = getConversationAndCategoryList(conversation, memberId);

        return response;
    }

    public ConversationDto.Response getConversationAndCategoryList(Conversation conversation, long memberId)
    {
        List<Long> conversationCategoryIDs = new ArrayList<>();
        conversation.getBookmarks().stream().forEach(category -> conversationCategoryIDs.add(category.getCategory().getId()));

        if(conversationCategoryIDs.isEmpty()) conversationCategoryIDs.add(0L);

        List<Category> categories = categoryRepository.findAllByMemberIdAndIdNotIn(memberId, conversationCategoryIDs);

        ConversationDto.Response response = conversationMapper.responseForGetOneConversation(conversation, categories);

        return response;
    }

    @Transactional
    public List<Conversation> findBookmarkedConversations(String categoryName, long memberId)
    {
        List<ConversationCategory> conversationCategories = conversationCategoryRepository.findAllByBookmarkName(categoryName);
        List<Conversation> conversations = new ArrayList<>();
        conversationRepository.findAll();

        conversationCategories.stream().forEach(conversationCategory -> {
            if(conversationCategory.getConversation().isDeleteStatus() == false && conversationCategory.getConversation().getMember().getId() == memberId)
                conversations.add(conversationCategory.getConversation());
        });

        List<Conversation> sortedConversations = sortConversationByModifiedAt(conversations);

        return sortedConversations;
    }

    private List<Conversation> sortConversationByModifiedAt(List<Conversation> conversations)
    {
        Collections.sort(conversations, new Comparator<Conversation>() {
            @Override
            public int compare(Conversation o1, Conversation o2) {
                LocalDateTime dateTime1 = LocalDateTime.parse(o1.getModifiedAt(), DateTimeFormatter.ISO_DATE_TIME);
                LocalDateTime dateTime2 = LocalDateTime.parse(o2.getModifiedAt(), DateTimeFormatter.ISO_DATE_TIME);
                return dateTime2.compareTo(dateTime1);
            }
        });

        return conversations;
    }

    @Transactional
    public List<Conversation> findTaggedConversations(String tagName, long memberId)
    {
        List<ConversationTag> conversationTags = conversationTagRepository.findAllByTagName(tagName);
        List<Conversation> conversations = new ArrayList<>();
        conversationRepository.findAll();

        conversationTags.stream().forEach(conversationTag -> {
            if(conversationTag.getConversation().isDeleteStatus() == false && conversationTag.getConversation().getMember().getId() == memberId)
                conversations.add(conversationTag.getConversation());
        });

        return conversations;
    }

    @Transactional
    public long createBookmark(long conversationId, BookmarkDto.Post dto, long memberId)
    {
        Conversation findConversation = findConversation(conversationId);
        findConversation.setSaved(true);
        findConversation.setBookmarked(true);

        if(bookmarkRepository.findByMemberIdAndConversationConversationId(memberId,conversationId).isEmpty())
        {
            Bookmark bookmark = new Bookmark();
            bookmark.setMemberId(memberId);
            bookmark.addConversation(findConversation);
            bookmarkRepository.save(bookmark);
        }

        Category category = categoryService.createCategory(memberId, dto.getBookmarkName());

        Optional<ConversationCategory> optional = conversationCategoryRepository.findByConversationConversationIdAndBookmarkName(conversationId, dto.getBookmarkName());

        if(optional.isEmpty())
        {
            ConversationCategory conversationCategory = new ConversationCategory(
                    findConversation,
                    category
            );
            conversationCategoryRepository.save(conversationCategory);
        }
        findConversation.setModifiedAt(String.valueOf(LocalDateTime.now()));
        conversationRepository.save(findConversation);

        return category.getId();
    }

    @Transactional
    public Conversation cancelBookmark(long conversationId, long bookmarkId, long memberId)
    {
        Conversation findConversation = findConversation(conversationId);

        conversationCategoryRepository.deleteByConversationConversationIdAndCategoryId(conversationId, bookmarkId);
        List<ConversationCategory> conversationCategories = conversationCategoryRepository.findAllByConversationConversationId(conversationId);
        if(conversationCategories.isEmpty())
        {
            bookmarkRepository.deleteByMemberIdAndConversationConversationId(memberId,conversationId);
            findConversation.setBookmarked(false);
        }


        return conversationRepository.save(findConversation);
    }

    @Transactional
    public long createTag(long conversationId, TagDto.Post tagDto)
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
        findConversation.setModifiedAt(String.valueOf(LocalDateTime.now()));
        conversationRepository.save(findConversation);

        return tag.getTagId();
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
        conversation.setActivityLevel(conversation.getActivityLevel()+1);
        return conversationRepository.save(conversation);
    }

    public List<Conversation> getSavedConversation(long memberId, boolean isSaved)
    {
        return conversationRepository.findAllByMemberIdAndSavedAndDeleteStatus(memberId, isSaved, false, Sort.by(Sort.Direction.DESC, "modifiedAt"));
    }

    public void removeConversation(long conversationId)
    {
        Conversation findConversation = findConversation(conversationId);
        findConversation.setDeleteStatus(true);
        conversationRepository.save(findConversation);
    }

    public void removeAll()
    {
        conversationRepository.deleteAll();
    }

    public void setSaveStatus(Conversation conversation)
    {
        if(conversation.isTagged() || conversation.isBookmarked()) return;

        conversation.setSaved(false);
        conversationRepository.save(conversation);
    }

    public Conversation setModifiedAtCustom(long conversationId, ConversationDto.ModifiedAt m)
    {
        Optional<Conversation> optional = conversationRepository.findById(conversationId);
        Conversation findConversation = optional.orElseThrow(()->new RuntimeException());

        LocalDateTime time = LocalDateTime.of(m.getYear(),m.getMonth(),m.getDay(),m.getHour(),m.getMinute(),m.getSecond(),m.getNano());

        findConversation.setModifiedAt(String.valueOf(time));
        return conversationRepository.save(findConversation);
    }
}
