export const getRead = (id, chapter, name, image) => {
  const lastSeen = localStorage.getItem('read')
    ? JSON.parse(localStorage.getItem('read'))
    : [];

  if (Array.isArray(lastSeen)) {
    // get all :
    if (lastSeen.length > 0) {
      if (!id) {
        return lastSeen;
      }
      const newIndex = lastSeen.findIndex((data) => data.ID === id);
      // get data :
      if (newIndex >= 0) {
        if (!chapter) {
          return lastSeen[newIndex];
        }
        const newSeen = lastSeen.map((data) => {
          if (data.ID === id) {
            if (Array.isArray(data.visited)) {
              let newVisited = data.visited;
              const visitedIndex = newVisited.findIndex(
                (chap) => chap === chapter
              );
              if (visitedIndex >= 0) {
                return {
                  ID: id,
                  chapter,
                  name: data.name ? data.name : name,
                  image: data.image ? data.image : image,
                  visited: newVisited,
                };
              } else {
                newVisited.push(chapter);
                return {
                  ID: id,
                  chapter,
                  name: data.name ? data.name : name,
                  image: data.image ? data.image : image,
                  visited: newVisited,
                };
              }
            } else {
              return {
                ID: id,
                chapter,
                name: data.name ? data.name : name,
                image: data.image ? data.image : image,
                visited: [chapter],
              };
            }
          }
          return data;
        });
        return newSeen;
      }
      if (!chapter) {
        return [];
      }
      let newSeen = lastSeen;
      newSeen.push({ ID: id, chapter, name, image, visited: [chapter] });
      return newSeen;
    }
    if (!id) {
      return [];
    }
    const newSeen = [{ ID: id, chapter, name, image, visited: [chapter] }];
    return newSeen;
  }
  return [];
};

// export const getHistory = (id, chapter) => {
//   const history = localStorage.getItem('history')
//     ? JSON.parse(localStorage.getItem('history'))
//     : [];
//   if (Array.isArray(history)) {
//     //if get all history :
//     if (!id) {
//       return history;
//     }
//     if (history.length > 0) {
//       const newIndex = history.findIndex((data) => data.ln === id);
//       if (newIndex >= 0) {
//         //if get data :
//         if (!chapter) {
//           return history[newIndex];
//         }
//         const newHistory = history.map((data) => {
//           if (data.ln === id) {
//             if (Array.isArray(data.chapter)) {
//               let oldChapter = data.chapter;
//               const newChapter = oldChapter.push(chapter);
//               return { ln: id, chapter: newChapter };
//             } else {
//               let oldChapter;
//               if (data.chapter) {
//                 oldChapter = data.chapter;
//               }
//               const newChapter = [oldChapter, chapter];
//               return { ln: id, chapter: newChapter };
//             }
//           }
//           return data;
//         });

//         return newHistory;
//       }
//       if (!chapter) {
//         return [];
//       }
//     }
//     const newHistory = [{ ln: id, chapter: [chapter] }];
//     return newHistory;
//   }
//   return [];
// };

// export const getMark = (id, chapter, y) => {
//   const bookmark = localStorage.getItem('bookmark')
//     ? JSON.parse(localStorage.getItem('bookmark'))
//     : [];

//   // const bookmark = cncn;
//   if (Array.isArray(bookmark)) {
//     //get all mark
//     if (!id) {
//       return bookmark;
//     }
//     const newIndex = bookmark.findIndex((data) => {
//       if (data.ln === id && data.chapter === chapter) {
//         return true;
//       } else return false;
//     });
//     if (newIndex >= 0) {
//       if (y >= 0) {
//         let newBookmark = bookmark;
//         newBookmark.splice(newIndex, 1);
//         newBookmark.push({ ln: id, chapter: chapter, y: y });
//         return newBookmark;
//       } else if (y === -1) {
//         return bookmark[newIndex];
//       } else if (y === -2) {
//         let newBookmark = bookmark;
//         newBookmark.splice(newIndex, 1);
//         return newBookmark;
//       }
//     } else if (y >= 0) {
//       let newBookmark = bookmark;
//       newBookmark.push({ ln: id, chapter: chapter, y: y });
//       return newBookmark;
//     } else if (y === -1) {
//       return {};
//     } else if (y === -2) {
//       return bookmark;
//     }

//     return newIndex;
//   }
//   return -1;
// };
