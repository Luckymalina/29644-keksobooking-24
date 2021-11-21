const getRandomFloat = (from, to, symbols) => {

  if(from < 0 || to <= from){
    throw new Error('Введите число больше или равно нулю, второе число диапазона должно быть больше первого');
  }

  const randomFloat = (Math.random() * (to - from) + from).toFixed(symbols);

  return Number(randomFloat);

};

export default getRandomFloat;
