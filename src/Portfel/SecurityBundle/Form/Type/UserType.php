<?php

namespace Portfel\SecurityBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;

class UserType extends AbstractType {

    public function buildForm(FormBuilder $builder, array $options) {
        $builder->add('username', 'text', array(
            'label' => "Username",
            'required' => true,
            'trim' => true,
            'max_length' => 30
        ));

        $builder->add('plainPassword', 'repeated', array(  
                'type' => 'password',  
                'first_name' => 'Password',  
                'second_name' => 'Confirm Password',  
                'attr' => array('class' => 'validate[required]'),  
         ));
        
        $builder->add('email','email', array(
            'label' => "E-mail",
            'required' => true,
            'max_length' => 50
        ));
    }

    public function getName() {
        return 'fos_user_registration';
    }

}

?>