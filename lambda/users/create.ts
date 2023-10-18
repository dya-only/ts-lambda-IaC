import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { v4 } from 'uuid'

const dynamo = new DynamoDBClient({})
const client = DynamoDBDocumentClient.from(dynamo)

export const handler = async (events: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(events.body!)

  // const res = await client.send(
  //   new GetCommand({
  //     TableName: 'DynamoUsers',
  //     Key: {
  //       name: body.name
  //     }
  //   })
  // )


  await client.send(
    new PutCommand({
      TableName: 'DynamoUsers',
      Item: {
        id: v4(),
        name: body.name,
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
        name: body.name,
        password: body.password
      }
    }),
    "isBase64Encoded": false
  }

  return response
}