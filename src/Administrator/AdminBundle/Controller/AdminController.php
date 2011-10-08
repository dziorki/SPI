<?php

namespace Administrator\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class AdminController extends Controller
{
    
    public function indexAction()
    {
        return $this->render('AdministratorAdminBundle:Admin:index.html.twig', array('name' => 'Tomek'));
    }
}