export const getRatePercent = (rating: number) => {
  const MAX_RATE = 5;

  return rating * 100 / MAX_RATE;
};
