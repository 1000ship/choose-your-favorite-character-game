export const loadScript = async (fileName) => {
  const filePath = `./res/scenes/${fileName}`;
  const data = await fetch(filePath);
  const scenes = await data.json();
  return scenes;
};
