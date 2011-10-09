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

        /* this field type lets you show two fields that represent just
          one field in the model and they both must match */
        $builder->add('password', 'repeated', array(
            'type' => 'password',
            'first_name' => "password1",
            'second_name' => "password2",
            'invalid_message' => "Hasła nie są takie same!"
        ));
        $builder->add('email','email', array(
            'label' => "E-mail",
            'required' => true,
            'max_length' => 50
        ));
    }

    public function getDefaultOptions(array $options) {
        return array(
            'data_class' => 'Portfel\SecurityBundle\Entity\User',
        );
    }

    public function getName() {
        return 'user';
    }

}

?>