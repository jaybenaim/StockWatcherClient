class TextHelpers {
 truncate(str, len = 7) {
  return str.length > len ? str.substring(0, len) + "..." : str;
 }
}

const textHelpers = new TextHelpers()

export default textHelpers