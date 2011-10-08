<?php

namespace Portfel\IndexBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\SecurityContext;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use JMS\SecurityExtraBundle\Annotation\Secure;

class IndexController extends Controller
{

    /**
     * @Template()
     */
    public function indexAction()
    {
        return array(
            'error' => null
        );
    }

    /**
     * @Route("/hello", name="_hello")
     * @Template()
     */
    public function helloAction()
    {

        return array(
            // last username entered by the user
            'last_username' => $session->get(SecurityContext::LAST_USERNAME),
            'error'         => $error,
        );
    }
}
