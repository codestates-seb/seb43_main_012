package com.codestates.seb43_main_012.category;

import com.codestates.seb43_main_012.member.entity.MemberEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/bookmarks")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity postCategory(@RequestBody CategoryDto.Post dto,
                                       @AuthenticationPrincipal MemberEntity member)
    {
        Long memberId = member.getId();

        Category category = categoryService.createCategory(memberId, dto.getBookmarkName());

        CategoryDto.Response response = new CategoryDto.Response(category.getId(), category.getName());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{bookmark-id}")
    public ResponseEntity deleteCategory(@PathVariable("bookmark-id") long categoryId,
                                         @AuthenticationPrincipal MemberEntity member)
    {
        Long memberId = member.getId();

        categoryService.removeCategory(memberId, categoryId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
