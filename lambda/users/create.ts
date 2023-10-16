import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { v4 } from 'uuid'

const dynamo = new DynamoDBClient({})
const client = DynamoDBDocumentClient.from(dynamo)

export const handler = async (events: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(events.body!)

  const command = new PutCommand({
    TableName: "DynamoUsers",
    Item: {
      id: v4(),
      name: body.name,
      password: body.password
    },
  })

  await client.send(command)

  // return {
  //   "isBase64Encoded": false,
  //   "statusCode": 200,
  //   "headers": { "Content-Type": "application/json" },
  //   "multiValueHeaders": {},
  //   "body": "asdf"
  // }
  try {
    await client.send(command)
    console.log('name', body.name)
    return { statusCode: 200, body: 'Successfully created item!' }
  } catch (err) {
    console.log('err', err)
    return { statusCode: 500, body: JSON.stringify(err) }
  }
}