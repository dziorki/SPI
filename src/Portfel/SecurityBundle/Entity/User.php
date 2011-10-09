<?php

namespace Portfel\SecurityBundle\Entity;

use Symfony\Component\Security\Core\User\UserInterface;
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
class User implements UserInterface {

    /**
     * @ORM\Id
     * @ORM\Column(type="integer",nullable=false)
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", unique="true", length=10)
     */
    protected $username;

    /**
     * @ORM\Column(type="string", length=128)
     */
    protected $password;

    /**
     * @ORM\Column(type="string", unique="true", length="30")
     * 
     */
    protected $email;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $create_at;
    
    /**
     * @ORM\Column(type="string", length="5")
     */
    protected $salt;

    /**
     * Generate a new salt - can't be done as prepersist because we need it before then
     */
    public function initSalt() {
        $this->salt = substr(str_shuffle(str_repeat('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',5)),0,5);
    }
    
    /**
     * Remove sensitive information from the user object
     */
    public function eraseCredentials() {
        $this->password = "";
        $this->salt = "";
    }
    
    /**
     * Is the provided user the same as "this"?
     *
     * @return bool
     */
    public function equals(UserInterface $user) {
        if($user->email !== $this->email) {
            return false;
        }

        return true;
    }
    
    /**
     * Get the list of roles for the user
     *
     * @return string array
     */
    public function getRoles() {
        return array("ROLE_USER");
    }
    
    /**
     * Get id
     *
     * @return integer 
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set username
     *
     * @param string $username
     */
    public function setUsername($username) {
        $this->username = $username;
    }

    /**
     * Get username
     *
     * @return string 
     */
    public function getUsername() {
        return $this->username;
    }

    /**
     * Set password
     *
     * @param string $password
     */
    public function setPassword($password) {
        $this->password = $password;
    }

    /**
     * Get password
     *
     * @return string 
     */
    public function getPassword() {
        return $this->password;
    }

    /**
     * Set email
     *
     * @param string $email
     */
    public function setEmail($email) {
        $this->email = $email;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail() {
        return $this->email;
    }

    /**
     * Set create_at
     *
     * @param datetime $createAt
     */
    public function setCreateAt($createAt) {
        $this->create_at = $createAt;
    }

    /**
     * Get create_at
     *
     * @return datetime 
     */
    public function getCreateAt() {
        return $this->create_at;
    }
    /**
     *
     * @Assert\True(message = "Hasło nie może zawierać loginu")
     */
    public function isPasswordLegal() {
        return !preg_match('/'.$this->username.'/', $this->password);

    }
    
    /**
     * Set salt
     *
     * @param string $salt
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;
    }

    /**
     * Get salt
     *
     * @return string 
     */
    public function getSalt()
    {
        return $this->salt;
    }
}