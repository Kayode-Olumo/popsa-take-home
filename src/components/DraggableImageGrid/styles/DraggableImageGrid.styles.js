import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  max-width: 40rem;
  margin: 0 auto;
`;

export const PageContainer = styled.div`
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 1rem;
  background-color: #9333ea;
  border-radius: 0.5rem;
`;

export const GridItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 0.375rem;
  background-color: #d8b4fe;
`;

export const StyledImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const EmptySlot = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b21a8;
`;
