export const formatKST = (timestamp: number) => {
  const date = new Date(timestamp);

  const koreanTime = date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  return koreanTime;
};
