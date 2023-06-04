<?php

namespace App\Repository\User\LikedArticle;

use App\Entity\User\LikedArticle\LikedArticle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<LikedArticle>
 *
 * @method LikedArticle|null find($id, $lockMode = null, $lockVersion = null)
 * @method LikedArticle|null findOneBy(array $criteria, array $orderBy = null)
 * @method LikedArticle[]    findAll()
 * @method LikedArticle[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LikedArticlesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LikedArticle::class);
    }

    public function add(LikedArticle $entity, bool $flush = false): LikedArticle
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }

        return $entity;
    }

    public function save(LikedArticle $entity): LikedArticle
    {
        $this->getEntityManager()->flush($entity);

        return $entity;
    }

    public function remove(LikedArticle $entity, bool $flush = false): LikedArticle
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }

        return $entity;
    }
}
