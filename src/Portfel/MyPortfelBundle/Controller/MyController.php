<?php

namespace Portfel\MyPortfelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Portfel\MyPortfelBundle\Entity\Wallet;
use Portfel\SecurityBundle\Entity\User;
use Portfel\MyPortfelBundle\Form\WalletType;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

/**
 * My controller.
 *
 * @Route("/my")
 */
class MyController extends Controller {

    /**
     * Lists all Wallet entities.
     *
     * @Route("/", name="my")
     * @Template()
     */
    public function indexAction() {

        if ($this->get('security.context')->isGranted('ROLE_USER')) {

            $em = $this->getDoctrine()->getEntityManager();
            
            $criteria = array('user' => $this->get('security.context')->getToken()->getUser()->getId()
                    );
            
            $entities = $em->getRepository('MyPortfelBundle:Wallet')->findBy($criteria);

            return array('entities' => $entities);
        } else {
            return array();
        }
    }

    /**
     * Displays a form to create a new Wallet entity.
     *
     * @Route("/nowy", name="my_new")
     * @Template()
     */
    public function newAction() {
        $entity = new Wallet();

        $form = $this->createForm(new WalletType(), $entity);

        return array(
            'entity' => $entity,
            'form' => $form->createView()
        );
    }

    /**
     * Creates a new Wallet entity.
     *
     * @Route("/stworz", name="my_create")
     * @Method("post")
     * @Template("MyPortfelBundle:My:new.html.twig")
     */
    public function createAction() {
        
        //pobranie uzytkownika
        $em = $this->getDoctrine()->getEntityManager();
        $userEntity = $em->getRepository('Portfel\\SecurityBundle\\Entity\\User')->find($this->get('security.context')->getToken()->getUser()->getId());
        
        $entity = new Wallet();
        $entity->setUser($userEntity);
        $entity->setCreateAt(new \DateTime('now'));

        $request = $this->getRequest();
        $form = $this->createForm(new WalletType(), $entity);
        $form->bindRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getEntityManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('my_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form' => $form->createView()
        );
    }

    /**
     * Displays a form to edit an existing Wallet entity.
     *
     * @Route("/{id}/edytuj", name="my_edit")
     * @Template()
     */
    public function editAction($id) {
        
        $em = $this->getDoctrine()->getEntityManager();
        $entity = $em->getRepository('MyPortfelBundle:Wallet')->find($id);

        if ($entity->getUser()->getId() != $this->get('security.context')->getToken()->getUser()->getId()) {
            throw new AccessDeniedException();
        }

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Wallet entity.');
        }

        $editForm = $this->createForm(new WalletType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity' => $entity,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Wallet entity.
     *
     * @Route("/{id}/aktualizuj", name="my_update")
     * @Method("post")
     * @Template("MyPortfelBundle:My:edit.html.twig")
     */
    public function updateAction($id) {
        $em = $this->getDoctrine()->getEntityManager();

        $entity = $em->getRepository('MyPortfelBundle:Wallet')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Wallet entity.');
        }

        $editForm = $this->createForm(new WalletType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        $request = $this->getRequest();

        $editForm->bindRequest($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('my_edit', array('id' => $id)));
        }

        return array(
            'entity' => $entity,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Wallet entity.
     *
     * @Route("/{id}/usun", name="my_delete")
     * @Method("post")
     */
    public function deleteAction($id) {
        $form = $this->createDeleteForm($id);
        $request = $this->getRequest();

        $form->bindRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getEntityManager();
            $entity = $em->getRepository('MyPortfelBundle:Wallet')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Wallet entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('my'));
    }

    private function createDeleteForm($id) {
        return $this->createFormBuilder(array('id' => $id))
                        ->add('id', 'hidden')
                        ->getForm()
        ;
    }

//    /**
//     * Finds and displays a Wallet entity.
//     *
//     * @Route("/portfel/{id}", name="my_show")
//     * @Template()
//     */
//    public function showAction($id) {
//        $em = $this->getDoctrine()->getEntityManager();
//
//        $entity = $em->getRepository('MyPortfelBundle:My')->find($id);
//
//        if (!$entity) {
//            throw $this->createNotFoundException('Unable to find Wallet entity.');
//        }
//
//        $deleteForm = $this->createDeleteForm($id);
//
//        return array(
//            'entity' => $entity,
//            'delete_form' => $deleteForm->createView(),);
//    }

}
