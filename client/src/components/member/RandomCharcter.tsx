export function getRandomCharacter(): string {
    const characters: string[] = [
      "/character1.png",
      "/character2.png",
      "/character3.png",
      "/character4.png",
      "/character5.png",
    ];
  
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }
  
  const randomCharacter = getRandomCharacter();
  console.log(randomCharacter);
  