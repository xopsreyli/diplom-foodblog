<?php

namespace App\Repository\Article;

use App\Entity\Article\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Article>
 *
 * @method Article|null find($id, $lockMode = null, $lockVersion = null)
 * @method Article|null findOneBy(array $criteria, array $orderBy = null)
 * @method Article[]    findAll()
 * @method Article[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Article::class);
    }

    public function add(Article $entity, bool $flush = false): Article
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }

        return $entity;
    }

    public function save(Article $entity): Article
    {
        $this->getEntityManager()->flush($entity);

        return $entity;
    }

    public function remove(Article $entity, bool $flush = false): Article
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }

        return $entity;
    }

    public function latest10(): array
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.deleted = :deleted')
            ->setParameter('deleted', false)
            ->orderBy('a.id', 'DESC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }

    public function popular(): array
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.deleted = :deleted')
            ->setParameter('deleted', false)
            ->orderBy('a.likes', 'DESC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }
}
