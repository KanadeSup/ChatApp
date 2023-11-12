function toCharacters(name) {
   name = name.trim()
   if(name.length <= 1) return name
   return name[0] + name[1]
}

export { toCharacters }
