package com.codestates.seb43_main_012.tag.controller;

import com.codestates.seb43_main_012.tag.dto.TagDto;
import com.codestates.seb43_main_012.tag.entitiy.Tag;
import com.codestates.seb43_main_012.tag.mapper.TagMapper;
import com.codestates.seb43_main_012.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
public class TagController {

    private static final String TAG_DEFAULT_URL = "/conversations";
    private static final String TAG_DEFAULT_URL_DETAIL = "/tags";

    private final TagService tagService;
    private final TagMapper mapper;

    // 태그 생성

//    @PostMapping(TAG_DEFAULT_URL + "/{conversationId}" + TAG_DEFAULT_URL_DETAIL)
//    public ResponseEntity postTag (@PathVariable("conversationId") @Positive Long conversationId,
//                                   @Valid @RequestBody TagDto.Post tagDtoPost) {
//        Tag tag = mapper.tagPostDtoToTag(tagDtoPost);
//        Tag createdTag = tagService.createTag(tag);
//
//        return new ResponseEntity<>(
//                mapper.tagToTagSimpleResponseDto(createdTag),
//                HttpStatus.CREATED);
//    }

    // @PatchMapping(TAG_DEFAULT_URL + "/{conversationId}" + TAG_DEFAULT_URL_DETAIL + "/{tagId}")
    // public ResponseEntity patchTag(@PathVariable("conversationId") @Positive Long conversationId,
    //                                @PathVariable("tagId") @Positive Long tagId,
    //                                @Valid @RequestBody TagDto.Patch tagDtoPatch) {
    //     tagDtoPatch.setConversationId(conversationId);
    //     tagDtoPatch.setTagId(tagId);
    //     Tag tag = mapper.tagPatchDtoToTag(tagDtoPatch);
    //     Tag updatedTag = tagService.updateTag(tag);
    //
    //     return new ResponseEntity<>(
    //             mapper.tagToTagSimpleResponseDto(updatedTag),
    //             HttpStatus.OK);
    // }

//    @GetMapping(TAG_DEFAULT_URL + "/{conversationId}" + TAG_DEFAULT_URL_DETAIL)
//    public ResponseEntity getAllConversationTag(@PathVariable("conversationId") @Positive Long conversationId) {
//        List<Tag> tags = tagService.findAllTags();
//
//        return new ResponseEntity<>(mapper.tagToTagResponseDto(conversationId, tags), HttpStatus.OK);
//    }

    // 태그 상태 변화 수정코드

//    @DeleteMapping(TAG_DEFAULT_URL + "/{conversationId}" + TAG_DEFAULT_URL + "/{tagId}")
//    public ResponseEntity deleteTag(@PathVariable("conversationId") @Positive Long conversationId,
//                                    @PathVariable("tagId") @Positive Long tagId) {
//        Tag deletedTag = tagService.deleteTag(conversationId, tagId);
//
//        return new ResponseEntity<>(
//                mapper.tagToTagSimpleResponseDto(deletedTag),HttpStatus.NO_CONTENT);
//    }
}
