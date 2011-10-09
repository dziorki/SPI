<?php

namespace Administrator\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AdminController extends Controller {

    public function indexAction() {
        
        if (false === $this->get('security.context')->isGranted('ROLE_ADMIN')) {
            throw new AccessDeniedException();
        }

        return $this->render('AdministratorAdminBundle:Admin:index.html.twig', array('name' => 'Tomek'));
    }

}