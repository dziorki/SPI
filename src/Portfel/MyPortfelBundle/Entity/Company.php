<?php

namespace Portfel\MyPortfelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Portfel\MyPortfelBundle\Entity\Company
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Table(name="companies")
 */
class Company {

    
    /**
     * @ORM\Id
     * @ORM\Column(type="integer",nullable=false)
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", unique="true", length=50)
     */
    protected $name;

    /**
     * @ORM\Column(type="string", nullable=false)
     */
    protected $shortcut;

    /**
     * @ORM\OneToMany(targetEntity="Operation", mappedBy="company")
     */
    protected $operations;
    
    public function __construct()
    {
        $this->operations = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

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
     * Add operations
     *
     * @param Portfel\MyPortfelBundle\Entity\Operation $operations
     */
    public function addOperation(\Portfel\MyPortfelBundle\Entity\Operation $operations)
    {
        $this->operations[] = $operations;
    }

    /**
     * Get operations
     *
     * @return Doctrine\Common\Collections\Collection 
     */
    public function getOperations()
    {
        return $this->operations;
    }
    
    
    public function __toString()
    {
        return $this->name.' ('.$this->shortcut.')'; 
    }
}