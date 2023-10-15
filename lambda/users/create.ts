import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// const {"v4": uuidv4} = require('uuid');

const dynamo = new DynamoDBClient({})
const client = DynamoDBDocumentClient.from(dynamo)

export const handler = async (events: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(events.body!)

  const command = new PutCommand({
    TableName: "DynamoUsers",
    Item: {
      id: "thisisid",
      name: body.name,
      password: body.password
    },
  })
  await client.send(command)

  return {
    statusCode: 200,
    body: JSON.stringify({ id: 'asdf', name: body.name, password: body.password })
  }
}