import React from 'react';
import { Box, Button, ButtonGroup } from '@chakra-ui/react';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt="4">
      <ButtonGroup size="sm" isAttached>
        <Button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          colorScheme="gray"
        >
          Previous
        </Button>
        {pageNumbers.map((pgNumber) => (
          <Button
            key={pgNumber}
            onClick={() => setCurrentPage(pgNumber)}
            isActive={currentPage === pgNumber}
            colorScheme="gray"
          >
            {pgNumber}
          </Button>
        ))}
        <Button
          onClick={goToNextPage}
          disabled={currentPage === nPages}
          colorScheme="gray"
        >
          Next
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Pagination;