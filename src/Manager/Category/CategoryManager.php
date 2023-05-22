<?php

namespace App\Manager\Category;

use App\Entity\Category\Category;
use App\Repository\Category\CategoryRepository;

class CategoryManager
{
    public function __construct(
        private CategoryRepository $repository
    )
    {
    }

    public function getAllCategories(): array
    {
        return $this->repository->findAll();
    }

    public function getCategoryById(int $id): Category
    {
        return $this->repository->find($id);
    }
}
