import {
    Modal,
    Paper,
    Stack,
    Text,
    Flex,
    useMantineTheme,
} from "@mantine/core";
import { Review } from "../types/places";

type ReviewsDialogProps = {
    open: boolean;
    selectedReviews: Review[];
    setIsOpen: (val: boolean) => void;
};

const ReviewsDialog = ({
    selectedReviews = [],
    open,
    setIsOpen,
}: ReviewsDialogProps) => {
    const theme = useMantineTheme();
    const close = () => setIsOpen(false);
    return (
        <>
            <Modal opened={open} title="Reviews" size="lg" onClose={close}>
                <Modal.Body>
                    <Stack w="100%">
                        {selectedReviews.map((review, idx) => (
                            <Paper
                                key={`review-${idx}`}
                                shadow="xl"
                                p="md"
                                radius="xl"
                                style={{
                                    backgroundColor: theme.colors.dark[5],
                                }}
                            >
                                <Flex direction="column" gap="sm">
                                    <Text size="lg">{review?.text}</Text>
                                    <Text size="sm" fw={700}>
                                        {`Date: ${new Date(
                                            review?.created_at
                                        ).toDateString()}`}
                                    </Text>
                                </Flex>
                            </Paper>
                        ))}
                    </Stack>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ReviewsDialog;
