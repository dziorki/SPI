<?php

namespace Portfel\MyPortfelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Portfel\MyPortfelBundle\Entity\Operation;
use Portfel\MyPortfelBundle\Form\OperationType;

/**
 * History controller.
 *
 * @Route("/my/{wallet_id}/portfel")
 */
class OperationController extends Controller
{
    /**
     * Lists all Operation entities.
     *
     * @Route("/", name="operation")
     * @Template()
     */
    public function indexAction($wallet_id)
    {
        $em = $this->getDoctrine()->getEntityManager();

        //$entities = $em->getRepository('MyPortfelBundle:Operation')->findBy(array('wallet' => $wallet_id));
        //$query = $em->getRepository('MyPortfelBundle:Operation');
//	$entities = $em->createQuery('
//                    SELECT c.name as company, sum(o.account) AS account, sum(o.provision) AS provision, sum(o.ammount) AS ammount 
//                    FROM MyPortfelBundle:Operation o 
//                    JOIN o.company c
//                    WHERE o.wallet = :wallet_id
//                    GROUP BY o.company, c.name')
//                ->setParameter('wallet_id', $wallet_id)
//                ->getResult();
//                
                
                $entities = $em->createQueryBuilder()
                
                ->select(array('c.name as company', 'sum(o.account) as account', 'sum(o.provision) as provision', 'sum(o.amount) as amount'))
                ->from('MyPortfelBundle:Operation','o')
                ->join('o.company','c')
		->where('o.wallet = :wallet_id')
                ->groupBy(' o.company, c.name')
		->setParameter('wallet_id', $wallet_id)
		->getQuery()
		->getResult();

        return array(
            'entities' => $entities,
            'wallet_id' => $wallet_id
        );
    }

    /**
     * Finds and displays a Operation entity.
     *
     * @Route("/{id}/operacja", name="operation_show")
     * @Template()
     */
    public function showAction($wallet_id, $id)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $entity = $em->getRepository('MyPortfelBundle:Operation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Operation entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
	    'wallet_id' => $wallet_id
	    );
    }

    /**
     * Displays a form to create a new Operation entity.
     *
     * @Route("/nowy", name="operation_new")
     * @Template()
     */
    public function newAction($wallet_id)
    {

        $entity = new Operation();
        $form   = $this->createForm(new OperationType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
	    'wallet_id' => $wallet_id
        );
    }

    /**
     * Creates a new Operation entity.
     *
     * @Route("/stworz", name="operation_create")
     * @Method("post")
     * @Template("MyPortfelBundle:Operation:new.html.twig")
     */
    public function createAction()
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
     * @Route("/{id}/edit", name="operation_edit")
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
     * @Route("/aktualizuj", name="operation_update")
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
     * @Route("/usun", name="operation_delete")
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

//    /**
//     * Lists all Operation entities.
//     *
//     * @Route("/", name="operation")
//     * @Template()
//     */
//    public function indexAction($wallet_id)
//    {
//        $em = $this->getDoctrine()->getEntityManager();
//
//        $entities = $em->getRepository('MyPortfelBundle:Operation')->findBy(array('wallet' => $wallet_id));
//
//        return array(
//            'entities' => $entities,
//            'wallet_id' => $wallet_id
//        );
//    }
}

