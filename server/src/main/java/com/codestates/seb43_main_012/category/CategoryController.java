package com.codestates.seb43_main_012.category;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/bookmarks")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final long MEMBER_ID = 1L;

    @PostMapping
    public ResponseEntity postCategory(@RequestBody CategoryDto.Post dto)
    {
        Category category = categoryService.createCategory(MEMBER_ID, dto.getBookmarkName());

        CategoryDto.Response response = new CategoryDto.Response(category.getId(), category.getName());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{bookmark-id}")
    public ResponseEntity deleteCategory(@PathVariable("bookmark-id") long categoryId)
    {

        categoryService.removeCategory(MEMBER_ID, categoryId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
