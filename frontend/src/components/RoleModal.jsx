import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Text,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SingleUserAction, UpdateAction } from '../redux/AuthReducer/action';
import PaymentModal from './PaymentModal';

function RoleModal({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();
  const { singleUser } = useSelector((store) => store.AuthReducer);
  const [selectedPlan, setSelectedPlan] = useState({
    role: singleUser.role,
    payment: singleUser.payment,
  });

  console.log(selectedPlan);

  useEffect(() => {
    dispatch(SingleUserAction(id));
  }, []);

  const handleUpdate = () => {
    dispatch(UpdateAction(id, selectedPlan.payment)).then(() => dispatch(SingleUserAction(id)));
  };

  const handlePay = ()=>{

  }


  // Define subscription plans
  const subscriptionPlans = [
    { name: 'regular', price: 0, bgGradient: 'linear(to-r, #FC8181, #F6AD55)' },
    { name: 'premium', price: 500, bgGradient: 'linear(to-r, #63B3ED, #4299E1)' },
    { name: 'VIP', price: 1000, bgGradient: 'linear(to-r, #FCD34D, #F6AD55)' },
  ];

  return (
    <>
      <Box ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'></Box>
      <Text onClick={onOpen} cursor='pointer'>
        Your Subscriptions
      </Text>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Subscription Plan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {subscriptionPlans.map((plan, index) => (
              <Box
                key={index}
                p={4}
                borderRadius='md'
                bgGradient={plan.bgGradient}
                cursor='pointer'
                mb={2}
                onClick={() => {
                  setSelectedPlan({
                    role: plan.name,
                    payment: plan.price,
                  });
                }}
                borderWidth={selectedPlan.role === plan.name ? '2px' : '0px'}
                borderColor={selectedPlan.role === plan.name ? '#5F0F4E' : 'transparent'}
              >
                <Text fontWeight='bold' textTransform='capitalize'>
                  {plan.name} {singleUser?.role === plan.name ? '(Current Plan)' : ''}
                </Text>
                <Text fontWeight='semibold'>Price: {plan.price === 0 ? 'FREE' : `₹ ${plan.price}/-`}</Text>
              </Box>
            ))}
            {selectedPlan.role !== undefined ? (
              <Text>
                {selectedPlan.role === singleUser.role
                  ? `You Plan is  ${selectedPlan.role} plan`
                  : `Selected Plan: ${selectedPlan.role}`}
              </Text>
            ) : (
              ''
            )}
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={handlePay} disabled={selectedPlan.role === singleUser.role}>
              {selectedPlan.role === singleUser.role ? 'Already Selected' : 'Upgrade'}
            </Button> */}
            
            <PaymentModal selectedplan={selectedPlan.role} currentplan={singleUser.role} id={id} price={selectedPlan.payment} />
            <Button onClick={onClose} variant='ghost'>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RoleModal;
