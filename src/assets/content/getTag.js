const getTag = (val) => {
  switch (Number(val)) {
    case 1:
      return 'Action';
    case 2:
      return 'Adult';
    case 3:
      return 'Adventure';
    case 4:
      return 'Anime';
    case 5:
      return 'Chuyển Sinh';
    case 6:
      return 'Cổ Đại';
    case 7:
      return 'Cổ Trang';
    case 8:
      return 'Comedy';
    case 9:
      return 'Comic';
    case 10:
      return 'Demons';
    case 11:
      return 'Detective';
    case 12:
      return 'Doujinshi';
    case 13:
      return 'Drama';
    case 14:
      return 'Đam Mỹ';
    case 15:
      return 'Ecchi';
    case 16:
      return 'Fantasy';
    case 17:
      return 'Gender Bender';
    case 18:
      return 'Harem';
    case 19:
      return 'Historical';
    case 20:
      return 'Horror';
    case 21:
      return 'Huyền Huyễn';
    case 22:
      return 'Isekai';
    case 23:
      return 'Josei';
    case 24:
      return 'Magic';
    case 25:
      return 'Manhua';
    case 26:
      return 'Manhwa';
    case 27:
      return 'Martial Arts';
    case 28:
      return 'Mature';
    case 29:
      return 'Mystery';
    case 30:
      return 'Ngôn Tình';
    case 31:
      return 'One Shot';
    case 32:
      return 'Psychological';
    case 33:
      return 'Romance';
    case 34:
      return 'School Life';
    case 35:
      return 'Sci-Fi';
    case 36:
      return 'Seinen';
    case 37:
      return 'Shoujo';
    case 38:
      return 'Shoujo Ai';
    case 39:
      return 'Shounen';
    case 40:
      return 'Shounen Ai';
    case 41:
      return 'Slice Of Life';
    case 42:
      return 'Smut';
    case 43:
      return 'Sports';
    case 44:
      return 'Supernatural';
    case 45:
      return 'Tragedy';
    case 46:
      return 'Trọng Sinh';
    case 47:
      return 'Truyện Màu';
    case 48:
      return 'Webtoon';
    case 49:
      return 'Xuyên Không';
    case 51:
      return 'Yaoi';
    default:
      return val;
  }
};
export default getTag;
