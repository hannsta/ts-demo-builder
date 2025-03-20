import { Worksheet } from "../Store";
import { getSampleData } from "./TS";

export async function getDefaultInsuranceAssistantPrompt(wsId: string, TSURL: string) {
  const sampleData = await getSampleData(wsId, TSURL);
  return `For the below conversation, for each user message, return "get_data: <a friendly message asking the user to wait>"
  whenever the user sends a very specific question related to data attached below or a follow up to a previously
  asked data question. Otherwise try to be helpful an provide simple responses to their questions.
  
  This is a csv sample of the dataset we have access to:
  ${sampleData}`;
}

const additionalPrompt1 = `This is for a enterprise software company called 'ThoughtSpot'. The data set is a salesforce extract and contains details about all the previous and current deals (also called opportunity), single row for each deal/opportunity.`;

const additionalPrompt = additionalPrompt1;

export async function getAAGAssistantPrompt(worksheet: Worksheet, TSURL: string) {
  const sampleData = await getSampleData(worksheet.id, TSURL);
  return `User has access to a SQL table whose sample is attached at the bottom. 

When a user asks a question, first figure the set of relevant queries (upto 5) on the sample dataset provided, which can help answer the user's question,
the queries should be answerable completely from the dataset and should be answerable individually in isolation.

output the queries in the below format:
<relevant-queries>
 <query> query 1 </query>
 <query> query 2 </query>
 ... list of data queries in natural language (upto 5), these are direct specific to the point queries on the structured SQL table and should only include columns from the table.
</relevant-queries>

Now, wait for the user to provide the data to the above queries. The user will provide result to each of the queries, with a unique identifier to reference the result. After the user has provided the data, continue
to answer the user's question based on it. Be very prescriptive and data driven in your response providing actionable items. Also, mention what data you used to derive that insight.

Sample of the dataset (values are separated by a "|"):
${sampleData}

---- End of sample ---

${additionalPrompt}
`;
}

export const dataQualityPrompt = `Check if for each query the interpretation provided is acceptable to use, if not rephrase the query to have a better interpretation, Do NOT ask the same query again.
 Also, Look at the csv data to see if you need additional related queries to be answered. Send the rephrased as well as additional queries
 in the same <relevant-queries> template mentioned before. Do NOT resend the same query already asked before. If nothing is needed just say "good to go".`;

export const continueAnswerPrompt = `Now continue answering the user's original question.`;

export async function getAAGInsuranceAssistantIntentPrompt(wsId: string, TSURL: string) {
  const sampleData = await getSampleData(wsId, TSURL);
  return `User has access to a  SQL table whose sample is attached below. When a user asks a question, figure from one of the following intents:
  
  ----
  Intent 1. A direct data question, which can be answered using a SQL query on the sample data provided. The column matching might not be exact, a near match is fine.
  
  ----
  Intent 2. A high level question that needs to be answered by getting answers to multiple relevant queries on the dataset.
  
  ----
  Intent 3. Other type of question.

 CSV Sample of the dataset:
  ${sampleData}
  
  Output the intent as "intent-1 / intent-2 / intent-3".
  `;
}

export const intent2Directions = `Figure the set of relevant queries (upto 5) from the sample dataset provided, which can help answer the user's question,
output the queries in the below format:
<relevant-queries>
 <query> ... list of data queries in natural language (upto 5), these are direct queries on the structured SQL table and cannot include columns from outside the table.</query>
</relevant-queries>

Now, wait for the user to provide the data to the above queries. The user will provide result to each of the queries, with a unique identifier to reference the result. After the user has provided the data, continue
to answer the user's question based on it.`;

export const intent3Directions = `Just answer the question directly based on your knowledge and the information in this prompt.`;
