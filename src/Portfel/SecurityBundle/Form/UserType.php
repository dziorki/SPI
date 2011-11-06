<?php

namespace Portfel\SecurityBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;

class UserType extends AbstractType
{
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder
            ->add('username')
            ->add('email')
            ->add('enabled', 'checkbox', array(
                'required' => false
            ))
            ->add('lastLogin')
            ->add('locked', 'checkbox', array(
                'required' => false
            ))
            ->add('expired', 'checkbox', array(
                'required' => false
            ))
            ->add('roles','collection', array(
                'required' => false
            ))
        ;
    }

    public function getName()
    {
        return 'portfel_securitybundle_usertype';
    }
}
