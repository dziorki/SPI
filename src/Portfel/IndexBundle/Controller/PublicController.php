<?php

namespace Portfel\IndexBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use JMS\SecurityExtraBundle\Annotation\Secure;

class PublicController extends Controller {

    /**
     * @Template()
     */
    public function indexAction() {

        $em = $this->getDoctrine()->getEntityManager();

        $entities = $em->getRepository('MyPortfelBundle:Wallet')->findAll();

        if (!$entities) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }

        return array(
            'entities' => $entities
        );
    }

    /**
     * Lists all Operation entities.
     *
     * @Template()
     */
    public function walletAction($id) {
        $em = $this->getDoctrine()->getEntityManager();

        $entities = $em->createQueryBuilder()
                ->select(array('c.name as company', 'sum(o.account) as account', 'sum(o.provision) as provision', 'sum(o.amount) as amount'))
                ->from('MyPortfelBundle:Operation', 'o')
                ->join('o.company', 'c')
                ->where('o.wallet = :wallet_id')
                ->groupBy(' o.company, c.name')
                ->setParameter('wallet_id', $id)
                ->getQuery()
                ->getResult();

        return array(
            'entities' => $entities,
            'wallet_id' => $id
        );
    }

    /**
     * Pie
     *
     */
    public function pieAction($id) {
        
        $em = $this->getDoctrine()->getEntityManager();
        $entities = $em->createQueryBuilder()
                ->select(array('c.name as company', '(sum(o.account * o.amount) / 100) as procent'))
                ->from('MyPortfelBundle:Operation', 'o')
                ->join('o.company', 'c')
                ->where('o.wallet = :wallet_id')
                ->groupBy(' o.company, c.name')
                ->setParameter('wallet_id', $id)
                ->getQuery()
                ->getResult();

        $data = array();
        foreach($entities as $entity){
                $data[] = array($entity['company'], round($entity['procent']));
        }
        
        return new Response(json_encode(array(array('type' => 'pie', 'name' => 'Struktura portfela', 'data' => $data))));
    }

    /**
     * Finds and displays a Operation entity.
     *
     * @Template()
     */
    public function historyAction($id, $name) {
        $em = $this->getDoctrine()->getEntityManager();

        $entities = $em->createQueryBuilder()
                ->select(array('o.date', 'c.name as company', 'o.account', 'o.provision', 'o.amount'))
                ->from('MyPortfelBundle:Operation', 'o')
                ->join('o.company', 'c')
                ->where('o.wallet = :wallet_id', 'c.name = :name')
                ->setParameter('wallet_id', $id)
                ->setParameter('name', $name)
                ->getQuery()
                ->getResult();


        return array(
            'entities' => $entities,
            'wallet_id' => $id,
            'company_name' => $name
        );
    }

}
