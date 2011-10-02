<?php

namespace Portfel\IndexBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class DefaultController extends Controller
{
    
    public function indexAction()
    {
        return $this->render('PortfelIndexBundle:Default:index.html.twig');
    }
}
