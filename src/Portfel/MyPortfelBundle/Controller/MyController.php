<?php

namespace Portfel\MyPortfelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;



class MyController extends Controller
{
    /**
     *
     * @Template("MyPortfelBundle:My:index.html.twig")
     */
    public function indexAction($name)
    {
        return array('name' => $name);
    }
}