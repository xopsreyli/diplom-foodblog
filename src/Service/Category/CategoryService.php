<?php

namespace App\Service\Category;

use App\DTOBuilder\Api\Category\CategoryDTOBuilder;
use App\Manager\Category\CategoryManager;

class CategoryService
{
    public function __construct(
        private CategoryManager $manager
    )
    {
    }

    public function getAllCategories(): array
    {
        $categoriesDTOArray = [];
        $categories = $this->manager->getAllCategories();
        foreach ($categories as $category) {
            $categoriesDTOArray[] = CategoryDTOBuilder::build($category);
        }

        return $categoriesDTOArray;
    }
}
