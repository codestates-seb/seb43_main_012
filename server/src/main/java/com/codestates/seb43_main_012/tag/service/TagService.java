package com.codestates.seb43_main_012.tag.service;

import com.codestates.seb43_main_012.exception.BusinessLogicException;
import com.codestates.seb43_main_012.exception.ExceptionCode;
import com.codestates.seb43_main_012.tag.entitiy.Tag;
import com.codestates.seb43_main_012.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    // private final Conversation conversation;

    public Tag createTag(Tag tag) {
    verifyExistTagName(tag.getTagName());
    return tagRepository.save(tag);
    }

    //  태그이름 업데이트
    // public Tag updateTag(Tag tag) {
    //     // 이미 등록된 태그인지 확인
    //     Tag findTag = findVerifiedTag(conversationId, tag.getTagId());
    //
    //     // 태그이름 업데이트
    //     Optional.ofNullable(tag.getTagName())
    //             .ifPresent(tagName -> findTag.setTagName(tagName));
    //
    //     // 태그정보 업데이트
    //     return tagRepository.save(findTag);
    //
    // }

    // 전체 태그 조회
    public List<Tag> findAllTags() {
        return (List<Tag>) tagRepository.findAll();
    }

    public Tag deleteTag(Long conversationId, Long tagId) {
        Tag deletedTag = findVerifiedTag(conversationId, tagId);

        tagRepository.deleteById(tagId);

        return deletedTag;
    }

    public Tag findById(Long tagId) {
        return null;
    }

    // 이미 존재하는 태그 인지 확인 태그 수정하기위해

    // private Tag findVerifiedTag(Long conversationId, Long tagId) {
    //     Tag tag = new Tag();
    //     tag.setTagId(tagId);
    //
    //     Conversation conversation = new Conversation();
    //     conversation.setConversationId(conversationId);
    //     tag.setConversation(conversation);
    //
    //     return findVerifiedTag(tag, true);
    // }
    public Tag findVerifiedTag(Long conversationId, long tagId) {
        Optional<Tag> optionalTag =
                tagRepository.findById(tagId);
        Tag findTag =
                optionalTag.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
        return findTag;
    }

    //이미 등록된 태그이름인지 확인 중복된 태그 등록을 막기위해
    private void verifyExistTagName(String tagName) {
        Optional<Tag> tag = tagRepository.findByTagName(tagName);
        if (tag.isPresent())
            throw new BusinessLogicException(ExceptionCode.TAG_EXISTS);
    }
}
