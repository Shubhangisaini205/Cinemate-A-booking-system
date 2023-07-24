import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Image, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";


export const CineBot = () => {
    const inputRef = useRef(null);
    const chatContainerRef = useRef(null);
    const [input, setInput] = useState("");
    // const [bot, setBot] = useState([init]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setchatHistory] = useState([{ role: "system", content: "Hi 👋, I am AI Assistant of Cinemate💫." }])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = [{ role: 'system', content: `Take a role of AI Assistant of Theator Cinemate and respond to only queries which are related to Cinemate or the queries which are general Movie Show  queries like what are upcoming movies?.You are not at all supposed to respond to any queries which are not related to our Theator and Cinema related queries. If you encounter such query then respnd saying I am an AI Assistant of Theator Cinemate so I can't answer questions like these. Here's the query: \n${input}` }, { role: "user", content: input }];
        const newdata = message;

        setIsLoading(true);

        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: newdata,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
                    },
                }
            );

            const chatbotMessage = response.data.choices[0].message.content;
            console.log(chatbotMessage);
            const updatedChatHistory = [
                ...chatHistory,
                { role: "assistant", content: chatbotMessage },
            ];
            setchatHistory(updatedChatHistory)
            setInput("");
            inputRef.current.focus();
            scrollToBottom();
        } catch (error) {
            console.error(error);
        }

        setIsLoading(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    return (
        <>
            <Image border={"1px solid red"} width={"60px"} borderRadius={"50%"} onClick={openModal} src="https://cdn.vectorstock.com/i/preview-1x/45/27/chat-bot-robot-colorful-style-isolated-vector-47364527.webp" />
            <Modal isOpen={isOpen} onClose={closeModal} motionPreset="slideInRight" position="fixed">
                <ModalOverlay />
                <ModalContent position="fixed" top="3%" left="2%" transform="translate(-50%, -50%)" >
                    <ModalHeader>Chatbot</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            width="400px"
                            borderWidth="1px"
                            borderRadius="md"
                            overflow="hidden"
                            bg="white"
                            boxShadow="md"
                            height="500px"  // Adjust the height as per your requirement
                        >
                            <Box p="4" maxHeight="400px" overflowY="auto" ref={chatContainerRef}>
                                {chatHistory.map((message, index) => (
                                    <Flex key={index} direction={message.role === "system" ? "column" : "row"} mb="2">
                                        <Box
                                            px="3"
                                            py="2"
                                            borderRadius="md"
                                            bg={message.role === "user" ? "gray.200" : "red.600"}
                                            color={message.role === "user" ? "gray.600" : "white"}
                                        >
                                            <Text fontSize="sm">{message.content}</Text>
                                        </Box>
                                    </Flex>
                                ))}
                            </Box>
                            <Box borderTopWidth="1px" p="4">
                                <form onSubmit={handleSubmit}>
                                    <Flex>
                                        <Textarea
                                            ref={inputRef}
                                            flex="1"
                                            resize="none"
                                            placeholder="Type your message..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                        />
                                        <Button type="submit" ml="2" isLoading={isLoading} colorScheme="red">
                                            Send
                                        </Button>
                                    </Flex>
                                </form>
                            </Box>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>
    );
};