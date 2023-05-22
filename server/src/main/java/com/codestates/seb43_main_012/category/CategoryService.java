package com.codestates.seb43_main_012.category;

import com.codestates.seb43_main_012.exception.BusinessLogicException;
import com.codestates.seb43_main_012.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ConversationCategoryRepository conversationCategoryRepository;

    public Category createCategory(long memberId, String categoryName)
    {
        Optional<Category> optional = categoryRepository.findByMemberIdAndName(memberId, categoryName);
        if(optional.isPresent()) return optional.orElse(null);

        Category category = new Category(memberId, categoryName);

        return categoryRepository.save(category);
    }

    @Transactional
    public Category updateCategory(long memberId, long categoryId, String categoryName)
    {
        Optional<Category> optional = categoryRepository.findByMemberIdAndId(memberId, categoryId);
        Category category = optional.orElseThrow();
        String before = category.getName();
        category.setName(categoryName);


        List<ConversationCategory> conversationCategories = conversationCategoryRepository.findAllByCategoryId(categoryId);
        conversationCategories.stream().forEach(conversationCategory -> {
            conversationCategory.setBookmarkName(categoryName);
            conversationCategoryRepository.save(conversationCategory);
        });

        return categoryRepository.save(category);
    }

    @Transactional
    public void removeCategory(long memberId, long categoryId)
    {
        List<ConversationCategory> conversationCategoryList = conversationCategoryRepository.findAllByCategoryId(categoryId);
        if(!conversationCategoryList.isEmpty()) throw new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_EMPTY);

        categoryRepository.deleteByMemberIdAndId(memberId, categoryId);
    }
}
