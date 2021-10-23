const getAuthorAvatar = (i) => (i > 9) ? `img/avatars/user${i}.png` : `img/avatars/user0${i}.png`;

export default getAuthorAvatar;
