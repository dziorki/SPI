<?php

namespace Portfel\SecurityBundle\Entity;

use FOS\UserBundle\Entity\User as BaseUser;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints as DoctrineAssert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Table(name="users")
 * @DoctrineAssert\UniqueEntity(fields="username", message="Podany login jest już zajęty.")
 * @DoctrineAssert\UniqueEntity(fields="email", message="Podany adres e-mail jest już zajęty.")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer",nullable=false)
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $create_at;
    
    /**
     * @ORM\OneToMany(targetEntity="Portfel\MyPortfelBundle\Entity\Wallet", mappedBy="user")
     */
    protected $wallet;

    public function __construct()
    {
        parent::__construct();
        $this->create_at = new \DateTime('now');
        $this->wallet = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Add wallet
     *
     * @param Portfel\MyPortfelBundle\Entity\Wallet $wallet
     */
    public function addWallet(\Portfel\MyPortfelBundle\Entity\Wallet $wallet)
    {
        $this->wallet[] = $wallet;
    }

    /**
     * Get wallet
     *
     * @return Doctrine\Common\Collections\Collection 
     */
    public function getWallet()
    {
        return $this->wallet;
    }
    
    public function getRole()
    {
        if(empty($this->roles)){
            return 'User';
        }

        return 'Administrator';
    }
    
    /**
     * Generate a new salt - can't be done as prepersist because we need it before then
     */
    public function initSalt() {
        $this->salt = substr(str_shuffle(str_repeat('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',5)),0,5);
    }
    
}