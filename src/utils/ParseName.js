function toCharacter(name) {
   name = name.trim()
   if(name.length <= 1) return name
   return name[0]
}

export {toCharacter}
