<?php

namespace Portfel\SecurityBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class PortfelSecurityBundle extends Bundle
{
    public function getParent()
    {
        return 'FOSUserBundle';
    }
}
