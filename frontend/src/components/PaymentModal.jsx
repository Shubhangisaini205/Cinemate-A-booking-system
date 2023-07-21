import CreditCard from "./CreditCard"
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
import React from "react"
function PaymentModal({selectedplan,currentplan,price,id}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    const handleClosePaymentModal = () => {
        onClose(); // Close the payment modal
      };
  
    return (
      <>
        <Box ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>
        </Box>
        
        <Button colorScheme='blue' mr={3} onClick={onOpen} isDisabled={selectedplan === currentplan || selectedplan=="regular"}>
        {selectedplan === currentplan ? 'Already Selected' : 'Upgrade'}
        </Button>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Payment Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CreditCard price={price} onClosePaymentModal={handleClosePaymentModal} id={id}/>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default PaymentModal