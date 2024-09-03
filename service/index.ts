const BASE_URL =
  "https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple&encode=url3986";

export async function getQuestion(): Promise<Response[]> {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
}
