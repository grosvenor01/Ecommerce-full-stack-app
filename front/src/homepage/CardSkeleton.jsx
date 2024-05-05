import { Card, Skeleton, CardBody, SkeletonText } from "@chakra-ui/react";

const CardSkeleton = () => {
  return (
    <Card>
      <Skeleton width={"250px"} height={"250px"} />
      <CardBody>
        <SkeletonText></SkeletonText>
      </CardBody>
    </Card>
  );
};

export default CardSkeleton;