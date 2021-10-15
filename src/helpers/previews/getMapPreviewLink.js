const getMapPreviewLink = (lng, lat) => {
  return `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&size=450,450&z=16&l=map&pt=${lng},${lat},vkbkm,`;
};

export default getMapPreviewLink;
