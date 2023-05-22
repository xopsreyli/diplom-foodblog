<?php

namespace App\Service\Category;

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
        return $this->manager->getAllCategories();
    }
}
