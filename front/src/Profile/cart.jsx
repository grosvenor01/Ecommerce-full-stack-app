// import React from 'react';

// import cart1 from "../assets/dashboerd/cart1.png";
// import rating from "../assets/dashboerd/rating.svg";
// import { Box ,Image,Text} from '@chakra-ui/react';
// const Cart = () => {
//     return (
//         <Box p={"1rem"} mt={"2rem"} width={"433px"} bg={"#242424"} display={"flex"}>

//             <Image width={"142px"} src={cart1}></Image>
//             <Box  ml={"1rem"}>
//                 <Text mb={"0.3rem"}  fontSize={"20px"} fontWeight={"bold"}>Simple Headphone</Text>
//                 <Text mb={0} fontSize={"18px"}>Lorem ipsum dolor sit amet</Text>
//                 <Text mb={"0.2rem"} fontSize={"18px"} color={"#7B61FF"}>You save $0.20</Text>
//                 <Text mb={"0.3rem"} fontSize={"20"}fontWeight={"bold"}>$1.80</Text>
//                 <Image h={"1rem"} src={rating}></Image>
                
//             </Box>
           
//         </Box>
//     );
// };

// export default Cart;


import { Box, Image, Text } from '@chakra-ui/react';

const Cart = ({ imageUrl, title, description, savings, price, ratingImage }) => {
    return (
        <Box p={"1rem"} mt={"2rem"} width={"433px"} bg={"#242424"} display={"flex"}>
            <Image width={"142px"} src={imageUrl} />
            <Box ml={"1rem"}>
                <Text mb={"0.3rem"} fontSize={"20px"} fontWeight={"bold"}>{title}</Text>
                <Text mb={0} fontSize={"18px"}>{description}</Text>
                <Text mb={"0.2rem"} fontSize={"18px"} color={"#7B61FF"}>You save {savings}</Text>
                <Text mb={"0.3rem"} fontSize={"20"} fontWeight={"bold"}>{price}</Text>
                <Image h={"1rem"} src={ratingImage} />
            </Box>
        </Box>
    );
};

export default Cart;
