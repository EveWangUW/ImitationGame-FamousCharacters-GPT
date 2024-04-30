import openaiClient from "./api.js";

const generate = async (queryDescription) => {

  const daVinci = async (queryDescription) => {
    const response = await openaiClient.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate an imitation game based on the following character from a famous movie or tv show series:\n\n${queryDescription}`,
      max_tokens: 100,
      temperature: 0,
    });
    return response.data.choices[0].text;
  };

  const chatGPT = async (queryDescription) => {
    const message = [
  { role: "system", content: "You are an imitation game generator based on a famous movie or tv show series." },
  { role: "user", content: "Generate an imitation game based on the following character from a famous movie or tv show series:\n\n Monica from Friends." },
  { 
    role: "assistant", 
    content: `Organize cups and arrange them by size and color.\n Host a flawlessly executed dinner party, perhaps even consulting her "Big Book of Recipes."\n Offer friends advice on healthy eating and try to convince them to change their diet habits.\nInsist on strict order and organization in everything.` 
  },
  { role: "user", content: `Generate an imitation game based on the following character from a famous movie or tv show series:\n\n${queryDescription}` }
];

    const response = await openaiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
    });

    return response.data.choices[0].message.content;
  }

  const sqlQuery = await chatGPT(queryDescription);
  return sqlQuery;

};

export default generate;
