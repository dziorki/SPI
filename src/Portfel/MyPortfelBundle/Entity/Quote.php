<?php

namespace Portfel\MyPortfelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Portfel\MyPortfelBundle\Entity\Quote
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Table(name="quotes")
 */
class Quote {

    /**
     * @ORM\Id
     * @ORM\Column(type="string", length=10)
     */
    protected $shortcut;

    /**
     * @ORM\Column(type="decimal")
     */
    protected $account;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $date;


    /**
     * Set shortcut
     *
     * @param string $shortcut
     */
    public function setShortcut($shortcut)
    {
        $this->shortcut = $shortcut;
    }

    /**
     * Get shortcut
     *
     * @return string 
     */
    public function getShortcut()
    {
        return $this->shortcut;
    }

    /**
     * Set account
     *
     * @param decimal $account
     */
    public function setAccount($account)
    {
        $this->account = $account;
    }

    /**
     * Get account
     *
     * @return decimal 
     */
    public function getAccount()
    {
        return $this->account;
    }

    /**
     * Set date
     *
     * @param datetime $date
     */
    public function setDate($date)
    {
        $this->date = $date;
    }

    /**
     * Get date
     *
     * @return datetime 
     */
    public function getDate()
    {
        return $this->date;
    }
}