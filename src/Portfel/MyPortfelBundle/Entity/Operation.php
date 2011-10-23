<?php

namespace Portfel\MyPortfelBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Portfel\MyPortfelBundle\Entity\Operation
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Table(name="operations")
 */
class Operation {

    /**
     * @ORM\Id
     * @ORM\Column(type="integer",nullable=false)
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;
    
    /**
     * @ORM\ManyToOne(targetEntity="Company", inversedBy="operations")
     * @ORM\JoinColumn(name="company_id", referencedColumnName="id")
     */
    protected $company;
    
    /**
     * @ORM\ManyToOne(targetEntity="Wallet", inversedBy="operations")
     * @ORM\JoinColumn(name="wallet_id", referencedColumnName="id")
     */
    protected $wallet;
    
    /**
     * @ORM\Column(type="string", unique="true", length=50)
     */
    protected $account;

    /**
     * @ORM\Column(type="integer", nullable=false)
     */
    protected $provision;

    /**
     * @ORM\Column(type="integer", nullable=false)
     */
    protected $ammount;    
    
    /**
     * @ORM\Column(type="datetime")
     */
    protected $date;

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
     * Set account
     *
     * @param string $account
     */
    public function setAccount($account)
    {
        $this->account = $account;
    }

    /**
     * Get account
     *
     * @return string 
     */
    public function getAccount()
    {
        return $this->account;
    }

    /**
     * Set provision
     *
     * @param integer $provision
     */
    public function setProvision($provision)
    {
        $this->provision = $provision;
    }

    /**
     * Get provision
     *
     * @return integer 
     */
    public function getProvision()
    {
        return $this->provision;
    }

    /**
     * Set ammount
     *
     * @param integer $ammount
     */
    public function setAmmount($ammount)
    {
        $this->ammount = $ammount;
    }

    /**
     * Get ammount
     *
     * @return integer 
     */
    public function getAmmount()
    {
        return $this->ammount;
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

    /**
     * Set company
     *
     * @param Portfel\MyPortfelBundle\Entity\Company $company
     */
    public function setCompany(\Portfel\MyPortfelBundle\Entity\Company $company)
    {
        $this->company = $company;
    }

    /**
     * Get company
     *
     * @return Portfel\MyPortfelBundle\Entity\Company 
     */
    public function getCompany()
    {
        return $this->company;
    }

    /**
     * Set wallet
     *
     * @param Portfel\MyPortfelBundle\Entity\Wallet $wallet
     */
    public function setWallet(\Portfel\MyPortfelBundle\Entity\Wallet $wallet)
    {
        $this->wallet = $wallet;
    }

    /**
     * Get wallet
     *
     * @return Portfel\MyPortfelBundle\Entity\Wallet 
     */
    public function getWallet()
    {
        return $this->wallet;
    }

}