import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

type ImgResponse = {
  data: Image[];
  after?: number;
};

export default function Home(): JSX.Element {
  const fetchImgs = async ({ pageParam = null }): Promise<ImgResponse> => {
    const response = await api.get<ImgResponse>('api/images', {
      params: { after: pageParam },
    });

    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<ImgResponse, unknown, ImgResponse>('images', fetchImgs, {
    getNextPageParam: lastPage => lastPage?.after,
  });

  const formattedData = useMemo(() => {
    return data?.pages.flatMap(page => page.data);
  }, [data]);

  if (isLoading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header />
        <Error />
      </>
    );
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            my={10}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
