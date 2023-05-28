<?php

namespace App\DTOBuilder\Api\Category;

use App\DTO\Api\Category\CategoryDTO;
use App\Entity\Category\Category;

class CategoryDTOBuilder
{
    public static function build(Category $category): CategoryDTO
    {
        $categoryDTO = new CategoryDTO();
        $categoryDTO->id = $category->getId();
        $categoryDTO->name = $category->getName();

        return $categoryDTO;
    }
}
