import React, { useState } from "react";
import { Container, VStack, Text, Table, Thead, Tbody, Tr, Th, Td, Button, Input, HStack, useToast } from "@chakra-ui/react";
import { FaMoneyBillWave } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [amount, setAmount] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([
    { date: "2023-10-01", amount: 50 },
    { date: "2023-09-01", amount: 50 },
  ]);

  const handlePayment = () => {
    if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newPayment = { date: new Date().toISOString().split("T")[0], amount: Number(amount) };
    setPaymentHistory([newPayment, ...paymentHistory]);
    setAmount("");
    toast({
      title: "Payment successful",
      description: `You have paid $${newPayment.amount}.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Internet Billing System</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th isNumeric>Amount ($)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paymentHistory.map((payment, index) => (
              <Tr key={index}>
                <Td>{payment.date}</Td>
                <Td isNumeric>{payment.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <HStack spacing={4} width="100%">
          <Input placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Button leftIcon={<FaMoneyBillWave />} colorScheme="teal" onClick={handlePayment}>
            Pay
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
