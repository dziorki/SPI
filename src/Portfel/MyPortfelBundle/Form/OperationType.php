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
            ->add('provision', 'money', array('currency' => 'PLN', 'precision' => 2))
            ->add('amount', 'money', array('currency' => 'PLN', 'precision' => 2))
            
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
