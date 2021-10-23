const getRandomInteger = (from, to) => {

  if(from < 0 || to <= from){
    throw new Error('Введите число больше или равно нулю, второе число диапазона должно быть больше первого');
  }

  const randomInteger = Math.random() * (to - from) + from;

  return Math.round(randomInteger);

};

export default getRandomInteger;
