<?php

namespace Portfel\MyPortfelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Portfel\MyPortfelBundle\Entity\Wallet
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Table(name="wallets")
 */
class Wallet {

    
    /**
     * @ORM\Id
     * @ORM\Column(type="integer",nullable=false)
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    protected $name;

    /**
     * @ORM\ManyToOne(targetEntity="Portfel\SecurityBundle\Entity\User", inversedBy="wallets")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $user;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $create_at;
    
    /**
     * @ORM\OneToMany(targetEntity="Operation", mappedBy="wallet")
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
     * Set create_at
     *
     * @param datetime $createAt
     */
    public function setCreateAt($createAt)
    {
        $this->create_at = $createAt;
    }

    /**
     * Get create_at
     *
     * @return datetime 
     */
    public function getCreateAt()
    {
        return $this->create_at;
    }

    /**
     * Set user
     *
     * @param Portfel\SecurityBundle\Entity\User $user
     */
    public function setUser(\Portfel\SecurityBundle\Entity\User $user)
    {
        $this->user = $user;
    }

    /**
     * Get user
     *
     * @return Portfel\SecurityBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
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
}