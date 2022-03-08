<?php

namespace Espo\Modules\DubasShippingManager\Hooks\DubasPackageStatus;

use Espo\ORM\Entity;
use Espo\ORM\EntityManager;

class SetPackageStatus
{
    protected $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function beforeSave(Entity $entity, array $options, array $data): void
    {
        if($entity->isNew() || ($entity->isAttributeChanged('name') || $entity->isAttributeChanged('packagesIds'))){

            $packages = $entity->get('packagesIds');
            foreach($packages as $package) {
                $p = null;
                $p = $this->entityManager->getEntity('DubasPackage', $package);
                $p->set('status', $entity->get('name'));
                $this->entityManager->saveEntity($p);
            }
        }
    }
}