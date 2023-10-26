import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const dynamo = new DynamoDBClient({})
const client = DynamoDBDocumentClient.from(dynamo)

export const handler = async (events: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(events.body!)

  const exist = await client.send(
    new GetCommand({
      TableName: 'DynamoUsers',
      Key: {
        username: body.username
      }
    })
  )

  if (exist.Item) {
    const response = {
      "statusCode": 200,
      "headers": {
        "Content-Type": "*/*"
      },
      "body": JSON.stringify({
        success: false,
        error: 'username already exist'
      }),
      "isBase64Encoded": false
    }

    return response
  }

  await client.send(
    new PutCommand({
      TableName: 'DynamoUsers',
      Item: {
        username: body.username,
        password: body.password
      },
    })
  )

  const response = {
    "statusCode": 200,
    "headers": {
      "Content-Type": "*/*"
    },
    "body": JSON.stringify({
      success: true,
      body: {
        username: body.username,
        password: body.password,
      }
    }),
    "isBase64Encoded": false
  }

  return response
}
