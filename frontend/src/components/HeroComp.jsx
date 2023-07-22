import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Icon,
    IconProps,
  } from '@chakra-ui/react';
import { mainColor, navbar, orange } from '../constants/color';
  
  export default function HeroComp() {
    return (
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          pt={10}
          >
          <Heading
            fontWeight={600}
            color={"white"}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Welcome to{' '}
            <Text as={'span'} color={orange}>
              Cinemate
            </Text>
          </Heading>
          <Text color={'gray.300'} maxW={'3xl'}>
            Explore the world of movies. Discover new releases, watch trailers, and find information about your favorite films.
            Cinemate is your ultimate guide to everything about cinema.
          </Text>
          <Text fontWeight={'bold'} color={mainColor} fontSize={'lg'}>
          "Unleash Your Movie Journey"
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Button
              rounded={'full'}
              px={6}
              bgGradient={navbar}
            
              _hover={{ bg:orange }}>
              Book Movies
            </Button>
            <Button rounded={'full'} px={6}
            bg={orange}
             _hover={{ bgGradient:navbar }}>
             Book Events
            </Button>
          </Stack>
          {/* <Flex w={'full'}>
            <Illustration
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
            />
          </Flex> */}
        </Stack>
      </Container>
    );
  }
  