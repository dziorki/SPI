<?php

namespace Portfel\SecurityBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Admin controller.
 *
 */
class AdminController extends Controller
{

    /**
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }

}
