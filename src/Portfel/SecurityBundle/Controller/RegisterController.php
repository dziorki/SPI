<?php

namespace Portfel\SecurityBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\SecurityContext;
use Portfel\SecurityBundle\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Portfel\SecurityBundle\Form\Type\UserType;

class RegisterController extends Controller {

    /**
     *
     */
    public function addAction(Request $request) {


        $user = new User();
        $form = $this->createForm(new UserType(),$user);




        if ($request->getMethod() == 'POST') {

            $form->bindRequest($request);

            if ($form->isValid()) {

                    $user->setCreateAt(new \DateTime('now'));
                    $user->initSalt();
                    $factory = $this->get('security.encoder_factory');
                    $encoder = $factory->getEncoder($user);
                    $password = $encoder->encodePassword($user->getPassword(), $user->getSalt());
                    $user->setPassword($password);
                    
                    $em = $this->getDoctrine()->getEntityManager();
                    $em->persist($user);
                    $em->flush();


                    $this->get('session')->setFlash('notice', 'Created user id: ' . $user->getId());
                    return $this->redirect($this->generateUrl('_welcome'));

            }
        }




        return $this->render('PortfelSecurityBundle:Register:index.html.twig', array(
                    'error' => null,
                    'form' => $form->createView(),
                ));
    }

}

//TODO Sprawdzanie loginu w hasle przestalo dzialac
