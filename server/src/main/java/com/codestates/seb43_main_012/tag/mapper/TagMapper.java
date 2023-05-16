package com.codestates.seb43_main_012.tag.mapper;

import com.codestates.seb43_main_012.tag.dto.TagDto;
import com.codestates.seb43_main_012.tag.dto.TagResponseDto;
import com.codestates.seb43_main_012.tag.dto.TagSimpleResponseDto;
import com.codestates.seb43_main_012.tag.entitiy.Tag;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
   default Tag tagPostDtoToTag(TagDto.Post tagPostDto) {

       Tag tag = new Tag();
       //dto 로 받아온 태그네임을 id 랑 연결시켜준다
       // id 는 자동으로 증가 하기때문에 네임만 지정시켜주면됨
       //tag.setTagName(tagPostDto.getTagName());
       return tag;
   };

    Tag tagPatchDtoToTag(TagDto.Patch tagPatchDto) ;

   default TagResponseDto tagToTagResponseDto(Long conversationId, List<Tag> tags) {
        TagResponseDto result = new TagResponseDto();
        result.setConversationId(conversationId);

        List<TagResponseDto.Tags> resultTags = new ArrayList<>();
        {
            for (Tag src : tags) {
                TagResponseDto.Tags tag = new TagResponseDto.Tags();
                tag.setId(src.getTagId());
                tag.setTagName(src.getTagName());


            }
        }
        result.setTags(resultTags);

        return result;
    }

   default TagSimpleResponseDto tagToTagSimpleResponseDto(Tag tag) {
       TagSimpleResponseDto tagSimpleResponseDto = new TagSimpleResponseDto();
       // tagSimpleResponseDto.setConversationId(tag.);
       tagSimpleResponseDto.setTagId(tag.getTagId());
       return tagSimpleResponseDto;
   };
}
