<?php

namespace Espo\Modules\DubasShippingManager\Hooks\DubasParcel;

use Espo\ORM\Entity;

class GenerateParcelNumber
{
    public function beforeSave(Entity $entity, array $options, array $data): void
    {
        if($entity->isNew() && !$entity->get('name')){
            $entity->set('name', time());
        }
    }
}