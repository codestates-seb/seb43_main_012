package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.bookmark.*;
import com.codestates.seb43_main_012.member.repository.MemberRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final MemberRepository memberRepository;
    private final BookmarkRepository bookmarkRepository;
    private final BookmarkCategoryRepository bookmarkCategoryRepository;
    public ConversationService(ConversationRepository conversationRepository,
                               MemberRepository memberRepository,
                               BookmarkRepository bookmarkRepository,
                               BookmarkCategoryRepository bookmarkCategoryRepository)
    {
        this.conversationRepository = conversationRepository;
        this.memberRepository = memberRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.bookmarkCategoryRepository = bookmarkCategoryRepository;
    }

    public Conversation saveConversation(Conversation conversation)
    {
        return conversationRepository.save(conversation);
    }

    public Conversation createConversation(long memberId)
    {
        Conversation conversation = new Conversation();
        conversation.addMember(memberRepository.findById(memberId).orElse(null));
        //conversation.setMember(new MemberEntity(1L,"a","a","a"));
        return conversationRepository.save(conversation);
    }

    public Conversation updateConversation(long conversationId)
    {
        Optional<Conversation> optional = conversationRepository.findById(conversationId);
        Conversation findConversation = optional.orElseThrow(()->new RuntimeException());

        findConversation.setModifiedAt(LocalDateTime.now());
        return conversationRepository.save(findConversation);
    }

    public Conversation findConversation(long conversationId)
    {
        Optional<Conversation> optional = conversationRepository.findById(conversationId);
        Conversation conversation = optional.orElseThrow(()->new RuntimeException());
        return conversation;
    }

    public List<Conversation> findConversations(String sort)
    {
       if(sort.equals("desc"))
            return conversationRepository.findAll(Sort.by(Sort.Direction.DESC, "modifiedAt"));
        else
            return conversationRepository.findAll(Sort.by(Sort.Direction.ASC, "modifiedAt"));
    }

    public List<Bookmark> findBookmarkedConversations(String bookmarkName)
    {
        return bookmarkRepository.findAllByBookmarkName(1L,bookmarkName);
    }

    public Conversation createBookmark(long conversationId, BookmarkDto.Post collection)
    {
        Conversation conversation = findConversation(conversationId);
        conversation.setSaved(true);

        List<String> bookmarks = collection.getBookmarks();
        bookmarks.stream().forEach(bookmark -> {
            //중복 조회
            if(bookmarkCategoryRepository.findByName(bookmark).isEmpty())
                bookmarkCategoryRepository.save(new BookmarkCategory(1L,bookmark));
        });

        Optional.ofNullable(collection.getBookmarks()).ifPresent(b -> {
            conversation.setBookmarks(listToString(b));
            Bookmark bookmark = new Bookmark();
            bookmark.setBookmarkName(listToString(b));
            bookmark.setMemberId(1L);
            bookmark.addConversation(conversation);
            bookmarkRepository.save(bookmark);
        });
        //Optional.ofNullable(collection.getPinned()).ifPresent(pin -> conversation.setPinned(pin));
        //Optional.ofNullable(collection.getPublished()).ifPresent(publish -> conversation.setPublished(publish));
        //Optional.ofNullable(collection.getTitle()).ifPresent(title -> conversation.setTitle(title));

        return conversationRepository.save(conversation);
    }

    public Conversation viewCountUp(long conversationId)
    {
        Conversation conversation = findConversation(conversationId);
        conversation.setViewCount(conversation.getViewCount()+1);
        return conversationRepository.save(conversation);
    }

    public List<Conversation> getSavedConversation(boolean isSaved)
    {
        return conversationRepository.findAllBySaved(isSaved);
    }

    private String listToString(List list)
    {
        if(list.isEmpty()) return null;

        String str = "[\"";

        str += list.get(0);
        for(int i = 1; i<list.size();i++)
        {
            str += "\",\"";
            str += list.get(i);
        }
        str += "\"]";

        return str;
    }
}
