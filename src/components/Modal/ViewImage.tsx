import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent
        bgColor="pGray.900"
        maxWidth="fit-content"
        maxHeight="fit-content"
      >
        <ModalBody p="0">
          <Image
            fit="contain"
            w="100%"
            maxWidth="900px"
            h="100%"
            maxHeight="600px"
            src={imgUrl}
          />
        </ModalBody>

        <ModalFooter justifyContent="flex-start" bgColor="pGray.900">
          <Link target="_blank" href={imgUrl}>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
