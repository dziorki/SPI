<?php

namespace Portfel\MyPortfelBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;

class OperationType extends AbstractType
{
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder
            ->add('company')
            ->add('account')
            ->add('provision')
            ->add('ammount')
            
        ;
    }
    
    public function getDefaultOptions(array $options) {
        return array(
            'data_class' => 'Portfel\MyPortfelBundle\Entity\Operation',
        );
    }
    
    public function getName()
    {
        return 'portfel_myportfelbundle_operationtype';
    }
}
