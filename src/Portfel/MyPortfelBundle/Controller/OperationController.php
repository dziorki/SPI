<?php

namespace Portfel\MyPortfelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Portfel\MyPortfelBundle\Entity\Operation;
use Portfel\MyPortfelBundle\Form\OperationType;

/**
 * Operation controller.
 *
 * @Route("/my")
 */
class OperationController extends Controller
{
    /**
     * Lists all Operation entities.
     *
     * @Route("/{id}/portfel", name="operation")
     * @Template()
     */
    public function indexAction($id)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $entities = $em->getRepository('MyPortfelBundle:Operation')->findOneBy(array('wallet_id' => $id));

        return array(
            'entities' => $entities,
            'wallet_id' => $id
        );
    }

    /**
     * Finds and displays a Operation entity.
     *
     * @Route("/{id}/portfel/walor/", name="my_show")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $entity = $em->getRepository('MyPortfelBundle:Operation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Operation entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),        );
    }

    /**
     * Displays a form to create a new Operation entity.
     *
     * @Route("/{id}/portfel/walor/nowy", name="operation_new")
     * @Template()
     */
    public function newAction($id)
    {
        $entity = new Operation();
        $form   = $this->createForm(new OperationType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
            'wallet_id' => $id
        );
    }

    /**
     * Creates a new Operation entity.
     *
     * @Route("/{id}/portfel/walor/stworz", name="operation_create")
     * @Method("post")
     * @Template("MyPortfelBundle:Operation:new.html.twig")
     */
    public function createAction($id)
    {
        $entity  = new Operation();
        $entity->setWalletId($id);
        $entity->setDate(new \DateTime('now'));
        
        $request = $this->getRequest();
        $form    = $this->createForm(new OperationType(), $entity);
        $form->bindRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getEntityManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('operation_show', array('id' => $entity->getId())));
            
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView()
        );
    }

    /**
     * Displays a form to edit an existing Operation entity.
     *
     * @Route("/walor/edit/{id}", name="operation_edit")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $entity = $em->getRepository('MyPortfelBundle:Operation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Operation entity.');
        }

        $editForm = $this->createForm(new OperationType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Operation entity.
     *
     * @Route("/walor/aktualizuj/{id}", name="operation_update")
     * @Method("post")
     * @Template("MyPortfelBundle:Operation:edit.html.twig")
     */
    public function updateAction($id)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $entity = $em->getRepository('MyPortfelBundle:Operation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Operation entity.');
        }

        $editForm   = $this->createForm(new OperationType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        $request = $this->getRequest();

        $editForm->bindRequest($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('operation_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Operation entity.
     *
     * @Route("/walor/usun/{id}", name="operation_delete")
     * @Method("post")
     */
    public function deleteAction($id)
    {
        $form = $this->createDeleteForm($id);
        $request = $this->getRequest();

        $form->bindRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getEntityManager();
            $entity = $em->getRepository('MyPortfelBundle:Operation')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Operation entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('operation'));
    }

    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm()
        ;
    }
}
