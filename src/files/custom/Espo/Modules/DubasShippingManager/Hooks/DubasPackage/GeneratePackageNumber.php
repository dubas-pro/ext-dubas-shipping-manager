<?php

namespace Espo\Modules\DubasShippingManager\Hooks\DubasPackage;

use Espo\ORM\Entity;
use Espo\ORM\EntityManager;

class GeneratePackageNumber
{
    protected $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function beforeSave(Entity $entity, array $options, array $data): void
    {
        if($entity->isNew() && !$entity->get('name')){

            $amount = $this->entityManager
            ->getRDBRepository('DubasPackage')
            ->where([
                'parcelId' => $entity->get('parcelId')
            ])
            ->count();

            $entity->set('name', $entity->get('parcelName').sprintf("%'.03d\n", $amount+1));
        }
    }
}